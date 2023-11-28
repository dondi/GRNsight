
import csv

# Usage
# python3 loader.py | psql postgresql://localhost/postgres
"""
This program generates direct SQL statements from the source files in order
to populate a relational database with those files’ data.

By taking the approach of emitting SQL statements directly, we bypass the need to import
some kind of database library for the loading process, instead passing the statements
directly into a database command line utility such as `psql`.
"""

"""
This function Loads Protein-Protein Network Data Sources into the database
"""
def LOAD_SOURCES():
    print('COPY protein_protein_interactions (time_stamp, source, display_name) FROM stdin;')
    NETWORK_DATA_SOURCE = '../script-results/processed-loader-files/source.csv'
    with open(NETWORK_DATA_SOURCE, 'r+') as f:
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

"""
This function Loads Gene ID Mapping into the database
"""
def LOAD_GENES():
    print('COPY protein_protein_interactions.gene (gene_id, display_gene_id, species, taxon_id) FROM stdin;')
    GENE_SOURCE = '../script-results/processed-loader-files/gene.csv'
    with open(GENE_SOURCE, 'r+') as f:
        reader = csv.reader(f)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r= ','.join(row).split('\t')
                gene_id = r[0]
                display_gene_id= r[1]
                species = r[2]
                taxon_id = r[3]
                print(f'{gene_id}\t{display_gene_id}\t{species}\t{taxon_id}')
            row_num += 1
    print('\\.')

"""
This function Loads Protein ID Mapping into the database
"""
def LOAD_PROTEINS():
    print('COPY protein_protein_interactions.protein (standard_name, gene_systematic_name, length, molecular_weight, PI, taxon_id) FROM stdin;')
    PROTEIN_SOURCE = '../script-results/processed-loader-files/protein.csv'
    with open(PROTEIN_SOURCE, 'r+') as f:
        reader = csv.reader(f)
        row_num = 0
        taxon_id =559292
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

"""
This function Loads the Network Matrix of physical interactions into the database
"""
def LOAD_PHYSICAL_INTERACTIONS():
    print('COPY protein_protein_interactions.physical_interactions (protein1, protein2, interaction_detection_methods_identifier, experiment_name, time_stamp, source) FROM stdin;')
    NETWORK_SOURCE = '../script-results/processed-loader-files/physical_interaction_no_dupe.csv'
    with open(NETWORK_SOURCE, 'r+') as f:
        reader = csv.reader(f)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r= ','.join(row).split('\t')
                protein1 = r[0]
                protein2= r[1]
                idmi = r[2]
                exp_name = r[3]
                timestamp = r[4]
                source = r[5]
                print(f'{protein1}\t{protein2}\t{idmi}\t{exp_name}\t{timestamp}\t{source}')
            row_num += 1
    print('\\.')
    
def TRUNCATE_TABLES():
    # Truncate tables to remove existing data
    print('TRUNCATE TABLE protein_protein_interactions.physical_interactions, protein_protein_interactions.protein, protein_protein_interactions.gene, protein_protein_interactions;')

# Call the TRUNCATE_TABLES function before loading data
TRUNCATE_TABLES()

LOAD_SOURCES()
LOAD_GENES()
LOAD_PROTEINS()
LOAD_PHYSICAL_INTERACTIONS()