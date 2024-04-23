class Constants:
    NETWORK_FOLDER_PATH = 'network-database'
    PROTEIN_FOLDER_PATH = 'protein-protein-database'
    EXPRESSION_FOLDER_PATH = 'expression-database'
    
    # Gene data source file path
    NETWORK_GENE_SOURCE = "network-database/script-results/processed-loader-files/gene.csv"
    PROTEIN_GENE_SOURCE = "protein-protein-database/script-results/processed-loader-files/gene.csv"
    EXPRESSION_GENE_SOURCE = "expression-database/script-results/processed-expression/genes.csv"

    # Union gene data
    GENE_DATA_DIRECTORY = 'union_genes.csv'
    MISSING_GENE_UNION_DIRECTORY = 'union-missing-genes.csv'
    UPDATE_GENE_UNION_DIRECTORY = 'union-update-genes.csv'
    
    # Constants name: NETWORK_<table_name>_DATA_DIRECTORY
    NETWORK_DATABASE_NAMESPACE = 'gene_regulatory_network_testing'
    NETWORK_SOURCE_TABLE_DATA_DIRECTORY = NETWORK_FOLDER_PATH +  '/script-results/processed-loader-files/source.csv'
    NETWORK_NETWORK_TABLE_DATA_DIRECTORY = NETWORK_FOLDER_PATH +  '/script-results/processed-loader-files/network.csv'
    
    # Protein-protein-interactions
    PROTEIN_DATABASE_NAMESPACE = 'protein_protein_interactions_testing'
    PROTEIN_SOURCE_TABLE_DATA_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/source.csv'
    PROTEIN_NETWORK_TABLE_DATA_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/physical_interaction_no_dupe.csv'
    PROTEIN_PROTEIN_TABLE_DATA_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/protein.csv'
    
    # Expression data
    EXPRESISON_DATABASE_NAMESPACE = 'gene_expression_testing'
    EXPRESSION_REFS_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/refs.csv'
    EXPRESSION_METADATA_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/expression-metadata.csv'
    EXPRESSION_EXPRESSION_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/expression-data.csv'
    EXPRESSION_PRODUCTION_RATE_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/production-rates.csv'
    EXPRESSION_DEGRADATION_RATE_TABLE_DATA_DIRECTORY = 'expression-database/script-results/processed-expression/degradation-rates.csv'
    
    # Paths for update files
    PROTEIN_MISSING_GENE_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/missing-genes.csv'
    PROTEIN_UPDATE_GENE_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/update-genes.csv'
    PROTEIN_MISSING_PROTEIN_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/missing-proteins.csv'
    PROTEIN_UPDATE_PROTEIN_DIRECTORY = 'protein-protein-database/script-results/processed-loader-files/update-proteins.csv'
    
    NETWORK_MISSING_GENE_DIRECTORY = 'network-database/script-results/processed-loader-files/missing-genes.csv'
    NETWORK_UPDATE_GENE_DIRECTORY = 'network-database/script-results/processed-loader-files/update-genes.csv'