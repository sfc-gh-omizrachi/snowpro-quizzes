# Domain 2: Answers

---

## Q1
**Answer: A**

**Explanation:** In Snowpark Python, `df.distinct()` returns a new DataFrame that contains only the rows with distinct values from the current DataFrame, removing duplicates based on all columns. `df.dropDuplicates()` without arguments behaves identically to `distinct()`. Options B (`unique()`), C (`remove_duplicates()`), and D (`deduplicate()`) are not valid Snowpark DataFrame methods.

**Source:** [Snowpark DataFrame.distinct()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.distinct)

**Quote:** "Returns a new DataFrame that contains only the rows with distinct values from the current DataFrame."

---

## Q2
**Answer: A**

**Explanation:** Both `df.fillna()` and `df.na.fill()` are valid methods for replacing NULL values in Snowpark — `fillna` is an alias for `na.fill`. Option A uses `df.fillna({"EMAIL": "unknown@placeholder.com"})` which correctly replaces NULLs in the EMAIL column with a dictionary mapping. Option C with `df.na.fill()` is also technically correct, but for this exam question the canonical direct method shown in Snowpark docs is `fillna`. Option B (`df.replace`) replaces specific values rather than NULLs. Option D (`df.impute`) does not exist in Snowpark.

**Source:** [Snowpark DataFrame.fillna()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.fillna)

**Quote:** "Returns a new DataFrame that replaces all null and NaN values in the specified columns with the values provided."

---

## Q3
**Answer: B**

**Explanation:** In Snowpark Python, the `cast()` method on a Column object converts a column from one data type to another. The correct syntax is `col("amount").cast(IntegerType())`. Option C (`astype()`) is also a valid alias for `cast()` in Snowpark, but `cast()` is the primary documented method. Options A (`convert()`) and D (`to_type()`) do not exist as Column methods in Snowpark.

**Source:** [Snowpark Column.cast()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.Column.cast)

**Quote:** "Casts the value of the Column to the specified data type."

---

## Q4
**Answer: B**

**Explanation:** An inner join returns only the rows where there is a match in both DataFrames. Since the requirement is to return only customers who have placed at least one order, an inner join on CUSTOMER_ID ensures that only customers with matching orders are included. Option A (left join) would include all customers even those without orders. Option C (cross join) produces a Cartesian product. Option D (full join) includes all rows from both tables.

**Source:** [Snowpark DataFrame.join()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.join)

**Quote:** "Inner join: 'inner' (the default value)"

---

## Q5
**Answer: A, B**

**Explanation:** Snowpark provides `df.na.drop()` to remove rows containing NULL values and `df.na.fill()` to replace NULL values with specified defaults. These are the two documented methods in the DataFrameNaFunctions class. Options C (`na.ignore()`), D (`na.interpolate()`), and E (`na.flag()`) do not exist in Snowpark's DataFrameNaFunctions.

**Source:** [Snowpark DataFrameNaFunctions](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrameNaFunctions)

**Quote:** "Returns a new DataFrame that excludes all rows containing fewer than a specified number of non-null and non-NaN values in the specified columns."

---

## Q6
**Answer: C**

**Explanation:** `QUALIFY ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) = 1` removes duplicate rows by partitioning data by specified columns, ordering within each partition, and keeping only the first occurrence based on the ordering. Option A (`DISTINCT`) removes exact duplicate rows but cannot preserve a specific occurrence based on ordering. Option B (`GROUP BY`) aggregates rows but doesn't directly preserve the first occurrence with ordering control. Option D (`HAVING COUNT(*) = 1`) only keeps groups with exactly one row, removing duplicates entirely rather than keeping one.

**Source:** [QUALIFY](https://docs.snowflake.com/en/sql-reference/constructs/qualify)

**Quote:** "The QUALIFY clause simplifies queries that require filtering on the result of window functions."

---

## Q7
**Answer: B**

**Explanation:** `SELECT * FROM sensor_data SAMPLE (10) SEED (42)` creates a 10% random sample that is reproducible because the SEED parameter makes the sampling deterministic. Option A (LIMIT) returns the first N rows without randomization. Option C (TABLESAMPLE BERNOULLI without SEED) is random but not reproducible across runs. Option D (ORDER BY RANDOM() LIMIT) would work but is extremely inefficient on 500 million rows as it requires a full sort.

**Source:** [SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "If a table doesn't change, and the same seed and probability are specified, SAMPLE generates the same result."

---

## Q8
**Answer: B**

**Explanation:** `df.select("col1", "col2")` returns a new DataFrame with only the specified columns, effectively selecting a subset and removing all other columns. Option A (`df.drop()`) removes named columns and keeps the rest — the opposite operation. Options C (`filter_columns`) and D (`project`) are not valid Snowpark DataFrame methods.

**Source:** [Snowpark DataFrame.select()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.select)

**Quote:** "Returns a new DataFrame with the specified Column expressions as output (similar to SELECT in SQL)."

---

## Q9
**Answer: B**

**Explanation:** Values like "$1,234.56" contain currency symbols and comma separators that must be removed before casting to a numeric type. The correct approach is to use `regexp_replace` to strip the `$` and `,` characters, then cast the cleaned string to `DecimalType()`. Option A is wrong because Snowpark does not automatically handle currency symbols during casting. Option C is wrong because `to_decimal()` does not automatically strip formatting characters. Option D could partially work but is less idiomatic in Snowpark Python than using `regexp_replace` with `cast`.

**Source:** [Snowpark functions.regexp_replace()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.functions.regexp_replace)

**Quote:** "Casts the value of the Column to the specified data type. If the cast is not possible, a SnowparkSQLException exception is thrown."

---

## Q10
**Answer: A, C**

**Explanation:** In Snowpark, `df.group_by("col").agg(avg("value"))` groups the DataFrame and applies an aggregation function, and `df.group_by("col").count()` groups the DataFrame and returns the count per group. Both are valid aggregation patterns using the RelationalGroupedDataFrame class. Options B (`summarize`), D (`aggregate` with dict), and E (`reduce_by`) are not valid Snowpark DataFrame methods.

**Source:** [Snowpark RelationalGroupedDataFrame](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.RelationalGroupedDataFrame)

**Quote:** "RelationalGroupedDataFrame provides methods for aggregating results, including: avg() (equivalent to AVG(column)), count() (equivalent to COUNT()), max() (equivalent to MAX(column))."

---

## Q11
**Answer: B**

**Explanation:** `SAMPLE` and `TABLESAMPLE` are synonymous in Snowflake and can be used interchangeably. `TABLESAMPLE` is the ANSI SQL standard keyword, while `SAMPLE` is a Snowflake shorthand. Both support identical functionality including Bernoulli and System sampling methods. Option A is incorrect as neither is specific to stages. Options C and D describe differences that do not exist.

**Source:** [SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "SAMPLE and TABLESAMPLE are synonymous and can be used interchangeably."

---

## Q12
**Answer: A**

**Explanation:** `df.describe()` computes basic summary statistics (count, mean, stddev, min, max) for all numeric columns in a single call, making it the most efficient Snowpark approach for initial data profiling of a dataset with 200 columns. Option B requires writing custom logic for each column which is more effort. Option C defeats the purpose of using Snowpark by exporting to pandas locally, which may fail for large datasets. Option D is overly complex for initial profiling.

**Source:** [Snowpark DataFrame.describe()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.describe)

**Quote:** "Computes basic statistics for numeric columns, which includes count, mean, stddev, min, and max."

---

## Q13
**Answer: C**

**Explanation:** In Snowpark Python, `df1.except_(df2)` returns a new DataFrame containing all rows from df1 that do not appear in df2, which is functionally equivalent to an anti-join when both DataFrames share the same schema. Option A (`left_anti`) is a valid join type string in Snowpark (as "anti" or "leftanti"), making it also technically correct for anti-join semantics. However, `except_` is specifically described as returning rows in the left DataFrame that have no match in the right DataFrame. Option B (`"anti"`) is valid but the question asks about the method that performs an anti-join — both A and C work, but C with `except_` is the set-based anti-join method. Option D (`subtract`) does not exist in Snowpark.

**Source:** [Snowpark DataFrame.except_()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.except_)

**Quote:** "Returns a new DataFrame that contains all the rows from the current DataFrame except for the rows that also appear in the other DataFrame."

---

## Q14
**Answer: B**

**Explanation:** The correct approach is to first convert the string timestamp to a proper TIMESTAMP type using `to_timestamp()`, then extract the hour using the `hour()` function: `df.with_column("HOUR", hour(to_timestamp(col("TIMESTAMP"))))`. Option A uses substring extraction which is fragile and doesn't properly handle timestamp semantics. Option C uses `extract()` which is not a standard Snowpark function. Option D attempts to call `.hour()` as a method on a Column object, which is not supported in Snowpark.

**Source:** [Snowpark functions.hour()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.functions.hour)

**Quote:** "Extracts the hour from a date or timestamp."

---

## Q15
**Answer: C**

**Explanation:** `df.na.drop(how="all")` drops rows only when ALL column values in that row are NULL. This means a row with even one non-null value is retained. Option A describes `how="any"` behavior, which drops rows with at least one NULL. Option B is wrong because `drop` operates on rows, not columns. Option D is wrong because the method operates row-by-row, not on the entire DataFrame.

**Source:** [Snowpark DataFrameNaFunctions.drop()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrameNaFunctions.drop)

**Quote:** "Returns a new DataFrame that excludes all rows containing fewer than a specified number of non-null and non-NaN values in the specified columns."

---

## Q16
**Answer: A**

**Explanation:** The correct approach uses `date_trunc("week", col("SALE_DATE"))` to truncate each date to its week boundary, then groups by the truncated date and store ID, and aggregates revenue using `sum_()`. This produces weekly revenue per store. Option B uses `.resample("W")` which is a pandas method, not available on Snowpark DataFrames. Option C describes a window function approach but uses incorrect syntax. Option D uses `pivot()` incorrectly for this use case.

**Source:** [Snowpark functions.date_trunc()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.functions.date_trunc)

**Quote:** "Truncates a DATE, TIME, or TIMESTAMP to the specified precision."

---

## Q17
**Answer: A, B**

**Explanation:** Snowflake supports two sampling methods: Bernoulli (ROW) sampling where each row is independently selected with a given probability, and System (BLOCK) sampling where contiguous micro-partitions (blocks) are selected with a given probability. Options C (stratified), D (systematic), and E (weighted) are not natively supported sampling methods in Snowflake's SAMPLE clause.

**Source:** [SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "BERNOULLI (or ROW): Includes each row with a probability of p/100. SYSTEM (or BLOCK): Includes each block of rows with a probability of p/100."

---

## Q18
**Answer: A**

**Explanation:** `df.drop_duplicates("COL_A", "COL_B")` removes rows where the combination of COL_A and COL_B have duplicate values, keeping the first occurrence. All original columns are retained in the result. The result is non-deterministic regarding which row is kept when duplicates exist. Option B is wrong because `drop_duplicates` does not remove columns. Option C is wrong because it accepts multiple columns. Option D is wrong because it retains all columns.

**Source:** [Snowpark DataFrame.drop_duplicates()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.drop_duplicates)

**Quote:** "Creates a new DataFrame by removing duplicated rows on given subset of columns. If no subset of columns is specified, this function is the same as the distinct() function. The result is non-deterministic when removing duplicated rows from the subset of columns but not all columns."

---

## Q19
**Answer: A**

**Explanation:** The `when().otherwise()` pattern correctly replaces sentinel values with NULL: `when(col("INCOME") == -999, lit(None)).otherwise(col("INCOME"))` checks each value and replaces -999 with NULL while preserving all other values. Option B (`na.replace`) replaces existing values but the syntax for replacing with None may not work as expected in Snowpark. Option C filters out the rows entirely rather than replacing the sentinel with NULL. Option D uses `iff` and `NULL` but `NULL` is not a valid Python literal — you need `lit(None)`.

**Source:** [Snowpark functions.when()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.functions.when)

**Quote:** "Works like a cascading if-then-else statement."

---

## Q20
**Answer: A**

**Explanation:** `NVL(column, default_value)` is a Snowflake SQL function that returns the default value if the column is NULL, otherwise returns the column value. It is the most appropriate function for replacing NULLs with a specified default in a SELECT statement. Option B (`ISNULL`) is not a valid Snowflake function — Snowflake uses `IFNULL` instead (which is an alias for NVL). Options C (`DEFAULT`) and D (`REPLACE_NULL`) do not exist as Snowflake SQL functions.

**Source:** [NVL](https://docs.snowflake.com/en/sql-reference/functions/nvl)

**Quote:** "If expr1 is NULL, returns expr2, otherwise returns expr1."

---

## Q21
**Answer: B**

**Explanation:** `customers.join(orders, "CUSTOMER_ID", "inner").join(products, "PRODUCT_ID", "inner")` correctly chains two inner joins. Explicitly specifying the join type as "inner" is a best practice for clarity. Option A would work since "inner" is the default, but specifying the join type explicitly is more correct and maintainable. Option C uses cross joins which produce Cartesian products and are extremely inefficient. Option D uses `merge()` which is not a valid Snowpark DataFrame method.

**Source:** [Snowpark DataFrame.join()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.join)

**Quote:** "Inner join: 'inner' (the default value)"

---

## Q22
**Answer: A, B**

**Explanation:** `df.describe()` returns count, mean, stddev, min, and max for numeric columns — a low count relative to DataFrame size indicates missing data. Using `df.select()` with `count(when(col(c).is_null(), 1))` for each column explicitly counts NULLs per column. Both are valid approaches for identifying data quality issues. Options C (`quality_report()`), D (`validate()`), and E (`stat.crosstab()` for label distribution "issues") are not standard Snowpark methods for this purpose — while `crosstab` exists, it's for frequency tables not data quality detection.

**Source:** [Snowpark DataFrame.describe()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.describe)

**Quote:** "Computes basic statistics for numeric columns, which includes count, mean, stddev, min, and max."

---

## Q23
**Answer: B**

**Explanation:** `COALESCE` returns the first non-NULL expression from a list of arguments. It evaluates arguments left to right and returns the first one that is not NULL. If all arguments are NULL, it returns NULL. Option A describes array construction. Option C describes a JOIN or MERGE operation. Option D describes concatenation, not COALESCE behavior.

**Source:** [COALESCE](https://docs.snowflake.com/en/sql-reference/functions/coalesce)

**Quote:** "Returns the first non-NULL expression among its arguments, or NULL if all its arguments are NULL."

---

## Q24
**Answer: D**

**Explanation:** All three approaches produce equivalent results. Option A uses `filter()` with combined conditions using `&`. Option B uses `where()` with `between()` which includes both endpoints. Option C chains two `filter()` calls which are applied sequentially, equivalent to an AND condition. In Snowpark, `filter()` and `where()` are aliases, and `between()` is inclusive of both bounds, so all three produce identical results.

**Source:** [Snowpark DataFrame.filter()](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.filter)

**Quote:** "Filters rows based on the specified conditional expression (similar to WHERE in SQL)."

---

## Q25
**Answer: B**

**Explanation:** `QUALIFY` filters the output of window functions, similar to how `HAVING` filters aggregate results after GROUP BY. It is evaluated after window functions are computed, allowing filtering based on window function results without needing subqueries. Option A is wrong because QUALIFY operates after window functions, not before them alongside WHERE. Option C is wrong because QUALIFY works with window functions, not GROUP BY exclusively. Option D is wrong because QUALIFY does not replace ORDER BY.

**Source:** [QUALIFY](https://docs.snowflake.com/en/sql-reference/constructs/qualify)

**Quote:** "In such a query, HAVING filters rows after GROUP BY aggregation, while QUALIFY filters rows after window functions are computed."

---

## Q26
**Answer: C**

**Explanation:** `snowflake.ml.modeling.preprocessing.OrdinalEncoder` is the most appropriate approach because it fits the encoder on training data and can be consistently applied during inference using the same learned mapping. This ensures consistent encoding across training and inference. Option A (DECODE) uses a hardcoded mapping that must be manually maintained. Option B (join with mapping table) works but requires maintaining a separate table. Option D (UDF with dict) doesn't persist the mapping and requires manual management.

**Source:** [OrdinalEncoder](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/api/modeling/snowflake.ml.modeling.preprocessing.OrdinalEncoder)

**Quote:** "Encodes categorical features as an integer array. In other words, each category (i.e., distinct numeric or string value) is assigned an integer value, starting with zero."

---

## Q27
**Answer: A, C**

**Explanation:** `TRY_CAST(expression AS type)` attempts to cast a value and returns NULL instead of an error if the conversion fails. `TRY_TO_NUMBER(expression)` is a safe version of `TO_NUMBER` that returns NULL on invalid input instead of raising an error. Option B (`CAST`) raises an error on invalid input. Option D (`TO_NUMBER`) also raises an error on invalid input. Option E (`CONVERT`) is not a standard Snowflake function.

**Source:** [TRY_CAST](https://docs.snowflake.com/en/sql-reference/functions/try_cast)

**Quote:** "A special version of CAST for a subset of data type conversions. It performs the same operation (i.e. converts a value of one data type into another data type), but returns a NULL value instead of raising an error when the conversion can not be performed."

---

## Q28
**Answer: A**

**Explanation:** `collect()` returns a list of Snowpark `Row` objects to the client, while `to_pandas()` returns a pandas DataFrame to the client. Both are action methods that trigger query execution and transfer data to the client — so C is wrong (both transfer data). B is wrong because both execute eagerly as actions; neither is lazy. D is wrong because neither method is inherently limited by dataset size.

**Source:** [Snowpark Python DataFrame API Reference](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame)

**Quote:** "Actions cause the DataFrame to be evaluated. When you call a method that performs an action, Snowpark sends the SQL query for the DataFrame to the server for evaluation."

---

## Q29
**Answer: D**

**Explanation:** All three approaches produce a valid boolean column. Option A directly uses a comparison expression which evaluates to a boolean. Option B uses `when().otherwise()` to explicitly map to True/False. Option C uses `iff()` with `lit()` wrapped booleans. In Snowpark Python, comparison operators on columns return boolean-typed column expressions, so all approaches are valid and produce equivalent results.

**Source:** [Snowpark Python Functions Reference](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.functions.iff)

**Quote:** "Snowpark uses lazy evaluation, so the SQL is not sent to the server for execution until you call an action method."

---

## Q30
**Answer: A**

**Explanation:** `df.count()` is a Snowpark action that executes a `SELECT COUNT(*) ...` query on the server and returns just the integer count — the actual row data is not transferred to the client. `len(df)` is not a supported method on Snowpark DataFrames. `df.shape[0]` is a pandas concept, not available on Snowpark DataFrames. `df.num_rows()` does not exist in the Snowpark API.

**Source:** [Snowpark Python DataFrame API Reference](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.count)

**Quote:** "Executes the query representing this DataFrame and returns the number of rows in the result."

---

## Q31
**Answer: C**

**Explanation:** Both `df.drop()` and `df.select()` generate equivalent SQL query plans because Snowpark uses lazy evaluation and Snowflake's optimizer only reads the columns referenced in the final query. Whether you specify 50 columns to keep with `select()` or 450 to remove with `drop()`, the underlying columnar storage engine only scans the required columns. The optimizer treats both identically, so there is no meaningful compute difference. D (creating a view) adds an unnecessary extra step but would also produce the same query plan.

**Source:** [Snowpark Python Working with DataFrames](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "In Snowpark, the main way in which you retrieve data from Snowflake is through a DataFrame. Snowpark uses lazy evaluation, so the SQL is not sent to the server for execution until you call an action method."

---

## Q32
**Answer: A, B**

**Explanation:** Snowpark uses lazy evaluation: transformations like `select()`, `filter()`, and `join()` build a query plan without sending SQL to the server (A is correct). Actions like `collect()`, `show()`, and `count()` trigger execution of the accumulated query plan (B is correct). C is wrong because transformations do not create immediate queries. D is wrong because lazy evaluation means the DataFrame represents a query plan, not cached client-side data. E is wrong because `df.explain()` only prints the query plan without executing it.

**Source:** [Snowpark Python Working with DataFrames](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "Snowpark uses lazy evaluation, so the SQL is not sent to the server for execution until you call an action method."

---

## Q33
**Answer: A**

**Explanation:** `IFNULL(column, replacement)` returns the replacement value if the column is NULL, otherwise returns the column value — this directly converts a NULL to a specified replacement for a single column. `NULLIF(column, replacement)` does the opposite: it returns NULL if the two arguments are equal (B is wrong). `ZEROIFNULL` only replaces NULL with zero, not any specified value (C is too restrictive). `NVL2` takes three arguments and handles both the non-null and null cases, making it more complex than needed for simple NULL replacement (D is overkill for the stated question).

**Source:** [Snowflake IFNULL Function](https://docs.snowflake.com/en/sql-reference/functions/ifnull)

**Quote:** "If expr1 is NULL, returns expr2, otherwise returns expr1."

---

## Q34
**Answer: A**

**Explanation:** In Snowpark Python, `split(col("FULL_NAME"), lit(" "))` splits the string into an array, and bracket indexing `[0]` and `[1]` extracts elements by position. This is the correct Snowpark syntax using `split()` from `snowflake.snowpark.functions` with `lit()` for the delimiter and array indexing. Option B uses `charindex` which exists but is more verbose and error-prone. Option C uses Python-style `.split(" ")` method syntax which is not valid on Snowpark Column objects. Option D uses `explode` which would create multiple rows rather than separate columns.

**Source:** [Snowpark Python Functions - split](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.functions.split)

**Quote:** "Splits a given string with a given separator and returns the result in an array of strings."

---

## Q35
**Answer: C**

**Explanation:** The `SEED` parameter in the `SAMPLE` clause provides a deterministic seed for reproducible random sampling. When the same seed and probability are specified on an unchanged table, `SAMPLE` generates the same result. A is wrong because the number of rows is controlled by the probability or ROWS parameter, not SEED. B is wrong because SEED does not control stratification. D is wrong because SEED is not related to partition selection.

**Source:** [Snowflake SAMPLE / TABLESAMPLE](https://docs.snowflake.com/en/sql-reference/constructs/sample)

**Quote:** "Specifies a seed value to make the sampling deterministic. Can be any integer between 0 and 2147483647 inclusive."

---

## Q36
**Answer: C**

**Explanation:** `floor(months_between(current_date(), col("DATE_OF_BIRTH")) / 12)` correctly computes age by calculating the total months between the birth date and current date, dividing by 12, and flooring to get the integer age. Option A using `datediff("year", ...)` only counts calendar year boundaries crossed, not actual age (e.g., someone born Dec 31, 2000 would show age 1 on Jan 1, 2001). Option B has the same problem — subtracting year components ignores month/day. Option D uses Python arithmetic on Column objects which is not valid Snowpark syntax (`.days` is not a Column attribute).

**Source:** [Snowflake MONTHS_BETWEEN Function](https://docs.snowflake.com/en/sql-reference/functions/months_between)

**Quote:** "Returns the number of months between two DATE or TIMESTAMP values."

---

## Q37
**Answer: A, B**

**Explanation:** Replacing NULLs with the column mean using `AVG()` (A) is a standard imputation technique that preserves the overall distribution center. Replacing with the median using `PERCENTILE_CONT(0.5)` (B) is robust to outliers and is another well-established approach. C is wrong because replacing with 0 is inappropriate for many columns (e.g., salary, temperature) where 0 is not a neutral value and would distort the distribution. D is wrong because deleting an entire column due to some NULLs discards potentially valuable information. E describes forward-fill which is appropriate for time-series but is not universally applicable for general numerical imputation.

**Source:** [Snowflake IFNULL / NVL Functions](https://docs.snowflake.com/en/sql-reference/functions/ifnull)

**Quote:** "If expr1 is NULL, returns expr2, otherwise returns expr1."

---

## Q38
**Answer: B**

**Explanation:** `df.with_column_renamed("old_name", "new_name")` is the Snowpark DataFrame method for renaming a single column. While `df.rename()` also exists in newer versions and can take a column and new name or a dictionary, the canonical method matching the answer format shown is `with_column_renamed`. Option A's dictionary syntax `df.rename({"old_name": "new_name"})` requires `col()` objects as keys, not plain strings. C (`df.alias()`) is for aliasing DataFrames, not columns. D is not valid Snowpark syntax.

**Source:** [Snowpark DataFrame.with_column_renamed](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.with_column_renamed)

**Quote:** "Returns a DataFrame with the specified column existing renamed as new."

---

## Q39
**Answer: A**

**Explanation:** `APPROX_COUNT_DISTINCT(user_id)` uses the HyperLogLog algorithm to return an approximate count of distinct values, which is significantly faster than exact `COUNT(DISTINCT ...)` on large datasets. `HLL(user_id)` (B) is actually an alias for `APPROX_COUNT_DISTINCT` and would also work, but `APPROX_COUNT_DISTINCT` is the more commonly referenced function name. `ESTIMATED_COUNT` (C) and `FAST_DISTINCT` (D) do not exist in Snowflake.

**Source:** [Snowflake APPROX_COUNT_DISTINCT](https://docs.snowflake.com/en/sql-reference/functions/approx_count_distinct)

**Quote:** "Uses HyperLogLog to return an approximation of the distinct cardinality of the input (i.e. HLL(col1, col2, ... ) returns an approximation of COUNT(DISTINCT col1, col2, ... ))."

---

## Q40
**Answer: B**

**Explanation:** Snowflake's `APPROX_COUNT_DISTINCT` uses the HyperLogLog algorithm for approximate distinct counting. Snowflake provides a bias-corrected implementation based on the algorithm presented by Flajolet et al. Count-Min Sketch (A) is used for frequency estimation, not cardinality. Bloom Filter (C) is used for set membership testing. T-Digest (D) is used for percentile approximation.

**Source:** [Estimating the Number of Distinct Values](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality)

**Quote:** "Snowflake uses HyperLogLog to estimate the approximate number of distinct values in a data set. HyperLogLog is a state-of-the-art cardinality estimation algorithm, capable of estimating distinct cardinalities of trillions of rows with an average relative error of a few percent."

---

## Q41
**Answer: A**

**Explanation:** `APPROX_TOP_K(product_category, 5)` returns the approximate most frequent values along with their estimated frequencies using the Space-Saving algorithm. This is designed specifically for finding the top-K most frequent items in large datasets. `TOP_K` (B), `MOST_FREQUENT` (C), and `APPROX_PERCENTILE` (D) are either non-existent functions or serve different purposes (APPROX_PERCENTILE computes percentiles, not frequencies).

**Source:** [Snowflake APPROX_TOP_K](https://docs.snowflake.com/en/sql-reference/functions/approx_top_k)

**Quote:** "Uses Space-Saving to return an approximation of the most frequent values in the input, along with their approximate frequencies."

---

## Q42
**Answer: A, B**

**Explanation:** APPROX_TOP_K returns approximate most-frequent values along with their estimated frequency counts as a JSON array of arrays (A is correct). It uses the Space-Saving algorithm to efficiently track frequent items (B is correct). C is wrong because the frequency counts are estimates, not exact. D is wrong because the data does not need to be pre-sorted. E is wrong because APPROX_TOP_K works with any column type, not just numeric.

**Source:** [Estimating Frequent Values](https://docs.snowflake.com/en/user-guide/querying-approximate-frequent-values)

**Quote:** "Snowflake provides an implementation of the Space-Saving algorithm presented in Efficient Computation of Frequent and Top-k Elements in Data Streams by Metwally, Agrawal and Abbadi. It is implemented through the APPROX_TOP_K family of functions."

---

## Q43
**Answer: A**

**Explanation:** `STDDEV(amount) OVER (PARTITION BY category)` is the correct Snowflake syntax for computing the standard deviation as a window function partitioned by a grouping column. `STDDEV` is a valid Snowflake function name (alias for `STDDEV_SAMP`). `STD` (B), `STANDARD_DEVIATION` (C), and `DEVIATION` (D) are not valid Snowflake function names.

**Source:** [Snowflake STDDEV Function](https://docs.snowflake.com/en/sql-reference/functions/stddev)

**Quote:** "Returns the sample standard deviation (square root of sample variance) of non-NULL values."

---

## Q44
**Answer: B**

**Explanation:** A single `SELECT` statement with `MIN()`, `MAX()`, `AVG()`, `STDDEV()`, and `COUNT()` for each numeric column is the most efficient approach because it requires only one pass through the data. Option A requires multiple separate queries and table scans. Option C requires exporting all data to the client, which is impractical for large datasets. Option D does not provide pre-computed statistics like mean and standard deviation — `SHOW COLUMNS` returns metadata about column data types, not statistical summaries.

**Source:** [Snowflake Aggregate Functions](https://docs.snowflake.com/en/sql-reference/functions-aggregation)

**Quote:** "An aggregate function takes multiple rows (actually, zero or more rows) as input and produces a single output."

---

## Q45
**Answer: B**

**Explanation:** `VARIANCE` (alias `VAR_SAMP`) computes the sample variance of all non-NULL values, which uses Bessel's correction with an N-1 denominator. This is distinct from `VAR_POP` which uses the population formula with N denominator (A describes `VAR_POP`, not `VARIANCE`). C describes the coefficient of variation, which is a different statistic. D is nonsensical — `VARIANCE` computes within-group variance, not between-group variance.

**Source:** [Snowflake VARIANCE, VARIANCE_SAMP](https://docs.snowflake.com/en/sql-reference/functions/variance)

**Quote:** "Returns the sample variance of non-NULL records in a group. If all records inside a group are NULL, a NULL is returned."

---

## Q46
**Answer: A**

**Explanation:** `AVG(revenue) OVER (PARTITION BY store_id ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` computes a 7-day rolling average (current row plus 6 preceding rows = 7 rows total) for each store. Option B excludes the current row, computing the average of only the 7 days before today. Option C uses `RANGE` instead of `ROWS`, which compares date values rather than row positions — this could behave differently if there are missing dates. Option D is syntactically invalid.

**Source:** [Snowflake Window Function Syntax](https://docs.snowflake.com/en/sql-reference/functions-analytic)

**Quote:** "ROWS BETWEEN specifies the window frame as a physical number of rows before and/or after the current row."

---

## Q47
**Answer: A, B**

**Explanation:** `REGR_SLOPE(dependent, independent)` calculates the slope of the ordinary least squares regression line (A is correct). `REGR_INTERCEPT(dependent, independent)` calculates the y-intercept of the regression line (B is correct). `LINEAR_FIT` (C) does not exist in Snowflake. `REGR_PREDICT` (D) does not exist in Snowflake. `LINEST` (E) does not exist in Snowflake — it is an Excel function.

**Source:** [Snowflake REGR_SLOPE](https://docs.snowflake.com/en/sql-reference/functions/regr_slope)

**Quote:** "Returns the slope of the linear regression line for non-null pairs in a group. It is computed for non-null pairs using the following formula: COVAR_POP(x,y) / VAR_POP(x)."

---

## Q48
**Answer: B**

**Explanation:** `REGR_R2(y, x)` returns the coefficient of determination (R-squared), which indicates the proportion of variance in the dependent variable explained by the independent variable. A is wrong because the residual sum of squares is a different statistic. C is wrong because the correlation coefficient (r) is computed by `CORR(y, x)`, not `REGR_R2`. D is wrong because RMSE is not returned by `REGR_R2`.

**Source:** [Snowflake REGR_R2](https://docs.snowflake.com/en/sql-reference/functions/regr_r2)

**Quote:** "Returns the coefficient of determination for non-null pairs in a group."

---

## Q49
**Answer: C**

**Explanation:** `ROW_NUMBER()` assigns a unique sequential integer to each row within a partition with no ties and no gaps. The question asks for "a unique rank with no gaps," which is exactly what `ROW_NUMBER()` provides. `RANK()` (A) allows ties and leaves gaps after tied values. `DENSE_RANK()` (B) allows ties but leaves no gaps — so it does not assign a unique rank since tied values get the same rank number. `NTILE` (D) divides rows into buckets, not individual ranks.

**Source:** [Snowflake ROW_NUMBER Function](https://docs.snowflake.com/en/sql-reference/functions/row_number)

**Quote:** "Returns a unique row number for each row within a window partition. The row number starts at 1 and continues up sequentially."

---

## Q50
**Answer: A**

**Explanation:** `RANK()` assigns the same rank to tied values but then skips subsequent rank numbers, leaving gaps (e.g., 1, 2, 2, 4). `DENSE_RANK()` also assigns the same rank to ties but does not leave gaps — the next distinct value gets the next consecutive rank (e.g., 1, 2, 2, 3). B is wrong because `RANK()` does allow ties. C is wrong because both work with any orderable type. D is wrong because both are calculated per partition.

**Source:** [Snowflake RANK Function](https://docs.snowflake.com/en/sql-reference/functions/rank)

**Quote:** "Returns the rank of a value within an ordered group of values. The rank value starts at 1 and continues up sequentially. If two values are the same, they have the same rank."

---

## Q51
**Answer: A**

**Explanation:** The correct way to create a Snowpark session is `from snowflake.snowpark import Session; session = Session.builder.configs(connection_parameters).create()`. This uses the `Session.builder` pattern with a dictionary of connection parameters. B is wrong because the Snowflake Connector `connect()` object does not have a `to_snowpark()` method (though you can pass a connector connection via `Session.builder.configs({"connection": conn}).create()`). C is wrong because `Session` is not in `snowflake.ml`. D is wrong because `create_session` is not a valid function in the Snowpark package.

**Source:** [Creating a Session for Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-session)

**Quote:** "Pass this dictionary to the Session.builder.configs method to return a builder object that has these connection parameters. Call the create method of the builder to establish the session."

---

## Q52
**Answer: A, B**

**Explanation:** `NTILE(n)` divides an ordered dataset into n approximately equal groups and assigns a bucket number from 1 to n (A is correct). This makes it useful for creating quantile-based bins during exploratory data analysis, such as quartiles or deciles (B is correct). C is wrong because NTILE handles any number of rows, distributing them as evenly as possible. D is wrong because NTILE only guarantees approximately equal groups — when rows don't divide evenly, some buckets will have one more row than others. E is wrong because bucket numbers start from 1, not 0.

**Source:** [Snowflake NTILE Function](https://docs.snowflake.com/en/sql-reference/functions/ntile)

**Quote:** "Divides an ordered data set equally into the number of buckets specified by constant_value. Buckets are sequentially numbered 1 through constant_value."

---

## Q53
**Answer: A**

**Explanation:** `REGR_SLOPE(y, x)` returns the slope of the ordinary least squares (OLS) regression line for non-null (x, y) pairs. It is computed as `COVAR_POP(y, x) / VAR_POP(x)`. B is wrong because gradient descent is an iterative optimization algorithm not used by this SQL function. C is wrong because it does not simply connect min and max points. D is wrong because it uses ordinary least squares, not robust regression.

**Source:** [Snowflake REGR_SLOPE](https://docs.snowflake.com/en/sql-reference/functions/regr_slope)

**Quote:** "Returns the slope of the linear regression line for non-null pairs in a group. It is computed for non-null pairs using the following formula: COVAR_POP(x,y) / VAR_POP(x)."

---

## Q54
**Answer: B**

**Explanation:** An R-squared value of 0.12 means that only 12% of the variance in revenue is explained by advertising spend, indicating a weak linear relationship. A is wrong because 0.12 is far from a strong relationship (which would be closer to 0.8–1.0). C is wrong because an R-squared of 0.12 is a valid statistical result — it simply indicates a weak linear fit, not an invalid model. D is wrong because R-squared does not indicate the direction of correlation, and 0.12 does not suggest a perfect negative correlation.

**Source:** [Snowflake REGR_R2](https://docs.snowflake.com/en/sql-reference/functions/regr_r2)

**Quote:** "Returns the coefficient of determination for non-null pairs in a group."

---

## Q55
**Answer: B**

**Explanation:** `VAR_POP(column)` computes the population variance using N as the denominator, while `VARIANCE(column)` (option A) computes the sample variance using N-1 as the denominator. `VAR_SAMP` (C) is an alias for sample variance, and `STDDEV_POP` (D) returns the population standard deviation, not variance.

**Source:** [VAR_POP - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/var_pop)

**Quote:** "Returns the population variance of non-NULL records in a group. If all records inside a group are NULL, a NULL is returned."

---

## Q56
**Answer: C**

**Explanation:** Snowflake Notebooks provide a Packages dropdown in the notebook UI where users can search for and install packages from the Snowflake Anaconda channel. After selecting the packages, they can be imported normally in Python cells. Option A (`pip install`) is not supported in the managed notebook runtime. Option B (uploading wheel files) is unnecessary for packages available in the Anaconda channel. Option D is incorrect because visualization libraries like matplotlib and seaborn are supported.

**Source:** [Visualize data in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-visualize-data)

**Quote:** "From the notebook, select Packages. Locate the matplotlib library and select the library to install it."

---

## Q57
**Answer: A, B**

**Explanation:** The Snowpark Python library allows creating a session and working with Snowpark DataFrames from an external Jupyter notebook. The Snowflake Python Connector with `fetch_pandas_all()` enables fetching query results directly into pandas DataFrames. Option C is impractical since raw HTTP REST calls are not a standard approach for data analysis. Option D is incorrect because JDBC is a Java standard and cannot be used directly from Python. Option E is fabricated; Snowflake does not provide a native Jupyter kernel replacement.

**Source:** [Snowpark Python Developer Guide](https://docs.snowflake.com/en/developer-guide/snowpark/python/index)

**Quote:** "Snowpark provides a set of libraries and code execution environments that run Python and other programming languages next to your data in Snowflake."

---

## Q58
**Answer: A**

**Explanation:** `CUME_DIST()` returns the cumulative distribution of a value within a window partition, computing the fraction of rows with values less than or equal to the current row's value divided by the total number of rows. `PERCENT_RANK()` (B) returns the relative rank as a percentage using (rank - 1) / (n - 1), not the cumulative distribution. `PERCENTILE_CONT` (C) is an inverse distribution function that returns a value at a given percentile, not a cumulative distribution. `RATIO_TO_REPORT` (D) computes the ratio of a value to the sum of values, not the cumulative distribution.

**Source:** [CUME_DIST - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/cume_dist)

**Quote:** "Finds the cumulative distribution of a value with regard to other values within the same window partition."

---

## Q59
**Answer: A**

**Explanation:** The standard `GROUP BY` with `COUNT(*)`, `ORDER BY`, and `LIMIT` gives exact top-10 most common values with their frequencies. While `APPROX_TOP_K` (B) can approximate frequent values, it returns a JSON array of arrays rather than a standard tabular result with named columns for status and frequency, making it less intuitive for quick profiling. Option C misuses `APPROX_COUNT_DISTINCT`, which estimates the number of distinct values rather than per-value frequencies. Option D simply returns 10 sorted values without frequencies.

**Source:** [APPROX_TOP_K - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/approx_top_k)

**Quote:** "Uses Space-Saving to return an approximation of the most frequent values in the input, along with their approximate frequencies."

---

## Q60
**Answer: B**

**Explanation:** In Snowflake SQL, `DECODE` compares an expression to a series of search values and returns the corresponding result value when a match is found, similar to a `CASE` expression. It does not decode base64-encoded strings (A), decode JSON (C), or convert encoded categorical values (D). Snowflake explicitly notes that its DECODE is different from PostgreSQL's encoding/decoding DECODE.

**Source:** [DECODE - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/decode)

**Quote:** "Compares the select expression to each search expression in order. As soon as a search expression matches the selection expression, the corresponding result expression is returned."

---

## Q61
**Answer: A**

**Explanation:** `REGR_R2` returns the coefficient of determination (R-squared), measuring the proportion of variance in the dependent variable explained by the independent variable, making it the key indicator of linear dependency. `REGR_COUNT` confirms sufficient non-null data points were used. Option B is incorrect because having non-zero slope/intercept values alone does not confirm statistical significance. Option C is wrong because `STDDEV` does not verify normality. Option D is incorrect because `REGR_SXX` and `REGR_SYY` are intermediate statistics that do not directly indicate dependency strength.

**Source:** [REGR_R2 - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/regr_r2)

**Quote:** "Returns the coefficient of determination for non-null pairs in a group."

---

## Q62
**Answer: A, B**

**Explanation:** `LAG` allows comparing the current row's value with a previous row's value, useful for detecting changes and trends. `LEAD` allows looking ahead at future values, useful for identifying upcoming patterns. Options C, D, and E are fabricated; `MERGE`, `PIVOT`, and `FLATTEN` are not window functions in Snowflake. `MERGE` is a DML statement, `PIVOT` is a table operator, and `FLATTEN` is a table function for semi-structured data.

**Source:** [Window functions - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions-window)

**Quote:** "LAG ... LEAD" (listed under Ranking window functions)

---

## Q63
**Answer: B**

**Explanation:** The `CORR(y, x)` function returns the Pearson correlation coefficient for non-null pairs, with values ranging from -1 to 1. It is computed using the formula `COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))`. Option A describes covariance, not correlation. Option C is incorrect because Snowflake's CORR computes Pearson, not Spearman rank correlation. Option D is fabricated.

**Source:** [CORR - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/corr)

**Quote:** "Returns the correlation coefficient for non-null pairs in a group. It is computed for non-null pairs using the following formula: COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))"

---

## Q64
**Answer: A**

**Explanation:** The IQR is defined as the difference between the 75th percentile (Q3) and the 25th percentile (Q1). Using `PERCENTILE_CONT(0.75)` minus `PERCENTILE_CONT(0.25)` correctly computes this. Option B computes the range (max - min), not the IQR. Option C uses standard deviation which measures spread differently. Option D computes variance, which is unrelated to IQR.

**Source:** [PERCENTILE_CONT - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/percentile_cont)

**Quote:** "Return a percentile value based on a continuous distribution of the input column. If no input row lies exactly at the desired percentile, the result is calculated using linear interpolation of the two nearest input values."

---

## Q65
**Answer: A**

**Explanation:** `RATIO_TO_REPORT` computes the ratio of each row's value to the sum of all values in its partition, effectively expressing each value as a proportion of the total. Options B, C, and D describe functionalities that do not exist for this function.

**Source:** [RATIO_TO_REPORT - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/ratio_to_report)

**Quote:** "Returns the ratio of a value within a group to the sum of the values within the group."

---

## Q66
**Answer: B**

**Explanation:** Using `SAMPLE (1)` in the SQL query limits data to approximately 1% of rows at the database level before transferring to the client, and `fetch_pandas_all()` efficiently converts the result to a pandas DataFrame. Option A fetches all rows into memory with `fetchall()` before converting, which defeats the purpose. Option C with `chunksize` still eventually processes all rows unless manually stopped. Option D calls `to_pandas()` on the entire table without filtering.

**Source:** [Snowflake Python Connector - fetch_pandas_all](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-api)

**Quote:** "fetch_pandas_all() — Fetches all the rows in a cursor and loads them into a pandas DataFrame."

---

## Q67
**Answer: A, B**

**Explanation:** `REGR_SLOPE(y, x)` computes the slope of the least-squares regression line using `COVAR_POP(x,y) / VAR_POP(x)`, and `REGR_INTERCEPT(y, x)` computes the y-intercept using `AVG(y) - REGR_SLOPE(y,x) * AVG(x)`. Options C (`REGR_FIT`), D (`REGR_PREDICT`), and E (`REGR_TRANSFORM`) do not exist in Snowflake SQL.

**Source:** [REGR_SLOPE - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/regr_slope)

**Quote:** "Returns the slope of the linear regression line for non-null pairs in a group. It is computed for non-null pairs using the following formula: COVAR_POP(x,y) / VAR_POP(x)"

---

## Q68
**Answer: A**

**Explanation:** `COVAR_SAMP(y, x)` computes the sample covariance between two columns. `CORR(y, x)` (B) computes correlation, not covariance. `COV(y, x)` (C) is not a valid Snowflake function name. `VARIANCE(y, x)` (D) is not valid since VARIANCE takes a single column argument.

**Source:** [COVAR_SAMP - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/covar_samp)

**Quote:** "Returns the sample covariance for non-null pairs in a group."

---

## Q69
**Answer: B**

**Explanation:** Regression functions like `REGR_INTERCEPT` require numeric inputs for both dependent and independent variables. NULL pairs are automatically excluded from the computation. Option A is wrong because STRING types would cause an error rather than being automatically converted to meaningful regression inputs. Option C is wrong because pre-sorting is not required. Option D is wrong because there is no minimum data point requirement beyond having at least one non-null pair (though meaningful results need more).

**Source:** [REGR_INTERCEPT - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/regr_intercept)

**Quote:** "Returns the intercept of the univariate linear regression line for non-null pairs in a group. It is computed for non-null pairs using the following formula: AVG(y)-REGR_SLOPE(y,x)*AVG(x)"

---

## Q70
**Answer: B**

**Explanation:** The `MEDIAN` function computes the 50th percentile value, equivalent to `PERCENTILE_CONT(0.5)`. Option A partially describes the interpolation mechanism but is incomplete as a definition. Option C describes the MODE function. Option D describes the midrange, not the median.

**Source:** [MEDIAN - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/median)

**Quote:** "Returns the median value for the values within expr. NULL values are ignored unless all the values are NULL, in which case a NULL value is returned."

---

## Q71
**Answer: A**

**Explanation:** Computing z-scores relative to a rolling window of the past 60 readings requires window functions with `ROWS BETWEEN 59 PRECEDING AND CURRENT ROW` for both `AVG` and `STDDEV`. This correctly computes a local z-score for each reading. Option B computes a global z-score, which misses local anomalies. Options C and D compute rank-based measures, not z-scores.

**Source:** [Window function syntax and usage - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions-window-syntax)

**Quote:** "ROWS BETWEEN specifies that the window frame is determined by counting rows forward or backward from the current row."

---

## Q72
**Answer: A, B**

**Explanation:** Approximation functions trade exact precision for significantly better performance on large datasets (A is correct). Snowflake's HyperLogLog implementation for `APPROX_COUNT_DISTINCT` has an average relative error of approximately 1.62%, which is less than 2% (B is correct). Option C is wrong because approximation functions are not identical to exact counterparts. Option D is wrong because `APPROX_TOP_K` returns approximate both for ranking and frequency counts. Option E is wrong because approximation functions can be used with window functions and `GROUP BY`.

**Source:** [Estimating the Number of Distinct Values - Snowflake Documentation](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality)

**Quote:** "The average relative error of our HyperLogLog implementation is 1.62338% (i.e. the average relative difference to the corresponding COUNT(DISTINCT ...) result)."

---

## Q73
**Answer: A**

**Explanation:** `PERCENTILE_CONT(n) WITHIN GROUP (ORDER BY column)` returns the Nth percentile using continuous interpolation between the two nearest input values. `PERCENTILE_DISC` (B) returns an actual value from the dataset rather than interpolating. Options C (`NTH_PERCENTILE`) and D (`QUANTILE`) are not valid Snowflake functions.

**Source:** [PERCENTILE_CONT - Snowflake Documentation](https://docs.snowflake.com/en/sql-reference/functions/percentile_cont)

**Quote:** "Return a percentile value based on a continuous distribution of the input column. If no input row lies exactly at the desired percentile, the result is calculated using linear interpolation of the two nearest input values."

---

## Q74
**Answer: A**

**Explanation:** `StandardScaler` standardizes features by removing the mean and scaling to unit variance (z-score normalization). `MinMaxScaler` (B) scales to a given range, not unit variance. `Normalizer` (C) scales individual samples to have unit norm, not features. `RobustScaler` (D) uses median and interquartile range, making it robust to outliers but not targeting unit variance.

**Source:** [snowflake.ml.modeling.preprocessing.StandardScaler](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.9/api/modeling/snowflake.ml.modeling.preprocessing.StandardScaler)

**Quote:** "Standardizes features by removing the mean and scaling to unit variance. Values must be of float type."

---

## Q75
**Answer: B**

**Explanation:** `MinMaxScaler` scales features to a specified range, with the default being [0, 1], which is exactly what is needed for neural network inputs. `StandardScaler` (A) scales to zero mean and unit variance, not a bounded [0, 1] range. `MaxAbsScaler` (C) scales by dividing by the maximum absolute value, which results in [-1, 1] for data with negative values. `Normalizer` (D) normalizes each sample independently, not each feature.

**Source:** [snowflake.ml.modeling.preprocessing.MinMaxScaler](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/api/modeling/snowflake.ml.modeling.preprocessing.MinMaxScaler)

**Quote:** "Transforms features by scaling each feature to a given range, by default between zero and one."

---

## Q76
**Answer: A**

**Explanation:** `StandardScaler` centers data to zero mean and scales to unit variance (z-score standardization), while `MinMaxScaler` scales features to a specified range with default [0, 1]. Options B, C, and D are incorrect: both work with numeric types, both operate column-wise (per feature), and neither is restricted to classification or regression use cases.

**Source:** [snowflake.ml.modeling.preprocessing.StandardScaler](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.9/api/modeling/snowflake.ml.modeling.preprocessing.StandardScaler)

**Quote:** "Standardizes features by removing the mean and scaling to unit variance."

---

## Q77
**Answer: B**

**Explanation:** Distance-based algorithms like KNN compute distances between data points. Without scaling, features with larger numerical ranges (like income: 20,000-500,000) would dominate the distance metric, making features with smaller ranges (like age: 18-80) nearly irrelevant. Option A is incorrect because scaling does not address NULL values. Option C is wrong because scaling is about magnitude, not data type conversion. Option D is incorrect because distance-based algorithms do not automatically normalize features.

**Source:** [snowflake.ml.modeling.preprocessing.MinMaxScaler](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/api/modeling/snowflake.ml.modeling.preprocessing.MinMaxScaler)

**Quote:** "Transforms features by scaling each feature to a given range, by default between zero and one."

---

## Q78
**Answer: A, B**

**Explanation:** `OrdinalEncoder` maps categories to ordered integer values, and `OneHotEncoder` creates binary indicator columns for each category. Both are available in `snowflake.ml.modeling.preprocessing`. Options C (`BinaryEncoder`), D (`TargetEncoder`), and E (`HashEncoder`) are not part of the Snowflake ML preprocessing module.

**Source:** [Snowpark ML API Reference (Python)](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.4/index)

**Quote:** "snowflake.ml.modeling.preprocessing.OrdinalEncoder ... snowflake.ml.modeling.preprocessing.OneHotEncoder"

---

## Q79
**Answer: B**

**Explanation:** One-hot encoding creates a separate binary column for each category value, where exactly one column has value 1 per row and all others are 0. Option A describes a partial view of binary encoding for a single category, not the full one-hot representation. Option C describes ordinal encoding. Option D describes frequency encoding.

**Source:** [snowflake.ml.modeling.preprocessing.OneHotEncoder](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.9/api/modeling/snowflake.ml.modeling.preprocessing.OneHotEncoder)

**Quote:** "Encode categorical features as a one-hot numeric array. The feature is converted to a matrix containing a column for each category. For each row, a column is 0 if the category is absent, or 1 if it exists."

---

## Q80
**Answer: A**

**Explanation:** Setting `drop="first"` drops the first category column for each feature, avoiding perfect multicollinearity (the dummy variable trap) that occurs when all one-hot encoded columns sum to 1 in linear models. Option B relates to memory representation, not multicollinearity. Option C handles unseen categories, not multicollinearity. Option D limits categories but does not specifically address the dummy variable trap.

**Source:** [snowflake.ml.modeling.preprocessing.OneHotEncoder](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.9/api/modeling/snowflake.ml.modeling.preprocessing.OneHotEncoder)

**Quote:** "Specifies a methodology to use to drop one of the categories per feature. This is useful in situations where perfectly collinear features cause problems, such as when feeding the resulting data into an unregularized linear regression model."

---

## Q81
**Answer: A**

**Explanation:** `LabelEncoder` encodes a single categorical target column into integer values from 0 to n_classes-1, which is a specialization of OrdinalEncoder for 1-dimensional data. Option B describes binarization, not label encoding. Option C describes one-hot encoding of the target. Option D describes sample weight generation, which is a different concept.

**Source:** [snowflake.ml.modeling.preprocessing.LabelEncoder](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.9/api/modeling/snowflake.ml.modeling.preprocessing.LabelEncoder)

**Quote:** "Each class (i.e., distinct numeric or string) is assigned an integer value, starting with zero. LabelEncoder is a specialization of OrdinalEncoder for 1-dimensional data."

## Q82
**Answer: A**

**Explanation:** Using `group_by("CUSTOMER_ID").agg(...)` with multiple aggregation functions computes all three derived features in a single pass over the data, which is the most efficient Snowpark approach. It pushes the computation to the Snowflake engine as a single SQL GROUP BY with multiple aggregates. Option B (three separate DataFrames joined together) is functionally correct but less efficient due to three scans and two joins. Option C (Python UDF iterating per customer) would be extremely slow as it processes row-by-row in Python rather than leveraging Snowflake's distributed engine.

**Source:** [Working with DataFrames in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "When calling these transformation methods, you might need to specify columns or expressions that use columns."

---

## Q83
**Answer: A, B**

**Explanation:** The Snowpark Feature Store provides a centralized repository for storing, managing, and serving ML features (A). It supports defining Entity objects that represent real-world objects features describe, with join_keys that identify each entity instance (B). The Feature Store does not automatically train ML models (C) -- it only manages features. It does not replace preprocessing or transformation (D) -- those are still needed to create features. It stores both feature metadata and materialized feature data via dynamic tables, not just metadata (E).

**Source:** [Snowflake Feature Store](https://docs.snowflake.com/en/developer-guide/snowflake-ml/feature-store/overview)

**Quote:** "A feature store lets you standardize commonly used feature transformations in a central repository, enabling reuse, helping to reduce duplication of data and effort, and improving productivity."

---

## Q84
**Answer: B**

**Explanation:** The primary purpose of the Snowpark Feature Store is to enable reuse and sharing of curated features across ML projects while ensuring consistency between training and serving. This eliminates training-serving skew and reduces duplication of effort. It is not a GPU-accelerated engine (A), does not automatically generate features without human intervention (C), and does not store trained models -- that is the Model Registry's job (D).

**Source:** [Snowflake Feature Store](https://docs.snowflake.com/en/developer-guide/snowflake-ml/feature-store/overview)

**Quote:** "A feature store lets you standardize commonly used feature transformations in a central repository, enabling reuse, helping to reduce duplication of data and effort, and improving productivity. It also helps maintain features by updating them on new source data, always providing correct, consistent, and fresh features in a single source of truth."

---

## Q85
**Answer: A**

**Explanation:** In the Snowpark Feature Store, the `Entity` object is created with a `join_keys` parameter that specifies the columns uniquely identifying each entity instance. For example: `Entity(name="CUSTOMER", join_keys=["CUSTOMER_ID"])`. The FeatureView does not have a `primary_key` parameter (B). There is no `FeatureGroup` (C) or `FeatureTable` (D) class in the Feature Store API with those parameters.

**Source:** [Working with entities](https://docs.snowflake.com/en/developer-guide/snowflake-ml/feature-store/entities)

**Quote:** "Entity encapsulates additional metadata for feature definition. Entity is typically used together with FeatureView to define join_keys and associate relevant FeatureViews."

---

## Q86
**Answer: B**

**Explanation:** Binning (discretization) is the process of dividing continuous numerical data into discrete intervals or categories. For example, converting raw age values into age groups like "Young Adult" or "Senior." It is not about converting categorical to numerical (A) -- that is encoding. It is not about removing outliers (C) or binary encoding (D).

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Leverage distributed preprocessing functions in snowflake.ml.modeling.preprocessing."

---

## Q87
**Answer: A**

**Explanation:** A CASE WHEN expression with BETWEEN clauses is the most appropriate way to bin ages into custom, non-uniform groups with specific labels. It allows precise control over the boundaries and labels for each bin. DECODE (B) only matches exact values, not ranges, so it would only match ages exactly 0, 18, 36, or 56. NTILE (C) creates equal-frequency groups based on row count, not value ranges. WIDTH_BUCKET (D) creates equal-width numeric bins without custom labels.

**Source:** [CASE (conditional expression)](https://docs.snowflake.com/en/sql-reference/functions/case)

**Quote:** "CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ... ELSE default_result END"

---

## Q88
**Answer: A, C**

**Explanation:** NTILE(n) divides ordered rows into n approximately equal groups, directly creating equal-frequency bins (A). PERCENTILE_CONT can be used to identify the boundary values at specific percentiles, which can then be used to define equal-frequency bins via CASE statements (C). WIDTH_BUCKET (B) creates equal-width bins, not equal-frequency bins. ROUND (D) also creates equal-width bins. HISTOGRAM (E) does not exist as a standard Snowflake SQL function.

**Source:** [NTILE window function](https://docs.snowflake.com/en/sql-reference/functions/ntile)

**Quote:** "Divides an ordered data set equally into the number of buckets specified by constant_value."

---

## Q89
**Answer: B**

**Explanation:** Label encoding assigns arbitrary integers to categories with no inherent ordering (e.g., Red=0, Blue=1, Green=2), while ordinal encoding preserves the inherent order of categories (e.g., Low=0, Medium=1, High=2). They are not identical (A). Label encoding is not limited to binary features (C), and neither method is supervised vs. unsupervised in the traditional sense (D).

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Leverage distributed preprocessing functions in snowflake.ml.modeling.preprocessing."

---

## Q90
**Answer: A**

**Explanation:** For tree-based models (e.g., Random Forest, XGBoost), ordinal encoding is most appropriate even for nominal categories because tree-based models can handle integer-encoded categories directly without assuming any ordering -- they split on specific values, not on order. One-hot encoding (B) is valid but creates unnecessary dimensionality for tree-based models. Binary encoding (C) and target encoding (D) are alternatives but are not the most standard or straightforward choice for this scenario.

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Leverage distributed preprocessing functions in snowflake.ml.modeling.preprocessing."

---

## Q91
**Answer: C**

**Explanation:** The `Normalizer` class applies normalization to scale individual samples (rows) to have unit norm. Unlike StandardScaler (A) which standardizes features column-wise by removing mean and scaling to unit variance, or MinMaxScaler (B) which scales column-wise to a range, or MaxAbsScaler (D) which scales each feature by its maximum absolute value column-wise, the Normalizer operates row-wise.

**Source:** [snowflake.ml.modeling.preprocessing.Normalizer](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/api/modeling/snowflake.ml.modeling.preprocessing.Normalizer)

**Quote:** "Normalize samples individually to each row's unit norm. Each sample (i.e. each row of the data matrix) with at least one non-zero component is rescaled independently of other samples so that its norm (l1, l2 or inf) equals one."

---

## Q92
**Answer: D**

**Explanation:** Snowpark pandas (pandas on Snowflake) is enabled by importing `snowflake.snowpark.modin.plugin` followed by `import modin.pandas as pd`. The plugin registers the Snowflake backend so that modin pandas operations are transpiled to SQL and executed on the Snowflake engine. Standard pandas (A) does not automatically intercept calls. There is no standalone `modin.pandas` with a Snowflake backend without the plugin (B). Option C is incomplete -- the plugin import is required separately.

**Source:** [pandas on Snowflake](https://docs.snowflake.com/en/developer-guide/snowpark/python/pandas-on-snowflake)

**Quote:** "Once pandas on Snowflake is installed, instead of importing pandas as import pandas as pd, use the following two lines: import modin.pandas as pd import snowflake.snowpark.modin.plugin"

---

## Q93
**Answer: A, C**

**Explanation:** Snowpark pandas transpiles pandas operations into SQL that runs on the Snowflake engine (A), keeping data in Snowflake rather than downloading it to the client. It supports a significant subset of the pandas API while keeping data in Snowflake (C). It does not require downloading data to the client (B) -- that would defeat its purpose. There is no 10 GB limit (D). The import mechanism uses `import modin.pandas as pd` with the plugin, not `snowflake.snowpark.pandas` (E).

**Source:** [pandas on Snowflake](https://docs.snowflake.com/en/developer-guide/snowpark/python/pandas-on-snowflake)

**Quote:** "import modin.pandas as pd import snowflake.snowpark.modin.plugin"

---

## Q94
**Answer: B**

**Explanation:** Snowpark DataFrames execute operations on the Snowflake engine, avoiding data transfer to the client and leveraging Snowflake's scalable compute infrastructure. This is especially important for large datasets that would not fit in client memory. They do not necessarily support more operations than pandas (A). They do not provide visualization (C) or auto-detect data quality issues (D).

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Use Snowpark to scale your data preprocessing and transformation."

---

## Q95
**Answer: C**

**Explanation:** Both approaches are valid: computing a separate aggregation DataFrame and joining it back (A), or using a window function to add the aggregated value directly (B). However, option B using a window function avoids the explicit join and is more concise, making option C the best answer that acknowledges both are valid while noting the window function advantage. Option D (Python UDF querying per user) would be extremely inefficient.

**Source:** [Working with DataFrames in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "When calling these transformation methods, you might need to specify columns or expressions that use columns."

---

## Q96
**Answer: A**

**Explanation:** MaxAbsScaler scales each feature by its maximum absolute value so that the maximal absolute value of each feature in the training set will be 1.0, resulting in values in the range [-1, 1]. It does not shift or center data, preserving sparsity. It does not remove features (B), does not relate to correlation with a target (C), and does not apply absolute value transformation followed by normalization (D).

**Source:** [snowflake.ml.modeling.preprocessing.MaxAbsScaler](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.0.9/api/modeling/snowflake.ml.modeling.preprocessing.MaxAbsScaler)

**Quote:** "Scale each feature by its maximum absolute value. This transformer scales and translates each feature individually such that the maximal absolute value of each feature in the training set will be 1.0. It does not shift/center the data, and thus does not destroy any sparsity."

---

## Q97
**Answer: B**

**Explanation:** SMOTE should be applied only after the train/test split, and only on the training set. Applying it before the split (A) would cause data leakage because synthetic samples generated from minority class examples could influence the test set. Applying it to both sets (C) would corrupt the test set's representation of real-world data distribution. SMOTE is not a built-in algorithm parameter (D) -- it is a separate preprocessing step.

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Use Snowpark to scale your data preprocessing and transformation."

---

## Q98
**Answer: A, B**

**Explanation:** SMOTE generates synthetic minority class examples by interpolating between existing minority class neighbors (A), which is a well-established technique for handling class imbalance. Random undersampling of the majority class (B) reduces its size to balance proportions. Removing all minority class examples (C) would eliminate the class you want to predict. Duplicating the entire dataset (D) does not change class proportions. Converting to regression (E) does not address the underlying problem.

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Use Snowpark to scale your data preprocessing and transformation."

---

## Q99
**Answer: B**

**Explanation:** SMOTE creates new synthetic minority class samples by interpolating between existing minority class neighbors in feature space. Specifically, it selects a minority sample, finds its k nearest minority class neighbors, and creates a new sample at a random point along the line segment between the selected sample and one of its neighbors. It does not simply duplicate existing samples (A) -- that would be random oversampling. It does not remove majority class samples (C) -- that is undersampling. It does not adjust decision thresholds (D) -- that is threshold tuning.

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Use Snowpark to scale your data preprocessing and transformation."

---

## Q100
**Answer: B**

**Explanation:** Using `snowflake.ml.modeling.pipeline.Pipeline` to chain preprocessing steps is the recommended approach in Snowpark ML. The Pipeline allows you to sequence different transformers applied to specific column subsets via their `input_cols` and `output_cols` parameters. Snowpark ML does not have a `ColumnTransformer` class (C) -- that is a scikit-learn concept not directly available in the Snowpark ML API. Applying transformers separately and concatenating (A) is more manual and error-prone. A custom UDF (D) would lose the benefits of distributed SQL compilation.

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Leverage distributed preprocessing functions in snowflake.ml.modeling.preprocessing."

---

## Q101
**Answer: A**

**Explanation:** The `Binarizer` class converts numerical features into binary (0/1) values based on a specified threshold. Values greater than the threshold are mapped to 1, and values less than or equal to the threshold are mapped to 0. It does not convert categorical features to binary encoding (B), does not split datasets (C), and does not perform binary search for parameters (D).

**Source:** [snowflake.ml.modeling.preprocessing.Binarizer](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.7.0/api/modeling/snowflake.ml.modeling.preprocessing.Binarizer)

**Quote:** "Binarizes data (sets feature values to 0 or 1) according to the given threshold. Values must be of float type. Values greater than the threshold map to 1, while values less than or equal to the threshold map to 0."

---

## Q102
**Answer: A**

**Explanation:** The correct configuration is `Binarizer(threshold=37.5, input_cols=["TEMPERATURE"], output_cols=["HAS_FEVER"])`. The Binarizer class uses the `threshold`, `input_cols`, and `output_cols` parameters matching the Snowpark ML API convention. Options B, C, and D use incorrect parameter names (`cutoff`, `boundary`, `split_value`, `columns`, `feature`, `label`, `input_col`) that do not exist in the Binarizer API.

**Source:** [snowflake.ml.modeling.preprocessing.Binarizer](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.7.0/api/modeling/snowflake.ml.modeling.preprocessing.Binarizer)

**Quote:** "class snowflake.ml.modeling.preprocessing.Binarizer(*, threshold: float = 0.0, input_cols: Optional[Union[str, Iterable[str]]] = None, output_cols: Optional[Union[str, Iterable[str]]] = None, passthrough_cols: Optional[Union[str, Iterable[str]]] = None, drop_input_cols: Optional[bool] = False)"

---

## Q103
**Answer: A, E**

**Explanation:** A FeatureView defines the logic for computing a set of features from source data, accepting a Snowpark DataFrame that contains the feature generation logic (A). A FeatureView must be explicitly registered with the Feature Store using `register_feature_view()` before it can be used for generating training sets or retrieving feature values (E). FeatureViews do not perform hyperparameter tuning (C). A FeatureView can pull from multiple source tables through its backing DataFrame transformation (D is incorrect). While B sounds plausible, the formal definition is through a Snowpark DataFrame -- the FeatureView itself accepts a `feature_df` parameter which is a Snowpark DataFrame.

**Source:** [Working with feature views](https://docs.snowflake.com/en/developer-guide/snowflake-ml/feature-store/feature-views)

**Quote:** "The FeatureView constructor accepts a Snowpark DataFrame that contains the feature generation logic."

---

## Q104
**Answer: A**

**Explanation:** `SimpleImputer` in `snowflake.ml.modeling.impute` (part of the Snowpark ML preprocessing module) is used to impute missing values by replacing them with a computed statistic like mean, median, most frequent, or a constant value. The other options (B, C, D) are not actual classes in the Snowpark ML library.

**Source:** [snowflake.ml.modeling.impute.SimpleImputer](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.5.4/api/modeling/snowflake.ml.modeling.impute.SimpleImputer)

**Quote:** "Univariate imputer for completing missing values with simple strategies."

---

## Q105
**Answer: D**

**Explanation:** Frequency encoding, where each zip code is replaced by its occurrence count in the dataset, is a practical approach for high-cardinality categorical features like zip codes with 40,000+ unique values. It reduces dimensionality to a single numeric column while preserving information about how common each value is. Label encoding with random assignment (A) introduces meaningless numeric relationships. One-hot encoding with max_categories (B) would still lose significant information by lumping most categories into an "infrequent" bin. Ordinal encoding by alphabetical order (C) imposes a meaningless ordering on zip codes.

**Source:** [Snowflake ML Model Development](https://docs.snowflake.com/en/developer-guide/snowflake-ml/modeling)

**Quote:** "Use Snowpark to scale your data preprocessing and transformation."

---

## Q106
**Answer: A**

**Explanation:** In Snowpark Python, `df.with_column("NEW_COL", expression)` is the method to create a new column derived from existing columns. It returns a new DataFrame with the additional column computed from the specified expression. The methods `add_column` (B), `create_column` (C), and `insert_column` (D) do not exist in the Snowpark DataFrame API.

**Source:** [snowflake.snowpark.DataFrame.with_column](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.DataFrame.with_column)

**Quote:** "Returns a DataFrame with an additional column with the specified name col_name. The column is computed by using the specified expression col."

---

## Q107
**Answer: A**

**Explanation:** Using `group_by("CUSTOMER_ID").agg(...)` with appropriate aggregate functions computes all three RFM features in a single pass: `datediff` on `max_(col("PURCHASE_DATE"))` for recency, `count("*")` for frequency, and `sum_(col("AMOUNT"))` for monetary value. There is no built-in `compute_rfm()` method on Snowpark DataFrames (B). Using `apply` with a lambda (C) would not correctly leverage Snowpark's SQL compilation. The `pivot` approach (D) is syntactically incorrect and not suited for this use case.

**Source:** [Working with DataFrames in Snowpark Python](https://docs.snowflake.com/en/developer-guide/snowpark/python/working-with-dataframes)

**Quote:** "When calling these transformation methods, you might need to specify columns or expressions that use columns."

---

## Q108
**Answer: A, C**

**Explanation:** The `snowflake.ml.modeling.decomposition` module includes `PCA` for Principal Component Analysis (A) and `TruncatedSVD` for Singular Value Decomposition (C), both valid dimensionality reduction approaches. There is no `snowflake.ml.modeling.manifold.TSNE` class in the Snowpark ML library (B). `AutoDimensionReduce` (D) does not exist. `LLE` (E) is not available in the Snowpark ML decomposition module.

**Source:** [snowflake.ml.modeling.decomposition.PCA](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/api/modeling/snowflake.ml.modeling.decomposition.PCA)

**Quote:** "Dimensionality reduction using truncated SVD (aka LSA)"

---

## Q109
**Answer: B**

**Explanation:** PCA (Principal Component Analysis) reduces dimensionality by projecting data onto orthogonal components that capture the most variance. The Snowflake `snowflake.ml.modeling.decomposition.PCA` class wraps sklearn's PCA and applies dimensionality reduction. Option A is wrong because PCA does not identify or remove outliers — it transforms features. Option C is wrong because PCA operates on numeric features, not categorical encoding. Option D describes clustering (e.g., K-means), not PCA.

**Source:** [snowflake.ml.modeling.decomposition.PCA](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/api/modeling/snowflake.ml.modeling.decomposition.PCA)

**Quote:** "Principal component analysis (PCA) For more details on this class, see sklearn.decomposition.PCA"

---

## Q110
**Answer: A**

**Explanation:** The `OrdinalEncoder` in `snowflake.ml.modeling.preprocessing` accepts a `categories` parameter that can be a dictionary mapping column names to an array of categories. The order of values in the array determines the ordinal encoding — the first value maps to 0, the second to 1, etc. By passing `categories={"SIZE": ["Small", "Medium", "Large", "XL"]}`, the natural ordering is preserved. Option C is wrong because automatic detection does not infer a meaningful semantic ordering. Options B and D use parameters that don't exist in the API.

**Source:** [snowflake.ml.modeling.preprocessing.OrdinalEncoder](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/1.7.0/api/modeling/snowflake.ml.modeling.preprocessing.OrdinalEncoder)

**Quote:** "categories – 'auto', list of array-like, or dict {column_name: ndarray([category])}, default='auto' Categories (unique values) per feature: - 'auto': Determine categories automatically from the training data. - list: categories[i] holds the categories expected in the ith column. dict: categories[column_name] holds the categories expected in the column provided."

---

## Q111
**Answer: B**

**Explanation:** In Snowflake SQL, the `DECODE` function compares a select expression to each search expression in order and returns the corresponding result when a match is found — functionally similar to a CASE expression but with more compact syntax. It is commonly used to map discrete values to new values for feature engineering. Option C is wrong because `DECODE` in Snowflake is not related to encryption/decryption (that's the `DECRYPT` function). Option D is wrong because there is no `ENCODE` counterpart in this context.

**Source:** [DECODE](https://docs.snowflake.com/en/sql-reference/functions/decode)

**Quote:** "Compares the select expression to each search expression in order. As soon as a search expression matches the selection expression, the corresponding result expression is returned."

---

## Q112
**Answer: B**

**Explanation:** When registering a Feature View with the Snowpark Feature Store, setting the `refresh_freq` parameter designates it as a Snowflake-managed Feature View backed by a dynamic table. The `refresh_freq` value controls how often feature data is refreshed. Option A is wrong because refresh is automatic based on the schedule, not manual-only. Option C is wrong because Snowflake-managed feature views with `refresh_freq` are materialized as dynamic tables, not computed on-the-fly. Option D is wrong because there is no default midnight UTC schedule — the user specifies the frequency.

**Source:** [Working with feature views](https://docs.snowflake.com/en/developer-guide/snowflake-ml/feature-store/feature-views)

**Quote:** "A Snowflake-managed feature view uses a dynamic table as the feature table. Features are extracted from the source data on a schedule you specify, handling new data efficiently and incrementally."

---

## Q113
**Answer: A, B**

**Explanation:** `StandardScaler` stores the mean and standard deviation computed during `fit()` and applies them during `transform()`, so these values must be consistent between training and inference. `OneHotEncoder` stores the category-to-column mappings learned during `fit()` to ensure the same categories produce the same output columns at inference time. Option C is wrong because `Binarizer` uses a user-specified fixed threshold, not one learned during `fit()`. Option D is wrong because mathematical operations like `log()` or `sqrt()` are stateless transformations with no fitted parameters. Option E is wrong because `Normalizer` normalizes each sample independently at transform time and does not store fitted norms.

**Source:** [snowflake.ml.modeling — Preprocessing](https://docs.snowflake.com/en/developer-guide/snowpark-ml/reference/latest/modeling)

**Quote:** "Encodes categorical features as a one-hot numeric array. In other words, each category (i.e., distinct numeric or string value) is assigned an integer value, starting with zero."

---

## Q114
**Answer: A**

**Explanation:** Snowsight provides a Charts tab that automatically generates a visualization based on query results. When you run a query in a worksheet, you can select the Chart option above the results table, and Snowsight creates a chart for you. You can then customize the chart type (bar, line, scatter, heatgrid, scorecard). Option B is wrong because dashboards don't require importing visualization libraries. Option C is wrong because Snowsight provides more than just tabular display. Option D is fictional — there is no "Visualization Studio" in Snowflake.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "When you run a query in a worksheet, you can display a chart based on the results. Open a worksheet. Run the worksheet. Above the results table for the query, select Chart."

---

## Q115
**Answer: D**

**Explanation:** Snowflake Notebooks support all three approaches: `matplotlib` for static plots in Python cells, `altair` for interactive plots that render inline, and Snowsight's built-in charting for SQL cell results. The documentation explicitly states that Notebooks support visualization libraries like Altair, Matplotlib, seaborn, and plotly, as well as Streamlit-based visualizations. Therefore, all of the listed options are supported.

**Source:** [Visualize data in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-visualize-data)

**Quote:** "In Snowflake Notebooks, you can use your favorite Python visualization libraries, such as matplotlib and plotly, to develop your visualizations."

---

## Q116
**Answer: B**

**Explanation:** In Snowflake Notebooks, SQL cells (or the `%%sql` cell magic) allow writing and executing SQL queries directly within the notebook. The results from SQL cells are available to Python cells via cell references (e.g., `cell1.to_pandas()` or `cell1.to_df()`). Option A is wrong because it does not convert Python to SQL. Option C is wrong because it actually executes the query, not just validates syntax. Option D is wrong because it does not create stored procedures.

**Source:** [Develop and run code in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-develop-run)

**Quote:** "Convert a SQL results table to a Snowpark DataFrame. If you have the following in a SQL cell called cell1: ... You can reference the cell to access the SQL result: snowpark_df = cell1.to_df()"

---

## Q117
**Answer: A**

**Explanation:** The z-score method (mean ± 3 standard deviations) is a well-established statistical technique for quantifying outliers. The query filters for values beyond 3 standard deviations from the mean within the target region, which corresponds to the extreme values shown above the upper whisker in the box plot. Option B would only return the single maximum value, not outliers. Option C uses arbitrary hardcoded bounds unrelated to the data distribution. Option D checks for NULLs, not outliers.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts let you quickly identify and understand patterns and outliers in data."

---

## Q118
**Answer: A, B**

**Explanation:** Snowsight supports bar charts (for comparing categorical data) and line charts (for visualizing trends over time), along with scatter plots, heatgrids, and scorecards. Options C, D, and E (3D surface plots, network graphs, Sankey diagrams) are not available in Snowsight's built-in chart types.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Snowsight supports the following types of charts:"

---

## Q119
**Answer: A**

**Explanation:** The IQR (Interquartile Range) method defines outliers as values below Q1 - 1.5 × IQR or above Q3 + 1.5 × IQR, where IQR = Q3 - Q1. This is the standard Tukey fence method used in box plots. Option B describes a z-score-based method (though typically 2 or 3 standard deviations, not 1). Option C describes a percentile-based approach, not IQR. Option D is an arbitrary rule with no standard statistical basis.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts let you quickly identify and understand patterns and outliers in data."

---

## Q120
**Answer: A**

**Explanation:** Snowflake Notebooks support a scheduling feature that lets you create a schedule with a specified cron expression or interval. When you create a schedule, Snowsight creates a task that runs the notebook according to the specified schedule in non-interactive mode, executing each cell sequentially. Option D is incorrect because scheduling is supported. Options B and C describe workarounds that are not the primary built-in mechanism.

**Source:** [Schedule notebook runs](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-schedule)

**Quote:** "For Frequency, select a frequency at which to run the notebook (for example, Daily). Depending on the frequency that you select, adjust the Scheduled time and other options to match when you want the notebook to run."

---

## Q121
**Answer: A**

**Explanation:** `seaborn` is the open-source Python visualization library commonly used in Snowflake Notebooks for creating statistical plots such as distribution plots, heatmaps, and pair plots. It is available as an installable package in Snowflake Notebooks. Option B (`d3.js`) is a JavaScript library, not Python. Option C (`ggplot`) is primarily an R paradigm (Python's `plotnine` mirrors it, but `ggplot` itself is not the common choice). Option D (`tableau`) is a BI tool, not a Python library.

**Source:** [Visualize data in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-visualize-data)

**Quote:** "To use seaborn, you must install the seaborn library for your notebook: From the notebook, select Packages."

---

## Q122
**Answer: A**

**Explanation:** Snowflake Notebooks support mixed cell types — SQL cells for computing metrics, Python cells with `matplotlib` (or other libraries) for trend charts, and Markdown cells for narrative explanations. This is the most appropriate approach for creating a dashboard-style summary within a notebook. Option B defeats the purpose of using Snowflake Notebooks. Option C relies on a single SQL cell and Snowsight auto-visualization, which is too limited for a multi-component dashboard. Option D ignores the power of SQL and Markdown cells.

**Source:** [About Snowflake Notebooks](https://docs.snowflake.com/user-guide/ui-snowsight/notebooks)

**Quote:** "Snowflake Notebooks is a unified development interface in Snowsight that offers an interactive, cell-based programming environment for Python, SQL, and Markdown."

---

## Q123
**Answer: A, B**

**Explanation:** Snowflake Notebooks support mixed cell types (SQL, Python, Markdown) in a single notebook for integrated analysis, and they support importing Python packages like `matplotlib`, `seaborn`, and `plotly` for custom visualizations. Option C is wrong because Notebooks do not automatically train ML models from visualized data. Option D is wrong because there is no direct export to PowerPoint with interactive charts. Option E describes real-time collaborative editing, which is not a core capability of Snowflake Notebooks in the same way (collaboration is role-based, not simultaneous editing).

**Source:** [About Snowflake Notebooks](https://docs.snowflake.com/user-guide/ui-snowsight/notebooks)

**Quote:** "Interactively visualize your data using embedded Streamlit visualizations and other libraries like Altair, Matplotlib, or seaborn."

---

## Q124
**Answer: B**

**Explanation:** When using `plotly` in a Snowflake Notebook, interactive visualizations are rendered as interactive HTML widgets directly in the notebook output. Users can hover, zoom, and interact with the plots inline. Option A is wrong because Snowflake Notebooks do support interactive plotly rendering. Option C is wrong because no separate browser tab is needed. Option D is wrong because plotly charts are not converted to Snowsight native charts.

**Source:** [Visualize data in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-visualize-data)

**Quote:** "To use plotly, install the plotly library for your notebook: From the notebook, select Packages."

---

## Q125
**Answer: A**

**Explanation:** A line chart showing monthly churn rate over multiple years with each year as a separate series is the best way to demonstrate seasonal patterns, because it allows visual comparison of the same months across different years to identify recurring trends. Option B reduces the data to a single number, hiding all patterns. Option C presents raw numbers in a table without visual pattern recognition. Option D shows overall proportions without any temporal or seasonal dimension.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts transform your query results into visualizations that communicate logical relationships and lead to more informed decision making."

---

## Q126
**Answer: A**

**Explanation:** The Heatgrid chart type in Snowsight creates a color-coded matrix showing the magnitude of values across two categorical dimensions, where color intensity represents the data values. It requires specifying Row and Column axes and a value column, creating a grid where color corresponds to magnitude. Option B is incorrect — it's not about product sales. Option C is wrong because it's not a geographic map. Option D is wrong because it doesn't apply gradients to all columns indiscriminately.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Style your chart in the Appearance section. The available settings depend on the type of chart. For example, for a heatgrid chart:"

---

## Q127
**Answer: A**

**Explanation:** A log transformation (`log(salary + 1)`) is most appropriate for reducing right skewness by compressing the long right tail while spreading out the lower values. This makes the distribution more symmetric, which is beneficial for linear models that assume normally distributed features. Option B (z-score standardization) centers the data but does not change the shape of the distribution or reduce skewness. Option C (min-max scaling) also preserves the original distribution shape. Option D (removing values) loses data rather than transforming it.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts let you quickly identify and understand patterns and outliers in data."

---

## Q128
**Answer: A, B**

**Explanation:** Z-scores can be computed in Snowflake SQL using window functions: `(value - AVG(value) OVER()) / STDDEV(value) OVER()`, then filtering for absolute z-scores > 3. The IQR method uses `PERCENTILE_CONT(0.25)` and `PERCENTILE_CONT(0.75)` to compute Q1 and Q3, then defines outlier boundaries as Q1 - 1.5*IQR and Q3 + 1.5*IQR. Options C, D, and E reference functions (`OUTLIER_DETECT`, `ANOMALY_SCORE`, `FIND_OUTLIERS`) that do not exist in Snowflake SQL.

**Source:** [PERCENTILE_CONT](https://docs.snowflake.com/en/sql-reference/functions/percentile_cont)

**Quote:** "Returns the percentile value based on a continuous distribution of the input column."

---

## Q129
**Answer: A**

**Explanation:** A histogram showing the frequency distribution across bins is the most appropriate chart for visualizing the distribution of a single numeric variable and checking for normality. Histograms reveal the shape, center, spread, and skewness of a distribution. Option B (scatter plot with the same variable on both axes) is meaningless. Option C (bar chart) is for categorical comparisons. Option D (line chart over row index) shows ordering, not distribution.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts simplify grouping numbers, dates, and timestamps of more or less continuous values into various buckets."

---

## Q130
**Answer: A**

**Explanation:** The most practical approach is to compute pairwise correlations using `CORR(col_a, col_b)` in SQL for all feature pairs, then visualize the results using `seaborn.heatmap()` in a Python cell in the Snowflake Notebook. This leverages Snowflake's compute for the heavy correlation calculations and Python's visualization capabilities for the heatmap. Option B is wrong because Snowsight does not have a built-in correlation chart type. Option C requires unnecessary data export. Option D uses `REGR_R2` which measures R-squared for linear regression, not simple correlation.

**Source:** [Visualize data in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-visualize-data)

**Quote:** "In Snowflake Notebooks, you can use your favorite Python visualization libraries, such as matplotlib and plotly, to develop your visualizations."

---

## Q131
**Answer: B**

**Explanation:** Statistical summaries in Snowsight provide a quick overview of data characteristics including counts, distributions, and ranges. This information guides users in choosing appropriate visualization types and understanding data quality before creating charts. Option A is wrong because summaries don't automatically create charts. Option C is wrong because summaries complement but don't replace Python-based analysis. Option D is wrong because summaries don't automatically fix data quality issues.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts transform your query results into visualizations that communicate logical relationships and lead to more informed decision making. Charts let you quickly identify and understand patterns and outliers in data."

---

## Q132
**Answer: A**

**Explanation:** In Snowflake Notebooks, SQL cell results are automatically available in subsequent Python cells using the cell name. You can convert results to a pandas DataFrame using `cell1.to_pandas()` or to a Snowpark DataFrame using `cell1.to_df()`. Option B is wrong because re-execution is unnecessary — results are directly referenceable. Option C is wrong because SQL and Python cells can share data via cell references. Option D is wrong because no stage export is needed.

**Source:** [Develop and run code in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-develop-run)

**Quote:** "Convert a SQL results table to a Snowpark DataFrame. If you have the following in a SQL cell called cell1: ... You can reference the cell to access the SQL result: snowpark_df = cell1.to_df() Convert the result to a pandas DataFrame: my_df = cell1.to_pandas()"

---

## Q133
**Answer: A, B**

**Explanation:** Scheduled notebooks can be configured to run at specified intervals using a cron-like schedule or preset frequencies (hourly, daily, weekly, monthly, custom cron). Scheduled notebook runs can be monitored through the notebook's run history, including start/end times, status, and error details. Option C is wrong because scheduled notebooks execute all cells (SQL, Python, and Markdown) sequentially from top to bottom. Option D is wrong because scheduling does not require converting to a stored procedure. Option E is wrong because notebooks can be scheduled at various intervals, not just once per day.

**Source:** [Schedule notebook runs](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-schedule)

**Quote:** "For Frequency, select a frequency at which to run the notebook (for example, Daily). Depending on the frequency that you select, adjust the Scheduled time and other options to match when you want the notebook to run."

---

## Q134
**Answer: A**

**Explanation:** In a standard box plot, the whiskers extend to the minimum and maximum values within 1.5 × IQR from Q1 and Q3 respectively. Points beyond the whiskers are plotted individually as outliers. Option B describes a different statistical measure (mean ± standard deviation), not whiskers. Option C (10th and 90th percentiles) is not the standard box plot whisker definition. Option D describes the interquartile range (the box itself), not the whiskers.

**Source:** [Visualizing worksheet data](https://docs.snowflake.com/en/user-guide/ui-snowsight-visualizations)

**Quote:** "Charts let you quickly identify and understand patterns and outliers in data."

---

## Q135
**Answer: A**

**Explanation:** A scatter plot with a regression line created using `plotly` in a Snowflake Notebook, annotated with the `REGR_R2` value computed in SQL, best supports a business case by visually showing the relationship between transaction velocity and fraud likelihood while quantifying the relationship strength with R-squared. This combines visual impact with statistical rigor for non-technical executives. Option B provides raw data with no insight. Option C shows only temporal trends without the velocity-fraud relationship. Option D shows proportions without revealing the relationship between the two variables.

**Source:** [Visualize data in Snowflake Notebooks](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks-visualize-data)

**Quote:** "In Snowflake Notebooks, you can use your favorite Python visualization libraries, such as matplotlib and plotly, to develop your visualizations."
