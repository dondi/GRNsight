class Constants:
    # database namespace
    GRN_DATABASE_NAMESPACE = "gene_regulatory_network"
    PPI_DATABASE_NAMESPACE = "protein_protein_interactions"
    
    # network types
    GRN_NETWORK_MODE = "grn"
    PPI_NETWORK_MODE = "ppi"
    
    # data file paths
    DATA_DIRECTORY = "script-results"
    GENE_DATA_FILEPATH = DATA_DIRECTORY + "/gene_data.tsv"
    PROTEIN_DATA_FILEPATH = DATA_DIRECTORY + "/protein_data.tsv"
    GENE_REGULATORY_NETWORK_DATA_FILEPATH = DATA_DIRECTORY + "/gene_regulatory_network_data.tsv"
    PROTEIN_PROTEIN_INTERACTIONS_DATA_FILEPATH = DATA_DIRECTORY + "/protein_protein_interactions_data.tsv"
    SOURCE_DATA_FILEPATH = DATA_DIRECTORY + "/source_data.tsv"
    
    # missing and update file paths
    MISSING_DATA_DIRECTORY = DATA_DIRECTORY + "/missing_data"
    UPDATE_DATA_DIRECTORY = DATA_DIRECTORY + "/update_data"
    MISSING_GRN_GENE_DATA_FILEPATH =  MISSING_DATA_DIRECTORY + "/missing_grn_gene_data.tsv"
    UPDATE_GRN_GENE_DATA_FILEPATH = UPDATE_DATA_DIRECTORY + "/update_grn_gene_data.tsv"
    MISSING_PPI_GENE_DATA_FILEPATH = MISSING_DATA_DIRECTORY + "/missing_ppi_gene_data.tsv"
    UPDATE_PPI_GENE_DATA_FILEPATH = UPDATE_DATA_DIRECTORY + "/update_ppi_gene_data.tsv"
    MISSING_PROTEIN_DATA_FILEPATH = MISSING_DATA_DIRECTORY + "/missing_protein_data.tsv"
    UPDATE_PROTEIN_DATA_FILEPATH = UPDATE_DATA_DIRECTORY + "/update_protein_data.tsv"
    UPDATE_PROTEIN_NAME_DATA_FILEPATH = UPDATE_DATA_DIRECTORY + "/update_protein_name_data.tsv"
