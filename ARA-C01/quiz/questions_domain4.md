# Domain 4: Performance Optimization

---

## Q1 (Scenario)
A solutions architect examines a Query Profile and sees that the TableScan operator shows "Partitions scanned: 800 out of 10,000" and "Bytes scanned: 2.4 TB." The query filters on a DATE column that is not the natural clustering key. Which action will MOST effectively reduce the partitions scanned?
- A) Increase the virtual warehouse size from Medium to X-Large
- B) Add a clustering key on the DATE column used in the filter predicate
- C) Enable the Search Optimization Service on the table
- D) Enable the Query Acceleration Service on the warehouse

---

## Q2 (Single Answer)
Which metadata function can be used to determine how well a table is clustered with respect to a given set of columns WITHOUT defining a clustering key?
- A) SYSTEM$CLUSTERING_INFORMATION
- B) SYSTEM$CLUSTERING_DEPTH
- C) SYSTEM$CLUSTERING_RATIO
- D) SYSTEM$PARTITION_INFO

---

## Q3 (Scenario)
A data engineering team notices that a 4XL warehouse frequently shows "Bytes spilling to remote storage" in the Query Profile for large aggregation queries. The queries process approximately 5 TB of data each. What is the MOST cost-effective first step to address this?
- A) Scale up to a 5X-Large or 6X-Large warehouse
- B) Break the queries into smaller subqueries using temporary tables
- C) Enable the Query Acceleration Service on the warehouse
- D) Switch to a Snowpark-optimized warehouse for increased local storage

---

## Q4 (Multi Answer - Select 2)
Which TWO statements about warehouse spilling are correct? (Select TWO)
- A) Spilling to local storage has no performance impact compared to in-memory processing
- B) Spilling to remote storage is significantly slower than spilling to local storage
- C) Snowpark-optimized warehouses provide more local SSD storage to reduce remote spilling
- D) Spilling can be eliminated by increasing the warehouse's auto-suspend timeout
- E) Spilling only occurs during COPY INTO operations, not during query processing

---

## Q5 (Scenario)
An architect reviews a Query Profile and sees that the "Remote Disk I/O" statistic is high while "Local Disk I/O" is minimal. The query involves a hash join between a 500 GB fact table and a 200 GB dimension table. What does this indicate?
- A) The result cache has expired and the query had to re-execute from scratch
- B) The warehouse does not have enough memory, causing data to spill past local storage to remote storage
- C) The query is scanning too many micro-partitions due to poor clustering
- D) The metadata cache is stale and needs to be refreshed

---

## Q6 (Single Answer)
What is the maximum number of clustering key columns that Snowflake recommends for a single table?
- A) 2
- B) 3 to 4
- C) 8
- D) There is no limit; it depends on the cardinality of the columns

---

## Q7 (Scenario)
A retail company has a 10 TB orders table clustered on ORDER_DATE. Analysts frequently query by REGION and ORDER_DATE together. The SYSTEM$CLUSTERING_INFORMATION function shows an average clustering depth of 12 for the REGION column alone. What should the architect recommend?
- A) Drop the existing clustering key and create a new one on REGION only
- B) Alter the clustering key to include both REGION and ORDER_DATE, placing the lower-cardinality column first
- C) Create a materialized view clustered on REGION
- D) Enable the Search Optimization Service for REGION lookups

---

## Q8 (Single Answer)
When defining a multi-column clustering key, which column ordering principle yields the BEST partition pruning for most queries?
- A) Place the highest-cardinality column first
- B) Place the column most frequently used in JOIN conditions first
- C) Place the lowest-cardinality column first, followed by higher-cardinality columns
- D) Place columns in alphabetical order for consistency

---

## Q9 (Multi Answer - Select 2)
Which TWO query patterns benefit MOST from the Search Optimization Service? (Select TWO)
- A) Equality predicates on high-cardinality string columns (e.g., WHERE email = 'user@example.com')
- B) Full table scan aggregations (e.g., SELECT SUM(amount) FROM transactions)
- C) Queries using SEARCH on semi-structured VARIANT columns for specific field values
- D) Queries that join two large tables on their respective clustering keys
- E) Queries using ORDER BY with LIMIT on a non-clustered column

---

## Q10 (Scenario)
An architect observes that a critical dashboard query consistently takes 45 seconds. The Query Profile shows that 90% of the time is spent in a single TableScan operator scanning 200,000 micro-partitions out of 200,000 total. The table has no clustering key and the query filters on a VARCHAR customer_id column with millions of unique values. Which optimization strategy is MOST appropriate?
- A) Define a clustering key on customer_id
- B) Enable the Search Optimization Service targeting the customer_id column
- C) Increase the warehouse size to reduce scan time
- D) Create a materialized view pre-filtered on frequently queried customer IDs

---

## Q11 (Single Answer)
What happens when a virtual warehouse is resized from X-Large to Medium while queries are running?
- A) The running queries are immediately terminated and must be re-submitted
- B) The running queries complete using the current resources, and the next query uses the new size
- C) The resize is rejected because queries are currently running
- D) The running queries are suspended and resumed after the resize completes

---

## Q12 (Scenario)
A company runs a nightly batch ETL process that takes 3 hours on an XL warehouse. The warehouse is configured with AUTO_SUSPEND = 600 (10 minutes). During the day, the warehouse is used for ad-hoc queries with an average of 5 queries per hour. An architect wants to reduce costs. Which change provides the MOST savings?
- A) Reduce AUTO_SUSPEND to 60 seconds for the daytime ad-hoc workload
- B) Increase the warehouse size to 2XL to make the ETL run faster
- C) Disable AUTO_RESUME to prevent accidental warehouse starts
- D) Create two separate warehouses — one for ETL and one for ad-hoc — with appropriate AUTO_SUSPEND settings

---

## Q13 (Single Answer)
An auto-scaling multi-cluster warehouse is configured with MIN_CLUSTER_COUNT = 1 and MAX_CLUSTER_COUNT = 6, using the STANDARD scaling policy. When does Snowflake start an additional cluster?
- A) When any query is queued for more than 1 second
- B) When the system estimates that there is enough query load to keep another cluster busy for at least 6 minutes
- C) When more than 8 queries are concurrently executing on the current cluster
- D) When warehouse memory usage exceeds 80%

---

## Q14 (Multi Answer - Select 2)
Which TWO differences between STANDARD and ECONOMY scaling policies for multi-cluster warehouses are correct? (Select TWO)
- A) STANDARD starts additional clusters more aggressively to minimize queuing
- B) ECONOMY waits until query queuing has occurred for at least 6 minutes before starting a new cluster
- C) STANDARD can use up to 10 clusters while ECONOMY is limited to 3
- D) ECONOMY clusters run at reduced compute capacity compared to STANDARD clusters
- E) STANDARD scaling policy is only available on Business Critical edition

---

## Q15 (Scenario)
A financial analytics team experiences severe query queuing during end-of-month reporting. They currently use a single Large warehouse. The queries are mostly small, fast queries (under 10 seconds each) but hundreds run concurrently. Which solution BEST addresses this?
- A) Scale up to a 4X-Large warehouse
- B) Configure a multi-cluster warehouse with auto-scaling (MAX_CLUSTER_COUNT = 10)
- C) Enable the Query Acceleration Service on the warehouse
- D) Distribute queries across multiple separate warehouses using client-side routing

---

## Q16 (Single Answer)
Which Snowflake cache layer stores the results of previously executed queries and can return them without any warehouse compute?
- A) Metadata cache
- B) Local disk cache (SSD)
- C) Result cache
- D) Warehouse cache

---

## Q17 (Scenario)
An analyst runs an identical query twice within 15 minutes. The first execution takes 30 seconds, but the second returns instantly. The analyst then modifies the underlying table with a single INSERT statement and reruns the same query, which again takes 30 seconds. Which cache behavior explains this?
- A) The metadata cache was invalidated by the INSERT, forcing a full recompute
- B) The result cache returned the second execution instantly, but the INSERT invalidated the cached result, requiring full re-execution on the third run
- C) The warehouse data cache (SSD) was cleared by the INSERT operation
- D) The query was recompiled because the table statistics changed after the INSERT

---

## Q18 (Single Answer)
How long does Snowflake retain query results in the result cache before they expire?
- A) 1 hour
- B) 12 hours
- C) 24 hours
- D) 24 hours, but the counter resets each time the result is reused

---

## Q19 (Multi Answer - Select 2)
Which TWO conditions will cause a previously cached query result to NOT be returned from the result cache? (Select TWO)
- A) The underlying table data has been modified since the result was cached
- B) The query is executed by a different user in the same role
- C) The micro-partitions referenced by the query have changed
- D) The query includes a non-deterministic function such as CURRENT_TIMESTAMP()
- E) The warehouse used to run the query has been resized since the cached result was stored

---

## Q20 (Scenario)
An architect notices that a warehouse running repeated identical queries is still consuming significant credits. Investigation reveals that each query includes CURRENT_DATE() in the SELECT list. What should the architect recommend?
- A) Increase the result cache retention period using an account parameter
- B) Remove CURRENT_DATE() from the query and calculate the date in the application layer, or use a session variable bound before the query
- C) Enable the metadata cache for the warehouse to override the result cache limitation
- D) Switch to a multi-cluster warehouse to reduce per-query credit consumption

---

## Q21 (Scenario)
A data architect examines the Query Profile for a slow-running query and notices a Join operator with a "Build" side processing 500 million rows and a "Probe" side processing 50 million rows. What is the MOST likely performance issue?
- A) The smaller table should be on the Build side, not the larger table
- B) The join is missing an ON clause, causing a Cartesian product
- C) The query needs a clustering key on both tables
- D) The warehouse is too small to handle the join in memory

---

## Q22 (Single Answer)
In the Query Profile, which operator indicates that data is being redistributed across compute nodes to align join keys?
- A) Aggregate
- B) WindowFunction
- C) JoinFilter
- D) Exchange

---

## Q23 (Scenario)
An enterprise runs a complex query that joins 8 tables. The Query Profile reveals significant "Bytes sent over the network" in multiple Exchange operators. The query takes 12 minutes. Which approach is MOST likely to reduce network overhead?
- A) Add clustering keys to all 8 tables on their join columns
- B) Rewrite the query to use common table expressions (CTEs) instead of subqueries
- C) Increase the warehouse size so that each node processes less data per partition
- D) Pre-aggregate or denormalize the data to reduce the number of joins required

---

## Q24 (Multi Answer - Select 2)
Which TWO Query Profile statistics are MOST useful for identifying that a warehouse needs to be scaled up (larger size)? (Select TWO)
- A) Percentage of partitions scanned vs. total partitions
- B) Bytes spilled to local storage and bytes spilled to remote storage
- C) Number of queries queued in the warehouse
- D) Total execution time dominated by a few operators processing large amounts of data
- E) Result cache hit ratio

---

## Q25 (Single Answer)
What is the primary purpose of the Query Acceleration Service (QAS)?
- A) To automatically add clustering keys to tables based on query patterns
- B) To offload portions of a query's processing to shared compute resources for queries that have large scans
- C) To cache frequently accessed data in a dedicated high-speed storage tier
- D) To parallelize query compilation across multiple nodes

---

## Q26 (Scenario)
An architect is evaluating whether to enable the Query Acceleration Service for a warehouse. The warehouse runs two types of workloads: (1) short OLTP-style queries averaging 2 seconds and (2) long-running analytical queries that scan hundreds of millions of rows and take 5–10 minutes. Which workload will benefit MOST from QAS?
- A) The short OLTP-style queries, because QAS reduces compilation time
- B) The long-running analytical queries with large table scans, because QAS offloads portions of scan processing
- C) Both workloads equally, because QAS accelerates all queries
- D) Neither workload, because QAS only benefits queries that are queued

---

## Q27 (Single Answer)
Which system function can an architect use to estimate the potential benefit of enabling the Query Acceleration Service for a specific warehouse?
- A) SYSTEM$ESTIMATE_QUERY_ACCELERATION
- B) SYSTEM$WAREHOUSE_ACCELERATION_STATUS
- C) SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST
- D) SYSTEM$CLUSTERING_INFORMATION

---

## Q28 (Scenario)
A machine learning team uses Snowpark Python to train models that require loading large amounts of data into memory on the warehouse nodes. They frequently experience out-of-memory errors on a 2XL warehouse. Which warehouse type should the architect recommend?
- A) A 4XL standard warehouse for maximum compute
- B) A Snowpark-optimized warehouse for higher memory-to-compute ratio
- C) A multi-cluster 2XL warehouse with MAX_CLUSTER_COUNT = 4
- D) A standard warehouse with Query Acceleration Service enabled

---

## Q29 (Single Answer)
What is the key architectural difference between a Snowpark-optimized warehouse and a standard warehouse of the same T-shirt size?
- A) Snowpark-optimized warehouses have more CPU cores per node
- B) Snowpark-optimized warehouses have a higher ratio of memory and local SSD storage per node
- C) Snowpark-optimized warehouses support more concurrent queries per node
- D) Snowpark-optimized warehouses use a different query optimizer

---

## Q30 (Scenario)
A warehouse is configured with AUTO_SUSPEND = 300 seconds and AUTO_RESUME = true. An analyst submits a query at 09:00:00. The query completes at 09:00:15. No further queries are submitted. At what time will the warehouse suspend?
- A) 09:00:15
- B) 09:00:45
- C) 09:05:00
- D) 09:05:15

---

## Q31 (Multi Answer - Select 2)
Which TWO characteristics of Snowpark-optimized warehouses make them suitable for machine learning workloads? (Select TWO)
- A) They provide 16x the memory per node compared to standard warehouses
- B) They provide more local SSD cache capacity for spilling intermediate results
- C) They include pre-installed machine learning libraries
- D) They offer a higher memory-to-compute ratio, reducing out-of-memory errors for data-intensive operations
- E) They automatically scale to GPU-backed instances

---

## Q32 (Scenario)
An architect reviews the WAREHOUSE_LOAD_HISTORY view and notices that a multi-cluster warehouse with MAX_CLUSTER_COUNT = 5 and ECONOMY scaling frequently has all 5 clusters running during a 2-hour window but only 1 cluster the rest of the day. The business complains about query latency during peak hours. What should the architect adjust?
- A) Increase MAX_CLUSTER_COUNT to 10
- B) Change the scaling policy from ECONOMY to STANDARD
- C) Reduce MIN_CLUSTER_COUNT to 0
- D) Increase the warehouse size from Medium to Large

---

## Q33 (Single Answer)
What is the minimum AUTO_SUSPEND value (in seconds) that can be set for a virtual warehouse?
- A) 0 (immediate suspend)
- B) 60 seconds
- C) 120 seconds
- D) 300 seconds

---

## Q34 (Scenario)
A data platform team has a multi-cluster warehouse set to MIN_CLUSTER_COUNT = 2 and MAX_CLUSTER_COUNT = 8 with STANDARD scaling. During off-peak hours, the warehouse maintains 2 running clusters even when there are no queries. An architect wants to minimize idle credit consumption. Which change achieves this?
- A) Set MIN_CLUSTER_COUNT = 1 so only one cluster stays active during idle periods
- B) Set AUTO_SUSPEND = 60 and MIN_CLUSTER_COUNT = 1
- C) Change to ECONOMY scaling policy to shut down clusters faster
- D) Set MAX_CLUSTER_COUNT = 2 to match MIN_CLUSTER_COUNT

---

## Q35 (Single Answer)
Which ACCOUNT_USAGE view provides historical information about the credit consumption of the automatic clustering service?
- A) WAREHOUSE_METERING_HISTORY
- B) AUTOMATIC_CLUSTERING_HISTORY
- C) CLUSTERING_CREDIT_USAGE
- D) SERVERLESS_TASK_HISTORY

---

## Q36 (Multi Answer - Select 2)
Which TWO statements about auto-clustering in Snowflake are correct? (Select TWO)
- A) Auto-clustering is a serverless feature that consumes Snowflake-managed compute credits
- B) Auto-clustering runs continuously, reclustering the entire table every hour
- C) Auto-clustering only reclusters micro-partitions that have become poorly clustered due to DML operations
- D) Auto-clustering requires a dedicated virtual warehouse to be assigned
- E) Auto-clustering must be manually triggered after each DML operation

---

## Q37 (Scenario)
An architect notices that a 2 TB table with a clustering key on TRANSACTION_DATE has an average clustering depth of 1.2 according to SYSTEM$CLUSTERING_INFORMATION. The automatic_clustering_history view shows minimal credit consumption. Analysts complain about slow queries that filter on TRANSACTION_DATE. What is the MOST likely explanation?
- A) The clustering key is not effective because the table is too small
- B) The table is already well-clustered (depth of 1.2 is near-optimal), so the performance issue is elsewhere
- C) The auto-clustering service is broken and needs to be re-enabled
- D) The clustering key should be changed to a hash of TRANSACTION_DATE

---

## Q38 (Single Answer)
What is the SYSTEM$CLUSTERING_DEPTH function's output for a perfectly clustered table on the specified columns?
- A) 0
- B) 1
- C) The number of micro-partitions
- D) The number of distinct values in the clustering key

---

## Q39 (Scenario)
A healthcare company has a large table with 50 million rows and queries that frequently use point lookups such as WHERE patient_id = 'P12345'. The patient_id column has 10 million unique values. The table is currently clustered on admission_date. Which optimization is BEST for these point lookup queries?
- A) Change the clustering key to patient_id
- B) Enable the Search Optimization Service on the patient_id column
- C) Create a secondary index on patient_id
- D) Create a materialized view filtered on commonly queried patient_ids

---

## Q40 (Multi Answer - Select 2)
Which TWO factors determine the credit cost of the Search Optimization Service? (Select TWO)
- A) The number of queries executed against the optimized table
- B) The storage cost of the search access paths maintained by the service
- C) The compute cost of building and maintaining the search access paths after DML operations
- D) The warehouse size used when querying the optimized table
- E) The number of columns in the table regardless of whether they are optimized

---

## Q41 (Scenario)
An architect runs SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST('SALES_DB.PUBLIC.TRANSACTIONS') and the output shows a high estimated cost relative to the query savings. The table receives 500,000 INSERT operations per day via Snowpipe. What is the PRIMARY reason for the high cost estimate?
- A) The Search Optimization Service does not support tables loaded via Snowpipe
- B) Each Snowpipe micro-batch triggers incremental maintenance of the search access paths, and high DML frequency increases maintenance cost
- C) The Search Optimization Service must rebuild all access paths from scratch after each INSERT
- D) Snowpipe bypasses the metadata cache, making the Search Optimization Service ineffective

---

## Q42 (Single Answer)
Which Query Profile statistic indicates that the metadata cache was used to satisfy a query without scanning any micro-partitions?
- A) "Partitions scanned: 0" with "Partitions total: > 0"
- B) "Bytes sent over network: 0"
- C) "Result cache hit: true"
- D) "Compilation time: 0ms"

---

## Q43 (Scenario)
A retail company runs SELECT COUNT(*) FROM orders WHERE order_date = '2025-01-15'. The query returns instantly without using any warehouse compute. Which Snowflake feature made this possible?
- A) Result cache returning a previously computed result
- B) The metadata cache providing the answer from stored partition statistics
- C) The Search Optimization Service answering the query directly
- D) The warehouse data cache (SSD) having all necessary data pre-loaded

---

## Q44 (Single Answer)
Which cache layer in Snowflake is local to a specific virtual warehouse and is lost when the warehouse is suspended?
- A) Result cache
- B) Metadata cache
- C) Warehouse data cache (local SSD cache)
- D) Cloud services cache

---

## Q45 (Scenario)
An architect configures a warehouse with AUTO_SUSPEND = 60 seconds to save costs. The warehouse serves a BI tool that issues queries every 2-3 minutes. Users report that every other query is slow. What is the MOST likely cause?
- A) The BI tool is sending queries that bypass the result cache
- B) The warehouse suspends between queries and the warehouse data cache (SSD) is cleared on suspend, causing cold starts
- C) The 60-second AUTO_SUSPEND is causing the warehouse to run out of memory
- D) The query compilation cache is being invalidated too frequently

---

## Q46 (Multi Answer - Select 2)
Which TWO statements about the Snowflake metadata cache are correct? (Select TWO)
- A) The metadata cache stores statistics such as MIN/MAX values, row counts, and NULL counts per micro-partition
- B) The metadata cache is stored within each virtual warehouse's local storage
- C) Queries like SELECT COUNT(*) or SELECT MIN(col) can be answered entirely from the metadata cache
- D) The metadata cache expires after 24 hours and must be rebuilt by scanning the table
- E) The metadata cache is only available for tables with clustering keys defined

---

## Q47 (Scenario)
An architect is troubleshooting a slow query. The Query Profile shows that a Filter operator removes 99% of the rows AFTER a full TableScan. The table has 1 million micro-partitions and all of them were scanned. What should the architect recommend?
- A) Increase the warehouse size to scan partitions faster
- B) Add a clustering key on the columns used in the filter predicate to improve micro-partition pruning
- C) Enable the result cache to avoid repeated full scans
- D) Rewrite the query to use a LIMIT clause

---

## Q48 (Single Answer)
What is micro-partition pruning in Snowflake?
- A) The process of deleting old micro-partitions to reclaim storage space
- B) The ability to skip scanning micro-partitions whose metadata indicates they cannot contain matching rows for a query's filter predicates
- C) The automatic splitting of large micro-partitions into smaller ones for parallel processing
- D) The compression of micro-partitions to reduce storage costs

---

## Q49 (Scenario)
A query on a 500 GB table shows "Partitions scanned: 5,000 out of 50,000" in the Query Profile. After adding a clustering key and waiting for auto-clustering to complete, the same query shows "Partitions scanned: 500 out of 50,000." What does this improvement primarily represent?
- A) A 10x reduction in compute time because fewer partitions are scanned
- B) Better micro-partition pruning due to clustering aligning data so that filter predicates match fewer partitions
- C) The Search Optimization Service automatically kicking in after the clustering key was added
- D) The metadata cache storing precomputed results for the filtered data

---

## Q50 (Single Answer)
Which INFORMATION_SCHEMA table function provides real-time information about queries currently executing or recently completed on a warehouse?
- A) QUERY_HISTORY()
- B) WAREHOUSE_LOAD_HISTORY()
- C) TASK_HISTORY()
- D) QUERY_RUNTIME_HISTORY()

---

## Q51 (Scenario)
An architect needs to set up an alert that triggers when any warehouse in the account consumes more than 100 credits in a single day. Which approach is MOST appropriate?
- A) Create a resource monitor with a daily credit quota of 100 credits per warehouse
- B) Create a Snowflake Alert that queries SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY and sends an email notification
- C) Use INFORMATION_SCHEMA.WAREHOUSE_LOAD_HISTORY to poll for credit usage every hour
- D) Configure AUTO_SUSPEND with a credit-based threshold

---

## Q52 (Multi Answer - Select 2)
Which TWO resource monitor actions can Snowflake take when a credit quota is reached? (Select TWO)
- A) Notify account administrators via email
- B) Suspend the warehouse immediately, killing all running queries
- C) Automatically resize the warehouse to a smaller size
- D) Suspend the warehouse after all running queries complete (Suspend & Notify)
- E) Automatically enable the Query Acceleration Service to reduce credit usage

---

## Q53 (Scenario)
An operations team configures a resource monitor on a warehouse with the following triggers: 75% → Notify, 90% → Suspend (after queries complete), 100% → Suspend Immediately. At 85% usage, what happens?
- A) The warehouse is suspended after current queries complete
- B) The notification at 75% was sent but no further action is taken until 90% is reached
- C) The warehouse is suspended immediately
- D) A new cluster is added to the warehouse to share the load

---

## Q54 (Single Answer)
What is the latency difference between ACCOUNT_USAGE views and INFORMATION_SCHEMA views?
- A) ACCOUNT_USAGE has up to 45 minutes latency; INFORMATION_SCHEMA is near real-time
- B) ACCOUNT_USAGE is real-time; INFORMATION_SCHEMA has up to 45 minutes latency
- C) Both have up to 45 minutes of latency
- D) Both are real-time with no latency

---

## Q55 (Scenario)
A security architect needs to review all queries that ran in the past 12 months to identify potential data exfiltration patterns. Which view should they query?
- A) INFORMATION_SCHEMA.QUERY_HISTORY
- B) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
- C) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
- D) SNOWFLAKE.ORGANIZATION_USAGE.QUERY_HISTORY

---

## Q56 (Multi Answer - Select 2)
Which TWO capabilities are provided by Snowflake Alerts? (Select TWO)
- A) Execute a SQL condition check on a defined schedule
- B) Automatically tune warehouse sizes based on query patterns
- C) Send email notifications when the alert condition is met
- D) Automatically add clustering keys to tables with degraded performance
- E) Execute an action (SQL statement) when the condition is triggered

---

## Q57 (Scenario)
An architect wants to be notified by email whenever a specific task fails. Which approach uses Snowflake-native features MOST effectively?
- A) Create a Snowflake Alert that periodically checks INFORMATION_SCHEMA.TASK_HISTORY() for FAILED status and uses SYSTEM$SEND_EMAIL() as the action
- B) Create an external Lambda function that polls the Snowflake REST API for task status
- C) Add error handling in the task's SQL that writes failures to an external messaging queue
- D) Use a resource monitor to detect task failures and send notifications

---

## Q58 (Single Answer)
Which Snowflake feature allows storing application-level log messages and trace events from UDFs and stored procedures?
- A) QUERY_HISTORY view
- B) Event tables
- C) Alert history
- D) Resource monitors

---

## Q59 (Scenario)
A development team has a Python UDF that occasionally produces incorrect results. The architect wants to enable detailed logging and tracing for this UDF without modifying the application code. Which configuration change enables this?
- A) Set the LOG_LEVEL parameter on the database and configure an event table to capture trace events
- B) Enable the Query Acceleration Service to capture UDF execution details
- C) Create a stream on the UDF's output table to capture changes
- D) Enable CHANGE_TRACKING on the table the UDF writes to

---

## Q60 (Single Answer)
At which level can the LOG_LEVEL and TRACE_LEVEL parameters be set for event tables?
- A) Only at the account level
- B) At account, database, schema, or individual object (function/procedure) level
- C) Only at the warehouse level
- D) Only at the session level

---

## Q61 (Scenario)
An architect observes that a query with a WHERE clause on a high-cardinality VARCHAR column scans 95% of the table's micro-partitions, even though the query returns only 100 rows. The table has 2 billion rows. The column is not suitable as a clustering key because queries also filter on 5 other columns equally often. What is the BEST approach?
- A) Create 6 separate materialized views, each clustered on one of the 6 filter columns
- B) Enable the Search Optimization Service with search methods on the relevant columns
- C) Create a clustering key with all 6 columns
- D) Increase the warehouse size to 4XL to scan faster

---

## Q62 (Multi Answer - Select 2)
Which TWO types of predicates does the Search Optimization Service accelerate? (Select TWO)
- A) Equality and IN-list predicates on columns
- B) LIKE predicates with leading wildcards (e.g., LIKE '%suffix')
- C) Predicates on GEOGRAPHY and GEOMETRY data types using geospatial functions
- D) ORDER BY clauses on non-indexed columns
- E) HAVING clauses on aggregated values

---

## Q63 (Scenario)
An architect is evaluating whether to use clustering keys or the Search Optimization Service for a 5 TB table. The table receives 10 million new rows daily and is queried with both range scans on a date column and point lookups on an account_id column. Which strategy is BEST?
- A) Use only a clustering key on date and account_id
- B) Use only the Search Optimization Service on both columns
- C) Use a clustering key on the date column (for range scans) and Search Optimization Service on account_id (for point lookups)
- D) Use neither; increase the warehouse size instead

---

## Q64 (Single Answer)
What is the relationship between natural clustering and the order of data ingestion in Snowflake?
- A) Natural clustering is determined by Snowflake's internal optimization algorithm and is unrelated to ingestion order
- B) Data loaded into Snowflake is naturally clustered based on the order in which it is inserted, so tables loaded chronologically are naturally clustered by time
- C) Natural clustering only applies to tables with an explicit clustering key defined
- D) Natural clustering is the result of automatic background reclustering that occurs on all tables

---

## Q65 (Scenario)
A data warehouse has a fact table that was loaded chronologically over 3 years. An architect checks SYSTEM$CLUSTERING_INFORMATION for the LOAD_TIMESTAMP column and sees an average depth of 1.1. For the CUSTOMER_ID column, the depth is 450. Which interpretation is correct?
- A) The table needs a clustering key on LOAD_TIMESTAMP to improve its depth
- B) The table is naturally well-clustered on LOAD_TIMESTAMP due to chronological loading, but is poorly clustered on CUSTOMER_ID
- C) Both columns are poorly clustered and need clustering keys
- D) The depth values indicate the table is too large and should be partitioned

---

## Q66 (Single Answer)
After defining a clustering key on a table, how does Snowflake maintain the clustering over time as new data is inserted?
- A) Manual RECLUSTER commands must be executed periodically
- B) The automatic clustering service (serverless) reclusters affected micro-partitions in the background
- C) A dedicated virtual warehouse must be assigned to perform reclustering
- D) Snowflake only clusters data at the time the clustering key is defined and does not maintain it

---

## Q67 (Scenario)
An architect is analyzing cost vs. benefit for auto-clustering on a table. The AUTOMATIC_CLUSTERING_HISTORY view shows 150 credits consumed in the past week, but query performance improvement is negligible. SYSTEM$CLUSTERING_INFORMATION shows an average depth of 1.5. What should the architect do?
- A) Increase the warehouse size to allow auto-clustering to process more data
- B) Consider dropping the clustering key since the table is already well-clustered (depth 1.5) and the credits are being wasted on unnecessary maintenance
- C) Change the clustering key to include more columns
- D) Disable auto-clustering and schedule manual RECLUSTER operations

---

## Q68 (Multi Answer - Select 2)
Which TWO ACCOUNT_USAGE views are MOST useful for monitoring the cost impact of serverless features like auto-clustering and Search Optimization Service? (Select TWO)
- A) AUTOMATIC_CLUSTERING_HISTORY
- B) WAREHOUSE_METERING_HISTORY
- C) SEARCH_OPTIMIZATION_HISTORY
- D) DATA_TRANSFER_HISTORY
- E) REPLICATION_USAGE_HISTORY

---

## Q69 (Scenario)
An e-commerce platform has a query that aggregates sales by product category for a rolling 7-day window. The query runs every 15 minutes and always produces the same result within a 15-minute window (no new data arrives more frequently than every 30 minutes). Currently, each execution takes 45 seconds on a Large warehouse. Which optimization provides the MOST cost savings?
- A) Enable the Query Acceleration Service
- B) Create a materialized view with the aggregation logic
- C) Rely on the result cache — since the underlying data does not change within the 15-minute interval, subsequent runs will return cached results
- D) Add a clustering key on product_category

---

## Q70 (Single Answer)
Which statement about the result cache is TRUE?
- A) The result cache is specific to a single warehouse; queries on different warehouses cannot share cached results
- B) The result cache is available across all warehouses in the account; any user with the same role can access a cached result
- C) The result cache is stored in the local SSD of the warehouse that executed the query
- D) The result cache is only available for SELECT statements that do not contain any JOINs

---

## Q71 (Scenario)
A BI dashboard sends 50 identical queries per minute from 50 different user sessions, all using the same role and warehouse. The underlying data changes once per hour. Which Snowflake caching mechanism ensures that 49 out of 50 queries per minute consume zero warehouse credits?
- A) Warehouse data cache (SSD)
- B) Metadata cache
- C) Result cache
- D) Query compilation cache

---

## Q72 (Single Answer)
When a warehouse is resumed after being suspended, which cache is guaranteed to be empty?
- A) Result cache
- B) Metadata cache
- C) Warehouse data cache (local SSD/memory)
- D) Cloud services layer cache

---

## Q73 (Scenario)
An architect is troubleshooting a query that shows high "Percentage Scanned from Cache" in the Query Profile. Despite this, the query is still slow. What is the MOST likely explanation?
- A) The warehouse data cache (SSD) contains the relevant micro-partitions, reducing I/O, but the query is CPU-bound due to complex transformations
- B) The result cache is returning stale data, causing the query to re-execute
- C) The metadata cache is corrupted
- D) The Search Optimization Service is interfering with the cache

---

## Q74 (Multi Answer - Select 2)
Which TWO actions can reduce warehouse credit consumption without negatively impacting query performance? (Select TWO)
- A) Setting AUTO_SUSPEND to a lower value to reduce idle time
- B) Reducing the warehouse size from XL to Medium
- C) Leveraging the result cache for repetitive queries by ensuring queries are deterministic
- D) Disabling auto-resume to prevent the warehouse from starting
- E) Removing all clustering keys to eliminate auto-clustering costs

---

## Q75 (Scenario)
A data platform team manages 200 virtual warehouses across the organization. They need a centralized view of which warehouses are over-provisioned (large but underutilized) and which are under-provisioned (small but experiencing queuing). Which combination of views provides this analysis?
- A) WAREHOUSE_METERING_HISTORY and QUERY_HISTORY from ACCOUNT_USAGE
- B) WAREHOUSE_LOAD_HISTORY and WAREHOUSE_METERING_HISTORY from ACCOUNT_USAGE
- C) INFORMATION_SCHEMA.WAREHOUSES and RESOURCE_MONITORS
- D) TASK_HISTORY and WAREHOUSE_EVENTS_HISTORY from ACCOUNT_USAGE

---

## Q76 (Single Answer)
In the ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY view, which metric indicates that queries were waiting for compute resources?
- A) AVG_RUNNING
- B) AVG_QUEUED_LOAD
- C) AVG_QUEUED_PROVISIONING
- D) AVG_BLOCKED

---

## Q77 (Scenario)
An architect queries WAREHOUSE_LOAD_HISTORY and sees that AVG_QUEUED_LOAD is consistently above 2 during business hours for a single-cluster Medium warehouse. AVG_RUNNING is steady at 8. What is the BEST recommendation?
- A) Increase the warehouse size from Medium to Large to handle more concurrent queries
- B) Convert to a multi-cluster warehouse with auto-scaling to handle the concurrency
- C) Enable the Query Acceleration Service to reduce queuing
- D) Reduce the AUTO_SUSPEND timeout to free resources faster

---

## Q78 (Multi Answer - Select 2)
Which TWO approaches help identify queries that would benefit from the Query Acceleration Service? (Select TWO)
- A) Use the SYSTEM$ESTIMATE_QUERY_ACCELERATION function on the warehouse
- B) Review the QUERY_ACCELERATION_HISTORY view in ACCOUNT_USAGE
- C) Check for queries with high "Bytes spilled to local storage" in the Query Profile
- D) Look for queries with "eligible_query_acceleration_time" in the QUERY_HISTORY view
- E) Check the AUTOMATIC_CLUSTERING_HISTORY view

---

## Q79 (Scenario)
An architect configures the Query Acceleration Service with QUERY_ACCELERATION_MAX_SCALE_FACTOR = 4 on an XL warehouse. What does this setting control?
- A) The maximum number of clusters the warehouse can scale to
- B) The maximum amount of serverless compute that QAS can use, expressed as a multiple of the warehouse size (up to 4x the XL compute)
- C) The maximum number of queries that can be accelerated simultaneously
- D) The percentage improvement QAS will attempt to achieve on each query

---

## Q80 (Single Answer)
What is the default value of QUERY_ACCELERATION_MAX_SCALE_FACTOR when the Query Acceleration Service is first enabled on a warehouse?
- A) 0 (disabled)
- B) 4
- C) 8 (unlimited scaling)
- D) 1

---

## Q81 (Scenario)
A data warehouse architect is optimizing a dashboard that runs 20 queries against a 10 TB fact table. 15 queries filter by date range (month or quarter), and 5 queries perform point lookups on order_id. The table is currently unclustered. Which optimization strategy provides the BEST overall improvement?
- A) Cluster the table on order_id since point lookups are the most expensive queries
- B) Cluster the table on the date column and enable the Search Optimization Service for order_id lookups
- C) Enable the Search Optimization Service for all columns
- D) Create 20 materialized views, one per dashboard query

---

## Q82 (Single Answer)
When scaling OUT a multi-cluster warehouse (adding clusters), how are new queries distributed across clusters?
- A) All new queries are sent to the newest cluster until it is fully loaded
- B) Queries are distributed across all running clusters to balance the load
- C) Users must specify which cluster to target in their connection settings
- D) The first cluster always handles the highest-priority queries

---

## Q83 (Scenario)
A company has a multi-cluster warehouse with MIN_CLUSTER_COUNT = 1 and MAX_CLUSTER_COUNT = 4. During the scale-in process after a peak period, what happens to queries running on clusters being shut down?
- A) Queries are immediately terminated, and users must resubmit
- B) Queries are migrated to remaining active clusters mid-execution
- C) The cluster being shut down completes all running queries before being fully suspended
- D) Scale-in is blocked until all clusters are idle

---

## Q84 (Multi Answer - Select 2)
Which TWO are valid approaches for monitoring auto-clustering effectiveness over time? (Select TWO)
- A) Periodically query SYSTEM$CLUSTERING_INFORMATION to track clustering depth trends
- B) Review AUTOMATIC_CLUSTERING_HISTORY in ACCOUNT_USAGE to monitor credits consumed
- C) Check the warehouse query queue length to determine clustering impact
- D) Review the RESULT_SCAN output of every query for clustering statistics
- E) Monitor the table's storage size as a proxy for clustering quality

---

## Q85 (Scenario)
An architect discovers that a critical query's execution plan in the Query Profile shows a "CartesianJoin" operator processing billions of row combinations. The query was intended to be an inner join on a common key. What is the MOST likely cause?
- A) The table is not clustered on the join key
- B) The join condition is missing or incorrect, causing a cross join
- C) The warehouse is too small to handle the join in memory
- D) The Search Optimization Service is interfering with the join strategy

---

## Q86 (Single Answer)
In the Query Profile, what does the "Pruning" percentage indicate for a TableScan operator?
- A) The percentage of columns that were pruned from the scan
- B) The percentage of micro-partitions that were skipped (not scanned) based on metadata
- C) The percentage of rows removed after scanning
- D) The percentage of data cache utilized during the scan

---

## Q87 (Scenario)
An architect runs two identical queries back-to-back on the same warehouse. The first query takes 5 minutes and shows "Percentage Scanned from Cache: 0%" in the Query Profile. The second query takes 1 minute and shows "Percentage Scanned from Cache: 85%." What explains the difference?
- A) The result cache returned the second query immediately
- B) The first query populated the warehouse data cache (SSD), and the second query read most data from cache instead of remote storage
- C) The metadata cache was populated after the first query, allowing the second to skip partitions
- D) The Search Optimization Service was activated between the two queries

---

## Q88 (Multi Answer - Select 2)
Which TWO best practices help maximize the effectiveness of the warehouse data cache (SSD)? (Select TWO)
- A) Set AUTO_SUSPEND to a higher value (e.g., 10 minutes) to keep data cached longer between queries
- B) Use the smallest possible warehouse size to concentrate cache utilization
- C) Route similar workloads to the same warehouse so cached data is reused across queries
- D) Disable the result cache to force all queries to use the warehouse data cache
- E) Enable the Query Acceleration Service to pre-populate the cache

---

## Q89 (Scenario)
An architect needs to identify which queries in the past 30 days would have benefited from the Query Acceleration Service before enabling it. Which approach provides this analysis?
- A) Query ACCOUNT_USAGE.QUERY_HISTORY and look at the eligible_query_acceleration_time column
- B) Query INFORMATION_SCHEMA.QUERY_HISTORY and look at the query_acceleration_bytes_scanned column
- C) Run SYSTEM$ESTIMATE_QUERY_ACCELERATION for each query individually
- D) Enable QAS on a test warehouse and replay all queries

---

## Q90 (Single Answer)
Which SQL command is used to enable the Search Optimization Service on specific columns of a table?
- A) ALTER TABLE t ADD SEARCH OPTIMIZATION ON EQUALITY(col1), SUBSTRING(col2);
- B) CREATE SEARCH INDEX ON t (col1, col2);
- C) ALTER TABLE t SET SEARCH_OPTIMIZATION = TRUE;
- D) ALTER TABLE t ENABLE SEARCH_OPTIMIZATION ON col1, col2;

---

## Q91 (Scenario)
A company has a 20 TB table that is loaded once daily at midnight via a batch job. During business hours (8 AM to 8 PM), the table is queried heavily by 300 analysts. The architect wants to optimize cache utilization for the business-hours workload. Which warehouse configuration is MOST effective?
- A) Set AUTO_SUSPEND = 0 (never suspend) on the analyst warehouse
- B) Set AUTO_SUSPEND = 3600 (1 hour) on the analyst warehouse to preserve the data cache between query bursts
- C) Create a separate warehouse for each department to isolate cache usage
- D) Use a multi-cluster warehouse with MIN_CLUSTER_COUNT = 10 to ensure cache is distributed

---

## Q92 (Multi Answer - Select 2)
Which TWO types of queries can Snowflake answer using ONLY the metadata cache without scanning any micro-partitions? (Select TWO)
- A) SELECT COUNT(*) FROM table_name
- B) SELECT MIN(column) FROM table_name WHERE column IS NOT NULL
- C) SELECT DISTINCT column FROM table_name
- D) SELECT * FROM table_name WHERE id = 12345
- E) SELECT column FROM table_name ORDER BY column LIMIT 10

---

## Q93 (Scenario)
A data engineering team sets up a Snowflake Alert to monitor long-running queries:
```sql
CREATE ALERT long_query_alert
  WAREHOUSE = monitoring_wh
  SCHEDULE = '5 MINUTE'
  IF (EXISTS (
    SELECT * FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
    WHERE EXECUTION_STATUS = 'RUNNING'
    AND DATEDIFF('minute', START_TIME, CURRENT_TIMESTAMP()) > 30
  ))
  THEN
    CALL SYSTEM$SEND_EMAIL('alert_integration', 'ops@company.com',
      'Long Running Query Alert', 'A query has been running for over 30 minutes.');
```
What happens when the alert condition evaluates to TRUE?
- A) The long-running query is automatically cancelled
- B) The THEN action executes, sending an email notification to ops@company.com
- C) The warehouse running the long query is suspended
- D) The alert creates a resource monitor on the offending warehouse

---

## Q94 (Single Answer)
What is the retention period for data in ACCOUNT_USAGE views?
- A) 7 days
- B) 14 days
- C) 180 days (6 months)
- D) 365 days (1 year)

---

## Q95 (Scenario)
An architect needs to build a real-time monitoring dashboard showing current warehouse utilization across the account. The dashboard must refresh every 30 seconds. Which data source is MOST appropriate?
- A) ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY (up to 45 min latency)
- B) INFORMATION_SCHEMA.WAREHOUSE_LOAD_HISTORY table function (near real-time, last 14 days)
- C) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
- D) ORGANIZATION_USAGE.WAREHOUSE_METERING_HISTORY

---

## Q96 (Multi Answer - Select 2)
Which TWO statements about event tables for logging and tracing are correct? (Select TWO)
- A) Event tables capture log messages and trace events from UDFs, UDTFs, and stored procedures
- B) Event tables can only capture events from SQL-based procedures, not Python or Java UDFs
- C) The LOG_LEVEL parameter controls the minimum severity of log messages captured
- D) Event tables require a dedicated virtual warehouse for event ingestion
- E) Each database can have only one event table associated with it at a time

---

## Q97 (Scenario)
An architect is troubleshooting intermittent performance degradation. They need to correlate high warehouse load with specific queries during a period 3 months ago. Which combination of views provides both the warehouse load metrics and the query details for that historical period?
- A) INFORMATION_SCHEMA.WAREHOUSE_LOAD_HISTORY and INFORMATION_SCHEMA.QUERY_HISTORY
- B) ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY and ACCOUNT_USAGE.QUERY_HISTORY
- C) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY and INFORMATION_SCHEMA.QUERY_HISTORY
- D) ORGANIZATION_USAGE.WAREHOUSE_METERING_HISTORY and ACCOUNT_USAGE.QUERY_HISTORY

---

## Q98 (Single Answer)
What is the maximum retention period for data in INFORMATION_SCHEMA table functions like QUERY_HISTORY()?
- A) 24 hours
- B) 7 days
- C) 14 days
- D) 45 days

---

## Q99 (Scenario)
An architect configures a resource monitor at the account level with a monthly credit quota of 50,000 credits. Trigger actions are set at 80% (Notify), 95% (Suspend After), and 100% (Suspend Immediately). At 96% usage, a critical ETL job is still running. What happens?
- A) The ETL job is immediately terminated at 96% since it exceeded 95%
- B) The 95% Suspend After trigger allows the ETL job to complete, then suspends the warehouse; no new queries can start
- C) Nothing happens until 100% is reached; only notification was sent at 80%
- D) The resource monitor automatically extends the quota for the critical job

---

## Q100 (Scenario)
An architect is designing a comprehensive performance monitoring strategy for a Snowflake account with 50 warehouses, auto-clustering on 20 tables, and the Search Optimization Service on 10 tables. Which combination of monitoring provides the MOST complete visibility into performance and cost?
- A) WAREHOUSE_METERING_HISTORY only
- B) WAREHOUSE_METERING_HISTORY, WAREHOUSE_LOAD_HISTORY, QUERY_HISTORY, AUTOMATIC_CLUSTERING_HISTORY, and SEARCH_OPTIMIZATION_HISTORY from ACCOUNT_USAGE
- C) INFORMATION_SCHEMA views for all metrics
- D) Resource monitors on all warehouses with email notifications
