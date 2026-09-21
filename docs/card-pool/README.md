# Unhinged Card Pool

> Alpha 0.03 “Mongo” working pool. Machine-readable data is canonical; all balance numbers remain playtestable until the build is explicitly frozen.

## Pool

- **6 colors**
- **30 cards per color**
- **180 cards total**
- Per color: **18 Units / 8 Actions / 4 Items**
- Baseline deck: **40 cards = 26 Units / 8 Actions / 6 Items**
- Leaders live separately in `leaders.json`.

## Current Color Identities

| Color | Core Identity | Primary Trait |
|---|---|---|
| **Reckless** | Risk, aggression, burst Power | Daredevil |
| **Unruly** | Teamwork, momentum, bodies, buffs | Team |
| **Crooked** | Manipulation, exhaust, bounce, disruption | Sketchy |
| **Makeshift** | Items, recycling, scavenging, repurposing | Scavenger |
| **Stubborn** | Guard, blocking, prevention, denial | Authority |
| **Kamikaze** | Death triggers, sacrifice, recursion | Fanatic |

## Items

**Actions are moments. Items are possessions.**

Items enter play and remain on the board. An Item only attaches when its text tells you to attach it; otherwise it remains as a standalone Item.

An Item may eventually dismiss itself, explode, be consumed, transfer, or be destroyed. That is healthy when the Item can **sit on the board first and create visible pressure**.

Design rule: avoid Items whose normal play pattern is “play it, automatically get a one-round boost, immediately dismiss it.” If the card is effectively a one-shot moment with no meaningful board presence, it should normally be an Action.

Persistent rule-changing Items are explicitly encouraged.

When a card carrying attached Items leaves play, put those attached Items into their Owners’ discards unless a card says otherwise. This cleanup does **not** count as Dismiss.

## Rules architecture

Color identity is a **design/deckbuilding identity, not a source of special rules**.

All gameplay starts from the same global rules. A Leader, Unit, Action, or Item may create an exception through its printed text. Keywords are globally defined and apply only to cards carrying them.

**September 21 rewrite direction:** retire Junk Pile as a separate zone and let Makeshift interact with the normal Discard instead. The canonical card/Leader data still contains legacy Junk text until the coordinated rewrite is completed. **One Man's Trash** is the working Trash Baron signature concept for limited Item access from Discard.



## Responses

**SOFT LOCK:** Response is currently a special timing designation/subtype on an **Action**, not a fifth base card type.

A Response states its exact legal timing in plain English and may be Played during an opponent's Turn only at that printed window. Attack Responses, Action Responses, and other narrow event Responses are valid design space. Exact chaining limits remain open.

## Keywords

- **Explosive:** An Explosive blocker retaliates even if it is defeated by the incoming attack.
- **Slowpoke:** A Slowpoke Unit does not deal retaliation damage when it blocks.

## Current Leaders

| Color | Leader | Health | Role |
|---|---|---:|---|
| Reckless | Florida Man | 18 | Aggro / Items |
| Unruly | Little League Coach | 22 | Midrange / Team |
| Crooked | ROOT | 20 | Tempo / Actions |
| Makeshift | Trash Baron | 21 | Junk / Recycling |
| Stubborn | HOA President | 20 | Control / Defense |
| Kamikaze | Backyard Wrestler | 20 | Death / Sacrifice |

## Trait Model

Leaders currently have **exactly 4 Traits**. Units, Actions, and Items may have up to **3 Traits**.

The pool now uses primary-color concentrations plus shared secondary Traits rather than requiring every color pair to have one exclusive bridge. See [traits.md](./traits.md).

Notable change: **Undead now belongs to Makeshift + Kamikaze**, not Stubborn + Kamikaze.

## Files

- [cards.json](./cards.json) — canonical cards
- [leaders.json](./leaders.json) — canonical Leaders
- [test-decks.json](./test-decks.json) — six curated baseline decks
- [rules-lab.md](./rules-lab.md) — current LAB rules snapshot
- [design-audit-2026-09-21.md](./design-audit-2026-09-21.md) — 180-card decision-tree / mature-game audit
- [../current-state-2026-09-21.md](../current-state-2026-09-21.md) — latest project checkpoint
- [meta-audit-2026-09-19.md](./meta-audit-2026-09-19.md) — current cross-color balance / usage audit
- [meta-decks.json](./meta-decks.json) — 30 optimized heuristic stress-test lists
- [traits.md](./traits.md) — Trait model and distribution
- [leaders.md](./leaders.md) — readable Leader roster
- [Reckless](./reckless.md)
- [Unruly](./unruly.md)
- [Crooked](./crooked.md)
- [Makeshift](./makeshift.md)
- [Stubborn](./stubborn.md)
- [Kamikaze](./kamikaze.md)
