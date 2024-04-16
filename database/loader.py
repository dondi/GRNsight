import csv
from utils import *

# python3 loader.py | psql postgresql://localhost/postgres

GENE_DATA_DIRECTORY = 'union_genes.csv'
# Network data source file path
# Constants name: NETWORK_<table_name>_DATA_DIRECTORY
NETWORK_DATABASE_NAMESPACE = 'gene_regulatory_network_testing'
NETWORK_SOURCE_TABLE_DATA_DIRECTORY = 'network-database/script-results/processed-loader-files/source.csv'
NETWORK_NETWORK_TABLE_DATA_DIRECTORY = 'network-database/script-results/processed-loader-files/network.csv'

Utils.load_sources(NETWORK_SOURCE_TABLE_DATA_DIRECTORY, NETWORK_DATABASE_NAMESPACE)
Utils.load_network_genes(GENE_DATA_DIRECTORY, NETWORK_DATABASE_NAMESPACE)
Utils.load_network_network(NETWORK_NETWORK_TABLE_DATA_DIRECTORY, NETWORK_DATABASE_NAMESPACE)

# Protein-protein-interactions
PROTEIN_DATABASE_NAMESPACE = 'protein_protein_interactions_testing'
PROTEIN_SOURCE_TABLE_DATA_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/source.csv'
PROTEIN_NETWORK_TABLE_DATA_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/physical_interaction_no_dupe.csv'
PROTEIN_PROTEIN_TABLE_DATA_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/protein.csv'

Utils.load_sources(PROTEIN_SOURCE_TABLE_DATA_DIRECTORY, PROTEIN_DATABASE_NAMESPACE)
Utils.load_protein_genes(GENE_DATA_DIRECTORY, PROTEIN_DATABASE_NAMESPACE)
Utils.load_proteins(PROTEIN_PROTEIN_TABLE_DATA_DIRECTORY, PROTEIN_DATABASE_NAMESPACE)
Utils.load_protein_network(PROTEIN_NETWORK_TABLE_DATA_DIRECTORY, PROTEIN_DATABASE_NAMESPACE)

# Expression data
EXPRESISON_DATABASE_NAMESPACE = 'gene_expression_testing'
EXPRESSION_REFS_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/refs.csv'
EXPRESSION_METADATA_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/expression-metadata.csv'
EXPRESSION_EXPRESSION_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/expression-data.csv'
EXPRESSION_PRODUCTION_RATE_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/production-rates.csv'
EXPRESSION_DEGRADATION_RATE_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/degradation-rates.csv'

Utils.load_refs(EXPRESSION_REFS_TABLE_DATA_DIRECTORY, EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_genes(GENE_DATA_DIRECTORY, EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_metadata(EXPRESSION_METADATA_TABLE_DATA_DIRECTORY, EXPRESISON_DATABASE_NAMESPACE)
Utils.load_expression_data(EXPRESSION_EXPRESSION_TABLE_DATA_DIRECTORY, EXPRESISON_DATABASE_NAMESPACE)
Utils.load_production_rates(EXPRESSION_PRODUCTION_RATE_TABLE_DATA_DIRECTORY, EXPRESISON_DATABASE_NAMESPACE)
Utils.load_degradation_rates(EXPRESSION_DEGRADATION_RATE_TABLE_DATA_DIRECTORY, EXPRESISON_DATABASE_NAMESPACE)