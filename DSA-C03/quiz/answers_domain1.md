# Domain 1: Answers

---

## Q1
**Answer: C**

**Explanation:** Supervised learning is defined by the use of labeled training data — datasets containing both input features and corresponding known output values (labels). The model learns a mapping from inputs to outputs. Unsupervised learning (A) does not use labels. Reinforcement learning (B) uses reward signals, not labeled examples. Self-supervised learning (D) generates its own labels from the data structure but is not the classic definition of labeled-data-driven learning.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Supervised learning uses labeled data to train models that can make predictions on new, unseen data."

---

## Q2
**Answer: B**

**Explanation:** In reinforcement learning, an agent interacts with an environment and receives a reward signal (positive or negative) that indicates how good or bad the taken action was. This reward guides the agent toward learning optimal behavior. A loss function over labeled examples (A) describes supervised learning. A distance metric between centroids (C) relates to clustering. A reconstruction error from an autoencoder (D) relates to unsupervised representation learning.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Reinforcement learning is a type of machine learning where an agent learns to make decisions by receiving rewards or penalties from its environment."

---

## Q3
**Answer: C**

**Explanation:** The task involves predicting a known binary outcome (default yes/no) using historical data with labeled outcomes — this is the textbook definition of supervised learning. Unsupervised learning (A) has no labels. Reinforcement learning (B) involves sequential decision-making with rewards, not static labeled datasets. Association rule mining (D) discovers co-occurrence patterns, not binary predictions.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q4
**Answer: B**

**Explanation:** The defining distinction of unsupervised learning is that it finds hidden structures, patterns, or groupings in data without the guidance of predefined labels. Option A is incorrect — computational cost depends on the algorithm, not the paradigm. Option C is incorrect — accuracy comparisons depend on the task. Option D describes reinforcement learning, not unsupervised learning.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Unsupervised learning discovers hidden patterns and structures in data without using labeled examples."

---

## Q5
**Answer: C**

**Explanation:** The system must learn through interaction with an environment (users clicking or not clicking ads), optimize a long-term objective (maximize click-through rates over time), and make sequential decisions — all hallmarks of reinforcement learning. Supervised classification (A) requires labeled training data, not real-time interaction. Unsupervised clustering (B) finds groupings, not sequential optimization policies. Linear regression (D) predicts continuous values from static features.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Reinforcement learning is a type of machine learning where an agent learns to make decisions by receiving rewards or penalties from its environment."

---

## Q6
**Answer: A, D**

**Explanation:** Supervised learning is characterized by (A) training data that includes input features paired with target labels, and (D) the goal of learning a mapping function from inputs to known outputs. Option B describes unsupervised learning. Option C describes reinforcement learning. Option E describes unsupervised learning where the output variable is unknown.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q7
**Answer: C**

**Explanation:** Predicting a continuous numeric value (house prices) from input features is a regression problem. Linear regression specifically models the relationship between inputs and a continuous target. Binary classification (A) and multi-class classification (B) predict categorical labels. Clustering (D) is unsupervised and does not predict continuous target values.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/ml-functions/regression)

**Quote:** "Regression is a type of supervised machine learning for predicting continuous numeric values."

---

## Q8
**Answer: C**

**Explanation:** Predicting future dollar amounts of sales using historical time-indexed data with seasonal patterns is time-series forecasting. Binary classification (A) predicts categorical outcomes with two classes. Clustering (B) is unsupervised grouping. Image segmentation (D) is for pixel-level labeling of images. The temporal ordering and seasonality make this distinctly a time-series problem rather than generic regression.

**Source:** [Snowflake ML Forecasting](https://docs.snowflake.com/en/user-guide/ml-functions/forecasting)

**Quote:** "Forecasting is a type of supervised machine learning for predicting future numeric values based on historical time-series data."

---

## Q9
**Answer: C**

**Explanation:** Binary classification assigns observations to exactly one of two possible categories (e.g., yes/no, spam/not spam, positive/negative). Linear regression (A) predicts continuous values. Multi-class classification (B) involves three or more categories. Clustering (D) is unsupervised and does not use predefined categories.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q10
**Answer: B**

**Explanation:** Classifying images into one of five diagnostic categories is multi-class classification — the model must assign each image to exactly one of more than two categories. Binary classification (A) only handles two classes. Linear regression (C) predicts continuous values. Clustering (D) is unsupervised and does not use predefined labels.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q11
**Answer: B**

**Explanation:** Image segmentation assigns a class label to each individual pixel or region within an image, enabling fine-grained understanding of the image content. Image classification (A) assigns only a single label to the entire image. Dimensionality reduction (C) is a separate technique. Grouping similar images without labels (D) describes unsupervised clustering.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Image segmentation labels each pixel or region within an image with a class, providing detailed spatial understanding beyond whole-image classification."

---

## Q12
**Answer: C**

**Explanation:** Identifying and outlining exact boundaries of defective regions at the pixel level requires image segmentation, which assigns a class label to each pixel. Image classification (A) would only label the entire image as defective or not. Binary classification (B) provides a single yes/no label. Clustering (D) is unsupervised and does not produce pixel-level boundaries.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Image segmentation labels each pixel or region within an image with a class, providing detailed spatial understanding beyond whole-image classification."

---

## Q13
**Answer: D**

**Explanation:** Clustering is the unsupervised learning technique that groups data points into distinct sets based on similarity without predefined labels. Linear regression (A) is supervised and predicts continuous values. Binary classification (B) is supervised and requires labels. Time-series forecasting (C) is supervised and predicts future values from temporal data.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Clustering groups similar data points together without requiring labeled training data."

---

## Q14
**Answer: C**

**Explanation:** With no predefined categories and the goal of discovering natural groupings, this is a clustering problem — an unsupervised approach. Binary classification (A) and linear regression (B) require labeled data. Time-series forecasting (D) requires temporal data and predicts future values, which is not the goal here.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Clustering groups similar data points together without requiring labeled training data."

---

## Q15
**Answer: B**

**Explanation:** Association models discover co-occurrence patterns and relationships between items in datasets (e.g., market basket analysis discovering that customers who buy bread also buy butter). Classifying images (A) is image classification. Predicting continuous values (C) is regression. Pixel-level segmentation (D) is image segmentation.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Association models discover co-occurrence patterns and relationships between items in datasets, commonly used in market basket analysis."

---

## Q16
**Answer: B, D**

**Explanation:** Binary classification (B) and time-series forecasting (D) are both supervised learning techniques commonly applied to structured/tabular data. Clustering (A) is unsupervised. Image segmentation (C) is applied to unstructured image data. Association rule mining (E) is an unsupervised technique.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Snowflake provides built-in ML functions for supervised learning tasks on structured data, including classification, regression, and forecasting."

---

## Q17
**Answer: C**

**Explanation:** Predicting future quarterly revenue using historical time-indexed data with seasonal indicators is time-series forecasting. Binary classification (A) predicts two-class outcomes. Linear regression on cross-sectional data (B) does not account for temporal ordering and seasonality. Clustering (D) is unsupervised grouping.

**Source:** [Snowflake ML Forecasting](https://docs.snowflake.com/en/user-guide/ml-functions/forecasting)

**Quote:** "Forecasting is a type of supervised machine learning for predicting future numeric values based on historical time-series data."

---

## Q18
**Answer: C**

**Explanation:** Linear regression predicts a continuous dependent variable as a linear function of one or more independent variables. Multi-class classification (A) predicts categorical labels. Clustering (B) is unsupervised. Image classification (D) assigns labels to images, not continuous values.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/ml-functions/regression)

**Quote:** "Regression is a type of supervised machine learning for predicting continuous numeric values."

---

## Q19
**Answer: B**

**Explanation:** Assigning a single categorical label ("threat detected" or "no threat") to an entire image is image classification. Image segmentation (A) would label each pixel, not the entire frame. Linear regression (C) predicts continuous values. Clustering (D) is unsupervised and doesn't use predefined labels.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Image classification assigns a single categorical label to an entire image based on its content."

---

## Q20
**Answer: B**

**Explanation:** The correct ML lifecycle ordering is: Data collection → Data visualization and exploration → Feature engineering → Training → Deployment → Monitoring. Option A skips data exploration and puts feature engineering before data collection. Option C puts training before data collection and feature engineering. Option D omits the data visualization and exploration phase and places training before feature engineering.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The machine learning lifecycle includes data collection, exploration, feature engineering, model training, deployment, and ongoing monitoring."

---

## Q21
**Answer: C**

**Explanation:** After data collection, the next logical step is data visualization and exploration to understand patterns, distributions, and data quality issues before engineering features or training models. Model deployment (A) occurs much later. Feature engineering (B) should follow exploration. Model monitoring (D) occurs after deployment.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Data exploration and visualization help data scientists understand patterns, distributions, and potential data quality issues before feature engineering and model training."

---

## Q22
**Answer: B**

**Explanation:** Feature engineering transforms raw data into meaningful input variables (features) that improve model performance. Deploying models (A) is a separate lifecycle phase. Evaluating accuracy with confusion matrices (C) is part of model evaluation. Collecting additional data (D) is part of the data collection phase.

**Source:** [Snowflake Feature Store](https://docs.snowflake.com/en/developer-guide/snowpark-ml/feature-store/overview)

**Quote:** "Feature engineering transforms raw data into meaningful features that improve model quality and predictive performance."

---

## Q23
**Answer: C**

**Explanation:** After training and validation with satisfactory metrics, the next phase is model deployment — making the model available to generate predictions on new data in production. Feature engineering (A) and data visualization (B) occur before training. Data collection (D) is the first phase.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Once a model is trained and validated, it can be deployed to generate predictions on new data."

---

## Q24
**Answer: C**

**Explanation:** Model versioning involves tracking different iterations of trained models to ensure reproducibility and enable rollback. Data collection (A) is about gathering data. Feature engineering (B) is about transforming data into features. Data visualization (D) is about exploring data distributions.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry allows you to manage model versions, enabling reproducibility and rollback to previous model iterations."

---

## Q25
**Answer: B, D**

**Explanation:** Model monitoring and evaluation includes (B) calculating performance metrics like precision, recall, and accuracy on production predictions, and (D) analyzing model explainability to understand what drives predictions. Collecting raw data (A) is data collection. Creating derived features (C) and encoding categorical variables (E) are feature engineering activities.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Model monitoring tracks prediction performance metrics and provides insight into model behavior in production."

---

## Q26
**Answer: C**

**Explanation:** In a confusion matrix, the cell where the model predicts positive but the actual label is negative is a False Positive (also called a Type I error). True Positive (A) is when both prediction and actual are positive. True Negative (B) is when both are negative. False Negative (D) is when the prediction is negative but actual is positive.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "A confusion matrix displays the counts of true positives, true negatives, false positives, and false negatives for a classifier's predictions."

---

## Q27
**Answer: B**

**Explanation:** When the cost of missing a true positive (failing to diagnose a disease) is very high, recall should be prioritized. Recall measures the proportion of actual positives correctly identified (TP / (TP + FN)), minimizing false negatives. Precision (A) minimizes false positives, which is less critical here. Accuracy (C) can be misleading with rare diseases. Specificity (D) focuses on correctly identifying negatives.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Recall measures the fraction of actual positive cases that the model correctly identified."

---

## Q28
**Answer: C**

**Explanation:** Precision measures the proportion of positive predictions that were actually correct: TP / (TP + FP). Recall (A) measures the proportion of actual positives correctly identified. Accuracy (B) measures overall correctness across all classes. F1 score (D) is the harmonic mean of precision and recall.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Precision measures the fraction of positive predictions that are actually positive."

---

## Q29
**Answer: B**

**Explanation:** Recall = TP / (TP + FN). The model correctly identifies 180 spam emails (TP = 180) out of 200 actual spam emails (TP + FN = 200). Recall = 180 / 200 = 0.90. Option A (0.78) might confuse precision into the calculation. Option C (0.50) and D (0.72) are incorrect calculations.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Recall measures the fraction of actual positive cases that the model correctly identified."

---

## Q30
**Answer: B**

**Explanation:** On imbalanced datasets, a model that always predicts the majority class can achieve high accuracy while completely failing to detect the minority class. For example, if 95% of samples are negative, always predicting negative yields 95% accuracy but 0% recall on the positive class. Option A is wrong — accuracy can be computed for multi-class. Option C is wrong — accuracy does not require continuous targets. Option D is wrong — accuracy is valid on test data.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Accuracy alone can be misleading for imbalanced datasets where the majority class dominates predictions."

---

## Q31
**Answer: B, D**

**Explanation:** Precision (B) = TP / (TP + FP) and Recall (D) = TP / (TP + FN) are both directly computed from values in the confusion matrix. R-squared (A) is a regression metric. RMSE (C) and MAE (E) are also regression metrics that require continuous predicted and actual values, not confusion matrix cells.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "A confusion matrix displays the counts of true positives, true negatives, false positives, and false negatives for a classifier's predictions."

---

## Q32
**Answer: B**

**Explanation:** Model explainability addresses the need to understand why a model makes specific predictions — which features are important and how they influence outcomes. Feature engineering (A) is about creating input variables. Data collection (C) is about gathering data. Model versioning (D) is about tracking model iterations.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Model explainability provides insight into which features drive predictions and how the model makes decisions."

---

## Q33
**Answer: B**

**Explanation:** Model explainability provides insight into which features drive individual predictions and how the model reasons — information that raw prediction outputs (e.g., a probability score) do not convey. Higher accuracy (A) is about model performance, not explainability. Faster inference (C) is about computational efficiency. Automatic retraining (D) is about MLOps automation.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Model explainability provides insight into which features drive predictions and how the model makes decisions."

---

## Q34
**Answer: B**

**Explanation:** Comparing three model versions (model versioning) and evaluating them on a holdout set (model evaluation) are both being applied. Data collection and visualization (A) are not the focus. Feature engineering and deployment (C) — the models are already trained and not yet deployed. Data exploration and monitoring (D) — the models are being selected, not yet in production.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry allows you to manage model versions, enabling reproducibility and rollback to previous model iterations."

---

## Q35
**Answer: B**

**Explanation:** In a perfectly normal distribution, the mean, median, and mode are all equal and located at the center of the symmetric bell curve. Option A and C are incorrect because neither is consistently greater or less in a normal distribution. Option D is incorrect because all three measures coincide, not just two.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "In a normal distribution, the mean, median, and mode are all equal, producing a symmetric bell-shaped curve."

---

## Q36
**Answer: B**

**Explanation:** Extreme outliers pull the mean toward themselves because the mean accounts for every value, while the median (the middle value when sorted) remains relatively stable since it only depends on the rank order of values. Option A is the reverse of the truth. Option C is incorrect because the effects are not equal. Option D is incorrect because outliers do affect the mean.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The mean is sensitive to extreme values (outliers), while the median is more robust to outliers as a measure of central tendency."

---

## Q37
**Answer: C**

**Explanation:** A distribution with a long right tail, a few extremely large values, and a mean substantially higher than the median is right-skewed (positively skewed). A normal distribution (A) is symmetric with equal mean and median. A left-skewed distribution (B) has a long left tail with mean less than median. A uniform distribution (D) has no tail asymmetry.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "In a positively skewed distribution, the tail extends to the right, and the mean is greater than the median."

---

## Q38
**Answer: B**

**Explanation:** The Central Limit Theorem states that as the sample size increases, the distribution of sample means approaches a normal distribution regardless of the shape of the population distribution. Option A is wrong — the sample mean is an estimate of the population mean, not always equal. Option C is wrong — variance of the sample mean decreases with larger samples. Option D is wrong — the CLT works for non-normal populations.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The Central Limit Theorem states that the sampling distribution of the sample mean approaches a normal distribution as the sample size increases, regardless of the population distribution."

---

## Q39
**Answer: C**

**Explanation:** By the Central Limit Theorem, the distribution of sample means from repeated sampling approaches a normal distribution as sample size increases, regardless of the population's shape. With n=50, this is sufficient for the CLT to apply even with a highly skewed population. The sample means will not mirror the skewed shape (A), form a uniform distribution (B), or be bimodal (D).

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The Central Limit Theorem states that the sampling distribution of the sample mean approaches a normal distribution as the sample size increases, regardless of the population distribution."

---

## Q40
**Answer: B, C**

**Explanation:** The CLT correctly states that (B) the sampling distribution of the mean approaches normality as sample size increases, and (C) the standard error of the sample mean decreases as sample size increases (SE = σ/√n). Option A is wrong — the CLT works for any population distribution. Option D is wrong — the CLT applies to both continuous and discrete variables. Option E is wrong — the CLT applies to sample means, not individual observations.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The Central Limit Theorem states that the sampling distribution of the sample mean approaches a normal distribution as the sample size increases, regardless of the population distribution."

---

## Q41
**Answer: B**

**Explanation:** A Z-test is appropriate when the population variance is known and the sample size is large. When the population variance is unknown and the sample is small (A), a T-test should be used instead. Categorical data (C) requires chi-squared or other categorical tests. Comparing three or more group means (D) calls for ANOVA.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The Z-test is used when the population standard deviation is known and sample sizes are sufficiently large for the normal approximation to hold."

---

## Q42
**Answer: B**

**Explanation:** With a small sample (n=15), unknown population standard deviation, and normal population, the T-test is the appropriate choice. The Z-test (A) requires a known population standard deviation. The chi-squared test (C) is for categorical data or variance testing. ANOVA (D) is for comparing three or more group means.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The T-test is used when the population standard deviation is unknown and must be estimated from the sample, particularly with small sample sizes."

---

## Q43
**Answer: B**

**Explanation:** The T-distribution has heavier (fatter) tails than the Z-distribution (standard normal), especially with small degrees of freedom. This accounts for the additional uncertainty from estimating the population standard deviation from the sample. Option A is the reverse. Option C is incorrect — the Z-distribution is used for continuous data. Option D is incorrect — the T-distribution converges to the standard normal (Z), not a uniform distribution.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The T-distribution has heavier tails than the standard normal distribution, accounting for additional uncertainty when the population standard deviation is estimated from the sample."

---

## Q44
**Answer: B**

**Explanation:** With two independent groups (control and treatment), a known population standard deviation, and large sample sizes (500 each), a two-sample Z-test is appropriate. A paired T-test (A) is for dependent/paired samples. A chi-squared test (C) is for categorical data. The Mann-Whitney U test (D) is a non-parametric alternative when normality cannot be assumed.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The Z-test is used when the population standard deviation is known and sample sizes are sufficiently large for the normal approximation to hold."

---

## Q45
**Answer: B**

**Explanation:** Statistical bootstrapping is a resampling technique that draws repeated samples with replacement from an observed dataset to estimate the sampling distribution of a statistic. It does not require the population distribution to be known (A). It is not dimensionality reduction (C). It is not a missing value imputation method (D).

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Bootstrapping is a resampling technique that draws repeated samples with replacement from the observed data to estimate the sampling distribution of a statistic."

---

## Q46
**Answer: B**

**Explanation:** Bootstrapping is ideal when the distribution is unknown and non-normal, especially for statistics like the median where analytical confidence interval formulas are complex. The Z-distribution (A) assumes normality and is for means with known variance. A T-test (C) tests means, not medians, and assumes approximate normality. PCA (D) is for dimensionality reduction, not confidence interval estimation.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Bootstrapping is a resampling technique that draws repeated samples with replacement from the observed data to estimate the sampling distribution of a statistic."

---

## Q47
**Answer: B, C**

**Explanation:** Bootstrapping (B) samples with replacement from the original dataset and (C) can estimate the variability of almost any statistic without strong distributional assumptions. Option A is incorrect — bootstrapping samples with replacement, not without. Option D is incorrect — bootstrapping does not require normality. Option E is incorrect — bootstrapping produces empirical (approximate) confidence intervals, not exact analytical ones.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Bootstrapping is a resampling technique that draws repeated samples with replacement from the observed data to estimate the sampling distribution of a statistic."

---

## Q48
**Answer: B**

**Explanation:** A 95% confidence interval means that if the sampling process were repeated many times, approximately 95% of the constructed intervals would contain the true population parameter. Option A is a common misconception — the probability statement applies to the procedure, not to a specific interval. Option C confuses data coverage with parameter coverage. Option D conflates model accuracy with statistical inference.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "A 95% confidence interval means that if the sampling and estimation process were repeated many times, approximately 95% of the resulting intervals would contain the true population parameter."

---

## Q49
**Answer: B**

**Explanation:** A 99% confidence interval is wider than a 95% interval computed from the same data because higher confidence requires a larger range to increase the probability of capturing the true parameter. Option A is reversed. Option C is incorrect because different confidence levels produce different widths. Option D is incorrect — the confidence level directly determines width, independent of sample size considerations.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Higher confidence levels produce wider intervals because a larger range is needed to be more certain of capturing the true population parameter."

---

## Q50
**Answer: B**

**Explanation:** As sample size increases, the standard error decreases (SE = σ/√n), which narrows the confidence interval. Larger samples provide more information about the population, reducing uncertainty. The interval does not become wider (A), stay unchanged (C), or oscillate (D).

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "As sample size increases, the standard error decreases, resulting in a narrower confidence interval."

---

## Q51
**Answer: A, C**

**Explanation:** The width of a confidence interval is directly affected by (A) the chosen confidence level — higher confidence produces wider intervals — and (C) the sample size — larger samples produce narrower intervals. The color scheme (B), file format (D), and table name (E) have no statistical relevance to interval width.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The width of a confidence interval depends on the confidence level, sample size, and variability of the data."

---

## Q52
**Answer: C**

**Explanation:** Predicting which customers will churn (leave) vs. stay is a binary classification problem — two possible outcomes. Linear regression (A) predicts continuous values. Multi-class classification (B) involves three or more categories. Clustering (D) is unsupervised.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q53
**Answer: B**

**Explanation:** In a positively skewed distribution, the tail extends to the right, pulling the mean in that direction. The typical ordering is Mode < Median < Mean. Option A describes negative skew. Option C describes a normal (symmetric) distribution. Option D has an incorrect ordering.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "In a positively skewed distribution, the tail extends to the right, and the mean is greater than the median, which is greater than the mode."

---

## Q54
**Answer: B**

**Explanation:** Classifying images into one of ten digit categories (0-9) is multi-class classification — more than two categories where each image receives exactly one label. Binary classification (A) handles only two classes. Linear regression (C) predicts continuous values. Image segmentation (D) labels individual pixels rather than assigning a whole-image label.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q55
**Answer: B**

**Explanation:** Data visualization and exploration is the phase focused on understanding data distributions, identifying correlations, and detecting anomalies before model training. Model deployment (A) is about putting models into production. Model monitoring (C) is about tracking deployed model performance. Model versioning (D) is about tracking model iterations.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Data exploration and visualization help data scientists understand patterns, distributions, and potential data quality issues before feature engineering and model training."

---

## Q56
**Answer: C**

**Explanation:** A drop in model performance after deployment due to changing data characteristics (data drift) is addressed by model monitoring and evaluation. This phase tracks model performance over time and detects degradation. Data collection (A) is about gathering data. Feature engineering (B) is about creating features. Data visualization (D) is pre-training exploration.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Model monitoring tracks prediction performance metrics and provides insight into model behavior in production."

---

## Q57
**Answer: C, D**

**Explanation:** Clustering (C) is an unsupervised learning technique, and association models (D) are also unsupervised, discovering co-occurrence patterns without labels. Linear regression (A) is supervised. Binary classification (B) is supervised. Time-series forecasting (E) is supervised.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Unsupervised learning discovers hidden patterns and structures in data without using labeled examples, including clustering and association analysis."

---

## Q58
**Answer: B**

**Explanation:** Reinforcement learning receives delayed reward signals from the environment rather than immediate ground-truth labels for each input, which is how supervised learning works. Option A describes supervised learning. Option C is incorrect — RL does have a feedback mechanism (rewards). Option D describes a supervised setup with clusters, not RL.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Reinforcement learning is a type of machine learning where an agent learns to make decisions by receiving rewards or penalties from its environment."

---

## Q59
**Answer: C**

**Explanation:** Forecasting daily package volumes from historical data with seasonality and trend is time-series forecasting. Binary classification (A) predicts categorical two-class outcomes. Clustering (B) is unsupervised grouping. Image classification (D) operates on image data, not temporal numeric data.

**Source:** [Snowflake ML Forecasting](https://docs.snowflake.com/en/user-guide/ml-functions/forecasting)

**Quote:** "Forecasting is a type of supervised machine learning for predicting future numeric values based on historical time-series data."

---

## Q60
**Answer: D**

**Explanation:** When the model predicts negative and the actual label is also negative, this is a True Negative — a correct rejection. True Positive (A) is when both prediction and actual are positive. False Positive (B) is predicted positive but actual negative. False Negative (C) is predicted negative but actual positive.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "A confusion matrix displays the counts of true positives, true negatives, false positives, and false negatives for a classifier's predictions."

---

## Q61
**Answer: C**

**Explanation:** When missing a truly inappropriate image (false negative) carries much larger risk than incorrectly flagging a safe image (false positive), recall should be maximized. Recall = TP / (TP + FN) directly minimizes false negatives. Precision (A) minimizes false positives. Specificity (B) measures true negative rate. Accuracy (D) can be misleading with class imbalance.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Recall measures the fraction of actual positive cases that the model correctly identified."

---

## Q62
**Answer: C**

**Explanation:** Accuracy = (True Positives + True Negatives) / Total Predictions. It measures the overall proportion of correct predictions. Option A is the formula for precision. Option B is the formula for recall. Option D is the formula for false positive rate.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Accuracy measures the overall fraction of predictions that the model got correct."

---

## Q63
**Answer: A, C**

**Explanation:** In a left-skewed distribution (A), the tail extends to the left, pulling the mean below the median. Outliers on the right side (C) pull the mean rightward, creating positive (right) skew. Option B is reversed — in right-skewed distributions, the mean is greater than the median. Option D is incorrect — a normal distribution has zero skew. Option E is incorrect — mean and median differ in skewed distributions.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "In a negatively skewed distribution, the tail extends to the left and the mean is less than the median. In a positively skewed distribution, the tail extends to the right and the mean is greater than the median."

---

## Q64
**Answer: B**

**Explanation:** Classifying emails into four categories (spam, promotions, social, primary) is multi-class classification — more than two mutually exclusive categories. Binary classification (A) handles only two classes. Linear regression (C) predicts continuous values. Clustering (D) is unsupervised and does not use predefined categories.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Classification is a type of supervised machine learning that assigns input data to one of several predefined categories based on labeled training data."

---

## Q65
**Answer: C**

**Explanation:** Model versioning tracks different iterations of trained models, enabling rollback to a previous version if a newer one underperforms. Feature engineering (A) creates input features. Data exploration (B) examines data characteristics. Data collection (D) gathers data from sources.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry allows you to manage model versions, enabling reproducibility and rollback to previous model iterations."

---

## Q66
**Answer: C**

**Explanation:** Bootstrapping provides a practical alternative for estimating the standard error of complex statistics (like correlation coefficients) when analytical formulas are complex and normality assumptions may not hold. The Z-test (A) and T-test (B) test hypotheses about means, not correlation standard errors. PCA (D) is for dimensionality reduction.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Bootstrapping is a resampling technique that draws repeated samples with replacement from the observed data to estimate the sampling distribution of a statistic."

---

## Q67
**Answer: C**

**Explanation:** As the degrees of freedom increase toward infinity, the T-distribution converges to the standard normal (Z) distribution. This is because with larger samples, the estimate of the population standard deviation becomes precise enough that the extra uncertainty captured by the T-distribution's heavier tails becomes negligible. It does not converge to a uniform (A), chi-squared (B), or exponential (D) distribution.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The T-distribution converges to the standard normal distribution as degrees of freedom increase."

---

## Q68
**Answer: C**

**Explanation:** The correct frequentist interpretation is that if the study were repeated many times, about 95% of such intervals would contain the true mean. Option A is the common Bayesian-sounding misconception — the true mean either is or isn't in the interval; the probability applies to the method, not a specific interval. Option B confuses data range with parameter coverage. Option D adds an incorrect condition.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "A 95% confidence interval means that if the sampling and estimation process were repeated many times, approximately 95% of the resulting intervals would contain the true population parameter."

---

## Q69
**Answer: B**

**Explanation:** Image classification assigns a single categorical label to an entire image. Image segmentation (A) assigns labels to individual pixels or regions. Linear regression (C) predicts continuous values. Clustering (D) is unsupervised and does not assign predefined labels.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Image classification assigns a single categorical label to an entire image based on its content."

---

## Q70
**Answer: B, D**

**Explanation:** The data collection phase involves (B) gathering data from relevant source systems and databases and (D) ensuring data quality, completeness, and representativeness. Tuning hyperparameters (A) is part of model training. Deploying models (C) occurs after training. Computing metrics (E) is part of model evaluation.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The data collection phase involves gathering data from relevant sources and ensuring data quality, completeness, and representativeness."

---

## Q71
**Answer: C**

**Explanation:** Labeling every pixel in an image with a category (road, vehicle, pedestrian, sky, building) is image segmentation. Image classification (A) assigns a single label to the entire image. Binary classification (B) produces only two categories for the whole image. Linear regression (D) predicts continuous values, not pixel labels.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Image segmentation labels each pixel or region within an image with a class, providing detailed spatial understanding beyond whole-image classification."

---

## Q72
**Answer: B**

**Explanation:** Precision and recall typically involve a trade-off — improving one often reduces the other. Lowering the classification threshold increases recall but decreases precision (more false positives). Raising the threshold increases precision but decreases recall (more false negatives). Option A is incorrect. Option C is incorrect — they are rarely equal. Option D is incorrect — precision applies to classification.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "Precision and recall typically involve a trade-off: improving one often comes at the expense of the other."

---

## Q73
**Answer: C**

**Explanation:** The median is the most robust measure of central tendency for summarizing typical salary when extreme outliers (executive salaries over $500,000) are present. The mean (A) would be pulled upward by the outliers. The mode (B) represents the most frequent value but may not reflect the center well. Standard deviation (D) is a measure of spread, not central tendency.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The mean is sensitive to extreme values (outliers), while the median is more robust to outliers as a measure of central tendency."

---

## Q74
**Answer: C**

**Explanation:** In a negatively skewed (left-skewed) distribution, the tail extends to the left, pulling the mean below the median. Therefore the mean is less than the median. Option A describes positive skew. Option B describes a symmetric distribution. Option D is incorrect — the relationship is well-defined by the direction of skew.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "In a negatively skewed distribution, the tail extends to the left and the mean is less than the median."

---

## Q75
**Answer: B, C**

**Explanation:** The T-test (B) is appropriate when the population standard deviation is unknown and must be estimated from the sample, and (C) the T-distribution has heavier tails than the standard normal for small sample sizes. Option A describes when a Z-test is used, not a T-test. Option D is incorrect — the T-test can compare two group means. Option E is incorrect — no minimum of 500 is required.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The T-test is used when the population standard deviation is unknown and must be estimated from the sample, particularly with small sample sizes."

---

## Q76
**Answer: D**

**Explanation:** Discovering co-occurrence patterns (bread + butter → milk) in transaction data without a labeled target variable is association modeling (market basket analysis). Linear regression (A) predicts continuous values. Binary classification (B) predicts two-class labels. Clustering (C) groups similar items, but doesn't specifically identify co-occurrence rules between items.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Association models discover co-occurrence patterns and relationships between items in datasets, commonly used in market basket analysis."

---

## Q77
**Answer: B**

**Explanation:** A key advantage of bootstrapping is that it does not require assumptions about the underlying population distribution — it works by resampling from the observed data itself. It does not always produce narrower intervals (A). It still requires data (C). It does not guarantee unbiasedness (D).

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "Bootstrapping is a resampling technique that draws repeated samples with replacement from the observed data to estimate the sampling distribution of a statistic."

---

## Q78
**Answer: B**

**Explanation:** In linear regression, a coefficient of -2.5 for temperature means that for each one-unit increase in temperature, the predicted energy consumption decreases by 2.5 units, holding other variables constant. Option A is incorrect — the coefficient shows temperature is relevant. Option C is incorrect — R-squared is a model-level metric, not a coefficient value. Option D is incorrect — the non-zero coefficient indicates a relationship.

**Source:** [Snowflake ML Regression](https://docs.snowflake.com/en/user-guide/ml-functions/regression)

**Quote:** "Regression coefficients indicate the direction and magnitude of the relationship between each predictor variable and the target, holding other variables constant."

---

## Q79
**Answer: C, E**

**Explanation:** Model deployment (C) and model monitoring and evaluation (E) both occur after a model has been trained. Data collection (A), data visualization and exploration (B), and feature engineering (D) all occur before model training.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "Once a model is trained and validated, it can be deployed to generate predictions on new data, and monitored to track ongoing performance."

---

## Q80
**Answer: B**

**Explanation:** A p-value of 0.03 is less than the significance level of 0.05, which means we reject the null hypothesis. This indicates the observed result is statistically significant. Option A incorrectly interprets the sign of the p-value. Option C confuses rejecting and accepting the null. Option D is incorrect — the test provides a definitive decision at the stated significance level.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "When the p-value is less than the chosen significance level, the null hypothesis is rejected, indicating that the observed result is statistically significant."

---

## Q81
**Answer: B**

**Explanation:** With unknown population variance, two independent groups of 25 customers each, a two-sample T-test is the most appropriate choice. A Z-test (A) requires known population variance. A chi-squared test (C) is for categorical data or variance testing. Simple linear regression (D) models a continuous relationship, not group difference testing.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The T-test is used when the population standard deviation is unknown and must be estimated from the sample, particularly with small sample sizes."

---

## Q82
**Answer: C**

**Explanation:** A False Negative occurs when the model incorrectly predicts negative but the actual label is positive — the model missed a positive case. Option A describes a True Positive. Option B describes a False Positive. Option D describes a True Negative.

**Source:** [Snowflake ML Classification](https://docs.snowflake.com/en/user-guide/ml-functions/classification)

**Quote:** "A confusion matrix displays the counts of true positives, true negatives, false positives, and false negatives for a classifier's predictions."

---

## Q83
**Answer: B, D**

**Explanation:** Image classification (B) and image segmentation (D) are both supervised learning problem types applied to unstructured (image) data. Clustering (A) is unsupervised. Linear regression (C) is typically applied to structured data. Time-series forecasting (E) is applied to structured temporal data.

**Source:** [Snowflake Cortex AI Overview](https://docs.snowflake.com/en/guides-overview-ai-features)

**Quote:** "Supervised learning on unstructured data includes image classification and image segmentation tasks."

---

## Q84
**Answer: B**

**Explanation:** Model versioning ensures that exact model parameters, configurations, and artifacts are tracked so the team can reproduce the same model outputs months later. Data visualization (A) is about exploring data. Data collection (C) is about gathering data. Feature encoding (D) is a specific feature engineering technique.

**Source:** [Snowflake Model Registry](https://docs.snowflake.com/en/developer-guide/snowpark-ml/model-registry/overview)

**Quote:** "The Snowflake Model Registry allows you to manage model versions, enabling reproducibility and rollback to previous model iterations."

---

## Q85
**Answer: B**

**Explanation:** The Central Limit Theorem is practically important because it allows the use of normal-distribution-based tests (Z-tests, T-tests) even when the underlying population is not normally distributed, provided the sample size is sufficiently large. Option A is incorrect — the CLT does not make all populations normal. Option C is incorrect — random sampling is still required. Option D is incorrect — larger samples do not necessarily produce smaller p-values.

**Source:** [Snowflake ML Functions Overview](https://docs.snowflake.com/en/guides-overview-ml-functions)

**Quote:** "The Central Limit Theorem allows the use of normal-distribution-based statistical tests even when the underlying population is not normally distributed, provided the sample size is sufficiently large."
