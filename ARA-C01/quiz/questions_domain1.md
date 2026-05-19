# Domain 1: Accounts and Security

---

## Q1 (Scenario)
A solutions architect at a global financial institution is designing a Snowflake deployment. The company has strict regulatory requirements mandating that production data must be completely isolated from development and test environments, with no possibility of accidental cross-environment queries. Which approach BEST meets this requirement?
- A) Use separate databases within a single Snowflake account with RBAC controls
- B) Use separate schemas within a single database with row access policies
- C) Use separate Snowflake accounts for each environment within the same organization
- D) Use a single account with resource monitors to track environment usage

---

## Q2 (Single Answer)
When a parameter is set at the account level AND at the session level, which value takes effect for the current session?
- A) The account-level parameter always takes precedence
- B) The session-level parameter takes precedence
- C) The most restrictive value between account and session is used
- D) An error is raised due to the conflict

---

## Q3 (Scenario)
An enterprise architect is designing RBAC for a data platform serving 500 analysts across 12 business units. Each unit needs access to shared reference data plus its own departmental data. The architect wants to minimize role sprawl while maintaining the principle of least privilege. Which role design pattern is MOST appropriate?
- A) Create one role per analyst with explicit grants to each required object
- B) Create functional roles (e.g., ANALYST, ENGINEER) and grant them to all users directly
- C) Create access roles that map to object privileges, then grant access roles to functional roles, and assign functional roles to users
- D) Use the SYSADMIN role for all analysts and restrict access via row access policies

---

## Q4 (Multi Answer - Select 2)
Which TWO features require Business Critical Edition or higher and are NOT available in Enterprise Edition? (Select TWO)
- A) Dynamic data masking policies
- B) Tri-Secret Secure (customer-managed encryption keys)
- C) Multi-cluster virtual warehouses
- D) Support for AWS PrivateLink connectivity
- E) 90-day Time Travel retention

---

## Q5 (Scenario)
A healthcare company needs to store PHI (Protected Health Information) in Snowflake and must comply with HIPAA regulations. Their security team requires customer-managed encryption keys and private network connectivity. Which Snowflake edition should the architect recommend?
- A) Enterprise Edition with enhanced security add-ons
- B) Standard Edition with HIPAA BAA
- C) Business Critical Edition
- D) Virtual Private Snowflake (VPS)

---

## Q6 (Single Answer)
In Snowflake's parameter hierarchy, which is the correct order of precedence from lowest to highest?
- A) Object → Session → Account
- B) Account → Object → Session
- C) Session → Object → Account
- D) Account → Session → Object

---

## Q7 (Scenario)
A data architect is implementing a multi-tenant SaaS platform on Snowflake. Each tenant's data must be logically isolated, but the architect also needs to run cross-tenant analytics for internal reporting. The architect plans to use a single Snowflake account. Which combination provides the BEST tenant isolation while enabling cross-tenant analytics?
- A) Separate databases per tenant with secure data sharing for cross-tenant views
- B) Separate schemas per tenant with row access policies
- C) A single database with a TENANT_ID column and dynamic data masking
- D) Separate warehouses per tenant with a shared database

---

## Q8 (Single Answer)
Which system-defined role is specifically designed to manage account-level objects such as warehouses, databases, and integrations — but should NOT be used to manage users and roles?
- A) ACCOUNTADMIN
- B) SYSADMIN
- C) SECURITYADMIN
- D) USERADMIN

---

## Q9 (Multi Answer - Select 2)
An architect is evaluating the benefits of using multiple Snowflake accounts within a single organization rather than a single account. Which TWO are valid benefits of a multi-account strategy? (Select TWO)
- A) Complete compute and storage cost isolation per business unit
- B) Ability to use different Snowflake editions per account
- C) Elimination of the need for RBAC within each account
- D) Automatic data replication between accounts without configuration
- E) Shared metadata catalog across all accounts by default

---

## Q10 (Scenario)
A security architect needs to ensure that all Snowflake users in the organization authenticate through the corporate identity provider (IdP) using SAML 2.0 SSO. Some service accounts used by ETL tools need to authenticate using key-pair authentication instead. How should this be configured?
- A) Enable federated authentication at the account level and disable it for service accounts using authentication policies
- B) Create a security integration for SAML SSO and assign an authentication policy that requires SSO for human users while allowing key-pair for service accounts
- C) Configure SSO for all accounts and create separate accounts for service accounts
- D) Use OAuth for all users and service accounts instead of SAML SSO

---

## Q11 (Single Answer)
What is the primary purpose of database roles in Snowflake?
- A) To replace account-level roles entirely for all access control
- B) To enable granting privileges on objects within a database, and to be shared via data sharing
- C) To provide cross-database access control from a single role
- D) To automatically inherit privileges from system-defined roles

---

## Q12 (Scenario)
An architect is designing a secure data sharing solution where the provider account shares sensitive customer data. The provider needs to ensure that consumers can query the data but cannot see individual customer records — only aggregated results with a minimum group size of 5. Which security feature should the architect implement?
- A) Dynamic data masking on the shared view
- B) Row access policies on the shared tables
- C) Aggregate policies on the shared objects
- D) Projection policies on sensitive columns

---

## Q13 (Single Answer)
Which parameter hierarchy level allows you to set STATEMENT_TIMEOUT_IN_SECONDS for a specific virtual warehouse?
- A) Account level only
- B) Session level only
- C) Object level (on the warehouse)
- D) User level only

---

## Q14 (Multi Answer - Select 2)
Which TWO authentication methods support programmatic access to Snowflake without requiring interactive login? (Select TWO)
- A) SAML-based SSO via a browser redirect
- B) Key-pair authentication with an RSA private key
- C) MFA with TOTP (time-based one-time password)
- D) OAuth with a refresh token flow
- E) Password-based authentication with browser-based MFA

---

## Q15 (Scenario)
A multinational corporation has Snowflake accounts in AWS US East, AWS EU Frankfurt, and Azure West Europe. They need to share a curated dataset from the US East account with both the EU Frankfurt and Azure West Europe accounts. What is the BEST architectural approach?
- A) Use standard data sharing directly between all three accounts
- B) Use database replication to replicate the dataset to each target region, then use data sharing locally
- C) Export data to cloud storage and import into each target account
- D) Use Cross-Cloud Auto-Fulfillment to enable sharing across regions and cloud providers

---

## Q16 (Single Answer)
What is the effect of granting a privilege WITH GRANT OPTION to a role?
- A) The role can revoke the privilege from other roles
- B) The role can grant the same privilege to other roles
- C) The privilege automatically propagates to all child roles
- D) The privilege bypasses future grants on the schema

---

## Q17 (Scenario)
A data governance team needs to classify all tables in a Snowflake account to identify columns containing PII such as email addresses, phone numbers, and social security numbers. After classification, appropriate masking policies should be automatically applied. Which approach is MOST efficient?
- A) Manually review each table and apply masking policies column by column
- B) Use Snowflake's data classification feature to classify columns, apply tags, and use tag-based masking policies
- C) Create row access policies for each table containing PII
- D) Use external tokenization to mask all string columns

---

## Q18 (Single Answer)
Which Snowflake feature allows you to restrict which external network locations (URLs, hostnames) a UDF or stored procedure can access?
- A) Network policies
- B) Network rules with external access integrations
- C) Storage integrations
- D) Security integrations

---

## Q19 (Multi Answer - Select 2)
Which TWO statements about secondary roles in Snowflake are correct? (Select TWO)
- A) Secondary roles allow a session to use privileges from multiple roles simultaneously
- B) Secondary roles can be activated using USE SECONDARY ROLES ALL
- C) Secondary roles replace the primary role for ownership purposes
- D) Only ACCOUNTADMIN can enable secondary roles for a session
- E) Secondary roles are only available in Virtual Private Snowflake

---

## Q20 (Scenario)
An architect is configuring network security for a Snowflake Business Critical account. The requirements are: (1) all access must come through the corporate VPN, (2) the ETL server at IP 10.0.1.50 must have unrestricted access, and (3) no public internet access is allowed. Which configuration BEST meets these requirements?
- A) Create a network policy with an allowed list containing only the VPN CIDR range and the ETL server IP
- B) Enable AWS PrivateLink and create a network policy blocking all public IPs
- C) Configure AWS PrivateLink for private connectivity and create a network policy allowing only the VPN CIDR block and the ETL server IP, with private link endpoints
- D) Use a firewall at the cloud provider level and skip Snowflake network policies

---

## Q21 (Single Answer)
In Snowflake's role hierarchy, which system role is the parent of USERADMIN and SECURITYADMIN by default?
- A) SYSADMIN
- B) ACCOUNTADMIN
- C) PUBLIC
- D) ORGADMIN

---

## Q22 (Scenario)
A data platform architect discovers that developers have been creating custom roles that are not part of the standard role hierarchy — these roles are not granted to SYSADMIN or ACCOUNTADMIN. What is the primary risk of this configuration?
- A) The custom roles will lose their privileges during account failover
- B) ACCOUNTADMIN will not be able to manage objects owned by these orphaned roles
- C) The roles will be automatically deleted after 90 days
- D) Users assigned these roles cannot create warehouses

---

## Q23 (Single Answer)
Which encryption standard does Snowflake use by default for data at rest?
- A) AES-128
- B) AES-256
- C) RSA-2048
- D) TLS 1.2

---

## Q24 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's Tri-Secret Secure encryption? (Select TWO)
- A) It uses a composite master key derived from a Snowflake-maintained key and a customer-maintained key
- B) It requires the customer to manage keys in an on-premises HSM
- C) If the customer revokes their key, Snowflake cannot decrypt the data
- D) It is available in all Snowflake editions
- E) It replaces Snowflake's internal encryption with customer-only encryption

---

## Q25 (Scenario)
An architect is designing a solution where a third-party analytics application needs to access Snowflake on behalf of users without storing their credentials. The application is a web-based tool that supports OAuth. Which authentication approach should the architect configure?
- A) Create a security integration for External OAuth using the third-party IdP
- B) Store each user's username and password in the application's configuration
- C) Create shared key-pair credentials that all users of the application use
- D) Configure SAML SSO between Snowflake and the analytics application

---

## Q26 (Single Answer)
What is the relationship between a network policy and a network rule in Snowflake?
- A) Network rules replace network policies entirely
- B) Network rules define allowed/blocked network identifiers, and network policies reference those rules
- C) Network policies are applied to users, while network rules are applied to accounts
- D) Network rules are only used with external access integrations, never with network policies

---

## Q27 (Scenario)
A financial services company must ensure that no single administrator can access production data AND manage access controls. They want to enforce separation of duties. Which RBAC design approach BEST achieves this?
- A) Give all administrators the ACCOUNTADMIN role with MFA required
- B) Create separate functional roles: one for data access (e.g., DATA_ADMIN) and one for access control management (e.g., SECURITY_ADMIN), ensuring no user has both
- C) Use row access policies to hide sensitive data from administrators
- D) Restrict all administrators to the PUBLIC role and grant specific privileges as needed

---

## Q28 (Single Answer)
Which statement about secure views in Snowflake is correct?
- A) Secure views perform identically to regular views in all cases
- B) Secure views hide the view definition and prevent internal optimizations that could expose underlying data
- C) Secure views automatically encrypt the data returned to the user
- D) Secure views can only be created on tables in the same schema

---

## Q29 (Multi Answer - Select 2)
An architect needs to protect PII columns in a shared dataset. Which TWO Snowflake features can provide column-level data protection? (Select TWO)
- A) Dynamic data masking policies
- B) Row access policies
- C) External tokenization
- D) Aggregate policies
- E) Resource monitors

---

## Q30 (Scenario)
A company has 10 Snowflake accounts across their organization. They need centralized user management where users are created once and can access multiple accounts without separate credentials. Which feature supports this requirement?
- A) Data sharing with IMPORTED PRIVILEGES
- B) Organization-level SCIM provisioning with a centralized identity provider
- C) Database replication across accounts
- D) Creating identical users manually in each account

---

## Q31 (Single Answer)
When a row access policy is applied to a table, what happens when a user queries that table?
- A) Rows that violate the policy are replaced with NULL values
- B) The policy function is evaluated for each row, and only rows where the function returns TRUE are visible
- C) An error is raised if the user does not have a specific row access privilege
- D) The query is redirected to a filtered view automatically

---

## Q32 (Scenario)
An architect is implementing dynamic data masking for a healthcare data platform. Different roles need different levels of access to patient SSN: analysts see fully masked values (***-**-****), supervisors see the last 4 digits, and data stewards see the full SSN. How should this be implemented?
- A) Create three separate views, each with different WHERE clauses
- B) Create a single masking policy with conditional logic based on the current role using IS_ROLE_IN_SESSION
- C) Create three separate tables with different data for each group
- D) Use external tokenization with three different token vaults

---

## Q33 (Single Answer)
Which statement about projection policies in Snowflake is correct?
- A) Projection policies control which rows a user can see
- B) Projection policies prevent specific columns from appearing in query output (SELECT) while still allowing them in WHERE/JOIN clauses
- C) Projection policies encrypt column values before returning them
- D) Projection policies are an alternative to RBAC for column access

---

## Q34 (Multi Answer - Select 2)
Which TWO account-level parameters can an architect configure to enforce security policies across all users? (Select TWO)
- A) NETWORK_POLICY to restrict access to allowed IP ranges
- B) MIN_DATA_RETENTION_TIME_IN_DAYS to set minimum Time Travel
- C) REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION to prevent direct cloud credential use in stages
- D) WAREHOUSE_SIZE to set default warehouse size
- E) DEFAULT_ROLE to set the default role for all users

---

## Q35 (Scenario)
A solutions architect discovers that a former employee's credentials were potentially compromised. The architect needs to immediately prevent all access from this user while preserving their owned objects for review. What is the BEST immediate action?
- A) Drop the user account immediately
- B) Disable the user account using ALTER USER SET DISABLED = TRUE
- C) Change the user's password and revoke all roles
- D) Set the user's default warehouse to NULL

---

## Q36 (Single Answer)
What is the purpose of object tagging in Snowflake's data governance framework?
- A) To categorize objects with metadata tags that can drive governance policies like masking
- B) To create aliases for database objects
- C) To set access permissions directly on objects
- D) To track query performance metrics per object

---

## Q37 (Scenario)
An architect is deploying Snowflake for a government agency that requires FedRAMP Moderate compliance. The agency needs to ensure all data is encrypted with government-approved algorithms and private connectivity. Which deployment approach meets these requirements?
- A) Standard Snowflake account on AWS GovCloud
- B) Business Critical Edition on a commercial cloud region with PrivateLink
- C) Business Critical Edition on AWS GovCloud (or equivalent government region) with PrivateLink
- D) Enterprise Edition with customer-managed encryption keys

---

## Q38 (Single Answer)
When using federated authentication with SAML 2.0, which entity issues the SAML assertion that Snowflake validates?
- A) Snowflake (acting as the Identity Provider)
- B) The customer's Identity Provider (IdP)
- C) The cloud provider (AWS, Azure, or GCP)
- D) The SCIM integration endpoint

---

## Q39 (Multi Answer - Select 2)
Which TWO statements about MFA in Snowflake are correct? (Select TWO)
- A) MFA can be enforced for specific users through authentication policies
- B) MFA uses the Duo Security service for push-based verification
- C) MFA eliminates the need for password-based authentication entirely
- D) MFA is automatically enabled for all users in Business Critical Edition
- E) MFA can only be configured at the account level, not per user

---

## Q40 (Scenario)
A retail company is migrating to Snowflake and needs to implement a data governance framework. They want to: (1) classify sensitive data automatically, (2) apply masking policies based on data classification, and (3) track data lineage. Which sequence of Snowflake features should the architect implement?
- A) Data classification → Object tagging → Tag-based masking policies → Access history for lineage
- B) Row access policies → Dynamic masking → Manual tagging → Streams
- C) External tokenization → Secure views → Resource monitors → Tasks
- D) Network policies → Encryption → Projection policies → Alerts

---

## Q41 (Single Answer)
Which system-defined role has the privilege to create and manage organizations and accounts within a Snowflake organization?
- A) ACCOUNTADMIN
- B) SYSADMIN
- C) ORGADMIN
- D) SECURITYADMIN

---

## Q42 (Scenario)
An architect at an insurance company needs to share claims data with an external auditing firm that does not have a Snowflake account. The data must remain within Snowflake's security perimeter. What is the BEST approach?
- A) Export the data to CSV files and transfer via SFTP
- B) Create a reader account for the auditing firm and share the data
- C) Replicate the database to a new account owned by the auditing firm
- D) Provide the auditing firm with direct access to the production account

---

## Q43 (Single Answer)
In Snowflake, what is the default behavior when a user is granted multiple roles that have conflicting privileges on the same object?
- A) The most restrictive privilege wins
- B) The least restrictive privilege wins — privileges are additive (union of all active role privileges)
- C) An error is raised due to the conflict
- D) The privilege from the role with the highest hierarchy position applies

---

## Q44 (Multi Answer - Select 2)
Which TWO features are required to implement tag-based masking policies in Snowflake? (Select TWO)
- A) Tags assigned to columns containing sensitive data
- B) Masking policies associated with specific tag values
- C) External tokenization service integration
- D) Row access policies on the same tables
- E) Virtual Private Snowflake edition

---

## Q45 (Scenario)
A pharmaceutical company has Snowflake accounts on AWS, Azure, and GCP to comply with data residency regulations. An architect needs to enable their central analytics team (on AWS US) to run queries against all data. Which approach minimizes data movement while meeting compliance?
- A) Replicate all data to the AWS US account and query locally
- B) Use data sharing with Cross-Cloud Auto-Fulfillment to query data in place
- C) Create external tables pointing to each cloud's storage
- D) Use Snowpark Container Services to federate queries across accounts

---

## Q46 (Single Answer)
What happens when a storage integration is used to create an external stage?
- A) The stage credentials are embedded directly in the stage definition
- B) The stage references the storage integration, which manages cloud credentials through an IAM entity
- C) The storage integration creates a copy of the data in Snowflake-managed storage
- D) The stage can only be accessed by the SYSADMIN role

---

## Q47 (Scenario)
An architect needs to implement a security model where data engineers can create and modify objects in development schemas, but can only read production schemas. Analysts should only read both. How should the architect structure the access roles?
- A) Create DE_DEV_RW, DE_PROD_RO, ANALYST_ALL_RO access roles with appropriate grants, then assign these to functional roles
- B) Use a single DATA_ACCESS role with row access policies to differentiate environments
- C) Grant SYSADMIN to data engineers and PUBLIC to analysts
- D) Create separate accounts for development and production access

---

## Q48 (Single Answer)
Which Snowflake feature allows tracking of which columns in a table were read by queries, supporting data lineage and compliance requirements?
- A) Query History view
- B) Access History (ACCESS_HISTORY view)
- C) Information Schema COLUMNS view
- D) SHOW GRANTS command

---

## Q49 (Multi Answer - Select 2)
Which TWO are valid use cases for implementing multiple Snowflake accounts within an organization? (Select TWO)
- A) Isolating production workloads from development workloads for compliance
- B) Supporting different Snowflake editions for different business requirements
- C) Reducing overall Snowflake licensing costs
- D) Enabling different cloud providers for data residency compliance
- E) Automatically sharing all data between business units

---

## Q50 (Scenario)
A security team requires that all API calls to Snowflake from their data pipeline tools use encrypted connections and authenticate without human interaction. The team also wants automatic credential rotation. Which authentication method is MOST appropriate?
- A) Username/password authentication with quarterly manual rotation
- B) Key-pair authentication with automated key rotation
- C) SAML SSO with browser-based authentication
- D) OAuth with interactive consent flow

---

## Q51 (Single Answer)
What is the primary difference between the SECURITYADMIN and USERADMIN system-defined roles?
- A) SECURITYADMIN manages network policies while USERADMIN manages warehouses
- B) SECURITYADMIN can manage grants on any object via the MANAGE GRANTS privilege, while USERADMIN can create and manage users and roles
- C) USERADMIN is a parent role of SECURITYADMIN
- D) They are aliases for the same role in different Snowflake editions

---

## Q52 (Scenario)
An architect is designing a Snowflake environment for a company that processes credit card data. PCI DSS compliance requires that cardholder data is masked for all users except those with a specific compliance clearance role. Which implementation is MOST appropriate?
- A) Store credit card data in a separate encrypted database accessible only to cleared users
- B) Implement dynamic data masking policies on cardholder columns that return full data only when CURRENT_ROLE() is the compliance role
- C) Use external tokenization to replace card numbers with tokens, storing the token vault separately
- D) Restrict access to the entire table using row access policies

---

## Q53 (Single Answer)
Which parameter controls the maximum number of seconds a statement can execute before being automatically cancelled?
- A) LOCK_TIMEOUT
- B) STATEMENT_TIMEOUT_IN_SECONDS
- C) QUERY_TIMEOUT_SECONDS
- D) MAX_EXECUTION_TIME

---

## Q54 (Multi Answer - Select 2)
Which TWO network connectivity options provide private connectivity to Snowflake, bypassing the public internet? (Select TWO)
- A) AWS PrivateLink
- B) VPN tunnel to Snowflake's data center
- C) Azure Private Link
- D) SSH tunneling through a bastion host
- E) Direct peering with Snowflake's network

---

## Q55 (Scenario)
A data platform team has 200+ masking policies applied individually to columns across hundreds of tables. Maintaining these policies has become operationally burdensome. The architect wants to simplify management. What is the BEST approach?
- A) Consolidate all masking policies into a single policy with complex conditional logic
- B) Migrate to tag-based masking policies where tags classify data sensitivity, and policies are associated with tag values
- C) Remove masking policies and use secure views instead
- D) Switch to external tokenization for all sensitive columns

---

## Q56 (Single Answer)
What is the purpose of an authentication policy in Snowflake?
- A) To define which IP addresses can connect to the account
- B) To specify the allowed authentication methods (password, SSO, key-pair) for a user or account
- C) To set password complexity requirements
- D) To manage encryption keys for data at rest

---

## Q57 (Scenario)
An architect at a technology company needs to allow a Snowpark UDF to call an external REST API for real-time enrichment during query execution. The company's security policy requires all external network access to be explicitly approved. Which configuration is required?
- A) Grant the UDF owner role NETWORK ACCESS privileges
- B) Create a network rule allowing the API host and an external access integration referencing that rule, then attach the integration to the UDF
- C) Disable the account-level network policy for UDF execution
- D) Use a storage integration to access the REST API

---

## Q58 (Single Answer)
When using SCIM (System for Cross-domain Identity Management) with Snowflake, which operations are managed through the SCIM integration?
- A) Only user creation and deletion
- B) User provisioning, deprovisioning, and role/group mapping from the IdP
- C) Database creation and schema management
- D) Network policy configuration and MFA enrollment

---

## Q59 (Multi Answer - Select 2)
Which TWO privileges are required for a role to create masking policies in a schema? (Select TWO)
- A) CREATE MASKING POLICY on the schema
- B) OWNERSHIP on all tables in the schema
- C) USAGE on the database and schema
- D) ACCOUNTADMIN role membership
- E) APPLY MASKING POLICY on the account

---

## Q60 (Scenario)
An architect is designing a data mesh architecture where each domain team owns its Snowflake database. The central governance team needs to enforce consistent masking policies across all domains without directly managing each domain's objects. Which approach enables this?
- A) Have the governance team create masking policies in a centralized governance database and share them via data sharing
- B) Use tag-based masking policies where the governance team owns the tags and policies, and domain teams apply tags to their columns
- C) Require each domain team to implement their own masking policies following a governance guide
- D) Use the ACCOUNTADMIN role to apply policies across all databases

---

## Q61 (Single Answer)
What is the effect of setting the REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION account parameter to TRUE?
- A) All existing stages without storage integrations are automatically dropped
- B) Users must reference a storage integration when creating external stages, preventing inline credentials
- C) Internal stages are disabled for the account
- D) Storage integrations are automatically created for all existing stages

---

## Q62 (Scenario)
A company recently experienced a security incident where a developer accidentally exposed database credentials in a Git repository. The architect needs to prevent direct credential use in Snowflake stage definitions. Which Snowflake feature addresses this risk?
- A) Enabling MFA for all developers
- B) Setting REQUIRE_STORAGE_INTEGRATION_FOR_STAGE_CREATION = TRUE and using storage integrations
- C) Creating network policies to block access from public IP ranges
- D) Using Tri-Secret Secure encryption

---

## Q63 (Single Answer)
Which role is the automatic owner of all objects created by SYSADMIN?
- A) ACCOUNTADMIN
- B) SYSADMIN itself
- C) The role that was active when the object was created
- D) PUBLIC

---

## Q64 (Multi Answer - Select 2)
Which TWO are best practices for designing a role hierarchy in Snowflake? (Select TWO)
- A) Grant all custom roles ultimately to SYSADMIN to prevent orphaned objects
- B) Use ACCOUNTADMIN as the default role for administrative users
- C) Create separate access roles for read and write privileges on the same objects
- D) Avoid using system-defined roles and create custom equivalents
- E) Grant ACCOUNTADMIN to all users for maximum flexibility

---

## Q65 (Scenario)
An architect needs to implement a solution where sensitive salary data in an HR table is visible only to HR managers. Other users querying the table should see the salary column return NULL. The policy must work regardless of how the table is queried (direct, via view, via join). Which feature should be used?
- A) Create a secure view that excludes the salary column
- B) Apply a dynamic data masking policy on the salary column
- C) Create a row access policy filtering on the user's department
- D) Revoke SELECT privilege on the salary column for non-HR roles

---

## Q66 (Single Answer)
What is the scope of a network policy when applied at the account level versus at the user level?
- A) Account-level policies apply to all users; user-level policies override account-level for specific users
- B) Account-level and user-level policies are combined (intersection)
- C) User-level policies cannot be created — only account-level is supported
- D) Account-level policies only apply to users without a user-level policy assigned

---

## Q67 (Scenario)
A data architect is planning a cross-account data sharing solution within a Snowflake organization. The provider account will share real-time transactional data with a consumer account. The consumer needs the data to be always current with no replication lag. What sharing mechanism should the architect use?
- A) Database replication with frequent refresh schedules
- B) Direct data sharing within the same region (zero-copy sharing)
- C) Export data to cloud storage and import into the consumer account
- D) Use Snowpipe to continuously load data into both accounts

---

## Q68 (Single Answer)
Which privilege is needed to apply a masking policy to a column on a table owned by another role?
- A) OWNERSHIP on the table
- B) APPLY MASKING POLICY on the account or APPLY on the specific policy
- C) SELECT on the table
- D) MODIFY on the table

---

## Q69 (Multi Answer - Select 2)
Which TWO scenarios would require the use of an external access integration in Snowflake? (Select TWO)
- A) A UDF that calls an external machine learning API endpoint
- B) A stored procedure that reads data from an external S3 stage
- C) A stored procedure that sends results to an external webhook URL
- D) A query that joins data from two Snowflake databases
- E) A task that refreshes a materialized view

---

## Q70 (Scenario)
An architect at a European bank is designing Snowflake security architecture. GDPR requires the ability to delete all personal data for a specific customer upon request (right to erasure). The data is spread across 50+ tables. What architectural approach BEST supports this requirement?
- A) Use Time Travel to restore tables to a point before the customer's data was loaded
- B) Implement a centralized customer identifier across all tables and use stored procedures to delete matching records, leveraging object tagging to identify tables with personal data
- C) Use dynamic data masking to hide the customer's data instead of deleting it
- D) Maintain a separate Snowflake account for each customer for easy deletion

---

## Q71 (Single Answer)
When Snowflake automatically rotates encryption keys, what is the default rotation period?
- A) 7 days
- B) 30 days
- C) 90 days
- D) 365 days

---

## Q72 (Scenario)
A solutions architect needs to grant a third-party consulting firm temporary access to specific Snowflake objects for a 3-month engagement. Access should automatically expire. What is the MOST operationally efficient approach?
- A) Create user accounts and set a calendar reminder to delete them after 3 months
- B) Create user accounts with the DAYS_TO_EXPIRY parameter set to 90
- C) Share data via a reader account and monitor access manually
- D) Provide credentials to the consulting firm's existing Snowflake account via data sharing

---

## Q73 (Single Answer)
What is the purpose of the IMPORTED PRIVILEGES privilege on a shared database?
- A) It allows the consumer to modify the shared objects
- B) It grants the consumer role access to all objects included in the share without needing individual grants
- C) It enables the consumer to re-share the data with other accounts
- D) It imports the provider's masking policies into the consumer account

---

## Q74 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's end-to-end encryption? (Select TWO)
- A) Data is encrypted at rest using AES-256 encryption
- B) Data in transit is protected using TLS 1.2 or higher
- C) Customers must provide their own encryption keys for data at rest by default
- D) Encryption is optional and must be explicitly enabled per table
- E) Encryption keys are stored in plaintext in the metadata layer

---

## Q75 (Scenario)
An architect is implementing OAuth for Snowflake access. The company uses Azure AD as their identity provider. Applications connecting to Snowflake should obtain tokens from Azure AD. Which type of security integration should the architect create?
- A) A SAML2 security integration
- B) An External OAuth security integration configured for Azure AD
- C) A SCIM security integration for Azure AD
- D) A Snowflake OAuth security integration

---

## Q76 (Single Answer)
Which command reveals the effective parameter value for a specific session, accounting for all levels of the parameter hierarchy?
- A) SHOW PARAMETERS FOR ACCOUNT
- B) SHOW PARAMETERS IN SESSION
- C) DESCRIBE PARAMETER
- D) SELECT SYSTEM$GET_PARAMETER()

---

## Q77 (Scenario)
An enterprise architect is consolidating multiple business units into a single Snowflake organization. Each business unit currently has its own Snowflake account with different naming conventions and role structures. The architect needs to implement centralized account management. Which approach provides the BEST centralized control?
- A) Merge all accounts into a single account with separate databases per business unit
- B) Use the ORGADMIN role to manage all accounts within the organization, implementing account-level parameters and organization-wide policies
- C) Designate one account as primary and replicate data from all other accounts
- D) Create a new master account and migrate all users manually

---

## Q78 (Single Answer)
What is the minimum Snowflake edition required to use row access policies?
- A) Standard
- B) Enterprise
- C) Business Critical
- D) Virtual Private Snowflake

---

## Q79 (Multi Answer - Select 2)
Which TWO account-level security features are available ONLY in Business Critical Edition and higher? (Select TWO)
- A) Column-level masking policies
- B) HIPAA and PCI DSS compliance support
- C) Multi-factor authentication (MFA)
- D) Tri-Secret Secure encryption
- E) Network policies

---

## Q80 (Scenario)
A data engineer has created a stored procedure that processes sensitive data. The procedure is defined with EXECUTE AS OWNER. An analyst with a restricted role executes the procedure. Under which role's privileges does the procedure execute?
- A) The analyst's current role
- B) The role that owns the stored procedure
- C) The SYSADMIN role
- D) The PUBLIC role

---

## Q81 (Single Answer)
What determines which account identifier format should be used when connecting to Snowflake?
- A) The Snowflake edition determines the identifier format
- B) The organization name and account name form the preferred identifier (<orgname>-<accountname>), replacing the legacy locator format
- C) Only the legacy account locator is supported
- D) The cloud provider determines which format is available

---

## Q82 (Scenario)
A healthcare organization needs to enforce that the SSN column in a PATIENTS table cannot be included in any query's SELECT list, but can still be used in WHERE clauses for filtering. Which Snowflake governance feature achieves this?
- A) Dynamic data masking policy
- B) Projection policy
- C) Row access policy
- D) Aggregate policy

---

## Q83 (Single Answer)
When configuring AWS PrivateLink for Snowflake, which component must be created in the customer's AWS account?
- A) A NAT Gateway pointing to Snowflake's public endpoint
- B) A VPC Interface Endpoint that connects to Snowflake's PrivateLink service
- C) A VPN connection to Snowflake's VPC
- D) A Direct Connect link to Snowflake's data center

---

## Q84 (Multi Answer - Select 2)
Which TWO statements about the ACCOUNTADMIN role are considered best practices? (Select TWO)
- A) ACCOUNTADMIN should be used as the default role for day-to-day operations
- B) At least two users should be assigned the ACCOUNTADMIN role for emergency access
- C) ACCOUNTADMIN should have MFA enabled for all assigned users
- D) ACCOUNTADMIN should own all databases and schemas directly
- E) ACCOUNTADMIN should be the primary role used by data engineers

---

## Q85 (Scenario)
An architect is designing a solution where a Snowflake account on AWS needs to share data with a partner's Snowflake account on Azure in a different region. The data must be always current with minimal lag. What is the recommended approach?
- A) Set up manual data export/import processes on a daily schedule
- B) Use Cross-Cloud Auto-Fulfillment by listing the share and enabling replication to the partner's region
- C) Create an external stage in the partner's Azure storage and use COPY INTO
- D) Use Snowflake Marketplace to list the data as a private listing

---

## Q86 (Single Answer)
What is the effect of setting DATA_RETENTION_TIME_IN_DAYS to 0 for a database?
- A) Time Travel is disabled; dropped data goes directly to Fail-safe
- B) Time Travel is disabled; dropped data is permanently deleted immediately
- C) The database becomes read-only
- D) Data is retained indefinitely

---

## Q87 (Scenario)
An architect is configuring Snowflake for a team that uses multiple identity providers — Azure AD for corporate users and Okta for contractor users. Both need to authenticate via SSO. How should this be configured?
- A) Configure two separate SAML security integrations, one for each IdP, and assign users to the appropriate integration
- B) Use only one IdP and require all users to use the same provider
- C) Configure External OAuth for both IdPs instead of SAML
- D) Use key-pair authentication for all users to avoid IdP conflicts

---

## Q88 (Single Answer)
Which Snowflake feature tracks column-level data lineage showing how data flows from source to target tables?
- A) Query History
- B) ACCESS_HISTORY view with column lineage
- C) INFORMATION_SCHEMA.TABLE_CONSTRAINTS
- D) SHOW OBJECTS command

---

## Q89 (Multi Answer - Select 2)
Which TWO governance features help an architect achieve compliance with regulations requiring knowledge of where sensitive data resides? (Select TWO)
- A) Snowflake data classification
- B) Object tagging
- C) Resource monitors
- D) Query Acceleration Service
- E) Auto-clustering

---

## Q90 (Scenario)
A solutions architect is designing a multi-account strategy for a large enterprise. Development teams should be free to experiment, staging should mirror production settings, and production must have the highest security. Which account configuration strategy is MOST appropriate?
- A) Single account with dev/staging/prod databases, using RBAC to control access
- B) Three accounts (Dev: Standard, Staging: Enterprise, Prod: Business Critical) with replication for promotion
- C) Three Business Critical accounts with identical configuration for consistency
- D) One production account with read-replica accounts for dev and staging

---

## Q91 (Single Answer)
What is the maximum number of masking policies that can be applied to a single column?
- A) 1
- B) 3
- C) 5
- D) Unlimited

---

## Q92 (Scenario)
An architect discovers that analysts in the organization are using SELECT * queries that inadvertently expose columns containing sensitive financial data. The architect does not want to remove SELECT access on the table but wants to prevent those specific columns from appearing in query results. Which feature should be used?
- A) Dynamic data masking to return NULL for those columns
- B) Projection policies on the sensitive columns
- C) A secure view that excludes the sensitive columns
- D) A row access policy filtering based on column sensitivity

---

## Q93 (Single Answer)
When a network policy is applied to a specific security integration, what is its scope?
- A) It applies to all users in the account
- B) It applies only to connections that authenticate through that security integration
- C) It replaces the account-level network policy
- D) It applies only to service accounts

---

## Q94 (Multi Answer - Select 2)
Which TWO statements about key-pair authentication in Snowflake are correct? (Select TWO)
- A) The public key is stored in Snowflake; the private key is kept by the user
- B) Key-pair authentication requires Business Critical Edition or higher
- C) A user can have up to 2 active public keys to support key rotation
- D) Key-pair authentication cannot be used with multi-factor authentication
- E) The private key must be uploaded to Snowflake for verification

---

## Q95 (Scenario)
A financial institution needs to implement a solution where aggregate query results must include at least 10 records in any group, preventing analysts from isolating individual customer records through repeated queries with narrow filters. Which Snowflake feature addresses this?
- A) Row access policy requiring at least 10 matching rows
- B) Aggregate policy with a minimum group size of 10
- C) Dynamic data masking on the GROUP BY columns
- D) Secure view with a HAVING COUNT(*) >= 10 clause

---

## Q96 (Single Answer)
Which statement about the PUBLIC role in Snowflake is correct?
- A) The PUBLIC role must be explicitly granted to each user
- B) The PUBLIC role is automatically granted to every user and every role in the account
- C) The PUBLIC role can be dropped by ACCOUNTADMIN
- D) The PUBLIC role cannot own any objects

---

## Q97 (Scenario)
An architect is configuring Google Cloud Private Service Connect for Snowflake. The company needs to ensure all Snowflake traffic from their GCP VPC goes through private endpoints. Which component must the architect configure in their GCP project?
- A) A Cloud VPN tunnel to Snowflake's network
- B) A forwarding rule and Private Service Connect endpoint targeting Snowflake's published service attachment
- C) A Cloud NAT gateway with Snowflake's IP ranges whitelisted
- D) A Cloud Interconnect dedicated connection to Snowflake

---

## Q98 (Single Answer)
What is the purpose of the APPLY ROW ACCESS POLICY privilege?
- A) It allows a role to create new row access policies
- B) It allows a role to apply or remove row access policies on tables, even if they do not own the table
- C) It allows a role to bypass existing row access policies
- D) It grants read access to all rows in tables with row access policies

---

## Q99 (Multi Answer - Select 2)
An architect is designing authentication for a Snowflake deployment. Which TWO authentication methods support non-interactive (machine-to-machine) authentication? (Select TWO)
- A) Key-pair authentication
- B) Snowflake OAuth with client credentials flow
- C) SAML SSO with browser redirect
- D) Password-based authentication with mandatory MFA push
- E) Certificate-based mutual TLS

---

## Q100 (Scenario)
A company uses Snowflake for analytics and has recently acquired another company with its own Snowflake account. The architect needs to merge the acquired company's data into the parent company's Snowflake environment. During the transition, both accounts need to share data bidirectionally. What is the BEST approach?
- A) Set up data sharing in both directions between the two accounts while planning a phased migration
- B) Immediately drop the acquired company's account and re-create all objects in the parent account
- C) Use external cloud storage as an intermediary for all data exchange
- D) Run parallel ETL pipelines to keep both accounts synchronized

---

## Q101 (Single Answer)
Which Snowflake function is used within a masking policy to determine the roles available in the current session, including secondary roles?
- A) CURRENT_ROLE()
- B) IS_ROLE_IN_SESSION()
- C) HAS_ROLE()
- D) SYSTEM$GET_ROLES()

---

## Q102 (Scenario)
An architect notices that a dynamic data masking policy applied to an email column is working correctly for direct table queries but not when users access the data through a specific view. Upon investigation, the view is NOT a secure view. What is the MOST likely explanation?
- A) Masking policies do not apply to views — only direct table access
- B) The view owner's role may have unmasked access, and since it is not a secure view, the optimizer may bypass the policy
- C) The masking policy needs to be reapplied to the view separately
- D) Views automatically decrypt masked values for all users

---

## Q103 (Single Answer)
What is the minimum privilege required to create a share in Snowflake?
- A) USAGE on the database
- B) CREATE SHARE on the account
- C) SYSADMIN role membership
- D) OWNERSHIP on all shared objects

---

## Q104 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake's automatic key rotation for encryption? (Select TWO)
- A) Snowflake automatically rotates the account master key periodically
- B) When a key is rotated, all existing data must be re-encrypted immediately
- C) Previous key versions are maintained to decrypt data encrypted with older keys
- D) Automatic key rotation is only available with Tri-Secret Secure
- E) Key rotation requires a scheduled maintenance window

---

## Q105 (Scenario)
An architect is implementing a least-privilege access model where hundreds of tables need different masking policies based on data sensitivity level (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED). Creating individual masking policy assignments for each column is not scalable. What is the recommended approach?
- A) Create one masking policy per sensitivity level and assign them manually to each column
- B) Use object tags to classify columns by sensitivity level and associate masking policies with tag values (tag-based masking)
- C) Create separate databases for each sensitivity level and use RBAC to control database access
- D) Implement a single masking policy with case statements for every table and column

---

## Q106 (Single Answer)
Which authentication method does Snowflake use natively (built into the service) for OAuth, as opposed to External OAuth?
- A) Snowflake OAuth generates and validates tokens internally without requiring an external authorization server
- B) Snowflake OAuth requires Azure AD as the token issuer
- C) Snowflake OAuth is only available for Snowflake CLI connections
- D) Snowflake OAuth is a deprecated feature replaced by External OAuth

---

## Q107 (Scenario)
A data architect is setting up Snowflake for a multi-national conglomerate with subsidiaries in different countries. Each subsidiary requires its own billing, but they need to share reference data. The conglomerate wants centralized governance over security policies. What is the BEST account strategy?
- A) One account per subsidiary with ORGADMIN managing the organization; use data sharing for reference data and replication for policy templates
- B) One global account with separate databases per subsidiary
- C) Independent Snowflake contracts per subsidiary with no organizational link
- D) A single account with separate warehouses per subsidiary for billing isolation

---

## Q108 (Single Answer)
What is the purpose of the MANAGE GRANTS privilege assigned to the SECURITYADMIN role?
- A) It allows creating new roles only
- B) It allows granting and revoking privileges on any object in the account, regardless of ownership
- C) It allows managing encryption key grants
- D) It provides read access to all granted objects

---

## Q109 (Multi Answer - Select 2)
Which TWO strategies help prevent privilege escalation through role hierarchy in Snowflake? (Select TWO)
- A) Ensure all custom roles are granted to SYSADMIN and that SYSADMIN is granted to ACCOUNTADMIN
- B) Restrict the use of WITH GRANT OPTION to only SECURITYADMIN and ACCOUNTADMIN
- C) Grant ACCOUNTADMIN to all team leads for oversight
- D) Use the future grants feature to avoid ad-hoc grant sprawl
- E) Disable the SECURITYADMIN role to prevent unauthorized grant changes

---

## Q110 (Scenario)
An architect is troubleshooting a scenario where a user with the ANALYST role can see data that should be masked by a dynamic masking policy. The policy checks CURRENT_ROLE() = 'DATA_STEWARD'. The user's primary role is ANALYST, but DATA_STEWARD is one of their secondary roles. What is the issue?
- A) The masking policy is not supported with secondary roles
- B) CURRENT_ROLE() only returns the primary role; the policy should use IS_ROLE_IN_SESSION('DATA_STEWARD') to check both primary and secondary roles
- C) Secondary roles bypass all masking policies
- D) The masking policy needs to be re-created with secondary role support enabled

---

## Q111 (Single Answer)
Which Snowflake edition is required to use external tokenization?
- A) Standard
- B) Enterprise
- C) Business Critical
- D) Any edition

---

## Q112 (Scenario)
A solutions architect is designing a Snowflake environment for an e-commerce company. The company's web application needs to query Snowflake using individual user identities for audit purposes, but users authenticate through the company's own application (not directly to Snowflake). Which authentication approach is MOST suitable?
- A) Create individual Snowflake users for each web application user with password authentication
- B) Use programmatic Snowflake OAuth with the web application as the OAuth client, mapping application users to Snowflake users
- C) Use a single service account for all web application queries
- D) Configure SAML SSO between the web application and Snowflake

---

## Q113 (Single Answer)
What happens when you set the INITIAL_REPLICATION_SIZE_LIMIT_IN_TB parameter for an account?
- A) It limits the total storage size of the account
- B) It sets the maximum amount of data that can be transferred during the initial replication of a database
- C) It limits the size of individual tables
- D) It restricts the amount of data that can be loaded per day

---

## Q114 (Multi Answer - Select 2)
Which TWO are valid scopes for applying a network policy in Snowflake? (Select TWO)
- A) At the account level, affecting all connections
- B) At the individual user level, overriding the account-level policy
- C) At the database level, protecting specific databases
- D) At the warehouse level, controlling warehouse access
- E) At the table level, protecting individual tables

---

## Q115 (Scenario)
A security architect needs to implement a solution where Snowflake's encryption keys are protected such that if the customer revokes access to their cloud KMS key, no data in Snowflake can be decrypted — effectively providing a "kill switch" for data access. Which feature provides this capability?
- A) Standard Snowflake encryption with periodic key rotation
- B) Tri-Secret Secure, where a composite master key requires both Snowflake's and the customer's key
- C) End-to-end encryption with customer-provided TLS certificates
- D) Client-side encryption before loading data into Snowflake

---

## Q116 (Single Answer)
When configuring SCIM with an identity provider, which Snowflake role is typically used as the SCIM integration owner?
- A) SYSADMIN
- B) ACCOUNTADMIN
- C) SECURITYADMIN or a custom role with user management privileges
- D) PUBLIC

---

## Q117 (Scenario)
An architect is implementing a data clean room solution where two companies (Company A and Company B) want to perform overlap analysis on their customer data without either party seeing the other's raw data. Which Snowflake approach supports this?
- A) Standard data sharing where both parties can see all shared data
- B) A data clean room using secure views, row access policies, and aggregate policies to ensure only aggregated overlap results are returned
- C) Replicating both companies' data into a third neutral account
- D) Using external tables to federate queries across both companies' cloud storage

---

## Q118 (Single Answer)
What is the maximum number of network policies that can be active on a Snowflake account at one time?
- A) 1 at the account level
- B) 5 at the account level
- C) Unlimited
- D) 1 per user plus 1 at the account level

---

## Q119 (Multi Answer - Select 2)
Which TWO security benefits does private connectivity (e.g., AWS PrivateLink) provide for Snowflake? (Select TWO)
- A) Traffic between the customer's VPC and Snowflake stays on the cloud provider's private network backbone
- B) All data in Snowflake is encrypted with the customer's private keys
- C) It eliminates the exposure of Snowflake traffic to the public internet
- D) It replaces the need for authentication — only network-level trust is required
- E) It automatically configures network policies for the account

---

## Q120 (Scenario)
An architect is reviewing a Snowflake account and discovers that the SYSADMIN role cannot access objects created by a custom role called DATA_PIPELINE_ROLE. The role was created by USERADMIN but was never granted to SYSADMIN. What is the recommended remediation?
- A) Drop and re-create the role with SYSADMIN as the owner
- B) Grant DATA_PIPELINE_ROLE to SYSADMIN to restore the hierarchy
- C) Transfer ownership of all objects to SYSADMIN
- D) Use ACCOUNTADMIN to force-grant access to the objects

---

## Q121 (Single Answer)
What does the ALLOW_CLIENT_MFA_CACHING parameter control?
- A) Whether MFA tokens can be cached on the client side to reduce repeated authentication prompts
- B) Whether MFA is required for all users
- C) The duration of MFA session tokens
- D) Whether MFA challenges are sent via SMS or push notification

---

## Q122 (Scenario)
An architect is designing a Snowflake deployment for an organization that needs to comply with both SOC 2 Type II and GDPR. Data must be stored exclusively in the EU region, and the organization needs documentation of Snowflake's compliance certifications. Which combination of actions should the architect take?
- A) Deploy on any cloud region and rely on Snowflake's global encryption
- B) Deploy a Business Critical Edition account in an EU region, leverage Snowflake's compliance documentation (SOC 2 reports), and implement data governance features for GDPR
- C) Deploy a Standard Edition account in the EU and add custom encryption
- D) Use VPS to create a dedicated EU environment and self-certify SOC 2

---

## Q123 (Single Answer)
What is the relationship between a share and a reader account in Snowflake?
- A) A reader account is a full Snowflake account created by the consumer
- B) A reader account is a managed account created by the provider to enable data sharing with consumers who do not have their own Snowflake account
- C) Reader accounts can create their own databases and shares
- D) Reader accounts have unlimited compute resources provided by the consumer

---

## Q124 (Multi Answer - Select 2)
Which TWO factors should an architect consider when deciding between a single-account and multi-account Snowflake strategy? (Select TWO)
- A) Regulatory requirements for environment isolation and data residency
- B) The number of tables in the data warehouse
- C) Billing separation requirements across business units or subsidiaries
- D) The programming language used by the development team
- E) The version of SQL used in queries

---

## Q125 (Scenario)
A solutions architect is implementing a zero-trust security model for Snowflake access. The requirements include: all connections must be authenticated with MFA, all network access must come through private endpoints, and all data access must be authorized through fine-grained RBAC. Which combination of Snowflake features implements this model?
- A) MFA enforcement via authentication policies, AWS PrivateLink/Azure Private Link, and RBAC with access roles and masking policies
- B) Password-only authentication, network policies with public IP allowlists, and ACCOUNTADMIN role for all users
- C) SSO only, VPN connectivity, and database-level access control
- D) Key-pair authentication, no network restrictions, and schema-level RBAC only
