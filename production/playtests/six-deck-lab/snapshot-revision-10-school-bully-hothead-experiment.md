# Revision 10 School Bully Hothead Experiment

**Simulation-only experiment. No production card text changed.**

School Bully is treated as:

> **3 Cost · 4/2**  
> **Hothead. Sucker Punch. Chicken.**

All other revision-10 rules, cards, decks, seeds, and the second-player temporary-Stash setup are unchanged.

## Run

- 30,000 games
- 1,000 games per starting order for each of the 15 unordered matchups
- Corrected winner handling
- 60-round safety cap
- Censored games: **0**

## Overall

| Metric | Rev 10 baseline | Bully Hothead | Delta |
| --- | ---: | ---: | ---: |
| First-player win % | 46.79 | 47.11 | +0.32 |
| Avg Rounds | 8.38 | 8.47 | +0.09 |
| Median Rounds | 8 | 8 | — |

## Magician A/B

| Metric | Baseline | Bully Hothead | Delta |
| --- | ---: | ---: | ---: |
| Win % | 32.2 | 51.84 | 19.64 |
| Attacks/game | 6.955 | 9.672 | 2.717 |
| Leader attacks/game | 4.966 | 6.413 | 1.447 |
| Direct attacks/game | 1.989 | 3.259 | 1.270 |
| Leader damage/game | 9.896 | 14.635 | 4.739 |
| Blocks/game | 2.754 | 1.85 | -0.904 |
| Characters defeated/game | 5.444 | 4.426 | -1.018 |
| Own Returns/game | 2.665 | 3.579 | 0.914 |
| Opp Returns/game | 0.08 | 0.076 | -0.004 |
| Extra Draw/game | 4.268 | 3.511 | -0.757 |
| Ace triggers/game | 1.678 | 1.641 | -0.037 |
| Deck-out % | 2.11 | 0.4 | -1.71 |

## Magician matchups

| Opponent | Baseline win % | Bully Hothead win % | Delta |
| --- | ---: | ---: | ---: |
| Florida Man | 37.7 | 65.7 | 28.0 |
| Washed-Up Rock Star | 7.4 | 22.3 | 14.9 |
| Trash Baron | 20.5 | 44.8 | 24.3 |
| HOA President | 62.0 | 78.8 | 16.8 |
| Backyard Wrestler | 33.4 | 47.6 | 14.2 |

## Magician per-round state with Bully Hothead

| Round | n | Mag HP | Opp HP | Mag hand | Opp hand | Mag chars | Opp chars | Mag in play | Opp in play |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 10000 | 24.90 | 25.00 | 5.84 | 6.05 | 0.58 | 0.43 | 0.67 | 0.47 |
| 2 | 10000 | 24.23 | 24.70 | 5.15 | 5.35 | 0.80 | 0.95 | 1.00 | 1.03 |
| 3 | 10000 | 22.99 | 23.71 | 4.56 | 4.42 | 1.02 | 1.39 | 1.28 | 1.50 |
| 4 | 9997 | 21.24 | 22.25 | 4.02 | 3.36 | 1.23 | 1.87 | 1.51 | 2.02 |
| 5 | 9668 | 19.00 | 21.08 | 3.52 | 2.47 | 1.30 | 2.31 | 1.60 | 2.51 |
| 6 | 8372 | 17.15 | 20.21 | 2.81 | 1.60 | 1.57 | 2.53 | 1.89 | 2.80 |
| 7 | 6685 | 16.13 | 19.06 | 2.23 | 0.94 | 1.76 | 2.43 | 2.10 | 2.74 |
| 8 | 5143 | 15.39 | 17.22 | 1.85 | 0.62 | 1.94 | 2.03 | 2.32 | 2.37 |
| 9 | 3864 | 14.21 | 15.09 | 1.62 | 0.52 | 2.10 | 1.76 | 2.54 | 2.13 |
| 10 | 2625 | 13.05 | 13.26 | 1.48 | 0.47 | 2.10 | 1.64 | 2.60 | 2.04 |
| 11 | 1619 | 12.24 | 11.74 | 1.28 | 0.40 | 1.94 | 1.52 | 2.44 | 1.93 |
| 12 | 894 | 11.45 | 10.97 | 0.86 | 0.25 | 1.55 | 1.23 | 2.00 | 1.60 |

Full per-round telemetry for all six decks and all event counters is in the accompanying JSON.
