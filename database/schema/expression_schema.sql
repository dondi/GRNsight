CREATE SCHEMA gene_expression;

CREATE TABLE gene_expression.ref (
  pubmed_id VARCHAR,
  authors VARCHAR,
  publication_year VARCHAR,
  title VARCHAR,
  doi VARCHAR,
  ncbi_geo_id VARCHAR,
  PRIMARY KEY(ncbi_geo_id, pubmed_id)
);

CREATE TABLE gene_expression.gene (
  gene_id VARCHAR, -- systematic like name
  display_gene_id VARCHAR, -- standard like name
  species VARCHAR,
  taxon_id VARCHAR,
  PRIMARY KEY(gene_id, taxon_id)
); 

CREATE TABLE gene_expression.expression_metadata (
  ncbi_geo_id VARCHAR,
  pubmed_id VARCHAR,
  FOREIGN KEY (ncbi_geo_id, pubmed_id) REFERENCES gene_expression.ref(ncbi_geo_id, pubmed_id),
  control_yeast_strain VARCHAR,
  treatment_yeast_strain VARCHAR,
  control VARCHAR,
  treatment VARCHAR,
  concentration_value FLOAT,
  concentration_unit VARCHAR,
  time_value FLOAT,
  time_unit VARCHAR,
  number_of_replicates INT,
  expression_table VARCHAR,
  display_expression_table VARCHAR,
  PRIMARY KEY(ncbi_geo_id, pubmed_id, time_value)
);
CREATE TABLE gene_expression.expression (
  gene_id VARCHAR,
  taxon_id VARCHAR,
  FOREIGN KEY (gene_id, taxon_id) REFERENCES gene_expression.gene(gene_id, taxon_id),
  -- ncbi_geo_id VARCHAR,
  -- pubmed_id VARCHAR,
  sort_index INT,
  sample_id VARCHAR,
  expression FLOAT,
  time_point FLOAT,
  dataset VARCHAR, 
  PRIMARY KEY(gene_id, sample_id)
  -- FOREIGN KEY (ncbi_geo_id, pubmed_id, time_point) REFERENCES gene_expression.expression_metadata(ncbi_geo_id, pubmed_id, time_value)
); 
CREATE TABLE gene_expression.degradation_rate (
  gene_id VARCHAR,
  taxon_id VARCHAR,
  FOREIGN KEY (gene_id, taxon_id) REFERENCES gene_expression.gene(gene_id, taxon_id),
  ncbi_geo_id VARCHAR,
  pubmed_id VARCHAR,
  FOREIGN KEY (ncbi_geo_id, pubmed_id) REFERENCES gene_expression.ref(ncbi_geo_id, pubmed_id),
  PRIMARY KEY(gene_id, ncbi_geo_id, pubmed_id),
  degradation_rate FLOAT
);

CREATE TABLE gene_expression.production_rate (
  gene_id VARCHAR,
  taxon_id VARCHAR,
  FOREIGN KEY (gene_id, taxon_id) REFERENCES gene_expression.gene(gene_id, taxon_id),
  ncbi_geo_id VARCHAR,
  pubmed_id VARCHAR,
  FOREIGN KEY (ncbi_geo_id, pubmed_id) REFERENCES gene_expression.ref(ncbi_geo_id, pubmed_id),
  PRIMARY KEY(gene_id, ncbi_geo_id, pubmed_id),
  production_rate FLOAT
  -- FOREIGN KEY (gene_id, ncbi_geo_id, pubmed_id) REFERENCES gene_expression.degradation_rate(gene_id, ncbi_geo_id, pubmed_id) -- not sure if we want to link the generated production rate to it's original degradation rate
);