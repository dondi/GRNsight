import os
from pathlib import Path

from constants import Constants
from database_services.populator import (
    GeneDataPopulator,
    GeneRegulatoryNetworkDataPopulator,
    ProteinDataPopulator,
    ProteinProteinInteractionsDataPopulator,
    SourceDataPopulator,
)


class PopulatorRunner:
    def __init__(self, db_url, input_dir=Constants.DATA_DIRECTORY):
        self.db_url = db_url
        self.input_dir = input_dir

    def run_network(self, network_mode, input_dir):
        runner = {
            Constants.GRN_NETWORK_MODE: self._populate_grn,
            Constants.PPI_NETWORK_MODE: self._populate_ppi,
        }.get(network_mode)
        if runner is None:
            raise ValueError(f"Unknown network mode: {network_mode}")
        runner(input_dir)
                
    def populate(self, network_option):
        if self.input_dir == Constants.DATA_DIRECTORY:
            self._populate_data_for_script_results(network_option)
        else:
            self._populate_data_for_custom_input(network_option)

    def _populate_data_for_script_results(self, network_option):
        requested_networks = [
            network_option
        ] if network_option != "all" else [Constants.GRN_NETWORK_MODE, Constants.PPI_NETWORK_MODE]
        for network in requested_networks:
            self.run_network(network, self.input_dir)

    def _populate_data_for_custom_input(self, network_option):
        print(f"Scanning {self.input_dir} for data folders...")

        base_path = Path(self.input_dir)
        if not base_path.exists():
            print(f"Error: {self.input_dir} does not exist.")
            return

        target_folders = [f.name for f in base_path.iterdir() if f.is_dir()]
        for folder_name in target_folders:
            if folder_name in [Constants.GRN_DATABASE_NAMESPACE, Constants.OLD_GRN_DATABASE_NAMESPACE]:
                mode = Constants.GRN_NETWORK_MODE
            elif folder_name in [Constants.PPI_DATABASE_NAMESPACE, Constants.OLD_PPI_DATABASE_NAMESPACE]:
                mode = Constants.PPI_NETWORK_MODE
            else:
                print(f"Skipping unknown folder type: {folder_name}")
                continue

            if network_option != "all" and network_option != mode:
                continue

            print(f"\n Processing Schema: {folder_name}")
            folder_path = os.path.join(self.input_dir, folder_name)

            self.run_network(mode, folder_path)
                
    def _populate_grn(self, input_dir):
        SourceDataPopulator(self.db_url, Constants.GRN_NETWORK_MODE, input_dir).populate_data()
        GeneDataPopulator(self.db_url, Constants.GRN_NETWORK_MODE, input_dir).populate_data()
        GeneRegulatoryNetworkDataPopulator(self.db_url, input_dir).populate_data()

    def _populate_ppi(self, input_dir):
        SourceDataPopulator(self.db_url, Constants.PPI_NETWORK_MODE, input_dir).populate_data()
        GeneDataPopulator(self.db_url, Constants.PPI_NETWORK_MODE, input_dir).populate_data()
        ProteinDataPopulator(self.db_url, input_dir).populate_data()
        ProteinProteinInteractionsDataPopulator(self.db_url, input_dir).populate_data()
