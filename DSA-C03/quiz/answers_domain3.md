# Domain 3: Answers

---

## Q1
**Answer: D**

**Explanation:** Snowflake natively supports Python, Java, and Scala for writing UDFs. R is not a natively supported language for Snowflake UDFs. While R is a popular data science language, Snowflake's UDF framework does not include an R runtime.

**Source:** [Snowflake UDF Language Support](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "You can write the handler for a user-defined function (UDF) in any of the following languages: Java, JavaScript, Python, Scala, SQL."

---

## Q2
**Answer: B**

**Explanation:** The Snowflake Python Connector with Pandas support uses the `fetch_pandas_all()` and `fetch_pandas_batches()` methods to transfer data directly into pandas DataFrames using Apache Arrow for efficient columnar data transfer. This is significantly faster than fetching rows individually. Option A describes stored procedures (unrelated), and Option C describes Cortex (a separate feature).

**Source:** [Using the Python Connector with Pandas DataFrames](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-pandas)

**Quote:** "The Snowflake Connector for Python provides an API method for fetching query results into pandas DataFrames."

---

## Q3
**Answer: B**

**Explanation:** The Snowflake Extension for Visual Studio Code provides an integrated development experience for working with Snowflake, including connecting to Snowflake, executing queries, and developing Snowpark code within VS Code. Using the CLI alone (A) or SnowSQL (D) lacks the rich IDE integration, and exporting to CSV (D) defeats the purpose of in-platform development.

**Source:** [Snowflake Extension for Visual Studio Code](https://docs.snowflake.com/en/user-guide/vscode-ext)

**Quote:** "The Snowflake Extension for Visual Studio Code provides an interface for interacting with Snowflake, letting you write and execute SQL statements, write Snowpark Python, and manage your connection to Snowflake."

---

## Q4
**Answer: B**

**Explanation:** In Snowpark Python, you create a session using `Session.builder.configs(connection_parameters).create()`. Option A (`snowflake.connector.connect()`) is the standard Python Connector, not Snowpark. Options C and D are not valid Snowpark APIs.

**Source:** [Creating a Session for Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-session)

**Quote:** "To create a session, use the builder property of the Session class to get a SessionBuilder object, then call the configs method to set connection parameters, and then call the create method."

---

## Q5
**Answer: B**

**Explanation:** Snowpark Python allows the data scientist to work with data in Snowflake using a DataFrame API, and the Snowpark ML modeling module provides scikit-learn compatible estimators that execute training within Snowflake's compute infrastructure without extracting data. Options A and C do not provide ML-native Python capabilities, and Option D requires extracting data locally.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "The Snowpark ML Modeling package provides estimators and transformers that have APIs similar to those in the scikit-learn, xgboost, and lightgbm libraries."

---

## Q6
**Answer: A, B**

**Explanation:** Snowpark Python's `Session.builder` (A) and the Snowflake Python Connector's `fetch_pandas_all()` (B) are the two standard, supported methods for connecting Python to Snowflake data. Direct filesystem access to internal stages (C) is not supported from external Python. There is no MySQL-compatible endpoint (D), and while the REST API exists (E), it is not limited to OAuth only and is not the typical data science connector.

**Source:** [Snowflake Python Connector Overview](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector)

**Quote:** "The Snowflake Connector for Python provides an interface for developing Python applications that can connect to Snowflake and perform all standard operations."

---

## Q7
**Answer: B**

**Explanation:** The `snowflake.ml.modeling` module contains implementations of scikit-learn compatible estimators and transformers that run within Snowflake. This is the module that provides classes like `StandardScaler`, `RandomForestClassifier`, etc. Options A, C, and D are not the correct module names for this functionality.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "The snowflake.ml.modeling package provides estimators and transformers that have APIs similar to those in the scikit-learn, xgboost, and lightgbm libraries."

---

## Q8
**Answer: C**

**Explanation:** Python Worksheets in Snowflake Snowsight require a handler function that returns a result convertible to a DataFrame or a string-like value. This is a structural requirement specific to the worksheet environment. Python Worksheets can access tables (A is wrong), support Anaconda packages (B is wrong), and do use the Snowpark Session object (D is wrong).

**Source:** [Writing Python Worksheets](https://docs.snowflake.com/en/developer-guide/snowpark/python/python-worksheets)

**Quote:** "The handler function can return a value that is a DataFrame, or a value that can be cast to a string."

---

## Q9
**Answer: D**

**Explanation:** Snowflake supports stored procedures written in Python, Java, Scala, SQL, and JavaScript. This provides broad language support for procedural logic. Option A excludes SQL and JavaScript. Option B excludes Java, Scala, and JavaScript. Option C excludes SQL.

**Source:** [Stored Procedures Overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview)

**Quote:** "You can write the handler for a stored procedure in any of the following languages: Java, JavaScript, Python, Scala, Snowflake Scripting (SQL)."

---

## Q10
**Answer: A, C**

**Explanation:** Snowflake supports Python, Java, JavaScript, Scala, and SQL as UDF languages. R (B), C++ (D), and Ruby (E) are not supported UDF runtimes. Python and Java are two of the most commonly used languages for data science UDFs.

**Source:** [UDF Overview](https://docs.snowflake.com/en/developer-guide/udf/udf-overview)

**Quote:** "You can write the handler for a user-defined function (UDF) in any of the following languages: Java, JavaScript, Python, Scala, SQL."

---

## Q11
**Answer: A**

**Explanation:** Installing the Snowflake Extension for VS Code and configuring a connection profile allows interactive data exploration, Snowpark development, and UDF testing all within the IDE. Option B lacks integration, Option C limits to Java/SQL, and Option D (SnowSQL CLI) does not provide the rich interactive experience of the extension.

**Source:** [Snowflake Extension for Visual Studio Code](https://docs.snowflake.com/en/user-guide/vscode-ext)

**Quote:** "The Snowflake Extension for Visual Studio Code provides an interface for interacting with Snowflake, letting you write and execute SQL statements, write Snowpark Python, and manage your connection to Snowflake."

---

## Q12
**Answer: B**

**Explanation:** The `fetch_pandas_all()` method on the cursor object retrieves the entire result set as a pandas DataFrame. `fetchall()` (A) returns a list of tuples, not a DataFrame. Options C and D are not valid methods on the Snowflake connector cursor.

**Source:** [Python Connector Pandas Integration](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-pandas)

**Quote:** "To retrieve the results of a query as a pandas DataFrame, use the fetch_pandas_all() method."

---

## Q13
**Answer: C**

**Explanation:** Both `session.sql("SELECT * FROM table")` and `session.table("table_name")` are valid ways to reference a table and return a Snowpark DataFrame. The `sql()` method executes arbitrary SQL, while `table()` creates a DataFrame from a table reference. Option D is not valid Snowpark syntax.

**Source:** [Working with DataFrames in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "To create a DataFrame from a table, view, or stream in Snowflake, call the table method."

---

## Q14
**Answer: B**

**Explanation:** `StandardScaler` is the class used for standardization (zero mean, unit variance) in the Snowpark ML preprocessing module, mirroring the scikit-learn API. `MinMaxScaler` (A) scales to a range, `RobustScaler` (C) uses median and interquartile range, and `Normalizer` (D) normalizes samples individually.

**Source:** [Snowpark ML Preprocessing](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#preprocessing)

**Quote:** "The snowflake.ml.modeling.preprocessing module provides transformers for feature preprocessing, including StandardScaler, MinMaxScaler, and others."

---

## Q15
**Answer: B**

**Explanation:** `EMBED_TEXT_768` is the Snowflake Cortex function that generates 768-dimensional vector embeddings from text data. Options A, C, and D are not valid Snowflake Cortex function names.

**Source:** [Snowflake Cortex EMBED_TEXT_768](https://docs.snowflake.com/en/sql-reference/functions/embed_text_768-snowflake-cortex)

**Quote:** "Produces a vector embedding of 768 dimensions for the given English-language text."

---

## Q16
**Answer: C**

**Explanation:** As indicated by its name, `EMBED_TEXT_768` produces vectors with 768 dimensions. This is a standard embedding dimension size used in many transformer-based models.

**Source:** [Snowflake Cortex EMBED_TEXT_768](https://docs.snowflake.com/en/sql-reference/functions/embed_text_768-snowflake-cortex)

**Quote:** "Produces a vector embedding of 768 dimensions for the given English-language text."

---

## Q17
**Answer: B**

**Explanation:** Snowflake Cortex provides a task-specific `SENTIMENT` function that can be called directly in SQL, making it the most efficient approach for analyzing millions of rows without data movement. Exporting data (A) adds latency and complexity. A custom UDF with BERT (C) requires managing model dependencies. Snowpark ML does not have a built-in sentiment classifier (D).

**Source:** [Snowflake Cortex SENTIMENT](https://docs.snowflake.com/en/sql-reference/functions/sentiment-snowflake-cortex)

**Quote:** "Returns a sentiment score, from -1 to 1, for the given English-language input text."

---

## Q18
**Answer: B**

**Explanation:** `SUMMARIZE` is the Snowflake Cortex function for text summarization. Options A, C, and D are not valid Cortex function names.

**Source:** [Snowflake Cortex SUMMARIZE](https://docs.snowflake.com/en/sql-reference/functions/summarize-snowflake-cortex)

**Quote:** "Returns a summary of the given English-language input text."

---

## Q19
**Answer: A, C**

**Explanation:** `SUMMARIZE` and `SENTIMENT` are task-specific LLM functions available in Snowflake Cortex. `TOKENIZE` (B), `SPELL_CHECK` (D), and `TRANSLATE_TEXT` (E) are not Cortex task-specific function names. Note: Cortex does have `TRANSLATE`, but the option lists `TRANSLATE_TEXT` which is not the correct name.

**Source:** [Snowflake Cortex LLM Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)

**Quote:** "Snowflake Cortex provides task-specific LLM functions including COMPLETE, EXTRACT_ANSWER, SENTIMENT, SUMMARIZE, and TRANSLATE."

---

## Q20
**Answer: B**

**Explanation:** `snowflake.cortex.Complete()` is the function for generating custom text completions using LLMs in Snowflake Cortex. Options A, C, and D are not valid Cortex function names.

**Source:** [Snowflake Cortex Complete](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "Generates a completion for a given prompt using the specified language model."

---

## Q21
**Answer: B**

**Explanation:** The temperature parameter controls the randomness or creativity of the LLM's output. A lower temperature produces more deterministic responses, while a higher temperature produces more varied and creative responses. It does not control token count (A), processing speed (C), or number of candidates (D).

**Source:** [Snowflake Cortex Complete](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "temperature — A value from 0 to 1 (inclusive) that controls the randomness of the output of the language model. A higher temperature (e.g., 0.7) results in more diverse and creative output, while a lower temperature (e.g., 0.2) makes the output more deterministic and focused."

---

## Q22
**Answer: B**

**Explanation:** Snowflake Cortex fine-tuning allows customizing a pre-trained LLM with company-specific training data so it better understands domain terminology and produces more accurate results. Prompt engineering (A) can help but doesn't truly adapt the model. A custom UDF (C) requires managing infrastructure. Increasing temperature (D) increases randomness, not accuracy.

**Source:** [Snowflake Cortex Fine-tuning](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-finetuning)

**Quote:** "Fine-tuning a large language model (LLM) customizes a pre-trained model by training it further on a task-specific dataset."

---

## Q23
**Answer: B**

**Explanation:** Fine-tuning adapts a pre-trained LLM to perform better on domain-specific tasks using custom training data, preserving the base model's general capabilities while specializing it. It does not primarily reduce cost (A), change architecture (C), or modify context window size (D).

**Source:** [Snowflake Cortex Fine-tuning](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-finetuning)

**Quote:** "Fine-tuning a large language model (LLM) customizes a pre-trained model by training it further on a task-specific dataset."

---

## Q24
**Answer: B, C**

**Explanation:** Snowflake Cortex provides fine-tuning of pre-trained models with custom data (B) and task-specific functions like sentiment analysis and summarization (C). Cortex does not support training LLMs from scratch (A), deploying custom PyTorch models as Cortex endpoints (D), or running RLHF loops (E).

**Source:** [Snowflake Cortex LLM Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)

**Quote:** "Snowflake Cortex gives you instant access to industry-leading large language models (LLMs) trained by researchers at companies like Mistral, Meta, and Google, including task-specific functions."

---

## Q25
**Answer: B**

**Explanation:** Using `snowflake.cortex.Complete()` with a prompt that includes the predefined categories and asks the model to classify each ticket is the most appropriate approach for text classification with Cortex. Embedding + clustering (A) is unsupervised and won't map to predefined categories. SUMMARIZE (C) reduces text but doesn't classify. Exporting (D) is unnecessary.

**Source:** [Snowflake Cortex Complete](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "Generates a completion for a given prompt using the specified language model."

---

## Q26
**Answer: B**

**Explanation:** `EMBED_TEXT_768` accepts text strings (VARCHAR) as input and produces vector embeddings. It does not accept numeric arrays (A), binary image data (C), or structured JSON only (D).

**Source:** [Snowflake Cortex EMBED_TEXT_768](https://docs.snowflake.com/en/sql-reference/functions/embed_text_768-snowflake-cortex)

**Quote:** "Produces a vector embedding of 768 dimensions for the given English-language text."

---

## Q27
**Answer: B**

**Explanation:** Creating vector embeddings with `EMBED_TEXT_768` and then performing vector similarity search is the standard approach for semantic search. SUMMARIZE + LIKE (A) loses semantic meaning. Complete() for rewriting (C) is wasteful. Fine-tuning + SENTIMENT (D) is not designed for search.

**Source:** [Snowflake Cortex EMBED_TEXT_768](https://docs.snowflake.com/en/sql-reference/functions/embed_text_768-snowflake-cortex)

**Quote:** "Produces a vector embedding of 768 dimensions for the given English-language text."

---

## Q28
**Answer: C**

**Explanation:** `Complete()` with an extraction prompt is the most appropriate for extracting structured information (names, dates, amounts) from unstructured text, as it allows custom prompts specifying the extraction task. SUMMARIZE (A) condenses text but doesn't extract structured fields. SENTIMENT (B) only returns a score. EMBED_TEXT_768 (D) produces vectors, not structured data.

**Source:** [Snowflake Cortex Complete](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "Generates a completion for a given prompt using the specified language model."

---

## Q29
**Answer: A, C**

**Explanation:** `Complete()` can generate SQL from natural language (A) and extract structured data from unstructured text via prompt engineering (C). Creating embeddings (B) is done by EMBED_TEXT_768, not Complete(). Complete() does not perform model training (D) or statistical aggregations (E).

**Source:** [Snowflake Cortex Complete](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "Generates a completion for a given prompt using the specified language model."

---

## Q30
**Answer: B**

**Explanation:** Snowflake Cortex fine-tuning expects training data as a table or view with prompt-completion pairs in designated columns. It does not require a CSV with features/labels (A), an arbitrary JSON file (C), or a parquet file with embeddings (D).

**Source:** [Snowflake Cortex Fine-tuning](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-finetuning)

**Quote:** "Your training data must be in a Snowflake table or view with a column for the prompt and a column for the completion."

---

## Q31
**Answer: B**

**Explanation:** Task-specific functions like SENTIMENT and SUMMARIZE are pre-optimized for their specific tasks, require no prompt engineering, and typically run faster than general-purpose Complete() calls. They don't necessarily support more languages (A), can't process images (C), and don't support fine-tuning (D).

**Source:** [Snowflake Cortex LLM Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)

**Quote:** "Snowflake Cortex provides task-specific LLM functions that are optimized for specific tasks such as sentiment analysis, summarization, and translation."

---

## Q32
**Answer: B**

**Explanation:** Fine-tuning in Snowflake Cortex creates a new fine-tuned model while the original base model remains unchanged. This is a non-destructive process. The base model is not permanently modified (A), not replaced (C), and weights are not updated in place (D).

**Source:** [Snowflake Cortex Fine-tuning](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-finetuning)

**Quote:** "Fine-tuning creates a new custom model based on the selected base model and your training data."

---

## Q33
**Answer: B**

**Explanation:** Including a system prompt with explicit output format instructions and providing few-shot examples in the user prompt is the most effective technique for ensuring consistent structured output. Maximum temperature (A) increases randomness. Short prompts (C) provide less guidance. Picking the longest response (D) is arbitrary and wasteful.

**Source:** [Snowflake Cortex Complete](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "Generates a completion for a given prompt using the specified language model."

---

## Q34
**Answer: B**

**Explanation:** `SNOWFLAKE.CORTEX.SUMMARIZE(description)` is the correct SQL syntax for using the task-specific summarization function. Option A uses incorrect function path syntax. Option C generates embeddings, not summaries. Option D performs sentiment analysis.

**Source:** [Snowflake Cortex SUMMARIZE](https://docs.snowflake.com/en/sql-reference/functions/summarize-snowflake-cortex)

**Quote:** "Returns a summary of the given English-language input text."

---

## Q35
**Answer: B, C**

**Explanation:** Fine-tuning creates a custom model adapted to domain-specific data (B), and fine-tuned models are scoped to the account where they were created (C). Fine-tuning does not require base model source code (A), does not permanently modify the base model (D), and does not eliminate the need for prompt engineering entirely (E).

**Source:** [Snowflake Cortex Fine-tuning](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-finetuning)

**Quote:** "Fine-tuning creates a new custom model based on the selected base model and your training data."

---

## Q36
**Answer: B**

**Explanation:** A dynamic table in Snowflake is a declarative table whose contents are defined by a SQL query and are automatically refreshed based on a target lag, enabling automated data transformation pipelines. It does not auto-adjust schema (A), is not session-scoped like temporary tables (C), and does not dynamically scale storage (D).

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "A dynamic table is a new type of Snowflake table that is defined by a query. The results of the query become the contents of the table, which Snowflake automatically refreshes."

---

## Q37
**Answer: B**

**Explanation:** Dynamic tables with a defined target lag automatically refresh transformed data when base table data changes, making them ideal for automated feature engineering pipelines. A view (A) recomputes on every query. Manual scheduling (C) is not event-driven. Temporary tables (D) don't persist.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "A dynamic table is a new type of Snowflake table that is defined by a query. The results of the query become the contents of the table, which Snowflake automatically refreshes."

---

## Q38
**Answer: B**

**Explanation:** `SYSTEM$STREAM_HAS_DATA()` returns a Boolean value indicating whether a stream contains change data capture (CDC) records that have not yet been consumed. It does not return row counts (A), timestamps (C), or table lists (D).

**Source:** [SYSTEM$STREAM_HAS_DATA](https://docs.snowflake.com/en/sql-reference/functions/system_stream_has_data)

**Quote:** "Indicates whether a specified stream contains change data capture (CDC) records."

---

## Q39
**Answer: A, B**

**Explanation:** Tasks with a WHEN clause using `SYSTEM$STREAM_HAS_DATA()` (A) and dynamic tables with target lag (B) are both Snowflake features designed for event-driven data processing. Materialized views (C) don't support arbitrary transformations. External tables with auto-refresh (D) handle ingestion but not pipeline orchestration. Time-travel queries (E) are for historical data access, not pipeline triggers.

**Source:** [Tasks Overview](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can be used to schedule the execution of a SQL statement, stored procedure, or Snowflake Scripting block. Tasks can be combined with table streams for continuous ELT workflows."

---

## Q40
**Answer: B**

**Explanation:** The correct syntax uses `WHEN SYSTEM$STREAM_HAS_DATA('stream_name')` as a conditional trigger. Option A is a cron schedule without stream-based triggering. Options C and D use invalid SQL syntax for task creation.

**Source:** [CREATE TASK](https://docs.snowflake.com/en/sql-reference/sql/create-task)

**Quote:** "WHEN boolean_expr — Specifies a Boolean SQL expression; the task runs only when this expression evaluates to TRUE. Common usage includes SYSTEM$STREAM_HAS_DATA."

---

## Q41
**Answer: B**

**Explanation:** Python UDFs are called inline within SQL queries and applied row-by-row (or batch-by-batch for vectorized UDFs), making them ideal for scoring. Stored procedures are invoked with CALL and return a single result. UDFs cannot modify database state (A is reversed). Both support similar packages (C). Parallelization is a warehouse capability for both (D is misleading).

**Source:** [Python UDF Overview](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-introduction)

**Quote:** "A user-defined function (UDF) is a function you create that can be called from SQL in the same way that you call built-in functions."

---

## Q42
**Answer: B**

**Explanation:** A vectorized Python UDF processes batches of rows using pandas Series, which is significantly more efficient for large datasets than row-by-row processing. A stored procedure iterating over rows (A) is slow. Exporting (C) adds overhead. A JavaScript UDF (D) cannot natively call a scikit-learn model.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as pandas DataFrames or pandas Series and return batches of results as pandas DataFrames or pandas Series."

---

## Q43
**Answer: A**

**Explanation:** A UDF returns a single scalar value per input row, while a UDTF (User-Defined Table Function) can return multiple rows (a tabular result) per input row. Both run in Python (B is wrong). Both can access stages (C is wrong). Both can be permanent or temporary (D is wrong).

**Source:** [Python UDTF Overview](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions)

**Quote:** "A user-defined table function (UDTF) returns tabular results for each input row."

---

## Q44
**Answer: A, C**

**Explanation:** UDTFs can generate multiple output rows per input (like prediction intervals) (A), and training within a UDTF's partition processing is a valid pattern where the process method accumulates data and end_partition outputs results (C). UDTFs cannot modify schemas (B), create/drop tables (D), or replace task scheduling (E).

**Source:** [Python UDTF Overview](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions)

**Quote:** "A user-defined table function (UDTF) returns tabular results for each input row."

---

## Q45
**Answer: B**

**Explanation:** Using a Python UDTF with `PARTITION BY customer_segment` distributes the data so each partition is processed independently, enabling parallel model training across segments on Snowflake's distributed compute. A sequential stored procedure (A) doesn't leverage parallelism. Exporting to CSV (C) loses in-platform benefits. Separate tasks per segment (D) is cumbersome and harder to manage.

**Source:** [Python UDTF Overview](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions)

**Quote:** "A user-defined table function (UDTF) returns tabular results for each input row."

---

## Q46
**Answer: D**

**Explanation:** In Snowpark Python, stored procedures are registered using `session.sproc.register()` or the `@sproc` decorator from the `snowflake.snowpark.functions` module. However, the most general and commonly documented method is `session.sproc.register()`. Option B (`@sproc`) is also used but as a convenience; the explicit registration via the session object (D) is the primary documented approach for registering procedures programmatically.

**Source:** [Creating Stored Procedures in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-sprocs)

**Quote:** "You can register a stored procedure by using the Session.sproc.register method or the sproc function."

---

## Q47
**Answer: A**

**Explanation:** Creating three dynamic tables where each references the output of the previous one forms a DAG (directed acyclic graph) of transformations that automatically refreshes when upstream data changes. A single stored procedure (B) lacks automatic refresh. Independent tasks (C) have no dependencies. Materialized views (D) have limited transformation capabilities.

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "You can chain dynamic tables together to form a pipeline of transformations, creating a directed acyclic graph (DAG)."

---

## Q48
**Answer: B**

**Explanation:** The `target_lag` parameter specifies the maximum acceptable staleness of the dynamic table's data relative to its base tables. It defines how fresh the data should be. It is not about query execution time (A), network latency (C), or auto-dropping (D).

**Source:** [Dynamic Tables](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "The target lag specifies the maximum amount of time that the dynamic table's content should lag behind updates to the base tables."

---

## Q49
**Answer: A, D**

**Explanation:** Python stored procedures can read and write data to Snowflake tables (A) using the Snowpark Session, and they can import packages from the Snowflake Anaconda channel (D). Stored procedures can return tabular results (B is wrong). They run with owner's rights by default (C is wrong). They do use the Snowpark Session object (E is wrong).

**Source:** [Creating Stored Procedures in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-sprocs)

**Quote:** "You can use the Snowpark library within a stored procedure to perform queries, updates, and other work on tables in Snowflake."

---

## Q50
**Answer: B**

**Explanation:** A Python stored procedure is the right choice because it supports multi-statement operations including reading from multiple tables, writing models to stages, and logging metrics to results tables. UDFs (A) are designed for row-level transformations and cannot perform multi-statement write operations. UDTFs (C) are for tabular output, not orchestration. External functions (D) are not necessary for stage writes.

**Source:** [Creating Stored Procedures in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-sprocs)

**Quote:** "You can use the Snowpark library within a stored procedure to perform queries, updates, and other work on tables in Snowflake."

---

## Q51
**Answer: B**

**Explanation:** Grid search exhaustively evaluates all combinations of specified hyperparameter values. It is not about data split ratios (A), feature selection (C), or just training epochs (D). Grid search is a brute-force approach that tests every possible combination from the parameter grid.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Grid search cross-validation evaluates all combinations of the specified hyperparameter values."

---

## Q52
**Answer: C**

**Explanation:** Grid search evaluates all combinations: 3 learning_rate values x 3 max_depth values = 9 total configurations. It is the Cartesian product of all hyperparameter values. Option A (3) only counts one parameter. Option B (6) sums them. Option D (27) incorrectly cubes the count.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Grid search cross-validation evaluates all combinations of the specified hyperparameter values."

---

## Q53
**Answer: B**

**Explanation:** Random search samples hyperparameter combinations randomly from specified ranges, allowing it to explore a much larger space more efficiently than grid search, which exhaustively evaluates every combination. Option A is wrong because random search does not guarantee finding the global optimum. Option C is wrong because the computational cost per model evaluation is the same — the difference is in how many combinations are evaluated.

**Source:** [Hyperparameter Tuning with Snowpark ML](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "GridSearchCV exhaustively searches over specified parameter values, while RandomizedSearchCV samples a given number of candidates from a parameter space with a specified distribution."

---

## Q54
**Answer: A, C**

**Explanation:** Grid search and random search are the two standard hyperparameter tuning strategies implementable in Snowpark Python stored procedures. Grid search evaluates all combinations in a predefined parameter grid, while random search samples a specified number of iterations. Option B is wrong because automatic architecture search that changes model types is not a standard hyperparameter tuning strategy. Option D relates to infrastructure, not model tuning.

**Source:** [Hyperparameter Tuning with Snowpark ML](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "The snowflake.ml.modeling.model_selection package includes GridSearchCV and RandomizedSearchCV for tuning hyperparameters."

---

## Q55
**Answer: B**

**Explanation:** With only 0.5% fraud cases, the dataset is highly imbalanced. Accuracy would be misleading — a model predicting "no fraud" every time would achieve 99.5% accuracy. AUC evaluates the model's ability to distinguish between classes across all thresholds, making it robust to class imbalance. MSE (C) and R-squared (D) are regression metrics, not suitable for classification.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "AUC represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example."

---

## Q56
**Answer: B**

**Explanation:** Log loss penalizes confident wrong predictions heavily, making it the preferred metric when well-calibrated probability estimates matter (e.g., predicting the actual probability of an event). AUC only measures ranking ability — whether positive examples are scored higher than negatives — without caring about calibration. Option A describes the opposite: when ranking is sufficient, AUC is preferred.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "Log loss measures the performance of a classification model where the prediction is a probability value between 0 and 1."

---

## Q57
**Answer: B**

**Explanation:** RMSE squares the errors before averaging, which means larger errors contribute disproportionately more to the final metric. This makes RMSE more sensitive to large errors compared to MAE, which treats all errors linearly, or Median Absolute Error, which is robust to outliers. R-squared measures variance explained rather than error magnitude.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "Root mean squared error gives a relatively high weight to large errors because the errors are squared before they are averaged."

---

## Q58
**Answer: B, D**

**Explanation:** Log loss and AUC are both classification metrics. Log loss evaluates calibrated probability predictions, while AUC measures the model's ability to rank positive examples above negative ones. RMSE (A), R-squared (C), and Mean Absolute Percentage Error (E) are regression metrics and are not appropriate for classification problems.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "Classification models are evaluated using metrics such as AUC and log loss."

---

## Q59
**Answer: C**

**Explanation:** RMSE takes the square root of the mean squared error, bringing the metric back to the same units as the target variable. MSE (A) is in squared units (e.g., kWh²), making it harder to interpret. R-squared (B) is unitless (a proportion of variance explained). Log loss (D) is a classification metric.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "RMSE is expressed in the same units as the target variable, making it directly interpretable."

---

## Q60
**Answer: A**

**Explanation:** K-fold cross-validation splits the dataset into k equal-sized folds. In each iteration, one fold is held out for validation while the remaining k-1 folds are used for training. This process repeats k times so every data point is used for validation exactly once. Option B describes model selection, not cross-validation. Option C describes feature selection.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "Cross-validation splits the data into k folds, training on k-1 folds and validating on the remaining fold, rotating through all folds."

---

## Q61
**Answer: B**

**Explanation:** With 10,000 records and 5-fold CV: each fold contains 10,000 / 5 = 2,000 records. In each iteration, one fold is the validation set and 4 folds are training. The process repeats 5 times (once per fold), so 5 models are trained in total. Option C incorrectly states 10 models. Option A incorrectly states 5,000 records per fold.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "Cross-validation splits the data into k folds, training on k-1 folds and validating on the remaining fold, rotating through all folds."

---

## Q62
**Answer: B**

**Explanation:** Cross-validation uses all data points for both training and validation across the k iterations, providing a more robust and less variable estimate of model performance than a single hold-out split. A single split's results depend heavily on which data ends up in which partition. Option A is wrong — cross-validation is slower since it trains k models. Option C is wrong — a separate test set is still recommended.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "Cross-validation provides a more reliable estimate of model performance by using all data for both training and validation."

---

## Q63
**Answer: A, C**

**Explanation:** K-fold cross-validation and train-validation-test hold-out splits are both standard, valid data partitioning strategies. Option B (randomly deleting 50% of data) wastes data. Option D (using all data for training and evaluation) causes data leakage and overly optimistic performance estimates. Option E (sorting by target before splitting) introduces severe bias.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "Cross-validation splits the data into k folds, training on k-1 folds and validating on the remaining fold, rotating through all folds."

---

## Q64
**Answer: B**

**Explanation:** With only 500 samples, leave-one-out cross-validation (LOOCV) maximizes the training data in each iteration (499 samples for training, 1 for validation) and provides the most reliable performance estimate. A 50/50 split (A) wastes half the small dataset for validation. Training on all data without validation (Option D) gives no performance estimate at all.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "Cross-validation provides a more reliable estimate of model performance by using all data for both training and validation."

---

## Q65
**Answer: B**

**Explanation:** The validation set is used during development to tune hyperparameters and compare model configurations. The test set is reserved for the final, unbiased performance estimate after all tuning decisions are made. Using the test set for tuning would compromise its objectivity. Option A describes the purpose of the test set, not the validation set.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "The validation set is used to tune hyperparameters and select between model configurations without touching the test set."

---

## Q66
**Answer: B**

**Explanation:** Downsampling the majority class reduces the imbalance so the model doesn't overwhelmingly learn to predict the majority class. This allows the model to give more attention to patterns in the minority class. Option A is incorrect — downsampling reduces, not increases, total samples. Option C is incorrect — the goal is to improve minority class detection, not majority class performance.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification)

**Quote:** "For imbalanced datasets, consider resampling techniques such as downsampling the majority class to balance the class distribution."

---

## Q67
**Answer: B**

**Explanation:** Upsampling (oversampling) increases the number of minority class samples through replication of existing samples or generation of synthetic samples (e.g., SMOTE). This balances the class distribution without discarding majority class data. Option A describes downsampling. Option C is about data collection, not a resampling technique. Option D relates to training configuration, not data resampling.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification)

**Quote:** "For imbalanced datasets, consider resampling techniques such as oversampling the minority class to balance the class distribution."

---

## Q68
**Answer: A, C**

**Explanation:** Downsampling with SQL SAMPLE reduces the majority class efficiently within Snowflake, while upsampling with synthetic data generation (e.g., SMOTE implemented in a stored procedure) increases the minority class. Option D is wrong because ignoring class imbalance often leads to poor minority class predictions. Option B (changing data types) has no impact on class imbalance.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification)

**Quote:** "For imbalanced datasets, consider resampling techniques such as downsampling the majority class to balance the class distribution."

---

## Q69
**Answer: A**

**Explanation:** The correct pattern for training within Snowflake is: read data using Snowpark DataFrames, convert to pandas for compatibility with scikit-learn, train the model, serialize the model artifact, and upload it to a Snowflake stage. This keeps all data and compute within the Snowflake security perimeter. Options B and C involve external services unnecessarily. Option D is not practical for ML.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "You can use Snowpark Python stored procedures to train machine learning models using data in Snowflake, leveraging libraries such as scikit-learn."

---

## Q70
**Answer: B**

**Explanation:** Trained model artifacts are serialized using libraries like joblib or pickle and then uploaded to a Snowflake stage for persistent storage. This approach allows models to be versioned and later loaded by UDFs for inference. Option A is not the typical pattern. Option D is wrong because the local filesystem of a warehouse node is ephemeral. Option C is incorrect — Snowflake does not automatically store model artifacts.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Serialize the trained model and upload it to a Snowflake stage for persistent storage."

---

## Q71
**Answer: B**

**Explanation:** External functions allow Snowflake to call remote service endpoints (such as AWS SageMaker) via an API integration. This enables using Snowflake data with external ML infrastructure without data egress — the data is sent to the endpoint and results returned within the query execution. Option A (Snowpark connector) is for connecting to Snowflake from external environments, not calling out. Dynamic tables and internal stages don't call external services.

**Source:** [External Functions Overview](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that is executed outside of Snowflake. The remotely executed code is known as a remote service."

---

## Q72
**Answer: B**

**Explanation:** An external function in Snowflake allows calling a remote service (e.g., AWS API Gateway backed by Lambda, Azure Functions) via an API integration. Snowflake sends data to the remote endpoint and receives results back. Option A is wrong — the compute is not provisioned by Snowflake. Option D describes external tables or stages, not external functions.

**Source:** [External Functions Overview](https://docs.snowflake.com/en/sql-reference/external-functions-introduction)

**Quote:** "An external function calls code that is executed outside of Snowflake. The remotely executed code is known as a remote service."

---

## Q73
**Answer: A, B**

**Explanation:** Creating an external function requires: (1) a remote service endpoint accessible via HTTPS (e.g., AWS Lambda behind API Gateway), and (2) an API integration object in Snowflake that defines the connection to the proxy service. Option C (SPCS compute pool) is for container services, not external functions. Options D and E are not prerequisites.

**Source:** [Creating an External Function](https://docs.snowflake.com/en/sql-reference/external-functions-creating)

**Quote:** "To create an external function, you need a remote service accessible via a proxy service and an API integration in Snowflake."

---

## Q74
**Answer: C**

**Explanation:** In a UDTF with partitioned input, the `process` method receives rows one at a time and should accumulate them (e.g., into a list). The `end_partition` method is called after all rows in a partition are processed, making it the appropriate place to train the model on the accumulated data. Training in `process` (Option B) would train after each row, which is incorrect.

**Source:** [Python UDTF Handler](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions#defining-a-handler-class)

**Quote:** "The end_partition method is called once for each partition after all rows in the partition have been passed to the process method."

---

## Q75
**Answer: B**

**Explanation:** Vectorized Python UDFs receive batches of rows as pandas Series or DataFrames rather than processing one row at a time. This significantly reduces the serialization overhead between Snowflake and the Python runtime, resulting in better performance for large datasets. Option A is wrong — scalar UDFs process one row at a time, not vectorized ones. Option C is wrong — neither UDF type writes back to tables directly.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as Pandas DataFrames or Pandas Series, reducing serialization overhead."

---

## Q76
**Answer: B**

**Explanation:** A vectorized Python UDF can load the trained model from a stage (once per batch), receive batches of rows as pandas DataFrames, and return predictions efficiently. When applied in a SELECT statement, Snowflake distributes the UDF execution across warehouse nodes, achieving parallelism. Option A would fail with memory issues on 50M rows. Option C introduces unnecessary data movement.

**Source:** [Vectorized Python UDFs](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as Pandas DataFrames or Pandas Series, reducing serialization overhead."

---

## Q77
**Answer: A, C**

**Explanation:** UDTFs support PARTITION BY, which allows training separate models on different data segments in parallel across warehouse nodes (A). The `end_partition` method is called after all rows in a partition are processed, making it the standard location for model training logic (C). Option B is wrong — UDTFs can return multiple rows per partition. Option D is wrong — UDTFs can access stages.

**Source:** [Python UDTF Handler](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions#defining-a-handler-class)

**Quote:** "The end_partition method is called once for each partition after all rows in the partition have been passed to the process method."

---

## Q78
**Answer: B**

**Explanation:** Tasks in Snowflake can be triggered by either a CRON schedule or a WHEN condition (such as `SYSTEM$STREAM_HAS_DATA`), or both. This provides flexibility for time-based scheduling or event-driven execution. Option A is incomplete — tasks also support WHEN conditions. Option C is incomplete — tasks also support CRON schedules. Option D ignores both scheduling mechanisms.

**Source:** [Tasks Overview](https://docs.snowflake.com/en/user-guide/tasks-intro)

**Quote:** "A task can be scheduled using a CRON expression or a defined interval, and can include a WHEN condition to conditionally execute."

---

## Q79
**Answer: C**

**Explanation:** Dynamic tables automatically maintain their data based on a defined query and target lag. Snowflake tracks the dependency graph among dynamic tables and refreshes them in the correct order when upstream data changes. No manual refresh or recreation is needed. Option A is wrong because refreshes are automatic. Option D is wrong because dynamic tables persist.

**Source:** [Dynamic Tables Overview](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "When the data in the base tables that underlie a dynamic table changes, the dynamic table is automatically updated to reflect those changes."

---

## Q80
**Answer: B**

**Explanation:** The standard approach is to serialize the model (e.g., with joblib/pickle), upload it to a Snowflake stage, and then reference that stage file in the UDF's IMPORTS clause. The UDF loads the model from the import directory at initialization. Option A is wrong — session variables cannot hold complex binary objects. Option D is impractical for large model artifacts.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Serialize the trained model and upload it to a Snowflake stage for persistent storage."

---

## Q81
**Answer: C**

**Explanation:** Stratified k-fold cross-validation ensures each fold maintains the same class proportions as the full dataset. This must be implemented programmatically using Snowpark, as random splitting (Option A) does not guarantee equal class proportions, and sorting by target (Option B) would create folds with only one class. Option D provides no validation at all.

**Source:** [Snowpark ML Model Selection](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "Cross-validation splits the data into k folds, training on k-1 folds and validating on the remaining fold, rotating through all folds."

---

## Q82
**Answer: B**

**Explanation:** Snowpark ML provides scikit-learn-compatible estimators and transformers that push computation down to the Snowflake warehouse, enabling distributed execution on Snowflake's compute infrastructure rather than local resources. It does not replace scikit-learn (Option A) — it provides compatible APIs. Option D describes the Model Registry, not ModelBuilder.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "The snowflake.ml.modeling module provides estimators and transformers with APIs similar to scikit-learn that execute on Snowflake's distributed compute."

---

## Q83
**Answer: A, C**

**Explanation:** Training within Snowflake using stored procedures keeps data within the security perimeter (no data egress), addressing governance and compliance requirements (A). Additionally, compute scales with the Snowflake warehouse size, avoiding local machine constraints (C). Option B is wrong — stored procedures are not always faster. Option D is wrong — algorithm selection is not automatic.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "You can use Snowpark Python stored procedures to train machine learning models using data in Snowflake, leveraging libraries such as scikit-learn."

---

## Q84
**Answer: A**

**Explanation:** Reducing the number of cross-validation folds directly reduces the number of models trained during the grid search process (total models = number of hyperparameter combinations × number of folds). Fewer folds means faster completion at the cost of slightly less robust performance estimates. Option B (temperature) is not a hyperparameter tuning parameter. Option C would not improve performance. Option D would increase training time.

**Source:** [Hyperparameter Tuning with Snowpark ML](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling#tuning-hyperparameters)

**Quote:** "GridSearchCV exhaustively searches over specified parameter values, while RandomizedSearchCV samples a given number of candidates from a parameter space with a specified distribution."

---

## Q85
**Answer: B**

**Explanation:** The target_lag specifies the maximum acceptable staleness of the dynamic table relative to its base tables. A target_lag of '1 hour' means Snowflake ensures the dynamic table's data is never more than 1 hour behind the base tables. It does not mean the table refreshes on an exact schedule — Snowflake optimizes refresh timing to meet the lag requirement. Option A is wrong because the exact refresh timing is managed by Snowflake.

**Source:** [Dynamic Tables Overview](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "The target lag specifies the maximum amount of time that the dynamic table's content should lag behind updates to the base tables."

---

## Q86
**Answer: B**

**Explanation:** Time-series cross-validation requires that training data always precedes validation data chronologically to prevent look-ahead bias. This can be implemented in Snowpark using expanding or sliding window approaches where each fold uses an earlier time window for training and a subsequent window for validation. Standard k-fold CV with random splits (Option A) would violate temporal ordering.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "You can use Snowpark Python stored procedures to train machine learning models using data in Snowflake, leveraging libraries such as scikit-learn."

---

## Q87
**Answer: B**

**Explanation:** A confusion matrix displays the counts of true positives (TP), false positives (FP), true negatives (TN), and false negatives (FN) for a classification model. It provides a complete picture of how the model's predictions compare to actual labels across all classes. Option A describes a correlation heatmap. Option C describes a residuals plot for regression.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q88
**Answer: C**

**Explanation:** The expected payout is calculated by assigning monetary values to each confusion matrix outcome. TP savings: 90 × $1,000 = $90,000. FP costs: 50 × $100 = $5,000. FN costs: 60 × $5,000 = $300,000. Net payout = $90,000 - $5,000 - $300,000 = -$215,000. Option A only accounts for TP savings and ignores error costs. Option B miscalculates the total.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q89
**Answer: B**

**Explanation:** The ROC (Receiver Operating Characteristic) curve plots the True Positive Rate (sensitivity/recall) on the y-axis against the False Positive Rate (1 - specificity) on the x-axis at various classification thresholds. Option A describes the Precision-Recall curve. Option C describes a learning curve. Option D describes a scatter plot of predictions.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "AUC represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example."

---

## Q90
**Answer: A, B**

**Explanation:** An AUC of 0.5 means the model has no discriminative ability (equivalent to random guessing) (A), and an AUC of 1.0 indicates perfect classification where all positive examples are ranked higher than all negatives (B). Option C is wrong — ROC curves are for classification, not regression. Option D is wrong — the x-axis represents False Positive Rate, not Precision. Option E is wrong — higher AUC does not always imply higher accuracy.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "AUC represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example."

---

## Q91
**Answer: A**

**Explanation:** Precision = TP / (TP + FP) = 150 / (150 + 30) = 150 / 180 ≈ 0.833. Precision measures the proportion of positive predictions that are actually correct. Option B (0.882) corresponds to recall (TP / (TP + FN) = 150/170). Option D (0.950) represents the overall accuracy: (150 + 800) / 1000.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q92
**Answer: B**

**Explanation:** Recall (sensitivity) = TP / (TP + FN) = 150 / (150 + 20) = 150 / 170 ≈ 0.882. Recall measures the proportion of actual positives that the model correctly identifies. Option A (0.833) is the precision value (TP / (TP + FP) = 150/180). Option D (0.950) is the overall accuracy: (150 + 800) / (150 + 30 + 800 + 20) = 950/1000.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q93
**Answer: B**

**Explanation:** A funnel-shaped residuals plot (residuals increasing with predicted values) indicates heteroscedasticity — the variance of errors is not constant across prediction ranges. This violates a key assumption of linear regression. Option A is wrong — a well-calibrated model would show constant variance. Option D is wrong — perfect correlation would not produce a funnel pattern.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "Root mean squared error gives a relatively high weight to large errors because the errors are squared before they are averaged."

---

## Q94
**Answer: B**

**Explanation:** A well-specified regression model produces residuals that are randomly scattered around zero with no discernible pattern, indicating that the model captures the underlying relationship and the errors are random noise. A U-shaped curve (Option A) suggests non-linearity. Increasing residuals (Option C) suggest heteroscedasticity. All residuals at zero (Option D) would indicate overfitting to training data.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "Root mean squared error gives a relatively high weight to large errors because the errors are squared before they are averaged."

---

## Q95
**Answer: B, C**

**Explanation:** A systematic curve or pattern in the residuals indicates the model is missing a non-linear relationship (B). A funnel shape indicates heteroscedasticity, where error variance changes with predicted values (C). Both patterns suggest model misspecification. Options A, D, and E describe desirable properties of well-behaved residuals.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "Root mean squared error gives a relatively high weight to large errors because the errors are squared before they are averaged."

---

## Q96
**Answer: C**

**Explanation:** R² = 0.72 means that 72% of the variance in the target variable is explained by the model. R-squared directly represents the proportion of variance explained, making it straightforward to communicate to stakeholders. The remaining 28% is unexplained variance. RMSE and MAE measure error magnitude, not variance explained.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "R-squared indicates the proportion of the variance in the dependent variable that is predictable from the independent variables."

---

## Q97
**Answer: B**

**Explanation:** R-squared of 0.85 means that 85% of the variance in the dependent variable is explained by the independent variables in the model. It is a measure of goodness-of-fit for regression models. Option A confuses R-squared with classification accuracy. Option C misinterprets it as prediction probability. Option D confuses it with feature significance.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "R-squared indicates the proportion of the variance in the dependent variable that is predictable from the independent variables."

---

## Q98
**Answer: B**

**Explanation:** Model A outperforms Model B on both key metrics: lower RMSE (12.5 vs. 14.1) indicates smaller prediction errors, and higher R² (0.78 vs. 0.74) indicates more variance explained. When both metrics consistently favor one model, that model is the better choice. Option D is wrong — a lower R² does not indicate less overfitting; it indicates less variance explained.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "R-squared indicates the proportion of the variance in the dependent variable that is predictable from the independent variables."

---

## Q99
**Answer: B, D**

**Explanation:** RMSE and R-squared are standard regression evaluation metrics. RMSE measures the average magnitude of prediction errors (in target units), while R-squared measures the proportion of variance explained. AUC (A), F1 Score (C), and Log loss (E) are classification metrics and are not appropriate for evaluating regression models.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "R-squared indicates the proportion of the variance in the dependent variable that is predictable from the independent variables."

---

## Q100
**Answer: B**

**Explanation:** Expected payout analysis assigns monetary values to each outcome in the confusion matrix — the benefit of true positives, the cost of false positives, the value of true negatives, and the cost of false negatives — then computes the net financial impact. Option A refers to training infrastructure costs. Option C conflates AUC with financial value. Option D relates to serving costs.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q101
**Answer: A**

**Explanation:** Total cost of errors = (FN × FN cost) + (FP × FP cost) = (20 × $50,000) + (80 × $2,000) = $1,000,000 + $160,000 = $1,160,000. False negatives are far more costly in medical diagnostics ($50,000 each), and 20 missed cases contribute $1,000,000. The 80 false positives add $160,000. Option B only accounts for FP costs. Option C only accounts for FN costs.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q102
**Answer: B**

**Explanation:** The F1 score is the harmonic mean of precision and recall: F1 = 2 × (Precision × Recall) / (Precision + Recall). It balances both precision and recall into a single metric. Option A is the arithmetic mean, not the harmonic mean — the harmonic mean penalizes extreme imbalances between precision and recall more heavily. Option D would give a very small number and is not a recognized metric.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q103
**Answer: B**

**Explanation:** Normally distributed residuals with a mean significantly different from zero indicate systematic bias — the model consistently over-predicts (if mean is negative) or under-predicts (if mean is positive). A well-specified model should have residuals centered at zero. Option A is wrong because a non-zero mean is a clear issue. Option C (multicollinearity) would not directly cause a shifted mean.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/regression)

**Quote:** "R-squared indicates the proportion of the variance in the dependent variable that is predictable from the independent variables."

---

## Q104
**Answer: A, C**

**Explanation:** Calculating expected financial payout requires: (1) the confusion matrix with TP, FP, TN, FN counts to know how many of each outcome occurred (A), and (2) monetary values assigned to each outcome type (C). RMSE (Option B) is a regression metric. The number of features (Option D) and learning rate (Option E) are irrelevant to financial payout calculations.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#evaluation-metrics)

**Quote:** "The confusion matrix shows the counts of true positive, false positive, true negative, and false negative predictions."

---

## Q105
**Answer: A**

**Explanation:** High recall means the model correctly identifies most actual positive cases (few false negatives). Low precision means many of the positive predictions are actually negative (many false positives). This combination means the model casts a wide net — catching most positives but also incorrectly flagging many negatives as positive. Option B describes the opposite (high precision, low recall).

**Source:** [Precision and Recall — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#label-classification-evaluation-metrics)

**Quote:** "Recall measures the fraction of actual positives that are correctly identified, while precision measures the fraction of positive predictions that are actually positive."

---

## Q106
**Answer: B**

**Explanation:** A bow-tie or diamond-shaped residual plot where residuals increase at the extremes indicates heteroscedasticity — the variance of errors is not constant across predicted values. This often suggests the model is missing non-linear terms or that a variance-stabilizing transformation (like log) is needed. Option A is incorrect because a well-specified model would show randomly scattered residuals with constant variance. Option D (training data size) does not produce this pattern.

**Source:** [Snowflake ML Modeling Overview](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q107
**Answer: B**

**Explanation:** The area under the Precision-Recall (PR) curve measures the model's ability to identify positive instances across different thresholds. It is especially useful for imbalanced datasets where the ROC AUC can be overly optimistic. Option A is incorrect because PR-AUC is specifically more informative than ROC-AUC on imbalanced datasets, not balanced ones.

**Source:** [Classification Evaluation Metrics — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#label-classification-evaluation-metrics)

**Quote:** "Precision and recall are particularly useful metrics when dealing with imbalanced datasets where one class is much more frequent than the other."

---

## Q108
**Answer: B**

**Explanation:** For disease detection, catching as many actual positive cases as possible is paramount — missing a disease case (false negative) is far more costly than a false alarm (false positive). Model B has recall=0.88 vs. Model A's 0.70, meaning Model B catches 88% of true positive cases compared to 70%. While Model A has higher precision, the business requirement prioritizes recall. Option C is wrong because similar AUC does not mean the models are interchangeable — they have different precision-recall tradeoffs.

**Source:** [Classification Evaluation Metrics — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#label-classification-evaluation-metrics)

**Quote:** "Recall measures the fraction of actual positives that are correctly identified."

---

## Q109
**Answer: B**

**Explanation:** Feature importance (feature impact) measures how much each feature contributes to the model's predictions. It quantifies the relative influence of each input variable on the model output. Option A describes feature engineering, option C describes computational performance, and option D describes multicollinearity analysis — none of which define feature importance.

**Source:** [Snowpark ML Modeling — Feature Importance](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "After training a model, you can examine feature importances to understand which features have the greatest impact on predictions."

---

## Q110
**Answer: B**

**Explanation:** Random forest models in scikit-learn (and Snowpark ML, which provides a scikit-learn-compatible API) expose a `feature_importances_` attribute after training, which ranks features by their contribution to the model's predictions. This is the most direct and efficient first step. Option A is destructive and uninformative. Option C is computationally expensive and less insightful. Option D measures linear correlation, not feature contribution to the model.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q111
**Answer: B**

**Explanation:** A partial dependence plot (PDP) shows the marginal effect of one or two features on the predicted outcome of a machine learning model, averaging over the values of all other features. It reveals the relationship between the feature and the model's prediction. Option A describes a scatter or correlation plot, option C describes a learning curve, and option D describes a different visualization entirely.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q112
**Answer: A, B**

**Explanation:** PDPs show the average (marginal) effect of a feature on predictions across the dataset (A) and can reveal non-linear relationships between features and model output (B). Option C is wrong because PDPs are model-agnostic and work with any model type. Option D describes individual conditional expectation (ICE) plots, not PDPs. Option E is wrong because PDPs do not require retraining — they use the existing model with varied feature values.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q113
**Answer: B**

**Explanation:** The PDP shows the average predicted outcome as the feature varies. A flat line from age 20-50 indicates customer age has minimal marginal effect on churn in that range. The sharp increase after age 50 indicates age becomes a strong positive predictor of churn. Option A is wrong because the feature clearly has an effect (after 50). Option C is wrong because the PDP shows the learned relationship, not necessarily overfitting. Option D is wrong because the feature provides valuable predictive signal.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q114
**Answer: B**

**Explanation:** SHAP values are based on Shapley values from cooperative game theory. For each prediction, they assign each feature a value representing its contribution to the difference between the actual prediction and the average (expected) prediction across the dataset. Option A confuses SHAP with accuracy metrics. Option C confuses SHAP with model weights/coefficients. Option D confuses SHAP with statistical hypothesis testing.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q115
**Answer: B**

**Explanation:** Snowflake does not have a built-in SHAP_VALUES() SQL function (ruling out A), and SHAP values are not automatically computed by Snowpark ML (ruling out C). There is no EXPLAIN keyword for this purpose in Snowflake SQL (ruling out D). The recommended approach is to write a Python stored procedure that loads the trained model and uses the open-source SHAP library to compute explanations.

**Source:** [Writing Stored Procedures in Python — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-python)

**Quote:** "You can use Python stored procedures to execute Python code that uses third-party libraries in Snowflake."

---

## Q116
**Answer: A, C**

**Explanation:** SHAP summary plots (A) display feature importance and the direction/magnitude of feature effects across all predictions, making them ideal for global model interpretation. SHAP force plots (C) show how individual features push a single prediction from the base value to the final prediction, enabling local explanation. Options B, D, and E are not real SHAP visualization types — residuals plots, confusion matrices, and ROC curves are standard ML evaluation tools unrelated to SHAP.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q117
**Answer: B**

**Explanation:** Global feature importance provides a single aggregate measure of each feature's overall contribution to the model. SHAP values, in contrast, provide per-prediction explanations showing how each feature contributed to each individual prediction. This makes SHAP values suitable for both local (individual) and global (aggregated) interpretation. Option A is wrong because SHAP works with many model types. Option D is wrong because both can be model-agnostic.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q118
**Answer: B**

**Explanation:** SHAP values are additive: the predicted value equals the base value plus the sum of all SHAP values. Base = 0.5, sum of SHAP values = (-0.3) + (+0.5) + (-0.4) + (-0.1) = -0.3. Predicted probability = 0.5 + (-0.3) = 0.2, or 20% approval probability. Option A (0.7) would require a positive sum of SHAP values. Option C (0.3) is an arithmetic error. Option D (0.5) would require SHAP values summing to zero.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q119
**Answer: B**

**Explanation:** Confidence intervals provide a range around a point prediction that quantifies the uncertainty of the estimate. They indicate how much the prediction might vary, giving stakeholders a measure of reliability. Option A is unrelated (training time). Option C conflates confidence intervals with feature selection. Option D is wrong because confidence intervals apply broadly including supervised learning.

**Source:** [Snowflake ML Functions — Forecasting](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/forecasting#understanding-prediction-intervals)

**Quote:** "Prediction intervals provide a range that the future value is expected to fall within, given a specified level of confidence."

---

## Q120
**Answer: A, C**

**Explanation:** Bootstrapping (A) involves training multiple models on resampled datasets and using the distribution of predictions to estimate intervals. Quantile regression (C) trains models to predict specific quantiles (e.g., 5th and 95th) to form prediction intervals. Option B is wrong — there is no CONFIDENCE() SQL function in Snowflake. Option D is statistically meaningless. Option E confuses feature variability with prediction uncertainty.

**Source:** [Snowflake ML Functions — Forecasting](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/forecasting#understanding-prediction-intervals)

**Quote:** "Prediction intervals provide a range that the future value is expected to fall within, given a specified level of confidence."

---

## Q121
**Answer: B**

**Explanation:** A 95% confidence interval of [$350, $650] around a prediction of $500 means that based on the model's uncertainty estimation, the true value is expected to fall within this range approximately 95% of the time. Option A misinterprets confidence intervals as accuracy. Option C incorrectly states the error is exactly $150. Option D incorrectly relates the interval to retraining variability.

**Source:** [Snowflake ML Functions — Forecasting](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/forecasting#understanding-prediction-intervals)

**Quote:** "Prediction intervals provide a range that the future value is expected to fall within, given a specified level of confidence."

---

## Q122
**Answer: B**

**Explanation:** In a partial dependence plot, the x-axis represents the values of the feature being examined, and the y-axis represents the average predicted outcome at each feature value (marginalizing over all other features). Option A describes a training loss curve. Option C is not a standard plot type. Option D describes a predicted-vs-actual plot.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q123
**Answer: B**

**Explanation:** In a SHAP summary plot, a wide spread of SHAP values for a feature indicates that the feature has a large and variable impact on predictions across the dataset. Some data points see a large positive push, others a large negative push, meaning the feature strongly influences predictions in varying directions. Option A is unrelated to SHAP spread. Option C is wrong — high impact features are valuable. Option D is wrong — SHAP spread does not indicate correlation.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q124
**Answer: B**

**Explanation:** `shap.TreeExplainer` is specifically optimized for tree-based models like XGBoost, Random Forest, and LightGBM. It leverages the tree structure for exact and efficient SHAP value computation. `LinearExplainer` (A) is for linear models, `DeepExplainer` (C) is for deep learning models, and `KernelExplainer` (D) is model-agnostic but much slower for tree-based models.

**Source:** [Writing Stored Procedures in Python — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-python)

**Quote:** "You can use Python stored procedures to execute Python code that uses third-party libraries in Snowflake."

---

## Q125
**Answer: A, C**

**Explanation:** Wider confidence intervals indicate greater uncertainty in the prediction (A), while narrower intervals suggest higher certainty (C). Option B is wrong — confidence intervals provide probabilistic coverage, not a guarantee. Option D is wrong — confidence intervals apply to regression and classification probability estimates. Option E is wrong — more training data generally leads to narrower intervals.

**Source:** [Snowflake ML Functions — Forecasting](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/forecasting#understanding-prediction-intervals)

**Quote:** "Prediction intervals provide a range that the future value is expected to fall within, given a specified level of confidence."

---

## Q126
**Answer: B**

**Explanation:** A SHAP force plot or waterfall chart provides an intuitive visual explanation of how each feature contributed to pushing a specific prediction toward one outcome or another. This is ideal for explaining individual decisions to non-technical stakeholders. Option A only provides aggregate importance, not individual explanations. Options C and D describe overall model performance, not individual prediction explanations.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q127
**Answer: B**

**Explanation:** Permutation feature importance measures global feature importance by shuffling each feature and measuring the decrease in model performance. It does not provide explanations at the individual prediction level. SHAP values, by contrast, explain each individual prediction's feature contributions. Option A is wrong — permutation importance works with any model. Option D is wrong — permutation importance does not require retraining; it only requires re-evaluation with shuffled features.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q128
**Answer: B**

**Explanation:** Regulatory requirements for individual-level explainability demand that each automated decision be accompanied by feature-level explanations. SHAP values provide exactly this — for each applicant, they show how each feature (income, credit score, etc.) contributed to the specific decision. Option A provides no individual explanation. Option C only provides aggregate information. Option D describes overall model performance, not individual decision rationale.

**Source:** [Writing Stored Procedures in Python — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-python)

**Quote:** "You can use Python stored procedures to execute Python code that uses third-party libraries in Snowflake."

---

## Q129
**Answer: B**

**Explanation:** In a PDP for a classification model that outputs probabilities, the y-axis represents the average predicted probability as the feature value varies along the x-axis, with all other features held at their observed values and marginalized over. Option A describes statistical testing. Option C describes a histogram. Option D describes correlation analysis.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Evaluate your model's performance using standard metrics and diagnostic techniques to ensure the model meets the requirements of your use case."

---

## Q130
**Answer: A, C**

**Explanation:** SHAP KernelExplainer (A) is model-agnostic — it treats the model as a black box and can compute SHAP values for any model type. Partial dependence plots (C) are also model-agnostic — they only require the ability to generate predictions. Option B (Gini importance) is specific to tree-based models. Option D (coefficient values) is specific to linear models. Option E (attention weights) is specific to transformer architectures.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q131
**Answer: B**

**Explanation:** The correct approach is to first use SENTIMENT to classify the tone of each email (positive, negative, neutral), then filter for negative emails and use SUMMARIZE to create summaries of those negative emails. Option A is wrong because EMBED_TEXT_768 creates embeddings, not classifications, and you cannot summarize embeddings. Option C could work but is less structured and reliable than using purpose-built functions. Option D is wrong because summarizing first then checking sentiment loses the granularity of the original emails.

**Source:** [Snowflake Cortex LLM Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions)

**Quote:** "SENTIMENT returns a sentiment score for the given text, and SUMMARIZE returns a summary of the given text."

---

## Q132
**Answer: B**

**Explanation:** Declaring model loading at the top-level scope of a Python UDF means the model is loaded once during UDF initialization and reused for all subsequent row/batch invocations. If loading is done inside the function body, the model would be deserialized for every call, creating significant overhead. Option A is incorrect as this has major performance implications. Options C and D are unrelated to model loading scope.

**Source:** [Creating Python UDFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-designing#initializing-state-for-a-udf)

**Quote:** "Code at module scope (outside the handler function) runs once when the UDF is initialized, so you can use this for operations that only need to happen once, such as loading a model file."

---

## Q133
**Answer: B**

**Explanation:** Vectorized Python UDFs receive data in pandas Series/DataFrame batches rather than one row at a time. Since the inference library supports batch predictions on numpy arrays, the data scientist can efficiently convert pandas batches to numpy arrays and leverage batch inference. Option A is wrong because scalar UDFs process one row at a time, which is less efficient for batch-capable libraries. Option D is wrong because vectorized UDFs fully support numpy operations.

**Source:** [Vectorized Python UDFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as pandas DataFrames or pandas Series, allowing for more efficient processing."

---

## Q134
**Answer: A, B**

**Explanation:** Stored procedures can execute multiple SQL statements including DDL/DML operations like CREATE TABLE, INSERT, UPDATE (A). UDFs can be called inline in SELECT statements, making them ideal for row-level transformations and scoring (B). Option C is wrong — stored procedures do not always run faster. Option D is wrong — UDFs cannot perform DDL operations like creating/dropping tables. Option E is wrong — they have distinct capabilities and limitations.

**Source:** [Stored Procedures vs UDFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview#choosing-between-a-stored-procedure-and-a-udf)

**Quote:** "A stored procedure can execute DDL and DML statements, while a UDF is designed to return a value for each input row in a query."

---

## Q135
**Answer: B**

**Explanation:** For reliable text classification using an LLM, the best approach is structured prompt engineering: provide a clear system prompt defining the exact categories, include few-shot examples showing inputs and expected outputs for each category, and constrain the output format. Option A lacks context and examples, leading to unreliable outputs. Option C (maximum temperature) increases randomness, reducing classification reliability. Option D is wrong because Complete() can perform classification tasks.

**Source:** [Complete (Snowflake Cortex) — Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex)

**Quote:** "You can use the COMPLETE function to perform tasks such as text classification, summarization, and text generation by providing appropriate prompts."

---

## Q136
**Answer: B**

**Explanation:** Snowflake Cortex's SUMMARIZE function is backed by LLMs that have model-specific context window limits for input text. The input must fit within the model's context window. Option A is incorrect because there are practical limits. Option C (100 tokens) is far too small. Option D is incorrect because the limit is determined by the model, not the warehouse size.

**Source:** [SUMMARIZE (Snowflake Cortex) — Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/summarize-snowflake-cortex)

**Quote:** "The input text is subject to the model's context window limit."

---

## Q137
**Answer: B**

**Explanation:** The correct pipeline architecture uses: a Stream to detect new data changes, a Task with `WHEN SYSTEM$STREAM_HAS_DATA('stream_name')` to conditionally trigger execution, a Stored Procedure to orchestrate the scoring logic, and a UDF for row-level model inference. Option A lacks the procedural scoring logic. Options C and D use incorrect component combinations for this pattern.

**Source:** [Introduction to Streams — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A task can be configured to check whether a stream has change data using the SYSTEM$STREAM_HAS_DATA function."

---

## Q138
**Answer: C, D**

**Explanation:** Data can be downloaded via the Snowflake Python connector for local training (C), keeping data governance in Snowflake while training externally. Tasks can trigger external services via notifications and external functions (D), enabling external ML platforms to access Snowflake data for training. Option A describes calling remote APIs for inference, not full training workflows. Option B is incorrect — Snowpark ML local mode still runs Python locally but uses Snowflake for data processing. Option E is wrong — dynamic tables perform transformations, not model training.

**Source:** [Snowflake Python Connector](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector)

**Quote:** "The Snowflake Connector for Python provides an interface for developing Python applications that can connect to Snowflake and perform all standard operations."

---

## Q139
**Answer: B**

**Explanation:** Using Snowpark DataFrame operations with the NTILE window function to assign fold numbers keeps computation entirely in Snowflake, leveraging its distributed engine. This is far more efficient than exporting to pandas (Option A), creating k full copies (Option C), or using a JavaScript UDF (Option D). NTILE(k) over a random ordering efficiently assigns each row to one of k folds.

**Source:** [Snowpark Python DataFrame Operations](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "You can use window functions such as NTILE to partition and transform data within Snowpark DataFrames."

---

## Q140
**Answer: B**

**Explanation:** When probability scores are used for risk pricing, calibration matters — the predicted probabilities need to accurately reflect true likelihoods. Log loss directly penalizes poorly calibrated probability estimates. AUC (Option A) measures ranking ability but is insensitive to calibration. Accuracy (Option C) uses a fixed threshold and ignores probability quality. RMSE (Option D) is a regression metric, not standard for binary classification.

**Source:** [Classification — Snowflake ML Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#label-classification-evaluation-metrics)

**Quote:** "Log loss measures the performance of a classification model that outputs probability values, penalizing predictions that are confident but incorrect."

---

## Q141
**Answer: B**

**Explanation:** Streams track data changes (inserts, updates, deletes) on tables, views, or other supported objects. Tasks are scheduled or triggered objects that execute SQL or stored procedures. Tasks can use `SYSTEM$STREAM_HAS_DATA()` as a condition to execute only when the associated stream has new change data. Option A is wrong — streams don't schedule anything. Option C is wrong — tasks don't automatically create streams. Option D is wrong — they are distinct objects.

**Source:** [Introduction to Streams — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A task can be configured to check whether a stream has change data using the SYSTEM$STREAM_HAS_DATA function."

---

## Q142
**Answer: B**

**Explanation:** Since XGBoost does not natively support prediction intervals, bootstrapping is the appropriate technique: train multiple models on different bootstrap samples of the training data, generate predictions from each model, and use the distribution of predictions to construct confidence intervals (e.g., 2.5th and 97.5th percentiles for a 95% interval). Option A is wrong — predict_proba gives class probabilities, not intervals. Options C and D are statistically invalid approaches.

**Source:** [Writing Stored Procedures in Python — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-python)

**Quote:** "You can use Python stored procedures to execute Python code that uses third-party libraries in Snowflake."

---

## Q143
**Answer: A, C**

**Explanation:** Dynamic tables are declarative — you define the desired query result and Snowflake handles when and how to refresh the data (A). When multiple dynamic tables depend on each other, Snowflake automatically manages the dependency ordering and refresh sequence (C). Option B is wrong — dynamic tables do not support calling external functions in the same way tasks do. Option D is wrong — dynamic tables cannot execute stored procedures. Option E is wrong — dynamic tables are single SQL definitions, not imperative multi-step logic.

**Source:** [Dynamic Tables — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables are declarative, allowing you to define the target of a data pipeline as a query. Snowflake automatically manages refresh scheduling and dependency ordering."

---

## Q144
**Answer: B**

**Explanation:** When a task has a WHEN condition using `SYSTEM$STREAM_HAS_DATA()` and the stream contains no new data, the task is simply skipped for that scheduled run. It does not execute, does not fail, and does not consume compute credits. Option A is wrong — the task doesn't execute at all. Option C is wrong — no error occurs. Option D is wrong — no credits are consumed for the skipped run.

**Source:** [Introduction to Tasks — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/tasks-intro#conditional-task-execution)

**Quote:** "When the WHEN condition evaluates to FALSE, the task does not execute for that scheduled run, and no compute resources are consumed."

---

## Q145
**Answer: B**

**Explanation:** A vectorized Python UDF can compute SHAP values in batches and be applied across the entire table using a SQL SELECT statement. With a multi-cluster warehouse, Snowflake can distribute the computation across multiple nodes, significantly reducing wall-clock time through parallelism. Option A (sequential loop) would take ~100,000 seconds. Option C loses the benefits of Snowflake's compute. Option D is wrong — there is no built-in SHAP function in Snowflake Cortex.

**Source:** [Vectorized Python UDFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-batch)

**Quote:** "Vectorized Python UDFs let you define Python functions that receive batches of input rows as pandas DataFrames or pandas Series, allowing for more efficient processing."

---

## Q146
**Answer: B**

**Explanation:** Categorical cross-entropy (multi-class log loss) is the generalization of binary log loss (binary cross-entropy) to multiple classes. It measures the quality of predicted probability distributions across all classes. Option A (binary cross-entropy) is the binary-only version, not the generalization. Option C (RMSE) is a regression metric. Option D (AUC-ROC binary only) doesn't generalize log loss — it's a different metric.

**Source:** [Classification — Snowflake ML Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#label-classification-evaluation-metrics)

**Quote:** "Log loss measures the performance of a classification model that outputs probability values, penalizing predictions that are confident but incorrect."

---

## Q147
**Answer: A, C**

**Explanation:** Using PARTITION BY with a UDTF distributes data across warehouse nodes, enabling parallel per-partition training (A). A Python UDTF's `process()` method accumulates rows and `end_partition()` executes after all rows for a partition are received, making it suitable for training a model per partition (C). Option B is wrong — scalar UDFs don't parallelize training. Option D is wrong — Snowpark Container Services is not required for all distributed training. Option E is wrong — partitions do not share state.

**Source:** [Python UDTFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions)

**Quote:** "The process method is called for each input row, and end_partition is called after all rows for a partition have been processed."

---

## Q148
**Answer: B**

**Explanation:** The proper way to evaluate a fine-tuned model is to create a held-out evaluation dataset that was not used during training, run both the base and fine-tuned models on this dataset, and compare using task-specific metrics appropriate to the use case. Option A (token count) does not measure quality. Option C (training time) is irrelevant to model performance. Option D (response length) does not indicate quality.

**Source:** [Fine-tuning Models with Cortex — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-finetuning)

**Quote:** "Evaluate the fine-tuned model by comparing its performance against the base model on a held-out evaluation dataset."

---

## Q149
**Answer: B**

**Explanation:** In Snowflake, the correct way to handle model dependencies in a Python UDF is to upload the model file (e.g., pickle file) to a Snowflake stage and reference it using the IMPORTS clause of the UDF definition. The file is then accessible within the UDF's execution environment. Option A creates security and reliability issues. Option C is impractical for large models. Option D is not supported — user variables cannot store binary files.

**Source:** [Creating Python UDFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-designing#reading-a-file-with-a-python-udf)

**Quote:** "You can read files that are included in the IMPORTS clause of a UDF. The files are staged and available in the UDF's import directory."

---

## Q150
**Answer: A**

**Explanation:** A sharp drop in the precision-recall curve at low recall values means the model only achieves high precision when making very few positive predictions (using a high decision threshold). As the threshold is lowered to catch more positives (increasing recall), precision drops sharply, indicating many false positives are introduced. Option B is wrong — this behavior indicates calibration issues. Option C is irrelevant. Option D is wrong — this pattern is often associated with imbalanced datasets.

**Source:** [Classification — Snowflake ML Functions](https://docs.snowflake.com/en/user-guide/snowflake-cortex/ml-functions/classification#label-classification-evaluation-metrics)

**Quote:** "Precision and recall are particularly useful metrics when dealing with imbalanced datasets where one class is much more frequent than the other."

---

## Q151
**Answer: A, B**

**Explanation:** An automated retraining pipeline requires: (A) a stream to track new data arriving in the training table, and (B) a task with a WHEN condition using `SYSTEM$STREAM_HAS_DATA()` to trigger execution only when new data is available, calling the training stored procedure. Option C is wrong — an external scheduler is not required; Snowflake tasks handle scheduling natively. Option D is wrong — materialized views are not needed for this pattern. Option E is wrong — no Java UDF is needed to parse stream metadata.

**Source:** [Introduction to Streams — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/streams-intro)

**Quote:** "A task can be configured to check whether a stream has change data using the SYSTEM$STREAM_HAS_DATA function."

---

## Q152
**Answer: B**

**Explanation:** With a limited compute budget, random search is preferred because it efficiently explores the parameter space by sampling N random combinations. Grid search (Option A) with a fine grid would evaluate many unnecessary combinations and quickly exhaust the budget. Random search has been shown to find good hyperparameter values with fewer evaluations because not all hyperparameters are equally important. Options C and D fail to leverage the available compute for optimization.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake."

---

## Q153
**Answer: B**

**Explanation:** In a Python UDTF, the `process()` method is called once for each input row. It can either emit output rows immediately or accumulate data in instance variables for later processing. Option A describes the `__init__()` method. Option C describes the `end_partition()` method. Option D describes the output schema definition (typically done via a class decorator or `@property` method).

**Source:** [Python UDTFs — Snowflake Documentation](https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions)

**Quote:** "The process method is called for each input row, and end_partition is called after all rows for a partition have been processed."

---

## Q154
**Answer: B**

**Explanation:** This architecture leverages the best tool for each requirement: Dynamic tables provide declarative, automatically-refreshing transformations for data cleaning (step 1) and feature engineering (step 2). For step 3, a stream on the feature table detects new data, and a task triggers the training stored procedure when sufficient new features accumulate. Option A lacks dependency management between steps. Option C is brittle and doesn't leverage incremental processing. Option D unnecessarily externalizes all logic.

**Source:** [Dynamic Tables — Snowflake Documentation](https://docs.snowflake.com/en/user-guide/dynamic-tables-about)

**Quote:** "Dynamic tables are declarative, allowing you to define the target of a data pipeline as a query. Snowflake automatically manages refresh scheduling and dependency ordering."

---

## Q155
**Answer: A, C**

**Explanation:** Snowpark ML provides scikit-learn compatible APIs that abstract away the details of distributed execution in Snowflake, making it easy for data scientists familiar with scikit-learn (A). It also handles model serialization and integrates with Snowflake's model registry for model management and versioning (C). Option B is wrong — preprocessing is still needed. Option D is wrong — no library guarantees 100% accuracy. Option E is wrong — hyperparameter tuning is still the user's responsibility.

**Source:** [Snowpark ML Modeling](https://docs.snowflake.com/en/developer-guide/snowpark-ml/modeling)

**Quote:** "Snowpark ML provides scikit-learn compatible APIs for model training and evaluation in Snowflake, including integration with the Snowflake Model Registry."
