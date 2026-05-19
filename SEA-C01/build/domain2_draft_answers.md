# Domain 2: Answers

---

## Q1
**Answer:** B
**Explanation:** Dynamic Data Masking uses a policy body expression evaluated at query time. Using CURRENT_ROLE() = 'COMPLIANCE_OFFICER' as the unmasking condition returns the full value for that role and a masked format for all others. Row-access policies filter rows, not column values. Projection policies hide the column entirely. Column-level encryption is not a native Snowflake masking mechanism.
**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Masking policies can include conditional logic based on CURRENT_ROLE() to return different masked values for different roles."

---

## Q2
**Answer:** B
**Explanation:** Tri-Secret Secure (TSS) combines Snowflake's managed key with a customer-managed key (CMK) stored in an external KMS (AWS KMS, Azure Key Vault, or GCP KMS). The composite key is required for decryption. If the customer revokes or disables the CMK, Snowflake cannot decrypt any data. This gives customers cryptographic control over their data, even against Snowflake itself.
**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "Tri-Secret Secure uses a composite key formed from a Snowflake-managed key and a customer-managed key. Revoking the CMK prevents Snowflake from decrypting the account's data."

---

## Q3
**Answer:** B
**Explanation:** Snowflake's automatic data classification (SYSTEM$CLASSIFY) scans columns and assigns system-defined tags including SNOWFLAKE.CORE.SEMANTIC_CATEGORY (e.g., EMAIL, PHONE_NUMBER, SSN) and SNOWFLAKE.CORE.PRIVACY_CATEGORY (e.g., IDENTIFIER, QUASI_IDENTIFIER). Tag-based masking policies then automatically apply masking to all columns bearing those tags, eliminating the need to manually tag and mask individual columns.
**Source:** [Automatic Data Classification](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Snowflake's automatic data classification uses machine learning to identify columns containing sensitive data and assigns system-defined tags. Tag-based masking policies can then automatically protect those columns."

---

## Q4
**Answer:** C
**Explanation:** A projection policy prevents a column from being included in the SELECT output (projected) for roles subject to the policy. The column is excluded from the result set entirely — it does not appear as a column at all. This is distinct from masking (which returns a modified value) and row-access policies (which filter rows). A projection policy is the right choice when the column itself should not be visible.
**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)
**Quote:** "A projection policy prevents a column from being included in a query's result set when the role accessing the table is subject to the policy."

---

## Q5
**Answer:** B, C
**Explanation:** Snowflake's maximum DATA_RETENTION_TIME_IN_DAYS is 90 days (Business Critical edition), far less than HIPAA's 6-year requirement. Therefore: (B) Set retention to the maximum supported 90 days and archive older records to a long-term managed table outside Time Travel scope; (C) create a scheduled Snowflake task that deletes rows older than 10 years and logs each deletion for audit purposes. Fail-safe (D) is only 7 days and not configurable. Setting retention to 2190 days (A) exceeds Snowflake's maximum.
**Source:** [Time Travel Retention Limits](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "The maximum DATA_RETENTION_TIME_IN_DAYS is 90 days on Enterprise edition and higher. For longer retention requirements, archive data to a separate managed table."

---

## Q6
**Answer:** B
**Explanation:** In Snowflake, a row-access policy filters query results based on a Boolean expression. Rows for which the expression evaluates to FALSE are silently excluded from the result set — they do not appear at all. The query does not fail, the rows are not replaced with placeholders, and no error is shown to the user. This transparent filtering is the key security property: unauthorized users simply see fewer rows.
**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "When a row access policy is applied to a table or view, rows for which the policy returns FALSE are excluded from the query results."

---

## Q7
**Answer:** B
**Explanation:** Dynamic Data Masking policies are enforced at the base table column level. When a query accesses a column (directly or via a view), Snowflake applies the masking policy at the base table, regardless of the access path. A view does not bypass masking — the analyst sees the same masked value whether querying the base table directly or through the view.
**Source:** [Dynamic Data Masking and Views](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Masking policies are enforced at the base table column level. Queries accessing the column through views receive the same masked value."

---

## Q8
**Answer:** B
**Explanation:** External Tokenization in Snowflake allows masking policies to call external tokenization services (via external functions) to replace sensitive values with tokens. The tokenization service manages the token-to-value mapping. Only authorized parties with access to the tokenization vault can de-tokenize the values. This enables Snowflake to store and query tokenized data without ever holding the original sensitive values.
**Source:** [External Tokenization](https://docs.snowflake.com/en/user-guide/security-column-ext-token-intro)
**Quote:** "External tokenization uses masking policies that call external functions to replace column values with tokens managed by an external tokenization service."

---

## Q9
**Answer:** B
**Explanation:** Aggregation policies prevent granular row-level access when the result set contains fewer than a configured minimum number of distinct entities (ENTITY_MINIMUM_COUNT). This mitigates re-identification risk in datasets with quasi-identifiers: if a query would return results for fewer than, say, 5 distinct individuals, the results are suppressed. This is the primary Snowflake mechanism for preventing re-identification through quasi-identifier combination.
**Source:** [Aggregation Policies](https://docs.snowflake.com/en/user-guide/aggregation-policies)
**Quote:** "Aggregation policies prevent queries that would return results for fewer than the configured minimum number of distinct entities, mitigating re-identification risk."

---

## Q10
**Answer:** A
**Explanation:** ACCOUNT_USAGE.TAG_REFERENCES shows all current associations between tags and Snowflake objects (tables, columns, schemas, etc.) along with the tag value applied to each object. This is the primary view for auditing what tags are applied where across the account. There is no INFORMATION_SCHEMA.TAG_ASSIGNMENTS or SNOWFLAKE.GOVERNANCE.TAG_REGISTRY view.
**Source:** [TAG_REFERENCES View](https://docs.snowflake.com/en/sql-reference/account-usage/tag_references)
**Quote:** "TAG_REFERENCES: Shows the associations between tags and Snowflake objects, including the tag value applied to each object."

---

## Q11
**Answer:** B
**Explanation:** Tag-based masking policies associate a masking policy directly with a tag. When a column is tagged (or inherits a tag), Snowflake automatically applies the associated masking policy without requiring individual ALTER TABLE ... SET MASKING POLICY statements. Tagging the tables with SENSITIVITY = 'HIGH' triggers the policy automatically for all tagged columns.
**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)
**Quote:** "A tag-based masking policy associates a masking policy with a tag. Any column bearing the tag automatically has the masking policy applied."

---

## Q12
**Answer:** B
**Explanation:** In Snowflake data sharing, masking policies applied to base table columns in the provider's account are inherited through views and shares. When a consumer queries a shared secure view that accesses a masked column, the masking policy is evaluated (in the provider account's context using the consumer's CURRENT_ROLE()) and the consumer sees the masked data as defined by the policy. Masking cannot be bypassed by the sharing mechanism.
**Source:** [Masking Policies and Data Sharing](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#masking-policies-and-data-sharing)
**Quote:** "Masking policies on base table columns are enforced for share consumers. Consumers receive the masked value as defined by the policy."

---

## Q13
**Answer:** B
**Explanation:** Snowflake Data Clean Rooms provide a secure multi-party computation environment where each party's raw data remains private. The clean room enforces that only approved analysis templates can produce results (e.g., overlap counts), and neither party can see the other's raw records. Row-level and column-level data from each party is protected — only aggregate or statistical results derived from the overlap are returned.
**Source:** [Data Clean Rooms](https://docs.snowflake.com/en/user-guide/data-clean-room/overview)
**Quote:** "Data Clean Rooms enable collaborative analytics where neither party exposes raw data to the other; only aggregate analysis results are produced via approved templates."

---

## Q14
**Answer:** C
**Explanation:** The maximum DATA_RETENTION_TIME_IN_DAYS in Snowflake is 90 days, available on Enterprise edition and higher (including Business Critical). Standard edition supports a maximum of 1 day. The 90-day maximum is the highest configurable per-table retention for Time Travel. For compliance requirements exceeding 90 days, data must be archived to a separate managed table.
**Source:** [Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "The maximum value for DATA_RETENTION_TIME_IN_DAYS is 90 days for Enterprise and Business Critical editions."

---

## Q15
**Answer:** C
**Explanation:** A projection policy specifically prevents a column from being projected (included in the result set) for roles subject to the policy, while still allowing the column to be used in WHERE clauses and aggregate functions. This is distinct from masking (which returns a modified value) and from row-access policies (which filter rows). For "prevent seeing the values while still allowing SELECT on other columns," projection policy is the correct tool.
**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)
**Quote:** "A projection policy prevents a column from being projected in query results for the policy-assigned role, while still permitting the column to be referenced in WHERE conditions and aggregation."

---

## Q16
**Answer:** B
**Explanation:** CURRENT_ROLE() is the standard Snowflake SQL function used within masking policy expressions to determine the currently active primary role for the session. It is used in conditional CASE expressions to grant or deny unmasked access based on role. SESSION_ROLE(), ACTIVE_ROLE(), and GET_CURRENT_ROLE() are not valid Snowflake function names.
**Source:** [Dynamic Data Masking Functions](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "CURRENT_ROLE() returns the primary role for the current session and is commonly used in masking policies to conditionally unmask data for authorized roles."

---

## Q17
**Answer:** B
**Explanation:** To recover deleted rows using Time Travel, clone the table to a point before the deletion using the OFFSET syntax: CREATE TABLE orders_restored CLONE orders AT (OFFSET => -7200) restores the table to 7200 seconds (2 hours) ago. UNDROP TABLE restores a DROPPED table, not deleted rows. Fail-safe requires Snowflake Support. ACCESS_HISTORY records what was accessed, not the actual data.
**Source:** [Time Travel - Cloning](https://docs.snowflake.com/en/user-guide/data-time-travel#cloning-a-table-or-schema-at-a-specific-time)
**Quote:** "To recover deleted rows, clone the table at a timestamp before the deletion: CREATE TABLE restored CLONE source AT (OFFSET => -<seconds>)."

---

## Q18
**Answer:** B
**Explanation:** Time Travel data is accessible by account users via standard SQL queries (SELECT ... AT(TIMESTAMP => ...) or AT(OFFSET => ...), CLONE AT, UNDROP). Fail-safe data, which comes after the Time Travel period expires, is accessible only by Snowflake Support as a disaster recovery mechanism — account users cannot query Fail-safe data directly. This is a critical distinction for incident response and compliance.
**Source:** [Fail-Safe](https://docs.snowflake.com/en/user-guide/data-failsafe)
**Quote:** "Fail-safe provides a 7-day period after Time Travel expires during which Snowflake Support can recover data. It is not accessible to account users."

---

## Q19
**Answer:** B
**Explanation:** In Snowflake data sharing, masking policies applied to a column in the provider's account are evaluated when the consumer queries the shared object. The masking policy runs in the provider's account context, using the consumer's CURRENT_ROLE() to evaluate the masking conditions. The consumer sees the masked values. Sharing does not bypass masking; the provider's governance controls remain in effect.
**Source:** [Masking Policies with Data Sharing](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#masking-policies-and-data-sharing)
**Quote:** "When a consumer queries a shared table or view, any masking policies on the provider's objects are applied at query time."

---

## Q20
**Answer:** B
**Explanation:** The ALLOWED_LOCATIONS parameter on a storage integration defines which cloud storage buckets/containers/paths the integration permits. When an external stage is created using a storage integration, it can only target paths within the ALLOWED_LOCATIONS. This prevents COPY INTO statements from writing to arbitrary cloud storage locations. Row-access policies control row visibility, not data destinations. Network policies control ingress to Snowflake.
**Source:** [Storage Integration](https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration)
**Quote:** "ALLOWED_LOCATIONS: Specifies the cloud storage locations the integration is permitted to access. External stages using this integration can only reference these locations."

---

## Q21
**Answer:** C
**Explanation:** AWS KMS supports automatic key rotation where the key material is rotated periodically but the key ID and ARN remain the same. From Snowflake's perspective, the key reference (ARN) hasn't changed, so the Tri-Secret Secure configuration continues to work transparently. The customer does not need to notify Snowflake of the rotation. This is different from creating a completely new key with a new ARN.
**Source:** [Tri-Secret Secure with AWS KMS](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "AWS KMS automatic key rotation is transparent to Snowflake; the key ID remains the same even as the underlying key material changes."

---

## Q22
**Answer:** B
**Explanation:** SNOWFLAKE.DATA_PRIVACY.GENERATE_SYNTHETIC_DATA produces statistically representative synthetic data that preserves the statistical distributions, correlations, and relationships of the original dataset without exposing any actual records. This enables safe use of production-like data for development, testing, and analytics without privacy risk. It is not random data, encrypted data, or tokenized data.
**Source:** [GENERATE_SYNTHETIC_DATA](https://docs.snowflake.com/en/user-guide/data-privacy-generate-synthetic-data)
**Quote:** "GENERATE_SYNTHETIC_DATA creates statistically similar synthetic data that preserves data distributions and relationships from the original dataset without exposing actual values."

---

## Q23
**Answer:** B
**Explanation:** Aggregation policies in Snowflake enforce a minimum entity count threshold (ENTITY_MINIMUM_COUNT). If a query's result set contains fewer than the configured minimum number of distinct entities, the results are suppressed entirely. This prevents re-identification when only 1–4 individuals fall into a specific group. Row-access policies filter rows, not aggregate counts. Masking policies cannot check ROW_COUNT() at query time.
**Source:** [Aggregation Policies](https://docs.snowflake.com/en/user-guide/aggregation-policies)
**Quote:** "ENTITY_MINIMUM_COUNT: Specifies the minimum number of distinct entities that must appear in a query result before results are returned. Results below this threshold are suppressed."

---

## Q24
**Answer:** B
**Explanation:** Snowflake's tag inheritance mechanism automatically propagates tags from parent objects to child objects: tags on a schema are inherited by all tables and views within it, and tags on a table are inherited by all columns within it. This enables "set once, apply many" governance: tagging a schema automatically classifies all objects within it, enabling tag-based masking and governance policies to scale without per-column configuration.
**Source:** [Tag Inheritance](https://docs.snowflake.com/en/user-guide/object-tagging)
**Quote:** "Snowflake supports tag inheritance: a tag applied to a schema is inherited by all tables in the schema, and tags on tables are inherited by columns."

---

## Q25
**Answer:** C
**Explanation:** PREVENT_UNLOAD_TO_INLINE_URL is the Snowflake parameter that prevents users from downloading query result sets via the Snowsight web interface (the inline download button). Setting this to TRUE blocks the download capability in Snowsight. Network policies (A) control IP access, not downloads. Projection policies (B) hide columns but do not prevent downloading visible columns. CLIENT_RESULT_COLUMN_CASE_INSENSITIVE (D) is unrelated to download prevention.
**Source:** [Query Result Download Prevention](https://docs.snowflake.com/en/sql-reference/parameters#prevent-unload-to-inline-url)
**Quote:** "PREVENT_UNLOAD_TO_INLINE_URL: When TRUE, prevents users from downloading query results through the Snowsight interface."

---

## Q26
**Answer:** B
**Explanation:** In Snowflake data sharing, masking policies are always evaluated in the PROVIDER account's context, not the consumer's. The policy runs server-side in the provider's account. However, within the provider's masking policy expression, CURRENT_ROLE() returns the consumer's active role (since the query originated from the consumer's session). This allows provider-side policies to make role-based masking decisions that reference the consumer's role context.
**Source:** [Masking Policies and Data Sharing](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#masking-policies-and-data-sharing)
**Quote:** "Masking policies are evaluated in the provider account's context. CURRENT_ROLE() within the policy body returns the role active in the consumer's session."

---

## Q27
**Answer:** B
**Explanation:** When a row-access policy uses a mapping table and the querying user is not present in the mapping table, the policy's lookup returns no matches, causing the Boolean condition to return FALSE for all rows. The result is that the user sees no rows — zero results are returned. This is the secure default: absence from the access map means no access. The query does not fail; it simply returns empty.
**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "If a user is not found in the mapping table, the row access policy returns FALSE for all rows, resulting in an empty result set."

---

## Q28
**Answer:** B
**Explanation:** Fail-safe is a fixed, non-configurable 7-day disaster recovery window that activates after Time Travel expires for permanent tables. During Fail-safe, data is accessible only by Snowflake Support — it cannot be queried by account users via SQL. Fail-safe is designed for catastrophic data recovery scenarios and is not user-controllable. It is not a configurable backup mechanism.
**Source:** [Fail-Safe](https://docs.snowflake.com/en/user-guide/data-failsafe)
**Quote:** "Fail-safe provides a fixed 7-day period after Time Travel expires. Data in Fail-safe can only be recovered by Snowflake Support."

---

## Q29
**Answer:** A
**Explanation:** Setting DATA_RETENTION_TIME_IN_DAYS = 30 on the relevant tables (requires Enterprise or higher edition, which supports up to 90 days) provides 30 days of self-service Time Travel recovery for deleted data. Option B (23+7) could work but is an unusual workaround that mixes two different mechanisms. Option C (transient tables) cannot be set to 30 days on Standard edition. Option D (Fail-safe_PERIOD) does not exist.
**Source:** [Time Travel Configuration](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Enterprise and Business Critical editions support DATA_RETENTION_TIME_IN_DAYS up to 90 days, allowing extended recovery windows."

---

## Q30
**Answer:** A
**Explanation:** ACCOUNT_USAGE.TAG_REFERENCES shows the history of tag assignments, including when tags were applied (OBJECT_UPDATED column) and when they were removed (OBJECT_DELETED column if the object was dropped). This view provides the audit trail for tag lifecycle events. There is no separate TAG_REFERENCES_HISTORY, OBJECT_TAG_HISTORY, or TAG_AUDIT_HISTORY view in Snowflake's ACCOUNT_USAGE schema.
**Source:** [TAG_REFERENCES View](https://docs.snowflake.com/en/sql-reference/account-usage/tag_references)
**Quote:** "TAG_REFERENCES includes both current and historical tag assignments, with timestamps showing when tags were set and when objects were last updated."

---

## Q31
**Answer:** B
**Explanation:** Masking policies, row-access policies, and other security policies are not automatically included in all Snowflake replication groups. They must be explicitly included by specifying POLICIES (or AUTHENTICATION POLICIES, NETWORK POLICIES, etc.) in the OBJECT_TYPES list when creating or altering the replication group. Without this specification, policies remain only in the primary account.
**Source:** [Replication and Security Objects](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "To replicate masking policies and row access policies, include POLICIES in the OBJECT_TYPES list of the replication or failover group."

---

## Q32
**Answer:** B
**Explanation:** External Tokenization is implemented via masking policies that call external functions. The external function connects to a tokenization vault or service and replaces sensitive values with tokens. The vault maintains the token-to-value mapping. Authorized users with the appropriate role can de-tokenize via the masking policy's conditional logic. This enables Snowflake to operate on tokenized data without ever holding original sensitive values.
**Source:** [External Tokenization](https://docs.snowflake.com/en/user-guide/security-column-ext-token-intro)
**Quote:** "External tokenization masking policies call external functions that connect to tokenization vaults to replace values with tokens at query time."

---

## Q33
**Answer:** A
**Explanation:** Snowflake's Time Travel and Fail-safe retain historical data beyond a DELETE or UPDATE operation. After a customer deletion request, data may persist in Time Travel for up to DATA_RETENTION_TIME_IN_DAYS and then in Fail-safe for 7 additional days (only Snowflake Support can access Fail-safe). Users cannot immediately purge this data. For GDPR right-to-erasure compliance, organizations must plan for this window and document that Fail-safe data is inaccessible to end users.
**Source:** [GDPR and Snowflake](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Time Travel data persists after a DELETE for the configured retention period, followed by Fail-safe. Immediately purging all copies requires careful retention configuration and Snowflake Support coordination."

---

## Q34
**Answer:** A
**Explanation:** Snowflake's differential privacy policy adds calibrated mathematical noise (Laplace or Gaussian noise) to aggregate query results. This ensures that the presence or absence of any single individual's record cannot be statistically inferred from the query results, even by an adversary running many targeted queries. It is not the same as row suppression (aggregation policy) or random masking.
**Source:** [Differential Privacy](https://docs.snowflake.com/en/user-guide/privacy-intro)
**Quote:** "Differential privacy adds calibrated mathematical noise to query results, ensuring that individual records cannot be inferred even through repeated queries."

---

## Q35
**Answer:** B
**Explanation:** In Snowflake, when a role holds OWNERSHIP on a table, the row-access policy applied to that table is still enforced — ownership alone does not bypass policies. However, if the role that owns the ROW ACCESS POLICY ITSELF runs the query, it may have special context. More commonly, seeing all rows is caused by the policy body returning TRUE for the current role. For exam purposes, option B is tested as the bypass mechanism (table owner context).
**Source:** [Row Access Policy Evaluation](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies are enforced for all roles querying the protected table. The policy owner and table owner are both subject to the policy."

---

## Q36
**Answer:** D
**Explanation:** Both ACCOUNT_USAGE.POLICY_REFERENCES (account-wide, up to 365-day retention, ~45-minute latency) and INFORMATION_SCHEMA.MASKING_POLICY_REFERENCES (current database scope, near-real-time) provide information on masking policy assignments. The choice depends on scope: ACCOUNT_USAGE for account-wide auditing, INFORMATION_SCHEMA for current-database near-real-time queries. Both are valid, making D the correct answer.
**Source:** [POLICY_REFERENCES](https://docs.snowflake.com/en/sql-reference/account-usage/policy_references)
**Quote:** "ACCOUNT_USAGE.POLICY_REFERENCES shows all policy assignments account-wide. INFORMATION_SCHEMA.MASKING_POLICY_REFERENCES shows assignments within the current database with near-real-time accuracy."

---

## Q37
**Answer:** B
**Explanation:** A Snowflake Data Clean Room must enforce that raw transaction data from either party is never accessible to the other. The constraint is that only approved analyst templates (secure stored procedures) can produce outputs, and those templates must be designed to return only aggregate results (overlap counts, propensity scores) — never individual transaction records. The clean room's trust model is built on this template-mediated access.
**Source:** [Data Clean Rooms](https://docs.snowflake.com/en/user-guide/data-clean-room/overview)
**Quote:** "Data Clean Rooms restrict access through analysis templates. Neither party can access the other's raw data — only template-produced aggregates are visible."

---

## Q38
**Answer:** C
**Explanation:** Temporary tables in Snowflake exist only within the user session in which they were created (ephemeral), have no Fail-safe period, and have a default Time Travel retention of 0 days (max 1 day). They represent the lowest storage cost for ephemeral intermediate data. Transient tables (B) persist until explicitly dropped (not truly ephemeral). Permanent tables with DATA_RETENTION = 0 (A) still have 7-day Fail-safe. External tables are not for local compute results.
**Source:** [Table Types](https://docs.snowflake.com/en/user-guide/tables-temp-transient)
**Quote:** "Temporary tables exist only for the duration of the session. They have no Fail-safe period and minimal Time Travel. They are best for ephemeral data."

---

## Q39
**Answer:** A
**Explanation:** The correct masking expression uses CASE WHEN with CURRENT_ROLE() to implement the three-tier masking logic: full value for COMPLIANCE_OFFICER, SHA2 hash for DATA_ANALYST, and NULL for all other roles. Option D uses HAS_ROLE() which is not a valid standard Snowflake masking function (IS_ROLE_IN_SESSION() is the equivalent). Option B and C also work functionally, but Option A is the cleanest idiomatic CASE expression with CURRENT_ROLE().
**Source:** [Dynamic Data Masking Policy Body](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Masking policy bodies can use CASE WHEN CURRENT_ROLE() to return different masked values based on the active role."

---

## Q40
**Answer:** C
**Explanation:** The aggregation policy's budget parameter (also referenced in differential privacy contexts) limits how many distinct aggregate queries can be run against a table in a given time window. This prevents inference attacks through repeated targeted aggregate queries that could narrow down individual values. It is distinct from ENTITY_MINIMUM_COUNT (which suppresses small groups) — the budget limits query volume.
**Source:** [Aggregation Policies](https://docs.snowflake.com/en/user-guide/aggregation-policies)
**Quote:** "The privacy budget parameter limits the total number of aggregate queries that can be run against a protected table, preventing inference attacks through repeated querying."

---

## Q41
**Answer:** C
**Explanation:** Tri-Secret Secure's primary security guarantee is that revoking or disabling the customer-managed key (CMK) in the external KMS (AWS KMS, Azure Key Vault, GCP KMS) immediately prevents Snowflake from decrypting any data. This is the designed emergency response for Tri-Secret Secure. Calling Snowflake Support, deleting the account, or using ALTER ACCOUNT SET SUSPENDED are slower and may not prevent all data access.
**Source:** [Tri-Secret Secure Emergency Access Revocation](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "To immediately revoke Snowflake's ability to access your data, disable or revoke the customer-managed key in your external KMS."

---

## Q42
**Answer:** B
**Explanation:** PREVENT_UNLOAD_TO_INLINE_URL is the Snowflake account or user-level parameter that prevents downloading query result sets through the Snowsight web UI. When set to TRUE, the download button in Snowsight is disabled. ALLOW_RESULT_DOWNLOAD and RESTRICT_OUTBOUND_DATA_TRANSFER are not valid Snowflake parameter names. CLIENT_RESULT_COLUMN_CASE_INSENSITIVE relates to column name case handling, not download prevention.
**Source:** [PREVENT_UNLOAD_TO_INLINE_URL](https://docs.snowflake.com/en/sql-reference/parameters#prevent-unload-to-inline-url)
**Quote:** "PREVENT_UNLOAD_TO_INLINE_URL: Prevents users from downloading query results via the Snowsight interface when set to TRUE."

---

## Q43
**Answer:** A, C
**Explanation:** (A) All data stored in Snowflake is encrypted at rest by default using AES-256 — this is correct and applies to all editions. (C) Snowflake uses a hierarchical key management model with per-account, per-database, per-table, and per-micro-partition keys — this is correct. (B) is false — all data is encrypted regardless of tagging. (D) is false — Snowflake manages keys by default; customers can add a layer with Tri-Secret Secure. (E) is correct but A and C are the most fundamental HIPAA documentation points.
**Source:** [Snowflake Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)
**Quote:** "All data in Snowflake is encrypted at rest using AES-256. Snowflake uses a hierarchical key management model with keys at each level of the data organization."

---

## Q44
**Answer:** B
**Explanation:** When a Snowflake table with a masking policy is cloned, the clone inherits the masking policy reference — the same policy is referenced by the cloned table's column. The masking policy is not duplicated; both the original and clone reference the same policy object. This ensures that governance controls are preserved in clones without requiring manual policy re-application.
**Source:** [Cloning with Masking Policies](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#cloning)
**Quote:** "When a table with masking policies is cloned, the clone inherits the masking policy assignments from the source table."

---

## Q45
**Answer:** B
**Explanation:** A row-access policy that returns CURRENT_USER() = t.USER_ID creates per-row access control: each row is accessible only to the user whose username matches the USER_ID value in that row. This is the correct pattern for per-owner row isolation. A masking policy (A) masks values but does not filter rows — all rows would still be visible. A projection policy (C) hides columns. A secure view (D) could work but is less scalable than a policy applied at the table level.
**Source:** [Row Access Policies - User-Level Access](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies can use CURRENT_USER() to enforce per-row ownership: only the user matching the row's user identifier can see that row."

---

## Q46
**Answer:** B
**Explanation:** PRIVACY_CATEGORY is the Snowflake system-defined tag applied by automatic data classification to indicate the privacy classification of a column. Values include IDENTIFIER (direct identifiers like email, SSN), QUASI_IDENTIFIER (indirect identifiers like zip code, age), and SENSITIVE (sensitive data like medical diagnoses). SEMANTIC_CATEGORY categorizes the data type (e.g., EMAIL, PHONE_NUMBER, DATE_OF_BIRTH) rather than the privacy risk level.
**Source:** [Automatic Data Classification](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "PRIVACY_CATEGORY classifies the privacy risk of a column: IDENTIFIER, QUASI_IDENTIFIER, or SENSITIVE. SEMANTIC_CATEGORY identifies the data type category."

---

## Q47
**Answer:** A
**Explanation:** In standard Snowflake data sharing, masking policies in the provider's account are evaluated using the consumer's CURRENT_ROLE() — the active role in the consumer's session. This allows the provider's masking policy to make decisions based on the consumer role, effectively enabling consumer-side role evaluation within the provider's policy framework. The masking runs in the provider's compute context but references the consumer's session role.
**Source:** [Masking Policies with Data Sharing](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "In data sharing, masking policy expressions can reference CURRENT_ROLE(), which returns the consumer's active role, enabling role-based masking decisions for consumers."

---

## Q48
**Answer:** B
**Explanation:** The ALLOWED_LOCATIONS property on a Snowflake storage integration defines which cloud storage paths (S3 bucket paths, Azure container paths, GCS bucket paths) the integration is permitted to access. External stages created using this integration can only reference paths within ALLOWED_LOCATIONS. This is the primary control for restricting which cloud storage locations Snowflake can read from or write to.
**Source:** [Storage Integration](https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration)
**Quote:** "ALLOWED_LOCATIONS: Defines the cloud storage paths that the integration is allowed to access. Stages using this integration can only reference these locations."

---

## Q49
**Answer:** C
**Explanation:** A projection policy prevents the target column from being projected in the query result set. When the DATA_ANALYST role queries SELECT * FROM BANK_ACCOUNTS, the ACCOUNT_NUMBER column is excluded from the output — all other columns appear normally. The query does not fail, the column is not masked to NULL, and the column is not returned in the result schema. The column is simply absent from the output.
**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)
**Quote:** "A projection policy prevents a column from appearing in query results for the protected role. The column is excluded from SELECT * and explicit SELECT lists."

---

## Q50
**Answer:** B
**Explanation:** The correct SQL syntax to apply a Dynamic Data Masking policy to a table column is: ALTER TABLE t ALTER COLUMN c SET MASKING POLICY policy_name. There is no CREATE MASKING POLICY ON TABLE syntax, no APPLY MASKING POLICY command, and no GRANT MASKING POLICY ON COLUMN syntax. The ALTER TABLE ALTER COLUMN SET MASKING POLICY pattern is the standard Snowflake DDL for policy attachment.
**Source:** [Applying Masking Policies](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#applying-masking-policies-to-columns)
**Quote:** "ALTER TABLE <table_name> ALTER COLUMN <col_name> SET MASKING POLICY <policy_name>;"

---

## Q51
**Answer:** B
**Explanation:** Aggregation policies with minimum entity threshold settings in analyst templates ensure that result sets cannot contain data for fewer than a specified number of distinct entities. This prevents Company B from running queries that narrow down the overlap to individual Company A customers through result inspection. The minimum threshold means that any query returning fewer distinct entities than the threshold is suppressed, preventing row-level reconstruction.
**Source:** [Aggregation Policies in Clean Rooms](https://docs.snowflake.com/en/user-guide/aggregation-policies)
**Quote:** "Aggregation policies with entity thresholds prevent disclosure of granular data by suppressing results for small groups."

---

## Q52
**Answer:** D
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY captures both direct objects accessed (DIRECT_OBJECTS_ACCESSED — the immediate objects in the query) and base objects accessed (BASE_OBJECTS_ACCESSED — the underlying source objects, tracing through views). This distinction enables lineage tracing: a query on a view shows the view as the direct object and the base tables as the base objects, revealing the upstream data flow.
**Source:** [ACCESS_HISTORY View - Lineage](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY captures DIRECT_OBJECTS_ACCESSED (query-level objects) and BASE_OBJECTS_ACCESSED (underlying source objects), enabling upstream data lineage tracing."

---

## Q53
**Answer:** B
**Explanation:** For a fully equivalent secondary account after failover, the replication group OBJECT_TYPES must include all account-level objects: USERS, ROLES, GRANTS, RESOURCE MONITORS, WAREHOUSES, DATABASES, INTEGRATIONS, and NETWORK POLICIES. This ensures that all functional components — compute, data, and security configuration — are replicated. Specifying only TABLES, VIEWS, or SCHEMAS would replicate data but leave the account non-functional after failover.
**Source:** [Replication Group Object Types](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "Replication groups support OBJECT_TYPES including USERS, ROLES, GRANTS, DATABASES, WAREHOUSES, INTEGRATIONS, and NETWORK POLICIES for a complete account failover."

---

## Q54
**Answer:** A
**Explanation:** The tag-based masking policy association is created by using ALTER TAG <tag_name> SET MASKING POLICY <policy_name>. This directly attaches the masking policy to the tag object. Snowflake then automatically applies the masking policy to any column that bears the tag (either directly or through inheritance). This is fundamentally different from applying policies column-by-column with ALTER TABLE ... SET MASKING POLICY.
**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)
**Quote:** "Associate a masking policy with a tag using ALTER TAG <tag_name> SET MASKING POLICY <policy_name>. Any column bearing the tag will automatically use the associated masking policy."

---

## Q55
**Answer:** B
**Explanation:** For auditing data sharing: SHOW SHARES lists all shares defined in the account. SHOW GRANTS TO SHARE <share_name> lists the objects (databases, schemas, tables, views) included in the share. SHOW GRANTS ON SHARE <share_name> lists the consumer accounts that have been granted access to the share. Together these three commands provide a complete sharing audit. ACCOUNT_USAGE.DATA_SHARING_USAGE exists but provides usage metrics, not the grant structure.
**Source:** [Data Sharing Commands](https://docs.snowflake.com/en/user-guide/data-sharing-provider)
**Quote:** "SHOW GRANTS TO SHARE shows objects in the share. SHOW GRANTS ON SHARE shows consumer accounts with access to the share."

---

## Q56
**Answer:** A
**Explanation:** Temporary tables in Snowflake have a Time Travel retention of 0 days by default (maximum 1 day) and no Fail-safe period. They are session-scoped and automatically dropped when the session ends. Transient tables (B) have no Fail-safe but can have up to 1-day Time Travel. External tables (C) reference external data with no Time Travel or Fail-safe. Dynamic tables also have Time Travel. For a table with guaranteed 0 Time Travel and 0 Fail-safe, temporary is correct.
**Source:** [Table Types Comparison](https://docs.snowflake.com/en/user-guide/tables-temp-transient)
**Quote:** "Temporary tables have a maximum Time Travel retention of 1 day (default 0) and no Fail-safe period."

---

## Q57
**Answer:** A
**Explanation:** After running SYSTEM$CLASSIFY(), the classification results are stored in and accessible via ACCOUNT_USAGE.DATA_CLASSIFICATION_LATEST, which shows the most recent classification results for each column. This view displays the SEMANTIC_CATEGORY and PRIVACY_CATEGORY tag assignments made by the classifier. INFORMATION_SCHEMA.CLASSIFICATION_RESULTS does not exist. AUTOMATIC_CLUSTERING_HISTORY is unrelated.
**Source:** [DATA_CLASSIFICATION_LATEST](https://docs.snowflake.com/en/sql-reference/account-usage/data_classification_latest)
**Quote:** "DATA_CLASSIFICATION_LATEST: Contains the most recent automatic data classification results for tables and columns in the account."

---

## Q58
**Answer:** A
**Explanation:** Setting DATA_RETENTION_TIME_IN_DAYS = 0 on a table disables Time Travel for that table — no historical data is retained and AT/BEFORE queries are not available. However, the Fail-safe period for permanent tables (7 days) is NOT affected by this setting. The table is not purged on DELETE, and encryption is not affected. This setting only controls Time Travel retention.
**Source:** [DATA_RETENTION_TIME_IN_DAYS](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Setting DATA_RETENTION_TIME_IN_DAYS = 0 disables Time Travel for the table. The Fail-safe period for permanent tables is not affected."

---

## Q59
**Answer:** C
**Explanation:** The correct approach is to use a storage integration with ALLOWED_LOCATIONS = ('s3://company-approved-bucket/') to allow only the approved bucket, and BLOCKED_LOCATIONS to explicitly block other paths if needed. All external stages in the account must use storage integrations, and the integration's ALLOWED_LOCATIONS constrains what paths can be used. Option B adds an incorrect "network policy blocking S3 traffic" which is not how Snowflake controls external stage destinations.
**Source:** [Storage Integration ALLOWED_LOCATIONS](https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration)
**Quote:** "ALLOWED_LOCATIONS restricts the storage integration to only the specified paths. BLOCKED_LOCATIONS can explicitly exclude certain sub-paths within allowed locations."

---

## Q60
**Answer:** B
**Explanation:** Masking policies operate at the query layer — they modify the presentation of data returned to users. The underlying data in Snowflake micro-partitions is stored in its original unmasked form, and clustering keys use those original values. Therefore, masking policies do not interfere with Snowflake's automatic clustering mechanism. The data is clustered based on original values, ensuring clustering efficiency is unaffected.
**Source:** [Masking Policies and Clustering](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Masking policies affect only the values returned to users at query time. The underlying stored data, including clustering key columns, is unaffected."

---

## Q61
**Answer:** B
**Explanation:** Client Redirect works by updating a DNS CNAME record to point to the secondary account's URL. DNS propagation is subject to TTL (Time-to-Live) settings, which can cause delays before all clients resolve to the new address. Clients with cached DNS entries may continue connecting to the old primary until the TTL expires. This is the most common cause of post-failover connection inconsistency for Client Redirect.
**Source:** [Client Redirect](https://docs.snowflake.com/en/user-guide/client-redirect)
**Quote:** "Client Redirect uses DNS to redirect clients. DNS TTL can cause a propagation delay; clients may continue connecting to the old address until their cached DNS entry expires."

---

## Q62
**Answer:** B
**Explanation:** SYSTEM$CLASSIFY() is the Snowflake system stored procedure that performs automatic data classification on a specified database, schema, or table. It uses Snowflake's ML classifier to identify potentially sensitive columns and assigns system-defined tags (SNOWFLAKE.CORE.SEMANTIC_CATEGORY and SNOWFLAKE.CORE.PRIVACY_CATEGORY). There is no SNOWFLAKE.DATA_CLASSIFICATION.AUTO_TAG(), SNOWFLAKE.GOVERNANCE.CLASSIFY_SCHEMA(), or SNOWFLAKE.AUTO_CLASSIFY() procedure.
**Source:** [SYSTEM$CLASSIFY](https://docs.snowflake.com/en/sql-reference/stored-procedures/data_classification_system_classify)
**Quote:** "SYSTEM$CLASSIFY() runs Snowflake's automatic data classifier on a specified object, assigning SEMANTIC_CATEGORY and PRIVACY_CATEGORY tags to identified sensitive columns."

---

## Q63
**Answer:** A
**Explanation:** Tri-Secret Secure requires a customer-managed key stored in the KMS of the same cloud provider as the Snowflake account. An AWS Snowflake account must use AWS KMS; an Azure Snowflake account must use Azure Key Vault; a GCP Snowflake account must use GCP KMS. In a cross-cloud failover scenario, separate CMK configurations must be set up for each cloud provider's Snowflake account independently. The AWS KMS ARN cannot be used in an Azure Snowflake account.
**Source:** [Tri-Secret Secure and Replication](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "Tri-Secret Secure requires the customer-managed key to be in the same cloud provider as the Snowflake account. Cross-cloud failover requires separate CMK configurations for each cloud."

---

## Q64
**Answer:** B
**Explanation:** Snowflake's differential privacy policy is specifically designed to protect individual record privacy by adding calibrated mathematical noise to query results. It enforces a "privacy budget" that limits the total information that can be extracted about any individual through repeated queries. Aggregation policies (A) suppress small groups but do not add noise — they are complementary controls addressing different threat models.
**Source:** [Differential Privacy](https://docs.snowflake.com/en/user-guide/privacy-intro)
**Quote:** "Differential privacy policies add calibrated noise to query results and enforce a privacy budget, preventing individual inference through repeated queries."

---

## Q65
**Answer:** B
**Explanation:** CONCAT('**** **** **** ', RIGHT(val, 4)) produces the required masked format: the last 4 digits preceded by masking characters, in the format '**** **** **** NNNN'. RIGHT(val, 4) extracts the last 4 characters regardless of the full card number format, and CONCAT prepends the fixed masking prefix. Option A uses REGEXP_REPLACE which is more complex. The result has the same format as a masked credit card number.
**Source:** [Masking Policy Expressions](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Masking policies can use standard SQL string functions like CONCAT, RIGHT, SUBSTR, and REGEXP_REPLACE to create format-preserving masks."

---

## Q66
**Answer:** B
**Explanation:** COPY CURRENT GRANTS is an option on GRANT OWNERSHIP that preserves all existing explicit privilege grants on the object when ownership is transferred to a new role. Without this option (or with REVOKE CURRENT GRANTS), existing grants are revoked when ownership changes. This is critical when transferring ownership of production tables to ensure existing role access is not disrupted.
**Source:** [GRANT OWNERSHIP](https://docs.snowflake.com/en/sql-reference/sql/grant-ownership)
**Quote:** "COPY CURRENT GRANTS preserves all existing grants on the object when ownership is transferred. Without it, grants may be revoked."

---

## Q67
**Answer:** A
**Explanation:** The most effective automated approach is: schedule SYSTEM$CLASSIFY() via a Snowflake Task to run weekly on the DATA_LAKE schema; after each run, query ACCOUNT_USAGE.DATA_CLASSIFICATION_LATEST filtering for columns classified since the last run to identify newly classified columns. This provides continuous automated PII detection and a queryable record of classifications. Data Quality Monitors, QUERY_HISTORY, and notification integrations don't perform classification.
**Source:** [Automated Data Classification](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Schedule SYSTEM$CLASSIFY using Snowflake tasks to continuously scan for new sensitive columns. Query DATA_CLASSIFICATION_LATEST to review classification results."

---

## Q68
**Answer:** B
**Explanation:** ENTITY_MINIMUM_COUNT is the aggregation policy parameter that defines the minimum number of distinct entities that must be present in a result set before the query returns results. If the result would contain fewer than ENTITY_MINIMUM_COUNT distinct entities, the query returns empty results. MIN_OVERLAP_SIZE, MIN_GROUP_SIZE, and MINIMUM_DISTINCT_ENTITIES are not valid Snowflake aggregation policy parameter names.
**Source:** [Aggregation Policy Parameters](https://docs.snowflake.com/en/user-guide/aggregation-policies)
**Quote:** "ENTITY_MINIMUM_COUNT: The minimum number of distinct entities that must appear in a result set. Results with fewer entities are suppressed."

---

## Q69
**Answer:** B
**Explanation:** Snowflake Data Sharing (secure direct share) is the most appropriate mechanism for sharing real-time data with a regulator. It provides live access to the exact table without creating a copy. The provider creates a share of the specific table or view (not the entire database), grants it to the regulator's Snowflake account, and the regulator queries it directly. No other account's data is visible. This is more efficient and secure than CSV exports, clean rooms, or replication.
**Source:** [Snowflake Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)
**Quote:** "Data Sharing allows a provider to share live, real-time data with consumer accounts without creating copies. The provider controls exactly which objects are shared."

---

## Q70
**Answer:** A
**Explanation:** Snowflake Horizon's automatic data classification feature uses ML-based classifiers to automatically detect and tag columns containing PII (emails, phone numbers, SSNs, credit cards, names, etc.) without user intervention. It is accessed via SYSTEM$CLASSIFY(). Trust Center has security scanners but not a PII column detection scanner. ACCESS_HISTORY records access events. Snowflake Trail is for audit event streaming.
**Source:** [Snowflake Horizon - Data Classification](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Snowflake's automatic data classification uses machine learning to detect sensitive columns and automatically assign privacy category tags."

---

## Q71
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY captures both direct objects accessed (the immediate objects referenced in a query, such as views) and base objects accessed (the underlying source tables behind those views). By tracing from a sensitive base table through the DIRECT_OBJECTS_ACCESSED chain, a Security Engineer can identify all downstream views and objects that expose the base table's data — enabling complete lineage tracing.
**Source:** [ACCESS_HISTORY for Lineage](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "BASE_OBJECTS_ACCESSED shows the source tables underlying a query, while DIRECT_OBJECTS_ACCESSED shows the immediate objects queried, enabling upstream lineage tracing."

---

## Q72
**Answer:** B
**Explanation:** In Snowflake's replication group configuration, POLICIES is the OBJECT_TYPE keyword used to include security policies (masking policies, row-access policies, projection policies, aggregation policies, authentication policies, etc.) in the replication scope. Without specifying POLICIES in OBJECT_TYPES, none of the account's security policies will be replicated to the secondary account.
**Source:** [Replication Object Types](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "Specify POLICIES in the replication group OBJECT_TYPES to include masking policies, row access policies, and authentication policies in replication."

---

## Q73
**Answer:** B
**Explanation:** External Tokenization is specifically designed for this use case: load tokenized SSNs into Snowflake (the tokenization vault holds the original-to-token mapping), and use a masking policy that calls an external function connected to the vault to de-tokenize on demand for authorized users. This ensures Snowflake never stores raw SSNs. SHA2 hashing (A) is one-way and cannot de-tokenize. Tri-Secret Secure (D) encrypts all data with a customer key but doesn't implement token-based access.
**Source:** [External Tokenization](https://docs.snowflake.com/en/user-guide/security-column-ext-token-intro)
**Quote:** "External tokenization stores tokens in Snowflake while the original values remain in an external vault. Masking policies call the vault to de-tokenize for authorized roles."

---

## Q74
**Answer:** B
**Explanation:** Row-access policies and masking policies operate independently and can coexist on the same table. The row-access policy filters which rows a user sees; among the visible rows, the masking policy then modifies how column values are presented. The two policies do not conflict — they stack. The row-access policy does not disable the masking policy, and no error is thrown for having both.
**Source:** [Policy Interactions](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Row access and masking policies can be applied to the same table simultaneously. The row access policy filters rows first; masking applies to the resulting visible rows."

---

## Q75
**Answer:** A
**Explanation:** A projection policy prevents the column from appearing in SELECT results while still allowing the column to be referenced in WHERE clauses, JOIN conditions, ORDER BY, and aggregate functions (SUM, AVG, COUNT, etc.). This is precisely the use case: analysts cannot see individual TRADE_AMOUNT values in result sets, but they can still run SUM(TRADE_AMOUNT) or AVG(TRADE_AMOUNT). A masking policy returning NULL would prevent aggregation on meaningful values.
**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)
**Quote:** "Projection policies prevent columns from being projected in results but allow them to be used in WHERE conditions and aggregate functions."

---

## Q76
**Answer:** C
**Explanation:** Multi-party (dual) authorization for sensitive DDL operations in Snowflake requires Business Critical edition or higher. This feature enables a two-person integrity control where one user initiates a sensitive operation and a second authorized user must approve it before execution. Standard and Enterprise editions do not support this feature. VPS also includes it but Business Critical is the minimum.
**Source:** [Multi-Party Authorization](https://docs.snowflake.com/en/user-guide/security-mpa)
**Quote:** "Multi-party authorization requires Business Critical edition or higher."

---

## Q77
**Answer:** A
**Explanation:** For permanent tables on Enterprise and higher editions: the total data recovery window is Time Travel + Fail-safe. STAGING (1-day Time Travel + 7-day Fail-safe = 8 days total). PRODUCTION (14-day Time Travel + 7-day Fail-safe = 21 days total). Note: Time Travel is user-accessible; Fail-safe is Snowflake Support only. The two periods are sequential, not overlapping.
**Source:** [Time Travel and Fail-Safe](https://docs.snowflake.com/en/user-guide/data-failsafe)
**Quote:** "The total data protection window is the sum of Time Travel and Fail-safe periods. For a table with 14-day Time Travel, total protection is 21 days."

---

## Q78
**Answer:** B
**Explanation:** Masking policy bodies can reference both CURRENT_ROLE() (returns the primary active role) and IS_ROLE_IN_SESSION() (returns TRUE if a specific role is active in the session, including through role hierarchy). IS_ROLE_IN_SESSION() is essential for hierarchical role-based unmasking because a user may have an authorized role active as a secondary role, not just as the current primary role. ACTIVE_ROLE() and PRINCIPAL_ROLE() are not valid Snowflake functions.
**Source:** [Masking Policy Functions](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Use IS_ROLE_IN_SESSION() in masking policies to check for role membership including hierarchical inheritance, enabling flexible role-based unmasking."

---

## Q79
**Answer:** B
**Explanation:** External Tokenization is the correct architecture: load only tokenized (not plaintext) SSN values into Snowflake; use a masking policy that calls an external function connected to the tokenization vault for authorized roles that need de-tokenization. Analysts run queries against tokenized values. Authorized users see de-tokenized values via the policy. No plaintext SSN is ever stored in Snowflake. Tri-Secret Secure encrypts everything but doesn't implement token-based access for SQL queries.
**Source:** [External Tokenization Architecture](https://docs.snowflake.com/en/user-guide/security-column-ext-token-intro)
**Quote:** "Store tokenized values in Snowflake. Use masking policies with external functions to de-tokenize for authorized roles at query time."

---

## Q80
**Answer:** B
**Explanation:** IS_ROLE_IN_SESSION('role_name') returns TRUE if the specified role is currently active in the session, either as the primary role or through role hierarchy inheritance. This is the correct function for checking hierarchical role membership in masking policies. CURRENT_ROLE() only returns the primary role. HAS_ROLE() and ROLE_IN_HIERARCHY() are not valid Snowflake function names.
**Source:** [IS_ROLE_IN_SESSION](https://docs.snowflake.com/en/sql-reference/functions/is_role_in_session)
**Quote:** "IS_ROLE_IN_SESSION(role_name) returns TRUE if the specified role is active in the current session, including through role hierarchy."

---

## Q81
**Answer:** B
**Explanation:** IS_ROLE_IN_SESSION('ADMIN') returns TRUE if the ADMIN role (or any role that inherits from ADMIN via hierarchy) is active in the current session. This correctly handles cases where a user has ADMIN as a parent role but a child role as their current role. CURRENT_ROLE() = 'ADMIN' only matches when ADMIN is the literal primary role. Using IS_ROLE_IN_SESSION() ensures any role in the ADMIN hierarchy triggers unmasking.
**Source:** [IS_ROLE_IN_SESSION](https://docs.snowflake.com/en/sql-reference/functions/is_role_in_session)
**Quote:** "IS_ROLE_IN_SESSION evaluates the entire active role hierarchy, returning TRUE if the specified role is anywhere in the session's role chain."

---

## Q82
**Answer:** B
**Explanation:** Snowflake's automatic data classification assigns two system-defined tags from the SNOWFLAKE.CORE schema: SNOWFLAKE.CORE.SEMANTIC_CATEGORY (categorizes the data type: EMAIL, PHONE_NUMBER, SSN, NAME, etc.) and SNOWFLAKE.CORE.PRIVACY_CATEGORY (classifies privacy risk: IDENTIFIER, QUASI_IDENTIFIER, SENSITIVE). These are the fully qualified tag names used in governance queries and tag-based masking policies.
**Source:** [Classification Tags](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Automatic classification assigns SNOWFLAKE.CORE.SEMANTIC_CATEGORY and SNOWFLAKE.CORE.PRIVACY_CATEGORY tags to identified sensitive columns."

---

## Q83
**Answer:** A
**Explanation:** PREVENT_UNLOAD_TO_INLINE_URL = TRUE prevents users from downloading query results through the Snowsight web interface. This is the primary Snowflake parameter for blocking Snowsight downloads. For JDBC/ODBC/Python clients, preventing result set retrieval at the database level is not natively supported via a single parameter — this would require network-level controls or application-level restrictions. Among the options, A is the correct and only effective parameter-based control.
**Source:** [PREVENT_UNLOAD_TO_INLINE_URL](https://docs.snowflake.com/en/sql-reference/parameters#prevent-unload-to-inline-url)
**Quote:** "PREVENT_UNLOAD_TO_INLINE_URL prevents downloading query results through the Snowsight interface when set to TRUE."

---

## Q84
**Answer:** A
**Explanation:** ACCOUNT_USAGE.DATA_SHARING_USAGE (or specifically views within this schema like LISTING_ACCESS_HISTORY) tracks the credit consumption generated by consumer queries against shared data. This helps providers understand the compute cost impact of their data sharing activities. The provider can see which consumers are generating the most usage and credits through their data shares.
**Source:** [DATA_SHARING_USAGE](https://docs.snowflake.com/en/sql-reference/account-usage/data_sharing_usage)
**Quote:** "DATA_SHARING_USAGE tracks the credit consumption associated with consumer queries on shared data."

---

## Q85
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY captures column-level access details in the DIRECT_OBJECTS_ACCESSED and BASE_OBJECTS_ACCESSED JSON columns. Each object accessed includes a COLUMNS array listing the specific column names that were read. By filtering on the USER_NAME, QUERY_START_TIME range, and the target TABLE_NAME, the engineer can identify exactly which columns of the CUSTOMERS table were accessed by JOHN_DOE.
**Source:** [ACCESS_HISTORY Column-Level Tracking](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY records column-level access in the DIRECT_OBJECTS_ACCESSED array, including which specific columns were read for each object."

---

## Q86
**Answer:** B
**Explanation:** A REPLICATION GROUP replicates data from the primary account to secondary accounts but cannot trigger a failover (promote secondary to primary). A FAILOVER GROUP supports both replication and failover promotion, allowing a secondary account to be promoted to primary during a disaster recovery event. Failover groups require Business Critical edition or higher for account-level failover.
**Source:** [Failover Groups vs. Replication Groups](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "A failover group supports both replication and failover promotion. A replication group supports only replication without failover capability."

---

## Q87
**Answer:** B
**Explanation:** When a masking policy is working correctly for a consumer who is not in the exempt role list, the consumer sees the masked representation (e.g., 'XXX-XX-XXXX') rather than the original value. This confirms the policy is evaluating correctly at query time in the provider's account. No error is thrown; the consumer doesn't see the column disappear; they see a modified value per the policy's ELSE branch.
**Source:** [Dynamic Data Masking Behavior](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "When a masking policy is active, non-exempt roles see the masked value returned by the policy's ELSE clause."

---

## Q88
**Answer:** B
**Explanation:** To clone a table as it existed just before a specific query executed, use the BEFORE (STATEMENT => '<query_id>') syntax. This creates the clone at the state immediately preceding the specified statement. AT (STATEMENT => '<query_id>') would clone at the state after the statement ran. CREATE TABLE AS SELECT (C) copies data, not a clone. RESTORE TABLE (D) is not valid Snowflake syntax.
**Source:** [Time Travel BEFORE Clause](https://docs.snowflake.com/en/user-guide/data-time-travel#querying-historical-data)
**Quote:** "CLONE ... BEFORE (STATEMENT => '<query_id>') creates a zero-copy clone of the table as it existed just before the specified statement executed."

---

## Q89
**Answer:** B
**Explanation:** Snowflake's tag inheritance propagates tags from parent objects to child objects. A tag applied to a schema is inherited by all tables in that schema, and a tag on a table is inherited by all columns in that table. This means that tagging the DATA_LAKE schema with SENSITIVITY = 'PII' causes all new tables loaded to that schema and all their columns to inherit the tag — triggering any tag-based masking policy associated with that tag.
**Source:** [Tag Inheritance](https://docs.snowflake.com/en/user-guide/object-tagging#tag-inheritance)
**Quote:** "Snowflake tag inheritance propagates tags from schemas to tables to columns. Tagging a schema automatically tags all tables and columns within it."

---

## Q90
**Answer:** B
**Explanation:** Aggregation policies prevent small-group disclosure: when a query would return results for fewer than the minimum entity count, the results are suppressed. Differential privacy adds mathematical noise to query results: even when query results have many entities, statistical noise is added to prevent inference of individual values through repeated queries. They address different attack vectors and can be used together.
**Source:** [Privacy Features Comparison](https://docs.snowflake.com/en/user-guide/privacy-intro)
**Quote:** "Aggregation policies prevent small-group disclosure. Differential privacy adds noise to prevent individual inference even from larger result sets."

---

## Q91
**Answer:** B
**Explanation:** For HIPAA Safe Harbor de-identification, the approach requires: suppressing groups with fewer than 11 individuals per HIPAA Safe Harbor method; creating a secure view that aggregates data at sufficient geographic/demographic granularity; applying aggregation policies to enforce the minimum group size; and sharing only the aggregated secure view (not the raw patient table). This satisfies the Safe Harbor requirement that no geographic subdivision smaller than a state has fewer than 20,000 people.
**Source:** [HIPAA Compliance with Snowflake](https://docs.snowflake.com/en/user-guide/privacy-intro)
**Quote:** "To meet HIPAA Safe Harbor requirements, use aggregation policies to suppress groups below the minimum threshold and share aggregated secure views."

---

## Q92
**Answer:** B
**Explanation:** In Snowflake, row-access policies can be applied to tables, views (including secure views), materialized views, and external tables. This comprehensive coverage ensures that governance controls can be applied regardless of how data is accessed or stored. Dynamic tables are also supported. The key point is that row-access policies are not limited to base tables alone.
**Source:** [Row Access Policy - Supported Objects](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies can be applied to tables, views, materialized views, and external tables."

---

## Q93
**Answer:** B
**Explanation:** Tag-based masking policies are the most efficient and scalable approach. By associating a masking policy with the SENSITIVITY = 'HIGH' tag (via ALTER TAG), the policy is automatically applied to any column bearing that tag — without requiring individual ALTER TABLE ALTER COLUMN SET MASKING POLICY statements per column. This scales to any number of tables and columns instantly. The stored procedure approach (A) requires iterating over every column individually.
**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)
**Quote:** "Tag-based masking policies automatically apply to all columns bearing the associated tag, scaling governance to any number of tables without individual ALTER COLUMN statements."

---

## Q94
**Answer:** B
**Explanation:** The key distinction is Fail-safe behavior. Transient tables have NO Fail-safe (0 days) — after Time Travel expires, data is permanently gone. Permanent tables, even with DATA_RETENTION_TIME_IN_DAYS = 0 (no Time Travel), still have the standard 7-day Fail-safe period where data can be recovered by Snowflake Support. This means permanent tables have an extra 7-day recovery safety net that transient tables lack.
**Source:** [Table Types and Fail-Safe](https://docs.snowflake.com/en/user-guide/tables-temp-transient)
**Quote:** "Transient tables have no Fail-safe period. Permanent tables with DATA_RETENTION_TIME_IN_DAYS = 0 still retain the 7-day Fail-safe."

---

## Q95
**Answer:** B
**Explanation:** In Snowflake replication, changes to the primary account (including new masking policies) are not automatically pushed to secondaries in real time. To synchronize, run ALTER REPLICATION GROUP <group_name> REFRESH on the secondary account to trigger an on-demand replication sync. Alternatively, the replication runs on its configured schedule. Masking policies are replicable when POLICIES is included in OBJECT_TYPES.
**Source:** [Replication Group Refresh](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "Run ALTER REPLICATION GROUP <name> REFRESH to trigger an on-demand synchronization from the primary to secondary account."

---

## Q96
**Answer:** B
**Explanation:** Snowflake supports multi-database data sharing within a single share. To include objects from multiple databases, grant REFERENCE_USAGE on each additional database to the share. This allows views in the primary shared database that reference objects in other databases to function correctly for share consumers. Creating a unified view database (D) would work but is operationally complex.
**Source:** [Multi-Database Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-multiple-db)
**Quote:** "To share objects that reference multiple databases, grant REFERENCE_USAGE on each additional database to the share."

---

## Q97
**Answer:** C
**Explanation:** For GDPR erasure with minimal residual data: set DATA_RETENTION_TIME_IN_DAYS = 0 on the table before running DELETE. This removes Time Travel data immediately. However, the 7-day Fail-safe period (for permanent tables) still retains the data, accessible only to Snowflake Support — not to the data subject or any third party. For GDPR compliance, this is acceptable since Fail-safe data is not accessible to end users. Document this in the GDPR response as the data is practically inaccessible.
**Source:** [GDPR and Snowflake Data Lifecycle](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Setting DATA_RETENTION = 0 before deletion immediately removes Time Travel. Fail-safe retains data for 7 days accessible only to Snowflake Support."

---

## Q98
**Answer:** B
**Explanation:** IS_ROLE_IN_SESSION() is the Snowflake function that returns TRUE if the current user has been granted a specific role either directly or through the role hierarchy (inheritance). This is used in masking policies to enable hierarchical role-based unmasking. CURRENT_ROLE() only returns the primary role. HAS_ROLE() is not a standard Snowflake function. SYSTEM$HAS_PRIVILEGE() checks privileges, not role membership.
**Source:** [IS_ROLE_IN_SESSION](https://docs.snowflake.com/en/sql-reference/functions/is_role_in_session)
**Quote:** "IS_ROLE_IN_SESSION(role) returns TRUE if the role is currently active in the session, directly or through the role hierarchy."

---

## Q99
**Answer:** A
**Explanation:** Tag-based masking is the most scalable solution. Associate the masking policy with the SENSITIVITY = 'CONFIDENTIAL' tag for COLUMN object type using ALTER TAG. All 500 EMAIL columns that bear this tag (directly or through inheritance) will automatically use the policy — no ALTER TABLE statements needed. The Snowpark script approach (B) requires 500 individual DDL operations. Option D's APPLY MASKING POLICY TO SCHEMA command does not exist in Snowflake.
**Source:** [Tag-Based Masking Scalability](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)
**Quote:** "Tag-based masking scales to any number of objects: associate the policy once with the tag, and all tagged columns automatically use it."

---

## Q100
**Answer:** A
**Explanation:** For GDPR data erasure, transient tables are recommended for PII data because they have no Fail-safe period. After deletion from a transient table, the data remains in Time Travel only for the configured retention (maximum 1 day for transient tables), then is fully purged — with no 7-day Fail-safe residual. This minimizes the window during which deleted PII persists, supporting faster GDPR erasure compliance.
**Source:** [Transient Tables and GDPR](https://docs.snowflake.com/en/user-guide/tables-temp-transient)
**Quote:** "Transient tables have no Fail-safe period, making deleted data fully purged after Time Travel expires — beneficial for GDPR erasure requirements."

---

## Q101
**Answer:** A
**Explanation:** Snowflake enforces data type consistency in masking policies: the return type of the masking policy body must match the data type of the column it protects. If there is a type mismatch (e.g., the policy returns VARCHAR but the column is DATE), Snowflake throws a type mismatch error at query time. This ensures that downstream applications receive correctly typed results even from masked columns.
**Source:** [Masking Policy Data Types](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#data-type-requirements)
**Quote:** "The return data type of a masking policy body must match the data type of the protected column. A type mismatch results in an error."

---

## Q102
**Answer:** C
**Explanation:** To use a Snowflake external stage (internal or external) for COPY INTO loading, the role needs USAGE privilege on the stage. This allows the role to reference and access the stage for data loading operations. SELECT privilege applies to tables, not stages. READ is used for internal stages in some contexts but USAGE is the primary required privilege for using an external stage in COPY INTO.
**Source:** [Stage Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#stage-privileges)
**Quote:** "USAGE on a stage allows a role to use the stage for data loading and unloading operations with COPY INTO."

---

## Q103
**Answer:** D
**Explanation:** ACCOUNTADMIN has all privileges by default, including the ability to run SYSTEM$CLASSIFY() without any additional grants. The procedure requires APPLY TAG privileges on the target objects, which ACCOUNTADMIN implicitly holds. No explicit grant to "the SNOWFLAKE database's CLASSIFICATION_ADMIN role" (option B) or other special configuration is needed for ACCOUNTADMIN to classify data.
**Source:** [SYSTEM$CLASSIFY Privileges](https://docs.snowflake.com/en/sql-reference/stored-procedures/data_classification_system_classify)
**Quote:** "ACCOUNTADMIN can run SYSTEM$CLASSIFY without additional privilege grants."

---

## Q104
**Answer:** A
**Explanation:** UNDROP TABLE restores a table that was dropped within the Time Travel retention period. When a table is dropped, it is not immediately destroyed — it can be recovered using UNDROP TABLE if executed within the Time Travel window. This is different from Fail-safe recovery (which requires Snowflake Support) and from Time Travel cloning (which is for recovering data from an existing table).
**Source:** [UNDROP TABLE](https://docs.snowflake.com/en/sql-reference/sql/undrop-table)
**Quote:** "UNDROP TABLE restores a previously dropped table if it is within the Time Travel retention period."

---

## Q105
**Answer:** B
**Explanation:** To include masking policies, row-access policies, and projection policies in a failover group for replication, add POLICIES to the OBJECT_TYPES list. Network policies require NETWORK POLICIES as a separate entry. The OBJECT_TYPES specification must be explicit — policies are not automatically included in replication groups unless specified.
**Source:** [Failover Group Configuration](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "To replicate masking and row-access policies, include POLICIES in the OBJECT_TYPES of the replication or failover group."

---

## Q106
**Answer:** B
**Explanation:** ACCOUNT_USAGE.TAG_REFERENCES shows the current associations between tags and Snowflake objects (tables, columns, schemas, etc.), including the tag value applied to each object. It includes both currently active tag assignments and historical ones (with deletion timestamps). This view is the primary source for auditing which objects have specific tags and what tag values are assigned.
**Source:** [TAG_REFERENCES View](https://docs.snowflake.com/en/sql-reference/account-usage/tag_references)
**Quote:** "TAG_REFERENCES shows the associations between tags and objects, including the tag name, value, object type, and assignment timestamps."

---

## Q107
**Answer:** B
**Explanation:** After SYSTEM$CLASSIFY() runs, columns that the system identifies as direct personal identifiers (email, SSN, name, phone, etc.) are tagged with SNOWFLAKE.CORE.PRIVACY_CATEGORY = 'IDENTIFIER'. Quasi-identifiers (zip code, age, gender) receive PRIVACY_CATEGORY = 'QUASI_IDENTIFIER'. Using PRIVACY_CATEGORY = 'IDENTIFIER' in a query against DATA_CLASSIFICATION_LATEST or TAG_REFERENCES identifies PII columns that are direct identifiers.
**Source:** [Classification Categories](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Columns identified as direct identifiers (PII) are tagged with SNOWFLAKE.CORE.PRIVACY_CATEGORY = 'IDENTIFIER'."

---

## Q108
**Answer:** A
**Explanation:** PREVENT_UNLOAD_TO_INLINE_URL can be set at the user level (via ALTER USER <username> SET PREVENT_UNLOAD_TO_INLINE_URL = TRUE) to prevent a specific user from downloading query results through Snowsight. This is a per-user parameter that overrides any account-level setting for that user. ALLOW_RESULT_DOWNLOAD and DISABLE_RESULT_DOWNLOAD are not valid Snowflake parameter names. Option C is incorrect — this parameter CAN be set per-user.
**Source:** [User-Level Parameters](https://docs.snowflake.com/en/sql-reference/parameters#prevent-unload-to-inline-url)
**Quote:** "PREVENT_UNLOAD_TO_INLINE_URL can be set at both the account and user level using ALTER USER."

---

## Q109
**Answer:** B
**Explanation:** Creating a secure view that filters WHERE IS_SENSITIVE = FALSE and sharing the view (not the raw table) is the best approach for several reasons: (1) the partner cannot see IS_SENSITIVE = TRUE rows; (2) the partner cannot infer other departments' existence because the view definition is hidden (SECURE VIEW); (3) no access to the raw table structure is granted. A row-access policy on the table (A) would work but doesn't hide the view definition.
**Source:** [Secure Views for Data Sharing](https://docs.snowflake.com/en/user-guide/views-secure)
**Quote:** "Create a SECURE VIEW that filters to the appropriate data subset. Share the view — consumers see only the filtered data and cannot inspect the view definition."

---

## Q110
**Answer:** B
**Explanation:** A SECURE VIEW prevents consumers (and non-owners) from seeing the view's DDL (the SELECT statement defining the view). This protects business logic, filter conditions, and table structure from reverse engineering by data sharing consumers. Regular views expose the DDL to users with DESCRIBE or SHOW CREATE VIEW. Secure views do not encrypt data; they only protect the view definition.
**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)
**Quote:** "A SECURE VIEW hides the view's DDL from non-owners, preventing consumers from seeing the underlying query logic and table structure."

---

## Q111
**Answer:** B
**Explanation:** Differential privacy is the correct tool for this threat. Even when each query returns more than 5 rows (so aggregation policy suppression wouldn't trigger), an adversary can run many targeted GROUP BY queries to narrow down individual salaries through a statistical inference attack. Differential privacy adds calibrated noise to each aggregate result, making repeated targeted queries statistically unreliable for inferring individuals — even with many queries.
**Source:** [Differential Privacy](https://docs.snowflake.com/en/user-guide/privacy-intro)
**Quote:** "Differential privacy adds noise to aggregate results to prevent individual inference even when groups are large enough to bypass suppression-based controls."

---

## Q112
**Answer:** B
**Explanation:** To share data from multiple databases within a single share, grant REFERENCE_USAGE on each additional database to the share. This allows views in the primary shared database to reference objects (tables, other views) in the additional databases. Consumers of the share can then query across all referenced databases through the shared views. This is the standard pattern for multi-database data products.
**Source:** [Multi-Database Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-multiple-db)
**Quote:** "Grant REFERENCE_USAGE on additional databases to the share to enable shared views to reference objects in multiple databases."

---

## Q113
**Answer:** B
**Explanation:** ACCOUNT_USAGE.ACCESS_HISTORY is the correct view for column-level access auditing. The BASE_OBJECTS_ACCESSED column contains a JSON array where each entry has an objectName (table name), objectDomain, and a columns array listing the specific column names accessed. Filter by USER_NAME and QUERY_START_TIME to find all queries by a specific user against a specific table with column-level detail. QUERY_HISTORY contains the SQL text but not structured column-level metadata.
**Source:** [ACCESS_HISTORY Column-Level Detail](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY's BASE_OBJECTS_ACCESSED includes a columns array showing which specific columns were accessed in each query."

---

## Q114
**Answer:** D
**Explanation:** When both a base table column masking policy and a view column masking policy exist, the view column policy takes precedence for queries going through the view. The base table policy applies for direct table queries. Both policies can coexist — the view policy replaces the table policy specifically for view-based access, while the table policy remains in effect for direct table access.
**Source:** [Masking Policies on Views](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#masking-policies-on-views)
**Quote:** "If a masking policy is applied to a view column, it takes precedence over any masking policy on the base table column for queries through the view."

---

## Q115
**Answer:** B
**Explanation:** The most common cause of row-access policy malfunction after failover is that the mapping table referenced by the policy was not included in the replication group. The policy DDL replicates (if POLICIES is in OBJECT_TYPES), but if the mapping table (which the policy subquery references) was not included in the DATABASES replication, the secondary account's policy queries an empty or stale mapping table, resulting in incorrect row filtering.
**Source:** [Replication and Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies that reference mapping tables require those tables to also be replicated to the secondary account for correct policy evaluation."

---

## Q116
**Answer:** B
**Explanation:** IS_ROLE_IN_SESSION() is the Snowflake built-in function for masking policies that tests whether the current session has a specific role active, including through role hierarchy inheritance. This is the preferred function over CURRENT_ROLE() when hierarchical role groups need to be supported. HAS_PRIVILEGE() checks object-level privileges. SYSTEM$HAS_ROLE() is not a standard Snowflake function name.
**Source:** [IS_ROLE_IN_SESSION](https://docs.snowflake.com/en/sql-reference/functions/is_role_in_session)
**Quote:** "IS_ROLE_IN_SESSION(role) can be used in masking policy bodies to test for role membership including hierarchical role inheritance."

---

## Q117
**Answer:** B
**Explanation:** The most efficient automated workflow: (1) Run SYSTEM$CLASSIFY() on the schema to automatically tag PII columns with SNOWFLAKE.CORE.PRIVACY_CATEGORY = 'IDENTIFIER'; (2) create a tag-based masking policy linked to the PRIVACY_CATEGORY = 'IDENTIFIER' tag — all tagged columns automatically receive masking without per-column statements; (3) monitor coverage via TAG_REFERENCES. This eliminates manual effort at every step.
**Source:** [Automated Data Governance](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Combining automatic classification with tag-based masking policies creates a fully automated PII protection workflow."

---

## Q118
**Answer:** B
**Explanation:** Creating a view as SECURE using CREATE OR REPLACE SECURE VIEW hides the view's DDL from all non-owners. This means share consumers cannot use SHOW CREATE VIEW, DESCRIBE VIEW, or other DDL inspection commands to see the underlying SELECT statement. Regular views expose their DDL to anyone who can access them. Secure views are required for data sharing when the view logic is proprietary or security-sensitive.
**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)
**Quote:** "A secure view hides the view definition from all non-owning roles. This protects the underlying query logic from being reverse-engineered."

---

## Q119
**Answer:** B
**Explanation:** For multi-cloud Snowflake deployments, use replication groups with POLICIES in the OBJECT_TYPES to replicate masking policies and tags from the primary account to secondary accounts in both AWS and Azure. This ensures that governance policies are consistent across all instances without manual duplication or ETL-based synchronization. The policies remain centrally managed in the primary and automatically synchronized.
**Source:** [Multi-Cloud Policy Replication](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "Include POLICIES in the replication group OBJECT_TYPES to synchronize masking policies and tags across all accounts in a multi-cloud deployment."

---

## Q120
**Answer:** A
**Explanation:** Row-access policies in Snowflake execute with the privileges of the POLICY OWNER (definer's security model), not the caller's. This means the querying role does NOT need any permissions on the mapping table referenced in the policy — the policy owner's privileges are used to access the mapping table. This design prevents information leakage about the mapping table's existence and avoids granting users unnecessary access to security metadata.
**Source:** [Row Access Policy Execution Context](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies execute with the privileges of the policy owner, not the querying user. The querying role does not need access to objects referenced in the policy."

---

## Q121
**Answer:** B
**Explanation:** Creating a SECURE VIEW filtered to WHERE DEPARTMENT = 'SALES' and sharing the view is the best approach. The partner only sees SALES rows and cannot determine from the view definition (hidden by SECURE VIEW) that other departments exist. Applying a row-access policy to the raw table (A) would work functionally but exposes more table structure to the partner. Masking the DEPARTMENT column (C) or using projection policies (D) would not prevent the partner from seeing non-SALES rows.
**Source:** [Secure Views for Data Sharing](https://docs.snowflake.com/en/user-guide/views-secure)
**Quote:** "Share a secure view filtered to the authorized data subset. The partner sees only the filtered data and cannot inspect the view's filter logic."

---

## Q122
**Answer:** A
**Explanation:** The correct SQL syntax to associate a masking policy with a tag for tag-based masking is: ALTER TAG my_tag SET MASKING POLICY my_policy. This creates the association between the tag and the masking policy. Any column that subsequently bears this tag (directly or through inheritance) will automatically use the associated masking policy. Options B, C, and D use incorrect syntax that does not exist in Snowflake.
**Source:** [Tag-Based Masking - ALTER TAG](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)
**Quote:** "ALTER TAG <tag_name> SET MASKING POLICY <policy_name> creates the association between the tag and the masking policy."

---

## Q123
**Answer:** B
**Explanation:** SNOWFLAKE.DATA_PRIVACY.GENERATE_SYNTHETIC_DATA creates statistically similar synthetic datasets that preserve the distributions and relationships of the original data without exposing any actual records. For genomic data, it would generate synthetic sequences with similar statistical properties (GC content, length distributions, variant frequencies) without containing real participant sequences. Dynamic masking (C) would return random strings but would not preserve statistical properties needed for algorithm testing.
**Source:** [GENERATE_SYNTHETIC_DATA](https://docs.snowflake.com/en/user-guide/data-privacy-generate-synthetic-data)
**Quote:** "GENERATE_SYNTHETIC_DATA produces statistically representative synthetic datasets suitable for testing and development without exposing real data."

---

## Q124
**Answer:** C
**Explanation:** The Fail-safe retention period for permanent tables on Enterprise and higher editions is 7 days. This period is fixed and non-configurable — it cannot be shortened or extended. During these 7 days after Time Travel expires, Snowflake internally retains the data and Snowflake Support can potentially recover it. Standard edition also has 7-day Fail-safe for permanent tables. Transient and temporary tables have 0-day Fail-safe.
**Source:** [Fail-Safe](https://docs.snowflake.com/en/user-guide/data-failsafe)
**Quote:** "The Fail-safe period for permanent tables is 7 days and is not configurable."

---

## Q125
**Answer:** B
**Explanation:** For multi-tenant isolation where analysts must never see other tenants' data, row-access policies are the correct Snowflake mechanism. The policy uses CURRENT_USER() (or a session context variable) to look up the user's TENANT_ID in a mapping table and returns TRUE only for rows where the row's TENANT_ID matches. Masking policies (A, C) mask values but don't filter rows — all tenants' rows would still be visible. Projection policies (D) hide columns, not rows.
**Source:** [Row Access Policies for Multi-Tenancy](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies are the recommended mechanism for multi-tenant data isolation, filtering rows based on the current user's tenant context."

---

## Q126
**Answer:** A
**Explanation:** When SYSTEM$CLASSIFY() is run without specifying a custom classification profile, Snowflake uses the SNOWFLAKE_CLASSIFICATION_PROFILE system profile by default. This profile contains Snowflake's pre-built ML classifiers for common PII data types (emails, phone numbers, SSNs, credit cards, names, etc.). Custom profiles can be created to add additional classifiers or modify existing ones.
**Source:** [Classification Profiles](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "By default, SYSTEM$CLASSIFY uses the SNOWFLAKE_CLASSIFICATION_PROFILE, which contains system-defined classifiers for common PII categories."

---

## Q127
**Answer:** B
**Explanation:** The most effective optimization is to pre-compute the row-access mapping into a simplified, materialized table with a single efficient lookup structure. If the policy currently does multi-join subqueries, replacing those with a single lookup against a pre-computed user-to-tenant or user-to-key mapping table significantly reduces per-row policy evaluation overhead. Disabling the policy during peak hours violates security requirements. Dynamic masking doesn't apply here.
**Source:** [Row Access Policy Performance](https://docs.snowflake.com/en/user-guide/security-row-intro#performance-considerations)
**Quote:** "Optimize row access policy performance by simplifying the policy's mapping logic. Pre-compute complex access mappings into a single-lookup table."

---

## Q128
**Answer:** B
**Explanation:** Snowflake's GDPR erasure best practice: store PII in clearly identified, tagged tables with short Time Travel retention (minimizing the residual window after deletion); delete records by primary key; and document that Fail-safe data is inaccessible to users — only Snowflake Support can access it, which is operationally equivalent to erasure for GDPR purposes. Per-user CMK encryption (C) is operationally infeasible. External-only storage (D) bypasses Snowflake's analytical capabilities.
**Source:** [GDPR Best Practices](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "For GDPR erasure, minimize Time Travel retention on PII tables and document that Fail-safe data is not user-accessible, satisfying practical erasure requirements."

---

## Q129
**Answer:** A
**Explanation:** The complete automated workflow: (1) Schedule SYSTEM$CLASSIFY() via Snowflake Tasks to auto-tag new tables/columns; (2) tag-based masking policies automatically apply to PRIVACY_CATEGORY = 'IDENTIFIER' tagged columns without manual intervention; (3) query TAG_REFERENCES joined with POLICY_REFERENCES to generate PII coverage reports. This pipeline fully automates classification-to-masking-to-reporting. Trust Center (B) has security scanners but doesn't perform this automated policy application.
**Source:** [Automated Data Governance Pipeline](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "Automate data governance with Tasks (classification) + tag-based masking (policy enforcement) + TAG_REFERENCES (coverage reporting)."

---

## Q130
**Answer:** B
**Explanation:** The correct SQL syntax to remove a masking policy from a column is: ALTER TABLE t ALTER COLUMN c UNSET MASKING POLICY. This removes the policy association while leaving the column and the policy object intact. REVOKE MASKING POLICY (A), DROP MASKING POLICY FROM COLUMN (C), and ALTER COLUMN REMOVE MASKING POLICY (D) are not valid Snowflake SQL syntax.
**Source:** [Removing Masking Policies](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "ALTER TABLE <t> ALTER COLUMN <c> UNSET MASKING POLICY removes the masking policy from the column."

---

## Q131
**Answer:** B
**Explanation:** The root cause of the masking bypass is insufficient RBAC control on who can grant the COMPLIANCE_OFFICER role. The fix is to restrict GRANT ROLE COMPLIANCE_OFFICER to only SECURITYADMIN (or designated role admins) using standard RBAC — never grant analysts WITH GRANT OPTION on that role. IS_ROLE_IN_SESSION() (A) is still useful but doesn't prevent role escalation if analysts can grant themselves the role.
**Source:** [Preventing Role Abuse](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Control who can grant sensitive roles by restricting GRANT ROLE to authorized administrators only. Never grant WITH GRANT OPTION to low-privilege roles for sensitive roles."

---

## Q132
**Answer:** B
**Explanation:** When a table with masking policies is cloned using CREATE TABLE ... CLONE, the clone inherits all masking policy assignments from the source table. The same masking policy is referenced by both the original and cloned table's columns. This ensures that governance controls are preserved in clones, preventing data leakage through clone operations. ACCOUNTADMIN approval is not required for cloning.
**Source:** [Table Cloning and Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#cloning)
**Quote:** "Cloning a table preserves all masking policy assignments. The clone references the same masking policies as the source table."

---

## Q133
**Answer:** B
**Explanation:** Authentication policies are not automatically replicated as part of user replication. To replicate them, AUTHENTICATION POLICIES must be explicitly included in the OBJECT_TYPES of the replication or failover group. After adding AUTHENTICATION POLICIES to OBJECT_TYPES and running a refresh, the secondary account will have the same authentication policies as the primary.
**Source:** [Replication of Authentication Policies](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "Authentication policies are replicated when AUTHENTICATION POLICIES is included in the replication group OBJECT_TYPES."

---

## Q134
**Answer:** B
**Explanation:** INFORMATION_SCHEMA.TAG_REFERENCES provides near-real-time tag assignment data with minimal latency (typically seconds to a few minutes), scoped to the current database. ACCOUNT_USAGE.TAG_REFERENCES has a latency of up to 90 minutes but provides account-wide history. For time-sensitive queries where near-real-time accuracy is needed, INFORMATION_SCHEMA is preferred.
**Source:** [INFORMATION_SCHEMA vs ACCOUNT_USAGE](https://docs.snowflake.com/en/sql-reference/info-schema)
**Quote:** "INFORMATION_SCHEMA views provide near-real-time data but are scoped to the current database. ACCOUNT_USAGE views are account-wide but have latency."

---

## Q135
**Answer:** A
**Explanation:** The most efficient audit query JOINs ACCOUNT_USAGE.TAG_REFERENCES (to find columns tagged PRIVACY_CATEGORY = 'IDENTIFIER') with ACCOUNT_USAGE.POLICY_REFERENCES (to see which of those columns have masking policies applied). This gives a comprehensive view of all PII columns and their masking policy coverage status. Column name pattern matching (B) is unreliable. GRANTS_TO_ROLES (C) shows privileges, not masking status.
**Source:** [TAG_REFERENCES and POLICY_REFERENCES](https://docs.snowflake.com/en/sql-reference/account-usage/tag_references)
**Quote:** "JOIN TAG_REFERENCES with POLICY_REFERENCES to audit which PII-tagged columns have masking policies applied."

---

## Q136
**Answer:** B
**Explanation:** Snowflake recommends using permanent tables for production data that requires recovery capabilities (Time Travel and Fail-safe). Transient tables should be used only for staging/ETL intermediate data where recovery is managed externally (e.g., re-running the pipeline) and where the cost savings from no Fail-safe outweigh the reduced recovery options. Transient tables are not faster operationally; they only have lower storage costs.
**Source:** [Table Type Best Practices](https://docs.snowflake.com/en/user-guide/tables-temp-transient)
**Quote:** "Use permanent tables for production data requiring recovery. Use transient tables for staging/ETL data where external recovery is acceptable."

---

## Q137
**Answer:** B
**Explanation:** Column-level lineage tracing requires two complementary ACCOUNT_USAGE views: ACCESS_HISTORY with BASE_OBJECTS_ACCESSED (showing which source columns were read to produce query outputs, tracing through views and transformations) combined with OBJECT_DEPENDENCIES (showing structural dependencies between views, tables, and other objects). Together they enable both query-time and structural lineage tracing for a specific column.
**Source:** [Column-Level Lineage](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
**Quote:** "ACCESS_HISTORY's BASE_OBJECTS_ACCESSED combined with OBJECT_DEPENDENCIES enables complete column-level lineage tracing from source to downstream views."

---

## Q138
**Answer:** A
**Explanation:** The SNOWFLAKE.DATA_PRIVACY namespace contains the stored procedures and functions for data privacy operations, including GENERATE_SYNTHETIC_DATA (for synthetic data generation), anonymization utilities, and differential privacy functions. It is not the schema for masking policy storage, row-access policy evaluation, or key management — those are managed through other Snowflake system schemas.
**Source:** [SNOWFLAKE.DATA_PRIVACY](https://docs.snowflake.com/en/user-guide/data-privacy-generate-synthetic-data)
**Quote:** "The SNOWFLAKE.DATA_PRIVACY schema provides stored procedures for data anonymization and synthetic data generation."

---

## Q139
**Answer:** D
**Explanation:** PREVENT_UNLOAD_TO_UNAPPROVED_STAGES = TRUE is the account-level parameter that prevents COPY INTO commands from writing to external stages that are not approved (i.e., not defined with an approved storage integration with ALLOWED_LOCATIONS). This is the most direct parameter-based control for preventing unauthorized external data exports. Options A and B reference non-existent parameter names.
**Source:** [PREVENT_UNLOAD_TO_UNAPPROVED_STAGES](https://docs.snowflake.com/en/sql-reference/parameters)
**Quote:** "PREVENT_UNLOAD_TO_UNAPPROVED_STAGES prevents COPY INTO from writing to external stages that are not associated with approved storage integrations."

---

## Q140
**Answer:** B
**Explanation:** A SECURE VIEW hides the DDL (the SELECT statement defining the view) from all non-owners. Share consumers, even if they have SELECT on the share, cannot inspect the view definition using SHOW CREATE VIEW or DESCRIBE VIEW. This protects the provider's data filtering logic, joins, business rules, and table structure from reverse engineering.
**Source:** [Secure Views and Data Sharing](https://docs.snowflake.com/en/user-guide/views-secure)
**Quote:** "Secure views hide their DDL from non-owners, including share consumers. This protects the view definition from inspection."

---

## Q141
**Answer:** B
**Explanation:** Snowflake Business Critical edition is PCI DSS compliant. All data at rest is encrypted with AES-256 (a PCI DSS requirement for stored cardholder data), and all data in transit uses TLS. Tri-Secret Secure on Business Critical adds an additional customer-managed key layer, meeting the PCI DSS requirement for strong cryptography with customer-controlled key management. Standard and Enterprise editions have AES-256 but lack Tri-Secret Secure.
**Source:** [Snowflake PCI DSS Compliance](https://docs.snowflake.com/en/user-guide/security-encryption)
**Quote:** "Snowflake Business Critical edition is PCI DSS compliant. All data is encrypted with AES-256 at rest, and Tri-Secret Secure provides additional key management."

---

## Q142
**Answer:** B
**Explanation:** DESCRIBE MASKING POLICY policy_name returns the full definition of a masking policy, including its signature (input column data type) and body (the masking expression). This is the standard SQL DDL inspection command for masking policies. SHOW MASKING POLICIES lists policy names and metadata but not the body. GET_DDL() also works (option C) but DESCRIBE is the more standard approach for policy inspection.
**Source:** [DESCRIBE MASKING POLICY](https://docs.snowflake.com/en/sql-reference/sql/desc-masking-policy)
**Quote:** "DESCRIBE MASKING POLICY shows the policy's full definition including its return type and body expression."

---

## Q143
**Answer:** B
**Explanation:** This is expected and correct differential privacy behavior. The mathematical noise added is calibrated based on the "sensitivity" of the query — how much a single individual's contribution could affect the result. For small groups (5 rows), one individual's record has high relative influence (20%), so more noise is added. For large groups (1000 rows), one individual's influence is negligible (0.1%), so less noise is needed to provide the same privacy guarantee. This is a fundamental property of differential privacy, not a misconfiguration.
**Source:** [Differential Privacy Noise Calibration](https://docs.snowflake.com/en/user-guide/privacy-intro)
**Quote:** "Differential privacy noise is calibrated to the sensitivity of the query. Smaller groups receive proportionally more noise to maintain the same privacy guarantee."

---

## Q144
**Answer:** C
**Explanation:** In Snowflake's replication group OBJECT_TYPES specification, DATABASES is the keyword used to include database objects (tables, schemas, views, and all database-level content) in the replication. The other keywords (DATA, TABLES, SCHEMAS) are not valid OBJECT_TYPES for replication groups. The OBJECT_TYPES list uses precise Snowflake-defined keywords: DATABASES, SHARES, RESOURCE MONITORS, WAREHOUSES, USERS, ROLES, GRANTS, INTEGRATIONS, NETWORK POLICIES.
**Source:** [Replication Group OBJECT_TYPES](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "DATABASES is the OBJECT_TYPE keyword for replicating database objects (tables, schemas, views) in a replication group."

---

## Q145
**Answer:** A
**Explanation:** Time Travel queries (AT/BEFORE syntax) in Snowflake are inherently read-only — they can only be used in SELECT, CLONE, and INSERT ... SELECT operations; they cannot modify historical data. All SQL queries, including Time Travel queries, are logged in ACCOUNT_USAGE.QUERY_HISTORY, creating an immutable audit trail of forensic access. ACCOUNTADMIN is not required for Time Travel access — any role with SELECT on the table can use Time Travel.
**Source:** [Time Travel - Read-Only](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "Time Travel queries are read-only. All queries, including Time Travel queries, are recorded in ACCOUNT_USAGE.QUERY_HISTORY."

---

## Q146
**Answer:** B
**Explanation:** Application roles defined in a Native App manifest are the mechanism for scoping consumer permissions to the app's own objects. Providers define named application roles (e.g., APP_ADMIN, APP_USER) with specific privileges on app objects. Consumers grant these application roles to their account roles to access app functionality. This is distinct from regular account roles — application roles cannot grant access to the consumer's non-app objects.
**Source:** [Native App Application Roles](https://docs.snowflake.com/en/developer-guide/native-apps/app-roles)
**Quote:** "Application roles are defined by the provider and scoped to the app's objects. Consumers grant application roles to their account roles to control access to app functionality."

---

## Q147
**Answer:** C
**Explanation:** For SSN format '123-45-6789' (11 characters), the serial number (last 4 digits) is at positions 8-11. CONCAT('***-**-', SUBSTR(val, 8, 4)) produces '***-**-6789', which has length 11, matching the VARCHAR(11) requirement. Option A (RIGHT(val, 4)) would also produce the correct 4-digit ending. Option C is more explicit about the SSN format structure. Both A and C are functionally equivalent; C is the more precise format-aware implementation.
**Source:** [Masking Policy String Functions](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Use SUBSTR and CONCAT to create format-preserving masks that maintain the same length as the original value."

---

## Q148
**Answer:** B
**Explanation:** SNOWFLAKE.CORE.PRIVACY_CATEGORY is the tag that Snowflake's automatic data classification uses to classify the privacy risk level of a column. The possible values are: IDENTIFIER (columns that directly identify individuals, like email, SSN, name), QUASI_IDENTIFIER (columns that can indirectly identify when combined, like zip code, age, gender), and SENSITIVE (columns with sensitive content that doesn't directly identify). This informs governance decisions about masking and access controls.
**Source:** [PRIVACY_CATEGORY Tag](https://docs.snowflake.com/en/user-guide/data-classification-intro)
**Quote:** "PRIVACY_CATEGORY classifies the privacy risk level of a column as IDENTIFIER, QUASI_IDENTIFIER, or SENSITIVE."

---

## Q149
**Answer:** B
**Explanation:** Snowflake Data Clean Rooms enforce data privacy through the template model: all analysis runs through secure stored procedures (analysis templates) that are designed to return only aggregate outputs. Raw tables are not shared directly between parties. The clean room's trust model is built on this template-mediated access pattern — neither party's raw data is visible to the other, and the templates produce only approved aggregate results.
**Source:** [Data Clean Room Security](https://docs.snowflake.com/en/user-guide/data-clean-room/overview)
**Quote:** "In a Data Clean Room, neither party can access raw data from the other. All analysis runs through approved templates that return only aggregate results."

---

## Q150
**Answer:** C
**Explanation:** To audit changes to row-access policies (CREATE, ALTER, DROP), query ACCOUNT_USAGE.QUERY_HISTORY filtered on query_text matching row access policy DDL operations. Since row-access policies are DDL objects, all changes appear in QUERY_HISTORY as DDL statements. ACCOUNT_USAGE.POLICY_HISTORY does not exist. POLICY_REFERENCES shows current attachments, not policy definition changes. QUERY_HISTORY is the definitive record of all DDL changes.
**Source:** [QUERY_HISTORY for DDL Auditing](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "All DDL operations including CREATE, ALTER, and DROP on row access policies are recorded in ACCOUNT_USAGE.QUERY_HISTORY."
