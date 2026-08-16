# Fosters & Paws — Dog Matching Tool
 
A guided intake flow that asks adopters about their home, lifestyle, and experience, then suggests dogs from [Fosters & Paws](https://www.fostersandpaws.org/) — a dog rescue serving the Sacramento region — who could be a good fit.
 
**[Live demo →](#)** <!-- add URL once deployed -->
 
## Why this exists
 
Fosters & Paws' current adoption process starts with a static application form. This tool reframes that as a short, guided conversation — and turns the org's own adoption criteria into a live matching engine instead of the standard browsing experience typically seen.
 
## Status: Phase 1
 
| Phase | Scope | Status |
|---|---|---|
| **1** | Full question flow (Homelife / Behavior / Your Info) + results screen, matched against mock dog data | ✅ This repo |
| **2** | Swap mock data for the org's live [ShelterLuv](https://www.shelterluv.com/) `/animals` API | ⏳ Blocked on Fosters & Paws generating their own ShelterLuv API key |
 
Phase 1 has no backend and no external dependencies — it's fully demo-able as-is. Phase 2 is scoped but intentionally not started until the org can self-serve the API credential from their own ShelterLuv admin panel.
 
## Features
 
- 10-step guided flow: home type, yard access, kids in household, activity level, behavioral expectations, and contact info
- Weighted matching engine scores mock dogs on activity-level fit, home/yard size compatibility, and hard-filters on "good with kids" / "house trained" when the adopter requires it
- Results are intentionally **unranked** — matches above threshold are shuffled on display so no dog is ever presented as a fixed "best match"
- Fully responsive, single-page React app
## Tech stack
 
- React + Vite
- No backend / no database — Phase 1 runs entirely against an in-memory mock dataset
- Deployed on <!-- add webhost once deployed -->
## Getting started
 
```bash
git clone https://github.com/k-lisk/fosters-paws-match.git
cd fosters-paws-match
npm install
cp .env.example .env
npm run dev
```

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_POSTHOG_KEY` | No — app runs fine without it, analytics just no-ops | PostHog project API key for funnel tracking (`src/shared/analytics.js`). Get one from your PostHog project's settings → Project API Key. |

Only the key needs an env var — the PostHog host (`https://us.i.posthog.com`) isn't sensitive and is hardcoded in `analytics.js`.
 
## Roadmap (Phase 2)
 
- Replace `MOCK_DOGS` with a live call to ShelterLuv's `/animals` endpoint
- Blocked on: Fosters & Paws generating an API key from their own ShelterLuv admin (Username → Configuration → Integrations) — this can't be self-served from outside the org's account
- Once unblocked: map ShelterLuv's animal schema to the existing matching logic, no changes needed to the question flow or UI
## About
 
Built by [Kevin Lisk](https://linkedin.com/in/kevinlisk) as a portfolio project — Senior PM background in marketplace monetization and conversion funnel design, most recently at Realtor.com. This project onboarding shell is adapted from [SUPR](https://github.com/k-lisk/spotter), a fitness app also built and maintained by Kevin.
 
Contact: kcolemanlisk@gmail.com
 

# fosters-paws-match
Guided dog-matching intake tool for Fosters &amp; Paws, a Sacramento-based dog rescue proudly serving some of the most vulnerable dogs in the Sacramento region—especially pregnant and nursing mothers, underage puppies, and those most at risk in overcrowded shelters. Phase 1 runs on mock data; Phase 2 wires into the org's ShelterLuv CRM.
