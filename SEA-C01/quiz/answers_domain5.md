# Domain 5: Answers

---

## Q1
**Answer: B**
**Explanation:** CREATE COMPUTE POOL is a significant privilege request because SPCS compute pools run containerized code with network egress capabilities within the consumer's Snowflake environment. Before approval, verify: (1) the app has a legitimate stated reason for compute; (2) the app's service spec doesn't include overly permissive network egress rules; (3) the compute pool's EXTERNAL ACCESS INTEGRATION is appropriately scoped. Containers are not fully isolated from Snowflake data — they can access data through the app's Snowflake role.
**Source:** [SPCS Security Considerations](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)
**Quote:** "Review SPCS compute pool requests carefully — containers can execute arbitrary code with configured network access and may access Snowflake data through assigned roles."

---

## Q2
**Answer: B**
**Explanation:** The correct approach for SPCS services needing external network access is to create an EXTERNAL ACCESS INTEGRATION specifying allowed network rules (HOST_PORT rules for the model repository domain), assign secrets if needed for authentication, and assign the integration to the SPCS service. This declarative control restricts what external hosts the container can connect to. Granting ACCOUNTADMIN (A) is overly broad. ALL_OUTBOUND = TRUE (C) bypasses all controls. Hardcoding URLs in Dockerfiles (D) provides no Snowflake-level governance.
**Source:** [SPCS External Network Access](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/additional-considerations-services-jobs)
**Quote:** "Use EXTERNAL ACCESS INTEGRATION with specific network rules to grant SPCS services controlled, allowlisted access to external network resources."

---

## Q3
**Answer: A, D**
**Explanation:** Two mechanisms control access to SPCS service endpoints: (A) GRANT SERVICE ROLE <service_name>!<role_name> TO ROLE <consumer_role> grants specific Snowflake roles the ability to invoke the service endpoint — without this grant, the consumer role cannot call the endpoint; and (D) setting INGRESS_ENABLED = TRUE on an endpoint enables external access, and the ENDPOINT object can have grants controlling which service roles can invoke it. Together, these provide authentication and authorization for service endpoint access.
**Source:** [SPCS Endpoint Access Control](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/working-with-services)
**Quote:** "Control SPCS endpoint access using SERVICE ROLE grants (for Snowflake role authorization) and INGRESS_ENABLED settings (for external accessibility)."

---

## Q4
**Answer: B**
**Explanation:** A Snowpark UDF using the requests library to call an external endpoint is a significant security concern: data passed to the UDF (table column values) could be sent to the external endpoint without explicit governance controls. The correct remediation is to review the UDF definition, remove unauthorized external calls, and if external access is legitimate, require use of an explicit EXTERNAL ACCESS INTEGRATION with an approved allowlist. Snowpark UDFs CAN make external network calls when configured with EXTERNAL ACCESS INTEGRATIONS.
**Source:** [Snowpark UDF External Access](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-general)
**Quote:** "Snowpark UDFs can make external network calls via EXTERNAL ACCESS INTEGRATIONS. Unauthorized external calls in UDFs can exfiltrate data to attacker-controlled endpoints."

---

## Q5
**Answer: A**
**Explanation:** Dynamic data masking on PHI columns ensures that roles without appropriate unmask privileges receive masked/null values from the column — these masked values would be passed to CORTEX.COMPLETE instead of the actual PHI. The masking policy evaluates at query time based on the role, so roles with clinical access see real values while analytics roles (using CORTEX.COMPLETE for summarization) see masked values. TRY_COMPLETE (C) does not strip PII automatically. Tri-Secret Secure (D) controls encryption, not query-time data presentation.
**Source:** [Masking Policies with Cortex AI](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)
**Quote:** "Apply dynamic data masking to columns containing PHI before AI function access — roles without unmask privileges pass masked values to CORTEX.COMPLETE instead of real PHI."

---

## Q6
**Answer: B**
**Explanation:** ACCOUNT_USAGE.QUERY_HISTORY contains a record of every query executed, including those calling SNOWFLAKE.CORTEX functions. Filtering on query_text ILIKE '%SNOWFLAKE.CORTEX%' captures all invocations of CORTEX.COMPLETE, CLASSIFY_TEXT, EMBED_TEXT, and other Cortex AI functions, along with the USER_NAME, ROLE_NAME, START_TIME, and query details. This provides the audit trail for Cortex AI usage. There is no dedicated CORTEX_USAGE_HISTORY or ACCESS_HISTORY filter for Cortex functions.
**Source:** [Cortex AI Audit via QUERY_HISTORY](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
**Quote:** "CORTEX AI function invocations appear in QUERY_HISTORY and can be audited by filtering query_text for SNOWFLAKE.CORTEX function calls."

---

## Q7
**Answer: A**
**Explanation:** REFERENCE is the Native App Framework mechanism that allows an app to define named references (e.g., "my_customer_table") that consumers fulfill by pointing them to specific objects in their account. The consumer explicitly assigns a reference to a specific table — the app cannot access tables outside what the consumer explicitly points its references to. This provides consumer-controlled, scoped access: the consumer decides which specific table the app can read, not the provider.
**Source:** [Native App References](https://docs.snowflake.com/en/developer-guide/native-apps/nativeapp-consumer-creating)
**Quote:** "REFERENCE allows Native Apps to request access to specific consumer objects. Consumers control which objects they assign to each reference."

---

## Q8
**Answer: A, C**
**Explanation:** EXECUTE AS OWNER stored procedure security implications in Native Apps: (A) these procedures run with the APPLICATION object's owner role privileges — potentially allowing access to consumer data beyond what was explicitly granted; and (C) consumers should audit what privileges the application's owner role holds before approving EXECUTE AS OWNER procedures — if the owner role has broad access, all EXECUTE AS OWNER procedures inherit that access. Consumers should prefer EXECUTE AS CALLER unless the elevated privilege is specifically justified.
**Source:** [Native App Stored Procedure Security](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)
**Quote:** "EXECUTE AS OWNER stored procedures in Native Apps run with the application's owner role privileges. Consumers should review owner role grants before approving."

---

## Q9
**Answer: A**
**Explanation:** For a Snowflake Streamlit app allowing ad-hoc SQL: (1) restrict the app's Snowflake role to minimum required permissions (SELECT on only needed tables) — limits blast radius of SQL injection; (2) use parameterized queries to prevent SQL injection (the most critical control for ad-hoc SQL apps); (3) consider row-access policies on sensitive tables — even if injection succeeds and produces unexpected queries, row-access policies enforce data filtering. Tri-Secret Secure and VPS (C) are infrastructure controls unrelated to SQL injection defense.
**Source:** [Streamlit Application Security](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)
**Quote:** "Secure Streamlit apps with parameterized queries (injection prevention), least-privilege roles (blast radius control), and row-access policies (defense-in-depth)."

---

## Q10
**Answer: B**
**Explanation:** Snowflake SECRET objects provide secure, encrypted storage for credentials including API keys. The correct approach: CREATE SECRET of type GENERIC_STRING with the API key value; grant USAGE on the secret to the appropriate role; reference the secret in the EXTERNAL ACCESS INTEGRATION used by the UDF. The UDF code accesses the secret via the integration without the value appearing in query history, function definitions, or SHOW output. Hardcoding (A) or passing as parameters (D) exposes the key in logs.
**Source:** [Secrets for UDF Credentials](https://docs.snowflake.com/en/sql-reference/sql/create-secret)
**Quote:** "Use Snowflake SECRET objects to securely store API credentials referenced by UDFs through EXTERNAL ACCESS INTEGRATIONS — values never appear in query history or function definitions."

---

## Q11
**Answer: B**
**Explanation:** A SECRET object with USAGE granted at the schema level is accessible to all roles with USAGE on that schema. While the secret VALUE is encrypted and not directly readable, any role with USAGE can reference the secret in an external access integration — effectively using the stored credential to access external systems. Moving the secret to a private schema with restricted USAGE limits who can leverage the credential, preventing unauthorized use of the stored password in external connections.
**Source:** [Secret Object Security](https://docs.snowflake.com/en/sql-reference/sql/create-secret)
**Quote:** "Roles with USAGE on a SECRET can reference it in external access integrations, using the stored credential. Restrict USAGE to authorized service roles only."

---

## Q12
**Answer: A**
**Explanation:** Defense-in-depth against prompt injection for Cortex Agents: (1) strict system prompts defining expected behavior and explicitly instructing the agent to ignore instructions in retrieved content ("ignore all previous instructions" attacks); (2) row-access policies on data indexed by Cortex Search — limit what data the agent can retrieve, reducing exposure to malicious content; (3) monitoring agent tool call logs in QUERY_HISTORY for unusual patterns. This multi-layer approach reduces both the likelihood and impact of prompt injection.
**Source:** [Cortex Agent Security](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents)
**Quote:** "Protect Cortex Agents from prompt injection with strict system prompts, row-access policies on search data, and monitoring of tool invocations."

---

## Q13
**Answer: A, B**
**Explanation:** For securing a public SPCS service endpoint: (A) GRANT SERVICE ROLE to restrict which Snowflake roles can invoke the endpoint — without this grant, unauthenticated requests are rejected; and (B) implement JWT-based or token-based authentication for the endpoint so that all requests must present valid Snowflake credentials — unauthenticated HTTP requests to the endpoint are rejected. Both controls together prevent unauthorized access to the public endpoint.
**Source:** [SPCS Public Endpoint Security](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/working-with-services)
**Quote:** "SPCS public endpoints require both SERVICE ROLE grants (role-based authorization) and Snowflake token-based authentication to prevent unauthorized access."

---

## Q14
**Answer: A**
**Explanation:** Snowflake Cortex AI functions (COMPLETE, CLASSIFY_TEXT, etc.) process data on Snowflake-managed compute infrastructure within the Snowflake service. Depending on the model availability and the account region, processing may occur on Snowflake-managed compute that could be in a different region. Organizations must understand this architecture and ensure it is covered by their data processing agreements with Snowflake and consistent with data residency requirements (GDPR, sovereignty laws). Data does not go to third-party LLM providers.
**Source:** [Cortex AI Data Processing](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Cortex AI functions process data within Snowflake's infrastructure. Processing may occur on Snowflake-managed compute; verify regional placement for data residency compliance."

---

## Q15
**Answer: A**
**Explanation:** The CORTEX_USER role is a Snowflake system role that must be granted to users for them to invoke Cortex AI functions. Users without CORTEX_USER receive an error when attempting to call CORTEX.COMPLETE, CLASSIFY_TEXT, or other Cortex functions. Granting CORTEX_USER only to authorized data science and analytics roles controls who can leverage the AI capabilities, enabling governance over AI function usage within the account.
**Source:** [CORTEX_USER Role](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "CORTEX_USER is required to invoke Snowflake Cortex AI functions. Grant this role only to users authorized to use AI capabilities."

---

## Q16
**Answer: A**
**Explanation:** BIND SERVICE ENDPOINT is a Native App privilege that allows the app to create SPCS services with externally accessible (public) endpoints in the consumer's account. This is a significant privilege: public SPCS endpoints expose services to the internet from within the consumer's Snowflake environment. Consumers should carefully evaluate whether the app needs public endpoints, review what service spec the app will deploy, and ensure endpoint authentication is properly configured before granting this privilege.
**Source:** [Native App Privileges](https://docs.snowflake.com/en/developer-guide/native-apps/nativeapp-consumer-creating)
**Quote:** "BIND SERVICE ENDPOINT allows Native Apps to create publicly accessible SPCS service endpoints in the consumer account — a high-risk privilege requiring careful review."

---

## Q17
**Answer: A**
**Explanation:** To prevent ML training containers from accessing production customer data: (1) create a dedicated compute pool for ML training with EXTERNAL ACCESS INTEGRATIONS that do not include connections to production data sources; (2) ensure the training container's Snowflake role (used for data loading) has SELECT only on designated training dataset schemas/tables; (3) network rules on the compute pool block any direct connections to production systems. This is achieved through Snowflake RBAC (separate roles), not separate accounts.
**Source:** [SPCS Data Access Control](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)
**Quote:** "Control SPCS data access through Snowflake RBAC — assign compute pools roles with only the minimum required access to training datasets."

---

## Q18
**Answer: A, B**
**Explanation:** For a Streamlit app authenticating to an external CRM via OAuth: (A) an EXTERNAL ACCESS INTEGRATION specifying the CRM's OAuth token endpoint (and any other CRM API endpoints) as allowed hosts is required for the Streamlit app to make outbound HTTPS calls to the CRM; and (B) a SECRET object of type OAUTH2 stores the client ID and client secret for the CRM OAuth flow, enabling secure credential storage without hardcoding them in the app. These two objects together secure the OAuth integration.
**Source:** [External Access with OAuth Secrets](https://docs.snowflake.com/en/developer-guide/external-network-access/creating-using-external-network-access)
**Quote:** "EXTERNAL ACCESS INTEGRATION (for allowed hosts) and SECRET TYPE = OAUTH2 (for credentials) together secure Streamlit app external OAuth connections."

---

## Q19
**Answer: A**
**Explanation:** The appropriate response to UDFs making unauthorized outbound connections: (1) drop the offending UDFs immediately (security incident); (2) revoke CREATE FUNCTION from developer roles that should not create network-capable UDFs; (3) investigate QUERY_HISTORY for invocations of those UDFs to assess scope (what data was sent, when, and by whom); (4) add the server to a denied network rule list if applicable. Simply adding to the allowlist (C) would legitimize an unauthorized connection. Disable globally (D) is too disruptive.
**Source:** [UDF External Access Incident Response](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-general)
**Quote:** "Unauthorized UDF external access requires immediate remediation: drop offending UDFs, revoke CREATE FUNCTION, and investigate scope via QUERY_HISTORY."

---

## Q20
**Answer: A**
**Explanation:** In the Native App Framework, all REFERENCE grants are made explicitly by the consumer account's ACCOUNTADMIN or authorized roles — providers cannot self-grant access to consumer schemas. The consumer approves each reference by assigning it to a specific consumer object. To revoke, the consumer uses REVOKE REFERENCE syntax to remove the reference binding. This consumer-controlled model ensures the provider can never access consumer objects without explicit consumer approval.
**Source:** [Native App Reference Security Model](https://docs.snowflake.com/en/developer-guide/native-apps/nativeapp-consumer-creating)
**Quote:** "REFERENCE grants in Native Apps are always made by the consumer. Providers cannot access consumer objects without explicit consumer-approved reference bindings."

---

## Q21
**Answer: A**
**Explanation:** The correct least-privilege design for ML workloads: create dedicated roles per ML workload, each with GRANT SELECT only on the specific training dataset schemas that workload needs. Service accounts for ML jobs use only these workload-specific roles. This ensures that a compromise of one ML workload's service account cannot access data intended for other workloads. Aggregation policies and Tri-Secret Secure (B, C) don't address the cross-schema access problem — RBAC is the right tool.
**Source:** [ML Workload Access Control](https://docs.snowflake.com/en/user-guide/security-access-control-considerations)
**Quote:** "Create dedicated, least-privilege roles per ML workload with SELECT grants only on designated training datasets to prevent cross-workload data access."

---

## Q22
**Answer: A**
**Explanation:** CREATE INTEGRATION is an account-level privilege. Granting it broadly to SYSADMIN-equivalent roles allows creating storage integrations (to arbitrary S3/Azure/GCS), external access integrations (to arbitrary external APIs), and OAuth/SCIM/SAML integrations. Any of these can create unauthorized data exfiltration channels or authentication bypasses. This privilege should be restricted to ACCOUNTADMIN or a dedicated network security role (e.g., NETWORK_ADMIN) with documented approval processes. Revoking from SYSADMIN is the correct action.
**Source:** [CREATE INTEGRATION Privilege Control](https://docs.snowflake.com/en/sql-reference/sql/create-integration)
**Quote:** "CREATE INTEGRATION should be restricted to ACCOUNTADMIN or dedicated network security roles — granting it broadly enables unauthorized creation of external access channels."

---

## Q23
**Answer: A**
**Explanation:** A SECRET in PUBLIC schema is accessible to any Snowflake user with USAGE on PUBLIC (which is every user). While the secret VALUE is encrypted and not directly readable, any user can reference the secret in an external access integration or UDF — effectively using the ticketing system credentials. The remediation is to move the secret to a private security schema accessible only to the agent's service role. This follows the principle of least privilege for credential access.
**Source:** [Secret Object Scope Control](https://docs.snowflake.com/en/sql-reference/sql/create-secret)
**Quote:** "Secrets in PUBLIC schema are accessible to all users. Move sensitive credentials to private schemas with restricted USAGE grants."

---

## Q24
**Answer: A, B**
**Explanation:** Privacy controls for Cortex AI with PII data: (A) dynamic data masking on PII columns ensures that roles without unmask privileges pass only masked values to Cortex AI functions — preventing real PII from being processed; and (B) obtaining appropriate DPAs with Snowflake documenting how Cortex AI processes personal data, the data retention policies, and sub-processor information — required under GDPR and other privacy frameworks when processing personal data with AI services.
**Source:** [Cortex AI Privacy](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Protect PII in Cortex AI workloads with data masking (technical control) and data processing agreements with Snowflake (legal/compliance control)."

---

## Q25
**Answer: A**
**Explanation:** When a Native App's setup procedure creates a database via CREATE DATABASE, that database is owned by the APPLICATION object (not the consumer's ACCOUNTADMIN). The provider's stored procedures can read and write to all objects within that database through the application owner role. Consumers should audit: what data the app is expected to store, whether the app needs the full database or a smaller schema, and what the app's stored procedures do with the database contents.
**Source:** [Native App Created Objects](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)
**Quote:** "Databases created by Native Apps are owned by the APPLICATION object. The provider's code can read and write all objects in the app-owned database."

---

## Q26
**Answer: B**
**Explanation:** SNOWFLAKE.ACCOUNT_USAGE.SPCS_INGRESS_ACCESS_HISTORY (or similar SPCS-specific views) provides logs of SPCS service endpoint invocations, including the timestamp, the service endpoint called, the invoking principal, and the response status. This enables monitoring for unauthorized access to SPCS service endpoints. QUERY_HISTORY captures SQL queries but not HTTP-level service endpoint invocations. The exact view name may vary by Snowflake version but follows the ACCOUNT_USAGE pattern.
**Source:** [SPCS Access Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)
**Quote:** "SPCS service endpoint access is recorded in dedicated ACCOUNT_USAGE views, enabling monitoring for unauthorized endpoint invocations."

---

## Q27
**Answer: A**
**Explanation:** GRANT EXECUTE ON PROCEDURE fraud_pipeline_role to the fraud detection procedure, with explicit revocation from PUBLIC and all other roles, ensures that only the authorized fraud pipeline role can call the scoring procedure. This implements the principle of least privilege: no other role or user can invoke the procedure. EXECUTE AS CALLER (C) would run the procedure with the caller's potentially restricted permissions, which may break the procedure if it needs elevated access for model loading.
**Source:** [Stored Procedure Access Control](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-procedures)
**Quote:** "GRANT EXECUTE ON PROCEDURE to only the authorized roles, revoking PUBLIC access, to ensure the fraud detection procedure can only be called by the authorized pipeline."

---

## Q28
**Answer: B**
**Explanation:** A wildcard in EXTERNAL ACCESS INTEGRATION network rules effectively grants the container unlimited outbound network access — it can connect to any external host on any port. This is the highest-risk configuration for SPCS as it enables exfiltration of any data accessible to the container to any external destination. Replace the wildcard with explicit ALLOW rules for each specific required host and port. This follows the principle of explicit allowlisting over implicit unrestricted access.
**Source:** [SPCS External Access Security](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/additional-considerations-services-jobs)
**Quote:** "Replace wildcard network rules with explicit allowlists of required hosts and ports. Wildcard rules enable unrestricted data exfiltration from SPCS containers."

---

## Q29
**Answer: A**
**Explanation:** Cortex Search services retrieve results based on the source data indexed from a Snowflake table. When a row-access policy is applied to the source table, queries against that table (including Cortex Search's indexing and retrieval) are subject to the row-access policy of the querying role. Users with restricted row-access will receive search results only from rows they are authorized to see, enforcing access control at the search result level. Separate Cortex Search services per classification (B) works but is less scalable.
**Source:** [Cortex Search Access Control](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview)
**Quote:** "Row-access policies on Cortex Search source tables restrict search results to rows the querying role is authorized to access."

---

## Q30
**Answer: A, B**
**Explanation:** For a Cortex Agent with SQL tool capabilities: (A) applying least-privilege to the agent's Snowflake role — granting SELECT only on tables the SQL tool should query — ensures that even if the agent executes unexpected SQL, it cannot access unauthorized tables; and (B) prompt hardening in the system prompt (instructing the agent to only execute read queries, to never run DDL/DML/GRANT) adds an application-layer guard against the agent being manipulated into executing harmful SQL. Both controls together provide defense-in-depth.
**Source:** [Cortex Agent Security](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents)
**Quote:** "Secure Cortex Agent SQL tools with least-privilege roles (data layer) and system prompt hardening (application layer) to prevent unauthorized data access."

---

## Q31
**Answer: A**
**Explanation:** The Native App Framework is designed with a consumer-controlled permission model: every database, schema, table, and object that the app accesses requires an explicit consumer grant (via REFERENCE or direct GRANT). The app cannot access any consumer objects outside of what has been explicitly granted. This is enforced by the Native App Framework's permission model, not just policy. Providers cannot grant themselves access to consumer data; consumers must explicitly authorize each access.
**Source:** [Native App Permission Model](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)
**Quote:** "The Native App Framework enforces consumer-controlled access: apps can only access objects explicitly granted by the consumer."

---

## Q32
**Answer: A**
**Explanation:** The correct control for development/production SPCS isolation is Snowflake RBAC: assign separate Snowflake roles to production and development compute pools. The development compute pool's role has no GRANT access to production databases or schemas. Since SPCS services run under Snowflake roles, the development compute pool physically cannot access production data — not because of network isolation, but because the Snowflake access control model prevents it.
**Source:** [SPCS Environment Isolation](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)
**Quote:** "Isolate SPCS compute pools by assigning separate Snowflake roles — development compute pools should have no grants on production databases."

---

## Q33
**Answer: A**
**Explanation:** SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO() within a UDF is reconnaissance — attempting to enumerate infrastructure details about the Snowflake platform. While this specific function is benign, it indicates the developer is exploring system capabilities in ways that could escalate to more harmful enumeration. Audit the developer's activity in QUERY_HISTORY, review the UDF definition for other suspicious patterns, and implement a policy that restricts use of SYSTEM$ functions in UDFs not owned by security-approved roles.
**Source:** [UDF Security Monitoring](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-general)
**Quote:** "System function usage in UDFs (like SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO) may indicate reconnaissance. Audit the UDF definition and restrict SYSTEM$ function access in user-created UDFs."

---

## Q34
**Answer: A**
**Explanation:** For HIPAA compliance when using CORTEX.COMPLETE with PHI: use AI_REDACT or a custom masking UDF to identify and redact PHI fields (names, dates, contact info, identifiers) from the ticket text before passing to CORTEX.COMPLETE. The original PHI remains in the source table with appropriate access controls. The AI function processes de-identified text. Note: submitting a HIPAA BAA with Snowflake is required as well, but the data preparation step is the technical control needed to avoid passing PHI to the AI function.
**Source:** [HIPAA Safe AI Processing](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Redact PHI from text before processing with Cortex AI functions. Use AI_REDACT or masking UDFs to remove identifiers while preserving contextual meaning."

---

## Q35
**Answer: A**
**Explanation:** For SPCS containers to access an internal microservice on a private IP within the same cloud region, configure an EXTERNAL ACCESS INTEGRATION with a NETWORK RULE of type HOST_PORT pointing to the private IP:port. Even though the microservice is internal, SPCS external access integrations support private IP addresses in the same cloud network. This is the Snowflake-managed approach that provides governance visibility over outbound connections. VPC peering (B) requires cloud provider configuration outside Snowflake.
**Source:** [SPCS Internal Network Access](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/additional-considerations-services-jobs)
**Quote:** "Use EXTERNAL ACCESS INTEGRATION with HOST_PORT network rules for SPCS services to access internal microservices, including those on private IP addresses."

---

## Q36
**Answer: A, C**
**Explanation:** For monitoring Cortex Agent activity: (A) QUERY_HISTORY captures all SQL queries executed by the agent's SQL tool, with the agent's service account role and timestamps — this provides an auditable record of all data queried by the agent; and (C) ACCESS_HISTORY shows which specific objects (tables, views, columns) were accessed as a result of the agent's SQL tool invocations, providing column-level access detail. There is no dedicated CORTEX_AGENT_AUDIT_LOG or AGENT_TOOL_CALL_HISTORY view.
**Source:** [Cortex Agent Auditing](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents)
**Quote:** "Monitor Cortex Agent SQL tool activity via QUERY_HISTORY (query execution) and ACCESS_HISTORY (object-level access details)."

---

## Q37
**Answer: A**
**Explanation:** For a Native App to invoke CORTEX.COMPLETE, the APPLICATION object must be granted the CORTEX_USER role in the consumer account. The consumer's ACCOUNTADMIN grants this role to the application: GRANT ROLE CORTEX_USER TO APPLICATION <app_name>. Without this grant, the app's stored procedures cannot call Cortex AI functions. The consumer controls whether the app has AI capability — providers cannot enable Cortex AI for the consumer unilaterally.
**Source:** [Native App Cortex AI Access](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Grant CORTEX_USER TO APPLICATION <app_name> to enable a Native App to invoke Cortex AI functions in the consumer account."

---

## Q38
**Answer: A**
**Explanation:** CREATE MODEL allows users to register trained ML models into the Snowflake Model Registry. Registered models can be invoked via SQL for inference, which means arbitrary Python code within the model's predict() method can execute in Snowflake's compute. Without a code review process, a compromised or malicious model could execute code during inference that accesses or exfiltrates data. Restrict CREATE MODEL to approved ML engineer roles with a code review gate for all model registrations.
**Source:** [Model Registry Security](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-registry-overview)
**Quote:** "CREATE MODEL allows deployment of Python code via inference methods. Restrict to approved roles and implement code review processes for all model registrations."

---

## Q39
**Answer: A**
**Explanation:** Snowflake maintains a curated conda channel containing security-vetted Python packages for use in Snowpark UDFs, stored procedures, and notebooks. By restricting UDFs to use only packages from the Snowflake conda channel (not allowing arbitrary PyPI packages via IMPORTS from external stages), organizations ensure that all third-party code has been security-reviewed by Snowflake's team. This significantly reduces supply chain risk compared to allowing arbitrary PyPI package installation.
**Source:** [Snowflake Conda Channel](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-packages)
**Quote:** "Snowflake's conda channel contains security-vetted packages. Restrict UDFs to use only packages from this channel to reduce supply chain risk."

---

## Q40
**Answer: A**
**Explanation:** EXECUTE AS CALLER means the UDF runs with the calling user's role privileges. The UDF's internal SELECT statements against the underlying data are subject to any row-access policies, masking policies, and privilege restrictions of the caller's role. This implements security at the data layer: regardless of who calls the inference function, they can only run it against data their role is authorized to access. EXECUTE AS OWNER (the alternative) would bypass the caller's restrictions.
**Source:** [UDF Execute As Caller Security](https://docs.snowflake.com/en/developer-guide/udf/udf-creating-intro)
**Quote:** "EXECUTE AS CALLER ensures UDFs run with the caller's role privileges, applying all row-access and masking policies to data accessed within the function."

---

## Q41
**Answer: B**
**Explanation:** A public SPCS service endpoint without authentication allows any internet user who discovers the endpoint URL to invoke the service. This is a critical security concern because the service has access to Snowflake data through its assigned role. Before enabling a public endpoint, implement Snowflake JWT token-based authentication on the endpoint so that only authenticated Snowflake users can invoke it. Additionally, configure GRANT SERVICE ROLE to restrict which roles can authorize service invocations.
**Source:** [SPCS Endpoint Authentication](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/working-with-services)
**Quote:** "Public SPCS endpoints must have authentication enabled to prevent unauthorized invocation from the internet."

---

## Q42
**Answer: A**
**Explanation:** For ensuring ML training occurs in the approved cloud region: (1) deploy SPCS compute pools in the approved region's Snowflake account (Snowflake accounts are region-specific); (2) configure EXTERNAL ACCESS INTEGRATIONS to restrict model downloads/uploads to regional endpoints; (3) verify SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO() returns the expected region for the account. Snowflake accounts are inherently regional — compute in an account processes data in that account's region.
**Source:** [Snowflake Regional Architecture](https://docs.snowflake.com/en/user-guide/intro-cloud-platforms)
**Quote:** "Snowflake accounts are region-specific. SPCS compute pools deployed in an account process data within that account's region, ensuring regional data residency for ML workloads."

---

## Q43
**Answer: A, B**
**Explanation:** For HR compensation data in Streamlit accessible by managers: (A) a row-access policy using CURRENT_USER() matched against a manager-subordinate mapping table ensures managers can only see their direct reports' compensation rows — the policy filters at the database level before data reaches the Streamlit app; and (B) dynamic data masking revealing compensation values only to authorized manager roles (those with the unmasking privilege) ensures that compensation figures are visible only to those with a legitimate need.
**Source:** [HR Data Access Controls](https://docs.snowflake.com/en/user-guide/security-row-intro)
**Quote:** "Row-access policies and dynamic data masking together ensure managers see only their direct reports' compensation, providing both row-level and column-level data protection."

---

## Q44
**Answer: A**
**Explanation:** When a Native App's setup procedure creates EXTERNAL ACCESS INTEGRATIONS, the consumer should review those integrations for unexpected allowed hosts and ports. If the integrations allow connections to hosts not described in the app's documentation or Marketplace listing, this represents an undisclosed data exfiltration risk. Review the integration configuration using SHOW INTEGRATIONS or DESCRIBE INTEGRATION, compare against the app's stated functionality, and contact the provider for explanation. Uninstalling the app is appropriate if the explanation is unsatisfactory.
**Source:** [Native App External Access Review](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)
**Quote:** "Review EXTERNAL ACCESS INTEGRATIONS created by Native Apps for unauthorized outbound connections. Unexpected hosts indicate potential data exfiltration risk."

---

## Q45
**Answer: A**
**Explanation:** Tag-based masking provides the most elegant and scalable governance for AI workloads. By creating a masking policy that returns masked values for roles without a "CONFIDENTIAL_ACCESS" privilege (or equivalent tag-based condition), columns tagged with "CONFIDENTIAL" automatically mask their values for roles without the appropriate clearance. CORTEX.COMPLETE invocations by those roles receive masked column values. This ensures that confidential data cannot reach AI processing pipelines without explicit authorization.
**Source:** [Tag-Based Masking for AI Governance](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies)
**Quote:** "Tag-based masking on CONFIDENTIAL-tagged columns ensures AI functions receive only masked values for roles without explicit confidential access privileges."

---

## Q46
**Answer: B**
**Explanation:** Over-provisioned SPCS compute pools that are idle but remain active represent an operational security risk: a compromised user with OPERATE on the compute pool or with the service's role can start unauthorized workloads on that compute without triggering cost anomaly alerts (since the credits are within the normal allocation). Cost-based detection cannot identify unauthorized compute usage if the attacker stays within the normal credit range of the over-provisioned pool. Right-sizing compute pools reduces this attack surface.
**Source:** [SPCS Compute Pool Security](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/working-with-compute-pool)
**Quote:** "Over-provisioned SPCS compute pools may allow unauthorized workloads to run without triggering cost alerts. Right-size compute pools to reduce the window of undetected misuse."

---

## Q47
**Answer: A**
**Explanation:** For auditing AI-generated content: create a Snowpark wrapper procedure that: (1) logs all invocations to an audit table (with user, timestamp, input hash, model used, and output); (2) calls CORTEX.COMPLETE; (3) returns the result. All AI queries go through this wrapper, which creates an immutable audit record. This enables tracing any AI output back to its inputs and invocation context. There is no native CORTEX_AUDIT = TRUE parameter. Trust Center doesn't provide built-in AI output tracking.
**Source:** [AI Observability Architecture](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Implement AI output auditing via Snowpark wrapper procedures that log all CORTEX.COMPLETE inputs and outputs before returning results."

---

## Q48
**Answer: A**
**Explanation:** The Cortex Search service's source query determines what data is indexed — the service cannot index data outside the scope of its defining SELECT query. Consumers can restrict the source query to approved schemas, and by ensuring the service's owner role has SELECT only on approved schemas, the service cannot access or index data from unauthorized schemas. If a Native App creates the Cortex Search service, the consumer should review the service's source query and the owner role's access before creation.
**Source:** [Cortex Search Data Scope](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview)
**Quote:** "Cortex Search services index only data within their defining source query. Control the scope of indexed data by restricting the source query and the service owner role's access."

---

## Q49
**Answer: A**
**Explanation:** SNOWFLAKE.ACCOUNT_USAGE.FUNCTIONS (or a similar view) contains metadata about UDF/stored procedure definitions including EXTERNAL_ACCESS_INTEGRATIONS — the list of external access integrations referenced by each function. Filtering WHERE EXTERNAL_ACCESS_INTEGRATIONS IS NOT NULL identifies all functions with external network access capabilities. Cross-referencing against an approved integration list reveals any functions using unauthorized integrations.
**Source:** [Function Metadata for Security Review](https://docs.snowflake.com/en/sql-reference/account-usage)
**Quote:** "ACCOUNT_USAGE.FUNCTIONS includes EXTERNAL_ACCESS_INTEGRATIONS metadata — filter for non-NULL values to identify all UDFs with external network access capabilities."

---

## Q50
**Answer: A, B**
**Explanation:** For a customer-facing Cortex Agent with SQL tool access: (A) the SQL tool's Snowflake role must be strictly limited — GRANT SELECT only on views that filter data to the authenticated customer's context using row-access policies or embedded WHERE clauses; this ensures the agent cannot expose one customer's data to another; and (B) restrict the SQL tool to a read-only role with no DDL or DML capabilities — prevents the agent from making data modifications even if manipulated through prompt injection.
**Source:** [Cortex Agent Customer-Facing Security](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents)
**Quote:** "Customer-facing Cortex Agents must use roles with customer-scoped row-access and read-only permissions to prevent cross-customer data exposure."

---

## Q51
**Answer: A**
**Explanation:** An unauthenticated public SPCS service endpoint accessing sensitive data is a critical vulnerability. Immediate remediation: (1) disable the public endpoint (INGRESS_ENABLED = FALSE) or restrict it to require Snowflake JWT authentication; (2) implement GRANT SERVICE ROLE to restrict authorized invoking roles; (3) audit SPCS_INGRESS_ACCESS_HISTORY (or equivalent) to determine if unauthorized access occurred. Moving to a private compute pool (D) requires compute pool reconfiguration and doesn't immediately disable the public endpoint.
**Source:** [SPCS Endpoint Security](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/working-with-services)
**Quote:** "Disable public SPCS endpoints or require authentication immediately upon discovery of unauthenticated access. GRANT SERVICE ROLE restricts authorized invokers."

---

## Q52
**Answer: A**
**Explanation:** MANAGE GRANTS is one of the most powerful privileges in Snowflake — it allows granting or revoking any privilege that the holder possesses. Granting MANAGE GRANTS to a Native App gives the provider the ability to expand their own access, create new privileged users, or modify role assignments within the consumer account. This essentially gives the provider backdoor administrative capabilities in the consumer account. This privilege should never be granted to a Native App in standard deployments.
**Source:** [Native App Privilege Review](https://docs.snowflake.com/en/developer-guide/native-apps/nativeapp-consumer-creating)
**Quote:** "MANAGE GRANTS enables a Native App to grant/revoke privileges in the consumer account — effectively giving the provider backdoor admin capabilities. Never grant without specific justification."

---

## Q53
**Answer: A**
**Explanation:** For model explainability requirements in credit decisioning: use the Snowflake ML Registry's metrics parameter during log_model() to store SHAP values, feature importances, or other explainability outputs alongside the model version. Maintain a dedicated table linking model versions to their explainability outputs (SHAP values per prediction, feature importance rankings). This provides the audit trail needed for regulatory explainability requirements (ECOA, FCRA, GDPR Article 22).
**Source:** [Model Registry Explainability](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-registry-overview)
**Quote:** "Log model explanations and feature importances as metrics during model registration. Maintain dedicated explainability tables linked to model versions for regulatory auditing."

---

## Q54
**Answer: A**
**Explanation:** A legitimate internal team's container image containing cryptocurrency mining software indicates a supply chain attack at the image level: either the base image was compromised (Docker Hub image with malicious layer), or the image was modified after being built and pushed to the Snowflake image registry. Response: (1) revoke and terminate the compromised service; (2) audit the image registry for other potentially compromised images; (3) implement image signing and vulnerability scanning in CI/CD to prevent future compromises.
**Source:** [SPCS Container Supply Chain Security](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)
**Quote:** "Container images containing malicious code indicate supply chain attacks. Implement image signing and vulnerability scanning to prevent compromised images from being deployed."

---

## Q55
**Answer: A**
**Explanation:** Snowflake Notebooks run in the user's current session context, inheriting all privileges of the user's active role. If a data scientist opens a notebook with an overprivileged role, they can access all data that role can access — including PII. The mitigating control is to restrict the notebook user's session to a read-only role with masking policies applied to PII columns, ensuring that exploratory analysis can proceed without exposing raw PII. The read-only role should also be scoped to only the necessary schemas.
**Source:** [Notebook Security Model](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-snowflake-notebooks)
**Quote:** "Snowflake Notebooks inherit the user's session role privileges. Limit notebook roles to read-only with PII masking to protect sensitive data during exploratory analysis."

---

## Q56
**Answer: A, B**
**Explanation:** Container image supply chain security for SPCS requires two complementary controls: (A) vulnerability scanning (using tools like Trivy, Grype, or Snyk) in the CI/CD pipeline before pushing to the Snowflake image registry — identifies known CVEs and security misconfigurations before deployment; and (B) image signing and signature verification — ensures that the image deployed matches what was approved and scanned, detecting any post-build tampering. These controls work together to prevent compromised or unauthorized images from being deployed.
**Source:** [SPCS Image Security](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)
**Quote:** "Implement image vulnerability scanning (pre-push) and image signing (post-push verification) to protect against supply chain attacks on SPCS container images."

---

## Q57
**Answer: A**
**Explanation:** Under GDPR, when Cortex AI functions process personal data, this constitutes data processing by Snowflake as a processor. Organizations must ensure: (1) appropriate DPAs are in place with Snowflake covering Cortex AI processing; (2) the Cortex AI processing location is consistent with GDPR data residency requirements (data cannot be processed in non-EU regions without appropriate transfer mechanisms); (3) the AI processing is documented in the Record of Processing Activities. Cortex AI uses Snowflake's infrastructure, not third-party LLMs, but residency still matters.
**Source:** [GDPR and Cortex AI](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Cortex AI function processing of personal data requires appropriate DPAs with Snowflake and verification that processing location meets GDPR data residency requirements."

---

## Q58
**Answer: A**
**Explanation:** Separation of duties for Native App development: developers need USAGE on development databases but should not be able to approve security-sensitive requests; security reviewers need the ability to review and approve privilege grants in the app manifest (package privilege management) but not deploy; ops engineers need the ability to add versions and update release directives (controlling consumer upgrade rollout) but not make security decisions. No single individual should combine all three capabilities.
**Source:** [Native App Development Roles](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about)
**Quote:** "Separate Native App development roles: developers (code), security reviewers (privilege approval), and ops engineers (version management) to implement separation of duties."

---

## Q59
**Answer: A**
**Explanation:** A Streamlit app's Snowflake role is assigned at the app level — all users who access the app use queries executed under that role. If SYSADMIN is assigned, every employee who opens the Streamlit app effectively gets SYSADMIN-level query execution for the duration of their app session. The immediate risk: any employee could leverage the app's Snowflake access to query any data accessible to SYSADMIN. Immediate remediation: revoke SYSADMIN from the app's role and replace with a carefully scoped least-privilege role.
**Source:** [Streamlit App Role Security](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)
**Quote:** "All Streamlit app users execute queries with the app's assigned Snowflake role. An overprivileged app role grants all users that level of data access."

---

## Q60
**Answer: A**
**Explanation:** Defense-in-depth for AI governance: Layer 1 — tag-based masking on sensitive columns prevents unauthorized roles from passing sensitive values to any function (including AI) at the data layer; Layer 2 — QUERY_HISTORY audit with alerts for Cortex AI calls on tagged tables provides detection capability for when AI functions are invoked against sensitive data; Layer 3 — AI usage policy documentation and periodic CORTEX_USER role membership reviews ensure governance through process controls. These three layers work at the data, detection, and process levels respectively.
**Source:** [AI Governance Defense in Depth](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)
**Quote:** "Defense-in-depth for AI governance: masking (data layer) + alerting (detection layer) + access reviews (process layer)."
