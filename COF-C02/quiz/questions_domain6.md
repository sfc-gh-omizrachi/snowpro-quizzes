## Q1 (Single Answer)
A company using Snowflake Standard Edition wants to configure Time Travel for a permanent table. What is the maximum data retention period they can set?

- A) 0 days
- B) 1 day
- C) 7 days
- D) 90 days
---
## Q2 (Single Answer)
What happens to historical data after the Time Travel retention period ends for a permanent table?

- A) The data is permanently deleted from Snowflake
- B) The data is moved into Snowflake Fail-safe
- C) The data is archived to an external stage
- D) The data remains queryable but read-only
---
## Q3 (Single Answer)
A user needs to query a table as it existed exactly 5 minutes ago. Which Time Travel SQL clause and parameter should they use?

- A) AT(TIMESTAMP => '5 minutes ago')
- B) BEFORE(OFFSET => -300)
- C) AT(OFFSET => -300)
- D) BEFORE(TIMESTAMP => DATEADD(minutes, -5, CURRENT_TIMESTAMP()))
---
## Q4 (Multi-Answer: Select THREE)
Which THREE statements about Snowflake Fail-safe are true?

- A) The Fail-safe retention period is 7 days and cannot be configured
- B) Users can query data directly from Fail-safe using a special SQL clause
- C) Fail-safe begins immediately after the Time Travel retention period ends
- D) Fail-safe data recovery is performed by Snowflake on a best-effort basis
- E) Fail-safe is available only for Enterprise Edition and higher
---
## Q5 (Single Answer)
Which Snowflake parameter can an ACCOUNTADMIN set at the account level to enforce a minimum data retention period across all objects?

- A) DATA_RETENTION_TIME_IN_DAYS
- B) MIN_DATA_RETENTION_TIME_IN_DAYS
- C) MAX_DATA_RETENTION_TIME_IN_DAYS
- D) DEFAULT_RETENTION_PERIOD
---
## Q6 (Single Answer)
In Snowflake's hierarchical encryption key model, what is the correct order of keys from highest to lowest level?

- A) File keys → Table master keys → Account master keys → Root key
- B) Root key → Table master keys → Account master keys → File keys
- C) Root key → Account master keys → Table master keys → File keys
- D) Account master keys → Root key → Table master keys → File keys
---
## Q7 (Single Answer)
How often does Snowflake automatically rotate encryption keys in the Snowflake-managed key hierarchy?

- A) Every 7 days
- B) Every 30 days
- C) Every 90 days
- D) Every 365 days
---
## Q8 (Multi-Answer: Select TWO)
Which TWO statements about Tri-Secret Secure in Snowflake are correct?

- A) It combines a Snowflake-managed key with a customer-managed key to create a composite master key
- B) It is available for all Snowflake editions
- C) If the customer-managed key is revoked, Snowflake can still decrypt data using its own key
- D) The customer-managed key is maintained in the cloud provider's key management service
- E) It eliminates the need for Snowflake's built-in encryption
---
## Q9 (Single Answer)
What type of operation is zero-copy cloning in Snowflake?

- A) A data copy operation that duplicates all storage
- B) A metadata-only operation that shares underlying storage
- C) A replication operation that transfers data to another account
- D) A backup operation that creates an encrypted snapshot
---
## Q10 (Multi-Answer: Select TWO)
A user clones a database that contains tables and tasks. Which TWO statements about the cloned objects are true?

- A) Tasks in the cloned database are active and running by default
- B) Tasks in the cloned database are suspended by default
- C) The cloned database inherits the privileges granted on the source database itself
- D) Tables in the cloned database share the same underlying micro-partitions until data diverges
- E) Automatic Clustering continues running on cloned tables without interruption
---
## Q11 (Single Answer)
Which statement correctly describes the relationship between Time Travel and cloning?

- A) Cloned tables cannot use Time Travel
- B) You can clone a table at a specific historical point using the AT or BEFORE clause
- C) Cloning a table resets the Time Travel retention period to 0 days
- D) Time Travel data is duplicated when a table is cloned
---
## Q12 (Single Answer)
What is the minimum Snowflake edition required to use failover groups for disaster recovery?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake
---
## Q13 (Single Answer)
How does Secure Data Sharing transfer data between a provider and consumer account in Snowflake?

- A) Data is copied to the consumer's cloud storage bucket
- B) Data is replicated through an ETL pipeline
- C) No actual data is copied or transferred; sharing uses Snowflake's services layer and metadata store
- D) Data is exported to a shared external stage accessible by both accounts
---
## Q14 (Single Answer)
Who pays for the compute resources used to query shared data in Snowflake Secure Data Sharing?

- A) The data provider
- B) The data consumer
- C) Snowflake covers the cost as part of the service
- D) The cost is split equally between provider and consumer
---
## Q15 (Multi-Answer: Select TWO)
Which TWO statements about reader accounts in Snowflake are true?

- A) A reader account can consume data from multiple provider accounts
- B) A reader account is created, owned, and managed by the provider account
- C) The provider account is responsible for all credit charges incurred by users in the reader account
- D) Reader accounts can create their own shares to share data with other accounts
- E) Reader accounts require a separate licensing agreement with Snowflake
---
## Q16 (Single Answer)
What is the default maximum number of reader accounts a provider can create?

- A) 5
- B) 10
- C) 20
- D) 50
---
## Q17 (Single Answer)
Which SQL command is used to create a new, empty share in Snowflake?

- A) CREATE DATA SHARE
- B) CREATE SHARE
- C) CREATE SECURE SHARE
- D) CREATE OUTBOUND SHARE
---
## Q18 (Multi-Answer: Select THREE)
Which THREE steps are required to share a table with another Snowflake account using a direct share?

- A) Create a share using CREATE SHARE
- B) Grant privileges on the database, schema, and table to the share using GRANT ... TO SHARE
- C) Add the consumer account to the share using ALTER SHARE
- D) Create a replication group for the shared objects
- E) Upload the data to a shared external stage
- F) Convert the table to a secure view before sharing
---
## Q19 (Single Answer)
Which global privilege must a role have to import a share from another account?

- A) CREATE SHARE
- B) IMPORT SHARE
- C) MANAGE SHARES
- D) CREATE DATABASE
---
## Q20 (Single Answer)
What type of view is required when sharing views through Snowflake Secure Data Sharing?

- A) Standard views
- B) Materialized views
- C) Secure views
- D) Dynamic views
---
## Q21 (Multi-Answer: Select TWO)
Which TWO are options for sharing data in Snowflake?

- A) Direct Share to another account in the same region
- B) FTP transfer to the consumer's on-premises server
- C) Listing on the Snowflake Marketplace
- D) Exporting data to a shared Amazon S3 bucket
- E) Sending data via email integration
---
## Q22 (Single Answer)
What is the primary purpose of a Snowflake Data Exchange?

- A) To replicate databases between Snowflake accounts in different regions
- B) To provide a private group of accounts that can share data among members
- C) To transfer data between Snowflake and external cloud services
- D) To convert data formats between different database platforms
---
## Q23 (Single Answer)
What edition is required to set the DATA_RETENTION_TIME_IN_DAYS parameter to 90 days for a permanent table?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake
---
## Q24 (Multi-Answer: Select TWO)
Which TWO features of replication are available on ALL Snowflake editions (including Standard)?

- A) Database replication
- B) Failover groups
- C) Share replication
- D) Account object replication (roles, users, warehouses)
- E) Data protected with Tri-Secret Secure replication
---
## Q25 (Single Answer)
A table was accidentally dropped 3 days ago. The Snowflake account is Enterprise Edition with a 7-day Time Travel retention period. Can the table be recovered, and if so, how?

- A) No, the table cannot be recovered once dropped
- B) Yes, using the UNDROP TABLE command within the Time Travel retention period
- C) Yes, but only by contacting Snowflake Support to restore from Fail-safe
- D) Yes, using the RESTORE TABLE command
---
## Q26 (Single Answer)
Which parameter controls the Time Travel data retention period and can be set at the account, database, schema, and table level?

- A) TIME_TRAVEL_RETENTION_DAYS
- B) DATA_RETENTION_TIME_IN_DAYS
- C) HISTORICAL_DATA_RETENTION_DAYS
- D) RETENTION_PERIOD_IN_DAYS
---
## Q27 (Single Answer)
A developer sets DATA_RETENTION_TIME_IN_DAYS = 0 on a table. What is the effect on Time Travel for that table?

- A) Time Travel defaults back to 1 day
- B) Time Travel is effectively deactivated for the table
- C) Time Travel uses the account-level default instead
- D) Time Travel is disabled for the account
---
## Q28 (Multi Answer - Select 2)
Which TWO objects cannot be cloned individually in Snowflake?

- A) External named stages
- B) External tables
- C) Tables
- D) Internal (Snowflake) stages
- E) Schemas
---
## Q29 (Single Answer)
A data engineer wants to query a table as it existed before a specific DML statement was executed. Which Time Travel clause should they use?

- A) AT(TIMESTAMP => ...)
- B) AT(OFFSET => ...)
- C) BEFORE(STATEMENT => '<query_id>')
- D) AT(STATEMENT => '<query_id>')
---
## Q30 (Single Answer)
Which Snowflake feature provides a non-configurable 7-day protection period after Time Travel expires?

- A) Time Travel Extension
- B) Data Backup Period
- C) Fail-safe
- D) Historical Data Retention
---
## Q31 (Single Answer)
An Enterprise Edition account has a table with DATA_RETENTION_TIME_IN_DAYS set to 30 and the account-level MIN_DATA_RETENTION_TIME_IN_DAYS is set to 45. What is the effective retention period for this table?

- A) 30 days
- B) 45 days
- C) 75 days
- D) 1 day
---
## Q32 (Multi Answer - Select 2)
Which TWO statements correctly describe how storage costs relate to Snowflake's continuous data protection features?

- A) Time Travel data incurs additional storage costs for the historical data retained
- B) Fail-safe data does not incur any storage charges
- C) Fail-safe data incurs storage charges for the 7-day period
- D) Zero-copy clones always double the storage cost immediately
- E) Time Travel data is stored free of charge on all editions
---
## Q33 (Single Answer)
What is the maximum combined data protection period (Time Travel + Fail-safe) for a permanent table on Enterprise Edition with maximum retention configured?

- A) 8 days (1 day TT + 7 days FS)
- B) 91 days (90 days TT + 7 days FS — but commonly referred to as up to 97 days)
- C) 97 days (90 days TT + 7 days FS)
- D) 7 days (Fail-safe only)
---
## Q34 (Single Answer)
Which statement about Fail-safe and transient tables is correct?

- A) Transient tables have a 7-day Fail-safe period like permanent tables
- B) Transient tables have a 1-day Fail-safe period
- C) Fail-safe does not apply to transient or temporary tables
- D) Transient tables have a configurable Fail-safe period
---
## Q35 (Multi Answer - Select 2)
Which TWO actions can be performed using Snowflake Time Travel?

- A) Query data that has been updated or deleted within the retention period
- B) Restore data from Fail-safe without contacting Snowflake Support
- C) Create clones of tables, schemas, and databases at specific points in the past
- D) View encrypted key material for audit purposes
- E) Modify historical versions of data
---
## Q36 (Single Answer)
A developer clones a database using the following command:

`CREATE DATABASE db_clone CLONE production_db AT(OFFSET => -3600);`

What does this command do?

- A) Creates a clone of the database as it exists right now
- B) Creates a clone of the database as it existed 1 hour ago
- C) Creates a clone of the database as it existed 3600 days ago
- D) Creates a clone and sets Time Travel retention to 3600 seconds
---
## Q37 (Single Answer)
When a database containing pipes with AUTO_INGEST = TRUE is cloned, what is the default state of those pipes in the clone?

- A) The pipes are active and processing new files
- B) The pipes are paused
- C) The pipes are set to STOPPED_CLONED state
- D) The pipes are dropped and must be recreated
---
## Q38 (Multi Answer - Select 2)
Which TWO statements about access control privileges for cloned databases in Snowflake are correct?

- A) The clone of a database inherits the privileges granted on the source database itself
- B) The clone of a database does NOT inherit the privileges granted on the source database itself
- C) Child objects within the cloned database inherit the privileges granted on the corresponding source child objects
- D) All privileges in the cloned database are reset to default
- E) Only table-level privileges are inherited in the clone
---
## Q39 (Single Answer)
Which SQL command is used to create a reader account in Snowflake?

- A) CREATE READER ACCOUNT
- B) CREATE MANAGED ACCOUNT ... TYPE = READER
- C) CREATE CONSUMER ACCOUNT ... TYPE = READ_ONLY
- D) CREATE ACCOUNT ... READER = TRUE
---
## Q40 (Single Answer)
A consumer account wants to access shared data from a provider account. What SQL command does the consumer use to make the shared data available in their account?

- A) IMPORT SHARE <share_name>
- B) CREATE DATABASE <db_name> FROM SHARE <provider_account>.<share_name>
- C) MOUNT SHARE <share_name> AS DATABASE <db_name>
- D) ATTACH SHARE <share_name> TO DATABASE <db_name>
---
## Q41 (Single Answer)
How many databases can a consumer create from a single share?

- A) Unlimited
- B) Up to 10
- C) Only one
- D) Up to the number of schemas in the share
---
## Q42 (Multi Answer - Select 2)
Which TWO statements about data shared via Snowflake Secure Data Sharing are correct?

- A) Shared database objects are read-only for the consumer
- B) Consumers can add new rows to shared tables
- C) New objects added to a share become immediately available to all consumers
- D) Consumers can modify the structure of shared tables
- E) Shared data is first cached in the consumer's cloud storage
---
## Q43 (Single Answer)
A provider wants to share a view that filters customer data by account. Which type of object is required?

- A) A standard view
- B) A materialized view
- C) A secure view
- D) A dynamic table
---
## Q44 (Single Answer)
What is the purpose of the SIMULATED_DATA_SHARING_CONSUMER session parameter in Snowflake?

- A) To create a test consumer account for validation
- B) To simulate querying a secure view as a user in a specific consumer account
- C) To limit the data returned to a consumer's account
- D) To encrypt data before sharing it with a consumer
---
## Q45 (Multi Answer - Select 3)
Which THREE Snowflake replication features are available for Business Critical Edition or higher only?

- A) Database replication
- B) Account object replication (roles, users, warehouses)
- C) Share replication
- D) Failover groups
- E) Data protected with Tri-Secret Secure replication
---
## Q46 (Single Answer)
A replication group in Snowflake provides what type of access to replicated objects in a target account?

- A) Read-write access
- B) Read-only access
- C) Admin-only access
- D) No access until failover is triggered
---
## Q47 (Single Answer)
What happens when a secondary failover group is promoted to become the primary failover group?

- A) It remains read-only until manually activated
- B) Read-write access becomes available in the promoted account
- C) The original primary is automatically demoted to a replication group
- D) All data is deleted from the original primary account
---
## Q48 (Single Answer)
Which command is used to check the retention period currently set for a table in Snowflake?

- A) DESCRIBE TABLE <table_name>
- B) SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '<table_name>'
- C) SHOW TABLES (check the retention_time column in the output)
- D) SELECT RETENTION_TIME FROM ACCOUNT_USAGE.TABLES
---
## Q49 (Single Answer)
A provider drops a share. What immediately happens to consumer accounts that had created databases from this share?

- A) The databases remain accessible for 24 hours before being invalidated
- B) The databases in consumer accounts are immediately invalidated
- C) The databases become read-only but remain accessible
- D) Consumers are notified by email and have 7 days to migrate their data
---
## Q50 (Multi Answer - Select 2)
Which TWO statements about the Snowflake Marketplace are correct?

- A) The Snowflake Marketplace requires data to be physically copied to the consumer's account
- B) Providers can publish free listings or paid listings on the Marketplace
- C) The Snowflake Marketplace is only available in AWS regions
- D) Consumers get access to live, real-time shared data without data movement
- E) Providers must share entire databases; sharing individual tables is not supported
---
## Q51 (Single Answer)
Which role does a provider account need to use (or have its role granted) in order to create a share?

- A) SYSADMIN
- B) SECURITYADMIN
- C) ACCOUNTADMIN (or a role granted the CREATE SHARE privilege)
- D) DATAADMIN
---
## Q52 (Single Answer)
A provider account removes a consumer account from an existing share. The consumer later asks to be added back to the share. What must the consumer do to access the shared data again?

- A) The original database from the share is automatically restored
- B) The consumer must create a new database from the share
- C) The consumer can re-import the existing database
- D) The consumer must contact Snowflake Support to restore access
---
## Q53 (Single Answer)
What Snowflake edition is the minimum required to perform periodic data rekeying (re-encrypting older data with newly rotated keys)?

- A) Standard Edition
- B) Enterprise Edition
- C) Business Critical Edition
- D) Virtual Private Snowflake
---
## Q54 (Multi Answer - Select 2)
Which TWO of the following can be added to a Snowflake share? (According to the current Snowflake docs)

- A) Virtual warehouses
- B) Tables
- C) Tasks
- D) Secure views
- E) Resource monitors
---
## Q55 (Single Answer)
An organization wants to set up a private group of Snowflake accounts for controlled data sharing among partners, separate from the public Snowflake Marketplace. Which Snowflake feature should they use?

- A) Direct Share
- B) Data Clean Room
- C) Data Exchange
- D) Reader Accounts
---
## Q56 (Single Answer)
Which statement about Snowflake's automatic encryption key rotation is correct?

- A) Keys are rotated every 7 days, and old keys are deleted immediately
- B) Keys are rotated every 30 days; retired keys are kept for decryption purposes
- C) Keys must be manually rotated by the ACCOUNTADMIN role
- D) Key rotation only applies to Business Critical Edition accounts
---
## Q57 (Multi Answer - Select 2)
Which TWO statements about zero-copy cloning of schemas are correct?

- A) When a schema containing tasks is cloned, the tasks start automatically in the clone
- B) When a schema containing alerts is cloned, the alerts are suspended by default in the clone
- C) Cloning a schema with Automatic Clustering keeps clustering active on all cloned tables
- D) When a schema containing tasks is cloned, the tasks are suspended by default in the clone
- E) Cloning a schema immediately doubles the storage cost
---
## Q58 (Single Answer)
A Snowflake provider account wants to share data with a business partner who has never used Snowflake and does not want to sign a licensing agreement. Which option allows this?

- A) Create a listing on the Snowflake Marketplace
- B) Create a reader account for the partner
- C) Use a Data Exchange with the partner
- D) Configure a Direct Share to the partner's email address
---
## Q59 (Single Answer)
Which type of table has NO Fail-safe period (i.e., Fail-safe does not apply) in Snowflake?

- A) Permanent tables
- B) External tables
- C) Transient tables
- D) Large tables over 1 TB
---
## Q60 (Multi Answer - Select 2)
Which TWO options correctly describe data encryption in Snowflake?

- A) All customer data is encrypted at rest using AES-256 encryption by default
- B) Customers must configure encryption manually for each table
- C) Data in transit to and from Snowflake is protected using TLS
- D) Snowflake only encrypts data stored in internal stages, not in cloud storage
- E) Encryption at rest requires Business Critical Edition or higher
