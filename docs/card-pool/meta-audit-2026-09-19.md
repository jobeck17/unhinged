# Mongo Meta Audit — 2026-09-19

> **Important:** Trait-aware heuristic stress test, not a rules-complete engine. Exact percentages are directional.

## Latest change set

- Backyard Wrestler now readies one Resource only on the **first friendly Unit death each round**.
- The 12 cards that were previously 0% optimizer selections were given targeted jobs rather than generic stat inflation.
- The rescue pass intentionally fills color gaps: anti-wall aggression, Party/Hustler support, top-deck manipulation, Junk/Animal support, and cheap death/Vermin support.
- First-death Wrestler strength is modeled using the magnitude from our earlier one-death vs two-death A/B rather than pretending the heuristic directly simulates resource-chain frequency.

## Current optimized field

| Rank | Leader | Secondary | Heuristic field rate |
|---:|---|---|---:|
| 1 | Florida Man | Kamikaze | 58.3% |
| 2 | Backyard Wrestler | Reckless | 58.2% |
| 3 | Little League Coach | Kamikaze | 56.1% |
| 4 | ROOT | Kamikaze | 56.0% |
| 5 | Trash Baron | Kamikaze | 55.6% |
| 6 | HOA President | Kamikaze | 54.8% |
| 7 | Backyard Wrestler | Makeshift | 54.0% |
| 8 | Backyard Wrestler | Stubborn | 53.5% |
| 9 | Backyard Wrestler | Crooked | 52.9% |
| 10 | Backyard Wrestler | Unruly | 52.3% |
| 11 | Trash Baron | Reckless | 51.8% |
| 12 | HOA President | Reckless | 51.1% |

No optimized combination is currently above 60% in this pass. HOA/Kamikaze remains controlled, and Backyard Wrestler/Reckless falls from the prior ~61% unlimited-ramp result to about 58%.

## Original 0% card rescue

| Card | Color | Optimized inclusion now | Slot-adjusted |
|---|---|---:|---:|
| Feral Chihuahua | Reckless | 100% | +27.8 |
| Bachelorette Party | Reckless | 90% | +17.8 |
| Karaoke Champion | Reckless | 50% | -22.2 |
| MLM Rep | Unruly | 20% | -52.2 |
| Script Kiddie | Crooked | 90% | +17.8 |
| Fake Psychic | Crooked | 20% | -52.2 |
| Identity Thief | Crooked | 80% | +7.8 |
| Cockroach | Makeshift | 70% | -2.2 |
| Cat Hoarder | Makeshift | 10% | -62.2 |
| Bomb Rat | Kamikaze | 50% | -22.2 |
| Overenthusiastic Volunteer | Kamikaze | 20% | -52.2 |
| Rabid Rat | Kamikaze | 50% | -22.2 |

The goal is **not** to eliminate every 0% card forever. A 40-card skeleton necessarily leaves cards out, and when one weak card improves, another card can become the new marginal exclusion. The useful question is whether a card has a real deckbuilding job and whether the same card remains dead across multiple builds and human tests.

## Splash auto-selection

| Color | All 5 off-color Leaders | At least 4/5 |
|---|---:|---:|
| Reckless | 13 | 17 |
| Unruly | 9 | 12 |
| Crooked | 10 | 13 |
| Makeshift | 11 | 16 |
| Stubborn | 13 | 14 |
| Kamikaze | 14 | 16 |

## Read

- **HOA:** no longer the meta tyrant.
- **Backyard Wrestler:** first-death wording is cleaner and pulls the optimized Reckless pairing under 60% in the calibrated model.
- **Kamikaze:** still the strongest secondary-color magnet overall. Its premium sacrifice package remains the main pool-level watch.
- **Makeshift:** has useful Item/Junk engines now; Cockroach and Cat Hoarder give the Undead/Animal edge more texture.
- **Crooked:** Script Kiddie, Fake Psychic, and Identity Thief now create an actual information/top-deck/trait-manipulation package.
- **Reckless:** the low-cost Party cards now have real jobs, including an anti-wall angle against high Guard.
- **Unruly:** MLM Rep now gives Hustler a meaningful bridge payoff instead of just being a temporary +Power body.
