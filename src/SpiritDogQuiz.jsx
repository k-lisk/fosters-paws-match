import { useState, useMemo } from 'react'
import { THEME_CSS, ProgressDots, OptionGrid, StepActions } from './shared/StepPrimitives'
import { ENERGY_SCALE, MOCK_DOGS } from './shared/mockDogs'

// ============================================================
// Fosters & Paws — Spirit Dog Quiz (Feature 2, Phase 1)
// Lighter, faster sibling to GuidedMatch — 5 personality
// questions map to an original archetype, which maps back to
// real MOCK_DOGS via the same closeness-scoring pattern as
// GuidedMatch's matching engine. See SPIRIT_DOG_ARCHETYPES.md.
// Entered from the shared Landing screen — see App.jsx.
// ============================================================

// ---------- Question definitions ----------
const QUIZ_QUESTIONS = [
  {
    id: 'q1', question: 'Your ideal Saturday?',
    options: [
      { value: 'A', label: 'Sleeping in, no plans', icon: '😴', energy: 0, size: 'Small' },
      { value: 'B', label: 'Coffee shop, low-key hang', icon: '☕', energy: 1, size: 'Small' },
      { value: 'C', label: 'Depends on my mood', icon: '🤷', energy: 2, size: null },
      { value: 'D', label: 'Big hike, need the whole day', icon: '🥾', energy: 3, size: 'Big' },
      { value: 'E', label: "Nonstop plans, can't sit still", icon: '🎉', energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q2', question: 'Pick a snack.',
    options: [
      { value: 'A', label: "Whatever's closest — I'm not moving", icon: '🛋️', energy: 0, size: 'Small' },
      { value: 'B', label: 'Something slow and comforting', icon: '🍵', energy: 1, size: 'Small' },
      { value: 'C', label: "Depends what's in the fridge", icon: '🥪', energy: 2, size: null },
      { value: 'D', label: 'Something I can eat on the go', icon: '🍎', energy: 3, size: 'Big' },
      { value: 'E', label: 'Anything. I will also steal yours', icon: '😈', energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q3', question: 'Pick a soundtrack for your life.',
    options: [
      { value: 'A', label: 'Ambient, barely audible', icon: '🌫️', energy: 0, size: null },
      { value: 'B', label: 'Acoustic, chill', icon: '🎸', energy: 1, size: null },
      { value: 'C', label: "Whatever's on shuffle", icon: '🔀', energy: 2, size: null },
      { value: 'D', label: 'Upbeat, gets you moving', icon: '🎶', energy: 3, size: null },
      { value: 'E', label: 'Full chaos playlist, no skips', icon: '🤘', energy: 4, size: null },
    ],
  },
  {
    id: 'q4', question: 'Your friends would describe you as...',
    options: [
      { value: 'A', label: 'The one who never leaves the couch', icon: '🛋️', energy: 0, size: 'Small' },
      { value: 'B', label: 'Low-maintenance, easygoing', icon: '😌', energy: 1, size: 'Small' },
      { value: 'C', label: 'Unpredictable, in a good way', icon: '🎲', energy: 2, size: null },
      { value: 'D', label: 'Reliable, but always down for it', icon: '💪', energy: 3, size: 'Big' },
      { value: 'E', label: 'A lot. In all caps', icon: '📢', energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q5', question: 'Pick your ideal home base.',
    options: [
      { value: 'A', label: 'A single cozy blanket fort', icon: '🏕️', energy: 0, size: 'Small' },
      { value: 'B', label: 'A quiet corner with a good view', icon: '🪟', energy: 1, size: 'Small' },
      { value: 'C', label: 'Wherever the group ends up', icon: '👥', energy: 2, size: null },
      { value: 'D', label: 'Somewhere with room to roam', icon: '🏡', energy: 3, size: 'Big' },
      { value: 'E', label: 'Open floor space to zoom around', icon: '🌀', energy: 4, size: 'Big' },
    ],
  },
]

const TOTAL_STEPS = QUIZ_QUESTIONS.length

// ---------- Archetypes ----------
const ARCHETYPES = [
  { id: 'napper', name: 'The Professional Napper', emoji: '🦥', blurb: "You've mastered the art of doing absolutely nothing, beautifully.", energyIdx: 0, sizeLean: 'Small' },
  { id: 'zen', name: 'The Zen Master', emoji: '😌', blurb: "Steady, warm, unbothered. You're everyone's favorite calming presence.", energyIdx: 1, sizeLean: 'Big' },
  { id: 'wildcard', name: 'The Wildcard', emoji: '🎲', blurb: "Nobody — including you — knows what you're doing this weekend.", energyIdx: 2, sizeLean: 'Big' },
  { id: 'overachiever', name: 'The Overachiever', emoji: '🔥', blurb: 'You have a five-year plan and a workout routine. Impressive. Exhausting.', energyIdx: 3, sizeLean: 'Big' },
  { id: 'chaos', name: 'The Chaos Gremlin', emoji: '⚡', blurb: 'Pure, unfiltered energy. A menace. We love you.', energyIdx: 4, sizeLean: 'Big' },
  { id: 'menace', name: 'The Spicy Little Menace', emoji: '🌶️', blurb: 'Small enough to carry, too much attitude to actually try.', energyIdx: 3.5, sizeLean: 'Small' },
]

// ---------- Profile + closeness scoring (mirrors GuidedMatch's matching engine) ----------
function computeProfile(answers) {
  const chosen = QUIZ_QUESTIONS.map(q => q.options.find(o => o.value === answers[q.id]))
  const avgEnergy = chosen.reduce((sum, o) => sum + o.energy, 0) / chosen.length
  const energyIdx = Math.round(avgEnergy)

  let smallVotes = 0
  let bigVotes = 0
  chosen.forEach(o => {
    if (o.size === 'Small') smallVotes++
    else if (o.size === 'Big') bigVotes++
  })
  const sizeLean = smallVotes > bigVotes ? 'Small' : 'Big' // tie (including 0-0) leans Big, per spec

  return { energyIdx, sizeLean }
}

function pickArchetype(profile) {
  let best = ARCHETYPES[0]
  let bestScore = -1
  for (const archetype of ARCHETYPES) {
    const energyScore = 1 - Math.abs(archetype.energyIdx - profile.energyIdx) / (ENERGY_SCALE.length - 1)
    const sizeScore = archetype.sizeLean === profile.sizeLean ? 1 : 0
    const score = energyScore * 0.6 + sizeScore * 0.4
    if (score > bestScore) { bestScore = score; best = archetype }
  }
  return best
}

function sizeLeanFit(dogSize, sizeLean) {
  if (sizeLean === 'Small') return dogSize === 'Small' ? 1 : dogSize === 'Medium' ? 0.5 : 0
  return dogSize === 'Large' ? 1 : dogSize === 'Medium' ? 0.5 : 0 // sizeLean === 'Big'
}

function matchDogs(archetype) {
  const scored = MOCK_DOGS.map(dog => {
    const dogIdx = ENERGY_SCALE.indexOf(dog.energy)
    const energyScore = 1 - Math.abs(dogIdx - archetype.energyIdx) / (ENERGY_SCALE.length - 1)
    const sizeScore = sizeLeanFit(dog.size, archetype.sizeLean)
    return { dog, score: energyScore * 0.6 + sizeScore * 0.4 }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2).map(s => s.dog) // no threshold — always top 2, so the P1 fallback holds by construction
}

function shareText(archetype) {
  return `I'm ${archetype.name} ${archetype.emoji} — take the quiz and find your spirit dog at Fosters & Paws`
}

// ---------- Spirit Dog Quiz component ----------
export default function SpiritDogQuiz({ onAdopt, onExit }) {
  const [phase, setPhase] = useState('quiz') // quiz | result
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [shareStatus, setShareStatus] = useState(null)

  const current = QUIZ_QUESTIONS[step - 1]

  function goBack() {
    if (step === 1) { onExit?.(); return }
    setStep(s => s - 1)
  }

  function selectAnswer(value) {
    const nextAnswers = { ...answers, [current.id]: value }
    setAnswers(nextAnswers)
    setTimeout(() => {
      if (step >= TOTAL_STEPS) setPhase('result')
      else setStep(s => s + 1)
    }, 200)
  }

  const result = useMemo(() => {
    if (phase !== 'result') return null
    const profile = computeProfile(answers)
    const archetype = pickArchetype(profile)
    const dogs = matchDogs(archetype)
    return { archetype, dogs, energyLabel: ENERGY_SCALE[profile.energyIdx] }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function retake() {
    setAnswers({})
    setStep(1)
    setShareStatus(null)
    setPhase('quiz')
  }

  async function handleShare() {
    const text = shareText(result.archetype)
    if (navigator.share) {
      try { await navigator.share({ text }) } catch { /* user cancelled — no-op */ }
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setShareStatus('copied')
        setTimeout(() => setShareStatus(null), 1500)
      } catch { /* clipboard unavailable — no-op */ }
    }
  }

  return (
    <div className="fp-page">
      <style>{THEME_CSS}{CSS}</style>

      {phase === 'quiz' && current && (
        <>
          <div className="fp-header">
            <ProgressDots total={TOTAL_STEPS} step={step} />
            <button className="fp-back" onClick={goBack}>← Back</button>
          </div>

          <div className="fp-body">
            <div className="fp-eyebrow">Spirit Dog Quiz</div>
            <h2 className="fp-question">{current.question}</h2>
            <OptionGrid options={current.options} selected={answers[current.id]} onSelect={selectAnswer} />
          </div>
        </>
      )}

      {phase === 'result' && result && (
        <div className="fp-body">
          <div className="fp-eyebrow">Your spirit dog is...</div>

          <div className="fp-badge-card fp-archetype-card">
            <div className="fp-archetype-emoji">{result.archetype.emoji}</div>
            <h2 className="fp-archetype-name">{result.archetype.name}</h2>
            <p className="fp-archetype-blurb">{result.archetype.blurb}</p>
          </div>

          <h3 className="fp-question fp-quiz-dogs-heading">Dogs with this energy right now</h3>
          <div className="fp-quiz-dog-grid">
            {result.dogs.map(dog => (
              <div key={dog.id} className="fp-quiz-dog-card">
                <div className="fp-quiz-dog-emoji">{dog.emoji}</div>
                <div className="fp-quiz-dog-name">{dog.name}</div>
                <div className="fp-quiz-dog-meta">{dog.breed} · {dog.ageLabel} · {dog.size}</div>
                <p className="fp-quiz-dog-bio">{dog.bio}</p>
              </div>
            ))}
          </div>

          <StepActions style={{ marginTop: 24 }}>
            <button className="fp-btn fp-btn--primary" onClick={() => onAdopt?.(result.energyLabel)}>
              Adopt — start my full match
            </button>
            <a
              className="fp-btn fp-btn--ghost"
              href="https://fostersandpaws.org/donate"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
            <button className="fp-btn fp-btn--ghost" onClick={handleShare}>
              {shareStatus === 'copied' ? 'Copied!' : 'Share my result'}
            </button>
            <button className="fp-btn fp-btn--ghost" onClick={retake}>Retake the quiz</button>
          </StepActions>
        </div>
      )}
    </div>
  )
}

// ---------- Styles (quiz-specific — shared tokens/primitives/chrome live in shared/StepPrimitives) ----------
const CSS = `
.fp-archetype-card { text-align: center; margin: 12px 0 28px; }
.fp-archetype-emoji { font-size: 48px; margin-bottom: 8px; }
.fp-archetype-name { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
.fp-archetype-blurb { color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0; }
.fp-quiz-dogs-heading { font-size: 16px; margin-bottom: 12px; }
.fp-quiz-dog-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fp-quiz-dog-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 18px; box-shadow: 0 1px 3px rgba(55,56,61,0.06); }
.fp-quiz-dog-emoji { font-size: 30px; margin-bottom: 6px; }
.fp-quiz-dog-name { font-size: 17px; font-weight: 700; }
.fp-quiz-dog-meta { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.fp-quiz-dog-bio { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0; }
@media (max-width: 480px) {
  .fp-quiz-dog-grid { grid-template-columns: 1fr; }
}
`
