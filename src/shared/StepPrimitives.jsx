// ============================================================
// Shared step-shell primitives (CLAUDE.md: progress dots,
// option-card grid, step-actions row) + the CSS custom
// properties both flows theme off of. Imported by GuidedMatch
// and (once built) SpiritDogQuiz — keep this free of
// flow-specific markup/logic.
// ============================================================

export const THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&family=Nunito:wght@400;600;700&display=swap');

.fp-page {
  --bg-page: #FBF6EC;
  --bg-card: #FFFFFF;
  --border: #E9DFC9;
  --accent: #E0A32E;
  --accent-ink: #8A5A00;
  --text-primary: #2E2B24;
  --text-muted: #7A7263;
  min-height: 100%;
  background: var(--bg-page);
  color: var(--text-primary);
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 0 0 32px;
  border-radius: 12px;
  overflow: hidden;
}
.fp-title, .fp-question { font-family: 'Quicksand', 'Nunito', sans-serif; }

.fp-progress { display: flex; gap: 6px; flex: 1; }
.fp-dot { height: 4px; flex: 1; border-radius: 2px; background: var(--border); transition: background .2s; }
.fp-dot--done { background: var(--accent); opacity: 0.5; }
.fp-dot--active { background: var(--accent); }

.fp-option-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
.fp-option-card {
  display: flex; align-items: center; gap: 10px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
  padding: 14px; cursor: pointer; transition: border-color .15s, background .15s, box-shadow .15s;
  box-shadow: 0 1px 2px rgba(46,43,36,0.04);
}
.fp-option-card:hover { border-color: var(--accent); }
.fp-option-card--selected { border-color: var(--accent); background: rgba(224,163,46,0.14); box-shadow: 0 2px 8px rgba(224,163,46,0.18); }
.fp-option-icon { font-size: 20px; }
.fp-option-label { font-size: 14px; font-weight: 600; }

.fp-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.fp-btn {
  border: none; border-radius: 12px; padding: 13px 20px; font-size: 15px; font-weight: 700;
  cursor: pointer; font-family: 'Quicksand', inherit; transition: opacity .15s, box-shadow .15s;
}
.fp-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.fp-btn--primary { background: var(--accent); color: #2E2B24; box-shadow: 0 2px 6px rgba(224,163,46,0.35); }
.fp-btn--primary:not(:disabled):hover { opacity: 0.9; }
.fp-btn--ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }
.fp-btn--full { width: 100%; margin-top: 14px; }

@media (max-width: 480px) {
  .fp-option-grid { grid-template-columns: 1fr; }
}
`

// ---------- Progress dots ----------
export function ProgressDots({ total, step }) {
  return (
    <div className="fp-progress">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`fp-dot ${i + 1 === step ? 'fp-dot--active' : ''} ${i + 1 < step ? 'fp-dot--done' : ''}`} />
      ))}
    </div>
  )
}

// ---------- Option-card grid ----------
export function OptionGrid({ options, selected, onSelect }) {
  return (
    <div className="fp-option-grid">
      {options.map(opt => (
        <div
          key={opt.value}
          className={`fp-option-card ${selected === opt.value ? 'fp-option-card--selected' : ''}`}
          onClick={() => onSelect(opt.value)}
        >
          <span className="fp-option-icon">{opt.icon}</span>
          <div className="fp-option-label">{opt.label}</div>
        </div>
      ))}
    </div>
  )
}

// ---------- Step-actions row ----------
export function StepActions({ children, style, className }) {
  return (
    <div className={`fp-actions ${className || ''}`.trim()} style={style}>
      {children}
    </div>
  )
}
