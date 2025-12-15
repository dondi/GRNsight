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

def copy_to_staging_then_upsert(
    staging_table: str,
    target_table: str,
    columns: list[str],
    source_path: str,
    conflict_cols: list[str] | None,
    update_cols: list[str] | None,
    select_exprs: list[str] | None = None,
):
    """
    Loads data from a source file into a temporary staging table, then inserts or upserts the data into a target table.
    This function is intended for bulk loading data into a database using SQL statements. It first creates a temporary
    staging table with the specified columns, loads data from the given source file (tab-delimited), and then inserts
    the data into the target table. If conflict columns are specified, it performs an upsert (insert or update on conflict).
    Parameters:
        staging_table (str): Name of the temporary staging table to create.
        target_table (str): Name of the target table to insert/upsert data into.
        columns (list[str]): List of column names for both the staging and target tables.
        source_path (str): Path to the source file containing data to load (tab-delimited, with header).
        conflict_cols (list[str] | None): List of columns to check for conflicts (used in ON CONFLICT clause).
            If None, a simple insert is performed with no conflict handling.
        update_cols (list[str] | None): List of columns to update if a conflict occurs. If provided, an upsert is performed
            (ON CONFLICT DO UPDATE SET ...). If None, conflicts are ignored (ON CONFLICT DO NOTHING).
        select_exprs (list[str] | None): Optional list of SQL expressions to use in the SELECT statement when inserting
            from the staging table. If None, all columns are selected as-is.
    Behavior:
        - Creates a temporary staging table with all columns as text.
        - Loads data from the source file into the staging table using COPY.
        - If conflict_cols is None, performs a simple INSERT INTO target_table SELECT ... FROM staging_table.
        - If conflict_cols is provided and update_cols is provided, performs an upsert (ON CONFLICT DO UPDATE SET ...).
        - If conflict_cols is provided and update_cols is None, performs an insert with ON CONFLICT DO NOTHING.
        - select_exprs can be used to transform or cast columns during the insert/upsert.
    """
    cols_sql = ", ".join([f"{c} text" for c in columns])
    print(f"CREATE TEMP TABLE {staging_table} ({cols_sql});")

    col_list = ", ".join(columns)
    print(f"COPY {staging_table} ({col_list}) FROM STDIN WITH (FORMAT text);")

    with open(source_path, "r", newline="") as f:
        reader = csv.reader(f, delimiter="\t")
        next(reader, None)

        for row in reader:
            print("\t".join(row))
    print("\\.")

    select_sql = col_list if select_exprs is None else ", ".join(select_exprs)

    # If no possible conflicts, do a straight insert
    if conflict_cols is None:
        print(f"""
            INSERT INTO {target_table} ({col_list})
            SELECT {select_sql} FROM {staging_table};
            """
        )
        return

    # If there are possible updates, do an upsert
    # else do insert on conflict do nothing
    conflict = ", ".join(conflict_cols)
    if update_cols:
        set_sql = ", ".join([f"{c} = EXCLUDED.{c}" for c in update_cols])
        print(f"""
            INSERT INTO {target_table} ({col_list})
            SELECT {select_sql} FROM {staging_table}
            ON CONFLICT ({conflict}) DO UPDATE SET {set_sql};
            """
        )
    else:
        print(f"""
            INSERT INTO {target_table} ({col_list})
            SELECT {select_sql} FROM {staging_table}
            ON CONFLICT ({conflict}) DO NOTHING;
            """
        )


"""
This program Loads Refs into the database
"""
def LOAD_REFS():
    copy_to_staging_then_upsert(
        staging_table="staging_refs",
        target_table="gene_expression.ref",
        columns=["pubmed_id", "authors", "publication_year", "title", "doi", "ncbi_geo_id"],
        source_path="../script-results/processed-expression/refs.csv",
        conflict_cols=["ncbi_geo_id", "pubmed_id"],
        update_cols=["authors", "publication_year", "title", "doi"]
    )


"""
This program Loads ID Mapping into the database
"""
def LOAD_GENES():
    copy_to_staging_then_upsert(
        staging_table="staging_genes",
        target_table="gene_expression.gene",
        columns=["gene_id", "display_gene_id", "species", "taxon_id"],
        source_path="../script-results/processed-expression/genes.csv",
        conflict_cols=["gene_id", "taxon_id"],
        update_cols=["display_gene_id", "species"],
        select_exprs=[
            "NULLIF(gene_id,'')",
            "NULLIF(display_gene_id,'')",
            "NULLIF(species,'')",
            "NULLIF(taxon_id,'')",
        ],
    )

"""
This program Loads Expression Metadata into the database
"""
def LOAD_EXPRESSION_METADATA():
    copy_to_staging_then_upsert(
        staging_table="staging_expr_meta",
        target_table="gene_expression.expression_metadata",
        columns=[
            "ncbi_geo_id","pubmed_id","control_yeast_strain","treatment_yeast_strain",
            "control","treatment","concentration_value","concentration_unit",
            "time_value","time_unit","number_of_replicates","expression_table"
        ],
        source_path="../script-results/processed-expression/expression-metadata.csv",
        conflict_cols=["ncbi_geo_id","pubmed_id","time_value"],
        update_cols=[
            "control_yeast_strain","treatment_yeast_strain","control","treatment",
            "concentration_value","concentration_unit","time_unit","number_of_replicates",
            "expression_table"
        ],
        select_exprs=[
            "NULLIF(ncbi_geo_id,'')",
            "NULLIF(pubmed_id,'')",
            "NULLIF(control_yeast_strain,'')",
            "NULLIF(treatment_yeast_strain,'')",
            "NULLIF(control,'')",
            "NULLIF(treatment,'')",
            "NULLIF(NULLIF(concentration_value,''),'NaN')::double precision",
            "NULLIF(concentration_unit,'')",
            "NULLIF(NULLIF(time_value,''),'NaN')::double precision",
            "NULLIF(time_unit,'')",
            "NULLIF(number_of_replicates,'')::int",
            "NULLIF(expression_table,'')"
        ],
    )


"""
This program Loads Expression Data into the database
"""
def LOAD_EXPRESSION_DATA():
    copy_to_staging_then_upsert(
        staging_table="staging_expr",
        target_table="gene_expression.expression",
        columns=["gene_id","taxon_id","sort_index","sample_id","expression","time_point","dataset"],
        source_path="../script-results/processed-expression/expression-data.csv",
        conflict_cols=["gene_id","sample_id"],
        update_cols=["taxon_id","sort_index","expression","time_point","dataset"],
        select_exprs=[
            "NULLIF(gene_id,'')",
            "NULLIF(taxon_id,'')",
            "NULLIF(sort_index,'')::int",
            "NULLIF(sample_id,'')",
            "NULLIF(NULLIF(expression,''),'NaN')::double precision",
            "NULLIF(NULLIF(time_point,''),'NaN')::double precision",
            "NULLIF(dataset,'')",
        ],
    )


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
