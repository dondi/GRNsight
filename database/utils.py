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
    update_ppi_proteins(update_protein_path: str, database_namespace: str)
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
    def load_grn_genes(cls, gene_path: str, database_namespace: str):
        cls._load_genes(gene_path, database_namespace, is_grn = True)
        
    @classmethod
    def load_ppi_genes(cls, gene_path: str, database_namespace: str):
        cls._load_genes(gene_path, database_namespace, is_grn = False)
        
    @classmethod
    def load_expression_genes(cls, gene_path: str, database_namespace: str):
        cls._load_genes(gene_path, database_namespace, is_grn = False)
    
    @classmethod
    def _load_genes(cls, gene_path: str, database_namespace: str, is_grn: bool):
        """
        Load Gene ID Mapping into the database using the COPY command

        Parameters
        ----------
            gene_path : str
                The path to the file containing the gene data that want to add to the database
            database_namespace: str
                The database namespace i.e the schema name where the gene data will be loaded
            is_grn : bool
                A boolean value to check if the schema is for gene_regulatory_network
        """
        if is_grn:
            print(f'COPY {database_namespace}.gene (gene_id, display_gene_id, species, taxon_id, regulator) FROM stdin;')
        else:
            print(f'COPY {database_namespace}.gene (gene_id, display_gene_id, species, taxon_id) FROM stdin;')
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
                    if is_grn:
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
    def load_ppi_network(cls, network_source_path: str, database_namespace: str):
        cls._load_network(network_source_path, database_namespace, is_protein = True)
    
    @classmethod
    def load_grn_network(cls, network_source_path: str, database_namespace: str):
        cls._load_network(network_source_path, database_namespace, is_protein = False)
        
    @classmethod
    def _load_network(cls, network_source_path: str, database_namespace: str, is_protein: bool):
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
    def update_grn_genes(cls, gene_path: str, database_namespace: str):
        cls._update_genes(gene_path, database_namespace, is_protein = False)
    
    @classmethod
    def update_ppi_genes(cls, gene_path: str, database_namespace: str):
        cls._update_genes(gene_path, database_namespace, is_protein = True)
        
    @classmethod
    def update_expression_genes(cls, gene_path: str, database_namespace: str):
        cls._update_genes(gene_path, database_namespace, is_protein = False)
    
    @classmethod    
    def _update_genes(cls, update_gene_path: str, database_namespace: str, is_protein: bool):
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
    def update_ppi_proteins(cls, update_protein_path: str, database_namespace: str):
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
    
    # The following functions are for expression database specifically
    """
    This program Loads Refs into the database
    """
    @classmethod
    def load_refs(cls, refs_path: str, database_namespace: str):
        print(f'COPY {database_namespace}.ref (pubmed_id, authors, publication_year, title, doi, ncbi_geo_id) FROM stdin;')
        with open(refs_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r=  ','.join(row).split('\t')
                    pubmed_id = r[0]
                    authors = r[1]
                    publication_year = r[2]
                    title = r[3]
                    doi = r[4]
                    ncbi_geo_id = r[5]
                    print(f'{pubmed_id}\t{authors}\t{publication_year}\t{title}\t{doi}\t{ncbi_geo_id}')
                row_num += 1
        print('\\.')
        
    """
    This program Loads Expression Metadata into the database
    """
    @classmethod
    def load_expression_metadata(cls, expression_metadata_path: str, database_namespace: str):
        print(f'COPY {database_namespace}.expression_metadata (ncbi_geo_id, pubmed_id, control_yeast_strain, treatment_yeast_strain, control, treatment, concentration_value, concentration_unit, time_value, time_unit, number_of_replicates, expression_table) FROM stdin;')
        with open(expression_metadata_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r=  ','.join(row).split('\t')
                    ncbi_geo_id = r[0]
                    pubmed_id =r[1]
                    control_yeast_strain = r[2]
                    treatment_yeast_strain = r[3]
                    control = r[4]
                    treatment = r[5]
                    concentration_value = float(r[6])
                    concentration_unit = r[7]
                    time_value = float(r[8])
                    time_unit = r[9]
                    number_of_replicates = int(r[10])
                    expression_table = r[11]

                    print(f'{ncbi_geo_id}\t{pubmed_id}\t{control_yeast_strain}\t{treatment_yeast_strain}\t{control}\t{treatment}\t{concentration_value}\t{concentration_unit}\t{time_value}\t{time_unit}\t{number_of_replicates}\t{expression_table}')
                row_num += 1
        print('\\.')
    """
    This program Loads Expression Data into the database
    """
    @classmethod
    def load_expression_data(cls, expression_data_path: str, database_namespace: str):
        print(f'COPY {database_namespace}.expression (gene_id, taxon_id, sort_index, sample_id, expression, time_point, dataset) FROM stdin;')
        with open(expression_data_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r=  ','.join(row).split('\t')
                    gene_id = r[0]
                    taxon_id = r[1]
                    sort_index = int(r[2])
                    sample_id = r[3]
                    expression = float(r[4]) if r[4] != "" else "NaN"

                    time_point = float(r[5])
                    data_set = r[6]
                    print(f'{gene_id}\t{taxon_id}\t{sort_index}\t{sample_id}\t{expression}\t{time_point}\t{data_set}')
                row_num += 1
        print('\\.')

    """
    This program Loads Production Rates into the database
    """
    @classmethod
    def load_production_rates(cls, production_rates_path: str, database_namespace: str):
        print(f'COPY {database_namespace}.production_rate (gene_id, taxon_id, ncbi_geo_id, pubmed_id, production_rate) FROM stdin;')
        with open(production_rates_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r=  ','.join(row).split('\t')
                    gene_id = r[0]
                    taxon_id = r[1]
                    ncbi_geo_id = r[2]
                    pubmed_id = r[3]
                    production_rate = float(r[4]) if r[4] != "" else "NaN"
                    print(f'{gene_id}\t{taxon_id}\t{ncbi_geo_id}\t{pubmed_id}\t{production_rate}')
                row_num += 1
        print('\\.')

    """
    This program Loads Degradation Rates into the database
    """
    @classmethod
    def load_degradation_rates(cls, degradation_rates_path: str, database_namespace: str):
        print(f'COPY {database_namespace}.degradation_rate (gene_id, taxon_id, ncbi_geo_id, pubmed_id, degradation_rate) FROM stdin;')
        with open(degradation_rates_path, 'r+') as f:
            reader = csv.reader(f)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r=  ','.join(row).split('\t')
                    gene_id = r[0]
                    taxon_id = r[1]
                    ncbi_geo_id = r[2]
                    pubmed_id = r[3]
                    degradation_rate = float(r[4]) if r[4] != "" else "NaN"
                    print(f'{gene_id}\t{taxon_id}\t{ncbi_geo_id}\t{pubmed_id}\t{degradation_rate}')
                row_num += 1
        print('\\.')
        
    @classmethod
    def _read_gene_info_from_csv(cls, file_path):
        gene_info = {}
        with open(file_path, 'r') as file:
            reader = csv.reader(file)
            row_num = 0
            for row in reader:
                if row_num != 0:
                    r= ','.join(row).split('\t')
                    if len(r) == 4:
                        r.append('False')
                    if r[1] == 'None':
                        r[1] = r[0]
                    gene_info[r[0]] = {
                        'Display Gene ID': r[1],
                        'Species': r[2],
                        'Taxon': r[3],
                        'Regulator': r[4]
                    }
                row_num += 1
        return gene_info
    
    @classmethod
    def create_union_file(cls, file_paths, output_file_path):
        """
        Create a union file containing all unique genes from all input files.

        Args:
            file_paths (List[str]): a list of file paths to read genes from (should list network genes file path at the end) because it can overwrite the regulator status of the gene
            output_file_path (str): the file path to write the union genes to
        """
        all_gene_info = {}
        
        for file_path in file_paths:
            gene_info = cls._read_gene_info_from_csv(file_path)
            all_gene_info.update(gene_info)
            
        with open(output_file_path, 'w', newline='') as union_file:
            headers = ['Gene ID', 'Display Gene ID', 'Species', 'Taxon', 'Regulator']
            union_file.write('\t'.join(headers) + '\n')
            
            for gene_id, gene_info in all_gene_info.items():
                row_data = [gene_id, gene_info['Display Gene ID'], gene_info['Species'], gene_info['Taxon'], gene_info['Regulator']]
                union_file.write('\t'.join(row_data) + '\n')