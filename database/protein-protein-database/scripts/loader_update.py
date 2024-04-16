import csv
from constants import *
import sys

sys.path.insert(1, '../database')
from utils import *
    
Utils.load_sources(Constants.NETWORK_DATA_SOURCE, Constants.DATABASE_NAMESPACE)
Utils.update_protein_genes(Constants.UPDATE_GENE_DESTINATION, Constants.DATABASE_NAMESPACE)
Utils.update_proteins(Constants.UPDATE_PROTEIN_DESTINATION, Constants.DATABASE_NAMESPACE)
Utils.load_genes(Constants.MISSING_GENE_DESTINATION, Constants.DATABASE_NAMESPACE, is_protein=True)
Utils.load_proteins(Constants.MISSING_PROTEIN_DESTINATION, Constants.DATABASE_NAMESPACE)
Utils.load_network(Constants.NETWORK_SOURCE, Constants.DATABASE_NAMESPACE, is_protein=True)