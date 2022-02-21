from __future__ import print_function

from intermine.webservice import Service
service = Service("https://yeastmine.yeastgenome.org/yeastmine/service")

import csv
import re
import sys
import os
import datetime
import pytz
import tzlocal

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



def create_regulator_to_target_row(regulator, targets, all_targets):
    if regulator != None:
        result = "" + regulator
        for target in all_targets:
            if target in targets:
                result += "\t" + "1"
            else: 
                result += "\t" + "0"
        return result
    return False


# Create files

# Create folder paths 
if not os.path.exists('../script-results'):
    os.makedirs('../script-results')

if not os.path.exists('../script-results/networks'):
    os.makedirs('../script-results/networks')

if not os.path.exists('../script-results/processed-loader-files'):
    os.makedirs('../script-results/processed-loader-files')



# Files to be generated

# Create Networks

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

print(f'Creating REGULATORS TO TARGETS MATRIX\n')
regulator_to_target_file = open(REGULATORS_TO_TARGETS_MATRIX, 'w')
headers = "cols regulators/rows targets"
headers += '\t'.join(targets)
regulator_to_target_file.write(f'{headers}\n')
for regulator in regulators_to_targets:
  result = create_regulator_to_target_row(regulator, regulators_to_targets[regulator]["targets"], targets)
  if result != False:
    regulator_to_target_file.write(f'{result}\n')
regulator_to_target_file.close()

print(f'Creating REGULATORS TO TARGETS MATRIX\n')
regulator_to_regulator_file = open(REGULATORS_TO_REGULATORS_MATRIX, 'w')
headers = "cols regulators/rows targets"
headers += '\t'.join(regulators_list)
regulator_to_regulator_file.write(f'{headers}\n')
for regulator in regulators_to_targets:
  result = create_regulator_to_target_row(regulator, regulators_to_targets[regulator]["targets"], regulators_list)
  if result != False:
    regulator_to_regulator_file.write(f'{result}\n')
regulator_to_regulator_file.close()



# Create loader-files

# Source Table

SOURCE_DESTINATION = '../script-results/processed-loader-files/source.csv'
dt = datetime.datetime.now()

year = dt.year
month = f'{dt.month}'
if len(month) == 1:
    month = "0" + month
day = f'{dt.day}'
if len(day) == 1:
    day = "0" + day
hour = dt.hour
minute = dt.minute
second = dt.second


timestamp = f'{year}-{month}-{day} {hour}:{minute}:{second}'
source = "YeastMine - Saccharomyces Genome Database"

source_file = open(SOURCE_DESTINATION, 'w')
headers = f'Timestamp\tSource\n{timestamp}\t{source}'
source_file.write(f'{headers}\n')
source_file.close()

# Gene Table

GENE_DESTINATION = '../script-results/processed-loader-files/gene.csv'

species = "Saccharomyces cerevisiae"
taxon_id = "559292"

print(f'Creating gene.csv\n')
gene_file = open(GENE_DESTINATION, 'w')
headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\tRegulator'
gene_file.write(f'{headers}\n')
for gene in all_genes:
    if gene in regulators:
        gene_file.write(f'{all_genes[gene]}\t{gene}\t{species}\t{taxon_id}\ttrue\n')
    else:
        gene_file.write(f'{all_genes[gene]}\t{gene}\t{species}\t{taxon_id}\tfalse\n')

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
