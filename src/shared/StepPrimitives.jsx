// ============================================================
// Shared step-shell primitives (CLAUDE.md: section progress,
// option-card grid, step-actions row) + the CSS custom
// properties both flows theme off of, the page/header/eyebrow
// chrome common to all three screens, the badge/sticker card
// style shared by Landing's quiz entry and the Spirit Dog
// Quiz's archetype result, and the outbound "see all adoptable
// dogs" / "donate" links shared by both results screens. The
// dog-result card itself lives in shared/DogCard.jsx. Imported
// by GuidedMatch, Landing, and SpiritDogQuiz — keep this free of
// flow-specific markup/logic.
// ============================================================

import { Fragment } from 'react'
import { IconCheck } from './icons'
import { track } from './analytics'

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
  --ring-track: #e4e1d3;
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
.fp-lead { color: var(--text-muted); font-size: 15px; line-height: 1.55; margin: 0; }

/* ---------- Section progress rings ---------- */
.fp-section-progress-desktop { display: flex; align-items: flex-start; flex: 1; }
.fp-section-ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.fp-section-ring { border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.fp-section-ring--done { background: var(--accent); }
.fp-section-ring--upcoming { border: 2px solid var(--border); background: transparent; box-sizing: border-box; }
.fp-section-ring-inner { width: calc(100% - 6px); height: calc(100% - 6px); border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--text-primary); }
.fp-section-label { font-size: 11px; font-weight: 600; color: var(--text-muted); white-space: nowrap; }
.fp-section-label--done, .fp-section-label--active { color: var(--text-primary); font-weight: 700; }
.fp-section-connector { flex: 1; height: 2px; background: var(--border); margin: 21px 6px 0; align-self: flex-start; }
.fp-section-connector--done { background: var(--accent); }

.fp-section-progress-mobile { display: none; align-items: center; gap: 10px; flex: 1; }
.fp-section-progress-mobile-text { display: flex; flex-direction: column; }
.fp-section-progress-mobile-text .fp-section-name { font-size: 13px; font-weight: 700; color: var(--text-primary); }
.fp-section-progress-mobile-text .fp-section-count { font-size: 11px; color: var(--text-muted); }

.fp-option-grid { margin-bottom: 12px; }
.fp-option-grid--stack { display: flex; flex-direction: column; gap: 8px; }
.fp-option-grid--grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.fp-option-card {
  display: flex; align-items: center; gap: 10px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
  padding: 14px; cursor: pointer; transition: border-color .15s, background .15s, box-shadow .15s;
  box-shadow: 0 1px 2px rgba(55,56,61,0.04);
  box-sizing: border-box;
}
.fp-option-card:hover { border-color: var(--accent); }
.fp-option-card--selected { border-color: var(--accent); background: rgba(154,100,99,0.14); box-shadow: 0 2px 8px rgba(154,100,99,0.18); }
.fp-option-card--widow { grid-column: 1 / -1; justify-self: center; width: calc(50% - 4px); }
.fp-option-label { font-size: 14px; font-weight: 600; }

.fp-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.fp-btn {
  border: none; border-radius: 12px; padding: 13px 20px; font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: opacity .15s, box-shadow .15s, background .15s;
  text-align: center; text-decoration: none;
}
.fp-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.fp-btn--primary { background: var(--accent); color: var(--accent-text); box-shadow: 0 2px 6px rgba(154,100,99,0.35); }
.fp-btn--primary:not(:disabled):hover { opacity: 0.9; }
.fp-btn--secondary { background: #ffffff; color: var(--accent); border: 1.5px solid var(--accent); padding: 11.5px 20px; }
.fp-btn--secondary:not(:disabled):hover { background: rgba(154,100,99,0.08); }
.fp-btn--tertiary { background: transparent; color: var(--text-muted); border: none; font-weight: 600; }
.fp-btn--tertiary:not(:disabled):hover { opacity: 0.7; }
.fp-btn--donate { background: var(--text-primary); color: #ffffff; border: none; box-shadow: 0 2px 8px rgba(55,56,61,0.3); }
.fp-btn--donate:not(:disabled):hover { opacity: 0.9; }
.fp-btn--ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }
.fp-btn--full { display: block; width: 100%; margin-top: 14px; box-sizing: border-box; }

.fp-spinner { width: 28px; height: 28px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: fp-spin .7s linear infinite; }
@keyframes fp-spin { to { transform: rotate(360deg); } }

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
  .fp-option-grid--grid2 { grid-template-columns: 1fr; }
  .fp-option-card--widow { width: 100%; }
  .fp-section-progress-desktop { display: none; }
  .fp-section-progress-mobile { display: flex; }
}
`

// ---------- Section-aware progress rings ----------
function SectionRing({ section, size }) {
  const style = { width: size, height: size }
  if (section.status === 'done') {
    return (
      <div className="fp-section-ring fp-section-ring--done" style={style}>
        <IconCheck size={Math.round(size * 0.42)} color="#ffffff" strokeWidth={2.6} />
      </div>
    )
  }
  if (section.status === 'active') {
    const fraction = (section.position / section.total) * 360
    return (
      <div
        className="fp-section-ring fp-section-ring--active"
        style={{ ...style, background: `conic-gradient(var(--accent) 0deg ${fraction}deg, var(--ring-track) ${fraction}deg 360deg)` }}
      >
        <div className="fp-section-ring-inner">{section.position}/{section.total}</div>
      </div>
    )
  }
  return <div className="fp-section-ring fp-section-ring--upcoming" style={style} />
}

function groupSections(steps, step) {
  const groups = []
  steps.forEach(s => {
    const last = groups[groups.length - 1]
    if (last && last.name === s.section) last.total += 1
    else groups.push({ name: s.section, total: 1 })
  })
  let cursor = 0
  return groups.map(g => {
    const start = cursor + 1
    const end = cursor + g.total
    cursor = end
    let status = 'upcoming'
    let position = 0
    if (step > end) status = 'done'
    else if (step >= start) { status = 'active'; position = step - start + 1 }
    return { ...g, start, end, status, position }
  })
}

export function SectionProgress({ steps, step }) {
  const sections = groupSections(steps, step)
  const activeIndex = sections.findIndex(s => s.status === 'active')
  const active = activeIndex === -1 ? sections[sections.length - 1] : sections[activeIndex]

  return (
    <>
      <div className="fp-section-progress-desktop">
        {sections.map((s, i) => (
          <Fragment key={s.name}>
            {i > 0 && <div className={`fp-section-connector ${sections[i - 1].status === 'done' ? 'fp-section-connector--done' : ''}`} />}
            <div className="fp-section-ring-wrap">
              <SectionRing section={s} size={42} />
              <span className={`fp-section-label fp-section-label--${s.status}`}>{s.name}</span>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="fp-section-progress-mobile">
        <SectionRing section={active} size={38} />
        <div className="fp-section-progress-mobile-text">
          <span className="fp-section-name">{active.name}</span>
          <span className="fp-section-count">Section {(activeIndex === -1 ? sections.length - 1 : activeIndex) + 1} of {sections.length}</span>
        </div>
      </div>
    </>
  )
}

// ---------- Option-card grid ----------
export function OptionGrid({ options, selected, onSelect }) {
  const count = options.length
  const layoutClass = count <= 3 ? 'fp-option-grid--stack' : 'fp-option-grid--grid2'
  const hasWidow = count >= 5 && count % 2 === 1

  return (
    <div className={`fp-option-grid ${layoutClass}`}>
      {options.map((opt, i) => {
        const isWidow = hasWidow && i === count - 1
        return (
          <div
            key={opt.value}
            className={`fp-option-card ${selected === opt.value ? 'fp-option-card--selected' : ''} ${isWidow ? 'fp-option-card--widow' : ''}`.trim()}
            onClick={() => onSelect(opt.value)}
          >
            <div className="fp-option-label">{opt.label}</div>
          </div>
        )
      })}
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
        <a className="fp-btn fp-btn--secondary" href="https://www.fostersandpaws.org/puppies" target="_blank" rel="noopener noreferrer">
          View Puppies
        </a>
        <a className="fp-btn fp-btn--secondary" href="https://www.fostersandpaws.org/adult-dogs" target="_blank" rel="noopener noreferrer">
          View Adult Dogs
        </a>
      </div>
    </div>
  )
}

// ---------- Donate CTA ----------
export function DonateButton({ style, source }) {
  return (
    <a
      className="fp-btn fp-btn--donate fp-btn--full"
      style={style}
      href="https://www.fostersandpaws.org/donate"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('donate_clicked', { source })}
    >
      Donate to the rescue
    </a>
  )
}
