import os

class SaveToTSVService:

    def save(self, data, file_directory, filepath):
        print(f"Saving data to {filepath} file")
        
        if not os.path.exists(file_directory):
            os.makedirs(file_directory, exist_ok=True)
        
        data.to_csv(filepath, sep='\t', index=False)
        
        print(f"Data saved to {filepath} file")
        print("====================================================================")