import os
import csv
from sqlalchemy import create_engine
from sqlalchemy import text
from constants import Constants

def get_all_data_from_database_table(database_namespace, table_name):
    db = create_engine(os.environ['DB_URL'])
    with db.connect() as connection:
        result_set = connection.execute(text(f"SELECT * FROM {database_namespace}.{table_name}"))
        return result_set.fetchall()
    
def get_all_genes(database_namespace):
    gene_records = get_all_data_from_database_table(database_namespace, "gene")
    genes = {}
    for gene in gene_records:
        key = (gene[0], gene[3])
        if len(gene) > 4:
            value = (gene[1], gene[2], gene[4])
        else:
            value = (gene[1], gene[2])
        genes[key] = value
    return genes

def get_all_network_genes():
    return get_all_genes(Constants.NETWORK_DATABASE_NAMESPACE)

def get_all_protein_genes():
    return get_all_genes(Constants.PROTEIN_DATABASE_NAMESPACE)

def get_all_proteins():
    protein_records = get_all_data_from_database_table(Constants.PROTEIN_DATABASE_NAMESPACE, "protein")
    proteins = {}
    for protein in protein_records:
        key = (protein[1], protein[5])
        value = (protein[0], protein[2], protein[3], protein[4])
        proteins[key] = value
    return proteins

def processing_gene_file(file_path, db_genes, is_protein=True):
    print(f'Processing file {file_path}')
    missing_genes = {}
    genes_to_update = {}
    with open(file_path, 'r+', encoding="UTF-8") as f:
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
                if (is_protein):
                    value = (display_gene_id, species)
                else:
                    regulator = row[4].capitalize()
                    value = (display_gene_id, species, regulator)
                if key not in db_genes:
                    missing_genes[key] = value
                elif db_genes[key][0] != display_gene_id:
                    # the value is not the same, let's update
                    if display_gene_id != "None":
                        genes_to_update[key] = value
            i+=1
    return missing_genes, genes_to_update

def processing_protein_file(file_path, db_proteins):
    print(f'Processing file {file_path}')
    missing_proteins = {}
    proteins_to_update = {}
    with open(file_path, 'r+', encoding="UTF-8") as f:
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
                    proteins_to_update[key] = value
            i+=1
    return missing_proteins, proteins_to_update

def create_gene_file(file_path, headers, data, is_protein=True):
    print(f'Creating {file_path}\n')
    gene_file = open(file_path, 'w')
    gene_file.write(f'{headers}\n')
    for gene in data:
        if is_protein:
            gene_file.write(f'{gene[0]}\t{data[gene][0]}\t{data[gene][1]}\t{gene[1]}\n')
        else:
            gene_file.write(f'{gene[0]}\t{data[gene][0]}\t{data[gene][1]}\t{gene[1]}\t{data[gene][2]}\n')
    gene_file.close()

def create_protein_file(file_path, data):
    print(f'Creating {file_path}\n')
    protein_file = open(file_path, 'w')
    headers = f'Standard Name\tGene Systematic Name\tLength\tMolecular Weight\tPI\tTaxon ID'
    protein_file.write(f'{headers}\n')
    for protein in data:
        protein_file.write(f'{data[protein][0]}\t{[protein][0]}\t{data[protein][1]}\t{data[protein][2]}\t{data[protein][3]}\t{protein[1]}\n')
    protein_file.close()

# Processing gene files
protein_headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID'
network_headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\tRegulator'
network_db_genes = get_all_network_genes()
protein_db_genes = get_all_protein_genes()
protein_missing_genes, protein_genes_to_update = processing_gene_file(Constants.PROTEIN_GENE_SOURCE, protein_db_genes)
network_missing_genes, network_genes_to_update = processing_gene_file(Constants.NETWORK_GENE_SOURCE, network_db_genes, is_protein=False)
missing_proteins, proteins_to_update = processing_protein_file(Constants.PROTEIN_PROTEIN_TABLE_DATA_DIRECTORY, get_all_proteins())
create_gene_file(Constants.NETWORK_MISSING_GENE_DIRECTORY, network_headers, network_missing_genes, is_protein=False)
create_gene_file(Constants.PROTEIN_MISSING_GENE_DIRECTORY, protein_headers, protein_missing_genes)
create_gene_file(Constants.NETWORK_UPDATE_GENE_DIRECTORY, network_headers, network_genes_to_update, is_protein=False)
create_gene_file(Constants.PROTEIN_UPDATE_GENE_DIRECTORY, protein_headers, protein_genes_to_update)
create_protein_file(Constants.PROTEIN_MISSING_PROTEIN_DIRECTORY, missing_proteins)
create_protein_file(Constants.PROTEIN_UPDATE_PROTEIN_DIRECTORY, proteins_to_update)