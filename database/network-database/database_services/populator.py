import psycopg2
from abc import ABC, abstractmethod
from constants import Constants
from io import StringIO

class DataPopulator(ABC):
    
    def __init__(self, db_url):
        self.db_url = db_url
        self.filepath = None
        self.network_mode = None
    
    @abstractmethod
    def get_copy_statement(self):
        """
        This method should return the COPY SQL statement for the specific type of data.
        """
        pass
    
    def determine_database_namespace(self, network_mode):
        if network_mode == Constants.GRN_NETWORK_MODE:
            return Constants.GRN_DATABASE_NAMESPACE
        elif network_mode == Constants.PPI_NETWORK_MODE:
            return Constants.PPI_DATABASE_NAMESPACE
        else:
            raise ValueError(f"Unknown network type: {network_mode}")
    
    def process_file(self, conn, cursor, data_filepath, copy_statement):
        """
        A helper function that processes the input file and performs the COPY command to load data into the database.
        If the network is PPI, it drops the last column from the input data.
        """
        
        # Determine if we need to drop the last column (PPI network type)
        if self.network_mode == Constants.PPI_NETWORK_MODE and data_filepath == Constants.GENE_DATA_FILEPATH:
            print("Dropping the regulator column from the input data...")
            processed_rows = []
            
            with open(data_filepath, 'r') as f:
                for line in f:
                    columns = line.strip().split('\t')
                    processed_row = columns[:4] + columns[5:]
                    processed_rows.append('\t'.join(processed_row))
                    
            from io import StringIO
            temp_file = StringIO("\n".join(processed_rows))
            
            # Execute the COPY command using the processed data (without the last column)
            cursor.copy_expert(sql=copy_statement, file=temp_file)
            conn.commit()
            
        else:
            with open(data_filepath, 'r') as f:
                cursor.copy_expert(sql=copy_statement, file=f)
                conn.commit()

        print(f"Data from {data_filepath} has been successfully populated.")
        print("===============================================")
    
    def populate_data(self):
        conn = psycopg2.connect(self.db_url)
        cursor = conn.cursor()

        copy_statement = self.get_copy_statement()
        
        self.process_file(conn, cursor, self.filepath, copy_statement)
        
        cursor.close()
        conn.close()

class GeneDataPopulator(DataPopulator):
    def __init__(self, db_url, network_mode):
        super().__init__(db_url)
        self.network_mode = network_mode
        self.filepath = Constants.GENE_DATA_FILEPATH
        if network_mode == Constants.GRN_NETWORK_MODE:
            self.database_namespace = Constants.GRN_DATABASE_NAMESPACE
        elif network_mode == Constants.PPI_NETWORK_MODE:
            self.database_namespace = Constants.PPI_DATABASE_NAMESPACE
        else:
            raise ValueError(f"Unknown network type: {network_mode}")
    
    def get_copy_statement(self):
        if self.network_mode == Constants.GRN_NETWORK_MODE:
            return f"COPY {self.database_namespace}.gene (gene_id, display_gene_id, species, taxon_id, regulator, time_stamp, source) FROM stdin WITH CSV DELIMITER E'\\t' HEADER;"
        elif self.network_mode == Constants.PPI_NETWORK_MODE:
            return f"COPY {self.database_namespace}.gene (gene_id, display_gene_id, species, taxon_id, time_stamp, source) FROM stdin WITH CSV DELIMITER E'\\t' HEADER;"
        else:
            raise ValueError(f"Unknown network type: {self.network_mode}")
            
class ProteinDataPopulator(DataPopulator):
    def __init__(self, db_url):
        super().__init__(db_url)
        self.filepath = Constants.PROTEIN_DATA_FILEPATH

    def get_copy_statement(self):
        return f"COPY {Constants.PPI_DATABASE_NAMESPACE}.protein (standard_name, gene_systematic_name, length, molecular_weight, PI, taxon_id, time_stamp, source) FROM stdin WITH CSV DELIMITER E'\\t' HEADER;"
            
class GeneRegulatoryNetworkDataPopulator(DataPopulator):
    def __init__(self, db_url):
        super().__init__(db_url)
        self.filepath = Constants.GENE_REGULATORY_NETWORK_DATA_FILEPATH

    def get_copy_statement(self):
        return f"COPY {Constants.GRN_DATABASE_NAMESPACE}.network (regulator_gene_id, target_gene_id, taxon_id, annotation_type, time_stamp, source) FROM stdin WITH CSV DELIMITER E'\\t' HEADER;"

class ProteinProteinInteractionsDataPopulator(DataPopulator):
    def __init__(self, db_url):
        super().__init__(db_url)
        self.filepath = Constants.PROTEIN_PROTEIN_INTERACTIONS_DATA_FILEPATH

    def get_copy_statement(self):
        return f"COPY {Constants.PPI_DATABASE_NAMESPACE}.physical_interactions (protein1, protein2, interaction_detection_methods_identifier, annotation_type, experiment_name, time_stamp, source) FROM stdin WITH CSV DELIMITER E'\\t' HEADER;"

class SourceDataPopulator(DataPopulator):
    def __init__(self, db_url, network_mode):
        super().__init__(db_url)
        self.network_mode = network_mode
        self.database_namespace = self.determine_database_namespace(network_mode)
        self.filepath = Constants.SOURCE_DATA_FILEPATH
        
    def get_copy_statement(self):
        return f"COPY {self.database_namespace}.source (time_stamp, source, display_name) FROM stdin WITH CSV DELIMITER E'\\t' HEADER;"