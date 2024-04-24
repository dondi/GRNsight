import csv
from utils import *
from constants import Constants
# python3 loader.py | psql postgresql://localhost/postgres
import os

if not os.path.exists('union-gene-data'):
    os.makedirs('union-gene-data')
    
# Get union gene data
Utils.create_union_file([Constants.EXPRESSION_GENE_SOURCE, Constants.PPI_GENE_SOURCE, Constants.GRN_GENE_SOURCE], Constants.GENE_DATA_DIRECTORY)

# Regulatory Network
Utils.load_sources(Constants.GRN_SOURCE_TABLE_DATA_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
Utils.load_grn_genes(Constants.GRN_GENE_SOURCE, Constants.GRN_DATABASE_NAMESPACE)
Utils.load_grn_network(Constants.GRN_NETWORK_TABLE_DATA_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)

# Protein-protein-interactions
Utils.load_sources(Constants.PPI_SOURCE_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.load_ppi_genes(Constants.PPI_GENE_SOURCE, Constants.PPI_DATABASE_NAMESPACE)
Utils.load_proteins(Constants.PPI_PROTEIN_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.load_ppi_network(Constants.PPI_NETWORK_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)

# Expression data
Utils.load_refs(Constants.EXPRESSION_REFS_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_genes(Constants.EXPRESSION_GENE_SOURCE, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_metadata(Constants.EXPRESSION_METADATA_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_data(Constants.EXPRESSION_EXPRESSION_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_production_rates(Constants.EXPRESSION_PRODUCTION_RATE_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)
Utils.load_degradation_rates(Constants.EXPRESSION_DEGRADATION_RATE_TABLE_DATA_DIRECTORY, Constants.EXPRESISON_DATABASE_NAMESPACE)