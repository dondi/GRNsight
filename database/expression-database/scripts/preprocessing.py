import argparse
import csv
import re
import sys
import os

# Need to manually add Dahlquist data to Expression metadata and refs


species = "Saccharomyces cerevisiae"
taxon_id = "559292"

BASE_OUT = "../script-results/processed-expression"
# Gene Id Generation and Expression Data Generation

def ensure_dirs():
  os.makedirs(BASE_OUT, exist_ok=True)
  
def write_to_file(dest, header, data):
    print(f'Creating {dest}\n')
    with open(dest, 'w', newline='') as out:
        out.write(header + "\n")
        for d in data:
            out.write("\t".join(d) + "\n")

def process_expression_data(source_dir):
  src = os.path.join(source_dir, 'ExpressionData.csv')
  dest = os.path.join(BASE_OUT, 'expression-data.csv')
  
  genes = {}
  expression_data = []
  
  print(f'Processing file {src}')
  with open(src, 'r', encoding="UTF-8") as f:
        reader = csv.reader(f)
        next(reader)  # skip header

        for row in reader:
            display_gene_id = row[2].replace('\t', '')
            gene_id = row[1].replace('\t', '')
            sort_index = row[0]
            sample_id = row[4]
            expression = row[5]
            time_points = row[6]
            dataset = row[7]

            if gene_id not in genes:
                genes[gene_id] = [display_gene_id, species, taxon_id]

            expression_data.append([
                gene_id, taxon_id, sort_index, sample_id,
                expression, time_points, dataset
            ])
  
  header = "Gene ID\tTaxon ID\tSort Index\tSample ID\tExpression\tTime Point\tDataset"
  write_to_file(dest, header, expression_data)
  
  return genes

def process_expression_metadata(source_dir):
    src = os.path.join(source_dir, 'ExpressionMetadata.csv')
    dst = f"{BASE_OUT}/expression-metadata.csv"

    # Add Dalquist Data Here
    expression_metadata = [
      # [1, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
      # [3, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
      # [2, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
      # [4, 'GSE83656', '', 'control_yeast_strain', 'treatment_yeast_strain', 'control', 'treatment', 'concentration_value', 'concentration_unit', 'time_value', 'time_unit', 'number_of_replicates,', 'expression_table'],
    ]

    pubmed_to_geo = {
        '12269742': 'GSE9336',
        '17327492': 'GSE6129',
        '23039231': 'GSE24712'
    }

    print(f"Processing file: {src}")
    with open(src, 'r', encoding="UTF-8") as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            pubmed = row[1]
            geo_id = pubmed_to_geo.get(pubmed, "")

            expression_metadata.append([
                geo_id, pubmed, row[2], row[3], row[4], row[5], row[6],
                row[7], row[8], row[9], row[10], row[11]
            ])

    header = (
        "NCBI GEO ID\tPubmed ID\tControl Yeast Strain\tTreatment Yeast Strain\t"
        "Control\tTreatment\tConcentration Value\tConcentration Unit\t"
        "Time Value\tTime Units\tNumber of Replicates\tExpression Table"
    )
    print(f"Creating {dst}")
    write_to_file(dst, header, expression_metadata)

def process_refs():
    dst = f"{BASE_OUT}/refs.csv"
    print(f"Creating {dst}")

    refs = [
        ['12269742', 'Kitagawa E., Takahashi J., Momose Y., Iwahashi H.', '2002',
         'Effects of the Pesticide Thiuram...', '10.1021/es015705v', 'GSE9336'],
        ['17327492', 'Thorsen M., et al.', '2007',
         'Quantitative transcriptome...', '10.1152/physiolgenomics.00236.2006', 'GSE6129'],
        ['23039231', 'Barreto L., et al.', '2012',
         'The short-term response of yeast...', '10.1111/j.1462-2920.2012.02887.x', 'GSE24712'],
        ['', 'Dahlquist KD, et al.', '2018',
         'Global transcriptional response...', '', 'GSE83656'],
        ['25161313', 'Neymotin B., et al.', '2014',
         'Determination of in vivo RNA kinetics...', '10.1261/rna.045104.114', '']
    ]

    header = "Pubmed ID\tAuthors\tPublication Year\tTitle\tDOI\tNCBI GEO ID"
    write_to_file(dst, header, refs)

def process_degradation_rates(source_dir, genes):
    src = os.path.join(source_dir, 'DegradationRates.csv')
    dst = f"{BASE_OUT}/degradation-rates.csv"

    degradation = []
    print(f"Processing file: {src}")

    with open(src, 'r', encoding="UTF-8") as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            gene = row[0]
            display = row[1]
            rate = row[2]

            degradation.append([gene, taxon_id, "", "25161313", rate])

            if gene not in genes:
                genes[gene] = [display, species, taxon_id]

    header = "Gene ID\tTaxon ID\tNCBI GEO ID\tPubmed ID\tDegradation Rate"
    write_to_file(dst, header, degradation)
    return genes

def process_production_rates(source_dir, genes):
    src = os.path.join(source_dir, 'ProductionRates.csv')
    dst = f"{BASE_OUT}/production-rates.csv"

    production = []
    print(f"Processing file: {src}")

    with open(src, 'r', encoding="UTF-8") as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            gene = row[0]
            display = row[1]
            rate = row[2]

            production.append([gene, taxon_id, "", "25161313", rate])

            if gene not in genes:
                genes[gene] = [display, species, taxon_id]

    header = "Gene ID\tTaxon ID\tNCBI GEO ID\tPubmed ID\tProduction Rate"
    write_to_file(dst, header, production)
    return genes

def write_genes(genes):
    dst = f"{BASE_OUT}/genes.csv"
    print(f"Creating {dst}")

    with open(dst, 'w', newline='') as out:
        out.write("Gene ID\tDisplay Gene ID\tSpecies\tTaxon ID\n")
        for gid, vals in genes.items():
            out.write(f"{gid}\t{vals[0]}\t{vals[1]}\t{vals[2]}\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Preprocess expression dataset components.")

    parser.add_argument("--all", action="store_true", help="Run all preprocessing steps.")
    parser.add_argument("--expr", action="store_true", help="Process expression data.")
    parser.add_argument("--meta", action="store_true", help="Process expression metadata.")
    parser.add_argument("--refs", action="store_true", help="Generate refs file.")
    parser.add_argument("--prod", action="store_true", help="Process production rates.")
    parser.add_argument("--deg", action="store_true", help="Process degradation rates.")
    parser.add_argument("--source_folder", type=str, default="Current Database",
                        help="Folder in source-files folder containing source CSV files.")

    args = parser.parse_args()
    source_dir = os.path.join("../source-files", args.source_folder)
    # Default: run all if no flags used
    if not any([args.expr, args.meta, args.refs, args.prod, args.deg, args.all]):
        args.all = True


    ensure_dirs()
    
    if args.all or args.refs:
        process_refs()
    
    if args.all or args.meta:
        process_expression_metadata(source_dir)

    if args.all or args.expr or args.prod or args.deg:
        genes = process_expression_data(source_dir)

        if args.all or args.deg:
            genes = process_degradation_rates(source_dir, genes)

        if args.all or args.prod:
            genes = process_production_rates(source_dir, genes)

        write_genes(genes)