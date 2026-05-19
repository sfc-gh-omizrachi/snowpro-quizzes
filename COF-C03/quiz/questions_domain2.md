# Domain 2: Account Management & Data Governance

---

## Q1 (Single Answer)
What is Role-Based Access Control (RBAC) in Snowflake?
- A) A method of encrypting data at rest
- B) A security model where access privileges are assigned to roles, and roles are granted to users
- C) A network security feature that restricts IP addresses
- D) A feature for masking sensitive data in columns

---

## Q2 (Scenario)
A security administrator needs to ensure that users can only access the specific tables and functions required for their job. Which Snowflake access control model should they implement?
- A) Network policies
- B) Role-Based Access Control (RBAC)
- C) Data masking policies
- D) Encryption key management

---

## Q3 (Single Answer)
In Snowflake's access control model, which type of entity can own securable objects?
- A) Users
- B) Roles
- C) Warehouses
- D) Databases

---

## Q4 (Multi Answer - Select 2)
Which TWO access control models does Snowflake combine? (Select 2)
- A) Discretionary Access Control (DAC)
- B) Mandatory Access Control (MAC)
- C) Role-Based Access Control (RBAC)
- D) Attribute-Based Access Control (ABAC)
- E) Rule-Based Access Control

---

## Q5 (Single Answer)
What does Discretionary Access Control (DAC) mean in the Snowflake context?
- A) The system administrator controls all access
- B) Each object has an owner who can grant access to that object to other roles
- C) Access is determined by user attributes like department
- D) Network policies control all data access

---

## Q6 (Single Answer)
Which system-defined role in Snowflake has the highest level of privileges and can manage all aspects of the account?
- A) SYSADMIN
- B) SECURITYADMIN
- C) ACCOUNTADMIN
- D) PUBLIC

---

## Q7 (Scenario)
A new Snowflake account is provisioned. The first administrator needs to create databases, warehouses, and set up the initial role hierarchy. Which system-defined role should they use initially?
- A) PUBLIC
- B) SYSADMIN
- C) ACCOUNTADMIN
- D) USERADMIN

---

## Q8 (Multi Answer - Select 2)
Which TWO system-defined roles are responsible for managing users and roles? (Select 2)
- A) SYSADMIN
- B) USERADMIN
- C) SECURITYADMIN
- D) PUBLIC
- E) ORGADMIN

---

## Q9 (Single Answer)
What is the purpose of the SYSADMIN role in Snowflake?
- A) To manage users and roles
- B) To create and manage databases, schemas, warehouses, and other objects
- C) To manage account-level settings and billing
- D) To manage network policies and encryption

---

## Q10 (Single Answer)
What is the purpose of the PUBLIC role in Snowflake?
- A) It is the most privileged role in the account
- B) It is automatically granted to every user and can own objects, acting as a default role
- C) It is used exclusively for managing public data shares
- D) It provides read-only access to all databases

---

## Q11 (Scenario)
An organization wants to follow Snowflake's recommended practice for role hierarchy. They want custom roles to be usable by SYSADMIN for centralized management. What should they do?
- A) Grant all custom roles directly to ACCOUNTADMIN
- B) Grant all custom roles to the PUBLIC role
- C) Grant all custom roles to SYSADMIN so it inherits their privileges
- D) Do not create a role hierarchy

---

## Q12 (Single Answer)
What is the SECURITYADMIN role responsible for in Snowflake?
- A) Creating databases and warehouses
- B) Managing grants, creating and managing roles, and monitoring access control
- C) Managing billing and account settings
- D) Loading and unloading data

---

## Q13 (Multi Answer - Select 2)
Which TWO statements about Snowflake's role hierarchy are correct? (Select 2)
- A) ACCOUNTADMIN is the top-level role that inherits privileges from SYSADMIN and SECURITYADMIN
- B) SYSADMIN inherits privileges from ACCOUNTADMIN
- C) SECURITYADMIN inherits privileges from USERADMIN
- D) PUBLIC role inherits privileges from all other roles
- E) Custom roles cannot be part of the hierarchy

---

## Q14 (Single Answer)
What is a network policy in Snowflake?
- A) A policy that defines data retention periods
- B) A rule that restricts access to Snowflake based on allowed and blocked IP address ranges
- C) A policy for managing warehouse auto-suspend
- D) A rule for encrypting data in transit

---

## Q15 (Scenario)
A company's security team requires that Snowflake can only be accessed from their corporate IP range (10.0.0.0/8). How should they implement this restriction?
- A) Configure a resource monitor
- B) Create a network policy with the corporate IP range in the allowed list
- C) Set a session parameter for IP filtering
- D) Enable Tri-Secret Secure

---

## Q16 (Single Answer)
Which Snowflake authentication method provides an additional layer of security by requiring a second verification factor beyond username and password?
- A) Key-pair authentication
- B) Multi-factor authentication (MFA)
- C) OAuth
- D) SAML-based SSO

---

## Q17 (Single Answer)
What is federated authentication in Snowflake?
- A) Authentication using only Snowflake-managed credentials
- B) Authentication that delegates identity verification to an external Identity Provider (IdP) using SAML 2.0
- C) Authentication using API keys
- D) Authentication using database-level passwords

---

## Q18 (Scenario)
A company uses Okta as their identity provider and wants employees to sign in to Snowflake with their existing corporate credentials. Which authentication method should they configure?
- A) Key-pair authentication
- B) Multi-factor authentication (MFA)
- C) Federated authentication with SAML-based SSO
- D) Basic authentication with username/password

---

## Q19 (Multi Answer - Select 2)
Which TWO authentication methods are supported for programmatic access to Snowflake (e.g., from applications or scripts)? (Select 2)
- A) Key-pair authentication
- B) Federated authentication via SAML
- C) OAuth
- D) Biometric authentication
- E) Smart card authentication

---

## Q20 (Single Answer)
What is key-pair authentication in Snowflake?
- A) A method using two passwords
- B) An authentication method using a public/private RSA key pair, where the private key is held by the client
- C) A method that requires two users to approve access
- D) An encryption method for data at rest

---

## Q21 (Single Answer)
What are database roles in Snowflake?
- A) Roles that exist at the organization level
- B) Roles that are defined within a database and can be used to manage privileges on objects within that database
- C) Roles that can only be created by ACCOUNTADMIN
- D) Roles that apply to warehouses only

---

## Q22 (Scenario)
A data architect needs to grant analysts read-only access to specific schemas within a single database, without giving them any access to other databases. Which approach is most appropriate?
- A) Grant SELECT on the schemas to the PUBLIC role
- B) Create a database role within that database and grant it the required privileges
- C) Use ACCOUNTADMIN to grant access directly to each user
- D) Create a network policy for the analysts

---

## Q23 (Single Answer)
What are secondary roles in Snowflake?
- A) Backup roles that activate when primary roles fail
- B) Additional roles whose privileges are combined with the primary role during a session
- C) Roles that can only be used by service accounts
- D) Roles that are automatically dropped after 30 days

---

## Q24 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's ACCOUNTADMIN role? (Select 2)
- A) It is the most powerful role, combining SYSADMIN and SECURITYADMIN
- B) It should be used as the default role for all users
- C) It can manage account-level parameters and billing
- D) It cannot create databases
- E) It is automatically granted to all new users

---

## Q25 (Single Answer)
What is the ORGADMIN role used for in Snowflake?
- A) Managing objects within a single database
- B) Managing organization-level operations such as creating accounts and viewing usage across accounts
- C) Managing warehouse configurations
- D) Managing data sharing within an account

---

## Q26 (Single Answer)
What is a dynamic data masking policy in Snowflake?
- A) A policy that encrypts entire databases
- B) A column-level security policy that masks sensitive data at query time based on the user's role
- C) A policy that prevents data from being loaded
- D) A policy that controls warehouse access

---

## Q27 (Scenario)
A compliance officer requires that Social Security Numbers (SSNs) stored in a table are fully visible to the HR team but masked (shown as XXX-XX-XXXX) to all other users. Which Snowflake feature should they use?
- A) Row access policy
- B) Dynamic data masking policy
- C) Network policy
- D) Object tagging

---

## Q28 (Single Answer)
What is a row access policy in Snowflake?
- A) A policy that controls which columns a user can see
- B) A policy that determines which rows in a table or view a user can access based on their role or other attributes
- C) A policy that controls network access to Snowflake
- D) A policy that manages warehouse permissions

---

## Q29 (Multi Answer - Select 2)
Which TWO are data governance features in Snowflake that control data visibility? (Select 2)
- A) Dynamic data masking (column-level security)
- B) Resource monitors
- C) Row access policies (row-level security)
- D) Virtual warehouse sizing
- E) Data clustering

---

## Q30 (Scenario)
A healthcare company stores patient records in a Snowflake table. Different departments should only see records for their own patients. Which Snowflake feature enforces this requirement?
- A) Dynamic data masking policy
- B) Row access policy
- C) Clustering key
- D) Secure view

---

## Q31 (Single Answer)
What is object tagging in Snowflake?
- A) A method of encrypting objects
- B) A feature that allows users to assign metadata tags to Snowflake objects for classification and governance purposes
- C) A way to label warehouses by size
- D) A method for naming schemas

---

## Q32 (Single Answer)
What is the purpose of tag-based masking in Snowflake?
- A) To encrypt tagged objects
- B) To automatically apply masking policies to columns based on their assigned tags
- C) To restrict tagged objects from being dropped
- D) To classify tagged objects in the Marketplace

---

## Q33 (Scenario)
A data governance team wants to automatically apply a masking policy to every column tagged as "PII" across all tables in the account. Which approach should they use?
- A) Manually apply masking policies to each column
- B) Use tag-based masking to associate a masking policy with the PII tag
- C) Create a secure view for each table
- D) Use row access policies

---

## Q34 (Single Answer)
What is a privacy policy in Snowflake?
- A) A legal document about data usage
- B) A type of policy object that controls how data can be queried or aggregated to prevent identifying individual records
- C) A network security configuration
- D) A type of encryption policy

---

## Q35 (Multi Answer - Select 2)
Which TWO Snowflake features work together to provide comprehensive column-level data protection? (Select 2)
- A) Dynamic data masking policies
- B) Resource monitors
- C) Object tagging with tag-based masking
- D) Warehouse scaling policies
- E) Time Travel

---

## Q36 (Single Answer)
What is Trust Center in Snowflake?
- A) A data marketplace for trusted datasets
- B) A centralized security dashboard that monitors and evaluates the security posture of a Snowflake account
- C) A feature for managing encryption keys
- D) A tool for creating secure views

---

## Q37 (Scenario)
A CISO wants to assess whether their Snowflake account follows security best practices, including checking for MFA adoption, network policies, and overly permissive roles. Which Snowflake feature provides this assessment?
- A) Resource Monitor
- B) Trust Center
- C) ACCOUNT_USAGE schema
- D) Data Marketplace

---

## Q38 (Single Answer)
What type of encryption does Snowflake use for data at rest by default?
- A) No encryption by default
- B) AES-256 encryption
- C) AES-128 encryption
- D) RSA encryption

---

## Q39 (Single Answer)
What is Tri-Secret Secure in Snowflake?
- A) A three-factor authentication mechanism
- B) A feature that combines Snowflake's encryption key with a customer-managed key to create a composite encryption key
- C) A feature that encrypts data three times
- D) A networking feature with three layers of security

---

## Q40 (Scenario)
A financial institution requires that they maintain control over their encryption keys alongside Snowflake's encryption. They want to be able to revoke access to their data by disabling their key. Which feature meets this requirement?
- A) Dynamic data masking
- B) Tri-Secret Secure
- C) Network policies
- D) Row access policies

---

## Q41 (Multi Answer - Select 2)
Which TWO statements about Snowflake encryption are correct? (Select 2)
- A) All data in Snowflake is encrypted at rest by default using AES-256
- B) Users must manually enable encryption for each table
- C) Data in transit between client and Snowflake is encrypted using TLS
- D) Encryption is only available with Business Critical Edition
- E) Snowflake uses RSA encryption for data at rest

---

## Q42 (Single Answer)
What is the purpose of Snowflake Alerts?
- A) To schedule SQL queries
- B) To monitor conditions in Snowflake and send notifications when specified conditions are met
- C) To manage warehouse auto-suspend
- D) To enforce data masking policies

---

## Q43 (Scenario)
A data ops team wants to be automatically notified when the number of failed login attempts exceeds 100 in an hour. Which Snowflake feature should they configure?
- A) Resource Monitor
- B) Alert
- C) Task
- D) Stream

---

## Q44 (Single Answer)
What is the purpose of Snowflake notifications?
- A) To send data to external systems
- B) To deliver messages to external services (like email, webhooks, or cloud queues) triggered by alerts or other events
- C) To display pop-up messages in Snowsight
- D) To log messages in the query history

---

## Q45 (Single Answer)
What is database replication in Snowflake?
- A) Creating a backup of a database on the same account
- B) Copying a database and keeping it synchronized across Snowflake accounts in the same or different regions
- C) Cloning a database within the same schema
- D) Sharing a database with external consumers

---

## Q46 (Scenario)
A company needs to maintain a disaster recovery copy of their primary Snowflake database in a different cloud region. Which feature should they use?
- A) Data sharing
- B) Database replication
- C) Table cloning
- D) Time Travel

---

## Q47 (Multi Answer - Select 2)
Which TWO are capabilities of Snowflake's replication and failover features? (Select 2)
- A) Replicating databases across accounts in different regions or cloud platforms
- B) Replicating individual rows within a table
- C) Failing over to a secondary account if the primary becomes unavailable
- D) Automatically merging data from multiple accounts
- E) Replicating warehouse configurations as new warehouses

---

## Q48 (Single Answer)
What is data lineage in Snowflake?
- A) The sequence of Time Travel snapshots
- B) The tracking of data as it flows through and is transformed across different objects, showing where data came from and where it goes
- C) The physical location where data is stored
- D) The order in which tables were created

---

## Q49 (Single Answer)
Which Snowflake feature provides visibility into how data moves and transforms between objects such as tables, views, and stages?
- A) Query Profile
- B) ACCESS_HISTORY view in ACCOUNT_USAGE
- C) Data lineage in Snowsight
- D) Resource Monitor

---

## Q50 (Scenario)
An auditor asks to see a record of which users accessed which tables and when. Which Snowflake feature provides this audit information?
- A) Query Profile
- B) ACCESS_HISTORY view in the ACCOUNT_USAGE schema
- C) Time Travel
- D) Data Marketplace

---

## Q51 (Single Answer)
What is a Resource Monitor in Snowflake?
- A) A tool for monitoring data quality
- B) An object that monitors credit usage by warehouses and can trigger notifications or suspend warehouses when thresholds are reached
- C) A tool for monitoring network traffic
- D) A dashboard for monitoring query performance

---

## Q52 (Multi Answer - Select 2)
Which TWO actions can a Resource Monitor take when a credit threshold is reached? (Select 2)
- A) Send a notification to account administrators
- B) Automatically resize the warehouse
- C) Suspend the warehouse immediately or at the end of the current statement
- D) Drop the warehouse
- E) Reduce the warehouse size automatically

---

## Q53 (Single Answer)
At which level can resource monitors be assigned in Snowflake?
- A) Database level only
- B) Schema level only
- C) Account level or individual warehouse level
- D) Table level only

---

## Q54 (Scenario)
A finance team wants to ensure that total monthly compute spending across all warehouses does not exceed $10,000. If it reaches 90%, they want a warning notification. At 100%, all warehouses should be suspended. How should they configure this?
- A) Create individual resource monitors for each warehouse
- B) Create an account-level resource monitor with notify at 90% and suspend at 100%
- C) Set auto-suspend on each warehouse to 0
- D) Use a task to check credit usage hourly

---

## Q55 (Single Answer)
How is virtual warehouse credit usage calculated in Snowflake?
- A) Based on the number of queries executed
- B) Based on the warehouse size multiplied by the time it runs (with per-second billing and a 60-second minimum)
- C) Based on the amount of data scanned
- D) Based on the number of users connected

---

## Q56 (Multi Answer - Select 2)
Which TWO factors affect the total credit consumption of a virtual warehouse? (Select 2)
- A) The warehouse size (number of nodes)
- B) The volume of data stored in the account
- C) The total running time of the warehouse
- D) The number of schemas in the database
- E) The Snowflake edition used

---

## Q57 (Single Answer)
What is the ACCOUNT_USAGE schema in Snowflake?
- A) A schema where users store their application data
- B) A schema in the SNOWFLAKE database that provides historical metadata and usage data for the account with up to 365 days of history
- C) A schema that contains real-time query execution details
- D) A schema for managing user authentication

---

## Q58 (Scenario)
A data engineer needs to analyze query patterns over the past 6 months to identify expensive queries. Which Snowflake feature provides this historical data?
- A) INFORMATION_SCHEMA views (real-time, limited history)
- B) ACCOUNT_USAGE.QUERY_HISTORY view (up to 365 days of history)
- C) Query Profile (current query only)
- D) Resource Monitor reports

---

## Q59 (Single Answer)
What is the key difference between ACCOUNT_USAGE and INFORMATION_SCHEMA views?
- A) ACCOUNT_USAGE is real-time; INFORMATION_SCHEMA has latency
- B) ACCOUNT_USAGE has latency (45 minutes to 3 hours) but retains up to 365 days of history; INFORMATION_SCHEMA is near real-time but retains data for shorter periods
- C) They provide identical data with no differences
- D) INFORMATION_SCHEMA is only available in Enterprise Edition

---

## Q60 (Multi Answer - Select 2)
Which TWO views in the ACCOUNT_USAGE schema are useful for cost management? (Select 2)
- A) WAREHOUSE_METERING_HISTORY
- B) TABLE_STORAGE_METRICS
- C) STAGES
- D) STORAGE_USAGE
- E) FILE_FORMATS

---

## Q61 (Single Answer)
What is the purpose of the LOGIN_HISTORY view in the ACCOUNT_USAGE schema?
- A) To track data loading operations
- B) To record all login attempts (successful and failed) to the Snowflake account
- C) To manage user passwords
- D) To track warehouse usage

---

## Q62 (Scenario)
An administrator needs to identify which warehouses are consuming the most credits over the past month to optimize costs. Which ACCOUNT_USAGE view should they query?
- A) QUERY_HISTORY
- B) WAREHOUSE_METERING_HISTORY
- C) LOGIN_HISTORY
- D) TABLE_STORAGE_METRICS

---

## Q63 (Single Answer)
What is the latency for data in the ACCOUNT_USAGE schema views?
- A) Real-time (no latency)
- B) Varies from 45 minutes up to 3 hours depending on the view
- C) 24 hours
- D) 7 days

---

## Q64 (Single Answer)
Which Snowflake role is required to access the ACCOUNT_USAGE schema by default?
- A) PUBLIC
- B) SYSADMIN
- C) ACCOUNTADMIN
- D) USERADMIN

---

## Q65 (Scenario)
A security analyst needs to investigate an unauthorized access attempt. They need to review login history, including failed attempts and the IP addresses used. Which approach should they take?
- A) Query ACCOUNT_USAGE.LOGIN_HISTORY to see all login attempts with timestamps and IP details
- B) Check the Resource Monitor for login data
- C) Review the Query Profile for login information
- D) Query INFORMATION_SCHEMA.SESSIONS

---

## Q66 (Single Answer)
What happens when a user is granted a role in Snowflake?
- A) The user's existing roles are revoked
- B) The user inherits all privileges assigned to that role and can activate it during their session
- C) The user automatically becomes the owner of all objects owned by that role
- D) The role is permanently set as the user's primary role

---

## Q67 (Multi Answer - Select 2)
Which TWO Snowflake features help with regulatory compliance for data access auditing? (Select 2)
- A) ACCESS_HISTORY view in ACCOUNT_USAGE
- B) Warehouse auto-suspend
- C) LOGIN_HISTORY view in ACCOUNT_USAGE
- D) Data clustering
- E) Materialized views

---

## Q68 (Single Answer)
What is the relationship between USERADMIN and SECURITYADMIN in Snowflake's role hierarchy?
- A) USERADMIN is superior to SECURITYADMIN
- B) SECURITYADMIN inherits the privileges of USERADMIN
- C) They have no hierarchical relationship
- D) USERADMIN inherits SECURITYADMIN privileges

---

## Q69 (Scenario)
A data governance lead wants to classify all columns containing email addresses across the account and apply appropriate masking. What is the recommended Snowflake approach?
- A) Manually review every column definition
- B) Use Snowflake's data classification feature to detect sensitive data, then apply object tags and tag-based masking
- C) Export all data and scan externally
- D) Use network policies to restrict access

---

## Q70 (Single Answer)
What is the purpose of logging and tracing in Snowflake?
- A) To track data loading errors only
- B) To capture and record events, messages, and trace data from stored procedures, UDFs, and other code running in Snowflake
- C) To monitor network latency
- D) To encrypt log files

---

## Q71 (Single Answer)
Where are log and trace events stored in Snowflake?
- A) In external cloud storage only
- B) In an event table configured in the account
- C) In the Cloud Services layer metadata
- D) In the INFORMATION_SCHEMA

---

## Q72 (Scenario)
A developer has a Python stored procedure that occasionally fails. They want to add logging to capture error details for debugging. Where will the log messages be stored?
- A) In the query history
- B) In an event table associated with the account
- C) In the user's local file system
- D) In the warehouse cache

---

## Q73 (Multi Answer - Select 2)
Which TWO can be configured for logging and tracing in Snowflake? (Select 2)
- A) Log level (e.g., INFO, WARN, ERROR)
- B) Warehouse size for logging
- C) Trace level (e.g., ON_EVENT, ALWAYS)
- D) Storage location for logs (must be in S3)
- E) Network policy for log access

---

## Q74 (Single Answer)
What command is used to grant a privilege on a Snowflake object to a role?
- A) ASSIGN PRIVILEGE
- B) GRANT
- C) SET PRIVILEGE
- D) ADD PERMISSION

---

## Q75 (Single Answer)
What does the OWNERSHIP privilege mean in Snowflake?
- A) The ability to query an object
- B) Full control over the object, including the ability to grant privileges to other roles and drop the object
- C) The ability to modify data in the object
- D) The ability to view the object definition only

---

## Q76 (Scenario)
An administrator creates a new role called DATA_ANALYST. They want this role to be able to query tables in the SALES schema but not modify any data. Which privilege should they grant?
- A) ALL PRIVILEGES on the schema
- B) SELECT on the tables in the schema
- C) OWNERSHIP on the schema
- D) INSERT and UPDATE on the tables

---

## Q77 (Multi Answer - Select 2)
Which TWO privileges are needed for a role to create tables in a schema? (Select 2)
- A) USAGE on the database containing the schema
- B) SELECT on existing tables
- C) CREATE TABLE on the schema
- D) OWNERSHIP on the database
- E) MONITOR on the warehouse

---

## Q78 (Single Answer)
What is the WITH GRANT OPTION clause used for in Snowflake?
- A) To grant a role to a user
- B) To allow the grantee to further grant the same privilege to other roles
- C) To grant ownership of an object
- D) To grant temporary access that expires

---

## Q79 (Single Answer)
What is the effect of granting the USAGE privilege on a database?
- A) It allows the role to create objects in the database
- B) It allows the role to see the database and access its schemas, but does not grant access to individual objects within those schemas
- C) It gives full read access to all tables
- D) It allows the role to drop the database

---

## Q80 (Scenario)
A developer tries to query a table but receives an "insufficient privileges" error. They have been granted SELECT on the table and USAGE on the schema. What additional privilege do they likely need?
- A) CREATE TABLE on the schema
- B) USAGE on the database
- C) OWNERSHIP on the table
- D) MONITOR on the warehouse

---

## Q81 (Single Answer)
What is the purpose of the MANAGE GRANTS privilege in Snowflake?
- A) To create new roles
- B) To allow a role to grant or revoke privileges on any object, even objects it does not own
- C) To manage warehouse credits
- D) To enable Time Travel

---

## Q82 (Single Answer)
What is future grants in Snowflake?
- A) Grants that are scheduled to take effect at a future date
- B) Privilege grants that automatically apply to objects created in the future within a specified scope
- C) Grants that expire after a set period
- D) Grants that apply only to temporary objects

---

## Q83 (Scenario)
A team lead wants to ensure that whenever a new table is created in the ANALYTICS schema, the ANALYST role automatically receives SELECT access. Which feature should they use?
- A) Managed access schema
- B) Future grants
- C) Object tagging
- D) Row access policy

---

## Q84 (Multi Answer - Select 2)
Which TWO statements about managed access schemas are correct? (Select 2)
- A) In a managed access schema, only the schema owner or a role with MANAGE GRANTS can grant privileges on objects
- B) Object owners can grant privileges on their own objects in managed access schemas
- C) Managed access schemas centralize privilege management
- D) Managed access schemas are only available in VPS
- E) Managed access schemas prevent all data access by default

---

## Q85 (Single Answer)
What is the primary security benefit of using secondary roles in Snowflake?
- A) They provide backup authentication
- B) They allow a user's session to combine privileges from multiple roles without switching roles
- C) They encrypt data with a secondary key
- D) They create duplicate role definitions

---

## Q86 (Single Answer)
How do you activate secondary roles in a Snowflake session?
- A) USE SECONDARY ROLE
- B) USE SECONDARY ROLES ALL
- C) SET SECONDARY_ROLE = 'role_name'
- D) GRANT SECONDARY ROLE TO USER

---

## Q87 (Scenario)
A user has a primary role of ANALYST and a secondary role of DATA_ENGINEER. With secondary roles active, which privileges does the user have?
- A) Only the privileges of the ANALYST role
- B) Only the privileges of the DATA_ENGINEER role
- C) The combined privileges of both ANALYST and DATA_ENGINEER roles
- D) Neither role's privileges until one is explicitly selected

---

## Q88 (Single Answer)
What is the minimum Snowflake edition required for data masking policies?
- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake

---

## Q89 (Multi Answer - Select 2)
Which TWO Trust Center capabilities help improve a Snowflake account's security posture? (Select 2)
- A) Security scanners that detect configuration risks and vulnerabilities
- B) Automatic warehouse resizing for security
- C) Recommendations for improving security settings (e.g., MFA adoption, network policies)
- D) Automatic data masking of all PII
- E) Encryption key rotation for all editions

---

## Q90 (Single Answer)
What is the purpose of an account identifier in the context of authentication?
- A) It serves as the password for the account
- B) It uniquely identifies the Snowflake account to connect to, used in connection URLs
- C) It defines the user's default role
- D) It specifies the warehouse to use

---

## Q91 (Scenario)
A security team discovers that a former employee's credentials may have been compromised. They need to immediately prevent access to the account from that user. What should they do?
- A) Disable the user's account using ALTER USER ... SET DISABLED = TRUE
- B) Change the warehouse auto-suspend setting
- C) Create a new network policy
- D) Revoke the PUBLIC role from the user

---

## Q92 (Single Answer)
What is the purpose of the SHOW GRANTS command in Snowflake?
- A) To create new grants
- B) To display the privileges that have been granted to a role, or on an object
- C) To revoke existing grants
- D) To list all users in the account

---

## Q93 (Single Answer)
What is the maximum Time Travel retention period for a permanent table in Enterprise Edition or higher?
- A) 1 day
- B) 7 days
- C) 30 days
- D) 90 days

---

## Q94 (Multi Answer - Select 2)
Which TWO statements about Snowflake's encryption key management are correct? (Select 2)
- A) Snowflake automatically manages encryption keys for all editions
- B) Tri-Secret Secure allows customers to control a component of the encryption key
- C) Customers must provide their own encryption keys for Standard Edition
- D) All editions support customer-managed encryption keys
- E) Key rotation occurs automatically for Snowflake-managed keys

---

## Q95 (Scenario)
A compliance team needs to understand which columns across the account contain personally identifiable information (PII). They want an automated solution rather than manual inspection. Which Snowflake feature should they use?
- A) Query Profile
- B) Snowflake data classification
- C) Resource Monitor
- D) Time Travel

---

## Q96 (Single Answer)
What SQL command grants a role to a user in Snowflake?
- A) ASSIGN ROLE role_name TO USER user_name
- B) GRANT ROLE role_name TO USER user_name
- C) SET ROLE role_name FOR USER user_name
- D) ADD ROLE role_name TO USER user_name

---

## Q97 (Single Answer)
What is the effect of the REVOKE command in Snowflake?
- A) It permanently deletes an object
- B) It removes a previously granted privilege from a role
- C) It suspends a warehouse
- D) It disables a user account

---

## Q98 (Scenario)
A company migrating to Snowflake wants to replicate their existing LDAP group-based access model. Which Snowflake feature maps most closely to LDAP groups for access management?
- A) Network policies
- B) Roles (with SCIM provisioning from the identity provider)
- C) Resource monitors
- D) Data masking policies

---

## Q99 (Single Answer)
What does the ACCOUNTADMIN role have that other system-defined roles do not?
- A) The ability to create databases
- B) The ability to manage billing, account parameters, and all top-level account operations
- C) The ability to create users
- D) The ability to create warehouses

---

## Q100 (Multi Answer - Select 2)
Which TWO are best practices for managing the ACCOUNTADMIN role? (Select 2)
- A) Use ACCOUNTADMIN as the default role for all users
- B) Limit ACCOUNTADMIN access to a small number of trusted administrators
- C) Enable MFA for all users with ACCOUNTADMIN access
- D) Grant ACCOUNTADMIN to the PUBLIC role for convenience
- E) Never use ACCOUNTADMIN — always use SYSADMIN instead
