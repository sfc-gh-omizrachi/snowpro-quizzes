# Domain 3: Data Loading, Unloading & Connectivity

---

## Q1 (Single Answer)
Which Snowflake command is used to load data from staged files into a table?
- A) INSERT INTO
- B) COPY INTO <table>
- C) LOAD DATA
- D) PUT

---

## Q2 (Scenario)
A data engineer needs to load CSV files from an Amazon S3 bucket into a Snowflake table. The files are delimited by pipes (|) and have a header row. Which Snowflake objects and commands will they need?
- A) An external stage pointing to S3, a file format for CSV with pipe delimiter and skip header, and the COPY INTO command
- B) A PUT command to upload from S3, then a MERGE statement
- C) An internal stage and a direct INSERT from S3
- D) A Snowpipe with no additional configuration

---

## Q3 (Single Answer)
What is the purpose of the PUT command in Snowflake?
- A) To load data from a stage into a table
- B) To upload files from a local file system to a Snowflake internal stage
- C) To export data from a table to external storage
- D) To create an external stage

---

## Q4 (Multi Answer - Select 2)
Which TWO are types of internal stages in Snowflake? (Select 2)
- A) User stage (@~)
- B) S3 stage
- C) Table stage (@%table_name)
- D) Azure stage
- E) GCS stage

---

## Q5 (Single Answer)
What is the difference between an internal stage and an external stage in Snowflake?
- A) Internal stages are faster; external stages are slower
- B) Internal stages store files within Snowflake-managed storage; external stages reference files in external cloud storage (S3, Azure Blob, GCS)
- C) Internal stages can only hold CSV files; external stages support all formats
- D) External stages require Business Critical Edition

---

## Q6 (Scenario)
A company stores their data files in Azure Blob Storage. They want to configure Snowflake to access these files for loading. What should they create?
- A) An internal stage
- B) An external stage pointing to their Azure Blob container
- C) A PUT command targeting Azure Blob
- D) A user stage mapped to Azure

---

## Q7 (Single Answer)
Which file format is NOT natively supported by Snowflake for data loading?
- A) CSV
- B) JSON
- C) Parquet
- D) XLSX (Excel)

---

## Q8 (Single Answer)
What is a named stage in Snowflake?
- A) A temporary storage area that exists only during a session
- B) A database object that references a specific storage location (internal or external) for data files
- C) A warehouse-level cache for query results
- D) A schema for staging tables

---

## Q9 (Multi Answer - Select 2)
Which TWO file formats support semi-structured data loading in Snowflake? (Select 2)
- A) CSV
- B) JSON
- C) Parquet
- D) Avro
- E) TSV

---

## Q10 (Scenario)
A data engineer is loading a large number of JSON files into Snowflake. Some files contain malformed records. They want the load to continue and skip the bad records while logging errors. Which COPY INTO option should they use?
- A) ON_ERROR = 'ABORT_STATEMENT'
- B) ON_ERROR = 'CONTINUE'
- C) ON_ERROR = 'SKIP_FILE'
- D) VALIDATION_MODE = 'RETURN_ERRORS'

---

## Q11 (Single Answer)
What does the ON_ERROR = 'ABORT_STATEMENT' option do in a COPY INTO command?
- A) Skips the entire file with errors and continues with other files
- B) Aborts the entire COPY statement upon encountering the first error
- C) Continues loading and ignores all errors
- D) Logs errors but loads all records

---

## Q12 (Single Answer)
What is the purpose of the VALIDATION_MODE option in the COPY INTO command?
- A) To load data and validate it afterward
- B) To validate staged files without actually loading the data
- C) To check the warehouse size before loading
- D) To verify network connectivity to the stage

---

## Q13 (Scenario)
Before running a full data load, a data engineer wants to preview the first 100 rows from staged files to check for data quality issues without actually loading any data. Which approach should they use?
- A) COPY INTO with ON_ERROR = 'CONTINUE'
- B) COPY INTO with VALIDATION_MODE = 'RETURN_ROWS' and a ROWS limit
- C) SELECT from the stage using $ notation
- D) PUT command with a preview flag

---

## Q14 (Multi Answer - Select 2)
Which TWO ON_ERROR options are available in the COPY INTO command? (Select 2)
- A) ABORT_STATEMENT
- B) RETRY
- C) SKIP_FILE
- D) IGNORE_ALL
- E) ROLLBACK

---

## Q15 (Single Answer)
What does the COPY INTO <location> command do?
- A) Loads data from a stage into a table
- B) Unloads (exports) data from a Snowflake table to a stage or external location
- C) Moves data between two Snowflake tables
- D) Copies a stage definition

---

## Q16 (Single Answer)
What is the default file format for the COPY INTO command if no file format is specified?
- A) JSON
- B) Parquet
- C) CSV
- D) Avro

---

## Q17 (Scenario)
A data engineer has a large Parquet file (10 GB) in an S3 bucket. They want to load it into Snowflake as efficiently as possible. What is the recommended approach?
- A) Use GET to download the file locally, then PUT and COPY
- B) Create an external stage pointing to S3 and use COPY INTO directly
- C) Use INSERT INTO with a SELECT from the Parquet file
- D) Convert the file to CSV first, then load it

---

## Q18 (Single Answer)
What is server-side encryption for internal stages?
- A) Encryption performed by the client before uploading
- B) Encryption that Snowflake automatically applies to files stored in internal stages
- C) Encryption of data in transit only
- D) A customer-managed encryption key for stages

---

## Q19 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's data loading architecture? (Select 2)
- A) Files in stages can be loaded in parallel using multiple threads
- B) All files must be loaded one at a time sequentially
- C) Snowflake automatically splits large files across warehouse nodes for parallel processing
- D) Loading requires the data to be pre-sorted
- E) Only CSV format supports parallel loading

---

## Q20 (Single Answer)
What is a directory table in Snowflake?
- A) A table that stores directory paths
- B) A catalog of files in a stage that provides metadata about the staged files (file name, size, last modified, etc.)
- C) A lookup table for file formats
- D) A table that stores user directory information

---

## Q21 (Scenario)
A data engineer wants to list all files in an external stage along with their sizes and last modification dates, and query this information using SQL. Which feature should they use?
- A) SHOW STAGES command
- B) Directory table on the stage
- C) LIST @stage command only
- D) INFORMATION_SCHEMA.STAGES view

---

## Q22 (Single Answer)
What command lists files in a Snowflake stage?
- A) SHOW FILES IN @stage
- B) LIST @stage
- C) SELECT * FROM @stage
- D) DESCRIBE STAGE @stage

---

## Q23 (Single Answer)
What is the purpose of a storage integration in Snowflake?
- A) To define a file format for loading data
- B) To create a trusted, reusable connection between Snowflake and external cloud storage (S3, Azure Blob, GCS) without embedding credentials in stage definitions
- C) To integrate Snowflake with BI tools
- D) To replicate data between accounts

---

## Q24 (Scenario)
A security-conscious organization wants to connect Snowflake to their S3 bucket without storing AWS access keys in stage definitions. What should they configure?
- A) Embed the AWS keys directly in the stage definition
- B) Create a storage integration that uses an IAM role for authentication
- C) Use a network policy to allow S3 access
- D) Enable Tri-Secret Secure for S3 access

---

## Q25 (Multi Answer - Select 2)
Which TWO options are available for authenticating Snowflake's access to an Amazon S3 external stage? (Select 2)
- A) Storage integration with IAM role
- B) Direct SSH keys
- C) AWS key ID and secret key in stage definition
- D) SAML-based authentication
- E) OAuth tokens for S3

---

## Q26 (Single Answer)
What is Snowpipe?
- A) A batch data loading tool that runs on a schedule
- B) A continuous, serverless data ingestion service that automatically loads data as files arrive in a stage
- C) A data pipeline visualization tool
- D) A command-line tool for data export

---

## Q27 (Scenario)
A company receives thousands of small JSON files throughout the day in their S3 bucket. They need these files to be loaded into Snowflake within minutes of arrival, without manual intervention. Which feature is best suited?
- A) Scheduled COPY INTO via a task
- B) Snowpipe with auto-ingest enabled
- C) Manual COPY INTO commands
- D) External table with auto-refresh

---

## Q28 (Single Answer)
How does Snowpipe auto-ingest work with Amazon S3?
- A) Snowflake periodically polls the S3 bucket for new files
- B) S3 event notifications (via SQS) trigger Snowpipe to load new files automatically
- C) Users must call a REST API to notify Snowpipe of new files
- D) Snowpipe watches a local directory for new files

---

## Q29 (Multi Answer - Select 2)
Which TWO statements about Snowpipe are correct? (Select 2)
- A) Snowpipe uses serverless compute (not a virtual warehouse) for loading
- B) Snowpipe requires a running virtual warehouse
- C) Snowpipe is designed for continuous micro-batch loading
- D) Snowpipe can only load CSV files
- E) Snowpipe loads data in large daily batches

---

## Q30 (Single Answer)
What is the billing model for Snowpipe?
- A) Billed based on the size of the virtual warehouse used
- B) Billed based on serverless compute resources consumed during file loading
- C) Free for all editions
- D) Billed per file loaded regardless of size

---

## Q31 (Scenario)
A data engineer notices that Snowpipe is not loading new files from S3. They confirmed files are arriving in the bucket. What is the most likely issue?
- A) The virtual warehouse is suspended
- B) The S3 event notification (SQS queue) is misconfigured or not pointing to the correct pipe
- C) The table has run out of storage
- D) The COPY INTO command has a syntax error

---

## Q32 (Single Answer)
What is Snowpipe Streaming?
- A) A video streaming service in Snowflake
- B) A low-latency data ingestion API that allows applications to insert rows directly into Snowflake tables without staging files
- C) A way to stream query results to external systems
- D) A live dashboard streaming service

---

## Q33 (Single Answer)
How does Snowpipe Streaming differ from standard Snowpipe?
- A) Standard Snowpipe is faster
- B) Snowpipe Streaming ingests rows via an API without intermediate files, while standard Snowpipe loads data from staged files
- C) Snowpipe Streaming requires larger warehouses
- D) Standard Snowpipe supports streaming; Snowpipe Streaming does not

---

## Q34 (Multi Answer - Select 2)
Which TWO are valid methods to trigger Snowpipe to load data? (Select 2)
- A) Auto-ingest via cloud event notifications (e.g., S3 SQS)
- B) Manual warehouse resume
- C) Calling the Snowpipe REST API (insertFiles endpoint)
- D) Running a COPY INTO command
- E) Scheduling via a Snowflake task

---

## Q35 (Single Answer)
What is a stream in Snowflake?
- A) A real-time data feed from external sources
- B) An object that tracks DML changes (inserts, updates, deletes) to a table, enabling change data capture (CDC)
- C) A type of data pipe for continuous loading
- D) A network connection stream

---

## Q36 (Scenario)
A data engineer needs to build an incremental data pipeline that processes only new and changed rows from a source table. Which Snowflake object should they use to capture the changes?
- A) Task
- B) Stream
- C) Pipe
- D) External table

---

## Q37 (Single Answer)
What types of changes does a standard (delta) stream in Snowflake track?
- A) Only inserts
- B) Inserts, updates, and deletes
- C) Only schema changes
- D) Only deletes

---

## Q38 (Multi Answer - Select 2)
Which TWO columns are added by a stream to indicate the type of change? (Select 2)
- A) METADATA$ACTION (INSERT or DELETE)
- B) METADATA$TIMESTAMP
- C) METADATA$ISUPDATE (TRUE if the action is part of an UPDATE)
- D) METADATA$PARTITION
- E) METADATA$QUERY_ID

---

## Q39 (Single Answer)
What happens to a stream's data after it is consumed by a DML statement within a transaction?
- A) The data remains in the stream indefinitely
- B) The stream's offset advances, and the consumed changes are no longer returned by querying the stream
- C) The stream is automatically dropped
- D) The data is moved to a separate audit table

---

## Q40 (Scenario)
A data engineer creates a stream on a source table and a task that runs every 5 minutes. The task should only process data when there are new changes. How should they configure this?
- A) Use SYSTEM$STREAM_HAS_DATA('stream_name') in the task's WHEN clause
- B) Always run the task regardless of changes
- C) Check the table row count before running
- D) Use a resource monitor to trigger the task

---

## Q41 (Single Answer)
What is a task in Snowflake?
- A) A type of virtual warehouse
- B) A scheduled object that executes a SQL statement (or calls a stored procedure) on a recurring schedule or when triggered
- C) A type of stream
- D) A monitoring tool for query performance

---

## Q42 (Single Answer)
How can tasks be scheduled in Snowflake?
- A) Only by using external schedulers
- B) Using a CRON expression or a fixed interval (e.g., every N minutes)
- C) Using a date-time picker in Snowsight only
- D) Tasks cannot be scheduled; they run manually

---

## Q43 (Scenario)
A data engineer needs to build a task tree where Task B depends on Task A completing successfully. How should they define this dependency?
- A) Schedule Task B to run 5 minutes after Task A
- B) Define Task B as a child task of Task A using the AFTER clause
- C) Use a stream to connect Task A and Task B
- D) Run both tasks in the same warehouse

---

## Q44 (Multi Answer - Select 2)
Which TWO are required to run a task in Snowflake? (Select 2)
- A) The task must be resumed (ALTER TASK ... RESUME)
- B) The task must be assigned a virtual warehouse or use serverless compute
- C) The task must have a stream attached
- D) The task must be owned by ACCOUNTADMIN
- E) The task must reference an external stage

---

## Q45 (Single Answer)
What is the purpose of the AFTER clause in a task definition?
- A) To specify the time zone
- B) To create a dependency so the task runs only after the specified predecessor task completes successfully
- C) To specify the warehouse size
- D) To define the error handling behavior

---

## Q46 (Single Answer)
What compute option is available for tasks besides using a virtual warehouse?
- A) Cloud Services layer compute
- B) Serverless tasks (Snowflake-managed compute)
- C) External compute clusters
- D) No alternative exists

---

## Q47 (Scenario)
A company wants to run small maintenance tasks every hour but doesn't want to keep a warehouse running for them. Which task compute option is most cost-effective?
- A) A dedicated 4X-Large warehouse
- B) Serverless tasks
- C) A Snowpark-optimized warehouse
- D) A multi-cluster warehouse

---

## Q48 (Single Answer)
What happens when a query spills to remote storage in Snowflake?
- A) The query fails with an out-of-memory error
- B) Intermediate results exceed local disk capacity and overflow to cloud storage, significantly degrading performance
- C) Snowflake automatically scales up the warehouse to avoid the spill
- D) The query is automatically queued until sufficient memory is available

---

## Q49 (Scenario)
A data engineer needs to build a multi-step data pipeline where several transformation layers depend on each other. They want to define the transformations declaratively and let Snowflake manage the refresh schedule. Which feature should they use?
- A) Streams and tasks
- B) Dynamic tables
- C) Snowpipe
- D) External tables

---

## Q50 (Multi Answer - Select 2)
Which TWO are advantages of dynamic tables over streams and tasks for building data pipelines? (Select 2)
- A) Dynamic tables are declarative — you define what, not how
- B) Dynamic tables always run faster than tasks
- C) Dynamic tables automatically manage refresh scheduling and dependencies
- D) Dynamic tables require no compute resources
- E) Dynamic tables support only SQL transformations

---

## Q51 (Single Answer)
What does the TARGET_LAG parameter specify for a dynamic table?
- A) The maximum number of rows that can be stale
- B) The maximum allowed staleness (time) between the dynamic table and its source data
- C) The delay before a dynamic table is created
- D) The network latency to external storage

---

## Q52 (Single Answer)
What is Openflow in Snowflake?
- A) A data visualization tool
- B) A managed data integration service for connecting to external data sources and replicating data into Snowflake
- C) A network protocol for Snowflake
- D) A warehouse optimization feature

---

## Q53 (Scenario)
A data engineer needs to replicate data from a PostgreSQL database into Snowflake on a continuous basis. They want a managed solution within Snowflake. Which feature should they consider?
- A) External tables
- B) Snowpipe
- C) Openflow
- D) COPY INTO from the database

---

## Q54 (Single Answer)
Which Snowflake connector is used for integrating with Apache Spark?
- A) Snowflake JDBC driver
- B) Snowflake Connector for Spark
- C) Snowflake ODBC driver
- D) Snowflake Python connector

---

## Q55 (Multi Answer - Select 2)
Which TWO Snowflake connectors/drivers are commonly used for Python-based applications? (Select 2)
- A) Snowflake Connector for Python
- B) Snowflake JDBC driver
- C) Snowpark Python API
- D) Snowflake ODBC driver
- E) Snowflake Connector for Spark

---

## Q56 (Single Answer)
What is the purpose of an API integration in Snowflake?
- A) To connect Snowflake to internal stages
- B) To configure a trusted connection to external API services (like AWS API Gateway or Azure API Management) for use with external functions
- C) To integrate Snowflake with BI tools
- D) To manage Snowflake's REST API endpoints

---

## Q57 (Scenario)
A data engineer wants to call an external machine learning API hosted on AWS Lambda from within a Snowflake SQL query. What must they create?
- A) A stored procedure and a task
- B) An API integration and an external function
- C) A Snowpipe with webhook
- D) A storage integration

---

## Q58 (Single Answer)
What is Git integration in Snowflake?
- A) A version control system built into Snowflake
- B) A feature that allows Snowflake to connect to Git repositories to sync and execute code (e.g., stored procedures, scripts)
- C) A tool for tracking changes to Snowflake objects
- D) A backup service that stores Snowflake data in Git

---

## Q59 (Multi Answer - Select 2)
Which TWO are benefits of using a storage integration instead of embedding credentials in stage definitions? (Select 2)
- A) Improved security by avoiding credential exposure in SQL
- B) Faster data loading speeds
- C) Centralized credential management and easier key rotation
- D) Reduced storage costs
- E) Automatic data compression

---

## Q60 (Single Answer)
What is the GET command used for in Snowflake?
- A) To load data into a table from a stage
- B) To download files from a Snowflake internal stage to a local file system
- C) To retrieve metadata about a stage
- D) To get the current session parameters

---

## Q61 (Scenario)
A data engineer needs to export query results to a Parquet file in an S3 bucket. What is the correct approach?
- A) Use the PUT command to upload to S3
- B) Use COPY INTO @external_stage with FILE_FORMAT = (TYPE = PARQUET)
- C) Use GET to download to S3
- D) Use SELECT INTO OUTFILE

---

## Q62 (Single Answer)
What is the purpose of the PATTERN option in the COPY INTO command?
- A) To define the file format pattern
- B) To filter which files in the stage are loaded based on a regular expression pattern matching the file names
- C) To specify the data insertion pattern
- D) To define the partition pattern

---

## Q63 (Multi Answer - Select 2)
Which TWO COPY INTO options control how duplicate files are handled? (Select 2)
- A) FORCE = TRUE (reload files regardless of load history)
- B) DUPLICATE_KEY = 'SKIP'
- C) LOAD_HISTORY (Snowflake tracks previously loaded files and skips them by default)
- D) OVERWRITE = TRUE
- E) MERGE_DUPLICATES = TRUE

---

## Q64 (Single Answer)
What happens by default when you run COPY INTO for files that have already been successfully loaded?
- A) The files are reloaded, creating duplicate data
- B) Snowflake skips the files because it tracks load metadata and prevents reloading of already-loaded files
- C) An error is thrown
- D) The existing data is overwritten

---

## Q65 (Scenario)
A data engineer accidentally deleted some records and wants to reload data from files that were already loaded. How can they force Snowflake to reload those files?
- A) Drop and recreate the table
- B) Use COPY INTO with FORCE = TRUE
- C) Rename the files in the stage
- D) Use the UNLOAD command first

---

## Q66 (Single Answer)
What is the recommended maximum file size for optimal loading performance in Snowflake?
- A) 1 MB
- B) 10-100 MB compressed
- C) 1 GB compressed
- D) 10 GB compressed

---

## Q67 (Single Answer)
What is the benefit of splitting large data files into smaller chunks before loading?
- A) It reduces storage costs
- B) It enables parallel loading, where multiple warehouse nodes process different files simultaneously
- C) It improves data encryption
- D) It reduces network latency

---

## Q68 (Scenario)
A data engineer has a 50 GB gzip-compressed CSV file to load. Loading is taking very long because only one thread is processing it. What should they do?
- A) Increase the warehouse size
- B) Split the file into multiple smaller files (100-250 MB each) so Snowflake can load them in parallel
- C) Convert the file to Parquet
- D) Disable compression

---

## Q69 (Multi Answer - Select 2)
Which TWO are Snowflake-supported compression formats for staged data files? (Select 2)
- A) GZIP
- B) RAR
- C) SNAPPY
- D) TAR
- E) 7-ZIP

---

## Q70 (Single Answer)
What is the user stage in Snowflake?
- A) A shared stage available to all users
- B) A personal stage allocated to each user (referenced as @~) for staging files
- C) A stage that requires a CREATE STAGE command
- D) A stage located in external cloud storage

---

## Q71 (Single Answer)
What is the table stage in Snowflake?
- A) A shared stage for all tables in a schema
- B) A stage automatically associated with each table (referenced as @%table_name) for staging files specific to that table
- C) A stage created by the COPY INTO command
- D) An external stage for table exports

---

## Q72 (Scenario)
A developer wants to quickly stage a small file for loading into a specific table without creating a named stage. Which stage type is most convenient?
- A) Named internal stage
- B) Named external stage
- C) Table stage (@%table_name)
- D) User stage (@~)

---

## Q73 (Single Answer)
What encryption does Snowflake apply to files uploaded to internal stages using the PUT command?
- A) No encryption
- B) AES-128 client-side encryption by default
- C) AES-256 encryption (client-side during upload, server-side at rest)
- D) RSA encryption

---

## Q74 (Multi Answer - Select 2)
Which TWO Snowflake features enable querying data directly from files in a stage without loading it into a table? (Select 2)
- A) SELECT from @stage using $ column notation
- B) COPY INTO with preview mode
- C) External tables that reference staged files
- D) DESCRIBE STAGE for data preview
- E) PUT command with query option

---

## Q75 (Single Answer)
What is the PURGE option in the COPY INTO command?
- A) It purges the table data before loading
- B) It automatically deletes staged files after they have been successfully loaded into the table
- C) It removes duplicate rows from the loaded data
- D) It clears the warehouse cache

---

## Q76 (Scenario)
A data engineer runs a daily batch load from an internal stage. After successful loading, they want the loaded files to be automatically removed from the stage to save storage. Which option should they use?
- A) FORCE = TRUE
- B) PURGE = TRUE
- C) ON_ERROR = 'SKIP_FILE'
- D) TRUNCATECOLUMNS = TRUE

---

## Q77 (Single Answer)
What is the TRUNCATECOLUMNS option in the COPY INTO command?
- A) It truncates the table before loading
- B) It truncates string values that exceed the column length instead of producing an error
- C) It removes trailing whitespace from columns
- D) It drops columns that are not in the file

---

## Q78 (Single Answer)
What is the SIZE_LIMIT option in the COPY INTO command?
- A) It limits the number of files to load
- B) It sets the maximum total size (in bytes) of data to load in a single COPY statement
- C) It limits the size of individual files
- D) It sets the maximum table size

---

## Q79 (Scenario)
A data engineer needs to load data from staged CSV files, but some text fields contain values longer than the target column's VARCHAR length. They want to truncate these values rather than fail the load. Which option should they use?
- A) ON_ERROR = 'CONTINUE'
- B) TRUNCATECOLUMNS = TRUE
- C) SKIP_HEADER = 1
- D) FORCE = TRUE

---

## Q80 (Multi Answer - Select 2)
Which TWO are valid Snowflake connector types for integrating with external tools and platforms? (Select 2)
- A) Snowflake Connector for Kafka
- B) Snowflake Connector for MongoDB
- C) Snowflake Connector for Python
- D) Snowflake Connector for Redis
- E) Snowflake Connector for FTP

---

## Q81 (Single Answer)
What is the Snowflake Connector for Kafka used for?
- A) To query Kafka topics from Snowflake
- B) To continuously ingest data from Apache Kafka topics into Snowflake tables
- C) To export data from Snowflake to Kafka
- D) To manage Kafka cluster configurations from Snowflake

---

## Q82 (Single Answer)
Which Snowflake driver is used for connecting Java applications to Snowflake?
- A) Snowflake ODBC driver
- B) Snowflake JDBC driver
- C) Snowflake Python connector
- D) Snowflake Node.js driver

---

## Q83 (Scenario)
A .NET application needs to connect to Snowflake to run queries and retrieve results. Which driver should the developer use?
- A) Snowflake JDBC driver
- B) Snowflake ODBC driver
- C) Snowflake Python connector
- D) Snowflake Go driver

---

## Q84 (Single Answer)
What is the purpose of Git integration in Snowflake?
- A) To version control Snowflake tables
- B) To connect to Git repositories and use versioned code (SQL scripts, stored procedures) within Snowflake
- C) To backup Snowflake databases to Git
- D) To track changes to warehouse configurations

---

## Q85 (Multi Answer - Select 2)
Which TWO describe how Snowflake handles data loading metadata? (Select 2)
- A) Snowflake tracks which files have been loaded via load metadata (preventing re-loading)
- B) Load metadata is stored in the user's local system
- C) Load metadata is retained for 64 days for COPY INTO commands
- D) Snowflake never tracks loaded files
- E) Load metadata is retained for 365 days

---

## Q86 (Single Answer)
What happens when you use COPY INTO with the MATCH_BY_COLUMN_NAME option?
- A) Columns are matched by position only
- B) Data is loaded by matching file column names to table column names, regardless of column order
- C) Only matching columns are loaded and others are ignored
- D) The file must have exactly the same columns as the table

---

## Q87 (Scenario)
A data engineer receives Parquet files from an external vendor. The column order in the Parquet files does not match the Snowflake table. They want to load the data by matching column names. Which COPY INTO option should they use?
- A) FORCE = TRUE
- B) MATCH_BY_COLUMN_NAME = 'CASE_INSENSITIVE'
- C) ON_ERROR = 'CONTINUE'
- D) FILE_FORMAT = (TYPE = AUTO)

---

## Q88 (Single Answer)
What is the METADATA$FILENAME column used for during data loading?
- A) To rename files after loading
- B) To reference the name of the staged file from which each row was loaded
- C) To specify the output file name during unloading
- D) To filter files by extension

---

## Q89 (Single Answer)
What is the purpose of the STRIP_OUTER_ARRAY option for JSON loading?
- A) To remove all arrays from the JSON data
- B) To remove the outer array brackets from a JSON file, enabling each object in the array to be loaded as a separate row
- C) To flatten nested arrays
- D) To convert arrays to strings

---

## Q90 (Scenario)
A data engineer needs to set up a complete automated data pipeline: files land in S3, are automatically loaded into a raw table, and then transformed into a clean table on a schedule. Which combination of Snowflake features should they use?
- A) Snowpipe for auto-ingest, a stream on the raw table to capture changes, and a task to run the transformation
- B) External table, materialized view, and Snowpipe
- C) Dynamic table, Snowpipe Streaming, and external function
- D) Manual COPY INTO and a stored procedure
