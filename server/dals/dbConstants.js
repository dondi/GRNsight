export const GRN_DATABASE_NAMESPACE = "gene_regulatory_network_with_timestamp";
export const GRN_DATABASE_NAMESPACE_OLD = "gene_regulatory_network";
export const PPI_DATABASE_NAMESPACE = "protein_protein_interactions_with_timestamp";
export const PPI_DATABASE_NAMESPACE_OLD = "protein_protein_interactions";
export const DATABASE_TIMESTAMP_CUTOFF = new Date("2025-01-01");

export const timestampNamespace = function (timestamp, isGrn) {
    return new Date(timestamp) > new Date("2025-01-01") ? (isGrn ? GRN_DATABASE_NAMESPACE : PPI_DATABASE_NAMESPACE) :
        (isGrn ? GRN_DATABASE_NAMESPACE_OLD : PPI_DATABASE_NAMESPACE_OLD);
};

export const isTimestampOld = function (timestamp) {
    return new Date(timestamp) < DATABASE_TIMESTAMP_CUTOFF;
};