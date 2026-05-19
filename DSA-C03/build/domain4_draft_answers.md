# Domain 4: Answers

---

## Q1
**Answer: B**

**Explanation:** Vectorized Python UDFs operate on batches of rows as pandas DataFrames or Series, which significantly reduces the serialization overhead between Snowflake's JVM and the Python runtime. This batch processing is especially beneficial for ML inference where model loading happens once and predictions are made on entire batches. Option A is incorrect because both UDF types have access to the same set of Anaconda packages. Option D is incorrect because neither UDF type automatically persists results — you must use INSERT or CREATE TABLE AS SELECT.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as Pandas DataFrames or Pandas Series. This can improve performance compared to the default row-by-row processing pattern by reducing the overhead of serialization and deserialization between Snowflake and the Python runtime."

---

## Q2
**Answer: D**

**Explanation:** The Snowflake Model Registry provides a managed way to deploy and serve models via SQL functions, making it the most appropriate approach for scoring individual records in a production setting. Registering the model allows calling it directly via SQL with built-in versioning and management. Option B (scalar UDF) would work but requires manual model artifact management on stages. Option A (vectorized UDF) is optimized for batch processing, not individual record scoring. Option C (external function) introduces unnecessary latency and external infrastructure dependencies.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry lets you securely manage models and their metadata in Snowflake, regardless of origin. The model registry stores machine learning models as first-class schema-level objects in Snowflake so they can be easily found and used by others in your organization."

---

## Q3
**Answer: A, D**

**Explanation:** Both methods involve uploading the model file to a Snowflake stage (internal or external) and referencing it through the IMPORTS clause in the UDF definition. Option A specifically mentions the PUT command for internal stages, while D is the general pattern of uploading to any stage and referencing via IMPORTS. Option B is impractical because serialized model binaries are far too large to embed as string literals. Option C is incorrect because the Model Registry is a separate mechanism and cannot be referenced via the IMPORTS clause of a UDF. Option E is incorrect because you cannot pass complex model objects as UDF parameters at query time.

**Source:** [Creating a Python UDF with IMPORTS](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating#reading-a-file-using-imports)

**Quote:** "You can read a file from a stage by specifying the file in the IMPORTS clause of the CREATE FUNCTION statement. The IMPORTS clause makes the file available to the UDF at runtime."

---

## Q4
**Answer: B**

**Explanation:** The PACKAGES clause in the CREATE FUNCTION statement specifies which Python packages from the Snowflake Anaconda channel are required by the UDF. For example, `PACKAGES = ('scikit-learn', 'pandas')`. Option A (REQUIREMENTS) is not a valid clause in the CREATE FUNCTION DDL. Option C (DEPENDENCIES) and Option D (LIBRARIES) are also not valid clauses for specifying Python packages in a Snowflake UDF definition.

**Source:** [Creating Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating)

**Quote:** "Use the PACKAGES clause to specify the names of packages that your UDF depends on. Snowflake will install these packages from the Anaconda channel and make them available to your UDF at runtime."

---

## Q5
**Answer: B**

**Explanation:** Snowpark Container Services (SPCS) allows deploying custom Docker containers within Snowflake's infrastructure, supporting GPU acceleration and any custom libraries including TensorFlow with GPU support. This is the ideal solution for complex models requiring custom runtime environments. Option A (external functions to SageMaker) would work but moves compute outside Snowflake, adding latency and external infrastructure management. Option C is incorrect because standard Python UDFs do not support GPU acceleration regardless of warehouse size. Option D is impractical as TensorFlow Java bindings are poorly supported and would still lack GPU access.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services is a fully managed container offering that allows you to easily deploy, manage, and scale containerized applications directly within Snowflake. The service supports GPU compute pools for workloads such as machine learning model training and inference."

---

## Q6
**Answer: B**

**Explanation:** The PUT command is used to upload local files to a Snowflake internal stage. The `file://` prefix specifies the local file path, and `AUTO_COMPRESS=FALSE` prevents automatic gzip compression, which is important for model artifacts that may not compress well or that need to be loaded in their original format. Option A uses invalid syntax — there is no UPLOAD FILE command. Option C incorrectly uses COPY INTO, which is for loading data into tables, not uploading files to stages. Option D is entirely fabricated syntax.

**Source:** [PUT command](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Uploads (i.e. stages) data files from a local file system to one of the following Snowflake stages: named internal stage, table stage, or user stage."

---

## Q7
**Answer: B**

**Explanation:** A drop in precision with stable recall indicates the model is generating more false positives — predicting the positive class for instances that are actually negative. This pattern is characteristic of data drift, where the distribution of incoming data has shifted away from what the model was trained on, causing it to misclassify new patterns. Option A (underfitting) would affect both precision and recall. Option C (memory issues) would cause errors or crashes, not systematic precision degradation. Option D (artifact corruption) would likely cause the UDF to fail entirely rather than degrade gradually.

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Monitor the accuracy and data integrity of your registered models. Track metrics over time to detect model performance degradation caused by changes in input data distributions."

---

## Q8
**Answer: B**

**Explanation:** The `log_model()` function in the Snowflake Model Registry saves a trained model object along with its metadata, metrics, and version information to the registry. This makes the model a managed, schema-level object in Snowflake. Option A is incorrect because `log_model()` does not record inference latency — that would be a monitoring function. Option C is incorrect because audit logging is separate from model logging. Option D is incorrect because training logs are written to event tables, not via `log_model()`.

**Source:** [Logging Models to the Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Use the log_model method of a Registry object to log a model, creating a model object in the Snowflake Model Registry. You can provide the model, version name, metrics, and other metadata when logging."

---

## Q9
**Answer: B, D**

**Explanation:** AUC (Area Under the ROC Curve) and F1 Score are both standard metrics for evaluating binary classification models. AUC measures the model's ability to discriminate between classes across all thresholds, while F1 Score is the harmonic mean of precision and recall, useful when class imbalance exists. Options A (RMSE), C (MAPE), and E (R²) are regression metrics, not classification metrics — they measure continuous prediction error, not class discrimination ability.

**Source:** [Snowflake ML Model Evaluation](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "For classification models, common evaluation metrics include accuracy, precision, recall, F1 score, and AUC (Area Under the ROC Curve). These metrics help assess how well the model discriminates between classes."

---

## Q10
**Answer: B**

**Explanation:** A decrease in recall from 95% to 78% over six months strongly suggests that the model is missing more true positives — failing to flag actual fraudulent transactions. This is a classic symptom of data drift, where transaction patterns have evolved away from what the model was trained on. The team should investigate whether input feature distributions have changed. Option A (warehouse size) affects performance/speed, not model accuracy. Option C (memory leak) would cause failures or errors, not gradual recall degradation. Option D (dropped stage) would cause the UDF to fail entirely, not degrade gradually.

**Source:** [Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Data drift occurs when the statistical properties of the input data change over time, causing the model to make less accurate predictions. Monitoring input feature distributions helps detect drift early."

---

## Q11
**Answer: B**

**Explanation:** Model decay (also called model drift or model degradation) refers to the gradual decline in a model's predictive performance over time as real-world data distributions diverge from the training data. Option A is incorrect — model artifacts stored on stages do not "corrupt" over time in storage. Option C describes a scalability issue, not model decay. Option D describes a metadata management issue, not model decay.

**Source:** [Model Monitoring Overview](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Over time, a model's predictive performance can degrade as the real-world data it scores diverges from the data it was trained on. This phenomenon is commonly referred to as model decay."

---

## Q12
**Answer: B**

**Explanation:** Snowflake Tasks are used to schedule and automate recurring SQL or stored procedure executions, making them the appropriate object for scheduling automated model retraining. Tasks support CRON-based scheduling and can be triggered by streams. Option A (STREAM) detects data changes but does not execute code on a schedule. Option C (PIPE) is for continuous data ingestion via Snowpipe, not for running procedures. Option D (SEQUENCE) generates unique numeric values and has no scheduling capability.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task object defines a schedule for executing a SQL statement, including calling a stored procedure or Snowpark Python function. Tasks can be combined with streams for continuous ELT pipelines."

---

## Q13
**Answer: B**

**Explanation:** Snowpark Container Services allows deploying custom Docker containers within Snowflake, enabling the use of any library including proprietary C++ libraries that are not available in the Anaconda channel. This is the correct approach when standard UDF packages are insufficient. Option A would require fundamentally changing the model implementation, which may not be feasible. Option C (JNI bindings) is theoretically possible but extremely complex and fragile. Option D is incorrect because you cannot upload arbitrary native C++ libraries to a stage and expect them to work in the Python UDF sandbox.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services lets you deploy and run containerized workloads directly in Snowflake. You can use any language, library, or framework packaged in a Docker container, including proprietary or custom-built libraries."

---

## Q14
**Answer: D**

**Explanation:** In the Snowflake Model Registry, you retrieve a previously logged model by calling `get_model()` on the Registry object, which returns a ModelReference that can be used for inference. The pattern is `registry.get_model("model_name")`. Option A appears similar but lacks the registry object context — the method is called on a Registry instance. Options B and C are not valid methods in the Snowflake Model Registry API.

**Source:** [Using the Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "To retrieve a model from the registry, use the get_model method of the Registry object. This returns a Model object that you can use to access the model's methods for inference."

---

## Q15
**Answer: A, C**

**Explanation:** Covariate drift (change in input feature distributions) and concept drift (change in the relationship between features and target) are the two fundamental types of data drift that degrade model performance. Covariate drift means the model sees inputs different from training; concept drift means the same inputs should now produce different outputs. Option B (schema drift) is a data engineering concern, not a modeling issue. Options D and E are fabricated terms that do not represent real ML concepts.

**Source:** [Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Two primary types of drift can affect model performance: covariate drift, where the distribution of input features changes, and concept drift, where the relationship between features and the target variable changes over time."

---

## Q16
**Answer: B**

**Explanation:** External functions backed by an API integration are the correct Snowflake feature for calling external REST APIs from within SQL queries. The API integration handles authentication and network configuration securely. Option A is incorrect because Python UDFs run in a restricted sandbox and the `requests` library cannot make outbound network calls by default. Option C (SPCS) would require hosting the model yourself rather than calling an existing third-party API. Option D is incorrect because JavaScript UDFs also run in a sandbox without network access.

**Source:** [External Functions](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that is executed outside of Snowflake. The remotely executed code is known as a remote service. External functions require an API integration object that provides authentication for connecting to the proxy service."

---

## Q17
**Answer: B**

**Explanation:** The AUTO_COMPRESS parameter in the PUT command controls whether the file is automatically compressed using gzip during upload. Setting it to FALSE is important for model artifacts (like pickle files) that need to be read in their original binary format. Option A is incorrect — AUTO_COMPRESS has nothing to do with model compilation. Option C is incorrect — versioning is not controlled by compression settings. Option D is incorrect — encryption at rest is handled separately by Snowflake's storage layer, not by the PUT command's AUTO_COMPRESS parameter.

**Source:** [PUT command](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "AUTO_COMPRESS = TRUE | FALSE specifies whether Snowflake uses gzip to compress files during upload. If set to TRUE, the files are compressed. If FALSE, the files are not compressed during upload."

---

## Q18
**Answer: C**

**Explanation:** RMSE (Root Mean Squared Error) is the most appropriate metric for evaluating a regression model that predicts continuous values like house prices. It measures the average magnitude of prediction errors in the same units as the target variable. Options A (AUC), B (Precision), and D (F1 Score) are all classification metrics designed for categorical predictions, not continuous regression outputs.

**Source:** [Snowflake ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "For regression tasks, common evaluation metrics include mean absolute error (MAE), root mean squared error (RMSE), and R-squared. RMSE is particularly useful because it penalizes larger errors and is expressed in the same units as the target variable."

---

## Q19
**Answer: B**

**Explanation:** A stream on the source table combined with the SYSTEM$STREAM_HAS_DATA() function as the task's WHEN condition ensures the task only runs when new data has arrived. This is the standard pattern for conditional task execution in Snowflake. Option A is incorrect because a CRON expression only controls timing, not data-dependent triggering. Option C (notification integration) is used for external notifications, not for triggering tasks based on table changes. Option D (resource monitor) tracks credit consumption, not data ingestion.

**Source:** [Task Scheduling with Streams](https://docs.snowflake.com/en/user-guide/tasks-intro#conditional-task-execution)

**Quote:** "You can use streams and tasks together to create continuous ELT pipelines. Use the WHEN clause with SYSTEM$STREAM_HAS_DATA to trigger a task only when the stream for a table contains change data."

---

## Q20
**Answer: B, C**

**Explanation:** External functions can call REST API endpoints hosted outside Snowflake (such as AWS API Gateway, Azure API Management) and they require an API integration object for authentication and network security configuration. Option A is incorrect — external functions execute code outside the Snowflake compute layer, not within it. Option D is incorrect — external functions can return tabular results when defined as table functions. Option E is incorrect — external functions support both synchronous and asynchronous invocation patterns.

**Source:** [External Functions Introduction](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that executes outside Snowflake. Information is sent to and received from the remotely executed code through a REST API. An API integration object is required to authenticate requests between Snowflake and the proxy service."

---

## Q21
**Answer: B**

**Explanation:** The key difference is in input handling: scalar Python UDFs receive and process one row at a time, while vectorized Python UDFs receive batches of rows as pandas Series (for individual columns) or DataFrames. This batch processing significantly improves performance for operations like ML inference. Option A is incorrect — both types support the same data types. Option C is incorrect — the distinction is about batching, not threading. Option D is entirely wrong — both use Python 3.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "A vectorized Python UDF handler receives a batch of rows as a pandas DataFrame or pandas Series, rather than receiving a single row at a time. This is in contrast to a default (scalar) handler, which processes one row per invocation."

---

## Q22
**Answer: B**

**Explanation:** The significant divergence in the "monthly_usage" feature distribution between training and current data is a clear case of covariate drift. The correct remedy is to retrain the model using recent data that reflects the current distribution, restoring the model's ability to make accurate predictions. Option A (increasing warehouse size) addresses performance, not accuracy. Option C (switching to external function) is a deployment change that won't fix the underlying data drift issue. Option D is incorrect — adding features without retraining on current data won't address the distribution shift.

**Source:** [Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "When data drift is detected, the recommended remediation is to retrain the model using recent data that represents the current data distribution. This ensures the model captures the latest patterns in the data."

---

## Q23
**Answer: B**

**Explanation:** The Snowflake Model Registry supports storing the model binary along with version information, performance metrics, and metadata tags when logging a model. This comprehensive metadata storage enables model governance and comparison across versions. Option A is too restrictive — the registry stores much more than just the binary and name. Option C is incorrect — training SQL queries are not specifically stored. Option D is too restrictive — the registry supports structured metrics and tags, not just a single description string.

**Source:** [Logging Models](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "When you log a model to the registry, you can include the model object, a version name, sample input data, metrics such as accuracy or F1 score, and comment metadata to help organize and track models."

---

## Q24
**Answer: B**

**Explanation:** The `@vectorized(input=pd.DataFrame)` decorator is used in Snowpark Python to define a vectorized UDF that receives batches of input rows as a pandas DataFrame. This decorator signals to Snowflake that the UDF handler should receive batched input rather than individual rows. Option A is incorrect syntax. Option C (`@pandas_udf`) is a PySpark/Spark decorator, not a Snowflake Snowpark decorator. Option D does not make a UDF vectorized — merely including pandas in packages does not change the UDF's execution model.

**Source:** [Vectorized Python UDFs in Snowpark](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "To create a vectorized UDF using the Snowpark Python library, use the @vectorized decorator with the input parameter set to pd.DataFrame. The handler function will then receive a pandas DataFrame of input rows."

---

## Q25
**Answer: B**

**Explanation:** Creating a single Python UDF that imports all three model files from a stage is the most practical and efficient approach. The UDF can load all three pickle files via the IMPORTS clause, run each sub-model's prediction, and combine the outputs internally before returning the final ensemble prediction. Option A (three separate UDFs) would work but is less efficient because each UDF call incurs overhead, and orchestrating them in SQL adds complexity. Option C (external functions) introduces unnecessary external infrastructure and latency. Option D (cross-schema joins) is nonsensical — models are not stored as joinable table data.

**Source:** [Reading Files with Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating#reading-a-file-using-imports)

**Quote:** "The IMPORTS clause can specify multiple files from a stage. These files are made available to the UDF at runtime in a local directory, where the handler function can open and read them."

---

## Q26
**Answer: A, B**

**Explanation:** CTAS (`CREATE TABLE AS SELECT`) with a UDF applied is a standard pattern for materializing batch predictions into a new table, and `INSERT INTO ... SELECT` with a UDF is the standard pattern for appending predictions for new records. Writing directly to S3 from a UDF (C) is not supported — UDFs return values to the SQL engine, not to external storage. ALTER TABLE (D) cannot populate a column via a UDF in a single statement. Storing predictions as unstructured data in a stage (E) defeats the purpose of structured, queryable storage.

**Source:** [Using Python UDFs for Inference](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch-inference)

**Quote:** "You can use CREATE TABLE AS SELECT or INSERT INTO ... SELECT to store the results of batch inference by applying the UDF to input data in a query."

---

## Q27
**Answer: B**

**Explanation:** Metadata tagging in model lifecycle management is used to track model attributes such as version, author, training date, dataset used, and performance metrics. This provides auditability and traceability across the model lifecycle. It does not improve inference performance (A), encrypt artifacts (C), or directly enforce RBAC (D) — those are handled by other Snowflake features.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "You can attach metadata such as metrics, descriptions, and custom tags to each model version to track model attributes throughout the lifecycle."

---

## Q28
**Answer: B**

**Explanation:** When a vectorized UDF processes extremely large batches, it can load too much data into memory at once. Partitioning input data into smaller batches (e.g., via windowing or limiting batch size) reduces peak memory consumption while still leveraging vectorized execution. Switching to a scalar UDF (A) would degrade performance significantly. Increasing to 4XL (C) may not resolve memory limits within the Python sandbox. Rewriting in Java (D) is impractical and doesn't address the root cause of batch size.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "If a vectorized UDF encounters memory constraints, consider partitioning the input data into smaller batches to reduce memory consumption per execution."

---

## Q29
**Answer: B**

**Explanation:** The `GET` command in Snowflake downloads files from a named internal stage to the local filesystem. The syntax is `GET @stage_name/path file://local_path/`. DOWNLOAD (A), COPY FROM ... TO local (C), and EXPORT ... TO LOCAL (D) are not valid Snowflake SQL commands for downloading stage files.

**Source:** [GET Command](https://docs.snowflake.com/en/sql-reference/sql/get)

**Quote:** "Downloads data files from one of the following Snowflake stages to a local directory/folder on a client machine: Named internal stage, user stage, or table stage."

---

## Q30
**Answer: A, C**

**Explanation:** Snowpark Container Services supports custom Docker containers allowing arbitrary dependencies and runtime environments (A), and provides GPU compute pools for deep learning inference workloads (C). It does not include automatic hyperparameter tuning (B), built-in A/B testing (D), or automatic conversion of Python models to SQL (E) — those would need to be implemented by the user.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services lets you deploy, manage, and scale containerized applications directly within Snowflake, with support for GPU-enabled compute pools for machine learning workloads."

---

## Q31
**Answer: B**

**Explanation:** To ensure reproducibility — that the same inputs produce the same outputs — the correct approach is to run the model on a fixed reference dataset and verify that predictions are identical before and after redeployment. Comparing AUC (A) only checks aggregate performance, not row-level determinism. File size (C) doesn't guarantee identical behavior. Version number (D) only confirms registration metadata, not actual inference behavior.

**Source:** [Model Registry Version Management](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "To validate deployment consistency, run inference on a reference dataset and verify that predictions match expected outputs across deployments."

---

## Q32
**Answer: B**

**Explanation:** The HANDLER clause in a Python UDF specifies the name of the Python function that Snowflake should invoke when the UDF is called. It is not related to error handling (A), HTTP endpoints (C), or concurrency limits (D). The handler maps the SQL function call to the specific Python entry point.

**Source:** [Creating Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating)

**Quote:** "HANDLER = 'function_name' specifies the name of the Python function to call when the UDF is invoked."

---

## Q33
**Answer: B**

**Explanation:** Precision measures the proportion of predicted positives that are actually positive (TP / (TP + FP)). Recall (A) measures the proportion of actual positives correctly identified. Accuracy (C) is the overall percentage of correct predictions. MSE/RMSE (D) relates to regression, not classification precision.

**Source:** [Snowflake ML Classification Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "Precision is defined as the number of true positives divided by the sum of true positives and false positives, measuring the accuracy of positive predictions."

---

## Q34
**Answer: B**

**Explanation:** The Snowflake Model Registry supports setting a default version for a model. When v3 performs worse, the team should set the default back to v2, which ensures all inference calls that don't specify a version use the better-performing model. Deleting v3 (A) loses the artifact and makes future comparison impossible. Archiving both (C) is unnecessary. Renaming (D) is not a supported or safe practice.

**Source:** [Model Registry Version Management](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "You can set any version as the default version of a model. Inference calls that do not specify a version will use the default version."

---

## Q35
**Answer: A, C**

**Explanation:** Data drift detection involves comparing the statistical properties of current input features against training data distributions. Comparing summary statistics like mean and standard deviation (A) is a basic drift detection technique. The Kolmogorov-Smirnov test (C) is a formal statistical test for distribution differences. Warehouse size (B), query execution times (D), and NULL values in the registry (E) are operational metrics unrelated to feature distribution drift.

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Data drift can be detected by comparing summary statistics or applying statistical tests such as the Kolmogorov-Smirnov test between current and baseline feature distributions."

---

## Q36
**Answer: A**

**Explanation:** When deploying a model via Python UDF, the model artifact is uploaded to a stage and referenced in the IMPORTS clause. Inside the UDF handler, the file is accessed using `snowflake_import_directory` (via `sys._xoptions["snowflake_import_directory"]`) to load the model file. The model is not automatically loaded at UDF creation time (B), not streamed from external storage (C), and not compiled into bytecode (D).

**Source:** [Loading Files in a Python UDF](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating#reading-files-with-a-udf-handler)

**Quote:** "To read a file, use the snowflake_import_directory system option to get the path to the directory containing files specified in the IMPORTS clause."

---

## Q37
**Answer: A**

**Explanation:** Using a Snowflake Task to schedule an `INSERT INTO ... SELECT` with the UDF applied is the most efficient approach for automated daily batch scoring — it runs natively in Snowflake, leverages warehouse compute, and is easily scheduled. Exporting to external systems (B) introduces unnecessary data movement. Materialized views (C) cannot call Python UDFs. Looping through rows individually in a stored procedure (D) is extremely inefficient compared to set-based operations.

**Source:** [Snowflake Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can execute a single SQL statement, including a call to a stored procedure, or procedural logic using Snowflake Scripting, on a defined schedule."

---

## Q38
**Answer: C**

**Explanation:** External functions route data outside Snowflake to a remote service, which inherently adds network latency and data transfer overhead. Therefore, claiming external functions provide lower latency by avoiding data transfer outside Snowflake (C) is incorrect — they do the opposite. External functions are appropriate when specialized hardware is needed (A), models are hosted on external platforms (B), or organizations want centralized model serving (D).

**Source:** [External Functions Introduction](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that is executed outside of Snowflake. The data is sent to the remote service and results are returned, which introduces network latency."

---

## Q39
**Answer: B**

**Explanation:** AUC represents the probability that the model will rank a randomly chosen positive instance higher than a randomly chosen negative instance. It is not simply the percentage of correct predictions (A), which is accuracy. Average precision across thresholds (C) describes the area under the precision-recall curve, not ROC AUC. The complexity-accuracy trade-off (D) describes a different concept entirely.

**Source:** [Snowflake ML Classification Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "The AUC score represents the probability that the model ranks a randomly chosen positive example higher than a randomly chosen negative example."

---

## Q40
**Answer: A**

**Explanation:** Both the model artifact and the custom tokenizer Python file should be uploaded to a stage and listed in the IMPORTS clause. This makes both files available in the UDF execution environment. Inlining the entire tokenizer (B) is impractical for non-trivial code. The PACKAGES clause (C) is for Anaconda-hosted packages, not custom files. Storing Python code as binary in a table (D) is not a supported approach for loading Python modules.

**Source:** [Python UDF IMPORTS Clause](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating#reading-files-with-a-udf-handler)

**Quote:** "Use the IMPORTS clause to specify the locations of files on a stage that you want to make available to the UDF. This can include model files, Python modules, or other artifacts."

---

## Q41
**Answer: A, C**

**Explanation:** Tasks and Streams (A) can detect new data arrival (Streams) and trigger processing (Tasks), enabling automated retraining when fresh data appears. Tasks and Stored Procedures (C) allow scheduling a stored procedure that contains retraining logic to run on a schedule or when triggered. Materialized views and dynamic tables (B) are for data transformation, not model training. Resource monitors (D) track costs. Shares and exchanges (E) are for data sharing between accounts.

**Source:** [Snowflake Streams and Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Tasks can be combined with streams to trigger processing when new data is available, or with stored procedures to execute complex logic on a schedule."

---

## Q42
**Answer: B**

**Explanation:** The Snowflake Model Registry has built-in versioning that allows logging each model version with a version name, metrics, and metadata. This is the recommended approach as it provides a structured, queryable, and governed way to manage model versions. Storing files on a stage with naming conventions (A) is ad-hoc and error-prone. Separate schemas per version (C) is impractical. Timestamp-appended names in a tracking table (D) is a manual workaround that lacks registry features.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Model Registry lets you log models as versions within a named model object, tracking metrics and metadata for each version."

---

## Q43
**Answer: C**

**Explanation:** At 15 seconds per row for 10 million rows, the compute requirement is massive. An external function backed by a scalable cloud function (e.g., AWS Lambda, Azure Functions) that can handle thousands of parallel invocations is the best strategy — it provides horizontal scalability outside Snowflake's warehouse model. A scalar UDF on XS (A) would be impossibly slow. Snowpark Container Services (B) could work but external functions with serverless auto-scaling offer simpler horizontal scaling for this pattern. Optimizing to under 1 second (D) may not be feasible for complex optimization algorithms.

**Source:** [External Functions Introduction](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "External functions are useful when the computation requires resources or scalability characteristics that are better served by an external service."

---

## Q44
**Answer: B**

**Explanation:** Loading the model at module level (or in a cached/static initializer) ensures it is deserialized once per Python sandbox instance and reused across all rows processed in that batch. Loading inside the handler (D) would cause the model to be deserialized on every function invocation, which is extremely slow for large models. Module-level loading is not a syntax requirement (A), and it has nothing to do with encryption (C).

**Source:** [Python UDF Best Practices](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-designing#caching-import-data-across-invocations)

**Quote:** "To avoid repeatedly loading and deserializing import data, load the data at module level so it is shared across UDF invocations within the same Python environment."

---

## Q45
**Answer: B**

**Explanation:** High recall (90%) means the model catches most fraudulent transactions. Low precision (40%) means that more than half of the transactions flagged as fraud are actually legitimate (many false positives). High accuracy (96%) is misleading because fraud is rare (class imbalance). The model is not missing frauds (C) — recall is high. The issue is not about needing more data (D) but about the high false positive rate.

**Source:** [Snowflake ML Classification Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "A model with high recall but low precision identifies most positive cases but also generates many false positive predictions."

---

## Q46
**Answer: A, C**

**Explanation:** In Snowflake Model Registry, each model version is immutable once logged — you cannot overwrite an existing version, ensuring reproducibility (A). You can also designate a default version so that inference calls that omit a version number automatically use the default (C). Model versions are not stored as micro-partitions in a regular table (B) — they are stored as registry objects. The registry does not auto-delete old versions (D), and multiple versions per model are fully supported (E).

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowflake-ml/model-registry/overview)

**Quote:** "Each version of a model is immutable. You can set one version as the default, which is used when no version is specified."

---

## Q47
**Answer: A**

**Explanation:** Setting a default version determines which version is used for inference when no specific version is requested. This allows seamless rollbacks and promotions without changing downstream queries. It does not make the version read-only (B), trigger automatic retraining (C), or bypass access controls (D).

**Source:** [Model Registry Version Management](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The default version of a model is used for inference when the caller does not explicitly specify a version."

---

## Q48
**Answer: B**

**Explanation:** Snowflake provides pre-built Anaconda-based sandbox environments for Python UDF execution and reuses these environments across UDF calls for efficiency. It does not create a new virtual environment from scratch each time (A), does not run on the user's local machine (C), and does not compile Python to SQL (D). The Anaconda channel provides curated packages available via the PACKAGES clause.

**Source:** [Python UDF Dependencies](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-packages)

**Quote:** "Snowflake provides a pre-installed set of packages from the Anaconda channel in the Python UDF sandbox environment. The environment is reused across multiple UDF invocations for efficiency."

---

## Q49
**Answer: B**

**Explanation:** The Model Registry with metadata tags and version tracking provides a comprehensive record of who created/deployed each version, when it was deployed, what metrics were achieved, and can include custom tags for training data provenance. Query history (A) tracks SQL execution but not model-level governance metadata. Access history (C) tracks data access patterns. Stage file metadata (D) provides only basic file information, not model lifecycle details.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Model Registry provides model governance capabilities including tracking model versions, metadata, metrics, and lineage for regulatory compliance requirements."

---

## Q50
**Answer: B**

**Explanation:** RMSE (Root Mean Squared Error) takes the square root of the mean squared error, bringing the metric back to the same units as the target variable. This makes it directly interpretable — e.g., if predicting price in dollars, RMSE is in dollars. It is not unitless (A) — that would describe metrics like R-squared. MSE (not RMSE) is in squared units (C). MAPE would be a percentage of the mean (D), not RMSE.

**Source:** [Snowflake ML Regression Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "RMSE is the square root of MSE and is expressed in the same units as the target variable, making it easier to interpret than MSE."

---

## Q51
**Answer: A, C**

**Explanation:** When data drift is detected, the correct responses are to investigate which features have drifted and assess impact (C), and to retrain the model with recent data reflecting current distributions (A). Immediately dropping the UDF (B) would halt all predictions unnecessarily rather than following a measured response. Increasing warehouse size (D) addresses compute capacity, not drift. Converting to JavaScript (E) is irrelevant to drift remediation.

**Source:** [Snowflake ML Monitoring and Drift](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-management/monitor-models)

**Quote:** "When drift is detected, data scientists should investigate the drifted features, assess impact on model performance, and retrain the model using recent data that reflects current distributions."

---

## Q52
**Answer: B**

**Explanation:** A 2 GB transformer model exceeds what can be efficiently loaded within a Python UDF's initialization constraints. Python UDFs are designed for lightweight model inference, not loading massive deep learning models. Snowpark Container Services provides container-based execution with more memory, longer startup tolerance, and GPU support suitable for large transformer models. The RETURNS clause (A) and PACKAGES clause (D) would produce different errors. Stage storage (C) is not the bottleneck.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services is a fully managed container offering that allows you to deploy, manage, and scale containerized applications directly within Snowflake, suitable for workloads requiring large model artifacts or GPU compute."

---

## Q53
**Answer: B**

**Explanation:** The `SHOW MODELS` command lists all models registered in the current schema of the Snowflake Model Registry. `LIST` (A) is used for stage files, not registry objects. `DESCRIBE` (C) is used for a specific model, not to list all models. There is no INFORMATION_SCHEMA.MODELS view (D).

**Source:** [Snowflake Model Registry — SHOW MODELS](https://docs.snowflake.com/en/sql-reference/sql/show-models)

**Quote:** "SHOW MODELS lists the models that you have access to in the current or specified schema, including the model name, creation date, and default version."

---

## Q54
**Answer: B**

**Explanation:** In the Snowflake Model Registry, a model is a named registry entry (a container object) that can hold multiple versions. Each model version represents a distinct trained artifact with its own parameters, metrics, and serialized model object. The model is not metadata only (C), and the terms are not interchangeable (D). A model is not a single artifact — it is the grouping entity (A is incorrect).

**Source:** [Snowflake Model Registry Overview](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "A model is a schema-level object in Snowflake that can contain multiple versions. Each version represents a distinct trained model artifact, allowing you to track and manage the lifecycle of your models."

---

## Q55
**Answer: B**

**Explanation:** When regulatory compliance requires model explainability and both models meet minimum performance thresholds, the more interpretable model should be chosen. Logistic regression provides inherent interpretability through feature coefficients, making it suitable for regulatory audit. While gradient boosting has higher AUC (A), the regulatory requirement for explainability takes precedence when performance thresholds are already met. An ensemble (C) would reduce interpretability further. Snowflake's built-in classification (D) may not meet specific business requirements.

**Source:** [Snowflake ML Model Deployment Considerations](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "When choosing a model for deployment, consider not only predictive performance but also interpretability requirements, especially in regulated industries where model decisions must be explainable."

---

## Q56
**Answer: A, C**

**Explanation:** Deploying models inside Snowflake means data stays within the platform, eliminating data movement and reducing security risks (A). Inference runs on Snowflake's scalable compute infrastructure and is billed through standard Snowflake credits (C). Models are NOT automatically retrained when data changes (B) — retraining must be explicitly triggered. Internal deployment does not guarantee lower latency than all external options (D). Snowflake does not support all languages/frameworks without limitation (E).

**Source:** [Deploying Models in Snowflake](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "By deploying models within Snowflake, you eliminate the need to move data outside the platform, enhancing security and governance while leveraging Snowflake's elastic compute for scalable inference."

---

## Q57
**Answer: B**

**Explanation:** Concept drift refers to a change in the underlying relationship between input features and the target variable — i.e., P(Y|X) changes over time. This is distinct from data drift / covariate drift (A), which is a change in the input feature distributions P(X). Schema changes (C) and artifact format changes (D) are operational concerns, not types of statistical drift.

**Source:** [Monitoring ML Models in Snowflake](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-management/monitor-models)

**Quote:** "Concept drift occurs when the statistical relationship between the input features and the target variable changes over time, even if the input distributions remain stable."

---

## Q58
**Answer: A**

**Explanation:** Snowflake does not have a built-in A/B testing feature in the Model Registry (D). The practical approach is to deploy both model versions as separate Python UDFs and use SQL logic (e.g., a CASE statement with a random function) to route a percentage of records to each version for comparison. You cannot set two default versions simultaneously (B). Warehouse size (C) is irrelevant to A/B testing logic.

**Source:** [Snowflake Model Registry — Model Versions](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Multiple model versions can be deployed simultaneously as separate functions, enabling patterns like A/B testing where predictions are compared across different model versions."

---

## Q59
**Answer: C**

**Explanation:** The `run()` method on a Snowflake Model Registry ModelVersion object is used to execute inference. It accepts a DataFrame and returns predictions. The methods `score()` (A), `predict()` (B), and `infer()` (D) are not the correct method names in Snowflake's Model Registry API — though `predict` may be a method name defined in the underlying model, `run()` is the registry-level invocation method.

**Source:** [Snowflake Model Registry — Running Inference](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/run-inference)

**Quote:** "To run inference using a model version, call the run method on the ModelVersion object, passing in the input DataFrame containing the features for prediction."

---

## Q60
**Answer: B**

**Explanation:** Snowflake provides the `INFORMATION_SCHEMA.PACKAGES` view which lists all packages available in the Anaconda channel supported by Snowflake, including their versions. This is the proper way to verify package availability before creating a UDF. Trial and error (A) is inefficient. Static documentation lists (C) may be outdated. Uploading wheel files (D) is a workaround when a package is NOT available, not a verification method.

**Source:** [Using Third-Party Packages in Snowflake](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-packages)

**Quote:** "You can query the INFORMATION_SCHEMA.PACKAGES view to determine which packages and versions are available for use in Snowflake Python UDFs and stored procedures."

---

## Q61
**Answer: A, C**

**Explanation:** Java UDFs can load model files in formats like PMML or ONNX from stages for inference (A), making them useful when models were trained in JVM-based frameworks like Spark MLlib or H2O (C). Java UDFs CAN access files from stages via the IMPORTS clause (B is wrong). Java UDFs do not always outperform Python UDFs (D) — performance depends on the workload. Java UDFs do not require Snowpark Container Services (E).

**Source:** [Java UDF Introduction](https://docs.snowflake.com/en/developer-guide/udf/java/udf-java-introduction)

**Quote:** "Java UDFs can read files from stages specified in the IMPORTS clause, enabling you to load serialized model artifacts such as PMML or ONNX files for inference within Snowflake."

---

## Q62
**Answer: B**

**Explanation:** The Kolmogorov-Smirnov (KS) test is a non-parametric test that compares two continuous distributions by measuring the maximum distance between their cumulative distribution functions. It is commonly used for drift detection on continuous numerical features. The Chi-squared test (A) is used for categorical variables. Fisher's exact test (C) is for small-sample categorical data. McNemar's test (D) is for paired nominal data comparing two classifiers.

**Source:** [Monitoring ML Models — Drift Detection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-management/monitor-models)

**Quote:** "For continuous numerical features, statistical tests such as the Kolmogorov-Smirnov test can be used to compare the distribution of incoming data against the training data distribution."

---

## Q63
**Answer: B**

**Explanation:** The Snowflake Model Registry supports attaching metadata and tags to model versions, allowing data scientists to record training dataset information, hyperparameters, responsible teams, and other custom metadata directly on the registry entry. Storing metadata in a separate table (A) creates a disconnected system. Embedding metadata in source code comments (C) is not queryable or structured. README files on stages (D) are informal and not integrated with the registry.

**Source:** [Snowflake Model Registry — Managing Models](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/manage-registry)

**Quote:** "You can set metadata on model versions to track custom information such as training datasets, hyperparameters, and team ownership, making it easy to manage and audit model lineage."

---

## Q64
**Answer: B**

**Explanation:** The `OVERWRITE=TRUE` option in the PUT command replaces any existing file with the same name on the stage. Without this option, if a file with the same name exists, the upload will fail. It does not compress files (A) — AUTO_COMPRESS handles that separately. It does not create versions (C) or delete other files (D).

**Source:** [PUT Command](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "OVERWRITE = TRUE specifies that the file on the stage is overwritten if a file with the same name already exists on the stage."

---

## Q65
**Answer: B**

**Explanation:** When a new sensor type is added, the input feature distributions change — new features or new value ranges appear that were not present during training. This is covariate drift (change in P(X)). Concept drift (A) would mean the relationship between sensor readings and failures changed, not the sensor inputs themselves. Label drift (C) would involve changes in failure definitions. "Model drift due to Python version changes" (D) is not a recognized drift type.

**Source:** [Monitoring ML Models — Types of Drift](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-management/monitor-models)

**Quote:** "Covariate drift, also known as data drift, occurs when the distribution of input features changes over time, such as when new data sources or sensor types are introduced."

---

## Q66
**Answer: A, C**

**Explanation:** The Snowflake Model Registry supports popular ML frameworks including scikit-learn (serialized with joblib/pickle) and XGBoost, among others like PyTorch, TensorFlow, and LightGBM. Raw SQL text (B), WebAssembly (D), and CSV lookup tables (E) are not ML model formats supported by the registry.

**Source:** [Snowflake Model Registry — Supported Frameworks](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry supports models from popular frameworks including scikit-learn, XGBoost, LightGBM, PyTorch, TensorFlow, and other Python-based ML libraries."

---

## Q67
**Answer: B**

**Explanation:** An API integration in Snowflake establishes the trust relationship between Snowflake and the external cloud service (such as an API Gateway or Azure API Management) that proxies requests to external functions. It does not define compute resources (A), specify Python packages (C), or create data shares (D). The API integration stores the allowed endpoints and authentication configuration.

**Source:** [API Integrations for External Functions](https://docs.snowflake.com/en/sql-reference/sql/create-api-integration)

**Quote:** "An API integration object stores information about the HTTPS proxy service, including the allowed endpoints and authentication, establishing a trust relationship between Snowflake and the remote service."

---

## Q68
**Answer: C**

**Explanation:** Recall (also known as sensitivity or true positive rate) is defined as TP / (TP + FN). A recall of 1.0 means all positive instances were correctly identified — there are zero false negatives. A recall of 0.0 (A) means no positive instances were detected. 0.5 (B) means only half were detected. Recall's definition is not dependent on the number of classes in binary classification (D).

**Source:** [Snowflake ML — Model Evaluation Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Recall measures the proportion of actual positives that are correctly identified. A recall of 1.0 indicates that the model correctly identifies all positive instances with no false negatives."

---

## Q69
**Answer: A**

**Explanation:** A stream on the source table captures change data (new inserts/updates), and a task can be scheduled to run a stored procedure that checks the stream, retrains the model with updated data, logs the new version to the registry, and scores the new data. Materialized views (B) cannot execute procedural logic like model training. Dynamic tables (C) compute SQL transformations, not ML training pipelines. An alert triggering an external function (D) adds unnecessary external dependency.

**Source:** [Streams and Tasks for ML Pipelines](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Tasks can be combined with streams to create automated pipelines that detect new data and execute stored procedures for processing, including model retraining and scoring workflows."

---

## Q70
**Answer: C**

**Explanation:** For vectorized Python UDFs, Snowflake automatically determines the optimal batch size based on internal optimization factors such as available memory and row sizes. The batch size is not fixed at 1,000 (A), not user-specified (B), and not equal to the total result set (D). The UDF receives batches as pandas Series or DataFrames.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Snowflake determines the ideal number of rows per batch based on internal optimization. The vectorized handler receives a pandas Series for each argument, with the batch size determined automatically."

---

## Q71
**Answer: A, C**

**Explanation:** Loading the model at the module level or in a cached function ensures it is loaded once per execution environment rather than on every function call, which is critical for performance (A). Pinning specific package versions ensures reproducibility across deployments (C). Scalar UDFs are NOT always better — vectorized UDFs offer significant performance gains for batch inference (B is wrong). Embedding training data in UDF source code (D) is impractical and a bad practice. Using the largest warehouse regardless of workload (E) wastes credits.

**Source:** [Best Practices for Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-designing)

**Quote:** "Load models and other expensive resources at the module level or in a cached initialization function so they are loaded once per Python sandbox and reused across invocations. Pin package versions to ensure consistent behavior."

---

## Q72
**Answer: A**

**Explanation:** Comparing prediction distributions against training label distributions using statistical tests (e.g., KS test, chi-squared test) is an effective and automated approach to detect prediction drift. Running this via a scheduled task makes it a daily automated check. Manual inspection (B) is not scalable. Resource monitors (C) track credit usage, not prediction quality. UDF execution time (D) indicates performance, not prediction quality.

**Source:** [Monitoring ML Models in Snowflake](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-management/monitor-models)

**Quote:** "To monitor prediction drift, compare the distribution of model predictions against the expected distribution from training labels using statistical tests, and automate this check using scheduled tasks."

---

## Q73
**Answer: C**

**Explanation:** When a model version is dropped from the Snowflake Model Registry, the artifacts associated with that version are removed from the registry. The registry manages the lifecycle of model artifacts. They are not left on a stage indefinitely (A), not moved to fail-safe (B), and not automatically exported (D).

**Source:** [Snowflake Model Registry — Dropping Model Versions](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/manage-registry)

**Quote:** "When you drop a model version, the associated artifacts and metadata for that version are removed from the registry."

---

## Q74
**Answer: B**

**Explanation:** Accuracy is the ratio of correct predictions to total predictions. In imbalanced datasets, a model that always predicts the majority class can achieve deceptively high accuracy. For example, if 95% of samples are negative, predicting all negatives yields 95% accuracy with zero recall on the positive class. Accuracy is not always the best metric (A), does not adjust for imbalance (C), and is valid for any distribution but must be interpreted carefully (D).

**Source:** [Snowflake ML — Evaluating Classification Models](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "For imbalanced datasets, accuracy alone can be misleading because a model that predicts only the majority class can still achieve high accuracy. Use metrics such as precision, recall, F1-score, and AUC for a more complete evaluation."

---

## Q75
**Answer: B**

**Explanation:** High training performance (AUC=0.95) but poor production performance (AUC=0.72) with matching feature distributions is a classic sign of overfitting. The model has memorized training data patterns rather than learning generalizable relationships. Data drift (A) is ruled out because feature distributions match. Warehouse size (C) does not affect model accuracy. Incorrect registry logging (D) would cause errors, not degraded performance.

**Source:** [Snowflake ML — Model Evaluation Best Practices](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "A large gap between training and production performance, where feature distributions are consistent, typically indicates overfitting — the model has learned patterns specific to the training data that do not generalize to new data."

---

## Q76
**Answer: A, C**

**Explanation:** Uploading a model artifact to a stage and serving it via a Python UDF is a well-established pattern for deploying pre-built models in Snowflake. Snowpark Container Services allows deploying custom Docker containers with arbitrary dependencies, making it ideal for complex pre-trained models (e.g., NLP). Importing a model directly into a JavaScript UDF (D) is not feasible because JavaScript UDFs lack the ML library ecosystem needed. Storing a model in a table column (E) does not provide an execution mechanism for inference.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services is a fully managed container offering that allows you to deploy, manage, and scale containerized applications directly within Snowflake."

---

## Q77
**Answer: B**

**Explanation:** The RUNTIME_VERSION parameter specifies which Python interpreter version (e.g., '3.8', '3.9', '3.10', '3.11') should be used when executing the UDF. It does not set an SDK version (A), a timeout (C), or a UDF tracking version (D). This is important because different Python versions may affect library compatibility and language features available in the UDF.

**Source:** [Python UDF — CREATE FUNCTION](https://docs.snowflake.com/en/sql-reference/sql/create-function#python-udf-parameters)

**Quote:** "RUNTIME_VERSION = 'version' specifies the Python runtime version to use. Supported versions include 3.8, 3.9, 3.10, and 3.11."

---

## Q78
**Answer: B**

**Explanation:** When feature distributions have not changed significantly but prediction error has tripled, the most likely explanation is concept drift — the underlying relationship between features and the target variable has shifted. In real estate, market conditions (interest rates, economic changes) can alter how features like square footage or location relate to price. Covariate drift (A) is ruled out because the question states feature distributions have not changed. Model corruption (C) would likely cause errors, not a gradual increase in RMSE. Warehouse size (D) does not affect prediction accuracy.

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Concept drift occurs when the statistical relationship between input features and the target variable changes over time, even if the input distributions remain stable."

---

## Q79
**Answer: B**

**Explanation:** Snowflake ML provides SNOWFLAKE.ML.CLASSIFICATION as a built-in model training and deployment function that handles the full lifecycle — training a classification model and enabling predictions — without requiring custom model deployment. SNOWFLAKE.ML.CLASSIFY() (A) is not a valid function name. SNOWFLAKE.ML.PREDICT() (C) is used to call a trained model but is not itself a classification function. AUTO_CLASSIFY() (D) does not exist as an ML classification function.

**Source:** [Classification — Snowflake ML Functions](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "The classification function in Snowflake ML uses the input data to train a model and enables you to make predictions on new data using the trained model."

---

## Q80
**Answer: B**

**Explanation:** Even though random forest is deterministic given the same input, the Python UDF handler itself might contain non-deterministic operations — such as random sampling in preprocessing, time-dependent logic, or uncontrolled floating-point threading behavior. This is the most likely source of slight output variations. AUTO_COMPRESS (A) compresses files for transfer but does not alter the model artifact's content when decompressed. Warehouse size (C) does not affect floating-point precision in Python. The Model Registry (D) does not modify model artifacts between calls.

**Source:** [Python UDF Best Practices](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-designing)

**Quote:** "Ensure that the handler code is deterministic if consistent results are expected, as non-deterministic operations such as random number generation or time-dependent logic can produce varying outputs."

---

## Q81
**Answer: A, C**

**Explanation:** Snowpark Container Services requires a compute pool to provide the compute resources for running containers, and a service specification (YAML) that defines the container image, resource requirements, endpoints, and other configuration. A materialized view (B) is unrelated to container deployment. A JavaScript UDF (D) is not needed as SPCS provides its own interface mechanisms including service functions. Data shares (E) are for cross-account data sharing, not model deployment.

**Source:** [Snowpark Container Services — Tutorial](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/tutorials/tutorial-1)

**Quote:** "To create a service, you need a compute pool to run the container and a service specification that defines the container image, resources, and endpoints."

---

## Q82
**Answer: B**

**Explanation:** For multi-class classification, AUC is extended using one-vs-rest (OVR) or one-vs-one (OVO) strategies. OVR computes AUC for each class against all others and averages, while OVO computes AUC for each pair of classes. RMSE (A) is a regression metric, not appropriate for classification. Converting all classes to a single binary (C) loses multi-class information. AUC can indeed be used for multi-class problems (D is incorrect).

**Source:** [Classification — Snowflake ML Functions](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "For multi-class classification, the AUC is computed using the one-vs-rest approach, where each class is evaluated against all other classes."

---

## Q83
**Answer: A**

**Explanation:** A Snowflake Task scheduled to run weekly is the most appropriate approach. It can join stored predictions with the delayed ground truth labels, compute the required metrics, and insert results into a monitoring table — all within Snowflake. A Python UDF (B) cannot automatically track metrics on its own and would add overhead to every prediction call. The Model Registry (C) does not have a built-in performance monitoring dashboard that computes custom metrics from ground truth. An external service (D) is unnecessarily complex when everything can be done natively in Snowflake.

**Source:** [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can execute a single SQL statement, a call to a stored procedure, or procedural logic using Snowflake Scripting, on a recurring schedule."

---

## Q84
**Answer: C**

**Explanation:** Snowflake does not impose a strict maximum file size for uploads to internal stages via the PUT command. However, Snowflake documentation provides performance recommendations, such as compressing large files and splitting them into chunks for parallel upload. The 1 GB (A), 5 GB (B), and 100 MB (D) options are all fabricated hard limits that do not exist in Snowflake's PUT command specification.

**Source:** [PUT Command — Staging Files](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Snowflake recommends using files that are 100 MB to 250 MB (or larger) in size, compressed. For best performance with large files, consider splitting them into smaller chunks."

---

## Q85
**Answer: B**

**Explanation:** The Snowflake Model Registry provides centralized versioning, metadata management, and a consistent API for model retrieval and inference — eliminating the manual overhead of tracking model files, versions, and lineage on stages. It does not provide automatic hyperparameter tuning (A), which is a training-phase activity. It does not inherently execute models faster (C) than stage-based UDFs. Encryption (D) is handled at the platform level for both stages and the registry.

**Source:** [Snowflake Model Registry Overview](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry allows you to securely manage models and their metadata in Snowflake, regardless of origin. It provides model versioning, and makes it easy to discover and use models for inference."

---

## Q86
**Answer: B**

**Explanation:** Since the latency bottleneck is at the external SageMaker endpoint, the most effective approach is to optimize the SageMaker endpoint itself — choosing a more performant instance type and enabling auto-scaling to handle load efficiently. Increasing the Snowflake warehouse size (A) does not affect the latency of the external endpoint call. Switching to a stored procedure (C) does not solve the external call latency. Using a stream to batch predictions (D) helps throughput but not individual prediction latency.

**Source:** [External Functions — Best Practices](https://docs.snowflake.com/en/sql-reference/external-functions-best-practices)

**Quote:** "The latency of an external function call is largely determined by the performance of the remote service. Optimizing the remote service's compute resources and scaling configuration is the most effective way to reduce latency."

---

## Q87
**Answer: A, C**

**Explanation:** Python UDFs are limited to packages available in the Snowflake Anaconda channel, so models requiring custom system-level dependencies (A) may necessitate Snowpark Container Services. GPU compute (C) is only available through SPCS with GPU-enabled compute pools; Python UDFs run on CPU-only warehouse nodes. Whether results are scalar or tabular (B) can be handled by both approaches using UDFs vs UDTFs. The training language (D) and Snowflake edition (E) are not primary deciding factors between these deployment methods.

**Source:** [Snowpark Container Services Overview](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services enables you to run custom containers with full control over dependencies and hardware, including GPU-enabled compute pools for workloads that require accelerated computing."

---

## Q88
**Answer: C**

**Explanation:** Models logged to the Snowflake Model Registry can be invoked using the model version's run method in Snowpark Python or called directly in SQL, providing a seamless interface for inference. The registry does not automatically create separate SQL functions (A). Users do not need to manually wrap the registry model in a UDF (B). Models are not restricted to Python stored procedures only (D) — they can be called from SQL queries directly.

**Source:** [Snowflake Model Registry — Inference](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview#calling-models)

**Quote:** "You can call model methods in SQL using the model's fully qualified name and version, or use the run method in Snowpark Python to invoke a model version for inference."

---

## Q89
**Answer: B**

**Explanation:** When ranking is the most important criterion, AUC (Area Under the ROC Curve) is the key metric because it measures the model's ability to correctly rank positive instances higher than negative ones across all thresholds. The retrained model has AUC=0.93 vs. 0.91, indicating superior ranking ability. While accuracy decreased slightly (A), accuracy is sensitive to the threshold chosen and does not directly measure ranking quality. Higher recall (C) from the original model matters for catching positives but does not address overall ranking. Discarding both models (D) is unjustified.

**Source:** [Classification — Snowflake ML Functions](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "AUC measures the model's ability to discriminate between classes across all classification thresholds, making it particularly useful when ranking performance is important."

---

## Q90
**Answer: B**

**Explanation:** SYSTEM$STREAM_HAS_DATA checks whether the specified stream contains change data (inserts, updates, deletes). When used as a WHEN condition on a Task, it prevents the Task from running unnecessarily when there is no new data — avoiding wasteful retraining cycles. It does not check the model registry for new versions (A), monitor warehouse compute (C), or verify stage artifacts (D).

**Source:** [SYSTEM$STREAM_HAS_DATA](https://docs.snowflake.com/en/sql-reference/functions/system_stream_has_data)

**Quote:** "SYSTEM$STREAM_HAS_DATA returns a Boolean value that indicates whether a specified stream contains change tracking data. Use this function in the WHEN clause of a task to prevent unnecessary execution."

---

## Q91
**Answer: A, C**

**Explanation:** A significant decrease in performance metrics (A) directly indicates the model is producing worse predictions and needs retraining. A measurable shift in input feature distributions (C) — known as covariate drift — means the model is being asked to make predictions on data different from what it was trained on, which typically degrades performance. Increased warehouse credit consumption (B) relates to cost, not model quality. A change in output columns (D) is a schema issue, not a model quality indicator. More users querying the model (E) reflects adoption, not model degradation.

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Monitor for performance degradation by tracking key metrics over time, and detect data drift by comparing the distributions of incoming features against the training data distribution."

---

## Q92
**Answer: B**

**Explanation:** A deep learning model requiring PyTorch with CUDA support necessitates GPU hardware, which is only available through Snowpark Container Services with GPU-enabled compute pools. A Python UDF (A) cannot access GPU hardware as Snowflake warehouses do not provide CUDA-capable GPUs. An external function (C) is possible but introduces latency and external infrastructure management. A Java UDF (D) is not suitable for PyTorch-based deep learning workloads.

**Source:** [Snowpark Container Services — GPU Support](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services supports GPU-enabled compute pools, allowing you to deploy workloads that require GPU acceleration, such as deep learning inference."

---

## Q93
**Answer: B**

**Explanation:** When using `log_model()` in the Snowflake Model Registry, the `signatures` parameter specifies the input and output schema of the model, defining what features the model expects and what it returns. `schema` (A) is not the correct parameter name for this purpose. `input_spec` (C) and `model_spec` (D) are not valid parameters of the `log_model()` function.

**Source:** [Snowflake Model Registry — log_model](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview#logging-a-model)

**Quote:** "The signatures parameter in log_model specifies the input and output signatures of the model, defining the expected feature names and types for inference."

---

## Q94
**Answer: B**

**Explanation:** Model monitoring is an ongoing process that tracks a deployed model's performance in production over time, detecting issues like drift or degradation. Model validation is a pre-deployment activity that assesses whether a model meets performance criteria before being put into production. Monitoring is not done during training (A). Monitoring uses production data, not training data (C). The terms are distinct concepts with different purposes (D).

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Model monitoring enables you to track the ongoing performance of your models in production, while model validation evaluates model quality before deployment to ensure it meets the required standards."

---

## Q95
**Answer: B**

**Explanation:** When ground truth labels are unavailable, you cannot compute supervised metrics like accuracy (A) or AUC (C — which also requires ground truth). However, you can monitor input feature distributions for drift by comparing recent prediction inputs against the training data distribution. Significant drift indicates the model may no longer be reliable. Waiting for ground truth (D) is overly passive and misses an opportunity for early detection of potential issues.

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "When ground truth labels are not yet available, monitoring input feature distributions for drift provides an early signal of potential model degradation."

---

## Q96
**Answer: A, C**

**Explanation:** The Snowflake Model Registry supports multiple named versions per model (A), allowing teams to maintain and compare different iterations. A default version can be set (C) so that inference calls without an explicit version use the designated default. Logging a new version does not overwrite the previous one (B) — versions coexist. Versions are stored within the same model object, not in separate databases (D). Version names can be user-defined strings, not restricted to auto-incrementing integers (E).

**Source:** [Snowflake Model Registry — Model Versions](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview#model-versions)

**Quote:** "Each model can have multiple versions identified by version names. You can set a default version that is used when no specific version is specified during inference."

---

## Q97
**Answer: B**

**Explanation:** A vectorized Python UDF receives input as pandas DataFrames (or Series) and returns pandas output, enabling efficient batch processing. This is ideal for ML models that benefit from pandas operations and batch inference. A scalar UDF (A) processes one row at a time, which is less efficient for ML inference. A UDTF (C) is for returning tables, not specifically for batch processing optimization. JavaScript UDFs (D) lack the pandas ecosystem entirely.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs allow you to define Python functions that receive batches of input rows as pandas DataFrames or pandas Series, enabling efficient batch operations."

---

## Q98
**Answer: B**

**Explanation:** A consistent 30-minute optimistic bias indicates systematic prediction error. Computing residual statistics (predicted minus actual) on a regular basis and alerting when a systematic bias is detected will catch this pattern. Tracking the average prediction value (A) alone does not reveal bias without comparison to actuals. Monitoring UDF call counts (C) measures usage, not prediction quality. Checking the model file (D) detects tampering but not performance issues.

**Source:** [Snowflake ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/model-monitor)

**Quote:** "Tracking residuals — the difference between predicted and actual values — helps detect systematic bias in model predictions over time."

---

## Q99
**Answer: C**

**Explanation:** When an external function is called in Snowflake, the data is sent to the remote service in JSON format with batched rows. Each batch contains an array of row data serialized as JSON. The data is not sent as CSV (A), Parquet (B), or Protobuf (D). This JSON batching approach allows efficient communication while maintaining compatibility with REST-based proxy services like API Gateway.

**Source:** [External Functions — Data Format](https://docs.snowflake.com/en/sql-reference/external-functions-data-format)

**Quote:** "Snowflake sends data to the remote service in JSON format. Each request contains a batch of rows, with each row represented as an array within the top-level data array."

---

## Q100
**Answer: A, B**

**Explanation:** Caching the model at the module level (A) ensures the model is loaded once per Python sandbox and reused across batches, avoiding the expensive overhead of reloading from stage for each invocation. Using a vectorized UDF (B) processes rows in batches via pandas, which is significantly more efficient than processing one row at a time. A smaller warehouse (C) would reduce parallelism and likely increase latency. Storing the model in a table (D) does not improve loading performance compared to stages. Removing the PACKAGES clause (E) would break the UDF if it depends on those packages.

**Source:** [Python UDF Best Practices](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-designing)

**Quote:** "To reduce overhead, load the model at the module level rather than inside the handler function. This ensures the model is loaded once and reused across invocations within the same Python sandbox."

---

## Q101
**Answer: C**

**Explanation:** The Model Registry is designed to manage multiple versions of a model, allowing each jurisdiction's pipeline to reference a specific version. This provides centralized governance, versioning, and auditability. Option A (separate UDFs) creates maintenance overhead and lacks centralized version management. Option B (runtime parameter) conflates different model artifacts into a single deployment, making governance harder. Option D (ensemble) combines models rather than serving them independently per jurisdiction.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry allows you to manage multiple versions of a model, making it easy to track, compare, and deploy specific versions for different use cases."

---

## Q102
**Answer: A**

**Explanation:** High recall means the model identifies most actual positive instances (low false negatives), while low precision means many of its positive predictions are incorrect (high false positives). Option B describes the inverse — high precision, low recall. Option C is incorrect because accuracy is a separate metric that doesn't directly follow from this precision-recall combination. Option D describes balanced performance across classes, which is unrelated.

**Source:** [Snowflake ML Classification Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "Recall measures the proportion of actual positives that are correctly identified, while precision measures the proportion of positive predictions that are actually correct."

---

## Q103
**Answer: D**

**Explanation:** Snowflake supports both CREATE MODEL and CREATE OR REPLACE MODEL SQL commands for creating model objects in the Model Registry. CREATE MODEL creates a new model object, while CREATE OR REPLACE MODEL will replace an existing model if one already exists with the same name. Option C (REGISTER MODEL) is not a valid Snowflake SQL command — registration is done through the Python API or CREATE MODEL SQL.

**Source:** [CREATE MODEL SQL Reference](https://docs.snowflake.com/en/sql-reference/sql/create-model)

**Quote:** "Creates a new model or replaces an existing model. A model is a schema-level object in Snowflake that encapsulates a machine learning model artifact."

---

## Q104
**Answer: A**

**Explanation:** A scheduled task running a stored procedure gives full control to compute arbitrary distribution statistics (histograms, quantiles, PSI, KL-divergence) and persist them to a monitoring table for dashboarding. Option B (materialized view) cannot perform the complex statistical computations needed for distribution comparison. Option C (stream) captures data changes but doesn't compute statistics. Option D (external function) introduces unnecessary external dependency when all computation can stay within Snowflake.

**Source:** [Snowflake Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can execute a single SQL statement, a call to a stored procedure, or procedural logic using Snowflake Scripting, on a recurring schedule."

---

## Q105
**Answer: A, D**

**Explanation:** Streams track DML changes (inserts, updates, deletes) on tables, making them ideal for detecting new data arrivals for scoring (A) and serving as trigger conditions for Tasks that execute retraining pipelines via SYSTEM$STREAM_HAS_DATA (D). Option B is partially plausible but streams themselves don't trigger retraining — they work with Tasks. Option C is incorrect because streams don't monitor inference latency. Option E is incorrect because streams have no relation to compressing artifacts.

**Source:** [Snowflake Streams](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A stream records data manipulation language changes made to a table, including inserts, updates, and deletes. A task can be defined with a WHEN clause that uses SYSTEM$STREAM_HAS_DATA to check whether a stream contains change data."

---

## Q106
**Answer: B**

**Explanation:** The IMPORTS clause in a Python UDF specifies stage file paths of additional files (such as serialized model artifacts, configuration files, or helper modules) that should be available to the UDF at runtime. Option A is incorrect — Python packages are specified using the PACKAGES clause, not IMPORTS. Option C is incorrect because input tables are not specified in IMPORTS. Option D is incorrect because external API access is controlled by EXTERNAL ACCESS INTEGRATION, not IMPORTS.

**Source:** [Python UDF IMPORTS Clause](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-creating#importing-files-from-a-stage)

**Quote:** "Use the IMPORTS clause to specify files from a stage that the UDF needs at runtime, such as pre-trained model files or other data files."

---

## Q107
**Answer: B**

**Explanation:** A significant shift in cluster membership distribution (30% to 5%) is a classic indicator of data drift — the underlying customer population characteristics have changed since the model was trained. Option A is unlikely because a bug would typically produce consistent errors, not a gradual shift in one cluster. Option C is incorrect because cluster models don't randomly assign labels. Option D is incorrect because memory issues would cause errors or failures, not distribution shifts.

**Source:** [Snowpark ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Data drift occurs when the statistical properties of the input data change over time, causing model predictions to become less reliable compared to the original training conditions."

---

## Q108
**Answer: B**

**Explanation:** Model validation's primary purpose is to verify that a model meets acceptable performance thresholds on held-out data before being promoted to production. This is a quality gate in the deployment lifecycle. Option A describes artifact integrity checking, which is a separate concern. Option C describes code compilation, which is a prerequisite but not the purpose of model validation. Option D is irrelevant — storage capacity is an infrastructure concern, not a validation concern.

**Source:** [Snowflake Model Registry Model Versions](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Before deploying a model to production, validate its performance on held-out data to ensure it meets the required accuracy and reliability standards."

---

## Q109
**Answer: A, C**

**Explanation:** For model governance, tracking the training dataset identifier (A) ensures reproducibility and lineage, while tracking performance metrics on a validation set (C) ensures quality accountability. Option B (dashboard color theme) is cosmetic and irrelevant to governance. Option D (warehouse name) is operational infrastructure detail, not a governance attribute. Option E (other users' queries) is unrelated to the model itself.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Model Registry captures metadata including training dataset references and performance metrics, enabling governance and auditability across model versions."

---

## Q110
**Answer: B**

**Explanation:** Snowpark Container Services (SPCS) with a GPU compute pool is the only option that supports GPU processing and custom Docker images with arbitrary libraries like OpenCV for image processing. Option A is incorrect because Python UDFs run in a sandboxed environment that does not provide GPU access. Option C could work but introduces external dependency and data egress concerns. Option D is incorrect because vectorized UDFs also lack GPU support.

**Source:** [Snowpark Container Services GPU Support](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview)

**Quote:** "Snowpark Container Services lets you deploy, manage, and scale containerized applications directly within Snowflake, with support for GPU-enabled compute pools for workloads such as deep learning inference."

---

## Q111
**Answer: B**

**Explanation:** A model in the Snowflake Model Registry is a schema-level object — a first-class database object that lives within a database and schema, similar to tables, views, and stages. It supports access control via RBAC. Option A is incorrect because models are not tables. Option C is incorrect because models are not views. Option D is incorrect because models are not stages, though they do use internal stages for artifact storage.

**Source:** [Snowflake Model Registry Overview](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "A model is a schema-level object in Snowflake. Like other schema-level objects, models are governed by Snowflake's role-based access control."

---

## Q112
**Answer: B**

**Explanation:** An external function is preferable when the organization maintains a centralized ML serving platform outside Snowflake (e.g., SageMaker, Vertex AI) that serves as the system of record for model serving. This avoids duplicating the model and keeps the external platform as the single source of truth. Option A favors internal UDFs. Option C favors Python UDFs since basic libraries are readily available. Option D explicitly requires keeping processing within Snowflake, ruling out external functions.

**Source:** [External Functions Overview](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "External functions allow you to call external APIs and services from within Snowflake SQL, enabling integration with ML serving platforms and other external systems."

---

## Q113
**Answer: A**

**Explanation:** A Task with a CRON schedule calling a stored procedure can orchestrate the entire lifecycle — data ingestion, retraining, evaluation, registry logging, and production scoring — as a single coordinated pipeline. Option B is incorrect because dynamic tables perform declarative transformations but cannot execute model training or registry operations. Option C is incorrect because materialized views cannot run procedural logic. Option D is incorrect because streams alone don't orchestrate multi-step pipelines.

**Source:** [Snowflake Tasks and Stored Procedures](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "Tasks support CRON expressions for flexible scheduling, and can call stored procedures that contain complex procedural logic including multi-step ML pipelines."

---

## Q114
**Answer: A, C**

**Explanation:** Python UDFs (A) and Java UDFs (C) are both valid for model deployment in Snowflake, as both languages support loading serialized model artifacts and running inference logic. Option B (SQL UDFs) lack the capability to load serialized model files or use ML libraries. Option D (Lua UDFs) are not supported in Snowflake. Option E (R UDFs) are not natively supported as UDFs in Snowflake.

**Source:** [Snowflake UDF Overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "Snowflake supports user-defined functions written in Python, Java, JavaScript, and Scala, allowing developers to extend SQL with custom logic including machine learning inference."

---

## Q115
**Answer: B**

**Explanation:** The Model Registry's `run` method automatically handles loading the correct model version, manages versioning, and provides a consistent inference API regardless of the underlying model framework (scikit-learn, XGBoost, PyTorch, etc.). Option A is incorrect because `run` is not inherently faster. Option C is incorrect because inference still requires compute. Option D is incorrect because `run` processes DataFrames with multiple rows.

**Source:** [Model Registry Inference](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "You can call a model's methods, including the run method, to perform inference. The registry handles model loading, versioning, and provides a unified API for invoking model methods regardless of the underlying ML framework."

---

## Q116
**Answer: B**

**Explanation:** When feature distributions haven't changed (no data drift) but model performance has degraded, the likely cause is concept drift — the relationship between features and the target variable has changed. For example, the same credit features may now predict default differently due to economic changes. Option A is incorrect because warehouse size affects performance/speed, not model accuracy. Options C and D are incorrect because the model artifact was verified as unchanged.

**Source:** [Snowpark ML Model Monitoring](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Concept drift occurs when the statistical relationship between input features and the target variable changes over time, even if the feature distributions themselves remain stable."

---

## Q117
**Answer: B**

**Explanation:** An API INTEGRATION defines the trust relationship, allowed endpoints, and authentication configuration (e.g., IAM role for AWS API Gateway) required when creating external functions. Option A (NETWORK POLICY) controls IP-level access to Snowflake itself, not outbound API calls. Option C (SECURITY INTEGRATION) is used for authentication federation (SSO, OAuth), not external function endpoints. Option D (EXTERNAL ACCESS INTEGRATION) controls outbound access from UDFs/procedures but is different from API Integration used specifically for external functions.

**Source:** [CREATE API INTEGRATION](https://docs.snowflake.com/en/sql-reference/sql/create-api-integration)

**Quote:** "An API integration object stores information about an HTTPS proxy service, including the allowed endpoints, which is used when creating external functions."

---

## Q118
**Answer: A, C**

**Explanation:** Vectorized Python UDFs receive input as pandas Series or DataFrames (A) and process multiple rows per function call in batches, significantly reducing Python interpreter overhead (C). Option B is incorrect — vectorized UDFs can return any supported type, not just numeric. Option D is incorrect — vectorized UDFs support IMPORTS from stages just like scalar UDFs. Option E is incorrect — both types are written in Python.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as pandas DataFrames or pandas Series, enabling more efficient execution by reducing the overhead of per-row function calls."

---

## Q119
**Answer: B**

**Explanation:** A shadow deployment runs a candidate model alongside the production model on the same data without affecting production outputs. Creating a second UDF and using a scheduled task to score the same data with both models, storing results separately for comparison, achieves this cleanly. Option A replaces production and introduces risk. Option C doesn't enable side-by-side comparison on the same data. Option D uses streams incorrectly — streams track changes, not duplicate data for parallel scoring.

**Source:** [Snowflake Model Deployment Patterns](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Shadow deployments allow teams to evaluate candidate models against production traffic by scoring the same input data with both models and comparing results before switching over."

---

## Q120
**Answer: B**

**Explanation:** The F1 Score is the harmonic mean of precision and recall, specifically designed to capture the trade-off between these two metrics in a single value. Option A (accuracy) measures overall correctness but doesn't specifically address the precision-recall trade-off. Option C (RMSE) is a regression metric measuring prediction error magnitude. Option D (R-squared) is a regression metric measuring explained variance.

**Source:** [Snowpark ML Classification Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "The F1 score is the harmonic mean of precision and recall, providing a single metric that balances both concerns. It reaches its best value at 1 and worst at 0."

---

## Q121
**Answer: C**

**Explanation:** The Model Registry API provides methods to set metrics directly on a model version object, keeping metrics tightly coupled with the model version for governance and comparison. Option A requires manual cross-referencing and lacks integration. Option B stores metrics as comments which are not queryable or programmatically accessible. Option D embeds metrics in the artifact, which is non-standard and not accessible through the registry API.

**Source:** [Model Registry Metrics](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "You can set metrics on a model version using the set_metric method, which stores key-value metric pairs such as RMSE or accuracy directly on the model version object for tracking and comparison."

---

## Q122
**Answer: A, B**

**Explanation:** Setting AUTO_COMPRESS=FALSE for binary model files (A) is important because automatic compression can corrupt serialized model artifacts (e.g., pickle, joblib files). Ensuring the target stage exists (B) is required because PUT will fail if the stage doesn't exist. Option C is incorrect — PUT supports files much larger than 10 MB. Option D is incorrect — PUT can be executed by any role with appropriate stage privileges. Option E is incorrect — PUT uploads files but does not create registry entries.

**Source:** [PUT Command](https://docs.snowflake.com/en/sql-reference/sql/put)

**Quote:** "Uploads (stages) files from a local directory or path on a client machine to a named internal stage. Set AUTO_COMPRESS to FALSE when uploading pre-compressed or binary files to prevent corruption."

---

## Q123
**Answer: B**

**Explanation:** The chi-squared test assesses whether the observed frequency distribution of categories in production data differs significantly from the expected distribution observed during training. It is specifically designed for categorical data. Option A (mean shift) applies to continuous features, not categorical. Option C (correlation change) involves pairs of continuous features. Option D (variance change) also applies to continuous features.

**Source:** [Data Drift Detection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/metrics)

**Quote:** "For categorical features, the chi-squared test evaluates whether the observed frequency distribution of categories differs significantly from the expected distribution, indicating potential data drift."

---

## Q124
**Answer: B**

**Explanation:** The endpoint configuration in the service specification YAML defines the network endpoints (ports and protocols) that the containerized service exposes for receiving requests. Option A (COMPUTE POOL) specifies compute resources, not network endpoints. Option C (NETWORK POLICY) controls IP-based access restrictions to Snowflake, not service endpoints. Option D (API INTEGRATION) is used for external functions, not SPCS services.

**Source:** [Snowpark Container Services Specification](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/specification-reference)

**Quote:** "The endpoints section of the service specification defines the network ports that the service exposes. Each endpoint has a name and port, and optionally a protocol, which allows the service to receive requests."

---

## Q125
**Answer: A**

**Explanation:** When a model is logged to the Snowflake Model Registry, the model artifacts are stored in a Snowflake-managed internal stage associated with the model object. This keeps artifacts within Snowflake's governance and storage layer. Option B is incorrect because artifacts are uploaded from the local filesystem but stored in Snowflake. Option C is incorrect because Snowflake uses its own managed storage, not a shared external bucket. Option D is incorrect because INFORMATION_SCHEMA stores metadata about objects, not binary artifacts.

**Source:** [Snowflake Model Registry Storage](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "When you log a model, the model artifacts are stored in a Snowflake-managed internal stage associated with the model object, benefiting from Snowflake's built-in encryption, access control, and storage management."
