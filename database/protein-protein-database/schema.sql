CREATE TABLE protein_protein_interactions.gene (
  gene_id VARCHAR, -- systematic like name
  display_gene_id VARCHAR, -- standard like name
  species VARCHAR,
  taxon_id VARCHAR,
  PRIMARY KEY(gene_id, taxon_id)
); 

CREATE TABLE protein_protein_interactions.protein (
  standard_name VARCHAR PRIMARY KEY,
  gene_systematic_name VARCHAR,
  length FLOAT,
  molecular_weight FLOAT,
  PI FLOAT,
  taxon_id VARCHAR,
  FOREIGN KEY (gene_systematic_name, taxon_id) REFERENCES protein_protein_interactions.gene(gene_id, taxon_id)
);

CREATE TABLE protein_protein_interactions.physical_interactions (
  protein1 VARCHAR,
  protein2 VARCHAR,
  interaction_detection_methods_identifier VARCHAR,
  experiment_name VARCHAR,
  FOREIGN KEY (protein1) REFERENCES protein_protein_interactions.protein(standard_name),
  FOREIGN KEY (protein2) REFERENCES protein_protein_interactions.protein(standard_name),
  CONSTRAINT unique_physical_interaction UNIQUE (protein1, protein2, interaction_detection_methods_identifier, experiment_name)
);
