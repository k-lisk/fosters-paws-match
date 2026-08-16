import { useEffect } from 'react'
import { THEME_CSS } from './shared/StepPrimitives'
import { track } from './shared/analytics'

// ============================================================
// Fosters & Paws — Landing screen
// Shared entry point for both Phase 1 flows: the serious Guided
// Adoption Match and the lighter Spirit Dog Quiz. Toggled from
// App.jsx via local state, not routes (see CLAUDE.md).
// "Visually distinct" here means brand presence, not just
// color: the serious card carries the real logo/wordmark, the
// quiz card gets the badge/sticker treatment shared with the
// quiz's own archetype result card (see shared/StepPrimitives).
// The quiz card renders first/primary (fp-btn--primary) as the
// top-of-funnel hook; Find My Match is secondary here even
// though it remains the substantive conversion flow — see
// DECISIONS.md.
// ============================================================

export default function Landing({ onFindMatch, onSpiritQuiz }) {
  useEffect(() => { track('landing_viewed') }, [])

  return (
    <div className="fp-page">
      <style>{THEME_CSS}{CSS}</style>
      <div className="fp-body fp-body--center">
        <div className="fp-landing">
          <h1 className="fp-title">Meet your next best friend</h1>
          <p className="fp-lead">Two ways to get started — pick whatever fits your mood.</p>

          <div className="fp-entry-grid">
            <div className="fp-entry-card fp-badge-card">
              <img src="/logos/FP_Paw_FullColor.svg" alt="" aria-hidden="true" className="fp-entry-paw" />
              <h2 className="fp-entry-title">What's my spirit dog?</h2>
              <p className="fp-entry-body">
                Just for fun — 6 quick questions, with a real dog match waiting at the end.
              </p>
              <button className="fp-btn fp-btn--primary fp-btn--full" onClick={onSpiritQuiz}>
                What's my spirit dog?
              </button>
            </div>

            <div className="fp-entry-card fp-entry-card--serious">
              <img src="/logos/FP_Logo_FullColor.svg" alt="Fosters & Paws" className="fp-entry-logo" />
              <h2 className="fp-entry-title">Find my match</h2>
              <p className="fp-entry-body">
                A guided, ~11 question flow matched against real dogs in our care.
              </p>
              <button className="fp-btn fp-btn--ghost fp-btn--full" onClick={onFindMatch}>
                Find my match
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Styles (landing-specific — shared tokens/primitives live in shared/StepPrimitives) ----------
const CSS = `
.fp-landing { max-width: 640px; }
.fp-title { font-size: 26px; font-weight: 700; margin: 0 0 12px; }
.fp-lead { color: var(--text-muted); font-size: 15px; line-height: 1.55; margin: 0; }
.fp-entry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; text-align: left; }
.fp-entry-card { display: flex; flex-direction: column; position: relative; }
.fp-entry-card--serious {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
  padding: 20px; box-shadow: 0 1px 3px rgba(55,56,61,0.06);
}
.fp-entry-logo { width: 100%; max-width: 200px; height: auto; margin-bottom: 14px; }
.fp-entry-title { font-size: 17px; font-weight: 700; margin: 0 0 6px; }
.fp-entry-body { color: var(--text-muted); font-size: 13px; line-height: 1.5; margin: 0 0 16px; flex: 1; }
.fp-entry-paw { position: absolute; top: -12px; right: -12px; width: 42px; height: 42px; }
@media (max-width: 480px) {
  .fp-entry-grid { grid-template-columns: 1fr; }
}
`
