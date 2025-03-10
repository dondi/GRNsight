import psycopg2
from abc import ABC, abstractmethod
import csv
from constants import Constants

class Updater(ABC):
    def __init__(self, db_url):
        self.db_url = db_url
        self.filepath = None
    
    @abstractmethod
    def process_each_row(self, row):
        """
        Process each row of data from the file.
        """
        pass
    
    def update_data(self):
        print(f"Updating data from {self.filepath}...")
        conn, cursor = self._connect_to_db()

        rows = self._process_file()

        # SQL Update query for protein data
        for row in rows:
            update_query, params = self.process_each_row(row)

            self._execute_update(cursor, update_query, params)

        self._commit_and_close(conn, cursor)
        
        print("Data update complete!")
        print("====================================================================")

    def _process_file(self):
        """
        Helper function to process the file, which will be used by subclasses to process data rows.
        """
        with open(self.filepath, 'r') as file:
            reader = csv.reader(file, delimiter='\t')
            next(reader)
            return list(reader)

    def _execute_update(self, cursor, update_query, params):
        """
        Executes the update query with provided parameters.
        """
        try:
            cursor.execute(update_query, params)
        except Exception as e:
            print(f"Error executing query: {e}")
            cursor.connection.rollback()
        else:
            print(f"Update successful!")

    def _connect_to_db(self):
        """
        Establish connection to the database and return cursor.
        """
        try:
            conn = psycopg2.connect(self.db_url)
            cursor = conn.cursor()
            return conn, cursor
        except Exception as e:
            print(f"Error connecting to the database: {e}")
            raise

    def _commit_and_close(self, conn, cursor):
        """
        Commit the transaction and close the database connection.
        """
        conn.commit()
        cursor.close()
        conn.close()

class GeneUpdater(Updater):
    def __init__(self, db_url, network_mode):
        super().__init__(db_url)
        self.network_mode = network_mode
        self.filepath = Constants.UPDATE_PPI_GENE_DATA_FILEPATH if network_mode == Constants.PPI_NETWORK_MODE else Constants.UPDATE_GRN_GENE_DATA_FILEPATH
    
    def process_each_row(self, row):
        gene_id = row[0]
        display_gene_id = row[1]

        # Construct query based on network type (GRN vs PPI)
        if self.network_mode == Constants.GRN_NETWORK_MODE:
            regulator = row[2]
            update_query = """
                UPDATE "{}".gene
                SET display_gene_id = %s, regulator = %s
                WHERE gene_id = %s;
            """.format(Constants.GRN_DATABASE_NAMESPACE)  # Directly format the schema name here
            params = (display_gene_id, regulator, gene_id)
        elif self.network_mode == Constants.PPI_NETWORK_MODE:
            update_query = """
                UPDATE "{}".gene
                SET display_gene_id = %s
                WHERE gene_id = %s;
            """.format(Constants.PPI_DATABASE_NAMESPACE)
            params = (display_gene_id, gene_id)
        else:
            raise ValueError(f"Unknown network type '{self.network_mode}' specified. Expected 'grn' or 'ppi'.")

        return update_query, params


class ProteinUpdater(Updater):
    def __init__(self, db_url):
        super().__init__(db_url)
        self.filepath = Constants.UPDATE_PROTEIN_DATA_FILEPATH

    def process_each_row(self, row):
        gene_systematic_name = row[0]
        standard_name = row[1]
        length = row[2] if row[2] != "None" else 0
        molecular_weight = row[3]
        pi = row[4] if row[4] != "None" else 0

        update_query = """
            UPDATE {}.protein
            SET standard_name = %s, length = %s, molecular_weight = %s, pi = %s
            WHERE gene_systematic_name = %s;
        """.format(Constants.PPI_DATABASE_NAMESPACE)
        params = (standard_name, length, molecular_weight, pi, gene_systematic_name)

        return update_query, params

class ProteinProteinInteractionsUpdater(Updater):
    def __init__(self, db_url):
        super().__init__(db_url)
        self.filepath = Constants.UPDATE_PROTEIN_NAME_DATA_FILEPATH

    def process_each_row(self, row):
        old_standard_name = row[0]
        new_standard_name = row[1]

        # Use SQL CASE statement to update either protein1 or protein2
        update_query = """
            UPDATE {}.physical_interactions
            SET 
                protein1 = CASE 
                    WHEN protein1 = %s THEN %s
                    ELSE protein1 
                END,
                protein2 = CASE 
                    WHEN protein2 = %s THEN %s
                    ELSE protein2
                END
            WHERE protein1 = %s OR protein2 = %s;
        """.format(Constants.PPI_DATABASE_NAMESPACE)

        # Parameters for the query
        params = (old_standard_name, new_standard_name, old_standard_name, new_standard_name, old_standard_name, old_standard_name)

        return update_query, params

