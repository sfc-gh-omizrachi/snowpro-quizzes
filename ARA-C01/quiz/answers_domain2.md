# Domain 2: Answers

---

## Q1
**Answer: B**

**Explanation:** Data vault modeling uses Hubs (unique business keys), Links (relationships between Hubs), and Satellites (descriptive/historical attributes). This architecture excels for insurance companies needing historical tracking, source-system flexibility, and full auditability because satellites capture every change with load timestamps. Fact/dimension/bridge (A) describes a star/snowflake schema suited for analytics but not optimized for historical tracking and auditability. Staging/ODS/reporting (C) describes architectural layers, not a modeling methodology. Normalized with foreign keys (D) is a 3NF approach that lacks the parallel-load flexibility and audit trail inherent in data vault.

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "A Data Vault model consists of three core entity types: Hubs, Links, and Satellites. Hubs store unique business keys, Links capture the relationships between Hubs, and Satellites store descriptive attributes and their history."

---

## Q2
**Answer: B**

**Explanation:** By default, Snowflake constraints (primary keys, foreign keys, unique, NOT NULL excepted) are informational only — they are not enforced. This means Snowflake will not reject duplicate primary keys or orphaned foreign keys during INSERT or UPDATE. The NOT NULL constraint is the only one enforced by default. This design choice supports ELT patterns where data is loaded first and cleaned later, and allows the query optimizer to use constraint metadata for join elimination without the overhead of enforcement.

**Source:** [Constraints](https://docs.snowflake.com/en/sql-reference/constraints-overview)

**Quote:** "Snowflake supports defining and maintaining constraints, but does not enforce them, with the exception of NOT NULL constraints, which are always enforced."

---

## Q3
**Answer: B**

**Explanation:** Secure views combined with row access policies (or WHERE-based filtering on a shared context function like CURRENT_ACCOUNT()) allow a provider to share a single curated dataset where each consumer sees only their own rows. This eliminates the need for physical data copies (A), which would be costly and difficult to maintain. CSV exports (C) lack real-time access and governance. Replication (D) copies entire databases and does not provide row-level filtering per consumer.

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "Secure views should be used when a view is specifically designated for data privacy, i.e., to limit access to sensitive data that should not be exposed to all users of the underlying table(s)."

---

## Q4
**Answer: A, D**

**Explanation:** Snowflake's columnar storage and micro-partitioning complement star schema designs by enabling efficient column pruning on large fact tables, and its hash join optimizations handle the characteristic star join pattern (single fact table joined to multiple dimension tables) effectively. Enforced foreign keys (B) are not required since constraints are informational by default. Denormalizing the fact table (C) is counterproductive — facts should remain normalized in a star schema. Clustering keys (E) absolutely can be used and are beneficial for large fact tables.

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Snowflake stores data in columnar format within micro-partitions, enabling efficient pruning and scanning of only the columns and partitions needed for a query."

---

## Q5
**Answer: B**

**Explanation:** A public Snowflake Marketplace listing makes a product catalog available to any Snowflake customer without requiring a pre-existing relationship. Private listings (A) require the provider to specify particular consumer accounts. Data Exchanges (C) are invitation-only groups, not open to all customers. Reader accounts (D) are for sharing with non-Snowflake users but do not provide the broad discoverability of the Marketplace.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "As a provider, you can publish listings on the Snowflake Marketplace to make your data products available to any Snowflake customer."

---

## Q6
**Answer: B**

**Explanation:** A Data Exchange is a private, invitation-only group of Snowflake accounts that can share data with each other. Unlike the Marketplace (which is public), a Data Exchange is curated by an administrator who controls membership. It does not replace the Marketplace (A), it does not enable sharing with non-Snowflake users (C), and it does not convert file formats (D).

**Source:** [Data Exchange](https://docs.snowflake.com/en/user-guide/data-exchange)

**Quote:** "A Data Exchange is a private hub for a group of accounts to discover and share data. An exchange administrator invites members and manages the exchange."

---

## Q7
**Answer: B**

**Explanation:** Separate databases per data lake zone (Raw, Curated, Consumption) with schemas per domain within each database provides the cleanest object hierarchy — it enforces clear zone boundaries via database-level access control while allowing domain-specific organization within each zone. A single database with schemas (A) lacks the strong isolation between zones. Prefixes (C) are error-prone and unmanageable at scale. Separate accounts (D) adds unnecessary operational complexity for what is a logical separation concern.

**Source:** [Database and Schema Design](https://docs.snowflake.com/en/user-guide/databases)

**Quote:** "A database is a logical grouping of schemas, and each schema is a logical grouping of database objects (tables, views, etc.). Databases provide namespace isolation and access control boundaries."

---

## Q8
**Answer: B**

**Explanation:** A Snowflake share can include tables, external tables, secure views, secure materialized views, and secure UDFs. This allows providers to share curated, governed data products rather than just raw tables. Only tables (A) is too restrictive. Any object (C) is incorrect because non-secure views, stages, file formats, and other objects cannot be included directly. Only external tables (D) is similarly incorrect.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shares can include tables, external tables, secure views, secure materialized views, and secure user-defined functions (UDFs)."

---

## Q9
**Answer: A, C**

**Explanation:** Zero-copy cloning creates a metadata-level copy that initially shares the same micro-partitions as the source, so there is no additional storage cost at creation time (A). Clones are also created nearly instantly regardless of data size, making them ideal for rapidly spinning up dev/test environments (C). Changes are not auto-reflected between clone and source (B) — they diverge independently. Clones inherit the source's encryption (D is misleading). The source table is not locked (E) — cloning is non-blocking.

**Source:** [Cloning](https://docs.snowflake.com/en/sql-reference/sql/create-clone)

**Quote:** "A clone does not contribute to the overall data storage for the object until operations are performed on the clone that modify or add data."

---

## Q10
**Answer: B**

**Explanation:** The Snowflake CLI (snow CLI) combined with Git integration allows teams to manage Snowflake objects as code — versioning DDL/SQL in Git and deploying changes through CI/CD pipelines. Manual SnowSQL scripts (A) lack automation and version control integration. SHOW/export (C) is not a CI/CD mechanism. Replication (D) is for cross-account/cross-region data copies, not CI/CD.

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-overview)

**Quote:** "Git integration lets you connect a Git repository to Snowflake so that you can use files from the repository in Snowflake. You can create a Git repository stage that acts as a local clone of the remote repository."

---

## Q11
**Answer: A**

**Explanation:** The ENABLE property on a constraint causes Snowflake to enforce that constraint — meaning DML operations that violate the constraint will be rejected. By contrast, constraints without ENABLE are purely informational. The optimizer relies on the RELY property (B), not ENABLE. Snowflake does not create indexes (C). Bulk load validation is controlled by the VALIDATE property (D), not ENABLE.

**Source:** [Constraint Properties](https://docs.snowflake.com/en/sql-reference/constraints-properties)

**Quote:** "ENABLE: Specifies that the constraint is enforced when data is added to or modified in the table."

---

## Q12
**Answer: B**

**Explanation:** Database replication to a different region with replication frequency under 1 hour satisfies both the RPO of 1 hour (data loss limited to the replication interval) and the RTO of 4 hours (failover can be triggered quickly). Time Travel/Fail-safe (A) protects against data corruption but does not provide cross-region availability. Daily S3 backups (C) cannot meet a 1-hour RPO. Cloning within the same account (D) does not protect against a regional outage.

**Source:** [Database Replication and Failover](https://docs.snowflake.com/en/user-guide/db-replication-intro)

**Quote:** "Replication enables replicating databases across multiple accounts and across different regions and cloud platforms. Failover enables read-write failover for a replicated database."

---

## Q13
**Answer: B**

**Explanation:** In a data vault model, a Hub table stores unique business keys along with a surrogate key (hash key), the load date, and the record source. Hubs represent core business concepts (e.g., Customer, Product). Descriptive attributes (A) belong in Satellite tables. Relationships between business keys (C) are captured by Link tables. Aggregated metrics (D) belong in a business vault or presentation layer.

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "A Hub represents a core business entity and contains a unique list of business keys along with metadata such as load date and record source."

---

## Q14
**Answer: A, B**

**Explanation:** Git integration (A) enables version control of Snowflake objects as code, supporting DevOps workflows like code review, branching, and CI/CD pipelines. Zero-copy cloning (B) supports DataOps by enabling instant creation of development and testing environments without duplicating data. Snowflake does not provide automatic code review (C) or built-in load testing (D). Manual schema comparison (E) is the opposite of a DevOps feature.

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-overview)

**Quote:** "With Git integration, you can keep your Snowflake code in a Git repository and use it for version control, collaboration, and CI/CD workflows."

---

## Q15
**Answer: B**

**Explanation:** A data clean room allows multiple parties to collaborate on shared computations (like fraud detection) without exposing raw data to any participant. The clean room enforces that only approved queries and aggregations can run, preventing any party from seeing individual records. Standard sharing (A) would expose raw data. S3 buckets (C) lack governance and access controls. Replicating to a central account (D) would expose raw data from all parties.

**Source:** [Snowflake Data Clean Rooms](https://docs.snowflake.com/en/user-guide/data-clean-rooms/about-data-clean-rooms)

**Quote:** "A data clean room is a secure environment where two or more parties can collaborate on sensitive data without exposing the underlying raw data to each other."

---

## Q16
**Answer: C**

**Explanation:** On Enterprise Edition and above, permanent tables support a maximum Time Travel retention of 90 days (set via DATA_RETENTION_TIME_IN_DAYS). Standard Edition limits Time Travel to 1 day (A). The 90-day maximum (C) is correct — there is no 30-day (B) or 365-day (D) limit. This extended retention is one of the key differentiators of Enterprise Edition.

**Source:** [Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Snowflake accounts on Enterprise Edition (or higher), the retention period can be set to any value from 0 up to 90 days for databases, schemas, and tables."

---

## Q17
**Answer: B**

**Explanation:** Snowpark Container Services (SPCS) supports GPU compute, custom Docker containers with arbitrary Python packages, and third-party libraries — making it ideal for ML pipelines requiring full environment control. Snowflake ML Functions (A) provide pre-built models without GPU or custom package control. External functions (C) require an external service to host the model. JavaScript UDFs (D) cannot run Python or leverage GPUs.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services lets you deploy, manage, and scale containerized applications directly within Snowflake... including support for GPU-enabled compute pools."

---

## Q18
**Answer: B**

**Explanation:** A secondary (replicated) database is read-only until a failover operation promotes it to primary. This ensures data consistency and prevents conflicting writes across regions. It is not fully writable (A), it does not replace the primary (C) unless failover is invoked, and it can be accessed by any role with the appropriate privileges, not only ACCOUNTADMIN (D).

**Source:** [Database Replication and Failover](https://docs.snowflake.com/en/user-guide/db-replication-intro)

**Quote:** "A secondary database is a read-only replica of the primary database... It can be promoted to serve as the primary database through a failover operation."

---

## Q19
**Answer: A, C**

**Explanation:** Data vault's insert-only pattern (never updating historical records) aligns perfectly with Snowflake's immutable micro-partitions (A), minimizing rewrite overhead. The ability to load Hubs, Links, and Satellites in parallel from different sources leverages Snowflake's independent warehouse scaling (C). Data vault does not require enforced foreign keys (B) — Snowflake constraints are informational. MVs are not mandatory (D), and external tables are not required (E).

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "Data is stored in immutable micro-partitions, which are automatically organized in a columnar format. Insert-only workloads naturally produce well-organized micro-partitions."

---

## Q20
**Answer: B**

**Explanation:** To offer both a free tier and a paid tier on the Snowflake Marketplace, a provider creates two separate listings — one free and one paid — each with different terms and data access levels. A single listing with row access policies (C) does not support Marketplace's commercial/free tier distinction. Two accounts (A) are unnecessary. External function payment checks (D) are not a supported Marketplace monetization pattern.

**Source:** [Listing on the Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace-provider)

**Quote:** "You can create multiple listings for the same or different data products, each with different pricing models, including free and paid options."

---

## Q21
**Answer: B**

**Explanation:** The RELY property tells the Snowflake query optimizer to assume the constraint is true and use it for query optimization (such as join elimination), even though the constraint is not actually enforced. RELY does not enforce constraints on INSERT/UPDATE (A) — that is the ENABLE property. It does not create a physical index (C). FK validation during load (D) is controlled by VALIDATE, not RELY.

**Source:** [Constraint Properties](https://docs.snowflake.com/en/sql-reference/constraints-properties)

**Quote:** "RELY: Specifies that the constraint is relied upon by the query optimizer to generate better query plans."

---

## Q22
**Answer: B**

**Explanation:** A table dropped within the Time Travel retention period can be instantly recovered using UNDROP TABLE. Since the table was dropped only 20 minutes ago and retention is 1 day, UNDROP TABLE will fully restore it. Fail-safe (A) is only used after Time Travel expires and requires Snowflake support. Restoring from a COPY backup (C) is unnecessary when UNDROP is available. Cloning from a point before the drop (D) would work but is more complex than UNDROP.

**Source:** [UNDROP TABLE](https://docs.snowflake.com/en/sql-reference/sql/undrop-table)

**Quote:** "Restores the most recent version of a dropped table. A table can be restored only if the table was dropped within the Time Travel retention period."

---

## Q23
**Answer: B**

**Explanation:** The correct object hierarchy in Snowflake is Account → Database → Schema → Table/View/etc. An account contains databases, each database contains schemas, and each schema contains objects like tables, views, stages, and functions. Option A reverses Database and Schema. Option C introduces an incorrect nesting with Organization. Option D reverses Account and Database.

**Source:** [Snowflake Object Hierarchy](https://docs.snowflake.com/en/user-guide/databases)

**Quote:** "All data in Snowflake is stored in database tables, logically structured as collections of columns and rows. Databases contain schemas, which contain tables and other objects."

---

## Q24
**Answer: A, C**

**Explanation:** A Data Exchange is private and invitation-only (A) — an administrator controls which accounts can join, unlike the Marketplace which is publicly accessible (B describes Marketplace, not Exchange). In a Data Exchange, members can be both data providers and consumers (C), enabling bidirectional sharing within the group. Data Exchanges do not require replication (D) and support the same object types as standard sharing (E is incorrect).

**Source:** [Data Exchange](https://docs.snowflake.com/en/user-guide/data-exchange)

**Quote:** "Data Exchanges allow a group of accounts to privately share and consume data among themselves. Each member can be a provider, a consumer, or both."

---

## Q25
**Answer: B**

**Explanation:** Streamlit in Snowflake allows developers to build and deploy interactive data applications directly within the Snowflake environment, running natively on Snowflake's infrastructure with secure access to Snowflake data. External deployment (A) adds complexity and requires data egress. Snowpark UDFs returning HTML (C) is not a supported application framework. Snowflake does not have a built-in dashboard tool in the traditional sense (D).

**Source:** [Streamlit in Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)

**Quote:** "Streamlit in Snowflake lets you build and deploy Streamlit applications directly in Snowflake, providing a secure, governed environment for interactive data apps."

---

## Q26
**Answer: B**

**Explanation:** Fail-safe provides a 7-day period of data recovery for permanent tables after the Time Travel retention period expires. During this period, Snowflake support can recover data, but it is not user-accessible. Fail-safe is not 1 day (A), 30 days (C), or 90 days (D). This 7-day protection is exclusive to permanent tables — transient and temporary tables have no Fail-safe.

**Source:** [Understanding & Using Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Fail-safe provides a 7-day period during which historical data may be recoverable by Snowflake. This period starts immediately after the Time Travel retention period ends."

---

## Q27
**Answer: A**

**Explanation:** Creating a schema per team within a shared database, plus a SHARED schema for cross-team objects, provides both team-level isolation (each team manages its own schema with its own access controls) and a clean mechanism for shared assets. A single schema with row access policies (B) is overly complex for team isolation. Separate databases with no sharing (C) prevents collaboration. A single schema with naming conventions (D) is fragile and lacks enforceable access control boundaries.

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "Schemas provide a logical grouping of objects within a database and serve as boundaries for managing access control privileges."

---

## Q28
**Answer: B**

**Explanation:** With Cross-Cloud Auto-Fulfillment, the provider pays the costs associated with replicating data to consumer regions on other cloud platforms. This ensures consumers can access data locally without cross-region query latency, but the replication and storage costs in remote regions are borne by the provider. Consumer pays (A), Snowflake absorbs (C), and split equally (D) are all incorrect.

**Source:** [Cross-Cloud Auto-Fulfillment](https://docs.snowflake.com/en/user-guide/data-marketplace-auto-fulfillment)

**Quote:** "Providers are responsible for the costs associated with replicating data to fulfill listings in remote regions through Cross-Cloud Auto-Fulfillment."

---

## Q29
**Answer: A, D**

**Explanation:** The Snowflake Native App Framework allows providers to package and distribute data applications (A) — including data, logic, and UIs — that run within the consumer's Snowflake account. It also supports distributing ML models (D) as part of native apps, enabling consumers to run model inference on their own data. It does not replace ETL tools (C), automate account creation (E), or specifically run stored procedures on the consumer's warehouse as a primary use case (B is partially true but not a defining use case).

**Source:** [Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "The Snowflake Native App Framework allows providers to build, distribute, and monetize applications that can include data content, application logic, and user interfaces."

---

## Q30
**Answer: B**

**Explanation:** An iterative migration approach — migrating tables and converting PL/SQL stored procedures in phases — is the recommended strategy for large Oracle migrations (500 tables + complex logic). This reduces risk by allowing validation at each phase and enables the team to learn and adapt. A big bang migration (A) of this scale is high-risk. Oracle compatibility mode (C) does not exist in Snowflake. Keeping PL/SQL in Oracle (D) defeats the purpose of migration and creates permanent hybrid complexity.

**Source:** [Migration to Snowflake](https://docs.snowflake.com/en/user-guide/migration)

**Quote:** "Snowflake recommends an iterative approach for migrating from legacy data platforms, allowing teams to migrate, test, and validate in manageable phases."

---

## Q31
**Answer: B**

**Explanation:** A Snowflake stream captures change data capture (CDC) information on a table — tracking inserts, updates, and deletes that occur after the stream is created. Streams do not compress data (A), do not provide real-time ingestion from external sources (C), and do not connect warehouses (D). They record the delta of changes (the "change table") which downstream processes can consume.

**Source:** [Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream records data manipulation language (DML) changes made to a table, directory table, external table, or the underlying tables in a view, including inserts, updates, and deletes."

---

## Q32
**Answer: B**

**Explanation:** Streams capture CDC changes as they occur on the source table, and tasks can be scheduled (down to every minute) to process those changes incrementally into the dashboard's consumption layer. This combination provides near real-time data freshness. Scheduled COPY (A) is for batch file loading, not CDC processing. External functions (C) are for calling external services. Materialized views (D) refresh automatically but do not handle the CDC-to-dashboard transformation pipeline.

**Source:** [Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Streams, in combination with tasks, enable continuous ELT workflows to process changes to source tables, including supporting near real-time processing of data."

---

## Q33
**Answer: B**

**Explanation:** When a task is configured with a WHEN clause that checks SYSTEM$STREAM_HAS_DATA, and the stream has no new data, the task run is skipped. This avoids wasting compute resources on empty runs. The task does not run anyway (A), does not produce an error (C), and does not wait indefinitely (D) — it simply skips that scheduled execution.

**Source:** [Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "If the WHEN condition evaluates to FALSE (e.g. the specified stream contains no change data), the task does not run, and no compute resources are consumed."

---

## Q34
**Answer: A, B**

**Explanation:** Snowpark Container Services (SPCS) (A) enables running custom ML workloads in Docker containers with GPU support, and Cortex LLM functions (B) provide native access to large language models for text processing tasks like summarization and classification. Snowflake does not offer automatic neural network training (C), a built-in TensorFlow runtime (D), or GPU-accelerated SQL (E) as native features.

**Source:** [Snowflake Cortex](https://docs.snowflake.com/en/user-guide/snowflake-cortex/overview)

**Quote:** "Snowflake Cortex gives you instant access to industry-leading large language models (LLMs) trained by researchers at companies like Mistral, Meta, and Google."

---

## Q35
**Answer: B**

**Explanation:** Apache Iceberg tables with an external catalog integration (such as AWS Glue) allow Snowflake to query Parquet files managed by an external catalog, supporting a true lakehouse architecture with interoperability. COPY INTO (A) would ingest data into Snowflake-managed tables, losing the open-format benefit. Standard external tables (C) lack Iceberg's transactional guarantees and catalog integration. Snowpark read (D) would work for ad-hoc processing but does not provide a governed, catalog-integrated solution.

**Source:** [Apache Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Snowflake supports Apache Iceberg tables that use an external catalog, such as AWS Glue, allowing you to use Snowflake's query engine while maintaining interoperability with other tools."

---

## Q36
**Answer: B**

**Explanation:** The separation of compute and storage in Snowflake means each layer can scale independently — you can add more or larger warehouses without affecting storage, and storage grows automatically without requiring compute changes. This is a foundational architectural advantage over traditional systems where compute and storage are tightly coupled. Option A is incorrect because caching is a benefit of the services layer, not the core separation principle. Options C and D describe the opposite of the architecture.

**Source:** [Key Concepts & Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake's architecture separates compute from storage, allowing each to scale independently. Storage and compute can be scaled up or down without impacting the other."

---

## Q37
**Answer: B**

**Explanation:** Separate warehouses for the ETL team and analytics team ensure workload isolation — heavy ETL loads won't compete with analytical queries for compute resources. Each warehouse can be independently sized, configured, and scaled. Increasing a shared warehouse (A) doesn't prevent resource contention. Scheduling together (C) worsens contention. Materialized views (D) address query performance, not workload isolation.

**Source:** [Warehouses](https://docs.snowflake.com/en/user-guide/warehouses)

**Quote:** "Using multiple warehouses to handle different workloads allows you to isolate different types of queries and optimize compute resources for each workload independently."

---

## Q38
**Answer: D**

**Explanation:** Both transient tables and temporary tables lack Fail-safe protection. Only permanent tables have the 7-day Fail-safe period after Time Travel expires. Transient tables (B alone) is only partially correct, and temporary tables (C alone) is also only partially correct. The correct answer is D — both transient and temporary tables have no Fail-safe.

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient and temporary tables do not have a Fail-safe period. As a result, they are designed for transitory data that does not need the same level of data protection and recovery."

---

## Q39
**Answer: A, C**

**Explanation:** Transient tables are ideal for staging/ETL data (A) that is reloadable from source systems and for dev/test environments (C) where Fail-safe protection is unnecessary. Financial audit data (B) requires full protection (permanent tables). Customer PII (D) typically requires maximum data protection. 90-day Time Travel (E) is not available for transient tables — they are limited to 1 day maximum.

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient tables are specifically designed for transitory data that needs to be maintained beyond each session but does not need the same level of data protection as permanent tables."

---

## Q40
**Answer: B**

**Explanation:** Snowflake's Git integration creates a Git repository stage — a special type of stage that acts as a local, read-only clone of a remote Git repository. This allows you to reference files (SQL scripts, Python code, etc.) from Git directly within Snowflake. It does not auto-deploy commits (A), provide real-time bidirectional sync (C), or serve as a built-in Git client for editing/committing (D).

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-overview)

**Quote:** "A Git repository stage in Snowflake is a special kind of stage that mirrors the contents of a remote Git repository, providing read-only access to the repository files."

---

## Q41
**Answer: B**

**Explanation:** Transient tables support a maximum Time Travel retention of 1 day (DATA_RETENTION_TIME_IN_DAYS = 0 or 1). This applies across all editions — even Enterprise Edition cannot extend transient table Time Travel beyond 1 day. The 0-day option (A) is possible but not the maximum. 14 days (C) and 90 days (D) apply only to permanent tables.

**Source:** [Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For transient tables, the retention period can be set to 0 or 1 day, regardless of the Snowflake edition."

---

## Q42
**Answer: B**

**Explanation:** Database failover using replication groups enables promoting a secondary database to primary within minutes, satisfying the 15-minute RTO requirement. The replication group must be pre-configured with the secondary account as a failover target. Time Travel (A) does not provide account-level failover. S3 exports (C) would take far longer than 15 minutes to restore. Cloning (D) is within the same account and does not protect against account-level failures.

**Source:** [Replication and Failover Groups](https://docs.snowflake.com/en/user-guide/replication-groups)

**Quote:** "Failover groups enable read-write failover for a set of objects from one Snowflake account to another, supporting business continuity and disaster recovery requirements."

---

## Q43
**Answer: A**

**Explanation:** A task's warehouse is determined by the WAREHOUSE parameter specified in the CREATE TASK or ALTER TASK statement. Alternatively, serverless tasks use Snowflake-managed compute, but for user-managed tasks, the WAREHOUSE parameter is explicit. The user's default warehouse (B) is not used. Snowflake does not auto-select a warehouse (C). The warehouse used when creating the task (D) is irrelevant unless explicitly specified in the task definition.

**Source:** [Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task requires a warehouse to provide the compute resources for running the SQL statement. You specify the warehouse when creating or altering the task."

---

## Q44
**Answer: A, C**

**Explanation:** Snowflake stored procedures support multiple languages — SQL, JavaScript, Python, Java, and Scala (A). They can execute DDL and DML statements (C), making them suitable for complex data manipulation and administrative tasks. Stored procedures do not default to caller's privileges (B) — they default to owner's rights. They can call other procedures (D is incorrect). They are available on all editions, not just Enterprise (E).

**Source:** [Stored Procedures](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview)

**Quote:** "A stored procedure can be written in SQL, JavaScript, Python, Java, or Scala. Stored procedures can execute SQL statements, including DDL and DML, and return results."

---

## Q45
**Answer: B**

**Explanation:** Dynamic tables are purpose-built for declarative data pipelines like the medallion architecture (Bronze→Silver→Gold). You define the transformation as a SELECT query and specify a target lag, and Snowflake automatically manages incremental refreshes. Manual stored procedures (A) require explicit orchestration. Materialized views (C) are limited to single-table transformations. External functions (D) call outside services and are not suited for internal transformation pipelines.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables are a new table type that lets you define the target of a pipeline as a query. Snowflake automatically handles the refresh process to keep the table up to date."

---

## Q46
**Answer: B**

**Explanation:** When a database is replicated, it includes all objects within it: tables, views, schemas, stages, file formats, sequences, streams, tasks, stored procedures, UDFs, and other database-level objects. The replication is comprehensive — not limited to just tables and views (A), tagged tables (C), or schemas only (D).

**Source:** [Database Replication](https://docs.snowflake.com/en/user-guide/db-replication-intro)

**Quote:** "Database replication replicates all objects contained in a database, including tables, views, file formats, sequences, stages, streams, tasks, stored procedures, and user-defined functions."

---

## Q47
**Answer: B**

**Explanation:** A paid Marketplace listing with Cross-Cloud Auto-Fulfillment enables the weather data provider to monetize their data, making it available to any Snowflake customer regardless of their cloud platform or region. Manual shares (A) don't scale and don't support monetization. APIs (C) require building and maintaining external infrastructure. Email exports (D) are not scalable or secure.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Providers can monetize their data by creating paid listings on the Snowflake Marketplace and leveraging Cross-Cloud Auto-Fulfillment to deliver data across regions and clouds."

---

## Q48
**Answer: B**

**Explanation:** When a permanent table is converted to a transient table (via CREATE TABLE ... AS SELECT or recreating it), the Time Travel retention is reduced to a maximum of 1 day, since transient tables only support 0 or 1 day of retention. The original retention is not preserved (A), data is not moved to Fail-safe (C), and there is a definite change (D) — the table loses both extended Time Travel and Fail-safe protection.

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient tables have a maximum Time Travel retention period of 1 day and no Fail-safe period, regardless of the retention settings of the original permanent table."

---

## Q49
**Answer: A, C**

**Explanation:** Database failover requires: (1) a replication or failover group must be configured linking the primary and secondary accounts (A), and (2) the secondary database must be explicitly enabled as a failover target (C). The accounts do not need to be in the same region (B) — cross-region failover is a primary use case. Same edition (D) is not strictly required. A dedicated running warehouse (E) is not needed for failover.

**Source:** [Replication and Failover Groups](https://docs.snowflake.com/en/user-guide/replication-groups)

**Quote:** "To enable failover, you must configure a failover group in the source account and enable replication and failover to a target account."

---

## Q50
**Answer: B**

**Explanation:** Snowpark Python stored procedures are the best fit for ML model scoring (using Python ML libraries), REST-like integration (using external access), and multi-step orchestration — all within Snowflake's execution environment. SQL stored procedures (A) lack native ML library support. JavaScript procedures (C) have limited ML ecosystem. External functions (D) add latency and require external infrastructure for each call.

**Source:** [Snowpark Python Stored Procedures](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-python)

**Quote:** "You can write stored procedures in Python using the Snowpark library, which provides access to Python's rich ecosystem of libraries for data processing, machine learning, and more."

---

## Q51
**Answer: B**

**Explanation:** A replication group is a defined set of objects (databases and account-level objects) that are replicated together as a unit to one or more target accounts. It is not a collection of warehouses (A), a group of users (C), or a set of tasks (D). Replication groups provide a managed way to replicate and optionally failover a coherent set of objects.

**Source:** [Replication and Failover Groups](https://docs.snowflake.com/en/user-guide/replication-groups)

**Quote:** "A replication group is a defined collection of objects in a source account that are replicated as a unit to one or more target accounts."

---

## Q52
**Answer: B**

**Explanation:** Secure views allow the pharma company to create partner-specific views of clinical trial data, and separate shares (one per partner) ensure each partner only accesses their designated trials. Separate databases (A) would require duplicating data. Direct access with row access policies (C) would give direct table access which is less secure. FTP (D) provides no governance or real-time access.

**Source:** [Working with Shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "You can create secure views to precisely control the rows and columns of data exposed in a share, enabling fine-grained data governance for each consumer."

---

## Q53
**Answer: B**

**Explanation:** A file format object stores the format specifications (such as type, delimiter, compression, encoding, and error handling) used when loading data into or unloading data from Snowflake. It does not change the physical storage format (A), convert file types (C), or compress files (D). File format objects are reusable and can be referenced across multiple COPY INTO statements.

**Source:** [File Formats](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "A named file format object specifies the set of format options used for bulk loading and unloading data."

---

## Q54
**Answer: A, C**

**Explanation:** Snowpark Container Services allows running custom Docker containers (A) and deploying ML models and applications (C) within Snowflake's managed infrastructure. SPCS does not replace virtual warehouses (B) for SQL query processing. It does not convert SQL to containers (D). It runs on Snowflake's infrastructure, not customer hardware (E).

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services is a fully managed container offering that allows you to deploy, manage, and scale containerized workloads, including ML models and full-stack applications."

---

## Q55
**Answer: B**

**Explanation:** Data vault 2.0 combined with a business vault and star schema presentation layer provides the full audit trail (satellites track all changes), flexible source integration (hubs and links accommodate new sources easily), and both operational (data vault core) and analytical (star schema presentation) query patterns. 3NF + star (A) lacks the auditability and flexibility of data vault. A single denormalized table (C) cannot handle multiple sources or auditing. Star schema alone (D) is not suited for operational workloads or full audit trails.

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "Data Vault 2.0 extends the core model with Business Vault and Information Mart layers, enabling both operational and analytical use cases while maintaining full auditability."

---

## Q56
**Answer: B**

**Explanation:** A Snowflake share can only include objects from a single database. If you need to share objects from multiple databases, you must create separate shares or use secure views that reference objects across databases (but the view itself must reside in the shared database). Options A, C, and D are all incorrect — there is a strict single-database limitation per share.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "A share is created from a single database. All objects added to the share must belong to the same database as the share."

---

## Q57
**Answer: B**

**Explanation:** Snowpipe Streaming (via the Snowflake Ingest SDK) is designed for low-latency, high-frequency data ingestion — making GPS data from 10,000 vehicles queryable within seconds. COPY every minute (A) introduces at least a 1-minute delay and is operationally complex at this scale. Bulk PUT/COPY (C) is batch-oriented with higher latency. External tables (D) query data in place but do not provide the sub-second queryability required.

**Source:** [Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Snowpipe Streaming enables low-latency loading of streaming data into Snowflake tables. Rows inserted using the Snowpipe Streaming API are queryable within seconds."

---

## Q58
**Answer: B**

**Explanation:** A materialized view pre-computes and stores the results of its defining query, providing faster reads at the cost of storage and maintenance. A standard view stores only the query definition and computes results at query time. Option A has it reversed. They are not the same (C). Materialized views do not span multiple databases (D).

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view stores the results of a query and automatically updates the stored results when the underlying data changes, providing faster access compared to standard views."

---

## Q59
**Answer: A, C**

**Explanation:** Materialized views in Snowflake are limited to a single base table (A) — they cannot reference joins or subqueries against multiple tables. They also incur ongoing maintenance (storage and compute) costs (C) as Snowflake automatically refreshes them when underlying data changes. MVs do not support all SQL constructs (D is incorrect). They do not replace the underlying table (E). MVs can be used with streams (B is incorrect as a limitation).

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view definition can query only a single table. Joins, including self-joins, are not supported... Maintaining materialized views requires compute resources and incurs additional storage costs."

---

## Q60
**Answer: B**

**Explanation:** SPCS with custom Docker containers gives data scientists full control over their runtime environment — including arbitrary Python and R packages, custom dependencies, and configurations. Snowpark UDFs with Anaconda (A) are limited to the Anaconda package set available in Snowflake. JavaScript UDFs (C) don't support Python or R. External functions (D) require maintaining separate external infrastructure.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "With Snowpark Container Services, you can run any containerized workload, giving you full control over your runtime environment, including custom libraries and dependencies."

---

## Q61
**Answer: B**

**Explanation:** In a data vault model, a Link table captures the relationship (association) between two or more Hub tables. Links represent business events or transactions that connect business entities. Descriptive attributes (A) belong in Satellites. Historical snapshots (C) are maintained by Satellites. Aggregated metrics (D) belong in the business vault or presentation layer.

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "A Link represents a relationship or association between two or more business keys (Hubs). Links capture business events and transactions."

---

## Q62
**Answer: C**

**Explanation:** A multi-cluster warehouse with auto-scaling automatically adds and removes clusters based on query concurrency demand, making it ideal for a multi-tenant SaaS dashboard where read query volume fluctuates. A single XL warehouse (A) cannot handle concurrent spikes efficiently. One warehouse per tenant (B) is operationally complex and expensive. Serverless tasks (D) are for scheduled processing, not interactive dashboard queries.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "A multi-cluster warehouse uses multiple clusters of compute resources to handle concurrent query loads. In auto-scale mode, Snowflake automatically starts and stops clusters based on the number of concurrent queries."

---

## Q63
**Answer: A**

**Explanation:** The VALIDATE constraint property causes Snowflake to verify that all existing data in the table conforms to the constraint at the time the constraint is added or modified. This is distinct from ENABLE (which enforces the constraint on future DML) and RELY (which informs the optimizer). Real-time validation (B) is the ENABLE property. VALIDATE is supported (C is wrong). It applies generally, not only to COPY INTO (D).

**Source:** [Constraint Properties](https://docs.snowflake.com/en/sql-reference/constraints-properties)

**Quote:** "VALIDATE: Specifies whether to validate existing data in the table against the constraint when the constraint is set."

---

## Q64
**Answer: A, C**

**Explanation:** Replication groups can contain entire databases with all their objects (A) and account-level objects such as users, roles, warehouses, resource monitors, and integrations (C). Individual tables cannot be selected independently (B) — entire databases are replicated as a unit. Network policies are account-level objects that can be included (D is a distractor but the question asks for two best answers). Marketplace listings (E) are not replicated via replication groups.

**Source:** [Replication and Failover Groups](https://docs.snowflake.com/en/user-guide/replication-groups)

**Quote:** "A replication group can include databases, shares, and account-level objects such as users, roles, warehouses, resource monitors, integrations, and network policies."

---

## Q65
**Answer: B**

**Explanation:** Cortex LLM functions combined with Cortex Search (for semantic retrieval over company documents) or Cortex Analyst (for structured data queries) provide a native, governed solution for building an AI chatbot within Snowflake. SPCS custom NLP (A) requires building and maintaining a custom solution. External OpenAI (C) involves data egress and external dependency. JavaScript UDFs (D) cannot run LLM inference.

**Source:** [Snowflake Cortex](https://docs.snowflake.com/en/user-guide/snowflake-cortex/overview)

**Quote:** "Snowflake Cortex provides serverless AI functions, including LLM inference, search, and analyst capabilities, enabling you to build AI-powered applications directly within Snowflake."

---

## Q66
**Answer: B**

**Explanation:** Transient tables cost less than permanent tables because they have no Fail-safe storage. Permanent tables incur Fail-safe storage costs for 7 days after Time Travel expires, whereas transient tables do not have this additional storage overhead. Transient tables are not more expensive (A). The difference is specifically about Fail-safe, not partition sizes (C). There is a measurable cost difference (D).

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient tables contribute to your overall storage charges, but because they do not have a Fail-safe period, they reduce costs compared to equivalent permanent tables."

---

## Q67
**Answer: A**

**Explanation:** Snowflake data sharing for existing Snowflake customers combined with reader accounts for non-Snowflake users covers both audiences. Reader accounts are managed by the provider and allow non-Snowflake organizations to query shared data. S3 exports (B) lack real-time access and governance. A public API (C) requires building external infrastructure. Requiring all consumers to have Snowflake accounts (D) excludes non-Snowflake customers.

**Source:** [Reader Accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "Reader accounts (formerly known as read-only accounts) provide a way for data providers to share data with consumers who do not have their own Snowflake account."

---

## Q68
**Answer: A**

**Explanation:** When a database containing streams is replicated, the streams are replicated along with the database and resume tracking changes from the point of replication. They do not lose their offset or start from scratch. Streams are not excluded from replication (B). They do not continue from the original offset of the source (C) — they resume from the replication point. They are not converted to views (D).

**Source:** [Database Replication](https://docs.snowflake.com/en/user-guide/db-replication-intro)

**Quote:** "Streams are replicated with the database. After a failover, streams in the secondary database resume from the replication point."

---

## Q69
**Answer: A, C**

**Explanation:** Dynamic tables support complex transformations including joins across multiple tables (A), unlike materialized views which are limited to a single base table. Dynamic tables use a target lag setting (C) that specifies the maximum acceptable staleness, giving users control over freshness vs. cost tradeoffs. Dynamic tables are not limited to external tables (B). They do not always refresh synchronously (D). They do use storage (E).

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables support complex queries, including joins, aggregations, and window functions. You specify a target lag that determines how frequently the dynamic table is refreshed."

---

## Q70
**Answer: B**

**Explanation:** A multi-source ingestion architecture requires different tools for different source types: Snowpipe (auto-ingest from cloud storage) for CSV/SFTP files staged in S3, the Kafka connector for streaming Kafka topics, and external functions or Snowpark for REST API data. A single COPY INTO (A) only handles staged files. External tables (C) query files in place but don't handle Kafka or REST. Custom Python outside Snowflake (D) adds unnecessary operational complexity.

**Source:** [Data Loading Overview](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "Snowflake supports multiple methods for loading data, including bulk loading (COPY INTO), continuous loading (Snowpipe), the Snowflake Connector for Kafka, and programmatic loading via Snowpark."

---

## Q71
**Answer: B**

**Explanation:** The Snowflake Native App Framework is designed to package and distribute data products — combining data, application logic, and user interfaces into a single distributable unit that runs within the consumer's Snowflake account. It is not for building mobile apps (A), replacing the Snowflake web UI (C), or creating external APIs (D).

**Source:** [Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "The Snowflake Native App Framework enables providers to build applications that leverage Snowflake's data platform to deliver data content, application logic, and visualizations to consumers."

---

## Q72
**Answer: B**

**Explanation:** For a star schema with 10 billion rows where date-range queries are the primary access pattern, adding a clustering key on the date column dramatically improves partition pruning, allowing Snowflake to skip irrelevant micro-partitions. FK constraints (A) are informational and don't affect performance. Materializing all joins (C) is impractical at 10B rows. Full denormalization (D) would bloat storage without addressing the pruning need.

**Source:** [Clustering Keys & Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A clustering key defines the order in which data is organized within micro-partitions. Well-chosen clustering keys significantly improve query performance by enabling efficient partition pruning."

---

## Q73
**Answer: B**

**Explanation:** Zero-copy cloning creates a point-in-time snapshot of a database, schema, or table without copying any data — the clone shares the underlying micro-partitions with the source, incurring no additional storage until either the source or clone is modified. Replication (A) copies data to another account. Time Travel SELECT AT (C) queries historical data but does not create a persistent snapshot object. Data sharing (D) shares live data, not a frozen snapshot.

**Source:** [Cloning](https://docs.snowflake.com/en/sql-reference/sql/create-clone)

**Quote:** "Cloning creates a copy of a database, schema, table, or other object. The snapshot is fast and incurs no additional storage cost at the time of creation because the clone shares micro-partitions with the original."

---

## Q74
**Answer: A, C**

**Explanation:** The Snowflake SQL API provides a RESTful interface (A) that allows external applications to execute SQL statements over HTTP/HTTPS without requiring a persistent JDBC/ODBC connection. It also supports asynchronous execution with polling (C) — the client submits a query and polls for results, which is ideal for long-running queries. It does not require persistent connections (B). It supports all SQL statement types, not only SELECT (D). It is available on all editions (E).

**Source:** [SQL API](https://docs.snowflake.com/en/developer-guide/sql-api/about-endpoints)

**Quote:** "The Snowflake SQL API is a REST API that you can use to access and update data in a Snowflake database. You can use this API to execute SQL statements asynchronously by submitting requests and polling for results."

---

## Q75
**Answer: B**

**Explanation:** A DAG (directed acyclic graph) of tasks combined with dynamic tables provides a robust, declarative ELT pipeline where each stage (dedup, type standardization, business rules, aggregation) is defined as a dynamic table with automatic dependency management. A single stored procedure (A) is monolithic and hard to debug. Four separate uncoordinated procedures (C) lack dependency management. A single MERGE (D) cannot handle four distinct transformation stages cleanly.

**Source:** [Task Graphs](https://docs.snowflake.com/en/user-guide/tasks-graphs)

**Quote:** "A task graph (DAG) is a series of tasks organized by their dependencies. A root task triggers the execution of child tasks, enabling complex multi-step pipelines."

---
---

## Q76
**Answer: B**

**Explanation:** In data vault architecture, Satellite tables store descriptive attributes and historical changes for a Hub or Link. Each time a source attribute changes, a new row is inserted into the Satellite with a load timestamp, creating a full audit trail. Hubs (A) store business keys. Links (D) define relationships. Aggregation for reporting (C) belongs to the business vault or information delivery layer.

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "Satellites store the descriptive attributes (context) for Hubs and Links, along with metadata for tracking changes over time."

---

## Q77
**Answer: B**

**Explanation:** Snowflake's Git integration allows storing stored procedure code in a Git repository and deploying from it. If a deployment introduces a bug, the team can redeploy the previous version directly from Git history. Time Travel (A) works for data, not code objects like stored procedures. Wiki backups (C) are error-prone and manual. Cloning the entire database (D) is overkill for a procedure code rollback and doesn't effectively version code objects.

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-overview)

**Quote:** "Snowflake's Git integration lets you keep copies of files from a Git repository available for use in Snowflake, including executing files as code."

---

## Q78
**Answer: B**

**Explanation:** When a consumer creates a database from a share, it is a read-only imported database. The consumer cannot modify the underlying data — it references the provider's data directly. There is no data copy; the consumer queries the provider's data in place. The consumer does not get full ownership (A), cannot write back (C), and the database does not automatically expire (D).

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "As a consumer, you create a read-only database from a share. You can then query the shared data just as you would any other database, using your own compute resources."

---

## Q79
**Answer: A, C**

**Explanation:** Best practices for multi-workload environments include using separate warehouses for different workload types (ETL, BI, ad-hoc) to ensure resource isolation and prevent contention, and right-sizing warehouses based on actual workload characteristics rather than defaulting to the largest size. A single large warehouse (B) creates contention between workloads. Keeping warehouses running 24/7 (D) wastes credits. Assigning all users to one warehouse (E) eliminates workload isolation.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Consider using different warehouses for different workloads to provide the flexibility to match each warehouse to its specific workload requirements."

---

## Q80
**Answer: B**

**Explanation:** External tables reference data stored in cloud storage (S3, Azure Blob, GCS) and allow querying that data using SQL without ingesting it into Snowflake. This enables joining external data with native Snowflake tables in the same query. Database replication (A) doesn't apply to non-Snowflake sources. Marketplace (C) is for published listings, not arbitrary external storage. COPY INTO (D) ingests data, which the question explicitly wants to avoid.

**Source:** [External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)

**Quote:** "An external table is a Snowflake feature that allows you to query data stored in an external stage as if the data were inside a table in Snowflake."

---

## Q81
**Answer: B**

**Explanation:** UDFs return a scalar value or table and can be used inline in SQL expressions (SELECT, WHERE, etc.). Stored procedures perform procedural logic, can execute DDL/DML, but are called with CALL and cannot be used in SQL expressions. UDFs support multiple languages including SQL, Python, Java, JavaScript, and Scala (A is wrong). Stored procedures are not universally faster (C). They are not identical (D).

**Source:** [Overview of UDFs](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "A UDF (user-defined function) is a user-written function that can be called from Snowflake in the same way that a built-in function can be called. UDFs return a value for each input row."

---

## Q82
**Answer: B**

**Explanation:** For interoperability with Spark-managed Iceberg tables, the architect should use externally managed Iceberg tables with a catalog integration (e.g., AWS Glue) so Snowflake can read the Spark-managed tables. For Snowflake write operations, Snowflake-managed Iceberg tables should be used since externally managed Iceberg tables are read-only from Snowflake. Converting data (A) loses the interoperability benefit. External tables (C) lack full Iceberg support. Native tables with Parquet exports (D) don't leverage the Iceberg format.

**Source:** [Apache Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Snowflake supports Apache Iceberg tables that use Snowflake as the Iceberg catalog, or an external Iceberg catalog such as AWS Glue."

---

## Q83
**Answer: C**

**Explanation:** There is no fixed hard limit on the number of consumer accounts that can be added to a single Snowflake share. A provider can grant access to many consumer accounts. The limits of 10 (A), 100 (B), and 1 per share (D) are all incorrect.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "A share can be shared with one or more consumer accounts."

---

## Q84
**Answer: A, C**

**Explanation:** Tasks can be organized in a DAG (directed acyclic graph) with parent-child dependencies, allowing complex workflow orchestration. Tasks can be scheduled using either a CRON expression or a fixed-minute interval. Tasks can call stored procedures (B is wrong). Tasks use a specified warehouse or serverless compute, they don't create their own (D). Roles with appropriate privileges can create tasks, not just ACCOUNTADMIN (E).

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can execute a single SQL statement, call a stored procedure, or execute procedural logic using Snowflake Scripting... Tasks can be combined in simple or complex DAGs."

---

## Q85
**Answer: A**

**Explanation:** A data mesh architecture in Snowflake is supported by each domain team publishing data products through data shares or Marketplace listings. A centralized Data Exchange or Marketplace provides discoverability for consumers. A single central database (B) contradicts the data mesh principle of domain ownership. Exporting to shared storage (C) loses governance. Emailing data (D) is neither scalable nor governed.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Snowflake enables the sharing of data between accounts through shares, providing real-time, governed access to data without data movement."

---

## Q86
**Answer: B**

**Explanation:** During a database failover, the secondary (replica) database is promoted to become the new primary and becomes writable. The original primary is then demoted to a secondary. The primary is not deleted (A). Both databases cannot be writable simultaneously (C). Failover promotes the existing replica rather than creating a new copy (D).

**Source:** [Database Failover and Failback](https://docs.snowflake.com/en/user-guide/db-failover-failback)

**Quote:** "During failover, the secondary database is promoted to serve as the primary database. The previous primary database becomes a secondary database."

---

## Q87
**Answer: B**

**Explanation:** For data sovereignty requirements, the architect should create separate Snowflake accounts in the required regions (EU and US) to keep customer data within its designated geography. Data sharing or replication can then create aggregated or anonymized views in a global account for executive reporting. Storing all data in one region (A, C) violates the sovereignty requirement for the other region. A single VPS does not span multiple regions (D).

**Source:** [Replication and Failover Across Regions](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Database replication and failover enables replicating databases across multiple accounts in different regions and cloud platforms."

---

## Q88
**Answer: B**

**Explanation:** SYSTEM$ALLOWLIST returns the list of Snowflake hosts and ports that must be permitted through firewalls and proxies for clients to connect to Snowflake. This is essential for network administrators configuring firewall rules. It does not list IP addresses in network policies (A), allowed roles (C), or file formats (D).

**Source:** [SYSTEM$ALLOWLIST](https://docs.snowflake.com/en/sql-reference/functions/system_allowlist)

**Quote:** "Returns hostnames and port numbers to add to your firewall's allowed list so that you can access Snowflake from behind your firewall."

---

## Q89
**Answer: A, C**

**Explanation:** Snowflake stores VARIANT data in a columnar format and automatically performs type inference and column extraction for efficient querying. Snowflake can also push down predicates into VARIANT columns, enabling partition pruning and efficient scans. VARIANT data is not stored as raw text (B). The maximum size for a single VARIANT value is 16 MB compressed, not 1 MB (D). VARIANT data can be used in JOIN conditions (E).

**Source:** [Semi-structured Data](https://docs.snowflake.com/en/user-guide/semistructured-concepts)

**Quote:** "When semi-structured data is inserted into a VARIANT column, Snowflake extracts as many of the data elements as possible into separate columns using a columnar format."

---

## Q90
**Answer: B**

**Explanation:** The Snowflake CLI supports declarative object management for infrastructure provisioning, while Git integration allows Snowflake to access and execute code files (procedures, UDFs) stored in Git repositories. Together they support separating infrastructure and code deployment pipelines. Manual SQL (A) is error-prone and not CI/CD. Terraform alone (C) handles infrastructure but is less suited for code deployment. COPY INTO (D) is for data loading.

**Source:** [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "The Snowflake CLI is a command-line tool for developers to manage Snowflake objects and execute commands."

---

## Q91
**Answer: B**

**Explanation:** Tasks enable scheduling SQL statements or stored procedure calls on a recurring basis (CRON or fixed interval). Streams (A) capture change data but do not schedule execution. Pipes (C) are for continuous data loading via Snowpipe. Alerts (D) monitor conditions and trigger actions but are specifically designed for condition-based monitoring rather than general-purpose scheduling.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task allows you to schedule the execution of a SQL statement, including calling a stored procedure or procedural logic using Snowflake Scripting."

---

## Q92
**Answer: B**

**Explanation:** Zero-copy cloning creates a metadata-only copy of a database that references the same underlying micro-partitions. This provides a full-fidelity development environment instantly at minimal initial storage cost (storage is only consumed as data diverges). Maintaining full copies (A) is expensive. Manual subsets (C) risk missing edge cases. Sharing production data directly (D) risks accidental changes and doesn't provide isolation.

**Source:** [Cloning Considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "Cloning creates a copy of a database, schema, or table. A snapshot of data present in the source object is taken when the clone is created and is made available to the cloned object."

---

## Q93
**Answer: B**

**Explanation:** Temporary tables exist only for the duration of the session in which they are created. They are not visible to other sessions and are automatically dropped when the session ends. They do not persist until explicitly dropped (A) — that is a permanent table. They are not visible to all users (C). They do not last 24 hours (D).

**Source:** [Temporary Tables](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Temporary tables exist only within the session in which they were created and persist only for the remainder of the session."

---

## Q94
**Answer: A, B**

**Explanation:** Snowpark ML model registry allows deploying, versioning, and managing ML models trained outside Snowflake. External functions enable calling externally hosted model endpoints (e.g., SageMaker, custom APIs) for inference. There is no built-in neural network training service (C). AUTO_ML is not a standard Snowflake parameter (D). SQL-only inference without integration (E) is not applicable for externally trained models.

**Source:** [Snowpark ML Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowpark ML Model Registry allows you to manage models and deploy them for inference in Snowflake."

---

## Q95
**Answer: B**

**Explanation:** Replication groups and failover groups can replicate not only databases but also account-level objects such as users, roles, warehouses, integrations, and network policies. This provides comprehensive DR coverage. Database replication alone (A) only covers data. GET_DDL scripts (C) are manual and error-prone. Zero-copy cloning (D) does not work across accounts.

**Source:** [Replication Groups](https://docs.snowflake.com/en/user-guide/account-replication-config)

**Quote:** "A replication group is a defined collection of objects in a source account that are replicated as a unit to one or more target accounts. Objects can include databases, shares, and account-level objects."

---

## Q96
**Answer: B**

**Explanation:** The NOORDER option for sequences allows Snowflake to generate values without guaranteeing strict ordering across concurrent sessions, which improves performance for parallel inserts since nodes don't need to coordinate. Strict ascending order (A) is the ORDER option. NOORDER doesn't generate random values (C) or remove the sequence (D).

**Source:** [CREATE SEQUENCE](https://docs.snowflake.com/en/sql-reference/sql/create-sequence)

**Quote:** "NOORDER specifies that the values are not generated in a guaranteed order. This option can improve performance for sequence value generation."

---

## Q97
**Answer: B**

**Explanation:** The Snowflake Kafka connector continuously ingests data from Kafka topics into Snowflake tables with low latency. Streams and tasks can then process the landed data incrementally for transformation. Batch loading every hour (A) introduces unacceptable latency for 5M records/hour. Processing each record with external functions (C) is extremely inefficient. External tables (D) don't support continuous ingestion from Kafka.

**Source:** [Snowflake Connector for Kafka](https://docs.snowflake.com/en/user-guide/kafka-connector-overview)

**Quote:** "The Kafka connector reads data from one or more Apache Kafka topics and loads the data into a Snowflake table."

---

## Q98
**Answer: B**

**Explanation:** The CHANGES clause in a SELECT statement allows querying change tracking data from a table over a specified time range or offset, similar to what a stream captures but without consuming the changes. It does not show schema changes (A), modify data (C), or display warehouse configuration (D).

**Source:** [CHANGES Clause](https://docs.snowflake.com/en/sql-reference/constructs/changes)

**Quote:** "The CHANGES clause enables querying change tracking metadata for a table or view within a specified interval without having to create a stream."

---

## Q99
**Answer: A, B**

**Explanation:** Snowflake-managed Iceberg tables benefit from Snowflake handling compaction, optimization, and metadata management automatically, similar to native tables. Additionally, data is stored in open Apache Iceberg format (Parquet data files + Iceberg metadata), making it accessible by other engines like Spark. External tables do not provide better performance (C). Iceberg tables do require a storage integration (D). External tables do not support ACID transactions (E).

**Source:** [Apache Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Snowflake-managed Iceberg tables use Snowflake as the Iceberg catalog and provide full Snowflake platform support, including automatic maintenance."

---

## Q100
**Answer: B**

**Explanation:** For PHI (Protected Health Information), data sovereignty must be maintained. Non-PHI data can be shared across regions using Cross-Cloud Auto-Fulfillment, while PHI data should remain in the originating region with access provided through secure applications or views within that region. Sharing all data including PHI across regions (A) violates compliance. Replicating PHI everywhere (C) creates unnecessary risk. External file sharing (D) lacks governance.

**Source:** [Secure Data Sharing Across Regions](https://docs.snowflake.com/en/user-guide/secure-data-sharing-across-regions-plaforms)

**Quote:** "Auto-fulfillment enables providers to share data with consumers in different regions and cloud platforms."

---

## Q101
**Answer: B**

**Explanation:** Tasks can reference streams using the SYSTEM$STREAM_HAS_DATA function in the WHEN clause, enabling conditional execution only when new change data is available in the stream. This prevents unnecessary task runs when there are no changes to process. Tasks do not automatically create streams (A). Streams complement tasks but don't replace them (C). Tasks and streams are designed to work together (D).

**Source:** [Streams and Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can check whether a stream contains change data by using SYSTEM$STREAM_HAS_DATA in the WHEN condition."

---

## Q102
**Answer: B**

**Explanation:** Snowpark Container Services enables running containerized workloads (including AI/ML models for image processing) within Snowflake's security perimeter. The model processes images and stores extracted metadata in Snowflake tables, which can then be joined with structured sales data using standard SQL. Storing images in VARIANT (A) is impractical for binary files. External functions only (C) don't provide data storage. Converting images to JSON (D) doesn't make sense for image processing.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services is a fully managed container offering that allows you to deploy, manage, and scale containerized applications directly within Snowflake."

---

## Q103
**Answer: B**

**Explanation:** In Data Vault 2.0, the Business Vault is a layer built on top of the Raw Vault that applies business rules, calculations, and derived data. It is not considered a system of record (the Raw Vault is). The Business Vault bridges the gap between the raw integration layer and the information delivery layer. It is not a specialized Hub (A), landing area (C), or Link table (D).

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "Business Vault applies business rules and soft rules on top of the Raw Vault to create business-meaningful derived data."

---

## Q104
**Answer: A, C**

**Explanation:** The Snowflake Kafka connector is purpose-built for streaming data ingestion from Apache Kafka. The Snowflake Spark connector is purpose-built for reading and writing data between Apache Spark and Snowflake. The JDBC driver (B) is a general-purpose driver, not purpose-built for a specific scenario. There is no "REST connector" (D) or "XML driver" (E) as dedicated Snowflake connectors.

**Source:** [Snowflake Connectors and Drivers](https://docs.snowflake.com/en/user-guide/conns-drivers)

**Quote:** "Snowflake provides connectors and drivers for connecting to Snowflake, including the Kafka connector for streaming ingestion and the Spark connector for Spark integration."

---

## Q105
**Answer: B**

**Explanation:** Creating a centralized analytics database that imports all departmental shares allows cross-functional queries by joining data from all departments in one place. This avoids the complexity of pair-wise sharing (A), which grows quadratically with the number of departments. Replicating all databases (C) is costly and redundant. Exporting to a shared file system (D) loses real-time access and governance.

**Source:** [Working with Shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "A consumer creates a database from a share to access shared data, which can then be queried alongside other databases."

---

## Q106
**Answer: A**

**Explanation:** Serverless tasks (created without specifying a WAREHOUSE parameter) use Snowflake-managed compute resources, eliminating the need for a user-managed warehouse. Snowflake automatically provisions and manages the compute. External functions (B) call external APIs. Snowpipe (C) is for data loading. Multi-cluster warehouses (D) are user-managed.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "If you create a task without specifying a warehouse, the task uses serverless compute resources managed by Snowflake."

---

## Q107
**Answer: B**

**Explanation:** Snowpark Python stored procedures allow migrating existing Python transformations to run natively within Snowflake, reducing external infrastructure. Airflow can continue as the orchestrator calling Snowpark procedures, or Snowflake tasks can replace Airflow for simpler orchestration needs. Rewriting everything in SQL (A) loses Python logic. Running everything externally (C) doesn't reduce infrastructure. JavaScript UDFs (D) cannot replicate Python's data science ecosystem.

**Source:** [Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/index)

**Quote:** "With Snowpark, developers can write code in Python and execute it directly in Snowflake without moving data."

---

## Q108
**Answer: B**

**Explanation:** UDTFs (User-Defined Table Functions) can return multiple rows and columns (a tabular result), enabling operations like data generation, unpivoting, and complex transformations that produce variable-length output per input row. Scalar UDFs return a single value per input row. UDTFs are not inherently faster (A), cannot execute DDL (C), and do require a warehouse (D).

**Source:** [User-Defined Table Functions](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "A UDTF can return multiple rows and multiple columns for each input row, which makes it useful for operations that need to produce a variable number of output rows."

---

## Q109
**Answer: A, B**

**Explanation:** Snowflake CLI (snow) supports deploying objects from version-controlled definitions, enabling CI/CD pipelines. Terraform with the Snowflake provider manages Snowflake infrastructure as code with state management. SHOW commands for email (C) are not a CI/CD approach. Manual SQL via web UI (D) is not automated. Database replication (E) is for DR, not deployment.

**Source:** [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "Use the Snowflake CLI to manage Snowflake objects and deploy changes from your local development environment."

---

## Q110
**Answer: B**

**Explanation:** Streams capture CDC changes (inserts, updates, deletes) from the landing table. A task then periodically executes a MERGE statement that implements SCD Type 2 logic: closing existing records (setting end dates) and inserting new current records. Full table refresh (A) is wasteful and loses history. Individual DELETE/INSERT (C) is inefficient. Time Travel (D) is for ad-hoc historical queries, not for maintaining SCD tables.

**Source:** [Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream records data manipulation language (DML) changes made to a table, including inserts, updates, and deletes."

---

## Q111
**Answer: B**

**Explanation:** When you clone a database, share definitions are not included in the clone. The cloned database is an independent copy that does not inherit any shares from the original. Shares are not cloned with consumers (A), the clone does not become a consumer (C), and there is no re-activation mechanism (D).

**Source:** [Cloning Considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "Cloning a database does not clone any of its shares."

---

## Q112
**Answer: B**

**Explanation:** Snowflake supports data product paradigms through listings (private or Marketplace) for distribution, secure data sharing with secure views for controlled access, dynamic tables for maintaining data freshness SLAs, and data quality monitoring features. Standard tables with RBAC only (A) lack discoverability and data contracts. External functions (C) are not suited for data products. Replication groups alone (D) don't provide discoverability.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Snowflake Marketplace provides a platform for providers to publish data products and for consumers to discover and access them."

---

## Q113
**Answer: B**

**Explanation:** A repository stage is a named stage object in Snowflake that references a Git repository, allowing Snowflake to access files from the repository and execute them (e.g., as stored procedures, UDFs, or Streamlit apps). It is not a traditional internal stage (A), a merge conflict area (C), or an external stage to GitHub storage (D).

**Source:** [Git Integration](https://docs.snowflake.com/en/developer-guide/git/git-overview)

**Quote:** "A repository stage is a type of Snowflake stage that acts as a local representation of a connected Git repository."

---

## Q114
**Answer: A, C**

**Explanation:** External functions call remote services (such as AWS Lambda, Azure Functions, or Google Cloud Functions) via an API integration configured in Snowflake. Because they make network calls to external endpoints, they can introduce latency compared to native functions. They do not execute within Snowflake's compute layer (B). External functions can return tabular results via UDTFs (D is wrong). They do not require VPS (E).

**Source:** [External Functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that is executed outside of Snowflake. The remotely executed code is known as a remote service."

---

## Q115
**Answer: B**

**Explanation:** Consumers can create their own views or tables that join the imported shared database with their own internal tables, enriching the shared data with proprietary information. Consumers cannot modify shared data directly (A). The provider does not include consumer data (C). Shared data can absolutely be joined with local data (D is wrong).

**Source:** [Using Shared Data](https://docs.snowflake.com/en/user-guide/data-sharing-consumer)

**Quote:** "As a data consumer, you can query data shared with you just like any other data in your account, including joining shared data with your own tables."

---

## Q116
**Answer: B**

**Explanation:** METADATA$FILENAME is a metadata column available during data loading that identifies the source file name for each row being loaded from a stage. This is useful for auditing, debugging, and tracking data provenance. It does not rename files (A), compress them (C), or filter by extension during unloading (D).

**Source:** [Querying Metadata for Staged Files](https://docs.snowflake.com/en/user-guide/querying-metadata)

**Quote:** "METADATA$FILENAME returns the name of the staged data file the current row belongs to."

---

## Q117
**Answer: B**

**Explanation:** Snowpipe Streaming provides sub-second, low-latency ingestion for real-time dashboards, while batch COPY INTO handles bulk data loads efficiently. Dynamic tables can consolidate both real-time and batch data into unified consumption views with declarative refresh logic. A single batch pipeline (A) cannot meet sub-minute requirements. External tables only (C) lack ingestion capabilities. Querying OLTP directly (D) creates performance issues on the source.

**Source:** [Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Snowpipe Streaming enables low-latency loading of streaming data rows using the Snowflake Ingest SDK."

---

## Q118
**Answer: C**

**Explanation:** Sequence objects in Snowflake are schema-level objects, meaning they are contained within a specific schema and referenced as database.schema.sequence_name. They are not account-level (A), database-level (B), or table-level (D).

**Source:** [CREATE SEQUENCE](https://docs.snowflake.com/en/sql-reference/sql/create-sequence)

**Quote:** "Creates a new sequence, which is a schema-level object that generates unique numbers."

---

## Q119
**Answer: A, C**

**Explanation:** Shared data is read-only for consumers — they cannot modify the provider's underlying data. Secure views should be used to restrict which rows and columns consumers can access, providing fine-grained access control. Sharing within the same region does not incur data transfer costs (B). Consumers use their own warehouses, not the provider's (D). Shares do not automatically expire (E).

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shared data is always read-only for consumers. Consumers use their own compute resources to query shared data."

---

## Q120
**Answer: B**

**Explanation:** Snowflake's columnar micro-partition architecture is not optimized for single-row updates. Batching updates into micro-batches, landing them in a staging table, using streams to capture changes, and applying them via MERGE minimizes micro-partition churn and is much more efficient. Individual UPDATE statements (A) cause excessive micro-partition rewrites. Re-creating the table (C) is wasteful. External tables (D) are read-only.

**Source:** [Data Loading Best Practices](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare)

**Quote:** "Batch your data into larger, fewer files for optimal loading performance rather than loading many small files."

---

## Q121
**Answer: B**

**Explanation:** SYSTEM$STREAM_HAS_DATA checks whether a stream has unconsumed change data available. This is commonly used in a task's WHEN condition to avoid running tasks when there is nothing to process. It does not count rows (A), reset offsets (C), or create streams (D).

**Source:** [SYSTEM$STREAM_HAS_DATA](https://docs.snowflake.com/en/sql-reference/functions/system_stream_has_data)

**Quote:** "Returns a Boolean value that indicates whether a specified stream contains change tracking data."

---

## Q122
**Answer: B**

**Explanation:** The Snowflake SQL API is a REST-based interface that supports stateless, asynchronous query execution — ideal for web applications that don't need persistent database connections. It supports submitting queries and polling for results. JDBC (A) and ODBC (C) require persistent connections. Python connector with long-lived sessions (D) doesn't match the stateless web application requirement.

**Source:** [Snowflake SQL API](https://docs.snowflake.com/en/developer-guide/sql-api/index)

**Quote:** "The SQL API is a REST API that you can use to access and update data in a Snowflake database."

---

## Q123
**Answer: B**

**Explanation:** Schema detection automatically detects column definitions from staged data files, and schema evolution (ENABLE_SCHEMA_EVOLUTION) allows tables to automatically add new columns or evolve types when source data changes. Dynamic data masking (A) is for security. Automatic clustering (C) is for query optimization. Stream-based change tracking (D) tracks data changes, not schema changes.

**Source:** [Schema Detection and Evolution](https://docs.snowflake.com/en/user-guide/data-load-schema-detection)

**Quote:** "Snowflake can automatically detect the schema of staged data files and can evolve a table's schema to match changes in the input data."

---

## Q124
**Answer: A, C**

**Explanation:** Snowflake Cortex LLM functions include SUMMARIZE for text summarization and SENTIMENT for sentiment analysis, both of which operate directly on text data in Snowflake tables using SQL. Training custom LLMs from scratch (B) is not supported. LLM functions don't replace stored procedures (D). They don't compile Snowpark code (E).

**Source:** [Cortex LLM Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)

**Quote:** "Snowflake Cortex LLM functions provide access to large language models for tasks such as text summarization, sentiment analysis, and text completion."

---

## Q125
**Answer: B**

**Explanation:** Dynamic tables enable declarative transformations — you define what the output should look like as a SQL query, and Snowflake manages when and how refreshes happen based on the target lag setting. Chaining dynamic tables across layers minimizes pipeline maintenance. Stored procedures with tasks (A) require imperative orchestration. Materialized views (C) have restrictions on supported SQL. CTAS with tasks (D) requires full refreshes.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables let you define the target of a data pipeline as a query. Snowflake automates the process of transforming data by managing the refresh schedule."

---

## Q126
**Answer: B**

**Explanation:** A secure UDF hides its definition from users who have USAGE privilege but not OWNERSHIP, preventing exposure of internal business logic or proprietary algorithms. It does not encrypt return values (A), restrict access to ACCOUNTADMIN (C), or validate input parameters (D).

**Source:** [Secure UDFs](https://docs.snowflake.com/en/developer-guide/udf/udf-secure)

**Quote:** "Designating a UDF as secure hides the UDF definition from users who are not the UDF owner."

---

## Q127
**Answer: B**

**Explanation:** When a consumer installs a Marketplace listing, a shared database is created in their account. This database auto-updates as the provider refreshes the data, requiring no manual downloads or ETL. The consumer can join Marketplace data with their own internal tables using standard SQL. Manual downloads (A) are unnecessary. ETL pipelines (C) are not needed. There is no special query interface (D).

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Consumers can discover, try, and purchase data products and applications through the Snowflake Marketplace."

---

## Q128
**Answer: B**

**Explanation:** File format objects define the structure and format (CSV, JSON, Parquet, Avro, ORC, etc.) of data files in cloud storage, which external tables and COPY INTO operations use to parse the data correctly. Storage integration (A) handles authentication to cloud storage. Named stage (C) specifies the location. Stream (D) tracks changes.

**Source:** [File Formats](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "A named file format specifies the set of format options used to describe a set of staged data to access or load into Snowflake tables."

---

## Q129
**Answer: A, B**

**Explanation:** Snowflake micro-partitions each store between 50 MB and 500 MB of uncompressed data, and they are immutable — any DML operation that modifies data creates new micro-partitions rather than updating existing ones. Users do not manually define partition boundaries (C) — Snowflake manages this automatically. Micro-partitions use columnar storage, not row-based (D). They do not span multiple tables (E).

**Source:** [Micro-partitions & Data Clustering](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions)

**Quote:** "All data in Snowflake tables is automatically divided into micro-partitions, which are contiguous units of storage between 50 MB and 500 MB of uncompressed data."

---

## Q130
**Answer: B**

**Explanation:** Loading data into a staging table first and then using MERGE or INSERT with deduplication logic (e.g., ROW_NUMBER() with QUALIFY) to load unique records into the target table is the most scalable approach for handling duplicates. UNIQUE constraints (A) are not enforced in Snowflake (except NOT NULL). Rejecting entire files (C) is overly restrictive. External functions for dedup checks (D) add unnecessary latency.

**Source:** [MERGE](https://docs.snowflake.com/en/sql-reference/sql/merge)

**Quote:** "MERGE can insert, update, and delete in a single statement, which is useful for applying changes from a staging table to a target table."

---

## Q131
**Answer: B**

**Explanation:** Standard streams capture all DML changes: inserts, updates, and deletes. Append-only streams capture only insert operations. This makes append-only streams useful for scenarios like tracking new records appended to a log or event table. The description in (A) is reversed. Latency (C) is not the differentiator. Both stream types work with permanent tables (D).

**Source:** [Stream Types](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "An append-only stream tracks row inserts only. Update and delete operations are not recorded."

---

## Q132
**Answer: B**

**Explanation:** Snowpipe Streaming using the Snowflake Ingest SDK provides sub-second row-level ingestion, meeting the 10-second latency requirement for 600K records/minute from 50K IoT devices. Scheduled COPY INTO (A) cannot run every 10 seconds efficiently. Standard Snowpipe (C) depends on file notifications and has higher latency. Direct INSERT statements (D) would be extremely inefficient at this scale.

**Source:** [Snowpipe Streaming](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview)

**Quote:** "Snowpipe Streaming enables low-latency loading of streaming data rows using the Snowflake Ingest SDK, without requiring staging files."

---

## Q133
**Answer: A**

**Explanation:** The ENABLE_SCHEMA_EVOLUTION table property allows Snowflake to automatically add new columns or modify nullable column types when loading data files that contain schema elements not present in the target table. It does not prevent schema changes (B), create versions (C), or maintain a separate audit table (D).

**Source:** [Schema Evolution](https://docs.snowflake.com/en/user-guide/data-load-schema-detection)

**Quote:** "When schema evolution is enabled, columns in the loaded data files that are not present in the target table are automatically added to the table."

---

## Q134
**Answer: A, B**

**Explanation:** COPY INTO @stage_name FROM table_name unloads data to a stage (internal or external), and the GET command downloads data from an internal stage to a local file system. Direct VARIANT export to external databases (C) is not a supported method. SHOW TABLES (D) is for metadata, not data export. Snowpark DataFrame write operations (E) are valid for writing data but the question asks about unloading to cloud storage specifically — COPY INTO and GET are the primary methods.

**Source:** [Unloading Data](https://docs.snowflake.com/en/user-guide/data-unload-overview)

**Quote:** "You can unload data from a Snowflake table into files in a stage using the COPY INTO <location> command."

---

## Q135
**Answer: B**

**Explanation:** A data mesh approach is favored when domain teams have deep expertise in their own data and need autonomy to evolve their data products independently. With 20 domain teams, centralized management (A) creates a bottleneck. Homogeneous data (C) favors centralization. Minimizing objects (D) is not a driver for architecture choice.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Snowflake enables organizations to share data seamlessly across accounts, supporting decentralized data management architectures."

---

## Q136
**Answer: B**

**Explanation:** The COPY_GRANTS clause preserves the access control grants (privileges) from the source object on the cloned object, so users retain their existing access. It does not copy data (A) — cloning already does that. It does not grant the cloner full ownership (C). It does not copy network policies (D).

**Source:** [COPY GRANTS](https://docs.snowflake.com/en/sql-reference/sql/create-clone)

**Quote:** "COPY GRANTS retains the access privileges from the source object in the cloned object."

---

## Q137
**Answer: B**

**Explanation:** Separate warehouses matched to workload characteristics provide the best architecture. A multi-cluster warehouse for analysts handles concurrent interactive queries with auto-scaling. A larger single-cluster warehouse for data science handles compute-intensive batch Snowpark jobs. A single shared warehouse (A) creates resource contention. Only serverless (C) doesn't cover all workloads. One warehouse per user (D) is wasteful and unmanageable.

**Source:** [Multi-cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are designed to handle queuing and concurrency issues by allocating additional compute clusters as needed."

---

## Q138
**Answer: C**

**Explanation:** Once data enters the Fail-safe period (after Time Travel expires), customers cannot recover it themselves. Only Snowflake support can attempt recovery on a best-effort basis, typically for catastrophic scenarios. UNDROP (A) works only during the Time Travel period. AT/BEFORE syntax (B) also only works during Time Travel. Fail-safe data is not permanently irrecoverable (D) — Snowflake support may be able to recover it.

**Source:** [Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Fail-safe provides a (non-configurable) 7-day period during which data may be recoverable by Snowflake. This period starts immediately after the Time Travel retention period ends."

---

## Q139
**Answer: A, C**

**Explanation:** Database replication is needed when sharing data between accounts in different regions or cloud providers where direct sharing or auto-fulfillment is not suitable. It's also required for creating a read-write copy of a database in another account for disaster recovery (failover). Same-region sharing (B) works with direct data sharing. Direct sharing provides real-time access (D). Non-Snowflake consumers (E) require different approaches like Iceberg or exports.

**Source:** [Database Replication](https://docs.snowflake.com/en/user-guide/db-replication-intro)

**Quote:** "Database replication enables replicating a database from a source account to one or more target accounts in the same or different regions."

---

## Q140
**Answer: B**

**Explanation:** Snowflake Native Apps run within the consumer's account, accessing the consumer's data locally with permissions the consumer explicitly grants during installation. The consumer's data never leaves their account, maintaining data governance and privacy. Exporting data to the provider (A) violates data governance. Remote access (C) is not how Native Apps work. Sending samples (D) doesn't provide comprehensive data quality checks.

**Source:** [Snowflake Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "A Snowflake Native App runs within the consumer's account, enabling providers to deliver functionality without the consumer's data leaving their account."

---

## Q141
**Answer: B**

**Explanation:** An alert in Snowflake monitors a specified condition using a SQL query and triggers an action (such as sending a notification or calling a stored procedure) when the condition evaluates to true. It is not specifically for warehouse suspension (A), Snowflake support (C), or stock prices (D).

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "An alert is a schema-level object that specifies a condition, a schedule for evaluating the condition, and an action to take when the condition is met."

---

## Q142
**Answer: B**

**Explanation:** Snowflake-managed Iceberg tables store data in open Apache Iceberg format (Parquet files with Iceberg metadata), making the data accessible by other engines like Databricks. This provides interoperability without requiring Snowflake for consumption. Reader accounts (A) still require Snowflake for access. CSV exports (C) lose structure and efficiency. The Spark connector (D) requires ongoing Snowflake connectivity.

**Source:** [Apache Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Snowflake-managed Iceberg tables store data in Apache Parquet format with Iceberg metadata, enabling interoperability with other processing engines."

---

## Q143
**Answer: B**

**Explanation:** When a table-level DATA_RETENTION_TIME_IN_DAYS setting exceeds the account-level default, the table uses the higher table-level setting, up to the maximum allowed by the account's Snowflake edition (e.g., up to 90 days for Enterprise Edition). The table-level setting is not ignored (A). No error is raised (C). The lower value is not used (D).

**Source:** [Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "The retention period can be set at the account, database, schema, or table level. The object-level setting overrides the higher-level setting."

---

## Q144
**Answer: A, C**

**Explanation:** Streams require explicit task-based orchestration for processing (imperative), while dynamic tables are declarative — you define the query and Snowflake manages refreshes. Streams provide exact change records with metadata (METADATA$ACTION, METADATA$ISUPDATE) showing inserts, updates, and deletes, while dynamic tables provide the materialized result of a transformation. Dynamic tables are not limited to single tables (B). Dynamic tables don't always have lower latency (D). Streams work with permanent tables (E).

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables are a declarative alternative to streams and tasks for creating data transformation pipelines."

---

## Q145
**Answer: B**

**Explanation:** An append-only design using INSERT for new records and soft deletes (status flags like 'CANCELLED' or 'VOIDED') ensures no physical deletion occurs. Streams track all changes for downstream processing. Using UPDATE with Time Travel (A) only provides temporary history (Time Travel has limited retention). Snowflake doesn't support traditional triggers (C). Transient tables (D) have no Fail-safe and are not appropriate for immutable audit trails.

**Source:** [Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "Streams record changes made to a table, providing a change log that can be consumed by downstream processes."

---

## Q146
**Answer: B**

**Explanation:** Snowpark Container Services enables deploying and running full-stack containerized applications (web servers, ML models, custom services) within Snowflake's security and governance perimeter. Streamlit in Snowflake (A) is limited to Streamlit Python apps. External functions (C) run outside Snowflake. JavaScript stored procedures (D) are limited to procedural SQL logic.

**Source:** [Snowpark Container Services](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services lets you deploy, manage, and scale containerized applications directly within Snowflake."

---

## Q147
**Answer: B**

**Explanation:** A task DAG with sequential dependencies ensures each stage runs only after its predecessor completes successfully. If any stage fails, subsequent dependent tasks do not execute. A single stored procedure (A) works but is less maintainable and harder to monitor/retry individual stages. Independent schedules (C) don't handle dependencies. Materialized views (D) cannot be chained for procedural processing.

**Source:** [Task DAGs](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Tasks can be organized into DAGs (directed acyclic graphs) to define dependencies between tasks. A child task runs only after its predecessor task completes successfully."

---

## Q148
**Answer: B**

**Explanation:** The INFER_SCHEMA function detects the schema (column names and data types) of files in a stage, allowing automatic table creation matching the file structure without manual schema definition. It does not automatically load data (A), validate data quality (C), or compress files (D).

**Source:** [INFER_SCHEMA](https://docs.snowflake.com/en/sql-reference/functions/infer_schema)

**Quote:** "The INFER_SCHEMA function detects the file metadata schema in a set of staged data files that contain semi-structured data."

---

## Q149
**Answer: A, C**

**Explanation:** Key architectural decisions for Data Vault 2.0 in Snowflake include choosing hash key algorithms (MD5, SHA-256) for generating surrogate keys for Hubs and Links, and determining the grain of Satellite tables along with the change tracking approach (full history vs. latest-only satellites). Enforced foreign keys (B) are not used since Snowflake constraints are informational. Cloud provider choice (D) is an infrastructure decision, not a data vault design decision. Materialized views for all Satellites (E) is not a standard approach.

**Source:** [Data Vault Modeling in Snowflake](https://docs.snowflake.com/en/user-guide/data-modeling-data-vault)

**Quote:** "In Data Vault 2.0, hash keys are used as surrogate keys for Hubs and Links, providing a deterministic and reproducible key generation mechanism."

---

## Q150
**Answer: B**

**Explanation:** A comprehensive DR strategy uses multiple Snowflake features: Time Travel for recovering from data corruption within the retention period, zero-copy cloning for creating point-in-time snapshots before deployments, database failover groups for automated region-level DR with replication to a secondary account, and UNDROP for recovering accidentally dropped objects. Time Travel alone (A) doesn't cover region outages. Data exports (C) are slow and error-prone. Fail-safe alone (D) is a last resort with no customer self-service recovery.

**Source:** [Business Continuity and Disaster Recovery](https://docs.snowflake.com/en/user-guide/db-failover-failback)

**Quote:** "Failover groups enable replication of objects from a source account to one or more target accounts and failover of the replicated objects in a target account."

---
