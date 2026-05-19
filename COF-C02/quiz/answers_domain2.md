## Q1

**Answer: A**

**Explanation:** Network policies are the Snowflake mechanism for controlling inbound network access. You create network rules containing IP ranges, then add those rules to a network policy's allowed or blocked list, and finally activate the policy on an account, user, or security integration. Setting IP restrictions on individual user objects or using cloud provider firewalls alone is not the Snowflake-native approach.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "A security administrator (or higher) can use a network policy to allow or deny access to a request based on its origin. The allowed list of the network policy controls which requests are allowed to access the Snowflake service or internal stage, while the blocked list controls which requests should be explicitly blocked."
---
## Q2

**Answer: B**

**Explanation:** Network policy precedence in Snowflake follows the rule that more specific policies override more general ones. The order is: Security Integration (most specific) > User > Account (most general). Since the user-level policy is more specific than the account-level policy, it takes precedence and the connection is blocked.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "You can apply a network policy to an account, a security integration, or a user. If there are network policies applied to more than one of these, the most specific network policy overrides more general network policies. The following summarizes the order of precedence: Account ... User: Network policies applied to a user override network policies applied to the account."
---
## Q3

**Answer: B**

**Explanation:** Snowflake's MFA is designed for human users who use password authentication. Service users (non-human/programmatic users) should use alternative authentication methods like key pair authentication. MFA supports multiple methods (not just Duo), and for accounts created after the 2024_08 bundle, MFA enrollment is required by default for human users.

**Source:** [Multi-factor authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "MFA is intended for human users who authenticate with a password. Service users must use another form of authentication."
---
## Q4

**Answer: B, D**

**Explanation:** Snowflake supports three MFA methods: passkeys (recommended for security and usability), authenticator apps generating TOTP codes, and Duo. SMS text messages and direct biometric fingerprint scanning are not supported as MFA methods by Snowflake. Note that passkeys themselves may use biometrics on the device, but that is handled by the device, not Snowflake directly.

**Source:** [Multi-factor authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "Snowflake allows the following MFA methods: Authenticating with a passkey that can be stored and accessed in a variety of ways. Authenticating with an authenticator app that generates a time-based one-time passcode (TOTP). Authenticating with Duo."
---
## Q5

**Answer: B**

**Explanation:** In a federated authentication environment, the Identity Provider (IdP) is the external entity responsible for creating/maintaining user credentials and authenticating users for SSO access to the Service Provider (Snowflake). Snowflake itself serves as the Service Provider (SP) in this relationship.

**Source:** [Overview of federated authentication and SSO](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Identity provider (IdP): The external, independent entity responsible for providing the following services to the SP: Creating and maintaining user credentials and other profile information. Authenticating users for SSO access to the SP."
---
## Q6

**Answer: B**

**Explanation:** While Snowflake supports most SAML 2.0-compliant vendors as identity providers, only Okta and Microsoft Entra ID (formerly Azure AD) have native built-in Snowflake support. Other providers like Google G Suite, OneLogin, and Ping Identity are supported but require defining a custom application for Snowflake in the IdP.

**Source:** [Overview of federated authentication and SSO](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "The following vendors provide native Snowflake support for federated authentication and SSO: Okta, Microsoft Entra ID."
---
## Q7

**Answer: B**

**Explanation:** Snowflake key pair authentication requires a minimum of a 2048-bit RSA key pair. Keys smaller than 2048-bit (such as 1024-bit or 512-bit) do not meet Snowflake's security requirements. While larger keys like 4096-bit are supported, 2048-bit is the documented minimum.

**Source:** [Key-pair authentication and key-pair rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "This authentication method requires, as a minimum, a 2048-bit RSA key pair."
---
## Q8

**Answer: A**

**Explanation:** Snowflake supports key pair rotation by allowing up to 2 active public keys per user through the RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2 parameters. This enables zero-downtime rotation: you assign a new key to the unused parameter, update your client to use the new private key, and then remove the old public key.

**Source:** [Key-pair authentication and key-pair rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Snowflake supports multiple active keys to allow for uninterrupted rotation. Currently, you can use the RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2 parameters for ALTER USER to associate up to 2 public keys with a single user."
---
## Q9

**Answer: B**

**Explanation:** Snowflake uses the SAML 2.0 protocol for federated authentication and SSO. While Snowflake does support OAuth for other purposes (such as Snowflake OAuth for client authentication), the federated SSO mechanism is built on SAML 2.0. Security integrations of type SAML2 are created to configure this.

**Source:** [Overview of federated authentication and SSO](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Snowflake supports most SAML 2.0-compliant vendors as an IdP."
---
## Q10

**Answer: A, B**

**Explanation:** Snowflake provides two approaches for administrators to help users locked out of MFA: (1) temporarily bypass MFA using ALTER USER ... SET MINS_TO_BYPASS_MFA, which allows single-factor password login for a specified number of minutes, and (2) ALTER USER ... ENROLL MFA, which prompts the user to set up a new MFA method via email or a URL.

**Source:** [Multi-factor authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "If an administrator needs to temporarily disable MFA for a user, they can execute an ALTER USER … SET MINS_TO_BYPASS_MFA statement." and "When a user does not have access to their MFA method and needs to set up a new one, the administrator executes an ALTER USER … ENROLL MFA statement."
---
## Q11

**Answer: B**

**Explanation:** When an IP address is added to the allowed list, all other IPv4 addresses are automatically blocked without needing to specify them in a blocked list. This is an implicit deny-all-others behavior. Only the IP addresses in the allowed list can connect.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "When you add a network rule to the allowed list of a network policy, you do not have to use the blocked list to explicitly block other identifiers of the same type; only the allowed identifiers have access."
---
## Q12

**Answer: B**

**Explanation:** Authentication policies in Snowflake control MFA requirements and allowed MFA methods. Through the MFA_POLICY parameter with ALLOWED_METHODS, administrators can restrict which MFA methods (passkey, TOTP, Duo) users can use. Network policies control network access, session policies manage session behavior, and password policies govern password complexity.

**Source:** [Multi-factor authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "As an administrator, you can use an authentication policy to control which MFA methods can be used as a second factor of authentication."
---
## Q13

**Answer: A**

**Explanation:** Snowflake combines three access control models: DAC (objects have owners who can grant access), RBAC (privileges assigned to roles, roles assigned to users), and UBAC (privileges can be assigned directly to users, considered when USE SECONDARY ROLE is set to ALL). MAC (Mandatory Access Control) and ABAC (Attribute-Based Access Control) are not part of Snowflake's framework.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Snowflake's approach to access control combines aspects from the following models: Discretionary Access Control (DAC), Role-based Access Control (RBAC), User-based Access Control (UBAC)."
---
## Q14

**Answer: B**

**Explanation:** In Snowflake's DAC model, ownership means a role has the OWNERSHIP privilege on the object. By default, this is the role that was active when the object was created. Ownership can be transferred using GRANT OWNERSHIP. It is a role (not a user) that owns objects, and ACCOUNTADMIN does not automatically own all objects.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "To own an object means that a role has the OWNERSHIP privilege on the object. Each securable object is owned by a single role, which by default is the role used to create the object."
---
## Q15

**Answer: B, C**

**Explanation:** ACCOUNTADMIN encapsulates both SYSADMIN and SECURITYADMIN, making it the top-level role in the account. However, it is explicitly NOT a superuser role — it only allows access to objects if it (or a lower role in the hierarchy) has the necessary privileges. ACCOUNTADMIN should be granted to a limited number of users who use MFA, and it cannot be dropped.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "ACCOUNTADMIN: Role that encapsulates the SYSADMIN and SECURITYADMIN system-defined roles. It is the top-level role in the system and should be granted only to a limited/controlled number of users in your account." and "All users assigned the ACCOUNTADMIN role should also be required to use multi-factor authentication (MFA) for login."
---
## Q16

**Answer: C**

**Explanation:** SECURITYADMIN is the system-defined role that holds the global MANAGE GRANTS privilege, enabling it to grant or revoke privileges on any object in the account. While ACCOUNTADMIN inherits this capability (since SECURITYADMIN is a child role), the MANAGE GRANTS privilege is specifically granted to SECURITYADMIN.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "The security administrator (SECURITYADMIN system-defined) role includes the global MANAGE GRANTS privilege to grant or revoke privileges on objects in the account."
---
## Q17

**Answer: B**

**Explanation:** SYSADMIN is designed for creating and managing infrastructure objects like warehouses, databases, schemas, and tables. User and role management is the responsibility of USERADMIN, while security policies are managed by SECURITYADMIN. Billing and resource monitors are managed by ACCOUNTADMIN.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "The system administrator (SYSADMIN) role includes the privileges to create warehouses, databases, and all database objects (schemas, tables, and so on)."
---
## Q18

**Answer: A, E**

**Explanation:** The PUBLIC role is special in Snowflake: it is automatically granted to every user and every role, and it cannot be revoked or dropped. Any privileges or objects granted to PUBLIC become effectively available to everyone in the account. PUBLIC can own objects (objects can be created using the PUBLIC role).

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "PUBLIC: Automatically granted to every user and every role in your account." — [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)"
---
## Q19

**Answer: C**

**Explanation:** When a custom role is created in isolation (not granted to any other role in the hierarchy), its privileges are not inherited by any higher role — including ACCOUNTADMIN and SYSADMIN. Best practice is to grant custom roles to SYSADMIN so that object management flows naturally through the role hierarchy.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "By default, not even the ACCOUNTADMIN role can modify or drop objects created by a custom role. The custom role must be granted to the ACCOUNTADMIN role directly or, preferably, to another role in a hierarchy with the SYSADMIN role as the parent."
---
## Q20

**Answer: A**

**Explanation:** The correct Snowflake SQL syntax is `GRANT SELECT ON TABLE my_table TO ROLE analyst;`. The keyword READ is not a valid privilege for tables (SELECT is used for read access). Privileges are granted TO ROLE (not TO USER in standard RBAC), and the FOR keyword is not part of the GRANT syntax.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "GRANT <privileges> ... TO ROLE" — The standard syntax for granting privileges in Snowflake uses GRANT followed by the privilege, ON the object type and name, TO ROLE and the role name."
---
## Q21

**Answer: C**

**Explanation:** Managed access schemas provide centralized privilege management. Unlike regular schemas where object owners can grant privileges on their objects, in managed access schemas, only the schema owner or a role with MANAGE GRANTS can grant privileges. This enforces tighter governance over who can share access to data.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "In a managed access schema, object owners lose the ability to make grant decisions. Only the schema owner (the role with the OWNERSHIP privilege on the schema) or a role with the MANAGE GRANTS privilege can grant privileges on objects in the schema."
---
## Q22

**Answer: A, C**

**Explanation:** In Snowflake's role hierarchy, when a role is granted to another role, the parent role inherits all privileges of the child role. This is how privilege inheritance works — through the grant hierarchy, not through ownership. A role owner does NOT automatically inherit the privileges of the owned role; inheritance only occurs through explicit role grants.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "Roles can be also granted to other roles, creating a hierarchy of roles. The privileges associated with a role are inherited by any roles above that role in the hierarchy." and "A role owner (the role that has the OWNERSHIP privilege on the role) does not inherit the privileges of the owned role. Privilege inheritance is only possible within a role hierarchy."
---
## Q23

**Answer: C**

**Explanation:** In the default system role hierarchy, USERADMIN is a child of SECURITYADMIN (meaning SECURITYADMIN is USERADMIN's direct parent). SECURITYADMIN and SYSADMIN are both children of ACCOUNTADMIN. This hierarchy ensures that security administration encompasses user administration capabilities.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "The user administrator (USERADMIN) role includes the privileges to create and manage users and roles... The USERADMIN role is a child of this role [SECURITYADMIN] in the default access control hierarchy."
---
## Q24

**Answer: A, B, C**

**Explanation:** To query a table in Snowflake, you need three minimum privileges: USAGE on the containing database, USAGE on the containing schema, and SELECT on the table itself. OWNERSHIP is not required (it grants all privileges but is not the minimum needed). CREATE TABLE and MONITOR are not needed for querying.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "All securable database objects... are contained within a SCHEMA object within a DATABASE. As a result, to access database objects, in addition to the privileges on the specific database objects, users must be granted the USAGE privilege on the container database and schema."
---
## Q25

**Answer: B**

**Explanation:** A Snowflake organization is a first-class object that links multiple accounts owned by the same business entity. It simplifies management of accounts across different regions and cloud platforms, enables cross-account replication and failover, facilitates data sharing, and provides unified billing visibility.

**Source:** [Introduction to organizations](https://docs.snowflake.com/en/user-guide/organizations)

**Quote:** "An organization is a first-class Snowflake object that links the accounts owned by your business entity. Organizations simplify account management and billing, Replication and Failover/Failback, Snowflake Secure Data Sharing, and other account administration tasks."
---
## Q26

**Answer: B, C**

**Explanation:** Secure views have two key characteristics: (1) the view definition is hidden from unauthorized users and visible only to the role that owns the view, and (2) internal optimizations that could indirectly expose underlying data are disabled. Secure views do NOT improve performance — they actually may execute more slowly. They do not encrypt data, and any role with appropriate privileges can create them.

**Source:** [Working with Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "Secure views do not utilize these optimizations, ensuring that users have no access to the underlying data." and "With secure views, the view definition and details are visible only to authorized users (i.e. users who are granted the role that owns the view)."
---
## Q27

**Answer: B**

**Explanation:** The key trade-off with secure views is performance. Because secure views bypass certain internal optimizations that could potentially expose underlying data, they may execute more slowly than their non-secure counterparts. This is why Snowflake recommends using secure views only when data privacy requires it, not for general query convenience.

**Source:** [Working with Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "Secure views can execute more slowly than non-secure views."
---
## Q28

**Answer: A, C**

**Explanation:** Two key differences between ACCOUNT_USAGE and INFORMATION_SCHEMA: (1) INFORMATION_SCHEMA has no data latency while ACCOUNT_USAGE has 45 minutes to 3 hours of latency, and (2) ACCOUNT_USAGE retains data for up to 1 year while INFORMATION_SCHEMA retains from 7 days to 6 months. Additionally, ACCOUNT_USAGE includes dropped objects while INFORMATION_SCHEMA does not (the reverse of option B).

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "Difference: Account Usage — Latency of data: From 45 minutes to 3 hours (varies by view); Information Schema — None." and "Difference: Account Usage — Retention of historical data: 1 Year; Information Schema — From 7 days to 6 months (varies by view/table function)."
---
## Q29

**Answer: B**

**Explanation:** The ACCOUNT_USAGE schema resides in the SNOWFLAKE shared database, which is a system-provided database. This is different from INFORMATION_SCHEMA, which exists in every user-created database. To access ACCOUNT_USAGE views, users need IMPORTED PRIVILEGES on the SNOWFLAKE database or specific Snowflake database roles.

**Source:** [Account Usage](https://docs.snowflake.com/en/sql-reference/account-usage)

**Quote:** "ACCOUNT_USAGE: Views that display object metadata and usage metrics for your account." — The ACCOUNT_USAGE schema is located within the shared SNOWFLAKE database."
---
## Q30

**Answer: A, C**

**Explanation:** The ACCESS_HISTORY view tracks both read and write operations. It records which objects were directly and indirectly accessed during reads, and which objects were modified during writes (INSERT, UPDATE, DELETE, COPY). The view requires Enterprise Edition or higher (not available in Standard), has up to 3 hours of data latency (not real-time), and retains data for 1 year (not 7 days).

**Source:** [Access History](https://docs.snowflake.com/en/user-guide/access-history)

**Quote:** "Access History in Snowflake refers to when the user query reads data and when the SQL statement performs a data write operation, such as INSERT, UPDATE, and DELETE along with variations of the COPY command, from the source data object to the target data object."
---
## Q31

**Answer: A, C**

**Explanation:** In the ACCESS_HISTORY view, read operations are tracked through the direct_objects_accessed column (objects directly referenced in the query) and base_objects_accessed column (underlying source tables). The objects_modified column tracks write operations, object_modified_by_ddl tracks DDL changes, and policies_referenced tracks policy usage.

**Source:** [Access History](https://docs.snowflake.com/en/user-guide/access-history)

**Quote:** "Read operations are tracked through the first five columns" including "direct_objects_accessed" and "base_objects_accessed", "while the last column, objects_modified, specifies the data write information."
---
## Q32

**Answer: B**

**Explanation:** A masking policy is a schema-level object that provides column-level security through Dynamic Data Masking. It selectively masks data in columns at query time, meaning the actual stored data is not modified. Depending on the conditions in the policy and the querying user's role, the data can appear as plain text, partially masked, or fully masked.

**Source:** [Understanding Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature that uses masking policies to selectively mask plain-text data in table and view columns at query time."
---
## Q33

**Answer: C**

**Explanation:** In Snowflake, each column can have exactly one masking policy applied at a time. If you want to change the masking policy on a column, you must first unset the existing policy before applying a new one. This ensures there is no ambiguity about which masking behavior applies to a given column.

**Source:** [Understanding Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "A column cannot be attached to multiple masking policies."
---
## Q34

**Answer: C**

**Explanation:** Row access policies are schema-level objects that control row visibility in query results. They apply to SELECT and to rows selected by UPDATE, DELETE, and MERGE. Importantly, they do NOT prevent rows from being inserted, and they can be applied to both tables and views. The policy expression is evaluated using the role of the policy owner, not the query operator.

**Source:** [Understanding row access policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "A row access policy is a schema-level object that determines whether a given row in a table or view can be viewed from the following types of statements: SELECT statements, Rows selected by UPDATE, DELETE, and MERGE statements."
---
## Q35

**Answer: B**

**Explanation:** Tags in Snowflake are schema-level objects that store metadata as key-value pairs, where the tag name is the key and the value is always a string. Tags can be assigned to many different object types (not just tables), and while they can be automatically set during data classification, they can also be manually created and assigned by users.

**Source:** [Introduction to object tagging](https://docs.snowflake.com/en/user-guide/object-tagging/introduction)

**Quote:** "A tag is a schema-level object that can be assigned to another Snowflake object. Users associate a tag with an arbitrary string value when assigning the tag to a Snowflake object. Snowflake stores the tag and its string value as a key-value pair."
---
## Q36

**Answer: A, C**

**Explanation:** Tag inheritance in Snowflake follows the securable object hierarchy from top to bottom. Tags set on a table are inherited by its columns, and tags set on a database are inherited by its schemas and all objects within. Inheritance flows downward only (not from columns to tables). Tag inheritance is available in all editions, though tag-based masking policies and tag propagation require Enterprise Edition.

**Source:** [Introduction to object tagging](https://docs.snowflake.com/en/user-guide/object-tagging/introduction)

**Quote:** "Tag inheritance: Because tags are inherited, applying the tag to objects higher in the securable objects hierarchy results in the tag being applied to all child objects. For example, if a tag is set on a table, the tag will be inherited by all columns in that table."
---
## Q37

**Answer: C**

**Explanation:** ACCOUNTADMIN sits at the top of the system role hierarchy and encapsulates both SYSADMIN and SECURITYADMIN. It is the most powerful role in the system. Best practice is to limit who has this role, require MFA for all users with it, and not use it for everyday work.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "ACCOUNTADMIN (aka Account Administrator): Role that encapsulates the SYSADMIN and SECURITYADMIN system-defined roles. It is the top-level role in the system and should be granted only to a limited/controlled number of users in your account."
---
## Q38

**Answer: B, C**

**Explanation:** SECURITYADMIN holds the MANAGE GRANTS privilege and USERADMIN is its child role in the default hierarchy. SECURITYADMIN does NOT create warehouses or databases (that is SYSADMIN's domain). SECURITYADMIN is a child of ACCOUNTADMIN, not of SYSADMIN.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "SECURITYADMIN (aka Security Administrator): Role that can manage any object grant globally, as well as create, monitor, and manage users and roles. More specifically, this role: Is granted the MANAGE GRANTS security privilege to be able to modify any grant, including revoking it. Inherits the privileges of the USERADMIN role via the system role hierarchy (that is, USERADMIN role is granted to SECURITYADMIN)."
---
## Q39

**Answer: B**

**Explanation:** Snowflake strongly recommends granting custom roles to SYSADMIN (or a role in a hierarchy leading to SYSADMIN) so that system administrators can manage objects created by those roles. If the custom role remains isolated, no higher role — including ACCOUNTADMIN — can modify or drop its objects by default.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "By default, not even the ACCOUNTADMIN role can modify or drop objects created by a custom role. The custom role must be granted to the ACCOUNTADMIN role directly or, preferably, to another role in a hierarchy with the SYSADMIN role as the parent."
---
## Q40

**Answer: C**

**Explanation:** TRUNCATE is a distinct privilege in Snowflake required to execute the TRUNCATE TABLE command. It is separate from DELETE, which requires the DELETE privilege. OWNERSHIP would also allow it (since OWNERSHIP grants all privileges), but TRUNCATE is the minimum required privilege.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges)

**Quote:** "TRUNCATE: Enables executing a TRUNCATE TABLE command on a table."
---
## Q41

**Answer: A, C**

**Explanation:** At the schema level, USAGE allows users to use (reference) the schema, and CREATE TABLE allows creating tables within it. SELECT and INSERT are table-level privileges, and REFERENCES is also a table-level privilege.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#schema-privileges)

**Quote:** "CREATE TABLE: Enables creating a new table in a schema, including by cloning." and "USAGE: Enables using a schema, including returning the schema details in the SHOW SCHEMAS command output."
---
## Q42

**Answer: B**

**Explanation:** To query a table, a user needs three minimum privileges: USAGE on the database, USAGE on the schema, and SELECT on the table. The engineer already has USAGE on the database and SELECT on the table, so the missing privilege is USAGE on the schema `public`.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations#accessing-database-objects)

**Quote:** "All securable database objects... are contained within a SCHEMA object within a DATABASE. As a result, to access database objects, in addition to the privileges on the specific database objects, users must be granted the USAGE privilege on the container database and schema."
---
## Q43

**Answer: B**

**Explanation:** Future grants automatically grant privileges on newly created objects to a specified role, without requiring explicit grants every time a new object is added. They can be configured by any role with appropriate privileges (not just ACCOUNTADMIN), and they support many object types beyond just tables and views.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations#simplifying-grant-management-using-future-grants)

**Quote:** "Future grants allow defining an initial set of privileges on objects of a certain type (for example tables or views) in a specified schema. As new objects are created, the defined privileges are automatically granted to a role, simplifying grant management."
---
## Q44

**Answer: B**

**Explanation:** The correct Snowflake SQL syntax for removing a privilege from a role is `REVOKE <privilege> ON <object_type> <object_name> FROM ROLE <role_name>;`. REMOVE, DROP, and DELETE are not valid SQL keywords for privilege management in Snowflake.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "REVOKE <privileges> … FROM ROLE: removes privileges"
---
## Q45

**Answer: A, D**

**Explanation:** At the database level, USAGE allows using the database and CREATE SCHEMA allows creating schemas within it. MODIFY allows altering database settings. SELECT, TRUNCATE are not database-level privileges — they apply to tables.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#database-privileges)

**Quote:** "CREATE SCHEMA: Enables creating a new schema in a database, including cloning a schema." and "USAGE: Enables using a database, including returning the database details in the SHOW DATABASES command output. Additional privileges are required to view or take actions on objects in a database."
---
## Q46

**Answer: B**

**Explanation:** When an IP address appears in both the allowed and blocked lists of a network policy, the blocked list takes precedence and the connection is denied. This applies to both the legacy ALLOWED_IP_LIST/BLOCKED_IP_LIST parameters and the newer network rule lists.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "If a network policy has the same IP address values in both the ALLOWED_IP_LIST and the BLOCKED_IP_LIST parameters, Snowflake applies the values in the BLOCKED_IP_LIST parameter first. This behavior also applies to the ALLOWED_NETWORK_RULE_LIST and the BLOCKED_NETWORK_RULE_LIST parameters."
---
## Q47

**Answer: A**

**Explanation:** The MINS_TO_BYPASS_NETWORK_POLICY parameter allows temporarily bypassing a network policy for a user, but critically, only Snowflake Support can set this value — administrators cannot set it themselves. This is by design to prevent administrators from accidentally locking themselves out or bypassing security controls.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "It is possible to temporarily bypass a network policy for a set number of minutes by configuring the user object property MINS_TO_BYPASS_NETWORK_POLICY... Only Snowflake can set the value for this object property. Please contact Snowflake Support to set a value for this property."
---
## Q48

**Answer: B**

**Explanation:** The network policy precedence order in Snowflake (from most to least specific) is: Security Integration > User > Account. A network policy applied to a security integration overrides both account-level and user-level policies, so if the integration policy blocks the IP, access is denied.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "Security Integration: Network policies applied to a security [integration] are the most specific network policies. They override both accounts and users."
---
## Q49

**Answer: A, B, D**

**Explanation:** Network policies in Snowflake can be applied to three levels: account (most general), user, and security integration (most specific). Tables and schemas are not levels at which network policies can be applied.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "You can apply a network policy to an account, a security integration, or a user. If there are network policies applied to more than one of these, the most specific network policy overrides more general network policies."
---
## Q50

**Answer: B**

**Explanation:** Creating network policies requires either the SECURITYADMIN role (or higher, such as ACCOUNTADMIN) or a custom role that has been granted the global CREATE NETWORK POLICY privilege. USERADMIN and SYSADMIN do not have this privilege by default.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "Only security administrators (i.e. users with the SECURITYADMIN role) or higher or a role with the global CREATE NETWORK POLICY privilege can create network policies."
---
## Q51

**Answer: C**

**Explanation:** Snowflake encrypts all customer data at rest using AES-256 (strong AES encryption). The encryption key management uses a hierarchical key model rooted in a cloud-provider-hosted hardware security module (HSM). No configuration is required — encryption is automatic and always on.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Snowflake uses strong AES encryption with a hierarchical key model rooted in a cloud-provider-hosted hardware security module."
---
## Q52

**Answer: B**

**Explanation:** Tri-Secret Secure is a feature that creates a composite master key from two sources: a Snowflake-maintained key and a customer-managed key (CMK) stored in the customer's cloud provider key management service (AWS KMS, Azure Key Vault, or GCP Cloud KMS). Both keys must be available to decrypt data.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "When enabled, the combination of a Snowflake-maintained key and a customer-managed key creates a composite master key to protect customer data in Snowflake. This is called Tri-Secret Secure."
---
## Q53

**Answer: C**

**Explanation:** Tri-Secret Secure requires Business Critical Edition or higher. It is not available on Standard or Enterprise editions. This feature is designed for organizations with the most stringent security and regulatory compliance requirements.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "A customer-managed key (CMK) is a master encryption key that the customer maintains in the key management service for the cloud provider that hosts the customer's Snowflake account... When this occurs, Snowflake refers to this as Tri-Secret Secure."
---
## Q54

**Answer: B**

**Explanation:** Snowflake automatically rotates encryption keys every 30 days. When a key is rotated, it becomes "retired" (used only for decryption) and a new active key is created for encryption. This limits the duration any single key is used for encryption, following NIST recommendations.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Keys in the Snowflake-managed key hierarchy are automatically rotated by Snowflake when they are more than 30 days old. Active keys are retired, and new keys are created."
---
## Q55

**Answer: B, C**

**Explanation:** Two key benefits of customer-managed keys are: (1) complete customer control over the master key means you control your data, and (2) in a security breach, revoking or disabling the key immediately halts all Snowflake data operations. CMKs do not eliminate encryption — they add an additional layer. Snowflake still manages its own key as part of the composite.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Control over customer data access: You have complete control over your master key in the key management service and, therefore, your customer data in Snowflake. You must release this key to decrypt data stored in your Snowflake account." and "Disable access due to a customer data breach: If you experience a security breach, you can disable access to your key and halt all data operations running in your Snowflake account."
---
## Q56

**Answer: B**

**Explanation:** The Snowflake hierarchical key model flows from root key (highest) → account master keys → table master keys → file keys (lowest). Each higher layer encrypts (wraps) the layer below. The root key is stored in a cloud-provider-hosted hardware security module (HSM).

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Snowflake's hierarchical key model consists of four levels of keys: The root key, Account master keys, Table master keys, File keys."
---
## Q57

**Answer: B**

**Explanation:** Periodic rekeying (available in Enterprise Edition and higher) re-encrypts customer data when a retired key is older than one year. This differs from key rotation (which retires active keys every 30 days). Rekeying completes the key lifecycle by eventually destroying retired keys.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "If periodic rekeying is enabled, then when the retired encryption key for a table is older than one year, Snowflake automatically creates a new encryption key and re-encrypts all customer data previously protected by the retired key using the new key."
---
## Q58

**Answer: B**

**Explanation:** With OAuth authentication in Snowflake, access is verified using an OAuth access token. The driver is configured with `authenticator = oauth` and `token = <oauth_access_token>`. The access token is issued by the OAuth authorization server (either Snowflake OAuth or an external OAuth server) and presented to Snowflake for verification.

**Source:** [Introduction to OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "When OAuth is used to authenticate (successfully or unsuccessfully), the FIRST_AUTHENTICATION_FACTOR column in the output has the value OAUTH_ACCESS_TOKEN."
---
## Q59

**Answer: A, C**

**Explanation:** Snowflake natively supports two OAuth types: Snowflake OAuth (where Snowflake itself acts as the OAuth authorization server, used for partner tools like Tableau and PowerBI) and External OAuth (where a third-party authorization server like Okta, Azure AD, or Ping Identity issues tokens that Snowflake validates).

**Source:** [Introduction to OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "Snowflake supports the OAuth 2.0 protocol for authentication and authorization using one of the options below: Snowflake OAuth, External OAuth."
---
## Q60

**Answer: B**

**Explanation:** External OAuth is best suited for programmatic/service account authentication where browser-based redirects are not practical. An external OAuth authorization server issues tokens using flows like client credentials, which the client passes to Snowflake for authentication. This is distinct from SAML (used for SSO), MFA (for human users), and CMKs (for encryption).

**Source:** [Introduction to OAuth](https://docs.snowflake.com/en/user-guide/oauth)

**Quote:** "Programmatic clients: [External OAuth is the] Best fit" compared to Snowflake OAuth which "Requires a browser."
---
## Q61

**Answer: C**

**Explanation:** The USERADMIN role is purpose-built for user and role management, holding the CREATE USER and CREATE ROLE privileges. Creating users with ACCOUNTADMIN is not recommended as a best practice since ACCOUNTADMIN is intended for account-level configuration, not routine user management.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview#system-defined-roles)

**Quote:** "USERADMIN (aka User and Role Administrator): Role that is dedicated to user and role management only. More specifically, this role: Is granted the CREATE USER and CREATE ROLE security privileges. Can create users and roles in the account."
---
## Q62

**Answer: B**

**Explanation:** In Snowflake key pair authentication, the public key is assigned to the user's Snowflake user object using `ALTER USER <username> SET RSA_PUBLIC_KEY = '<public_key_value>';`. The private key stays on the client machine. Snowflake stores the public key and uses it to verify authentication challenges signed with the private key.

**Source:** [Key-pair authentication and key-pair rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Public key assigned to user via ALTER USER SET RSA_PUBLIC_KEY"
---
## Q63

**Answer: B**

**Explanation:** Zero-downtime key rotation is achieved by setting the new key in the RSA_PUBLIC_KEY_2 parameter while the original key remains active in RSA_PUBLIC_KEY. The client is then updated to use the new private key. Finally, the old public key is removed from RSA_PUBLIC_KEY. This process ensures no interruption to services.

**Source:** [Key-pair authentication and key-pair rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth)

**Quote:** "Snowflake supports multiple active keys to allow for uninterrupted rotation. Currently, you can use the RSA_PUBLIC_KEY and RSA_PUBLIC_KEY_2 parameters for ALTER USER to associate up to 2 public keys with a single user."
---
## Q64

**Answer: A, C**

**Explanation:** Programmatic/service accounts should use authentication methods that don't require human interaction. Key-pair authentication and External OAuth (client credentials flow) are both designed for programmatic access. MFA with Duo and SAML 2.0 SSO require browser-based human interaction, making them unsuitable for service accounts.

**Source:** [Multi-factor authentication (MFA)](https://docs.snowflake.com/en/user-guide/security-mfa)

**Quote:** "MFA is intended for human users who authenticate with a password. Service users must use another form of authentication."
---
## Q65

**Answer: B**

**Explanation:** The REFERENCES privilege allows viewing the structure (metadata) of a table and using it as a primary/unique key reference for foreign key constraints. It does NOT allow reading the actual data (SELECT is required for that), nor does it allow INSERT or DELETE operations.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges)

**Quote:** "REFERENCES: Enables referencing a table as the unique/primary key table for a foreign key constraint. Also enables viewing the structure of a table (but not the data) via the DESCRIBE or SHOW command or by querying the Information Schema."
---
## Q66

**Answer: B**

**Explanation:** When both a row access policy and masking policies are applied to a table, Snowflake always evaluates the row access policy first to determine which rows are visible. Then, for the visible rows, the masking policies are applied to columns to determine what data values are shown.

**Source:** [Understanding row access policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "When a database object has both a row access policy and one or more masking policies, Snowflake evaluates the row access policy first."
---
## Q67

**Answer: C**

**Explanation:** Both Dynamic Data Masking (masking policies) and row access policies require Enterprise Edition or higher. They are not available in Standard Edition. Business Critical Edition builds on Enterprise but is not the minimum requirement for these features.

**Source:** [Understanding Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature... [ENTERPRISE EDITION FEATURE] This feature requires Enterprise Edition (or higher)." and "Understanding row access policies... [ENTERPRISE EDITION FEATURE] This feature requires Enterprise Edition (or higher)."
---
## Q68

**Answer: B, C**

**Explanation:** Masking policies are schema-level objects (not database-level), applied to table and view columns to control what data users see at query time without modifying the stored data. A column can only have one masking policy applied at a time (not three). The data at rest is never modified.

**Source:** [Understanding Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature that uses masking policies to selectively mask plain-text data in table and view columns at query time." and "Depending on the masking policy conditions, the SQL execution context, and role hierarchy, Snowflake query operators may see the plain-text value, a partially masked value, or a fully masked value."
---
## Q69

**Answer: B**

**Explanation:** Dynamic Data Masking (masking policies) is the correct tool for showing different versions of a column's data to different roles. The masking policy can include CASE WHEN CURRENT_ROLE() = 'ADMIN' THEN email ELSE '***@***.com' END logic. Secure views hide the view definition but don't change column data based on role in this way. Row access policies filter entire rows, not specific column values.

**Source:** [Understanding Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking is a Column-level Security feature that uses masking policies to selectively mask plain-text data in table and view columns at query time."
---
## Q70

**Answer: C**

**Explanation:** IS_ROLE_IN_SESSION() is the recommended function for checking if a specific role is active in the current session, including inherited roles in the session hierarchy. CURRENT_ROLE() only returns the primary role, not secondary roles or inherited roles. HAS_ROLE() is not a Snowflake function.

**Source:** [Understanding row access policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "For these use cases, Snowflake recommends writing the policy conditions to call the IS_ROLE_IN_SESSION or the IS_DATABASE_ROLE_IN_SESSION function depending on whether you want to specify an account role or database role."
---
## Q71

**Answer: A, C**

**Explanation:** Row access policies require Enterprise Edition or higher (A is correct). A single policy can be applied to multiple tables and views simultaneously (C is correct). Row access policies do NOT prevent INSERT operations (B is wrong). They are schema-level objects, not table-level (D is wrong). They apply to DML (UPDATE, DELETE, MERGE) as well as SELECT (E is wrong).

**Source:** [Understanding row access policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "A row access policy is a schema-level object that determines whether a given row in a table or view can be viewed from the following types of statements: SELECT statements, Rows selected by UPDATE, DELETE, and MERGE statements." and "[ENTERPRISE EDITION FEATURE] This feature requires Enterprise Edition (or higher)."
---
## Q72

**Answer: C**

**Explanation:** Network rules are schema-level objects in Snowflake. They group network identifiers (like IP address ranges) into logical units. These rules are then added to network policies (which are separate objects), which can be applied at the account, user, or security integration level.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "While restrictions on incoming requests to Snowflake are ultimately applied to an account, user, or security integration with a network policy, the administrator can organize these restrictions using network rules, which are schema-level objects."
---
## Q73

**Answer: B**

**Explanation:** Activating (attaching) a network policy at the account level requires SECURITYADMIN or higher, or a role granted the global ATTACH POLICY privilege. SYSADMIN and USERADMIN do not have this privilege by default. Having OWNERSHIP on the network policy alone is not sufficient to activate it at the account level.

**Source:** [Controlling network traffic with network policies](https://docs.snowflake.com/en/user-guide/network-policies)

**Quote:** "Only security administrators (i.e. users with the SECURITYADMIN role) or higher or a role with the global ATTACH POLICY privilege can activate a network policy for an account."
---
## Q74

**Answer: B**

**Explanation:** Federated authentication (SSO) in Snowflake is configured by creating a security integration of type SAML2 using `CREATE SECURITY INTEGRATION type = SAML2 ...`. This is not a network policy, authentication policy, or OAuth integration. The security integration defines the connection between Snowflake (as the Service Provider) and the identity provider.

**Source:** [Overview of federated authentication and SSO](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Snowflake supports most SAML 2.0-compliant vendors as an IdP." — SAML2 security integrations are created using the CREATE SECURITY INTEGRATION command with type = SAML2."
---
## Q75

**Answer: A, C**

**Explanation:** Snowflake supports both Snowflake-initiated (where you start at Snowflake's login page) and IdP-initiated (where you start at the IdP's portal) SSO workflows. SAML2 security integrations support replication across accounts. User objects must still exist in Snowflake even with federated auth (the IdP only handles authentication, not Snowflake object management). Many IdPs beyond just Okta are supported.

**Source:** [Overview of federated authentication and SSO](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview)

**Quote:** "Identity provider (IdP)... SSO workflows: Snowflake-initiated login, IdP-initiated login" and "SAML2 security integrations can be replicated across accounts."
---
## Q76

**Answer: B**

**Explanation:** The WITH GRANT OPTION clause in a GRANT statement permits the recipient role to further grant that same privilege to other roles. For example, `GRANT SELECT ON TABLE t TO ROLE r1 WITH GRANT OPTION;` allows role r1 to grant SELECT on that table to other roles. Without this option, the grantee can use the privilege but cannot re-grant it.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "WITH GRANT OPTION: allows grantee to grant the same privilege to other roles"
---
## Q77

**Answer: B**

**Explanation:** The GRANTS_TO_ROLES view in SNOWFLAKE.ACCOUNT_USAGE tracks all privileges granted to roles across the account. This view is useful for auditing access control and monitoring privilege assignments. GRANTS_TO_USERS would track direct user grants; ROLES shows role definitions, not their grants.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "You can monitor privileges granted to roles, users, and applications using the GRANTS_TO_ROLES view in ACCOUNT_USAGE."
---
## Q78

**Answer: B, C**

**Explanation:** Two key ACCOUNTADMIN best practices are: (1) never make it the default role — force users to explicitly switch to it, and (2) assign it to at least two users so password resets can be managed internally. Using ACCOUNTADMIN for daily work, automated scripts, or skipping MFA are all anti-patterns explicitly discouraged by Snowflake.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Assign this role to at least two users. We follow strict security procedures for resetting a forgotten or lost password for users with the ACCOUNTADMIN role." and "To help prevent account administrators from inadvertently using the ACCOUNTADMIN role to create objects, assign these users additional roles and designate one of these roles as their default (do not make ACCOUNTADMIN the default role for any users in the system)."
---
## Q79

**Answer: B**

**Explanation:** Database roles scope privilege grants to a single database and cannot be activated directly in a session — they must be granted to account roles. Only account roles can hold OWNERSHIP on the database itself (not database roles). Database roles simplify data sharing and allow database owners to manage their own access control.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "Database roles are essentially the same as traditional roles created at the account level (custom account roles) except for their scope: To permit SQL actions on objects within a database, privileges can be granted to a database role in the same database." and "Note that database roles cannot be activated directly in a session. Grant database roles to account roles, which can be activated in a session."
---
## Q80

**Answer: B**

**Explanation:** This is a key and often misunderstood behavior: the row access policy expression is evaluated using the role of the policy owner (the role that owns the row access policy object), not the role of the user running the query. However, context functions like CURRENT_ROLE() and IS_ROLE_IN_SESSION() within the policy body evaluate the query operator's session context.

**Source:** [Understanding row access policies](https://docs.snowflake.com/en/user-guide/security-row-intro)

**Quote:** "Snowflake evaluates the policy expression by using the role of the policy owner, not the role of the operator who executed the query."
---
## Q81

**Answer: B**

**Explanation:** The MANAGE GRANTS privilege gives a role the ability to grant or revoke privileges on any object in the account, regardless of whether that role owns the object. This is the key privilege held by SECURITYADMIN. It does not grant object creation rights, billing access, or warehouse creation abilities.

**Source:** [Access control privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges)

**Quote:** "MANAGE GRANTS: Grants the ability to grant or revoke privileges on any object as if the invoking role were the owner of the object."
---
## Q82

**Answer: A, C**

**Explanation:** Objects have exactly one owner role at a time (not multiple), and ownership defaults to the role that created the object. Ownership can be transferred via GRANT OWNERSHIP. Any role (not just ACCOUNTADMIN) can own objects. Ownership is tracked at the role level, not the user level.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "To own an object means that a role has the OWNERSHIP privilege on the object. Each securable object is owned by a single role, which by default is the role used to create the object." and "The GRANT OWNERSHIP command lets you transfer the ownership of an object from one role to another role."
---
## Q83

**Answer: B**

**Explanation:** A managed access schema (created with WITH MANAGED ACCESS) removes the ability for individual object owners to grant access to their objects. All grant management is centralized to the schema owner or a role with MANAGE GRANTS. This provides stronger governance than regular schemas where object owners can freely share their objects.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "In a managed access schema, object owners lose the ability to make grant decisions. Only the schema owner (the role with the OWNERSHIP privilege on the schema) or a role with the MANAGE GRANTS privilege can grant privileges on objects in the schema, including future grants, centralizing privilege management."
---
## Q84

**Answer: B**

**Explanation:** SECURITYADMIN holds the MANAGE GRANTS privilege, which allows it to grant or revoke privileges on any object in the account — even objects it does not own. This is the purpose of MANAGE GRANTS: it enables centralized privilege management regardless of ownership. SECURITYADMIN does not need to take ownership of a table to grant privileges on it.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "The security administrator (SECURITYADMIN system-defined) role includes the global MANAGE GRANTS privilege to grant or revoke privileges on objects in the account."
---
## Q85

**Answer: C**

**Explanation:** Tag inheritance in Snowflake flows downward through the object hierarchy. Tags set on a database are inherited by all schemas within that database, and by all objects (tables, views, etc.) and columns within those schemas. Inheritance does not flow upward — tags on a column do not propagate to the parent table.

**Source:** [Introduction to object tagging](https://docs.snowflake.com/en/user-guide/object-tagging/introduction)

**Quote:** "Tag inheritance: Because tags are inherited, applying the tag to objects higher in the securable objects hierarchy results in the tag being applied to all child objects. For example, if a tag is set on a table, the tag will be inherited by all columns in that table."
---
## Q86

**Answer: B, D**

**Explanation:** Both Dynamic Data Masking (masking policies) and row access policies require Enterprise Edition or higher. Network policies, key pair authentication, and secure views are all available in Standard Edition and higher.

**Source:** [Understanding Dynamic Data Masking](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)

**Quote:** "Dynamic Data Masking... [ENTERPRISE EDITION FEATURE] This feature requires Enterprise Edition (or higher)." and "Understanding row access policies... [ENTERPRISE EDITION FEATURE] This feature requires Enterprise Edition (or higher)."
---
## Q87

**Answer: B**

**Explanation:** The primary security benefit of secure views is that the view definition (which could expose underlying table names, column names, filtering logic) is hidden from unauthorized users. Additionally, query plan optimizations that could indirectly expose data structures are disabled. This is critical for data sharing scenarios where consumers should not know the underlying data structure.

**Source:** [Working with Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "With secure views, the view definition and details are visible only to authorized users (i.e. users who are granted the role that owns the view)." and "Secure views do not utilize these optimizations, ensuring that users have no access to the underlying data."
---
## Q88

**Answer: A, B, C**

**Explanation:** The minimum three privileges to query a table are: USAGE on the containing database, USAGE on the containing schema, and SELECT on the table itself. CREATE TABLE is for creating new tables (not querying). OWNERSHIP grants all privileges and is not the minimum needed for read-only access.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "All securable database objects... are contained within a SCHEMA object within a DATABASE. As a result, to access database objects, in addition to the privileges on the specific database objects, users must be granted the USAGE privilege on the container database and schema."
---
## Q89

**Answer: B**

**Explanation:** A user's default role is the role that becomes the active primary role when a session is established without explicitly specifying a role. If no default role is set and no role is specified at connection, the PUBLIC role is used. Users can change their active role during a session using USE ROLE.

**Source:** [Overview of Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-overview)

**Quote:** "If no role was specified and a default role has been set for the connecting user, that role becomes the current role."
---
## Q90

**Answer: B, C**

**Explanation:** When cloning in Snowflake: (1) the cloned object itself does NOT inherit grants from the source object, but (2) when cloning a container like a database or schema, the grants on contained objects (tables, views, etc.) ARE retained in the clone. So cloning a database preserves table-level grants within it, but a cloned table does not inherit grants from the source table.

**Source:** [Access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)

**Quote:** "A cloned object is considered a new object in Snowflake. Any privileges granted on the source object do not transfer to the cloned object. However, a cloned container object (a database or schema) retains any privileges granted on the objects contained in the source object."
