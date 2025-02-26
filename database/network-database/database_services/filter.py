import psycopg2
import csv
import pandas as pd
from constants import Constants

class Filter:
    def __init__(self, db_url, save_service):
        self.db_url = db_url
        self.save_service = save_service
    
    def get_all_db_data(self, database_namespace, table_name, columns):
        """
        Fetch all data from the specified table and return it as a list of dictionaries.
        """
        conn = psycopg2.connect(self.db_url)
        cursor = conn.cursor()
        
        query = f"SELECT {', '.join(columns)} FROM {database_namespace}.{table_name};"
        cursor.execute(query)
        
        rows = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        
        result = [dict(zip(column_names, row)) for row in rows]
        
        cursor.close()
        conn.close()
        
        return result
    
    def filter_data(self, data_filepath, db_data, key_columns, update_columns):
        """
        Filter the data to return:
        - Records that need to be inserted.
        - Records that need to be updated.
        """
        with open(data_filepath, 'r') as f:
            reader = csv.DictReader(f, delimiter='\t')
            data = list(reader)
        
        db_keys = {tuple(row[col] for col in key_columns): row for row in db_data}
        
        insert_data = []
        update_data = []
        update_data_names = []
        
        for row in data:
            key_tuple = tuple(row[col] for col in key_columns)
            if key_tuple in db_keys:
                db_record = db_keys[key_tuple]
                changes_needed = False
                
                for col in update_columns:
                    if str(row[col]).lower() != str(db_record[col]).lower():
                        # Special case for protein daat that ned to check if standard name is changed
                        if col == "standard_name" and data_filepath == Constants.PROTEIN_DATA_FILEPATH:
                            update_data_names.append({
                                "old_standard_name": db_record[col],
                                "new_standard_name": row[col],
                            })
                            
                        if col == "length" or col == "molecular_weight" or col == "pi":
                            if float(row[col]) == float(db_record[col]):
                                continue
                        
                        changes_needed = True
                        break
                
                if changes_needed:
                    update_data.append({
                        **{col: row[col] for col in key_columns + update_columns},
                    })
            else:
                insert_data.append(row)
            
        insert_data_df = pd.DataFrame(insert_data)
        update_data_df = pd.DataFrame(update_data)
        
        self.save_service.save(insert_data_df, Constants.MISSING_DATA_DIRECTORY, self.missing_filepath)
        self.save_service.save(update_data_df, Constants.UPDATE_DATA_DIRECTORY, self.update_filepath)
        
        if data_filepath == Constants.PROTEIN_DATA_FILEPATH:
            update_data_names_df = pd.DataFrame(update_data_names)
            self.save_service.save(update_data_names_df, Constants.UPDATE_DATA_DIRECTORY, Constants.UPDATE_PROTEIN_NAME_DATA_FILEPATH)

    
class ProteinFilter(Filter):
    def __init__(self, db_url, save_service):
        super().__init__(db_url, save_service)
        self.missing_filepath = Constants.MISSING_PROTEIN_DATA_FILEPATH
        self.update_filepath = Constants.UPDATE_PROTEIN_DATA_FILEPATH
    
    def get_all_db_data(self):
        """
        Fetch all protein data from the database.
        """
        columns = ["standard_name", "gene_systematic_name", "length", "molecular_weight", "pi"]
        return super().get_all_db_data(Constants.PPI_DATABASE_NAMESPACE, "protein", columns)
    
    def filter_data(self):
        """
        Filter protein data that is missing or needs to be updated in the database.
        """
        db_data = self.get_all_db_data()
        
        key_columns = ["gene_systematic_name"]
        update_columns = ["standard_name", "length", "molecular_weight", "pi"]
        
        return super().filter_data(Constants.PROTEIN_DATA_FILEPATH, db_data, key_columns, update_columns)

class GeneFilter(Filter):
    def __init__(self, db_url, save_service, network_mode):
        super().__init__(db_url, save_service)
        self.network_mode = network_mode
        if network_mode == Constants.GRN_NETWORK_MODE:
            self.missing_filepath = Constants.MISSING_GRN_GENE_DATA_FILEPATH
            self.update_filepath = Constants.UPDATE_GRN_GENE_DATA_FILEPATH
            self.database_namespace = Constants.GRN_DATABASE_NAMESPACE
        elif network_mode == Constants.PPI_NETWORK_MODE:
            self.missing_filepath = Constants.MISSING_PPI_GENE_DATA_FILEPATH
            self.update_filepath = Constants.UPDATE_PPI_GENE_DATA_FILEPATH
            self.database_namespace = Constants.PPI_DATABASE_NAMESPACE
        else:
            raise ValueError("Unknown network type specified.")
    
    def get_all_db_data(self):
        """
        Fetch all gene data from the database.
        """
        if self.network_mode == Constants.GRN_NETWORK_MODE:
            columns = ["gene_id", "display_gene_id", "regulator"]
        elif self.network_mode == Constants.PPI_NETWORK_MODE:
            
            columns = ["gene_id", "display_gene_id"]
        else:
            raise ValueError("Unknown network type specified.")
        
        return super().get_all_db_data(self.database_namespace, "gene", columns)
    
    def filter_data(self):
        """
        Filter gene data that is missing or needs to be updated in the database.
        """
        
        if self.network_mode == Constants.GRN_NETWORK_MODE:
            update_columns = ["display_gene_id", "regulator"]
        elif self.network_mode == Constants.PPI_NETWORK_MODE:
            update_columns = ["display_gene_id"]
        else:
            raise ValueError("Unknown network type specified.")
        
        key_columns = ["gene_id"]
        
        db_data = self.get_all_db_data()
        
        return super().filter_data(Constants.GENE_DATA_FILEPATH, db_data, key_columns, update_columns)
