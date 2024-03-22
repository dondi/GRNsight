
import csv
from constants import *
from utils import *
# Usage
# python3 loader.py | psql postgresql://localhost/postgres
"""
This program generates direct SQL statements from the source files in order
to populate a relational database with those files’ data.

By taking the approach of emitting SQL statements directly, we bypass the need to import
some kind of database library for the loading process, instead passing the statements
directly into a database command line utility such as `psql`.
"""

Utils.load_sources(Constants.NETWORK_DATA_SOURCE, Constants.DATABASE_NAMESPACE)
Utils.load_genes(Constants.GENE_SOURCE, Constants.DATABASE_NAMESPACE, True)
Utils.load_proteins(Constants.PROTEIN_SOURCE, Constants.DATABASE_NAMESPACE)
Utils.load_network(Constants.NETWORK_SOURCE, Constants.DATABASE_NAMESPACE, True)