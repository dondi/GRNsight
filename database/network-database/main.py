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
    if network_option in ['all', Constants.GRN_NETWORK_MODE]:
        grnDataGenerator = GeneRegulatoryNetworkDataGenerator(GeneRegulatoryNetworkFetcherService(), GeneRegulatoryNetworkProcessor(formatted_time_stamp), save_service)

    if network_option in ['all', Constants.PPI_NETWORK_MODE]:
        proteinDataGenerator = ProteinDataGenerator(ProteinFetcherService(), ProteinProcessor(formatted_time_stamp), save_service)
        ProteinProteinInteractionsDataGenerator(ProteinProteinInteractionsFetcherService(), ProteinProteinInteractionsProcessor(formatted_time_stamp), save_service)

    if network_option == Constants.GRN_NETWORK_MODE:
        GeneDataGenerator(GeneFetcherService(), GeneProcessor(formatted_time_stamp), save_service, grnDataGenerator.data)
    else:
        GeneDataGenerator(GeneFetcherService(), GeneProcessor(formatted_time_stamp), save_service, grnDataGenerator.data if grnDataGenerator else None, proteinDataGenerator.data)
    
    SourceDataGenerator(SourceProcessor(formatted_time_stamp), save_service)

def adding_data_to_databse(network_option, db_url):
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
    
def main(network_option, db_url):
    load_data(network_option)
    adding_data_to_databse(network_option, db_url)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate data for different networks.")
    parser.add_argument('--network', choices=[Constants.PPI_NETWORK_MODE, Constants.GRN_NETWORK_MODE, 'all'], required=True,
                        help=f"Specify the type of network data to generate. Options: '{Constants.PPI_NETWORK_MODE}', '{Constants.GRN_NETWORK_MODE}', 'all'")
    parser.add_argument('--db_url', type=str, required=True,
                        help="PostgreSQL database URL, e.g., postgresql://localhost/postgres")

    args = parser.parse_args()
    main(args.network, args.db_url)
    

    