import os
import csv
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy import text
from constants import *

def get_all_genes_proteins():
    # Create envrionment variable for db url
    db = create_engine(os.environ['DB_URL'])
    
    with db.connect() as connection:
        result_set = connection.execute(text(f"SELECT * FROM {Constants.DATABASE_NAMESPACE}.gene"))
        
        genes_record = result_set.fetchall()
        
        db_genes = {}
        for gene in genes_record:
            print(gene)
            # key = (gene_id, taxon_id)
            key = (gene[0], gene[3])
            # values = (display_gene_id, species)
            value = (gene[1], gene[2])
            db_genes[key] = value
        
        # Collect proteins
        result_set = connection.execute(text(f"SELECT * FROM {Constants.DATABASE_NAMESPACE}.protein"))
        proteins_record = result_set.fetchall()
        
        db_proteins = {}
        for protein in proteins_record:
            #  Key = (gene_systematic_name, taxon_id)
            key = (protein[1], protein[5])
            # value = (standard_name, length, molecular_weight, PI)
            value = (protein[0], protein[2], protein[3], protein[4])
            db_proteins[key] = value
        
        return db_genes, db_proteins
    
db_genes, db_proteins = get_all_genes_proteins() # Format [(display_gene_id, gene_id), ...] and [(gene_systematic_name, ), ...]

print("Genes", db_genes)
print("Protein", db_proteins)

genes_to_update = {}
missing_genes = {}

print(f'Processing file {Constants.PROCESSED_GENES}')
with open(Constants.PROCESSED_GENES, 'r+', encoding="UTF-8") as f:
    i = 0
    reader = csv.reader(f)
    for row in reader:
        if i != 0:
            row = row[0].split('\t')
            gene_id = row[0]
            display_gene_id = row[1]
            species = row[2]
            taxon_id = row[3]
            key = (gene_id, taxon_id)
            value = (display_gene_id, species)
            if key not in db_genes:
                missing_genes[key] = value
                print(f'Gene {display_gene_id} not found in the database')
            elif db_genes[key] != value:
                # the value is not the same, let's update
                genes_to_update[key] = value
        i+=1
        
print(f'Creating missing-genes.csv\n')
gene_file = open(Constants.MISSING_GENE_DESTINATION, 'w')
headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID'
gene_file.write(f'{headers}\n')
for gene in missing_genes:
    gene_file.write(f'{gene[0]}\t{missing_genes[gene][0]}\t{missing_genes[gene][1]}\t{gene[1]}\n')
gene_file.close()

print(f'Creating update-genes.csv\n')
gene_file = open(Constants.UPDATE_GENE_DESTINATION, 'w')
headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID'
gene_file.write(f'{headers}\n')
for gene in genes_to_update:
    gene_file.write(f'{gene[0]}\t{genes_to_update[gene][0]}\t{genes_to_update[gene][1]}\t{gene[1]}\n')
gene_file.close()

missing_proteins = {}
proteins_to_update = {}

print(f"Processing file {Constants.PROCESSED_PROTEIN}")
with open(Constants.PROCESSED_PROTEIN, 'r+', encoding="UTF-8") as f:
    i = 0
    reader = csv.reader(f)
    for row in reader:
        if i != 0:
            row = row[0].split('\t')
            standard_name = row[0]
            gene_systematic_name = row[1]
            length = float(row[2]) if row[2] != "None" else 0
            molecular_weight = float(row[3]) if row[3] != "None" else 0
            pi = float(row[4]) if row[4] != "None" else 0
            taxon_id = row[5]
            key = (gene_systematic_name, taxon_id)
            value = (standard_name, length, molecular_weight, pi)
            if key not in db_proteins:
                missing_proteins[key] = value
            elif db_proteins[key] != value: 
                print("Protein", db_proteins[key])
                print("Value", value)
                proteins_to_update[key] = value
        i+=1
        
print(f'Creating missing-proteins.csv\n')
protein_file = open(Constants.MISSING_PROTEIN_DESTINATION, 'w')
headers = f'Standard Name\tGene Systematic Name\tLength\t Molecular Weight\tPI\tTaxon ID'
protein_file.write(f'{headers}\n')
for protein in missing_proteins:
    protein_file.write(f'{missing_proteins[protein][0]}\t{[protein][0]}\t{missing_proteins[protein][1]}\t{missing_proteins[protein][2]}\t{missing_proteins[protein][3]}\t{protein[1]}\n')
protein_file.close()

print(f'Creating update-proteins.csv\n')
protein_file = open(Constants.UPDATE_PROTEIN_DESTINATION, 'w')
headers = f'Standard Name\tGene Systematic Name\tLength\t Molecular Weight\tPI\tTaxon ID'
protein_file.write(f'{headers}\n')
for protein in proteins_to_update:
    protein_file.write(f'{proteins_to_update[protein][0]}\t{[protein][0]}\t{proteins_to_update[protein][1]}\t{proteins_to_update[protein][2]}\t{proteins_to_update[protein][3]}\t{protein[1]}\n')
protein_file.close()