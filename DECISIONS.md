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

### 2026-08-08 — Quiz restructured to 6 questions / 3 sections; puppy/adult data added to matching
**Decision:** Spirit Dog Quiz grew from 5 questions to 6, grouped into 3 themed sections (Vibe Check / Recharge & Refuel / Energy & Home Base) with a per-question eyebrow matching `GuidedMatch`'s pattern. `MOCK_DOGS` gained an `ageCategory` field (`'Puppy'` if `age < 1`, else `'Adult'`) and a 9th dog, Waffles (a puppy). The quiz's dog-matching now guarantees one Puppy-category and one Adult-category result, not just top-2-by-closeness — still ranked by score within the pair.
**Why:** Kevin's call, to give the quiz more room to breathe content-wise and to make life-stage (puppy vs. adult) a first-class dimension across both flows, not just Feature 1.
**Note:** With only one puppy (Waffles) in the mock set, every quiz-taker who lands a Puppy slot saw the same dog — no variety there. Resolved 2026-08-08 by adding a 10th dog, Pretzel — Waffles' littermate (age ~0.15, same reflecting-reality reasoning: Fosters & Paws fosters litters together after rescuing a pregnant/nursing mom, then profiles each pup individually around 8 weeks old). The Puppy slot now scores between the two like any other category.
**Do not** assume the profile-scoring formula changed — `computeProfile`'s averaging/tallying is generic over the question array's length and already skipped `size: null` options, so the extra question needed zero formula changes.

### 2026-08-08 — New Feature 1 puppy/adult preference question, soft-scored
**Decision:** Added "Are you looking for a puppy or an adult dog?" to the Behavior section (Puppy / Adult / No preference, with a hint about training/supervision tradeoffs). Feature 1 is now an 11-step flow (Behavior grew from 3 to 4 questions). `computeMatches`'s weights were rebalanced to stay at 100%: activity 35% (was 40), size/home fit 25% (was 30), kids bonus 15% (unchanged), house-trained bonus 10% (was 15), puppy/adult fit 15% (new).
**Why:** Explicit ask to add life-stage preference as a match factor, but as a soft boost consistent with how activity-level closeness already works — not a hard filter like the kids/potty-trained questions, since a puppy/adult mismatch shouldn't disqualify an otherwise great match the way "not good with kids" should when kids are a hard requirement.
**Do not** move this into the `// Hard filters` block without revisiting this decision explicitly — the whole point was that it boosts, not excludes.

### 2026-08-08 — Results-screen CTAs reworked: Share removed, Adopt renamed, "Want to see more?" added
**Decision:** Three changes across both results screens: (1) the quiz's Share button — component, handler, and `shareText` helper — removed entirely, nothing left in its place; (2) the quiz's "Adopt" CTA renamed to "Find my match" (matching Landing's exact existing casing) with a subtext line ("11 quick questions → your real matches"); (3) a new "Want to see more?" section with outbound Browse Puppies / Browse Adult Dogs links (fostersandpaws.org, new tab) added to both `GuidedMatch`'s and `SpiritDogQuiz`'s results screens via a new shared `BrowseMoreLinks` component in `shared/StepPrimitives.jsx`.
**Why:** Share was non-functional (no real FB/IG integration behind it) — a dead button reads worse than no button. The Adopt rename makes it unambiguous that CTA leads into Feature 1's full flow, matching Landing's own wording for continuity. The Browse links replace an earlier, never-formally-scoped "see all adoptable dogs" idea with simple outbound links instead of building an internal browse view.
**Revisit when:** a real share/social integration is scoped — at that point this is a new feature, not a revival of the removed button.

### 2026-08-08 — Gray-box photo placeholders on both results screens
**Decision:** Both `GuidedMatch`'s match cards and the quiz's dog cards now show a 4:3 gray-box placeholder (`--bg-page` fill, `--border` outline) with the dog's emoji centered inside, replacing the previous floating-emoji-above-the-name treatment. New shared `PhotoPlaceholder` component in `shared/StepPrimitives.jsx`.
**Why:** Stand-in for real dog photos, which don't exist yet in the mock data. 4:3 was Kevin's-agent's pick with no F&P convention to go on — flagged as adjustable, not a firm design commitment.
**Revisit when:** real photo assets exist (Phase 2 ShelterLuv integration) — swap `PhotoPlaceholder` for an actual `<img>`.

### 2026-08-08 — Landing screen hierarchy flipped: Spirit Dog Quiz card now primary/first
**Decision:** On the Landing screen, the quiz's entry card now renders first (left) and carries the `fp-btn--primary` emphasis; Find My Match renders second (right) with `fp-btn--ghost`. Visual *treatment* stays attached to content type — quiz keeps its badge/sticker look, Find My Match keeps its logo/solid-card look — only position and button emphasis flipped.
**Why:** Explicit call from Kevin, to lead with the lower-commitment, shareable entry point (PRD Goal #5) as the top-of-funnel hook. This does **not** demote Feature 1's importance — it remains the substantive conversion flow, and the quiz's own "Find my match" CTA still funnels into it. Only which screen leads changes.
**Note:** There's no earlier *formally logged* DECISIONS.md entry for the original card order — it was an implicit choice baked into the original `Landing.jsx` build (2026-08-07) and never written up at the time. This entry is the first formal record of the ordering decision, in either direction.

---
 
## Template for new entries
 
```
### YYYY-MM-DD — Short decision title
**Decision:** What was decided.
**Why:** The reasoning.
**Revisit when:** (optional) The condition that would reopen this decision.
```
 
