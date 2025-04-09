CREATE SCHEMA gene_regulatory_network;

CREATE TABLE gene_regulatory_network.source (
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  display_name VARCHAR,
  PRIMARY KEY(time_stamp, source)
);

CREATE TABLE gene_regulatory_network.gene (
  gene_id VARCHAR, -- systematic like name
  display_gene_id VARCHAR, -- standard like name
  species VARCHAR,
  taxon_id VARCHAR,
  regulator BOOLEAN,
  PRIMARY KEY(gene_id, taxon_id)
); 
CREATE TABLE gene_regulatory_network.network (
  regulator_gene_id VARCHAR,
  target_gene_id VARCHAR,
  taxon_id VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  FOREIGN KEY (regulator_gene_id, taxon_id) REFERENCES gene_regulatory_network.gene(gene_id, taxon_id),
  FOREIGN KEY (target_gene_id, taxon_id) REFERENCES gene_regulatory_network.gene(gene_id, taxon_id),
  FOREIGN KEY (time_stamp, source) REFERENCES gene_regulatory_network.source(time_stamp, source)
); 