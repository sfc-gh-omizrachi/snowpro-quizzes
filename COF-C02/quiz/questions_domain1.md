## Q1 (Single Answer)
Which term best describes Snowflake's architecture?

- A) Shared-nothing architecture
- B) Shared-disk architecture
- C) Hybrid of shared-disk and shared-nothing architectures
- D) Fully decentralized peer-to-peer architecture
---
## Q2 (Single Answer)
A company requires all data to be stored in a completely isolated environment with a dedicated metadata store and separate compute resources, isolated from all other Snowflake accounts. Which Snowflake edition should they choose?

- A) Enterprise Edition
- B) Business Critical Edition
- C) Standard Edition with enhanced security
- D) Virtual Private Snowflake (VPS)
---
## Q3 (Multi Answer - Select 2)
Which TWO of the following are responsibilities of the Cloud Services layer in Snowflake? (Select TWO)

- A) Storing data in micro-partitions
- B) Query parsing and optimization
- C) Processing SQL statements using virtual warehouses
- D) Authentication and access control
- E) Compressing data files in columnar format
---
## Q4 (Single Answer)
What is the key benefit of Snowflake's separation of storage and compute?

- A) Data is always stored in the same region as the compute cluster
- B) Storage and compute can scale independently of each other
- C) Queries always run faster because storage is co-located with compute
- D) Users must manage storage and compute resources separately
---
## Q5 (Single Answer)
Which Snowflake edition is the minimum required to use multi-cluster virtual warehouses?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)
---
## Q6 (Multi Answer - Select 2)
Which TWO features are available starting with Business Critical Edition but NOT with Enterprise Edition? (Select TWO)

- A) Multi-cluster virtual warehouses
- B) Tri-Secret Secure (customer-managed encryption keys)
- C) Extended Time Travel (up to 90 days)
- D) Support for private connectivity to the Snowflake service
- E) Column-level security with masking policies
---
## Q7 (Single Answer)
In Snowflake's architecture, which layer is responsible for metadata management, including the SNOWFLAKE database and Information Schema?

- A) Database Storage layer
- B) Compute layer
- C) Cloud Services layer
- D) Data Exchange layer
---
## Q8 (Single Answer)
How does Snowflake handle virtual warehouse resource isolation?

- A) All virtual warehouses share the same pool of compute resources
- B) Each virtual warehouse is an independent compute cluster that does not share resources with other warehouses
- C) Virtual warehouses share resources but queries are prioritized using a queue
- D) Only one virtual warehouse can be active at a time per account
---
## Q9 (Multi Answer - Select 2)
Which TWO statements accurately describe how Snowflake stores data in Snowflake tables? (Select TWO)

- A) Data is stored in its original file format in cloud storage
- B) All data is automatically divided into micro-partitions
- C) Data is stored in user-managed partitions on local disk
- D) Snowflake reorganizes data into an internally optimized, compressed, columnar format
- E) Users must manually specify the compression algorithm for each table
---
## Q10 (Multi Answer - Select 2)
Which TWO of the following are characteristics of Snowflake as a self-managed service? (Select TWO)

- A) Users must select and configure the underlying hardware
- B) Ongoing maintenance and upgrades are handled by Snowflake
- C) Users can install and run Snowflake on private cloud infrastructure
- D) There is virtually no software for users to install, configure, or manage
- E) Users must manage their own operating system patches
---
## Q11 (Single Answer)
Which Snowflake edition is the minimum required to support HIPAA and HITRUST CSF compliance for PHI data?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)
---
## Q12 (Single Answer)
What maximum Time Travel retention period is available for permanent tables on Enterprise Edition or higher?

- A) 1 day
- B) 7 days
- C) 30 days
- D) 90 days
---
## Q13 (Single Answer)
Which programming languages are supported by Snowpark?

- A) Python, R, and Java
- B) Java, Python, and Scala
- C) Python, JavaScript, and Go
- D) Java, Scala, and C#
---
## Q14 (Single Answer)
What is SnowCD primarily used for?

- A) Managing Snowflake account configurations
- B) Diagnosing and troubleshooting network connections to Snowflake
- C) Loading data from local file systems into Snowflake stages
- D) Converting SQL queries between different database platforms
---
## Q15 (Multi Answer - Select 2)
Which TWO statements accurately describe Snowpark's capabilities? (Select TWO)

- A) Snowpark requires a separate external compute cluster for processing
- B) Snowpark pushes down all data transformation and heavy lifting to the Snowflake data cloud
- C) Snowpark only supports Python as a programming language
- D) Snowpark uses lazy evaluation, executing operations on the server only when an action is called
- E) Snowpark does not support creating user-defined functions (UDFs)
---
## Q16 (Single Answer)
Which Snowflake function does SnowCD use to obtain the list of hostnames and ports it needs to check?

- A) SYSTEM$GET_ENDPOINTS()
- B) SYSTEM$ALLOWLIST()
- C) SYSTEM$CONNECTIVITY_CHECK()
- D) SYSTEM$NETWORK_SCAN()
---
## Q17 (Single Answer)
Which statement best describes the Snowflake SQL API?

- A) A JDBC driver for connecting Java applications to Snowflake
- B) A REST API that can submit SQL statements, check execution status, and cancel execution
- C) A Python library for building data pipelines in Snowflake
- D) A command-line tool for executing SQL queries interactively
---
## Q18 (Single Answer)
What is a key advantage of deploying Streamlit apps in Snowflake rather than externally?

- A) Streamlit apps in Snowflake can only use Python 2.x
- B) Data does not need to move to an external system for processing
- C) Streamlit apps bypass Snowflake's role-based access control
- D) Streamlit apps in Snowflake do not require any compute resources
---
## Q19 (Multi Answer - Select 2)
Which TWO of the following are Snowflake Cortex AI capabilities? (Select TWO)

- A) Cortex Analyst for natural language querying of structured data
- B) Cortex Compute for managing virtual warehouse scaling
- C) Cortex Fine-tuning for customizing LLM models
- D) Cortex Storage for optimizing micro-partition layouts
- E) Cortex Backup for automated disaster recovery
---
## Q20 (Single Answer)
Which statement about SnowSQL is correct?

- A) SnowSQL is an open-source tool built from scratch independently
- B) SnowSQL is a command-line client that can run as an interactive shell or in batch mode
- C) SnowSQL can only execute SELECT queries and cannot perform DDL operations
- D) SnowSQL requires a separate installation of the Snowflake Connector for Python
---
## Q21 (Single Answer)
Which of the following is NOT a Snowflake driver?

- A) JDBC Driver
- B) ODBC Driver
- C) Go Snowflake Driver
- D) Ruby Driver
---
## Q22 (Multi Answer - Select 2)
Which TWO actions can be performed using Snowsight? (Select TWO)

- A) Install Snowflake on a private cloud infrastructure
- B) Create and run Streamlit apps
- C) Configure the underlying hardware for compute nodes
- D) Monitor query performance and history
- E) Directly modify micro-partition storage files
---
## Q23 (Single Answer)
How does Snowflake handle the security of data used by Cortex AI features?

- A) Customer data is shared with model developers for training
- B) AI models run outside Snowflake's security perimeter for performance
- C) All AI models run inside Snowflake's security and governance perimeter, and customer data is never used to train models available to other customers
- D) Customer data is anonymized and used to improve general-purpose AI models
---
## Q24 (Single Answer)
What is the core abstraction in Snowpark that represents a set of data and provides methods to operate on that data?

- A) ResultSet
- B) DataFrame
- C) DataTable
- D) RecordSet
---
## Q25 (Single Answer)
A developer needs to store session-specific data that should not be visible to other users and does not need to persist beyond the current session. Which table type should they use?

- A) Permanent table
- B) Transient table
- C) Temporary table
- D) External table
---
## Q26 (Multi Answer - Select 2)
Which TWO statements are true about transient tables in Snowflake? (Select TWO)

- A) Transient tables have a 7-day Fail-safe period
- B) Transient tables persist until explicitly dropped
- C) Transient tables are visible only within the session that created them
- D) Transient tables have a Time Travel retention period of 0 or 1 day
- E) Transient tables cannot be converted to any other table type after creation
---
## Q27 (Single Answer)
What is the primary purpose of a stream object in Snowflake?

- A) To control the flow of data between virtual warehouses
- B) To record DML changes made to tables for change data capture (CDC)
- C) To stream live video data into Snowflake tables
- D) To manage real-time connections between Snowflake and external systems
---
## Q28 (Single Answer)
Which of the following is true about external tables in Snowflake?

- A) External tables support full DML operations including INSERT, UPDATE, and DELETE
- B) External tables store data within Snowflake's managed storage
- C) External tables are read-only and their data files are stored in an external stage
- D) External tables can only reference data in JSON format
---
## Q29 (Multi Answer - Select 3)
Which THREE types of internal stages does Snowflake support? (Select THREE)

- A) User stage
- B) Database stage
- C) Table stage
- D) Schema stage
- E) Named stage
- F) Account stage
---
## Q30 (Single Answer)
Which metadata columns does a stream add when queried?

- A) METADATA$FILENAME, METADATA$FILE_ROW_NUMBER, METADATA$FILE_SIZE
- B) METADATA$ACTION, METADATA$ISUPDATE, METADATA$ROW_ID
- C) METADATA$TIMESTAMP, METADATA$USER, METADATA$QUERY_ID
- D) METADATA$SOURCE, METADATA$TARGET, METADATA$OPERATION
---
## Q31 (Single Answer)
What happens when a stream's offset in Snowflake is advanced?

- A) The stream is automatically dropped
- B) The stream is advanced only when it is consumed in a DML transaction
- C) The stream advances every time a SELECT query is run against it
- D) The stream offset advances when the source table is modified
---
## Q32 (Multi Answer - Select 2)
Which TWO statements about secure views are correct? (Select TWO)

- A) Secure views expose their view definition to all users with SELECT privileges
- B) Secure views prevent internal optimizations from indirectly exposing underlying data
- C) The view definition of a secure view is visible only to the role that owns the view
- D) Secure views always perform faster than non-secure views
- E) Secure views cannot be used with Snowflake data sharing
---
## Q33 (Single Answer)
Which statement about materialized views in Snowflake is correct?

- A) Materialized views must be manually refreshed by the user after each change to the base table
- B) Materialized views are available in all Snowflake editions including Standard
- C) A materialized view stores pre-computed results and is automatically maintained by a Snowflake background service
- D) Materialized views do not incur any additional storage or compute costs
---
## Q34 (Single Answer)
A Snowpipe object in Snowflake is best described as:

- A) A virtual warehouse dedicated to continuous data loading
- B) A named Snowflake object containing a COPY statement used by Snowpipe for loading data from staged files
- C) A temporary table that stages data before it is loaded into permanent tables
- D) A network pipe that connects Snowflake to external cloud services
---
## Q35 (Single Answer)
What is the key difference between a user stage and a named stage in Snowflake?

- A) User stages support file format options while named stages do not
- B) Named stages are database objects with grantable privileges, while user stages cannot be altered, dropped, or have privileges granted
- C) User stages can load data into multiple tables, while named stages are limited to one table
- D) Named stages are allocated automatically per user, while user stages must be created manually
---
## Q36 (Multi Answer - Select 2)
Which TWO mechanisms does Snowpipe use to detect new data files for loading? (Select TWO)

- A) Polling the source table for new rows
- B) Automated cloud messaging using event notifications
- C) Scheduled SQL-based file discovery
- D) Calling Snowpipe REST endpoints with file names
- E) Using Snowflake streams to track file changes
---
## Q37 (Single Answer)
What is the approximate size range of each micro-partition in Snowflake in terms of uncompressed data?

- A) 1 MB to 10 MB
- B) 50 MB to 500 MB
- C) 500 MB to 5 GB
- D) 1 GB to 10 GB
---
## Q38 (Single Answer)
How are micro-partitions created in Snowflake?

- A) Users must manually define partition boundaries using DDL commands
- B) Micro-partitions are automatically created by Snowflake based on the ordering of data as it is inserted or loaded
- C) A DBA must run a REPARTITION command periodically
- D) Micro-partitions are only created when a clustering key is defined
---
## Q39 (Multi Answer - Select 2)
Which TWO types of metadata does Snowflake store for each micro-partition? (Select TWO)

- A) The usernames of users who queried the partition
- B) The range of values for each column in the micro-partition
- C) The SQL statements that created the data in the partition
- D) The number of distinct values in each column
- E) The network latency of the storage device
---
## Q40 (Single Answer)
What does clustering depth measure in Snowflake?

- A) The number of columns in a clustering key
- B) The total number of micro-partitions in a table
- C) The average depth of overlapping micro-partitions for specified columns
- D) The maximum number of rows per micro-partition
---
## Q41 (Single Answer)
Which statement is true about Automatic Clustering in Snowflake?

- A) Automatic Clustering requires users to designate a specific virtual warehouse for reclustering operations
- B) Automatic Clustering is a serverless service that does not require a user-provided warehouse and does not block DML
- C) Automatic Clustering is only available for temporary tables
- D) Automatic Clustering reclusters all tables immediately when a clustering key is defined
---
## Q42 (Multi Answer - Select 2)
Which TWO of the following are benefits of micro-partitioning in Snowflake compared to traditional static partitioning? (Select TWO)

- A) Micro-partitions must be explicitly defined and maintained by users
- B) Micro-partitions are derived automatically and do not need to be defined by users
- C) Micro-partitions have uniform small size which enables efficient DML and fine-grained pruning
- D) Micro-partitions prevent any overlap in data ranges between partitions
- E) Micro-partitions store data in row-based format for transactional workloads
---
## Q43 (Single Answer)
What happens to the micro-partitions when a column is dropped from a Snowflake table?

- A) The micro-partitions are immediately rewritten to remove the dropped column's data
- B) The data in the dropped column remains in storage and micro-partitions are not rewritten
- C) The micro-partitions containing the dropped column are deleted entirely
- D) The dropped column's data is moved to Fail-safe storage
---
## Q44 (Single Answer)
What is the recommended maximum number of columns in a clustering key for most tables?

- A) 1 column
- B) 3 or 4 columns
- C) 8 to 10 columns
- D) There is no recommended limit
---
## Q45 (Single Answer)
Which Snowflake view provides the most detailed breakdown of physical storage including Active, Time Travel, and Fail-safe bytes?

- A) WAREHOUSE_METERING_HISTORY
- B) TABLE_STORAGE_METRICS
- C) QUERY_HISTORY
- D) DATABASE_STORAGE_USAGE_HISTORY
---
## Q46 (Multi Answer - Select 2)
Which TWO statements about Snowflake's zero-copy cloning and storage are correct? (Select TWO)

- A) A cloned table immediately doubles the storage used by the original table
- B) A cloned table initially shares all existing micro-partitions of the original table
- C) Changes made to the clone create new micro-partitions owned exclusively by the clone
- D) Cloned tables cannot have their own Time Travel settings
- E) Only permanent tables can be cloned in Snowflake
---
## Q47 (Single Answer)
When ordering columns in a multi-column clustering key, what is the recommended approach?

- A) Order columns from highest cardinality to lowest cardinality
- B) Order columns alphabetically by column name
- C) Order columns from lowest cardinality to highest cardinality
- D) Always place the primary key column first
---
## Q48 (Single Answer)
How does Snowflake's columnar storage within micro-partitions improve query performance?

- A) All columns are always scanned together regardless of the query
- B) Only the columns referenced by a query are scanned, and each column is compressed independently
- C) Columns are stored in separate databases for isolation
- D) Columnar storage eliminates the need for any query pruning
---
## Q49 (Single Answer)
Which virtual warehouse size is the default when creating a warehouse using CREATE WAREHOUSE in Snowflake?

- A) Small
- B) Medium
- C) X-Small
- D) X-Large
---
## Q50 (Single Answer)
A data team needs to run a very large, complex analytical query that requires significant compute resources. What should they do to improve query performance?

- A) Add more databases to distribute the load
- B) Increase the size of the virtual warehouse
- C) Create additional schemas to parallelize the query
- D) Enable automatic clustering on all tables
---
## Q51 (Multi Answer - Select 2)
Which TWO statements about auto-suspend and auto-resume for virtual warehouses are correct? (Select TWO)

- A) Auto-suspend and auto-resume are enabled by default for new warehouses
- B) Auto-suspend can be configured individually per cluster in a multi-cluster warehouse
- C) Auto-resume automatically starts the warehouse when a new query is submitted
- D) Auto-suspend only applies to the entire warehouse, not individual clusters in a multi-cluster warehouse
- E) Auto-resume requires manual activation after the warehouse is created
---
## Q52 (Single Answer)
What is the primary purpose of multi-cluster warehouses in Snowflake?

- A) To improve the performance of slow-running individual queries
- B) To scale compute resources to manage user and query concurrency needs
- C) To reduce storage costs by distributing data across clusters
- D) To separate development and production workloads
---
## Q53 (Single Answer)
In a multi-cluster warehouse running in Maximized mode, what determines how many clusters run while the warehouse is active?

- A) Snowflake dynamically starts and stops clusters based on workload
- B) Only the minimum number of clusters runs unless queuing occurs
- C) All clusters run simultaneously because maximum and minimum are set to the same value
- D) The Economy scaling policy controls which clusters are active
---
## Q54 (Multi Answer - Select 2)
Which TWO scaling policies are available for multi-cluster warehouses in Auto-scale mode? (Select TWO)

- A) Aggressive
- B) Standard
- C) Balanced
- D) Economy
- E) Conservative
---
## Q55 (Single Answer)
What does the Economy scaling policy do compared to the Standard scaling policy in a multi-cluster warehouse?

- A) Economy starts additional clusters faster to avoid any queuing
- B) Economy conserves credits by favoring keeping running clusters fully loaded, which may result in queries being queued
- C) Economy automatically resizes the warehouse to a smaller size during low demand
- D) Economy pauses the warehouse after each query to reduce credit consumption
---
## Q56 (Single Answer)
A company has a Medium-size multi-cluster warehouse with a maximum of 3 clusters running in Maximized mode for 2 hours. How many credits are consumed in total (using Gen1 standard rates)?

- A) 8 credits
- B) 12 credits
- C) 16 credits
- D) 24 credits
---
## Q57 (Multi Answer - Select 3)
Which THREE of the following are valid warehouse sizes in Snowflake? (Choose three.)

- A) X-Small
- B) Nano
- C) 3X-Large
- D) 5X-Large
- E) Mega
- F) X-Large
---
## Q58 (Single Answer)
What is the key difference between scaling UP versus scaling OUT for virtual warehouses?

- A) Scaling up adds more clusters; scaling out increases the warehouse size
- B) Scaling up increases the warehouse size to improve query performance; scaling out adds clusters to improve concurrency
- C) Scaling up reduces costs; scaling out increases performance
- D) Scaling up and scaling out both achieve the same outcome
---
## Q59 (Single Answer)
Which billing model does Snowflake use for virtual warehouse compute costs?

- A) Per-query billing based on query complexity
- B) Per-hour billing regardless of actual usage
- C) Per-second billing with a 60-second minimum each time the warehouse starts
- D) Monthly flat-rate billing based on warehouse size
---
## Q60 (Single Answer)
A session is initiated in Snowflake without specifying a warehouse. What happens when a query is submitted in that session?

- A) Snowflake automatically uses the smallest available warehouse
- B) The query is executed using serverless compute
- C) The query cannot be submitted until a warehouse is associated with the session
- D) The query is queued until a warehouse becomes available
---
## Q61 (Single Answer)
Which type of cache in Snowflake stores query results and allows identical subsequent queries to retrieve results without re-executing against the warehouse?

- A) Local disk cache
- B) Remote disk cache
- C) Query result cache
- D) Metadata cache
---
## Q62 (Single Answer)
How long does Snowflake's query result cache retain results by default?

- A) 1 hour
- B) 12 hours
- C) 24 hours
- D) 7 days
---
## Q63 (Multi Answer - Select 2)
Which TWO conditions must be true for a query to use the cached result from a previous identical query? (Select TWO)

- A) The same virtual warehouse must be running
- B) The underlying table data must not have changed since the original query
- C) The user must be an ACCOUNTADMIN
- D) The query must be run within the result cache retention period
- E) The query must use a clustering key
---
## Q64 (Single Answer)
What is the local disk cache (also called the SSD cache) in Snowflake used for?

- A) Caching query results from previous executions
- B) Caching micro-partition data retrieved from remote storage on the local SSD of compute nodes
- C) Storing temporary table data between sessions
- D) Caching compiled query execution plans
---
## Q65 (Single Answer)
What happens to the local disk cache when a virtual warehouse is suspended?

- A) The cache is persisted in cloud storage for future use
- B) The cache is cleared when the warehouse is suspended
- C) The cache is transferred to another warehouse
- D) The cache is compressed and stored for the next session
---
## Q66 (Single Answer)
A data engineer accidentally runs a DELETE statement that removes critical rows from a production table. The table was created 6 hours ago. Which Snowflake feature should they use to recover the data?

- A) Fail-safe
- B) Zero-copy clone
- C) Time Travel
- D) Automatic clustering
---
## Q67 (Single Answer)
What is the default Time Travel retention period for all Snowflake accounts?

- A) 0 days
- B) 1 day
- C) 7 days
- D) 30 days
---
## Q68 (Multi Answer - Select 2)
Which TWO operations can be performed using Snowflake's Time Travel feature? (Select TWO)

- A) Querying data that has since been updated or deleted
- B) Recovering data from Fail-safe storage
- C) Restoring tables, schemas, or databases that have been dropped
- D) Migrating data to external cloud storage
- E) Encrypting historical data with customer-managed keys
---
## Q69 (Single Answer)
What SQL keyword is used to restore a dropped table within the Time Travel retention period?

- A) RESTORE TABLE
- B) RECOVER TABLE
- C) UNDROP TABLE
- D) ROLLBACK TABLE
---
## Q70 (Single Answer)
Which AT | BEFORE parameter would you use to query a table as it existed exactly 5 minutes ago?

- A) TIMESTAMP
- B) OFFSET
- C) STATEMENT
- D) ROLLBACK
---
## Q71 (Single Answer)
What happens to historical data after the Time Travel retention period ends?

- A) The data is permanently deleted immediately
- B) The data is moved into Fail-safe
- C) The data is archived to external cloud storage
- D) The data is stored in a separate backup database
---
## Q72 (Single Answer)
Which Snowflake edition is required to configure Time Travel retention periods longer than 1 day for permanent tables?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)
---
## Q73 (Multi Answer - Select 2)
Which TWO statements about Snowflake Fail-safe are correct? (Select TWO)

- A) Fail-safe provides a 7-day non-configurable period after the Time Travel retention period
- B) Customers can access and query their data directly during the Fail-safe period
- C) Fail-safe data recovery can only be performed by Snowflake support
- D) Fail-safe is provided as a standard self-service data recovery tool
- E) The Fail-safe period is configurable per table
---
## Q74 (Single Answer)
A data engineer needs to set up a 30-day Time Travel period for a critical permanent table. Which Snowflake edition is the minimum required, and what parameter controls this setting?

- A) Standard Edition; DATA_RETENTION_TIME_IN_DAYS
- B) Enterprise Edition; DATA_RETENTION_TIME_IN_DAYS
- C) Business Critical Edition; TIME_TRAVEL_RETENTION_DAYS
- D) Enterprise Edition; BACKUP_RETENTION_DAYS
---
## Q75 (Single Answer)
What is the Continuous Data Protection (CDP) lifecycle order in Snowflake?

- A) Active storage → Fail-safe → Time Travel
- B) Active storage → Time Travel → Fail-safe
- C) Time Travel → Active storage → Fail-safe
- D) Fail-safe → Active storage → Time Travel
---
## Q76 (Single Answer)
A table has a Time Travel retention period set to 0. What happens to the data when the table is dropped?

- A) It enters the 7-day Fail-safe period immediately (for permanent tables)
- B) The data is immediately and permanently deleted
- C) The data is moved to Time Travel for 1 day before Fail-safe
- D) The table cannot be dropped if Time Travel is disabled
---
## Q77 (Multi Answer - Select 2)
Which TWO object types have NO Fail-safe period in Snowflake? (Select TWO)

- A) Permanent tables
- B) Temporary tables
- C) Transient tables
- D) External tables
- E) Materialized views
---
## Q78 (Single Answer)
What makes zero-copy cloning in Snowflake "zero-copy" at the time of creation?

- A) The clone is stored in a compressed format that uses zero storage
- B) The clone initially shares all underlying micro-partitions with the source, requiring no additional storage
- C) Cloning is done by copying only the metadata and no actual data
- D) Zero bytes of network bandwidth are consumed during cloning
---
## Q79 (Single Answer)
When are new micro-partitions created for a cloned table in Snowflake?

- A) Immediately when the clone is created
- B) When the clone's Time Travel retention period expires
- C) When DML operations (inserts, updates, deletes) are performed on the clone
- D) When the source table is modified after the clone is created
---
## Q80 (Single Answer)
Which of the following Snowflake objects CAN be zero-copy cloned?

- A) User stages
- B) Table stages
- C) Named external stages
- D) External tables pointing to S3
---
## Q81 (Multi Answer - Select 2)
Which TWO statements about cloning and tasks/streams in Snowflake are correct? (Select TWO)

- A) When a schema containing tasks is cloned, the tasks in the clone run immediately
- B) When a schema containing tasks is cloned, the tasks in the clone are suspended by default
- C) When a database containing streams is cloned, unconsumed records in the streams are immediately accessible
- D) When a database containing streams is cloned, unconsumed records in the streams (in the clone) are inaccessible
- E) Streams cannot be included when cloning a database or schema
---
## Q82 (Single Answer)
What is a key advantage of using zero-copy cloning for development and testing environments?

- A) Clone data is encrypted with separate keys from the production environment
- B) Clone creation is instantaneous and initially requires no additional storage
- C) Clones automatically synchronize with changes in the source
- D) Clones can only be read but not modified, ensuring data integrity
---
## Q83 (Single Answer)
After a table with a clustering key is cloned, what is the default state of Automatic Clustering for the cloned table?

- A) Automatic Clustering is enabled and actively reclustering
- B) Automatic Clustering is suspended for the cloned table
- C) Automatic Clustering is permanently disabled for cloned tables
- D) Automatic Clustering is transferred from the source to the clone
---
## Q84 (Single Answer)
How does Snowflake Secure Data Sharing work between provider and consumer accounts?

- A) Data is physically copied from the provider's account to the consumer's account
- B) The provider creates a share object, and consumers access the data live without copying it
- C) Data is encrypted and transferred to a neutral cloud storage location
- D) Both accounts must be in the same cloud region for sharing to work
---
## Q85 (Single Answer)
Which Snowflake feature allows a data provider to publish and distribute data to a large number of consumers through a publicly searchable catalog?

- A) Secure Data Sharing
- B) Data Exchange
- C) Snowflake Marketplace
- D) Zero-copy cloning
---
## Q86 (Multi Answer - Select 2)
Which TWO statements about Snowflake data sharing are correct? (Select TWO)

- A) Consumers must create a virtual warehouse to query shared data, incurring their own compute costs
- B) The provider incurs compute costs when consumers query shared data
- C) Shared data can be accessed as a live, read-only view in the consumer's account
- D) Data sharing requires data to be exported to a neutral cloud storage bucket first
- E) Data sharing is only supported between accounts on the same cloud provider
---
## Q87 (Single Answer)
Which type of Snowflake object must a consumer create to access data from a share?

- A) External table
- B) Database from the share
- C) Named stage
- D) Materialized view from the share
---
## Q88 (Single Answer)
What is the key advantage of Snowflake's cross-cloud data sharing feature via Snowgrid?

- A) Data must be replicated to the same region before sharing
- B) Data can be shared across different cloud providers and regions without copying the data
- C) Cross-cloud sharing requires both accounts to use the same Snowflake edition
- D) Cross-cloud sharing automatically encrypts data with AES-512 encryption
---
## Q89 (Single Answer)
Which reference is used to access a user stage in Snowflake?

- A) @%username
- B) @~
- C) @username
- D) @$user
---
## Q90 (Single Answer)
Which reference is used to access a table stage for a table named ORDERS in Snowflake?

- A) @~ORDERS
- B) @orders
- C) @%ORDERS
- D) @$ORDERS
---
## Q91 (Multi Answer - Select 2)
Which TWO file formats does Snowflake support natively for loading semi-structured data? (Select TWO)

- A) YAML
- B) Parquet
- C) HDF5
- D) Avro
- E) Pickle
---
## Q92 (Single Answer)
A data engineer wants to create a stage that can be shared with multiple users and have its privileges managed through Snowflake's RBAC system. Which internal stage type should they use?

- A) User stage
- B) Table stage
- C) Named stage
- D) External stage
---
## Q93 (Single Answer)
What distinguishes an external stage from an internal stage in Snowflake?

- A) External stages require a virtual warehouse to access files
- B) External stages reference data files stored in external cloud storage (S3, GCS, Azure Blob)
- C) External stages store data within Snowflake's managed storage system
- D) External stages can only load CSV files
---
## Q94 (Multi Answer - Select 3)
Which THREE cloud storage services can be referenced by Snowflake external stages? (Choose three.)

- A) Amazon S3
- B) IBM Cloud Storage
- C) Google Cloud Storage (GCS)
- D) Oracle Cloud Infrastructure Storage
- E) Microsoft Azure Blob Storage
---
## Q95 (Single Answer)
How many days does Snowpipe retain load metadata to prevent duplicate file loading, compared to the bulk COPY command?

- A) Snowpipe: 14 days; COPY: 64 days
- B) Snowpipe: 7 days; COPY: 30 days
- C) Snowpipe: 30 days; COPY: 64 days
- D) Snowpipe: 1 day; COPY: 14 days
---
## Q96 (Single Answer)
What file format does Snowflake use for data stored in user stages and table stages by default (when using PUT to upload files)?

- A) CSV
- B) JSON
- C) The original file format is preserved
- D) Parquet
---
## Q97 (Single Answer)
Which cloud platforms does Snowflake support for deployment?

- A) AWS only
- B) AWS and Azure only
- C) AWS, Azure, and Google Cloud Platform (GCP)
- D) AWS, Azure, GCP, and Oracle Cloud
---
## Q98 (Single Answer)
In Snowflake's architecture, which layer handles regulatory compliance?

- A) Database Storage layer
- B) Compute layer (virtual warehouses)
- C) Cloud Services layer
- D) External integration layer
---
## Q99 (Multi Answer - Select 2)
Which TWO types of data does Snowflake support natively in its storage layer? (Select TWO)

- A) Structured tabular data (rows and columns)
- B) Video and audio streaming data
- C) Semi-structured data (JSON, Avro, Parquet, XML)
- D) Binary executable files
- E) Real-time sensor streams
---
## Q100 (Single Answer)
What type of table optimizes workloads that require low-latency, high-throughput transactional operations with row locking in Snowflake?

- A) External table
- B) Transient table
- C) Hybrid table
- D) Iceberg table
---
## Q101 (Single Answer)
What is Snowgrid in Snowflake?

- A) A visual grid tool in Snowsight for displaying query results
- B) Snowflake's cross-region, cross-cloud technology layer enabling data collaboration across different cloud providers
- C) A partitioning strategy for distributing data evenly across nodes
- D) A monitoring dashboard for tracking cross-warehouse performance
---
## Q102 (Multi Answer - Select 2)
Which TWO capabilities does Snowgrid provide? (Select TWO)

- A) Connecting a data ecosystem across different cloud regions and providers
- B) Storing backups in a separate geographic region automatically
- C) Enabling disaster recovery and business continuity across regions using replication
- D) Automatically migrating data to the cheapest cloud provider
- E) Providing dedicated compute resources for cross-region queries
---
## Q103 (Single Answer)
What is the purpose of the Snowflake Information Schema?

- A) To store user authentication credentials
- B) To provide metadata about database objects such as tables, columns, views, and usage history
- C) To manage virtual warehouse configurations
- D) To store the query execution history for billing purposes only
---
## Q104 (Single Answer)
Which of the following is a characteristic of Snowflake that cannot be done on-premises?

- A) Running SQL queries against structured data
- B) Using JDBC drivers to connect applications
- C) Installing and running Snowflake locally or on private cloud infrastructure
- D) Using stored procedures written in JavaScript
---
## Q105 (Multi Answer - Select 2)
Which TWO statements are true about Apache Iceberg tables in Snowflake? (Select TWO)

- A) Iceberg tables store data entirely within Snowflake's managed storage
- B) Iceberg tables combine Snowflake query semantics with external cloud storage managed by the user
- C) Iceberg tables can only store structured relational data
- D) Iceberg tables store their data and metadata files in an external cloud storage location
- E) Iceberg tables do not support semi-structured data formats
---
## Q106 (Single Answer)
What is the correct hierarchy of Snowflake objects from largest to smallest scope?

- A) Database → Account → Schema → Table
- B) Account → Database → Schema → Table
- C) Schema → Database → Account → Table
- D) Account → Schema → Database → Table
---
## Q107 (Single Answer)
Which Snowflake schema type prevents object owners from granting their own privileges to other roles, centralizing privilege management to the schema owner?

- A) Standard schema
- B) Transient schema
- C) Managed access schema
- D) Shared schema
---
## Q108 (Multi Answer - Select 2)
Which TWO statements about sequences in Snowflake are correct? (Select TWO)

- A) Sequences guarantee gap-free, consecutive numbers
- B) Sequences generate unique, incrementing numbers but are not guaranteed to be gap-free
- C) Sequences can only be used with a single table
- D) Sequences can be used across multiple tables
- E) Sequences automatically reset when a session ends
---
## Q109 (Single Answer)
A stream is created on table SALES. When does the stream's offset advance?

- A) Whenever the source table SALES is modified
- B) Whenever a SELECT query reads the stream
- C) Only when the stream is consumed in a DML transaction such as INSERT INTO ... SELECT FROM stream
- D) When the stream is manually advanced using ALTER STREAM
---
## Q110 (Single Answer)
What stream type in Snowflake captures ONLY insert operations and does not capture updates or deletes?

- A) Standard stream
- B) Append-only stream
- C) Insert-only stream
- D) Delta stream
---
## Q111 (Multi Answer - Select 2)
Which TWO object types can Snowflake Tasks be used with? (Select TWO)

- A) To call stored procedures on a schedule
- B) To automatically scale virtual warehouse size
- C) To execute SQL statements on a schedule
- D) To manage Snowflake user accounts
- E) To configure network policies
---
## Q112 (Single Answer)
What is the primary use case for combining Streams and Tasks in Snowflake?

- A) To create materialized views with automatic refresh
- B) To perform continuous data processing — detecting table changes with streams and acting on them with tasks
- C) To manage virtual warehouse auto-suspend behavior
- D) To replicate data across Snowflake accounts automatically
---
## Q113 (Single Answer)
What does the SYSTEM$STREAM_HAS_DATA function return in Snowflake?

- A) The total number of records currently in a stream
- B) TRUE if a stream contains new unprocessed change records, FALSE if it is empty
- C) The schema of data captured by the stream
- D) The offset timestamp of the most recent stream consumption
---
## Q114 (Multi Answer - Select 2)
Which TWO statements about UDFs (User-Defined Functions) in Snowflake are correct? (Select TWO)

- A) UDFs can only be written in SQL
- B) UDFs support Java, JavaScript, Python, Scala, and SQL
- C) UDFs that return a table of rows are called UDTFs (User-Defined Table Functions)
- D) UDFs can only be used in SELECT statements, not in WHERE clauses
- E) UDFs are automatically deleted when the session ends
---
## Q115 (Single Answer)
Which type of Snowflake UDF returns a set of rows (a table) rather than a single value?

- A) Scalar UDF
- B) Aggregate UDF
- C) User-Defined Table Function (UDTF)
- D) Window UDF
---
## Q116 (Single Answer)
A developer wants to extend Snowflake's functionality by calling an external API hosted on AWS Lambda from within a SQL query. Which Snowflake feature should they use?

- A) Snowpark stored procedure
- B) External function
- C) Named stage
- D) SQL API
---
## Q117 (Multi Answer - Select 2)
Which TWO statements about stored procedures in Snowflake are correct? (Select TWO)

- A) Stored procedures can only be written in JavaScript
- B) Stored procedures support Java, JavaScript, Python, Scala, and SQL (Snowflake Scripting)
- C) Stored procedures cannot call other stored procedures
- D) Stored procedures can call other stored procedures
- E) Stored procedures run in the caller's context by default and cannot be switched
---
## Q118 (Single Answer)
What does the Dynamic Table feature in Snowflake do?

- A) Automatically resizes the virtual warehouse based on query complexity
- B) Defines a table that automatically refreshes its results based on a target freshness and a query performing data transformations
- C) Creates a table that replicates in real time across cloud providers
- D) Manages automatic data archiving based on time-based rules
---
## Q119 (Multi Answer - Select 3)
Which THREE of the following are valid Snowflake data loading methods? (Choose three.)

- A) COPY INTO <table> command from staged files
- B) Snowpipe for continuous micro-batch loading as files arrive in a stage
- C) Direct SQL INSERT statements
- D) Real-time CDC (Change Data Capture) using JDBC streaming protocol
- E) Snowpipe Streaming for low-latency row-level data loading
---
## Q120 (Single Answer)
Which Snowflake feature allows you to query data stored in an external data lake (e.g., S3) as if it were inside Snowflake, without ingesting the data?

- A) Zero-copy cloning
- B) External table
- C) Materialized view
- D) Dynamic table
