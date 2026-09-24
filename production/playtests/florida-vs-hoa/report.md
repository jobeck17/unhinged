# First duel test report

September 24, 2026 · Donut 0.1 / card pool revision 3

**Both 40-card decks are legal and ready for a physical test. The computer experiment is not reliable enough to declare either deck balanced or assign a competitive win rate.**

Each deck uses 28 cards in its Leader’s Style and 12 in its secondary Style, with 24 Characters, 10 Actions, and 6 Items. Every card is present twice; the 25-Health Leader is outside the deck. [Decklists](decks.md) · [Complete card text](card-reference.md) · [Leader rules](leaders.md)

## What was actually run

Four batches of eight games: four opening seeds per batch, each repeated with first player swapped. The same seeds are reused across batches. These are 32 correlated heuristic runs, not 32 independent human matches. A 30-Round timeout is censored, not a draw or a win. No censored games are silently removed from the table.

| Experiment | Florida wins | HOA wins | Unfinished at 30 Rounds | Mean Rounds of finished games |
| --- | ---: | ---: | ---: | ---: |
| Original leaders / cautious pilot | 2 | 0 | 6 | 13.0 |
| Charge and ultimates disabled / cautious pilot | 2 | 0 | 6 | 16.0 |
| Original leaders / higher Health priority | 4 | 2 | 2 | 11.0 |
| Broader HOA Charge / higher Health priority | 4 | 2 | 2 | 11.0 |

The higher-Health-priority pilot increases the Health score weight by 50%; all card rules remain the same. The broader HOA Charge experiment changes only her Charge condition to: “The first time each Round one of your Characters survives damage during an opponent’s Turn, gain 1 Charge.” This alternative is an experiment, **not an adopted change** to the deck or Leader draft.

## Leader use

| Experiment | Florida regular activations | HOA regular activations | Florida ultimates | HOA ultimates | HOA Charge gained |
| --- | ---: | ---: | ---: | ---: | ---: |
| Original leaders / cautious pilot | 44 | 0 | 6 | 0 | 2 |
| Charge and ultimates disabled / cautious pilot | 48 | 0 | 0 | 0 | 0 |
| Original leaders / higher Health priority | 40 | 2 | 18 | 0 | 2 |
| Broader HOA Charge / higher Health priority | 40 | 2 | 18 | 0 | 4 |

Counts above are totals across all eight runs, including unfinished runs. HOA never used an ultimate in any of the 24 runs with ultimates enabled. That makes the intended ultimate comparison inconclusive. Broadening her condition to surviving any opposing-turn damage increased Charge slightly but did not unlock an ultimate in this sample or change any result.

## Opening consistency

10,000 seeded shuffles per deck, using the documented mulligan policy and including the Round 1 Draw. These are draw probabilities under that policy, not win probabilities.

| Deck | At least one 1-cost Character in opening Turn hand | At least one Character costing 2 or less |
| --- | ---: | ---: |
| Florida Man | 78.09% | 99.99% |
| HOA President | 0.00% | 99.10% |

The HOA list intentionally has no 1-cost Characters; it usually starts establishing Characters in Round 2. That is a concrete deck difference to watch, not proof that it needs a 1-cost Character. It can still Play 1-cost Items on Round 1.

## Findings and next changes to consider

1. **Charge access is asymmetric.** Florida can trigger his own condition. HOA depends on opposing choices and a surviving defense. The bots usually attack Rotated Characters only when they can finish them, depriving HOA of survivors. The failed broader-damage experiment suggests trying a condition she can advance herself, such as her first Character or Item activation each Round. Do not call this alternative balanced before testing it.
2. **The pilot substantially affects pace.** Six of eight cautious games reached the cap; two of eight higher-Health-priority games did. The one-action evaluator does not understand attack sequences that exhaust blockers. This evidence cannot distinguish a genuine game stalemate problem from poor piloting. Test physical games before changing core combat or Health.
3. **Removing ultimates did not eliminate the cautious stalls.** The same six games timed out. Florida’s two completed games took 13 Rounds with ultimates and 16 without them; that is a narrow same-seed observation, not a general estimate of ultimate impact.
4. **HOA’s regular ability also needs a usability check.** The bots seldom selected it. Healing a Character is competing with the cost of exposing the Leader; Items and Character healing may make that trade unattractive. Human tests should explicitly record opportunities and refusals.
5. **Keep both original lists for the first physical baseline.** Do not simultaneously change the deck curve, Health, Charge, and ultimate power. The next proposed Leader-only experiment is a self-directed HOA Charge condition; keep her current passive and ultimate initially.

## Verification and limits

15 targeted mechanical tests passed, including multi-block/overflow, temporary Guard, Explosive, direct-attack Charge exclusion, Vulnerability, entry restrictions, Tag Me In instance/attachment cleanup, self-damage timing, Charge caps, and the proposed alternate Charge timing. The unchanged 180-card production pool passes its generator check. Every live simulated action checked card conservation, nonnegative Fuel, and Charge bounds.

The harness implements the selected cards and current timing, but its pilots are deliberately limited: one-action evaluation, at most two of five candidate Blockers, at most two defensive Discards, no strategic multi-Turn plan, and rough stochastic planning. These restrictions can change outcomes materially. [Full methodology and reproduction commands](../../../prototypes/donut-duel/README.md).

Raw runs: [original](results.json), [regular only](regular-only.json), [higher Health priority](aggressive.json), [alternate HOA Charge](hoa-charge-experiment.json). Example transcripts: [original](sample-results.md), [higher Health priority](sample-aggressive.md), [alternate HOA Charge](sample-hoa-charge-experiment.md).
