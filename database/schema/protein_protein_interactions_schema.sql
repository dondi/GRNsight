CREATE SCHEMA protein_protein_interactions_with_timestamp;

CREATE TABLE protein_protein_interactions_with_timestamp.source (
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  display_name VARCHAR,
  PRIMARY KEY(time_stamp, source)
);

CREATE TABLE protein_protein_interactions_with_timestamp.gene (
  gene_id VARCHAR, -- systematic like name
  display_gene_id VARCHAR, -- standard like name
  species VARCHAR,
  taxon_id VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  PRIMARY KEY(gene_id, taxon_id, time_stamp, source),
  FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.source(time_stamp, source)
); 

CREATE TABLE protein_protein_interactions_with_timestamp.protein (
  standard_name VARCHAR,
  gene_systematic_name VARCHAR,
  length FLOAT,
  molecular_weight FLOAT,
  PI FLOAT,
  taxon_id VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  PRIMARY KEY(standard_name, time_stamp, source),
  FOREIGN KEY (gene_systematic_name, taxon_id, time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.gene(gene_id, taxon_id, time_stamp, source)
);

  CREATE TABLE protein_protein_interactions_with_timestamp.physical_interactions (
    protein1 VARCHAR,
    protein2 VARCHAR,
    interaction_detection_methods_identifier VARCHAR,
    annotation_type VARCHAR,
    experiment_name VARCHAR,
    time_stamp TIMESTAMP WITH TIME ZONE,
    source VARCHAR,
    FOREIGN KEY (protein1, time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.protein(standard_name, time_stamp, source),
    FOREIGN KEY (protein2, time_stamp, source) REFERENCES protein_protein_interactions_with_timestamp.protein(standard_name, time_stamp, source),
    CONSTRAINT unique_physical_interaction UNIQUE (protein1, protein2, interaction_detection_methods_identifier, annotation_type, experiment_name, time_stamp, source)
  );
