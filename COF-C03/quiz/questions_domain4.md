# Domain 4: Performance Optimization, Querying & Transformation

---

## Q1 (Single Answer)
What is the Query Profile in Snowflake?
- A) A summary of all queries run in the account
- B) A visual representation of the execution plan and statistics for a specific query, showing operators, data flow, and performance metrics
- C) A list of queries ordered by execution time
- D) A configuration file for query optimization

---

## Q2 (Scenario)
A data analyst runs a query that takes 30 minutes to complete. They want to identify which step in the query is the bottleneck. Which Snowflake feature should they use?
- A) ACCOUNT_USAGE.QUERY_HISTORY
- B) Query Profile in Snowsight
- C) Resource Monitor
- D) EXPLAIN command only

---

## Q3 (Single Answer)
In the Query Profile, what does "bytes spilled to local storage" indicate?
- A) Data was written to the Cloud Services layer
- B) The query required more memory than available, causing intermediate results to be written to the warehouse's local SSD storage
- C) Data was exported to an external stage
- D) The query result cache was full

---

## Q4 (Multi Answer - Select 2)
Which TWO Query Profile indicators suggest a performance problem? (Select 2)
- A) High percentage of partitions scanned (inefficient pruning)
- B) Query completing in under 1 second
- C) Bytes spilled to remote storage
- D) All partitions pruned successfully
- E) Small result set returned

---

## Q5 (Single Answer)
What does "bytes spilled to remote storage" indicate in a Query Profile?
- A) Data was cached in the Cloud Services layer
- B) The query ran out of both memory and local SSD storage, causing data to be spilled to remote cloud storage, severely impacting performance
- C) Query results were stored remotely for sharing
- D) The warehouse auto-suspended during the query

---

## Q6 (Scenario)
A data engineer sees in the Query Profile that a join operation produced 10 billion rows from two tables with 100,000 rows each. What is this problem called and how should they fix it?
- A) Partition pruning issue — add a clustering key
- B) Exploding join (Cartesian product) — review the join condition for missing or incorrect predicates
- C) Spilling — increase warehouse size
- D) Cache miss — re-run the query

---

## Q7 (Single Answer)
What does "query queuing" in the Query Profile indicate?
- A) The query is waiting for data to load from external storage
- B) The query is waiting for available warehouse resources because all resources are currently in use by other queries
- C) The query is being optimized by the Cloud Services layer
- D) The query results are being written to cache

---

## Q8 (Single Answer)
What is the purpose of the EXPLAIN command in Snowflake?
- A) To execute a query and display results
- B) To display the logical execution plan for a query without actually executing it
- C) To explain why a query failed
- D) To optimize a query automatically

---

## Q9 (Multi Answer - Select 2)
Which TWO ACCOUNT_USAGE views are useful for analyzing query performance? (Select 2)
- A) QUERY_HISTORY
- B) STAGES
- C) WAREHOUSE_METERING_HISTORY
- D) FILE_FORMATS
- E) SEQUENCES

---

## Q10 (Scenario)
A database administrator notices that many queries in their account are scanning far more data than necessary. They want to identify which queries have poor pruning efficiency. Which view should they query?
- A) ACCOUNT_USAGE.STAGES
- B) ACCOUNT_USAGE.QUERY_HISTORY (checking BYTES_SCANNED vs. data volume)
- C) ACCOUNT_USAGE.LOGIN_HISTORY
- D) INFORMATION_SCHEMA.COLUMNS

---

## Q11 (Single Answer)
What is query attribution in the context of Snowflake's ACCOUNT_USAGE?
- A) Attributing query results to specific users
- B) Tracking which warehouses, users, and roles executed queries, and the resources consumed
- C) Assigning queries to specific databases
- D) Linking queries to external applications

---

## Q12 (Single Answer)
What is the best practice for grouping workloads on Snowflake warehouses?
- A) Run all workloads on a single large warehouse
- B) Group similar workloads on the same warehouse (e.g., all ETL on one warehouse, all BI reporting on another)
- C) Distribute every query to a different warehouse
- D) Use only X-Small warehouses for all workloads

---

## Q13 (Scenario)
An organization has three workload types: heavy ETL jobs (large, long-running), BI dashboard queries (medium, concurrent), and ad-hoc analyst queries (small, variable). What warehouse strategy should they use?
- A) One 4X-Large warehouse for everything
- B) Three separate warehouses: large for ETL, multi-cluster medium for BI, and small-to-medium for ad-hoc
- C) One multi-cluster warehouse for all three
- D) Use serverless compute for everything

---

## Q14 (Single Answer)
What is the Query Acceleration Service (QAS) in Snowflake?
- A) A feature that increases warehouse size automatically
- B) A service that offloads portions of eligible queries (particularly those with large scans and selective filters) to serverless compute resources to accelerate execution
- C) A query result cache
- D) A feature that compresses query results

---

## Q15 (Multi Answer - Select 2)
Which TWO types of queries benefit most from Query Acceleration Service? (Select 2)
- A) Queries with large table scans and selective filters
- B) Simple metadata-only queries
- C) Queries with significant processing that can be parallelized
- D) Queries that hit the result cache
- E) DDL statements like CREATE TABLE

---

## Q16 (Scenario)
A BI team runs dashboard queries that scan a 10 TB table but filter on a specific date range, returning only a small subset of data. The queries are slow even on a Large warehouse. Which feature could improve performance without changing the warehouse size?
- A) Multi-cluster warehouse
- B) Query Acceleration Service
- C) Materialized view
- D) External table

---

## Q17 (Single Answer)
Which Snowflake edition is required for Query Acceleration Service?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake

---

## Q18 (Single Answer)
What is the Search Optimization Service (SOS) in Snowflake?
- A) A full-text search engine
- B) A service that improves the performance of selective point lookup queries and substring/regex searches by maintaining optimized search access paths
- C) A tool for optimizing warehouse configuration
- D) A service that searches for unused tables

---

## Q19 (Scenario)
An application team runs millions of point-lookup queries per day (e.g., SELECT * FROM orders WHERE order_id = 12345). The table has billions of rows. Which optimization feature should they enable?
- A) Clustering key
- B) Search Optimization Service
- C) Materialized view
- D) Query result cache

---

## Q20 (Multi Answer - Select 2)
Which TWO query patterns benefit from Search Optimization Service? (Select 2)
- A) Equality predicates on high-cardinality columns (point lookups)
- B) Full table scans with no filter
- C) Substring and regular expression searches (LIKE, RLIKE)
- D) Aggregate queries (SUM, COUNT, AVG)
- E) Cross-join operations

---

## Q21 (Single Answer)
What is a clustering key in Snowflake?
- A) A primary key constraint
- B) A designation of one or more columns/expressions used to co-locate related data in the same micro-partitions, improving pruning efficiency
- C) An index on a column
- D) A foreign key relationship

---

## Q22 (Scenario)
A data warehouse team has a 20 TB fact table frequently queried with WHERE clauses on REGION and ORDER_DATE. Over time, data has been inserted in random order and pruning efficiency has degraded. What should they do?
- A) Create an index on REGION and ORDER_DATE
- B) Define a clustering key on (REGION, ORDER_DATE) to reorganize data for better pruning
- C) Partition the table manually
- D) Create a separate table for each region

---

## Q23 (Single Answer)
What is automatic clustering in Snowflake?
- A) Snowflake automatically chooses the best clustering key
- B) A background service that maintains the clustering of a table according to its defined clustering key by reorganizing micro-partitions as data changes
- C) A one-time reorganization that happens when a clustering key is defined
- D) A manual process triggered by the DBA

---

## Q24 (Multi Answer - Select 2)
Which TWO factors should you consider when choosing clustering key columns? (Select 2)
- A) Columns frequently used in WHERE clauses or join conditions
- B) Columns with very low cardinality only (e.g., boolean)
- C) Columns that provide good pruning (moderate to high cardinality)
- D) Columns that are never queried
- E) Only the primary key column

---

## Q25 (Single Answer)
What is the purpose of the SYSTEM$CLUSTERING_INFORMATION function?
- A) To create a clustering key
- B) To return clustering metadata about a table, including clustering depth and overlap, to assess how well-clustered the data is
- C) To drop a clustering key
- D) To resize a warehouse for clustering operations

---

## Q26 (Scenario)
After defining a clustering key on a table, a data engineer wants to check if automatic reclustering is improving the data organization. Which function should they use?
- A) SYSTEM$STREAM_HAS_DATA
- B) SYSTEM$CLUSTERING_INFORMATION
- C) SYSTEM$PIPE_STATUS
- D) SYSTEM$CANCEL_ALL_QUERIES

---

## Q27 (Single Answer)
What is a materialized view in Snowflake?
- A) A regular view that is cached
- B) A pre-computed result set stored as a physical table that Snowflake automatically keeps synchronized with the base table
- C) A temporary view that exists only during a session
- D) A view that can only be created by ACCOUNTADMIN

---

## Q28 (Multi Answer - Select 2)
Which TWO are limitations of materialized views in Snowflake? (Select 2)
- A) They cannot include joins (only single-table queries)
- B) They require no additional storage
- C) They consume additional storage for the pre-computed results
- D) They cannot be used with dynamic tables
- E) They require manual refresh after every base table change

---

## Q29 (Scenario)
A reporting team frequently runs a complex aggregation query with GROUP BY on a table that is updated once daily. The query takes 10 minutes each time. What is the best optimization?
- A) Increase warehouse size permanently
- B) Create a materialized view that pre-computes the aggregation
- C) Create a clustering key on the GROUP BY column
- D) Convert the table to an external table

---

## Q30 (Single Answer)
What is the query result cache in Snowflake?
- A) A cache stored on warehouse compute nodes
- B) A cache in the Cloud Services layer that stores the results of previously executed queries, which can be returned instantly for identical queries
- C) A temporary table that stores query results
- D) A cache that stores intermediate query results during execution

---

## Q31 (Single Answer)
How long does the query result cache persist in Snowflake?
- A) 1 hour
- B) 24 hours (the cache is purged if underlying data changes or after 24 hours)
- C) 7 days
- D) Indefinitely until manually cleared

---

## Q32 (Scenario)
An analyst runs the same exact query twice within 5 minutes. The underlying data has not changed. The second execution returns instantly without using the warehouse. What Snowflake feature is responsible?
- A) Warehouse data cache
- B) Metadata cache
- C) Query result cache
- D) Materialized view

---

## Q33 (Multi Answer - Select 2)
Which TWO conditions must be met for the query result cache to be used? (Select 2)
- A) The query text must be exactly the same as a previous query
- B) The warehouse must be the same size as when the original query ran
- C) The underlying table data must not have changed since the cached result was stored
- D) The query must be run by the same user who ran the original query
- E) The warehouse must be running

---

## Q34 (Single Answer)
What is the warehouse cache (local disk cache) in Snowflake?
- A) The query result cache
- B) Data from the Storage layer cached on the SSD drives of warehouse compute nodes, allowing faster access for subsequent queries on the same data
- C) A cache in the Cloud Services layer
- D) A permanent storage area on the warehouse

---

## Q35 (Single Answer)
What happens to the warehouse cache when a warehouse is suspended?
- A) The cache is preserved for the next resume
- B) The cache is lost because the compute nodes are deallocated
- C) The cache is transferred to the Cloud Services layer
- D) The cache is written to a permanent stage

---

## Q36 (Scenario)
A BI team runs multiple different queries throughout the day on the same set of tables. They notice that the first query of the day is slow but subsequent queries on the same data are faster. Which cache is responsible for this improvement?
- A) Query result cache
- B) Warehouse cache (local disk cache)
- C) Metadata cache
- D) External storage cache

---

## Q37 (Multi Answer - Select 2)
Which TWO statements about Snowflake's metadata cache are correct? (Select 2)
- A) It is maintained by the Cloud Services layer
- B) It stores full query results
- C) It stores statistics about table data (e.g., row count, min/max values per partition)
- D) It requires a running warehouse to access
- E) It is available only in Enterprise Edition

---

## Q38 (Single Answer)
Which type of cache enables Snowflake to answer simple aggregate queries (like COUNT(*) or MIN/MAX) without using a warehouse?
- A) Query result cache
- B) Warehouse cache
- C) Metadata cache
- D) Materialized view cache

---

## Q39 (Single Answer)
What is the correct order of Snowflake's caching layers from fastest to slowest for a repeated query?
- A) Warehouse cache → Query result cache → Metadata cache
- B) Query result cache → Metadata cache → Warehouse cache → Remote storage
- C) Metadata cache → Query result cache → Remote storage
- D) Remote storage → Warehouse cache → Query result cache

---

## Q40 (Scenario)
A developer wants to ensure their frequently-run queries benefit from caching. Which parameter should they check is not disabled?
- A) USE_CACHED_RESULT (should be TRUE)
- B) WAREHOUSE_SIZE
- C) AUTO_SUSPEND
- D) STATEMENT_TIMEOUT_IN_SECONDS

---

## Q41 (Single Answer)
What data types does Snowflake's VARIANT column support?
- A) Only JSON data
- B) Any semi-structured data including JSON, Avro, ORC, Parquet, and XML
- C) Only XML data
- D) Only Avro and Parquet data

---

## Q42 (Single Answer)
How do you access a nested field in a VARIANT column in Snowflake?
- A) Using standard SQL JOINs
- B) Using dot notation (e.g., column:field.subfield) or bracket notation (e.g., column['field'])
- C) Using the EXTRACT_FIELD function
- D) Using a regular expression

---

## Q43 (Scenario)
A data engineer has a table with a VARIANT column called RAW_DATA containing JSON objects. They want to extract the "customer_name" field from each row. Which SQL expression is correct?
- A) SELECT EXTRACT(customer_name FROM RAW_DATA) FROM table
- B) SELECT RAW_DATA:customer_name::STRING FROM table
- C) SELECT JSON_VALUE(RAW_DATA, 'customer_name') FROM table
- D) SELECT RAW_DATA->customer_name FROM table

---

## Q44 (Multi Answer - Select 2)
Which TWO functions are used to flatten semi-structured data (arrays and objects) in Snowflake? (Select 2)
- A) FLATTEN
- B) EXPLODE
- C) LATERAL FLATTEN
- D) UNNEST
- E) EXPAND

---

## Q45 (Single Answer)
What does the FLATTEN function do in Snowflake?
- A) Compresses data in a VARIANT column
- B) Produces a lateral view by expanding an array or object in a VARIANT column into multiple rows
- C) Converts VARIANT data to a relational table permanently
- D) Removes nested structures from JSON data

---

## Q46 (Scenario)
A table contains a VARIANT column with an array of order items per row. The analyst needs each item on a separate row for analysis. Which approach should they use?
- A) Create a view with GROUP BY
- B) Use LATERAL FLATTEN to expand the array into individual rows
- C) Use UNPIVOT on the VARIANT column
- D) Create a stored procedure to loop through items

---

## Q47 (Single Answer)
What is the PARSE_JSON function used for?
- A) To convert a VARIANT to a string
- B) To parse a JSON-formatted string and return a VARIANT value
- C) To validate JSON syntax
- D) To compress JSON data

---

## Q48 (Single Answer)
What does the CAST operator (::) do when used with VARIANT data?
- A) It changes the underlying data in the table
- B) It casts (converts) a VARIANT value to a specified data type (e.g., ::STRING, ::NUMBER)
- C) It creates a new column
- D) It validates the data type

---

## Q49 (Multi Answer - Select 2)
Which TWO aggregate functions are commonly used for data transformation in Snowflake? (Select 2)
- A) SUM
- B) FLATTEN
- C) COUNT
- D) LATERAL
- E) PARSE_JSON

---

## Q50 (Single Answer)
What is a window function in Snowflake?
- A) A function that only works on windowed displays
- B) A function that performs a calculation across a set of rows related to the current row, without collapsing the rows (unlike GROUP BY)
- C) A function that creates temporary windows of time
- D) A function that partitions data into storage windows

---

## Q51 (Scenario)
A data analyst wants to calculate a running total of sales ordered by date, without collapsing the individual rows. Which SQL approach should they use?
- A) GROUP BY date with SUM
- B) SUM(sales) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
- C) Subquery with SUM and a date filter
- D) UNION ALL of cumulative queries

---

## Q52 (Single Answer)
What does the ROW_NUMBER() window function do?
- A) Returns the total number of rows in the table
- B) Assigns a unique sequential integer to each row within a partition, ordered by the specified column(s)
- C) Returns the row's physical position in storage
- D) Counts the number of non-null values

---

## Q53 (Multi Answer - Select 2)
Which TWO are valid window functions in Snowflake? (Select 2)
- A) RANK()
- B) FLATTEN()
- C) LAG()
- D) PARSE_JSON()
- E) COPY_INTO()

---

## Q54 (Single Answer)
What is the difference between RANK() and DENSE_RANK()?
- A) RANK() only works on numeric columns; DENSE_RANK() works on any type
- B) RANK() leaves gaps in ranking after ties; DENSE_RANK() produces consecutive ranks without gaps
- C) DENSE_RANK() is faster than RANK()
- D) There is no difference

---

## Q55 (Scenario)
A data analyst needs to compare each row's sales amount with the previous row's sales amount (ordered by date). Which window function should they use?
- A) LEAD()
- B) LAG()
- C) RANK()
- D) NTILE()

---

## Q56 (Single Answer)
What does the OVER clause do in a window function?
- A) Filters the result set
- B) Defines the window (partition and ordering) over which the function operates
- C) Groups rows into aggregate results
- D) Creates a subquery

---

## Q57 (Single Answer)
What is the purpose of PARTITION BY in a window function?
- A) To physically partition the table into micro-partitions
- B) To divide the result set into partitions (groups) within which the window function is applied independently
- C) To create a new table partition
- D) To filter rows before the window function

---

## Q58 (Multi Answer - Select 2)
Which TWO SQL clauses are used for transforming rows into columns (pivoting) and columns into rows (unpivoting)? (Select 2)
- A) PIVOT
- B) MERGE
- C) UNPIVOT
- D) FLATTEN
- E) GROUP BY

---

## Q59 (Scenario)
A data engineer has a table with columns PRODUCT, QUARTER, and REVENUE. They want to transform it so each quarter becomes a separate column with revenue values. Which SQL operation should they use?
- A) UNPIVOT
- B) PIVOT
- C) LATERAL FLATTEN
- D) GROUP BY with CASE

---

## Q60 (Single Answer)
What does the QUALIFY clause do in Snowflake?
- A) It replaces the WHERE clause
- B) It filters the result set based on window function results, similar to HAVING for GROUP BY
- C) It qualifies column names with table aliases
- D) It validates data quality

---

## Q61 (Scenario)
A data analyst wants to keep only the most recent order for each customer. They use ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC). How should they filter to keep only the first row per customer?
- A) WHERE ROW_NUMBER() = 1
- B) QUALIFY ROW_NUMBER() OVER (...) = 1
- C) HAVING ROW_NUMBER() = 1
- D) GROUP BY customer_id with MAX(order_date)

---

## Q62 (Single Answer)
What is the purpose of the SAMPLE / TABLESAMPLE clause?
- A) To create a sample database
- B) To return a random sample of rows from a table
- C) To duplicate a table
- D) To test a query without running it

---

## Q63 (Single Answer)
What is the OBJECT_CONSTRUCT function used for in Snowflake?
- A) To create a new database object
- B) To construct a JSON object (OBJECT type) from key-value pairs in SQL
- C) To construct a table from files
- D) To build a warehouse

---

## Q64 (Multi Answer - Select 2)
Which TWO functions convert between structured and semi-structured data in Snowflake? (Select 2)
- A) TO_VARIANT
- B) TO_TABLE
- C) TO_JSON
- D) TO_WAREHOUSE
- E) TO_STAGE

---

## Q65 (Scenario)
A data engineer needs to combine multiple JSON objects from different rows into a single JSON array. Which aggregate function should they use?
- A) GROUP_CONCAT
- B) ARRAY_AGG
- C) JSON_MERGE
- D) CONCAT

---

## Q66 (Single Answer)
What is unstructured data in Snowflake?
- A) Data stored in VARIANT columns
- B) Data such as PDFs, images, audio, and video files that can be stored in stages and processed using UDFs or external functions
- C) Data without a primary key
- D) Data in external tables

---

## Q67 (Single Answer)
Where is unstructured data typically stored in Snowflake?
- A) In VARIANT columns
- B) In internal or external stages
- C) In regular table columns
- D) In the Cloud Services layer

---

## Q68 (Scenario)
A company wants to process images stored in an S3 bucket using a Python UDF in Snowflake. Where should the images be staged?
- A) In a VARIANT column
- B) In an external stage pointing to the S3 bucket
- C) In the INFORMATION_SCHEMA
- D) In a temporary table

---

## Q69 (Single Answer)
What does the LISTAGG function do in Snowflake?
- A) Lists all tables in a schema
- B) Concatenates values from multiple rows into a single string, with an optional delimiter
- C) Aggregates values into an array
- D) Lists aggregate functions available

---

## Q70 (Multi Answer - Select 2)
Which TWO Snowflake functions create arrays from query results? (Select 2)
- A) ARRAY_AGG
- B) ARRAY_CREATE
- C) ARRAY_CONSTRUCT
- D) ARRAY_MERGE
- E) ARRAY_BUILD

---

## Q71 (Single Answer)
What is the purpose of the TRY_CAST function in Snowflake?
- A) To forcefully cast any value
- B) To attempt a cast and return NULL instead of an error if the conversion fails
- C) To try multiple casts simultaneously
- D) To cast data in a trial database

---

## Q72 (Scenario)
A data engineer is cleaning data and needs to convert a string column to INTEGER. Some values are not valid numbers. They want NULLs instead of errors for invalid values. Which function should they use?
- A) CAST(column AS INTEGER)
- B) TRY_CAST(column AS INTEGER)
- C) TO_NUMBER(column)
- D) CONVERT(column, INTEGER)

---

## Q73 (Single Answer)
What does the COALESCE function do?
- A) Combines two tables
- B) Returns the first non-NULL expression from a list of expressions
- C) Converts NULL to zero
- D) Counts NULL values

---

## Q74 (Single Answer)
What is the purpose of the IFF function in Snowflake?
- A) To check if a file format is valid
- B) A shorthand conditional function equivalent to a simple CASE expression — IFF(condition, true_value, false_value)
- C) To identify failed functions
- D) To iterate through rows

---

## Q75 (Multi Answer - Select 2)
Which TWO functions are useful for handling NULL values in Snowflake? (Select 2)
- A) NVL (returns alternate value if NULL)
- B) NULL_CHECK
- C) IFNULL (returns alternate value if NULL)
- D) IS_EMPTY
- E) REMOVE_NULL

---

## Q76 (Single Answer)
What is the MERGE statement used for in Snowflake?
- A) To combine two stages
- B) To perform upsert operations — inserting new rows and updating existing rows based on a matching condition
- C) To merge two databases
- D) To merge query results into a cache

---

## Q77 (Scenario)
A data pipeline receives daily updates containing both new and modified customer records. The engineer needs to insert new customers and update existing ones in a single operation. Which SQL statement should they use?
- A) INSERT followed by UPDATE
- B) MERGE INTO target USING source ON match_condition WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT
- C) UPSERT INTO target
- D) REPLACE INTO target

---

## Q78 (Single Answer)
What does the LATERAL keyword do when used with FLATTEN?
- A) Creates a lateral index
- B) Allows each row to reference and expand the VARIANT column from the same row, producing one row per array/object element
- C) Creates a left join
- D) Loads data laterally across warehouses

---

## Q79 (Single Answer)
What is the GET_PATH function used for with semi-structured data?
- A) To get the file path of a staged file
- B) To extract a value from a VARIANT using a path expression (e.g., 'data.customer.name')
- C) To get the storage path of a table
- D) To return the execution path of a query

---

## Q80 (Multi Answer - Select 2)
Which TWO are best practices for optimizing query performance in Snowflake? (Select 2)
- A) Using SELECT * for all queries
- B) Filtering early with WHERE clauses to reduce data scanned
- C) Using appropriate clustering keys on large, frequently queried tables
- D) Disabling caching for all queries
- E) Running all queries on X-Small warehouses

---

## Q81 (Scenario)
A query on a 5 TB table filters on a DATE column but scans 95% of the micro-partitions. The table currently has no clustering key. What should the data engineer do first?
- A) Increase the warehouse size
- B) Define a clustering key on the DATE column to improve pruning efficiency
- C) Convert the table to an external table
- D) Add a secondary index

---

## Q82 (Single Answer)
What is the impact of using SELECT * instead of selecting specific columns?
- A) No impact on performance
- B) It can scan more data than necessary, increasing query time and costs, especially on wide tables
- C) It always performs better than selecting specific columns
- D) It automatically triggers result caching

---

## Q83 (Single Answer)
What does the LIMIT clause do for query optimization?
- A) It limits the number of warehouses
- B) It restricts the number of rows returned, which can reduce data transfer but does not necessarily reduce processing
- C) It limits the warehouse size
- D) It limits the number of concurrent queries

---

## Q84 (Multi Answer - Select 2)
Which TWO strategies help reduce query costs in Snowflake? (Select 2)
- A) Right-sizing warehouses to match workload needs
- B) Using the largest warehouse available for all queries
- C) Leveraging caching (result cache, warehouse cache) to avoid redundant computation
- D) Disabling auto-suspend to keep caches warm
- E) Running all queries with ACCOUNTADMIN role

---

## Q85 (Single Answer)
What is the benefit of the CLUSTER BY expression in a CREATE TABLE statement?
- A) It creates a primary key
- B) It defines a clustering key that improves pruning by organizing data within micro-partitions
- C) It creates an index
- D) It partitions the table across multiple databases

---

## Q86 (Scenario)
A data analyst notices their query runs fast in the morning but becomes slower throughout the day as more analysts submit queries. The Query Profile shows queries are queuing. What should the administrator do?
- A) Increase the warehouse size
- B) Enable multi-cluster warehousing to handle higher concurrency
- C) Add a clustering key
- D) Enable Search Optimization Service

---

## Q87 (Single Answer)
How does Query Acceleration Service (QAS) differ from scaling up a warehouse?
- A) QAS increases the warehouse size; scaling up adds clusters
- B) QAS offloads portions of a query to serverless resources; scaling up increases all compute resources for the warehouse
- C) There is no difference
- D) QAS only works with Snowpark; scaling up works with SQL

---

## Q88 (Single Answer)
Which function can be used to check whether Query Acceleration Service would benefit a specific warehouse's workload?
- A) SYSTEM$ESTIMATE_QAS_BENEFIT
- B) SYSTEM$CLUSTERING_INFORMATION
- C) SYSTEM$PIPE_STATUS
- D) SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST

---

## Q89 (Multi Answer - Select 2)
Which TWO performance optimization features consume additional credits beyond the warehouse? (Select 2)
- A) Query Acceleration Service
- B) Query result cache
- C) Automatic clustering (reclustering)
- D) Warehouse auto-resume
- E) USE SECONDARY ROLES

---

## Q90 (Scenario)
A data engineer wants to optimize a table for both point-lookup queries (WHERE id = X) and range queries (WHERE date BETWEEN ... AND ...). Which combination of features should they consider?
- A) Search Optimization Service for point lookups and clustering key on the date column for range queries
- B) Two clustering keys (one for each column)
- C) Materialized views for both patterns
- D) Only increasing warehouse size

---

## Q91 (Single Answer)
What is the SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST function used for?
- A) To enable Search Optimization Service
- B) To estimate the storage and compute costs of enabling Search Optimization Service on a specific table
- C) To estimate query execution time
- D) To optimize search queries manually

---

## Q92 (Single Answer)
What is the role of the optimizer in query pruning?
- A) It determines which warehouse to use
- B) It uses micro-partition metadata (min/max values) to eliminate partitions that cannot contain matching data, reducing the amount of data scanned
- C) It prunes unused columns from the table definition
- D) It removes old queries from the cache

---

## Q93 (Multi Answer - Select 2)
Which TWO Snowflake features help with the performance of repeated queries on the same data? (Select 2)
- A) Query result cache (returns identical results instantly)
- B) Clustering keys
- C) Warehouse cache (data cached on local SSD for faster reads)
- D) Network policies
- E) Resource monitors

---

## Q94 (Scenario)
A financial reporting team runs the same complex query at the start of every business day. The underlying data does not change overnight. How can they minimize the execution time for this query?
- A) Pre-run the query the night before to populate the query result cache
- B) Increase the warehouse to 4X-Large
- C) Create a clustering key on all columns
- D) Use an external table instead

---

## Q95 (Single Answer)
What happens to the query result cache when the underlying table data changes?
- A) The cache remains valid
- B) The cache is invalidated, and the next execution of the query will re-compute the results
- C) The cache is updated automatically with the new results
- D) The cache persists for 24 hours regardless of changes

---

## Q96 (Single Answer)
What is the ARRAY_SIZE function used for?
- A) To set the size of an array
- B) To return the number of elements in an array
- C) To resize an array column
- D) To limit the number of array elements loaded

---

## Q97 (Scenario)
A data engineer has JSON data with deeply nested objects and arrays. They need to flatten all levels of nesting into a relational format. Which approach should they use?
- A) A single FLATTEN call
- B) Multiple chained LATERAL FLATTEN calls, one for each level of nesting
- C) The PARSE_JSON function only
- D) Convert to CSV first

---

## Q98 (Single Answer)
What is the purpose of the TYPEOF function when working with VARIANT data?
- A) To change the data type
- B) To return the data type of a value stored in a VARIANT column
- C) To validate the schema of JSON data
- D) To convert between types

---

## Q99 (Multi Answer - Select 2)
Which TWO SQL techniques improve join performance in Snowflake? (Select 2)
- A) Filtering tables with WHERE clauses before joining to reduce row counts
- B) Using SELECT * in all join queries
- C) Ensuring join columns have matching data types to avoid implicit casting
- D) Always using CROSS JOIN for maximum flexibility
- E) Disabling caching before joins

---

## Q100 (Single Answer)
What does partition pruning refer to in Snowflake?
- A) Manually removing partitions from a table
- B) The query optimizer's ability to skip micro-partitions that do not contain data matching the query's filter predicates
- C) Pruning unused columns from query results
- D) Removing old data from partitions

---

## Q101 (Scenario)
A data team discovers that their nightly ETL process is spending most of its time on a MERGE statement. The Query Profile shows a large amount of data being scanned for the join. What optimization should they try first?
- A) Convert the MERGE to separate INSERT and UPDATE statements
- B) Ensure the join key column in the target table is well-clustered to improve pruning during the MERGE
- C) Use a larger file format for the source data
- D) Disable the warehouse cache

---

## Q102 (Single Answer)
What is the OBJECT_KEYS function used for in Snowflake?
- A) To encrypt an object
- B) To return an array containing the keys of a JSON object stored in a VARIANT column
- C) To list the primary keys of a table
- D) To return encryption keys

---

## Q103 (Single Answer)
What is the purpose of the STRIP_NULL_VALUE file format option for semi-structured data?
- A) To remove all NULL values from the loaded table
- B) To replace JSON null values with SQL NULL instead of storing them as VARIANT null strings
- C) To strip whitespace from null fields
- D) To skip rows that contain null values

---

## Q104 (Multi Answer - Select 2)
Which TWO Query Profile indicators help identify that a warehouse needs to be scaled up? (Select 2)
- A) Bytes spilled to local storage
- B) Query result returned from cache
- C) Bytes spilled to remote storage
- D) All partitions successfully pruned
- E) Zero rows scanned

---

## Q105 (Scenario)
A data engineer observes that queries on a table with a clustering key on REGION still scan many partitions when filtering on ORDER_DATE. The table is queried equally by both columns. What should they do?
- A) Remove the clustering key
- B) Change the clustering key to a multi-column key: CLUSTER BY (REGION, ORDER_DATE)
- C) Create two separate tables
- D) Disable automatic clustering
