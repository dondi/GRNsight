# Network Database (Schema)

All files pertaining the network database live within this directory.

## The basics

### Schema

All network data is stored within the spring2022_network schema on our Postgres database.

The schema is located within this directory at the top level in the file `schema.sql`. It defines the tables located within the spring2022_network schema. 

### Scripts

All scripts live within the subdirectory `scripts`, located in the top-level of the network database directory. 

Any source files required to run the scripts live within the subdirectory `source-files`, located in the top-level of the network database directory. As source files may be large, you must create this directory yourself and add any source files you need to use there. 

All generated results of the scripts live in the subdirectory `script-results`, located in the top-level of the network database directory. Currently, all scripts that generate code create the directory if it does not currently exist. When adding a new script that generates resulting code, best practice is to create the script-results directory and any subdirectories if it does not exist, in order to prevent errors and snafus for recently cloned repositories.

Within the scripts directory, there are the following files:

- `generate_network.py`
- `generate_sgd_network_from_yeastract_network.py`
- `loader.py`

#### Network Generator (and data preprocessor)

This script (`generate_network.py`) is a two-for-one. It first uses the yeastmine service from the SGD database to query for all regulator genes relating to Saccharomyces cerevisiae. From there it gets all all of the targets for each regulator gene. We then construct two networks from these connections (a regulator by regulator matrix as well as a regulator by target matrix). We also construct the processed loader files, so that they are ready to load using `loader.py`.

The resulting network matrices are located in `script-results/networks` and the resulting processed loader files are located within `script-results/processed-loader-files`

Make sure to have all dependencies installed beforehand or you will recieve errors. (pip3 install intermine, tzlocal, etc. [see file for all imports])

Usage: 
```
python3 generate_network.py
```
#### Generate an SGD network from a Yeastract network

This script takes a network (assumed to have data from Yeastract, but it can be any given network) and gives you a network with data queried from Yeastmine (SGD). It takes the regulators and targets from a given network file, then queries Yeastmine in order to get the regulatory connections between the genes. From there, it creates a new network using the data obtained from Yeastmine. 


