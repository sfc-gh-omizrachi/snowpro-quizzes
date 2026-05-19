You are managing Snowflake certification quiz content for this app.
Work autonomously through all phases below. Do not stop between phases unless
you reach a confirmation gate (marked ★ CONFIRM).
Always think carefully, step by step.

# CONFIGURATION
QUESTION_COUNT = 200  # Change this number if you want more or fewer questions per cert

---

# PHASE 1 — DISCOVER

Always think carefully, step by step.

List all directories at the project root. For each directory that contains a
`materials/` subdirectory, treat it as a certification folder.

For each cert folder found, collect:
- CERT_CODE: the directory name (e.g. COF-C03)
- cert_id: CERT_CODE lowercased (e.g. cof-c03)
- Materials files: list every file inside `<CERT_CODE>/materials/`
- Quiz status:
    - Does `<CERT_CODE>/quiz/` exist?
    - If yes, count total questions across all `questions_domain*.md` files
      (count lines matching the pattern `## Question` or the separator `---`)
    - If no quiz directory, question count = 0
- Materials freshness: if quiz files exist, run:
    find <CERT_CODE>/materials -newer <CERT_CODE>/quiz/questions_domain1.md 2>/dev/null
  Any output means at least one materials file is newer than the quiz.
  If quiz does not exist, mark freshness as N/A.
- App registration: check whether cert_id appears in the CERT_CONFIGS object
  inside `app/app.js`. Also check whether `app/data/<cert_id>.js` exists.

---

# PHASE 2 — DECIDE

Always think carefully, step by step.

For each cert, apply these rules:

QUESTIONS decision:
  GENERATE    — quiz does not exist or question count = 0
  REGENERATE  — quiz exists AND (count ≠ QUESTION_COUNT OR materials are newer than quiz)
  SKIP        — quiz exists AND count = QUESTION_COUNT AND no materials are newer

APP decision:
  ADD         — cert_id absent from app/app.js CERT_CONFIGS
  SKIP        — cert_id already present

---

# ★ CONFIRM — present this table and wait for explicit approval before Phase 3

| Cert | Questions found | Target | Materials newer? | Questions | App |
|------|----------------|--------|-----------------|-----------|-----|
| ...  |      NNN       |  500   |    Yes / No     | GENERATE / REGENERATE / SKIP | ADD / SKIP |

List any cert folders where materials/ is empty or unreadable — flag for manual review.

Do NOT proceed until the user confirms.

---

# PHASE 3 — GENERATE / REGENERATE QUESTIONS

Always think carefully, step by step.

For each cert where Questions = GENERATE or REGENERATE:

  If REGENERATE: delete the existing `<CERT_CODE>/quiz/` directory and
  `<CERT_CODE>/build/` directory before proceeding, so stale files do not
  carry over.

  Then follow the full instructions in:
    @prompts/prompt1.md  (materials analysis + planning)
    @prompts/prompt2.md  (question generation)

  Substitute CERT_CODE with the cert being processed. QUESTION_COUNT = 500
  (the value set in CONFIGURATION above). Derive CERT_NAME from the
  materials — it is stated on the first page of the study guide.

  Process all GENERATE/REGENERATE certs before moving to Phase 4.
  Work on multiple certs in parallel where possible.

---

# PHASE 4 — REGISTER IN APP

Always think carefully, step by step.

For each cert where App = ADD:

  Follow the full instructions in:
    @prompts/prompt3.md

  Substitute CERT_CODE, cert_id, and all other values for the cert being
  processed. QUESTION_COUNT = 500.

  If the cert's Questions decision was also GENERATE or REGENERATE, Phase 3
  must be complete for that cert before this phase begins for it.

---

# PHASE 5 — TEST

Always think carefully, step by step.

For every cert that was touched in Phase 3 or Phase 4 (i.e. Questions ≠ SKIP
or App = ADD), run the full test suite from:
  @prompts/prompt4.md

Substitute CERT_CODE, cert_id, and QUESTION_COUNT = 500.

For certs where Questions = SKIP and App = SKIP: no tests needed.

Report all test results together in a final summary table:

| Cert | T1 Parser | T1b Coverage | T2 JS | T3 Structure | T4 Dupes | T5 Weights | Overall |
|------|-----------|-------------|-------|--------------|----------|------------|---------|
| ...  |  PASS/FAIL | PASS/FAIL   | ...   |     ...      |   ...    |    ...     | PASS/FAIL |

If any cert has a FAIL, fix the root cause and re-run only the failed test
before marking that cert complete.
