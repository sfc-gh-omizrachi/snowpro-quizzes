# Domain 1: Answers

---

## Q1
**Answer: C**

**Explanation:** Using separate Snowflake accounts within the same organization provides the strongest isolation between environments. Separate accounts ensure completely independent RBAC, compute, storage, and metadata — eliminating the risk of accidental cross-environment queries. RBAC within a single account (A) or row access policies (B) provide logical isolation but not the complete separation required by strict regulatory requirements.

**Source:** [Snowflake Organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "An organization is a first-class Snowflake object that links the accounts owned by your business entity. Organizations simplify account management and billing... while still maintaining account-level isolation."

---

## Q2
**Answer: B**

**Explanation:** In Snowflake's parameter hierarchy, session-level settings take the highest precedence. When a parameter is set at both the account level and the session level, the session-level value takes effect. The hierarchy from lowest to highest precedence is: Account → Object → Session.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Parameters can be set at the account level, individual object level (e.g., user, warehouse, database, schema, or table), or session level. Object-level and session-level values override account-level values."

---

## Q3
**Answer: C**

**Explanation:** The recommended RBAC pattern for Snowflake is to create access roles (which hold privileges on specific objects) and functional roles (which map to job functions). Access roles are granted to functional roles, and functional roles are assigned to users. This minimizes role sprawl because access roles are reusable, and functional roles aggregate the right access roles for each job function.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Snowflake recommends creating a hierarchy of custom roles, with the top-most custom role assigned to the system role SYSADMIN. Create object access roles and functional roles for organizing privileges."

---

## Q4
**Answer: B, D**

**Explanation:** Tri-Secret Secure (customer-managed encryption keys) and private connectivity (AWS PrivateLink, Azure Private Link, Google Cloud Private Service Connect) are Business Critical Edition features. Dynamic data masking (A) and 90-day Time Travel (E) are Enterprise features. Multi-cluster warehouses (C) are also Enterprise features.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition... offers even higher levels of data protection... Customer-managed encryption keys through Tri-Secret Secure... Support for private connectivity to the Snowflake service."

---

## Q5
**Answer: C**

**Explanation:** Business Critical Edition is the minimum edition that supports HIPAA compliance (with a signed BAA), Tri-Secret Secure for customer-managed encryption keys, and private connectivity. While VPS also meets these requirements, Business Critical is the standard recommendation for HIPAA workloads. Standard and Enterprise editions do not support HIPAA BAAs or Tri-Secret Secure.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition... is ideal for Snowflake accounts that have extremely sensitive data, particularly PHI data that must comply with HIPAA and HITRUST regulations."

---

## Q6
**Answer: B**

**Explanation:** The parameter hierarchy in Snowflake from lowest to highest precedence is: Account → Object → Session. Account-level parameters serve as defaults, object-level parameters override account-level for that specific object, and session-level parameters override both for the active session.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Parameters can be set at the account level, individual object level, or session level. Object-level and session-level values override account-level values."

---

## Q7
**Answer: A**

**Explanation:** Separate databases per tenant provide strong logical isolation within a single account, with each tenant's data in its own database. Secure data sharing (or secure views spanning databases) enables controlled cross-tenant analytics. Row access policies (B) work but are harder to manage at scale. A single database with TENANT_ID (C) provides weaker isolation. Separate warehouses (D) provide compute isolation but not data isolation.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Secure data sharing enables account-to-account sharing of data through Snowflake database tables, secure views, and secure UDFs."

---

## Q8
**Answer: B**

**Explanation:** SYSADMIN is designed to manage account-level objects like warehouses, databases, and integrations. ACCOUNTADMIN has full control but should be reserved for top-level administration. SECURITYADMIN manages grants and roles. USERADMIN manages users and roles. Best practice is that SYSADMIN manages infrastructure objects while leaving user/role management to SECURITYADMIN and USERADMIN.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "SYSADMIN – A role that has privileges to create warehouses, databases, and other objects in an account, and grant those privileges to other roles."

---

## Q9
**Answer: A, B**

**Explanation:** Multiple accounts provide complete cost isolation since each account has its own billing, making it easy to track costs per business unit. Different Snowflake editions can be selected per account (e.g., Standard for dev, Business Critical for prod). RBAC is still needed within each account (C is wrong). Data replication and sharing must be explicitly configured (D is wrong). There is no automatic shared metadata catalog (E is wrong).

**Source:** [Snowflake Organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "Organizations simplify account management and billing, and support data replication across your accounts."

---

## Q10
**Answer: B**

**Explanation:** The correct approach is to create a SAML 2.0 security integration for SSO and then use authentication policies to differentiate authentication requirements. Authentication policies can specify that human users must use SAML SSO while service accounts (TYPE = SERVICE) use key-pair authentication. This provides granular control at the user level.

**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)

**Quote:** "An authentication policy specifies the authentication methods that can be used to access Snowflake. Authentication policies can be set at the account level or on individual users."

---

## Q11
**Answer: B**

**Explanation:** Database roles are roles that exist within a specific database and can hold privileges on objects within that database. A key advantage is that database roles can be included in data shares, allowing consumers to receive fine-grained access control. They do not replace account-level roles (A), do not provide cross-database access (C), and do not inherit from system roles (D).

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Database roles can be granted privileges on objects in the database in which the role exists. Database roles can be shared with consumers through Secure Data Sharing."

---

## Q12
**Answer: C**

**Explanation:** Aggregate policies enforce minimum group sizes in query results, preventing users from isolating individual records through narrow aggregations. Dynamic masking (A) would mask individual values but still allow row-level access. Row access policies (B) filter rows but don't enforce aggregation minimums. Projection policies (D) prevent columns from appearing in output but don't enforce group sizes.

**Source:** [Aggregate Policies](https://docs.snowflake.com/en/user-guide/aggregate-policies)

**Quote:** "An aggregate policy is a schema-level object that controls what type of query can access data from a table or view. When an aggregate policy is applied, queries against that table or view must aggregate data into groups of a minimum size."

---

## Q13
**Answer: C**

**Explanation:** STATEMENT_TIMEOUT_IN_SECONDS can be set at the account, warehouse (object), or session level. Setting it on a specific warehouse (object level) ensures all queries running on that warehouse adhere to the timeout, regardless of session settings. This is the object-level parameter configuration.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "STATEMENT_TIMEOUT_IN_SECONDS... Can be set for Account, Session, Object (User, Warehouse)."

---

## Q14
**Answer: B, D**

**Explanation:** Key-pair authentication uses RSA key pairs without requiring interactive login, making it ideal for automated processes. OAuth with a refresh token flow allows applications to obtain new access tokens without user interaction. SAML SSO (A) requires browser redirect and user interaction. MFA TOTP (C) requires user input. Password with browser MFA (E) also requires interaction.

**Source:** [Key Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Key pair authentication provides an alternative to password-based authentication. This method requires a minimum 2048-bit RSA key pair. The key pair is generated by the user."

---

## Q15
**Answer: D**

**Explanation:** Cross-Cloud Auto-Fulfillment allows data sharing across different regions and cloud providers without manual replication setup. Snowflake automatically replicates the shared data to the consumer's region. Standard data sharing (A) only works within the same region and cloud provider. Manual replication (B) works but requires more setup and management. Export/import (C) is not real-time.

**Source:** [Sharing Data Across Regions and Cloud Platforms](https://docs.snowflake.com/en/user-guide/secure-data-sharing-across-regions-plaforms)

**Quote:** "Cross-Cloud Auto-Fulfillment automatically replicates shared data and makes it available to consumers across regions and cloud platforms."

---

## Q16
**Answer: B**

**Explanation:** WITH GRANT OPTION allows the grantee role to grant the same privilege to other roles. It does not allow revoking (A), does not propagate automatically to child roles (C), and does not bypass future grants (D).

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "Optionally allows the recipient role to grant the privilege to other roles (using WITH GRANT OPTION)."

---

## Q17
**Answer: B**

**Explanation:** Snowflake's data classification feature automatically scans columns to identify sensitive data types (PII, etc.), applies system tags indicating the data classification, and tag-based masking policies can then automatically apply the appropriate masking based on those tags. This is the most efficient approach for large-scale classification and masking.

**Source:** [Data Classification](https://docs.snowflake.com/en/user-guide/data-classification-overview)

**Quote:** "Data Classification provides a way to discover and classify sensitive data in your Snowflake account by analyzing the data in your tables and metadata."

---

## Q18
**Answer: B**

**Explanation:** Network rules define allowed external network locations (hosts, ports, URLs), and external access integrations reference those rules to allow UDFs and stored procedures to access specific external endpoints. Network policies (A) control inbound access to Snowflake, not outbound from UDFs. Storage integrations (C) are for cloud storage access, not arbitrary network endpoints.

**Source:** [External Access Integration](https://docs.snowflake.com/en/user-guide/external-access-integration)

**Quote:** "An external access integration allows code in user-defined functions (UDFs) and procedures to access specified network locations through network rules."

---

## Q19
**Answer: A, B**

**Explanation:** Secondary roles allow a session to use privileges from the primary role and one or more secondary roles simultaneously, providing broader access without switching roles. USE SECONDARY ROLES ALL activates all roles granted to the user as secondary roles. Secondary roles do not replace the primary role for ownership (C). Any user can activate their own secondary roles (D). Secondary roles are available in Enterprise and higher (E is wrong).

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "A user can activate secondary roles in a session using the USE SECONDARY ROLES command, which enables the session to use the combined privileges of the primary role and all secondary roles."

---

## Q20
**Answer: C**

**Explanation:** The BEST approach combines AWS PrivateLink for private connectivity (eliminating public internet exposure) with a network policy that restricts access to only the VPN CIDR range and ETL server IP through the private link endpoints. PrivateLink alone (B) doesn't restrict which private IPs can connect. A network policy alone (A) still uses the public internet. Cloud-level firewalls (D) don't provide Snowflake-native access control.

**Source:** [AWS PrivateLink and Snowflake](https://docs.snowflake.com/en/user-guide/privatelink)

**Quote:** "AWS PrivateLink enables private connectivity between your Amazon VPCs and Snowflake. Network policies can be used alongside PrivateLink to restrict access to specific IP addresses."

---

## Q21
**Answer: B**

**Explanation:** ACCOUNTADMIN is the top-level system role and is the parent of both SYSADMIN and SECURITYADMIN by default. SECURITYADMIN is the parent of USERADMIN. The hierarchy is: ACCOUNTADMIN → SYSADMIN + SECURITYADMIN → USERADMIN. PUBLIC is the lowest role, granted to all.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "The ACCOUNTADMIN system role is the top-level role in the system. This role encapsulates the SYSADMIN and SECURITYADMIN system-defined roles."

---

## Q22
**Answer: B**

**Explanation:** If custom roles are not granted to SYSADMIN (or another role in the hierarchy leading to ACCOUNTADMIN), objects owned by these "orphaned" roles become inaccessible to ACCOUNTADMIN through normal role inheritance. While ACCOUNTADMIN can use MANAGE GRANTS to regain access, the primary risk is that these objects fall outside the standard management hierarchy, requiring special intervention.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "We recommend creating a hierarchy of roles, with the top-most custom role assigned to the SYSADMIN role. This enables the SYSADMIN role to manage all objects in the account."

---

## Q23
**Answer: B**

**Explanation:** Snowflake uses AES-256 strong encryption for all data at rest. This is applied automatically to all data stored in Snowflake — there is no option to disable it. TLS 1.2 (D) is used for data in transit. RSA-2048 (C) is used for key-pair authentication, not storage encryption.

**Source:** [Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)

**Quote:** "Snowflake encrypts all data at rest using AES-256 strong encryption."

---

## Q24
**Answer: A, C**

**Explanation:** Tri-Secret Secure creates a composite master key from two components: one maintained by Snowflake and one maintained by the customer (in their cloud KMS, not on-premises HSM). If the customer revokes their key, the composite key cannot be constructed, and Snowflake cannot decrypt the data. It is only available in Business Critical and higher (D is wrong). It does not replace Snowflake's encryption (E) — it adds a customer key component.

**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Tri-Secret Secure is the combination of a Snowflake-maintained key and a customer-managed key to create a composite master key to protect your data. If the customer-managed key... is revoked, your data can no longer be decrypted."

---

## Q25
**Answer: A**

**Explanation:** External OAuth allows applications to use tokens issued by an external identity provider (like Azure AD) to authenticate to Snowflake. The architect should create an External OAuth security integration configured for the third-party IdP. Snowflake OAuth (D) uses Snowflake as the authorization server. SAML SSO (D) is for interactive browser-based authentication, not API-based OAuth flows.

**Source:** [External OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "External OAuth allows clients to use a third-party identity provider for authentication to Snowflake."

---

## Q26
**Answer: B**

**Explanation:** Network rules define the network identifiers (IP addresses, VPCE IDs, hostnames) that are allowed or blocked. Network policies then reference one or more network rules to create the access control policy. Network rules do not replace network policies (A); they are components used by network policies.

**Source:** [Network Rules](https://docs.snowflake.com/en/user-guide/network-rules)

**Quote:** "A network rule is a schema-level object that groups related network identifiers. A network policy can reference one or more network rules."

---

## Q27
**Answer: B**

**Explanation:** Separation of duties requires that different individuals manage different security-critical functions. By creating functional roles that separate data access from access control management — and ensuring no single user holds both — the architect enforces a dual-control model. Using ACCOUNTADMIN for all admins (A) concentrates power. Row access policies (C) don't address administrative access control. PUBLIC role (D) is too restrictive.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Create custom roles to define specific security responsibilities, ensuring separation of duties across administrative functions."

---

## Q28
**Answer: B**

**Explanation:** Secure views hide the view definition (DDL) from unauthorized users and prevent certain internal optimizations that could expose underlying data to users who should not see it. They do not perform identically to regular views (A) because some optimizations are bypassed. They do not encrypt data (C) or have schema restrictions (D).

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "With a secure view, the view definition and details are only visible to authorized users. Additionally, the optimizer bypasses certain optimizations used for regular views to ensure that no data is exposed."

---

## Q29
**Answer: A, C**

**Explanation:** Dynamic data masking policies (A) mask column values based on the querying user's role. External tokenization (C) replaces sensitive values with tokens using an external service. Row access policies (B) filter rows, not columns. Aggregate policies (D) enforce group minimums in aggregations. Resource monitors (E) track credit usage.

**Source:** [Column-Level Security](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Snowflake supports column-level security through dynamic data masking or external tokenization."

---

## Q30
**Answer: B**

**Explanation:** SCIM (System for Cross-domain Identity Management) enables centralized user provisioning across multiple Snowflake accounts from a single identity provider. Users are created and managed centrally, and SCIM synchronizes user identities to each Snowflake account. Data sharing (A) doesn't manage users. Database replication (C) doesn't manage identity. Manual creation (D) is not centralized.

**Source:** [Federated Authentication and SSO](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Snowflake supports the SCIM 2.0 standard to enable user and role provisioning and management from an identity provider."

---

## Q31
**Answer: B**

**Explanation:** When a row access policy is applied, the policy function is evaluated for each row during query execution. Only rows where the policy function returns TRUE are included in the query results. Rows where the function returns FALSE are silently filtered out — no error is raised, and no NULL replacements occur.

**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "A row access policy is a schema-level object that determines whether a given row in a table or view can be viewed from a SELECT statement or is consumed by an operator."

---

## Q32
**Answer: B**

**Explanation:** A single masking policy with conditional logic using IS_ROLE_IN_SESSION (or CURRENT_ROLE) can return different masked values based on the querying user's role. This avoids creating multiple views or tables while providing role-based access to different levels of detail from the same table and column.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-use)

**Quote:** "Masking policies can include conditional logic to return different values based on the role of the user running the query, using functions like IS_ROLE_IN_SESSION."

---

## Q33
**Answer: B**

**Explanation:** Projection policies prevent specific columns from appearing in the SELECT output (projection) of a query, while still allowing those columns to be used in WHERE clauses, JOIN conditions, and other non-output operations. Row access policies (A) filter rows. Encryption (C) is a different concept. Projection policies work alongside RBAC, not as an alternative (D).

**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)

**Quote:** "A projection policy is a schema-level object that can prevent queries from using a column in a projection (SELECT clause) while still allowing the column to be used in other clauses such as WHERE and JOIN."

---

## Q34
**Answer: A, C**

**Explanation:** NETWORK_POLICY can be set at the account level to restrict all connections to specific IP ranges. REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION prevents users from embedding cloud credentials directly in stage definitions, enforcing the use of managed storage integrations. WAREHOUSE_SIZE (D) is not an account-level parameter. DEFAULT_ROLE (E) is a user-level parameter.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION: Specifies whether to require a storage integration object as cloud credentials when creating a named external stage."

---

## Q35
**Answer: B**

**Explanation:** Setting DISABLED = TRUE immediately prevents the user from logging in while preserving all their owned objects and role assignments for investigation. Dropping the user (A) would create orphaned objects. Changing the password (C) doesn't prevent key-pair or token-based access. Setting the warehouse to NULL (D) doesn't prevent access.

**Source:** [Access Control Configure](https://docs.snowflake.com/en/user-guide/security-access-control-configure)

**Quote:** "ALTER USER ... SET DISABLED = TRUE disables the user, preventing the user from logging in."

---

## Q36
**Answer: A**

**Explanation:** Object tagging allows administrators to categorize and label database objects and columns with metadata tags. These tags can then drive governance policies such as tag-based masking policies, where masking rules are automatically applied based on tag values. Tags don't create aliases (B), set permissions directly (C), or track performance (D).

**Source:** [Object Tagging](https://docs.snowflake.com/en/user-guide/object-tagging)

**Quote:** "A tag is a schema-level object that can be assigned to another Snowflake object. A tag can be assigned to objects to allow tracking of sensitive data for compliance."

---

## Q37
**Answer: C**

**Explanation:** For FedRAMP Moderate compliance, the deployment must be in a government-approved cloud region (such as AWS GovCloud) with Business Critical Edition (for Tri-Secret Secure, private connectivity, and compliance certifications). A commercial region (B) may not meet FedRAMP requirements. Standard Snowflake (A) on GovCloud lacks the necessary security features. Enterprise Edition (D) doesn't support Tri-Secret Secure.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition is designed for accounts with extremely sensitive data and stringent security and compliance requirements, including HIPAA, PCI DSS, and FedRAMP."

---

## Q38
**Answer: B**

**Explanation:** In SAML 2.0 federated authentication, the customer's Identity Provider (IdP) authenticates the user and issues a SAML assertion. Snowflake acts as the Service Provider (SP) that validates the assertion. The cloud provider (C) is not involved in SAML authentication. SCIM (D) is for user provisioning, not authentication.

**Source:** [Federated Authentication Overview](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "In a SAML-based authentication flow, the identity provider (IdP) authenticates the user and sends a SAML assertion to Snowflake (the service provider)."

---

## Q39
**Answer: A, B**

**Explanation:** MFA can be enforced for specific users or all users through authentication policies, providing granular control. Snowflake uses Duo Security for MFA push notifications and TOTP. MFA does not eliminate password authentication (C) — it adds a second factor. MFA is not automatically enabled (D); it must be enrolled by users. MFA can be controlled per-user through authentication policies (E is wrong).

**Source:** [Multi-Factor Authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "Snowflake supports multi-factor authentication (MFA) to provide increased login security for users connecting to Snowflake. MFA support is powered by the Duo Security service."

---

## Q40
**Answer: A**

**Explanation:** The correct sequence is: (1) Use data classification to automatically identify sensitive columns, (2) Apply object tags based on classification results, (3) Create tag-based masking policies that automatically apply masking based on tag values, (4) Use Access History views to track data lineage and column-level access. This forms a complete governance framework.

**Source:** [Data Governance](https://docs.snowflake.com/en/user-guide/data-governance)

**Quote:** "Snowflake provides a comprehensive set of data governance features, including data classification, object tagging, masking policies, row access policies, and access history."

---

## Q41
**Answer: C**

**Explanation:** ORGADMIN is the organization-level system role that manages accounts within a Snowflake organization. It can create new accounts, view all accounts, and enable features like replication. ACCOUNTADMIN (A) manages a single account. SYSADMIN (B) manages objects within an account. SECURITYADMIN (D) manages access control within an account.

**Source:** [Organizations: Managing Accounts](https://docs.snowflake.com/en/user-guide/organizations-manage-accounts)

**Quote:** "The ORGADMIN role is a system role that manages operations at the organization level, including creating and managing accounts."

---

## Q42
**Answer: B**

**Explanation:** Reader accounts (managed accounts) are created by the data provider specifically for consumers who do not have their own Snowflake account. The provider manages the account and pays for compute. The data stays within Snowflake's security perimeter, unlike CSV exports (A). Reader accounts provide controlled access without requiring the consumer to have a full Snowflake account.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "If a consumer does not have a Snowflake account, providers can create reader accounts (formerly known as managed accounts) that enable consumers to access and query shared data."

---

## Q43
**Answer: B**

**Explanation:** In Snowflake, privileges are additive. When a user has multiple active roles (primary and secondary), the effective privileges are the union of all privileges granted to all active roles. There is no concept of conflicting privileges resulting in the most restrictive winning or causing errors.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "The privileges granted to a user are determined by the privileges granted to the active primary and secondary roles in the user's current session. Privileges are additive."

---

## Q44
**Answer: A, B**

**Explanation:** Tag-based masking requires: (1) tags assigned to columns that identify the data sensitivity, and (2) masking policies associated with specific tag values that define how data should be masked. When a column has a tag with a matching tag-based masking policy, the masking is automatically applied. External tokenization (C) is a different approach. Row access policies (D) are for row-level control.

**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)

**Quote:** "A tag-based masking policy combines the object tagging and masking policy features to allow a masking policy to be set on a tag. When the tag is assigned to a column, the column is automatically protected by the masking policy."

---

## Q45
**Answer: D**

**Explanation:** Cross-Cloud Auto-Fulfillment is designed specifically for sharing data across regions and cloud providers. It automatically handles replication so that consumers in different regions and on different cloud platforms can access shared data. Full replication (A) moves all data and may violate data residency. External tables (C) don't span cloud providers natively. Snowpark Container Services (D) is for running containers, not cross-cloud queries.

**Source:** [Sharing Data Across Regions and Cloud Platforms](https://docs.snowflake.com/en/user-guide/secure-data-sharing-across-regions-plaforms)

**Quote:** "Cross-Cloud Auto-Fulfillment automatically replicates shared data and makes it available to consumers across regions and cloud platforms."

---

## Q46
**Answer: B**

**Explanation:** A storage integration is a Snowflake object that stores a reference to an IAM entity (e.g., AWS IAM role, Azure service principal) for accessing external cloud storage. When an external stage references a storage integration, the stage does not contain inline credentials — the integration manages authentication through the IAM entity.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "A storage integration is a Snowflake object that stores a generated identity and access management (IAM) entity for your external cloud storage, along with an optional set of allowed or blocked storage locations."

---

## Q47
**Answer: A**

**Explanation:** The recommended approach is to create separate access roles for each access pattern (DE_DEV_RW for read-write on dev, DE_PROD_RO for read-only on production, ANALYST_ALL_RO for read-only on both). These access roles are then granted to functional roles. This follows the principle of least privilege and makes access management scalable.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Snowflake recommends creating a hierarchy of custom roles that aligns with business functions. Create object-level access roles for managing privileges on objects."

---

## Q48
**Answer: B**

**Explanation:** The ACCESS_HISTORY view in the SNOWFLAKE.ACCOUNT_USAGE schema tracks which columns were read and which objects were modified by queries. This provides column-level data lineage for compliance and governance requirements. Query History (A) shows queries but not column-level access. COLUMNS view (C) shows schema metadata. SHOW GRANTS (D) shows privileges, not access history.

**Source:** [Access History](https://docs.snowflake.com/en/user-guide/access-history)

**Quote:** "The ACCESS_HISTORY view provides information about what data was read and what data was written by SQL statements, including column-level lineage."

---

## Q49
**Answer: A, D**

**Explanation:** Multiple accounts provide complete environment isolation for compliance (A) — production, development, and staging can be completely separated. Different cloud providers for data residency (D) is another valid use case since each account can be on a different cloud provider in a specific region. Multi-account does not reduce costs (C). Data sharing between accounts must be explicitly configured (E).

**Source:** [Snowflake Organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "Organizations enable seamless management of multiple Snowflake accounts, supporting different cloud providers and regions for regulatory and operational requirements."

---

## Q50
**Answer: B**

**Explanation:** Key-pair authentication is ideal for programmatic access without human interaction. Automated key rotation can be implemented by maintaining two active keys (Snowflake supports up to 2 concurrent public keys per user) and rotating them programmatically. Username/password (A) requires manual rotation. SAML SSO (C) requires browser interaction. OAuth with interactive consent (D) requires human involvement.

**Source:** [Key Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Key pair authentication enables non-interactive authentication... Snowflake supports a maximum of two active public keys per user to enable uninterrupted key rotation."

---

## Q51
**Answer: B**

**Explanation:** SECURITYADMIN holds the MANAGE GRANTS privilege, which allows it to grant and revoke privileges on any object in the account regardless of ownership. USERADMIN holds the CREATE USER and CREATE ROLE privileges, enabling user and role lifecycle management. SECURITYADMIN is the parent of USERADMIN, not the other way around (C).

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "SECURITYADMIN – A role that can manage any object grant globally, as well as create, monitor, and manage users and roles. This role is granted the MANAGE GRANTS security privilege."

---

## Q52
**Answer: B**

**Explanation:** Dynamic data masking is the most appropriate solution for PCI DSS cardholder data protection in Snowflake. The masking policy can check the user's current role and return full data only for the compliance-cleared role. External tokenization (C) is also valid but introduces additional complexity with an external service. Row access policies (D) would hide entire rows, not just the card data. Separate databases (A) are overly complex.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "A masking policy can conditionally mask data at query time based on the role executing the query, protecting sensitive data while allowing authorized roles to view the original values."

---

## Q53
**Answer: B**

**Explanation:** STATEMENT_TIMEOUT_IN_SECONDS controls the maximum number of seconds a SQL statement can run before being automatically cancelled by Snowflake. LOCK_TIMEOUT (A) controls lock wait time. The other options (C, D) are not valid Snowflake parameters.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "STATEMENT_TIMEOUT_IN_SECONDS: Amount of time, in seconds, after which a running SQL statement (query, DDL, DML, etc.) is canceled by the system."

---

## Q54
**Answer: A, C**

**Explanation:** AWS PrivateLink and Azure Private Link provide private connectivity to Snowflake, keeping traffic on the cloud provider's private network and avoiding the public internet. Snowflake does not support VPN tunnels (B), SSH tunneling (D), or direct peering (E) as connectivity options to the Snowflake service.

**Source:** [AWS PrivateLink and Snowflake](https://docs.snowflake.com/en/user-guide/privatelink)

**Quote:** "AWS PrivateLink provides private connectivity to Snowflake by ensuring that traffic between your VPC and Snowflake stays within the AWS network."

---

## Q55
**Answer: B**

**Explanation:** Tag-based masking policies allow associating masking policies with tag values rather than individual columns. By tagging columns with their sensitivity classification and associating masking policies with tag values, new columns only need to be tagged — the masking policy is automatically applied. This dramatically reduces management overhead compared to individual column-level policy assignments.

**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)

**Quote:** "A tag-based masking policy combines the object tagging and masking policy features to allow a masking policy to be set on a tag. When the tag is assigned to a column, the column is automatically protected by the masking policy."

---

## Q56
**Answer: B**

**Explanation:** An authentication policy specifies which authentication methods (password, SSO, key-pair, etc.) are allowed for a user or account. It controls how users can authenticate, not which IPs can connect (that's a network policy), password complexity (that's password policy), or encryption keys (that's Tri-Secret Secure).

**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)

**Quote:** "An authentication policy specifies the authentication methods that can be used to sign in to Snowflake."

---

## Q57
**Answer: B**

**Explanation:** To allow a UDF to access an external REST API, the architect must: (1) create a network rule specifying the allowed API host, (2) create an external access integration that references the network rule, and (3) attach the integration to the UDF definition. This ensures only explicitly approved external endpoints are accessible.

**Source:** [External Access Integration](https://docs.snowflake.com/en/user-guide/external-access-integration)

**Quote:** "An external access integration enables UDFs and procedures to access allowed external network locations. The integration references network rules that specify the allowed endpoints."

---

## Q58
**Answer: B**

**Explanation:** SCIM enables automated user provisioning (creation), deprovisioning (deletion/deactivation), and role/group mapping from the identity provider to Snowflake. It manages the full user lifecycle, not just creation and deletion. It does not manage database objects (C) or network policies (D).

**Source:** [Federated Authentication Overview](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "SCIM automates user identity management, including provisioning, deprovisioning, and synchronizing user attributes and group memberships between the IdP and Snowflake."

---

## Q59
**Answer: A, C**

**Explanation:** To create a masking policy in a schema, a role needs CREATE MASKING POLICY privilege on the schema (A) and USAGE on the database and schema (C) to access the schema. OWNERSHIP on all tables (B) is not required to create a policy. ACCOUNTADMIN membership (D) is not required. APPLY MASKING POLICY (E) is needed to apply a policy, not create one.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-use)

**Quote:** "To create a masking policy, a role must have the CREATE MASKING POLICY privilege on the schema and USAGE on the database and schema."

---

## Q60
**Answer: B**

**Explanation:** Tag-based masking enables centralized governance without the governance team needing to manage individual column-level policy assignments. The governance team owns the tags and the masking policies associated with tag values. Domain teams apply the tags to their columns, triggering automatic masking. Sharing masking policies via data sharing (A) is not supported. Manual implementation (C) lacks enforcement.

**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)

**Quote:** "A tag-based masking policy combines the object tagging and masking policy features to allow a masking policy to be set on a tag."

---

## Q61
**Answer: B**

**Explanation:** When REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION is TRUE, users must reference a storage integration when creating external stages. This prevents embedding raw cloud credentials (access keys, secret keys) directly in stage definitions, improving security. Existing stages are not affected (A). Internal stages are not disabled (C).

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION: When set to TRUE, requires that a storage integration object be included in the CREATE STAGE statement for external stages."

---

## Q62
**Answer: B**

**Explanation:** Setting REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION = TRUE forces the use of storage integrations, which store credentials in Snowflake-managed IAM entities rather than inline in stage definitions. This prevents credentials from being embedded in SQL code that could be exposed in version control.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION: When set to TRUE, requires that a storage integration object be included in the CREATE STAGE statement for external stages."

---

## Q63
**Answer: C**

**Explanation:** In Snowflake, the role that is active (CURRENT_ROLE) when an object is created becomes the owner of that object. If SYSADMIN creates an object, SYSADMIN owns it. But the question asks about objects created "by SYSADMIN" — the active role at creation time is the owner.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "When an object is created, it is owned by the role that is active at the time of creation."

---

## Q64
**Answer: A, C**

**Explanation:** Granting all custom roles ultimately to SYSADMIN (A) ensures SYSADMIN can manage all objects owned by custom roles, preventing orphaned objects. Creating separate access roles for read and write privileges (C) follows the principle of least privilege and enables flexible role composition. Using ACCOUNTADMIN as default (B) is a security anti-pattern. Avoiding system roles (D) breaks the standard hierarchy.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Snowflake recommends creating a hierarchy of custom roles, with the top-most custom role assigned to the system role SYSADMIN."

---

## Q65
**Answer: B**

**Explanation:** Dynamic data masking applies at the column level and works regardless of how the table is accessed — direct queries, views, joins, or subqueries. The masking policy on the salary column returns NULL for non-HR roles and the actual value for HR managers. Secure views (A) exclude the column entirely, preventing even filtered access. Row access policies (C) filter rows, not columns.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Masking policies are applied at the column level and are enforced at query execution time, regardless of how the data is accessed."

---

## Q66
**Answer: A**

**Explanation:** An account-level network policy applies to all users as the default. A user-level network policy overrides the account-level policy for that specific user. If a user has a user-level policy, only that policy applies to them — the account-level policy is not evaluated.

**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "A network policy set on a user overrides the network policy set on the account."

---

## Q67
**Answer: B**

**Explanation:** Direct data sharing within the same region provides zero-copy access to shared data with no replication lag — the consumer sees real-time data from the provider's storage. Database replication (A) introduces replication lag. Export/import (C) is batch-oriented. Snowpipe (D) would create a separate copy with loading delay.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shared data is not copied or transferred between accounts. The consumer accesses the shared data directly from the provider's account, ensuring data is always current."

---

## Q68
**Answer: B**

**Explanation:** The APPLY MASKING POLICY privilege (at the account level) or the APPLY privilege on a specific masking policy allows a role to apply or remove masking policies on tables and columns that it does not own. OWNERSHIP (A) is not required. SELECT (C) allows reading, not applying policies. MODIFY (D) is not a valid Snowflake object privilege.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-use)

**Quote:** "To apply a masking policy to a column, a role must have the APPLY MASKING POLICY privilege on the account or the APPLY privilege on the masking policy."

---

## Q69
**Answer: A, C**

**Explanation:** External access integrations are required when UDFs or stored procedures need to access external network endpoints (not Snowflake-managed storage). A UDF calling an external ML API (A) and a procedure sending results to a webhook (C) both require external network access. Reading from an S3 stage (B) uses storage integrations, not external access integrations. Cross-database queries (D) and view refreshes (E) are internal operations.

**Source:** [External Access Integration](https://docs.snowflake.com/en/user-guide/external-access-integration)

**Quote:** "An external access integration enables UDFs and procedures to access allowed external network locations through network rules."

---

## Q70
**Answer: B**

**Explanation:** The BEST approach is to implement a centralized customer identifier across all tables, use object tagging to identify which tables contain personal data, and use stored procedures to systematically delete matching records. This supports GDPR's right to erasure across a complex data model. Time Travel (A) cannot selectively restore. Masking (C) doesn't actually delete data. Separate accounts per customer (D) is not scalable.

**Source:** [Object Tagging](https://docs.snowflake.com/en/user-guide/object-tagging)

**Quote:** "Tags enable tracking of sensitive data across tables, supporting compliance requirements like GDPR for data classification and management."

---

## Q71
**Answer: B**

**Explanation:** Snowflake automatically rotates encryption keys every 30 days. When a key is rotated, a new version of the key is created, but previous versions are maintained to decrypt data encrypted with older keys. This is an automatic process that requires no customer action.

**Source:** [Encryption Key Management](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Snowflake automatically rotates keys regularly. Active keys are retired and new keys are created. When a key is retired, data that was encrypted with the retired key is automatically re-encrypted with the new key."

---

## Q72
**Answer: B**

**Explanation:** The DAYS_TO_EXPIRY parameter on a user account sets an automatic expiration date. After 90 days, the user account expires and can no longer log in. This is the most operationally efficient approach as it requires no manual intervention to revoke access. Calendar reminders (A) are error-prone. Reader accounts (C) are for sharing, not direct access. Data sharing (D) doesn't provide direct query access to the same objects.

**Source:** [Access Control Configure](https://docs.snowflake.com/en/user-guide/security-access-control-configure)

**Quote:** "DAYS_TO_EXPIRY specifies the number of days after which the user is forced to change their password. The user account becomes disabled after the specified number of days."

---

## Q73
**Answer: B**

**Explanation:** The IMPORTED PRIVILEGES privilege on a shared database grants the consumer role access to all objects included in the share. Without this grant, the consumer cannot access the shared objects. It does not allow modification (A), re-sharing (C), or import masking policies (D).

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "To access a shared database, the consumer must create a database from the share and grant IMPORTED PRIVILEGES to other roles."

---

## Q74
**Answer: A, B**

**Explanation:** Snowflake provides end-to-end encryption: AES-256 for data at rest (A) and TLS 1.2 (or higher) for data in transit (B). Encryption is automatic and always on — customers do not need to provide keys by default (C). Encryption cannot be disabled (D). Keys are never stored in plaintext (E).

**Source:** [Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)

**Quote:** "All data in Snowflake is always encrypted. Data at rest is encrypted using AES-256, and data in transit is encrypted using TLS 1.2 or higher."

---

## Q75
**Answer: B**

**Explanation:** For applications that obtain tokens from Azure AD (an external identity provider), the architect should create an External OAuth security integration configured for Azure AD. This allows Snowflake to validate tokens issued by Azure AD. Snowflake OAuth (D) uses Snowflake as the authorization server. SAML2 (A) is for SSO, not OAuth. SCIM (C) is for user provisioning.

**Source:** [External OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "External OAuth enables clients to use a third-party identity provider (e.g., Azure AD, Okta) to authenticate with Snowflake."

---

## Q76
**Answer: B**

**Explanation:** SHOW PARAMETERS IN SESSION displays the effective parameter values for the current session, reflecting the resolved hierarchy (account → object → session). SHOW PARAMETERS FOR ACCOUNT (A) shows only account-level settings. DESCRIBE PARAMETER (C) and SYSTEM$GET_PARAMETER (D) are not valid Snowflake commands.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "Use SHOW PARAMETERS IN SESSION to view the effective values of all parameters in the current session."

---

## Q77
**Answer: B**

**Explanation:** ORGADMIN provides centralized management of all accounts within a Snowflake organization. Using ORGADMIN, the architect can manage accounts, set organization-wide policies, and maintain governance. Merging into a single account (A) loses isolation benefits. Replication (C) doesn't centralize management. Manual migration (D) is error-prone.

**Source:** [Organizations: Managing Accounts](https://docs.snowflake.com/en/user-guide/organizations-manage-accounts)

**Quote:** "The ORGADMIN role manages operations at the organization level, including creating accounts, viewing all accounts in the organization, and managing replication."

---

## Q78
**Answer: B**

**Explanation:** Row access policies require Enterprise Edition or higher. They are not available in Standard Edition. Business Critical and VPS also support row access policies, but Enterprise is the minimum required edition.

**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "Row access policies require Enterprise Edition or higher."

---

## Q79
**Answer: B, D**

**Explanation:** HIPAA and PCI DSS compliance support (B) and Tri-Secret Secure encryption (D) are Business Critical Edition features. Column-level masking (A), MFA (C), and network policies (E) are available in Enterprise or even Standard editions.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition... Customer-managed encryption keys through Tri-Secret Secure... HIPAA and PCI DSS compliance support."

---

## Q80
**Answer: B**

**Explanation:** When a stored procedure is defined with EXECUTE AS OWNER (caller rights vs. owner rights), the procedure executes with the privileges of the role that owns the procedure, not the role of the user who called it. This allows the procedure to access objects that the calling user might not have direct access to.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Stored procedures defined as EXECUTE AS OWNER run with the privileges of the role that owns the stored procedure."

---

## Q81
**Answer: B**

**Explanation:** Snowflake's preferred account identifier format uses the organization name and account name: <orgname>-<accountname>. This replaces the legacy account locator format (which was region-specific) with a globally unique, human-readable identifier.

**Source:** [Account Identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier)

**Quote:** "The preferred format for an account identifier uses the name of the organization and the name of the account (e.g. myorg-account1)."

---

## Q82
**Answer: B**

**Explanation:** A projection policy prevents a column from being included in query output (SELECT clause) while still allowing it to be used in WHERE, JOIN, and other non-projection operations. This is exactly the requirement — SSN can be used for filtering but cannot appear in results. Masking (A) would show masked values in results. Row access policies (C) filter rows, not columns.

**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)

**Quote:** "A projection policy can prevent queries from using a column in a projection (SELECT clause) while still allowing the column to be used in other clauses such as WHERE and JOIN."

---

## Q83
**Answer: B**

**Explanation:** To use AWS PrivateLink with Snowflake, the customer creates a VPC Interface Endpoint in their AWS account that connects to Snowflake's PrivateLink service. This creates a private connection over the AWS backbone without traversing the public internet. NAT Gateways (A), VPN (C), and Direct Connect (D) are not the correct components for Snowflake PrivateLink.

**Source:** [AWS PrivateLink and Snowflake](https://docs.snowflake.com/en/user-guide/privatelink)

**Quote:** "To configure PrivateLink, create a VPC interface endpoint in your VPC that maps to the Snowflake PrivateLink service."

---

## Q84
**Answer: B, C**

**Explanation:** At least two users should have ACCOUNTADMIN (B) for emergency access and to avoid lockout. All ACCOUNTADMIN users should have MFA enabled (C) to protect this powerful role. ACCOUNTADMIN should NOT be used for day-to-day operations (A), should not directly own all objects (D), and should not be used by data engineers (E).

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Designate at least two users as account administrators... Enable MFA for each user with the ACCOUNTADMIN role."

---

## Q85
**Answer: B**

**Explanation:** Cross-Cloud Auto-Fulfillment enables sharing data across different cloud providers and regions by automatically replicating the shared data. This is the recommended approach for sharing between AWS and Azure accounts in different regions. Manual export/import (A, C) is not real-time. Private listings on Marketplace (D) could work but Auto-Fulfillment is the direct mechanism.

**Source:** [Sharing Data Across Regions and Cloud Platforms](https://docs.snowflake.com/en/user-guide/secure-data-sharing-across-regions-plaforms)

**Quote:** "Cross-Cloud Auto-Fulfillment automatically replicates shared data to consumers across different regions and cloud platforms."

---

## Q86
**Answer: A**

**Explanation:** Setting DATA_RETENTION_TIME_IN_DAYS to 0 disables Time Travel for the database. When data is dropped, it goes directly to Fail-safe (for permanent tables) instead of being available in Time Travel. Data is not permanently deleted immediately (B) because Fail-safe still applies for permanent tables.

**Source:** [Parameters](https://docs.snowflake.com/en/sql-reference/parameters)

**Quote:** "DATA_RETENTION_TIME_IN_DAYS: Number of days for which Snowflake retains historical data for performing Time Travel actions. A value of 0 effectively disables Time Travel."

---

## Q87
**Answer: A**

**Explanation:** Snowflake supports multiple SAML security integrations, allowing different identity providers for different user populations. The architect can create one SAML integration for Azure AD (corporate users) and another for Okta (contractors), then configure users to authenticate through their respective IdP.

**Source:** [Federated Authentication Configure](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-configure-snowflake)

**Quote:** "Snowflake supports configuring multiple SAML identity providers for federated authentication."

---

## Q88
**Answer: B**

**Explanation:** The ACCESS_HISTORY view in the ACCOUNT_USAGE schema provides column-level data lineage, showing how data flows from source columns to target columns through SQL operations. Query History (A) shows query text but not lineage. TABLE_CONSTRAINTS (C) shows constraint metadata. SHOW OBJECTS (D) lists objects.

**Source:** [Data Governance: Lineage](https://docs.snowflake.com/en/user-guide/data-governance-lineage)

**Quote:** "Access History provides column-level lineage information, tracking how data flows from source to target through SQL operations."

---

## Q89
**Answer: A, B**

**Explanation:** Data classification (A) automatically identifies columns containing sensitive data (PII, financial data, etc.). Object tagging (B) allows labeling objects and columns with metadata tags indicating data sensitivity. Together, they enable organizations to discover and catalog where sensitive data resides. Resource monitors (C), QAS (D), and auto-clustering (E) are not governance features.

**Source:** [Data Governance](https://docs.snowflake.com/en/user-guide/data-governance)

**Quote:** "Snowflake data governance features include data classification to identify sensitive data and object tagging to categorize objects for tracking and compliance."

---

## Q90
**Answer: B**

**Explanation:** Using different editions per environment optimizes cost while meeting security requirements. Dev uses Standard (cheapest, fewest features needed), Staging uses Enterprise (testing features like masking policies), and Production uses Business Critical (highest security for sensitive data). Replication enables data promotion between accounts. Single account (A) lacks isolation. Identical BC accounts (C) are more costly than necessary for dev.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Organizations can use different Snowflake editions for different accounts to match their security, governance, and cost requirements."

---

## Q91
**Answer: A**

**Explanation:** Only one masking policy can be applied to a single column at a time. If you need to change the masking behavior, you must replace the existing policy. Multiple policies cannot be stacked on the same column.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-use)

**Quote:** "Only one masking policy can be set on a column at a time."

---

## Q92
**Answer: B**

**Explanation:** Projection policies prevent specific columns from appearing in query results (SELECT output) while still allowing the columns to be used in WHERE clauses and JOINs. This is the precise solution for preventing SELECT * from exposing sensitive columns. Masking (A) would still show the column (with masked values). Secure views (C) would require changing query patterns. Row access policies (D) filter rows, not columns.

**Source:** [Projection Policies](https://docs.snowflake.com/en/user-guide/projection-policies)

**Quote:** "A projection policy can prevent queries from using a column in a projection (SELECT clause) while still allowing the column to be used in other clauses."

---

## Q93
**Answer: B**

**Explanation:** When a network policy is applied to a security integration (such as an OAuth or SAML integration), it only applies to connections that authenticate through that specific integration. This allows different network restrictions for different authentication paths without affecting other connections.

**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "A network policy can be set on a security integration. When set on a security integration, the policy applies to all requests that use the integration."

---

## Q94
**Answer: A, C**

**Explanation:** In key-pair authentication, the user generates an RSA key pair, stores the public key in Snowflake, and keeps the private key securely on their side (A). Snowflake supports up to 2 active public keys per user (C) to enable zero-downtime key rotation. Key-pair auth is available in all editions (B is wrong). The private key is never uploaded to Snowflake (E is wrong).

**Source:** [Key Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Snowflake supports using a key pair for authentication... The public key is stored in Snowflake... Snowflake supports a maximum of two active public keys per user to enable uninterrupted key rotation."

---

## Q95
**Answer: B**

**Explanation:** Aggregate policies enforce a minimum group size in query results, preventing users from isolating individual records. Setting the minimum group size to 10 ensures that any aggregate result must contain at least 10 records, preventing individual record identification through narrow filters.

**Source:** [Aggregate Policies](https://docs.snowflake.com/en/user-guide/aggregate-policies)

**Quote:** "An aggregate policy controls what type of query can access data from a table or view. When applied, queries must aggregate data into groups of a minimum size."

---

## Q96
**Answer: B**

**Explanation:** The PUBLIC role is automatically granted to every user and every role in the account. It serves as the base role in the hierarchy. It cannot be dropped (C), and it can own objects (D). It does not need to be explicitly granted to users (A) because it is automatic.

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Every user and role in a Snowflake account is automatically granted the PUBLIC role."

---

## Q97
**Answer: B**

**Explanation:** For Google Cloud Private Service Connect with Snowflake, the customer creates a forwarding rule and Private Service Connect endpoint in their GCP project that targets Snowflake's published service attachment. This establishes private connectivity over Google's network. VPN tunnels (A), Cloud NAT (C), and Cloud Interconnect (D) are not the correct approach for Snowflake PSC.

**Source:** [Private Service Connect and Snowflake](https://docs.snowflake.com/en/user-guide/privatelink-gcp)

**Quote:** "To configure Private Service Connect, create a forwarding rule and Private Service Connect endpoint in your GCP project that targets Snowflake's service attachment."

---

## Q98
**Answer: B**

**Explanation:** The APPLY ROW ACCESS POLICY privilege allows a role to apply or remove row access policies on tables, even when the role does not own those tables. This separates the governance function (applying policies) from the data ownership function. It does not create policies (A), bypass policies (C), or grant data access (D).

**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-using)

**Quote:** "The APPLY ROW ACCESS POLICY privilege enables a role to add and drop row access policies on tables."

---

## Q99
**Answer: A, B**

**Explanation:** Key-pair authentication (A) uses RSA key pairs for machine-to-machine authentication without interactive login. Snowflake OAuth with client credentials flow (B) allows applications to authenticate programmatically. SAML SSO (C) requires browser interaction. Password with mandatory MFA push (D) requires user interaction. Certificate-based mutual TLS (E) is not a Snowflake authentication method.

**Source:** [Key Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Key pair authentication provides an alternative to password-based authentication, suitable for non-interactive connections."

---

## Q100
**Answer: A**

**Explanation:** Setting up bidirectional data sharing between accounts allows both organizations to access each other's data during the transition period. This provides a smooth migration path while maintaining data accessibility. A phased migration can then consolidate into the parent account over time. Immediately dropping the acquired account (B) risks data loss. External storage (C) adds complexity. Parallel ETL (D) creates duplicate data management.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Data sharing enables seamless, secure sharing of data between Snowflake accounts without copying or moving data."

---

## Q101
**Answer: B**

**Explanation:** IS_ROLE_IN_SESSION() checks whether a specific role is among the active roles (primary and secondary) in the current session. This is the recommended function for masking policies because it correctly handles secondary roles. CURRENT_ROLE() (A) only returns the primary role and would miss secondary role activations.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-use)

**Quote:** "Use the IS_ROLE_IN_SESSION function in masking policies to check for the existence of a role in the current session, including secondary roles."

---

## Q102
**Answer: B**

**Explanation:** For non-secure views, the Snowflake optimizer may push predicates from the outer query into the view definition, potentially bypassing masking policies if the view owner has unmasked access. Secure views prevent this optimizer behavior. Masking policies do apply to views (A is wrong), but the optimizer behavior with non-secure views can leak data.

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "With a secure view, the optimizer bypasses certain optimizations used for regular views to ensure that no data is exposed."

---

## Q103
**Answer: B**

**Explanation:** The CREATE SHARE privilege at the account level is required to create a share. This privilege is typically held by roles that manage data sharing. USAGE on a database (A) is needed for sharing objects but not for creating the share itself. SYSADMIN (C) has this privilege by default but it's the privilege, not the role, that matters.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "To create a share, a role must have the CREATE SHARE privilege on the account."

---

## Q104
**Answer: A, C**

**Explanation:** Snowflake automatically rotates the account master key periodically (A). When a key is rotated, previous key versions are maintained (C) so that data encrypted with older keys can still be decrypted until it is re-encrypted with the new key. Data does not need to be re-encrypted immediately (B). Automatic rotation works without Tri-Secret Secure (D) and requires no maintenance window (E).

**Source:** [Encryption Key Management](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Snowflake automatically rotates encryption keys. When a key is rotated, the retired key is maintained to decrypt data that was encrypted with that key version."

---

## Q105
**Answer: B**

**Explanation:** Tag-based masking policies are the recommended approach for large-scale masking. By classifying columns with sensitivity tags (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED) and associating masking policies with each tag value, new columns only need to be tagged — the masking policy is automatically applied. This is far more scalable than manual column-level assignments (A) or complex case statements (D).

**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)

**Quote:** "A tag-based masking policy combines the object tagging and masking policy features to allow a masking policy to be set on a tag."

---

## Q106
**Answer: A**

**Explanation:** Snowflake OAuth is a built-in OAuth service where Snowflake itself acts as both the authorization server and resource server. It generates and validates OAuth tokens internally without needing an external authorization server. External OAuth, by contrast, relies on a third-party IdP (like Azure AD or Okta) to issue tokens.

**Source:** [OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "Snowflake OAuth uses Snowflake as the OAuth authorization server. With Snowflake OAuth, no external OAuth server is required."

---

## Q107
**Answer: A**

**Explanation:** One account per subsidiary provides billing isolation, allows different editions and cloud providers per subsidiary, and maintains independence. ORGADMIN manages the organization centrally. Data sharing enables sharing reference data across accounts. Replication can distribute policy templates. A single account (B) lacks billing isolation. Independent contracts (C) lack centralized governance. Separate warehouses (D) don't provide billing isolation.

**Source:** [Organizations: Managing Accounts](https://docs.snowflake.com/en/user-guide/organizations-manage-accounts)

**Quote:** "Organizations provide centralized account management, with each account having its own billing and configuration while sharing organizational governance."

---

## Q108
**Answer: B**

**Explanation:** The MANAGE GRANTS privilege allows SECURITYADMIN to grant and revoke privileges on any object in the account, regardless of who owns the object. This is a powerful privilege that enables centralized access control management. It does not create roles (A), manage encryption (C), or provide data access (D).

**Source:** [Access Control Overview](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "The MANAGE GRANTS privilege enables the SECURITYADMIN role to grant or revoke privileges on objects in the account."

---

## Q109
**Answer: A, D**

**Explanation:** Ensuring all custom roles grant up to SYSADMIN (A) maintains a clean hierarchy and prevents orphaned roles that could accumulate unchecked privileges. Using future grants (D) provides predictable, consistent privilege assignment to new objects, avoiding ad-hoc grant sprawl that can lead to privilege escalation. Granting ACCOUNTADMIN broadly (C) is the opposite of preventing escalation. Disabling SECURITYADMIN (E) would break access control.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Create a hierarchy of custom roles with the top-most custom role assigned to SYSADMIN. Use future grants to define default access for new objects."

---

## Q110
**Answer: B**

**Explanation:** CURRENT_ROLE() only returns the primary role of the session, not secondary roles. If the masking policy checks CURRENT_ROLE() = 'DATA_STEWARD' and DATA_STEWARD is only a secondary role, the check fails and data appears masked. The correct function is IS_ROLE_IN_SESSION('DATA_STEWARD'), which checks both primary and secondary roles.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-use)

**Quote:** "Use IS_ROLE_IN_SESSION to check for the existence of a role in the current session, which includes both the primary role and any active secondary roles."

---

## Q111
**Answer: B**

**Explanation:** External tokenization requires Enterprise Edition or higher. It involves calling an external tokenization service through external functions, which is an Enterprise feature. Standard Edition (A) does not support it. It is not limited to Business Critical (C), and it does require at minimum Enterprise (D is wrong).

**Source:** [External Tokenization](https://docs.snowflake.com/en/user-guide/security-column-ext-token-intro)

**Quote:** "External tokenization is available in Enterprise Edition and higher."

---

## Q112
**Answer: B**

**Explanation:** Programmatic Snowflake OAuth allows the web application to act as an OAuth client, obtaining tokens for individual users. This maintains individual user identity for audit purposes while the application manages authentication. Creating individual users with passwords (A) doesn't scale. A single service account (C) loses individual identity. SAML SSO (D) requires browser-based authentication, which may not work for API-style access.

**Source:** [OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "OAuth enables applications to access Snowflake on behalf of users without storing their credentials."

---

## Q113
**Answer: B**

**Explanation:** INITIAL_REPLICATION_SIZE_LIMIT_IN_TB sets the maximum amount of data that can be transferred during the initial replication of a database to another account. This helps control costs and bandwidth during the first replication. It does not limit total storage (A), table sizes (C), or daily load volumes (D).

**Source:** [Database Replication](https://docs.snowflake.com/en/user-guide/database-replication-intro)

**Quote:** "INITIAL_REPLICATION_SIZE_LIMIT_IN_TB limits the data transfer size for the initial replication of a database."

---

## Q114
**Answer: A, B**

**Explanation:** Network policies can be applied at the account level, affecting all connections (A), and at the individual user level, overriding the account-level policy for that user (B). Network policies cannot be applied at the database (C), warehouse (D), or table (E) level.

**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "A network policy can be applied at the account level or to individual users. A user-level network policy overrides the account-level network policy."

---

## Q115
**Answer: B**

**Explanation:** Tri-Secret Secure creates a composite master key from both a Snowflake-maintained key and a customer-maintained key. If the customer revokes their key from their cloud KMS, the composite key cannot be constructed, effectively rendering all data undecryptable. This provides a "kill switch" for data access. Standard encryption (A) doesn't offer customer control. Client-side encryption (D) is outside Snowflake's management.

**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "If the customer-managed key is revoked, the composite master key cannot be recreated, and the data stored in Snowflake cannot be decrypted."

---

## Q116
**Answer: C**

**Explanation:** SCIM integrations are typically owned by SECURITYADMIN or a custom role with user management privileges, since SCIM manages user and role lifecycle operations. ACCOUNTADMIN (B) is too powerful for day-to-day operations. SYSADMIN (A) manages infrastructure, not users. PUBLIC (D) has no management capabilities.

**Source:** [Federated Authentication Overview](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "The SCIM integration should be owned by a role with sufficient privileges to manage users and roles, such as SECURITYADMIN."

---

## Q117
**Answer: B**

**Explanation:** A data clean room implementation in Snowflake uses secure views to control data visibility, row access policies to restrict row-level access, and aggregate policies to ensure only aggregated results (not individual records) are returned. This enables overlap analysis without exposing raw data from either party. Standard sharing (A) exposes raw data. A neutral account (C) requires data movement. External tables (D) don't provide the governance controls needed.

**Source:** [Aggregate Policies](https://docs.snowflake.com/en/user-guide/aggregate-policies)

**Quote:** "Aggregate policies can be used in data clean room implementations to ensure that queries return only aggregated results that meet minimum group size requirements."

---

## Q118
**Answer: A**

**Explanation:** Only one network policy can be active at the account level at any given time. If you need to change the account-level policy, you must replace the existing one. However, individual users can have their own user-level network policies that override the account-level policy.

**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "Only one network policy can be associated with an account at any time."

---

## Q119
**Answer: A, C**

**Explanation:** Private connectivity (PrivateLink) ensures that traffic between the customer's VPC/VNet and Snowflake stays on the cloud provider's private backbone (A), eliminating exposure to the public internet (C). It does not affect encryption key management (B), does not replace authentication (D), and does not auto-configure network policies (E).

**Source:** [AWS PrivateLink and Snowflake](https://docs.snowflake.com/en/user-guide/privatelink)

**Quote:** "AWS PrivateLink provides private connectivity to Snowflake, ensuring that traffic stays within the AWS network and does not traverse the public internet."

---

## Q120
**Answer: B**

**Explanation:** The recommended remediation is to grant DATA_PIPELINE_ROLE to SYSADMIN, restoring the role hierarchy. This ensures SYSADMIN can manage objects owned by DATA_PIPELINE_ROLE going forward. Dropping and re-creating (A) would disrupt operations. Transferring ownership (C) changes the owner but doesn't fix the hierarchy. Force-granting (D) doesn't fix the structural issue.

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Snowflake recommends creating a hierarchy of custom roles, with the top-most custom role assigned to the system role SYSADMIN."

---

## Q121
**Answer: A**

**Explanation:** ALLOW_CLIENT_MFA_CACHING controls whether MFA tokens can be cached on the client side, reducing the frequency of MFA prompts during repeated connections. When enabled, users don't need to re-authenticate with MFA for every connection within the cache duration. It doesn't control whether MFA is required (B), token duration (C), or delivery method (D).

**Source:** [Multi-Factor Authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "ALLOW_CLIENT_MFA_CACHING enables caching of the MFA token on the client to reduce the number of prompts during repeated connections."

---

## Q122
**Answer: B**

**Explanation:** Business Critical Edition in an EU region provides the necessary compliance features (SOC 2 Type II compliance documentation from Snowflake, HIPAA/PCI support) and data residency in the EU for GDPR. Snowflake's data governance features (classification, masking, access history) support GDPR requirements. Standard Edition (C) lacks compliance certifications. VPS (D) is more than needed and self-certification is not appropriate.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Business Critical Edition is designed for accounts with extremely sensitive data and stringent security requirements, including regulatory compliance."

---

## Q123
**Answer: B**

**Explanation:** A reader account is a managed account created by the data provider to enable sharing with consumers who don't have their own Snowflake account. The provider manages the account and pays for its compute resources. Reader accounts have limited capabilities — they cannot create their own databases (C) or shares.

**Source:** [Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Reader accounts (formerly known as managed accounts) are created by data providers for consumers who do not have Snowflake accounts, enabling them to access shared data."

---

## Q124
**Answer: A, C**

**Explanation:** Regulatory requirements for environment isolation and data residency (A) are key factors — regulations may mandate that production data cannot coexist with dev/test environments, or that data must reside in specific regions. Billing separation (C) is another key factor — multi-account provides natural billing boundaries per business unit. The number of tables (B), programming language (D), and SQL version (E) are not factors in the account strategy decision.

**Source:** [Snowflake Organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "Multi-account strategies are driven by requirements for environment isolation, data residency, billing separation, and edition flexibility."

---

## Q125
**Answer: A**

**Explanation:** A zero-trust model requires: (1) strong authentication — MFA enforced via authentication policies, (2) private network access — PrivateLink eliminates public internet exposure, and (3) fine-grained authorization — RBAC with access/functional roles plus masking policies for data-level control. Password-only (B) is weak authentication. VPN (C) is not zero-trust. No network restrictions (D) violates zero-trust principles.

**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)

**Quote:** "Authentication policies specify the authentication methods allowed for accessing Snowflake, enabling enforcement of multi-factor authentication requirements."
