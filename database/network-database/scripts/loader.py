import csv
import re
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
This function Loads Network Data Sources into the database
"""
def LOAD_SOURCES():
    print('COPY spring2022_network.source (time_stamp, source, source_display_name) FROM stdin;')
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
    print('COPY spring2022_network.gene (gene_id, display_gene_id, species, taxon_id, regulator) FROM stdin;')
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
                regulator = r[4]
                print(f'{gene_id}\t{display_gene_id}\t{species}\t{taxon_id}\t{regulator}')
            row_num += 1
    print('\\.')


"""
This function Loads the Network Matrix into the database
"""
def LOAD_NETWORK():
    print('COPY spring2022_network.network (regulator_gene_id, target_gene_id, taxon_id, time_stamp, source) FROM stdin;')
    NETWORK_SOURCE = '../script-results/processed-loader-files/network.csv'
    with open(NETWORK_SOURCE, 'r+') as f:
        reader = csv.reader(f)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r= ','.join(row).split('\t')
                regulator_gene_id = r[0]
                target_gene_id= r[1]
                taxon_id = r[2]
                time_stamp = r[3]
                source = r[4]
                print(f'{regulator_gene_id}\t{target_gene_id}\t{taxon_id}\t{time_stamp}\t{source}')
            row_num += 1
    print('\\.')

LOAD_SOURCES()
LOAD_GENES()
LOAD_NETWORK()
