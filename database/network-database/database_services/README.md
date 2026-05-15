# Database Services

This folder handles loading TSV/CSV data into PostgreSQL.

## Files

- `populator.py`
    - Reads input files.
    - Matches columns to database tables.
    - Inserts data into PostgreSQL.

- `populator_runner.py`
    - Decides which populators to run.
    - Supports GRN, PPI, or both.
    - Supports two inputs:
        - `script-results` directory
        - custom folder with schema subfolders
