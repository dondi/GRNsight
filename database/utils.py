import csv
import os

class Utils:
    """
    A class to define utility functions. The class contains functions to load sources, 
    genes, proteins and network data into the database. These functions generate direct 
    SQL statements from the source files in order to populate a relational database with 
    those files’ data.

    By taking the approach of emitting SQL statements directly, we bypass the need to import
    some kind of database library for the loading process, instead passing the statements
    directly into a database command line utility such as `psql`.
    
    ...
    Attributes
    ----------
    
    Methods
    ----------
    load_sources(source_path: str, database_namespace: str)
        Load Sources into the database
    load_genes(gene_path: str, database_namespace: str, is_protein: bool)
        Load Gene ID Mapping into the database
    load_proteins(protein_path: str, database_namespace: str)
        Load Protein ID Mapping into the database
    load_network(network_source_path: str, database_namespace: str, is_protein: bool)
        Load Network Matrix into the database
    update_genes(update_gene_path: str, database_namespace: str, is_protein: bool)
        Update Gene ID Mapping into the database
    update_proteins(update_protein_path: str, database_namespace: str)
        Update Protein ID Mapping into the database
    """
    
    @classmethod
    def load_sources(cls, source_path: str, database_namespace: str):
        """
        Load Sources (time_stamp, source, display_name) into the database using the COPY command
        
        Parameters
        ----------
            source_path : str
                The path to the file containing the sources that want to add to the database
            database_namespace : str
                The database namespace i.e the schema name where the sources will be loaded
        """
        print(f'COPY {database_namespace}.source (time_stamp, source, display_name) FROM stdin;')
        with open(source_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    time_stamp = r[0]
                    source = r[1]
                    display_name = r[2]
                    print(f'{time_stamp}\t{source}\t{display_name}')
                row_num += 1
        print('\\.')
        
    @classmethod
    def load_network_genes(cls, gene_path: str, database_namespace: str):
        cls.load_genes(gene_path, database_namespace, is_protein = False)
        
    @classmethod
    def load_protein_genes(cls, gene_path: str, database_namespace: str):
        cls.load_genes(gene_path, database_namespace, is_protein = True)
    
    @classmethod
    def load_genes(cls, gene_path: str, database_namespace: str, is_protein: bool):
        """
        Load Gene ID Mapping into the database using the COPY command

        Parameters
        ----------
            gene_path : str
                The path to the file containing the gene data that want to add to the database
            database_namespace: str
                The database namespace i.e the schema name where the gene data will be loaded
            is_protein : bool
                A boolean value to check if the schema is for protein_protein_interactions or gene_regulatory_network
        """
        if is_protein:
            print(f'COPY {database_namespace}.gene (gene_id, display_gene_id, species, taxon_id) FROM stdin;')
        else:
            print(f'COPY {database_namespace}.gene (gene_id, display_gene_id, species, taxon_id, regulator) FROM stdin;')
        with open(gene_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    gene_id = r[0]
                    display_gene_id= r[1]
                    species = r[2]
                    taxon_id = r[3]
                    if not is_protein:
                        regulator = r[4]
                        print(f'{gene_id}\t{display_gene_id}\t{species}\t{taxon_id}\t{regulator}')
                    else:
                        print(f'{gene_id}\t{display_gene_id}\t{species}\t{taxon_id}')
                row_num += 1
        print('\\.')
        
    @classmethod
    def load_proteins(cls, protein_path: str, database_namespace: str):
        """
        Load Protein ID Mapping into the database using the COPY command

        Parameters
        ----------
            protein_path : str
                The path to the file containing the protein data that want to add to the database  
            database_namespace : str
                The database namespace i.e the schema name where the protein data will be loaded
        """
        print(f'COPY {database_namespace}.protein (standard_name, gene_systematic_name, length, molecular_weight, PI, taxon_id) FROM stdin;')
        with open(protein_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    standard_name = r[0]
                    gene_name= r[1]
                    length = r[2] if r[2] != "None" else 0
                    molecular_weight = r[3] if r[3] != "None" else 0
                    pi = r[4] if r[4] != "None" else 0
                    taxon_id = r[5]
                    print(f'{standard_name}\t{gene_name}\t{length}\t{molecular_weight}\t{pi}\t{taxon_id}')
                row_num += 1
        print('\\.')
        
    @classmethod
    def load_network(cls, network_source_path: str, database_namespace: str, is_protein: bool):
        """
        Load Network Matrix into the database using the COPY command

        Parameters
        ----------
            network_source_path : str
                The path to the file containing the network data that want to add to the database
            database_namespace : str
                The database namespace i.e the schema name where the network data will be loaded
            is_protein : bool
                A boolean value to check if the schema is for protein_protein_interactions or gene_regulatory_network
        """
        if is_protein:
            print(f'COPY {database_namespace}.physical_interactions (protein1, protein2, interaction_detection_methods_identifier, experiment_name, time_stamp, source) FROM stdin;');
        else:
            print(f'COPY {database_namespace}.network (regulator_gene_id, target_gene_id, taxon_id, time_stamp, source) FROM stdin;')
        with open(network_source_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    if is_protein:
                        protein1 = r[0]
                        protein2= r[1]
                        idmi = r[2]
                        exp_name = r[3]
                        timestamp = r[4]
                        source = r[5]
                        print(f'{protein1}\t{protein2}\t{idmi}\t{exp_name}\t{timestamp}\t{source}')
                    else:
                        regulator_gene_id = r[0]
                        target_gene_id= r[1]
                        taxon_id = r[2]
                        time_stamp = r[3]
                        source = r[4]
                        print(f'{regulator_gene_id}\t{target_gene_id}\t{taxon_id}\t{time_stamp}\t{source}')
                row_num += 1
        print('\\.')
    
    @classmethod    
    def update_genes(cls, update_gene_path: str, database_namespace: str, is_protein: bool):
        """
        Update Gene ID Mapping into the database

        Parameters
        ----------
            update_gene_path : str
                The path to the file containing the gene data that want to update in the database
            database_namespace : str
                The database namespace i.e the schema name where the gene data will be updated
            is_protein : bool
                A boolean value to check if the schema is for protein_protein_interactions or gene_regulatory_network
        """
        print('BEGIN;')
        with open(update_gene_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    gene_id = r[0]
                    display_gene_id= r[1]
                    if is_protein:
                        print(f"UPDATE {database_namespace}.gene\nSET display_gene_id = '{display_gene_id}'\nWHERE gene_id = '{gene_id}';")
                    else:
                        regulator = r[2]
                        print(f"UPDATE {database_namespace}.gene\nSET display_gene_id = '{display_gene_id}', regulator={regulator}\nWHERE gene_id = '{gene_id}';")
                row_num += 1
        print('COMMIT;')
    
    @classmethod    
    def update_proteins(cls, update_protein_path: str, database_namespace: str):
        """
        Update Protein ID Mapping into the database
        
        Args:
            update_protein_path : str
                The path to the file containing the protein data that want to update in the database
            database_namespace : str
                The database namespace i.e the schema name where the protein data will be updated
        """
        print('BEGIN;')
        with open(update_protein_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    standard_name = r[0]
                    gene_name= r[1]
                    length = r[2] if r[2] != "None" else 0
                    molecular_weight = r[3] if r[3] != "None" else 0
                    pi = r[4] if r[4] != "None" else 0
                    print(f"UPDATE {database_namespace}.gene\nSET standard_name = '{standard_name}', length = {length}, molecular_weight = {molecular_weight}, PI = {pi}\nWHERE gene_systematic_name = '{gene_name}';")
                row_num += 1
        print('COMMIT;')