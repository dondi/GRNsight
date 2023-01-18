# GRNsight Database
Here are the files pertaining to both the network and expression databases. Look within the README.md files of both folders for information pertinent to the schema that you intend to be using.
## Setting up a local postgres GRNsight Database
1. Installing PostgreSQL on your computer
    - MacOS and Windows can follow these [instructions](https://dondi.lmu.build/share/db/postgresql-setup-day.pdf) on how to install postgreSQL.
        - Step 1 tells you how to install postgreSQL on your local machine, initialize a database, and how to start and stop running your database instance.
        - If your terminal emits a message that looks like `initdb --locale=C -E UTF-8 location-of-cluster` from Step 1B, then your installer has initialized a database for you.
        - Additionally, your installer may start the server for you upon installation. To start the server yourself run `pg_ctl start -D location-of-cluster`. To stop the server run `pg_ctl stop -D location-of-cluster`.
    - Linux users
      - The MacOS and Windows instructions will _probably_ not work for you. You can try at your own risk to check.
      - Linux users can try these [instructions](https://www.geeksforgeeks.org/install-postgresql-on-linux/) and that should work for you (...maybe...). If it doesn't try googling instructions with your specific operating system. Sorry!
2. Loading data to your database
    1. Adding the Schemas to your database.
        1. Go into your database using the following command: 
            
            ```
            psql postgresql://localhost/postgres
            ``` 
            
           From there, create the schemas using the following commands:
            
            ```
            CREATE SCHEMA gene_regulatory_network;
            ```
            
            ```
            CREATE SCHEMA gene_expression;
            ```
            
           Once they are created you can exit your database using the command `\q`.
         2. Once your schema's are created, you can add the table specifications using the following commands:
            
            ```
            psql postgresql://localhost/postgres -f <path to GRNsight/database/network-database>/schema.sql
            ```
            
            ```
            psql postgresql://localhost/postgres -f <path to GRNsight/database/expression-database>/schema.sql
            ```
            
            Your database is now ready to accept expression and network data!
            
    2. Loading the GRNsight Network Data to your local database
        1. GRNsight generates Network Data from SGD through YeastMine. In order to run the script that generates these Network files, you must pip3 install the dependencies used. If you get an error saying that a module doesn't exist, just run `pip3 install <Module Name>` and it should fix the error. If the error persists and is found in a specific file on your machine, you might have to manually go into that file and alter the naming conventions of the dependencies that are used. _Note: So far this issue has only occured on Ubuntu 22.04.1, so you might be lucky and not have to do it!_
        
          ```
          pip3 install pandas requests intermine tzlocal
          ```
          
          Once the dependencies have been installed, you can run
          
          ```
          cd <path to GRNsight/database/network-database/scripts>
          python3 generate_network.py
          ```
        
          This will take a while to get all of the network data and generate all of the files. This will create a folder full of the processed files in `database/network-database/script-results`.
  
        2. Load the processed files into your database.
        
            ```
            cd <path to GRNsight/database/network-database/scripts>
            python3 loader.py | psql postgresql://localhost/postgres
            ```
            
            This should output a bunch of COPY print statements to your terminal. Once complete your database is now loaded with the network data.
        
    3. Loading the GRNsight Expression Data to your local database
        1. Create a directory (aka folder) in the database/expression-database folder called `source-files`. 
        
            ```
            mkdir <path to GRNsight/database/expression-database>/source-files
            ```
        
        2. Download the _"Expression 2020"_ folder from Box located in `GRNsight > GRNsight Expression > Expression 2020` to your newly created `source-files` folder. Your the path should look like this: GRNsight > database > expression-database > source-files > Expression 2020 > [the actual csv and xlsx files are here!]
        3. Run the pre-processing script on the data. This will create a folder full of the processed files in `database/expression-database/script-results`.
        
            ```
            cd <path to GRNsight/database/expression-database/scripts>
            python3 preprocessing.py
            ```
            
        4. Load the processed files into your database. 
        
            ```
            cd <path to GRNsight/database/expression-database/scripts>
            python3 loader.py | psql postgresql://localhost/postgres
            ```
            
            This should output a bunch of COPY print statements to your terminal. Once complete your database is now loaded with the expression data.
