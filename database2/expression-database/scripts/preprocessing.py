import csv
import re
import sys
import os

# Need to manually add Dahlquist data to Expression metadata and refs


species = "Saccharomyces cerevisiae"
taxon_id = "559292"

# Gene Id Generation and Expression Data Generation

# Create folder paths 
if not os.path.exists('../script-results'):
    os.makedirs('../script-results')

if not os.path.exists('../script-results/processed-expression/'):
    os.makedirs('../script-results/processed-expression')

# For simplicity, we assume that the program runs in the expression-database-folder.
EXPRESSION_DATA_SOURCE = '../source-files/Expression 2020/ExpressionData.csv'
EXPRESSION_DATA_DESTINATION = '../script-results/processed-expression/expression-data.csv'
EXPRESSION_SHEET_DESTINATION = '../script-results/processed-expression/expression-sheet.csv'
GENES_DESTINATION = '../script-results/processed-expression/genes.csv'

genes = {}
expression_data = []
expression_sheets = {}
print(f'Processing file {EXPRESSION_DATA_SOURCE}')
with open(EXPRESSION_DATA_SOURCE, 'r+', encoding="UTF-8") as f:
  i = 0
  replicate_count = 0
  prev_dataset = ""
  reader = csv.reader(f)
  for row in reader:
    if i != 0:
      col_num = 0
      display_gene_id = row[2].replace('\t','')
      gene_id = row[1].replace('\t','')
      sort_index = row[0]
      sample_id = row[4]
      expression = row[5]
      time_points = row[6]
      dataset = row[7]
      # update the objects
      if gene_id not in genes:
        genes.update({gene_id : [display_gene_id, species, taxon_id]})
      expression_data.append([gene_id, taxon_id, sort_index, sample_id, expression, time_points, dataset])
    i+=1
print(f'Creating {EXPRESSION_DATA_DESTINATION}\n')
expression_data_file = open(EXPRESSION_DATA_DESTINATION, 'w')
expression_data_file.write(f'Gene ID\tTaxon ID\tSort Index\tSample ID\tExpression\tTime Points\tDataset\n')
for d in expression_data:
  result = '{}\t{}\t{}\t{}\t{}\t{}\t{}'.format(d[0], d[1], d[2], d[3], d[4], d[5], d[6])
  expression_data_file.write(f'{result}\n')
expression_data_file.close()

# Expression Metadata
EXPRESSION_METADATA_SOURCE = '../source-files/Expression 2020/ExpressionMetadata.csv'
EXPRESSION_METADATA_DESTINATION = '../script-results/processed-expression/expression-metadata.csv'
# Add Dalquist Data Here
expression_metadata = [
  # [1, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
  # [3, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
  # [2, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
  # [4, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
]

pubmed_to_geo_conversion = {
  '12269742': 'GSE9336',
  '17327492': 'GSE6129',
  '23039231': 'GSE24712'
}

print(f'Processing file {EXPRESSION_METADATA_SOURCE}')
with open(EXPRESSION_METADATA_SOURCE, 'r+', encoding="UTF-8") as f:
  i = 0
  reader = csv.reader(f)
  for row in reader:
    if i != 0:
      # replicate_index = row[0][-1]
      pubmed_id = row[1]
      geo_id = pubmed_to_geo_conversion[pubmed_id]
      control_yeast_strain = row[2]
      treatment_yeast_strain = row[3]
      control = row[4]
      treatment = row[5]
      concentration_value = row[6]
      concentration_unit = row[7]
      time_value = row[8]
      time_unit = row[9]
      number_of_replicates = row[10]
      expression_table = row[11]
      
      expression_metadata.append([geo_id, pubmed_id, control_yeast_strain, treatment_yeast_strain, control, treatment, concentration_value, concentration_unit, time_value, time_unit, number_of_replicates, expression_table])
    # next row
    i+= 1

print(f'Creating {EXPRESSION_METADATA_DESTINATION}\n')
expression_metadata_file = open(EXPRESSION_METADATA_DESTINATION, 'w')
expression_metadata_file.write(f'NCBI GEO ID\tPubmed ID\tControl Yeast Strain\tTreatment Yeast Strain\tControl\tTreatment\tConcentration Value\tConcentration Unit\tTime Value\tTime Units\tNumber of Replicates\tExpression Table\n')
for m in expression_metadata:
  expression_metadata_file.write(f'{m[0]}\t{m[1]}\t{m[2]}\t{m[3]}\t{m[4]}\t{m[5]}\t{m[6]}\t{m[7]}\t{m[8]}\t{m[9]}\t{m[10]}\t{m[11]}\n')
expression_metadata_file.close()


# Refs csv file generation (She is smol so we write her ourselves)
refs = [
  # [pubmed_id, authors, publication_year, title, doi, ncbi_geo_id]
  ['12269742', 'Kitagawa E., Takahashi J., Momose Y., Iwahashi H.', '2002', 'Effects of the Pesticide Thiuram: Genome-wide Screening of Indicator Genes by Yeast DNA Microarray', '10.1021/es015705v', 'GSE9336'],
  ['17327492', 'Thorsen, M., Lagniel, G., Kristiansson, E., Junot, C., Nerman, O., Labarre, J., & Tamás, M. J.', '2007', 'Quantitative transcriptome, proteome, and sulfur metabolite profiling of the Saccharomyces cerevisiae response to arsenite.', '10.1152/physiolgenomics.00236.2006', 'GSE6129'],
  ['23039231', 'Barreto, L., Canadell, D., Valverde‐Saubí, D., Casamayor, A., & Ariño, J.', '2012', 'The short‐term response of yeast to potassium starvation', '10.1111/j.1462-2920.2012.02887.x', 'GSE24712'],
  ['', 'Dahlquist KD, Abdulla H, Arnell AJ, Arsan C, Baker JM, Carson RM, Citti WT, De Las Casas SE, Ellis LG, Entzminger KC, Entzminger SD, Fitzpatrick BG, Flores SP, Harmon NS, Hennessy KP, Herman AF, Hong MV, King HL, Kubeck LN, La-Anyane OM, Land DL, Leon Guerrero MJ, Liu EM, Luu MD, McGee KP, Mejia MR, Melone SN, Pepe NT, Rodriguez KR, Rohacz NA, Rovetti RJ, Sakhon OS, Sampana JT, Sherbina K, Terada LH, Vega AJ, Wavrin AJ, Wyllie KW, Zapata BB',
   '2018', 'Global transcriptional response of wild type and transcription factor deletion strains of Saccharomyces cerevisiae to the environmental stress of cold shock and subsequent recovery', 
   '', 'GSE83656'],
  ['25161313', 'Neymotin, B., Athanasiadou R., and Gresham D.', '2014', ' Determination of in vivo RNA kinetics using RATE-seq. RNA, 20, 1645-1652.', '10.1261/rna.045104.114', '']
]

REFS_DESTINATION = '../script-results/processed-expression/refs.csv'
print(f'Creating {REFS_DESTINATION}\n')
refs_file = open(REFS_DESTINATION, 'w')
refs_file.write(f'Pubmed ID\tAuthors\tPublication Year\tTitle\tDOI\tNCBI GEO ID\n')
for r in refs:
  result = '{}\t{}\t{}\t{}\t{}\t{}'.format(r[0], r[1], r[2], r[3], r[4], r[5])
  refs_file.write(f'{result}\n')
refs_file.close()

# Degradation Rates
DEGRADATION_RATES_SOURCE = '../source-files/Expression 2020/DegradationRates.csv'
DEGRADATION_RATES_DESTINATION = '../script-results/processed-expression/degradation-rates.csv'

degradation_rates = []

print(f'Processing file {DEGRADATION_RATES_SOURCE}')
with open(DEGRADATION_RATES_SOURCE, 'r+', encoding="UTF-8") as f:
  i = 0
  reader = csv.reader(f)
  for row in reader:
    if i != 0:
      gene_id = row[0]
      display_gene_id = row[1]
      degradation_rate = row[2]
      pubmed_id = "25161313" 
      geo_id = ""
      degradation_rates.append([gene_id, taxon_id, geo_id, pubmed_id, degradation_rate])
      if gene_id not in genes:
        genes.update({gene_id : [display_gene_id, species, taxon_id]})
    i+= 1

print(f'Creating {DEGRADATION_RATES_DESTINATION}\n')
degradation_rates_file = open(DEGRADATION_RATES_DESTINATION, 'w')
degradation_rates_file.write(f'Gene ID\tTaxon ID\tNCBI GEO ID\tPubmed ID\tDegradation Rate\n')
for r in degradation_rates:
  result = '{}\t{}\t{}\t{}\t{}'.format(r[0], r[1], r[2], r[3], r[4])
  degradation_rates_file.write(f'{result}\n')
degradation_rates_file.close()

# Production Rates
PRODUCTION_RATES_SOURCE = '../source-files/Expression 2020/ProductionRates.csv'
PRODUCTION_RATES_DESTINATION = '../script-results/processed-expression/production-rates.csv'

production_rates = []

print(f'Processing file {PRODUCTION_RATES_SOURCE}')
with open(PRODUCTION_RATES_SOURCE, 'r+', encoding="UTF-8") as f:
  i = 0
  reader = csv.reader(f)
  for row in reader:
    if i != 0:
      gene_id = row[0]
      display_gene_id = row[1]
      production_rate = row[2]
      pubmed_id = "25161313" 
      geo_id = ""
      production_rates.append([gene_id, taxon_id, geo_id, pubmed_id, production_rate])
      if gene_id not in genes:
        genes.update({gene_id : [display_gene_id, species, taxon_id]})
    # next row
    i+= 1

print(f'Creating {PRODUCTION_RATES_DESTINATION}\n')
production_rates_file = open(PRODUCTION_RATES_DESTINATION, 'w')
production_rates_file.write(f'Gene ID\tTaxon ID\tNCBI GEO ID\tPubmed ID\tProduction Rate\n')
for r in production_rates:
  result = '{}\t{}\t{}\t{}\t{}'.format(r[0], r[1], r[2], r[3], r[4])
  production_rates_file.write(f'{result}\n')
production_rates_file.close()


print(f'Creating {GENES_DESTINATION}\n')
genes_file = open(GENES_DESTINATION, 'w')
genes_file.write(f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\n')
for g in genes:
  result = '{}\t{}\t{}\t{}'.format(g, genes[g][0], genes[g][1], genes[g][2],)
  genes_file.write(f'{result}\n')
genes_file.close()