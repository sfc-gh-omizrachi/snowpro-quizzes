## Q1

**Answer: B**

**Explanation:** Standard Edition only supports a Time Travel retention period of 0 or 1 day. The maximum is 1 day. Extended retention up to 90 days requires Enterprise Edition or higher and only applies to permanent objects.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Snowflake Standard Edition, the retention period can be set to 0 (or unset back to the default of 1 day) at the account and object level (that is, databases, schemas, and tables)."
---
## Q2

**Answer: B**

**Explanation:** After the Time Travel retention period expires, historical data for permanent tables moves to Fail-safe, a 7-day recovery period managed entirely by Snowflake. Users cannot query or access data in Fail-safe directly.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "When the retention period ends for an object, the historical data is moved into Snowflake Fail-safe: Historical data is no longer available for querying. Past objects can no longer be cloned. Past objects that were dropped can no longer be restored."
---
## Q3

**Answer: C**

**Explanation:** The AT clause with OFFSET takes a time difference in seconds from the present. Five minutes equals 300 seconds, and since OFFSET is a negative value representing seconds before the current time, AT(OFFSET => -300) is correct. BEFORE returns data just before the specified point, not at it.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "AT | BEFORE clause which can be specified in SELECT statements and CREATE … CLONE commands (immediately after the object name). The clause uses one of the following parameters to pinpoint the exact historical data you want to access: TIMESTAMP, OFFSET (time difference in seconds from the present time), STATEMENT (query ID for statement)."
---
## Q4

**Answer: A, C, D**

**Explanation:** Fail-safe is a fixed 7-day period that begins after Time Travel ends. It is not user-accessible — only Snowflake can attempt recovery, and it is done on a best-effort basis. Fail-safe is included for all editions (for permanent tables), not just Enterprise and higher.

**Source:** [Understanding and viewing Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Fail-safe provides a (non-configurable) 7-day period during which historical data may be recoverable by Snowflake. This period starts immediately after the Time Travel retention period ends. Fail-safe is a data recovery service that is provided on a best effort basis and is intended only for use when all other recovery options have been attempted."
---
## Q5

**Answer: B**

**Explanation:** MIN_DATA_RETENTION_TIME_IN_DAYS enforces a floor for retention across all objects. The effective retention period is calculated as MAX(DATA_RETENTION_TIME_IN_DAYS, MIN_DATA_RETENTION_TIME_IN_DAYS), ensuring no object falls below the minimum.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "The MIN_DATA_RETENTION_TIME_IN_DAYS account parameter can be set by users with the ACCOUNTADMIN role to set a minimum retention period for the account. This parameter does not alter or replace the DATA_RETENTION_TIME_IN_DAYS parameter value. However it may change the effective data retention time."
---
## Q6

**Answer: C**

**Explanation:** The hierarchy flows from the highest level (root key) down through account master keys, then table master keys, and finally file keys. Each higher layer of parent keys encrypts (wraps) the layer below it.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Snowflake's hierarchical key model consists of four levels of keys: The root key, Account master keys, Table master keys, File keys."
---
## Q7

**Answer: B**

**Explanation:** Snowflake automatically rotates encryption keys every 30 days. When rotated, the active key is retired (used only for decryption) and a completely new random key is created for encryption. This limits the lifecycle of each active key.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Keys in the Snowflake-managed key hierarchy are automatically rotated by Snowflake when they are more than 30 days old. Active keys are retired, and new keys are created."
---
## Q8

**Answer: A, D**

**Explanation:** Tri-Secret Secure creates a composite master key from a Snowflake-managed key and a customer-managed key (CMK). The CMK is maintained in the cloud provider's KMS (AWS KMS, Google Cloud KMS, or Azure Key Vault). If the CMK is revoked, Snowflake cannot decrypt the data — both keys are required. It is available for Business Critical Edition and higher, not all editions.

**Source:** [Tri-Secret Secure in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-tss)

**Quote:** "Tri-Secret Secure offers you a level of security and control above Snowflake's standard encryption. Our dual-key encryption model combines a Snowflake-maintained key and a customer-managed key (CMK), which you create on the cloud provider platform that hosts your Snowflake account. If the customer-managed key (CMK) in the composite master key hierarchy is revoked, your data can no longer be decrypted by Snowflake."
---
## Q9

**Answer: B**

**Explanation:** Zero-copy cloning is a metadata-only operation — it does not physically duplicate data. The clone and source share the same underlying micro-partitions until data in either object diverges, at which point new storage is consumed only for the changed data.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "Cloning a database, schema, or table creates a copy of the object that includes a snapshot of data present in the source object when the clone statement runs... clones share the same underlying storage as the source table."
---
## Q10

**Answer: B, D**

**Explanation:** Tasks are always suspended in cloned databases/schemas and must be individually resumed with ALTER TASK ... RESUME. Cloned tables share the same micro-partitions as the source until data modifications cause divergence. Additionally, Automatic Clustering is suspended for cloned tables, and the clone of a container (database/schema) itself does NOT inherit the privileges granted on the source container.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "When a database or schema that contains tasks is cloned, the tasks in the clone are suspended by default."
---
## Q11

**Answer: B**

**Explanation:** Time Travel and cloning work together. You can use the AT or BEFORE clause in a CREATE ... CLONE statement to clone a table, schema, or database as it existed at a specific historical point within the Time Travel retention period.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Using Time Travel, you can perform the following actions within a defined period of time: ... Create clones of entire tables, schemas, and databases at or before specific points in the past."
---
## Q12

**Answer: C**

**Explanation:** While database replication, share replication, and replication groups are available on all editions, failover groups — which allow promoting a secondary to primary for disaster recovery — require Business Critical Edition or higher.

**Source:** [Introduction to replication and failover across multiple accounts](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Failover Group: Business Critical [checkmark], VPS [checkmark]" (Standard and Enterprise show no checkmark for Failover Group)"
---
## Q13

**Answer: C**

**Explanation:** Snowflake Secure Data Sharing works entirely through Snowflake's services layer and metadata. No data is physically copied, moved, or transferred to the consumer account. The consumer queries the provider's data in place, making access near-instantaneous and eliminating storage costs for shared data on the consumer side.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "With Secure Data Sharing, no actual data is copied or transferred between accounts. All sharing uses Snowflake's services layer and metadata store."
---
## Q14

**Answer: B**

**Explanation:** Consumers pay only for the virtual warehouse compute they use to query shared data. There are no storage charges for shared data on the consumer side. The provider bears the storage costs for the underlying data.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shared data does not take up any storage in a consumer account and therefore does not contribute to the consumer's monthly data storage charges. The only charges to consumers are for the compute resources (i.e. virtual warehouses) used to query the imported data."
---
## Q15

**Answer: B, C**

**Explanation:** Reader accounts are fully owned and managed by the provider, and the provider pays all compute costs. Reader accounts can only consume data from their creating provider — not from multiple providers. They cannot create shares, and they do not need a licensing agreement with Snowflake.

**Source:** [Manage reader accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "A reader account enables data consumers to access and query data shared by the provider of the account, with no setup or usage costs for the consumer... The reader account is created, owned, and managed by the provider account, which assumes all responsibility for credit charges incurred by users in the reader account. a reader account can only consume data from the provider account that created it."
---
## Q16

**Answer: C**

**Explanation:** The default limit is 20 reader accounts per provider account. To create more, you must contact Snowflake Support to increase the limit.

**Source:** [Manage reader accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "By default, the total number of reader accounts a provider can create is 20. If you reach the limit and require creating additional accounts, please contact Snowflake Support."
---
## Q17

**Answer: B**

**Explanation:** The standard command is CREATE SHARE, which creates an empty share object. You then populate it by granting privileges on database objects to the share, and add consumer accounts using ALTER SHARE.

**Source:** [CREATE SHARE](https://docs.snowflake.com/en/sql-reference/sql/create-share)

**Quote:** "CREATE SHARE: Creates a new, empty share. Once the share is created, you can include a database and objects from the database (schemas, tables, and views) in the share using the GRANT <privilege> … TO SHARE command."
---
## Q18

**Answer: A, B, C**

**Explanation:** The three-step workflow for a direct share is: (1) CREATE SHARE to create the share, (2) GRANT privileges on the database, schema, and table TO SHARE to add objects, and (3) ALTER SHARE to add consumer accounts. No replication group or external stage is needed.

**Source:** [CREATE SHARE](https://docs.snowflake.com/en/sql-reference/sql/create-share)

**Quote:** "Create an empty share... After you create the share, complete it by running the following commands: Run the GRANT <privilege> … TO SHARE command to add a database (and objects in the database) to the share. Run the ALTER SHARE command to add accounts to the share."
---
## Q19

**Answer: B**

**Explanation:** The IMPORT SHARE global privilege is required to consume (import) a share from another account. By default, only the ACCOUNTADMIN role has this privilege, but it can be granted to other roles.

**Source:** [Configure and use a Data Exchange](https://docs.snowflake.com/en/user-guide/data-exchange-using)

**Quote:** "All users can browse listings in the Data Exchange, but only users with the ACCOUNTADMIN role or the IMPORT SHARE privilege can get or request data."
---
## Q20

**Answer: C**

**Explanation:** When sharing views through Secure Data Sharing, only secure views (including secure materialized views) are permitted. Standard views cannot be added to shares — attempting to do so results in an error. This ensures the underlying SQL definition and base tables are not exposed to consumers.

**Source:** [Create and configure shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "For data security and privacy reasons, only secure views are supported in shares at this time. If a standard view is added to a share, Snowflake returns an error."
---
## Q21

**Answer: A, C**

**Explanation:** Snowflake provides several native sharing options: Direct Shares (within the same region), Listings on the Snowflake Marketplace, Data Exchanges (private groups), and Clean Rooms. FTP, S3 bucket exports, and email integrations are not Snowflake data sharing mechanisms.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "You can share data in Snowflake using one of the following options: a Listing, in which you offer a share and additional metadata as a data product to one or more accounts, a Direct Share, in which you directly share specific database objects (a share) to another account in your region, a Data Exchange..."
---
## Q22

**Answer: B**

**Explanation:** A Data Exchange is a private, curated group of Snowflake accounts that can share data among members. An admin manages membership, assigns provider/consumer roles, and governs which listings are available within the exchange. It differs from the public Snowflake Marketplace.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "a Data Exchange, in which you set up and manage a group of accounts and offer a share to that group."
---
## Q23

**Answer: B**

**Explanation:** Enterprise Edition (and higher) supports up to 90 days of Time Travel for permanent objects. Standard Edition is limited to 0-1 day. While Business Critical and VPS also support 90 days, Enterprise is the minimum edition required.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Snowflake Enterprise Edition (and higher): For permanent databases, schemas, and tables, the retention period can be set to any value from 0 up to 90 days."
---
## Q24

**Answer: A, C**

**Explanation:** Database replication and share replication are available on all Snowflake editions, including Standard. Failover groups, account object replication (roles, users, warehouses), and Tri-Secret Secure data replication all require Business Critical Edition or higher.

**Source:** [Introduction to replication and failover across multiple accounts](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Database replication: Standard [checkmark], Enterprise [checkmark], Business Critical [checkmark], VPS [checkmark]. Share replication: Standard [checkmark], Enterprise [checkmark], Business Critical [checkmark], VPS [checkmark]."
---
## Q25

**Answer: B**

**Explanation:** The table was dropped 3 days ago and the Enterprise Edition account has a 7-day Time Travel retention period, meaning the table is still within its retention window. UNDROP TABLE will restore it. Fail-safe (option C) only becomes available after Time Travel expires, and only Snowflake Support can perform Fail-safe recovery. RESTORE TABLE is not a valid Snowflake command.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "A dropped object that has not been purged from the system (that is, the object is displayed in the SHOW <object_type> HISTORY output) can be restored using the following commands: UNDROP TABLE, UNDROP SCHEMA, UNDROP DATABASE."
---
## Q26

**Answer: B**

**Explanation:** DATA_RETENTION_TIME_IN_DAYS is the standard Snowflake parameter for controlling how long historical data is retained for Time Travel. It can be set at all levels of the object hierarchy: account, database, schema, and table.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "The DATA_RETENTION_TIME_IN_DAYS object parameter can be used by users with the ACCOUNTADMIN role to set the default retention period for your account. The same parameter can be used to explicitly override the default when creating a database, schema, and individual table."
---
## Q27

**Answer: B**

**Explanation:** Setting DATA_RETENTION_TIME_IN_DAYS to 0 for a table deactivates Time Travel for that specific table. However, if MIN_DATA_RETENTION_TIME_IN_DAYS is set at the account level and is greater than 0, that higher value takes precedence, so the effective behavior depends on both parameters.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "A retention period of 0 days for an object effectively deactivates Time Travel for the object."
---
## Q28

**Answer: B, D**

**Explanation:** External tables cannot be cloned individually, and internal (Snowflake) stages cannot be cloned individually either — they can only be cloned as part of a database or schema clone (using the INCLUDE INTERNAL STAGES clause). External named stages can be cloned individually.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "When using Time Travel, the following object types are not cloned: External tables, Internal (Snowflake) stages... You can clone external named stages individually. An external stage references a bucket or container in external cloud storage... You can optionally clone internal named stages when you clone a database or schema."
---
## Q29

**Answer: C**

**Explanation:** The BEFORE(STATEMENT => '<query_id>') clause returns data as it existed immediately before the specified statement was executed. This is ideal when you want to see the state of the data before a specific DML operation changed it.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "AT | BEFORE clause which can be specified in SELECT statements and CREATE … CLONE commands (immediately after the object name). The clause uses one of the following parameters to pinpoint the exact historical data you want to access: TIMESTAMP, OFFSET (time difference in seconds from the present time), STATEMENT (query ID for statement). The following query selects historical data from a table up to, but not including any changes made by the specified statement: SELECT * FROM my_table BEFORE(STATEMENT => '8e5d0ca9-005e-44e6-b858-a8f5b37c5726');"
---
## Q30

**Answer: C**

**Explanation:** Fail-safe is the non-configurable 7-day protection period that follows the end of the Time Travel retention window for permanent tables. Unlike Time Travel (which users can query directly), Fail-safe is managed solely by Snowflake and is used only as a last resort for data recovery.

**Source:** [Understanding and viewing Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Fail-safe provides a (non-configurable) 7-day period during which historical data may be recoverable by Snowflake. This period starts immediately after the Time Travel retention period ends."
---
## Q31

**Answer: B**

**Explanation:** The effective retention period is MAX(DATA_RETENTION_TIME_IN_DAYS, MIN_DATA_RETENTION_TIME_IN_DAYS) = MAX(30, 45) = 45 days. The MIN_DATA_RETENTION_TIME_IN_DAYS acts as a floor — even though the table is set to 30 days, the account minimum of 45 days takes precedence.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "The MIN_DATA_RETENTION_TIME_IN_DAYS account parameter can be set by users with the ACCOUNTADMIN role to set a minimum retention period for the account... When this parameter is set at the account level, the effective minimum data retention period for an object is determined by MAX(DATA_RETENTION_TIME_IN_DAYS, MIN_DATA_RETENTION_TIME_IN_DAYS)."
---
## Q32

**Answer: A, C**

**Explanation:** Both Time Travel and Fail-safe incur additional storage charges. Time Travel historical data adds to storage costs during the retention period, and Fail-safe data is stored for an additional 7 days after Time Travel expires. Zero-copy clones do not immediately add storage — they share underlying data with the source until data diverges.

**Source:** [Understanding and viewing Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Note that extended data retention requires additional storage which will be reflected in your monthly storage charges. Fail-safe provides a (non-configurable) 7-day period during which historical data may be recoverable by Snowflake... Additional storage charges apply for Fail-safe."
---
## Q33

**Answer: C**

**Explanation:** With Enterprise Edition and maximum 90-day Time Travel retention, adding the fixed 7-day Fail-safe period gives a total maximum protection window of 97 days (90 + 7). This represents the maximum combined data protection for a permanent table.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Snowflake Enterprise Edition (and higher): For permanent databases, schemas, and tables, the retention period can be set to any value from 0 up to 90 days. Fail-safe provides a (non-configurable) 7-day period during which historical data may be recoverable by Snowflake. This period starts immediately after the Time Travel retention period ends."
---
## Q34

**Answer: C**

**Explanation:** Fail-safe does not apply to transient or temporary tables — these table types have no Fail-safe period. Only permanent tables have the 7-day Fail-safe protection. This is a key distinction in Snowflake's continuous data protection model.

**Source:** [Understanding and viewing Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "For transient databases, schemas, and tables, the retention period can be set to 0 (or unset back to the default of 1 day). The same is also true for temporary tables. Fail-safe is a data recovery service... Fail-safe doesn't support tables that contain data ingested by Snowpipe Streaming Classic."
---
## Q35

**Answer: A, C**

**Explanation:** Time Travel enables querying historical data and creating clones at historical points. It does not provide access to Fail-safe data (only Snowflake can do that), does not expose encryption keys, and does not allow modifying historical data.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Using Time Travel, you can perform the following actions within a defined period of time: Query data in the past that has since been updated or deleted. Create clones of entire tables, schemas, and databases at or before specific points in the past. Restore tables, schemas, databases, and some other kinds of objects that have been dropped."
---
## Q36

**Answer: B**

**Explanation:** The OFFSET parameter in the AT clause is specified in seconds from the present time. -3600 seconds equals -1 hour, so the clone will reflect the database as it existed 1 hour ago. This is a Time Travel clone operation.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "The following CREATE SCHEMA statement creates a clone of a schema and all its objects as they existed 1 hour before the current time: CREATE SCHEMA restored_schema CLONE my_schema AT(OFFSET => -3600);"
---
## Q37

**Answer: C**

**Explanation:** Pipes with AUTO_INGEST = TRUE are placed in the STOPPED_CLONED state when their parent database or schema is cloned. This prevents duplicate data loading and event notification accumulation. They must be explicitly resumed with ALTER PIPE ... RESUME.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "When AUTO_INGEST = TRUE, a cloned pipe is set to the STOPPED_CLONED state. In this state, pipes don't accumulate event notifications as a result of newly staged files. When a pipe is explicitly resumed, it only processes data files triggered as a result of new event notifications."
---
## Q38

**Answer: B, C**

**Explanation:** In Snowflake cloning, the cloned container (the database itself) does NOT inherit privileges from the source database. However, child objects within the clone (tables, views, schemas, etc.) DO inherit the privileges that were granted on their corresponding source objects. This is an important distinction for access control planning.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "The clone of the container itself (database or schema) doesn't inherit the privileges granted on the source container. If the source object is a database or schema, the clone inherits all granted privileges on the clones of all child objects contained in the source object."
---
## Q39

**Answer: B**

**Explanation:** Reader accounts are created using the CREATE MANAGED ACCOUNT command with TYPE = READER. The ACCOUNTADMIN role or a role with CREATE ACCOUNT privilege is required. This creates a managed account owned by the provider.

**Source:** [Manage reader accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "To create a reader account, use the ACCOUNTADMIN role (or a role granted the CREATE ACCOUNT global privilege) and the CREATE MANAGED ACCOUNT command. CREATE MANAGED ACCOUNT <account_name> ADMIN_NAME = <username> , ADMIN_PASSWORD = '<password>' , TYPE = READER;"
---
## Q40

**Answer: B**

**Explanation:** Consumers use CREATE DATABASE ... FROM SHARE to create a read-only database in their account that references the shared objects. The syntax is CREATE DATABASE <db_name> FROM SHARE <provider_account>.<share_name>. IMPORT SHARE is not a valid SQL command; IMPORT SHARE is a privilege, not a command.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "On the consumer side, a read-only database is created from the share. Access to this database is configurable using the same, standard role-based access control that Snowflake provides for all objects in the system."
---
## Q41

**Answer: C**

**Explanation:** A consumer account can consume as many shares as they want from data providers, but for each individual share, only one database can be created from it. This is a key constraint in Snowflake's data sharing model.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "you can only create one database per share."
---
## Q42

**Answer: A, C**

**Explanation:** Shared database objects are always read-only for consumers — they cannot insert, update, or delete data, nor can they modify the schema. When a provider adds new objects to a share, those objects are immediately visible to all consumers who have created databases from the share.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "All database objects shared between accounts are read-only (i.e. the objects cannot be modified or deleted, including adding or modifying table data). New objects added to a share become immediately available to all consumers, providing real-time access to imported data."
---
## Q43

**Answer: C**

**Explanation:** When sharing views in Snowflake, only secure views (including secure materialized views) can be added to a share. Standard views are rejected to ensure that the underlying SQL logic and base table structure are not exposed to consumers. Secure views hide query definitions from unauthorized users.

**Source:** [Create and configure shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "For data security and privacy reasons, only secure views are supported in shares at this time. If a standard view is added to a share, Snowflake returns an error."
---
## Q44

**Answer: B**

**Explanation:** SIMULATED_DATA_SHARING_CONSUMER is a session parameter that allows a data provider to simulate how a specific consumer account will see shared data. This is used to validate that secure views are correctly filtering data before the share goes live. It supports secure views and secure materialized views, but not secure UDFs.

**Source:** [Create and configure shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "To facilitate performing this validation, Snowflake provides the SIMULATED_DATA_SHARING_CONSUMER session parameter. Setting this parameter in a session enables you to simulate querying a secure view as a user in any of the consumer account(s) you plan to share the view with."
---
## Q45

**Answer: B, D, E**

**Explanation:** Database replication and share replication are available on all editions. Account object replication (roles, users, warehouses, etc.), failover groups, and Tri-Secret Secure data replication all require Business Critical Edition or higher. This is a key exam distinction.

**Source:** [Introduction to replication and failover across multiple accounts](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Account object (other than database and share) replication: [Business Critical ✔] [VPS ✔] Failover Group: [Business Critical ✔] [VPS ✔] Data protected with Tri-Secret Secure: [Business Critical ✔] [VPS ✔]"
---
## Q46

**Answer: B**

**Explanation:** Replication groups replicate objects to target accounts as read-only copies. Read-write access is only available in the primary account. Failover groups extend this by allowing promotion — when a secondary failover group is promoted, it gains read-write access.

**Source:** [Introduction to replication and failover across multiple accounts](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "A replication group is a defined collection of objects in a source account that are replicated as a unit to one or more target accounts. Replication groups provide read-only access for the replicated objects."
---
## Q47

**Answer: B**

**Explanation:** Before promotion, a secondary failover group is read-only. Once promoted to primary, read-write access becomes available in that account. The original primary is not automatically demoted in a destructive way — it becomes the secondary after a proper failover/failback procedure.

**Source:** [Introduction to replication and failover across multiple accounts](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "A failover group is a replication group that can also fail over. A secondary failover group in a target account provides read-only access for the replicated objects. When a secondary failover group is promoted to become the primary failover group, read-write access is available."
---
## Q48

**Answer: C**

**Explanation:** The SHOW TABLES command returns a retention_time column showing the currently configured Time Travel retention period for each table. You can also use SHOW TABLES HISTORY to include already-dropped tables. DESCRIBE TABLE does not return retention period information.

**Source:** [Understanding & using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "To check the current retention period for a table, schema, or database, you can check the value of the retention_time column in the output of the corresponding SHOW command, such as SHOW TABLES, SHOW SCHEMAS, or SHOW DATABASES."
---
## Q49

**Answer: B**

**Explanation:** When a provider drops a share, all consumer databases created from that share are immediately invalidated. There is no grace period. Consumers can no longer query shared data. If the share is recreated, consumers must create a new database from it — the old database is not restored.

**Source:** [Create and configure shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "You can drop (remove) a share at any time. Dropping a share instantly invalidates all databases created from the share by consumer accounts. All queries and other operations performed on these databases no longer work."
---
## Q50

**Answer: B, D**

**Explanation:** The Snowflake Marketplace follows the same Secure Data Sharing principles — no data is copied. Consumers access live, real-time data. Providers can publish both free and paid listings. The Marketplace is available globally across AWS, GCP, and Azure — not just AWS. Providers can share tables, views, and other objects (not just entire databases).

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Providers can publish free listings, paid listings, sample datasets. No data copying; live, real-time shared data. Eliminates need for APIs and data pipelines."
---
## Q51

**Answer: C**

**Explanation:** Creating a share requires either the ACCOUNTADMIN role or a custom role that has been explicitly granted the CREATE SHARE global privilege. By default, only ACCOUNTADMIN can create shares, but this can be delegated using GRANT CREATE SHARE ON ACCOUNT TO ROLE <role_name>.

**Source:** [Create and configure shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "You must use the ACCOUNTADMIN role or a role that has been granted the CREATE SHARE global privilege to create shares."
---
## Q52

**Answer: B**

**Explanation:** When a consumer account is removed and then re-added to a share, the previously created database is not automatically restored. The consumer must create a completely new database from the share using CREATE DATABASE ... FROM SHARE. This is an important behavior to understand for operational planning.

**Source:** [Create and configure shares](https://docs.snowflake.com/en/user-guide/data-sharing-provider)

**Quote:** "After removing an account from a share, you can add it back again to the share; however, this does not restore the database they created earlier from the share. They must create a new database from the share."
---
## Q53

**Answer: B**

**Explanation:** Periodic data rekeying (re-encrypting data with new encryption keys after old keys have been retired for more than one year) requires Enterprise Edition and must be enabled by setting PERIODIC_DATA_REKEYING = TRUE. Standard Edition accounts do not have access to this feature.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Periodic rekeying: Re-encrypts data with new key after retired key is >1 year old (Enterprise Edition, requires PERIODIC_DATA_REKEYING = TRUE)"
---
## Q54

**Answer: B, D**

**Explanation:** Tables and secure views are both shareable objects in Snowflake. Virtual warehouses, tasks, and resource monitors are not shareable — they are compute or governance objects, not data objects. Note: while regular views are listed in the shareable objects, sharing a standard view without the SECURE keyword will cause an error; only secure views work in practice.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Secure Data Sharing lets you share selected objects in a database in your account with other Snowflake accounts. You can share the following Snowflake objects: Databases, Tables, Dynamic tables, External tables, Views (Regular views, Secure views, Secure materialized views, Semantic views), Cortex Search services, User-defined functions (UDFs), Models... For data security and privacy reasons, only secure views are supported in shares at this time."
---
## Q55

**Answer: C**

**Explanation:** A Data Exchange is a private, managed group of Snowflake accounts that can share data among members. Unlike the public Snowflake Marketplace, a Data Exchange is invitation-only and governed by an administrator. This makes it ideal for partner ecosystems or industry consortia. Direct Share works only for one-to-one or one-to-few sharing within a region.

**Source:** [About Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "a Data Exchange, in which you set up and manage a group of accounts and offer a share to that group."
---
## Q56

**Answer: B**

**Explanation:** Snowflake automatically rotates encryption keys every 30 days. When a key is rotated, the old key is retired (but kept for decryption of existing data) and a new key is generated for encrypting new data. Retired keys are NOT deleted immediately — they are retained to decrypt data encrypted with them.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "Keys in the Snowflake-managed key hierarchy are automatically rotated by Snowflake when they are more than 30 days old. Active keys are retired, and new keys are created."
---
## Q57

**Answer: B, D**

**Explanation:** Both tasks and alerts are suspended by default in cloned databases and schemas. Automatic Clustering is also suspended for cloned tables with clustering keys. These defaults prevent unintended compute consumption and duplicate processing in the clone environment. Each must be explicitly resumed.

**Source:** [Cloning considerations](https://docs.snowflake.com/en/user-guide/object-clone)

**Quote:** "When a database or schema that contains tasks is cloned, the tasks in the clone are suspended by default. The tasks can be resumed individually (using ALTER TASK … RESUME). When a database or schema that contains alerts is cloned, the alerts in the clone are suspended by default."
---
## Q58

**Answer: B**

**Explanation:** Reader accounts allow providers to share data with non-Snowflake customers without requiring those partners to sign a Snowflake licensing agreement. The provider creates and manages the reader account and pays all compute costs. This is the correct solution for sharing with parties who have no Snowflake account.

**Source:** [Manage reader accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "Reader accounts (formerly known as 'read-only accounts') enable providers to share data with consumers who are not already Snowflake customers, without requiring the consumers to become Snowflake customers. A reader account enables data consumers to access and query data shared by the provider of the account, with no setup or usage costs for the consumer, and no requirements for the consumer to sign a licensing agreement with Snowflake."
---
## Q59

**Answer: C**

**Explanation:** Transient tables (and temporary tables) do not have a Fail-safe period. Only permanent tables receive the 7-day Fail-safe protection after their Time Travel period expires. This is why transient tables are cheaper to store — they sacrifice some data protection in exchange for lower storage costs.

**Source:** [Understanding and viewing Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "For transient databases, schemas, and tables, the retention period can be set to 0 (or unset back to the default of 1 day). The same is also true for temporary tables. Fail-safe is not provided as a means for accessing historical data after the Time Travel retention period has ended. It is for use only by Snowflake to recover data..."
---
## Q60

**Answer: A, C**

**Explanation:** Snowflake automatically encrypts all customer data at rest using AES-256 encryption by default — no manual configuration is required. Data in transit is protected using TLS (Transport Layer Security). Encryption applies to all data in Snowflake regardless of edition; it is not limited to Business Critical Edition.

**Source:** [Understanding Encryption Key Management in Snowflake](https://docs.snowflake.com/en/user-guide/security-encryption-manage)

**Quote:** "AES-256 strong encryption for all data at rest on server side. TLS in transit to/from Snowflake service."
