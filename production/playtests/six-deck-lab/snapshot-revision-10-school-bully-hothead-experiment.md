# Revision 10 School Bully Hothead Experiment

**Simulation-only experiment. No production card text changed.**

School Bully is treated as:

> **3 Cost · 4/2**  
> **Hothead. Sucker Punch. Chicken.**

This corrected run preserves the original revision-10 AI play priorities. Hothead is the only experimental variable.

## Run

- 30,000 games
- Same deterministic seeds as the corrected revision-10 baseline
- 1,000 games per starting order for each of 15 unordered matchups
- Corrected winner handling
- Censored games: **0**

## Overall

| Metric | Rev 10 baseline | Bully Hothead | Delta |
| --- | ---: | ---: | ---: |
| First-player win % | 46.79 | 47.11 | +0.32 |
| Avg Rounds | 8.38 | 8.49 | +0.11 |
| Median Rounds | 8 | 8 | — |

## Magician A/B

| Metric | Baseline | Bully Hothead | Delta |
| --- | ---: | ---: | ---: |
| Win % | 32.2 | 45.9 | 13.70 |
| Attacks/game | 6.955 | 8.852 | 1.897 |
| Leader attacks/game | 4.966 | 5.981 | 1.015 |
| Direct attacks/game | 1.989 | 2.871 | 0.882 |
| Leader damage/game | 9.896 | 13.188 | 3.292 |
| Blocks/game | 2.754 | 2.241 | -0.513 |
| Characters defeated/game | 5.444 | 4.978 | -0.466 |
| Own Returns/game | 2.665 | 3.364 | 0.699 |
| Opp Returns/game | 0.08 | 0.079 | -0.001 |
| Extra Draw/game | 4.268 | 4.284 | 0.016 |
| Ace triggers/game | 1.678 | 1.709 | 0.031 |
| Deck-out % | 2.11 | 1.47 | -0.64 |

## Magician matchups

| Opponent | Baseline win % | Bully Hothead win % | Delta |
| --- | ---: | ---: | ---: |
| Florida Man | 37.7 | 58.6 | 20.9 |
| Washed-Up Rock Star | 7.4 | 16.1 | 8.7 |
| Trash Baron | 20.5 | 39.0 | 18.5 |
| HOA President | 62.0 | 72.2 | 10.2 |
| Backyard Wrestler | 33.4 | 43.8 | 10.4 |

## Magician per-round state with Bully Hothead

| Round | n | Mag HP | Opp HP | Mag hand | Opp hand | Mag chars | Opp chars | Mag in play | Opp in play |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 10000 | 24.90 | 25.00 | 5.84 | 6.05 | 0.58 | 0.43 | 0.67 | 0.47 |
| 2 | 10000 | 24.23 | 24.70 | 5.15 | 5.35 | 0.80 | 0.95 | 1.00 | 1.03 |
| 3 | 10000 | 22.97 | 23.88 | 4.60 | 4.43 | 0.98 | 1.44 | 1.23 | 1.55 |
| 4 | 9996 | 21.08 | 22.72 | 4.09 | 3.38 | 1.16 | 2.00 | 1.44 | 2.15 |
| 5 | 9698 | 18.57 | 21.73 | 3.66 | 2.53 | 1.24 | 2.52 | 1.56 | 2.72 |
| 6 | 8341 | 16.75 | 20.79 | 3.02 | 1.68 | 1.53 | 2.73 | 1.87 | 2.99 |
| 7 | 6641 | 15.81 | 19.66 | 2.45 | 0.99 | 1.72 | 2.58 | 2.08 | 2.87 |
| 8 | 5114 | 15.05 | 17.96 | 2.14 | 0.62 | 1.88 | 2.14 | 2.29 | 2.45 |
| 9 | 3877 | 14.06 | 15.86 | 1.90 | 0.46 | 2.10 | 1.76 | 2.57 | 2.09 |
| 10 | 2756 | 12.90 | 13.79 | 1.79 | 0.39 | 2.20 | 1.53 | 2.73 | 1.89 |
| 11 | 1778 | 12.08 | 11.89 | 1.77 | 0.33 | 2.13 | 1.42 | 2.70 | 1.77 |
| 12 | 980 | 11.21 | 10.75 | 1.24 | 0.19 | 1.65 | 1.18 | 2.14 | 1.51 |

Full per-round telemetry for all six decks and all event counters is in the accompanying JSON.
