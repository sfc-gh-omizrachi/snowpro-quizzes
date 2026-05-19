# Domain 4: Answers

---

## Q1
**Answer:** C
**Explanation:** The FIRST containment action for a compromised service account is to immediately prevent new connections by disabling the account: ALTER USER ... SET DISABLED = TRUE. This is faster and safer than dropping the user (which loses grant information) and more targeted than revoking roles (which doesn't stop existing authenticated sessions). Disabling the user stops all new authentication attempts immediately while preserving the account for investigation and recovery.
**Source:** [Incident Response - User Disable](https://docs.snowflake.com/en/sql-reference/sql/alter-user)
**Quote:** "ALTER USER ... SET DISABLED = TRUE immediately prevents the user from creating new sessions while preserving account configuration for investigation."

---

## Q2
**Answer:** B
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY provides the complete record of each query with: QUERY_TEXT (the actual SQL executed), START_TIME (execution timestamp), USER_NAME, ROLE_NAME, CLIENT_IP (source IP), and dozens of other fields. This enables reconstruction of "all SQL statements executed by a specific user, including source IP and execution time" — the forensic record needed for incident investigation. ACCESS_HISTORY provides object-level access but lacks per-query timing and IP granularity at the query level.
**Source:** [QUERY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "QUERY_HISTORY records each query with user, role, source IP, timing, status, and full SQL text."

---

## Q3
**Answer:** A, C
**Explanation:** For reconstructing the timeline of data accessed and copied to external stages: (A) QUERY_HISTORY provides the full SQL timeline — CREATE EXTERNAL STAGE, SELECT from sensitive tables, and COPY INTO statements — with timestamps; and (C) COPY_HISTORY specifically records COPY INTO operations to external stages with the destination path, rows/bytes exported, and execution status. Together, QUERY_HISTORY provides the complete operation sequence and COPY_HISTORY confirms exactly what was exported where.
**Source:** [QUERY_HISTORY](https://docs.snowflake.com/en/sql-reference/account-usage/query_history), [COPY_HISTORY](https://docs.snowflake.com/en/sql-reference/account-usage/copy_history)
**Quote:** "QUERY_HISTORY records all SQL operations; COPY_HISTORY specifically records data export operations to external locations."

---

## Q4
**Answer:** B
**Explanation:** After a compromised SYSADMIN session, the most critical eradication step is to drop or revoke all roles and privilege grants created or granted during the compromised session. The attacker may have created new roles, granted themselves or accomplices elevated roles, or modified existing role assignments as persistence mechanisms. Rotating the master encryption key (A) does not address the privilege changes. Disabling Time Travel (C) removes recovery capability.
**Source:** [Incident Response Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "After a privilege escalation incident, audit and revoke all roles and grants created during the compromised session to eliminate persistence mechanisms."

---

## Q5
**Answer:** D
**Explanation:** For identifying DBA exfiltration via external stages and COPY INTO: ACCOUNT_USAGE.QUERY_HISTORY filtered on query_type = 'COPY' reveals all COPY INTO commands executed, including their full SQL text showing the target stage. Combined with filtering for CREATE STAGE (QUERY_TYPE = 'CREATE_STAGE'), this provides a complete picture of unauthorized stage creation and data exfiltration via COPY INTO. COPY_HISTORY (B) also captures copy operations but QUERY_HISTORY provides more context including who created the stages.
**Source:** [QUERY_HISTORY for COPY INTO Detection](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Filter QUERY_HISTORY on QUERY_TYPE = 'COPY' to identify all COPY INTO operations, including those writing to external stages."

---

## Q6
**Answer:** B
**Explanation:** SYSTEM$ABORT_SESSION(session_id) is the Snowflake function to immediately terminate a specific active session identified by its session_id. By querying ACCOUNT_USAGE.SESSIONS or SHOW SESSIONS to find the suspicious session_id, the Security Engineer can terminate that specific session without affecting the legitimate user's other sessions or requiring the user's account to be disabled permanently. This surgical approach is appropriate for session hijacking scenarios.
**Source:** [SYSTEM$ABORT_SESSION](https://docs.snowflake.com/en/sql-reference/functions/system_abort_session)
**Quote:** "SYSTEM$ABORT_SESSION(session_id) terminates a specific active session, enabling targeted session revocation without affecting other sessions or the user account."

---

## Q7
**Answer:** A, B
**Explanation:** For detecting impossible travel (logins from geographically distant locations within 10 minutes): (A) LOGIN_HISTORY provides the CLIENT_IP, USER_NAME, and EVENT_TIMESTAMP for all login events — enabling detection of two logins from different geographic IPs within a short window; (B) SESSIONS shows currently active sessions, including the SESSION_ID, CLIENT_IP, and login time for each active session — enabling the engineer to identify which sessions are currently active and from which locations.
**Source:** [LOGIN_HISTORY](https://docs.snowflake.com/en/sql-reference/account-usage/login_history), [SESSIONS View](https://docs.snowflake.com/en/sql-reference/account-usage/sessions)
**Quote:** "LOGIN_HISTORY provides per-login IP and timestamp data for geographic analysis; SESSIONS shows currently active sessions for real-time investigation."

---

## Q8
**Answer:** A
**Explanation:** The correct response to Trust Center Leaked Credentials findings: (1) Review the flagged users to understand which accounts have compromised credentials; (2) disable affected accounts immediately to prevent unauthorized access; (3) force credential rotation (change passwords, rotate key pairs); (4) investigate the scope of any access during the compromise window using LOGIN_HISTORY and ACCESS_HISTORY. This follows the standard incident response playbook: contain → investigate → remediate → recover.
**Source:** [Trust Center Leaked Credentials](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "When leaked credentials are detected, immediately disable affected accounts, rotate credentials, and investigate access during the compromise window."

---

## Q9
**Answer:** A
**Explanation:** Creating a dynamic table (or scheduled query) from QUERY_HISTORY aggregated by role_name and hour provides a rolling baseline of normal query volume per role. A Snowflake Alert can then monitor the current query volume against this baseline and trigger when current volume exceeds the rolling average by a configurable number of standard deviations. This is the most native Snowflake approach for ML-lite anomaly detection using only Snowflake features. Exporting to a third-party SIEM (B) works but adds external dependencies.
**Source:** [Snowflake Alerts for Anomaly Detection](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Combine dynamic tables (for baseline computation) with Snowflake Alerts (for threshold monitoring) to implement query volume anomaly detection natively."

---

## Q10
**Answer:** A
**Explanation:** EXECUTE AS OWNER is the stored procedure property that runs the procedure with the OWNER role's privileges, regardless of who calls it. A low-privilege user who can CALL the procedure inherits the owner's elevated permissions for the duration of the call. This is the privilege escalation vector: if SYSADMIN owns a procedure callable by PUBLIC, any user gains effective SYSADMIN-level access within that procedure. EXECUTE AS CALLER runs with the caller's own (restricted) privileges.
**Source:** [Stored Procedures - EXECUTE AS](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights)
**Quote:** "EXECUTE AS OWNER runs the stored procedure with the owner role's privileges. Callable by lower-privilege users, it can serve as a privilege escalation vector."

---

## Q11
**Answer:** A
**Explanation:** The remediation for a misconfigured EXECUTE AS OWNER procedure callable by PUBLIC: grant EXECUTE on the procedure ONLY to authorized roles and explicitly revoke from PUBLIC. This prevents unauthorized callers from using the privilege escalation vector. Changing to EXECUTE AS CALLER (B) also mitigates the risk but may break the procedure's intended functionality. The core fix is access control — restricting who can invoke the procedure.
**Source:** [Stored Procedure Security](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights)
**Quote:** "Restrict EXECUTE AS OWNER procedures by granting EXECUTE only to authorized roles and revoking from PUBLIC to prevent privilege escalation."

---

## Q12
**Answer:** A, B
**Explanation:** During forensic recovery, Time Travel provides: (A) the ability to query table states AT(TIMESTAMP => ...) before the exfiltration occurred, enabling reconstruction of what data was exposed and comparison with the current state; and (B) UNDROP TABLE capability for any tables the attacker dropped — tables remain accessible via Time Travel for the configured retention period. Cloning a database (D) is also useful but is typically an extension of A (clone the AS OF state for safe investigation).
**Source:** [Time Travel for Incident Response](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Time Travel allows querying historical table states (AT TIMESTAMP) and restoring dropped tables (UNDROP TABLE) during forensic recovery operations."

---

## Q13
**Answer:** C
**Explanation:** The recommended Snowflake-native approach for streaming ACCOUNT_USAGE data to Splunk is a scheduled Snowflake Task that periodically queries ACCOUNT_USAGE views for new records (using a watermark timestamp), copies them to an external stage, and Splunk's S3 input connector ingests from that stage. This is reliable, doesn't require streaming infrastructure, and works with ACCOUNT_USAGE's existing latency model. Streams cannot be created on ACCOUNT_USAGE views. Notification integrations are for event-driven point notifications, not data streaming.
**Source:** [SIEM Integration with Snowflake](https://docs.snowflake.com/en/user-guide/tasks-intro)
**Quote:** "Use scheduled tasks to regularly extract ACCOUNT_USAGE data to external stages for ingestion by SIEM tools like Splunk."

---

## Q14
**Answer:** A
**Explanation:** For a service account with username/password authentication and leaked credentials: disable the user immediately to stop all authentication attempts; investigate LOGIN_HISTORY for recent logins from the compromised credentials; rotate the credentials (set a new password); then enforce MFA before re-enabling the account. Without MFA, even with a new password, the account remains vulnerable to future credential leaks. Dropping the user (B) loses grant history; rotating only (C) allows continued attacks until rotation completes.
**Source:** [Credential Compromise Response](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Disable the compromised account immediately, rotate credentials, enforce MFA, then re-enable. Investigate LOGIN_HISTORY to assess the scope of unauthorized access."

---

## Q15
**Answer:** B
**Explanation:** Snowflake does not have a built-in CASCADE operation for revoking all grants made BY a specific role. The ACCOUNTADMIN must use GRANTS_TO_ROLES to identify all grants where GRANTED_BY matches the compromised role's session user, then systematically revoke each one. DROP ROLE SYSADMIN CASCADE (D) would remove the SYSADMIN system role entirely — which would break the account. REVOKE ALL PRIVILEGES ON ALL OBJECTS (C) removes SYSADMIN's own privileges but doesn't address what SYSADMIN granted to others.
**Source:** [GRANTS_TO_ROLES for Forensic Analysis](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "Use GRANTS_TO_ROLES filtered by GRANTED_BY to identify all grants made by a specific user/role during a compromise, then systematically revoke them."

---

## Q16
**Answer:** B
**Explanation:** An aggregation policy restricts direct row-level data access — when the querying role cannot produce individual row results because the aggregation policy requires aggregated output. This is the appropriate control when a role should be able to compute statistical summaries (SUM, AVG, COUNT) but should not be able to see individual records that could be used for exfiltration. A masking policy (A) hides values but doesn't prevent row-level access. Row-access policies (option A is masking) filter rows but don't force aggregation.
**Source:** [Aggregation Policies](https://docs.snowflake.com/en/user-guide/aggregation-policies)
**Quote:** "Aggregation policies restrict direct row-level access, requiring queries to aggregate data — preventing bulk row retrieval that could enable exfiltration."

---

## Q17
**Answer:** A, B
**Explanation:** For directly mitigating "uncontrolled use of ACCOUNTADMIN role": (A) creating a custom admin role with only required privileges and revoking ACCOUNTADMIN from day-to-day usage directly reduces ACCOUNTADMIN exposure — this is the primary control; (B) requiring MFA for SYSADMIN and higher roles adds an authentication barrier that makes credential-based exploitation of those roles harder, even if the credentials are leaked. Network policies (C) restrict network access but don't prevent legitimate ACCOUNTADMIN misuse.
**Source:** [ACCOUNTADMIN Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Reduce ACCOUNTADMIN risk by creating scoped custom roles for day-to-day operations and requiring MFA for all privileged roles."

---

## Q18
**Answer:** B
**Explanation:** SCIM security integrations are created via CREATE SECURITY INTEGRATION ... TYPE = SCIM. These DDL operations are recorded in ACCOUNT_USAGE.QUERY_HISTORY with QUERY_TYPE = 'CREATE_SECURITY_INTEGRATION' or query_text containing 'CREATE SECURITY INTEGRATION'. An attacker creating a backdoor SCIM integration would appear as such a query. GRANTS_TO_ROLES doesn't record SCIM integration creation events. LOGIN_HISTORY shows login events, not integration creation.
**Source:** [QUERY_HISTORY for Security Events](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Security integration creation events appear in QUERY_HISTORY, enabling detection of unauthorized SCIM or OAuth integration creation."

---

## Q19
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY provides column-level access granularity via the BASE_OBJECTS_ACCESSED JSON array. Each entry in this array includes the object name, schema, database, and a COLUMNS sub-array listing the specific column names that were accessed. This enables forensic analysis of exactly which columns of a sensitive table were read by a compromised role — critical for assessing breach scope at the field level. QUERY_HISTORY contains the SQL text but doesn't provide structured column-level metadata.
**Source:** [ACCESS_HISTORY Column-Level Detail](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY's BASE_OBJECTS_ACCESSED array includes column-level detail, recording which specific columns were accessed in each query."

---

## Q20
**Answer:** A, B
**Explanation:** For detecting a CREATE TABLE AS SELECT (CTAS) exfiltration pattern: (A) ACCESS_HISTORY shows which source tables were read (READ operation recorded for the source sensitive tables), confirming the data source; (B) QUERY_HISTORY contains the actual CTAS SQL statement (CREATE TABLE AS SELECT) and subsequent COPY INTO commands, showing the full attack sequence. These two views together provide both the data access record (A) and the DDL/DML operation record (B) needed to reconstruct the complete exfiltration chain.
**Source:** [ACCOUNT_USAGE for Exfiltration Detection](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCESS_HISTORY captures data reads; QUERY_HISTORY captures DDL and DML operations — combine both to reconstruct complex exfiltration attack chains."

---

## Q21
**Answer:** A, C
**Explanation:** The two strongest indicators of exfiltration in QUERY_HISTORY: (A) Queries selecting from PII-tagged tables by a role that normally doesn't access them — anomalous access patterns by unexpected roles are a strong exfiltration indicator; and (C) COPY INTO @external_stage statements executed outside business hours — direct data transfer to external storage, especially off-hours, is the most definitive exfiltration signal. SHOW GRANTS (B) is reconnaissance, not exfiltration. USE ROLE ACCOUNTADMIN (D) is privilege escalation, not data exfiltration.
**Source:** [Exfiltration Detection Patterns](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Key exfiltration indicators: anomalous table access by unexpected roles, and COPY INTO external stage operations especially outside business hours."

---

## Q22
**Answer:** A
**Explanation:** A Snowflake Alert with a condition query on ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE ROLE = 'ACCOUNTADMIN' and CREATED_ON > (last evaluation time), set to run on a schedule, provides near-real-time detection of unauthorized ACCOUNTADMIN grants. When the condition returns rows (new ACCOUNTADMIN grants since last check), the alert fires a notification integration. This is more reliable than a row-access policy (which blocks visibility, not the grant) or a scheduled task (less elegant than a native Alert object).
**Source:** [Snowflake Alerts for Privilege Monitoring](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Snowflake Alerts on GRANTS_TO_ROLES provide near-real-time notification when sensitive role grants like ACCOUNTADMIN are made."

---

## Q23
**Answer:** A
**Explanation:** For auditing changes to data masking policies, ACCOUNT_USAGE.QUERY_HISTORY filtered on query_text LIKE '%MASKING POLICY%' captures all DDL operations: CREATE MASKING POLICY, ALTER MASKING POLICY, DROP MASKING POLICY, and ALTER TABLE ... SET/UNSET MASKING POLICY. The USER_NAME and ROLE_NAME fields identify who made the changes. This is the correct audit trail for masking policy change history. POLICY_REFERENCES (B) shows current assignments, not change history.
**Source:** [QUERY_HISTORY for Policy Auditing](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Masking policy DDL operations appear in QUERY_HISTORY — filter on query_text LIKE '%MASKING POLICY%' to audit all policy changes."

---

## Q24
**Answer:** B
**Explanation:** To assess blast radius after a SYSADMIN credential compromise, querying GRANTS_TO_ROLES to show all objects owned by SYSADMIN (where PRIVILEGE = 'OWNERSHIP' and GRANTED_TO = 'SYSADMIN') combined with SHOW GRANTS TO ROLE SYSADMIN enumerates all objects and privileges accessible to SYSADMIN. This reveals the complete set of objects the attacker could have modified. QUERY_HISTORY filtered by role (A) shows queries run but not the full scope of accessible objects.
**Source:** [Blast Radius Assessment](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "Use GRANTS_TO_ROLES to enumerate all OWNERSHIP grants and privileges of a compromised role, determining the full blast radius of a credential compromise."

---

## Q25
**Answer:** B
**Explanation:** SYSTEM$ABORT_SESSION(session_id) allows surgical termination of a specific session by its session_id without affecting the legitimate user's account or other sessions. This is the appropriate response to suspected session token replay: identify the suspicious session_id in ACCOUNT_USAGE.SESSIONS or SHOW SESSIONS (matching the suspicious client IP), then abort that specific session. Disabling the user (A) terminates all sessions including the legitimate one. Network policies (C) block future connections but don't terminate existing sessions.
**Source:** [SYSTEM$ABORT_SESSION](https://docs.snowflake.com/en/sql-reference/functions/system_abort_session)
**Quote:** "SYSTEM$ABORT_SESSION(session_id) terminates a specific active session — enabling targeted revocation of compromised sessions without affecting legitimate sessions."

---

## Q26
**Answer:** B
**Explanation:** Failover (promoting a secondary account to primary) requires the ACCOUNTADMIN role in the target (secondary) account. The failover operation — ALTER FAILOVER GROUP ... PRIMARY — is an account-level operation that modifies the replication group's primary designation, which requires top-level administrative authority. SYSADMIN manages database objects but cannot perform account-level failover operations. SECURITYADMIN manages security configurations but not failover.
**Source:** [Failover Operations](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "Performing a failover to promote a secondary account requires the ACCOUNTADMIN role in the secondary account."

---

## Q27
**Answer:** A, C
**Explanation:** The most sensitive reconnaissance SHOW commands: (A) SHOW GRANTS TO ROLE SYSADMIN reveals the complete privilege map — every database, schema, table, warehouse, and integration that SYSADMIN can access, enabling the attacker to plan targeted data theft; and (C) SHOW NETWORK POLICIES reveals the IP allowlists currently configured, exposing trusted IP ranges that the attacker could spoof or use to understand the network security posture. SHOW DATABASES (B) and SHOW WAREHOUSES (D) reveal structure but are less sensitive.
**Source:** [Reconnaissance Risk Assessment](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "SHOW GRANTS reveals privilege landscape; SHOW NETWORK POLICIES exposes trusted IP ranges — both critical for attacker reconnaissance."

---

## Q28
**Answer:** B
**Explanation:** Dormant user accounts (180+ days without login) represent a significant security risk: their credentials may be compromised without detection, and they retain all their role assignments and data access. The appropriate risk treatment is to disable or drop these accounts and revoke their role assignments (reducing privilege sprawl). Applying row-access policies (A) or session policies (D) to dormant accounts doesn't address the fundamental risk of active but unused credentials.
**Source:** [Access Control Hygiene](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Disable or remove dormant user accounts to reduce the attack surface from inactive but potentially compromised credentials."

---

## Q29
**Answer:** B
**Explanation:** MFA reduces but does not eliminate the risk from leaked credentials. Even with MFA enabled, a threat actor can bypass MFA through: phishing (social engineering the MFA code or enrolling a new device), session token theft (stealing the session cookie post-authentication), or device compromise (accessing the MFA app on a compromised device). Therefore, even when credentials are found in a breach database, the credentials must be rotated regardless of MFA status. Disabling and notifying the user is the correct response.
**Source:** [MFA and Credential Security](https://docs.snowflake.com/en/user-guide/security-mfa)
**Quote:** "MFA mitigates but does not eliminate credential risks. Breached credentials must be rotated even when MFA is enabled, as MFA can be bypassed through phishing or device compromise."

---

## Q30
**Answer:** A
**Explanation:** A comprehensive external stage creation incident response workflow: (1) detect via QUERY_HISTORY (LIKE '%CREATE STAGE%') to identify unauthorized stage creation; (2) correlate with ACCESS_HISTORY to determine what data was accessed and written through the stage; (3) containment: drop the unauthorized stage and revoke USAGE on external storage integrations from non-admin roles to prevent future unauthorized stage creation. This covers detection, investigation, and remediation in sequence.
**Source:** [Incident Response for Data Exfiltration](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Detect unauthorized stage creation via QUERY_HISTORY, assess data accessed via ACCESS_HISTORY, then contain by dropping unauthorized stages and revoking integration privileges."

---

## Q31
**Answer:** B
**Explanation:** Snowflake Failover Groups support cross-region and cross-cloud disaster recovery. When a primary account is unavailable (e.g., during a ransomware incident or regional outage), an ACCOUNTADMIN can promote the secondary account to primary using ALTER FAILOVER GROUP ... PRIMARY. This requires Snowflake Business Critical edition and a pre-configured failover group with a secondary account in the target region. Time Travel (A) is for data recovery within a single account, not cross-region DR.
**Source:** [Failover Groups](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "Failover Groups enable cross-region and cross-cloud account failover for disaster recovery scenarios."

---

## Q32
**Answer:** B
**Explanation:** SNOWFLAKE.INFORMATION_SCHEMA.ACCESS_HISTORY is the near-real-time version of ACCESS_HISTORY with minimal latency (typically minutes) and 14-day retention. When an incident is actively unfolding and the engineer needs access information from the past few hours (within ACCOUNT_USAGE's 3-hour latency window), INFORMATION_SCHEMA.ACCESS_HISTORY provides the near-real-time data needed. ACCOUNT_USAGE.ACCESS_HISTORY (A) may not yet have the most recent records due to latency.
**Source:** [INFORMATION_SCHEMA.ACCESS_HISTORY](https://docs.snowflake.com/en/sql-reference/info-schema/access_history)
**Quote:** "INFORMATION_SCHEMA.ACCESS_HISTORY provides near-real-time access data with minimal latency, suitable for active incident investigations."

---

## Q33
**Answer:** A, B
**Explanation:** Trust Center's Leaked Credentials scanner (A) directly identifies users whose Snowflake credentials appear in known breach databases — the immediate threat from the third-party data breach; and Security Essentials (B) provides a comprehensive security posture assessment that may reveal additional weaknesses to address as part of the incident response (missing MFA, network policy gaps, over-privileged accounts that could be exploited using the breached credentials). Compliance Center (C) is for regulatory certification review, not incident response.
**Source:** [Trust Center Scanners](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Leaked Credentials scanner identifies affected users; Security Essentials identifies additional weaknesses that may be exploitable with compromised credentials."

---

## Q34
**Answer:** A
**Explanation:** Containment actions for unauthorized external stage: (1) drop the unauthorized stage immediately to prevent further data writes; (2) revoke USAGE on the storage integration used (to prevent other users from creating stages to that S3 location); (3) investigate ACCESS_HISTORY to determine scope — which tables/columns were accessed and how much data was copied. These three steps constitute containment, followed by scope assessment. Notifying the cloud provider may be appropriate if the bucket is unknown.
**Source:** [Unauthorized Stage Containment](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Drop unauthorized stages, revoke related integration privileges, and investigate ACCESS_HISTORY to determine the scope of data exported."

---

## Q35
**Answer:** C
**Explanation:** The most comprehensive filter for masking policy changes combines multiple DDL patterns: query_text ILIKE '%APPLY MASKING POLICY%' (attaching/detaching policy to a column via ALTER TABLE), ILIKE '%ALTER MASKING POLICY%' (modifying the policy definition), and ILIKE '%CREATE MASKING POLICY%' (creating new policies). Using OR between these patterns captures all masking policy lifecycle events. Option A (query_type = 'ALTER' LIKE '%MASKING POLICY%') is narrower and misses CREATE/DROP events.
**Source:** [Masking Policy DDL Audit](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Query QUERY_HISTORY with multiple ILIKE patterns to capture all masking policy lifecycle events: CREATE, ALTER, and APPLY/UNSET operations."

---

## Q36
**Answer:** B
**Explanation:** Unexpectedly high warehouse credit consumption with no scheduled workloads running is a strong indicator of unauthorized activity. The investigative step is to query QUERY_HISTORY filtered by warehouse_name and the anomalous time window to identify the specific queries consuming the credits. This reveals which users, roles, and SQL statements caused the spike. If the queries are not from authorized ETL jobs and are scanning large amounts of data, this confirms unauthorized workload execution.
**Source:** [Anomalous Credit Consumption](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Query QUERY_HISTORY filtered by warehouse and time window to identify unexpected queries during credit consumption anomalies."

---

## Q37
**Answer:** A
**Explanation:** The most efficient query for reviewing ACCOUNTADMIN's DDL and privilege-changing actions: filter QUERY_HISTORY on ROLE_NAME = 'ACCOUNTADMIN', QUERY_TYPE IN ('CREATE', 'DROP', 'ALTER', 'GRANT', 'REVOKE'), and START_TIME within the 7-day window. This surfaces all DDL operations and privilege changes executed under ACCOUNTADMIN in the review period. ACCESS_HISTORY (B) shows data access, not DDL. GRANTS_TO_ROLES (D) shows current state, not weekly changes.
**Source:** [ACCOUNTADMIN Activity Review](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "Filter QUERY_HISTORY by ROLE_NAME = 'ACCOUNTADMIN' and DDL query types to review all administrative actions taken under that role."

---

## Q38
**Answer:** A
**Explanation:** For CI/CD pipeline credentials, the optimal security posture is: (1) key-pair authentication (not passwords) for the service account, eliminating the risk of password-based credential stuffing; (2) 90-day key rotation using RSA_PUBLIC_KEY_2 without disrupting pipeline execution; (3) a network policy restricting the service account to the CI/CD server's known IP range. This three-layer defense (auth method + rotation + network) provides defense-in-depth. Granting SYSADMIN (C) violates least-privilege.
**Source:** [CI/CD Security Best Practices](https://docs.snowflake.com/en/user-guide/key-pair-auth)
**Quote:** "Use key-pair authentication for CI/CD service accounts with regular key rotation and network policies restricting access to known CI/CD infrastructure IPs."

---

## Q39
**Answer:** A, B
**Explanation:** Data sharing threat vectors: (A) a compromised consumer account represents the highest risk — if the consumer is breached, the attacker gains access to all shared data that the consumer account can query; (B) misconfigured secure views (e.g., missing WHERE clause, exposing more columns than intended) could inadvertently expose more data than the provider intended. Time Travel in shared data (D) is actually not available to consumers — they access only the current state.
**Source:** [Data Sharing Security](https://docs.snowflake.com/en/user-guide/data-sharing-intro)
**Quote:** "Consumer account compromise and misconfigured secure views are the highest-risk data sharing threats."

---

## Q40
**Answer:** A
**Explanation:** The best Snowflake-native ransomware recovery capability: Time Travel (for restoring data to a pre-attack state within the retention window), Fail-safe (for 7-day post-Time-Travel recovery via Snowflake Support), and Replication to a secondary account in a separate cloud region (so a regional ransomware event affecting the primary doesn't compromise the secondary). Together, these provide both on-account and cross-region recovery options. Masking policies (B) protect data access, not ransomware recovery. TSS (C) controls encryption but doesn't enable recovery.
**Source:** [Business Continuity with Snowflake](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "Time Travel + Fail-safe + cross-region replication provides the most comprehensive ransomware recovery capability."

---

## Q41
**Answer:** B
**Explanation:** For impossible travel (two concurrent sessions from distant IPs): immediate action is to disable the user account to stop all authentication and new connections while the investigation proceeds. Do not merely monitor (A) — an active attacker should be stopped. Investigating both active sessions via ACCOUNT_USAGE.SESSIONS identifies which IP is suspicious (compare against LOGIN_HISTORY for the user's normal access patterns). Applying a network policy (C) would block one of the two IPs but may block the legitimate user.
**Source:** [Impossible Travel Response](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Disable the user immediately when impossible travel is detected and investigate active sessions to identify the compromised connection."

---

## Q42
**Answer:** A
**Explanation:** Creating an ACCESS_HISTORY-based Snowflake Alert that checks for queries returning more than 1 million rows from PII-tagged tables is the most targeted approach. The alert condition queries ACCESS_HISTORY for large ROWS_PRODUCED values against PII tables, and the alert action calls SYSTEM$ABORT_SESSION to terminate the session. A row-access policy (B) would limit results but cannot target 1M rows specifically. Aggregation policies (C) force aggregation but don't abort sessions. Resource monitors (D) track credits, not row counts.
**Source:** [Automated Threat Response](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Snowflake Alerts can trigger SYSTEM$ABORT_SESSION actions based on ACCOUNT_USAGE conditions, enabling automated threat response."

---

## Q43
**Answer:** A
**Explanation:** CREATE INTEGRATION privilege is high-risk because it allows the grantee to create security integrations (SAML2, SCIM, OAuth), storage integrations (connecting to S3/Azure/GCS), external access integrations (outbound network connections), and API integrations. These represent potential exfiltration channels, authentication bypasses, and identity provider modifications. Non-admin roles with CREATE INTEGRATION could create unauthorized data exfiltration pathways. Revoking this from non-admin roles is the correct remediation.
**Source:** [CREATE INTEGRATION Privilege Risk](https://docs.snowflake.com/en/sql-reference/sql/create-integration)
**Quote:** "CREATE INTEGRATION allows creation of storage and external access integrations that can serve as data exfiltration channels. Restrict this privilege to dedicated admin roles."

---

## Q44
**Answer:** A
**Explanation:** Defense-in-depth for a SQL injection vulnerability in a Snowflake Streamlit app: (1) parameterized queries/bind variables prevent injection at the application layer; (2) row-access policies on sensitive tables ensure that even if injection succeeds, the attacker's role can only see authorized rows; (3) least-privilege for the app's Snowflake role limits the blast radius to only the tables the app legitimately needs to access. These three layers work independently so that one layer's failure doesn't result in complete compromise.
**Source:** [Defense in Depth for Snowflake Apps](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)
**Quote:** "Defense-in-depth for Streamlit apps combines parameterized queries (app layer), row-access policies (data layer), and least-privilege roles (access control layer)."

---

## Q45
**Answer:** A, B
**Explanation:** A malicious Native App provider could exfiltrate data via: (A) external access integrations — these allow outbound network calls from within the app to external APIs, potentially sending consumer data to attacker-controlled endpoints; (B) stored procedures with EXECUTE AS OWNER — these run with the application's owner role privileges, which could include access to consumer data that the consumer didn't intend to expose. UI-based Streamlit display (C) and SHOW WAREHOUSES (D) are low-risk activities.
**Source:** [Native App Security Risks](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)
**Quote:** "External access integrations and EXECUTE AS OWNER stored procedures represent the primary data exfiltration risks in Native Apps."

---

## Q46
**Answer:** B
**Explanation:** A Snowflake Alert querying ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE ROLE = 'ACCOUNTADMIN' evaluates on a schedule and fires when new ACCOUNTADMIN grants appear (grants created since the last evaluation). This provides near-real-time detection of unauthorized ACCOUNTADMIN grants. The alert can fire a notification integration to reach the security team. SESSIONS and LOGIN_HISTORY don't capture grant events. ACCESS_HISTORY captures data access, not privilege grants.
**Source:** [Privilege Escalation Detection](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Monitor GRANTS_TO_ROLES with Snowflake Alerts to detect when privileged roles like ACCOUNTADMIN are newly granted to users."

---

## Q47
**Answer:** A
**Explanation:** To revoke a compromised RSA key pair: (1) ALTER USER compromised_user UNSET RSA_PUBLIC_KEY removes the compromised public key from the user account, immediately invalidating all sessions using that key pair; (2) generate a new RSA key pair client-side; (3) ALTER USER compromised_user SET RSA_PUBLIC_KEY = '<new_public_key>' registers the new public key. The private key is stored client-side and never transmitted to Snowflake, so Snowflake Support cannot revoke it directly.
**Source:** [Key Pair Authentication Management](https://docs.snowflake.com/en/user-guide/key-pair-auth)
**Quote:** "Remove a compromised key with ALTER USER ... UNSET RSA_PUBLIC_KEY, then register the new public key with ALTER USER ... SET RSA_PUBLIC_KEY."

---

## Q48
**Answer:** A
**Explanation:** ACCOUNT_USAGE.GRANTS_TO_ROLES is specifically designed for privilege grant auditing. It contains: the role granted to, the privilege type, the object type, the object name, the grantor (GRANTED_BY), and critically the created_on (when the grant was made) and deleted_on (when it was revoked) timestamps. Filtering by the quarter's date range and examining GRANTED_BY provides complete evidence of who authorized which privilege grants — directly answering the compliance question.
**Source:** [GRANTS_TO_ROLES for Compliance](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "GRANTS_TO_ROLES with created_on, deleted_on, and granted_by fields provides the historical record of privilege grant decisions for compliance auditing."

---

## Q49
**Answer:** A
**Explanation:** For a compromised OAuth integration (client secret exposed), the most targeted first containment action is to revoke or rotate the client secret by altering or dropping the OAuth security integration. This immediately invalidates all tokens issued under the compromised secret, preventing further use by the attacker. Disabling all OAuth integrations (B) causes broader service disruption. Removing the role (D) may not immediately invalidate existing tokens.
**Source:** [OAuth Security Incident Response](https://docs.snowflake.com/en/user-guide/oauth-custom)
**Quote:** "Revoke the OAuth integration's client secret to immediately invalidate all tokens issued under the compromised credentials."

---

## Q50
**Answer:** B
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY includes the ROLE_NAME column which reflects the active role for each individual query in the session. When a user switches roles during a session (USE ROLE), subsequent queries show the new role_name. By querying QUERY_HISTORY for a specific session_id filtered to the suspicious period, the engineer can see the complete sequence of role activations and the queries executed under each role, reconstructing the exact privilege usage timeline.
**Source:** [QUERY_HISTORY ROLE_NAME Column](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "QUERY_HISTORY's ROLE_NAME column reflects the active role for each query, enabling reconstruction of role activation sequences within a session."

---

## Q51
**Answer:** A, B
**Explanation:** To extend ACCOUNT_USAGE audit log retention beyond 365 days: (A) configure a Snowflake Task to periodically INSERT new ACCOUNT_USAGE records into a dedicated long-retention audit table (no expiration limit) in a governance database; and (B) export ACCOUNT_USAGE data monthly to a Snowflake-managed external stage (S3/Azure/GCS) for long-term archival. Both options preserve the data beyond ACCOUNT_USAGE's 365-day window. Increasing Time Travel (C) on ACCOUNT_USAGE tables is not possible. Replication replicates the 365-day view, not extends it.
**Source:** [Long-Term Audit Retention](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "Extend ACCOUNT_USAGE retention beyond 365 days by using scheduled tasks to copy records to long-retention tables or export to external storage."

---

## Q52
**Answer:** A
**Explanation:** Tri-Secret Secure creates a composite encryption key from Snowflake's managed key AND the customer's key (held in AWS KMS, Azure Key Vault, or GCP KMS). When decrypting data, Snowflake must use both components. If the customer revokes or disables their key in the external KMS, Snowflake cannot form the composite key and therefore cannot decrypt any data — not even Snowflake's own engineers or infrastructure can access it. This provides cryptographic protection against insider threats at the platform level.
**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "Tri-Secret Secure's composite key design means that revoking the customer-managed key prevents Snowflake from decrypting data — even Snowflake employees cannot access it."

---

## Q53
**Answer:** A
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY's BYTES_SCANNED and ROWS_PRODUCED columns provide indicators of large result downloads. Filtering for queries by the suspect user (especially those with large ROWS_PRODUCED) identifies queries that produced large result sets potentially downloaded via SnowSQL GET or result fetching. While not a direct download log, large ROWS_PRODUCED combined with client_application_id = 'SnowSQL' suggests local data retrieval. DATA_TRANSFER_HISTORY tracks network transfer metrics, not specific query downloads.
**Source:** [QUERY_HISTORY for Data Access Monitoring](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "QUERY_HISTORY's ROWS_PRODUCED and BYTES_SCANNED metrics help identify queries that produced large result sets potentially downloaded to client machines."

---

## Q54
**Answer:** A
**Explanation:** Snowflake Time Travel enables read-only access to historical table states. For DDL recovery after an attacker has made schema changes: use CREATE TABLE recovery_table CLONE affected_table AT(TIMESTAMP => '<before_attack>') to restore data to the pre-attack state, then swap the restored table in. For dropped objects, UNDROP TABLE, UNDROP SCHEMA, and UNDROP DATABASE restore dropped objects within the retention window. SYSTEM$ROLLBACK_TRANSACTION only works within an open transaction (not after commit).
**Source:** [Time Travel for Recovery](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Use Time Travel AT(TIMESTAMP) to clone tables to their pre-attack state; use UNDROP to restore dropped objects within the Time Travel retention period."

---

## Q55
**Answer:** A, B
**Explanation:** Credential stuffing attacks use lists of breached username/password pairs to authenticate. Two controls directly mitigate this: (A) MFA enforcement via authentication policies — even with a valid password, the attacker cannot complete authentication without the second factor (which they don't possess); and (B) network policies restricting to known corporate IP ranges — credential stuffing typically comes from bot networks using non-corporate IPs, so IP allowlisting blocks attacks from unknown sources. Tri-Secret Secure (C) protects stored data, not authentication.
**Source:** [Credential Stuffing Mitigations](https://docs.snowflake.com/en/user-guide/security-mfa)
**Quote:** "MFA enforcement and IP-based network policies are the primary controls against credential stuffing attacks on Snowflake accounts."

---

## Q56
**Answer:** A
**Explanation:** For a 3-month unauthorized vendor access incident, querying ACCESS_HISTORY for the vendor's Snowflake user filtered by the date range provides: the specific tables accessed, the specific columns within those tables (via BASE_OBJECTS_ACCESSED), the queries executed, and the timestamps. This column-level access record is the essential evidence for assessing PII exposure scope, determining breach notification requirements, and documenting the incident for regulatory purposes.
**Source:** [ACCESS_HISTORY for Breach Assessment](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY provides column-level access records essential for breach scope assessment and regulatory notification requirements."

---

## Q57
**Answer:** A
**Explanation:** Break-glass ACCOUNTADMIN procedures should be: (1) a dedicated user not used in normal operations; (2) protected by a network policy restricting access to the jump host IP only — preventing use from non-authorized locations; (3) stored in a secure secrets vault for emergency access; (4) monitored with a Snowflake Alert on LOGIN_HISTORY that fires when this user logs in, notifying the security team of any break-glass usage. This combination ensures the break-glass account is only usable when appropriate and all usage is immediately visible.
**Source:** [Break-Glass Procedures](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Break-glass accounts should have network policy restrictions, secure credential storage, and immediate alerting on any login events."

---

## Q58
**Answer:** B
**Explanation:** Repeated high-frequency SHOW TABLES, SHOW COLUMNS, and SELECT COUNT(*) queries represent schema reconnaissance — an attacker mapping the database structure to identify valuable data targets. This is not bulk data exfiltration (A) or privilege escalation (C). The appropriate detection is monitoring QUERY_HISTORY for high-frequency SHOW commands and SELECT COUNT queries from the shared consumer role. The appropriate response is investigating the consumer's intent and applying stricter access controls.
**Source:** [Reconnaissance Detection](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "High-frequency SHOW and SELECT COUNT queries from a shared consumer role indicate schema reconnaissance — a precursor to targeted data theft."

---

## Q59
**Answer:** A
**Explanation:** The correct security posture is to create a dedicated pipeline service role with only the privileges needed for the legitimate data pipeline, restrict that role to the pipeline server's IP via a network policy, and allow data engineers to activate that role via secondary role when needed for pipeline work. This applies least-privilege without blocking legitimate use. Relying solely on post-hoc alerts (B) is reactive. STAGES masking (C) is not a useful control. Tri-Secret Secure (D) doesn't audit external stage writes.
**Source:** [Least Privilege for Pipeline Roles](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Create dedicated service roles for data pipeline operations with IP-restricted network policies, minimizing the blast radius of potential credential compromise."

---

## Q60
**Answer:** A, B
**Explanation:** SECURITYADMIN with OWNERSHIP on production databases creates two risks: (A) SECURITYADMIN with OWNERSHIP can transfer ownership, potentially giving themselves or others full control of production data assets — mitigated by transferring OWNERSHIP to dedicated object-owner roles; and (B) SECURITYADMIN can grant themselves data access, creating a conflict between security administration and data access control — mitigated by separating OWNERSHIP from SECURITYADMIN into dedicated custodian roles. These address the dual risk of privilege concentration.
**Source:** [Separation of Duties for SECURITYADMIN](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Separate OWNERSHIP from security administration to maintain separation of duties and prevent self-granting of data access privileges."

---

## Q61
**Answer:** B
**Explanation:** ACCOUNT_USAGE.GRANTS_TO_ROLES provides the full historical record of role grants including: created_on (when the grant was made), deleted_on (when it was revoked — NULL if still active), the role name, the grantee, and the grantor. Filtering WHERE ROLE = '<role_name>' AND CREATED_ON >= DATEADD(day, -30, ...) AND DELETED_ON IS NULL returns all active grants of that role made in the past 30 days. SHOW GRANTS OF ROLE (A) is a real-time snapshot with no historical data.
**Source:** [GRANTS_TO_ROLES Historical Analysis](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "GRANTS_TO_ROLES with created_on and deleted_on timestamps provides historical role grant data, enabling forensic analysis of role assignment changes."

---

## Q62
**Answer:** A
**Explanation:** PCI DSS continuous encryption evidence: (1) Snowflake's SOC 2 Type II and PCI DSS Report on Compliance (RoC) attest to AES-256 at-rest encryption; and (2) Tri-Secret Secure key rotation logs in the external KMS (AWS CloudTrail for KMS, Azure Key Vault audit logs, GCP Cloud Audit Logs) provide customer-controlled evidence of key management operations, demonstrating customer oversight of the encryption key lifecycle as required for PCI DSS. There is no ENCRYPTION_HISTORY view in Snowflake.
**Source:** [Snowflake PCI DSS Compliance](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "Snowflake's SOC 2 and PCI DSS reports attest to encryption; Tri-Secret Secure KMS audit logs provide customer-controlled key rotation evidence."

---

## Q63
**Answer:** A
**Explanation:** To recover data deleted by a malicious stored procedure within the Time Travel window: create a recovery table as SELECT * FROM target_table AT(TIMESTAMP => '<before_attack_timestamp>'), which reconstructs the pre-deletion state. Then swap (ALTER TABLE SWAP) the recovery table with the original. This is the correct self-service recovery workflow. UNDROP TABLE restores a DROPPED table, not a table where rows were deleted. FAIL-SAFE requires Snowflake Support and is for disaster recovery, not routine incident response. ROLLBACK only works for open transactions.
**Source:** [Time Travel for Data Recovery](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "CREATE TABLE AS SELECT ... AT(TIMESTAMP => ...) reconstructs the table to its pre-deletion state, enabling self-service recovery within the Time Travel window."

---

## Q64
**Answer:** A, B
**Explanation:** For threat hunting to identify backdoor user accounts: (A) query ACCOUNT_USAGE.USERS WHERE created_on > incident_start_time AND created_by != 'expected_admin' to find accounts created during the compromise window by unexpected principals; and (B) query ACCOUNT_USAGE.QUERY_HISTORY WHERE query_text ILIKE '%CREATE USER%' AND start_time > incident_start_time to find the actual CREATE USER SQL statements executed during the incident. Both together confirm creation events from multiple angles.
**Source:** [Threat Hunting for Backdoor Accounts](https://docs.snowflake.com/en/sql-reference/account-usage/users)
**Quote:** "Combine USERS view (for new account detection) with QUERY_HISTORY CREATE USER queries (for the creation event record) to hunt for attacker-created backdoor accounts."

---

## Q65
**Answer:** A
**Explanation:** To detect when masking policies are removed from columns, create a Snowflake Alert that queries ACCOUNT_USAGE.POLICY_REFERENCES to verify that expected column-policy associations still exist. If any expected association disappears (the row is no longer present for a column that should have a masking policy), the alert fires. This provides continuous compliance monitoring for masking policy integrity. Row-access policies (B) cannot block ALTER TABLE UNSET MASKING POLICY. Trust Center (C) doesn't monitor individual column-policy associations in real time.
**Source:** [Masking Policy Integrity Monitoring](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Monitor POLICY_REFERENCES with Snowflake Alerts to detect when masking policies are removed from protected columns."

---

## Q66
**Answer:** A
**Explanation:** Dynamic data masking on PII columns provides defense-in-depth against data leakage: even if a query executes and returns results to an unauthorized user, the PII fields are masked (returned as null, hash, or partial values per the policy). If masking was in place before the breach, the exfiltrated data contains only masked values — the attacker cannot recover plaintext PII. Network policies (B) might have prevented the connection but not query execution. Time Travel (C) cannot reverse already-exfiltrated data.
**Source:** [Dynamic Data Masking for Data Protection](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Dynamic data masking ensures that even successfully executed queries return only masked values for PII fields, protecting the actual data even in exfiltration scenarios."

---

## Q67
**Answer:** A
**Explanation:** External functions in Snowflake can call arbitrary external API endpoints. When an unauthorized external function calls an unapproved API, data passed to the function (including table values) can be exfiltrated to that endpoint. The risk is real and significant. Remediation: revoke CREATE EXTERNAL FUNCTION and USAGE ON API INTEGRATION from non-approved roles, and investigate QUERY_HISTORY for any invocations of the unauthorized function to assess scope. External functions are NOT read-only by design.
**Source:** [External Function Security](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)
**Quote:** "External functions can send data to arbitrary external endpoints. Restrict CREATE EXTERNAL FUNCTION and USAGE ON API INTEGRATION to prevent unauthorized data exfiltration."

---

## Q68
**Answer:** A
**Explanation:** Zero-copy cloning of production databases into a dedicated incident response Snowflake account (or isolated environment) enables realistic simulation exercises without affecting production. The clone is created at near-zero cost and immediately provides a fully functional copy of production data. Teams can run attack scenarios, test detection tools, and practice containment procedures against real data structures without risking production availability. Time Travel (B) would modify the production database.
**Source:** [Zero-Copy Cloning for Testing](https://docs.snowflake.com/en/user-guide/object-clone)
**Quote:** "Zero-copy cloning enables instant creation of production-identical environments for incident response exercises at minimal storage cost."

---

## Q69
**Answer:** A, B
**Explanation:** Under NIST CSF's "Detect" function: (A) Snowflake Alerts on ACCOUNT_USAGE views for anomalous access patterns directly implement continuous monitoring and detection capabilities; and (B) Trust Center's Security Essentials and Threat Intelligence scanners provide proactive threat detection and security posture monitoring. Dynamic data masking (C) and row-access policies (D) are "Protect" function controls — they prevent unauthorized access but don't detect security events.
**Source:** [NIST CSF and Snowflake](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Snowflake Alerts and Trust Center scanners implement the NIST CSF Detect function — providing continuous monitoring and anomaly detection."

---

## Q70
**Answer:** A
**Explanation:** When ACCOUNTADMIN denies performing suspicious GRANTs, investigating LOGIN_HISTORY for that ACCOUNTADMIN session provides the CLIENT_IP and CLIENT_APPLICATION_ID of the session. Cross-referencing with QUERY_HISTORY (filtered by the specific GRANT statements' timestamp and role_name = 'ACCOUNTADMIN') shows the IP and application of the session that executed those queries. If the IP or client application doesn't match the admin's known device profile, it supports the session hijacking hypothesis over insider action.
**Source:** [Session Attribution Analysis](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "Compare CLIENT_IP and CLIENT_APPLICATION from LOGIN_HISTORY against the suspected session's query pattern in QUERY_HISTORY to distinguish session hijacking from insider action."

---

## Q71
**Answer:** A
**Explanation:** An EXECUTE AS OWNER stored procedure owned by a compromised attacker's role (or inherited by a high-privilege role) that is accessible by PUBLIC remains a privilege escalation backdoor even after the attacker's session is terminated and account disabled. The procedure itself persists and can be called by any PUBLIC user to gain the owner's elevated privileges. The procedure must be dropped or altered to EXECUTE AS CALLER, and PUBLIC access must be explicitly revoked.
**Source:** [Stored Procedure Backdoor Remediation](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights)
**Quote:** "EXECUTE AS OWNER procedures owned by compromised roles remain privilege escalation backdoors after session termination. Drop or alter the procedure and revoke PUBLIC access."

---

## Q72
**Answer:** A
**Explanation:** Network rules configured to block all outbound connections (MODE = EGRESS) from Snowflake to external IPs, combined with restrictive EXTERNAL ACCESS INTEGRATION configurations (allowlisting only approved hosts), prevent data from leaving Snowflake via stored procedures, UDFs, and external functions. Note: COPY INTO external stage is controlled by storage integrations with ALLOWED_LOCATIONS; dynamic data masking (B) operates at query time, not at the storage layer; Tri-Secret Secure (C) controls encryption, not network exfiltration.
**Source:** [External Network Access Security](https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview)
**Quote:** "Configure network rules with MODE = EGRESS to block all outbound connections from Snowflake code, allowing only explicitly approved external access."

---

## Q73
**Answer:** A
**Explanation:** The detection chain for this insider threat: (1) ACCESS_HISTORY shows the source table reads — which sensitive tables and columns were accessed; (2) QUERY_HISTORY shows the CTAS (CREATE TABLE AS SELECT) statement creating the duplicate and the subsequent COPY INTO command exporting to external stage; (3) COPY_HISTORY confirms the external stage write operation, showing the destination, bytes written, and rows exported. This three-view chain reconstructs the complete attack sequence from read to duplicate to export.
**Source:** [Insider Threat Detection Chain](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCESS_HISTORY (reads) → QUERY_HISTORY (CTAS + COPY INTO) → COPY_HISTORY (external write confirmation) form the complete exfiltration detection chain."

---

## Q74
**Answer:** A
**Explanation:** The Snowflake-native pipeline for PagerDuty alerting: (1) Snowflake Alert evaluates the threat detection condition on ACCOUNT_USAGE views on a schedule; (2) when the condition fires, the alert triggers a Notification Integration (configured as SNS or webhook type pointing to a PagerDuty integration URL or SNS topic subscribed to PagerDuty); (3) PagerDuty receives the SNS notification or webhook POST and creates an incident. This uses three native Snowflake components: Alert + Notification Integration + external endpoint.
**Source:** [Snowflake Alerts + Notification Integrations](https://docs.snowflake.com/en/user-guide/notifications/notification-integrations)
**Quote:** "Snowflake Alerts trigger Notification Integrations (SNS or webhook) which can forward security events to PagerDuty or other incident management platforms."

---

## Q75
**Answer:** A, B
**Explanation:** Cryptomining abuse detection in Snowflake: (A) abnormally high warehouse credit consumption with no corresponding business output (queries produce no meaningful data) is the primary financial indicator; and (B) repeated warehouse AUTO_RESUME events outside business hours driven by queries with high compilation time but minimal data scanned suggest a workload designed for compute consumption rather than data processing — a pattern consistent with mining operations that use CPU compute cycles.
**Source:** [Compute Abuse Detection](https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history)
**Quote:** "Unexplained warehouse credit spikes and repeated auto-resume events outside business hours with compute-intensive but low-data queries are indicators of compute resource abuse."

---

## Q76
**Answer:** A
**Explanation:** For RTO 4 hours and RPO 1 hour: Replication Groups with continuous replication to a secondary account in another region achieve RPO in the range of minutes (near-continuous replication), well within the 1-hour target. A tested failover procedure (promoting secondary to primary, updating DNS/client redirect) should complete in under 4 hours for a well-prepared team. COPY INTO backups (B) achieve 1-hour RPO but RTO depends on data volume. Fail-safe (C) requires Snowflake Support and doesn't meet RTO/RPO targets.
**Source:** [Replication for Business Continuity](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "Continuous Replication Groups achieve RPO in minutes; tested failover procedures should meet RTO targets for business continuity."

---

## Q77
**Answer:** A
**Explanation:** IMPORTED PRIVILEGES on the SNOWFLAKE database grants a role access to all ACCOUNT_USAGE views — essentially equivalent to having a broad read-only view of all account metadata, query history, access history, user information, and audit logs. A data pipeline role with this privilege has unnecessary visibility into all account audit data. The remediation is to revoke IMPORTED PRIVILEGES and instead grant SELECT on only the specific ACCOUNT_USAGE views the pipeline legitimately needs. This is a least-privilege violation.
**Source:** [IMPORTED PRIVILEGES Security Risk](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#imported-privileges)
**Quote:** "IMPORTED PRIVILEGES on the SNOWFLAKE database grants full ACCOUNT_USAGE access. Revoke from non-admin roles and grant SELECT on specific views only."

---

## Q78
**Answer:** A
**Explanation:** The three-layer defense: (1) parameterized queries/bind variables in Streamlit prevent SQL injection at the application layer by separating code from data; (2) row-access policies on sensitive tables add a database-layer defense that filters unauthorized rows even if injection succeeds; (3) least-privilege for the Streamlit app's role limits the blast radius — if injection occurs, the attacker can only access tables the app role legitimately has access to. These layers work independently and multiplicatively.
**Source:** [Streamlit Security Best Practices](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)
**Quote:** "Defense-in-depth for Streamlit applications: parameterized queries (injection prevention) + row-access policies (data layer) + least-privilege role (scope limitation)."

---

## Q79
**Answer:** A
**Explanation:** SHOW FUTURE GRANTS IN DATABASE <db> and SHOW FUTURE GRANTS IN SCHEMA <schema> reveal all future grant definitions — privileges that will automatically be applied to new objects. If an attacker added FUTURE GRANTs during their access, these commands expose them. Overly broad future grants (e.g., GRANT SELECT ON FUTURE TABLES IN DATABASE to a public role) are the persistence mechanism. Revoking or narrowing them removes the automatic privilege escalation for new objects.
**Source:** [FUTURE GRANTS Security](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#future-grants-on-schema-objects)
**Quote:** "SHOW FUTURE GRANTS reveals automatic privilege grants that could serve as persistence mechanisms. Audit and revoke unauthorized future grants immediately."

---

## Q80
**Answer:** A, B
**Explanation:** Blue team detective controls before the exercise: (A) a Snowflake Alert on QUERY_HISTORY WHERE query_text ILIKE '%COPY INTO%@%' detects any COPY INTO external stage (data exfiltration); and (B) a Snowflake Alert on ACCOUNT_USAGE.USERS WHERE created_on is recent (within the exercise window) and the creator is not an expected admin detects backdoor user creation. Together, these cover both attack techniques specified for the red team exercise.
**Source:** [Purple Team Detection Coverage](https://docs.snowflake.com/en/user-guide/alerts)
**Quote:** "Alerts on QUERY_HISTORY (COPY INTO external stage detection) and USERS (new account detection) cover the primary exfiltration and persistence techniques."

---

## Q81
**Answer:** B
**Explanation:** An authentication policy with AUTHENTICATION_METHODS = ('KEYPAIR') restricts the affected users to key-pair authentication only — password-based connections are rejected. This is the correct Snowflake mechanism for enforcing key-pair-only authentication on service accounts. Assign the policy to service account users via ALTER USER ... SET AUTHENTICATION POLICY. This doesn't require disabling passwords separately — the policy enforces the restriction.
**Source:** [Authentication Policies - Key-Pair Enforcement](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Authentication policies with AUTHENTICATION_METHODS = ('KEYPAIR') restrict users to key-pair authentication, rejecting password-based connections."

---

## Q82
**Answer:** C
**Explanation:** Trust Center's Threat Intelligence scanner cross-references Snowflake LOGIN_HISTORY against threat intelligence databases to identify logins from known malicious IP addresses, indicators of compromise, and other active threat signals. This is precisely the intelligence that Threat Intelligence provides: real-time correlation with external threat feeds to identify if known bad actors are accessing the Snowflake account. Security Essentials (A) is for hygiene checking; the AI-generated recommendations (B) describe a different service.
**Source:** [Trust Center Threat Intelligence](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Threat Intelligence correlates Snowflake login activity against external threat intelligence databases to identify logins from known malicious IPs and compromise indicators."

---

## Q83
**Answer:** A
**Explanation:** The principle of least-privilege applied to service account segmentation: one service account per function with only the privileges needed for that function. The ingestion role has WRITE on raw schema (INSERT/COPY INTO); the transformation role has WRITE on transformed schema and READ on raw (for dbt); the dashboard role has READ only. Separate key pairs and network policies for each service account limit the blast radius — compromise of any one account cannot affect the other functions.
**Source:** [Service Account Segmentation](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Segment service accounts by function with dedicated roles and credentials. Compromise of a single service account should not affect other functions."

---

## Q84
**Answer:** A
**Explanation:** Immediate containment for unauthorized COPY INTO to unexpected S3 region: (1) drop the external stage used in the copy to prevent further writes; (2) revoke USAGE on the storage integration to prevent other users from creating stages to that region; (3) investigate ACCESS_HISTORY to determine which tables/columns were written (scope of exposure); (4) contact the S3 bucket owner if the destination is unknown to determine if the data can be retrieved/deleted. Tri-Secret Secure (D) cannot retroactively re-encrypt already-exported data.
**Source:** [External Stage Exfiltration Response](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "For unauthorized COPY INTO: drop the stage, revoke the integration, investigate scope via ACCESS_HISTORY, and engage the cloud provider if needed."

---

## Q85
**Answer:** D
**Explanation:** Snowflake allows setting minimum client version requirements at the account level via ALTER ACCOUNT SET MIN_CLIENT_SESSION_KEEP_ALIVE or related parameters. The closest available control for enforcing minimum SnowSQL version is setting MIN_SNOWSQL_VERSION at the account level (option D). This parameter, when set, rejects connections from SnowSQL clients older than the specified version. Session policies (A) don't have MIN_CLIENT_VERSION. Authentication policies (C) can restrict by client type but not by version.
**Source:** [Account Parameters for Client Control](https://docs.snowflake.com/en/sql-reference/parameters)
**Quote:** "Set minimum client version requirements at the account level to reject connections from outdated clients with known vulnerabilities."

---

## Q86
**Answer:** A, B
**Explanation:** HIPAA technical safeguards for access control: (A) RBAC with documented minimum necessary access and regular access reviews directly implements HIPAA's "minimum necessary" standard and access management requirement (164.312(a)(1)); (B) dynamic data masking on PHI columns protects against unauthorized disclosure by ensuring that even authorized users see only the minimum necessary data — those without clinical need see masked values (164.514(d) minimum necessary standard). These two controls together address both access authorization and data exposure minimization.
**Source:** [HIPAA Technical Safeguards with Snowflake](https://docs.snowflake.com/en/user-guide/security-certs)
**Quote:** "RBAC with minimum necessary access and dynamic data masking on PHI columns are core HIPAA technical safeguard implementations in Snowflake."

---

## Q87
**Answer:** A
**Explanation:** ACCOUNT_USAGE views are metadata views maintained by Snowflake's internal audit infrastructure. They are completely read-only for all account users — no customer can INSERT, UPDATE, DELETE, or DROP rows from ACCOUNT_USAGE views. The data is generated by Snowflake's internal logging system and cannot be modified or deleted by any account-level operation. The Security Engineer should communicate this to the incident response team: the audit logs are intact and trustworthy.
**Source:** [ACCOUNT_USAGE Immutability](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE views are read-only metadata views. No account user, including ACCOUNTADMIN, can modify or delete rows from these views."

---

## Q88
**Answer:** D
**Explanation:** Trust Center's Security Essentials scanner automatically checks MFA compliance for ACCOUNTADMIN and other high-privilege users, producing findings for users without MFA enabled. This automated, native approach requires no custom query construction and runs continuously. For the ongoing compliance check, D (Trust Center Security Essentials) is the most efficient approach. The manual JOIN query (A) works but requires ongoing maintenance. Option B (LOGIN_HISTORY with MFA filter) shows MFA usage per login, not enrollment status.
**Source:** [Trust Center Security Essentials - MFA Compliance](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "Security Essentials automatically identifies users with high-privilege roles who have not enrolled in MFA."

---

## Q89
**Answer:** A
**Explanation:** ACCOUNT_USAGE.GRANTS_TO_ROLES is the purpose-built view for historical grant tracking. Unlike SHOW GRANTS (which provides only a real-time snapshot), GRANTS_TO_ROLES includes: created_on (when the grant was made), deleted_on (when it was revoked — NULL if still active), GRANTED_BY (who made the grant), grantee_name, privilege, and object information. This 365-day historical record with full lifecycle information is the definitive source for answering "who granted access to what and when."
**Source:** [GRANTS_TO_ROLES Historical Analysis](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "GRANTS_TO_ROLES provides the full historical lifecycle of privilege grants including created_on, deleted_on, and granted_by — the definitive record for historical grant tracking."

---

## Q90
**Answer:** A
**Explanation:** Identifying unused privileges requires comparing what was GRANTED (GRANTS_TO_ROLES — all privileges granted to each role) against what was actually USED (ACCESS_HISTORY — objects actually accessed by queries under each role, and QUERY_HISTORY — actual queries executed under each role). Roles or privileges appearing in GRANTS_TO_ROLES but with zero appearances in ACCESS_HISTORY (no data access) and zero non-trivial queries in QUERY_HISTORY over 90 days are strong candidates for removal under the least-privilege principle.
**Source:** [Least-Privilege Audit Methodology](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "Compare GRANTS_TO_ROLES (all granted privileges) against ACCESS_HISTORY (actually exercised access) to identify unused privileges candidates for removal."
