import os
import sys
import datetime
from intermine.webservice import Service

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


from constants import Constants


class Generator: 
    def __init__(self):
        self.source = Constants.SOURCE
        self.source_display_name = Constants.SOURCE_DISPLAY_NAME
        self.timestamp = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0)
        self.create_folder_paths()
        pass
        
    def create_folder_paths(self):
        if not os.path.exists('../script-results'):
            os.makedirs('../script-results')
        