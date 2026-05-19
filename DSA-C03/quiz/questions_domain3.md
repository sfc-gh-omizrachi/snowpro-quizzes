# Domain 3: Model Development

---

## Q1 (Single Answer)
Which Snowpark language is NOT natively supported for writing User-Defined Functions (UDFs) in Snowflake?
- A) Python
- B) Java
- C) Scala
- D) R

---

## Q2 (Single Answer)
What is the primary advantage of using the Snowflake Python Connector with Pandas support over the standard Python connector?
- A) It enables writing stored procedures in Python
- B) It allows data to be fetched directly into pandas DataFrames, improving data transfer efficiency
- C) It provides access to Snowflake Cortex LLM functions
- D) It automatically creates UDFs from pandas functions

---

## Q3 (Scenario)
A data scientist wants to connect to Snowflake from Visual Studio Code to develop a Snowpark ML pipeline. Which approach provides the most integrated development experience?
- A) Use the Snowflake CLI to execute SQL files from the VS Code terminal
- B) Install the Snowflake Extension for Visual Studio Code and use Snowpark Python with a local Snowpark session
- C) Connect via ODBC driver and write raw SQL queries only
- D) Export data to CSV and develop locally without a Snowflake connection

---

## Q4 (Single Answer)
When establishing a Snowpark session in Python, which object is used to create the connection to Snowflake?
- A) snowflake.connector.connect()
- B) snowflake.snowpark.Session.builder.configs()
- C) snowflake.ml.Session.create()
- D) snowpark.connection.establish()

---

## Q5 (Scenario)
A machine learning engineer needs to train a scikit-learn model using data stored in Snowflake without extracting the data to a local environment. Which combination of Snowflake features should they use?
- A) External functions and Java UDFs
- B) Snowpark Python and Snowpark ML modeling module
- C) Snowflake SQL stored procedures and JavaScript UDFs
- D) The Snowflake JDBC driver and a local Python script

---

## Q6 (Multi Answer - Select 2)
Which TWO methods are valid ways to connect Python to data in Snowflake for data science workloads? (Select 2)
- A) Snowpark Python API using Session.builder
- B) Snowflake Python Connector with pandas fetch_pandas_all()
- C) Direct filesystem access to Snowflake internal stages from Python
- D) PyODBC with Snowflake's MySQL-compatible endpoint
- E) Snowflake REST API with OAuth tokens only

---

## Q7 (Single Answer)
What module within the Snowpark ML library provides implementations of common scikit-learn compatible estimators that run natively in Snowflake?
- A) snowflake.ml.data
- B) snowflake.ml.modeling
- C) snowflake.ml.pipeline
- D) snowflake.ml.sklearn

---

## Q8 (Scenario)
A data scientist is developing a model training pipeline in a Snowflake Python Worksheet. What is a key limitation they should be aware of compared to using a local IDE?
- A) Python Worksheets cannot access Snowflake tables
- B) Python Worksheets do not support importing third-party packages from the Anaconda channel
- C) The handler function in a Python Worksheet must return a value convertible to a DataFrame or a string-like result
- D) Python Worksheets cannot use the Snowpark Session object

---

## Q9 (Single Answer)
Which Snowpark languages support writing stored procedures in Snowflake?
- A) Python, Java, and Scala only
- B) Python and SQL only
- C) Python, Java, Scala, and JavaScript
- D) Python, Java, Scala, SQL, and JavaScript

---

## Q10 (Multi Answer - Select 2)
Which TWO are valid Snowpark language runtimes for creating User-Defined Functions in Snowflake? (Select 2)
- A) Python
- B) R
- C) Java
- D) C++
- E) Ruby

---

## Q11 (Scenario)
A team is working in Visual Studio Code and wants to interactively explore Snowflake data, write Snowpark code, and test UDFs before deployment. Which setup best supports this workflow?
- A) Install the Snowflake Extension for VS Code, configure a connection profile, and use Snowpark Python within Jupyter notebooks or Python files
- B) Use only the Snowflake Web UI and copy code back to VS Code
- C) Configure a JDBC connection string and write all code in Java
- D) Use the SnowSQL CLI exclusively within the VS Code terminal

---

## Q12 (Single Answer)
When using the Snowflake Python Connector, which method fetches query results directly into a pandas DataFrame?
- A) cursor.fetchall()
- B) cursor.fetch_pandas_all()
- C) cursor.to_pandas()
- D) cursor.get_dataframe()

---

## Q13 (Single Answer)
In Snowpark Python, what is the correct way to reference a table and return a DataFrame?
- A) session.sql("SELECT * FROM table")
- B) session.table("table_name")
- C) Both A and B are valid approaches
- D) session.read.table("table_name")

---

## Q14 (Scenario)
A data scientist wants to use Snowpark ML's preprocessing module to scale features before training. Which class from the snowflake.ml.modeling.preprocessing module should they use for standardization?
- A) MinMaxScaler
- B) StandardScaler
- C) RobustScaler
- D) Normalizer

---

## Q15 (Single Answer)
What is the Snowflake Cortex function used to generate vector embeddings from text data?
- A) CORTEX.VECTORIZE()
- B) CORTEX.EMBED_TEXT_768()
- C) CORTEX.ENCODE_TEXT()
- D) CORTEX.TEXT_TO_VECTOR()

---

## Q16 (Single Answer)
What is the dimensionality of the vector output produced by the EMBED_TEXT_768 function in Snowflake Cortex?
- A) 256 dimensions
- B) 512 dimensions
- C) 768 dimensions
- D) 1024 dimensions

---

## Q17 (Scenario)
A data scientist needs to perform sentiment analysis on millions of customer reviews stored in a Snowflake table. Which approach leverages Snowflake's built-in capabilities most efficiently?
- A) Export the data to an external NLP service via API calls from a Python script
- B) Use Snowflake Cortex's task-specific sentiment analysis function directly in SQL
- C) Write a custom Python UDF that loads a pre-trained BERT model
- D) Use Snowpark ML's built-in sentiment classifier

---

## Q18 (Single Answer)
Which Snowflake Cortex function is used for text summarization?
- A) CORTEX.CONDENSE()
- B) CORTEX.SUMMARIZE()
- C) CORTEX.ABSTRACT()
- D) CORTEX.REDUCE_TEXT()

---

## Q19 (Multi Answer - Select 2)
Which TWO are task-specific LLM functions available in Snowflake Cortex? (Select 2)
- A) SUMMARIZE
- B) TOKENIZE
- C) SENTIMENT
- D) SPELL_CHECK
- E) TRANSLATE_TEXT

---

## Q20 (Scenario)
A data scientist wants to use Snowflake Cortex to generate custom text completions using a large language model. Which function should they use?
- A) snowflake.cortex.Generate()
- B) snowflake.cortex.Complete()
- C) snowflake.cortex.Predict()
- D) snowflake.cortex.LLM()

---

## Q21 (Single Answer)
When using snowflake.cortex.Complete() for prompt engineering, what does the "temperature" parameter control?
- A) The maximum number of tokens in the response
- B) The randomness or creativity of the generated output
- C) The speed at which the model processes the prompt
- D) The number of response candidates to generate

---

## Q22 (Scenario)
A company wants to customize a Snowflake Cortex LLM to better understand their domain-specific terminology and generate more accurate responses for their use case. Which Cortex capability should they use?
- A) Prompt engineering with system prompts
- B) Fine-tuning a Cortex model with company-specific training data
- C) Creating a custom Python UDF wrapping an open-source LLM
- D) Increasing the temperature parameter to improve accuracy

---

## Q23 (Single Answer)
What is the primary purpose of fine-tuning in Snowflake Cortex?
- A) To reduce the cost of running LLM inference queries
- B) To adapt a pre-trained LLM to perform better on domain-specific tasks using custom training data
- C) To change the underlying architecture of the LLM
- D) To increase the context window size of the model

---

## Q24 (Multi Answer - Select 2)
Which TWO capabilities does Snowflake Cortex provide for working with LLMs? (Select 2)
- A) Training LLMs from scratch on Snowflake compute
- B) Fine-tuning pre-trained models with custom data
- C) Task-specific functions like sentiment analysis and summarization
- D) Deploying custom PyTorch models as Cortex endpoints
- E) Running reinforcement learning from human feedback (RLHF) loops

---

## Q25 (Scenario)
A data scientist needs to categorize support tickets into predefined categories using Snowflake Cortex. Which approach is most appropriate?
- A) Use EMBED_TEXT_768 to generate embeddings and then cluster them
- B) Use snowflake.cortex.Complete() with a prompt that includes the categories and asks the model to classify each ticket
- C) Use the SUMMARIZE function to reduce tickets to keywords
- D) Export the data and use an external classification API

---

## Q26 (Single Answer)
When using Snowflake Cortex's EMBED_TEXT_768 function, what type of data does it accept as input?
- A) Numeric arrays only
- B) Text strings (VARCHAR)
- C) Binary image data
- D) Structured JSON documents only

---

## Q27 (Scenario)
A team wants to build a semantic search feature over product descriptions stored in Snowflake. Which combination of Cortex features should they use?
- A) SUMMARIZE to shorten descriptions, then use LIKE queries for search
- B) EMBED_TEXT_768 to create vector embeddings, then use vector similarity search
- C) Complete() to rewrite all descriptions, then use full-text search
- D) Fine-tune a model on product descriptions, then use SENTIMENT for ranking

---

## Q28 (Single Answer)
Which Snowflake Cortex function would be most appropriate for extracting structured information such as names, dates, and amounts from unstructured text documents?
- A) SUMMARIZE
- B) SENTIMENT
- C) Complete() with an extraction prompt
- D) EMBED_TEXT_768

---

## Q29 (Multi Answer - Select 2)
Which TWO are valid use cases for the snowflake.cortex.Complete() function? (Select 2)
- A) Generating SQL queries from natural language descriptions
- B) Creating vector embeddings for similarity search
- C) Extracting structured data from unstructured text via prompt engineering
- D) Performing real-time model training
- E) Computing statistical aggregations over numeric data

---

## Q30 (Scenario)
A data scientist is fine-tuning a Snowflake Cortex model. The training data must be in a specific format. What is the expected format for fine-tuning training data?
- A) A CSV file with feature columns and a label column
- B) A table or view with prompt-completion pairs in designated columns
- C) A JSON file uploaded to a Snowflake stage with arbitrary structure
- D) A parquet file with pre-computed embeddings

---

## Q31 (Single Answer)
What is the primary benefit of using Snowflake Cortex task-specific functions (e.g., SENTIMENT, SUMMARIZE) over using snowflake.cortex.Complete() with custom prompts?
- A) Task-specific functions support more languages
- B) Task-specific functions are optimized for their specific task, requiring no prompt engineering and typically running faster
- C) Task-specific functions can process images in addition to text
- D) Task-specific functions allow fine-tuning

---

## Q32 (Single Answer)
In a Snowflake Cortex fine-tuning job, what happens to the base model?
- A) The base model is permanently modified
- B) A new fine-tuned model is created while the base model remains unchanged
- C) The base model is replaced with the fine-tuned version
- D) The base model's weights are partially frozen and the rest are updated in place

---

## Q33 (Scenario)
A data scientist wants to use prompt engineering with snowflake.cortex.Complete() to ensure consistent JSON output for an information extraction task. Which technique is most effective?
- A) Set the temperature to the maximum value
- B) Include a system prompt with explicit output format instructions and provide few-shot examples in the user prompt
- C) Use a very short prompt to minimize token usage
- D) Call the function multiple times and pick the longest response

---

## Q34 (Scenario)
A retail company wants to automatically generate product summaries from lengthy product descriptions stored in Snowflake. Which SQL query pattern is most appropriate?
- A) SELECT CORTEX.COMPLETE('summarize this: ' || description) FROM products
- B) SELECT SNOWFLAKE.CORTEX.SUMMARIZE(description) FROM products
- C) SELECT CORTEX.EMBED_TEXT_768(description) FROM products
- D) SELECT SNOWFLAKE.CORTEX.SENTIMENT(description) FROM products

---

## Q35 (Multi Answer - Select 2)
Which TWO statements about Snowflake Cortex fine-tuning are correct? (Select 2)
- A) Fine-tuning requires access to the base model's source code
- B) Fine-tuning creates a custom model adapted to domain-specific data
- C) Fine-tuned models can only be used within the account where they were created
- D) Fine-tuning permanently modifies the base model's weights
- E) Fine-tuning eliminates the need for any prompt engineering

---

## Q36 (Single Answer)
What is a dynamic table in Snowflake, and how does it relate to data science pipelines?
- A) A table that automatically adjusts its schema based on incoming data
- B) A declarative table whose contents are defined by a query and automatically refreshed, enabling automated data transformation pipelines
- C) A temporary table that exists only for the duration of a session
- D) A table that dynamically scales its storage based on query patterns

---

## Q37 (Scenario)
A data scientist needs to automate a feature engineering pipeline that transforms raw data into training-ready features whenever new data arrives. Which Snowflake feature is most appropriate?
- A) Create a view that references the raw data table
- B) Use dynamic tables with a defined target lag to automatically refresh transformed data
- C) Schedule a manual SQL script to run every hour
- D) Use a temporary table that is recreated on each session

---

## Q38 (Single Answer)
What does the SYSTEM$STREAM_HAS_DATA() function return?
- A) The number of rows in a stream
- B) A Boolean indicating whether a stream contains change data capture records
- C) The timestamp of the last change recorded in the stream
- D) A list of tables that have changed since the last stream consumption

---

## Q39 (Multi Answer - Select 2)
Which TWO Snowflake features can be combined to build an automated data science pipeline that processes data only when new records arrive? (Select 2)
- A) CREATE TASK with a WHEN clause using SYSTEM$STREAM_HAS_DATA()
- B) Dynamic tables with a target lag specification
- C) Materialized views with automatic clustering
- D) External tables with auto-refresh from cloud storage
- E) Time-travel queries scheduled via cron jobs

---

## Q40 (Scenario)
A data engineer is creating a Snowflake task to trigger model retraining whenever new training data arrives. Which SQL pattern correctly uses stream-based triggering?
- A) CREATE TASK retrain_task SCHEDULE = 'USING CRON 0 * * * *' AS CALL retrain_model();
- B) CREATE TASK retrain_task WAREHOUSE = compute_wh WHEN SYSTEM$STREAM_HAS_DATA('training_data_stream') AS CALL retrain_model();
- C) CREATE TASK retrain_task TRIGGER = 'ON INSERT INTO training_data' AS CALL retrain_model();
- D) CREATE TASK retrain_task ON STREAM training_data_stream AS CALL retrain_model();

---

## Q41 (Single Answer)
What is the key advantage of using a Python UDF over a Python stored procedure for model inference in Snowflake?
- A) Python UDFs can modify database state while stored procedures cannot
- B) Python UDFs are called inline within SQL queries and can be applied row-by-row, while stored procedures are invoked with CALL
- C) Python UDFs support more Python packages than stored procedures
- D) Python UDFs automatically parallelize across warehouse nodes while stored procedures run on a single node

---

## Q42 (Scenario)
A data scientist wants to apply a trained scikit-learn model to score each row in a table containing 100 million records. Which approach provides the best performance in Snowflake?
- A) Write a Python stored procedure that iterates over each row
- B) Create a vectorized Python UDF that processes batches of rows using pandas Series
- C) Export the data, score locally, and reload results
- D) Use a JavaScript UDF to call the model

---

## Q43 (Single Answer)
What is the key difference between a Python UDF and a Python UDTF in Snowflake?
- A) A UDF returns a single scalar value per input row, while a UDTF can return multiple rows per input row
- B) A UDF runs in Python while a UDTF runs in Java
- C) A UDF can access external stages while a UDTF cannot
- D) A UDF is permanent while a UDTF is always temporary

---

## Q44 (Multi Answer - Select 2)
Which TWO are valid use cases for Python User-Defined Table Functions (UDTFs) in Snowflake data science workflows? (Select 2)
- A) Generating multiple prediction intervals for each input row
- B) Modifying table schemas and granting privileges
- C) Training a model within the UDTF where the process method accumulates data and end_partition returns results
- D) Creating and dropping tables as part of pipeline orchestration
- E) Replacing the need for Snowflake tasks in scheduling

---

## Q45 (Scenario)
A data scientist needs to train a separate model for each customer segment in a table. The training should leverage Snowflake's distributed compute. Which approach is most suitable?
- A) Write a single Python stored procedure that loops through each segment sequentially
- B) Use a Python UDTF with PARTITION BY customer_segment so each partition trains an independent model in parallel
- C) Export each segment to separate CSV files and train locally
- D) Create a separate Snowflake task for each customer segment

---

## Q46 (Single Answer)
When creating a Python stored procedure for model training in Snowflake, which decorator is used to register the procedure?
- A) @snowpark.procedure
- B) @sproc
- C) @udf
- D) The procedure is registered using session.sproc.register()

---

## Q47 (Scenario)
A team wants to automate a data transformation pipeline in Snowflake that feeds a downstream ML model. The pipeline consists of three sequential steps: data cleaning, feature engineering, and feature validation. Which Snowflake approach best supports this?
- A) Create three dynamic tables, each referencing the previous one, forming a DAG of transformations
- B) Write a single stored procedure that executes all three steps sequentially
- C) Create three independent tasks with no dependencies
- D) Use three separate materialized views

---

## Q48 (Single Answer)
What is the target_lag parameter in a Snowflake dynamic table?
- A) The maximum allowed query execution time
- B) The maximum acceptable staleness of the dynamic table's data relative to its base tables
- C) The network latency threshold for cross-region replication
- D) The delay before a dynamic table is automatically dropped

---

## Q49 (Multi Answer - Select 2)
Which TWO statements about Python stored procedures in Snowflake are correct? (Select 2)
- A) Python stored procedures can read and write data to Snowflake tables
- B) Python stored procedures can only return scalar values, not DataFrames
- C) Python stored procedures run with the caller's privileges by default
- D) Python stored procedures can import packages from the Snowflake Anaconda channel
- E) Python stored procedures cannot use the Snowpark Session object

---

## Q50 (Scenario)
A data scientist is building an ML pipeline and needs to decide between using a Python UDF and a Python stored procedure for their training logic. The training step needs to read from multiple tables, write the model to a stage, and log metrics to a results table. Which should they choose and why?
- A) A Python UDF, because it can access multiple tables and stages
- B) A Python stored procedure, because it can perform multi-statement operations including reads, writes, and stage operations
- C) A Python UDTF, because it supports multi-table operations
- D) An external function, because only external services can write to stages

---

## Q51 (Single Answer)
In hyperparameter tuning, what is the primary purpose of grid search?
- A) To find the optimal training data split ratio
- B) To exhaustively evaluate all combinations of specified hyperparameter values
- C) To automatically select the best features for the model
- D) To determine the optimal number of training epochs only

---

## Q52 (Scenario)
A data scientist is tuning a gradient boosting model in Snowflake using Snowpark ML. They need to search across learning_rate values of [0.01, 0.1, 0.3] and max_depth values of [3, 5, 7]. How many model configurations will be evaluated using grid search?
- A) 3
- B) 6
- C) 9
- D) 27

---

## Q53 (Single Answer)
What is the key advantage of random search over grid search for hyperparameter tuning?
- A) Random search always finds the global optimum
- B) Random search can explore a larger hyperparameter space more efficiently by sampling randomly rather than exhaustively
- C) Random search requires fewer computational resources per model evaluation
- D) Random search does not require specifying hyperparameter ranges

---

## Q54 (Multi Answer - Select 2)
Which TWO are common hyperparameter tuning strategies that can be implemented using Snowpark Python stored procedures? (Select 2)
- A) Grid search across a predefined parameter grid
- B) Automatic architecture search that modifies the model type
- C) Random search with a specified number of iterations
- D) Hardware optimization to select the best warehouse size
- E) Automatic feature selection independent of model training

---

## Q55 (Scenario)
A data scientist is choosing an optimization metric for a binary classification model that detects fraudulent transactions. Fraud cases represent 0.5% of all transactions. Which metric is most appropriate?
- A) Accuracy
- B) AUC (Area Under the ROC Curve)
- C) Mean Squared Error
- D) R-squared

---

## Q56 (Single Answer)
When is log loss (binary cross-entropy) preferred over AUC as an optimization metric?
- A) When the model only needs to rank predictions rather than produce calibrated probabilities
- B) When well-calibrated probability estimates are important, not just ranking
- C) When the dataset is perfectly balanced
- D) When the model is a regression model

---

## Q57 (Single Answer)
For a regression model predicting house prices, which optimization metric penalizes larger errors more heavily than smaller ones?
- A) Mean Absolute Error (MAE)
- B) Root Mean Squared Error (RMSE)
- C) R-squared
- D) Median Absolute Error

---

## Q58 (Multi Answer - Select 2)
Which TWO metrics are appropriate optimization metrics for classification problems? (Select 2)
- A) RMSE
- B) Log loss
- C) R-squared
- D) AUC
- E) Mean Absolute Percentage Error

---

## Q59 (Scenario)
A data scientist is training a regression model to predict energy consumption. They want to ensure the metric they optimize is in the same units as the target variable. Which metric should they choose?
- A) Mean Squared Error (MSE)
- B) R-squared
- C) Root Mean Squared Error (RMSE)
- D) Log loss

---

## Q60 (Single Answer)
What is k-fold cross-validation?
- A) A method of splitting data into k equal parts, training on k-1 folds and validating on the remaining fold, repeated k times
- B) A method of training k different model types and selecting the best one
- C) A technique for selecting the top k features from a dataset
- D) A method of sampling k random subsets of the training data

---

## Q61 (Scenario)
A data scientist has a dataset of 10,000 records and wants to use 5-fold cross-validation. How many records will be in each validation fold, and how many total models will be trained?
- A) 5,000 records per fold, 2 models
- B) 2,000 records per fold, 5 models
- C) 1,000 records per fold, 10 models
- D) 2,500 records per fold, 4 models

---

## Q62 (Single Answer)
What is the primary advantage of cross-validation over a single train-validation hold-out split?
- A) Cross-validation is always faster to compute
- B) Cross-validation provides a more robust estimate of model performance by using all data for both training and validation
- C) Cross-validation eliminates the need for a test set
- D) Cross-validation automatically selects the best hyperparameters

---

## Q63 (Multi Answer - Select 2)
Which TWO are valid data partitioning strategies for model training and evaluation? (Select 2)
- A) K-fold cross-validation
- B) Random deletion of 50% of the data before training
- C) Train-validation-test hold-out split
- D) Using the entire dataset for both training and evaluation
- E) Sorting data by the target variable before splitting

---

## Q64 (Scenario)
A data scientist has a very small dataset of 500 labeled samples. Which partitioning strategy will provide the most reliable performance estimate?
- A) A single 50/50 train-test split
- B) Leave-one-out cross-validation (LOOCV)
- C) A single 90/10 train-test split
- D) No validation — train on all data and report training metrics

---

## Q65 (Single Answer)
In a train-validation-test hold-out split, what is the purpose of the validation set?
- A) To provide the final unbiased estimate of model performance
- B) To tune hyperparameters and select between model configurations without touching the test set
- C) To serve as additional training data when the model underfits
- D) To detect data leakage in the feature engineering process

---

## Q66 (Single Answer)
What is the purpose of downsampling (undersampling) the majority class in an imbalanced classification dataset?
- A) To increase the total number of training samples
- B) To reduce the dominance of the majority class so the model learns patterns from the minority class more effectively
- C) To improve the model's performance on the majority class
- D) To remove outliers from the dataset

---

## Q67 (Scenario)
A data scientist is building a fraud detection model where fraudulent transactions represent only 1% of the data. They decide to use upsampling. What does this involve?
- A) Removing duplicate rows from the majority class
- B) Increasing the number of minority class (fraud) samples through techniques like replication or synthetic generation
- C) Collecting more data from the production system
- D) Increasing the model's learning rate to focus on rare events

---

## Q68 (Multi Answer - Select 2)
Which TWO are valid techniques for handling class imbalance in a training dataset for a Snowflake-based ML pipeline? (Select 2)
- A) Downsampling the majority class using a SQL SAMPLE clause
- B) Changing the data type of the target column
- C) Upsampling the minority class with synthetic data generation
- D) Ignoring class imbalance since modern algorithms handle it automatically
- E) Adding more features to the dataset

---

## Q69 (Scenario)
A data scientist wants to train a machine learning model entirely within Snowflake using a Python stored procedure. Which of the following is the correct pattern for the training workflow?
- A) Read data using Snowpark DataFrames, convert to pandas, train with scikit-learn, serialize the model, and upload to a Snowflake stage
- B) Read data using SQL, export to S3, train with SageMaker, and import results back
- C) Create a Java UDF that calls a REST API for training
- D) Use only SQL aggregation functions to build the model weights manually

---

## Q70 (Single Answer)
When training a model inside a Snowflake Python stored procedure, how is the trained model artifact typically persisted?
- A) It is stored directly in a Snowflake table as a VARIANT column
- B) It is serialized (e.g., with joblib or pickle) and uploaded to a Snowflake stage
- C) It is stored in the Snowflake metadata layer automatically
- D) It is written to the local filesystem of the warehouse node

---

## Q71 (Scenario)
A company has an existing model training infrastructure on AWS SageMaker but wants to use Snowflake data for training without data egress. Which Snowflake feature enables calling the SageMaker endpoint from within Snowflake?
- A) Snowpark Python connector
- B) External functions
- C) Dynamic tables
- D) Internal stages

---

## Q72 (Single Answer)
What is an external function in Snowflake?
- A) A UDF that runs on external compute resources provisioned by Snowflake
- B) A function that allows Snowflake to call a remote service (e.g., an API endpoint) via an API integration
- C) A function defined in an external programming language not supported by Snowflake
- D) A function that reads data from external cloud storage

---

## Q73 (Multi Answer - Select 2)
Which TWO are prerequisites for creating an external function in Snowflake? (Select 2)
- A) A remote service endpoint (e.g., AWS Lambda, Azure Function) accessible via HTTPS
- B) An API integration object configured in Snowflake
- C) A Snowpark Container Services compute pool
- D) A Java runtime installed on the Snowflake warehouse
- E) A materialized view over the input data

---

## Q74 (Scenario)
A data scientist is designing a Python UDTF to train a model per partition. The UDTF's process method receives one row at a time, and the end_partition method is called after all rows in a partition are processed. Where should the model training logic be placed?
- A) In the __init__ method
- B) In the process method, training after each row
- C) In the end_partition method, after all rows have been accumulated
- D) In a separate stored procedure called from the UDTF

---

## Q75 (Single Answer)
What is the advantage of using a vectorized Python UDF (using the @udf decorator with a pandas type hint) over a scalar Python UDF?
- A) Vectorized UDFs process data one row at a time for better accuracy
- B) Vectorized UDFs receive batches of rows as pandas Series/DataFrames, reducing serialization overhead and improving performance
- C) Vectorized UDFs can write back to tables while scalar UDFs cannot
- D) Vectorized UDFs support more programming languages

---

## Q76 (Scenario)
A data scientist wants to distribute model inference across the nodes of a Snowflake warehouse. They have a trained model file on a stage and a table with 50 million rows to score. What is the recommended approach?
- A) Write a stored procedure that reads all 50 million rows into memory at once
- B) Create a vectorized Python UDF that loads the model from the stage and scores batches of rows, then apply it in a SELECT statement
- C) Export the data to an external service for scoring
- D) Use a JavaScript UDF since it has better performance than Python

---

## Q77 (Multi Answer - Select 2)
Which TWO statements about training models with Python UDTFs in Snowflake are correct? (Select 2)
- A) UDTFs can leverage PARTITION BY to train separate models for different data segments in parallel
- B) UDTFs can only return a single row per partition
- C) The end_partition method is where training typically occurs after rows are accumulated
- D) UDTFs cannot access Snowflake stages to save model artifacts
- E) UDTFs require the use of Java for model training logic

---

## Q78 (Single Answer)
When using CREATE TASK in Snowflake to automate a model training pipeline, what determines when the task executes?
- A) Only a fixed CRON schedule
- B) Either a fixed CRON schedule or a WHEN condition (e.g., using SYSTEM$STREAM_HAS_DATA)
- C) Only when triggered by a SYSTEM$STREAM_HAS_DATA condition
- D) Only when manually invoked with EXECUTE TASK

---

## Q79 (Scenario)
A data scientist has built a feature engineering pipeline using three dynamic tables: dt_clean (cleaning), dt_features (feature engineering), and dt_training (final training set). What happens when new data is inserted into the base table?
- A) All three dynamic tables must be manually refreshed in order
- B) Only dt_clean refreshes automatically; the others must be triggered manually
- C) Snowflake automatically refreshes all three dynamic tables in dependency order based on their target lag
- D) The dynamic tables are dropped and must be recreated

---

## Q80 (Single Answer)
In Snowflake, what is the recommended way to pass a trained model artifact from a Python stored procedure to a Python UDF for inference?
- A) Store the model in a Snowflake session variable
- B) Serialize the model and upload it to a Snowflake stage, then reference the stage in the UDF's imports
- C) Store the model in a Snowflake VARIANT column and query it from the UDF
- D) Pass the model bytes directly as a function argument

---

## Q81 (Scenario)
A data scientist needs to implement stratified k-fold cross-validation for a binary classification model within Snowflake. Which approach maintains class proportions across folds?
- A) Randomly split data into k folds without considering the target variable
- B) Sort data by the target variable and split into k consecutive chunks
- C) Use Snowpark to implement stratified splitting that ensures each fold has approximately the same proportion of positive and negative classes
- D) Train on the full dataset and skip cross-validation

---

## Q82 (Single Answer)
What is the role of the Snowpark ML ModelBuilder in a training workflow?
- A) It replaces scikit-learn entirely with a Snowflake-native ML framework
- B) It provides scikit-learn-compatible estimators that push computation down to the Snowflake warehouse
- C) It generates SQL queries from Python model definitions
- D) It manages model versioning and deployment

---

## Q83 (Multi Answer - Select 2)
Which TWO are benefits of training models within Snowflake using Snowpark Python stored procedures rather than extracting data to a local machine? (Select 2)
- A) Data never leaves the Snowflake security perimeter, reducing governance risks
- B) Stored procedures always train models faster than local machines regardless of data size
- C) Compute scales with the Snowflake warehouse, avoiding local resource constraints
- D) Stored procedures automatically select the best algorithm for the data
- E) Stored procedures provide built-in model explainability metrics

---

## Q84 (Scenario)
A data scientist is using Snowpark ML's GridSearchCV to tune hyperparameters within Snowflake. The tuning process is running slowly. Which action would most likely improve performance?
- A) Reduce the number of cross-validation folds to decrease the number of models trained
- B) Increase the temperature parameter
- C) Switch from a Python stored procedure to a JavaScript stored procedure
- D) Add more features to the model

---

## Q85 (Single Answer)
When using dynamic tables for a data science pipeline, what does setting a target_lag of '1 hour' mean?
- A) The dynamic table will be refreshed exactly once every hour
- B) The data in the dynamic table will never be more than 1 hour stale relative to the base tables
- C) The dynamic table will be dropped after 1 hour of inactivity
- D) Queries on the dynamic table will wait up to 1 hour for fresh data

---

## Q86 (Scenario)
A data scientist needs to implement time-series cross-validation for a forecasting model. Unlike standard k-fold CV, the training data must always precede the validation data chronologically. How should they implement this in Snowflake?
- A) Use standard k-fold cross-validation with random splits
- B) Implement expanding or sliding window cross-validation using Snowpark, ensuring training data is always earlier than validation data
- C) Use SYSTEM$STREAM_HAS_DATA to split data by time
- D) Apply SAMPLE to get random time-based splits

---

## Q87 (Single Answer)
What is the primary purpose of a confusion matrix in model validation?
- A) To visualize the correlation between features
- B) To display the counts of true positives, false positives, true negatives, and false negatives for a classification model
- C) To show the distribution of residuals in a regression model
- D) To plot the training loss over epochs

---

## Q88 (Scenario)
A data scientist evaluates a fraud detection model and obtains the following confusion matrix: TP=90, FP=50, TN=9800, FN=60. Each correctly detected fraud saves $1,000, each missed fraud costs $5,000, and each false positive costs $100. What is the expected payout of the model?
- A) $90,000
- B) ($210,000)
- C) ($215,000)
- D) ($125,000)

---

## Q89 (Single Answer)
What does the ROC curve plot?
- A) Precision vs. Recall at various classification thresholds
- B) True Positive Rate vs. False Positive Rate at various classification thresholds
- C) Training loss vs. validation loss over epochs
- D) Predicted values vs. actual values

---

## Q90 (Multi Answer - Select 2)
Which TWO statements about the ROC curve and AUC metric are correct? (Select 2)
- A) An AUC of 0.5 indicates a model performing no better than random chance
- B) An AUC of 1.0 indicates perfect classification
- C) The ROC curve is only applicable to regression problems
- D) The x-axis of the ROC curve represents Precision
- E) A higher AUC always means the model has higher accuracy

---

## Q91 (Scenario)
A data scientist builds a classification model and obtains the following confusion matrix results: TP=150, FP=30, TN=800, FN=20. What is the precision of the model?
- A) 0.833
- B) 0.882
- C) 0.964
- D) 0.950

---

## Q92 (Single Answer)
What is the recall (sensitivity) of a classification model with TP=150, FP=30, TN=800, FN=20?
- A) 0.833
- B) 0.882
- C) 0.964
- D) 0.950

---

## Q93 (Scenario)
A data scientist has built a regression model predicting delivery times. The residuals plot shows a clear funnel shape — residuals increase as predicted values increase. What does this indicate?
- A) The model is perfectly calibrated
- B) Heteroscedasticity — the model's error variance is not constant across prediction ranges
- C) The model has zero bias
- D) The features are perfectly correlated with the target

---

## Q94 (Single Answer)
In a residuals plot for a regression model, what pattern indicates that the model is well-specified?
- A) A clear U-shaped curve in the residuals
- B) Residuals randomly scattered around zero with no discernible pattern
- C) Residuals increasing linearly with predicted values
- D) All residuals concentrated at exactly zero

---

## Q95 (Multi Answer - Select 2)
Which TWO patterns in a residuals plot suggest the regression model may have issues? (Select 2)
- A) Residuals randomly scattered around zero
- B) A systematic curve or pattern in the residuals (indicating non-linearity)
- C) A funnel shape (indicating heteroscedasticity)
- D) Equal spread of residuals across all predicted values
- E) Residuals centered on zero with constant variance

---

## Q96 (Scenario)
A data scientist evaluates a regression model and finds the following metrics: RMSE=15.2, MAE=10.8, R²=0.72. The stakeholder asks what percentage of the variance in the target variable is explained by the model. What should the data scientist report?
- A) 15.2%
- B) 10.8%
- C) 72%
- D) 28%

---

## Q97 (Single Answer)
What does an R-squared value of 0.85 indicate for a linear regression model?
- A) The model correctly classifies 85% of the data
- B) 85% of the variance in the dependent variable is explained by the independent variables
- C) The model has an 85% probability of making correct predictions
- D) 85% of the features are statistically significant

---

## Q98 (Scenario)
A data scientist compares two regression models: Model A has RMSE=12.5 and R²=0.78, while Model B has RMSE=14.1 and R²=0.74. Which model performs better overall and why?
- A) Model B, because it has a higher RMSE
- B) Model A, because it has both a lower RMSE (smaller errors) and a higher R² (more variance explained)
- C) Both models are identical in performance
- D) Model B, because a lower R² means less overfitting

---

## Q99 (Multi Answer - Select 2)
Which TWO metrics are commonly used to evaluate regression model performance? (Select 2)
- A) AUC
- B) RMSE
- C) F1 Score
- D) R-squared
- E) Log loss

---

## Q100 (Single Answer)
In the context of model validation, what does calculating the "expected payout" of a model involve?
- A) Computing the total cost of training the model
- B) Assigning monetary values to each confusion matrix outcome (TP, FP, TN, FN) and computing the net financial impact
- C) Calculating the model's AUC in dollar terms
- D) Determining the cost per prediction API call

---

## Q101 (Scenario)
A data scientist builds a medical diagnostic model. A false negative (missing a disease) costs $50,000 per case, while a false positive (unnecessary treatment) costs $2,000 per case. The confusion matrix shows: TP=200, FP=80, TN=700, FN=20. What is the total cost associated with model errors?
- A) $1,160,000
- B) $160,000
- C) $1,000,000
- D) $280,000

---

## Q102 (Single Answer)
For a binary classification model, how is the F1 score calculated?
- A) (Precision + Recall) / 2
- B) 2 × (Precision × Recall) / (Precision + Recall)
- C) Accuracy × AUC
- D) TP / (TP + FP + FN + TN)

---

## Q103 (Scenario)
A data scientist observes that a regression model's residuals are normally distributed but have a mean significantly different from zero. What does this suggest?
- A) The model has no issues
- B) The model has a systematic bias — it consistently over- or under-predicts
- C) The features have multicollinearity
- D) The model is overfitting

---

## Q104 (Multi Answer - Select 2)
Which TWO components are required to calculate the expected financial payout of a classification model? (Select 2)
- A) The confusion matrix with counts of TP, FP, TN, and FN
- B) The RMSE of the model
- C) Monetary values or costs assigned to each outcome type
- D) The number of features used in the model
- E) The learning rate used during training

---

## Q105 (Single Answer)
When evaluating a classification model, what does a high recall but low precision indicate?
- A) The model correctly identifies most positive cases but also flags many negatives as positive
- B) The model misses most positive cases but is accurate when it does predict positive
- C) The model is well-calibrated
- D) The model performs equally well on all classes

---

## Q106 (Scenario)
A data scientist is examining a residuals plot and notices that residuals are larger for extreme predicted values and smaller near the mean. The plot has a bow-tie or diamond shape. What is the most likely explanation?
- A) The model is perfectly specified
- B) There is heteroscedasticity, possibly indicating missing non-linear terms or a need for variance-stabilizing transformation
- C) The model has too many features
- D) The training data was too large

---

## Q107 (Single Answer)
What does the area under the Precision-Recall curve primarily measure?
- A) The model's performance on balanced datasets
- B) The model's ability to identify positive instances, especially useful for imbalanced datasets
- C) The computational efficiency of the model
- D) The model's training convergence speed

---

## Q108 (Scenario)
A data scientist has two classification models with similar AUC values (~0.92). Model A has precision=0.85 and recall=0.70, while Model B has precision=0.72 and recall=0.88. The business use case requires catching as many positive cases as possible (e.g., disease detection). Which model should they recommend?
- A) Model A, because it has higher precision
- B) Model B, because it has higher recall, meaning it catches more actual positive cases
- C) Either model, since the AUC values are similar
- D) Neither model, since neither achieves perfect scores

---

## Q109 (Single Answer)
What is feature impact (feature importance) in the context of model interpretation?
- A) The effect of adding new features to the dataset
- B) A measure of how much each feature contributes to the model's predictions
- C) The computational cost of processing each feature
- D) The correlation between each feature and every other feature

---

## Q110 (Scenario)
A data scientist trains a random forest model in Snowflake using Snowpark ML and wants to understand which features drive the model's predictions. Which approach should they use first?
- A) Remove all features and retrain to see if accuracy drops
- B) Examine the feature_importances_ attribute of the trained model
- C) Create a new model with only one feature at a time
- D) Calculate the correlation matrix of all features

---

## Q111 (Single Answer)
What is a partial dependence plot (PDP)?
- A) A plot showing the correlation between two features
- B) A plot showing the marginal effect of one or two features on the predicted outcome of a model, averaged over the other features
- C) A plot of model accuracy as a function of training data size
- D) A visualization of the confusion matrix

---

## Q112 (Multi Answer - Select 2)
Which TWO statements about partial dependence plots are correct? (Select 2)
- A) PDPs show the average effect of a feature on predictions, marginalizing over all other features
- B) PDPs can reveal non-linear relationships between a feature and the model's output
- C) PDPs can only be created for linear regression models
- D) PDPs show individual prediction explanations for each data point
- E) PDPs require the model to be retrained for each feature value

---

## Q113 (Scenario)
A data scientist observes a partial dependence plot for "customer_age" in a churn prediction model. The plot shows a flat line from age 20 to 50, then a sharp increase in predicted churn probability after age 50. What does this indicate?
- A) The model ignores the customer_age feature entirely
- B) Customer age has little effect on churn prediction for ages 20-50 but significantly increases churn probability for ages above 50
- C) The model is overfitting to older customers
- D) The feature should be removed from the model

---

## Q114 (Single Answer)
What are SHAP (SHapley Additive exPlanations) values?
- A) A metric for measuring model accuracy
- B) Values from game theory that assign each feature a contribution to the difference between the actual prediction and the average prediction
- C) The weights assigned to features during model training
- D) The p-values from statistical significance tests on features

---

## Q115 (Scenario)
A data scientist needs to compute SHAP values for a model trained in Snowflake. Which approach is recommended?
- A) Use a Snowflake SQL function called SHAP_VALUES()
- B) Write a Python stored procedure that loads the trained model and uses the SHAP library to compute explanations
- C) SHAP values are automatically computed when using Snowpark ML
- D) Use the EXPLAIN keyword in SQL before the prediction query

---

## Q116 (Multi Answer - Select 2)
Which TWO types of SHAP visualizations help explain model behavior? (Select 2)
- A) SHAP summary plot showing feature importance and direction of impact across all predictions
- B) SHAP residuals plot showing prediction errors
- C) SHAP force plot showing how features push a single prediction from the base value
- D) SHAP confusion matrix showing classification outcomes
- E) SHAP ROC curve showing threshold analysis

---

## Q117 (Single Answer)
What is the key difference between global feature importance and SHAP values?
- A) SHAP values only work with neural networks
- B) Global feature importance provides an aggregate measure, while SHAP values explain the contribution of each feature to each individual prediction
- C) SHAP values are faster to compute
- D) Global feature importance is model-agnostic while SHAP values require specific model types

---

## Q118 (Scenario)
A data scientist presents SHAP values for a loan approval model. For a specific denied application, the SHAP values show: income=-0.3, debt_ratio=+0.5, credit_score=-0.4, employment_years=-0.1. The base (average) prediction is 0.5 (50% approval chance). What is the predicted approval probability for this application?
- A) 0.7
- B) 0.2
- C) 0.3
- D) 0.5

---

## Q119 (Single Answer)
How do confidence intervals relate to model predictions?
- A) They measure the model's training time
- B) They provide a range around a prediction that indicates the uncertainty of the estimate
- C) They determine the optimal number of features
- D) They are only used in unsupervised learning

---

## Q120 (Multi Answer - Select 2)
Which TWO methods can be used to generate confidence intervals for model predictions in a Snowflake Python stored procedure? (Select 2)
- A) Bootstrapping — training multiple models on resampled data and using the distribution of predictions
- B) Using the CONFIDENCE() SQL function in Snowflake
- C) Quantile regression — training models to predict specific quantiles (e.g., 5th and 95th percentiles)
- D) Multiplying the prediction by the R-squared value
- E) Using the standard deviation of the feature values

---

## Q121 (Scenario)
A data scientist presents model predictions with 95% confidence intervals to stakeholders. A prediction of $500 with a confidence interval of [$350, $650] means:
- A) The model is 95% accurate
- B) Based on the model's uncertainty estimation, the true value is expected to fall between $350 and $650 approximately 95% of the time
- C) The model's error is exactly $150
- D) The prediction will change by up to $150 if the model is retrained

---

## Q122 (Single Answer)
In the context of model interpretation, what does a partial dependence plot's x-axis and y-axis represent?
- A) x-axis: training iteration; y-axis: loss function value
- B) x-axis: values of the feature being examined; y-axis: average predicted outcome
- C) x-axis: number of features; y-axis: model accuracy
- D) x-axis: actual values; y-axis: predicted values

---

## Q123 (Scenario)
A data scientist has computed SHAP values for all predictions of a model and creates a SHAP summary plot. The plot shows that the feature "account_balance" has the widest spread of SHAP values. What does this indicate?
- A) account_balance has missing values
- B) account_balance has the largest impact on model predictions across the dataset, with varying direction and magnitude
- C) account_balance should be removed because it creates noise
- D) account_balance is perfectly correlated with the target

---

## Q124 (Single Answer)
When building a Python stored procedure to compute SHAP values in Snowflake, which SHAP explainer type is most appropriate for tree-based models like XGBoost or Random Forest?
- A) shap.LinearExplainer
- B) shap.TreeExplainer
- C) shap.DeepExplainer
- D) shap.KernelExplainer

---

## Q125 (Multi Answer - Select 2)
Which TWO statements about confidence intervals for model predictions are correct? (Select 2)
- A) Wider confidence intervals indicate greater uncertainty in the prediction
- B) Confidence intervals guarantee that the true value always falls within the range
- C) Narrower confidence intervals suggest the model is more certain about the prediction
- D) Confidence intervals are only applicable to classification models
- E) The width of a confidence interval is independent of the amount of training data

---

## Q126 (Scenario)
A data scientist needs to explain to a non-technical stakeholder why the model denied a specific insurance claim. Which model interpretation technique provides the most intuitive explanation for an individual prediction?
- A) Global feature importance ranking
- B) SHAP force plot or waterfall chart showing how each feature pushed the prediction toward approval or denial
- C) The ROC curve for the overall model
- D) The average model accuracy metric

---

## Q127 (Single Answer)
What is the key limitation of permutation feature importance compared to SHAP values?
- A) Permutation importance cannot be computed for ensemble models
- B) Permutation importance only measures global feature importance and does not explain individual predictions
- C) Permutation importance is slower to compute
- D) Permutation importance requires retraining the model for each feature

---

## Q128 (Scenario)
A data scientist is building a credit risk model and regulators require that any automated decision be explainable at the individual applicant level. Which model interpretation approach meets this regulatory requirement?
- A) Reporting the overall model accuracy
- B) Computing SHAP values for each individual prediction to show feature-level contributions
- C) Showing the global feature importance ranking
- D) Providing the model's confusion matrix

---

## Q129 (Single Answer)
In a partial dependence plot for a feature in a classification model, what does the y-axis represent when the model outputs probabilities?
- A) The feature's statistical significance
- B) The average predicted probability as the feature value varies, holding all other features at their observed values
- C) The number of data points at each feature value
- D) The feature's correlation with the target variable

---

## Q130 (Multi Answer - Select 2)
Which TWO model interpretation methods are considered model-agnostic (can be applied to any model type)? (Select 2)
- A) SHAP KernelExplainer
- B) Gini importance from decision trees
- C) Partial dependence plots
- D) Coefficient values from linear regression
- E) Attention weights from transformer models

---

## Q131 (Scenario)
A data scientist is using Snowflake Cortex to analyze customer support emails. They want to first determine whether each email is positive, negative, or neutral, then summarize the negative emails. Which sequence of Cortex functions should they use?
- A) EMBED_TEXT_768 on all emails, then SUMMARIZE on the embeddings
- B) SENTIMENT on all emails to classify tone, then SUMMARIZE on emails identified as negative
- C) COMPLETE on all emails for classification and summarization in one call
- D) SUMMARIZE on all emails first, then SENTIMENT on the summaries

---

## Q132 (Single Answer)
When designing a Python UDF for model inference in Snowflake, what is the performance benefit of declaring the model loading in the UDF's top-level scope rather than inside the function body?
- A) It has no performance impact
- B) The model is loaded once when the UDF is initialized rather than reloaded for every row or batch, significantly reducing overhead
- C) It allows the UDF to access more memory
- D) It enables the UDF to write to stages

---

## Q133 (Scenario)
A data scientist is deciding between a scalar Python UDF and a vectorized Python UDF for scoring predictions. The model inference library supports batch predictions on numpy arrays. Which UDF type should they choose?
- A) Scalar UDF, because it processes one row at a time for better accuracy
- B) Vectorized UDF, because it receives pandas Series/DataFrame batches that can be converted to numpy arrays, leveraging batch inference
- C) Neither — they should use a stored procedure
- D) Scalar UDF, because vectorized UDFs do not support numpy

---

## Q134 (Multi Answer - Select 2)
Which TWO are valid considerations when choosing between a stored procedure and a UDF for a data science workflow in Snowflake? (Select 2)
- A) Stored procedures can execute multiple SQL statements and perform DDL/DML, while UDFs cannot
- B) UDFs can be used inline in SELECT statements, making them suitable for row-level transformations
- C) Stored procedures always run faster than UDFs
- D) UDFs can create and drop tables
- E) Stored procedures and UDFs have identical capabilities

---

## Q135 (Scenario)
A data scientist wants to use snowflake.cortex.Complete() to classify customer feedback into categories: "Product", "Service", "Shipping", and "Other". Which prompt engineering technique would produce the most reliable results?
- A) Simply ask "What category is this feedback?" with no context
- B) Provide a system prompt defining the categories, include few-shot examples of each category, and instruct the model to respond with only the category name
- C) Set the temperature to maximum for creative classification
- D) Use EMBED_TEXT_768 instead, as Complete() cannot classify text

---

## Q136 (Single Answer)
What is the maximum number of tokens typically accepted by Snowflake Cortex's SUMMARIZE function for input text?
- A) There is no practical limit — it summarizes any length
- B) The function has a model-specific context window limit for input text
- C) Exactly 100 tokens
- D) The limit is equal to the warehouse size

---

## Q137 (Scenario)
A data scientist is building a real-time scoring pipeline. New records arrive via a stream, a task detects new data and triggers a stored procedure, and the stored procedure calls a UDF to score each record. Which components form this pipeline?
- A) Stream → Dynamic Table → View
- B) Stream → Task (with SYSTEM$STREAM_HAS_DATA) → Stored Procedure → UDF
- C) External Function → Stage → Table
- D) Dynamic Table → Stream → External Function

---

## Q138 (Multi Answer - Select 2)
Which TWO approaches allow training machine learning models outside of Snowflake while keeping data in Snowflake? (Select 2)
- A) External functions that call remote ML training APIs
- B) Snowpark ML local mode that trains entirely on the client
- C) Downloading data via the Python connector and training locally
- D) Using Snowflake tasks to trigger external services via notifications and external functions
- E) Dynamic tables that automatically train models

---

## Q139 (Single Answer)
When implementing k-fold cross-validation in Snowpark Python, what is the most efficient way to create the fold assignments?
- A) Export the data to pandas, assign folds locally, and re-upload to Snowflake
- B) Use Snowpark DataFrame operations with a window function and NTILE to assign fold numbers, keeping computation in Snowflake
- C) Create k separate copies of the full table
- D) Use a JavaScript UDF to generate random fold assignments

---

## Q140 (Scenario)
A data scientist is evaluating whether to use AUC or log loss as the optimization metric for a binary classification model that outputs probability scores used for risk pricing. Which metric is more appropriate?
- A) AUC, because it measures overall ranking ability
- B) Log loss, because it penalizes poorly calibrated probability estimates, which is critical for pricing decisions
- C) Accuracy, because it is the simplest metric
- D) RMSE, because the model outputs continuous probabilities

---

## Q141 (Single Answer)
In the context of Snowflake data science pipelines, what is the relationship between streams and tasks?
- A) Streams replace tasks for scheduling purposes
- B) Streams track changes on tables, while tasks can use SYSTEM$STREAM_HAS_DATA to conditionally execute when new change data is available
- C) Tasks create streams automatically
- D) Streams and tasks are the same object with different names

---

## Q142 (Scenario)
A data scientist has a trained XGBoost model and wants to generate confidence intervals for predictions. The model itself does not natively support prediction intervals. Which technique can they implement in a Snowflake Python stored procedure?
- A) Use the model's predict_proba method to get intervals
- B) Implement bootstrapping — train multiple models on resampled data and use the distribution of predictions to construct intervals
- C) Divide the prediction by 2 to get the lower bound and multiply by 2 for the upper bound
- D) Use SHAP values as confidence intervals

---

## Q143 (Multi Answer - Select 2)
Which TWO are advantages of using Snowflake dynamic tables over Snowflake tasks for data transformation pipelines? (Select 2)
- A) Dynamic tables are declarative — you define the desired result and Snowflake manages the refresh schedule
- B) Dynamic tables can call external functions
- C) Dynamic tables automatically handle dependency ordering between transformations
- D) Dynamic tables can execute stored procedures
- E) Dynamic tables allow imperative multi-step logic within a single definition

---

## Q144 (Single Answer)
What happens when a Snowflake task with a WHEN SYSTEM$STREAM_HAS_DATA('my_stream') condition is scheduled to run but the stream has no new data?
- A) The task executes with an empty result set
- B) The task is skipped for that scheduled run
- C) The task fails with an error
- D) The task consumes credits but performs no work

---

## Q145 (Scenario)
A data scientist needs to compute SHAP values for 1 million predictions. Computing SHAP values for each prediction takes approximately 0.1 seconds. To process this in Snowflake, which approach minimizes wall-clock time?
- A) Write a stored procedure that loops through all predictions sequentially
- B) Create a vectorized Python UDF that computes SHAP values in batches and apply it across the table using a multi-cluster warehouse
- C) Export all data and compute SHAP values on a local machine
- D) Use Snowflake Cortex's built-in SHAP function

---

## Q146 (Single Answer)
When selecting an optimization metric for a multi-class classification problem, which metric generalizes binary log loss?
- A) Binary cross-entropy
- B) Categorical cross-entropy (multi-class log loss)
- C) RMSE
- D) AUC-ROC (binary only)

---

## Q147 (Multi Answer - Select 2)
Which TWO are true about distributed model training using Python UDFs and UDTFs in Snowflake? (Select 2)
- A) Using PARTITION BY with a UDTF allows Snowflake to distribute training across multiple warehouse nodes
- B) Scalar Python UDFs automatically parallelize model training
- C) A Python UDTF can accumulate rows in the process method and train in end_partition, enabling per-partition training
- D) Distributed training in Snowflake requires Snowpark Container Services for all use cases
- E) Python UDFs and UDTFs share state across partitions for global model aggregation

---

## Q148 (Scenario)
A data scientist is fine-tuning a Snowflake Cortex model and needs to evaluate the fine-tuned model's performance compared to the base model. Which approach is most appropriate?
- A) Compare the token count of responses from each model
- B) Create a held-out evaluation dataset, run both models on it, and compare task-specific metrics (e.g., accuracy for classification, ROUGE for summarization)
- C) Compare the training time of the fine-tuning job
- D) Check which model generates longer responses

---

## Q149 (Single Answer)
In Snowflake, what is the correct way to handle model dependencies (e.g., a trained model pickle file) in a Python UDF?
- A) Download the model from the internet each time the UDF is called
- B) Upload the model file to a Snowflake stage and reference it in the UDF's IMPORTS clause
- C) Embed the model bytes as a string literal in the UDF code
- D) Store the model in a Snowflake user variable

---

## Q150 (Scenario)
A data scientist notices that their classification model's precision-recall curve has a sharp drop at low recall values. What does this suggest?
- A) The model achieves high precision only when making very few positive predictions (high threshold), and precision drops as more positive predictions are made
- B) The model is perfectly calibrated
- C) The model should use RMSE as the evaluation metric
- D) The training data has no class imbalance

---

## Q151 (Multi Answer - Select 2)
Which TWO components are necessary to create a task-based automated retraining pipeline in Snowflake? (Select 2)
- A) A Snowflake stream to track new data in the training table
- B) A task with a WHEN condition using SYSTEM$STREAM_HAS_DATA and a call to the training stored procedure
- C) An external scheduler like Apache Airflow (required)
- D) A materialized view over the training data
- E) A Java UDF to parse the stream metadata

---

## Q152 (Scenario)
A data scientist is training a gradient boosting model and wants to select the best combination of learning_rate and n_estimators. They have limited compute budget. Which hyperparameter tuning strategy should they prefer?
- A) Grid search over a very fine grid of both parameters
- B) Random search with a specified budget of N iterations, as it efficiently explores the parameter space without evaluating all combinations
- C) Manually setting parameters based on intuition
- D) Training with default parameters only

---

## Q153 (Single Answer)
What is the role of the process() method in a Python UDTF?
- A) It initializes the UDTF's state variables
- B) It is called once for each input row, allowing the UDTF to accumulate data or emit rows
- C) It is called once after all rows in a partition are processed
- D) It defines the output schema of the UDTF

---

## Q154 (Scenario)
A data scientist needs to implement a Snowflake pipeline where: (1) raw data is cleaned automatically, (2) features are computed when clean data is available, and (3) a model is retrained when sufficient new features accumulate. Which architecture best fits these requirements?
- A) Three independent stored procedures scheduled with cron-based tasks
- B) Dynamic tables for steps 1 and 2 (declarative cleaning and feature engineering), plus a stream on the feature table with a task that triggers a training stored procedure when new data is detected
- C) A single stored procedure that performs all three steps sequentially
- D) External functions for all three steps

---

## Q155 (Multi Answer - Select 2)
Which TWO are benefits of using the Snowpark ML library (snowflake.ml.modeling) over manually implementing ML algorithms with raw Snowpark DataFrames? (Select 2)
- A) Snowpark ML provides scikit-learn compatible APIs that abstract away distributed execution details
- B) Snowpark ML eliminates the need for any feature preprocessing
- C) Snowpark ML handles model serialization and can integrate with Snowflake's model registry
- D) Snowpark ML guarantees 100% accuracy on all models
- E) Snowpark ML removes the need for hyperparameter tuning
