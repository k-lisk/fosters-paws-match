// ============================================================
// Shared dog-result card, used by both GuidedMatch's "Your
// Matches" screen and SpiritDogQuiz's result screen — one card
// so future changes (layout, CTA, donate button, etc.) only
// happen once. Pairs a CSS export with a component export, same
// pattern as shared/StepPrimitives.jsx.
// ============================================================

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

.fp-dog-card-donate {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-page);
  border: 1px solid var(--border);
  font-size: 14px;
  text-decoration: none;
  line-height: 1;
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

.fp-dog-card-name { font-size: 17px; font-weight: 700; padding-right: 28px; }
.fp-dog-card-meta { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.fp-dog-card-bio { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0 0 10px; }
.fp-dog-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.fp-chip { font-size: 11px; background: rgba(154,100,99,0.16); color: var(--accent); border-radius: 20px; padding: 4px 10px; font-weight: 700; }
.fp-dog-card-cta { width: 100%; margin-top: auto; padding-top: 14px; }
`

// ---------- Photo placeholder (gray box, stand-in until real photos exist) ----------
function PhotoPlaceholder({ emoji }) {
  return <div className="fp-photo-placeholder">{emoji}</div>
}

// ---------- Dog result card ----------
export function DogCard({ dog, tags = [] }) {
  return (
    <div className="fp-dog-card">
      <a
        className="fp-dog-card-donate"
        href="https://fostersandpaws.org/donate"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate to Fosters & Paws"
        title="Donate"
      >
        🤍
      </a>
      <PhotoPlaceholder emoji={dog.emoji} />
      <div className="fp-dog-card-name">{dog.name}</div>
      <div className="fp-dog-card-meta">{dog.breed} · {dog.ageLabel} · {dog.size}</div>
      <p className="fp-dog-card-bio">{dog.bio}</p>
      {tags.length > 0 && (
        <div className="fp-dog-card-tags">
          {tags.map((t, i) => <span key={i} className="fp-chip">{t}</span>)}
        </div>
      )}
      <button
        className="fp-btn fp-btn--primary fp-dog-card-cta"
        onClick={() => window.alert(`In production, this would start an inquiry with Fosters & Paws about ${dog.name}.`)}
      >
        Ask about {dog.name}
      </button>
    </div>
  )
}
