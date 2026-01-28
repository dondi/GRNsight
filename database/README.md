# GRNsight Database

Here are the instructions how to set up the database for GRNsight.

## Setting up a local postgres GRNsight Database

### Installing PostgreSQL on your computer

#### macOS Users (Recommended: Homebrew)

1. **Install PostgreSQL**

- Make sure Homebrew is installed. If not, install it from https://brew.sh
- Install PostgreSQL via Homebrew

    ```
    brew install postgresql@<version>
    ```

- Replace <version> with the PostgreSQL version you installed (e.g., 17)

- Add PostgreSQL to your PATH (so `psql` and `postgres` commands are available):

    ```
    echo 'export PATH="/opt/homebrew/opt/postgresql@<version>/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc
    ```

2. **Initialize the Database Cluster**

- If your terminal emits a message that looks like `initdb --locale=C -E UTF-8 location-of-cluster`, then your installer has initialized a database for you. `location-of-cluster` here is the folder where PostgreSQL stores all database data
- Homebrew automatically creates a default cluster (your `location-of-cluster`):

    ```
    /opt/homebrew/var/postgresql@<version>
    ```

    <img width="436" height="55" alt="image" src="https://github.com/user-attachments/assets/224dc931-1a0c-4858-a242-013ba197fbd8" />

3. **Start and Stop the Server**

- Start PostgreSQL as a background service (You can save this command for later use):

    ```
    brew services start postgresql@<version>
    ```

- Stop PostgreSQL (You can save this command for later use):

    ```
    brew services stop postgresql@<version>
    ```

- Or, to run manually in a terminal without a background service:

    ```
    LC_ALL="en_US.UTF-8" /opt/homebrew/opt/postgresql@<version>/bin/postgres -D /opt/homebrew/var/postgresql@<version>
    ```

4. **Verify Installation**

    ```
    psql --version      # should show psql (PostgreSQL) <version>
    psql postgres       # connect to default database
    SELECT version();   # confirm server version is <version>
    ```

    If you start the PostgreSQL with Homebrew, the first line you can see is psql (<version> (Homebrew))
   
    <img width="310" height="49" alt="image-1" src="https://github.com/user-attachments/assets/cfa7386e-46db-4bde-9a4e-3c16af1fbcb6" />


6. **Troubleshooting**

    **PostgreSQL fails to start after Homebrew installation (macOS)**

    After installing PostgreSQL with Homebrew on macOS, you may encounter a situation where:

    - Starting the server fails with an error
    - Stopping the server reports that no server is running
    
    This usually means PostgreSQL is already running in the background and the port is in use.

    **Fix**:
    1. Check if PostgreSQL is already running

        Open Activity Monitor and search for `postgres`.

    - If you see active `postgres` processes, the server is already running and occupying a port.

    2. Identify the port PostgreSQL is using

        1. Navigate to your Homebrew PostgreSQL data directory (this is the same `location-of-cluster` created during **Initialize the Database Cluster**).
        2. Open the file `postgresql.conf`.
        3. Search for the line:

            ```
            port =
            ```

        - The default port is `5432`, but note the actual value in case it is different.

    3. Check which process is using the port

        Replace <port> with the port number you found (for example, 5432):

        ```
        sudo lsof -nP -iTCP:<port> -sTCP:LISTEN
        ```

        If PostgreSQL is running, this command will return the **PID** of the process using the port.

    4. Terminate the conflicting process (if needed)
    
        If the port is being held by an unwanted or stale PostgreSQL process, terminate it using:

        ```
        sudo kill -TERM <PID>
        ```

        After killing the process, try starting again.

#### Windows Users

1. **Install**

- Download PostgreSQL from https://www.postgresql.org/download/windows/
- Follow the installer instructions and **save the password** when prompted — this is the password for the default `postgres` user.

2. **Initialize the Database**

- The installer will typically initialize a default cluster automatically.
- If not, open a terminal (Command Prompt or PowerShell) and run:

    ```
    initdb --locale=C -E UTF-8 "C:\path\to\cluster"
    ```

- Replace `"C:\path\to\cluster"` with your desired folder for the database (you don't need to create a folder, the command will create the folder for you, just create the name).

3. **Start and Stop the Server**

- Start PostgreSQL via terminal:

    ```
    pg_ctl start -D "C:\path\to\cluster"
    ```

- Stop PostgreSQL via terminal:

    ```
    pg_ctl stop -D "C:\path\to\cluster"
    ```

4. Verify Installation

- Open terminal and run

    ```
    psql -U postgres
    SELECT version();
    ```

#### Linux Users

- The MacOS and Windows instructions will _probably_ not work for you. You can try at your own risk to check.
- Linux users can try these [instructions](https://www.geeksforgeeks.org/install-postgresql-on-linux/) and that should work for you (...maybe...). If it doesn't try googling instructions with your specific operating system. Sorry!



#### Ensure that you can invoke Postgres commands on the command line

Depending on the installer, this may have already been done for you:

For Windows Users: search "Edit the system environment variables" from the Windows taskbar. From there open environment variables and edit the Path variable. 
Within this variable use new to add `C:\Program Files\PostgresSQL\{postgres_version}\bin` and `C:\Program Files\PostgresSQL\{postgres_version}\lib`


### Loading data to your database

#### 1. Set Up Database Schema

For detailed instructions on setting up the database schema, refer to the `README.md` file located in the `schema` folder.

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

Download the _"Current Database"_ folder from Box located in `GRNsight > GRNsight Expression > Current Database` to your newly created `source-files` folder. Your the path should look like this: GRNsight > database > expression-database > source-files > Current Database > [the actual csv files are here!]

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

For more details, refer to the `README.md` inside the `expression-database` folder.

#### 2. Network Database for GRN (Gene Regulatory Network) and PPI (Protein-Protein Interactions)

The code for generating and populating the network data (GRN and PPI) is located in the network-folder. The main script for fetching, processing, and loading the data into the database is `main.py`.

**Step 1: Navigate to the network-folder**

    ```
    <path to GRNsight/database/network-database>
    ```

**Step 2: Run the main.py Script**

Run the `main.py` script with the appropriate `--network` argument:

- `all`: Fetch and populate both GRN and PPI data.
- `grn`: Fetch and populate only GRN data.
- `ppi`: Fetch and populate only PPI data.

For example, to populate both GRN and PPI data into a local database, run:

```
python3 main.py --network all --db_url postgresql://localhost/postgres
```

**TroubleShooting**

1. `urllib3` OpenSSL Compatibility Error

    If you get the following error:

    ```
    ImportError: urllib3 v2.0 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'OpenSSL 1.1.0h 27 Mar 2018'
    ```

    **Cause**: Your Python environment is using an older OpenSSL version that is incompatible with `urlib3` v2.0.

    **Fix**: Downgrade urllib3 to a compatible version:
    ```
    pip install urllib3==1.26.6
    ```

2. `intermine.py` Import Error (Manual Fix Required)

    If you encounter an error similar to the image below when running `main.py`, you may need to manually edit the intermine library.
    ![image](https://user-images.githubusercontent.com/21343072/213089777-dfe772bc-deca-4df7-816f-72703db24d1e.png)
    
    This typically happens due to changes in Python’s standard library imports.

    **Fix**:

    1. Navigate to the `intermine/webservice.py` file.

        If you are using a virtual environment, it is usually located at:
        
        ```
        <path-to-venv>/lib/<python-version>/site-packages/intermine/webservice.py
        ```

    2. Locate the existing `try-except` import block. It should look like this:

        ```
        try:
            from urlparse import urlparse
            from UserDict import DictMixin
            from urllib import urlopen
            from urllib import urlencode
        except ImportError:
            from urllib.parse import urlparse
            from urllib.parse import urlencode
            from collections import MutableMapping as DictMixin
            from urllib.request import urlopen
        ```

    3. Replace it with the updated version below:

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

    4. Save the file and rerun the command that executes `main.py`.

3. Python 3.13 SSL Certificate Error (macOS)

    When running the database setup command:
    ```
    python3 main.py --network all --db_url postgresql://localhost/postgres
    ```
    you may encounter SSL or certificate-related errors on **macOS** with **Python 3.13**. This happens because SSL certificates are not always installed by default.

    **Fix**
    1. Run the certificate installation script:
        ```
        /Applications/Python\ 3.13/Install\ Certificates.command
        ```

    2. If it fails due to permissions, rerun with sudo:
        ```
        sudo /Applications/Python\ 3.13/Install\ Certificates.command
        ```

    3. Enter your system password when prompted

    Once completed, rerun the command that executes `main.py`

For more information, refer to the `README.md` in the `network-folder`.
