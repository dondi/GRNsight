from constants import Constants
from data_services.data_generator import *
from data_services.save_service import *
from database_services.populator import *
import argparse
from datetime import datetime, timezone, timedelta

save_service = SaveToTSVService()

def load_data(network_option):
    print("Generating data.................................................")
    time_stamp = datetime.now(timezone(timedelta(hours=-8)))
    formatted_time_stamp = time_stamp.strftime("%Y-%m-%d %H:%M:%S%z")
    grn_data_generator = None
    protein_data_generator = None

    if network_option in ['all', Constants.GRN_NETWORK_MODE]:
        grn_data_generator = GeneRegulatoryNetworkDataGenerator(GeneRegulatoryNetworkFetcherService(), GeneRegulatoryNetworkProcessor(formatted_time_stamp), save_service)

    if network_option in ['all', Constants.PPI_NETWORK_MODE]:
        protein_data_generator = ProteinDataGenerator(ProteinFetcherService(), ProteinProcessor(formatted_time_stamp), save_service)
        ProteinProteinInteractionsDataGenerator(ProteinProteinInteractionsFetcherService(), ProteinProteinInteractionsProcessor(formatted_time_stamp), save_service)

    regulators = grn_data_generator.data if grn_data_generator is not None else None
    proteins = protein_data_generator.data if protein_data_generator is not None else None
    GeneDataGenerator(GeneFetcherService(), GeneProcessor(formatted_time_stamp), save_service, regulators, proteins)
    
    SourceDataGenerator(SourceProcessor(formatted_time_stamp), save_service)

def add_data_to_database(network_option, db_url):
    print("Adding data to database.................................................")
    if network_option in ['all', Constants.GRN_NETWORK_MODE]:
        network_mode = Constants.GRN_NETWORK_MODE
        SourceDataPopulator(db_url, network_mode).populate_data()
        GeneDataPopulator(db_url, network_mode).populate_data()
        GeneRegulatoryNetworkDataPopulator(db_url).populate_data()
    
    if network_option in ['all', Constants.PPI_NETWORK_MODE]:
        network_mode = Constants.PPI_NETWORK_MODE
        SourceDataPopulator(db_url, network_mode).populate_data()

        GeneDataPopulator(db_url, network_mode).populate_data()
        
        ProteinDataPopulator(db_url).populate_data()
        
        ProteinProteinInteractionsDataPopulator(db_url).populate_data()
    
def main(network_option, db_url=None, action='all'):
    if action in ['all', 'generate']:
        load_data(network_option)
    if action in ['all', 'populate']:
        add_data_to_database(network_option, db_url)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate data for different networks.")
    parser.add_argument('--network', choices=[Constants.PPI_NETWORK_MODE, Constants.GRN_NETWORK_MODE, 'all'], required=True,
                        help=f"Specify the type of network data to generate. Options: '{Constants.PPI_NETWORK_MODE}', '{Constants.GRN_NETWORK_MODE}', 'all'")
    parser.add_argument('--action', choices=['generate', 'populate', 'all'], default='all',
                        help="Choose whether to only generate TSV files, only populate PostgreSQL from TSV, or do both.")
    parser.add_argument('--db_url', type=str,
                        help="PostgreSQL database URL, e.g., postgresql://localhost/postgres")

    args = parser.parse_args()
    if args.action in ['populate', 'all'] and not args.db_url:
        parser.error("--db_url is required when --action is 'populate' or 'all'.")

    main(args.network, args.db_url, args.action)
    

    