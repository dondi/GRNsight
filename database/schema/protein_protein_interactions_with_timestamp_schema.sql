CREATE SCHEMA protein_protein_interactions_with_timestamp;

CREATE TABLE protein_protein_interactions_with_timestamp.source (
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  display_name VARCHAR,
  PRIMARY KEY(time_stamp, source)
);

CREATE TABLE protein_protein_interactions_with_timestamp.gene (
  gene_id VARCHAR NOT NULL, -- systematic name
  display_gene_id VARCHAR, -- standard name
  species VARCHAR,
  taxon_id VARCHAR NOT NULL,
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  PRIMARY KEY(gene_id, taxon_id, time_stamp),
  FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.source(time_stamp, source)
);

CREATE TABLE protein_protein_interactions_with_timestamp.protein (
  standard_name VARCHAR NOT NULL,
  gene_systematic_name VARCHAR NOT NULL,
  length FLOAT,
  molecular_weight FLOAT,
  PI FLOAT,
  taxon_id VARCHAR NOT NULL,
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  PRIMARY KEY(standard_name, time_stamp),
  FOREIGN KEY (gene_systematic_name, taxon_id, time_stamp) REFERENCES protein_protein_interactions_with_timestamp.gene(gene_id, taxon_id, time_stamp),
  FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.source(time_stamp, source)
);

CREATE TABLE protein_protein_interactions_with_timestamp.physical_interactions (
  protein1 VARCHAR NOT NULL,
  protein2 VARCHAR NOT NULL,
  interaction_detection_methods_identifier VARCHAR,
  annotation_type VARCHAR NOT NULL,
  experiment_name VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR NOT NULL,
  FOREIGN KEY (protein1, time_stamp) REFERENCES protein_protein_interactions_with_timestamp.protein(standard_name, time_stamp),
  FOREIGN KEY (protein2, time_stamp) REFERENCES protein_protein_interactions_with_timestamp.protein(standard_name, time_stamp),
  FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.source(time_stamp, source),
  CONSTRAINT unique_physical_interaction UNIQUE (protein1, protein2, annotation_type, interaction_detection_methods_identifier, experiment_name, time_stamp, source)
);