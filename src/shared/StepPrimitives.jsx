// ============================================================
// Shared step-shell primitives (CLAUDE.md: progress dots,
// option-card grid, step-actions row) + the CSS custom
// properties both flows theme off of, the page/header/eyebrow
// chrome common to all three screens, the badge/sticker card
// style shared by Landing's quiz entry and the Spirit Dog
// Quiz's archetype result, and the outbound "see all adoptable
// dogs" browse links shared by both results screens. The
// dog-result card itself lives in shared/DogCard.jsx. Imported
// by GuidedMatch, Landing, and SpiritDogQuiz — keep this free of
// flow-specific markup/logic.
// ============================================================

export const THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

.fp-page {
  --bg-page: #f5f5f5;
  --bg-card: #ffffff;
  --border: #cccaba;
  --accent: #9a6463;
  --accent-text: #f5f5f5;
  --text-primary: #37383d;
  --text-muted: #5f675d;
  min-height: 100%;
  background: var(--bg-page);
  color: var(--text-primary);
  font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 0 0 32px;
  border-radius: 12px;
  overflow: hidden;
}

.fp-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 0; }
.fp-back { background: none; border: none; color: var(--text-muted); font-size: 14px; cursor: pointer; margin-left: 16px; white-space: nowrap; }
.fp-body { padding: 28px 24px 0; max-width: 560px; margin: 0 auto; }
.fp-body--center { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 420px; padding-top: 0; }
.fp-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.fp-question { font-size: 22px; font-weight: 700; margin: 0 0 6px; }
.fp-hint { color: var(--text-muted); font-size: 14px; margin: 0 0 20px; line-height: 1.5; }

.fp-progress { display: flex; gap: 6px; flex: 1; }
.fp-dot { height: 4px; flex: 1; border-radius: 2px; background: var(--border); transition: background .2s; }
.fp-dot--done { background: var(--accent); opacity: 0.5; }
.fp-dot--active { background: var(--accent); }

.fp-option-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
.fp-option-card {
  display: flex; align-items: center; gap: 10px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
  padding: 14px; cursor: pointer; transition: border-color .15s, background .15s, box-shadow .15s;
  box-shadow: 0 1px 2px rgba(55,56,61,0.04);
}
.fp-option-card:hover { border-color: var(--accent); }
.fp-option-card--selected { border-color: var(--accent); background: rgba(154,100,99,0.14); box-shadow: 0 2px 8px rgba(154,100,99,0.18); }
.fp-option-icon { font-size: 20px; }
.fp-option-label { font-size: 14px; font-weight: 600; }

.fp-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.fp-btn {
  border: none; border-radius: 12px; padding: 13px 20px; font-size: 15px; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: opacity .15s, box-shadow .15s;
}
.fp-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.fp-btn--primary { background: var(--accent); color: var(--accent-text); box-shadow: 0 2px 6px rgba(154,100,99,0.35); }
.fp-btn--primary:not(:disabled):hover { opacity: 0.9; }
.fp-btn--ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }
.fp-btn--full { width: 100%; margin-top: 14px; }

.fp-badge-card {
  background: var(--bg-card);
  border: 2px dashed var(--accent);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(154,100,99,0.15);
}

.fp-browse-more { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border); }
.fp-browse-more-heading { font-size: 18px; font-weight: 700; margin: 0 0 12px; }
.fp-browse-more-links { display: flex; flex-direction: row; gap: 8px; }
.fp-browse-more-links .fp-btn { flex: 1; }

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

// ---------- Outbound browse links ----------
export function BrowseMoreLinks() {
  return (
    <div className="fp-browse-more">
      <h3 className="fp-browse-more-heading">See all adoptable dogs</h3>
      <div className="fp-browse-more-links">
        <a className="fp-btn fp-btn--primary" href="https://www.fostersandpaws.org/puppies" target="_blank" rel="noopener noreferrer">
          View Puppies
        </a>
        <a className="fp-btn fp-btn--primary" href="https://www.fostersandpaws.org/adult-dogs" target="_blank" rel="noopener noreferrer">
          View Adult Dogs
        </a>
      </div>
    </div>
  )
}
