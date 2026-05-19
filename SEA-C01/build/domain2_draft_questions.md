# Domain 2: Data Protection, Data Privacy, and Data Governance

---

## Q1 (Scenario)
A Security Engineer needs to ensure that credit card numbers stored in a TRANSACTIONS table are always masked (shown as XXXX-XXXX-XXXX-1234) for all analysts, but compliance officers using a specific role (COMPLIANCE_OFFICER) can see the full number. Which Snowflake feature should be used?
- A) A row-access policy filtering rows based on current role
- B) A Dynamic Data Masking policy that returns the full value when CURRENT_ROLE() = 'COMPLIANCE_OFFICER' and a masked value otherwise
- C) A projection policy hiding the column from analysts
- D) Column-level encryption with key access restricted to COMPLIANCE_OFFICER

---

## Q2 (Single Answer)
What Snowflake feature allows an organization to store data encrypted with a customer-managed key (CMK) in a cloud KMS, combined with Snowflake's own key, so that Snowflake cannot decrypt data if the CMK is revoked?
- A) Customer-managed encryption (CME)
- B) Tri-Secret Secure
- C) External Tokenization
- D) Client-side encryption

---

## Q3 (Scenario)
A data governance team needs to tag all columns containing PII across hundreds of tables in a Snowflake database without manually tagging each column. Which approach should be used?
- A) Create a Dynamic Data Masking policy and apply it to each column individually
- B) Use Snowflake's automatic data classification to assign system-defined tags (such as SEMANTIC_CATEGORY and PRIVACY_CATEGORY) to columns, then build tag-based masking policies on those tags
- C) Write a stored procedure that queries INFORMATION_SCHEMA.COLUMNS and applies row-access policies to every table
- D) Use GRANT APPLY TAG to the data governance role and manually run ALTER COLUMN ... SET TAG for each column

---

## Q4 (Single Answer)
Which Snowflake policy type hides an entire column from query result sets — even when the user has SELECT on the table — without masking the value?
- A) Dynamic Data Masking policy
- B) Row-access policy
- C) Projection policy
- D) Tag-based masking policy

---

## Q5 (Scenario)
A company stores medical records in Snowflake. Under HIPAA, they must retain records for 6 years. They also need to purge records older than 10 years. Which Snowflake features should be used to meet these requirements? (Select TWO)
- A) Set DATA_RETENTION_TIME_IN_DAYS = 2190 (6 years) on the medical records table for Time Travel
- B) Set DATA_RETENTION_TIME_IN_DAYS to the maximum supported value (90 days for Business Critical) at the table level and archive older records to a separate managed table
- C) Create a scheduled Snowflake task that deletes rows older than 10 years and logs deletions
- D) Use Snowflake Fail-safe (always 7 days, not configurable) to ensure 6-year retention compliance
- E) Tag records with a retention expiry date and use a task to enforce automated purging

---

## Q6 (Single Answer)
A row-access policy in Snowflake returns a Boolean expression. What happens to rows for which the policy returns FALSE?
- A) Those rows are masked with NULL values
- B) Those rows are excluded from query results entirely
- C) The query fails with an access violation error
- D) Those rows are replaced with placeholder rows showing RESTRICTED

---

## Q7 (Scenario)
A Security Engineer has applied a Dynamic Data Masking policy to the SSN column of the EMPLOYEES table. A data analyst with the ANALYST role runs SELECT SSN FROM EMPLOYEES and sees values like 'XXX-XX-1234'. The same analyst also queries a view VIEW_EMPLOYEES that selects SSN from EMPLOYEES. What do they see in the view?
- A) The full unmasked SSN, because views bypass masking policies
- B) The same masked value 'XXX-XX-1234', because masking policies apply at the base table column level regardless of access path
- C) NULL for SSN, because views inherit a different default masking behavior
- D) The masking policy is not applied to views; the analyst sees an error

---

## Q8 (Single Answer)
What is the purpose of Snowflake's External Tokenization feature?
- A) It allows Snowflake to encrypt data before loading it into external stages
- B) It allows masking policies to call external services to replace sensitive values with tokens that can only be de-tokenized by authorized parties
- C) It generates JWT tokens for Snowflake API authentication
- D) It provides token-based access to Snowflake stages from external applications

---

## Q9 (Scenario)
A healthcare analytics company wants to share de-identified patient data with a research partner. The data includes quasi-identifiers (age, zip code, diagnosis code) that could be re-identified when combined. Which Snowflake feature BEST addresses the re-identification risk?
- A) Tag-based masking on the quasi-identifier columns
- B) Aggregation policies that prevent granular row-level data access when the result set is too small
- C) A row-access policy denying access to rows with rare diagnosis codes
- D) Projection policies hiding quasi-identifier columns entirely

---

## Q10 (Single Answer)
Which Snowflake view can a Security Engineer use to identify all objects that have a specific tag applied, along with the tag value?
- A) ACCOUNT_USAGE.TAG_REFERENCES
- B) INFORMATION_SCHEMA.TAG_ASSIGNMENTS
- C) ACCOUNT_USAGE.OBJECT_TAGS
- D) SNOWFLAKE.GOVERNANCE.TAG_REGISTRY

---

## Q11 (Scenario)
A data governance team tags all tables containing sensitive financial data with the tag SENSITIVITY = 'HIGH'. They want to automatically apply a masking policy to all columns in those tables that are tagged. Which Snowflake feature enables this?
- A) Conditional Dynamic Data Masking using IF(GET_DDM_TAG() = 'HIGH', masked_value, actual_value)
- B) Tag-based masking policies that associate a masking policy with a tag; the policy automatically applies to all columns bearing the tag
- C) A scheduled task that runs ALTER COLUMN ... SET MASKING POLICY for every HIGH-sensitivity column daily
- D) Snowflake's auto-masking feature enabled via the SET AUTO_MASKING = TRUE account parameter

---

## Q12 (Single Answer)
When a masking policy is applied to a column in a base table, and a secure view selects that column, what does the consumer of the share see when querying the view?
- A) The full unmasked data, because the provider's masking policies do not apply to consumers
- B) The masked data, because masking policies at the base table are inherited by views and shares
- C) NULL values for the masked column, overriding the masking policy
- D) A permission error because masking policies block access through views

---

## Q13 (Scenario)
A Snowflake Data Clean Room is set up between Company A and Company B. Company A wants to run an overlap analysis to find mutual customers without exposing their raw customer lists to Company B. Which security property does the Data Clean Room enforce?
- A) Row-level access policies that filter customer rows visible to Company B
- B) Secure multi-party computation: neither party can see the other's raw data; only aggregate or overlap results are returned
- C) Dynamic Data Masking on customer IDs to prevent direct identification
- D) External Tokenization to replace customer IDs with irreversible tokens before sharing

---

## Q14 (Single Answer)
What is the maximum Time Travel retention period (DATA_RETENTION_TIME_IN_DAYS) for a table on Snowflake's Business Critical edition?
- A) 7 days
- B) 30 days
- C) 90 days
- D) 365 days

---

## Q15 (Scenario)
A Security Engineer needs to prevent a Snowflake role from seeing the values in the SALARY column of the HR_DATA table, regardless of what query is run, while still allowing the role to SELECT other columns. Which policy type should be applied to the SALARY column?
- A) Dynamic Data Masking policy that returns NULL for the SALARY column for the target role
- B) Row-access policy filtering out rows where SALARY is populated
- C) Projection policy on the SALARY column for the target role, preventing the column from being projected
- D) Tag-based masking that replaces SALARY with 0.00 for the target role

---

## Q16 (Single Answer)
Which Snowflake SQL function is used within a masking policy expression to determine the currently active role and conditionally unmask data?
- A) SESSION_ROLE()
- B) CURRENT_ROLE()
- C) ACTIVE_ROLE()
- D) GET_CURRENT_ROLE()

---

## Q17 (Scenario)
A data engineer accidentally deleted rows from the ORDERS table 2 hours ago. The table has DATA_RETENTION_TIME_IN_DAYS = 7. How can the deleted rows be recovered?
- A) Use UNDROP TABLE to restore the full table from Snowflake Fail-safe
- B) Use Time Travel to clone the table at a point before the deletion: CREATE TABLE orders_restored CLONE orders AT (OFFSET => -7200)
- C) Contact Snowflake support to restore from the 7-day Fail-safe backup
- D) Use ACCOUNT_USAGE.ACCESS_HISTORY to reconstruct the deleted rows from the query history

---

## Q18 (Single Answer)
What is the key difference between Snowflake Time Travel and Fail-safe regarding user accessibility?
- A) Time Travel data is accessible only by Snowflake Support; Fail-safe data is accessible by account administrators
- B) Time Travel data is accessible by account users via SQL; Fail-safe data is accessible only by Snowflake Support
- C) Both Time Travel and Fail-safe are accessible via SQL by any user with the ACCOUNTADMIN role
- D) Fail-safe data expires after 24 hours; Time Travel data is retained indefinitely

---

## Q19 (Scenario)
A company uses Snowflake Data Sharing to share a dataset with a partner. The dataset includes a table CUSTOMER_DATA with a masking policy applied to the EMAIL column. When the partner queries the shared table, what do they see for EMAIL?
- A) The full email addresses, because sharing bypasses masking policies
- B) The masked values as defined by the masking policy, applied at query time in the provider's account
- C) NULL values for all email addresses
- D) An error because masking policies prevent data sharing

---

## Q20 (Single Answer)
Which Snowflake feature can restrict the Snowflake COPY INTO (unload) statement from writing data to any external stage except specifically approved destinations?
- A) A row-access policy on the source table
- B) The ALLOWED_LOCATIONS parameter on a storage integration
- C) A network policy blocking outbound connections to non-approved storage
- D) Setting PREVENT_UNLOAD_TO_UNAPPROVED_STAGES = TRUE

---

## Q21 (Scenario)
A Security Engineer is implementing Tri-Secret Secure for a Snowflake Business Critical account on AWS. The customer-managed key is stored in AWS KMS. After enabling Tri-Secret Secure, what happens if the customer rotates the CMK in AWS KMS?
- A) Snowflake automatically detects the rotation and updates its key reference; no action is needed
- B) The customer must inform Snowflake Support of the new key ARN so Snowflake can re-encrypt data
- C) CMK rotation is transparent when using AWS KMS key rotation; the key ID stays the same even as underlying key material rotates
- D) Tri-Secret Secure does not support CMK rotation; the key must remain static

---

## Q22 (Single Answer)
What does Snowflake's GENERATE_SYNTHETIC_DATA stored procedure (SNOWFLAKE.DATA_PRIVACY.GENERATE_SYNTHETIC_DATA) produce?
- A) Fully random data with no statistical relationship to the original
- B) Statistically representative synthetic data that preserves the distributions and relationships of the original data without exposing actual values
- C) Encrypted copies of the original data using Snowflake's managed encryption keys
- D) A tokenized version of the original data where each value is replaced by a reversible token

---

## Q23 (Scenario)
A data governance policy requires that any query returning fewer than 5 rows from a sensitive aggregate table must be suppressed to prevent re-identification. Which Snowflake policy type enforces this?
- A) Row-access policy with a minimum-row-count condition
- B) Aggregation policy with a minimum overlap (entity threshold) that suppresses results below the threshold
- C) Projection policy that hides rows when the result count is below 5
- D) Dynamic Data Masking with a CASE expression checking ROW_COUNT()

---

## Q24 (Single Answer)
Which Snowflake mechanism automatically propagates a tag applied to a table to all columns in that table, and from a schema to all tables and columns within it?
- A) Tag replication
- B) Tag inheritance
- C) Tag broadcasting
- D) Auto-classification

---

## Q25 (Scenario)
A Security Engineer must ensure that a data analyst cannot export query results to their personal computer (for example, via the Snowsight download button or JDBC result set fetch). Which Snowflake control should be implemented?
- A) A network policy blocking the analyst's home IP from connecting to Snowflake
- B) Projection policies on all sensitive columns
- C) Set the PREVENT_UNLOAD_TO_INLINE_URL account parameter to TRUE
- D) Set the account-level or user-level parameter CLIENT_RESULT_COLUMN_CASE_INSENSITIVE to TRUE

---

## Q26 (Single Answer)
Under the Snowflake data sharing model, when a consumer account queries a shared object, in which account's context is the masking policy evaluated?
- A) The consumer account's context
- B) The provider account's context
- C) The Snowflake system account's context
- D) The context depends on who created the masking policy

---

## Q27 (Scenario)
A row-access policy is applied to the SALES table. The policy uses a mapping table (SALES_ACCESS_MAP) to determine which rows a user can see based on CURRENT_USER(). A new user is added to the system but not to SALES_ACCESS_MAP. What happens when this user queries SALES?
- A) The user sees all rows because no matching access rule exists, defaulting to open access
- B) The user sees no rows because the policy returns FALSE for all rows when the user is not in the mapping table
- C) The query fails with an ORA-00904 error (invalid identifier)
- D) The user sees rows randomly assigned based on query time

---

## Q28 (Single Answer)
What does the FAIL_SAFE period provide for Snowflake permanent tables?
- A) A user-accessible backup window of up to 90 days controlled via DATA_RETENTION_TIME_IN_DAYS
- B) A non-configurable 7-day disaster recovery window after Time Travel expires, accessible only by Snowflake Support
- C) An automatic daily snapshot stored in a separate region for cross-region recovery
- D) A configurable retention window of 1–7 days that the account administrator can enable per table

---

## Q29 (Scenario)
A company is evaluating data retention options for their Snowflake tables. Their compliance team requires data to be recoverable for at least 30 days from any deletion. What is the recommended configuration?
- A) Set DATA_RETENTION_TIME_IN_DAYS = 30 on the relevant tables (requires Enterprise or higher edition)
- B) Set DATA_RETENTION_TIME_IN_DAYS = 23 and rely on the 7-day Fail-safe period to make 30 days total
- C) Use transient tables with DATA_RETENTION_TIME_IN_DAYS = 30 for cost efficiency
- D) Configure Snowflake Fail-safe to retain data for 30 days via the FAIL_SAFE_PERIOD parameter

---

## Q30 (Single Answer)
Which Snowflake view in ACCOUNT_USAGE shows the history of tag assignments, including when a tag was applied and removed?
- A) ACCOUNT_USAGE.TAG_REFERENCES
- B) ACCOUNT_USAGE.TAG_REFERENCES_HISTORY (via TAG_REFERENCES with deleted records)
- C) ACCOUNT_USAGE.OBJECT_TAG_HISTORY
- D) ACCOUNT_USAGE.TAG_AUDIT_HISTORY

---

## Q31 (Scenario)
A Security Engineer needs to replicate masking policies and row-access policies from a primary Snowflake account to a secondary account for disaster recovery. Which step is required to include security policies in replication?
- A) Policies are automatically included in all replication groups; no special configuration is needed
- B) Include POLICIES in the OBJECT_TYPES list when creating or altering the replication group
- C) Use CLONE on each policy to copy it to the secondary account manually
- D) Create an identical set of policies manually in the secondary account before failover

---

## Q32 (Single Answer)
Which Snowflake feature allows a masking policy to call a function in an external service (for example, a tokenization vault) to replace a sensitive value with a token?
- A) Tag-based masking
- B) External Tokenization via masking policies with external functions
- C) Dynamic Data Masking with UDFMASK
- D) Projection policies with external function support

---

## Q33 (Scenario)
A company needs to enforce GDPR right-to-erasure. When a customer requests deletion, all their data in Snowflake must be gone — including from backups. What is the Snowflake limitation the Security Engineer must communicate to the compliance team?
- A) Snowflake Time Travel and Fail-safe retain historical data and cannot be immediately purged by users; data may persist for up to the Time Travel retention plus 7-day Fail-safe period before Snowflake purges it
- B) GDPR erasure is instant in Snowflake because DELETE operations immediately remove data from all storage layers
- C) Snowflake offers a GDPR_ERASE stored procedure that purges data from all layers including Fail-safe
- D) Setting DATA_RETENTION_TIME_IN_DAYS = 0 immediately removes all historical data from Time Travel and Fail-safe

---

## Q34 (Single Answer)
What is the Snowflake differential privacy policy used for?
- A) To add mathematical noise to query results so that individual records cannot be inferred
- B) To restrict access to rows below a minimum count threshold
- C) To mask numeric columns by adding random offsets
- D) To prevent GROUP BY queries that return fewer than a specified number of rows

---

## Q35 (Scenario)
A Security Engineer applies a row-access policy to a table and then runs a query. They expect the policy to filter certain rows, but all rows are returned. Which of the following is the MOST likely cause?
- A) Row-access policies only take effect after the next warehouse restart
- B) The current role has OWNERSHIP of the table, which bypasses row-access policies
- C) The query was executed with BYPASS_MASKING_POLICY = TRUE session parameter
- D) Row-access policies require a recompilation of the query plan, which takes up to 5 minutes

---

## Q36 (Single Answer)
Which Snowflake SQL command would a Security Engineer use to see which masking policies are applied to which columns across the entire account?
- A) SHOW MASKING POLICIES
- B) SELECT * FROM ACCOUNT_USAGE.POLICY_REFERENCES WHERE POLICY_KIND = 'MASKING_POLICY'
- C) SELECT * FROM INFORMATION_SCHEMA.MASKING_POLICY_REFERENCES
- D) Both B and C are valid depending on scope

---

## Q37 (Scenario)
A company is building a Snowflake Data Clean Room to allow two competing retailers to jointly analyze product overlap without exposing individual transaction data to each other. Which of the following constraints must the clean room enforce?
- A) Both parties must have ACCOUNTADMIN in each other's accounts
- B) Raw transaction data must not be accessible by either party to the other; only approved analysis templates can produce results
- C) Data must be replicated to a neutral Snowflake account before analysis can run
- D) All analysis must be approved by Snowflake before results are returned

---

## Q38 (Single Answer)
In Snowflake, which table type has NO Time Travel and NO Fail-safe, making it lowest cost for ephemeral data?
- A) Permanent table with DATA_RETENTION_TIME_IN_DAYS = 0
- B) Transient table
- C) Temporary table
- D) External table

---

## Q39 (Scenario)
A Security Engineer needs to implement a masking policy for the EMAIL column that: (1) returns the full email for COMPLIANCE_OFFICER role; (2) returns a SHA2 hash of the email for the DATA_ANALYST role; (3) returns NULL for all other roles. Which masking policy expression achieves this?
- A) CASE WHEN CURRENT_ROLE() IN ('COMPLIANCE_OFFICER') THEN val WHEN CURRENT_ROLE() IN ('DATA_ANALYST') THEN SHA2(val) ELSE NULL END
- B) IFF(CURRENT_ROLE() = 'COMPLIANCE_OFFICER', val, IFF(CURRENT_ROLE() = 'DATA_ANALYST', HASH(val), NULL))
- C) DECODE(CURRENT_ROLE(), 'COMPLIANCE_OFFICER', val, 'DATA_ANALYST', SHA2(val), 'MASKED')
- D) CASE WHEN HAS_ROLE('COMPLIANCE_OFFICER') THEN val WHEN HAS_ROLE('DATA_ANALYST') THEN SHA2(val) ELSE NULL END

---

## Q40 (Single Answer)
What is the purpose of Snowflake's aggregation policy budget parameter?
- A) It sets a credit budget for queries running against protected tables
- B) It limits the maximum number of rows returned from a query
- C) It sets an entity (privacy) budget that limits how many distinct aggregation queries can be run against a table in a given time window to prevent inference attacks
- D) It defines the minimum number of distinct values allowed in a GROUP BY result set

---

## Q41 (Scenario)
A Security Engineer has configured a Snowflake Business Critical account with Tri-Secret Secure using AWS KMS. The organization undergoes a security incident and the security team suspects the Snowflake platform may be compromised. The CISO instructs the team to revoke Snowflake's access to data immediately. What action should be taken?
- A) Call Snowflake Support to suspend the account
- B) Delete the Snowflake account from the Snowflake UI
- C) Revoke or disable the customer-managed key in AWS KMS; Snowflake will be unable to decrypt any data
- D) Run ALTER ACCOUNT SET SUSPENDED = TRUE to halt all data access

---

## Q42 (Single Answer)
Which Snowflake account parameter controls whether users can download query results via Snowsight or third-party clients?
- A) ALLOW_RESULT_DOWNLOAD
- B) PREVENT_UNLOAD_TO_INLINE_URL
- C) RESTRICT_OUTBOUND_DATA_TRANSFER
- D) CLIENT_RESULT_COLUMN_CASE_INSENSITIVE

---

## Q43 (Scenario)
A Snowflake account stores PHI (Protected Health Information). Under HIPAA, encryption of data at rest is a technical safeguard. The security team wants to document Snowflake's encryption capabilities. Which statements about Snowflake's default encryption are correct? (Select TWO)
- A) All data stored in Snowflake is encrypted at rest by default using AES-256
- B) Snowflake encrypts only columns tagged as sensitive; untagged columns are stored unencrypted
- C) Snowflake uses a hierarchical key management model; each account, database, table, and micro-partition has its own encryption key
- D) Encryption keys are managed solely by the customer; Snowflake has no access to the keys by default
- E) Snowflake-managed encryption is the default; Tri-Secret Secure adds an additional customer-managed key layer

---

## Q44 (Single Answer)
What happens to a masking policy applied to a column when that column is included in a CLONE operation of the table?
- A) The masking policy is removed from the cloned table's column
- B) The masking policy reference is preserved in the cloned table's column
- C) The masking policy is cloned and a new independent policy is created for the cloned table
- D) Cloning tables with masking policies requires ACCOUNTADMIN approval

---

## Q45 (Scenario)
A financial institution uses Snowflake for trade data. Trades are sensitive and must be accessible only by traders for their own trades. A trader's username matches a USER_ID column in the TRADES table. Which Snowflake feature and design BEST enforces this per-row access control?
- A) A Dynamic Data Masking policy masking the AMOUNT column when CURRENT_USER() != USER_ID
- B) A row-access policy that returns: CURRENT_USER() = t.USER_ID (filtering rows where the current user doesn't match the USER_ID column)
- C) A projection policy hiding all columns except USER_ID and AMOUNT for non-owner users
- D) A secure view that filters WHERE USER_ID = CURRENT_USER()

---

## Q46 (Single Answer)
Which Snowflake tag category captures the privacy classification of a column (for example, IDENTIFIER, QUASI_IDENTIFIER, SENSITIVE)?
- A) SEMANTIC_CATEGORY
- B) PRIVACY_CATEGORY
- C) SENSITIVITY_LEVEL
- D) DATA_CATEGORY

---

## Q47 (Scenario)
A Security Engineer needs to create a data sharing pipeline where a provider exposes a table, and consumers in different regions need the same masked view of the data. The masking must reflect the consumer's role context, not the provider's. Which sharing approach allows consumer-side role evaluation?
- A) Standard data sharing with masking policies in the provider's account
- B) Secure direct sharing does not support consumer-side masking; use cross-region replication instead
- C) There is no way to achieve consumer-side masking; the provider's policies always apply
- D) This is not achievable in Snowflake; masking always evaluates in the provider account

---

## Q48 (Single Answer)
What is the purpose of the ALLOWED_LOCATIONS property on a Snowflake storage integration?
- A) It lists the IP addresses allowed to access the external stage
- B) It defines which cloud storage paths (buckets/containers/paths) the integration can access
- C) It restricts which warehouses can use the storage integration
- D) It defines the geographic regions where the integration is active

---

## Q49 (Scenario)
A Security Engineer applies a projection policy to the ACCOUNT_NUMBER column of the BANK_ACCOUNTS table, assigning it to the DATA_ANALYST role. The analyst runs: SELECT * FROM BANK_ACCOUNTS. What is the result?
- A) The query fails with an INSUFFICIENT_PRIVILEGES error
- B) All columns are returned, including ACCOUNT_NUMBER with masked values
- C) All columns except ACCOUNT_NUMBER are returned; ACCOUNT_NUMBER is excluded from the result set
- D) ACCOUNT_NUMBER is returned as NULL

---

## Q50 (Single Answer)
Which Snowflake SQL command is used to apply a Dynamic Data Masking policy to a table column?
- A) CREATE MASKING POLICY ... ON TABLE t COLUMN c
- B) ALTER TABLE t ALTER COLUMN c SET MASKING POLICY policy_name
- C) APPLY MASKING POLICY policy_name TO TABLE t (c)
- D) GRANT MASKING POLICY policy_name ON COLUMN t.c

---

## Q51 (Scenario)
A company runs multi-party analytics in a Snowflake Data Clean Room. Company A provides customer demographics, and Company B provides purchase history. The analyst template joins the two datasets to compute purchase propensity scores. The engineer at Company A is concerned that Company B might use result inspection to reconstruct Company A's raw data. Which safeguard should be built into the clean room?
- A) Apply projection policies to Company A's columns before sharing
- B) Use aggregation policies and minimum-entity-threshold settings in the analyst templates to prevent granular row-level inference
- C) Encrypt Company A's data with a CMK before adding it to the clean room
- D) Use Snowflake Fail-safe to roll back any queries that expose too much data

---

## Q52 (Single Answer)
Which Snowflake view in the SNOWFLAKE shared database shows data lineage — that is, the upstream and downstream objects that data flows through?
- A) ACCOUNT_USAGE.DATA_LINEAGE
- B) ACCOUNT_USAGE.OBJECT_DEPENDENCIES
- C) GOVERNANCE.LINEAGE
- D) ACCOUNT_USAGE.ACCESS_HISTORY (with DIRECT_OBJECTS_ACCESSED and BASE_OBJECTS_ACCESSED)

---

## Q53 (Scenario)
A Security Engineer needs to configure replication for a Snowflake account. The replication group must include network policies, users, roles, and grants so the secondary account is functionally equivalent to the primary after failover. Which OBJECT_TYPES should be specified in the replication group?
- A) OBJECT_TYPES = 'TABLES, VIEWS, SCHEMAS'
- B) OBJECT_TYPES = 'USERS, ROLES, GRANTS, RESOURCE MONITORS, WAREHOUSES, DATABASES, INTEGRATIONS, NETWORK POLICIES'
- C) OBJECT_TYPES = 'ALL' — this automatically includes all object types
- D) OBJECT_TYPES = 'SECURITY OBJECTS' — this includes all security-related objects

---

## Q54 (Single Answer)
What is the Snowflake tag-based masking policy association model? How does a masking policy get triggered by a tag?
- A) The masking policy is directly applied to the tag; any column bearing the tag automatically uses the associated masking policy
- B) A tag-based masking policy is applied to a specific column that references the tag via a CASE expression
- C) The tag is applied to the schema; Snowflake automatically masks all columns in the schema
- D) Tags and masking policies are independent; administrators must manually apply each policy

---

## Q55 (Scenario)
A Security Engineer is auditing data sharing in a Snowflake account. They need to know which shares have been created, what objects are in each share, and which consumer accounts have been granted access. Which ACCOUNT_USAGE or SQL commands provide this information?
- A) SHOW SHARES and SELECT * FROM ACCOUNT_USAGE.DATA_SHARING_USAGE
- B) SHOW SHARES; SHOW GRANTS TO SHARE <share_name>; SHOW GRANTS ON SHARE <share_name>
- C) SELECT * FROM INFORMATION_SCHEMA.SHARES
- D) SELECT * FROM ACCOUNT_USAGE.SHARES and SELECT * FROM ACCOUNT_USAGE.SHARE_GRANTS

---

## Q56 (Single Answer)
Which type of Snowflake table has a Time Travel retention period of 0 days (non-configurable) and a 0-day Fail-safe period?
- A) Temporary table
- B) Transient table
- C) External table
- D) Dynamic table

---

## Q57 (Scenario)
A Security Engineer is setting up automatic data classification for a Snowflake schema. After running SYSTEM$CLASSIFY('DB.SCHEMA', {}), the engineer wants to verify which columns were classified and what categories were assigned. Which view should be queried?
- A) ACCOUNT_USAGE.DATA_CLASSIFICATION_LATEST
- B) ACCOUNT_USAGE.TAG_REFERENCES WHERE TAG_NAME = 'SEMANTIC_CATEGORY'
- C) INFORMATION_SCHEMA.CLASSIFICATION_RESULTS
- D) ACCOUNT_USAGE.AUTOMATIC_CLUSTERING_HISTORY

---

## Q58 (Single Answer)
What is the purpose of the DATA_RETENTION_TIME_IN_DAYS = 0 setting on a Snowflake table?
- A) It disables all data retention and makes Time Travel unavailable for that table
- B) It sets the Fail-safe period to 0 days
- C) It means the table is purged immediately after any DELETE operation
- D) It disables encryption for the table to improve performance

---

## Q59 (Scenario)
A Security Engineer needs to enforce that no Snowflake user can write data to an external S3 bucket outside the approved list (s3://company-approved-bucket). Which Snowflake feature accomplishes this?
- A) A row-access policy on COPY INTO commands
- B) A storage integration with ALLOWED_LOCATIONS = ('s3://company-approved-bucket/') and a network policy blocking S3 traffic
- C) A storage integration with ALLOWED_LOCATIONS = ('s3://company-approved-bucket/') and BLOCKED_LOCATIONS for other buckets
- D) An account parameter RESTRICT_EXTERNAL_STAGE_LOCATIONS = 's3://company-approved-bucket/'

---

## Q60 (Single Answer)
In Snowflake, when a masking policy is applied to a column that is also part of a clustering key, what is the impact on clustering?
- A) Clustering is disabled on columns with masking policies
- B) The masking policy does not affect clustering; the underlying data is stored and clustered using the original values
- C) The masking policy is removed from clustering key columns automatically
- D) Clustering runs on the masked values, reducing effectiveness

---

## Q61 (Scenario)
A Security Engineer configures Client Redirect in Snowflake to redirect client connections from the primary account to the secondary account after failover. During testing, they find that some connections still go to the old primary. What is the most likely cause?
- A) Client Redirect requires all clients to update their JDBC drivers to version 3.12 or later
- B) The DNS change for Client Redirect has not propagated yet; DNS TTL can cause a propagation delay
- C) Client Redirect only works for Snowsight browser clients; JDBC/ODBC still connect to the primary
- D) The secondary account must have ACCOUNTADMIN approve the Client Redirect before it takes effect

---

## Q62 (Single Answer)
Which Snowflake stored procedure is used to classify data in a schema and apply system-defined classification tags (SEMANTIC_CATEGORY, PRIVACY_CATEGORY) automatically?
- A) SNOWFLAKE.DATA_CLASSIFICATION.AUTO_TAG()
- B) SYSTEM$CLASSIFY()
- C) SNOWFLAKE.GOVERNANCE.CLASSIFY_SCHEMA()
- D) SNOWFLAKE.AUTO_CLASSIFY()

---

## Q63 (Scenario)
A Security Engineer is implementing a replication strategy. The primary account is in AWS us-east-1 and the secondary is in Azure East US. After failover, the secondary becomes the new primary. The engineer must ensure that the Tri-Secret Secure customer-managed keys work in the new primary. What must be planned?
- A) The CMK must be stored in a cloud KMS in the same cloud provider as the Snowflake account; a separate Azure Key Vault CMK must be configured for the Azure secondary
- B) The AWS KMS CMK is portable across cloud providers; the same key ARN works in Azure
- C) Tri-Secret Secure does not support cross-cloud replication; it must be disabled before failover
- D) Snowflake automatically copies CMK configuration as part of the replication group

---

## Q64 (Single Answer)
Which Snowflake feature allows administrators to set a policy that limits how much of a dataset's "privacy budget" can be consumed by analytical queries, preventing re-identification through repeated querying?
- A) Aggregation policy with entity threshold
- B) Differential privacy policy
- C) Row-access policy with query count limits
- D) Projection policy with maximum-use limits

---

## Q65 (Scenario)
A Security Engineer needs to implement a masking policy that preserves the format of a credit card number while masking it — showing only the last 4 digits (e.g., '**** **** **** 1234'). Which Snowflake SQL expression should be used in the masking policy body?
- A) REGEXP_REPLACE(val, '[0-9](?=[0-9]{4})', '*')
- B) CONCAT('**** **** **** ', RIGHT(val, 4))
- C) MASK(val, '*', 1, LENGTH(val) - 4)
- D) SUBSTR(val, LENGTH(val)-3) || '************'

---

## Q66 (Single Answer)
In Snowflake, what does the COPY CURRENT GRANTS option do when transferring table ownership?
- A) It copies the old owner's session settings to the new owner
- B) It preserves all existing grants on the table when ownership is transferred to a new role
- C) It creates a backup copy of the table before transferring ownership
- D) It copies the grants from the source schema to the target schema

---

## Q67 (Scenario)
A company's privacy team wants to verify that Snowflake's automated data classification is correctly identifying PII fields (email, phone, SSN) in new tables loaded to the DATA_LAKE schema. They want a weekly report showing which columns were newly classified. Which approach should be implemented?
- A) Use SYSTEM$CLASSIFY() on a schedule via a Snowflake task and query DATA_CLASSIFICATION_LATEST for newly tagged columns
- B) Set up a Snowflake Data Quality Monitor on the DATA_LAKE schema to detect PII
- C) Use ACCOUNT_USAGE.QUERY_HISTORY to find queries that SELECT sensitive columns
- D) Configure a notification integration that alerts when new tables are created

---

## Q68 (Single Answer)
Which Snowflake aggregation policy parameter defines the minimum number of distinct entities in a result set before the result is returned?
- A) MIN_OVERLAP_SIZE
- B) ENTITY_MINIMUM_COUNT
- C) MIN_GROUP_SIZE
- D) MINIMUM_DISTINCT_ENTITIES

---

## Q69 (Scenario)
A Security Engineer at a bank needs to share customer account balances with a regulatory authority. The regulator requires the data to be real-time (not a copy), and the bank cannot expose any other data. Which Snowflake sharing mechanism is MOST appropriate?
- A) Create a snapshot copy of the relevant data in a separate schema and export to CSV
- B) Use Snowflake Data Sharing (secure direct share) to share only the specific table or view with the regulator's Snowflake account
- C) Create a Snowflake Data Clean Room for the regulator
- D) Use Snowflake replication to create a read-only replica in the regulator's cloud account

---

## Q70 (Single Answer)
Which Snowflake feature enables automatic detection and tagging of column-level PII without user intervention?
- A) Snowflake Horizon automatic data classification
- B) Trust Center PII scanner
- C) Access History PII tracking
- D) Snowflake Trail PII detection

---

## Q71 (Scenario)
A Security Engineer needs to understand data lineage to determine whether a sensitive base table is exposed through any downstream views or secure views. Which ACCOUNT_USAGE view captures the source and derived objects for a query, enabling lineage tracing?
- A) ACCOUNT_USAGE.OBJECT_DEPENDENCIES
- B) ACCOUNT_USAGE.ACCESS_HISTORY (with DIRECT_OBJECTS_ACCESSED and BASE_OBJECTS_ACCESSED columns)
- C) ACCOUNT_USAGE.DATA_LINEAGE
- D) ACCOUNT_USAGE.QUERY_HISTORY with QUERY_TEXT parsing

---

## Q72 (Single Answer)
When using Snowflake replication, which OBJECT_TYPE must be specified to replicate AUTHENTICATION POLICIES to the secondary account?
- A) AUTHENTICATION
- B) POLICIES
- C) INTEGRATIONS
- D) SECURITY POLICIES

---

## Q73 (Scenario)
A company is migrating from an on-premises database to Snowflake. As part of the migration, they must tokenize Social Security Numbers (SSNs) before storing them in Snowflake, with de-tokenization available only to authorized users via an external vault. Which Snowflake feature supports this workflow?
- A) Dynamic Data Masking with a SHA2 hash of the SSN
- B) External Tokenization using a masking policy that calls an external function connected to the tokenization vault
- C) Row-access policies that filter rows containing SSNs for unauthorized users
- D) Tri-Secret Secure to encrypt SSNs with a customer-managed key

---

## Q74 (Single Answer)
What is the effect of applying a row-access policy to a table that already has an active Dynamic Data Masking policy on one of its columns?
- A) The row-access policy takes precedence and disables the masking policy
- B) Both policies are applied independently: the row-access policy filters rows, and the masking policy applies to visible column values in the resulting rows
- C) An error is thrown because conflicting policies cannot coexist on the same table
- D) The masking policy is disabled when a row-access policy is active

---

## Q75 (Scenario)
A Security Engineer needs to prevent analysts from seeing the TRADE_AMOUNT column in the TRADES table, while still allowing them to run aggregations (such as SUM and AVG) against it. Which Snowflake policy type should be used and why?
- A) A projection policy, because it prevents the column from being projected in SELECT but still allows it to be used in WHERE and aggregate functions
- B) A masking policy that returns NULL, preventing both projection and aggregation
- C) A row-access policy filtering rows where TRADE_AMOUNT exceeds a threshold
- D) External Tokenization so that analysts see tokens instead of amounts, enabling aggregation on tokens

---

## Q76 (Single Answer)
In Snowflake, what is the minimum edition required for Multi-Party (dual-control) authorization on sensitive DDL operations?
- A) Standard
- B) Enterprise
- C) Business Critical
- D) Virtual Private Snowflake (VPS)

---

## Q77 (Scenario)
A company runs nightly batch loads that INSERT millions of rows into a STAGING table. The STAGING table has DATA_RETENTION_TIME_IN_DAYS = 1. After the batch, the data is moved to a PRODUCTION table with DATA_RETENTION_TIME_IN_DAYS = 14. The security team asks: for how long can each table's data be recovered using Time Travel and Fail-safe combined?
- A) STAGING: 8 days total (1 day Time Travel + 7 days Fail-safe); PRODUCTION: 21 days total (14 days Time Travel + 7 days Fail-safe)
- B) Both tables: 14 days (Time Travel always matches the PRODUCTION table setting)
- C) STAGING: 1 day; PRODUCTION: 14 days (Fail-safe is not configurable and does not extend Time Travel)
- D) Both tables: 7 days (Fail-safe overrides the TIME_TRAVEL setting for all tables)

---

## Q78 (Single Answer)
A Snowflake masking policy can reference which of the following in its body to enable role-based conditional unmasking?
- A) CURRENT_ACCOUNT()
- B) CURRENT_ROLE() and IS_ROLE_IN_SESSION()
- C) SESSION_CONTEXT() and CURRENT_USER_GROUPS()
- D) PRINCIPAL_ROLE() and ACTIVE_ROLES()

---

## Q79 (Scenario)
A Security Engineer needs to ensure that two conditions are met: (1) Snowflake stores no plaintext copies of a specific table's data; (2) analysts can still run SQL queries against that table and see tokenized values. Which Snowflake capability should be combined with a tokenization vault?
- A) Tri-Secret Secure with Dynamic Data Masking
- B) External Tokenization: load only tokenized values into Snowflake; use a masking policy that calls an external function to de-tokenize for authorized roles
- C) Client-side encryption before loading; masking policies on encrypted columns
- D) Column-level encryption using the ENCRYPT() function in the load pipeline

---

## Q80 (Single Answer)
Which Snowflake system function returns TRUE if the current session's role is, or is a descendant of, a specified role in the role hierarchy?
- A) CURRENT_ROLE() = 'role_name'
- B) IS_ROLE_IN_SESSION('role_name')
- C) HAS_ROLE('role_name')
- D) ROLE_IN_HIERARCHY('role_name')

---

## Q81 (Scenario)
A Security Engineer is building a masking policy that should remain transparent to roles in the ADMIN_ROLES role group (a hierarchy). The condition must evaluate whether the current session has ANY role in the ADMIN hierarchy active, not just the top-level ADMIN role. Which function handles this correctly?
- A) CURRENT_ROLE() = 'ADMIN'
- B) IS_ROLE_IN_SESSION('ADMIN') — returns TRUE if the current role is or inherits from ADMIN
- C) ARRAY_CONTAINS(CURRENT_AVAILABLE_ROLES(), 'ADMIN')
- D) GET_ROLE_HIERARCHY() CONTAINS 'ADMIN'

---

## Q82 (Single Answer)
Snowflake's automatic data classification assigns which two system-defined tag names to columns identified as potentially sensitive?
- A) SENSITIVITY and DATA_CLASS
- B) SNOWFLAKE.CORE.SEMANTIC_CATEGORY and SNOWFLAKE.CORE.PRIVACY_CATEGORY
- C) AUTOMATIC.CATEGORY and AUTOMATIC.PRIVACY
- D) PII_CLASS and PRIVACY_LEVEL

---

## Q83 (Scenario)
A Security Engineer needs to restrict a Snowflake user from downloading query results via any client (Snowsight, JDBC, ODBC, Python) while still allowing them to run queries. Which combination of account-level parameter changes achieves this? (Select TWO)
- A) Set PREVENT_UNLOAD_TO_INLINE_URL = TRUE to prevent Snowsight downloads
- B) Set ENABLE_RESULT_CACHING = FALSE to prevent result retrieval
- C) Set CLIENT_RESULT_COLUMN_CASE_INSENSITIVE = TRUE
- D) Contact Snowflake Support to enable a download-prevention contract feature
- E) This is not achievable via account parameters; use network policies to block egress

---

## Q84 (Single Answer)
What does Snowflake's ACCOUNT_USAGE.DATA_SHARING_USAGE view track?
- A) Credit consumption from data sharing queries
- B) History of objects added to and removed from shares, and consumer account access grants
- C) Network traffic statistics for data sharing operations
- D) A record of all queries run by share consumers

---

## Q85 (Scenario)
A Security Engineer is conducting a post-access review. They need to verify which columns of the CUSTOMERS table were accessed by user JOHN_DOE in the past 7 days. Which ACCOUNT_USAGE view and column provides column-level access details?
- A) ACCOUNT_USAGE.QUERY_HISTORY — parse QUERY_TEXT for column names
- B) ACCOUNT_USAGE.ACCESS_HISTORY — inspect COLUMNS_ACCESSED in the DIRECT_OBJECTS_ACCESSED or BASE_OBJECTS_ACCESSED JSON array
- C) ACCOUNT_USAGE.SESSIONS — review session-level data access summary
- D) ACCOUNT_USAGE.GRANTS_TO_ROLES — check SELECT grants on CUSTOMERS columns

---

## Q86 (Single Answer)
In a Snowflake replication setup, what is the role of a FAILOVER GROUP compared to a REPLICATION GROUP?
- A) They are identical; the terms are interchangeable
- B) A REPLICATION GROUP can only replicate data; a FAILOVER GROUP supports both replication and account failover (promoting secondary to primary)
- C) A FAILOVER GROUP can only replicate security objects; a REPLICATION GROUP handles data
- D) A FAILOVER GROUP requires Business Critical edition; a REPLICATION GROUP works on all editions

---

## Q87 (Scenario)
A Security Engineer needs to demonstrate that Snowflake's column-level security controls (masking) work correctly in a shared data scenario. The provider applies a masking policy to the SSN column. The consumer account user has a role not in the exempt list. Which result confirms the policy is working?
- A) The consumer sees an error: "MASKING POLICY VIOLATION — SSN COLUMN RESTRICTED"
- B) The consumer sees masked values (such as 'XXX-XX-XXXX') for the SSN column
- C) The consumer sees NULL for the SSN column and an audit event is logged
- D) The consumer cannot even see the SSN column in the result schema

---

## Q88 (Single Answer)
Which Snowflake SQL syntax is used to create a table as a clone of another table, restored to the point just before a specific query executed?
- A) CREATE TABLE t_restore CLONE t AT (STATEMENT => '<query_id>')
- B) CREATE TABLE t_restore CLONE t BEFORE (STATEMENT => '<query_id>')
- C) CREATE TABLE t_restore AS SELECT * FROM t AT (STATEMENT => '<query_id>')
- D) RESTORE TABLE t_restore FROM t BEFORE QUERY '<query_id>'

---

## Q89 (Scenario)
A Security Engineer uses a tag-based masking policy where the tag SENSITIVITY = 'PII' triggers a masking policy. A new table is loaded into the DATA_LAKE schema. The schema is tagged SENSITIVITY = 'PII'. Will the masking policy automatically apply to columns in new tables loaded to that schema?
- A) No; tag inheritance applies to schemas and tables but not to individual columns; column-level tags must be set explicitly
- B) Yes; Snowflake tag inheritance propagates the schema tag down to tables and their columns, triggering the tag-based masking policy automatically
- C) No; tag-based masking only applies to columns that are explicitly tagged; schema-level tags are not inherited by columns
- D) Yes, but only for columns with data type VARCHAR; numeric columns require explicit tagging

---

## Q90 (Single Answer)
What is the primary use case for Snowflake's differential privacy policy compared to its aggregation policy?
- A) Differential privacy prevents small-group disclosure; aggregation policy prevents individuals from being identified through mathematical noise
- B) Aggregation policy prevents small-group disclosure (suppresses results below entity threshold); differential privacy adds mathematical noise to query results to prevent individual inference even from larger result sets
- C) They are identical; Snowflake uses the terms interchangeably
- D) Differential privacy applies to real-time streaming; aggregation policy applies to batch queries

---

## Q91 (Scenario)
A healthcare company has a Snowflake account with patient data. They need to share aggregate statistics with a research institution while ensuring HIPAA de-identification standards (Safe Harbor or Expert Determination) are met. Which approach using Snowflake features BEST supports this?
- A) Share the raw patient table with the research institution and let them apply their own masking
- B) Create a secure view that aggregates data by region and age bracket (suppressing groups < 11 per HIPAA Safe Harbor), apply aggregation policies to suppress small groups, and share the view
- C) Use GENERATE_SYNTHETIC_DATA to create a fully synthetic dataset for the research institution
- D) Use Tri-Secret Secure to encrypt patient data before sharing with the institution

---

## Q92 (Single Answer)
A row-access policy can be attached to which of the following Snowflake object types?
- A) Table and view only
- B) Table, view, materialized view, and external table
- C) Table only
- D) Table, view, and dynamic table

---

## Q93 (Scenario)
A Security Engineer is reviewing a Snowflake account's data governance posture. They find that 45 tables in the SENSITIVE_SCHEMA schema have no masking policies or row-access policies applied. The engineer needs a quick, scalable way to apply a standard masking policy to all columns tagged SENSITIVITY = 'HIGH' across all 45 tables. Which approach is MOST efficient?
- A) Write a stored procedure that loops through INFORMATION_SCHEMA.COLUMNS and runs ALTER TABLE for each sensitive column
- B) Use tag-based masking policies: associate the masking policy with the SENSITIVITY = 'HIGH' tag; any column bearing this tag will automatically use the policy without per-column ALTER statements
- C) Use GRANT MASKING POLICY to apply the policy at the schema level
- D) Recreate all 45 tables with the masking policy embedded in the DDL

---

## Q94 (Single Answer)
What is the difference between a transient table and a permanent table with DATA_RETENTION_TIME_IN_DAYS = 0 in Snowflake?
- A) They are identical; setting DATA_RETENTION_TIME_IN_DAYS = 0 converts a permanent table to transient
- B) Transient tables have no Fail-safe (0 days); permanent tables with 0-day retention still have the standard 7-day Fail-safe period
- C) Permanent tables with 0-day retention have no Time Travel or Fail-safe, identical to transient tables
- D) Transient tables cannot have masking policies; permanent tables with 0-day retention can

---

## Q95 (Scenario)
A company is using Snowflake replication to maintain a secondary account in a different region. The security team requires that the secondary account's masking policies be exactly synchronized with the primary. After adding a new masking policy to the primary, the secondary is still missing the policy. What must be done?
- A) Masking policies replicate automatically; wait for the next scheduled replication cycle
- B) Run ALTER REPLICATION GROUP <group_name> REFRESH on the secondary to trigger an on-demand replication sync
- C) Manually create an identical masking policy in the secondary account
- D) Masking policies cannot be replicated; each account must maintain its own independent policies

---

## Q96 (Single Answer)
Which Snowflake feature allows data from multiple databases in the same or different accounts to be included in a single Snowflake share?
- A) Cross-database data sharing using SHARE DATABASES clause
- B) Multi-database sharing using a share that includes GRANT REFERENCE_USAGE on each database
- C) Secure data sharing supports only one database per share
- D) Use a unified view database and share that database

---

## Q97 (Scenario)
A Snowflake account at a bank is transitioning to GDPR compliance. The compliance team identifies that when a customer exercises their right to erasure, the customer's data must be deleted from Snowflake within 30 days. The bank's DBA asks the Security Engineer how to handle Time Travel data. What should the engineer advise?
- A) Time Travel data is automatically purged within 24 hours of a DELETE; no action is needed
- B) After running DELETE, the data remains accessible via Time Travel for up to DATA_RETENTION_TIME_IN_DAYS and then in Fail-safe for 7 more days; the total purge window can be up to 37 days for Business Critical — acceptable within the 30-day window only if DATA_RETENTION_TIME_IN_DAYS ≤ 23
- C) Set DATA_RETENTION_TIME_IN_DAYS = 0 on the table before running DELETE; this immediately removes Time Travel data; Fail-safe still retains a copy for 7 days (only Snowflake Support can access it)
- D) Use TRUNCATE TABLE instead of DELETE; TRUNCATE bypasses Time Travel and Fail-safe entirely

---

## Q98 (Single Answer)
Which system-defined Snowflake masking policy function returns TRUE if the current user has been granted a specific role (directly or through hierarchy)?
- A) CURRENT_ROLE()
- B) IS_ROLE_IN_SESSION()
- C) HAS_ROLE()
- D) SYSTEM$HAS_PRIVILEGE()

---

## Q99 (Scenario)
A company has 500 Snowflake tables all tagged SENSITIVITY = 'CONFIDENTIAL'. They need to apply a masking policy to the EMAIL columns in all these tables without writing 500 ALTER TABLE statements. Which technique is MOST scalable?
- A) Use tag-based masking: associate the masking policy with the SENSITIVITY = 'CONFIDENTIAL' tag on the COLUMN object type; all EMAIL columns bearing the tag will use the policy automatically
- B) Write a Snowpark Python script that iterates over all tables and runs ALTER TABLE ALTER COLUMN SET MASKING POLICY
- C) Create a single secure view that unions all tables and applies the masking in the view definition
- D) Use the APPLY MASKING POLICY ... TO SCHEMA command to apply it to all columns in all tables at once

---

## Q100 (Single Answer)
What is the Snowflake recommended practice for transient tables in relation to GDPR data erasure?
- A) Use transient tables for PII data because they have no Fail-safe, reducing the maximum data persistence window after deletion
- B) Use transient tables for PII data because they encrypt data automatically with GDPR-compliant AES-512 encryption
- C) Avoid transient tables for PII; use permanent tables with DATA_RETENTION_TIME_IN_DAYS = 0 for better auditability
- D) Transient tables automatically send deletion notifications to the EU Data Protection Authority

---

## Q101 (Scenario)
A Security Engineer is designing a masking policy where the format of the masked value must match the original data type exactly (e.g., a DATE column should return a fake date, not NULL or a string). Why is data type matching important in masking policies?
- A) Snowflake will throw a type mismatch error if the masking policy returns a value of a different type than the column
- B) Type mismatches cause silent data corruption in downstream views
- C) Returning a different type bypasses Snowflake's masking enforcement mechanism
- D) Type mismatches are acceptable in Snowflake and are silently cast

---

## Q102 (Single Answer)
Which privilege must a role have on an external stage before it can use COPY INTO to load data from that stage?
- A) SELECT
- B) READ
- C) USAGE
- D) STAGE_ACCESS

---

## Q103 (Scenario)
A Security Engineer needs to grant Snowflake's data classification system permission to automatically classify and tag objects in a schema. Which privilege must be granted, and to which Snowflake system role/object?
- A) GRANT APPLY TAG ON ACCOUNT TO ROLE SYSADMIN
- B) The classification system requires APPLY TAG privilege on the database, and USAGE on the schema, granted to the SNOWFLAKE database's CLASSIFICATION_ADMIN role
- C) Grant the CLASSIFY privilege on the schema to the SNOWFLAKE.GOVERNANCE_VIEWER database role
- D) No explicit grant is needed; the ACCOUNTADMIN role can always run SYSTEM$CLASSIFY

---

## Q104 (Single Answer)
In Snowflake, what is the effect of running UNDROP TABLE?
- A) It restores a table that was dropped within the Time Travel retention period
- B) It restores a table from Fail-safe, requiring Snowflake Support approval
- C) It recreates a table from a backup file stored in the internal stage
- D) UNDROP TABLE is not a valid Snowflake SQL command

---

## Q105 (Scenario)
A company stores customer data in Snowflake and uses replication to maintain a secondary account. The company's masking policies, network policies, and row-access policies must be replicated. Which step ensures these policies are included in the failover group?
- A) Create the failover group with OBJECT_TYPES = 'POLICIES, NETWORK POLICIES'
- B) Add POLICIES to the OBJECT_TYPES list of the replication or failover group; this includes masking policies, row-access policies, and projection policies
- C) Policies are always automatically included in any replication group
- D) Use CLONE DATABASE to replicate security policies; the failover group handles only data

---

## Q106 (Single Answer)
What does Snowflake's ACCOUNT_USAGE.TAG_REFERENCES view show?
- A) A list of all tags and their definitions
- B) The current associations between tags and Snowflake objects (tables, columns, schemas, etc.)
- C) A history of all tag changes including set and unset events
- D) The tag inheritance hierarchy for a given database

---

## Q107 (Scenario)
A Security Engineer needs to classify data in a Snowflake schema and apply masking policies automatically. They run SYSTEM$CLASSIFY(). After classification, which tag must be checked to identify columns classified as PII by the automatic classifier?
- A) SNOWFLAKE.CORE.PII
- B) SNOWFLAKE.CORE.PRIVACY_CATEGORY = 'IDENTIFIER'
- C) SNOWFLAKE.SENSITIVITY.HIGH
- D) AUTOMATIC.PII_FLAG

---

## Q108 (Single Answer)
Which Snowflake parameter, when set at the user level, prevents a specific user from downloading query results via Snowsight?
- A) PREVENT_UNLOAD_TO_INLINE_URL (set on the user)
- B) ALLOW_RESULT_DOWNLOAD = FALSE (set on the user)
- C) There is no user-level parameter; this is an account-level setting only
- D) DISABLE_RESULT_DOWNLOAD = TRUE (set on the user)

---

## Q109 (Scenario)
A Security Engineer is implementing a data sharing strategy. The provider wants to share a table with sensitive data but only expose de-identified rows (rows where IS_SENSITIVE = FALSE). Which design achieves this without exposing the raw table to consumers?
- A) Apply a row-access policy to the shared table that filters rows where IS_SENSITIVE = TRUE
- B) Create a secure view (CREATE OR REPLACE SECURE VIEW) that filters WHERE IS_SENSITIVE = FALSE and share the view instead of the table
- C) Use projection policies on the IS_SENSITIVE column to hide it from consumers
- D) Grant SELECT on the table to the share with a WHERE clause

---

## Q110 (Single Answer)
In Snowflake, what is the primary difference between a secure view and a regular view when used for data sharing?
- A) Secure views encrypt the data before returning it to the consumer
- B) Secure views prevent consumers from seeing the view's DDL (definition), protecting the underlying logic from reverse engineering
- C) Secure views are required for data sharing; regular views cannot be shared
- D) Secure views disable masking policies to ensure data is fully visible to consumers

---

## Q111 (Scenario)
A Security Engineer must configure Snowflake to prevent analysts from inferring individual salaries from the COMPENSATION table by running many targeted GROUP BY queries. Even though each query returns more than 5 rows, the analyst can narrow down individual salaries through repeated queries. Which Snowflake privacy feature addresses this threat?
- A) Aggregation policy with ENTITY_MINIMUM_COUNT = 5 to suppress small groups
- B) Differential privacy policy that adds calibrated noise to aggregate outputs, making repeated targeted queries statistically unreliable for individual inference
- C) Row-access policy filtering rows based on a query counter per user
- D) Projection policy hiding the SALARY column for analyst roles

---

## Q112 (Single Answer)
Which Snowflake feature allows a provider to share data that spans multiple databases within the same Snowflake account in a single share?
- A) Cross-database views
- B) REFERENCE_USAGE privilege granted on additional databases to the share
- C) Multi-database shares using OBJECT_TYPES = 'DATABASES' in the share definition
- D) Database replication to merge all databases before sharing

---

## Q113 (Scenario)
A Security Engineer needs to audit who has run queries against a sensitive table (FINANCIAL_RECORDS) in the past 30 days, including which columns were accessed. Which ACCOUNT_USAGE view and fields provide this information?
- A) ACCOUNT_USAGE.QUERY_HISTORY — parse QUERY_TEXT for column references
- B) ACCOUNT_USAGE.ACCESS_HISTORY with BASE_OBJECTS_ACCESSED containing the table and COLUMNS_ACCESSED listing accessed columns, filtered by QUERY_START_TIME and OBJECTS_MODIFIED
- C) ACCOUNT_USAGE.GRANTS_TO_ROLES showing SELECT grants on FINANCIAL_RECORDS
- D) ACCOUNT_USAGE.TABLE_ACCESS_HISTORY (a dedicated view for table-level access)

---

## Q114 (Single Answer)
When applying a masking policy to a view column in Snowflake, what is the relationship between the masking policy on the base table column and the masking policy on the view column?
- A) The view column masking policy always overrides the base table masking policy
- B) The base table masking policy always overrides the view column masking policy
- C) Both policies are applied simultaneously; the most restrictive result is used
- D) If a masking policy is applied to a view column, it replaces the base table masking policy for queries going through the view; both can coexist, with the view policy taking precedence for view access

---

## Q115 (Scenario)
A company has replicated its primary Snowflake account to a secondary account. After a failover test, the security team finds that row-access policies in the secondary account are not filtering data as expected. What is the most likely cause?
- A) Row-access policies do not replicate; they must be manually recreated in the secondary account
- B) The mapping table referenced by the row-access policy was not included in the replication group, so the policy logic cannot evaluate correctly
- C) Row-access policies require re-activation after failover using ALTER POLICY ... ENABLE
- D) Row-access policies are automatically disabled in secondary accounts until failover completes

---

## Q116 (Single Answer)
Which Snowflake built-in function can a masking policy use to test whether the current session has a role that is directly or indirectly granted a specific role?
- A) CURRENT_ROLE()
- B) IS_ROLE_IN_SESSION()
- C) HAS_PRIVILEGE()
- D) SYSTEM$HAS_ROLE()

---

## Q117 (Scenario)
A Security Engineer is implementing a data governance framework. They need to classify all tables in a schema and apply masking policies to PII columns. The team wants to minimize manual effort. Which Snowflake workflow is MOST efficient?
- A) Manually tag each PII column and apply masking policies individually using ALTER TABLE ALTER COLUMN
- B) Run SYSTEM$CLASSIFY() on the schema to auto-tag PII columns; create a tag-based masking policy linked to the PRIVACY_CATEGORY = 'IDENTIFIER' tag; all tagged columns are automatically masked
- C) Use a stored procedure to query INFORMATION_SCHEMA.COLUMNS for VARCHAR columns and apply masking
- D) Grant ACCOUNTADMIN to the data governance team so they can override all access controls manually

---

## Q118 (Single Answer)
What Snowflake feature ensures that a share consumer cannot access a view's underlying query logic (DDL)?
- A) Materialized views prevent DDL inspection
- B) Creating the view as SECURE using CREATE SECURE VIEW hides the DDL from non-owners
- C) Granting SELECT on the view without OWNERSHIP prevents DDL access
- D) Using an internal stage for the view definition prevents consumers from seeing it

---

## Q119 (Scenario)
A company needs to implement data governance for a multi-cloud Snowflake deployment (AWS and Azure accounts). They want masking policies and tags to be consistent across both accounts. What is the recommended approach?
- A) Manually duplicate masking policies in each account and synchronize them via a custom ETL pipeline
- B) Use Snowflake replication groups with OBJECT_TYPES including POLICIES to replicate masking policies and tags from the primary account to secondary accounts
- C) Create a shared Snowflake account that both AWS and Azure accounts read policies from
- D) Use the Snowflake Marketplace to publish masking policies as a shared data listing

---

## Q120 (Single Answer)
When a Snowflake row-access policy uses a subquery to check a mapping table, what permission does the role running the query need on the mapping table?
- A) No permission is needed; the policy evaluates with elevated (definer's) privileges
- B) The querying role needs SELECT on the mapping table for the row-access policy to evaluate
- C) The querying role needs OWNERSHIP of the mapping table
- D) The mapping table must be owned by SYSADMIN for the policy to reference it

---

## Q121 (Scenario)
A Security Engineer needs to share a subset of rows from the EMPLOYEE_DATA table (only rows where DEPARTMENT = 'SALES') with a partner organization. The partner should not know that other departments exist. Which Snowflake approach is MOST appropriate?
- A) Apply a row-access policy to EMPLOYEE_DATA filtering for DEPARTMENT = 'SALES' and share the table
- B) Create a secure view that filters WHERE DEPARTMENT = 'SALES' and share the view; the partner only sees SALES rows and cannot infer the view's definition due to secure view protections
- C) Share the full EMPLOYEE_DATA table with a data masking policy on the DEPARTMENT column
- D) Use a projection policy to hide the DEPARTMENT column so the partner cannot filter by department

---

## Q122 (Single Answer)
In Snowflake, which SQL syntax is used to bind a tag-based masking policy to a specific tag value?
- A) ALTER TAG my_tag SET MASKING POLICY my_policy
- B) ALTER MASKING POLICY my_policy SET TAG my_tag = 'value'
- C) CREATE MASKING POLICY my_policy LINKED TO TAG my_tag = 'value'
- D) ALTER TAG my_tag SET MASKING POLICY my_policy FOR VALUES ('value')

---

## Q123 (Scenario)
A company uses Snowflake for genomic research data. The data includes individual genome sequences that are inherently identifying. Sharing raw sequences with collaborators violates participant privacy. Which Snowflake privacy-preserving feature can generate statistically similar but non-identifying genomic-like data for algorithm testing?
- A) External Tokenization to replace genome sequences with tokens
- B) GENERATE_SYNTHETIC_DATA to create synthetic genomic datasets that preserve statistical distributions without exposing real sequences
- C) Dynamic Data Masking that replaces genome sequences with random strings
- D) Differential privacy policies that add noise to every sequence character

---

## Q124 (Single Answer)
What is the Snowflake Fail-safe retention period for permanent tables on Enterprise and higher editions?
- A) 1 day
- B) 3 days
- C) 7 days
- D) 14 days

---

## Q125 (Scenario)
A Security Engineer is designing a masking policy for a multi-tenant SaaS application where each tenant has a unique TENANT_ID. Data analysts at Tenant A must never see Tenant B's data. Each analyst has a Snowflake user attribute (TENANT attribute in a user mapping table) that identifies their tenant. Which masking approach correctly enforces tenant isolation?
- A) Use CURRENT_USER() in the masking policy to look up the user's tenant in a mapping table and mask or null rows belonging to other tenants
- B) Apply a row-access policy (not masking) that returns TRUE only when the row's TENANT_ID matches the current user's tenant from the mapping table
- C) Use CURRENT_ROLE() to identify the tenant and apply masking based on the role name
- D) Use projection policies to hide the TENANT_ID column from all analysts

---

## Q126 (Single Answer)
When Snowflake's automatic data classification is run, which classification profile is used by default?
- A) The SNOWFLAKE_CLASSIFICATION_PROFILE system profile
- B) No profile is used by default; administrators must define a profile before running classification
- C) The CUSTOM_CLASSIFICATION_PROFILE defined by the account administrator
- D) The DEFAULT_SECURITY_PROFILE assigned to the SECURITYADMIN role

---

## Q127 (Scenario)
A Security Engineer discovers that a row-access policy on the TRANSACTIONS table is causing significant performance degradation. The policy uses a complex multi-join subquery against several mapping tables. Which optimization approach is RECOMMENDED?
- A) Replace the row-access policy with a Dynamic Data Masking policy to improve performance
- B) Pre-compute the access mapping into a simplified table with one column per user, then rewrite the policy to use a single lookup against this materialized mapping
- C) Disable the row-access policy during peak business hours using a scheduled task
- D) Use caching by storing the user-access mapping in a result cache accessible by the row-access policy

---

## Q128 (Single Answer)
What is the Snowflake recommended approach for ensuring that GDPR erasure requests can be handled efficiently?
- A) Store PII in a single table with DATA_RETENTION_TIME_IN_DAYS = 0 and transient table type
- B) Store PII in clearly identified, tagged tables with short Time Travel retention; delete records by primary key and document that Fail-safe data is not user-accessible (only Snowflake Support)
- C) Encrypt PII columns using Tri-Secret Secure with a per-user key; revoke the user's key for erasure
- D) Store PII only in external stages so that files can be directly deleted without Time Travel or Fail-safe implications

---

## Q129 (Scenario)
A Security Engineer needs to implement a data governance solution where: (1) new tables are auto-classified; (2) masking policies are auto-applied to PII columns; (3) compliance reports show all PII coverage. Which Snowflake workflow achieves all three goals?
- A) Use SYSTEM$CLASSIFY() on a schedule via Snowflake tasks to auto-tag; tag-based masking policies auto-apply masking to PRIVACY_CATEGORY = 'IDENTIFIER' tagged columns; query TAG_REFERENCES for coverage reports
- B) Use Snowflake Trust Center to classify and mask PII; export reports as CSV
- C) Write stored procedures that run ALTER COLUMN SET MASKING POLICY for each classified column weekly
- D) Use Snowflake Data Quality Monitors to detect PII and trigger an alert for manual masking application

---

## Q130 (Single Answer)
Which Snowflake SQL command removes a masking policy from a column?
- A) REVOKE MASKING POLICY policy_name FROM TABLE t COLUMN c
- B) ALTER TABLE t ALTER COLUMN c UNSET MASKING POLICY
- C) DROP MASKING POLICY FROM COLUMN t.c
- D) ALTER COLUMN t.c REMOVE MASKING POLICY policy_name

---

## Q131 (Scenario)
A Security Engineer at a financial firm wants to ensure that data analysts cannot see account numbers in reports but the compliance team can. They implement a masking policy using CURRENT_ROLE(). However, analysts can bypass the masking by granting themselves the COMPLIANCE_OFFICER role. What additional control prevents role abuse?
- A) Use IS_ROLE_IN_SESSION() instead of CURRENT_ROLE() so the policy evaluates the active primary role only
- B) Restrict who can grant the COMPLIANCE_OFFICER role using RBAC — only SECURITYADMIN can grant COMPLIANCE_OFFICER; analysts should not have WITH GRANT OPTION on that role
- C) Apply a session policy preventing analysts from using USE ROLE COMPLIANCE_OFFICER
- D) Enable Tri-Secret Secure so that COMPLIANCE_OFFICER's key is needed to decrypt data

---

## Q132 (Single Answer)
What happens to a masking policy when the table it is applied to is cloned using CREATE TABLE ... CLONE?
- A) The clone does not inherit the masking policy; it must be manually applied
- B) The clone inherits the masking policy reference; the same policy applies to the cloned table's column
- C) A new independent masking policy is automatically created for the clone
- D) Cloning a table with masking policies requires ACCOUNTADMIN approval

---

## Q133 (Scenario)
A company is implementing Snowflake replication for a Business Critical account. After enabling replication, the security team discovers that the secondary account does not have the AUTHENTICATION POLICIES that were created in the primary. What must be changed?
- A) Authentication policies replicate automatically with users; no change is needed
- B) Add AUTHENTICATION POLICIES to the OBJECT_TYPES in the replication or failover group definition
- C) Manually export and import authentication policies using GET_DDL
- D) Authentication policies cannot be replicated; they must be maintained independently in each account

---

## Q134 (Single Answer)
In Snowflake, which view provides a real-time (or near-real-time) snapshot of all current tag assignments — as opposed to ACCOUNT_USAGE views which have a latency of up to several hours?
- A) ACCOUNT_USAGE.TAG_REFERENCES
- B) INFORMATION_SCHEMA.TAG_REFERENCES
- C) SNOWFLAKE.CORE.TAG_REGISTRY
- D) INFORMATION_SCHEMA.APPLICABLE_TAGS

---

## Q135 (Scenario)
A Security Engineer is preparing for a compliance audit. The auditor requires a list of all columns in the PROD database that are tagged as containing PII, along with their masking policy status. Which query provides this information most efficiently?
- A) JOIN ACCOUNT_USAGE.TAG_REFERENCES with ACCOUNT_USAGE.POLICY_REFERENCES filtered on TAG_NAME = 'PRIVACY_CATEGORY' AND TAG_VALUE = 'IDENTIFIER'
- B) SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE '%SSN%'
- C) SELECT * FROM ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE PRIVILEGE = 'SELECT' AND OBJECT_TYPE = 'TABLE'
- D) Query ACCOUNT_USAGE.QUERY_HISTORY for queries that access PII columns

---

## Q136 (Single Answer)
What is the Snowflake recommendation for transient vs. permanent table usage in a production data warehouse?
- A) Always use transient tables in production to save storage costs
- B) Use permanent tables for data requiring recovery capabilities (Time Travel and Fail-safe); use transient tables only for staging/ETL intermediate data where recovery is handled externally
- C) Use transient tables for all tables since they are faster due to no overhead
- D) Permanent tables are required for tables with masking policies; transient tables cannot use data governance features

---

## Q137 (Scenario)
A data steward needs to visualize how a sensitive field (SOCIAL_SECURITY_NUMBER) flows from its source table through ETL transformations into downstream reporting views. Which Snowflake feature enables this column-level lineage tracing?
- A) Snowflake Trail column-level audit
- B) ACCOUNT_USAGE.ACCESS_HISTORY with BASE_OBJECTS_ACCESSED and DIRECT_OBJECTS_ACCESSED, combined with ACCOUNT_USAGE.OBJECT_DEPENDENCIES for structural lineage
- C) ACCOUNT_USAGE.QUERY_HISTORY with QUERY_TEXT parsing for column mentions
- D) Snowflake Data Catalog column profiling tool

---

## Q138 (Single Answer)
What is the purpose of the SNOWFLAKE.DATA_PRIVACY namespace in Snowflake?
- A) It contains stored procedures for data anonymization, tokenization, and synthetic data generation
- B) It is the schema that stores masking policy definitions for the account
- C) It provides the row-access policy evaluation engine
- D) It is the default schema for encryption key management

---

## Q139 (Scenario)
A Security Engineer must configure an account-level parameter to prevent any Snowflake user from running COPY INTO <external_stage> commands that write to non-approved locations. Which account parameter achieves this?
- A) PREVENT_UNLOAD_TO_EXTERNAL_STAGE = TRUE
- B) RESTRICT_EXTERNAL_UNLOAD = TRUE
- C) Use a network policy blocking outbound connections to non-approved object storage
- D) PREVENT_UNLOAD_TO_UNAPPROVED_STAGES = TRUE

---

## Q140 (Single Answer)
In Snowflake's data sharing security model, when a provider shares a secure view, can the consumer see the underlying SELECT statement of the view?
- A) Yes, if the consumer has SELECT on the share objects
- B) No; a SECURE VIEW hides the DDL from all non-owners, including share consumers
- C) Only if the consumer has IMPORTED PRIVILEGES on the shared database
- D) Yes, because shared objects are publicly inspectable for transparency

---

## Q141 (Scenario)
A Security Engineer is reviewing Snowflake's capabilities for a financial services client. The client stores credit card numbers and needs to comply with PCI DSS. They want to ensure that Snowflake's storage encryption meets PCI DSS requirements. Which statement BEST describes Snowflake's encryption posture for PCI DSS?
- A) Snowflake is not PCI DSS compliant; it uses proprietary encryption methods not recognized by PCI DSS
- B) Snowflake is PCI DSS compliant on Business Critical edition; all data at rest is encrypted with AES-256, and Tri-Secret Secure adds an additional key management layer
- C) Snowflake automatically tokenizes credit card data to ensure PCI DSS compliance
- D) PCI DSS compliance requires client-side encryption before data enters Snowflake; Snowflake's server-side encryption is insufficient

---

## Q142 (Single Answer)
Which Snowflake SQL command is used to describe a masking policy and view its body (the masking expression)?
- A) SHOW MASKING POLICIES
- B) DESCRIBE MASKING POLICY policy_name
- C) SELECT GET_DDL('MASKING POLICY', 'policy_name')
- D) EXPLAIN MASKING POLICY policy_name

---

## Q143 (Scenario)
A company needs to implement differential privacy in Snowflake to protect individual employee salary data from inference attacks. After creating a differential privacy policy, the Security Engineer notices that queries returning large aggregates (>1000 rows) show very little noise, while queries targeting 5 rows show significant noise. Is this expected behavior?
- A) No; noise should be uniform regardless of aggregate size — the policy is misconfigured
- B) Yes; in differential privacy, noise is calibrated proportionally to the sensitivity of the query; queries targeting smaller groups receive more noise relative to the result to maintain the same privacy guarantee
- C) No; differential privacy in Snowflake always adds fixed absolute noise regardless of group size
- D) Yes; Snowflake scales noise based on credit consumption, not query sensitivity

---

## Q144 (Single Answer)
In a Snowflake replication group, which OBJECT_TYPE keyword is used to include DATABASE objects (tables, schemas, views) for replication?
- A) DATA
- B) TABLES
- C) DATABASES
- D) SCHEMAS

---

## Q145 (Scenario)
A Security Engineer must ensure that when Snowflake's Time Travel data is accessed post-incident for forensic purposes, the access itself does not alter the evidence (principle of non-repudiation). Which Snowflake capability ensures that Time Travel access is read-only and audit-logged?
- A) Time Travel queries are inherently read-only (SELECT only); they cannot modify historical data; all queries including Time Travel queries are logged in ACCOUNT_USAGE.QUERY_HISTORY
- B) Time Travel requires a special FORENSIC_READ privilege that creates an immutable audit trail
- C) Time Travel data is stored in write-once append-only storage, guaranteeing non-repudiation
- D) Time Travel access is only permitted to ACCOUNTADMIN to prevent unauthorized forensic reads

---

## Q146 (Single Answer)
Which Snowflake feature allows an organization to grant a Native App consumer specific privileges scoped to the application's own objects, without granting access to the consumer's other Snowflake objects?
- A) Application account roles
- B) Application roles defined in the Native App manifest, granted to consumer roles for scoped access
- C) Shared database roles granted via data sharing
- D) Consumer-side network policies scoped to the application

---

## Q147 (Scenario)
A Security Engineer is asked to implement masking that ensures SSNs stored as VARCHAR(11) are masked to show only the last 4 digits (e.g., '123-45-6789' becomes '***-**-6789'). The masked value must still be VARCHAR(11) to avoid breaking downstream views. Which masking expression is correct?
- A) CONCAT('***-**-', RIGHT(val, 4))
- B) REGEXP_REPLACE(val, '[0-9](?=[0-9-]{5})', '*')
- C) CONCAT('***-**-', SUBSTR(val, 8, 4))
- D) OVERLAY(val PLACING '***-**-' FROM 1 FOR 7)

---

## Q148 (Single Answer)
What is the purpose of the SNOWFLAKE.CORE.PRIVACY_CATEGORY tag assigned by Snowflake's automatic data classification?
- A) It marks columns for encryption by Tri-Secret Secure
- B) It classifies the privacy risk of a column (e.g., IDENTIFIER, QUASI_IDENTIFIER, SENSITIVE) to inform governance decisions
- C) It applies a row-access policy to the tagged column
- D) It sets the masking policy to NULL for tagged columns automatically

---

## Q149 (Scenario)
A company wants to use Snowflake Data Clean Rooms to run a customer overlap analysis with a partner. After configuring the clean room, the provider engineer needs to verify that the partner cannot access the raw customer table directly — only via the approved analysis template. Which security mechanism within the clean room enforces this?
- A) A network policy preventing the partner's account from reaching the provider's tables
- B) The clean room's secure object model — analysis templates are secure stored procedures that return only aggregate results; raw tables are not shared directly
- C) A row-access policy on the raw customer table filtering all rows for the partner's role
- D) Tri-Secret Secure on the provider's account preventing the partner from decrypting raw data

---

## Q150 (Single Answer)
Which Snowflake view in ACCOUNT_USAGE should a Security Engineer query to audit all changes to row-access policies — including when they were created, altered, or dropped?
- A) ACCOUNT_USAGE.POLICY_HISTORY
- B) ACCOUNT_USAGE.ROW_ACCESS_POLICY_REFERENCES
- C) ACCOUNT_USAGE.QUERY_HISTORY (filtering for DDL on ROW ACCESS POLICY)
- D) ACCOUNT_USAGE.POLICY_REFERENCES
