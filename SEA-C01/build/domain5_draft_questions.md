# Domain 5: Securing Snowflake Services and Features for AI/ML and Applications

---

## Q1 (Scenario)
A Security Engineer is reviewing a Snowflake Native App installed from the Marketplace. The app requests a privilege grant that allows it to CREATE COMPUTE POOL in the consumer's account. What risk does this represent, and what should the Security Engineer verify before approving?

- A) No risk; compute pools are isolated sandboxes with no access to consumer data
- B) The compute pool could run arbitrary code on consumer infrastructure; verify that the app has a legitimate reason for SPCS compute and review the app's network egress rules before approving
- C) Compute pool creation only affects billing; approve if the cost is acceptable
- D) SPCS compute pools are always isolated from Snowflake data; the only risk is network bandwidth consumption

---

## Q2 (Scenario)
A data science team is building a machine learning pipeline in Snowpark Container Services (SPCS). Their training container needs to download model weights from an external model repository at startup. How should this external network access be configured securely?

- A) Grant the compute pool ACCOUNTADMIN role to enable unrestricted network access during training
- B) Create an EXTERNAL ACCESS INTEGRATION specifying the model repository's allowed domains and secrets, and assign it to the SPCS service
- C) Enable ALL_OUTBOUND = TRUE on the compute pool's network policy
- D) Configure the container's Dockerfile to hardcode the repository URL; no Snowflake configuration is needed

---

## Q3 (Multi Answer - Select 2)
A Security Engineer needs to control which users can invoke a deployed SPCS service endpoint. Which two mechanisms control access to SPCS service endpoints?

- A) GRANT SERVICE ROLE <service_name>!<role_name> TO ROLE <consumer_role>
- B) Assigning an EXTERNAL ACCESS INTEGRATION to the service
- C) Applying a row-access policy on the service's underlying table
- D) Setting INGRESS_ENABLED = TRUE and configuring the ENDPOINT object with GRANTS

---

## Q4 (Scenario)
A Security Engineer discovers that a Snowpark Python UDF is using the `requests` library to send data to an external analytics endpoint. The UDF is owned by SYSADMIN and callable by any analyst role. What is the security concern and remediation?

- A) Snowpark UDFs cannot make external network calls; this is a false positive and no action is needed
- B) The UDF may be exfiltrating data to an external endpoint without governance; review the UDF definition, remove unauthorized external calls, and if external access is legitimate, require explicit EXTERNAL ACCESS INTEGRATION with an approved allowlist
- C) Apply a masking policy to the UDF's input parameters to prevent sensitive data from leaving Snowflake
- D) Grant USAGE on the UDF to only SYSADMIN to prevent analyst access

---

## Q5 (Scenario)
A developer wants to use CORTEX.COMPLETE to summarize customer support tickets that contain PII. The Security Engineer is concerned about data leakage to the underlying LLM. What controls should be implemented?

- A) Apply dynamic data masking to the ticket table so that PII fields are masked before being passed to CORTEX.COMPLETE by roles without the appropriate unmasking privilege
- B) Disable CORTEX.COMPLETE for all roles that have access to PII tables
- C) Use TRY_COMPLETE instead; it automatically strips PII before sending to the LLM
- D) Enable Tri-Secret Secure to prevent the LLM from receiving unencrypted data

---

## Q6 (Scenario)
A Security Engineer needs to audit all invocations of Snowflake Cortex AI functions (CORTEX.COMPLETE, CLASSIFY_TEXT, etc.) by data scientists over the past 30 days. Which view provides this audit trail?

- A) SNOWFLAKE.ACCOUNT_USAGE.CORTEX_USAGE_HISTORY
- B) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY filtered on query_text ILIKE '%SNOWFLAKE.CORTEX%'
- C) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY filtered on objects_accessed containing CORTEX functions
- D) SNOWFLAKE.ACCOUNT_USAGE.METERING_HISTORY filtered on service_type = 'AI_SERVICES'

---

## Q7 (Scenario)
A Snowflake Native App provider wants to allow consumers to grant the app SELECT access to their tables, but only tables in a specific schema. Which Native App Framework mechanism supports this scoped, consumer-controlled privilege grant?

- A) REFERENCE — the app defines a named reference that the consumer fulfills by pointing it to a specific table
- B) UBAC — the provider pre-defines which tables the app can access during submission
- C) GRANT PRIVILEGE ON APPLICATION to allow full schema access
- D) The provider uses IMPORTED PRIVILEGES ON DATABASE to access consumer tables

---

## Q8 (Multi Answer - Select 2)
A Security Engineer is reviewing the security model of a Snowflake Native App. The app uses stored procedures with EXECUTE AS OWNER. Which two statements correctly describe the security implications?

- A) EXECUTE AS OWNER stored procedures run with the application's owner role privileges, potentially allowing access to consumer data beyond what the consumer explicitly grants
- B) EXECUTE AS OWNER is required for all Native App stored procedures and has no special security implications
- C) Consumers should review what privileges the application's owner role holds before approving EXECUTE AS OWNER procedures
- D) EXECUTE AS OWNER prevents the stored procedure from accessing any consumer tables

---

## Q9 (Scenario)
A Security Engineer is securing a Streamlit application deployed in Snowflake. The app allows users to run ad-hoc SQL queries against production tables. What is the MOST critical security control to implement?

- A) Restrict the Streamlit app's Snowflake role to the minimum required permissions and use parameterized queries to prevent SQL injection; consider wrapping queries in row-access policies
- B) Enable Tri-Secret Secure so the app cannot access encryption keys
- C) Deploy the Streamlit app in a separate Virtual Private Snowflake (VPS) account
- D) Apply a masking policy to all tables the app can access

---

## Q10 (Scenario)
A Security Engineer needs to store an API key used by a Snowpark Python UDF to call an external enrichment service. The API key must not be visible in query history, SHOW FUNCTIONS output, or the function definition. What is the CORRECT approach?

- A) Hardcode the API key in the function body with comments marking it as sensitive
- B) Create a Snowflake SECRET object with the API key value, grant USAGE on the secret to the appropriate role, and reference the secret in the EXTERNAL ACCESS INTEGRATION used by the UDF
- C) Store the API key in a Snowflake table with a masking policy applied
- D) Pass the API key as a UDF parameter and rely on query history access controls to protect it

---

## Q11 (Scenario)
A Security Engineer discovers that a data engineer created a Snowflake SECRET of type GENERIC_STRING containing a database password, then stored it in a schema accessible to all analysts. What is the security risk and remediation?

- A) Secrets are always encrypted and inaccessible to analysts regardless of schema permissions; no risk
- B) Users with USAGE on the secret can reference it in external access integrations, potentially using the stored credential to access external systems; restrict the secret to a dedicated security schema with GRANT USAGE to only authorized service roles
- C) Apply a masking policy to the SECRET object to hide its contents from analysts
- D) Move the secret to the ACCOUNTADMIN schema where only admins can access it

---

## Q12 (Scenario)
An organization uses Cortex Agents for customer service automation. The agent has access to a Cortex Search service over customer data and a SQL tool. A Security Engineer is concerned about prompt injection attacks where malicious content in the database could manipulate the agent's behavior. What controls reduce this risk?

- A) Define strict system prompts for the agent that specify how it should handle user queries; apply row-access policies on the data indexed by Cortex Search to limit what the agent can retrieve; monitor agent tool call logs in QUERY_HISTORY
- B) Enable Tri-Secret Secure on the Cortex Search service to prevent prompt injection
- C) Use TRY_COMPLETE instead of the full agent framework to sandbox prompt processing
- D) Apply dynamic data masking to all columns in the Cortex Search service's source tables

---

## Q13 (Multi Answer - Select 2)
A Security Engineer is reviewing the security of an SPCS service that runs a model inference API. The service is exposed via a public endpoint. Which two controls are ESSENTIAL for securing this public endpoint?

- A) Configure GRANT SERVICE ROLE to restrict which Snowflake roles can invoke the endpoint
- B) Implement authentication for the endpoint (Snowflake token-based) so unauthenticated requests are rejected
- C) Place the SPCS compute pool in a dedicated VPC with no outbound internet access
- D) Apply a row-access policy to the compute pool's configuration table

---

## Q14 (Scenario)
A Security Engineer is assessing whether Cortex AI functions send data outside the customer's Snowflake account region. What should they communicate to the data governance team?

- A) All Cortex AI function processing occurs within Snowflake's infrastructure; data may be processed on Snowflake-managed compute that is cross-region depending on model availability
- B) Cortex AI functions send all input data to OpenAI's API in the US, regardless of account region
- C) Cortex AI functions are fully on-premises and never leave the customer's private cloud
- D) Cortex AI function data stays strictly within the customer's Snowflake account region at all times with no exceptions

---

## Q15 (Scenario)
A Security Engineer needs to ensure that only users with the CORTEX_USER role can invoke Snowflake Cortex AI functions in their account. How is this controlled?

- A) The CORTEX_USER role is granted to users who should have access; users without this role receive an error when attempting to call Cortex functions
- B) Create a custom masking policy that blocks Cortex function calls for unauthorized users
- C) Apply a row-access policy to the CORTEX_USAGE_HISTORY view to restrict who can see AI function usage
- D) Use an authentication policy to block CORTEX.COMPLETE for non-admin roles

---

## Q16 (Scenario)
A Security Engineer is reviewing a Native App that requests BIND SERVICE ENDPOINT privilege from the consumer. What capability does this grant the app?

- A) The app can create SPCS services with externally accessible endpoints in the consumer's account
- B) The app can bind to the consumer's existing Snowflake authentication service
- C) The app can read the consumer's network policy configuration
- D) The app can create external functions that call APIs on behalf of the consumer

---

## Q17 (Scenario)
A data science team wants to use Snowpark Container Services to run GPU-based model training. The Security Engineer wants to ensure the training containers cannot access production customer data. How can this be enforced?

- A) Create a dedicated compute pool for ML training with network rules that block access to production database schemas; use separate Snowflake roles for training vs. production
- B) Deploy the training compute pool in a separate Snowflake account with no access to the production account
- C) Apply a masking policy to all production tables to mask data accessed from SPCS containers
- D) Use Tri-Secret Secure on the training compute pool to prevent unauthorized key access

---

## Q18 (Multi Answer - Select 2)
A Security Engineer is reviewing the security of a Snowflake Streamlit app that performs OAuth-based login to a third-party CRM. Which two Snowflake features are involved in securing this external OAuth connection?

- A) EXTERNAL ACCESS INTEGRATION specifying the CRM's OAuth endpoint as an allowed host
- B) A SECRET object of type OAUTH2 storing the client credentials for the CRM OAuth flow
- C) A SAML2 security integration for federated identity with the CRM
- D) A network policy binding the Streamlit app's session to the CRM's IP range

---

## Q19 (Scenario)
A Security Engineer discovers that multiple Snowpark UDFs with EXTERNAL ACCESS INTEGRATIONS are creating outbound connections to the same internal data aggregation server. The server is not in the approved allowlist. What is the appropriate response?

- A) Drop the offending UDFs, revoke CREATE FUNCTION from the developer roles that created them, add the server to the denied list in the EXTERNAL ACCESS INTEGRATION, and investigate via QUERY_HISTORY to assess the scope
- B) Apply a masking policy to the UDF return values to prevent data leakage
- C) Add the server to the approved allowlist since it is internal
- D) Disable EXTERNAL ACCESS INTEGRATIONS globally until a review is completed

---

## Q20 (Scenario)
A Security Engineer is auditing a Native App installed from the Marketplace. The app has been granted USAGE on a schema containing sensitive financial data without the consumer security team's knowledge. Who authorized this grant, and how can it be revoked?

- A) Application REFERENCES grants are always made by the consumer account's ACCOUNTADMIN or authorized roles via explicit approval; the grant can be revoked using REVOKE REFERENCE from APPLICATION
- B) The provider can grant themselves access to consumer schemas; contact the provider to request revocation
- C) Snowflake automatically grants Native Apps access to all schemas in the consumer account; this cannot be revoked
- D) The grant was made by ACCOUNTADMIN and cannot be revoked without dropping the app

---

## Q21 (Scenario)
A Security Engineer is designing a policy for AI/ML workloads that prevents model training jobs from reading data outside their designated training dataset schemas. Which Snowflake access control mechanism is MOST appropriate?

- A) Create dedicated roles for each ML workload with GRANT SELECT on only the specific training dataset schemas; ensure service accounts for ML jobs use only these roles
- B) Apply aggregation policies on training datasets to prevent raw data access
- C) Use Tri-Secret Secure on the training data to prevent ML jobs from decrypting it
- D) Apply a row-access policy that restricts ML roles to rows tagged with "TRAINING_DATA"

---

## Q22 (Scenario)
A Security Engineer needs to restrict which Snowflake roles can create EXTERNAL ACCESS INTEGRATIONS, as these represent potential data exfiltration channels. Currently, any SYSADMIN-equivalent role can create them. What is the CORRECT control?

- A) EXTERNAL ACCESS INTEGRATION objects require CREATE INTEGRATION privilege, which should be granted only to ACCOUNTADMIN or a dedicated network security role; revoke it from SYSADMIN and all non-network roles
- B) Apply a row-access policy to the INTEGRATIONS view to hide external access integrations from non-admin roles
- C) Require MFA for all users who create external access integrations
- D) Use Tri-Secret Secure to require KMS approval before any external access integration becomes active

---

## Q23 (Scenario)
An organization uses Cortex Agents connected to a REST API tool that calls an external ticketing system. The agent uses a SECRET object for API authentication. A Security Engineer discovers the secret is stored in a PUBLIC schema. What is the risk and remediation?

- A) Any Snowflake user with USAGE on the PUBLIC schema can reference the secret in their own external access integrations, potentially using the ticketing system credentials; move the secret to a private schema and restrict USAGE to the agent's service role only
- B) Secrets in PUBLIC schemas are automatically encrypted and inaccessible to non-owners
- C) Apply a masking policy to the SECRET object to prevent credential leakage
- D) The risk is minimal because the secret value is never displayed in query results

---

## Q24 (Multi Answer - Select 2)
A Security Engineer is evaluating the data privacy risks of using Snowflake Cortex AI functions with customer data. Which two privacy controls should be implemented before enabling Cortex AI functions on PII-containing tables?

- A) Apply dynamic data masking to PII columns so that roles using Cortex AI functions receive masked data unless they have explicit unmask privileges
- B) Create a data governance policy documenting that Cortex AI functions may process PII on Snowflake-managed compute, and obtain appropriate data processing agreements
- C) Enable Tri-Secret Secure to prevent Cortex AI from accessing unencrypted PII
- D) Disable query history logging for all Cortex AI function calls to prevent PII from appearing in audit logs

---

## Q25 (Scenario)
A Security Engineer is reviewing a Snowflake Native App that requests the consumer to CREATE DATABASE for the app to use. What is the security implication of approving this request?

- A) The database will be owned by the application, meaning the app provider's code can read and write all objects in that database; the consumer should audit what data is expected to be stored there
- B) Native Apps cannot create databases in the consumer account; this request type is invalid
- C) The consumer's ACCOUNTADMIN retains full ownership of any database created by the app
- D) The database created by the app is isolated in a separate virtual private cloud with no connection to the consumer's data

---

## Q26 (Scenario)
A Security Engineer wants to monitor all SPCS service endpoint invocations for a specific service to detect unauthorized access. Which Snowflake view provides SPCS service access logs?

- A) SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY with service_name filter
- B) SNOWFLAKE.ACCOUNT_USAGE.SPCS_INGRESS_ACCESS_HISTORY
- C) SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY filtered on service endpoint calls
- D) SNOWFLAKE.INFORMATION_SCHEMA.SPCS_SERVICES

---

## Q27 (Scenario)
A Security Engineer is securing a Snowpark Python stored procedure that uses a machine learning model to score transactions and flag fraud. The model is loaded from a Snowflake stage. What access control ensures that only the fraud detection pipeline role can execute the scoring procedure?

- A) GRANT EXECUTE ON PROCEDURE <schema>.<procedure>(<signature>) TO ROLE fraud_pipeline_role; revoke EXECUTE from PUBLIC and all other roles
- B) Apply a row-access policy on the stage containing the model to restrict loading to the fraud pipeline role
- C) Enable EXECUTE AS CALLER on the procedure to ensure it runs with the caller's role
- D) Grant USAGE on the procedure to SYSADMIN only and have the fraud pipeline call it via a SYSADMIN stored procedure

---

## Q28 (Scenario)
A Security Engineer discovers that a SPCS job service has EXTERNAL_ACCESS_INTEGRATION configured with allowed_network_rules that include a wildcard allowing ALL outbound traffic. What is the risk and remediation?

- A) No risk; SPCS containers are isolated and cannot access external networks regardless of the integration configuration
- B) The wildcard allows the container to send data to any external destination, enabling exfiltration; replace the wildcard with explicit ALLOW rules for specific required hosts and ports
- C) Wildcard rules are standard practice for SPCS; restrict at the cloud provider VPC level instead
- D) Apply a Snowflake masking policy to the EXTERNAL_ACCESS_INTEGRATION configuration to hide the wildcard rule

---

## Q29 (Scenario)
A Security Engineer is reviewing the security posture of Cortex Search services deployed for an enterprise search application. The search service indexes documents containing confidential legal contracts. What access control ensures that users only see search results for documents they are authorized to access?

- A) Apply a row-access policy on the source table used by the Cortex Search service; the search results will respect the row-access policy of the querying role
- B) Create a separate Cortex Search service for each security classification level
- C) Use dynamic data masking on the document content column so unauthorized users see redacted text in search results
- D) Restrict the Cortex Search service query endpoint to ACCOUNTADMIN only

---

## Q30 (Multi Answer - Select 2)
A Security Engineer is implementing security controls for a generative AI application built on Snowflake Cortex Agents. The agent can call Cortex Search and execute SQL via a SQL tool. Which two security controls are MOST important for this application?

- A) Implement least-privilege for the agent's Snowflake role—grant only SELECT on the tables the SQL tool should query
- B) Apply prompt hardening in the system prompt to instruct the agent not to execute DROP, DELETE, or GRANT statements
- C) Enable Tri-Secret Secure on all tables the agent can access
- D) Apply a session policy with a 5-minute idle timeout to the agent's service account

---

## Q31 (Scenario)
A Security Engineer is asked to ensure that a Snowflake Native App cannot access or modify any data outside of objects explicitly granted by the consumer. Which Native App Framework feature provides this assurance?

- A) The Native App Framework's APPLICATION privilege model requires explicit consumer grants for every database, schema, or table the app accesses; the app cannot access consumer objects without explicit grants
- B) Snowflake automatically applies row-access policies to all consumer objects accessed by Native Apps
- C) The provider submits a declaration of all objects accessed, and Snowflake enforces this at runtime
- D) UBAC grants the consumer automatic visibility into all app data access with no additional configuration

---

## Q32 (Scenario)
A Snowflake account has several Snowpark Container Services compute pools. A Security Engineer needs to ensure that compute pools used for development cannot access production databases. How should this be enforced?

- A) Assign separate Snowflake roles to production and development compute pools; the development role should have no GRANT access to production databases or schemas
- B) Place production and development compute pools in separate AWS VPCs with VPC peering disabled
- C) Apply a masking policy on production tables visible from development compute pools
- D) Use separate Snowflake accounts for production and development and enable replication for data sharing

---

## Q33 (Scenario)
A Security Engineer discovers that a developer used SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO() within a Snowpark UDF to enumerate the Snowflake infrastructure. While not immediately harmful, what does this behavior indicate and what is the response?

- A) Infrastructure enumeration within UDFs is a reconnaissance technique; audit the developer's recent activity in QUERY_HISTORY, review the UDF definition, and implement a policy restricting use of system functions in UDFs not owned by security-approved roles
- B) SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO() is blocked for all UDFs by default; no action needed
- C) Drop the UDF and apply a masking policy to the INFORMATION_SCHEMA to prevent further enumeration
- D) Grant the developer ACCOUNTADMIN to ensure they use official admin interfaces instead of workarounds

---

## Q34 (Scenario)
A Security Engineer is building a secure AI pipeline where CORTEX.COMPLETE is used to classify support tickets. Some tickets contain healthcare PHI. Before sending ticket text to CORTEX.COMPLETE, what is the RECOMMENDED data preparation step for HIPAA compliance?

- A) Use Snowflake AI_REDACT or a custom masking UDF to redact PHI from ticket text before passing it to CORTEX.COMPLETE; retain original PHI-containing data in the source table with appropriate access controls
- B) Apply a row-access policy to filter out PHI-containing rows before the Cortex function processes them
- C) Use TRY_COMPLETE which automatically strips PHI per HIPAA Safe Harbor rules
- D) Submit a HIPAA Business Associate Agreement to Snowflake before using Cortex functions; no data preparation is required

---

## Q35 (Scenario)
A Security Engineer needs to configure an SPCS service that calls an internal microservice on a private IP address within the same cloud region. The microservice is not accessible from the public internet. How should this network access be configured?

- A) Use an EXTERNAL ACCESS INTEGRATION with a NETWORK RULE of type HOST_PORT pointing to the private IP:port of the microservice
- B) Configure the SPCS compute pool with a VPC peering connection to the microservice's VPC
- C) Use PrivateLink to establish a private connection from SPCS to the microservice
- D) Hardcode the private IP in the container's environment variables; no Snowflake configuration needed

---

## Q36 (Multi Answer - Select 2)
A Security Engineer is reviewing the access model for a Cortex Agent that has both a Cortex Search tool and an external API tool. Which two auditing capabilities are available for monitoring the agent's activity?

- A) QUERY_HISTORY captures all SQL queries executed by the agent's SQL tool calls, including the role used
- B) CORTEX_AGENT_AUDIT_LOG view provides a per-message trace of all agent reasoning steps and tool invocations
- C) ACCESS_HISTORY shows which objects were accessed as a result of the agent's SQL queries
- D) A dedicated AGENT_TOOL_CALL_HISTORY view provides per-invocation logs of all external tool calls

---

## Q37 (Scenario)
A Security Engineer is designing access controls for a Snowflake Native App that allows consumers to use it for analytics. The provider wants to ensure the app can call CORTEX.COMPLETE but the consumer's Snowflake account has disabled Cortex AI by default. What must be configured in the consumer account for the Native App to use Cortex AI functions?

- A) The consumer must grant the CORTEX_USER role to the APPLICATION object so that the app's stored procedures can invoke Cortex AI functions
- B) The provider enables Cortex AI in the consumer account via the Marketplace listing
- C) No consumer configuration needed; Native Apps inherit the provider's Cortex AI entitlements
- D) The consumer must purchase a separate Cortex AI add-on license for Native App usage

---

## Q38 (Scenario)
A Security Engineer notices that a Snowflake data science role (DS_ROLE) has been granted CREATE MODEL in the model registry schema. What is the security concern with broadly granting this privilege?

- A) CREATE MODEL allows deployment of arbitrary Python code via the model registry's inference methods; if the model contains malicious code, it could be executed during inference; restrict CREATE MODEL to approved ML engineer roles with a code review process
- B) CREATE MODEL only creates metadata entries with no code execution risk
- C) Models in the Snowflake registry are sandboxed and cannot access Snowflake data
- D) CREATE MODEL is equivalent to CREATE TABLE; there is no additional security concern

---

## Q39 (Scenario)
A Security Engineer is evaluating a Snowflake integration where third-party Python packages are used in Snowpark UDFs. The organization's security policy requires all packages to be vetted. How does Snowflake's Anaconda integration help enforce this policy?

- A) Snowflake maintains a curated list of packages in the Snowflake conda channel that have been security-vetted; restrict UDFs to use only packages from the Snowflake conda channel by not allowing IMPORTS from external stages containing unvetted packages
- B) All PyPI packages are automatically security-scanned by Snowflake before installation
- C) External packages in Snowpark UDFs are blocked by default unless the user has ACCOUNTADMIN
- D) The Anaconda integration enforces GPL license restrictions but does not provide security vetting

---

## Q40 (Scenario)
A Security Engineer needs to ensure that a Snowpark model inference UDF does not output predictions for users with insufficient clearance to view the underlying data. The UDF takes a row identifier as input and returns a prediction. What is the BEST access control approach?

- A) Implement EXECUTE AS CALLER on the UDF so it runs with the calling user's role; the UDF's internal SELECT will be subject to any row-access policies on the underlying data, preventing unauthorized access
- B) Apply a masking policy to the UDF's return value column
- C) Grant EXECUTE on the UDF only to approved clearance-level roles
- D) Use a session policy with minimum role requirements to prevent low-clearance users from invoking the UDF

---

## Q41 (Scenario)
A Security Engineer is reviewing the trust model for SPCS services deployed with SPEC PERMISSION = ENABLE. What does this permission allow, and why is it a security concern?

- A) ENABLE permits the service spec to be modified by any user with OPERATE on the service; a malicious actor could modify the service to run unauthorized code; restrict OPERATE to service owners only
- B) ENABLE allows the service to run without any authentication requirements on its endpoints; configure endpoint authentication before enabling
- C) ENABLE grants the service's container root access to the Snowflake file system
- D) ENABLE has no security implications; it simply marks the service as active

---

## Q42 (Scenario)
A Security Engineer is tasked with ensuring that all Snowflake ML model training runs in the organization's approved cloud region and does not involve cross-region data transfers. Which Snowflake feature configuration helps enforce this?

- A) Deploy SPCS compute pools in the same region as the production account; configure EXTERNAL ACCESS INTEGRATIONS to restrict outbound calls to regional endpoints; verify SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO() region matches the approved region
- B) Enable geographic restrictions on the Snowflake account via ALTER ACCOUNT SET ALLOWED_REGIONS
- C) Apply row-access policies that filter out data when accessed from cross-region Snowflake accounts
- D) Use Tri-Secret Secure with a regional KMS to ensure data cannot be decrypted outside the approved region

---

## Q43 (Multi Answer - Select 2)
A Security Engineer is assessing the risks of a Snowflake Streamlit application used for HR analytics. The app allows managers to view their direct reports' compensation data. Which two access control mechanisms ensure managers can only see their own team's data?

- A) A row-access policy on the compensation table using CURRENT_USER() or a manager-subordinate mapping table to filter rows
- B) Dynamic data masking that reveals compensation values only to authorized manager roles
- C) Separate Snowflake accounts for each manager with individual data copies
- D) A Streamlit session variable that filters the displayed data without enforcing it at the database level

---

## Q44 (Scenario)
A Security Engineer discovers that a Native App installed in their consumer account has created EXTERNAL ACCESS INTEGRATIONS during its setup procedure. The security team was not informed of this. What is the risk, and what should the Security Engineer do?

- A) External access integrations created by the app allow it to make outbound network calls from the consumer environment; review the integration configuration to verify allowed hosts and ports match the app's stated functionality; if unexpected, contact the provider and consider uninstalling the app
- B) Native Apps are sandboxed; external access integrations created by apps cannot access consumer data
- C) The integrations are auto-approved by the Marketplace; no review is needed
- D) External access integrations created by Native Apps are read-only and cannot exfiltrate data

---

## Q45 (Scenario)
A Security Engineer wants to prevent any Cortex AI function call from processing data tagged with a "CONFIDENTIAL" classification tag without explicit approval. Which Snowflake capability enables this governance?

- A) Apply a tag-based masking policy that masks the column data for roles without "CONFIDENTIAL_ACCESS" tag-privilege; roles running CORTEX.COMPLETE without this privilege will process masked data instead of the sensitive value
- B) Use a row-access policy that filters out rows tagged CONFIDENTIAL from all Cortex AI function inputs
- C) Create an AI governance policy using CREATE AI POLICY that blocks CONFIDENTIAL-tagged columns from Cortex functions
- D) Configure Trust Center to alert when Cortex functions process CONFIDENTIAL-tagged data

---

## Q46 (Scenario)
A Security Engineer is reviewing a SPCS compute pool that was created with INSTANCE_FAMILY = CPU_X64_L. A developer has been using this pool to run large batch inference jobs during business hours, causing resource contention. Beyond performance concerns, what security concern does over-provisioned compute represent?

- A) Large compute pools increase the attack surface for privilege escalation via compute pool roles
- B) Over-provisioned compute pools that are idle but active can be used by compromised users to run unauthorized workloads without raising cost anomaly alerts, since the credits are within the normal allocation
- C) INSTANCE_FAMILY = CPU_X64_L is reserved for ACCOUNTADMIN only; non-admin use represents a configuration violation
- D) Large compute pools increase the likelihood of cross-tenant data leakage in Snowflake's shared infrastructure

---

## Q47 (Scenario)
A Security Engineer is implementing a data governance policy for Snowflake Cortex AI usage. The policy requires that all AI-generated content be watermarked or tracked to enable audit of AI-generated outputs. Which Snowflake capability supports this requirement?

- A) Store all CORTEX.COMPLETE inputs and outputs in a dedicated audit table via a Snowpark wrapper procedure that logs all AI invocations with user, timestamp, input hash, and output before returning results to the caller
- B) Enable CORTEX_AUDIT = TRUE at the account level to automatically log all AI outputs
- C) Apply a masking policy to AI output columns to tag them as AI-generated
- D) Use Trust Center's AI Observability dashboard to access built-in AI output tracking

---

## Q48 (Scenario)
A Security Engineer is securing a Native App that uses Cortex Search. The app indexes consumer data and allows consumers to search it. The consumer wants to ensure that the search index only contains data from approved schemas. Which mechanism controls which data the Cortex Search service indexes?

- A) The source query defining the Cortex Search service determines what data is indexed; consumers should review and restrict the source query to approved schemas before creating the service, and ensure the service is owned by a role with SELECT only on approved schemas
- B) Apply a row-access policy on all tables to filter out unauthorized data before indexing
- C) Configure the Cortex Search service with an ALLOWED_SCHEMAS parameter
- D) The app provider controls all indexing decisions; consumers cannot restrict the scope

---

## Q49 (Scenario)
A Security Engineer needs to review whether any Snowpark UDFS in the account use EXTERNAL ACCESS INTEGRATIONS that were not approved by the security team. Which view and query helps identify this?

- A) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.FUNCTIONS WHERE EXTERNAL_ACCESS_INTEGRATIONS IS NOT NULL
- B) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE query_text ILIKE '%CREATE FUNCTION%EXTERNAL_ACCESS%'
- C) SHOW FUNCTIONS IN ACCOUNT and inspect the function DDL for EXTERNAL_ACCESS_INTEGRATIONS references
- D) SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.POLICY_REFERENCES WHERE policy_kind = 'EXTERNAL_ACCESS_INTEGRATION'

---

## Q50 (Multi Answer - Select 2)
A Security Engineer is designing the security architecture for a production Cortex Agent used for customer-facing support automation. The agent uses a SQL tool to query a customer database. Which two architectural security decisions reduce the risk of data leakage to end customers?

- A) Ensure the SQL tool's Snowflake role can only SELECT from views that filter data to the authenticated customer's context (using row-access policies or WHERE clauses with customer_id)
- B) Restrict the agent's SQL tool to a read-only role with no DDL or DML capabilities
- C) Enable Tri-Secret Secure on the customer database to prevent the agent from accessing raw data
- D) Deploy the agent in a separate SPCS compute pool with no connection to the customer database

---

## Q51 (Scenario)
A Security Engineer discovers a SPCS service running a web application that exposes an unauthenticated API endpoint. Any request to the endpoint IP executes a stored procedure that reads from a sensitive table. What is the remediation?

- A) Remove the public endpoint (set INGRESS_ENABLED = FALSE or restrict the endpoint to require Snowflake JWT authentication); implement GRANT SERVICE ROLE to restrict invocation to authorized roles
- B) Apply a masking policy to the table read by the stored procedure
- C) Enable Tri-Secret Secure on the service's compute pool to authenticate all requests
- D) Move the SPCS service to a private compute pool with no external IP

---

## Q52 (Scenario)
A Security Engineer is auditing Snowflake Native Apps installed in the consumer account and finds that one app has been granted MANAGE GRANTS privilege. What is the security implication of this privilege grant to a Native App?

- A) MANAGE GRANTS allows the app to grant or revoke privileges on behalf of the consumer, effectively giving the app provider the ability to expand their access or create new users; this privilege should almost never be granted to a Native App and should be revoked
- B) MANAGE GRANTS is a standard privilege for all Native Apps and has no special security implication
- C) MANAGE GRANTS only allows the app to manage grants within its own APPLICATION database, not in the broader consumer account
- D) MANAGE GRANTS is required for the app to use Cortex AI functions; it is a technical requirement

---

## Q53 (Scenario)
A Security Engineer is implementing AI governance for a financial institution using Snowflake Cortex. The institution requires that any AI model used for credit decisioning be explainable and auditable. Which Snowflake capability best supports model explainability requirements in the ML Registry?

- A) Log model explanations and feature importances as metrics during model registration using Registry.log_model(metrics=...); store SHAP values or other explainability outputs in dedicated tables linked to each model version
- B) Use CORTEX.COMPLETE to generate natural-language explanations of credit decisions automatically
- C) Apply dynamic data masking to model input features to comply with model explainability requirements
- D) Enable Snowflake Trail on all model inference procedures to capture full execution traces

---

## Q54 (Scenario)
A Security Engineer is responding to an incident where a SPCS service's container was found to be running cryptocurrency mining software. The service was submitted by a legitimate internal team. What does this indicate about the threat vector?

- A) The container image in the Snowflake image registry was compromised, either via a supply chain attack on the base image or unauthorized modification of the image post-push; revoke the compromised service, audit the image registry for other compromised images, and implement image signing and vulnerability scanning in the CI/CD pipeline
- B) SPCS containers are fully sandboxed; cryptocurrency mining is impossible in SPCS
- C) The Snowflake infrastructure was compromised; file an incident with Snowflake Support
- D) The compute pool was misconfigured with excess CPU; reduce the INSTANCE_FAMILY to prevent resource abuse

---

## Q55 (Scenario)
A Security Engineer is reviewing the security model for a Snowflake Notebook used by data scientists for exploratory analysis on production PII data. The notebook runs in a Snowflake-managed container environment. What is the key security consideration?

- A) Notebooks run in the user's current session context and inherit all privileges of the user's current role; the role should be limited to a read-only role with masking policies applied to PII columns for notebook-based analysis
- B) Notebooks are isolated from Snowflake data and can only access data via explicit notebook data imports
- C) Notebooks cannot access ACCOUNT_USAGE views, so no audit trail is available for notebook-based data access
- D) Notebook containers run as ACCOUNTADMIN by default to enable full exploratory analysis

---

## Q56 (Multi Answer - Select 2)
A Security Engineer is implementing security controls for SPCS image management. To prevent supply chain attacks via container images, which two controls should be implemented?

- A) Enforce image vulnerability scanning (using a tool like Trivy or Grype) in the CI/CD pipeline before pushing images to the Snowflake image registry
- B) Implement image signing and verify image signatures before deploying services from the Snowflake image registry
- C) Apply a row-access policy to the SNOWFLAKE.ACCOUNT_USAGE.SPCS_IMAGE_REPOSITORY view to prevent unauthorized image enumeration
- D) Restrict the Snowflake image registry to ACCOUNTADMIN-only access

---

## Q57 (Scenario)
A Security Engineer is asked to review whether a Snowflake Cortex AI function invocation constitutes a "data sharing" event under GDPR. What is the key privacy consideration the Security Engineer should address?

- A) When Cortex AI functions process personal data, the personal data is sent to Snowflake-managed infrastructure for processing; organizations must ensure this processing is covered by appropriate data processing agreements (DPAs) with Snowflake and that the Cortex processing occurs in a region consistent with GDPR data residency requirements
- B) Cortex AI functions are local computations; no data leaves the Snowflake account under GDPR
- C) GDPR does not apply to AI function processing if the data is anonymized before the query runs
- D) Cortex AI functions share data with third-party LLM providers; consent must be obtained from all data subjects before using Cortex

---

## Q58 (Scenario)
A Security Engineer is implementing the principle of separation of duties for a Snowflake Native App development team. The team includes developers who build app logic, security reviewers who approve privilege requests, and ops engineers who deploy new versions. How should Snowflake roles be structured?

- A) Developers: USAGE on development databases; Security reviewers: role to review and approve privilege grants in app manifest; Ops engineers: role to add versions and update release directives; no individual has all three capabilities
- B) All team members get ACCOUNTADMIN to enable full Native App lifecycle management
- C) Developers own the APPLICATION PACKAGE; security and ops share a single admin role
- D) Use SYSADMIN for all Native App operations with audit logging via QUERY_HISTORY

---

## Q59 (Scenario)
A Security Engineer is reviewing the execution context of a Snowflake Streamlit app that is accessible to all employees. The app's Snowflake role was inadvertently granted SYSADMIN. What is the risk and immediate remediation?

- A) Every employee who opens the app effectively executes queries as SYSADMIN, potentially accessing all data in the account; immediately revoke SYSADMIN from the Streamlit app's role and replace with a least-privilege role; audit recent query history from the app's role
- B) Streamlit apps run in the user's own role context, not the assigned role; SYSADMIN grant has no effect
- C) Revoke all users' access to the Streamlit app until the role is corrected
- D) Apply a row-access policy to restrict the app to viewing only HR-approved tables despite the SYSADMIN role

---

## Q60 (Scenario)
A Security Engineer is designing a comprehensive security framework for Snowflake's AI and application features. An auditor asks: "What is your defense-in-depth strategy if a Cortex AI function is invoked with sensitive data that should not have been passed to it?" Which layered control set BEST addresses this concern?

- A) Layer 1: Tag-based masking on sensitive columns to prevent unauthorized roles from passing sensitive values to any function; Layer 2: QUERY_HISTORY audit with alerts for Cortex function calls on tagged tables; Layer 3: AI usage policy documentation and periodic access reviews for CORTEX_USER role membership
- B) Layer 1: Disable Cortex AI functions entirely; Layer 2: Require manual review for each AI query
- C) Layer 1: Tri-Secret Secure to prevent AI functions from accessing encrypted data; Layer 2: VPS deployment for AI workloads
- D) Layer 1: Network policies blocking Cortex AI endpoints; Layer 2: Row-access policies on all tables; Layer 3: Separate Snowflake account for all AI workloads
