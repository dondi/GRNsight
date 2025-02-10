CREATE SCHEMA protein_protein_interactions_new;

CREATE TABLE protein_protein_interactions_new.source (
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  display_name VARCHAR,
  PRIMARY KEY(time_stamp, source)
);

CREATE TABLE protein_protein_interactions_new.gene (
  gene_id VARCHAR, -- systematic like name
  display_gene_id VARCHAR, -- standard like name
  species VARCHAR,
  taxon_id VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  PRIMARY KEY(gene_id, taxon_id),
  FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_new.source(time_stamp, source)
); 

CREATE TABLE protein_protein_interactions_new.protein (
  standard_name VARCHAR PRIMARY KEY,
  gene_systematic_name VARCHAR,
  length FLOAT,
  molecular_weight FLOAT,
  PI FLOAT,
  taxon_id VARCHAR,
  time_stamp TIMESTAMP WITH TIME ZONE,
  source VARCHAR,
  FOREIGN KEY (gene_systematic_name, taxon_id) REFERENCES protein_protein_interactions_new.gene(gene_id, taxon_id),
  FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_new.source(time_stamp, source)
);

  CREATE TABLE protein_protein_interactions_new.physical_interactions (
    protein1 VARCHAR,
    protein2 VARCHAR,
    gene_systematic_name1 VARCHAR,
    gene_systematic_name2 VARCHAR,
    interaction_detection_methods_identifier VARCHAR,
    annotation_type VARCHAR,
    experiment_name VARCHAR,
    time_stamp TIMESTAMP WITH TIME ZONE,
    source VARCHAR,
    FOREIGN KEY (protein1) REFERENCES protein_protein_interactions_new.protein(standard_name),
    FOREIGN KEY (protein2) REFERENCES protein_protein_interactions_new.protein(standard_name),
    FOREIGN KEY (time_stamp, source) REFERENCES protein_protein_interactions_new.source(time_stamp, source),
    CONSTRAINT unique_physical_interaction UNIQUE (protein1, protein2, interaction_detection_methods_identifier, annotation_type, experiment_name, time_stamp, source)
  );
