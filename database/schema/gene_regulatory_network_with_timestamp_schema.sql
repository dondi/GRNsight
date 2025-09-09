CREATE SCHEMA gene_regulatory_network_with_timestamp;

CREATE TABLE gene_regulatory_network_with_timestamp.source (
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  display_name VARCHAR,
  PRIMARY KEY(time_stamp, source)
);

CREATE TABLE gene_regulatory_network_with_timestamp.gene (
  gene_id VARCHAR NOT NULL,
  display_gene_id VARCHAR,
  species VARCHAR,
  taxon_id VARCHAR NOT NULL,
  regulator BOOLEAN,
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  PRIMARY KEY(gene_id, taxon_id, time_stamp),
  FOREIGN KEY (time_stamp, source) REFERENCES gene_regulatory_network_with_timestamp.source(time_stamp, source)
);

CREATE TABLE gene_regulatory_network_with_timestamp.network (
  regulator_gene_id VARCHAR NOT NULL,
  target_gene_id VARCHAR NOT NULL,
  taxon_id VARCHAR NOT NULL,
  annotation_type VARCHAR NOT NULL,
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  FOREIGN KEY (regulator_gene_id, taxon_id, time_stamp) REFERENCES gene_regulatory_network_with_timestamp.gene(gene_id, taxon_id, time_stamp),
  FOREIGN KEY (target_gene_id, taxon_id, time_stamp) REFERENCES gene_regulatory_network_with_timestamp.gene(gene_id, taxon_id, time_stamp),
  FOREIGN KEY (time_stamp, source) REFERENCES gene_regulatory_network_with_timestamp.source(time_stamp, source),
  CONSTRAINT unique_network UNIQUE (regulator_gene_id, target_gene_id, taxon_id, time_stamp, source, annotation_type)
);