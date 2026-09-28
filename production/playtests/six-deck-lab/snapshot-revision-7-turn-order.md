# Revision 7 Turn-Order + Ace Up My Sleeve Snapshot

**Date:** September 28, 2026  
**Card pool:** revision 7  
**Decks:** six mono-Style baselines  
**Games:** 30,000 per main condition

## Rules tested

Shared production rules:

- War winner goes first each Round.
- War winner skips the Draw step of their first Turn.
- Leaders begin at 25 Health.
- Washed-Up Rock Star uses **Comeback Tour**.
- HOA President uses **Failure to Respond** beginning in Round 8.
- Trash Baron remains uncapped and may use opposing Ready Stash.
- Revision-7 Misdirection, Salvage, and Expendable card changes are active.

### Magician candidate

**Ace Up My Sleeve:** Once during your Turn, when one of your Characters is Returned from play to your hand, Ready 1 Stash.

### Second-player setup candidate

After mulligans are complete, the player going second may put the top card of their deck face up and Rotated into their Stash.

- It Readies normally during that player's first Ready step.
- It is temporary Stash.
- When used to pay a Cost, put it into its owner's discard.
- The player may still use their normal once-per-Round Stash from hand.
- The rule is optional.

## Main A/B: turn-order compensation

| Metric | Ace / no second-player bonus | Ace / temporary Stash |
| --- | ---: | ---: |
| First-player win rate | **65.06%** | **54.98%** |
| Average Rounds | 14.83 | 14.80 |

The temporary setup Stash removed roughly **10 percentage points** of first-player advantage without meaningfully changing game length.

## Deck results with Ace + temporary Stash

| Leader | Win rate | Deck-out | Extra Draw/game |
| --- | ---: | ---: | ---: |
| Florida Man | 46.0% | 0.00% | 1.50 |
| Washed-Up Rock Star | 61.6% | 12.40% | 9.91 |
| Birthday Party Magician | 27.6% | 10.48% | 5.35 |
| Trash Baron | 60.3% | 0.22% | 2.35 |
| HOA President | 48.8% | 0.45% | 2.03 |
| Backyard Wrestler | 55.6% | 0.03% | 1.70 |

These exact deck win rates are heuristic and should not be treated as tournament forecasts.

## Ace Up My Sleeve vs former Draw passive

Under the same second-player temporary-Stash condition:

| Magician passive | Magician win rate | Extra Draw/game | Deck-out |
| --- | ---: | ---: | ---: |
| **Ace Up My Sleeve** | **27.6%** | **5.35** | **10.48%** |
| Former Draw-on-Return | 21.3% | 10.21 | 26.90% |

Ace improved the model result while dramatically reducing runaway card throughput and deck-out.

The Magician remains the simulator's largest outlier. This is expected to be especially sensitive to bounce sequencing, combat selection, when to hold Responses, and when to Return damaged Characters. Human play should determine whether it needs additional pressure or whether the heuristic AI is simply undervaluing its lines.

## Optionality check

A deliberately crude test where Rock Star and Magician always declined the setup Stash produced **58.30%** first-player wins, worse than the always-take condition.

This does **not** mean the rule should be mandatory. It means the temporary Stash is usually valuable enough that even high-turnover decks should seriously consider taking it. The word **may** remains useful for unusual deck-out states and future deck designs.

## Current read

- **Turn order:** the temporary Stash is the strongest balance result so far and is adopted as the working baseline.
- **Magician:** Ace Up My Sleeve is adopted as the working passive. Human testing remains essential.
- **Wrestler:** revision-7 card changes materially reduced the earlier overperformance without touching Tag Out.
- **HOA:** Failure to Respond remains near the middle of the field.
- **Rock Star:** still hot, but its identity and play pattern are working.
- **Trash Baron:** still hot; continue tuning surrounding Salvage value rather than capping the Leader passive.
- **Florida Man:** remains close enough to baseline for human play before further changes.

