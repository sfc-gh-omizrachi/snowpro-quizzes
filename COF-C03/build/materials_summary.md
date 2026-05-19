# COF-C03 Materials Summary

## Exam Overview
Questions: 100  |  Duration: 115 min  |  Pass: 75%

Cert Code: COF-C03
Full Name: SnowPro Core Certification (COF-C03)
Launched: February 16, 2026
Replaces: COF-C02 (retires May 14, 2026)
New features added: Snowflake Notebooks, Apache Iceberg tables, Snowflake Cortex, Trust Center, Openflow (not tested until GA)

## Domain Topics

### Domain 1 — Snowflake AI Data Cloud Features & Architecture (31%)
Key topics from materials:
- 1.1 Describe and use the Snowflake architecture: Cloud Services layer, Compute layer, Database Storage layer, Snowflake editions comparison
- 1.2 Use Snowflake Interfaces and tools: Snowsight, Snowflake CLI, IDE integrations (e.g., VS Code)
- 1.3 Differentiate Snowflake object hierarchy and types: Organization and account objects, Database objects (Stages, Schemas, Tables, Views, UDFs, File formats, Stored procedures, Pipes, Shares, Sequences, ML models, Applications), Session and context variables, Parameter hierarchy and precedence
- 1.4 Configure virtual warehouses: Types (Snowpark Optimized, Standard Gen 1 and Gen 2, Default warehouse for Notebooks*), Scaling policies, Warehouse configurations by use case (ad-hoc queries, data loading, BI/reporting), Best practices (sizing up/down, scaling in/out, auto-suspend, workload management for different teams, high concurrency, complex queries)
- 1.5 Explain Snowflake storage concepts: Micro-partitions, Data clustering, Table types (Permanent, Temporary, Transient, Apache Iceberg, External, Dynamic), View types (Standard, Materialized, Secure)
- 1.6 Explain AI/ML and application development features: Snowflake Notebooks, Streamlit in Snowflake, Snowpark, Snowflake Cortex (AI SQL functions, Cortex Search, Cortex Analyst), Snowflake ML

### Domain 2 — Account Management & Data Governance (20%)
Key topics from materials:
- 2.1 Explain Snowflake security model and principles: RBAC, Securable object hierarchy, DAC, Network Policies, Authentication (MFA, Federated Authentication, SSO, OAuth, Key-pair authentication), System-defined roles, Functional roles (Account roles, Database roles, Custom roles), Secondary roles, Account identifiers, Logging and tracing
- 2.2 Define data governance features: Data masking (Row-level security, Column-level security), Object tagging, Privacy policies, Trust Center, Encryption key management, Alerts, Notifications, Data replication and failover, Data lineage
- 2.3 Explain monitoring and cost management: Resource Monitors (cost and warehouse monitoring), Calculating virtual warehouse credit usage, ACCOUNT_USAGE schema

### Domain 3 — Data Loading, Unloading & Connectivity (18%)
Key topics from materials:
- 3.1 Perform data loading and unloading: File formats, Stages (Internal, External, Server-side encryption, Directory tables), COPY INTO command, Error handling options
- 3.2 Perform automated data ingestion: Snowpipe, Snowpipe streaming, Streams, Tasks, Dynamic tables, Openflow (not tested until GA)
- 3.3 Identify Snowflake Connectors and integrations: Snowflake drivers, Snowflake connectors, Storage integration, API integration, Git integration

### Domain 4 — Performance Optimization, Querying & Transformation (21%)
Key topics from materials:
- 4.1 Evaluate query performance: Query Profile/Query insights (bytes spilled, inefficient pruning, exploding joins, queuing), SNOWFLAKE.ACCOUNT_USAGE views (query attribution, query history), Workload management best practices (grouping similar workloads)
- 4.2 Optimize query performance: Query acceleration service, Search optimization service, Clustering keys, Materialized views
- 4.3 Use Snowflake caching: Query result cache, Metadata cache, Warehouse cache
- 4.4 Perform data transformation techniques: Structured/Semi-structured/Unstructured data, Aggregate functions, SQL for query optimization, Window functions

### Domain 5 — Data Collaboration (10%)
Key topics from materials:
- 5.1 Explain data collaboration and protection: Data replication and failover, Secure data sharing features, Cloning, Time Travel, Fail-safe
- 5.2 Explain data sharing capabilities: Accounts (Provider, Consumer, Reader accounts), Secure Data Sharing, Sharing and resharing, Direct shares, Data clean rooms
- 5.3 Share data using Snowflake Marketplace and listings: Snowflake Marketplace, Listings (Private, Public), Native Apps

## Notes
- COF-C03 FAQ confirms 100 questions, same difficulty as COF-C02.
- Reorganized from 6 domains to 5 domains.
- New content includes: Snowflake Notebooks, Apache Iceberg tables, Snowflake Cortex, Trust Center.
- Features marked with * will not be tested until globally GA.
- Weights sum to 100%: 31 + 20 + 18 + 21 + 10 = 100%.
- Sample questions are heavily scenario-based (4/5 = 80%).
- Recommended mix: ~80% Single Answer/Scenario, ~20% Multi Answer - Select 2.
