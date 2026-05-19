## Q1

**Answer: C**

**Explanation:** Snowflake combines elements of both shared-disk (centralized storage accessible by all nodes) and shared-nothing (independent MPP compute clusters) architectures. It is not purely one or the other, nor is it a peer-to-peer system.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake's architecture is a hybrid of traditional shared-disk and shared-nothing database architectures. Similar to shared-disk architectures, Snowflake uses a central data repository for persisted data that is accessible from all compute nodes in the platform. But similar to shared-nothing architectures, Snowflake processes queries using massively parallel processing (MPP) compute clusters."
---
## Q2

**Answer: D**

**Explanation:** VPS provides a dedicated metadata store and pool of compute resources, fully isolated from other Snowflake accounts. Enterprise and Business Critical do not offer this level of hardware isolation. There is no "Standard with enhanced security" edition.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Virtual Private Snowflake offers our highest level of security for organizations that have the strictest requirements... It includes all the features and services of Business Critical Edition, but in a completely separate Snowflake environment, isolated from all other Snowflake accounts (i.e. VPS accounts do not share any type of hardware resources with accounts outside the VPS)."
---
## Q3

**Answer: B, D**

**Explanation:** The Cloud Services layer handles authentication/access control and query parsing/optimization, among other coordination tasks. Storing data in micro-partitions and compressing data are functions of the Storage layer, while processing SQL using warehouses belongs to the Compute layer.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer is a collection of services that coordinate activities across Snowflake... Services managed in this layer include: Security, authentication, and access control... Query parsing and optimization."
---
## Q4

**Answer: B**

**Explanation:** The key benefit of separating storage and compute is that each layer can scale independently. You can scale compute without affecting storage and vice versa. Users don't manage these resources separately — Snowflake handles the infrastructure. Co-location is not guaranteed or required.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake separates storage and compute, which simplifies some traditional challenges of data engineering, such as infrastructure management and performance tuning."
---
## Q5

**Answer: B**

**Explanation:** Multi-cluster virtual warehouses are an Enterprise Edition (and higher) feature designed for handling concurrency. They are not available in Standard Edition. While Business Critical and VPS also support them, Enterprise is the minimum required edition.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Multi-cluster virtual warehouses for scaling compute resources to meet concurrency needs." [Listed under Enterprise Edition features]"
---
## Q6

**Answer: B, D**

**Explanation:** Tri-Secret Secure and private connectivity (AWS PrivateLink, Azure Private Link, Google Cloud Private Service Connect) are Business Critical features. Multi-cluster warehouses, extended Time Travel (up to 90 days), and column-level security (masking policies) are all available starting with Enterprise Edition.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Customer-managed encryption keys through Tri-Secret Secure" and "Support for private connectivity to the Snowflake service" are listed under Business Critical Edition features."
---
## Q7

**Answer: C**

**Explanation:** Metadata management, which includes the SNOWFLAKE shared database and Information Schema, is a responsibility of the Cloud Services layer. The Storage layer handles data persistence, and the Compute layer processes queries via virtual warehouses.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Services managed in this layer include... Metadata management, including the SNOWFLAKE database and the Snowflake Information Schema."
---
## Q8

**Answer: B**

**Explanation:** Snowflake's virtual warehouses are fully independent compute clusters. They do not share resources, so one warehouse's workload cannot impact another's performance. Multiple warehouses can be active simultaneously.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Each virtual warehouse is an independent compute cluster that doesn't share compute resources with other virtual warehouses. As a result, each virtual warehouse has no effect on the performance of other virtual warehouses."
---
## Q9

**Answer: B, D**

**Explanation:** Snowflake automatically divides all table data into micro-partitions and stores it in a proprietary compressed columnar format. Data is not kept in its original file format, not stored on user-managed local disk partitions, and users do not select compression algorithms — Snowflake determines the most efficient compression automatically.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "When data is loaded into a Snowflake table, Snowflake reorganizes that data into its internally optimized, compressed, columnar format. Snowflake stores this optimized data in cloud storage." and "All data in Snowflake tables is automatically divided into micro-partitions."
---
## Q10

**Answer: B, D**

**Explanation:** As a self-managed service, Snowflake handles all maintenance, upgrades, and infrastructure. Users don't select/configure hardware, manage OS patches, or install software. Snowflake cannot be installed on private cloud infrastructure — it runs exclusively on public cloud platforms.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Ongoing maintenance, management, upgrades, and tuning are handled by Snowflake." and "There is virtually no software for you to install, configure, or manage."
---
## Q11

**Answer: C**

**Explanation:** HIPAA and HITRUST CSF compliance for PHI data requires at minimum Business Critical Edition. Standard and Enterprise editions do not support PHI data. VPS also supports it but Business Critical is the minimum requirement.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition... offers even higher levels of data protection to support the needs of organizations with extremely sensitive data, particularly PHI data that must comply with HIPAA and HITRUST CSF regulations."
---
## Q12

**Answer: D**

**Explanation:** Enterprise Edition and higher support Time Travel retention of up to 90 days for permanent tables. Standard Edition is limited to 0 or 1 day. The 7-day figure refers to Fail-safe, not Time Travel.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Extended Time Travel (up to 90 days)" is listed as an Enterprise Edition feature. The comparison table shows: "Permanent (Enterprise Edition and higher): 0 to 90 (default is configurable)."
---
## Q13

**Answer: B**

**Explanation:** Snowpark supports exactly three languages: Java, Python, and Scala. R, JavaScript, Go, and C# are not supported by Snowpark (though some of these are supported for other Snowflake features like UDFs or drivers).

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Snowflake currently provides Snowpark libraries for three languages: Java, Python, and Scala."
---
## Q14

**Answer: B**

**Explanation:** SnowCD is specifically a connectivity diagnostic tool. It tests network connections to Snowflake by checking hostnames and ports. It does not manage account configurations, load data, or convert SQL queries.

**Source:** [SnowCD (Connectivity Diagnostic Tool)](https://docs.snowflake.com/en/user-guide/snowcd)

**Quote:** "SnowCD (i.e. Snowflake Connectivity Diagnostic Tool) helps users to diagnose and troubleshoot their network connection to Snowflake."
---
## Q15

**Answer: B, D**

**Explanation:** Snowpark pushes all computation to Snowflake (no separate cluster needed) and uses lazy evaluation — operations are only executed when an action like `collect()` is called. Snowpark supports three languages (not just Python) and does support creating UDFs inline.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Support for pushdown for all operations... This means Snowpark pushes down all data transformation and heavy lifting to the Snowflake data cloud." and "Snowpark operations are executed lazily on the server, meaning that you can use the library to delay running data transformation until as late in the pipeline as possible."
---
## Q16

**Answer: B**

**Explanation:** SnowCD uses the output of SYSTEM$ALLOWLIST() (or SYSTEM$ALLOWLIST_PRIVATELINK() for private connectivity) to determine which hostnames and ports to check. The other function names listed do not exist.

**Source:** [SnowCD (Connectivity Diagnostic Tool)](https://docs.snowflake.com/en/user-guide/snowcd)

**Quote:** "SnowCD leverages the Snowflake hostname IP addresses and ports listed by either the SYSTEM$ALLOWLIST() or SYSTEM$ALLOWLIST_PRIVATELINK() functions to run a series of connection checks."
---
## Q17

**Answer: B**

**Explanation:** The SQL API is a REST API (not a driver, library, or CLI tool) that enables submitting, monitoring, and canceling SQL statements programmatically. It is designed for building custom applications and integrations.

**Source:** [Snowflake SQL API](https://docs.snowflake.com/en/developer-guide/sql-api/index)

**Quote:** "The Snowflake SQL API is a REST API that you can use to access and update data in a Snowflake database... provides operations that you can use to: Submit SQL statements for execution. Check the status of the execution of a statement. Cancel the execution of a statement."
---
## Q18

**Answer: B**

**Explanation:** The key advantage is that data stays within Snowflake — there is no need to move it to an external system. Streamlit uses Python 3 (not 2.x), respects RBAC, and does require compute resources (warehouses or containers).

**Source:** [About Streamlit in Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)

**Quote:** "Using Streamlit in Snowflake, you can build applications that process and use data in Snowflake without moving data or application code to an external system."
---
## Q19

**Answer: A, C**

**Explanation:** Cortex Analyst enables natural language querying, and Cortex Fine-tuning allows customizing LLM models. There are no Snowflake products called "Cortex Compute," "Cortex Storage," or "Cortex Backup" — these are fabricated names.

**Source:** [Snowflake AI and ML](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Snowflake Cortex is a suite of AI features that use large language models (LLMs)... comprises: Cortex Agents, Snowflake Cortex AI Functions, Cortex Analyst, Cortex Fine-tuning, Cortex Search, Snowflake Intelligence."
---
## Q20

**Answer: B**

**Explanation:** SnowSQL is a command-line client that supports both interactive and batch modes. It supports all DDL and DML (not just SELECT). While it was developed using the Python Connector, the connector is not a prerequisite for installation. It is not open-source.

**Source:** [SnowSQL (CLI client)](https://docs.snowflake.com/en/user-guide/snowsql)

**Quote:** "SnowSQL is a legacy command-line client for connecting to Snowflake to execute SQL queries and perform all DDL and DML operations... SnowSQL (snowsql executable) can be run as an interactive shell or in batch mode through stdin or using the -f option."
---
## Q21

**Answer: D**

**Explanation:** Snowflake provides drivers for Go, JDBC, .NET, Node.js, ODBC, PHP PDO, and Python. There is no Ruby driver provided by Snowflake.

**Source:** [Drivers](https://docs.snowflake.com/en/developer-guide/drivers)

**Quote:** "Snowflake provides drivers for: "Go Snowflake Driver, JDBC Driver, .NET Driver, Node.js Driver, ODBC Driver, PHP PDO Driver for Snowflake, Snowflake Connector for Python."
---
## Q22

**Answer: B, D**

**Explanation:** Snowsight is Snowflake's web interface for running Streamlit apps and monitoring query performance/history. Snowflake cannot be installed on private infrastructure, users cannot configure underlying hardware, and micro-partition storage files cannot be directly modified.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "Create and run Streamlit apps" and "Monitor query performance and history" are listed as Snowsight capabilities."
---
## Q23

**Answer: C**

**Explanation:** Snowflake's Cortex AI models run within the Snowflake security perimeter, and customer data is never used to train models for other customers. Data is not shared with model developers, and models are not run outside Snowflake's perimeter.

**Source:** [Snowflake AI and ML](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Full security. Except as you elect, all AI models run inside of Snowflake's security and governance perimeter. Your data is not available to other customers or model developers. Data privacy. Snowflake never uses your Customer Data to train models made available to our customer base."
---
## Q24

**Answer: B**

**Explanation:** Snowpark uses the DataFrame as its core abstraction, similar to pandas or Spark DataFrames. ResultSet, DataTable, and RecordSet are not the primary abstraction used in Snowpark.

**Source:** [Snowpark API](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "The core abstraction in Snowpark is the DataFrame, which represents a set of data and provides methods to operate on that data."
---
## Q25

**Answer: C**

**Explanation:** Temporary tables are session-scoped, invisible to other users, and automatically purged when the session ends. Permanent and transient tables persist beyond sessions, and external tables reference external data rather than storing session-specific data.

**Source:** [Working with Temporary and Transient Tables](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Snowflake supports creating temporary tables for storing non-permanent, transitory data (e.g. ETL data, session-specific data). Temporary tables only exist within the session in which they were created and persist only for the remainder of the session. As such, they are not visible to other users or sessions."
---
## Q26

**Answer: B, E**

**Explanation:** Transient tables persist until explicitly dropped (not session-scoped like temporary tables) and cannot be converted to other types after creation. They have NO Fail-safe period (not 7 days), and their Time Travel retention is 0 or 1 day. They are visible to all users with appropriate privileges (not session-only).

**Source:** [Working with Temporary and Transient Tables](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Snowflake supports creating transient tables that persist until explicitly dropped and are available to all users with the appropriate privileges." and "After creation, transient tables cannot be converted to any other table type."
---
## Q27

**Answer: B**

**Explanation:** Streams in Snowflake are specifically designed for change data capture (CDC), recording DML changes (inserts, updates, deletes) to source objects. They do not control data flow between warehouses, stream video, or manage external connections.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream object records data manipulation language (DML) changes made to tables, including inserts, updates, and deletes, as well as metadata about each change, so that actions can be taken using the changed data. This process is referred to as change data capture (CDC)."
---
## Q28

**Answer: C**

**Explanation:** External tables are read-only — no INSERT, UPDATE, or DELETE is supported. Their data files reside in external stages (not Snowflake's managed storage). They support multiple formats (not just JSON), including all formats supported by COPY INTO except XML.

**Source:** [Introduction to External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)

**Quote:** "An external table is a Snowflake feature that you can use to query data stored in an external stage as if the data were inside a table in Snowflake... External tables are read-only. You can't perform data manipulation language (DML) operations on external tables."
---
## Q29

**Answer: A, C, E**

**Explanation:** Snowflake has exactly three types of internal stages: User stages (@~), Table stages (@%tablename), and Named stages (CREATE STAGE). There are no "Database," "Schema," or "Account" stage types.

**Source:** [Choosing an Internal Stage for Local Files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "Snowflake supports the following types of internal stages: User, Table, Named."
---
## Q30

**Answer: B**

**Explanation:** Streams add three metadata columns: METADATA$ACTION (INSERT or DELETE), METADATA$ISUPDATE (whether part of an UPDATE), and METADATA$ROW_ID (unique row identifier). The other column sets listed are not stream metadata columns.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "METADATA$ACTION: Indicates the DML operation (INSERT, DELETE) recorded. METADATA$ISUPDATE: Indicates whether the operation was part of an UPDATE statement. METADATA$ROW_ID: Specifies a unique, immutable row ID for tracking changes over time."
---
## Q31

**Answer: B**

**Explanation:** Simply querying a stream does NOT advance its offset. The offset only advances when the stream is consumed in a DML transaction (such as INSERT INTO ... SELECT FROM stream). The stream is not dropped when consumed, and source table modifications do not automatically advance the offset.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream advances the offset only when it is used in a DML transaction... Querying a stream alone does not advance its offset, even within an explicit transaction; the stream contents must be consumed in a DML statement."
---
## Q32

**Answer: B, C**

**Explanation:** Secure views hide their definition from non-owner roles and prevent internal optimizations from potentially exposing filtered-out data. Secure views can actually execute more slowly than non-secure views (not faster), and they are commonly used with data sharing.

**Source:** [Working with Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "Secure views do not utilize these optimizations, ensuring that users have no access to the underlying data." and "With secure views, the view definition and details are visible only to authorized users (i.e. users who are granted the role that owns the view)."
---
## Q33

**Answer: C**

**Explanation:** Materialized views store pre-computed query results and are automatically maintained by Snowflake's background service. They require Enterprise Edition (not available in Standard). They do incur additional storage and compute costs for maintenance.

**Source:** [Working with Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view is a pre-computed data set derived from a query specification and stored for later use... Snowflake's implementation of materialized views provides... A background service updates the materialized view after changes are made to the base table."
---
## Q34

**Answer: B**

**Explanation:** A pipe is a named Snowflake object containing a COPY statement that Snowpipe uses to load data from staged files. It is not a virtual warehouse, a temporary table, or a network connection.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "A pipe is a named, first-class Snowflake object that contains a COPY statement used by Snowpipe. The COPY statement identifies the source location of the data files (i.e., a stage) and a target table."
---
## Q35

**Answer: B**

**Explanation:** Named stages are database objects with grantable privileges, making them the most flexible stage type. User stages cannot be altered, dropped, or have file format options set, and privileges cannot be granted on them. User stages are automatically allocated, not manually created.

**Source:** [Choosing an Internal Stage for Local Files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "Named stages are database objects that provide the greatest degree of flexibility for data loading... the security/access rules that apply to all objects apply. The privileges to use a stage can be granted or revoked from roles." vs. "Unlike named stages, user stages cannot be altered or dropped. User stages do not support setting file format options."
---
## Q36

**Answer: B, D**

**Explanation:** Snowpipe detects new files via two mechanisms: (1) automated cloud messaging using event notifications from cloud storage, and (2) calling Snowpipe REST endpoints with file names. It does not use streams, scheduled SQL discovery, or direct table polling.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Automating Snowpipe using cloud messaging: Automated data loads leverage event notifications for cloud storage to inform Snowpipe of the arrival of new data files to load." and "Calling Snowpipe REST endpoints: Your client application calls a public REST endpoint with the name of a pipe object and a list of data filenames."
---
## Q37

**Answer: B**

**Explanation:** Micro-partitions range from 50 MB to 500 MB of uncompressed data. The actual stored size is smaller due to compression. The other ranges (1-10 MB, 500 MB-5 GB, 1-10 GB) are incorrect.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Each micro-partition contains between 50 MB and 500 MB of uncompressed data (note that the actual size in Snowflake is smaller because data is always stored compressed)."
---
## Q38

**Answer: B**

**Explanation:** Micro-partitioning is automatic — users do not define partition boundaries, and no REPARTITION command exists. Micro-partitions are created for all tables, not just those with clustering keys. They are derived from the natural ordering of data as it is inserted.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Micro-partitioning is automatically performed on all Snowflake tables. Tables are transparently partitioned using the ordering of the data as it is inserted/loaded."
---
## Q39

**Answer: B, D**

**Explanation:** Snowflake stores the range of values per column and the number of distinct values for each micro-partition, along with additional optimization properties. It does not store user query information, SQL statements that created the data, or network latency metrics.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake stores metadata about all rows stored in a micro-partition, including: The range of values for each of the columns in the micro-partition. The number of distinct values. Additional properties used for both optimization and efficient query processing."
---
## Q40

**Answer: C**

**Explanation:** Clustering depth measures how much micro-partitions overlap for specified columns. A smaller depth indicates better clustering. It does not measure the number of columns in a key, the total number of micro-partitions, or the maximum rows per partition.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "The clustering depth for a populated table measures the average depth (1 or greater) of the overlapping micro-partitions for specified columns in a table. The smaller the average depth, the better clustered the table is."
---
## Q41

**Answer: B**

**Explanation:** Automatic Clustering is a serverless, background service that does not require a user-specified warehouse and is non-blocking to DML operations. It does not recluster all tables immediately — Snowflake only reclusters when the table will benefit from the operation.

**Source:** [Automatic Clustering](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering)

**Quote:** "Automatic Clustering eliminates the need for... Designating warehouses in your account to use for reclustering. Snowflake performs automatic reclustering in the background." and "Automatic Clustering is transparent and does not block DML statements issued against tables while they are being reclustered."
---
## Q42

**Answer: B, C**

**Explanation:** Unlike traditional static partitioning, Snowflake's micro-partitions are automatic (no user maintenance) and uniformly small, enabling efficient DML and fine-grained pruning. Micro-partitions CAN overlap in ranges (this is a feature, not prevented). They use columnar storage, not row-based.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Micro-partitions are derived automatically; they don't need to be explicitly defined up-front or maintained by users." and "Micro-partitions are small in size (50 to 500 MB, before compression), which enables extremely efficient DML and fine-grained pruning for faster queries."
---
## Q43

**Answer: B**

**Explanation:** Dropping a column is a metadata-only operation — micro-partitions are NOT rewritten. The dropped column's data remains in the existing micro-partitions in storage. It is not moved to Fail-safe and the partitions are not deleted.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "When a column in a table is dropped, the micro-partitions that contain the data for the dropped column are not re-written when the drop statement is executed. The data in the dropped column remains in storage."
---
## Q44

**Answer: B**

**Explanation:** Snowflake recommends a maximum of 3-4 columns per clustering key. Adding more columns increases costs without proportional benefits. A single column is too restrictive, and 8-10 columns is too many.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "For most tables, Snowflake recommends a maximum of 3 or 4 columns (or expressions) per key. Adding more than 3-4 columns tends to increase costs more than benefits."
---
## Q45

**Answer: B**

**Explanation:** TABLE_STORAGE_METRICS (available in both Information Schema and Account Usage) provides the most detailed storage breakdown across Active, Time Travel, and Fail-safe states. WAREHOUSE_METERING_HISTORY tracks compute costs, QUERY_HISTORY tracks queries, and DATABASE_STORAGE_USAGE_HISTORY provides database-level storage but not the per-table CDP state breakdown.

**Source:** [Data Storage Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations)

**Quote:** "TABLE_STORAGE_METRICS provides the most detailed information because it includes a breakdown of the physical storage (in bytes) for table data in the following three states of the CDP life-cycle: Active (ACTIVE_BYTES column), Time Travel (TIME_TRAVEL_BYTES column), Fail-safe (FAILSAFE_BYTES column)."
---
## Q46

**Answer: B, C**

**Explanation:** A cloned table initially shares all micro-partitions with the original (no additional storage). Subsequent changes to the clone create new micro-partitions owned exclusively by the clone. Cloning does NOT double storage. Clones can have their own Time Travel settings, and multiple object types can be cloned (not just permanent tables).

**Source:** [Data Storage Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations)

**Quote:** "Snowflake's zero-copy cloning feature provides a convenient way to quickly take a 'snapshot' of any table... which initially shares the underlying storage." and "Each change to the clone results in new micro-partitions that are owned exclusively by the clone."
---
## Q47

**Answer: C**

**Explanation:** Snowflake recommends ordering clustering key columns from lowest to highest cardinality. Placing higher cardinality columns first reduces the effectiveness of clustering on subsequent columns. Alphabetical ordering or always using the primary key first are not recommended strategies.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "As a general rule, Snowflake recommends ordering the columns from lowest cardinality to highest cardinality. Putting a higher cardinality column before a lower cardinality column will generally reduce the effectiveness of clustering on the latter column."
---
## Q48

**Answer: B**

**Explanation:** Snowflake's columnar storage means only columns referenced by a query need to be scanned, and each column is independently compressed. This is more efficient than scanning entire rows. Columnar storage complements (not eliminates) query pruning, and columns are not stored in separate databases.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Columns are stored independently within micro-partitions, often referred to as columnar storage. This enables efficient scanning of individual columns; only the columns referenced by a query are scanned. Columns are also compressed individually within micro-partitions."
---
## Q49

**Answer: C**

**Explanation:** The X-Small size is the default when creating a warehouse using CREATE WAREHOUSE in SQL. While X-Large is listed as the default for warehouses created using Snowsight's UI wizard, the question asks about CREATE WAREHOUSE (SQL command), for which X-Small is the default.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "X-Small: Default size for warehouses created in Snowsight and using CREATE WAREHOUSE."
---
## Q50

**Answer: B**

**Explanation:** For large, complex analytical queries, increasing the warehouse size provides more compute resources and improves query performance. Adding databases or schemas does not affect compute power, and clustering keys are a storage optimization, not a real-time compute solution.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "The size of a warehouse can impact the amount of time required to execute queries submitted to the warehouse, particularly for larger, more complex queries. In general, query performance scales with warehouse size because larger warehouses have more compute resources available to process queries."
---
## Q51

**Answer: A, D**

**Explanation:** Both auto-suspend and auto-resume are enabled by default (A). Auto-suspend and auto-resume apply to the entire warehouse — they do not apply individually to clusters within a multi-cluster warehouse (D). Auto-resume does automatically start the warehouse when a query is submitted (C is also true), but D specifically distinguishes the cluster-level behavior which is a key exam concept. B is false (auto-suspend cannot be configured per cluster), and E is false (auto-resume is enabled by default, not requiring manual activation).

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "By default, auto-suspend is enabled. Snowflake automatically suspends the warehouse if it is inactive for the specified period of time." and "By default, auto-resume is enabled. Snowflake automatically resumes the warehouse when any statement that requires a warehouse is submitted and the warehouse is the current warehouse for the session." and "Auto-suspend and auto-resume apply only to the entire warehouse and not to the individual clusters in the warehouse."
---
## Q52

**Answer: B**

**Explanation:** Multi-cluster warehouses are specifically designed for concurrency — managing many simultaneous users and queries. They are NOT the primary tool for improving individual slow queries (resizing is better for that) or for reducing storage costs.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses enable you to scale compute resources to manage your user and query concurrency needs as they change, such as during peak and off hours."
---
## Q53

**Answer: C**

**Explanation:** In Maximized mode, the maximum and minimum cluster counts are set to the same value, causing all clusters to run simultaneously whenever the warehouse is active. Auto-scale mode (different max and min) dynamically starts/stops clusters. The Economy policy only applies to Auto-scale mode.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Maximized: This mode is enabled by specifying the same value for both maximum and minimum number of clusters (note that the specified value must be larger than 1). In this mode, when the warehouse is started, Snowflake starts all the clusters so that maximum resources are available while the warehouse is running."
---
## Q54

**Answer: B, D**

**Explanation:** Snowflake provides exactly two scaling policies for multi-cluster warehouses: Standard (default, favors responsiveness by starting clusters quickly) and Economy (favors credit conservation by keeping clusters fully loaded before adding more). There are no Aggressive, Balanced, or Conservative policies.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Snowflake supports the following scaling policies: Standard (default)... Economy..."
---
## Q55

**Answer: B**

**Explanation:** The Economy policy prioritizes credit conservation over query responsiveness. It only starts a new cluster if the system estimates there's enough work to keep it busy for at least 6 minutes. This is the opposite of Standard policy, which starts clusters more proactively to prevent queuing.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Economy: Conserves credits by favoring keeping running clusters fully-loaded rather than starting additional clusters, which may result in queries being queued and taking longer to complete."
---
## Q56

**Answer: D**

**Explanation:** A Medium warehouse consumes 4 credits per hour per cluster. With 3 clusters running in Maximized mode for 2 hours: 3 clusters × 4 credits/hour × 2 hours = 24 credits total. In Maximized mode, all clusters run continuously.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "In this example, a Medium-size Standard warehouse with 3 clusters runs in Maximized mode for 2 hours: [Cluster 1: 8, Cluster 2: 8, Cluster 3: 8, Total Credits: 24]"
---
## Q57

**Answer: A, C, F**

**Explanation:** Valid Snowflake warehouse sizes include X-Small (A), 3X-Large (C), and X-Large (F). "Nano" and "Mega" are not valid Snowflake warehouse sizes. 5X-Large is valid, but the question asks to choose THREE from the options provided, and A, C, F are the three valid ones listed.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Snowflake supports the following warehouse sizes: X-Small, Small, Medium, Large, X-Large, 2X-Large, 3X-Large, 4X-Large, 5X-Large, 6X-Large."
---
## Q58

**Answer: B**

**Explanation:** Scaling UP (resizing to a larger warehouse) improves individual query performance by providing more compute resources. Scaling OUT (adding more clusters via multi-cluster warehouses) improves concurrency by handling more simultaneous users/queries. They address different problems.

**Source:** [Multi-cluster warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are best utilized for scaling resources to improve concurrency for users/queries. They are not as beneficial for improving the performance of slow-running queries or data loading. For these types of operations, resizing the warehouse provides more benefits."
---
## Q59

**Answer: C**

**Explanation:** Snowflake bills warehouses per second with a 60-second minimum each time the warehouse starts (resumes). This means a warehouse running for 30 seconds is billed for 60 seconds, but a warehouse running for 90 seconds is billed for exactly 90 seconds. There is no per-query, per-hour, or monthly flat-rate billing for warehouses.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Snowflake utilizes per-second billing (with a 60-second minimum each time the warehouse starts) so warehouses are billed only for the credits they actually consume."
---
## Q60

**Answer: C**

**Explanation:** If no warehouse is associated with a session, queries simply cannot be submitted. Snowflake does not automatically assign the smallest available warehouse or use serverless compute for ad-hoc queries without an explicit warehouse association.

**Source:** [Overview of warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "When a session is initiated in Snowflake, the session does not, by default, have a warehouse associated with it. Until a session has a warehouse associated with it, queries cannot be submitted within the session."
---
## Q61

**Answer: C**

**Explanation:** The query result cache (also called the query result reuse) stores the results of previously executed queries for 24 hours. When an identical query is submitted, Snowflake returns the cached results without re-executing against the warehouse, consuming no compute credits. This is a Cloud Services layer feature.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake caches the results of every query that runs. If the same query is run again within 24 hours, Snowflake returns the cached results rather than running the query again."
---
## Q62

**Answer: C**

**Explanation:** The query result cache retains results for 24 hours (1 day). If the underlying data hasn't changed and the same query is run within this window, the cached result is served without warehouse compute costs.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake caches the results of every query that runs. If the same query is run again within 24 hours, Snowflake returns the cached results rather than running the query again."
---
## Q63

**Answer: B, D**

**Explanation:** For the query result cache to be used, the underlying table data must not have changed since the query was cached (B), and the query must be run within the 24-hour retention period (D). The same warehouse is NOT required — result cache is managed at the Cloud Services layer and is independent of warehouses. No special role is needed.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake reuses the cached result for a new query if: The new query exactly matches the previously-executed query. The table data contributing to the query result has not changed."
---
## Q64

**Answer: B**

**Explanation:** The local disk cache (SSD cache) stores micro-partition data retrieved from Snowflake's remote storage on the local SSDs of virtual warehouse compute nodes. This improves performance for repeated queries on the same data by avoiding repeated reads from remote storage. It is NOT a query result cache and is cleared when the warehouse suspends.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Each virtual warehouse, when active, maintains a local cache of table data that has been retrieved from the storage layer. This local cache is stored on the SSDs of the warehouse instances, and improves the performance of subsequent queries by reducing the number of reads from remote storage."
---
## Q65

**Answer: B**

**Explanation:** The local disk cache (SSD cache) is tied to the virtual warehouse's compute nodes. When a warehouse is suspended, those compute nodes are deallocated and the cache is cleared. This is why frequent suspension and resumption can reduce cache hit rates and increase remote storage reads.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "When a warehouse is suspended, the local cache is cleared."
---
## Q66

**Answer: C**

**Explanation:** Time Travel allows recovery of accidentally deleted or modified data within the data retention period. Since the table is only 6 hours old and Standard Edition provides at least 1 day of Time Travel, the data is recoverable. Fail-safe requires Snowflake support involvement, zero-copy clone creates copies but doesn't restore, and automatic clustering is for query optimization.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Snowflake Time Travel enables accessing historical data (that is, data that has been changed or deleted) at any point within a defined period. It serves as a powerful tool for performing the following tasks: Restoring objects that might have been accidentally or intentionally deleted."
---
## Q67

**Answer: B**

**Explanation:** The default Time Travel retention period for all Snowflake accounts is 1 day (24 hours). This is automatically enabled without any configuration. Enterprise Edition and higher can extend this up to 90 days for permanent objects.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "The standard retention period is 1 day (24 hours) and is automatically enabled for all Snowflake accounts."
---
## Q68

**Answer: A, C**

**Explanation:** Time Travel allows querying historical data (A) and restoring dropped objects (C). Fail-safe recovery (B) requires Snowflake support, not self-service Time Travel. Time Travel does not migrate data to external storage (D) or manage encryption keys (E).

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Using Time Travel, you can perform the following actions within a defined period of time: Query data in the past that has since been updated or deleted. Create clones of entire tables, schemas, and databases at or before specific points in the past. Restore tables, schemas, databases, and some other kinds of objects that have been dropped."
---
## Q69

**Answer: C**

**Explanation:** The UNDROP TABLE command is used to restore a dropped table within the Time Travel retention period. RESTORE, RECOVER, and ROLLBACK TABLE are not valid Snowflake commands for this purpose. If a table with the same name already exists, UNDROP fails and you must rename the existing table first.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Calling UNDROP restores the object to its most recent state before the DROP command was issued."
---
## Q70

**Answer: B**

**Explanation:** The OFFSET parameter specifies a time difference in seconds from the present time. To query data from 5 minutes ago, you use AT(OFFSET => -300) or AT(OFFSET => -60*5). TIMESTAMP is used for an absolute date/time, and STATEMENT is used to reference a specific query ID.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "OFFSET (time difference in seconds from the present time)" — for example: "SELECT * FROM my_table AT(OFFSET => -60*5);" queries data from 5 minutes (300 seconds) ago."
---
## Q71

**Answer: B**

**Explanation:** After the Time Travel retention period ends, historical data is moved into Fail-safe (not permanently deleted immediately). Once in Fail-safe, Time Travel operations can no longer be performed on the data. The data remains in Fail-safe for 7 days (for permanent tables) before being permanently purged.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "After the defined period of time has elapsed, the data is moved into Snowflake Fail-safe and these actions can no longer be performed."
---
## Q72

**Answer: B**

**Explanation:** Enterprise Edition is the minimum required to configure Time Travel retention periods beyond 1 day (up to 90 days) for permanent tables. Standard Edition is limited to 0 or 1 day. While Business Critical and VPS also support up to 90 days, Enterprise is the minimum.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Specifying a retention period greater than 1 day requires Enterprise Edition (or higher). With Snowflake Enterprise Edition (and higher), the default for your account can be set to any value up to 90 days."
---
## Q73

**Answer: A, C**

**Explanation:** Fail-safe is a 7-day non-configurable period (A) and recovery can only be performed by Snowflake support — not by customers directly (C). Customers cannot query data during Fail-safe (B is false), it is not a self-service tool (D is false), and the period is not configurable (E is false).

**Source:** [Understanding and viewing Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Fail-safe provides a (non-configurable) 7-day period during which historical data may be recoverable by Snowflake. This period starts immediately after the Time Travel retention period ends." and "Fail-safe is not provided as a means for accessing historical data after the Time Travel retention period has ended. It is for use only by Snowflake to recover data that may have been lost or damaged due to extreme operational failures."
---
## Q74

**Answer: B**

**Explanation:** Enterprise Edition is the minimum required for retention periods beyond 1 day. The parameter controlling this setting is DATA_RETENTION_TIME_IN_DAYS. There is no TIME_TRAVEL_RETENTION_DAYS or BACKUP_RETENTION_DAYS parameter in Snowflake.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Specifying a retention period greater than 1 day requires Enterprise Edition (or higher). With Snowflake Enterprise Edition (and higher), the default for your account can be set to any value up to 90 days." and "The DATA_RETENTION_TIME_IN_DAYS object parameter can be used..."
---
## Q75

**Answer: B**

**Explanation:** Snowflake's Continuous Data Protection lifecycle flows: Active storage (current data) → Time Travel (historical versions during retention period) → Fail-safe (7-day recovery period for permanent tables) → data is permanently purged. This is reflected in the CDP lifecycle diagram in Snowflake's documentation.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "After the defined period of time has elapsed, the data is moved into Snowflake Fail-safe and these actions can no longer be performed." (following the Time Travel period). The CDP lifecycle begins with Active storage, then data enters Time Travel after modification, then moves to Fail-safe after the retention period."
---
## Q76

**Answer: A**

**Explanation:** For permanent tables, even if Time Travel is disabled (retention = 0), the data still enters the 7-day Fail-safe period when dropped. For transient and temporary tables, there is no Fail-safe period, so data would be immediately purged. The question specifies a permanent table, so A is correct.

**Source:** [Working with Temporary and Transient Tables](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "If the Time Travel retention period for a permanent table is set to 0, it will immediately enter the Fail-safe period when it is dropped."
---
## Q77

**Answer: B, C**

**Explanation:** Both temporary tables (B) and transient tables (C) have zero Fail-safe period. Permanent tables have a 7-day Fail-safe period. External tables (D) store data externally and have no Fail-safe. However, the question asks about Snowflake-managed table types with no Fail-safe, and the docs explicitly state temporary and transient tables have no Fail-safe.

**Source:** [Working with Temporary and Transient Tables](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient and temporary tables have no Fail-safe period. As a result, no additional data storage charges are incurred beyond the Time Travel retention period."
---
## Q78

**Answer: B**

**Explanation:** "Zero-copy" refers to the fact that when a clone is created, it does not copy any actual data — the clone shares all underlying micro-partitions with the source. No additional storage is consumed until either the source or the clone is modified, at which point new micro-partitions are created exclusively for the modified object.

**Source:** [Data Storage Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations)

**Quote:** "Snowflake's zero-copy cloning feature provides a convenient way to quickly take a 'snapshot' of any table... which initially shares the underlying storage." and "A cloned table initially shares all existing micro-partitions of the original table with no additional storage costs."
---
## Q79

**Answer: C**

**Explanation:** New micro-partitions are created for a cloned table only when DML operations (inserts, updates, deletes) are performed on the clone. At creation, the clone shares all micro-partitions with the source. When the source is modified, it creates new micro-partitions for itself, but those do not affect the clone.

**Source:** [Data Storage Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations)

**Quote:** "Each change to the clone results in new micro-partitions that are owned exclusively by the clone."
---
## Q80

**Answer: C**

**Explanation:** External named stages can be cloned individually. User stages and table stages cannot be cloned (they are not database objects with the same DDL flexibility). External tables pointing to S3 do store metadata in Snowflake but cloning an external table is more restricted than cloning an external named stage.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "You can clone external named stages individually. An external stage references a bucket or container in external cloud storage; cloning an external stage has no impact on the referenced cloud storage."
---
## Q81

**Answer: B, D**

**Explanation:** Cloned tasks are suspended by default to prevent duplicate processing (B). Unconsumed stream records in cloned databases/schemas are inaccessible (D) — this is consistent with Time Travel behavior where historical data for the clone begins at the time the clone was created. Tasks must be manually resumed with ALTER TASK … RESUME.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "When a database or schema that contains tasks is cloned, the tasks in the clone are suspended by default." and "Currently, when a database or schema that contains source tables and streams is cloned, any unconsumed records in the streams (in the clone) are inaccessible."
---
## Q82

**Answer: B**

**Explanation:** Zero-copy cloning is virtually instantaneous and initially requires no additional storage since the clone shares micro-partitions with the source. This makes it ideal for creating development/test environments from production data without duplication costs or time delays. Clones are fully independent (writable) and do not automatically sync with source changes.

**Source:** [Data Storage Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations)

**Quote:** "Snowflake's zero-copy cloning feature provides a convenient way to quickly take a 'snapshot' of any table, schema, or database at its current state... which initially shares the underlying storage. The cloning operation itself is virtually instantaneous."
---
## Q83

**Answer: B**

**Explanation:** When a table with Automatic Clustering is cloned, the clone inherits the clustering key definition but Automatic Clustering is suspended by default. This prevents unexpected credit consumption on the clone. It can be resumed explicitly with ALTER TABLE ... RESUME RECLUSTER.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "When a table with a clustering key is cloned, the new table is created with a clustering key. By default, Automatic Clustering is suspended for the new table. To resume automatic clustering for the new table, run the following command: ALTER TABLE <name> RESUME RECLUSTER"
---
## Q84

**Answer: B**

**Explanation:** Secure Data Sharing works via Snowflake's architecture — the provider creates a share object and grants access to specific objects; the consumer creates a database from that share and queries the live data. No data is physically copied, so the provider's data is always current when the consumer queries it.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake enables the sharing of databases through shares created by data providers and access to the shared database by the data consumers. Using Snowflake Secure Data Sharing, no actual data is copied or transferred between accounts. Sharing is accomplished through Snowflake's services layer and metadata store."
---
## Q85

**Answer: C**

**Explanation:** The Snowflake Marketplace is a publicly searchable catalog where providers can publish listings (data products) for large-scale distribution to consumers. Secure Data Sharing is for direct account-to-account sharing. Data Exchange is for private exchange between specific organizations. Zero-copy cloning copies data within an account.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Listings: Provide data and other information to other Snowflake users, or access data and other information shared by Snowflake providers. You can explore, access, and provide listings to consumers privately and on the Snowflake Marketplace."
---
## Q86

**Answer: A, C**

**Explanation:** When consumers query shared data, they use their own virtual warehouse and incur their own compute costs (A). The shared data is accessible as a live, read-only database in the consumer's account (C). The provider does NOT incur compute costs from consumer queries (B is false). Data sharing does not use external storage (D is false), and cross-cloud sharing is supported via Snowgrid (E is false).

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Using Snowflake Secure Data Sharing, no actual data is copied or transferred between accounts." and "The consumer uses their own virtual warehouse to query the shared data."
---
## Q87

**Answer: B**

**Explanation:** To access data from a Snowflake share, the consumer must run CREATE DATABASE ... FROM SHARE to create a database object that maps to the provider's shared objects. This is different from creating an external table, named stage, or materialized view.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake enables the sharing of databases through shares created by data providers and access to the shared database by the data consumers... The consumer must create a database from the share to access the shared objects."
---
## Q88

**Answer: B**

**Explanation:** Snowgrid enables cross-cloud, cross-region data sharing without physically copying data. Data providers can share data and Snowgrid handles the complexity of making it accessible across different cloud providers and regions. Both accounts do not need to be on the same cloud or in the same region.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowgrid is Snowflake's cross-region, cross-cloud technology layer. With Snowgrid, you can achieve the following goals: Connect a data ecosystem across different cloud regions and providers — such as, Amazon Web Services (AWS), Microsoft Azure, and Google Cloud... Make data accessible without moving it using cross-cloud auto-fulfillment powered by Snowgrid™."
---
## Q89

**Answer: B**

**Explanation:** The user stage is accessed using the reference @~ (tilde). This stage is automatically allocated for each user and cannot be altered, dropped, or have privileges granted on it. @%tablename is for table stages, not user stages.

**Source:** [Choosing an Internal Stage for Local Files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "User stage: Each user has their own stage, allocated by Snowflake, for staging data files. This stage is referenced using the path @~."
---
## Q90

**Answer: C**

**Explanation:** Table stages are referenced using @%<tablename> syntax. For a table named ORDERS, the reference is @%ORDERS. The @~ prefix is for user stages, and @$ and @orders are not valid stage references.

**Source:** [Choosing an Internal Stage for Local Files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "Table stage: Each table has a stage, allocated by Snowflake, for staging data files. This stage is referenced using the path @%<table_name>."
---
## Q91

**Answer: B, D**

**Explanation:** Snowflake natively supports Parquet (B) and Avro (D) as semi-structured file formats. Supported formats include JSON, Avro, ORC, Parquet, and XML. YAML, HDF5, and Pickle are not natively supported Snowflake file formats.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Native support for semi-structured data (JSON, Avro, ORC, Parquet, and XML)." and from the editions table: "Bulk loading from delimited flat files (CSV, TSV, etc.) and semi-structured data files (JSON, Avro, ORC, Parquet, and XML)."
---
## Q92

**Answer: C**

**Explanation:** Named stages are the appropriate choice when you need a stage that multiple users can share and whose privileges can be managed via Snowflake's RBAC (role-based access control) system. User stages are user-specific and cannot have privileges granted. Table stages are table-specific and similarly restricted. External stages reference cloud storage but are separate from internal named stages.

**Source:** [Choosing an Internal Stage for Local Files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "Named stages are database objects that provide the greatest degree of flexibility for data loading. The security/access rules that apply to all objects apply. The privileges to use a stage can be granted or revoked from roles."
---
## Q93

**Answer: B**

**Explanation:** External stages reference data files stored in external cloud storage services (Amazon S3, Google Cloud Storage, Microsoft Azure Blob Storage). In contrast, internal stages store data within Snowflake's managed storage infrastructure. External stages do not require a virtual warehouse just to reference files, and they support all file formats that Snowflake supports.

**Source:** [Choosing an Internal Stage for Local Files](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage)

**Quote:** "External stages: reference cloud storage buckets or containers (for Amazon S3, Google Cloud Storage, or Microsoft Azure Blob Storage) that are not within the Snowflake environment."
---
## Q94

**Answer: A, C, E**

**Explanation:** Snowflake external stages support three cloud storage services: Amazon S3 (A), Google Cloud Storage/GCS (C), and Microsoft Azure Blob Storage (E). IBM Cloud Storage and Oracle Cloud Infrastructure Storage are not supported as external stage cloud providers.

**Source:** [Overview of data loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "External stages: reference cloud storage buckets or containers (for Amazon S3, Google Cloud Storage, or Microsoft Azure Blob Storage) that are not within the Snowflake environment."
---
## Q95

**Answer: A**

**Explanation:** Snowpipe retains load metadata for 14 days (to prevent duplicate file loading), while the bulk COPY INTO command retains load history metadata for 64 days. This difference means Snowpipe can check for duplicates only within a 14-day window, whereas COPY INTO can check within a 64-day window.

**Source:** [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe load history: Snowflake stores the load history for files loaded using Snowpipe for 14 days." vs bulk COPY: "Snowflake records all data loading activity in metadata, which is stored for 64 days."
---
## Q96

**Answer: C**

**Explanation:** When using the PUT command to upload files to Snowflake internal stages (user or table stages), the original file format is preserved. Snowflake does not convert files to a different format during staging — conversion options are specified in the COPY INTO command when loading data from the stage into a table.

**Source:** [Overview of data loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "When you PUT a file to a stage, Snowflake preserves the file in its original format."
---
## Q97

**Answer: C**

**Explanation:** Snowflake is available on three cloud platforms: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Oracle Cloud is not a supported Snowflake deployment platform.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake uses public cloud infrastructure to host virtual compute instances and persistent data storage." and from the docs: "Amazon Web Services (AWS), Microsoft Azure, and Google Cloud" are listed as supported platforms via Snowgrid."
---
## Q98

**Answer: C**

**Explanation:** Regulatory compliance is managed at the Cloud Services layer, which coordinates activities across Snowflake including security, authentication, access control, metadata management, query optimization, and regulatory compliance. The Storage layer handles data persistence, and the Compute layer runs virtual warehouses for query processing.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Services managed in this layer include the following: Security, authentication, and access control... Regulatory compliance."
---
## Q99

**Answer: A, C**

**Explanation:** Snowflake natively supports structured tabular data (A) and semi-structured data like JSON, Avro, ORC, Parquet, and XML (C) in its storage layer. Video/audio streaming, binary executables, and real-time sensor streams are not natively stored as first-class Snowflake table data types (though unstructured data can be handled via the FILE data type).

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake supports the following kinds of data: Structured data — such as rows and columns in a table — follows a strict tabular schema. Semi-structured data — such as a JSON file or an XML file — has a flexible schema."
---
## Q100

**Answer: C**

**Explanation:** Hybrid tables are Snowflake's table type designed for transactional (OLTP-style) workloads requiring low latency, high throughput, row locking, and referential integrity constraints. External tables are read-only and point to external data. Transient tables are for transitory analytical data. Iceberg tables are for external data lakes.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Hybrid tables are optimized for low latency and high throughput by using index-based random reads and writes. Hybrid tables support row locking and enforce unique and referential integrity constraints, which are critical for transactional workloads."
---
## Q101

**Answer: B**

**Explanation:** Snowgrid is Snowflake's cross-cloud, cross-region technology layer that enables data connectivity, governance, and replication across different cloud providers and geographic regions. It is not a UI grid tool, a partitioning strategy, or a performance monitoring dashboard.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowgrid is Snowflake's cross-region, cross-cloud technology layer. With Snowgrid, you can achieve the following goals: Connect a data ecosystem across different cloud regions and providers — such as, Amazon Web Services (AWS), Microsoft Azure, and Google Cloud — by using listings and other collaboration features."
---
## Q102

**Answer: A, C**

**Explanation:** Snowgrid provides cross-cloud/cross-region connectivity (A) and disaster recovery/business continuity through replication (C). It does not automatically migrate data to the cheapest provider, provide dedicated cross-region compute resources, or automatically store backups in separate regions as a background default.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "With Snowgrid, you can achieve the following goals: Connect a data ecosystem across different cloud regions and providers — such as, Amazon Web Services (AWS), Microsoft Azure, and Google Cloud... Enable disaster recovery and business continuity capabilities across regions by using replication."
---
## Q103

**Answer: B**

**Explanation:** The Snowflake Information Schema provides metadata about database objects (tables, columns, views, stages, functions, usage history, etc.) and is part of the Cloud Services layer's metadata management. It is not used for storing credentials, managing warehouse configurations, or exclusively billing data.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Services managed in this layer include the following:... Metadata management, including the SNOWFLAKE database and the Snowflake Information Schema."
---
## Q104

**Answer: C**

**Explanation:** Snowflake explicitly cannot be installed or run locally or on private cloud infrastructure. It is a fully cloud-hosted SaaS platform. SQL queries, JDBC connections, stored procedures, and other capabilities are all available in Snowflake just as in traditional databases — but the platform itself cannot be deployed on-premises.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake uses public cloud infrastructure to host virtual compute instances and persistent data storage. You can't install and run Snowflake locally or on private cloud infrastructures, whether on-premises or hosted."
---
## Q105

**Answer: B, D**

**Explanation:** Iceberg tables combine Snowflake query semantics with external storage managed by the user (B), and their data/metadata files are stored in external cloud storage locations like S3, GCS, or Azure (D). They do NOT store data in Snowflake's managed storage (A is false), they support both structured and semi-structured data (C is false), and they do support semi-structured formats (E is false).

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Apache Iceberg™ tables for Snowflake combine the performance and query semantics of typical Snowflake tables with external cloud storage that you manage." and "Iceberg tables store their data and metadata files in an external cloud storage location; for example, Amazon S3, Google Cloud Storage, or Microsoft Azure Storage."
---
## Q106

**Answer: B**

**Explanation:** The correct Snowflake object hierarchy from largest to smallest scope is: Account → Database → Schema → Table (and other objects like views, stages, pipes, streams, tasks, UDFs). Accounts contain databases, databases contain schemas, and schemas contain tables and other objects.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "All data maintained in Snowflake is maintained in databases. Each database consists of one or more schemas, which are logical groupings of database objects, such as tables and views. Snowflake supports multiple databases, each of which can have multiple schemas, which in turn can contain multiple tables, views, and other objects."
---
## Q107

**Answer: C**

**Explanation:** A managed access schema centralizes privilege management — object owners cannot grant privileges on their own objects to other roles. Only the schema owner (or a role with MANAGE GRANTS privilege) can make grant decisions. Standard schemas allow object owners to grant privileges on their objects.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Managed access schemas centralize privilege management with the schema owner. In managed access schemas, object owners lose the ability to make grant decisions. Only the schema owner (or a role with the MANAGE GRANTS privilege) may grant privileges on objects in the schema, including future grants, to other roles."
---
## Q108

**Answer: B, D**

**Explanation:** Snowflake sequences generate unique, incrementing numbers (B) and can be used across multiple tables (D). They are NOT guaranteed to be gap-free — Snowflake does not guarantee consecutive numbers. Sequences are schema-level persistent objects and do not reset when a session ends.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Sequences are schema-level objects that can be used to generate unique, incrementing numbers. Sequences are not guaranteed to produce gap-free sequences." and sequences "can be used across tables."
---
## Q109

**Answer: C**

**Explanation:** The stream offset only advances when the stream is consumed in a DML transaction (C) — such as INSERT INTO target_table SELECT * FROM stream_name. Simply running a SELECT query against the stream does NOT advance the offset. Source table modifications also do not advance the offset automatically.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream advances the offset only when it is used in a DML transaction... Querying a stream alone does not advance its offset, even within an explicit transaction; the stream contents must be consumed in a DML statement."
---
## Q110

**Answer: B**

**Explanation:** An append-only stream tracks only INSERT operations and ignores UPDATE and DELETE operations. This is useful for event sourcing or append-only tables where only new records need to be processed. Standard streams capture all DML (inserts, updates, deletes). Insert-only streams are a specific type used for external tables and event tables.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Append-only streams: Records insert operations only; update and delete operations are not captured."
---
## Q111

**Answer: A, C**

**Explanation:** Snowflake Tasks can execute SQL statements on a schedule (C) and call stored procedures (A). They are not designed for automatic warehouse scaling, user account management, or network policy configuration. Tasks are a data pipeline orchestration mechanism.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A task can execute a single SQL statement or call a stored procedure. Tasks can be chained together to form task graphs (DAGs). A task can be configured to execute on a schedule, after another task, or when a condition is met."
---
## Q112

**Answer: B**

**Explanation:** The primary use case for combining Streams and Tasks is continuous data processing — streams detect and capture DML changes (CDC), and tasks run on a schedule to process those changes. This creates an event-driven pipeline pattern without needing external orchestration tools.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A common pattern for implementing a continuous pipeline is to pair a stream with a task that periodically consumes the stream data using SYSTEM$STREAM_HAS_DATA."
---
## Q113

**Answer: B**

**Explanation:** SYSTEM$STREAM_HAS_DATA is a boolean function that returns TRUE when a stream has new, unprocessed change records and FALSE when the stream is empty or its data has already been consumed. It is commonly used in task conditions to avoid running tasks when there is nothing to process.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "SYSTEM$STREAM_HAS_DATA returns TRUE if the stream specified contains unconsumed change data that is within its staleness window, and FALSE otherwise."
---
## Q114

**Answer: B, C**

**Explanation:** UDFs support multiple languages including Java, JavaScript, Python, Scala, and SQL (B). UDFs that return a table of rows are called UDTFs (User-Defined Table Functions) (C). UDFs can be used in WHERE clauses, JOIN conditions, and other parts of SQL statements — not just SELECT. UDFs are persistent schema objects, not session-scoped.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "User-defined functions (UDFs) with support for Java, JavaScript, Python, and SQL." and "User-Defined Table Functions (UDTFs) that return a set of rows."
---
## Q115

**Answer: C**

**Explanation:** A User-Defined Table Function (UDTF) returns a table (set of rows) rather than a single scalar value. This makes it useful for producing multiple output rows per input row. Scalar UDFs return a single value, aggregate UDFs aggregate many rows into one value, and window UDFs operate over partitions of data.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Snowflake supports User-Defined Table Functions (UDTFs) that return a set of rows in the form of a table."
---
## Q116

**Answer: B**

**Explanation:** External functions allow Snowflake SQL queries to call external APIs (like AWS Lambda, Azure Functions, or any REST API) by routing through an API Gateway. This allows Snowflake to be extended with functionality that does not exist natively, such as calling third-party enrichment services or custom business logic hosted externally.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "External functions for extending Snowflake to other development platforms." and "External access for enabling user-defined functions (UDFs) or stored procedures to securely connect to external network locations, such as a third-party API or another database."
---
## Q117

**Answer: B, D**

**Explanation:** Stored procedures support Java, JavaScript, Python, Scala, and SQL (Snowflake Scripting) — not just JavaScript (B is correct). Stored procedures can call other stored procedures, enabling modular and reusable pipeline logic (D is correct). They can run in either caller's rights or owner's rights context, configurable at creation.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Stored procedures with support for Java, JavaScript, Python, Scala, and SQL (Snowflake Scripting)." and stored procedures can call other stored procedures as part of complex orchestration logic."
---
## Q118

**Answer: B**

**Explanation:** Dynamic tables are Snowflake objects that automatically refresh based on a defined target freshness and a query specifying data transformations. They provide a declarative approach to data pipelines, where Snowflake determines how to efficiently keep the table up to date. They do not automatically resize warehouses, replicate across clouds, or manage data archiving.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Dynamic tables: Define tables that automatically refresh based on target freshness and a query that performs data transformations."
---
## Q119

**Answer: A, B, E**

**Explanation:** Snowflake supports COPY INTO (A) for bulk loading from staged files, Snowpipe (B) for continuous micro-batch loading from stages, and Snowpipe Streaming (E) for low-latency row-level data loading. Direct SQL INSERT statements (C) are also valid but are typically used for small-scale data entry, not large-scale loading. Real-time CDC via JDBC streaming protocol (D) is not a standard named Snowflake loading method.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "COPY INTO <table> command — Loads data from files to a table." and "Snowpipe — Loads data from files as soon as they are available in a stage." and "Snowpipe Streaming — Loads row-level data continuously and with low latency, using the Snowflake SDKs or a REST API, directly into Snowflake tables."
---
## Q120

**Answer: B**

**Explanation:** External tables allow querying data in external cloud storage (data lakes like S3) directly in SQL without ingesting or copying the data into Snowflake. The data stays in external storage and Snowflake maintains only metadata. Zero-copy cloning copies within Snowflake, materialized views store pre-computed results, and dynamic tables automatically refresh transformation queries.

**Source:** [Introduction to External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)

**Quote:** "An external table is a Snowflake feature that you can use to query data stored in an external stage as if the data were inside a table in Snowflake... External tables are read-only. You can't perform data manipulation language (DML) operations on external tables."
