Generate the full <QUESTION_COUNT>-question quiz bank for <CERT_CODE> using the confirmed
domain breakdown. Follow @prompts/quiz_format_spec.md exactly — every file must
pass the validation rules described there.

Reference @<CERT_CODE>/build/materials_summary.md for the per-domain topic list
extracted from the official materials. Every domain's questions must cover the
topics listed there. Do not invent topics absent from the materials summary;
do not omit topics that are listed.

Domain breakdown (confirmed):
  Domain 1: <Name> — <N> questions
  Domain 2: <Name> — <N> questions
  ... (fill in from confirmed table)

Requirements:
- Every answer must cite a real, working Snowflake documentation URL.
  Use the Snowflake documentation tool to verify answers.
  **Source:** must be in Markdown link format: [text](https://docs.snowflake.com/...)
- No duplicate questions — check within and across domains before writing files.
- Question type mix per domain: use the recommended mix derived from the
  study guide sample questions in Prompt 1 (confirmed in the table above).
  The mix is evidence-based — no official percentage breakdown is published by Snowflake.
  Apply Scenario framing whenever a question opens with a role/persona/situation;
  use Single Answer for direct factual questions. Prefer Select 2 over Select 3
  for Multi Answer questions.
- Distractors must be plausible (wrong for a specific, explainable reason).
- Explanation must state why the correct answer is right AND why key distractors
  are wrong.

Output files to create (do not overwrite if they already exist — check first):
  <CERT_CODE>/quiz/questions_domain1.md  …  questions_domainN.md
  <CERT_CODE>/quiz/answers_domain1.md    …  answers_domainN.md

Execution strategy — work in parallel:
  Phase 1: Generate all question text for ALL domains simultaneously.
           Save drafts to <CERT_CODE>/build/domain{N}_draft_questions.md
           Do NOT write answers yet.
  Phase 2: Answer all domains in parallel using the Snowflake docs tool.
           Save drafts to <CERT_CODE>/build/domain{N}_draft_answers.md
  Phase 3: Deduplication — review all draft questions across every domain.
           A duplicate is any question that tests the same fact/concept with
           substantially the same wording, even if options differ slightly.
           For each duplicate found, remove it and record which domain it
           belonged to and how many were removed from that domain.
           After removal, report a per-domain deficit table:
             | Domain | Target | After dedup | Deficit |
             |--------|--------|-------------|---------|
             | 1      |   NNN  |     NNN     |    N    |
             ...
             | TOTAL  | <QUESTION_COUNT> |   NNN   |    N    |
  Phase 3b: For every domain with a deficit > 0, generate exactly that many
            new replacement questions for that domain.
            - New questions must not duplicate any existing question (draft
              or replacement) in ANY domain.
            - Maintain the same question type mix as the rest of that domain.
            - Save replacements to <CERT_CODE>/build/domain{N}_replacements.md
  Phase 3c: Answer all replacement questions in parallel using the Snowflake
            docs tool. Save to <CERT_CODE>/build/domain{N}_replacement_answers.md
  Phase 3d: Confirm the final per-domain count equals the target. Total must
            equal exactly <QUESTION_COUNT>. Repeat Phase 3b–3c if still short.
  Phase 4: Write final consolidated files to <CERT_CODE>/quiz/.
           Merge draft + replacement content for each domain into the single
           questions_domainN.md and answers_domainN.md output files.

Present a plan showing:
- Which Snowflake documentation sections you will consult per domain
- Parallelization approach

Ask for confirmation before starting Phase 1.
