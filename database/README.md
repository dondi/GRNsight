# GRNsight Database

Here are the instructions how to set up the database for GRNsight.

## Setting up a local postgres GRNsight Database

### Installing PostgreSQL on your computer

- MacOS and Windows can follow these instructions on how to install postgreSQL.

- Install the software at this [link](https://www.postgresql.org/download/)
- > MacOS users: It is recommended to install with homebrew rather than the interactive installation in order to correctly view the `initdb --locale=C -E UTF-8 location-of-cluster` message in the documentation.
- > Windows users: when prompted for a password at the end of the installation process, save this password. It is the password for the postgres user
- Initialize the database
    - If your terminal emits a message that looks like `initdb --locale=C -E UTF-8 location-of-cluster` from Step 1B, then your installer has initialized a database for you.
    - Open the terminal and type the command `initdb --locale=C -E UTF-8 location-of-cluster`
    - "Cluster" is the PostgreSQL term for the file structure of a PostgreSQL database instance
    - You will have to modify location-of-cluster to the folder name you want to store the database (you don't need to create a folder, the command will create the folder for you, just create the name)
- Start and stop the server

    - Additionally, your installer may start the server for you upon installation (You can save this command for further reuse).
    - To start the server yourself run `pg_ctl start -D location-of-cluster` (You can save this command for further reuse).
    - To stop the server run `pg_ctl stop -D location-of-cluster`.
        - After installing with homebrew on MacOS, you may receive an error when you try to start the server that the server is unable to be started, and when attempting to stop the server, there terminal states there is no server running. In this case, you have to directly kill the port that the server is running on.
        - To double check that this is the issue, you can open the Activity Monitor app on your computer and search for the `postgres` activity. If there is one, that means the server is running, and we have to terminate the port that the server is running on.
        - First, we have to check what port the server is running on. Navigate to your homebrew installation, which is the same `location-of-cluster` from when the database was initialized and open that location in VSCode.
        - Search for `port =` in the file `postgresql.conf`. By default, the port should be port 5432, but keep note of this port in case it is different.
        - Refer to this Stack Overflow documentation on how to kill a server:
            - https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server
        - If that doesn't work, then refer to the different methods on this link from Stack Overflow:
            - https://stackoverflow.com/questions/42416527/postgres-app-port-in-use

- Linux users

    - The MacOS and Windows instructions will _probably_ not work for you. You can try at your own risk to check.
    - Linux users can try these [instructions](https://www.geeksforgeeks.org/install-postgresql-on-linux/) and that should work for you (...maybe...). If it doesn't try googling instructions with your specific operating system. Sorry!

### Loading data to your database

## 1. Set Up Database Schema

For detailed instructions on setting up the database schema, refer to the `README.md` file located in the `schema` folder.

## 2. Install Python Dependencies

GRNsight generates Network data (gene regulatory network and protein protein interactions) from SGD through AllianceMine. n order to run the script that generates these Network files, you must pip3 install the dependencies used. If you get an error saying that a module doesn't exist, just run `pip3 install <Module Name>` and it should fix the error. If the error persists and is found in a specific file on your machine, you might have to manually go into that file and alter the naming conventions of the dependencies that are used. _Note: So far this issue has only occured on Ubuntu 22.04.1, and certain MacOS versions so you might be lucky and not have to do it!_

```
pip3 install pandas requests intermine tzlocal psycopg2
```

### 3. Populate Data into Database

#### 1. Expression Database

##### Step 1: Create a directory (aka folder) in the `database/expression-database` folder called `source-files`

    ```
    mkdir <path to GRNsight/database/expression-database>/source-files
    ```

##### Step 2: Download Expression Data

Download the _"Expression 2020"_ folder from Box located in `GRNsight > GRNsight Expression > Expression 2020` to your newly created `source-files` folder. Your the path should look like this: GRNsight > database > expression-database > source-files > Expression 2020 > [the actual csv and xlsx files are here!]

##### Step 3: Run the Pre-Processing script

Run the pre-processing script on the data. This will create a folder full of the processed files in `database/expression-database/script-results`.

```
cd <path to GRNsight/database/expression-database/scripts>
python3 preprocessing.py
```

**Note:** If you receive a UnicodeEncodeError add `-X utf8` to the beginning of the command

##### Step 4: Load the Processed Data into the Database

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

For more details, refer to the `README.md` inside the `expression-database` folder.

#### 2. Network Database for GRN (Gene Regulatory Network) and PPI (Protein-Protein Interactions)

The code for generating and populating the network data (GRN and PPI) is located in the network-folder. The main script for fetching, processing, and loading the data into the database is `main.py`.

##### Step 1: Navigate to the network-folder

    ```
    <path to GRNsight/database/network-database>
    ```

##### Step 2: Run the main.py Script

Run the `main.py` script with the appropriate `--network` argument:

- `all`: Fetch and populate both GRN and PPI data.
- `grn`: Fetch and populate only GRN data.
- `ppi`: Fetch and populate only PPI data.

For example, to populate both GRN and PPI data into a local database, run:

```
python3 main.py --network all --db_url postgresql://localhost/postgres
```

**Note:** If you get the following error:
ImportError: urllib3 v2.0 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'OpenSSL 1.1.0h 27 Mar 2018'. See: Drop support for OpenSSL<1.1.1 urllib3/urllib3#2168
Run `pip install urllib3==1.26.6`

**Note:** If you get an error similar to the following image where it references the in then you are one of the unlucky few who has to edit the intermine.py file directly.

![image](https://user-images.githubusercontent.com/21343072/213089777-dfe772bc-deca-4df7-816f-72703db24d1e.png)

- Navigate the referenced file ( \<path specific to your machine>/intermine/webservice.py). If you have virtual environment set up, you can find the folder using this path:
    ```
    cd <path to virtual environment folder/lib/<python folder>/site-packages/intermine/webservice.py>
    ```
- The try-catch block should look like this:

    ```
    try:
        from urlparse import urlparse
        from UserDict import DictMixin
        from urllib import urlopen
        from urllib import urlencode
    except ImportError:
        from urllib.parse import urlparse
        from urllib.parse import urlencode
        from collections.abc import MutableMapping as DictMixin
        from urllib.request import urlopen
    ```

- Replace the try-catch block with this:
    ```
    try:
        from urlparse import urlparse
        from UserDict import DictMixin
        from urllib import urlopen
        from urllib import urlencode
    except ImportError:
        from urllib.parse import urlparse
        from urllib.parse import urlencode
        from collections.abc import MutableMapping as DictMixin
        from urllib.request import urlopen
    ```
- Rerun the command to run `main.py` file.

For more information, refer to the `README.md` in the `network-folder`.
