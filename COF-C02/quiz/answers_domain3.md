## Q1

**Answer: B**

**Explanation:** When data spills to remote storage, it means the warehouse has exhausted both its memory and local disk. The first recommended action is to increase the warehouse size, which provides more memory and local storage. Processing data in smaller batches is a secondary recommendation.

**Source:** [Queries too large to fit in memory](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory)

**Quote:** "Data spilling to storage can have a negative impact on query performance (especially if the query has to spill to remote storage). To alleviate this, Snowflake recommends: Using a larger warehouse (effectively increasing the available memory/local storage space for the operation)."
---
## Q2

**Answer: C**

**Explanation:** The persisted query results (result cache) stores exact query results for 24 hours. When the same exact query is run again and the underlying data hasn't changed, Snowflake returns the cached result without using any warehouse resources, meaning no credits are consumed.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "When a query is executed, the result is persisted (i.e. cached) for a period of time... Instead of running the query again, Snowflake simply returns the same result that it returned previously. This can substantially reduce query time because Snowflake bypasses query execution and, instead, retrieves the result directly from the cache."
---
## Q3

**Answer: C**

**Explanation:** UUID_STRING() is a non-reusable (non-deterministic) function that returns different results each time it is called. Queries containing such functions cannot use persisted query results because the results would differ between executions.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The query does not include non-reusable functions, which return different results for successive runs of the same query. UUID_STRING, RANDOM, and RANDSTR are good examples of non-reusable functions."
---
## Q4

**Answer: C**

**Explanation:** Simple aggregate queries like COUNT(*), MIN(), and MAX() on entire tables can be answered from the metadata cache maintained by the cloud services layer. This metadata includes statistics such as row counts and min/max values for each column in each micro-partition, allowing Snowflake to answer these queries without starting a warehouse.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake stores metadata about all rows stored in a micro-partition, including: The range of values for each of the columns in the micro-partition. The number of distinct values."
---
## Q5

**Answer: A, C**

**Explanation:** Snowflake maintains metadata for each micro-partition that includes the range of values (min/max) for each column and the number of distinct values. This metadata enables efficient query pruning. Snowflake does not store user-level or warehouse-level metadata per micro-partition.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake stores metadata about all rows stored in a micro-partition, including: The range of values for each of the columns in the micro-partition. The number of distinct values. Additional properties used for both optimization and efficient query processing."
---
## Q6

**Answer: B**

**Explanation:** When only 5 out of 1,000 micro-partitions are scanned, Snowflake has effectively pruned 99.5% of the micro-partitions using the metadata about value ranges. This is micro-partition pruning, a key performance optimization that avoids scanning irrelevant data.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "The micro-partition metadata maintained by Snowflake enables precise pruning of columns in micro-partitions at query run-time, including columns containing semi-structured data. In other words, a query that specifies a filter predicate on a range of values that accesses 10% of the values in the range should ideally only scan 10% of the micro-partitions."
---
## Q7

**Answer: B**

**Explanation:** Snowpark-optimized warehouses provide significantly more memory per node (up to 16x by default) compared to standard warehouses. They are specifically designed for memory-intensive Snowpark workloads such as ML model training, UDFs, and UDTFs.

**Source:** [Snowpark-optimized warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses are recommended for running Snowpark workloads such as code that has large memory requirements or dependencies on a specific CPU architecture. Example workloads include Machine Learning (ML) training use cases using a stored procedure on a single virtual warehouse node."
---
## Q8

**Answer: D**

**Explanation:** The default RESOURCE_CONSTRAINT for Snowpark-optimized warehouses is MEMORY_16X, which provides 16 times the memory per node compared to an equivalent standard warehouse. Additional options include MEMORY_1X (same as standard) and MEMORY_64X (64 times, preview).

**Source:** [Snowpark-optimized warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "The default configuration for a Snowpark-optimized warehouse provides 16x memory per node compared to a standard warehouse."
---
## Q9

**Answer: B**

**Explanation:** When MIN_CLUSTER_COUNT and MAX_CLUSTER_COUNT have different values (1 and 3), the warehouse operates in Auto-scale mode. Snowflake dynamically starts and stops clusters based on workload. Maximized mode requires the same value for both minimum and maximum.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Auto-scale: This mode is enabled by specifying different values for maximum and minimum number of clusters. In this mode, Snowflake starts and stops clusters as needed to dynamically manage the load on the warehouse."
---
## Q10

**Answer: B**

**Explanation:** The Economy scaling policy is designed to conserve credits. It only starts an additional cluster when there is estimated to be enough work to keep it busy for at least 6 minutes, meaning it tolerates some queuing to avoid unnecessary cluster starts. The Standard policy starts clusters more aggressively.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Economy: Conserves credits by favoring keeping running clusters fully loaded rather than starting additional clusters, which may result in queries being queued and الانتظار longer while they wait for the current clusters to finish."
---
## Q11

**Answer: B, C**

**Explanation:** In multi-cluster warehouses, auto-suspend and auto-resume are warehouse-level operations, not cluster-level. Auto-suspend only triggers when the minimum clusters are running with no activity. Auto-resume only applies when the entire warehouse (all clusters) is suspended.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Auto-suspend and auto-resume apply only to the entire warehouse and not to the individual clusters in the warehouse. For a multi-cluster warehouse: Auto-suspend only occurs when the minimum number of clusters is running and there is no activity... Auto-resume only applies when the entire warehouse is suspended (i.e. no clusters are running)."
---
## Q12

**Answer: C**

**Explanation:** A Large Gen1 warehouse consumes 8 credits per hour. Running for 2 hours: 8 credits × 2 hours = 16 credits total. Each warehouse size doubles the credits from the previous size (X-Small=1, Small=2, Medium=4, Large=8).

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Large: 8 credits/hour (Gen1 warehouses)."
---
## Q13

**Answer: C**

**Explanation:** A Medium warehouse uses 4 credits per hour per cluster. In Maximized mode, all 3 clusters run simultaneously: 4 credits × 3 clusters × 1 hour = 12 credits. Maximized mode starts all clusters when the warehouse begins running.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "The maximum number of credits consumed per hour for a Medium-size multi-cluster warehouse with 3 clusters is 12 credits."
---
## Q14

**Answer: B**

**Explanation:** For slow individual queries, scaling up (resizing to a larger warehouse) provides more compute resources per query. Multi-clustering helps with concurrency (many simultaneous users/queries) but does not improve the speed of a single complex query.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are best utilized for scaling resources to improve concurrency for users/queries. They are not as beneficial for improving the performance of slow-running queries or data loading. For these types of operations, resizing the warehouse provides more benefits."
---
## Q15

**Answer: B, D**

**Explanation:** Multi-cluster warehouses (scaling out) are designed for concurrency problems—when many users are submitting queries simultaneously and experiencing queuing. Peak-hour BI users and seasonal traffic spikes are classic concurrency problems. Slow individual queries (ETL, aggregations) and data loading benefit more from scaling up.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are best utilized for scaling resources to improve concurrency for users/queries. They are not as beneficial for improving the performance of slow-running queries or data loading. For these types of operations, resizing the warehouse provides more benefits."
---
## Q16

**Answer: B**

**Explanation:** QAS offloads portions of query processing to shared compute resources, performing more work in parallel. It is especially effective for ad hoc analytics with large scans and selective filters, where data volumes are unpredictable. Simple queries and point lookups don't typically qualify for QAS.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Examples of the types of workloads that might benefit from the query acceleration service include: Ad hoc analytics. Workloads with unpredictable data volume per query. Queries with large scans and selective filters."
---
## Q17

**Answer: B, D**

**Explanation:** QAS can accelerate SELECT, INSERT, CTAS, and COPY INTO <table> commands. DDL commands like CREATE VIEW and ALTER TABLE, and DML commands like DELETE, are not supported by QAS.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service supports the following SQL commands: SELECT, INSERT, CREATE TABLE AS SELECT (CTAS), COPY INTO <table>."
---
## Q18

**Answer: B**

**Explanation:** SYSTEM$ESTIMATE_QUERY_ACCELERATION takes a query ID as input and returns whether the query is eligible for QAS, along with estimated execution times at various scale factors. It helps in assessing the potential benefit before enabling QAS.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The SYSTEM$ESTIMATE_QUERY_ACCELERATION function can help determine if a previously executed query might benefit from the query acceleration service. If the query is eligible for query acceleration, the function returns the estimated query execution time for different query acceleration scale factors."
---
## Q19

**Answer: B**

**Explanation:** Snowflake's query optimizer can transparently rewrite queries that reference a base table to instead use a materialized view if it determines the view can satisfy the query more efficiently. Materialized views are automatically maintained (not manually refreshed), incur storage costs, and are an Enterprise Edition feature.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "You don't need to specify a materialized view in a SQL statement in order for the view to be used. The query optimizer can automatically rewrite queries against the base table or regular view to use a materialized view."
---
## Q20

**Answer: B, D**

**Explanation:** Materialized views are most beneficial when the underlying data changes infrequently (relative to how often the view is queried) and when the query is resource-intensive. If data changes constantly or the query is simple, a regular view is more appropriate.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "Create a materialized view when all of the following are true: The query results from the view don't change often... The results of the view are used often... The query consumes a lot of resources."
---
## Q21

**Answer: B**

**Explanation:** With `region` having 10 distinct values (low cardinality) and `transaction_date` having ~1,800 distinct values (higher cardinality), the recommended order is lowest cardinality first: `CLUSTER BY (region, transaction_date)`.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "If you are defining a multi-column clustering key for a table, the order in which the columns are specified in the CLUSTER BY clause is important. As a general rule, Snowflake recommends ordering the columns from lowest cardinality to highest cardinality. Putting a higher cardinality column before a lower cardinality column will generally reduce the effectiveness of clustering on the latter column."
---
## Q22

**Answer: B**

**Explanation:** Automatic Clustering is a serverless feature. Snowflake manages the compute resources internally—users do not need to designate a warehouse. It is non-blocking (DML continues during reclustering) and can be suspended/resumed at any time via ALTER TABLE.

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Automatic Clustering consumes Snowflake credits, but does not require you to provide a virtual warehouse. Instead, Snowflake internally manages and achieves efficient resource utilization for reclustering the tables."
---
## Q23

**Answer: B**

**Explanation:** The search access path is a persistent data structure that maps values to micro-partitions, enabling the Search Optimization Service to skip irrelevant micro-partitions during point lookups and other selective queries.

**Source:** [Search optimization service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "To improve performance of search queries, the search optimization service creates and maintains a persistent data structure called a search access path. The search access path keeps track of which values of the table's columns might be found in each of its micro-partitions, allowing some micro-partitions to be skipped when scanning the table."
---
## Q24

**Answer: B, C**

**Explanation:** The Search Optimization Service is designed for selective queries that return a small number of rows (point lookups) and queries on semi-structured data columns using equality predicates, IN clauses, and similar selective filters. Full table scans and queries without filters do not benefit.

**Source:** [Search optimization service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service aims to significantly improve the performance of certain types of queries on tables, including: Selective point lookup queries on tables. A point lookup query returns only one or a small number of distinct rows... Queries on elements in VARIANT, OBJECT, and ARRAY (semi-structured) columns that use... Equality predicates, IN predicates..."
---
## Q25

**Answer: C**

**Explanation:** Persisted query results are cached for 24 hours. Each time a cached result is reused, the 24-hour retention period resets, up to a maximum of 31 days from the original query execution. Note that the security token for large results (>100 KB) expires after 6 hours, but a new token can be retrieved while the result is still in cache.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "For persisted query results of all sizes, the cache expires after 24 hours."
---
## Q26

**Answer: A, D**

**Explanation:** Cloud services credits are only billed when the daily cloud services consumption exceeds 10% of daily virtual warehouse usage. This calculation is performed daily in UTC—not monthly. Serverless compute (like Snowpipe, auto-clustering) does NOT count toward the 10% adjustment threshold.

**Source:** [Understanding compute cost](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)

**Quote:** "Usage for cloud services is charged only if the daily consumption of cloud services exceeds 10% of the daily usage of virtual warehouses. The charge is calculated daily (in the UTC time zone)... Serverless compute does not factor into the 10% adjustment for cloud services."
---
## Q27

**Answer: B**

**Explanation:** Resource monitors only track credit usage for virtual warehouses. Snowflake Budgets can monitor spending for both virtual warehouses AND serverless features (Snowpipe, Automatic Clustering, materialized view maintenance, search optimization, etc.), making them the appropriate tool for comprehensive cost monitoring.

**Source:** [Working with resource monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "Resource monitors work for warehouses only. You can't use a resource monitor to track spending associated with serverless features and AI services. To monitor credit consumption by these features, use a budget instead."
---
## Q28

**Answer: B, C**

**Explanation:** Resource monitors can send notifications to account administrators and can suspend warehouses (either after current statements complete or immediately). They cannot resize, drop, or modify the cluster count of warehouses.

**Source:** [Working with resource monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "Resource monitors support the following actions: Notify & Suspend: Send a notification and suspend all assigned warehouses after all statements being executed by the warehouse(s) have completed. Notify & Suspend Immediately: Send a notification and suspend all assigned warehouses immediately... Notify: Perform no action on warehouses, but send a notification."
---
## Q29

**Answer: C**

**Explanation:** Data transfer costs are incurred when data moves between different regions or cloud platforms. Replicating a database to a different region involves cross-region data transfer. Loading from S3 in the same region, querying within the same account, and result cache retrieval do not incur data transfer costs.

**Source:** [Understanding data transfer cost](https://docs.snowflake.com/en/user-guide/cost-understanding-data-transfer)

**Quote:** "Replicating Data - Replication of databases, creating a snapshot of the database to a secondary database. Typically this involves replicating data to a Snowflake account in a region or cloud platform different from where your primary (origin) Snowflake account is hosted."
---
## Q30

**Answer: B, D**

**Explanation:** Automatic Clustering and Snowpipe are serverless features that use Snowflake-managed compute resources. They do not require users to provision or manage virtual warehouses. Running SELECT queries, COPY INTO commands on user warehouses, and executing stored procedures on warehouses all use user-managed virtual warehouse compute.

**Source:** [Understanding compute cost](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)

**Quote:** "Serverless credit usage is the result of features relying on compute resources provided by Snowflake rather than user-managed virtual warehouses. These compute resources are automatically resized and scaled up or down by Snowflake as required for each workload."
---
## Q31

**Answer: C**

**Explanation:** Snowflake recommends different auto-suspend settings based on workload type. For BI and SELECT query warehouses, at least 10 minutes is recommended to preserve the warehouse cache, which improves performance for repeated similar queries. For tasks, immediate suspension is recommended; for DevOps/ad-hoc, about 5 minutes.

**Source:** [Optimizing the warehouse cache](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache)

**Quote:** "For query warehouses, for example BI and SELECT use cases, Snowflake recommends setting auto-suspend to at least 10 minutes to maintain the cache for users."
---
## Q32

**Answer: B**

**Explanation:** The SNOWFLAKE.ACCOUNT_USAGE schema contains views like WAREHOUSE_METERING_HISTORY, QUERY_HISTORY, and METERING_DAILY_HISTORY that retain data for up to 365 days. This is significantly longer than INFORMATION_SCHEMA (typically 7-14 days). ORGANIZATION_USAGE provides cross-account data at the organization level, not the same detailed account-level views.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "Account Usage views provide up to 365 days of historical data about warehouse metering, query history, and other account activity."
---
## Q33

**Answer: C**

**Explanation:** The warehouse local disk (SSD) cache stores table data that has been scanned by queries running on the warehouse. When the warehouse is suspended, this cache is dropped entirely. This is why the auto-suspend setting directly impacts cache performance—suspending too quickly means the next set of queries cannot benefit from cached data.

**Source:** [Optimizing the warehouse cache](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache)

**Quote:** "A running warehouse maintains a cache of table data that can be accessed by queries running on the same warehouse. This can improve the performance of subsequent queries if they are able to read from the cache instead of from tables."
---
## Q34

**Answer: B**

**Explanation:** The USE_CACHED_RESULT parameter controls whether Snowflake reuses persisted query results. It can be set at the account, user, or session level. Setting it to FALSE forces Snowflake to re-execute queries rather than returning cached results.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "By default, result reuse is enabled, but can be overridden at the account, user, and session level using the USE_CACHED_RESULT session parameter."
---
## Q35

**Answer: C**

**Explanation:** BI and SELECT workloads benefit significantly from the warehouse cache because they run repeated, similar queries. Snowflake recommends at least 10 minutes for these use cases to avoid dropping the cache between query executions. Immediate suspension is only recommended for task-based workloads.

**Source:** [Optimizing the warehouse cache](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache)

**Quote:** "For query warehouses, for example BI and SELECT use cases, Snowflake recommends setting auto-suspend to at least 10 minutes to maintain the cache for users."
---
## Q36

**Answer: D**

**Explanation:** While the base retention period is 24 hours, each reuse of a cached result resets the 24-hour clock. However, there is an absolute maximum of 31 days from the original query execution date. After 31 days, the cached result is unconditionally purged.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Each time the persisted result for a query is reused, Snowflake resets the 24-hour retention period for the result, up to a maximum of 31 days from the date and time that the query was first executed. After 31 days, the result is purged and the next time the query is submitted, a new result is generated and persisted."
---
## Q37

**Answer: B**

**Explanation:** RESULT_SCAN is a table function that allows you to query the cached result of a previously executed query using its query ID (or LAST_QUERY_ID()). It is especially useful for post-processing results from SHOW, DESCRIBE, or CALL statements, which don't return easily reusable result sets directly.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "You can perform post-processing by using the RESULT_SCAN table function. The function returns the results of the previous query as a 'table,' and then you can run a new query on the tabular data."
---
## Q38

**Answer: B, D**

**Explanation:** A different table alias (B) prevents cache reuse because the query must match exactly—even minor syntactic differences like aliases invalidate the cache match. RANDOM() (D) is a non-deterministic (non-reusable) function, so its presence in a query prevents result cache usage. The other options do not prevent cache reuse.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The new query matches the previously executed query exactly. Any difference in syntax, including lowercase versus uppercase, or the use of table aliases, will inhibit 100% cache reuse. The query does not include non-reusable functions, which return different results for successive runs of the same query. UUID_STRING, RANDOM, and RANDSTR are good examples of non-reusable functions."
---
## Q39

**Answer: A**

**Explanation:** An X-Small Gen1 warehouse consumes 1 credit per hour. Per-second billing means: 1 credit/3600 seconds = 0.000278 credits/second. The 60-second minimum means the first 60 seconds are billed as 1/60th of an hour = 0.01667 credits. At 90 seconds: the first 60 seconds = 0.01667, plus 30 additional seconds = 0.00833, total ≈ 0.025 credits.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Snowflake utilizes per-second billing (with a 60-second minimum each time the warehouse starts) so warehouses are billed only for the credits they actually consume."
---
## Q40

**Answer: B**

**Explanation:** Starting from X-Small (1 credit/hour), each size doubles: Small=2, Medium=4, Large=8, X-Large=16, 2X-Large=32 credits/hour. A 2X-Large Gen1 warehouse therefore consumes 32 credits per hour.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "As shown in the above table, there is a doubling of credit usage as you increase in size to the next larger warehouse size."
---
## Q41

**Answer: B**

**Explanation:** Warehouses can be resized while running. However, the new resources only become available to queued or newly submitted queries—currently executing queries continue with the original resources. This allows resizing without interrupting in-flight work.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "If queries processed by a warehouse are running slowly, you can always resize the warehouse to provision more compute resources. The additional resources do not impact any queries that are already running, but once they are fully provisioned they become available for use by any queries that are queued or newly submitted."
---
## Q42

**Answer: C**

**Explanation:** Multi-cluster warehouses require Snowflake Enterprise Edition or higher (Business Critical, Virtual Private Snowflake). They are not available in Standard Edition. This is a key distinction for cost-conscious organizations evaluating Snowflake editions.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are an Enterprise Edition feature."
---
## Q43

**Answer: B**

**Explanation:** Maximized mode starts ALL configured clusters simultaneously when the warehouse is started. With MAX = MIN = 4, all 4 clusters start at once, providing the maximum static compute capacity from the moment the warehouse begins running.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Maximized: This mode is enabled by specifying the same value for both maximum and minimum number of clusters (note that the specified value must be larger than 1). In this mode, when the warehouse is started, Snowflake starts all the clusters so that maximum resources are available while the warehouse is running."
---
## Q44

**Answer: B, D**

**Explanation:** The Economy policy (B) starts a new cluster only when estimated load would keep the cluster busy for at least 6 minutes. It (D) conserves credits by keeping running clusters fully loaded rather than starting additional clusters. The Standard policy is the default, and it favors performance over cost.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Economy: Conserves credits by favoring keeping running clusters fully-loaded rather than starting additional clusters, which may result in queries being queued and taking longer to complete. Only if the system estimates there's enough query load to keep the cluster busy for at least 6 minutes."
---
## Q45

**Answer: C**

**Explanation:** QUERY_ACCELERATION_MAX_SCALE_FACTOR = 0 is a special value that removes the upper bound on QAS resource usage. Rather than limiting resources to a multiple of the warehouse size, queries can use as many QAS resources as are available at execution time. This maximizes acceleration potential but may increase credit consumption.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Setting the scale factor to 0 eliminates the upper bound limit and allows queries to lease as many resources as necessary and as available to service the query."
---
## Q46

**Answer: C**

**Explanation:** The QUERY_ACCELERATION_ELIGIBLE view in ACCOUNT_USAGE lists past queries that are eligible for QAS acceleration, including the amount of query execution time that could be accelerated. This is used to identify candidate warehouses and queries for enabling QAS.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Query the QUERY_ACCELERATION_ELIGIBLE view to identify the queries and warehouses that might benefit the most from the query acceleration service. For each query, the view includes the amount of query execution time that is eligible for the query acceleration service."
---
## Q47

**Answer: B**

**Explanation:** One of the most common reasons a query is ineligible for QAS is that the scan doesn't involve enough partitions to justify the overhead of spinning up additional QAS compute resources. The latency of acquiring those resources would outweigh any performance gain for small scans.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "There aren't enough partitions in the scan. If there aren't enough partitions to scan, the benefits of query acceleration are offset by the latency in acquiring resources for the query acceleration service."
---
## Q48

**Answer: A, C**

**Explanation:** QAS is designed for two primary patterns: (A) large scans with aggregation or selective filters, and (C) large scans that insert or copy many rows. Simple point lookups and tiny table joins are typically ineligible due to insufficient partition counts, and metadata-only queries don't need warehouse compute at all.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "In general, queries are eligible because they have a portion of the query plan that can be run in parallel using QAS compute resources. These queries fall into one of two patterns: Large scans with an aggregation or selective filter. Large scans that insert or copy many new rows (for example, INSERT and COPY commands)."
---
## Q49

**Answer: C**

**Explanation:** When QAS is enabled on a warehouse without explicitly setting QUERY_ACCELERATION_MAX_SCALE_FACTOR, the default is 8. This means the warehouse can lease up to 8 times its own size in additional QAS compute resources. Setting it to 0 removes the limit.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "If the scale factor is not explicitly set, the default value is 8."
---
## Q50

**Answer: B**

**Explanation:** The correct parameter is ENABLE_QUERY_ACCELERATION = TRUE, used with either CREATE WAREHOUSE or ALTER WAREHOUSE. Other syntax variations shown in the distractors (like USE_QUERY_ACCELERATION or CREATE QUERY ACCELERATION) do not exist.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "To enable the query acceleration service, specify the clause ENABLE_QUERY_ACCELERATION = TRUE with the CREATE WAREHOUSE or ALTER WAREHOUSE command."
---
## Q51

**Answer: C**

**Explanation:** A clustering depth of 1 means minimal overlap between micro-partitions—each value tends to appear in just one micro-partition. This is the ideal state for clustering, indicating that queries filtering on the clustered column can skip almost all irrelevant micro-partitions. An empty table has depth 0.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "The clustering depth for a populated table measures the average depth (1 or greater) of the overlapping micro-partitions for specified columns in a table. The smaller the average depth, the better clustered the table is with regards to the specified columns."
---
## Q52

**Answer: C**

**Explanation:** SYSTEM$CLUSTERING_INFORMATION is the comprehensive function that returns clustering depth and other overlap statistics for a table's columns. SYSTEM$CLUSTERING_DEPTH also exists but returns only the depth value. SYSTEM$CLUSTERING_INFORMATION provides more complete clustering information.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Use the system function, SYSTEM$CLUSTERING_INFORMATION, to calculate clustering details, including clustering depth, for a given table."
---
## Q53

**Answer: C**

**Explanation:** Automatic Clustering is intelligent—it does not blindly recluster on a fixed schedule. Snowflake monitors the table's clustering state and only triggers reclustering when it determines the operation will improve query performance. This avoids unnecessary credit consumption.

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Note that, after a clustered table is defined, reclustering does not necessarily start immediately. Snowflake only reclusters a clustered table if it will benefit from the operation."
---
## Q54

**Answer: B, D**

**Explanation:** Reclustering (B) uses serverless compute credits. It also (D) incurs storage costs because the original micro-partitions before reclustering are retained for Time Travel and Fail-safe periods—they are not immediately deleted. The original data can be retained up to 97 days for extended Time Travel.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Automatic Clustering consumes Snowflake credits, but does not require you to provide a virtual warehouse. Instead, Snowflake internally manages and achieves efficient resource utilization for reclustering the tables. Reclustering also results in storage costs. Each time data is reclustered, the rows are physically grouped based on the clustering key for the table, which results in Snowflake generating new micro-partitions for the table... The original micro-partitions are marked as deleted, but retained in the system to enable Time Travel and Fail-safe."
---
## Q55

**Answer: B**

**Explanation:** The correct SQL to resume Automatic Clustering on a table is `ALTER TABLE <name> RESUME RECLUSTER`. Automatic Clustering can be suspended with `ALTER TABLE <name> SUSPEND RECLUSTER`. These commands require the table to already have a clustering key defined.

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "To resume Automatic Clustering for a clustered table, use the ALTER TABLE command with a RESUME RECLUSTER clause."
---
## Q56

**Answer: B**

**Explanation:** After running `ALTER TABLE t ADD SEARCH OPTIMIZATION`, the background maintenance service begins building the search access path. Queries are NOT accelerated until this process completes. The progress can be monitored via the `search_optimization_progress` column in SHOW TABLES output.

**Source:** [Search optimization service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "When you enable search optimization, the maintenance service creates and populates the search access path with the data needed to perform the lookups. Building the search access path can take significant time, depending on the size of the table. The maintenance service works in the background and does not block any operations on the table. Queries are not accelerated until the search access path has been fully built."
---
## Q57

**Answer: B**

**Explanation:** The correct syntax to enable the Search Optimization Service for a table is `ALTER TABLE <table_name> ADD SEARCH OPTIMIZATION`. This triggers the background maintenance service to begin building the search access path. The other options shown are not valid Snowflake SQL syntax.

**Source:** [Search optimization service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "Add the SEARCH OPTIMIZATION property to the table using ALTER TABLE."
---
## Q58

**Answer: A, C, D**

**Explanation:** Search Optimization Service benefits: (A) selective point lookups returning few rows, (C) substring/regex queries using LIKE, ILIKE, RLIKE, and (D) queries on semi-structured VARIANT/OBJECT/ARRAY columns with equality predicates. Full table aggregation queries (B) and ORDER BY without WHERE (E) do not benefit from SOS.

**Source:** [Search optimization service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service aims to significantly improve the performance of certain types of queries on tables, including: Selective point lookup queries on tables. A point lookup query returns only one or a small number of distinct rows... Substring and regular expression searches (for example, LIKE, ILIKE, RLIKE, and so on)... Queries on elements in VARIANT, OBJECT, and ARRAY (semi-structured) columns that use... Equality predicates."
---
## Q59

**Answer: B**

**Explanation:** One of the most significant limitations of materialized views in Snowflake is that they can only query a single base table—joins are not supported. They also cannot query other views, hybrid tables, dynamic tables, or UDTFs. Materialized views can be clustered and are an Enterprise Edition feature.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view can query only a single table. Joins, including self-joins, are not supported."
---
## Q60

**Answer: B**

**Explanation:** Snowflake's query optimizer performs transparent query rewriting—users can query the base table directly and the optimizer will use the materialized view if it can satisfy the query more efficiently. This means users don't need to change their queries to benefit from materialized views.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "You don't need to specify a materialized view in a SQL statement in order for the view to be used. The query optimizer can automatically rewrite queries against the base table or regular views to use the materialized view instead."
---
## Q61

**Answer: C**

**Explanation:** Materialized view maintenance uses Snowflake-managed serverless compute resources—not a user-designated virtual warehouse. This is similar to other serverless features like Automatic Clustering and Search Optimization. The maintenance warehouse is named MATERIALIZED_VIEW_MAINTENANCE in billing reports.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "In order to prevent materialized views from becoming out-of-date, Snowflake performs automatic background maintenance of materialized views. When a base table changes, all materialized views defined on the table are updated by a background service that uses compute resources provided by Snowflake."
---
## Q62

**Answer: D**

**Explanation:** The persisted query results cache (result cache) is what allows identical queries to return instantly without consuming warehouse credits. The data not having changed since the last execution is a key condition for reuse. No warehouse is needed to return cached results, which is why no credits are consumed.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "When a query is executed, the result is persisted (i.e. cached) for a period of time... Instead of running the query again, Snowflake simply returns the same result that it returned previously. This can substantially reduce query time because Snowflake bypasses query execution and, instead, retrieves the result directly from the cache."
---
## Q63

**Answer: B, D**

**Explanation:** Materialized views incur both (B) serverless compute credits for maintenance and (D) storage costs for the pre-computed result set. Resource monitors (A) cannot control materialized view maintenance costs because resource monitors only apply to user-managed virtual warehouses, not serverless features.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "The automatic maintenance of materialized views consumes credits. Storage: Each materialized view stores query results, which adds to the monthly storage usage for your account. Compute resources: In order to prevent materialized views from becoming out-of-date, Snowflake performs automatic background maintenance of materialized views... These updates can consume significant resources, resulting in increased credit usage."
---
## Q64

**Answer: C**

**Explanation:** The MATERIALIZED_VIEW_REFRESH_HISTORY view in ACCOUNT_USAGE tracks credit consumption from materialized view maintenance operations. It can be queried to analyze costs by day, by materialized view, and to identify high-consumption views. WAREHOUSE_METERING_HISTORY tracks only virtual warehouse credits.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "MATERIALIZED_VIEW_REFRESH_HISTORY view (in Account Usage)."
---
## Q65

**Answer: B**

**Explanation:** When only 3 out of 5,000 micro-partitions are scanned for a query filtering on order_date AND region, it is the combination of a clustering key on those columns and the resulting micro-partition pruning that eliminates 99.94% of the scan. The clustering key organizes data to co-locate similar values, and the metadata enables precise pruning at query time.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "The micro-partition metadata maintained by Snowflake enables precise pruning of columns in micro-partitions at query run-time... In other words, a query that specifies a filter predicate on a range of values that accesses 10% of the values in the range should ideally only scan 10% of the micro-partitions."
---
## Q66

**Answer: B**

**Explanation:** The warehouse local disk (SSD) cache is entirely volatile—it is dropped when the warehouse is suspended. Unlike the result cache (which persists in the cloud services layer), the local disk cache is tied to the running state of the warehouse. This is why managing the auto-suspend setting is important for cache-dependent workloads.

**Source:** [Optimizing the warehouse cache](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache)

**Quote:** "A running warehouse maintains a cache of table data that can be accessed by queries running on the same warehouse... the cache is dropped when the warehouse is suspended."
---
## Q67

**Answer: B, D**

**Explanation:** Resource monitors support three types of actions: Notify, Notify & Suspend (graceful), and Notify & Suspend Immediately. They cannot (B) automatically resize warehouses to a smaller size or (D) drop warehouses permanently. Dropping or resizing a warehouse is a structural change that resource monitors are not designed to perform.

**Source:** [Working with resource monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "Resource monitors support the following actions: Notify & Suspend: Send a notification and suspend all assigned warehouses after all statements being executed by the warehouse(s) have completed. Notify & Suspend Immediately: Send a notification and suspend all assigned warehouses immediately... Notify: Perform no action on warehouses, but send a notification."
---
## Q68

**Answer: C**

**Explanation:** The Query Profile in Snowsight provides a visual, graphical breakdown of query execution, showing each operator node with statistics including bytes spilled to local and remote storage, rows processed, and execution time. It is the primary tool for diagnosing memory/spill issues. The EXPLAIN command shows the execution plan before running but does not show runtime statistics like spill data.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service depends on server availability. Therefore, performance improvements might fluctuate over time."
---
## Q69

**Answer: B**

**Explanation:** The EXPLAIN command is the standard SQL command used to display the query execution plan without actually running the query. This is useful for understanding how Snowflake plans to execute a query, which operations will be performed, and where potential bottlenecks might occur—all without consuming warehouse credits for execution.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "The EXPLAIN command generates the explain plan for a query without executing it."
---
## Q70

**Answer: B**

**Explanation:** Snowflake explicitly documents that when QAS is enabled, a small amount of data is written to remote storage as part of the QAS processing pipeline—even for queries where QAS didn't ultimately accelerate anything. Seeing a non-zero bytes_spilled_to_remote_storage value is expected behavior when QAS is enabled, not a performance problem.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "When the query acceleration service (QAS) is enabled, Snowflake writes a small amount of data to remote storage for each eligible query, even if QAS isn't used for that query. Therefore, don't be concerned by a nonzero value for bytes_spilled_to_remote_storage in the QUERY_HISTORY view when QAS is enabled."
---
## Q71

**Answer: B**

**Explanation:** The QUERY_HISTORY view in ACCOUNT_USAGE (and INFORMATION_SCHEMA) tracks spillage via BYTES_SPILLED_TO_LOCAL_STORAGE and BYTES_SPILLED_TO_REMOTE_STORAGE columns. These two columns allow engineers to identify queries with memory pressure and quantify how much data overflowed to local disk vs. the slower remote cloud storage.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "bytes_spilled_to_local_storage and bytes_spilled_to_remote_storage tracked in QUERY_HISTORY"
---
## Q72

**Answer: B, D**

**Explanation:** When a query spills to remote storage, it means the warehouse has run out of both local memory and local SSD space. The two recommended remedies are: (B) using a larger warehouse which provides more memory and local storage, and (D) processing data in smaller batches to reduce the memory footprint per operation.

**Source:** [Queries too large to fit in memory](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory)

**Quote:** "Data spilling to storage can have a negative impact on query performance (especially if the query has to spill to remote storage). To alleviate this, Snowflake recommends: Using a larger warehouse (effectively increasing the available memory/local storage space for the operation)... processing data in smaller batches."
---
## Q73

**Answer: B**

**Explanation:** The Standard scaling policy (default) starts additional clusters as soon as a query is queued or when Snowflake estimates insufficient resources for incoming queries. This is contrasted with the Economy policy, which requires an estimated 6 minutes of work to justify starting a new cluster.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Standard (default): Prevents/minimizes queuing by favoring starting additional clusters over conserving credits. When a query is queued, or if Snowflake estimates the currently running clusters don't have enough resources to handle any additional queries, Snowflake increases the number of clusters in the warehouse."
---
## Q74

**Answer: D**

**Explanation:** The maximum number of clusters for a multi-cluster warehouse depends on warehouse size. Smaller warehouses support more clusters. An X-Small warehouse supports up to 300 clusters. Larger warehouses (like 4X-Large through 6X-Large) are limited to 10 clusters. The default maximum shown in Snowsight UI is 10, but SQL commands can go up to the size-based limit.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "XSMALL: 300" (from the upper limit on number of clusters table)"
---
## Q75

**Answer: A, C, D**

**Explanation:** Three true statements: (A) micro-partitions are 50-500 MB uncompressed, (C) columns are stored independently within micro-partitions (columnar storage enabling efficient column-level scanning), and (D) micro-partitions can overlap in value ranges. Micro-partitions are created automatically—not manually (B)—and are specifically small (unlike traditional large partitions) (E).

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "All data in Snowflake tables is automatically divided into micro-partitions, which are contiguous units of storage. Each micro-partition contains between 50 MB and 500 MB of uncompressed data. Columns are stored independently within micro-partitions, often referred to as columnar storage. Micro-partitions can overlap in their range of values, which, combined with their uniformly small size, helps prevent skew."
---
## Q76

**Answer: B**

**Explanation:** The INFORMATION_SCHEMA includes the QUERY_ACCELERATION_HISTORY table function that returns QAS billing data for recent time windows (typically 7-14 days). The ACCOUNT_USAGE QUERY_ACCELERATION_HISTORY view provides longer historical retention (up to 365 days). SYSTEM$ESTIMATE_QUERY_ACCELERATION assesses eligibility but does not show billing history.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "You can also view billing data using the Information Schema QUERY_ACCELERATION_HISTORY function."
---
## Q77

**Answer: B**

**Explanation:** SYSTEM$ESTIMATE_QUERY_ACCELERATION takes a query ID as input and returns a JSON result showing whether the query is eligible, the ineligibility reason if not eligible, and estimated execution times at various scale factors. It requires a previously executed query ID.

**Source:** [Using the Query Acceleration Service (QAS)](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The SYSTEM$ESTIMATE_QUERY_ACCELERATION function can help determine if a previously executed query might benefit from the query acceleration service. If the query is eligible for query acceleration, the function returns the estimated query execution time for different query acceleration scale factors."
---
## Q78

**Answer: B, D**

**Explanation:** ACCOUNT_USAGE (B) retains data for up to 365 days and (D) has latency of up to 45 minutes before new data appears. INFORMATION_SCHEMA, in contrast, has low latency but shorter retention (typically 7 days for QUERY_HISTORY). The two schemas serve complementary purposes: INFORMATION_SCHEMA for near-real-time operational queries, ACCOUNT_USAGE for historical analysis.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "Account Usage views provide up to 365 days of historical data about warehouse metering, query history, and other account activity. Data in Account Usage views may have a latency of up to 45 minutes before appearing."
---
## Q79

**Answer: B**

**Explanation:** High-cardinality equality predicates (like `user_id = 12345`) are the ideal use case for the Search Optimization Service. While high cardinality columns are not recommended for clustering keys (clustering is most effective for low-to-medium cardinality), SOS is specifically designed for selective point lookups. The SOS search access path tracks which micro-partitions contain specific values, enabling precise pruning for equality conditions.

**Source:** [Search optimization service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service aims to significantly improve the performance of certain types of queries on tables, including: Selective point lookup queries on tables. A point lookup query returns only one or a small number of distinct rows."
---
## Q80

**Answer: B, D**

**Explanation:** Two correct statements: (B) the result cache requires no warehouse and returns results at no compute cost when conditions are met, and (D) the result cache has a 24-hour TTL while the warehouse local SSD cache is dropped upon warehouse suspension. Option (A) has the hierarchy backwards—result cache is fastest/cheapest. Option (C) is false because the local SSD cache is dropped on suspension. Option (E) is false because result cache and metadata cache are in the cloud services layer, not the warehouse.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Instead of running the query again, Snowflake simply returns the same result that it returned previously. This can substantially reduce query time because Snowflake bypasses query execution and, instead, retrieves the result directly from the cache. For persisted query results of all sizes, the cache expires after 24 hours. A running warehouse maintains a cache of table data that can be accessed by queries running on the same warehouse... the cache is dropped when the warehouse is suspended."
