from constants import Constants
from utils import Utils
import os

if not os.path.exists('union-gene-data'):
    os.makedirs('union-gene-data')
    
# Get missing union gene data
Utils.create_union_file([Constants.PROTEIN_MISSING_GENE_DIRECTORY, Constants.NETWORK_MISSING_GENE_DIRECTORY], Constants.MISSING_GENE_UNION_DIRECTORY)

# Get update union gene data
Utils.create_union_file([Constants.PROTEIN_UPDATE_GENE_DIRECTORY, Constants.NETWORK_UPDATE_GENE_DIRECTORY], Constants.UPDATE_GENE_UNION_DIRECTORY)

# Proteins
Utils.load_sources(Constants.PROTEIN_SOURCE_TABLE_DATA_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.update_protein_genes(Constants.UPDATE_GENE_UNION_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.update_proteins(Constants.PROTEIN_UPDATE_PROTEIN_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.load_genes(Constants.MISSING_GENE_UNION_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE, is_protein=True)
Utils.load_proteins(Constants.PROTEIN_MISSING_PROTEIN_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE)
Utils.load_network(Constants.PROTEIN_NETWORK_TABLE_DATA_DIRECTORY, Constants.PROTEIN_DATABASE_NAMESPACE, is_protein=True)

# Network
Utils.load_sources(Constants.NETWORK_SOURCE_TABLE_DATA_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)
Utils.update_network_genes(Constants.UPDATE_GENE_UNION_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)
Utils.load_network_genes(Constants.MISSING_GENE_UNION_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)
Utils.load_network_network(Constants.NETWORK_NETWORK_TABLE_DATA_DIRECTORY, Constants.NETWORK_DATABASE_NAMESPACE)