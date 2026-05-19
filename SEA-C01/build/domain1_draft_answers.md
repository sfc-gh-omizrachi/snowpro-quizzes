# Domain 1: Answers

---

## Q1
**Answer:** C
**Explanation:** SCIM (System for Cross-domain Identity Management) is the Snowflake feature specifically designed for automated user and group lifecycle management (provisioning, deprovisioning, and group sync) from identity providers like Azure AD. SAML2 handles authentication (who can log in), while SCIM handles provisioning (creating users and syncing group-to-role mappings). Key-pair auth and OAuth do not handle user provisioning at scale.
**Source:** [SCIM Provisioning Overview](https://docs.snowflake.com/en/user-guide/scim)
**Quote:** "Snowflake supports the SCIM 2.0 standard for provisioning user identities and groups (roles) from IdPs such as Okta and Azure AD."

---

## Q2
**Answer:** B
**Explanation:** The least-privilege model requires creating a dedicated custom role with only the necessary SELECT grants on specific tables, then assigning that role to users. Granting to PUBLIC would give all users access. Granting to SYSADMIN violates least-privilege. Creating a functional role with ACCOUNTADMIN as parent is an anti-pattern.
**Source:** [Access Control Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-overview)
**Quote:** "Snowflake recommends creating roles aligned with specific business functions and granting only the privileges needed for those functions."

---

## Q3
**Answer:** B
**Explanation:** SECURITYADMIN has the ability to create and manage roles and users (it holds the global MANAGE GRANTS privilege and inherits from USERADMIN), but per Snowflake best practices it should not be used for day-to-day operations. Instead, a custom role derived from USERADMIN should handle routine user and role management. SYSADMIN manages objects; USERADMIN is recommended for routine user/role tasks.
**Source:** [Snowflake System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "SECURITYADMIN: Role that encompasses the USERADMIN role privileges, plus the ability to manage any object grant globally... Use of this role should be minimized."

---

## Q4
**Answer:** A
**Explanation:** Authentication policies in Snowflake allow MFA to be enforced per user or per group of users. Service accounts connecting via JDBC drivers should use key-pair authentication (not MFA, which requires interactive push notifications). Authentication policies can specify different requirements for interactive vs. programmatic users. MFA cannot be enforced for all programmatic connections because drivers like JDBC do not support push-based MFA.
**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Authentication policies allow you to define which authentication methods are allowed for users... Service accounts typically use key pair authentication."

---

## Q5
**Answer:** B
**Explanation:** Key-pair authentication uses an RSA public/private key pair. The client stores the private key locally and presents it during authentication; Snowflake verifies it against the stored public key on the user account. No password is required. OAuth requires an authorization flow; external browser requires interactive browser login; PAT (Programmatic Access Token) is a long-lived token but is generated after an initial login.
**Source:** [Key Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)
**Quote:** "Key pair authentication is a preferred method for automated clients, as it does not require a password and supports rotation without disrupting connections."

---

## Q6
**Answer:** B
**Explanation:** Key-pair authentication with RSA_PUBLIC_KEY_2 is the optimal solution for rotation without changing pipeline configuration. Snowflake supports two active public keys per user (RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2). To rotate: upload the new public key as RSA_PUBLIC_KEY_2, update the pipeline to use the new private key, then clear the old RSA_PUBLIC_KEY. The pipeline configuration references the Snowflake account and user, not the key itself, so no config change is needed.
**Source:** [Key Pair Rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-rotation)
**Quote:** "You can rotate key pairs by assigning a new public key to the RSA_PUBLIC_KEY_2 property... This allows seamless rotation without connection interruption."

---

## Q7
**Answer:** B
**Explanation:** In Snowflake, when network policies are applied at both the account level and the user level, the user-level policy takes precedence for that specific user. This allows exceptions: the account policy can restrict most users while individual users can have more permissive or more restrictive policies applied to them.
**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "If a network policy is specified at both the account and user levels, the user-level policy takes precedence."

---

## Q8
**Answer:** B
**Explanation:** To allow Snowflake stored procedures to call a specific external REST API while blocking all other outbound traffic, use a network rule (specifying the allowed HOST_PORT) combined with an external access integration (referencing that rule). This provides precise, declarative control over outbound network access from Snowflake code. Network policies control ingress only; PrivateLink is for cloud provider private connectivity, not arbitrary REST APIs.
**Source:** [External Network Access](https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview)
**Quote:** "External access integrations control what external network locations a stored procedure or UDF can connect to, by specifying network rules that define allowed hosts and ports."

---

## Q9
**Answer:** B
**Explanation:** SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES contains a record of all privileges granted to roles, including the granted object, privilege type, grantor, and timestamps. This is the primary view for auditing role privileges. GRANTS_TO_USERS shows roles granted to users. There is no ROLE_GRANTS or PRIVILEGES_GRANTED view in Snowflake's ACCOUNT_USAGE schema.
**Source:** [GRANTS_TO_ROLES View](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "The GRANTS_TO_ROLES view displays all privileges that have been granted to roles in your Snowflake account."

---

## Q10
**Answer:** A
**Explanation:** The correct approach is: create one account-level network policy allowing only 203.0.113.0/24 (the corporate range), and create a separate user-level network policy for the SYSADMIN user that also includes the maintenance IP range. The user-level policy overrides the account-level policy for SYSADMIN, enabling maintenance access while corporate users are restricted to 203.0.113.0/24.
**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "You can assign a network policy to an individual user, which takes precedence over the account-level network policy for that user."

---

## Q11
**Answer:** B
**Explanation:** Snowflake SECRET objects securely store sensitive credentials such as OAuth tokens, passwords, generic strings (API keys), and cloud provider keys. Secrets are encrypted at rest and can be referenced in stored procedures, UDFs, and external access integrations without exposing the actual values in query history or function definitions. There is no native "Parameter" type for secrets, and "Vault integration" and "Stage credential" are not Snowflake object types for this purpose.
**Source:** [CREATE SECRET](https://docs.snowflake.com/en/sql-reference/sql/create-secret)
**Quote:** "A secret is a Snowflake object that stores sensitive information... Secrets are encrypted and protected by Snowflake's key hierarchy."

---

## Q12
**Answer:** B
**Explanation:** The most targeted remediation when an OAuth application has been granted excessive scopes is to revoke all existing tokens via SYSTEM$REVOKE_USER_OAUTH_AUTHORIZATIONS or, for all tokens of an integration, to revoke them programmatically. Dropping and recreating the integration would also work but causes disruption. Disabling the user would block the entire account. MFA cannot be applied to an OAuth integration. Revoking tokens immediately neutralizes the risk from the excessive scope grant.
**Source:** [Revoking OAuth Tokens](https://docs.snowflake.com/en/sql-reference/functions/system_revoke_user_oauth_authorizations)
**Quote:** "Use SYSTEM$REVOKE_USER_OAUTH_AUTHORIZATIONS to immediately invalidate all OAuth tokens for a user or integration."

---

## Q13
**Answer:** B
**Explanation:** In Snowflake's RBAC model, roles form a hierarchy. If ANALYST is granted the DATA_READER role (GRANT ROLE DATA_READER TO ROLE ANALYST), then ANALYST inherits all privileges that DATA_READER holds. A user with ANALYST as their active role can execute any query that DATA_READER can execute, including SELECT on TABLE_X. No explicit SYSADMIN intervention or additional grants are required.
**Source:** [Role Hierarchy and Privilege Inheritance](https://docs.snowflake.com/en/user-guide/security-access-control-overview#role-hierarchy-and-privilege-inheritance)
**Quote:** "When a role is granted to another role, the grantee role inherits all of the privileges of the role that was granted to it."

---

## Q14
**Answer:** C
**Explanation:** Authentication policies in Snowflake are the mechanism for enforcing specific authentication methods (key-pair only, MFA required, etc.) for specified users or groups. Network policies control IP-based access. Session policies control session timeouts. Password policies govern password complexity and rotation. Only authentication policies can mandate key-pair-only authentication.
**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Authentication policies can specify the authentication methods allowed for users, including PASSWORD, KEYPAIR, OAUTH, SAML2, and MFA."

---

## Q15
**Answer:** B
**Explanation:** ACCOUNT_USAGE.LOGIN_HISTORY records the authentication method used for each login event via the FIRST_AUTHENTICATION_FACTOR (e.g., PASSWORD, KEYPAIR, SAML, OAUTH) and SECOND_AUTHENTICATION_FACTOR (e.g., DUO for MFA) columns. This allows a Security Engineer to identify which users are still using password authentication vs. key-pair. ACCOUNT_USAGE.USERS shows user configuration (including whether RSA_PUBLIC_KEY is set) but not which method was most recently used.
**Source:** [LOGIN_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "FIRST_AUTHENTICATION_FACTOR: The method used for the first authentication factor (e.g., PASSWORD, KEYPAIR, SAML)."

---

## Q16
**Answer:** B
**Explanation:** AWS PrivateLink requires a VPC endpoint in the customer's AWS VPC that targets Snowflake's PrivateLink service. The VPC endpoint routes traffic over the AWS backbone without traversing the public internet. A VPN gateway is a different (and less direct) connectivity option. An Internet Gateway would route traffic publicly. An S3 gateway endpoint is for S3, not Snowflake.
**Source:** [AWS PrivateLink for Snowflake](https://docs.snowflake.com/en/user-guide/admin-security-privatelink)
**Quote:** "To use AWS PrivateLink with Snowflake, you create a VPC interface endpoint in your VPC that uses Snowflake's PrivateLink service name."

---

## Q17
**Answer:** C
**Explanation:** Creating a SCIM security integration in Snowflake requires the ACCOUNTADMIN role because SCIM integrations are account-level objects that require top-level administrative authority. After creation, the SCIM integration generates a bearer token that the IdP uses for API calls. SECURITYADMIN, SYSADMIN, and USERADMIN do not have the CREATE SECURITY INTEGRATION privilege required for SCIM.
**Source:** [SCIM Setup](https://docs.snowflake.com/en/user-guide/scim-setup)
**Quote:** "Use the ACCOUNTADMIN role to create the SCIM security integration."

---

## Q18
**Answer:** D
**Explanation:** The best combination uses an authentication policy to enforce acceptable login conditions (including time-based restrictions when supported) and a session policy to set the maximum session duration (SESSION_TIMEOUT_MINS = 240 minutes = 4 hours). Session policies handle session lifetime controls, while authentication policies handle authentication requirements. No native Snowflake feature restricts login hours directly via session or password policy.
**Source:** [Session Policies](https://docs.snowflake.com/en/user-guide/session-policies)
**Quote:** "Session policies define parameters that control the lifetime and behavior of user sessions, including idle timeout and maximum session length."

---

## Q19
**Answer:** C
**Explanation:** In Snowflake's access control model, USAGE privilege must be granted on both the database and the schema before any lower-level object privileges (like SELECT on a table) become effective. Without USAGE, a role cannot navigate to the database or schema level to access objects within them. MODIFY grants the ability to change properties; CREATE SCHEMA grants the ability to create schemas; OWNERSHIP is broader than needed.
**Source:** [Privilege Requirements](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)
**Quote:** "USAGE: Enables using a virtual warehouse, database, schema, or other object (does not grant access to the objects within the schema—additional privileges are required for those)."

---

## Q20
**Answer:** B
**Explanation:** Querying GRANTS_TO_ROLES and grouping by GRANTEE_NAME with a count of grants identifies roles that have accumulated the most privileges. A high grant count relative to a role's expected scope is a strong indicator of privilege creep. Sorting by count descending surfaces the most over-privileged roles immediately. The other options show roles owned by SYSADMIN, grants to users (not roles), or query history for GRANT statements—none of which directly quantify privilege breadth per role.
**Source:** [GRANTS_TO_ROLES View](https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_roles)
**Quote:** "GRANTS_TO_ROLES records all active and historical privilege grants to roles, enabling privilege auditing."

---

## Q21
**Answer:** A, C
**Explanation:** Snowflake pre-defines five system roles: ACCOUNTADMIN, SECURITYADMIN, SYSADMIN, USERADMIN, and PUBLIC. These are built into every Snowflake account and cannot be dropped, renamed, or modified. CUSTOM_ADMIN, DATAENGINEER, and ANALYST are not pre-defined system roles; they would need to be created manually. The five system roles form the foundation of Snowflake's access control hierarchy.
**Source:** [System-Defined Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)
**Quote:** "Snowflake provides a set of system-defined roles: ACCOUNTADMIN, SECURITYADMIN, SYSADMIN, USERADMIN, and PUBLIC. These roles cannot be dropped."

---

## Q22
**Answer:** A, D
**Explanation:** To enforce key-pair-only authentication for service accounts: (A) create an authentication policy with AUTHENTICATION_METHODS = ('KEYPAIR') and assign it to the service accounts—this prevents password-based login; and (D) set the password to NULL via ALTER USER ... SET PASSWORD = NULL to ensure no password is stored (even if the authentication policy is bypassed). Option B references a non-existent parameter. Option C references a non-existent privilege. Network policies (E) control IP access, not authentication method.
**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "To restrict a user to key pair authentication only, set AUTHENTICATION_METHODS = ('KEYPAIR') in an authentication policy and assign it to the user."

---

## Q23
**Answer:** C
**Explanation:** Session policies in Snowflake define parameters governing session behavior, including SESSION_IDLE_TIMEOUT_MINS (idle timeout in minutes). When applied to a user or account, the session policy automatically closes sessions that have been idle for longer than the configured threshold. Authentication policies govern how users log in. Resource monitors govern warehouse credit consumption. Network policies govern access by IP.
**Source:** [Session Policies](https://docs.snowflake.com/en/user-guide/session-policies)
**Quote:** "SESSION_IDLE_TIMEOUT_MINS: Specifies the number of minutes after which an idle session is closed automatically."

---

## Q24
**Answer:** B
**Explanation:** Every Snowflake user is automatically and irrevocably a member of the PUBLIC role. Granting SELECT on sensitive tables to PUBLIC effectively grants all current and future users access to those tables with no additional configuration needed. This is why PUBLIC should have minimal or no privileges on sensitive objects. PUBLIC does not bypass row-access policies, but the access itself is the security risk.
**Source:** [PUBLIC Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview#public-role)
**Quote:** "The PUBLIC role is automatically granted to every user and every role in your account. All users can switch to the PUBLIC role."

---

## Q25
**Answer:** B
**Explanation:** When using SCIM with Okta or Azure AD, Snowflake maps IdP groups to Snowflake roles. The mapping is name-based: the Okta group name must exactly match the Snowflake role name. If there is a case mismatch or spelling difference between the IdP group name and the Snowflake role name, the mapping will fail silently. SCIM does support role mapping. Tokens may also expire, but that would break user provisioning too, not just group mapping.
**Source:** [SCIM Group Mapping](https://docs.snowflake.com/en/user-guide/scim-okta)
**Quote:** "Snowflake maps IdP groups to Snowflake roles by matching the group name in the IdP to the role name in Snowflake. The names must match exactly."

---

## Q26
**Answer:** B
**Explanation:** Network rules are Snowflake objects that define collections of IP addresses, VPC endpoint IDs, or hostnames that can be referenced in network policies and external access integrations. They provide a reusable, named way to define network access lists. "IP whitelist" is not a Snowflake object type. "Security integration" is for identity provider configurations. "Access policy" is not a Snowflake network object.
**Source:** [Network Rules](https://docs.snowflake.com/en/user-guide/network-rules)
**Quote:** "A network rule is a Snowflake object that specifies a set of network identifiers (IP addresses, hostname/port combinations, or VPC endpoint IDs)."

---

## Q27
**Answer:** B
**Explanation:** To restrict outbound access from stored procedures to a specific host and port: (1) create a network rule with MODE = EGRESS and TYPE = HOST_PORT, specifying the target hostname and port; (2) create an external access integration that references the network rule; (3) reference the external access integration in the stored procedure definition. Network policies only control ingress. PrivateLink is for cloud provider private connectivity, not arbitrary TCP endpoints.
**Source:** [External Network Access](https://docs.snowflake.com/en/developer-guide/external-network-access/creating-using-external-network-access)
**Quote:** "Create a network rule with MODE = EGRESS and TYPE = HOST_PORT to specify which external hosts a stored procedure can connect to."

---

## Q28
**Answer:** B
**Explanation:** RSA_PUBLIC_KEY_2 is a secondary public key slot on a Snowflake user account that enables seamless key rotation. During rotation, the new public key is set in RSA_PUBLIC_KEY_2 while RSA_PUBLIC_KEY remains active; clients switch to the new private key; then RSA_PUBLIC_KEY is cleared. At no point is the user unable to authenticate, because both keys are valid simultaneously. This is not for MFA, backup keys, or dual-authorization.
**Source:** [Key Pair Rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-rotation)
**Quote:** "RSA_PUBLIC_KEY_2 allows you to rotate key pairs without connection disruption by having both the old and new public keys active simultaneously."

---

## Q29
**Answer:** A
**Explanation:** The least-privilege approach creates three separate roles with distinct privilege sets: DATA_SCIENTIST gets SELECT with masking applied (they cannot override masking); COMPLIANCE_OFFICER gets SELECT with POLICY_ADMIN or masking policy exemption to see raw data; DATA_ENGINEER gets INSERT/UPDATE on staging tables only. Not nesting them prevents unintended privilege inheritance. A single role with row-access policies cannot cleanly provide raw data to compliance while masking for scientists.
**Source:** [Access Control Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Best practice is to create functional roles aligned with specific job functions and to grant the minimum privileges necessary for each role."

---

## Q30
**Answer:** B
**Explanation:** Database roles in Snowflake are scoped to a specific database—they can only hold privileges on objects within that database and cannot own account-level objects (warehouses, resource monitors, etc.). Account roles are global and can hold privileges on any object in the account. Database roles are primarily used with Snowflake data sharing to scope consumer access to specific databases. They cannot be granted to other databases.
**Source:** [Database Roles](https://docs.snowflake.com/en/user-guide/security-access-control-overview#database-roles)
**Quote:** "Database roles are scoped to a specific database. They can be granted to account roles but cannot be used to access objects outside the database in which they are defined."

---

## Q31
**Answer:** A
**Explanation:** The immediate response to a leaked service account credential is: (1) disable the user to stop all authentication attempts; (2) rotate the password to invalidate the leaked credential; (3) re-enable the account after rotation; (4) investigate LOGIN_HISTORY and QUERY_HISTORY to determine the scope of any unauthorized access. Dropping and recreating the user risks losing grant information. Rotating only without disabling allows continued access during rotation. A network policy alone does not invalidate the compromised credential.
**Source:** [Incident Response Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "To immediately prevent access from a compromised account, use ALTER USER ... SET DISABLED = TRUE, then rotate credentials and investigate access history."

---

## Q32
**Answer:** A
**Explanation:** The WITH GRANT OPTION clause on a GRANT statement allows the grantee to further grant that same privilege to other roles, without the grantee needing ACCOUNTADMIN or MANAGE GRANTS privileges. This enables delegation of privilege management within a controlled scope. MANAGE GRANTS is a broader privilege that allows granting any privilege held by the role. OWNERSHIP grants full control. SECURITYADMIN privilege is not a specific grantable privilege.
**Source:** [GRANT Statement](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege)
**Quote:** "WITH GRANT OPTION: If specified, the grantee can grant the privilege to other roles."

---

## Q33
**Answer:** B
**Explanation:** SNOWFLAKE.ACCOUNT_USAGE.USERS view contains the HAS_MFA column (boolean) which indicates whether MFA is enabled for each user. This allows a Security Engineer to query users where HAS_MFA = FALSE and cross-reference with user type to identify non-service accounts that lack MFA. LOGIN_HISTORY shows whether MFA was used in specific login events but requires per-user analysis. SESSIONS and AUTHENTICATION_POLICIES do not directly expose per-user MFA enrollment status.
**Source:** [ACCOUNT_USAGE.USERS View](https://docs.snowflake.com/en/sql-reference/account-usage/users)
**Quote:** "HAS_MFA: Indicates whether the user has enrolled in multi-factor authentication (TRUE or FALSE)."

---

## Q34
**Answer:** A
**Explanation:** Trust Center's Leaked Credentials scanner integrates with threat intelligence databases to identify Snowflake user credentials that have appeared in known breach datasets. When a match is found, it generates a finding in the Trust Center dashboard. This is a native Snowflake feature specifically designed for this purpose. Snowflake Trail is for audit trail streaming. PASSWORD_POLICY does not have a BREACH_CHECK parameter. There is no COMPROMISED_CREDENTIALS view in ACCOUNT_USAGE.
**Source:** [Trust Center Scanners](https://docs.snowflake.com/en/user-guide/trust-center/trust-center-overview)
**Quote:** "The Leaked Credentials scanner identifies users whose credentials have been found in known data breach databases and reports them as findings."

---

## Q35
**Answer:** B
**Explanation:** For Azure, the equivalent of AWS PrivateLink is Azure Private Link for Snowflake. This routes traffic from Azure Data Factory (and other Azure services) through a private endpoint within the Azure network, ensuring data never traverses the public internet. Storage integrations connect to Azure Blob storage but do not ensure private connectivity for Snowflake. PREVENT_UNENCRYPTED_DATA_EXFILTRATION is not a valid Snowflake parameter. External network rules control Snowflake-to-external, not external-to-Snowflake.
**Source:** [Azure Private Link for Snowflake](https://docs.snowflake.com/en/user-guide/admin-security-privatelink-azure)
**Quote:** "Azure Private Link lets you create a private endpoint in your Azure VNet that connects to Snowflake without going over the public internet."

---

## Q36
**Answer:** A
**Explanation:** When a Snowflake user authenticates via external browser (SSO/SAML), the resulting session token is stored as a browser cookie on the client machine by default. This cookie is used to re-authenticate the session on subsequent connections from the same browser without requiring re-authentication via the IdP. The token is not stored server-side in a user-accessible table, in an encrypted file on disk, or regenerated per connection.
**Source:** [External Browser Authentication](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use)
**Quote:** "When using external browser authentication, a token is cached in a browser cookie to allow subsequent connections without re-authentication."

---

## Q37
**Answer:** B
**Explanation:** The least-privilege approach for an auditor is to create a custom role and grant SELECT only on the specific ACCOUNT_USAGE views needed (QUERY_HISTORY and ACCESS_HISTORY). This avoids giving the auditor access to business data. Granting ACCOUNTADMIN even temporarily is overly broad. Sharing the SNOWFLAKE database would require cross-account Data Sharing and grants more access than needed. Creating a secure view and sharing via Data Listing is more complex and typically used for external sharing.
**Source:** [ACCOUNT_USAGE Access Control](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "To grant access to ACCOUNT_USAGE views without granting ACCOUNTADMIN, grant SELECT on specific views to a custom role."

---

## Q38
**Answer:** B
**Explanation:** Snowflake supports a maximum of 2 active RSA public keys per user at any given time (RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2). This enables seamless key rotation by allowing both the old and new keys to be valid simultaneously during the transition. Once the rotation is complete and all clients have switched to the new key, the old key (RSA_PUBLIC_KEY) is cleared.
**Source:** [Key Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)
**Quote:** "A user can have at most two active RSA public keys (RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2) at the same time."

---

## Q39
**Answer:** B
**Explanation:** Role-based access control is the correct and most effective control. By not granting DDL privileges (CREATE, ALTER, DROP) on the PROD schema to developer roles, and enforcing this via role assignment, developers cannot execute DDL against PROD regardless of which warehouse they use. Network policies control IP-based access, not SQL operation types. Session policies do not restrict SQL statement types. PREVENT_DDL_IN_PROD is not a valid Snowflake parameter.
**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)
**Quote:** "RBAC provides the mechanism to control what actions users can perform on objects. Do not grant DDL privileges to roles that should only read data."

---

## Q40
**Answer:** C
**Explanation:** The AUTHENTICATION_METHODS property in an authentication policy specifies which authentication methods are permitted for users assigned to the policy. This property can be set to a list containing 'PASSWORD', 'KEYPAIR', 'SAML', 'OAUTH', 'MFA', etc. Using AUTHENTICATION_METHODS = ('SAML') would allow only SSO/federated authentication. Options A, B, and D are not valid Snowflake authentication policy property names.
**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "AUTHENTICATION_METHODS: Specifies the list of authentication methods that are allowed for users assigned to the policy."

---

## Q41
**Answer:** C
**Explanation:** Programmatic Access Tokens (PATs) are long-lived tokens that each ETL tool (individual user) can use for authentication without requiring the OAuth authorization flow or key-pair support. Each ETL tool gets its own PAT scoped to a dedicated user account, satisfying the requirement for trackable individual identities. This approach handles tools that don't support key-pair auth while maintaining user-level traceability. Shared service accounts are explicitly prohibited. OAuth requires each tool to implement an OAuth flow.
**Source:** [Programmatic Access Tokens](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens)
**Quote:** "Programmatic access tokens allow programmatic clients to authenticate without going through the OAuth flow... A PAT is associated with a specific user account."

---

## Q42
**Answer:** B, C
**Explanation:** Security integrations are account-level objects created with CREATE SECURITY INTEGRATION. This privilege is held by ACCOUNTADMIN (C) and SECURITYADMIN (B), which inherits from USERADMIN plus has the global MANAGE GRANTS privilege and can create integrations. SYSADMIN manages database objects and warehouses but cannot create security integrations. PUBLIC and USERADMIN also cannot create security integrations.
**Source:** [Security Integrations Access Control](https://docs.snowflake.com/en/user-guide/security-integrations)
**Quote:** "Creating security integrations requires the ACCOUNTADMIN or SECURITYADMIN role."

---

## Q43
**Answer:** B
**Explanation:** The WITH GRANT OPTION clause allows the grantee to further grant the same privilege to other roles. This enables privilege delegation: a data owner can grant SELECT WITH GRANT OPTION to a team lead, who can then grant SELECT to team members, without requiring ACCOUNTADMIN involvement at every step. It does not create administrative overrides, temporary grants, or special audit log entries.
**Source:** [GRANT Statement](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege)
**Quote:** "Specifying WITH GRANT OPTION allows the privilege to be granted to other roles by the grantee."

---

## Q44
**Answer:** A, B
**Explanation:** For a credential-stuffing attack against BATCH_USER: (A) applying a restrictive network policy immediately limits access to known IPs, stopping the attack from unknown sources; and (B) disabling the user stops all authentication attempts immediately during the investigation. Dropping and recreating the user risks losing grant assignments. Rotating the password alone still allows brute-force attempts from multiple IPs. Trust Center's leaked credentials scanner is a useful supplementary measure but is not an immediate mitigation for an active attack.
**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies), [Incident Response](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Apply a network policy to restrict the IP addresses from which a user can connect, limiting the attack surface for credential attacks."

---

## Q45
**Answer:** C
**Explanation:** Network rules are the objects that define collections of network identifiers (IP addresses, hostnames, VPC endpoints) for use in policies and integrations. They can be used in network policies (for ingress) and in external access integrations (for egress from stored procedures/UDFs). Network policies define the overall allow/deny structure. Security integrations are for IdP connections. External access integrations use network rules for egress control from stored procedures.
**Source:** [Network Rules](https://docs.snowflake.com/en/user-guide/network-rules)
**Quote:** "Network rules define a set of network identifiers that can be used in network policies and external access integrations to control inbound and outbound network access."

---

## Q46
**Answer:** B
**Explanation:** A session policy with SESSION_IDLE_TIMEOUT_MINS = 30 handles the idle session timeout requirement. For query execution time limits, the STATEMENT_TIMEOUT_IN_SECONDS parameter set at the warehouse level (or session level) cancels queries that exceed the specified duration. These are two separate mechanisms: session policy handles session lifecycle, and warehouse/session parameters handle query timeouts. A resource monitor controls credit consumption, not individual query time.
**Source:** [Session Policies](https://docs.snowflake.com/en/user-guide/session-policies), [STATEMENT_TIMEOUT_IN_SECONDS](https://docs.snowflake.com/en/sql-reference/parameters#statement-timeout-in-seconds)
**Quote:** "SESSION_IDLE_TIMEOUT_MINS specifies the number of minutes after which an idle session is automatically terminated."

---

## Q47
**Answer:** B
**Explanation:** SCIM GROUP provisioning maps groups in the identity provider (Okta, Azure AD) to roles in Snowflake. When a user is added to or removed from a group in the IdP, SCIM automatically provisions the corresponding role grant or revocation in Snowflake. This keeps role assignments synchronized between the IdP and Snowflake without manual intervention. SCIM does not provision warehouses, schemas, or row-access policies.
**Source:** [SCIM Group Provisioning](https://docs.snowflake.com/en/user-guide/scim)
**Quote:** "SCIM provisioning can synchronize IdP groups to Snowflake roles, automatically granting or revoking role assignments when group membership changes."

---

## Q48
**Answer:** B
**Explanation:** When sharing a database via Snowflake data sharing, database roles (not account roles) must be used to control consumer access. The correct syntax is GRANT DATABASE ROLE <db_name>.<role_name> TO SHARE <share_name>. Database roles are scoped to the database and are the appropriate mechanism for granting consumers access to shared objects. Options A, C, and D use incorrect syntax or concepts for sharing.
**Source:** [Database Roles and Data Sharing](https://docs.snowflake.com/en/user-guide/security-access-control-overview#database-roles)
**Quote:** "To provide consumers access to shared objects, grant a database role to the share using GRANT DATABASE ROLE <db_name>.<role_name> TO SHARE <share_name>."

---

## Q49
**Answer:** A
**Explanation:** PREVENT_QUERY_RESULT_DOWNLOAD is the Snowflake account-level parameter that prevents users from downloading query result sets to their local machines via SnowSQL or the Snowflake clients. This is useful in environments where data residency requirements prohibit query results from leaving the cloud environment. Option C (ALLOW_CLIENT_MFA_CACHING) is a completely different parameter. Options B and D do not correspond to valid Snowflake parameters.
**Source:** [Account Parameters](https://docs.snowflake.com/en/sql-reference/parameters#prevent-query-result-download)
**Quote:** "PREVENT_QUERY_RESULT_DOWNLOAD: When set to TRUE, prevents users from downloading query results to their local machine."

---

## Q50
**Answer:** B
**Explanation:** When an OAuth client secret is exposed, the most targeted remediation (without destroying the integration) is to rotate the client secret using ALTER SECURITY INTEGRATION ... SET OAUTH_CLIENT_RSA_PUBLIC_KEY or equivalent rotation option. Rotating the secret immediately invalidates all tokens issued under the old secret, since they were signed/encrypted with the old secret. Option A revokes user-level tokens but doesn't invalidate the integration's secret. Option C destroys the integration. Option D only disables temporarily.
**Source:** [OAuth Security Integration](https://docs.snowflake.com/en/user-guide/oauth-custom)
**Quote:** "To rotate the OAuth client secret, alter the security integration and set a new client secret. All existing tokens issued with the old secret are invalidated."

---

## Q51
**Answer:** B
**Explanation:** When OWNERSHIP of a Snowflake object is transferred to a new role, the new role becomes the sole owner. The previous owner loses OWNERSHIP but retains any privileges that were explicitly granted to them (e.g., SELECT granted by a third party). The new owner does not automatically get all the old owner's explicit grants to others; those remain. Option D incorrectly claims the previous owner loses all access—explicitly granted privileges survive the ownership transfer.
**Source:** [GRANT OWNERSHIP](https://docs.snowflake.com/en/sql-reference/sql/grant-ownership)
**Quote:** "When ownership is transferred, the new role becomes the owner. The previous owner retains any explicit privilege grants but loses the OWNERSHIP privilege."

---

## Q52
**Answer:** C
**Explanation:** Snowflake replication groups can include OBJECT_TYPES that go beyond just databases, including NETWORK POLICIES, AUTHENTICATION POLICIES, and other account-level security objects. By including these policy types in the replication group configuration, changes to network and authentication policies in the primary account are replicated to secondary accounts, ensuring consistent security posture after failover. Cross-region data sharing does not replicate policies. Tri-Secret Secure key replication is a different concern.
**Source:** [Account Replication](https://docs.snowflake.com/en/user-guide/account-replication-config)
**Quote:** "Replication groups support replicating security objects including NETWORK POLICIES and AUTHENTICATION POLICIES to secondary accounts."

---

## Q53
**Answer:** D
**Explanation:** Per Snowflake best practices, USERADMIN is the recommended role for day-to-day user and role management tasks such as creating users, creating roles, and assigning roles to users. ACCOUNTADMIN should be reserved for account-level settings and billing. SECURITYADMIN manages grants more broadly. SYSADMIN manages database objects. USERADMIN has the minimum necessary privileges for routine user administration.
**Source:** [Role Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Snowflake recommends using the USERADMIN role for day-to-day user and role administration tasks."

---

## Q54
**Answer:** A
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY filtered on QUERY_TYPE = 'GRANT' and the time range is the most direct way to find all GRANT statements executed in the past 30 days, including who executed them (USER_NAME, ROLE_NAME) and what was granted (query_text). GRANTS_TO_ROLES has a CREATED_ON timestamp but is harder to filter for a specific time window of grant events. ACCESS_HISTORY covers data access, not grant operations.
**Source:** [QUERY_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "QUERY_TYPE indicates the type of query (e.g., GRANT, REVOKE, SELECT, INSERT, DDL). Filter on QUERY_TYPE = 'GRANT' to find privilege grant operations."

---

## Q55
**Answer:** B
**Explanation:** Network policies define the IP-based allow/deny rules for account access and user access (ingress). Network rules are reusable objects that define sets of IP addresses, hostnames, or VPC endpoint IDs that can be referenced by network policies and external access integrations. Network policies use network rules as building blocks. Network rules also serve egress control in external access integrations. Option A reverses the scope. Options C and D are incorrect descriptions.
**Source:** [Network Rules vs. Network Policies](https://docs.snowflake.com/en/user-guide/network-rules)
**Quote:** "Network rules define the network identifiers; network policies apply those rules to control account and user access."

---

## Q56
**Answer:** B
**Explanation:** Snowflake Business Critical edition supports multi-party (dual) authorization for sensitive DDL operations and privilege grants. This feature requires two authorized users to approve certain operations before they execute, implementing a separation of duties and dual-control mechanism. Snowsight approval workflows are not a native Snowflake security feature. There is no WITH DUAL_AUTH option on GRANT statements. Tri-Secret Secure controls encryption key custody, not DDL authorization.
**Source:** [Multi-Party Authorization](https://docs.snowflake.com/en/user-guide/security-mpa)
**Quote:** "Multi-party authorization requires a second user to approve certain sensitive SQL statements before they are executed, implementing a dual-control mechanism."

---

## Q57
**Answer:** B
**Explanation:** ACCOUNT_USAGE.POLICY_REFERENCES shows the current and historical assignment of policies (network policies, masking policies, row-access policies, session policies, authentication policies) to objects and users. This provides a comprehensive view of which policies are applied where. ACCOUNT_USAGE.NETWORK_POLICIES lists defined network policies. INFORMATION_SCHEMA.NETWORK_POLICIES shows object metadata. ACCOUNT_USAGE.NETWORK_RULE_REFERENCES is not a standard view name.
**Source:** [POLICY_REFERENCES View](https://docs.snowflake.com/en/sql-reference/account-usage/policy_references)
**Quote:** "POLICY_REFERENCES: Returns a row for each object that has a policy assigned to it, including network policies, masking policies, and row access policies."

---

## Q58
**Answer:** A
**Explanation:** To make FINANCE_ANALYST inherit privileges from DB_FINANCE_READ, grant the access role to the functional role: GRANT ROLE DB_FINANCE_READ TO ROLE FINANCE_ANALYST. This places DB_FINANCE_READ lower in the hierarchy with FINANCE_ANALYST above it, so FINANCE_ANALYST inherits all of DB_FINANCE_READ's privileges. Option B reverses the direction—it would make DB_FINANCE_READ inherit from FINANCE_ANALYST. There is no ALTER ROLE SET PARENT or GRANT INHERIT syntax in Snowflake.
**Source:** [Role Hierarchy](https://docs.snowflake.com/en/user-guide/security-access-control-overview#role-hierarchy-and-privilege-inheritance)
**Quote:** "To make a functional role inherit the privileges of an access role, grant the access role to the functional role: GRANT ROLE <access_role> TO ROLE <functional_role>."

---

## Q59
**Answer:** B
**Explanation:** Tri-Secret Secure (TSS) is a Snowflake Business Critical feature that creates a composite encryption key combining a Snowflake-managed key and a customer-managed key held in an external KMS (AWS KMS, Azure Key Vault, or GCP KMS). When the customer revokes or disables their KMS key, Snowflake cannot decrypt the data, providing cryptographic proof of data sovereignty and the ability to enforce a "right to erasure" at the encryption layer.
**Source:** [Tri-Secret Secure](https://docs.snowflake.com/en/user-guide/security-encryption-tri-secret)
**Quote:** "Tri-Secret Secure uses a composite master key formed from a Snowflake key and a customer-managed key. If the customer revokes their key, Snowflake can no longer decrypt the data."

---

## Q60
**Answer:** A, D
**Explanation:** To block all connections except from 10.0.0.0/8: (A) create a network policy with ALLOWED_IP_LIST = ['10.0.0.0/8']—when an ALLOWED_IP_LIST is configured, all IPs NOT in the list are automatically blocked; then apply it at the account level. Option D adds a BLOCKED_IP_LIST which is technically unnecessary since the ALLOWED_IP_LIST already implies blocking everything else, but it is also a valid approach. Options B and C use incorrect syntax/concepts. Option E cannot achieve the blocking goal.
**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "When you set an ALLOWED_IP_LIST, any IP address not in the allowed list is automatically blocked."

---

## Q61
**Answer:** B
**Explanation:** In Snowflake, the session lifecycle is independent of the IdP session. Once a Snowflake session is established via federated SSO, it persists until it naturally expires (per session policy settings) or is manually terminated (e.g., via SYSTEM$ABORT_SESSION). Logging out of the IdP (Okta, Azure AD, etc.) does not automatically terminate the Snowflake session. This is an important security consideration: a revoked IdP user may still have active Snowflake sessions.
**Source:** [Federated Authentication](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use)
**Quote:** "Snowflake sessions are independent of the IdP session. Revoking access in the IdP does not immediately terminate active Snowflake sessions."

---

## Q62
**Answer:** A
**Explanation:** The correct least-privilege approach is to create an auditor role, grant USAGE on the database and on AUDIT_SCHEMA, and grant SELECT on the tables within AUDIT_SCHEMA. By not granting USAGE on CUSTOMERS or TRANSACTIONS schemas, the role cannot navigate to or query objects in those schemas. Granting SECURITYADMIN with network policy restrictions is overly broad. Row-access policies work at the row level, not schema level. A merged secure view adds unnecessary complexity.
**Source:** [Access Control Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Grant USAGE on only the database and schema the user needs to access; without USAGE on a schema, a role cannot see or access objects within it."

---

## Q63
**Answer:** B
**Explanation:** FUTURE GRANTS automatically grant specified privileges to newly created objects of a given type in a schema or database to a specified role. For example: GRANT SELECT ON FUTURE TABLES IN SCHEMA public TO ROLE analyst. This ensures that as new tables are created, the analyst role automatically receives SELECT without requiring explicit grants each time. FUTURE GRANTS are not retroactive—they only apply to objects created after the FUTURE GRANT is issued. They work for multiple object types, not only tables.
**Source:** [FUTURE GRANTS](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#future-grants-on-schema-objects)
**Quote:** "FUTURE GRANTS automatically grant specified privileges to new objects of the specified type as they are created in the schema or database."

---

## Q64
**Answer:** A
**Explanation:** The correct remediation is to revoke ACCOUNTADMIN from regular users and create appropriately scoped custom roles for their day-to-day tasks. Per Snowflake best practices, ACCOUNTADMIN should be used only for initial setup, billing, and break-glass scenarios. Creating an MFA-requiring authentication policy, while a good supplementary control, does not remove the privilege. Network policies and warehouse restrictions do not address the excessive privilege itself.
**Source:** [ACCOUNTADMIN Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Snowflake recommends that ACCOUNTADMIN be granted to only a small number of trusted users... It should not be used for routine operations."

---

## Q65
**Answer:** B
**Explanation:** SYSTEM$REVOKE_USER_OAUTH_TOKENS is the Snowflake system function that immediately revokes all OAuth tokens (both access tokens and refresh tokens) associated with a specific user. This is used during incident response when a user account is suspected to be compromised and OAuth-based sessions must be immediately invalidated. Option A and C are not valid Snowflake function names. Option D is not valid SQL syntax.
**Source:** [OAuth Token Revocation](https://docs.snowflake.com/en/sql-reference/functions/system_revoke_user_oauth_authorizations)
**Quote:** "SYSTEM$REVOKE_USER_OAUTH_AUTHORIZATIONS revokes all OAuth tokens for a specific user, immediately invalidating all active OAuth-based sessions."

---

## Q66
**Answer:** B
**Explanation:** For Google Cloud Platform, Snowflake supports Google Private Service Connect, which allows GCP resources to connect to Snowflake without traffic leaving the Google network. This is the GCP equivalent of AWS PrivateLink and Azure Private Link. GCP VPN Gateway is a different connectivity solution (still potentially traverses non-Google paths). Shared VPC peering is not a Snowflake-supported private connectivity option. Cloud Interconnect is for on-premises to GCP connectivity.
**Source:** [GCP Private Service Connect](https://docs.snowflake.com/en/user-guide/admin-security-privatelink-gcp)
**Quote:** "Snowflake supports Google Private Service Connect, allowing connections from your GCP project to Snowflake that do not traverse the public internet."

---

## Q67
**Answer:** C
**Explanation:** Session policies in Snowflake define parameters governing session behavior including: SESSION_IDLE_TIMEOUT_MINS (idle timeout), SESSION_UI_IDLE_TIMEOUT_MINS (browser/Snowsight idle timeout), and SESSION_TIMEOUT_MINS (maximum session length). Authentication policies govern authentication method requirements. Password policies govern password strength and rotation. Resource monitors govern warehouse credit consumption and do not control session behavior.
**Source:** [Session Policies](https://docs.snowflake.com/en/user-guide/session-policies)
**Quote:** "A session policy allows you to set the idle timeout, maximum session length, and other session-related parameters for users or accounts."

---

## Q68
**Answer:** A, C
**Explanation:** To enable a Python UDF to call an external REST API: (A) create a network rule with TYPE = HOST_PORT and VALUE_LIST = ['api.example.com:443'] to define the allowed external host; and (C) create an external access integration referencing both the network rule and the secret (for the bearer token). The network rule defines WHERE the UDF can connect; the external access integration combines the network rule and secret into a unit that can be referenced in the UDF definition. Network policies (B) control ingress, not egress from UDFs. Storage integrations (D) are for cloud storage. OAuth security integrations (E) are for Snowflake OAuth flows.
**Source:** [External Network Access](https://docs.snowflake.com/en/developer-guide/external-network-access/creating-using-external-network-access)
**Quote:** "To allow a UDF to access external services, create a network rule specifying the allowed hosts and ports, and an external access integration that references the rule."

---

## Q69
**Answer:** C
**Explanation:** Per Snowflake best practices, ACCOUNTADMIN should be reserved for: initial account setup, billing and contract management, and emergency (break-glass) operations. It should not be used for day-to-day database operations, user management, or pipeline execution. Using ACCOUNTADMIN for routine tasks violates least-privilege principles and increases the blast radius of any credential compromise.
**Source:** [ACCOUNTADMIN Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Reserve ACCOUNTADMIN for initial setup and other account-level tasks. Avoid using ACCOUNTADMIN for day-to-day administration."

---

## Q70
**Answer:** A, E
**Explanation:** After failover, to verify security posture: (A) query GRANTS_TO_ROLES to confirm all privilege grants were replicated correctly to the target account; and (E) run SHOW ROLES and SHOW GRANTS TO ROLE <role_name> to verify the role hierarchy and individual grant assignments are intact. SHOW REPLICATION GROUPS (C) checks replication status, not post-failover security. Network policies are verified via SHOW NETWORK POLICIES, not ACCOUNT_USAGE.NETWORK_POLICIES. LOGIN_HISTORY (D) shows post-failover logins but doesn't verify security configuration.
**Source:** [Failover and Failback](https://docs.snowflake.com/en/user-guide/account-replication-failover)
**Quote:** "After failover, verify that replicated security objects including roles, grants, and network policies are correctly present in the target account."

---

## Q71
**Answer:** C
**Explanation:** OAuth (specifically the OAuth 2.0 authorization code flow) allows applications to authenticate on behalf of users using delegated authorization. The user authorizes the application to act on their behalf by granting it an access token, without sharing their Snowflake credentials. This is distinct from key-pair authentication (client authenticates directly), SCIM (user provisioning), and SAML2 (single sign-on, not delegated authorization to an app).
**Source:** [OAuth for Snowflake](https://docs.snowflake.com/en/user-guide/oauth-intro)
**Quote:** "OAuth enables applications to access Snowflake resources on behalf of users using delegated authorization, without the user sharing their credentials with the application."

---

## Q72
**Answer:** A
**Explanation:** Authentication policies can require MFA as a condition of login. When an authentication policy with MFA_ENROLLMENT = 'REQUIRED' is assigned to a user, that user cannot log in without completing MFA enrollment. Network policies control IP access, not MFA enrollment. Row-access policies operate at the data level after authentication. The ENFORCE_MFA account parameter described in option D is not a Snowflake parameter; MFA enforcement is done via authentication policies.
**Source:** [Authentication Policies - MFA](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Use authentication policies with MFA_ENROLLMENT = 'REQUIRED' to enforce MFA enrollment before users can access the account."

---

## Q73
**Answer:** A
**Explanation:** In a Snowflake network policy, the BLOCKED_IP_LIST takes precedence over the ALLOWED_IP_LIST. If an IP appears in both lists, it is blocked. This allows fine-grained exclusions within a broader allow range: for example, allow 192.168.0.0/16 but block 192.168.1.5. The BLOCKED_IP_LIST does not block "all IPs except those in it"—that would be the behavior of ALLOWED_IP_LIST combined with Snowflake's default deny. The BLOCKED_IP_LIST is not deprecated.
**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "If an IP address appears in both the allowed IP list and the blocked IP list, Snowflake blocks access from that IP address."

---

## Q74
**Answer:** B
**Explanation:** SYSADMIN is the system-defined role that can create and manage warehouses, databases, schemas, and other database objects. It does not have privileges to create users, manage roles, or modify account-level settings (which require ACCOUNTADMIN or SECURITYADMIN/USERADMIN). This makes SYSADMIN the best fit for a role that can administer warehouse settings without being able to manage users or databases from scratch.
**Source:** [SYSADMIN Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)
**Quote:** "SYSADMIN: Has privileges to create warehouses, databases, and other objects in the account. Does not have privileges to create users or manage grants."

---

## Q75
**Answer:** B
**Explanation:** Application roles are roles defined within a Native App package by the provider. When consumers install the app, they can grant these application roles to their own account roles to access specific app functionality. This is Snowflake's RBAC mechanism for controlling consumer access to Native App capabilities at a granular level. Application roles are not ACCOUNTADMIN-level; they are scoped to the app's permissions, not the consumer account.
**Source:** [Native App Framework - Application Roles](https://docs.snowflake.com/en/developer-guide/native-apps/app-roles)
**Quote:** "Application roles are defined by the app provider and can be granted to consumer account roles to provide access to app functionality."

---

## Q76
**Answer:** B
**Explanation:** The OAuth authorization code flow with a refresh token is appropriate for BI tools acting on behalf of interactive users. The user authorizes the BI tool once; the tool receives an access token (short-lived) and a refresh token (valid for the configured duration, 8 hours in this case). The refresh token allows the tool to obtain new access tokens without re-prompting the user. Client credentials flow is for application-level access with no user context. Implicit flow doesn't issue refresh tokens. PKCE is typically for mobile apps.
**Source:** [OAuth Authorization Code Flow](https://docs.snowflake.com/en/user-guide/oauth-custom)
**Quote:** "The authorization code flow is used when applications access Snowflake on behalf of users. A refresh token allows the application to obtain new access tokens without user re-authorization."

---

## Q77
**Answer:** C
**Explanation:** ACCOUNT_USAGE.LOGIN_HISTORY records all login attempts with information including: user_name, client_ip, first_authentication_factor (e.g., PASSWORD, KEYPAIR, SAML), second_authentication_factor (e.g., DUO MFA), is_success, event_timestamp, and client_application_id. SESSIONS shows active and closed sessions after authentication. USERS shows user configuration. QUERY_HISTORY shows queries after login.
**Source:** [LOGIN_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/login_history)
**Quote:** "LOGIN_HISTORY: Returns login events for users, including the authentication method, source IP, and whether login was successful."

---

## Q78
**Answer:** B
**Explanation:** Snowflake natively supports passkeys (FIDO2/WebAuthn) for MFA. Users can register a FIDO2-compatible device (hardware security key like YubiKey, or platform authenticator like Touch ID/Face ID) through their Snowflake profile settings. There is no separate product or edition requirement for passkey support; it is available to all Snowflake users. Authentication policies can be used to enforce passkey/FIDO2 as the required MFA method.
**Source:** [Passkey MFA](https://docs.snowflake.com/en/user-guide/security-mfa)
**Quote:** "Snowflake supports passkeys (FIDO2) as a form of multi-factor authentication. Users can register a passkey from their profile settings."

---

## Q79
**Answer:** A
**Explanation:** The correct SQL syntax to create a Snowflake SECRET of type GENERIC_STRING is: CREATE SECRET <name> TYPE = GENERIC_STRING SECRET_STRING = '<value>'. This stores the string value (e.g., an API key) securely in Snowflake's encrypted key hierarchy. There is no CREATE CREDENTIAL, CREATE VAULT_ENTRY, or INSERT INTO SNOWFLAKE.SECRETS syntax in Snowflake for this purpose.
**Source:** [CREATE SECRET](https://docs.snowflake.com/en/sql-reference/sql/create-secret)
**Quote:** "CREATE SECRET <name> TYPE = GENERIC_STRING SECRET_STRING = '<secret_value>' creates a secret containing a generic string value."

---

## Q80
**Answer:** C
**Explanation:** To create a role that can manage objects within a single database without SYSADMIN-level access, create a custom role and grant: USAGE on the database, USAGE on required schemas, and CREATE TABLE/VIEW/PROCEDURE/etc. on the schemas. This provides precise, database-scoped DDL capabilities without account-wide privileges. Granting OWNERSHIP on the entire database (B) is excessively broad and grants the ability to drop the database. DBADMIN is not a built-in Snowflake role.
**Source:** [Access Control Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)
**Quote:** "To allow a role to create objects in a schema, grant the appropriate CREATE <object_type> privilege on the schema, not OWNERSHIP on the database."

---

## Q81
**Answer:** A
**Explanation:** A Programmatic Access Token (PAT) is a long-lived bearer token generated directly by the user (via ALTER USER or the Snowsight UI) without requiring an OAuth authorization flow. It is scoped to the generating user and can be used as a credential for programmatic access. Unlike OAuth access tokens (which are short-lived and require refresh), PATs persist until revoked or expired. PATs are available for all Snowflake users (not just service accounts), though they are primarily designed for programmatic use.
**Source:** [Programmatic Access Tokens](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens)
**Quote:** "A programmatic access token (PAT) is a long-lived token associated with a specific Snowflake user, enabling programmatic access without the OAuth flow."

---

## Q82
**Answer:** A
**Explanation:** The correct approach is to create separate authentication policies: one for JDBC/ODBC/Python connector users specifying AUTHENTICATION_METHODS = ('KEYPAIR') and another for Snowsight users specifying AUTHENTICATION_METHODS = ('SAML'). Assign the appropriate policy to each user group. This provides per-user authentication method enforcement without affecting other users. Setting account-level KEYPAIR with Snowsight as an exception (B) is not how Snowflake works. Session policies (C) do not control authentication methods.
**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Assign authentication policies to specific users or roles to enforce different authentication requirements for different groups."

---

## Q83
**Answer:** B
**Explanation:** IMPORTED PRIVILEGES, when granted on the SNOWFLAKE database, allows a role to query all ACCOUNT_USAGE views in that database. This is a special privilege that essentially grants visibility into all account-level metadata and audit views without granting full ACCOUNTADMIN. This is commonly used to grant audit/monitoring roles access to ACCOUNT_USAGE data. MONITOR allows monitoring of warehouse or account performance, not direct object access visibility.
**Source:** [IMPORTED PRIVILEGES](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#imported-privileges)
**Quote:** "Granting IMPORTED PRIVILEGES on the SNOWFLAKE database allows a role to access all ACCOUNT_USAGE views in that database."

---

## Q84
**Answer:** B
**Explanation:** Snowflake's account-level isolation is the fundamental security boundary. Data in separate Snowflake accounts is completely isolated by design; users and roles in one account have no access to another account's data. The correct enforcement is to ensure EU admins are not granted roles in the US account. Network policies (A) control IP access but not cross-account data access. Cross-account sharing with row-access policies (C) would still expose data. Tri-Secret Secure (D) controls encryption, not access boundaries.
**Source:** [Account Architecture](https://docs.snowflake.com/en/user-guide/organizations-connect)
**Quote:** "Snowflake accounts are isolated environments. Users in one account have no access to data in another account unless explicitly granted via data sharing."

---

## Q85
**Answer:** C
**Explanation:** Snowflake private connectivity features (AWS PrivateLink, Azure Private Link, GCP Private Service Connect) require Business Critical edition or higher. This edition is positioned for organizations with strict data security and compliance requirements (healthcare, financial services). Standard and Enterprise editions do not support PrivateLink. VPS (Virtual Private Snowflake) is a separate, higher-tier offering that includes PrivateLink plus additional isolation.
**Source:** [Private Connectivity Requirements](https://docs.snowflake.com/en/user-guide/admin-security-privatelink)
**Quote:** "Private connectivity via PrivateLink requires Business Critical edition or higher."

---

## Q86
**Answer:** C
**Explanation:** Snowflake's default recommended separation is SYSADMIN for creating and owning database objects (warehouses, databases, schemas, tables) and SECURITYADMIN for managing grants and security policies. This natural separation exists in the Snowflake system role hierarchy: SYSADMIN handles object lifecycle, SECURITYADMIN handles access management. Neither role is a parent of the other in the hierarchy—they have distinct responsibilities. This achieves the required separation of duties without custom role creation.
**Source:** [Role Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Snowflake's default role hierarchy separates SYSADMIN (object management) from SECURITYADMIN (grant management), providing inherent separation of duties."

---

## Q87
**Answer:** B
**Explanation:** USERADMIN is the Snowflake system-defined role responsible for creating and managing users and roles. It has the CREATE USER and CREATE ROLE account-level privileges. However, USERADMIN does not have the ability to manage data object privileges (tables, schemas), billing (ACCOUNTADMIN), or warehouses (SYSADMIN). This makes it the appropriate role for HR/IT administrators who manage user lifecycle without needing data access.
**Source:** [USERADMIN Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)
**Quote:** "USERADMIN: Has the ability to create and manage users and roles. This role is intended for day-to-day user and role administration."

---

## Q88
**Answer:** C
**Explanation:** In Snowflake, navigating to a table requires: USAGE on the database + USAGE on the schema + SELECT on the specific table. Granting USAGE on the schema is necessary but not sufficient—SELECT must also be explicitly granted on each table. Even with USAGE on the schema, the user cannot query tables without an explicit SELECT grant. The grant takes effect immediately (no propagation delay). SYSADMIN does not need to activate grants.
**Source:** [Privilege Requirements](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)
**Quote:** "USAGE on a schema does not grant access to the objects within the schema. SELECT on each table must be explicitly granted."

---

## Q89
**Answer:** A
**Explanation:** ACCOUNT_USAGE.POLICY_REFERENCES is the view that lists all policy assignments in the account, including which policies (masking, row-access, network, session, authentication, projection, aggregation) are applied to which objects. It shows the policy name, type, the object it's attached to, and the attachment timestamps. GRANTS_TO_ROLES shows privilege grants. INFORMATION_SCHEMA.POLICY_ASSIGNMENTS is not a standard view name. SECURITY_INTEGRATIONS shows integration configurations.
**Source:** [POLICY_REFERENCES View](https://docs.snowflake.com/en/sql-reference/account-usage/policy_references)
**Quote:** "POLICY_REFERENCES: Displays all policy assignments—including masking, row access, network, and session policies—applied to objects in the account."

---

## Q90
**Answer:** B
**Explanation:** Multi-party (dual) authorization on Snowflake Business Critical edition requires a second authorized user to review and approve certain sensitive DDL operations before they execute. This implements a cryptographic-grade separation of duties that cannot be bypassed even by ACCOUNTADMIN acting alone. Tri-Secret Secure (A) controls encryption key custody, not DDL authorization. Session policies (C) cannot block destructive operations. Trust Center alerts (D) detect but do not block DDL.
**Source:** [Multi-Party Authorization](https://docs.snowflake.com/en/user-guide/security-mpa)
**Quote:** "Multi-party authorization provides a two-person integrity control, requiring a second authorized user to approve sensitive operations before execution."

---

## Q91
**Answer:** B
**Explanation:** REVOKE ALL PRIVILEGES ON TABLE removes all explicitly granted privileges (SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES) from all grantees for that table. However, OWNERSHIP is not affected by this command—the owner retains ownership and all associated abilities. REVOKE ALL PRIVILEGES is a valid Snowflake SQL statement and does not drop the table. Only the explicit grants are revoked.
**Source:** [REVOKE Statement](https://docs.snowflake.com/en/sql-reference/sql/revoke-privilege)
**Quote:** "REVOKE ALL PRIVILEGES revokes all explicitly granted privileges on the object but does not affect OWNERSHIP."

---

## Q92
**Answer:** C
**Explanation:** To transfer ownership of multiple objects while preserving existing grants, use GRANT OWNERSHIP ON ALL TABLES IN SCHEMA <schema> TO ROLE <new_role> COPY CURRENT GRANTS. The COPY CURRENT GRANTS option preserves all existing explicit grants to other roles when ownership is transferred. REVOKE CURRENT GRANTS would revoke all existing grants during transfer, potentially breaking access for dependent roles. Individual ALTER TABLE ... TRANSFER OWNERSHIP (A) is not valid Snowflake syntax. Recreating objects (D) is unnecessary.
**Source:** [GRANT OWNERSHIP](https://docs.snowflake.com/en/sql-reference/sql/grant-ownership)
**Quote:** "COPY CURRENT GRANTS preserves existing grants when ownership is transferred. REVOKE CURRENT GRANTS removes existing grants during the transfer."

---

## Q93
**Answer:** B
**Explanation:** The SESSIONS_UI_IDLE_TIMEOUT_MINS parameter in a session policy specifically controls the idle timeout for Snowflake UI (Snowsight) browser sessions. It defines how long a browser session can be idle before the user is automatically logged out. The SESSION_IDLE_TIMEOUT_MINS parameter applies to all session types (including JDBC, Python, SnowSQL). This distinction is important for environments where browser and programmatic sessions need different timeout policies.
**Source:** [Session Policies](https://docs.snowflake.com/en/user-guide/session-policies)
**Quote:** "SESSION_UI_IDLE_TIMEOUT_MINS: Specifies the idle timeout for Snowsight browser sessions specifically."

---

## Q94
**Answer:** B
**Explanation:** To allow a Python stored procedure to call an external API securely at a specific host, the required configuration is: (1) a network rule with TYPE = HOST_PORT, VALUE_LIST = ['api.saas-vendor.com:443'] to define the allowed external endpoint; (2) an external access integration that references the network rule and the secret (for the API key); and (3) the stored procedure definition must reference the external access integration. Network policies (A) control ingress to Snowflake, not outbound calls from procedures. Storage integrations (C) are for cloud storage.
**Source:** [External Network Access](https://docs.snowflake.com/en/developer-guide/external-network-access/creating-using-external-network-access)
**Quote:** "To allow a stored procedure to call an external API, create a network rule (TYPE = HOST_PORT) and an external access integration, then reference the integration in the procedure definition."

---

## Q95
**Answer:** B
**Explanation:** To remove a network policy from a specific user, use ALTER USER <username> UNSET NETWORK_POLICY. This removes the user-level policy assignment, causing the account-level network policy to apply to that user again. Option A is invalid syntax (DROP NETWORK POLICY FROM USER doesn't exist). Option C (REVOKE NETWORK POLICY FROM USER) is not valid Snowflake syntax. Option D (SET NETWORK_POLICY = NULL) is not valid for unsetting a policy.
**Source:** [Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "To remove a network policy from a user, use ALTER USER <username> UNSET NETWORK_POLICY."

---

## Q96
**Answer:** A
**Explanation:** SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY retains login event data for 365 days (1 year) by default. This makes it directly suitable for SOC 2 audit requirements for 1-year login audit trail retention. SESSIONS data in ACCOUNT_USAGE is also retained for 365 days, but LOGIN_HISTORY specifically captures authentication events. Snowflake Trail streams events to external destinations; INFORMATION_SCHEMA.LOGIN_HISTORY only has 7-day retention.
**Source:** [ACCOUNT_USAGE Retention Periods](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "The ACCOUNT_USAGE.LOGIN_HISTORY view retains data for 365 days."

---

## Q97
**Answer:** A
**Explanation:** SNOWFLAKE.GOVERNANCE_VIEWER is a database role on the SNOWFLAKE system database that grants read access to ACCOUNT_USAGE views related to governance, security, and monitoring. This role is specifically designed for security and compliance monitoring without granting full ACCOUNTADMIN. ACCOUNT_USAGE_VIEWER provides similar access. SECURITY_ADMIN and MONITOR are not database roles on the SNOWFLAKE database.
**Source:** [SNOWFLAKE Database Roles](https://docs.snowflake.com/en/sql-reference/snowflake-db-roles)
**Quote:** "SNOWFLAKE.GOVERNANCE_VIEWER: A database role that grants read-only access to ACCOUNT_USAGE views relevant to governance and security monitoring."

---

## Q98
**Answer:** B
**Explanation:** The correct approach is to create a SAML2 security integration for Azure AD SSO, then use authentication policies to enforce SAML authentication for interactive users (AUTHENTICATION_METHODS = ('SAML')) while allowing password-based authentication for service accounts (AUTHENTICATION_METHODS = ('PASSWORD')). This combination allows per-user differentiation. Option A (SAML2_ENABLE_SP_INITIATED) is a specific configuration flag for SP-initiated SSO flows, not a mechanism for enforcing auth methods per user type. Option C describes a non-existent parameter.
**Source:** [SAML2 Authentication and Authentication Policies](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)
**Quote:** "Use authentication policies to require specific authentication methods for different users, for example enforcing SAML for human users while allowing PASSWORD for service accounts."

---

## Q99
**Answer:** B
**Explanation:** When sharing objects in Snowflake, only database roles (not account roles) can be granted to a SHARE. Database roles are scoped to the specific database being shared and allow consumers to access exactly the objects within that database that the database role has privileges on. Account roles cannot be granted to shares. This is a deliberate design to ensure that data sharing consumers receive scoped, database-level access only.
**Source:** [Data Sharing and Database Roles](https://docs.snowflake.com/en/user-guide/data-sharing-intro)
**Quote:** "Only database roles can be granted to a share. Account roles cannot be granted to shares."

---

## Q100
**Answer:** B
**Explanation:** Creating a user-level network policy for the vendor's Snowflake user that allows 198.51.100.50 is the least-risk approach. The user-level policy takes precedence for that specific user, while the account-level policy remains unchanged for all other users. This is more targeted and lower-risk than modifying the account-level policy (which affects all users) or disabling it entirely. Using a trial account for data transfers (C) is operationally complex and may not meet security requirements.
**Source:** [Network Policy User-Level Override](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "A user-level network policy overrides the account-level network policy for that user, allowing exceptions without modifying the account-wide policy."

---

## Q101
**Answer:** C
**Explanation:** To CREATE TABLE in a schema, a role needs: (1) USAGE on the database, (2) USAGE on the schema, and (3) CREATE TABLE privilege on the schema. The question specifically asks which privilege is required ON A SCHEMA to create tables. That privilege is CREATE TABLE (granted on the schema). USAGE on the schema is also required but is separately needed for navigation. MODIFY grants the ability to alter existing schema properties. OWNERSHIP is broader than necessary.
**Source:** [Schema Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#schema-privileges)
**Quote:** "CREATE TABLE: Enables creating a new table in the schema. This privilege must be granted on the schema."

---

## Q102
**Answer:** B
**Explanation:** Per organizational policy requiring role assignments to flow through role hierarchies, the direct role grant to the user should be revoked and the role should instead be granted to an appropriate parent role in the hierarchy. The user would then inherit the role through the hierarchy. Documenting as an exception (A) violates the policy. Creating a shadow role (C) doubles the complexity. Session policies (D) cannot prevent role activation.
**Source:** [Role Hierarchy Best Practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Best practice is to assign roles through role hierarchies rather than directly to users, ensuring consistent privilege management."

---

## Q103
**Answer:** A
**Explanation:** CREATE ROLE is the Snowflake account-level privilege that allows a role to create new roles. This privilege is held by USERADMIN and SECURITYADMIN (which inherits USERADMIN). Custom roles can also be granted CREATE ROLE if needed. MANAGE GRANTS allows granting/revoking privileges but not creating new roles. OWNERSHIP ON ROLE allows the owning role to drop or manage an existing role. CREATE CHILD ROLE does not exist in Snowflake.
**Source:** [Account-Level Privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#account-privileges)
**Quote:** "CREATE ROLE: Enables the role to create new roles in the account."

---

## Q104
**Answer:** A
**Explanation:** For a multi-tenant SaaS application with a single Snowflake user, row-access policies are the correct mechanism for enforcing tenant isolation. The policy filters rows based on the current session user or context variables (e.g., CURRENT_USER() matched to a tenant mapping table). The single user queries any schema but the row-access policy ensures they only see rows belonging to their tenant context. USE ROLE per request (B) requires many pre-created roles and is not scalable for large tenant counts.
**Source:** [Row Access Policies](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row access policies filter results based on runtime context (e.g., CURRENT_USER()), enabling multi-tenant data isolation with a single database user."

---

## Q105
**Answer:** B
**Explanation:** A SAML2 security integration is used specifically to configure Snowflake as a service provider (SP) for SAML 2.0 federated single sign-on. It specifies the IdP metadata, SSO URL, x.509 certificate, and related SAML configuration. Storage integrations connect to cloud storage. External access integrations enable outbound network access from code. OAuth security integrations support delegated authorization flows, not federated SSO directly.
**Source:** [SAML2 Security Integration](https://docs.snowflake.com/en/sql-reference/sql/create-security-integration-saml2)
**Quote:** "A SAML2 security integration configures Snowflake as a SAML 2.0 service provider for federated authentication with an external identity provider."

---

## Q106
**Answer:** A, D
**Explanation:** Immediate actions when an unauthorized ACCOUNTADMIN grant is discovered: (A) REVOKE ROLE ACCOUNTADMIN FROM USER JOHN_DOE to remove the unauthorized privilege immediately; and (D) query ACCOUNT_USAGE.QUERY_HISTORY filtered on ROLE_NAME = 'ACCOUNTADMIN' and USER_NAME = 'JOHN_DOE' to understand what actions were taken with the unauthorized role. Disabling the user (B) is appropriate if malicious intent is confirmed. DROP ROLE ACCOUNTADMIN (C) would break the account. GRANTS_TO_ROLES (E) shows grants, not actions taken.
**Source:** [Incident Response](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "To investigate unauthorized privilege use, query QUERY_HISTORY filtered by the role and user in question to enumerate all actions taken."

---

## Q107
**Answer:** B
**Explanation:** ALLOW_CLIENT_MFA_CACHING is a Snowflake account-level parameter that, when enabled, allows MFA tokens to be cached on the client machine for a specified period. This reduces the frequency of MFA push notifications for users who connect frequently from the same device (e.g., developers running multiple SnowSQL queries). It does not cache credentials server-side, bypass MFA for specific IPs, or affect JDBC in-memory credential caching.
**Source:** [MFA Token Caching](https://docs.snowflake.com/en/user-guide/security-mfa)
**Quote:** "ALLOW_CLIENT_MFA_CACHING enables client-side caching of MFA tokens, reducing the frequency of MFA prompts for repeated connections."

---

## Q108
**Answer:** C, E
**Explanation:** For recovery: (E) UNDROP TABLE is the correct command to restore a recently dropped table, available if within the Time Travel retention period. For prevention: (C) revoke DROP TABLE privilege from DATA_ANALYST and implement a change management process for production privilege grants. Option A (clone AT BEFORE STATEMENT) also recovers data but is more complex than UNDROP. Option B (Fail-safe) requires Snowflake Support and is for disaster recovery, not self-service recovery of accidental drops.
**Source:** [Time Travel and UNDROP](https://docs.snowflake.com/en/user-guide/data-time-travel)
**Quote:** "UNDROP TABLE restores a dropped table if it is within the Time Travel retention period. This is the primary self-service recovery mechanism for accidentally dropped tables."

---

## Q109
**Answer:** D
**Explanation:** Authentication policies are available on all Snowflake editions, including Standard. They do not require Enterprise, Business Critical, or VPS editions. This ensures that organizations using any Snowflake tier can implement authentication controls such as enforcing MFA, restricting authentication methods to key-pair, or requiring specific client types.
**Source:** [Authentication Policies](https://docs.snowflake.com/en/user-guide/authentication-policies)
**Quote:** "Authentication policies are supported on all Snowflake editions."

---

## Q110
**Answer:** B
**Explanation:** To satisfy both requirements with minimal objects: create one account-level network policy allowing 192.0.2.0/24 (corporate IP), and create a separate user-level network policy for the SYSADMIN user allowing both 192.0.2.0/24 and 52.94.0.0/15 (AWS Lambda range). The user-level policy overrides the account-level policy for SYSADMIN only. Option A with a single account-level policy allowing both ranges would allow Lambda IPs for all users, not just SYSADMIN. Option B with minimal objects (two policies) is the correct approach.
**Source:** [Network Policy User-Level Override](https://docs.snowflake.com/en/user-guide/network-policies)
**Quote:** "A user-level network policy takes precedence over the account-level policy for that specific user, enabling exceptions for individual users."
