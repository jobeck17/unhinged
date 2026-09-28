# Full Leader A/B Snapshot — Comeback Tour and Failure to Respond

**Date:** September 28, 2026  
**Decks:** six revision-6 mono-Style baselines  
**Games:** 30,000 per Rock Star variant, 60,000 total

## Test conditions

Both runs used the same matchup matrix, seeds, and starting positions.

Shared rules:

- War winner skips the Draw step of their first Turn.
- Leaders begin at 25 Health.
- Birthday Party Magician draws when one of its Characters Returns to hand.
- Trash Baron remains uncapped.
- HOA President uses the **Failure to Respond candidate** for this simulation only:
  - **Beginning in Round 8, opposing Characters cannot Block attacks made by HOA's Characters.**
- All other revision-6 card text remains unchanged.

Rock Star variants:

### A — Comeback Tour / Empty Hand
> At the end of your Turn, if you have no cards in hand, Draw 3 cards.

### B — Comeback Tour / One or Fewer
> At the end of your Turn, if you have 1 or fewer cards in hand, Draw until you have 3 cards in hand.

The simulator is heuristic. Exact win rates are directional rather than tournament predictions; the A/B comparison is more reliable because both variants were tested in the same harness.

## Deck win rates

| Leader | Empty -> Draw 3 | <=1 -> refill to 3 |
| --- | ---: | ---: |
| Florida Man | 45.0% | 44.6% |
| Washed-Up Rock Star | **56.3%** | **57.2%** |
| Birthday Party Magician | 19.8% | 19.5% |
| Trash Baron | 61.4% | 61.2% |
| HOA President / Failure to Respond | **48.6%** | **48.5%** |
| Backyard Wrestler | 69.0% | 69.0% |

## Rock Star economy comparison

| Metric | Empty -> Draw 3 | <=1 -> refill to 3 |
| --- | ---: | ---: |
| Win rate | 56.3% | 57.2% |
| Refill triggers/game | 2.01 | 2.82 |
| Cards drawn from passive/game | 5.98 | 7.05 |
| Total extra Draw/game | 9.71 | 11.13 |
| Deck-out rate | **11.76%** | **14.73%** |
| End-Turn low-hand rate | 10.3% | 0.4% |

The broader version gained less than one percentage point of win rate while adding about one more card per game, triggering more often, and increasing deck-out by roughly three points.

**Decision:** use the empty-hand version.

## HOA Failure to Respond result

With Failure to Respond active only from Round 8 onward, HOA landed at approximately **48.5–48.6%** across the two Rock Star variants.

That is dramatically healthier than:

- the original always-on Ready-step tax, which was carrying too much power; and
- the no-passive HOA baseline, which fell well below the middle of the field.

Failure to Respond therefore looks like a strong thematic and mechanical candidate. It creates urgency without taxing the opponent's economy every Turn.

It is now the **live production passive**; physical play should still validate whether the Round-8 deadline feels fair and exciting.

## Current balance signals

### Closest to target in this harness
- HOA President with Failure to Respond: ~48.5%
- Florida Man: ~45%
- Rock Star with Comeback Tour: ~56%

### Running hot
- Trash Baron: ~61%
- Backyard Wrestler: ~69%

### Running cold / simulator-sensitive
- Birthday Party Magician: ~20%

The Magician result is notably lower than the earlier revision-6 simulation (~42%), indicating that its exact win rate is especially sensitive to bounce/replay AI. The reliable signal is that its hand engine is active; physical play should determine whether it lacks pressure or whether simulation sequencing is undervaluing it.

## Decision from this test

**Rock Star locks to:**

> **Comeback Tour — At the end of your Turn, if you have no cards in hand, Draw 3 cards.**

The one-or-fewer version is not needed. It creates substantially more card throughput for almost no additional win-rate benefit.

## Next recommended tests

1. Physically validate HOA Failure to Respond as the new production passive.
2. Investigate Wrestler/Expendable efficiency before touching Tag Out itself.
3. Investigate Salvage engine density and Trash Baron's resource access together.
4. Test Magician with human pilots before nerfing or buffing it based on simulation win rate.
5. Continue tracking first-player advantage; it remained above 60% in this heuristic harness.
