# GRNsettings Database

The schema of this database lives within this directory.

## The basics

### Schema

The default database name is stored within the settings schema on our Postgres database.

The schema is located within this directory at the top level of this file `schema.sql`. It creates the schema as well as defining the table located within the settings schema.

1. Move to file that contains `schema.sql` file, which is under `database/grnsettings-database` folder

2. Load database

    Example of loading to local database

    For Windows:

    ```
    psql -U postgres -f schema.sql postgresql://localhost/postgres
    ```

    For Mac:

    ```
    psql -f schema.sql postgresql://localhost/postgres
    ```

### Changing the default database name

1. In order to change the default database name you would first need to login to the database using the following command:

    For Windows:

    ```
    psql -U postgres <address to database>
    ```

    For Mac:

    ```
    psql <address to database>
    ```

2. Then you will need to set your search path to the settings schema using the following command :
    ```
    SET SEARCH_PATH TO settings;
    ```
3. After that you will simply delete the current default database name using this command
    ```
    DELETE FROM grnsettings;
    ```
4. And then insert the new database name using the following command
    ```
    INSERT INTO grnsettings(expression_dataset) VALUES ('the new default database name');
    ```
    _The current default database is 'dahlquist_2018'_
