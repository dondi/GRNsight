from __future__ import print_function

from intermine.webservice import Service
service = Service("https://yeastmine.yeastgenome.org/yeastmine/service")

import csv
import os
import pandas as pd

# Extracting regulator and target genes from file 

# Remember to make the source file folder and put your source files in there
YEASTRACT_NETWORK = "../source-files/Regulation_matrix_profile2.csv"
targets = []
regulators = []
print(f'Processing file {YEASTRACT_NETWORK}')
with open(YEASTRACT_NETWORK, 'r+', encoding="UTF-8") as f:
    targets = []
    regulators = []
    i = 0
    reader = csv.reader(f)
    for row in reader:
        if i == 0:
            # we are getting the targets
            j = 0
            x = row[0].split()
            for target in x:
                if j > 2:
                    targets.append(target)
                j += 1    
        else:
            # we are getting the regulators
            regulators.append(row[0].split()[0])
        i+=1

print (targets)
print (regulators)

regulators_to_targets = {}

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
    regulators_targets = []

    for row in query.rows():
        target_systematic_name = row["secondaryIdentifier"]
        target_standard_name = row["symbol"]
        if target_standard_name == None:
            target_standard_name = target_systematic_name
        if target_standard_name in targets:
            regulators_targets.append(target_standard_name)

    regulators_to_targets[regulator] = regulators_targets

print(regulators_to_targets)






# We already have the regulator and target genes from Yeastract, now let's find the network

def create_regulator_to_target_row(target, all_regulators):
    result = "" + target
    for regulator in all_regulators:
        if target in all_regulators[regulator]:
            result += "\t" + "1"
        else: 
            result += "\t" + "0"
    return result


# Create files

# Create folder paths 
if not os.path.exists('../script-results/yeastract-to-sgd-networks'):
    os.makedirs('../script-results/yeastract-to-sgd-networks')

# Files to be generated

# Create Networks

SGD_MATRIX = '../script-results/yeastract-to-sgd-networks/SGD_Regulation_matrix_profile2.csv'
SGD_MATRIX_EXCEL = '../script-results/yeastract-to-sgd-networks/SGD_Regulation_matrix_profile2.xlsx'

print(f'Creating SGD MATRIX\n')
sgd_matrix_file = open(SGD_MATRIX, 'w')
headers = "cols regulators/rows targets\t"
headers += '\t'.join(targets)
sgd_matrix_file.write(f'{headers}\n')
for target in targets:
  result = create_regulator_to_target_row(target, regulators_to_targets)
  if result != False:
    sgd_matrix_file.write(f'{result}\n')
sgd_matrix_file.close()

# Reading the csv file
df_new = pd.read_csv(SGD_MATRIX, sep='\t')
 
# saving xlsx file
GFG = pd.ExcelWriter(SGD_MATRIX_EXCEL)
df_new.to_excel(GFG, sheet_name="network", index=False)
 
GFG.save()