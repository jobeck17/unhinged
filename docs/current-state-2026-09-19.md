# Unhinged Current State - 2026-09-19

> This is the current design checkpoint after the Mongo tuning pass and the September 19 identity/card-pool work.
>
> When this file conflicts with older brainstorming or prototype documents, this file describes the current state unless a newer dated checkpoint says otherwise.
>
> Canonical card data still lives in `docs/card-pool/cards.json` and `docs/card-pool/leaders.json`.

## Status legend

- ◆ **LOCKED** - foundation we are building on unless deliberately reopened.
- ● **COMMITTED CURRENT** - adopted current design, though normal balance numbers/text may still be tuned.
- 🧪 **LAB** - actively being tested; do not treat as frozen.
- ◇ **TABLED** - intentionally preserved for later, not part of the current game.
- × **SUPERSEDED / SCRAPPED** - no longer current.
- ? **OPEN** - needs an answer before the related layer can be frozen.

---

# 1. What we know for now

## Core game

◆ **40-card decks.**

◆ **One Leader starts in play.**

◆ **7-card opening hand.**

◆ **Opening mulligan:** after drawing 7, choose any number from 0 to 7 to replace. Draw that many replacement cards first, then shuffle the replaced cards back into the deck.

◆ **Primary win condition:** reduce the opposing Leader to 0 Health.

◆ **Alternating primary actions.** Players do not take long solitaire-style turns. A primary action may normally deploy a Unit, play an Action, play an Item, activate an ability, or attack.

◆ **Single unrestricted battlefield.**

× No Front Line / Back Line in the current baseline.

× No fixed lanes in the current baseline.

The older army-line and 3-lane prototypes remain useful design history, but they are not the current battlefield rules.

## Combat

◆ Units normally cannot attack the round they are deployed unless a card says otherwise.

◆ The defender may block one attack with **multiple Units**.

◆ Attack damage is assigned through blockers sequentially.

◆ **Universal Overflow:** excess attack damage continues through blockers and can reach the Leader.

◆ **Persistent damage:** damage remains until healed or the card leaves play.

◆ During defense, the defender may discard any number of cards from hand for **+1 Guard each**. Those cards go to discard.

◆ Guard added during defense does **not** increase retaliation Power.

◆ **Survivors-only retaliation:** after combat, each blocking Unit that survived the incoming attack deals its Power to the attacking Unit. A Unit defeated by the incoming attack normally does not retaliate.

● **Explosive:** an Explosive blocker retaliates even if it is defeated by the incoming attack.

● **Slowpoke:** a Slowpoke Unit does not deal retaliation damage when it blocks.

This current retaliation model supersedes the earlier Ashes-style paid counterattack prototype.

## Leaders and Vulnerable

◆ Every current Leader has a passive ability and an Exhaust ability.

◆ Using the Leader's Exhaust ability exhausts that Leader.

◆ An exhausted Leader is **Vulnerable** until it readies.

◆ A Vulnerable Leader may be attacked directly, bypassing normal Unit protection.

The Leader therefore creates a recurring decision between using its active ability and exposing itself.

---

# 2. Card types

## Units

◆ Units are the primary battlefield bodies and use Power / Guard combat stats.

● Vanilla Units remain part of the design language. Not every Unit needs an ability. Simple bodies provide a baseline for understanding how much an ability is worth.

## Actions

◆ **Actions are moments.**

◆ An Action resolves once and then goes to discard.

The older idea that one-shot effects might be Items is superseded. If a card's normal pattern is "play it, get an immediate one-round effect, disappear," it should normally be an Action.

## Items

◆ **Items are possessions and create board state.**

◆ Items enter play and remain in play.

◆ An Item attaches only if its own text tells you to attach it.

◆ Otherwise it remains as a standalone Item.

◆ A standalone Item may have static text, triggers, or Exhaust abilities.

◆ An attached Item is dismissed when its host leaves play unless a card says otherwise.

● Items may dismiss themselves as a cost or trigger when they had meaningful board presence first.

● Persistent rule-changing Items are encouraged.

× The old blanket rule "Items normally attach to Units" is superseded.

### Current canonical Item split

The current 180-card pool contains **24 Items**:

- **11 attachment-style Items**
- **13 standalone Items**

Attachment-style Items currently are:

1. Bath Salts
2. Gas Station Pills
3. Roman Candle
4. Participation Trophy
5. Duct Tape
6. Sharks with Freaking Laser Beams
7. Zip Ties
8. Decorative Boulder
9. Definitely Safe Helmet
10. Dead Man's Switch
11. Folding Chair

Standalone Items currently are:

1. Cooler Full of Bad Ideas
2. Hacky Sack
3. Orange Slices
4. Portable Bluetooth Speaker
5. Burner Phone
6. USB Drive You Found in the Parking Lot
7. Flipper Zero-ish Thing That Is Legally Distinct
8. Spoofed Keycard
9. Mystery Drawer of Cables
10. Security Camera
11. Rabies Shot
12. Ring Doorbell
13. Bong Water

This is why attachment-only mechanics should not automatically be treated as Makeshift's faction-wide identity.

---

# 3. Current card-pool structure

● The current Alpha 0.03 "Mongo" working pool contains **6 playtest pools**.

● Each pool currently contains **30 cards**:

- 18 Units
- 8 Actions
- 4 Items

● Total canonical pool: **180 cards**.

● Baseline 40-card deck skeleton:

- 26 Units
- 8 Actions
- 6 Items

The 30-card color pools are design/card-pool inventory. The 40-card deck skeleton is the current baseline construction target.

## Current identities

| Pool | Core identity | Primary Trait |
|---|---|---|
| **Reckless** | Risk, aggression, burst Power | Daredevil |
| **Unruly** | Teamwork, momentum, bodies, buffs | Team |
| **Crooked** | Manipulation, exhaust, bounce, disruption | Sketchy |
| **Makeshift** | Items, recycling, scavenging, repurposing | Scavenger |
| **Stubborn** | Guard, blocking, prevention, denial | Authority |
| **Kamikaze** | Death triggers, sacrifice, recursion | Fanatic |

◆ The five adjective identity names **Reckless, Unruly, Crooked, Makeshift, Stubborn** are the finalized naming direction.

🧪 **Kamikaze currently functions as a sixth playtest pool/archetype.** Its mechanical identity is real and heavily developed, but its final classification/name has not been given the same explicit lock as the five adjective identities.

---

# 4. Traits

◆ Every Leader currently has **exactly 4 Traits**.

◆ Units, Actions, and Items may have **0-3 Traits**.

◆ Traits may appear on Actions and Items. They are not Unit-only labels.

● Gameplay Traits should normally appear in at least two colors, though they may be heavily concentrated in a primary color.

● Human and Animal are broad identity Traits and are not balanced like gameplay tribes.

× Vehicle, Object, and Coach were removed from the active Trait pool because they were isolated one-card / one-Leader islands rather than useful deckbuilding hooks.

## Current Trait structure

| Pool | Primary | Secondary / cross-pool |
|---|---|---|
| Reckless | Daredevil | Menace, Party, Florida Man |
| Unruly | Team | Hustler, Performer, Party |
| Crooked | Sketchy | Hustler, Authority, Hacker, Saboteur |
| Makeshift | Scavenger | Sketchy, Hacker, Vermin, Undead |
| Stubborn | Authority | Team, Menace |
| Kamikaze | Fanatic | Daredevil, Undead, Saboteur |

● **Undead is currently a Makeshift + Kamikaze bridge**, not Stubborn + Kamikaze.

● Hacker intentionally exists outside Crooked as a cross-pool hook, especially through Makeshift tech and Stubborn surveillance Items.

---

# 5. Leaders

Leader health, card text, and balance may still be tuned, but this is the current canonical roster.

## Florida Man

● **Reckless - 18 Health**

Traits: Human, Florida Man, Daredevil, Menace

Role: Aggro / Items

Passive: You may play Items from your discard by paying their normal cost. Once each round after one of your Units attacks, another ready Unit you control gets +1 Power this round.

Exhaust: Dismiss an Item you control. A Unit you control gets +2 Power this round.

## Little League Coach

● **Unruly - 22 Health**

Traits: Human, Team, Authority, Hustler

Role: Midrange / Team

Passive: The first time each round you deploy a Unit costing 3 or more, it gets +1 Guard this round.

Exhaust: Choose a Unit you control. It gets +1 Power and +1 Guard this round.

## ROOT

● **Crooked - 20 Health**

Traits: Hacker, Sketchy, Saboteur, Hustler

Role: Tempo / Actions

Passive: The first time each round you play an Action that targets an enemy Unit, that Unit gets -1 Power this round.

Exhaust: Ready one of your exhausted Units.

## Trash Baron

● **Makeshift - 21 Health**

Traits: Human, Scavenger, Vermin, Sketchy

Role: Junk / Recycling

Passive: Once per round, at any point during the round, you may put one card from your discard into your Junk Pile. Your Junk Pile may not exceed 3 cards.

Exhaust: Play an Item from your Junk Pile, paying its normal cost.

## HOA President

● **Stubborn - 20 Health**

Traits: Human, Authority, Team, Menace

Role: Control / Defense

Passive: The first Unit you control that blocks each round gets +1 Guard this round.

Exhaust: Choose an enemy Unit. It gets -1 Power this round.

## Backyard Wrestler

🧪 **Kamikaze - 20 Health**

Traits: Human, Daredevil, Performer, Fanatic

Role: Death / Sacrifice

Passive: The first time each round one of your Units dies, ready one exhausted Resource.

Exhaust: Choose a Unit you control. It gets +2 Power this round. If it dies this round, draw a card.

## Leader design principle

● Leader health and ability budget should compensate each other rather than simply allowing the strongest offensive ability to sit on the largest Health pool.

● Leaders should create deck identity without forcing fixed preconstructed lists.

? Exact long-term deckbuilding restrictions remain open. The game should prevent the metagame from simply selecting the mathematically strongest Leader for every shell, but the final restriction system is not frozen.

---

# 6. Rules architecture

◆ **Base game rules are global.** They apply equally to every deck, Leader, color/pool, and Trait.

◆ A color/pool never grants a special gameplay rule merely because a deck uses that color.

◆ A Trait is only a label unless a card or global rule explicitly references it.

◆ Keywords are globally defined rules vocabulary. A keyword applies only to a card that carries it.

◆ **Card text is the exception layer.** A Leader, Unit, Action, or Item may add to, alter, or supersede a base rule through its printed text. When explicit card text directly conflicts with a base rule, the card text wins for that card/effect.

◆ A card may create a named zone, state, permission, or restriction. That mechanic exists because the card text created it, not because of the card's color.

● Trash Baron is the current example: **his printed passive creates and governs the Junk Pile. Makeshift itself has no Junk Pile rule.** Makeshift cards that reference a Junk Pile are support for a card-created mechanic.

◆ No faction-specific gameplay rule should live in the rulebook without being invoked by printed card text.

---

# 7. Resource system

🧪 **RESOURCE IS STILL LAB. DO NOT TREAT THIS SECTION AS FROZEN.**

The current balance harness uses a single dedicated Resource track:

- Start round 1 with 1 Resource.
- Add 1 Resource each round.
- Maximum 7.
- Ready Resources at the beginning of the round.
- Exhaust Resources to pay costs.

This current 1-to-7 shared system performed much better in simulation than turning Units into resources. It preserved card-play volume and hand size much more closely than the Unit-to-Resource experiment.

× **Unit-to-Resource as the main economy is not current.** Testing sharply reduced Units played, total cards played, mixed-card turns, and hand size.

◇ The older split Command / Stamina economy is preserved as design history but is not the current Mongo harness assumption.

◇ Action-only conversion, discard-for-Stamina, Over-Commanding, and other emergency-resource ideas remain outside the current frozen rules.

? Resource presentation and final physical implementation are still open.

---

# 8. Deckbuilding

🧪 Current LAB decks use:

- one Leader / primary pool
- one secondary pool

The current stress-test harness evaluates all **30 Leader + secondary-pool pairings**.

The six curated baseline decks are examples, not the only legal combinations.

? The exact permanent constructed-deck restriction is not frozen.

? Whether final deckbuilding remains two-pool, becomes mostly mono-pool with exceptions, or uses a different Leader identity restriction still needs to be decided through play.

◆ Constructed decks should remain interchangeable and player-built. Leaders should influence deck identity without dictating a fixed preconstructed list.

---

# 9. Archetype and play-pattern identity

◆ Different identities should change how players evaluate the same universal rules, not simply be different piles of stats.

The strongest proof so far was the death-trigger archetype: Kamikaze changes whether killing an opposing Unit is even desirable.

● Reckless should feel aggressive and willing to trade safety for immediate Power.

● Unruly should feel like bodies becoming better through teamwork, momentum, and group buffs.

● Crooked should create temporary asymmetry through manipulation, exhaustion, bounce, disruption, and Actions.

● Makeshift should get value from Items, scavenging, repurposing, reuse, and turning otherwise awkward material into useful value. Junk is one Trash Baron card package, not a Makeshift rule.

● Stubborn should win through Guard, blocking, prevention, denial, and refusing to move.

● Kamikaze should want death, sacrifice, recursion, and dangerous short-term exchanges.

◆ Not every card needs a special ability. Vanilla Units are useful for establishing the game's stat language.

---

# 10. Current balance references

These numbers are references, not immutable balance targets.

## Historical five-archetype benchmark

A prior 120,000-game balance pass produced:

| Archetype | Win rate |
|---|---:|
| Midrange | 55.5% |
| Aggro | 51.1% |
| Kamikaze | 48.2% |
| Tempo | 47.8% |
| Control | 47.4% |

This benchmark used an older five-archetype configuration and should be treated as a historical comparison point, not a claim about the current 180-card Mongo pool.

## Current heuristic 30-combination audit

The September 19 heuristic optimized-deck stress test currently spans roughly **44.1% to 55.5%** across the 30 primary + secondary combinations.

The current audit is most useful for:

- detecting color clustering
- finding splash packages that dominate too many shells
- identifying dead cards
- identifying pools that are underrepresented near the top

It is **not** a rules-complete engine, so exact percentages should not be treated as tournament-level predictions.

---

# 11. Newly preserved Makeshift design work

This section intentionally preserves the current conversation without silently promoting every idea to a rule.

## Resource-through-exhaust concept

🧪 **PROMISING, NOT LOCKED**

Concept: a Makeshift card may be able to **exhaust itself to act as a Resource**.

The important decision is not merely "gain a resource." It is:

- attack with this card
- keep it available to defend
- exhaust it for resource value

That three-way tension strongly fits Makeshift because the same piece of junk can be used for a job it was never intended to do.

? Keyword/name is unresolved.

? This cannot be frozen until the global Resource system is frozen enough to know exactly what the card is generating.

## Hold My Beer

● **PRESERVE AS A MAKESHIFT MECHANIC CANDIDATE**

Current concept:

> **Hold My Beer**  
> When this attacks, you may give it +X Power. At the end of the round, it takes X damage.

The thematic/mechanical identity is strong: overclock the Unit now and pay for it in self-inflicted damage later.

? The legal range/limit for X is not resolved.

Do not silently print this as a final keyword until that limiter is solved and tested.

## Hand-Me-Down

◇ **TABLED AS A FACTION-WIDE SIGNATURE**

Concept:

> **Hand-Me-Down**  
> When this Unit leaves play, move its Items to another of your Units instead of discarding them.

The flavor fits Makeshift, but the current Item system now has more standalone Items than attachments. Because only 11 of the current 24 Items attach, an attachment-transfer keyword is too narrow to define the whole faction.

The concept may still be useful on an individual card later.

## Duct Tape

The canonical Makeshift Item currently is:

> **Duct Tape** - Cost 1  
> Attach to a damaged Unit. It gets +2 Guard.

◇ Additional Duct Tape mechanics involving pooled durability, combining two Units, shared survival, or complicated damage reassignment were explored and rejected as too complex for the value they added.

The name/theme remains excellent. The complicated subsystem does not.

---

# 12. Superseded and tabled history

These ideas are preserved so they do not accidentally crawl back in as "current rules."

× **Front Line / Back Line battlefield** - superseded by the current unrestricted battlefield.

× **Three fixed combat lanes** - no longer the Mongo baseline.

× **Battlefield-point / objective victory** - rejected for the current core. The Leader remains the loss condition.

× **Automatic blocker retaliation from defeated Units** - superseded by survivors-only retaliation, except Explosive.

× **Paid counterattack as the universal retaliation system** - superseded by current automatic survivor retaliation.

× **All Items attach** - superseded by text-driven attachment plus standalone Items.

× **Unit-to-Resource as the main economy** - performed poorly in simulation and is not current.

× **Long solitaire turns** - alternating primary actions are core.

× **Rock-paper-scissors-style simultaneous resolution** - not the desired combat identity.

◇ **Simultaneous hidden intent / simultaneous reveal** - explored for bluffing, not current core combat.

◇ **Functional card backs as a required base-game system** - creatively interesting, but tabled while the base game is solidified.

◇ **Shared road/grid/map built from cards** - tabled as a separate experiment; it pushed the design too far toward a tactical board game.

◇ **One Piece-style card-based Life** - rejected/tabled in favor of Leader Health.

◇ **Over-Commanding / exceeding a Command ceiling** - historical escape-hatch idea, not current.

◇ **Universal Bloodied/comeback mechanics** - not committed.

---

# 13. What we think right now

● The game is strongest when each identity changes the **decision tree**, not just the card names.

● Alternating actions, multi-blocking, hand-to-Guard defense, Overflow, and survivors-only retaliation give both players meaningful combat decisions without a tactical-board-game rules burden.

● Makeshift's best identity is broader than "the Item color." **Trash Baron** owns the Junk/recycling engine. Makeshift generally should express improvised value, scavenging, repurposing, and using cards in ways other groups cannot, without requiring a universal Junk subsystem.

● The current Item redesign is healthier because Items can be genuine board objects rather than every Item being equipment.

● The Resource system should remain simple enough that faction mechanics can bend it without forcing the whole game to become a resource puzzle.

---

# 14. Questions that still need answers

? **Resource:** Is shared automatic 1-to-7 the permanent economy?

? **Makeshift resource ability:** Can exhausting a Unit/Item for Resource create the desired Attack vs Defend vs Resource decision without breaking the curve?

? **Hold My Beer:** What caps X?

? **Kamikaze naming:** Is Kamikaze the permanent sixth identity name, or only the current mechanical pool name?

? **Deckbuilding:** What is the permanent Leader / primary / secondary restriction?

? **Game length:** The older simulator suggested roughly 7 rounds while 8-10 felt attractive. What final pacing target actually feels best in human play?

? **Leader tuning:** Current identities and roles are good enough to test, but exact Health/passive/active numbers remain balance knobs.

? **Item density:** 4 Items per 30-card color pool and 6 Items per baseline deck are current, but not sacred if human play says otherwise.

---

# 15. What is next

1. Preserve the current Mongo rules and 180-card pool as the comparison baseline.
2. Test the Makeshift exhaust-for-Resource idea **in isolation** before changing the global economy around it.
3. Test Hold My Beer with a simple, explicit X limiter.
4. Re-run color/pairing stress tests after any signature-mechanic change.
5. Human-play the same changes before treating simulator balance as proof.
6. Freeze Resource and deckbuilding only after those tests stop producing structural problems.
7. Once the base game is stable, reopen tabled layers such as functional card backs, bluffing, unusual battlefield structures, and broader PvE ideas.

---

# Canonical files

- `docs/card-pool/cards.json` - canonical 180-card pool
- `docs/card-pool/leaders.json` - canonical current Leaders
- `docs/card-pool/README.md` - card-pool overview
- `docs/card-pool/rules-lab.md` - synchronized current LAB rules
- `docs/card-pool/traits.md` - Trait model
- `docs/card-pool/meta-audit-2026-09-19.md` - current heuristic meta audit
- `docs/mongo-precommit.md` - historical rollback checkpoint, intentionally retained as history

## Historical rollback anchor

`MONGO-PRECOMMIT-2026-09-18`

Do not rewrite that rollback state to match newer rules. It exists specifically so the design can return to the earlier Mongo foundation if a later experiment goes sideways.
