import psycopg2
import csv
import os

PROCESSED_GENES = "../script-results/processed-loader-files/gene.csv"
MISSING_GENE_DESTINATION = '../script-results/processed-loader-files/missing-genes.csv'
UPDATE_GENE_DESTINATION = '../script-results/processed-loader-files/update-genes.csv'

try:
    connection = psycopg2.connect(user="postgres",
                                  password="",
                                  host="grnsight2.cfimp3lu6uob.us-west-1.rds.amazonaws.com",
                                  port="5432",
                                  database="postgres")
    cursor = connection.cursor()
    postgreSQL_select_Query = "select * from spring2022_network.gene"

    cursor.execute(postgreSQL_select_Query)
    print("Selecting rows from gene table using cursor.fetchall")
    gene_records = cursor.fetchall()

    db_genes = {}
    missing_genes = {}
    genes_to_update = {}
    for gene in gene_records:
        # key = (gene_id, taxon_id)
        key = (gene[0], gene[3])
        value = {"display_gene_id": gene[1], "species": gene[2], "regulator": gene[4]}
        db_genes[key] = value

    print(f'Processing file {PROCESSED_GENES}')
    with open(PROCESSED_GENES, 'r+', encoding="UTF-8") as f:
        i = 0
        reader = csv.reader(f)
        for row in reader:
            if i != 0:
                row = row[0].split('\t')
                gene_id = row[0]
                display_gene_id = row[1]
                species = row[2]
                taxon_id = row[3]
                regulator = row[4]
                key = (gene_id, taxon_id)
                value = {"display_gene_id": display_gene_id , "species": species, "regulator": regulator}
                if key not in db_genes:
                    missing_genes[key] = value
                elif db_genes[key]["display_gene_id"] != display_gene_id:
                    # the display gene id got updated, so lets update our db to account for that
                    genes_to_update[key] = value
            i+=1
            
    print(f'Creating missing-genes.csv\n')
    gene_file = open(MISSING_GENE_DESTINATION, 'w')
    headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\tRegulator'
    gene_file.write(f'{headers}\n')
    for gene in missing_genes:
        gene_file.write(f'{gene[0]}\t{missing_genes[gene]["display_gene_id"]}\t{missing_genes[gene]["species"]}\t{gene[1]}\t{missing_genes[gene]["regulator"]}\n')
    gene_file.close()

    print(f'Creating update-genes.csv\n')
    gene_file = open(UPDATE_GENE_DESTINATION, 'w')
    headers = f'Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\tRegulator'
    gene_file.write(f'{headers}\n')
    for gene in genes_to_update:
        gene_file.write(f'{gene[0]}\t{genes_to_update[gene]["display_gene_id"]}\t{genes_to_update[gene]["species"]}\t{gene[1]}\t{genes_to_update[gene]["regulator"]}\n')
    gene_file.close()

except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")