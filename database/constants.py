class Constants:
    GRN_FOLDER_PATH = 'network-database'
    PPI_FOLDER_PATH = 'protein-protein-database'
    EXPRESSION_FOLDER_PATH = 'expression-database'
    UNION_GENE_FOLDER_PATH = 'union-gene-data/'
    
    # Gene data source file path
    GRN_GENE_SOURCE = GRN_FOLDER_PATH + "/script-results/processed-loader-files/gene.csv"
    PPI_GENE_SOURCE = PPI_FOLDER_PATH + "/script-results/processed-loader-files/gene.csv"
    EXPRESSION_GENE_SOURCE = EXPRESSION_FOLDER_PATH + "/script-results/processed-expression/genes.csv"

    # Union gene data
    GENE_DATA_DIRECTORY = UNION_GENE_FOLDER_PATH + 'union_genes.csv'
    MISSING_GENE_UNION_DIRECTORY = UNION_GENE_FOLDER_PATH + 'union-missing-genes.csv'
    UPDATE_GENE_UNION_DIRECTORY = UNION_GENE_FOLDER_PATH + 'union-update-genes.csv'
    
    # Constants name: NETWORK_<table_name>_DATA_DIRECTORY
    GRN_DATABASE_NAMESPACE = 'gene_regulatory_network'
    GRN_SOURCE_TABLE_DATA_DIRECTORY = GRN_FOLDER_PATH + '/script-results/processed-loader-files/source.csv'
    GRN_NETWORK_TABLE_DATA_DIRECTORY = GRN_FOLDER_PATH + '/script-results/processed-loader-files/network.csv'
    
    # Protein-protein-interactions
    PPI_DATABASE_NAMESPACE = 'protein_protein_interactions'
    PPI_SOURCE_TABLE_DATA_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/source.csv'
    PPI_NETWORK_TABLE_DATA_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/physical_interaction_no_dupe.csv'
    PPI_PROTEIN_TABLE_DATA_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/protein.csv'
    
    # Expression data
    EXPRESISON_DATABASE_NAMESPACE = 'gene_expression'
    EXPRESSION_REFS_TABLE_DATA_DIRECTORY = EXPRESSION_FOLDER_PATH + '/script-results/processed-expression/refs.csv'
    EXPRESSION_METADATA_TABLE_DATA_DIRECTORY = EXPRESSION_FOLDER_PATH + '/script-results/processed-expression/expression-metadata.csv'
    EXPRESSION_EXPRESSION_TABLE_DATA_DIRECTORY = EXPRESSION_FOLDER_PATH + '/script-results/processed-expression/expression-data.csv'
    EXPRESSION_PRODUCTION_RATE_TABLE_DATA_DIRECTORY = EXPRESSION_FOLDER_PATH + '/script-results/processed-expression/production-rates.csv'
    EXPRESSION_DEGRADATION_RATE_TABLE_DATA_DIRECTORY = EXPRESSION_FOLDER_PATH + '/script-results/processed-expression/degradation-rates.csv'
    
    # Paths for update files
    PPI_MISSING_GENE_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/missing-genes.csv'
    PPI_UPDATE_GENE_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/update-genes.csv'
    PPI_MISSING_PROTEIN_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/missing-proteins.csv'
    PPI_UPDATE_PROTEIN_DIRECTORY = PPI_FOLDER_PATH + '/script-results/processed-loader-files/update-proteins.csv'
    GRN_MISSING_GENE_DIRECTORY = GRN_FOLDER_PATH + '/script-results/processed-loader-files/missing-genes.csv'
    GRN_UPDATE_GENE_DIRECTORY = GRN_FOLDER_PATH + '/script-results/processed-loader-files/update-genes.csv'