# Unhinged Card Pool

> Working design pool. Names, costs, stats, wording, and classifications are provisional unless explicitly locked elsewhere.

## Pool Target

- **6 colors**
- **30 cards per color**
- **180 cards total**
- **Canonical distribution: 18 Units / 8 Actions / 4 Items per color**
- The machine-readable source of truth is [cards.json](./cards.json).
- The current web playtest loads curated **40-card two-color LAB decks** from `test-decks.json`, using the 26 Units / 8 Actions / 6 Items test skeleton.
- Leaders are tracked separately in [leaders.json](./leaders.json), with a human-readable roster in [leaders.md](./leaders.md).

A two-color deck currently has access to **60 unique cards** before copy limits, giving a 40-card deck meaningful cuts and alternate packages.

## Current Color Identities

| Color | Core Identity | Resource / Economy Identity |
|---|---|---|
| **Reckless** | Risk, aggression, burst Power | **Pain is fuel.** Self-damage buys above-rate effects. |
| **Unruly** | Teamwork, momentum, bodies, buffs | **People create momentum.** Existing Units help deploy or empower more Units. |
| **Crooked** | Manipulation, exhaust, bounce, disruption | **Make them pay.** Opponents can be forced to pay resources or accept a worse outcome. |
| **Makeshift** | Scrappy value, Items, recycling, scavenging | **Waste is fuel.** Discarded cards and unused value can become resources. |
| **Stubborn** | Resilience, Guard, blocking, prevention | **Patience pays.** Discounts for waiting, defending, or being behind. |
| **Kamikaze** *(working name)* | Death triggers, sacrifice, recursion | **Death is fuel.** Units dying converts into cards, damage, discounts, or resources. |

## Makeshift: Junk Pile Direction

Makeshift uses a face-up **Junk Pile** with a maximum of **3 cards**.

Once each round, when one of your cards is dismissed or one of your Units dies, you may put that card into your Junk Pile instead of your discard. If the Junk Pile is full, dismiss one card from it before adding another.

Junk has **no inherent effect and generates no Resource**. Individual Makeshift cards and Leaders can use, move, play, or care about Junk. The purpose is to preserve the scavenging/recycling fantasy while preventing the zone from becoming an automatic resource engine.

## Tribal Bridges

Each two-color pair has a shared Trait/theme so tribal decks are not locked to one color.

| Colors | Shared Trait / Theme |
|---|---|
| Reckless + Unruly | Party |
| Reckless + Crooked | Outlaw |
| Reckless + Makeshift | Florida Man |
| Reckless + Stubborn | Menace |
| Reckless + Kamikaze | Daredevil |
| Unruly + Crooked | Hustler |
| Unruly + Makeshift | Performer |
| Unruly + Stubborn | Team |
| Unruly + Kamikaze | Fanatic |
| Crooked + Makeshift | Sketchy |
| Crooked + Stubborn | Authority |
| Crooked + Kamikaze | Saboteur |
| Makeshift + Stubborn | Scavenger |
| Makeshift + Kamikaze | Vermin |
| Stubborn + Kamikaze | Undead |

## Current Leaders

| Color | Leader | Deck Role | Health | Notes |
|---|---|---|---:|---|
| Reckless | Florida Man | Aggro | 18 | Item-dismissing synergy; offensive Leader |
| Unruly | Little League Coach | Midrange | 22 | Classification provisional |
| Crooked | ROOT | Tempo | 20 | Actions and disruption; Backdoor readies a Unit that cannot attack this round |
| Makeshift | Trash Baron | Scrap / recycling | 21 | Scavenging, Vermin, recursion, Repurpose/Scrap synergy |
| Stubborn | HOA President | Control | 21 | Guard, blocking, denial; first blocker gets +1 Guard |
| Kamikaze | Backyard Wrestler | Death / sacrifice | 20 | Whenever one of your Units dies, ready one exhausted Resource |

## Leader Vulnerability

Using a Leader's Exhaust ability exhausts that Leader. An exhausted Leader is **Vulnerable** until it readies. A Vulnerable Leader may be attacked directly, bypassing normal Unit protection.

## Trait Reference

The current pool contains **21 distinct Traits**. See [traits.md](./traits.md) for the full human-readable index, current color coverage, tribal bridges, and every card/Leader using each Trait.

Current tribal bridges:

**Party, Outlaw, Florida Man, Menace, Daredevil, Hustler, Performer, Team, Fanatic, Sketchy, Authority, Saboteur, Scavenger, Vermin, Undead.**

## Design Rules

1. **Color identity comes first, tribe second, Leader synergy third.**
2. Leaders should have a few especially strong matches, but the whole color must not become "that Leader's deck."
3. Traits should deliberately cross color boundaries.
4. Not every Unit needs text. Vanilla and near-vanilla Units establish the game's stat language.
5. Actions should carry a large share of tactical interaction.
6. Items should remain meaningful without becoming mandatory in every deck.
7. Kamikaze is currently treated as a **sixth color**, not Neutral.

## Machine-Readable Pool

The simulator loads `docs/card-pool/cards.json` for cards, `docs/card-pool/leaders.json` for Leaders, and `docs/card-pool/test-decks.json` for curated test decks. Leader definitions have stable IDs and include color, health, Traits, passive ability, Exhaust ability, role, and design status.

## Files

- [cards.json](./cards.json) — canonical card-pool data
- [leaders.json](./leaders.json) — canonical Leader data
- [leaders.md](./leaders.md) — human-readable Leader roster and abilities
- [traits.md](./traits.md) — human-readable Trait index and tribal map
- [test-decks.json](./test-decks.json) — curated simulator decklists
- [Reckless](./reckless.md)
- [Unruly](./unruly.md)
- [Crooked](./crooked.md)
- [Makeshift](./makeshift.md)
- [Stubborn](./stubborn.md)
- [Kamikaze](./kamikaze.md)

## Next Audit

Before expanding beyond 180, audit:

- mana/resource curve by color
- Unit stat efficiency
- Action density
- Item density
- card draw/filtering
- direct Leader damage
- removal / bounce / exhaust
- recursion
- Guard manipulation
- death triggers
- Trait counts by color and two-color pair
- Leader-specific synergies
- vanilla / near-vanilla ratio
- resource-engine interactions
