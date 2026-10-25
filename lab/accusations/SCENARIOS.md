# Accusations Lab — Scenario Catalog

**Status: CURRENT LAB PROTOTYPE (not production Unhinged).** This is the organized reference for the Scenario cards currently defined in [RULES.md](RULES.md), section 11, and their starter-deck quantities in section 12. **RULES.md remains authoritative** if this catalog and the executable playtest diverge. Scenario presentation is **landscape / horizontal**, visually distinct from portrait Character cards.

Scenarios are sorted by **Leader**, then by **ascending cost**. Each Scenario scores **1 Verdict** when successfully resolved. Costs and effects below reflect the existing lab card pool; they have **not** been rebalanced for the proposed Character-funded filing mechanic.

## HOA President — Stonewall

| Cost | Scenario | Starter copies | Current effect |
|---:|---|---:|---|
| 1 | **Your Grass Is 0.3 Inches Too Tall!** | 2 | Supporting Characters get -1 Power (minimum 0). On success, draw 1 Main card. |
| 2 | **Your Christmas Lights Are Still Up in March!** | 3 | Requires **at least two** contesting Characters to prevent default success. One contester is not enough; default failure still applies. |
| 2 | **You Parked on the Wrong Side of the Street!** | 1 | When an opponent commits a Character here, that Character Rotates. |
| 3 | **Unauthorized Lawn Flamingo!** | 2 | Supporting Characters get +1 Health. On success, opponent dismisses an Item they control, if able. |
| 4 | **That's Not Up to Code!** | 2 | Attached Items on supporting Characters cannot be dismissed by opposing Actions. Instead of default success, requires a supporter with attached Item and **no** contesters. Default failure still applies. |

**Starter Scenario Deck:** 10 cards — Cost 1 ×2; Cost 2 ×4; Cost 3 ×2; Cost 4 ×2.

## Florida Man — Reckless

| Cost | Scenario | Starter copies | Current effect |
|---:|---|---:|---|
| 1 | **Hold My Beer, This Is a Shortcut!** | 2 | Supporting Characters get +1 Power and -1 Health. |
| 2 | **That's Definitely Not Street Legal!** | 2 | Characters here with Power 4 or more get -1 Health. On success, Ready one Stash card. |
| 3 | **There's a Gator in My Pool!** | 3 | Whenever a Character is defeated here, its controller may immediately commit a Home Character here, respecting capacity. On success, draw 1 Main card. |
| 3 | **I Can Explain the Fireworks!** | 1 | Instead of default success, requires at least **two supporters** and **zero contesters** at start of turn. On success, deal 2 damage to an opposing Character at another Scenario, if any. Default failure still applies. |
| 4 | **The Neighbors Called the Cops Again!** | 2 | Opposing contesting Characters enter Rotated. On success, return one opposing Character from another Scenario to its owner's Home, if possible. |

**Starter Scenario Deck:** 10 cards — Cost 1 ×2; Cost 2 ×2; Cost 3 ×4; Cost 4 ×2.

## Existing Scenario fundamentals

- There are three shared Scenario slots; each player may control at most two active Scenarios.
- Each player has a separate 10-card Scenario Deck and opens with two Scenario cards (the written rules permit a mulligan, although the initial browser implementation does not).
- Under the **current implemented rules**, a Scenario is played by paying its Stash cost, and the owner immediately commits at least one Character to support it.
- At the start of its owner's next turn, a Scenario with supporters and no contesters normally succeeds; if it has no supporters, it fails. Printed conditions can modify these checks.
- When a Scenario leaves play, its owner draws a replacement Scenario; successful prosecution scores 1 Verdict; first to 5 wins.

## Design discussion — TESTING, not yet implemented

Recent playtesting found that early turns feel slow because both a Character and Scenario require Stash, and high-cost opening Scenarios can be unplayable. The proposed alternative is to **file Scenarios by rotating Ready Characters**, using printed Character costs as contributions, potentially supplemented by rotated Stash. At least one Character would have to participate, and contributing Characters would commit to that Scenario. Filing on the turn a Character enters, while still restricting immediate attacks, is also under discussion.

**These are design proposals, not rules changes.** No payment model, Scenario cost curve, or card effects are changed by this catalog. When a version is approved, update RULES.md, the live playtest, and this catalog together.

## Visual direction

- **Scenario cards:** landscape, approximately 1.7:1; prominent accusation title, filing cost, rule text; amber/gold accent and an `ACCUSATION • SCENARIO` banner.
- **Characters:** portrait-style cards, visually differentiated from Scenarios.
- Display landscape Scenarios both in players' hands and across the three center slots.
