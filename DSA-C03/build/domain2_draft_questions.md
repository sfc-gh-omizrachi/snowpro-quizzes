# Domain 2: Data Preparation and Feature Engineering

---

## Q1 (Single Answer)
Which Snowpark DataFrame method removes duplicate rows based on all columns?
- A) `df.distinct()`
- B) `df.unique()`
- C) `df.remove_duplicates()`
- D) `df.deduplicate()`

---

## Q2 (Scenario)
A data scientist is cleaning a large customer transactions table and discovers that 15% of the `email` column values are NULL. The scientist needs to replace these NULLs with a default placeholder string using Snowpark Python. Which approach should they use?
- A) `df.fillna({"EMAIL": "unknown@placeholder.com"})`
- B) `df.replace(None, "unknown@placeholder.com")`
- C) `df.na.fill({"EMAIL": "unknown@placeholder.com"})`
- D) `df.impute({"EMAIL": "unknown@placeholder.com"})`

---

## Q3 (Single Answer)
In Snowpark Python, which method is used to cast a column from STRING to INTEGER data type?
- A) `col("amount").convert(IntegerType())`
- B) `col("amount").cast(IntegerType())`
- C) `col("amount").astype(IntegerType())`
- D) `col("amount").to_type(IntegerType())`

---

## Q4 (Scenario)
A data scientist at an e-commerce company needs to join a customer demographics table with an orders table in Snowpark Python. The join should only return customers who have placed at least one order. Which join type should they specify?
- A) `df_customers.join(df_orders, "CUSTOMER_ID", "left")`
- B) `df_customers.join(df_orders, "CUSTOMER_ID", "inner")`
- C) `df_customers.join(df_orders, "CUSTOMER_ID", "cross")`
- D) `df_customers.join(df_orders, "CUSTOMER_ID", "full")`

---

## Q5 (Multi Answer - Select 2)
Which TWO methods can be used to handle missing values in a Snowpark DataFrame? (Select 2)
- A) `df.na.drop()` to remove rows containing NULL values
- B) `df.na.fill()` to replace NULL values with specified defaults
- C) `df.na.ignore()` to skip NULL values during computation
- D) `df.na.interpolate()` to perform linear interpolation on NULLs
- E) `df.na.flag()` to mark rows with NULL values for later review

---

## Q6 (Single Answer)
Which SQL function removes duplicate rows from a result set while preserving the first occurrence based on a specified ordering?
- A) `DISTINCT`
- B) `GROUP BY`
- C) `QUALIFY ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) = 1`
- D) `HAVING COUNT(*) = 1`

---

## Q7 (Scenario)
A data scientist needs to create a 10% random sample of a 500-million-row sensor data table for exploratory analysis. The sample must be reproducible across multiple runs. Which SQL approach is most appropriate?
- A) `SELECT * FROM sensor_data LIMIT 50000000`
- B) `SELECT * FROM sensor_data SAMPLE (10) SEED (42)`
- C) `SELECT * FROM sensor_data TABLESAMPLE BERNOULLI (10)`
- D) `SELECT * FROM sensor_data ORDER BY RANDOM() LIMIT 50000000`

---

## Q8 (Single Answer)
In Snowpark Python, which method is used to select a subset of columns from a DataFrame, effectively removing irrelevant fields?
- A) `df.drop("col1", "col2")`
- B) `df.select("col1", "col2")`
- C) `df.filter_columns(["col1", "col2"])`
- D) `df.project("col1", "col2")`

---

## Q9 (Scenario)
A data scientist discovers that a `price` column stored as VARCHAR contains values like "$1,234.56". They need to clean and convert this column to a numeric type in Snowpark Python. What is the correct sequence of operations?
- A) Cast directly to `DecimalType()` — Snowpark handles currency symbols automatically
- B) Use `regexp_replace` to remove `$` and `,`, then cast to `DecimalType()`
- C) Use `to_decimal()` function which automatically strips formatting characters
- D) Use `translate()` to remove special characters, then use `TRY_CAST` in a SQL expression

---

## Q10 (Multi Answer - Select 2)
Which TWO Snowpark DataFrame methods can be used to aggregate data? (Select 2)
- A) `df.group_by("col").agg(avg("value"))`
- B) `df.summarize("col", "avg")`
- C) `df.group_by("col").count()`
- D) `df.aggregate({"col": "mean"})`
- E) `df.reduce_by("col").compute("avg")`

---

## Q11 (Single Answer)
What is the primary difference between the `SAMPLE` and `TABLESAMPLE` clauses in Snowflake SQL?
- A) `SAMPLE` works on stages while `TABLESAMPLE` works on tables
- B) They are synonymous — `TABLESAMPLE` is the ANSI SQL alias for `SAMPLE`
- C) `SAMPLE` returns exact row counts while `TABLESAMPLE` returns approximate percentages
- D) `SAMPLE` operates on materialized data while `TABLESAMPLE` operates on views

---

## Q12 (Scenario)
A data scientist is preparing training data and needs to identify which columns contain critical information for a fraud detection model. The dataset has 200 columns. Which Snowpark approach is most efficient for initial data profiling?
- A) Use `df.describe()` to get summary statistics for all columns
- B) Use `df.schema` to examine data types, then selectively compute null counts and distinct values per column
- C) Export all data to pandas and use `pandas-profiling` locally
- D) Create a Snowflake stored procedure that iterates through each column using `INFORMATION_SCHEMA`

---

## Q13 (Single Answer)
Which Snowpark DataFrame method performs an anti-join, returning rows from the left DataFrame that have no matching rows in the right DataFrame?
- A) `df1.join(df2, "key", "left_anti")`
- B) `df1.join(df2, "key", "anti")`
- C) `df1.except_(df2)`
- D) `df1.subtract(df2)`

---

## Q14 (Scenario)
A data scientist has a Snowpark DataFrame with a `timestamp` column in string format "2024-03-15T14:30:00Z". They need to extract the hour component for feature engineering. What is the correct approach?
- A) `df.with_column("HOUR", substring(col("TIMESTAMP"), 12, 2))`
- B) `df.with_column("HOUR", hour(to_timestamp(col("TIMESTAMP"))))`
- C) `df.with_column("HOUR", extract("hour", col("TIMESTAMP")))`
- D) `df.with_column("HOUR", col("TIMESTAMP").hour())`

---

## Q15 (Single Answer)
When using Snowpark Python to handle missing values, what does `df.na.drop(how="all")` do?
- A) Drops all rows that contain at least one NULL value
- B) Drops all columns that contain any NULL values
- C) Drops rows only when ALL column values in that row are NULL
- D) Drops the entire DataFrame if any NULL values exist

---

## Q16 (Scenario)
A data scientist needs to aggregate daily sales data into weekly summaries using Snowpark Python. The data contains `sale_date`, `store_id`, and `revenue` columns. Which approach correctly computes weekly revenue per store?
- A) `df.group_by(date_trunc("week", col("SALE_DATE")), col("STORE_ID")).agg(sum_(col("REVENUE")).alias("WEEKLY_REVENUE"))`
- B) `df.group_by("SALE_DATE", "STORE_ID").agg(sum_("REVENUE")).resample("W")`
- C) `df.window(Window.partition_by("STORE_ID").order_by("SALE_DATE").range_between(-7, 0)).sum("REVENUE")`
- D) `df.pivot("SALE_DATE", "week").group_by("STORE_ID").agg(sum_("REVENUE"))`

---

## Q17 (Multi Answer - Select 2)
Which TWO SQL sampling methods are supported in Snowflake? (Select 2)
- A) Row-level (Bernoulli) sampling where each row is independently selected with a given probability
- B) Block-level sampling where contiguous micro-partitions are selected
- C) Stratified sampling where rows are proportionally sampled from each group
- D) Systematic sampling where every Nth row is selected
- E) Weighted sampling where rows with higher column values are preferentially selected

---

## Q18 (Single Answer)
In Snowpark Python, what is the result of calling `df.drop_duplicates("COL_A", "COL_B")`?
- A) It removes rows where both `COL_A` and `COL_B` have duplicate values, keeping the first occurrence
- B) It removes the columns `COL_A` and `COL_B` if they contain duplicate values
- C) It raises an error because `drop_duplicates` only accepts a single column
- D) It removes all duplicate rows and returns only the `COL_A` and `COL_B` columns

---

## Q19 (Scenario)
A data scientist is preparing data for a classification model and discovers that the `income` column has values of -999 used as a sentinel for missing data. Using Snowpark Python, which approach correctly replaces these sentinel values with NULL?
- A) `df.with_column("INCOME", when(col("INCOME") == -999, lit(None)).otherwise(col("INCOME")))`
- B) `df.na.replace(-999, None, subset=["INCOME"])`
- C) `df.filter(col("INCOME") != -999)`
- D) `df.with_column("INCOME", iff(col("INCOME") == -999, NULL, col("INCOME")))`

---

## Q20 (Single Answer)
Which Snowflake SQL function is most appropriate for replacing NULL values with a specified default in a SELECT statement?
- A) `NVL(column, default_value)`
- B) `ISNULL(column, default_value)`
- C) `DEFAULT(column, default_value)`
- D) `REPLACE_NULL(column, default_value)`

---

## Q21 (Scenario)
A data scientist needs to join three Snowpark DataFrames: `customers`, `orders`, and `products`. The joins must be performed sequentially — customers to orders on `customer_id`, then the result to products on `product_id`. Which approach is correct?
- A) `customers.join(orders, "CUSTOMER_ID").join(products, "PRODUCT_ID")`
- B) `customers.join(orders, "CUSTOMER_ID", "inner").join(products, "PRODUCT_ID", "inner")`
- C) `customers.cross_join(orders).cross_join(products).filter(...)`
- D) `customers.merge(orders, "CUSTOMER_ID").merge(products, "PRODUCT_ID")`

---

## Q22 (Multi Answer - Select 2)
Which TWO approaches correctly identify critical data quality issues in a Snowpark DataFrame? (Select 2)
- A) Use `df.describe()` to detect columns with unexpectedly low counts indicating missing data
- B) Use `df.select([count(when(col(c).is_null(), 1)).alias(c) for c in df.columns])` to count NULLs per column
- C) Use `df.quality_report()` to generate an automated data quality assessment
- D) Use `df.validate()` to run built-in data validation rules
- E) Use `df.stat.crosstab("col1", "col2")` to detect label distribution issues

---

## Q23 (Single Answer)
What does the `COALESCE` function do when used in Snowflake SQL data preparation?
- A) Combines multiple columns into a single array column
- B) Returns the first non-NULL expression from a list of arguments
- C) Merges two tables based on matching keys
- D) Concatenates string values from multiple columns

---

## Q24 (Scenario)
A data scientist is working with a healthcare dataset where patient ages range from 0 to 120. They need to remove outlier records where age values are negative or greater than 130 using Snowpark Python. Which approach is correct?
- A) `df.filter((col("AGE") >= 0) & (col("AGE") <= 130))`
- B) `df.where(col("AGE").between(0, 130))`
- C) `df.filter(col("AGE") >= 0).filter(col("AGE") <= 130)`
- D) All of the above are correct and produce equivalent results

---

## Q25 (Single Answer)
In Snowflake SQL, which clause is used with the `QUALIFY` keyword to filter results of window functions?
- A) `QUALIFY` works with `WHERE` to pre-filter data before window function evaluation
- B) `QUALIFY` filters the output of window functions, similar to how `HAVING` filters aggregate results
- C) `QUALIFY` is used exclusively with `GROUP BY` to qualify aggregation results
- D) `QUALIFY` replaces `ORDER BY` when window functions are present

---

## Q26 (Scenario)
A data scientist needs to convert a categorical column `country_code` (containing values like "US", "UK", "DE") from StringType to a numeric representation in Snowpark. The mapping should be consistent across training and inference. Which approach is most appropriate for the initial data preparation step?
- A) Use `DECODE(country_code, 'US', 1, 'UK', 2, 'DE', 3)` in a SQL expression
- B) Use a Snowpark join with a separate mapping table
- C) Use `snowflake.ml.modeling.preprocessing.OrdinalEncoder` to fit and transform the data
- D) Use Python's `dict` mapping in a UDF applied to the column

---

## Q27 (Multi Answer - Select 2)
Which TWO data type casting functions in Snowflake SQL support safe casting that returns NULL instead of raising an error on invalid input? (Select 2)
- A) `TRY_CAST(expression AS type)`
- B) `CAST(expression AS type)`
- C) `TRY_TO_NUMBER(expression)`
- D) `TO_NUMBER(expression)`
- E) `CONVERT(type, expression)`

---

## Q28 (Single Answer)
When using Snowpark Python, what is the difference between `df.collect()` and `df.to_pandas()`?
- A) `collect()` returns a list of `Row` objects; `to_pandas()` returns a pandas DataFrame
- B) `collect()` executes the query lazily; `to_pandas()` executes eagerly
- C) `collect()` returns results in Snowflake; `to_pandas()` transfers data to the client
- D) `collect()` is for small datasets; `to_pandas()` is for large datasets

---

## Q29 (Scenario)
A data scientist is preparing a dataset with a `transaction_amount` column that contains both positive purchases and negative refunds. They need to create a new boolean column `is_refund` that is `True` when the amount is negative. Which Snowpark Python expression is correct?
- A) `df.with_column("IS_REFUND", col("TRANSACTION_AMOUNT") < 0)`
- B) `df.with_column("IS_REFUND", when(col("TRANSACTION_AMOUNT") < 0, True).otherwise(False))`
- C) `df.with_column("IS_REFUND", iff(col("TRANSACTION_AMOUNT") < 0, lit(True), lit(False)))`
- D) All of the above produce a valid boolean column

---

## Q30 (Single Answer)
Which Snowpark DataFrame method returns the number of rows in a DataFrame without transferring data to the client?
- A) `df.count()`
- B) `len(df)`
- C) `df.shape[0]`
- D) `df.num_rows()`

---

## Q31 (Scenario)
A data scientist is preparing a multi-terabyte dataset and needs to remove irrelevant columns before training. The dataset has 500 columns, and only 50 are needed. Which approach is more efficient from a compute perspective?
- A) Use `df.drop()` to remove 450 unwanted columns
- B) Use `df.select()` to keep only the 50 needed columns
- C) Both are equally efficient because Snowflake optimizes the query plan identically
- D) Create a view with only the 50 columns, then read from the view

---

## Q32 (Multi Answer - Select 2)
Which TWO statements about Snowpark DataFrame lazy evaluation are correct? (Select 2)
- A) Transformations like `select()`, `filter()`, and `join()` are not executed until an action is called
- B) Actions like `collect()`, `show()`, and `count()` trigger the execution of the query plan
- C) Each transformation creates an immediate query to Snowflake for incremental processing
- D) Lazy evaluation means the DataFrame is cached in client memory until explicitly executed
- E) Calling `df.explain()` executes the query and returns the results along with the query plan

---

## Q33 (Single Answer)
In Snowflake SQL, which function converts a NULL value to a specified replacement value for a single column?
- A) `IFNULL(column, replacement)`
- B) `NULLIF(column, replacement)`
- C) `ZEROIFNULL(column)`
- D) `NVL2(column, val_if_not_null, val_if_null)`

---

## Q34 (Scenario)
A data scientist has a Snowpark DataFrame with a `full_name` column containing values like "John Smith". They need to split this into separate `first_name` and `last_name` columns. Which approach is correct?
- A) `df.with_column("FIRST_NAME", split(col("FULL_NAME"), lit(" "))[0]).with_column("LAST_NAME", split(col("FULL_NAME"), lit(" "))[1])`
- B) `df.with_column("FIRST_NAME", substring(col("FULL_NAME"), 1, charindex(lit(" "), col("FULL_NAME")) - 1))`
- C) `df.with_column("FIRST_NAME", col("FULL_NAME").split(" ")[0])`
- D) `df.with_column("NAMES", explode(split(col("FULL_NAME"), lit(" "))))`

---

## Q35 (Single Answer)
What is the purpose of the `SEED` parameter when using `SAMPLE` in Snowflake SQL?
- A) It sets the maximum number of rows to return
- B) It ensures the sample is stratified across partitions
- C) It provides a deterministic seed for reproducible random sampling
- D) It specifies the initial data partition to begin sampling from

---

## Q36 (Scenario)
A data scientist is working with a DataFrame that has a `date_of_birth` column and needs to compute an `age` column. The computation requires the current date. Which Snowpark Python approach correctly derives this feature?
- A) `df.with_column("AGE", datediff("year", col("DATE_OF_BIRTH"), current_date()))`
- B) `df.with_column("AGE", year(current_date()) - year(col("DATE_OF_BIRTH")))`
- C) `df.with_column("AGE", floor(months_between(current_date(), col("DATE_OF_BIRTH")) / 12))`
- D) `df.with_column("AGE", (current_date() - col("DATE_OF_BIRTH")).days / 365)`

---

## Q37 (Multi Answer - Select 2)
Which TWO techniques are appropriate for handling missing numerical values before training a machine learning model in Snowflake? (Select 2)
- A) Replace NULLs with the column mean using `AVG()` in a window function or scalar subquery
- B) Replace NULLs with the column median using `PERCENTILE_CONT(0.5)` within a subquery
- C) Replace NULLs with 0 in all cases, as zero is a universal neutral value
- D) Delete the entire column if it contains any NULL values
- E) Use forward-fill by replacing NULLs with the previous non-null value using `LAG()` with `IGNORE NULLS`

---

## Q38 (Single Answer)
Which Snowpark Python method is used to rename columns in a DataFrame?
- A) `df.rename({"old_name": "new_name"})`
- B) `df.with_column_renamed("old_name", "new_name")`
- C) `df.alias(old_name="new_name")`
- D) `df.columns = ["new_name1", "new_name2"]`

---

## Q39 (Scenario)
A data scientist is performing exploratory data analysis on a 10-billion-row clickstream table and needs to quickly estimate the number of unique users. Running `COUNT(DISTINCT user_id)` is too slow. Which Snowflake function provides a faster approximation?
- A) `APPROX_COUNT_DISTINCT(user_id)`
- B) `HLL(user_id)`
- C) `ESTIMATED_COUNT(DISTINCT user_id)`
- D) `FAST_DISTINCT(user_id)`

---

## Q40 (Single Answer)
What algorithm does Snowflake's `APPROX_COUNT_DISTINCT` function use internally?
- A) Count-Min Sketch
- B) HyperLogLog
- C) Bloom Filter
- D) T-Digest

---

## Q41 (Scenario)
A data scientist wants to find the top 5 most frequently occurring product categories in a 2-billion-row sales table. An exact `GROUP BY` with `ORDER BY COUNT(*) DESC LIMIT 5` is too resource-intensive. Which Snowflake function should they use?
- A) `APPROX_TOP_K(product_category, 5)`
- B) `TOP_K(product_category, 5)`
- C) `MOST_FREQUENT(product_category, 5)`
- D) `APPROX_PERCENTILE(product_category, 5)`

---

## Q42 (Multi Answer - Select 2)
Which TWO statements about Snowflake's `APPROX_TOP_K` function are correct? (Select 2)
- A) It returns the approximate most-frequent values along with their estimated frequency counts
- B) It uses the Space-Saving algorithm to efficiently track frequent items
- C) It guarantees exact frequency counts for all returned values
- D) It requires the data to be pre-sorted before invocation
- E) It can only be used with numeric column types

---

## Q43 (Single Answer)
Which Snowflake SQL window function calculates the standard deviation of a column partitioned by a grouping column?
- A) `STDDEV(amount) OVER (PARTITION BY category)`
- B) `STD(amount) OVER (PARTITION BY category)`
- C) `STANDARD_DEVIATION(amount) OVER (PARTITION BY category)`
- D) `DEVIATION(amount) OVER (PARTITION BY category)`

---

## Q44 (Scenario)
A data scientist needs to profile a newly ingested dataset by computing the minimum, maximum, mean, standard deviation, and count for every numeric column. Which approach is most efficient in Snowflake?
- A) Write individual SQL queries for each statistic and column combination
- B) Use a single `SELECT` with `MIN()`, `MAX()`, `AVG()`, `STDDEV()`, and `COUNT()` for each numeric column
- C) Export the data to Python and use `pandas.describe()`
- D) Use `SHOW COLUMNS` to retrieve pre-computed column statistics

---

## Q45 (Single Answer)
In Snowflake SQL, what does the `VARIANCE` (or `VAR_SAMP`) function compute?
- A) The population variance of all non-NULL values
- B) The sample variance of all non-NULL values using Bessel's correction (N-1 denominator)
- C) The coefficient of variation of all non-NULL values
- D) The variance between groups in a `GROUP BY` clause

---

## Q46 (Scenario)
A data scientist is performing EDA and wants to compute a running average of daily revenue over the past 7 days for each store. Which SQL window function specification is correct?
- A) `AVG(revenue) OVER (PARTITION BY store_id ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`
- B) `AVG(revenue) OVER (PARTITION BY store_id ORDER BY sale_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)`
- C) `AVG(revenue) OVER (PARTITION BY store_id ORDER BY sale_date RANGE BETWEEN 7 PRECEDING AND CURRENT ROW)`
- D) `AVG(revenue) OVER (PARTITION BY store_id ROWS 7)`

---

## Q47 (Multi Answer - Select 2)
Which TWO Snowflake SQL functions can be used for linear regression analysis during exploratory data analysis? (Select 2)
- A) `REGR_SLOPE(dependent, independent)` to calculate the slope of the regression line
- B) `REGR_INTERCEPT(dependent, independent)` to calculate the y-intercept
- C) `LINEAR_FIT(dependent, independent)` to fit a linear model
- D) `REGR_PREDICT(independent, model)` to generate predictions from a fitted model
- E) `LINEST(dependent, independent)` to return an array of regression statistics

---

## Q48 (Single Answer)
What does `REGR_R2(y, x)` return in Snowflake SQL?
- A) The residual sum of squares of the regression
- B) The coefficient of determination (R-squared) indicating the proportion of variance explained
- C) The correlation coefficient (r) between x and y
- D) The root mean squared error of the regression

---

## Q49 (Scenario)
A data scientist at a telecommunications company is exploring customer churn data. They want to rank customers within each plan type by their monthly spend using a window function that assigns a unique rank with no gaps. Which function should they use?
- A) `RANK() OVER (PARTITION BY plan_type ORDER BY monthly_spend DESC)`
- B) `DENSE_RANK() OVER (PARTITION BY plan_type ORDER BY monthly_spend DESC)`
- C) `ROW_NUMBER() OVER (PARTITION BY plan_type ORDER BY monthly_spend DESC)`
- D) `NTILE(100) OVER (PARTITION BY plan_type ORDER BY monthly_spend DESC)`

---

## Q50 (Single Answer)
In Snowflake, what is the key difference between `RANK()` and `DENSE_RANK()` window functions?
- A) `RANK()` allows ties and leaves gaps in ranking; `DENSE_RANK()` allows ties but leaves no gaps
- B) `RANK()` assigns unique sequential numbers; `DENSE_RANK()` allows ties
- C) `RANK()` works only with numeric columns; `DENSE_RANK()` works with any type
- D) `RANK()` is calculated per partition; `DENSE_RANK()` is calculated across all partitions

---

## Q51 (Scenario)
A data scientist wants to connect a local Jupyter notebook to Snowflake for exploratory data analysis using Snowpark Python. Which is the correct way to establish a session?
- A) `from snowflake.snowpark import Session; session = Session.builder.configs(connection_parameters).create()`
- B) `import snowflake.connector; conn = snowflake.connector.connect(**params); session = conn.to_snowpark()`
- C) `from snowflake.ml import Session; session = Session(**connection_parameters)`
- D) `from snowpark import create_session; session = create_session(connection_parameters)`

---

## Q52 (Multi Answer - Select 2)
Which TWO statements about using `NTILE` in Snowflake SQL are correct? (Select 2)
- A) `NTILE(n)` divides an ordered dataset into `n` approximately equal groups and assigns a bucket number
- B) `NTILE` is useful for creating quantile-based bins during exploratory data analysis
- C) `NTILE` requires that the dataset has exactly `n` rows to function properly
- D) `NTILE` guarantees that each bucket has the exact same number of rows
- E) `NTILE` assigns bucket numbers starting from 0

---

## Q53 (Single Answer)
What does the `REGR_SLOPE(y, x)` function return when used in Snowflake SQL?
- A) The slope of the ordinary least squares regression line for the (x, y) pairs
- B) The gradient descent step size for iterative model fitting
- C) The slope of the line connecting the minimum and maximum data points
- D) The rate of change in y per unit change in x using a robust regression method

---

## Q54 (Scenario)
A data scientist is exploring a dataset and needs to determine whether there is a linear relationship between advertising spend and revenue. They compute `REGR_R2(revenue, ad_spend)` and get a value of 0.12. What should they conclude?
- A) There is a strong positive linear relationship — advertising spend explains most of the revenue variance
- B) There is a weak linear relationship — only 12% of the variance in revenue is explained by advertising spend
- C) The regression model is invalid because R-squared should be closer to 1.0
- D) There is a perfect negative correlation between advertising spend and revenue

---

## Q55 (Single Answer)
Which Snowflake SQL function computes the population variance (using N as the denominator) rather than the sample variance?
- A) `VARIANCE(column)`
- B) `VAR_POP(column)`
- C) `VAR_SAMP(column)`
- D) `STDDEV_POP(column)`

---

## Q56 (Scenario)
A data scientist needs to use external Python visualization libraries like `matplotlib` and `seaborn` in a Snowflake Notebook. How should they import these packages?
- A) Use `pip install matplotlib seaborn` in a code cell and then import normally
- B) Upload the library wheel files to a Snowflake stage and reference them
- C) Select the packages from the Packages dropdown in the notebook UI, then import them in a Python cell
- D) External visualization libraries are not supported in Snowflake Notebooks

---

## Q57 (Multi Answer - Select 2)
Which TWO approaches allow connecting an external Jupyter notebook to Snowflake for data analysis? (Select 2)
- A) Using the Snowpark Python library to create a session and work with DataFrames
- B) Using the Snowflake Python Connector with pandas integration via `fetch_pandas_all()`
- C) Using Snowflake's built-in REST API with raw HTTP requests from Jupyter
- D) Using the JDBC driver directly from Python without any additional library
- E) Using Snowflake's native Jupyter kernel that replaces the Python kernel

---

## Q58 (Single Answer)
Which Snowflake SQL function returns the cumulative distribution of a value within a window partition?
- A) `CUME_DIST() OVER (...)`
- B) `PERCENT_RANK() OVER (...)`
- C) `PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY ...)`
- D) `RATIO_TO_REPORT() OVER (...)`

---

## Q59 (Scenario)
A data scientist is profiling a new dataset and wants to quickly check the distribution of values in a `status` column that may have many distinct values. They want to see the top 10 most common values and their approximate frequencies. Which SQL query is most efficient?
- A) `SELECT status, COUNT(*) AS freq FROM table GROUP BY status ORDER BY freq DESC LIMIT 10`
- B) `SELECT APPROX_TOP_K(status, 10) FROM table`
- C) `SELECT status, APPROX_COUNT_DISTINCT(status) FROM table GROUP BY status LIMIT 10`
- D) `SELECT TOP 10 status FROM table ORDER BY status`

---

## Q60 (Single Answer)
In Snowflake SQL, what does the `DECODE` function do?
- A) Decodes base64-encoded string values back to their original form
- B) Compares an expression to a series of search values and returns the corresponding result value
- C) Decodes JSON-encoded strings into structured data
- D) Converts encoded categorical values back to their original labels

---

## Q61 (Scenario)
A data scientist wants to verify whether `total_sales` (dependent variable) has a significant linear dependency on `marketing_budget` (independent variable). Which combination of Snowflake SQL regression functions should they examine?
- A) `REGR_R2` to check the proportion of variance explained, and `REGR_COUNT` to confirm sufficient data points
- B) `REGR_SLOPE` and `REGR_INTERCEPT` only, since having non-zero values confirms dependency
- C) `CORR` to check correlation, then `STDDEV` to verify the spread is normally distributed
- D) `REGR_SXX` and `REGR_SYY` to compute the sum of squares, which directly indicates dependency

---

## Q62 (Multi Answer - Select 2)
Which TWO window functions in Snowflake SQL are useful for identifying data patterns during exploratory data analysis? (Select 2)
- A) `LAG(column, offset) OVER (ORDER BY ...)` to compare current values with previous values
- B) `LEAD(column, offset) OVER (ORDER BY ...)` to look ahead at future values
- C) `MERGE(column) OVER (ORDER BY ...)` to combine adjacent rows
- D) `PIVOT(column) OVER (ORDER BY ...)` to transpose rows to columns within a window
- E) `FLATTEN(column) OVER (ORDER BY ...)` to expand nested arrays within a window

---

## Q63 (Single Answer)
What does the `CORR(y, x)` function return in Snowflake SQL?
- A) The covariance between x and y
- B) The Pearson correlation coefficient between x and y, ranging from -1 to 1
- C) The Spearman rank correlation coefficient between x and y
- D) The number of correlated pairs between x and y

---

## Q64 (Scenario)
A data scientist at a bank is performing EDA on transaction data and discovers that the `transaction_amount` column has extreme outliers. They want to compute the interquartile range (IQR) using Snowflake SQL. Which approach is correct?
- A) `SELECT PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY amount) - PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY amount) AS iqr FROM transactions`
- B) `SELECT MAX(amount) - MIN(amount) AS iqr FROM transactions`
- C) `SELECT STDDEV(amount) * 2 AS iqr FROM transactions`
- D) `SELECT VARIANCE(amount) AS iqr FROM transactions`

---

## Q65 (Single Answer)
What is the `RATIO_TO_REPORT` window function used for in Snowflake SQL?
- A) Computing the ratio of each row's value to the sum of all values in its partition
- B) Computing the ratio of NULL values to non-NULL values in a column
- C) Generating a report of data quality ratios across columns
- D) Computing the ratio between two specified columns within a window frame

---

## Q66 (Scenario)
A data scientist is connecting an external data science platform to Snowflake and needs to pull a sample of data into a pandas DataFrame efficiently. Which method avoids bringing the entire table into memory?
- A) `cursor.execute("SELECT * FROM large_table").fetchall()` then convert to pandas
- B) `cursor.execute("SELECT * FROM large_table SAMPLE (1)").fetch_pandas_all()`
- C) `pd.read_sql("SELECT * FROM large_table", connection)` with `chunksize` parameter
- D) `session.table("large_table").to_pandas()` without any filtering

---

## Q67 (Multi Answer - Select 2)
Which TWO Snowflake SQL functions compute the relationship between two variables for linear regression analysis? (Select 2)
- A) `REGR_SLOPE(y, x)` computes the slope of the least-squares regression line
- B) `REGR_INTERCEPT(y, x)` computes the y-intercept of the regression line
- C) `REGR_FIT(y, x)` fits a complete linear model and stores it for later prediction
- D) `REGR_PREDICT(x, coefficients)` applies the regression model to new data
- E) `REGR_TRANSFORM(y, x)` normalizes both variables before regression

---

## Q68 (Single Answer)
In Snowflake SQL, which function computes the covariance between two columns?
- A) `COVAR_SAMP(y, x)` for sample covariance
- B) `CORR(y, x)` for covariance
- C) `COV(y, x)` for covariance
- D) `VARIANCE(y, x)` for bivariate variance

---

## Q69 (Scenario)
A data scientist wants to use Snowflake's `REGR_INTERCEPT` function but needs to ensure the results are meaningful. Which prerequisite must be met?
- A) Both columns must be of STRING type and will be automatically converted
- B) The dependent and independent variables must be numeric, and NULL pairs are automatically excluded
- C) The data must be explicitly pre-sorted by the independent variable before calling the function
- D) A minimum of 1000 data points is required for the function to return a result

---

## Q70 (Single Answer)
What does the `MEDIAN` function compute in Snowflake SQL?
- A) The arithmetic mean of the middle two values in an even-length dataset
- B) The 50th percentile value, equivalent to `PERCENTILE_CONT(0.5)`
- C) The most frequently occurring value in the dataset
- D) The midpoint between the minimum and maximum values

---

## Q71 (Scenario)
A data scientist is performing EDA on sensor data collected every second. To detect anomalies, they want to compute the z-score of each reading relative to the mean and standard deviation of the past 60 readings. Which SQL approach is correct?
- A) `(reading - AVG(reading) OVER (ORDER BY ts ROWS BETWEEN 59 PRECEDING AND CURRENT ROW)) / STDDEV(reading) OVER (ORDER BY ts ROWS BETWEEN 59 PRECEDING AND CURRENT ROW)`
- B) `(reading - AVG(reading)) / STDDEV(reading)` computed globally
- C) `NTILE(100) OVER (ORDER BY reading)` to find the percentile
- D) `PERCENT_RANK() OVER (ORDER BY reading)` to find the relative position

---

## Q72 (Multi Answer - Select 2)
Which TWO statements about Snowflake's approximation functions are correct? (Select 2)
- A) Approximation functions like `APPROX_COUNT_DISTINCT` trade exact precision for significantly better performance on large datasets
- B) `APPROX_COUNT_DISTINCT` typically provides results with less than 2% relative error
- C) Approximation functions produce identical results to their exact counterparts on all dataset sizes
- D) `APPROX_TOP_K` returns exact frequency counts but approximate ranking
- E) Approximation functions cannot be used with window functions or `GROUP BY` clauses

---

## Q73 (Single Answer)
Which Snowflake SQL function returns the Nth percentile value using continuous interpolation?
- A) `PERCENTILE_CONT(n) WITHIN GROUP (ORDER BY column)`
- B) `PERCENTILE_DISC(n) WITHIN GROUP (ORDER BY column)`
- C) `NTH_PERCENTILE(column, n)`
- D) `QUANTILE(column, n)`

---

## Q74 (Single Answer)
In the `snowflake.ml.modeling.preprocessing` module, which class is used to standardize features by removing the mean and scaling to unit variance?
- A) `StandardScaler`
- B) `MinMaxScaler`
- C) `Normalizer`
- D) `RobustScaler`

---

## Q75 (Scenario)
A data scientist needs to scale a `price` feature so that all values fall between 0 and 1 before training a neural network. Which preprocessing class from `snowflake.ml.modeling.preprocessing` should they use?
- A) `StandardScaler`
- B) `MinMaxScaler`
- C) `MaxAbsScaler`
- D) `Normalizer`

---

## Q76 (Single Answer)
What is the key difference between `StandardScaler` and `MinMaxScaler` in `snowflake.ml.modeling.preprocessing`?
- A) `StandardScaler` scales to zero mean and unit variance; `MinMaxScaler` scales to a specified range (default [0, 1])
- B) `StandardScaler` works only with integer columns; `MinMaxScaler` works with any numeric type
- C) `StandardScaler` operates row-wise; `MinMaxScaler` operates column-wise
- D) `StandardScaler` is for classification features; `MinMaxScaler` is for regression features

---

## Q77 (Scenario)
A data scientist is building a model that uses distance-based calculations (e.g., k-nearest neighbors). The feature columns have very different scales: `age` ranges from 18-80 and `income` ranges from 20,000-500,000. Why is feature scaling critical in this case?
- A) Scaling is required to prevent NULL values from affecting the distance calculations
- B) Without scaling, features with larger ranges like `income` would dominate distance calculations, making `age` nearly irrelevant
- C) Scaling is needed to convert all features to the same data type before computing distances
- D) Distance-based algorithms automatically normalize features, so scaling is only for interpretability

---

## Q78 (Multi Answer - Select 2)
Which TWO preprocessing classes in `snowflake.ml.modeling.preprocessing` are used for encoding categorical variables? (Select 2)
- A) `OrdinalEncoder` for mapping categories to ordered integer values
- B) `OneHotEncoder` for creating binary indicator columns for each category
- C) `BinaryEncoder` for converting categories to binary representation
- D) `TargetEncoder` for encoding categories based on the target variable mean
- E) `HashEncoder` for encoding categories using a hash function

---

## Q79 (Single Answer)
What is one-hot encoding and when is it most appropriate?
- A) Converting a categorical variable into binary by setting one category to 1 and all others to 0
- B) Creating a separate binary column for each category value, where exactly one column is 1 per row
- C) Encoding categories as sequential integers starting from 1
- D) Mapping categories to their frequency counts in the dataset

---

## Q80 (Scenario)
A data scientist is encoding a `color` feature with values {Red, Green, Blue} using `OneHotEncoder` from `snowflake.ml.modeling.preprocessing`. They are concerned about the "dummy variable trap" in linear models. Which parameter should they configure?
- A) Set `drop="first"` to drop the first category column and avoid multicollinearity
- B) Set `sparse=True` to use sparse matrix representation
- C) Set `handle_unknown="ignore"` to skip unseen categories
- D) Set `max_categories=2` to limit the number of generated columns

---

## Q81 (Single Answer)
In `snowflake.ml.modeling.preprocessing`, what does `LabelEncoder` do?
- A) Encodes a single categorical target column into integer values from 0 to n_classes-1
- B) Creates binary labels for multi-class classification problems
- C) Applies one-hot encoding specifically to the target variable
- D) Generates weighted labels based on class frequencies

---

## Q82 (Scenario)
A data scientist needs to create derived features from a customer transactions table. They want to compute `average_monthly_spend`, `total_transactions`, and `days_since_last_purchase` per customer. Which Snowpark approach is most appropriate?
- A) Use `group_by("CUSTOMER_ID").agg(...)` with multiple aggregation functions to compute all three features in a single pass
- B) Create three separate DataFrames, one for each feature, then join them together
- C) Use a Python UDF that iterates through each customer's transactions to compute the features
- D) Export the data to pandas, compute the features locally, then write back to Snowflake

---

## Q83 (Multi Answer - Select 2)
Which TWO statements about the Snowpark Feature Store are correct? (Select 2)
- A) It provides a centralized repository for storing, managing, and serving ML features
- B) It supports defining feature entities that represent the real-world objects features describe
- C) It automatically trains ML models using the stored features
- D) It replaces the need for any data preprocessing or transformation
- E) It stores feature metadata only and always computes features on-the-fly at query time

---

## Q84 (Single Answer)
What is the primary purpose of the Snowpark Feature Store?
- A) To provide a GPU-accelerated feature computation engine
- B) To enable reuse and sharing of curated features across ML projects while ensuring consistency between training and serving
- C) To automatically generate features from raw data without human intervention
- D) To store trained ML models alongside their feature definitions

---

## Q85 (Scenario)
A data scientist is using the Snowpark Feature Store and needs to define an entity for customer-level features. Which concept in the Feature Store represents the join key that uniquely identifies each entity instance?
- A) The `Entity` object with a `join_keys` parameter specifying the columns that uniquely identify each instance
- B) The `FeatureView` object with a `primary_key` parameter
- C) The `FeatureGroup` object with an `identifier` parameter
- D) The `FeatureTable` object with a `partition_key` parameter

---

## Q86 (Single Answer)
In the context of feature engineering, what is "binning" (or discretization)?
- A) Converting categorical variables into numerical values
- B) Dividing continuous numerical data into discrete intervals or categories
- C) Removing outlier data points from the dataset
- D) Applying binary encoding to all feature columns

---

## Q87 (Scenario)
A data scientist needs to bin customer ages into groups (0-17: "Minor", 18-35: "Young Adult", 36-55: "Middle Age", 56+: "Senior") using Snowflake SQL. Which approach is most appropriate?
- A) `CASE WHEN age BETWEEN 0 AND 17 THEN 'Minor' WHEN age BETWEEN 18 AND 35 THEN 'Young Adult' WHEN age BETWEEN 36 AND 55 THEN 'Middle Age' ELSE 'Senior' END`
- B) `DECODE(age, 0, 'Minor', 18, 'Young Adult', 36, 'Middle Age', 56, 'Senior')`
- C) `NTILE(4) OVER (ORDER BY age)`
- D) `WIDTH_BUCKET(age, 0, 100, 4)`

---

## Q88 (Multi Answer - Select 2)
Which TWO functions or techniques can be used to bin continuous data into equal-frequency groups in Snowflake SQL? (Select 2)
- A) `NTILE(n) OVER (ORDER BY column)` to divide rows into n approximately equal groups
- B) `WIDTH_BUCKET(column, min, max, n)` to create n equal-width bins
- C) `PERCENTILE_CONT` to identify boundaries for equal-frequency bins
- D) `ROUND(column / bin_size)` to create equal-width bins
- E) `HISTOGRAM(column, n)` to automatically create n optimal bins

---

## Q89 (Single Answer)
What is the difference between label encoding and ordinal encoding?
- A) They are identical — both map categories to sequential integers
- B) Label encoding assigns arbitrary integers to categories; ordinal encoding preserves the inherent order of categories
- C) Label encoding is for binary features; ordinal encoding is for multi-class features
- D) Label encoding is supervised; ordinal encoding is unsupervised

---

## Q90 (Scenario)
A data scientist has a `payment_method` feature with values {Credit Card, Debit Card, Cash, Wire Transfer}. These categories have no natural ordering. Which encoding is most appropriate for a tree-based model?
- A) Ordinal encoding, since tree-based models can handle integer-encoded categories directly
- B) One-hot encoding, to avoid introducing artificial ordering
- C) Binary encoding, to reduce dimensionality compared to one-hot
- D) Target encoding, to capture the relationship between category and target variable

---

## Q91 (Single Answer)
In `snowflake.ml.modeling.preprocessing`, which class applies normalization to scale individual samples (rows) to have unit norm?
- A) `StandardScaler`
- B) `MinMaxScaler`
- C) `Normalizer`
- D) `MaxAbsScaler`

---

## Q92 (Scenario)
A data scientist is working with Snowpark DataFrames and needs to convert them to pandas-like operations for complex transformations. Which library enables pandas-compatible operations that execute on the Snowflake engine?
- A) Standard pandas imported directly — Snowpark automatically intercepts the calls
- B) `modin.pandas` configured with a Snowflake backend
- C) Snowpark pandas API via `import modin.pandas as pd` with Snowpark pandas as the backend
- D) `import snowflake.snowpark.modin.plugin` followed by `import modin.pandas as pd`

---

## Q93 (Multi Answer - Select 2)
Which TWO statements about Snowpark pandas (pandas on Snowflake) are correct? (Select 2)
- A) Snowpark pandas transpiles pandas operations into SQL that runs on the Snowflake engine
- B) Snowpark pandas requires data to be downloaded to the client before performing operations
- C) Snowpark pandas supports a significant subset of the pandas API while keeping data in Snowflake
- D) Snowpark pandas only works with datasets smaller than 10 GB
- E) Snowpark pandas requires replacing all pandas imports with `snowflake.snowpark.pandas`

---

## Q94 (Single Answer)
What is the advantage of using Snowpark DataFrames over converting to pandas DataFrames for feature engineering on large datasets?
- A) Snowpark DataFrames support more transformation operations than pandas
- B) Snowpark DataFrames execute operations on the Snowflake engine, avoiding data transfer to the client and leveraging Snowflake's scalable compute
- C) Snowpark DataFrames provide real-time visualization of transformations
- D) Snowpark DataFrames automatically detect and correct data quality issues

---

## Q95 (Scenario)
A data scientist is creating a derived feature for a recommendation system. They need to calculate the average product rating per user, then join it back to the original transactions table as a new feature. Using Snowpark Python, which approach is most efficient?
- A) Compute the average in a separate DataFrame using `group_by` and `agg`, then `join` back
- B) Use a window function: `avg(col("RATING")).over(Window.partition_by("USER_ID"))`
- C) Both A and B are valid, but B avoids the explicit join and is more concise
- D) Use a Python UDF that queries the database for each user's average rating

---

## Q96 (Single Answer)
In `snowflake.ml.modeling.preprocessing`, what does `MaxAbsScaler` do?
- A) Scales each feature by its maximum absolute value so that values range between -1 and 1
- B) Removes features with values exceeding a maximum absolute threshold
- C) Scales features to have a maximum absolute correlation of 1 with the target variable
- D) Applies absolute value transformation followed by max normalization

---

## Q97 (Scenario)
A data scientist needs to handle a highly imbalanced classification dataset where only 2% of records are positive. They decide to apply SMOTE to generate synthetic positive examples. Where in the ML pipeline should SMOTE typically be applied?
- A) Before any train/test split, on the entire dataset
- B) After the train/test split, only on the training set
- C) After the train/test split, on both training and test sets
- D) During model training as a built-in parameter of the algorithm

---

## Q98 (Multi Answer - Select 2)
Which TWO techniques are appropriate for handling class imbalance in a classification dataset? (Select 2)
- A) SMOTE (Synthetic Minority Over-sampling Technique) to generate synthetic minority class examples
- B) Random undersampling of the majority class to balance class proportions
- C) Removing all minority class examples to simplify the problem
- D) Duplicating the entire dataset to increase the total number of samples
- E) Converting the classification problem to regression to avoid class imbalance

---

## Q99 (Single Answer)
What does SMOTE (Synthetic Minority Over-sampling Technique) do to address class imbalance?
- A) It randomly duplicates existing minority class samples
- B) It creates new synthetic minority class samples by interpolating between existing minority class neighbors in feature space
- C) It removes majority class samples that are closest to the minority class boundary
- D) It adjusts the decision threshold of the classifier to favor the minority class

---

## Q100 (Scenario)
A data scientist is using the `snowflake.ml.modeling.preprocessing` module and needs to apply different preprocessing steps to numerical and categorical columns. They want to scale numerical columns with `StandardScaler` and encode categorical columns with `OneHotEncoder`. What is the recommended approach?
- A) Apply each transformer separately to the relevant column subsets and concatenate the results
- B) Use `snowflake.ml.modeling.pipeline.Pipeline` to chain the preprocessing steps
- C) Use `snowflake.ml.modeling.preprocessing.ColumnTransformer` to apply different transformers to different column groups
- D) Write a custom Python UDF that applies both transformations in sequence

---

## Q101 (Single Answer)
What does the `Binarizer` class in `snowflake.ml.modeling.preprocessing` do?
- A) Converts numerical features into binary (0/1) values based on a specified threshold
- B) Converts categorical features into binary encoded columns
- C) Splits the dataset into two subsets (binary partition)
- D) Applies binary search to find optimal preprocessing parameters

---

## Q102 (Scenario)
A data scientist has a `temperature` feature in Celsius and wants to binarize it such that values above 37.5 are marked as 1 (fever) and values at or below 37.5 are marked as 0 (normal). Using `snowflake.ml.modeling.preprocessing.Binarizer`, how should they configure it?
- A) `Binarizer(threshold=37.5, input_cols=["TEMPERATURE"], output_cols=["HAS_FEVER"])`
- B) `Binarizer(cutoff=37.5, columns=["TEMPERATURE"])`
- C) `Binarizer(boundary=37.5, feature="TEMPERATURE", label="HAS_FEVER")`
- D) `Binarizer(split_value=37.5, input_col="TEMPERATURE")`

---

## Q103 (Multi Answer - Select 2)
Which TWO statements about the Snowpark Feature Store's `FeatureView` are correct? (Select 2)
- A) A `FeatureView` defines the logic for computing a set of features from source data
- B) A `FeatureView` can be backed by a SQL query or a Snowpark DataFrame transformation
- C) A `FeatureView` automatically performs hyperparameter tuning on the features it computes
- D) A `FeatureView` can only contain features from a single source table
- E) A `FeatureView` must be explicitly registered with the Feature Store before it can be used

---

## Q104 (Single Answer)
Which `snowflake.ml.modeling.preprocessing` class is used to impute missing values by replacing them with a computed statistic like mean, median, or most frequent value?
- A) `SimpleImputer`
- B) `MissingValueHandler`
- C) `NullReplacer`
- D) `DataCleaner`

---

## Q105 (Scenario)
A data scientist is preparing features for a gradient boosting model and has a high-cardinality categorical column `zip_code` with over 40,000 unique values. One-hot encoding would create too many features. Which alternative encoding approach is more appropriate?
- A) Label encoding with random integer assignment
- B) One-hot encoding with a `max_categories` parameter to limit output columns
- C) Ordinal encoding based on the alphabetical order of zip codes
- D) Frequency encoding, where each zip code is replaced by its occurrence count in the dataset

---

## Q106 (Single Answer)
In Snowpark Python, which method on a DataFrame creates a new column derived from existing columns?
- A) `df.with_column("NEW_COL", expression)`
- B) `df.add_column("NEW_COL", expression)`
- C) `df.create_column("NEW_COL", expression)`
- D) `df.insert_column("NEW_COL", expression)`

---

## Q107 (Scenario)
A data scientist is building features for a customer churn model and needs to create a `recency` feature (days since last purchase), a `frequency` feature (total number of purchases), and a `monetary` feature (total spend). These are classic RFM features. Which Snowpark approach correctly computes all three in one step?
- A) `df.group_by("CUSTOMER_ID").agg(datediff("day", max_(col("PURCHASE_DATE")), current_date()).alias("RECENCY"), count("*").alias("FREQUENCY"), sum_(col("AMOUNT")).alias("MONETARY"))`
- B) `df.select("CUSTOMER_ID", "PURCHASE_DATE", "AMOUNT").compute_rfm()`
- C) `df.group_by("CUSTOMER_ID").apply(lambda x: compute_rfm(x))`
- D) `df.pivot("CUSTOMER_ID").agg({"PURCHASE_DATE": "max", "AMOUNT": ["count", "sum"]})`

---

## Q108 (Multi Answer - Select 2)
Which TWO approaches are valid for performing dimensionality reduction using the `snowflake.ml.modeling` module? (Select 2)
- A) `snowflake.ml.modeling.decomposition.PCA` for Principal Component Analysis
- B) `snowflake.ml.modeling.manifold.TSNE` for t-distributed Stochastic Neighbor Embedding
- C) `snowflake.ml.modeling.decomposition.TruncatedSVD` for Singular Value Decomposition
- D) `snowflake.ml.modeling.reduction.AutoDimensionReduce` for automatic feature selection
- E) `snowflake.ml.modeling.decomposition.LLE` for Locally Linear Embedding

---

## Q109 (Single Answer)
What is the primary purpose of Principal Component Analysis (PCA) as available in `snowflake.ml.modeling.decomposition`?
- A) To identify and remove outliers from the dataset
- B) To reduce dimensionality by projecting data onto orthogonal components that capture the most variance
- C) To encode categorical features as principal components
- D) To cluster data points into principal groups based on similarity

---

## Q110 (Scenario)
A data scientist needs to use the `snowflake.ml.modeling.preprocessing.OrdinalEncoder` to encode a `size` column with values {Small, Medium, Large, XL}. The natural ordering must be preserved. How should they configure the encoder?
- A) `OrdinalEncoder(input_cols=["SIZE"], output_cols=["SIZE_ENCODED"], categories={"SIZE": ["Small", "Medium", "Large", "XL"]})`
- B) `OrdinalEncoder(columns=["SIZE"], order="ascending")`
- C) `OrdinalEncoder(input_cols=["SIZE"], output_cols=["SIZE_ENCODED"])` — it automatically detects ordering
- D) `OrdinalEncoder(input_cols=["SIZE"], output_cols=["SIZE_ENCODED"], sort_by="alphabetical")`

---

## Q111 (Single Answer)
In Snowflake SQL, how can the `DECODE` function be used for feature engineering?
- A) To decompose a feature into its component parts
- B) To map discrete values to new values, similar to a CASE expression but with more compact syntax
- C) To decode encrypted column values for analysis
- D) To reverse the encoding applied by `ENCODE` function

---

## Q112 (Scenario)
A data scientist is registering a Feature View with the Snowpark Feature Store. The Feature View computes rolling 30-day average transaction amounts per customer. What determines when the feature values are refreshed?
- A) Feature values are refreshed only when explicitly triggered by a manual API call
- B) The `refresh_freq` parameter on the Feature View controls the refresh schedule, and the Feature View is materialized as a dynamic table
- C) Feature values are always computed on-the-fly at query time with no materialization
- D) Feature values are refreshed once daily at midnight UTC by default

---

## Q113 (Multi Answer - Select 2)
Which TWO types of data transformations in `snowflake.ml.modeling.preprocessing` maintain a fitted state that must be consistent between training and inference? (Select 2)
- A) `StandardScaler` stores the mean and standard deviation computed during `fit()`
- B) `OneHotEncoder` stores the category-to-column mappings learned during `fit()`
- C) `Binarizer` stores the optimal threshold determined during `fit()`
- D) Mathematical operations like `log()` or `sqrt()` which store transform parameters during `fit()`
- E) `Normalizer` stores the norm values computed during `fit()`

---

## Q114 (Single Answer)
Which feature in Snowsight allows a data scientist to create visualizations directly from SQL query results?
- A) The Charts tab that automatically suggests visualizations based on query results
- B) The Dashboards tab that requires importing visualization libraries
- C) The Analytics panel that only supports tabular result display
- D) The Visualization Studio that requires a separate license

---

## Q115 (Scenario)
A data scientist is using a Snowflake Notebook to present findings to business stakeholders. They need to create an interactive scatter plot of customer lifetime value vs. acquisition cost. Which approach is supported?
- A) Use `matplotlib` to create a static scatter plot in a Python cell
- B) Use `altair` to create an interactive scatter plot that renders inline in the notebook
- C) Use Snowsight's built-in charting by querying data in a SQL cell
- D) All of the above are supported visualization approaches in Snowflake Notebooks

---

## Q116 (Single Answer)
In Snowflake Notebooks, what is the purpose of the `%%sql` cell magic (or SQL cell type)?
- A) It converts Python code into SQL for execution
- B) It allows writing and executing SQL queries directly, with results available to Python cells
- C) It validates SQL syntax without executing the query
- D) It creates a stored procedure from the SQL in the cell

---

## Q117 (Scenario)
A data scientist has identified several data outliers in a box plot created in Snowsight. The box plot shows `revenue` by `region`, and one region has extreme values above the upper whisker. Which SQL technique is most appropriate to quantify these outliers?
- A) `SELECT * FROM sales WHERE revenue > (SELECT AVG(revenue) + 3 * STDDEV(revenue) FROM sales WHERE region = 'target_region') AND region = 'target_region'`
- B) `SELECT * FROM sales WHERE revenue > (SELECT MAX(revenue) FROM sales)`
- C) `SELECT * FROM sales WHERE revenue NOT BETWEEN 0 AND 1000000`
- D) `SELECT * FROM sales WHERE revenue IS NULL`

---

## Q118 (Multi Answer - Select 2)
Which TWO chart types are available in Snowsight for visualizing SQL query results? (Select 2)
- A) Bar charts for comparing categorical data
- B) Line charts for visualizing trends over time
- C) 3D surface plots for three-variable relationships
- D) Network graphs for relationship visualization
- E) Sankey diagrams for flow visualization

---

## Q119 (Single Answer)
What is the IQR-based method for identifying outliers in a dataset?
- A) Values below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR are considered outliers
- B) Values more than 1 standard deviation from the mean are outliers
- C) Values below the 5th percentile or above the 95th percentile are outliers
- D) Values that differ from the median by more than 50% are outliers

---

## Q120 (Scenario)
A data scientist wants to schedule a Snowflake Notebook to run automatically every morning at 8 AM to refresh data visualizations for a daily business review. How can they accomplish this?
- A) Use the notebook scheduling feature to create a schedule with a specified cron expression or interval
- B) Create an external cron job that calls the Snowflake REST API to execute the notebook
- C) Use Snowflake Tasks to trigger the notebook via a stored procedure
- D) Snowflake Notebooks cannot be scheduled — they must be run manually

---

## Q121 (Single Answer)
Which open-source Python visualization library is commonly used in Snowflake Notebooks for creating statistical plots such as distribution plots and heatmaps?
- A) `seaborn`
- B) `d3.js`
- C) `ggplot`
- D) `tableau`

---

## Q122 (Scenario)
A data scientist needs to create a dashboard-style summary for stakeholders showing key metrics (total revenue, customer count, average order value) alongside a trend chart. Using Snowflake Notebooks, which approach is most appropriate?
- A) Create SQL cells for each metric, use Python cells with `matplotlib` for the trend chart, and add markdown cells for narrative explanations
- B) Export all data to a local BI tool and create the dashboard there
- C) Create a single SQL cell with all metrics and rely on Snowsight's automatic visualization
- D) Use only Python cells with inline HTML rendering for all components

---

## Q123 (Multi Answer - Select 2)
Which TWO capabilities do Snowflake Notebooks provide for data visualization and analysis? (Select 2)
- A) Mixed cell types (SQL, Python, Markdown) in a single notebook for integrated analysis
- B) Native support for importing Python packages like `matplotlib`, `seaborn`, and `plotly` for custom visualizations
- C) Automatic machine learning model training from visualized data
- D) Direct export to PowerPoint presentations with embedded interactive charts
- E) Real-time collaborative editing on the same notebook simultaneously

---

## Q124 (Single Answer)
When using `plotly` in a Snowflake Notebook, how are interactive visualizations rendered?
- A) They are rendered as static images since notebooks don't support JavaScript
- B) They are rendered as interactive HTML widgets directly in the notebook output
- C) They require a separate browser tab to display the interactive plot
- D) They are converted to Snowsight native charts automatically

---

## Q125 (Scenario)
A data scientist is presenting a business case to executives and needs to show that customer churn has a seasonal pattern. The data is in Snowflake. Which visualization approach best demonstrates this pattern?
- A) A line chart in Snowsight showing monthly churn rate over multiple years, with each year as a separate series
- B) A single number showing the overall average churn rate
- C) A table of monthly churn rates sorted by month
- D) A pie chart showing the proportion of churned vs. retained customers

---

## Q126 (Single Answer)
In Snowsight, what happens when you select the "Heatgrid" chart type for a query result?
- A) It creates a color-coded matrix showing the magnitude of values across two categorical dimensions
- B) It highlights the hottest-selling products in a table
- C) It shows a geographic heat map of data by location
- D) It applies thermal color gradients to all numerical columns in the results table

---

## Q127 (Scenario)
A data scientist discovers through visualization that a `salary` feature has a right-skewed distribution with a long tail. Before using it in a linear model, they want to reduce the skewness. Which transformation is most appropriate?
- A) Apply a log transformation: `log(salary + 1)` to compress the right tail
- B) Apply z-score standardization to center the data around zero
- C) Apply min-max scaling to bound the values between 0 and 1
- D) Remove all values above the 95th percentile

---

## Q128 (Multi Answer - Select 2)
Which TWO methods can be used to identify data outliers using Snowflake SQL? (Select 2)
- A) Computing z-scores using `(value - AVG(value) OVER()) / STDDEV(value) OVER()` and filtering values with absolute z-score > 3
- B) Using the IQR method with `PERCENTILE_CONT(0.25)` and `PERCENTILE_CONT(0.75)` to define outlier boundaries
- C) Using `OUTLIER_DETECT(column)` function to automatically flag outlier rows
- D) Using `ANOMALY_SCORE(column)` function to assign an anomaly score to each value
- E) Using `FIND_OUTLIERS(column, method='iqr')` to identify outliers with a built-in function

---

## Q129 (Single Answer)
What type of Snowsight chart is most appropriate for visualizing the distribution of a single numeric variable to check for normality?
- A) A histogram showing the frequency distribution across bins
- B) A scatter plot with the variable on both axes
- C) A bar chart with the variable on the x-axis
- D) A line chart with the variable plotted over row index

---

## Q130 (Scenario)
A data scientist needs to create a correlation heatmap of 20 numeric features in a Snowflake Notebook to identify highly correlated feature pairs. Which approach is most practical?
- A) Compute pairwise correlations using `CORR(col_a, col_b)` for all pairs in SQL, then use `seaborn.heatmap()` in Python to visualize
- B) Use Snowsight's built-in correlation chart type
- C) Export all data to a CSV file and use Excel's correlation tool
- D) Use `REGR_R2` for all column pairs and plot the results manually

---

## Q131 (Single Answer)
What is the primary benefit of using statistical summaries in Snowsight before building visualizations?
- A) They automatically create the optimal chart type for the data
- B) They provide a quick overview of data characteristics (counts, distributions, ranges) that guides appropriate visualization choices
- C) They eliminate the need for any additional Python-based analysis
- D) They automatically detect and remove all data quality issues

---

## Q132 (Scenario)
A data scientist is using a Snowflake Notebook for a data exploration project. They want to reference results from a SQL cell in a subsequent Python cell. How can they access the SQL query results?
- A) The SQL cell results are automatically available as a pandas DataFrame using the cell name (e.g., `cell1.to_pandas()`)
- B) They must re-execute the SQL query using the Snowpark session in the Python cell
- C) SQL and Python cells operate in isolated environments and cannot share data
- D) They must export the SQL results to a stage and read them in the Python cell

---

## Q133 (Multi Answer - Select 2)
Which TWO statements about Snowflake Notebook scheduling are correct? (Select 2)
- A) Scheduled notebooks can be configured to run at specified intervals using a cron-like schedule
- B) Scheduled notebook runs can be monitored through the notebook's run history
- C) Scheduled notebooks can only execute SQL cells — Python cells are skipped during scheduled runs
- D) Scheduling requires converting the notebook to a stored procedure first
- E) Scheduled notebooks can only run once per day at a fixed time

---

## Q134 (Single Answer)
When interpreting a box plot generated from Snowflake data, what do the whiskers typically represent?
- A) The minimum and maximum values in the dataset, excluding outliers beyond 1.5 * IQR
- B) The mean plus and minus one standard deviation
- C) The 10th and 90th percentile values
- D) The range of the middle 50% of data values

---

## Q135 (Scenario)
A data scientist at a financial services company is building a business case for a fraud detection model. They need to present to non-technical executives the relationship between transaction velocity (transactions per hour) and fraud likelihood. The data is in Snowflake. Which combination of visualization and statistical summary best supports their business case?
- A) A scatter plot with a regression line in a Snowflake Notebook using `plotly`, annotated with the `REGR_R2` value computed in SQL to quantify the relationship strength
- B) A raw data table showing all transactions sorted by timestamp
- C) A single bar chart showing total fraud count by month
- D) A pie chart showing the proportion of fraudulent vs. legitimate transactions
