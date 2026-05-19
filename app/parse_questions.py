#!/usr/bin/env python3
"""Parse quiz markdown files and generate cert-specific data files for the browser app.

Usage:
  python parse_questions.py --cert cof-c02
  python parse_questions.py --cert cof-c03
  python parse_questions.py          # regenerates both
"""

import re
import json
import os
import argparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CERT_CONFIGS = {
    'cof-c02': {
        'quiz_dir': os.path.join(BASE_DIR, '..', 'COF-C02', 'quiz'),
        'out_file': os.path.join(BASE_DIR, 'data', 'cof_c02.js'),
        'domain_meta': [
            {"id": 1, "weight": 0.24, "name": "Snowflake AI Data Cloud Features and Architecture"},
            {"id": 2, "weight": 0.18, "name": "Account Access and Security"},
            {"id": 3, "weight": 0.16, "name": "Performance and Cost Optimization Concepts"},
            {"id": 4, "weight": 0.12, "name": "Data Loading and Unloading"},
            {"id": 5, "weight": 0.18, "name": "Data Transformations"},
            {"id": 6, "weight": 0.12, "name": "Data Protection and Data Sharing"},
        ],
    },
    'cof-c03': {
        'quiz_dir': os.path.join(BASE_DIR, '..', 'COF-C03', 'quiz'),
        'out_file': os.path.join(BASE_DIR, 'data', 'cof_c03.js'),
        'domain_meta': [
            {"id": 1, "weight": 0.31, "name": "Snowflake AI Data Cloud Features & Architecture"},
            {"id": 2, "weight": 0.20, "name": "Account Management & Data Governance"},
            {"id": 3, "weight": 0.18, "name": "Data Loading, Unloading & Connectivity"},
            {"id": 4, "weight": 0.21, "name": "Performance Optimization, Querying & Transformation"},
            {"id": 5, "weight": 0.10, "name": "Data Collaboration"},
        ],
    },
    'ara-c01': {
        'quiz_dir': os.path.join(BASE_DIR, '..', 'ARA-C01', 'quiz'),
        'out_file': os.path.join(BASE_DIR, 'data', 'ara_c01.js'),
        'domain_meta': [
            {"id": 1, "weight": 0.25, "name": "Accounts and Security"},
            {"id": 2, "weight": 0.30, "name": "Snowflake Architecture"},
            {"id": 3, "weight": 0.25, "name": "Data Engineering"},
            {"id": 4, "weight": 0.20, "name": "Performance Optimization"},
        ],
    },
    'sea-c01': {
        'quiz_dir': os.path.join(BASE_DIR, '..', 'SEA-C01', 'quiz'),
        'out_file': os.path.join(BASE_DIR, 'data', 'sea_c01.js'),
        'domain_meta': [
            {"id": 1, "weight": 0.22, "name": "Access Control and Identity Management"},
            {"id": 2, "weight": 0.30, "name": "Data Protection, Data Privacy, and Data Governance"},
            {"id": 3, "weight": 0.18, "name": "Auditing, Monitoring, and Compliance"},
            {"id": 4, "weight": 0.18, "name": "Threats, Risk Assessment, Incident Response, and Forensics"},
            {"id": 5, "weight": 0.12, "name": "Securing Snowflake Services and Features for AI/ML and Applications"},
        ],
    },
    'dsa-c03': {
        'quiz_dir': os.path.join(BASE_DIR, '..', 'DSA-C03', 'quiz'),
        'out_file': os.path.join(BASE_DIR, 'data', 'dsa_c03.js'),
        'domain_meta': [
            {"id": 1, "weight": 0.17, "name": "Data Science Concepts"},
            {"id": 2, "weight": 0.27, "name": "Data Preparation and Feature Engineering"},
            {"id": 3, "weight": 0.31, "name": "Model Development"},
            {"id": 4, "weight": 0.25, "name": "Model Deployment"},
        ],
    },
}


def parse_questions(quiz_dir, domain_id):
    path = os.path.join(quiz_dir, f'questions_domain{domain_id}.md')
    with open(path, encoding='utf-8') as f:
        content = f.read()

    blocks = re.split(r'\n---\n', content)
    questions = []

    for block in blocks:
        block = block.strip()
        if not block:
            continue
        m = re.search(r'##\s+Q(\d+)\s+\(([^)]+)\)', block)
        if not m:
            continue

        q_num = int(m.group(1))
        q_type_raw = m.group(2).strip()

        select_count = 1
        is_multi = False
        _word_to_num = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
        sc_m = re.search(r'\bSelect\s+(\d+|\w+)', q_type_raw, re.IGNORECASE)
        if 'Multi Answer' in q_type_raw or 'multi' in q_type_raw.lower() or sc_m:
            is_multi = True
            if sc_m:
                val = sc_m.group(1).lower()
                if val.isdigit():
                    select_count = int(val)
                elif val in _word_to_num:
                    select_count = _word_to_num[val]

        is_scenario = 'Scenario' in q_type_raw

        lines = block.split('\n')
        header_line = next((i for i, l in enumerate(lines) if re.match(r'##\s+Q\d+', l)), 0)

        option_lines = [l for l in lines if re.match(r'^-\s+[A-Z]\)', l)]
        text_lines = []
        for l in lines[header_line + 1:]:
            if re.match(r'^-\s+[A-Z]\)', l):
                break
            if l.strip() and l.strip() != '---':
                text_lines.append(l.strip())
        question_text = ' '.join(text_lines).strip()

        options = []
        for ol in option_lines:
            om = re.match(r'^-\s+([A-Z])\)\s+(.+)', ol)
            if om:
                options.append({"label": om.group(1), "text": om.group(2).strip()})

        questions.append({
            "id": f"D{domain_id}Q{q_num}",
            "domain": domain_id,
            "num": q_num,
            "type": "multi" if is_multi else "single",
            "selectCount": select_count,
            "scenario": is_scenario,
            "text": question_text,
            "options": options,
            "correctAnswers": [],
            "explanation": "",
            "source": "",
            "sourceUrl": "",
            "quote": "",
        })

    return {q["id"]: q for q in questions}


def parse_answers(quiz_dir, domain_id):
    path = os.path.join(quiz_dir, f'answers_domain{domain_id}.md')
    with open(path, encoding='utf-8') as f:
        content = f.read()

    blocks = re.split(r'\n---\n', content)
    answers = {}

    for block in blocks:
        block = block.strip()
        if not block:
            continue
        m = re.search(r'##\s+Q(\d+)\b', block)
        if not m:
            continue
        q_num = int(m.group(1))

        ans_m = re.search(r'\*\*Answer:\s*([A-Z,\s]+)\*\*', block)
        correct = []
        if ans_m:
            correct = [x.strip() for x in ans_m.group(1).split(',')]

        exp_m = re.search(r'\*\*Explanation:\*\*\s*(.+?)(?=\*\*Source|\*\*Quote|$)', block, re.DOTALL)
        explanation = exp_m.group(1).strip() if exp_m else ""

        src_m = re.search(r'\*\*Source:\*\*\s*\[([^\]]+)\]\(([^)]+)\)', block)
        source_text = src_m.group(1).strip() if src_m else ""
        source_url = src_m.group(2).strip() if src_m else ""

        quote_m = re.search(r'\*\*Quote:\*\*\s*"(.+?)"', block, re.DOTALL)
        quote = quote_m.group(1).strip() if quote_m else ""

        answers[q_num] = {
            "correctAnswers": correct,
            "explanation": explanation,
            "source": source_text,
            "sourceUrl": source_url,
            "quote": quote,
        }

    return answers


def generate_cert(cert_id):
    cfg = CERT_CONFIGS[cert_id]
    quiz_dir = cfg['quiz_dir']
    domain_meta = cfg['domain_meta']
    out_file = cfg['out_file']

    print(f"\n--- Generating {cert_id} ---")
    all_questions = []

    for d in domain_meta:
        did = d["id"]
        qs = parse_questions(quiz_dir, did)
        ans = parse_answers(quiz_dir, did)

        for qid, q in qs.items():
            q_num = q["num"]
            if q_num in ans:
                a = ans[q_num]
                q["correctAnswers"] = a["correctAnswers"]
                q["explanation"] = a["explanation"]
                q["source"] = a["source"]
                q["sourceUrl"] = a["sourceUrl"]
                q["quote"] = a["quote"]
            all_questions.append(q)
        print(f"  Domain {did}: {len(qs)} questions parsed")

    print(f"  Total: {len(all_questions)} questions")

    domain_meta_js = json.dumps(domain_meta, indent=2)
    questions_js = json.dumps(all_questions, indent=2, ensure_ascii=False)

    with open(out_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated by parse_questions.py — do not edit manually\n')
        f.write('window.CERT_DATA = window.CERT_DATA || {};\n')
        f.write(f'window.CERT_DATA[{json.dumps(cert_id)}] = {{\n')
        f.write(f'  domainMeta: {domain_meta_js},\n')
        f.write(f'  questions: {questions_js}\n')
        f.write('};\n')

    print(f"  Written to: {out_file}")

    broken = [q for q in all_questions if not q["correctAnswers"]]
    if broken:
        print(f"  WARNING: {len(broken)} questions missing answers:")
        for q in broken[:10]:
            print(f"    {q['id']}")

    return len(all_questions)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--cert', choices=['cof-c02', 'cof-c03', 'ara-c01', 'sea-c01', 'dsa-c03'],
                        help='Cert to generate (default: all)')
    args = parser.parse_args()

    certs = [args.cert] if args.cert else ['cof-c02', 'cof-c03', 'ara-c01', 'sea-c01', 'dsa-c03']
    total = 0
    for cert_id in certs:
        total += generate_cert(cert_id)
    print(f"\nAll done. {total} questions across {len(certs)} cert(s).")


if __name__ == '__main__':
    main()
