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

The code for generating and populating the network data (GRN and PPI) is located in the `network-database` folder. The main script for fetching, processing, and loading the data into the database is `main.py`. This script will create a Network Database with data newly fetched from AllianceMine.

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

For more information, refer to the [`README.md`](https://github.com/dondi/GRNsight/blob/main/database/network-database/README.md) in the `network-database` folder.
