from data_services.data_fetcher_service import *
from data_services.processor import *
from data_services.save_service import *
from constants import Constants

class DataGenerator:
    def __init__(self, data_fetcher=None, processor=None, save_service=None, filepath=None):
        self.data_fetcher = data_fetcher
        self.processor = processor
        self.save_service = save_service
        self.file_directory = Constants.DATA_DIRECTORY
        self.filepath = filepath
        self.data = None
        self.generate()

    def generate(self):
        if self.data_fetcher:
            self.data = self.data_fetcher.fetch_data()
        if self.processor:
            self.data = self.processor.process_data(self.data)
        if self.save_service and self.data is not None:
            self.save_service.save(self.data, self.file_directory, self.filepath)


class GeneRegulatoryNetworkDataGenerator(DataGenerator):
    def __init__(self, data_fetcher, processor, save_service):
        super().__init__(data_fetcher, processor, save_service, Constants.GENE_REGULATORY_NETWORK_DATA_FILEPATH)


class GeneDataGenerator(DataGenerator):
    def __init__(self, data_fetcher, processor, save_service, regulators=None, proteins=None):
        self.regulators = regulators
        self.proteins = proteins
        super().__init__(data_fetcher, processor, save_service, Constants.GENE_DATA_FILEPATH)

    def generate(self):
        self.data = self.data_fetcher.fetch_data()
        self.data = self.processor.process_data(self.data, self.regulators, self.proteins)
        self.save_service.save(self.data, self.file_directory, self.filepath)


class ProteinDataGenerator(DataGenerator):
    def __init__(self, data_fetcher, processor, save_service):
        super().__init__(data_fetcher, processor, save_service, Constants.PROTEIN_DATA_FILEPATH)


class ProteinProteinInteractionsDataGenerator(DataGenerator):
    def __init__(self, data_fetcher, processor, save_service):
        super().__init__(data_fetcher, processor, save_service, Constants.PROTEIN_PROTEIN_INTERACTIONS_DATA_FILEPATH)


class SourceDataGenerator(DataGenerator):
    def __init__(self, processor, save_service):
        super().__init__(None, processor, save_service, Constants.SOURCE_DATA_FILEPATH)

    def generate(self):
        self.data = self.processor.process_data()
        self.save_service.save(self.data, self.file_directory, self.filepath)
