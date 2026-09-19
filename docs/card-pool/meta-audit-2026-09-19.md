# Mongo Meta Audit — 2026-09-19

> **Important:** This is a heuristic deck-search and matchup stress test. It is useful for finding outliers, cross-color abuse, automatic inclusions, and dead cards. It is **not** a rules-complete engine, so exact percentages are directional rather than tournament predictions.

## What was audited

- 180-card pool
- 24 Items and the standalone/attached Item model
- all 6 Leaders
- all 30 legal Leader + secondary-color combinations
- six curated 40-card baseline decks
- current Traits on Units, Actions, Items, and Leaders
- structural card popularity normalized for deck-slot pressure
- optimized cross-archetype substitutions

## Important synchronized changes

- Items may be standalone or attached. Items are allowed to dismiss themselves later; the design ban is specifically against play-and-immediately-vanish pseudo-Actions.
- Folding Chair replaced Cheap Parachute and is gated by Daredevil attachment.
- ROOT's active now fully readies a Unit.
- HOA President is 20 Health.
- HOA Vice President now applies -1 Power to an off-cycle readied Unit instead of re-exhausting it.
- Four Stubborn walls have **Slowpoke**.
- Crash-Test Dummy, Doom Rooster, and Exploding Clown have **Explosive**.
- Makeshift gained stronger Item support on Shopping Cart Knight and Mystery Drawer of Cables.
- Undead moved conceptually to Makeshift + Kamikaze.
- Leaders now use exactly four Traits; Actions and Items may carry Traits.

## Optimized field leaders

| Rank | Leader | Secondary | Heuristic field rate |
|---:|---|---|---:|
| 1 | Backyard Wrestler | Reckless | 60.8% |
| 2 | Florida Man | Kamikaze | 57.4% |
| 3 | HOA President | Kamikaze | 57.0% |
| 4 | Backyard Wrestler | Makeshift | 56.7% |
| 5 | Backyard Wrestler | Stubborn | 56.4% |
| 6 | Little League Coach | Kamikaze | 55.9% |
| 7 | Trash Baron | Kamikaze | 55.9% |
| 8 | Backyard Wrestler | Crooked | 55.5% |
| 9 | Backyard Wrestler | Unruly | 54.1% |
| 10 | ROOT | Kamikaze | 53.9% |
| 11 | HOA President | Reckless | 52.2% |
| 12 | Trash Baron | Reckless | 50.1% |

The former HOA/Kamikaze monster is no longer the top outlier. The current high-side watch item is **Backyard Wrestler + Reckless**. HOA/Kamikaze now sits in the upper-middle cluster instead of dominating the field.

## Low-end combinations

| Leader | Secondary | Heuristic field rate |
|---|---|---:|
| ROOT | Unruly | 41.8% |
| Trash Baron | Unruly | 44.4% |
| Florida Man | Unruly | 44.5% |
| ROOT | Stubborn | 44.5% |
| ROOT | Makeshift | 45.1% |
| Little League Coach | Crooked | 45.4% |

Low combinations are not automatically balance failures. The design goal is primarily to prevent a small number of combinations from becoming oppressive.

## Card popularity methodology

Raw inclusion is misleading because the 40-card skeleton forces different proportions by card type.

- Units: choose 26 of 36 available two-color Units = **72.2% structural baseline**
- Actions: choose 8 of 16 = **50.0%**
- Items: choose 6 of 8 = **75.0%**

The primary popularity metric is therefore:

**slot-adjusted inclusion = optimized inclusion rate - structural slot baseline**

This also avoids falsely calling a 5- or 6-cost card dead simply because it is not playable in early rounds.

## Highest slot-adjusted inclusions

| Card | Color | Type | Cost | Inclusion | Adjusted |
|---|---|---|---:|---:|---:|
| Blood Price | Kamikaze | Action | 1 | 100% | +50.0 |
| Detonate | Kamikaze | Action | 1 | 100% | +50.0 |
| Group Text | Unruly | Action | 1 | 100% | +50.0 |
| No, No, Watch This | Reckless | Action | 1 | 100% | +50.0 |
| Overcommit | Reckless | Action | 1 | 100% | +50.0 |
| Scrounge | Makeshift | Action | 1 | 100% | +50.0 |
| This Seemed Like a Good Idea | Kamikaze | Action | 1 | 100% | +50.0 |
| Worth It | Kamikaze | Action | 2 | 100% | +50.0 |
| Call Security | Crooked | Action | 1 | 90% | +40.0 |
| Dig In | Stubborn | Action | 2 | 90% | +40.0 |
| No, I'm Fine | Reckless | Action | 2 | 90% | +40.0 |
| Take One for the Team | Kamikaze | Action | 1 | 90% | +40.0 |

## Lowest slot-adjusted inclusions

| Card | Color | Type | Cost | Inclusion | Adjusted |
|---|---|---|---:|---:|---:|
| Rabies Shot | Stubborn | Item | 1 | 0% | -75.0 |
| Bomb Rat | Kamikaze | Unit | 1 | 0% | -72.2 |
| Cat Hoarder | Makeshift | Unit | 3 | 0% | -72.2 |
| Cockroach | Makeshift | Unit | 1 | 0% | -72.2 |
| Dance Mom | Unruly | Unit | 2 | 0% | -72.2 |
| Dumpster Revenant | Kamikaze | Unit | 3 | 0% | -72.2 |
| Fake Psychic | Crooked | Unit | 3 | 0% | -72.2 |
| Feral Chihuahua | Reckless | Unit | 1 | 0% | -72.2 |
| Identity Thief | Crooked | Unit | 3 | 0% | -72.2 |
| Karaoke Champion | Reckless | Unit | 2 | 0% | -72.2 |
| MLM Rep | Unruly | Unit | 2 | 0% | -72.2 |
| Overenthusiastic Volunteer | Kamikaze | Unit | 1 | 0% | -72.2 |

## Splash auto-selection by color

| Color | Picked by all 5 off-color Leaders | Picked by at least 4/5 |
|---|---:|---:|
| Reckless | 14 | 17 |
| Unruly | 12 | 14 |
| Crooked | 11 | 14 |
| Makeshift | 12 | 17 |
| Stubborn | 16 | 17 |
| Kamikaze | 15 | 19 |

These counts need context because the deck skeleton itself forces many selections. They are most useful longitudinally, comparing a color before and after tuning.

## Current balance read

- **HOA/Stubborn:** the broad nerf worked. HOA is no longer the clear meta tyrant.
- **Makeshift:** the two requested upgrades worked. The color has more cards an optimizer actively wants.
- **Kamikaze:** still has a dense premium package, especially sacrifice Actions. This is the main pool-level watch item.
- **Backyard Wrestler:** unlimited death-ramp is now the primary high-side Leader watch. Do not infer that Folding Chair alone is the cause.
- **Slowpoke walls:** PTA President and Old Dog in particular can fall very low in optimizer selection. They are candidates for later rescue if human play confirms they became too weak.
- **Traits:** the pool is much healthier structurally. Human remains intentionally broad; gameplay Traits now have primary concentrations with real cross-color support.

## Files

- `cards.json` and `leaders.json` remain canonical.
- `meta-decks.json` contains the 30 optimized heuristic lists and the full slot-adjusted inclusion table.
- This report should be regenerated after any material cost/stat/Leader change.
