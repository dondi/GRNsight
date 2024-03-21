import csv

"""
This function Loads Protein Protein Interactions Data Sources into the database
"""

MISSING_GENE_DESTINATION = '../script-results/processed-loader-files/missing-genes.csv'
UPDATE_GENE_DESTINATION = '../script-results/processed-loader-files/update-genes.csv'
MISSING_PROTEIN_DESTINATION = '../script-results/processed-loader-files/missing-proteins.csv'
UPDATE_PROTEIN_DESTINATION = '../script-results/processed-loader-files/update-proteins.csv'
def LOAD_SOURCES():
    print('COPY protein_protein_interactions.source (time_stamp, source, display_name) FROM stdin;')
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
    with open(MISSING_GENE_DESTINATION, 'r+') as f:
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
This Updates to Gene ID Mapping into the database
"""
def UPDATE_GENES():
    print('BEGIN;')
    with open(UPDATE_GENE_DESTINATION, 'r+') as f:
        reader = csv.reader(f)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r= ','.join(row).split('\t')
                gene_id = r[0]
                display_gene_id= r[1]
                print(f"UPDATE protein_protein_interactions.gene\nSET display_gene_id = '{display_gene_id}'\nWHERE gene_id = '{gene_id}';")
            row_num += 1
    print('COMMIT;')

"""
This function Loads Gene ID Mapping into the database
"""
def LOAD_PROTEINS():
    print('COPY protein_protein_interactions.protein (standard_name, gene_systematic_name, length, molecular_weight, PI, taxon_id) FROM stdin;')
    with open(MISSING_PROTEIN_DESTINATION, 'r+') as f:
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
This Updates to Protein ID Mapping into the database
"""
def UPDATE_PROTEINS():
    print('BEGIN;')
    with open(UPDATE_PROTEIN_DESTINATION, 'r+') as f:
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
                print(f"UPDATE protein_protein_interactions.gene\nSET standard_name = '{standard_name}', length = {length}, molecular_weight = {molecular_weight}, PI = {pi}\nWHERE gene_systematic_name = '{gene_name}';")
            row_num += 1
    print('COMMIT;')
    
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
    
# LOAD_SOURCES()
UPDATE_GENES()
UPDATE_PROTEINS()
LOAD_GENES()
LOAD_PROTEINS()
# LOAD_PHYSICAL_INTERACTIONS()