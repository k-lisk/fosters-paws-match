# DECISIONS.md
 
Architectural and product decisions for this project, in chronological order. Add a new entry whenever a non-obvious choice is made — especially anything that would look like an inconsistency or regression if reversed silently later.
 
---
 
### 2026-08-04 — Phase 1 ships with zero backend
**Decision:** No Supabase, no database, no auth. Mock dog data lives as a hardcoded array in the component.
**Why:** Phase 1's only job is to prove the guided-flow UX and matching logic. A backend adds setup cost and a maintenance surface with no functional payoff until Phase 2's ShelterLuv integration exists.
**Revisit when:** Phase 2 begins, or if "Ask about {dog}" needs to actually deliver somewhere before then.
 
### 2026-08-04 — Reused SUPR's onboarding shell rather than building from scratch
**Decision:** Progress dots, option-card single-select pattern, step-actions button row, and back-navigation logic are adapted directly from SUPR's `Onboarding.jsx`, with all Supabase/auth calls stripped.
**Why:** Proven UX pattern, faster to build, and demonstrates direct reuse/adaptation skill for the portfolio narrative.
**Note:** SUPR's actual CSS file wasn't available when this was built — styling was reconstructed from the JSX's inline patterns, not copy-pasted from a real stylesheet.
 
### 2026-08-04 — Results are unranked and shuffled on display
**Decision:** Matching engine computes a numeric score internally, filters to dogs above a threshold, but randomizes display order every time results render.
**Why:** Kevin flagged a legitimate concern — an unranked list still isn't truly unranked if the same dog always sorts first. Shuffling avoids implicitly telling adopters one dog is "better" than another.
**Do not** re-sort by score for display without revisiting this decision explicitly.
 
### 2026-08-04 — Visual theme is inferred, not brand-accurate
**Decision:** Light/warm palette (`#FBF6EC` background, `#E0A32E` gold accent) built from browsing fostersandpaws.org, not from extracted CSS values.
**Why:** Squarespace's live CSS isn't accessible via a simple fetch; no brand guide was available at build time.
**Revisit when:** Kevin or Fosters & Paws supplies actual hex values — swap is low-cost since all colors are CSS custom properties.
**Superseded:** See the 2026-08-07 "Real Fosters & Paws brand tokens applied" entry below — real hex values and logo assets are now in use.
 
### 2026-08-04 — MIT License
**Decision:** Repo licensed MIT.
**Why:** Permissive by design — if Fosters & Paws wants to actually run this, they shouldn't need explicit sign-off to use or modify it. No copyleft obligations make sense for a nonprofit's internal tool.
 
### 2026-08-04 — Hosted on Vercel Hobby tier for now, ownership TBD if adopted
**Decision:** Deploy to Vercel's free Hobby plan under Kevin's personal account while this remains a portfolio project.
**Why:** Zero cost, sufficient limits (project count isn't a constraint). However, Hobby's terms restrict it to non-commercial use — if Fosters & Paws formally adopts this as a production tool, hosting ownership needs to move to an account they control, or the commercial-use question needs to be resolved directly with Vercel.
**Revisit when:** F&P confirms adoption (Kevin currently ~75% confident they will).
 
### 2026-08-04 — Opt-in consent checkbox scoped into Phase 1, ahead of the feature it supports
**Decision:** Contact info step will include an unchecked-by-default "Keep me updated" checkbox, even though no email automation exists yet.
**Why:** V3 (automated re-engagement email campaign, concept-only) requires CAN-SPAM-compliant opt-in consent. Capturing it now costs one form field; retrofitting it later would mean re-contacting every prior user before V3 could send anything.
**Note:** This entry originally read as if the checkbox were already implemented — it wasn't. It was scoped/decided here but the field didn't actually exist in `GuidedMatch.jsx` until a later session caught the gap during a CLAUDE.md-guided review and added it (an `updatesOptIn` checkbox field on the `your_info_contact` step). It currently only sets a local form-state flag — it is not wired to any ESP or storage layer. That wiring is out of scope until an ESP is chosen (see PRD Open Questions).
 
### 2026-08-04 — Spirit Dog Quiz added to Phase 1 scope, hybrid archetype + real-dog design
**Decision:** A second, lighter-weight flow (the "Spirit Dog Quiz") ships in Phase 1 alongside the core guided match, not deferred to a later phase. Result screen shows both a fun original archetype (e.g. "Spicy Chihuahua") and 1-3 real `MOCK_DOGS` matching that archetype's energy/size profile, with Adopt / Donate / Share CTAs.
**Why:** Explicit call from Kevin — the quiz serves a genuinely different funnel stage (casual/social visitors not ready for full intake) than the serious 10-question flow, and the hybrid design (fun hook + real payoff) avoids it being just a gimmick with no conversion path.
**Tradeoff acknowledged:** This roughly doubles Phase 1's build surface before anything ships. If build time becomes a constraint, the core match flow (Feature 1) takes priority — it's the load-bearing deliverable; the quiz is high-value but not load-bearing.
**Constraint:** Archetype names, copy, and mechanic are original. The quiz is inspired by the general "spirit animal quiz" format (prompted by a Parks and Recreation episode), not by specific dialogue, jokes, or content from the show — this is a public-facing tool tied to Kevin's name, so no reproduction of the source material.

### 2026-08-07 — Mock data moved to a shared module
**Decision:** `MOCK_DOGS`, `ENERGY_SCALE`, and `energyIcon` moved out of `GuidedMatch.jsx` into `src/shared/mockDogs.js`. Both `GuidedMatch.jsx` and `SpiritDogQuiz.jsx` import from there.
**Why:** Building the Spirit Dog Quiz meant a second flow needed the exact same dog data and energy scale. CLAUDE.md's original "mock data lives in the main component file" guidance assumed a single flow; once a second flow needed it, keeping the data in one flow file and importing it into the other would've made one feature file depend on another, which is backwards. A shared plain-data module isn't the "separate data-fetching layer" that guidance was warning against — no fetch/API logic, just relocating a constant both flows need.
**Do not** re-inline this data into a component file without checking both flows still work.

### 2026-08-07 — Spirit Dog Quiz results are ranked, not shuffled
**Decision:** The quiz's result screen shows its top 1-2 dog matches in closeness-score order (best first), unlike Feature 1's explicitly unranked/shuffled results.
**Why:** This is a deliberate divergence from the 2026-08-04 "Results are unranked and shuffled" decision, not an inconsistency — that decision was scoped to Feature 1's guided-match engine, where multiple dogs are presented as equally-valid options an adopter should evaluate on their own terms. The quiz explicitly frames its dogs as "closest to your result" (a ranked concept by definition), and it's a different, lighter-weight matching engine serving a different (casual, top-of-funnel) audience.
**Do not** read this as Feature 1's shuffle decision having been reversed — that one still stands as written.

### 2026-08-07 — Real Fosters & Paws brand tokens applied, single Quicksand typeface
**Decision:** Replaced the inferred placeholder palette with Kevin-supplied brand values: `--accent: #9a6463`, `--accent-text: #f5f5f5`, `--text-primary: #37383d`, `--text-muted: #5f675d`, `--border: #cccaba`. `--bg-page: #f5f5f5` and `--bg-card: #ffffff` were assumed (not explicitly specified) since page/card backgrounds weren't part of the supplied token list. Typeface consolidated to a single Quicksand family (was Quicksand for headings + Nunito for body); the separate `--accent-ink` token (a deliberately darker shade used for small text like eyebrow labels/chips, since the old gold `--accent` was too light to read as text) was dropped — those spots now reuse `--accent` directly, since the new accent is dark enough to double as text.
**Why:** Kevin supplied real brand values and three logo SVGs (`public/logos/`) mid-build, ahead of the "Kevin or Fosters & Paws supplies actual hex values" trigger in the superseded 2026-08-04 entry.
**Note:** `FP_Logo_WhiteText.svg` is unused for now — there's no dark surface in the current theme to place it on. Revisit if a future dark-mode or dark-section design needs it.
**Revisit when:** rendering shows the page/card background contrast (both very light, ~4% apart) or the `--accent`-as-text legibility reads as too subtle in practice — both were flagged as best-guess calls at the time this was written, not confirmed against a full brand guide.

---
 
## Template for new entries
 
```
### YYYY-MM-DD — Short decision title
**Decision:** What was decided.
**Why:** The reasoning.
**Revisit when:** (optional) The condition that would reopen this decision.
```
 
