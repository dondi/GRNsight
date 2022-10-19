# Expression Database 

All files pertaining the expression database live within this directory.

## The basics

#### Schema

All network data is stored within the fall2021 schema on our Postgres database.

The schema is located within this directory at the top level in the file `schema.sql`. It defines the tables located within the fall2021 schema. 

Usage:
To load to local database
```
psql postgresql://localhost/postgres -f schema.sql
```
To load to production database 
```
psql <address to database> -f schema.sql
```

### Scripts

All scripts live within the subdirectory `scripts`, located in the top-level of the network database directory. 

Any source files required to run the scripts live within the subdirectory `source-files`, located in the top-level of the network database directory. As source files may be large, you must create this directory yourself and add any source files you need to use there. 

All generated results of the scripts live in the subdirectory `script-results`, located in the top-level of the network database directory. Currently, all scripts that generate code create the directory if it does not currently exist. When adding a new script that generates resulting code, best practice is to create the script-results directory and any subdirectories if it does not exist, in order to prevent errors and snafus for recently cloned repositories.

Within the scripts directory, there are the following files:

- `preprocessing.py`
- `loader.py`

#### Data Preprocessor(s)
*Note: Data Preprocessing is always specific to each dataset that you obtain. `preprocessing.py` is capable of preprocessing the specific Expression data files located in `source-files/Expression 2020`. Because these files are too large to be stored on github, access the direct source files on BOX and move them into this directory. If more data sources are to be added in the database, create a new directory in source-files for it, note it in this `README.md` file and create a new preprocessing script for that data source (if required). Please document the changes in this section so that future developers may use your work to recreate the database if ever required.*

 * The script (`preprocessing.py`) is used to preprocess the data in `source-files/Expression 2020`. It parses through each file to construct the processed loader files, so that they are ready to load using `loader.py`. Please read through the code, as there are instructions on what to add within the comments. Good luck!
    * The resulting processed loader files are located in `script-results/processed-expression` and the resulting processed loader files are located within `script-results/processed-loader-files`

    Usage: 
    ```
    python3 preprocessing.py
    ```
#### Database Loader

This script (`loader.py`) is to be used to load your preprocessed expression data into the database. 

This program generates direct SQL statements from the source files generated by the data preprocessor in order to populate a relational database with those files’ data

Usage: 
To load to local database
```
python3 loader.py | psql postgresql://localhost/postgres
```
To load to production database
```
python3 loader.py | psql <path to database>
```