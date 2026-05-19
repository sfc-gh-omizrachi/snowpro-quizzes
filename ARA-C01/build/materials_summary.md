# ARA-C01 Materials Summary

## Exam Overview
Questions: 65  |  Duration: 115 min  |  Pass: 72%

Cert Code: ARA-C01
Full Name: SnowPro Advanced: Architect Certification
Last Updated: August 20, 2025
Prerequisite: Active SnowPro Core Certified credential
Target Audience: Solution Architects, Database Architects, System Architects (2+ years practical Snowflake experience)

## Domain Topics

### Domain 1 — Accounts and Security (25%)
Key topics from materials:
- 1.1 Design a Snowflake account and database strategy: Parameters (Account, Object, Session), Parameter hierarchy, Single vs multiple Snowflake accounts (benefits/limitations), Account isolation/segmentation, Cross-account features/capabilities, Account strategy use cases
- 1.2 Design architecture for security, privacy, compliance, governance: RBAC hierarchy (privilege inheritance, database roles, system roles, functional vs access roles, secondary roles), Data Access (storage integrations), Data Security (secure views), Data Governance (column-level security: external tokenization, dynamic data masking; row-level security: row access policies; aggregate policies; projection policies; data lineage and dependencies; object tagging), Compliance (Snowflake editions features, PCI, PII/PHI)
- 1.3 Outline Snowflake security principles: Encryption, Network security (network policies, network rules, external access, access control privileges, private connectivity: AWS PrivateLink, Azure Private Link, Google Cloud Private Service Connect), User/role/grants provisioning, Authentication (authentication policies, federated authentication, SSO, OAuth, MFA, key-pair authentication, security integration)

### Domain 2 — Snowflake Architecture (30%)
Key topics from materials:
- 2.1 Data models: Data vault, Star schema, Key/column constraints (ENABLE/RELY/VALIDATE)
- 2.2 Data sharing solutions: Use cases (same org/account, within region, across regions, between accounts, to non-Snowflake customer, across cloud providers, Data Clean Rooms), Snowflake Marketplace, Data Exchange, Data sharing methods (configure shares/parameters/privileges, security patterns, Cross-Cloud Auto-Fulfillment)
- 2.3 Development lifecycle architecture: Data lake/environments (storage directory structure, zones/layers, DevOps/DataOps, production/development/sandbox, data workloads, ELT/ETL), Development lifecycle support (migration, deployment: CI/CD, Snowflake CLI, Git integration, rollback process), AI/ML pipelines (Snowpark Container Services, Snowflake ML functions, Cortex LLM functions, Streamlit, Native App Framework)
- 2.4 Object hierarchy and architecture impact: Roles, Virtual warehouses, Object hierarchy (Databases > Schemas > Tables/Views/Stages), File formats, Functions, Procedures, Streams and tasks
- 2.5 Data recovery: Backup/recovery (Time Travel: table types/costs/availability/query performance impacts, data corruption impacts, zero-copy cloning, Fail-safe), Disaster recovery (replication and failover)

### Domain 3 — Data Engineering (25%)
Key topics from materials:
- 3.1 Data loading/unloading solutions: Data sources (data at rest, data in motion, external sources/formats, streaming: Snowpipe/CDC, OLTP/RDBMS, API sources), Data ingestion (bulk file upload, Snowpipe, Snowpipe Streaming, external tables, reload/load history, incremental vs full updates, Iceberg tables managed/unmanaged, COPY parameters and error handling), Architecture changes (schema detection, table schema evolution, data source changes), Data unloading
- 3.2 Key tools and ecosystem: Connectors (Kafka, Spark, Python, ServiceNow, Google Analytics), Drivers (JDBC, ODBC), API endpoints (system$allowlist, SQL API), SnowSQL, Snowflake CLI, Snowpark (Python, Scala, Java)
- 3.3 Data transformation solutions: Views and tables (benefits/limitations/properties, relationship between view and data types, cost impact, dynamic tables), Staging layers, Querying semi-structured data (Flatten), Data processing, Stored procedures, Streams and tasks, Functions (external functions and performance impacts, UDFs, UDTFs, secure functions)

### Domain 4 — Performance Optimization (20%)
Key topics from materials:
- 4.1 Performance tools and best practices: Query profiling (interpret Query Profile, identify bottlenecks, metadata functions, warehouse queuing, warehouse spilling), Virtual warehouse configurations (auto-suspend/resume, scale up/down, scale in/out multi-cluster/auto-scaling, query acceleration service, Snowpark-optimized warehouses), Clustering (natural clustering, auto-clustering, clustering keys), Search optimization service, Caching (different cache layers, cache expiration, cost impact)
- 4.2 Troubleshoot performance: System clustering information, Warehouse monitoring, Optimization techniques, Micro-partition pruning, Monitoring and alerting (ACCOUNT_USAGE and INFORMATION_SCHEMA views, resource monitoring, alerts and notifications, event tables: logging/tracing)

## Sample Questions Analysis
Total samples: 5
| # | Type          | Domain | Summary |
|---|---------------|--------|---------|
| 1 | Single Answer |   D4   | System function for partition depth histogram |
| 2 | Single Answer |   D2   | Copy table structure only |
| 3 | Single Answer |   D1   | Switch to newly created role |
| 4 | Single Answer |   D2   | DESC TABLE column type display |
| 5 | Multi Answer  |   D2   | Data sharing across regions/cloud platforms (Select 2) |

## Notes
- Exam format: 65 questions, 115 minutes, 72% pass threshold (SnowPro Advanced standard).
- Exam is scenario-based per the overview text.
- Recommended mix: ~80% Single Answer/Scenario, ~20% Multi Answer - Select 2.
- Weights sum to 100%: 25 + 30 + 25 + 20 = 100%.
