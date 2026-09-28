# Revision 6 Simulation Snapshot — Card Flow + Low-End Pressure

**Date:** September 28, 2026  
**Pool:** 0.2-donut-rebuild, revision 6  
**Decks:** six mono-Style 40-card baselines

## Test conditions

- 30,000 seeded games.
- All 15 unique matchups.
- 1,000 seeds per matchup with both starting positions, for 2,000 games per matchup.
- War winner **skips the Draw step of their first Turn**.
- HOA President's Ready-step tax is **paused**.
- Current survival-retaliation combat, one Blocker, Stash economy, current card text, current Leader passives.
- AI uses deterministic heuristics for Stash choices, card sequencing, Bounce targets, combat targeting, Blocking, and optional abilities.
- Results are best treated as **structural signals**, not final competitive win rates. Small differences can be AI artifacts; large differences and repeated economy/pacing patterns are meaningful.

## Overall result

| Metric | Revision 6 |
| --- | ---: |
| Games | 30,000 |
| First-player win rate | **60.07%** |
| Average game length | **8.64 Rounds** |
| Median game length | **8 Rounds** |
| Average extra Draw / deck / game | **2.47** |
| Average deck-out rate | **0.29%** |

The preceding skip-first-Draw baseline averaged roughly 16 Rounds. The card-flow and higher-Power/lower-Guard tuning nearly cut game length in half **without changing 25 Leader Health**.

## Deck results

| Leader | Win rate | Extra Draw/game | Empty-hand turns | ≤1-card turns | Deck-out | Leader trigger/game |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Florida Man | **55.7%** | 1.39 | 23.6% | 30.6% | 0.00% | 7.07 |
| Washed-Up Rock Star | **41.5%** | 2.38 | 42.6% | 50.2% | 0.00% | 1.93 |
| Birthday Party Magician | **41.9%** | 4.22 | 13.0% | 18.4% | 1.36% | 1.63 |
| Trash Baron | **68.7%** | 3.46 | 23.5% | 29.6% | 0.37% | 7.37 |
| HOA President | **30.6%** | 1.23 | 23.8% | 27.3% | 0.00% | 0.00 |
| Backyard Wrestler | **61.6%** | 2.16 | 26.0% | 36.2% | 0.00% | 0.26 |

## Hand-size curve

Average hand size at the end of each player's own Turn:

| Own Turn | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| All decks | 6.30 | 5.64 | 4.82 | 3.81 | 2.80 | 1.67 | 0.78 | 0.47 |
| Florida Man | 6.23 | 5.55 | 4.57 | 3.61 | 2.61 | 1.51 | 0.47 | 0.09 |
| Rock Star | 6.90 | 5.37 | 4.02 | 2.17 | 0.78 | 0.08 | 0.00 | 0.00 |
| Magician | 6.11 | 5.78 | 5.09 | 4.11 | 3.42 | 2.56 | 1.96 | 2.00 |
| Trash Baron | 6.03 | 5.34 | 4.72 | 3.98 | 3.00 | 1.90 | 0.80 | 0.25 |
| HOA | 6.50 | 6.42 | 5.97 | 5.35 | 4.41 | 2.65 | 0.89 | 0.18 |
| Wrestler | 6.05 | 5.36 | 4.56 | 3.66 | 2.60 | 1.33 | 0.55 | 0.30 |

Because the median game now ends around Round 8, late-turn starvation matters less than it did in the previous 16-Round baseline. Rock Star remains a clear exception: Low Hand is becoming **no hand** too often.

## Leader-health curve

Average Leader Health among games/players reaching each own Turn:

| Own Turn | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| All decks | 24.97 | 24.72 | 23.92 | 22.58 | 20.84 | 19.39 | 18.25 | 16.93 |

The faster game is coming primarily from more meaningful early attacks and fragile offensive bodies, not from reducing Leader Health.

## Package engagement

| Style | Package A | Package B |
| --- | --- | --- |
| Reckless | Self-Damage: 91.6% engaged, 2.21 events/game | Damage/Combat: 64.0%, 1.10 |
| Momentum | Acceleration: 83.7%, 1.95 | Low Hand/Refill: 99.9%, 5.85 |
| Misdirection | Bounce/Return: **88.9%**, 5.44 | Manipulation/Replay: 25.8%, 0.49 |
| Salvage | Repurpose/Jerry-Rig: 98.0%, 8.11 | Scrounge/Big Hand: 99.4%, 5.30 |
| Stonewall | Freeze/Stall: 35.0%, 0.95 | Reaction/Denial: 61.5%, 0.96 |
| Expendable | Sacrifice/Defeat: 90.2%, 2.14 | Recursion/Tag: 75.6%, 2.11 |

### Misdirection finding

The Bounce package is now **functioning**. It went from an engine that rarely activated to one that engages in nearly nine of ten games. The deck also maintains the healthiest late hand.

Its remaining weakness is therefore **not lack of cards**. It needs more tempo/board conversion from bouncing: efficient attack bodies, enter/leave payoffs, and interaction that turns replaying Characters into pressure.

### Momentum finding

Low Hand activates constantly, but the deck still empties itself. This is no longer simply a need for generic Draw. The package needs a better relationship between acceleration, refill, and payoff so that “low hand” means intentionally operating at 1–3 cards, not repeatedly ending at zero.

### Stonewall finding

Pausing the HOA tax dropped the deck sharply. This confirms the prior tax was carrying too much of Stonewall's power.

A separate 15,000-game knob test using a toned-down tax that can hold back **one Rotated Character or Item, but never Stash**, produced an HOA win rate of approximately **44.8%**. That is a promising next version to test.

### Salvage finding

Trash Baron remains too efficient. A separate test limiting his passive to **one opposing Stash per Turn** still left the deck around **65.5%**. The strength is therefore not only unlimited opposing-Stash spending; the rebuilt Salvage engines themselves are generating exceptional value.

A much stricter test that allowed opposing Stash only after the Baron had exhausted all of his own resources dropped him to the mid-40s, which is likely too far. The correct tuning point is between those models.

## Matchup table

| Matchup | First deck win | Second deck win |
| --- | ---: | ---: |
| Florida Man vs Rock Star | 60.4% | 39.6% |
| Florida Man vs Magician | 54.4% | 45.6% |
| Florida Man vs Trash Baron | 36.0% | 64.0% |
| Florida Man vs HOA | 74.1% | 25.9% |
| Florida Man vs Wrestler | 53.7% | 46.3% |
| Rock Star vs Magician | 61.8% | 38.2% |
| Rock Star vs Trash Baron | 20.2% | 79.8% |
| Rock Star vs HOA | 63.8% | 36.2% |
| Rock Star vs Wrestler | 22.4% | 77.5% |
| Magician vs Trash Baron | 31.5% | 68.5% |
| Magician vs HOA | 66.8% | 33.2% |
| Magician vs Wrestler | 27.1% | 72.8% |
| Trash Baron vs HOA | 76.8% | 23.1% |
| Trash Baron vs Wrestler | 54.5% | 45.5% |
| HOA vs Wrestler | 34.4% | 65.7% |

## Current conclusions

1. **Keep the first-player opening Draw skip.** The edge is still about 60%, so continue watching it, but it is materially healthier than the draw-first baseline.
2. **Keep Leader Health at 25.** The pacing problem largely disappeared from card-flow and low-end pressure changes.
3. **Do not add more generic Draw to Misdirection right now.** It already draws more than enough; its problem is converting Bounce into board advantage.
4. **Momentum needs package-specific refill/payoff, not merely more raw Draw.**
5. **Restore HOA only in a toned-down form.** Character/Item-only tax is the leading test candidate; Stash should not be included in the next version.
6. **Trash Baron / Salvage needs targeted efficiency tuning.** The passive alone is not the whole problem.
7. **Wrestler remains hot but is closer to the healthy band.** Avoid nerfing Tag Out based solely on win rate because the Leader passive itself triggers infrequently.
8. **Florida Man is closest to a healthy baseline** in this model.

This snapshot should be rerun after the next targeted Stonewall, Momentum, and Salvage changes.
