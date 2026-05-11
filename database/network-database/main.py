from constants import Constants
from data_services.data_generator import *
from data_services.save_service import *
from database_services.populator_runner import PopulatorRunner
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
    
def main(db_url=None, action='all', input_dir=Constants.DATA_DIRECTORY):
    network_options = [Constants.GRN_NETWORK_MODE, Constants.PPI_NETWORK_MODE]
    for network in network_options:

        if action in ['all', 'generate']:
            load_data(network)
        if action in ['all', 'populate']:
            PopulatorRunner(db_url=db_url, input_dir=input_dir).populate(network)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate data for different networks.")
    parser.add_argument('--action', choices=['generate', 'populate', 'all'], default='all',
                        help="Choose whether to only generate TSV files, only populate PostgreSQL from TSV, or do both.")
    parser.add_argument('--db_url', type=str,
                        help="PostgreSQL database URL, e.g., postgresql://localhost/postgres")
    parser.add_argument('--input_dir', type=str, default=Constants.DATA_DIRECTORY,
                        help="Input directory for populate mode. If this directory is named script-results, the loader reads TSVs directly; otherwise it scans network subfolders.")

    args = parser.parse_args()
    if args.action in ['populate', 'all'] and not args.db_url:
        parser.error("--db_url is required when --action is 'populate' or 'all'.")

    main(args.db_url, args.action, args.input_dir)
    

    