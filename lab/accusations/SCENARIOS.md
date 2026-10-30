# Accusations Lab — Scenario Catalog

**Status: CURRENT LAB PROTOTYPE (not production Unhinged).** This is the organized reference for the Scenario cards currently defined in [RULES.md](RULES.md), section 11, and their starter-deck quantities in section 12. **RULES.md remains authoritative** if this catalog and the executable playtest diverge. Scenario presentation is **landscape / horizontal**, visually distinct from portrait Character cards.

Scenarios are sorted by **Leader**, then by **ascending cost**. Each Scenario scores **1 Verdict** only when its owner **actively Rotates an eligible Ready supporting Character to attack the effectively undefended Scenario**, after the opposing player has had a full turn to respond. No automatic start-of-turn successes. Costs and effects below reflect the existing lab card pool; they have **not** been rebalanced for the proposed Character-funded filing mechanic.

## HOA President — Stonewall

| Cost | Scenario | Starter copies | Current effect |
|---:|---|---:|---|
| 1 | **Your Grass Is 0.3 Inches Too Tall!** | 2 | Supporting Characters get -1 Power (minimum 0). On success, draw 1 Main card. |
| 2 | **Your Christmas Lights Are Still Up in March!** | 3 | **No special ability** in the current TESTING baseline. Like every Scenario, it can only be claimed when the opponent has **zero** Characters there. |
| 2 | **You Parked on the Wrong Side of the Street!** | 1 | When an opponent commits a Character here, that Character Rotates. |
| 3 | **Unauthorized Lawn Flamingo!** | 2 | Supporting Characters get +1 Health. On success, opponent dismisses an Item they control, if able. |
| 4 | **That's Not Up to Code!** | 2 | Attached Items on supporting Characters cannot be dismissed by opposing Actions. A claim attack requires a supporter with an attached Item and **no** contesters. Default failure still applies. |

**Starter Scenario Deck:** 10 cards — Cost 1 ×2; Cost 2 ×4; Cost 3 ×2; Cost 4 ×2.

## Florida Man — Reckless

| Cost | Scenario | Starter copies | Current effect |
|---:|---|---:|---|
| 1 | **Hold My Beer, This Is a Shortcut!** | 2 | Supporting Characters get +1 Power and -1 Health. |
| 2 | **That's Definitely Not Street Legal!** | 2 | Characters here with Power 4 or more get -1 Health. On success, Ready one Stash card. |
| 3 | **There's a Gator in My Pool!** | 3 | Whenever a Character is defeated here, its controller may immediately commit a Home Character here, respecting capacity. On success, draw 1 Main card. |
| 3 | **I Can Explain the Fireworks!** | 1 | A claim attack requires at least **two supporters** and **zero contesters**. On success, deal 2 damage to an opposing Character at another Scenario, if any. Default failure still applies. |
| 4 | **The Neighbors Called the Cops Again!** | 2 | Opposing contesting Characters enter Rotated. On success, return one opposing Character from another Scenario to its owner's Home, if possible. |

**Starter Scenario Deck:** 10 cards — Cost 1 ×2; Cost 2 ×2; Cost 3 ×4; Cost 4 ×2.

## Existing Scenario fundamentals

- There are three shared Scenario slots; each player may control at most two active Scenarios.
- Each player has a separate 10-card Scenario Deck and opens with two Scenario cards (the written rules permit a mulligan, although the initial browser implementation does not).
- **Current filing rule:** Rotate one or more Ready Characters at Home to contribute their printed Character costs toward a Scenario. You may supplement the cost with Ready Stash (1 each), but at least one Character must file. Those Characters immediately commit to the new Scenario and remain Rotated. Newly played Characters can file immediately.
- **Current movement rule (TESTING):** A Ready Character at Home may commit to an existing Scenario **without Rotating**, and established Characters can then attack that turn. New Characters may be played directly to an existing Scenario; they enter Ready but cannot normally attack on entry turn. Characters cannot voluntarily withdraw or transfer between Scenarios. At the end of a Scenario, survivors return Home retaining rotation, damage and attachments. Combat can target Ready or Rotated opponents at the same Scenario.
- At the start of its owner's turn, a Scenario with **no supporters fails**. Otherwise, it stays until its owner deliberately **attacks it with a Ready supporting Character**, after the opponent has had a response turn and **only when zero opposing Characters remain**. Scenario text may add requirements; no current card bypasses defenders. An undefended Scenario never awards a free Verdict.
- When a Scenario leaves play, its owner draws a replacement Scenario; successful prosecution scores 1 Verdict; first to 5 wins.

## Open balance questions — TESTING

The mixed Character-and-Stash filing mechanic, **Rotate-to-file**, **Ready-preserving ordinary commitment**, and **active Scenario-claim attack into a strictly empty opposing side** are current LAB TESTING rules. **BANKED, not active:** permitting a claim through one contester might be revisited on a higher-cost Scenario (**more than Cost 2**) after baseline testing; no exact cost or card text has been approved. The defender's separate finishing attack and the timing of dismissal after the last supporting Character is defeated remain OPEN. Still evaluate first-player advantage, opening Scenario cost distribution, ease of defending, whether Character contributions should be capped, and whether the special-Scenario effects remain fun with active claims. Scenario values and starter deck quantities have not yet been rebalanced.

## Visual direction

- **Scenario cards:** landscape, approximately 1.7:1; prominent accusation title, filing cost, rule text; amber/gold accent and an `ACCUSATION • SCENARIO` banner.
- **Characters:** portrait-style cards, visually differentiated from Scenarios.
- Display landscape Scenarios both in players' hands and across the three center slots.
