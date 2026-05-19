# Domain 3: Auditing, Monitoring, and Compliance

---

## Q1 (Scenario)
A Security Engineer needs to identify all queries that accessed the CUSTOMERS table in the past 7 days, including which columns were read and which user ran the query. Which ACCOUNT_USAGE view should be queried?
- A) ACCOUNT_USAGE.QUERY_HISTORY — parse QUERY_TEXT for column references
- B) ACCOUNT_USAGE.ACCESS_HISTORY — filter by OBJECTS_ACCESSED containing the CUSTOMERS table
- C) ACCOUNT_USAGE.SESSIONS — review session-level data access summary
- D) ACCOUNT_USAGE.GRANTS_TO_ROLES — check SELECT grants on CUSTOMERS

---

## Q2 (Single Answer)
What is the data latency for most ACCOUNT_USAGE views in Snowflake compared to INFORMATION_SCHEMA views?
- A) ACCOUNT_USAGE views are real-time; INFORMATION_SCHEMA views have up to 24-hour latency
- B) ACCOUNT_USAGE views have a latency of up to 3 hours for most views; INFORMATION_SCHEMA views are near-real-time
- C) Both have identical latency of approximately 1 hour
- D) ACCOUNT_USAGE views are only updated weekly; INFORMATION_SCHEMA views are real-time

---

## Q3 (Scenario)
A Security Engineer receives an alert from an external SIEM tool about anomalous activity in the Snowflake account. The alert references multiple failed login attempts from IP 198.51.100.99 for user ADMIN. The engineer needs to investigate which authentication methods were attempted. Which ACCOUNT_USAGE view provides this information?
- A) ACCOUNT_USAGE.SESSIONS
- B) ACCOUNT_USAGE.LOGIN_HISTORY
- C) ACCOUNT_USAGE.AUTHENTICATION_HISTORY
- D) ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE = 'LOGIN'

---

## Q4 (Single Answer)
Which Snowflake ACCOUNT_USAGE view contains a record of every query executed in the account, including the role used, warehouse, start time, duration, and status?
- A) ACCOUNT_USAGE.SESSIONS
- B) ACCOUNT_USAGE.QUERY_HISTORY
- C) ACCOUNT_USAGE.TASK_HISTORY
- D) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY

---

## Q5 (Scenario)
A compliance officer needs a report of all data that user REPORTING_USER has accessed in the last 30 days, including base table columns, for a GDPR Subject Access Request. Which Snowflake feature provides the most granular data access record?
- A) ACCOUNT_USAGE.QUERY_HISTORY parsed for column names
- B) ACCOUNT_USAGE.ACCESS_HISTORY filtered by USER_NAME = 'REPORTING_USER', which includes BASE_OBJECTS_ACCESSED with column-level detail
- C) INFORMATION_SCHEMA.QUERY_HISTORY for real-time data
- D) ACCOUNT_USAGE.SESSIONS filtered by USER_NAME for session-level access summaries

---

## Q6 (Single Answer)
Which Snowflake ACCOUNT_USAGE view tracks changes to secure objects such as views, functions, and stored procedures — specifically recording when these objects are created, altered, or dropped?
- A) ACCOUNT_USAGE.SECURE_OBJECT_CHANGES
- B) ACCOUNT_USAGE.QUERY_HISTORY (filtering by QUERY_TYPE IN ('CREATE', 'ALTER', 'DROP'))
- C) ACCOUNT_USAGE.OBJECT_CHANGES (not a standard view)
- D) There is no dedicated view; use ACCOUNT_USAGE.QUERY_HISTORY with DDL query types

---

## Q7 (Scenario)
A Security Engineer wants to set up an automated alert that fires when any user is granted the ACCOUNTADMIN role. The alert must send a notification to the security team's email within minutes of the grant. Which Snowflake components should be used?
- A) A scheduled task that queries ACCOUNT_USAGE.GRANTS_TO_ROLES every 5 minutes and sends a notification via SYSTEM$SEND_EMAIL if a new ACCOUNTADMIN grant is detected
- B) A Snowflake stream on ACCOUNT_USAGE.GRANTS_TO_ROLES triggering a task that sends an alert
- C) A Snowflake Alert object that evaluates a condition query against ACCOUNT_USAGE.GRANTS_TO_ROLES every 5 minutes and fires a notification integration when new ACCOUNTADMIN grants appear
- D) Configure a Snowflake Trust Center scanner that monitors ACCOUNTADMIN grants in real time

---

## Q8 (Single Answer)
What is the retention period for the ACCOUNT_USAGE.QUERY_HISTORY view in Snowflake?
- A) 7 days
- B) 30 days
- C) 90 days
- D) 365 days

---

## Q9 (Scenario)
A Security Engineer needs to audit all DDL operations (CREATE, ALTER, DROP) performed by users in the past 14 days to detect unauthorized schema changes. Which query approach is BEST?
- A) SELECT * FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE IN ('CREATE', 'CREATE_TABLE', 'ALTER_TABLE', 'DROP', 'DROP_TABLE') AND START_TIME > DATEADD(day, -14, CURRENT_TIMESTAMP())
- B) SELECT * FROM ACCOUNT_USAGE.ACCESS_HISTORY WHERE OBJECTS_MODIFIED IS NOT NULL AND QUERY_START_TIME > DATEADD(day, -14, CURRENT_TIMESTAMP())
- C) SELECT * FROM ACCOUNT_USAGE.SESSIONS WHERE SESSION_TYPE = 'DDL' AND CREATED_ON > DATEADD(day, -14, CURRENT_TIMESTAMP())
- D) SELECT * FROM INFORMATION_SCHEMA.QUERY_HISTORY WHERE QUERY_TYPE = 'DDL' (INFORMATION_SCHEMA has 7-day retention only)

---

## Q10 (Single Answer)
Which Snowflake feature provides pre-built security scanner packages that evaluate common security risks (such as misconfigured network policies, disabled MFA, or leaked credentials) and produce finding reports with remediation guidance?
- A) Snowflake Trail
- B) Trust Center
- C) Horizon Catalog
- D) Data Quality Monitors

---

## Q11 (Scenario)
A Security Engineer is tasked with monitoring for suspicious SELECT queries on a sensitive table (FINANCIAL_DATA) — specifically queries that return more than 10,000 rows at once, which may indicate data exfiltration. Which Snowflake approach BEST automates detection of this pattern?
- A) Create a Snowflake ALERT that evaluates: SELECT COUNT(*) FROM ACCOUNT_USAGE.ACCESS_HISTORY WHERE OBJECTS_ACCESSED LIKE '%FINANCIAL_DATA%' AND ROWS_PRODUCED > 10000 every 15 minutes; fire a notification when count > 0
- B) Apply a row-access policy to FINANCIAL_DATA that limits result sets to 10,000 rows
- C) Create a resource monitor on the warehouse running FINANCIAL_DATA queries to alert on credit spikes
- D) Use a Snowflake stream on FINANCIAL_DATA to detect large reads and trigger a task

---

## Q12 (Single Answer)
What is the primary purpose of the Snowflake Trail feature?
- A) To provide a real-time stream of all SQL queries for external SIEM integration
- B) To observe and trace the execution flow of Snowflake Cortex AI and ML workloads for security and debugging purposes
- C) To audit all privilege grants and revocations across the account
- D) To detect and alert on anomalous credit consumption patterns

---

## Q13 (Scenario)
A Security Engineer configures a notification integration to send alerts to a corporate Slack channel when suspicious activity is detected. The integration type is WEBHOOK. After setting it up, the alert fires but no message appears in Slack. What is the MOST likely cause?
- A) Snowflake does not support WEBHOOK notification integrations; only email and SNS are supported
- B) The ALLOWED_RECIPIENTS list in the notification integration does not include the Slack webhook URL
- C) The notification integration requires ACCOUNTADMIN to approve webhook notifications
- D) The webhook URL has not been validated or the webhook secret is incorrect; Snowflake cannot connect to the Slack endpoint

---

## Q14 (Single Answer)
Which Snowflake ACCOUNT_USAGE view shows who has logged into the account, including whether the login was successful, the source IP, and the authentication method used?
- A) ACCOUNT_USAGE.SESSIONS
- B) ACCOUNT_USAGE.LOGIN_HISTORY
- C) ACCOUNT_USAGE.AUTHENTICATION_EVENTS
- D) ACCOUNT_USAGE.USER_ACTIVITY

---

## Q15 (Scenario)
A Security Engineer needs to verify that all access to the PHI_TABLE (containing Protected Health Information) is being logged. They query ACCOUNT_USAGE.ACCESS_HISTORY but find that some queries appear in QUERY_HISTORY but not ACCESS_HISTORY. What is the most likely explanation?
- A) ACCESS_HISTORY only logs SELECT statements; INSERT and UPDATE are not tracked
- B) ACCESS_HISTORY has a latency of up to 3 hours; recent queries may not yet appear
- C) ACCESS_HISTORY only tracks access by ACCOUNTADMIN; other role access is not logged
- D) PHI_TABLE must be tagged with ENABLE_ACCESS_HISTORY = TRUE for logging to occur

---

## Q16 (Single Answer)
Which Snowflake SQL component is used to set up alerting — evaluating a condition on a schedule and triggering actions (like sending notifications) when the condition is TRUE?
- A) Snowflake Task with a conditional WHEN clause
- B) Snowflake Alert
- C) Snowflake Stream with alert trigger
- D) Snowflake Event Table with notification hook

---

## Q17 (Scenario)
A financial institution uses Snowflake for trading data. Regulations require that all query activity on the TRADING_DB database be retained and available for audit for a minimum of 7 years. Snowflake's ACCOUNT_USAGE retention is 1 year. How should the Security Engineer address the gap?
- A) Contact Snowflake to extend the ACCOUNT_USAGE retention period to 7 years
- B) Create a scheduled Snowflake task that copies ACCOUNT_USAGE.QUERY_HISTORY and ACCESS_HISTORY records to a separate long-retention table in Snowflake or to an external data lake daily
- C) Use Snowflake Trail to export all activity to a 7-year retention external system
- D) Enable the EXTENDED_AUDIT_RETENTION account parameter and set it to 2555 days

---

## Q18 (Single Answer)
Which Snowflake compliance report is focused on controls relevant to information security, availability, processing integrity, and confidentiality, commonly used by SaaS companies?
- A) ISO 27001
- B) PCI DSS Report on Compliance (RoC)
- C) SOC 2 Type II
- D) HIPAA Business Associate Agreement (BAA)

---

## Q19 (Scenario)
A Security Engineer is integrating Snowflake with a Splunk SIEM. The team wants to forward all Snowflake QUERY_HISTORY and LOGIN_HISTORY events to Splunk in real time (or near-real time). Which Snowflake mechanism enables this streaming-like export?
- A) Create a Snowflake notification integration of type WEBHOOK pointing to Splunk's HTTP Event Collector (HEC)
- B) Set up a Snowflake task that runs every 5 minutes to query ACCOUNT_USAGE views and INSERT new records into an external Splunk stage
- C) Use Snowflake Streams on ACCOUNT_USAGE views to detect new events and trigger a task that forwards them to Splunk via an external access integration or notification integration
- D) Enable the SPLUNK_INTEGRATION account parameter to activate native Splunk forwarding

---

## Q20 (Single Answer)
Snowflake's ACCESS_HISTORY view records what type of information about each query?
- A) Only the query text and warehouse used
- B) The objects directly referenced in the query (DIRECT_OBJECTS_ACCESSED) and the base tables underlying those objects (BASE_OBJECTS_ACCESSED), including column-level detail
- C) Only the tables and views accessed, without column-level detail
- D) Query execution plan steps and partition statistics

---

## Q21 (Multi Answer - Select 2)
A Security Engineer receives a report that a data analyst was running queries between 2 AM and 4 AM UTC — outside normal business hours — and accessed the PAYROLL table. The engineer must investigate this activity. Which ACCOUNT_USAGE views and fields are MOST useful? (Select TWO)
- A) ACCOUNT_USAGE.LOGIN_HISTORY — to verify the analyst's login time, source IP, and authentication method
- B) ACCOUNT_USAGE.ACCESS_HISTORY — to confirm PAYROLL table was accessed and see which columns were read
- C) ACCOUNT_USAGE.SESSIONS — to see how long the analyst's session lasted
- D) ACCOUNT_USAGE.GRANTS_TO_ROLES — to verify the analyst's role permissions
- E) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY — to check credit usage during that period

---

## Q22 (Single Answer)
When Snowflake sends an alert notification, which Snowflake object type is used to define the external destination (such as an email address, SNS topic, or webhook URL)?
- A) Security integration
- B) Notification integration
- C) External access integration
- D) Storage integration

---

## Q23 (Scenario)
A Security Engineer needs to implement a compliance control for HIPAA: all queries accessing the PHI schema must be logged, and the log must be tamper-evident and immutable. Snowflake ACCOUNT_USAGE views are mutable by Snowflake (not by the customer). Which additional control should be recommended?
- A) Use Snowflake Fail-safe on the audit log table to prevent tampering
- B) Export ACCOUNT_USAGE logs to an immutable, append-only external data store (such as AWS S3 Object Lock or Azure Immutable Blob Storage) on a scheduled basis
- C) Apply a row-access policy on ACCOUNT_USAGE.QUERY_HISTORY to prevent modification
- D) Use a masking policy on ACCOUNT_USAGE views to protect audit log integrity

---

## Q24 (Single Answer)
Which Snowflake ACCOUNT_USAGE view specifically tracks the usage of Snowflake serverless features (such as Snowflake Pipes, Tasks, and other serverless services) and their credit consumption?
- A) ACCOUNT_USAGE.SERVERLESS_TASK_HISTORY
- B) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
- C) ACCOUNT_USAGE.METERING_HISTORY
- D) ACCOUNT_USAGE.USAGE_IN_CURRENCY_DAILY

---

## Q25 (Scenario)
A Security Engineer is designing a security monitoring system for a Snowflake account. They want to detect when any user in the account is granted an unusually high number of privileges in a 24-hour period (a possible sign of privilege escalation). Which Snowflake approach is MOST suitable?
- A) Create a scheduled task that queries ACCOUNT_USAGE.GRANTS_TO_ROLES and counts new grants per user per day; fire a notification alert if the count exceeds a threshold
- B) Set up a Snowflake stream on ACCOUNT_USAGE.GRANTS_TO_ROLES to detect new rows
- C) Use the Trust Center's privilege escalation scanner to monitor and alert on new grants
- D) Apply a row-access policy to the GRANTS_TO_ROLES view to restrict who can see grant history

---

## Q26 (Single Answer)
What is the purpose of Snowflake's Compliance Center within the Trust Center?
- A) It automatically applies masking policies to columns based on compliance requirements
- B) It provides a centralized view of Snowflake's security certifications (SOC 2, ISO 27001, PCI DSS, HIPAA), compliance status, and downloadable compliance reports
- C) It manages data residency policies for each regulatory jurisdiction
- D) It runs automated compliance scans against customer Snowflake accounts

---

## Q27 (Scenario)
A company's security team uses an external SIEM (Microsoft Sentinel). They want to ingest Snowflake ACCOUNT_USAGE events into Sentinel. The recommended integration approach is to use an Azure Function triggered by a timer, which queries Snowflake ACCOUNT_USAGE views and pushes events to Sentinel via the Log Analytics API. From a Snowflake perspective, which capability enables secure, authenticated connections from the Azure Function to Snowflake?
- A) A Snowflake OAuth integration so the Azure Function authenticates using OAuth client credentials
- B) A Snowflake external network rule blocking all Azure Function IPs except the approved ones
- C) A Snowflake SAML2 integration for Azure Function to use Azure AD SSO
- D) A Snowflake Data Listing shared to the Sentinel workspace

---

## Q28 (Single Answer)
Which Snowflake Trust Center scanner identifies users who have been granted the ACCOUNTADMIN role but do not use it regularly?
- A) Leaked Credentials Scanner
- B) Over-privileged Accounts Scanner (Security Essentials)
- C) Stale Credentials Scanner
- D) Admin Activity Anomaly Scanner

---

## Q29 (Multi Answer - Select 2)
A Security Engineer must satisfy a PCI DSS requirement: all cardholder data environment (CDE) access must be logged and auditable, including failed access attempts. Snowflake is used for storing and processing card data. Which Snowflake capabilities together satisfy this requirement? (Select TWO)
- A) ACCOUNT_USAGE.ACCESS_HISTORY for successful data access at the column level
- B) ACCOUNT_USAGE.LOGIN_HISTORY for recording all login attempts, including failures
- C) ACCOUNT_USAGE.GRANTS_TO_ROLES for recording who has access rights to the CDE tables
- D) ACCOUNT_USAGE.METERING_HISTORY for tracking CDE query costs
- E) INFORMATION_SCHEMA.QUERY_HISTORY for real-time access monitoring

---

## Q30 (Single Answer)
Which Snowflake feature, when enabled on an account, collects detailed execution traces from Snowflake Cortex AI calls, Snowpark code, and other workloads for security observability?
- A) Snowflake Event Table
- B) Snowflake Profiler
- C) Snowflake Trail
- D) Snowflake Audit Log

---

## Q31 (Scenario)
A Security Engineer needs to correlate Snowflake query history with network logs from their firewall to build an incident timeline. The Snowflake data is in ACCOUNT_USAGE.QUERY_HISTORY; the firewall logs are in an external S3 bucket. Which Snowflake feature allows the engineer to query both datasets together without loading the firewall logs into Snowflake?
- A) Snowflake Data Sharing to access S3 logs
- B) Snowflake External Tables referencing the S3 bucket, enabling SQL JOIN between QUERY_HISTORY and external firewall logs
- C) Snowflake PrivateLink to directly query S3 logs from Snowflake
- D) Snowflake Streams to ingest S3 logs in real time

---

## Q32 (Single Answer)
In the context of Snowflake compliance, what does the GDPR "Right to Access" (Data Subject Access Request) require organizations to provide?
- A) A full dump of all data in the Snowflake account related to the data subject
- B) A description of all personal data held, the purposes of processing, recipients, and retention periods — accessible via Snowflake ACCOUNT_USAGE queries filtered by user or customer identifier
- C) An encrypted export of all data files for the data subject, stored in an external stage
- D) Deletion of all data about the data subject within 72 hours of the request

---

## Q33 (Multi Answer - Select 2)
A Security Engineer wants to monitor for anomalous credit consumption as a potential security signal — for example, a compromised account running large data exfiltration queries. Which ACCOUNT_USAGE views should be monitored? (Select TWO)
- A) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY to detect unusual warehouse credit spikes
- B) ACCOUNT_USAGE.QUERY_HISTORY to identify queries with unusually high BYTES_SCANNED or ROWS_PRODUCED
- C) ACCOUNT_USAGE.NETWORK_POLICIES to detect policy bypass events
- D) ACCOUNT_USAGE.SESSIONS to detect session count anomalies
- E) ACCOUNT_USAGE.STORAGE_USAGE to detect unusual storage growth from data duplication attacks

---

## Q34 (Single Answer)
Which Snowflake ACCOUNT_USAGE view provides information about Snowflake tasks that have run, including their status (succeeded/failed), execution time, and the session that executed them?
- A) ACCOUNT_USAGE.TASK_HISTORY
- B) ACCOUNT_USAGE.SERVERLESS_TASK_HISTORY
- C) ACCOUNT_USAGE.QUERY_HISTORY (filtered by QUERY_TYPE = 'CALL')
- D) ACCOUNT_USAGE.SCHEDULED_TASK_LOG

---

## Q35 (Scenario)
A Security Engineer is designing a monitoring solution for Snowpark Container Services workloads. They need to detect when a containerized service is accessing data outside its authorized scope. Which Snowflake monitoring capability provides visibility into SPCS data access?
- A) Monitor ACCOUNT_USAGE.ACCESS_HISTORY filtering for queries run in SNOWPARK_CONTAINER_SERVICES context
- B) Query ACCOUNT_USAGE.SERVICE_USAGE_HISTORY for service-level data access logs
- C) Use the compute pool monitoring views (SNOWFLAKE.ACCOUNT_USAGE.COMPUTE_POOL_EVENTS) to detect anomalous container behavior
- D) Apply a network rule to the SPCS compute pool blocking non-authorized data access

---

## Q36 (Single Answer)
What does the BYTES_SCANNED column in ACCOUNT_USAGE.QUERY_HISTORY represent from a security perspective?
- A) The number of bytes encrypted by Snowflake for the query
- B) The amount of data scanned by the query; very high values for simple queries may indicate data exfiltration attempts
- C) The amount of data written to external stages by the query
- D) The size of the query result set downloaded by the client

---

## Q37 (Scenario)
A Security Engineer is preparing for an ISO 27001 audit. The auditor requires evidence of access control reviews — specifically, a report showing which users can access which tables in Snowflake. Which Snowflake approach provides this evidence?
- A) Export ACCOUNT_USAGE.GRANTS_TO_ROLES and ACCOUNT_USAGE.GRANTS_TO_USERS to map role-table access for each user
- B) Use SHOW TABLES and manually document access for each table
- C) Query INFORMATION_SCHEMA.TABLE_PRIVILEGES for each database
- D) Run SHOW GRANTS TO USER for each user and compile the results manually

---

## Q38 (Single Answer)
Which Snowflake feature detects Snowflake users whose passwords have been found in external breach databases and alerts administrators?
- A) Snowflake Horizon automatic credential scanning
- B) Trust Center's Leaked Credentials scanner
- C) Network policy anomaly detection
- D) Snowflake Trail credential monitoring

---

## Q39 (Multi Answer - Select 2)
A Security Engineer needs to implement CCPA compliance controls in Snowflake. CCPA requires that California consumers can opt out of data sale and that their personal data is identifiable and deletable on request. Which Snowflake data governance features support these requirements? (Select TWO)
- A) Snowflake automatic data classification (SYSTEM$CLASSIFY) to identify and tag California consumer PII columns
- B) Snowflake Time Travel to prove data was not altered
- C) Masking policies to anonymize California consumer data for opt-out users
- D) Snowflake Data Sharing to share opt-out lists with third-party data buyers
- E) Snowflake Fail-safe to recover accidentally deleted consumer records

---

## Q40 (Single Answer)
What is the maximum latency for events appearing in the Snowflake ACCOUNT_USAGE.ACCESS_HISTORY view?
- A) Real-time (0 latency)
- B) Up to 3 hours
- C) Up to 24 hours
- D) Up to 72 hours

---

## Q41 (Scenario)
A Security Engineer wants to audit all GRANT and REVOKE statements executed in the Snowflake account over the past 30 days. Which ACCOUNT_USAGE view and filter BEST supports this requirement?
- A) SELECT * FROM ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE GRANTED_ON IS NOT NULL (shows current state, not history)
- B) SELECT * FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE IN ('GRANT', 'REVOKE') AND START_TIME > DATEADD(day, -30, CURRENT_TIMESTAMP())
- C) SELECT * FROM ACCOUNT_USAGE.ACCESS_HISTORY WHERE QUERY_TYPE = 'GRANT'
- D) SELECT * FROM ACCOUNT_USAGE.PRIVILEGE_HISTORY WHERE MODIFIED_ON > DATEADD(day, -30, CURRENT_TIMESTAMP())

---

## Q42 (Single Answer)
Which Snowflake built-in feature can automatically identify and alert administrators to a list of high-risk security findings — such as accounts with no MFA, publicly accessible stages, or overly permissive network policies — without requiring custom queries?
- A) Snowflake Alert on ACCOUNT_USAGE
- B) Trust Center with Security Essentials and Threat Intelligence scanners
- C) Snowflake Horizon Catalog finding reports
- D) ACCOUNT_USAGE.SECURITY_FINDINGS view

---

## Q43 (Multi Answer - Select 2)
A Security Engineer is asked to determine how much Snowflake credit was consumed by Snowpark Python UDF calls versus traditional SQL queries over the past week, to assess whether a potential crypto-mining attack is occurring via Snowflake compute. Which ACCOUNT_USAGE views are MOST useful? (Select TWO)
- A) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY to see total warehouse credits per warehouse
- B) ACCOUNT_USAGE.QUERY_HISTORY filtered by QUERY_TYPE = 'CALL' or query text containing SNOWFLAKE.CORTEX to identify AI/Snowpark usage patterns
- C) ACCOUNT_USAGE.METERING_HISTORY for account-level serverless feature credit breakdown
- D) ACCOUNT_USAGE.NETWORK_POLICIES to see if any policies were modified to allow crypto-mining IPs
- E) ACCOUNT_USAGE.SESSIONS to count the number of active sessions per user

---

## Q44 (Single Answer)
Which Snowflake ACCOUNT_USAGE view is specifically used to audit policy references — showing which policies (masking, row-access, projection) are attached to which objects?
- A) ACCOUNT_USAGE.POLICY_REFERENCES
- B) ACCOUNT_USAGE.MASKING_POLICY_REFERENCES
- C) ACCOUNT_USAGE.SECURITY_POLICY_ASSIGNMENTS
- D) ACCOUNT_USAGE.GOVERNANCE_POLICY_LOG

---

## Q45 (Scenario)
A company must comply with PCI DSS requirement 10.3.2: audit log files must be protected from destruction and unauthorized modifications. Snowflake ACCOUNT_USAGE views cannot be modified by customers. How should the Security Engineer document this for the PCI DSS assessor?
- A) The assessor requires that Snowflake provides a signed attestation that ACCOUNT_USAGE data cannot be modified
- B) Document that ACCOUNT_USAGE views are read-only for customers and that Snowflake's SOC 2 and PCI DSS compliance reports attest to the integrity of audit logs; additionally, export logs to an immutable external store as a belt-and-suspenders control
- C) Apply a row-access policy to ACCOUNT_USAGE views to prevent modification
- D) Create a Snowflake Alert that fires whenever any ACCOUNT_USAGE view is altered

---

## Q46 (Single Answer)
What is the Snowflake ACCOUNT_USAGE.ACCESS_HISTORY BASE_OBJECTS_ACCESSED column used for?
- A) It lists the top-level objects (tables, views) directly referenced in the SQL query
- B) It lists the base (leaf) tables and columns that were ultimately read, even when accessed through views, joins, or secure objects — enabling column-level lineage
- C) It tracks the access control base object (the role that authorized the access)
- D) It records the base (root) IP address of the client connection

---

## Q47 (Multi Answer - Select 2)
A Security Engineer is monitoring Snowflake for brute-force attack patterns. They want to automatically alert when more than 10 failed login attempts occur for any single user within a 5-minute window. Which Snowflake components enable this? (Select TWO)
- A) A Snowflake Alert that queries ACCOUNT_USAGE.LOGIN_HISTORY for failed logins grouped by USER_NAME and 5-minute time buckets; fires when count > 10
- B) A Snowflake Stream on ACCOUNT_USAGE.LOGIN_HISTORY detecting new failed login rows
- C) A notification integration to send the alert to a security team email or webhook
- D) A network policy that automatically blocks users with >10 failed logins
- E) A Snowflake task that runs REVOKE ALL FROM USER for users with >10 failed logins

---

## Q48 (Single Answer)
Which column in ACCOUNT_USAGE.LOGIN_HISTORY indicates whether an MFA (second authentication factor) was used during a login attempt?
- A) AUTHENTICATION_METHOD
- B) SECOND_AUTHENTICATION_FACTOR
- C) MFA_USED
- D) AUTHENTICATION_LEVEL

---

## Q49 (Scenario)
A Security Engineer is analyzing the Snowflake account to identify potential data exfiltration. They run a query against ACCOUNT_USAGE.ACCESS_HISTORY and see a user has accessed 15 different sensitive tables in one session. What additional information from ACCESS_HISTORY helps confirm if this is exfiltration versus normal multi-table join analysis?
- A) QUERY_START_TIME — if the accesses happened at 3 AM, it is more suspicious
- B) ROWS_PRODUCED — large row counts across all 15 tables may indicate mass data export vs. join analysis producing a smaller result
- C) DIRECT_OBJECTS_ACCESSED — if all 15 tables are in DIRECT_OBJECTS (not BASE_OBJECTS), the user is accessing raw tables, not views
- D) BYTES_SCANNED — if bytes scanned equals bytes produced, it indicates all data was copied

---

## Q50 (Single Answer)
What is the maximum retention period of the Snowflake ACCOUNT_USAGE schema views?
- A) 30 days
- B) 90 days
- C) 180 days
- D) 365 days

---

## Q51 (Scenario)
A Security Engineer needs to generate a monthly compliance report showing all changes to data governance policies (masking policies, row-access policies) in the Snowflake account. Which combination of ACCOUNT_USAGE queries provides this?
- A) Query ACCOUNT_USAGE.QUERY_HISTORY filtered by QUERY_TYPE IN ('CREATE_MASKING_POLICY', 'ALTER_MASKING_POLICY', 'DROP_MASKING_POLICY', 'CREATE_ROW_ACCESS_POLICY', 'ALTER_ROW_ACCESS_POLICY', 'DROP_ROW_ACCESS_POLICY') for the past 30 days
- B) Query ACCOUNT_USAGE.POLICY_REFERENCES for all active policies; compare with last month's snapshot
- C) Query ACCOUNT_USAGE.GOVERNANCE_CHANGE_LOG for all policy modifications
- D) Query ACCOUNT_USAGE.MASKING_POLICY_HISTORY and ACCOUNT_USAGE.ROW_ACCESS_POLICY_HISTORY

---

## Q52 (Single Answer)
Which Snowflake Trust Center scanner checks for users who have access to ACCOUNTADMIN but have not used it in the past 90 days, reducing the risk of stale privileged accounts?
- A) Security Essentials: Stale Privileged Accounts scanner
- B) Threat Intelligence: Inactive Admin scanner
- C) CIS Benchmark: Admin Usage Compliance scanner
- D) Access Control Health Check

---

## Q53 (Scenario)
A Security Engineer is building an automated compliance workflow. Every night, they need to extract all events from ACCOUNT_USAGE.QUERY_HISTORY and ACCESS_HISTORY where EXECUTION_STATUS = 'FAIL' and send a summary report to the security team. Which Snowflake architecture should be used?
- A) Create a Snowflake task that runs at midnight, selects failed events from ACCOUNT_USAGE, INSERTs them into a reporting table, and then calls a notification integration to send an email summary
- B) Create a Snowflake stream on ACCOUNT_USAGE.QUERY_HISTORY to capture failed events in real time and trigger an alert immediately
- C) Use a Snowflake external function to query ACCOUNT_USAGE and send the report to an external API
- D) Configure a Snowflake data pipeline that exports ACCOUNT_USAGE to an external data lake daily

---

## Q54 (Single Answer)
Which ACCOUNT_USAGE view provides information about which Snowflake stages were accessed, which includes external stages, for each query — helping detect unauthorized data exfiltration to external storage?
- A) ACCOUNT_USAGE.STAGE_STORAGE_USAGE
- B) ACCOUNT_USAGE.ACCESS_HISTORY (OBJECTS_MODIFIED includes external stage write operations)
- C) ACCOUNT_USAGE.COPY_HISTORY
- D) ACCOUNT_USAGE.EXTERNAL_STAGE_ACCESS

---

## Q55 (Multi Answer - Select 2)
A Security Engineer is monitoring Snowflake for signs of a compromised service account. The account BATCH_PROCESS_USER normally runs 50–100 queries per day. Today it has run 5,000 queries in 2 hours, all scanning the CUSTOMERS table. The engineer needs to immediately halt the service account's activity. Which actions should be taken? (Select TWO)
- A) ALTER USER BATCH_PROCESS_USER SET DISABLED = TRUE to immediately prevent new connections
- B) Terminate all existing sessions for BATCH_PROCESS_USER using SELECT SYSTEM$ABORT_SESSION(session_id) for each active session
- C) Drop the BATCH_PROCESS_USER account to stop activity immediately
- D) Apply a network policy to BATCH_PROCESS_USER blocking all IP connections temporarily
- E) Suspend the warehouse used by BATCH_PROCESS_USER to stop query execution

---

## Q56 (Single Answer)
Which Snowflake ACCOUNT_USAGE view would be queried to detect a user who has been creating large numbers of new roles over a short period (a sign of privilege escalation or persistence mechanisms)?
- A) ACCOUNT_USAGE.ROLES (shows current state, not history)
- B) ACCOUNT_USAGE.QUERY_HISTORY filtered by QUERY_TYPE = 'CREATE_ROLE'
- C) ACCOUNT_USAGE.ACCESS_HISTORY filtered by CREATE ROLE operations
- D) ACCOUNT_USAGE.GRANTS_TO_ROLES

---

## Q57 (Scenario)
A company is preparing for a SOC 2 Type II audit. The auditor requests evidence that Snowflake access to production data is reviewed quarterly. The Security Engineer needs to produce a quarterly access review report showing all roles with SELECT on production tables and which users have those roles. Which ACCOUNT_USAGE views provide this data?
- A) JOIN ACCOUNT_USAGE.GRANTS_TO_ROLES (for SELECT on production tables) with ACCOUNT_USAGE.GRANTS_TO_USERS (for role-to-user assignments)
- B) ACCOUNT_USAGE.ACCESS_HISTORY for a list of users who accessed production tables
- C) ACCOUNT_USAGE.USERS and ACCOUNT_USAGE.ROLES joined by user ID
- D) INFORMATION_SCHEMA.APPLICABLE_ROLES for each user

---

## Q58 (Single Answer)
In Snowflake, what does the ROWS_PRODUCED column in QUERY_HISTORY represent, and why is it relevant to security monitoring?
- A) The number of rows inserted into tables by the query; relevant for detecting unauthorized data loading
- B) The number of rows in the query result set; large values for simple queries may indicate bulk data access or potential exfiltration
- C) The number of rows that passed masking policy evaluation
- D) The number of rows scanned before filtering; relevant for performance tuning

---

## Q59 (Scenario)
A Security Engineer needs to verify Snowflake compliance with HIPAA Technical Safeguard: "Audit Controls — Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems containing or using ePHI." Which Snowflake documentation should be presented to the HIPAA auditor as evidence?
- A) Snowflake Trust Center compliance reports (including the HIPAA Business Associate Agreement and SOC 2 Type II report) plus evidence of ACCOUNT_USAGE.ACCESS_HISTORY and LOGIN_HISTORY retention and monitoring
- B) A custom Snowflake audit policy configuration report exported as PDF
- C) The Snowflake master terms of service, which includes all compliance certifications
- D) A static export of the ACCOUNT_USAGE.QUERY_HISTORY for the past year

---

## Q60 (Single Answer)
What is the Snowflake Trust Center's Threat Intelligence scanner primarily designed to detect?
- A) Misconfigurations in network policies and authentication settings
- B) Active security threats such as logins from known malicious IP addresses, credential stuffing, and anomalous data access patterns
- C) Data quality issues in security-related tables
- D) Compliance gaps against CIS Benchmarks for Snowflake

---

## Q61 (Scenario)
A Security Engineer discovers that a query run by a user accessed a VIEW, but the BASE_OBJECTS_ACCESSED in ACCESS_HISTORY shows three underlying tables. The user's role has SELECT on the VIEW but not directly on the underlying tables. Is this expected, and what are the implications?
- A) This is unexpected; Snowflake should deny access because the user lacks SELECT on the base tables
- B) This is expected; Snowflake uses definer's security for views — the view owner's privileges allow access to base tables; the user's role only needs SELECT on the VIEW; ACCESS_HISTORY correctly records the base tables accessed for audit purposes
- C) This is a security bug; the user has bypassed table-level security via the view
- D) This behavior only occurs with secure views; regular views always require base table privileges

---

## Q62 (Single Answer)
Which Snowflake view in ACCOUNT_USAGE records changes to account parameters (such as NETWORK_POLICY changes, SESSION_POLICY assignments, or AUTH_POLICY changes)?
- A) ACCOUNT_USAGE.PARAMETER_HISTORY
- B) ACCOUNT_USAGE.QUERY_HISTORY (via ALTER ACCOUNT SET ... queries)
- C) ACCOUNT_USAGE.ACCOUNT_CHANGES
- D) ACCOUNT_USAGE.CONFIGURATION_HISTORY

---

## Q63 (Multi Answer - Select 2)
A company uses Snowflake for EU customer data. GDPR Article 30 requires maintaining a Record of Processing Activities (RoPA). A Data Protection Officer (DPO) asks the Security Engineer to document what data is processed, by whom, for what purpose. Which Snowflake capabilities help build a technical RoPA? (Select TWO)
- A) ACCOUNT_USAGE.ACCESS_HISTORY to document which users access which data tables (columns, purposes inferred from context)
- B) TAG_REFERENCES to show which tables and columns are tagged as PII/GDPR-relevant
- C) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY for processing volume evidence
- D) ACCOUNT_USAGE.LOGIN_HISTORY for user authentication events
- E) Snowflake's automatic data classification results to identify PII scope

---

## Q64 (Single Answer)
What is the default retention period for the Snowflake ACCOUNT_USAGE.LOGIN_HISTORY view?
- A) 7 days
- B) 90 days
- C) 365 days
- D) Indefinite (no purge)

---

## Q65 (Scenario)
A Security Engineer needs to map a security incident to Snowflake's audit trail. The incident occurred on 2026-03-15 at 14:32 UTC. The engineer needs to find all queries run in the 30 minutes before and after this time by user SUSPECT_USER, along with the objects accessed. Which query achieves this efficiently?
- A) SELECT q.*, a.BASE_OBJECTS_ACCESSED FROM ACCOUNT_USAGE.QUERY_HISTORY q LEFT JOIN ACCOUNT_USAGE.ACCESS_HISTORY a ON q.QUERY_ID = a.QUERY_ID WHERE q.USER_NAME = 'SUSPECT_USER' AND q.START_TIME BETWEEN '2026-03-15 14:02:00' AND '2026-03-15 15:02:00'
- B) SELECT * FROM ACCOUNT_USAGE.LOGIN_HISTORY WHERE USER_NAME = 'SUSPECT_USER' AND EVENT_TIMESTAMP BETWEEN '2026-03-15 14:02:00' AND '2026-03-15 15:02:00'
- C) SELECT * FROM ACCOUNT_USAGE.SESSIONS WHERE USER_NAME = 'SUSPECT_USER' AND CREATED_ON BETWEEN '2026-03-15 14:02:00' AND '2026-03-15 15:02:00'
- D) SELECT * FROM INFORMATION_SCHEMA.QUERY_HISTORY WHERE USER_NAME = 'SUSPECT_USER' AND START_TIME BETWEEN '2026-03-15 14:02:00' AND '2026-03-15 15:02:00'

---

## Q66 (Single Answer)
Which Snowflake ACCOUNT_USAGE view records the history of all shares created, modified, and dropped in the account?
- A) ACCOUNT_USAGE.DATA_SHARING_USAGE
- B) ACCOUNT_USAGE.SHARE_HISTORY
- C) ACCOUNT_USAGE.SHARING_EVENTS
- D) ACCOUNT_USAGE.SHARES

---

## Q67 (Multi Answer - Select 2)
A Security Engineer is preparing a response to a regulatory inquiry about Snowflake's encryption capabilities under GDPR's pseudonymization and data minimization requirements. Which statements about Snowflake encryption should be included in the response? (Select TWO)
- A) Snowflake encrypts all data at rest (AES-256) by default; this meets pseudonymization requirements when combined with masking policies
- B) Snowflake encrypts data in transit using TLS 1.2 or higher for all connections
- C) Snowflake encrypts only columns tagged as personal data; untagged data is stored in plaintext
- D) Snowflake's encryption keys rotate automatically on a regular schedule (per Snowflake's key management lifecycle)
- E) GDPR requires client-side encryption; Snowflake's server-side encryption does not satisfy GDPR

---

## Q68 (Single Answer)
Which Snowflake feature logs events from Snowflake Cortex AI LLM function calls (such as COMPLETE, CLASSIFY_TEXT) and Snowpark code for observability and security auditing?
- A) Snowflake Trail with event table logging
- B) ACCOUNT_USAGE.CORTEX_AI_AUDIT_LOG
- C) Snowflake Trust Center AI Scanner
- D) ACCOUNT_USAGE.SERVERLESS_TASK_HISTORY

---

## Q69 (Scenario)
A Security Engineer wants to ensure that a compliance officer can audit all Snowflake data access for the past year without being able to modify any Snowflake objects or run queries against business data. Which RBAC configuration achieves this?
- A) Grant ACCOUNTADMIN to the compliance officer temporarily for the audit period
- B) Grant the SNOWFLAKE.GOVERNANCE_VIEWER database role (which provides read access to ACCOUNT_USAGE governance views) to a custom compliance role, and assign only that role to the compliance officer
- C) Grant SELECT on all ACCOUNT_USAGE views to the compliance officer's personal role
- D) Create a secure view merging all relevant ACCOUNT_USAGE views and grant SELECT on only that view

---

## Q70 (Single Answer)
What is the primary security use of the ACCOUNT_USAGE.OBJECT_DEPENDENCIES view?
- A) To track which users have SELECT on which objects
- B) To understand the structural relationships between objects (e.g., views that reference tables), enabling impact analysis when security changes are made
- C) To detect circular dependencies that may indicate privilege escalation
- D) To identify orphaned objects with no owner for cleanup

---

## Q71 (Scenario)
A Security Engineer is implementing a monitoring dashboard for a Snowflake account. They want to show a weekly trend of failed login attempts by source IP. Which query approach uses ACCOUNT_USAGE correctly?
- A) SELECT DATE_TRUNC('week', EVENT_TIMESTAMP), CLIENT_IP, COUNT(*) FROM ACCOUNT_USAGE.LOGIN_HISTORY WHERE IS_SUCCESS = 'NO' GROUP BY 1, 2 ORDER BY 1
- B) SELECT WEEK(LOGIN_TIME), SOURCE_IP, COUNT(*) FROM ACCOUNT_USAGE.SESSIONS WHERE LOGIN_SUCCESS = FALSE GROUP BY 1, 2
- C) SELECT DATEADD('week', 0, QUERY_START_TIME), CLIENT_IP, COUNT(*) FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE EXECUTION_STATUS = 'FAIL' GROUP BY 1, 2
- D) SELECT TRUNC(CREATED_ON, 'WEEK'), IP_ADDRESS, COUNT(*) FROM ACCOUNT_USAGE.USERS WHERE LOGIN_ATTEMPTS > 0 GROUP BY 1, 2

---

## Q72 (Single Answer)
Which Snowflake ACCOUNT_USAGE view shows all currently active and historical security integrations (OAuth, SAML2, SCIM) and their configuration status?
- A) ACCOUNT_USAGE.SECURITY_INTEGRATIONS
- B) ACCOUNT_USAGE.INTEGRATIONS
- C) INFORMATION_SCHEMA.SECURITY_INTEGRATIONS
- D) ACCOUNT_USAGE.OAUTH_INTEGRATIONS

---

## Q73 (Scenario)
A Security Engineer uses Snowflake Trust Center and sees a finding: "10 users have no MFA enabled." The engineer needs to remediate this finding. Which Snowflake command enforces MFA for specific users?
- A) CREATE AUTHENTICATION POLICY mfa_required AUTHENTICATION_METHODS = ('PASSWORD', 'SAML2') MFA_AUTHENTICATION_METHODS = ('TOTP'); ALTER USER <username> SET AUTHENTICATION POLICY mfa_required
- B) ALTER USER <username> SET MFA_ENABLED = TRUE
- C) GRANT MFA_REQUIRED TO USER <username>
- D) CREATE AUTHENTICATION POLICY mfa_policy MULTI_FACTOR_AUTHENTICATION_ENFORCE = TRUE; ALTER USER <username> SET AUTHENTICATION POLICY mfa_policy

---

## Q74 (Single Answer)
In the Snowflake Trust Center, what is the "Security Essentials" scanner package designed to check?
- A) External threat intelligence feeds for known malicious IPs connecting to Snowflake
- B) Core security hygiene settings: MFA adoption, network policy coverage, admin account usage, and credential security for the account
- C) Snowflake Cortex AI workload security configurations
- D) Data governance coverage (masking policies, classification, and tagging completeness)

---

## Q75 (Scenario)
A company must demonstrate to auditors that access to their Snowflake data warehouse is reviewed and recertified quarterly. Currently, there is no formal process. The Security Engineer must implement an automated quarterly access review. Which Snowflake-based approach is MOST practical?
- A) Each quarter, run a task that exports ACCOUNT_USAGE.GRANTS_TO_ROLES and GRANTS_TO_USERS to a reporting table; generate a report for managers to review and certify; remove uncertified access
- B) Use Snowflake Trust Center to automate quarterly access reviews
- C) Create a Snowflake Data Listing that publishes access review reports for managers
- D) Require each user to log in quarterly; auto-disable users who don't log in

---

## Q76 (Single Answer)
Which Snowflake feature enables administrators to receive proactive email notifications when a scheduled Snowflake Alert detects a security condition?
- A) A notification integration with type = EMAIL set as the alert's action
- B) A Snowflake trigger on the alert condition
- C) The Snowflake SENDMAIL function called from within the alert
- D) A Snowflake task scheduled to email daily digest reports

---

## Q77 (Scenario)
A Security Engineer is building a security posture dashboard. They want a single view showing: (1) the number of users without MFA; (2) the number of accounts with no network policy; (3) the number of users with ACCOUNTADMIN; (4) the number of failed logins in the past 24 hours. Which Snowflake data sources are combined for this dashboard?
- A) Only ACCOUNT_USAGE.USERS and ACCOUNT_USAGE.LOGIN_HISTORY
- B) ACCOUNT_USAGE.USERS, ACCOUNT_USAGE.GRANTS_TO_USERS, ACCOUNT_USAGE.LOGIN_HISTORY, ACCOUNT_USAGE.POLICY_REFERENCES — queried individually and combined in a Snowsight dashboard
- C) Trust Center API, ACCOUNT_USAGE.USERS, ACCOUNT_USAGE.NETWORK_POLICIES
- D) INFORMATION_SCHEMA views (real-time) rather than ACCOUNT_USAGE (latency)

---

## Q78 (Single Answer)
What Snowflake ACCOUNT_USAGE view provides visibility into changes to user properties — such as when a user's password was changed, MFA was enabled, or the user was disabled?
- A) ACCOUNT_USAGE.USER_CHANGES
- B) ACCOUNT_USAGE.QUERY_HISTORY (filter by QUERY_TYPE = 'ALTER_USER')
- C) ACCOUNT_USAGE.USER_HISTORY (or ACCOUNT_USAGE.USERS with DELETED_ON)
- D) ACCOUNT_USAGE.AUTHENTICATION_POLICY_HISTORY

---

## Q79 (Scenario)
A Security Engineer is reviewing Snowflake account activity for a suspicious pattern: a single IP address has authenticated successfully as 15 different users over 2 hours. This may indicate credential compromise or a shared IP (NAT gateway). Which Snowflake query approach identifies this pattern?
- A) SELECT CLIENT_IP, COUNT(DISTINCT USER_NAME) FROM ACCOUNT_USAGE.LOGIN_HISTORY WHERE IS_SUCCESS = 'YES' AND EVENT_TIMESTAMP > DATEADD(hour, -2, CURRENT_TIMESTAMP()) GROUP BY 1 HAVING COUNT(DISTINCT USER_NAME) > 5
- B) SELECT USER_NAME, COUNT(*) FROM ACCOUNT_USAGE.SESSIONS WHERE CREATED_ON > DATEADD(hour, -2, CURRENT_TIMESTAMP()) GROUP BY 1 ORDER BY 2 DESC
- C) SELECT CLIENT_IP, USER_NAME FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE START_TIME > DATEADD(hour, -2, CURRENT_TIMESTAMP()) GROUP BY 1, 2 HAVING COUNT(*) > 15
- D) SELECT * FROM ACCOUNT_USAGE.AUTHENTICATION_ANOMALIES WHERE PATTERN = 'MULTI_USER_SINGLE_IP'

---

## Q80 (Single Answer)
Which Snowflake feature, when enabled on a Snowflake Event Table, captures log messages, traces, and metrics from Snowpark Python and Cortex AI functions for security and observability analysis?
- A) Snowflake Profiler
- B) Snowflake Trail
- C) Event Table with telemetry enabled via SNOWFLAKE.TELEMETRY schema
- D) Snowflake Audit Interceptor

---

## Q81 (Scenario)
A Security Engineer is investigating a potential data exfiltration incident. They need to determine what data was copied from Snowflake to an external AWS S3 bucket via COPY INTO between 2026-03-01 and 2026-03-10. Which Snowflake view provides this information?
- A) ACCOUNT_USAGE.COPY_HISTORY — filter by DATE_RANGE and STATUS = 'Loaded'
- B) ACCOUNT_USAGE.ACCESS_HISTORY — filter by OBJECTS_MODIFIED containing the S3 stage
- C) ACCOUNT_USAGE.STAGE_STORAGE_USAGE — filter by S3 bucket ARN
- D) ACCOUNT_USAGE.QUERY_HISTORY — filter by QUERY_TEXT LIKE '%COPY INTO%@%'

---

## Q82 (Single Answer)
Which Snowflake ACCOUNT_USAGE view shows all the privileges that have been granted on account-level objects — such as databases, warehouses, and integrations — to specific roles?
- A) ACCOUNT_USAGE.GRANTS_TO_ROLES
- B) ACCOUNT_USAGE.OBJECT_PRIVILEGES
- C) ACCOUNT_USAGE.ROLE_PRIVILEGES
- D) ACCOUNT_USAGE.PRIVILEGE_GRANTS

---

## Q83 (Scenario)
A Security Engineer at a company running Snowflake on AWS receives a request from the legal team: they need to preserve all Snowflake query and access history for a litigation hold for the next 3 years. The ACCOUNT_USAGE views retain data for only 1 year. How should the engineer implement a 3-year retention?
- A) Contact Snowflake to extend the ACCOUNT_USAGE retention period to 3 years (requires Business Critical)
- B) Set up a daily Snowflake task to copy new records from ACCOUNT_USAGE.QUERY_HISTORY and ACCESS_HISTORY to a dedicated Snowflake table (which has no retention limit) or to S3 with object lock enabled; retain for 3 years
- C) Use Snowflake Fail-safe to preserve audit history for 3 years
- D) Configure the Snowflake account's TIME_TRAVEL_RETAIN_PERIOD to 3 years to extend audit log retention

---

## Q84 (Single Answer)
In Snowflake, what is the difference between the ACCOUNT_USAGE schema and the INFORMATION_SCHEMA for querying metadata?
- A) ACCOUNT_USAGE is read-only; INFORMATION_SCHEMA allows modifications
- B) ACCOUNT_USAGE has up to 3-hour latency but retains data for 1 year and includes deleted objects; INFORMATION_SCHEMA is near-real-time but retains data for only 7 days and excludes deleted objects
- C) INFORMATION_SCHEMA is account-wide; ACCOUNT_USAGE is database-scoped
- D) ACCOUNT_USAGE requires ACCOUNTADMIN; INFORMATION_SCHEMA is accessible to all roles

---

## Q85 (Scenario)
A Security Engineer is building a Snowflake monitoring solution that must detect when any user runs a query that accesses more than 10 different tables in a single query — a potential sign of cross-table data harvesting. Which ACCOUNT_USAGE feature can be used to implement this detection?
- A) Monitor ACCOUNT_USAGE.ACCESS_HISTORY using ARRAY_SIZE(PARSE_JSON(BASE_OBJECTS_ACCESSED)) > 10 to count unique base tables per query; create an alert that fires daily when such queries are found
- B) Monitor ACCOUNT_USAGE.QUERY_HISTORY for queries with large BYTES_SCANNED
- C) Use a Snowflake row-access policy on all tables that limits the number of tables accessible per session
- D) Configure the MAX_TABLE_SCAN_RANGE account parameter to 10 to block queries accessing more than 10 tables

---

## Q86 (Single Answer)
What is the purpose of the Snowflake ALERT object's SCHEDULE parameter?
- A) It defines the time zone for alert notifications
- B) It specifies how frequently the alert condition query is evaluated
- C) It sets the maximum time an alert can run before being cancelled
- D) It defines when alert notifications are suppressed (maintenance windows)

---

## Q87 (Scenario)
A company wants to implement a Snowflake-native SIEM-lite solution using only Snowflake features. They want to: (1) collect all login events; (2) detect brute-force patterns; (3) send email alerts for detected patterns. Which Snowflake architecture achieves this purely within Snowflake?
- A) Snowflake Event Table for login events + Snowflake Alert for brute-force detection + Notification Integration (EMAIL) for alerts
- B) Snowflake Stream on LOGIN_HISTORY + Snowflake Task for detection + Snowflake Alert for notifications
- C) Snowflake Alert querying ACCOUNT_USAGE.LOGIN_HISTORY for brute-force patterns + Notification Integration (EMAIL) for alerts
- D) Snowflake Scheduled Task exporting to external SIEM + Notification Integration to Snowflake

---

## Q88 (Single Answer)
Which Snowflake feature, accessible from the Trust Center, provides a mapped assessment of the Snowflake account's security posture against the CIS (Center for Internet Security) Benchmarks for Snowflake?
- A) Snowflake Compliance Center
- B) Snowflake Security Essentials scanner with CIS benchmark checks
- C) Snowflake Horizon Catalog security score
- D) Snowflake GDPR posture report

---

## Q89 (Multi Answer - Select 2)
A Security Engineer receives a GDPR Data Breach notification requirement: they have 72 hours to notify the supervisory authority of a personal data breach. They need to quickly determine: (1) what personal data was accessed; (2) which users accessed it; (3) the time window of the breach. Which Snowflake views should be queried immediately? (Select TWO)
- A) ACCOUNT_USAGE.ACCESS_HISTORY — to identify PII tables and columns accessed, time, and user
- B) ACCOUNT_USAGE.LOGIN_HISTORY — to confirm which accounts were active during the breach window
- C) ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY — to estimate the scope of processing
- D) ACCOUNT_USAGE.SHARES — to check if any data was shared externally
- E) ACCOUNT_USAGE.COPY_HISTORY — to detect data exports during the breach window

---

## Q90 (Single Answer)
Which Snowflake ACCOUNT_USAGE view is used specifically to track the history of Snowflake Pipes (Snowpipe), including which files were loaded, the load time, and load status?
- A) ACCOUNT_USAGE.PIPE_USAGE_HISTORY
- B) ACCOUNT_USAGE.COPY_HISTORY
- C) ACCOUNT_USAGE.PIPE_HISTORY
- D) ACCOUNT_USAGE.LOAD_HISTORY
