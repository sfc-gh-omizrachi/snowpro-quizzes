# Domain 5: Data Collaboration

---

## Q1 (Single Answer)
What is Secure Data Sharing in Snowflake?
- A) A feature that encrypts shared data using customer-managed keys
- B) A feature that allows sharing data between Snowflake accounts without copying or transferring the data
- C) A feature that compresses data for faster sharing
- D) A feature that creates read-write access to data across accounts

---

## Q2 (Scenario)
A data provider wants to share a set of tables with a business partner who also has a Snowflake account, without copying any data or incurring data transfer costs. Which feature should they use?
- A) Database replication
- B) Secure Data Sharing via a share object
- C) COPY INTO to export data
- D) Email the data as CSV files

---

## Q3 (Single Answer)
In Snowflake's data sharing model, who pays for the compute costs when a consumer queries shared data?
- A) The data provider
- B) The data consumer
- C) Snowflake absorbs all costs
- D) Costs are split 50/50

---

## Q4 (Multi Answer - Select 2)
Which TWO objects can be included in a Snowflake share? (Select 2)
- A) Tables
- B) Virtual warehouses
- C) Secure views
- D) Users
- E) Resource monitors

---

## Q5 (Single Answer)
What is a data provider in the context of Snowflake data sharing?
- A) A user who queries shared data
- B) A Snowflake account that creates a share and makes data available to other accounts
- C) A third-party tool that loads data into Snowflake
- D) A Snowflake service that manages data replication

---

## Q6 (Scenario)
A pharmaceutical company wants to share clinical trial results with three external partner organizations. Each partner has their own Snowflake account. The data should be read-only and the provider wants to maintain a single copy. How should they set this up?
- A) Replicate the database to each partner account
- B) Create a share and add all three partner accounts as consumers
- C) Export the data to S3 and share the bucket
- D) Create separate copies of the tables for each partner

---

## Q7 (Single Answer)
What is a data consumer in Snowflake data sharing?
- A) A Snowflake account that creates shares
- B) A Snowflake account that accesses data from a share created by another account
- C) An external application that reads Snowflake data via API
- D) A role within the provider account

---

## Q8 (Multi Answer - Select 2)
Which TWO types of accounts can consume shared data in Snowflake? (Select 2)
- A) Full Snowflake accounts (existing customers)
- B) Reader accounts (non-Snowflake customers provisioned by the provider)
- C) AWS accounts without Snowflake
- D) Any email account
- E) Azure Active Directory accounts

---

## Q9 (Single Answer)
What is a reader account in Snowflake?
- A) An account with read-write access to all shared data
- B) A Snowflake account provisioned by a data provider specifically for consumers who do not have their own Snowflake account
- C) A trial Snowflake account
- D) An account that can only read internal data

---

## Q10 (Scenario)
A data provider wants to share data with a business partner who does not have a Snowflake account and is not willing to create one. How can the provider still share data through Snowflake?
- A) They cannot — the partner must have a Snowflake account
- B) Create a reader account for the partner, which the provider manages and pays for
- C) Share the data via email
- D) Use an external function to push data to the partner

---

## Q11 (Single Answer)
Who manages and pays for the compute resources of a reader account?
- A) The data consumer
- B) The data provider who created the reader account
- C) Snowflake
- D) Both provider and consumer share the cost

---

## Q12 (Single Answer)
Can shared data be modified (INSERT, UPDATE, DELETE) by the consumer?
- A) Yes, consumers have full read-write access
- B) No, shared data is read-only for consumers
- C) Only if the provider grants write access
- D) Only through stored procedures

---

## Q13 (Multi Answer - Select 2)
Which TWO are characteristics of Snowflake Secure Data Sharing? (Select 2)
- A) Data is physically copied to the consumer account
- B) No data is copied — consumers access the provider's data in place
- C) Sharing happens in near real-time as consumers see current data
- D) Shared data has a 24-hour delay
- E) Sharing requires data export and import

---

## Q14 (Scenario)
A data provider shares a table with a consumer. The provider then inserts 1 million new rows into the table. When will the consumer see the new data?
- A) Only after the provider manually refreshes the share
- B) Immediately — the consumer queries the actual underlying data in real-time
- C) After a 24-hour synchronization period
- D) Only after the consumer refreshes their local copy

---

## Q15 (Single Answer)
What SQL command does a data provider use to create a share?
- A) CREATE DATA_SHARE
- B) CREATE SHARE
- C) SHARE DATABASE
- D) EXPORT SHARE

---

## Q16 (Single Answer)
What SQL command does a consumer use to access a share from a provider?
- A) IMPORT SHARE
- B) CONNECT TO SHARE
- C) CREATE DATABASE FROM SHARE
- D) LOAD SHARE

---

## Q17 (Scenario)
A data provider wants to share data but restrict consumers from seeing the underlying table definitions and ensure they can only access data through carefully crafted queries. What should they use?
- A) Standard views in the share
- B) Secure views in the share
- C) Materialized views in the share
- D) External tables in the share

---

## Q18 (Single Answer)
Why are secure views recommended when sharing data across accounts?
- A) Secure views are faster than standard views
- B) Secure views hide the view definition and prevent consumers from accessing or inferring data about the underlying base tables
- C) Secure views use less storage
- D) Secure views automatically encrypt data

---

## Q19 (Multi Answer - Select 2)
Which TWO limitations apply to data shares in Snowflake? (Select 2)
- A) Shares are read-only for consumers
- B) Shares can include virtual warehouses
- C) Shares work only between accounts in the same cloud region (unless cross-region replication is used)
- D) Shares automatically replicate data to the consumer
- E) Shares can include user credentials

---

## Q20 (Single Answer)
What is data resharing in Snowflake?
- A) Sharing data back to the original provider
- B) A consumer sharing data they received from a provider with a third-party account
- C) Sharing data between schemas within the same account
- D) Re-loading previously shared data

---

## Q21 (Scenario)
Company A shares data with Company B. Company B wants to share a combined dataset (including Company A's data and their own enriched data) with Company C. What is this called?
- A) Direct sharing
- B) Data resharing
- C) Data replication
- D) Data cloning

---

## Q22 (Single Answer)
What is a direct share in Snowflake?
- A) A share created through the Marketplace
- B) A point-to-point share created by a provider directly with one or more specific consumer accounts
- C) A share that bypasses the Cloud Services layer
- D) A share that includes only metadata

---

## Q23 (Single Answer)
What is Snowflake Marketplace?
- A) A third-party app store for BI tools
- B) A platform where data providers can publish and data consumers can discover, evaluate, and access shared data sets and data services
- C) A tool for managing warehouse credits
- D) A monitoring dashboard for data quality

---

## Q24 (Scenario)
A weather data company wants to make their global weather dataset available to any Snowflake customer for discovery and instant access. Which platform should they use?
- A) Direct shares to each customer individually
- B) Snowflake Marketplace with a public listing
- C) Database replication to all regions
- D) Email distribution of data files

---

## Q25 (Multi Answer - Select 2)
Which TWO types of listings are available on the Snowflake Marketplace? (Select 2)
- A) Private listings (shared with specific accounts)
- B) Public listings (available to all Snowflake customers)
- C) Encrypted listings (data encrypted during transfer)
- D) Temporary listings (expire after 30 days)
- E) Internal listings (within the same account)

---

## Q26 (Single Answer)
What is a private listing on the Snowflake Marketplace?
- A) A listing that is encrypted end-to-end
- B) A listing shared with specific, named Snowflake accounts rather than the general marketplace audience
- C) A listing that is hidden from all users
- D) A listing that requires a VPN to access

---

## Q27 (Single Answer)
What is a public listing on the Snowflake Marketplace?
- A) A listing available only to accounts in the same region
- B) A listing discoverable and accessible by any Snowflake customer through the Marketplace
- C) A listing that requires approval from Snowflake
- D) A free-only listing with no paid options

---

## Q28 (Scenario)
An organization wants to share a proprietary dataset only with their strategic partners (3 specific companies) through the Marketplace, but not make it publicly discoverable. What type of listing should they create?
- A) Public listing
- B) Private listing shared with the specific partner accounts
- C) Direct share without using Marketplace
- D) Free trial listing

---

## Q29 (Single Answer)
What is a Snowflake Native App?
- A) A mobile application for accessing Snowflake
- B) An application built using the Snowflake Native App Framework that can be distributed through the Marketplace and installed in consumer accounts
- C) A Python script that runs in Snowflake
- D) A Snowsight plugin

---

## Q30 (Multi Answer - Select 2)
Which TWO capabilities do Snowflake Native Apps provide beyond regular data sharing? (Select 2)
- A) Including application logic (stored procedures, UDFs) alongside shared data
- B) Providing read-write access to the provider's data
- C) Running code in the consumer's account for data processing
- D) Bypassing all security controls
- E) Directly modifying the provider's tables

---

## Q31 (Scenario)
A data analytics company wants to distribute both their proprietary dataset and a set of SQL-based analytics functions that process the data. They want consumers to install everything in their own account. Which feature should they use?
- A) Regular data sharing
- B) Snowflake Native App
- C) External function
- D) Database replication

---

## Q32 (Single Answer)
What is database replication in the context of data collaboration?
- A) Creating a backup within the same account
- B) Synchronizing a database across Snowflake accounts in different regions or cloud platforms for disaster recovery or data locality
- C) Copying tables between schemas
- D) Exporting data to external storage

---

## Q33 (Single Answer)
What is the primary difference between data sharing and database replication?
- A) Data sharing copies data; replication does not
- B) Data sharing provides in-place read-only access without copying data; replication creates a synchronized copy of the database in another account
- C) Replication is faster than sharing
- D) There is no difference

---

## Q34 (Scenario)
A company has users in the US and Europe. They need to provide low-latency access to the same dataset in both regions. Which approach should they use?
- A) Data sharing only
- B) Database replication to replicate the database to a Snowflake account in Europe
- C) Create an external table in Europe pointing to US storage
- D) Increase warehouse size in the US

---

## Q35 (Multi Answer - Select 2)
Which TWO are benefits of database replication for data collaboration? (Select 2)
- A) Providing data locality for low-latency access in different regions
- B) Eliminating all storage costs for replicated data
- C) Supporting disaster recovery by maintaining a synchronized copy
- D) Allowing consumers to modify the replicated data in the provider's account
- E) Automatically sharing with all Snowflake accounts

---

## Q36 (Single Answer)
What is data cloning in Snowflake?
- A) Copying data to an external system
- B) Creating a zero-copy clone of a database, schema, or table that initially shares the underlying micro-partitions with the source
- C) Replicating data across cloud regions
- D) Exporting data in a compressed format

---

## Q37 (Scenario)
A data engineer needs to create a copy of a production table for testing without duplicating the storage. Which Snowflake feature should they use?
- A) COPY INTO a new table
- B) CREATE TABLE ... CLONE
- C) INSERT INTO ... SELECT
- D) Database replication

---

## Q38 (Single Answer)
What does "zero-copy cloning" mean in Snowflake?
- A) No data is copied — the clone references the same underlying micro-partitions as the source, and only divergent data consumes additional storage
- B) Data is copied but takes zero time
- C) The clone is always free of charge
- D) Data is compressed to zero bytes

---

## Q39 (Multi Answer - Select 2)
Which TWO objects can be cloned in Snowflake? (Select 2)
- A) Databases
- B) Virtual warehouses
- C) Schemas
- D) Users
- E) Network policies

---

## Q40 (Single Answer)
What is Time Travel in Snowflake?
- A) A feature for scheduling queries in the future
- B) A feature that allows accessing historical data at any point within a defined retention period, enabling restoration of accidentally modified or deleted data
- C) A feature for migrating data between cloud providers
- D) A feature for tracking time-based metrics

---

## Q41 (Scenario)
An analyst accidentally drops a critical table. The table was a permanent table in an Enterprise Edition account with default settings. Can they recover it and how?
- A) No — dropped tables cannot be recovered
- B) Yes — use UNDROP TABLE within the Time Travel retention period
- C) Yes — but only by contacting Snowflake support
- D) Yes — use database replication to restore

---

## Q42 (Single Answer)
What is the Fail-safe period in Snowflake?
- A) A period during which users can directly access historical data
- B) A 7-day period after Time Travel expires during which Snowflake can recover data (only by Snowflake support, not user-accessible)
- C) A backup window managed by the user
- D) A period when the warehouse is automatically suspended

---

## Q43 (Multi Answer - Select 2)
Which TWO statements about Time Travel and Fail-safe are correct? (Select 2)
- A) Time Travel data is user-accessible via SQL commands
- B) Fail-safe data is directly accessible by users
- C) Fail-safe provides an additional 7-day recovery window managed by Snowflake
- D) Temporary tables have a Fail-safe period
- E) Transient tables have a 7-day Fail-safe period

---

## Q44 (Single Answer)
What SQL syntax is used to query historical data using Time Travel?
- A) SELECT ... FROM table BEFORE(timestamp)
- B) SELECT ... FROM table AT(TIMESTAMP => 'timestamp') or BEFORE(TIMESTAMP => 'timestamp')
- C) SELECT ... FROM table HISTORY('timestamp')
- D) SELECT ... FROM table ROLLBACK('timestamp')

---

## Q45 (Scenario)
At 3:00 PM, a user runs an UPDATE that accidentally overwrites important data in a table. They discover the error at 3:30 PM. How can they recover the original data?
- A) Check the Fail-safe
- B) Use Time Travel: SELECT * FROM table AT(TIMESTAMP => '2026-04-15 14:59:00')
- C) Restore from an external backup
- D) Query the stream on the table

---

## Q46 (Single Answer)
What is the maximum Time Travel retention period for permanent tables in Standard Edition?
- A) 0 days
- B) 1 day
- C) 7 days
- D) 90 days

---

## Q47 (Single Answer)
What is the maximum Time Travel retention period for permanent tables in Enterprise Edition (and higher)?
- A) 1 day
- B) 7 days
- C) 30 days
- D) 90 days

---

## Q48 (Multi Answer - Select 2)
Which TWO statements about data sharing and security are correct? (Select 2)
- A) Shared data inherits the provider's access control policies
- B) Consumers can grant access to shared data using their own roles
- C) Shared data is automatically decrypted for the consumer
- D) Consumers can modify the provider's masking policies
- E) Sharing bypasses all encryption

---

## Q49 (Single Answer)
What is a data clean room in Snowflake?
- A) A physical room for data processing
- B) A secure environment where multiple parties can collaborate on shared data without exposing their raw data to each other
- C) A tool for cleaning dirty data
- D) A warehouse configuration for secure queries

---

## Q50 (Scenario)
Two companies want to perform a joint customer analysis by matching their customer databases, but neither company wants to reveal their full customer list to the other. Which Snowflake feature enables this secure collaboration?
- A) Regular data sharing
- B) Data clean room
- C) Database replication
- D) Snowflake Marketplace public listing
