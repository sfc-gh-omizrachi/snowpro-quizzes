# Domain 2: Answers

---

## Q1
**Answer: B**

**Explanation:** RBAC is a security model where access privileges are assigned to roles, and those roles are granted to users. Users access objects through the privileges of their active role. It is not an encryption method, network feature, or masking feature.

**Source:** [Access Control in Snowflake](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Snowflake's approach to access control combines aspects of both of the following models: Role-based access control (RBAC): Access privileges are assigned to roles, which are in turn assigned to users."

---

## Q2
**Answer: B**

**Explanation:** RBAC allows assigning specific privileges (e.g., SELECT on certain tables) to roles, then granting those roles to users. This ensures users only access what their role permits. Network policies control IP access, masking hides data values, and encryption protects data at rest.

**Source:** [Access Control in Snowflake](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Role-based access control (RBAC): Access privileges are assigned to roles, which are in turn assigned to users."

---

## Q3
**Answer: B**

**Explanation:** In Snowflake, roles own securable objects. When an object is created, it is owned by the role that was active at the time of creation. Users and warehouses do not own objects; databases are objects that are owned by roles.

**Source:** [Access Control in Snowflake](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Each securable object is owned by a single role, which by default is the role used to create the object."

---

## Q4
**Answer: A, C**

**Explanation:** Snowflake combines Discretionary Access Control (DAC) and Role-Based Access Control (RBAC). DAC means object owners can grant access to their objects. RBAC means access is managed through roles. Snowflake does not use MAC, ABAC, or Rule-Based Access Control.

**Source:** [Access Control in Snowflake](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Snowflake's approach to access control combines aspects of both of the following models: Discretionary access control (DAC) and Role-based access control (RBAC)."

---

## Q5
**Answer: B**

**Explanation:** In Snowflake's DAC model, each object has an owner (a role), and the owner can grant access on that object to other roles at their discretion. Access is not centrally controlled by the system administrator alone.

**Source:** [Access Control in Snowflake](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Discretionary access control (DAC): Each object has an owner, who can in turn grant access to that object."

---

## Q6
**Answer: C**

**Explanation:** ACCOUNTADMIN is the most powerful system-defined role, combining the capabilities of SYSADMIN and SECURITYADMIN. SYSADMIN manages objects, SECURITYADMIN manages grants and roles, and PUBLIC is a basic role.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ACCOUNTADMIN (aka Account Administrator): Role that encapsulates the SYSADMIN and SECURITYADMIN system-defined roles. It is the top-level role in the system."

---

## Q7
**Answer: C**

**Explanation:** ACCOUNTADMIN is the most powerful role and is typically used for initial account setup, including creating the first databases, warehouses, and role hierarchy. PUBLIC has minimal privileges, and SYSADMIN cannot manage account-level security.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ACCOUNTADMIN: Role that encapsulates the SYSADMIN and SECURITYADMIN system-defined roles. It is the top-level role in the system."

---

## Q8
**Answer: B, C**

**Explanation:** USERADMIN can create and manage users and roles (B). SECURITYADMIN can manage grants and also inherits USERADMIN's capabilities (C). SYSADMIN manages objects, PUBLIC is a default role, and ORGADMIN manages the organization.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "USERADMIN: Role that is dedicated to user and role management only." and "SECURITYADMIN: Role that can manage any object grant globally, as well as create, monitor, and manage users and roles."

---

## Q9
**Answer: B**

**Explanation:** SYSADMIN is designed for creating and managing databases, schemas, warehouses, and other non-security objects. Managing users/roles is USERADMIN/SECURITYADMIN's job, account settings are ACCOUNTADMIN's job, and network policies are SECURITYADMIN's job.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "SYSADMIN (aka System Administrator): Role that has privileges to create warehouses and databases (and other objects) in an account."

---

## Q10
**Answer: B**

**Explanation:** The PUBLIC role is automatically granted to every user in the account. It can own objects and serves as a default role. It is the least privileged system role, not the most, and is not exclusively for data shares or read-only access.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "PUBLIC: Pseudo-role that is automatically granted to every user and every role in your account."

---

## Q11
**Answer: C**

**Explanation:** Snowflake recommends granting all custom roles to SYSADMIN so it can manage objects created under those roles. This creates a clear hierarchy. Granting to ACCOUNTADMIN directly or PUBLIC is not the recommended practice.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "Snowflake recommends creating a hierarchy of custom roles, with the top-most custom role assigned to the SYSADMIN role."

---

## Q12
**Answer: B**

**Explanation:** SECURITYADMIN manages grants (can grant/revoke privileges on any object), creates and manages roles, and monitors access control. Creating databases/warehouses is SYSADMIN's job, billing is ACCOUNTADMIN's, and data operations are handled by other roles.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "SECURITYADMIN: Role that can manage any object grant globally, as well as create, monitor, and manage users and roles."

---

## Q13
**Answer: A, C**

**Explanation:** ACCOUNTADMIN is the top-level role inheriting from SYSADMIN and SECURITYADMIN (A). SECURITYADMIN inherits from USERADMIN (C). SYSADMIN does not inherit from ACCOUNTADMIN (B is reversed). PUBLIC does not inherit from all roles (D), and custom roles can be part of the hierarchy (E).

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ACCOUNTADMIN encapsulates the SYSADMIN and SECURITYADMIN roles... SECURITYADMIN inherits privileges from the USERADMIN role."

---

## Q14
**Answer: B**

**Explanation:** A network policy defines allowed and blocked IP address ranges to control which IP addresses can access Snowflake. It does not manage data retention, warehouse settings, or encryption in transit.

**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "A network policy allows restricting access to your account based on users' IP address."

---

## Q15
**Answer: B**

**Explanation:** A network policy with the corporate IP range in the allowed list restricts Snowflake access to only those IP addresses. Resource monitors track credits, session parameters don't filter IPs at the account level, and Tri-Secret Secure manages encryption keys.

**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "A network policy allows restricting access to your account based on users' IP address. By default, Snowflake allows users to connect from any IP address."

---

## Q16
**Answer: B**

**Explanation:** Multi-factor authentication (MFA) adds a second verification factor (like a mobile app push) beyond the username and password. Key-pair uses cryptographic keys, OAuth uses tokens, and SAML delegates to an IdP.

**Source:** [Multi-Factor Authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "Multi-factor authentication (MFA) adds a second layer of security to the user authentication process."

---

## Q17
**Answer: B**

**Explanation:** Federated authentication delegates identity verification to an external Identity Provider (IdP) using SAML 2.0, allowing users to sign in with their corporate credentials. It is not Snowflake-managed authentication, API keys, or database passwords.

**Source:** [Federated Authentication](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Federated authentication enables users to connect to Snowflake using a SAML 2.0-compliant external identity provider (IdP)."

---

## Q18
**Answer: C**

**Explanation:** Federated authentication with SAML-based SSO enables Snowflake to authenticate users through an external IdP like Okta. Users can sign in with their existing Okta credentials without needing separate Snowflake passwords.

**Source:** [Federated Authentication](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Federated authentication enables users to connect to Snowflake using a SAML 2.0-compliant external identity provider (IdP)."

---

## Q19
**Answer: A, C**

**Explanation:** Key-pair authentication (A) and OAuth (C) are commonly used for programmatic access from applications and scripts. Federated authentication/SAML (B) is typically for interactive browser-based SSO. Biometric (D) and smart card (E) are not supported by Snowflake.

**Source:** [Key-Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Key-pair authentication provides an alternative to username/password authentication for connecting to Snowflake programmatically."

---

## Q20
**Answer: B**

**Explanation:** Key-pair authentication uses an RSA public/private key pair. The public key is registered with the Snowflake user, and the private key is used by the client to authenticate. It is not dual passwords, dual-user approval, or data encryption.

**Source:** [Key-Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Key-pair authentication requires a 2048-bit (minimum) RSA key pair. Snowflake supports key-pair authentication as an alternative to username/password authentication."

---

## Q21
**Answer: B**

**Explanation:** Database roles are defined within a database and manage privileges on objects within that database. They provide a way to organize access control at the database level. They are not organization-level roles and not limited to ACCOUNTADMIN creation.

**Source:** [Database Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#database-roles)

**Quote:** "Database roles are similar to account-level roles, but their scope is within a single database."

---

## Q22
**Answer: B**

**Explanation:** A database role within the specific database is the best approach for granting schema-level access without cross-database exposure. Granting to PUBLIC gives too broad access, ACCOUNTADMIN should not be used for routine access, and network policies control IP access, not object access.

**Source:** [Database Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#database-roles)

**Quote:** "Database roles are similar to account-level roles, but their scope is within a single database."

---

## Q23
**Answer: B**

**Explanation:** Secondary roles combine their privileges with the primary role during a session, allowing a user to access objects across multiple roles simultaneously without switching. They are not backup roles, service-account-only, or auto-expiring.

**Source:** [Secondary Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#secondary-roles)

**Quote:** "Secondary roles allow users to combine the privileges of multiple roles in a single session."

---

## Q24
**Answer: A, C**

**Explanation:** ACCOUNTADMIN is the most powerful role combining SYSADMIN and SECURITYADMIN (A) and can manage account-level parameters and billing (C). It should NOT be the default role for all users (B), it CAN create databases (D), and it is NOT automatically granted to all users (E).

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ACCOUNTADMIN: Role that encapsulates the SYSADMIN and SECURITYADMIN system-defined roles. It is the top-level role in the system."

---

## Q25
**Answer: B**

**Explanation:** ORGADMIN manages organization-level operations such as creating accounts, viewing usage across the organization, and enabling features at the org level. It does not manage individual databases, warehouses, or sharing within an account.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ORGADMIN (aka Organization Administrator): Role that manages operations at the organization level."

---

## Q26
**Answer: B**

**Explanation:** A dynamic data masking policy is a column-level security feature that masks data at query time based on the querying user's role. It does not encrypt databases, prevent data loading, or control warehouse access.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature that uses masking policies to selectively mask plain-text data in table and view columns at query time."

---

## Q27
**Answer: B**

**Explanation:** A dynamic data masking policy can show full SSN values to the HR role while masking them for all other roles. Row access policies control row visibility, not column values. Network policies and object tagging don't mask data.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature that uses masking policies to selectively mask plain-text data in table and view columns at query time."

---

## Q28
**Answer: B**

**Explanation:** A row access policy determines which rows a user can see based on attributes like their role. It controls row-level visibility, not column visibility (that's masking), network access, or warehouse permissions.

**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "A row access policy is a schema-level object that determines whether a given row in a table or view can be viewed from a SELECT statement."

---

## Q29
**Answer: A, C**

**Explanation:** Dynamic data masking provides column-level security (A) and row access policies provide row-level security (C). Resource monitors (B) track credits, warehouse sizing (D) affects compute, and clustering (E) affects query performance.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature" and "A row access policy is a schema-level object that determines whether a given row can be viewed."

---

## Q30
**Answer: B**

**Explanation:** Row access policies determine which rows in a table a user can see, based on attributes like role or department. This is ideal for ensuring departments only see their own patient records. Masking hides column values, clustering affects performance, and secure views hide definitions.

**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "A row access policy is a schema-level object that determines whether a given row in a table or view can be viewed from a SELECT statement."

---

## Q31
**Answer: B**

**Explanation:** Object tagging assigns metadata tags (key-value pairs) to Snowflake objects for classification, governance, and tracking purposes. It is not encryption, warehouse labeling, or schema naming.

**Source:** [Object Tagging](https://docs.snowflake.com/en/user-guide/object-tagging)

**Quote:** "Snowflake supports the ability to apply tags to objects. Tags enable object administrators to track sensitive data for compliance."

---

## Q32
**Answer: B**

**Explanation:** Tag-based masking automatically applies masking policies to columns based on their assigned tags. This means any column tagged with a specific tag automatically gets the associated masking policy. It does not encrypt, prevent dropping, or classify for Marketplace.

**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)

**Quote:** "A tag-based masking policy combines the object tagging and masking policy features to allow a masking policy to be set on a tag."

---

## Q33
**Answer: B**

**Explanation:** Tag-based masking associates a masking policy with a tag, so any column tagged as "PII" automatically has the masking policy applied. This is scalable and automatic. Manually applying policies per column (A) is not scalable.

**Source:** [Tag-Based Masking Policies](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)

**Quote:** "A tag-based masking policy combines the object tagging and masking policy features to allow a masking policy to be set on a tag."

---

## Q34
**Answer: B**

**Explanation:** Privacy policies in Snowflake (including aggregation policies and projection policies) control how data can be queried to prevent identifying individual records. They are not legal documents, network configurations, or encryption policies.

**Source:** [Privacy Policies](https://docs.snowflake.com/en/user-guide/privacy-policies)

**Quote:** "Privacy policies help protect individual-level data by restricting how data can be queried."

---

## Q35
**Answer: A, C**

**Explanation:** Dynamic data masking policies (A) mask column values at query time, and object tagging with tag-based masking (C) enables automatic masking based on tags. Resource monitors (B), warehouse policies (D), and Time Travel (E) are not column protection features.

**Source:** [Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature that uses masking policies to selectively mask plain-text data."

---

## Q36
**Answer: B**

**Explanation:** Trust Center is a centralized security dashboard that monitors and evaluates the security posture of a Snowflake account, identifying risks and providing recommendations. It is not a marketplace, key management tool, or view creator.

**Source:** [Trust Center](https://docs.snowflake.com/en/user-guide/trust-center)

**Quote:** "Trust Center provides a centralized location where account administrators can monitor and improve the security posture of their Snowflake accounts."

---

## Q37
**Answer: B**

**Explanation:** Trust Center provides security assessments including MFA adoption, network policy configuration, and overly permissive roles. Resource monitors track credits, ACCOUNT_USAGE provides usage data, and Marketplace is for data listings.

**Source:** [Trust Center](https://docs.snowflake.com/en/user-guide/trust-center)

**Quote:** "Trust Center provides a centralized location where account administrators can monitor and improve the security posture of their Snowflake accounts."

---

## Q38
**Answer: B**

**Explanation:** Snowflake encrypts all data at rest using AES-256 encryption by default, in all editions. Users do not need to enable encryption manually. It is not AES-128 or RSA.

**Source:** [End-to-End Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)

**Quote:** "All data in Snowflake is encrypted at rest using AES-256 strong encryption."

---

## Q39
**Answer: B**

**Explanation:** Tri-Secret Secure creates a composite encryption key by combining Snowflake's encryption key with a customer-managed key maintained in the customer's cloud provider's key management service. Disabling the customer key makes the data inaccessible.

**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Tri-Secret Secure is the combination of a Snowflake-maintained key and a customer-managed key in the cloud provider to create a composite master key."

---

## Q40
**Answer: B**

**Explanation:** Tri-Secret Secure allows the customer to maintain control over a component of the encryption key. Disabling the customer-managed key makes the data in Snowflake inaccessible, giving the customer ultimate control.

**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Tri-Secret Secure is the combination of a Snowflake-maintained key and a customer-managed key... If the customer disables their key, the data in Snowflake cannot be decrypted."

---

## Q41
**Answer: A, C**

**Explanation:** All data is encrypted at rest using AES-256 by default (A), and data in transit is encrypted using TLS (C). Users do not need to manually enable encryption (B), encryption is available in all editions (D), and AES-256 (not RSA) is used for data at rest (E).

**Source:** [End-to-End Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)

**Quote:** "All data in Snowflake is encrypted at rest using AES-256 strong encryption" and "All communication between clients and Snowflake is protected by TLS."

---

## Q42
**Answer: B**

**Explanation:** Snowflake Alerts monitor conditions using a SQL query and send notifications when the condition evaluates to true. They are not for scheduling queries (that's tasks), managing warehouses, or enforcing masking.

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "An alert is a schema-level object that specifies a condition and an action. When the condition evaluates to true, the action is executed."

---

## Q43
**Answer: B**

**Explanation:** An Alert can be configured with a SQL condition that checks failed login attempts and triggers a notification when the threshold is exceeded. Resource monitors track credits, tasks schedule SQL, and streams track data changes.

**Source:** [Alerts](https://docs.snowflake.com/en/user-guide/alerts)

**Quote:** "An alert is a schema-level object that specifies a condition and an action. When the condition evaluates to true, the action is executed."

---

## Q44
**Answer: B**

**Explanation:** Snowflake notifications deliver messages to external services like email, webhooks, or cloud queues (SNS, Azure Event Grid, Google Pub/Sub) when triggered by alerts or other events. They are not pop-ups or query log entries.

**Source:** [Notifications](https://docs.snowflake.com/en/user-guide/notifications)

**Quote:** "Snowflake can send notifications to external services using notification integrations."

---

## Q45
**Answer: B**

**Explanation:** Database replication copies a database and keeps it synchronized across Snowflake accounts, potentially in different regions or cloud platforms. It is not a same-account backup, same-schema clone, or external sharing mechanism.

**Source:** [Introduction to Replication and Failover](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Replication enables replicating databases, shares, and other account objects across Snowflake accounts in different regions and cloud platforms."

---

## Q46
**Answer: B**

**Explanation:** Database replication creates and maintains a synchronized copy of the database in a different region, providing disaster recovery capability. Data sharing provides access to the same data, cloning creates a point-in-time copy, and Time Travel accesses historical data.

**Source:** [Introduction to Replication and Failover](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Replication enables replicating databases, shares, and other account objects across Snowflake accounts in different regions and cloud platforms."

---

## Q47
**Answer: A, C**

**Explanation:** Replication can copy databases across accounts in different regions/clouds (A), and failover allows switching to a secondary account if the primary becomes unavailable (C). Replication does not work at individual row level (B), automatically merge data (D), or replicate warehouses (E).

**Source:** [Introduction to Replication and Failover](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Replication enables replicating databases... Failover allows a secondary deployment to be designated as the primary."

---

## Q48
**Answer: B**

**Explanation:** Data lineage tracks data as it flows through and is transformed across different Snowflake objects, showing the origin and destination of data. It is not Time Travel snapshots, physical storage location, or table creation order.

**Source:** [Data Lineage](https://docs.snowflake.com/en/user-guide/data-lineage)

**Quote:** "Data lineage shows how data flows from source objects to target objects, including details about the data transformation."

---

## Q49
**Answer: C**

**Explanation:** Snowsight provides a visual data lineage feature that shows how data moves and transforms between objects like tables, views, and stages. Query Profile shows individual query performance, ACCESS_HISTORY logs access events, and Resource Monitors track credits.

**Source:** [Data Lineage](https://docs.snowflake.com/en/user-guide/data-lineage)

**Quote:** "Snowsight provides a visual representation of data lineage, showing how data flows between objects."

---

## Q50
**Answer: B**

**Explanation:** The ACCESS_HISTORY view in the ACCOUNT_USAGE schema records which users accessed which objects and when, providing the audit trail needed for compliance. Query Profile shows performance, Time Travel restores data, and Marketplace is for data listings.

**Source:** [ACCESS_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)

**Quote:** "The ACCESS_HISTORY view records user queries that access data... including the objects that were directly and indirectly accessed."

---

## Q51
**Answer: B**

**Explanation:** A Resource Monitor monitors credit usage by virtual warehouses and can trigger notifications or suspend warehouses when credit thresholds are reached. It does not monitor data quality, network traffic, or query performance.

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "A resource monitor can be used to monitor credit usage by virtual warehouses and the cloud services layer of your account."

---

## Q52
**Answer: A, C**

**Explanation:** Resource monitors can send notifications to administrators (A) and suspend warehouses (immediately or after current statements complete) (C). They cannot resize (B), drop (D), or reduce warehouse size (E).

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "When the threshold is reached, the resource monitor can be configured to: Notify (send an alert notification), Notify & Suspend, Notify & Suspend Immediately."

---

## Q53
**Answer: C**

**Explanation:** Resource monitors can be set at the account level (monitoring all warehouses) or assigned to individual warehouses. They cannot be set at database, schema, or table levels.

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "A resource monitor can be set at the account level or assigned to one or more warehouses."

---

## Q54
**Answer: B**

**Explanation:** An account-level resource monitor with a notify trigger at 90% and a suspend trigger at 100% covers all warehouses in the account. Individual warehouse monitors (A) would not provide total account-level control, and auto-suspend (C) controls idle time, not budget.

**Source:** [Resource Monitors](https://docs.snowflake.com/en/user-guide/resource-monitors)

**Quote:** "A resource monitor can be set at the account level, applying to all warehouses... with trigger actions including Notify and Suspend."

---

## Q55
**Answer: B**

**Explanation:** Credit usage is calculated as warehouse size (credits per hour) multiplied by running time, with per-second billing and a 60-second minimum each time the warehouse starts. It is not based on queries executed, data scanned, or users connected.

**Source:** [Understanding Compute Cost](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)

**Quote:** "Charges are incurred for each second that the warehouse runs, with a minimum of 60 seconds each time the warehouse resumes."

---

## Q56
**Answer: A, C**

**Explanation:** Warehouse size (A) determines the credit rate per hour, and total running time (C) determines how many hours are billed. Data stored (B), number of schemas (D), and Snowflake edition (E) do not affect warehouse credit consumption.

**Source:** [Understanding Compute Cost](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)

**Quote:** "The number of credits consumed depends on the size of the warehouse and how long it runs."

---

## Q57
**Answer: B**

**Explanation:** ACCOUNT_USAGE is a schema in the SNOWFLAKE database that provides historical metadata and usage data for the account, with data retained for up to 365 days. It is not a user data schema, real-time query schema, or authentication schema.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "The ACCOUNT_USAGE schema in the shared SNOWFLAKE database provides historical usage data for the account, including storage, query, login, and warehouse history."

---

## Q58
**Answer: B**

**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY retains up to 365 days of query history, making it suitable for long-term analysis. INFORMATION_SCHEMA has limited history (14 days for query history), Query Profile is for individual queries, and Resource Monitors track credits, not query patterns.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "The QUERY_HISTORY view in the ACCOUNT_USAGE schema provides query history data for up to 365 days."

---

## Q59
**Answer: B**

**Explanation:** ACCOUNT_USAGE has latency (45 min to 3 hours) but retains data up to 365 days. INFORMATION_SCHEMA is near real-time but retains data for shorter periods (7 days to 6 months depending on the view). They are not identical.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "The latency for the ACCOUNT_USAGE views can be from 45 minutes to 3 hours... with data retention of 1 year (365 days)."

---

## Q60
**Answer: A, D**

**Explanation:** WAREHOUSE_METERING_HISTORY (A) tracks credit consumption by warehouses, and STORAGE_USAGE (D) tracks storage costs. TABLE_STORAGE_METRICS (B) provides table-level storage detail, STAGES (C) and FILE_FORMATS (E) are object metadata, not cost management views.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "WAREHOUSE_METERING_HISTORY provides credit usage by warehouse. STORAGE_USAGE provides the average daily data storage usage."

---

## Q61
**Answer: B**

**Explanation:** LOGIN_HISTORY records all login attempts to the account, both successful and failed, including details like user name, client IP, authentication method, and timestamp. It does not track data loading, manage passwords, or track warehouse usage.

**Source:** [LOGIN_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)

**Quote:** "The LOGIN_HISTORY view... can be used to query login attempts by Snowflake users within the last 365 days."

---

## Q62
**Answer: B**

**Explanation:** WAREHOUSE_METERING_HISTORY shows credit consumption by warehouse over time, making it the ideal view for identifying which warehouses are consuming the most credits. QUERY_HISTORY shows individual queries, LOGIN_HISTORY shows logins, and TABLE_STORAGE_METRICS shows storage.

**Source:** [WAREHOUSE_METERING_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history)

**Quote:** "The WAREHOUSE_METERING_HISTORY view can be used to return the hourly credit usage for a single warehouse (or all warehouses in your account)."

---

## Q63
**Answer: B**

**Explanation:** ACCOUNT_USAGE views have latency ranging from 45 minutes to 3 hours depending on the specific view. They are not real-time, not 24 hours delayed, and not 7 days delayed.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "The latency for the ACCOUNT_USAGE views can be from 45 minutes to 3 hours."

---

## Q64
**Answer: C**

**Explanation:** By default, the ACCOUNT_USAGE schema is accessible only to the ACCOUNTADMIN role. Other roles can be granted access via IMPORTED PRIVILEGES on the SNOWFLAKE database.

**Source:** [ACCOUNT_USAGE Schema](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "By default, only the ACCOUNTADMIN role has access to the ACCOUNT_USAGE schema."

---

## Q65
**Answer: A**

**Explanation:** ACCOUNT_USAGE.LOGIN_HISTORY records all login attempts including failed attempts, IP addresses, timestamps, and authentication methods — exactly what's needed for security investigation.

**Source:** [LOGIN_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)

**Quote:** "The LOGIN_HISTORY view can be used to query login attempts by Snowflake users, including the user name, IP address, and whether the login was successful."

---

## Q66
**Answer: B**

**Explanation:** When a role is granted to a user, the user inherits all privileges assigned to that role and can activate it during their session. Existing roles are not revoked, ownership does not transfer, and the role is not permanently set as primary.

**Source:** [Access Control in Snowflake](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "When a role is granted to a user, the user can perform all operations that the role's privileges allow."

---

## Q67
**Answer: A, C**

**Explanation:** ACCESS_HISTORY (A) tracks object access by users, and LOGIN_HISTORY (C) tracks authentication attempts — both essential for compliance auditing. Warehouse auto-suspend (B), clustering (D), and materialized views (E) are not auditing features.

**Source:** [ACCESS_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)

**Quote:** "The ACCESS_HISTORY view records user queries that access data, including the objects that were directly and indirectly accessed."

---

## Q68
**Answer: B**

**Explanation:** In Snowflake's role hierarchy, SECURITYADMIN inherits the privileges of USERADMIN. SECURITYADMIN is higher in the hierarchy and can perform all operations USERADMIN can, plus manage grants.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "SECURITYADMIN inherits privileges from the USERADMIN role."

---

## Q69
**Answer: B**

**Explanation:** Snowflake's data classification feature can automatically detect sensitive data (like emails) using built-in classifiers, then object tags and tag-based masking can be applied to protect the data. Manual review is not scalable, and external scanning is unnecessary.

**Source:** [Data Classification](https://docs.snowflake.com/en/user-guide/governance-classify)

**Quote:** "Snowflake data classification uses system classifiers to categorize personal data and assign tags to columns."

---

## Q70
**Answer: B**

**Explanation:** Logging and tracing capture events, messages, and trace data from code running in Snowflake (stored procedures, UDFs, etc.) for debugging and monitoring. It is not limited to loading errors, network monitoring, or encryption.

**Source:** [Logging and Tracing](https://docs.snowflake.com/en/developer-guide/logging-tracing/logging-tracing-overview)

**Quote:** "Snowflake supports logging and tracing to capture events and trace data from handler code running in Snowflake."

---

## Q71
**Answer: B**

**Explanation:** Log and trace events are stored in an event table configured in the account. The event table is a regular Snowflake table that can be queried for log analysis. Events are not stored externally, in metadata, or in INFORMATION_SCHEMA.

**Source:** [Event Table](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up)

**Quote:** "An event table is a special Snowflake table that stores log messages and trace events from functions and procedures."

---

## Q72
**Answer: B**

**Explanation:** Log messages from stored procedures and UDFs are stored in the account's event table, where they can be queried for debugging. They are not stored in query history, local files, or warehouse cache.

**Source:** [Event Table](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up)

**Quote:** "An event table is a special Snowflake table that stores log messages and trace events from functions and procedures."

---

## Q73
**Answer: A, C**

**Explanation:** Log level (A) controls the verbosity of log messages (INFO, WARN, ERROR, etc.), and trace level (C) controls what trace events are captured (ON_EVENT, ALWAYS, OFF). Warehouse size (B) is unrelated, logs are stored in Snowflake (not necessarily S3) (D), and network policies don't control log access (E).

**Source:** [Logging and Tracing](https://docs.snowflake.com/en/developer-guide/logging-tracing/logging-tracing-overview)

**Quote:** "You can set the log level and trace level to control how much information is captured."

---

## Q74
**Answer: B**

**Explanation:** The GRANT command is used to grant privileges on objects to roles (e.g., GRANT SELECT ON TABLE t TO ROLE r). ASSIGN, SET PRIVILEGE, and ADD PERMISSION are not valid Snowflake commands.

**Source:** [GRANT privileges](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege)

**Quote:** "Grants one or more access privileges on a securable object to a role."

---

## Q75
**Answer: B**

**Explanation:** OWNERSHIP provides full control over an object, including granting privileges to other roles and dropping the object. It is the most powerful privilege on an object. SELECT allows querying, and MODIFY allows DDL changes.

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "OWNERSHIP: Grants full control over the object, including the ability to drop the object and grant or revoke privileges."

---

## Q76
**Answer: B**

**Explanation:** SELECT grants read-only access to query table data. ALL PRIVILEGES would give too much access, OWNERSHIP gives full control, and INSERT/UPDATE allow data modification.

**Source:** [GRANT privileges](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege)

**Quote:** "SELECT: Enables executing a SELECT statement on a table/view."

---

## Q77
**Answer: A, C**

**Explanation:** To create tables in a schema, a role needs USAGE on the database (A) to access the database and CREATE TABLE on the schema (C) to create table objects. SELECT (B) is for querying, OWNERSHIP (D) is excessive, and MONITOR (E) is for warehouse monitoring.

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "USAGE on the database and CREATE TABLE on the schema are required to create tables."

---

## Q78
**Answer: B**

**Explanation:** WITH GRANT OPTION allows the grantee to re-grant the same privilege to other roles. Without it, the grantee can use the privilege but cannot pass it on to others.

**Source:** [GRANT privileges](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege)

**Quote:** "If WITH GRANT OPTION is specified, the grantee can grant the privilege to other roles."

---

## Q79
**Answer: B**

**Explanation:** USAGE on a database allows a role to see the database and access its schemas, but does not automatically grant access to objects within those schemas. Additional grants are needed for table access.

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "USAGE: Enables using a database, including listing schemas in the database."

---

## Q80
**Answer: B**

**Explanation:** To query a table, a user needs SELECT on the table, USAGE on the schema, and USAGE on the database. If they have SELECT and USAGE on schema but missing USAGE on the database, they'll get an insufficient privileges error.

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "To access objects in a schema, a role must have USAGE on both the database and the schema."

---

## Q81
**Answer: B**

**Explanation:** The MANAGE GRANTS global privilege allows a role to grant or revoke privileges on any object in the account, regardless of ownership. SECURITYADMIN has this privilege by default.

**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "MANAGE GRANTS: Enables granting or revoking privileges on any object as if the invoking role were the owner."

---

## Q82
**Answer: B**

**Explanation:** Future grants automatically apply specified privileges to new objects created in a specified scope (database or schema). They are not scheduled grants, expiring grants, or temporary-object-only grants.

**Source:** [Future Grants](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#future-grants-on-database-or-schema-objects)

**Quote:** "Future grants allow defining privileges that are automatically applied to new objects created in a database or schema."

---

## Q83
**Answer: B**

**Explanation:** Future grants automatically apply privileges to newly created objects. A future grant of SELECT on tables in the ANALYTICS schema would ensure the ANALYST role gets SELECT on every new table automatically.

**Source:** [Future Grants](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#future-grants-on-database-or-schema-objects)

**Quote:** "Future grants allow defining privileges that are automatically applied to new objects created in a database or schema."

---

## Q84
**Answer: A, C**

**Explanation:** In managed access schemas, only the schema owner or a role with MANAGE GRANTS can grant privileges (A), centralizing privilege management (C). Object owners cannot grant privileges on their own objects (B is wrong). They are not VPS-only (D) and don't block all access by default (E).

**Source:** [Managed Access Schemas](https://docs.snowflake.com/en/user-guide/security-access-control-overview#managed-access-schemas)

**Quote:** "In a regular (non-managed) schema, object owners can grant access to their objects. In a managed access schema, object owners lose the ability to make grant decisions."

---

## Q85
**Answer: B**

**Explanation:** Secondary roles allow a session to combine privileges from multiple roles simultaneously, without needing to switch between them. This provides broader access without role switching.

**Source:** [Secondary Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#secondary-roles)

**Quote:** "Secondary roles allow users to combine the privileges of multiple roles in a single session."

---

## Q86
**Answer: B**

**Explanation:** The command USE SECONDARY ROLES ALL activates all roles granted to the user as secondary roles, combining their privileges with the primary role. There is no SET SECONDARY_ROLE or GRANT SECONDARY ROLE command for this purpose.

**Source:** [USE SECONDARY ROLES](https://docs.snowflake.com/en/sql-reference/sql/use-secondary-roles)

**Quote:** "USE SECONDARY ROLES ALL activates all roles granted to the user as secondary roles for the current session."

---

## Q87
**Answer: C**

**Explanation:** With secondary roles active, the user has the combined privileges of all active roles (primary + secondary). This means they can access objects permitted by either ANALYST or DATA_ENGINEER.

**Source:** [Secondary Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#secondary-roles)

**Quote:** "When secondary roles are active, the user has the combined privileges of the primary role and all secondary roles."

---

## Q88
**Answer: B**

**Explanation:** Dynamic data masking policies (column-level security) require Enterprise Edition or higher. Standard Edition does not support masking policies. Business Critical and VPS also support them but Enterprise is the minimum.

**Source:** [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions)

**Quote:** "Column-level security" is listed as an Enterprise Edition feature.

---

## Q89
**Answer: A, C**

**Explanation:** Trust Center provides security scanners that detect configuration risks (A) and recommendations for improving security settings such as MFA adoption and network policies (C). It does not resize warehouses (B), auto-mask all PII (D), or handle key rotation for all editions (E).

**Source:** [Trust Center](https://docs.snowflake.com/en/user-guide/trust-center)

**Quote:** "Trust Center provides security scanners to evaluate your account against security best practices and provides recommendations."

---

## Q90
**Answer: B**

**Explanation:** Account identifiers uniquely identify which Snowflake account to connect to. They are used in connection URLs and are essential for authentication. They are not passwords, role definitions, or warehouse specifications.

**Source:** [Account Identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier)

**Quote:** "Each Snowflake account is identified by an account identifier, which is used to connect to Snowflake."

---

## Q91
**Answer: A**

**Explanation:** Disabling the user account with ALTER USER ... SET DISABLED = TRUE immediately prevents that user from logging in. Changing warehouse settings (B), creating network policies (C), or revoking PUBLIC (D) would not prevent login.

**Source:** [ALTER USER](https://docs.snowflake.com/en/sql-reference/sql/alter-user)

**Quote:** "DISABLED = TRUE | FALSE: Specifies whether the user is disabled. A disabled user cannot log in."

---

## Q92
**Answer: B**

**Explanation:** SHOW GRANTS displays the privileges that have been granted to a role or on an object. It does not create grants, revoke grants, or list users.

**Source:** [SHOW GRANTS](https://docs.snowflake.com/en/sql-reference/sql/show-grants)

**Quote:** "Lists all access control privileges that have been explicitly granted to roles, users, and shares."

---

## Q93
**Answer: D**

**Explanation:** In Enterprise Edition and higher, permanent tables can have a Time Travel retention period of up to 90 days. Standard Edition is limited to 1 day. The maximum for Enterprise+ is 90 days.

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Snowflake accounts on Enterprise Edition (or higher), the retention period can be set to any value from 0 up to 90 days."

---

## Q94
**Answer: A, E**

**Explanation:** Snowflake automatically manages encryption keys in all editions (A), and automatic key rotation occurs for Snowflake-managed keys (E). Tri-Secret Secure (B) is a Business Critical feature, so customer keys (C, D) are NOT available in Standard or all editions.

**Source:** [End-to-End Encryption](https://docs.snowflake.com/en/user-guide/security-encryption)

**Quote:** "Snowflake automatically manages the encryption keys used to encrypt your data. Snowflake periodically rotates these keys."

---

## Q95
**Answer: B**

**Explanation:** Snowflake data classification automatically detects and classifies sensitive data like PII across columns in the account. Query Profile shows performance, Resource Monitor tracks credits, and Time Travel restores historical data.

**Source:** [Data Classification](https://docs.snowflake.com/en/user-guide/governance-classify)

**Quote:** "Snowflake data classification uses system classifiers to categorize personal data and assign tags to columns."

---

## Q96
**Answer: B**

**Explanation:** GRANT ROLE role_name TO USER user_name is the correct syntax for granting a role to a user. ASSIGN, SET, and ADD are not valid commands for this purpose.

**Source:** [GRANT ROLE](https://docs.snowflake.com/en/sql-reference/sql/grant-role)

**Quote:** "GRANT ROLE role_name TO USER user_name: Grants the specified role to the specified user."

---

## Q97
**Answer: B**

**Explanation:** The REVOKE command removes a previously granted privilege from a role. It does not delete objects, suspend warehouses, or disable user accounts.

**Source:** [REVOKE privileges](https://docs.snowflake.com/en/sql-reference/sql/revoke-privilege)

**Quote:** "Removes one or more access privileges on a securable object from a role."

---

## Q98
**Answer: B**

**Explanation:** Snowflake roles map closely to LDAP groups for access management. SCIM (System for Cross-domain Identity Management) can provision roles from identity providers, replicating the group-based access model.

**Source:** [SCIM](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use#scim)

**Quote:** "Snowflake supports SCIM to provision and manage users and groups (roles) in Snowflake from an identity provider."

---

## Q99
**Answer: B**

**Explanation:** ACCOUNTADMIN uniquely combines the capabilities of both SYSADMIN and SECURITYADMIN and additionally manages billing, account parameters, and top-level operations. SYSADMIN can create databases, USERADMIN creates users, and SYSADMIN creates warehouses — but only ACCOUNTADMIN has the full set including billing.

**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ACCOUNTADMIN: Role that encapsulates the SYSADMIN and SECURITYADMIN system-defined roles. It is the top-level role in the system."

---

## Q100
**Answer: B, C**

**Explanation:** ACCOUNTADMIN access should be limited to a small number of trusted administrators (B), and all ACCOUNTADMIN users should have MFA enabled (C). It should NOT be the default role for all users (A), NOT be granted to PUBLIC (D), and should still be used when necessary (E).

**Source:** [Access Control Considerations](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Snowflake recommends the following best practices: Designate at least two users as ACCOUNTADMIN... Enable MFA for all users with the ACCOUNTADMIN role."
