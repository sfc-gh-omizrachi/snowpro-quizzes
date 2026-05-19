# Domain 3: Answers

---

## Q1
**Answer: A**

**Explanation:** Schema evolution in Snowflake allows the target table to automatically adapt to new columns appearing in source files. To achieve this, two things are required: (1) the table must have `ENABLE_SCHEMA_EVOLUTION = TRUE` set as a table property, and (2) the COPY INTO command must use `MATCH_BY_COLUMN_NAME` so that columns are matched by name rather than position. When a new column appears in the source file, Snowflake automatically adds it to the target table. Option B (external tables) does not modify the target table schema. Option C (VARIANT column) works but requires manual parsing and does not provide automatic DDL evolution. Option D (STRIP_OUTER_ARRAY) is irrelevant to schema changes — it only affects how JSON arrays are parsed.

**Source:** [Schema Evolution](https://docs.snowflake.com/en/user-guide/data-load-schema-changes)

**Quote:** "When schema evolution is enabled for a table used as the COPY INTO target, columns in the loaded data files that are not present in the target table automatically add new columns to the table."

---

## Q2
**Answer: B**

**Explanation:** Snowpipe Streaming via the Snowflake Ingest SDK is designed for low-latency, high-throughput ingestion scenarios. It writes rows directly into Snowflake table storage without requiring files to be staged in cloud storage first, eliminating file management overhead and staging costs. At 500,000 events/second with a 10-second freshness requirement, Snowpipe Streaming provides sub-second latency. Standard Snowpipe (A) has latency in the range of 1-2 minutes due to micro-batch file creation and notification processing. A scheduled COPY INTO every 10 seconds (C) would require constant warehouse uptime and still involve staging files. The Kafka connector with Snowpipe mode (D) adds latency through file staging. Direct INSERT statements (E) would be extremely inefficient at this scale due to transaction overhead.

**Source:** [Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Snowpipe Streaming enables you to load data using the Snowflake Ingest SDK and Java API without requiring staging files, resulting in lower latency and cost for loading data."

---

## Q3
**Answer: C**

**Explanation:** The `LOAD_HISTORY` view in the `SNOWFLAKE.ACCOUNT_USAGE` schema retains metadata for 365 days, making it the correct choice for querying file load history beyond the 14-day window. The `COPY_HISTORY` function in `INFORMATION_SCHEMA` only retains 14 days of history (eliminating B). The `LOAD_HISTORY` view in `INFORMATION_SCHEMA` also retains only 14 days (eliminating A). Time Travel cannot be applied to stage objects (eliminating D). The Account Usage schema views have a latency of up to 2 hours but provide the extended retention needed for this scenario.

**Source:** [LOAD_HISTORY View (Account Usage)](https://docs.snowflake.com/en/sql-reference/account-usage/load_history)

**Quote:** "The LOAD_HISTORY view in the ACCOUNT_USAGE schema can be used to query the loading history of data into tables. The view retains load activity history for 365 days (1 year)."

---

## Q4
**Answer: B, C**

**Explanation:** Snowpipe Streaming writes rows directly into Snowflake table storage without requiring files to be staged in cloud storage (B is correct). It also provides exactly-once delivery semantics through offset token management, where the client application supplies tokens that Snowflake tracks to prevent duplicate ingestion and support resume-on-failure (C is correct). Option A is incorrect because Snowpipe Streaming specifically eliminates the need for staging files — that's a key differentiator from standard Snowpipe. Option D describes standard Snowpipe billing, not Streaming. Option E is incorrect because Snowpipe Streaming has lower latency than standard Snowpipe, not higher.

**Source:** [Snowpipe Streaming Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "The Snowpipe Streaming API writes rows of data directly to Snowflake tables, without requiring staging files. This architecture results in lower load latencies, with corresponding lower costs for loading similar volumes of data."

---

## Q5
**Answer: D**

**Explanation:** The correct configuration requires PARTITION BY with the partition expressions, Parquet file format, and SINGLE = TRUE to produce one file per partition. Option A uses string literals in PARTITION BY rather than column references. Option B concatenates values into a single string path which doesn't create proper multi-level partitioning. Option C uses SINGLE = FALSE which would create multiple files per partition, and the SELECT clause redundantly selects columns already in `*`. Option D correctly uses column references in PARTITION BY, specifies PARQUET format, and uses SINGLE = TRUE to ensure exactly one file per partition directory. OVERWRITE = TRUE ensures clean output.

**Source:** [COPY INTO location](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location)

**Quote:** "PARTITION BY: Specifies an expression used to partition the unloaded data into separate files. The partition column values are used to create a directory structure."

---

## Q6
**Answer: B**

**Explanation:** Managed Iceberg tables in Snowflake are the correct choice when Snowflake needs to serve as the primary write engine. With managed Iceberg tables, Snowflake manages the table lifecycle including data files and metadata. Snowflake can expose the Iceberg metadata through a catalog integration (such as the Snowflake Iceberg REST catalog or Open Catalog), allowing external engines like Spark to read the data via standard Iceberg clients. Option A is incorrect because Snowflake can write to managed Iceberg tables. Option C doesn't provide Iceberg-native access for Spark. Option D is incorrect because external tables are read-only in Snowflake and point to externally managed data, which is the opposite of the requirement.

**Source:** [Managed Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg-managed)

**Quote:** "Use a Snowflake-managed Iceberg table when Snowflake is the primary engine for writing to the table. External engines can read the table through a catalog integration."

---

## Q7
**Answer: B**

**Explanation:** Snowpipe Streaming with the Ingest SDK is the most appropriate architecture for this scenario. It provides sub-minute latency for continuous data ingestion, eliminates the need for file staging (reducing complexity), and supports offset token management for exactly-once semantics and resume-on-failure capability. The offset tokens allow the application to track which records have been successfully ingested and resume from the last committed offset if a failure occurs. Option A (Snowpipe auto-ingest) adds latency from file creation and SQS notification processing, typically 1-2 minutes. Option C (external table) doesn't provide the required latency or tracking. Option D (scheduled COPY INTO) requires staging and warehouse management overhead.

**Source:** [Snowpipe Streaming Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "The Snowflake Ingest SDK provides an insertRows API that enables writing rows of data to Snowflake tables. Client code can use offset tokens to track which rows have been committed to provide exactly-once semantics."

---

## Q8
**Answer: B, E**

**Explanation:** Option B is correct: using `ON_ERROR = CONTINUE` allows the load to proceed past errors, and then calling the `VALIDATE` table function referencing the last COPY INTO execution ID retrieves the rejected rows for analysis. Option E describes the error logging capability where rejected records are automatically captured. Option A is incorrect because `VALIDATION_MODE` and actual data loading are mutually exclusive — `VALIDATION_MODE` prevents data from being loaded. Option C is incorrect because `SKIP_FILE_3` skips entire files rather than individual records, and `ERROR_LIMIT` is not a valid COPY INTO parameter. Option D is incorrect because `ABORT_STATEMENT` stops loading on the first error rather than continuing.

**Source:** [VALIDATE Function](https://docs.snowflake.com/en/sql-reference/functions/validate)

**Quote:** "The VALIDATE function validates the files loaded in a previous COPY INTO execution and returns all the errors encountered during the load."

---

## Q9
**Answer: B**

**Explanation:** With only 5% of records changing daily, an incremental load pattern using a staging table and MERGE statement is the most effective approach. The process involves: (1) loading the changed/new records into a staging table, (2) comparing checksums or timestamps to identify inserts, updates, and deletes, and (3) using MERGE to apply only the changes. This reduces the data processed from 2 TB to approximately 100 GB. Option A (Snowpipe) doesn't handle deletes or ensure exact match with source. Option C (INSERT OVERWRITE) still processes the full 2 TB. Option D (external table + MV) doesn't provide the same query performance as native tables. Option E (streams) requires the source to already be a Snowflake table, which it isn't — the source is a GCS data lake.

**Source:** [MERGE Statement](https://docs.snowflake.com/en/sql-reference/sql/merge)

**Quote:** "The MERGE statement can insert, update, and delete values in a table based on values in a second table or a subquery. This can be useful when loading data incrementally."

---

## Q10
**Answer: A**

**Explanation:** `MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE` (or `CASE_SENSITIVE`) ensures that columns in the Parquet file are mapped to target table columns by name rather than by physical position. When using `INFER_SCHEMA` to create the target table and then loading with COPY INTO, column ordering differences between the Parquet file and the table can cause data to land in wrong columns if positional mapping is used. By specifying `MATCH_BY_COLUMN_NAME`, Snowflake matches each Parquet column to the corresponding table column by name. Option B (`FORCE`) only controls whether already-loaded files are reloaded. Option C (`COLUMN_MAPPING = AUTO`) is not a valid Snowflake parameter. Option D (`STRIP_NULL_VALUES`) removes null values from semi-structured data but does not affect column mapping.

**Source:** [COPY INTO table — matchByColumnName](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#match-by-column-name)

**Quote:** "MATCH_BY_COLUMN_NAME: Specifies that the load operation maps columns in the input file to the corresponding columns in the target table by column name, rather than by ordinal position."

---

## Q11
**Answer: B**

**Explanation:** The Snowflake Kafka Connector supports two ingestion modes: Snowpipe mode and Snowpipe Streaming mode. In Snowpipe mode, the connector writes data to temporary stage files and uses Snowpipe to load them, resulting in 1-3 minute latency due to micro-batch file creation. Switching to Snowpipe Streaming mode eliminates the file staging step entirely — the connector uses the Snowflake Ingest SDK to write rows directly into Snowflake tables, achieving sub-second latency. Option A (reducing flush time) still creates files and won't achieve sub-second freshness. Option C (JDBC inserts) would be inefficient and doesn't scale. Option D (more tasks) parallelizes file creation but doesn't eliminate the latency floor. Option E (external tables) doesn't provide real-time freshness.

**Source:** [Using Snowflake Kafka Connector with Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/kafka-connector-overview#snowpipe-streaming)

**Quote:** "Snowpipe Streaming mode enables the Kafka connector to stream records directly into Snowflake tables without the need for staging files, lowering data loading latency."

---

## Q12
**Answer: B**

**Explanation:** Oracle-specific data types like CLOB, BLOB, and XMLTYPE have no direct Snowflake equivalents and cannot be natively transferred. The architecturally sound approach is to extract data using Oracle utilities (SQL*Plus, SQLcl, or custom scripts), converting CLOBs to VARCHAR strings (or splitting large CLOBs), BLOBs to HEX-encoded strings (which can be stored as VARCHAR or BINARY in Snowflake), and XMLTYPE to string representations. The extracted CSV files are then loaded via COPY INTO with appropriate transformations. Option A is incorrect because DBMS_DATAPUMP cannot export directly to a Snowflake stage. Option C is incorrect because Snowflake does not have a native Oracle connector. Option D would work for some cases but loading raw Oracle export files into VARIANT doesn't handle binary types like BLOB properly and Oracle dump files are not a supported format.

**Source:** [Loading Data into Snowflake](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Before loading data, you may need to transform the data to address differences between the source data types and the corresponding Snowflake data types."

---

## Q13
**Answer: A, C**

**Explanation:** Managed Iceberg tables store data files (Parquet) and Iceberg metadata in a Snowflake-managed external volume, with Snowflake controlling the entire lifecycle (A is correct). Managed Iceberg tables also support full Snowflake DML operations including INSERT, UPDATE, DELETE, and MERGE (C is correct). Option B is incorrect because unmanaged tables do not support simultaneous writes from Snowflake and external engines without coordination — in fact, Snowflake treats unmanaged Iceberg tables as read-only since the catalog is managed externally. Option D is incorrect because unmanaged Iceberg tables are read-only in Snowflake. Option E is incorrect because managed Iceberg tables use Snowflake's own catalog management, not an external catalog integration.

**Source:** [Iceberg Tables in Snowflake](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Snowflake-managed Iceberg tables let you use Snowflake as the Iceberg catalog and support full read and write access from Snowflake. Snowflake manages the table lifecycle, including the data files and metadata."

---

## Q14
**Answer: A**

**Explanation:** The requirements include: automatic file detection, deduplication, notification-based triggering, and handling varying schemas across prefixes. Creating one Snowpipe per S3 prefix, each with its own file format definition and target table, triggered by S3 event notifications via SQS, satisfies all requirements. Each pipe handles its specific schema, SQS notifications provide automatic detection, and Snowpipe's built-in 14-day load history provides deduplication. Option B is invalid because there is no `FILE_FORMAT = AUTO` option and a single pipe cannot handle varying schemas. Option C adds unnecessary complexity and doesn't use native notification triggering. Option D requires managing Lambda infrastructure and manually implementing deduplication logic.

**Source:** [Automating Snowpipe for Amazon S3](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3)

**Quote:** "Configure one or more Snowpipe objects per target table. Each pipe definition identifies the S3 location, file format, and COPY INTO statement used to load data from a set of staged files."

---

## Q15
**Answer: B**

**Explanation:** The `PARTITION BY` clause in `COPY INTO <location>` creates a directory structure in the target storage location using the partition column values as path segments. For example, `PARTITION BY (region, year)` creates paths like `region=US/year=2024/data_0_0_0.parquet`. It does not sort data within files (A is incorrect). It works with all supported file formats including Parquet, CSV, and JSON (C is incorrect). It does not require directory tables to be enabled (D is incorrect).

**Source:** [COPY INTO location — PARTITION BY](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#partitionby)

**Quote:** "PARTITION BY: An expression that is used to partition the unloaded table rows into separate files. The partition column values are used to generate a path to the set of files for each partition."

---

## Q16
**Answer: B**

**Explanation:** Snowpipe performs deduplication based on the fully qualified file name (path + name). It maintains load metadata for 14 days. If a file is deleted and re-uploaded with the same name within the 14-day window, Snowpipe will skip it. However, if the metadata has been purged (after 14 days), Snowpipe treats the re-uploaded file as new and loads it again, causing duplicates. Option A is incorrect because Snowpipe does perform deduplication. Option C is incorrect because while SQS can deliver duplicate notifications, Snowpipe handles this through its load history. Option D is incorrect because deduplication works across batches within the 14-day retention window.

**Source:** [Snowpipe — Load History](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-manage#load-history)

**Quote:** "Snowpipe maintains load metadata for each pipe for 14 days. If a file with the same name is staged again after the 14-day period, Snowpipe treats it as a new file and loads it."

---

## Q17
**Answer: D**

**Explanation:** When dealing with 200 sources with varying CSV formats (different delimiters, headers/no headers), the most architecturally sound approach is to standardize files to a common format using an external ETL tool before loading into Snowflake. This provides a clean separation of concerns, handles all format variations in a dedicated preprocessing layer, and simplifies the Snowflake loading pipeline to a single file format and single pipe/COPY INTO configuration. Option A would work but is operationally complex with 200 file formats and pipes to maintain. Option B loads everything as VARIANT which loses the benefits of structured data and adds query complexity. Option C adds staging table overhead and complexity.

**Source:** [Preparing to Load Data](https://docs.snowflake.com/en/user-guide/data-load-prepare)

**Quote:** "Before you load data into Snowflake, you may need to transform the data to meet the requirements of the target table. This can include converting file formats, standardizing delimiters, and ensuring consistent column structures."

---

## Q18
**Answer: A, B**

**Explanation:** Two conditions must be met for schema evolution: (1) The `ENABLE_SCHEMA_EVOLUTION` property must be set to TRUE on the target table (A is correct), and (2) the loading role must have either `EVOLVE SCHEMA` privilege or `OWNERSHIP` privilege on the target table (B is correct). Option C is incorrect because schema evolution works with CSV, JSON, Parquet, Avro, and ORC formats, not just CSV. Option D is incorrect because `MATCH_BY_COLUMN_NAME` must be enabled (not disabled) for schema evolution to work — columns need to be matched by name so that new columns can be identified and added. Option E is irrelevant to schema evolution.

**Source:** [Schema Evolution](https://docs.snowflake.com/en/user-guide/data-load-schema-changes)

**Quote:** "To use schema evolution, the table must have the ENABLE_SCHEMA_EVOLUTION property set to TRUE, and the role used to load data must have the EVOLVE SCHEMA or OWNERSHIP privilege on the table."

---

## Q19
**Answer: B**

**Explanation:** For moderate data volumes with rate-limited APIs, the most cost-effective and architecturally sound solution is to deploy a lightweight external function (e.g., AWS Lambda) that handles API pagination with rate limiting, writes the collected JSON to S3, and triggers Snowpipe for automatic ingestion. This separates concerns: the Lambda handles API-specific logic (pagination, rate limiting), S3 provides durable staging, and Snowpipe handles Snowflake ingestion with built-in deduplication. Option A is incorrect because Snowflake doesn't have a native REST API connector for arbitrary APIs. Option C (Snowpipe Streaming) would work but requires maintaining a long-running application to handle API pagination, which is more expensive than serverless Lambda for moderate volumes. Option D is incorrect because external tables don't integrate with SaaS APIs.

**Source:** [External Functions](https://docs.snowflake.com/en/sql-reference/external-functions)

**Quote:** "External functions allow Snowflake to call externally implemented functions, enabling integration with external services and APIs."

---

## Q20
**Answer: B**

**Explanation:** When `VALIDATION_MODE = 'RETURN_ALL_ERRORS'` is specified, the COPY INTO command does not load any data. Instead, it performs a dry-run validation of the staged files and returns all errors that would occur during the load. This is useful for pre-load validation to identify and fix data quality issues before committing to a full load. Option A is incorrect because data is not loaded — it's validation only. Option C is incorrect because all errors (not just the first per file) are returned, and no data is loaded. Option D is incorrect because VALIDATION_MODE is a parameter of COPY INTO, not PUT.

**Source:** [COPY INTO table — VALIDATION_MODE](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#validation-mode)

**Quote:** "RETURN_ALL_ERRORS: Returns all errors across all files specified in the COPY statement. No data is loaded when this option is specified."

---

## Q21
**Answer: B**

**Explanation:** Since the requirement is to query Iceberg data managed by an external AWS Glue catalog without moving data and without writing from Snowflake, the correct approach is to create unmanaged Iceberg tables. This requires: (1) an external volume defining the S3 storage location, (2) a catalog integration configured for AWS Glue, and (3) unmanaged Iceberg tables referencing the external catalog. Option A is incorrect because managed Iceberg tables use Snowflake as the catalog, not Glue. Option C is incorrect because standard external tables don't natively understand Iceberg metadata format. Option D is irrelevant since the data is not in another Snowflake account.

**Source:** [Configure a catalog integration for AWS Glue](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration-glue)

**Quote:** "To create an Iceberg table that uses an external catalog such as AWS Glue, you need to create a catalog integration and an external volume, then create the table referencing the catalog integration."

---

## Q22
**Answer: B**

**Explanation:** Schema evolution with CSV files requires `MATCH_BY_COLUMN_NAME` to be enabled, which in turn requires the CSV file format to have `PARSE_HEADER = TRUE` so that column names from the file headers can be matched to table columns. If the COPY INTO is using positional mapping (the default for CSV), Snowflake expects the number of columns in the file to match the table exactly, and schema evolution cannot add new columns because there are no column names to reference. Option A is incorrect because schema evolution does work with CSV files when properly configured. Option C is incorrect because clustering keys don't prevent schema evolution. Option D is incorrect because schema evolution works with both Snowpipe and manual COPY INTO.

**Source:** [Schema Evolution](https://docs.snowflake.com/en/user-guide/data-load-schema-changes)

**Quote:** "For CSV files, schema evolution requires that the PARSE_HEADER file format option is set to TRUE and the MATCH_BY_COLUMN_NAME copy option is set to CASE_INSENSITIVE or CASE_SENSITIVE."

---

## Q23
**Answer: A, C**

**Explanation:** External tables provide SQL query access to data stored in external cloud storage (S3, Azure Blob, GCS) without loading it into Snowflake (A is correct). They also serve as a metadata layer that supports partition pruning when partitions are defined, enabling Snowflake to skip irrelevant files during query execution (C is correct). Option B is incorrect because external tables are read-only — DML operations are not supported. Option D is incorrect because Snowflake does not modify, compress, or encrypt files in external storage. Option E is incorrect because external tables are not a streaming ingestion mechanism and cannot replace Snowpipe for Kafka ingestion.

**Source:** [External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)

**Quote:** "External tables enable you to query data stored in files in an external stage as if it were inside a table in Snowflake. External tables are read-only and support partition pruning for improved query performance."

---

## Q24
**Answer: B**

**Explanation:** Option B correctly addresses all requirements. Parquet default compression in Snowflake is Snappy, so no explicit compression parameter is needed. `MAX_FILE_SIZE = 268435456` limits files to 256 MB. `PARTITION BY (ship_date)` creates the required directory structure. The SELECT includes `ship_date` as a column to ensure it's available for partitioning. Option A incorrectly uses `HEADER = TRUE` which is not a Parquet parameter. Option C uses invalid syntax `256MB` for MAX_FILE_SIZE (must be bytes) and `SNAPPY_COMPRESSION` is not a valid parameter. Option D doesn't include the partition column in the select list for the query form of COPY INTO.

**Source:** [COPY INTO location](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location)

**Quote:** "MAX_FILE_SIZE: Specifies the upper size limit (in bytes) of each file to be generated in parallel per thread. PARTITION BY specifies an expression to partition the unloaded table rows."

---

## Q25
**Answer: B**

**Explanation:** This architecture uses Debezium for CDC from PostgreSQL into Kafka, providing reliable change event capture at high throughput. The Snowflake Kafka Connector in Snowpipe Streaming mode ingests changes with sub-second latency directly into a raw/staging table. A dynamic table then materializes the latest state by applying the changes, providing automatic incremental processing. This meets the 30-second freshness requirement. Option A would work but Snowpipe's file-based latency (1-2 minutes) plus a 30-second MERGE cycle may not consistently meet the requirement. Option C is completely impractical at 50K events/second. Option D does not exist — Snowflake has no native PostgreSQL replication connector.

**Source:** [Using Snowflake Kafka Connector with Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/kafka-connector-overview)

**Quote:** "Snowpipe Streaming mode enables the Kafka connector to stream records directly into Snowflake tables without the need for staging files, lowering data loading latency."

---

## Q26
**Answer: B**

**Explanation:** The `PURGE = TRUE` parameter in COPY INTO instructs Snowflake to automatically delete (purge) the source data files from the stage after they have been successfully loaded into the target table. This helps manage storage costs and prevents accumulation of already-processed files. Option A is incorrect — PURGE does not affect the target table's existing data. Option C is incorrect — PURGE does not affect load history metadata. Option D is incorrect — PURGE has nothing to do with warehouse cache.

**Source:** [COPY INTO table — PURGE](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#purge)

**Quote:** "PURGE = TRUE | FALSE — Boolean that specifies whether to remove the data files from the stage automatically after the data is loaded successfully."

---

## Q27
**Answer: A**

**Explanation:** When data is stored in a single VARIANT column, the most practical approach is to use `GET_PATH`, dot notation, or `LATERAL FLATTEN` in a view to extract specific fields. When new fields appear, the view definition must be manually updated. While this isn't fully automatic, it's the most architecturally sound option among the choices. Option B doesn't apply because schema detection works on staged files for structured columns, not for parsing a VARIANT column that's already loaded. Option C with OBJECT_KEYS and pivoting would be extremely complex and perform poorly. Option D is incorrect because schema evolution doesn't apply to VARIANT columns — it adds new structured columns when source files have new columns, but the table already has a VARIANT column by design.

**Source:** [Querying Semi-Structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "You can query semi-structured data in a VARIANT column using dot notation, bracket notation, or the GET_PATH function to traverse the nested structure."

---

## Q28
**Answer: A, B**

**Explanation:** Snowpipe uses Snowflake-managed serverless compute resources, so users don't need to provision or manage a warehouse. COPY INTO tasks execute on a user-specified virtual warehouse (A is correct). Snowpipe retains load metadata for 64 days for deduplication purposes, while COPY INTO retains load metadata for 14 days in the INFORMATION_SCHEMA (B is correct). Option C is incorrect because COPY INTO using a full warehouse typically provides lower latency for batch operations compared to Snowpipe's queue-based processing. Option D is incorrect because both Snowpipe and COPY INTO support all stage types (internal and external). Option E is partially correct in practice but Snowpipe provides at-least-once semantics with deduplication within the retention window.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Snowpipe uses Snowflake-supplied compute resources and retains file loading metadata for 64 days to prevent reloading of the same files."

---

## Q29
**Answer: B**

**Explanation:** Avro union types represent a field that can hold values of multiple types (e.g., null, string, or int). Since a single Snowflake column can only have one data type, and the union could contain values of different types, Snowflake cannot deterministically map the union to a single scalar type. Instead, it uses VARIANT to preserve all possible values regardless of their actual type. This is correct behavior that maintains data integrity. Option A is incorrect because Snowflake fully supports Avro format. Option C is irrelevant — STRIP_OUTER_ARRAY is for JSON arrays, not Avro unions. Option D is incorrect because this behavior occurs regardless of MATCH_BY_COLUMN_NAME settings.

**Source:** [Avro Data Type Mapping](https://docs.snowflake.com/en/sql-reference/data-types-semistructured#label-avro-data-type-mapping)

**Quote:** "Avro union types are mapped to VARIANT in Snowflake because the data type of the value can vary across rows."

---

## Q30
**Answer: A**

**Explanation:** The `SINGLE = TRUE` parameter in `COPY INTO <location>` instructs Snowflake to produce exactly one output file rather than splitting the output across multiple files. This is the straightforward way to guarantee a single file per unload operation. At 500 MB per day, this is within the practical limits for a single file. Option B is invalid because `MAX_FILE_SIZE = 0` is not a supported value. Option C (OVERWRITE = TRUE) controls whether existing files are overwritten but doesn't control the number of output files. Option D with `SINGLE = FALSE` explicitly creates multiple files, and while `MAX_FILE_SIZE = 5368709120` is large enough to contain 500 MB, it doesn't guarantee a single file.

**Source:** [COPY INTO location — SINGLE](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#single)

**Quote:** "SINGLE = TRUE | FALSE — Boolean that specifies whether to generate a single file or multiple files. If TRUE, the command generates a single file."

---

## Q31
**Answer: C**

**Explanation:** Snowpipe uses Snowflake-managed serverless compute, not a user-specified virtual warehouse. Therefore, a suspended virtual warehouse would have no effect on Snowpipe's operation — making C the least likely cause. Option A (misconfigured SQS notification) is a common cause of Snowpipe not loading files. Option B (insufficient IAM permissions) would prevent Snowpipe from reading files from S3. Option D (file names matching load history) would cause Snowpipe to skip files it believes were already loaded.

**Source:** [Troubleshooting Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-ts)

**Quote:** "Snowpipe uses Snowflake-supplied compute resources to load data. A virtual warehouse is not required for Snowpipe operations."

---

## Q32
**Answer: A, C**

**Explanation:** Streams on a table track DML changes (inserts, updates, deletes) as a change log since the last time the stream was consumed by a DML transaction (A is correct). If a stream is not consumed within the data retention period of the source table, the stream becomes stale and must be recreated because the historical change data is no longer available (C is correct). Option B is incorrect because streams consume minimal storage — they store only metadata/offsets, not a copy of the data. Option D is incorrect because tasks can call stored procedures, execute complex SQL, and even invoke Snowpark functions. Option E is incorrect because streams track all DML operations including inserts, updates, and deletes (for standard streams).

**Source:** [Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream logically records DML changes made to a table, including inserts, updates, and deletes. When the data retention period for the source table is exceeded, the stream becomes stale."

---

## Q33
**Answer: B**

**Explanation:** Each Snowpipe object includes a COPY INTO statement definition that can include a query (SELECT) with transformations. This allows each pipe to define its own file format (CSV for NYSE, JSON for LSE, Parquet for TSE) and use column transformations in the SELECT clause to map each source-specific schema to the unified TRADES table structure. Option A is incorrect because each source has a different format. Option C is incorrect because Snowpipe does support transformation queries in the COPY INTO definition. Option D is unnecessarily limiting — structured columns are preferable.

**Source:** [Snowpipe — Transforming Data During a Load](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro#loading-your-data)

**Quote:** "The COPY INTO statement in a pipe definition supports a SELECT statement that can transform data as it is loaded, including column reordering, casting, and omitting columns."

---

## Q34
**Answer: B**

**Explanation:** The `FORCE = TRUE` parameter in COPY INTO bypasses the load history deduplication check, allowing files to be reloaded even if they were previously loaded and their metadata still exists in the load history. This is the most direct and practical approach. Option A is unnecessarily destructive — dropping the table loses all data and metadata. Option C is a workaround that adds unnecessary complexity. Option D requires waiting 14 days, which is impractical for most use cases.

**Source:** [COPY INTO table — FORCE](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#force)

**Quote:** "FORCE = TRUE | FALSE — Boolean that specifies to load all files, regardless of whether they've been loaded previously and have not changed since they were loaded."

---

## Q35
**Answer: B**

**Explanation:** For sub-5-second data freshness with exactly-once delivery from Kinesis, the recommended architecture is a Kinesis consumer application using the Snowflake Ingest SDK (Snowpipe Streaming). The application reads from Kinesis shards, uses the Ingest SDK's insertRows API, and manages offset tokens per shard to ensure exactly-once semantics and handle out-of-order events. Option A (Kinesis Firehose to S3 + Snowpipe) adds significant latency due to Firehose buffering (minimum 60 seconds) and Snowpipe processing time. Option C (Lambda + INSERT statements) doesn't scale well and doesn't provide exactly-once semantics. Option D (Flink to S3 + external table) doesn't meet the latency requirement.

**Source:** [Snowpipe Streaming Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Use offset tokens to provide exactly-once delivery semantics. The client application tracks the committed offset token returned by Snowflake to know which rows have been durably persisted."

---

## Q36
**Answer: A**

**Explanation:** `ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE` allows COPY INTO to handle files that have fewer (or more) columns than the target table expects. When set to FALSE, missing columns are filled with NULL values rather than raising an error. This is specifically designed for CSV files where the column count may not match. Option B (ON_ERROR = CONTINUE) handles row-level parsing errors but does not address column count mismatches at the file level. Option C (MATCH_BY_COLUMN_NAME) maps by name rather than position and requires headers, which is a different mechanism. Option D (TRUNCATECOLUMNS) handles column values exceeding the target column width, not missing columns.

**Source:** [COPY INTO table — ERROR_ON_COLUMN_COUNT_MISMATCH](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#error-on-column-count-mismatch)

**Quote:** "ERROR_ON_COLUMN_COUNT_MISMATCH: Boolean that specifies whether to generate a parsing error if the number of delimited columns in an input file does not match the number of columns in the corresponding table."

---

## Q37
**Answer: A, E**

**Explanation:** Using a larger warehouse size increases the compute resources and parallelism available for the COPY INTO <location> operation, directly improving throughput for large unloads (A is correct). Using `MAX_FILE_SIZE` to control output file sizes enables downstream systems to process files in parallel with optimal granularity — files that are too large reduce parallelism, and files that are too small create overhead (E is correct). Option B is incorrect because `SINGLE = TRUE` would create one massive 50 TB file, which is impractical and eliminates parallelism. Option C (PARTITION BY) is valuable for organization but doesn't directly optimize the unload operation's performance. Option D is incorrect because OVERWRITE doesn't append; it controls whether existing files are replaced.

**Source:** [COPY INTO location](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location)

**Quote:** "MAX_FILE_SIZE: Specifies the upper size limit (in bytes) of each file to be generated. The warehouse size determines the number of threads used and overall throughput of the unload operation."

---

## Q38
**Answer: B**

**Explanation:** The correct approach is to use `ON_ERROR = CONTINUE` to ensure all valid rows are loaded while skipping malformed rows, and then call the `VALIDATE` table function referencing the last COPY INTO statement ID to retrieve the details of rejected rows for the data quality report. Option A (ABORT_STATEMENT) stops loading on the first error, so valid rows may not be loaded. Option C is incorrect because VALIDATION_MODE does not load any data — it's a dry-run validation only. Option D (SKIP_FILE) skips entire files rather than individual rows, which could cause significant data loss.

**Source:** [VALIDATE Function](https://docs.snowflake.com/en/sql-reference/functions/validate)

**Quote:** "The VALIDATE function returns errors from a previously executed COPY INTO statement. This allows you to retrieve detailed error information after loading with ON_ERROR = CONTINUE."

---

## Q39
**Answer: A**

**Explanation:** The most appropriate design is to load the CSV metadata via Snowpipe (or COPY INTO) into a Snowflake table, with one of the columns storing the S3 URI/path of the corresponding PDF file. This allows the metadata to be fully queryable in Snowflake while maintaining a reference to the original PDF documents in S3. Option B is impractical because converting PDFs to text loses formatting and binary content. Option C is incorrect because external tables can't meaningfully parse PDF files. Option D is a possibility for metadata extraction but doesn't address the stated design where CSV sidecar files already contain the metadata.

**Source:** [Loading Data into Snowflake](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "You can store file references and metadata alongside structured data in Snowflake tables, enabling query access to metadata while maintaining links to unstructured data in external storage."

---

## Q40
**Answer: B**

**Explanation:** `STRIP_OUTER_ARRAY = TRUE` is the correct parameter that removes the outer array brackets from a JSON array, causing each element of the array to be loaded as a separate row in the target table. This is essential when JSON files contain an array of records at the top level (e.g., `[{...}, {...}, {...}]`). Without this parameter, the entire array would be loaded as a single VARIANT value. Option A (ENABLE_OCTAL) enables parsing of octal numbers in JSON. Options C and D are not valid Snowflake COPY INTO parameters.

**Source:** [COPY INTO table — Type = JSON](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#type-json)

**Quote:** "STRIP_OUTER_ARRAY = TRUE | FALSE — Boolean that instructs the JSON parser to remove the outer brackets when loading data from a JSON array."

---

## Q41
**Answer: A**

**Explanation:** The correct pattern is: (1) Load data into each regional Snowflake account using Snowpipe with stages in the corresponding cloud region, satisfying data residency requirements. (2) Use Snowflake's database replication and data sharing features for cross-region access to reference tables. Database replication can replicate reference tables from one account to another across regions, ensuring each account has a local copy while maintaining consistency. Option B violates data residency requirements by putting all data in one account. Option C would involve cross-region data access from S3, which violates residency and incurs latency/egress costs. Option D is not possible — a single Snowpipe cannot load into multiple accounts.

**Source:** [Replication and Failover](https://docs.snowflake.com/en/user-guide/replication-intro)

**Quote:** "Database replication enables replicating databases across Snowflake accounts in different regions and cloud platforms, supporting disaster recovery and data distribution requirements."

---

## Q42
**Answer: A, C**

**Explanation:** `SIZE_LIMIT` limits the total size of data loaded in a single COPY INTO execution, allowing staged incremental loads and directly controlling how much data is processed per statement, which affects performance characteristics (A is correct). The `FILES` parameter specifies an explicit list of files to load, reducing the scope of the operation. When loading from a stage with thousands of files, specifying a subset directly improves individual statement performance by limiting the work (C is correct). Option B (RETURN_FAILED_ONLY) only affects the result set output, not load throughput. Option D is incorrect because PATTERN filters which files are loaded, which does affect performance by reducing scope. Option E is incorrect because FORCE bypasses deduplication but doesn't improve throughput — it potentially increases work by reloading files.

**Source:** [COPY INTO table](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table)

**Quote:** "SIZE_LIMIT: Number (> 0) that specifies the maximum size (in bytes) of data to be loaded for a given COPY statement. When the threshold is exceeded, the COPY operation discontinues loading files."

---

## Q43
**Answer: B**

**Explanation:** Snowpipe mode in the Kafka connector stages data as files before loading them into Snowflake tables, which introduces inherent latency (typically minutes). Snowpipe Streaming mode uses the Snowflake Ingest SDK to write rows directly into Snowflake tables without the intermediate file staging step, enabling sub-second latency. This is a configuration change in the Kafka connector (setting `snowflake.ingestion.method=SNOWPIPE_STREAMING`) and does not require changes to the Kafka infrastructure itself. Increasing partitions (A) may help throughput but won't achieve sub-second latency with Snowpipe mode. Reducing `buffer.flush.time` (D) in Snowpipe mode still requires file staging, so sub-second latency is not achievable. Multiple connector instances (C) add complexity without solving the fundamental latency issue. A custom consumer (E) is unnecessary and error-prone.

**Source:** [Using Snowflake Connector for Kafka with Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-kafka)

**Quote:** "Snowpipe Streaming enables low-latency loading of streaming data rows using the Snowflake Ingest SDK and your own managed Apache Kafka topics."

---

## Q44
**Answer: A, D**

**Explanation:** Snowpipe mode writes data to a temporary stage as files and then uses Snowpipe to load those files, while Snowpipe Streaming mode uses the Snowflake Ingest SDK to write rows directly without staging files (A is correct). Because Snowpipe Streaming eliminates the file staging and copy step, it provides significantly lower latency — typically sub-second versus minutes for Snowpipe mode (D is correct). Option B is incorrect because Snowpipe Streaming does not require an external stage. Option C is incorrect because neither mode provides exactly-once guarantees natively. Option E reverses the configuration: Snowpipe Streaming mode requires `snowflake.ingestion.method=SNOWPIPE_STREAMING`, while Snowpipe mode is the default.

**Source:** [Snowflake Connector for Kafka Overview](https://docs.snowflake.com/en/user-guide/kafka-connector-overview)

**Quote:** "Snowpipe Streaming is designed to load streaming data using the Snowflake Ingest SDK... The Snowpipe option loads data from files in a stage... Snowpipe Streaming provides lower latency."

---

## Q45
**Answer: B**

**Explanation:** Kafka preserves message ordering within a single partition. Snowpipe Streaming mode in the Kafka connector maintains this per-partition ordering guarantee — rows from the same partition are inserted in the order they were received. Therefore, to ensure strict ordering per instrument symbol, the producer must ensure that all messages for the same instrument symbol are routed to the same Kafka partition (e.g., by using the instrument symbol as the partition key). Setting `buffer.count.records=1` (A) would degrade performance without solving the cross-partition ordering issue. There is no `snowflake.enable.ordering` property (C). Snowpipe mode (D) does not provide stronger ordering guarantees. Reordering after ingestion (E) is complex and defeats the purpose of streaming ingestion.

**Source:** [Using Snowflake Connector for Kafka with Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-kafka)

**Quote:** "Snowpipe Streaming preserves the order of the rows within a Kafka partition as they are inserted into the Snowflake table."

---

## Q46
**Answer: B**

**Explanation:** The Snowflake Spark connector supports query pushdown, which translates Spark DataFrame operations (such as filters, projections, joins, and aggregations) into SQL that is executed directly in Snowflake. This means only the filtered/aggregated result set is transferred to Spark, dramatically reducing data movement. Option A (JDBC batch mode) is not a Spark connector feature for minimizing data movement. There is no native caching layer (C) specific to the Snowflake Spark connector. External tables pointing to HDFS (D) would be the reverse of the architecture described.

**Source:** [Using the Spark Connector — Pushing Spark Query Processing to Snowflake](https://docs.snowflake.com/en/user-guide/spark-connector-use#pushing-spark-query-processing-to-snowflake-pushdown)

**Quote:** "The connector supports pushing down Spark query processing to Snowflake. When the connector detects that a query can be processed in Snowflake, the connector generates a SQL statement and sends it to Snowflake for processing."

---

## Q47
**Answer: B**

**Explanation:** The Snowflake Spark connector has an `autopushdown` configuration option that controls whether DataFrame operations are translated to SQL and executed in Snowflake. If `autopushdown` is set to `"off"`, the connector will read the entire table into Spark and all operations will be executed locally. The default value is `"on"`, but if it has been explicitly disabled, no pushdown occurs. The Spark connector does support pushdown for groupBy (A is incorrect). Clustering keys (C) affect Snowflake query performance but not whether pushdown occurs. Spark's catalyst optimizer (D) operates on the Spark side and doesn't prevent pushdown.

**Source:** [Using the Spark Connector — Configuration Options](https://docs.snowflake.com/en/user-guide/spark-connector-use#setting-configuration-options-for-the-connector)

**Quote:** "autopushdown — If set to on (default), the connector attempts to translate Spark logical plans to Snowflake SQL queries. If set to off, no query pushdown is attempted."

---

## Q48
**Answer: A, C**

**Explanation:** For efficiently loading a large pandas DataFrame into Snowflake, `write_pandas()` is the recommended method. It internally converts the DataFrame to Parquet, uses PUT to upload to a temporary stage, and executes COPY INTO to load the data (A is correct). For non-blocking execution of long-running queries, `cursor.execute_async()` submits the query asynchronously and returns immediately with a query ID (C is correct). `cursor.executemany()` (B) with row-by-row inserts would be extremely slow for 5 million rows. `timeout=0` (D) is not a valid parameter for non-blocking queries. `fetch_pandas_all()` (E) is for fetching results, not loading data.

**Source:** [Using the Python Connector — write_pandas](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-api#write_pandas)

**Quote:** "write_pandas() writes a pandas DataFrame to a table in Snowflake... Performing Asynchronous Queries: You can submit queries asynchronously using execute_async()."

---

## Q49
**Answer: B**

**Explanation:** The correct approach is to apply the `UPPER()` function to both the column and the parameter in the SQL query itself while still using parameterized binding: `WHERE UPPER(region) = UPPER(%s)`. This ensures case-insensitive comparison without modifying the underlying data and maintains the security benefits of parameterized queries. Changing binding syntax (A) doesn't solve the case-sensitivity issue. Using f-string interpolation (C) introduces SQL injection vulnerabilities. Setting `QUOTED_IDENTIFIERS_IGNORE_CASE` (D) affects how quoted identifiers (object names) are resolved, not string comparison in WHERE clauses.

**Source:** [Using the Python Connector — Binding Data](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-example#binding-data)

**Quote:** "Use parameterized queries to bind data to SQL statements. This prevents SQL injection attacks and ensures proper handling of special characters."

---

## Q50
**Answer: C**

**Explanation:** When using `execute_async()`, the query is submitted asynchronously and may still be running when the code checks its status. `get_query_status_throw_if_error()` returns the status at that point in time — if the query is still running, it returns a non-terminal state. The architect must implement a polling loop that repeatedly checks until it reaches a terminal state (SUCCESS or FAILED_WITH_ERROR) before calling `get_results_from_sfqid()`. Without this loop, the code may attempt to fetch results before they are available. Option A is incorrect because `execute_async()` does set `sfqid`. Option B is incorrect because async queries can run concurrently. Option D is incorrect because `execute_async()` is a supported feature.

**Source:** [Using the Python Connector — Asynchronous Queries](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-example#checking-the-status-of-a-query)

**Quote:** "To check the status of a query, call the get_query_status_throw_if_error() method... Use a loop to wait for the query to complete before fetching results."

---

## Q51
**Answer: B**

**Explanation:** When using multi-statement execution with the JDBC driver, the `MULTI_STATEMENT_COUNT` parameter must match the exact number of semicolon-separated statements being submitted. In this case, the SQL string contains four statements: `BEGIN`, `INSERT INTO t1 VALUES(1)`, `INSERT INTO t2 VALUES(2)`, and `COMMIT`. Since `MULTI_STATEMENT_COUNT` is set to 3 but there are 4 statements, Snowflake rejects the request. The parameter should be set to 4 or 0 (unlimited). BEGIN and COMMIT are counted as statements. Option A is incorrect because the parameter can be set via session. Option C is incorrect because JDBC supports multi-statement execution. Option D is incorrect because BEGIN and COMMIT are counted.

**Source:** [Submitting Multiple SQL Statements in a Single Request](https://docs.snowflake.com/en/developer-guide/sql-api/submitting-multiple-statements)

**Quote:** "The MULTI_STATEMENT_COUNT parameter specifies the exact number of statements in the multi-statement request. Set it to 0 to allow a variable number of statements."

---

## Q52
**Answer: A**

**Explanation:** The correct JDBC connection string for key-pair authentication through a proxy uses: `private_key_file` pointing to the PKCS#8 private key file, `authenticator=SNOWFLAKE_JWT` to specify key-pair authentication, and proxy settings with `useProxy=true`, `proxyHost`, and `proxyPort`. Option B uses `EXTERNALBROWSER` authenticator which is for browser-based SSO. Option C uses `OAUTH` authenticator which is incorrect for key-pair. Option D uses `authenticator=SNOWFLAKE` which is for username/password authentication.

**Source:** [JDBC Driver Connection Parameters](https://docs.snowflake.com/en/developer-guide/jdbc/jdbc-configure#connection-parameters)

**Quote:** "Set authenticator to SNOWFLAKE_JWT to use key pair authentication... Set useProxy to true and specify the proxyHost and proxyPort to route connections through a proxy server."

---

## Q53
**Answer: B**

**Explanation:** `SYSTEM$ALLOWLIST()` is the Snowflake system function that returns a JSON array of hostnames and ports that must be allowed through the corporate firewall for Snowflake connectivity. This includes endpoints for the Snowflake account, internal stages, OCSP checks, and other required services. This is the recommended approach because the list is dynamically generated for the specific account and region. Option A is incorrect because `LOGIN_HISTORY` shows login events, not required endpoints. Option C is unreliable because IP ranges change. Option D mentions a deprecated function — `SYSTEM$ALLOWLIST()` is the current recommended function.

**Source:** [SYSTEM$ALLOWLIST](https://docs.snowflake.com/en/sql-reference/functions/system_allowlist)

**Quote:** "Returns hostnames and port numbers to add to your firewall's allowed list so that you can access Snowflake from behind your firewall."

---

## Q54
**Answer: A**

**Explanation:** The Snowflake SQL API provides comprehensive REST endpoints for submitting any SQL statement (DDL, DML, queries), checking the status of a submitted statement by its statement handle, and retrieving results with support for pagination of large result sets through partitions. This makes it suitable for any language that can make HTTP requests, including Go and Rust. Option B is incorrect because the SQL API supports all SQL statement types. Option C is incorrect because it supports asynchronous execution. Option D is incorrect because it supports both DDL and DML.

**Source:** [Snowflake SQL API](https://docs.snowflake.com/en/developer-guide/sql-api/about-endpoints)

**Quote:** "The SQL API is a REST API that you can use to access and update data in a Snowflake database... You can use this API to execute standard queries, and most DDL and DML statements."

---

## Q55
**Answer: A, C**

**Explanation:** When a query takes longer than a short threshold, the API returns a 202 Accepted HTTP response with a `statementHandle` for polling (A is correct). Once the query completes, large result sets are divided into partitions that clients retrieve via GET requests with partition indices (C is correct). Option B is incorrect — the API does not always wait for completion. Option D is incorrect — there is no automatic 60-second cancellation. Option E is incorrect — the SQL API uses standard HTTP REST polling, not WebSockets.

**Source:** [Snowflake SQL API — Checking the Status of a Statement](https://docs.snowflake.com/en/developer-guide/sql-api/guide-checking-status)

**Quote:** "If the statement has not yet finished executing, the response includes a 202 response code... To retrieve the results, send a GET request... Specify the partition number in the request."

---

## Q56
**Answer: A**

**Explanation:** SnowSQL supports variable substitution using the `-D` flag to define variables that can be referenced in SQL scripts using the `&variable_name` syntax. The command `snowsql -f maintenance.sql -D start_date=2024-01-01` correctly passes the `start_date` variable to the script. Option B (`--param`) is not a valid SnowSQL flag. Option C (`-v`) is not the correct flag for variable definition. Option D (`--set`) is not the correct syntax.

**Source:** [Using Variables in SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql-use#using-variables)

**Quote:** "To define a variable on the command line, use the -D option... snowsql ... -D variable_name=value"

---

## Q57
**Answer: B**

**Explanation:** The Snowflake CLI (`snow`) is designed for project-based development workflows: building, testing, and deploying Snowpark Python applications, Streamlit apps, and Native Apps using project definition files. SnowSQL is a command-line client optimized for interactive SQL execution and scripting. Option A is incorrect because `snow` is not a replacement for SnowSQL. Option C is incorrect because SnowSQL doesn't natively support Snowpark development. Option D is incorrect because `snow` supports Snowpark stored procedures, UDFs, and more.

**Source:** [Snowflake CLI Overview](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "Snowflake CLI is a command-line interface for managing Snowflake project-based development, including Snowpark, Streamlit, and Snowflake Native App Framework projects."

---

## Q58
**Answer: C**

**Explanation:** Snowpark uses lazy evaluation. When you call `session.table()`, `filter()`, `group_by()`, `agg()`, or other transformation methods, Snowpark builds an internal query plan but does not execute any SQL. SQL execution is only triggered when an action method is called — such as `show()`, `collect()`, `count()`, or `save_as_table()`. At that point, Snowpark translates the entire query plan into a single optimized SQL statement. Options A, B, and D incorrectly describe eager evaluation at intermediate steps.

**Source:** [Snowpark Developer Guide — Working with DataFrames](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "Snowpark uses lazy evaluation... The SQL statement is not sent to the server for execution until you call an action method."

---

## Q59
**Answer: A**

**Explanation:** When a Snowpark stored procedure handler is invoked by Snowflake, the runtime automatically provides a `Session` object as the first parameter. This session is pre-authenticated and runs within the stored procedure's execution context. Creating a new session inside the handler is incorrect because it bypasses the stored procedure's security context, requires hardcoded credentials, creates unnecessary overhead, and may fail in restricted environments.

**Source:** [Writing Stored Procedures in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-sprocs#writing-the-stored-procedure)

**Quote:** "The first parameter of the handler function is a Snowpark Session object. When you call the stored procedure, Snowflake creates a Session object and passes it to your stored procedure."

---

## Q60
**Answer: A, C**

**Explanation:** UDFs are used within SQL expressions and return values per row, while stored procedures are invoked with CALL and can execute multiple SQL statements including DDL/DML (A is correct). UDFs do not have access to a Session object — stored procedures receive a Session as their first parameter (C is correct). Option B is incorrect because stored procedures default to owner's rights. Option D is incorrect because stored procedures can be written in Python. Option E is incorrect because stored procedures do not support vectorized execution.

**Source:** [Snowpark Python UDFs and Stored Procedures](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-udfs)

**Quote:** "A UDF is called as part of a SQL statement and returns a value for each input row... A stored procedure is called with the CALL statement and can perform DDL and DML operations."

---

## Q61
**Answer: B**

**Explanation:** Creating a new Snowpark session for each transformation step incurs authentication, network handshaking, and resource allocation overhead for each session. The recommended approach is to create a single Session at the beginning and reuse it across all transformation steps. Snowpark sessions are designed to be reused. Option A is unnecessary because Snowpark manages its connection internally. Option C abandons Snowpark benefits. Option D still creates new sessions per step, which is the core problem.

**Source:** [Snowpark Python Developer Guide — Creating a Session](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-session)

**Quote:** "Create a Session object to connect to Snowflake. You use this session to access all Snowpark functionality."

---

## Q62
**Answer: B**

**Explanation:** When deploying a Snowpark UDF with third-party library dependencies, specify the package in the `packages` parameter of the `@udf` decorator. Snowflake resolves packages from the Anaconda channel available within Snowflake's secure execution environment. Option A is incorrect because you cannot install packages on warehouse nodes. Option C is impractical. Option D adds unnecessary complexity.

**Source:** [Creating UDFs with Snowpark Python — Using Third-Party Packages](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-udfs#using-third-party-packages-from-anaconda)

**Quote:** "To use third-party packages from Anaconda in a UDF, specify the packages in the packages parameter."

---

## Q63
**Answer: B**

**Explanation:** When two DataFrames with a same-named column (`CUSTOMER_ID`) are joined, the resulting DataFrame has two ambiguous columns with the same name. A subsequent `select("CUSTOMER_ID")` cannot determine which is being referenced. The solution is to use DataFrame-qualified references or drop the duplicate column. Option A is incorrect — Snowpark supports joins. Option C is incorrect — `how` has a default. Option D is incorrect — `select` accepts strings.

**Source:** [Snowpark Python — Joining DataFrames](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes#joining-dataframes)

**Quote:** "If the DataFrames have the same column names, the resulting DataFrame will have ambiguous column references. Use DataFrame[col_name] to specify which column to reference."

---

## Q64
**Answer: A, C**

**Explanation:** Snowpark pushes down all DataFrame operations to Snowflake, building a single SQL query from the entire chain (A is correct). When a Snowpark UDF is used in a DataFrame operation, it executes within the Snowflake warehouse's Python sandbox (C is correct). Option B is incorrect — filters are pushed down. Option D is incorrect — window functions are pushed down. Option E is incorrect — all operations are pushed down.

**Source:** [Snowpark Developer Guide — Query Pushdown](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "Snowpark pushes down all DataFrame transformations and actions to the Snowflake database, where they are executed as SQL statements."

---

## Q65
**Answer: A**

**Explanation:** The recommended CI/CD workflow uses the Snowflake CLI: define the project in `snowflake.yml`, use `snow snowpark build` to package code and dependencies, and `snow snowpark deploy` to deploy. This integrates cleanly with CI/CD pipelines. Option B is manual and doesn't leverage CLI capabilities. Option C won't work without a project definition. Option D conflates Container Services with code deployment.

**Source:** [Snowflake CLI — Snowpark Commands](https://docs.snowflake.com/en/developer-guide/snowflake-cli/snowpark-commands)

**Quote:** "Use snow snowpark build to create an artifact... Use snow snowpark deploy to deploy your Snowpark project to Snowflake based on the project definition."

---

## Q66
**Answer: B**

**Explanation:** When multiple Kafka topics with different schemas are mapped to the same table with schema evolution enabled, conflicting column additions can arise. The solution is to map each topic to a separate target table, isolating schema evolution per topic. Downstream views can unify the data if needed. Option A removes convenience of automatic schema management. Option C's property doesn't exist. Option D is impractical.

**Source:** [Snowflake Connector for Kafka — Schema Detection and Evolution](https://docs.snowflake.com/en/user-guide/kafka-connector-overview#schema-detection-and-evolution)

**Quote:** "The connector can detect the schema of incoming records and evolve the target table schema accordingly... Use separate tables for topics with different schemas."

---

## Q67
**Answer: B**

**Explanation:** In the Snowflake ODBC DSN configuration, the `SERVER` parameter specifies the Snowflake account identifier. The ODBC driver constructs the full URL from this. Option A (`HOST`) is not the standard ODBC parameter name. Option C's parameter name is not the DSN field. Option D is incorrect.

**Source:** [ODBC Driver Configuration — DSN Parameters](https://docs.snowflake.com/en/developer-guide/odbc/odbc-parameters)

**Quote:** "SERVER: Specifies the Snowflake account identifier to connect to."

---

## Q68
**Answer: B**

**Explanation:** The ServiceNow connector provisions a dedicated database and uses scheduled ingestion to extract data from ServiceNow REST APIs, supporting both full and incremental synchronization. Option A is incorrect — it doesn't use Snowpipe Streaming. Option C is incorrect — no custom ETL is required. Option D is incorrect — it supports incremental sync.

**Source:** [ServiceNow Connector for Snowflake](https://docs.snowflake.com/en/user-guide/connector-servicenow)

**Quote:** "The Snowflake Connector for ServiceNow provides the ingested data in a database in your Snowflake account... data is synced on a configurable schedule."

---

## Q69
**Answer: A, D**

**Explanation:** Java services use the JDBC driver and the serverless platform uses the SQL API (REST) (A is correct). C# services use the ODBC or .NET driver, and Python microservices use the Python connector (D is correct). Option B incorrectly wraps Python connector for C#. Option C incorrectly pairs technologies. Option E makes poor matches.

**Source:** [Snowflake Drivers and Connectors](https://docs.snowflake.com/en/developer-guide/drivers)

**Quote:** "Snowflake provides native drivers and connectors for different programming languages and platforms."

---

## Q70
**Answer: D**

**Explanation:** Intermittent timeout errors during Spark connector writes are typically related to data transfer during the staging phase. Increasing `s3maxSinglePartUploadSize` and adjusting JDBC network timeout parameters addresses the root cause. Option A doesn't address timeouts. Option B is not a real parameter. Option C affects column casing, not timeouts.

**Source:** [Spark Connector — Configuration Options](https://docs.snowflake.com/en/user-guide/spark-connector-use#setting-configuration-options-for-the-connector)

**Quote:** "If you experience timeout errors when writing data, consider increasing the network timeout settings and adjusting the staging parameters."

---

## Q71
**Answer: B**

**Explanation:** The Kafka connector's buffer settings work on a "first threshold reached" basis. The connector flushes when ANY ONE of the three conditions is met: record count, time elapsed, or byte size — whichever comes first. This ensures data isn't held indefinitely while allowing flush on high volume. Option A is incorrect. Option C is incorrect. Option D is incorrect — these apply to Snowpipe Streaming mode.

**Source:** [Kafka Connector Configuration Properties](https://docs.snowflake.com/en/user-guide/kafka-connector-install#kafka-configuration-properties)

**Quote:** "The connector flushes data when any one of the buffer threshold conditions is met, whichever comes first."

---

## Q72
**Answer: B**

**Explanation:** SnowSQL supports named connections in the config file. Define `[connections.dev]`, `[connections.qa]`, `[connections.prod]` sections, then use `--connection` or `-c` flag at runtime. Option A creates unnecessary file management. Option C is incorrect — SnowSQL does support named connections. Option D requires many flags at runtime.

**Source:** [SnowSQL Configuration — Named Connections](https://docs.snowflake.com/en/user-guide/snowsql-config#defining-named-connections)

**Quote:** "You can define one or more named connections in the configuration file... Use the --connection (or -c) command-line option to specify which named connection to use."

---

## Q73
**Answer: A**

**Explanation:** Use `cursor.fetchmany(batch_size)` in a loop to fetch results in manageable chunks, keeping memory usage under control. When it returns an empty list, all rows have been fetched. Option B is incorrect — `fetchall()` doesn't accept `max_rows`. Option C doesn't prevent `fetchall()` from loading everything. Option D is not a standard cursor method.

**Source:** [Python Connector — Fetching Results](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-example#fetching-results)

**Quote:** "To avoid loading the entire result set into memory, use fetchmany() to retrieve results in batches."

---

## Q74
**Answer: A, D**

**Explanation:** The SQL API supports OAuth and key-pair JWT authentication (A is correct). Large result sets are partitioned, requiring additional GET requests per partition (D is correct). Option B is incorrect about the batch mechanism. Option C is incorrect — DDL is supported. Option E is incorrect — no dedicated warehouse is required.

**Source:** [SQL API Authentication and Result Retrieval](https://docs.snowflake.com/en/developer-guide/sql-api/authenticating)

**Quote:** "You can use OAuth or key pair authentication to authenticate to the SQL API... If the result is large, the response includes a partition index. Use additional requests to retrieve subsequent partitions."

---

## Q75
**Answer: B**

**Explanation:** The Google Analytics connector operates on a scheduled batch extraction model, periodically pulling data from the GA API. Near-real-time ingestion is not supported natively. Option A is incorrect. Option C is incorrect — Time Travel is unrelated. Option D mischaracterizes the connector.

**Source:** [Google Analytics Connector for Snowflake](https://docs.snowflake.com/en/user-guide/connector-google-analytics)

**Quote:** "The connector syncs data from your Google Analytics account into Snowflake on a scheduled basis."

---

## Q76
**Answer: B**

**Explanation:** To allow a stored procedure to make external HTTP calls, create an external access integration with a network rule specifying allowed endpoints, then grant it to the procedure via `EXTERNAL_ACCESS_INTEGRATIONS`. Option A is incorrect — no warehouse-level setting exists. Option C is incorrect — stored procedures can make HTTP calls with proper configuration. Option D is unnecessary.

**Source:** [External Network Access for UDFs and Procedures](https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview)

**Quote:** "To allow a UDF or procedure to access an external network location, create an external access integration that includes network rules specifying the allowed endpoints."

---

## Q77
**Answer: A**

**Explanation:** Combining `--abort-on-error` with `-o log_level=DEBUG` stops execution on first error and captures detailed logs identifying the failing statement. Option B lets errors cascade. Option C is not a standard SnowSQL option. Option D is not a standard SnowSQL option.

**Source:** [SnowSQL — Command-Line Options](https://docs.snowflake.com/en/user-guide/snowsql-use#label-snowsql-errors)

**Quote:** "Use the -o abort_on_error=true option to stop script execution when an error occurs."

---

## Q78
**Answer: A, C**

**Explanation:** EXECUTE AS OWNER provides elevated privileges so the procedure accesses tables the caller cannot (A is correct). Using `session.sql()` to INSERT audit records creates a persistent, queryable audit trail (C is correct). Option B doesn't provide privilege escalation. Option D's print() doesn't create persistent logs. Option E adds unnecessary complexity.

**Source:** [Stored Procedure Caller's Rights and Owner's Rights](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights)

**Quote:** "A stored procedure that executes as owner runs with the privileges of the owner role... Use session.sql() within the stored procedure to execute SQL statements."

---

## Q79
**Answer: B**

**Explanation:** `save_as_table()` with `mode("overwrite")` generates `CREATE OR REPLACE TABLE`, which is DDL. DDL auto-commits in Snowflake, breaking the explicit transaction boundary. The changes cannot be rolled back. The fix is to use `INSERT OVERWRITE` or `TRUNCATE` + `INSERT` within the transaction. Option A is partially incorrect — DataFrames generating DML can participate. Option D is incorrect — sessions support transactions.

**Source:** [Snowflake Transactions — DDL](https://docs.snowflake.com/en/sql-reference/transactions#ddl)

**Quote:** "Each DDL statement executes as a separate transaction... DDL statements are not transactional and cannot be rolled back."

---

## Q80
**Answer: A**

**Explanation:** The Kafka connector creates target tables with two VARIANT columns by default: `RECORD_METADATA` (containing topic, partition, offset, key, timestamp) and `RECORD_CONTENT` (containing the message payload). Both metadata and payload are preserved automatically. Option B is incorrect — metadata is stored. Option C is incorrect — no separate table. Option D is incorrect — keys are preserved in RECORD_METADATA.

**Source:** [Kafka Connector — Table Schema](https://docs.snowflake.com/en/user-guide/kafka-connector-overview#snowflake-table-schema)

**Quote:** "The default table created by the Kafka connector contains two VARIANT columns: RECORD_METADATA and RECORD_CONTENT."

---

## Q81
**Answer: A**

**Explanation:** `write_pandas()` works by converting the DataFrame to a file format, using PUT to upload to a temporary internal stage, then executing COPY INTO to load the data. This three-step process leverages Snowflake's efficient bulk loading. Option B is incorrect — no row-by-row inserts. Option C is incorrect — no Ingest SDK. Option D is incorrect — no direct micro-partition writes.

**Source:** [Python Connector — write_pandas](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-api#write_pandas)

**Quote:** "Writes a pandas DataFrame to a Snowflake table. Internally, this function uses the PUT command to stage the data and the COPY INTO command to load it."

---

## Q82
**Answer: A, B**

**Explanation:** Using a connection pool like HikariCP efficiently manages and reuses connections (A is correct). Setting `CLIENT_SESSION_KEEP_ALIVE=true` prevents idle sessions from timing out (B is correct). Option C creates a new connection per query — the opposite of best practice. Option D is not a real parameter. Option E is unrelated to performance optimization.

**Source:** [JDBC Driver — Connection Properties](https://docs.snowflake.com/en/developer-guide/jdbc/jdbc-configure#connection-parameters)

**Quote:** "CLIENT_SESSION_KEEP_ALIVE: Keeps the session active indefinitely, even if there is no activity... Use connection pooling to efficiently manage JDBC connections."

---

## Q83
**Answer: B**

**Explanation:** Vectorized UDFs process rows in batches as pandas Series, significantly reducing Python interpreter overhead per row and leveraging pandas' optimized C-based string operations. For 200 million rows, this is orders of magnitude faster than scalar UDFs. Option A is about syntax. Option C is incorrect — both execute in Python. Option D is incorrect — UDFs run in a single warehouse.

**Source:** [Python UDF — Vectorized UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as pandas DataFrames or Series... reducing the overhead of row-at-a-time processing."

---

## Q84
**Answer: A**

**Explanation:** The correct mapping is: (1) Java web app → JDBC driver (native Java driver with connection pooling), (2) Spark ETL → Spark connector (purpose-built with pushdown), (3) Python data science → Snowpark Python (DataFrame API in Snowflake), (4) Go microservice → SQL API (REST-based, no native driver needed), (5) Batch SQL from cron → SnowSQL (CLI for scripted SQL). All other options have significant mismatches.

**Source:** [Snowflake Drivers and Connectors Overview](https://docs.snowflake.com/en/developer-guide/drivers)

**Quote:** "Snowflake provides drivers and connectors for various programming languages and tools, including JDBC for Java, the Spark connector for Apache Spark, Snowpark for Python, the SQL API for REST-based access, and SnowSQL for command-line operations."

---

## Q85
**Answer: C**

**Explanation:** In a dynamic table chain, each dynamic table independently manages its own refresh cycle based on its configured target lag. The end-to-end latency from source data change to visibility in the final dynamic table is the cumulative sum of each individual target lag plus the actual processing time at each stage. With raw_events at 1 minute, enriched_events at 5 minutes, and aggregated_metrics set to DOWNSTREAM, the total end-to-end latency can reach 1 + 5 + processing overhead at each stage, which can approach 11 minutes in worst-case timing alignment. Option A incorrectly calculates the sum. Option B is incorrect — DOWNSTREAM is valid. Option D fabricates a buffer. Option E is incorrect about DOWNSTREAM behavior.

**Source:** [Understanding dynamic table refresh](https://docs.snowflake.com/en/user-guide/dynamic-tables-refresh)

**Quote:** "The target lag is independent for each dynamic table. The end-to-end latency of a pipeline of dynamic tables is the sum of the individual target lags."

---

## Q86
**Answer: B**

**Explanation:** Chained LATERAL FLATTEN operations are the correct approach for deeply nested JSON. Each FLATTEN targets a specific nesting level, and LATERAL allows referencing columns from the prior level, preserving parent-child hierarchy. There is no RECURSIVE => TRUE parameter for FLATTEN in Snowflake (A is incorrect). Option C is cumbersome. Option D doesn't flatten nested structures.

**Source:** [FLATTEN function](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "FLATTEN can be used to convert semi-structured data to a relational representation... When used with LATERAL, it enables joining with outer rows."

---

## Q87
**Answer: B, C**

**Explanation:** Dynamic tables with incremental refresh mode efficiently process only changed data, and MERGE logic handles deduplication (B is correct). Explicit column types enable predicate pushdown and micro-partition pruning (C is correct). Option A with full refresh is unnecessarily expensive. Option D defeats the silver layer's purpose. Option E is not a silver layer decision.

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables can use incremental refresh to process only the changes since the last refresh, reducing compute costs."

---

## Q88
**Answer: D**

**Explanation:** In Snowflake, DDL statements are auto-committed and cannot be rolled back within a transaction regardless of language or execution rights. Each DDL statement implicitly commits any open transaction before executing. This is a fundamental Snowflake behavior. The workaround is compensating logic (e.g., DROP what was CREATEd) rather than transaction rollback.

**Source:** [DDL commands and transaction control](https://docs.snowflake.com/en/sql-reference/transactions#ddl)

**Quote:** "DDL statements implicitly commit active transactions. Each DDL statement executes as its own transaction."

---

## Q89
**Answer: B**

**Explanation:** Streams track changes based on an offset that advances only when consumed by a committed DML transaction. During the outage, no data was loaded, but the offset remained at its last consumed position. After Snowpipe resumed and loaded backlog data, all those inserts appear as unconsumed changes. The stream doesn't miss data — it captures everything between its current offset and the current table version. The stream won't expire unless the data retention period is exceeded.

**Source:** [Streams overview](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream provides the minimal set of changes from its current offset to the current version of the table."

---

## Q90
**Answer: A**

**Explanation:** Dynamic tables support the full range of SQL operations including complex joins, window functions, subqueries, CTEs, and more. Materialized views have significant restrictions — they cannot include joins (with limited exceptions), subqueries, window functions, UDFs, or GROUP BY with HAVING. For dashboards requiring pre-aggregation with joins and window functions, dynamic tables are the clear choice. Option B is incorrect — dynamic tables consume compute. Option C is misleading. Option D is not the primary differentiator.

**Source:** [Dynamic tables vs materialized views](https://docs.snowflake.com/en/user-guide/dynamic-tables-comparison)

**Quote:** "Dynamic tables support a wider range of SQL constructs including joins, subqueries, and most SQL functions, while materialized views have restrictions on the types of queries they support."

---

## Q91
**Answer: A, C**

**Explanation:** SECURE prevents the function definition from being exposed through GET_DDL() or INFORMATION_SCHEMA (A is correct — addresses concern 1). Vectorized Python UDF with pandas enables batch processing, significantly faster than scalar UDFs (C is correct — addresses concern 2). Option B is incorrect — SQL UDFs aren't universally faster. Option D doesn't hide definitions. Option E is about optimization hints.

**Source:** [Secure UDFs](https://docs.snowflake.com/en/sql-reference/sql/create-function#secure-udfs)

**Quote:** "A secure UDF hides the function definition from unauthorized users... The SECURE property prevents the function definition from being visible to users who are not the function owner."

---

## Q92
**Answer: A**

**Explanation:** External functions batch rows into HTTP requests by default. If MAX_BATCH_ROWS is set to 1, each row creates a separate HTTP request — extremely inefficient for 10 million rows. The fix is to remove or increase MAX_BATCH_ROWS. Option D is incorrect because Snowflake does batch rows by default.

**Source:** [External functions — MAX_BATCH_ROWS](https://docs.snowflake.com/en/sql-reference/sql/create-external-function#optional-parameters)

**Quote:** "MAX_BATCH_ROWS specifies the maximum number of rows sent in each batch to the proxy service... Setting this to a small value increases the number of HTTP requests."

---

## Q93
**Answer: A**

**Explanation:** In a task graph, when a predecessor task fails, all downstream dependent tasks are skipped. Task D depends on both B and C. Since C failed, Task D is skipped regardless of the WHEN condition. The WHEN clause is evaluated only after all predecessors succeed. Successfully completed tasks (A and B) are not rolled back.

**Source:** [Task graphs and dependencies](https://docs.snowflake.com/en/user-guide/tasks-intro#task-graphs)

**Quote:** "If a predecessor task fails, all downstream tasks that depend on it are skipped."

---

## Q94
**Answer: A**

**Explanation:** OUTER => TRUE in FLATTEN generates a row with NULL values even when the input is NULL, empty, or missing. This behaves like a LEFT OUTER JOIN, preserving all parent rows. Without it, rows with null arrays are silently dropped. This is the purpose-built, idiomatic solution.

**Source:** [FLATTEN function](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "OUTER => TRUE: If the input is an empty array, empty object, or NULL, the output is a single row with NULL values in the output columns."

---

## Q95
**Answer: A**

**Explanation:** Dynamic tables can operate using serverless compute, so they don't require a user-managed warehouse. The cost is billed as serverless compute credits. Option B is incorrect — secure views do have a performance overhead. Option C is incorrect — MATCH_BY_COLUMN_NAME is for column mapping, not replacing staging. Option D is incorrect — dynamic tables support incremental refresh.

**Source:** [Dynamic tables — cost](https://docs.snowflake.com/en/user-guide/dynamic-tables-about#costs)

**Quote:** "Dynamic tables use serverless compute resources to perform refreshes. You do not need to specify a warehouse for dynamic table refreshes."

---

## Q96
**Answer: A, C**

**Explanation:** Procedure A uses EXECUTE AS OWNER to run with owner's privileges, hiding intermediate calculations from the caller (A is correct). Procedure B uses EXECUTE AS CALLER to access tables owned by the calling role (C is correct). Option B is incorrect — no SECURE modifier for stored procedures. Option D is impractical in a multi-role environment.

**Source:** [CREATE PROCEDURE — caller's vs. owner's rights](https://docs.snowflake.com/en/sql-reference/sql/create-procedure#callers-rights-and-owners-rights-stored-procedures)

**Quote:** "An owner's rights stored procedure runs with the privileges of the stored procedure owner... A caller's rights stored procedure runs with the privileges of the role that called the stored procedure."

---

## Q97
**Answer: D**

**Explanation:** The Java UDTF with SnowflakeFile class provides buffered I/O for reading staged files up to 500 MB without loading the entire file into memory. It supports reading from internal and external stages. Option A is incorrect — JavaScript UDFs can't directly access staged files. Option B with Python FileOperation is less optimal for large buffered reads. Option C is incorrect — SQL UDTFs can't reference stage paths.

**Source:** [Reading files from a stage with Java UDFs](https://docs.snowflake.com/en/developer-guide/udf/java/udf-java-tabular-functions)

**Quote:** "You can use the SnowflakeFile class to read files from a stage. The SnowflakeFile class provides methods for reading file content with buffered I/O."

---

## Q98
**Answer: C**

**Explanation:** Splitting a complex transformation into a chain of simpler dynamic tables allows each stage to be incrementally refreshed more efficiently. Simpler queries are more likely to qualify for incremental refresh, and each stage processes only changed data. Option A may help but doesn't address refresh complexity. Option D is not viable — materialized views don't support complex joins and window functions. Option E helps query performance but not refresh complexity.

**Source:** [Dynamic tables — best practices](https://docs.snowflake.com/en/user-guide/dynamic-tables-best-practices)

**Quote:** "Break complex transformations into chains of simpler dynamic tables... Simpler queries are more likely to be refreshed incrementally."

---

## Q99
**Answer: A**

**Explanation:** In Snowflake's semi-structured data handling, `payload:customer.address.zip` uses dot notation after the initial colon, which traverses nested objects. However, using colons at each level (`payload:customer:address:zip`) is the most reliable approach, especially for paths that may contain special characters. The most common cause of NULLs in nested paths is incorrect path traversal syntax.

**Source:** [Querying semi-structured data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "Use the : notation to traverse a path in a JSON object. For nested objects, chain the path elements with : or . notation."

---

## Q100
**Answer: A**

**Explanation:** Append-only streams only track INSERT operations, resulting in lower overhead compared to standard streams that maintain infrastructure for UPDATEs and DELETEs. For a table with only inserts, a standard stream would wastefully maintain capabilities for changes that never occur. Options B, C, and D are incorrect — append-only streams don't enable parallel processing, compact micro-partitions, or have different retention periods.

**Source:** [Stream types](https://docs.snowflake.com/en/user-guide/streams-intro#stream-types)

**Quote:** "An append-only stream tracks row inserts only... Append-only streams have lower overhead than standard streams because they only need to track insert operations."

---

## Q101
**Answer: A, C**

**Explanation:** Chained FLATTEN with explicit paths at each nesting level is correct for 4-level deep arrays (A is correct). OBJECT_CONSTRUCT assembles flattened results into a deterministic schema (C is correct). Option B is incorrect — no RECURSIVE => TRUE parameter exists. Option D is unnecessary on already-loaded VARIANT data. Option E doesn't help with flattening.

**Source:** [FLATTEN function](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "FLATTEN is a table function that takes a VARIANT, OBJECT, or ARRAY column and produces a lateral view... Multiple FLATTEN operations can be chained to handle deeply nested data."

---

## Q102
**Answer: D**

**Explanation:** Combining ACCOUNT_USAGE.DYNAMIC_TABLE_REFRESH_HISTORY (365 days historical with some latency) and INFORMATION_SCHEMA.DYNAMIC_TABLE_REFRESH_HISTORY() (near-real-time) provides complete visibility. Option A alone lacks historical depth. Option B is manual. Option C is insufficient.

**Source:** [Monitoring dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-monitor)

**Quote:** "Use INFORMATION_SCHEMA.DYNAMIC_TABLE_REFRESH_HISTORY() for near-real-time monitoring and ACCOUNT_USAGE.DYNAMIC_TABLE_REFRESH_HISTORY for historical analysis."

---

## Q103
**Answer: A**

**Explanation:** DDL statements cause an implicit commit of any active transaction. If one of the "update" statements was actually DDL, it committed everything prior to it. The subsequent ROLLBACK could only roll back statements after the implicit commit, explaining why only 2 of 3 updates were reversed.

**Source:** [Transactions and DDL](https://docs.snowflake.com/en/sql-reference/transactions#ddl)

**Quote:** "DDL statements implicitly commit active transactions. A DDL statement issued inside an open transaction commits the current transaction before executing."

---

## Q104
**Answer: A**

**Explanation:** A secure UDF hides its definition from non-owners via GET_DDL() and INFORMATION_SCHEMA. When shared, consumers can execute but cannot view the logic. Option B doesn't hide definitions. Option C adds unnecessary complexity. Option D doesn't hide definitions as effectively when shared.

**Source:** [Secure UDFs](https://docs.snowflake.com/en/sql-reference/sql/create-function#secure-udfs)

**Quote:** "Designating a UDF as secure hides its definition from users who are not the owner of the UDF, including through the GET_DDL function and INFORMATION_SCHEMA."

---

## Q105
**Answer: D**

**Explanation:** Both SPLIT and STRTOK_TO_ARRAY return ARRAY types that can be used with FLATTEN. SPLIT splits a string into an array based on a delimiter, and STRTOK_TO_ARRAY tokenizes a string into an array. Both produce valid outputs for FLATTEN. Option E is incorrect because SPLIT does return an ARRAY. Option B is incorrect because PARSE_JSON expects valid JSON.

**Source:** [SPLIT function](https://docs.snowflake.com/en/sql-reference/functions/split)

**Quote:** "SPLIT splits a given string with a given separator and returns the result in an array of strings."

---

## Q106
**Answer: A, C**

**Explanation:** WHEN with SYSTEM$STREAM_HAS_DATA() enables conditional execution for optional tasks (A is correct). AFTER clauses establish the dependency DAG for the 15-task graph (C is correct). Option B controls overlap between graph runs, not parallel task execution. Option D is for retrying failures, not skipped tasks. Option E breaks the dependency graph.

**Source:** [Task graphs](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "Use the WHEN clause with SYSTEM$STREAM_HAS_DATA to conditionally execute a task only when the specified stream contains change data."

---

## Q107
**Answer: A**

**Explanation:** Secure views restrict the optimizer's ability to push predicates through the view boundary to prevent data leakage. This can result in more data scanned and reduced performance compared to non-secure views. This is an intentional security trade-off.

**Source:** [Secure views — performance considerations](https://docs.snowflake.com/en/user-guide/views-secure#performance)

**Quote:** "The query optimizer may not optimize queries on secure views as efficiently as non-secure views because some optimizations require access to the underlying data, which could expose information."

---

## Q108
**Answer: C**

**Explanation:** VARIANT to NUMBER casting handles both string and numeric representations correctly. The root cause of intermittent failures is non-numeric strings like "N/A" or "TBD" in some records. The solution is TRY_CAST or TRY_TO_NUMBER which return NULL for unconvertible values. Option A is incorrect about the root cause. Option B is incorrect. Option D is incorrect.

**Source:** [TRY_CAST function](https://docs.snowflake.com/en/sql-reference/functions/try_cast)

**Quote:** "TRY_CAST is a special version of CAST that returns a NULL value instead of raising an error when the cast is not possible."

---

## Q109
**Answer: A**

**Explanation:** Network round-trip latency multiplied across batches, combined with remote service processing time per request, dominates execution time. Even with batching, 50 million rows require many HTTP round trips. Option B is incorrect about linear scaling. Option C is incorrect about headers. Option D is incorrect about COMPRESSION impact.

**Source:** [External functions — performance](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "The performance of external functions depends largely on the latency and throughput of the remote service, as well as the number of batches required to process the data."

---

## Q110
**Answer: C**

**Explanation:** Both IDENTIFIER() and EXECUTE IMMEDIATE work for dynamic table references, but IDENTIFIER() is preferred because it provides protection against SQL injection by treating the string as an object name. EXECUTE IMMEDIATE with concatenation is vulnerable to injection. Option D is incorrect — :table_name would be treated as a value, not an identifier.

**Source:** [IDENTIFIER function](https://docs.snowflake.com/en/sql-reference/identifier-literal)

**Quote:** "IDENTIFIER() can be used to resolve a string expression to an object identifier... This approach helps prevent SQL injection."

---

## Q111
**Answer: A, C**

**Explanation:** A standard stream captures both inserts and updates via METADATA$ACTION and METADATA$ISUPDATE, with MERGE to apply changes (A is correct). Running every 1 minute with ALLOW_OVERLAPPING_EXECUTION = FALSE prevents concurrent runs that could cause conflicts (C is correct). Option B misses updates. Option D could cause data integrity issues with overlapping MERGE operations. Option E is about initial rows.

**Source:** [Streams and tasks](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Standard streams track all DML changes, including inserts, updates, and deletes... Use METADATA$ACTION and METADATA$ISUPDATE to determine the type of change."

---

## Q112
**Answer: A**

**Explanation:** Non-deterministic functions return different values on each evaluation. In dynamic tables, the defining query is re-executed during each refresh, producing different values for the same source rows (e.g., new UUIDs, different timestamps). This makes the pipeline non-idempotent and can break downstream dependencies. Option B is incorrect — they're allowed but not recommended. Option C is incorrect about forcing full refresh. Option D is incorrect about refresh frequency.

**Source:** [Dynamic tables — limitations](https://docs.snowflake.com/en/user-guide/dynamic-tables-about#limitations)

**Quote:** "Non-deterministic functions may produce different results on each refresh, which can lead to unexpected behavior in dynamic table pipelines."

---

## Q113
**Answer: A**

**Explanation:** OBJECT_CONSTRUCT builds the outer structure per customer, and ARRAY_AGG with nested OBJECT_CONSTRUCT creates an array of order objects. GROUP BY ensures one row per customer. Option B produces per-row JSON. Option C is fragile. Option D creates key-value objects, not order arrays.

**Source:** [OBJECT_CONSTRUCT function](https://docs.snowflake.com/en/sql-reference/functions/object_construct)

**Quote:** "OBJECT_CONSTRUCT returns an OBJECT constructed from the arguments... Can be combined with ARRAY_AGG to build nested JSON structures."

---

## Q114
**Answer: A**

**Explanation:** Separate warehouses per tenant provide true compute-level isolation. Each has its own resources, preventing resource-intensive procedures from affecting others. Option B doesn't affect compute isolation. Option C adds latency and complexity. Option D caps execution time but doesn't prevent contention during execution.

**Source:** [Virtual warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Each virtual warehouse is an independent compute cluster that does not share compute resources with other virtual warehouses."

---

## Q115
**Answer: A**

**Explanation:** Converting from scalar to vectorized UDF has the most significant impact. Scalar UDFs process one row at a time with high serialization overhead. Vectorized UDFs receive batches as pandas Series, reducing overhead by orders of magnitude for 500 million rows. Option B helps but doesn't fix the row-by-row bottleneck. Option C helps only with repeated inputs. Option D provides marginal improvement.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs allow you to define Python functions that receive batches of input rows as pandas DataFrames or pandas Series, enabling more efficient processing."

---

## Q116
**Answer: A, C**

**Explanation:** A standard stream captures inserts, updates, and soft deletes with METADATA$ACTION and METADATA$ISUPDATE columns (A is correct). A MERGE statement handles all three scenarios (C is correct). Option B is incorrect — append-only streams only track inserts. Option D adds unnecessary complexity. Option E is counterproductive.

**Source:** [Streams and change tracking](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Standard streams track inserts, updates, and deletes. Updates are represented as a pair of DELETE and INSERT rows with METADATA$ISUPDATE set to TRUE."

---

## Q117
**Answer: A**

**Explanation:** gold.customer_360 refreshes every 10 minutes per its target lag. silver.sentiment_analysis with TARGET_LAG = DOWNSTREAM adopts a lag inherited from its downstream consumers — since gold.customer_360 is its consumer with a 10-minute lag, sentiment_analysis refreshes as needed to satisfy that requirement. silver.order_summary refreshes independently at 5 minutes.

**Source:** [Dynamic tables — target lag](https://docs.snowflake.com/en/user-guide/dynamic-tables-refresh#target-lag)

**Quote:** "DOWNSTREAM: The dynamic table is refreshed on demand when downstream dynamic tables that depend on it are refreshed."

---

## Q118
**Answer: A**

**Explanation:** External functions with an API integration routing through an API Gateway is the correct approach for calling private VPC endpoints from a UDF. The API Gateway acts as a proxy between Snowflake and the private endpoint. Option B is incorrect — Python UDFs cannot make outbound calls by default. Option C is incorrect — JavaScript UDFs have no network access. Option D wraps a procedure in a UDF, which is unnecessarily complex.

**Source:** [External functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "External functions call code that executes outside Snowflake via an API integration and proxy service such as Amazon API Gateway or Azure API Management."

---

## Q119
**Answer: D**

**Explanation:** Both bracket notation `payload['Event-Type']` and colon notation with double quotes `payload:"Event-Type"` correctly access JSON keys containing special characters like hyphens. The hyphen in GET_PATH's unquoted path expression is problematic. Both B and C describe valid approaches.

**Source:** [Querying semi-structured data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "For keys that contain special characters, use bracket notation or double-quoted key names with the colon notation."

---

## Q120
**Answer: A, B**

**Explanation:** VARIANT columns accept any JSON regardless of structure, so new fields never cause ingestion failures (A is correct). TRY_CAST and COALESCE patterns handle unexpected types and field additions gracefully in the transformation layer (B is correct). Option C loses data. Option D requires DDL changes. Option E helps with column mapping but doesn't handle type changes.

**Source:** [Loading semi-structured data](https://docs.snowflake.com/en/user-guide/semistructured-intro)

**Quote:** "Store semi-structured data in VARIANT columns to avoid schema-related issues during loading. Use TRY_CAST in transformations to handle type conversion failures gracefully."

---

## Q121
**Answer: A**

**Explanation:** With ALLOW_OVERLAPPING_EXECUTION = FALSE, if the current run is still executing at the next trigger, the next run is skipped. The 12-minute execution exceeds the 10-minute schedule, so scheduled runs are skipped until the current one completes. Runs are not queued (B), the schedule is not adjusted (C), and the graph is not suspended (D).

**Source:** [Tasks — ALLOW_OVERLAPPING_EXECUTION](https://docs.snowflake.com/en/user-guide/tasks-intro#overlapping-task-runs)

**Quote:** "If ALLOW_OVERLAPPING_EXECUTION is set to FALSE and the task is still running when the next scheduled execution time occurs, the scheduled run is skipped."

---

## Q122
**Answer: A**

**Explanation:** Temporary tables are session-scoped and isolated per session. Concurrent callers each run in their own session with isolated temporary tables — no naming conflicts or data leakage. Option B is incorrect — they persist for the session duration, not just the procedure call. Option C is incorrect — procedures can create temporary tables. Option D is incorrect — no explicit grants needed.

**Source:** [Temporary tables](https://docs.snowflake.com/en/sql-reference/sql/create-table#temporary-tables)

**Quote:** "Temporary tables exist only within the session in which they were created and are not visible to other users or sessions."

---

## Q123
**Answer: A**

**Explanation:** REFRESH_MODE = INCREMENTAL is a preference hint. Snowflake may fall back to full refresh when incremental is not possible or efficient — due to DDL changes, data changes that can't be tracked incrementally, or optimizer decisions. Option B is incorrect — Snowpipe loads don't inherently trigger full refreshes. Option C is incorrect — SELECT * doesn't prevent incremental refresh. Option D is incorrect — lag aggressiveness doesn't force full refresh.

**Source:** [Dynamic tables — refresh mode](https://docs.snowflake.com/en/user-guide/dynamic-tables-refresh#refresh-mode)

**Quote:** "When you set REFRESH_MODE = INCREMENTAL, Snowflake attempts incremental refreshes but may fall back to full refresh when incremental is not possible."

---

## Q124
**Answer: A**

**Explanation:** Complex SQL UDFs in WHERE clauses may prevent predicate pushdown to the base table scan. The optimizer treats the UDF as a boundary, potentially evaluating it for every row before filtering. This causes a full table scan. Option B is incorrect — SQL UDFs are inlined when possible. Option C is incorrect — they can be used in WHERE. Option D describes a consequence, not the root cause.

**Source:** [SQL UDFs — performance](https://docs.snowflake.com/en/developer-guide/udf/sql/udf-sql-introduction)

**Quote:** "Complex SQL UDFs may limit the optimizer's ability to push predicates or perform other optimizations on the underlying base tables."

---

## Q125
**Answer: A, C**

**Explanation:** TASK_AUTO_RETRY_ATTEMPTS = 3 enables automatic retries for transient failures like HTTP 429 (A is correct). Setting MAX_BATCH_ROWS to a lower value reduces per-request load on the remote API, helping avoid rate limits (C is correct). Option B is more complex than task-level retries. Option D is incorrect — no RATE_LIMIT parameter exists on API integrations. Option E monitors but doesn't prevent errors.

**Source:** [Task parameters](https://docs.snowflake.com/en/sql-reference/sql/create-task#optional-parameters)

**Quote:** "TASK_AUTO_RETRY_ATTEMPTS specifies the number of automatic retries for a task when it fails."
