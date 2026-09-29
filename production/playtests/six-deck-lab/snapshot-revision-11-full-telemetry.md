# Revision 11 Full Telemetry Baseline

**Date:** September 29, 2026  
**Games:** 30,000  
**Card pool:** Donut revision 11  
**Deck set:** six-deck-lab-8

School Bully is now **3 Cost · 4/2 · Hothead. Sucker Punch. Chicken.** No other production card text changed from revision 10.

## Conditions

- Corrected winner handling from the revision-10 telemetry harness.
- Same deterministic paired-seed structure as the corrected revision-10 baseline.
- Original revision-10 AI play priorities preserved; Hothead is the only card-text variable.
- War winner skips the first Draw.
- Second player always accepts the optional temporary Stash in this simulation.
- Revision-8 Jerry-Rig reduction remains active.
- 1,000 games per starting order for each of 15 unordered matchups.
- Censored games: **0**.

## Overall

- First-player win rate: **47.11%**
- Average game length: **8.49 Rounds**
- Median game length: **8 Rounds**

## Deck summary

| Leader | Win rate | Avg Rounds | Attacks | Leader damage | Extra Draw | Deck-out |
| --- | --- | --- | --- | --- | --- | --- |
| Florida Man | 52.91% | 8.55 | 10.16 | 15.89 | 1.45 | 0.02% |
| Washed-Up Rock Star | 70.91% | 8.11 | 11.44 | 19.60 | 10.07 | 8.26% |
| Birthday Party Magician | 45.90% | 9.06 | 8.85 | 13.19 | 4.28 | 1.47% |
| Trash Baron | 61.72% | 8.46 | 10.97 | 17.91 | 2.31 | 0.09% |
| HOA President | 24.04% | 8.09 | 5.41 | 8.16 | 1.85 | 0.19% |
| Backyard Wrestler | 44.52% | 8.65 | 9.81 | 13.14 | 1.65 | 0.06% |


## Head-to-head win-rate matrix

Each cell is the **row deck's win rate against the column deck**.

| Deck | Florida | Rock Star | Magician | Trash | HOA | Wrestler |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **Florida** | — | 37.5% | 41.4% | 43.3% | 78.2% | 64.3% |
| **Rock Star** | 62.5% | — | 84.0% | 47.2% | 93.0% | 67.9% |
| **Magician** | 58.6% | 16.1% | — | 39.0% | 72.2% | 43.8% |
| **Trash** | 56.8% | 52.8% | 61.0% | — | 77.2% | 60.9% |
| **HOA** | 21.9% | 7.0% | 27.9% | 22.9% | — | 40.6% |
| **Wrestler** | 35.8% | 32.1% | 56.3% | 39.1% | 59.4% | — |


## Current matchup read

- **Rock Star** is broadly strong, not merely a Magician counter. It beats Florida, Magician, HOA, and Wrestler, while losing narrowly to Trash Baron.
- **Trash Baron** is currently favored into all five other mono-Style decks, including a narrow **52.8% to 47.2%** edge over Rock Star.
- **Magician** now has a pronounced counter profile: favored into Florida and HOA, close but unfavored into Wrestler, unfavored into Trash Baron, and extremely weak into Rock Star.
- **HOA** is broadly weak in the current heuristic field rather than simply having one bad counter.
- Aggregate win rate should not be the sole tuning target. Pairwise matchup shape is important for preserving a counter-driven meta.

Full per-round telemetry and event counters are in the accompanying JSON.
