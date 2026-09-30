# Simulation Methodology

This file defines the reproducible simulation conventions used by the Unhinged playtest runners.

## Canonical six-deck methodology

- 40-card decks plus Leader.
- Six mono-Style decks.
- 30,000 games for a full six-deck round robin.
- 2,000 games per unordered matchup: 1,000 with each deck starting.
- Deterministic seeded runs.
- First player skips their first Draw.
- Second player accepts the optional face-up Rotated temporary Stash in automated tests.
- Maximum 60 Rounds for the canonical harness.
- Winner handling must use an explicit null sentinel. Never use truthiness for player index 0.
- Per-round telemetry is sampled at the end of completed Rounds.
- Exact win percentages are heuristic. Same-harness paired A/B comparisons are the strongest balance signal.

## Quick 36-deck round robin

The quick runner is an anomaly detector for mono and dual-Style deckbuilding. It is intentionally lighter than the canonical six-deck harness.

### Field construction

There are 36 Leader configurations:

- 6 mono-Style Leader decks.
- 30 Leader + secondary-Style decks.
- Direction matters. Rock Star + Salvage and Trash Baron + Momentum are different decks because the Leader is different.

Mono lists use the current lists in `decks.json`.

Quick dual-Style lists are generated as:

- 24 cards proportionally sampled from the Leader's mono shell.
- 16 cards proportionally sampled from the secondary Style's mono shell.
- Existing copy counts are treated as the available shell weights.
- The resulting deck contains 40 cards.

These are not optimized decklists. Results identify combinations worth investigating, not tournament power rankings.

### Quick round-robin settings

- 36 decks.
- 630 unordered matchups.
- Default 100 games per matchup.
- 50 games in each starting order.
- 63,000 games total at the default setting.
- Deterministic seeds.
- Maximum 40 Rounds.
- The same seed schedule should be reused for paired A/B balance tests.

### Experimental switches

The runner exposes balance experiments as explicit configuration rather than silently changing production card data.

Current Wrestler candidate:

`tagOutNativeOnly = true`

When enabled, Tag Out can put a revealed Character directly into play only if its Style is Expendable and its Cost is no greater than the number of cards in the Wrestler player's Stash. Other revealed cards go to hand.

This candidate is experimental until separately committed to production rules/card data.

## AI limitations

The simulator is a heuristic pilot, not a solved-game engine.

- It uses deterministic priorities rather than strategic search.
- Reactive and timing-heavy cards may be undervalued.
- Generated dual-Style lists are deliberately crude.
- It cannot establish that a deck is objectively balanced.
- Large differences, repeated matchup patterns, resource-flow changes, and same-seed A/B movement are more trustworthy than a single exact percentage.
