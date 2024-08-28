from constants import Constants
from utils import Utils
import os

if not os.path.exists('union-gene-data'):
    os.makedirs('union-gene-data')
    
# Get missing union gene data
Utils.create_union_file([Constants.PPI_MISSING_GENE_DIRECTORY, Constants.GRN_MISSING_GENE_DIRECTORY], Constants.MISSING_GENE_UNION_DIRECTORY)

# Get update union gene data
Utils.create_union_file([Constants.PPI_UPDATE_GENE_DIRECTORY, Constants.GRN_UPDATE_GENE_DIRECTORY], Constants.UPDATE_GENE_UNION_DIRECTORY)

# PPI
Utils.load_sources(Constants.PPI_SOURCE_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.update_ppi_genes(Constants.PPI_UPDATE_GENE_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.update_ppi_proteins(Constants.PPI_UPDATE_PROTEIN_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.load_ppi_genes(Constants.PPI_MISSING_GENE_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.load_proteins(Constants.PPI_MISSING_PROTEIN_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
Utils.load_ppi_network(Constants.PPI_NETWORK_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)

# GRN
Utils.load_sources(Constants.GRN_SOURCE_TABLE_DATA_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
Utils.update_grn_genes(Constants.GRN_UPDATE_GENE_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
Utils.load_grn_genes(Constants.GRN_MISSING_GENE_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
Utils.load_grn_network(Constants.GRN_NETWORK_TABLE_DATA_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)