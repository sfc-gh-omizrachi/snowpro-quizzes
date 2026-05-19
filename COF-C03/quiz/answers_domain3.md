# Domain 3: Answers

---

## Q1
**Answer: B**

**Explanation:** COPY INTO <table> loads data from staged files into a Snowflake table. INSERT INTO is for row-level inserts, LOAD DATA is not a valid Snowflake command, and PUT uploads files to a stage (does not load into a table).

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "Loads data from staged files to an existing table."

---

## Q2
**Answer: A**

**Explanation:** The correct approach involves creating an external stage pointing to the S3 bucket, a file format specifying pipe delimiter and header skipping, and the COPY INTO command to load data. PUT is for local-to-stage uploads, not S3-to-table.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "Loads data from staged files to an existing table. The files must already be staged in one of the following locations: Named internal stage, Named external stage, External location (Amazon S3, Google Cloud Storage, or Microsoft Azure)."

---

## Q3
**Answer: B**

**Explanation:** PUT uploads files from a local file system to a Snowflake internal stage. It does not load data into tables (COPY INTO does that), export data, or create stages.

**Source:** [PUT](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Uploads (i.e. stages) data files from a local file system to one of the following Snowflake stages."

---

## Q4
**Answer: A, C**

**Explanation:** User stage (@~) and table stage (@%table_name) are internal stage types. Named internal stages are also internal. S3, Azure, and GCS stages are external stages.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Snowflake supports the following types of internal stages: User stage, Table stage, Named stage."

---

## Q5
**Answer: B**

**Explanation:** Internal stages store files in Snowflake-managed storage, while external stages reference files in customer-managed external cloud storage (S3, Azure Blob, GCS). Speed, file format support, and edition requirements are not the differentiators.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Internal stages store data files internally within Snowflake. External stages store data files in an external location (i.e., S3, GCS, or Azure)."

---

## Q6
**Answer: B**

**Explanation:** An external stage pointing to Azure Blob Storage allows Snowflake to access files stored there. Internal stages are for Snowflake-managed storage, and PUT is for uploading local files to internal stages.

**Source:** [CREATE STAGE](https://docs.snowflake.com/en/sql-reference/sql/create-stage)

**Quote:** "Creates a new named external stage that references an external location for storing data files."

---

## Q7
**Answer: D**

**Explanation:** Snowflake does not natively support XLSX (Excel) format for data loading. Supported formats include CSV, JSON, Avro, ORC, Parquet, and XML.

**Source:** [CREATE FILE FORMAT](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "Snowflake supports the following file format types: CSV, JSON, AVRO, ORC, PARQUET, XML."

---

## Q8
**Answer: B**

**Explanation:** A named stage is a database object created with CREATE STAGE that references a storage location (internal or external). It persists as an object and can be reused. It is not temporary, not a cache, and not a schema.

**Source:** [CREATE STAGE](https://docs.snowflake.com/en/sql-reference/sql/create-stage)

**Quote:** "Creates a new named internal or external stage to use for loading/unloading data."

---

## Q9
**Answer: B, D**

**Explanation:** JSON (B) and Avro (D) are semi-structured data formats. CSV (A) and TSV (E) are structured/delimited formats. Parquet (C) is a columnar format that can contain semi-structured data but is primarily structured.

**Source:** [Semi-Structured Data Types](https://docs.snowflake.com/en/sql-reference/data-types-semistructured)

**Quote:** "Snowflake supports loading semi-structured data from JSON, Avro, ORC, Parquet, and XML formats."

---

## Q10
**Answer: B**

**Explanation:** ON_ERROR = 'CONTINUE' continues loading when errors are encountered, skipping the problematic rows while loading the rest. ABORT_STATEMENT stops on the first error, SKIP_FILE skips entire files, and VALIDATION_MODE doesn't actually load data.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "CONTINUE: Continue to load the file if errors are found. The COPY command skips the rows that contain errors and loads the remaining rows."

---

## Q11
**Answer: B**

**Explanation:** ABORT_STATEMENT aborts the entire COPY operation when the first error is encountered. No data is loaded from any file in the batch. SKIP_FILE skips only the problematic file, and CONTINUE skips individual rows.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "ABORT_STATEMENT: Abort the COPY statement if any error is found in a data file."

---

## Q12
**Answer: B**

**Explanation:** VALIDATION_MODE validates staged files to check for errors without actually loading the data. Options include RETURN_ERRORS and RETURN_N_ROWS. It is a pre-load validation step.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "VALIDATION_MODE: Instructs the COPY command to validate the data files instead of loading them into the specified table."

---

## Q13
**Answer: C**

**Explanation:** You can query data directly from staged files using SELECT with $ column notation (e.g., SELECT $1, $2 FROM @stage/file.csv). VALIDATION_MODE validates but doesn't return data in a standard query format. This approach allows previewing without loading.

**Source:** [Querying Data in Staged Files](https://docs.snowflake.com/en/user-guide/querying-stage)

**Quote:** "You can query data files in a stage by using a SELECT statement with the stage reference and the $ column position notation."

---

## Q14
**Answer: A, C**

**Explanation:** ABORT_STATEMENT (A) aborts on the first error, and SKIP_FILE (C) skips the entire file containing errors. RETRY, IGNORE_ALL, and ROLLBACK are not valid ON_ERROR options. CONTINUE is another valid option not listed.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "ON_ERROR = { CONTINUE | SKIP_FILE | SKIP_FILE_num | ABORT_STATEMENT }"

---

## Q15
**Answer: B**

**Explanation:** COPY INTO <location> (with a stage or external location as the target) unloads/exports data from a Snowflake table to files. COPY INTO <table> loads data into a table.

**Source:** [COPY INTO <location>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location)

**Quote:** "Unloads data from a table (or query) into one or more files in one of the following locations."

---

## Q16
**Answer: C**

**Explanation:** If no file format is specified, COPY INTO defaults to CSV format. Users can explicitly specify other formats like JSON, Parquet, etc.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "TYPE = CSV | JSON | AVRO | ORC | PARQUET | XML (Default: CSV)"

---

## Q17
**Answer: B**

**Explanation:** The most efficient approach is to create an external stage pointing directly to S3 and use COPY INTO to load the Parquet file. Snowflake natively supports Parquet loading. Downloading locally first adds unnecessary overhead.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "Loads data from staged files to an existing table... files must already be staged in a Named external stage or External location (Amazon S3)."

---

## Q18
**Answer: B**

**Explanation:** Snowflake automatically applies server-side encryption to files stored in internal stages. Files are encrypted at rest within Snowflake's managed storage. This is separate from client-side encryption during upload.

**Source:** [Internal Stages](https://docs.snowflake.com/en/user-guide/data-load-internal)

**Quote:** "Snowflake automatically encrypts all data files stored in internal stages."

---

## Q19
**Answer: A, C**

**Explanation:** Snowflake can load multiple files in parallel using multiple threads (A) and automatically distributes file processing across warehouse nodes (C). Files do not need to be loaded one at a time (B) or pre-sorted (D).

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Snowflake loads data files in parallel, with each warehouse node processing one or more files simultaneously."

---

## Q20
**Answer: B**

**Explanation:** A directory table provides a catalog of files in a stage, with metadata such as file name, size, last modified date, and file URL. It can be queried with SQL. It is not a path storage table, format lookup, or user directory.

**Source:** [Directory Tables](https://docs.snowflake.com/en/user-guide/data-load-dirtables)

**Quote:** "A directory table stores a catalog of staged files in cloud storage, including file URLs, and other metadata."

---

## Q21
**Answer: B**

**Explanation:** Directory tables allow querying file metadata (name, size, last modified) using standard SQL. LIST @stage provides similar info but as a command, not a queryable table. Directory tables offer richer SQL integration.

**Source:** [Directory Tables](https://docs.snowflake.com/en/user-guide/data-load-dirtables)

**Quote:** "A directory table stores a catalog of staged files in cloud storage, including file URLs, and other metadata."

---

## Q22
**Answer: B**

**Explanation:** The LIST command (LS can also be used) lists files in a stage. SHOW FILES is not a valid command, SELECT * FROM @stage queries data content, and DESCRIBE STAGE shows stage properties.

**Source:** [LIST](https://docs.snowflake.com/en/sql-reference/sql/list)

**Quote:** "Returns a list of files that have been staged (i.e. uploaded from a local file system or unloaded from a table) to the specified stage."

---

## Q23
**Answer: B**

**Explanation:** A storage integration creates a trusted connection between Snowflake and external cloud storage using IAM roles (AWS), service principals (Azure), or service accounts (GCS), avoiding the need to embed credentials in stage definitions.

**Source:** [CREATE STORAGE INTEGRATION](https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration)

**Quote:** "A storage integration is a Snowflake object that stores a generated identity and access management (IAM) entity for your external cloud storage."

---

## Q24
**Answer: B**

**Explanation:** A storage integration with IAM role authentication eliminates the need to store AWS access keys in SQL. The integration uses a Snowflake-generated IAM entity that assumes the customer's IAM role. Network policies control IP access, not storage access.

**Source:** [CREATE STORAGE INTEGRATION](https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration)

**Quote:** "A storage integration is a Snowflake object that stores a generated identity and access management (IAM) entity for your external cloud storage, along with an optional set of allowed or blocked storage locations."

---

## Q25
**Answer: A, C**

**Explanation:** Snowflake supports storage integration with IAM role (A) for secure role-based access and direct AWS key credentials (C) in stage definitions. SSH keys (B), SAML (D), and OAuth for S3 (E) are not valid options.

**Source:** [CREATE STAGE](https://docs.snowflake.com/en/sql-reference/sql/create-stage)

**Quote:** "For S3, you can authenticate using a storage integration (recommended) or by providing AWS_KEY_ID and AWS_SECRET_KEY."

---

## Q26
**Answer: B**

**Explanation:** Snowpipe is a continuous, serverless data ingestion service that loads data automatically as files arrive in a stage. It uses serverless compute, not batch scheduling or warehouses.

**Source:** [Snowpipe Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe enables loading data from files as soon as they're available in a stage."

---

## Q27
**Answer: B**

**Explanation:** Snowpipe with auto-ingest automatically loads files as they arrive in S3, triggered by event notifications. It provides near-real-time loading without manual intervention. Scheduled tasks have higher latency.

**Source:** [Snowpipe Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe enables loading data from files as soon as they're available in a stage. The data is loaded according to the COPY statement defined in a referenced pipe."

---

## Q28
**Answer: B**

**Explanation:** Snowpipe auto-ingest on AWS uses S3 event notifications sent to an SQS queue. When a new file arrives, S3 sends a notification, which triggers Snowpipe to load the file. Snowflake does not poll S3.

**Source:** [Automating Snowpipe for Amazon S3](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3)

**Quote:** "Configure an event notification for your S3 bucket to notify Snowpipe of new files. The notification triggers a load of the files."

---

## Q29
**Answer: A, C**

**Explanation:** Snowpipe uses serverless compute managed by Snowflake (A), not virtual warehouses. It is designed for continuous micro-batch loading (C) as files arrive. It supports all file formats, not just CSV, and loads continuously rather than in large daily batches.

**Source:** [Snowpipe Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe uses server resources provided by Snowflake (i.e. a serverless compute model)."

---

## Q30
**Answer: B**

**Explanation:** Snowpipe billing is based on the serverless compute resources consumed during file loading, measured in compute seconds. It does not use a virtual warehouse, is not free, and is not billed per file.

**Source:** [Snowpipe Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe uses Snowflake-supplied compute resources and is billed accordingly."

---

## Q31
**Answer: B**

**Explanation:** The most common cause of Snowpipe not loading files is a misconfigured S3 event notification or SQS queue. Snowpipe uses serverless compute, not warehouses, so warehouse status is irrelevant.

**Source:** [Automating Snowpipe for Amazon S3](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3)

**Quote:** "Verify that the event notification is correctly configured to send messages to the SQS queue referenced by the pipe."

---

## Q32
**Answer: B**

**Explanation:** Snowpipe Streaming is a low-latency API that allows applications to insert rows directly into Snowflake tables without staging files first. It provides the lowest latency ingestion method.

**Source:** [Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Snowpipe Streaming enables you to load data using the Snowflake Ingest SDK by calling an API to write rows of data directly to Snowflake tables."

---

## Q33
**Answer: B**

**Explanation:** Snowpipe Streaming ingests rows directly via an API without intermediate files, providing lower latency. Standard Snowpipe loads data from staged files after they arrive. Streaming is newer and lower latency.

**Source:** [Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Unlike Snowpipe, which loads data from files, Snowpipe Streaming enables you to write rows of data directly into Snowflake tables, without requiring staging files."

---

## Q34
**Answer: A, C**

**Explanation:** Snowpipe can be triggered by auto-ingest via cloud event notifications (A) or by calling the Snowpipe REST API insertFiles endpoint (C). Manual warehouse resume, COPY INTO, and task scheduling are not Snowpipe triggers.

**Source:** [Snowpipe Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe can be triggered automatically using cloud messaging (auto-ingest) or by calling the insertFiles REST API."

---

## Q35
**Answer: B**

**Explanation:** A stream tracks DML changes (inserts, updates, deletes) on a table, enabling change data capture (CDC). It is not a real-time external feed, a data pipe, or a network connection.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream object records data manipulation language (DML) changes made to tables, including inserts, updates, and deletes."

---

## Q36
**Answer: B**

**Explanation:** A stream captures new and changed rows from a source table, enabling incremental processing. Tasks execute the processing logic, but streams are the mechanism for detecting changes.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream object records data manipulation language (DML) changes made to tables, including inserts, updates, and deletes."

---

## Q37
**Answer: B**

**Explanation:** A standard (delta) stream tracks inserts, updates, and deletes. Updates are represented as a DELETE followed by an INSERT. The stream captures all types of DML changes, not just inserts or schema changes.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream records the DML changes made to a table: inserts, updates, and deletes."

---

## Q38
**Answer: A, C**

**Explanation:** METADATA$ACTION indicates whether the change is INSERT or DELETE (A), and METADATA$ISUPDATE indicates if the INSERT/DELETE pair is part of an UPDATE (C). METADATA$TIMESTAMP, METADATA$PARTITION, and METADATA$QUERY_ID are not stream metadata columns.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Each stream contains METADATA$ACTION (INSERT or DELETE) and METADATA$ISUPDATE (TRUE if the action is part of an UPDATE)."

---

## Q39
**Answer: B**

**Explanation:** When a stream is consumed by a DML statement in a committed transaction, the stream's offset advances past the consumed changes. Those changes are no longer returned when querying the stream. The stream is not dropped.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "When a stream is consumed in a DML transaction, the stream offset advances to the current table version."

---

## Q40
**Answer: A**

**Explanation:** SYSTEM$STREAM_HAS_DATA('stream_name') returns TRUE when a stream has unconsumed change data. Using this in the task's WHEN clause ensures the task only runs when there are new changes, avoiding unnecessary compute.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "SYSTEM$STREAM_HAS_DATA returns a Boolean value indicating whether a stream contains change data."

---

## Q41
**Answer: B**

**Explanation:** A task is a scheduled object that executes a SQL statement or stored procedure on a recurring schedule or when triggered by a predecessor task. It is not a warehouse, stream, or monitoring tool.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task is a Snowflake object that is used to schedule the execution of a SQL statement."

---

## Q42
**Answer: B**

**Explanation:** Tasks can be scheduled using CRON expressions (e.g., '0 9 * * *' for daily at 9 AM) or fixed intervals (e.g., every 10 minutes using '10 MINUTE'). External schedulers are not required.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Tasks support scheduling using a CRON expression or a fixed interval."

---

## Q43
**Answer: B**

**Explanation:** The AFTER clause creates a task dependency, making Task B a child of Task A. Task B will only run after Task A completes successfully. This is Snowflake's native task tree/DAG feature.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A child task runs only after all predecessor tasks for the child task have completed their runs successfully."

---

## Q44
**Answer: A, B**

**Explanation:** A task must be resumed (started) using ALTER TASK ... RESUME (A) and must have a compute resource — either a virtual warehouse or serverless compute (B). Streams, ACCOUNTADMIN ownership, and external stages are not required.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "To start a task, you must first resume the task... A task requires a warehouse (or serverless compute) to execute."

---

## Q45
**Answer: B**

**Explanation:** The AFTER clause creates a dependency so the task runs only after the specified predecessor task completes successfully. This enables building task trees (DAGs) for multi-step pipelines.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "The AFTER clause identifies a predecessor task. A child task runs only after the specified predecessor completes."

---

## Q46
**Answer: B**

**Explanation:** Snowflake offers serverless tasks where Snowflake manages the compute resources. This eliminates the need to manage a dedicated warehouse for task execution. Cloud Services layer compute and external clusters are not options.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can be configured to use either a user-managed warehouse or serverless compute resources provided by Snowflake."

---

## Q47
**Answer: B**

**Explanation:** Serverless tasks use Snowflake-managed compute that scales automatically and charges only for the compute used. This is more cost-effective for small, periodic tasks than keeping a dedicated warehouse running.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Serverless tasks use Snowflake-managed compute resources, eliminating the need to keep a warehouse running."

---

## Q48
**Answer: B**

**Explanation:** When intermediate results of a query exceed the local memory and local disk of the warehouse nodes, Snowflake spills data to remote cloud storage. This is significantly slower than processing in memory or local disk because of network latency. Spilling to remote storage is a strong signal that the warehouse is undersized for the workload. The query does not fail — it completes but with degraded performance.

**Source:** [Query Profile — Spilling](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "If the memory needed to perform an operation can't fit in memory, data is spilled to local storage on the warehouse. If the local storage is not sufficient, data is then spilled to remote cloud storage."

---

## Q49
**Answer: B**

**Explanation:** Dynamic tables provide a declarative approach to data pipelines — you define the transformation SQL and Snowflake handles refresh scheduling and dependency management. Streams and tasks are imperative (you manage the orchestration).

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "A dynamic table materializes the results of a specified query. Instead of creating a separate target table and writing code to transform and update the data, you can define the target table as a dynamic table."

---

## Q50
**Answer: A, C**

**Explanation:** Dynamic tables are declarative — you define the transformation, not the refresh process (A). They automatically manage refresh scheduling and dependencies (C). They don't always run faster (B), they do use compute (D), and they support Snowpark as well as SQL.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables simplify data engineering by letting you declaratively define the result of a query and specify the freshness of the result."

---

## Q51
**Answer: B**

**Explanation:** TARGET_LAG specifies the maximum allowed staleness (time) between the dynamic table's data and its source data. Snowflake ensures the dynamic table is refreshed to stay within this target.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "The target lag specifies the maximum amount of time that the dynamic table's content should lag behind updates to the base tables."

---

## Q52
**Answer: B**

**Explanation:** Openflow is a managed data integration service within Snowflake for connecting to external data sources and continuously replicating data into Snowflake. It is not a visualization tool, network protocol, or optimization feature.

**Source:** [Openflow Overview](https://docs.snowflake.com/en/user-guide/data-load-openflow)

**Quote:** "Openflow is a fully managed data integration service that enables replication from external data sources into Snowflake."

---

## Q53
**Answer: C**

**Explanation:** Openflow provides managed data integration for replicating data from external databases (like PostgreSQL) into Snowflake continuously. External tables reference external storage, Snowpipe loads from files, and COPY INTO requires staged files.

**Source:** [Openflow Overview](https://docs.snowflake.com/en/user-guide/data-load-openflow)

**Quote:** "Openflow is a fully managed data integration service that enables replication from external data sources into Snowflake."

---

## Q54
**Answer: B**

**Explanation:** The Snowflake Connector for Spark enables reading and writing data between Snowflake and Apache Spark. JDBC is for Java applications, ODBC for general database connectivity, and Python connector for Python applications.

**Source:** [Snowflake Connector for Spark](https://docs.snowflake.com/en/user-guide/spark-connector)

**Quote:** "The Snowflake Connector for Spark enables using Snowflake as an Apache Spark data source."

---

## Q55
**Answer: A, C**

**Explanation:** The Snowflake Connector for Python (A) provides native Python connectivity, and the Snowpark Python API (C) provides DataFrame-based operations in Python. JDBC is for Java, ODBC is a general-purpose driver, and the Spark connector is for Spark integration.

**Source:** [Snowflake Connector for Python](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector)

**Quote:** "The Snowflake Connector for Python provides an interface for developing Python applications that can connect to Snowflake."

---

## Q56
**Answer: B**

**Explanation:** An API integration creates a trusted connection to external API services for use with external functions. It handles authentication and endpoint validation. It is not for internal stages, BI tools, or Snowflake's own REST API.

**Source:** [CREATE API INTEGRATION](https://docs.snowflake.com/en/sql-reference/sql/create-api-integration)

**Quote:** "Creates an API integration object that provides the interface to an external API service."

---

## Q57
**Answer: B**

**Explanation:** Calling an external API from SQL requires an API integration (for the trusted connection) and an external function (the SQL-callable wrapper). Stored procedures alone can't call external APIs directly, and Snowpipe is for data loading.

**Source:** [External Functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that is executed outside Snowflake. To create an external function, you first create an API integration."

---

## Q58
**Answer: B**

**Explanation:** Git integration allows Snowflake to connect to Git repositories to sync and access versioned code like SQL scripts and stored procedures. It is not a built-in VCS, change tracker for Snowflake objects, or backup service.

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-setting-up)

**Quote:** "Snowflake can connect to a Git repository, allowing you to sync files from Git and execute them in Snowflake."

---

## Q59
**Answer: A, C**

**Explanation:** Storage integrations improve security by avoiding credential exposure in SQL statements (A) and centralize credential management for easier key rotation (C). They don't affect loading speed (B), storage costs (D), or data compression (E).

**Source:** [CREATE STORAGE INTEGRATION](https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration)

**Quote:** "A storage integration avoids the need for providing credentials in the stage definition."

---

## Q60
**Answer: B**

**Explanation:** GET downloads files from a Snowflake internal stage to a local file system. It is the reverse of PUT. It does not load data into tables, retrieve metadata, or get session parameters.

**Source:** [GET](https://docs.snowflake.com/en/sql-reference/sql/get)

**Quote:** "Downloads data files from one of the following Snowflake stages to a local directory/folder on a client machine."

---

## Q61
**Answer: B**

**Explanation:** COPY INTO @external_stage with FILE_FORMAT = PARQUET unloads data from a table into Parquet files in the specified stage (which can be an S3 location). PUT is for uploading local files, GET downloads from stages.

**Source:** [COPY INTO <location>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location)

**Quote:** "Unloads data from a table (or query) into one or more files in one of the following locations."

---

## Q62
**Answer: B**

**Explanation:** The PATTERN option uses a regular expression to filter which files in the stage are loaded, based on their file names. This allows loading specific files matching a pattern.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "PATTERN = 'regex_pattern': A regular expression pattern string, enclosed in single quotes, specifying the file names to match."

---

## Q63
**Answer: A, C**

**Explanation:** FORCE = TRUE reloads files regardless of load history (A), and Snowflake's load history tracking (C) automatically skips previously loaded files by default. DUPLICATE_KEY, OVERWRITE, and MERGE_DUPLICATES are not COPY INTO options.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "FORCE = TRUE: Load all files, regardless of whether they've been loaded previously... By default, COPY INTO prevents reloading files that have already been loaded."

---

## Q64
**Answer: B**

**Explanation:** By default, Snowflake tracks load metadata for COPY INTO operations and skips files that have already been successfully loaded, preventing duplicate data. The metadata is retained for 64 days.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "By default, COPY INTO prevents reloading files that have already been loaded."

---

## Q65
**Answer: B**

**Explanation:** FORCE = TRUE overrides the load metadata tracking and reloads the files regardless of whether they were previously loaded. This is the correct way to reload without dropping the table.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "FORCE = TRUE: Load all files, regardless of whether they've been loaded previously."

---

## Q66
**Answer: B**

**Explanation:** Snowflake recommends files between 10-100 MB compressed for optimal loading performance. This size allows efficient parallel loading across warehouse nodes. Files that are too small or too large reduce efficiency.

**Source:** [Best Practices for Data Loading](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "Snowflake recommends using file sizes in the range of 10 MB to 100 MB compressed as a general guideline."

---

## Q67
**Answer: B**

**Explanation:** Multiple smaller files enable parallel loading, where different warehouse nodes process different files simultaneously. This maximizes the use of compute resources and reduces overall load time.

**Source:** [Best Practices for Data Loading](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "Splitting large files into smaller files enables the load operation to distribute the files across the nodes in the warehouse."

---

## Q68
**Answer: B**

**Explanation:** Splitting the large file into smaller files (100-250 MB each) allows Snowflake to load them in parallel across warehouse nodes. A single large file limits parallelism because only one node can process it.

**Source:** [Best Practices for Data Loading](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "Splitting large files into smaller files enables the load operation to distribute the files across the nodes in the warehouse."

---

## Q69
**Answer: A, C**

**Explanation:** GZIP (A) and SNAPPY (C) are supported compression formats in Snowflake. RAR (B), TAR (D), and 7-ZIP (E) are not supported for data loading.

**Source:** [CREATE FILE FORMAT](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "Supported compression types include: AUTO, GZIP, BZ2, BROTLI, ZSTD, DEFLATE, RAW_DEFLATE, SNAPPY, LZO."

---

## Q70
**Answer: B**

**Explanation:** Each Snowflake user has a personal user stage referenced as @~ for staging files. It is automatically allocated and does not need to be created. It is personal to the user, not shared.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Each user has a Snowflake stage allocated to them by default for staging data files. This stage is referred to using @~."

---

## Q71
**Answer: B**

**Explanation:** Each table has an automatically associated table stage, referenced as @%table_name, for staging files specific to that table. It does not need to be created separately.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Each table has a Snowflake stage allocated to it by default for staging data files. This stage is referred to using @%table_name."

---

## Q72
**Answer: C**

**Explanation:** The table stage (@%table_name) is automatically available for each table and convenient for staging files for a specific table without creating a named stage. User stages are personal, and named stages require creation.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Each table has a Snowflake stage allocated to it by default for staging data files."

---

## Q73
**Answer: C**

**Explanation:** Snowflake applies AES-256 encryption. The PUT command encrypts files client-side during upload using AES-256, and files are also encrypted at rest in internal stages.

**Source:** [PUT](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Snowflake encrypts the data files when they are uploaded to an internal stage."

---

## Q74
**Answer: A, C**

**Explanation:** You can query staged files using SELECT with $ column notation (A) and external tables that reference staged files (C). COPY INTO with preview mode (B) uses VALIDATION_MODE but is not a direct query. DESCRIBE STAGE (D) shows properties, not data.

**Source:** [Querying Data in Staged Files](https://docs.snowflake.com/en/user-guide/querying-stage)

**Quote:** "You can query data files in a stage by using a SELECT statement with the stage reference."

---

## Q75
**Answer: B**

**Explanation:** PURGE = TRUE automatically deletes staged files from the stage after they have been successfully loaded into the table. It does not purge table data, remove duplicates, or clear cache.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "PURGE = TRUE: Removes the data files from the stage automatically after the data is loaded successfully."

---

## Q76
**Answer: B**

**Explanation:** PURGE = TRUE automatically removes staged files after successful loading, freeing up stage storage. FORCE reloads files, ON_ERROR controls error handling, and TRUNCATECOLUMNS handles long strings.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "PURGE = TRUE: Removes the data files from the stage automatically after the data is loaded successfully."

---

## Q77
**Answer: B**

**Explanation:** TRUNCATECOLUMNS = TRUE truncates string values that exceed the target column's maximum length instead of producing an error. It does not truncate the table, remove whitespace, or drop columns.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "TRUNCATECOLUMNS = TRUE: Truncates text strings that exceed the target column length."

---

## Q78
**Answer: B**

**Explanation:** SIZE_LIMIT sets the maximum total size (in bytes) of data to load in a single COPY statement. Once the cumulative size of loaded files reaches this limit, the COPY operation stops.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "SIZE_LIMIT: Number (> 0) that specifies the maximum size (in bytes) of data to be loaded for a given COPY statement."

---

## Q79
**Answer: B**

**Explanation:** TRUNCATECOLUMNS = TRUE truncates values exceeding the VARCHAR length instead of failing the load. ON_ERROR = 'CONTINUE' would skip the entire row, SKIP_HEADER skips header rows, and FORCE controls reloading.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "TRUNCATECOLUMNS = TRUE: Truncates text strings that exceed the target column length."

---

## Q80
**Answer: A, C**

**Explanation:** The Snowflake Connector for Kafka (A) enables continuous ingestion from Kafka topics, and the Snowflake Connector for Python (C) provides native Python connectivity. There are no official connectors for MongoDB, Redis, or FTP.

**Source:** [Snowflake Connectors and Drivers](https://docs.snowflake.com/en/developer-guide/drivers)

**Quote:** "Snowflake provides connectors for Kafka, Spark, Python, and other platforms."

---

## Q81
**Answer: B**

**Explanation:** The Kafka connector continuously ingests data from Kafka topics into Snowflake tables. It uses Snowpipe or Snowpipe Streaming under the hood. It does not query Kafka, export from Snowflake, or manage Kafka clusters.

**Source:** [Snowflake Connector for Kafka](https://docs.snowflake.com/en/user-guide/kafka-connector)

**Quote:** "The Kafka connector reads data from one or more Apache Kafka topics and loads the data into a Snowflake table."

---

## Q82
**Answer: B**

**Explanation:** The Snowflake JDBC driver is used for connecting Java applications to Snowflake. ODBC is for general-purpose connectivity, Python connector is for Python, and Node.js driver is for JavaScript applications.

**Source:** [JDBC Driver](https://docs.snowflake.com/en/developer-guide/jdbc/jdbc)

**Quote:** "The Snowflake JDBC driver enables Java applications to connect to Snowflake."

---

## Q83
**Answer: B**

**Explanation:** .NET applications typically use the Snowflake ODBC driver or the Snowflake .NET driver. ODBC is the most common choice for .NET. JDBC is for Java, Python connector is for Python, and Go driver is for Go.

**Source:** [ODBC Driver](https://docs.snowflake.com/en/developer-guide/odbc/odbc)

**Quote:** "The Snowflake ODBC driver allows ODBC-based client applications to connect to Snowflake."

---

## Q84
**Answer: B**

**Explanation:** Git integration connects Snowflake to Git repositories, enabling versioned code to be synced and executed within Snowflake. It does not version control table data, backup databases, or track warehouse configurations.

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-setting-up)

**Quote:** "Snowflake can connect to a Git repository, allowing you to sync files from Git and execute them in Snowflake."

---

## Q85
**Answer: A, C**

**Explanation:** Snowflake tracks loaded files via load metadata (A), preventing re-loading by default. This metadata is retained for 64 days for COPY INTO commands (C). It is not stored locally (B), is not retained for 365 days (E), and Snowflake does track loaded files (D).

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "Snowflake maintains metadata about loaded files for 64 days, which prevents re-loading of the same files."

---

## Q86
**Answer: B**

**Explanation:** MATCH_BY_COLUMN_NAME loads data by matching column names between the file and the table, regardless of column order. This is especially useful for Parquet and JSON files where column order may differ.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "MATCH_BY_COLUMN_NAME: Loads semi-structured data into a table by matching the column names in the data with the column names in the table."

---

## Q87
**Answer: B**

**Explanation:** MATCH_BY_COLUMN_NAME = 'CASE_INSENSITIVE' matches Parquet column names to table column names regardless of case and order. This handles mismatched column ordering gracefully.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "MATCH_BY_COLUMN_NAME: Loads data by matching column names. Use 'CASE_INSENSITIVE' for case-insensitive matching."

---

## Q88
**Answer: B**

**Explanation:** METADATA$FILENAME is a pseudo-column available during COPY INTO that contains the name of the staged file from which each row was loaded. It is useful for tracking data lineage during loading.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "METADATA$FILENAME: Name of the staged data file the row was loaded from."

---

## Q89
**Answer: B**

**Explanation:** STRIP_OUTER_ARRAY = TRUE removes the outer array brackets from a JSON file so each element in the array is loaded as a separate row. Without this option, the entire array would be loaded as a single VARIANT value.

**Source:** [COPY INTO <table>](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "STRIP_OUTER_ARRAY = TRUE: Strips the outer array when loading JSON data, so each element in the array becomes a separate row."

---

## Q90
**Answer: A**

**Explanation:** The recommended pipeline uses Snowpipe with auto-ingest for automatic loading when files arrive, a stream on the raw table to capture new data, and a task to run the transformation on a schedule. This is a proven, efficient pattern.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A common pattern is to combine Snowpipe (for loading), streams (for change tracking), and tasks (for scheduled processing) to build end-to-end data pipelines."
