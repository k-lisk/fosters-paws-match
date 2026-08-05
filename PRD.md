# PRD: Fosters & Paws Dog Matching Tool
 
**Repo:** k-lisk/fosters-paws-match
**Owner:** Kevin Lisk
**Status:** Phase 1 — scoping complete, ready to build
 
---
 
## Problem Statement
 
Fosters & Paws currently runs adoption intake through a static application form — an adopter fills it out, and a volunteer manually reads it later to think about which dogs might fit. There's no guided moment where an adopter's own answers (home type, activity level, experience with kids) get connected to specific dogs in the org's care. That gap costs the org two things: adopters who bounce before finishing a long form, and mismatches that surface only after a home visit or a return.
 
This also serves a second purpose: it's a portfolio project demonstrating funnel design and matching-logic product thinking, built for a real org Kevin has volunteered with — distinct from Kevin's other two portfolio pieces, which are rebuilds/prototypes without a live audience.
 
## Goals
 
1. **Reduce drop-off vs. the current static form** by breaking intake into a guided, one-question-at-a-time flow (portfolio proxy metric: completion rate through a usability walkthrough, since there's no live traffic yet)
2. **Surface relevant dogs at the moment of intake**, not after a volunteer manually reviews the form
3. **Demonstrate matching-logic design** as a portfolio artifact — scoring logic, not just a form-to-database pipe
4. **Ship something Fosters & Paws could realistically adopt**, not just a UI concept — real question set pulled from their actual application, real org branding direction
5. **Create a shareable, low-commitment entry point** (the Spirit Dog Quiz) that captures casual/social visitors who aren't ready for a full intake, and converts a portion of them into adoption inquiries or donations
## Non-Goals (Phase 1)
 
- **Live ShelterLuv integration** — Phase 2, blocked on Fosters & Paws generating their own API key from their ShelterLuv admin. Phase 1 ships and demos fully on mock data.
- **Staff/volunteer-facing dashboard** — this tool is adopter-facing only. No admin view of submitted applications in this phase.
- **Payment or donation flows** — adoption fees are handled elsewhere in F&P's existing process; not in scope.
- **Account creation / login** — this is a single-session guided form, not a persistent user account system.
- **Real submission delivery** (email/CRM write) — Phase 1's "Ask about {dog}" action is a placeholder. Wiring it to an actual inbox or ShelterLuv record is a Phase 2/handoff decision, not built now.
- **Spirit Dog Quiz does not collect contact info or PII** — it's anonymous and stateless. Any lead capture only happens if the user proceeds into the full match flow afterward.
- **No server-side share tracking or social preview image generation** for the quiz in Phase 1 — sharing uses the browser's native share sheet (or clipboard fallback) with plain text, not a custom OG image pipeline.
- **No reproduction of Parks and Recreation content** — the quiz is inspired by the general "spirit animal quiz" format, not by specific jokes, dialogue, or character names from the show. All archetype names and copy are original.
## User Stories
 
- As a **prospective adopter**, I want to answer questions about my home and lifestyle one at a time, so that the process doesn't feel like a long form I have to fill out all at once.
- As a **prospective adopter**, I want to see dogs that plausibly fit my situation, so that I'm not scrolling through every dog in the system hoping something matches.
- As a **prospective adopter with young children**, I want the tool to only show me dogs confirmed good with kids, so that I don't fall for a dog that isn't safe for my household.
- As a **prospective adopter**, I want to see multiple suggested dogs presented evenly, so that I don't feel steered toward one "winner" over dogs that are just as good a fit.
- As a **prospective adopter**, I want to go back and change an answer, so that a misclick early on doesn't force me to restart.
- As **Fosters & Paws staff** (future, Phase 2), I want matches to reflect real, current dogs in our care, so that adopters aren't inquiring about dogs already adopted.
- As a **casual social visitor** not yet ready to commit to adopting, I want a fun, low-effort way to engage with the org, so that my first interaction isn't a serious 10-question form.
- As a **casual social visitor**, I want my fun quiz result to show me real dogs, not just a cartoon result, so that the fun moment has a real next step if I'm interested.
- As a **casual social visitor** who isn't ready to adopt, I want an easy way to donate or share instead, so that there's a low-commitment way to still support the org.
## Requirements
 
Phase 1 now ships two features sharing one repo: the core guided match (serious, high-commitment) and the Spirit Dog Quiz (light, low-commitment, top-of-funnel). Both were confirmed in-scope together, not sequenced — see Timeline for the tradeoff this creates.
 
### Feature 1: Guided Adoption Match
 
**Must-Have (P0)**
- 10-step guided question flow covering Homelife (4), Behavior (3), Your Info (3 grouped screens), pulled from F&P's real adoption application questions
- Progress indicator showing position in the flow
- Back navigation that preserves previously entered answers
- Required-field validation on contact info steps (first/last name, address, phone, email)
- Matching engine: hard-filters on "good with small children" and "house trained" when the adopter requires them; weighted scoring on activity-level closeness and home/yard size fit for the rest
- Results screen showing 2+ matched dogs, each with photo/placeholder, breed, age, size, a short bio, and 2-3 plain-language "why this match" reasons
- Results are **not** rank-ordered — display order is randomized per session so no single dog is structurally favored
- Fully responsive layout (mobile-first, since most adopters will find this via a phone)
- Runs entirely on mock data — zero backend, zero external calls
**Nice-to-Have (P1)**
- "Start over" / reset flow from the results screen
- Graceful fallback state when zero dogs clear the match threshold (show closest 2-3 rather than a dead end)
- Visual theme aligned to Fosters & Paws' actual brand (currently using an inferred palette — see Open Questions)
- Lightweight animation/transition between steps (nothing heavy — consistent with SUPR's existing feel)
- Opt-in checkbox on the contact info step ("Keep me updated on new matches, meet-and-greets, and ways to help") — captures consent now so V3's email campaign doesn't require re-contacting users later. Unchecked by default; not required to complete the flow.
### Feature 2: Spirit Dog Quiz
 
**Must-Have (P0)**
- Landing screen offers two clear entry points: "Find my match" (Feature 1) and "What's my spirit dog?" (this quiz) — distinct enough visually that users understand these are different in tone/commitment
- 5-6 question quiz, deliberately lighter and faster than the intake flow (lifestyle/personality-flavored questions, e.g. weekend plans, energy level, snack preference — not the serious Homelife/Behavior question set)
- Answers map to one of a fixed set of original archetypes (e.g. "Spicy Chihuahua," "Golden Retriever Energy") — each with a name, emoji/icon, and 1-2 sentence original blurb. No content lifted from the Parks and Rec episode.
- Archetype maps to an underlying profile (energy level + size lean) used to filter `MOCK_DOGS`, surfacing 1-3 real dogs whose attributes align with the archetype
- Results screen shows the archetype card **and** the real matching dog(s) together — the fun result is the hook, the real dogs are the payoff
- Three calls to action on the result screen:
  1. **Adopt** — enters Feature 1's full intake flow, with the quiz's energy-level answer pre-seeded into the `activity` question so the user isn't asked the same thing twice
  2. **Donate** — external link to fostersandpaws.org/donate, opens in a new tab
  3. **Share** — uses the Web Share API where available, falls back to copy-to-clipboard; share text includes the archetype name, not a dog's real identity/location details
- Quiz is fully anonymous — no name/contact/address fields anywhere in this flow (see Non-Goals)
**Nice-to-Have (P1)**
- Fallback state if zero mock dogs match an archetype's profile (surface the closest 1-2 regardless, same pattern as Feature 1)
- Visually distinct "badge" or "sticker" treatment for the archetype card vs. Feature 1's more serious match cards, so the tonal shift is obvious
- Restart/retake quiz option
**Future Considerations (this feature, P2)**
- Shareable unique result URLs (would require encoding quiz answers into a query param or short link — not needed for a text-only share in Phase 1)
- Custom social preview image per archetype (OG image generation) for richer link previews when shared
### Future Considerations (P2)
- Live ShelterLuv `/animals` API integration replacing `MOCK_DOGS`
- Real submission delivery — routes "Ask about {dog}" into an actual F&P inbox or ShelterLuv record
- Staff-facing view of submitted applications
- Analytics on drop-off point per step (only meaningful once there's real traffic)
### Future Considerations (V3 — Re-engagement Campaign)
- Automated follow-up for adopters who complete the flow but don't find a strong match (or don't act on one) — periodic email surfacing new dogs that fit their original answers
- Same email channel used to surface meet-and-greet events, fundraising asks, and volunteer opportunities to the same list
- Requires: an ESP integration (not yet chosen), the opt-in consent captured in Phase 1, and a re-match trigger (e.g., re-run the stored answers against new ShelterLuv inventory on a schedule — depends on Phase 2 shipping first)
- Sequencing dependency: V3 needs Phase 2's live dog data to have anything new to surface. Doesn't make sense to build before Phase 2.
## Success Metrics
 
Since Phase 1 has no live traffic, these are framed as **what to measure if/when this goes live**, not launch-day targets:
 
**Leading indicators**
- Flow completion rate (% who reach the results screen after starting) — target 70%+ based on typical short-form guided-flow benchmarks
- Time to complete full flow — target under 3 minutes
- % of sessions where at least one "Ask about" action is taken
**Lagging indicators**
- Adoption inquiry volume via this tool vs. the legacy static form (once both exist side by side)
- Any signal on reduced mismatch/return rate — hard to measure directly, but worth asking F&P staff informally post-launch
**Portfolio-specific proxy** (since Phase 1 won't have real users): a self-run usability pass — can someone unfamiliar with the tool complete it without confusion in under 3 minutes, and do the matches it produces make intuitive sense given their answers?
 
## Open Questions
 
- **[Design]** Exact F&P brand hex values — current palette is inferred from browsing their site, not extracted from their actual CSS. Non-blocking for build; swap-in later via CSS custom properties.
- **[Stakeholder]** Kevin is ~75% confident Fosters & Paws will want to adopt this once it's demo-ready. Not fully resolved, but confident enough to plan Phase 2/3 scope now rather than treat this as portfolio-only. Still open: formal sign-off timing, and who owns hosting long-term if adopted (see Vercel note above).
- **[Engineering/Hosting]** If F&P adopts it for real production use, is it re-hosted under an account F&P controls, given Vercel Hobby's non-commercial-use restriction? Non-blocking for Phase 1 build.
- **[Product]** If/when "Ask about {dog}" needs to actually deliver somewhere, does it go to a shared F&P inbox, or does it need to write into ShelterLuv directly? Depends on Phase 2 API access.
- **[Product/Legal — blocking for V3, non-blocking for Phase 1]** V3's re-engagement email campaign requires affirmative opt-in consent captured at intake to stay compliant with CAN-SPAM (nonprofit fundraising/event emails aren't exempt). If V3 is likely, Phase 1's "Your Info" contact step should add a consent checkbox now — retrofitting consent later means re-contacting every past user before V3 can send anything. **Recommendation: add the checkbox in Phase 1** even though the automation itself doesn't ship until V3, since the cost now is one form field vs. a compliance gap later.
- **[Engineering — V3]** What sends the emails? Needs an ESP (Mailchimp, SendGrid, etc.) — not yet chosen, and likely the first real "backend" this project acquires, which changes its zero-backend profile.
- **[Product — Spirit Dog Quiz]** How many archetypes is the right number? Too few and mock dogs feel repetitive across results; too many and each archetype has too few matching dogs in an 8-dog mock set. Recommend starting with 5-6 archetypes sized against the existing `MOCK_DOGS` spread, and revisiting once Phase 2's real ShelterLuv inventory is live (a bigger, more varied real dataset may support more archetypes).
- **[Product — Spirit Dog Quiz]** Should "Adopt" from the quiz result skip straight to Feature 1's results using only the pre-seeded energy answer, or route into the full 10-step flow (with just that one answer pre-filled)? Recommend the full flow — the quiz isn't accurate enough on its own to stand in for real intake, and skipping steps would produce weaker matches than the quiz's fun framing implies.
## Timeline / Phasing
 
| Phase | Scope | Status |
|---|---|---|
| **1** | Full guided match flow (Feature 1) **+** Spirit Dog Quiz (Feature 2), both on mock data, both in this repo, no external dependencies. Confirmed to ship together, not sequenced. | Ready to build |
| **1.5** (optional, P1) | Brand-accurate theming once real hex values are available; polish pass on transitions/empty states; quiz retake flow | After Phase 1 core is working |
| **2** | ShelterLuv API integration, replacing mock data | Blocked — requires F&P to generate their own ShelterLuv API key (Username → Configuration → Integrations in their ShelterLuv admin). Not started until that credential exists. |
| **3 (V3)** | Automated re-engagement email campaign — new matches, meet-and-greets, donation/volunteer asks, for users who complete intake without a strong match | Concept only. Depends on Phase 2 (needs live inventory to re-match against) and an ESP decision. Phase 1 lays groundwork by capturing opt-in consent now. |
 
No hard external deadline. Sequencing note from the broader portfolio plan: this is project 2 of 3 (after Flooring Calculator, before Resibook).
 
**Scope note:** Shipping the quiz alongside Feature 1 roughly doubles Phase 1's build surface before there's anything to demo. If build time becomes a real constraint, Feature 1 (the core match flow) should ship first regardless — it's the load-bearing piece both for the portfolio narrative and for anything Fosters & Paws would actually adopt. The quiz is high-value but not load-bearing.
