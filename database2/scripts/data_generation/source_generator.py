from generator import Generator
from constants import Constants
import os

class SourceGenerator(Generator):
    def __init__(self, source_file_destination: str):
        super().__init__()
        self.source_file_destination = source_file_destination
        self.create_source_file()
        
    def create_folder_paths(self):
        super().create_folder_paths()
        if not os.path.exists('../script-results/source'):
            os.makedirs('../script-results/source')

    def create_source_file(self):
        source_file = open(self.source_file_destination, 'w')
        headers = f'Timestamp\tSource\tDisplay Name\n{self.timestamp}\t{self.source}\t{self.source_display_name}'
        source_file.write(f'{headers}\n')
        source_file.close()
        
class GRNSourceGenerator(SourceGenerator):
    def __init__(self):
        super().__init__(Constants.GRN_SOURCE_FILE_PATH)
        
class PPISourceGenerator(SourceGenerator):
    def __init__(self):
        super().__init__(Constants.PPI_SOURCE_FILE_PATH)
        
GRNSourceGenerator()