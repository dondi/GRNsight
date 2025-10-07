from abc import ABC, abstractmethod
from datetime import datetime, timezone, timedelta
import pandas as pd

class Processor(ABC):
    def __init__(self, formatted_time_stamp=None):
        self.species = "Saccharomyces cerevisiae"
        self.taxon_id = "559292"
        self.source = "AllianceMine - Saccharomyces Genome Database"
        self.source_display_name = "AllianceMine - SGD"
        self.formatted_time_stamp = formatted_time_stamp

    @abstractmethod
    def process_data(self, data):
        pass
    
class GeneProcessor(Processor):
    def __init__(self, formatted_time_stamp):
        super().__init__(formatted_time_stamp)
    
    def process_data(self, data, regulators, proteins):
        print("Processing data from GeneProcessor")

        genes_df = data[['systematicName', 'standardName']]
        if proteins is not None:
            combine_genes_df = pd.concat([genes_df, self._combine_with_protein_genes(genes=data, proteins=proteins)])
        else:
            combine_genes_df = genes_df
        processed_data = []
        for _, row in combine_genes_df.iterrows():
            gene_id = row['systematicName']
            # Check if the gene_id (systematicName) matches any of the regulators
            regulator = gene_id in regulators["regulator_gene_id"].values

            processed_data.append({
                "gene_id": gene_id,
                "display_gene_id": row['standardName'],
                "species": self.species,
                "taxon_id": self.taxon_id,
                "regulator": regulator,
                "time_stamp": self.formatted_time_stamp,
                "source": self.source
            })

        processed_df = pd.DataFrame(processed_data)
        print("Finished processing data from GeneProcessor")
        print("====================================================================")
        return processed_df
    

    def _combine_with_protein_genes(self, genes, proteins):
        genes_systematic_names = set(genes['systematicName'])
        proteins_systematic_names = set(proteins['gene_systematic_name'])
        diff_systematic_names = genes_systematic_names.symmetric_difference(proteins_systematic_names)

        # Filter the rows in genes and proteins where their first element is in the difference
        genes_diff = genes[genes['systematicName'].isin(diff_systematic_names)]
        proteins_diff = proteins[proteins['gene_systematic_name'].isin(diff_systematic_names)]

        # Protein standard names are in the format of lowercase + "p" but for gene standard name, all letters should be uppercase and remove the trailing "p"
        proteins_diff['standard_name'] = proteins_diff['standard_name'].str.rstrip('p').str.upper()
        # Combine the differences from both genes and proteins
        diff_combined = pd.concat([
            genes_diff[['systematicName', 'standardName']], 
            proteins_diff[['gene_systematic_name', 'standard_name']].rename(
                columns={'gene_systematic_name': 'systematicName', 'standard_name': 'standardName'}
            )
        ], ignore_index=True)

        return diff_combined


class GeneRegulatoryNetworkProcessor(Processor):
    def __init__(self, formatted_time_stamp):
        super().__init__(formatted_time_stamp)
    
    def process_data(self, data):
        print("Processing data from GeneRegulatoryNetworkProcessor")
        
        processed_data = []

        for _, row in data.iterrows():
            processed_data.append({
                "regulator_gene_id": row['regulatorSystematicName'],
                "target_gene_id": row['targetSystematicName'],
                "taxon_id":  self.taxon_id,
                "annotation_type": row['annotationType'],
                "time_stamp": self.formatted_time_stamp,
                "source": self.source 
            })

        processed_df = pd.DataFrame(processed_data)
        print("Finished processing data from GeneRegulatoryNetworkProcessor")
        print("====================================================================")
        return processed_df

class ProteinProcessor(Processor):
    def __init__(self, formatted_time_stamp):
        super().__init__(formatted_time_stamp)
    
    def process_data(self, data):
        print("Processing data from ProteinProcessor")
        
        processed_data = []
        for _, row in data.iterrows():
            processed_data.append({
                "standard_name": row['proteinStandardName'],
                "gene_systematic_name": row['proteinSystematicName'],
                "length": row['length'],
                "molecular_weight": row['molecularWeight'],
                "pi": row['pI'],
                "taxon_id": self.taxon_id,
                "time_stamp": self.formatted_time_stamp,
                "source": self.source
            })

        processed_df = pd.DataFrame(processed_data)
        print("Finished processing data from ProteinProcessor")
        print("====================================================================")
        return processed_df
    
class ProteinProteinInteractionsProcessor(Processor):
    def __init__(self, formatted_time_stamp):
        super().__init__(formatted_time_stamp)
    
    def process_data(self, data):
        print("Processing data from ProteinProteinInteractionsProcessor")
        processed_data = []
        for _, row in data.iterrows():
            processed_data.append({
                "protein1": row['protein1StandardName'],
                "protein2": row['protein2StandardName'],
                "interaction_detection_methods_identifier": row['interactionDetectionMethodsIdentifier'],
                "annotation_type": row['annotationType'],
                "experiment_name": row['experimentName'],
                "time_stamp": self.formatted_time_stamp,
                "source": self.source
            })

        processed_df = pd.DataFrame(processed_data)
        print("Finished processing data from ProteinProteinInteractionsProcessor")
        print("====================================================================")
        return processed_df

class SourceProcessor(Processor):
    def __init__(self, formatted_time_stamp):
        super().__init__(formatted_time_stamp)
    
    def process_data(self):
        print("Processing data from SourceProcessor")
        processed_data = []
        processed_data.append({
            "time_stamp": self.formatted_time_stamp,
            "source": self.source,
            "display_name": self.source_display_name
        })

        processed_df = pd.DataFrame(processed_data)
        print("Finished processing data from SourceProcessor")
        print("====================================================================")
        return processed_df