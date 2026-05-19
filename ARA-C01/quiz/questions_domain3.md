# Domain 3: Data Engineering

---

## Q1 (Single Answer)
A financial services company loads CSV files into Snowflake from an on-premises SFTP server. They recently discovered that some source files contain an additional column not present in the target table. The team wants Snowflake to automatically adapt to such schema changes without manual DDL intervention. Which combination of features should the architect recommend?
- A) Enable MATCH_BY_COLUMN_NAME and SCHEMA_EVOLUTION on the target table with ENABLE_SCHEMA_EVOLUTION = TRUE
- B) Use an external table with AUTO_REFRESH = TRUE and INFER_SCHEMA enabled
- C) Create a variant column in the target table and parse new columns at query time
- D) Use Snowpipe with STRIP_OUTER_ARRAY = TRUE to dynamically handle schema changes

---

## Q2 (Scenario)
An architect is designing a near-real-time ingestion pipeline for IoT sensor data arriving at 500,000 events per second. The data must be queryable within 10 seconds of generation. The solution should minimize file management overhead and cloud storage staging costs. Which ingestion method is most appropriate?
- A) Snowpipe with auto-ingest from an S3 bucket using SQS notifications
- B) Snowpipe Streaming via the Snowflake Ingest SDK
- C) A scheduled COPY INTO task running every 10 seconds
- D) Kafka connector writing to an external stage followed by Snowpipe
- E) INSERT INTO statements via a Python application using the Snowflake connector

---

## Q3 (Single Answer)
A company uses COPY INTO to load gzip-compressed JSON files from Azure Blob Storage. They notice that load metadata in the COPY_HISTORY table only retains information for 14 days. An architect needs to determine whether a specific file was loaded 20 days ago to prevent duplicate loading. What is the recommended approach?
- A) Query the LOAD_HISTORY view in the INFORMATION_SCHEMA which retains 14 days of history
- B) Query the COPY_HISTORY function in INFORMATION_SCHEMA and extend retention with a parameter
- C) Query the LOAD_HISTORY view in ACCOUNT_USAGE schema which retains 365 days of history
- D) Enable TIME TRAVEL on the stage object to retrieve historical load metadata

---

## Q4 (Multi Answer - Select 2)
Which TWO statements correctly describe the behavior of Snowpipe Streaming compared to standard Snowpipe? (Select TWO)
- A) Snowpipe Streaming requires files to be staged in cloud storage before ingestion
- B) Snowpipe Streaming writes rows directly into Snowflake table storage without requiring a stage
- C) Snowpipe Streaming provides exactly-once delivery semantics through offset token management
- D) Snowpipe Streaming uses serverless compute and bills based on file notifications processed
- E) Snowpipe Streaming has higher latency than standard Snowpipe but lower cost per row

---

## Q5 (Scenario)
An e-commerce company unloads daily transaction data from Snowflake to an S3 bucket for consumption by a downstream Spark cluster. The Spark team requires the data to be partitioned by transaction_date and region, stored as Parquet, with each partition containing a single file. Which COPY INTO <location> configuration achieves this?
- A) COPY INTO @s3_stage/output/ FROM (SELECT * FROM transactions) FILE_FORMAT = (TYPE = PARQUET) PARTITION BY ('transaction_date', 'region') SINGLE = TRUE
- B) COPY INTO @s3_stage/output/ FROM (SELECT * FROM transactions) FILE_FORMAT = (TYPE = PARQUET) PARTITION BY ('transaction_date' || '/' || 'region') SINGLE = TRUE
- C) COPY INTO @s3_stage/output/ FROM (SELECT transaction_date, region, * FROM transactions) FILE_FORMAT = (TYPE = PARQUET) PARTITION BY (transaction_date, region) SINGLE = FALSE MAX_FILE_SIZE = 5368709120
- D) COPY INTO @s3_stage/output/ FROM (SELECT * FROM transactions) FILE_FORMAT = (TYPE = PARQUET) PARTITION BY (transaction_date, region) SINGLE = TRUE OVERWRITE = TRUE

---

## Q6 (Single Answer)
An architect is evaluating whether to use a managed Iceberg table or an unmanaged (externally cataloged) Iceberg table for a data lakehouse architecture. The requirement is that Snowflake must serve as the primary write engine while an external Spark cluster needs read access to the same data via the Iceberg REST catalog. Which option best satisfies these requirements?
- A) Unmanaged Iceberg table, because Snowflake cannot write to Iceberg tables
- B) Managed Iceberg table, because Snowflake manages the table lifecycle and can expose metadata through an Iceberg REST catalog integration
- C) Standard Snowflake table with data sharing to make data accessible to Spark
- D) External table pointing to Iceberg metadata, since external tables support both read and write operations

---

## Q7 (Single Answer)
A healthcare organization loads HL7 FHIR data from multiple hospital systems via REST APIs. Each API response is a nested JSON document averaging 15 KB. The data arrives continuously and must be available for analytics within 1 minute. The architect also needs to track which records have been successfully ingested to support resume-on-failure. Which architecture is most appropriate?
- A) Write API responses to S3 as JSON files, configure Snowpipe auto-ingest with SQS notifications, and rely on COPY_HISTORY for tracking
- B) Use Snowpipe Streaming with the Ingest SDK, leveraging offset tokens for exactly-once semantics and resume capability
- C) Use an external table with AUTO_REFRESH pointed at a continuously updated S3 prefix
- D) Schedule a COPY INTO task every 30 seconds pulling from a named internal stage

---

## Q8 (Multi Answer - Select 2)
An architect is configuring COPY INTO to load semi-structured data with robust error handling. Which TWO parameter combinations allow the load to continue despite errors while also capturing rejected records for later analysis? (Select TWO)
- A) ON_ERROR = CONTINUE with VALIDATION_MODE = RETURN_ERRORS
- B) ON_ERROR = CONTINUE, then query the VALIDATE function on the last COPY INTO execution
- C) ON_ERROR = SKIP_FILE_3 with ERROR_LIMIT = 3
- D) ON_ERROR = ABORT_STATEMENT with REJECT_DATA_PATH specified
- E) ON_ERROR = CONTINUE with rejected records automatically logged when ENABLE_ERROR_LOGGING = TRUE

---

## Q9 (Scenario)
A retail company performs a full reload of their 2 TB product catalog table every night from a Parquet data lake on GCS. The process currently takes 4 hours. The architect notices that only 5% of records change daily. The business requires the Snowflake table to exactly match the source after each load. Which strategy most effectively reduces load time while maintaining data consistency?
- A) Switch to Snowpipe for continuous micro-batch loading throughout the day
- B) Implement an incremental load pattern using a staging table and MERGE statement, comparing checksums to identify changed records
- C) Use INSERT OVERWRITE to atomically replace the table contents each night
- D) Create an external table over the GCS data and use materialized views for query acceleration
- E) Use streams on the source to capture changes and apply them via a task

---

## Q10 (Single Answer)
When using the INFER_SCHEMA function with COPY INTO for Parquet files, an architect notices that column ordering in the target table does not match the Parquet file's physical column order. Which parameter must be used during the COPY INTO to ensure correct column mapping regardless of order?
- A) MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
- B) FORCE = TRUE
- C) COLUMN_MAPPING = AUTO
- D) STRIP_NULL_VALUES = TRUE

---

## Q11 (Scenario)
A media company ingests clickstream data from Kafka using the Snowflake Kafka Connector. They currently use Snowpipe mode but are experiencing 2-3 minute latency due to micro-batch file creation. The business demands sub-second query freshness. What architectural change should the architect recommend?
- A) Reduce the Kafka connector's buffer.flush.time to 1 second
- B) Switch the Kafka connector from Snowpipe mode to Snowpipe Streaming mode
- C) Replace the Kafka connector with direct JDBC inserts from a Kafka consumer application
- D) Increase the number of Kafka connector tasks to parallelize file creation
- E) Use the Kafka connector to write to an external table instead

---

## Q12 (Single Answer)
An organization is loading data from an Oracle RDBMS into Snowflake. The Oracle tables contain columns with Oracle-specific data types such as CLOB, BLOB, and XMLTYPE. The architect must design a reliable extraction and loading process. Which approach is most architecturally sound?
- A) Use Oracle's DBMS_DATAPUMP to export directly to Snowflake internal stage
- B) Extract data to CSV using Oracle utilities, converting CLOBs to VARCHAR and BLOBs to HEX-encoded strings, then use COPY INTO with appropriate transformations
- C) Use Snowflake's native Oracle connector to directly replicate all data types
- D) Load the raw Oracle export files into a VARIANT column and parse at query time

---

## Q13 (Multi Answer - Select 2)
Which TWO characteristics differentiate managed Iceberg tables from unmanaged Iceberg tables in Snowflake? (Select TWO)
- A) Managed Iceberg tables store data files and metadata in a Snowflake-managed external volume
- B) Unmanaged Iceberg tables can be written to by both Snowflake and external engines simultaneously without coordination
- C) Managed Iceberg tables support full Snowflake DML operations (INSERT, UPDATE, DELETE, MERGE)
- D) Unmanaged Iceberg tables support Snowflake DML operations identically to managed tables
- E) Managed Iceberg tables require an external catalog integration for metadata management

---

## Q14 (Scenario)
A data platform architect is migrating a legacy ETL pipeline that uses PUT and COPY INTO from a local file system. The new architecture must support cloud-native ingestion from AWS S3 with automatic detection of new files, deduplication of already-loaded files, and notification-based triggering. The files are CSV with varying schemas across different S3 prefixes. Which design best meets all requirements?
- A) One Snowpipe per S3 prefix, each with its own file format and target table, triggered by S3 event notifications via SQS
- B) A single Snowpipe with a broad S3 prefix and FILE_FORMAT = AUTO to detect schema per file
- C) External tables with AUTO_REFRESH on each prefix, combined with scheduled tasks to COPY INTO target tables
- D) A Lambda function that invokes COPY INTO via the Snowflake REST API upon S3 PutObject events

---

## Q15 (Single Answer)
When unloading data from Snowflake using COPY INTO <location>, which statement about the PARTITION BY clause is correct?
- A) PARTITION BY physically sorts the data within each output file by the partition columns
- B) PARTITION BY creates a directory structure in the target location using the partition column values as path segments
- C) PARTITION BY can only be used with CSV file format output
- D) PARTITION BY requires the target stage to have a defined directory table enabled

---

## Q16 (Single Answer)
An architect is troubleshooting a Snowpipe pipeline where duplicate records are appearing in the target table. The source S3 bucket receives files, and SQS notifications trigger the pipe. Investigation reveals that the same file is being delivered to the same S3 path after being deleted and re-uploaded. What explains this behavior?
- A) Snowpipe does not perform any deduplication and always loads every notified file
- B) Snowpipe deduplicates based on the file name and path, but if a file is deleted and re-uploaded with the same name, the load metadata may have been purged after 14 days, allowing reloading
- C) SQS is delivering duplicate notifications, and Snowpipe has no mechanism to handle idempotent ingestion
- D) Snowpipe only deduplicates files within the same micro-batch, not across batches

---

## Q17 (Scenario)
A telecom company ingests CDR (Call Detail Records) from 200 regional sources. Each source sends files in slightly different CSV formats — some have headers, some do not, and column delimiters vary between pipe and comma. All records must land in a single unified table. Which architectural pattern handles this efficiently?
- A) Create 200 individual file formats and 200 Snowpipe objects, each mapping to the unified table with column transformations in the COPY INTO query
- B) Load all files into a single VARIANT column using a permissive file format, then use views with LATERAL FLATTEN to normalize
- C) Use INFER_SCHEMA for each file group, create separate staging tables, and use UNION ALL views
- D) Standardize all files to a common format using an external ETL tool before loading into Snowflake

---

## Q18 (Multi Answer - Select 2)
When configuring schema evolution on a Snowflake table for automatic adaptation to source file changes, which TWO conditions must be met? (Select TWO)
- A) The ENABLE_SCHEMA_EVOLUTION property must be set on the target table
- B) The loading role must have EVOLVE SCHEMA or OWNERSHIP privilege on the target table
- C) The source files must be in CSV format exclusively
- D) The MATCH_BY_COLUMN_NAME parameter must be disabled to allow positional mapping
- E) A STRIP_OUTER_ARRAY parameter must be set for JSON files

---

## Q19 (Scenario)
An architect designs a pipeline to load data from a SaaS application's REST API into Snowflake. The API supports pagination and returns JSON. Data volumes are moderate (100K records/day), but the API has rate limits of 100 requests per minute. The architect needs a cost-effective solution. Which approach is most appropriate?
- A) Use Snowflake's native REST API connector to directly query the API from a stored procedure
- B) Deploy an external function backed by an AWS Lambda that paginates through the API, writes JSON files to S3, and triggers Snowpipe
- C) Build a Python application using the Snowflake Ingest SDK (Snowpipe Streaming) that paginates the API and streams records directly
- D) Use an external table with a custom integration to the SaaS API

---

## Q20 (Single Answer)
A data engineer executes COPY INTO with VALIDATION_MODE = 'RETURN_ALL_ERRORS' against a set of staged files. Which statement about this operation is correct?
- A) The data is loaded and errors are returned simultaneously in the query result
- B) No data is loaded; instead, the command returns all errors that would occur if the data were loaded
- C) Only the first error per file is returned, and the remaining files are loaded successfully
- D) The VALIDATION_MODE parameter is only valid when used with the PUT command

---

## Q21 (Scenario)
A pharmaceutical company has a data lake on S3 containing clinical trial data in Apache Iceberg format, managed by an AWS Glue catalog. They want to query this data from Snowflake without moving or duplicating it. They do not need to write to these tables from Snowflake. Which configuration is correct?
- A) Create managed Iceberg tables in Snowflake pointing to the Glue catalog
- B) Create an external volume and a catalog integration for AWS Glue, then create unmanaged Iceberg tables referencing the external catalog
- C) Create external tables with AUTO_REFRESH over the Iceberg data files
- D) Use data sharing to access the Iceberg tables from another Snowflake account

---

## Q22 (Single Answer)
An architect notices that COPY INTO loads from a stage are failing with the error: "Number of columns in file does not match the table." The source CSV files have recently added two new columns. The table has ENABLE_SCHEMA_EVOLUTION = TRUE. What is the most likely cause of the failure?
- A) Schema evolution does not work with CSV files
- B) The COPY INTO command is using positional column mapping instead of MATCH_BY_COLUMN_NAME, and the CSV files do not have headers enabled in the file format
- C) The table has a clustering key that prevents schema evolution
- D) Schema evolution only works with Snowpipe, not with manual COPY INTO commands

---

## Q23 (Multi Answer - Select 2)
Which TWO are valid use cases for external tables in a Snowflake data architecture? (Select TWO)
- A) Providing SQL query access to data stored in cloud storage without loading it into Snowflake
- B) Enabling full DML operations (INSERT, UPDATE, DELETE) on data in external cloud storage
- C) Serving as a metadata layer for data lake files to support partition pruning on cloud storage
- D) Automatically compressing and encrypting data files in the external storage location
- E) Replacing Snowpipe for real-time streaming ingestion from Kafka topics

---

## Q24 (Scenario)
A logistics company needs to unload shipment data nightly to an Azure Data Lake Storage Gen2 container. The downstream consumer requires: (1) Parquet format, (2) Snappy compression, (3) files no larger than 256 MB each, and (4) data partitioned by ship_date. Which COPY INTO statement structure satisfies all requirements?
- A) COPY INTO @azure_stage/shipments/ FROM (SELECT * FROM shipments) FILE_FORMAT = (TYPE = PARQUET COMPRESSION = SNAPPY) MAX_FILE_SIZE = 268435456 PARTITION BY (ship_date) HEADER = TRUE
- B) COPY INTO @azure_stage/shipments/ FROM (SELECT ship_date, * FROM shipments) FILE_FORMAT = (TYPE = PARQUET) MAX_FILE_SIZE = 268435456 PARTITION BY (ship_date) SINGLE = FALSE
- C) COPY INTO @azure_stage/shipments/ FROM (SELECT * FROM shipments) FILE_FORMAT = (TYPE = PARQUET SNAPPY_COMPRESSION = TRUE) MAX_FILE_SIZE = 256MB PARTITION BY (ship_date)
- D) COPY INTO @azure_stage/shipments/ FROM shipments FILE_FORMAT = (TYPE = PARQUET) PARTITION BY ship_date MAX_FILE_SIZE = 268435456 OVERWRITE = TRUE

---

## Q25 (Single Answer)
An architect is designing a CDC (Change Data Capture) pipeline from a PostgreSQL source to Snowflake. The source database generates approximately 50,000 change events per second during peak hours. The data must reflect the latest state in Snowflake within 30 seconds. Which architecture best meets these requirements?
- A) Use logical replication from PostgreSQL to write change files to S3, then Snowpipe for ingestion, with a scheduled MERGE task every 30 seconds
- B) Use a CDC tool (e.g., Debezium) to capture changes into Kafka, then use the Snowflake Kafka Connector in Snowpipe Streaming mode to ingest directly, with a dynamic table to materialize the latest state
- C) Extract a full snapshot from PostgreSQL every 30 seconds and perform a TRUNCATE and COPY INTO
- D) Use Snowflake's native PostgreSQL replication connector

---

## Q26 (Single Answer)
When using COPY INTO to load data, an architect sets PURGE = TRUE. Which behavior does this parameter control?
- A) It deletes the target table's existing data before loading new data
- B) It removes the source files from the stage after they have been successfully loaded
- C) It purges the load history metadata to allow the same files to be reloaded
- D) It clears the warehouse cache before executing the load operation

---

## Q27 (Scenario)
A data engineering team loads JSON event data into a Snowflake table with a single VARIANT column. They need to create a relational view over this data. Recently, the upstream application began sending events with a new nested field that must be exposed in the view. The architect wants this to happen automatically without manual view maintenance. Which approach achieves this?
- A) Use GET_PATH or lateral flatten in the view and manually add new fields as they appear
- B) Use schema detection on the staged files to automatically update the target table's columns, then build a view on the structured columns
- C) Create a dynamic table that automatically detects new JSON keys using OBJECT_KEYS and pivots them
- D) Rely on schema evolution with ENABLE_SCHEMA_EVOLUTION = TRUE on the VARIANT column table

---

## Q28 (Multi Answer - Select 2)
An architect is evaluating the trade-offs between Snowpipe and scheduled COPY INTO tasks for loading data. Which TWO statements are correct? (Select TWO)
- A) Snowpipe uses serverless compute managed by Snowflake, while COPY INTO tasks use a user-specified virtual warehouse
- B) Snowpipe retains load history for 64 days for deduplication purposes, while COPY INTO retains it for 14 days
- C) COPY INTO tasks provide lower per-file latency than Snowpipe for individual small files
- D) Snowpipe supports loading from all stage types including internal named stages, while COPY INTO only supports external stages
- E) Snowpipe guarantees exactly-once file loading within the load history retention window

---

## Q29 (Single Answer)
An organization loads Avro files from S3 into Snowflake. The Avro schema includes a field defined as a union type (null, string, int). The architect notices that Snowflake loads this field as a VARIANT. What is the correct explanation?
- A) Snowflake does not support Avro format and converts everything to VARIANT
- B) Avro union types cannot be deterministically mapped to a single Snowflake data type, so Snowflake represents them as VARIANT to preserve all possible values
- C) The STRIP_OUTER_ARRAY parameter was not set, causing Avro unions to be treated as arrays
- D) This behavior only occurs when MATCH_BY_COLUMN_NAME is disabled

---

## Q30 (Scenario)
A gaming company unloads player session data for a specific region from Snowflake to an S3 bucket. The downstream ML pipeline expects exactly one output file per unload operation. The data size is approximately 500 MB per region per day. Which COPY INTO configuration ensures a single output file?
- A) COPY INTO @s3_stage/sessions/ FROM (SELECT * FROM sessions WHERE region = 'NA') FILE_FORMAT = (TYPE = PARQUET) SINGLE = TRUE
- B) COPY INTO @s3_stage/sessions/ FROM sessions FILE_FORMAT = (TYPE = PARQUET) MAX_FILE_SIZE = 0
- C) COPY INTO @s3_stage/sessions/ FROM sessions FILE_FORMAT = (TYPE = PARQUET) OVERWRITE = TRUE
- D) COPY INTO @s3_stage/sessions/ FROM sessions FILE_FORMAT = (TYPE = PARQUET) SINGLE = FALSE MAX_FILE_SIZE = 5368709120

---

## Q31 (Single Answer)
An architect discovers that a Snowpipe configured with AUTO_INGEST = TRUE is not loading newly arriving files in an S3 bucket. The pipe status shows "RUNNING." Which is the LEAST likely cause of the issue?
- A) The S3 bucket event notification is not configured to send to the correct SQS queue
- B) The IAM role associated with the storage integration lacks s3:GetObject permissions
- C) The virtual warehouse assigned to the pipe is suspended
- D) The file names match a pattern already present in the pipe's load history within the 14-day retention window

---

## Q32 (Multi Answer - Select 2)
Which TWO considerations are important when designing an incremental load strategy using Snowflake streams and tasks? (Select TWO)
- A) A stream on a table tracks DML changes (inserts, updates, deletes) since the last time the stream was consumed by a DML statement
- B) Streams consume additional storage proportional to the full size of the source table
- C) If a stream is not consumed within the data retention period, it becomes stale and must be recreated
- D) Tasks can only execute simple SQL statements and cannot call stored procedures
- E) Streams can only track INSERT operations, not UPDATE or DELETE

---

## Q33 (Scenario)
A financial services firm loads market data from multiple stock exchanges. Each exchange provides data in different formats: NYSE in CSV, LSE in JSON, and TSE in Parquet. All data must be loaded into a unified TRADES table with the same schema. The architect wants to use a single Snowpipe per exchange with appropriate file formats. Which consideration is MOST critical for this design?
- A) All three Snowpipe objects must use the same file format definition
- B) Each Snowpipe must define its own file format and use COPY INTO transformations within the pipe definition to map source-specific schemas to the target table's column structure
- C) Snowpipe does not support transformation queries, so external ETL must normalize formats first
- D) The TRADES table must use a VARIANT column to accommodate different source formats

---

## Q34 (Single Answer)
An architect wants to reload a specific set of files that were previously loaded via COPY INTO. The files are still present in the stage. What must be done to allow reloading of these specific files?
- A) Drop and recreate the target table, then re-execute COPY INTO
- B) Use COPY INTO with the FORCE = TRUE parameter to bypass load history deduplication
- C) Delete the files from the stage, re-upload them with different names, and execute COPY INTO
- D) Wait for the 14-day load metadata retention to expire, then execute COPY INTO

---

## Q35 (Scenario)
A manufacturing company's IoT platform generates sensor readings that are written to Amazon Kinesis Data Streams. The architect needs these readings in Snowflake for real-time monitoring dashboards. Data freshness must be under 5 seconds. The solution must handle out-of-order events and support exactly-once delivery. Which architecture is recommended?
- A) Use Kinesis Data Firehose to write to S3, then Snowpipe with auto-ingest
- B) Use a Kinesis consumer application with the Snowflake Ingest SDK (Snowpipe Streaming), managing offset tokens per shard for exactly-once semantics
- C) Use AWS Lambda to read from Kinesis and execute INSERT statements via the Snowflake SQL API
- D) Use Amazon Managed Service for Apache Flink to write Parquet files to S3, then use an external table with AUTO_REFRESH

---

## Q36 (Single Answer)
When using COPY INTO to load data from a stage, which parameter controls how Snowflake handles files that contain fewer columns than the target table expects?
- A) ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE
- B) ON_ERROR = CONTINUE
- C) MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
- D) TRUNCATECOLUMNS = TRUE

---

## Q37 (Multi Answer - Select 2)
An architect is designing the unloading strategy for a large fact table (50 TB). Which TWO practices optimize the unload operation? (Select TWO)
- A) Use a larger warehouse size to increase parallelism during the COPY INTO <location> operation
- B) Set SINGLE = TRUE to create one large file for maximum downstream read throughput
- C) Use PARTITION BY on a date column to generate organized directory structures and enable parallel downstream consumption
- D) Set OVERWRITE = FALSE to append to existing files in the target location
- E) Use MAX_FILE_SIZE to control output file sizes for optimal parallel processing by downstream systems

---

## Q38 (Scenario)
A data engineer is loading CSV files where some rows contain malformed data. The business requires that all valid rows be loaded and that a report of rejected rows be generated for data quality review. Which approach satisfies both requirements?
- A) Use ON_ERROR = ABORT_STATEMENT and manually fix each file before reloading
- B) Use ON_ERROR = CONTINUE to load valid rows, then call the VALIDATE table function referencing the last COPY INTO statement to extract rejected rows
- C) Use VALIDATION_MODE = RETURN_ALL_ERRORS to load data and generate the error report simultaneously
- D) Use ON_ERROR = SKIP_FILE to skip problematic files entirely and reload them later

---

## Q39 (Scenario)
An insurance company maintains policy documents as PDF files in an S3 bucket. They have extracted metadata (policy_id, customer_id, dates) into a CSV sidecar file accompanying each PDF. The architect needs to make both the metadata and a reference to the PDF queryable in Snowflake. Which design is most appropriate?
- A) Load the CSV metadata via Snowpipe and store the S3 URI of the PDF as a column in the metadata table
- B) Convert PDFs to text and load both PDF content and metadata into a single VARIANT column
- C) Create an external table that reads both PDF and CSV files simultaneously
- D) Use Snowflake's DOCUMENT_AI to automatically extract metadata from PDFs, eliminating the need for CSV files

---

## Q40 (Single Answer)
When configuring COPY INTO for loading JSON data, which parameter removes the outer array structure from JSON arrays, allowing each element to be loaded as a separate row?
- A) ENABLE_OCTAL = TRUE
- B) STRIP_OUTER_ARRAY = TRUE
- C) FLATTEN_ARRAYS = TRUE
- D) SPLIT_ARRAY_ELEMENTS = TRUE

---

## Q41 (Scenario)
A multinational corporation has data residency requirements that mandate certain data remain in specific cloud regions. They need to load data from sources in EU-West (S3) into a Snowflake account in EU-Frankfurt, and separately from US-East (S3) into a Snowflake account in US-East-1. Some reference tables must be shared across both accounts. Which architectural pattern addresses data loading and cross-region data access?
- A) Load data into each regional account using Snowpipe with region-specific stages, and use Snowflake data sharing with replication for cross-region reference table access
- B) Load all data into a single global Snowflake account and use row-level security to enforce data residency
- C) Use external tables in each account pointing to the other region's S3 buckets for cross-region access
- D) Create a single Snowpipe that loads data into both regional accounts simultaneously

---

## Q42 (Multi Answer - Select 2)
An architect is evaluating COPY INTO parameters for a high-volume data loading pipeline. Which TWO parameters directly affect load performance and throughput? (Select TWO)
- A) SIZE_LIMIT — limits the total size of data loaded per COPY statement, allowing staged incremental loads
- B) RETURN_FAILED_ONLY — reduces result set size but does not affect load throughput
- C) FILES — specifying a subset of files reduces the scope of the load operation and can improve individual statement performance
- D) PATTERN — filtering files by regex pattern has no effect on performance since all files are scanned regardless
- E) FORCE — reloading already-loaded files improves throughput by bypassing deduplication checks

---

## Q43 (Single Answer)
A data engineering team is using the Snowflake Kafka connector in Snowpipe mode to ingest data from multiple Kafka topics. They notice a significant lag between when messages are produced and when they appear in target tables. The team wants to reduce this latency to sub-second levels without changing their Kafka infrastructure. Which approach should the architect recommend?
- A) Increase the number of Kafka partitions and add more Snowpipe SQS/SNS notifications
- B) Switch from Snowpipe mode to Snowpipe Streaming mode in the Kafka connector configuration
- C) Deploy multiple Kafka connector instances each handling a single topic to parallelize ingestion
- D) Reduce the buffer.flush.time parameter in the Snowpipe mode configuration to 1 second
- E) Replace the Kafka connector with a custom consumer that calls the Snowflake SQL API directly

---

## Q44 (Multi Answer - Select 2)
An architect is configuring the Snowflake Kafka connector for a new streaming pipeline. The connector must write JSON payloads from Kafka topics directly into Snowflake tables. The team needs to understand the behavioral differences between Snowpipe mode and Snowpipe Streaming mode. Which TWO statements correctly describe differences between these modes? (Select 2)
- A) Snowpipe mode stages data as files before loading, while Snowpipe Streaming mode uses the Snowflake Ingest SDK to write rows directly without staging files
- B) Snowpipe Streaming mode requires an external stage to be pre-configured, whereas Snowpipe mode uses an internal stage automatically
- C) Snowpipe mode supports exactly-once delivery guarantees natively, while Snowpipe Streaming mode only supports at-least-once
- D) Snowpipe Streaming mode provides lower latency ingestion compared to Snowpipe mode because it eliminates the file staging step
- E) Snowpipe mode requires the snowflake.ingestion.method property set to SNOWPIPE_STREAMING, while Snowpipe Streaming mode uses the default setting

---

## Q45 (Scenario)
A financial services company processes real-time market data using Kafka. Their Snowflake Kafka connector configuration includes snowflake.ingestion.method=SNOWPIPE_STREAMING with buffer.count.records=10000 and buffer.flush.time=10. After deploying, they discover that records from the market_feed_raw topic occasionally arrive out of order when querying the MARKET_DATA table. They need strict ordering guarantees per instrument symbol. What should the architect recommend?
- A) Set buffer.count.records=1 to ensure each record is flushed immediately in order
- B) Ensure that Kafka messages for the same instrument symbol are produced to the same partition, as ordering is preserved per-partition in Snowpipe Streaming mode
- C) Add snowflake.enable.ordering=true to the connector configuration
- D) Switch to Snowpipe mode, which provides stronger ordering guarantees than Snowpipe Streaming mode
- E) Create a stream on the MARKET_DATA table and use a task to reorder records after ingestion

---

## Q46 (Single Answer)
An architect is designing a Spark-based ETL pipeline that reads large volumes of data from Snowflake, performs transformations, and writes results back. They want to minimize data movement between Spark and Snowflake. Which Snowflake Spark connector feature should the architect leverage to achieve this?
- A) Configure the Spark connector to use JDBC batch mode for bulk reads
- B) Enable query pushdown so that filter, projection, and aggregation operations are executed in Snowflake before data is transferred to Spark
- C) Use the Spark connector's native caching layer to store Snowflake data in Spark's memory
- D) Configure external tables in Snowflake that point to Spark's HDFS storage

---

## Q47 (Single Answer)
A team uses the Snowflake Spark connector to read a large table and apply several DataFrame transformations including filter, groupBy, and agg operations. The architect notices that the entire table is being read into the Spark cluster before any filtering occurs. What is the most likely cause?
- A) The Spark connector does not support pushdown for groupBy operations
- B) The autopushdown option is set to "off" in the Spark connector configuration
- C) The Snowflake table lacks clustering keys matching the filter predicates
- D) Spark's catalyst optimizer is reordering the operations after the Snowflake read

---

## Q48 (Multi Answer - Select 2)
An architect is building a data pipeline using the Snowflake Python connector. The pipeline needs to load a large pandas DataFrame (5 million rows) into a Snowflake table and also run several long-running analytical queries without blocking the application. Which TWO Python connector features should the architect use? (Select 2)
- A) Use write_pandas() to efficiently load the pandas DataFrame into Snowflake using a PUT and COPY INTO approach
- B) Use cursor.executemany() with row-by-row inserts to load the pandas DataFrame
- C) Use cursor.execute_async() to submit long-running queries and poll for results without blocking the application
- D) Use cursor.execute() with timeout=0 to make queries non-blocking
- E) Use cursor.fetch_pandas_all() to load the DataFrame directly without staging

---

## Q49 (Single Answer)
A developer is using the Snowflake Python connector to execute a parameterized query. The query returns unexpected results because the region column contains lowercase values but the parameter is uppercase. The developer wants a case-insensitive match without modifying the table data. What should the architect recommend?
- A) Change the binding syntax from %s to :1 and :2 to use qmark-style parameterized queries
- B) Modify the query to use UPPER(region) = UPPER(%s) in the WHERE clause while still using parameterized binding
- C) Switch from parameterized queries to f-string interpolation to wrap the parameter in an UPPER() function call
- D) Set the session parameter QUOTED_IDENTIFIERS_IGNORE_CASE=TRUE before executing the query

---

## Q50 (Scenario)
An enterprise data platform team runs nightly batch jobs using the Snowflake Python connector. A job that processes 50 queries sequentially takes too long. The architect proposes using execute_async() to run queries concurrently, then checking status and retrieving results. What potential issue should the architect address with this approach?
- A) execute_async() does not return a query ID, so cur.sfqid will be None
- B) All 50 queries will share the same warehouse session and execute sequentially despite using execute_async()
- C) The get_query_status_throw_if_error() call is a point-in-time check; the architect should implement a polling loop that waits until the query reaches a terminal state before fetching results
- D) The Python connector does not support execute_async() — the architect should use multi-threading with separate connections instead

---

## Q51 (Single Answer)
A company uses the Snowflake JDBC driver to execute multiple SQL statements in a single request. The code sets MULTI_STATEMENT_COUNT=3 then executes "BEGIN; INSERT INTO t1 VALUES(1); INSERT INTO t2 VALUES(2); COMMIT;" and gets an error. What is the most likely cause?
- A) The MULTI_STATEMENT_COUNT parameter must be set as a connection property, not via ALTER SESSION
- B) The MULTI_STATEMENT_COUNT should be set to 0 (unlimited) or match the exact number of semicolon-separated statements including BEGIN and COMMIT
- C) JDBC does not support multi-statement execution; the statements must be executed individually
- D) The BEGIN and COMMIT statements are not counted in MULTI_STATEMENT_COUNT and the value should be 2

---

## Q52 (Single Answer)
An architect is configuring the Snowflake JDBC driver connection string for an application that must use key-pair authentication and connect through a proxy server. Which connection string format is correct?
- A) jdbc:snowflake://account.snowflakecomputing.com/?private_key_file=/path/to/key.p8&authenticator=SNOWFLAKE_JWT&useProxy=true&proxyHost=proxy.corp.com&proxyPort=8080
- B) jdbc:snowflake://account.snowflakecomputing.com/?private_key_file=/path/to/key.p8&authenticator=EXTERNALBROWSER&httpProxy=proxy.corp.com:8080
- C) jdbc:snowflake://account.snowflakecomputing.com/?authenticator=OAUTH&token_file=/path/to/key.p8&proxy=proxy.corp.com:8080
- D) jdbc:snowflake://account.snowflakecomputing.com/?private_key=/path/to/key.p8&authenticator=SNOWFLAKE&useProxy=true&proxyHost=proxy.corp.com&proxyPort=8080

---

## Q53 (Single Answer)
A network security team needs to configure their corporate firewall to allow outbound connections to Snowflake. The team asks the architect how to obtain the list of IP addresses and hostnames that must be whitelisted. Which approach should the architect recommend?
- A) Query the SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY view to extract the IP addresses of Snowflake endpoints
- B) Call SYSTEM$ALLOWLIST() to retrieve the current list of Snowflake-related hostnames and ports that must be allowed through the firewall
- C) Look up the IP ranges in the Snowflake documentation and manually configure them in the firewall
- D) Use SYSTEM$WHITELIST() with a deprecated function call that returns the same information as SYSTEM$ALLOWLIST()

---

## Q54 (Scenario)
An architect is designing a microservices-based application where multiple services need to execute SQL queries against Snowflake. The services are written in Go, Rust, and other languages that do not have a native Snowflake driver. The architect wants to use a REST-based approach. Which set of capabilities does the Snowflake SQL API provide?
- A) Full DDL/DML support via REST endpoints, including the ability to submit SQL statements, check query status by query ID, and fetch partial results using pagination
- B) Only read-only SELECT queries via REST endpoints with automatic result caching
- C) Full SQL support but only via synchronous execution — the caller must wait for the query to complete before receiving a response
- D) DDL support only — DML statements must be executed through native connectors or drivers

---

## Q55 (Multi Answer - Select 2)
An architect is evaluating the Snowflake SQL API for a serverless application. The application submits complex analytical queries that can run for several minutes and needs to handle the response lifecycle properly. Which TWO statements correctly describe the SQL API's behavior for long-running queries? (Select 2)
- A) When a query is submitted, the SQL API immediately returns a 202 Accepted response with a statementHandle that can be used to poll for query status
- B) The SQL API always waits for the query to complete and returns the full result set in a single response, regardless of query duration
- C) Results for completed queries can be retrieved in partitions using the statementHandle and a partition index, allowing clients to fetch large result sets incrementally
- D) The SQL API automatically cancels queries that exceed 60 seconds of execution time
- E) The SQL API requires a persistent WebSocket connection to receive query results asynchronously

---

## Q56 (Single Answer)
An operations team uses SnowSQL in automated scripts to perform nightly data maintenance tasks. They want to pass in a date parameter from the shell environment and use it inside their SQL script. Given a script with variable_substitution=true and &start_date syntax, which SnowSQL command correctly invokes this script with the parameter?
- A) snowsql -f maintenance.sql -D start_date=2024-01-01
- B) snowsql -f maintenance.sql --param start_date=2024-01-01
- C) snowsql -f maintenance.sql -v start_date='2024-01-01'
- D) snowsql -f maintenance.sql --set start_date=2024-01-01

---

## Q57 (Single Answer)
An architect is advising a team on choosing between SnowSQL and the Snowflake CLI (snow) for their development workflows. The team builds Snowpark Python applications and deploys Streamlit apps to Snowflake. Which statement best characterizes when to use the Snowflake CLI (snow) over SnowSQL?
- A) The snow CLI is a replacement for SnowSQL and supports all the same SQL scripting capabilities with additional features
- B) The snow CLI is designed for project-based development workflows such as building, testing, and deploying Snowpark applications and Streamlit apps, while SnowSQL is better suited for ad-hoc SQL execution and scripting
- C) SnowSQL supports Snowpark development natively, making the snow CLI unnecessary for Snowpark workflows
- D) The snow CLI can only deploy Streamlit apps and cannot be used for Snowpark stored procedures or UDFs

---

## Q58 (Scenario)
A data engineering team writes Snowpark Python code that chains session.table(), filter(), group_by(), agg(), and show() operations. At which point does Snowflake actually execute SQL against the warehouse?
- A) At session.table("SALES.PUBLIC.TRANSACTIONS") — the table metadata and data are loaded immediately
- B) At each successive DataFrame operation (filter, group_by, agg) — each transformation triggers a separate SQL query
- C) At df_result.show() — Snowpark uses lazy evaluation, building a query plan that is only executed when an action method like show(), collect(), or write is called
- D) At df_grouped.filter(col("TOTAL_AMOUNT") > 10000) — the second filter triggers execution because it depends on an aggregation result

---

## Q59 (Single Answer)
An architect is reviewing a Snowpark Python stored procedure where the developer creates a new session inside the handler function instead of using the provided session parameter. What issue should the architect flag?
- A) The stored procedure handler should use the session parameter that is automatically provided by Snowflake at runtime, not create a new session — creating a new session inside a stored procedure is unnecessary and may fail or cause authentication issues
- B) The write.mode("overwrite") call is not supported in stored procedures and will throw an error
- C) Stored procedures cannot accept a table_name parameter — table references must be hardcoded
- D) The return type str is invalid for Snowpark stored procedures; they must return a DataFrame

---

## Q60 (Multi Answer - Select 2)
An architect needs to deploy a Python UDF and a stored procedure to Snowflake using Snowpark. The UDF performs a complex string transformation, and the stored procedure orchestrates a multi-step ETL pipeline. Which TWO statements correctly describe key differences between Snowpark UDFs and stored procedures? (Select 2)
- A) UDFs are designed to be called within SQL expressions and return a scalar or tabular value per row, while stored procedures are called with CALL and can execute multiple SQL statements and DDL/DML operations
- B) Stored procedures always run with the caller's privileges by default, while UDFs always run with the owner's privileges
- C) UDFs cannot access the Snowpark Session object, while stored procedures receive a Session object as their first parameter to interact with Snowflake
- D) Stored procedures can only be written in SQL, not in Python using Snowpark
- E) UDFs support vectorized execution via the @udf decorator with input=PandasSeries, while stored procedures also support vectorized execution natively

---

## Q61 (Scenario)
A retail company has a Snowpark Python application that processes daily sales data. The application performs several transformations and writes intermediate results to temporary tables. The architect notices that the application creates a new Snowpark session for each transformation step, leading to excessive authentication overhead and session management complexity. What is the recommended approach to resolve this?
- A) Use connection pooling at the application level with a third-party library to manage multiple Snowpark sessions
- B) Create a single Snowpark session at the beginning of the application lifecycle and reuse it across all transformation steps, closing it only when the entire pipeline completes
- C) Use the Snowflake Python connector instead of Snowpark to avoid session management overhead entirely
- D) Configure the Snowpark session with session.sql("ALTER SESSION SET CLIENT_SESSION_KEEP_ALIVE=TRUE") and continue creating new sessions per step

---

## Q62 (Single Answer)
An architect is designing a Snowpark application that needs to apply a custom Python function to every row of a large table. The function uses a third-party library (phonenumbers) to parse and validate phone numbers. What is the correct approach to deploy this as a UDF in Snowflake?
- A) Install the phonenumbers library on the Snowflake virtual warehouse nodes before deploying the UDF
- B) Define the UDF using the @udf decorator and specify the phonenumbers package in the packages parameter so Snowflake resolves it from the Anaconda channel at runtime
- C) Inline the entire phonenumbers library source code within the UDF handler function
- D) Use an external function that calls an AWS Lambda endpoint where phonenumbers is installed

---

## Q63 (Single Answer)
A developer writes Snowpark Python code to join two DataFrames on CUSTOMER_ID and then select columns. The select statement fails with an ambiguous column error. What is the root cause?
- A) Snowpark does not support joins between two DataFrames — a SQL expression must be used instead
- B) Both DataFrames contain a CUSTOMER_ID column, and after the join, the column reference is ambiguous; the developer should use df_orders["CUSTOMER_ID"] or df_customers["CUSTOMER_ID"] in the select, or drop the duplicate column after the join
- C) The join method requires a how parameter to be explicitly specified
- D) The select method does not accept string column names — col("ORDER_ID") must be used

---

## Q64 (Multi Answer - Select 2)
An architect is evaluating Snowpark's query pushdown capabilities. The team wants to understand what operations Snowpark pushes down to Snowflake's execution engine versus what is executed locally. Which TWO statements are correct about Snowpark pushdown behavior? (Select 2)
- A) Snowpark pushes down all DataFrame operations — including filter, join, group_by, and sort — to Snowflake, generating a single SQL query that the warehouse executes
- B) Snowpark executes filter operations locally in the Python runtime for better performance, then sends the filtered data back to Snowflake
- C) When a Snowpark UDF is used in a DataFrame operation, the UDF execution itself occurs within the Snowflake warehouse, not in the client-side Python process
- D) Snowpark cannot push down window functions; these are always computed in the client's Python process
- E) Snowpark only pushes down SELECT and WHERE clauses; aggregations and joins are always processed locally

---

## Q65 (Single Answer)
An operations team wants to automate the deployment of Snowpark Python stored procedures and UDFs using CI/CD. The team uses the Snowflake CLI (snow). Which workflow best describes the recommended approach?
- A) Use snow snowpark build to package the code and dependencies, then use snow snowpark deploy to deploy the stored procedures and UDFs to Snowflake from a snowflake.yml project definition
- B) Manually upload Python files to an internal stage using PUT, then run CREATE FUNCTION and CREATE PROCEDURE SQL statements via SnowSQL
- C) Use snow snowpark deploy without a project definition file — the CLI auto-detects Python functions and deploys them
- D) Package the Snowpark code as a Docker container and deploy it to Snowpark Container Services

---

## Q66 (Scenario)
A healthcare company uses the Snowflake Kafka connector in Snowpipe Streaming mode to ingest patient monitoring data from IoT devices. Multiple Kafka topics are mapped to the same VITALS target table with enable.schematization=true. After running for several hours, the team notices schema evolution conflicts. What should the architect recommend?
- A) Disable enable.schematization and manually manage the schema of the VITALS table
- B) Map each Kafka topic to a separate target table to prevent schema evolution conflicts, then use views or downstream processing to merge the data
- C) Add snowflake.schema.evolution.mode=STRICT to prevent any schema changes
- D) Use a single Kafka topic for all vitals data to ensure consistent schema evolution

---

## Q67 (Single Answer)
An architect is configuring the Snowflake ODBC driver for a Windows-based legacy application. The application requires a DSN (Data Source Name) configuration. The architect must ensure the connection uses the correct account identifier format. Which DSN configuration parameter specifies the Snowflake account?
- A) HOST — set to the full Snowflake account URL (e.g., myaccount.snowflakecomputing.com)
- B) SERVER — set to the Snowflake account identifier (e.g., myorg-myaccount)
- C) ACCOUNT — set to the Snowflake account locator (e.g., xy12345)
- D) DSN — set to the full connection string including account, user, and warehouse

---

## Q68 (Single Answer)
A company integrates ServiceNow with Snowflake to analyze IT service management data. The Snowflake connector for ServiceNow extracts data from ServiceNow tables and loads it into Snowflake. Which statement best describes how the ServiceNow connector operates?
- A) It uses Snowpipe Streaming to continuously ingest ServiceNow records in real time
- B) It provisions a dedicated Snowflake database and uses a scheduled ingestion process to extract data from ServiceNow REST APIs, syncing tables and incremental changes into Snowflake
- C) It requires a custom ETL pipeline built with Snowpark to transform ServiceNow data before loading
- D) It only supports one-time full loads from ServiceNow and does not support incremental synchronization

---

## Q69 (Multi Answer - Select 2)
An architect is advising a team that needs to connect to Snowflake from multiple technology stacks. The team has Java services using JDBC, C# services requiring ODBC, Python microservices, and a serverless platform that can only make HTTP calls. Which TWO combinations correctly match the technology to the recommended Snowflake connectivity approach? (Select 2)
- A) Java services → Snowflake JDBC driver; Serverless platform → Snowflake SQL API (REST)
- B) C# services → Snowflake Python connector with a C# wrapper; Java services → Snowflake SQL API
- C) Python microservices → Snowflake ODBC driver; C# services → Snowflake JDBC driver
- D) C# services → Snowflake ODBC driver or .NET driver; Python microservices → Snowflake Python connector
- E) Serverless platform → Snowflake JDBC driver embedded in a Lambda layer; C# services → Snowflake Python connector

---

## Q70 (Single Answer)
An architect is troubleshooting a Snowflake Spark connector job that writes a large DataFrame to Snowflake. The job fails intermittently with timeout errors. The write operation uses the default configuration. Which configuration change is most likely to resolve the intermittent timeout issue?
- A) Increase the sfCompress parameter to enable higher compression on data files staged during the write
- B) Increase the snowflake.jdbc.map_column_id value to handle wider tables
- C) Set the keep_column_case parameter to "on" to prevent case-sensitivity issues during writes
- D) Increase the s3maxSinglePartUploadSize or adjust the tempDir to use a faster staging location, and consider increasing the JDBC network timeout parameter

---

## Q71 (Scenario)
A data platform team is building a real-time analytics dashboard. They use the Snowflake Kafka connector in Snowpipe Streaming mode with buffer.count.records=5000, buffer.flush.time=5, and buffer.size.bytes=5000000. The team wants to understand the trade-offs of these buffer settings. Which statement correctly describes the behavior?
- A) The connector waits until ALL three buffer conditions are met simultaneously before flushing data to Snowflake
- B) The connector flushes data when ANY ONE of the three buffer thresholds is reached — whichever comes first — balancing between latency (buffer.flush.time), throughput (buffer.count.records), and memory (buffer.size.bytes)
- C) The buffer.flush.time setting overrides the other two settings and is the only one that controls when data is flushed
- D) These buffer settings only apply to Snowpipe mode and are ignored in Snowpipe Streaming mode

---

## Q72 (Single Answer)
An architect is building a SnowSQL-based automation script that must connect to different Snowflake accounts depending on the environment (DEV, QA, PROD). The credentials and connection parameters are stored in the SnowSQL configuration file. How should the architect organize the SnowSQL config file to support multiple environments?
- A) Create separate configuration files for each environment and pass the file path using --config flag
- B) Define named connections in the ~/.snowsql/config file (e.g., [connections.dev], [connections.qa], [connections.prod]) and use --connection or -c flag to select the desired connection
- C) Use environment variables exclusively — SnowSQL does not support multiple connection profiles in its config file
- D) Use a single connection block and override parameters using --accountname, --username flags at runtime for each environment

---

## Q73 (Single Answer)
A developer is using the Snowflake Python connector to execute a query that returns 50 million rows. Loading all rows into memory crashes the application. What is the recommended approach to handle large result sets?
- A) Use cursor.execute() followed by cursor.fetchmany(batch_size) in a loop to fetch results in manageable chunks
- B) Use cursor.execute() followed by cursor.fetchall() with max_rows=10000 to limit the result set
- C) Set CLIENT_RESULT_CHUNK_SIZE=10000 as a session parameter to automatically paginate results
- D) Use cursor.execute_stream() which returns a generator that streams results row by row

---

## Q74 (Multi Answer - Select 2)
An architect is evaluating the Snowflake SQL API for integration with a cloud-native application. The application will submit queries and retrieve results programmatically via REST calls. Which TWO considerations are important when using the SQL API? (Select 2)
- A) Authentication to the SQL API can use OAuth tokens or key-pair JWT tokens, similar to other Snowflake connection methods
- B) The SQL API supports submitting a batch of up to 10 SQL statements in a single API request, but each statement executes sequentially
- C) The SQL API does not support DDL statements — it is restricted to DML and query operations only
- D) Large result sets from the SQL API are partitioned, and clients must make additional GET requests to retrieve each partition beyond the first
- E) The SQL API requires a dedicated virtual warehouse that cannot be shared with other workloads

---

## Q75 (Scenario)
A company is using the Snowflake Google Analytics connector to bring web analytics data into Snowflake. The marketing team wants near-real-time data to feed their attribution models. However, they observe a significant delay between when events occur in Google Analytics and when they appear in Snowflake. What should the architect explain about this connector's behavior?
- A) The Google Analytics connector supports real-time streaming — the delay is caused by a misconfiguration in the refresh schedule
- B) The Google Analytics connector operates on a scheduled batch extraction basis, pulling data from the Google Analytics API at configured intervals, so near-real-time ingestion is not supported natively through this connector
- C) The delay is caused by Snowflake's Time Travel feature holding data in a buffer before making it queryable
- D) The connector writes to an external stage first, and the delay is due to the stage-to-table copy not being automated

---

## Q76 (Single Answer)
An architect is designing a Snowpark Python stored procedure that needs to call an external REST API to enrich data during processing. The stored procedure runs inside Snowflake's secure execution environment. What must the architect configure to allow the stored procedure to make external HTTP calls?
- A) Set ALLOW_EXTERNAL_ACCESS=TRUE at the warehouse level
- B) Create an external access integration with a network rule specifying allowed endpoints, and grant usage on the integration to the stored procedure via the EXTERNAL_ACCESS_INTEGRATIONS clause
- C) Use an external function instead — stored procedures cannot make HTTP calls regardless of configuration
- D) Deploy the stored procedure to Snowpark Container Services, which automatically allows outbound network access

---

## Q77 (Single Answer)
A team is using SnowSQL to run a migration script that contains 200 SQL statements. The script occasionally fails midway through, and the team needs to identify which statement caused the failure. Which SnowSQL option should the architect add to improve error handling and diagnostics?
- A) --abort-on-error to stop execution on the first error, combined with -o log_level=DEBUG to capture detailed logs
- B) --continue-on-error to skip failures and generate a summary report at the end
- C) --dry-run to validate all statements without executing them
- D) --transaction to wrap all 200 statements in a single transaction automatically

---

## Q78 (Multi Answer - Select 2)
An architect needs to deploy a Snowpark Python stored procedure that processes sensitive financial data. The procedure must run with elevated privileges to access tables that the caller may not have direct access to, and it must log its execution metadata for auditing. Which TWO design decisions should the architect make? (Select 2)
- A) Create the stored procedure with EXECUTE AS OWNER rights so it runs with the owner's privileges, allowing access to tables the caller cannot directly query
- B) Create the stored procedure with EXECUTE AS CALLER rights so it inherits the caller's permissions and can access any table the caller has access to
- C) Use the Snowpark session within the stored procedure to execute session.sql() statements that log audit information to a dedicated audit table
- D) Use print() statements within the stored procedure to log audit information to Snowflake's query history
- E) Deploy the stored procedure as an external function to ensure privilege isolation

---

## Q79 (Scenario)
An architect is implementing a complex data pipeline using Snowpark Python. The pipeline uses BEGIN/COMMIT for atomicity. The code uses save_as_table() with mode("overwrite"). What issue exists with this transaction approach in Snowpark?
- A) Snowpark DataFrames do not participate in explicit transactions — BEGIN/COMMIT only applies to SQL statements executed via session.sql()
- B) The save_as_table with mode("overwrite") performs a CREATE OR REPLACE TABLE, which is a DDL statement that auto-commits and breaks the transaction boundary
- C) The filter, join, and group_by operations each execute separate queries that cannot be wrapped in a single transaction
- D) Snowpark sessions do not support transactions — the BEGIN statement will throw an error

---

## Q80 (Single Answer)
An architect is designing a data ingestion pipeline using the Snowflake Kafka connector. The target Snowflake table uses a VARIANT column to store the raw JSON payload. The team wants to ensure that both the Kafka message key and metadata (topic, partition, offset) are also persisted alongside the payload. Which Kafka connector behavior supports this requirement?
- A) The Kafka connector automatically creates the target table with RECORD_METADATA and RECORD_CONTENT VARIANT columns — RECORD_METADATA includes the topic, partition, offset, and key information, while RECORD_CONTENT holds the message payload
- B) The Kafka connector only stores the message payload; metadata must be extracted via a Kafka Streams preprocessing step before ingestion
- C) The connector stores metadata in a separate _METADATA table that must be joined with the content table
- D) Kafka message keys are discarded by the connector and cannot be persisted in Snowflake

---

## Q81 (Single Answer)
A data engineer is using the Snowflake Python connector's write_pandas() function to load a large pandas DataFrame. Which statement correctly describes how write_pandas() works internally?
- A) write_pandas() converts the DataFrame to a file format, uses a PUT command to upload it to a temporary internal stage, and then executes a COPY INTO command to load the data into the target table
- B) write_pandas() inserts rows one-by-one using parameterized INSERT statements via the cursor
- C) write_pandas() uses the Snowflake Ingest SDK (Snowpipe Streaming) to write the DataFrame rows directly
- D) write_pandas() serializes the DataFrame to Parquet format and uploads it directly to the target table's data micro-partitions

---

## Q82 (Multi Answer - Select 2)
An architect is configuring the Snowflake JDBC driver for a high-throughput Java application that runs hundreds of concurrent queries. The architect needs to optimize connection management and result set handling. Which TWO JDBC driver configuration best practices should the architect implement? (Select 2)
- A) Use a JDBC connection pool (e.g., HikariCP) to manage and reuse Snowflake connections, reducing the overhead of establishing new sessions for each query
- B) Set CLIENT_SESSION_KEEP_ALIVE=true to prevent idle sessions from being closed during periods of inactivity between queries
- C) Create a new JDBC Connection object for every single query execution to ensure session isolation
- D) Set JDBC_TREAT_DECIMAL_AS_INT=true to improve query performance for all numeric operations
- E) Disable result set caching by setting CLIENT_RESULT_COLUMN_CASE_INSENSITIVE=false to reduce memory usage

---

## Q83 (Scenario)
An architect is designing a Snowpark application that creates both scalar UDFs and vectorized UDFs (using pandas). The team processes a table with 200 million rows and needs to apply a custom transformation to a text column. A scalar UDF processes one row at a time, while a vectorized UDF receives batches as pandas Series. Why might the architect prefer the vectorized version for this use case?
- A) The vectorized version is syntactically simpler and easier to maintain
- B) The vectorized UDF processes rows in batches as pandas Series rather than one row at a time, significantly reducing Python interpreter overhead and leveraging pandas' optimized string operations for better performance on large datasets
- C) The vectorized version pushes the transformation entirely to the Snowflake SQL engine, avoiding Python execution altogether
- D) The vectorized version allows the UDF to run across multiple warehouses simultaneously for parallel processing

---

## Q84 (Scenario)
A large enterprise is migrating its data platform to Snowflake. The platform team must support: (1) Java web app with interactive queries and connection pooling, (2) Apache Spark cluster for nightly ETL, (3) Python data science team deploying ML feature pipelines in Snowflake, (4) Go microservice needing SQL without a native driver, (5) Nightly batch SQL scripts from a cron-scheduled Linux server. Which architecture correctly maps each requirement?
- A) 1: JDBC driver, 2: Spark connector, 3: Snowpark Python, 4: SQL API, 5: SnowSQL
- B) 1: ODBC driver, 2: Python connector, 3: JDBC driver, 4: SnowSQL, 5: Spark connector
- C) 1: SQL API, 2: JDBC driver, 3: Python connector, 4: ODBC driver, 5: Snowpark Python
- D) 1: Python connector, 2: Snowpark Python, 3: Spark connector, 4: JDBC driver, 5: SQL API
- E) 1: JDBC driver, 2: Snowpark Python, 3: Spark connector, 4: SnowSQL, 5: SQL API

---

## Q85 (Scenario)
A data engineering team maintains a dynamic table chain: raw_events → enriched_events → aggregated_metrics. The raw_events dynamic table has a target lag of 1 minute, enriched_events has a target lag of 5 minutes, and aggregated_metrics has a target lag of DOWNSTREAM. The team notices that aggregated_metrics sometimes shows data that is up to 11 minutes stale. What explains this behavior?
- A) The DOWNSTREAM target lag on aggregated_metrics means it inherits the sum of all upstream lags, so 1 + 5 + 5 = 11 minutes is expected
- B) The DOWNSTREAM keyword is invalid for terminal dynamic tables and defaults to a 10-minute lag plus processing time
- C) Each dynamic table's lag is measured independently from its own refresh cycle; the cumulative end-to-end latency is the sum of individual target lags plus processing time at each stage
- D) Dynamic table chains always add an additional 5-minute buffer for consistency guarantees, resulting in 1 + 5 + 5 = 11 minutes
- E) The DOWNSTREAM setting causes aggregated_metrics to refresh only when explicitly triggered by a consumer query, adding variable delay

---

## Q86 (Single Answer)
An architect is designing a data pipeline that transforms JSON payloads ingested into a VARIANT column. The JSON contains deeply nested arrays of objects, and the architect needs to produce a relational table with one row per nested element while preserving the parent-child hierarchy. Which approach is most appropriate?
- A) Use recursive FLATTEN with the RECURSIVE => TRUE parameter to automatically unnest all levels in a single pass
- B) Use chained lateral FLATTEN operations, each targeting a successive nesting level, joined with the parent using the LATERAL keyword
- C) Use PARSE_JSON combined with GET_PATH to extract each nested level into separate CTEs, then join them manually on synthetic keys
- D) Use OBJECT_CONSTRUCT to restructure the JSON into a flat format before querying, then apply a single FLATTEN

---

## Q87 (Multi Answer - Select 2)
A company uses a medallion architecture (bronze → silver → gold) in Snowflake. The silver layer applies deduplication, type casting, and schema enforcement on semi-structured data from the bronze layer. Which two design decisions align with best practices for the silver layer? (Choose 2)
- A) Implement the silver layer as dynamic tables with full refresh mode to ensure idempotent transformations on every cycle
- B) Implement the silver layer as dynamic tables with incremental refresh mode and use MERGE logic in the defining query to handle late-arriving duplicates
- C) Define explicit column types in the silver dynamic table definitions rather than retaining VARIANT columns, enabling predicate pushdown and micro-partition pruning
- D) Keep all data in VARIANT format through the silver layer and defer type casting to the gold layer to maintain schema flexibility
- E) Apply CLUSTER BY on the bronze layer tables to optimize reads for the silver layer transformations

---

## Q88 (Single Answer)
An architect needs to create a stored procedure that dynamically builds and executes DDL statements based on metadata stored in a configuration table. The procedure must run with the privileges of the role that calls it, and it must handle transaction rollback if any DDL statement fails. Which implementation choice is correct?
- A) A JavaScript stored procedure with EXECUTE AS CALLER rights, using snowflake.execute() inside a try-catch block with explicit BEGIN TRANSACTION and ROLLBACK calls
- B) A SQL stored procedure with EXECUTE AS CALLER rights, using a BEGIN ... EXCEPTION ... END block with ROLLBACK in the exception handler
- C) A Snowpark (Python) stored procedure with EXECUTE AS OWNER rights, using session.sql() calls wrapped in Python try-except with session.sql("ROLLBACK")
- D) DDL statements are auto-committed in Snowflake and cannot be rolled back within a stored procedure regardless of language or rights model

---

## Q89 (Scenario)
A retail company ingests point-of-sale events via Snowpipe into a staging table with a standard stream attached. A scheduled task reads the stream every 5 minutes and merges changes into a curated table. During a system outage, Snowpipe was paused for 2 hours. After resumption, the stream's offset was not manually advanced. What happens when the task resumes?
- A) The stream contains only the events that arrived after Snowpipe resumed; events during the outage are lost from the stream
- B) The stream contains all unconsumed changes since the last DML transaction that consumed it, including all events loaded by Snowpipe after resumption and any events that were already in the staging table but not yet consumed
- C) The stream automatically expires after the 2-hour gap because the data retention period was exceeded
- D) The task fails because SYSTEM$STREAM_HAS_DATA returns an error when the stream offset is stale beyond the task schedule interval

---

## Q90 (Single Answer)
An architect is evaluating whether to use a materialized view or a dynamic table to serve a pre-aggregated dashboard query. The source table receives approximately 50 million new rows per day via continuous loading. The dashboard tolerates up to 10 minutes of data staleness. Which factor most strongly favors choosing a dynamic table over a materialized view?
- A) Dynamic tables support arbitrary SQL complexity in their definitions, including joins, subqueries, and window functions, whereas materialized views have significant SQL restrictions
- B) Dynamic tables consume zero compute credits for maintenance because they use background services, while materialized views require a dedicated warehouse
- C) Materialized views provide better query performance because their results are stored in a system-optimized cache layer
- D) Dynamic tables can be defined on external tables, whereas materialized views cannot reference any table type other than native Snowflake tables

---

## Q91 (Multi Answer - Select 2)
A data engineer has created a JavaScript UDF that performs complex string parsing on VARIANT data. The engineer is concerned about two issues: (1) unauthorized users seeing the proprietary parsing logic, and (2) the UDF performing poorly on large datasets. Which two actions address these concerns respectively? (Choose 2)
- A) Mark the UDF as SECURE to prevent the function definition from being exposed through GET_DDL() or the INFORMATION_SCHEMA
- B) Convert the JavaScript UDF to a SQL UDF, as SQL UDFs always execute faster than JavaScript UDFs due to native compilation
- C) Rewrite the UDF as a vectorized Python UDF using the VECTORIZED input method with pandas DataFrames to leverage batch processing
- D) Set the UDF to EXECUTE AS OWNER to hide the function body from callers
- E) Add IMMUTABLE volatility to the UDF so Snowflake can cache results and avoid re-execution for repeated inputs

---

## Q92 (Single Answer)
An external function is configured to call a third-party geocoding API through an API integration. The function is invoked on a table with 10 million rows. The architect observes that the function call takes an excessively long time and the API provider reports receiving millions of individual HTTP requests. What is the most likely misconfiguration?
- A) The MAX_BATCH_ROWS property on the external function is set to 1, causing Snowflake to send one row per HTTP request instead of batching
- B) The API integration's API_ALLOWED_PREFIXES is too restrictive, causing Snowflake to retry failed requests individually
- C) The external function was not defined with the SECURE keyword, so Snowflake cannot optimize batching
- D) External functions always send one row per HTTP request; the architect should use a stored procedure with explicit HTTP batching instead

---

## Q93 (Scenario)
An architect designs a task graph where Task A (root) loads data into a staging table, Task B and Task C are children of Task A that run in parallel performing different transformations, and Task D is a child of both Task B and Task C that performs a final merge. Task D's definition includes WHEN SYSTEM$STREAM_HAS_DATA('final_stream'). During a run, Task A succeeds, Task B succeeds, but Task C fails. What is the behavior of Task D?
- A) Task D is skipped because its predecessor Task C failed, regardless of the stream condition
- B) Task D runs if the stream has data because the WHEN clause takes precedence over predecessor status
- C) Task D runs but with a warning about the failed predecessor, and only processes data from Task B's output
- D) The entire task graph is rolled back and Task A's changes are reverted
- E) Task D enters a BLOCKED state and retries after the task graph's retry interval

---

## Q94 (Single Answer)
A data engineer uses a LATERAL FLATTEN on a VARIANT column that contains a JSON array. Some rows have the array field set to null, and some rows are missing the field entirely. The engineer notices that these rows are excluded from the output. How should the engineer retain all rows, including those with null or missing arrays?
- A) Use LATERAL FLATTEN(...) AS f with an OUTER => TRUE parameter to produce a row with NULL values for the flattened columns when the input is null or missing
- B) Use a LEFT JOIN with a subquery that performs the FLATTEN instead of LATERAL FLATTEN to preserve all rows
- C) Apply NVL on the array field to replace nulls with an empty array [] before flattening, and use IFNULL for missing fields
- D) Add a WHERE clause after the FLATTEN to filter out nulls, then UNION ALL with the original rows that had null arrays

---

## Q95 (Single Answer)
An architect is building a multi-layer ELT pipeline in Snowflake. The raw layer uses COPY INTO with MATCH_BY_COLUMN_NAME to load Parquet files into structured tables. The transformation layer uses dynamic tables. The consumption layer exposes data through secure views. Which statement correctly describes a cost optimization consideration for this architecture?
- A) Dynamic tables in the transformation layer incur only serverless compute costs and do not require a user-managed warehouse, making them more cost-efficient for pipelines with predictable refresh intervals
- B) Secure views in the consumption layer have no performance overhead compared to regular views because the SECURE keyword only affects metadata visibility
- C) Using MATCH_BY_COLUMN_NAME during COPY INTO eliminates the need for a staging layer because it automatically handles schema evolution
- D) Dynamic tables always perform a full refresh, so their compute cost scales linearly with the total data volume regardless of how much new data arrives

---

## Q96 (Multi Answer - Select 2)
A financial services company requires stored procedures that enforce strict security boundaries. Procedure A calculates risk metrics and must not expose intermediate calculations to the caller. Procedure B generates audit reports and must query tables owned by the calling role. Which two configurations are correct? (Choose 2)
- A) Procedure A should use EXECUTE AS OWNER rights so that intermediate results exist only in the owner's session context and are not visible to the caller
- B) Procedure A should use EXECUTE AS CALLER rights with a SECURE modifier to hide intermediate calculations
- C) Procedure B should use EXECUTE AS CALLER rights so it operates on the tables and data accessible to the invoking role
- D) Procedure B should use EXECUTE AS OWNER rights and explicitly grant SELECT on all possible audit tables to the procedure's owner role
- E) Both procedures should use EXECUTE AS OWNER rights with GRANT IMPORTED PRIVILEGES to access caller-owned tables

---

## Q97 (Single Answer)
An architect needs to provide a tabular UDF (UDTF) that reads data from a Snowflake stage, applies row-level transformations, and returns a structured result set. The UDF must handle files up to 500 MB. Which implementation is most appropriate?
- A) A JavaScript UDTF that uses the snowflake library's createStatement to read staged files and process them row by row
- B) A Python UDTF using the Snowpark FileOperation API within the process method, leveraging pandas for batch transformation
- C) A SQL UDTF that references a stage path directly using the @stage/path notation in its body
- D) A Java UDTF with the SnowflakeFile class to read files from the stage, processing them in the process method with buffered I/O

---

## Q98 (Scenario)
A healthcare organization has a dynamic table patient_encounters that joins 5 source tables, applies complex window functions for patient journey calculations, and has a target lag of 2 minutes. The dynamic table consistently fails to meet its target lag, with refresh times averaging 8 minutes. The underlying warehouse is size MEDIUM. Which action is most likely to resolve the lag issue?
- A) Increase the warehouse size to X-LARGE to provide more compute resources for the complex refresh query
- B) Change the target lag to DOWNSTREAM so the dynamic table only refreshes when consumed
- C) Split the single dynamic table into a chain of simpler dynamic tables, each performing a subset of the transformations, to enable incremental refresh at each stage
- D) Convert the dynamic table to a materialized view, which has a more efficient background refresh mechanism for complex queries
- E) Add CLUSTER BY to all 5 source tables on the join keys to reduce scan time during refresh

---

## Q99 (Single Answer)
A data engineer writes a query to extract values from nested JSON stored in a VARIANT column payload. The path payload:customer.address.zip::NUMBER returns NULL for some rows even though the JSON clearly contains the zip field nested under address. What is the most likely cause?
- A) The dot notation path payload:customer.address.zip is interpreted as a single key "customer.address.zip" at the top level rather than traversing nested objects; the correct path is payload:customer:address:zip
- B) The ::NUMBER cast fails silently when zip contains leading zeros, returning NULL instead of raising an error
- C) LATERAL FLATTEN on the items array causes all non-flattened paths to return NULL due to scope resolution rules
- D) The VARIANT column does not support more than two levels of dot notation nesting; GET_PATH must be used for deeper paths

---

## Q100 (Single Answer)
An architect is considering using an append-only stream instead of a standard stream on a high-volume staging table. The table receives approximately 1 billion inserts per day with no updates or deletes. A downstream task consumes the stream every 15 minutes to load data into a reporting table. What is the primary advantage of using an append-only stream in this scenario?
- A) Append-only streams have significantly lower overhead because they only track INSERT operations and do not need to maintain offset metadata for UPDATE and DELETE operations
- B) Append-only streams allow the task to process data in parallel across multiple warehouses, whereas standard streams are single-threaded
- C) Append-only streams automatically compact the staging table's micro-partitions, reducing storage costs
- D) Append-only streams support a longer data retention period than standard streams, reducing the risk of stream staleness

---

## Q101 (Multi Answer - Select 2)
An architect is designing a transformation pipeline that processes semi-structured IoT data. The raw data arrives as deeply nested JSON with variable schemas. The architect must: (1) extract device telemetry from arrays nested 4 levels deep, and (2) construct a normalized output with a deterministic schema. Which two techniques should be used? (Choose 2)
- A) Use FLATTEN with explicit path expressions at each nesting level, chaining multiple lateral joins to reach the 4th level of nesting
- B) Use FLATTEN with RECURSIVE => TRUE to automatically traverse all nesting levels and extract all leaf values into a flat result set
- C) Use OBJECT_CONSTRUCT combined with explicit column aliases to assemble the output into a deterministic schema from the flattened results
- D) Use PARSE_JSON on the already-loaded VARIANT data to re-parse it at each transformation stage for schema consistency
- E) Use STRIP_NULL_VALUE on the VARIANT column to normalize the schema before flattening

---

## Q102 (Single Answer)
A company's data platform team manages 200+ dynamic tables organized in a complex dependency graph. An architect needs to understand the refresh status and identify bottlenecks. Which approach provides the most comprehensive operational visibility into the dynamic table pipeline?
- A) Query INFORMATION_SCHEMA.DYNAMIC_TABLE_REFRESH_HISTORY() to analyze refresh durations, lag metrics, and failure patterns across the pipeline
- B) Use SHOW DYNAMIC TABLES and check the scheduling_state column, then manually correlate with query history
- C) Set up a task that periodically runs DESCRIBE DYNAMIC TABLE on each table and logs the target lag vs actual lag
- D) Use the SNOWFLAKE.ACCOUNT_USAGE.DYNAMIC_TABLE_REFRESH_HISTORY view for historical analysis combined with INFORMATION_SCHEMA.DYNAMIC_TABLE_REFRESH_HISTORY() for near-real-time monitoring

---

## Q103 (Scenario)
A financial services firm has a stored procedure that performs end-of-day settlement calculations. The procedure begins a transaction, updates multiple tables, and commits at the end. During execution, an unexpected error occurs after updating 3 of 5 tables. The procedure is written in SQL with EXECUTE AS OWNER rights. The exception handler calls ROLLBACK. After investigating, the team finds that only 2 of the 3 updated tables were rolled back — the third table's changes persisted. What is the most likely explanation?
- A) One of the first three statements was a DDL operation, which caused an implicit commit before the DDL executed, making the preceding DML changes permanent
- B) The EXECUTE AS OWNER rights model uses separate transaction contexts for each statement, so rollback only affects the last two statements
- C) SQL stored procedures do not support multi-statement transactions; each statement auto-commits regardless of explicit BEGIN TRANSACTION
- D) The ROLLBACK failed silently due to a lock conflict on the third table from a concurrent session

---

## Q104 (Single Answer)
An architect is designing a secure data sharing solution where consumers can call a function to compute aggregated metrics on shared data. The function definition contains proprietary business logic. Which implementation ensures that the function's logic is hidden from consumers while still being callable?
- A) Create a secure UDF (CREATE SECURE FUNCTION) and share it through a secure share; the consumer can execute the function but cannot view its definition via GET_DDL() or INFORMATION_SCHEMA
- B) Create a regular UDF and restrict GET_DDL() access by revoking the MONITOR privilege from the consumer role
- C) Create the UDF as an external function pointing to a private API endpoint, so the logic resides outside Snowflake entirely
- D) Create an owner's rights stored procedure and share it; stored procedures always hide their definition from non-owners

---

## Q105 (Single Answer)
An architect needs to transform a table column containing comma-separated values into individual rows. The column is of type VARCHAR, not VARIANT. Which approach correctly achieves this?
- A) SELECT t.id, f.value::STRING AS item FROM my_table t, LATERAL FLATTEN(input => SPLIT(t.csv_column, ',')) f
- B) SELECT t.id, f.value::STRING AS item FROM my_table t, LATERAL FLATTEN(input => PARSE_JSON(t.csv_column)) f
- C) SELECT t.id, f.value::STRING AS item FROM my_table t, LATERAL FLATTEN(input => STRTOK_TO_ARRAY(t.csv_column, ',')) f
- D) Both A and C are correct approaches that produce equivalent results
- E) Only C is correct; SPLIT returns a VARCHAR, not an ARRAY, so it cannot be used with FLATTEN

---

## Q106 (Multi Answer - Select 2)
An architect is designing a task graph for a nightly batch ELT pipeline. The pipeline has 15 transformations with complex dependencies. Two of the transformations are optional and should only run when their respective source streams have new data. Which two features of Snowflake task graphs support this design? (Choose 2)
- A) Use the WHEN clause with SYSTEM$STREAM_HAS_DATA() on the two optional tasks to conditionally skip them when no new data is available
- B) Use ALLOW_OVERLAPPING_EXECUTION = TRUE on the root task to enable parallel execution of all 15 transformations
- C) Define the 15 tasks using AFTER clauses to establish the dependency DAG, ensuring correct execution order based on the predecessor-successor relationships
- D) Use TASK_AUTO_RETRY_ATTEMPTS on the root task to automatically retry the entire graph if any optional task is skipped
- E) Create separate standalone tasks for the optional transformations, scheduled independently from the main task graph

---

## Q107 (Single Answer)
A data engineer creates a view that joins a dynamic table with a regular table and applies row-level security using CURRENT_ROLE(). The view is defined as SECURE. Which statement is true about the query optimizer's behavior when users query this secure view?
- A) The query optimizer cannot push predicates from the outer query through the secure view boundary, which may result in lower performance compared to a non-secure view
- B) The query optimizer treats secure views identically to non-secure views and applies all optimizations including predicate pushdown
- C) The query optimizer automatically materializes the secure view's result set to prevent predicate pushdown from leaking information
- D) The SECURE keyword only affects metadata visibility in SHOW VIEWS and has no impact on query optimization

---

## Q108 (Scenario)
An e-commerce company loads product catalog data from an external API as JSON into a VARIANT column. The JSON structure has changed over time: older records use "price" as a string ("29.99"), while newer records use "price" as a number (29.99). A dynamic table transforms this data and casts price to NUMBER(10,2). The dynamic table refresh starts failing intermittently. What is the root cause and solution?
- A) The string "29.99" cannot be implicitly cast to NUMBER(10,2) in a dynamic table context; the solution is to use TRY_CAST(payload:price::STRING AS NUMBER(10,2)) to handle both formats gracefully
- B) VARIANT type coercion handles both string and numeric representations automatically; the intermittent failure is caused by null values, not type differences
- C) The ::NUMBER(10,2) cast succeeds for both string and numeric VARIANT values because Snowflake's VARIANT casting handles implicit conversion; the root cause is likely data corruption or records where price contains non-numeric strings like "N/A" or "TBD"
- D) Dynamic tables cannot cast VARIANT values to fixed-precision numbers; the solution is to cast to FLOAT first, then to NUMBER(10,2) in a subsequent dynamic table

---

## Q109 (Single Answer)
An architect is evaluating the performance impact of an external function used in a SELECT statement that processes 50 million rows. The external function calls a remote REST API through an API integration. Which factor has the greatest impact on overall query execution time?
- A) The network round-trip latency to the remote service, amplified across multiple batches, combined with the remote service's per-request processing time
- B) The size of the Snowflake warehouse executing the query, as external functions scale linearly with warehouse size
- C) The number of columns passed to the external function, as each column adds a separate HTTP header to the request
- D) The COMPRESSION setting on the API integration, which determines whether payloads are gzip-compressed in transit

---

## Q110 (Single Answer)
A data engineer needs to create a stored procedure that accepts a table name as a parameter, validates that the table exists, and then performs a series of transformations. The procedure must be written in SQL and use caller's rights. What is the correct approach to dynamically reference the table name in SQL statements within the procedure?
- A) Use the IDENTIFIER() function to convert the string parameter to a valid object reference, e.g., SELECT * FROM IDENTIFIER(:table_name)
- B) Use string concatenation to build SQL strings and execute them with EXECUTE IMMEDIATE, e.g., EXECUTE IMMEDIATE 'SELECT * FROM ' || table_name
- C) Both A and B work, but A is preferred because IDENTIFIER() provides protection against SQL injection, whereas B does not
- D) Use the :table_name binding directly in the FROM clause, e.g., SELECT * FROM :table_name, as Snowflake resolves bound variables as identifiers automatically

---

## Q111 (Multi Answer - Select 2)
An architect is designing a real-time analytics pipeline using streams and tasks. The source table receives 100,000 inserts per minute with occasional updates to existing rows. The downstream consumer needs to see the latest state of each record. Which two design decisions are appropriate? (Choose 2)
- A) Use a standard stream (not append-only) on the source table to capture both inserts and updates, then use a MERGE statement in the task to apply changes to the target
- B) Use an append-only stream on the source table and implement a separate process to detect and apply updates to the target
- C) Set the task schedule to run every 1 minute with ALLOW_OVERLAPPING_EXECUTION = FALSE to prevent duplicate processing during long-running merges
- D) Set ALLOW_OVERLAPPING_EXECUTION = TRUE to ensure no data is missed if a merge takes longer than 1 minute
- E) Use a standard stream with SHOW_INITIAL_ROWS = TRUE to capture the full table state on the first run, simplifying the initial load

---

## Q112 (Scenario)
An architect is migrating a legacy ETL pipeline to Snowflake. The legacy system uses a staging → transformation → presentation pattern with 45 transformation steps, many of which have inter-dependencies. The architect proposes replacing all 45 transformation steps with dynamic tables. A senior engineer raises a concern about a subset of transformations that use non-deterministic functions like CURRENT_TIMESTAMP() and UUID_STRING(). Why is this a valid concern?
- A) Dynamic tables with non-deterministic functions may produce different results on each refresh, making the pipeline non-idempotent and potentially causing inconsistencies in downstream dynamic tables that depend on them
- B) Non-deterministic functions are completely prohibited in dynamic table definitions and will cause a compile-time error
- C) Non-deterministic functions force the dynamic table to always perform a full refresh instead of incremental refresh, negating the performance benefits of dynamic tables
- D) Non-deterministic functions cause dynamic tables to refresh more frequently than the target lag specifies, increasing compute costs unpredictably

---

## Q113 (Single Answer)
A data engineer needs to construct a JSON object from relational columns for an API response. The output must include nested objects and arrays derived from grouped data. Which SQL pattern correctly produces a single JSON document per customer containing an array of their orders?
- A) SELECT customer_id, OBJECT_CONSTRUCT('name', name, 'orders', ARRAY_AGG(OBJECT_CONSTRUCT('order_id', order_id, 'amount', amount))) AS customer_json FROM orders GROUP BY customer_id, name
- B) SELECT customer_id, TO_JSON(OBJECT_CONSTRUCT(*)) AS customer_json FROM orders
- C) SELECT customer_id, PARSE_JSON(ARRAY_TO_STRING(ARRAY_AGG(order_id), ',')) AS customer_json FROM orders GROUP BY customer_id
- D) SELECT customer_id, OBJECT_AGG(order_id, amount) AS customer_json FROM orders GROUP BY customer_id

---

## Q114 (Single Answer)
An architect is designing a multi-tenant SaaS platform where each tenant's data transformations run as stored procedures. The architect needs to ensure that a long-running stored procedure for one tenant does not block other tenants' transformations. Which design choice best addresses this?
- A) Use separate warehouses per tenant so that stored procedure execution is isolated at the compute level, preventing resource contention
- B) Use EXECUTE AS OWNER rights on all stored procedures so they run in independent transaction contexts
- C) Implement all transformations as external functions so they execute outside Snowflake's compute layer
- D) Use the STATEMENT_TIMEOUT_IN_SECONDS parameter on a per-procedure basis to prevent any single procedure from consuming excessive resources

---

## Q115 (Single Answer)
A data engineer creates a Python UDF that imports the pandas library for data transformation. The UDF is called on a table with 500 million rows. The engineer notices significantly slow performance. Which optimization would have the most significant impact?
- A) Convert the scalar Python UDF to a vectorized Python UDF using the @udf decorator with input=PandasDataFrame to process rows in batches instead of one at a time
- B) Increase the warehouse size from MEDIUM to 2X-LARGE to provide more Python runtime resources
- C) Add the IMMUTABLE keyword to the UDF definition so Snowflake can cache and reuse results
- D) Replace the pandas import with numpy since numpy has lower initialization overhead in Snowflake's Python runtime

---

## Q116 (Multi Answer - Select 2)
An architect needs to implement change data capture (CDC) from an operational source table to a dimensional model. The source table receives inserts, updates, and soft deletes (via an is_deleted flag). Which two implementation choices correctly handle this CDC pattern? (Choose 2)
- A) Use a standard stream on the source table to capture all three change types (inserts, updates, soft deletes), with METADATA$ACTION and METADATA$ISUPDATE columns to distinguish between them
- B) Use an append-only stream and filter for METADATA$ACTION = 'DELETE' to detect soft deletes
- C) In the consuming task, use a MERGE statement that matches on the business key, inserts new records, updates changed records, and sets a dimension valid_to date for soft-deleted records based on the is_deleted flag
- D) Use two separate streams — one standard and one append-only — on the same source table to separately capture different change types
- E) Configure the stream with DATA_RETENTION_TIME_IN_DAYS = 0 to ensure changes are captured in real-time with no delay

---

## Q117 (Scenario)
An architect reviews a dynamic table definition that references another dynamic table. gold.customer_360 has TARGET_LAG = '10 minutes' and joins silver.customers (regular table), silver.order_summary (dynamic table with TARGET_LAG = '5 minutes'), and silver.sentiment_analysis (dynamic table with TARGET_LAG = DOWNSTREAM). What is the effective refresh behavior of gold.customer_360?
- A) gold.customer_360 refreshes every 10 minutes; silver.sentiment_analysis adopts a 10-minute lag inherited from its downstream consumer
- B) gold.customer_360 refreshes every 10 minutes; silver.sentiment_analysis refreshes every 5 minutes to match silver.order_summary
- C) gold.customer_360 refreshes every 15 minutes because it must wait for both upstream dynamic tables to complete their refresh cycles
- D) gold.customer_360 cannot be created because it references both a dynamic table with a fixed lag and one with DOWNSTREAM lag

---

## Q118 (Single Answer)
An architect needs to implement a UDF that calls an internal ML scoring model hosted on a private endpoint within the company's cloud VPC. The UDF must pass row data to the endpoint and return predictions. Which approach is architecturally correct in Snowflake?
- A) Create an external function with an API integration that routes through an API Gateway or proxy accessible from Snowflake, connecting to the private endpoint
- B) Create a Python UDF that uses the requests library to directly call the private endpoint from within Snowflake's compute layer
- C) Create a JavaScript UDF with XMLHttpRequest to call the private endpoint, as JavaScript UDFs have network access by default
- D) Create a stored procedure with an external access integration that allows outbound HTTPS calls to the private endpoint, then wrap it in a UDF

---

## Q119 (Single Answer)
A data engineer notices that a GET_PATH call on a VARIANT column returns NULL unexpectedly. The column contains JSON like {"Event-Type": "click", "user_id": 123}. The failing query is SELECT GET_PATH(payload, 'Event-Type') FROM events. What is the cause of the NULL result?
- A) The hyphen in Event-Type is interpreted as a subtraction operator in the path expression; the correct syntax is GET_PATH(payload, '"Event-Type"') with quoted key names
- B) GET_PATH does not support keys with special characters; the engineer must use bracket notation: payload['Event-Type']
- C) The path must be specified using colon notation: payload:"Event-Type" instead of GET_PATH
- D) Both B and C are valid approaches to access keys containing special characters like hyphens

---

## Q120 (Multi Answer - Select 2)
An architect is designing a data pipeline where raw JSON data must be transformed into a star schema. The pipeline must handle schema evolution (new fields appearing in the JSON) without pipeline failures. Which two architectural decisions support this requirement? (Choose 2)
- A) Load raw JSON into a VARIANT column in the raw layer, which inherently accommodates any schema changes without requiring DDL modifications
- B) Define explicit column mappings in the transformation layer using TRY_CAST and coalesce patterns like COALESCE(payload:new_field, payload:legacy_field) to handle field additions gracefully
- C) Use COPY INTO with ON_ERROR = 'SKIP_FILE' to silently drop files that don't match the expected schema
- D) Define the raw layer tables with typed columns matching the current JSON schema, using ALTER TABLE ADD COLUMN via automated DDL when new fields are detected
- E) Use MATCH_BY_COLUMN_NAME = 'CASE_INSENSITIVE' during COPY INTO to automatically map new JSON fields to table columns without manual intervention

---

## Q121 (Scenario)
A data engineering team has a task graph with a root task scheduled every 10 minutes. The graph contains 8 tasks in total. After deploying to production, they notice that the root task's ALLOW_OVERLAPPING_EXECUTION is set to FALSE (default). During peak hours, individual graph executions sometimes take 12 minutes. What is the operational impact?
- A) When execution exceeds 10 minutes, the next scheduled run is skipped entirely; this means some data intervals may not be processed until the following successful trigger, potentially doubling the latency for that interval
- B) When execution exceeds 10 minutes, the next run queues and starts immediately after the current run completes, ensuring no data is lost
- C) Snowflake automatically extends the schedule interval to match the execution time, dynamically changing it to 12 minutes
- D) The task graph is automatically suspended after 3 consecutive skipped runs, requiring manual intervention to resume

---

## Q122 (Single Answer)
An architect is implementing a stored procedure in Snowpark Python that performs a large data transformation. The procedure needs to create a temporary table, populate it with intermediate results, and then join it with other tables for the final output. Which consideration is critical for correct behavior?
- A) Temporary tables created inside a Snowpark stored procedure are session-scoped and persist for the duration of the session; if the procedure is called multiple times concurrently by different users, each gets an isolated temporary table due to session isolation
- B) Temporary tables created inside stored procedures are automatically dropped when the procedure returns, regardless of the session scope
- C) Snowpark Python procedures cannot create temporary tables; they must use CTEs or subqueries for intermediate results
- D) Temporary tables in stored procedures require explicit GRANT statements to be accessible within the same procedure, even with owner's rights

---

## Q123 (Single Answer)
An architect reviews a pipeline where a dynamic table chain processes data through three layers. The first dynamic table has REFRESH_MODE = INCREMENTAL. The architect notices that the dynamic table occasionally performs a full refresh instead of incremental. What is the most likely cause?
- A) REFRESH_MODE = INCREMENTAL is a hint, not a guarantee; Snowflake may fall back to full refresh if the query optimizer determines that incremental refresh is not possible or efficient for a given refresh cycle due to factors like underlying data changes or table structure modifications
- B) Snowpipe loads always trigger full refreshes on dynamic tables because the loading mechanism invalidates incremental tracking
- C) SELECT * prevents incremental refresh because the system cannot track column-level changes; specifying explicit columns would fix the issue
- D) The 1-minute target lag is too aggressive and forces full refreshes when the incremental refresh cannot complete within the time budget

---

## Q124 (Single Answer)
A data engineer creates a SQL UDF that calculates a complex business metric using multiple CTEs and window functions. The UDF is used in a WHERE clause of a query on a 1-billion-row table. The query performs very poorly. What is the primary performance issue?
- A) SQL UDFs used in WHERE clauses are inlined by the optimizer, but complex UDFs with CTEs and window functions may prevent predicate pushdown to the base table scan, causing a full table scan before applying the filter
- B) SQL UDFs are always executed row-by-row regardless of their internal complexity, creating a performance bottleneck in the WHERE clause
- C) SQL UDFs cannot be used in WHERE clauses; they can only be used in SELECT and HAVING clauses
- D) The window functions inside the UDF create temporary result sets that consume memory proportional to the full table size, regardless of the filter selectivity

---

## Q125 (Multi Answer - Select 2)
An architect is designing an error handling strategy for an ELT pipeline that uses a combination of tasks, stored procedures, and external functions. The external function occasionally returns HTTP 429 (rate limit) errors. Which two strategies provide robust error handling? (Choose 2)
- A) Configure the task with TASK_AUTO_RETRY_ATTEMPTS = 3 so that transient external function failures trigger automatic task retries with exponential backoff
- B) Within the stored procedure, wrap the external function call in a loop with retry logic using TRY ... CATCH and SYSTEM$WAIT() to implement manual backoff before retrying
- C) Set the external function's MAX_BATCH_ROWS to a lower value to reduce the request rate and avoid triggering the remote API's rate limit
- D) Configure the API integration with RATE_LIMIT = 100 to automatically throttle outbound requests to the external service
- E) Use an event table to log external function errors and create an alert that notifies the operations team, but do not implement automatic retries to avoid cascading failures
