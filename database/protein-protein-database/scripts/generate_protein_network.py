from __future__ import print_function

from intermine.webservice import Service
service = Service("https://yeastmine.yeastgenome.org/yeastmine/service")

import csv
import re
import sys
import os
import gc
import datetime


# Create files

# Create folder paths 
if not os.path.exists('../script-results'):
    os.makedirs('../script-results')

if not os.path.exists('../script-results/processed-loader-files'):
    os.makedirs('../script-results/processed-loader-files')



# Files to be generated
GENE_FILE = '../script-results/processed-loader-files/gene.csv'
PROTEIN_FILE = '../script-results/processed-loader-files/protein.csv'
PHYSICAL_INTERACTION_FILE = '../script-results/processed-loader-files/physical_interaction.csv'
SOURCE_DESTINATION = '../script-results/processed-loader-files/source.csv'

# Instantiate Source variables
timestamp = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0)
source = "YeastMine - Saccharomyces Genome Database"
display_name = "Yeastmine - SGD"

# Get Network Data from Yeastmine

def getPhysicalInteractions(gene):
    print("Query data from Yeastmine to get Physical Interactions")
    query = service.new_query("Gene")
    query.add_constraint("interactions.participant2", "Gene")
    query.add_view(
        "primaryIdentifier", "symbol", "secondaryIdentifier", "sgdAlias", "name",
        "organism.shortName", "interactions.details.annotationType",
        "interactions.details.role1", "interactions.participant2.symbol",
        "interactions.participant2.secondaryIdentifier",
        "interactions.details.experiment.interactionDetectionMethods.identifier",
        "interactions.details.experiment.name",
        "interactions.details.relationshipType", "interactions.details.note"
    )
    query.add_constraint("organism.shortName", "=", "S. cerevisiae", code="B")
    query.add_constraint("interactions.details.relationshipType", "=", "physical", code="C")
    query.add_constraint("Gene", "LOOKUP", gene, code="A")
    return query

def getProteinFromGene(gene):
    print("Query data from Yeastmine to get Protein information")
    query = service.new_query("Gene")
    query.add_view(
        "primaryIdentifier", "proteins.symbol", "sgdAlias", "proteins.length",
        "proteins.molecularWeight", "proteins.pI", "featureType", "qualifier",
        "description", "proteins.sequence.residues"
    )
    query.add_constraint("organism.shortName", "=", "S. cerevisiae", code="B")
    query.add_constraint("Gene", "LOOKUP", gene, code="A")
    return query

def getAllProteins():
    print("Query data from Yeastmine to get all proteins")

    query = service.new_query("Protein")

    query.add_view(
        "genes.primaryIdentifier", "genes.secondaryIdentifier", "symbol", "length",
        "molecularWeight", "pI", "genes.featureType", "genes.qualifier",
        "genes.sgdAlias", "genes.description"
    )
    query.add_sort_order("Protein.symbol", "ASC")
    query.add_constraint("genes.featureType", "=", "transposable_element_gene", code="G")
    query.add_constraint("genes.featureType", "=", "ORF", code="F")
    query.add_constraint("genes.status", "=", "Active", code="D")
    query.add_constraint("genes.featureType", "=", "blocked_reading_frame", code="E")
    query.add_constraint("genes.featureType", "=", "intein_encoding_region", code="H")
    query.add_constraint("organism.name", "=", "Saccharomyces cerevisiae", code="A")
    query.set_logic("A and D and (F or G or E or H)")

    return query



query = getAllProteins()
all_proteins = {}

genes = {
    #  stored as gene sysyematic name : {
        #  proteins : {protein standard name : {protein info}}
    # }
}
print("COLLECTING PROTEINS FROM QUERY RESULTS\n")

for row in query.rows():
    gene_systematic_name = row["genes.secondaryIdentifier"]
    protein_standard_name = row["symbol"]
    length =  row["length"]
    molecular_weight = row["molecularWeight"]
    PI = row["pI"]
    genes[gene_systematic_name] = {
        "standard_name" : None,
        "protein" : {
            "standard_name": protein_standard_name,
                "length": length, 
                "molecular_weight": molecular_weight,
                "PI": PI
        }      
    }

        
print("COLLECTING/WRITING INTERACTIONS\n")
file = open(PHYSICAL_INTERACTION_FILE,"w")
print(f"Open file {PHYSICAL_INTERACTION_FILE} and write data into that file")
file.write(f"Protein1\tProtein2\tInteraction Detection Methods Identifier\tExperiment Name\tTime_Stamp\tSource\n")


exceptions = []
print("Processing Physical Interactions")
for gene in genes:
    query = getPhysicalInteractions(gene)
    first_row = True

    for row in query.rows():
        gene1 = row["secondaryIdentifier"]
        gene2 = row["interactions.participant2.secondaryIdentifier"]
        if first_row:
            # update the gene's standard name
            genes[gene]["standard_name"] = row["symbol"] if row["symbol"] != None else gene
            first_row = False
        if gene2 in genes:
            g = sorted([genes[gene1]["protein"]["standard_name"], genes[gene2]["protein"]["standard_name"]])
            idmi = row["interactions.details.experiment.interactionDetectionMethods.identifier"]
            exp_name = row["interactions.details.experiment.name"]
            
            if gene2 in genes and gene1 in genes:
                file.write(f'{g[0]}\t{g[1]}\t{idmi}\t{exp_name}\t{timestamp}\t{source}\n')
        else: 
            exceptions.append(gene2)

print("Handling Exceptions")
failed_genes = []
while exceptions != None:
    acceptable_genes = []
    for gene in exceptions:
        query = getProteinFromGene(gene)
        rows = query.rows()
        for row in rows:
            acceptable_genes.append(gene)
            protein_standard_name = row["proteins.symbol"]
            length =  row["proteins.length"]
            molecular_weight = row["proteins.molecularWeight"]
            PI = row["proteins.pI"]
            genes[gene] = {
                "standard_name" : None,
                "protein" : {
                    "standard_name": protein_standard_name,
                        "length": length, 
                        "molecular_weight": molecular_weight,
                        "PI": PI
            }      
        }
        if len(rows) == 0:
            failed_genes.append(gene)  
            
    more_exceptions = []
    for gene in acceptable_genes:
        query = getPhysicalInteractions(gene)
        first_row = True
        for row in query.rows():
            gene1 = row["secondaryIdentifier"]
            gene2 = row["interactions.participant2.secondaryIdentifier"]
            if first_row:
                # update the gene's standard name
                genes[gene]["standard_name"] = row["symbol"] if row["symbol"] != None else gene
                first_row = False
            if gene2 in genes:
                g = sorted([genes[gene1]["protein"]["standard_name"], genes[gene2]["protein"]["standard_name"]])
                idmi = row["interactions.details.experiment.interactionDetectionMethods.identifier"]
                exp_name = row["interactions.details.experiment.name"]
                
                if gene2 in genes and gene1 in genes:
                    file.write(f'{g[0]}\t{g[1]}\t{idmi}\t{exp_name}\t{timestamp}\t{source}\n')
            elif gene not in failed_genes: 
                more_exceptions.append(gene2)
    if len(more_exceptions) == 0:
        exceptions = None
    else :
        exceptions = more_exceptions
    
    
file.close()

# Source Table

print(f"Completed {PHYSICAL_INTERACTION_FILE} Starting{SOURCE_DESTINATION}")

source_file = open(SOURCE_DESTINATION, 'w')
headers = f'Timestamp\tSource\tDisplay Name\n{timestamp}\t{source}\t{display_name}'
source_file.write(f'{headers}\n')
source_file.close()


species = "Saccharomyces cerevisiae"
taxon_id = "559292"

# create gene csv
print(f"Completed {SOURCE_DESTINATION} Starting{GENE_FILE}")
file = open(GENE_FILE,"w")
file.write(f"Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\n")
for gene in genes:
    file.write(f"{gene}\t{genes[gene]['standard_name']}\t{species}\t{taxon_id}\n")
file.close()

# create protein csv
print(f"Completed {GENE_FILE} Starting{PROTEIN_FILE}")
file = open(PROTEIN_FILE, "w")
file.write(f"Standard Name\tGene Systematic Name\tLength\tMolecular Weight\tPI\tTaxon ID\n")
for gene in genes:
    file.write(f"{genes[gene]['protein']['standard_name']}\t{gene}\t{genes[gene]['protein']['length']}\t{genes[gene]['protein']['molecular_weight']}\t{genes[gene]['protein']['PI']}\t{taxon_id}\n")
file.close()