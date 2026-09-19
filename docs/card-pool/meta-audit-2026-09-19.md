# Mongo Meta Audit — 2026-09-19

> **Important:** This is a trait-aware heuristic deck-search and matchup stress test. It is useful for finding outliers, cross-color abuse, automatic inclusions, and dead cards. Exact percentages are directional, not tournament forecasts.

## Methodology update

Because Leaders now have four meaningful Traits and Actions/Items can also carry Traits, the optimizer now gives a small synergy bonus when a card shares a **non-Human Trait** with its Leader. This is more faithful to the current card model than treating Traits as decoration.

The full stress process also included the earlier ~1.67 million sampled matchup pass and 25 sensitivity sweeps. The JSON in `meta-decks.json` stores the deterministic trait-aware optimizer field used for longitudinal comparisons.

## Optimized field leaders

| Rank | Leader | Secondary | Heuristic field rate |
|---:|---|---|---:|
| 1 | Backyard Wrestler | Reckless | 61.3% |
| 2 | Florida Man | Kamikaze | 57.4% |
| 3 | Backyard Wrestler | Makeshift | 57.3% |
| 4 | Backyard Wrestler | Stubborn | 57.0% |
| 5 | Backyard Wrestler | Crooked | 56.6% |
| 6 | Backyard Wrestler | Unruly | 55.6% |
| 7 | Trash Baron | Kamikaze | 55.5% |
| 8 | Little League Coach | Kamikaze | 55.0% |
| 9 | ROOT | Kamikaze | 54.8% |
| 10 | HOA President | Kamikaze | 54.4% |
| 11 | HOA President | Reckless | 50.8% |
| 12 | Trash Baron | Reckless | 50.5% |

The old **HOA + Kamikaze** 63%+ outlier is gone. The current high-side watch remains **Backyard Wrestler + Reckless**, while HOA/Kamikaze is in the upper-middle cluster.

## Low-end combinations

| Leader | Secondary | Heuristic field rate |
|---|---|---:|
| ROOT | Unruly | 42.5% |
| Florida Man | Unruly | 44.0% |
| Trash Baron | Unruly | 44.4% |
| ROOT | Stubborn | 45.0% |
| Florida Man | Crooked | 45.5% |
| HOA President | Unruly | 45.8% |

## Card popularity methodology

Raw inclusion is misleading because the 40-card skeleton forces different proportions by type.

- Units: 26 of 36 available = **72.2% structural baseline**
- Actions: 8 of 16 = **50.0%**
- Items: 6 of 8 = **75.0%**

Primary metric:

**slot-adjusted inclusion = optimized inclusion rate - structural slot baseline**

That avoids penalizing expensive cards simply because they cannot be played early.

## Highest slot-adjusted inclusions

| Card | Color | Type | Cost | Inclusion | Adjusted |
|---|---|---|---:|---:|---:|
| Blood Price | Kamikaze | Action | 1 | 100% | +50.0 |
| Detonate | Kamikaze | Action | 1 | 100% | +50.0 |
| No, No, Watch This | Reckless | Action | 1 | 100% | +50.0 |
| Scrounge | Makeshift | Action | 1 | 100% | +50.0 |
| Worth It | Kamikaze | Action | 2 | 100% | +50.0 |
| Call Security | Crooked | Action | 1 | 90% | +40.0 |
| Group Text | Unruly | Action | 1 | 90% | +40.0 |
| Overcommit | Reckless | Action | 1 | 90% | +40.0 |
| Roll Call | Unruly | Action | 1 | 90% | +40.0 |
| This Seemed Like a Good Idea | Kamikaze | Action | 1 | 90% | +40.0 |
| Wrong Address | Crooked | Action | 1 | 90% | +40.0 |
| Absolutely Not | Stubborn | Action | 1 | 80% | +30.0 |

## Lowest slot-adjusted inclusions

| Card | Color | Type | Cost | Inclusion | Adjusted |
|---|---|---|---:|---:|---:|
| Bachelorette Party | Reckless | Unit | 2 | 0% | -72.2 |
| Bomb Rat | Kamikaze | Unit | 1 | 0% | -72.2 |
| Cat Hoarder | Makeshift | Unit | 3 | 0% | -72.2 |
| Cockroach | Makeshift | Unit | 1 | 0% | -72.2 |
| Fake Psychic | Crooked | Unit | 3 | 0% | -72.2 |
| Feral Chihuahua | Reckless | Unit | 1 | 0% | -72.2 |
| Identity Thief | Crooked | Unit | 3 | 0% | -72.2 |
| Karaoke Champion | Reckless | Unit | 2 | 0% | -72.2 |
| MLM Rep | Unruly | Unit | 2 | 0% | -72.2 |
| Overenthusiastic Volunteer | Kamikaze | Unit | 1 | 0% | -72.2 |
| Rabid Rat | Kamikaze | Unit | 2 | 0% | -72.2 |
| Script Kiddie | Crooked | Unit | 1 | 0% | -72.2 |

## Splash auto-selection by color

| Color | Picked by all 5 off-color Leaders | Picked by at least 4/5 |
|---|---:|---:|
| Reckless | 13 | 16 |
| Unruly | 10 | 13 |
| Crooked | 11 | 15 |
| Makeshift | 12 | 17 |
| Stubborn | 13 | 16 |
| Kamikaze | 13 | 17 |

The trait-aware pass is especially important here: **Stubborn falls to 12 universal splash picks**, four fewer than the earlier trait-blind pass. That is the target reduction requested for the color. Makeshift gained desirable options, while Kamikaze remains the densest premium package and deserves continued monitoring.

## Current balance read

- **HOA/Stubborn:** the overbearing HOA problem is substantially solved in the heuristic field. Red Tape is no longer sitting on top of the meta.
- **Makeshift:** Shopping Cart Knight and Mystery Drawer of Cables successfully became desirable cards.
- **Kamikaze:** still has a premium sacrifice/death package. This is now more important than HOA as a pool-level watch.
- **Backyard Wrestler:** unlimited death-ramp plus Reckless is the only combination consistently brushing the 60% line.
- **Folding Chair:** is not itself the source of the Wrestler outlier. Cost/3-or-less tuning barely moved the model; the larger engine is death-ramp plus the Reckless/Kamikaze card package.
- **Traits:** now materially change optimized deck selection, which is exactly why the trait-aware model should be the baseline going forward.
