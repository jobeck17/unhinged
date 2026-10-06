# Mordecai 0.4 Simulation Status

> **HOLD FOR ENGINE PARITY · 6 October 2026**

Mordecai 0.4 is canonical, but the production simulator has **not yet been migrated to the new rules**. Do not treat Carl 0.3 results or the provisional Composure lab engine as authoritative Mordecai balance evidence.

Before new balance simulation, implement and validate Attack / Health / Trouble; Cause Trouble; no Leader attacks/blocking; no universal retaliation; Retaliate-only counter-damage; Breaking Point threshold queue; hidden/spent Last Straw lifecycle; deck-exhaustion-to-Last-Straw; no Character cap; no universal Responses; current control/attachment rules; and audited 0.4 card/Leader text.

The Carl methodology below is retained as historical reference until the Mordecai harness replaces it.

---

## Historical Carl 0.3 Simulation Rules

> Current simulation methodology for Unhinged / Carl 0.3 playtesting.
> Updated 2026-09-29.

This document is the source of truth for how automated balance results should be interpreted. Simulations are heuristic playtests, not perfect-play solvers. Same-harness A/B comparisons are more trustworthy than comparing percentages produced by different harnesses.

## 1. Canonical six-deck simulation

The canonical balance harness uses the six current mono-Style decks in `DECKS.json`.

### Field

- Six decks.
- 40 cards per deck plus a Leader outside the deck.
- Current production card text and current Leader passives.
- All unordered deck pairings are tested.
- Both starting orders are tested for every pairing.

### Standard full run

- 30,000 total games.
- 15 unordered matchups.
- 2,000 games per matchup.
- 1,000 games for each starting order.
- Deterministic paired seeds / starting orders when comparing revisions.
- Maximum 60 Rounds as a safety limit.
- Censored games must be reported. Recent canonical baselines target zero censored games.

### Setup assumptions

- Opening hand: 7 cards.
- First player is the War winner.
- First player skips the Draw step on their first Turn.
- Second player accepts the optional setup temporary Stash in automated simulation unless a test explicitly changes that assumption.
- The setup temporary Stash begins face-up and Rotated and Readies during the second player's first Ready step.
- Normal Stash rules otherwise apply.

### Game rules

The simulator should follow `RULES.md`. Printed card text overrides general rules.

Important implementation details include:

- Characters and Items enter Ready unless an effect says otherwise.
- Characters normally cannot Attack or use their own Rotate ability on the Turn they enter.
- Hothead allows a Character to Attack on the Turn it enters.
- Attacking Rotates the attacker.
- A normal Character attack may target the opposing Leader or an opposing Rotated Character.
- A Leader attack may be Blocked by one eligible Ready Character.
- Excess combat damage from a blocker overflows to the Leader.
- A surviving blocker retaliates.
- Defiant permits retaliation even if the blocker is defeated.
- Sacrifice counts as Defeat.
- Return moves a card to its owner's hand.
- Stubborn stops the first Return or Dismiss affecting that Character each Round.
- Traits have no automatic rules behavior unless card text references them.
- Leader passives are automatic and do not require the Leader to Rotate.

### AI policy

The automated player uses heuristic decisions rather than optimal search. It should attempt to:

- Stash once per Round when legal and useful.
- Spend available Stash to develop its board and execute its deck's game plan.
- Use legal card abilities when their modeled condition is useful.
- Attack legal targets using the current combat rules.
- Block when the heuristic considers blocking preferable to taking Leader damage.
- Use Leader-specific mechanics according to their implemented timing.

Reactive, bluffing, sequencing-heavy, or highly contextual decks may be underplayed by the generic AI. Human playtesting remains necessary.

## 2. Telemetry

Full canonical runs should record, where supported:

- Win rate by deck.
- Head-to-head matchup matrix.
- First-player win rate.
- Average and median game length.
- Censored games.
- Draw sources.
- Cards played by type.
- Attacks and Leader attacks.
- Blocks.
- Leader damage.
- Characters defeated / lost.
- Stash creation and spending.
- Leader passive triggers.
- Deck-specific mechanics such as Returns, sacrifices, low-hand turns, Tag Out hits, or other relevant events.

Per-Round telemetry is measured at the end of completed Rounds. Later-Round sample sizes naturally shrink because completed games leave the population.

## 3. Fast 36-deck color-combination round robin

This harness is an exploratory anomaly detector. Its absolute percentages are NOT directly comparable with the canonical six-deck simulation.

### Field construction

There are 36 Leader configurations:

- 6 mono-Style Leader decks.
- For each Leader, 5 versions using one different secondary Style.
- Leader identity matters. For example, Rock Star + Salvage and Trash Baron + Momentum use the same two Styles but are separate decks because their Leaders and primary shells differ.

For the current quick-build experiment:

- Mono decks use their canonical 40-card mono list.
- Dual-Style decks use approximately 24 cards from the Leader's primary mono shell and 16 cards from the secondary Style's mono shell.
- Copies are selected proportionally from the source shells while preserving a 40-card deck.
- These are intentionally quick representative builds, NOT optimized competitive decklists.

### Standard quick round robin

- 36 decks.
- 630 unordered matchups.
- 100 games per matchup.
- 50 games for each starting order.
- 63,000 total games.
- Each deck receives 3,500 games of overall matchup exposure.
- Deterministic seeds should be reused when making a single-variable A/B comparison.

### Interpretation

Use the 36-deck round robin to identify:

- Leader passives that become disproportionately strong when paired with off-Style cards.
- Secondary Styles that repeatedly improve many Leaders.
- Styles or Leaders that collapse when their native package is diluted.
- Extreme matchup polarities.
- Unexpected cross-Style engines.
- Candidates for more careful deck construction and canonical testing.

Do NOT treat the generated dual-Style decks as optimized decklists. A strong or weak result is a signal to investigate the interaction, not proof of the final power level of that color combination.

## 4. A/B testing rule

When testing one balance change:

1. Keep decklists unchanged unless the decklist itself is the tested variable.
2. Keep game count unchanged.
3. Keep starting-order distribution unchanged.
4. Reuse the same deterministic seeds whenever possible.
5. Change only the intended rule/card/Leader behavior.
6. Compare both overall and matchup-level movement.
7. Check telemetry to determine WHY the percentage moved.

If a fresh seed set is used, normal sampling movement can occur even for an unchanged deck. Do not attribute that movement to the tested change.

## 5. Locked Carl Tag Out rule

Carl 0.3 commits the native-Style restriction used in the accepted 36-deck balance pass:

> **Tag Out:** Once during your Turn, when one of your Characters is Defeated or Sacrificed, reveal the top card of your deck. If it is an **Expendable Character** with Cost less than or equal to the number of cards in your Stash, put it into play. It gains Hothead this Turn. Otherwise, put it into your hand.

This is no longer an experiment switch in Carl 0.3.

## 6. Known simulator caution

A historical simulator bug used a falsey check on winner index `0`. Winner handling must use an explicit unresolved state such as `winner === null`. Historical exact win percentages produced before that correction are not authoritative.

## 7. Balance philosophy

The target is not six or thirty-six decks all sitting exactly at 50%.

Healthy balance may include:

- Favorable and unfavorable matchups.
- Counter-decks.
- Distinct archetype strengths.
- Meaningful deckbuilding tradeoffs.

The warning signs are persistent global dominance, broad non-games, a Leader that universally improves unrelated Styles, or a deck/archetype that lacks reasonable favorable matchups.


## 8. Carl 0.3 Florida Man A/B

Accepted passive:

> Your damaged Characters have Hothead and Sucker Punch. After one of your damaged Characters survives combat with another Character, Ready it.

The accepted 36-deck quick field put Florida-led configurations at a 51.03% family average. The signal was strongest against Backyard Wrestler and modest against Misdirection. Absolute quick-run percentages remain heuristic.

## 9. Scheme Lab structural comparison — October 3, 2026

The proposed next-core experiment lives in `lab/schemes/`. Its browser and automated runner import the same engine. `GAMES_PER_MATCHUP=100 node lab/schemes/simulate.mjs` compares four combat/Scheme variants across 28 pairings and both starting orders (11,200 games). All four use the same isolated 71-card pool and eight fixed decks; they are **not canonical Carl balance results**.

`lab/schemes/results.json` records seeds, code/data hashes, matchup and Leader outcomes, first-player results, game length, censoring, deck-outs, work attempts, interruptions, completions, responses, and early board-lead correlations. Card conservation is checked after every action. The main verification run uses seeds separate from the exploratory tuning samples. Correlations between a Round-3 board lead and winning are confounded by deck identity and card quality. Human attack/protect/work decisions and replay desire remain the promotion gate.
