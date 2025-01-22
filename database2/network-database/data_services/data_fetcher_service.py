from abc import ABC, abstractmethod
from intermine.webservice import Service
import requests
import pandas as pd
from io import StringIO

class DataFetcherService(ABC):
    def __init__(self):
        self.service = Service("https://www.alliancegenome.org/alliancemine/service")
    
    @abstractmethod
    def fetch_data(self):
        pass

class GeneFetcherService(DataFetcherService):
    def fetch_data(self):
        print("Fetching data from GeneFetcherService")

        query = self.service.new_query("Gene")
        query.add_view(
            "primaryIdentifier", "name", "briefDescription",
            "chromosome.primaryIdentifier", "chromosomeLocation.start",
            "chromosomeLocation.end", "chromosomeLocation.strand", "organism.shortName",
            "featureType", "symbol", "secondaryIdentifier"
        )
        query.add_constraint("organism.shortName", "=", "S. cerevisiae", code="A")
        query.add_constraint("featureType", "=", "ORF", code="B")
        query.add_sort_order("Gene.primaryIdentifier", "ASC")
        
        rows_data = []
        for row in query.rows():
            rows_data.append({
                "primaryIdentifier": row["primaryIdentifier"],
                "name": row["name"],
                "briefDescription": row["briefDescription"],
                "chromosome.primaryIdentifier": row["chromosome.primaryIdentifier"],
                "chromosomeLocation.start": row["chromosomeLocation.start"],
                "chromosomeLocation.end": row["chromosomeLocation.end"],
                "chromosomeLocation.strand": row["chromosomeLocation.strand"],
                "organism.shortName": row["organism.shortName"],
                "featureType": row["featureType"],
                "standardName": row["symbol"] if pd.notnull(row["symbol"]) else row["secondaryIdentifier"],
                "systematicName": row["secondaryIdentifier"]
            })

        df = pd.DataFrame(rows_data)

        print("Data fetched successfully")
        print("====================================================================")
        return df

    
class GeneRegulatoryNetworkFetcherService(DataFetcherService):
    def fetch_data(self):
        print("Fetching data from GeneRegulatoryNetworkFetcherService")
        
        query = self.service.new_query("Gene")
        query.add_constraint("regulatoryRegions", "TFBindingSite")

        query.add_view(
            "regulatoryRegions.regulator.symbol",
            "regulatoryRegions.regulator.secondaryIdentifier", "symbol",
            "secondaryIdentifier", "regulatoryRegions.regEvidence.ontologyTerm.name",
            "regulatoryRegions.regEvidence.ontologyTerm.identifier",
            "regulatoryRegions.experimentCondition",
            "regulatoryRegions.strainBackground",
            "regulatoryRegions.regulationDirection", "regulatoryRegions.regulationType",
            "regulatoryRegions.regulatorType",
            "regulatoryRegions.publications.pubMedId", "regulatoryRegions.datasource",
            "regulatoryRegions.annotationType", "featureType",
            "regulatoryRegions.regulator.featureType"
        )

        query.add_sort_order("Gene.secondaryIdentifier", "ASC")
        query.add_constraint("featureType", "=", "ORF", code="A")
        query.add_constraint("regulatoryRegions.regulator.featureType", "=", "ORF", code="B")
        query.add_constraint("regulatoryRegions.strainBackground", "=", "S288c", code="C")
        
        rows_data = []
        for row in query.rows():
            rows_data.append({
                "regulatorStandardName": row["regulatoryRegions.regulator.symbol"],
                "regulatorSystematicName": row["regulatoryRegions.regulator.secondaryIdentifier"],
                "targetStandardName": row["symbol"],
                "targetSystematicName": row["secondaryIdentifier"],
                "ontologyTermName": row["regulatoryRegions.regEvidence.ontologyTerm.name"],
                "ontologyTermIdentifier": row["regulatoryRegions.regEvidence.ontologyTerm.identifier"],
                "experimentCondition": row["regulatoryRegions.experimentCondition"],
                "strainBackground": row["regulatoryRegions.strainBackground"],
                "regulationDirection": row["regulatoryRegions.regulationDirection"],
                "regulatoryRegionsRegulationType": row["regulatoryRegions.regulationType"],
                "regulatoryRegionsRegulatorType": row["regulatoryRegions.regulatorType"],
                "pubMedId": row["regulatoryRegions.publications.pubMedId"],
                "datasource": row["regulatoryRegions.datasource"],
                "annotationType": row["regulatoryRegions.annotationType"]
            })
        
        df = pd.DataFrame(rows_data)
        print("Data fetched successfully")
        print("====================================================================")
        return df
            
class ProteinProteinInteractionsFetcherService(DataFetcherService):
    def fetch_data(self):
        print("Fetching data from ProteinProteinInteractionsFetcherService")
        query = self.service.new_query("Gene")
        query.add_constraint("interactions.participant2", "Gene")

        query.add_view(
            "primaryIdentifier", "secondaryIdentifier", "symbol", "name", "sgdAlias",
            "interactions.details.annotationType",
            "interactions.details.experiment.publication.pubMedId",
            "interactions.participant2.symbol",
            "interactions.participant2.secondaryIdentifier",
            "interactions.details.experiment.interactionDetectionMethods.identifier",
            "interactions.details.experiment.name",
            "interactions.details.relationshipType", "featureType",
            "interactions.participant2.featureType", "proteins.symbol",
            "interactions.participant2.proteins.symbol"
        )
        
        query.add_sort_order("Gene.primaryIdentifier", "ASC")
        query.add_constraint("interactions.details.relationshipType", "=", "physical", code="A")
        query.add_constraint("interactions.participant2.featureType", "=", "ORF", code="C")
        query.add_constraint("featureType", "=", "ORF", code="B")
        query.set_logic("A and B and C")
        
        rows_data = []
        interactions = set()
        count = 0
        print("Query length: ", len(query.rows()))
        for row in query.rows():
            interaction = (row["secondaryIdentifier"], row["interactions.participant2.secondaryIdentifier"])
            if interaction in interactions:
                count += 1
                continue
            else:
                interactions.add(interaction)
            rows_data.append({
                "primaryIdentifier": row["primaryIdentifier"],
                "gene1SystematicName": row["secondaryIdentifier"],
                "gene1StandardName": row["symbol"],
                "protein1StandardName": row["proteins.symbol"],
                "name   ": row["name"],
                "sgdAlias": row["sgdAlias"],
                "annotationType": row["interactions.details.annotationType"],
                "pubMedId": row["interactions.details.experiment.publication.pubMedId"],
                "gene2StandardName": row["interactions.participant2.symbol"],
                "gene2SystematicName": row["interactions.participant2.secondaryIdentifier"],
                "protein2StandardName": row["interactions.participant2.proteins.symbol"],
                "interactionDetectionMethodsIdentifier": row["interactions.details.experiment.interactionDetectionMethods.identifier"],
                "experimentName": row["interactions.details.experiment.name"],
                "relationshipType": row["interactions.details.relationshipType"]
            })

        df = pd.DataFrame(rows_data)
        print("Data fetched successfully")
        print("Number of duplicated interactions: ", count)
        print("====================================================================")
        return df
    
class ProteinFetcherService(DataFetcherService):
    def fetch_data(self):
        print("Fetching data from ProteinFetcherService")

        query = self.service.new_query("Gene")

        # The view specifies the output columns
        query.add_view(
            "proteins.secondaryIdentifier", "proteins.symbol", "proteins.molecularWeight", 
            "proteins.pI", "proteins.length", "proteins.ntermseq", "proteins.ctermseq",
            "proteins.gravyScore", "proteins.aromaticityScore", "proteins.cai",
            "proteins.codonBias", "proteins.fopScore", "proteins.ala", "proteins.arg",
            "proteins.asn", "proteins.asp", "proteins.cys", "proteins.gln", "proteins.glu",
            "proteins.gly", "proteins.his", "proteins.ile", "proteins.leu",
            "proteins.lys", "proteins.met", "proteins.phe", "proteins.pro",
            "proteins.ser", "proteins.thr", "proteins.trp", "proteins.val",
            "proteins.carbon", "proteins.hydrogen", "proteins.nitrogen",
            "proteins.oxygen", "proteins.sulphur", "proteins.instabilityIndex",
            "proteins.allCysHalf", "proteins.noCysHalf", "proteins.aliphaticIndex", "symbol"
        )
        
        query.add_constraint("organism.shortName", "=", "S. cerevisiae", code="B")
        query.add_constraint("featureType", "=", "ORF", code="A")
        query.add_sort_order("Gene.secondaryIdentifier", "ASC")
        
        rows_data = []
        for row in query.rows():
            rows_data.append({
                "geneStandardName": row["symbol"],
                "proteinSystematicName": row["proteins.secondaryIdentifier"],
                "proteinStandardName": row["proteins.symbol"],
                "molecularWeight": row["proteins.molecularWeight"] if pd.notnull(row["proteins.molecularWeight"]) else "0",
                "pI": row["proteins.pI"] if pd.notnull(row["proteins.pI"]) else "0",
                "length": row["proteins.length"] if pd.notnull(row["proteins.length"]) else "0",
                "ntermseq": row["proteins.ntermseq"],
                "ctermseq": row["proteins.ctermseq"],
                "gravyScore": row["proteins.gravyScore"],
                "aromaticityScore": row["proteins.aromaticityScore"],
                "cai": row["proteins.cai"],
                "codonBias": row["proteins.codonBias"],
                "fopScore": row["proteins.fopScore"],
                "ala": row["proteins.ala"],
                "arg": row["proteins.arg"],
                "asn": row["proteins.asn"],
                "asp": row["proteins.asp"],
                "cys": row["proteins.cys"],
                "gln": row["proteins.gln"],
                "glu": row["proteins.glu"],
                "gly": row["proteins.gly"],
                "his": row["proteins.his"],
                "ile": row["proteins.ile"],
                "leu": row["proteins.leu"],
                "lys": row["proteins.lys"],
                "met": row["proteins.met"],
                "phe": row["proteins.phe"],
                "pro": row["proteins.pro"],
                "ser": row["proteins.ser"],
                "thr": row["proteins.thr"],
                "trp": row["proteins.trp"],
                "val": row["proteins.val"],
                "carbon": row["proteins.carbon"],
                "hydrogen": row["proteins.hydrogen"],
                "nitrogen": row["proteins.nitrogen"],
                "oxygen": row["proteins.oxygen"],
                "sulphur": row["proteins.sulphur"],
                "instabilityIndex": row["proteins.instabilityIndex"],
                "allCysHalf": row["proteins.allCysHalf"],
                "noCysHalf": row["proteins.noCysHalf"],
                "aliphaticIndex": row["proteins.aliphaticIndex"]
            })
            
        df = pd.DataFrame(rows_data)
        print("Data fetched successfully")
        print("====================================================================")
        return df