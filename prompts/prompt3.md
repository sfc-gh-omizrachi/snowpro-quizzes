Register <CERT_CODE> in the quiz app. Make ALL of the following changes and run
the parser. No manual editing is needed — do everything below.

Values to use (from the confirmed plan):
  cert_id:        <cert_id>           (e.g. cof-xyz)
  CERT_CODE:      <CERT_CODE>         (e.g. COF-XYZ)
  label:          <CERT_CODE>
  description:    <one-line description of the cert>
  storage_key:    <storage_key>       (e.g. snowpro_cof_xyz_sessions)
  pass_threshold: <pass_threshold>    (e.g. 0.75)
  domain_meta:    (from confirmed table — id, weight as float, name per domain)
  domain_count:   <N>

--- STEP 1: Edit app/parse_questions.py ---
Read @app/parse_questions.py first.
Add a new entry to the CERT_CONFIGS dict. Follow the cof-c03 entry as the exact
structural pattern. Place the new entry after the last existing entry.

The entry must have:
  - key: '<cert_id>'
  - quiz_dir: os.path.join(BASE_DIR, '..', '<CERT_CODE>', 'quiz')
  - out_file: os.path.join(BASE_DIR, 'data', '<cert_id>.js')
  - domain_meta: list of dicts with "id" (int), "weight" (float), "name" (str)

Also update the argparse choices list (search for "choices=[") to include
'<cert_id>' alongside the existing entries.

--- STEP 2: Edit app/app.js ---
Read @app/app.js first.
Add a new entry to the CERT_CONFIGS object. Follow the cof-c03 entry as the
exact structural pattern. Place the new entry after the last existing entry.

The entry must have:
  - key: '<cert_id>'
  - label: '<CERT_CODE>'
  - description: '<description>'
  - storageKey: '<storage_key>'
  - passThreshold: <pass_threshold>
  - domainColors: array of exactly <domain_count> hex color strings
    Use colors from this palette (cycle if more than 6 domains):
    '#29B5E8', '#7C3AED', '#10B981', '#F59E0B', '#EC4899', '#FF6B35'

--- STEP 3: Edit app/index.html ---
Read @app/index.html first.
Find the line: <script src="data/cof_c02.js"></script>
Insert the following line immediately BEFORE it:
  <script src="data/<cert_id>.js"></script>

--- STEP 4: Run the parser ---
Run: python3 app/parse_questions.py --cert <cert_id>

Check the output carefully:
  ✓ "Total: <QUESTION_COUNT> questions"
  ✓ Zero lines starting with "WARNING:"

If any WARNINGs appear, identify the affected quiz files, fix them, and re-run
before continuing.

--- STEP 5: Verify and report ---
Confirm that app/data/<cert_id>.js now exists and is non-empty.
Report a summary:
  - Total questions parsed
  - Single vs multi-answer breakdown
  - Questions per domain
  - Any domain with 0 questions (must be investigated)
