## Q1

**Answer: B**

**Explanation:** HLL (HyperLogLog) is the purpose-built function for estimating distinct values in large datasets. It provides significantly faster performance than COUNT(DISTINCT) with only a small margin of error (~1.62%). APPROX_TOP_K estimates frequent values, not distinct counts, and APPROX_PERCENTILE estimates percentile values.

**Source:** [Estimating the Number of Distinct Values](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality)

**Quote:** "Snowflake uses HyperLogLog to estimate the approximate number of distinct values in a data set. HyperLogLog is a state-of-the-art cardinality estimation algorithm, capable of estimating distinct cardinalities of trillions of rows with an average relative error of a few percent."
---
## Q2

**Answer: C**

**Explanation:** Snowflake's HyperLogLog implementation uses a precision of 12 bits, resulting in a mathematically derived average relative error of 1.62338%. For a COUNT(DISTINCT) result of 1,000,000, HLL typically returns a result between 983,767 and 1,016,234.

**Source:** [Estimating the Number of Distinct Values](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality)

**Quote:** "The average relative error of our HyperLogLog implementation is 1.62338% (i.e. the average relative difference to the corresponding COUNT(DISTINCT …) result)."
---
## Q3

**Answer: C**

**Explanation:** APPROX_TOP_K is designed specifically for estimating the most frequently occurring values in a data set. HLL and APPROX_COUNT_DISTINCT estimate the number of distinct values (cardinality), while APPROX_PERCENTILE estimates percentile values. Only APPROX_TOP_K identifies the most common values.

**Source:** [Estimating Frequent Values](https://docs.snowflake.com/en/user-guide/querying-approximate-frequent-values)

**Quote:** "Snowflake uses the Space-Saving algorithm, a space and time efficient way of estimating approximate frequent values in data sets."
---
## Q4

**Answer: C**

**Explanation:** APPROX_PERCENTILE uses the t-Digest algorithm. HyperLogLog is used for APPROX_COUNT_DISTINCT/HLL (cardinality estimation), Space-Saving is used for APPROX_TOP_K (frequent values), and Count-Min Sketch is not used by Snowflake's built-in functions.

**Source:** [Estimating Percentile Values](https://docs.snowflake.com/en/user-guide/querying-approximate-percentile-values)

**Quote:** "Snowflake uses an improved version of the t-Digest algorithm, a space and time efficient way of estimating approximate percentile values in data sets."
---
## Q5

**Answer: B**

**Explanation:** The SEED/REPEATABLE parameter only applies to SYSTEM (or BLOCK) sampling, not to BERNOULLI (or ROW) sampling. Option A incorrectly uses BERNOULLI with SEED. Option C uses ROW (synonym for BERNOULLI) with REPEATABLE, which is not supported. Option D uses fixed-size sampling with SEED, which is also not supported.

**Source:** [SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "SYSTEM (or BLOCK): Includes each block of rows with a probability of p/100... { REPEATABLE | SEED ( seed ) } Specifies a seed value to make the sampling deterministic... This parameter only applies to SYSTEM and BLOCK sampling."
---
## Q6

**Answer: B, D**

**Explanation:** BERNOULLI and ROW are synonymous (B is correct), and SAMPLE and TABLESAMPLE are synonymous (D is correct). SYSTEM/BLOCK does NOT support fixed-size sampling (A is wrong). SEED only applies to SYSTEM/BLOCK, not BERNOULLI (C is wrong). The maximum for fixed-size sampling is 1,000,000 rows, not 10,000,000 (E is wrong).

**Source:** [SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "The following keywords can be used interchangeably: SAMPLE and TABLESAMPLE, BERNOULLI and ROW, SYSTEM and BLOCK, REPEATABLE and SEED. SYSTEM, BLOCK, and SEED (seed) aren't supported for fixed-size sampling."
---
## Q7

**Answer: B**

**Explanation:** External functions communicate through a proxy service (such as Amazon API Gateway or Azure API Management). They cannot be written as stored procedures — only functions (A is wrong). They use JSON format, not XML (C is wrong). External functions currently cannot be shared via Secure Data Sharing (D is wrong).

**Source:** [Introduction to external functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "Snowflake does not call a remote service directly. Instead, Snowflake calls a proxy service, which relays the data to the remote service... Examples of proxy services include: Amazon API Gateway. Microsoft Azure API Management service."
---
## Q8

**Answer: B, E**

**Explanation:** Only JavaScript and SQL UDFs are sharable via Snowflake Secure Data Sharing. Java, Python, and Scala UDFs are not sharable. This is an important consideration when building UDFs that will be shared with data consumers.

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "Language | Handler Location | Sharable: Java | In-line or staged | No, JavaScript | In-line | Yes, Python | In-line or staged | No, Scala | In-line or staged | No, SQL | In-line | Yes"
---
## Q9

**Answer: B**

**Explanation:** Snowflake streams represent updates as two separate rows: a DELETE row (representing the old value) and an INSERT row (representing the new value), both with METADATA$ISUPDATE = TRUE. There is no METADATA$ACTION value of 'UPDATE' or 'MERGE'.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "METADATA$ISUPDATE: Indicates whether the operation was part of an UPDATE statement. Updates to rows in the source object are represented as a pair of DELETE and INSERT records in the stream with a metadata column METADATA$ISUPDATE values set to TRUE."
---
## Q10

**Answer: C**

**Explanation:** A stream's offset advances only when the stream's change data is consumed in a DML statement (INSERT, MERGE, UPDATE, DELETE, or CTAS) within a committed transaction. Simply querying the stream with SELECT does not advance the offset, even within an explicit transaction.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream advances the offset only when it is used in a DML transaction... Querying a stream alone does not advance its offset, even within an explicit transaction; the stream contents must be consumed in a DML statement."
---
## Q11

**Answer: B, D**

**Explanation:** Only the root task defines the schedule (B is correct). All tasks must have the same owner and be in the same database/schema (D is correct). The maximum is 1000 tasks, not 100 (A is wrong). A finalizer task cannot have child tasks (C is wrong). Child tasks with the same parent run in parallel, not sequentially (E is wrong).

**Source:** [Create a sequence of tasks with a task graph](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "The root task defines when the task graph runs. All tasks in a task graph must have the same task owner and be stored in the same database and schema. A task graph is limited to a maximum of 1000 tasks."
---
## Q12

**Answer: C**

**Explanation:** When a task is created without specifying a WAREHOUSE parameter, it uses the serverless compute model. Snowflake automatically predicts and assigns compute resources based on dynamic analysis of previous task runs. The maximum compute size for serverless tasks is equivalent to an XXLARGE warehouse.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Serverless tasks: Snowflake predicts resources that are needed and assigns them automatically... Use CREATE TASK to define the task. Don't include the WAREHOUSE parameter."
---
## Q13

**Answer: B**

**Explanation:** Snowflake natively supports five semi-structured data formats: JSON, Avro, ORC, Parquet, and XML. CSV is a structured format (not semi-structured). BSON and YAML are not natively supported by Snowflake's COPY commands.

**Source:** [Supported formats for semi-structured data](https://docs.snowflake.com/en/user-guide/semistructured-data-formats)

**Quote:** "Snowflake natively supports the semi-structured data formats below. Specifically, Snowflake provides options in COPY commands to load and unload data files in these formats." [Listed: JSON, Avro, ORC, Parquet, XML]"
---
## Q14

**Answer: C**

**Explanation:** The theoretical maximum size for a VARIANT value is 128 MB of uncompressed data. In practice, the actual maximum may be smaller due to internal overhead and the nature of the object being stored. This limit applies to VARIANT, OBJECT, and ARRAY data types.

**Source:** [Semi-structured data types](https://docs.snowflake.com/en/sql-reference/data-types-semistructured)

**Quote:** "A VARIANT value can have a maximum size of up to 128 MB of uncompressed data. However, in practice, the maximum size is usually smaller because of internal overhead."
---
## Q15

**Answer: B**

**Explanation:** In Snowflake, you use a colon (`:`) to access the first-level element from a VARIANT column, then dot notation (`.`) for subsequent nested levels. So `data:salesperson.name` is the correct syntax. Arrow notation (`->`) is not supported in Snowflake.

**Source:** [Querying Semi-structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "Insert a colon : between the VARIANT column name and any first-level element: <column>:<level1_element>... Use dot notation to traverse a path in a JSON object: <column>:<level1_element>.<level2_element>.<level3_element>"
---
## Q16

**Answer: C**

**Explanation:** When traversing semi-structured data, Snowflake SQL column names follow standard SQL rules and are case-insensitive. However, the element names (keys) within JSON/semi-structured data are case-sensitive, following JSON conventions. For example, `src:salesperson.name` and `SRC:salesperson.name` are equivalent, but `SRC:Salesperson.Name` is different.

**Source:** [Querying Semi-structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "Regardless of which notation you use, the column name is case-insensitive but element names are case-sensitive."
---
## Q17

**Answer: B, C**

**Explanation:** Snowflake's subcolumnarization extracts up to 200 elements per partition into columnar form for performance. However, elements with even a single JSON "null" value (B) and elements with mixed data types across rows (C) are NOT extracted, forcing a full JSON structure scan during queries. String length and key length do not affect extraction.

**Source:** [Considerations for semi-structured data stored in VARIANT](https://docs.snowflake.com/en/user-guide/semistructured-considerations)

**Quote:** "Elements that contain even a single 'null' value are not extracted into a column. Elements that contain multiple data types. For example: The foo element in one row contains a number... The same element in another row contains a string."
---
## Q18

**Answer: B**

**Explanation:** SQL NULL represents a missing or unknown value, while JSON null (VARIANT null) is stored as the string "null" in a VARIANT column and is a true value. They are distinct: SQL NULL is the absence of a value, while JSON null is an explicit value. The IS_NULL_VALUE function can distinguish between them.

**Source:** [Considerations for semi-structured data stored in VARIANT](https://docs.snowflake.com/en/user-guide/semistructured-considerations)

**Quote:** "A VARIANT value can be missing (contain SQL NULL), which is different from a VARIANT null value, which is a real value used to represent a null value in semi-structured data. VARIANT null is a true value that compares as equal to itself."
---
## Q19

**Answer: B**

**Explanation:** The correct syntax to flatten and join semi-structured data is `LATERAL FLATTEN`. While option A (without LATERAL) may also work in Snowflake due to implicit lateral join behavior with table functions, the standard and recommended syntax is `LATERAL FLATTEN(input => column)`. CROSS APPLY is SQL Server syntax, not supported in Snowflake.

**Source:** [Querying Semi-structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "SELECT a.v, b.key, b.value FROM pets a, LATERAL FLATTEN(input => a.v) b WHERE..."
---
## Q20

**Answer: A, C**

**Explanation:** The FLATTEN table function returns the following columns: SEQ (sequence number), KEY (key for OBJECT elements), PATH (path to the element), INDEX (index for ARRAY elements), VALUE (the value of the element), and THIS (the element being flattened). ROW_NUMBER, PARENT, and COLUMN_NAME are not output columns of FLATTEN.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "The FLATTEN function output columns include: SEQ, KEY, PATH, INDEX, VALUE, THIS."
---
## Q21

**Answer: B**

**Explanation:** IS_NULL_VALUE is specifically designed to check for JSON null (VARIANT null) values. The standard IS NULL check tests for SQL NULL (absence of a value), not JSON null. IFNULL and NVL are coalescing functions that replace NULL values but do not help distinguish between the two types of nulls.

**Source:** [Considerations for semi-structured data stored in VARIANT](https://docs.snowflake.com/en/user-guide/semistructured-considerations)

**Quote:** "VARIANT null is a true value that compares as equal to itself... This rule ensures that no information is lost (that is, that the difference between VARIANT 'null' values and SQL NULL values is not lost)."
---
## Q22

**Answer: B**

**Explanation:** When Avro data is loaded into Snowflake, it is read into a single VARIANT column by default. The same applies to ORC data. The data in the VARIANT column can then be queried using the same semi-structured data functions and notation used for JSON data.

**Source:** [Supported formats for semi-structured data](https://docs.snowflake.com/en/user-guide/semistructured-data-formats)

**Quote:** "Snowflake reads Avro data into a single VARIANT column. You can query the data in a VARIANT column just as you would JSON data, using similar commands and functions."
---
## Q23

**Answer: A, C**

**Explanation:** OBJECT_CONSTRUCT explicitly creates an OBJECT value from key-value pairs. PARSE_JSON can also create an OBJECT when provided a JSON object string, as it converts JSON text to a VARIANT value (which will be an OBJECT if the JSON is an object). CREATE_OBJECT, OBJECT_BUILD, and TO_OBJECT are not standard Snowflake functions for this purpose.

**Source:** [Semi-structured data types](https://docs.snowflake.com/en/sql-reference/data-types-semistructured)

**Quote:** "The following example uses the OBJECT_CONSTRUCT function to construct the OBJECT value that it inserts. To insert VARIANT data directly, use INSERT INTO ... SELECT. The following example shows how to insert JSON-formatted data into a VARIANT value: ... SELECT PARSE_JSON('{\"key3\": \"value3\", \"key4\": \"value4\"}');"
---
## Q24

**Answer: B**

**Explanation:** To extract a VARIANT value as a specific data type, use the `::` casting operator. The expression `data:price::NUMBER` extracts the price element from the VARIANT column and casts it to NUMBER for numeric operations. Without casting, values extracted from VARIANT are returned as VARIANT type, which may behave as strings.

**Source:** [Querying Semi-structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "When you extract values from a VARIANT, you can explicitly cast the values to the desired data type. For example, you can extract the prices as numeric values and perform calculations on them: SELECT src:vehicle[0].price::NUMBER * 0.10 AS tax FROM car_sales;"
---
## Q25

**Answer: B**

**Explanation:** A directory table is not a standalone database object — it is an implicit object that exists as a layer on top of a stage. It stores metadata about files (such as file URLs, sizes, and modification timestamps) but not the file data itself. It has no grantable privileges of its own.

**Source:** [Directory tables](https://docs.snowflake.com/en/user-guide/data-load-dirtables)

**Quote:** "A directory table is an implicit object layered on a stage (not a separate database object) and is conceptually similar to an external table because it stores file-level metadata about the data files in the stage."
---
## Q26

**Answer: B**

**Explanation:** BUILD_SCOPED_FILE_URL generates a scoped URL that expires with the query results cache (24 hours). GET_PRESIGNED_URL generates a pre-signed URL with a configurable expiration (default 1 hour). BUILD_STAGE_FILE_URL generates a permanent file URL that does not expire. The question specifies 24-hour expiry, which matches the scoped URL behavior.

**Source:** [BUILD_SCOPED_FILE_URL](https://docs.snowflake.com/en/sql-reference/functions/build_scoped_file_url)

**Quote:** "A scoped URL is encoded and permits access to a specified file for a limited period of time. The scoped URL in the output is valid for the caller until the persisted query result period ends (until the results cache expires). That period is currently 24 hours."
---
## Q27

**Answer: B**

**Explanation:** The default expiration time for GET_PRESIGNED_URL is 3600 seconds (1 hour / 60 minutes). The maximum is 604800 seconds (7 days) for most configurations, or 3600 seconds when using an AWS IAM role.

**Source:** [GET_PRESIGNED_URL](https://docs.snowflake.com/en/sql-reference/functions/get_presigned_url)

**Quote:** "expiration_time: Length of time (in seconds) after which the short term access token expires. Default value: 3600 (60 minutes)."
---
## Q28

**Answer: B, C**

**Explanation:** Scoped URLs are user-specific — only the user who generated the URL can access the file (B is correct). The URL expires when the persisted query result period ends, which is currently 24 hours (C is correct). It is NOT accessible by any user (A is wrong), it does expire (D is wrong), and it does not require an API integration (E is wrong).

**Source:** [Introduction to unstructured data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "Only the user who generates a scoped URL can use the URL to access the referenced file. Expiration period for the query results cache (currently 24 hours)."
---
## Q29

**Answer: C**

**Explanation:** A file URL (generated by BUILD_STAGE_FILE_URL or from a directory table query) is permanent and does not expire. However, accessing a file via a file URL requires authentication and the user's role must have sufficient stage privileges (USAGE for external stages, READ for internal stages). Scoped URLs expire in 24 hours, and pre-signed URLs have configurable expiration.

**Source:** [Introduction to unstructured data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "File URL: URL that identifies the database, schema, stage, and file path to a set of files. A role that has sufficient privileges on the stage can access the files... Permanent URL to a file on a stage."
---
## Q30

**Answer: A, C**

**Explanation:** Snowflake supports processing unstructured data through UDFs/UDTFs with Java or Python handlers (which can read files from stages) and through external functions that call external services. Materialized views on directory tables, standard SQL aggregate functions, and Time Travel on staged files are not features for processing unstructured data.

**Source:** [Introduction to unstructured data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "User-defined Functions and Stored Procedures: Snowflake supports multiple ways to read a file within Java or Python code so that you can process unstructured data. External Functions: External functions are user-defined functions that you store and execute outside of Snowflake. With external functions, you can use libraries such as Amazon Textract, Document AI, or Azure Computer Vision."
---
## Q31

**Answer: B**

**Explanation:** Server-side encryption (SNOWFLAKE_SSE) must be specified when creating an internal stage to enable URL-based access to files. By default, staged files use client-side encryption, which makes files unreadable via pre-signed, file, or scoped URLs. Note that SNOWFLAKE_SSE does not support Tri-Secret Secure; use SNOWFLAKE_FULL for that requirement.

**Source:** [Introduction to unstructured data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "To enable unstructured data access on an internal stage, you can consider using server-side encryption when you create the stage... To configure server-side encryption for an internal stage, specify the SNOWFLAKE_SSE encryption type in the CREATE STAGE command."
---
## Q32

**Answer: B**

**Explanation:** To enable a directory table on an existing stage, use `ALTER STAGE my_stage SET DIRECTORY = (ENABLE = true);`. When creating a new stage, include `DIRECTORY = (ENABLE = true)` in the CREATE STAGE command. Directory tables are not separate database objects and cannot be created independently.

**Source:** [Directory tables](https://docs.snowflake.com/en/user-guide/data-load-dirtables)

**Quote:** "You can add a directory table to a stage when you create a stage (using CREATE STAGE) or later (using ALTER STAGE)."
---
## Q33

**Answer: A, E**

**Explanation:** A standard stream tracks all DML operations — inserts, updates, and deletes (A is correct). A stream stores only an offset (bookmark) for the source object, not actual table data (E is correct). Append-only streams track only row inserts, not updates and deletes (B is wrong). Insert-only streams were historically limited to external tables, but the key distinction is that streams don't store data copies (D is wrong).

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream object records data manipulation language (DML) changes made to tables, including inserts, updates, and deletes, as well as metadata about each change. A stream itself does not contain any table data. A stream only stores an offset for the source object and returns CDC records by leveraging the versioning history for the source object."
---
## Q34

**Answer: C**

**Explanation:** Snowflake limits a single task graph (DAG) to a maximum of 1,000 tasks. Additionally, a single task can have a maximum of 100 parent tasks and 100 child tasks within the graph.

**Source:** [Create a sequence of tasks with a task graph](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "A task graph is limited to a maximum of 1000 tasks."
---
## Q35

**Answer: A, C**

**Explanation:** Directory tables store file-level metadata including the file URL, file size, and last modification timestamp (A and C are correct). Directory tables do not store or provide access to file content (B is wrong), the number of rows within data files (D is wrong), or the schema of files (E is wrong).

**Source:** [Directory tables](https://docs.snowflake.com/en/user-guide/data-load-dirtables)

**Quote:** "A directory table is an implicit object layered on a stage... stores file-level metadata about the data files in the stage. You can query a directory table to retrieve a list of all the files on a stage. The query output contains information about each file, including the size, a timestamp of when it was last modified, and its Snowflake file URL."
---
## Q36

**Answer: C**

**Explanation:** GET_PRESIGNED_URL generates a pre-signed URL that can be accessed by anyone without Snowflake authentication, making it ideal for BI tools and reporting applications. BUILD_SCOPED_FILE_URL creates a user-specific URL. BUILD_STAGE_FILE_URL creates a permanent URL requiring authentication. GET_STAGE_LOCATION returns the stage URL, not a file-specific URL.

**Source:** [Introduction to unstructured data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "Pre-signed URL: Simple HTTPS URL used to access a file via a web browser. A file is temporarily accessible to users via this URL using a pre-signed access token... Ideal for business intelligence applications or reporting tools that need to display the unstructured file contents."
---
## Q37

**Answer: B**

**Explanation:** When a row is updated in the source table, a standard stream records this as two rows: a DELETE (representing the old value) and an INSERT (representing the new value). Both rows have METADATA$ISUPDATE = TRUE, allowing consumers to distinguish update-driven changes from pure inserts and deletes.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Updates to rows in the source object are represented as a pair of DELETE and INSERT records in the stream with a metadata column METADATA$ISUPDATE values set to TRUE."
---
## Q38

**Answer: C**

**Explanation:** Insert-only streams are the only stream type that can be created on external tables. Standard and append-only streams are not supported on external tables. Insert-only streams track new rows added to an external table but do not capture delete operations.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Insert-only: Supported for streams on externally managed Apache Iceberg™ or external tables. An insert-only stream tracks row inserts only; they do not record delete operations that remove rows from an inserted set."
---
## Q39

**Answer: B**

**Explanation:** A stream becomes stale when the historical data it needs (between its current offset and the present) is no longer available because the source table's data retention period has expired. To prevent staleness, streams must be consumed regularly within the source table's data retention period.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream becomes stale when its offset falls outside of the data retention period for its source table (or underlying tables for a source view). In a stale state, historical data and any unconsumed change records for the source table are no longer accessible."
---
## Q40

**Answer: B**

**Explanation:** METADATA$ROW_ID is a system-generated identifier that uniquely and immutably identifies a row across time, enabling consumers to track the history of individual rows through multiple change events. It is not related to user-defined keys, timestamps, or session information.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "METADATA$ROW_ID: Specifies a unique, immutable row ID for tracking changes over time. If CHANGE_TRACKING is disabled and later re-enabled on the stream's source object, the row ID could change."
---
## Q41

**Answer: B**

**Explanation:** Once a stream's offset is advanced by consuming its records in a DML transaction, those records are no longer available. If two pipelines share one stream, whichever pipeline runs first will consume the records and the second pipeline will miss them. Creating two separate streams on the same source table gives each consumer its own independent offset.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "We recommend that users create a separate stream for each consumer of change records for an object... When the change data captured from the latest offset in a stream is consumed using a DML transaction, the stream advances the offset. The change data is no longer available for the next consumer."
---
## Q42

**Answer: B**

**Explanation:** The CHANGES clause allows querying historical CDC metadata for any time range without creating or advancing a stream. It requires specifying a start point using AT | BEFORE and optionally an END clause. This is ideal for ad-hoc investigation of historical changes without disturbing operational stream consumers.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "As an alternative to streams, Snowflake supports querying change tracking metadata for tables or views using the CHANGES clause for SELECT statements. The CHANGES clause enables querying change tracking metadata between two points in time without having to create a stream with an explicit transactional offset. Using the CHANGES clause does not advance the offset."
---
## Q43

**Answer: C**

**Explanation:** Snowflake streams use repeatable read isolation, meaning all queries within a transaction see the same snapshot of stream data. This is distinct from tables, which use read committed isolation. The repeatable read behavior ensures consistent processing within a transaction even if the source table changes during that transaction.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Streams support repeatable read isolation. In repeatable read mode, multiple SQL statements within a transaction see the same set of records in a stream. This differs from the read committed mode supported for tables, in which statements see any changes made by previous statements executed within the same transaction, even though those changes are not yet committed."
---
## Q44

**Answer: B**

**Explanation:** The CRON expression format is `minute hour day-of-month month day-of-week`. For 3:00 AM every Sunday: `0 3 * * SUN`. The time zone is appended directly to the CRON expression string. Options A, C, and D use invalid syntax that Snowflake does not support.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "To define a schedule based on a specific time or day, use the SCHEDULE ='USING CRON…' parameter. The following example creates a task that runs every Sunday at 3 a.m., using the Americas/Los_Angeles time zone: CREATE TASK task_sunday_3_am_pacific_time_zone SCHEDULE='USING CRON 0 3 * * SUN America/Los_Angeles' AS SELECT 1;"
---
## Q45

**Answer: C**

**Explanation:** All newly created tasks start in a SUSPENDED state. This requires the task owner to explicitly run `ALTER TASK my_task RESUME` before the task will follow its schedule. This design prevents accidental execution of tasks that haven't been fully configured or tested.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "When a task is created, it starts as suspended. To allow a task to follow a schedule or detect events continuously, use ALTER TASK … RESUME. To run the task one time, use EXECUTE TASK."
---
## Q46

**Answer: C**

**Explanation:** `EXECUTE TASK my_task` triggers a single immediate run of the task for testing purposes, without affecting the task's schedule. It works regardless of whether the task is in a STARTED or SUSPENDED state. This allows engineers to validate task logic before resuming the regular schedule.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "After you have set up a new task and its parameters using CREATE TASK or ALTER TASK, you can start a single run of the task using EXECUTE TASK. This command is useful for testing new or modified tasks."
---
## Q47

**Answer: C**

**Explanation:** Task versions are set when a task is resumed or manually executed with EXECUTE TASK. Modifying a suspended task does not immediately change the active version. The new definition takes effect only when the task is next resumed (ALTER TASK ... RESUME) or manually run, ensuring version consistency across a task's lifecycle.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "When a standalone task is first resumed or manually run, an initial version of the task is set... After a task is suspended and modified, a new version is set when the standalone task is resumed or manually run."
---
## Q48

**Answer: C**

**Explanation:** When a task includes a `WHEN SYSTEM$STREAM_HAS_DATA(...)` condition and the stream has no data, the WHEN condition evaluates to FALSE and the task skips execution (it no-ops). This saves compute resources by avoiding unnecessary processing when there is nothing to do. The task is not failed or suspended.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "To run tasks whenever a defined stream has new data, use Triggered tasks... This approach is useful for Extract, Load, Transform (ELT) workflows, because it eliminates frequent polling of the source when new data arrival is unpredictable."
---
## Q49

**Answer: B**

**Explanation:** A finalizer task is a special task that runs after all other tasks in the graph have completed, whether they succeeded or failed. This makes it ideal for cleanup operations, sending notifications, or logging pipeline outcomes. A finalizer task cannot have child tasks of its own, and only one finalizer task is allowed per root task.

**Source:** [Create a sequence of tasks with a task graph](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "A finalizer task runs after the root task's task graph has finished running, regardless of whether any of the individual tasks succeeded or failed."
---
## Q50

**Answer: B**

**Explanation:** The `SUSPEND_TASK_AFTER_NUM_FAILURES` parameter prevents runaway compute costs from repeatedly failing tasks. When the number of consecutive failures or timeouts reaches the configured threshold, the task is automatically suspended and no further scheduled runs occur until the task owner resumes it.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "When the parameter is set to a value greater than 0, tasks are automatically suspended after the specified number of consecutive task runs either fail or time out."
---
## Q51

**Answer: B**

**Explanation:** `SYSTEM$TASK_DEPENDENTS_ENABLE('root_task_name')` is a system function that resumes the root task and all dependent child tasks in a task graph in the correct order. This is the recommended approach for activating an entire task graph rather than manually running `ALTER TASK ... RESUME` on each individual task.

**Source:** [Create a sequence of tasks with a task graph](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "Call the SYSTEM$TASK_DEPENDENTS_ENABLE stored procedure to resume the root task and all dependent tasks in the correct order."
---
## Q52

**Answer: A**

**Explanation:** When multiple child tasks each specify `AFTER root_task` in their definition, Snowflake runs all of those child tasks in parallel after the root task completes. Parallelism in task graphs is achieved through the DAG structure — tasks with the same predecessor automatically run concurrently without any additional configuration.

**Source:** [Create a sequence of tasks with a task graph](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "Each child task specifies its predecessor task(s) using the AFTER parameter. Child tasks with the same predecessor are run in parallel."
---
## Q53

**Answer: C**

**Explanation:** To create and run serverless tasks, the role must have the EXECUTE MANAGED TASK privilege at the account level. EXECUTE TASK is required for any task (serverless or user-managed). CREATE TASK is required to create tasks. There is no "MANAGE SERVERLESS" privilege in Snowflake.

**Source:** [Introduction to tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Serverless tasks: Snowflake predicts resources that are needed and assigns them automatically... The role that runs the task must have the global EXECUTE MANAGED TASK privilege."
---
## Q54

**Answer: B**

**Explanation:** Target lag defines the acceptable staleness of data in a dynamic table relative to its base objects. For example, a target lag of 5 minutes means the dynamic table data should be no more than 5 minutes behind the underlying base table. Snowflake uses this parameter to determine how frequently to refresh the dynamic table.

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-intro)

**Quote:** "Use target lag to set how fresh you want your data to be. Usually, the table data freshness won't be more than that far behind the base table data freshness."
---
## Q55

**Answer: B**

**Explanation:** TARGET_LAG defines a data freshness guarantee, not a fixed schedule or processing time limit. The dynamic table will refresh as needed to stay within the specified lag window. It does not guarantee exact interval timing, but rather that the data staleness does not exceed the configured lag.

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-intro)

**Quote:** "For example, a target lag of five minutes ensures that the data in the dynamic table is no more than five minutes behind data updates to the base table."
---
## Q56

**Answer: C**

**Explanation:** Dynamic tables are best when you want to declare what data should look like without manually managing scheduling. If a use case requires fine-grained control over exactly when and how often refreshes happen, or requires complex conditional logic (such as "only refresh if a certain condition is met"), tasks with streams would be more appropriate.

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-intro)

**Quote:** "You don't need fine-grained control over refresh schedules, and you only need to specify a target freshness for the pipeline. Snowflake handles the orchestration of data refreshes, including scheduling and execution, based on your target freshness requirements."
---
## Q57

**Answer: B**

**Explanation:** Dynamic tables use incremental refresh (processing only changed data) when the query is compatible — for example, simple joins and filters. When the query contains operations that cannot be incrementally computed, such as certain aggregations or complex joins, Snowflake falls back to a full refresh. This is determined automatically by Snowflake.

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-intro)

**Quote:** "Dynamic tables use incremental processing for workloads that support it, which can improve performance by processing only changed data instead of recomputing entire tables. Performance depends on your query patterns and data organization."
---
## Q58

**Answer: C**

**Explanation:** Dynamic tables with a 1-hour target lag are ideal for this use case. They automatically handle scheduling and refresh based on when base data changes. A stream + task approach would work but requires more manual orchestration. A materialized view doesn't support complex transformations as flexibly. External functions add unnecessary complexity for in-Snowflake aggregation.

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-intro)

**Quote:** "Dynamic tables are ideal for the following scenarios: You want to avoid manually tracking data dependencies and managing refresh schedules. Dynamic tables enable you to define pipeline outcomes declaratively, without managing transformation steps manually."
---
## Q59

**Answer: B**

**Explanation:** When a stored procedure is created with `EXECUTE AS CALLER`, it runs with the privileges of the user calling the procedure. In contrast, `EXECUTE AS OWNER` (the default) runs the procedure with the privileges of the owner role. Caller's rights procedures are useful when you want to apply the caller's data access restrictions during execution.

**Source:** [Stored procedures overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview)

**Quote:** "Caller's rights: The stored procedure runs with the privileges of the caller. The stored procedure uses the warehouse of the current session."
---
## Q60

**Answer: B**

**Explanation:** The key distinction is that stored procedures can execute DDL (CREATE, DROP, ALTER) and DML (INSERT, UPDATE, DELETE) statements as part of their logic. UDFs can only compute and return a value — they cannot execute SQL statements that modify data or schema. This makes stored procedures suitable for complex, multi-step data workflows.

**Source:** [Stored procedures overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview)

**Quote:** "Unlike UDFs, stored procedures are allowed to run data manipulation language (DML) statements such as SELECT, INSERT, UPDATE, and DELETE. In addition, stored procedures can run data definition language (DDL) statements such as CREATE, ALTER, and DROP."
---
## Q61

**Answer: C**

**Explanation:** Snowflake supports stored procedures written in JavaScript, Python, Java, Scala, and SQL (Snowflake Scripting). All of these languages can execute SQL statements including DDL. The choice of language often depends on developer familiarity, available libraries, and complexity of the logic required.

**Source:** [Stored procedures overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview)

**Quote:** "You can write a stored procedure in any of the following languages: Java, JavaScript, Python, Scala, Snowflake Scripting (an extension of SQL)."
---
## Q62

**Answer: B**

**Explanation:** A scalar UDF (the default UDF type) takes one or more input values from a single row and returns exactly one value. It is applied row-by-row and produces exactly one output row for each input row with a single column value. This distinguishes it from UDTFs (which return multiple rows) and UDAFs (which return one row for a group).

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "User-defined function (UDF): Also known as a scalar function, returns one output row for each input row. The returned row consists of a single column/value."
---
## Q63

**Answer: C**

**Explanation:** A UDAF takes values from multiple rows and returns a single aggregated result, similar to built-in aggregate functions like SUM, COUNT, or AVG. Scalar UDFs operate row-by-row, UDTFs return multiple rows per input, and vectorized UDFs process batches via Pandas but do not inherently aggregate across rows.

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "User-defined aggregate function (UDAF): Operates on values across multiple rows to perform mathematical calculations such as sum, average, counting, finding minimum or maximum values, standard deviation, and estimation, as well as some non-mathematical operations."
---
## Q64

**Answer: B**

**Explanation:** A UDTF returns a set of rows (a table) for each input row, making it ideal for operations that need to expand a single input into multiple output rows (such as parsing a delimited string into individual values, or generating a time series). A scalar UDF always returns exactly one value per input row.

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "User-defined table function (UDTF): Returns a tabular value for each input row."
---
## Q65

**Answer: B**

**Explanation:** Vectorized UDFs receive batches of input rows as Pandas DataFrames instead of processing one row at a time. This enables more efficient use of Python's vectorized libraries (such as NumPy and pandas) and reduces per-row overhead compared to standard Python UDFs. The return type is a Pandas array or Series.

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "Vectorized user-defined function (UDF): Receive batches of input rows as Pandas DataFrames and return batches of results as Pandas arrays or Series."
---
## Q66

**Answer: B**

**Explanation:** An API integration is a named Snowflake object that stores the configuration and authentication details for communicating with an external REST API proxy (such as Amazon API Gateway or Azure API Management). It must be created before the external function and is referenced in the CREATE EXTERNAL FUNCTION statement to authorize Snowflake to call the external service.

**Source:** [Introduction to external functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "Snowflake does not call a remote service directly. Instead, Snowflake calls a proxy service, which relays the data to the remote service... Examples of proxy services include: Amazon API Gateway. Microsoft Azure API Management service."
---
## Q67

**Answer: D**

**Explanation:** External functions in Snowflake require that the remote service return data in JSON format. The JSON response is then parsed by Snowflake and returned to the caller. This JSON requirement applies regardless of the input format or what the remote service does internally. XML, CSV, and Parquet are not valid return formats.

**Source:** [Introduction to external functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "Snowflake does not call a remote service directly. Instead, Snowflake calls a proxy service, which relays the data to the remote service... The remote service must return data to Snowflake via the proxy service in JSON format."
---
## Q68

**Answer: B**

**Explanation:** In Snowpark, building a DataFrame (e.g., via filter, select, join) does not immediately execute any SQL. The DataFrame is a logical plan that is submitted to Snowflake only when an action is called (such as `collect()`, `show()`, or `write()`). This lazy execution allows Snowpark to optimize the entire pipeline into a single efficient query.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Snowpark operations are executed lazily on the server, meaning that you can use the library to delay running data transformation until as late in the pipeline as possible while batching up many operations into a single operation. This reduces the amount of data transferred between your client and the Snowflake database."
---
## Q69

**Answer: C**

**Explanation:** In Snowpark for Python (and Java/Scala), the Session object is the entry point for all operations. It represents the connection to Snowflake and is used to create DataFrames, execute SQL, and register UDFs. The Session is analogous to a Snowflake connection but provides the Snowpark API surface.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "In your client code, you construct a DataFrame object and set it up to retrieve the data that you want to use... The core abstraction in Snowpark is the DataFrame, which represents a set of data and provides methods to operate on that data."
---
## Q70

**Answer: C**

**Explanation:** Due to lazy evaluation, no SQL is sent to Snowflake when you call `session.table()`, `filter()`, or `select()`. These calls build a logical execution plan. The SQL is only compiled and executed when you call an action like `collect()` (returns rows as a list) or `show()` (prints rows). This design batches all operations into a single optimized query.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "The data isn't retrieved when you construct the DataFrame object. Instead, when you are ready to retrieve the data, you can perform an action that evaluates the DataFrame objects and sends the corresponding SQL statements to the Snowflake database for execution."
---
## Q71

**Answer: B**

**Explanation:** RANK() assigns the same rank to tied rows but then skips ranks equal to the number of ties. For example, if two rows tie for rank 1, the next rank is 3 (not 2). This creates gaps in the ranking sequence. Use DENSE_RANK() to avoid gaps.

**Source:** [Window functions](https://docs.snowflake.com/en/user-guide/functions-window-using)

**Quote:** "RANK: Returns the rank of a value within an ordered group of values. The rank value starts at 1 and continues up. If two rows are tied with the same rank, subsequent rankings skip the number of tied rows."
---
## Q72

**Answer: C**

**Explanation:** LAG() accesses the value of a column from a previous row (by default, the immediately preceding row) within the same window partition, ordered by the ORDER BY clause. The optional second argument specifies the offset (number of rows back). This is commonly used to calculate period-over-period differences without self-joins.

**Source:** [Window functions](https://docs.snowflake.com/en/user-guide/functions-window-using)

**Quote:** "LAG: Accesses data from a previous row in the same result set without the need for a self-join."
---
## Q73

**Answer: B**

**Explanation:** `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)` assigns a unique sequential number (1, 2, 3...) to each row within each customer's partition, ordered from the most recent order to the oldest. Unlike RANK or DENSE_RANK, ROW_NUMBER never assigns the same number to two rows, even if they have the same ORDER BY value.

**Source:** [Window functions](https://docs.snowflake.com/en/user-guide/functions-window-using)

**Quote:** "ROW_NUMBER: Returns a unique row number for each row within a window partition."
---
## Q74

**Answer: A**

**Explanation:** Both RANK() and DENSE_RANK() assign the same rank to tied rows. The difference is what happens after a tie: RANK() skips the next rank(s) creating a gap (e.g., 1, 1, 3), while DENSE_RANK() assigns the next consecutive integer with no gap (e.g., 1, 1, 2). DENSE_RANK is preferred when you want a complete contiguous sequence.

**Source:** [Window functions](https://docs.snowflake.com/en/user-guide/functions-window-using)

**Quote:** "DENSE_RANK: Returns the rank of a value within an ordered group of values, with no gaps in the ranking values. If two rows are tied, they are given the same rank. The next row receives the next consecutive ranking value."
---
## Q75

**Answer: B, D**

**Explanation:** The Snowpark API is available for Java, Python, and Scala. R, Go, and Ruby are not supported by the Snowpark API. These three supported languages can be used to build data engineering pipelines, train ML models, and register UDFs/stored procedures within Snowflake.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Snowflake currently provides Snowpark libraries for three languages: Java, Python, and Scala."
---
## Q76

**Answer: B, C**

**Explanation:** Snowpark's two key performance advantages over traditional connectors are: (1) all computation is pushed down to Snowflake — no data is moved to the client for processing, and (2) operations are lazily evaluated, meaning multiple transformations are batched into a single optimized SQL query. Snowpark supports three languages (Java, Python, Scala) and does not require an external cluster.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Support for pushdown for all operations, including Snowflake UDFs. This means Snowpark pushes down all data transformation and heavy lifting to the Snowflake data cloud, enabling you to efficiently work with data of any size. Snowpark operations are executed lazily on the server, meaning that you can use the library to delay running data transformation until as late in the pipeline as possible while batching up many operations into a single operation. This reduces the amount of data transferred between your client and the Snowflake database."
---
## Q77

**Answer: B, D**

**Explanation:** Snowflake supports three stream types: Standard, Append-only, and Insert-only. "Merge-only," "Delete-only," and "Upsert" are not valid Snowflake stream types. Standard streams are the most comprehensive, tracking all DML. Append-only streams are more performant for insert-only ELT scenarios.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Standard: A standard (i.e. delta) stream tracks all DML changes to the source object, including inserts, updates, and deletes. Append-only: An append-only stream exclusively tracks row inserts. Update, delete, and truncate operations are not captured by append-only streams."
---
## Q78

**Answer: A, C**

**Explanation:** Two important constraints for task graphs: (1) all tasks must share the same owner and reside in the same database and schema; (2) a task can have at most 100 parent tasks. Child tasks with the same predecessor run in parallel (not sequentially). The root task's schedule controls when the graph runs. A finalizer task runs regardless of success or failure — not only on success.

**Source:** [Create a sequence of tasks with a task graph](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "A task graph is limited to a maximum of 1000 tasks. All tasks in a task graph must have the same task owner and be stored in the same database and schema."
---
## Q79

**Answer: C, E**

**Explanation:** Only JavaScript and SQL UDFs can be shared via Snowflake Secure Data Sharing. Java, Python, and Scala UDFs are not sharable. This is a key constraint when building data products intended for sharing with consumers via Snowflake Data Sharing.

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "Language | Handler Location | Sharable: Java | In-line or staged | No, JavaScript | In-line | Yes, Python | In-line or staged | No, Scala | In-line or staged | No, SQL | In-line | Yes"
---
## Q80

**Answer: C, E**

**Explanation:** Snowflake stored procedures can be written in JavaScript, Python, Java, Scala, and Snowflake Scripting (SQL). R, Go, and Ruby are not supported handler languages for stored procedures. Snowflake Scripting (C) and Java (E) are both valid choices from the options presented.

**Source:** [Stored procedures overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview)

**Quote:** "You can write a stored procedure in any of the following languages: Java, JavaScript, Python, Scala, Snowflake Scripting (an extension of SQL)."
---
## Q81

**Answer: A, D**

**Explanation:** The FLATTEN table function produces six output columns: SEQ (a sequence number for the input document), KEY (the key for OBJECT elements), PATH (the path to the flattened element), INDEX (array index for ARRAY elements), VALUE (the element's value), and THIS (the element being flattened). PARENT, COLUMN_NAME, and HASH are not FLATTEN output columns.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "The output columns from FLATTEN include: SEQ, KEY, PATH, INDEX, VALUE, THIS."
---
## Q82

**Answer: B, D**

**Explanation:** `ARRAY_CONSTRUCT` explicitly builds an ARRAY from listed values. `PARSE_JSON` converts a JSON string into a VARIANT — when the JSON string is an array (e.g., `'[1, 2, 3]'`), the resulting VARIANT is an ARRAY. `ARRAY_BUILD`, `ARRAY_MAKE`, and `CREATE_ARRAY` are not valid Snowflake functions.

**Source:** [Semi-structured data types](https://docs.snowflake.com/en/sql-reference/data-types-semistructured)

**Quote:** "ARRAY_CONSTRUCT: Constructs an ARRAY from zero or more inputs. PARSE_JSON converts JSON string to VARIANT." (With array input, it creates an ARRAY value.)"
---
## Q83

**Answer: B, C**

**Explanation:** Two valid syntaxes for accessing a key in a VARIANT column are colon notation (`data:sales`) and bracket notation (`data['sales']`). Both support casting with `::INT`. Dot notation requires colon for the first level (e.g., `data:sales`). Arrow notation (`->`) is not Snowflake SQL syntax.

**Source:** [Querying Semi-structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "Insert a colon : between the VARIANT column name and any first-level element: <column>:<level1_element> Use bracket notation to access an element in an object. You can use a case-sensitive string constant in the brackets... For example: src['SalePerson']"
---
## Q84

**Answer: B, C**

**Explanation:** Snowflake sequences guarantee uniqueness but not strict consecutiveness — gaps can occur due to concurrent transactions or failed operations. Sequences can be used as column defaults (including with AUTOINCREMENT/IDENTITY syntax, which creates an implicit sequence). Sequences can be referenced in any DML statement and are not limited to single-primary-key tables.

**Source:** [Sequences](https://docs.snowflake.com/en/sql-reference/sql/create-sequence)

**Quote:** "A sequence generates unique values, but the values may not be strictly consecutive or gap-free. Sequences can be used as a default value for a column."
---
## Q85

**Answer: B, C**

**Explanation:** CTEs defined with the WITH clause can be referenced multiple times in the same query (B is correct). Snowflake supports recursive CTEs using `WITH RECURSIVE` (C is correct). CTEs are not automatically materialized as temporary tables (A is wrong). CTEs can be used in DML operations like INSERT and UPDATE, not just SELECT (D is wrong). An ORDER BY is not required (E is wrong).

**Source:** [Common Table Expressions](https://docs.snowflake.com/en/sql-reference/constructs/with)

**Quote:** "With clause (Common Table Expression): Specifies a temporary named result set created from a simple query and defined within the execution scope of a SELECT, INSERT, UPDATE, or DELETE statement. Snowflake supports recursive CTEs using the WITH RECURSIVE syntax."
---
## Q86

**Answer: B, C**

**Explanation:** Dynamic tables automatically manage refresh schedules based on target lag (B is correct). They can be chained to create multi-step pipelines where one dynamic table is the base object for another (C is correct). Sub-second latency is not a current dynamic table feature (A is wrong). Dynamic tables can use serverless compute (D is wrong). Schema can be altered (E is wrong).

**Source:** [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-intro)

**Quote:** "Dynamic tables are tables that automatically refresh based on a defined query and target freshness, simplifying data transformation and pipeline management without requiring manual updates or custom scheduling. You want to chain together multiple tables for data transformations in a pipeline."
---
## Q87

**Answer: B, D, E**

**Explanation:** The three metadata columns that Snowflake automatically adds to stream query results are METADATA$ACTION (INSERT or DELETE), METADATA$ISUPDATE (TRUE/FALSE indicating whether the change was part of an UPDATE), and METADATA$ROW_ID (a unique immutable row identifier). METADATA$TIMESTAMP and METADATA$USER are not stream metadata columns.

**Source:** [Introduction to streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "When queried, a stream accesses and returns the historic data in the same shape as the source object (i.e. the same column names and ordering) with the following additional columns: METADATA$ACTION... METADATA$ISUPDATE... METADATA$ROW_ID"
---
## Q88

**Answer: A, C, E**

**Explanation:** Snowflake's UDF system supports: Scalar UDFs (one output row per input row), UDTFs (tabular output per input row), UDAFs (aggregate output across multiple rows), Vectorized UDFs (batch processing via Pandas), and Vectorized UDTFs. "User-Defined Transform Function" and "User-Defined Merge Function" are not Snowflake UDF types.

**Source:** [User-defined functions overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "User-defined function (UDF): Also known as a scalar function, returns one output row for each input row. User-defined aggregate function (UDAF): Operates on values across multiple rows to perform mathematical calculations. User-defined table function (UDTF): Returns a tabular value for each input row."
---
## Q89

**Answer: A, B, D**

**Explanation:** Snowpark DataFrames support transformation methods including `filter()` (row-level filtering), `groupBy()` (grouping for aggregation), and `join()` (combining two DataFrames). `execute()` is not a DataFrame method — actions like `collect()` or `show()` trigger execution. `export()` is not a Snowpark method; `write.save_as_table()` or `copy_into_location()` are used for writing data.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "In your client code, you construct a DataFrame object and set it up to retrieve the data that you want to use (for example, the columns containing the data, the filter to apply to rows, etc.)."
---
## Q90

**Answer: A, B, D**

**Explanation:** PIVOT rotates rows into columns producing a cross-tabulation (A), requiring specification of the pivot column, aggregate function, and values to become columns (B). UNPIVOT is the reverse — it transforms columns back into rows (D). PIVOT and UNPIVOT produce opposite results, not identical ones (C is wrong). PIVOT can be used in both top-level queries and subqueries (E is wrong).

**Source:** [PIVOT](https://docs.snowflake.com/en/sql-reference/constructs/pivot)

**Quote:** "Rotates a table by transforming the unique values from one column in the input expression into multiple columns and aggregating results where required on any remaining column values. UNPIVOT: Rotates a table by transforming columns into rows."
