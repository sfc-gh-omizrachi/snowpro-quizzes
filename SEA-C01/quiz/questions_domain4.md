# Domain 4: Threats, Risk Assessment, Incident Response, and Forensics

---

## Q1 (Scenario)
A Security Engineer receives an alert that a Snowflake service account user has executed over 10,000 SELECT queries on sensitive PII tables within a 30-minute window—far exceeding its normal baseline of 20 queries per hour. What should be the FIRST containment action?

- A) Revoke the SYSADMIN role from the service account
- B) Drop the service account user immediately
- C) Disable the service account user with ALTER USER … SET DISABLED = TRUE
- D) Delete all active sessions via a stored procedure

---

## Q2 (Scenario)
During a forensic investigation, a Security Engineer needs to identify all SQL statements executed by a specific user over the past 14 days, including the source IP address and execution time. Which view provides this information?

- A) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
- B) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
- C) SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY
- D) SNOWFLAKE.ACCOUNT_USAGE.SESSIONS

---

## Q3 (Multi Answer - Select 2)
A Security Engineer is performing a post-incident review after a data exfiltration event. Which two ACCOUNT_USAGE views should be queried FIRST to reconstruct the timeline of data accessed and copied to external stages?

- A) QUERY_HISTORY
- B) ACCESS_HISTORY
- C) COPY_HISTORY
- D) TAG_REFERENCES

---

## Q4 (Scenario)
A threat actor gained access to a Snowflake account using a compromised user credential and created a new SYSADMIN-level role before being discovered. As part of eradication, which action is MOST critical to prevent privilege persistence?

- A) Rotate the master encryption key via Tri-Secret Secure
- B) Drop or revoke all roles created or granted during the compromised session
- C) Disable Time Travel for affected tables
- D) Regenerate the Snowflake account URL

---

## Q5 (Scenario)
A Security Engineer suspects an insider threat: a database administrator may have been exfiltrating data by creating external stages and running COPY INTO commands. Which query target is BEST for identifying these activities?

- A) SNOWFLAKE.ACCOUNT_USAGE.STAGES
- B) SNOWFLAKE.ACCOUNT_USAGE.COPY_HISTORY
- C) SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY
- D) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY filtered on query_type = 'COPY'

---

## Q6 (Scenario)
During incident response, a Security Engineer needs to immediately terminate all active sessions for a compromised user without disabling the user account permanently. Which command achieves this?

- A) ALTER USER compromised_user SET DISABLED = TRUE
- B) SELECT SYSTEM$ABORT_SESSION(session_id) for all sessions belonging to the user
- C) REVOKE ALL PRIVILEGES FROM USER compromised_user
- D) DROP SESSION WHERE user_name = 'compromised_user'

---

## Q7 (Multi Answer - Select 2)
A Security Engineer wants to detect anomalous login behavior, specifically logins from new geographic regions and logins outside business hours. Which two views provide the data needed for this analysis?

- A) SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY
- B) SNOWFLAKE.ACCOUNT_USAGE.SESSIONS
- C) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
- D) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY

---

## Q8 (Scenario)
A Snowflake account's Trust Center dashboard shows a "Critical" finding under the Leaked Credentials scanner. What is the CORRECT immediate response sequence?

- A) Review the flagged users, disable affected accounts, force credential rotation, investigate scope of access during compromise window
- B) Reset the Snowflake account password, notify the cloud provider, file an incident with Snowflake Support
- C) Run SYSTEM$CLASSIFY on affected tables to check for PII exposure
- D) Enable Tri-Secret Secure to retroactively re-encrypt data accessed by compromised credentials

---

## Q9 (Scenario)
A Security Engineer needs to establish a baseline for "normal" query volume per role to enable anomaly detection. Which approach using native Snowflake tooling is MOST effective?

- A) Create a dynamic table from QUERY_HISTORY aggregated by role_name and hour, then use Snowflake Alerts to trigger when current volume exceeds the rolling average by 3 standard deviations
- B) Export QUERY_HISTORY to S3 and use a third-party SIEM for ML-based anomaly detection
- C) Use SNOWFLAKE.ACCOUNT_USAGE.METERING_HISTORY to detect unusual credit consumption as a proxy
- D) Create a row-access policy on QUERY_HISTORY to restrict visibility to authorized security roles

---

## Q10 (Scenario)
During a red team exercise, an attacker who has compromised a low-privilege Snowflake user attempts privilege escalation by exploiting a misconfigured stored procedure. Which stored procedure property enables this attack vector?

- A) EXECUTE AS OWNER
- B) EXECUTE AS CALLER
- C) SECURE procedure definition
- D) CALLED ON NULL INPUT

---

## Q11 (Scenario)
A Security Engineer discovers that a stored procedure owned by SYSADMIN uses EXECUTE AS OWNER and is callable by PUBLIC. A low-privilege user exploited this to query sensitive data. What is the remediation?

- A) Grant USAGE on the procedure only to authorized roles and remove PUBLIC access
- B) Change the procedure to EXECUTE AS CALLER
- C) Wrap the procedure body in a row-access policy
- D) Enable SECURE on the procedure definition

---

## Q12 (Multi Answer - Select 2)
An incident investigation reveals that an attacker used a compromised Snowflake account to exfiltrate data over several weeks. Which two Time Travel capabilities are useful during the forensic recovery phase?

- A) Querying historical table states using AT(TIMESTAMP => ...) to reconstruct data before exfiltration
- B) Undropping tables dropped by the attacker to restore availability
- C) Using Time Travel to replay the attacker's GRANT statements
- D) Cloning a database AS OF a timestamp before the incident began

---

## Q13 (Scenario)
A Security Engineer is building a SIEM integration to forward Snowflake audit logs in near-real-time. The organization uses Splunk. What is the RECOMMENDED approach for streaming Snowflake ACCOUNT_USAGE data to Splunk?

- A) Use a Snowflake Kafka connector to stream ACCOUNT_USAGE events directly to Splunk's HEC endpoint
- B) Configure a Snowflake notification integration to push events to an SNS topic consumed by a Splunk forwarder
- C) Use a scheduled Snowflake Task to periodically COPY query history records to an external stage, then have Splunk ingest from that stage
- D) Enable Snowflake Trail and configure it to export directly to Splunk via a REST API call

---

## Q14 (Scenario)
A threat intelligence team identifies that a Snowflake admin user's credentials were found in a dark web leak. The account uses username/password authentication without MFA. What is the MINIMUM set of immediate actions?

- A) Disable the user, investigate LOGIN_HISTORY for recent access, rotate credentials, enforce MFA before re-enabling
- B) Drop the user and create a new account with the same permissions
- C) Enable Tri-Secret Secure on the account to prevent further data access
- D) Place a network policy restriction limiting all access to a single trusted IP range

---

## Q15 (Scenario)
During a tabletop exercise, the team is testing their response to a "SYSADMIN credential compromise" scenario. Which Snowflake-native capability would allow the ACCOUNTADMIN to revoke all privileges granted by SYSADMIN without individually revoking each grant?

- A) REVOKE ROLE SYSADMIN FROM ALL USERS
- B) Use GRANTS_TO_ROLES to identify all grants made by SYSADMIN, then systematically revoke each
- C) REVOKE ALL PRIVILEGES ON ALL OBJECTS IN DATABASE FROM ROLE SYSADMIN
- D) DROP ROLE SYSADMIN CASCADE

---

## Q16 (Scenario)
A Security Engineer notices in ACCESS_HISTORY that a data scientist role accessed 50 million rows from a sensitive table containing health records—substantially more than the 10,000-row sample typically needed for model training. What is the BEST preventive control going forward?

- A) Apply a row-access policy that limits query results to 10,000 rows per role
- B) Apply an aggregation policy to restrict direct row-level access and allow only aggregate queries
- C) Replace the table with a dynamic data masking policy that nullifies sensitive fields
- D) Enable query acceleration to reduce the performance incentive for large scans

---

## Q17 (Multi Answer - Select 2)
A Security Engineer is conducting a risk assessment of a Snowflake deployment and identifies "uncontrolled use of ACCOUNTADMIN role" as a critical risk. Which two controls MOST directly mitigate this risk?

- A) Create a custom admin role with only the required privileges and revoke ACCOUNTADMIN from day-to-day usage
- B) Require MFA for all users with SYSADMIN or higher roles
- C) Disable the ACCOUNTADMIN role during non-business hours using a scheduled task
- D) Apply a row-access policy to the SNOWFLAKE.ACCOUNT_USAGE views

---

## Q18 (Scenario)
An attacker who gained SYSADMIN access created a new SCIM token integration to provision a backdoor admin user. The Security Engineer must identify when this integration was created. Which view should be queried?

- A) SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES
- B) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY filtered on query_text LIKE '%CREATE SECURITY INTEGRATION%'
- C) SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY
- D) SNOWFLAKE.ACCOUNT_USAGE.POLICY_REFERENCES

---

## Q19 (Scenario)
During forensic analysis following a breach, a Security Engineer needs to determine which specific columns of a sensitive table were accessed by a compromised role. Which ACCOUNT_USAGE view provides column-level access granularity?

- A) QUERY_HISTORY
- B) ACCESS_HISTORY (objects_accessed array with column-level detail)
- C) TAG_REFERENCES joined to COLUMNS
- D) DATA_CLASSIFICATION_LATEST

---

## Q20 (Multi Answer - Select 2)
A Security Engineer suspects that a rogue DBA used CREATE TABLE AS SELECT to copy sensitive data to a less-secure schema before exfiltrating it. Which two views in ACCOUNT_USAGE would BEST help confirm this?

- A) ACCESS_HISTORY — to see which source tables were read
- B) QUERY_HISTORY — to find CTAS statements
- C) TAG_REFERENCES — to see if tags were applied to the copied table
- D) COPY_HISTORY — to see if data was copied to external stages

---

## Q21 (Multi Answer - Select 2)
A Security Engineer is designing threat detection rules for a Snowflake environment. Which two patterns in QUERY_HISTORY are the STRONGEST indicators of a potential data exfiltration attempt?

- A) Queries selecting from PII-tagged tables by a role that normally doesn't access them
- B) A large number of SHOW GRANTS statements executed in rapid succession
- C) COPY INTO @external_stage statements executed outside business hours
- D) USE ROLE ACCOUNTADMIN executed from an unexpected IP address

---

## Q22 (Scenario)
A Security Engineer is conducting threat hunting and wants to detect when a new virtual warehouse is created by any user outside the approved provisioning role (WAREHOUSE_ADMIN). This could indicate a compromised account provisioning compute for unauthorized workloads. Which query BEST detects this pattern?

- A) SELECT * FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE = 'CREATE_WAREHOUSE' AND ROLE_NAME != 'WAREHOUSE_ADMIN' AND START_TIME > DATEADD(day, -7, CURRENT_TIMESTAMP())
- B) SELECT * FROM ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY WHERE CREDITS_USED > 10 AND WAREHOUSE_NAME NOT IN (SELECT NAME FROM approved_list)
- C) SELECT * FROM ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE PRIVILEGE = 'CREATE WAREHOUSE' AND GRANTEE_NAME != 'WAREHOUSE_ADMIN'
- D) SHOW WAREHOUSES WHERE OWNER != 'WAREHOUSE_ADMIN'

---

## Q23 (Scenario)
After a security incident, a compliance officer asks for evidence that all changes to data masking policies were performed by authorized personnel. Which view in ACCOUNT_USAGE provides this audit trail?

- A) QUERY_HISTORY filtered on query_text LIKE '%MASKING POLICY%'
- B) POLICY_REFERENCES
- C) ACCESS_HISTORY
- D) GRANTS_TO_ROLES

---

## Q24 (Scenario)
A Security Engineer is assessing the blast radius of a compromised SYSADMIN credential. Which query BEST identifies all objects owned by SYSADMIN that could have been modified?

- A) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE role_name = 'SYSADMIN'
- B) SHOW GRANTS TO ROLE SYSADMIN combined with GRANTS_TO_ROLES to enumerate all owned objects
- C) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY WHERE user_name = 'sysadmin_user'
- D) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.TABLES WHERE table_owner = 'SYSADMIN'

---

## Q25 (Scenario)
A Security Engineer needs to respond to a suspected session token replay attack where an attacker is reusing a stolen session token from an internal user. Which action MOST effectively terminates the illegitimate session without affecting the legitimate user?

- A) Disable the user account immediately
- B) Use SELECT SYSTEM$ABORT_SESSION(session_id) targeting the suspicious session ID identified in SESSIONS view
- C) Apply a network policy that blocks the attacker's IP range
- D) Revoke the user's current role assignment

---

## Q26 (Scenario)
An organization uses Snowflake Replication for disaster recovery. During a ransomware incident affecting the primary account, the Security Engineer needs to execute a failover. Which role is required to perform a failover promotion of a replicated database?

- A) SYSADMIN
- B) ACCOUNTADMIN
- C) SECURITYADMIN
- D) REPLICATION_ADMIN (custom role with FAILOVER privilege)

---

## Q27 (Multi Answer - Select 2)
During a post-incident review, the team identifies that an attacker performed reconnaissance inside the Snowflake account using SHOW commands. Which two SHOW commands would reveal the most sensitive account structure information to an attacker?

- A) SHOW GRANTS TO ROLE SYSADMIN
- B) SHOW DATABASES
- C) SHOW NETWORK POLICIES
- D) SHOW WAREHOUSES

---

## Q28 (Scenario)
A Security Engineer is performing a risk assessment and identifies that several Snowflake users have not logged in for 180+ days but still have active credentials and role assignments. What is the APPROPRIATE risk treatment?

- A) Apply a row-access policy to restrict these users from accessing data
- B) Disable or drop dormant user accounts and revoke their role assignments
- C) Force MFA enrollment for all dormant accounts
- D) Apply a session policy with a 1-minute idle timeout to dormant users

---

## Q29 (Scenario)
A Security Engineer receives a Trust Center alert indicating that a user's password was found in a third-party breach database. The user has MFA enabled. What is the Security Engineer's CORRECT assessment?

- A) No immediate action required; MFA prevents credential-based attacks even with a breached password
- B) The credential must still be rotated because MFA can be bypassed through phishing or device compromise; disable and notify the user
- C) Enable Tri-Secret Secure to invalidate all existing sessions
- D) Remove the user's SYSADMIN role as a precaution

---

## Q30 (Scenario)
A Security Engineer is building an incident response runbook for "unauthorized external stage creation." Which combination of views and actions provides the MOST complete detection-to-containment workflow?

- A) Detect via QUERY_HISTORY (LIKE '%CREATE STAGE%'), correlate with ACCESS_HISTORY for data written, drop unauthorized stages, revoke USAGE on external storage integrations from non-admin roles
- B) Detect via COPY_HISTORY, block all COPY INTO commands with a row-access policy, notify cloud provider
- C) Use Trust Center to identify unauthorized stages, apply a masking policy to external stage URLs
- D) Detect via STAGES view, use Tri-Secret Secure to re-encrypt all externally staged data

---

## Q31 (Scenario)
An organization has a Snowflake Business Critical edition account and experiences a service disruption at the cloud provider level. They need to restore Snowflake service in an alternate region. What Snowflake feature enables this cross-region failover?

- A) Snowflake Time Travel with a cross-region clone
- B) Failover Groups with a secondary account in the target region
- C) Cross-region data sharing with a Business Critical consumer account
- D) COPY INTO an S3 bucket in the target region, then CREATE DATABASE FROM S3

---

## Q32 (Scenario)
During an incident, a Security Engineer needs to identify whether a specific table was accessed between two timestamps last week. The ACCOUNT_USAGE latency is up to 45 minutes. Which view should be used for NEAR-REAL-TIME access information?

- A) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
- B) SNOWFLAKE.INFORMATION_SCHEMA.ACCESS_HISTORY (14-day retention, near-real-time)
- C) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
- D) SHOW TABLE ACCESS HISTORY

---

## Q33 (Multi Answer - Select 2)
A Security Engineer is responding to an incident where credentials were exposed via a third-party data breach. Which two Snowflake Trust Center scanners are MOST relevant to the immediate response?

- A) Leaked Credentials (to identify which Snowflake users have breached credentials)
- B) Security Essentials (to assess baseline security posture and identify other weaknesses)
- C) Compliance Center (to verify regulatory frameworks are met)
- D) Query Performance (to identify slow queries run by the compromised user)

---

## Q34 (Scenario)
A Security Engineer discovers that a developer created an EXTERNAL STAGE pointing to an S3 bucket owned by an external party without authorization. The stage was used to run COPY INTO statements. What is the MINIMUM set of containment actions?

- A) Drop the unauthorized stage, revoke CREATE STAGE privilege from the developer's role, investigate ACCESS_HISTORY to determine scope of data copied
- B) Disable the S3 storage integration used, rotate all IAM credentials, archive the affected database
- C) Apply a network policy blocking S3 outbound traffic, alert the cloud provider
- D) Enable Tri-Secret Secure to prevent further writes to external stages

---

## Q35 (Scenario)
During incident response, the Security Engineer must determine whether an attacker modified any masking policies. Using QUERY_HISTORY, which query_type or query_text pattern BEST identifies masking policy changes?

- A) query_type = 'ALTER' AND query_text ILIKE '%MASKING POLICY%'
- B) query_type = 'GRANT' AND query_text ILIKE '%MASKING POLICY%'
- C) query_text ILIKE '%APPLY MASKING POLICY%' OR query_text ILIKE '%ALTER MASKING POLICY%' OR query_text ILIKE '%CREATE MASKING POLICY%'
- D) execution_status = 'FAIL' AND query_text ILIKE '%POLICY%'

---

## Q36 (Scenario)
A Security Engineer notices an unusual spike in credit consumption on a warehouse used exclusively for ETL jobs. The spike correlates with a time window when no ETL jobs were scheduled. What is the MOST likely threat scenario and BEST investigative step?

- A) Hardware failure; check METERING_HISTORY for warehouse auto-scaling events
- B) Unauthorized workload execution by a compromised service account; query QUERY_HISTORY filtered by warehouse_name and the anomalous time window to identify unexpected queries
- C) Cost anomaly caused by query acceleration; review QUERY_ACCELERATION_HISTORY
- D) Auto-clustering maintenance; review AUTOMATIC_CLUSTERING_HISTORY

---

## Q37 (Scenario)
An organization's security policy requires that all ACCOUNTADMIN actions be reviewed weekly. Which view and query pattern MOST efficiently surfaces all DDL and privilege-changing actions performed under the ACCOUNTADMIN role in the past 7 days?

- A) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE role_name = 'ACCOUNTADMIN' AND query_type IN ('CREATE', 'DROP', 'ALTER', 'GRANT', 'REVOKE') AND start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
- B) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY WHERE user_identity ILIKE '%ACCOUNTADMIN%'
- C) SHOW GRANTS TO ROLE ACCOUNTADMIN
- D) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE role = 'ACCOUNTADMIN'

---

## Q38 (Scenario)
A Security Engineer is developing threat models for a Snowflake deployment. A key threat is "compromised CI/CD pipeline credentials." Which mitigating control in Snowflake is MOST effective for this threat?

- A) Use key-pair authentication for the CI/CD service account with key rotation every 90 days; restrict the service account to a dedicated IP range via network policy
- B) Use username/password with a 16-character complex password rotated monthly
- C) Grant the CI/CD service account SYSADMIN to ensure uninterrupted pipeline execution
- D) Enable Tri-Secret Secure specifically for the database used by CI/CD pipelines

---

## Q39 (Multi Answer - Select 2)
A Security Engineer is conducting a risk assessment for Snowflake data sharing with external organizations. Which two threat vectors are HIGHEST risk and should be evaluated FIRST?

- A) A consumer account becoming compromised and using the shared data in unauthorized ways
- B) Misconfigured secure views exposing more columns than intended to consumer accounts
- C) Snowflake's internal infrastructure being compromised by the provider's share definition
- D) A consumer using Time Travel to access historical versions of shared data

---

## Q40 (Scenario)
A Security Engineer is designing incident response procedures for a "ransomware targeting Snowflake" scenario. Which combination of Snowflake features provides the BEST recovery capability?

- A) Time Travel + Fail-safe + replication to a secondary account in a separate cloud region
- B) Dynamic data masking on all tables + table encryption at rest
- C) Tri-Secret Secure + daily COPY INTO external stage backups
- D) SCIM-based user provisioning + MFA for all users

---

## Q41 (Scenario)
During a threat hunt, a Security Engineer queries LOGIN_HISTORY and discovers that a valid user account has logged in from two geographically distant locations within a 10-minute window (impossible travel). The user is currently logged in from both locations. What should the Security Engineer do FIRST?

- A) Monitor silently for 24 hours to gather more evidence before acting
- B) Disable the user account immediately and investigate both active sessions via SESSIONS view
- C) Apply a network policy restricting the user to their home country's IP ranges
- D) Force a password reset and send an email notification to the user

---

## Q42 (Scenario)
An organization wants to implement automated threat response: when a user queries more than 1 million rows from a PII-tagged table in a single query, the user's session should be terminated automatically. How can this be implemented in Snowflake?

- A) Create an ACCESS_HISTORY-based Snowflake Alert that triggers SYSTEM$ABORT_SESSION when the threshold is exceeded
- B) Apply a row-access policy limiting all results to 1 million rows
- C) Use an aggregation policy that prevents any query from returning more than 1 million rows
- D) Deploy a resource monitor that suspends the warehouse when credit consumption spikes

---

## Q43 (Scenario)
A Security Engineer identifies that GRANTS_TO_ROLES shows a non-admin role was granted CREATE INTEGRATION privilege. This is a high-risk privilege. What is the remediation and why is this privilege high-risk?

- A) Revoke CREATE INTEGRATION from non-admin roles; CREATE INTEGRATION allows creation of external network connections (storage, SAML, API) that could be used for data exfiltration
- B) Revoke SELECT on the INTEGRATIONS view; it exposes integration credentials
- C) Apply a masking policy to the INTEGRATIONS table to hide connection strings
- D) Disable the integration and recreate it under ACCOUNTADMIN ownership

---

## Q44 (Scenario)
During a penetration test, the tester discovers that a Snowflake Streamlit app has a SQL injection vulnerability allowing arbitrary query execution. The app runs with a role that has READ access to sensitive tables. What is the MOST effective defense-in-depth approach?

- A) Use parameterized queries / bind variables in the Streamlit app; apply row-access policies on sensitive tables; enforce least-privilege for the app's Snowflake role
- B) Enable Tri-Secret Secure on the account to block unauthorized query execution
- C) Apply a session policy with a 60-second idle timeout to the app's role
- D) Restrict the app's warehouse to the smallest size to limit query performance

---

## Q45 (Multi Answer - Select 2)
A Security Engineer is assessing risks from a third-party Native App installed from the Snowflake Marketplace. Which two capabilities of Native Apps could pose a data exfiltration risk if the provider is malicious?

- A) External access integrations that allow outbound network calls from within the app
- B) Stored procedures running with EXECUTE AS OWNER that access consumer data
- C) The app displaying a user interface in Streamlit
- D) The app using SHOW WAREHOUSES to list available compute resources

---

## Q46 (Scenario)
A Security Engineer needs to create a threat detection rule that fires when any user other than the designated ACCOUNTADMIN service account is granted the ACCOUNTADMIN role. Using Snowflake Alerts, on which view should the alert condition be based?

- A) SNOWFLAKE.ACCOUNT_USAGE.SESSIONS
- B) SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES filtered WHERE role = 'ACCOUNTADMIN'
- C) SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY
- D) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY

---

## Q47 (Scenario)
Following an incident where an attacker used a compromised Snowflake key-pair authentication private key to access the account, the Security Engineer needs to revoke the compromised key and issue a new one. What is the correct procedure?

- A) ALTER USER compromised_user UNSET RSA_PUBLIC_KEY; generate a new RSA key pair; ALTER USER compromised_user SET RSA_PUBLIC_KEY = '<new_public_key>'
- B) Drop and recreate the user account with a new key pair
- C) Use SYSTEM$ROTATE_ENCRYPTION_KEY to rotate the key
- D) Contact Snowflake Support to revoke the private key at the infrastructure level

---

## Q48 (Scenario)
A Security Engineer is building a compliance dashboard to demonstrate that no unauthorized privilege escalations occurred last quarter. Which view and query combination provides the MOST complete evidence?

- A) SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES with granted_by and created_on fields, filtered for the quarter
- B) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY with privilege_usage_objects
- C) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY filtered on query_type = 'GRANT'
- D) SHOW GRANTS TO ROLE SYSADMIN

---

## Q49 (Scenario)
An organization suspects a supply chain attack: a third-party data pipeline tool authorized via Snowflake OAuth may have been compromised. The tool uses a client_id/client_secret OAuth flow. What is the FIRST containment action?

- A) Revoke the OAuth integration's client secret by altering or dropping the OAuth security integration
- B) Disable all OAuth integrations account-wide
- C) Enable Tri-Secret Secure to re-encrypt all data the tool accessed
- D) Remove the role granted to the OAuth integration's service account

---

## Q50 (Scenario)
During forensics, a Security Engineer needs to determine the exact sequence of role activations during a suspicious session. Which view provides per-session role usage history?

- A) SNOWFLAKE.ACCOUNT_USAGE.SESSIONS
- B) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY — the role_name column reflects the active role for each query
- C) SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY
- D) SHOW GRANTS TO ROLE

---

## Q51 (Multi Answer - Select 2)
A Security Engineer must ensure Snowflake can support forensic investigation requirements under a regulatory framework requiring 12 months of audit log retention. By default, ACCOUNT_USAGE retains data for 365 days. Which two approaches ensure audit log data older than 365 days remains available for investigations?

- A) Configure a Snowflake Task to periodically INSERT ACCOUNT_USAGE data into a long-retention table in a dedicated audit database
- B) Export ACCOUNT_USAGE data monthly to a Snowflake-managed external stage
- C) Increase the Time Travel retention period to 365 days for ACCOUNT_USAGE tables
- D) Use Snowflake Replication to replicate the ACCOUNT_USAGE data to a secondary account with a longer retention table

---

## Q52 (Scenario)
A Security Engineer is evaluating the risk of a Snowflake data breach from the cloud provider infrastructure level. Which feature ensures that even Snowflake employees cannot access customer data encryption keys?

- A) Customer-Managed Encryption Keys (CMEK) via Tri-Secret Secure with an external key manager (AWS KMS / Azure Key Vault / GCP KMS)
- B) End-to-end TLS encryption for all data in transit
- C) Dynamic data masking applied to all sensitive columns
- D) Network policy restricting access to Snowflake's own IP ranges

---

## Q53 (Scenario)
During incident response, a Security Engineer needs to determine whether sensitive data was downloaded via a SnowSQL client. The user is suspected to have used the RESULT_SCAN or GET command to download query results. Which view helps identify large result set downloads?

- A) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY — check bytes_scanned and rows_produced for queries by the suspect user
- B) SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY
- C) SNOWFLAKE.ACCOUNT_USAGE.COPY_HISTORY
- D) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY

---

## Q54 (Scenario)
An organization's incident response plan requires that upon detection of a compromised ACCOUNTADMIN account, all pending changes by that account be rolled back immediately. Which Snowflake feature supports rolling back DDL changes made by the attacker?

- A) Use Time Travel to query tables AS OF a timestamp before the attacker's first action, then UNDROP any dropped objects
- B) Use SYSTEM$ROLLBACK_TRANSACTION to reverse uncommitted DDL changes
- C) Run ALTER ACCOUNT SET ENFORCE_IMMUTABLE to lock all objects
- D) Execute ROLLBACK; in the session context of the attacker's session

---

## Q55 (Multi Answer - Select 2)
A Security Engineer is modeling threats to a Snowflake deployment and identifies "credential stuffing" as a key attack vector. Which two Snowflake controls MOST directly mitigate credential stuffing attacks?

- A) Multi-factor authentication (MFA) enforcement via authentication policies
- B) Network policies restricting Snowflake access to known corporate IP ranges
- C) Tri-Secret Secure for key management
- D) Row-access policies on sensitive tables

---

## Q56 (Scenario)
A Security Engineer discovers that a third-party analytics vendor was granted direct SELECT access to production tables containing PII instead of being onboarded via secure views. The vendor's access has been ongoing for 3 months. What should the Security Engineer do to assess the exposure?

- A) Query ACCESS_HISTORY for the vendor's Snowflake user to see which tables and columns were accessed over the past 3 months, identify all PII columns accessed, and initiate a data breach assessment
- B) Run SYSTEM$CLASSIFY on the affected tables to retroactively tag PII columns
- C) Apply dynamic data masking to the tables retroactively to hide PII from the vendor's access history
- D) Use Time Travel to restore the tables to their pre-access state

---

## Q57 (Scenario)
A Security Engineer is tasked with implementing "break-glass" procedures for emergency ACCOUNTADMIN access. The break-glass account must only be usable from a specific jump host IP and only during declared incidents. Which combination of controls enforces this?

- A) A dedicated ACCOUNTADMIN user with a network policy restricting access to the jump host IP, stored in a secrets vault; usage logged via a Snowflake Alert on LOGIN_HISTORY for that user
- B) Share the ACCOUNTADMIN password in a team vault; rely on after-the-fact audit reviews
- C) Use SCIM to provision the break-glass user only when an incident is declared, then deprovision immediately after
- D) Apply a session policy with 5-minute idle timeout and enable MFA on the break-glass user

---

## Q58 (Scenario)
An attacker with READ access to a shared Snowflake database attempts to enumerate the schema by running repeated SHOW TABLES, SHOW COLUMNS, and SELECT COUNT(*) queries. What type of threat does this represent, and which control is BEST suited to detect it?

- A) Data exfiltration via bulk copy; monitor COPY_HISTORY
- B) Schema reconnaissance; monitor QUERY_HISTORY for high-frequency SHOW commands and SELECT COUNT queries from the shared consumer role
- C) Privilege escalation via schema enumeration; apply row-access policies to all shared tables
- D) Denial-of-service attack; apply resource monitors to the consumer's virtual warehouse

---

## Q59 (Scenario)
Following a security incident involving unauthorized COPY INTO to an external stage, the Security Engineer recommends removing CREATE STAGE and USAGE ON INTEGRATION privileges from all non-admin roles. A developer objects, saying this will break their data pipeline. What is the CORRECT security posture?

- A) Grant CREATE STAGE only to a dedicated pipeline service role with a network policy limiting it to the pipeline server's IP; data engineers use a secondary role for this operation only
- B) Allow the developer to keep the privilege but implement a Snowflake Alert to detect unauthorized usage
- C) Create a masking policy on the STAGES view to hide stage URLs from non-admin users
- D) Keep the current permissions but enable Tri-Secret Secure to audit all external stage writes

---

## Q60 (Multi Answer - Select 2)
A Security Engineer is reviewing the security posture of a Snowflake account and finds that SECURITYADMIN has been granted OWNERSHIP on critical production databases. Why is this a risk, and which two controls address it?

- A) SECURITYADMIN with OWNERSHIP can transfer ownership, drop objects, or grant access to unauthorized users; transfer OWNERSHIP to dedicated object-owner roles
- B) SECURITYADMIN with OWNERSHIP creates a conflict of interest because security admins can grant themselves data access; separate ownership and security administration
- C) SECURITYADMIN cannot hold OWNERSHIP; this is a technical violation that causes instability
- D) Apply row-access policies owned by SECURITYADMIN to limit the risk exposure

---

## Q61 (Scenario)
During a forensic investigation, a Security Engineer needs to identify all users who were granted a specific role during the past 30 days. Which query provides this information?

- A) SHOW GRANTS OF ROLE <role_name> — real-time snapshot only
- B) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE role = '<role_name>' AND created_on >= DATEADD(day, -30, CURRENT_TIMESTAMP()) AND deleted_on IS NULL
- C) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE query_text ILIKE '%GRANT%<role_name>%'
- D) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.SESSIONS WHERE role_name = '<role_name>'

---

## Q62 (Scenario)
A Security Engineer needs to provide evidence that a Snowflake account has maintained continuous encryption of all data at rest using AES-256 for a PCI DSS audit. Where is this documented, and which Snowflake feature provides customer-controlled key rotation evidence?

- A) Snowflake's SOC 2 Type II report covers at-rest encryption; Tri-Secret Secure key rotation logs in the external KMS provide customer-controlled evidence
- B) The ENCRYPTION_HISTORY ACCOUNT_USAGE view documents all encryption operations
- C) Run SHOW ENCRYPTION KEYS to generate a compliance report
- D) Export COPY_HISTORY to prove data was always encrypted during transfers

---

## Q63 (Scenario)
An organization detects that an attacker used a compromised Snowflake user to run CALL <stored_procedure>() that performed a mass DELETE on a customer table. Time Travel is enabled with a 14-day retention. What is the RECOVERY procedure?

- A) Use CREATE TABLE <recovery_table> AS SELECT * FROM <target_table> AT(TIMESTAMP => <timestamp_before_delete>) to restore the data, then swap tables
- B) Use FAIL-SAFE to recover the deleted rows via Snowflake Support
- C) Run ROLLBACK against the DELETE transaction
- D) Restore from the most recent COPY INTO external stage backup

---

## Q64 (Multi Answer - Select 2)
A Security Engineer is performing a threat hunt and wants to identify any user accounts that may have been created by an attacker as backdoors. Which two queries are MOST relevant?

- A) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.USERS WHERE created_on > <incident_start_time> AND created_by != 'expected_admin'
- B) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE query_text ILIKE '%CREATE USER%' AND start_time > <incident_start_time>
- C) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY WHERE first_authentication_factor = 'PASSWORD'
- D) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE role = 'PUBLIC'

---

## Q65 (Scenario)
A Security Engineer is implementing continuous compliance monitoring. They need to detect when any masking policy is removed from a column. Which approach in Snowflake provides the MOST reliable alert for this change?

- A) A Snowflake Alert querying SNOWFLAKE.ACCOUNT_USAGE.POLICY_REFERENCES and alerting when expected column-policy associations are no longer present
- B) A row-access policy preventing ALTER TABLE ... UNSET MASKING POLICY statements
- C) Trust Center's Compliance Center scanner
- D) A task running SHOW MASKING POLICIES daily and comparing counts

---

## Q66 (Scenario)
During a data breach investigation, a regulatory body requires the organization to disclose exactly which records were accessed by the compromised account. The table has 50 million rows. The Security Engineer uses ACCESS_HISTORY to show that 2 million rows were returned to the compromised user. Which additional control, if in place BEFORE the breach, would have prevented the exfiltration of specific PII fields?

- A) Dynamic data masking on PII columns would have shown masked values even if the query executed
- B) A network policy blocking the user's egress IP would have prevented the data from leaving Snowflake
- C) Time Travel rollback would have reversed the data access
- D) Row-access policies would have reduced the number of rows returned but not hidden specific fields

---

## Q67 (Scenario)
A Security Engineer receives a report that a Snowflake user account created an external function integration that calls an API endpoint outside the organization's approved domain list. What is the risk, and what is the remediation?

- A) External functions can exfiltrate data to arbitrary endpoints; revoke CREATE EXTERNAL FUNCTION and USAGE ON API INTEGRATION from non-approved roles; review QUERY_HISTORY for invocations of the function
- B) External functions are read-only by design; no data exfiltration is possible
- C) Drop the external function; apply a masking policy to the API response data
- D) Use Tri-Secret Secure to intercept calls to the unauthorized API endpoint

---

## Q68 (Scenario)
A large financial institution wants to perform "tabletop" incident response exercises in Snowflake without disrupting production. Which approach allows them to simulate incident scenarios against realistic data?

- A) Use zero-copy cloning to create a clone of production databases in a dedicated incident response account for simulation exercises
- B) Use Time Travel to rewind the production database to a known state before each exercise
- C) Use data masking policies to anonymize production data during exercises
- D) Run exercises against the Snowflake sample databases (SNOWFLAKE_SAMPLE_DATA)

---

## Q69 (Multi Answer - Select 2)
A Security Engineer is reviewing a Snowflake deployment's risk posture against the NIST Cybersecurity Framework. Under the "Detect" function, which two Snowflake capabilities MOST directly contribute to detection capabilities?

- A) Snowflake Alerts on ACCOUNT_USAGE views for anomalous access patterns
- B) Trust Center's Security Essentials and Threat Intelligence scanners
- C) Dynamic data masking on PII columns
- D) Row-access policies restricting data visibility

---

## Q70 (Scenario)
A Security Engineer discovers that the ACCOUNTADMIN ran a series of GRANT ROLE commands to give an unknown user broad access. The ACCOUNTADMIN user has denied doing this. The Security Engineer needs to determine if this was due to session hijacking or an insider action. Which evidence in Snowflake logs is MOST helpful?

- A) Check LOGIN_HISTORY for the ACCOUNTADMIN's session: compare the IP address and client_application of the GRANT commands in QUERY_HISTORY against the admin's known devices
- B) Use SYSTEM$SHOW_ACTIVE_BEHAVIOR to reconstruct the session
- C) Check DATA_TRANSFER_HISTORY for unusual exports from the ACCOUNTADMIN session
- D) Review GRANTS_TO_ROLES to see if the unknown user has been granted before

---

## Q71 (Scenario)
An attacker who had brief SYSADMIN access created a stored procedure with EXECUTE AS OWNER that is now accessible by PUBLIC. The attacker's session has been terminated and their account disabled. What residual risk remains, and how should it be addressed?

- A) The stored procedure itself is now a privilege escalation backdoor; it must be dropped or altered to EXECUTE AS CALLER, and PUBLIC access must be revoked
- B) All stored procedures auto-expire when their owner's account is disabled; no further action needed
- C) Apply a row-access policy to the stored procedure's output tables to prevent unauthorized access
- D) The risk is neutralized once the attacker's account is disabled because the procedure cannot execute without an active session

---

## Q72 (Scenario)
A Security Engineer is asked to implement a control that prevents sensitive data from being written to any external location by any user, as a final safety net. Which Snowflake capability can restrict outbound data movement at the account level?

- A) Network rules configured to block all outbound connections from Snowflake to external IPs, combined with external access integration restrictions
- B) Dynamic data masking that nullifies all data before it reaches external stages
- C) Tri-Secret Secure, which requires key authorization before any COPY INTO external stage
- D) A resource monitor that suspends warehouses executing COPY INTO statements

---

## Q73 (Scenario)
A Security Engineer investigating an insider threat notices that a data analyst ran a series of SELECT queries on tables they have access to, then immediately ran CREATE TABLE AS SELECT to duplicate the data in a personal schema. The analyst then ran COPY INTO to transfer the duplicate to an external stage. Which detection chain captures this full sequence?

- A) ACCESS_HISTORY (source table reads) → QUERY_HISTORY (CTAS + COPY INTO) → COPY_HISTORY (external stage writes)
- B) LOGIN_HISTORY → SESSIONS → ACCESS_HISTORY
- C) GRANTS_TO_ROLES → QUERY_HISTORY → DATA_TRANSFER_HISTORY
- D) TAG_REFERENCES → ACCESS_HISTORY → COPY_HISTORY

---

## Q74 (Scenario)
A Security Engineer is designing a Snowflake threat detection pipeline. They want alerts to be sent to PagerDuty whenever a critical security event is detected. Which Snowflake features enable this end-to-end?

- A) Snowflake Alert (condition on ACCOUNT_USAGE view) → Notification Integration (SNS/webhook) → PagerDuty via SNS subscription
- B) Snowflake Trail → Direct API call to PagerDuty REST API from a Snowflake external function
- C) Trust Center → Email notification to the on-call team who manually pages PagerDuty
- D) Task on a schedule → CALL stored_procedure() → SYSTEM$SEND_ALERT('pagerduty')

---

## Q75 (Multi Answer - Select 2)
A Security Engineer is assessing the risk of a Snowflake account being used for cryptomining by a compromised user. Which two detection signals are MOST indicative of cryptomining activity in a Snowflake account?

- A) Abnormally high warehouse credit consumption with no corresponding business justification or query output
- B) Repeated warehouse AUTO_RESUME events outside business hours driven by queries with very high compilation time and minimal data scanned
- C) Large numbers of SHOW GRANTS commands executed by the compromised user
- D) High LOGIN_HISTORY failure rates for the compromised user

---

## Q76 (Scenario)
An organization's DR plan requires a Recovery Time Objective (RTO) of 4 hours and Recovery Point Objective (RPO) of 1 hour for Snowflake. Which Snowflake configuration BEST satisfies both requirements?

- A) Replication Groups with continuous replication to a secondary account (RPO ≈ minutes), with a tested failover procedure completing in under 4 hours
- B) Hourly COPY INTO external stage exports (RPO = 1 hour) and CREATE DATABASE FROM STAGE for recovery (RTO depends on data volume)
- C) Snowflake Fail-safe (7-day window) for data recovery; no cross-region replication needed
- D) Time Travel with 1-day retention + manual restore from ACCOUNT_USAGE data

---

## Q77 (Scenario)
A Security Engineer discovers that a data pipeline role has been granted IMPORTED PRIVILEGES on the SNOWFLAKE database. This is typically reserved for ACCOUNTADMIN. What risk does this create, and what is the remediation?

- A) IMPORTED PRIVILEGES on SNOWFLAKE allows the role to query ACCOUNT_USAGE views, exposing full audit logs, query history, and user activity to a non-admin role; revoke this privilege and create a dedicated audit role with SELECT on specific views only
- B) IMPORTED PRIVILEGES grants the ability to import external data packages; revoke and use USAGE ON DATABASE instead
- C) This privilege has no practical security impact on a pipeline role
- D) Grant the pipeline role SELECT on specific ACCOUNT_USAGE views directly instead of IMPORTED PRIVILEGES

---

## Q78 (Scenario)
A Security Engineer is conducting a post-mortem after a data breach. The breach was facilitated by an attacker who exploited a Snowflake Streamlit application by bypassing the app's input validation. The underlying Snowflake role used by the app had SELECT on all tables. What are the TWO lessons learned that should translate to controls? (Select the BEST single answer)

- A) Use parameterized queries to prevent SQL injection; apply least-privilege by granting SELECT only to tables the app actually needs; implement row-access policies to restrict data visible to the app's role
- B) Disable all Streamlit apps until input validation is verified
- C) Apply Tri-Secret Secure to prevent the app from accessing encryption keys
- D) Enable network policies on the app's role to restrict access to the Streamlit server's IP

---

## Q79 (Scenario)
A Security Engineer suspects that an attacker performed privilege escalation by exploiting a FUTURE GRANT that automatically grants elevated access to new objects. How can this be verified and remediated?

- A) Run SHOW FUTURE GRANTS IN DATABASE <db> and SHOW FUTURE GRANTS IN SCHEMA <schema> to identify overly broad future grants; revoke or narrow them to specific object types and less-privileged roles
- B) Drop and recreate all schemas to clear future grants
- C) Apply a row-access policy that blocks automatically granted privileges
- D) Use GRANTS_TO_ROLES to see all future grants in real time

---

## Q80 (Multi Answer - Select 2)
A Security Engineer is performing a "purple team" exercise testing Snowflake detection coverage. The red team will attempt two attack techniques: (1) extracting data via COPY INTO external stage, and (2) creating a backdoor user. Which two detective controls should the blue team have in place before the exercise?

- A) A Snowflake Alert on QUERY_HISTORY WHERE query_text ILIKE '%COPY INTO%@%' for external stage writes
- B) A Snowflake Alert on ACCOUNT_USAGE.USERS WHERE created_on is recent and created_by is unexpected
- C) A row-access policy blocking COPY INTO for non-admin roles
- D) A masking policy on the USERS view to prevent user enumeration

---

## Q81 (Scenario)
An organization discovers that their Snowflake account was configured to allow password-based authentication for all users, including service accounts. Following a compromise, they want to enforce key-pair-only authentication for all service accounts going forward. Which Snowflake feature enforces this?

- A) Create an authentication policy with CLIENT_TYPES = ('SNOWFLAKE_CLI', 'DRIVER') and MFA_ENROLLMENT = 'REQUIRED' for the service account group
- B) Create an authentication policy with AUTHENTICATION_METHODS = ('KEYPAIR') and assign it to the service account users
- C) Set DISABLE_PASSWORD_AUTHENTICATION = TRUE at the account level
- D) Remove the DEFAULT_ROLE from all service accounts to prevent password login

---

## Q82 (Scenario)
A Security Engineer is using Snowflake's Trust Center for the first time after a potential breach. They find the "Threat Intelligence" scanner shows active findings. What type of intelligence does the Threat Intelligence scanner provide?

- A) Real-time threat feeds of known malicious IP addresses that have been detected accessing the Snowflake account
- B) AI-generated recommendations for query optimization and warehouse sizing
- C) Correlation of Snowflake LOGIN_HISTORY against threat intelligence databases to identify logins from known malicious IPs or indicators of compromise
- D) Vulnerability scan results for Snowflake's infrastructure components

---

## Q83 (Scenario)
A Security Engineer must ensure that in the event of a Snowflake service account compromise, the blast radius is minimized. The service account is currently used for: ingesting raw data, transforming data with dbt, and querying dashboards. What is the MOST appropriate segmentation?

- A) Create three separate service accounts with distinct roles—one for ingestion (WRITE on raw schema), one for transformation (WRITE on transformed schema), one for dashboards (READ only)—each with separate key pairs and network policies
- B) Keep a single service account but apply dynamic data masking to dashboard queries
- C) Use a single service account but rotate its key pair weekly
- D) Grant the service account SYSADMIN and rely on QUERY_HISTORY for post-incident forensics

---

## Q84 (Scenario)
A Security Engineer is reviewing the COPY_HISTORY view and notices that an unusual COPY INTO command was executed, writing data to an S3 stage in a region not normally used by the organization. The execution_status shows SUCCESS. What is the immediate containment action?

- A) Drop the external stage used in the copy, revoke USAGE on the storage integration, investigate ACCESS_HISTORY to determine what data was written, and contact the S3 bucket owner if identifiable
- B) Apply a masking policy to the tables that were copied from
- C) Increase warehouse size to enhance monitoring speed
- D) Enable Tri-Secret Secure to re-encrypt the exported data in S3

---

## Q85 (Scenario)
During a security review, a Security Engineer finds that a Snowflake user has been connecting via a personal device using an outdated SnowSQL version with known security vulnerabilities. The organization's policy requires approved client versions. Which Snowflake control can enforce minimum client version requirements?

- A) Apply a session policy with MIN_CLIENT_VERSION constraints
- B) Apply a network policy restricting connections to known corporate devices only
- C) Use an authentication policy to block connections from non-compliant client types
- D) Set MIN_SNOWSQL_VERSION at the account level via ALTER ACCOUNT

---

## Q86 (Multi Answer - Select 2)
A Security Engineer is designing a Snowflake security baseline for a healthcare organization subject to HIPAA. Which two Snowflake controls are MANDATORY for HIPAA compliance related to access control and data protection?

- A) Role-based access control with documented minimum necessary access and regular access reviews
- B) Dynamic data masking on all PHI columns with masking policies applied based on role
- C) Using only Snowflake virtual private deployments (VPS) to ensure physical isolation
- D) Disabling Time Travel entirely to prevent unauthorized access to historical PHI

---

## Q87 (Scenario)
An attacker with access to a Snowflake account attempts to cover their tracks by deleting rows from ACCOUNT_USAGE views. What should the Security Engineer communicate to the incident response team?

- A) ACCOUNT_USAGE views reflect historical metadata from Snowflake's internal logging infrastructure; they are immutable and cannot be modified or deleted by account users, so audit logs are intact
- B) The attacker may have succeeded; immediately export remaining ACCOUNT_USAGE data before more rows are deleted
- C) Run UNDROP on the affected ACCOUNT_USAGE views to restore the deleted rows
- D) Enable Write Once Read Many (WORM) on ACCOUNT_USAGE to prevent future deletion attempts

---

## Q88 (Scenario)
A Security Engineer is setting up a continuous compliance check to verify that all users with ACCOUNTADMIN role have MFA enabled. Using ACCOUNT_USAGE, which combination of views would provide this check?

- A) JOIN SNOWFLAKE.ACCOUNT_USAGE.USERS with SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE role = 'ACCOUNTADMIN' and check ext_authn_duo field on users
- B) Query SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY WHERE first_authentication_factor = 'PASSWORD_AND_MFA'
- C) Query SHOW USERS to check MFA status of ACCOUNTADMIN users
- D) Use Trust Center's Security Essentials scanner which checks for MFA compliance automatically

---

## Q89 (Scenario)
A Security Engineer is reviewing incident response capability and determines that their team cannot currently identify "who granted access to what and when" within the past 90 days. Which ACCOUNT_USAGE view, often overlooked, is specifically designed for this historical grant tracking?

- A) GRANTS_TO_ROLES (includes created_on and deleted_on timestamps with granted_by field, providing full historical grant lifecycle)
- B) QUERY_HISTORY filtered on GRANT statements
- C) ACCESS_HISTORY with privilege_level filter
- D) SESSIONS filtered on role_name

---

## Q90 (Scenario)
A Security Engineer is implementing a "least-privilege audit" using Snowflake ACCOUNT_USAGE data. They want to identify all privileges that exist in the account but have NEVER been exercised (unused privileges). Which approach BEST approximates this analysis using available views?

- A) Compare GRANTS_TO_ROLES (all granted privileges) with ACCESS_HISTORY (objects actually accessed) and QUERY_HISTORY (queries actually executed by each role); roles or privileges with grants but zero appearances in ACCESS_HISTORY over the past 90 days are candidates for removal
- B) Query SNOWFLAKE.ACCOUNT_USAGE.METERING_HISTORY to find roles with zero credit consumption
- C) Use SHOW GRANTS TO ROLE for every role and compare to the known business purpose
- D) Query POLICY_REFERENCES to find all policies that have never triggered a masking event
