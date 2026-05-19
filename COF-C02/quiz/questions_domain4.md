## Q1 (Single Answer)
A data engineer needs to stage files that will be loaded into multiple tables by multiple users. Which type of stage provides the greatest flexibility for this scenario?

- A) User stage
- B) Table stage
- C) Named internal stage
- D) Temporary stage
---
## Q2 (Single Answer)
What is the recommended compressed file size for optimal bulk data loading performance in Snowflake?

- A) 10-50 MB
- B) 100-250 MB
- C) 500 MB - 1 GB
- D) 1-5 GB
---
## Q3 (Single Answer)
Which compute resource model does Snowpipe use to load data?

- A) A user-specified virtual warehouse
- B) The SYSTEM warehouse
- C) Snowflake-provided serverless compute resources
- D) A dedicated Snowpipe warehouse that must be created before use
---
## Q4 (Multi-Answer: Select TWO)
Which TWO mechanisms can be used to trigger Snowpipe to load data files? (Select TWO)

- A) Scheduling COPY INTO commands using Snowflake tasks
- B) Automated data loads using cloud messaging event notifications
- C) Calling Snowpipe REST API endpoints
- D) Setting up database triggers on the target table
- E) Using the PUT command with the AUTO_LOAD parameter
---
## Q5 (Single Answer)
A data engineer references `@%customers` in a COPY INTO statement. What type of stage does this refer to?

- A) User stage for the current user
- B) Named internal stage called "customers"
- C) Table stage for the table named "customers"
- D) External stage pointing to a customers directory
---
## Q6 (Single Answer)
How long is Snowpipe load history metadata retained?

- A) 7 days
- B) 14 days
- C) 64 days
- D) 90 days
---
## Q7 (Single Answer)
Which command is used to upload data files from a local file system to a Snowflake internal stage?

- A) COPY INTO
- B) UPLOAD
- C) PUT
- D) LOAD
---
## Q8 (Single Answer)
What is the default value of the AUTO_COMPRESS parameter in the PUT command?

- A) FALSE
- B) TRUE
- C) GZIP
- D) AUTO_DETECT
---
## Q9 (Multi-Answer: Select TWO)
Which TWO statements about the PUT command are true? (Select TWO)

- A) PUT can upload files to external stages
- B) PUT cannot be executed from the Snowflake web interface worksheets
- C) PUT automatically compresses files using gzip by default
- D) PUT supports uploading files to Amazon S3 buckets directly
- E) PUT requires a running virtual warehouse
---
## Q10 (Single Answer)
When creating a pipe for Snowpipe, which copy option is NOT supported in the pipe definition?

- A) PATTERN
- B) FILE_FORMAT
- C) MATCH_BY_COLUMN_NAME
- D) FORCE
---
## Q11 (Single Answer)
What does the VALIDATE table function do?

- A) Validates the syntax of a COPY INTO statement before execution
- B) Returns all errors encountered during a past COPY INTO execution
- C) Checks file formats for compatibility with a target table
- D) Validates that staged files match the expected schema
---
## Q12 (Multi-Answer: Select TWO)
Which TWO are limitations of the VALIDATE function? (Select TWO)

- A) It cannot validate loads that used ON_ERROR = ABORT_STATEMENT
- B) It can only validate loads from the last 24 hours
- C) It does not work when SELECT statements were used to transform data during the COPY INTO operation
- D) It only returns the first error in each file
- E) It requires ACCOUNTADMIN role to execute
---
## Q13 (Single Answer)
What is the maximum number of files that can be specified in the FILES parameter of a COPY INTO <table> command?

- A) 100
- B) 500
- C) 1,000
- D) 10,000
---
## Q14 (Multi-Answer: Select THREE)
Which THREE file formats are supported for UNLOADING data from Snowflake? (Select THREE)

- A) CSV
- B) Avro
- C) JSON
- D) ORC
- E) Parquet
- F) XML
---
## Q15 (Single Answer)
When unloading data to CSV files, what is the recommended approach to distinguish between empty strings and NULL values?

- A) Set EMPTY_FIELD_AS_NULL = TRUE
- B) Use the NULL_IF option only
- C) Enclose strings in quotes using FIELD_OPTIONALLY_ENCLOSED_BY
- D) Set STRIP_NULL_VALUES = TRUE
---
## Q16 (Single Answer)
What is the default value of the MAX_FILE_SIZE copy option when unloading data using COPY INTO <location>?

- A) 5 MB
- B) 16 MB
- C) 64 MB
- D) 256 MB
---
## Q17 (Multi-Answer: Select TWO)
Which TWO copy options are used to unload data into a single output file? (Select TWO)

- A) SINGLE = TRUE
- B) PARALLEL = 1
- C) MAX_FILE_SIZE (set to a large value to accommodate data)
- D) FILE_COUNT = 1
- E) PARTITION BY = NONE
---
## Q18 (Single Answer)
A data engineer needs to unload a relational table into JSON format. Which function can be used in the SELECT statement of the COPY INTO <location> command to convert rows to JSON?

- A) TO_JSON
- B) PARSE_JSON
- C) OBJECT_CONSTRUCT
- D) AS_OBJECT
---
## Q19 (Single Answer)
Which command downloads data files from an internal stage to a local file system?

- A) DOWNLOAD
- B) COPY INTO <location>
- C) GET
- D) FETCH
---
## Q20 (Multi-Answer: Select TWO)
Which TWO statements about the GET command are correct? (Select TWO)

- A) GET can download files from external stages
- B) GET cannot be executed from the Snowflake web interface worksheets
- C) GET supports downloading files from named internal stages
- D) GET requires ACCOUNTADMIN role
- E) GET compresses files before downloading
---
## Q21 (Single Answer)
What does the LIST (LS) command return?

- A) The contents of staged data files
- B) A list of files staged in internal or external stages
- C) A list of tables that have been loaded using COPY INTO
- D) A list of active Snowpipe pipes and their status
---
## Q22 (Single Answer)
Which compression methods are supported when unloading data to Parquet files?

- A) GZIP, BZ2, BROTLI, ZSTD, NONE
- B) AUTO, LZO, SNAPPY, NONE
- C) AUTO, GZIP, SNAPPY, NONE
- D) SNAPPY, ZSTD, LZO, NONE
---
## Q23 (Multi-Answer: Select TWO)
Which TWO characteristics apply to table stages in Snowflake? (Select TWO)

- A) They can be altered using ALTER STAGE
- B) They have no grantable privileges of their own
- C) They support transforming data while loading using a query as the COPY source
- D) They are referenced using @%tablename syntax
- E) They can store files for loading into multiple different tables
---
## Q24 (Single Answer)
How long does Snowflake retain load metadata for a table when using bulk loading with the COPY command?

- A) 14 days
- B) 30 days
- C) 64 days
- D) 90 days
---
## Q25 (Single Answer)
A data engineer uses the COPY INTO command to load files but wants to continue loading other files even if some records fail. Which ON_ERROR option should they use?

- A) ABORT_STATEMENT
- B) SKIP_FILE
- C) CONTINUE
- D) FAIL_SAFE
---
## Q26 (Single Answer)
A data engineer wants the COPY INTO command to skip an entire file when any error is detected, but continue processing all other files in the load operation. Which ON_ERROR option should they use?

- A) CONTINUE
- B) ABORT_STATEMENT
- C) SKIP_FILE
- D) SKIP_ROW
---
## Q27 (Single Answer)
A data engineer adds `PURGE = TRUE` to a COPY INTO statement. What happens after the data is successfully loaded?

- A) The target table data is truncated and reloaded
- B) The load metadata is deleted from Snowflake
- C) The staged data files are automatically removed from the stage
- D) The stage object itself is dropped
---
## Q28 (Single Answer)
Which COPY INTO copy option allows reloading data files that have already been loaded, regardless of load history, potentially duplicating data in the target table?

- A) RELOAD = TRUE
- B) OVERWRITE = TRUE
- C) FORCE = TRUE
- D) RESET_LOAD = TRUE
---
## Q29 (Single Answer)
A data engineer is loading CSV data where some string values exceed the target column's maximum length. They want the load to succeed by silently truncating the excess characters instead of failing. Which copy option achieves this?

- A) ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE
- B) TRUNCATECOLUMNS = TRUE
- C) ENFORCE_LENGTH = FALSE
- D) MAX_STRING = AUTO
---
## Q30 (Single Answer)
Which VALIDATION_MODE option returns ALL errors across ALL files in the COPY statement, including rows from files that were previously partially loaded when ON_ERROR = CONTINUE was used?

- A) RETURN_ERRORS
- B) RETURN_ALL_ERRORS
- C) RETURN_10_ROWS
- D) RETURN_FULL_ERRORS
---
## Q31 (Single Answer)
A data engineer wants to load only files from a stage whose names match a specific naming convention (e.g., files ending in `_2024.csv`). Which COPY INTO parameter should they use?

- A) FILES = ('<pattern>')
- B) MATCH = '<pattern>'
- C) PATTERN = '<regex_pattern>'
- D) FILTER = '<regex_pattern>'
---
## Q32 (Single Answer)
What is the primary advantage of using STORAGE_INTEGRATION instead of CREDENTIALS when configuring an external stage for Amazon S3?

- A) It enables loading from Amazon S3 Glacier storage
- B) It avoids the need to supply cloud provider credentials when creating stages or loading data
- C) It automatically compresses files during loading
- D) It enables Snowpipe auto-ingest without SQS configuration
---
## Q33 (Single Answer)
Which of the following is a restriction when loading data from external cloud storage locations in Snowflake?

- A) External stages require ACCOUNTADMIN role to use
- B) External stages cannot be used with the COPY INTO command
- C) Snowflake cannot access data in archival cloud storage classes such as Amazon S3 Glacier or Microsoft Azure Archive Storage
- D) External stages are limited to a maximum of 1,000 files per COPY command
---
## Q34 (Single Answer)
A JSON file contains a single top-level array with multiple JSON objects. A data engineer wants to load each array element as a separate row in the target table. Which file format option should be set to TRUE?

- A) ALLOW_DUPLICATE
- B) MULTI_LINE
- C) STRIP_OUTER_ARRAY
- D) PARSE_ARRAY
---
## Q35 (Single Answer)
A CSV file has 2 header rows at the top that should not be loaded as data records. Which file format option skips those rows?

- A) SKIP_BLANK_LINES = 2
- B) SKIP_HEADER = 2
- C) HEADER_ROWS = 2
- D) PARSE_HEADER = 2
---
## Q36 (Single Answer)
A data engineer wants to load a JSON file and automatically map JSON field names to column names in the target table during a COPY INTO operation. Which copy option enables this behavior?

- A) AUTO_DETECT = TRUE
- B) INFER_SCHEMA = TRUE
- C) MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
- D) MAP_COLUMNS = AUTO
---
## Q37 (Single Answer)
How does a data engineer reorder, omit, or cast columns when loading data using COPY INTO <table>?

- A) Use ALTER TABLE to temporarily rearrange the column order before loading
- B) Use a SELECT statement within the FROM clause of the COPY INTO command
- C) Use the REORDER = TRUE copy option
- D) Use the COLUMN_MAP parameter in FILE_FORMAT
---
## Q38 (Single Answer)
Which stage reference syntax is used to access the current user's personal internal stage in Snowflake?

- A) @%current_user
- B) @user_stage
- C) @~
- D) @/user
---
## Q39 (Single Answer)
A CSV file uses the string 'NA' to represent missing values. Which file format option converts these 'NA' strings to SQL NULL during loading?

- A) EMPTY_FIELD_AS_NULL = TRUE
- B) NULL_IF = ('NA')
- C) REPLACE_NULL = ('NA')
- D) CONVERT_NULL = 'NA'
---
## Q40 (Single Answer)
How does Snowpipe prevent loading the same data file twice and duplicating data?

- A) It checks file size and ETag to detect identical files at load time
- B) It uses file loading metadata (path and name) per pipe object to prevent reloading files with the same name
- C) It relies on the target table's primary keys to detect duplicate rows
- D) It stores a hash of each file's content in the pipe definition
---
## Q41 (Single Answer)
When calling Snowpipe REST endpoints to trigger data loads from a client application, what authentication method is required?

- A) Username and password with multi-factor authentication
- B) OAuth 2.0 bearer token
- C) Key pair authentication with JSON Web Token (JWT)
- D) API key stored in the pipe definition
---
## Q42 (Single Answer)
Which Snowflake command is used to delete files from a Snowflake internal or external stage?

- A) DELETE FILES
- B) DROP FILES
- C) REMOVE (or RM)
- D) PURGE STAGE FILES
---
## Q43 (Single Answer)
When configuring Snowpipe auto-ingest for Amazon S3, what cloud messaging mechanism does Snowflake use to receive notifications that new data files are ready to load?

- A) Amazon CloudWatch Events
- B) Amazon Simple Queue Service (SQS) notifications
- C) Amazon Kinesis Data Streams
- D) AWS Lambda triggers
---
## Q44 (Single Answer)
A data engineer wants to query the load history for files loaded using COPY INTO for a specific table using INFORMATION_SCHEMA. Which table function should they use?

- A) LOAD_HISTORY
- B) COPY_HISTORY
- C) INGEST_HISTORY
- D) FILE_LOAD_STATUS
---
## Q45 (Single Answer)
Which statement accurately describes how bulk data loading using COPY INTO handles transactions in Snowflake?

- A) Each file is loaded in a separate transaction
- B) Loads are always performed in a single transaction
- C) Transactions are disabled during bulk loading for performance
- D) A new transaction is started for each batch of 1,000 records
---
## Q46 (Single Answer)
A data engineer runs COPY INTO with VALIDATION_MODE = RETURN_ERRORS, and the COPY statement includes a SELECT statement to transform data during the load. What is the result?

- A) The validation runs and evaluates only the source file format
- B) The validation ignores the SELECT transformation and validates the raw file
- C) The COPY command returns an error because VALIDATION_MODE does not support COPY statements that transform data during a load
- D) The VALIDATION_MODE is automatically changed to RETURN_ALL_ERRORS
---
## Q47 (Single Answer)
Which set of file formats is supported for loading data INTO Snowflake using the COPY INTO <table> command?

- A) CSV, JSON, Parquet, ORC, Avro, XML
- B) CSV, JSON, Parquet only
- C) CSV, JSON, Parquet, ORC, Avro only
- D) CSV, JSON, XML, HTML, YAML
---
## Q48 (Single Answer)
When preparing large data files for bulk loading, what does Snowflake recommend to prevent records from spanning multiple chunks during file splitting?

- A) Compress files using GZIP before splitting
- B) Split large files by line
- C) Split large files using a fixed byte count
- D) Always use Snowpipe instead of COPY INTO for large files
---
## Q49 (Single Answer)
According to Snowflake best practices for Snowpipe, how frequently should data files be staged in cloud storage for the best balance of cost and performance?

- A) As frequently as possible, multiple times per second
- B) Once per minute
- C) Once per hour at minimum
- D) Once per day for batch efficiency
---
## Q50 (Single Answer)
What is the default value of the ON_ERROR copy option in the COPY INTO <table> command?

- A) CONTINUE
- B) SKIP_FILE
- C) ABORT_STATEMENT
- D) RETURN_ERRORS
---
## Q51 (Multi Answer - Select 2)
Which TWO statements about Snowpipe auto-ingest are correct? (Choose two.)

- A) For AWS, Snowpipe receives file arrival notifications via Amazon SQS
- B) For Azure, Snowpipe receives file arrival notifications via Azure Event Grid
- C) For GCS, Snowpipe receives file arrival notifications via AWS Lambda
- D) Snowpipe auto-ingest requires a user-specified virtual warehouse to be running
- E) Snowpipe auto-ingest is triggered by a COPY INTO command executed on a schedule
---
## Q52 (Multi Answer - Select 2)
Which TWO operations are supported when transforming data during a COPY INTO <table> load using a SELECT statement? (Choose two.)

- A) Reordering columns from the staged file
- B) Filtering rows using a WHERE clause
- C) Joining staged data files to other Snowflake tables
- D) Casting data types using conversion functions such as TO_DATE or TO_DECIMAL
- E) Aggregating data with GROUP BY
---
## Q53 (Multi Answer - Select 2)
Which TWO statements are TRUE about the user stage in Snowflake? (Choose two.)

- A) It is referenced using the @~ syntax
- B) It can be altered using the ALTER STAGE command
- C) It can be dropped using the DROP STAGE command
- D) It is allocated to every Snowflake user automatically, without requiring explicit creation
- E) It requires the CREATE STAGE privilege to access
---
## Q54 (Multi Answer - Select 2)
When creating a Snowpipe pipe with AUTO_INGEST = TRUE for Amazon S3, which TWO objects must already exist before the pipe can be created? (Choose two.)

- A) An Amazon SQS event notification configured on the S3 bucket
- B) An external stage pointing to the S3 bucket
- C) A Snowflake task to schedule the load
- D) A target table where data will be loaded
- E) A named file format object referenced by the pipe
---
## Q55 (Multi Answer - Select 2)
A data engineer wants to implement near-real-time data movement from a source Snowflake table to a target table automatically. Which TWO Snowflake features can be combined to enable this pattern? (Choose two.)

- A) Streams (to capture DML changes on the source table)
- B) Snowpipe (to load files from an external stage)
- C) Dynamic Tables (to replace the source table)
- D) Tasks (to execute COPY/INSERT statements on a schedule, consuming the stream data)
- E) External Tables (to read from cloud storage)
---
## Q56 (Multi Answer - Select 2)
Which TWO statements accurately describe Snowpipe billing? (Choose two.)

- A) Snowpipe is billed according to the compute resources used while loading files
- B) Snowpipe is billed based on the size of the virtual warehouse configured
- C) An overhead charge for managing files in the internal load queue is included in Snowpipe costs
- D) Snowpipe billing is identical to running a MEDIUM warehouse continuously
- E) Snowpipe costs are based solely on the number of pipe objects created
---
## Q57 (Multi Answer - Select 2)
Which TWO statements correctly distinguish bulk loading (COPY INTO) from Snowpipe? (Choose two.)

- A) Bulk loading requires a user-specified virtual warehouse; Snowpipe uses Snowflake-provided serverless compute
- B) Bulk loading stores load metadata for 64 days; Snowpipe stores load metadata for 14 days in the pipe metadata
- C) Bulk loading cannot load semi-structured data; Snowpipe supports all data types
- D) Bulk loading uses per-file billing; Snowpipe is billed by active warehouse hours
- E) Bulk loading uses JWT authentication; Snowpipe uses username and password authentication
---
## Q58 (Multi Answer - Select 2)
Which TWO methods can be used to specify which files to load in a COPY INTO <table> command? (Choose two.)

- A) FILES parameter specifying a list of up to 1,000 individual file names
- B) PATTERN parameter with a regular expression to match file names
- C) LIMIT parameter specifying the maximum number of files to load
- D) RANGE parameter defining the load sequence order
- E) TABLE_FILTER parameter matching file names to table names
---
## Q59 (Multi Answer - Select 3)
Which THREE statements are TRUE about Snowflake external stages? (Choose three.)

- A) External stages reference cloud storage locations such as Amazon S3, Google Cloud Storage, or Microsoft Azure
- B) External stages can be created with either STORAGE_INTEGRATION or CREDENTIALS parameters for authentication to private storage
- C) External stages can access data stored in Amazon S3 Glacier Deep Archive
- D) External stages are database objects created using the CREATE STAGE command
- E) External stages support direct file uploads using the PUT command
---
## Q60 (Multi Answer - Select 3)
Which THREE are valid copy options in the COPY INTO <table> command? (Choose three.)

- A) ON_ERROR = CONTINUE
- B) FORCE = TRUE
- C) OVERWRITE = TRUE
- D) TRUNCATECOLUMNS = TRUE
- E) SINGLE = TRUE
