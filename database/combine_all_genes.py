# get all the genes from all files

NETWORK_GENE_SOURCE = "network-database/script-results/processed-loader-files/gene.csv"
PROTEIN_GENE_SOURCE = "protein-protein-database/script-results/processed-loader-files/gene.csv"
EXPRESSION_GENE_SOURCE = "expression-database/script-results/processed-expression/genes.csv"

import csv

# Function to read genes from a CSV file into a set
def read_genes_from_csv(file_path):
    genes = set()
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r= ','.join(row).split('\t')
                genes.add(r[0])
            row_num += 1
    return genes

def read_gene_info_from_csv(file_path):
    gene_info = {}
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        row_num = 0
        for row in reader:
            if row_num != 0:
                r= ','.join(row).split('\t')
                if len(r) == 4:
                    r.append('False')
                gene_info[r[0]] = {
                    'Display Gene ID': r[1],
                    'Species': r[2],
                    'Taxon': r[3],
                    'Regulator': r[4]
                }
            row_num += 1
    return gene_info

# File paths for the three source files
protein_protein_interactions_file = 'protein_protein_interactions.csv'
network_table_file = 'network_table.csv'
expression_table_file = 'expression_table.csv'

# Read genes from each source file into sets
protein_genes = read_genes_from_csv(PROTEIN_GENE_SOURCE)
network_genes = read_genes_from_csv(NETWORK_GENE_SOURCE)
expression_genes = read_genes_from_csv(EXPRESSION_GENE_SOURCE)

# Create a union set containing all unique genes
all_genes = protein_genes.union(network_genes, expression_genes)
    
# Read gene information from each source file into dictionaries
protein_gene_info = read_gene_info_from_csv(PROTEIN_GENE_SOURCE)
network_gene_info = read_gene_info_from_csv(NETWORK_GENE_SOURCE)
expression_gene_info = read_gene_info_from_csv(EXPRESSION_GENE_SOURCE)

union_genes_info = {}
for gene_id in all_genes:
    gene_info = {}
    if gene_id in network_gene_info:
        gene_info = network_gene_info[gene_id]
    elif gene_id in protein_gene_info:
        gene_info = protein_gene_info[gene_id]
    elif gene_id in expression_gene_info:
        gene_info = expression_gene_info[gene_id]
    union_genes_info[gene_id] = gene_info
    
union_file_path = 'union_genes.csv'
with open(union_file_path, 'w', newline='') as union_file:
    headers = ['Gene ID', 'Display Gene ID', 'Species', 'Taxon', 'Regulator']
    union_file.write('\t'.join(headers) + '\n')
    
    for gene_id, gene_info in union_genes_info.items():
        row_data = [gene_id, gene_info['Display Gene ID'], gene_info['Species'], gene_info['Taxon'], gene_info['Regulator']]
        union_file.write('\t'.join(row_data) + '\n')
