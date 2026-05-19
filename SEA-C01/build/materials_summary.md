# SEA-C01 Materials Summary

## Exam Overview
Questions: 65  |  Duration: 115 min  |  Pass: 75% (0.75)

## Domain Topics

### Domain 1 — Access Control and Identity Management (22%)
Key topics from materials:

**1.1 Design and implement access control strategies**
- Configure and implement Role-Based Access Control (RBAC)
  - Automate RBAC management programmatically
  - Integrate RBAC management with IdPs using SCIM (user group membership)
  - Manage hierarchical RBAC models
- Define and manage custom roles and least-privilege role hierarchies
  - System-defined roles, SNOWFLAKE database roles, SNOWFLAKE application roles, user-defined custom roles (account, database, application)
  - Functional vs. access roles best practices
  - Manage privilege grants in Snowflake

**1.2 Configure and monitor user authentication and session management**
- Implement authenticators, passkeys, and IdP-driven access
- Define, configure, and enforce Multi-Factor Authentication (MFA): Snowflake-managed and externally-managed
- Implement Single Sign-On (SSO): SAML, OAuth; troubleshoot SSO integration issues
- Manage secure programmatic access:
  - Key-pair authentication and rotation
  - Programmatic Access Token (PAT) authentication
  - External API authentication and secrets
- Rotate user credentials
- Configure and monitor session policies
- Design and manage leaked password and malicious IP protections

**1.3 Implement network security controls**
- Create, implement, and manage network policies and network rules
  - IP allow lists and deny lists
  - Apply network policies to accounts and users
- Configure and troubleshoot private connectivity and storage integrations
  - AWS PrivateLink, Azure Private Link, GCP Private Service Connect
  - Troubleshoot private connectivity issues
- Support multi-cloud network policy enforcement

**1.4 Manage external access integrations**
- Create, implement, and manage external access integrations
  - Use network rules to manage allowed external endpoints
  - Leverage API authentication integrations
  - Third-party vendor risk assessment
- Leverage Snowflake secrets for secure authentication with external endpoints: OAuth, cloud provider tokens, passwords, generic strings
- Best practices for secure connectivity from Snowflake to external systems: egress proxy configurations, external functions

Explicitly in-scope: SCIM, SAML, OAuth, key-pair auth, PAT, MFA, session policies, network rules, PrivateLink, RBAC hierarchy, system-defined roles, database roles, application roles
Explicitly out-of-scope: General cloud security concepts outside Snowflake (assumed, not tested)

---

### Domain 2 — Data Protection, Data Privacy, and Data Governance (30%)
Key topics from materials:

**2.1 Implement data security features**
- Tri-Secret Secure: implement, configure, and manage the customer-managed key (CMK) component
- Column-level security: Dynamic Data Masking policies, masking policies with SQL expressions and Snowflake functions
- Masking policy lifecycle: monitor impact of policy changes on data visibility
- External Tokenization function
- Tag-based masking policies
- Projection policies
- Row-access policies: design with SQL expressions and Snowflake functions, policy precedence and interactions, lifecycle management, troubleshoot enforcement
- Aggregation policies, differential privacy policies, and budgets

**2.2 Manage and audit Secure Data Sharing and collaborations**
- Advanced privacy controls for shared data: synthetic data (GENERATE_SYNTHETIC_DATA)
- Configure and manage Snowflake Data Clean Rooms: secure multi-party computation, collaborative analysis without direct data exposure, security implications of secure objects (views, functions, procedures)
- Configure Data Listings

**2.3 Restrict data exfiltration**
- Account-level parameters to restrict destinations where Snowflake can write data programmatically
- Account-level and user-level parameters to restrict when users can download query result sets

**2.4 Establish and manage data retention and data lifecycle management**
- Time Travel and Fail-safe: manage settings at table/schema/account levels, differences and use cases, security and compliance context
- Configure and enforce data retention policies
- Retention strategies for structured and semi-structured data: GDPR and HIPAA alignment
- Object lifecycle management: automate archival and purging, transient/temporary tables, auto-drop configurations

**2.5 Configure object tagging and data classification frameworks**
- Automatic tag propagation and tag inheritance
- Audit tagging using TAG_REFERENCES and TAG_REFERENCES_HISTORY views
- Visualize data lineage
- Implement data classification: automatic, custom, and manual classifications
- Integrate data classification into data governance policies

**2.6 Configure and maintain data replication policies and procedures**
- Manage replication access control and privileges: least privilege for replication-specific roles, CREATE REPLICATION GROUP, REPLICATE
- Define and secure ownership of replication and failover group objects
- Configure replication groups to include critical security objects
- Replicate network policies to maintain consistent access controls
- Manage replication of security integrations (SAML2, OAuth, SCIM) post-failover
- Validate replication of users, roles, and grants

**2.7 Manage secure replication and failover operations**
- Audit pre-failover readiness: periodic audits, controlled failover tests
- Configure Client Redirect
- Execute replication and failover: monitor audit logs during transition, re-establish security configurations for external resources
- Post-failover validation audit: verify replicated network policies, security integrations, user roles and permissions, client redirection

Explicitly in-scope: Tri-Secret Secure, Dynamic Data Masking, tag-based masking, projection policies, row-access policies, aggregation policies, differential privacy, Data Clean Rooms, GENERATE_SYNTHETIC_DATA, Time Travel, Fail-safe, data classification, SCIM replication, failover, TAG_REFERENCES views

---

### Domain 3 — Auditing, Monitoring, and Compliance (18%)
Key topics from materials:

**3.1 Monitor data security**
- Analyze QUERY_HISTORY and ACCESS_HISTORY views for suspicious patterns and unauthorized data access
- Monitor ACCOUNT_USAGE views: alert thresholds, correlating events, incident responses
  - Snowflake Trail observability features
  - Map evidence to security frameworks (GDPR, HIPAA, etc.)
  - Manage interfaces for auditors
- Integrate external monitoring and observability tools with Snowflake
- Trace data access within AI/ML workloads running on Snowpark Container Services
- Track changes of the use of secure objects (views, functions, procedures)
- Monitor login history for authentication anomalies: brute-force attacks, unauthorized access (manually, Trust Center, external tools)
- Set up automated alerts and notifications: configure email or external integrations using tasks and streams

**3.2 Implement a strategic security architecture to balance data protection and credit efficiency**
- Compare and contrast enabling/disabling Snowflake security services: security implications, credit consumption, operational overhead, cloud provider implications
- Monitor anomalous credit consumption as a critical security signal: serverless compute consumption changes, advanced features (AI, Snowpark, Container Services)

**3.3 Design and manage data compliance policies**
- Snowflake security and governance features supporting regulatory compliance: encryption, access controls, masking, auditing for GDPR, HIPAA, CCPA, PCI DSS
- Define, enable, and automate audit policies to support compliance reporting
- Use Snowflake Trust Center resources: Snowflake Compliance Center, security certifications, compliance reports

Explicitly in-scope: QUERY_HISTORY, ACCESS_HISTORY, ACCOUNT_USAGE views, LOGIN_HISTORY, Snowflake Trail, Trust Center, tasks/streams for alerts, GDPR/HIPAA/CCPA/PCI DSS compliance, credit consumption monitoring

---

### Domain 4 — Threats, Risk Assessment, Incident Response, and Forensics (18%)
Key topics from materials:

**4.1 Perform threat modeling, identification, and analyses**
- Identify and catalog critical assets within Snowflake
- Identify and document data entry and exit points
- Apply threat modeling methodologies:
  - Data sharing configurations
  - Over-privileged roles and users
  - Compromised service account credentials
  - Vulnerabilities in 3rd-party connections and packages
- Implement mitigation strategies

**4.2 Perform risk assessment and manage risk**
- Use Snowflake Horizon Catalog to enable security best practices and compliance
- Assess security of data sharing agreements and configurations with external partners
- Analyze vulnerabilities: likelihood and potential impact
- Develop, implement, and monitor risk mitigation strategies

**4.3 Identify and manage security incidents**
- Configure and test security alerting mechanisms within Snowflake and integrated SIEM platforms
- Identify, triage, and contain security incidents:
  - Monitor Snowflake logs
  - Investigate alerts from security tools
  - Triage incoming alerts
  - Isolate affected user accounts
  - Revoke compromised credentials or API keys
  - Implement or update network policies
  - Suspend data sharing or integration
- Manage eradication and recovery: identify root cause, remove malicious access, restore from backups/Time Travel/Fail-safe

**4.4 Conduct a post-security-incident forensic analysis**
- Collect and preserve relevant logs: ACCOUNT_USAGE views, Time Travel and Fail-safe for historical data, chain of custody
- Perform forensic analysis:
  - QUERY_HISTORY: what actions were performed
  - ACCESS_HISTORY: tables/views/columns read or modified
  - LOGIN_HISTORY: source IP, client application, authentication methods
  - Correlate Snowflake data with logs from other systems (IdP, network devices) to build incident timeline

Explicitly in-scope: threat modeling, Horizon Catalog, SIEM integration, credential revocation, network policy updates, forensic use of QUERY_HISTORY/ACCESS_HISTORY/LOGIN_HISTORY, Time Travel/Fail-safe for recovery, chain of custody

---

### Domain 5 — Securing Snowflake Services and Features for AI/ML and Applications (12%)
Key topics from materials:

**5.1 Secure and govern applications with Snowpark Container Services**
- Design and deploy containerized services using Snowpark Container Services (SPCS)
- Security model of compute pools: isolation, network rules for inbound/outbound data
- Manage secrets and EXTERNAL_ACCESS_INTEGRATIONS for controlled external network access from services
- Lifecycle management of services and security implications
- Implement secure data access patterns for services:
  - Establish roles and permissions for services to access Snowflake data securely
  - Manage sensitive configurations within service specifications (YAML)
- Monitor and troubleshoot security issues: SERVICE_USAGE_HISTORY, compute pool monitoring views, container logs

**5.2 Leverage Snowflake Cortex AI to enhance data security**
- Content moderation and safety using Cortex LLM functions:
  - Configure COMPLETE() and TRY_COMPLETE() to filter content
  - Use filtered responses (NULL from TRY_COMPLETE())
- Use Cortex functions to classify data and detect anomalies:
  - Apply CLASSIFY_TEXT() to identify and tag sensitive data categories
- Use Cortex AI for data security:
  - AI Observability features for Gen AI application security
  - LLM-as-a-Judge: evaluate AI application responses for bias, toxicity, accuracy
  - Interpret traces to debug and audit sensitive data flow through Gen AI applications
  - Monitor AI application performance metrics related to security and data quality
- Use Cortex Analyst to support secure data exploration:
  - Securely configure semantic models
  - Access Cortex Analyst request logs to audit natural language queries and generated SQL
- Configured Cortex Agents to automate security and governance workflows:
  - Manage Agent orchestration and tool usage
  - Use Copilot for Snowflake Horizon Catalog to analyze and audit security

**5.3 Manage security in Snowflake Native Apps**
- Design and enforce security policies for Native Apps:
  - Secure, package, and share Native Apps
  - Use Streamlit in Snowflake application role ownership parameters
  - Use OAuth to authenticate app users
  - Implications of running Native Apps in Snowpark Container Services
  - Implement User-Based Access Control (UBAC) features with Native Apps
- Manage permissions for app installation and usage
- Secure application code and its dependencies: internal code, third-party packages, secrets and credentials

Explicitly in-scope: SPCS compute pools, EXTERNAL_ACCESS_INTEGRATIONS, secrets, SERVICE_USAGE_HISTORY, CORTEX.COMPLETE, TRY_COMPLETE, CLASSIFY_TEXT, AI Observability, LLM-as-a-Judge, Cortex Agents, Native App Framework, UBAC, Streamlit in Snowflake, OAuth for apps

---

## Sample Questions Analysis
Total samples: 5

| # | Type | Domain | Summary |
|---|------|--------|---------|
| 1 | Scenario (Single Answer) | D2 | GENERATE_SYNTHETIC_DATA join-key consistency via `join_key: True` in columns parameter |
| 2 | Scenario (Single Answer) | D1 | RBAC role hierarchy: custom roles with scoped privileges nested under parent role |
| 3 | Multi Answer - Select 3 | D1 | Monitoring over-privileged roles: GRANTS_TO_USERS, GRANTS_TO_ROLES, QUERY_HISTORY |
| 4 | Scenario (Single Answer) | D5 | CORTEX.COMPLETE with `response_format: <JSON schema>` for schema-conformant output |
| 5 | Scenario (Single Answer) | D3/D4 | ACCESS_HISTORY forensic analysis filtering by QUERY_ID, inspecting BASE_OBJECTS_ACCESSED |

Correct answers: 1:C, 2:A, 3:A,D,E, 4:D, 5:B

## Notes
- **Domain 1 name discrepancy**: Table of Contents and chapter heading say "Account and Security"; Subject Area Breakdown table says "Access Control and Identity Management". Using the Subject Area Breakdown table name as authoritative.
- **Exam parameters (pass threshold, duration, question count)**: Not stated in the study guide PDF. Exam Details tab on the official certification page requires JavaScript rendering and was not accessible via web_fetch. Values confirmed by user: 75% pass, 115 min, 65 questions.
- **Recommended generation mix** (from 5 sample questions): ~80% Scenario, ~20% Multi Answer, 0% Single Answer. Apply `Scenario` type whenever question opens with role/persona/situation; use `Single Answer` for direct factual questions. Prefer `Multi Answer - Select 2` over Select 3.
