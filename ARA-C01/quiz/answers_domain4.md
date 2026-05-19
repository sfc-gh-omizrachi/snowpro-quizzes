# Domain 4: Answers

---

## Q1
**Answer: B**

**Explanation:** When a Query Profile shows that a significant number of partitions are scanned relative to the total (800 out of 10,000), it indicates poor micro-partition pruning on the filter column. Adding a clustering key on the DATE column used in the WHERE clause reorganizes data so that each micro-partition contains a narrower range of dates, dramatically reducing the number of partitions that must be scanned. Increasing warehouse size (A) speeds up scanning but doesn't reduce the volume. SOS (C) is better for point lookups. QAS (D) offloads scan work but doesn't reduce partitions scanned.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A clustering key defines the order in which data is organized within micro-partitions. Well-clustered data enables Snowflake to skip scanning micro-partitions that do not contain relevant data."

---

## Q2
**Answer: A**

**Explanation:** SYSTEM$CLUSTERING_INFORMATION accepts a table name and optionally a list of column expressions. It returns clustering metrics (average depth, partition overlap, etc.) for any set of columns, whether or not they are defined as the table's clustering key. This makes it the right function to assess clustering quality before committing to a key. SYSTEM$CLUSTERING_DEPTH (B) returns only the average depth as a scalar. Options C and D do not exist as Snowflake system functions.

**Source:** [SYSTEM$CLUSTERING_INFORMATION](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information)

**Quote:** "Returns clustering information, including average clustering depth, for a table, including for columns in a table that is not clustered."

---

## Q3
**Answer: D**

**Explanation:** When queries spill to remote storage, it indicates the data volume exceeds both memory and local SSD. Snowpark-optimized warehouses provide significantly more memory and local SSD per node than standard warehouses, making them ideal for memory-intensive operations like large aggregations. Scaling up (A) adds more nodes but standard nodes still have the same memory-to-compute ratio. Breaking queries (B) adds complexity. QAS (C) accelerates scans but doesn't address spilling from aggregation.

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses provide 16x memory per node compared to a standard warehouse... ideal for workloads that have large memory requirements such as ML training or large-scale data transformations."

---

## Q4
**Answer: B, C**

**Explanation:** Spilling to remote storage (cloud object storage) is significantly slower than spilling to local SSD because of network latency and throughput constraints (B). Snowpark-optimized warehouses offer more local SSD storage, which keeps more spilled data on fast local disk rather than slow remote storage (C). Spilling to local storage does have a measurable performance impact compared to in-memory processing (A is wrong). Auto-suspend timeout has no effect on spilling (D). Spilling occurs during any memory-intensive operation, not just COPY INTO (E).

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses have 10x the amount of local SSD storage as a standard warehouse for use as local spill space... This reduces the need to spill to remote storage, which typically has lower throughput."

---

## Q5
**Answer: B**

**Explanation:** High "Remote Disk I/O" with minimal "Local Disk I/O" means the warehouse exhausted both memory and local SSD cache, forcing data to be read from or spilled to remote cloud storage. This is typical of large joins where intermediate results exceed available local resources. Poor clustering (C) would show high partition counts, not necessarily remote disk I/O. Result cache expiration (A) and metadata staleness (D) are unrelated to disk I/O patterns.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Bytes spilled to remote storage — the volume of data spilled to remote disk... A large volume of data spilled to remote storage could be a sign that the warehouse does not have enough local resources."

---

## Q6
**Answer: B**

**Explanation:** Snowflake recommends a maximum of 3 to 4 columns for a clustering key. Adding too many columns reduces the effectiveness of pruning because the data becomes spread across too many dimensions. The recommendation is to choose the most selective and commonly filtered columns.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "In general, Snowflake recommends a maximum of 3 or 4 columns (or expressions) per key."

---

## Q7
**Answer: B**

**Explanation:** When queries filter on both REGION and ORDER_DATE, the clustering key should include both columns. The lower-cardinality column (REGION, with likely dozens of values) should come first, followed by the higher-cardinality column (ORDER_DATE). This maximizes pruning efficiency because Snowflake can first narrow by region, then by date within that region. Dropping the date key (A) loses date pruning. A materialized view (C) adds storage cost. SOS (D) is better for point lookups, not range scans.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "If you are defining a multi-column clustering key, put the lower-cardinality column before the higher-cardinality column."

---

## Q8
**Answer: C**

**Explanation:** Snowflake documentation recommends placing the lowest-cardinality column first in a multi-column clustering key. This ensures broad partition pruning happens first (eliminating large swaths of data), then finer pruning by higher-cardinality columns within the remaining partitions. Placing the highest-cardinality column first (A) fragments data too much. Join columns (B) and alphabetical order (D) are not relevant ordering principles.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Snowflake recommends ordering the columns from lowest cardinality to highest cardinality."

---

## Q9
**Answer: A, C**

**Explanation:** SOS excels at equality predicates and IN-list predicates on high-cardinality columns (A), where traditional pruning is ineffective. It also supports queries on semi-structured VARIANT data using predicates on field paths (C). Full table scan aggregations (B) don't benefit from SOS since all data must be read. Join optimization (D) and ORDER BY (E) are not SOS use cases.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service can significantly improve the performance of selective point lookup queries... including equality searches, IN predicates, predicates on fields in VARIANT columns, and queries that use selected geospatial functions."

---

## Q10
**Answer: B**

**Explanation:** For point lookups on high-cardinality columns (millions of unique customer IDs), the Search Optimization Service is more appropriate than clustering. SOS builds search access paths that enable near-constant-time lookups. Clustering keys (A) are better for range scans and lower-cardinality columns. Increasing warehouse size (C) doesn't reduce the number of partitions scanned. Materialized views for specific IDs (D) are impractical with millions of customers.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service is particularly effective for point lookup queries that return a small number of rows from large tables with millions or billions of rows."

---

## Q11
**Answer: B**

**Explanation:** When a warehouse is resized while queries are running, Snowflake allows the running queries to complete using the current resources. The new size takes effect for subsequent queries. Queries are not terminated (A), the resize is not rejected (C), and queries are not suspended (D).

**Source:** [Resizing a Warehouse](https://docs.snowflake.com/en/user-guide/warehouses-tasks#resizing-a-warehouse)

**Quote:** "If a resize is requested while queries are running, the new size only takes effect after the running queries are finished."

---

## Q12
**Answer: D**

**Explanation:** Creating separate warehouses for ETL and ad-hoc workloads allows optimal AUTO_SUSPEND settings for each: the ETL warehouse can be configured with a short AUTO_SUSPEND (it runs continuously during the 3-hour job then suspends), while the ad-hoc warehouse can have AUTO_SUSPEND tuned for intermittent usage. This avoids keeping an XL warehouse running during low-utilization ad-hoc periods. Reducing AUTO_SUSPEND alone (A) helps but doesn't address the warehouse size mismatch. Increasing size (B) increases cost. Disabling AUTO_RESUME (C) disrupts operations.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Consider using different warehouses for different workloads... This allows each warehouse to be sized and configured appropriately for its specific workload."

---

## Q13
**Answer: B**

**Explanation:** With the STANDARD scaling policy, Snowflake starts an additional cluster when the system estimates there is enough query load to keep the new cluster busy for at least 6 minutes. This prevents rapid cluster churn. It does not start a cluster on a single queued query (A), is not based on a fixed concurrency threshold (C), or memory usage (D).

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "STANDARD: Minimizes queuing by starting additional clusters as soon as the system detects there is enough query load to benefit from an additional cluster... the system starts an additional cluster when it estimates that there is enough query load to keep the cluster busy for at least 6 minutes."

---

## Q14
**Answer: A, B**

**Explanation:** STANDARD scaling is more aggressive — it starts new clusters as soon as it detects sufficient load to keep the cluster busy for 6 minutes (A). ECONOMY is conservative — it waits until query queuing has persisted for approximately 6 minutes before adding a cluster (B). Both policies can use the same maximum cluster count (C is wrong). Both use identical compute capacity per cluster (D is wrong). Both are available on Enterprise edition and above (E is wrong).

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "ECONOMY: Conserves credits by starting additional clusters only if the system estimates there's enough query load to keep the cluster busy for at least 6 minutes... this may result in query queuing."

---

## Q15
**Answer: B**

**Explanation:** The problem is concurrency (hundreds of small, fast queries), not individual query complexity. Multi-cluster warehouses with auto-scaling handle concurrency by spinning up additional identical clusters to process queries in parallel. Scaling up to 4XL (A) adds more compute per query but doesn't increase concurrency capacity proportionally. QAS (C) helps with large scan queries, not small fast queries. Client-side routing (D) is complex and error-prone.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are designed specifically for handling queuing and performance issues related to large numbers of concurrent users and/or queries."

---

## Q16
**Answer: C**

**Explanation:** The result cache stores the results of completed queries in the cloud services layer. When an identical query is submitted (with same SQL text, same role, and unchanged underlying data), the result is returned directly without consuming any warehouse compute. The metadata cache (A) stores partition statistics. Local disk cache (B) stores micro-partition data on warehouse SSDs. "Warehouse cache" (D) is not a formally named cache layer.

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "When a query is executed, Snowflake caches the result. If the same query is subsequently executed and the underlying data has not changed, the cached result is returned."

---

## Q17
**Answer: B**

**Explanation:** The result cache returned the second identical execution instantly because the data had not changed. The INSERT statement modified the underlying table, which invalidated the cached result for that query. The third execution therefore had to perform a full scan again. The metadata cache (A) stores partition-level statistics, not query results. Warehouse data cache (C) is not cleared by DML on the table. Query recompilation (D) is separate from execution time.

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "If the underlying data has changed (e.g., due to DML operations), the cached result is invalidated, and the next execution re-fetches data from the source."

---

## Q18
**Answer: D**

**Explanation:** Snowflake retains query results in the result cache for 24 hours, but each time the cached result is reused, the 24-hour counter resets. This means frequently accessed query results can persist in the cache indefinitely as long as the underlying data doesn't change and the result continues to be reused.

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Snowflake uses persisted query results to avoid re-generating results... The cache expires after 24 hours, but the expiry time is reset each time the cached result is reused."

---

## Q19
**Answer: A, D**

**Explanation:** The result cache is invalidated when the underlying table data changes (A) — any INSERT, UPDATE, DELETE, MERGE, or TRUNCATE causes invalidation. Non-deterministic functions like CURRENT_TIMESTAMP() (D) produce different results each time, so Snowflake cannot use a cached result. Different users in the same role (B) can share cached results. Warehouse resizing (E) does not affect the result cache (which is stored in the cloud services layer). Option C describes the same mechanism as A.

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The result for a query is not returned if... the table data has changed... the query includes functions that are not deterministic (e.g., CURRENT_TIMESTAMP or UUID_STRING)."

---

## Q20
**Answer: B**

**Explanation:** Non-deterministic functions like CURRENT_DATE() prevent the result cache from being used because the function's output changes over time. Removing the function from the query or replacing it with a bound session variable allows the result cache to work. There is no parameter to extend result cache retention (A). Metadata cache doesn't override this limitation (C). Multi-cluster warehouses don't reduce per-query credits (D).

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Queries that include non-deterministic functions — functions that might return different results each time they are called (e.g., CURRENT_TIMESTAMP()) — are not eligible for result caching."

---

## Q21
**Answer: A**

**Explanation:** In a hash join, the Build side should be the smaller table, and the Probe side should be the larger table. This is because the Build side is loaded into memory to create a hash table, and using the smaller dataset minimizes memory consumption. If the larger table (500M rows) is on the Build side and the smaller (50M) is on the Probe side, the optimizer chose suboptimally, or the query structure forced this arrangement. Missing ON clause (B) would show a Cartesian product, not a standard hash join operator. Clustering (C) and warehouse size (D) are secondary concerns.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "The build side of the join is used to build an in-memory hash table. The probe side scans through the data and looks up matches in the hash table."

---

## Q22
**Answer: D**

**Explanation:** The Exchange operator in the Query Profile represents data redistribution across compute nodes. This happens when data needs to be repartitioned for joins, aggregations, or other operations that require co-located data. Aggregate (A) performs aggregation computations. WindowFunction (B) processes window functions. JoinFilter (C) is a filter applied during a join.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Exchange operators distribute data across the nodes participating in a query. Data redistribution might be needed when joining or aggregating data."

---

## Q23
**Answer: D**

**Explanation:** High network bytes in multiple Exchange operators indicates extensive data redistribution across nodes. The most effective way to reduce this is to reduce the number of joins, which directly reduces data redistribution. Pre-aggregating or denormalizing the data eliminates joins and their associated network overhead. Clustering keys (A) help with pruning, not redistribution. CTEs (B) are syntactic and don't change the execution plan. Larger warehouses (C) may actually increase network overhead with more nodes.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "The bytes sent over the network metric indicates the amount of data that is transferred between participating nodes in a query."

---

## Q24
**Answer: B, D**

**Explanation:** Bytes spilled to local/remote storage (B) directly indicates the warehouse lacks sufficient memory for the workload, suggesting a need to scale up. Long execution time dominated by a few compute-heavy operators (D) suggests those operators need more resources per node, which scaling up provides. Partition scan ratios (A) indicate pruning issues, not size issues. Query queuing (C) indicates concurrency issues (scale out). Result cache ratio (E) measures caching effectiveness.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Bytes spilled — when the warehouse does not have enough memory to hold intermediate results, it spills data to disk. Large amounts of spilling suggest the warehouse is too small for the query."

---

## Q25
**Answer: B**

**Explanation:** The Query Acceleration Service offloads portions of a query's scan-intensive processing to shared serverless compute resources. It is designed for queries with large table scans that can be parallelized beyond the warehouse's own compute capacity. It does not add clustering keys (A), cache data in a special tier (C), or parallelize compilation (D).

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service can accelerate parts of the query workload in a warehouse by offloading portions of the query processing work to shared compute resources."

---

## Q26
**Answer: B**

**Explanation:** QAS is most beneficial for queries with large scan operations that can be parallelized, typically long-running analytical queries scanning hundreds of millions of rows. Short OLTP-style queries (A) have minimal scan overhead and won't benefit significantly. QAS does not accelerate all queries equally (C). QAS addresses scan-heavy queries, not queued queries specifically (D).

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service is most effective for queries that involve large table scans... particularly queries that scan a large number of micro-partitions and apply selective filters."

---

## Q27
**Answer: A**

**Explanation:** SYSTEM$ESTIMATE_QUERY_ACCELERATION is the system function that provides an estimate of the potential acceleration benefit for a warehouse. It analyzes the query history of the warehouse and estimates how much QAS could reduce query times. Option C is for Search Optimization. Option D is for clustering. Option B does not exist.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Use the SYSTEM$ESTIMATE_QUERY_ACCELERATION function to estimate the potential benefit of the query acceleration service for a specific warehouse."

---

## Q28
**Answer: B**

**Explanation:** Snowpark-optimized warehouses provide a higher memory-to-compute ratio (16x memory per node compared to standard warehouses), making them ideal for memory-intensive operations like ML model training that loads large datasets into memory. A standard 4XL (A) has more nodes but the same memory-per-node ratio. Multi-cluster (C) adds concurrency, not per-node memory. QAS (D) accelerates scans, not in-memory processing.

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses provide 16x memory per node compared to a standard warehouse... ideal for workloads that have large memory requirements."

---

## Q29
**Answer: B**

**Explanation:** The key difference is that Snowpark-optimized warehouses have a higher ratio of memory and local SSD storage per compute node. They provide 16x the memory and 10x the local SSD compared to standard warehouses of the same size. They do not have more CPUs (A), higher concurrency (C), or a different optimizer (D).

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses have more memory and local SSD cache per node than standard warehouses."

---

## Q30
**Answer: D**

**Explanation:** AUTO_SUSPEND = 300 means the warehouse suspends after 300 seconds (5 minutes) of inactivity. The last query completed at 09:00:15, and no further queries arrive. The 300-second inactivity timer starts from 09:00:15. Therefore, the warehouse suspends at 09:00:15 + 5 minutes = 09:05:15.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Auto-suspend defines the number of seconds of inactivity after which a warehouse is automatically suspended."

---

## Q31
**Answer: B, D**

**Explanation:** Snowpark-optimized warehouses provide more local SSD cache capacity (10x), reducing the need to spill to slower remote storage (B). They also offer a higher memory-to-compute ratio (16x memory per node), reducing out-of-memory errors for large data operations (D). They do not provide 16x memory compared to standard (A is misleadingly worded — while they do have 16x, the question asks about local SSD AND memory separately). They don't include pre-installed libraries (C) or GPU instances (E).

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses have 10x local SSD storage... and 16x memory per node. These warehouses are ideal for memory-intensive workloads."

---

## Q32
**Answer: B**

**Explanation:** With ECONOMY scaling, Snowflake waits until query queuing has persisted for approximately 6 minutes before adding clusters. This means queries queue unnecessarily during ramp-up. Switching to STANDARD scaling starts new clusters more aggressively when load is detected, reducing latency during peak periods. Increasing MAX_CLUSTER_COUNT (A) won't help if the scaling policy is too conservative. Reducing MIN_CLUSTER_COUNT to 0 (C) is not valid for multi-cluster warehouses. Increasing warehouse size (D) addresses per-query complexity, not concurrency.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "STANDARD: Minimizes queuing by favoring starting additional clusters over conserving credits... ECONOMY: Conserves credits by favoring keeping running clusters fully loaded."

---

## Q33
**Answer: B**

**Explanation:** The minimum AUTO_SUSPEND value for a virtual warehouse is 60 seconds. Setting AUTO_SUSPEND = 0 actually disables auto-suspend entirely (the warehouse never suspends automatically), rather than suspending immediately. The minimum positive timeout value is 60 seconds.

**Source:** [CREATE WAREHOUSE](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse)

**Quote:** "Specifies the number of seconds of inactivity after which a warehouse is automatically suspended... minimum value is 60. Specifying 0 disables auto-suspend."

---

## Q34
**Answer: B**

**Explanation:** Setting MIN_CLUSTER_COUNT = 1 allows the multi-cluster warehouse to scale down to a single cluster during idle periods, and AUTO_SUSPEND = 60 ensures even that single cluster suspends quickly when no queries are running. This minimizes idle credit consumption while maintaining auto-scaling capability during peak hours. Option A alone still has the cluster running indefinitely if no queries come. ECONOMY scaling (C) affects scale-up behavior, not idle resource consumption. Setting MAX = MIN (D) eliminates auto-scaling.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "The minimum number of clusters defines the minimum number of clusters that run when the warehouse is running... The warehouse still auto-suspends based on the auto-suspend setting."

---

## Q35
**Answer: B**

**Explanation:** AUTOMATIC_CLUSTERING_HISTORY in the ACCOUNT_USAGE schema provides historical information about the credit consumption and bytes reclustered by the automatic clustering service. WAREHOUSE_METERING_HISTORY (A) tracks warehouse compute credits. Options C and D do not exist for this purpose.

**Source:** [AUTOMATIC_CLUSTERING_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/automatic_clustering_history)

**Quote:** "The AUTOMATIC_CLUSTERING_HISTORY view can be used to query the credit usage and bytes reclustered for tables with automatic clustering."

---

## Q36
**Answer: A, C**

**Explanation:** Auto-clustering is a Snowflake-managed serverless feature that consumes credits from a separate serverless compute pool, not from user warehouses (A). It intelligently targets only micro-partitions that have become poorly clustered due to DML changes, not the entire table (C). It does not recluster the entire table hourly (B). It does not require a user warehouse (D). It runs automatically and does not require manual triggering (E).

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Automatic Clustering is a Snowflake-managed, serverless service that reclusters micro-partitions as needed, based on the clustering key defined for the table."

---

## Q37
**Answer: B**

**Explanation:** An average clustering depth of 1.2 is near-optimal (1.0 would be perfect). This means the table is already very well-clustered on TRANSACTION_DATE, and the performance issue lies elsewhere — likely in the query itself, the warehouse size, join complexity, or other factors unrelated to clustering. Low clustering credit consumption confirms there's little work needed. The table is not too small (A). The service is not broken (C). Hashing the date column (D) would worsen range-scan performance.

**Source:** [SYSTEM$CLUSTERING_INFORMATION](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information)

**Quote:** "The average depth indicates how many micro-partitions overlap for the clustering key. A depth close to 1 indicates the table is well-clustered."

---

## Q38
**Answer: B**

**Explanation:** For a perfectly clustered table, SYSTEM$CLUSTERING_DEPTH returns 1, meaning each micro-partition contains a unique, non-overlapping range of values for the clustering key columns. A value of 0 (A) is not possible — the minimum is 1. The number of micro-partitions (C) and distinct values (D) are unrelated to the depth metric.

**Source:** [SYSTEM$CLUSTERING_DEPTH](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_depth)

**Quote:** "The clustering depth for a table is a measure of the average depth of the overlapping micro-partitions for specified columns. A smaller average depth indicates better clustering. A depth of 1 is the ideal state."

---

## Q39
**Answer: B**

**Explanation:** Point lookups (WHERE patient_id = 'P12345') on high-cardinality columns (10M unique values) are the ideal use case for the Search Optimization Service. SOS builds search access paths that enable near-constant-time lookups regardless of table size. Changing the clustering key to patient_id (A) would degrade the existing date-based clustering and is less effective for point lookups than SOS. Snowflake does not support secondary indexes (C). Materialized views for specific patient IDs (D) are impractical.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service can improve the performance of point lookup queries... It is particularly effective for large tables with millions of rows."

---

## Q40
**Answer: B, C**

**Explanation:** SOS costs include: (1) storage cost for the search access paths that are maintained (B), and (2) compute cost for building and maintaining those access paths when DML operations modify the table data (C). The number of queries run (A) doesn't directly determine SOS cost. The warehouse size used for querying (D) is separate from SOS cost. SOS cost is tied to optimized columns, not all columns (E).

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service has both storage and compute costs. Storage costs are associated with the search access paths. Compute costs are incurred for building and maintaining the search access paths."

---

## Q41
**Answer: B**

**Explanation:** The Search Optimization Service maintains search access paths incrementally. With 500,000 INSERT operations per day via Snowpipe (many small micro-batches), each micro-batch triggers incremental maintenance of the access paths, resulting in high cumulative compute cost. The service does support Snowpipe-loaded tables (A is wrong). It does not rebuild from scratch on each INSERT (C). Snowpipe does not bypass metadata (D).

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The serverless compute costs for the search optimization service are affected by the volume and frequency of DML operations on the table."

---

## Q42
**Answer: A**

**Explanation:** When the Query Profile shows "Partitions scanned: 0" while "Partitions total" is greater than 0, it means the metadata cache was sufficient to answer the query without scanning any data. This is typical for metadata operations like COUNT(*), MIN, MAX on columns. A result cache hit (C) would show as the query being served from the result cache, not via partition statistics. Network bytes (B) and compilation time (D) are not indicators of metadata cache usage.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "If a query can be satisfied entirely from metadata, the partitions scanned will show 0, indicating no micro-partitions needed to be accessed."

---

## Q43
**Answer: B**

**Explanation:** Simple aggregate queries like COUNT(*) with equality filters on partitioning columns can be answered entirely from Snowflake's metadata cache, which stores MIN/MAX values, row counts, and NULL counts per micro-partition. This allows the query to return without consuming warehouse compute. The result cache (A) requires a previous identical execution. SOS (C) doesn't answer queries directly. The warehouse data cache (D) would still require warehouse compute.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake stores metadata about all rows stored in a micro-partition, including the range of values for each column, the number of distinct values, and additional properties used for both optimization and efficient query processing."

---

## Q44
**Answer: C**

**Explanation:** The warehouse data cache (also called local SSD cache) stores raw micro-partition data on the local SSDs of the warehouse nodes. When a warehouse is suspended, these compute nodes are released, and the local cache is lost. The result cache (A) is stored in the cloud services layer and persists across warehouse suspensions. The metadata cache (B) is also in the cloud services layer. Cloud services cache (D) also persists.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "When a warehouse is suspended, the data in the local cache is dropped. If the warehouse is resumed later, the cache must be rebuilt as queries are run."

---

## Q45
**Answer: B**

**Explanation:** With AUTO_SUSPEND = 60 seconds and queries arriving every 2-3 minutes, the warehouse suspends between queries. When it suspends, the local SSD data cache is cleared. Each subsequent query must read data from remote storage ("cold start"), making it slow. The alternating pattern (fast/slow) occurs because the first query populates the cache, but if the gap exceeds 60 seconds, the warehouse suspends and the cache is lost. Increasing AUTO_SUSPEND would retain the cache between queries.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "The data cache is dropped when a warehouse is suspended. Consider the trade-off between saving credits with a shorter auto-suspend period versus maintaining the data cache for improved query performance."

---

## Q46
**Answer: A, C**

**Explanation:** The metadata cache stores statistics like MIN/MAX values, row counts, NULL counts, and distinct value approximations per micro-partition (A). Queries like SELECT COUNT(*) or SELECT MIN(col) can be answered entirely from these statistics without scanning data (C). The metadata cache is stored in the cloud services layer, not in warehouse local storage (B is wrong). It does not expire after 24 hours (D). It is available for all tables, not just those with clustering keys (E).

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake stores metadata about all rows stored in a micro-partition, including the range of values for each of the columns... This micro-partition metadata enables precise pruning of columns in micro-partitions at query time."

---

## Q47
**Answer: B**

**Explanation:** When a Filter operator removes 99% of rows AFTER a full table scan, it means the table scan could not prune any micro-partitions (all 1 million were scanned). Adding a clustering key on the filter columns will reorganize data so that rows matching the predicate are concentrated in fewer micro-partitions, enabling the scan to skip most partitions. Increasing warehouse size (A) speeds the scan but doesn't reduce work. Result cache (C) only helps with repeated identical queries. LIMIT (D) doesn't reduce the scan scope when combined with a WHERE clause.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "If queries on a table typically filter or sort on a particular column, clustering the table on that column can significantly improve query performance by enabling more effective partition pruning."

---

## Q48
**Answer: B**

**Explanation:** Micro-partition pruning is Snowflake's ability to skip scanning micro-partitions whose metadata (MIN/MAX ranges, NULL counts) indicates they cannot contain rows matching the query's filter predicates. This avoids unnecessary I/O and dramatically improves query performance on well-clustered tables. It is not about deleting partitions (A), splitting them (C), or compression (D).

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake uses the micro-partition metadata to determine which micro-partitions, and which columns within those micro-partitions, might contain data matching a query filter, reducing the amount of data scanned."

---

## Q49
**Answer: B**

**Explanation:** The reduction from 5,000 to 500 partitions scanned (90% improvement) is a direct result of better micro-partition pruning. Clustering reorganized the data so that the filter predicates match rows concentrated in fewer partitions, allowing Snowflake to skip the rest. The improvement is not necessarily a 10x compute time reduction (A) because scanning is just part of total execution. SOS (C) is not automatically enabled by clustering. Metadata cache (D) stores statistics, not precomputed results.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A well-clustered table enables Snowflake to scan fewer micro-partitions, reducing the number of partitions that need to be read."

---

## Q50
**Answer: A**

**Explanation:** QUERY_HISTORY() is the INFORMATION_SCHEMA table function that provides near real-time information about queries currently executing and recently completed (within the last 7 days) on a warehouse. WAREHOUSE_LOAD_HISTORY() (B) provides load metrics, not individual query details. TASK_HISTORY() (C) is for task executions. QUERY_RUNTIME_HISTORY() (D) does not exist.

**Source:** [QUERY_HISTORY](https://docs.snowflake.com/en/sql-reference/functions/query_history)

**Quote:** "QUERY_HISTORY family of table functions can be used to query Snowflake query history along various dimensions... returns query activity within the last 7 days."

---

## Q51
**Answer: B**

**Explanation:** A Snowflake Alert can be configured to periodically check WAREHOUSE_METERING_HISTORY for daily credit consumption and trigger an email notification via SYSTEM$SEND_EMAIL() when the threshold is exceeded. Resource monitors (A) operate on warehouse-level or account-level quotas but are designed for quota enforcement, not flexible alerting. INFORMATION_SCHEMA views (C) have a 14-day retention and polling would need a task. AUTO_SUSPEND (D) is time-based, not credit-based.

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "An alert is a schema-level object that specifies a condition and an action. When the condition is met, the action is executed."

---

## Q52
**Answer: A, D**

**Explanation:** Resource monitors can notify account administrators via email when a threshold is reached (A) and can suspend the warehouse after all currently running queries complete — the "Suspend & Notify" action (D). "Suspend Immediately" kills running queries (B describes immediate suspend which is a separate action, but the option says "killing all running queries" which describes immediate suspend — B is a valid action but the question asks about reaching a quota, and both Notify and Suspend After are the most commonly configured pair). Resource monitors cannot resize warehouses (C) or enable QAS (E).

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "When a resource monitor reaches a threshold, it can perform one of the following actions: Notify & Continue, Suspend (after queries finish), or Suspend Immediately."

---

## Q53
**Answer: B**

**Explanation:** At 85% usage, only the 75% trigger has been crossed, which sent a notification. The next trigger at 90% has not yet been reached, so no suspension action is taken. Resource monitor triggers are evaluated independently at their specified thresholds. At 85%, the system is between the 75% (Notify) and 90% (Suspend After) triggers.

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "Each trigger threshold specifies a percentage of the quota at which the associated action is taken... Actions are triggered only when their specific threshold is reached."

---

## Q54
**Answer: A**

**Explanation:** ACCOUNT_USAGE views have a latency of up to 45 minutes (sometimes up to 2 hours for some views), while INFORMATION_SCHEMA views and table functions provide near real-time data. This is a key trade-off: ACCOUNT_USAGE provides longer historical retention (up to 365 days) but with latency; INFORMATION_SCHEMA provides real-time data but with shorter retention (7-14 days).

**Source:** [Account Usage vs Information Schema](https://docs.snowflake.com/en/sql-reference/account-usage#differences-between-account-usage-and-information-schema)

**Quote:** "Account Usage views have a latency of between 45 minutes and 3 hours... In contrast, Information Schema views and table functions have no latency."

---

## Q55
**Answer: B**

**Explanation:** SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY retains query history for 365 days, making it suitable for reviewing the past 12 months. INFORMATION_SCHEMA.QUERY_HISTORY (A) only retains data for 7 days. ACCESS_HISTORY (C) provides access patterns but not the full query details. ORGANIZATION_USAGE.QUERY_HISTORY (D) does not exist at the organization level for individual query details.

**Source:** [QUERY_HISTORY View (Account Usage)](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)

**Quote:** "The QUERY_HISTORY view in ACCOUNT_USAGE provides query history for the past 365 days."

---

## Q56
**Answer: A, E**

**Explanation:** Snowflake Alerts execute a SQL condition check on a defined schedule (A) and when the condition evaluates to TRUE, execute an action which is a SQL statement — this can include calling procedures, sending emails, or running other SQL (E). Alerts do not automatically tune warehouses (B), add clustering keys (D), or send emails by default (C is partially true but the action is a SQL statement that could call SYSTEM$SEND_EMAIL, not a built-in email capability of the alert itself).

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "An alert periodically evaluates a condition and performs an action when the condition is met. The action is a SQL statement."

---

## Q57
**Answer: A**

**Explanation:** A Snowflake Alert that checks TASK_HISTORY() for failed tasks and calls SYSTEM$SEND_EMAIL() as the action is the most Snowflake-native approach. This keeps all monitoring within Snowflake without external dependencies. An external Lambda (B) adds complexity. Error handling writing to external queues (C) requires external infrastructure. Resource monitors (D) don't detect task failures.

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "You can use alerts to monitor the status of your Snowflake resources and send notifications when certain conditions are met."

---

## Q58
**Answer: B**

**Explanation:** Event tables are the Snowflake feature for capturing application-level log messages and trace events generated by UDFs, UDTFs, and stored procedures. They provide a structured way to store and query operational telemetry. QUERY_HISTORY (A) records query execution metadata, not application logs. Alert history (C) tracks alert executions. Resource monitors (D) track credit usage.

**Source:** [Event Table](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up)

**Quote:** "An event table captures log messages and trace events from functions and procedures."

---

## Q59
**Answer: A**

**Explanation:** Setting the LOG_LEVEL parameter at the database (or schema/function) level and configuring an event table captures trace events from UDFs without code changes. The LOG_LEVEL and TRACE_LEVEL parameters control what gets captured. QAS (B) doesn't capture UDF details. Streams (C) capture table changes, not UDF execution. CHANGE_TRACKING (D) is for table change data, not UDF behavior.

**Source:** [Setting Up an Event Table](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up)

**Quote:** "You can control the severity level of log messages captured by setting the LOG_LEVEL parameter... The TRACE_LEVEL parameter controls the granularity of trace events captured."

---

## Q60
**Answer: B**

**Explanation:** LOG_LEVEL and TRACE_LEVEL can be set at multiple levels: account, database, schema, or individual object (function or procedure) level. This granular control allows architects to enable verbose logging for a specific problematic UDF without flooding the event table with logs from all functions.

**Source:** [Setting Log Level](https://docs.snowflake.com/en/developer-guide/logging-tracing/logging-log-level)

**Quote:** "You can set the log level at the account, database, schema, or object (e.g., function or procedure) level."

---

## Q61
**Answer: B**

**Explanation:** When queries filter on many different columns equally often, a clustering key is not ideal (too many columns, and only one key is allowed per table). The Search Optimization Service allows defining search methods on specific columns without the constraint of a single ordering. SOS handles point lookups on multiple columns efficiently. Creating 6 materialized views (A) is expensive and complex. A 6-column clustering key (C) exceeds the recommended 3-4 columns. Increasing warehouse size (D) doesn't address the pruning issue.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "You can use ALTER TABLE ... ADD SEARCH OPTIMIZATION to add search optimization on specific columns... The search optimization service can accelerate queries regardless of the clustering order of the table."

---

## Q62
**Answer: A, C**

**Explanation:** SOS accelerates equality and IN-list predicates (A), which are the primary point lookup patterns. It also supports geospatial predicates on GEOGRAPHY and GEOMETRY data types (C), enabling spatial queries to be optimized. Leading-wildcard LIKE predicates (B) with SUBSTRING search methods are also supported, but the question specifies leading wildcards without the SUBSTRING context. ORDER BY (D) and HAVING (E) are not SOS use cases.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service can improve performance of queries with equality predicates, IN predicates, queries that use GEOGRAPHY or GEOMETRY values, and queries that use VARIANT, OBJECT, or ARRAY values."

---

## Q63
**Answer: C**

**Explanation:** This is a classic case of complementary optimization: use a clustering key on the date column to improve range scan performance (date ranges benefit from data ordering), and use the Search Optimization Service on account_id for point lookups (SOS excels at equality predicates on high-cardinality columns). Using only one or the other (A, B) leaves one query pattern unoptimized. Increasing warehouse size (D) doesn't address the fundamental access pattern issue.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "Search optimization and clustering keys complement each other. Clustering keys improve range scan performance, while search optimization improves point lookup performance."

---

## Q64
**Answer: B**

**Explanation:** Natural clustering refers to the inherent ordering of data as it is loaded into Snowflake. Since data is stored in micro-partitions in the order it is ingested, tables loaded chronologically are naturally clustered by timestamp columns. This is why many time-series tables have good clustering on date columns without an explicit clustering key. Natural clustering is not an internal optimization algorithm (A), not limited to tables with keys (C), and not the result of background reclustering (D).

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Snowflake maintains clustering metadata for each micro-partition in a table, including the range of values of each column. Because data is inserted in the order it is received, tables have a natural clustering based on the order in which the data was loaded."

---

## Q65
**Answer: B**

**Explanation:** A clustering depth of 1.1 on LOAD_TIMESTAMP indicates near-perfect natural clustering (expected since data was loaded chronologically). A depth of 450 on CUSTOMER_ID indicates very poor clustering on that dimension — customer IDs are distributed across many overlapping partitions. The table does not need a clustering key on LOAD_TIMESTAMP (A) since it's already well-clustered. Both columns are not poorly clustered (C). Depth values don't indicate table size issues (D).

**Source:** [SYSTEM$CLUSTERING_INFORMATION](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information)

**Quote:** "The average_depth indicates the average overlap depth for each micro-partition. A smaller depth indicates the table is better clustered."

---

## Q66
**Answer: B**

**Explanation:** After a clustering key is defined, Snowflake's automatic clustering service (a serverless background process) continuously monitors and reclusters micro-partitions that become poorly clustered due to DML operations. Manual RECLUSTER (A) was deprecated in favor of automatic clustering. No dedicated user warehouse is needed (C). Clustering is maintained over time, not just at definition time (D).

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Automatic Clustering is the Snowflake service that seamlessly and continuously manages all reclustering, as needed, of clustered tables."

---

## Q67
**Answer: B**

**Explanation:** With an average clustering depth of 1.5 (near-optimal), the table is already well-clustered. The 150 credits consumed represent maintenance overhead for minimal benefit. Dropping the clustering key eliminates these unnecessary costs. The table's natural clustering or existing data distribution is sufficient. Increasing warehouse size (A) is unrelated. Adding more columns (C) would increase maintenance cost further. Manual RECLUSTER (D) was deprecated.

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Monitor clustering costs and query performance to determine whether the clustering key continues to provide value. If the table is naturally well-clustered, consider removing the clustering key to avoid unnecessary costs."

---

## Q68
**Answer: A, C**

**Explanation:** AUTOMATIC_CLUSTERING_HISTORY (A) tracks credits consumed by the auto-clustering serverless feature. SEARCH_OPTIMIZATION_HISTORY (C) tracks credits consumed by the Search Optimization Service. Both are ACCOUNT_USAGE views for monitoring serverless feature costs. WAREHOUSE_METERING_HISTORY (B) tracks warehouse compute, not serverless features. DATA_TRANSFER_HISTORY (D) and REPLICATION_USAGE_HISTORY (E) track different cost categories.

**Source:** [AUTOMATIC_CLUSTERING_HISTORY](https://docs.snowflake.com/en/sql-reference/account-usage/automatic_clustering_history)

**Quote:** "Use the AUTOMATIC_CLUSTERING_HISTORY view to query the history of data reclustered and credits consumed by the Automatic Clustering serverless feature."

---

## Q69
**Answer: C**

**Explanation:** Since the query runs every 15 minutes and the underlying data doesn't change more frequently than every 30 minutes, the result cache will serve most executions without any warehouse compute. The first execution populates the cache, and subsequent runs within the same data window return instantly. QAS (A) still requires compute. A materialized view (B) incurs maintenance costs. A clustering key (D) helps scan performance but doesn't eliminate the need for compute.

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "If a query is executed and the results are already in the cache, Snowflake returns the cached results without running the query again, saving compute resources."

---

## Q70
**Answer: B**

**Explanation:** The result cache is stored in the cloud services layer and is not tied to a specific warehouse. Any user executing the same query with the same role can benefit from a cached result, regardless of which warehouse they use. The cache is not warehouse-specific (A is wrong). It is not stored on local SSD (C). It works for all SELECT statements including those with JOINs (D).

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The result cache is not specific to a warehouse. If a matching cached result exists, it is returned regardless of which warehouse is used."

---

## Q71
**Answer: C**

**Explanation:** The result cache serves identical queries from the cloud services layer without consuming warehouse credits. Since all 50 queries are identical, the first one populates the result cache, and the remaining 49 are served from cache. This requires the same SQL text, same role, and unchanged underlying data — all conditions met here. Warehouse data cache (A) still consumes warehouse compute. Metadata cache (B) is for specific aggregate functions. Query compilation cache (D) reduces compilation time, not execution.

**Source:** [Understanding Query Results Caching](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "When a user repeats a query that has already been run, and the data in the table(s) hasn't changed since the last time that the query was run, the result of the query is retrieved from the cache."

---

## Q72
**Answer: C**

**Explanation:** When a warehouse is suspended, its compute nodes are released, and the warehouse data cache (local SSD/memory) is lost. Upon resumption, the cache is empty and must be rebuilt as queries are processed. The result cache (A) persists in the cloud services layer. The metadata cache (B) also persists. The cloud services layer cache (D) is not affected by warehouse suspension.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "When a warehouse is suspended, all data stored in the local cache is purged."

---

## Q73
**Answer: A**

**Explanation:** High "Percentage Scanned from Cache" means the warehouse data cache served the data efficiently (reducing I/O time). However, the query is still slow because it is CPU-bound — complex transformations, aggregations, or functions consume significant processing time even when data is already in cache. The query's bottleneck is compute, not I/O. This is not a stale cache issue (B), corruption (C), or SOS interference (D).

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Percentage scanned from cache indicates the portion of data that was read from the local disk cache rather than from remote storage."

---

## Q74
**Answer: A, C**

**Explanation:** Setting AUTO_SUSPEND to a lower value reduces idle warehouse time, saving credits without impacting query performance (since AUTO_RESUME brings the warehouse back when needed) (A). Leveraging the result cache by making queries deterministic avoids warehouse compute entirely for repeated queries (C). Reducing warehouse size (B) can negatively impact performance. Disabling auto-resume (D) disrupts operations. Removing clustering keys (E) can degrade query performance.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Setting a shorter auto-suspend timeout reduces the time a warehouse runs while idle, lowering credit consumption."

---

## Q75
**Answer: B**

**Explanation:** WAREHOUSE_LOAD_HISTORY shows query queuing and execution load metrics (identifying under-provisioned warehouses), while WAREHOUSE_METERING_HISTORY shows credit consumption (identifying over-provisioned warehouses that consume credits but run few queries). Together, they provide the complete picture of utilization vs. cost. QUERY_HISTORY (A) provides query-level detail but not warehouse-level utilization. INFORMATION_SCHEMA.WAREHOUSES (C) shows current config, not historical usage. TASK_HISTORY (D) is for task executions.

**Source:** [WAREHOUSE_LOAD_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_load_history)

**Quote:** "The WAREHOUSE_LOAD_HISTORY view provides details about the workload on each warehouse, including the number of queries running and queued."

---

## Q76
**Answer: B**

**Explanation:** AVG_QUEUED_LOAD in WAREHOUSE_LOAD_HISTORY indicates the average number of queries queued because the warehouse was executing other queries and didn't have capacity. This is the key metric for identifying when queries are waiting for compute resources. AVG_RUNNING (A) shows running queries. AVG_QUEUED_PROVISIONING (C) indicates queries queued while the warehouse was provisioning. AVG_BLOCKED (D) shows queries blocked by locks.

**Source:** [WAREHOUSE_LOAD_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_load_history)

**Quote:** "AVG_QUEUED_LOAD: Average number of queries queued because the warehouse was fully loaded and could not run any more queries."

---

## Q77
**Answer: B**

**Explanation:** AVG_QUEUED_LOAD consistently above 2 with a single-cluster warehouse indicates a concurrency problem — queries are waiting for resources. Converting to a multi-cluster warehouse with auto-scaling addresses concurrency by adding identical clusters during peak load. Increasing warehouse size (A) adds more compute per query but doesn't proportionally increase concurrency. QAS (C) offloads scan work but doesn't address queuing from concurrency. AUTO_SUSPEND (D) is unrelated to queuing.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "If queries are frequently queued, consider using a multi-cluster warehouse to handle the concurrent load."

---

## Q78
**Answer: A, D**

**Explanation:** SYSTEM$ESTIMATE_QUERY_ACCELERATION (A) analyzes a warehouse's query history and estimates which queries would benefit from QAS. The QUERY_HISTORY view contains the eligible_query_acceleration_time column (D), which shows the estimated time that could have been saved by QAS for each query. Spilling (C) indicates memory issues, not QAS eligibility. AUTOMATIC_CLUSTERING_HISTORY (E) is for clustering, not QAS.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Use the SYSTEM$ESTIMATE_QUERY_ACCELERATION function... You can also check the eligible_query_acceleration_time column in the QUERY_HISTORY view."

---

## Q79
**Answer: B**

**Explanation:** QUERY_ACCELERATION_MAX_SCALE_FACTOR controls the maximum amount of serverless compute that QAS can allocate, expressed as a multiple of the warehouse size. With a value of 4 on an XL warehouse, QAS can use up to 4x the XL compute capacity for offloaded work. This is not about cluster count (A), simultaneous queries (C), or improvement percentage (D).

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "QUERY_ACCELERATION_MAX_SCALE_FACTOR specifies the upper limit of compute resources the query acceleration service can use for the warehouse, expressed as a multiplier of the warehouse size."

---

## Q80
**Answer: C**

**Explanation:** When the Query Acceleration Service is enabled on a warehouse, the default value of QUERY_ACCELERATION_MAX_SCALE_FACTOR is 8, which means QAS can use up to 8x the warehouse compute capacity. A value of 0 disables QAS (A). The values 4 (B) and 1 (D) are not the default.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The default value for the scale factor is 8."

---

## Q81
**Answer: B**

**Explanation:** The dominant workload (15 of 20 queries) filters by date ranges, making a clustering key on the date column the highest-impact optimization. The 5 point-lookup queries on order_id are best served by the Search Optimization Service. This complementary approach addresses both access patterns optimally. Clustering on order_id only (A) ignores the majority of queries. SOS for all columns (C) is more expensive and less effective for range scans. 20 materialized views (D) is impractical.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "Clustering keys and search optimization complement each other: use clustering for range scans and search optimization for point lookups."

---

## Q82
**Answer: B**

**Explanation:** In a multi-cluster warehouse, Snowflake distributes incoming queries across all running clusters to balance the load. The system automatically routes queries to maintain even utilization across all active clusters. Queries are not concentrated on the newest cluster (A), users don't choose clusters (C), and there's no priority-based routing (D).

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Queries are distributed across the clusters in the warehouse to balance the workload."

---

## Q83
**Answer: C**

**Explanation:** During scale-in, clusters that are being decommissioned are allowed to complete all currently running queries before they are fully shut down. This ensures no queries are terminated mid-execution. Queries are not immediately terminated (A), not migrated (B), and scale-in is not blocked until all clusters are idle (D) — only the clusters being removed finish their current work.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "When scaling in, Snowflake ensures that all queries currently running on a cluster are allowed to complete before the cluster is shut down."

---

## Q84
**Answer: A, B**

**Explanation:** Periodically querying SYSTEM$CLUSTERING_INFORMATION (A) tracks how clustering depth changes over time, indicating whether auto-clustering is maintaining or improving data organization. AUTOMATIC_CLUSTERING_HISTORY (B) shows credits consumed and bytes reclustered, providing cost visibility. Warehouse queue length (C) is influenced by many factors beyond clustering. RESULT_SCAN (D) doesn't contain clustering statistics. Table storage size (E) is not a proxy for clustering quality.

**Source:** [SYSTEM$CLUSTERING_INFORMATION](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information)

**Quote:** "Use SYSTEM$CLUSTERING_INFORMATION periodically to monitor the clustering quality of your tables."

---

## Q85
**Answer: B**

**Explanation:** A CartesianJoin (cross join) operator producing billions of row combinations typically results from a missing or incorrect join condition. Without a proper ON clause, the optimizer has no choice but to perform a Cartesian product. Clustering (A) doesn't affect join type. Warehouse size (C) doesn't cause Cartesian joins. SOS (D) doesn't interfere with join strategy.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "A CartesianJoin in the query profile indicates a cross join. This is often unintentional and results from a missing join condition."

---

## Q86
**Answer: B**

**Explanation:** The Pruning percentage in the Query Profile's TableScan operator indicates the percentage of micro-partitions that were skipped (not scanned) based on the metadata stored for each partition. A high pruning percentage means fewer partitions were scanned, indicating effective clustering. It is not about column pruning (A), post-scan row filtering (C), or cache utilization (D).

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Partitions scanned and partitions total indicate how effectively Snowflake was able to prune micro-partitions."

---

## Q87
**Answer: B**

**Explanation:** The first query read data from remote storage (0% from cache) and populated the warehouse's local SSD data cache. The second query found 85% of the needed data already in the local cache, significantly reducing I/O time. If the result cache had been used (A), the second query would have returned instantly with 100% cache. Metadata cache (C) helps with pruning, not data access. SOS (D) is not automatically activated.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "As queries are run, the warehouse caches data from micro-partitions on local SSD storage. Subsequent queries that access the same data can read from the cache instead of remote storage."

---

## Q88
**Answer: A, C**

**Explanation:** Higher AUTO_SUSPEND values keep the warehouse running longer, preserving the data cache between query bursts (A). Routing similar workloads to the same warehouse increases the probability that cached data from one query will be useful for subsequent queries (C). Smallest warehouse size (B) reduces cache capacity. Disabling result cache (D) doesn't improve data cache usage. QAS (E) doesn't pre-populate cache.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Consider the trade-off between saving credits with a shorter auto-suspend period versus maintaining the data cache for improved query performance."

---

## Q89
**Answer: A**

**Explanation:** The ACCOUNT_USAGE.QUERY_HISTORY view includes the eligible_query_acceleration_time column, which retrospectively shows how much time QAS could have saved for each query over the past 365 days. This allows analysis without enabling QAS first. INFORMATION_SCHEMA (B) has limited retention and different columns. SYSTEM$ESTIMATE_QUERY_ACCELERATION (C) works at the warehouse level, not per query. Replaying queries (D) is impractical.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The eligible_query_acceleration_time column in the QUERY_HISTORY view indicates the amount of time that could have been saved by the query acceleration service."

---

## Q90
**Answer: A**

**Explanation:** The correct syntax to enable SOS on specific columns with specific search methods is ALTER TABLE t ADD SEARCH OPTIMIZATION ON EQUALITY(col1), SUBSTRING(col2). This allows fine-grained control over which columns and search methods are optimized. There is no CREATE SEARCH INDEX (B). SET SEARCH_OPTIMIZATION = TRUE (C) was the old syntax for full-table SOS without column specificity. Option D is not valid syntax.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "ALTER TABLE table_name ADD SEARCH OPTIMIZATION ON EQUALITY(column1), SUBSTRING(column2);"

---

## Q91
**Answer: B**

**Explanation:** Setting AUTO_SUSPEND = 3600 (1 hour) keeps the warehouse running between query bursts during business hours, preserving the data cache. With 300 analysts querying regularly, the cache stays warm and useful. Setting AUTO_SUSPEND = 0 (A) means the warehouse never suspends even overnight, wasting credits. Separate warehouses per department (C) fragments the cache. High MIN_CLUSTER_COUNT (D) incurs unnecessary multi-cluster costs.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "For workloads with regular query activity, a longer auto-suspend timeout helps maintain the local data cache, improving performance for subsequent queries."

---

## Q92
**Answer: A, B**

**Explanation:** SELECT COUNT(*) (A) can be answered entirely from the metadata cache because Snowflake stores row counts per micro-partition. SELECT MIN(column) (B) can also be answered from metadata since MIN/MAX values are stored per micro-partition. SELECT DISTINCT (C) requires scanning data to identify unique values. A point lookup (D) requires scanning partitions. ORDER BY with LIMIT (E) requires data access.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake maintains metadata about all rows stored in a micro-partition, including the range of values for each column and the number of rows. Some queries can be satisfied entirely from this metadata."

---

## Q93
**Answer: B**

**Explanation:** When a Snowflake Alert's condition evaluates to TRUE, the THEN action executes. In this case, it calls SYSTEM$SEND_EMAIL() to send an email notification. Alerts do not automatically cancel queries (A), suspend warehouses (C), or create resource monitors (D). They execute the specified SQL action.

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "When the condition of an alert evaluates to true, the alert executes the SQL statement specified in the action."

---

## Q94
**Answer: D**

**Explanation:** ACCOUNT_USAGE views retain data for 365 days (1 year), providing extensive historical data for analysis. This is in contrast to INFORMATION_SCHEMA, which retains data for 7-14 days depending on the view.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "The Account Usage views provide a 365-day (1-year) retention period."

---

## Q95
**Answer: B**

**Explanation:** INFORMATION_SCHEMA.WAREHOUSE_LOAD_HISTORY provides near real-time data with no latency, making it suitable for a dashboard that refreshes every 30 seconds. It covers the last 14 days. ACCOUNT_USAGE views (A, C) have up to 45 minutes of latency, making them unsuitable for real-time monitoring. ORGANIZATION_USAGE (D) is for cross-account metrics at the organization level.

**Source:** [WAREHOUSE_LOAD_HISTORY](https://docs.snowflake.com/en/sql-reference/functions/warehouse_load_history)

**Quote:** "The WAREHOUSE_LOAD_HISTORY table function in INFORMATION_SCHEMA provides near real-time data about the workload on a warehouse."

---

## Q96
**Answer: A, C**

**Explanation:** Event tables capture log messages and trace events from UDFs, UDTFs, and stored procedures written in any supported language including Python, Java, JavaScript, and SQL (A). The LOG_LEVEL parameter controls the minimum severity of messages captured (C). Event tables support all handler languages, not just SQL (B is wrong). They don't require a dedicated warehouse (D). An account can have one active event table, not one per database (E is not accurate).

**Source:** [Event Table](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up)

**Quote:** "An event table captures log entries and trace events from functions and procedures... You control the level of detail with the LOG_LEVEL and TRACE_LEVEL parameters."

---

## Q97
**Answer: B**

**Explanation:** For data 3 months ago, ACCOUNT_USAGE views are required because INFORMATION_SCHEMA only retains 7-14 days. ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY provides warehouse load metrics, and ACCOUNT_USAGE.QUERY_HISTORY provides individual query details, both with 365-day retention. INFORMATION_SCHEMA views (A) don't have data that old. Mixing ACCOUNT_USAGE with INFORMATION_SCHEMA (C) would miss the historical period in the INFORMATION_SCHEMA view. ORGANIZATION_USAGE (D) doesn't provide warehouse load details.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "Account Usage views provide up to 365 days of historical data, while Information Schema views are limited to the last 7 to 14 days."

---

## Q98
**Answer: C**

**Explanation:** INFORMATION_SCHEMA table functions like QUERY_HISTORY() retain data for up to 14 days. This is shorter than the 365-day retention of ACCOUNT_USAGE views but provides near real-time access with no latency.

**Source:** [QUERY_HISTORY](https://docs.snowflake.com/en/sql-reference/functions/query_history)

**Quote:** "The QUERY_HISTORY family of table functions returns query activity within the last 14 days."

---

## Q99
**Answer: B**

**Explanation:** At 96%, the 95% "Suspend After" trigger has been crossed. This trigger allows all currently running queries (including the ETL job) to complete, then suspends the warehouse and prevents new queries from starting. The 80% Notify trigger already sent a notification. The ETL job is not immediately terminated (A) — that would require the "Suspend Immediately" action at 100%. The resource monitor doesn't extend quotas (D).

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "Suspend (at a specified threshold): All statements being executed by the warehouse are allowed to complete. After all statements have completed, the warehouse is suspended."

---

## Q100
**Answer: B**

**Explanation:** The combination of WAREHOUSE_METERING_HISTORY (warehouse compute costs), WAREHOUSE_LOAD_HISTORY (utilization and queuing), QUERY_HISTORY (individual query performance), AUTOMATIC_CLUSTERING_HISTORY (clustering costs), and SEARCH_OPTIMIZATION_HISTORY (SOS costs) from ACCOUNT_USAGE provides comprehensive visibility into both performance and cost across all the account's features. WAREHOUSE_METERING_HISTORY alone (A) only covers warehouse costs. INFORMATION_SCHEMA (C) has limited retention. Resource monitors (D) only provide threshold-based alerts.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "The ACCOUNT_USAGE schema contains views that provide a comprehensive set of data about the usage of your Snowflake account."
