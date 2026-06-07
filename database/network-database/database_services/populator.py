import csv
from io import StringIO
from pathlib import Path
from abc import ABC, abstractmethod

import psycopg2
from psycopg2 import sql
from constants import Constants

class DataPopulator(ABC):
    """
    Abstract Base Class to handle normalizing and importing data 
    into PostgreSQL from various file formats.
    """

    NAMESPACE_MAP = {
        Constants.GRN_NETWORK_MODE: Constants.GRN_DATABASE_NAMESPACE,
        Constants.PPI_NETWORK_MODE: Constants.PPI_DATABASE_NAMESPACE,
    }

    def __init__(self, db_url, input_dir=Constants.DATA_DIRECTORY):
        self.db_url = db_url
        self.input_dir = Path(input_dir)
        self.network_mode = None
        self.filepath = None
        self.table_name = None

    @property
    def schema(self):
        input_name = self.input_dir.name
        known_schemas = set(self.NAMESPACE_MAP.values()) | {
            Constants.OLD_GRN_DATABASE_NAMESPACE,
            Constants.OLD_PPI_DATABASE_NAMESPACE,
        }

        if input_name == Constants.DATA_DIRECTORY:
            return self.NAMESPACE_MAP.get(self.network_mode)

        if input_name in known_schemas:
            return input_name

        return self.NAMESPACE_MAP.get(self.network_mode)

    @property
    @abstractmethod
    def target_columns(self): pass

    @property
    def has_timestamp_columns(self):
        schema_name = self.schema or ""
        return schema_name.endswith("_with_timestamp")

    def _resolve_data_filepath(self):
        """Finds the input file based on format and network mode."""
        if self.input_dir.name == Constants.DATA_DIRECTORY:
            return Path(self.filepath)
        
        candidate_files = [
            f"{self.table_name}.tsv", 
            f"{self.table_name}.csv"
        ]

        direct_candidates = [self.input_dir / c for c in candidate_files]
        for path in direct_candidates:
            if path.is_file():
                return path
            
        raise FileNotFoundError(f"No valid {self.table_name} file found in {self.input_dir}. Expected one of: {', '.join(candidate_files)}")

    def _build_normalized_buffer(self, data_filepath):
        """Standardizes input files into a clean TSV buffer matching DB columns."""
        print(f"Normalizing data from {data_filepath} for table {self.schema}.{self.table_name}...")
        with open(data_filepath, "r", newline="", encoding="utf-8") as f:
            sample = f.read(2048)
            f.seek(0)
            
            try:
                dialect = csv.Sniffer().sniff(sample, delimiters=",\t")
            except csv.Error:
                dialect = csv.excel_tab
                
            reader = csv.DictReader(f, dialect=dialect)
            source_cols = {col.strip().lower().replace(" ", "_"): col for col in reader.fieldnames}
            
            mapping = []
            for target in self.target_columns:
                match = next((source_cols[a] for a in [target] if a in source_cols), None)
                if not match:
                    raise ValueError(f"Missing required column '{target}' in {data_filepath}")
                mapping.append(match)

            output = StringIO()
            writer = csv.writer(output, delimiter="\t", lineterminator="\n")
            writer.writerow(self.target_columns)
            for row in reader:
                writer.writerow([row.get(m, "") for m in mapping])
            
            output.seek(0)
            return output

    def populate_data(self):
        """Main execution flow: Resolve -> Normalize -> Temp Load -> Upsert."""
        data_path = self._resolve_data_filepath()
        buffer = self._build_normalized_buffer(data_path)
        
        with psycopg2.connect(self.db_url) as conn:
            with conn.cursor() as cur:
                temp_table = "tmp_import_data"
                
                # Create a clean temp table based on the real one
                cur.execute(sql.SQL("CREATE TEMP TABLE {} (LIKE {}.{} INCLUDING DEFAULTS) ON COMMIT DROP")
                            .format(sql.Identifier(temp_table), 
                                    sql.Identifier(self.schema), 
                                    sql.Identifier(self.table_name)))

                # Bulk copy the buffer into the temp table
                cols_sql = sql.SQL(", ").join(map(sql.Identifier, self.target_columns))
                copy_query = sql.SQL("COPY {} ({}) FROM STDIN WITH CSV DELIMITER E'\\t' HEADER")\
                                .format(sql.Identifier(temp_table), cols_sql)
                
                cur.copy_expert(copy_query, buffer)

                # Insert data to the real table, ignoring conflicts
                upsert_query = sql.SQL("""
                    INSERT INTO {}.{} ({}) 
                    SELECT {} FROM {} 
                    ON CONFLICT DO NOTHING
                """).format(
                    sql.Identifier(self.schema), 
                    sql.Identifier(self.table_name), 
                    cols_sql, cols_sql, 
                    sql.Identifier(temp_table)
                )
                
                cur.execute(upsert_query)
                
                print(f"Data populated into {self.schema}.{self.table_name}")
                print(f"- Source: {data_path.name}")
                print(f"- Rows affected: {cur.rowcount}")
                print("-" * 50)
class GeneDataPopulator(DataPopulator):
    def __init__(self, db_url, network_mode, input_dir):
        super().__init__(db_url, input_dir)
        self.network_mode = network_mode
        self.filepath = Constants.GENE_DATA_FILEPATH
        self.table_name = "gene"

    @property
    def target_columns(self):
        cols = ["gene_id", "display_gene_id", "species", "taxon_id"]
        if self.network_mode == Constants.GRN_NETWORK_MODE:
            cols.insert(4, "regulator")
        if self.has_timestamp_columns:
            cols.extend(["time_stamp", "source"])
        return cols

class ProteinDataPopulator(DataPopulator):
    def __init__(self, db_url, input_dir):
        super().__init__(db_url, input_dir)
        self.network_mode = Constants.PPI_NETWORK_MODE
        self.filepath = Constants.PROTEIN_DATA_FILEPATH
        self.table_name = "protein"

    @property
    def target_columns(self):
        cols = ["standard_name", "gene_systematic_name", "length", "molecular_weight", "pi", "taxon_id"]
        if self.has_timestamp_columns:
            cols.extend(["time_stamp", "source"])
        return cols

class GeneRegulatoryNetworkDataPopulator(DataPopulator):
    def __init__(self, db_url, input_dir):
        super().__init__(db_url, input_dir)
        self.network_mode = Constants.GRN_NETWORK_MODE
        self.filepath = Constants.GENE_REGULATORY_NETWORK_DATA_FILEPATH
        self.table_name = "network"     

    @property
    def target_columns(self):
        cols = ["regulator_gene_id", "target_gene_id", "taxon_id"]
        if self.has_timestamp_columns:
            cols.append("annotation_type")
        cols.extend(["time_stamp", "source"])
        return cols

class ProteinProteinInteractionsDataPopulator(DataPopulator):
    def __init__(self, db_url, input_dir):
        super().__init__(db_url, input_dir)
        self.network_mode = Constants.PPI_NETWORK_MODE
        self.filepath = Constants.PROTEIN_PROTEIN_INTERACTIONS_DATA_FILEPATH
        self.table_name = "physical_interactions"

    @property
    def target_columns(self):
        cols = ["protein1", "protein2", "interaction_detection_methods_identifier"]
        if self.has_timestamp_columns:
            cols.append("annotation_type")
        cols.extend(["experiment_name", "time_stamp", "source"])
        return cols

class SourceDataPopulator(DataPopulator):
    def __init__(self, db_url, network_mode, input_dir):
        super().__init__(db_url, input_dir)
        self.network_mode = network_mode
        self.filepath = Constants.SOURCE_DATA_FILEPATH
        self.table_name = "source"

    target_columns = ["time_stamp", "source", "display_name"]