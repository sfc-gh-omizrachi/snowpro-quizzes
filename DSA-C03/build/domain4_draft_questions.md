# Domain 4: Model Deployment

---

## Q1 (Single Answer)
What is the primary advantage of using a vectorized Python UDF over a scalar Python UDF when deploying a machine learning model for batch inference in Snowflake?
- A) Vectorized UDFs support more Python libraries than scalar UDFs
- B) Vectorized UDFs operate on batches of rows as pandas DataFrames, reducing serialization overhead
- C) Vectorized UDFs can be called from external applications while scalar UDFs cannot
- D) Vectorized UDFs automatically persist predictions to a table

---

## Q2 (Scenario)
A data scientist at a retail company has trained an XGBoost model in a Jupyter notebook and needs to deploy it for real-time scoring inside Snowflake. The model must process individual customer records as they arrive. Which deployment approach is most appropriate?
- A) Create a vectorized Python UDF that loads the model from a stage and scores each batch
- B) Create a scalar Python UDF that loads the model from a stage and scores each row
- C) Use an external function to call an AWS Lambda endpoint hosting the model
- D) Store the model in the Snowflake Model Registry and call it via a SQL function

---

## Q3 (Multi Answer - Select 2)
Which TWO are valid methods to make a serialized machine learning model artifact available to a Python UDF in Snowflake? (Select 2)
- A) Upload the model file to an internal stage using the PUT command and reference it via IMPORTS
- B) Embed the serialized model bytes directly in the UDF source code as a string literal
- C) Store the model in the Snowflake Model Registry and reference it in the UDF's IMPORTS clause
- D) Upload the model file to a stage and reference it in the UDF definition's IMPORTS clause
- E) Pass the model object as a parameter to the UDF at query time

---

## Q4 (Single Answer)
When creating a Python UDF in Snowflake to serve a scikit-learn model, which clause specifies the Python packages required by the UDF?
- A) REQUIREMENTS
- B) PACKAGES
- C) DEPENDENCIES
- D) LIBRARIES

---

## Q5 (Scenario)
A machine learning engineer needs to deploy a TensorFlow model that requires GPU acceleration and a custom Docker container for inference. The model is too complex for a standard Python UDF. Which Snowflake service should they use?
- A) External functions connected to an AWS SageMaker endpoint
- B) Snowpark Container Services
- C) A vectorized Python UDF with a large warehouse
- D) A Java UDF with TensorFlow Java bindings

---

## Q6 (Single Answer)
What is the correct SQL syntax to upload a local model file to a Snowflake internal stage?
- A) UPLOAD FILE 'model.pkl' TO @my_stage;
- B) PUT file://model.pkl @my_stage AUTO_COMPRESS=FALSE;
- C) COPY INTO @my_stage FROM 'model.pkl';
- D) INSERT INTO STAGE @my_stage VALUES ('model.pkl');

---

## Q7 (Scenario)
A data scientist has deployed a classification model in Snowflake as a Python UDF. After three months, the model's precision has dropped significantly while recall remains stable. What is the most likely explanation?
- A) The model is experiencing underfitting due to insufficient training data
- B) The distribution of incoming data has shifted, causing more false positives
- C) The UDF is running out of memory and truncating predictions
- D) The model registry has corrupted the model artifact

---

## Q8 (Single Answer)
In the Snowflake Model Registry, what does the `log_model()` function do?
- A) Records inference latency metrics for a deployed model
- B) Saves a trained model object along with metadata to the registry
- C) Creates an audit log entry for model access
- D) Writes model training logs to an event table

---

## Q9 (Multi Answer - Select 2)
Which TWO metrics are most appropriate for evaluating a binary classification model deployed in Snowflake? (Select 2)
- A) Root Mean Squared Error (RMSE)
- B) Area Under the ROC Curve (AUC)
- C) Mean Absolute Percentage Error (MAPE)
- D) F1 Score
- E) R-squared (R²)

---

## Q10 (Scenario)
A fraud detection team has deployed a model that flags suspicious transactions. They notice the model's recall has decreased from 95% to 78% over six months. What should they investigate first?
- A) Whether the warehouse size needs to be increased for faster scoring
- B) Whether the distribution of transaction features has drifted from the training data
- C) Whether the Python UDF has a memory leak
- D) Whether the stage containing the model artifact has been accidentally dropped

---

## Q11 (Single Answer)
What does model decay refer to in the context of deployed machine learning models?
- A) The gradual corruption of model artifacts stored on a stage
- B) The degradation of model performance over time as real-world data distributions change
- C) The increasing latency of model inference as data volume grows
- D) The loss of model metadata when a registry entry is updated

---

## Q12 (Single Answer)
Which Snowflake object is used to schedule automated model retraining on a recurring basis?
- A) STREAM
- B) TASK
- C) PIPE
- D) SEQUENCE

---

## Q13 (Scenario)
A data scientist wants to deploy a model that was trained using a proprietary C++ library not available in the Snowflake Anaconda channel. The model must be served within Snowflake. What is the best approach?
- A) Rewrite the model using only Python libraries available in the Anaconda channel
- B) Deploy the model using Snowpark Container Services with a custom Docker image
- C) Use a Java UDF with JNI bindings to the C++ library
- D) Upload the C++ library to a stage and reference it in a Python UDF

---

## Q14 (Single Answer)
When using the Snowflake Model Registry, which method retrieves a previously logged model for inference?
- A) get_model()
- B) load_model()
- C) retrieve_model()
- D) Registry.get_model() from the registry object

---

## Q15 (Multi Answer - Select 2)
Which TWO types of data drift can cause a deployed model's performance to degrade? (Select 2)
- A) Covariate drift, where the distribution of input features changes
- B) Schema drift, where column names in the source table are renamed
- C) Concept drift, where the relationship between features and target variable changes
- D) Stage drift, where model artifacts are moved between stages
- E) Registry drift, where model versions become incompatible

---

## Q16 (Scenario)
A healthcare analytics team needs to call a model hosted on a third-party REST API from within Snowflake SQL queries. The API is deployed on Azure and requires authentication. Which Snowflake feature should they use?
- A) A Python UDF that uses the requests library
- B) An external function backed by an API integration
- C) A Snowpark Container Services endpoint
- D) A JavaScript UDF with fetch API calls

---

## Q17 (Single Answer)
What is the purpose of the AUTO_COMPRESS parameter when using PUT to upload a model artifact to a Snowflake stage?
- A) It determines whether the model is automatically compiled for faster inference
- B) It controls whether the file is automatically compressed using gzip during upload
- C) It enables automatic model versioning on the stage
- D) It specifies whether the file should be encrypted at rest

---

## Q18 (Single Answer)
Which metric is most appropriate for evaluating a regression model that predicts house prices in Snowflake?
- A) AUC (Area Under the Curve)
- B) Precision
- C) RMSE (Root Mean Squared Error)
- D) F1 Score

---

## Q19 (Scenario)
A data engineer has set up a Snowflake Task to retrain a model weekly. The task calls a stored procedure that reads new data, trains a model, and logs it to the Model Registry. The engineer wants the task to run only when new data has arrived. What should they add?
- A) A CRON expression that checks for data arrival
- B) A stream on the source table as a trigger condition using SYSTEM$STREAM_HAS_DATA
- C) A notification integration that monitors the source table
- D) A resource monitor that tracks data ingestion

---

## Q20 (Multi Answer - Select 2)
Which TWO statements about Snowflake external functions are correct? (Select 2)
- A) External functions execute code within the Snowflake compute layer
- B) External functions can call REST API endpoints hosted outside Snowflake
- C) External functions require an API integration object for authentication
- D) External functions can only return scalar values, not tabular results
- E) External functions support only synchronous invocation patterns

---

## Q21 (Single Answer)
In Snowflake, what is the key difference between a scalar Python UDF and a vectorized Python UDF in terms of input handling?
- A) Scalar UDFs accept only numeric inputs while vectorized UDFs accept any data type
- B) Scalar UDFs process one row at a time while vectorized UDFs receive batches as pandas Series or DataFrames
- C) Scalar UDFs run in a single thread while vectorized UDFs run in parallel across multiple threads
- D) Scalar UDFs are written in Python 3 while vectorized UDFs use Python 2

---

## Q22 (Scenario)
A telecommunications company has deployed a churn prediction model in Snowflake. The model's accuracy was 92% at deployment but has dropped to 81% after four months. A comparison of the current input data distribution with the training data distribution shows significant divergence in the "monthly_usage" feature. What is the recommended action?
- A) Increase the warehouse size to improve model inference speed
- B) Retrain the model using recent data that reflects the current distribution
- C) Switch from a Python UDF to an external function
- D) Add more features to the existing model without retraining

---

## Q23 (Single Answer)
When logging a model to the Snowflake Model Registry, what information can be stored alongside the model artifact?
- A) Only the model binary and its name
- B) The model binary, version, metrics, and metadata tags
- C) Only the model binary and the training SQL query
- D) The model binary and a single description string

---

## Q24 (Single Answer)
Which Python decorator is used to define a vectorized Python UDF in Snowflake when using Snowpark?
- A) @udf(input=pd.DataFrame)
- B) @vectorized(input=pd.DataFrame)
- C) @pandas_udf
- D) @udf with the packages parameter set to include pandas

---

## Q25 (Scenario)
A data scientist needs to deploy an ensemble model that consists of three separate sub-models, each stored as a separate pickle file. The final prediction combines outputs from all three. How should they structure the deployment in Snowflake?
- A) Create three separate Python UDFs (one per sub-model) and combine them in a SQL query
- B) Create a single Python UDF that imports all three model files from a stage and combines predictions internally
- C) Deploy each sub-model as an external function and orchestrate them with a stored procedure
- D) Store each model in a separate schema and use cross-schema joins

---

## Q26 (Multi Answer - Select 2)
Which TWO are valid approaches for storing model predictions in Snowflake after batch inference? (Select 2)
- A) Use CREATE TABLE AS SELECT with the UDF applied to the input table
- B) Use INSERT INTO ... SELECT with the UDF applied to new records
- C) Write predictions directly from the UDF to an external S3 bucket
- D) Use ALTER TABLE to add a predictions column populated by the UDF
- E) Store predictions as unstructured data in a stage

---

## Q27 (Single Answer)
What is the primary purpose of metadata tagging in the context of model lifecycle management in Snowflake?
- A) To improve model inference performance through query optimization
- B) To track model attributes such as version, author, training date, and performance metrics
- C) To encrypt model artifacts stored in the registry
- D) To restrict access to model objects via role-based access control

---

## Q28 (Scenario)
A machine learning engineer deploys a model as a vectorized Python UDF. During testing, the UDF fails with an out-of-memory error on large datasets. The warehouse is already XL size. What is the most effective solution?
- A) Switch to a scalar Python UDF to reduce memory per invocation
- B) Partition the input data into smaller batches using a windowing approach
- C) Increase the warehouse to a 4XL size
- D) Rewrite the model in Java to use less memory

---

## Q29 (Single Answer)
Which SQL command is used to download a model artifact from a Snowflake stage to the local filesystem?
- A) DOWNLOAD @my_stage/model.pkl;
- B) GET @my_stage/model.pkl file://./local_dir/;
- C) COPY FROM @my_stage/model.pkl TO './local_dir/';
- D) EXPORT @my_stage/model.pkl TO LOCAL './local_dir/';

---

## Q30 (Multi Answer - Select 2)
Which TWO features of Snowpark Container Services make it suitable for deploying complex ML models? (Select 2)
- A) Support for custom Docker containers with arbitrary dependencies
- B) Automatic model hyperparameter tuning during deployment
- C) GPU compute availability for deep learning inference
- D) Built-in A/B testing framework for model comparison
- E) Automatic conversion of Python models to SQL functions

---

## Q31 (Scenario)
A financial services company must ensure that their deployed credit scoring model produces the same predictions for the same input data after redeployment. Which validation approach should they use?
- A) Compare the model's AUC on a holdout set before and after deployment
- B) Run the model on a fixed reference dataset and verify that predictions are identical
- C) Check that the model artifact file size is the same in both deployments
- D) Verify that the model version number in the registry has not changed

---

## Q32 (Single Answer)
What is the purpose of the HANDLER clause when creating a Python UDF in Snowflake?
- A) It specifies the error handling behavior of the UDF
- B) It names the Python function to be invoked when the UDF is called
- C) It defines the HTTP endpoint for external function routing
- D) It sets the maximum number of concurrent UDF executions

---

## Q33 (Single Answer)
In the context of model evaluation, what does precision measure?
- A) The proportion of actual positives that the model correctly identifies
- B) The proportion of predicted positives that are actually positive
- C) The overall percentage of correct predictions
- D) The average squared difference between predicted and actual values

---

## Q34 (Scenario)
A data science team uses Snowflake's Model Registry to manage multiple versions of a demand forecasting model. The latest version (v3) has worse performance than v2 on recent data. How should they handle this in the registry?
- A) Delete version v3 from the registry and retrain from scratch
- B) Set the default version back to v2 so that inference calls use the better-performing version
- C) Archive both versions and deploy the model as an external function instead
- D) Rename v2 to v3 to overwrite the poor-performing version

---

## Q35 (Multi Answer - Select 2)
Which TWO techniques can be used to detect data drift in a deployed Snowflake model's input features? (Select 2)
- A) Comparing summary statistics (mean, standard deviation) of current and training feature distributions
- B) Monitoring the size of the warehouse used for inference
- C) Using statistical tests such as the Kolmogorov-Smirnov test on feature distributions
- D) Checking the Snowflake query history for UDF execution times
- E) Monitoring the number of NULL values in the model registry

---

## Q36 (Single Answer)
When deploying a model using a Python UDF in Snowflake, how is the model artifact typically loaded into memory?
- A) The model is loaded from a stage file referenced in the IMPORTS clause, typically using the import_directory in the UDF handler
- B) The model is automatically loaded into memory when the UDF is created
- C) The model is streamed from an external cloud storage bucket at query time
- D) The model is compiled into the UDF bytecode during creation

---

## Q37 (Scenario)
An e-commerce company deploys a recommendation model as a Python UDF. They want to store predictions in a table for downstream consumption by the marketing team. Which approach is most efficient for daily batch scoring?
- A) Use a Snowflake Task that executes INSERT INTO predictions_table SELECT user_id, recommend_udf(features) FROM users_table
- B) Export data to an external system, run predictions, and reload results into Snowflake
- C) Create a materialized view that calls the UDF on the source table
- D) Use a stored procedure that loops through each row and calls the UDF individually

---

## Q38 (Single Answer)
Which of the following is NOT a valid reason to use an external function for model deployment instead of a Python UDF?
- A) The model requires hardware (e.g., specialized GPUs) not available in Snowflake warehouses
- B) The model is hosted on a managed ML service like AWS SageMaker
- C) The model needs lower latency by avoiding data transfer outside Snowflake
- D) The organization wants to centralize model serving on an existing ML platform

---

## Q39 (Single Answer)
What does the Area Under the ROC Curve (AUC) metric represent for a binary classification model?
- A) The percentage of correct predictions made by the model
- B) The probability that the model ranks a random positive instance higher than a random negative instance
- C) The average precision across all possible classification thresholds
- D) The trade-off between model complexity and prediction accuracy

---

## Q40 (Scenario)
A data scientist is deploying a natural language processing model that uses a custom tokenizer stored as a separate Python file. They need to include this tokenizer alongside the model in a Snowflake Python UDF. How should they do this?
- A) Upload both the model artifact and the tokenizer Python file to a stage and reference both in the IMPORTS clause
- B) Inline the entire tokenizer code within the UDF handler function
- C) Install the tokenizer as a package using the PACKAGES clause
- D) Store the tokenizer in a Snowflake table as a binary column

---

## Q41 (Multi Answer - Select 2)
Which TWO Snowflake features can be combined to automate model retraining when new data arrives? (Select 2)
- A) Tasks and Streams
- B) Materialized views and dynamic tables
- C) Tasks and Stored Procedures
- D) Resource monitors and alerts
- E) Shares and data exchanges

---

## Q42 (Single Answer)
What is the recommended way to handle model versioning when using the Snowflake Model Registry?
- A) Store each model version as a separate file on a stage with a naming convention
- B) Use the Model Registry's built-in versioning to log each new model version with a version name
- C) Create a separate database schema for each model version
- D) Append a timestamp to the model name in a tracking table

---

## Q43 (Scenario)
A logistics company deploys a route optimization model in Snowflake. The model takes 15 seconds per row to compute due to complex optimization algorithms. Production requires scoring 10 million rows daily. What deployment strategy should they consider?
- A) Use a scalar Python UDF on an XS warehouse and accept the long runtime
- B) Deploy the model on Snowpark Container Services with horizontal scaling
- C) Use an external function backed by a scalable cloud function with parallel invocations
- D) Optimize the Python code within the UDF to reduce per-row time to under 1 second

---

## Q44 (Single Answer)
When creating a Python UDF for model inference, why is it important to load the model in a module-level variable or cached function rather than inside the handler function?
- A) Module-level loading is required by Snowflake syntax and the UDF will not compile otherwise
- B) Loading the model at module level ensures it is loaded once and reused across multiple rows, avoiding repeated deserialization
- C) Module-level variables are automatically encrypted at rest
- D) Loading inside the handler provides better error handling capabilities

---

## Q45 (Scenario)
A data scientist has trained a classification model and observes the following on the validation set: Accuracy = 96%, Precision = 40%, Recall = 90%. The model is for fraud detection where fraudulent transactions are the positive class. What does this indicate?
- A) The model is performing well across all metrics
- B) The model is catching most frauds but also flagging many legitimate transactions as fraudulent
- C) The model is missing most fraudulent transactions
- D) The model needs a larger training dataset to improve accuracy

---

## Q46 (Multi Answer - Select 2)
Which TWO statements correctly describe how Snowflake Model Registry handles model versioning? (Select 2)
- A) Each model version is immutable once logged and cannot be overwritten
- B) Model versions are stored as micro-partitions in a standard Snowflake table
- C) You can set a default version that is used when no version is specified at inference time
- D) Model Registry automatically deletes versions older than 90 days
- E) Only one version per model can exist at any time

---

## Q47 (Single Answer)
In the Snowflake Model Registry, what is the purpose of assigning a default version to a model?
- A) It sets which version is used for all inference calls when no version is explicitly specified
- B) It marks the version as read-only to prevent accidental modification
- C) It triggers automatic retraining when the default version's metrics fall below a threshold
- D) It makes the version available to all roles without additional grants

---

## Q48 (Single Answer)
Which statement best describes how Snowflake handles Python UDF execution environments?
- A) Each UDF execution creates a new Python virtual environment from scratch
- B) Snowflake uses pre-built sandbox environments with packages from the Anaconda channel, reusing environments across UDF calls
- C) Python UDFs run directly on the user's local machine and results are sent to Snowflake
- D) Snowflake compiles Python UDFs into SQL for execution on the warehouse

---

## Q49 (Scenario)
A retail bank needs to comply with model governance regulations that require tracking who deployed each model, when it was deployed, and what training data was used. Which Snowflake feature best supports this requirement?
- A) Query history in ACCOUNT_USAGE views
- B) Model Registry with metadata tags and version tracking
- C) Access history views
- D) Stage file metadata

---

## Q50 (Single Answer)
What is the RMSE metric's relationship to the target variable's units?
- A) RMSE is unitless and ranges from 0 to 1
- B) RMSE is expressed in the same units as the target variable
- C) RMSE is expressed in squared units of the target variable
- D) RMSE is a percentage of the mean target value

---

## Q51 (Multi Answer - Select 2)
Which TWO actions should be taken when data drift is detected in a production model deployed in Snowflake? (Select 2)
- A) Retrain the model using a dataset that includes recent data reflecting current distributions
- B) Immediately drop the Python UDF to prevent further predictions
- C) Investigate which features have drifted and assess the impact on model performance
- D) Increase the warehouse size to compensate for drift
- E) Convert the model from a Python UDF to a JavaScript UDF

---

## Q52 (Scenario)
A data scientist deploys a sentiment analysis model using a Python UDF that imports a large transformer model (~2 GB) from a stage. The UDF times out during execution. What is the most likely cause and solution?
- A) The UDF syntax is incorrect; fix the RETURNS clause
- B) The model file is too large to be loaded within the UDF's initialization time; consider using Snowpark Container Services instead
- C) The stage has insufficient storage; upgrade to a larger stage
- D) The PACKAGES clause is missing the transformers library; add it

---

## Q53 (Single Answer)
Which command shows all models registered in the current schema of the Snowflake Model Registry?
- A) LIST MODELS;
- B) SHOW MODELS;
- C) DESCRIBE MODELS;
- D) SELECT * FROM INFORMATION_SCHEMA.MODELS;

---

## Q54 (Single Answer)
When using the Snowflake Model Registry, what is the difference between a model and a model version?
- A) A model is a single trained artifact; a model version is the registry entry's timestamp
- B) A model is a named registry entry that can contain multiple versions, each representing a distinct trained artifact
- C) A model is metadata only; a model version is the actual artifact stored on a stage
- D) There is no difference; the terms are used interchangeably in Snowflake

---

## Q55 (Scenario)
An insurance company has two models: a gradient boosting model with AUC=0.89 and a logistic regression model with AUC=0.82. The company requires model explainability for regulatory purposes. Both models meet minimum performance thresholds. Which model should they deploy and why?
- A) The gradient boosting model because it has higher AUC
- B) The logistic regression model because it provides better interpretability for regulatory compliance while meeting performance requirements
- C) Both models in an ensemble to maximize AUC
- D) Neither model; they should use Snowflake's built-in classification function instead

---

## Q56 (Multi Answer - Select 2)
Which TWO are advantages of deploying a model inside Snowflake (via UDF or registry) versus an external service? (Select 2)
- A) Data does not need to leave Snowflake, reducing data movement and security risks
- B) Models deployed inside Snowflake are automatically retrained when data changes
- C) Inference can leverage Snowflake's compute scaling and is billed through standard credits
- D) Internal deployment guarantees lower latency than any external deployment
- E) Internal deployment supports all programming languages and frameworks without limitation

---

## Q57 (Single Answer)
What is concept drift in the context of a deployed machine learning model?
- A) A change in the input feature distributions over time
- B) A change in the underlying relationship between input features and the target variable
- C) A change in the schema of the prediction output table
- D) A change in the model artifact format between versions

---

## Q58 (Scenario)
A data science team wants to A/B test two model versions in production. Version A is the current model and Version B is a candidate replacement. Both are logged in the Model Registry. How can they implement this in Snowflake?
- A) Deploy both versions as separate Python UDFs and use a SQL CASE statement to randomly route 50% of records to each
- B) Set both versions as the default version in the registry simultaneously
- C) Deploy one version on a small warehouse and the other on a large warehouse
- D) Use the Model Registry's built-in A/B testing feature

---

## Q59 (Single Answer)
Which method on a Snowflake Model Registry model version object is used to run inference?
- A) model_version.score()
- B) model_version.predict()
- C) model_version.run()
- D) model_version.infer()

---

## Q60 (Scenario)
A data scientist needs to deploy a model that uses the lightgbm package. Before creating the UDF, they want to verify that lightgbm is available in Snowflake's Anaconda channel. How should they check?
- A) Try to create the UDF and see if it fails
- B) Query the INFORMATION_SCHEMA.PACKAGES view to check available packages and versions
- C) Check the Snowflake documentation for a static list of approved packages
- D) Upload the lightgbm wheel file to a stage and reference it in IMPORTS

---

## Q61 (Multi Answer - Select 2)
Which TWO statements about Java UDFs for model deployment in Snowflake are correct? (Select 2)
- A) Java UDFs can load PMML or ONNX model files for inference
- B) Java UDFs cannot access files from stages
- C) Java UDFs may be preferred when the model was trained using a JVM-based framework
- D) Java UDFs always outperform Python UDFs for machine learning inference
- E) Java UDFs require Snowpark Container Services to execute

---

## Q62 (Single Answer)
When comparing data distributions for drift detection, which statistical test is commonly used for continuous numerical features?
- A) Chi-squared test
- B) Kolmogorov-Smirnov test
- C) Fisher's exact test
- D) McNemar's test

---

## Q63 (Scenario)
A data scientist logs a model to the Snowflake Model Registry and wants to add custom metadata indicating the training dataset, hyperparameters used, and the responsible team. How should they accomplish this?
- A) Store metadata in a separate tracking table and join it with registry entries manually
- B) Use the Model Registry's metadata and tag capabilities to attach this information to the model version
- C) Include all metadata as comments in the model's Python source code
- D) Create a README file on the same stage as the model artifact

---

## Q64 (Single Answer)
What is the effect of setting OVERWRITE=TRUE when using the PUT command to upload a model artifact to a stage?
- A) It compresses the file before uploading
- B) It replaces any existing file with the same name on the stage
- C) It creates a new version of the file automatically
- D) It deletes all other files on the stage before uploading

---

## Q65 (Scenario)
A manufacturing company uses sensor data to predict equipment failures. After deploying the model, they notice prediction quality degrades every time a new sensor type is added to the factory floor. What type of drift is this?
- A) Concept drift due to changing failure patterns
- B) Covariate drift due to new feature distributions from the additional sensor type
- C) Label drift due to changing failure definitions
- D) Model drift due to Python version changes

---

## Q66 (Multi Answer - Select 2)
Which TWO model formats are commonly supported for deployment via Snowflake's Model Registry? (Select 2)
- A) Scikit-learn models serialized with joblib or pickle
- B) Models stored as raw SQL text
- C) XGBoost models
- D) Models compiled to WebAssembly
- E) Models stored as CSV lookup tables

---

## Q67 (Single Answer)
In Snowflake, what is the role of an API integration when using external functions?
- A) It defines the compute resources allocated to the external function
- B) It establishes a trust relationship between Snowflake and the external cloud service proxy
- C) It specifies the Python packages required by the external function
- D) It creates a data share between Snowflake and the external service

---

## Q68 (Single Answer)
Which recall value indicates that a model correctly identifies all positive instances?
- A) 0.0
- B) 0.5
- C) 1.0
- D) It depends on the number of classes

---

## Q69 (Scenario)
A data scientist wants to automate the following pipeline in Snowflake: (1) detect new data in a source table, (2) retrain a model using the updated data, (3) log the new model version to the registry, (4) score the new data. Which combination of Snowflake objects best achieves this?
- A) A stream on the source table, a task that runs a stored procedure for retraining and scoring
- B) A materialized view that automatically retrains the model
- C) A dynamic table that computes predictions incrementally
- D) An alert that triggers an external function for retraining

---

## Q70 (Single Answer)
When a vectorized Python UDF is called, how does Snowflake determine the batch size of rows sent to the function?
- A) The batch size is always exactly 1,000 rows
- B) The user specifies the batch size in the UDF definition
- C) Snowflake automatically determines the batch size based on internal optimization
- D) The batch size equals the total number of rows in the query result

---

## Q71 (Multi Answer - Select 2)
Which TWO best practices should be followed when deploying ML models as Python UDFs in Snowflake? (Select 2)
- A) Load the model once at the module level or in a cached initialization function, not inside the handler
- B) Always use scalar UDFs instead of vectorized UDFs for better performance
- C) Pin specific package versions in the PACKAGES clause to ensure reproducibility
- D) Embed training data in the UDF source code for self-contained deployment
- E) Use the largest available warehouse regardless of workload size

---

## Q72 (Scenario)
A data scientist has deployed a model in Snowflake and wants to monitor whether the predictions follow the same distribution as the training labels. They plan to run this check daily. Which approach is most effective?
- A) Compare the distribution of daily predictions against the training label distribution using statistical tests run via a scheduled task
- B) Manually inspect a sample of predictions each day
- C) Set up a resource monitor to track prediction volume
- D) Check if the UDF execution time has changed

---

## Q73 (Single Answer)
What happens to model artifacts stored in the Snowflake Model Registry when a model version is dropped?
- A) The artifacts remain on the underlying stage indefinitely
- B) The artifacts are moved to a fail-safe area for 7 days
- C) The artifacts associated with that version are removed from the registry
- D) The artifacts are automatically exported to an external stage

---

## Q74 (Single Answer)
Which of the following correctly describes the relationship between accuracy and class imbalance?
- A) Accuracy is always the best metric regardless of class distribution
- B) Accuracy can be misleading for imbalanced datasets because a model predicting only the majority class can still achieve high accuracy
- C) Accuracy adjusts automatically for class imbalance
- D) Accuracy is only valid when both classes have equal representation

---

## Q75 (Scenario)
A data scientist has a model that performs well on training data (AUC=0.95) but poorly on production data (AUC=0.72). The feature distributions in production match the training data. What is the most likely issue?
- A) Data drift in the production environment
- B) The model is overfitting to the training data
- C) The production warehouse is too small
- D) The model was logged to the registry incorrectly

---

## Q76 (Multi Answer - Select 2)
Which TWO are valid methods for deploying a pre-built model (e.g., a pre-trained NLP model) in Snowflake? (Select 2)
- A) Upload the model artifact to a stage and serve it via a Python UDF
- B) Use the CREATE MODEL SQL command with a model specification
- C) Deploy the model in a custom Docker container using Snowpark Container Services
- D) Import the model directly into a JavaScript UDF
- E) Store the model in a Snowflake table column and query it directly

---

## Q77 (Single Answer)
What is the purpose of the RUNTIME_VERSION parameter when creating a Python UDF?
- A) It specifies the version of the Snowflake client SDK to use
- B) It sets the Python interpreter version for the UDF execution environment
- C) It defines how long the UDF is allowed to execute before timing out
- D) It sets the version of the UDF itself for tracking purposes

---

## Q78 (Scenario)
A real estate company deploys a price prediction model. After one year, the RMSE increases from $15,000 to $45,000. The feature distributions have not changed significantly. What is the most likely explanation?
- A) Covariate drift in the input features
- B) Concept drift where the relationship between features and prices has changed due to market conditions
- C) The model artifact has become corrupted on the stage
- D) The Python UDF is running on a smaller warehouse

---

## Q79 (Single Answer)
Which Snowflake ML function provides built-in classification capabilities without requiring a custom model deployment?
- A) SNOWFLAKE.ML.CLASSIFY()
- B) SNOWFLAKE.ML.CLASSIFICATION (as a model training function that handles deployment)
- C) SNOWFLAKE.ML.PREDICT()
- D) SNOWFLAKE.ML.AUTO_CLASSIFY()

---

## Q80 (Scenario)
A data scientist needs to ensure their Python UDF-based model deployment is idempotent — running the same input always produces the same output. The model uses random forest, which is deterministic given the same input. However, they notice slight variations in outputs. What should they investigate?
- A) Whether the model file was uploaded with AUTO_COMPRESS=TRUE, which may alter the artifact
- B) Whether the Python UDF handler has any non-deterministic operations such as random sampling or time-dependent logic
- C) Whether the warehouse size affects floating-point precision
- D) Whether the model registry is modifying the model artifact between calls

---

## Q81 (Multi Answer - Select 2)
Which TWO components are required to set up Snowpark Container Services for model deployment? (Select 2)
- A) A compute pool to run the container workloads
- B) A materialized view to cache model results
- C) A service specification (YAML) defining the container image and resources
- D) A JavaScript UDF to interface between SQL and the container
- E) A data share to make the model available across accounts

---

## Q82 (Single Answer)
When evaluating a multi-class classification model, which approach extends binary AUC to the multi-class setting?
- A) Calculate RMSE for each class separately
- B) Use one-vs-rest (OVR) or one-vs-one (OVO) AUC calculations
- C) Convert all classes to binary and compute a single AUC
- D) AUC cannot be used for multi-class classification

---

## Q83 (Scenario)
A data scientist has deployed a model and wants to track its performance over time. They plan to compute accuracy, precision, and recall weekly by comparing predictions against ground truth labels that arrive with a one-week delay. How should they implement this monitoring?
- A) Create a Snowflake Task that runs weekly, joins predictions with delayed ground truth, and inserts metrics into a monitoring table
- B) Create a Python UDF that automatically tracks metrics each time it is called
- C) Use the Model Registry's built-in performance monitoring dashboard
- D) Set up an external monitoring service that queries Snowflake via external functions

---

## Q84 (Single Answer)
What is the maximum size for a single file uploaded to a Snowflake internal stage via the PUT command?
- A) 1 GB
- B) 5 GB
- C) There is no strict file size limit, but performance recommendations apply
- D) 100 MB

---

## Q85 (Single Answer)
Which of the following is a key benefit of using the Snowflake Model Registry over manually managing model files on stages?
- A) The Model Registry provides automatic model hyperparameter tuning
- B) The Model Registry provides centralized versioning, metadata management, and a consistent interface for model retrieval and inference
- C) The Model Registry executes models faster than stage-based UDFs
- D) The Model Registry encrypts models with a different algorithm than stages

---

## Q86 (Scenario)
A data scientist deploys a credit risk model as an external function calling an AWS SageMaker endpoint. They need to reduce the latency of individual predictions. What is the best approach?
- A) Increase the Snowflake warehouse size
- B) Optimize the SageMaker endpoint instance type and enable auto-scaling
- C) Switch from an external function to a stored procedure
- D) Use a stream to batch predictions before sending them

---

## Q87 (Multi Answer - Select 2)
Which TWO factors should be considered when choosing between a Python UDF and Snowpark Container Services for model deployment? (Select 2)
- A) Whether the model requires custom system-level dependencies not available in the Anaconda channel
- B) Whether the model returns scalar or tabular results
- C) Whether the model requires GPU compute or custom hardware
- D) Whether the model was trained using Python or R
- E) Whether the Snowflake account is on the Enterprise edition

---

## Q88 (Single Answer)
In Snowflake, which approach enables a model to be called directly as a SQL function after logging it to the Model Registry?
- A) The Model Registry automatically creates a SQL function for each logged model version
- B) The user must manually create a Python UDF that wraps the registry model
- C) Model versions can be invoked using the model version's run method in Snowpark, or by calling the model directly in SQL
- D) Models in the registry can only be accessed through Python stored procedures

---

## Q89 (Scenario)
A data scientist wants to compare model performance before and after retraining. The original model had: Accuracy=0.88, Precision=0.85, Recall=0.82, AUC=0.91. The retrained model has: Accuracy=0.86, Precision=0.90, Recall=0.80, AUC=0.93. For a use case where ranking is important, which model should be preferred?
- A) The original model because it has higher accuracy
- B) The retrained model because it has higher AUC, indicating better overall ranking ability
- C) The original model because it has higher recall
- D) Neither; both models should be discarded due to the accuracy decrease

---

## Q90 (Single Answer)
What is the purpose of using SYSTEM$STREAM_HAS_DATA in conjunction with a Task for model retraining?
- A) It checks if the model registry has new model versions
- B) It evaluates whether the stream on the source table has new or changed data, preventing unnecessary retraining
- C) It monitors the compute utilization of the warehouse running inference
- D) It verifies that the model artifact on the stage has not been modified

---

## Q91 (Multi Answer - Select 2)
Which TWO are common indicators that a deployed model needs retraining? (Select 2)
- A) A significant decrease in key performance metrics (accuracy, AUC, etc.) over time
- B) An increase in the warehouse credit consumption for UDF execution
- C) A measurable shift in the distribution of input features compared to the training data
- D) A change in the number of columns in the prediction output table
- E) An increase in the number of users querying the model

---

## Q92 (Scenario)
A healthcare company needs to deploy a deep learning model for medical image classification. The model requires PyTorch with CUDA support and processes images stored in a Snowflake stage. Which deployment approach is most appropriate?
- A) A Python UDF with PyTorch specified in the PACKAGES clause
- B) Snowpark Container Services with a GPU-enabled compute pool and a custom Docker image
- C) An external function calling a REST endpoint
- D) A Java UDF with a deep learning framework

---

## Q93 (Single Answer)
When using the Snowflake Model Registry's `log_model()`, which parameter specifies the input/output signature of the model?
- A) schema
- B) signatures
- C) input_spec
- D) model_spec

---

## Q94 (Single Answer)
What is the primary distinction between model monitoring and model validation?
- A) Model monitoring is done during training; validation is done after deployment
- B) Model monitoring tracks ongoing production performance; model validation assesses performance before deployment
- C) Model monitoring uses training data; validation uses production data
- D) There is no distinction; the terms are interchangeable

---

## Q95 (Scenario)
A data scientist deployed a model three months ago and wants to ensure the model is still generating reliable predictions. The ground truth labels are not yet available for the recent data. Which technique can they use to assess model health?
- A) Compute accuracy by comparing predictions to a new test set
- B) Monitor input feature distributions for drift compared to the training data
- C) Calculate AUC using only the predicted probabilities
- D) Wait for ground truth labels before any assessment

---

## Q96 (Multi Answer - Select 2)
Which TWO statements about model versioning in the Snowflake Model Registry are correct? (Select 2)
- A) Each model can have multiple named versions
- B) Only one model version can exist at a time; logging a new version overwrites the previous one
- C) A default version can be set to control which version is used for inference
- D) Model versions are stored in separate databases
- E) Version names must be auto-incrementing integers

---

## Q97 (Single Answer)
Which type of Python UDF should be used when deploying a model that benefits from pandas DataFrame operations and batch processing?
- A) A scalar Python UDF
- B) A vectorized Python UDF
- C) A table function (UDTF)
- D) A JavaScript UDF

---

## Q98 (Scenario)
A data scientist at a logistics company has deployed a delivery time prediction model. Operations teams report that predictions are consistently 30 minutes too optimistic. What monitoring approach should be implemented going forward?
- A) Track the average prediction value over time
- B) Compute residual statistics (predicted minus actual) regularly and alert when systematic bias is detected
- C) Monitor the number of UDF calls per day
- D) Check if the model file on the stage has been modified

---

## Q99 (Single Answer)
When an external function is called in Snowflake, in what format is the data sent to the remote service?
- A) CSV format
- B) Parquet format
- C) JSON format (batched rows)
- D) Protobuf format

---

## Q100 (Multi Answer - Select 2)
Which TWO approaches can help reduce the inference latency of a Python UDF-based model in Snowflake? (Select 2)
- A) Cache the model at the module level to avoid reloading it for each batch
- B) Use a vectorized UDF to process rows in batches rather than one at a time
- C) Use a smaller warehouse to reduce resource contention
- D) Store the model in a table instead of a stage
- E) Remove the PACKAGES clause from the UDF definition

---

## Q101 (Scenario)
A financial services company needs to deploy multiple versions of a credit risk model simultaneously to serve different regulatory jurisdictions. How should they manage this in Snowflake?
- A) Create separate Python UDFs for each model version, each loading a different model artifact
- B) Use a single Python UDF with a parameter that selects the model version at runtime
- C) Log all versions to the Model Registry and reference specific versions in each jurisdiction's pipeline
- D) Deploy all versions as a single ensemble model

---

## Q102 (Single Answer)
What does it mean when a model's recall is high but precision is low?
- A) The model correctly predicts most positive instances but also produces many false positives
- B) The model misses most positive instances but the ones it predicts are correct
- C) The model has high overall accuracy
- D) The model performs equally well on all classes

---

## Q103 (Single Answer)
Which Snowflake SQL command can be used to create a model object in the Model Registry using SQL?
- A) CREATE MODEL
- B) CREATE OR REPLACE MODEL
- C) REGISTER MODEL
- D) Both A and B

---

## Q104 (Scenario)
A data scientist is building a monitoring dashboard for a deployed model. They need to track feature distributions over time and compare them against baseline (training) distributions. Which Snowflake feature is most useful for computing and storing these distribution statistics?
- A) A scheduled task that runs a stored procedure computing summary statistics and writing results to a monitoring table
- B) A materialized view that automatically tracks distribution changes
- C) A stream that captures changes to distribution statistics
- D) An external function that sends data to an external monitoring tool

---

## Q105 (Multi Answer - Select 2)
Which TWO are valid use cases for Snowflake Streams in the context of model deployment? (Select 2)
- A) Detecting new data arrivals to trigger real-time scoring of new records
- B) Automatically retraining a model when new training data is inserted
- C) Monitoring model inference latency
- D) Serving as a trigger condition for Tasks that execute model retraining pipelines
- E) Compressing model artifacts on stages

---

## Q106 (Single Answer)
When deploying a model via a Python UDF, what does the IMPORTS clause specify?
- A) The Python packages required by the UDF
- B) The stage file paths of additional files (such as model artifacts) to make available to the UDF
- C) The input tables that the UDF can read from
- D) The external APIs that the UDF is allowed to call

---

## Q107 (Scenario)
A team deploys a customer segmentation model that outputs cluster labels. After deployment, they observe that one cluster that previously contained 30% of customers now contains only 5%. What does this suggest?
- A) The model has a bug in the scoring function
- B) The customer population has shifted, indicating data drift that may warrant model retraining
- C) The UDF is randomly assigning cluster labels
- D) The Snowflake warehouse is running out of memory

---

## Q108 (Single Answer)
What is the primary purpose of model validation in the deployment lifecycle?
- A) To ensure the model artifact is not corrupted during transfer to a stage
- B) To verify that the model performs acceptably on held-out data before it is promoted to production
- C) To check that the Python UDF compiles without errors
- D) To ensure the model registry has sufficient storage

---

## Q109 (Multi Answer - Select 2)
Which TWO metadata attributes should be tracked for each deployed model version to support model governance? (Select 2)
- A) The training dataset identifier or reference
- B) The color theme of the monitoring dashboard
- C) The model's performance metrics on a validation set
- D) The warehouse name used for training
- E) The number of SQL queries run by other users

---

## Q110 (Scenario)
A data science team needs to serve a model that processes images stored as binary data in a Snowflake table. The model requires OpenCV and a GPU for efficient processing. Which deployment option is best suited?
- A) A scalar Python UDF with OpenCV in the PACKAGES clause
- B) Snowpark Container Services with a GPU compute pool and a Docker image containing OpenCV
- C) An external function calling a pre-built image recognition API
- D) A vectorized Python UDF with numpy-based image processing

---

## Q111 (Single Answer)
What type of Snowflake object is a model in the Model Registry?
- A) A transient table
- B) A schema-level object (a first-class database object)
- C) A view
- D) A temporary stage

---

## Q112 (Single Answer)
Which scenario would make an external function preferable over a Python UDF for model deployment?
- A) When the model needs to access data in the same Snowflake account
- B) When the organization maintains a centralized ML serving platform outside Snowflake that is the system of record
- C) When the model only needs basic Python libraries
- D) When data security requires keeping all processing within Snowflake

---

## Q113 (Scenario)
A data engineer needs to automate the complete model lifecycle: ingest new data → retrain model → evaluate metrics → log to registry → score production data. The process should run daily. Which set of Snowflake objects achieves this?
- A) A Task with a CRON schedule calling a stored procedure that performs all steps
- B) A dynamic table that automatically retrains and scores data
- C) A materialized view that refreshes the model daily
- D) A stream on every table in the pipeline

---

## Q114 (Multi Answer - Select 2)
Which TWO types of UDFs can be used for model deployment in Snowflake? (Select 2)
- A) Python UDFs
- B) SQL UDFs
- C) Java UDFs
- D) Lua UDFs
- E) R UDFs

---

## Q115 (Single Answer)
What is the key advantage of using the Model Registry's `run` method for inference compared to a standalone Python UDF?
- A) The `run` method is always faster than a Python UDF
- B) The `run` method automatically handles model loading, versioning, and provides a consistent API for all registered model types
- C) The `run` method does not require compute resources
- D) The `run` method can only process one row at a time

---

## Q116 (Scenario)
A data scientist notices that their production model's AUC has dropped from 0.92 to 0.85 over three months. They compare the production data feature distributions to the training data and find no significant drift. They also verify the model artifact is unchanged. What should they investigate next?
- A) Whether the warehouse has been downsized
- B) Whether there is concept drift — the relationship between features and the target may have changed
- C) Whether the stage containing the model has been moved
- D) Whether the PACKAGES clause has been modified

---

## Q117 (Single Answer)
In Snowflake, which object is used to define the trust relationship and allowed endpoints when creating external functions?
- A) NETWORK POLICY
- B) API INTEGRATION
- C) SECURITY INTEGRATION
- D) EXTERNAL ACCESS INTEGRATION

---

## Q118 (Multi Answer - Select 2)
Which TWO characteristics distinguish vectorized Python UDFs from scalar Python UDFs in Snowflake? (Select 2)
- A) Vectorized UDFs receive input as pandas Series or DataFrames
- B) Vectorized UDFs can only return numeric types
- C) Vectorized UDFs can process multiple rows per function call, reducing Python overhead
- D) Vectorized UDFs do not support importing files from stages
- E) Vectorized UDFs are written in a different programming language than scalar UDFs

---

## Q119 (Scenario)
A company has a fraud detection model deployed in Snowflake. They want to implement a shadow deployment where a new candidate model scores the same traffic as the production model, but without affecting production outputs. How should they implement this?
- A) Replace the production UDF with the new model and monitor for issues
- B) Create a second UDF with the candidate model and have a scheduled task score the same data with both models, storing results in separate columns or tables for comparison
- C) Deploy the candidate model as an external function only
- D) Use a stream to duplicate the data and send it to the new model

---

## Q120 (Single Answer)
Which metric is specifically designed to assess the trade-off between precision and recall in a single value?
- A) Accuracy
- B) F1 Score
- C) RMSE
- D) R-squared

---

## Q121 (Scenario)
A data scientist has trained a model using Snowpark ML and wants to log it to the Model Registry with custom metrics (RMSE=12.5, MAE=9.3). How should they attach these metrics?
- A) Store the metrics in a separate table and manually cross-reference with the model
- B) Include the metrics as part of the model's Python code comments
- C) Use the Model Registry's API to set metrics on the model version object
- D) Write the metrics to the model artifact file before logging

---

## Q122 (Multi Answer - Select 2)
Which TWO considerations are important when using the PUT command to upload model artifacts to a Snowflake stage? (Select 2)
- A) Setting AUTO_COMPRESS=FALSE for binary model files to prevent corruption during compression
- B) Ensuring the target stage exists before uploading
- C) The PUT command can only upload files smaller than 10 MB
- D) The PUT command requires the SYSADMIN role to execute
- E) The PUT command automatically creates a model registry entry

---

## Q123 (Single Answer)
What does a chi-squared test assess when used for data drift detection on categorical features?
- A) Whether the mean of a feature has shifted significantly
- B) Whether the observed frequency distribution of categories differs significantly from the expected distribution
- C) Whether the correlation between two continuous features has changed
- D) Whether the variance of the feature has increased

---

## Q124 (Scenario)
A machine learning engineer is deploying a model using Snowpark Container Services. The service needs to accept REST API calls from within Snowflake. Which component of the service specification defines the network endpoint?
- A) The COMPUTE POOL specification
- B) The endpoint configuration in the service specification YAML
- C) The NETWORK POLICY attached to the service
- D) The API INTEGRATION linked to the container

---

## Q125 (Single Answer)
When a model is logged to the Snowflake Model Registry, where are the model artifacts physically stored?
- A) In a Snowflake-managed internal stage associated with the model object
- B) In the user's local filesystem
- C) In a shared external S3 bucket managed by Snowflake
- D) In the INFORMATION_SCHEMA of the current database
