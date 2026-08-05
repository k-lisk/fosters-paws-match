import { useState, useMemo } from 'react'
import { THEME_CSS, ProgressDots, OptionGrid, StepActions } from './shared/StepPrimitives'

// ============================================================
// Fosters & Paws — Guided Adoption Match (Feature 1, Phase 1)
// Adapted from SUPR's onboarding shell (step flow, progress
// dots, option-card pattern). All Supabase/auth calls stripped.
// Runs entirely against mock dog data — no ShelterLuv API.
// ============================================================

// ---------- Mock dog data (stand-in for ShelterLuv /animals) ----------
const ENERGY_SCALE = ['Lazy bones', 'Chill', 'Mix', 'Energetic', 'Spazz']

const MOCK_DOGS = [
  { id: 'd1', name: 'Biscuit', breed: 'Labrador Mix', age: 3, ageLabel: 'Adult', size: 'Large', energy: 'Energetic', goodWithKids: true, houseTrained: true, bio: 'A goofy, food-motivated boy who loves a long walk and a longer nap after.', emoji: '🐕' },
  { id: 'd2', name: 'Pepper', breed: 'Terrier Mix', age: 8, ageLabel: 'Senior', size: 'Small', energy: 'Chill', goodWithKids: true, houseTrained: true, bio: 'A calm senior gentleman who\'d rather supervise from the couch than run laps.', emoji: '🐩' },
  { id: 'd3', name: 'Duke', breed: 'Pit Mix', age: 4, ageLabel: 'Adult', size: 'Large', energy: 'Mix', goodWithKids: false, houseTrained: true, bio: 'Sweet and loyal one-on-one, does best in a home without young kids.', emoji: '🐕‍🦺' },
  { id: 'd4', name: 'Luna', breed: 'Hound Mix', age: 1, ageLabel: 'Young', size: 'Medium', energy: 'Spazz', goodWithKids: true, houseTrained: false, bio: 'A bouncy pup still learning her manners — needs patience and a yard to zoom in.', emoji: '🐶' },
  { id: 'd5', name: 'Cooper', breed: 'Shepherd Mix', age: 2, ageLabel: 'Adult', size: 'Large', energy: 'Energetic', goodWithKids: true, houseTrained: true, bio: 'Smart, athletic, and always up for a job — hiking, fetch, agility, you name it.', emoji: '🐕' },
  { id: 'd6', name: 'Daisy', breed: 'Chihuahua Mix', age: 5, ageLabel: 'Adult', size: 'Small', energy: 'Lazy bones', goodWithKids: false, houseTrained: true, bio: 'A tiny lap warmer who prefers quiet adult households.', emoji: '🐕' },
  { id: 'd7', name: 'Rocky', breed: 'Boxer Mix', age: 1, ageLabel: 'Young', size: 'Medium', energy: 'Spazz', goodWithKids: true, houseTrained: false, bio: 'All puppy energy, all the time. Loves kids almost as much as tennis balls.', emoji: '🐶' },
  { id: 'd8', name: 'Willow', breed: 'Retriever Mix', age: 9, ageLabel: 'Senior', size: 'Medium', energy: 'Chill', goodWithKids: true, houseTrained: true, bio: 'A gentle old soul looking for a soft bed and an easy routine.', emoji: '🐕' },
]

// ---------- Question definitions ----------
const STEPS = [
  {
    id: 'home_type', section: 'Homelife', type: 'single',
    question: 'What type of home do you live in?',
    hint: 'This helps us think about space.',
    options: [
      { value: 'house', label: 'House', icon: '🏠' },
      { value: 'town_home', label: 'Town Home', icon: '🏘️' },
      { value: 'apartment', label: 'Apartment', icon: '🏢' },
    ],
  },
  {
    id: 'own_rent', section: 'Homelife', type: 'single',
    question: 'Do you own or rent?',
    hint: 'Some rentals have breed or size restrictions — good to know up front.',
    options: [
      { value: 'own', label: 'Own', icon: '🔑' },
      { value: 'rent', label: 'Rent', icon: '📄' },
    ],
  },
  {
    id: 'yard', section: 'Homelife', type: 'single',
    question: 'How big is the yard your dog will have access to?',
    hint: '',
    options: [
      { value: 'large', label: 'Large Yard', icon: '🌳' },
      { value: 'medium', label: 'Medium Yard', icon: '🌿' },
      { value: 'patio', label: 'Patio Access', icon: '🪴' },
      { value: 'park', label: 'Public Space — Park', icon: '🏞️' },
    ],
  },
  {
    id: 'kids', section: 'Homelife', type: 'single',
    question: 'Do you have children or grandchildren?',
    hint: '',
    options: [
      { value: 'no', label: 'No', icon: '🚫' },
      { value: 'under_10', label: 'Yes, under 10', icon: '🧒' },
      { value: 'over_10', label: 'Yes, over 10', icon: '🧑' },
    ],
  },
  {
    id: 'activity', section: 'Behavior', type: 'single',
    question: 'How active of a dog are you looking for?',
    hint: '',
    options: ENERGY_SCALE.map(label => ({ value: label, label, icon: energyIcon(label) })),
  },
  {
    id: 'good_with_kids', section: 'Behavior', type: 'single',
    question: 'Do you expect your dog to be good with small children?',
    hint: '',
    options: [
      { value: 'yes', label: 'Yes', icon: '✅' },
      { value: 'no', label: 'No', icon: '➖' },
    ],
  },
  {
    id: 'potty_trained', section: 'Behavior', type: 'single',
    question: 'Do you expect your dog to be potty trained at adoption?',
    hint: '',
    options: [
      { value: 'yes', label: 'Yes', icon: '✅' },
      { value: 'no', label: "No, I'm ready to train", icon: '➖' },
    ],
  },
  {
    id: 'your_info_name', section: 'Your Info', type: 'form',
    question: 'A little about your household',
    hint: 'So we know who to reach out to.',
    fields: [
      { key: 'firstName', label: 'First Name', required: true },
      { key: 'lastName', label: 'Last Name', required: true },
      { key: 'householdMember', label: 'Spouse / Partner / Roommate on record', required: false },
    ],
  },
  {
    id: 'your_info_address', section: 'Your Info', type: 'form',
    question: "What's your address?",
    hint: 'Fosters & Paws uses this for home-check scheduling.',
    fields: [
      { key: 'street', label: 'Street Address', required: true },
      { key: 'city', label: 'City', required: true },
      { key: 'state', label: 'State', required: true, maxLength: 2, placeholder: 'CA' },
      { key: 'zip', label: 'Zip', required: true, maxLength: 10 },
    ],
  },
  {
    id: 'your_info_contact', section: 'Your Info', type: 'form',
    question: 'How should we contact you?',
    hint: '',
    fields: [
      { key: 'phone', label: 'Phone', required: true },
      { key: 'phoneType', label: 'Phone Type', required: false, select: ['Cell', 'Home', 'Work'] },
      { key: 'email', label: 'Email Address', required: true },
      { key: 'updatesOptIn', label: 'Keep me updated on new matches, meet-and-greets, and ways to help', type: 'checkbox', required: false },
    ],
  },
]

const TOTAL_STEPS = STEPS.length

function energyIcon(label) {
  return { 'Lazy bones': '🦥', Chill: '😌', Mix: '🎲', Energetic: '🔥', Spazz: '⚡' }[label] || '🐾'
}

// ---------- Matching logic ----------
function sizeFit(yard, homeType, size) {
  // Rough compatibility score 0-1 per dog size given living situation
  const table = {
    apartment: { Small: 1, Medium: 0.6, Large: 0.25 },
    town_home: { Small: 0.9, Medium: 0.9, Large: 0.6 },
    house: { Small: 0.8, Medium: 1, Large: 1 },
  }
  const yardBoost = { large: { Large: 0.2, Medium: 0.1, Small: 0 }, medium: { Large: 0.05, Medium: 0.15, Small: 0.05 }, patio: { Small: 0.15, Medium: 0, Large: -0.1 }, park: { Small: 0.05, Medium: 0.1, Large: 0.05 } }
  const base = (table[homeType] || table.house)[size] ?? 0.5
  const boost = (yardBoost[yard] || {})[size] ?? 0
  return Math.max(0, Math.min(1, base + boost))
}

function computeMatches(answers) {
  const scored = MOCK_DOGS.map(dog => {
    // Hard filters
    if (answers.good_with_kids === 'yes' && !dog.goodWithKids) return { dog, score: -1 }
    if (answers.potty_trained === 'yes' && !dog.houseTrained) return { dog, score: -1 }

    let score = 0
    // Activity match — closeness on the energy scale (40%)
    const wantIdx = ENERGY_SCALE.indexOf(answers.activity)
    const dogIdx = ENERGY_SCALE.indexOf(dog.energy)
    const activityScore = wantIdx >= 0 ? 1 - Math.abs(wantIdx - dogIdx) / (ENERGY_SCALE.length - 1) : 0.5
    score += activityScore * 40

    // Size/home fit (30%)
    score += sizeFit(answers.yard, answers.home_type, dog.size) * 30

    // Kids in household bonus (15%) — if user has young kids, weight goodWithKids even without hard "yes"
    if (answers.kids === 'under_10') score += dog.goodWithKids ? 15 : 0
    else score += 10 // neutral credit if not directly applicable

    // House-trained soft bonus (15%)
    score += dog.houseTrained ? 15 : 5

    return { dog, score }
  })

  const eligible = scored.filter(s => s.score >= 0)
  eligible.sort((a, b) => b.score - a.score)

  const threshold = 55
  let matches = eligible.filter(s => s.score >= threshold)
  if (matches.length < 2) matches = eligible.slice(0, 3) // fallback so we never show an empty result

  // Shuffle so it never reads as a fixed ranking, even though it's scored underneath
  const shuffled = [...matches]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.map(s => s.dog)
}

function matchReasons(dog, answers) {
  const reasons = []
  if (answers.activity && dog.energy === answers.activity) reasons.push(`${dog.energy} energy — matches what you're looking for`)
  else if (answers.activity) reasons.push(`${dog.energy} energy level`)
  if (answers.good_with_kids === 'yes' && dog.goodWithKids) reasons.push('Good with small children')
  if (answers.potty_trained === 'yes' && dog.houseTrained) reasons.push('House trained')
  if (answers.home_type === 'apartment' && dog.size === 'Small') reasons.push('Right-sized for apartment living')
  if (answers.yard === 'large' && dog.size === 'Large') reasons.push('Will make great use of a large yard')
  if (reasons.length === 0) reasons.push(`${dog.size} · ${dog.ageLabel}`)
  return reasons.slice(0, 3)
}

// ---------- Guided-match component ----------
export default function GuidedMatch() {
  const [phase, setPhase] = useState('welcome') // welcome | flow | computing | results
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [formDraft, setFormDraft] = useState({})
  const [draftStep, setDraftStep] = useState(step)

  const current = STEPS[step - 1]

  // Rehydrate the draft from any previously saved answer whenever a form
  // step is (re)entered, so Back doesn't show blank fields or, worse,
  // let Continue silently overwrite a saved answer with an empty draft.
  // Adjusted during render (not an effect) per React's guidance for
  // resetting state when a value changes: https://react.dev/learn/you-might-not-need-an-effect
  if (step !== draftStep) {
    setDraftStep(step)
    setFormDraft(current?.type === 'form' ? (answers[current.id] || {}) : {})
  }

  function setAnswer(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function goNext() {
    if (step >= TOTAL_STEPS) {
      setPhase('computing')
      setTimeout(() => setPhase('results'), 900)
    } else {
      setStep(s => s + 1)
    }
  }

  function goBack() {
    if (step === 1) { setPhase('welcome'); return }
    setStep(s => s - 1)
  }

  function selectSingle(value) {
    setAnswer(current.id, value)
    setTimeout(goNext, 200)
  }

  function updateField(key, value) {
    setFormDraft(prev => ({ ...prev, [key]: value }))
  }

  function submitForm() {
    setAnswer(current.id, formDraft)
    goNext()
  }

  const formValid = useMemo(() => {
    if (current?.type !== 'form') return true
    return current.fields.filter(f => f.required).every(f => (formDraft[f.key] || '').trim())
  }, [current, formDraft])

  const matches = useMemo(() => {
    if (phase !== 'results') return []
    const flatAnswers = { ...answers }
    return computeMatches(flatAnswers)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function restart() {
    setAnswers({})
    setFormDraft({})
    setStep(1)
    setPhase('welcome')
  }

  return (
    <div className="fp-page">
      <style>{THEME_CSS}{CSS}</style>

      {phase === 'welcome' && (
        <div className="fp-body fp-body--center">
          <div className="fp-welcome">
            <div className="fp-logo">🐾</div>
            <h1 className="fp-title">Find your Fosters &amp; Paws match</h1>
            <p className="fp-lead">
              A few quick questions about your home and lifestyle — we'll suggest dogs in our care who could be a great fit.
            </p>
            <button className="fp-btn fp-btn--primary" onClick={() => setPhase('flow')}>Get started</button>
          </div>
        </div>
      )}

      {phase === 'flow' && current && (
        <>
          <div className="fp-header">
            <ProgressDots total={TOTAL_STEPS} step={step} />
            <button className="fp-back" onClick={goBack}>← Back</button>
          </div>

          <div className="fp-body">
            <div className="fp-eyebrow">{current.section}</div>
            <h2 className="fp-question">{current.question}</h2>
            {current.hint && <p className="fp-hint">{current.hint}</p>}

            {current.type === 'single' && (
              <OptionGrid options={current.options} selected={answers[current.id]} onSelect={selectSingle} />
            )}

            {current.type === 'form' && (
              <>
                <div className="fp-form-fields">
                  {current.fields.map(field => (
                    field.type === 'checkbox' ? (
                      <label key={field.key} className="fp-checkbox-field">
                        <input
                          type="checkbox"
                          className="fp-checkbox"
                          checked={!!formDraft[field.key]}
                          onChange={e => updateField(field.key, e.target.checked)}
                        />
                        <span>{field.label}</span>
                      </label>
                    ) : (
                      <div key={field.key} className="fp-field">
                        <label className="fp-field-label">
                          {field.label}{field.required && <span className="fp-required"> *</span>}
                        </label>
                        {field.select ? (
                          <select
                            className="fp-input"
                            value={formDraft[field.key] || ''}
                            onChange={e => updateField(field.key, e.target.value)}
                          >
                            <option value="">Select…</option>
                            {field.select.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input
                            className="fp-input"
                            type="text"
                            maxLength={field.maxLength}
                            placeholder={field.placeholder || ''}
                            value={formDraft[field.key] || ''}
                            onChange={e => updateField(field.key, e.target.value)}
                          />
                        )}
                      </div>
                    )
                  ))}
                </div>
                <StepActions>
                  <button className="fp-btn fp-btn--primary" disabled={!formValid} onClick={submitForm}>
                    Continue
                  </button>
                </StepActions>
              </>
            )}
          </div>
        </>
      )}

      {phase === 'computing' && (
        <div className="fp-body fp-body--center">
          <div className="fp-spinner" />
          <p className="fp-lead" style={{ marginTop: 16 }}>Finding your matches…</p>
        </div>
      )}

      {phase === 'results' && (
        <div className="fp-body">
          <div className="fp-eyebrow">Your matches</div>
          <h2 className="fp-question">A few dogs we think you'd love</h2>
          <p className="fp-hint">
            These aren't ranked — every dog here could be a great fit based on what you told us. Reach out about any of them.
          </p>

          <div className="fp-match-grid">
            {matches.map(dog => (
              <div key={dog.id} className="fp-match-card">
                <div className="fp-match-emoji">{dog.emoji}</div>
                <div className="fp-match-name">{dog.name}</div>
                <div className="fp-match-meta">{dog.breed} · {dog.ageLabel} · {dog.size}</div>
                <p className="fp-match-bio">{dog.bio}</p>
                <div className="fp-match-reasons">
                  {matchReasons(dog, answers).map((r, i) => (
                    <span key={i} className="fp-chip">{r}</span>
                  ))}
                </div>
                <button className="fp-btn fp-btn--primary fp-btn--full" onClick={() => window.alert(`In production, this would start an inquiry with Fosters & Paws about ${dog.name}.`)}>
                  Ask about {dog.name}
                </button>
              </div>
            ))}
          </div>

          <StepActions style={{ marginTop: 24 }}>
            <button className="fp-btn fp-btn--ghost" onClick={restart}>Start over</button>
          </StepActions>
        </div>
      )}
    </div>
  )
}

// ---------- Styles (flow-specific — shared tokens/primitives live in shared/StepPrimitives) ----------
const CSS = `
.fp-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 0; }
.fp-back { background: none; border: none; color: var(--text-muted); font-size: 14px; cursor: pointer; margin-left: 16px; white-space: nowrap; }
.fp-body { padding: 28px 24px 0; max-width: 560px; margin: 0 auto; }
.fp-body--center { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 420px; padding-top: 0; }
.fp-welcome { max-width: 380px; }
.fp-logo { font-size: 44px; margin-bottom: 12px; }
.fp-title { font-size: 26px; font-weight: 700; margin: 0 0 12px; }
.fp-lead { color: var(--text-muted); font-size: 15px; line-height: 1.55; margin: 0 0 24px; }
.fp-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent-ink); margin-bottom: 8px; }
.fp-question { font-size: 22px; font-weight: 700; margin: 0 0 6px; }
.fp-hint { color: var(--text-muted); font-size: 14px; margin: 0 0 20px; line-height: 1.5; }
.fp-form-fields { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
.fp-field-label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
.fp-required { color: var(--accent-ink); }
.fp-input {
  width: 100%; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px;
  padding: 11px 14px; color: var(--text-primary); font-size: 15px; font-family: inherit; box-sizing: border-box;
}
.fp-input:focus { outline: none; border-color: var(--accent); }
.fp-checkbox-field { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--text-muted); line-height: 1.4; cursor: pointer; }
.fp-checkbox { margin-top: 2px; accent-color: var(--accent); width: 16px; height: 16px; flex-shrink: 0; }
.fp-spinner { width: 28px; height: 28px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: fp-spin .7s linear infinite; }
@keyframes fp-spin { to { transform: rotate(360deg); } }
.fp-match-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
.fp-match-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 18px; box-shadow: 0 1px 3px rgba(46,43,36,0.06); }
.fp-match-emoji { font-size: 30px; margin-bottom: 6px; }
.fp-match-name { font-size: 17px; font-weight: 700; font-family: 'Quicksand', 'Nunito', sans-serif; }
.fp-match-meta { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.fp-match-bio { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0 0 10px; }
.fp-match-reasons { display: flex; flex-wrap: wrap; gap: 6px; }
.fp-chip { font-size: 11px; background: rgba(224,163,46,0.16); color: var(--accent-ink); border-radius: 20px; padding: 4px 10px; font-weight: 700; }
@media (max-width: 480px) {
  .fp-match-grid { grid-template-columns: 1fr; }
}
`
