# Data Services

This folder contains all the services for retrieving and processing data from AllianceMine. **Note:** This folder does not include any script runners.

## File Descriptions

- **`data_fetcher_service.py`** – Handles API calls to AllianceMine, specifying which tables to query and what data to retrieve.
- **`processor.py`** – Defines the processing logic to transform raw data from AllianceMine into the desired format for storage.
- **`save_service.py`** – Provides general functionality for saving processed data to a TSV file.
- **`data_generator.py`** – Integrates all functionality from `data_fetcher_service.py`, `processor.py`, and `save_service.py` to fetch, process, and save data.
