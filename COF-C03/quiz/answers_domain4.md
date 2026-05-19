# Domain 4: Answers

---

## Q1
**Answer: B**

**Explanation:** The Query Profile is a visual tool in Snowsight that shows the execution plan, operators, data flow, and performance statistics for a specific query. It is not a summary of all queries, a ranked list, or a configuration file.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "The query profile provides a graphical representation of the main components of the processing plan for a query."

---

## Q2
**Answer: B**

**Explanation:** The Query Profile in Snowsight shows the execution plan with operator-level statistics, helping identify exactly which step is the bottleneck. QUERY_HISTORY provides historical metadata, Resource Monitors track credits, and EXPLAIN only shows the plan without runtime stats.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "The query profile provides a graphical representation of the main components of the processing plan for a query, with statistics for each component."

---

## Q3
**Answer: B**

**Explanation:** Bytes spilled to local storage means the query required more memory than available on the warehouse nodes, causing intermediate results to overflow to the nodes' local SSD storage. This indicates the warehouse may be too small for the query.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Bytes spilled to local storage indicates that the operation required more memory than was available, causing data to be spilled to the local disk on the warehouse nodes."

---

## Q4
**Answer: A, C**

**Explanation:** A high percentage of partitions scanned (A) indicates inefficient pruning, and bytes spilled to remote storage (C) indicates severe memory pressure. Fast completion (B), successful pruning (D), and small results (E) are positive indicators.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Check for inefficient pruning and data spilling as indicators of performance issues."

---

## Q5
**Answer: B**

**Explanation:** Spilling to remote storage means both memory and local SSD were exhausted, forcing data to be written to slower remote cloud storage. This severely impacts performance and indicates the warehouse needs to be scaled up significantly.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Bytes spilled to remote storage indicates that the operation could not fit in memory or local disk, requiring spillover to remote storage."

---

## Q6
**Answer: B**

**Explanation:** When a join produces far more rows than the input tables (e.g., 10 billion from 100K × 100K), it indicates an exploding join or Cartesian product caused by missing or incorrect join conditions. The fix is reviewing and correcting the join predicates.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "An exploding join produces more output rows than input rows, typically caused by missing or incorrect join conditions."

---

## Q7
**Answer: B**

**Explanation:** Query queuing means the query is waiting for warehouse compute resources because other queries are consuming all available resources. This is a concurrency issue that can be addressed by multi-cluster warehousing or workload isolation.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Queuing occurs when a warehouse does not have sufficient resources to execute the query immediately."

---

## Q8
**Answer: B**

**Explanation:** EXPLAIN displays the logical execution plan for a query without executing it. It shows the planned operators and estimated costs. It does not execute queries, explain errors, or automatically optimize.

**Source:** [EXPLAIN](https://docs.snowflake.com/en/sql-reference/sql/explain)

**Quote:** "Produces the execution plan for a statement without executing the statement."

---

## Q9
**Answer: A, C**

**Explanation:** QUERY_HISTORY (A) provides detailed information about individual queries including execution time, bytes scanned, and errors. WAREHOUSE_METERING_HISTORY (C) shows warehouse credit usage patterns. STAGES, FILE_FORMATS, and SEQUENCES are object metadata views.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "QUERY_HISTORY provides query execution details. WAREHOUSE_METERING_HISTORY provides warehouse credit usage."

---

## Q10
**Answer: B**

**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY contains BYTES_SCANNED and other metrics that help identify queries with poor pruning efficiency (scanning more data than necessary). STAGES tracks file metadata, LOGIN_HISTORY tracks logins.

**Source:** [QUERY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)

**Quote:** "The QUERY_HISTORY view provides query-level details including bytes scanned, execution time, and partition statistics."

---

## Q11
**Answer: B**

**Explanation:** Query attribution tracks which warehouses, users, and roles executed queries and the resources consumed. This enables cost allocation and workload analysis. It is not about assigning results to users or linking to external apps.

**Source:** [QUERY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)

**Quote:** "QUERY_HISTORY includes the warehouse name, user name, and role name for each query, enabling attribution of compute usage."

---

## Q12
**Answer: B**

**Explanation:** Grouping similar workloads on the same warehouse ensures optimal sizing and resource allocation. ETL, BI, and ad-hoc queries have different characteristics and should be separated for better management.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Snowflake recommends creating separate warehouses for different types of workloads."

---

## Q13
**Answer: B**

**Explanation:** Three separate warehouses ensure each workload gets appropriate sizing: large for heavy ETL (scale up), multi-cluster medium for concurrent BI (scale out), and small-to-medium for variable ad-hoc. A single warehouse creates contention.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Snowflake recommends creating separate warehouses for different types of workloads."

---

## Q14
**Answer: B**

**Explanation:** QAS offloads portions of eligible queries to additional serverless compute resources, accelerating queries that have large scan components with selective filters. It is not a cache or compression feature.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service can accelerate parts of the query workload in a warehouse by offloading portions of the query processing to shared compute resources."

---

## Q15
**Answer: A, C**

**Explanation:** QAS benefits queries with large table scans and selective filters (A) and queries with significant processing that can be parallelized (C). Simple metadata queries (B), cached queries (D), and DDL statements (E) do not benefit from QAS.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service is most beneficial for queries that involve scanning large amounts of data with selective filters."

---

## Q16
**Answer: B**

**Explanation:** QAS is designed for this exact scenario — queries with large scans and selective filters. It offloads the scanning work to serverless resources without changing the warehouse size. Multi-cluster addresses concurrency, not individual query speed.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service can accelerate parts of the query workload in a warehouse by offloading portions of the query processing."

---

## Q17
**Answer: B**

**Explanation:** Query Acceleration Service requires Enterprise Edition or higher. It is not available in Standard Edition.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Query Acceleration Service requires Enterprise Edition (or higher)."

---

## Q18
**Answer: B**

**Explanation:** SOS improves performance of selective point lookup queries and substring/regex searches by creating and maintaining optimized search access paths. It is not a full-text search engine or warehouse optimizer.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service aims to significantly improve the performance of selective point lookup queries."

---

## Q19
**Answer: B**

**Explanation:** Search Optimization Service is specifically designed for point-lookup queries on high-cardinality columns. It creates optimized access paths that dramatically reduce scan times for equality predicates on large tables.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service aims to significantly improve the performance of selective point lookup queries."

---

## Q20
**Answer: A, C**

**Explanation:** SOS benefits equality predicates on high-cardinality columns (A) and substring/regex searches using LIKE, RLIKE (C). Full table scans (B), aggregate queries (D), and cross-joins (E) do not benefit from SOS.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "The search optimization service improves the performance of point lookup queries and queries that use LIKE or regex predicates."

---

## Q21
**Answer: B**

**Explanation:** A clustering key designates columns/expressions used to co-locate related data within the same micro-partitions, improving partition pruning for queries that filter on those columns. It is not a primary key, index, or foreign key.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A clustering key defines the column(s) or expression(s) used to co-locate data in a table, which improves scan efficiency."

---

## Q22
**Answer: B**

**Explanation:** Defining a clustering key on (REGION, ORDER_DATE) will cause Snowflake's automatic clustering service to reorganize the data so related data is co-located, improving pruning for queries filtering on these columns. Snowflake does not support traditional indexes.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A clustering key defines the column(s) or expression(s) used to co-locate data in a table."

---

## Q23
**Answer: B**

**Explanation:** Automatic clustering is a background service that continuously maintains the clustering of a table by reorganizing micro-partitions as data changes. Snowflake does not automatically choose the key, and it is not a one-time operation.

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Automatic Clustering is the Snowflake service that seamlessly and continually manages the organization (i.e. clustering) of data in a table."

---

## Q24
**Answer: A, C**

**Explanation:** Choose columns frequently used in WHERE clauses or joins (A) that have moderate to high cardinality for good pruning (C). Very low cardinality (B) provides poor pruning, never-queried columns (D) waste resources, and primary key alone may not be the best choice (E).

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Choose clustering key columns that are most actively used in selective filters, and that have a sufficient number of distinct values to enable effective pruning."

---

## Q25
**Answer: B**

**Explanation:** SYSTEM$CLUSTERING_INFORMATION returns metadata about a table's clustering state, including average depth and overlap of micro-partitions. This helps assess whether the data is well-clustered for the defined key.

**Source:** [SYSTEM$CLUSTERING_INFORMATION](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information)

**Quote:** "Returns clustering information, including average clustering depth, for a table."

---

## Q26
**Answer: B**

**Explanation:** SYSTEM$CLUSTERING_INFORMATION shows the current clustering depth and overlap, allowing you to monitor whether automatic reclustering is improving the data organization over time. Decreasing depth indicates better clustering.

**Source:** [SYSTEM$CLUSTERING_INFORMATION](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information)

**Quote:** "Returns clustering information, including average clustering depth, for a table."

---

## Q27
**Answer: B**

**Explanation:** A materialized view stores pre-computed results physically and Snowflake automatically keeps it synchronized when the base table data changes. It is not a regular cached view, not session-scoped, and any authorized role can create it.

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view is a pre-computed data set derived from a query specification and stored for later use."

---

## Q28
**Answer: A, C**

**Explanation:** Materialized views cannot include joins — they must reference a single table (A), and they consume additional storage for the pre-computed data (C). They do not require no storage (B), they are compatible with dynamic tables (D), and they are automatically refreshed (E is wrong).

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view can query only a single table... The materialized view definition is stored and maintained by Snowflake, consuming additional storage."

---

## Q29
**Answer: B**

**Explanation:** A materialized view pre-computes the aggregation, so queries read from the pre-computed results instead of re-processing the base table. Since the data updates only once daily, the view maintenance cost is minimal.

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "Materialized views are designed to improve query performance for workloads composed of common, repeated query patterns."

---

## Q30
**Answer: B**

**Explanation:** The query result cache is maintained in the Cloud Services layer and stores results of previously executed queries. If an identical query is submitted and the underlying data hasn't changed, the cached result is returned instantly.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "When a query is executed, the result is persisted (i.e. cached) for a period of time. If another query is submitted that exactly matches the cached query, Snowflake returns the cached result."

---

## Q31
**Answer: B**

**Explanation:** The query result cache persists for up to 24 hours but is invalidated if the underlying data changes. After 24 hours, even if data hasn't changed, the cache is purged.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The result cache is purged if the underlying data has changed or after 24 hours, whichever comes first."

---

## Q32
**Answer: C**

**Explanation:** The query result cache returns the stored result instantly for an identical query when the underlying data hasn't changed, without using the warehouse. Warehouse cache requires the warehouse to be running, and metadata cache is for aggregate statistics.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Snowflake returns the cached result without requiring a running warehouse."

---

## Q33
**Answer: A, C**

**Explanation:** The query text must be exactly the same (A) and the underlying data must not have changed (C). The warehouse size (B), the user (D), and whether the warehouse is running (E) do not affect result cache eligibility.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The cached result is used if: The new query exactly matches the cached query. The table data has not changed."

---

## Q34
**Answer: B**

**Explanation:** The warehouse cache stores data from the Storage layer on the SSD drives of warehouse compute nodes. When subsequent queries access the same data, it can be read from the faster local cache instead of remote storage.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Each warehouse caches data from the storage layer on its local SSD storage, improving performance for subsequent queries that access the same data."

---

## Q35
**Answer: B**

**Explanation:** When a warehouse is suspended, its compute nodes are deallocated, and all data cached on the local SSDs is lost. The cache is not preserved, transferred, or written to permanent storage.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "When a warehouse is suspended, it does not maintain its local cache."

---

## Q36
**Answer: B**

**Explanation:** The warehouse cache (local SSD cache) stores data read from remote storage. The first query populates the cache, and subsequent queries on the same data benefit from faster local reads. Query result cache returns identical results, not different queries on the same data.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Each warehouse caches data from the storage layer on its local SSD storage."

---

## Q37
**Answer: A, C**

**Explanation:** The metadata cache is maintained by the Cloud Services layer (A) and stores statistics like row counts and min/max values per partition (C). It does not store full query results (B), does not require a warehouse (D), and is available in all editions (E).

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer maintains metadata about all data stored in the system."

---

## Q38
**Answer: C**

**Explanation:** The metadata cache stores aggregate statistics like COUNT, MIN, and MAX values. Simple queries that can be answered from metadata alone (like COUNT(*)) are served directly by the Cloud Services layer without using a warehouse.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer maintains metadata about all data stored in the system, including table row counts and value ranges."

---

## Q39
**Answer: B**

**Explanation:** The order from fastest to slowest: query result cache (instant, no compute), metadata cache (instant for applicable queries), warehouse cache (fast local SSD reads), then remote storage (slowest, reading from cloud storage).

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Snowflake checks the result cache first, then uses the warehouse cache for data reads, and finally reads from remote storage."

---

## Q40
**Answer: A**

**Explanation:** The USE_CACHED_RESULT parameter controls whether the query result cache is used. If set to FALSE, Snowflake will not return cached results. The default is TRUE.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The USE_CACHED_RESULT parameter specifies whether to use cached query results. Default is TRUE."

---

## Q41
**Answer: B**

**Explanation:** Snowflake's VARIANT type can store any semi-structured data including JSON, Avro, ORC, Parquet, and XML. It is not limited to only JSON, XML, or Avro/Parquet.

**Source:** [Semi-Structured Data Types](https://docs.snowflake.com/en/sql-reference/data-types-semistructured)

**Quote:** "VARIANT can store values of any other type, including OBJECT and ARRAY. A VARIANT can store semi-structured data such as JSON, Avro, ORC, Parquet, or XML."

---

## Q42
**Answer: B**

**Explanation:** VARIANT fields are accessed using dot notation (column:field.subfield) or bracket notation (column['field']['subfield']). Standard JOINs and regular expressions are not used for field access.

**Source:** [Querying Semi-Structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "You can traverse the elements in a VARIANT column using dot notation or bracket notation."

---

## Q43
**Answer: B**

**Explanation:** RAW_DATA:customer_name::STRING uses colon notation to extract the field and ::STRING to cast it. EXTRACT is not used for JSON fields in Snowflake, JSON_VALUE is not the standard Snowflake syntax, and -> is not Snowflake notation.

**Source:** [Querying Semi-Structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "Use the : notation to extract a field from a VARIANT column, and :: to cast it to a specific type."

---

## Q44
**Answer: A, C**

**Explanation:** FLATTEN (A) and LATERAL FLATTEN (C) are used to expand arrays and objects into rows. LATERAL is used with FLATTEN to reference the current row. EXPLODE, UNNEST, and EXPAND are not Snowflake functions.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "FLATTEN is a table function that takes a VARIANT, OBJECT, or ARRAY column and produces a lateral view."

---

## Q45
**Answer: B**

**Explanation:** FLATTEN produces a lateral view by expanding an array or object into multiple rows. Each element of the array becomes a separate row. It does not compress data, permanently convert it, or remove nested structures.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "FLATTEN is a table function that takes a VARIANT, OBJECT, or ARRAY column and produces a lateral view."

---

## Q46
**Answer: B**

**Explanation:** LATERAL FLATTEN expands each array element into its own row, allowing analysis at the item level. GROUP BY would aggregate data, UNPIVOT is for structured pivoted data, and looping in a procedure is unnecessary.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "FLATTEN is a table function that takes a VARIANT, OBJECT, or ARRAY column and produces a lateral view."

---

## Q47
**Answer: B**

**Explanation:** PARSE_JSON parses a JSON-formatted string and returns a VARIANT value that can be traversed using dot/bracket notation. It does not convert to string, validate syntax only, or compress data.

**Source:** [PARSE_JSON](https://docs.snowflake.com/en/sql-reference/functions/parse_json)

**Quote:** "Interprets an input string as a JSON document, producing a VARIANT value."

---

## Q48
**Answer: B**

**Explanation:** The :: operator casts a VARIANT value to a specified data type (e.g., ::STRING, ::NUMBER, ::TIMESTAMP). It does not change the underlying data, create columns, or validate types.

**Source:** [Querying Semi-Structured Data](https://docs.snowflake.com/en/user-guide/querying-semistructured)

**Quote:** "Use the :: notation to cast VARIANT values to specific SQL types."

---

## Q49
**Answer: A, C**

**Explanation:** SUM (A) and COUNT (C) are standard aggregate functions used for data transformation. FLATTEN (B) is a table function, LATERAL (D) is a keyword, and PARSE_JSON (E) is a conversion function.

**Source:** [Aggregate Functions](https://docs.snowflake.com/en/sql-reference/functions-aggregation)

**Quote:** "Aggregate functions operate on a set of values and return a single value."

---

## Q50
**Answer: B**

**Explanation:** A window function calculates across a set of rows related to the current row (the "window") without collapsing rows into groups. Unlike GROUP BY, each row retains its identity in the result.

**Source:** [Window Functions](https://docs.snowflake.com/en/sql-reference/functions-analytic)

**Quote:** "Window functions operate on a group of related rows (a 'window') and calculate a return value for each row based on the group of rows."

---

## Q51
**Answer: B**

**Explanation:** SUM(sales) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) calculates a running total by summing all rows from the beginning to the current row, ordered by date, without collapsing individual rows.

**Source:** [Window Functions](https://docs.snowflake.com/en/sql-reference/functions-analytic)

**Quote:** "Window functions support frame specifications like ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for running calculations."

---

## Q52
**Answer: B**

**Explanation:** ROW_NUMBER() assigns a unique sequential integer to each row within a partition based on the specified ordering. It does not return total row count, physical position, or count non-nulls.

**Source:** [ROW_NUMBER](https://docs.snowflake.com/en/sql-reference/functions/row_number)

**Quote:** "Returns a unique row number for each row within a window partition."

---

## Q53
**Answer: A, C**

**Explanation:** RANK() (A) assigns ranks with gaps after ties, and LAG() (C) accesses a value from a previous row. FLATTEN() (B) is a table function, PARSE_JSON() (D) is a conversion function, and COPY_INTO() (E) is a data loading command.

**Source:** [Window Functions](https://docs.snowflake.com/en/sql-reference/functions-analytic)

**Quote:** "Window functions include RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD, FIRST_VALUE, LAST_VALUE, and more."

---

## Q54
**Answer: B**

**Explanation:** RANK() leaves gaps in rankings after ties (e.g., 1, 2, 2, 4), while DENSE_RANK() produces consecutive ranks without gaps (e.g., 1, 2, 2, 3). They both work on any orderable type.

**Source:** [RANK](https://docs.snowflake.com/en/sql-reference/functions/rank)

**Quote:** "RANK returns the rank of a value within a group of values, with gaps. DENSE_RANK returns the rank without gaps."

---

## Q55
**Answer: B**

**Explanation:** LAG() accesses a value from a previous row (relative to the current row) based on the specified ordering. LEAD() accesses the next row, RANK() assigns rankings, and NTILE() distributes rows into groups.

**Source:** [LAG](https://docs.snowflake.com/en/sql-reference/functions/lag)

**Quote:** "LAG accesses data from a previous row in the same result set without the use of a self-join."

---

## Q56
**Answer: B**

**Explanation:** The OVER clause defines the window (partition and ordering) over which the window function operates. It does not filter results, group rows into aggregates, or create subqueries.

**Source:** [Window Functions](https://docs.snowflake.com/en/sql-reference/functions-analytic)

**Quote:** "The OVER clause defines the window (set of rows) for the function to operate on."

---

## Q57
**Answer: B**

**Explanation:** PARTITION BY divides the result set into partitions (groups) within which the window function is independently applied. Each partition is processed separately. It does not create physical partitions or filter rows.

**Source:** [Window Functions](https://docs.snowflake.com/en/sql-reference/functions-analytic)

**Quote:** "PARTITION BY divides the result set into partitions, and the window function is applied to each partition independently."

---

## Q58
**Answer: A, C**

**Explanation:** PIVOT (A) transforms rows into columns, and UNPIVOT (C) transforms columns into rows. MERGE (B) performs upserts, FLATTEN (D) expands semi-structured data, and GROUP BY (E) aggregates data.

**Source:** [PIVOT / UNPIVOT](https://docs.snowflake.com/en/sql-reference/constructs/pivot)

**Quote:** "The PIVOT clause rotates rows into columns. The UNPIVOT clause rotates columns into rows."

---

## Q59
**Answer: B**

**Explanation:** PIVOT transforms rows into columns — it would create columns for each quarter with revenue values. UNPIVOT does the reverse, LATERAL FLATTEN is for semi-structured data, and GROUP BY with CASE is a workaround.

**Source:** [PIVOT](https://docs.snowflake.com/en/sql-reference/constructs/pivot)

**Quote:** "The PIVOT clause rotates a table by turning the unique values from one column in the input expression into multiple columns."

---

## Q60
**Answer: B**

**Explanation:** QUALIFY filters the result of window functions, similar to how HAVING filters GROUP BY results. It allows filtering rows based on window function values without a subquery.

**Source:** [QUALIFY](https://docs.snowflake.com/en/sql-reference/constructs/qualify)

**Quote:** "The QUALIFY clause filters the results of window functions."

---

## Q61
**Answer: B**

**Explanation:** QUALIFY ROW_NUMBER() OVER (...) = 1 filters directly on the window function result, keeping only the first row per customer. WHERE cannot reference window functions, HAVING is for GROUP BY, and GROUP BY with MAX loses other columns.

**Source:** [QUALIFY](https://docs.snowflake.com/en/sql-reference/constructs/qualify)

**Quote:** "QUALIFY filters the results of window functions. It is evaluated after window functions are computed."

---

## Q62
**Answer: B**

**Explanation:** SAMPLE (or TABLESAMPLE) returns a random sample of rows from a table. It can use row-level or block-level sampling and is useful for quick analysis on large tables.

**Source:** [SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "Returns a subset of rows sampled randomly from the specified table."

---

## Q63
**Answer: B**

**Explanation:** OBJECT_CONSTRUCT builds a JSON object (OBJECT type) from key-value pairs provided as arguments. It does not create database objects, construct tables, or build warehouses.

**Source:** [OBJECT_CONSTRUCT](https://docs.snowflake.com/en/sql-reference/functions/object_construct)

**Quote:** "Returns an OBJECT constructed from the arguments."

---

## Q64
**Answer: A, C**

**Explanation:** TO_VARIANT (A) converts a value to VARIANT type, and TO_JSON (C) converts a VARIANT to a JSON string. TO_TABLE, TO_WAREHOUSE, and TO_STAGE are not valid conversion functions.

**Source:** [TO_VARIANT](https://docs.snowflake.com/en/sql-reference/functions/to_variant)

**Quote:** "Converts any value to a VARIANT value."

---

## Q65
**Answer: B**

**Explanation:** ARRAY_AGG aggregates values across rows into a single array. It's the appropriate function for combining multiple rows into an array. GROUP_CONCAT is not a Snowflake function, and CONCAT concatenates strings.

**Source:** [ARRAY_AGG](https://docs.snowflake.com/en/sql-reference/functions/array_agg)

**Quote:** "Returns an ARRAY containing all values from the specified column across the group."

---

## Q66
**Answer: B**

**Explanation:** Unstructured data in Snowflake refers to files like PDFs, images, audio, and video that can be stored in stages. VARIANT columns store semi-structured data, not unstructured files.

**Source:** [Unstructured Data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "Snowflake supports accessing unstructured data (e.g., PDF, image, audio, video files) stored in cloud storage stages."

---

## Q67
**Answer: B**

**Explanation:** Unstructured data files are stored in internal or external stages. They can then be accessed via pre-signed URLs or processed with UDFs. They are not stored in VARIANT columns or regular table columns.

**Source:** [Unstructured Data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "Unstructured data is stored in stages (internal or external)."

---

## Q68
**Answer: B**

**Explanation:** Images stored in S3 should be accessed through an external stage pointing to the S3 bucket. The Python UDF can then read the files from the stage for processing.

**Source:** [Unstructured Data](https://docs.snowflake.com/en/user-guide/unstructured-intro)

**Quote:** "You can access unstructured data files through stages."

---

## Q69
**Answer: B**

**Explanation:** LISTAGG concatenates values from multiple rows into a single string with an optional delimiter. It does not list tables, aggregate into arrays, or list available functions.

**Source:** [LISTAGG](https://docs.snowflake.com/en/sql-reference/functions/listagg)

**Quote:** "Returns the concatenated input values, separated by the delimiter string."

---

## Q70
**Answer: A, C**

**Explanation:** ARRAY_AGG (A) aggregates column values into an array, and ARRAY_CONSTRUCT (C) creates an array from explicit values. ARRAY_CREATE, ARRAY_MERGE, and ARRAY_BUILD are not valid Snowflake functions.

**Source:** [ARRAY_AGG](https://docs.snowflake.com/en/sql-reference/functions/array_agg)

**Quote:** "ARRAY_AGG returns an ARRAY. ARRAY_CONSTRUCT returns an array constructed from the input values."

---

## Q71
**Answer: B**

**Explanation:** TRY_CAST attempts a type conversion and returns NULL if it fails, instead of raising an error. This is useful for data cleaning when values may not be valid for the target type.

**Source:** [TRY_CAST](https://docs.snowflake.com/en/sql-reference/functions/try_cast)

**Quote:** "A special version of CAST that returns a NULL value instead of raising an error when the cast fails."

---

## Q72
**Answer: B**

**Explanation:** TRY_CAST returns NULL for invalid conversions instead of errors. CAST would fail on non-numeric strings, TO_NUMBER may also fail, and CONVERT is not standard Snowflake syntax.

**Source:** [TRY_CAST](https://docs.snowflake.com/en/sql-reference/functions/try_cast)

**Quote:** "A special version of CAST that returns a NULL value instead of raising an error when the cast fails."

---

## Q73
**Answer: B**

**Explanation:** COALESCE returns the first non-NULL value from a list of expressions. It is commonly used to provide default values for NULL fields. It does not combine tables or count NULLs.

**Source:** [COALESCE](https://docs.snowflake.com/en/sql-reference/functions/coalesce)

**Quote:** "Returns the first non-NULL expression among its arguments."

---

## Q74
**Answer: B**

**Explanation:** IFF is a shorthand conditional: IFF(condition, true_value, false_value). It evaluates the condition and returns true_value if TRUE, false_value if FALSE. It's equivalent to a simple CASE WHEN.

**Source:** [IFF](https://docs.snowflake.com/en/sql-reference/functions/iff)

**Quote:** "Single-level if-then-else expression. Similar to CASE, but only supports a single condition."

---

## Q75
**Answer: A, C**

**Explanation:** NVL (A) and IFNULL (C) both return an alternate value when the input is NULL. NULL_CHECK, IS_EMPTY, and REMOVE_NULL are not standard Snowflake functions for NULL handling.

**Source:** [NVL](https://docs.snowflake.com/en/sql-reference/functions/nvl)

**Quote:** "If expr1 is NULL, returns expr2, otherwise returns expr1."

---

## Q76
**Answer: B**

**Explanation:** MERGE performs upsert operations — inserting new rows and updating (or deleting) existing rows based on a matching condition. It does not merge stages, databases, or caches.

**Source:** [MERGE](https://docs.snowflake.com/en/sql-reference/sql/merge)

**Quote:** "Inserts, updates, and deletes values in a table based on values in a second table or a subquery."

---

## Q77
**Answer: B**

**Explanation:** MERGE INTO with WHEN MATCHED THEN UPDATE and WHEN NOT MATCHED THEN INSERT handles both updates and inserts in a single statement. Separate INSERT/UPDATE is less efficient, and UPSERT/REPLACE are not Snowflake commands.

**Source:** [MERGE](https://docs.snowflake.com/en/sql-reference/sql/merge)

**Quote:** "MERGE can combine INSERT, UPDATE, and DELETE operations on a target table based on results of a join with a source."

---

## Q78
**Answer: B**

**Explanation:** LATERAL allows each row in the outer query to reference the VARIANT column from that same row, expanding each array element into a separate row. It enables row-by-row processing of nested data.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "When FLATTEN is used with LATERAL, the function can reference columns from the outer query for each row."

---

## Q79
**Answer: B**

**Explanation:** GET_PATH extracts a value from a VARIANT using a path expression string. This is useful when the path is dynamic or contains special characters. It is not for file paths, storage paths, or execution paths.

**Source:** [GET_PATH](https://docs.snowflake.com/en/sql-reference/functions/get_path)

**Quote:** "Extracts a value from a semi-structured data object using a path expression."

---

## Q80
**Answer: B, C**

**Explanation:** Filtering early with WHERE clauses (B) reduces the amount of data processed, and clustering keys on large tables (C) improve pruning. SELECT * (A) wastes resources, disabling caching (D) hurts performance, and undersized warehouses (E) cause spilling.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Best practices include using filters to limit data scanned and using clustering keys on large tables."

---

## Q81
**Answer: B**

**Explanation:** Scanning 95% of partitions on a date-filtered query indicates poor clustering on the date column. Defining a clustering key on DATE will reorganize data so date-filtered queries can prune most partitions.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A clustering key improves scan efficiency by organizing data so that queries can skip irrelevant micro-partitions."

---

## Q82
**Answer: B**

**Explanation:** SELECT * scans all columns including those not needed by the query. On wide tables, this significantly increases I/O and processing time. Selecting only needed columns reduces data scanned.

**Source:** [Best Practices for Queries](https://docs.snowflake.com/en/user-guide/querying-best-practices)

**Quote:** "Avoid SELECT * when you don't need all columns. Specify only the columns needed to minimize data scanned."

---

## Q83
**Answer: B**

**Explanation:** LIMIT restricts the number of rows returned but does not necessarily reduce the amount of processing — the query may still scan and process all data. It primarily reduces data transfer to the client.

**Source:** [SELECT](https://docs.snowflake.com/en/sql-reference/sql/select)

**Quote:** "LIMIT constrains the number of rows returned by the statement."

---

## Q84
**Answer: A, C**

**Explanation:** Right-sizing warehouses (A) avoids paying for unused compute, and leveraging caching (C) avoids redundant computation. Using the largest warehouse (B) wastes credits, disabling auto-suspend (D) wastes credits, and ACCOUNTADMIN (E) is not related to cost.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Right-size warehouses and leverage caching to reduce costs."

---

## Q85
**Answer: B**

**Explanation:** CLUSTER BY defines a clustering key that improves pruning by organizing data within micro-partitions. It is not a primary key, index, or cross-database partition.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "CLUSTER BY specifies one or more columns (or expressions) as the clustering key for the table."

---

## Q86
**Answer: B**

**Explanation:** Query queuing due to increasing concurrency throughout the day is best addressed by multi-cluster warehousing, which automatically adds clusters as demand increases. Scaling up addresses individual query performance, not concurrency.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are designed specifically for handling queuing and performance issues related to large numbers of concurrent users."

---

## Q87
**Answer: B**

**Explanation:** QAS offloads specific portions of a query to additional serverless resources while the warehouse handles the rest. Scaling up increases ALL compute resources in the warehouse. QAS is more targeted and cost-efficient for eligible queries.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "The query acceleration service offloads portions of the query processing to shared compute resources provided by the service."

---

## Q88
**Answer: A**

**Explanation:** SYSTEM$ESTIMATE_QAS_BENEFIT estimates the benefit of enabling QAS on a warehouse based on recent query history. SYSTEM$CLUSTERING_INFORMATION is for clustering, and SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST is for SOS.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "Use SYSTEM$ESTIMATE_QUERY_ACCELERATION to estimate the benefit of enabling QAS for a warehouse."

---

## Q89
**Answer: A, C**

**Explanation:** QAS (A) uses serverless compute that is billed separately, and automatic clustering (C) consumes serverless credits for maintaining cluster organization. Query result cache (B) is free, warehouse auto-resume (D) starts the regular warehouse, and secondary roles (E) don't consume credits.

**Source:** [Query Acceleration Service](https://docs.snowflake.com/en/user-guide/query-acceleration-service)

**Quote:** "QAS consumes credits for the serverless compute resources used to accelerate queries."

---

## Q90
**Answer: A**

**Explanation:** SOS optimizes point lookups (WHERE id = X), while a clustering key on the date column optimizes range queries (WHERE date BETWEEN). Using both features together addresses different query patterns efficiently.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "Search optimization is best for point lookup queries. For range-based queries, clustering keys are more appropriate."

---

## Q91
**Answer: B**

**Explanation:** SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST estimates the storage and compute costs of enabling SOS on a specific table, helping you decide if the benefit justifies the cost.

**Source:** [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service)

**Quote:** "SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST provides an estimate of the costs for enabling search optimization on a table."

---

## Q92
**Answer: B**

**Explanation:** The optimizer uses micro-partition metadata (min/max values per column) to identify and skip partitions that cannot contain data matching the query's filter conditions. This is called partition pruning.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "Snowflake maintains metadata about all rows stored in a micro-partition, including the range of values for each column. This metadata is used for query pruning."

---

## Q93
**Answer: A, C**

**Explanation:** Query result cache (A) returns identical results instantly, and warehouse cache (C) provides faster reads of previously accessed data from local SSD. Clustering keys (B) help pruning, but don't cache. Network policies (D) and resource monitors (E) are not caching features.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "Snowflake provides multiple levels of caching to improve query performance."

---

## Q94
**Answer: A**

**Explanation:** By running the query the night before, the results are stored in the query result cache. Since the data doesn't change overnight, the morning execution will return the cached result instantly. This is the most efficient approach.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "If the data hasn't changed and the query text is identical, Snowflake returns the cached result."

---

## Q95
**Answer: B**

**Explanation:** When underlying data changes, the query result cache is invalidated. The next execution of the query must re-compute the results. The cache is not automatically updated with new results.

**Source:** [Using Persisted Query Results](https://docs.snowflake.com/en/user-guide/querying-persisted-results)

**Quote:** "The result cache is purged if the underlying data has changed."

---

## Q96
**Answer: B**

**Explanation:** ARRAY_SIZE returns the number of elements in an array. It does not set the size, resize an array column, or limit elements during loading.

**Source:** [ARRAY_SIZE](https://docs.snowflake.com/en/sql-reference/functions/array_size)

**Quote:** "Returns the size (number of elements) of the input array."

---

## Q97
**Answer: B**

**Explanation:** For deeply nested data, multiple chained LATERAL FLATTEN calls are needed — one for each level of nesting. A single FLATTEN only expands one level. PARSE_JSON converts strings to VARIANT but doesn't flatten.

**Source:** [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten)

**Quote:** "For nested arrays or objects, you can chain multiple FLATTEN calls."

---

## Q98
**Answer: B**

**Explanation:** TYPEOF returns the data type of a value stored in a VARIANT column (e.g., 'VARCHAR', 'INTEGER', 'BOOLEAN', 'ARRAY'). It helps understand what types are stored in the flexible VARIANT format.

**Source:** [TYPEOF](https://docs.snowflake.com/en/sql-reference/functions/typeof)

**Quote:** "Reports the type of a value stored in a VARIANT column."

---

## Q99
**Answer: A, C**

**Explanation:** Filtering before joining (A) reduces the rows involved in the join, and matching data types (C) avoids implicit casting overhead. SELECT * (B), CROSS JOIN (D), and disabling caching (E) hurt performance.

**Source:** [Best Practices for Queries](https://docs.snowflake.com/en/user-guide/querying-best-practices)

**Quote:** "Apply filters early to reduce the amount of data in joins. Ensure join columns have matching types."

---

## Q100
**Answer: B**

**Explanation:** Partition pruning is the optimizer's ability to skip micro-partitions that cannot contain data matching the query's filter predicates, based on stored min/max metadata. It is not manual removal or column pruning.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "Snowflake uses the metadata about data ranges in each micro-partition to prune partitions that don't match the query filter."

---

## Q101
**Answer: B**

**Explanation:** A well-clustered join key in the target table improves pruning during the MERGE join phase, reducing the data scanned. This is more targeted than separating into INSERT/UPDATE or using a larger file format.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Clustering keys improve scan efficiency by organizing data for better pruning, including during join operations."

---

## Q102
**Answer: B**

**Explanation:** OBJECT_KEYS returns an array containing the top-level keys of a JSON object stored in a VARIANT column. It does not encrypt objects, list primary keys, or return encryption keys.

**Source:** [OBJECT_KEYS](https://docs.snowflake.com/en/sql-reference/functions/object_keys)

**Quote:** "Returns an array containing the list of keys in the top-most level of the input object."

---

## Q103
**Answer: B**

**Explanation:** STRIP_NULL_VALUE replaces JSON null values with SQL NULL instead of storing them as the VARIANT string "null". This allows proper SQL NULL handling in queries.

**Source:** [CREATE FILE FORMAT](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "STRIP_NULL_VALUES: If TRUE, replaces null values in semi-structured data with SQL NULL."

---

## Q104
**Answer: A, C**

**Explanation:** Bytes spilled to local storage (A) indicates memory pressure, and bytes spilled to remote storage (C) indicates severe memory/SSD exhaustion. Both suggest the warehouse needs more resources (scale up). Cached results (B), successful pruning (D), and zero rows (E) are not problems.

**Source:** [Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

**Quote:** "Spilling to local or remote storage indicates that the warehouse may need to be scaled up."

---

## Q105
**Answer: B**

**Explanation:** A multi-column clustering key on (REGION, ORDER_DATE) enables effective pruning for queries filtering on either or both columns. A single-column key on REGION does not help with ORDER_DATE filters.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "You can define multi-column clustering keys when queries frequently filter on multiple columns."
