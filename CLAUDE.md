# CLAUDE.md
 
Technical standards and working conventions for this repo. Read this, PRD.md, and DECISIONS.md before writing any code.
 
## Project
 
Fosters & Paws Dog Matching Tool — a guided adopter intake flow that matches answers to mock dog data. Phase 1 only: no backend, no external APIs, no auth.
 
## Tech Stack
 
- **Framework:** React + Vite
- **Language:** JavaScript (not TypeScript — matches SUPR, keeps this fast to iterate on)
- **Styling:** Plain CSS via a single injected `<style>` block per component (see existing `GuidedMatch.jsx` for the pattern) — no CSS framework, no CSS-in-JS library
- **State:** React `useState`/`useMemo` only. No Redux, no Zustand, no context providers — the whole app is one flow with local state.
- **Backend:** None in Phase 1. No Supabase, no database, no server. `MOCK_DOGS` is a hardcoded array in `src/shared/mockDogs.js`.
- **Package manager:** npm
## Build & Verify Commands
 
```bash
npm install
npm run dev          # local dev server
npm run build         # production build — run before every deploy
npm run lint           # run before every commit
```
 
There is no test suite yet. If Claude Code adds one, prefer Vitest (pairs natively with Vite) — but don't add testing infrastructure unless a task specifically calls for it.
 
## Code Conventions
 
- **Component style:** Function components, hooks only, matches the SUPR onboarding component this was adapted from
- **File structure:** Keep this as a single-page app — still no `react-router`. Phase 1 now has two flows (the guided match, and the Spirit Dog Quiz), toggled from a shared landing screen via local state, not routes. Split these into separate component files (e.g. `GuidedMatch.jsx`, `SpiritDogQuiz.jsx`) that share common primitives (progress dots, option-card, button styles) rather than growing one monolithic file — the original single-file `FostersPawsMatch.jsx` was fine for one flow, not for two.
- **Shared code:** `src/shared/StepPrimitives.jsx` holds the step-shell UI (progress dots, option-card grid, step-actions row), the page/header/eyebrow chrome common to all three screens, the badge/sticker card style (Landing's quiz entry + the quiz's archetype result), and the CSS custom properties — all three top-level screens (`Landing.jsx`, `GuidedMatch.jsx`, `SpiritDogQuiz.jsx`) import from it instead of duplicating any of this
- **Naming:** `fp-` prefix on CSS classes (already established) to avoid collision if this is ever embedded in another page
- **Mock data:** `src/shared/mockDogs.js` exports `MOCK_DOGS`, `ENERGY_SCALE`, and `energyIcon` as plain array/object/function exports. Moved out of the main component file once a second flow (the Spirit Dog Quiz) needed the same data — this is still a shared constant, not a fetching layer, so the "don't build a data-fetching layer until Phase 2" guidance still holds: don't add fetch/API logic here until Phase 2 actually introduces the ShelterLuv API.
- **Comments:** Keep the section-divider comment style already in the file (`// ---------- Section name ----------`) for new major sections
## Things to NOT do without asking
 
- Don't add a backend, database, or auth system "just in case" — Phase 1 is explicitly zero-backend (see PRD Non-Goals)
- Don't add TypeScript, a CSS framework, or a state management library — these are conscious omissions, not oversights
- Don't wire the dog card's CTA ("Learn more", `src/shared/DogCard.jsx` — labeled "Ask about {dog}" in earlier builds) to a real email/API call — it's a placeholder alert by design until a submission-delivery decision is made (see PRD Open Questions)
- Don't build the opt-in checkbox into an actual email capture/ESP integration — Phase 1 only captures and stores the consent flag locally in form state; there's nothing to send to yet
## Deployment
 
- Hosted on Vercel (Hobby tier for now — see DECISIONS.md for the commercial-use caveat)
- No environment variables needed for Phase 1
- `npm run build` output deploys as a static site — no serverless functions in this phase
