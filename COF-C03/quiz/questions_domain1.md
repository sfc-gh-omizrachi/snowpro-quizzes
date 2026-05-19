# Domain 1: Snowflake AI Data Cloud Features & Architecture

---

## Q1 (Single Answer)
Which term best describes Snowflake's architecture?
- A) Pure shared-nothing architecture
- B) Pure shared-disk architecture
- C) Hybrid of shared-disk and shared-nothing architectures
- D) Peer-to-peer distributed architecture

---

## Q2 (Scenario)
A financial services company requires complete hardware isolation from all other Snowflake customers, including a dedicated metadata store and separate compute resources. Which Snowflake edition meets this requirement?
- A) Enterprise Edition
- B) Business Critical Edition
- C) Standard Edition
- D) Virtual Private Snowflake (VPS)

---

## Q3 (Multi Answer - Select 2)
Which TWO services are managed by the Cloud Services layer? (Select 2)
- A) Storing data in micro-partitions
- B) Authentication and access control
- C) Executing SQL using warehouse compute nodes
- D) Query parsing and optimization
- E) Compressing columnar data files

---

## Q4 (Single Answer)
What is the primary benefit of Snowflake's separation of storage and compute?
- A) Queries always run faster due to data co-location
- B) Storage and compute can scale independently
- C) Users must manage storage and compute infrastructure separately
- D) All data is replicated across every compute node

---

## Q5 (Scenario)
A retail company experiences variable query loads — light during the week but extremely heavy during weekend sales reporting. They need to minimize costs while ensuring performance. Which Snowflake capability best addresses this?
- A) Provisioning the largest warehouse size permanently
- B) Independent scaling of compute resources while storage remains unchanged
- C) Migrating data to a different cloud region on weekends
- D) Using the Cloud Services layer to buffer queries during peak times

---

## Q6 (Single Answer)
Which Snowflake architectural layer is responsible for infrastructure management, metadata management, and query optimization?
- A) Database Storage layer
- B) Compute layer
- C) Cloud Services layer
- D) Data Exchange layer

---

## Q7 (Multi Answer - Select 2)
Which TWO features require a minimum of Business Critical Edition? (Select 2)
- A) Multi-cluster virtual warehouses
- B) Tri-Secret Secure
- C) 90-day Time Travel
- D) Private connectivity to the Snowflake service
- E) Column-level security with masking policies

---

## Q8 (Single Answer)
How does Snowflake ensure resource isolation between virtual warehouses?
- A) Each warehouse shares a common pool of compute resources
- B) Each warehouse runs on its own independent compute cluster and does not compete with other warehouses
- C) Warehouses are time-sliced across the same physical nodes
- D) Resource isolation only applies to VPS edition

---

## Q9 (Scenario)
A data engineer notices that the Cloud Services layer charges have exceeded 10% of the daily compute credits. What is the likely cause?
- A) Too many large queries running on virtual warehouses
- B) Excessive data storage in internal stages
- C) A large number of metadata-intensive operations such as SHOW commands, small queries served from cache, or frequent logins
- D) Network latency between the compute and storage layers

---

## Q10 (Single Answer)
Which Snowflake edition is the minimum required to use materialized views?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q11 (Single Answer)
In Snowflake's architecture, where is data persistently stored?
- A) On local SSD disks attached to compute nodes
- B) In a centralized cloud storage layer managed by Snowflake
- C) On the Cloud Services layer alongside metadata
- D) In a distributed file system shared between compute clusters

---

## Q12 (Scenario)
A healthcare organization must comply with HIPAA regulations and needs Snowflake to support PHI data with enhanced security features including failover and replication. What is the minimum Snowflake edition they should select?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q13 (Single Answer)
Which statement about the Snowflake Compute layer is correct?
- A) Compute nodes persistently store data after query execution
- B) Virtual warehouses are MPP compute clusters that execute queries independently of each other
- C) All warehouses share a single cluster of compute nodes
- D) The Compute layer manages user authentication

---

## Q14 (Multi Answer - Select 2)
Which TWO features are available starting with Enterprise Edition but NOT in Standard Edition? (Select 2)
- A) Multi-cluster virtual warehouses
- B) Tri-Secret Secure
- C) Time Travel up to 90 days
- D) Private connectivity (AWS PrivateLink)
- E) Automatic encryption of all data

---

## Q15 (Single Answer)
What happens to the local cache on a virtual warehouse's compute nodes when the warehouse is suspended?
- A) The cache is persisted to cloud storage for later use
- B) The cache is transferred to the Cloud Services layer
- C) The cache is dropped and lost
- D) The cache remains available for 24 hours after suspension

---

## Q16 (Scenario)
A company is evaluating Snowflake editions. They need column-level security (masking policies), multi-cluster warehouses, and 90-day Time Travel, but do NOT need hardware isolation or HIPAA compliance. Which edition is the best fit?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q17 (Single Answer)
Which Snowflake layer handles the metadata cache that stores information about table row counts, min/max values per micro-partition, and other statistics?
- A) Compute layer
- B) Database Storage layer
- C) Cloud Services layer
- D) Network layer

---

## Q18 (Single Answer)
How many architectural layers does Snowflake have?
- A) Two: Compute and Storage
- B) Three: Cloud Services, Compute, and Database Storage
- C) Four: Cloud Services, Compute, Storage, and Network
- D) Five: Cloud Services, Compute, Storage, Network, and Security

---

## Q19 (Scenario)
An analytics team runs a simple COUNT(*) query on a large table and gets an instant result without the warehouse resuming. Which Snowflake feature explains this behavior?
- A) Query result cache
- B) Warehouse data cache
- C) Metadata cache in the Cloud Services layer
- D) Materialized view pre-computation

---

## Q20 (Multi Answer - Select 2)
Which TWO statements about Snowflake's Database Storage layer are correct? (Select 2)
- A) Data is stored in a columnar format within micro-partitions
- B) Data is stored on local disks attached to virtual warehouse nodes
- C) All data is automatically encrypted
- D) Users must manually partition data
- E) Data storage uses the same credits as compute

---

## Q21 (Single Answer)
Which Snowflake edition is the minimum required for database failover and replication?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q22 (Single Answer)
What is the role of the Query Optimizer in Snowflake?
- A) It resides in the Compute layer and executes queries
- B) It resides in the Cloud Services layer and generates efficient query execution plans
- C) It resides in the Storage layer and organizes data files
- D) It is a client-side component in the Snowflake driver

---

## Q23 (Scenario)
A startup wants to use Snowflake with the lowest cost edition. They do not need multi-cluster warehouses, extended Time Travel, or masking policies. Which edition should they choose?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q24 (Single Answer)
Which component is NOT part of the Cloud Services layer?
- A) Authentication and access control
- B) Infrastructure management
- C) Query execution using MPP clusters
- D) Metadata management

---

## Q25 (Single Answer)
In Snowflake, what is the relationship between storage costs and compute costs?
- A) They are billed together as a single charge
- B) They are billed separately — storage is based on data volume, compute is based on credits
- C) Storage is free; only compute is billed
- D) Compute is free; only storage is billed

---

## Q26 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's shared-disk architecture component? (Select 2)
- A) A central data repository accessible by all compute nodes
- B) Each compute node has its own private data store
- C) Data is persisted independently of compute resources
- D) Queries can only access data stored on local nodes
- E) Data must be manually distributed across nodes

---

## Q27 (Scenario)
A database administrator needs to determine which Snowflake edition supports both customer-managed encryption keys (Tri-Secret Secure) and private connectivity. Which edition should they recommend as the minimum?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q28 (Single Answer)
What happens if the Cloud Services layer charge exceeds 10% of the daily warehouse compute credit usage?
- A) All Cloud Services charges are waived
- B) Only the portion exceeding 10% is billed
- C) The full Cloud Services charge is billed
- D) Snowflake automatically reduces Cloud Services usage

---

## Q29 (Single Answer)
Which statement about Snowflake's multi-cluster architecture is TRUE?
- A) All editions support multi-cluster warehouses
- B) Multi-cluster warehouses are only available in VPS
- C) Multi-cluster warehouses add compute clusters to handle concurrency and are available in Enterprise Edition and above
- D) Multi-cluster warehouses replicate data across multiple storage nodes

---

## Q30 (Single Answer)
Which Snowflake layer is responsible for transaction management?
- A) Compute layer
- B) Database Storage layer
- C) Cloud Services layer
- D) Client application layer

---

## Q31 (Scenario)
An organization is migrating from an on-premises data warehouse. They want Snowflake to handle all infrastructure management, patching, and tuning. Which aspect of Snowflake's architecture ensures this?
- A) The Database Storage layer handles all infrastructure management
- B) Snowflake is a fully managed SaaS platform — the Cloud Services layer handles infrastructure management
- C) Users must still manage compute node patches
- D) Infrastructure management requires a separate DevOps contract

---

## Q32 (Single Answer)
Which Snowflake edition first introduces support for Search Optimization Service?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q33 (Multi Answer - Select 2)
Which TWO are responsibilities of the Compute layer in Snowflake? (Select 2)
- A) Executing SQL queries using virtual warehouses
- B) Managing user authentication
- C) Caching data locally on warehouse nodes during query execution
- D) Storing persistent data in micro-partitions
- E) Optimizing query execution plans

---

## Q34 (Single Answer)
What is the default auto-suspend time for a newly created virtual warehouse?
- A) 5 minutes
- B) 10 minutes
- C) 15 minutes
- D) Never (must be manually set)

---

## Q35 (Scenario)
A company runs Snowflake on AWS. They want to understand where their data at rest is stored. Where does Snowflake persist data?
- A) On Amazon EC2 instance local storage
- B) In Amazon S3, managed internally by Snowflake
- C) On dedicated Snowflake-owned hardware in AWS data centers
- D) In Amazon EBS volumes attached to virtual warehouse nodes

---

## Q36 (Single Answer)
What is Snowsight?
- A) A command-line tool for managing Snowflake
- B) Snowflake's web-based user interface for querying, visualizing, and managing Snowflake
- C) A third-party BI tool integrated with Snowflake
- D) A Python library for Snowflake connectivity

---

## Q37 (Scenario)
A data analyst wants to create quick visualizations — such as bar charts and dashboards — directly from SQL query results without using a third-party BI tool. Which Snowflake interface should they use?
- A) SnowSQL
- B) Snowsight
- C) Snowflake CLI (snow)
- D) VS Code with Snowflake extension

---

## Q38 (Single Answer)
Which Snowflake interface is a command-line client used for executing SQL statements, performing DDL/DML operations, and running scripts?
- A) Snowsight
- B) SnowSQL
- C) Snowpark
- D) Streamlit in Snowflake

---

## Q39 (Multi Answer - Select 2)
Which TWO capabilities are available in Snowsight but NOT in SnowSQL? (Select 2)
- A) Executing SQL queries
- B) Creating dashboards and visualizations
- C) Managing worksheets with filters and sharing
- D) Loading data via PUT commands
- E) Running DDL statements

---

## Q40 (Single Answer)
What is the Snowflake CLI (snow)?
- A) The legacy command-line interface for SQL execution
- B) An open-source command-line tool for managing Snowflake objects, Streamlit apps, and Snowpark projects
- C) A graphical desktop application for Snowflake
- D) A Python REPL for Snowpark development

---

## Q41 (Scenario)
A DevOps engineer wants to automate the deployment of Snowpark projects, manage Snowflake Native App packages, and create Streamlit apps — all from CI/CD pipelines. Which tool is best suited for this?
- A) SnowSQL
- B) Snowsight
- C) Snowflake CLI (snow)
- D) JDBC driver

---

## Q42 (Single Answer)
Which IDE has an official Snowflake extension for connecting to Snowflake, writing and running SQL, and browsing database objects?
- A) IntelliJ IDEA only
- B) Eclipse only
- C) Visual Studio Code
- D) Sublime Text

---

## Q43 (Single Answer)
In Snowsight, what is a worksheet?
- A) A saved dashboard configuration
- B) An interactive editor for writing and running SQL or Python code
- C) A data pipeline definition
- D) A file format specification

---

## Q44 (Scenario)
A team lead wants to share a set of SQL queries with team members so they can collaborate on analytics. Which Snowsight feature supports this?
- A) Data Marketplace
- B) Shared worksheets with folder organization
- C) Snowpipe configuration
- D) Resource monitors

---

## Q45 (Single Answer)
Which Snowflake tool would you use to perform a bulk data load from a local file system to an internal stage?
- A) Snowsight UI upload only
- B) PUT command via SnowSQL or the Snowflake JDBC/ODBC driver
- C) Snowflake CLI (snow) only
- D) REST API only

---

## Q46 (Multi Answer - Select 2)
Which TWO are valid methods for connecting to Snowflake programmatically? (Select 2)
- A) Snowflake JDBC driver
- B) FTP connection to Snowflake storage
- C) Snowflake Python connector
- D) Direct SSH to compute nodes
- E) Telnet to the Cloud Services layer

---

## Q47 (Single Answer)
What is the primary purpose of the Snowflake VS Code extension?
- A) To replace Snowsight entirely
- B) To allow developers to write SQL, browse objects, and interact with Snowflake directly from VS Code
- C) To deploy Snowflake infrastructure via Terraform
- D) To monitor warehouse credit usage

---

## Q48 (Scenario)
A data engineer prefers working in a terminal and needs to execute SQL scripts, use variables, and produce formatted output from Snowflake. Which tool is most appropriate?
- A) Snowsight
- B) SnowSQL
- C) Streamlit in Snowflake
- D) Snowflake Marketplace

---

## Q49 (Single Answer)
Which Snowflake interface allows users to view query history, query profiles, and performance metrics visually?
- A) SnowSQL
- B) Snowflake CLI
- C) Snowsight
- D) ODBC driver

---

## Q50 (Single Answer)
What file does the Snowflake CLI (snow) use for connection configuration?
- A) snowflake.conf
- B) connections.toml
- C) config.json
- D) snowflake.yml

---

## Q51 (Scenario)
A developer wants to test a Snowpark Python function locally before deploying it to Snowflake. Which approach is recommended?
- A) Run it only in Snowsight worksheets
- B) Use the Snowflake CLI with local testing capabilities and a local development environment
- C) Deploy directly to production and test there
- D) Use SnowSQL to run Python code

---

## Q52 (Multi Answer - Select 2)
Which TWO Snowsight features help with data exploration and administration? (Select 2)
- A) Activity section showing query history and warehouse usage
- B) Ability to execute JavaScript stored procedures
- C) Database object browser for navigating tables, views, and schemas
- D) Direct SSH access to compute nodes
- E) Built-in ETL pipeline designer

---

## Q53 (Single Answer)
What authentication method does Snowsight use by default when accessed via a web browser?
- A) Key-pair authentication only
- B) Username and password with optional MFA
- C) OAuth only
- D) SAML only

---

## Q54 (Single Answer)
Which statement about SnowSQL is correct?
- A) SnowSQL is only available on Windows
- B) SnowSQL is a cross-platform command-line client that supports Windows, macOS, and Linux
- C) SnowSQL is deprecated in favor of Snowsight
- D) SnowSQL can only run DDL statements, not DML

---

## Q55 (Scenario)
An administrator wants to set up automated Snowflake deployments using infrastructure-as-code principles. They need to manage connection profiles, deploy Snowpark functions, and manage Native App packages from the command line. Which Snowflake tool is designed for this workflow?
- A) SnowSQL
- B) Snowsight
- C) Snowflake CLI (snow)
- D) JDBC driver

---

## Q56 (Single Answer)
What is the highest level in the Snowflake object hierarchy?
- A) Database
- B) Account
- C) Organization
- D) Schema

---

## Q57 (Single Answer)
Which object in Snowflake contains databases, warehouses, users, and roles?
- A) Organization
- B) Account
- C) Schema
- D) Database

---

## Q58 (Scenario)
A multinational corporation has multiple Snowflake accounts across different cloud regions. They want a unified view to manage billing and enable replication between these accounts. What Snowflake object provides this capability?
- A) Database
- B) Account
- C) Organization
- D) Resource Monitor

---

## Q59 (Multi Answer - Select 2)
Which TWO objects exist at the account level (NOT inside a database)? (Select 2)
- A) Tables
- B) Virtual warehouses
- C) Views
- D) Users and roles
- E) Sequences

---

## Q60 (Single Answer)
What is the correct hierarchy of Snowflake objects from top to bottom?
- A) Organization → Account → Schema → Database
- B) Account → Organization → Database → Schema
- C) Organization → Account → Database → Schema
- D) Database → Schema → Account → Organization

---

## Q61 (Single Answer)
Which Snowflake object is a named location where data files can be stored for loading or unloading?
- A) File format
- B) Stage
- C) Pipe
- D) Stream

---

## Q62 (Single Answer)
What is the purpose of a Snowflake file format object?
- A) To define the physical storage layout of micro-partitions
- B) To describe the format of data files (e.g., CSV, JSON, Parquet) used in COPY operations
- C) To encrypt data files at rest
- D) To create views on external data

---

## Q63 (Scenario)
A data engineer needs to create a reusable definition for parsing semicolon-delimited CSV files with headers. Which Snowflake object should they create?
- A) Stage
- B) File format
- C) Stream
- D) Table

---

## Q64 (Multi Answer - Select 2)
Which TWO are database-level objects in Snowflake (contained within a database)? (Select 2)
- A) Virtual warehouses
- B) Schemas
- C) Users
- D) Shares
- E) Roles

---

## Q65 (Single Answer)
What is a Snowflake schema?
- A) A logical grouping of database objects such as tables, views, and stages
- B) A physical partition of storage
- C) A type of virtual warehouse
- D) A security policy applied to a database

---

## Q66 (Single Answer)
Which Snowflake object captures changes (inserts, updates, deletes) made to a table?
- A) Task
- B) Pipe
- C) Stream
- D) Sequence

---

## Q67 (Scenario)
A developer needs a counter that generates unique sequential numbers for use as surrogate keys in a table. Which Snowflake object should they use?
- A) Stream
- B) Sequence
- C) Task
- D) Pipe

---

## Q68 (Single Answer)
What is the purpose of a stored procedure in Snowflake?
- A) To create an external table
- B) To encapsulate procedural logic that can include SQL statements, branching, and looping
- C) To define the format of input data files
- D) To schedule queries automatically

---

## Q69 (Multi Answer - Select 2)
In which TWO programming languages can Snowflake stored procedures be written? (Select 2)
- A) JavaScript
- B) Ruby
- C) Python
- D) Perl
- E) R

---

## Q70 (Single Answer)
What is a User-Defined Function (UDF) in Snowflake?
- A) A function that can only be written in SQL
- B) A custom function that takes input arguments and returns a result, which can be used in SQL statements
- C) A type of stored procedure that returns multiple result sets
- D) A system function built into Snowflake

---

## Q71 (Scenario)
A data engineer needs to schedule a SQL statement to run every hour to refresh summary tables. Which Snowflake object should they use?
- A) Stream
- B) Pipe
- C) Task
- D) Stored procedure alone

---

## Q72 (Single Answer)
What is the purpose of a Snowflake Pipe object?
- A) To define a scheduled SQL statement
- B) To define a Snowpipe for continuous, automated data ingestion from a stage
- C) To capture data changes on a table
- D) To transfer data between warehouses

---

## Q73 (Multi Answer - Select 2)
Which TWO Snowflake objects work together to create a continuous data pipeline that detects new data and processes it on a schedule? (Select 2)
- A) Stream and Task
- B) Pipe and Sequence
- C) File format and Stage
- D) View and Stored procedure
- E) Dynamic table and Stream

---

## Q74 (Single Answer)
What is the purpose of the INFORMATION_SCHEMA in Snowflake?
- A) To store user-created tables
- B) To provide metadata about objects in a database (tables, views, columns, etc.) via system-defined views
- C) To manage warehouse configurations
- D) To store query history

---

## Q75 (Single Answer)
Which Snowflake function returns the current database being used in the session?
- A) CURRENT_WAREHOUSE()
- B) CURRENT_SCHEMA()
- C) CURRENT_DATABASE()
- D) CURRENT_ACCOUNT()

---

## Q76 (Scenario)
A developer runs a query but gets an error indicating no database is selected. They realize they forgot to set the session context. Which SQL command sets the active database for the session?
- A) SET DATABASE = 'my_db';
- B) USE DATABASE my_db;
- C) SELECT DATABASE('my_db');
- D) CONNECT TO my_db;

---

## Q77 (Multi Answer - Select 2)
Which TWO are valid session context functions in Snowflake? (Select 2)
- A) CURRENT_ROLE()
- B) CURRENT_CLOUD()
- C) CURRENT_WAREHOUSE()
- D) CURRENT_PARTITION()
- E) CURRENT_CLUSTER()

---

## Q78 (Single Answer)
In Snowflake's parameter hierarchy, what is the order of precedence from highest to lowest?
- A) Account → Session → Object
- B) Object → Session → Account
- C) Session → Object → Account
- D) Object → Account → Session

---

## Q79 (Single Answer)
If a parameter is set at the session level and also at the account level with a different value, which value takes effect for queries in that session?
- A) The account-level value
- B) The session-level value (it overrides account-level)
- C) An error occurs due to conflict
- D) The Snowflake default value

---

## Q80 (Scenario)
An administrator sets STATEMENT_TIMEOUT_IN_SECONDS to 3600 at the account level. A user sets it to 600 at the session level. What timeout applies to queries in that user's session?
- A) 3600 seconds (account-level always wins)
- B) 600 seconds (session-level overrides account-level)
- C) The Snowflake default of 172800 seconds
- D) The lower of the two values is always used

---

## Q81 (Single Answer)
Which Snowflake parameter level applies to individual objects like warehouses and databases?
- A) Account level
- B) Session level
- C) Object level
- D) Global level

---

## Q82 (Single Answer)
What are account identifiers used for in Snowflake?
- A) To encrypt data at rest
- B) To uniquely identify a Snowflake account for connections, URLs, and cross-account operations
- C) To set warehouse sizes
- D) To define access control policies

---

## Q83 (Multi Answer - Select 2)
Which TWO formats are valid Snowflake account identifiers? (Select 2)
- A) Organization name and account name (org_name-account_name)
- B) Account locator (e.g., xy12345)
- C) Database name and schema name
- D) Warehouse name and role name
- E) IP address of the Snowflake server

---

## Q84 (Single Answer)
What does the USE ROLE command do in Snowflake?
- A) Creates a new role
- B) Sets the active role for the current session
- C) Grants privileges to a role
- D) Drops an existing role

---

## Q85 (Scenario)
A developer queries INFORMATION_SCHEMA.TABLES but sees no results. Upon investigation, they realize they are querying the wrong database context. How should they fix this?
- A) Run SHOW TABLES without any database context
- B) Use the fully qualified name: SELECT * FROM my_db.INFORMATION_SCHEMA.TABLES
- C) Switch to the ACCOUNTADMIN role
- D) Restart the Snowflake session

---

## Q86 (Single Answer)
What distinguishes a share object in Snowflake from other database objects?
- A) A share is a type of virtual warehouse
- B) A share enables secure data sharing with other Snowflake accounts without copying data
- C) A share is a backup of a database
- D) A share is a type of stage for external data

---

## Q87 (Single Answer)
Which Snowflake object defines an application that can be installed in consumer accounts via the Snowflake Marketplace?
- A) Share
- B) Native App (Application)
- C) Stored procedure
- D) External function

---

## Q88 (Multi Answer - Select 2)
Which TWO objects are schema-level objects (contained within a schema)? (Select 2)
- A) Database
- B) Table
- C) Warehouse
- D) View
- E) User

---

## Q89 (Scenario)
A data engineer needs to determine how many rows are in all tables within a specific schema. Which approach uses the appropriate Snowflake metadata?
- A) Query INFORMATION_SCHEMA.TABLES for the schema and look at the ROW_COUNT column
- B) Run SHOW WAREHOUSES
- C) Query the ACCOUNT_USAGE.TABLES view for real-time row counts
- D) Use DESCRIBE SCHEMA to see row counts

---

## Q90 (Single Answer)
What is the purpose of the SNOWFLAKE shared database available in every Snowflake account?
- A) To store user data
- B) To provide account-level metadata, usage history, and reader account management through schemas like ACCOUNT_USAGE
- C) To serve as a template for new databases
- D) To manage virtual warehouse configurations

---

## Q91 (Single Answer)
What is the default type of virtual warehouse in Snowflake?
- A) Snowpark-optimized warehouse
- B) Standard warehouse
- C) Multi-cluster warehouse
- D) Serverless warehouse

---

## Q92 (Scenario)
A data science team runs memory-intensive Snowpark Python operations that require large amounts of local memory on compute nodes. Which warehouse type should they use?
- A) Standard warehouse
- B) Snowpark-optimized warehouse
- C) Multi-cluster warehouse
- D) X-Small warehouse

---

## Q93 (Single Answer)
What is the key difference between a Snowpark-optimized warehouse and a standard warehouse?
- A) Snowpark-optimized warehouses cost fewer credits per hour
- B) Snowpark-optimized warehouses provide more memory per node, suitable for memory-intensive operations
- C) Snowpark-optimized warehouses can only run Python code
- D) Standard warehouses cannot run Snowpark queries

---

## Q94 (Multi Answer - Select 2)
Which TWO scaling policies are available for multi-cluster warehouses? (Select 2)
- A) Standard scaling
- B) Aggressive scaling
- C) Economy scaling
- D) Conservative scaling
- E) Auto scaling

---

## Q95 (Single Answer)
What does the Standard scaling policy do for a multi-cluster warehouse?
- A) Starts additional clusters only when all existing clusters are fully loaded and there are queued queries
- B) Immediately starts additional clusters when the first query is queued
- C) Scales down aggressively by shutting down clusters after each query
- D) Prevents scaling beyond two clusters

---

## Q96 (Scenario)
A BI team experiences severe query queuing during peak morning hours when 200+ analysts run dashboards simultaneously. The warehouse is already at XL size. What should the administrator configure?
- A) Increase warehouse to 6X-Large
- B) Enable multi-cluster warehouse with auto-scale mode
- C) Create a separate database for each analyst
- D) Disable query result caching

---

## Q97 (Single Answer)
What does the Economy scaling policy prioritize for multi-cluster warehouses?
- A) Minimizing query latency by aggressively starting clusters
- B) Minimizing credit usage by keeping clusters running longer before starting new ones and shutting down idle clusters more aggressively
- C) Running all queries on a single cluster regardless of load
- D) Distributing data evenly across clusters

---

## Q98 (Single Answer)
What is the minimum and maximum number of clusters for a multi-cluster warehouse?
- A) Minimum 1, Maximum 5
- B) Minimum 1, Maximum 10
- C) Minimum 2, Maximum 10
- D) Minimum 1, Maximum 20

---

## Q99 (Scenario)
A data loading team runs large COPY INTO statements that process millions of rows. The queries are long-running but there is no concurrency issue. What is the best warehouse sizing strategy?
- A) Use a multi-cluster warehouse with many small clusters
- B) Use a larger single-cluster warehouse to scale up compute power for the individual queries
- C) Use a Snowpark-optimized warehouse
- D) Use the smallest warehouse possible to save credits

---

## Q100 (Multi Answer - Select 2)
Which TWO warehouse configuration best practices reduce unnecessary credit consumption? (Select 2)
- A) Setting auto-suspend to 0 (never suspend)
- B) Setting auto-suspend to a short timeout (e.g., 60 seconds) for development warehouses
- C) Enabling auto-resume so the warehouse starts automatically when queries are submitted
- D) Right-sizing the warehouse to the actual workload instead of over-provisioning
- E) Running all workloads on a single shared 4X-Large warehouse

---

## Q101 (Single Answer)
When should you scale UP a virtual warehouse (increase its size)?
- A) When query concurrency is the problem and queries are queuing
- B) When individual queries are running slowly due to complexity or data volume
- C) When the warehouse is idle most of the time
- D) When storage costs are too high

---

## Q102 (Single Answer)
When should you scale OUT a virtual warehouse (add clusters via multi-cluster)?
- A) When individual queries are too slow
- B) When too many concurrent queries are queuing
- C) When data needs to be redistributed across nodes
- D) When the warehouse needs more local cache

---

## Q103 (Scenario)
An organization has three teams — data engineering, data science, and BI reporting. Each team has different usage patterns and SLAs. What is the recommended warehouse strategy?
- A) Use a single large warehouse shared by all teams
- B) Create separate warehouses for each team to isolate workloads and manage costs independently
- C) Have all teams share one warehouse but schedule their work at different times
- D) Use resource monitors instead of separate warehouses

---

## Q104 (Single Answer)
What does the auto-resume setting on a virtual warehouse control?
- A) How quickly a warehouse increases in size
- B) Whether a suspended warehouse automatically resumes when a query is submitted
- C) The maximum number of clusters in a multi-cluster warehouse
- D) The timeout before a warehouse is dropped

---

## Q105 (Multi Answer - Select 2)
Which TWO factors determine the credit cost of running a virtual warehouse? (Select 2)
- A) The size of the warehouse (e.g., X-Small, Large, 4X-Large)
- B) The amount of data stored in the account
- C) The duration the warehouse is running
- D) The number of databases in the account
- E) The number of users who have access to the warehouse

---

## Q106 (Single Answer)
Which warehouse size consumes the fewest credits per hour?
- A) Small
- B) X-Small
- C) Medium
- D) Large

---

## Q107 (Scenario)
A warehouse is configured with auto-suspend set to 300 seconds (5 minutes) and auto-resume enabled. A user submits a query after the warehouse has been idle for 10 minutes. What happens?
- A) The query fails because the warehouse is suspended
- B) The warehouse automatically resumes, and the query executes after a brief startup delay
- C) The user must manually resume the warehouse first
- D) The query is routed to the Cloud Services layer instead

---

## Q108 (Single Answer)
What is the credit consumption of an X-Small warehouse per hour?
- A) 0.5 credits
- B) 1 credit
- C) 2 credits
- D) 4 credits

---

## Q109 (Single Answer)
How does doubling the warehouse size (e.g., from Small to Medium) affect credit consumption?
- A) Credits remain the same
- B) Credits per hour double
- C) Credits per hour triple
- D) Credits per hour increase by 50%

---

## Q110 (Scenario)
A data engineer creates a new warehouse and observes that queries run slowly. The Query Profile shows significant spilling to local and remote storage. What should they do?
- A) Add more clusters via multi-cluster scaling
- B) Increase the warehouse size to provide more memory and compute resources
- C) Decrease the warehouse size to save credits
- D) Disable result caching

---

## Q111 (Multi Answer - Select 2)
Which TWO are valid warehouse types in Snowflake? (Select 2)
- A) Standard
- B) Serverless
- C) Snowpark-optimized
- D) GPU-optimized
- E) Memory-only

---

## Q112 (Single Answer)
What is a key use case for Snowpark-optimized warehouses?
- A) Simple SQL queries on small datasets
- B) Machine learning model training and other memory-intensive Snowpark operations
- C) Data sharing across accounts
- D) Reducing storage costs

---

## Q113 (Single Answer)
What happens when all clusters in a multi-cluster warehouse are fully loaded and no more clusters can be added?
- A) Queries fail immediately
- B) Queries are queued until resources become available
- C) The warehouse automatically upgrades to a larger size
- D) Queries are routed to the Cloud Services layer

---

## Q114 (Scenario)
An administrator needs to set up a warehouse for a team that primarily runs short, interactive ad-hoc queries throughout the day. Which configuration is most appropriate?
- A) Large warehouse, auto-suspend 0 (never suspend), auto-resume disabled
- B) Medium warehouse, auto-suspend 60 seconds, auto-resume enabled
- C) 4X-Large warehouse, auto-suspend 3600 seconds, auto-resume disabled
- D) X-Small warehouse, auto-suspend 0, auto-resume enabled

---

## Q115 (Single Answer)
In the context of multi-cluster warehouses, what is the difference between Maximized and Auto-scale modes?
- A) Maximized starts with maximum clusters and never scales down; Auto-scale dynamically adjusts cluster count based on load
- B) Maximized runs on a single cluster; Auto-scale runs on multiple clusters
- C) There is no difference; they are the same mode
- D) Maximized uses Economy policy; Auto-scale uses Standard policy

---

## Q116 (Multi Answer - Select 2)
Which TWO statements about Snowflake warehouse billing are correct? (Select 2)
- A) Warehouses are billed per second with a 60-second minimum
- B) Warehouses are billed per hour with no minimum
- C) Credits are consumed only while a warehouse is running (not suspended)
- D) Suspended warehouses continue to consume credits at a reduced rate
- E) Credit charges include data storage costs

---

## Q117 (Single Answer)
What is the initial suspend behavior for a newly created virtual warehouse if no auto-suspend value is specified?
- A) It never suspends automatically
- B) It suspends after 600 seconds (10 minutes) of inactivity by default
- C) It suspends after 60 seconds of inactivity
- D) It suspends immediately after each query completes

---

## Q118 (Scenario)
A company wants to ensure their data warehouse costs are predictable. They decide to set up a notification when warehouse credit usage reaches a certain threshold. Which Snowflake feature should they use?
- A) Task
- B) Resource Monitor
- C) Stream
- D) Alert

---

## Q119 (Single Answer)
Which warehouse configuration parameter controls the maximum number of clusters in auto-scale mode?
- A) MAX_CONCURRENCY_LEVEL
- B) MAX_CLUSTER_COUNT
- C) SCALING_POLICY
- D) WAREHOUSE_SIZE

---

## Q120 (Single Answer)
What is a Gen 2 warehouse in Snowflake?
- A) A warehouse that uses legacy hardware
- B) A next-generation standard warehouse with improved price-performance for certain workload types
- C) A warehouse exclusive to VPS edition
- D) A warehouse that can only run Python code

---

## Q121 (Single Answer)
What is a micro-partition in Snowflake?
- A) A user-defined partition key on a table
- B) A contiguous unit of storage (50-500 MB of uncompressed data) that Snowflake automatically creates and manages
- C) A temporary buffer in the Compute layer
- D) A logical division of a database schema

---

## Q122 (Single Answer)
How does Snowflake organize data within micro-partitions?
- A) In a row-based format optimized for OLTP
- B) In a columnar format, which enables efficient compression and query pruning
- C) In a key-value pair format
- D) In a graph-based format

---

## Q123 (Scenario)
A data analyst runs a query that filters on a date column. Snowflake only scans 5% of the table's micro-partitions. What Snowflake feature made this possible?
- A) Query result caching
- B) Partition pruning based on micro-partition metadata (min/max values)
- C) Materialized view pre-computation
- D) Search Optimization Service

---

## Q124 (Multi Answer - Select 2)
Which TWO statements about Snowflake micro-partitions are correct? (Select 2)
- A) Users must manually define partition keys
- B) Micro-partitions are immutable — updates create new micro-partitions
- C) Each micro-partition contains 50 to 500 MB of uncompressed data
- D) Micro-partitions are stored in a row-based format
- E) Micro-partitions are not compressed

---

## Q125 (Single Answer)
What is data clustering in Snowflake?
- A) A manual process of reorganizing data across compute nodes
- B) The physical ordering of data within micro-partitions based on the values in specified columns
- C) A method of replicating data across regions
- D) A type of encryption applied to data at rest

---

## Q126 (Single Answer)
When is it beneficial to define a clustering key on a Snowflake table?
- A) On all tables regardless of size
- B) On very large tables (multi-terabyte) where queries frequently filter or join on specific columns
- C) On temporary tables only
- D) Only on external tables

---

## Q127 (Scenario)
A data engineer has a 10 TB table that is frequently queried with a WHERE clause on the ORDER_DATE column. Query performance has degraded over time due to data being inserted in random order. What should they do?
- A) Create an index on ORDER_DATE
- B) Define a clustering key on ORDER_DATE to improve data organization and pruning efficiency
- C) Convert the table to an external table
- D) Drop and recreate the table

---

## Q128 (Single Answer)
What type of Snowflake table persists until explicitly dropped, supports Time Travel and Fail-safe, and contributes to storage costs for both?
- A) Temporary table
- B) Transient table
- C) Permanent table
- D) External table

---

## Q129 (Multi Answer - Select 2)
Which TWO statements about temporary tables are correct? (Select 2)
- A) Temporary tables persist after the session ends
- B) Temporary tables exist only for the duration of the session in which they were created
- C) Temporary tables support Time Travel up to 1 day
- D) Temporary tables have a 7-day Fail-safe period
- E) Temporary tables are visible to other sessions

---

## Q130 (Single Answer)
What distinguishes a transient table from a permanent table?
- A) Transient tables do not support Time Travel
- B) Transient tables have no Fail-safe period, reducing storage costs
- C) Transient tables cannot be queried
- D) Transient tables are automatically dropped after 24 hours

---

## Q131 (Scenario)
A data engineer needs a staging table to hold intermediate ETL results. The data does not need Fail-safe protection and they want to minimize storage costs. Which table type is most appropriate?
- A) Permanent table
- B) Temporary table
- C) Transient table
- D) External table

---

## Q132 (Single Answer)
What is an Apache Iceberg table in Snowflake?
- A) A table stored exclusively in Snowflake's internal storage
- B) A table that uses the open-source Apache Iceberg format, enabling interoperability with other query engines
- C) A temporary table with extended Time Travel
- D) A table type exclusive to VPS edition

---

## Q133 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake-managed Apache Iceberg tables? (Select 2)
- A) Data is stored in Iceberg-compatible Parquet format in external cloud storage
- B) They cannot be queried using standard SQL
- C) Snowflake manages the Iceberg metadata catalog
- D) They do not support DML operations (INSERT, UPDATE, DELETE)
- E) They are only available on AWS

---

## Q134 (Single Answer)
What is an external table in Snowflake?
- A) A table whose data is stored in Snowflake's internal storage but is shared externally
- B) A read-only table that references data files in an external stage (e.g., S3, Azure Blob, GCS)
- C) A table that can be written to from external applications
- D) A table type that requires Business Critical Edition

---

## Q135 (Scenario)
A company wants to query data stored in their existing Amazon S3 data lake without loading it into Snowflake. Which table type should they use?
- A) Permanent table
- B) Transient table
- C) External table
- D) Temporary table

---

## Q136 (Single Answer)
What is a dynamic table in Snowflake?
- A) A table that automatically refreshes its contents based on a defined query, enabling declarative data pipelines
- B) A table that changes its schema dynamically
- C) A table that only exists during query execution
- D) A temporary table that persists across sessions

---

## Q137 (Single Answer)
What is the difference between a standard view and a secure view in Snowflake?
- A) Standard views encrypt data; secure views do not
- B) Secure views hide the view definition and optimize for data privacy, while standard views expose the definition to authorized users
- C) Standard views are faster than secure views in all cases
- D) Secure views can only be created by ACCOUNTADMIN

---

## Q138 (Multi Answer - Select 2)
Which TWO are characteristics of materialized views in Snowflake? (Select 2)
- A) They store pre-computed results and are automatically refreshed by Snowflake
- B) They require manual refresh via a command
- C) They can improve query performance for frequently run queries on large datasets
- D) They consume no additional storage
- E) They are available in Standard Edition

---

## Q139 (Scenario)
A reporting team runs the same complex aggregation query hundreds of times per day on a table that changes infrequently. Which view type would best improve performance?
- A) Standard view
- B) Secure view
- C) Materialized view
- D) External view

---

## Q140 (Single Answer)
Which view type should be used when sharing data with other accounts to prevent consumers from seeing the underlying view definition or accessing base tables?
- A) Standard view
- B) Materialized view
- C) Secure view
- D) Temporary view

---

## Q141 (Single Answer)
What is Snowflake Notebooks?
- A) A third-party Jupyter integration
- B) An interactive development environment within Snowsight for writing SQL, Python, and Markdown in a cell-based notebook interface
- C) A file storage system for documentation
- D) A data visualization tool only

---

## Q142 (Scenario)
A data scientist wants to explore data using SQL queries, run Python machine learning code, and document their analysis with rich text — all within the Snowflake platform. Which feature should they use?
- A) SnowSQL
- B) Snowflake Notebooks
- C) Streamlit in Snowflake
- D) Snowflake CLI

---

## Q143 (Single Answer)
What is Streamlit in Snowflake?
- A) A batch processing engine
- B) A feature that allows developers to build interactive data applications using Python directly within Snowflake
- C) A data loading utility
- D) A SQL query optimizer

---

## Q144 (Multi Answer - Select 2)
Which TWO are capabilities of Snowpark? (Select 2)
- A) Building data pipelines and transformations using Python, Java, or Scala DataFrames
- B) Designing the Snowsight web interface
- C) Running computations on Snowflake's compute layer without moving data out
- D) Managing Snowflake billing
- E) Replacing the Cloud Services layer

---

## Q145 (Single Answer)
What is Snowflake Cortex?
- A) A hardware component in Snowflake's infrastructure
- B) A suite of AI and machine learning capabilities that brings language models and ML functions directly into Snowflake
- C) A third-party AI platform integrated with Snowflake
- D) A data replication service

---

## Q146 (Scenario)
A business analyst wants to use natural language to ask questions about their data in Snowflake and receive SQL-generated answers. Which Snowflake Cortex feature should they use?
- A) Cortex Search
- B) Cortex Analyst
- C) Cortex Fine-Tuning
- D) Snowpark ML

---

## Q147 (Single Answer)
What does the Snowflake Cortex COMPLETE function do?
- A) Marks a task as completed
- B) Uses a large language model to generate text responses based on a prompt
- C) Completes missing values in a table via imputation
- D) Validates that a data pipeline has finished

---

## Q148 (Single Answer)
What is Cortex Search in Snowflake?
- A) A full-text search feature for querying structured data
- B) A service that enables semantic search and retrieval-augmented generation (RAG) over text data
- C) A replacement for the LIKE operator in SQL
- D) A tool for searching Snowflake Marketplace listings

---

## Q149 (Multi Answer - Select 2)
Which TWO are Snowflake Cortex AI SQL functions? (Select 2)
- A) CORTEX.COMPLETE
- B) CORTEX.EXECUTE
- C) CORTEX.SENTIMENT
- D) CORTEX.DEPLOY
- E) CORTEX.MIGRATE

---

## Q150 (Scenario)
A marketing team wants to analyze the sentiment of customer reviews stored in a Snowflake table without moving data to an external ML platform. Which feature should they use?
- A) Snowpark ML model training
- B) Snowflake Cortex SENTIMENT function
- C) External function calling an AWS Lambda
- D) Streamlit in Snowflake visualization

---

## Q151 (Single Answer)
What is Snowflake ML?
- A) A set of tools for deploying machine learning models outside Snowflake
- B) Snowflake's built-in machine learning capabilities including model development, feature engineering, and model management
- C) A third-party ML marketplace
- D) A data loading utility for ML datasets

---

## Q152 (Single Answer)
What is the primary advantage of running ML workloads using Snowpark and Snowflake ML rather than extracting data to an external platform?
- A) External platforms are always slower
- B) Data stays within Snowflake's governance and security perimeter, and compute runs on Snowflake's infrastructure
- C) Snowflake ML supports more algorithms than any other platform
- D) External platforms cannot connect to Snowflake

---

## Q153 (Scenario)
A developer wants to build a simple interactive web application that allows business users to filter data and view charts, hosted entirely within Snowflake. Which feature should they use?
- A) Snowflake Notebooks
- B) SnowSQL
- C) Streamlit in Snowflake
- D) Snowflake CLI

---

## Q154 (Single Answer)
In Snowflake Notebooks, which compute resource is used to execute Python cells?
- A) The Cloud Services layer
- B) A virtual warehouse attached to the notebook session
- C) The user's local machine
- D) A dedicated serverless endpoint

---

## Q155 (Multi Answer - Select 2)
Which TWO statements about Snowflake Cortex Analyst are correct? (Select 2)
- A) It allows users to ask questions in natural language and receive answers based on their Snowflake data
- B) It requires data to be exported to an external analytics platform
- C) It uses a semantic model to understand the structure and meaning of the data
- D) It can only work with data in CSV format
- E) It replaces the need for virtual warehouses
