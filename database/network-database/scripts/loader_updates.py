import sys
sys.path.insert(1, '../database')
from constants import *
from utils import *

# Usage
# python3 loader.py | psql postgresql://localhost/postgres

Utils.update_genes(Constants.GENE_UPDATE_DESTINATION, Constants.DATABASE_NAMESPACE, is_protein=False)
Utils.load_sources(Constants.NETWORK_DATA_SOURCE, Constants.DATABASE_NAMESPACE)
Utils.load_genes(Constants.GENE_SOURCE, Constants.DATABASE_NAMESPACE, is_protein=False)
Utils.load_network(Constants.NETWORK_SOURCE, Constants.DATABASE_NAMESPACE, is_protein=False)
