# Network Database

All files pertaining the network database live within this directory.

## The basics

### Schema

All network data is stored within the gene_regulatory_network schema on our Postgres database.

The schema is located within this directory at the top level in the file `schema.sql`. It defines the tables located within the gene_regulatory_network schema. 

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

- `generate_network.py`
- `loader.py`
- `generate_new_network_verion.py`
- `loader_updates.py`
- `filter_genes.py`
- `generate_sgd_network_from_yeastract_network.py`


#### Network Generator (and data preprocessor) (FOR FRESH DATABASE INSTALLS ONLY)

This script (`generate_network.py`) is a two-for-one. It first uses the yeastmine service from the SGD database to query for all regulator genes relating to Saccharomyces cerevisiae. From there it gets all all of the targets for each regulator gene. We then construct two networks from these connections (a regulator by regulator matrix as well as a regulator by target matrix). We also construct the processed loader files, so that they are ready to load using `loader.py`.

The resulting network matrices are located in `script-results/networks` and the resulting processed loader files are located within `script-results/processed-loader-files`

Make sure to have all dependencies installed beforehand or you will recieve errors. (pip3 install intermine, tzlocal, etc. [see file for all imports]

Usage: 
```
python3 generate_network.py
```
#### Database Loader (FOR FRESH DATABASE INSTALLS ONLY)

This script (`loader.py`) is to be used to load your preprocessed genes into the database. 

This program generates direct SQL statements from the source files generated by the network generator in order to populate a relational database with those files’ data

Usage: 
To load to local database
```
python3 loader.py | psql postgresql://localhost/postgres
```
To load to production database
```
python3 loader.py | psql <address to database>
```
#### Network Generator (and data preprocessor) (FOR UPDATES TO EXISTING DATABASE ONLY)

This script (`generate_new_network_verion.py`) is similar to its counterpart `generate_network.py`. It gets all existing genes in the database using the environment variable 'DB_URL'. You can set this environment variable on the terminal right before the command.  It uses the yeastmine service from the SGD database to query for all regulator genes relating to Saccharomyces cerevisiae. From there it gets all all of the targets for each regulator gene. We then construct two networks from these connections (a regulator by regulator matrix as well as a regulator by target matrix). We then see if the genes in the newly constructed network have any updates (i.e a gene's standard name was set or a new gene was added to the database). We also construct the processed loader files, so that they are ready to load using `loader_updates.py`.

The resulting network matrices are located in `script-results/networks` and the resulting processed loader files are located within `script-results/processed-loader-files`

Make sure to have all dependencies installed beforehand or you will recieve errors. (pip3 install intermine, tzlocal, etc. [see file for all imports]

Usage: 
```
DB_URL="postgresql://[<db_user>:<password>]@<address to database>/<database name>" python3 generate_new_network_version.py
```
#### Database Loader (FOR UPDATES TO EXISTING DATABASE ONLY)

This script (`loader_updates.py`) is to be used to load your preprocessed genes into the database. 

This program generates direct SQL statements from the source files generated by the network generator in order to populate a relational database with those files’ data as well as make any needed updates to existing genes within the database. If necessary you will be prompted to enter a password.

Usage: 
To load to local database
```
python3 loader_updates.py | psql postgresql://localhost/postgres
```
To load to production database
```
python3 loader_updates.py | psql -h <grnsight database link> -U <user> <database name>

```


#### Filter Genes (beta functionality, not tested)

This script (`filter_genes.py`) is to be used when updating a pre-existing database. It requires you to generate a new network from yeastmine using the script.`generate_network.py`. Once you generate the network, the script will access the database get all of the genes stored within. From there it will generate a csv file of all genes in the new network that are missing from your database, and all genes that have updated their display name (standard like name). You should change the database host to your localhost if you are running your own instance of postgresql and not the production database. Once finished, you can load the updated genes list using `loader.py`. *Note:* You will have to change the `GENE_SOURCE` to be the output file of the missing genes. 

**Never save the password to your database in filter_genes.py! If you want, you can set up an environment variable where you store sensitive information, but for convience you will have to enter the password yourself.**

Usage: 
```
python3 filter_genes.py
```


#### Generate an SGD network from a Yeastract network

This script takes a network (assumed to have data from Yeastract, but it can be any given network) and gives you a network with data queried from Yeastmine (SGD). It takes the regulators and targets from a given network file, then queries Yeastmine in order to get the regulatory connections between the genes. From there, it creates a new network using the data obtained from Yeastmine. 

To use, create a folder called `source-files` within the `network-database` folder. Add your network(s) to the newly created directory. Then go into the script and change the `YEASTRACT_NETWORK` to be the path of the network you would like to convert. Run the script and your SGD network (using the same genes) will be output in the `/script-results/yeastract-to-sgd-networks` directory. Change the name of the output files by editing the `SGD_MATRIX_EXCEL` and `SGD_MATRIX` variables

Usage: 
```
python3 generate_sgd_network_from_yeastract_network.py
```
