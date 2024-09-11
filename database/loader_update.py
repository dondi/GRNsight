import argparse
from constants import Constants
from utils import Utils

def load_grn_data_into_database():
    Utils.load_sources(Constants.GRN_SOURCE_TABLE_DATA_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
    Utils.update_grn_genes(Constants.GRN_UPDATE_GENE_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
    Utils.load_grn_genes(Constants.GRN_MISSING_GENE_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)
    Utils.load_grn_network(Constants.GRN_NETWORK_TABLE_DATA_DIRECTORY, Constants.GRN_DATABASE_NAMESPACE)

def load_ppi_data_into_database():
    Utils.load_sources(Constants.PPI_SOURCE_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
    Utils.update_ppi_genes(Constants.PPI_UPDATE_GENE_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
    Utils.update_ppi_proteins(Constants.PPI_UPDATE_PROTEIN_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
    Utils.load_ppi_genes(Constants.PPI_MISSING_GENE_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
    Utils.load_proteins(Constants.PPI_MISSING_PROTEIN_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)
    Utils.load_ppi_network(Constants.PPI_NETWORK_TABLE_DATA_DIRECTORY, Constants.PPI_DATABASE_NAMESPACE)

def main():
    # Set up argument parsing
    parser = argparse.ArgumentParser(description="Load data into database for GRN or PPI networks.")
    parser.add_argument('--network', choices=['GRN', 'PPI'], required=True, help="Specify the network type to load data for")

    # Parse arguments
    args = parser.parse_args()

    # Execute the relevant operations based on the argument
    if args.network == 'GRN':
        load_grn_data_into_database()
    elif args.network == 'PPI':
        load_ppi_data_into_database()
    else:
        print("Invalid network type. Please choose 'GRN' or 'PPI'.")

if __name__ == "__main__":
    main()
