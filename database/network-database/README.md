# Network Database

This folder contains scripts for retrieving gene regulatory network (GRN) and protein-protein interaction (PPI) network data and populating it into a database.

## File Structure

- **`main.py`** – Handles the entire workflow: loading, filtering, and populating data into the database.
- **`constants.py`** – Defines database namespaces and file directories.
- **`data_services/`** – Contains scripts for fetching and processing data from AllianceMine into a TSV file for database import.
- **`database_services/`** – Includes scripts for filtering new data from AllianceMine and populating it into the database.

## Running the Script

To fetch and populate data, run `main.py` with the `--network` argument:

- `all` – Fetch and populate both GRN and PPI data.
- `grn` – Fetch and populate only GRN data.
- `ppi` – Fetch and populate only PPI data.

Example command to populate both GRN and PPI data into a local database:

```bash
python3 main.py --network all --db_url postgresql://localhost/postgres
```

## Troubleshooting

### urllib3 ImportError

If you encounter the following error:

```
ImportError: urllib3 v2.0 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'OpenSSL 1.1.0h 27 Mar 2018'. See: Drop support for OpenSSL<1.1.1 urllib3/urllib3#2168
```

Resolve it by installing an ealier version of `urllib3`:

```bash
pip install urllib3==1.26.6
```

### InterMine Compatibility Issue

If you see an error related to `intermine.py`, follow these steps:

1. Locate the `webservice.py` file referenced in the error message. If using a virtual environment, navigate to:

```bash
cd <path-to-venv>/lib/<python-version>/site-packages/intermine/webservice.py
```

2. Find the following `try-except` block:

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

3. Replace it with this:

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

3. Save the file and rerun `main.py`
