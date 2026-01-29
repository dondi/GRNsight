# Schema Setup for GRNsight

This directory contains all the necessary schemas for the databases required by GRNsight.

## Verify Your Connection to the Server

For Mac:

```
psql <address to database>
```

For Windows:

```
psql -U postgres <address to database>
```

When prompted for the password, use the password you specified earlier during the installation process. For all future commands requiring you to access postgres, you will need to add `-U postgres`

For example, to access your local PostgreSQL database, use the following command:

```
psql postgresql://localhost/postgres
```

## Creating Schemas and Adding Table Specifications

GRNsight requires six schemas, one for each of the following namespaces:

1. `grnsettings`
2. `gene_expression`
3. `gene_regulatory_network_with_timestamp`
4. `protein_protein_interactions_with_timestamp`
5. `gene_regulatory_network` (this is the old schema for gene regulatory network before 2025 - this namepsace can be empty because we no longer load data into this namespace)
6. `protein_protein_interactions` (this is the old schema for protein protein interactions before 2025 - this namepsace can be empty because we no longer load data into this namespace)

The scripts already contain the command to create the schema for you. Each schema requires a set of table definitions. You can add these by running the following commands, each corresponding to an SQL file that defines the structure for each schema:

```
cd <path to `schema` folder>
```

```
psql -f expression_schema.sql postgresql://localhost/postgres
```

```
psql -f gene_regulatory_network_schema.sql postgresql://localhost/postgres
```

```
psql -f gene_regulatory_network_with_timestamp_schema.sql postgresql://localhost/postgres
```

```
psql -f protein_protein_interactions_schema.sql postgresql://localhost/postgres
```

```
psql -f protein_protein_interactions_with_timestamp_schema.sql postgresql://localhost/postgres
```

```
psql -f grnsettings_schema.sql postgresql://localhost/postgres
```

Once these steps are completed, your database will be set up and ready to accept expression and network data.

## Populating Data into the Database

### 1. Settings Database

The `settings` table stores the default database name.

To change the default database name, follow these steps:

1. **Log in to the Database**

    For instructions on how to load the database, refer to the [Load Database](#load-database) section.

2. **Set the Search Path**

    Set your search path to the `settings` schema with the following command:

    ```
    SET SEARCH_PATH TO settings;
    ```

3. **Delete the Current Default Database Name**

    Delete the existing database name with this command:

    ```
    DELETE FROM grnsettings;
    ```

4. **Insert the New Default Database Name**  
   Insert the new default database name with the following command:
    ```
    INSERT INTO grnsettings(expression_dataset) VALUES ('<new default database name>');
    ```
    _Note: The current default database is `dahlquist_2018`. Don't forget ''!_

### 2. Other databases

For other databases, continue follow the instructions in the [README.md](https://github.com/dondi/GRNsight/tree/master/database) outside of this directory.
