# DSA-C03 Materials Summary

## Exam Overview
Questions: 65  |  Duration: 115 min  |  Pass: 75% (750/1000 scaled)
Question Types: Multiple Choice, Multiple Select, Interactive
Prerequisite: SnowPro Core Certified
Registration Fee: $375 USD
Exam Version: DSA-C03 (Study Guide updated January 12, 2026)

## Domain Topics

### Domain 1 — Data Science Concepts (17%)
Key topics from materials:

**1.1 Define machine learning concepts for data science workloads**
- Machine Learning: Supervised learning, Unsupervised learning, Reinforcement learning

**1.2 Identify machine learning problem types**
- Supervised Learning — Structured Data: Linear regression, Binary classification, Multi-class classification, Time-series forecasting
- Supervised Learning — Unstructured Data: Image classification, Segmentation
- Unsupervised Learning: Clustering
- GenAI: Association models

**1.3 Summarize the machine learning lifecycle**
- Data collection
- Data visualization and exploration
- Feature engineering
- Training models
- Model deployment
- Model monitoring and evaluation (model explainability, precision, recall, accuracy, confusion matrix)
- Model versioning

**1.4 Define statistical concepts for data science**
- Normal versus skewed distributions (mean, outliers)
- Central limit theorem
- Z and T tests
- Bootstrapping
- Confidence intervals

Explicitly in-scope: ML evaluation metrics (precision, recall, accuracy, confusion matrix), GenAI association models, reinforcement learning concepts
Explicitly out-of-scope: None stated

### Domain 2 — Data Preparation and Feature Engineering (27%)
Key topics from materials:

**2.1 Prepare and clean data in Snowflake**
- Use Snowpark for Python and SQL: Aggregate, Joins, Identify critical data, Remove duplicates, Remove irrelevant fields, Handle missing values, Data type casting, Sampling data

**2.2 Perform exploratory data analysis in Snowflake**
- Snowpark and SQL: Identify initial patterns (data profiling), Connect external ML platforms/notebooks (Jupyter)
- Snowflake native statistical functions: Window Functions, MIN/MAX/AVG/STDEV, VARIANCE, TOPn, Approximation/High Performing functions (APPROX_COUNT_DISTINCT, APPROX_TOP_K)
- Linear Regression: Find slope and intercept, Verify dependencies on dependent/independent variables

**2.3 Perform feature engineering on Snowflake data**
- Preprocessing: Scaling data, Encoding, Normalization
- Data Transformations: DataFrames (pandas, Snowpark, Snowpark pandas), Derived features (e.g., average spend)
- Binarizing data: Binning continuous data into intervals, Label encoding, One hot encoding
- Snowpark Feature Store

**2.4 Visualize and interpret data to present a business case**
- Statistical summaries: Snowsight with SQL, Interpret open-source graph libraries, Identify data outliers
- Snowflake Notebooks

Explicitly in-scope: Snowpark Feature Store, Snowflake Notebooks, pandas on Snowflake, DECODE, NTILE, APPROX_COUNT_DISTINCT, SMOTE/undersampling for imbalanced classification, missing data imputation
Explicitly out-of-scope: None stated

### Domain 3 — Model Development (31%)
Key topics from materials:

**3.1 Connect data science tools directly to data in Snowflake**
- Connecting Python to Snowflake: Snowpark, Snowpark ML, Python connector with Pandas support
- Connecting from external IDE (e.g., Visual Studio Code)
- Snowpark languages

**3.2 Leverage GenAI and LLM models in Snowflake**
- Snowflake Cortex: Vector embedding (EMBED_TEXT_768), Prompt engineering (snowflake.cortex.Complete), Fine tuning, Task-specific models (categorization, summarization/SUMMARIZE, sentiment analysis, information extraction)

**3.3 Train a data science model**
- Build a data science pipeline: Automation of data transformation (dynamic tables, CREATE TASK, SYSTEM$STREAM_HAS_DATA), Python UDFs, Python UDTFs, Python stored procedures
- Hyperparameter tuning
- Optimization metric selection (log loss, AUC, RMSE)
- Partitioning: Cross validation, Train validation hold-out
- Down/up-sampling
- Training with Python stored procedures
- Training outside Snowflake through external functions
- Training with Python UDTFs

**3.4 Validate a data science model**
- ROC curve/confusion matrix: Calculate expected payout of the model
- Regression problems
- Residuals plot: Interpret graphics with context
- Model metrics

**3.5 Interpret a model**
- Feature impact
- Partial dependence plots
- Confidence intervals
- SHAP values (Python stored procedures)

Explicitly in-scope: Snowflake Cortex LLM functions, Snowpark ML, dynamic tables, external functions, SHAP values, model explainability, distributed ML with Snowpark Python UDFs
Explicitly out-of-scope: None stated

### Domain 4 — Model Deployment (25%)
Key topics from materials:

**4.1 Move a data science model into production**
- Use external hosted model: External functions, Pre-built models
- Deploy a model in Snowflake: Vectorized/Scalar Python UDFs, Pre-built models, Storing predictions, Stage commands, Snowflake Model Registry (model logging and retrieving, Snowpark Container Services)

**4.2 Determine the effectiveness of a model and retrain if necessary**
- Metrics for model evaluation: Data drift/Model decay, Data distribution comparisons
- Area under the curve
- Accuracy, precision, recall
- RMSE (regression)

**4.3 Outline model lifecycle and validation tools**
- Metadata tagging
- Model versioning with Snowflake Model Registry
- Automation of model retraining

Explicitly in-scope: Snowflake Model Registry, Snowpark Container Services, vectorized Python UDFs, Java UDFs, model drift detection, Classification (Snowflake ML Functions)
Explicitly out-of-scope: None stated

## Sample Questions Analysis
Total samples: 5

| # | Type          | Domain | Summary |
|---|---------------|--------|---------|
| 1 | Scenario      | D2/D3  | Which Snowflake feature for ML model building with Python/SQL + Streamlit visualizations (Answer: Snowflake Notebooks) |
| 2 | Single Answer | D1     | Correct sequence of data science workload activities (Answer: Collection > Viz > FE > Train > Deploy > Monitor) |
| 3 | Single Answer | D2     | Estimating function for approximate value frequency (Answer: APPROX_TOP_K) |
| 4 | Scenario      | D3     | Confusion matrix category for correct negative classification (Answer: True Negative) |
| 5 | Single Answer | D3     | Interpret R^2 of 0.85 for linear regression (Answer: 85% variability explained) |

## Notes
- No contradictions found between study guide PDF and format.md — both agree on 4 domains with identical weights (17%, 27%, 31%, 25%), 65 questions, 115 min, 750/1000 pass score
- Passing score is 750 on a 0-1000 scale (scaled scoring), equivalent to 75%
- The certification page's "Exam Details" tab is JS-rendered; web_fetch could not retrieve it. The format.md file contains the same exam format data and was used for cross-reference
- Study guide last updated January 12, 2026
- Q1 is classified as Scenario because it opens with "A Data Scientist is building..." (role/persona/situation)
- Q4 is classified as Scenario because it opens with "A Data Scientist at Snowbear Airlines..." (role/persona/situation)
