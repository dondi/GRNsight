CREATE SCHEMA gene_regulatory_network_new;

CREATE TABLE gene_regulatory_network_new.source (
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  display_name VARCHAR,
  PRIMARY KEY(time_stamp, source)
);

CREATE TABLE gene_regulatory_network_new.gene (
  gene_id VARCHAR, -- systematic like name
  display_gene_id VARCHAR, -- standard like name
  species VARCHAR,
  taxon_id VARCHAR,
  regulator BOOLEAN,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  PRIMARY KEY(gene_id, taxon_id),
  FOREIGN KEY (time_stamp, source) REFERENCES gene_regulatory_network_new.source(time_stamp, source)
);

CREATE TABLE gene_regulatory_network_new.network (
  regulator_gene_id VARCHAR,
  target_gene_id VARCHAR,
  taxon_id VARCHAR,
  annotation_type VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  FOREIGN KEY (regulator_gene_id, taxon_id) REFERENCES gene_regulatory_network_new.gene(gene_id, taxon_id),
  FOREIGN KEY (target_gene_id, taxon_id) REFERENCES gene_regulatory_network_new.gene(gene_id, taxon_id),
  FOREIGN KEY (time_stamp, source) REFERENCES gene_regulatory_network_new.source(time_stamp, source),
  CONSTRAINT unique_network UNIQUE (regulator_gene_id, target_gene_id, taxon_id, time_stamp, source, annotation_type)
); 