import csv
import re
import argparse
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
Stolen from https://www.kite.com/python/answers/how-to-check-if-a-string-is-a-valid-float-in-python
"""
def check_float(potential_float):
    try:
        float(potential_float)
        return True
    except ValueError:
        return False
"""
Inspired by https://www.kite.com/python/answers/how-to-check-if-a-string-is-a-valid-float-in-python
"""
def check_int(potential_int):
    try:
        int(potential_int)
        return True
    except ValueError:
        return False
"""
Created out of necessity
"""
def convert_float(potential_float):
    return float("".join(potential_float.split()).replace(" ", "")) if "".join(potential_float.split()).replace(" ", "") else -0.000000000001
"""
Created out of necessity
"""
def convert_int(potential_int):
    return int("".join(potential_int.split()).replace(" ", "")) if check_int("".join(potential_int.split()).replace(" ", "")) else -1111111


"""
This program Loads Refs into the database
"""
def LOAD_REFS():
    print('COPY gene_expression.ref (pubmed_id, authors, publication_year, title, doi, ncbi_geo_id) FROM stdin;')
    REFS_SOURCE = '../script-results/processed-expression/refs.csv'
    with open(REFS_SOURCE, 'r+') as f:
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
This program Loads ID Mapping into the database
"""
def LOAD_GENES():
    print('COPY gene_expression.gene (gene_id, display_gene_id, species, taxon_id) FROM stdin;')
    GENE_SOURCE = '../script-results/processed-expression/genes.csv'
    with open(GENE_SOURCE, 'r+') as f:
        reader = csv.reader(f)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r=  ','.join(row).split('\t')
                gene_id = r[0]
                display_gene_id= r[1]
                species = r[2]
                taxon_id = r[3]
                print(f'{gene_id}\t{display_gene_id}\t{species}\t{taxon_id}')
            row_num += 1
    print('\\.')

"""
This program Loads Expression Metadata into the database
"""
def LOAD_EXPRESSION_METADATA():
    print('COPY gene_expression.expression_metadata (ncbi_geo_id, pubmed_id, control_yeast_strain, treatment_yeast_strain, control, treatment, concentration_value, concentration_unit, time_value, time_unit, number_of_replicates, expression_table) FROM stdin;')
    EXPRESSION_METADATA_SOURCE = '../script-results/processed-expression/expression-metadata.csv'
    with open(EXPRESSION_METADATA_SOURCE, 'r+') as f:
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
def LOAD_EXPRESSION_DATA():
    print('COPY gene_expression.expression (gene_id, taxon_id, sort_index, sample_id, expression, time_point, dataset) FROM stdin;')
    EXPRESSION_DATA_SOURCE = '../script-results/processed-expression/expression-data.csv'
    with open(EXPRESSION_DATA_SOURCE, 'r+') as f:
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
def LOAD_PRODUCTION_RATES():
    print('TRUNCATE TABLE gene_expression.production_rate;')
    print('COPY gene_expression.production_rate (gene_id, taxon_id, ncbi_geo_id, pubmed_id, production_rate) FROM stdin;')
    PRODUCTION_RATES_SOURCE = '../script-results/processed-expression/production-rates.csv'
    with open(PRODUCTION_RATES_SOURCE, 'r+') as f:
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
def LOAD_DEGRADATION_RATES():
    print('TRUNCATE TABLE gene_expression.degradation_rate;')
    print('COPY gene_expression.degradation_rate (gene_id, taxon_id, ncbi_geo_id, pubmed_id, degradation_rate) FROM stdin;')
    DEGRADATION_RATES_SOURCE = '../script-results/processed-expression/degradation-rates.csv'
    with open(DEGRADATION_RATES_SOURCE, 'r+') as f:
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

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Load expression data into the database.")
    
    load_actions = {
        "refs": (LOAD_REFS, "Load references into the database."),
        "genes": (LOAD_GENES, "Load gene ID mappings into the database."),
        "meta": (LOAD_EXPRESSION_METADATA, "Load expression metadata into the database."),
        "expr": (LOAD_EXPRESSION_DATA, "Load expression data into the database."),
        "prod": (LOAD_PRODUCTION_RATES, "Load production rates into the database."),
        "deg": (LOAD_DEGRADATION_RATES, "Load degradation rates into the database."),
    }

    parser.add_argument("--all", action="store_true", help="Load all data into the database.")

    for flag in load_actions:
        parser.add_argument(f"--{flag}", action="store_true", help=load_actions[flag][1])

    args = parser.parse_args()
    args_dict = vars(args)

    # If no flags were provided, default to --all
    if not any(args_dict.values()):
        args.all = True

    # Always make the genes load first if asking for expression, production, or degradation
    if args.all or args.expr or args.prod or args.deg:
        args.genes = True
    for flag, _ in load_actions.items():
        if args.all or args_dict.get(flag):
            load_actions[flag][0]()
