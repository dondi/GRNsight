import os
import csv
from sqlalchemy import create_engine
from sqlalchemy import text
from constants import Constants
from utils import Utils

PROTEIN_GENE_HEADER = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID'
GRN_GENE_HEADER = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\tRegulator'

def _get_all_data_from_database_table(database_namespace, table_name):
    db = create_engine(os.environ['DB_URL'])
    with db.connect() as connection:
        result_set = connection.execute(text(f"SELECT * FROM {database_namespace}.{table_name}"))
        return result_set.fetchall()
    
def _get_all_db_genes(database_namespace):
    gene_records = _get_all_data_from_database_table(database_namespace, "gene")
    genes = {}
    for gene in gene_records:
        key = (gene[0], gene[3])
        if len(gene) > 4:
            value = (gene[1], gene[2], gene[4])
        else:
            value = (gene[1], gene[2])
        genes[key] = value
    return genes

def _get_all_db_grn_genes():
    return _get_all_db_genes(Constants.GRN_DATABASE_NAMESPACE)

def _get_all_db_ppi_genes():
    return _get_all_db_genes(Constants.PPI_DATABASE_NAMESPACE)  

def _get_all_genes():
    db_grn_genes = _get_all_db_grn_genes()
    db_ppi_genes = _get_all_db_ppi_genes()
    Utils.create_union_file([Constants.PPI_GENE_SOURCE, Constants.GRN_GENE_SOURCE], Constants.GENE_DATA_DIRECTORY)
    genes = db_grn_genes
    
    for gene in db_ppi_genes:
        if gene not in genes:
            display_gene_id, species = db_ppi_genes[gene]
            genes[gene] = [display_gene_id, species, False]
    
    with open(Constants.GENE_DATA_DIRECTORY, 'r+', encoding="UTF-8") as f:
        i = 0
        reader = csv.reader(f)
        for row in reader:
            if i != 0:
                row = row[0].split('\t')
                gene_id = row[0]
                display_gene_id = row[1]
                species = row[2]
                taxon_id = row[3]
                regulator = row[4].capitalize()
                key = (gene_id, taxon_id)
                value = (display_gene_id, species, regulator)
                if key not in genes:
                    genes[key] = value
                elif genes[key][0] != display_gene_id:
                    if display_gene_id != "None":
                        genes[key] = value
            i+=1
    return genes
        

def get_all_proteins():
    protein_records = _get_all_data_from_database_table(Constants.PPI_DATABASE_NAMESPACE, "protein")
    proteins = {}
    for protein in protein_records:
        key = (protein[1], protein[5])
        value = (protein[0], protein[2], protein[3], protein[4])
        proteins[key] = value
    return proteins

def processing_grn_gene_file():
    return _processing_gene_file(_get_all_db_grn_genes(), is_protein=False)
    
def processing_ppi_gene_file():
    return _processing_gene_file(_get_all_db_ppi_genes())

def _processing_gene_file(db_genes, is_protein=True):
    print(f'Processing gene')
    missing_genes = {}
    genes_to_update = {}
    all_genes = _get_all_genes()
    for gene in all_genes:
        display_gene_id, species, regulator = all_genes[gene]
        values_for_ppi = (display_gene_id, species)
        values_for_grn = (display_gene_id, species, regulator)
        if gene not in db_genes:
            if is_protein:
                missing_genes[gene] = values_for_ppi
            else:
                missing_genes[gene] = values_for_grn
        elif gene in db_genes and db_genes[gene][0] != display_gene_id:
            if db_genes[gene][0] != "None":
                if is_protein: 
                    genes_to_update[gene] = values_for_ppi
                else:
                    genes_to_update[gene] = values_for_grn
    print("Missing genes", missing_genes)
    print("Genes to update", genes_to_update)
    return missing_genes, genes_to_update

def processing_protein_file(file_path, db_proteins):
    print(f'Processing file {file_path}')
    ppi_missing_proteins = {}
    ppi_proteins_to_update = {}
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
                    ppi_missing_proteins[key] = value
                elif db_proteins[key] != value: 
                    ppi_proteins_to_update[key] = value
            i+=1
    return ppi_missing_proteins, ppi_proteins_to_update

def create_grn_gene_file(file_path, data):
    _create_gene_file(file_path, GRN_GENE_HEADER, data, is_protein=False)
    
def create_ppi_gene_file(file_path, data):
    _create_gene_file(file_path, PROTEIN_GENE_HEADER, data)

def _create_gene_file(file_path, headers, data, is_protein=True):
    print(f'Creating {file_path}\n')
    gene_file = open(file_path, 'w')
    gene_file.write(f'{headers}\n')
    for gene in data:
        if is_protein:
            gene_file.write(f'{gene[0]}\t{data[gene][0]}\t{data[gene][1]}\t{gene[1]}\n')
        else:
            gene_file.write(f'{gene[0]}\t{data[gene][0]}\t{data[gene][1]}\t{gene[1]}\t{data[gene][2]}\n')
    gene_file.close()

def create_ppi_protein_file(file_path, data):
    print(f'Creating {file_path}\n')
    protein_file = open(file_path, 'w')
    headers = f'Standard Name\tGene Systematic Name\tLength\tMolecular Weight\tPI\tTaxon ID'
    protein_file.write(f'{headers}\n')
    for protein in data:
        protein_file.write(f'{data[protein][0]}\t{protein[0]}\t{data[protein][1]}\t{data[protein][2]}\t{data[protein][3]}\t{protein[1]}\n')
    protein_file.close()

# Processing gene files
ppi_missing_genes, ppi_genes_to_update = processing_ppi_gene_file()
grn_missing_genes, grn_genes_to_update = processing_grn_gene_file()
ppi_missing_proteins, ppi_proteins_to_update = processing_protein_file(Constants.PPI_PROTEIN_TABLE_DATA_DIRECTORY, get_all_proteins())
create_grn_gene_file(Constants.GRN_MISSING_GENE_DIRECTORY, grn_missing_genes)
create_grn_gene_file(Constants.GRN_UPDATE_GENE_DIRECTORY, grn_genes_to_update)
create_ppi_gene_file(Constants.PPI_MISSING_GENE_DIRECTORY, ppi_missing_genes)
create_ppi_gene_file(Constants.PPI_UPDATE_GENE_DIRECTORY, ppi_genes_to_update)
create_ppi_protein_file(Constants.PPI_MISSING_PROTEIN_DIRECTORY, ppi_missing_proteins)
create_ppi_protein_file(Constants.PPI_UPDATE_PROTEIN_DIRECTORY, ppi_proteins_to_update)