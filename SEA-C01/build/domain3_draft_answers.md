# Domain 3: Answers

---

## Q1
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY provides column-level access details: which objects were accessed, which columns were read, the user who ran the query, and timestamps. Filtering by the OBJECTS_ACCESSED JSON column for the CUSTOMERS table name reveals all queries accessing that table, including column-level granularity via the BASE_OBJECTS_ACCESSED array. QUERY_HISTORY has the SQL text but requires parsing. SESSIONS and GRANTS_TO_ROLES do not provide access event data.
**Source:** [ACCESS_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY includes BASE_OBJECTS_ACCESSED showing which base table columns were read, enabling column-level access auditing."

---

## Q2
**Answer:** B
**Explanation:** ACCOUNT_USAGE views have a data latency of up to approximately 45 minutes to 3 hours for most views (ACCESS_HISTORY can be up to 3 hours; QUERY_HISTORY is typically available within minutes to 45 minutes). INFORMATION_SCHEMA views are near-real-time with minimal latency but retain data for only 7 days. This tradeoff between latency and retention is a critical distinction for security monitoring decisions.
**Source:** [ACCOUNT_USAGE vs INFORMATION_SCHEMA](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE views have latency of up to 3 hours for most views. INFORMATION_SCHEMA views reflect the current state with minimal latency."

---

## Q3
**Answer:** B
**Explanation:** ACCOUNT_USAGE.LOGIN_HISTORY records all login attempts including: the user_name, event_timestamp, client_ip (source IP), first_authentication_factor (e.g., PASSWORD, KEYPAIR, SAML), second_authentication_factor (MFA), is_success (TRUE/FALSE), and error_code for failures. This is the definitive source for authentication event investigation. SESSIONS does not show failed attempts. AUTHENTICATION_HISTORY and QUERY_HISTORY LOGIN type are not valid views/types.
**Source:** [LOGIN_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "LOGIN_HISTORY records all login attempts with client_ip, authentication method, success/failure status, and timestamps."

---

## Q4
**Answer:** B
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY contains a record for every query executed in the account, including: user_name, role_name, warehouse_name, start_time, end_time, total_elapsed_time, execution_status (SUCCESS, FAIL, INCIDENT), query_text, bytes_scanned, rows_produced, and many other fields. It is the primary audit view for query-level activity. SESSIONS shows session metadata, not query details. TASK_HISTORY is for scheduled tasks.
**Source:** [QUERY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "QUERY_HISTORY contains a row for every query executed, including the role, warehouse, timing, status, and data access metrics."

---

## Q5
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY provides the most granular data access record, including BASE_OBJECTS_ACCESSED (the specific base tables and their columns accessed) and DIRECT_OBJECTS_ACCESSED (the immediate objects queried such as views). Filtering by USER_NAME = 'REPORTING_USER' yields all data accesses for that user, including column-level detail needed for a GDPR SAR. QUERY_HISTORY requires text parsing for columns. SESSIONS shows session metadata without object detail.
**Source:** [ACCESS_HISTORY Column-Level Access](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY includes column-level access details in BASE_OBJECTS_ACCESSED, enabling granular auditing required for GDPR Subject Access Requests."

---

## Q6
**Answer:** D
**Explanation:** There is no dedicated Snowflake ACCOUNT_USAGE view specifically tracking changes to secure objects. All DDL operations (CREATE, ALTER, DROP on views, functions, stored procedures) are recorded in ACCOUNT_USAGE.QUERY_HISTORY as queries with appropriate QUERY_TYPE values (CREATE, ALTER, DROP). Filtering QUERY_HISTORY on these query types and relevant query text provides the change history for secure objects. SECURE_OBJECT_CHANGES and OBJECT_CHANGES are not standard Snowflake views.
**Source:** [QUERY_HISTORY for DDL](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "DDL operations on all Snowflake objects, including secure views and stored procedures, are recorded in ACCOUNT_USAGE.QUERY_HISTORY."

---

## Q7
**Answer:** C
**Explanation:** A Snowflake Alert is the purpose-built Snowflake feature for condition-based alerting. Create an alert with a condition query against ACCOUNT_USAGE.GRANTS_TO_ROLES checking for new ACCOUNTADMIN grants (rows with ROLE = 'ACCOUNTADMIN' and CREATED_ON > last evaluation time), set the schedule (e.g., USING CRON '*/5 * * * *'), and configure it to fire a notification integration (email, SNS, or webhook). This is more efficient than ad-hoc tasks and is the canonical approach.
**Source:** [Snowflake Alerts](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Snowflake Alerts evaluate a condition query on a schedule and fire a notification action when the condition returns rows."

---

## Q8
**Answer:** D
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY retains data for 365 days (1 year). This is a standard retention period for most ACCOUNT_USAGE views. This 1-year retention satisfies many regulatory requirements (SOC 2, PCI DSS 10.7 requires 12 months). For longer retention requirements, data must be exported to a long-term storage solution. The 7-day, 30-day, and 90-day options are incorrect for QUERY_HISTORY.
**Source:** [ACCOUNT_USAGE Retention](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE.QUERY_HISTORY retains data for 365 days."

---

## Q9
**Answer:** A
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY with QUERY_TYPE filtering is the correct approach for auditing DDL operations. The QUERY_TYPE column contains values like 'CREATE', 'CREATE_TABLE', 'ALTER', 'ALTER_TABLE', 'DROP', 'DROP_TABLE', etc. Filtering for DDL query types and a 14-day time window provides a complete DDL audit trail. ACCESS_HISTORY tracks data access (reads/writes), not DDL schema changes. SESSIONS has no DDL type filter.
**Source:** [QUERY_HISTORY QUERY_TYPE Values](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Filter ACCOUNT_USAGE.QUERY_HISTORY by QUERY_TYPE to identify specific categories of operations, including DDL changes."

---

## Q10
**Answer:** B
**Explanation:** The Trust Center is Snowflake's built-in security posture management feature that provides pre-built scanner packages (Security Essentials, Threat Intelligence, Compliance Center, Leaked Credentials) that evaluate common security risks and produce finding reports with remediation guidance. Security Essentials checks MFA adoption, network policies, and admin account usage. Threat Intelligence detects malicious access patterns. Snowflake Trail provides event streaming; Horizon Catalog is a broader data governance tool.
**Source:** [Trust Center Overview](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Trust Center provides pre-built security scanners that evaluate your account's security posture and produce findings with remediation guidance."

---

## Q11
**Answer:** A
**Explanation:** A Snowflake Alert querying ACCOUNT_USAGE.ACCESS_HISTORY for ROWS_PRODUCED (or ROWS_RETURNED) > 10,000 on FINANCIAL_DATA on a 15-minute schedule is the correct automated detection approach. When the alert condition returns results (queries above the threshold exist), it fires a notification integration. A row-access policy (B) would prevent the access, not detect it. A resource monitor (C) monitors credits, not row counts. Streams cannot be created on ACCOUNT_USAGE views (D).
**Source:** [Snowflake Alerts](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Snowflake Alerts can monitor ACCOUNT_USAGE views and fire notifications when specified thresholds are exceeded."

---

## Q12
**Answer:** A
**Explanation:** Snowflake Trail is designed to provide a near-real-time stream of detailed audit events — including SQL query executions, API calls, authentication events, and data access events — that can be forwarded to external SIEM systems for security monitoring and compliance. It enables organizations to integrate Snowflake's audit data into existing security operations workflows without relying solely on ACCOUNT_USAGE's latency.
**Source:** [Snowflake Trail](https://docs.snowflake.com/en/user-guide/snowflake-trail)
**Quote:** "Snowflake Trail enables organizations to stream detailed audit events to external security information and event management (SIEM) systems."

---

## Q13
**Answer:** D
**Explanation:** The most likely cause of Snowflake firing an alert but no Slack message appearing is that the webhook URL is invalid, the Snowflake IP is blocked by the Slack endpoint, or the webhook signing secret is incorrect. When Snowflake cannot successfully deliver to the webhook endpoint (HTTP error, timeout, or authentication failure), the notification silently fails. Snowflake does support webhook notification integrations. The ALLOWED_RECIPIENTS list is specific to email integrations.
**Source:** [Notification Integrations](https://docs.snowflake.com/en/user-guide/notifications/notification-integrations)
**Quote:** "Webhook notification integrations can fail silently if the endpoint URL is incorrect, the secret is wrong, or the webhook cannot receive Snowflake's requests."

---

## Q14
**Answer:** B
**Explanation:** ACCOUNT_USAGE.LOGIN_HISTORY records all login events with: user_name, event_timestamp, is_success (YES/NO), client_ip (source IP), first_authentication_factor (auth method: PASSWORD, KEYPAIR, SAML, etc.), error_code for failures. This is the definitive audit view for authentication events. SESSIONS shows successful sessions after login. AUTHENTICATION_EVENTS and USER_ACTIVITY are not standard Snowflake ACCOUNT_USAGE views.
**Source:** [LOGIN_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "LOGIN_HISTORY records all login attempts including successful logins, failed attempts, source IPs, and authentication methods used."

---

## Q15
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY has a latency of up to 3 hours for most events. Queries that ran within the past 3 hours may not yet have propagated to the view. When investigating real-time or recent access, engineers should wait for the 3-hour propagation window or use INFORMATION_SCHEMA.ACCESS_HISTORY (near-real-time, 14-day retention) for recent events. Access logging covers all roles and requires no special configuration.
**Source:** [ACCESS_HISTORY Latency](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY has a data latency of up to 3 hours. Recent queries may not appear immediately."

---

## Q16
**Answer:** B
**Explanation:** Snowflake Alert is the Snowflake object specifically designed to evaluate a condition query on a schedule and trigger actions (such as notification integrations) when the condition returns results. A Snowflake Task runs arbitrary code on a schedule but doesn't have native condition evaluation and action semantics. Streams capture change data. Event Tables store log/trace data. Alert is the purpose-built solution.
**Source:** [Snowflake Alerts](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "A Snowflake Alert evaluates a condition query on a defined schedule and performs an action when the condition is true."

---

## Q17
**Answer:** B
**Explanation:** Snowflake ACCOUNT_USAGE retention cannot be extended beyond 1 year. To meet 7-year audit log retention requirements, create a scheduled Snowflake Task (e.g., running nightly or hourly) that queries ACCOUNT_USAGE.QUERY_HISTORY and ACCESS_HISTORY for new records and INSERTs them into a dedicated Snowflake table with no inherent retention limit — or exports to an external data lake. This "pump" pattern preserves the data indefinitely. There is no EXTENDED_AUDIT_RETENTION parameter.
**Source:** [ACCOUNT_USAGE Retention Limits](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE views retain data for 365 days. For longer retention, export records to a dedicated Snowflake table or external storage using scheduled tasks."

---

## Q18
**Answer:** C
**Explanation:** SOC 2 Type II (System and Organization Controls 2, Type II) is the compliance framework focused on information security, availability, processing integrity, confidentiality, and privacy. It is commonly used by SaaS companies and cloud service providers to demonstrate their security and availability controls to customers. Snowflake provides SOC 2 Type II reports. ISO 27001 is an information security management standard. PCI DSS is for payment card data. HIPAA BAA is specific to healthcare.
**Source:** [Snowflake Compliance Reports](https://docs.snowflake.com/en/user-guide/security-certs)
**Quote:** "Snowflake's SOC 2 Type II report covers controls related to security, availability, processing integrity, and confidentiality."

---

## Q19
**Answer:** B
**Explanation:** You cannot create Snowflake Streams on ACCOUNT_USAGE views (they are read-only metadata views without change tracking). The standard approach for near-real-time SIEM integration is a scheduled Snowflake Task (running every 5 minutes) that queries ACCOUNT_USAGE views for new records (using a watermark timestamp) and either INSERTs them into an external stage or forwards them via an external access integration or webhook to Splunk's HEC. A notification integration points to a single destination, not for data streaming.
**Source:** [Snowflake Tasks for SIEM Integration](https://docs.snowflake.com/en/user-guide/tasks-intro)
**Quote:** "Use scheduled Snowflake Tasks to regularly query ACCOUNT_USAGE views and forward new events to external SIEM systems."

---

## Q20
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY records two categories of objects per query: DIRECT_OBJECTS_ACCESSED (the immediate objects referenced in the SQL, such as views) and BASE_OBJECTS_ACCESSED (the underlying base tables and columns ultimately accessed, tracing through view definitions). This column-level granularity enables complete lineage tracing and satisfies regulatory requirements for column-level data access auditing.
**Source:** [ACCESS_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY records DIRECT_OBJECTS_ACCESSED (query-level objects) and BASE_OBJECTS_ACCESSED (underlying tables/columns), providing full column-level access lineage."

---

## Q21
**Answer:** A, B
**Explanation:** For investigating after-hours access to PAYROLL: (A) LOGIN_HISTORY verifies the analyst's login time (EVENT_TIMESTAMP), confirming the 2-4 AM window, plus the source IP and authentication method — helping determine if the login was legitimate or a compromise; (B) ACCESS_HISTORY confirms the PAYROLL table was accessed during that period and shows which specific columns were read, providing the scope of exposure. SESSIONS shows session duration but not what was accessed. GRANTS_TO_ROLES shows access rights, not access events.
**Source:** [Incident Investigation with ACCOUNT_USAGE](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "Combine LOGIN_HISTORY (authentication events) and ACCESS_HISTORY (data access events) for comprehensive incident investigation."

---

## Q22
**Answer:** B
**Explanation:** Notification integrations define the external destination for Snowflake alerts and notification actions. They support multiple types: EMAIL (for email destinations), SNS (AWS Simple Notification Service), WEBHOOK (for HTTP endpoints like Slack, PagerDuty), and others. Security integrations are for identity providers. External access integrations are for outbound network access from code. Storage integrations are for cloud storage. Only notification integrations define alert destinations.
**Source:** [Notification Integrations](https://docs.snowflake.com/en/user-guide/notifications/notification-integrations)
**Quote:** "Notification integrations define destinations for Snowflake alert notifications, supporting email, SNS, and webhook endpoints."

---

## Q23
**Answer:** B
**Explanation:** ACCOUNT_USAGE views are read-only metadata views maintained by Snowflake — customers cannot modify them. However, Snowflake itself manages the underlying storage. For HIPAA audit trail tamper-evidence requirements, the best practice is to export ACCOUNT_USAGE logs to an immutable external data store (AWS S3 with Object Lock in WORM mode, Azure Immutable Blob Storage, or similar) on a scheduled basis. This creates a customer-controlled, tamper-evident copy of audit logs.
**Source:** [HIPAA Compliance with Snowflake](https://docs.snowflake.com/en/user-guide/security-certs)
**Quote:** "For audit log tamper-evidence, export ACCOUNT_USAGE data to immutable object storage such as AWS S3 with Object Lock."

---

## Q24
**Answer:** C
**Explanation:** ACCOUNT_USAGE.METERING_HISTORY provides account-level credit consumption breakdown by service type, including serverless features like Snowpipe, Tasks, serverless query compilation, and other Snowflake services. It enables monitoring total serverless compute consumption over time. WAREHOUSE_METERING_HISTORY tracks only virtual warehouse credits. SERVERLESS_TASK_HISTORY tracks individual task executions. USAGE_IN_CURRENCY_DAILY converts credits to currency.
**Source:** [METERING_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/metering_history)
**Quote:** "METERING_HISTORY provides credit consumption by service type, including serverless features like Snowpipe and tasks."

---

## Q25
**Answer:** A
**Explanation:** The correct approach is a scheduled Snowflake Task that queries ACCOUNT_USAGE.GRANTS_TO_ROLES, counting newly created grants (CREATED_ON > last check time) grouped by GRANTED_BY user per day. When the count exceeds the threshold, the task fires a Snowflake notification integration. Streams cannot be created on ACCOUNT_USAGE views. The Trust Center doesn't have a "privilege escalation scanner" as described. Row-access policies on GRANTS_TO_ROLES only restrict visibility, not monitoring.
**Source:** [Snowflake Tasks + Notification Integrations](https://docs.snowflake.com/en/user-guide/tasks-intro)
**Quote:** "Combine scheduled Tasks with Notification Integrations to implement custom threshold-based security monitoring on ACCOUNT_USAGE views."

---

## Q26
**Answer:** B
**Explanation:** Trust Center's Compliance Center is a centralized hub within Snowflake's Trust Center that provides: (1) Snowflake's compliance certifications and their current status (SOC 2, ISO 27001, PCI DSS, HIPAA, FedRAMP, etc.); (2) downloadable compliance reports and attestations; (3) information about Snowflake's compliance posture for each framework. It does not apply masking policies, manage data residency, or run automated customer-account scans.
**Source:** [Trust Center Compliance Center](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Compliance Center provides a centralized view of Snowflake's compliance certifications, status, and downloadable compliance reports."

---

## Q27
**Answer:** A
**Explanation:** The most secure Snowflake connection method for an Azure Function (a programmatic client) is OAuth client credentials flow. By creating a Snowflake OAuth security integration, the Azure Function can authenticate with a client_id and client_secret, obtaining access tokens to query Snowflake. This avoids hardcoded passwords and provides token-based authentication. SAML2 is for interactive user authentication. External network rules control outbound access from Snowflake code, not inbound authentication.
**Source:** [OAuth for Service Clients](https://docs.snowflake.com/en/user-guide/oauth-client-creds)
**Quote:** "OAuth client credentials flow is recommended for programmatic clients such as Azure Functions connecting to Snowflake."

---

## Q28
**Answer:** B
**Explanation:** The Trust Center Security Essentials scanner package includes checks for over-privileged accounts, including users who have been granted ACCOUNTADMIN or SYSADMIN but have not actively used those roles. This is the "over-privileged accounts" or "stale privileged access" check. The Leaked Credentials scanner finds breached passwords. The Security Essentials package covers core hygiene including MFA, network policies, and privileged account usage patterns.
**Source:** [Trust Center Security Essentials](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Security Essentials includes checks for users with ACCOUNTADMIN that have not used the role, identifying stale privileged accounts."

---

## Q29
**Answer:** A, B
**Explanation:** PCI DSS requirement 10 requires comprehensive access logging: (A) ACCOUNT_USAGE.ACCESS_HISTORY records all successful data access at the column level for cardholder data tables, providing the granular audit trail required for CDE access monitoring; (B) ACCOUNT_USAGE.LOGIN_HISTORY records ALL login attempts including failures, meeting PCI DSS requirement 10.2.4 (log failed access attempts). Together, these views provide both successful access records and authentication failure logs required by PCI DSS.
**Source:** [PCI DSS Compliance with Snowflake](https://docs.snowflake.com/en/user-guide/security-certs)
**Quote:** "ACCESS_HISTORY and LOGIN_HISTORY together satisfy PCI DSS requirements for comprehensive access and authentication event logging."

---

## Q30
**Answer:** A
**Explanation:** Snowflake Event Tables are the mechanism for capturing detailed execution telemetry from Snowpark Python code, Cortex AI function calls, and other workloads. When configured with the appropriate logging/tracing settings (SET LOG_LEVEL, SET TRACE_LEVEL), Snowflake writes log messages, traces, and metrics to the Event Table. This enables security observability: detecting anomalous AI/ML function usage, tracing execution flows, and correlating events with access patterns.
**Source:** [Snowflake Event Tables](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-overview)
**Quote:** "Event Tables capture log messages, traces, and metrics from Snowpark code and Cortex AI functions for security observability."

---

## Q31
**Answer:** B
**Explanation:** Snowflake External Tables allow Snowflake to query data in external cloud storage (S3, Azure, GCS) as if it were in Snowflake, using SQL. By creating an external table referencing the S3 bucket containing firewall logs, the Security Engineer can JOIN ACCOUNT_USAGE.QUERY_HISTORY with the external firewall log table in a single SQL query. Data sharing is for Snowflake-to-Snowflake sharing. PrivateLink is for network connectivity. Streams track changes to Snowflake tables.
**Source:** [External Tables](https://docs.snowflake.com/en/user-guide/tables-external-intro)
**Quote:** "External Tables allow SQL queries directly against data in external cloud storage, enabling cross-system analysis without data ingestion."

---

## Q32
**Answer:** B
**Explanation:** GDPR Article 15 (Right of Access/DSAR) requires organizations to provide: (1) confirmation of whether personal data is processed; (2) a copy of the personal data; (3) purposes of processing; (4) categories of data; (5) recipients; (6) retention periods. Snowflake ACCOUNT_USAGE queries (ACCESS_HISTORY, TAG_REFERENCES filtered by customer identifier columns) can help build this response. It is not a full account data dump or an encrypted export — it's structured information about specific data.
**Source:** [GDPR Right of Access](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "GDPR Subject Access Requests require a description of personal data held, purposes, recipients, and retention — answerable via Snowflake ACCOUNT_USAGE and governance views."

---

## Q33
**Answer:** A, B
**Explanation:** For detecting anomalous credit consumption as a security signal: (A) WAREHOUSE_METERING_HISTORY shows per-warehouse credit consumption over time; comparing current period vs. baseline identifies unusual spikes that could indicate unauthorized workloads; (B) QUERY_HISTORY with BYTES_SCANNED and ROWS_PRODUCED identifies specific queries that consumed unusual amounts of data, helping pinpoint the source of the anomaly. Together, these views provide both aggregate and query-level indicators.
**Source:** [Security Monitoring via ACCOUNT_USAGE](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "Monitor WAREHOUSE_METERING_HISTORY for credit anomalies and QUERY_HISTORY for query-level data access metrics to detect exfiltration patterns."

---

## Q34
**Answer:** A
**Explanation:** ACCOUNT_USAGE.TASK_HISTORY contains a record of all Snowflake task executions, including: task name, database, schema, start_time, completed_time, state (SUCCEEDED, FAILED, SKIPPED), return_value, query_ids for SQL statements executed, and error details for failures. This is the primary view for auditing scheduled task execution. SERVERLESS_TASK_HISTORY tracks serverless task credit consumption, not execution details. SCHEDULED_TASK_LOG is not a standard view.
**Source:** [TASK_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/task_history)
**Quote:** "TASK_HISTORY records all task run history including status, timing, and error details for compliance and operational monitoring."

---

## Q35
**Answer:** A
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY records all data access by Snowflake compute, including access from Snowpark Container Services. By filtering for queries run in SPCS context (identifiable by client_application_id or service name context), the Security Engineer can identify which data objects were accessed by container workloads. COMPUTE_POOL_EVENTS and SERVICE_USAGE_HISTORY are not standard Snowflake ACCOUNT_USAGE views. Network rules control egress, not access logging.
**Source:** [ACCESS_HISTORY for SPCS](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY captures data access from all Snowflake compute contexts, including Snowpark Container Services."

---

## Q36
**Answer:** B
**Explanation:** BYTES_SCANNED in QUERY_HISTORY represents the total amount of data (in bytes) read from storage during query execution. From a security perspective, a simple-looking query (e.g., SELECT * FROM small_table) with disproportionately large BYTES_SCANNED compared to normal expectations is a red flag for potential data exfiltration. A legitimate analytical query on large tables has expected high BYTES_SCANNED; anomalously large values for unusual queries warrant investigation.
**Source:** [QUERY_HISTORY Security Metrics](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "BYTES_SCANNED indicates the amount of data read by the query. Unusually large values for simple queries may indicate bulk data access or exfiltration attempts."

---

## Q37
**Answer:** A
**Explanation:** For ISO 27001 access control review evidence, querying ACCOUNT_USAGE.GRANTS_TO_ROLES (to map which roles have SELECT privileges on which tables) and ACCOUNT_USAGE.GRANTS_TO_USERS (to map which users have which roles) provides a complete role-to-user-to-table access matrix. SHOW commands are real-time snapshots without historical records. INFORMATION_SCHEMA.TABLE_PRIVILEGES is database-scoped and near-real-time only. Manually documenting from SHOW GRANTS is not scalable.
**Source:** [GRANTS_TO_ROLES and GRANTS_TO_USERS](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "JOIN GRANTS_TO_ROLES with GRANTS_TO_USERS to produce a complete role-to-user-to-object access matrix for access control reviews."

---

## Q38
**Answer:** B
**Explanation:** Trust Center's Leaked Credentials scanner integrates with threat intelligence feeds to identify Snowflake users whose credentials (passwords or other authentication tokens) have appeared in known external breach databases. When a match is found, the scanner creates a finding in Trust Center with remediation guidance (disable user, rotate credentials). Snowflake Horizon, Trail, and network policies are unrelated to credential breach detection.
**Source:** [Trust Center Leaked Credentials](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "The Leaked Credentials scanner identifies users whose credentials have been found in known external breach databases."

---

## Q39
**Answer:** A, C
**Explanation:** CCPA requires identifying and protecting California consumer personal data: (A) SYSTEM$CLASSIFY() automatically identifies and tags PII columns including those containing California consumer personal information, enabling governance at scale; (C) masking policies anonymize California consumer data for opt-out scenarios — when a consumer opts out of data sale, masking policies can return null/anonymized values for their records to roles used in data sale contexts. Time Travel proves data was not altered (B) is not CCPA-specific. Sharing opt-out lists (D) involves data transfer risk.
**Source:** [CCPA Compliance with Snowflake](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Automatic data classification and masking policies help organizations identify and protect California consumer personal information for CCPA compliance."

---

## Q40
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY has a maximum latency of up to 3 hours for most events to appear. This latency is important for security teams to understand: incidents from the past 3 hours may not yet be fully visible in ACCESS_HISTORY. For near-real-time access monitoring (under 7-day window), use INFORMATION_SCHEMA.ACCESS_HISTORY which has minimal latency. The 24-hour and 72-hour options are too long; real-time is incorrect.
**Source:** [ACCESS_HISTORY Latency](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY has a maximum data latency of approximately 3 hours."

---

## Q41
**Answer:** B
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY is the correct view for auditing GRANT and REVOKE statements. Each GRANT/REVOKE executed appears as a row with QUERY_TYPE = 'GRANT' or 'REVOKE', along with the full QUERY_TEXT showing exactly what was granted/revoked, the USER_NAME who executed it, ROLE_NAME used, and START_TIME. Filtering on QUERY_TYPE IN ('GRANT', 'REVOKE') and the 30-day window provides a complete privilege change audit. GRANTS_TO_ROLES (A) shows current state, not the history of REVOKE operations.
**Source:** [QUERY_HISTORY for GRANT Auditing](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "GRANT and REVOKE operations are recorded in QUERY_HISTORY with QUERY_TYPE = 'GRANT' or 'REVOKE', enabling privilege change auditing."

---

## Q42
**Answer:** B
**Explanation:** Trust Center with Security Essentials and Threat Intelligence scanners is the Snowflake built-in feature that automatically identifies high-risk security findings. Security Essentials checks include: users without MFA, missing network policies, ACCOUNTADMIN overuse, and disabled users still with active roles. Threat Intelligence identifies active threats. These run automatically as scanner packages and produce findings with remediation guidance, eliminating the need for custom queries.
**Source:** [Trust Center Scanners](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Trust Center's scanner packages automatically identify high-risk security findings such as missing MFA, misconfigured network policies, and active threat indicators."

---

## Q43
**Answer:** A, B
**Explanation:** For detecting anomalous credit usage from potential crypto-mining via Snowflake: (A) WAREHOUSE_METERING_HISTORY shows total warehouse credits per warehouse over time — a warehouse showing unexpectedly high credits with no scheduled workloads is suspicious; (B) QUERY_HISTORY filtered for Snowpark/Python UDF calls (QUERY_TYPE = 'CALL' or query text LIKE '%SNOWPARK%') identifies unusual computational patterns that might indicate abuse of Snowflake compute for non-business workloads.
**Source:** [Anomaly Detection via ACCOUNT_USAGE](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "Monitor WAREHOUSE_METERING_HISTORY for credit anomalies and QUERY_HISTORY for unusual computational workload patterns to detect misuse."

---

## Q44
**Answer:** A
**Explanation:** ACCOUNT_USAGE.POLICY_REFERENCES is the view that shows which policies (masking policies, row-access policies, projection policies, aggregation policies, session policies, authentication policies, network policies) are applied to which Snowflake objects. It includes the policy type, policy name, the object it's attached to, and attachment timestamps. There is no MASKING_POLICY_REFERENCES, SECURITY_POLICY_ASSIGNMENTS, or GOVERNANCE_POLICY_LOG view in standard ACCOUNT_USAGE.
**Source:** [POLICY_REFERENCES View](https://docs.snowflake.com/en/sql-reference/account-usage/policy_references)
**Quote:** "POLICY_REFERENCES shows all policy attachments across the account, including masking, row access, and projection policies."

---

## Q45
**Answer:** B
**Explanation:** The correct approach for PCI DSS 10.3.2 (protecting audit log integrity): document that ACCOUNT_USAGE views are read-only for customers and cannot be modified or deleted by account administrators (Snowflake itself manages the underlying storage). Reference Snowflake's SOC 2 Type II and PCI DSS compliance reports as third-party attestation of audit log integrity controls. Additionally, export logs to immutable external storage (AWS S3 Object Lock) as a belt-and-suspenders measure for maximum compliance evidence.
**Source:** [PCI DSS Audit Log Protection](https://docs.snowflake.com/en/user-guide/security-certs)
**Quote:** "ACCOUNT_USAGE views are read-only for customers. Snowflake's compliance reports attest to audit log integrity controls."

---

## Q46
**Answer:** B
**Explanation:** BASE_OBJECTS_ACCESSED in ACCOUNT_USAGE.ACCESS_HISTORY contains the base (leaf) tables and their specific columns that were ultimately read during query execution — even when accessed through views, joins, or other abstractions. This enables column-level data lineage: a query on a view shows the view as a direct object but reveals the underlying base tables and columns in BASE_OBJECTS_ACCESSED. This is critical for understanding the true scope of data access in complex queries.
**Source:** [ACCESS_HISTORY BASE_OBJECTS_ACCESSED](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "BASE_OBJECTS_ACCESSED lists the underlying tables and columns accessed through any view or abstraction layer, enabling column-level lineage tracing."

---

## Q47
**Answer:** A, C
**Explanation:** To detect brute-force attempts (>10 failed logins for one user in 5 minutes): (A) a Snowflake Alert evaluates a condition query against ACCOUNT_USAGE.LOGIN_HISTORY filtering for IS_SUCCESS = 'NO', grouping by USER_NAME and 5-minute time buckets, and fires when the count exceeds 10; (C) a notification integration (EMAIL, SNS, or WEBHOOK) is required to deliver the alert to the security team. Streams cannot be created on ACCOUNT_USAGE views (B). Network policies (D) cannot auto-respond to login count thresholds. Auto-revoking (E) is too aggressive.
**Source:** [Snowflake Alerts + Notification Integrations](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Combine Snowflake Alerts (for condition evaluation) with Notification Integrations (for delivery) to implement threshold-based security alerting."

---

## Q48
**Answer:** B
**Explanation:** The SECOND_AUTHENTICATION_FACTOR column in ACCOUNT_USAGE.LOGIN_HISTORY records whether a second authentication factor was used during the login attempt and which method (e.g., 'DUO', 'TOTP', 'PASSCODE'). When the column is NULL or empty, no MFA was used. This column enables compliance auditing: filtering for IS_SUCCESS = 'YES' AND SECOND_AUTHENTICATION_FACTOR IS NULL identifies successful logins without MFA.
**Source:** [LOGIN_HISTORY Columns](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "SECOND_AUTHENTICATION_FACTOR indicates which second authentication factor was used (e.g., DUO for MFA). NULL indicates no MFA was used."

---

## Q49
**Answer:** B
**Explanation:** ROWS_PRODUCED in ACCESS_HISTORY (or QUERY_HISTORY) is the key differentiator. In a legitimate multi-table join analysis, the analyst reads many tables but the join collapses them into a much smaller result set (ROWS_PRODUCED is small relative to tables accessed). In a data exfiltration scenario, ROWS_PRODUCED across all 15 tables would be large (the attacker is fetching full table contents). Large ROWS_PRODUCED combined with accesses to 15 sensitive tables is the strongest exfiltration signal.
**Source:** [QUERY_HISTORY ROWS_PRODUCED](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "ROWS_PRODUCED indicates the number of rows in the result set. Large row counts across multiple sensitive tables is a key indicator of potential data exfiltration."

---

## Q50
**Answer:** D
**Explanation:** The maximum retention period for Snowflake ACCOUNT_USAGE schema views is 365 days (1 year). This applies to most ACCOUNT_USAGE views including QUERY_HISTORY, LOGIN_HISTORY, ACCESS_HISTORY, GRANTS_TO_ROLES, and others. This 365-day retention is a key architectural limitation that organizations must account for when designing long-term compliance and audit log storage strategies.
**Source:** [ACCOUNT_USAGE Retention](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE views retain data for 365 days. For longer retention, export to external storage."

---

## Q51
**Answer:** A
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY records all DDL operations including policy changes. Filtering on QUERY_TYPE values specific to masking and row-access policy operations (CREATE_MASKING_POLICY, ALTER_MASKING_POLICY, DROP_MASKING_POLICY, CREATE_ROW_ACCESS_POLICY, etc.) for the past 30 days provides a complete monthly change audit. POLICY_REFERENCES (B) shows current state, not change history. GOVERNANCE_CHANGE_LOG, MASKING_POLICY_HISTORY, and ROW_ACCESS_POLICY_HISTORY are not standard Snowflake views.
**Source:** [QUERY_HISTORY for Policy DDL](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Policy creation, modification, and deletion events appear in QUERY_HISTORY with appropriate QUERY_TYPE values."

---

## Q52
**Answer:** A
**Explanation:** Trust Center's Security Essentials scanner includes a Stale Privileged Accounts check that identifies users who hold ACCOUNTADMIN or other high-privilege roles but have not used them in the past 90 days. This finding helps security teams identify accounts where the privileged access is no longer justified by active use. The scanner provides the finding and remediation guidance (revoke unused privileged roles).
**Source:** [Trust Center Security Essentials](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Security Essentials includes checks for stale privileged accounts — users with ACCOUNTADMIN or high-privilege roles that have been inactive for 90+ days."

---

## Q53
**Answer:** A
**Explanation:** The correct Snowflake-native architecture is: a Snowflake Task scheduled to run at midnight (USING CRON '0 0 * * *') that queries ACCOUNT_USAGE for failed events since the last run, INSERTs them into a reporting/staging table, and then triggers a notification integration to send an email summary. Tasks execute SQL and can call notification integrations. Streams cannot be created on ACCOUNT_USAGE views. External functions add unnecessary complexity.
**Source:** [Tasks + Notification Integrations](https://docs.snowflake.com/en/user-guide/tasks-intro)
**Quote:** "Snowflake Tasks can query ACCOUNT_USAGE views, populate reporting tables, and trigger notifications — enabling fully automated compliance reporting workflows."

---

## Q54
**Answer:** C
**Explanation:** ACCOUNT_USAGE.COPY_HISTORY specifically tracks COPY INTO operations, including those that write to external stages (data unloading). It records: the stage or table involved, the file path/destination, number of rows loaded/unloaded, bytes processed, status, and execution time. This view is the most targeted source for investigating COPY INTO @external_stage activities. ACCESS_HISTORY (B) also captures stage writes but COPY_HISTORY provides more granular COPY-specific details.
**Source:** [COPY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/copy_history)
**Quote:** "COPY_HISTORY records all COPY INTO operations including the source/destination stage, file details, row counts, and execution status."

---

## Q55
**Answer:** A, B
**Explanation:** To immediately halt a compromised service account: (A) ALTER USER BATCH_PROCESS_USER SET DISABLED = TRUE prevents any new connections from the account immediately — this is the fastest containment action; (B) SYSTEM$ABORT_SESSION(session_id) terminates existing active sessions that are currently executing queries. Both steps together ensure the account cannot start new queries (A) and cannot continue existing queries (B). Dropping the user (C) risks losing grant information and is harder to recover from.
**Source:** [Incident Containment](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "DISABLED = TRUE prevents new connections. SYSTEM$ABORT_SESSION terminates active sessions. Use both for immediate containment."

---

## Q56
**Answer:** B
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY filtered by QUERY_TYPE = 'CREATE_ROLE' is the correct approach for detecting unusual role creation activity. Each role creation appears as a query with QUERY_TYPE = 'CREATE_ROLE', along with the USER_NAME, ROLE_NAME used, and timestamp. Grouping by USER_NAME and date and filtering for high counts identifies potential privilege escalation or persistence mechanisms. ROLES shows current state only. GRANTS_TO_ROLES shows privilege assignments, not role creation.
**Source:** [QUERY_HISTORY for Role Management](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Role creation events appear in QUERY_HISTORY with QUERY_TYPE = 'CREATE_ROLE', enabling detection of unusual role creation patterns."

---

## Q57
**Answer:** A
**Explanation:** For a quarterly access review: JOIN ACCOUNT_USAGE.GRANTS_TO_ROLES (which shows which roles have SELECT on which specific tables in production databases, filtered by object_name pattern) with ACCOUNT_USAGE.GRANTS_TO_USERS (which shows which users have been granted each role) to produce the complete role-to-user-to-table access matrix. This provides the evidence auditors need for access certification. ACCESS_HISTORY shows access events, not granted access. INFORMATION_SCHEMA.APPLICABLE_ROLES is near-real-time and database-scoped only.
**Source:** [GRANTS_TO_ROLES and GRANTS_TO_USERS](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "JOIN GRANTS_TO_ROLES with GRANTS_TO_USERS to map each user's access path to specific production tables for quarterly access reviews."

---

## Q58
**Answer:** B
**Explanation:** ROWS_PRODUCED in QUERY_HISTORY represents the number of rows in the query's result set (the output returned to the client). From a security perspective, a simple-structured query (few tables, no complex aggregations) with an extremely large ROWS_PRODUCED value indicates that the user retrieved a large volume of data, which may suggest bulk data harvesting or exfiltration. Normal analytical queries typically produce much smaller result sets relative to the data scanned.
**Source:** [QUERY_HISTORY ROWS_PRODUCED](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "ROWS_PRODUCED: The number of rows in the query result set. Large values for simple queries may indicate bulk data access."

---

## Q59
**Answer:** A
**Explanation:** For HIPAA Technical Safeguard audit controls evidence, the most comprehensive package is: (1) Snowflake Trust Center compliance reports (including the HIPAA BAA and SOC 2 Type II report from Snowflake's compliance page) demonstrating Snowflake's own audit control implementation; plus (2) evidence that ACCOUNT_USAGE.ACCESS_HISTORY and LOGIN_HISTORY are actively monitored and retained, demonstrating the customer's implementation of audit controls. Together these demonstrate both platform and customer-level audit control compliance.
**Source:** [HIPAA Compliance Documentation](https://docs.snowflake.com/en/user-guide/security-certs)
**Quote:** "Snowflake's Trust Center provides compliance reports including HIPAA documentation. Combined with ACCOUNT_USAGE monitoring evidence, this satisfies HIPAA audit control requirements."

---

## Q60
**Answer:** B
**Explanation:** Trust Center's Threat Intelligence scanner is designed to detect active security threats rather than configuration issues (which is Security Essentials' domain). Threat Intelligence cross-references Snowflake account activity against threat intelligence feeds to identify: logins from known malicious IP addresses, credential stuffing patterns, anomalous login behavior, and other active threat indicators. This provides proactive threat detection rather than reactive security hygiene checks.
**Source:** [Trust Center Threat Intelligence](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Threat Intelligence detects active security threats by correlating account activity against threat intelligence databases, identifying malicious IPs and anomalous access patterns."

---

## Q61
**Answer:** B
**Explanation:** This is expected and correct Snowflake behavior. Snowflake views use definer's security — the view's OWNER role's privileges allow access to the underlying tables, not the querying user's role. A user with SELECT on a view does not need SELECT on the base tables; Snowflake resolves the view using the owner's privileges. ACCESS_HISTORY correctly records the base tables accessed (for audit purposes), even though the user didn't have direct grants on them. This is not a security bug — it's how view security works.
**Source:** [View Security Model](https://docs.snowflake.com/en/user-guide/views-introduction)
**Quote:** "Views use definer's security: the view owner's privileges are used to access underlying tables. The querying user only needs SELECT on the view."

---

## Q62
**Answer:** B
**Explanation:** Account parameter changes (ALTER ACCOUNT SET ...) are recorded in ACCOUNT_USAGE.QUERY_HISTORY as DDL queries with QUERY_TYPE = 'ALTER_ACCOUNT'. This includes network policy assignments, session policy assignments, authentication policy changes, and other account-level configuration changes. The QUERY_TEXT contains the specific ALTER ACCOUNT SET statement executed, providing a complete audit trail of configuration changes. PARAMETER_HISTORY, ACCOUNT_CHANGES, and CONFIGURATION_HISTORY are not standard ACCOUNT_USAGE views.
**Source:** [QUERY_HISTORY for Account Changes](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "ALTER ACCOUNT operations appear in QUERY_HISTORY with QUERY_TYPE = 'ALTER_ACCOUNT', providing an audit trail of account parameter changes."

---

## Q63
**Answer:** A, B
**Explanation:** For building a technical GDPR Record of Processing Activities (RoPA): (A) ACCOUNT_USAGE.ACCESS_HISTORY shows which users access which data tables and columns, documenting processing activities (who processes what and when); and (B) ACCOUNT_USAGE.TAG_REFERENCES shows which tables and columns are tagged as PII/GDPR-relevant, providing the inventory of personal data being processed. Together these enable documenting: data categories, processors (users/roles), and data scope — core RoPA components.
**Source:** [GDPR RoPA with Snowflake](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "ACCESS_HISTORY (who processes what) and TAG_REFERENCES (what data is classified as personal) together support building a GDPR Record of Processing Activities."

---

## Q64
**Answer:** C
**Explanation:** ACCOUNT_USAGE.LOGIN_HISTORY has a default retention period of 365 days (1 year). This applies consistently with other ACCOUNT_USAGE views. The 365-day retention satisfies many regulatory requirements for authentication audit log retention (SOC 2 requires reasonable retention; PCI DSS 10.7 requires 12 months). For longer retention, export to external storage.
**Source:** [LOGIN_HISTORY Retention](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "ACCOUNT_USAGE.LOGIN_HISTORY retains data for 365 days."

---

## Q65
**Answer:** A
**Explanation:** The most efficient query JOINs QUERY_HISTORY with ACCESS_HISTORY on QUERY_ID (for the specific user and 30-minute window around the incident time), retrieving both the query text and the BASE_OBJECTS_ACCESSED (which objects were accessed, including column-level detail). This gives the complete picture for the incident timeline: what queries ran (QUERY_HISTORY) and what data was touched (ACCESS_HISTORY). Option D uses INFORMATION_SCHEMA which has only 7-day retention.
**Source:** [QUERY_HISTORY + ACCESS_HISTORY JOIN](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "JOIN QUERY_HISTORY with ACCESS_HISTORY on QUERY_ID to correlate query execution with data access details for incident investigation."

---

## Q66
**Answer:** A
**Explanation:** ACCOUNT_USAGE.DATA_SHARING_USAGE provides information about data sharing activity including share creation, modification, and consumer access history. For tracking share-related DDL (CREATE SHARE, ALTER SHARE, DROP SHARE, GRANT ON SHARE), QUERY_HISTORY is also a valid source. Among the options, DATA_SHARING_USAGE (A) is the primary view designed for data sharing audit. SHARE_HISTORY, SHARING_EVENTS are not standard view names. ACCOUNT_USAGE.SHARES shows current/historical share definitions.
**Source:** [DATA_SHARING_USAGE](https://docs.snowflake.com/en/sql-reference/account-usage/data_sharing_usage)
**Quote:** "DATA_SHARING_USAGE tracks data sharing activity including share creation and consumer access history."

---

## Q67
**Answer:** A, B
**Explanation:** For a GDPR regulatory response on encryption: (A) Snowflake encrypts all data at rest using AES-256 by default, regardless of data sensitivity or tags — this is a factual statement suitable for GDPR compliance documentation; (B) Snowflake encrypts all data in transit using TLS 1.2 or higher for all client connections — this is also accurate for GDPR's data protection in transit requirements. Option C (only tagged columns) is false. Option D (key rotation) is accurate but less fundamental. Option E (client-side only) is false.
**Source:** [Snowflake Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)
**Quote:** "Snowflake encrypts all data at rest with AES-256 and all data in transit with TLS 1.2+."

---

## Q68
**Answer:** A
**Explanation:** Snowflake Trail, when combined with Snowflake Event Tables, provides logging and tracing of Snowflake Cortex AI LLM function calls (COMPLETE, CLASSIFY_TEXT, etc.) and Snowpark code execution. By enabling Event Table logging and configuring trace levels, execution events are captured in the Event Table for security auditing and observability. ACCOUNT_USAGE.CORTEX_AI_AUDIT_LOG and Trust Center AI Scanner are not standard Snowflake features.
**Source:** [Snowflake Trail and Event Tables](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-overview)
**Quote:** "Snowflake Trail and Event Tables capture log messages, traces, and metrics from Cortex AI function calls and Snowpark code."

---

## Q69
**Answer:** B
**Explanation:** The SNOWFLAKE.GOVERNANCE_VIEWER database role is specifically designed for compliance officers and auditors. It grants read access to ACCOUNT_USAGE governance views (ACCESS_HISTORY, LOGIN_HISTORY, GRANTS_TO_ROLES, etc.) without granting any ability to modify objects, create objects, or access business data directly. Assigning only this database role to a compliance role ensures precise, least-privilege audit access. Granting ACCOUNTADMIN (A) is excessively broad.
**Source:** [SNOWFLAKE Database Roles](https://docs.snowflake.com/en/sql-reference/snowflake-db-roles)
**Quote:** "SNOWFLAKE.GOVERNANCE_VIEWER grants read-only access to ACCOUNT_USAGE governance views, suitable for compliance officers."

---

## Q70
**Answer:** B
**Explanation:** ACCOUNT_USAGE.OBJECT_DEPENDENCIES shows the structural relationships between Snowflake objects — which views depend on which tables, which functions are called by which procedures, etc. From a security perspective, this enables impact analysis: before changing a table's security settings (e.g., applying a masking policy, revoking a privilege), the Security Engineer can query OBJECT_DEPENDENCIES to understand which views and downstream objects will be affected.
**Source:** [OBJECT_DEPENDENCIES View](https://docs.snowflake.com/en/sql-reference/account-usage/object_dependencies)
**Quote:** "OBJECT_DEPENDENCIES maps structural relationships between objects, enabling impact analysis before making security-sensitive changes."

---

## Q71
**Answer:** A
**Explanation:** The correct query uses ACCOUNT_USAGE.LOGIN_HISTORY with: DATE_TRUNC('week', EVENT_TIMESTAMP) for weekly bucketing, CLIENT_IP for the source IP, IS_SUCCESS = 'NO' to filter for failures, and COUNT(*) for aggregation. This produces a weekly trend of failed login attempts by source IP. Option B uses SESSIONS (which doesn't have LOGIN_SUCCESS) and WEEK() (non-standard). Option C uses QUERY_HISTORY (wrong view for login events). Option D queries USERS (wrong approach).
**Source:** [LOGIN_HISTORY Analytics](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "LOGIN_HISTORY with IS_SUCCESS = 'NO' and DATE_TRUNC for time bucketing enables trend analysis of failed authentication attempts."

---

## Q72
**Answer:** B
**Explanation:** ACCOUNT_USAGE.INTEGRATIONS is the view that lists all integrations in the Snowflake account, including security integrations (OAuth, SAML2, SCIM). It shows the integration name, type, category (SECURITY), creation timestamp, enabled/disabled status, and other configuration metadata. There is no ACCOUNT_USAGE.SECURITY_INTEGRATIONS view. INFORMATION_SCHEMA.SECURITY_INTEGRATIONS is not a standard view name. OAUTH_INTEGRATIONS is not a specific ACCOUNT_USAGE view.
**Source:** [ACCOUNT_USAGE.INTEGRATIONS](https://docs.snowflake.com/en/sql-reference/account-usage/integrations)
**Quote:** "ACCOUNT_USAGE.INTEGRATIONS shows all integration objects including security integrations (OAuth, SAML2, SCIM) with their configuration status."

---

## Q73
**Answer:** A
**Explanation:** To enforce MFA, create an authentication policy that specifies MFA_AUTHENTICATION_METHODS = ('TOTP') (or similar MFA parameter) and AUTHENTICATION_METHODS = ('PASSWORD', 'SAML2') indicating which authentication paths require MFA. Then assign the policy to the user via ALTER USER <username> SET AUTHENTICATION POLICY mfa_policy. Option D uses MULTI_FACTOR_AUTHENTICATION_ENFORCE which is not the correct parameter name. MFA_ENABLED = TRUE (B) is not a valid ALTER USER parameter.
**Source:** [Authentication Policies - MFA Enforcement](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Create an authentication policy with MFA requirements and assign it to users via ALTER USER ... SET AUTHENTICATION POLICY."

---

## Q74
**Answer:** B
**Explanation:** Trust Center's Security Essentials scanner is designed to check core security hygiene settings across the Snowflake account. It evaluates: MFA adoption (how many users don't have MFA enabled), network policy coverage (accounts/users without network policies), admin account usage patterns (ACCOUNTADMIN usage frequency), credential security (password policies, expired credentials), and other fundamental security baseline checks. Threat Intelligence handles active external threats; Security Essentials handles hygiene.
**Source:** [Trust Center Security Essentials](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Security Essentials checks core security hygiene: MFA adoption, network policy coverage, admin account usage, and credential security."

---

## Q75
**Answer:** A
**Explanation:** The most practical Snowflake-native quarterly access review: schedule a Snowflake Task (USING CRON '0 0 1 */3 *' for quarterly) that exports ACCOUNT_USAGE.GRANTS_TO_ROLES (all SELECT grants on production tables) and GRANTS_TO_USERS (role-to-user assignments) into a reporting table. Generate a report for managers to review. Use a task to automatically disable access for roles not recertified in the review. Trust Center (B) doesn't have a native access review workflow.
**Source:** [Periodic Access Reviews](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "Use scheduled Tasks to automate quarterly access review data collection from GRANTS_TO_ROLES and GRANTS_TO_USERS."

---

## Q76
**Answer:** A
**Explanation:** To receive email notifications from a Snowflake Alert, configure a notification integration with TYPE = EMAIL (specifying the email addresses in ALLOWED_RECIPIENTS) and reference it as the alert's action. The alert condition query runs on schedule, and when the condition is met, Snowflake sends an email via the notification integration. There is no Snowflake trigger or SENDMAIL function for this purpose. Tasks scheduled for daily digest (D) is a workaround, not the designed approach.
**Source:** [Alert Actions and Notification Integrations](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Alerts use notification integrations to deliver notifications. Create a notification integration with TYPE = EMAIL to send email alerts."

---

## Q77
**Answer:** B
**Explanation:** The security posture dashboard requires multiple ACCOUNT_USAGE views: USERS (HAS_MFA = FALSE for users without MFA); GRANTS_TO_USERS (for counting users with ACCOUNTADMIN role); LOGIN_HISTORY (IS_SUCCESS = 'NO' count for past 24 hours); and POLICY_REFERENCES (to identify objects or users without network policy). These are combined in Snowsight using a dashboard with individual chart widgets. This comprehensive multi-view approach captures all required KPIs.
**Source:** [Security Dashboard Design](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "Combine multiple ACCOUNT_USAGE views — USERS, GRANTS_TO_USERS, LOGIN_HISTORY, and POLICY_REFERENCES — to build a comprehensive security posture dashboard."

---

## Q78
**Answer:** B
**Explanation:** Changes to user properties (password changes, MFA enabling/disabling, DISABLED status changes, etc.) are recorded in ACCOUNT_USAGE.QUERY_HISTORY as ALTER USER statements with QUERY_TYPE = 'ALTER_USER'. The QUERY_TEXT contains the specific ALTER USER command executed (e.g., SET DISABLED = TRUE, SET PASSWORD = '...'), revealing what property was changed, when, and by whom. USER_CHANGES and USER_HISTORY are not standard ACCOUNT_USAGE views.
**Source:** [QUERY_HISTORY for User Changes](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "ALTER USER operations appear in QUERY_HISTORY with QUERY_TYPE = 'ALTER_USER', providing an audit trail of user property changes."

---

## Q79
**Answer:** A
**Explanation:** The query groups LOGIN_HISTORY by CLIENT_IP and counts DISTINCT USER_NAME for successful logins in the past 2 hours, filtering for IPs where more than 5 distinct users have authenticated. A single IP authenticating as many different users quickly is suspicious — it could indicate credential stuffing from a bot network or a corporate NAT gateway that requires investigation. This query correctly identifies the pattern with proper aggregation and time filtering.
**Source:** [LOGIN_HISTORY Analytics](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "GROUP BY CLIENT_IP with COUNT(DISTINCT USER_NAME) identifies IPs authenticating as multiple users — a potential credential stuffing or shared device indicator."

---

## Q80
**Answer:** B
**Explanation:** Snowflake Trail, when paired with Snowflake Event Tables and configured with appropriate LOG_LEVEL and TRACE_LEVEL settings on Snowpark Python UDFs/stored procedures and Cortex AI functions, captures detailed execution telemetry. This includes log messages emitted via the Python logging framework, execution traces (call stacks), and metrics. The Event Table stores this telemetry for security analysis. Snowflake Profiler and Audit Interceptor are not standard Snowflake features.
**Source:** [Snowflake Event Tables and Trail](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-overview)
**Quote:** "Enable Snowflake Trail with Event Tables to capture log messages, traces, and metrics from Snowpark and Cortex AI workloads."

---

## Q81
**Answer:** A
**Explanation:** ACCOUNT_USAGE.COPY_HISTORY records all COPY INTO operations, including data unloading (COPY INTO @stage FROM table). Filtering by DATE_RANGE (between 2026-03-01 and 2026-03-10) and STATUS = 'Loaded' identifies successful data exports. The view includes: stage name, source table, file path, rows exported, bytes written, and timestamps. This is the most specific view for investigating COPY INTO external stage operations, providing file-level granularity of what was exported.
**Source:** [COPY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/copy_history)
**Quote:** "COPY_HISTORY records COPY INTO operations including data exports to external stages, with file-level details and status."

---

## Q82
**Answer:** A
**Explanation:** ACCOUNT_USAGE.GRANTS_TO_ROLES shows all privilege grants on all object types — including account-level objects (databases, warehouses, integrations, resource monitors), schema-level objects (tables, views, stages), and account-level privileges (CREATE DATABASE, MANAGE GRANTS, etc.) — along with the grantee role, grantor, and grant timestamps. OBJECT_PRIVILEGES, ROLE_PRIVILEGES, and PRIVILEGE_GRANTS are not standard Snowflake ACCOUNT_USAGE view names.
**Source:** [GRANTS_TO_ROLES View](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "GRANTS_TO_ROLES contains all privilege grants for all object types, enabling comprehensive privilege auditing."

---

## Q83
**Answer:** B
**Explanation:** To retain Snowflake audit logs for 3 years, set up a daily Snowflake Task that copies new records from ACCOUNT_USAGE.QUERY_HISTORY and ACCESS_HISTORY into a dedicated Snowflake table using a watermark timestamp (to avoid duplicates). Snowflake tables have no inherent retention limit. Alternatively, export to AWS S3 with Object Lock for immutable 3-year retention. There is no ACCOUNT_USAGE retention extension option, and Fail-safe is not applicable to ACCOUNT_USAGE metadata.
**Source:** [Long-Term Audit Log Retention](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "For retention beyond 365 days, use scheduled Tasks to copy ACCOUNT_USAGE records to a dedicated table or external storage."

---

## Q84
**Answer:** B
**Explanation:** The key differences: ACCOUNT_USAGE has up to 3-hour latency (varies by view) but retains data for 1 year (365 days) and includes records for deleted objects; INFORMATION_SCHEMA is near-real-time (minimal latency) but only retains data for 7 days (some views), is scoped to the current database, and does not include deleted objects. Security teams must choose based on their needs: near-real-time monitoring (INFORMATION_SCHEMA) vs. historical analysis (ACCOUNT_USAGE).
**Source:** [ACCOUNT_USAGE vs INFORMATION_SCHEMA](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE: 1-year retention, up to 3-hour latency, includes deleted objects. INFORMATION_SCHEMA: near-real-time, 7-day retention, current objects only."

---

## Q85
**Answer:** A
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY contains BASE_OBJECTS_ACCESSED as a JSON array. Using ARRAY_SIZE(PARSE_JSON(BASE_OBJECTS_ACCESSED)) > 10 counts the number of distinct base tables accessed in a single query. Creating a daily Alert on this condition identifies queries that accessed more than 10 tables in one query. This is the correct approach for detecting cross-table data harvesting. MAX_TABLE_SCAN_RANGE is not a valid Snowflake parameter.
**Source:** [ACCESS_HISTORY Advanced Analytics](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "Use ARRAY_SIZE on BASE_OBJECTS_ACCESSED to count tables accessed per query and alert on unusual multi-table access patterns."

---

## Q86
**Answer:** B
**Explanation:** The SCHEDULE parameter in a Snowflake Alert definition specifies how frequently the alert's condition query is evaluated. It accepts cron expressions (USING CRON '*/5 * * * *' for every 5 minutes) or interval expressions (USING INTERVAL 5 MINUTE). This controls the detection frequency — shorter schedules detect threats faster but consume more warehouse credits for the condition evaluation. It does not control notification delivery timing or maintenance windows.
**Source:** [Snowflake Alert SCHEDULE](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "The SCHEDULE parameter specifies how often the alert condition is evaluated, using CRON or INTERVAL syntax."

---

## Q87
**Answer:** C
**Explanation:** The pure Snowflake-native SIEM-lite architecture: (1) ACCOUNT_USAGE.LOGIN_HISTORY already collects all login events natively (no Event Table needed for this); (2) a Snowflake Alert with a condition query against LOGIN_HISTORY detecting brute-force patterns (failed logins grouped by user/IP within time windows); (3) a Notification Integration with TYPE = EMAIL delivers the alert when the condition fires. This uses only Snowflake-native components and requires no external tools.
**Source:** [Snowflake-Native Security Monitoring](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Snowflake Alerts on ACCOUNT_USAGE views combined with Notification Integrations provide a fully Snowflake-native security monitoring capability."

---

## Q88
**Answer:** B
**Explanation:** Trust Center's Security Essentials scanner includes CIS (Center for Internet Security) Benchmark checks for Snowflake. These checks assess the account's configuration against industry-standard security recommendations for cloud databases, covering authentication, network security, audit logging, and access control. The Security Essentials package maps findings to CIS benchmark control numbers, providing structured compliance evidence.
**Source:** [Trust Center CIS Benchmarks](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Trust Center's Security Essentials scanner includes CIS Benchmark checks for Snowflake, providing structured compliance assessments."

---

## Q89
**Answer:** A, B
**Explanation:** For a GDPR 72-hour breach notification: (A) ACCOUNT_USAGE.ACCESS_HISTORY is the primary source — it shows which PII tables/columns were accessed, by which users, and during which time window, providing the "what data and who" for the breach notification; (B) ACCOUNT_USAGE.LOGIN_HISTORY confirms which accounts were active and authenticated during the breach window, verifying account compromise status. COPY_HISTORY (E) is also relevant for detecting exports but A and B are the primary sources for breach notification content.
**Source:** [GDPR Breach Response](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCESS_HISTORY and LOGIN_HISTORY are the primary views for GDPR breach notification: they document what personal data was accessed, by whom, and when."

---

## Q90
**Answer:** B
**Explanation:** ACCOUNT_USAGE.COPY_HISTORY tracks both Snowpipe (automated continuous loading) and manual COPY INTO TABLE operations. It records: the table loaded, source stage, file names loaded, load timestamp, number of rows loaded, bytes loaded, and status (LOADED, PARTIALLY_LOADED, FAILED). PIPE_USAGE_HISTORY tracks credit consumption for Snowpipe. PIPE_HISTORY and LOAD_HISTORY are not standard ACCOUNT_USAGE views (LOAD_HISTORY exists in INFORMATION_SCHEMA with different retention).
**Source:** [COPY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/copy_history)
**Quote:** "COPY_HISTORY records all COPY INTO operations including Snowpipe loads, with file-level details, row counts, and load status."
