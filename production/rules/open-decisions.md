# Open Decisions After the September 27 Architecture Pass

This file now tracks only decisions that remain genuinely open after the September 27 design interview. The production rulebook contains the current test rules.

## Immediate controlled tests

| Topic | Current test | Comparison needed |
| --- | --- | --- |
| First-player Draw | **War winner skips the Draw step of their first Turn.** | Adopted after the baseline simulation reduced first-player advantage materially. Continue measuring after card-flow tuning. |
| Response Cost | Responses pay normal Cost with Ready Stash. | Test whether this creates useful open-resource decisions or makes defensive interaction too expensive. |
| Rock Star passive | **Comeback Tour:** end your Turn with no cards in hand -> Draw 3. | Adopted after a full A/B against the version that refilled to 3 from one or fewer cards. Preserve Packed House for future Momentum design space. |
| Florida Man passive | Damaged Characters gain Hothead + Sucker Punch. | Test whether both keywords together are exciting without making self-damage trivial to exploit. |
| HOA passive | **Locked: Failure to Respond — beginning in Round 8, opposing Characters cannot Block your Attacks.** | Validate the Round-8 clock in physical play; the old Ready-step tax is retired from the active Leader. |
| Tag Out | End of opponent Turn: Return one damaged Character, then free-play another Character of same Cost or less. | Test On Play loops, tempo, and whether 'another Character' sufficiently prevents abuse. |
| Magician passive | **Whenever one of your Characters is Returned from play to your hand, Draw a card.** | Test whether Bounce now sustains hand size without creating runaway replay loops. Preserve the former put-damage concept in the idea bank for a card or future Leader. |

## Card-pool rebuild

**Completed September 28, 2026.** All 180 cards were reviewed and the production pool was rebuilt around the new Style/package architecture. The current work is validation and tuning, not migration from the old pool.

The historical Keep / Rehome / Rewrite / Replace audit remains in `production/cards/rebuild-audit-2026-09-27.md` as the rationale record.

### Per-Style structure

- 30 cards per Style remains the starting-set target.
- No fixed Character / Action / Item ratio.
- Salvage may intentionally run more Items.
- Responses count as Actions.
- Internal excitement target: **2 Best / 4 Better / 6 Good / 18 Simple-support**.
- Most Styles should have roughly two major packages, but this is a guideline, not a law.
- Each package should receive enough cards to function in mono-Style construction.
- Preserve package-neutral staples and straightforward threats so decks are not preassembled engines.

## Style and package map

| Style | Broad identity | Starting packages |
| --- | --- | --- |
| Reckless | Damage + risk | Damage Everywhere; Self-Damage / Damaged Characters |
| Momentum | Growth + chaining + economy acceleration | Chain / Acceleration; Low Hand |
| Misdirection | Movement + deception | Bounce / Return; Manipulation / Deception |
| Salvage | Reuse + scavenging + repurposing | Items / Jerry-Rig / Repurpose; Scrounge / Big Hand |
| Stonewall | Denial + stall + reaction | Freeze / Stall; Reaction / Denial |
| Expendable | Sacrifice + death value + recursion | Sacrifice / Defeat Value; Recursion / Refuse to Stay Dead |

## Economy identities

- **Reckless:** borrow from future economy may be tested, but avoid heavy bookkeeping.
- **Momentum:** true Ramp and selective Stash Recharge.
- **Misdirection:** inspect, retrieve, exchange, or otherwise manipulate normally unknowable Stash.
- **Salvage:** Jerry-Rig temporary Stash and exploitation of unused Stash.
- **Stonewall:** temporary Stash denial/tax.
- **Expendable:** convert Characters into temporary purchasing power or Cost reduction.

### Jerry-Rig

Current rule:

> **Jerry-Rig:** If this Item would go to your discard, you may put it face up and Rotated into your Stash instead. When this card is used to pay a Cost, discard it.

Current test direction is to give Jerry-Rig to every Salvage Item and initially impose no once-per-Round cap. The Item is not mechanically an Item while in Stash.

### Salvage unused-Stash Action

Preserve for card design:

> Rotate up to 3 Ready Stash. Draw a card for each Stash Rotated this way.

The chosen Stash may belong to either player or be mixed across players. Exact Cost and final wording require testing.

## Hand-economy directions

### Momentum Low Hand

Approved mechanical space includes:

- bonuses while you have fewer cards than an opponent;
- bonuses while you have 2 or fewer cards in hand;
- symmetrical hand reset effects such as all players discarding their hands and Drawing 3;
- effects that Return opposing Characters to increase the opponent's hand;
- catch-up Draw such as Drawing until you have as many cards as an opponent;
- rewards based on an opponent having a large hand.

Momentum should have very little Hothead, possibly none, because Hothead is a natural counter to Bounce-based tempo.

### Salvage Big Hand / Scrounge

Salvage should build a large hand primarily through scavenging and recovery rather than generic raw Draw.

Approved directions include:

- recover Items or Characters from discard;
- reveal/search narrow categories of cards;
- accumulate hand resources;
- rewards for having more cards than an opponent;
- threshold rewards such as having 6 or more cards in hand.

**Hoarder** is reserved for this package. **Coupon Lady** may become either Momentum Ramp or Salvage Big Hand depending on final card design.

## Keyword status

### Active / promoted for the rebuild

- Hothead
- Defiant
- Explosive
- Slowpoke
- Sucker Punch, working name
- Jerry-Rig

### Approved candidates

- Chicken
- Stubborn
- Bodyguard, working name

### Shelved

- Sneaky
- Cloak
- Stack
- Step Aside
- Overkill

Do not force a keyword merely to give each Style a proprietary mechanic.

## Character design guidance

- Most Character abilities should be static, triggered, or On Play.
- Rotate abilities should be uncommon.
- Board presence should create must-answer Characters.
- Some marquee cards may combine an On Play ability with a persistent engine.
- A recurring architecture may let an already-Rotated Character remain Rotated during its Ready step in exchange for either:
  - a one-time payoff; or
  - an ongoing effect that lasts only while it remains Rotated.
- If another effect Readies that Character later, an ongoing 'while Rotated this way' effect ends.
- Keep this architecture as card text for now rather than committing to a keyword.
- Some clean early Characters may be textless or keyword-only.
- Large late-game bodies may sometimes be threatening primarily because of stats, but no Style is required to contain the same generic stat monster.
- Trait effects should be scattered appropriately and work as upside. Example design space: 'Your other Wrestlers have Hothead.'
- Traits themselves remain meaningless until referenced.

## Leader design guidance

Current starting Leaders:

- Florida Man -> Self-Damage / Damaged Characters
- Washed-Up Rock Star -> Low Hand / Refill
- Birthday Party Magician -> Bounce / Return
- Trash Baron -> Repurpose / Stash exploitation
- HOA President -> Freeze / Stall
- Backyard Wrestler -> Sacrifice / Defeat Value

Leader goals:

- one visible automatic passive for now;
- no Trait references in the starting Leader passives;
- bend a basic game rule when possible;
- change overall playstyle without simply giving raw efficiency;
- give the opponent a visible way to play around the passive;
- direct Leader damage from passives should be rare, not forbidden;
- activated Leader abilities may return in later testing.

Do not design the second Leader per Style until the rebuilt card pool shows what the second package actually needs.

## Rebuild validation priorities

- Verify each major package functions in mono-Style construction.
- Build and test all six current Leader decks against the rebuilt cards.
- Test two-Style combinations for multiplicative package interactions.
- Run the dedicated first-player Draw vs. no-first-Draw simulation with no other rule changes.
- Tune Costs, Power, Guard, and package density only after the engines are observed in play.

## Remaining naming / presentation decisions

- Sucker Punch is a working keyword name.
- Bodyguard is a working keyword name.
- Final printed Style names remain Reckless / Momentum / Misdirection / Salvage / Stonewall / Expendable for this iteration, but final product naming/legal review is later.
- Card-frame and final rarity/product presentation remain later production work.
