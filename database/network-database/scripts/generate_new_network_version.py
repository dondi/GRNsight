from __future__ import print_function

from intermine.webservice import Service
service = Service("https://yeastmine.yeastgenome.org/yeastmine/service")
from sqlalchemy import create_engine

import csv
import re
import sys
import os
import datetime


def get_all_genes():
    db = create_engine(os.environ['DB_URL'])
    
    with db.connect() as connection:
        result_set = connection.execute(
        f"""
            SELECT display_gene_id, gene_id FROM gene_regulatory_network.gene;
        """)
        result = result_set.fetchall()
        return list(result)



# Get Network Data from Yeastmine

query = service.new_query("Gene")

query.add_view(
    "primaryIdentifier", "secondaryIdentifier", "symbol", "name", "sgdAlias",
    "regulationSummary.summaryParagraph",
    "regulationSummary.publications.pubMedId",
    "regulationSummary.publications.citation"
)
query.outerjoin("regulationSummary.publications")

regulators = {}
all_genes = {}
print("COLLECTING REGULATORS\n")
for row in query.rows():
    systematic_name = row["secondaryIdentifier"]
    standard_name = row["symbol"]
    if standard_name == None:
        standard_name = systematic_name
    
    regulators[standard_name] =  systematic_name
    all_genes[standard_name] = systematic_name

regulators_to_targets = {}
all_targets = {}


print("COLLECTING TARGETS\n")
for regulator in regulators:
    query = service.new_query("Gene")
    query.add_constraint("regulatoryRegions", "TFBindingSite")
    query.add_view(
        "regulatoryRegions.regulator.symbol",
        "regulatoryRegions.regulator.secondaryIdentifier", "symbol",
        "secondaryIdentifier", "regulatoryRegions.regEvidence.ontologyTerm.name",
        "regulatoryRegions.regEvidence.ontologyTerm.identifier",
        "regulatoryRegions.experimentCondition",
        "regulatoryRegions.strainBackground",
        "regulatoryRegions.regulationDirection",
        "regulatoryRegions.publications.pubMedId", "regulatoryRegions.datasource",
        "regulatoryRegions.annotationType"
    )
    query.add_sort_order("Gene.secondaryIdentifier", "ASC")
    query.add_constraint("regulatoryRegions.regulator", "LOOKUP", regulator, "S. cerevisiae", code="A")
    targets = {}

    for row in query.rows():
        target_systematic_name = row["secondaryIdentifier"]
        target_standard_name = row["symbol"]
        if target_standard_name == None:
            target_standard_name = target_systematic_name
        targets[target_standard_name] = target_systematic_name
        all_targets[target_standard_name] = target_systematic_name
        all_genes[target_standard_name] =  target_systematic_name

    regulators_to_targets[regulator] = { "systematic_name": regulators[regulator], "targets": targets}



def create_regulator_to_target_row(target, all_regulators):
    result = "" + target
    for regulator in all_regulators:
        if target in all_regulators[regulator]["targets"]:
            result += "\t" + "1"
        else: 
            result += "\t" + "0"
    return result


# Create files

# Create folder paths 
if not os.path.exists('../script-results'):
    os.makedirs('../script-results')

if not os.path.exists('../script-results/networks'):
    os.makedirs('../script-results/networks')

if not os.path.exists('../script-results/processed-loader-files'):
    os.makedirs('../script-results/processed-loader-files')



# Files to be generated

# Generate Networks

REGULATORS_TO_TARGETS_MATRIX = '../script-results/networks/regulators_to_targets.csv'
REGULATORS_TO_REGULATORS_MATRIX = '../script-results/networks/regulators_to_regulators.csv'


targets = []
for target in all_targets:
    if target != None:
        targets.append(target)

regulators_list = []
for regulator in regulators_to_targets:
    if regulator != None:
        regulators_list.append(regulator)

# this is the same method used in generate_network.py to create Regulators to Targets Matrix and Regulators to Regulators Matrix
def createMatrix(fileName: str):
    statusMessage: str = 'Creating REGULATORS TO TARGETS MATRIX\n' if fileName == REGULATORS_TO_TARGETS_MATRIX else 'Creating REGULATORS TO REGULATORS MATRIX\n'
    print(statusMessage)
    regulator_to_target_file = open(fileName, 'w')
    headers = "cols regulators/rows targets"
    headers += '\t'.join(regulators_list)
    regulator_to_target_file.write(f'{headers}\n')
    for target in targets:
        result = create_regulator_to_target_row(target, regulators_to_targets)
        if result:
            regulator_to_target_file.write(f'{result}\n')
    regulator_to_target_file.close()

createMatrix(REGULATORS_TO_TARGETS_MATRIX)
createMatrix(REGULATORS_TO_REGULATORS_MATRIX)

# Create loader-files

# Source Table

SOURCE_DESTINATION = '../script-results/processed-loader-files/source.csv'
timestamp = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0)

source = "YeastMine - Saccharomyces Genome Database"
display_name = "Yeastmine - SGD"

source_file = open(SOURCE_DESTINATION, 'w')
headers = f'Timestamp\tSource\tDisplay Name\n{timestamp}\t{source}\t{display_name}'
source_file.write(f'{headers}\n')
source_file.close()

# Gene Table

GENE_DESTINATION = '../script-results/processed-loader-files/gene.csv'

database_genes = {g[1] : g[0] for g in get_all_genes()}
database_standard_names = [g[0] for g in get_all_genes()]
database_systematic_names = [g[1] for g in get_all_genes()]
species = "Saccharomyces cerevisiae"
taxon_id = "559292"
genes_to_update = {}
print(f'Creating gene.csv\n')
gene_file = open(GENE_DESTINATION, 'w')
headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\tRegulator'
gene_file.write(f'{headers}\n')
for gene in all_genes:
    if gene not in database_standard_names:
        if all_genes[gene] not in database_systematic_names:
            if gene in regulators:
                gene_file.write(f'{all_genes[gene]}\t{gene}\t{species}\t{taxon_id}\ttrue\n')
            else:
                gene_file.write(f'{all_genes[gene]}\t{gene}\t{species}\t{taxon_id}\tfalse\n')
        else:
            # if systematic name is found, then we need to update the gene
            genes_to_update[gene] = all_genes[gene]
gene_file.close()

# Gene Table Updates

GENE_UPDATES_DESTINATION = '../script-results/processed-loader-files/gene_update.csv'


print(f'Creating gene_update.csv\n')
gene_file = open(GENE_UPDATES_DESTINATION, 'w')
headers = f'Gene ID\tDisplay Gene ID\tRegulator'
gene_file.write(f'{headers}\n')
for gene in genes_to_update:
    if gene in regulators:
        gene_file.write(f'{all_genes[gene]}\t{gene}\ttrue\n')
    else:
        gene_file.write(f'{all_genes[gene]}\t{gene}\tfalse\n')
gene_file.close()


# Network Table

NETWORK_DESTINATION = '../script-results/processed-loader-files/network.csv'


print(f'Creating network.csv\n')
network_file = open(NETWORK_DESTINATION, 'w')
headers = f'Regulator Gene ID\tTarget Gene ID\tTaxon ID\tTimestamp\tSource'
network_file.write(f'{headers}\n')
for gene in regulators_to_targets:
    for target_gene in regulators_to_targets[gene]["targets"]:
        network_file.write(f'{regulators_to_targets[gene]["systematic_name"]}\t{regulators_to_targets[gene]["targets"][target_gene]}\t{taxon_id}\t{timestamp}\t{source}\n')
network_file.close()
