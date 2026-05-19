# Domain 5: Answers

---

## Q1
**Answer: B**

**Explanation:** Secure Data Sharing allows sharing data between Snowflake accounts without physically copying or transferring data. Consumers access the provider's data in place. It is not an encryption feature, compression tool, or read-write access mechanism.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Secure Data Sharing lets you share selected objects in a database in your account with other Snowflake accounts. The shared data is not copied or transferred between accounts."

---

## Q2
**Answer: B**

**Explanation:** Secure Data Sharing via a share object allows the provider to share tables with other Snowflake accounts without data copying or transfer costs. Database replication creates copies, and COPY INTO exports data.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Secure Data Sharing lets you share selected objects in a database in your account with other Snowflake accounts."

---

## Q3
**Answer: B**

**Explanation:** The data consumer pays for the compute (warehouse) costs when querying shared data. The provider incurs no compute costs for queries run by consumers. Storage costs remain with the provider.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "The consumer account uses its own compute resources (warehouses) to query the shared data."

---

## Q4
**Answer: A, C**

**Explanation:** Tables (A) and secure views (C) can be included in a share. Virtual warehouses (B), users (D), and resource monitors (E) cannot be shared. Secure views are recommended for sharing to protect underlying table definitions.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "You can share the following database objects: Tables, External tables, Secure views, Secure materialized views, Secure UDFs."

---

## Q5
**Answer: B**

**Explanation:** A data provider is a Snowflake account that creates a share and makes data available to other accounts (consumers). They own the data and control what is shared. They are not querying or loading data.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "A data provider is any Snowflake account that creates a share and makes it available to one or more Snowflake accounts."

---

## Q6
**Answer: B**

**Explanation:** A single share can include multiple consumer accounts. The provider creates one share and adds all three partner accounts, maintaining a single copy of the data. Replication would create separate copies, and exporting adds complexity.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "A provider can share data with one or more consumer accounts."

---

## Q7
**Answer: B**

**Explanation:** A data consumer is a Snowflake account that accesses data from a share created by a provider. They create a database from the share and query the data using their own warehouse.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "A data consumer is any Snowflake account that creates a database from a share made available by a data provider."

---

## Q8
**Answer: A, B**

**Explanation:** Full Snowflake accounts (A) and reader accounts (B) can consume shared data. Reader accounts are provisioned by the provider for non-Snowflake customers. AWS accounts without Snowflake (C), email accounts (D), and Azure AD accounts (E) cannot directly consume shares.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "You can share with any Snowflake account. For consumers who don't have a Snowflake account, providers can create reader accounts."

---

## Q9
**Answer: B**

**Explanation:** A reader account is a Snowflake account created by a data provider for consumers who don't have their own Snowflake account. The provider manages the account and pays for its compute usage.

**Source:** [Managing Reader Accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "Reader accounts enable data providers to share data with consumers who are not Snowflake customers."

---

## Q10
**Answer: B**

**Explanation:** The provider can create a reader account for the partner, which provides them with a Snowflake account to access the shared data. The provider manages and pays for the reader account's compute.

**Source:** [Managing Reader Accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "Reader accounts enable data providers to share data with consumers who are not Snowflake customers. The provider creates and manages the reader account."

---

## Q11
**Answer: B**

**Explanation:** The data provider who created the reader account is responsible for managing it and paying for its compute (warehouse) costs. Reader accounts use warehouses provisioned within the provider's environment.

**Source:** [Managing Reader Accounts](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create)

**Quote:** "The provider manages the reader account and is responsible for the compute costs."

---

## Q12
**Answer: B**

**Explanation:** Shared data is read-only for consumers. Consumers cannot perform INSERT, UPDATE, or DELETE operations on shared objects. They can only query the data using SELECT.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shared data is always read-only for consumer accounts."

---

## Q13
**Answer: B, C**

**Explanation:** No data is copied — consumers access the provider's data in place (B), and sharing happens in near real-time (C) as consumers see the current state of the provider's data. Data is not physically copied (A), there is no 24-hour delay (D), and no export/import is needed (E).

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "The shared data is not copied or transferred between accounts. Consumers see the current state of the data."

---

## Q14
**Answer: B**

**Explanation:** Consumers query the actual underlying data, so new rows inserted by the provider are visible immediately. There is no manual refresh, synchronization delay, or local copy.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Consumers see the current state of the shared data in real-time."

---

## Q15
**Answer: B**

**Explanation:** CREATE SHARE is the SQL command to create a share object. CREATE DATA_SHARE, SHARE DATABASE, and EXPORT SHARE are not valid Snowflake commands.

**Source:** [CREATE SHARE](https://docs.snowflake.com/en/sql-reference/sql/create-share)

**Quote:** "Creates a new share in the current/specified account."

---

## Q16
**Answer: C**

**Explanation:** Consumers use CREATE DATABASE ... FROM SHARE to create a local database that references the shared data. IMPORT SHARE, CONNECT TO SHARE, and LOAD SHARE are not valid commands.

**Source:** [CREATE DATABASE ... FROM SHARE](https://docs.snowflake.com/en/sql-reference/sql/create-database-from-share)

**Quote:** "Creates a database from a share provided by another account."

---

## Q17
**Answer: B**

**Explanation:** Secure views hide the view definition from consumers and prevent them from accessing the underlying tables or inferring data from the view's query plan. Standard views expose their definitions.

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "Secure views should be used when the view is specifically designated for data privacy."

---

## Q18
**Answer: B**

**Explanation:** Secure views hide the view definition and prevent consumers from accessing or inferring information about the underlying base tables. This is critical for data sharing where you want to control exactly what data consumers can see.

**Source:** [Secure Views](https://docs.snowflake.com/en/user-guide/views-secure)

**Quote:** "With secure views, the view definition and details are only visible to authorized users."

---

## Q19
**Answer: A, C**

**Explanation:** Shares are read-only for consumers (A), and shares work only between accounts in the same cloud region unless cross-region replication is used (C). Warehouses (B) and user credentials (E) cannot be shared, and data is not replicated (D).

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shared data is read-only for consumer accounts. Sharing is available between accounts in the same region."

---

## Q20
**Answer: B**

**Explanation:** Data resharing occurs when a consumer shares data they received from a provider with a third-party account. This extends the reach of shared data beyond the original sharing relationship.

**Source:** [Data Sharing Considerations](https://docs.snowflake.com/en/user-guide/data-sharing-intro#considerations)

**Quote:** "A consumer can reshare data with other Snowflake accounts."

---

## Q21
**Answer: B**

**Explanation:** When Company B shares data received from Company A with Company C, this is data resharing. Direct sharing is provider-to-consumer only, replication creates copies, and cloning is within an account.

**Source:** [Data Sharing Considerations](https://docs.snowflake.com/en/user-guide/data-sharing-intro#considerations)

**Quote:** "A consumer can reshare data with other Snowflake accounts."

---

## Q22
**Answer: B**

**Explanation:** A direct share is a point-to-point share created directly by a provider with specific consumer accounts, outside of the Marketplace. It is not created through the Marketplace, does not bypass Cloud Services, and includes actual data objects.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "A provider creates a share directly with one or more specific consumer accounts."

---

## Q23
**Answer: B**

**Explanation:** Snowflake Marketplace is a platform where data providers publish datasets and services, and consumers can discover, evaluate, and access them. It is not an app store, credit manager, or quality dashboard.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Snowflake Marketplace provides a place for Snowflake customers to discover, try, and buy data and services."

---

## Q24
**Answer: B**

**Explanation:** A public listing on the Snowflake Marketplace makes the dataset discoverable by all Snowflake customers. Direct shares would require individual setup for each customer, and replication creates copies rather than listings.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Providers can publish listings on the Marketplace for discovery and access by all Snowflake customers."

---

## Q25
**Answer: A, B**

**Explanation:** Snowflake Marketplace supports private listings (A) shared with specific accounts and public listings (B) available to all Snowflake customers. There are no encrypted, temporary, or internal-only listing types.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Listings can be either private (shared with specific accounts) or public (available to all Snowflake customers)."

---

## Q26
**Answer: B**

**Explanation:** A private listing is shared with specific, named Snowflake accounts. It is not publicly discoverable in the Marketplace. It is not encrypted (all data is encrypted by default), hidden from all, or VPN-required.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Private listings are shared with specific consumer accounts and are not visible in the public Marketplace."

---

## Q27
**Answer: B**

**Explanation:** A public listing is discoverable and accessible by any Snowflake customer through the Marketplace. Public listings can be free or paid. They are not region-restricted by default and don't necessarily require Snowflake approval.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Public listings are available for discovery and access by all Snowflake customers."

---

## Q28
**Answer: B**

**Explanation:** A private listing on the Marketplace lets the provider share data with specific partner accounts without making it publicly discoverable. Direct share without Marketplace (C) is also possible but doesn't leverage Marketplace discovery features.

**Source:** [Snowflake Marketplace](https://docs.snowflake.com/en/user-guide/data-marketplace)

**Quote:** "Private listings are shared with specific consumer accounts and are not visible in the public Marketplace."

---

## Q29
**Answer: B**

**Explanation:** A Native App is built using the Snowflake Native App Framework and can include data, logic (stored procedures, UDFs), and UI components. It can be distributed through the Marketplace and installed in consumer accounts.

**Source:** [Snowflake Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "The Snowflake Native App Framework allows providers to build, sell, and distribute applications to Snowflake consumers."

---

## Q30
**Answer: A, C**

**Explanation:** Native Apps can include application logic alongside data (A) and run code in the consumer's account (C). They do not provide read-write access to the provider's data (B), bypass security (D), or modify provider tables (E).

**Source:** [Snowflake Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "Native Apps can include stored procedures, UDFs, and Streamlit apps alongside shared data, running in the consumer's account."

---

## Q31
**Answer: B**

**Explanation:** A Native App packages both data and application logic (SQL functions, UDFs, stored procedures) together for installation in consumer accounts. Regular sharing only provides data access, not logic.

**Source:** [Snowflake Native App Framework](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)

**Quote:** "The Snowflake Native App Framework allows providers to build, sell, and distribute applications to Snowflake consumers."

---

## Q32
**Answer: B**

**Explanation:** Database replication synchronizes a database across accounts in different regions or cloud platforms. This supports disaster recovery and data locality. It is not a same-account backup, schema copy, or external export.

**Source:** [Introduction to Replication and Failover](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Replication enables replicating databases, shares, and other account objects across Snowflake accounts in different regions and cloud platforms."

---

## Q33
**Answer: B**

**Explanation:** Data sharing provides in-place, read-only access without copying data. Replication creates a physical, synchronized copy of the database in another account. Sharing is instant and free of data transfer costs; replication has storage and transfer costs.

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Secure Data Sharing does not copy or transfer data. Replication creates a copy of the database in the target account."

---

## Q34
**Answer: B**

**Explanation:** Database replication creates a synchronized copy in the European region, providing low-latency access for European users. Data sharing alone would require cross-region queries, which could have latency.

**Source:** [Introduction to Replication and Failover](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Replication enables replicating databases across Snowflake accounts in different regions for data locality."

---

## Q35
**Answer: A, C**

**Explanation:** Replication provides data locality for low-latency access in different regions (A) and supports disaster recovery with synchronized copies (C). It does not eliminate storage costs (B), allow consumer modification of provider data (D), or auto-share with all accounts (E).

**Source:** [Introduction to Replication and Failover](https://docs.snowflake.com/en/user-guide/account-replication-intro)

**Quote:** "Replication enables data locality and disaster recovery across regions and cloud platforms."

---

## Q36
**Answer: B**

**Explanation:** Cloning creates a zero-copy clone that initially shares the same underlying micro-partitions with the source. No data is physically copied. Only divergent changes consume additional storage.

**Source:** [Cloning Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations#cloning)

**Quote:** "A clone does not contribute to the overall data storage for an account until operations are performed on the clone that modify existing data or add new data."

---

## Q37
**Answer: B**

**Explanation:** CREATE TABLE ... CLONE creates a zero-copy clone of the table. The clone shares the underlying micro-partitions, so no additional storage is used initially. COPY INTO and INSERT INTO would duplicate data.

**Source:** [CREATE TABLE ... CLONE](https://docs.snowflake.com/en/sql-reference/sql/create-table#clone-semantics)

**Quote:** "Creates a clone of an existing table. The clone is a copy of the table metadata and, initially, shares the underlying micro-partitions."

---

## Q38
**Answer: A**

**Explanation:** Zero-copy cloning means the clone references the same micro-partitions as the source. No data is physically duplicated. Only changes made after cloning (divergent data) consume additional storage. It is not about speed or cost.

**Source:** [Cloning Considerations](https://docs.snowflake.com/en/user-guide/tables-storage-considerations#cloning)

**Quote:** "A clone does not contribute to the overall data storage for an account until operations are performed on the clone that modify existing data."

---

## Q39
**Answer: A, C**

**Explanation:** Databases (A) and schemas (C) can be cloned in Snowflake (along with tables and stages). Virtual warehouses (B), users (D), and network policies (E) cannot be cloned.

**Source:** [CREATE ... CLONE](https://docs.snowflake.com/en/sql-reference/sql/create-clone)

**Quote:** "Cloning is supported for databases, schemas, tables, and stages."

---

## Q40
**Answer: B**

**Explanation:** Time Travel allows accessing historical data at any point within a defined retention period (up to 90 days in Enterprise+). This enables restoring accidentally modified or deleted data. It is not future scheduling, migration, or metrics tracking.

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Time Travel enables accessing historical data (i.e. data that has been changed or deleted) at any point within a defined period."

---

## Q41
**Answer: B**

**Explanation:** UNDROP TABLE restores a dropped table within the Time Travel retention period. In Enterprise Edition, permanent tables have up to 90 days of Time Travel (default is 1 day). The table can be recovered without contacting support.

**Source:** [UNDROP TABLE](https://docs.snowflake.com/en/sql-reference/sql/undrop-table)

**Quote:** "Restores the most recent version of a dropped table."

---

## Q42
**Answer: B**

**Explanation:** Fail-safe is a 7-day period after Time Travel expires during which Snowflake can recover data — but only through Snowflake support (not user-accessible). It provides an additional safety net beyond Time Travel.

**Source:** [Understanding & Using Fail-safe](https://docs.snowflake.com/en/user-guide/data-failsafe)

**Quote:** "Fail-safe provides a (non-configurable) 7-day period during which historical data may be recoverable by Snowflake. This is provided as a best-effort service."

---

## Q43
**Answer: A, C**

**Explanation:** Time Travel data is user-accessible via SQL (A), and Fail-safe provides an additional 7-day recovery window managed by Snowflake (C). Fail-safe is NOT directly accessible by users (B). Temporary tables have no Fail-safe (D), and transient tables have no Fail-safe (E).

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "Time Travel enables users to access historical data using SQL. Fail-safe provides an additional 7-day period managed by Snowflake."

---

## Q44
**Answer: B**

**Explanation:** Time Travel queries use AT(TIMESTAMP => 'value') or BEFORE(TIMESTAMP => 'value') syntax. AT returns data as of the specified point, BEFORE returns data just before the specified point.

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "To query historical data, use the AT or BEFORE clause: SELECT ... FROM table AT(TIMESTAMP => 'timestamp')."

---

## Q45
**Answer: B**

**Explanation:** Using Time Travel with AT(TIMESTAMP => '2026-04-15 14:59:00') returns the data as it existed at 2:59 PM — just before the erroneous update at 3:00 PM. This allows recovering the original data.

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "SELECT ... FROM table AT(TIMESTAMP => 'timestamp') returns the data as it existed at the specified point in time."

---

## Q46
**Answer: B**

**Explanation:** In Standard Edition, the maximum Time Travel retention period for permanent tables is 1 day (24 hours). Extended Time Travel (up to 90 days) requires Enterprise Edition or higher.

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Standard Edition accounts, Time Travel retention is limited to 1 day."

---

## Q47
**Answer: D**

**Explanation:** In Enterprise Edition and higher, permanent tables can have a Time Travel retention period of up to 90 days. This is configurable via the DATA_RETENTION_TIME_IN_DAYS parameter.

**Source:** [Understanding & Using Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel)

**Quote:** "For Enterprise Edition (or higher), the retention period can be set to any value from 0 up to 90 days."

---

## Q48
**Answer: A, B**

**Explanation:** Shared data inherits the provider's access control (masking, row access policies) (A), and consumers can manage access within their account using their own roles (B). Consumers cannot modify provider's policies (D), and sharing does not bypass encryption (E).

**Source:** [Introduction to Secure Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro)

**Quote:** "Shared data respects the provider's security policies. Consumers use their own roles to manage access to the shared database."

---

## Q49
**Answer: B**

**Explanation:** A data clean room is a secure environment where multiple parties can collaborate on shared data (e.g., perform joint analyses) without exposing their raw data to each other. It is not a physical room, cleaning tool, or warehouse configuration.

**Source:** [Data Clean Rooms](https://docs.snowflake.com/en/user-guide/data-clean-rooms/data-clean-rooms-about)

**Quote:** "A data clean room provides a secure environment for two or more parties to perform joint analysis on their combined data sets without exposing the underlying raw data."

---

## Q50
**Answer: B**

**Explanation:** Data clean rooms enable secure collaboration where companies can perform joint analysis (like customer matching) without exposing their full datasets to each other. Regular sharing, replication, and public listings do not provide this privacy-preserving collaboration.

**Source:** [Data Clean Rooms](https://docs.snowflake.com/en/user-guide/data-clean-rooms/data-clean-rooms-about)

**Quote:** "A data clean room provides a secure environment for two or more parties to perform joint analysis on their combined data sets without exposing the underlying raw data."
