You are adding a new Snowflake certification to this quiz app.

1. List every file in @<CERT_CODE>/materials/ and read each one in full.
   Do not skip any file — each may contain unique information.
   For each file, extract and record:

   From study guides / exam blueprints:
   - Cert code, full name, exam duration, number of questions, pass threshold
   - Number of domains, domain names, domain weights (% of exam)
   - Sub-topics or bullet-point objectives listed under each domain
   - Any features, services, or concepts explicitly called out as in-scope
   - Any topics explicitly marked as out-of-scope or excluded
   - Sample questions (record each fully — text, options, correct answer)
   - Any "what this exam does NOT cover" or similar scope-limiting statements

   From FAQ / overview documents:
   - Any differences from a previous exam version (version changes, new topics)
   - Exam delivery details (time limit, question count, scoring method)
   - Any retake or eligibility policies relevant to the cert

   From any other file type:
   - Extract all information that could influence question content, difficulty,
     or topic coverage. If a file adds nothing new, note that explicitly.

   After reading all files, flag any contradictions between them
   (e.g. different question counts or pass thresholds across documents).
   If contradictions exist, prefer the most recently dated document.

2. Check additional_links.md for the link for certification page.
   Extract all exam details from the official page.
   Cross-check against the materials and flag any discrepancies.

   IMPORTANT — tool choice for web scraping:
   Certification pages use JavaScript-rendered tabs (About, Exam Details,
   Additional Information). `web_fetch` only retrieves the initial HTML and
   will MISS content in inactive tabs. You MUST use `cortex browser` instead:
     cortex browser open <url>
     cortex browser snapshot                  # capture visible tab
     cortex browser click <Exam Details ref>  # switch to Exam Details tab
     cortex browser snapshot                  # capture exam format data
   Extract from the "Exam Details" tab: exam version, total questions,
   question types, time limit, passing score, prerequisites, and delivery
   options. If `cortex browser` is unavailable, fall back to `web_fetch`
   but explicitly flag that tab content may be missing and ask the user to
   provide exam details manually.

   In any case, always ask user for confiration of the exam details
   before proceeding.
   

3. Collect (resolving any contradictions using the rule above):
   - Cert code (e.g. COF-XYZ) and full certification name
   - Pass threshold (percentage score required to pass)
   - Exam duration (minutes) and number of questions on the real exam
   - Number of domains, domain names, and domain weights (% of exam)
   - Weights must sum to 100%. If the official source shows ranges, use midpoints.

4. Save a topic coverage summary to <CERT_CODE>/build/materials_summary.md.
   This file will be used by the question generator in the next step.
   Format:
   ```
   # <CERT_CODE> Materials Summary

   ## Exam Overview
   Questions: N  |  Duration: N min  |  Pass: N%

   ## Domain Topics

   ### Domain 1 — <Name> (XX%)
   Key topics from materials:
   - <topic>
   - <topic>
   ...
   Explicitly in-scope: <list if stated>
   Explicitly out-of-scope: <list if stated>

   ### Domain 2 — <Name> (XX%)
   ...

   ## Sample Questions Analysis
   Total samples: N
   | # | Type          | Domain | Summary |
   |---|---------------|--------|---------|
   | 1 | Single Answer |   D1   | ...     |
   ...

   ## Notes
   - <Any contradictions found and how they were resolved>
   - <Any scope clarifications from FAQ or other docs>
   ```

5. Analyse the sample questions section of the study guide (usually the last 1–2 pages).
   For every sample question, record its type: Single Answer, Multi Answer, or Scenario.
   A question is Scenario if it opens with a role/persona/situation ("A data engineer needs
   to...", "A company is...", etc.) even if it only has one correct answer.
   Count each type and compute the percentage from the total sample set.
   This becomes the recommended mix for Prompt 2.

6. Calculate exact question counts for a <QUESTION_COUNT>-question bank:
   count_i = round(weight_i × <QUESTION_COUNT>)
   If the total does not equal <QUESTION_COUNT>, adjust the largest domain by ±1.

7. Derive app identifiers:
   - cert_id: lowercase cert code with hyphens (e.g. cof-xyz)
   - storage_key: snowpro_<cert_id_with_underscores>_sessions
     (replace hyphens with underscores: cof-xyz → snowpro_cof_xyz_sessions)
   - pass_threshold: as decimal (e.g. 75% → 0.75)

8. Present a confirmation table before doing anything else:

   Cert code:    COF-XYZ
   Cert name:    SnowPro ...
   cert_id:      cof-xyz
   storage_key:  snowpro_cof_xyz_sessions
   Pass:         0.75
   Duration:     NNN min

   | Domain | Name | Weight | Questions |
   |--------|------|--------|-----------|
   | 1      | ...  |  XX%   |    NNN    |
   ...
   | TOTAL  |      | 100%   | <QUESTION_COUNT> |

   Sample question type mix (from study guide):
   | Type          | Count | % of samples |
   |---------------|-------|--------------|
   | Single Answer |   N   |     XX%      |
   | Scenario      |   N   |     XX%      |
   | Multi Answer  |   N   |     XX%      |
   | TOTAL         |   N   |    100%      |

   → Recommended mix for generation: XX% Single/Scenario, XX% Multi Answer

Do NOT generate any files yet. Wait for explicit confirmation.
