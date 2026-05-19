## Q1 (Single Answer)
A data engineer notices that a query is running significantly slower than expected. Upon reviewing the Query Profile, they observe that the operator node for a JOIN is showing a large value for "Bytes spilled to remote storage." What is the FIRST recommended action to address this issue?

- A) Add a clustering key to the tables involved in the JOIN
- B) Use a larger virtual warehouse size
- C) Enable the Query Acceleration Service on the warehouse
- D) Convert the tables to materialized views
---
## Q2 (Single Answer)
A user runs the same SELECT query twice within 10 minutes against a table whose underlying data has not changed. The second execution completes almost instantly with no warehouse credits consumed. Which Snowflake feature is responsible for this behavior?

- A) Warehouse local disk cache
- B) Metadata cache
- C) Persisted query results (result cache)
- D) Materialized view automatic rewrite
---
## Q3 (Single Answer)
Which of the following queries would NOT benefit from the persisted query results cache, even if it was previously executed and the underlying data has not changed?

- A) `SELECT COUNT(*) FROM sales WHERE region = 'US'`
- B) `SELECT customer_id, name FROM customers WHERE customer_id = 100`
- C) `SELECT UUID_STRING(), CURRENT_TIMESTAMP() FROM orders LIMIT 1`
- D) `SELECT DISTINCT product_category FROM products`
---
## Q4 (Single Answer)
A data analyst runs `SELECT COUNT(*), MIN(order_date), MAX(order_date) FROM orders;` and notices the query returns almost instantly without starting a warehouse. Which caching layer is most likely responsible?

- A) Persisted query results cache
- B) Warehouse local disk cache
- C) Metadata cache in the cloud services layer
- D) Search optimization access path
---
## Q5 (Multi Answer - Select 2)
Which TWO pieces of information does Snowflake store as metadata for each micro-partition?

- A) The range of values for each column in the micro-partition
- B) The SQL statements that created the data in the micro-partition
- C) The number of distinct values for each column
- D) The user who last modified the micro-partition
- E) The warehouse that was used to load the data
---
## Q6 (Single Answer)
A data engineer is reviewing the Query Profile and sees that only 5 out of 1,000 micro-partitions were scanned for a query that filters on a date column. What concept does this illustrate?

- A) Query acceleration
- B) Micro-partition pruning
- C) Data spilling
- D) Result caching
---
## Q7 (Single Answer)
What is the primary use case for a Snowpark-optimized warehouse compared to a standard warehouse?

- A) Faster query execution for simple SELECT statements
- B) Running workloads with large memory requirements such as ML model training
- C) Reducing compute costs for data loading operations
- D) Improving concurrency for multiple simultaneous users
---
## Q8 (Single Answer)
A Snowpark-optimized warehouse is created with the default RESOURCE_CONSTRAINT setting. How much more memory per node does it provide compared to a standard warehouse of the same size?

- A) 2x more memory
- B) 4x more memory
- C) 8x more memory
- D) 16x more memory
---
## Q9 (Single Answer)
A multi-cluster warehouse is configured with MIN_CLUSTER_COUNT = 1 and MAX_CLUSTER_COUNT = 3. What mode is this warehouse operating in?

- A) Maximized mode
- B) Auto-scale mode
- C) Economy mode
- D) Standard mode
---
## Q10 (Single Answer)
A company wants to minimize credit consumption for their multi-cluster warehouse while still handling concurrency spikes. Which scaling policy should they choose?

- A) Standard scaling policy — starts a new cluster as soon as a query is queued
- B) Economy scaling policy — starts a new cluster only if there is enough work to keep it busy for at least 6 minutes
- C) Conservative scaling policy — starts a new cluster after 10 minutes of queued queries
- D) Balanced scaling policy — starts a new cluster after 3 minutes of queued queries
---
## Q11 (Multi Answer - Select 2)
Which TWO statements are TRUE about multi-cluster warehouse auto-suspension behavior?

- A) Individual clusters within a multi-cluster warehouse can be auto-suspended independently
- B) Auto-suspend applies to the entire multi-cluster warehouse, not individual clusters
- C) Auto-resume only applies when the entire warehouse is suspended (no clusters running)
- D) Each cluster in a multi-cluster warehouse has its own auto-suspend timer
- E) Auto-resume is triggered whenever any single cluster is suspended
---
## Q12 (Single Answer)
A Standard Gen1 warehouse of size Large runs for exactly 2 hours. How many credits are consumed?

- A) 4 credits
- B) 8 credits
- C) 16 credits
- D) 32 credits
---
## Q13 (Single Answer)
A Medium-sized multi-cluster warehouse with 3 clusters runs in Maximized mode for 1 hour. How many total credits are consumed?

- A) 4 credits
- B) 8 credits
- C) 12 credits
- D) 16 credits
---
## Q14 (Single Answer)
A team is experiencing slow performance on complex analytical queries that take a long time to complete. The team currently uses an X-Small warehouse. What approach would BEST improve the performance of these individual queries?

- A) Enable multi-clustering on the warehouse
- B) Resize the warehouse to a larger size
- C) Change the scaling policy to Standard
- D) Set the AUTO_SUSPEND to a higher value
---
## Q15 (Multi Answer - Select 2)
Which TWO scenarios are BEST addressed by scaling out (using multi-cluster warehouses) rather than scaling up (resizing the warehouse)?

- A) A single complex ETL query is running slowly
- B) Many concurrent BI users are experiencing query queuing during peak hours
- C) A data loading job with hundreds of large files is taking too long
- D) Seasonal traffic spikes cause many users to submit queries simultaneously
- E) A single aggregation query on a 10 TB table needs to run faster
---
## Q16 (Single Answer)
Which type of workload is MOST likely to benefit from the Query Acceleration Service (QAS)?

- A) A highly concurrent workload with many identical, simple queries
- B) Ad hoc analytics with large scans and selective filters on unpredictable data volumes
- C) A steady batch loading process that inserts data every hour
- D) Simple point-lookup queries on small tables
---
## Q17 (Multi Answer - Select 2)
Which TWO SQL commands can be accelerated by the Query Acceleration Service (QAS)?

- A) CREATE VIEW
- B) SELECT
- C) DELETE
- D) CREATE TABLE AS SELECT (CTAS)
- E) ALTER TABLE
---
## Q18 (Single Answer)
What function can you use to determine whether a specific previously-executed query would benefit from the Query Acceleration Service?

- A) SYSTEM$CLUSTERING_INFORMATION
- B) SYSTEM$ESTIMATE_QUERY_ACCELERATION
- C) SYSTEM$EXPLAIN_PLAN_JSON
- D) SYSTEM$QUERY_ACCELERATION_HISTORY
---
## Q19 (Single Answer)
Which statement about materialized views in Snowflake is TRUE?

- A) Materialized views require the user to manually refresh them after changes to the base table
- B) The query optimizer can automatically rewrite queries against the base table to use a materialized view
- C) Materialized views do not incur any additional storage costs
- D) Materialized views are available in all Snowflake editions including Standard Edition
---
## Q20 (Multi Answer - Select 2)
Which TWO criteria BEST indicate that a materialized view should be created instead of a regular view?

- A) The query results change very frequently due to constant updates to the base table
- B) The query is resource-intensive and consumes significant processing time
- C) The query results are used infrequently, only once per quarter
- D) The base table data changes infrequently relative to how often the view is queried
- E) The query is simple and returns results quickly without optimization
---
## Q21 (Single Answer)
A data engineer needs to improve query performance on a 5 TB table that is frequently filtered by a `region` column and a `transaction_date` column. The `region` column has 10 distinct values and `transaction_date` has approximately 1,800 distinct values. What is the recommended column order for the clustering key?

- A) `CLUSTER BY (transaction_date, region)` — higher cardinality first
- B) `CLUSTER BY (region, transaction_date)` — lower cardinality first
- C) `CLUSTER BY (region)` — only the lowest cardinality column
- D) `CLUSTER BY (transaction_date)` — only the column with date values
---
## Q22 (Single Answer)
Which statement about Automatic Clustering in Snowflake is TRUE?

- A) Automatic Clustering requires the user to designate a virtual warehouse for reclustering operations
- B) Automatic Clustering uses serverless compute resources managed by Snowflake
- C) Automatic Clustering blocks DML operations while reclustering is in progress
- D) Automatic Clustering cannot be suspended once it is enabled on a table
---
## Q23 (Single Answer)
What persistent data structure does the Search Optimization Service create to improve query performance?

- A) Clustering key index
- B) Search access path
- C) Materialized view cache
- D) Micro-partition index tree
---
## Q24 (Multi Answer - Select 2)
Which TWO types of queries are MOST likely to benefit from the Search Optimization Service?

- A) Queries that aggregate all rows in a large table (e.g., full table scans)
- B) Selective point lookup queries that return a small number of rows
- C) Queries that filter on semi-structured VARIANT columns using equality predicates
- D) Queries that join two tables without any filter predicates
- E) Queries that use ORDER BY without any WHERE clause
---
## Q25 (Single Answer)
How long are persisted query results (result cache) retained before they expire?

- A) 1 hour
- B) 12 hours
- C) 24 hours
- D) 7 days
---
## Q26 (Multi Answer - Select 2)
Which TWO statements are TRUE about Snowflake's cloud services billing adjustment?

- A) Cloud services are billed only if daily cloud services consumption exceeds 10% of daily virtual warehouse usage
- B) The 10% adjustment is calculated on a monthly basis
- C) Serverless compute usage counts toward the 10% adjustment threshold
- D) The 10% adjustment is calculated daily in the UTC time zone
- E) Cloud services are always billed at full rate regardless of warehouse usage
---
## Q27 (Single Answer)
A company wants to monitor and control credit usage across BOTH virtual warehouses AND serverless features like Snowpipe and Automatic Clustering. Which tool should they use?

- A) Resource monitors
- B) Snowflake Budgets
- C) WAREHOUSE_METERING_HISTORY view
- D) Account-level resource monitor
---
## Q28 (Multi Answer - Select 2)
Which TWO actions can a resource monitor perform when a credit threshold is reached?

- A) Automatically resize the warehouse to a smaller size
- B) Send a notification to account administrators
- C) Suspend all assigned warehouses after current statements complete
- D) Automatically drop the warehouse
- E) Reduce the number of clusters in a multi-cluster warehouse
---
## Q29 (Single Answer)
Which Snowflake feature incurs data transfer costs?

- A) Loading data from an S3 bucket in the same region as the Snowflake account
- B) Querying data from a table within the same Snowflake account
- C) Replicating a database to a Snowflake account in a different cloud region
- D) Retrieving query results from the result cache
---
## Q30 (Multi Answer - Select 2)
Which TWO of the following are classified as serverless features in Snowflake that consume Snowflake-managed compute resources (not user-managed virtual warehouses)?

- A) Running a SELECT query on a standard warehouse
- B) Automatic Clustering maintenance
- C) Loading data via a COPY INTO command on a user warehouse
- D) Snowpipe continuous data loading
- E) Manually running a stored procedure on a virtual warehouse
---
## Q31 (Single Answer)
A data engineer wants to understand the impact of auto-suspend settings on warehouse cache performance. For a warehouse that runs frequent BI reporting queries, what is Snowflake's recommended minimum auto-suspend time?

- A) 1 minute (immediate)
- B) 5 minutes
- C) 10 minutes
- D) 30 minutes
---
## Q32 (Single Answer)
Which Snowflake schema provides up to 365 days of historical data about warehouse metering, query history, and credit consumption for cost analysis and monitoring?

- A) INFORMATION_SCHEMA
- B) SNOWFLAKE.ACCOUNT_USAGE
- C) SNOWFLAKE.ORGANIZATION_USAGE
- D) SNOWFLAKE.READER_ACCOUNT_USAGE
---
## Q33 (Single Answer)
A warehouse cache is dropped when which event occurs?

- A) A new query is submitted to the warehouse
- B) The warehouse is resized to a larger size
- C) The warehouse is suspended
- D) The auto-resume setting is triggered
---
## Q34 (Single Answer)
Which parameter controls whether Snowflake reuses persisted query results for subsequent identical queries?

- A) ENABLE_QUERY_CACHE
- B) USE_CACHED_RESULT
- C) RESULT_REUSE_ENABLED
- D) CACHE_TTL_SECONDS
---
## Q35 (Single Answer)
A BI team runs the same dashboard queries repeatedly throughout the day. Which auto-suspend setting does Snowflake recommend for their warehouse to maximize cache benefits?

- A) Immediate (0 seconds)
- B) 5 minutes
- C) At least 10 minutes
- D) 60 minutes
---
## Q36 (Single Answer)
What is the maximum number of days that a persisted query result can be retained if it is continuously reused?

- A) 7 days
- B) 14 days
- C) 24 days
- D) 31 days
---
## Q37 (Single Answer)
Which SQL function allows you to query the result set of a previously executed query, including SHOW or DESCRIBE commands?

- A) QUERY_HISTORY()
- B) RESULT_SCAN()
- C) LAST_QUERY_RESULT()
- D) GET_QUERY_RESULT()
---
## Q38 (Multi Answer - Select 2)
A persisted query result will NOT be reused in which TWO of the following situations? (Choose two.)

- A) The underlying table data has not changed since the original query
- B) The new query uses a different table alias than the original query
- C) The same role that ran the original query is running the new query
- D) The query contains a call to the RANDOM() function
- E) The query uses a WHERE clause with a constant value
---
## Q39 (Single Answer)
An X-Small Gen1 warehouse runs for exactly 90 seconds. How many credits are consumed?

- A) 0.025 credits
- B) 0.042 credits
- C) 0.5 credits
- D) 1.0 credit
---
## Q40 (Single Answer)
A 2X-Large Gen1 standard warehouse consumes how many credits per hour?

- A) 16 credits
- B) 32 credits
- C) 64 credits
- D) 128 credits
---
## Q41 (Single Answer)
Which statement is TRUE about resizing a warehouse while it is actively running queries?

- A) Resizing is not allowed while queries are running; the warehouse must first be suspended
- B) Additional resources become available to newly submitted or queued queries, but not to already-running queries
- C) All currently running queries are cancelled and restarted at the new size
- D) The resize takes effect immediately for all running queries
---
## Q42 (Single Answer)
Which Snowflake edition is required to use multi-cluster warehouses?

- A) Standard Edition
- B) Business Critical Edition
- C) Enterprise Edition or higher
- D) Virtual Private Snowflake only
---
## Q43 (Single Answer)
In a multi-cluster warehouse running in Maximized mode with MAX_CLUSTER_COUNT = MIN_CLUSTER_COUNT = 4, what happens when the warehouse starts?

- A) One cluster starts, and additional clusters start as queries queue
- B) All 4 clusters start immediately when the warehouse is started
- C) Clusters start one at a time as load increases
- D) Two clusters start by default, and the remaining two are held in reserve
---
## Q44 (Multi Answer - Select 2)
Which TWO statements about the Economy scaling policy for multi-cluster warehouses are TRUE? (Choose two.)

- A) It starts additional clusters as soon as a single query is queued
- B) It only starts additional clusters if estimated load is enough to keep the cluster busy for at least 6 minutes
- C) It favors performance over credit conservation
- D) It conserves credits by favoring keeping running clusters fully loaded
- E) It is the default scaling policy for new multi-cluster warehouses
---
## Q45 (Single Answer)
A company sets QUERY_ACCELERATION_MAX_SCALE_FACTOR = 0 on their warehouse. What does this mean?

- A) Query acceleration is disabled for the warehouse
- B) Query acceleration is limited to zero additional compute resources
- C) The upper bound on additional compute resources is removed; queries can use as many as available
- D) Only queries with zero partitions scanned will be accelerated
---
## Q46 (Single Answer)
Which view in ACCOUNT_USAGE can be queried to identify which past queries are eligible for Query Acceleration Service?

- A) QUERY_HISTORY
- B) WAREHOUSE_LOAD_HISTORY
- C) QUERY_ACCELERATION_ELIGIBLE
- D) QUERY_PERFORMANCE_HISTORY
---
## Q47 (Single Answer)
Which of the following is a common reason a query is ineligible for the Query Acceleration Service?

- A) The query uses a SELECT * statement
- B) There are not enough partitions in the scan to justify the overhead of acquiring QAS resources
- C) The warehouse size is X-Small
- D) The query uses a subquery in the FROM clause
---
## Q48 (Multi Answer - Select 2)
Which TWO query patterns are eligible for Query Acceleration Service (QAS)? (Choose two.)

- A) Large scans with an aggregation or selective filter
- B) Simple point lookups returning a single row via a unique key
- C) Large scans that insert or copy many new rows using INSERT or COPY commands
- D) Queries that join two small lookup tables
- E) COUNT(*) queries answered entirely from metadata cache
---
## Q49 (Single Answer)
What is the default value of QUERY_ACCELERATION_MAX_SCALE_FACTOR when a warehouse is created with QAS enabled?

- A) 0
- B) 4
- C) 8
- D) 16
---
## Q50 (Single Answer)
A data team wants to enable the Query Acceleration Service for their warehouse. Which SQL command achieves this?

- A) `ALTER WAREHOUSE my_wh SET USE_QUERY_ACCELERATION = TRUE;`
- B) `ALTER WAREHOUSE my_wh SET ENABLE_QUERY_ACCELERATION = TRUE;`
- C) `CREATE QUERY ACCELERATION ON WAREHOUSE my_wh;`
- D) `ALTER WAREHOUSE my_wh ENABLE ACCELERATION;`
---
## Q51 (Single Answer)
A table has a clustering depth of 1. What does this indicate about the table's data?

- A) The table is poorly clustered and needs immediate reclustering
- B) The table is empty and has no micro-partitions
- C) The table is optimally clustered with minimal overlap in micro-partition value ranges
- D) Each micro-partition contains exactly 1 row
---
## Q52 (Single Answer)
Which system function provides information about the clustering depth and overlap statistics for a specific table?

- A) SYSTEM$CLUSTERING_DEPTH()
- B) SYSTEM$PARTITION_STATS()
- C) SYSTEM$CLUSTERING_INFORMATION()
- D) SYSTEM$TABLE_HEALTH()
---
## Q53 (Single Answer)
When does Snowflake perform Automatic Clustering on a clustered table?

- A) Automatically on a fixed daily schedule regardless of table state
- B) Only when the user manually triggers a RECLUSTER operation
- C) Only when the table would benefit from the reclustering operation
- D) Every time a DML operation is performed on the table
---
## Q54 (Multi Answer - Select 2)
Which TWO statements about reclustering costs are TRUE? (Choose two.)

- A) Reclustering only consumes compute credits and never incurs additional storage costs
- B) Reclustering consumes credits using serverless compute resources
- C) Original micro-partitions from before reclustering are immediately deleted to free storage
- D) Reclustering can incur additional storage costs because original micro-partitions are retained for Time Travel and Fail-safe
- E) Reclustering is free of charge and only applies for tables under 1 TB
---
## Q55 (Single Answer)
A developer is working with a large sales table that has millions of micro-partitions. They notice the table's `automatic_clustering` column shows "OFF" in the SHOW TABLES output. How can they resume Automatic Clustering?

- A) `ALTER TABLE sales ENABLE CLUSTERING;`
- B) `ALTER TABLE sales RESUME RECLUSTER;`
- C) `CREATE CLUSTERING KEY ON sales (sale_date);`
- D) `ALTER TABLE sales SET AUTO_CLUSTER = TRUE;`
---
## Q56 (Single Answer)
A team adds the SEARCH OPTIMIZATION property to a table using `ALTER TABLE t ADD SEARCH OPTIMIZATION`. How soon can queries benefit from search optimization?

- A) Immediately, for all queries on the table
- B) Only after the search access path has been fully built by the background maintenance service
- C) After the next DML operation on the table triggers a rebuild
- D) After a virtual warehouse runs the OPTIMIZE TABLE command
---
## Q57 (Single Answer)
Which SQL command enables the Search Optimization Service for a specific table?

- A) `CREATE SEARCH INDEX ON my_table;`
- B) `ALTER TABLE my_table ADD SEARCH OPTIMIZATION;`
- C) `ALTER TABLE my_table ENABLE SEARCH OPTIMIZATION = TRUE;`
- D) `CREATE SEARCH OPTIMIZATION ON my_table;`
---
## Q58 (Multi Answer - Select 3)
Which THREE types of queries are supported by the Search Optimization Service? (Choose three.)

- A) Selective point lookup queries that return a small number of distinct rows
- B) Full table aggregation queries like `SELECT COUNT(*) FROM large_table`
- C) Substring and regular expression searches using LIKE or RLIKE
- D) Queries on VARIANT, OBJECT, or ARRAY columns using equality predicates
- E) Queries using ORDER BY without any WHERE clause
---
## Q59 (Single Answer)
Which of the following is a key limitation of materialized views in Snowflake?

- A) Materialized views can only be queried using a virtual warehouse; cloud services layer cannot access them
- B) A materialized view can query only a single base table; joins are not supported
- C) Materialized views cannot be clustered
- D) Materialized views are only available in Standard Edition
---
## Q60 (Single Answer)
Which statement correctly describes how the Snowflake query optimizer interacts with materialized views?

- A) You must explicitly specify the materialized view name in the query for it to be used
- B) The query optimizer can automatically rewrite queries against the base table to use a materialized view
- C) Materialized views are only used when you set a session-level parameter to enable them
- D) The optimizer only uses materialized views for aggregation queries, not SELECT * queries
---
## Q61 (Single Answer)
A materialized view is automatically maintained by Snowflake. Which type of compute resource is used for this maintenance?

- A) The virtual warehouse that created the materialized view
- B) A user-designated warehouse specified in the CREATE MATERIALIZED VIEW statement
- C) Serverless compute resources provided by Snowflake
- D) The SYSTEM$MATERIALIZED_VIEW_WH default warehouse shared across all accounts
---
## Q62 (Single Answer)
A query against a base table returns instantly because the same query was executed 2 hours ago and the data hasn't changed. However, no virtual warehouse credits were consumed. Which feature explains this?

- A) Warehouse local disk cache
- B) Metadata cache
- C) Materialized view automatic rewrite
- D) Persisted query results (result cache)
---
## Q63 (Multi Answer - Select 2)
Which TWO statements about materialized view maintenance costs are TRUE? (Choose two.)

- A) Resource monitors can be used to control and limit materialized view maintenance credit usage
- B) Materialized view maintenance consumes serverless compute credits
- C) Materialized views do not incur any storage costs, only compute costs
- D) Each materialized view stores query results which adds to monthly storage usage
- E) Materialized view maintenance costs are fixed regardless of how frequently the base table changes
---
## Q64 (Single Answer)
Which ACCOUNT_USAGE view would you query to analyze historical credit consumption from materialized view maintenance?

- A) WAREHOUSE_METERING_HISTORY
- B) AUTOMATIC_CLUSTERING_HISTORY
- C) MATERIALIZED_VIEW_REFRESH_HISTORY
- D) SERVERLESS_TASK_HISTORY
---
## Q65 (Single Answer)
A data engineer runs `SELECT * FROM sales WHERE order_date = '2024-01-15' AND region = 'APAC'`. The query scans only 3 out of 5,000 micro-partitions. Which TWO features are most directly responsible for this?

- A) Warehouse local disk cache and QAS
- B) Clustering key on order_date and region, enabling micro-partition pruning
- C) Search Optimization Service and result cache
- D) Materialized view automatic rewrite
---
## Q66 (Single Answer)
What happens to the warehouse local disk cache (SSD cache) when a warehouse is suspended?

- A) The cache is preserved and remains available when the warehouse resumes
- B) The cache is dropped when the warehouse is suspended
- C) The cache is written to remote cloud storage for retrieval upon resume
- D) The cache remains available for 24 hours after suspension
---
## Q67 (Multi Answer - Select 2)
Which TWO actions are NOT available as responses when a resource monitor's credit threshold is reached? (Choose two.)

- A) Notify account administrators via email
- B) Automatically resize the warehouse to a smaller size
- C) Suspend all assigned warehouses after current queries complete
- D) Drop all assigned warehouses permanently
- E) Suspend all assigned warehouses immediately
---
## Q68 (Single Answer)
A developer wants to understand why a query is using excessive memory and spilling to disk. Which tool in Snowsight provides a visual, step-by-step breakdown of query execution including spill statistics?

- A) QUERY_HISTORY view
- B) WAREHOUSE_LOAD_HISTORY view
- C) Query Profile
- D) EXPLAIN command output
---
## Q69 (Single Answer)
Which command generates an explain plan for a SQL query WITHOUT actually executing it?

- A) DESCRIBE QUERY <sql>
- B) EXPLAIN <sql>
- C) PROFILE <sql>
- D) ANALYZE <sql>
---
## Q70 (Single Answer)
A BI analyst notices that the `bytes_spilled_to_remote_storage` value is non-zero for queries on a warehouse with Query Acceleration Service enabled. They are concerned this indicates a performance problem. What does Snowflake's documentation say about this?

- A) Non-zero remote spill always indicates a critical performance problem requiring immediate action
- B) When QAS is enabled, a small amount of data is written to remote storage for each eligible query; this is expected and not a cause for concern
- C) QAS never causes remote storage spills; the spills must be from unrelated queries
- D) The QAS scale factor should be increased to eliminate all remote spills
---
## Q71 (Single Answer)
Which ACCOUNT_USAGE columns track data spillage for query analysis? (Choose the most complete and accurate answer.)

- A) BYTES_READ and BYTES_WRITTEN
- B) BYTES_SPILLED_TO_LOCAL_STORAGE and BYTES_SPILLED_TO_REMOTE_STORAGE
- C) LOCAL_SPILL_MB and REMOTE_SPILL_MB
- D) MEMORY_OVERFLOW_BYTES and DISK_OVERFLOW_BYTES
---
## Q72 (Multi Answer - Select 2)
Which TWO approaches does Snowflake recommend to address a query that is spilling data to remote storage? (Choose two.)

- A) Add a clustering key to the table
- B) Use a larger warehouse size to increase available memory
- C) Enable the Search Optimization Service on the table
- D) Process the data in smaller batches
- E) Create a materialized view for the spilling query
---
## Q73 (Single Answer)
A company's warehouse is running in Auto-scale mode with MIN=1 and MAX=5 and Standard scaling policy. Under what condition does Snowflake start an additional cluster?

- A) Only when there is estimated to be enough work to keep the cluster busy for at least 6 minutes
- B) When a query is queued or Snowflake estimates the running clusters don't have enough resources for additional queries
- C) When all currently running queries have been running for more than 30 seconds
- D) When at least 50% of the running cluster's CPU is utilized
---
## Q74 (Single Answer)
What is the maximum number of clusters supported for an X-Small multi-cluster warehouse?

- A) 10
- B) 80
- C) 160
- D) 300
---
## Q75 (Multi Answer - Select 3)
Which THREE of the following are TRUE about Snowflake micro-partitions? (Choose three.)

- A) Each micro-partition contains between 50 MB and 500 MB of uncompressed data
- B) Micro-partitions are created and managed manually by users
- C) Columns are stored independently within micro-partitions (columnar storage)
- D) Micro-partitions can overlap in their range of values
- E) Micro-partitions are the same size as traditional static database partitions
---
## Q76 (Single Answer)
Which Snowflake Information Schema function (not ACCOUNT_USAGE) can be used to view the credit consumption history for Query Acceleration Service within a short recent time window?

- A) SYSTEM$ESTIMATE_QUERY_ACCELERATION()
- B) TABLE(INFORMATION_SCHEMA.QUERY_ACCELERATION_HISTORY(...))
- C) SYSTEM$QUERY_ACCELERATION_CREDITS()
- D) TABLE(INFORMATION_SCHEMA.SERVERLESS_CREDITS(...))
---
## Q77 (Single Answer)
A data engineer wants to check whether a specific previously-executed query (with a known query ID) would benefit from the Query Acceleration Service. Which function should they use?

- A) SYSTEM$CLUSTERING_INFORMATION('<query_id>')
- B) SYSTEM$ESTIMATE_QUERY_ACCELERATION('<query_id>')
- C) SYSTEM$EXPLAIN_PLAN_JSON('<query_id>')
- D) SYSTEM$QUERY_PROFILE('<query_id>')
---
## Q78 (Multi Answer - Select 2)
Which TWO statements about the INFORMATION_SCHEMA versus ACCOUNT_USAGE schema are TRUE? (Choose two.)

- A) INFORMATION_SCHEMA data is typically available with latency up to 45 minutes
- B) ACCOUNT_USAGE retains historical query data for up to 365 days
- C) INFORMATION_SCHEMA retains query history for 365 days
- D) ACCOUNT_USAGE data may have latency of up to 45 minutes before appearing in views
- E) Both schemas store identical data with the same retention periods
---
## Q79 (Single Answer)
A data engineer is choosing between Search Optimization Service and Automatic Clustering for a large table that is frequently queried with selective equality predicates on a high-cardinality column (e.g., `WHERE user_id = 12345`). Which feature is more appropriate?

- A) Automatic Clustering — because high cardinality columns are ideal clustering keys
- B) Search Optimization Service — because it is designed for selective point lookup queries
- C) Both are equally effective; choose based on storage cost
- D) Neither feature helps with equality predicates; use QAS instead
---
## Q80 (Multi Answer - Select 2)
Which TWO statements correctly describe the caching hierarchy in Snowflake, from fastest/cheapest to slowest/most expensive? (Choose two.)

- A) Remote cloud storage → Warehouse local SSD cache → Result cache
- B) Result cache requires no warehouse and returns results at no compute cost
- C) Warehouse local SSD cache persists indefinitely regardless of warehouse state
- D) Result cache expires after 24 hours; warehouse cache is dropped when the warehouse suspends
- E) All three cache types (result, local SSD, and metadata) are part of the virtual warehouse
