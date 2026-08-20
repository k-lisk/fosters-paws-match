// ============================================================
// Shared dog-result card, used by both GuidedMatch's "Your
// Matches" screen and SpiritDogQuiz's result screen — one card
// so future changes (layout, CTA, tags, etc.) only happen once.
// Pairs a CSS export with a component export, same pattern as
// shared/StepPrimitives.jsx. Renders a real photo when dog.photo
// is present (live ShelterLuv data), falling back to the emoji
// placeholder otherwise (MOCK_DOGS, or a live photo that fails to
// load) — see DECISIONS.md for the Phase 2 integration.
// ============================================================

import { useState } from 'react'

const TAG_CAP = 4
const BIO_TRUNCATE_LENGTH = 160

export const DOG_CARD_CSS = `
.fp-dog-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
@media (max-width: 480px) {
  .fp-dog-card-grid { grid-template-columns: 1fr; }
}

.fp-dog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(55,56,61,0.06);
  box-sizing: border-box;
}

.fp-photo-placeholder {
  aspect-ratio: 4 / 3;
  background: var(--bg-page);
  border: 1px solid var(--border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 10px;
}
.fp-dog-photo {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 10px;
  display: block;
}

.fp-dog-card-name { font-size: 17px; font-weight: 700; }
.fp-dog-card-meta { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.fp-dog-card-bio { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0 0 10px; }
.fp-dog-card-bio-toggle {
  display: inline; background: none; border: none; padding: 0; margin-left: 4px;
  color: var(--accent); font-weight: 700; font-size: inherit; font-family: inherit;
  cursor: pointer; text-decoration: underline;
}
.fp-dog-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.fp-chip { font-size: 11.5px; background: rgba(154,100,99,0.14); color: var(--accent); border-radius: 20px; padding: 6px 13px; font-weight: 700; }
.fp-chip--more { background: #efece2; color: var(--text-muted); }
.fp-dog-card-cta { width: 100%; margin-top: auto; }
.fp-dog-card-cta.fp-btn--secondary { padding: 9px 16px; font-size: 13px; border-radius: 10px; }
`

// ---------- Photo placeholder (gray box, used for mock data and as a fallback if a real photo fails to load) ----------
function PhotoPlaceholder({ emoji }) {
  return <div className="fp-photo-placeholder">{emoji || '🐾'}</div>
}

// ---------- Photo (real image for live data, placeholder otherwise) ----------
function DogPhoto({ dog }) {
  const [failed, setFailed] = useState(false)
  if (dog.photo && !failed) {
    return <img src={dog.photo} alt={dog.name} className="fp-dog-photo" onError={() => setFailed(true)} />
  }
  return <PhotoPlaceholder emoji={dog.emoji} />
}

// ---------- Dog result card ----------
export function DogCard({ dog, tags = [] }) {
  const shown = tags.slice(0, TAG_CAP)
  const overflow = tags.length - shown.length

  const [bioExpanded, setBioExpanded] = useState(false)
  const bio = dog.bio || ''
  const bioIsLong = bio.length > BIO_TRUNCATE_LENGTH
  const bioText = bioIsLong && !bioExpanded ? `${bio.slice(0, BIO_TRUNCATE_LENGTH).trimEnd()}…` : bio

  return (
    <div className="fp-dog-card">
      <DogPhoto dog={dog} />
      <div className="fp-dog-card-name">{dog.name}</div>
      <div className="fp-dog-card-meta">{dog.breed} · {dog.ageLabel} · {dog.size}</div>
      <p className="fp-dog-card-bio">
        {bioText}
        {bioIsLong && (
          <button type="button" className="fp-dog-card-bio-toggle" onClick={() => setBioExpanded(e => !e)}>
            {bioExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
      {shown.length > 0 && (
        <div className="fp-dog-card-tags">
          {shown.map((t, i) => <span key={i} className="fp-chip">{t}</span>)}
          {overflow > 0 && <span className="fp-chip fp-chip--more">+{overflow} more</span>}
        </div>
      )}
      <button
        className="fp-btn fp-btn--secondary fp-dog-card-cta"
        onClick={() => window.alert(`In production, this would start an inquiry with Fosters & Paws about ${dog.name}.`)}
      >
        Learn more
      </button>
    </div>
  )
}
