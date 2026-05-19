# SEA-C01 Replacement Questions (Phase 3b-c)

Replaces: D1 Q34, D2 Q116, D4 Q22

---

## D1_REPLACEMENT (replaces Q34)

## Q34 (Single Answer)
Which Snowflake object type allows administrators to enforce password complexity requirements, minimum password age, maximum password age (expiration), and lockout policies for all users in the account?

- A) Session policy
- B) Password policy
- C) Authentication policy
- D) Network policy

**Answer:** B
**Explanation:** Snowflake password policies allow administrators to define: minimum/maximum password length, required character types (uppercase, digits, special characters), maximum password age (forcing expiration), minimum password age (preventing immediate re-use), and lockout settings (maximum failed attempts before lockout, lockout duration). This is separate from authentication policies (which control which authentication methods are allowed) and session policies (which control session timeouts). Password policies can be applied at the account or user level.
**Source:** [Password Policies](https://docs.snowflake.com/en/user-guide/password-policy)
**Quote:** "Password policies enable administrators to enforce password complexity, expiration, and lockout requirements for Snowflake users."

---

## D2_REPLACEMENT (replaces Q116)

## Q116 (Single Answer)
A Security Engineer needs to verify in near-real-time which masking policies are currently applied to columns in a specific Snowflake database. Which view provides this information with minimal latency?

- A) SNOWFLAKE.ACCOUNT_USAGE.POLICY_REFERENCES (up to 3-hour latency)
- B) INFORMATION_SCHEMA.POLICY_REFERENCES (near-real-time, current database scope)
- C) SNOWFLAKE.ACCOUNT_USAGE.MASKING_POLICY_REFERENCES
- D) SHOW MASKING POLICIES (shows policy definitions, not column assignments)

**Answer:** B
**Explanation:** For near-real-time masking policy assignment data, INFORMATION_SCHEMA.POLICY_REFERENCES is the correct choice. It provides current (near-real-time) data about which policies are attached to which columns within the current database, with minimal latency. ACCOUNT_USAGE.POLICY_REFERENCES (A) has up to 3-hour latency but covers all databases account-wide and retains historical data. SHOW MASKING POLICIES (D) lists policy definitions but not their column assignments. There is no MASKING_POLICY_REFERENCES in ACCOUNT_USAGE.
**Source:** [INFORMATION_SCHEMA.POLICY_REFERENCES](https://docs.snowflake.com/en/sql-reference/info-schema/policy_references)
**Quote:** "INFORMATION_SCHEMA.POLICY_REFERENCES provides near-real-time data about policy assignments within the current database context."

---

## D4_REPLACEMENT (replaces Q22)

## Q22 (Scenario)
A Security Engineer is conducting threat hunting and wants to detect when a new virtual warehouse is created by any user outside of the approved warehouse provisioning role (WAREHOUSE_ADMIN). This could indicate a compromised account attempting to provision compute resources for unauthorized workloads. Which query against ACCOUNT_USAGE BEST detects this pattern?

- A) SELECT * FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE = 'CREATE_WAREHOUSE' AND ROLE_NAME != 'WAREHOUSE_ADMIN' AND START_TIME > DATEADD(day, -7, CURRENT_TIMESTAMP())
- B) SELECT * FROM ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY WHERE WAREHOUSE_NAME NOT IN (SELECT WAREHOUSE_NAME FROM approved_warehouses)
- C) SELECT * FROM ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE PRIVILEGE = 'CREATE WAREHOUSE' AND GRANTEE_NAME != 'WAREHOUSE_ADMIN'
- D) SELECT * FROM SHOW WAREHOUSES WHERE OWNER != 'WAREHOUSE_ADMIN'

**Answer:** A
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY captures all DDL operations including CREATE WAREHOUSE with QUERY_TYPE = 'CREATE_WAREHOUSE'. Filtering for warehouses created by roles other than the approved WAREHOUSE_ADMIN role identifies unauthorized warehouse provisioning. This pattern catches: compromised accounts using CREATE WAREHOUSE privilege, privilege escalation where a role was improperly granted CREATE WAREHOUSE, and unauthorized resource provisioning for cryptomining or data exfiltration workloads. WAREHOUSE_METERING_HISTORY (B) detects usage, not creation. GRANTS_TO_ROLES (C) shows who has the privilege, not who used it.
**Source:** [QUERY_HISTORY DDL Auditing](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "CREATE WAREHOUSE operations appear in QUERY_HISTORY with QUERY_TYPE = 'CREATE_WAREHOUSE', enabling detection of unauthorized warehouse provisioning."
