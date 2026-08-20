import { useState, useEffect } from 'react'
import Landing from './Landing'
import GuidedMatch from './GuidedMatch'
import SpiritDogQuiz from './SpiritDogQuiz'
import { track } from './shared/analytics'
import { fetchLiveDogs } from './shared/liveDogs'
import { MOCK_DOGS } from './shared/mockDogs'

// ============================================================
// Top-level view router — toggles between the shared Landing
// screen and the two Phase 1 flows via local state, not routes
// (see CLAUDE.md). Owns the one piece of cross-flow state: the
// quiz's energy result, pre-seeded into GuidedMatch's activity
// question when the user hits Adopt from the quiz result screen.
// Also owns the dog pool: fetched once here (live ShelterLuv via
// /api/dogs, falling back to MOCK_DOGS on any failure) and passed
// down as a prop, rather than each flow fetching its own copy.
// See DECISIONS.md for the Phase 2 integration.
// ============================================================

function App() {
  const [view, setView] = useState('landing') // landing | guided | quiz
  const [presetActivity, setPresetActivity] = useState(null)
  const [dogs, setDogs] = useState(null) // null = still resolving

  useEffect(() => {
    let cancelled = false
    fetchLiveDogs().then(live => {
      if (!cancelled) setDogs(live || MOCK_DOGS)
    })
    return () => { cancelled = true }
  }, [])

  function startGuided(activity) {
    track('guided_match_started', { source: activity ? 'quiz' : 'landing' })
    setPresetActivity(activity || null)
    setView('guided')
  }

  function startQuiz() {
    track('quiz_started')
    setView('quiz')
  }

  function backToLanding() {
    setPresetActivity(null)
    setView('landing')
  }

  if (view === 'guided') {
    return (
      <GuidedMatch
        initialAnswers={presetActivity ? { activity: presetActivity } : {}}
        onExit={backToLanding}
        dogs={dogs}
      />
    )
  }

  if (view === 'quiz') {
    return <SpiritDogQuiz onAdopt={startGuided} onExit={backToLanding} dogs={dogs} />
  }

  return <Landing onFindMatch={() => startGuided()} onSpiritQuiz={startQuiz} />
}

export default App
