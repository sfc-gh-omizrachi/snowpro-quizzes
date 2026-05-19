/* SnowPro Core Quiz App — app.js */
'use strict';

// ─── Cert Configs ─────────────────────────────────────────────────────────────
const CERT_CONFIGS = {
  'cof-c02': {
    name:          'SnowPro Core',
    label:         'COF-C02',
    description:   'Retires May 14, 2026',
    storageKey:    'snowpro_cof_c02_sessions',
    passThreshold: 0.75,
    domainColors:  ['#29B5E8','#7C3AED','#10B981','#F59E0B','#EC4899','#FF6B35'],
  },
  'cof-c03': {
    name:          'SnowPro Core',
    label:         'COF-C03',
    description:   'Launched February 2026',
    storageKey:    'snowpro_cof_c03_sessions',
    passThreshold: 0.75,
    domainColors:  ['#29B5E8','#7C3AED','#10B981','#F59E0B','#EC4899'],
  },
  'ara-c01': {
    name:          'SnowPro Advanced: Architect',
    label:         'ARA-C01',
    description:   'SnowPro Advanced Certification',
    storageKey:    'snowpro_ara_c01_sessions',
    passThreshold: 0.72,
    domainColors:  ['#29B5E8','#7C3AED','#10B981','#F59E0B'],
  },
  'sea-c01': {
    name:          'SnowPro Advanced: Security Engineer',
    label:         'SEA-C01',
    description:   'SnowPro Advanced Certification',
    storageKey:    'snowpro_sea_c01_sessions',
    passThreshold: 0.75,
    domainColors:  ['#29B5E8','#7C3AED','#10B981','#F59E0B','#EC4899'],
  },
  'dsa-c03': {
    name:          'SnowPro Advanced: Data Scientist',
    label:         'DSA-C03',
    description:   'SnowPro Advanced Certification',
    storageKey:    'snowpro_dsa_c03_sessions',
    passThreshold: 0.75,
    domainColors:  ['#29B5E8','#7C3AED','#10B981','#F59E0B'],
  },
};

// ─── Active Cert (set by selectCert) ──────────────────────────────────────────
let activeCertId   = null;
let QUESTIONS      = [];
let DOMAIN_META    = [];
let STORAGE_KEY    = '';
let PASS_THRESHOLD = 0.75;
let DOMAIN_COLORS  = [];

// ─── State ─────────────────────────────────────────────────────────────────────
const state = {
  screen: 'home',
  mode: 'exam',         // 'exam' | 'study'
  totalQuestions: 25,
  timeLimit: 29,        // minutes (exam mode)
  questions: [],        // array of question objects for current quiz
  currentIndex: 0,
  answers: {},          // questionIndex -> Set of selected option labels
  flagged: new Set(),   // question indices
  timer: null,
  timeRemaining: 0,     // seconds (exam) or elapsed (study)
  timeUsed: 0,          // seconds used when submitted
  sessionStart: null,
  submitted: false,
  reviewFilter: 'all',
  unseenOnly: false,
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTime(secs) {
  const m = Math.floor(Math.abs(secs) / 60);
  const s = Math.abs(secs) % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function el(id) { return document.getElementById(id); }

function showToast(msg, type = '') {
  const t = el('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── Session Storage ───────────────────────────────────────────────────────────
function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function getSeenIds() {
  const sessions = loadSessions();
  const seen = new Set();
  sessions.forEach(s => (s.questionResults || []).forEach(r => {
    if (r.questionId) seen.add(r.questionId);
  }));
  return seen;
}

function countUnseenQuestions() {
  const seenIds = getSeenIds();
  return QUESTIONS.filter(q => !seenIds.has(q.id)).length;
}

function saveSession(sessionData) {
  const sessions = loadSessions();
  sessions.unshift(sessionData); // newest first
  saveSessions(sessions);
}

// ─── Report Storage ────────────────────────────────────────────────────────────
const REPORT_STORAGE_KEY = 'snowpro_reported_questions';

function loadReportedQuestions() {
  try { return JSON.parse(localStorage.getItem(REPORT_STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveReportedQuestions(reports) {
  localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reports));
}

function isReported(certId, questionId) {
  return loadReportedQuestions().some(r => r.key === `${certId}:${questionId}`);
}

function toggleReport(certId, q) {
  const key = `${certId}:${q.id}`;
  const reports = loadReportedQuestions();
  const idx = reports.findIndex(r => r.key === key);
  if (idx >= 0) {
    reports.splice(idx, 1);
    showToast('Removed from reports');
  } else {
    const domain = DOMAIN_META.find(d => d.id === q.domain);
    reports.push({
      key,
      questionId: q.id,
      certId,
      certLabel: CERT_CONFIGS[certId] ? CERT_CONFIGS[certId].label : certId,
      domainId: q.domain,
      domainName: domain ? domain.name : `Domain ${q.domain}`,
      text: q.text,
      type: q.type,
      selectCount: q.selectCount,
      correctAnswers: q.correctAnswers,
      options: q.options,
      reportedAt: new Date().toISOString(),
    });
    showToast('Added to report queue');
  }
  saveReportedQuestions(reports);
  updateReportBadge();
}

function updateReportBadge() {
  const badge = el('report-count-badge');
  if (!badge) return;
  const count = loadReportedQuestions().length;
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

// ─── Question Selection ────────────────────────────────────────────────────────
function selectQuestions(total) {
  // Compute per-domain counts using weights, then distribute remainder
  const weights = DOMAIN_META.map(d => d.weight);
  const counts = weights.map(w => Math.floor(total * w));
  let sum = counts.reduce((a, b) => a + b, 0);
  const fractions = weights.map((w, i) => ({ i, f: total * w - counts[i] }));
  fractions.sort((a, b) => b.f - a.f);
  for (let k = 0; k < total - sum; k++) counts[fractions[k].i]++;

  const seenIds = state.unseenOnly ? getSeenIds() : null;
  const selected = [];
  for (let d = 0; d < DOMAIN_META.length; d++) {
    const pool = QUESTIONS.filter(q => q.domain === d + 1);
    const needed = counts[d];
    if (needed === 0) continue;
    let use;
    if (seenIds) {
      const unseen = shuffle(pool.filter(q => !seenIds.has(q.id)));
      const seen   = shuffle(pool.filter(q =>  seenIds.has(q.id)));
      use = [...unseen, ...seen].slice(0, needed);
    } else {
      use = shuffle(pool).slice(0, needed);
    }
    selected.push(...use);
  }

  return shuffle(selected);
}

function getDomainCounts(total) {
  const weights = DOMAIN_META.map(d => d.weight);
  const counts = weights.map(w => Math.floor(total * w));
  const fractions = weights.map((w, i) => ({ i, f: total * w - counts[i] }));
  fractions.sort((a, b) => b.f - a.f);
  for (let k = 0; k < total - counts.reduce((a, b) => a + b, 0); k++) counts[fractions[k].i]++;
  return counts;
}

// ─── Screen Routing ────────────────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el(`screen-${name}`).classList.add('active');
  state.screen = name;
  const homeBtn = el('nav-home-shortcut-btn');
  if (homeBtn) {
    const onHomeOrPicker = name === 'certpicker';
    homeBtn.style.display = onHomeOrPicker ? 'none' : '';
  }
}

// ─── Home Screen ───────────────────────────────────────────────────────────────
function renderHome() {
  const sessions = loadSessions();
  el('stat-total-q').textContent = QUESTIONS.length;
  el('subtitle-total-q').textContent = QUESTIONS.length;
  const cfg = activeCertId ? CERT_CONFIGS[activeCertId] : null;
  const homeTitle = el('home-title');
  if (homeTitle) {
    homeTitle.innerHTML = cfg
      ? cfg.name.replace('SnowPro', 'SnowPro<sup>®</sup>') + ' Practice Quiz'
      : 'SnowPro<sup>®</sup> Practice Quiz';
  }
  const navCertTitle = el('nav-cert-title');
  const navCertSubtitle = el('nav-cert-subtitle');
  if (navCertTitle && navCertSubtitle) {
    if (cfg) {
      const parts = cfg.name.split(' ');
      navCertTitle.textContent = parts[0];
      navCertSubtitle.textContent = parts.slice(1).join(' ') + ' Quiz';
    } else {
      navCertTitle.textContent = 'SnowPro';
      navCertSubtitle.textContent = 'Quiz';
    }
  }
  const subtitleCertLabel = el('subtitle-cert-label');
  if (subtitleCertLabel) {
    subtitleCertLabel.textContent = cfg ? `${cfg.name} (${cfg.label})` : '';
  }
  const subtitleDomainsCount = el('subtitle-domains-count');
  if (subtitleDomainsCount) subtitleDomainsCount.textContent = DOMAIN_META.length;
  el('stat-sessions').textContent = sessions.length;
  if (sessions.length > 0) {
    const best = Math.max(...sessions.map(s => s.pct));
    el('stat-best').textContent = Math.round(best * 100) + '%';
  } else {
    el('stat-best').textContent = '—';
  }
  renderHomeDomainPreview();
  showScreen('home');
}

function renderHomeDomainPreview() {
  const counts = getDomainCounts(100);
  el('home-domain-preview').innerHTML = DOMAIN_META.map((d, i) => `
    <div class="domain-row">
      <span class="domain-row-name" style="font-size:12px;color:var(--text)">${d.name}</span>
      <div class="domain-row-bar-wrap">
        <div class="domain-row-bar" style="width:${d.weight * 100}%;background:${DOMAIN_COLORS[i]}"></div>
      </div>
      <span class="domain-row-count">${Math.round(d.weight * 100)}%</span>
    </div>
  `).join('');
}

// ─── Setup Screen ──────────────────────────────────────────────────────────────
function updateUnseenHint() {
  const unseen = countUnseenQuestions();
  const total  = QUESTIONS.length;
  el('unseen-hint').textContent = `${unseen} of ${total} questions not yet seen`;
}

function renderSetup() {
  // Restore state
  el('q-count-slider').value = state.totalQuestions;
  el('q-count-val').textContent = state.totalQuestions;
  el('time-slider').value = state.timeLimit;
  el('time-val').textContent = state.timeLimit;
  el('unseen-toggle').checked = state.unseenOnly;
  updateModeCards();
  updateSetupDomainPreview();
  updateUnseenHint();
  showScreen('setup');
}

function updateModeCards() {
  document.querySelectorAll('.mode-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.mode === state.mode);
  });
  // Show/hide time group
  el('time-group').style.display = state.mode === 'exam' ? '' : 'none';
}

function updateSetupDomainPreview() {
  const total = parseInt(el('q-count-slider').value);
  const counts = getDomainCounts(total);
  el('setup-domain-preview').innerHTML = DOMAIN_META.map((d, i) => `
    <div class="domain-row">
      <span class="domain-row-name">${d.name}</span>
      <div class="domain-row-bar-wrap">
        <div class="domain-row-bar" style="width:${d.weight * 100}%;background:${DOMAIN_COLORS[i]}"></div>
      </div>
      <span class="domain-row-count">${counts[i]}q</span>
    </div>
  `).join('');
}

// ─── Quiz Screen ───────────────────────────────────────────────────────────────
function startQuiz() {
  state.totalQuestions = parseInt(el('q-count-slider').value);
  state.timeLimit = parseInt(el('time-slider').value);
  state.questions = selectQuestions(state.totalQuestions);
  state.currentIndex = 0;
  state.answers = {};
  state.flagged = new Set();
  state.submitted = false;
  state.sessionStart = new Date().toISOString();
  state.timeUsed = 0;

  if (state.mode === 'exam') {
    state.timeRemaining = state.timeLimit * 60;
    el('timer-label').textContent = 'Time Left';
    el('quiz-timer').className = 'quiz-timer';
  } else {
    state.timeRemaining = 0; // counts up
    el('timer-label').textContent = 'Elapsed';
    el('quiz-timer').className = 'quiz-timer study-mode';
  }

  showScreen('quiz');
  renderQuizGrid();
  renderQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    if (state.mode === 'exam') {
      state.timeRemaining--;
      updateTimerDisplay();
      if (state.timeRemaining <= 0) {
        clearInterval(state.timer);
        submitQuiz(true); // auto-submit
      }
    } else {
      state.timeRemaining++; // stopwatch
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const v = el('timer-val');
  if (state.mode === 'exam') {
    v.textContent = fmtTime(state.timeRemaining);
    const tc = el('quiz-timer');
    if (state.timeRemaining <= 0) {
      tc.className = 'quiz-timer danger';
    } else if (state.timeRemaining < 120) {
      tc.className = 'quiz-timer danger';
    } else if (state.timeRemaining < 300) {
      tc.className = 'quiz-timer warning';
    } else {
      tc.className = 'quiz-timer';
    }
  } else {
    v.textContent = fmtTime(state.timeRemaining);
  }
}

function renderQuestion() {
  const idx = state.currentIndex;
  const q = state.questions[idx];
  if (!q) return;

  // Header
  el('quiz-progress-label').textContent = `Question ${idx + 1} of ${state.questions.length}`;
  const pct = ((idx + 1) / state.questions.length) * 100;
  el('quiz-progress-bar').style.width = pct + '%';

  // Domain badge
  const db = el('q-domain-badge');
  db.textContent = `Domain ${q.domain}`;
  db.className = `q-badge domain-${q.domain}`;

  // Type badge
  el('q-type-badge').textContent = q.type === 'multi'
    ? `Select ${q.selectCount}`
    : 'Single Answer';

  // Scenario badge
  const sb = el('q-scenario-badge');
  sb.classList.toggle('hidden', !q.scenario);

  el('question-number').textContent = `Q${idx + 1}`;
  el('question-text').textContent = q.text;

  // Select hint
  const hint = el('q-select-hint');
  if (q.type === 'multi') {
    hint.textContent = `Select ${q.selectCount} answers`;
    hint.style.display = '';
  } else {
    hint.style.display = 'none';
  }

  renderOptions();
  renderFlagBtn();
  renderReportBtn();
  renderNavBtns();
  renderAnsweredCount();

  // Scroll top
  el('quiz-main').scrollTop = 0;
}

function renderOptions() {
  const idx = state.currentIndex;
  const q = state.questions[idx];
  const selected = state.answers[idx] || new Set();
  const isSubmitted = state.submitted;
  const isStudyRevealed = state.mode === 'study' && selected.size > 0 && (q.type === 'single' || (q.type === 'multi' && Array.from(selected).length === q.selectCount));

  const list = el('options-list');
  list.innerHTML = q.options.map(opt => {
    const isSelected = selected.has(opt.label);
    const isCorrect = q.correctAnswers.includes(opt.label);
    let cls = 'option-item';
    let ctrlCls = 'option-control' + (q.type === 'multi' ? ' checkbox' : '');
    let checkmark = '';

    if (isSubmitted || isStudyRevealed) {
      if (isCorrect && isSelected) { cls += ' correct'; checkmark = checkSVG(); }
      else if (isCorrect && !isSelected) { cls += ' correct-not-selected'; checkmark = checkSVG('#10B981'); }
      else if (!isCorrect && isSelected) { cls += ' incorrect'; checkmark = xSVG(); }
    } else if (isSelected) {
      cls += ' selected';
      checkmark = q.type === 'single' ? dotSVG() : checkSVG();
    }

    return `
      <div class="${cls}" data-label="${opt.label}">
        <div class="${ctrlCls}">${checkmark}</div>
        <span class="option-label">${opt.label}</span>
        <span class="option-text">${opt.text}</span>
      </div>`;
  }).join('');

  // Option click handlers
  if (!isSubmitted) {
    list.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', () => handleOptionClick(item.dataset.label));
    });
  }

  // Study mode: show feedback if answered
  renderStudyFeedback(isStudyRevealed);
}

function checkSVG(color) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${color || 'white'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>`;
}

function xSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" width="12" height="12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
}

function dotSVG() {
  return `<svg viewBox="0 0 24 24" width="10" height="10"><circle cx="12" cy="12" r="5" fill="white"/></svg>`;
}

function handleOptionClick(label) {
  const idx = state.currentIndex;
  const q = state.questions[idx];
  if (!state.answers[idx]) state.answers[idx] = new Set();
  const sel = state.answers[idx];

  if (q.type === 'single') {
    sel.clear();
    sel.add(label);
    renderOptions();
    renderQuizGrid();
    renderAnsweredCount();
    // Study mode: auto-reveal after single selection
    if (state.mode === 'study') {
      renderOptions();
    }
  } else {
    // Multi-answer
    if (sel.has(label)) {
      sel.delete(label);
    } else {
      if (sel.size < q.selectCount) {
        sel.add(label);
      } else {
        showToast(`Select exactly ${q.selectCount} answers`, '');
        return;
      }
    }
    renderOptions();
    renderQuizGrid();
    renderAnsweredCount();
    // Study mode: reveal when correct count selected
    if (state.mode === 'study' && sel.size === q.selectCount) {
      renderOptions();
    }
  }
}

function renderStudyFeedback(show) {
  const fb = el('answer-feedback');
  if (!show || state.mode !== 'study') { fb.style.display = 'none'; return; }

  const idx = state.currentIndex;
  const q = state.questions[idx];
  const sel = state.answers[idx] || new Set();
  const correct = q.correctAnswers;
  const isCorrect = correct.length === sel.size && correct.every(c => sel.has(c));

  fb.style.display = 'block';
  fb.className = 'answer-feedback ' + (isCorrect ? 'correct-fb' : 'incorrect-fb');

  el('feedback-title').innerHTML = isCorrect
    ? `${checkSVG('#10B981')}&nbsp;&nbsp;Correct!`
    : `${xSVG().replace('white', '#EF4444')}&nbsp;&nbsp;Incorrect — Correct answer: <strong>${correct.join(', ')}</strong>`;

  el('feedback-title').style.color = isCorrect ? 'var(--success)' : 'var(--error)';
  el('feedback-explanation').textContent = q.explanation || '';
  el('feedback-quote').textContent = q.quote ? `"${q.quote}"` : '';
  el('feedback-quote').style.display = q.quote ? '' : 'none';
  el('feedback-source').innerHTML = q.sourceUrl
    ? `<a href="${q.sourceUrl}" target="_blank" rel="noopener">📖 ${q.source || 'Source'}</a>`
    : '';
}

function renderFlagBtn() {
  const btn = el('flag-btn');
  const flagged = state.flagged.has(state.currentIndex);
  btn.classList.toggle('flagged', flagged);
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="${flagged ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
    ${flagged ? 'Flagged' : 'Flag for Review'}`;
}

function renderReportBtn() {
  const btn = el('report-btn');
  const q = state.questions[state.currentIndex];
  if (!btn || !q) return;
  const reported = isReported(activeCertId, q.id);
  btn.classList.toggle('reported', reported);
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    ${reported ? 'Reported' : 'Report Issue'}`;
}

function renderNavBtns() {
  el('btn-prev').disabled = state.currentIndex === 0;
  el('btn-next').textContent = state.currentIndex === state.questions.length - 1 ? 'Last Question' : 'Next';
  el('btn-next').disabled = state.currentIndex === state.questions.length - 1;
  // Re-enable next even if last
  el('btn-next').disabled = false;
  el('btn-next').innerHTML = state.currentIndex === state.questions.length - 1
    ? `Last Question <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`
    : `Next <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
}

function renderAnsweredCount() {
  const answered = Object.keys(state.answers).filter(k => state.answers[k] && state.answers[k].size > 0).length;
  el('answered-count').textContent = `${answered} answered`;
  const flagCount = state.flagged.size;
  el('flagged-count').textContent = `${flagCount} flagged`;
  el('flagged-count').classList.toggle('hidden', flagCount === 0);
}

function renderQuizGrid() {
  const grid = el('question-grid');
  grid.innerHTML = state.questions.map((_, i) => {
    let cls = 'q-dot';
    const ans = state.answers[i];
    const hasAnswer = ans && ans.size > 0;
    if (i === state.currentIndex) cls += ' current';
    else if (state.submitted) {
      const q = state.questions[i];
      const correct = q.correctAnswers;
      const isCorrect = hasAnswer && correct.length === ans.size && correct.every(c => ans.has(c));
      cls += isCorrect ? ' correct' : ' incorrect';
    } else if (state.flagged.has(i)) {
      cls += ' flagged';
    } else if (hasAnswer) {
      cls += ' answered';
    }
    if (state.flagged.has(i) && i !== state.currentIndex && !state.submitted) {
      cls += ' flag-icon';
    }
    return `<div class="${cls}" data-idx="${i}">${i + 1}</div>`;
  }).join('');

  grid.querySelectorAll('.q-dot').forEach(dot => {
    dot.addEventListener('click', () => navigateTo(parseInt(dot.dataset.idx)));
  });
}

function navigateTo(idx) {
  state.currentIndex = idx;
  renderQuestion();
  renderQuizGrid();
}

// ─── Quiz Submission ───────────────────────────────────────────────────────────
function attemptSubmit() {
  const answered = Object.keys(state.answers).filter(k => state.answers[k] && state.answers[k].size > 0).length;
  const total = state.questions.length;
  const unanswered = total - answered;
  const modal = el('submit-modal');

  if (unanswered > 0) {
    el('modal-title').textContent = 'Submit Quiz?';
    el('modal-body').textContent = `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Submit anyway?`;
  } else {
    el('modal-title').textContent = 'Submit Quiz?';
    el('modal-body').textContent = 'All questions answered. Ready to see your results?';
  }

  modal.classList.add('open');
}

function submitQuiz(autoSubmit = false) {
  clearInterval(state.timer);
  state.submitted = true;

  if (state.mode === 'exam') {
    state.timeUsed = state.timeLimit * 60 - state.timeRemaining;
  } else {
    state.timeUsed = state.timeRemaining;
  }

  // Compute results
  const results = computeResults();
  const sessionData = buildSessionData(results);
  saveSession(sessionData);

  renderResults(results);
  showScreen('results');
}

function computeResults() {
  const questions = state.questions;
  let correct = 0;
  const domainResults = {};
  DOMAIN_META.forEach(d => {
    domainResults[d.id] = { correct: 0, total: 0, name: d.name };
  });

  const questionResults = questions.map((q, i) => {
    const sel = state.answers[i] || new Set();
    const ca = q.correctAnswers;
    const isCorrect = ca.length === sel.size && ca.every(c => sel.has(c));
    if (isCorrect) {
      correct++;
      domainResults[q.domain].correct++;
    }
    domainResults[q.domain].total++;
    return {
      questionIdx: i,
      questionId: q.id,
      domain: q.domain,
      isCorrect,
      selected: Array.from(sel),
      correct: ca,
      flagged: state.flagged.has(i),
    };
  });

  const pct = questions.length > 0 ? correct / questions.length : 0;
  return {
    correct,
    total: questions.length,
    pct,
    domainResults,
    questionResults,
    timeUsed: state.timeUsed,
    mode: state.mode,
  };
}

function buildSessionData(results) {
  return {
    id: Date.now(),
    date: new Date().toISOString(),
    mode: results.mode,
    totalQuestions: results.total,
    correct: results.correct,
    pct: results.pct,
    timeUsed: results.timeUsed,
    domainResults: results.domainResults,
    questionResults: results.questionResults,
  };
}

// ─── Results Screen ────────────────────────────────────────────────────────────
function renderResults(results) {
  const pctInt = Math.round(results.pct * 100);
  const pass = results.pct >= PASS_THRESHOLD;

  el('score-pct').textContent = pctInt + '%';
  el('score-fraction').textContent = `${results.correct}/${results.total}`;

  const circle = el('score-ring-circle');
  const circumference = 377;
  const offset = circumference - (results.pct * circumference);
  circle.style.strokeDashoffset = offset;
  circle.setAttribute('class', 'score-ring-fill ' + (pass ? 'pass' : 'fail'));

  el('result-verdict').textContent = pass ? '🎉 Pass' : 'Not Passed';
  el('result-verdict').className = 'result-verdict ' + (pass ? 'pass' : 'fail');
  el('result-subtitle').textContent = pass
    ? `Great work! You scored above the ${Math.round(PASS_THRESHOLD * 100)}% threshold.`
    : `Keep studying — aim for ${Math.round(PASS_THRESHOLD * 100)}%+ to pass.`;

  el('rs-correct').textContent = results.correct;
  el('rs-incorrect').textContent = results.total - results.correct;
  el('rs-time').textContent = fmtTime(results.timeUsed);

  // Domain breakdown
  el('domain-breakdown-list').innerHTML = DOMAIN_META.map((d, i) => {
    const dr = results.domainResults[d.id];
    if (!dr || dr.total === 0) return '';
    const pct = dr.total > 0 ? dr.correct / dr.total : 0;
    const pctInt = Math.round(pct * 100);
    return `
      <div class="db-row">
        <span class="db-name">${d.name}</span>
        <div class="db-bar-wrap">
          <div class="db-bar ${pct >= PASS_THRESHOLD ? 'pass' : 'fail'}" style="width:${pctInt}%"></div>
        </div>
        <span class="db-score">${dr.correct}/${dr.total} (${pctInt}%)</span>
      </div>`;
  }).join('');

  // Store results in state for review
  state.lastResults = results;
}

// ─── Review Screen ─────────────────────────────────────────────────────────────
function renderReview(filter) {
  state.reviewFilter = filter || state.reviewFilter;

  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === state.reviewFilter);
  });

  const results = state.lastResults;
  if (!results) return;

  let items = results.questionResults;
  if (state.reviewFilter === 'correct') items = items.filter(r => r.isCorrect);
  else if (state.reviewFilter === 'incorrect') items = items.filter(r => !r.isCorrect);
  else if (state.reviewFilter === 'flagged') items = items.filter(r => r.flagged);

  el('review-list').innerHTML = items.map((r, listIdx) => {
    const q = state.questions[r.questionIdx];
    if (!q) return '';

    const optionsHTML = q.options.map(opt => {
      const isCorrect = q.correctAnswers.includes(opt.label);
      const isSelected = r.selected.includes(opt.label);
      let cls = 'ri-option neutral';
      let icon = '';
      if (isCorrect && isSelected) { cls = 'ri-option correct'; icon = '✓ '; }
      else if (isCorrect && !isSelected) { cls = 'ri-option correct'; icon = '✓ '; }
      else if (!isCorrect && isSelected) { cls = 'ri-option incorrect'; icon = '✗ '; }
      return `<div class="${cls}">${icon}<strong>${opt.label})</strong>&nbsp;${opt.text}</div>`;
    }).join('');

    const isRep = isReported(activeCertId, q.id);

    return `
      <div class="review-item" id="ri-${r.questionIdx}">
        <div class="review-item-header" onclick="toggleReviewItem(this.parentElement)">
          <div class="ri-number ${r.isCorrect ? 'correct' : 'incorrect'}">${r.questionIdx + 1}</div>
          <div class="ri-question">${q.text}</div>
          <div class="ri-result ${r.isCorrect ? 'correct' : 'incorrect'}">${r.isCorrect ? '✓ Correct' : '✗ Incorrect'}</div>
          ${r.flagged ? '<span style="font-size:11px;color:var(--flagged);margin-left:4px">⚑</span>' : ''}
          <button class="review-report-btn${isRep ? ' reported' : ''}" title="${isRep ? 'Remove report' : 'Report issue'}" onclick="event.stopPropagation();toggleReviewReport('${activeCertId}','${q.id}',${r.questionIdx})">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
          <svg class="ri-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="review-item-body">
          <div class="ri-full-question">${q.text}</div>
          <div class="ri-options">${optionsHTML}</div>
          ${q.explanation ? `<div class="ri-explanation"><strong>Explanation:</strong> ${q.explanation}</div>` : ''}
          ${q.quote ? `<div class="ri-quote">"${q.quote}"</div>` : ''}
          ${q.sourceUrl ? `<div class="ri-source"><a href="${q.sourceUrl}" target="_blank" rel="noopener">📖 ${q.source || 'Documentation'}</a></div>` : ''}
        </div>
      </div>`;
  }).join('');

  showScreen('review');
}

function toggleReviewItem(item) {
  item.classList.toggle('open');
}

function toggleReviewReport(certId, questionId, questionIdx) {
  const q = state.questions[questionIdx];
  if (!q) return;
  toggleReport(certId, q);
  renderReview();
}

// ─── History Screen ────────────────────────────────────────────────────────────
function renderHistory() {
  const sessions = loadSessions();

  el('history-empty').classList.toggle('hidden', sessions.length > 0);

  el('history-list').innerHTML = sessions.map((s, idx) => {
    const pctInt = Math.round(s.pct * 100);
    const pass = s.pct >= PASS_THRESHOLD;
    const date = new Date(s.date);
    const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    const domainRows = DOMAIN_META.map(d => {
      const dr = s.domainResults && s.domainResults[d.id];
      if (!dr || dr.total === 0) return '';
      const dPct = Math.round((dr.correct / dr.total) * 100);
      return `<div class="detail-domain-cell">
        <div class="ddc-name">${d.name}</div>
        <div class="ddc-score">${dr.correct}/${dr.total} (${dPct}%)</div>
      </div>`;
    }).join('');

    return `
      <div>
        <div class="history-item" onclick="toggleHistoryDetail(this)">
          <div class="history-score-badge ${pass ? 'pass' : 'fail'}">
            <span class="hs-pct">${pctInt}%</span>
            <span class="hs-label">${pass ? 'Pass' : 'Fail'}</span>
          </div>
          <div class="history-info">
            <div class="hi-title">${s.correct}/${s.totalQuestions} correct &mdash; ${s.mode === 'study' ? 'Study' : 'Exam'} Mode</div>
            <div class="hi-meta">
              <span>📅 ${dateStr} ${timeStr}</span>
              <span>⏱ ${fmtTime(s.timeUsed)}</span>
              <span>❓ ${s.totalQuestions} questions</span>
            </div>
          </div>
          <svg class="history-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          <button class="history-delete-btn" title="Delete session" onclick="event.stopPropagation();deleteSession(${idx})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
        <div class="history-item-detail">
          <p style="font-size:12px;color:var(--text-secondary);margin-bottom:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Domain Results</p>
          <div class="detail-domain-grid">${domainRows}</div>
        </div>
      </div>`;
  }).join('');

  showScreen('history');
}

function toggleHistoryDetail(item) {
  const detail = item.nextElementSibling;
  if (detail && detail.classList.contains('history-item-detail')) {
    detail.classList.toggle('open');
    const chevron = item.querySelector('.history-chevron');
    if (chevron) chevron.style.transform = detail.classList.contains('open') ? 'rotate(180deg)' : '';
  }
}

function deleteSession(idx) {
  const sessions = loadSessions();
  sessions.splice(idx, 1);
  saveSessions(sessions);
  renderHistory();
  renderHome();
  showToast('Session deleted');
}

// ─── Reported Screen ───────────────────────────────────────────────────────────
function renderReportedScreen() {
  const reports = loadReportedQuestions();
  el('reported-empty').classList.toggle('hidden', reports.length > 0);
  const genBtn = el('btn-generate-email');
  genBtn.disabled = reports.length === 0;

  el('reported-list').innerHTML = reports.map((r, idx) => `
    <div class="reported-item">
      <div class="reported-item-cert">${r.certLabel} &mdash; ${r.domainName}</div>
      <div class="reported-item-text">${r.text}</div>
      <div class="reported-item-meta">
        <span class="q-type-badge">${r.type === 'multi' ? `Select ${r.selectCount}` : 'Single Answer'}</span>
        <span>Correct: ${r.correctAnswers.join(', ')}</span>
        <span>${new Date(r.reportedAt).toLocaleDateString()}</span>
      </div>
      <button class="reported-delete-btn" onclick="removeReport(${idx})" title="Remove">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>`).join('');

  showScreen('reported');
}

function removeReport(idx) {
  const reports = loadReportedQuestions();
  reports.splice(idx, 1);
  saveReportedQuestions(reports);
  updateReportBadge();
  renderReportedScreen();
}

function generateReportEmail() {
  const reports = loadReportedQuestions();
  if (!reports.length) return;

  const subject = `SnowPro Quiz \u2014 Question Reports (${reports.length})`;
  let body = `Subject: ${subject}\n\n`;
  body += `${reports.length} question(s) flagged for technical review:\n\n`;
  reports.forEach((r, i) => {
    body += `---\n[${i + 1}] ${r.certLabel} \u2014 ${r.domainName} \u2014 ${r.questionId}\n`;
    body += `Type: ${r.type === 'multi' ? `Multi Answer, Select ${r.selectCount}` : 'Single Answer'}\n`;
    body += `Correct: ${r.correctAnswers.join(', ')}\n\n`;
    body += `${r.text}\n`;
    r.options.forEach(o => { body += `  ${o.label}) ${o.text}\n`; });
    body += `\nReported: ${new Date(r.reportedAt).toLocaleDateString()}\n\n`;
  });

  const textarea = el('report-modal-body');
  textarea.value = body;
  el('report-text-modal').classList.add('open');
  textarea.select();
}

// ─── Cert Picker ───────────────────────────────────────────────────────────────
function renderCertPicker() {
  activeCertId = null;
  const container = el('cert-picker-cards');
  if (!container) { renderHome(); return; }

  container.innerHTML = Object.entries(CERT_CONFIGS).map(([id, cfg]) => {
    const data = window.CERT_DATA && window.CERT_DATA[id];
    if (!data) return '';
    const sessions = (() => {
      try { return JSON.parse(localStorage.getItem(cfg.storageKey) || '[]'); } catch { return []; }
    })();
    const best = sessions.length
      ? Math.round(Math.max(...sessions.map(s => s.pct)) * 100) + '%'
      : '—';
    return `
      <div class="cert-card" onclick="selectCert('${id}')">
        <div class="cert-card-name">${cfg.name || ''}</div>
        <div class="cert-card-label">${cfg.label}</div>
        <div class="cert-card-desc">${cfg.description}</div>
        <div class="cert-card-meta">${data.questions.length} questions &middot; ${data.domainMeta.length} domains</div>
        <div class="cert-card-stats">${sessions.length} session${sessions.length !== 1 ? 's' : ''} &middot; Best: ${best}</div>
      </div>`;
  }).join('');

  showScreen('certpicker');
}

function normalizeQuestions(questions) {
  questions.forEach(q => {
    if (q.type === 'single' && q.correctAnswers.length > 1) {
      q.type = 'multi';
      q.selectCount = q.correctAnswers.length;
    }
    if (q.type === 'multi' && q.selectCount < 2) {
      q.selectCount = q.correctAnswers.length || 2;
    }
  });
}

function selectCert(certId) {
  const cfg = CERT_CONFIGS[certId];
  const data = window.CERT_DATA && window.CERT_DATA[certId];
  if (!cfg || !data) { showToast('Certification data not loaded', 'error'); return; }
  activeCertId   = certId;
  QUESTIONS      = data.questions;
  normalizeQuestions(QUESTIONS);
  DOMAIN_META    = data.domainMeta;
  STORAGE_KEY    = cfg.storageKey;
  PASS_THRESHOLD = cfg.passThreshold;
  DOMAIN_COLORS  = cfg.domainColors;
  renderHome();
}

// ─── Event Wiring ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Home
  el('btn-start-quiz').addEventListener('click', renderSetup);
  el('btn-view-history').addEventListener('click', renderHistory);
  el('nav-home-btn').addEventListener('click', e => { e.preventDefault(); renderCertPicker(); });
  el('nav-home-shortcut-btn').addEventListener('click', () => renderCertPicker());
  el('nav-history-btn').addEventListener('click', renderHistory);

  // Setup
  el('mode-exam').addEventListener('click', () => { state.mode = 'exam'; updateModeCards(); });
  el('mode-study').addEventListener('click', () => { state.mode = 'study'; updateModeCards(); });

  el('q-count-slider').addEventListener('input', () => {
    const v = el('q-count-slider').value;
    el('q-count-val').textContent = v;
    // Smart time default: ~1.15 min/q
    if (state.mode === 'exam') {
      const smart = Math.round(parseInt(v) * 1.15);
      const clamped = Math.max(5, Math.min(120, smart));
      el('time-slider').value = clamped;
      el('time-val').textContent = clamped;
      state.timeLimit = clamped;
    }
    updateSetupDomainPreview();
  });

  el('time-slider').addEventListener('input', () => {
    el('time-val').textContent = el('time-slider').value;
  });

  el('unseen-toggle').addEventListener('change', () => {
    state.unseenOnly = el('unseen-toggle').checked;
  });

  el('btn-setup-back').addEventListener('click', renderHome);
  el('btn-start-quiz-confirm').addEventListener('click', startQuiz);

  // Quiz navigation
  el('btn-quiz-home').addEventListener('click', () => renderCertPicker());
  el('btn-prev').addEventListener('click', () => {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
      renderQuizGrid();
    }
  });

  el('btn-next').addEventListener('click', () => {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderQuestion();
      renderQuizGrid();
    }
  });

  // Flag
  el('flag-btn').addEventListener('click', () => {
    const idx = state.currentIndex;
    if (state.flagged.has(idx)) {
      state.flagged.delete(idx);
    } else {
      state.flagged.add(idx);
      showToast('Marked for review');
    }
    renderFlagBtn();
    renderQuizGrid();
    renderAnsweredCount();
  });

  // Report (quiz)
  el('report-btn').addEventListener('click', () => {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    toggleReport(activeCertId, q);
    renderReportBtn();
  });

  // Submit
  el('btn-submit-quiz').addEventListener('click', attemptSubmit);
  el('modal-cancel').addEventListener('click', () => el('submit-modal').classList.remove('open'));
  el('modal-confirm').addEventListener('click', () => {
    el('submit-modal').classList.remove('open');
    submitQuiz();
  });

  // Results
  el('btn-review-answers').addEventListener('click', () => renderReview('all'));
  el('btn-new-quiz').addEventListener('click', renderSetup);
  el('btn-results-home').addEventListener('click', renderHome);

  // Review
  el('btn-review-back').addEventListener('click', () => showScreen('results'));
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.addEventListener('click', () => renderReview(b.dataset.filter));
  });

  // History
  el('btn-history-back').addEventListener('click', () => { if (activeCertId) renderHome(); else renderCertPicker(); });
  el('btn-clear-history').addEventListener('click', () => {
    if (confirm('Clear all session history? This cannot be undone.')) {
      saveSessions([]);
      renderHistory();
      showToast('History cleared');
    }
  });

  // Reports nav
  el('nav-reports-btn').addEventListener('click', renderReportedScreen);

  // Reported screen
  el('btn-reported-back').addEventListener('click', () => {
    if (activeCertId) renderHome(); else renderCertPicker();
  });
  el('btn-reported-clear').addEventListener('click', () => {
    if (confirm('Clear all reported questions? This cannot be undone.')) {
      saveReportedQuestions([]);
      updateReportBadge();
      renderReportedScreen();
      showToast('Reports cleared');
    }
  });
  el('btn-generate-email').addEventListener('click', generateReportEmail);

  // Report text modal
  el('report-modal-close').addEventListener('click', () => {
    el('report-text-modal').classList.remove('open');
  });
  el('report-modal-copy').addEventListener('click', () => {
    const text = el('report-modal-body').value;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Report copied to clipboard', 'success');
    }).catch(() => {
      el('report-modal-body').select();
      showToast('Press Cmd+C / Ctrl+C to copy');
    });
  });

  // Init badge
  updateReportBadge();

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (state.screen !== 'quiz') return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        renderQuestion();
        renderQuizGrid();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
        renderQuizGrid();
      }
    } else if (e.key === 'f' || e.key === 'F') {
      el('flag-btn').click();
    } else if (['1','2','3','4','5','6'].includes(e.key)) {
      const q = state.questions[state.currentIndex];
      if (!q) return;
      const idx = parseInt(e.key) - 1;
      if (idx < q.options.length) {
        handleOptionClick(q.options[idx].label);
      }
    }
  });

  // Init
  renderCertPicker();
});
