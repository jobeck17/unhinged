# Mongo Meta Audit — 2026-09-19

> **Important:** Trait-aware heuristic stress test, not a rules-complete engine. Exact percentages are directional.

## Latest Kamikaze micro-nerf

Four cards that were selected essentially everywhere Kamikaze was available were shaved rather than rewriting the color:

- **Crash-Test Dummy:** 5/2 → **4/2**
- **Doom Rooster:** 6/6 → **6/5**
- **Blood Price:** “Sacrifice a Unit. Draw 2.” → **“Sacrifice a Unit. Draw 2, then discard a card.”**
- **Definitely Safe Helmet:** cost 1 → **2**

These are deliberately small cuts across body efficiency, card advantage, and Item efficiency.

## Current optimized field

| Rank | Leader | Secondary | Heuristic field rate |
|---:|---|---|---:|
| 1 | Florida Man | Kamikaze | 57.8% |
| 2 | Backyard Wrestler | Reckless | 57.6% |
| 3 | Little League Coach | Kamikaze | 55.5% |
| 4 | ROOT | Kamikaze | 55.4% |
| 5 | Trash Baron | Kamikaze | 55.0% |
| 6 | HOA President | Kamikaze | 54.4% |
| 7 | Backyard Wrestler | Makeshift | 53.4% |
| 8 | Backyard Wrestler | Stubborn | 52.9% |

## Kamikaze read

- Kamikaze remains the strongest secondary color in the heuristic field, but the top cluster compressed.
- Average field rate of the five **off-color Leader + Kamikaze** builds is **55.6%**.
- Kamikaze still appears in 5 of the top 8 optimized builds.
- The four trimmed cards remain playable; the goal here was to shave efficiency, not delete them.

## Splash auto-selection

| Color | All 5 off-color Leaders | At least 4/5 |
|---|---:|---:|
| Reckless | 13 | 17 |
| Unruly | 9 | 12 |
| Crooked | 10 | 13 |
| Makeshift | 11 | 16 |
| Stubborn | 13 | 14 |
| Kamikaze | 14 | 16 |

## Interpretation

This is a **successful minor trim**, not a full color reset. The model moves the Kamikaze cluster down by roughly half a point to a point depending on pairing, while leaving Backyard Wrestler's own decks functional.

If human play still shows Kamikaze as the automatic secondary after this, the next knob should be another small cut to one of the remaining universal sacrifice Actions rather than more Leader surgery.
