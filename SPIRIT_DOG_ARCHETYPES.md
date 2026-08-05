# Spirit Dog Quiz — Content Spec
 
Reference doc for Feature 2 (see PRD.md). Covers the actual quiz questions, archetype copy, and the matching logic that connects an archetype back to real `MOCK_DOGS`. All copy here is original — no content from the Parks & Recreation episode that inspired the mechanic.
 
## How it works (two axes, five questions)
 
Every answer choice (A-E) maps to a point on the same 5-step energy scale Feature 1 already uses (`Lazy bones → Chill → Mix → Energetic → Spazz`), plus a size lean (Small vs. Big) on the questions where that makes sense.
 
- **Energy score:** average the index (0-4) of all five answers, round to the nearest step on the scale.
- **Size lean:** across the four questions that carry a size signal (Q1, Q2, Q4, Q5 — Q3 is pure vibe, no size signal), tally how many answers leaned Small (A/B) vs. Big (D/E). Majority wins; a tie leans Big (arbitrary but consistent tiebreaker).
That (energy, size) pair is the user's profile — no separate archetype-specific questions needed, and it reuses logic Claude Code already has to write for Feature 1's matching engine.
 
## Quiz Questions
 
**Q1. Your ideal Saturday?**
A. Sleeping in, no plans *(Lazy bones · Small)*
B. Coffee shop, low-key hang *(Chill · Small)*
C. Depends on my mood *(Mix · neutral)*
D. Big hike, need the whole day *(Energetic · Big)*
E. Nonstop plans, can't sit still *(Spazz · Big)*
 
**Q2. Pick a snack.**
A. Whatever's closest — I'm not moving *(Lazy bones · Small)*
B. Something slow and comforting *(Chill · Small)*
C. Depends what's in the fridge *(Mix · neutral)*
D. Something I can eat on the go *(Energetic · Big)*
E. Anything. I will also steal yours *(Spazz · Big)*
 
**Q3. Pick a soundtrack for your life.**
A. Ambient, barely audible *(Lazy bones)*
B. Acoustic, chill *(Chill)*
C. Whatever's on shuffle *(Mix)*
D. Upbeat, gets you moving *(Energetic)*
E. Full chaos playlist, no skips *(Spazz)*
 
**Q4. Your friends would describe you as...**
A. The one who never leaves the couch *(Lazy bones · Small)*
B. Low-maintenance, easygoing *(Chill · Small)*
C. Unpredictable, in a good way *(Mix · neutral)*
D. Reliable, but always down for it *(Energetic · Big)*
E. A lot. In all caps *(Spazz · Big)*
 
**Q5. Pick your ideal home base.**
A. A single cozy blanket fort *(Lazy bones · Small)*
B. A quiet corner with a good view *(Chill · Small)*
C. Wherever the group ends up *(Mix · neutral)*
D. Somewhere with room to roam *(Energetic · Big)*
E. Open floor space to zoom around *(Spazz · Big)*
 
## Archetypes
 
Six archetypes, spanning the energy scale and both size leans. Matching to `MOCK_DOGS` is **not** a hard filter — reuse Feature 1's "closeness" scoring pattern (energy distance + size fit) and always surface the top 1-2 dogs regardless of exact match, same as Feature 1's fallback behavior. This means every archetype always has a payoff, even the one below with no exact match in the current mock set.
 
| Archetype | Emoji | Target profile | Blurb | Primary mock match |
|---|---|---|---|---|
| The Professional Napper | 🦥 | Lazy bones · Small | "You've mastered the art of doing absolutely nothing, beautifully." | Daisy (exact) |
| The Zen Master | 😌 | Chill · Big | "Steady, warm, unbothered. You're everyone's favorite calming presence." | Willow (exact) |
| The Wildcard | 🎲 | Mix · Big | "Nobody — including you — knows what you're doing this weekend." | Duke (exact) |
| The Overachiever | 🔥 | Energetic · Big | "You have a five-year plan and a workout routine. Impressive. Exhausting." | Biscuit, Cooper (both exact) |
| The Chaos Gremlin | ⚡ | Spazz · Big | "Pure, unfiltered energy. A menace. We love you." | Luna, Rocky (both exact) |
| The Spicy Little Menace | 🌶️ | Energetic-to-Spazz · Small | "Small enough to carry, too much attitude to actually try." | No exact match in current mock set — surfaces closest by size/energy weighting (validates the fallback requirement) |
 
**Coverage check:** every dog in `MOCK_DOGS` (Biscuit, Pepper, Duke, Luna, Cooper, Daisy, Rocky, Willow) shows up as a primary or plausible secondary match across these six archetypes — Pepper (Chill · Small) doesn't have an exact-profile archetype but will surface as a close secondary for The Professional Napper or The Zen Master depending on scoring weights, which is fine and adds variety across repeat quiz-takers rather than a static 1:1 mapping.
 
## Result screen content
 
For each archetype result, show:
1. Archetype card: emoji, name, blurb
2. "Dogs with this energy right now:" — 1-2 real `MOCK_DOGS` from the closeness match
3. Three CTAs: **Adopt** (enters Feature 1's flow, pre-seeds the `activity` answer from this quiz's energy score) · **Donate** (external link, new tab) · **Share** (native share sheet / clipboard fallback, text along the lines of: "I'm [Archetype Name] [emoji] — take the quiz and find your spirit dog at Fosters & Paws")
