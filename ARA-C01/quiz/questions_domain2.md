# Domain 2: Snowflake Architecture

---

## Q1 (Scenario)
A solutions architect is designing a data vault model in Snowflake for a large insurance company. The model must support full historical tracking of policy changes, flexible integration of new data sources, and auditability. Which combination of data vault components should form the core of the architecture?
- A) Fact tables, dimension tables, and bridge tables
- B) Hubs (business keys), Links (relationships), and Satellites (descriptive attributes with history)
- C) Staging tables, ODS tables, and reporting views
- D) Normalized tables with foreign key constraints enforced

---

## Q2 (Single Answer)
In Snowflake, what is the behavior of key constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE) by default?
- A) They are enforced and validated on all DML operations
- B) They are informational only — not enforced or validated by default
- C) PRIMARY KEY is enforced but FOREIGN KEY is not
- D) They are enforced only in Enterprise Edition and above

---

## Q3 (Scenario)
An architect is designing a data sharing solution where the provider account needs to share a curated subset of a large table with specific consumers. Each consumer should only see rows relevant to their organization. How should the architect implement this?
- A) Create separate physical copies of the table for each consumer
- B) Create a secure view with a row access policy or filter condition based on the consumer's account, and share the view
- C) Export filtered CSV files for each consumer
- D) Use replication to copy the full table to each consumer account

---

## Q4 (Multi Answer - Select 2)
Which TWO statements about star schema design in Snowflake are correct? (Select TWO)
- A) Snowflake's columnar storage and micro-partitioning naturally complement star schema query patterns
- B) Star schemas require enforced foreign key constraints to function correctly in Snowflake
- C) Fact tables in a star schema should be denormalized into a single wide table for best performance
- D) Dimension tables can be efficiently joined to fact tables using Snowflake's hash join optimizations
- E) Star schemas cannot be used with Snowflake's clustering keys

---

## Q5 (Scenario)
A retail company wants to make their product catalog data available on the Snowflake Marketplace for potential partners to discover and access. The data should be available to any Snowflake customer. Which type of listing should the architect create?
- A) A private listing shared with specific accounts only
- B) A public listing on the Snowflake Marketplace
- C) A Data Exchange limited to their organization
- D) A reader account with the catalog data

---

## Q6 (Single Answer)
What is the primary purpose of a Data Exchange in Snowflake?
- A) To replace the Snowflake Marketplace with a private alternative
- B) To provide a private, invitation-only group for sharing data among a defined set of accounts
- C) To exchange data between Snowflake and non-Snowflake systems
- D) To convert data formats between structured and semi-structured

---

## Q7 (Scenario)
An enterprise architect is implementing a data lake architecture in Snowflake with the following zones: Raw (landing), Curated (cleansed/transformed), and Consumption (business-ready). The architect needs to determine the object hierarchy. Which approach BEST organizes this architecture?
- A) One database with schemas for RAW, CURATED, and CONSUMPTION
- B) Separate databases for each zone (RAW_DB, CURATED_DB, CONSUMPTION_DB) with schemas per data domain
- C) A single schema with table prefixes (raw_, curated_, consumption_)
- D) Separate Snowflake accounts for each zone

---

## Q8 (Single Answer)
When sharing data across Snowflake accounts, which object types can be included in a share?
- A) Only tables
- B) Tables, secure views, secure UDFs, and secure materialized views
- C) Any database object including stored procedures and tasks
- D) Only external tables and stages

---

## Q9 (Multi Answer - Select 2)
Which TWO are benefits of using zero-copy cloning in Snowflake? (Select TWO)
- A) Cloned objects initially consume no additional storage
- B) Changes to the clone are automatically reflected in the source
- C) Cloning can be used to create instant development or test environments
- D) Cloned objects have independent encryption keys from the source
- E) Cloning requires the source object to be temporarily locked

---

## Q10 (Scenario)
An architect needs to set up a CI/CD pipeline for Snowflake database objects. The team uses Git for version control and wants automated deployments to development, staging, and production environments. Which approach provides the BEST CI/CD architecture?
- A) Manually run SQL scripts in each environment using SnowSQL
- B) Use Snowflake CLI with Git integration, defining database objects as code and deploying via CI/CD pipelines that promote changes through environments
- C) Export objects from development using SHOW commands and import them into production
- D) Use database replication to automatically promote changes from dev to prod

---

## Q11 (Single Answer)
What is the purpose of the ENABLE constraint property in Snowflake?
- A) It causes Snowflake to enforce the constraint on DML operations
- B) It indicates to the query optimizer that the constraint can be relied upon for query optimization
- C) It automatically creates an index for the constrained column
- D) It enables constraint validation during bulk loading

---

## Q12 (Scenario)
A healthcare organization needs to implement disaster recovery for their Snowflake deployment. The RPO requirement is 1 hour and the RTO is 4 hours. Data is stored in AWS US-East-1. Which DR strategy meets these requirements?
- A) Rely solely on Time Travel and Fail-safe within the same account
- B) Configure database replication to a secondary Snowflake account in a different AWS region with a replication schedule of less than 1 hour, and set up failover
- C) Back up data to S3 daily and restore when needed
- D) Use zero-copy cloning to create a backup in the same account

---

## Q13 (Single Answer)
In a data vault architecture implemented in Snowflake, what is the purpose of a Hub table?
- A) To store all descriptive attributes of a business entity
- B) To store unique business keys and a surrogate key representing a core business concept
- C) To capture the relationship between two or more business entities
- D) To store aggregated metrics for reporting

---

## Q14 (Multi Answer - Select 2)
Which TWO features enable Snowflake to support DevOps/DataOps practices? (Select TWO)
- A) Git integration for version controlling Snowflake objects
- B) Zero-copy cloning for creating isolated development environments
- C) Automatic code review of stored procedures
- D) Built-in load testing framework for warehouses
- E) Manual schema comparison tools

---

## Q15 (Scenario)
An architect is designing a data sharing solution for a financial services consortium. Multiple banks need to share transaction data for fraud detection, but no bank should see another bank's raw data. They should only see aggregated fraud patterns. Which architecture supports this?
- A) Standard data sharing where each bank shares its full transaction table
- B) A data clean room architecture with secure views, aggregate policies, and row access policies ensuring only aggregated results are returned
- C) Each bank exports data to a shared S3 bucket
- D) Use replication to copy all data to a central account

---

## Q16 (Single Answer)
What is the maximum Time Travel retention period available for permanent tables in Enterprise Edition or higher?
- A) 1 day
- B) 30 days
- C) 90 days
- D) 365 days

---

## Q17 (Scenario)
An architect is implementing a Snowflake-based ML pipeline. Data scientists need to train custom Python models on large datasets, using GPU compute and third-party libraries not available in Snowpark. Which Snowflake feature should the architect use?
- A) Snowflake ML Functions (built-in)
- B) Snowpark Container Services for running custom container workloads with GPU support
- C) External functions calling a self-managed ML API
- D) JavaScript UDFs for model training

---

## Q18 (Single Answer)
When configuring database replication, what happens to the secondary (replica) database in the consumer account?
- A) It is fully writable and can accept new data
- B) It is read-only until failover is initiated
- C) It automatically replaces the primary database after creation
- D) It is only accessible by ACCOUNTADMIN

---

## Q19 (Multi Answer - Select 2)
Which TWO aspects of a data vault architecture make it well-suited for Snowflake's architecture? (Select TWO)
- A) Insert-only pattern aligns with Snowflake's immutable micro-partitions
- B) Highly normalized structure requires enforced foreign keys, which Snowflake optimizes
- C) Parallel loading of hubs, links, and satellites leverages independent warehouse scaling
- D) Data vault requires materialized views, which Snowflake auto-maintains
- E) Data vault mandates the use of external tables for all source data

---

## Q20 (Scenario)
A global media company shares content metadata with advertising partners through Snowflake Marketplace. They want to offer both a free tier (basic metadata) and a paid tier (detailed analytics). How should the architect structure this?
- A) Create two separate Snowflake accounts — one for free data and one for paid
- B) Create two separate listings on the Marketplace — one free listing and one paid/personalized listing with different shared objects
- C) Share all data in one listing and use row access policies to restrict free-tier users
- D) Use external functions to check payment status before returning data

---

## Q21 (Single Answer)
What is the purpose of the RELY constraint property in Snowflake?
- A) It enforces the constraint on all INSERT/UPDATE operations
- B) It tells the optimizer to assume the constraint is true and use it for join elimination and other optimizations
- C) It creates a physical index on the constrained columns
- D) It enables foreign key validation during data loading

---

## Q22 (Scenario)
An architect needs to implement a rollback strategy for database deployments. A production deployment accidentally dropped a critical table 20 minutes ago. The table had a DATA_RETENTION_TIME_IN_DAYS of 1. How can the architect recover the table?
- A) Restore from Fail-safe by contacting Snowflake support
- B) Use UNDROP TABLE to recover the table from Time Travel
- C) Re-create the table from the most recent COPY INTO backup
- D) Use zero-copy cloning of the production database from before the drop

---

## Q23 (Single Answer)
In Snowflake's object hierarchy, which of the following is the correct nesting order?
- A) Account → Schema → Database → Table
- B) Account → Database → Schema → Table
- C) Organization → Database → Account → Table
- D) Database → Account → Schema → Table

---

## Q24 (Multi Answer - Select 2)
Which TWO characteristics define a Snowflake Data Exchange compared to the Snowflake Marketplace? (Select TWO)
- A) Data Exchanges are private, invitation-only groups
- B) Data Exchanges are publicly accessible to all Snowflake customers
- C) Data Exchange members can be both providers and consumers of data
- D) Data Exchanges require all data to be replicated to a central account
- E) Data Exchanges only support structured data formats

---

## Q25 (Scenario)
An architect is building a Streamlit application in Snowflake that allows business users to explore sales data interactively. The application needs to be deployed within Snowflake and accessible to users with appropriate roles. Which deployment approach should the architect use?
- A) Deploy the Streamlit app on an external cloud server and connect to Snowflake via JDBC
- B) Deploy the Streamlit app natively within Snowflake using Streamlit in Snowflake
- C) Create a Snowpark UDF that returns HTML content
- D) Use Snowflake's built-in dashboarding tool

---

## Q26 (Single Answer)
What is the Fail-safe retention period for permanent tables in Snowflake?
- A) 1 day
- B) 7 days
- C) 30 days
- D) 90 days

---

## Q27 (Scenario)
A data platform architect needs to design a schema structure that supports multiple teams (marketing, finance, engineering) each managing their own data within a shared analytics database. Teams should own their schemas but share common reference data. Which design is MOST appropriate?
- A) One schema per team (MARKETING, FINANCE, ENGINEERING) plus a SHARED schema for reference data, with appropriate RBAC for each schema
- B) A single ANALYTICS schema with all tables and row access policies per team
- C) Separate databases per team with no shared reference data
- D) A single schema with table naming conventions (mkt_, fin_, eng_) and no access control

---

## Q28 (Single Answer)
When performing Cross-Cloud Auto-Fulfillment for data sharing, who pays for the replication and storage costs?
- A) The consumer pays all replication and storage costs
- B) The provider pays for replication and storage to make the data available
- C) Snowflake absorbs all replication costs
- D) Costs are split equally between provider and consumer

---

## Q29 (Multi Answer - Select 2)
Which TWO are valid use cases for Snowflake's Native App Framework? (Select TWO)
- A) Packaging and distributing data applications with code and data to consumers
- B) Creating stored procedures that run on the consumer's warehouse
- C) Replacing all external ETL tools with a single Snowflake application
- D) Distributing machine learning models with accompanying data as installable applications
- E) Automating Snowflake account creation

---

## Q30 (Scenario)
An architect is planning the migration of a legacy Oracle data warehouse to Snowflake. The Oracle system has 500 tables with complex PL/SQL procedures. The architect needs to define the migration approach. Which strategy is MOST effective?
- A) Migrate all tables and PL/SQL procedures in a single big-bang migration
- B) Migrate iteratively: start with data migration (COPY INTO), convert PL/SQL to Snowflake SQL/Snowpark procedures, and validate incrementally
- C) Use the Oracle compatibility mode in Snowflake to run PL/SQL natively
- D) Keep PL/SQL procedures in Oracle and use external functions to call them from Snowflake

---

## Q31 (Single Answer)
What is the purpose of a stream in Snowflake?
- A) To compress data during loading
- B) To capture DML changes (inserts, updates, deletes) made to a table for change data capture (CDC)
- C) To provide real-time data streaming from external sources
- D) To create a continuous connection between two warehouses

---

## Q32 (Scenario)
A retail company needs to build a near real-time inventory dashboard. Inventory changes arrive as CDC events from the OLTP system. The architect needs to process these changes incrementally and update a dashboard-ready table. Which combination of Snowflake features is MOST appropriate?
- A) Scheduled COPY INTO commands with full table refreshes
- B) Streams on the landing table combined with tasks to process changes into a target table
- C) External functions calling the OLTP system for each dashboard query
- D) Materialized views that auto-refresh from the source

---

## Q33 (Single Answer)
What is the default behavior of a task in Snowflake when its stream has no new data?
- A) The task runs anyway, executing the SQL statement on empty results
- B) The task is skipped if the stream has no change data (SYSTEM$STREAM_HAS_DATA returns FALSE)
- C) The task generates an error because the stream is empty
- D) The task waits indefinitely until new data arrives in the stream

---

## Q34 (Multi Answer - Select 2)
Which TWO Snowflake features support AI/ML workflows natively? (Select TWO)
- A) Snowpark Container Services for custom ML model training and inference
- B) Cortex LLM functions for text processing and language tasks
- C) Automatic neural network training via CREATE MODEL command
- D) Built-in TensorFlow runtime in warehouses
- E) GPU-accelerated SQL query processing for all workloads

---

## Q35 (Scenario)
An architect needs to implement a data lakehouse pattern where historical raw data is stored as Parquet files in cloud storage, but analytics queries should run through Snowflake. The data is managed by an external catalog (AWS Glue). Which Snowflake feature provides the BEST integration?
- A) Use COPY INTO to import all Parquet data into native Snowflake tables
- B) Create Iceberg tables with an external catalog integration pointing to the Glue catalog
- C) Create external tables that reference the Parquet files on S3
- D) Use Snowpark DataFrames to read Parquet files directly

---

## Q36 (Single Answer)
What is the primary architectural benefit of Snowflake's separation of compute and storage?
- A) All data is cached in the compute layer for fastest possible access
- B) Storage and compute can be independently scaled, enabling cost optimization and workload isolation
- C) Data must be co-located with compute for queries to execute
- D) Compute resources are shared across all accounts for efficiency

---

## Q37 (Scenario)
An architect is designing a Snowflake deployment where the data engineering team and the analytics team both run heavy queries on the same data. The engineering team runs large batch ETL jobs overnight, while the analytics team runs ad-hoc queries during business hours. Both teams are experiencing performance issues. What is the BEST architectural solution?
- A) Increase the size of the shared warehouse
- B) Create separate virtual warehouses for each team — a larger warehouse for ETL and a multi-cluster warehouse for analytics
- C) Schedule all ETL jobs to run during business hours when analysts are also active
- D) Create a materialized view of all ETL output for analysts

---

## Q38 (Single Answer)
Which Snowflake table type does NOT have Fail-safe protection?
- A) Permanent table
- B) Transient table
- C) Temporary table
- D) Both B and C

---

## Q39 (Multi Answer - Select 2)
Which TWO scenarios are appropriate use cases for transient tables in Snowflake? (Select TWO)
- A) Staging tables that hold data temporarily during ETL processing
- B) Tables containing financial audit data requiring maximum data protection
- C) Development and testing tables where Fail-safe cost is unnecessary
- D) Production tables containing customer PII
- E) Tables that need 90-day Time Travel retention

---

## Q40 (Scenario)
An architect is implementing Snowflake Git integration for their data engineering team. The team wants to version control stored procedures, UDFs, and views using Git repositories. What does Snowflake Git integration provide?
- A) Automatic deployment of Git commits to Snowflake objects
- B) A Git repository stage that allows Snowflake to access files from a connected Git repository for code deployment
- C) Real-time synchronization of all Snowflake objects to Git
- D) Built-in Git client within Snowflake's web UI for editing code

---

## Q41 (Single Answer)
What is the maximum Time Travel retention for transient tables?
- A) 0 days (Time Travel not available)
- B) 1 day
- C) 14 days
- D) 90 days

---

## Q42 (Scenario)
A financial services firm needs to ensure that if their primary Snowflake account in AWS US-East-1 becomes unavailable, their critical reporting applications can failover to a secondary region within 15 minutes. Which feature should the architect configure?
- A) Time Travel to recover data from before the outage
- B) Database failover with replication groups, configuring the secondary account in a different region as a failover target
- C) Export all data nightly to S3 for manual recovery
- D) Zero-copy cloning of the database to a separate schema

---

## Q43 (Single Answer)
In Snowflake, what determines which warehouse is used to process a task?
- A) The warehouse specified in the task definition using the WAREHOUSE parameter
- B) The current user's default warehouse
- C) Snowflake automatically selects the optimal warehouse
- D) The warehouse that created the task

---

## Q44 (Multi Answer - Select 2)
Which TWO statements about Snowflake stored procedures are correct? (Select TWO)
- A) Stored procedures can be written in SQL, JavaScript, Python, Java, and Scala
- B) Stored procedures always execute with the caller's privileges by default
- C) Stored procedures can execute DDL and DML statements
- D) Stored procedures cannot call other stored procedures
- E) Stored procedures require Enterprise Edition

---

## Q45 (Scenario)
An architect is designing a medallion architecture (Bronze/Silver/Gold) in Snowflake. The Bronze layer receives raw data, Silver contains cleansed/conformed data, and Gold contains business-ready aggregations. The Silver layer should automatically update when Bronze data changes. Which feature is BEST for automating Bronze-to-Silver transformations?
- A) Manual scheduled stored procedures
- B) Dynamic tables that declaratively define the Silver layer as transformations of Bronze
- C) Materialized views on Bronze tables
- D) External functions that trigger on data changes

---

## Q46 (Single Answer)
When a database is replicated to a secondary account, what objects are included in the replication?
- A) Only tables and views
- B) Tables, views, schemas, stages, file formats, sequences, streams, tasks, stored procedures, UDFs, and other database-level objects
- C) Only tables with a replication tag
- D) Only the database schema structure without data

---

## Q47 (Scenario)
An architect needs to design a data sharing solution for a company that wants to monetize its weather data. The data should be available to any Snowflake customer for a subscription fee, with automatic fulfillment across regions. What is the BEST approach?
- A) Set up individual data shares with each customer manually
- B) Create a paid listing on the Snowflake Marketplace with Cross-Cloud Auto-Fulfillment enabled
- C) Provide an API endpoint for customers to query weather data
- D) Email data exports to subscribers monthly

---

## Q48 (Single Answer)
What happens to Time Travel data when a permanent table is converted to a transient table?
- A) Time Travel data is preserved up to the original retention period
- B) Time Travel retention is reduced to a maximum of 1 day, and existing Time Travel data beyond 1 day is lost
- C) Time Travel data is moved to Fail-safe
- D) No change occurs to Time Travel data

---

## Q49 (Multi Answer - Select 2)
Which TWO are requirements for configuring database failover in Snowflake? (Select TWO)
- A) A replication or failover group must be configured on the primary account
- B) The secondary account must be in the same cloud provider and region
- C) The secondary account must be enabled as a failover target
- D) Both accounts must use the same Snowflake edition
- E) A dedicated warehouse in the secondary account must be running at all times

---

## Q50 (Scenario)
An architect is evaluating whether to use Snowflake SQL stored procedures or Snowpark (Python) stored procedures for a complex data transformation pipeline that involves ML model scoring, REST API calls, and multi-step data processing. Which approach is MOST appropriate?
- A) SQL stored procedures for all components
- B) Snowpark Python stored procedures, which support ML libraries, external API calls (via external access integrations), and complex programming logic
- C) JavaScript stored procedures for better performance
- D) External functions for all processing to avoid Snowflake compute costs

---

## Q51 (Single Answer)
What is a replication group in Snowflake?
- A) A collection of warehouses that replicate queries across regions
- B) A defined set of objects in an account that are replicated together to one or more target accounts
- C) A group of users who have replication privileges
- D) A set of tasks that run replication jobs

---

## Q52 (Scenario)
A pharmaceutical company needs to share clinical trial data with research partners. Each partner should see only the trials they are participating in. The data must remain in the provider's account. How should the architect implement this?
- A) Create separate databases for each partner with copies of relevant data
- B) Create secure views filtered by partner identifier and include them in partner-specific shares
- C) Give each partner direct access to the provider's account with row access policies
- D) Export relevant data to secure FTP for each partner

---

## Q53 (Single Answer)
What is the purpose of a file format object in Snowflake?
- A) To define the physical storage format of Snowflake tables
- B) To define the format specifications (CSV, JSON, Parquet, etc.) used for loading and unloading data from stages
- C) To convert data between different file types within Snowflake
- D) To compress files before uploading to stages

---

## Q54 (Multi Answer - Select 2)
Which TWO capabilities does Snowpark Container Services provide? (Select TWO)
- A) Running custom Docker containers within the Snowflake ecosystem
- B) Replacing all virtual warehouses with container-based compute
- C) Deploying custom ML models and applications that access Snowflake data securely
- D) Automatically converting SQL queries to container workloads
- E) Running containers on customer-owned hardware

---

## Q55 (Scenario)
An architect is designing the data architecture for a new analytics platform. The business requires: (1) full audit trail of all data changes, (2) ability to add new source systems without restructuring the model, and (3) support for both operational and analytical queries. Which data modeling approach is MOST appropriate?
- A) Traditional third normal form (3NF) for operational queries and a separate star schema for analytics
- B) Data vault 2.0 for the integration layer with business vaults or star schemas for the presentation layer
- C) A single denormalized table for all data
- D) A star schema for both operational and analytical requirements

---

## Q56 (Single Answer)
When creating a share in Snowflake, can you include objects from multiple databases?
- A) Yes, a share can include objects from any number of databases
- B) No, a share can only include objects from a single database
- C) Yes, but only if the databases are in the same schema
- D) Yes, but only tables can span multiple databases

---

## Q57 (Scenario)
An architect at a logistics company is designing a real-time tracking dashboard. GPS data arrives continuously from 10,000 vehicles. The data needs to be queryable in Snowflake within seconds of arrival. Which ingestion architecture should the architect implement?
- A) COPY INTO with a scheduled task running every minute
- B) Snowpipe Streaming via the Snowflake Ingest SDK for sub-second data availability
- C) Bulk loading via PUT/COPY every hour
- D) External tables pointing to continuously updated S3 files

---

## Q58 (Single Answer)
What is the difference between a standard view and a materialized view in Snowflake?
- A) Standard views store results physically while materialized views are computed at query time
- B) Materialized views pre-compute and store results, auto-refreshing when base data changes, while standard views execute their definition at query time
- C) There is no functional difference — they are aliases for the same feature
- D) Materialized views can reference multiple databases while standard views cannot

---

## Q59 (Multi Answer - Select 2)
Which TWO are limitations of materialized views in Snowflake? (Select TWO)
- A) A materialized view can only reference a single base table
- B) Materialized views cannot be used with streams
- C) Materialized views incur ongoing maintenance costs for auto-refresh compute
- D) Materialized views support all SQL features including subqueries and UDFs
- E) Materialized views automatically replace the underlying table

---

## Q60 (Scenario)
An enterprise architect needs to enable data scientists to experiment with custom Python and R packages in Snowflake. The scientists need full control over their runtime environment, including specific package versions and custom dependencies. Which Snowflake feature provides this capability?
- A) Snowpark UDFs with Anaconda channel packages
- B) Snowpark Container Services with custom Docker images containing the required runtime
- C) JavaScript UDFs with embedded Python calls
- D) External functions routing to a self-managed Kubernetes cluster

---

## Q61 (Single Answer)
In a data vault model, what does a Link table represent?
- A) Descriptive attributes of a business entity
- B) The relationship or association between two or more Hub (business key) entities
- C) Historical snapshots of dimension data
- D) Aggregated metrics from transaction data

---

## Q62 (Scenario)
An architect is designing a multi-tenant SaaS application using Snowflake. Each tenant's data is stored in the same database. The architect needs to ensure that the application can scale reads for tenant-facing dashboards during peak hours. Which warehouse strategy is MOST appropriate?
- A) A single XL warehouse shared by all tenants
- B) One dedicated warehouse per tenant
- C) A multi-cluster warehouse with auto-scaling mode that scales out during peak demand
- D) Use serverless tasks instead of warehouses for all queries

---

## Q63 (Single Answer)
What is the purpose of the VALIDATE constraint property in Snowflake?
- A) It validates that existing data in the table conforms to the constraint
- B) It enables real-time constraint validation on INSERT/UPDATE operations
- C) It is not supported in Snowflake — constraints are never validated
- D) It validates constraints only during COPY INTO operations

---

## Q64 (Multi Answer - Select 2)
Which TWO types of objects can be included in a replication group for cross-account replication? (Select TWO)
- A) Databases with all their contained objects
- B) Individual tables within a database
- C) Account-level objects like users, roles, and warehouses
- D) Network policies (as part of account replication)
- E) Snowflake Marketplace listings

---

## Q65 (Scenario)
An architect is tasked with building an AI-powered chatbot that answers questions about company data stored in Snowflake. The chatbot should use natural language processing to generate SQL queries and return results. Which Snowflake feature is MOST appropriate?
- A) Snowpark Container Services running a custom NLP model
- B) Cortex LLM functions (e.g., COMPLETE) for natural language processing, potentially combined with Snowflake Cortex Search or Cortex Analyst
- C) External functions calling OpenAI's API
- D) JavaScript UDFs that parse natural language

---

## Q66 (Single Answer)
What is the primary cost difference between permanent and transient tables in Snowflake?
- A) Transient tables have higher storage costs due to compression overhead
- B) Transient tables have lower storage costs because they do not have Fail-safe, eliminating up to 7 days of additional storage
- C) Permanent tables always cost more because they use larger micro-partitions
- D) There is no cost difference between permanent and transient tables

---

## Q67 (Scenario)
A media company uses Snowflake and wants to share viewer analytics with content studios. Studios are both Snowflake and non-Snowflake customers. The architect needs to support both audiences. Which combination of approaches should be used?
- A) Snowflake data sharing for Snowflake customers and reader accounts for non-Snowflake customers
- B) Export all data to S3 and provide access links to all parties
- C) Create a public API for all data access
- D) Require all studios to create Snowflake accounts before accessing data

---

## Q68 (Single Answer)
When a database with streams is replicated to a secondary account, what happens to the streams?
- A) Streams are replicated but resume CDC tracking from the point of replication
- B) Streams are not replicated — they must be recreated on the secondary
- C) Streams continue to track changes from the original primary's offset
- D) Streams are converted to views on the secondary

---

## Q69 (Multi Answer - Select 2)
Which TWO characteristics differentiate dynamic tables from materialized views in Snowflake? (Select TWO)
- A) Dynamic tables support complex transformations including joins across multiple tables
- B) Dynamic tables can only be used with external tables
- C) Dynamic tables use a declarative target lag to control refresh frequency
- D) Dynamic tables are always refreshed synchronously with base table changes
- E) Dynamic tables consume no additional storage

---

## Q70 (Scenario)
A solutions architect is designing a data pipeline that ingests data from multiple source systems. Some sources provide data in CSV format via SFTP, others push data via Kafka, and some provide data through REST APIs. How should the architect design the ingestion layer in Snowflake?
- A) Use a single COPY INTO command for all sources
- B) Use Snowpipe for SFTP/S3 file ingestion, Snowflake Kafka connector for Kafka sources, and external functions or Snowpark for REST API ingestion
- C) Use external tables for all sources
- D) Build custom Python scripts outside Snowflake for all ingestion

---

## Q71 (Single Answer)
What is the purpose of the Snowflake Native App Framework?
- A) To create mobile applications that connect to Snowflake
- B) To package and distribute data products (code + data) as installable applications that run within the consumer's Snowflake account
- C) To replace Snowflake's web UI with a custom interface
- D) To create external APIs for Snowflake data

---

## Q72 (Scenario)
An architect is designing a star schema in Snowflake for a retail analytics use case. The fact table SALES has 10 billion rows and is joined with dimension tables PRODUCT (1M rows), STORE (10K rows), and TIME (365K rows). The most common query pattern joins SALES with all three dimensions and filters by date range. What optimization should the architect prioritize?
- A) Add foreign key constraints between fact and dimension tables
- B) Define a clustering key on the SALES table using the date column to optimize partition pruning for date-range filters
- C) Create a materialized view of all possible join combinations
- D) Denormalize all dimensions into the fact table

---

## Q73 (Single Answer)
Which Snowflake feature allows creating a point-in-time snapshot of a database for development purposes without additional storage cost?
- A) Database replication
- B) Zero-copy cloning
- C) Time Travel SELECT AT
- D) Data sharing

---

## Q74 (Multi Answer - Select 2)
Which TWO are advantages of using the Snowflake SQL API for programmatic access? (Select TWO)
- A) It provides a RESTful interface for submitting SQL statements and retrieving results
- B) It requires a persistent network connection like JDBC/ODBC
- C) It supports asynchronous query execution with status polling
- D) It can only execute SELECT statements
- E) It is only available in Business Critical Edition

---

## Q75 (Scenario)
An architect is building an ELT pipeline where raw data lands in Snowflake and is then transformed through multiple stages. The transformation involves: (1) deduplication, (2) data type standardization, (3) business rule application, and (4) aggregation. What is the MOST maintainable architecture for this pipeline?
- A) A single stored procedure that performs all four steps
- B) A DAG (directed acyclic graph) of tasks, each step implemented as a separate task with dependencies, potentially using dynamic tables for declarative transformations
- C) Four separate scheduled stored procedures with no dependency management
- D) A single MERGE statement that handles all transformations

---

## Q76 (Single Answer)
What is the role of a Satellite table in a data vault architecture?
- A) To store business keys and surrogate keys
- B) To store descriptive attributes and historical changes for a Hub or Link, with full change tracking
- C) To aggregate data for reporting purposes
- D) To define relationships between business entities

---

## Q77 (Scenario)
A data architect needs to implement a rollback mechanism for a Snowflake production environment. If a deployment introduces a bug in a stored procedure, the team needs to quickly revert to the previous version. Which approach provides the BEST rollback capability?
- A) Rely on Time Travel to undo all changes
- B) Use Git integration to version control stored procedures and redeploy the previous version from the Git repository
- C) Keep manual backups of all stored procedure code in a wiki
- D) Create a zero-copy clone of the entire database before each deployment

---

## Q78 (Single Answer)
When a consumer creates a database from a share, what type of database is created?
- A) A standard database with full ownership
- B) A read-only imported database that references the provider's data
- C) A writable database that syncs changes back to the provider
- D) A transient database that expires after 30 days

---

## Q79 (Multi Answer - Select 2)
Which TWO are best practices for designing virtual warehouse configurations in a multi-workload Snowflake environment? (Select TWO)
- A) Use separate warehouses for different workload types (ETL, BI, ad-hoc) to ensure isolation
- B) Use a single large warehouse for all workloads to maximize cache utilization
- C) Right-size warehouses based on workload characteristics rather than defaulting to the largest size
- D) Keep all warehouses running 24/7 to minimize resume latency
- E) Assign all users to the same warehouse for simplified management

---

## Q80 (Scenario)
An architect is designing an architecture where Snowflake serves as the central analytics platform, but some data resides in external systems (S3, Azure Blob). The architect wants to query this external data alongside native Snowflake data without ingesting it. Which approach supports this?
- A) Database replication from external systems
- B) External tables that reference data in cloud storage, allowing SQL queries to join external and native data
- C) Snowflake Marketplace listings from external providers
- D) COPY INTO to import all external data

---

## Q81 (Single Answer)
What is the primary purpose of a UDF (User-Defined Function) versus a stored procedure in Snowflake?
- A) UDFs can only be written in SQL while procedures support multiple languages
- B) UDFs return a scalar value or table and can be used in SQL expressions, while stored procedures perform procedural logic and can execute DDL/DML but cannot be used in SQL expressions
- C) Stored procedures are faster than UDFs in all cases
- D) UDFs and stored procedures are functionally identical

---

## Q82 (Scenario)
An architect is implementing a data lakehouse architecture using Snowflake Iceberg tables. The company has existing data in Apache Iceberg format managed by Spark. They want Snowflake to read and write to these same Iceberg tables. Which Iceberg table configuration should the architect use?
- A) Snowflake-managed Iceberg tables that convert data from Apache Iceberg format
- B) Externally managed Iceberg tables with a catalog integration (e.g., AWS Glue) for reads, and Snowflake-managed Iceberg tables for writes
- C) External tables pointing to Iceberg metadata files
- D) Native Snowflake tables with Parquet file format exports

---

## Q83 (Single Answer)
What is the maximum number of consumer accounts that can be added to a single Snowflake share?
- A) 10
- B) 100
- C) There is no fixed limit — shares can be granted to many consumer accounts
- D) 1 consumer per share

---

## Q84 (Multi Answer - Select 2)
Which TWO statements about Snowflake tasks are correct? (Select TWO)
- A) Tasks can be organized in a tree structure (DAG) with parent-child dependencies
- B) Tasks can only execute SQL statements, not stored procedures
- C) Tasks can be triggered on a CRON schedule or at a fixed interval
- D) Tasks automatically create their own warehouse for execution
- E) Only ACCOUNTADMIN can create tasks

---

## Q85 (Scenario)
An architect is designing a data mesh architecture where each domain team (Sales, Marketing, Supply Chain) owns and publishes their data products. Other teams should be able to discover and consume these products. How should this be architectured in Snowflake?
- A) Each team publishes data through Snowflake data shares or listings, with a centralized Data Exchange for discoverability
- B) All data is stored in a single central database managed by a central team
- C) Each team exports their data to shared cloud storage
- D) Teams email data extracts to consumers

---

## Q86 (Single Answer)
What happens during a database failover in Snowflake?
- A) The primary database is automatically deleted
- B) The secondary (replica) database is promoted to primary, becoming writable, and the original primary becomes a secondary
- C) Both databases become writable simultaneously
- D) The secondary database creates a copy of the primary

---

## Q87 (Scenario)
An architect needs to design a Snowflake environment for a company that has strict requirements around data sovereignty. Customer data for EU customers must stay in the EU, and US customer data must stay in the US. However, global executives need a unified view of all customers. How should this be architectured?
- A) Store all data in a single US account and use row access policies for EU compliance
- B) Create separate Snowflake accounts in EU and US regions for regional data, and use data sharing or replication to create aggregated/anonymized views in a global account for executives
- C) Store all data in an EU account since GDPR is more restrictive
- D) Use a single VPS account that spans multiple regions

---

## Q88 (Single Answer)
What is the purpose of the SYSTEM$ALLOWLIST function in Snowflake?
- A) To list all allowed IP addresses in network policies
- B) To return the list of Snowflake hosts and ports that need to be allowed through firewalls for connectivity
- C) To list all allowed roles for a specific user
- D) To show allowed file formats for data loading

---

## Q89 (Multi Answer - Select 2)
Which TWO characteristics describe how Snowflake handles semi-structured data in VARIANT columns? (Select TWO)
- A) VARIANT data is stored in a columnar format with automatic type inference and column extraction
- B) VARIANT data is stored as raw text strings with no optimization
- C) Snowflake can push down predicates into VARIANT columns for efficient querying
- D) VARIANT columns have a maximum size of 1 MB per value
- E) VARIANT data cannot be used in JOIN conditions

---

## Q90 (Scenario)
An architect is planning a CI/CD strategy for Snowflake where infrastructure changes (databases, schemas, warehouses) and code changes (procedures, UDFs) are deployed through separate pipelines. Which combination of tools supports this pattern?
- A) Manual SQL execution for all changes
- B) Snowflake CLI for infrastructure provisioning (declarative object management) and Git integration with tasks for code deployment
- C) Only Terraform for all Snowflake changes
- D) Using COPY INTO for deploying code changes

---

## Q91 (Single Answer)
Which Snowflake feature enables running a SQL statement or calling a stored procedure on a recurring schedule?
- A) Streams
- B) Tasks
- C) Pipes
- D) Alerts

---

## Q92 (Scenario)
A data platform architect is designing the development lifecycle for a Snowflake-based data warehouse. The team needs isolated environments for development, and they want to avoid the cost of maintaining full copies of production data for development purposes. Which approach is MOST cost-effective?
- A) Maintain separate production-sized development accounts with full data copies
- B) Use zero-copy cloning to create development databases from production, providing full-fidelity environments at minimal initial storage cost
- C) Use only a subset of production data by manually exporting and importing
- D) Share production data directly with development users using RBAC

---

## Q93 (Single Answer)
What is the scope of a temporary table in Snowflake?
- A) It persists until explicitly dropped
- B) It exists only for the duration of the session that created it and is automatically dropped at session end
- C) It is visible to all users in the account
- D) It persists for 24 hours after creation

---

## Q94 (Multi Answer - Select 2)
Which TWO Snowflake features enable working with AI/ML models trained outside Snowflake? (Select TWO)
- A) Snowpark ML model registry for deploying and managing models
- B) External functions that call externally hosted model endpoints
- C) Snowflake's built-in neural network training service
- D) Automatic model optimization via AUTO_ML parameter
- E) SQL-only model inference without any external integration

---

## Q95 (Scenario)
An architect is designing a solution for a company that needs to replicate not just databases but also roles, grants, warehouses, and network policies to a disaster recovery account. Which approach provides comprehensive replication?
- A) Use database replication for data and manually recreate other objects
- B) Use replication groups or failover groups that include databases and account-level objects (users, roles, warehouses, network policies)
- C) Export all object DDL using GET_DDL and re-execute in the DR account
- D) Use zero-copy cloning across accounts

---

## Q96 (Single Answer)
What is the benefit of the NOORDER option for Snowflake sequences?
- A) It generates sequence values in strict ascending order
- B) It allows Snowflake to generate sequence values without guaranteeing order, improving performance for parallel inserts
- C) It generates random values instead of sequential ones
- D) It removes the sequence from the table

---

## Q97 (Scenario)
An architect at a telecommunications company is building a pipeline to process 5 million call detail records (CDRs) per hour. The data arrives in JSON format via Kafka. The pipeline must parse, transform, and load data with minimal latency. Which architecture should be used?
- A) Batch load JSON files every hour using COPY INTO
- B) Use the Snowflake Kafka connector to continuously ingest data, landing in a raw table, with streams and tasks processing transformations incrementally
- C) Use external functions to parse each JSON record individually
- D) Store all raw JSON in an external stage and use external tables

---

## Q98 (Single Answer)
What is the purpose of the CHANGES clause in a SELECT statement in Snowflake?
- A) To show structural changes to the table schema
- B) To query the change tracking data (similar to stream data) from a table at a specified time range or offset
- C) To modify the table during a SELECT operation
- D) To display warehouse configuration changes

---

## Q99 (Multi Answer - Select 2)
Which TWO are advantages of using Snowflake-managed Iceberg tables compared to external tables? (Select TWO)
- A) Snowflake handles compaction, optimization, and metadata management
- B) Data is stored in open Apache Iceberg format accessible by other engines
- C) External tables provide better query performance than Iceberg tables
- D) Iceberg tables require no storage integration
- E) External tables support ACID transactions while Iceberg tables do not

---

## Q100 (Scenario)
An architect needs to design a data sharing architecture for a health insurance company sharing claims data with provider networks. The provider networks are in different Snowflake regions, and some data includes PHI that must remain in the original region. How should this be architected?
- A) Share all data including PHI across regions using standard data sharing
- B) Share non-PHI data using Cross-Cloud Auto-Fulfillment across regions, and provide access to PHI data only through a secure application within the originating region
- C) Replicate all data including PHI to every consumer region
- D) Use external file sharing for all data distribution

---

## Q101 (Single Answer)
What is the relationship between tasks and streams in Snowflake?
- A) Tasks automatically create streams when they run
- B) Tasks can reference streams to conditionally execute only when new change data is available
- C) Streams replace the need for tasks in data pipelines
- D) Tasks and streams cannot be used together

---

## Q102 (Scenario)
A retail company stores product images and documents in cloud storage. An architect needs to design a solution where Snowflake processes the metadata from these files (extracted by an AI model) alongside structured sales data. Which architecture supports this?
- A) Store images directly in VARIANT columns in Snowflake tables
- B) Use Snowpark Container Services to run an AI model that processes images, stores metadata in Snowflake tables, and joins with sales data using standard SQL
- C) Use external functions only, with no data stored in Snowflake
- D) Convert all images to JSON before loading into Snowflake

---

## Q103 (Single Answer)
When implementing data vault 2.0 in Snowflake, what is a Business Vault?
- A) A Hub table that stores encrypted business keys
- B) A layer built on top of the Raw Vault that applies business rules and calculations, not considered a system of record
- C) The raw data landing area before vault loading
- D) A specialized Link table for business relationships

---

## Q104 (Multi Answer - Select 2)
Which TWO Snowflake connectors/drivers are purpose-built for specific integration scenarios? (Select TWO)
- A) Snowflake Kafka connector for streaming data ingestion from Apache Kafka
- B) Snowflake JDBC driver for connecting any application that supports JDBC
- C) Snowflake Spark connector for reading/writing data between Spark and Snowflake
- D) Snowflake REST connector for all web-based applications
- E) Snowflake XML driver for processing XML files

---

## Q105 (Scenario)
An architect is implementing a data sharing solution where multiple departments act as both providers and consumers. The marketing department shares campaign data, finance shares budget data, and operations shares supply chain data. All departments need to combine these datasets for cross-functional analysis. Which architecture is MOST efficient?
- A) Create pair-wise data shares between every two departments
- B) Create a centralized analytics database that imports all shares, enabling cross-functional queries in one place
- C) Replicate all departmental databases into every other department's environment
- D) Export all data to a shared file system

---

## Q106 (Single Answer)
Which Snowflake feature provides serverless compute for running SQL statements on a schedule without requiring a user-managed warehouse?
- A) Serverless tasks (tasks without a WAREHOUSE parameter)
- B) External functions
- C) Snowpipe
- D) Multi-cluster warehouses

---

## Q107 (Scenario)
An architect needs to migrate a complex ETL workflow currently running on Apache Airflow with Python transformations. The team wants to reduce infrastructure management while keeping Python-based transformations. Which Snowflake migration path is MOST appropriate?
- A) Re-write all transformations in SQL stored procedures
- B) Migrate Python transformations to Snowpark Python stored procedures and orchestrate with Snowflake tasks (or continue using Airflow as an orchestrator with Snowpark)
- C) Continue running all transformations on external infrastructure with external functions
- D) Use JavaScript UDFs to replicate Python logic

---

## Q108 (Single Answer)
What is the primary benefit of using UDTFs (User-Defined Table Functions) compared to scalar UDFs?
- A) UDTFs are faster than scalar UDFs
- B) UDTFs can return multiple rows and columns (a table), enabling operations like data generation, unpivoting, and complex transformations that produce variable-length output
- C) UDTFs can execute DDL statements
- D) UDTFs do not require a warehouse to execute

---

## Q109 (Multi Answer - Select 2)
Which TWO are valid approaches for deploying Snowflake objects through CI/CD pipelines? (Select TWO)
- A) Using Snowflake CLI (snow) to deploy objects from version-controlled definitions
- B) Using Terraform with the Snowflake provider to manage infrastructure as code
- C) Using SHOW commands to export object definitions and email them
- D) Manually running SQL scripts through the web UI
- E) Using database replication as the primary deployment mechanism

---

## Q110 (Scenario)
An architect needs to design a data pipeline that processes change data capture (CDC) from an upstream OLTP database. The CDC events include inserts, updates, and deletes. The target is a slowly changing dimension (SCD Type 2) table in Snowflake. Which approach is BEST?
- A) Full table refresh on every CDC batch
- B) Use streams to capture changes from the landing table, then use a MERGE statement in a task to apply SCD Type 2 logic (close old records and insert new ones)
- C) Use DELETE and INSERT for each change event individually
- D) Rely on Time Travel to track historical changes

---

## Q111 (Single Answer)
What happens when you clone a database that contains shares?
- A) The shares are cloned with all their consumers
- B) Shares are not cloned — the cloned database does not include any share definitions
- C) The cloned database automatically becomes a share consumer
- D) Shares are cloned but must be re-activated

---

## Q112 (Scenario)
A solutions architect is designing a Snowflake implementation for a company that uses data products extensively. The company wants to publish internal data products that other teams can subscribe to, with data contracts defining schema, quality, and SLAs. Which Snowflake capabilities support this data product paradigm?
- A) Standard tables with RBAC only
- B) Listings (private or Marketplace), secure data sharing with secure views, dynamic tables for maintaining SLAs, and data quality monitoring
- C) External functions that serve data on demand
- D) Replication groups as the sole mechanism for data products

---

## Q113 (Single Answer)
When using Snowflake Git integration, what is a repository stage?
- A) A traditional Snowflake internal stage that stores Git commits
- B) A named stage object that references a Git repository, allowing Snowflake to access and execute files from the repo
- C) A temporary staging area for Git merge conflicts
- D) An external stage pointing to GitHub's storage

---

## Q114 (Multi Answer - Select 2)
Which TWO statements about external functions in Snowflake are correct? (Select TWO)
- A) External functions call remote services (like AWS Lambda or Azure Functions) via an API integration
- B) External functions execute within Snowflake's compute layer
- C) External functions can introduce latency due to network calls to external endpoints
- D) External functions are restricted to returning scalar values only
- E) External functions require Virtual Private Snowflake

---

## Q115 (Scenario)
An architect is designing a solution where a Snowflake consumer needs to enrich shared data from a provider with their own proprietary data. The consumer wants to join provider data with their internal tables. How is this achieved?
- A) The consumer modifies the shared data directly to add their columns
- B) The consumer creates views or tables in their own database that join the imported shared database with their internal tables
- C) The provider must include the consumer's data in the share
- D) This is not possible — shared data cannot be joined with local data

---

## Q116 (Single Answer)
What is the purpose of the METADATA$FILENAME column in staged data?
- A) To rename files during loading
- B) To identify the source file name of each row during data loading from stages
- C) To compress files based on their names
- D) To filter files by extension during unloading

---

## Q117 (Scenario)
An architect needs to design a Snowflake solution that supports both real-time and batch analytics workloads. Real-time dashboards require sub-minute data freshness, while batch reports run daily. What architecture supports both requirements?
- A) A single batch pipeline that refreshes all data hourly
- B) Snowpipe Streaming for real-time ingestion into a hot table, batch COPY INTO for bulk loads, with dynamic tables that consolidate both paths into consumption views
- C) Only external tables for all data access
- D) Real-time queries against the OLTP source system with Snowflake for batch only

---

## Q118 (Single Answer)
In Snowflake, what is the scope of a sequence object?
- A) Account-level — shared across all databases
- B) Database-level — shared across all schemas in the database
- C) Schema-level — contained within a specific schema
- D) Table-level — attached to a specific table

---

## Q119 (Multi Answer - Select 2)
Which TWO are key considerations when designing a data sharing architecture? (Select TWO)
- A) Shared data is read-only for consumers — consumers cannot modify the provider's data
- B) Sharing incurs data transfer costs for every consumer query
- C) Secure views should be used to control which rows and columns consumers can see
- D) Consumers must use the provider's warehouse for queries
- E) Shares automatically expire after 90 days

---

## Q120 (Scenario)
An architect is evaluating Snowflake for a use case that requires frequent, small-batch updates to individual rows in a large table (100 million rows). The updates come from an OLTP system and affect random rows. How should the architect design this?
- A) Use individual UPDATE statements for each row change
- B) Batch updates into micro-batches, use a landing table with streams and tasks, and apply changes via MERGE to minimize micro-partition churn
- C) Re-create the entire table with each update batch
- D) Use external tables for all updates

---

## Q121 (Single Answer)
What is the purpose of the SYSTEM$STREAM_HAS_DATA function?
- A) To count the number of rows in a stream
- B) To check whether a stream has new change data available for consumption
- C) To reset a stream's offset to the beginning
- D) To create a new stream on a table

---

## Q122 (Scenario)
An architect is building a solution that combines Snowflake's native analytics with a custom web application. The web application needs to submit SQL queries to Snowflake and retrieve results without maintaining persistent database connections. Which API is MOST appropriate?
- A) JDBC driver with connection pooling
- B) Snowflake SQL API (REST API) for stateless, asynchronous query execution
- C) ODBC driver with persistent connections
- D) Snowflake Python connector with long-lived sessions

---

## Q123 (Single Answer)
Which Snowflake feature allows automatic detection and evolution of table schemas when new columns appear in source data files?
- A) Dynamic data masking
- B) Schema detection and schema evolution
- C) Automatic clustering
- D) Stream-based change tracking

---

## Q124 (Multi Answer - Select 2)
Which TWO are valid use cases for Snowflake Cortex LLM functions? (Select TWO)
- A) Summarizing text columns in a table using SNOWFLAKE.CORTEX.SUMMARIZE
- B) Training custom large language models from scratch
- C) Performing sentiment analysis on customer feedback using SNOWFLAKE.CORTEX.SENTIMENT
- D) Replacing all stored procedures with LLM function calls
- E) Compiling Snowpark code into machine code

---

## Q125 (Scenario)
An architect is designing a multi-layered data architecture in Snowflake. Data flows from source systems to a landing zone, then through cleansing, transformation, and finally to business-ready datasets. The architect wants to minimize pipeline maintenance by using declarative transformations where possible. Which approach is MOST aligned with this goal?
- A) Build all transformations as stored procedures triggered by tasks
- B) Use dynamic tables for each layer, defining each as a SQL transformation of the upstream layer, with Snowflake managing refreshes based on target lag
- C) Use materialized views for all layers
- D) Schedule full-refresh CTAS (CREATE TABLE AS SELECT) statements via tasks

---

## Q126 (Single Answer)
What is the purpose of a secure UDF in Snowflake?
- A) A UDF that encrypts its return values
- B) A UDF whose definition is hidden from users who have USAGE but not OWNERSHIP, preventing exposure of internal logic
- C) A UDF that can only be called by ACCOUNTADMIN
- D) A UDF that validates input parameters for security compliance

---

## Q127 (Scenario)
A data architect is designing a Snowflake-based solution for a company that wants to join their internal CRM data with third-party demographic data available on the Snowflake Marketplace. The demographic data is updated weekly by the provider. How does this data integration work from the consumer's perspective?
- A) The consumer must download and reload the demographic data weekly
- B) The consumer installs the Marketplace listing, creating a shared database that auto-updates when the provider refreshes, enabling joins with internal data
- C) The consumer creates an ETL pipeline to pull data from the provider's account
- D) The Marketplace data is only accessible through a special Marketplace query interface

---

## Q128 (Single Answer)
Which Snowflake object type is used to define the structure and format of data in external cloud storage for reading by external tables?
- A) Storage integration
- B) File format
- C) Named stage
- D) Stream

---

## Q129 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's micro-partitions? (Select TWO)
- A) Each micro-partition stores between 50 MB and 500 MB of uncompressed data
- B) Micro-partitions are immutable — updates create new micro-partitions
- C) Users manually define micro-partition boundaries
- D) Micro-partitions use row-based storage for optimal OLTP performance
- E) Micro-partitions can span multiple tables

---

## Q130 (Scenario)
An architect is designing a solution where multiple source systems load data into Snowflake concurrently. Some sources provide overlapping data that may cause duplicate records. The architect needs to ensure data quality. Which approach BEST handles deduplication at scale?
- A) Use UNIQUE constraints to prevent duplicate inserts
- B) Load all data into a staging table, then use a MERGE or INSERT with deduplication logic (ROW_NUMBER/QUALIFY) to load unique records into the target table
- C) Reject files that contain any duplicate records
- D) Use external functions to check for duplicates before loading

---

## Q131 (Single Answer)
What is the key difference between an append-only stream and a standard stream in Snowflake?
- A) Append-only streams capture all DML (inserts, updates, deletes) while standard streams only capture inserts
- B) Standard streams capture inserts, updates, and deletes; append-only streams capture only inserts
- C) Append-only streams have lower latency than standard streams
- D) Standard streams can only be used with permanent tables

---

## Q132 (Scenario)
An architect is tasked with designing a data pipeline that processes IoT sensor data from 50,000 devices. Each device sends a reading every 5 seconds (600K records/minute). The data must be available for analytics within 10 seconds of generation. Which ingestion approach should be used?
- A) Scheduled COPY INTO running every 10 seconds
- B) Snowpipe Streaming using the Snowflake Ingest SDK for sub-second row-level ingestion
- C) Standard Snowpipe with auto-ingest from S3
- D) Direct INSERT statements for each sensor reading

---

## Q133 (Single Answer)
What is the purpose of the ENABLE_SCHEMA_EVOLUTION table property?
- A) It allows Snowflake to automatically add new columns or modify column types when loading data with new schema elements
- B) It prevents any schema changes to the table
- C) It creates a new version of the table for each schema change
- D) It tracks schema change history in a separate audit table

---

## Q134 (Multi Answer - Select 2)
Which TWO are valid methods for unloading data from Snowflake to cloud storage? (Select TWO)
- A) COPY INTO @stage_name FROM table_name to write data to a stage
- B) Using GET command to download from an internal stage to a local file system
- C) Direct export from VARIANT columns to external databases
- D) Using the SHOW TABLES command to export table metadata
- E) Using Snowpark DataFrame write operations

---

## Q135 (Scenario)
An enterprise architect is evaluating whether to implement a centralized data warehouse or a data mesh architecture in Snowflake. The company has 20 domain teams, each with distinct data ownership requirements, but they need cross-domain analytics. Which factor MOST favors a data mesh approach?
- A) The company has a small data team that can manage all data centrally
- B) Domain teams have deep expertise in their data and need autonomy to evolve their data products independently
- C) All data is homogeneous and follows the same schema
- D) The company prefers to minimize the number of Snowflake objects

---

## Q136 (Single Answer)
What is the purpose of the COPY_GRANTS clause when creating a clone?
- A) It copies data from the source to the clone
- B) It preserves the access control grants from the source object on the cloned object
- C) It grants the cloning user full ownership of all cloned objects
- D) It copies network policies from the source account

---

## Q137 (Scenario)
An architect is building a Snowflake solution where data analysts use Snowflake Notebooks for exploratory analysis and data scientists use Snowpark for production ML pipelines. Both groups work with the same datasets. How should the compute architecture be designed?
- A) A single shared warehouse for all users
- B) Separate warehouses: a multi-cluster warehouse for analyst notebooks (interactive, concurrent) and a larger single-cluster warehouse for data science Snowpark jobs (compute-intensive, batch)
- C) Use only serverless compute for all workloads
- D) One warehouse per user for complete isolation

---

## Q138 (Single Answer)
When a table with Time Travel data enters Fail-safe, can the data be recovered by the customer?
- A) Yes, using UNDROP TABLE
- B) Yes, using AT | BEFORE syntax in SELECT
- C) No, only Snowflake support can attempt recovery from Fail-safe on a best-effort basis
- D) No, Fail-safe data is permanently encrypted and never recoverable

---

## Q139 (Multi Answer - Select 2)
Which TWO scenarios require database replication rather than direct data sharing? (Select TWO)
- A) Sharing data between accounts in different regions or cloud providers (when auto-fulfillment is not suitable)
- B) Sharing data between accounts in the same region
- C) Creating a read-write copy of a database in another account for disaster recovery
- D) Providing real-time access to data without any lag
- E) Sharing data with non-Snowflake consumers

---

## Q140 (Scenario)
An architect is designing a Snowflake Native App for a data quality company. The app will be distributed through the Snowflake Marketplace. It needs to run data quality checks on the consumer's data without the consumer's data leaving their account. Which architecture supports this?
- A) The consumer exports their data to the provider's account for analysis
- B) The Native App runs within the consumer's Snowflake account, accessing the consumer's data locally with permissions granted during installation
- C) The provider accesses the consumer's data remotely through data sharing
- D) The consumer sends a sample dataset to the provider for analysis

---

## Q141 (Single Answer)
What is the purpose of an alert in Snowflake?
- A) To send email notifications when a warehouse is suspended
- B) To monitor a condition using a SQL query and trigger an action (like sending a notification) when the condition is met
- C) To alert Snowflake support about account issues
- D) To track real-time stock prices

---

## Q142 (Scenario)
An architect needs to share data from a Snowflake account with consumers who use Databricks, not Snowflake. The data should be accessible in open format. Which approach enables this?
- A) Create a reader account for the Databricks team
- B) Use Snowflake-managed Iceberg tables that store data in open Apache Iceberg format, accessible by Databricks and other engines
- C) Export data to CSV and transfer via cloud storage
- D) Use the Snowflake Spark connector to push data to Databricks

---

## Q143 (Single Answer)
In Snowflake, what is the effect of setting a table's DATA_RETENTION_TIME_IN_DAYS to a value higher than the account-level setting?
- A) The table-level setting is ignored; the account-level setting always applies
- B) The table uses the higher table-level setting, up to the maximum allowed by the account's edition
- C) An error is raised for conflicting settings
- D) The lower of the two values is used

---

## Q144 (Multi Answer - Select 2)
Which TWO are considerations when choosing between streams and dynamic tables for incremental processing? (Select TWO)
- A) Streams require explicit task-based processing while dynamic tables are declarative
- B) Dynamic tables support complex multi-table joins while streams are limited to single tables
- C) Streams provide exact change records (insert/update/delete) while dynamic tables provide the materialized result
- D) Dynamic tables always have lower latency than streams with tasks
- E) Streams cannot be used with permanent tables

---

## Q145 (Scenario)
An architect is designing a Snowflake deployment for an investment bank. The bank needs to maintain an immutable audit trail of all trades. No trade records should ever be physically deleted — all changes must be tracked. Which approach BEST supports this requirement?
- A) Use UPDATE statements to modify trade records and rely on Time Travel for audit
- B) Implement an append-only design using INSERT for new records and soft deletes (status flags), combined with streams for change tracking
- C) Create triggers that prevent DELETE operations
- D) Use transient tables to prevent Fail-safe from overwriting data

---

## Q146 (Single Answer)
Which Snowflake feature allows deploying and running full-stack applications (web servers, ML models, custom services) within the Snowflake security and governance perimeter?
- A) Streamlit in Snowflake
- B) Snowpark Container Services
- C) External functions
- D) JavaScript stored procedures

---

## Q147 (Scenario)
An architect is building a solution where data needs to be transformed through 5 sequential stages, each depending on the previous stage's output. If any stage fails, subsequent stages should not run. How should this be orchestrated in Snowflake?
- A) Run all 5 stages in a single stored procedure with error handling
- B) Create a task DAG (tree) where each stage is a task with a dependency on the previous task, ensuring sequential execution with automatic failure handling
- C) Schedule each stage independently with no dependencies
- D) Use materialized views chained together

---

## Q148 (Single Answer)
What is the benefit of using INFER_SCHEMA function with staged data files?
- A) It automatically loads data without schema definition
- B) It detects the schema (column names and data types) of files in a stage, enabling automatic table creation matching the file structure
- C) It validates data quality of staged files
- D) It compresses staged files for faster loading

---

## Q149 (Multi Answer - Select 2)
Which TWO are key architectural decisions when implementing data vault 2.0 in Snowflake? (Select TWO)
- A) Choosing hash key algorithms for Hub and Link surrogate keys
- B) Deciding whether to use enforced foreign keys between Hubs and Links
- C) Determining the grain of Satellite tables and change tracking approach (full history vs. latest only)
- D) Selecting which cloud provider hosts the data vault
- E) Deciding whether to use materialized views for all Satellite tables

---

## Q150 (Scenario)
A solutions architect is designing a comprehensive disaster recovery plan for a mission-critical Snowflake deployment. The plan must address both data recovery (corrupted/deleted data) and availability (region outage). Which combination of Snowflake features provides the MOST comprehensive DR strategy?
- A) Time Travel only for all recovery scenarios
- B) Time Travel for data corruption recovery, zero-copy cloning for point-in-time snapshots, database failover groups for region-level DR with replication to a secondary account in a different region, and UNDROP for accidental drops
- C) Daily data exports to S3 and manual restore scripts
- D) Rely on Snowflake's built-in Fail-safe for all recovery needs
