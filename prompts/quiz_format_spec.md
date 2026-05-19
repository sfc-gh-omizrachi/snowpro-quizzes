# Quiz Markdown Format Specification

This document is the canonical reference for the question and answer markdown
format consumed by `parse_questions.py`. Follow it exactly when generating quiz
files for any certification.

---

## File naming

| File | Pattern | Example |
|------|---------|---------|
| Questions | `questions_domain{N}.md` | `questions_domain1.md` |
| Answers | `answers_domain{N}.md` | `answers_domain1.md` |

One pair per domain, placed in `<CERT_CODE>/quiz/`.

---

## questions_domainN.md

### Structure

```
# Domain N: <Domain Name>

---

## Q1 (<type>)
<question text — may span multiple lines>
- A) <option text>
- B) <option text>
- C) <option text>
- D) <option text>

---

## Q2 (<type>)
...
```

- File starts with a `# Domain N: <Name>` heading (optional but conventional).
- Questions are separated by `---` (three dashes on its own line).
- No blank line is required before `---`.
- Options must use uppercase letters starting at A, format `- X) text`.
- Minimum 4 options per question. 5 options (A–E) are allowed.

### Supported type strings

| Type string | selectCount | Notes |
|-------------|-------------|-------|
| `Single Answer` | 1 | Standard single-choice |
| `Multi Answer - Select 2` | 2 | Two correct answers |
| `Multi Answer - Select 3` | 3 | Three correct answers |
| `Multi Answer - Select TWO` | 2 | Word form — also accepted |
| `Multi Answer - Select THREE` | 3 | Word form — also accepted |
| `Multi-Answer: Select TWO` | 2 | Dash-colon variant — also accepted |
| `Scenario` | 1 | Single-answer with scenario context |

**Canonical recommended forms** (use these for new certs):
- `Single Answer`
- `Multi Answer - Select 2`
- `Multi Answer - Select 3`
- `Scenario`

> The parser derives `selectCount` from the digit or word after "Select".
> "TWO" → 2, "THREE" → 3. Any unrecognised word defaults to 1.

### Question type mix

**No official mix percentage is published in any Snowflake study guide or FAQ.**

The only signal comes from the 5 sample questions shown in each study guide:

| Cert | Single Answer | Multi Answer | Notes |
|------|--------------|--------------|-------|
| COF-C02 (sample p.13) | 4/5 (80%) | 1/5 (20%) | 1× Select TWO, 5 options A–E |
| COF-C03 (sample pp.12-13) | 5/5 (100%) | 0/5 (0%) | 4 of 5 are scenario-framed |

**Recommended mix when generating a new bank:**
- ~80% `Single Answer` or `Scenario` — situational framing preferred for COF-C03 style
- ~20% `Multi Answer - Select 2` (use Select 3 sparingly)
- Do **not** invent a Scenario type quota — use `Scenario` whenever the question
  starts with a role/persona/situation; use `Single Answer` for direct factual questions

### Scenario questions

Scenario questions have type `Scenario`. They are single-answer questions with
a business context or situational premise. Example:

```markdown
## Q5 (Scenario)
A data engineer needs to load 10 TB of Parquet files from Amazon S3 into
Snowflake daily without any manual steps. Which feature best meets this need?
- A) COPY INTO with a scheduled task
- B) Snowpipe with auto-ingest
- C) External table with refresh
- D) PUT command via SnowSQL
```

---

## answers_domainN.md

### Structure

```
# Domain N: Answers

---

## Q1
**Answer: B**

**Explanation:** <free text, may span multiple lines>

**Source:** [<link text>](<url>)

**Quote:** "<verbatim text from the source>"

---

## Q2
...
```

- File starts with `# Domain N: Answers` (optional but conventional).
- Blocks separated by `---`.
- All four fields are required for full display in the app.
- Question numbers must match exactly those in `questions_domainN.md`.

### Field rules

| Field | Format | Notes |
|-------|--------|-------|
| `**Answer:**` | Single letter or comma-separated letters | `B` or `B, D` or `A, C, D` |
| `**Explanation:**` | Free text | No length limit; explain why correct and why distractors are wrong |
| `**Source:**` | Markdown link `[text](url)` | Must be a real, working URL |
| `**Quote:**` | `"verbatim text"` in double quotes | Exact quote from the linked source |

### Multi-answer example

```markdown
## Q2
**Answer: B, D**

**Explanation:** The Cloud Services layer handles authentication (B) and
metadata management (D). MPP query execution belongs to the Compute layer;
micro-partition storage belongs to the Storage layer.

**Source:** [Snowflake Key Concepts and Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Quote:** "Cloud services include: Authentication, Infrastructure management,
Metadata management, Query parsing and optimization, Access control."
```

---

## Validation rules (checked by parse_questions.py)

The parser will output a `WARNING` for any question where `correctAnswers` is
empty — meaning the answer block was not found or parsed.

Common causes of parse failures:
- `**Answer:**` line is missing or misspelled
- The `## QN` header number in the answers file doesn't match the questions file
- Separator `---` is missing between blocks
- Source field is not a Markdown link (plain URL without `[text](url)` is silently accepted but `source` will be the raw URL with no display text)

After running `python3 app/parse_questions.py --cert <cert_id>`, verify:
```
Total: 500 questions    ← must match expected total
                        ← no lines starting with WARNING: (absent = all clear)
```

---

## Complete single-domain example

### questions_domain3.md

```markdown
# Domain 3: Performance and Cost Optimization

---

## Q1 (Single Answer)
Which Snowflake feature automatically suspends a virtual warehouse after a
configurable period of inactivity?
- A) Resource Monitor
- B) Auto-Resume
- C) Auto-Suspend
- D) Query Acceleration Service

---

## Q2 (Multi Answer - Select 2)
Which TWO actions reduce credit consumption for a virtual warehouse?
- A) Increasing warehouse size
- B) Enabling Auto-Suspend with a short timeout
- C) Using result set caching
- D) Disabling query pruning

---

## Q3 (Scenario)
A BI team runs 200 concurrent dashboard queries every morning, causing queue
delays. Warehouse size is already XL. What is the BEST next step?
- A) Increase warehouse to 4XL
- B) Create a second warehouse and load-balance with Snowflake client drivers
- C) Enable multi-cluster warehouse with auto-scale
- D) Switch to a Snowpark-optimized warehouse
```

### answers_domain3.md

```markdown
# Domain 3: Answers

---

## Q1
**Answer: C**

**Explanation:** Auto-Suspend automatically suspends a warehouse after it has
been idle for the configured number of seconds, stopping credit consumption.
Auto-Resume restarts it on the next query.

**Source:** [Virtual Warehouse Auto-Suspension and Auto-Resumption](https://docs.snowflake.com/en/user-guide/warehouses-considerations#automating-warehouse-management)

**Quote:** "Snowflake supports automatically suspending a virtual warehouse when
there is no activity. Snowflake also supports automatically resuming a suspended
warehouse when a new query is submitted."

---

## Q2
**Answer: B, C**

**Explanation:** Short auto-suspend timeout means the warehouse idles less,
saving credits. Result set caching serves repeated queries without compute.
Increasing warehouse size and disabling pruning both increase cost.

**Source:** [Working with Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-tasks)

**Quote:** "If a warehouse is suspended, no credits are consumed. Credits are
only consumed while a warehouse is running."

---

## Q3
**Answer: C**

**Explanation:** Multi-cluster warehouses handle concurrency by spinning up
additional clusters automatically during peak load. This is the correct solution
for concurrent query queuing, not raw size increase.

**Source:** [Multi-Cluster Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-multicluster)

**Quote:** "Multi-cluster warehouses are designed specifically for handling
queuing and performance issues related to large numbers of concurrent users
and/or queries."
```
