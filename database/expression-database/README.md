# Expression Database

All files pertaining the expression database live within this directory.

## Table of Contents

- [The basics](#the-basics)
    - [Overview](#overview)
    - [Scripts](#scripts)
        - [Data Preprocessor(s)](#data-preprocessors)
        - [Database Loader](#database-loader)
    - [Updating Existing Data](#updating-existing-data)
        - [Update workflow overview](#update-workflow-overview)
        - [Update source folder structure](#update-source-folder-structure)
        - [Required input file names](#required-input-file-names)
        - [Preprocessing update data](#preprocessing-update-data)
        - [Loading updated data into the database](#loading-updated-data-into-the-database)
        - [Notes on update behavior](#notes-on-update-behavior)

## The basics

### Overview

                ┌──────────────────────────┐
                │   Source CSV Files       │
                │ (ExpressionRates.csv /   |
                |  ExpressionMetadata.csv /│
                │  ProductionRates.csv /   |
                |  DegradationRates.csv)   │
                └─────────────┬────────────┘
                              │
                              ▼
                ┌──────────────────────────┐
                │   preprocessing.py       │
                │  - Parse raw CSVs        │
                │  - Clean data            │
                │  - Generate loader files │
                └─────────────┬────────────┘
                              │
                              ▼
                ┌──────────────────────────┐
                │         loader.py        │
                └─────────────┬────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          │                                       │
          ▼                                       ▼

┌──────────────────────────┐ ┌──────────────────────────┐
│Temporary Staging Tables │ | TRUNCATE + RELOAD |
│ (TEXT columns only) │ | (Wipe & reload strategy) |
│ - COPY FROM STDIN │ | |
│ | | |
| INSERT … ON CONFLICT | | |
│ (Upsert strategy) │ │ |
│ │ │ │
│ Tables: │ │ Tables: │
│ - gene │ │ - production_rate │
│ - ref │ │ - degradation_rate │
│ - expression_metadata │ │ │
│ - expression │ │ │
└─────────────┬────────────┘ └─────────────┬────────────┘
│ │
▼ ▼
┌─────────────────────────────────────────────┐
│ gene_expression schema │
└─────────────────────────────────────────────┘

### Scripts

All scripts live within the subdirectory `scripts`, located in the top-level of the network database directory.

Any source files required to run the scripts live within the subdirectory `source-files`, located in the top-level of the network database directory. As source files may be large, **you must create this directory yourself and add any source files you need to use there**.

All generated results of the scripts live in the subdirectory `script-results`, located in the top-level of the network database directory. Currently, all scripts that generate code create the directory if it does not currently exist. When adding a new script that generates resulting code, best practice is to create the script-results directory and any subdirectories if it does not exist, in order to prevent errors and snafus for recently cloned repositories.

Within the scripts directory, there are the following files:

- `preprocessing.py`
- `loader.py`

#### Data Preprocessor(s)

_Note: Data Preprocessing is always specific to each dataset that you obtain. `preprocessing.py` is capable of preprocessing the specific Expression data files located in `source-files/Current Database`. Because these files are too large to be stored on github, access the direct source files on **[BOX](https://lmu.app.box.com/folder/355960875647)** and move them into this directory. If more data sources are to be added in the database, create a new directory in source-files for it, note it in this `README.md` file and create a new preprocessing script for that data source (if required). Please document the changes in this section so that future developers may use your work to recreate the database if ever required._

The script (`preprocessing.py`) is used to preprocess the data in `source-files/Current Database`. It parses through each file to construct the processed loader files, so that they are ready to load using `loader.py`.

The script (`preprocessing.py`) is capable of preprocessing:

    - Expression Data
    - Expression Metadata
    - Genes
    - References
    - Production Rates
    - Degradation Rates
    - (and any future datasets added to the script)

- All processed output files are saved under:
    ```
    script-results/processed-loader-files
    ```

**Usage**:

The preprocessing script supports command-line flags to allow selective preprocessing or full preprocessing.

1. Process everything (default behavior)

If no arguments are specificed:

```
python3 preprocessing.py
```

Or explicitly:

```
python3 preprocessing.py --all --source_folder "Current Database"
```

This runs every preprocessing step and regenerates all processed files.

> Notes: The default source data directory is `Current Database`, located under `source-files/`.
> If you want to preprocess a different dataset (for example, updated files or a new version), use the `--source-folder` flag to point to the appropriate directory `source-files/<source-folder>/`. Make sure that directory contains all required input CSV files.

2. Process only specific components

You can process individual sections using falgs:

| Option            | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `--expr`          | Process expression data table                             |
| `--meta`          | Process metadata / GEO / PubMed mappings                  |
| `--genes`         | Generate gene list                                        |
| `--refs`          | Generate references file                                  |
| `--prod`          | Process production-rate data                              |
| `--deg`           | Process degradation-rate data                             |
| `--source-folder` | Folder that stores all the files need to be preprocessing |

#### Database Loader

This script (`loader.py`) is to be used to load your preprocessed expression data into the database.

This program generates direct SQL statements from the source files generated by the data preprocessor in order to populate a relational database with those files’ data

**Usage**:

Similar to `preprocessing.py`, the loading script supports command-line flags to allow selective loading or full loading.

1. Load everything (default behavior)

If no arguments are specificed:

```
python3 loader.py | psql postgresql://localhost/postgres
```

Or explicitly:

```
python3 loader.py --all | psql postgresql://localhost/postgres
```

This runs every loading step and poplulate all data into database.

2. Load only specific components

You can load individual sections using falgs:

| Option    | Description                           |
| --------- | ------------------------------------- |
| `--expr`  | Load expression data table            |
| `--meta`  | Load metadata / GEO / PubMed mappings |
| `--genes` | Generate gene list                    |
| `--refs`  | Generate references file              |
| `--prod`  | Load production-rate data             |
| `--deg`   | Load degradation-rate data            |

Example of loading data into database for production rates and degradation rates:

```
python3 loader.py --prod --deg | psql postgresql://localhost/postgres
```

### Updating Existing Data

In addition to initializing the database from scratch, the pipeline also supports updating existing data, such as production rates, degradation rates, expression or metadata.

#### Update workflow overview

When updating data (for example, `production` or `degradation rates`), **`ExpressionData.csv`** is required to determine which genes are present in the expression dataset. This allows the pipeline to:

- Identify missing genes,

- Construct the correct superset of genes

To perform an update, create a new source folder that contains only the files you want to update.

#### Update source folder structure

Create a new folder under source-files/, for example:

```
source-files/Update Data/
```

Place the relevant update files inside this folder.

**Examples**:

- **Updating degradation rates only**:

    ```
    source-files/Update Data/
    ├── DegradationRates.csv
    ├── ExpressionData.csv
    ```

- **Updating metadata only**:

    ```
    source-files/Update Data/
    └── ExpressionMetadata.csv
    ```

> ⚠️ Reference table is currently hard-coded. Please refer to the source code if additional customization is required.

#### Required input file names

The loader expects the following exact filenames:

| Data type           | Required filename        |
| ------------------- | ------------------------ |
| Degradation rates   | `DegradationRates.csv`   |
| Production rates    | `ProductionRates.csv`    |
| Expression data     | `ExpressionData.csv`     |
| Expression metadata | `ExpressionMetadata.csv` |

> These are the only supported update inputs at this time. If additional input files are added in the future, this README must be updated accordingly.

#### Preprocessing update data

All update files must first be preprocessed into SQL-ready formats.

Run the preprocessing script with the update folder specified:

```
python3 preprocessing.py <--deg / --prod / --refs / --meta / --genes / --expr / --all> --source-folder <Updated Folder Name>
```

You may also use any selective preprocessing flags (`--prod`, `--deg`, `--meta`, etc.) as needed.

#### Loading updated data into the database

After preprocessing completes, load the updated data using:

```
python3 loader.py | psql postgresql://localhost/postgres
```

Or selectively load specific components:

```
python3 loader.py --prod --deg | psql postgresql://localhost/postgres
```

#### Notes on update behavior

- Production and degradation rate tables are wiped and reloaded.

- Other tables use a staging + upsert strategy, allowing updates without full table resets.

- This design supports long-term maintenance, incremental updates, and operation without requiring a full local copy of the original dataset.
