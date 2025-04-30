const GRN_DATABASE_NAMESPACE_WITH_TIMESTAMP = "gene_regulatory_network_with_timestamp";
const GRN_DATABASE_NAMESPACE = "gene_regulatory_network";
const PPI_DATABASE_NAMESPACE_WITH_TIMESTAMP = "protein_protein_interactions_with_timestamp";
const PPI_DATABASE_NAMESPACE = "protein_protein_interactions";
const DATABASE_TIMESTAMP_CUTOFF = new Date("2025-01-01");

const timestampNamespace = function (timestamp, isGrn) {
    return new Date(timestamp) > new Date("2025-01-01")
        ? isGrn
            ? GRN_DATABASE_NAMESPACE_WITH_TIMESTAMP
            : PPI_DATABASE_NAMESPACE_WITH_TIMESTAMP
        : isGrn
          ? GRN_DATABASE_NAMESPACE
          : PPI_DATABASE_NAMESPACE;
};

const isTimestampOld = function (timestamp) {
    return new Date(timestamp) < DATABASE_TIMESTAMP_CUTOFF;
};

module.exports = {
    timestampNamespace,
    isTimestampOld,
    GRN_DATABASE_NAMESPACE_WITH_TIMESTAMP: GRN_DATABASE_NAMESPACE_WITH_TIMESTAMP,
    GRN_DATABASE_NAMESPACE: GRN_DATABASE_NAMESPACE,
    PPI_DATABASE_NAMESPACE_WITH_TIMESTAMP: PPI_DATABASE_NAMESPACE_WITH_TIMESTAMP,
    PPI_DATABASE_NAMESPACE: PPI_DATABASE_NAMESPACE,
};
