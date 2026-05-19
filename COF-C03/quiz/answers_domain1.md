# Domain 1: Answers

---

## Q1
**Answer: C**

**Explanation:** Snowflake uses a hybrid architecture combining shared-disk (central storage accessible by all compute nodes) and shared-nothing (independent MPP compute clusters). It is not purely one architecture or the other, nor peer-to-peer.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake's architecture is a hybrid of traditional shared-disk and shared-nothing database architectures."

---

## Q2
**Answer: D**

**Explanation:** Virtual Private Snowflake (VPS) provides complete hardware isolation with a dedicated metadata store and separate compute resources, isolated from all other Snowflake accounts. Enterprise and Business Critical do not offer this level of isolation.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Virtual Private Snowflake offers our highest level of security for organizations that have the strictest requirements... in a completely separate Snowflake environment, isolated from all other Snowflake accounts."

---

## Q3
**Answer: B, D**

**Explanation:** The Cloud Services layer handles authentication/access control (B) and query parsing/optimization (D). Storing data in micro-partitions (A) and compressing data (E) are Storage layer functions. Executing SQL with warehouses (C) is a Compute layer function.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer is a collection of services that coordinate activities across Snowflake. Services managed in this layer include: Authentication, Infrastructure management, Metadata management, Query parsing and optimization, Access control."

---

## Q4
**Answer: B**

**Explanation:** The separation of storage and compute allows each to scale independently. You can add compute without changing storage and vice versa. Data is not replicated to every node, and users do not manage infrastructure separately.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake's unique architecture... enables storage and compute to scale independently."

---

## Q5
**Answer: B**

**Explanation:** The ability to scale compute independently while storage remains unchanged means the company can increase warehouse size during heavy weekend loads and reduce it during lighter weekday usage. Permanently provisioning the largest warehouse is wasteful, and the Cloud Services layer does not buffer queries.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Storage and compute can scale independently... Snowflake separates storage and compute."

---

## Q6
**Answer: C**

**Explanation:** The Cloud Services layer handles infrastructure management, metadata management, query optimization, authentication, and access control. The Storage layer handles persistent data, and the Compute layer executes queries.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer is a collection of services that coordinate activities across Snowflake. Services managed in this layer include: Authentication, Infrastructure management, Metadata management, Query parsing and optimization, Access control."

---

## Q7
**Answer: B, D**

**Explanation:** Tri-Secret Secure (customer-managed encryption keys) and private connectivity (AWS PrivateLink, Azure Private Link, Google Cloud Private Service Connect) are Business Critical features. Multi-cluster warehouses (A), 90-day Time Travel (C), and masking policies (E) are Enterprise features.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Customer-managed encryption keys through Tri-Secret Secure" and "Support for private connectivity to the Snowflake service" are listed under Business Critical Edition.

---

## Q8
**Answer: B**

**Explanation:** Each virtual warehouse is an independent MPP compute cluster. Warehouses do not share compute resources with each other, providing full resource isolation. This applies to all editions, not just VPS.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Each virtual warehouse is an independent compute cluster that does not share compute resources with other virtual warehouses."

---

## Q9
**Answer: C**

**Explanation:** Cloud Services layer charges are typically covered when they stay under 10% of daily compute usage. Excessive metadata operations (SHOW commands, small queries served entirely by the metadata cache, frequent login/authentication) can push Cloud Services charges above this threshold.

**Source:** [Understanding Compute Cost](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)

**Quote:** "Snowflake charges for cloud services usage only when daily consumption exceeds 10% of the daily usage of the compute resources."

---

## Q10
**Answer: B**

**Explanation:** Materialized views are an Enterprise Edition (and higher) feature. They are not available in Standard Edition. Business Critical and VPS also support them, but Enterprise is the minimum.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Materialized views" is listed as an Enterprise Edition feature.

---

## Q11
**Answer: B**

**Explanation:** Snowflake stores all persistent data in a centralized cloud storage layer (e.g., S3, Azure Blob, GCS) managed by Snowflake. Data is not stored on local compute node disks or in the Cloud Services layer.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake uses a central data repository for persisted data that is accessible from all compute nodes in the platform."

---

## Q12
**Answer: C**

**Explanation:** Business Critical Edition is designed for organizations with sensitive data (such as PHI/PCI) requiring higher security including database failover/replication, Tri-Secret Secure, and HIPAA/HITRUST compliance support. VPS would also work but is more than the minimum required.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition... is intended for Snowflake accounts that have particularly sensitive data, such as Protected Health Information (PHI)."

---

## Q13
**Answer: B**

**Explanation:** Virtual warehouses are independent MPP compute clusters that execute queries. Compute nodes do not persistently store data (they have local caches only). Warehouses do not share clusters, and authentication is handled by the Cloud Services layer.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "A virtual warehouse, often referred to simply as a 'warehouse', is a named abstraction for a cluster of compute resources in Snowflake."

---

## Q14
**Answer: A, C**

**Explanation:** Multi-cluster warehouses (A) and Time Travel up to 90 days (C) are Enterprise Edition features. Tri-Secret Secure (B) and private connectivity (D) require Business Critical. Automatic encryption (E) is available in all editions.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Multi-cluster virtual warehouses" and "Up to 90 days of Time Travel" are listed under Enterprise Edition features.

---

## Q15
**Answer: C**

**Explanation:** When a warehouse is suspended, the compute resources are deallocated, and all data cached on the local SSD disks of those nodes is lost. The cache is not persisted or transferred elsewhere.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "When a warehouse is suspended, it does not consume any Snowflake credits, but does not maintain its local cache."

---

## Q16
**Answer: B**

**Explanation:** Enterprise Edition provides column-level security (masking policies), multi-cluster warehouses, and 90-day Time Travel. Business Critical would also offer these but includes additional features (Tri-Secret Secure, private connectivity) the company doesn't need, at a higher cost.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Enterprise Edition includes all features of Standard Edition, plus: Multi-cluster virtual warehouses, Up to 90 days of Time Travel, Column-level security."

---

## Q17
**Answer: C**

**Explanation:** The Cloud Services layer manages all metadata, including table statistics such as row counts and min/max values per micro-partition. This metadata enables features like partition pruning and instant answers to certain aggregate queries.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer... Services managed in this layer include: Metadata management."

---

## Q18
**Answer: B**

**Explanation:** Snowflake's architecture consists of three distinct layers: the Cloud Services layer, the Compute layer (virtual warehouses), and the Database Storage layer. There is no separate Network or Security layer in Snowflake's architectural model.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake's unique architecture consists of three key layers: Database Storage, Query Processing (Compute), Cloud Services."

---

## Q19
**Answer: C**

**Explanation:** Simple metadata queries like COUNT(*) can be answered instantly from the metadata cache in the Cloud Services layer without needing to resume a warehouse. The metadata cache stores statistics such as row counts and min/max values. Query result cache returns previous query results; warehouse cache is on compute nodes.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer... Services managed in this layer include: Metadata management."

---

## Q20
**Answer: A, C**

**Explanation:** Data is stored in a columnar format within micro-partitions (A), and all data is automatically encrypted (C). Data is stored in cloud object storage, not on local warehouse disks (B). Partitioning is automatic, not manual (D). Storage and compute have separate billing (E).

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "All data in Snowflake tables is automatically divided into micro-partitions, which are contiguous units of storage" and "Snowflake automatically encrypts all data."

---

## Q21
**Answer: C**

**Explanation:** Database failover and replication for business continuity is a Business Critical Edition feature. Standard and Enterprise editions do not include failover capabilities. VPS also supports it but is not the minimum.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Database failover and replication" is listed under Business Critical Edition features.

---

## Q22
**Answer: B**

**Explanation:** The Query Optimizer resides in the Cloud Services layer and is responsible for generating efficient query execution plans. It does not execute queries (that's the Compute layer), organize data files (Storage layer), or run on the client.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer... Services managed in this layer include: Query parsing and optimization."

---

## Q23
**Answer: A**

**Explanation:** Standard Edition is the lowest cost Snowflake edition and provides the essential features. Multi-cluster warehouses, extended Time Travel, and masking policies are Enterprise features, so Standard Edition is sufficient when those are not needed.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Standard Edition provides a strong balance of features, level of support, and cost."

---

## Q24
**Answer: C**

**Explanation:** Query execution using MPP clusters is the responsibility of the Compute layer (virtual warehouses), not the Cloud Services layer. Authentication, infrastructure management, and metadata management are all Cloud Services layer responsibilities.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Queries are executed in the processing layer. Snowflake processes queries using 'virtual warehouses'. Each virtual warehouse is an MPP compute cluster."

---

## Q25
**Answer: B**

**Explanation:** Snowflake bills storage and compute separately. Storage is charged based on the volume of compressed data stored. Compute is charged based on credits consumed by running virtual warehouses. Neither is free.

**Source:** [Understanding Overall Cost](https://docs.snowflake.com/en/user-guide/cost-understanding-overall)

**Quote:** "Snowflake utilizes a credit-based model for compute, and a capacity-based model for data storage."

---

## Q26
**Answer: A, C**

**Explanation:** The shared-disk component of Snowflake's architecture means there is a central data repository accessible by all compute nodes (A), and data is persisted independently of compute resources (C). Private data stores per node (B) and restricted local access (D) are shared-nothing characteristics.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Similar to shared-disk architectures, Snowflake uses a central data repository for persisted data that is accessible from all compute nodes in the platform."

---

## Q27
**Answer: C**

**Explanation:** Both Tri-Secret Secure and private connectivity (AWS PrivateLink, Azure Private Link, Google Cloud Private Service Connect) are Business Critical Edition features. Enterprise Edition does not include these security features.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Customer-managed encryption keys through Tri-Secret Secure" and "Support for private connectivity to the Snowflake service" are listed under Business Critical Edition.

---

## Q28
**Answer: B**

**Explanation:** Snowflake provides a daily 10% adjustment — Cloud Services charges up to 10% of daily compute credits are included at no additional cost. Only the amount exceeding 10% is billed separately.

**Source:** [Understanding Compute Cost](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)

**Quote:** "Snowflake charges for cloud services usage only when daily consumption exceeds 10% of the daily usage of the compute resources."

---

## Q29
**Answer: C**

**Explanation:** Multi-cluster warehouses automatically add or remove compute clusters to handle varying levels of concurrent queries. They require Enterprise Edition or higher. They are not available in Standard Edition, and they do not replicate data.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "A multi-cluster warehouse consists of 1 or more clusters of compute resources... designed specifically for handling queuing and performance issues related to large numbers of concurrent users and/or queries."

---

## Q30
**Answer: C**

**Explanation:** Transaction management is a service handled by the Cloud Services layer, along with authentication, metadata management, query optimization, and access control. The Compute layer executes queries, and the Storage layer persists data.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer is a collection of services that coordinate activities across Snowflake. Services managed in this layer include: Authentication, Infrastructure management, Metadata management, Query parsing and optimization, Access control."

---

## Q31
**Answer: B**

**Explanation:** Snowflake is a fully managed SaaS platform where the Cloud Services layer handles all infrastructure management, including hardware provisioning, patching, and tuning. Users do not manage any infrastructure.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "The cloud services layer... Services managed in this layer include: Infrastructure management."

---

## Q32
**Answer: B**

**Explanation:** Search Optimization Service is an Enterprise Edition feature. It is not available in Standard Edition. It provides point lookup optimization for selective queries.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Search Optimization Service" is listed under Enterprise Edition features.

---

## Q33
**Answer: A, C**

**Explanation:** The Compute layer executes SQL queries using virtual warehouses (A) and caches data locally on warehouse nodes during query execution (C). User authentication (B) and query plan optimization (E) belong to the Cloud Services layer. Persistent data storage (D) belongs to the Storage layer.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Queries are executed in the processing layer. Snowflake processes queries using 'virtual warehouses'. Each virtual warehouse is an MPP compute cluster composed of multiple compute nodes."

---

## Q34
**Answer: B**

**Explanation:** When creating a virtual warehouse, the default auto-suspend time is 600 seconds (10 minutes) unless otherwise specified. This can be changed via the AUTO_SUSPEND parameter.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "By default, auto-suspend is enabled. The default setting is 600 seconds (10 minutes)."

---

## Q35
**Answer: B**

**Explanation:** On AWS, Snowflake persists data in Amazon S3, which Snowflake manages internally. Data is not stored on EC2 instance local storage, EBS volumes attached to warehouses, or Snowflake-owned hardware. Snowflake uses cloud-native object storage.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake uses a central data repository for persisted data that is accessible from all compute nodes in the platform."

---

## Q36
**Answer: B**

**Explanation:** Snowsight is Snowflake's web-based user interface that provides capabilities for querying, visualizing data, managing database objects, and administering the Snowflake account. It is not a CLI tool, third-party tool, or Python library.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "Snowsight is Snowflake's web interface. You can use Snowsight to perform many of the same tasks in a more intuitive and streamlined manner."

---

## Q37
**Answer: B**

**Explanation:** Snowsight provides built-in charting and dashboard capabilities, allowing analysts to create visualizations directly from query results without external BI tools. SnowSQL is CLI-only, the Snowflake CLI is for developer workflows, and VS Code is for development.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "You can use Snowsight to query data, visualize the results as charts, and create dashboards."

---

## Q38
**Answer: B**

**Explanation:** SnowSQL is Snowflake's command-line client for executing SQL queries, DDL/DML operations, and scripts from a terminal. Snowsight is web-based, Snowpark is a developer framework, and Streamlit is for building apps.

**Source:** [SnowSQL (CLI Client)](https://docs.snowflake.com/en/user-guide/snowsql)

**Quote:** "SnowSQL is the command line client for connecting to Snowflake to execute SQL queries and perform all DDL and DML operations."

---

## Q39
**Answer: B, C**

**Explanation:** Snowsight provides dashboard/visualization capabilities (B) and worksheet management with sharing (C), which SnowSQL cannot do. Both can execute SQL queries (A) and DDL statements (E). PUT commands (D) are actually a SnowSQL capability.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "You can use Snowsight to query data, visualize the results as charts, and create dashboards."

---

## Q40
**Answer: B**

**Explanation:** The Snowflake CLI (snow) is an open-source command-line tool for managing Snowflake objects, deploying Streamlit apps, managing Snowpark projects, and working with Native Apps. It is not the legacy SQL client (that's SnowSQL), not a GUI, and not a Python REPL.

**Source:** [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "Snowflake CLI is an open-source command-line tool for developers to manage Snowflake entities."

---

## Q41
**Answer: C**

**Explanation:** The Snowflake CLI (snow) is designed for developer workflows including deploying Snowpark projects, managing Native App packages, and creating Streamlit apps — ideal for CI/CD pipelines. SnowSQL is primarily for SQL execution, not deployment automation.

**Source:** [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "Snowflake CLI is an open-source command-line tool for developers to manage Snowflake entities, including Snowpark projects, Streamlit apps, and Native App packages."

---

## Q42
**Answer: C**

**Explanation:** Snowflake provides an official VS Code extension that allows developers to connect to Snowflake, write and run SQL, and browse database objects directly within Visual Studio Code. There is no official extension for IntelliJ, Eclipse, or Sublime Text.

**Source:** [Snowflake Extension for Visual Studio Code](https://docs.snowflake.com/en/user-guide/vscode-ext)

**Quote:** "The Snowflake Extension for Visual Studio Code provides an interface for interacting with Snowflake."

---

## Q43
**Answer: B**

**Explanation:** In Snowsight, a worksheet is an interactive editor where users can write and execute SQL or Python code, view results, and save their work. It is not a dashboard, pipeline, or file format.

**Source:** [Using Worksheets in Snowsight](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets)

**Quote:** "Use worksheets in Snowsight to write and run SQL statements or Python code."

---

## Q44
**Answer: B**

**Explanation:** Snowsight supports sharing worksheets with team members and organizing them in folders for collaboration. This is a built-in feature of the worksheet interface, not related to Marketplace, Snowpipe, or resource monitors.

**Source:** [Using Worksheets in Snowsight](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets)

**Quote:** "You can organize worksheets into folders and share them with other users in your account."

---

## Q45
**Answer: B**

**Explanation:** The PUT command (available via SnowSQL or JDBC/ODBC drivers) is used to upload local files to a Snowflake internal stage. Snowsight has limited upload capabilities, and the REST API and Snowflake CLI are not the primary tools for PUT operations.

**Source:** [PUT Command](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Uploads (i.e. stages) data files from a local file system to one of the following Snowflake stages: Named internal stage, Table stage, User stage."

---

## Q46
**Answer: A, C**

**Explanation:** The Snowflake JDBC driver (A) and Python connector (C) are valid programmatic connection methods. FTP (B), SSH to compute nodes (D), and Telnet (E) are not valid ways to connect to Snowflake.

**Source:** [Snowflake Connectors and Drivers](https://docs.snowflake.com/en/developer-guide/drivers)

**Quote:** "Snowflake provides a number of clients, connectors, and drivers for connecting to Snowflake."

---

## Q47
**Answer: B**

**Explanation:** The Snowflake VS Code extension allows developers to write SQL, browse Snowflake objects, and interact with Snowflake directly from within Visual Studio Code. It does not replace Snowsight, deploy via Terraform, or monitor credits.

**Source:** [Snowflake Extension for Visual Studio Code](https://docs.snowflake.com/en/user-guide/vscode-ext)

**Quote:** "The Snowflake Extension for Visual Studio Code provides an interface for interacting with Snowflake."

---

## Q48
**Answer: B**

**Explanation:** SnowSQL is the command-line client designed for executing SQL scripts, using variables, and producing formatted output in a terminal. Snowsight is web-based, Streamlit is for apps, and Marketplace is for data listings.

**Source:** [SnowSQL (CLI Client)](https://docs.snowflake.com/en/user-guide/snowsql)

**Quote:** "SnowSQL is the command line client for connecting to Snowflake to execute SQL queries and perform all DDL and DML operations."

---

## Q49
**Answer: C**

**Explanation:** Snowsight provides visual access to query history, query profiles, and performance metrics through its Activity section. SnowSQL and the Snowflake CLI are command-line tools without visual profiling, and ODBC is a connectivity driver.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "Use the Activity area in Snowsight to monitor queries, review query history, and explore query profiles."

---

## Q50
**Answer: B**

**Explanation:** The Snowflake CLI uses a connections.toml file for storing connection configurations. This is a TOML-format configuration file, not JSON, YAML, or a .conf file.

**Source:** [Snowflake CLI Configuration](https://docs.snowflake.com/en/developer-guide/snowflake-cli/connecting/configure-cli)

**Quote:** "Snowflake CLI uses a connections.toml file to store connection configuration."

---

## Q51
**Answer: B**

**Explanation:** The Snowflake CLI supports local testing of Snowpark functions, allowing developers to test locally before deploying to Snowflake. Running only in Snowsight or deploying directly to production are not recommended practices.

**Source:** [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "Snowflake CLI is an open-source command-line tool for developers to manage Snowflake entities, including Snowpark projects."

---

## Q52
**Answer: A, C**

**Explanation:** Snowsight's Activity section shows query history and warehouse usage (A), and the database object browser allows navigation of tables, views, and schemas (C). Direct SSH access (D) and a built-in ETL designer (E) do not exist in Snowsight.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "Use the Activity area in Snowsight to monitor queries, review query history."

---

## Q53
**Answer: B**

**Explanation:** Snowsight uses username and password authentication by default when accessed through a web browser, with optional MFA (multi-factor authentication). Key-pair, OAuth, and SAML can be configured but are not the default method.

**Source:** [Snowsight: The Snowflake Web Interface](https://docs.snowflake.com/en/user-guide/ui-snowsight)

**Quote:** "Sign in to Snowsight using your Snowflake account credentials."

---

## Q54
**Answer: B**

**Explanation:** SnowSQL is a cross-platform command-line client available for Windows, macOS, and Linux. It is not deprecated, not Windows-only, and supports both DDL and DML operations.

**Source:** [SnowSQL (CLI Client)](https://docs.snowflake.com/en/user-guide/snowsql)

**Quote:** "SnowSQL is the command line client for connecting to Snowflake... It is available on Windows, macOS, and Linux."

---

## Q55
**Answer: C**

**Explanation:** The Snowflake CLI (snow) is designed for developer workflows including managing connection profiles, deploying Snowpark functions, and working with Native App packages from the command line — ideal for infrastructure-as-code patterns. SnowSQL is primarily for SQL execution.

**Source:** [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index)

**Quote:** "Snowflake CLI is an open-source command-line tool for developers to manage Snowflake entities, including Snowpark projects, Streamlit apps, and Native App packages."

---

## Q56
**Answer: C**

**Explanation:** The Organization is the highest level in the Snowflake object hierarchy. Organizations contain accounts, which contain databases, warehouses, users, and roles.

**Source:** [Snowflake Organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "An organization is a first-class Snowflake object that links the accounts owned by your business entity."

---

## Q57
**Answer: B**

**Explanation:** An account is the container for databases, warehouses, users, and roles. An organization contains multiple accounts but does not directly contain these objects.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Snowflake provides the access control framework through accounts, databases, schemas, and the objects within them."

---

## Q58
**Answer: C**

**Explanation:** An Organization provides a unified view across multiple Snowflake accounts, enabling centralized billing management and replication between accounts across different cloud regions. Accounts are individual entities within the organization.

**Source:** [Snowflake Organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "An organization is a first-class Snowflake object that links the accounts owned by your business entity. Organizations simplify account management and billing."

---

## Q59
**Answer: B, D**

**Explanation:** Virtual warehouses (B) and users/roles (D) exist at the account level, outside of any database. Tables (A), views (C), and sequences (E) are schema-level objects within a database.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "A Snowflake account can hold one or more databases, virtual warehouses, users, and roles."

---

## Q60
**Answer: C**

**Explanation:** The correct hierarchy from top to bottom is: Organization → Account → Database → Schema. Within schemas are tables, views, stages, and other objects.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "An organization can contain one or more accounts. Each account contains databases, and each database contains schemas."

---

## Q61
**Answer: B**

**Explanation:** A stage is a named location that holds data files for loading (COPY INTO table) or unloading (COPY INTO location). File formats describe file structure, pipes define Snowpipe ingestion, and streams capture DML changes.

**Source:** [Overview of Data Loading](https://docs.snowflake.com/en/user-guide/data-load-overview)

**Quote:** "A stage specifies where data files are stored (i.e., 'staged') so that the data in the files can be loaded into a table."

---

## Q62
**Answer: B**

**Explanation:** A file format object describes the format of data files (CSV, JSON, Parquet, Avro, ORC, XML) used in COPY INTO operations. It does not define micro-partition layout, encryption, or views.

**Source:** [CREATE FILE FORMAT](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "Creates a named file format that describes a set of staged data to access or load into Snowflake tables."

---

## Q63
**Answer: B**

**Explanation:** A file format object defines reusable parsing rules for data files, including delimiter, header, and encoding settings. This is exactly what's needed for a semicolon-delimited CSV with headers.

**Source:** [CREATE FILE FORMAT](https://docs.snowflake.com/en/sql-reference/sql/create-file-format)

**Quote:** "Creates a named file format that describes a set of staged data to access or load into Snowflake tables."

---

## Q64
**Answer: B, D**

**Explanation:** Schemas (B) are contained within databases, and shares (D) are database-level objects. Virtual warehouses (A), users (C), and roles (E) exist at the account level, not within a database.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Each database contains one or more schemas, which are logical groupings of database objects."

---

## Q65
**Answer: A**

**Explanation:** A schema is a logical grouping (namespace) of database objects such as tables, views, stages, file formats, sequences, and more within a database. It is not a physical partition, warehouse type, or security policy.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Each database contains one or more schemas, which are logical groupings of database objects (tables, views, etc.)."

---

## Q66
**Answer: C**

**Explanation:** A stream is a Snowflake object that records data manipulation language (DML) changes (inserts, updates, deletes) made to a table. Tasks schedule queries, pipes define Snowpipe ingestion, and sequences generate numbers.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream object records data manipulation language (DML) changes made to tables, including inserts, updates, and deletes."

---

## Q67
**Answer: B**

**Explanation:** A sequence generates unique, sequential numbers that can be used as surrogate keys. Streams track table changes, tasks schedule queries, and pipes define Snowpipe ingestion.

**Source:** [CREATE SEQUENCE](https://docs.snowflake.com/en/sql-reference/sql/create-sequence)

**Quote:** "Sequences are used to generate unique numbers across sessions and statements, including concurrent statements."

---

## Q68
**Answer: B**

**Explanation:** A stored procedure encapsulates procedural logic including SQL statements, control flow (branching, looping), and error handling. It is not for creating external tables, defining file formats, or scheduling queries (that's a task).

**Source:** [Stored Procedures Overview](https://docs.snowflake.com/en/sql-reference/stored-procedures-overview)

**Quote:** "A stored procedure contains procedural code that can include SQL statements, control flow logic, and error handling."

---

## Q69
**Answer: A, C**

**Explanation:** Snowflake stored procedures can be written in JavaScript (A), Python (C), as well as Java, Scala, and SQL. Ruby (B), Perl (D), and R (E) are not supported languages for stored procedures.

**Source:** [Stored Procedures Overview](https://docs.snowflake.com/en/sql-reference/stored-procedures-overview)

**Quote:** "Snowflake supports writing stored procedures in: SQL, JavaScript, Python, Java, Scala."

---

## Q70
**Answer: B**

**Explanation:** A UDF is a custom function that accepts input arguments and returns a scalar or tabular result, usable in SQL statements. UDFs can be written in multiple languages (SQL, JavaScript, Python, Java, Scala), not just SQL.

**Source:** [User-Defined Functions Overview](https://docs.snowflake.com/en/sql-reference/udf-overview)

**Quote:** "A user-defined function (UDF) is a function that you create and that can be called from SQL."

---

## Q71
**Answer: C**

**Explanation:** A task is a Snowflake object used to schedule the execution of SQL statements on a defined schedule (e.g., using CRON expressions). Streams track changes, pipes define Snowpipe, and a stored procedure alone doesn't provide scheduling.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can execute a single SQL statement, including a call to a stored procedure. Tasks can be run on a schedule or triggered by changes in a stream."

---

## Q72
**Answer: B**

**Explanation:** A pipe object defines a Snowpipe for continuous, automated data ingestion from files in a stage into a table. It does not schedule SQL, capture changes, or transfer data between warehouses.

**Source:** [Snowpipe Overview](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro)

**Quote:** "Snowpipe enables loading data from files as soon as they're available in a stage. The pipe defines the COPY INTO statement used by Snowpipe."

---

## Q73
**Answer: A, E**

**Explanation:** Streams and Tasks (A) work together — the stream detects new data, and the task processes it on a schedule. Dynamic tables and Streams (E) also create continuous pipelines — dynamic tables can reference streams. Pipes and sequences, file formats and stages, and views and stored procedures do not form continuous pipelines by themselves.

**Source:** [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream object records data manipulation language (DML) changes... A task can consume a stream and process the changes."

---

## Q74
**Answer: B**

**Explanation:** INFORMATION_SCHEMA provides metadata about the objects in a database, including tables, views, columns, functions, and more through system-defined views. It does not store user data, manage warehouses, or store query history.

**Source:** [Snowflake Information Schema](https://docs.snowflake.com/en/sql-reference/info-schema)

**Quote:** "The Snowflake Information Schema (a.k.a. Data Dictionary) consists of a set of system-defined views and table functions that provide extensive metadata information about the objects in a database."

---

## Q75
**Answer: C**

**Explanation:** CURRENT_DATABASE() returns the name of the database currently in use for the session. CURRENT_WAREHOUSE() returns the warehouse, CURRENT_SCHEMA() returns the schema, and CURRENT_ACCOUNT() returns the account.

**Source:** [Session Context Functions](https://docs.snowflake.com/en/sql-reference/functions/current_database)

**Quote:** "Returns the name of the database currently in use for the session."

---

## Q76
**Answer: B**

**Explanation:** The USE DATABASE command sets the active database context for the current session. SET DATABASE is not valid SQL, SELECT DATABASE is not a context-setting command, and CONNECT TO is not a Snowflake command.

**Source:** [USE DATABASE](https://docs.snowflake.com/en/sql-reference/sql/use-database)

**Quote:** "Specifies the active/current database for the session."

---

## Q77
**Answer: A, C**

**Explanation:** CURRENT_ROLE() (A) and CURRENT_WAREHOUSE() (C) are valid session context functions. CURRENT_CLOUD(), CURRENT_PARTITION(), and CURRENT_CLUSTER() do not exist as Snowflake session context functions.

**Source:** [Session Context Functions](https://docs.snowflake.com/en/sql-reference/functions/current_role)

**Quote:** "Returns the name of the role in use for the current session."

---

## Q78
**Answer: B**

**Explanation:** In Snowflake's parameter hierarchy, the precedence from highest to lowest is: Object → Session → Account. An object-level setting overrides session, which overrides account-level settings.

**Source:** [Parameter Hierarchy and Types](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Parameters can be set at the account, session, and object level. Object-level parameters take precedence over session-level, which take precedence over account-level."

---

## Q79
**Answer: B**

**Explanation:** Session-level parameters override account-level parameters. Since session has higher precedence than account in the parameter hierarchy, the session-level value takes effect.

**Source:** [Parameter Hierarchy and Types](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Session-level parameters take precedence over account-level parameters."

---

## Q80
**Answer: B**

**Explanation:** The session-level value of 600 seconds overrides the account-level value of 3600 seconds because session has higher precedence than account in Snowflake's parameter hierarchy. It is not always the lower value.

**Source:** [Parameter Hierarchy and Types](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Session-level parameters take precedence over account-level parameters."

---

## Q81
**Answer: C**

**Explanation:** The object level applies to individual objects like virtual warehouses, databases, schemas, and tables. Account level applies to the entire account, and session level applies to the current user session.

**Source:** [Parameter Hierarchy and Types](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Parameters can be set at the account, session, and object level."

---

## Q82
**Answer: B**

**Explanation:** Account identifiers uniquely identify a Snowflake account for connection URLs, cross-account operations (like data sharing), and API calls. They do not encrypt data, set warehouse sizes, or define access control policies.

**Source:** [Account Identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier)

**Quote:** "Each Snowflake account is identified by an account identifier (sometimes also referred to as an account locator)."

---

## Q83
**Answer: A, B**

**Explanation:** Snowflake supports two forms of account identifiers: the organization name with account name (org_name-account_name) (A) and the legacy account locator (e.g., xy12345) (B). Database/schema names, warehouse/role names, and IP addresses are not account identifiers.

**Source:** [Account Identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier)

**Quote:** "Snowflake supports two types of account identifiers: Account name (preferred) in the form of organization_name-account_name, and Account locator (legacy)."

---

## Q84
**Answer: B**

**Explanation:** USE ROLE sets the active role for the current session, determining the privileges available for subsequent operations. It does not create, grant, or drop roles.

**Source:** [USE ROLE](https://docs.snowflake.com/en/sql-reference/sql/use-role)

**Quote:** "Specifies the active/current primary role for the session."

---

## Q85
**Answer: B**

**Explanation:** INFORMATION_SCHEMA is database-specific — it shows metadata only for the database in which it resides. Using the fully qualified name (my_db.INFORMATION_SCHEMA.TABLES) ensures you query the correct database's metadata.

**Source:** [Snowflake Information Schema](https://docs.snowflake.com/en/sql-reference/info-schema)

**Quote:** "The Information Schema consists of a set of system-defined views and table functions that provide metadata information about the objects created in your account's databases."

---

## Q86
**Answer: B**

**Explanation:** A share enables secure data sharing with other Snowflake accounts without copying data. The consumer accesses the shared data in-place. Shares are not warehouses, backups, or stages.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Secure Data Sharing lets you share selected objects in a database in your account with other Snowflake accounts."

---

## Q87
**Answer: B**

**Explanation:** Native Apps (Application objects) can be published on the Snowflake Marketplace and installed in consumer accounts. Shares provide data access but not application logic. Stored procedures and external functions are not installable as standalone applications.

**Source:** [Snowflake Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "The Snowflake Native App Framework allows providers to build, sell, and distribute applications to Snowflake consumers."

---

## Q88
**Answer: B, D**

**Explanation:** Tables (B) and views (D) are schema-level objects contained within a schema. Databases (A) contain schemas, warehouses (C) are account-level objects, and users (E) are account-level objects.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Each database contains one or more schemas, which are logical groupings of database objects (tables, views, etc.)."

---

## Q89
**Answer: A**

**Explanation:** INFORMATION_SCHEMA.TABLES contains metadata about tables in a database, including the ROW_COUNT column. SHOW WAREHOUSES provides warehouse info, ACCOUNT_USAGE.TABLES has latency, and DESCRIBE SCHEMA shows schema properties, not row counts.

**Source:** [Snowflake Information Schema](https://docs.snowflake.com/en/sql-reference/info-schema)

**Quote:** "The TABLES view displays information for all tables and views in the specified (or current) database, including the row count."

---

## Q90
**Answer: B**

**Explanation:** The SNOWFLAKE shared database provides account-level metadata, usage history, and administration capabilities through schemas like ACCOUNT_USAGE, ORGANIZATION_USAGE, and READER_ACCOUNT_USAGE. It does not store user data or serve as a template.

**Source:** [SNOWFLAKE Database](https://docs.snowflake.com/en/sql-reference/snowflake-db)

**Quote:** "The SNOWFLAKE database is a system-defined, shared database that is available in every Snowflake account. The database contains schemas that provide metadata and historical usage data."

---

## Q91
**Answer: B**

**Explanation:** The default warehouse type in Snowflake is a Standard warehouse. Snowpark-optimized is a specialized type, multi-cluster is a configuration option for standard warehouses, and there is no "serverless warehouse" type.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "A virtual warehouse is a named abstraction for a cluster of compute resources. By default, warehouses are standard type."

---

## Q92
**Answer: B**

**Explanation:** Snowpark-optimized warehouses provide additional memory per node, making them ideal for memory-intensive Snowpark Python operations like ML model training and large DataFrame operations. Standard warehouses have less memory per node.

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses provide 16x memory per node compared to a standard Snowflake virtual warehouse, making them ideal for workloads that have large memory requirements."

---

## Q93
**Answer: B**

**Explanation:** Snowpark-optimized warehouses provide significantly more memory per node compared to standard warehouses. They do not cost fewer credits (they cost more), can run SQL too, and standard warehouses can also run Snowpark queries.

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses provide 16x memory per node compared to a standard Snowflake virtual warehouse."

---

## Q94
**Answer: A, C**

**Explanation:** Multi-cluster warehouses support two scaling policies: Standard (A) and Economy (C). There is no "Aggressive," "Conservative," or "Auto" scaling policy.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Snowflake supports the following scaling policies: Standard, Economy."

---

## Q95
**Answer: A**

**Explanation:** The Standard scaling policy favors starting additional clusters to minimize query queuing. It starts a new cluster when there are queries queued and existing clusters are fully loaded. Economy is more conservative about starting clusters.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Standard: Minimizes queuing by favoring starting additional clusters."

---

## Q96
**Answer: B**

**Explanation:** Multi-cluster warehouses with auto-scale mode handle concurrency by spinning up additional clusters during peak load. The problem is concurrency (200+ analysts), not query complexity, so scaling up (larger size) would not help. Separate databases and disabling caching are irrelevant.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are designed specifically for handling queuing and performance issues related to large numbers of concurrent users and/or queries."

---

## Q97
**Answer: B**

**Explanation:** The Economy scaling policy conserves credits by being more conservative about starting new clusters — it waits longer before adding clusters and shuts down idle clusters more aggressively. Standard policy prioritizes minimizing queue time.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Economy: Conserves credits by favoring keeping running clusters fully loaded rather than starting additional clusters."

---

## Q98
**Answer: B**

**Explanation:** Multi-cluster warehouses support a minimum of 1 cluster and a maximum of 10 clusters. The min/max cluster settings are configurable within this range.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "The maximum number of clusters for a multi-cluster warehouse is 10."

---

## Q99
**Answer: B**

**Explanation:** For long-running, complex queries with no concurrency issues, the best strategy is to scale up — use a larger warehouse size to provide more compute resources per query. Multi-cluster (scale out) addresses concurrency, not individual query performance.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "If queries are running slowly, consider resizing the warehouse to a larger size."

---

## Q100
**Answer: B, D**

**Explanation:** Setting a short auto-suspend timeout (B) ensures the warehouse stops consuming credits quickly when idle. Right-sizing the warehouse (D) avoids paying for unnecessary compute. Setting auto-suspend to 0 (A) wastes credits, and a single shared 4XL warehouse (E) is wasteful.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "To help control costs, Snowflake provides options for automatically suspending a warehouse when there is no activity and automatically resuming when there is new activity."

---

## Q101
**Answer: B**

**Explanation:** Scaling up (increasing warehouse size) is appropriate when individual queries are slow due to complexity or large data volumes, as it provides more compute resources per query. Scaling out (adding clusters) addresses concurrency.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "If queries are running slowly, consider resizing the warehouse to a larger size."

---

## Q102
**Answer: B**

**Explanation:** Scaling out by adding clusters via multi-cluster warehouses addresses concurrency issues where too many queries are queuing. Individual slow queries are addressed by scaling up (larger size), not scaling out.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are designed specifically for handling queuing and performance issues related to large numbers of concurrent users and/or queries."

---

## Q103
**Answer: B**

**Explanation:** Creating separate warehouses for each team isolates workloads, prevents resource contention, and enables independent cost tracking and sizing. A single shared warehouse creates contention, and time-based scheduling is impractical.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "Snowflake recommends creating separate warehouses for different types of workloads or teams."

---

## Q104
**Answer: B**

**Explanation:** Auto-resume controls whether a suspended warehouse automatically starts when a query is submitted to it. It does not affect warehouse size, cluster count, or when a warehouse is dropped.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "If auto-resume is enabled, the warehouse automatically resumes when any statement that requires a warehouse is submitted."

---

## Q105
**Answer: A, C**

**Explanation:** Warehouse credit cost is determined by the warehouse size (A) — larger warehouses consume more credits per hour — and the duration the warehouse runs (C). Data stored, number of databases, and number of users do not affect warehouse credit consumption.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "The number of credits consumed depends on the size of the warehouse and how long it runs."

---

## Q106
**Answer: B**

**Explanation:** X-Small is the smallest warehouse size and consumes the fewest credits per hour (1 credit/hour). Each subsequent size doubles in credit consumption.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "X-Small warehouses consume 1 credit per hour."

---

## Q107
**Answer: B**

**Explanation:** With auto-resume enabled, a suspended warehouse automatically resumes when a query is submitted to it. There is a brief startup delay while the warehouse provisions compute nodes, then the query executes.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "If auto-resume is enabled, the warehouse automatically resumes when any statement that requires a warehouse is submitted."

---

## Q108
**Answer: B**

**Explanation:** An X-Small warehouse consumes 1 credit per hour. Each size increase doubles the credit consumption: Small=2, Medium=4, Large=8, etc.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "X-Small: 1 credit/hour, Small: 2 credits/hour, Medium: 4 credits/hour, Large: 8 credits/hour."

---

## Q109
**Answer: B**

**Explanation:** Each warehouse size increase doubles the number of compute resources and credit consumption. Going from Small (2 credits/hour) to Medium (4 credits/hour) doubles the cost.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "For each full size increase, the number of compute resources and credits consumed doubles."

---

## Q110
**Answer: B**

**Explanation:** Spilling to local and remote storage indicates the warehouse does not have enough memory to process the query in-memory. Increasing the warehouse size provides more memory and compute resources, reducing spilling. Multi-cluster scaling addresses concurrency, not memory.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "If queries are running slowly, consider resizing the warehouse to a larger size."

---

## Q111
**Answer: A, C**

**Explanation:** Snowflake offers Standard (A) and Snowpark-optimized (C) warehouse types. There is no Serverless (B), GPU-optimized (D), or Memory-only (E) warehouse type.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Snowflake supports the following warehouse types: Standard, Snowpark-optimized."

---

## Q112
**Answer: B**

**Explanation:** Snowpark-optimized warehouses are designed for memory-intensive workloads such as ML model training, large Snowpark DataFrame operations, and other memory-heavy operations. They are not for simple SQL queries, data sharing, or storage cost reduction.

**Source:** [Snowpark-Optimized Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized)

**Quote:** "Snowpark-optimized warehouses are recommended for workloads that have large memory requirements such as ML training."

---

## Q113
**Answer: B**

**Explanation:** When all clusters in a multi-cluster warehouse are fully loaded and the maximum cluster count is reached, additional queries are queued until resources become available. Queries do not fail, the warehouse does not auto-upgrade, and queries are not routed elsewhere.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "If all clusters are fully loaded, and the maximum number of clusters is already running, queries are queued."

---

## Q114
**Answer: B**

**Explanation:** For short, interactive ad-hoc queries, a medium-sized warehouse with a short auto-suspend (60 seconds) and auto-resume enabled ensures quick response times while minimizing idle credit consumption. Never-suspend wastes credits, and disabling auto-resume requires manual intervention.

**Source:** [Warehouse Considerations](https://docs.snowflake.com/en/user-guide/warehouses-considerations)

**Quote:** "To help control costs, Snowflake provides options for automatically suspending a warehouse when there is no activity and automatically resuming when there is new activity."

---

## Q115
**Answer: A**

**Explanation:** In Maximized mode, all clusters start immediately and stay running (min clusters = max clusters). In Auto-scale mode, Snowflake dynamically adjusts the number of clusters between the min and max based on query load. They are distinct modes with different behaviors.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Maximized: All clusters run concurrently... Auto-scale: Snowflake starts and stops clusters as needed to dynamically manage the load."

---

## Q116
**Answer: A, C**

**Explanation:** Warehouses are billed per second with a 60-second minimum when they resume (A), and credits are consumed only while the warehouse is running (C). Suspended warehouses do not consume credits, and warehouse billing is separate from storage costs.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Charges are incurred for each second that the warehouse runs, with a minimum of 60 seconds (1 minute) each time the warehouse resumes."

---

## Q117
**Answer: B**

**Explanation:** The default auto-suspend setting for a newly created warehouse is 600 seconds (10 minutes). This means the warehouse will automatically suspend after 10 minutes of inactivity unless configured otherwise.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "By default, auto-suspend is enabled. The default setting is 600 seconds (10 minutes)."

---

## Q118
**Answer: B**

**Explanation:** Resource monitors track and control warehouse credit usage with configurable thresholds that can trigger notifications or suspend warehouses. Tasks schedule SQL, streams track changes, and alerts are for general notification conditions.

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "A resource monitor can be used to monitor credit usage by virtual warehouses and the cloud services layer."

---

## Q119
**Answer: B**

**Explanation:** MAX_CLUSTER_COUNT specifies the maximum number of clusters that can run in auto-scale mode for a multi-cluster warehouse. SCALING_POLICY defines the policy (Standard/Economy), and WAREHOUSE_SIZE defines the size of each cluster.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "MAX_CLUSTER_COUNT specifies the maximum number of clusters for a multi-cluster warehouse."

---

## Q120
**Answer: B**

**Explanation:** Gen 2 warehouses are next-generation standard warehouses with improved price-performance characteristics. They are not exclusive to VPS, not legacy hardware, and can run all types of workloads, not just Python.

**Source:** [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview)

**Quote:** "Snowflake offers Gen 2 warehouses, which provide improved price-performance for certain workload types."

---

## Q121
**Answer: B**

**Explanation:** A micro-partition is a contiguous unit of storage containing 50-500 MB of uncompressed data that Snowflake automatically creates and manages. Users do not define partition keys. Micro-partitions are not compute buffers or logical schema divisions.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "All data in Snowflake tables is automatically divided into micro-partitions, which are contiguous units of storage between 50 MB and 500 MB of uncompressed data."

---

## Q122
**Answer: B**

**Explanation:** Data within micro-partitions is stored in a columnar format, which enables efficient compression and allows Snowflake to read only the columns needed for a query (column pruning). It is not row-based, key-value, or graph-based.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "Snowflake stores data in micro-partitions using a columnar format."

---

## Q123
**Answer: B**

**Explanation:** Snowflake stores min/max values and other metadata for each micro-partition. When a query filters on a column, Snowflake uses this metadata to prune (skip) micro-partitions that cannot contain matching data. This is partition pruning.

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "Snowflake maintains metadata about all rows stored in a micro-partition, including the range of values for each column. This metadata is used for query pruning."

---

## Q124
**Answer: B, C**

**Explanation:** Micro-partitions are immutable — DML operations create new micro-partitions rather than modifying existing ones (B). Each micro-partition contains 50-500 MB of uncompressed data (C). Users do not manually define partitions (A), data is columnar not row-based (D), and data is compressed (E).

**Source:** [Understanding Snowflake Table Structures](https://docs.snowflake.com/en/user-guide/tables-micro-partitions)

**Quote:** "Micro-partitions are immutable... contiguous units of storage between 50 MB and 500 MB of uncompressed data."

---

## Q125
**Answer: B**

**Explanation:** Data clustering refers to the physical ordering of data within micro-partitions based on column values. Well-clustered data enables efficient partition pruning. It is not a manual reorganization, replication method, or encryption type.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "In Snowflake, the clustering of data in a table refers to the way data is physically ordered within micro-partitions based on the values of one or more columns/expressions."

---

## Q126
**Answer: B**

**Explanation:** Clustering keys are most beneficial on very large tables (multi-terabyte) where queries frequently filter or join on specific columns and natural clustering has degraded. Small tables don't benefit, and clustering is not limited to temporary or external tables.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "Clustering keys are not intended for all tables... In general, clustering keys are most beneficial for very large tables that are queried frequently."

---

## Q127
**Answer: B**

**Explanation:** Defining a clustering key on ORDER_DATE will cause Snowflake to reorganize the data so that micro-partitions are better ordered by date, improving pruning efficiency for date-filtered queries. Snowflake does not support traditional indexes.

**Source:** [Clustering Keys and Clustered Tables](https://docs.snowflake.com/en/user-guide/tables-clustering-keys)

**Quote:** "A clustering key defines the column(s) or expression(s) used to reorganize/sort data in a table's micro-partitions."

---

## Q128
**Answer: C**

**Explanation:** Permanent tables persist until explicitly dropped and support both Time Travel (up to 90 days with Enterprise+) and Fail-safe (7 days). Temporary tables are session-scoped, transient tables have no Fail-safe, and external tables reference external data.

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Permanent tables are the default table type in Snowflake. They persist until they are explicitly dropped and have Time Travel and Fail-safe protection."

---

## Q129
**Answer: B, C**

**Explanation:** Temporary tables exist only for the session duration (B) and support Time Travel up to 1 day (C). They do not persist after the session ends (A), have no Fail-safe period (D), and are not visible to other sessions (E).

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Temporary tables exist only within the session in which they were created and persist only for the remainder of the session. They support a Time Travel retention period of 0 or 1 day."

---

## Q130
**Answer: B**

**Explanation:** The key distinction is that transient tables have no Fail-safe period (0 days), reducing storage costs compared to permanent tables which have a 7-day Fail-safe. Transient tables do support Time Travel (up to 1 day). They can be queried and are not automatically dropped.

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient tables persist until explicitly dropped and are available to all users with the appropriate privileges. However, they do not have a Fail-safe period."

---

## Q131
**Answer: C**

**Explanation:** A transient table is ideal for staging/intermediate data that doesn't need Fail-safe protection, as it reduces storage costs. Temporary tables (B) would also work but are session-scoped. Permanent tables (A) have unnecessary Fail-safe overhead. External tables (D) are for external data.

**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)

**Quote:** "Transient tables persist until explicitly dropped... they do not have a Fail-safe period, which makes them suitable for staging or intermediate data."

---

## Q132
**Answer: B**

**Explanation:** Apache Iceberg tables in Snowflake use the open-source Iceberg table format, storing data in Parquet files, enabling interoperability with other engines (e.g., Spark). They are not exclusively internal storage, not temporary tables, and not VPS-exclusive.

**Source:** [Apache Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Apache Iceberg tables use the Apache Iceberg open table format, which enables interoperability with other compute engines that support Iceberg."

---

## Q133
**Answer: A, C**

**Explanation:** Snowflake-managed Iceberg tables store data in Iceberg-compatible Parquet format in external storage (A) and Snowflake manages the Iceberg metadata catalog (C). They can be queried with SQL (B is wrong), support DML operations (D is wrong), and work on multiple clouds (E is wrong).

**Source:** [Apache Iceberg Tables](https://docs.snowflake.com/en/user-guide/tables-iceberg)

**Quote:** "Snowflake manages the metadata and lifecycle of Iceberg tables... Data is stored in Parquet format."

---

## Q134
**Answer: B**

**Explanation:** An external table is a read-only table that references data files stored in an external stage (S3, Azure Blob Storage, GCS). The data remains in the external location and is not loaded into Snowflake's internal storage.

**Source:** [Introduction to External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)

**Quote:** "An external table is a Snowflake feature that allows you to query data stored in an external stage as if the data were inside a table in Snowflake."

---

## Q135
**Answer: C**

**Explanation:** External tables allow querying data in external cloud storage (like S3) without loading it into Snowflake. This is ideal for data lake scenarios where the data remains in its original location.

**Source:** [Introduction to External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)

**Quote:** "An external table is a Snowflake feature that allows you to query data stored in an external stage as if the data were inside a table in Snowflake."

---

## Q136
**Answer: A**

**Explanation:** A dynamic table automatically refreshes its contents based on a defined SQL query, enabling declarative data pipelines. You specify the query and a target lag, and Snowflake handles the refresh logic. It does not dynamically change schema or exist only during queries.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "A dynamic table materializes the results of a specified query. Instead of creating a separate target table and writing code to transform and update the data, you can define the target table as a dynamic table."

---

## Q137
**Answer: B**

**Explanation:** Secure views hide the view definition (DDL) from non-owner users and bypass certain query optimizations to protect data privacy. Standard views expose their definition to authorized users. Secure views do not encrypt data, and they can be created by any role with appropriate privileges.

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "With secure views, the view definition and details are only visible to authorized users (i.e., users who are granted the role that owns the view)."

---

## Q138
**Answer: A, C**

**Explanation:** Materialized views store pre-computed results that Snowflake automatically refreshes (A) and can significantly improve performance for frequently run queries (C). They do not require manual refresh (B), they consume additional storage (D), and they require Enterprise Edition (E).

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "A materialized view is a pre-computed data set derived from a query specification... Snowflake maintains the data in the materialized view automatically."

---

## Q139
**Answer: C**

**Explanation:** Materialized views store pre-computed results of complex queries and are automatically refreshed by Snowflake when underlying data changes. This is ideal for repeated aggregation queries on infrequently changing data.

**Source:** [Materialized Views](https://docs.snowflake.com/en/user-guide/views-materialized)

**Quote:** "Materialized views are designed to improve query performance for workloads composed of common, repeated query patterns."

---

## Q140
**Answer: C**

**Explanation:** Secure views are used when sharing data with other accounts to prevent consumers from seeing the view definition or using it to infer data about the underlying base tables. Standard and materialized views expose their definitions.

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "Secure views should be used when the view is specifically designated for data privacy, i.e., to limit access to sensitive data."

---

## Q141
**Answer: B**

**Explanation:** Snowflake Notebooks is an interactive development environment within Snowsight for writing SQL, Python, and Markdown in a cell-based notebook interface. It is not a third-party integration, file storage system, or visualization-only tool.

**Source:** [Getting Started with Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks)

**Quote:** "Snowflake Notebooks is an interactive, cell-based programming environment for Python and SQL in Snowsight."

---

## Q142
**Answer: B**

**Explanation:** Snowflake Notebooks supports SQL, Python, and Markdown cells, making it ideal for data exploration, ML coding, and documentation in a single interface. SnowSQL is CLI-only, Streamlit builds apps, and Snowflake CLI manages deployments.

**Source:** [Getting Started with Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks)

**Quote:** "Snowflake Notebooks is an interactive, cell-based programming environment for Python and SQL in Snowsight."

---

## Q143
**Answer: B**

**Explanation:** Streamlit in Snowflake allows developers to build interactive data applications using Python that run directly within Snowflake's secure environment. It is not a batch engine, data loading utility, or SQL optimizer.

**Source:** [About Streamlit in Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)

**Quote:** "Streamlit in Snowflake lets you build interactive data apps using Python, directly within Snowflake."

---

## Q144
**Answer: A, C**

**Explanation:** Snowpark enables building data pipelines using Python, Java, or Scala DataFrames (A) and runs computations on Snowflake's compute layer without data movement (C). It does not design the Snowsight UI (B), manage billing (D), or replace the Cloud Services layer (E).

**Source:** [Snowpark Developer Guide](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Snowpark is a developer framework for Snowflake... lets developers interact with Snowflake in the language of their choice, including Python, Java, and Scala."

---

## Q145
**Answer: B**

**Explanation:** Snowflake Cortex is a suite of AI and ML capabilities that brings large language models and ML functions directly into Snowflake, accessible via SQL. It is not hardware, a third-party platform, or a replication service.

**Source:** [Snowflake Cortex Overview](https://docs.snowflake.com/en/user-guide/snowflake-cortex/overview)

**Quote:** "Snowflake Cortex gives you instant access to industry-leading large language models (LLMs) trained by researchers at companies like Mistral, Reka, Meta, and Google."

---

## Q146
**Answer: B**

**Explanation:** Cortex Analyst enables users to ask questions in natural language about their data, using a semantic model to translate questions into SQL queries. Cortex Search is for semantic text search, not natural language data querying.

**Source:** [Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst)

**Quote:** "Cortex Analyst is a fully managed service that provides a conversational interface for interacting with data in Snowflake."

---

## Q147
**Answer: B**

**Explanation:** The COMPLETE function in Snowflake Cortex invokes a large language model to generate text responses based on a prompt. It does not mark tasks complete, impute missing values, or validate pipelines.

**Source:** [COMPLETE (SNOWFLAKE.CORTEX)](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "Given a prompt, this function generates a response (completion) using the specified large language model."

---

## Q148
**Answer: B**

**Explanation:** Cortex Search is a service that enables semantic search and retrieval-augmented generation (RAG) over text data stored in Snowflake. It goes beyond simple text matching to understand meaning. It is not a LIKE operator replacement or marketplace search tool.

**Source:** [Cortex Search](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview)

**Quote:** "Cortex Search is a fully managed search service that enables low-latency, high-quality search over your Snowflake data."

---

## Q149
**Answer: A, C**

**Explanation:** CORTEX.COMPLETE (A) generates text using LLMs and CORTEX.SENTIMENT (C) analyzes text sentiment. CORTEX.EXECUTE, CORTEX.DEPLOY, and CORTEX.MIGRATE are not valid Cortex AI SQL functions.

**Source:** [Snowflake Cortex LLM Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)

**Quote:** "Snowflake Cortex provides SQL functions including COMPLETE, SENTIMENT, SUMMARIZE, TRANSLATE, and EXTRACT_ANSWER."

---

## Q150
**Answer: B**

**Explanation:** The Snowflake Cortex SENTIMENT function analyzes text sentiment directly in Snowflake using SQL, without moving data externally. Snowpark ML is for model training, external functions add complexity, and Streamlit is for visualization.

**Source:** [SENTIMENT (SNOWFLAKE.CORTEX)](https://docs.snowflake.com/en/sql-reference/functions/sentiment-snowflake-cortex)

**Quote:** "Returns a sentiment score, from -1 to 1, indicating whether the sentiment for the given text is negative or positive."

---

## Q151
**Answer: B**

**Explanation:** Snowflake ML provides built-in capabilities for machine learning model development, feature engineering, and model management within Snowflake. It is not for external deployment, a third-party marketplace, or a data loading utility.

**Source:** [Snowflake ML Overview](https://docs.snowflake.com/en/developer-guide/snowflake-ml/overview)

**Quote:** "Snowflake ML is a set of tools for building and deploying machine learning models in Snowflake."

---

## Q152
**Answer: B**

**Explanation:** Running ML workloads in Snowpark/Snowflake ML keeps data within Snowflake's governance and security perimeter, eliminating the need to move data externally. The compute runs on Snowflake infrastructure, maintaining compliance and reducing data exposure.

**Source:** [Snowpark Developer Guide](https://docs.snowflake.com/en/developer-guide/snowpark/index)

**Quote:** "Snowpark runs computations entirely within Snowflake, so you don't need to transfer data to a separate system."

---

## Q153
**Answer: C**

**Explanation:** Streamlit in Snowflake allows building interactive web applications with Python for business users to filter data and view charts, all hosted within Snowflake. Notebooks are for development, SnowSQL is CLI, and the Snowflake CLI is for management.

**Source:** [About Streamlit in Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)

**Quote:** "Streamlit in Snowflake lets you build interactive data apps using Python, directly within Snowflake."

---

## Q154
**Answer: B**

**Explanation:** Snowflake Notebooks use a virtual warehouse attached to the notebook session to execute Python cells. The compute runs on Snowflake's infrastructure, not on the user's local machine or the Cloud Services layer.

**Source:** [Getting Started with Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks)

**Quote:** "Notebooks run on a virtual warehouse that you select for the notebook session."

---

## Q155
**Answer: A, C**

**Explanation:** Cortex Analyst allows natural language questions about Snowflake data (A) and uses a semantic model to understand the data structure (C). It does not require external data export (B), is not limited to CSV format (D), and does not replace virtual warehouses (E).

**Source:** [Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst)

**Quote:** "Cortex Analyst uses a semantic model to understand your data's structure, then translates natural language questions into SQL queries."
