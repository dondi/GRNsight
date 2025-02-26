export const GRN_DATABASE_NAMESPACE = "gene_regulatory_network_new";
export const GRN_DATABASE_NAMESPACE_OLD = "gene_regulatory_network";
export const PPI_DATABASE_NAMESPACE = "protein_protein_interactions_new";
export const PPI_DATABASE_NAMESPACE_OLD = "protein_protein_interactions";
export const DATABASE_TIMESTAMP_CUTOFF = new Date("2025-01-01");

export const timestampNamespace = function(timestamp, namespace, oldNamespace) {
  return timestamp < new Date("2025-01-01") ? namespace : oldNamespace;
};

export const timestampOld = function(timestamp) {
    return timestamp < DATABASE_TIMESTAMP_CUTOFF;
}