Run the following tests for <CERT_CODE> and report a pass/fail for each.
Fix any failures before declaring the cert ready.

--- TEST 1: Parser output ---
Re-run: python3 app/parse_questions.py --cert <cert_id>
Pass criteria:
  ✓ Exit code 0
  ✓ Total questions reported = <QUESTION_COUNT>
  ✓ Zero lines starting with "WARNING:"
  ✓ Every domain reports > 0 questions
  ✓ Per-domain counts match the confirmed breakdown from Prompt 1

--- TEST 1b: Topic coverage ---
Read @<CERT_CODE>/build/materials_summary.md and the final quiz files.
For each domain, verify that the questions collectively cover all key topics
listed in the materials summary. Flag any topic with zero questions against it.

--- TEST 2: JS file integrity ---
Read app/data/<cert_id>.js.
Pass criteria:
  ✓ File is non-empty
  ✓ First non-blank line starts with: window.CERT_DATA[
  ✓ The key used is '<cert_id>'
  ✓ The object contains a 'questions' array with exactly <QUESTION_COUNT> entries
  ✓ File ends with a closing }); or });

--- TEST 3: Question structure spot-check ---
For each domain, pick the first and last question from the questions array in
app/data/<cert_id>.js. For every sampled question verify:
  ✓ 'text' field is non-empty
  ✓ 'type' is one of: "Single Answer", "Multi Answer", "Scenario"
  ✓ 'options' array has at least 4 entries, each non-empty
  ✓ 'answer' field is non-empty
  ✓ 'explanation' field is non-empty
  ✓ 'source' field contains a URL starting with https://docs.snowflake.com/
  ✓ For Multi Answer: 'selectCount' is present and is an integer ≥ 2

--- TEST 4: Duplicate check ---
Extract every question 'text' value from app/data/<cert_id>.js.
Normalise each: lowercase, collapse whitespace, strip punctuation.
Pass criteria:
  ✓ No two normalised question texts are identical
  ✓ No two normalised question texts share more than 85% of their words
    (flag any pairs above this threshold for manual review)

--- TEST 5: Domain weight sanity ---
For each domain compute: actual_count / <QUESTION_COUNT> × 100
Compare to the target weight from Prompt 1.
Pass criteria:
  ✓ Each domain's actual percentage is within ±1% of its target weight

Report format:
  TEST 1 Parser output       [PASS / FAIL] — <detail>
  TEST 2 JS file integrity   [PASS / FAIL] — <detail>
  TEST 3 Structure spot-check [PASS / FAIL] — <N>/<M> questions checked OK
  TEST 4 Duplicate check     [PASS / FAIL] — <N> duplicates / <M> near-dupes flagged
  TEST 5 Domain weight sanity [PASS / FAIL] — worst delta: ±X.X%

If any test FAILS, fix the root cause (update quiz files and re-run the parser
if needed), then re-run only the failed test to confirm it now passes.
Do NOT proceed to mark the cert as complete until all five tests pass.
