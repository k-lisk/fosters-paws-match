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
 
### 2026-08-04 — MIT License
**Decision:** Repo licensed MIT.
**Why:** Permissive by design — if Fosters & Paws wants to actually run this, they shouldn't need explicit sign-off to use or modify it. No copyleft obligations make sense for a nonprofit's internal tool.
 
### 2026-08-04 — Hosted on Vercel Hobby tier for now, ownership TBD if adopted
**Decision:** Deploy to Vercel's free Hobby plan under Kevin's personal account while this remains a portfolio project.
**Why:** Zero cost, sufficient limits (project count isn't a constraint). However, Hobby's terms restrict it to non-commercial use — if Fosters & Paws formally adopts this as a production tool, hosting ownership needs to move to an account they control, or the commercial-use question needs to be resolved directly with Vercel.
**Revisit when:** F&P confirms adoption (Kevin currently ~75% confident they will).
 
### 2026-08-04 — Opt-in consent checkbox added to Phase 1, ahead of the feature it supports
**Decision:** Contact info step includes an unchecked-by-default "Keep me updated" checkbox, even though no email automation exists yet.
**Why:** V3 (automated re-engagement email campaign, concept-only) requires CAN-SPAM-compliant opt-in consent. Capturing it now costs one form field; retrofitting it later would mean re-contacting every prior user before V3 could send anything.
**Note:** The checkbox currently only sets a local form-state flag — it is not wired to any ESP or storage layer. That wiring is out of scope until an ESP is chosen (see PRD Open Questions).
 
### 2026-08-04 — Spirit Dog Quiz added to Phase 1 scope, hybrid archetype + real-dog design
**Decision:** A second, lighter-weight flow (the "Spirit Dog Quiz") ships in Phase 1 alongside the core guided match, not deferred to a later phase. Result screen shows both a fun original archetype (e.g. "Spicy Chihuahua") and 1-3 real `MOCK_DOGS` matching that archetype's energy/size profile, with Adopt / Donate / Share CTAs.
**Why:** Explicit call from Kevin — the quiz serves a genuinely different funnel stage (casual/social visitors not ready for full intake) than the serious 10-question flow, and the hybrid design (fun hook + real payoff) avoids it being just a gimmick with no conversion path.
**Tradeoff acknowledged:** This roughly doubles Phase 1's build surface before anything ships. If build time becomes a constraint, the core match flow (Feature 1) takes priority — it's the load-bearing deliverable; the quiz is high-value but not load-bearing.
**Constraint:** Archetype names, copy, and mechanic are original. The quiz is inspired by the general "spirit animal quiz" format (prompted by a Parks and Recreation episode), not by specific dialogue, jokes, or content from the show — this is a public-facing tool tied to Kevin's name, so no reproduction of the source material.
 
---
 
## Template for new entries
 
```
### YYYY-MM-DD — Short decision title
**Decision:** What was decided.
**Why:** The reasoning.
**Revisit when:** (optional) The condition that would reopen this decision.
```
 
