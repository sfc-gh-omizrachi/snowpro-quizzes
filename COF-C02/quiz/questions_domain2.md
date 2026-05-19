## Q1 (Single Answer)
A company wants to restrict access to their Snowflake account so that only requests from their corporate network IP range (192.168.1.0/24) are allowed. Which approach should they use?

- A) Create a network rule with the IP range and add it to a network policy's allowed list, then activate the policy on the account
- B) Set the ALLOWED_IP_LIST parameter directly on each user object
- C) Configure a firewall rule in the cloud provider's console
- D) Use a row access policy to filter connections by IP address
---
## Q2 (Single Answer)
A network policy is applied at the account level, and a different network policy is applied to a specific user. The user attempts to connect from an IP address that is allowed by the account-level policy but blocked by the user-level policy. What happens?

- A) The account-level policy takes precedence and the connection is allowed
- B) The user-level policy takes precedence and the connection is blocked
- C) Both policies are evaluated and the most permissive result is used
- D) Snowflake returns an error because conflicting policies cannot coexist
---
## Q3 (Single Answer)
Which statement about Snowflake's Multi-Factor Authentication (MFA) is TRUE?

- A) MFA is required for all user types, including service users
- B) MFA is intended for human users who authenticate with a password; service users must use another form of authentication
- C) MFA can only be enforced using Duo as the second factor
- D) MFA enrollment is optional by default for all accounts regardless of when they were created
---
## Q4 (Multi Answer - Select TWO)
Which TWO MFA methods does Snowflake support as a second factor of authentication? (Select TWO)

- A) SMS text message codes
- B) Passkeys
- C) Hardware security tokens via FIDO U2F only
- D) Authenticator apps that generate time-based one-time passcodes (TOTP)
- E) Biometric fingerprint directly through Snowflake
---
## Q5 (Single Answer)
What is the role of the Identity Provider (IdP) in Snowflake's federated authentication environment?

- A) It hosts the Snowflake data warehouse and processes queries
- B) It is responsible for creating and maintaining user credentials and authenticating users for SSO access
- C) It manages the Snowflake billing and credit consumption
- D) It serves as the service provider that receives SAML assertions
---
## Q6 (Single Answer)
Which identity providers have NATIVE Snowflake support for federated authentication and SSO?

- A) Google G Suite and OneLogin
- B) Okta and Microsoft Entra ID
- C) Ping Identity and PingOne
- D) AWS IAM and Google Cloud IAM
---
## Q7 (Single Answer)
When configuring key pair authentication in Snowflake, what is the MINIMUM RSA key size required?

- A) 1024-bit
- B) 2048-bit
- C) 4096-bit
- D) 512-bit
---
## Q8 (Single Answer)
A company needs to rotate the public key used for key pair authentication for a service account without any downtime. How does Snowflake support this?

- A) By allowing up to 2 active public keys per user via the RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2 parameters
- B) By automatically rotating keys every 90 days
- C) By requiring the user to be disabled and re-enabled with the new key
- D) By using a key management service that Snowflake provides natively
---
## Q9 (Single Answer)
In a Snowflake federated authentication setup, what protocol does Snowflake use for SSO?

- A) OAuth 2.0 exclusively
- B) SAML 2.0
- C) OpenID Connect
- D) LDAP
---
## Q10 (Multi Answer - Select TWO)
An administrator needs to temporarily allow a user to log in without MFA because they lost their authentication device. Which TWO approaches can the administrator use? (Select TWO)

- A) Execute ALTER USER ... SET MINS_TO_BYPASS_MFA to temporarily disable MFA
- B) Execute ALTER USER ... ENROLL MFA to prompt the user to set up a new MFA method
- C) Drop and recreate the user account
- D) Change the account's edition to bypass MFA requirements
- E) Execute ALTER ACCOUNT SET MFA_ENABLED = FALSE
---
## Q11 (Single Answer)
What happens when you add an IPv4 network rule with a single IP address to the allowed list of a network policy, without specifying any blocked list?

- A) All IPv4 addresses are allowed since no blocked list exists
- B) Only the specified IP address is allowed; all other IPv4 addresses are blocked
- C) Snowflake returns an error requiring both allowed and blocked lists
- D) The network policy has no effect until a blocked list is also configured
---
## Q12 (Single Answer)
Which Snowflake feature allows an administrator to control which MFA methods users can use as their second factor of authentication?

- A) Network policies
- B) Authentication policies
- C) Session policies
- D) Password policies
---
## Q13 (Single Answer)
Snowflake's access control framework combines aspects of which models?

- A) DAC, RBAC, and UBAC
- B) MAC, RBAC, and ABAC
- C) DAC, MAC, and RBAC
- D) RBAC, ABAC, and PBAC
---
## Q14 (Single Answer)
In Snowflake's Discretionary Access Control (DAC) model, what does it mean to "own" an object?

- A) The user who created the object has permanent and irrevocable access
- B) A role has the OWNERSHIP privilege on the object, which by default is the role used to create the object
- C) The ACCOUNTADMIN role automatically owns all objects in the account
- D) The database in which the object resides determines its owner
---
## Q15 (Multi Answer - Select TWO)
Which TWO statements about the ACCOUNTADMIN role are TRUE? (Select TWO)

- A) ACCOUNTADMIN is a superuser role that can access all objects regardless of privileges
- B) ACCOUNTADMIN encapsulates the SYSADMIN and SECURITYADMIN system-defined roles
- C) ACCOUNTADMIN should be assigned to a limited number of users who also use MFA
- D) ACCOUNTADMIN can be dropped and recreated with different privileges
- E) ACCOUNTADMIN cannot view billing or credit data
---
## Q16 (Single Answer)
Which system-defined role has the global MANAGE GRANTS privilege, allowing it to grant or revoke privileges on objects in the account?

- A) ACCOUNTADMIN
- B) SYSADMIN
- C) SECURITYADMIN
- D) USERADMIN
---
## Q17 (Single Answer)
What is the primary purpose of the SYSADMIN system-defined role?

- A) To manage users and roles in the account
- B) To create warehouses, databases, and all database objects
- C) To manage account-level security policies
- D) To configure billing and resource monitors
---
## Q18 (Multi Answer - Select TWO)
Which TWO statements about the PUBLIC role in Snowflake are TRUE? (Select TWO)

- A) The PUBLIC role is automatically granted to every user and every role in the account
- B) The PUBLIC role cannot own any objects
- C) The PUBLIC role can be revoked from users
- D) The PUBLIC role can be dropped by the ACCOUNTADMIN
- E) Objects granted to the PUBLIC role are available to every user in the account
---
## Q19 (Single Answer)
A DBA creates a custom role called DATA_ANALYST but does not grant it to any other role in the hierarchy. What is the implication?

- A) The ACCOUNTADMIN role can automatically modify or drop objects created by DATA_ANALYST
- B) The SYSADMIN role inherits all privileges of DATA_ANALYST
- C) Objects created by DATA_ANALYST cannot be managed by ACCOUNTADMIN or SYSADMIN unless the role is granted to them
- D) Snowflake automatically grants all custom roles to SYSADMIN
---
## Q20 (Single Answer)
What is the correct syntax to grant the SELECT privilege on a table to a role?

- A) GRANT SELECT ON TABLE my_table TO ROLE analyst;
- B) GRANT READ ON TABLE my_table TO ROLE analyst;
- C) GRANT SELECT ON my_table TO USER analyst;
- D) GRANT PRIVILEGE SELECT ON TABLE my_table FOR ROLE analyst;
---
## Q21 (Single Answer)
In a managed access schema, who can grant privileges on objects within that schema?

- A) Any role with USAGE on the schema
- B) Only the role that created the object (the object owner)
- C) Only the schema owner or a role with the MANAGE GRANTS privilege
- D) Only the ACCOUNTADMIN role
---
## Q22 (Multi Answer - Select TWO)
Which TWO concepts describe how role hierarchy works in Snowflake? (Select TWO)

- A) Privileges of lower roles in the hierarchy are inherited by higher roles
- B) A role owner automatically inherits the privileges of the owned role
- C) Granting a role to another role creates a parent-child relationship where the parent inherits the child's privileges
- D) Custom roles are automatically placed under SYSADMIN in the hierarchy
- E) System-defined roles cannot participate in role hierarchies
---
## Q23 (Single Answer)
In the default system role hierarchy, which role is the direct parent of the USERADMIN role?

- A) ACCOUNTADMIN
- B) SYSADMIN
- C) SECURITYADMIN
- D) PUBLIC
---
## Q24 (Multi Answer - Select THREE)
To query a table named my_table in the schema my_schema within database my_db, which THREE minimum privileges are required? (Select THREE)

- A) USAGE on database my_db
- B) USAGE on schema my_schema
- C) SELECT on table my_table
- D) OWNERSHIP on table my_table
- E) CREATE TABLE on schema my_schema
- F) MONITOR on database my_db
---
## Q25 (Single Answer)
What is the primary purpose of a Snowflake organization?

- A) To create a security boundary between different departments within a single account
- B) To link accounts owned by a business entity, simplifying account management, billing, and replication
- C) To provide a shared compute pool across multiple Snowflake accounts
- D) To enforce a single authentication policy across all cloud providers
---
## Q26 (Multi Answer - Select TWO)
Which TWO are characteristics of secure views in Snowflake? (Select TWO)

- A) Secure views improve query performance through additional optimizations
- B) The view definition is visible only to authorized users (the role that owns the view)
- C) Internal optimizations that could indirectly expose underlying data are disabled
- D) Secure views automatically encrypt the data returned in query results
- E) Secure views can only be created by the ACCOUNTADMIN role
---
## Q27 (Single Answer)
What is a key trade-off when using secure views compared to non-secure views?

- A) Secure views cannot reference more than one table
- B) Secure views may execute more slowly than non-secure views because they do not use certain internal optimizations
- C) Secure views cannot be used with Snowflake's access control features
- D) Secure views do not support JOIN operations
---
## Q28 (Multi Answer - Select TWO)
Which TWO are key differences between INFORMATION_SCHEMA and ACCOUNT_USAGE views? (Select TWO)

- A) INFORMATION_SCHEMA has no data latency; ACCOUNT_USAGE has latency from 45 minutes to 3 hours
- B) INFORMATION_SCHEMA includes records for dropped objects; ACCOUNT_USAGE does not
- C) ACCOUNT_USAGE retains historical data for up to 1 year; INFORMATION_SCHEMA retains from 7 days to 6 months
- D) ACCOUNT_USAGE is available in every database; INFORMATION_SCHEMA exists only in the SNOWFLAKE database
- E) INFORMATION_SCHEMA requires Enterprise Edition; ACCOUNT_USAGE is available in all editions
---
## Q29 (Single Answer)
Where is the ACCOUNT_USAGE schema located in Snowflake?

- A) In every database, alongside the INFORMATION_SCHEMA
- B) In the SNOWFLAKE shared database
- C) In a user-created database specified during account setup
- D) In the SYSTEM database that is created by SYSADMIN
---
## Q30 (Multi Answer - Select TWO)
Which TWO statements about the ACCESS_HISTORY view in the ACCOUNT_USAGE schema are TRUE? (Select TWO)

- A) It tracks when user queries read data, including the source and target objects
- B) It is available in all Snowflake editions including Standard
- C) It tracks when SQL statements perform data write operations such as INSERT, UPDATE, and DELETE
- D) It has no data latency and is updated in real-time
- E) It retains data for 7 days only
---
## Q31 (Multi Answer - Select TWO)
Which TWO columns in the ACCESS_HISTORY view are used to track READ operations? (Select TWO)

- A) direct_objects_accessed
- B) objects_modified
- C) base_objects_accessed
- D) object_modified_by_ddl
- E) policies_referenced
---
## Q32 (Single Answer)
What is a masking policy in Snowflake?

- A) A database-level object that encrypts data at rest
- B) A schema-level object that selectively masks plain-text data in table and view columns at query time
- C) An account-level setting that hides all sensitive columns from non-admin users
- D) A network-level policy that masks IP addresses in audit logs
---
## Q33 (Single Answer)
How many masking policies can be applied to a single column at the same time?

- A) Unlimited, policies are evaluated in priority order
- B) Up to 3, with different conditions for each
- C) Exactly 1; a column cannot be attached to multiple masking policies
- D) Up to 2, one for reads and one for writes
---
## Q34 (Single Answer)
Which statement about row access policies is TRUE?

- A) Row access policies prevent rows from being inserted into a table
- B) Row access policies are evaluated using the role of the query operator
- C) Row access policies are schema-level objects that determine which rows are visible in query results
- D) Row access policies can only be applied to tables, not views
---
## Q35 (Single Answer)
What is an object tag in Snowflake?

- A) A database-level label that can only be applied to tables
- B) A schema-level object that can be assigned to another Snowflake object as a key-value pair where the value is always a string
- C) A system-generated identifier that cannot be modified by users
- D) A metadata attribute that is automatically applied based on data classification results only
---
## Q36 (Multi Answer - Select TWO)
Which TWO statements about object tag inheritance in Snowflake are TRUE? (Select TWO)

- A) Tags set on a table are automatically inherited by all columns in that table
- B) Tags set on a column are inherited by the table
- C) Tags set on a database are inherited by schemas and objects within the database
- D) Tag inheritance only works within the same schema
- E) Tag inheritance requires Business Critical Edition or higher
---
## Q37 (Single Answer)
Which system-defined role has the highest level of privileges in a Snowflake account?

- A) SYSADMIN
- B) SECURITYADMIN
- C) ACCOUNTADMIN
- D) USERADMIN
---
## Q38 (Multi Answer - Select 2)
Which TWO statements correctly describe the SECURITYADMIN role in Snowflake? (Select TWO)

- A) SECURITYADMIN can create warehouses and databases
- B) SECURITYADMIN is granted the MANAGE GRANTS security privilege
- C) USERADMIN is a child role of SECURITYADMIN in the default access control hierarchy
- D) SECURITYADMIN cannot create or manage users or roles
- E) SECURITYADMIN is a child role of SYSADMIN
---
## Q39 (Single Answer)
A company creates a custom role called FINANCE_ADMIN but does not grant it to any system-defined role. What is the BEST practice to follow?

- A) Grant FINANCE_ADMIN to ACCOUNTADMIN directly so it is managed by top-level administrators
- B) Grant FINANCE_ADMIN to SYSADMIN so system administrators can manage objects created by the role
- C) Leave FINANCE_ADMIN unattached; it will automatically appear in the role hierarchy after 24 hours
- D) Grant FINANCE_ADMIN to PUBLIC so all users can assume it when needed
---
## Q40 (Single Answer)
What privilege is required to execute a TRUNCATE TABLE command on a Snowflake table?

- A) DELETE
- B) OWNERSHIP
- C) TRUNCATE
- D) DROP
---
## Q41 (Multi Answer - Select 2)
Which TWO privileges are required at the schema level to manage object lifecycle in a schema? (Select TWO)

- A) CREATE TABLE
- B) SELECT
- C) USAGE
- D) INSERT
- E) REFERENCES
---
## Q42 (Single Answer)
A data engineer needs to query a table `sales.public.orders`. The engineer's role has USAGE on the database `sales` and SELECT on the table `orders`. What additional privilege is required?

- A) INSERT on the table `orders`
- B) USAGE on the schema `public`
- C) CREATE TABLE on the schema `public`
- D) OWNERSHIP on the database `sales`
---
## Q43 (Single Answer)
Which statement correctly describes future grants in Snowflake?

- A) Future grants allow granting privileges on objects that were created in the past
- B) Future grants automatically grant defined privileges on new objects of a specified type as they are created
- C) Future grants require ACCOUNTADMIN privileges to configure
- D) Future grants only apply to tables and views, not other object types
---
## Q44 (Single Answer)
What is the correct syntax to revoke the SELECT privilege on a table from a role?

- A) REMOVE SELECT ON TABLE my_table FROM ROLE analyst;
- B) REVOKE SELECT ON TABLE my_table FROM ROLE analyst;
- C) DROP PRIVILEGE SELECT ON TABLE my_table FROM ROLE analyst;
- D) DELETE SELECT ON TABLE my_table FROM ROLE analyst;
---
## Q45 (Multi Answer - Select 2)
Which TWO database-level privileges can be granted to allow a role to create new objects in a database? (Select TWO)

- A) CREATE SCHEMA
- B) SELECT
- C) MODIFY
- D) USAGE
- E) TRUNCATE
---
## Q46 (Single Answer)
What happens when a user's IP address exists in BOTH the allowed list AND the blocked list of a network policy?

- A) The allowed list takes precedence and the connection is permitted
- B) The blocked list takes precedence and the connection is denied
- C) Snowflake returns an error because conflicting policies are not supported
- D) The most recently updated list takes precedence
---
## Q47 (Single Answer)
An administrator needs to temporarily bypass a network policy for a specific user. Which approach should be used?

- A) Set the MINS_TO_BYPASS_NETWORK_POLICY parameter on the user object — only Snowflake Support can set this value
- B) Execute ALTER USER ... SET BYPASS_NETWORK_POLICY = TRUE
- C) Temporarily drop the network policy and recreate it after access is granted
- D) Remove the user from the account and recreate them without the network policy
---
## Q48 (Single Answer)
A network policy is applied at the account level, and a different (more restrictive) network policy is applied to a security integration for Snowflake OAuth. A user authenticates via OAuth from an IP allowed by the account policy but blocked by the integration policy. What is the result?

- A) The account-level policy takes precedence, so the connection is allowed
- B) The security integration policy takes precedence, so the connection is blocked
- C) Both policies are combined using OR logic, so the connection is allowed
- D) Snowflake disables both policies and prompts for re-authentication
---
## Q49 (Multi Answer - Select 3)
Which THREE object types can network policies be applied to in Snowflake? (Select THREE)

- A) Account
- B) User
- C) Table
- D) Security integration
- E) Schema
---
## Q50 (Single Answer)
What is the minimum role required to CREATE a network policy in Snowflake?

- A) SYSADMIN
- B) SECURITYADMIN or a role with the global CREATE NETWORK POLICY privilege
- C) USERADMIN
- D) ACCOUNTADMIN only
---
## Q51 (Single Answer)
Which Snowflake encryption algorithm is used to protect all customer data at rest by default?

- A) AES-128
- B) RSA-2048
- C) AES-256
- D) 3DES
---
## Q52 (Single Answer)
What is Tri-Secret Secure in Snowflake?

- A) A feature that requires three security administrators to approve data access requests
- B) A composite master key created by combining a Snowflake-managed key and a customer-managed key
- C) A three-factor authentication method for ACCOUNTADMIN users
- D) A three-layer network policy that restricts access by IP, user, and role
---
## Q53 (Single Answer)
Which Snowflake edition is required to enable Tri-Secret Secure?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition or higher
- D) Virtual Private Snowflake (VPS)
---
## Q54 (Single Answer)
How frequently does Snowflake automatically rotate encryption keys in the hierarchical key model?

- A) Every 7 days
- B) Every 30 days
- C) Every 90 days
- D) Every 365 days
---
## Q55 (Multi Answer - Select 2)
Which TWO are benefits of using customer-managed keys (CMK) with Snowflake's Tri-Secret Secure? (Select TWO)

- A) CMKs eliminate the need for encryption entirely, improving query performance
- B) Customers have complete control over their master key and therefore their data in Snowflake
- C) If a security breach occurs, customers can disable access to their key to halt all data operations
- D) CMKs replace all other authentication methods in Snowflake
- E) CMKs are automatically created and managed by Snowflake with no customer involvement
---
## Q56 (Single Answer)
In the Snowflake hierarchical key model, which is the CORRECT order of key hierarchy from highest to lowest level?

- A) File keys → Table master keys → Account master keys → Root key
- B) Root key → Account master keys → Table master keys → File keys
- C) Account master keys → Root key → File keys → Table master keys
- D) Table master keys → Account master keys → Root key → File keys
---
## Q57 (Single Answer)
When does periodic rekeying (re-encryption of customer data) occur in Snowflake Enterprise Edition?

- A) After every encryption key rotation (every 30 days)
- B) When a retired encryption key for a table is older than one year
- C) Immediately after a new user is granted access to the table
- D) Only when manually triggered by the ACCOUNTADMIN role
---
## Q58 (Single Answer)
A developer creates an application that connects to Snowflake using OAuth. They configure the driver with `authenticator = oauth`. What does Snowflake use to verify access?

- A) A username and password combination
- B) An OAuth access token
- C) An RSA private key stored on the server
- D) A SAML 2.0 assertion from an external IdP
---
## Q59 (Multi Answer - Select 2)
Which TWO types of OAuth are supported natively by Snowflake? (Select TWO)

- A) Snowflake OAuth
- B) SAML OAuth
- C) External OAuth
- D) Kerberos OAuth
- E) LDAP OAuth
---
## Q60 (Single Answer)
What is the primary purpose of External OAuth in Snowflake?

- A) To replace SAML-based SSO for browser-based authentication
- B) To allow programmatic clients to authenticate using tokens issued by an external OAuth authorization server
- C) To provide multi-factor authentication for human users
- D) To encrypt data at rest using customer-managed keys
---
## Q61 (Single Answer)
Which system-defined role should be used to create users and roles in Snowflake as a recommended practice?

- A) ACCOUNTADMIN
- B) SYSADMIN
- C) USERADMIN
- D) PUBLIC
---
## Q62 (Single Answer)
When configuring key pair authentication, where is the public key stored?

- A) On the local filesystem of the client machine
- B) Assigned to the Snowflake user object via ALTER USER SET RSA_PUBLIC_KEY
- C) In the Snowflake vault, encrypted using AES-256
- D) Uploaded to an internal Snowflake stage
---
## Q63 (Single Answer)
A Snowflake user needs to authenticate using key pair authentication. The user's current RSA key needs to be rotated with zero downtime. What is the CORRECT approach?

- A) Drop and recreate the user with the new RSA key
- B) Use ALTER USER to set the new key in RSA_PUBLIC_KEY_2, then update the client to use the new private key, and finally remove the old key
- C) Assign the new public key by overwriting RSA_PUBLIC_KEY; downtime is unavoidable
- D) Ask the ACCOUNTADMIN to re-issue a new key via the Snowflake Key Management API
---
## Q64 (Multi Answer - Select 2)
Which TWO authentication methods are best suited for programmatic/service accounts connecting to Snowflake? (Select TWO)

- A) Key-pair authentication
- B) Multi-Factor Authentication (MFA) using Duo
- C) External OAuth with a client credentials flow
- D) SAML 2.0 browser-based SSO
- E) Username/password with MINS_TO_BYPASS_MFA set
---
## Q65 (Single Answer)
What does the REFERENCES privilege on a Snowflake table allow?

- A) Executing a SELECT statement on the table
- B) Viewing the structure of the table and using it as a primary/unique key table for foreign key constraints
- C) Inserting rows into the table
- D) Deleting rows from the table
---
## Q66 (Single Answer)
A table in Snowflake has both a row access policy and a masking policy applied. What is the order of evaluation when a user queries the table?

- A) Masking policy is evaluated first, then the row access policy
- B) Row access policy is evaluated first, then the masking policy
- C) Both policies are evaluated simultaneously in parallel
- D) The order depends on which policy was applied first
---
## Q67 (Single Answer)
Which Snowflake edition is required to use Dynamic Data Masking and row access policies?

- A) Standard Edition
- B) Business Critical Edition
- C) Enterprise Edition or higher
- D) Virtual Private Snowflake (VPS) only
---
## Q68 (Multi Answer - Select 2)
Which TWO statements about masking policies in Snowflake are TRUE? (Select TWO)

- A) A masking policy is a database-level object
- B) At query runtime, Snowflake query operators may see plain-text, partially masked, or fully masked values depending on the policy and their role
- C) Masking policies are applied to table and view columns to selectively mask plain-text data at query time
- D) A column can have up to 3 masking policies applied simultaneously
- E) Masking policies modify the underlying stored data permanently
---
## Q69 (Single Answer)
A security team wants to ensure that users with the ANALYST role see email addresses as `***@***.com` while ADMIN role users see the full email. What Snowflake feature should they use?

- A) A secure view that filters rows based on role
- B) A Dynamic Data Masking policy applied to the email column
- C) A row access policy that restricts rows for ANALYST users
- D) An object tag that marks the column as sensitive
---
## Q70 (Single Answer)
Which function would you typically use in a row access policy to check if the querying user's active role includes a specific role in the session hierarchy?

- A) CURRENT_USER()
- B) CURRENT_ROLE()
- C) IS_ROLE_IN_SESSION()
- D) HAS_ROLE()
---
## Q71 (Multi Answer - Select 2)
Which TWO statements about row access policies are TRUE? (Select TWO)

- A) Row access policies require Enterprise Edition or higher
- B) Row access policies prevent rows from being inserted into a protected table
- C) A single row access policy can be set on multiple tables and views at the same time
- D) Row access policies are table-level objects
- E) Row access policies only apply to SELECT statements, not DML operations
---
## Q72 (Single Answer)
What type of Snowflake object is a network rule?

- A) Account-level object
- B) Database-level object
- C) Schema-level object
- D) User-level object
---
## Q73 (Single Answer)
Which role must be used to ACTIVATE (attach) a network policy at the account level?

- A) SYSADMIN
- B) SECURITYADMIN or higher, or a role with the global ATTACH POLICY privilege
- C) USERADMIN
- D) Any role with OWNERSHIP on the network policy
---
## Q74 (Single Answer)
A Snowflake administrator wants to create a SAML2 security integration for SSO with an identity provider. Which SQL command is used?

- A) CREATE OAUTH INTEGRATION type = SAML2 ...
- B) CREATE SECURITY INTEGRATION type = SAML2 ...
- C) CREATE NETWORK POLICY type = SAML2 ...
- D) CREATE AUTHENTICATION POLICY type = SAML2 ...
---
## Q75 (Multi Answer - Select 2)
Which TWO are TRUE about Snowflake federated authentication with SAML 2.0? (Select TWO)

- A) Snowflake supports both Snowflake-initiated and IdP-initiated SSO login workflows
- B) Federated authentication eliminates the need for user objects to exist in Snowflake
- C) SAML2 security integrations can be replicated across accounts
- D) SAML 2.0 is used exclusively for programmatic/service account authentication
- E) Snowflake only supports Okta as an IdP for SAML-based federated authentication
---
## Q76 (Single Answer)
What is the purpose of the WITH GRANT OPTION in a GRANT statement?

- A) It allows the grantee to immediately use the privilege without any restrictions
- B) It allows the grantee to further grant the same privilege to other roles
- C) It permanently elevates the grantee's role to SECURITYADMIN
- D) It sets an expiration date on the granted privilege
---
## Q77 (Single Answer)
Which Account Usage view would you query to find all privileges granted to roles in a Snowflake account?

- A) SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS
- B) SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES
- C) SNOWFLAKE.ACCOUNT_USAGE.ROLES
- D) SNOWFLAKE.ACCOUNT_USAGE.PRIVILEGE_HISTORY
---
## Q78 (Multi Answer - Select 2)
Which TWO practices are recommended by Snowflake for the ACCOUNTADMIN role? (Select TWO)

- A) Use ACCOUNTADMIN as the default role for daily administrative work
- B) Do not make ACCOUNTADMIN the default role for any users; force them to explicitly change to it
- C) Assign the ACCOUNTADMIN role to at least two users to allow password resets in emergencies
- D) Use ACCOUNTADMIN for all automated scripts to ensure full access
- E) Never assign MFA to ACCOUNTADMIN users since they need rapid access
---
## Q79 (Single Answer)
What is a database role in Snowflake, and how does it differ from an account role?

- A) Database roles are identical to account roles but can only be created by ACCOUNTADMIN
- B) Database roles scope their privilege grants to objects within a single database and cannot be activated directly in a session
- C) Database roles can be activated directly in a session by any user assigned to them
- D) Database roles can hold the OWNERSHIP privilege on the database itself
---
## Q80 (Single Answer)
An analyst queries a table protected by a row access policy. The policy expression uses CURRENT_ROLE() to determine row visibility. Whose role is used to evaluate the policy expression?

- A) The role of the user executing the query
- B) The role of the policy owner (not the query operator)
- C) The ACCOUNTADMIN role by default
- D) The PUBLIC role
---
## Q81 (Single Answer)
What does the MANAGE GRANTS global privilege allow a role to do?

- A) Create and drop user accounts
- B) Grant or revoke privileges on any object as if the invoking role were the owner of the object
- C) Access billing information and credit data for the account
- D) Create warehouses and databases
---
## Q82 (Multi Answer - Select 2)
Which TWO statements about object ownership in Snowflake are TRUE? (Select TWO)

- A) Ownership of an object can be transferred from one role to another using GRANT OWNERSHIP
- B) An object can be owned by multiple roles simultaneously
- C) Each securable object is owned by a single role, which by default is the role used to create the object
- D) Only the ACCOUNTADMIN role can own objects in a Snowflake account
- E) Object ownership is determined by the user who creates the object, not the role
---
## Q83 (Single Answer)
What is the purpose of a managed access schema (WITH MANAGED ACCESS) in Snowflake?

- A) It encrypts all data within the schema using customer-managed keys
- B) It centralizes privilege management so only the schema owner or a role with MANAGE GRANTS can grant privileges on objects within it
- C) It restricts the schema to read-only access for all non-owner roles
- D) It automatically applies masking policies to all columns in the schema
---
## Q84 (Single Answer)
A Snowflake SECURITYADMIN wants to grant the SELECT privilege on a table to a custom role, but the SECURITYADMIN role itself does not own the table. Can the SECURITYADMIN do this?

- A) No, only the owner of the table can grant privileges on it
- B) Yes, because SECURITYADMIN has the MANAGE GRANTS privilege, which allows granting privileges on any object
- C) No, only ACCOUNTADMIN can grant privileges across ownership boundaries
- D) Yes, but only if the SECURITYADMIN first takes ownership of the table
---
## Q85 (Single Answer)
Which of the following correctly describes the behavior of tag inheritance in Snowflake?

- A) Tags set on a column are inherited by the parent table
- B) Tags set on a schema are inherited by the containing database
- C) Tags set on a database are inherited by its schemas and all objects within the database
- D) Tag inheritance only works within the same database, not across databases
---
## Q86 (Multi Answer - Select 2)
Which TWO features require Enterprise Edition or higher in Snowflake? (Select TWO)

- A) Network policies
- B) Dynamic Data Masking (column masking policies)
- C) Key pair authentication
- D) Row access policies
- E) Secure views
---
## Q87 (Single Answer)
What is the primary security benefit of using secure views in Snowflake for data sharing?

- A) Secure views encrypt the data returned so consumers cannot see it
- B) Secure views prevent the view definition and internal query plan details from being exposed to unauthorized users
- C) Secure views automatically apply masking policies to all columns
- D) Secure views restrict access to only the ACCOUNTADMIN role of the consumer account
---
## Q88 (Multi Answer - Select 3)
A new analyst role needs access to a table in Snowflake. Which THREE minimum privilege grants are required so the analyst can query the table? (Select THREE)

- A) GRANT USAGE ON DATABASE mydb TO ROLE analyst;
- B) GRANT USAGE ON SCHEMA mydb.myschema TO ROLE analyst;
- C) GRANT SELECT ON TABLE mydb.myschema.mytable TO ROLE analyst;
- D) GRANT CREATE TABLE ON SCHEMA mydb.myschema TO ROLE analyst;
- E) GRANT OWNERSHIP ON TABLE mydb.myschema.mytable TO ROLE analyst;
---
## Q89 (Single Answer)
What does it mean when a Snowflake user is said to have a "default role"?

- A) The user can only use that single role throughout their entire session
- B) When a session is established without explicitly specifying a role, the default role becomes the active primary role
- C) The default role is automatically the SYSADMIN role for all users
- D) The default role is always PUBLIC if no other role is specified
---
## Q90 (Multi Answer - Select 2)
Which TWO statements are TRUE about cloning and access control in Snowflake? (Select TWO)

- A) A cloned table retains all privileges that were granted on the source table
- B) A cloned object is considered a new object; privileges granted on the source object do not transfer to the cloned object
- C) A cloned database retains any privileges granted on the objects contained in the source database (schemas, tables, etc.)
- D) Cloning a schema creates a new schema where all grants must be reapplied from scratch
- E) Only ACCOUNTADMIN can clone objects with active access control policies
