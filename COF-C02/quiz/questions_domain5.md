## Q1 (Single Answer)
A data engineer needs to estimate the number of distinct IP addresses visiting a website each day. The table contains billions of rows, and an approximate result with a few percent error is acceptable. Which function should they use for the best performance?

- A) COUNT(DISTINCT ip_address)
- B) HLL(ip_address)
- C) APPROX_TOP_K(ip_address)
- D) APPROX_PERCENTILE(ip_address, 0.5)
---
## Q2 (Single Answer)
What is the average relative error of Snowflake's HyperLogLog (HLL) implementation?

- A) 0.01%
- B) 0.5%
- C) 1.62%
- D) 5%
---
## Q3 (Single Answer)
A data analyst wants to find the most frequently occurring product categories in a large sales table. Which estimation function family should they use?

- A) HLL
- B) APPROX_PERCENTILE
- C) APPROX_TOP_K
- D) APPROX_COUNT_DISTINCT
---
## Q4 (Single Answer)
Which algorithm does Snowflake use for the APPROX_PERCENTILE function?

- A) HyperLogLog
- B) Space-Saving
- C) t-Digest
- D) Count-Min Sketch
---
## Q5 (Single Answer)
A user wants to randomly sample 10% of a large table using block-level sampling with a seed of 42 for reproducibility. Which query is correct?

- A) `SELECT * FROM my_table SAMPLE BERNOULLI (10) SEED (42);`
- B) `SELECT * FROM my_table SAMPLE SYSTEM (10) SEED (42);`
- C) `SELECT * FROM my_table SAMPLE ROW (10) REPEATABLE (42);`
- D) `SELECT * FROM my_table SAMPLE (10 ROWS) SEED (42);`
---
## Q6 (Multi Answer - Select 2)
Which statements about Snowflake's SAMPLE / TABLESAMPLE command are TRUE?

- A) SYSTEM sampling supports fixed-size sampling (e.g., 10 ROWS)
- B) BERNOULLI and ROW are synonymous keywords
- C) The SEED parameter applies to both BERNOULLI and SYSTEM sampling methods
- D) SAMPLE and TABLESAMPLE are synonymous keywords
- E) Fixed-size sampling supports a maximum of 10,000,000 rows
---
## Q7 (Single Answer)
An external function in Snowflake calls code that executes outside of Snowflake. Which statement about external functions is TRUE?

- A) External functions can be written as stored procedures
- B) External functions communicate through a proxy service such as Amazon API Gateway
- C) External functions return data in XML format
- D) External functions can be shared via Secure Data Sharing
---
## Q8 (Multi Answer - Select 2)
Which UDF handler languages produce UDFs that are sharable via Snowflake Secure Data Sharing?

- A) Java
- B) JavaScript
- C) Python
- D) Scala
- E) SQL
---
## Q9 (Single Answer)
A stream in Snowflake records an UPDATE operation on a source table row. How is this change represented in the stream?

- A) A single row with METADATA$ACTION = 'UPDATE'
- B) A pair of DELETE and INSERT rows with METADATA$ISUPDATE = TRUE
- C) A single row with METADATA$ACTION = 'INSERT' and METADATA$ISUPDATE = TRUE
- D) A single row with METADATA$ACTION = 'MERGE'
---
## Q10 (Single Answer)
Which action causes a stream's offset to advance?

- A) Querying the stream with a SELECT statement
- B) Querying the stream within an explicit transaction without DML
- C) Consuming the stream data in a DML statement within a committed transaction
- D) Creating a view that references the stream
---
## Q11 (Multi Answer - Select 2)
Which statements about Snowflake task graphs (DAGs) are TRUE?

- A) A task graph can contain a maximum of 100 tasks
- B) The root task is the only task that can have a schedule defined
- C) A finalizer task can have child tasks of its own
- D) All tasks in a task graph must have the same owner and be in the same database and schema
- E) When multiple child tasks share the same parent, they run sequentially
---
## Q12 (Single Answer)
A data engineer creates a task using `CREATE TASK my_task SCHEDULE = '60 MINUTES' AS SELECT 1;` without specifying a WAREHOUSE parameter. What compute model will this task use?

- A) It will fail because no warehouse is specified
- B) It will use the default warehouse assigned to the user
- C) It will use the serverless compute model managed by Snowflake
- D) It will use the current session warehouse
---
## Q13 (Single Answer)
Which semi-structured data formats does Snowflake natively support for loading data?

- A) JSON, Avro, ORC, Parquet, CSV
- B) JSON, Avro, ORC, Parquet, XML
- C) JSON, BSON, ORC, Parquet, XML
- D) JSON, Avro, Parquet, XML, YAML
---
## Q14 (Single Answer)
What is the maximum uncompressed size of a single VARIANT value in Snowflake?

- A) 16 MB
- B) 64 MB
- C) 128 MB
- D) 256 MB
---
## Q15 (Single Answer)
A table has a VARIANT column named `data` containing JSON. Which query correctly retrieves the value of the `name` key within a nested `salesperson` object?

- A) `SELECT data.salesperson.name FROM my_table;`
- B) `SELECT data:salesperson.name FROM my_table;`
- C) `SELECT data->salesperson->name FROM my_table;`
- D) `SELECT data.salesperson:name FROM my_table;`
---
## Q16 (Single Answer)
When traversing semi-structured data in a VARIANT column using dot and colon notation, which statement about case sensitivity is correct?

- A) Both column names and element names are case-sensitive
- B) Both column names and element names are case-insensitive
- C) Column names are case-insensitive but element names are case-sensitive
- D) Column names are case-sensitive but element names are case-insensitive
---
## Q17 (Multi Answer - Select 2)
Which characteristics of semi-structured data elements stored in a VARIANT column prevent Snowflake from extracting them into a columnar form (subcolumnarization)?

- A) Elements that contain string values longer than 256 characters
- B) Elements that contain even a single JSON "null" value
- C) Elements that contain values of multiple data types across rows
- D) Elements that contain nested arrays
- E) Elements that have keys longer than 64 characters
---
## Q18 (Single Answer)
What is the difference between SQL NULL and JSON null (VARIANT null) in Snowflake?

- A) They are identical and can be used interchangeably
- B) SQL NULL means the value is missing; JSON null is stored as the string "null" in a VARIANT and is a real value that compares as equal to itself
- C) JSON null means the value is missing; SQL NULL is stored as the string "null"
- D) SQL NULL is only used for structured data; JSON null is only used for semi-structured data
---
## Q19 (Single Answer)
A data engineer needs to flatten an array stored in a VARIANT column and join the flattened rows with the original table. Which syntax is correct?

- A) `SELECT t.id, f.value FROM my_table t, FLATTEN(input => t.data:items) f;`
- B) `SELECT t.id, f.value FROM my_table t, LATERAL FLATTEN(input => t.data:items) f;`
- C) `SELECT t.id, f.value FROM my_table t JOIN FLATTEN(t.data:items) f;`
- D) `SELECT t.id, f.value FROM my_table t CROSS APPLY FLATTEN(input => t.data:items) f;`
---
## Q20 (Multi Answer - Select 2)
Which columns are included in the output of the FLATTEN table function?

- A) SEQ
- B) ROW_NUMBER
- C) VALUE
- D) PARENT
- E) COLUMN_NAME
---
## Q21 (Single Answer)
Which function should you use to check if a VARIANT value contains a JSON null (as opposed to a SQL NULL)?

- A) IS NULL
- B) IS_NULL_VALUE
- C) IFNULL
- D) NVL
---
## Q22 (Single Answer)
When loading Avro data into Snowflake, how is the data stored by default?

- A) Each Avro field is mapped to a separate relational column
- B) The data is stored as a single VARIANT column
- C) The data is stored in a separate Avro-optimized storage format
- D) Each Avro record is stored as a separate row in a VARCHAR column
---
## Q23 (Multi Answer - Select 2)
Which functions can be used to create an OBJECT value in Snowflake?

- A) OBJECT_CONSTRUCT
- B) CREATE_OBJECT
- C) PARSE_JSON (with a JSON object string)
- D) OBJECT_BUILD
- E) TO_OBJECT
---
## Q24 (Single Answer)
A VARIANT column stores `{"price": "29.99"}` where the price is stored as a string. Which expression correctly extracts the price as a numeric value for calculations?

- A) `SELECT data:price FROM my_table;`
- B) `SELECT data:price::NUMBER FROM my_table;`
- C) `SELECT CAST(data:price) FROM my_table;`
- D) `SELECT NUMBER(data:price) FROM my_table;`
---
## Q25 (Single Answer)
What is a directory table in Snowflake?

- A) A standalone database object that stores unstructured file data
- B) An implicit object layered on a stage that stores file-level metadata
- C) A special table type that stores file paths in a relational format
- D) An external table that points to files in cloud storage
---
## Q26 (Single Answer)
A data engineer wants to generate a URL that provides temporary access to a staged file, and the URL should expire in 24 hours. Which function should they use?

- A) GET_PRESIGNED_URL
- B) BUILD_SCOPED_FILE_URL
- C) BUILD_STAGE_FILE_URL
- D) GET_STAGE_LOCATION
---
## Q27 (Single Answer)
What is the default expiration time for a pre-signed URL generated by GET_PRESIGNED_URL?

- A) 60 seconds
- B) 3600 seconds (1 hour)
- C) 86400 seconds (24 hours)
- D) 604800 seconds (7 days)
---
## Q28 (Multi Answer - Select 2)
Which statements about a scoped URL generated by BUILD_SCOPED_FILE_URL are TRUE?

- A) The URL can be accessed by any user who has the URL
- B) Only the user who generated the scoped URL can use it to access the file
- C) The URL expires when the persisted query result period ends (currently 24 hours)
- D) The URL never expires
- E) The URL requires an API integration to function
---
## Q29 (Single Answer)
Which type of URL generated by Snowflake file functions does NOT expire and requires authentication plus stage privileges to access files?

- A) Scoped URL
- B) Pre-signed URL
- C) File URL
- D) Temporary URL
---
## Q30 (Multi Answer - Select 2)
Which features can be used to process unstructured data in Snowflake?

- A) User-defined functions (UDFs) with Java or Python handlers
- B) Materialized views on directory tables
- C) External functions that call external services like Amazon Textract
- D) Standard SQL aggregate functions
- E) Snowflake Time Travel on staged files
---
## Q31 (Single Answer)
To enable URL-based access to files stored on an internal stage, which encryption type must be specified when creating the stage?

- A) SNOWFLAKE_FULL
- B) SNOWFLAKE_SSE
- C) AES_256
- D) CLIENT_SIDE
---
## Q32 (Single Answer)
How do you enable a directory table on an existing stage?

- A) `CREATE DIRECTORY TABLE ON STAGE @my_stage;`
- B) `ALTER STAGE my_stage SET DIRECTORY = (ENABLE = true);`
- C) `ALTER TABLE DIRECTORY(@my_stage) ENABLE;`
- D) `CREATE OR REPLACE STAGE my_stage WITH DIRECTORY;`
---
## Q33 (Multi Answer - Select 2)
Which statements about Snowflake streams are TRUE?

- A) A standard stream tracks inserts, updates, and deletes on a source table
- B) An append-only stream tracks inserts, updates, and deletes but excludes truncate operations
- C) An insert-only stream type can only be created on external tables
- D) Streams store a copy of all changed rows from the source table
- E) A stream stores an offset for the source object and not any actual table data
---
## Q34 (Single Answer)
What is the maximum number of tasks allowed in a single task graph in Snowflake?

- A) 100
- B) 500
- C) 1,000
- D) 10,000
---
## Q35 (Multi Answer - Select 2)
A user queries a directory table on an internal stage. Which pieces of information are available from the directory table?

- A) File URL for each staged file
- B) The content of each file
- C) The size of each file
- D) The number of rows in each data file
- E) The schema of each data file
---
## Q36 (Single Answer)
Which function should a data engineer use to generate a pre-signed URL that can be accessed by anyone without Snowflake authentication, ideal for displaying images in a BI reporting tool?

- A) BUILD_SCOPED_FILE_URL
- B) BUILD_STAGE_FILE_URL
- C) GET_PRESIGNED_URL
- D) GET_STAGE_LOCATION
---
## Q37 (Single Answer)
A data engineer creates a standard stream on a table. After running several UPDATE statements on the source table, the engineer queries the stream and sees both DELETE and INSERT rows for each update. What is the value of METADATA$ISUPDATE for these rows?

- A) FALSE for DELETE rows, TRUE for INSERT rows
- B) TRUE for both the DELETE and INSERT rows that represent the update
- C) TRUE for the DELETE row only
- D) Null; METADATA$ISUPDATE is only set on standard streams
---
## Q38 (Single Answer)
A data engineer needs to create a stream on an external table in Snowflake. Which stream type must they use?

- A) Standard stream
- B) Append-only stream
- C) Insert-only stream
- D) External stream
---
## Q39 (Single Answer)
A stream becomes stale in Snowflake. What causes a stream to become stale?

- A) The stream is queried but not consumed in a DML transaction
- B) The stream's offset falls outside of the data retention period of the source table
- C) The stream has too many unconsumed change records
- D) The stream's source table has been reclustered
---
## Q40 (Single Answer)
What is the purpose of the METADATA$ROW_ID column in a Snowflake stream?

- A) It stores the timestamp of when each row change was recorded
- B) It specifies a unique, immutable row ID for tracking changes over time
- C) It identifies the user session that caused the change
- D) It stores the row's primary key value from the source table
---
## Q41 (Single Answer)
A data engineering team needs two separate pipelines, both consuming change records from the same source table. What is the recommended approach?

- A) Create a single stream and use two tasks that read from it concurrently
- B) Create two separate streams on the same source table, one for each consumer
- C) Use the CHANGES clause instead of streams for both consumers
- D) Clone the source table and create one stream on each clone
---
## Q42 (Single Answer)
A developer needs to query CDC records between two historical points in time without advancing any stream offset. Which Snowflake feature should they use?

- A) Time Travel with AT/BEFORE clauses
- B) The CHANGES clause for SELECT statements
- C) A standard stream with explicit transaction control
- D) An append-only stream with a LIMIT clause
---
## Q43 (Single Answer)
Which statement correctly describes the isolation level supported by Snowflake streams?

- A) Read committed: each statement sees the latest committed changes
- B) Serializable: all transactions are ordered as if executed sequentially
- C) Repeatable read: multiple SQL statements within a transaction see the same set of records in a stream
- D) Read uncommitted: changes are visible before a transaction commits
---
## Q44 (Single Answer)
A data engineer wants to create a task that runs every Sunday at 3:00 AM in the America/Los_Angeles time zone. Which SCHEDULE parameter is correct?

- A) `SCHEDULE = 'WEEKLY SUNDAY 03:00 America/Los_Angeles'`
- B) `SCHEDULE = 'USING CRON 0 3 * * SUN America/Los_Angeles'`
- C) `SCHEDULE = 'EVERY SUNDAY AT 03:00 TZ=America/Los_Angeles'`
- D) `SCHEDULE = 'CRON(0 3 * * 0) America/Los_Angeles'`
---
## Q45 (Single Answer)
A data engineer creates a new task using CREATE TASK. What is the initial state of the task?

- A) STARTED — the task begins running immediately
- B) RUNNING — Snowflake queues the first scheduled run
- C) SUSPENDED — the task must be explicitly resumed with ALTER TASK ... RESUME
- D) PENDING — the task waits for the next scheduled time
---
## Q46 (Single Answer)
A data engineer wants to test a newly created task without waiting for its scheduled run time. Which command is used?

- A) `ALTER TASK my_task SET TEST = TRUE;`
- B) `RUN TASK my_task;`
- C) `EXECUTE TASK my_task;`
- D) `START TASK my_task;`
---
## Q47 (Single Answer)
A task is currently suspended. The task's owner modifies the SQL statement in the task definition. When does the modified task definition take effect?

- A) Immediately after ALTER TASK is committed
- B) At the next scheduled run time, even while still suspended
- C) When the task is resumed or manually run with EXECUTE TASK
- D) After the task is dropped and recreated
---
## Q48 (Single Answer)
A task is configured with `WHEN SYSTEM$STREAM_HAS_DATA('orders_stream')` in its definition, along with a fixed SCHEDULE of 1 hour. What happens when the stream has no new data at the scheduled run time?

- A) The task fails with an error
- B) The task runs but processes no rows
- C) The task skips execution (no-ops) because the WHEN condition evaluates to FALSE
- D) The task is automatically suspended after one skipped run
---
## Q49 (Single Answer)
A data engineer creates a finalizer task in a task graph. Which statement about finalizer tasks is TRUE?

- A) A finalizer task runs only if all other tasks in the graph succeed
- B) A finalizer task runs after all tasks in the graph complete, regardless of success or failure
- C) A finalizer task can have child tasks of its own
- D) Multiple finalizer tasks can be assigned to a single root task
---
## Q50 (Single Answer)
A task is configured with `SUSPEND_TASK_AFTER_NUM_FAILURES = 3`. After 3 consecutive failed runs, what happens?

- A) The task sends an error notification and retries indefinitely
- B) The task is automatically suspended and no further runs are scheduled
- C) The task's schedule is doubled to reduce failures
- D) The task switches to manual execution mode only
---
## Q51 (Single Answer)
A data engineer creates a task graph with a root task and 10 child tasks. All tasks are created in a SUSPENDED state. Which stored procedure/function can be used to resume all tasks in the graph at once?

- A) `SYSTEM$TASK_RESUME_ALL('root_task_name')`
- B) `SYSTEM$TASK_DEPENDENTS_ENABLE('root_task_name')`
- C) `ALTER TASK root_task RESUME CASCADE`
- D) `EXECUTE TASK root_task WITH DEPENDENTS`
---
## Q52 (Single Answer)
A data engineer is designing a task graph where multiple child tasks should run in parallel after the root task completes. How is this configured in Snowflake?

- A) All child tasks specify `AFTER root_task` in their definition — they run in parallel automatically
- B) Set `PARALLEL = TRUE` on the root task
- C) Set `CONCURRENT = TRUE` on each child task
- D) Use a loop in a stored procedure called by the root task
---
## Q53 (Single Answer)
What privilege is required at the account level to create and run serverless tasks?

- A) CREATE TASK
- B) EXECUTE TASK
- C) EXECUTE MANAGED TASK
- D) MANAGE SERVERLESS
---
## Q54 (Single Answer)
What is the "target lag" of a dynamic table?

- A) The maximum time allowed for a manual refresh operation to complete
- B) The maximum amount of time the dynamic table's content should lag behind updates to the base objects
- C) The minimum interval between automatic refresh operations
- D) The time delay before a failed refresh is retried
---
## Q55 (Single Answer)
A dynamic table is created with `TARGET_LAG = '5 minutes'`. The base table receives an update. What does this setting guarantee?

- A) The dynamic table refreshes exactly every 5 minutes on the clock
- B) The dynamic table data is no more than 5 minutes behind the base table data
- C) The dynamic table refresh takes no longer than 5 minutes to complete
- D) The dynamic table will not refresh more than once every 5 minutes
---
## Q56 (Single Answer)
Which scenario is a dynamic table LEAST well-suited for?

- A) Materializing the results of a complex SQL transformation
- B) Chaining multiple transformation steps in a pipeline
- C) Scenarios requiring fine-grained control over refresh schedules and complex conditional logic
- D) Implementing slowly changing dimensions (SCDs) using window functions
---
## Q57 (Single Answer)
A dynamic table uses incremental refresh by default when possible. When would Snowflake perform a full refresh instead?

- A) When the target lag is set to less than 1 minute
- B) When the query contains operations that cannot support incremental processing (e.g., certain aggregations or joins)
- C) When the dynamic table has more than 1 million rows
- D) Full refresh is always used — incremental refresh must be explicitly enabled
---
## Q58 (Single Answer)
A data engineer must build a pipeline that transforms raw event data into aggregated hourly summaries. They want to avoid manually managing refresh schedules and data dependencies. Which Snowflake feature is best suited?

- A) A stream on the raw events table with a scheduled task
- B) A materialized view over the raw events table
- C) A dynamic table with a target lag of 1 hour
- D) An external function that aggregates data on demand
---
## Q59 (Single Answer)
A stored procedure is created with `EXECUTE AS CALLER`. What does this mean?

- A) The procedure runs with the privileges of the procedure's owner role
- B) The procedure runs with the privileges of the user who calls the procedure
- C) The procedure runs as the ACCOUNTADMIN role
- D) The procedure runs as the system user (SNOWFLAKE service user)
---
## Q60 (Single Answer)
Which capability distinguishes a stored procedure from a UDF in Snowflake?

- A) UDFs can run DDL statements; stored procedures cannot
- B) Stored procedures can run DDL and DML statements; UDFs cannot
- C) Stored procedures return tabular results; UDFs return only scalar values
- D) UDFs support Python; stored procedures do not
---
## Q61 (Single Answer)
A developer needs to create a stored procedure that executes multiple SQL statements and also performs DDL operations (such as CREATE TABLE). Which language can be used to write this stored procedure?

- A) SQL only (Snowflake Scripting)
- B) Python only
- C) Any of the supported languages: JavaScript, Python, Java, Scala, or Snowflake Scripting (SQL)
- D) JavaScript only, as it is the original stored procedure language in Snowflake
---
## Q62 (Single Answer)
What does a scalar User-Defined Function (UDF) return for each input row?

- A) A table of multiple rows and columns
- B) A single value (one row, one column)
- C) An aggregate value across all input rows
- D) A VARIANT containing multiple values
---
## Q63 (Single Answer)
A data engineer needs to write a UDF that accumulates values across multiple rows and returns a single aggregated result, similar to the SUM function. Which type of UDF should they create?

- A) Scalar UDF (UDF)
- B) User-Defined Table Function (UDTF)
- C) User-Defined Aggregate Function (UDAF)
- D) Vectorized UDF
---
## Q64 (Single Answer)
A User-Defined Table Function (UDTF) in Snowflake differs from a scalar UDF in which key way?

- A) A UDTF can only be written in Python; scalar UDFs support more languages
- B) A UDTF returns a set of rows (tabular result) for each input row, while a scalar UDF returns a single value
- C) A UDTF runs outside of Snowflake on a remote server
- D) A UDTF processes only one row at a time; scalar UDFs process batches
---
## Q65 (Single Answer)
A developer creates a vectorized UDF in Python using Snowpark. How does Snowflake pass data to the vectorized UDF handler function?

- A) One row at a time as a Python dictionary
- B) As batches of input rows in the form of Pandas DataFrames
- C) As a complete table object (Snowpark DataFrame)
- D) As a JSON string representing all input rows
---
## Q66 (Single Answer)
An external function calls a remote REST API to perform sentiment analysis on text data. Which Snowflake object must be created before the external function to manage security and authentication with the remote service?

- A) Network policy
- B) API integration
- C) External stage
- D) Resource monitor
---
## Q67 (Single Answer)
A developer calls an external function in a Snowflake SQL query. In what format must the remote service return data to Snowflake?

- A) XML
- B) CSV
- C) Parquet
- D) JSON
---
## Q68 (Single Answer)
The Snowpark API uses lazy evaluation for DataFrame operations. What does "lazy evaluation" mean in this context?

- A) DataFrames automatically cache results to avoid repeated computation
- B) SQL operations are not executed when you build the DataFrame — execution is deferred until an action (e.g., collect(), show()) is called
- C) Snowpark downloads data to the client for processing, executing transformations locally
- D) DataFrame operations run asynchronously in the background
---
## Q69 (Single Answer)
In Snowpark for Python, which object represents a connection to Snowflake and is required to create DataFrames and execute SQL?

- A) Connection
- B) Cursor
- C) Session
- D) Engine
---
## Q70 (Single Answer)
A Snowpark Python developer writes: `df = session.table("orders").filter(col("status") == "SHIPPED").select(col("order_id"), col("total"))`. When is the corresponding SQL query sent to Snowflake for execution?

- A) When `filter()` is called
- B) When `select()` is called
- C) When an action such as `df.collect()` or `df.show()` is called
- D) Immediately when `session.table()` is called
---
## Q71 (Single Answer)
A query uses the `RANK()` window function. Two rows have the same value in the ORDER BY column and receive rank 1. What rank does the next row receive?

- A) 2
- B) 3
- C) 1
- D) The query returns an error for duplicate values
---
## Q72 (Single Answer)
Which window function returns the value of a column from a previous row within a window partition, optionally offset by N rows?

- A) LEAD
- B) FIRST_VALUE
- C) LAG
- D) ROW_NUMBER
---
## Q73 (Single Answer)
A data analyst runs a query using `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)`. What does this expression produce?

- A) The total count of orders per customer
- B) A unique sequential integer for each row within each customer's partition, ordered by order_date descending
- C) The rank of orders with ties receiving the same number
- D) A running total of orders per customer
---
## Q74 (Single Answer)
Which statement correctly describes the DENSE_RANK() function compared to RANK()?

- A) DENSE_RANK() leaves no gaps in the ranking sequence after ties; RANK() leaves gaps
- B) DENSE_RANK() assigns a unique rank to every row; RANK() allows ties
- C) DENSE_RANK() is only available for numeric columns; RANK() works on any data type
- D) DENSE_RANK() and RANK() produce identical results in all cases
---
## Q75 (Multi Answer - Select 2)
Which TWO languages does Snowflake's Snowpark API currently support for building data transformation pipelines? (Choose two.)

- A) R
- B) Java
- C) Go
- D) Python
- E) Ruby
---
## Q76 (Multi Answer - Select 2)
Which TWO statements correctly describe key benefits of Snowpark compared to running SQL directly via a client connector? (Choose two.)

- A) Snowpark transfers all data to the client machine for local processing
- B) Snowpark supports pushdown for all operations, meaning data transformation runs in Snowflake
- C) Snowpark operations are executed lazily, reducing unnecessary data transfer
- D) Snowpark only supports Python and cannot be used with Java or Scala
- E) Snowpark requires a separate Spark cluster outside of Snowflake for computations
---
## Q77 (Multi Answer - Select 2)
Which TWO stream types are supported in Snowflake? (Choose two.)

- A) Merge-only stream
- B) Append-only stream
- C) Delete-only stream
- D) Standard stream
- E) Upsert stream
---
## Q78 (Multi Answer - Select 2)
Which TWO statements about task graphs (DAGs) in Snowflake are TRUE? (Choose two.)

- A) A task can have at most 100 predecessor (parent) tasks
- B) Child tasks with the same predecessor always run sequentially
- C) Tasks in a graph must have the same owner and reside in the same database and schema
- D) The root task can use a fixed interval schedule or a CRON expression
- E) A finalizer task runs only when all other tasks succeed
---
## Q79 (Multi Answer - Select 2)
Which TWO handler languages produce UDFs that are sharable via Snowflake Secure Data Sharing? (Choose two.)

- A) Java
- B) Scala
- C) SQL
- D) Python
- E) JavaScript
---
## Q80 (Multi Answer - Select 2)
Which TWO languages can be used to write stored procedures in Snowflake? (Choose two.)

- A) R
- B) Go
- C) Snowflake Scripting (SQL)
- D) Ruby
- E) Java
---
## Q81 (Multi Answer - Select 2)
The FLATTEN function returns several output columns. Which TWO columns are part of the standard FLATTEN output? (Choose two.)

- A) PATH
- B) PARENT
- C) COLUMN_NAME
- D) KEY
- E) HASH
---
## Q82 (Multi Answer - Select 2)
Which TWO functions can be used to construct an ARRAY value in Snowflake? (Choose two.)

- A) ARRAY_BUILD
- B) ARRAY_CONSTRUCT
- C) ARRAY_MAKE
- D) PARSE_JSON (with a JSON array string)
- E) CREATE_ARRAY
---
## Q83 (Multi Answer - Select 2)
A developer has a VARIANT column containing `{"region": "west", "sales": 1500}`. Which TWO expressions correctly retrieve the value of the `sales` key as an integer? (Choose two.)

- A) `data.sales::INT`
- B) `data:sales::INT`
- C) `data['sales']::INT`
- D) `data->sales::INT`
- E) `CAST(data, INT)`
---
## Q84 (Multi Answer - Select 2)
Which TWO statements about Snowflake sequences are TRUE? (Choose two.)

- A) A sequence always generates strictly consecutive integers with no gaps
- B) Sequences generate unique values, but the values may not be strictly consecutive or gap-free
- C) Sequences can be used as a default value for a column (auto-increment)
- D) Sequences are only supported on tables with a single primary key column
- E) Sequences cannot be referenced in INSERT statements
---
## Q85 (Multi Answer - Select 2)
Which TWO statements about Common Table Expressions (CTEs) using the WITH clause in Snowflake are TRUE? (Choose two.)

- A) A CTE result is automatically materialized and persisted as a temporary table
- B) CTEs can be referenced multiple times within the same query
- C) Snowflake supports recursive CTEs using the WITH RECURSIVE syntax
- D) CTEs can only be used in SELECT statements, not in DML operations
- E) Each CTE definition must include an ORDER BY clause
---
## Q86 (Multi Answer - Select 2)
Which TWO statements about dynamic tables in Snowflake are TRUE? (Choose two.)

- A) Dynamic tables support real-time streaming with sub-second latency
- B) Dynamic tables automatically handle refresh scheduling based on target lag
- C) Dynamic tables can be chained to create a multi-step transformation pipeline
- D) Dynamic tables require a user-managed virtual warehouse and cannot use serverless compute
- E) A dynamic table's schema is fixed at creation time and cannot be altered
---
## Q87 (Multi Answer - Select 3)
Which THREE metadata columns are automatically added to the output when you query a Snowflake stream? (Choose three.)

- A) METADATA$TIMESTAMP
- B) METADATA$ACTION
- C) METADATA$USER
- D) METADATA$ISUPDATE
- E) METADATA$ROW_ID
---
## Q88 (Multi Answer - Select 3)
Which THREE UDF variations are available in Snowflake? (Choose three.)

- A) User-Defined Scalar Function (UDF)
- B) User-Defined Transform Function (UDTRANSF)
- C) User-Defined Table Function (UDTF)
- D) User-Defined Merge Function (UDMF)
- E) User-Defined Aggregate Function (UDAF)
---
## Q89 (Multi Answer - Select 3)
A data engineer is building a Snowpark Python pipeline. Which THREE operations are available on a Snowpark DataFrame? (Choose three.)

- A) filter() — to apply row-level filters
- B) groupBy() — to group rows for aggregation
- C) execute() — to immediately run the DataFrame against Snowflake
- D) join() — to combine two DataFrames
- E) export() — to write data to an external stage
---
## Q90 (Multi Answer - Select 3)
Which THREE statements correctly describe the PIVOT operation in Snowflake SQL? (Choose three.)

- A) PIVOT rotates rows into columns, producing a cross-tabulation of data
- B) PIVOT requires specifying the column to pivot, the aggregate function, and the values to become columns
- C) PIVOT and UNPIVOT are synonymous and produce identical results
- D) UNPIVOT transforms columns into rows, which is the reverse of PIVOT
- E) PIVOT can only be used in subqueries, not in top-level SELECT statements
