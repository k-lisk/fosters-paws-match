import { useState, useMemo } from 'react'
import { THEME_CSS, SectionProgress, OptionGrid, StepActions, BrowseMoreLinks, DonateButton } from './shared/StepPrimitives'
import { DogCard, DOG_CARD_CSS } from './shared/DogCard'
import { ENERGY_SCALE, MOCK_DOGS } from './shared/mockDogs'
import { IconZzz, IconWaves, IconDice, IconGradCap, IconDevilFace, IconFlame } from './shared/icons'

// ============================================================
// Fosters & Paws — Spirit Dog Quiz (Feature 2, Phase 1)
// Lighter, faster sibling to GuidedMatch — 6 personality
// questions across 3 themed sections map to an original
// archetype, which maps back to real MOCK_DOGS via the same
// closeness-scoring pattern as GuidedMatch's matching engine,
// guaranteeing one Puppy-category and one Adult-category dog.
// See SPIRIT_DOG_ARCHETYPES.md. Entered from the shared Landing
// screen — see App.jsx.
// ============================================================

// ---------- Question definitions ----------
const QUIZ_QUESTIONS = [
  {
    id: 'q1', section: 'Vibe Check', question: 'Your ideal Saturday?',
    options: [
      { value: 'A', label: 'Sleeping in, no plans', energy: 0, size: 'Small' },
      { value: 'B', label: 'Coffee shop, low-key hang', energy: 1, size: 'Small' },
      { value: 'C', label: 'Depends on my mood', energy: 2, size: null },
      { value: 'D', label: 'Big hike, need the whole day', energy: 3, size: 'Big' },
      { value: 'E', label: "Nonstop plans, can't sit still", energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q4', section: 'Vibe Check', question: 'Your friends would describe you as...',
    options: [
      { value: 'A', label: 'The one who never leaves the couch', energy: 0, size: 'Small' },
      { value: 'B', label: 'Low-maintenance, easygoing', energy: 1, size: 'Small' },
      { value: 'C', label: 'Unpredictable, in a good way', energy: 2, size: null },
      { value: 'D', label: 'Reliable, but always down for it', energy: 3, size: 'Big' },
      { value: 'E', label: 'A lot. In all caps', energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q2', section: 'Recharge & Refuel', question: 'Pick a snack.',
    options: [
      { value: 'A', label: "Whatever's closest — I'm not moving", energy: 0, size: 'Small' },
      { value: 'B', label: 'Something slow and comforting', energy: 1, size: 'Small' },
      { value: 'C', label: "Depends what's in the fridge", energy: 2, size: null },
      { value: 'D', label: 'Something I can eat on the go', energy: 3, size: 'Big' },
      { value: 'E', label: 'Anything. I will also steal yours', energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q6', section: 'Recharge & Refuel', question: 'How do you recharge after a long week?',
    options: [
      { value: 'A', label: 'Total hibernation mode', energy: 0, size: 'Small' },
      { value: 'B', label: 'A quiet night in, low-key', energy: 1, size: 'Small' },
      { value: 'C', label: 'Whatever the week calls for', energy: 2, size: null },
      { value: 'D', label: 'Get outside and move', energy: 3, size: 'Big' },
      { value: 'E', label: 'Go even harder — rest is for later', energy: 4, size: 'Big' },
    ],
  },
  {
    id: 'q3', section: 'Energy & Home Base', question: 'Pick a soundtrack for your life.',
    options: [
      { value: 'A', label: 'Ambient, barely audible', energy: 0, size: null },
      { value: 'B', label: 'Acoustic, chill', energy: 1, size: null },
      { value: 'C', label: "Whatever's on shuffle", energy: 2, size: null },
      { value: 'D', label: 'Upbeat, gets you moving', energy: 3, size: null },
      { value: 'E', label: 'Full chaos playlist, no skips', energy: 4, size: null },
    ],
  },
  {
    id: 'q5', section: 'Energy & Home Base', question: 'Pick your ideal home base.',
    options: [
      { value: 'A', label: 'A single cozy blanket fort', energy: 0, size: 'Small' },
      { value: 'B', label: 'A quiet corner with a good view', energy: 1, size: 'Small' },
      { value: 'C', label: 'Wherever the group ends up', energy: 2, size: null },
      { value: 'D', label: 'Somewhere with room to roam', energy: 3, size: 'Big' },
      { value: 'E', label: 'Open floor space to zoom around', energy: 4, size: 'Big' },
    ],
  },
]

const TOTAL_STEPS = QUIZ_QUESTIONS.length

// ---------- Archetypes ----------
const ARCHETYPES = [
  { id: 'napper', name: 'The Professional Napper', icon: IconZzz, blurb: "You've mastered the art of doing absolutely nothing, beautifully.", energyIdx: 0, sizeLean: 'Small' },
  { id: 'zen', name: 'The Zen Master', icon: IconWaves, blurb: "Steady, warm, unbothered. You're everyone's favorite calming presence.", energyIdx: 1, sizeLean: 'Big' },
  { id: 'wildcard', name: 'The Wildcard', icon: IconDice, blurb: "Nobody — including you — knows what you're doing this weekend.", energyIdx: 2, sizeLean: 'Big' },
  { id: 'overachiever', name: 'The Overachiever', icon: IconGradCap, blurb: 'You have a five-year plan and a workout routine. Impressive. Exhausting.', energyIdx: 3, sizeLean: 'Big' },
  { id: 'chaos', name: 'The Chaos Gremlin', icon: IconDevilFace, blurb: 'Pure, unfiltered energy. A menace. We love you.', energyIdx: 4, sizeLean: 'Big' },
  { id: 'menace', name: 'The Spicy Little Menace', icon: IconFlame, blurb: 'Small enough to carry, too much attitude to actually try.', energyIdx: 3.5, sizeLean: 'Small' },
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

// Guarantees one Puppy-category and one Adult-category dog (not just top-2-by-
// closeness), still ranked by closeness within the pair so the closer match
// displays first — consistent with the quiz's "ranked, not shuffled" results.
function matchDogs(archetype) {
  const scoreDog = dog => {
    const dogIdx = ENERGY_SCALE.indexOf(dog.energy)
    const energyScore = 1 - Math.abs(dogIdx - archetype.energyIdx) / (ENERGY_SCALE.length - 1)
    const sizeScore = sizeLeanFit(dog.size, archetype.sizeLean)
    return energyScore * 0.6 + sizeScore * 0.4
  }
  // Picks randomly among ties at the top score, not just the first array entry —
  // otherwise same-profile dogs (e.g. littermates) would always resolve to
  // whichever was added first, defeating the point of having more than one.
  const topByCategory = category => {
    const pool = MOCK_DOGS
      .filter(dog => dog.ageCategory === category)
      .map(dog => ({ dog, score: scoreDog(dog) }))
    const topScore = Math.max(...pool.map(p => p.score))
    const tied = pool.filter(p => p.score === topScore)
    return tied[Math.floor(Math.random() * tied.length)]
  }

  return [topByCategory('Adult'), topByCategory('Puppy')]
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map(s => s.dog)
}

// ---------- Spirit Dog Quiz component ----------
export default function SpiritDogQuiz({ onAdopt, onExit }) {
  const [phase, setPhase] = useState('quiz') // quiz | result
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})

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
    setPhase('quiz')
  }

  return (
    <div className="fp-page">
      <style>{THEME_CSS}{DOG_CARD_CSS}{CSS}</style>

      {phase === 'quiz' && current && (
        <>
          <div className="fp-header">
            <SectionProgress steps={QUIZ_QUESTIONS} step={step} />
            <button className="fp-back" onClick={goBack}>← Back</button>
          </div>

          <div className="fp-body">
            <div className="fp-eyebrow">{current.section}</div>
            <h2 className="fp-question">{current.question}</h2>
            <OptionGrid options={current.options} selected={answers[current.id]} onSelect={selectAnswer} />
          </div>
        </>
      )}

      {phase === 'result' && result && (
        <div className="fp-body">
          <div className="fp-eyebrow">Your spirit dog is...</div>

          <div className="fp-badge-card fp-archetype-card">
            <div className="fp-archetype-badge">
              <result.archetype.icon size={28} />
            </div>
            <h2 className="fp-archetype-name">{result.archetype.name}</h2>
            <p className="fp-archetype-blurb">{result.archetype.blurb}</p>
          </div>

          <h3 className="fp-question fp-quiz-dogs-heading">Dogs with this energy right now</h3>
          <div className="fp-dog-card-grid">
            {result.dogs.map(dog => (
              <DogCard key={dog.id} dog={dog} tags={[dog.ageCategory]} />
            ))}
          </div>

          <StepActions style={{ marginTop: 24 }}>
            <button className="fp-btn fp-btn--primary" onClick={() => onAdopt?.(result.energyLabel)}>
              Find my match
            </button>
            <p className="fp-adopt-subtext">11 quick questions → your real matches.</p>
            <DonateButton style={{ marginTop: 0 }} />
            <button className="fp-btn fp-btn--tertiary" onClick={retake}>Retake the quiz</button>
          </StepActions>

          <BrowseMoreLinks />
        </div>
      )}
    </div>
  )
}

// ---------- Styles (quiz-specific — shared tokens/primitives/chrome live in shared/StepPrimitives) ----------
const CSS = `
.fp-archetype-card { text-align: center; margin: 12px 0 28px; }
.fp-archetype-badge {
  width: 56px; height: 56px; border-radius: 50%; background: rgba(154,100,99,0.14);
  display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;
}
.fp-archetype-name { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
.fp-archetype-blurb { color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0; }
.fp-quiz-dogs-heading { font-size: 16px; margin-bottom: 12px; }
.fp-adopt-subtext { color: var(--text-muted); font-size: 12px; text-align: center; margin: -2px 0 6px; }
`
