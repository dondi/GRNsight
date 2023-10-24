# GRNsettings Database
The schema of this database lives within this directory.

## The basics 

### Schema
The default database name is stored within the settings schema on our Postgres database.

The schema is located within this directory at the top level of this file `schema.sql`. It creates the schema as well as defining the table located within the settings schema.

Usage: To load to local database
```
psql postgresql://localhost/postgres -f schema.sql
```
To load to production database
```
psql <address to database> -U postgres -f schema.sql
```

### Changing the default database name

In order to change the default database name you would first need to login to the database using the following command
```
psql <address to database> -U postgres
```
Then you will need to set your search path to the settings schema using the following command 
```
SET SEARCH_PATH TO settings;
```
After that you will simply delete the current default database name using this command 
```
DELETE FROM grnsettings;
```
And then insert the new database name using the following command 
```
INSERT INTO grnsettings VALUES <'the new default database name'>;
```
