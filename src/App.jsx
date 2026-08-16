import { useState } from 'react'
import Landing from './Landing'
import GuidedMatch from './GuidedMatch'
import SpiritDogQuiz from './SpiritDogQuiz'
import { track } from './shared/analytics'

// ============================================================
// Top-level view router — toggles between the shared Landing
// screen and the two Phase 1 flows via local state, not routes
// (see CLAUDE.md). Owns the one piece of cross-flow state: the
// quiz's energy result, pre-seeded into GuidedMatch's activity
// question when the user hits Adopt from the quiz result screen.
// ============================================================

function App() {
  const [view, setView] = useState('landing') // landing | guided | quiz
  const [presetActivity, setPresetActivity] = useState(null)

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
      />
    )
  }

  if (view === 'quiz') {
    return <SpiritDogQuiz onAdopt={startGuided} onExit={backToLanding} />
  }

  return <Landing onFindMatch={() => startGuided()} onSpiritQuiz={startQuiz} />
}

export default App
