# GRNsight Database

Here are the instructions for how to set up the expression and network databases for GRNsight.

## Setting up a local PostgreSQL GRNsight Database

### Installing PostgreSQL on your computer

Before you begin, follow [these instructions on the GRNsight wiki for installing PostgreSQL on your computer](https://github.com/dondi/GRNsight/wiki/Installing-PostgreSQL-on-your-computer).

### Loading data to your database

#### 1. Set Up Database Schema

For detailed instructions on setting up the database schema, refer to the `README.md` file located in the `schema` folder [here](https://github.com/dondi/GRNsight/blob/main/database/schema/README.md).

#### 2. Install Python Dependencies

GRNsight generates Network data (gene regulatory network and protein protein interactions) from SGD through AllianceMine. In order to run the script that generates these Network files, you must pip3 install the dependencies used. If you get an error saying that a module doesn't exist, just run `pip3 install <Module Name>` and it should fix the error. If the error persists and is found in a specific file on your machine, you might have to manually go into that file and alter the naming conventions of the dependencies that are used. _Note: So far this issue has only occured on Ubuntu 22.04.1, and certain MacOS versions so you might be lucky and not have to do it!_

```
pip3 install pandas requests intermine tzlocal psycopg2
```

#### 3. Populate Data into Database

#### 1. Expression Database

**Step 1: Create a directory (aka folder) in the `database/expression-database` folder called `source-files`**

```
mkdir <path to GRNsight/database/expression-database>/source-files
```

**Step 2: Download Expression Data**

Download the _"Current Database"_ folder from Box located in [`GRNsight > Expression Database > Current Database`](https://lmu.box.com/s/n3vebjp6fcrjlinsq5qmmuer9qi4sfke) to your newly created `source-files` folder. Your the path should look like this: GRNsight > database > expression-database > source-files > Current Database > [the actual csv files are here!]

**Step 3: Run the Pre-Processing script**

Run the pre-processing script on the data. This will create a folder full of the processed files in `database/expression-database/script-results`.

```
cd <path to GRNsight/database/expression-database/scripts>
python3 preprocessing.py
```

**Note:** If you receive a UnicodeEncodeError add `-X utf8` to the beginning of the command

**Step 4: Load the Processed Data into the Database**

Use the `loader.py` script located in `expression-database/scripts` to load the processed expression data into the database. This script generates SQL statements to populate your relational database with the processed data.

- To move to `expression-database/scripts`

    ```
    cd <path to GRNsight/database/expression-database/scripts>
    ```

- To load to local database

    ```
    python3 loader.py | psql postgresql://localhost/postgres
    ```

- To load to production database
    ```
    python3 loader.py | psql <path to database>
    ```

For more details on what these scripts are doing and how to update or add new datasets to the expression database, refer to the [`README.md`](https://github.com/dondi/GRNsight/blob/main/database/expression-database/README.md) inside the `expression-database` folder.

#### 2. Network Database for GRN (Gene Regulatory Network) and PPI (Protein-Protein Interactions)

The code for generating and populating the network data (GRN and PPI) is located in the `network-database` folder. The main script for fetching, processing, and loading the data into the database is `main.py`. This script will allow you to load data for the released versions of the Network Database (instructions below) or create a Network Database with data newly fetched from AllianceMine ([see  instructions here](https://github.com/dondi/GRNsight/blob/main/database/network-database/README.md)).

**Step 1: Navigate to the network-database folder**

```
cd <path to GRNsight/database/network-database>
```

**Step 2: Download Network Data**

Download the _"network-database-source-files"_ folder from Box located in [`GRNsight > GRNsight Backups > Network Database`]([https://lmu.box.com/s/n3vebjp6fcrjlinsq5qmmuer9qi4sfke](https://lmu.box.com/s/8e0yhjzcz00bzn89h4l7scxd1eqz2rgi)) to the `network-database` folder. Your the path should look like this: GRNsight > database > network-database > network-database-source-files.  There are four subdirectories in the network-database-source-files folder, `gene_regulatory_network`, `gene_regulatory_network_with_timestamp`, `protein_protein_interactions`, and `protein_protein_interactions_with_timestamp`. The necessary TSV files are within these subdirectories.

**Step 3: Run the main.py Script**

Run the `main.py` script with the appropriate `--network` argument:

- `all`: GRN and PPI data.
- `grn`: GRN data only.
- `ppi`: PPI data only.

and the `--action` argument, `populate`, which reads existing TSV files and populates the PostgreSQL database.

The `populate` action uses `--input_dir` to determine which data files are read. In this case, our input directory is `network-database-source-files`.

For example, to populate both GRN and PPI data into a local database, run:

```
python3 main.py --network all --action populate --db_url postgresql://localhost/postgres --input_dir network-database-source-files
```

For more information about the options for `main.py`, including how to newly fetch data from AllianceMine and troubleshooting, refer to the [`README.md`](https://github.com/dondi/GRNsight/blob/main/database/network-database/README.md) in the `network-database` folder.
