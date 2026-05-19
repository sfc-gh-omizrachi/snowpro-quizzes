# Domain 1: Access Control and Identity Management

---

## Q1 (Scenario)
A Security Engineer needs to onboard 200 users from an Azure Active Directory tenant into Snowflake and keep group memberships synchronized automatically. Which Snowflake feature should be used?
- A) Snowflake OAuth with a custom integration
- B) SAML2 federation with Azure AD as the identity provider
- C) SCIM provisioning with Azure AD as the identity provider
- D) Key-pair authentication with a service account user

---

## Q2 (Scenario)
A company requires that all Snowflake roles follow a least-privilege model. A new analyst team needs read-only access to tables in ANALYTICS_DB.PUBLIC but must not have any other privileges. Which approach is MOST appropriate?
- A) Grant SELECT on ANALYTICS_DB.PUBLIC.* to the SYSADMIN role and have analysts use that role
- B) Create a custom access role, grant SELECT on the specific tables, and assign it to analyst users
- C) Grant USAGE on ANALYTICS_DB and SELECT on all schemas to the PUBLIC role
- D) Create a functional role with ACCOUNTADMIN as parent to ensure privilege inheritance

---

## Q3 (Single Answer)
Which Snowflake system-defined role has the ability to create and manage other roles but should NOT be used for day-to-day operations?
- A) SYSADMIN
- B) SECURITYADMIN
- C) ORGADMIN
- D) USERADMIN

---

## Q4 (Scenario)
A Security Engineer is configuring MFA for all Snowflake users in an enterprise. Some users connect via Snowsight and others use JDBC drivers in ETL pipelines. Which statement about MFA enforcement is correct?
- A) MFA can be enforced at the user level using authentication policies; service accounts should use key-pair authentication instead
- B) MFA cannot be enforced for JDBC connections because the driver does not support push notifications
- C) The ACCOUNTADMIN role must manually enable MFA for each user individually via ALTER USER
- D) MFA is enforced globally by default once enabled; there is no per-user override

---

## Q5 (Single Answer)
Which Snowflake authentication method uses a private key stored locally by the client and does NOT require a password?
- A) OAuth client credentials flow
- B) Key-pair authentication
- C) External browser authentication
- D) Programmatic Access Token (PAT)

---

## Q6 (Scenario)
An automated ETL pipeline connects to Snowflake using a service account. The security team requires that the pipeline's credentials be rotated every 90 days without changing the pipeline's configuration. Which authentication method BEST satisfies this requirement?
- A) Username and password with Snowflake-managed rotation
- B) Key-pair authentication with key rotation using ALTER USER ... SET RSA_PUBLIC_KEY_2
- C) SAML federation using the service account's Azure AD identity
- D) OAuth with a refresh token that expires after 90 days

---

## Q7 (Single Answer)
A network policy is applied at the account level and another is applied to a specific user. When the user connects, which policy takes precedence?
- A) The account-level policy always takes precedence
- B) The user-level policy takes precedence over the account-level policy
- C) Both policies are evaluated and the more restrictive one applies
- D) Network policies cannot be applied at both levels simultaneously

---

## Q8 (Scenario)
A financial services company needs to allow Snowflake to call an external REST API for fraud scoring while ensuring no other external endpoints can be reached from within stored procedures. Which combination of Snowflake objects should be used?
- A) A network policy with an IP allow list and an external function
- B) A network rule specifying the allowed HOST_PORT and an external access integration referencing that rule
- C) A PrivateLink endpoint to the external API and a storage integration
- D) An egress proxy configured at the virtual warehouse level

---

## Q9 (Single Answer)
Which Snowflake view in ACCOUNT_USAGE would a Security Engineer query to identify which privileges have been granted to a specific role?
- A) GRANTS_TO_USERS
- B) GRANTS_TO_ROLES
- C) ROLE_GRANTS
- D) PRIVILEGES_GRANTED

---

## Q10 (Scenario)
A company's compliance team requires that no Snowflake user can log in from outside the corporate IP range (203.0.113.0/24), except for SYSADMIN during maintenance windows. How should this be configured?
- A) Create one account-level network policy allowing 203.0.113.0/24 and a user-level policy for SYSADMIN with a broader IP range
- B) Create a network policy with ALLOWED_IP_LIST = ['203.0.113.0/24'] and apply it to every non-SYSADMIN user
- C) Use an authentication policy to restrict login by IP address
- D) Configure a PrivateLink connection so only corporate network traffic reaches Snowflake

---

## Q11 (Single Answer)
Which Snowflake object is used to store credentials (such as OAuth tokens, passwords, or cloud provider keys) securely for use in stored procedures and external access integrations?
- A) Parameter
- B) Secret
- C) Stage credential
- D) Vault integration

---

## Q12 (Scenario)
A Security Engineer discovers that a third-party application connected to Snowflake via OAuth is requesting excessive scopes. Which action should the engineer take FIRST to mitigate risk?
- A) Drop the OAuth security integration and recreate it with restricted scopes
- B) Revoke the refresh tokens issued to the third-party application using the SYSTEM$REVOKE_TOKENS procedure
- C) Disable the user account associated with the third-party application
- D) Enable MFA on the OAuth security integration

---

## Q13 (Scenario)
An organization uses a hierarchical RBAC model. The ANALYST role inherits privileges from the DATA_READER role. A new table TABLE_X is created and SELECT is granted only to DATA_READER. A user granted only the ANALYST role tries to query TABLE_X. What is the result?
- A) The query fails because ANALYST must be explicitly granted SELECT on TABLE_X
- B) The query succeeds because ANALYST inherits privileges from DATA_READER via role hierarchy
- C) The query fails unless SYSADMIN explicitly grants inheritance
- D) The query succeeds only if ANALYST is set as the active role

---

## Q14 (Single Answer)
Which Snowflake feature allows a security team to enforce that all users must use a specific authentication method (for example, key-pair only) for a given set of users?
- A) Network policy
- B) Session policy
- C) Authentication policy
- D) Password policy

---

## Q15 (Scenario)
A company is migrating from single-factor password authentication to key-pair authentication for all service accounts. During the transition, some service accounts still use passwords. Which Snowflake view should be queried to identify which authentication method each user is currently using?
- A) ACCOUNT_USAGE.USERS
- B) ACCOUNT_USAGE.LOGIN_HISTORY
- C) ACCOUNT_USAGE.SESSIONS
- D) INFORMATION_SCHEMA.APPLICABLE_ROLES

---

## Q16 (Scenario)
A Security Engineer needs to implement AWS PrivateLink for Snowflake so that all traffic from the corporate AWS VPC stays within the AWS network and never traverses the public internet. What must be configured on the AWS side before Snowflake can be accessed via PrivateLink?
- A) A VPN gateway between the corporate VPC and Snowflake's VPC
- B) A VPC endpoint in the corporate VPC targeting Snowflake's PrivateLink service
- C) An Internet Gateway with a route to Snowflake's CIDR range
- D) An S3 gateway endpoint configured with Snowflake's bucket ARN

---

## Q17 (Single Answer)
Snowflake SCIM provisioning supports automated user and group lifecycle management. Which Snowflake role is required to configure a SCIM security integration?
- A) SYSADMIN
- B) SECURITYADMIN
- C) ACCOUNTADMIN
- D) USERADMIN

---

## Q18 (Scenario)
A Security Engineer needs to ensure that a specific Snowflake user can only connect during business hours (9 AM to 5 PM UTC) and that sessions older than 4 hours are automatically terminated. Which Snowflake objects should be used?
- A) A network policy with time-based IP restrictions and an authentication policy
- B) A session policy to set the session timeout and a task to drop sessions outside business hours
- C) A session policy setting SESSION_IDLE_TIMEOUT_MINS and a password policy restricting login hours
- D) An authentication policy enforcing login time windows and a session policy setting maximum session length

---

## Q19 (Single Answer)
In Snowflake's access control model, which privilege must be granted on a database before any lower-level object privileges (such as SELECT on a table) are effective?
- A) MODIFY
- B) CREATE SCHEMA
- C) USAGE
- D) OWNERSHIP

---

## Q20 (Scenario)
An enterprise Snowflake account has hundreds of users and roles. The Security Engineer suspects that some roles have accumulated excessive privileges over time ("privilege creep"). Which query against ACCOUNT_USAGE would BEST surface roles with unexpectedly broad access?
- A) SELECT * FROM ACCOUNT_USAGE.ROLES WHERE OWNER = 'SYSADMIN'
- B) SELECT GRANTEE_NAME, COUNT(*) FROM ACCOUNT_USAGE.GRANTS_TO_ROLES GROUP BY 1 ORDER BY 2 DESC
- C) SELECT * FROM ACCOUNT_USAGE.GRANT_TO_USERS WHERE DELETED_ON IS NULL
- D) SELECT * FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE = 'GRANT'

---

## Q21 (Multi Answer - Select 2)
Which TWO Snowflake role types are pre-defined by Snowflake and cannot be dropped or renamed?
- A) ACCOUNTADMIN
- B) CUSTOM_ADMIN
- C) SECURITYADMIN
- D) DATAENGINEER
- E) ANALYST

---

## Q22 (Multi Answer - Select 2)
A Snowflake account must comply with a regulation requiring that programmatic API access use certificate-based authentication only — passwords are prohibited for all service users. Which steps are required to enforce this? (Select TWO)
- A) Create an authentication policy that sets AUTHENTICATION_METHODS = ('KEYPAIR') and assign it to service user accounts
- B) Set the DISABLE_USER_PASSWORDS_FOR_SERVICE_ACCOUNTS account parameter to TRUE
- C) Grant the DISABLE_PASSWORD privilege to service account roles
- D) Use ALTER USER ... SET PASSWORD = NULL for each service account after enabling key-pair authentication
- E) Create a network policy that blocks connections not using certificate authentication

---

## Q23 (Single Answer)
Which Snowflake feature allows administrators to define the maximum number of idle minutes before a session is automatically closed?
- A) Authentication policy
- B) Resource monitor
- C) Session policy
- D) Network policy

---

## Q24 (Scenario)
A Security Engineer is reviewing a Snowflake environment and notices that the PUBLIC role has been granted SELECT on several sensitive tables. Why is this a security risk?
- A) The PUBLIC role is owned by SYSADMIN, so SYSADMIN can access data without auditing
- B) Every Snowflake user is automatically a member of the PUBLIC role, so all users can access those tables
- C) The PUBLIC role bypasses row-access policies
- D) Granting privileges to PUBLIC disables Dynamic Data Masking on the affected tables

---

## Q25 (Scenario)
A company wants to use Snowflake's SCIM API to provision users from Okta. After configuring the SCIM integration, user provisioning works but group-to-role mappings are not reflected in Snowflake. What is the most likely cause?
- A) SCIM only supports user provisioning; role mapping must be done via OAuth
- B) Snowflake maps Okta groups to Snowflake roles, but the role names in Okta do not match the Snowflake role names
- C) The SCIM integration token has expired and must be regenerated
- D) SCIM requires ACCOUNTADMIN to approve each role mapping before it takes effect

---

## Q26 (Single Answer)
Which Snowflake object type is used to represent a collection of IP addresses or hostnames that can be referenced in network policies and external access integrations?
- A) IP whitelist
- B) Network rule
- C) Security integration
- D) Access policy

---

## Q27 (Scenario)
A Security Engineer needs to allow Snowflake stored procedures to reach an internal API at api.internal.corp:8443 and block all other outbound traffic. Which is the CORRECT sequence of steps?
- A) Create a network policy with ALLOWED_IP_LIST containing api.internal.corp; apply it to the stored procedure
- B) Create a network rule with MODE = EGRESS and TYPE = HOST_PORT specifying api.internal.corp:8443; create an external access integration referencing it; reference the integration in the stored procedure
- C) Create an external function pointing to api.internal.corp:8443; no additional network configuration is needed
- D) Configure a PrivateLink endpoint to api.internal.corp; grant USAGE on the endpoint to the stored procedure

---

## Q28 (Single Answer)
What is the purpose of the RSA_PUBLIC_KEY_2 property on a Snowflake user?
- A) To enable a secondary MFA device for the user
- B) To support key rotation by allowing two active public keys simultaneously
- C) To store a backup key in case the primary key is lost
- D) To enable dual-authorization for sensitive operations

---

## Q29 (Scenario)
A Snowflake Security Engineer is designing role hierarchies for a healthcare organization. Data scientists need to query patient data with masking applied; compliance officers need to see raw data for auditing. Data engineers can write to staging tables but must not read masked or raw patient data. Which design BEST follows least-privilege principles?
- A) Create three roles: DATA_SCIENTIST (SELECT with masking policy), COMPLIANCE_OFFICER (SELECT with masking policy exempt), DATA_ENGINEER (INSERT/UPDATE on staging); do not nest them
- B) Create a single DATA_ACCESS role with all privileges and use row-access policies to filter per user
- C) Grant all privileges to SYSADMIN and have managers approve queries on behalf of users
- D) Use the PUBLIC role with conditional masking based on the current user's department attribute

---

## Q30 (Single Answer)
In Snowflake, which statement correctly describes database roles vs. account roles?
- A) Database roles are global to the account; account roles are scoped to a single database
- B) Database roles are scoped to a specific database and cannot own account-level objects; account roles are global
- C) Database roles can be granted to other databases; account roles cannot
- D) Database roles and account roles are identical; the names are interchangeable

---

## Q31 (Scenario)
A Security Engineer receives an alert that a service account's Snowflake password has been leaked in a public repository. The account uses password authentication. Which sequence of steps BEST mitigates the immediate risk?
- A) Disable the user account, rotate the password, re-enable the account, then investigate session history
- B) Drop the user account, recreate it with a new password, and reassign all grants
- C) Rotate the password only; the current sessions will expire automatically after 4 hours
- D) Apply a network policy restricting the user to the corporate IP range, then rotate the password

---

## Q32 (Single Answer)
Which Snowflake privilege allows a role to manage grants — that is, to grant and revoke privileges that the role itself holds — without needing ACCOUNTADMIN?
- A) GRANT OPTION (WITH GRANT OPTION clause on the original GRANT)
- B) MANAGE GRANTS
- C) OWNERSHIP
- D) SECURITYADMIN privilege

---

## Q33 (Scenario)
A compliance requirement mandates that no Snowflake user account may exist without MFA enabled, except for service accounts using key-pair authentication. A Security Engineer must audit compliance. Which ACCOUNT_USAGE view provides the information needed to identify users without MFA enabled?
- A) ACCOUNT_USAGE.LOGIN_HISTORY WHERE SECOND_AUTHENTICATION_FACTOR IS NULL
- B) ACCOUNT_USAGE.USERS WHERE HAS_MFA = FALSE
- C) ACCOUNT_USAGE.SESSIONS WHERE MFA_ENABLED = FALSE
- D) ACCOUNT_USAGE.AUTHENTICATION_POLICIES WHERE MFA_REQUIRED = FALSE

---

## Q34 (Single Answer)
Which Snowflake object type allows administrators to enforce password complexity requirements, minimum password age, maximum password age (expiration), and account lockout policies for Snowflake users?

- A) Session policy
- B) Password policy
- C) Authentication policy
- D) Network policy

---

## Q35 (Scenario)
A company has deployed Snowflake on Azure. They need to ensure that data between their Azure Data Factory pipelines and Snowflake never leaves the Azure backbone network. Which configuration achieves this?
- A) Use a Snowflake storage integration with Azure Blob storage inside the same region
- B) Configure Azure Private Link for Snowflake and route ADF pipelines through a private endpoint
- C) Enable the PREVENT_UNENCRYPTED_DATA_EXFILTRATION account parameter
- D) Use a Snowflake external network rule with TYPE = AZURE_PRIVATE_ENDPOINTS

---

## Q36 (Single Answer)
When a Snowflake user authenticates with an external browser (SSO), where is the session token stored by default?
- A) In a browser cookie on the client machine
- B) On the Snowflake server in the SESSIONS table
- C) In an encrypted file in the user's home directory
- D) Tokens are never stored; they are re-requested on every connection

---

## Q37 (Scenario)
An organization wants to grant a third-party auditor read-only access to Snowflake query history and access history for the past 90 days, without giving them access to any business data. Which BEST approach accomplishes this with least privilege?
- A) Grant the ACCOUNTADMIN role temporarily and revoke it after the audit
- B) Create a custom role, grant SELECT on SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY and SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY to it, and assign it to the auditor user
- C) Share the SNOWFLAKE database with the auditor's Snowflake account
- D) Create a secure view over ACCOUNT_USAGE views and share it via a Data Listing

---

## Q38 (Single Answer)
What is the maximum number of active RSA public keys a single Snowflake user can have at one time for key-pair authentication?
- A) 1
- B) 2
- C) 3
- D) Unlimited

---

## Q39 (Scenario)
A Security Engineer needs to configure Snowflake so that developers in the DEV environment cannot accidentally run DDL against the PROD schema. The DEV warehouse is a shared warehouse also used by production read workloads. Which control is MOST effective?
- A) Apply a network policy to the PROD schema blocking connections from the DEV warehouse IP
- B) Use role-based access control: deny DDL privileges on PROD schema to the developer role and enforce it via role assignment
- C) Use a session policy on the shared warehouse to prevent DDL execution
- D) Enable the PREVENT_DDL_IN_PROD account parameter on the PROD database

---

## Q40 (Single Answer)
Which Snowflake authentication policy property controls whether federated (SSO) authentication is permitted for users that the policy applies to?
- A) ALLOW_SSO
- B) SAML_ALLOWED
- C) AUTHENTICATION_METHODS
- D) FEDERATED_AUTHENTICATION

---

## Q41 (Scenario)
A Security Engineer is setting up Snowflake for a financial firm where every query must be associated with a trackable user identity. Shared service accounts are prohibited. Several ETL tools do not support Snowflake key-pair authentication. What is the recommended authentication approach for those ETL tools?
- A) Create one shared service account and track queries via QUERY_HISTORY tags
- B) Use OAuth client credentials flow with a unique client_id per ETL tool, mapping to individual Snowflake users
- C) Use PAT (Programmatic Access Token) authentication scoped per ETL tool with individual user accounts
- D) Use SAML federation and assign each ETL tool its own SAML assertion

---

## Q42 (Multi Answer - Select 2)
Which TWO Snowflake role types can own and manage security integrations?
- A) SYSADMIN
- B) SECURITYADMIN
- C) ACCOUNTADMIN
- D) PUBLIC
- E) USERADMIN

---

## Q43 (Single Answer)
What does the WITH GRANT OPTION clause do when granting a privilege in Snowflake?
- A) It grants the privilege with administrative override, bypassing ownership checks
- B) It allows the grantee to further grant the same privilege to other roles
- C) It creates a temporary grant that expires after 24 hours
- D) It records the grant in the audit log with elevated priority

---

## Q44 (Multi Answer - Select 2)
A Security Engineer reviews Snowflake audit logs and finds repeated failed login attempts for user BATCH_USER from multiple different IP addresses within 10 minutes. This pattern suggests a credential-stuffing attack. What are the BEST immediate mitigation steps? (Select TWO)
- A) Apply a restrictive network policy to BATCH_USER allowing only the known service IP
- B) Disable BATCH_USER temporarily using ALTER USER BATCH_USER SET DISABLED = TRUE
- C) Drop BATCH_USER and recreate with a new credential
- D) Rotate the BATCH_USER password and force re-authentication
- E) Enable Trust Center's leaked credentials scanner for the entire account

---

## Q45 (Single Answer)
Which Snowflake object governs where network connections can originate FROM (ingress) or go TO (egress) in the context of stored procedures and UDFs?
- A) Network policy
- B) Security integration
- C) Network rule
- D) External access integration

---

## Q46 (Scenario)
A company requires all Snowflake sessions to time out after 30 minutes of inactivity. They also want query execution to be cancelled if it exceeds 2 hours. Which Snowflake objects should be configured to meet both requirements?
- A) A session policy with SESSION_IDLE_TIMEOUT_MINS = 30 and a resource monitor with STATEMENT_TIMEOUT_IN_SECONDS
- B) A session policy with SESSION_IDLE_TIMEOUT_MINS = 30 and a warehouse-level STATEMENT_TIMEOUT_IN_SECONDS parameter
- C) An authentication policy with LOGIN_TIMEOUT_MINS = 30 and a task to kill long queries
- D) A session policy for idle timeout and a query tag to track long-running queries

---

## Q47 (Single Answer)
What is the function of Snowflake SCIM's GROUP provisioning capability?
- A) It provisions Snowflake warehouses for each IdP group
- B) It maps IdP groups to Snowflake roles, synchronizing group membership automatically
- C) It creates Snowflake schemas named after each IdP group
- D) It assigns row-access policies based on IdP group membership

---

## Q48 (Scenario)
A Security Engineer must grant a database role DB_ANALYST_ROLE to a data share so that consumers of the share can use the role to access shared objects. Which SQL statement achieves this?
- A) GRANT ROLE DB_ANALYST_ROLE TO SHARE my_share;
- B) GRANT DATABASE ROLE mydb.DB_ANALYST_ROLE TO SHARE my_share;
- C) ALTER SHARE my_share ADD ROLE DB_ANALYST_ROLE;
- D) GRANT USAGE ON DATABASE ROLE DB_ANALYST_ROLE TO SHARE my_share;

---

## Q49 (Single Answer)
Which Snowflake account parameter, when set to TRUE, prevents users from downloading query result sets to their local machines?
- A) PREVENT_QUERY_RESULT_DOWNLOAD
- B) RESTRICT_RESULT_DOWNLOAD
- C) ALLOW_CLIENT_MFA_CACHING (not related)
- D) PREVENT_UNLOAD_TO_INTERNAL_STAGES

---

## Q50 (Scenario)
An application uses a Snowflake OAuth integration. The application's client secret is suspected to have been exposed. Which step should the Security Engineer take to invalidate all existing tokens issued under the integration WITHOUT deleting the integration?
- A) Run SYSTEM$REVOKE_TOKENS('integration_name') to revoke all tokens for the integration
- B) Alter the integration to regenerate the client secret using ALTER SECURITY INTEGRATION ... ROTATE_CLIENT_SECRET
- C) Drop and recreate the OAuth security integration with a new client secret
- D) Disable the integration with ALTER SECURITY INTEGRATION ... SET ENABLED = FALSE

---

## Q51 (Single Answer)
In Snowflake RBAC, what is the effect of granting OWNERSHIP of a table to a new role?
- A) The new role gets SELECT and INSERT privileges; the old owner retains all other privileges
- B) The new role becomes the sole owner; the previous owner loses OWNERSHIP but retains any explicitly granted privileges
- C) Ownership cannot be transferred; it must be set at object creation time
- D) The new role gets all privileges; the previous owner loses all access to the object

---

## Q52 (Scenario)
A company is deploying Snowflake across three cloud regions (AWS us-east-1, Azure East US, GCP us-central1). The security policy requires that authentication policies and network policies replicate to all regions so that access controls are consistent after failover. Which Snowflake feature handles this?
- A) Cross-region data sharing with security policies included
- B) Business continuity replication groups that include security integrations
- C) Replication groups configured with OBJECT_TYPES that include NETWORK POLICIES and AUTHENTICATION POLICIES
- D) Tri-Secret Secure key replication across cloud providers

---

## Q53 (Single Answer)
Which Snowflake role is the recommended role for day-to-day user and role management tasks, per Snowflake best practices?
- A) ACCOUNTADMIN
- B) SYSADMIN
- C) SECURITYADMIN
- D) USERADMIN

---

## Q54 (Scenario)
A Security Engineer needs to audit all privilege grants made in the past 30 days to detect any unauthorized role escalation. Which query is MOST effective?
- A) SELECT * FROM ACCOUNT_USAGE.QUERY_HISTORY WHERE QUERY_TYPE = 'GRANT' AND START_TIME > DATEADD(day, -30, CURRENT_TIMESTAMP())
- B) SELECT * FROM ACCOUNT_USAGE.GRANTS_TO_ROLES WHERE GRANTED_ON_DATE > DATEADD(day, -30, CURRENT_TIMESTAMP())
- C) SELECT * FROM ACCOUNT_USAGE.ACCESS_HISTORY WHERE QUERY_START_TIME > DATEADD(day, -30, CURRENT_TIMESTAMP())
- D) SELECT * FROM INFORMATION_SCHEMA.ROLE_GRANTS WHERE GRANT_TIME > DATEADD(day, -30, CURRENT_TIMESTAMP())

---

## Q55 (Single Answer)
What is the difference between a Snowflake NETWORK POLICY and a NETWORK RULE?
- A) Network policies define user-level firewall rules; network rules define account-level firewall rules
- B) Network policies block/allow IP ranges for account and user access; network rules define sets of IPs or hostnames used by policies and integrations
- C) Network rules apply to warehouse-level access; network policies apply to schema-level access
- D) Network policies are deprecated; network rules replace them entirely

---

## Q56 (Scenario)
A developer requests elevated privileges for a PROD database object needed for an urgent deployment. The organization's policy requires dual authorization for any PROD privilege grant. Which Snowflake feature supports a dual-authorization workflow for sensitive DDL/grants?
- A) Approval workflow in Snowsight
- B) Multi-party authorization for certain DDL statements on Business Critical edition
- C) Require a SECURITYADMIN co-signer via the GRANT statement WITH DUAL_AUTH option
- D) Tri-Secret Secure key approval for PROD grants

---

## Q57 (Single Answer)
Which Snowflake view shows the current active network policies for each user and at the account level?
- A) ACCOUNT_USAGE.NETWORK_POLICIES
- B) ACCOUNT_USAGE.POLICY_REFERENCES
- C) INFORMATION_SCHEMA.NETWORK_POLICIES
- D) ACCOUNT_USAGE.NETWORK_RULE_REFERENCES

---

## Q58 (Scenario)
A Security Engineer is implementing a least-privilege RBAC structure. They create a functional role FINANCE_ANALYST and an access role DB_FINANCE_READ with SELECT grants on FINANCE_DB. They want FINANCE_ANALYST to inherit DB_FINANCE_READ's privileges. Which SQL accomplishes this?
- A) GRANT ROLE DB_FINANCE_READ TO ROLE FINANCE_ANALYST;
- B) GRANT ROLE FINANCE_ANALYST TO ROLE DB_FINANCE_READ;
- C) ALTER ROLE FINANCE_ANALYST SET PARENT = DB_FINANCE_READ;
- D) GRANT INHERIT ON ROLE DB_FINANCE_READ TO ROLE FINANCE_ANALYST;

---

## Q59 (Single Answer)
Which Snowflake feature, available on Business Critical and higher editions, encrypts all data at rest using a hierarchy that includes a customer-managed key, enabling Snowflake to refuse decryption if the customer revokes the key?
- A) Client-side encryption
- B) Tri-Secret Secure
- C) External Tokenization
- D) Dynamic Data Masking with encryption functions

---

## Q60 (Multi Answer - Select 2)
A Security Engineer wants to prevent all Snowflake users from connecting from personal devices while allowing connections from managed corporate devices identified by specific IP ranges (10.0.0.0/8). Which steps are required? (Select TWO)
- A) Create a network policy with ALLOWED_IP_LIST = ['10.0.0.0/8'] and apply it at the account level
- B) Create a network rule with ALLOWED_NETWORK_RULE_LIST = ['10.0.0.0/8'] and apply it to all users
- C) Set BLOCKED_IP_LIST = ['0.0.0.0/0'] in the network policy to block all other IPs
- D) Create a network policy with ALLOWED_IP_LIST = ['10.0.0.0/8'] and BLOCKED_IP_LIST for unwanted ranges, then apply at account level
- E) Use a session policy to detect and terminate sessions from non-corporate IPs

---

## Q61 (Single Answer)
A Snowflake user authenticates using federated SSO. What happens to the Snowflake session if the user's IdP session is terminated (for example, the user logs out of Okta)?
- A) The Snowflake session is immediately terminated as well
- B) The Snowflake session continues until it naturally expires or is manually terminated
- C) The Snowflake session is suspended and resumes automatically when the user re-authenticates with the IdP
- D) All future queries in the session are rejected, but the session itself remains open

---

## Q62 (Scenario)
A company needs to grant external auditors access to Snowflake so they can run read-only queries against the AUDIT_SCHEMA but NOT see the CUSTOMERS or TRANSACTIONS schemas. Which is the BEST least-privilege approach?
- A) Grant USAGE on the database and SELECT on AUDIT_SCHEMA to an auditor role; do not grant access to other schemas
- B) Grant the SECURITYADMIN role to auditors with a network policy restricting their access to AUDIT_SCHEMA
- C) Use row-access policies on CUSTOMERS and TRANSACTIONS to deny access based on the current role
- D) Create a secure view merging all schemas and grant SELECT only on the view

---

## Q63 (Single Answer)
In Snowflake, which statement about FUTURE GRANTS is correct?
- A) FUTURE GRANTS apply retroactively to all existing objects in a schema
- B) FUTURE GRANTS automatically grant privileges on new objects created in a schema or database to a specified role
- C) FUTURE GRANTS require ACCOUNTADMIN to approve before taking effect
- D) FUTURE GRANTS only work for TABLE objects; views require explicit grants

---

## Q64 (Scenario)
A Security Engineer audits a Snowflake account and finds that several users have been granted the ACCOUNTADMIN role directly. The organization's policy requires ACCOUNTADMIN to be used only for break-glass scenarios and not assigned to regular users. Which action should be taken?
- A) Revoke ACCOUNTADMIN from all regular users and create appropriately scoped custom roles for their tasks
- B) Create an authentication policy on ACCOUNTADMIN to require MFA before the role can be activated
- C) Apply a network policy to users with ACCOUNTADMIN restricting their IP ranges
- D) Move all ACCOUNTADMIN users into a dedicated warehouse with resource monitors

---

## Q65 (Single Answer)
Which Snowflake system function can a Security Engineer use to immediately revoke all OAuth tokens associated with a specific user?
- A) SYSTEM$DISABLE_USER_OAUTH('username')
- B) SYSTEM$REVOKE_USER_OAUTH_TOKENS('username')
- C) SYSTEM$REVOKE_TOKENS('username')
- D) ALTER USER username REVOKE ALL OAUTH TOKENS

---

## Q66 (Scenario)
An organization uses GCP as their cloud provider. They require that Snowflake traffic from their GCP project to Snowflake stays within the Google network. Which GCP-specific Snowflake feature should be configured?
- A) GCP VPN Gateway connected to Snowflake's private IP range
- B) GCP Private Service Connect for Snowflake
- C) GCP Shared VPC peering with Snowflake's network
- D) GCP Cloud Interconnect to Snowflake's data center

---

## Q67 (Single Answer)
Which Snowflake object defines the idle session timeout, the maximum session length, and whether MUI (multi-user interface) sessions are permitted?
- A) Authentication policy
- B) Password policy
- C) Session policy
- D) Resource monitor

---

## Q68 (Multi Answer - Select 2)
A Security Engineer must configure Snowflake so that a Python UDF can call an external REST API for real-time data enrichment. The API is accessible at https://api.example.com and requires a bearer token stored as a Snowflake secret. Which objects must be created? (Select TWO)
- A) A network rule with TYPE = HOST_PORT and VALUE_LIST = ['api.example.com:443']
- B) A network policy with ALLOWED_IP_LIST containing api.example.com
- C) An external access integration referencing the network rule and the secret
- D) A storage integration pointing to api.example.com
- E) A security integration of type OAUTH pointing to api.example.com

---

## Q69 (Single Answer)
What is the recommended Snowflake best practice for the ACCOUNTADMIN role?
- A) Assign ACCOUNTADMIN to all senior DBAs for unrestricted operational access
- B) Use ACCOUNTADMIN for all day-to-day operations to ensure maximum privilege
- C) Reserve ACCOUNTADMIN for initial setup, billing, and emergency operations; use scoped roles for all other tasks
- D) Grant ACCOUNTADMIN to a service account so automated pipelines can manage account settings

---

## Q70 (Multi Answer - Select 2)
A Security Engineer needs to verify that after a failover, the target account has the correct roles, grants, and network policies. Which Snowflake queries should be run post-failover? (Select TWO)
- A) SELECT * FROM ACCOUNT_USAGE.GRANTS_TO_ROLES to verify privilege grants are intact
- B) SELECT * FROM ACCOUNT_USAGE.NETWORK_POLICIES to verify network policies are active
- C) SHOW REPLICATION GROUPS to check replication status
- D) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY to verify logins post-failover
- E) SHOW ROLES and SHOW GRANTS TO ROLE <role_name> to verify role hierarchy and grants

---

## Q71 (Single Answer)
Which Snowflake feature allows applications to authenticate on behalf of users using delegated authorization, where users grant the application access without sharing their credentials?
- A) Key-pair authentication
- B) SCIM provisioning
- C) OAuth
- D) SAML2 federation

---

## Q72 (Scenario)
A financial firm requires that all Snowflake users complete MFA enrollment before accessing any data. A new user has been created but not yet enrolled in MFA. Which Snowflake mechanism can enforce that the user cannot access data until MFA is enrolled?
- A) An authentication policy requiring MFA that is assigned to the user
- B) A network policy blocking the user's IP until MFA is configured
- C) A row-access policy denying all rows to users without MFA enabled
- D) The ENFORCE_MFA account parameter automatically blocks unenrolled users

---

## Q73 (Single Answer)
What does the BLOCKED_IP_LIST in a Snowflake network policy do?
- A) It blocks specific IPs even if they appear in the ALLOWED_IP_LIST
- B) It creates an explicit deny list for IPs not in the ALLOWED_IP_LIST
- C) It blocks all IPs except those in the BLOCKED_IP_LIST
- D) BLOCKED_IP_LIST is deprecated and has no effect

---

## Q74 (Scenario)
An organization's Snowflake account needs to allow certain privileged users to administer warehouse settings but not create users, roles, or databases. Which system-defined role BEST aligns with this requirement?
- A) SECURITYADMIN
- B) SYSADMIN
- C) USERADMIN
- D) PUBLIC

---

## Q75 (Single Answer)
In the context of Snowflake Native Apps and RBAC, what is an application role?
- A) A role that allows the app provider to access the consumer's Snowflake account
- B) A role defined within a Native App package that consumers can grant to their own roles to access app functionality
- C) A role automatically created for each app installation with ACCOUNTADMIN privileges
- D) A role that grants the Native App SYSADMIN-level access to the consumer account

---

## Q76 (Scenario)
A Security Engineer is configuring OAuth in Snowflake for an internal BI tool. The BI tool needs to query Snowflake on behalf of individual business users. After the user authorizes the BI tool, the tool should be able to refresh its access without requiring the user to re-authenticate for 8 hours. Which OAuth flow is appropriate?
- A) Client credentials flow (no user involvement)
- B) Authorization code flow with a refresh token valid for 8 hours
- C) Implicit flow with a long-lived access token
- D) PKCE flow without a client secret

---

## Q77 (Single Answer)
Which ACCOUNT_USAGE view contains information about the authentication events of all users, including whether they used MFA, the source IP address, and whether the login succeeded?
- A) ACCOUNT_USAGE.SESSIONS
- B) ACCOUNT_USAGE.USERS
- C) ACCOUNT_USAGE.LOGIN_HISTORY
- D) ACCOUNT_USAGE.QUERY_HISTORY

---

## Q78 (Scenario)
A company has a regulatory requirement that all Snowflake users with SECURITYADMIN must use hardware-based MFA (FIDO2/passkey). Standard TOTP MFA is not sufficient. Which Snowflake feature supports passkey/FIDO2 authentication?
- A) Snowflake supports passkeys via authenticator policies set to FIDO2_ONLY
- B) Snowflake supports passkeys natively; users can register a FIDO2 device via their profile settings
- C) FIDO2 is not supported; hardware tokens must be managed externally via an IdP
- D) Passkeys require Snowflake Business Critical edition with a special contract add-on

---

## Q79 (Single Answer)
Which SQL command is used to create a Snowflake Secret object that stores a generic string value (for example, an API key)?
- A) CREATE SECRET my_api_key TYPE = GENERIC_STRING SECRET_STRING = '...'
- B) CREATE CREDENTIAL my_api_key TYPE = API_KEY VALUE = '...'
- C) CREATE VAULT_ENTRY my_api_key SECRET_TYPE = STRING VALUE = '...'
- D) INSERT INTO SNOWFLAKE.SECRETS VALUES ('my_api_key', '...')

---

## Q80 (Scenario)
A Security Engineer is asked to implement a Snowflake role that can create and manage all objects within a single database (DB_ANALYTICS) but has no privileges outside that database. Which approach BEST achieves this with minimal risk?
- A) Grant the SYSADMIN role and limit it to DB_ANALYTICS using a session policy
- B) Create a custom role, grant OWNERSHIP on DB_ANALYTICS to it, and grant that role to the required users
- C) Create a custom role, grant CREATE TABLE/VIEW/PROCEDURE on DB_ANALYTICS.PUBLIC, and grant USAGE on the database and schemas needed
- D) Grant the DBADMIN role (a built-in role) scoped to DB_ANALYTICS

---

## Q81 (Single Answer)
What is a Snowflake Programmatic Access Token (PAT) and how does it differ from OAuth tokens?
- A) A PAT is a long-lived token scoped to a user, generated by the user, requiring no OAuth flow; OAuth tokens are short-lived and require an authorization grant
- B) A PAT is an OAuth refresh token stored in Snowflake metadata
- C) A PAT is identical to an OAuth access token but with a longer expiry
- D) PATs are only available for service accounts; regular users must use OAuth

---

## Q82 (Scenario)
A company's Snowflake environment has a mix of JDBC, ODBC, Python, and web UI (Snowsight) clients. The security team wants to enforce key-pair authentication for all JDBC/ODBC/Python connections while allowing Snowsight users to use SSO. How can this be achieved in Snowflake?
- A) Create one authentication policy for JDBC/ODBC/Python users requiring KEYPAIR, and another for Snowsight users allowing SAML2; assign the appropriate policy per user
- B) Set the account-level authentication method to KEYPAIR; Snowsight automatically uses SSO regardless
- C) Use a session policy to route JDBC connections to key-pair authentication
- D) Configure the Snowflake driver to enforce key-pair and the Snowsight application to enforce SAML2 independently

---

## Q83 (Single Answer)
Which Snowflake privilege allows a role to see all objects in a database or schema, even without being explicitly granted access to each object?
- A) MONITOR
- B) IMPORTED PRIVILEGES
- C) APPLY MASKING POLICY
- D) IMPORTED PRIVILEGES on the SNOWFLAKE database

---

## Q84 (Scenario)
A Security Engineer at a multinational corporation needs to ensure that Snowflake administrators in the EU region cannot access US-region customer data. The data is stored in separate Snowflake accounts. Which Snowflake capability enforces this data boundary?
- A) Apply network policies to EU accounts blocking cross-region IPs
- B) Use Snowflake's account isolation model — separate accounts natively isolate data; ensure EU admins are not granted roles in the US account
- C) Use cross-account data sharing with row-access policies filtered by region
- D) Configure Tri-Secret Secure with separate key management regions

---

## Q85 (Single Answer)
Which Snowflake account edition is the minimum required to enable private connectivity (PrivateLink/Private Service Connect)?
- A) Standard
- B) Enterprise
- C) Business Critical
- D) Virtual Private Snowflake (VPS)

---

## Q86 (Scenario)
An organization requires separation of duties: the role that creates warehouse objects must be different from the role that grants privileges on those objects. Currently, SYSADMIN both creates and grants. How should the role hierarchy be restructured?
- A) Keep SYSADMIN for creation and grant MANAGE GRANTS to SECURITYADMIN for all privilege grants
- B) Create a WAREHOUSE_ADMIN custom role for creating warehouses; grant privilege management to SECURITYADMIN; neither role should be parent of the other
- C) Use SYSADMIN for warehouses and SECURITYADMIN for grants, which is the default recommended Snowflake separation
- D) Use ACCOUNTADMIN for all warehouse operations and SYSADMIN for all grants to enforce separation

---

## Q87 (Single Answer)
What is the Snowflake USERADMIN role primarily responsible for?
- A) Creating and managing databases and schemas
- B) Creating and managing users and roles (but not granting privileges on data objects)
- C) Managing billing and account-level settings
- D) Creating and managing virtual warehouses

---

## Q88 (Scenario)
A user with the ANALYST role runs a query that fails because the role lacks USAGE on the schema. The Security Engineer grants USAGE on the schema to ANALYST. Shortly after, the same user reports that queries still fail. What is the most likely reason?
- A) The USAGE privilege has a propagation delay of up to 15 minutes in Snowflake
- B) The user must start a new session or re-use the role for the new grant to take effect
- C) USAGE on the schema is insufficient; SELECT must also be granted on each table
- D) The user must have SYSADMIN activate the USAGE grant before it is effective

---

## Q89 (Single Answer)
Which Snowflake view lists all current and historical policy assignments (such as network policies, masking policies, and row-access policies) applied to Snowflake objects?
- A) ACCOUNT_USAGE.POLICY_REFERENCES
- B) ACCOUNT_USAGE.GRANTS_TO_ROLES
- C) INFORMATION_SCHEMA.POLICY_ASSIGNMENTS
- D) ACCOUNT_USAGE.SECURITY_INTEGRATIONS

---

## Q90 (Scenario)
A Security Engineer needs to ensure that if the Snowflake ACCOUNTADMIN credentials are compromised, an attacker cannot disable security integrations, drop masking policies, or alter network policies. Which Snowflake feature on Business Critical edition can enforce a secondary approval for such sensitive operations?
- A) Tri-Secret Secure requires customer key approval for administrative DDL
- B) Multi-party (dual) authorization for sensitive account-level operations
- C) A session policy requiring ACCOUNTADMIN to confirm destructive operations
- D) Trust Center alerts that detect and block unauthorized DDL in real time

---

## Q91 (Single Answer)
In Snowflake, what is the effect of the REVOKE ALL PRIVILEGES ON TABLE statement?
- A) It revokes all privileges from all roles including the owner
- B) It revokes all explicitly granted privileges on the table from all grantees, but OWNERSHIP is not revoked
- C) It removes the table from the schema and deletes all data
- D) REVOKE ALL PRIVILEGES is not a valid SQL statement in Snowflake

---

## Q92 (Scenario)
A Security Engineer is configuring a Snowflake deployment for a heavily regulated industry. All database objects must be owned by dedicated admin roles (not SYSADMIN). SYSADMIN currently owns most objects. What is the correct procedure to transfer ownership?
- A) Run ALTER TABLE ... TRANSFER OWNERSHIP TO <new_role> for each object
- B) Use GRANT OWNERSHIP ON ALL TABLES IN SCHEMA ... TO ROLE <new_role> REVOKE CURRENT GRANTS
- C) Use GRANT OWNERSHIP ON ALL TABLES IN SCHEMA ... TO ROLE <new_role> COPY CURRENT GRANTS
- D) Recreate all objects under the new owner role; ownership cannot be transferred without data loss

---

## Q93 (Single Answer)
What does the Snowflake SESSION_POLICY object's SESSIONS_UI_IDLE_TIMEOUT_MINS parameter control?
- A) Maximum time a Snowflake warehouse can be idle before auto-suspend
- B) Maximum idle time for browser-based (Snowsight) sessions before automatic logout
- C) Maximum idle time for all session types including JDBC and Python
- D) Time after which MFA tokens are invalidated

---

## Q94 (Scenario)
A Security Engineer needs to allow a Python stored procedure to securely access a third-party SaaS API. The API requires an API key stored as a Snowflake secret. The stored procedure should only be able to reach api.saas-vendor.com and no other host. What configuration is needed?
- A) Create a network policy allowing api.saas-vendor.com and apply it to the warehouse running the procedure
- B) Create a network rule (TYPE = HOST_PORT, VALUE_LIST = ['api.saas-vendor.com:443']), an external access integration referencing the rule and the secret, and reference the integration in the stored procedure definition
- C) Create a storage integration pointing to api.saas-vendor.com and reference it in the procedure
- D) Configure a PrivateLink connection to api.saas-vendor.com and grant USAGE on the connection to the stored procedure

---

## Q95 (Single Answer)
Which Snowflake SQL command removes a network policy from a specific user?
- A) DROP NETWORK POLICY FROM USER <username>
- B) ALTER USER <username> UNSET NETWORK_POLICY
- C) REVOKE NETWORK POLICY FROM USER <username>
- D) ALTER USER <username> SET NETWORK_POLICY = NULL

---

## Q96 (Scenario)
An organization is conducting a SOC 2 audit. The auditor requests evidence that all Snowflake login attempts (successful and failed) are logged and retained for at least 1 year. Which Snowflake feature meets this requirement, and what is the default retention period?
- A) ACCOUNT_USAGE.LOGIN_HISTORY retains login events for 365 days by default
- B) ACCOUNT_USAGE.SESSIONS retains session data for 90 days; a custom ETL pipeline must extend retention
- C) Snowflake Trail retains events for 30 days; a notification integration must export events to external SIEM
- D) LOGIN_HISTORY is available in INFORMATION_SCHEMA only, with no guaranteed retention

---

## Q97 (Single Answer)
In Snowflake, which built-in database role on the SNOWFLAKE database grants access to ACCOUNT_USAGE views for security and monitoring purposes?
- A) SNOWFLAKE.GOVERNANCE_VIEWER
- B) SNOWFLAKE.ACCOUNT_USAGE_VIEWER
- C) SNOWFLAKE.SECURITY_ADMIN
- D) SNOWFLAKE.MONITOR

---

## Q98 (Scenario)
A Security Engineer needs to implement a federated authentication setup where all Snowflake users are authenticated by Azure Active Directory using SAML2. Internal Snowflake-managed passwords should still be allowed as a fallback for service accounts. Which configuration achieves this?
- A) Set SAML2_ENABLE_SP_INITIATED = TRUE in the SAML2 security integration; all users will use SAML but service accounts can still authenticate with passwords unless explicitly restricted
- B) Create a SAML2 security integration and use authentication policies to enforce SAML for users and allow PASSWORD for service accounts
- C) Set the account-level parameter SSO_LOGIN_PAGE = TRUE; Snowflake will automatically route all users to SAML and service accounts to password authentication
- D) Configure multiple SAML2 integrations, one for each user type, and set the default integration per user via ALTER USER

---

## Q99 (Single Answer)
When a role is granted TO SHARE in Snowflake, what type of role must it be?
- A) An account role with ACCOUNTADMIN as parent
- B) A database role (scoped to the shared database)
- C) A share role with type = INBOUND
- D) Any account role with SELECT on the shared objects

---

## Q100 (Scenario)
A Security Engineer receives a request to allow a vendor's IP (198.51.100.50) to connect to Snowflake for a short-term data transfer project. The account-level network policy currently only allows the corporate IP range. Which approach minimizes risk while fulfilling the request?
- A) Temporarily modify the account-level network policy to add 198.51.100.50 to ALLOWED_IP_LIST
- B) Create a user-level network policy for the vendor's dedicated Snowflake user that allows 198.51.100.50; the user-level policy overrides the account-level policy for that user
- C) Create a temporary Snowflake trial account for the vendor and share data via Snowflake Data Sharing
- D) Disable the account-level network policy for the duration of the project

---

## Q101 (Single Answer)
Which Snowflake privilege is required on a SCHEMA for a role to be able to CREATE TABLE within that schema?
- A) USAGE
- B) MODIFY
- C) CREATE TABLE
- D) OWNERSHIP

---

## Q102 (Scenario)
A Security Engineer is auditing Snowflake role assignments and discovers a role has been granted directly to a user rather than being assigned via a parent role in the hierarchy. The organization requires all privilege assignments to flow through role hierarchies. What action should be taken?
- A) Leave the direct assignment but document it as an exception in the audit report
- B) Revoke the direct role grant from the user and grant the role to an appropriate parent role in the hierarchy
- C) Create a shadow role that mirrors the direct assignment and add it to the hierarchy
- D) Use a session policy to prevent the user from activating the directly-granted role

---

## Q103 (Single Answer)
What Snowflake privilege allows a role to create child roles within a role hierarchy?
- A) CREATE ROLE
- B) MANAGE GRANTS
- C) OWNERSHIP ON ROLE
- D) CREATE CHILD ROLE

---

## Q104 (Scenario)
A multi-tenant SaaS application runs on Snowflake. Each customer's data is in a separate schema. The application must query any customer's schema using a single Snowflake user. Customer A must never see Customer B's data. Which access control design BEST enforces tenant isolation?
- A) Use row-access policies on all tables referencing the session user to filter rows by tenant
- B) Create per-tenant access roles with SELECT only on the relevant schema; the application switches roles per request using USE ROLE
- C) Use Dynamic Data Masking to null out other tenants' data for each user
- D) Grant SELECT on all schemas to a single application role and rely on application-layer filtering

---

## Q105 (Single Answer)
Which Snowflake type of integration is used specifically to enable Snowflake to authenticate with an external identity provider for federated SSO?
- A) Storage integration
- B) SAML2 security integration
- C) External access integration
- D) OAuth security integration

---

## Q106 (Multi Answer - Select 2)
A Security Engineer notices that a Snowflake user JOHN_DOE has been granted ACCOUNTADMIN in the past 30 days and this was not authorized. The engineer needs to revoke this immediately and audit what JOHN_DOE did with the role. Which steps should be taken? (Select TWO)
- A) REVOKE ROLE ACCOUNTADMIN FROM USER JOHN_DOE
- B) ALTER USER JOHN_DOE SET DISABLED = TRUE to prevent further access while investigating
- C) DROP ROLE ACCOUNTADMIN to immediately eliminate the risk
- D) Query ACCOUNT_USAGE.QUERY_HISTORY WHERE ROLE_NAME = 'ACCOUNTADMIN' AND USER_NAME = 'JOHN_DOE' to audit actions taken
- E) Query ACCOUNT_USAGE.GRANTS_TO_ROLES to find all grants made by JOHN_DOE

---

## Q107 (Single Answer)
In Snowflake, what is the purpose of ALLOW_CLIENT_MFA_CACHING?
- A) It caches MFA tokens on the Snowflake server to reduce authentication calls
- B) It allows MFA tokens to be cached on the client machine, reducing the frequency of MFA prompts during repeated connections from the same client
- C) It enables MFA bypass for cached IP addresses in the network policy
- D) It allows the Snowflake JDBC driver to cache credentials in memory

---

## Q108 (Multi Answer - Select 2)
An organization uses Snowflake for a production workload. The SYSADMIN role accidentally granted DROP TABLE to the DATA_ANALYST role. The Data Analyst drops a critical production table. Which Snowflake features can be used to recover the table AND prevent this from happening again? (Select TWO)
- A) Use Time Travel (CREATE TABLE ... CLONE AT BEFORE STATEMENT) to restore the dropped table
- B) Use Fail-safe to recover the table from the 7-day fail-safe period
- C) Revoke DROP TABLE from DATA_ANALYST and implement a change management process for PROD grants
- D) Restore from a Snowflake managed backup using RESTORE TABLE command
- E) Use UNDROP TABLE if it is within the Time Travel retention period

---

## Q109 (Single Answer)
What is the minimum Snowflake edition required to use authentication policies?
- A) Standard
- B) Enterprise
- C) Business Critical
- D) Authentication policies are available on all editions

---

## Q110 (Scenario)
A Security Engineer must implement network security for a Snowflake account where: (1) users in the corporate office (IP: 192.0.2.0/24) can connect normally; (2) the SYSADMIN service account can connect from AWS Lambda (IPs vary, but all within 52.94.0.0/15); (3) all other connections are blocked. Which approach achieves this with minimal objects?
- A) Create one account-level network policy with ALLOWED_IP_LIST = ['192.0.2.0/24', '52.94.0.0/15']
- B) Create an account-level network policy allowing 192.0.2.0/24 and a user-level policy on SYSADMIN allowing 52.94.0.0/15; the user-level policy takes precedence for SYSADMIN
- C) Create two separate network policies and use a network rule to merge them
- D) Create an account-level network policy allowing 192.0.2.0/24; SYSADMIN connects via PrivateLink from Lambda, bypassing the policy
