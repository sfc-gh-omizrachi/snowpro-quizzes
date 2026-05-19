## Q1

**Answer: C**

**Explanation:** Named internal stages are database objects with full privilege management, allowing multiple users to stage files and load into multiple tables. User stages are limited to a single user, and table stages are tied to a single table. Named stages are recommended when regular data loads involve multiple users and/or tables.

**Source:** [Choosing an internal stage for local files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "Named stages are database objects that provide the greatest degree of flexibility for data loading. Users with the appropriate privileges on the stage can load data into any table. Because the stage is a database object, the security/access rules that apply to all objects apply."
---
## Q2

**Answer: B**

**Explanation:** Snowflake recommends files of 100-250 MB compressed for optimal parallel loading. This applies to both bulk loading and Snowpipe. Smaller files increase processing overhead per file, while very large files (e.g., 100 GB+) are not recommended due to the risk of exceeding the 24-hour maximum operation duration.

**Source:** [Preparing your data files](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "To optimize the number of parallel operations for a load, we recommend aiming to produce data files roughly 100-250 MB (or larger) in size compressed."
---
## Q3

**Answer: C**

**Explanation:** Unlike bulk loading which requires a user-specified virtual warehouse, Snowpipe uses Snowflake-provided serverless compute resources that automatically scale based on load volume. Users are billed based on actual compute resource usage rather than warehouse runtime.

**Source:** [Overview of data loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Snowpipe uses compute resources provided by Snowflake (i.e. a serverless compute model). These Snowflake-provided resources are automatically resized and scaled up or down as required, and are charged and itemized using per-second billing."
---
## Q4

**Answer: B, C**

**Explanation:** Snowpipe supports two mechanisms for triggering data loads: (1) automated loading using cloud event notifications (S3 event notifications, Azure Event Grid, GCS Pub/Sub), and (2) explicit REST API calls from a client application that submit file names for loading. Tasks and PUT commands are not mechanisms for triggering Snowpipe.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Automating Snowpipe using cloud messaging: Automated data loads leverage event notifications for cloud storage to inform Snowpipe of the arrival of new data files to load." and "Calling Snowpipe REST endpoints: Your client application calls a public REST endpoint with the name of a pipe object and a list of data filenames."
---
## Q5

**Answer: C**

**Explanation:** The `@%` prefix denotes a table stage. User stages use `@~`, named stages use `@stagename`, and external stages are also referenced by their named stage identifier. Table stages are implicit stages tied to each table and are designed for files loaded into that specific table.

**Source:** [Choosing an internal stage for local files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "A table stage has the same name as the table. For example, a table named mytable has a stage referenced as @%mytable."
---
## Q6

**Answer: B**

**Explanation:** Snowpipe load history is retained for 14 days in the pipe metadata. This is shorter than the 64-day retention for bulk load metadata stored in the target table. Snowpipe load history must be explicitly queried via REST endpoints, SQL table functions, or ACCOUNT_USAGE views.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe: Stored in the metadata of the pipe for 14 days. Must be requested from Snowflake via a REST endpoint, SQL table function, or ACCOUNT_USAGE view."
---
## Q7

**Answer: C**

**Explanation:** The PUT command is the only way to upload files from a local file system to Snowflake internal stages. It does not support external stages. After files are staged using PUT, the COPY INTO <table> command is used to load the data into tables.

**Source:** [PUT](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Uploads one or more data files from a local file system onto an internal stage. After you upload files onto an internal stage, you can load data from the files into a table using the COPY INTO <table> command."
---
## Q8

**Answer: B**

**Explanation:** The PUT command has AUTO_COMPRESS set to TRUE by default, meaning Snowflake automatically compresses files using gzip during upload unless they are already compressed. This reduces storage usage and can improve transfer performance. To upload uncompressed files, set AUTO_COMPRESS = FALSE.

**Source:** [PUT](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "AUTO_COMPRESS = TRUE | FALSE: Specifies whether Snowflake uses gzip to compress files during upload. TRUE: Snowflake compresses the files (if they are not already compressed). Default: TRUE"
---
## Q9

**Answer: B, C**

**Explanation:** PUT cannot be executed from Snowflake web interface worksheets (use SnowSQL or supported drivers instead). PUT compresses files using gzip by default (AUTO_COMPRESS = TRUE). PUT does NOT support uploading to external stages -- only internal stages (user, table, or named internal stages).

**Source:** [PUT](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "The command cannot be executed from the Worksheets page in either Snowflake web interface; instead, use the SnowSQL client or Drivers to upload data files." and "AUTO_COMPRESS = TRUE | FALSE ... TRUE: Snowflake compresses the files (if they are not already compressed) ... Default: TRUE"
---
## Q10

**Answer: D**

**Explanation:** The FORCE copy option is not supported in pipe definitions for Snowpipe. Other unsupported options include FILES, ON_ERROR = ABORT_STATEMENT, SIZE_LIMIT, PURGE, RETURN_FAILED_ONLY, and VALIDATION_MODE. PATTERN, FILE_FORMAT, and MATCH_BY_COLUMN_NAME are all supported in pipe definitions.

**Source:** [CREATE PIPE](https://docs.snowflake.com/en/sql-reference/sql/create-pipe)

**Quote:** "All COPY INTO <table> copy options are supported except for the following: FILES, ON_ERROR = ABORT_STATEMENT, SIZE_LIMIT, PURGE, FORCE, RETURN_FAILED_ONLY, VALIDATION_MODE."
---
## Q11

**Answer: B**

**Explanation:** The VALIDATE table function is used after a COPY INTO command has been executed. It takes a table name and a JOB_ID (query ID or '_last') and returns all errors encountered during the specified load operation, not just the first error per file. It does not validate syntax or schemas proactively.

**Source:** [VALIDATE](https://docs.snowflake.com/en/sql-reference/functions/validate)

**Quote:** "Validates the files loaded in a past execution of the COPY INTO <table> command and returns all the errors encountered during the load, rather than just the first error."
---
## Q12

**Answer: A, C**

**Explanation:** VALIDATE has two key limitations: (1) it returns no results for loads that used ON_ERROR = ABORT_STATEMENT (the default), and (2) it fails when SELECT transformations were used in the COPY INTO operation. It does return ALL errors (not just the first), and it does not require ACCOUNTADMIN.

**Source:** [VALIDATE](https://docs.snowflake.com/en/sql-reference/functions/validate)

**Quote:** "The validation returns no results for COPY statements that specify ON_ERROR = ABORT_STATEMENT (default value)." and "Validation fails if: SELECT statements are used to transform data during a COPY INTO <table> operation."
---
## Q13

**Answer: C**

**Explanation:** The FILES parameter in COPY INTO <table> allows specifying up to 1,000 individual file names per command. While this is generally the fastest method for identifying files to load, the 1,000-file limit means additional COPY commands are needed for larger file sets. Alternatives include path prefixes and PATTERN matching.

**Source:** [Loading data](https://docs.snowflake.com/en/user-guide/data-load-considerations-load)

**Quote:** "The FILES parameter supports a maximum of 1,000 files, meaning a COPY command executed with the FILES parameter can only load up to 1,000 files."
---
## Q14

**Answer: A, C, E**

**Explanation:** Snowflake supports unloading data to only three file format types: delimited text (CSV/TSV), JSON, and Parquet. Avro, ORC, and XML are supported for loading data INTO Snowflake but are not available as output formats when unloading. This is a key distinction between loading and unloading capabilities.

**Source:** [File formats to unload data](https://docs.snowflake.com/en/user-guide/data-unload-prepare)

**Quote:** "The following file formats are supported [for unloading]: Structured - Delimited (CSV, TSV, etc.), Semi-structured - JSON, Parquet."
---
## Q15

**Answer: C**

**Explanation:** The Snowflake documentation explicitly recommends using FIELD_OPTIONALLY_ENCLOSED_BY to enclose strings in quotes as the preferred approach for distinguishing empty strings from NULL values in unloaded CSV files. Setting EMPTY_FIELD_AS_NULL = TRUE (default) makes them indistinguishable. The alternative is to set EMPTY_FIELD_AS_NULL = FALSE and use NULL_IF for a replacement string.

**Source:** [Data unloading considerations](https://docs.snowflake.com/en/user-guide/data-unload-considerations)

**Quote:** "Preferred: Enclose strings in quotes by setting the FIELD_OPTIONALLY_ENCLOSED_BY option, to distinguish empty strings from NULLs in output CSV files."
---
## Q16

**Answer: B**

**Explanation:** When unloading data, Snowflake splits output into multiple files by default, each up to 16 MB (16,777,216 bytes). This default can be increased up to 5 GB for cloud storage stages. Splitting data into multiple files enables parallel operations and improves performance.

**Source:** [Data unloading considerations](https://docs.snowflake.com/en/user-guide/data-unload-considerations)

**Quote:** "The maximum size for each file is set using the MAX_FILE_SIZE copy option. The default value is 16777216 (16 MB)."
---
## Q17

**Answer: A, C**

**Explanation:** To unload all data into a single file, you must set SINGLE = TRUE. Additionally, if the data exceeds the default 16 MB MAX_FILE_SIZE, you need to increase MAX_FILE_SIZE to accommodate the full dataset (up to 5 GB). SINGLE = TRUE alone may not be enough if the data exceeds the file size limit.

**Source:** [Data unloading considerations](https://docs.snowflake.com/en/user-guide/data-unload-considerations)

**Quote:** "To unload data to a single output file (at the potential cost of decreased performance), specify the SINGLE = true copy option in your statement." and "Increase the MAX_FILE_SIZE limit to accommodate the large data set."
---
## Q18

**Answer: C**

**Explanation:** OBJECT_CONSTRUCT is the function used to convert relational table rows into JSON objects for unloading. Each row's columns are mapped to key-value pairs. The resulting VARIANT column can then be unloaded to JSON files using COPY INTO <location> with FILE_FORMAT = (TYPE = JSON).

**Source:** [Data unloading considerations](https://docs.snowflake.com/en/user-guide/data-unload-considerations)

**Quote:** "You can use the OBJECT_CONSTRUCT function combined with the COPY command to convert the rows in a relational table to a single VARIANT column and unload the rows into a file."
---
## Q19

**Answer: C**

**Explanation:** The GET command is used to download files from internal stages to a local file system. It supports named internal stages, table stages, and user stages. GET does not support downloading from external stages -- for those, you must use cloud provider utilities. Like PUT, GET cannot be run from the web interface.

**Source:** [GET](https://docs.snowflake.com/en/sql-reference/sql/get)

**Quote:** "Downloads data files from one of the following internal stage types to a local directory or folder on a client machine: Named internal stage, Internal stage for a specified table, Internal stage for the current user."
---
## Q20

**Answer: B, C**

**Explanation:** GET can download files from named internal stages, table stages, and user stages -- but NOT from external stages. It also cannot be executed from the Snowflake web interface worksheets; you must use SnowSQL or a supported driver. GET does not compress files; it decrypts them automatically during download.

**Source:** [GET](https://docs.snowflake.com/en/sql-reference/sql/get)

**Quote:** "GET does not support the following actions: Downloading files from external stages." and "The command cannot be executed from the Worksheets page in either Snowflake web interface."
---
## Q21

**Answer: B**

**Explanation:** The LIST (or LS) command returns a list of files stored in a stage, including file name, size, MD5 hash, and last modified timestamp. It works with all stage types: named internal, named external, table, and user stages. It does not read file contents or provide information about pipe status.

**Source:** [LIST](https://docs.snowflake.com/en/sql-reference/sql/list)

**Quote:** "Returns a list of files from one of the following Snowflake storage features: Stage (Named internal, Named external, For a specified table, For the current user), Git repository clone in Snowflake."
---
## Q22

**Answer: B**

**Explanation:** When unloading data to Parquet files, the supported compression options are AUTO, LZO, SNAPPY, and NONE. This differs from CSV/JSON unloading which supports GZIP, BZ2, BROTLI, ZSTD, DEFLATE, RAW_DEFLATE, and NONE. GZIP and BZ2 are not supported for Parquet unloading.

**Source:** [COPY INTO location](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location)

**Quote:** "If FILE_FORMAT = ( TYPE = PARQUET ... ) COMPRESSION = AUTO | LZO | SNAPPY | NONE"
---
## Q23

**Answer: B, D**

**Explanation:** Table stages are implicit stages tied to tables, referenced using the @%tablename syntax. They have no grantable privileges of their own since they are not separate database objects. Table stages cannot be altered or dropped, do not support transformations during loading, and files staged in a table stage can only be loaded into that specific table.

**Source:** [Choosing an internal stage for local files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "A table stage is an implicit stage tied to a table object. It's not a separate database object. As a result, a table stage has no grantable privileges of its own." and "A table stage has the same name as the table. For example, a table named mytable has a stage referenced as @%mytable."
---
## Q24

**Answer: C**

**Explanation:** Snowflake retains load metadata for 64 days for bulk loading operations. This metadata includes file names, sizes, eTags, row counts, timestamps, and error information. After 64 days, the COPY command cannot determine whether a file has been loaded, and by default skips such files. Use LOAD_UNCERTAIN_FILES or FORCE to load files with expired metadata.

**Source:** [Loading data](https://docs.snowflake.com/en/user-guide/data-load-considerations-load)

**Quote:** "This load metadata expires after 64 days."
---
## Q25

**Answer: C**

**Explanation:** The CONTINUE option tells Snowflake to skip individual rows with errors and continue loading all valid rows across all files. ABORT_STATEMENT (the default) stops on the first error, SKIP_FILE skips an entire file when any error is found, and FAIL_SAFE is a data recovery feature unrelated to COPY INTO error handling.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "CONTINUE: Continue loading the file. The COPY command does not load the rows that generated errors, but does load all other rows. The COPY command returns one row of error information for each error encountered."
---
## Q26

**Answer: C**

**Explanation:** SKIP_FILE tells Snowflake to skip an entire file when any error is encountered in that file, but continue processing all other files in the load operation. CONTINUE would skip only the bad rows (not the whole file). ABORT_STATEMENT stops the entire operation on the first error. SKIP_ROW is not a valid ON_ERROR option.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "ON_ERROR = { CONTINUE | SKIP_FILE | SKIP_FILE_<num> | 'SKIP_FILE_<num>%' | ABORT_STATEMENT }"
---
## Q27

**Answer: C**

**Explanation:** The PURGE = TRUE option automatically deletes staged files from the stage after a successful load. This applies to both internal and external stages. Files with load errors are not removed when PURGE is enabled. The stage object itself is not dropped, and load metadata is preserved separately.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "PURGE = TRUE | FALSE: String (constant) that specifies whether to automatically remove the data files from the stage after the data is loaded successfully."
---
## Q28

**Answer: C**

**Explanation:** FORCE = TRUE bypasses the load metadata check and reloads all specified files regardless of whether they have been loaded before. This is useful for reprocessing files but can cause data duplication. The default is FALSE, which skips files already recorded in the load history.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "FORCE = TRUE | FALSE: Boolean that specifies to load all files, regardless of whether they've been loaded previously and have not changed since they were loaded. Note that this option reloads files, potentially duplicating data in a table."
---
## Q29

**Answer: B**

**Explanation:** TRUNCATECOLUMNS = TRUE silently truncates string values that are longer than the target column definition instead of producing an error. The default is FALSE, which causes the load to error when a string is too long. ENFORCE_LENGTH is the inverse of TRUNCATECOLUMNS (ENFORCE_LENGTH = FALSE has the same effect as TRUNCATECOLUMNS = TRUE).

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "TRUNCATECOLUMNS = TRUE | FALSE: String (constant) that specifies whether to truncate text strings that exceed the target column length: TRUE: Strings are automatically truncated to the target column length. FALSE: The COPY command produces an error if a loaded string exceeds the target column length."
---
## Q30

**Answer: B**

**Explanation:** RETURN_ALL_ERRORS is the most comprehensive VALIDATION_MODE option — it returns all errors across all files, including partial loads from prior CONTINUE-mode operations. RETURN_ERRORS returns errors only from the current COPY statement's validation pass. RETURN_n_ROWS validates only the specified number of rows and stops at the first error.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "RETURN_ALL_ERRORS: Returns all errors across all files specified in the COPY statement, including files with errors that were partially loaded during an earlier load because the ON_ERROR copy option was set to CONTINUE during the load."
---
## Q31

**Answer: C**

**Explanation:** The PATTERN parameter accepts a regular expression to filter which files are loaded from a stage. It is applied to the file paths in the stage and only files whose names match the pattern are loaded. The FILES parameter specifies exact file names (not patterns). There is no MATCH or FILTER parameter in COPY INTO.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "PATTERN = '<regex_pattern>': A regular expression pattern string, enclosed in single quotes, specifying the file names and/or paths to match."
---
## Q32

**Answer: B**

**Explanation:** STORAGE_INTEGRATION creates a Snowflake object that stores a generated IAM user identity, delegating authentication to a Snowflake-managed IAM entity. This avoids embedding credentials (AWS keys, SAS tokens) directly in stage definitions or COPY commands. Credentials embedded in SQL are a security risk and can be inadvertently exposed in query history or worksheets.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "We highly recommend the use of storage integrations. This option avoids the need to supply cloud storage credentials using the CREDENTIALS parameter when creating stages or loading data."
---
## Q33

**Answer: C**

**Explanation:** Snowflake cannot load data from archival cloud storage tiers that require restoration before access, such as Amazon S3 Glacier or Microsoft Azure Archive Storage. Data must be in an accessible (non-archived) storage tier to be loaded into Snowflake. This restriction applies to all COPY INTO commands.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "You cannot access data held in archival cloud storage classes that requires restoration before it can be retrieved. These archival storage classes include, for example, the Amazon S3 Glacier Flexible Retrieval or Glacier Deep Archive storage class, or Microsoft Azure Archive Storage."
---
## Q34

**Answer: C**

**Explanation:** STRIP_OUTER_ARRAY = TRUE removes the outermost JSON array brackets and treats each element in the array as a separate row to load. Without this option, the entire JSON array is loaded as a single VARIANT value. ALLOW_DUPLICATE allows duplicate object keys, MULTI_LINE enables multi-line records, and PARSE_ARRAY is not a valid option.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "STRIP_OUTER_ARRAY = TRUE | FALSE: Boolean that instructs the JSON parser to remove outer brackets [ ] from JSON documents, effectively loading the records in the outer array as individual table rows."
---
## Q35

**Answer: B**

**Explanation:** SKIP_HEADER specifies the number of header lines at the beginning of a file to skip before loading data records. Setting SKIP_HEADER = 2 skips the first two lines. Note that SKIP_HEADER uses CRLF-delimited lines, not the RECORD_DELIMITER or FIELD_DELIMITER values. PARSE_HEADER (a different option) uses the first row's content to determine column names.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "SKIP_HEADER = <integer>: Number of lines at the start of the file to skip."
---
## Q36

**Answer: C**

**Explanation:** MATCH_BY_COLUMN_NAME automatically maps columns in the source data to columns in the target table by column name, either case-sensitively or case-insensitively. This is particularly useful for loading JSON, Avro, Parquet, and ORC data where field names should align with table column names. AUTO_DETECT and INFER_SCHEMA are separate features for schema detection, not column mapping during load.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "MATCH_BY_COLUMN_NAME = CASE_SENSITIVE | CASE_INSENSITIVE | NONE: String (constant) that specifies whether to load semi-structured data into columns in the target table that match corresponding columns represented in the data."
---
## Q37

**Answer: B**

**Explanation:** Snowflake supports data transformation during load by using a SELECT statement within the FROM clause of COPY INTO. The SELECT list can reorder columns (by specifying positional references like $1, $2), omit columns, apply type casts, and use supported scalar functions. This eliminates the need for temporary staging tables for basic ETL transformations.

**Source:** [Transform data during a load](https://docs.snowflake.com/en/user-guide/data-load-transform)

**Quote:** "Column reordering, column omission, and casts using a SELECT statement. There is no requirement for your data files to have the same number and ordering of columns as your target table."
---
## Q38

**Answer: C**

**Explanation:** The `@~` syntax is the Snowflake shorthand for the current user's personal internal stage. Each Snowflake user has an automatically allocated user stage that is accessed using this syntax (e.g., `PUT file:///data/data.csv @~/staged;`). Table stages use `@%tablename` and named stages use `@stagename`.

**Source:** [Staging data files from a local file system](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage)

**Quote:** "Note that the @~ character combination identifies a user stage."
---
## Q39

**Answer: B**

**Explanation:** NULL_IF specifies one or more strings in the source data that should be converted to SQL NULL during loading. Setting NULL_IF = ('NA') converts every occurrence of the string 'NA' to SQL NULL. EMPTY_FIELD_AS_NULL handles empty fields (two consecutive delimiters) rather than specific placeholder strings like 'NA'.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "NULL_IF = ( [ '<string>' [ , '<string>' ... ] ] ): String used to convert to and from SQL NULL. Snowflake replaces these strings in the data load source with SQL NULL."
---
## Q40

**Answer: B**

**Explanation:** Snowpipe tracks loaded files via metadata associated with each individual pipe object (not the target table). It stores the file path and name, preventing re-ingest of the same file — even if the file's content changes. This metadata is retained for 14 days. If data duplication avoidance is needed beyond 14 days, additional mechanisms (like LOAD_UNCERTAIN_FILES) are required.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe uses file loading metadata associated with each pipe object to prevent reloading the same files (and duplicating data) in a table. This metadata stores the path (i.e. prefix) and name of each loaded file, and prevents loading files with the same name even if they were later modified (i.e. have a different eTag)."
---
## Q41

**Answer: C**

**Explanation:** Snowpipe REST API endpoints require key pair authentication using JSON Web Tokens (JWT) signed with RSA encryption. This is different from bulk loading, which uses the standard session authentication supported by the Snowflake client. OAuth and API keys stored in the pipe definition are not supported for Snowpipe REST API authentication.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe: When calling the REST endpoints: Requires key pair authentication with JSON Web Token (JWT). JWTs are signed using a public/private key pair with RSA encryption."
---
## Q42

**Answer: C**

**Explanation:** The REMOVE (or RM) command deletes files from internal or external Snowflake stages. It supports the same stage path syntax as other stage commands. DELETE FILES and DROP FILES are not valid Snowflake commands. PURGE is a copy option in COPY INTO that removes files automatically after loading, not a standalone command.

**Source:** [Staging data files from a local file system](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage)

**Quote:** "Removes files from either an internal (i.e. Snowflake) named stage or an external stage. REMOVE can be abbreviated to RM."
---
## Q43

**Answer: B**

**Explanation:** Snowpipe auto-ingest for Amazon S3 uses Amazon SQS (Simple Queue Service) to receive event notifications from S3 when new files are available. Snowflake manages SQS queues automatically — the SQS queue ARN is visible in the SHOW PIPES output's `notification_channel` column. This is distinct from AWS Lambda, CloudWatch Events, or Kinesis.

**Source:** [Automating Snowpipe for Amazon S3](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3)

**Quote:** "This topic provides instructions for triggering Snowpipe data loads from external stages on S3 automatically using Amazon SQS (Simple Queue Service) notifications for an S3 bucket."
---
## Q44

**Answer: B**

**Explanation:** The COPY_HISTORY table function in INFORMATION_SCHEMA (accessed via `TABLE(INFORMATION_SCHEMA.COPY_HISTORY(...))`) returns load history including file names, status, row counts, and error information for a specified table within the last 14 days. The LOAD_HISTORY view in ACCOUNT_USAGE tracks the same data but has up to 3 hours latency. INGEST_HISTORY and FILE_LOAD_STATUS are not valid Snowflake functions.

**Source:** [Loading data](https://docs.snowflake.com/en/user-guide/data-load-considerations-load)

**Quote:** "Returns the load activity for a specified table within the last 14 days."
---
## Q45

**Answer: B**

**Explanation:** Bulk loading with COPY INTO always executes as a single transaction. Either all files (or the valid rows across files, depending on ON_ERROR setting) are committed together, or the transaction is rolled back. This differs from Snowpipe, which may combine or split loads into multiple transactions based on file count and row volume.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Bulk data load: Loads are always performed in a single transaction. Data is inserted into table alongside any other SQL statements submitted manually by users."
---
## Q46

**Answer: C**

**Explanation:** VALIDATION_MODE is incompatible with COPY statements that include a SELECT transformation. When both are specified, Snowflake returns an error. To validate files that will be transformed during loading, you must run VALIDATION_MODE on the source files without the SELECT transformation, or validate the source file format separately.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "VALIDATION_MODE does not support COPY statements that transform data during a load. If the parameter is specified, the COPY statement returns an error."
---
## Q47

**Answer: A**

**Explanation:** Snowflake's COPY INTO <table> command supports loading six file format types: CSV, JSON, Avro, ORC, Parquet, and XML. This is the complete list for loading. For UNLOADING data (COPY INTO <location>), only CSV, JSON, and Parquet are supported. HTML, YAML, and other formats are not supported for loading.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "TYPE = { CSV | JSON | AVRO | ORC | PARQUET | XML } [ formatTypeOptions ]"
---
## Q48

**Answer: B**

**Explanation:** When splitting large data files for parallel loading, Snowflake recommends splitting by line (record boundary) rather than by byte count. Splitting by byte count risks breaking a record in the middle, causing records to span across file chunks and resulting in load errors. The Linux `split` utility with the `-l` flag splits by line count.

**Source:** [Preparing your data files](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "We recommend splitting large files by line to avoid records that span chunks."
---
## Q49

**Answer: B**

**Explanation:** Snowflake recommends staging files once per minute for Snowpipe to balance cost and latency. Staging more frequently (e.g., multiple times per second) increases overhead costs for managing files in the internal load queue without necessarily reducing latency. Staging less frequently increases latency between file creation and when data is available for query.

**Source:** [Preparing your data files](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "If it takes longer than one minute to accumulate MBs of data in your source application, consider creating a new (potentially smaller) data file once per minute. This approach typically leads to a good balance between cost (that is, resources spent on Snowpipe queue management and the actual load) and performance (that is, load latency)."
---
## Q50

**Answer: C**

**Explanation:** The default value for ON_ERROR is ABORT_STATEMENT, which causes the COPY operation to stop processing on the first error encountered, rolling back any uncommitted rows from the current transaction. CONTINUE and SKIP_FILE must be explicitly specified. Understanding the default is critical because it affects how errors are handled when no ON_ERROR option is set.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "ON_ERROR = { CONTINUE | SKIP_FILE | SKIP_FILE_<num> | 'SKIP_FILE_<num>%' | ABORT_STATEMENT }"
---
## Q51

**Answer: A, B**

**Explanation:** Snowpipe auto-ingest uses cloud-provider-specific event messaging: Amazon SQS for AWS S3, Azure Event Grid for Microsoft Azure Blob Storage, and Google Cloud Pub/Sub for GCS. It uses Snowflake-provided serverless compute (not user-specified warehouses) and is not triggered by scheduled COPY INTO commands or AWS Lambda.

**Source:** [Automating Snowpipe for Amazon S3](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3)

**Quote:** "Automated data loads leverage event notifications for cloud storage to inform Snowpipe of the arrival of new data files to load." and "Triggering automated Snowpipe data loads using S3 event messages is supported... using Amazon SQS (Simple Queue Service) notifications for an S3 bucket."
---
## Q52

**Answer: A, D**

**Explanation:** COPY INTO SELECT transformations support column reordering, column omission, and type casting (answer A and D). WHERE clause filtering, JOIN operations, and GROUP BY aggregations are explicitly NOT supported. COPY transformations are designed for structural transformations only — not row filtering or aggregations, which should be handled after loading.

**Source:** [Transform data during a load](https://docs.snowflake.com/en/user-guide/data-load-transform)

**Quote:** "The COPY command supports: Column reordering, column omission, and casts using a SELECT statement." and "Filtering the results of a FROM clause using a WHERE clause is not supported. The ORDER BY, LIMIT, FETCH, TOP keywords in SELECT statements are also not supported."
---
## Q53

**Answer: A, D**

**Explanation:** Every Snowflake user automatically has a personal user stage accessible via `@~` without any explicit creation. User stages cannot be altered (ALTER STAGE) or dropped (DROP STAGE) — they are implicit objects tied to user accounts, not database objects. No special CREATE STAGE privilege is needed to use your own user stage.

**Source:** [Staging data files from a local file system](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage)

**Quote:** "Note that the @~ character combination identifies a user stage." and "Each user in Snowflake is automatically allocated a stage..."
---
## Q54

**Answer: B, D**

**Explanation:** To create a pipe with AUTO_INGEST = TRUE, you need: (1) an external stage pointing to the S3 bucket (which the pipe's COPY INTO statement references as the FROM source), and (2) a target table (where data will be loaded). The SQS event notification is configured AFTER the pipe is created (the pipe definition itself generates the SQS ARN visible via SHOW PIPES). A named file format is optional (can be specified inline).

**Source:** [Automating Snowpipe for Amazon S3](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3)

**Quote:** "The pipe defines the COPY INTO <table> statement used by Snowpipe to load data from the ingestion queue into the target table." and "Create an external stage that references your S3 bucket using the CREATE STAGE command."
---
## Q55

**Answer: A, D**

**Explanation:** The canonical Snowflake pattern for near-real-time table-to-table data movement uses Streams combined with Tasks. A Stream captures DML changes (inserts, updates, deletes) on the source table as they occur. A Task runs on a schedule to consume stream data and execute SQL statements (such as MERGE or INSERT) to propagate those changes to the target table. Snowpipe is for loading files from external stages, not for table-to-table movement.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowflake supports transforming data while loading it into a table using the COPY INTO <table> command, dramatically simplifying your ETL pipeline for basic transformations."
---
## Q56

**Answer: A, C**

**Explanation:** Snowpipe billing has two components: (1) compute resource usage for the actual data loading, and (2) a queue management overhead charge proportional to the number of files queued. This is why Snowflake recommends files of 100-250 MB — smaller files increase the overhead-to-data ratio. There is no pre-configured warehouse for Snowpipe; it uses Snowflake-provided serverless compute.

**Source:** [Preparing your data files](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "Billed according to the compute resources used in the Snowpipe warehouse while loading the files." and "An overhead to manage files in the internal load queue is included in the utilization costs charged for Snowpipe. This overhead increases in relation to the number of files queued for loading."
---
## Q57

**Answer: A, B**

**Explanation:** The two most important differences between bulk loading and Snowpipe are compute resources (user warehouse vs. serverless) and load history retention (64 days in table metadata vs. 14 days in pipe metadata). Both support all Snowflake data types including semi-structured data. Bulk loading uses session authentication; Snowpipe REST requires JWT.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Bulk data load: Requires a user-specified warehouse to execute COPY statements. Snowpipe: Uses Snowflake-supplied compute resources." and "Bulk data load: Stored in the metadata of the target table for 64 days. Snowpipe: Stored in the metadata of the pipe for 14 days."
---
## Q58

**Answer: A, B**

**Explanation:** COPY INTO supports two methods for selecting specific files: the FILES parameter (up to 1,000 explicit file names) and the PATTERN parameter (a regex applied to file names/paths). LIMIT, RANGE, and TABLE_FILTER are not valid COPY INTO parameters. The documentation notes that FILES and PATTERN should generally not be used together.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "FILES = ( '<file_name>' [ , '<file_name>' ] [ , ... ] ): Specifies a list of one or more files names (separated by commas) to be loaded. The maximum number of files names that can be specified is 1000." and "PATTERN = '<regex_pattern>': A regular expression pattern string, enclosed in single quotes, specifying the file names and/or paths to match."
---
## Q59

**Answer: A, B, D**

**Explanation:** External stages (A) reference cloud storage on AWS S3, GCS, or Azure; (B) they can be created with STORAGE_INTEGRATION (recommended) or CREDENTIALS for authentication to private buckets; (D) they are named database objects created with CREATE STAGE. They CANNOT access archival storage (Glacier, Azure Archive) — ruling out option C. External stages also do NOT support the PUT command (which is for internal stages only), ruling out option E.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "Named external stage that references an external location (Amazon S3, Google Cloud Storage, or Microsoft Azure)." and "We highly recommend the use of storage integrations. This option avoids the need to supply cloud storage credentials using the CREDENTIALS parameter when creating stages or loading data." and "You cannot access data held in archival cloud storage classes that requires restoration before it can be retrieved."
---
## Q60

**Answer: A, B, D**

**Explanation:** ON_ERROR = CONTINUE (A), FORCE = TRUE (B), and TRUNCATECOLUMNS = TRUE (D) are all valid copy options in COPY INTO <table>. OVERWRITE = TRUE (C) is a copy option for COPY INTO <location> (unloading), not for loading. SINGLE = TRUE (E) is also a COPY INTO <location> option for unloading, not a loading copy option.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "copyOptions ::= ... FORCE = TRUE | FALSE ... ON_ERROR = { CONTINUE | SKIP_FILE | ... | ABORT_STATEMENT } ... TRUNCATECOLUMNS = TRUE | FALSE ..."
