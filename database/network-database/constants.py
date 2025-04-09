class Constants:
    # database namespace
    GRN_DATABASE_NAMESPACE = "gene_regulatory_network_with_timestamp"
    PPI_DATABASE_NAMESPACE = "protein_protein_interactions_with_timestamp"

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