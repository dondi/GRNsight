import csv
from utils import *
from constants import Constants
# python3 loader.py | psql postgresql://localhost/postgres
import os

if not os.path.exists('union-gene-data'):
    os.makedirs('union-gene-data')
    
# Get union gene data
Utils.create_union_file([Constants.EXPRESSION_GENE_SOURCE, Constants.PROTEIN_GENE_SOURCE, Constants.NETWORK_GENE_SOURCE], Constants.GENE_DATA_DIRECTORY)

# Regulatory Network
Utils.load_sources(Constants.NETWORK_SOURCE_TABLE_DATA_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)
Utils.load_network_genes(Constants.GENE_DATA_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)
Utils.load_network_network(Constants.NETWORK_NETWORK_TABLE_DATA_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)

# Protein-protein-interactions
Utils.load_sources(Constants.PROTEIN_SOURCE_TABLE_DATA_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.load_protein_genes(Constants.GENE_DATA_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.load_proteins(Constants.PROTEIN_PROTEIN_TABLE_DATA_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.load_protein_network(Constants.PROTEIN_NETWORK_TABLE_DATA_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)

# Expression data
Utils.load_refs(Constants.EXPRESSION_REFS_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_genes(Constants.GENE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_metadata(Constants.EXPRESSION_METADATA_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_data(Constants.EXPRESSION_EXPRESSION_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_production_rates(Constants.EXPRESSION_PRODUCTION_RATE_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_degradation_rates(Constants.EXPRESSION_DEGRADATION_RATE_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)