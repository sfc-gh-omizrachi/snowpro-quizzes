# SnowPro Certification Prep

A browser quiz app for partner certification preparation sessions.
Zero-dependency static HTML/JS — open `app/index.html` locally, no server needed.

## Structure

```
<CERT_CODE>/
├── materials/    Official study guide, FAQs
├── quiz/         Question + answer markdown files (one pair per domain)
└── build/        Intermediate generation files

app/
├── index.html               Quiz app — entry point
├── app.js                   All quiz logic (vanilla JS, zero dependencies)
├── styles.css               Styling (dark theme, Snowflake-branded colours)
├── data/                    Auto-generated JS bundles — do not edit
└── parse_questions.py       Rebuilds data/ from quiz/ markdown

prompts/
├── sync.md                  Cortex Code prompt — scan, decide, execute, test
├── prompt{1-4}.md           Sub-prompts referenced by sync.md
├── quiz_format_spec.md      Quiz file format reference
└── create_app_from_scratch.md   Historical: original app creation instructions
```

## Current Certifications

| Code | Name | Domains | Questions |
|------|------|---------|-----------|
| COF-C02 | SnowPro Core (retiring May 2026) | 6 | 500 |
| COF-C03 | SnowPro Core | 5 | 500 |
| ARA-C01 | SnowPro Advanced: Architect | 4 | 500 |
| SEA-C01 | SnowPro Advanced: Security Engineer | 5 | 500 |
| DSA-C03 | SnowPro Advanced: Data Scientist | 4 | 500 |

## Adding a Certification

1. Place all official materials in `<CERT_CODE>/materials/`
2. Copy the contents of `prompts/sync.md` and paste into Cortex Code

The sync prompt scans all cert folders and decides per cert:

| Condition | Questions | App |
|-----------|-----------|-----|
| No quiz files yet | GENERATE | — |
| Quiz exists but count ≠ `QUESTION_COUNT` or materials are newer | REGENERATE | — |
| Quiz exists, count = `QUESTION_COUNT`, nothing newer | SKIP | — |
| Cert absent from `app/app.js` | — | ADD |
| Cert already registered | — | SKIP |

`QUESTION_COUNT` is set at the top of `prompts/sync.md` (currently 200) — edit it to
change. Note: some later lines in sync.md still hardcode 500; the config variable on
line 7 is the intended source of truth.

## After editing quiz files manually

If you edit a quiz markdown file directly (e.g. fix a typo or update a question),
run the parser to rebuild the JS bundles the browser loads:

```bash
python3 app/parse_questions.py --cert cof-c03
python3 app/parse_questions.py          # all certs
```

The sync prompt runs this automatically — only needed for manual edits.

## Dependencies

- Python 3.11+

---

## Changelog

### 2026-04-30

- **Fixed:** 39 multi-answer questions in COF-C02 and SEA-C01 incorrectly allowed
  selecting only one answer. Affected questions now show checkboxes and accept the
  correct number of selections.



https://drive.google.com/drive/folders/1e6WK7aVgGypXx3p3i6FDQsMX6nvUbkWe
