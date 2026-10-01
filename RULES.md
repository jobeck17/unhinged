# Unhinged Rules — Carl 0.3

**Working production rulebook • 27 September 2026**

This rulebook reflects the September 27 architecture interview and supersedes the older single-action-turn baseline. The 180-card pool was rebuilt against these rules on September 28, 2026. Balance remains unverified and is now the focus of testing.

## 1. Core principle

Base rules apply to every player. Printed card text may add to, change, or override a base rule.

A Trait has no inherent rules meaning unless a card refers to it. A keyword has only the meaning defined by the rules.

The normal win condition is reducing the opposing Leader to 0 Health. A game has no draw. **War** resolves a tied game-ending state.

## 2. Game objects and zones

Each player has a Deck, Hand, Discard, Play Area, and Stash.

- A **Leader** stays outside the deck and play area. It provides deck identity, 25 Health, and one visible automatic passive.
- A **Character** has Power and Guard.
- An **Action** resolves once, then goes to its owner's discard.
- An **Item** enters play and remains there until an effect moves it. Most Items are standalone; an Item attaches only when its text says so.
- A **Stash** is the resource row used to pay Costs. Normal Stash is face down; some rules and effects create face-up temporary Stash.

Only Characters and Items are **in play**. Leaders, Actions, Stash cards, cards in hand, cards in decks, and cards in discard are not in play.

There is no base limit on Characters in play, Items in play, Stash size, or hand size.

## 3. Core vocabulary

| Term | Meaning |
| --- | --- |
| **Ready** | Upright and available. |
| **Rotate** | Turn a Ready card 90 degrees sideways. |
| **Rotated** | A card that is sideways. |
| **Play** | Play a card from a zone where a rule or effect allows it. |
| **Enters play** | A Character or Item arrives in the Play Area. |
| **Activate** | Voluntarily use an activated ability and pay its listed cost. |
| **Cost** | The amount paid by Rotating Ready Stash unless a card says otherwise. |
| **Power** | Combat damage dealt by a Character. |
| **Guard** | The amount of damage a Character can have before it is Defeated. |
| **Health** | A Leader's survival total. |
| **Roll a die** | Roll one standard six-sided die (d6) and use the result shown. |

### Card movement

- **Draw:** move the top card of your deck to your hand.
- **Discard:** move a card from a hand to its owner's discard.
- **Return:** move a card from another zone to its owner's hand.
- **Defeat:** move a Character from play to its owner's discard.
- **Sacrifice:** Defeat one of your own Characters as a cost or effect. A Sacrifice is also a Defeat.
- **Dismiss:** move a card from play to its owner's discard without Defeating it.
- **Put:** neutral movement to the stated destination. It is not automatically a Draw, Discard, Return, Defeat, Sacrifice, or Dismiss.

Ownership never changes. Control changes only when an effect explicitly says so. A card that changes control remains owned by its original owner; if it leaves play, it goes to its owner's appropriate zone unless the effect says otherwise. A temporary control effect ends when its stated duration ends or when the card leaves play.

## 4. Setup and War

1. Each player brings a 40-card deck and one Leader.
2. A deck may contain cards from the Leader's Style and **up to one additional Style**. Mono-Style decks are legal.
3. A deck may contain up to **four copies** of a card.
4. There is no required Character, Action, or Item ratio.
5. Set each Leader to 25 Health.
6. Shuffle decks and perform **War** to determine which player goes first.
7. Draw seven cards.
8. Each player may mulligan any number of cards from 0 to 7. Draw that many replacements, then shuffle the replaced cards into the deck.
9. After mulligans are complete, the player going second may put the top card of their deck face up and Rotated into their Stash. This is temporary Stash.

### War

Each player reveals the top card of their deck and compares printed Cost. Higher Cost wins. On a tie, reveal again until the tie breaks. Return all revealed cards to their decks and shuffle.

War also resolves simultaneous Leader defeat and simultaneous empty-deck losses.

## 5. Rounds and Turns

A Round consists of one full Turn from each player.

The player who won War takes the first Turn of every Round. The same player therefore goes first each Round unless a future card explicitly changes that rule.

### Start of Turn

At the start of your Turn:

1. **Ready step:** Ready your eligible Characters, Items, and Stash.
2. **Draw step:** Draw one card.
3. Proceed to the main part of your Turn.

The player who won War **skips the Draw step of their first Turn**. Beginning with their second Turn, they Draw normally.

### Main Turn

During your Turn, you may Play cards, Activate abilities, and Attack in any order and as many times as the rules and available Ready cards/resources allow.

End your Turn when you are finished.

Effects that say "this Turn" expire at the end of that Turn. Effects that say "this Round" expire after the second player's Turn and all end-of-Round effects have resolved.

## 6. Stash

There is no automatic resource progression.

Once per Round, during your own Turn, you may put one card from your hand face down into your Stash. You may do this at any legal point during your Turn. Stashing does not consume a separate action.

A normally Stashed card:

- enters Ready;
- pays 1 toward a Cost when Rotated;
- has no name, type, Style, Traits, Cost, text, Power, or Guard while in Stash;
- is unknowable even to its owner unless a card explicitly allows a player to look at it;
- may leave Stash only when a rule or effect explicitly moves it.

The number of Stash cards and whether each is Ready or Rotated are public information.

### Temporary Stash

Some rules and effects put cards **face up** into Stash. A face-up Stash card is temporary Stash.

- A face-up Stash card is still Stash, not its printed card type, while it remains there.
- Unless an effect says otherwise, when a face-up Stash card is used to pay a Cost, put it into its owner's discard instead of leaving it Rotated in Stash.
- Face-up Stash may be affected by anything that affects Stash unless a rule or effect says otherwise.
- The second player's setup Stash begins Rotated, then Readies normally during that player's first Ready step.
- If the second player does not spend that temporary Stash and it is later Ready, it remains available until used. When used to pay a Cost, put it into its owner's discard instead of leaving it Rotated in Stash.

Cost reductions may reduce a Cost to 0.

### Stash design space

Cards may explicitly break normal Stash rules. Current approved directions include:

- Momentum may Stash additional cards or Ready some Rotated Stash.
- Misdirection may inspect, retrieve, or exchange Stash cards.
- Salvage may repurpose Items into temporary Stash and may exploit unused opposing Stash.
- Stonewall may temporarily Rotate opposing Stash.
- Expendable may convert Characters into temporary purchasing power or Cost reduction.
- Reckless may test borrowing future economy, but bookkeeping must remain manageable.

Permanent theft or permanent destruction of opposing Stash is not part of the current base design.

## 7. Playing cards

Actions resolve immediately and then go to their owner's discard. They do not enter play.

Characters and Items enter play Ready unless an effect says otherwise.

A Character that enters play:

- may Block immediately;
- cannot Attack until its controller's next Turn unless it has Hothead or another effect says otherwise;
- cannot use one of its own Rotate abilities until its controller's next Turn unless an effect says otherwise.

Items may use their abilities in the Turn they enter play unless card text says otherwise.

Most Character abilities should be static, triggered, or On Play. Rotate abilities are intentionally uncommon and should exist when giving up attacking or blocking is the meaningful cost.

Some Characters may have an On Play ability plus a persistent board-presence ability. Higher-impact marquee Characters may combine multiple complementary abilities.

### Attached Items

An Item attaches only when its text says to Attach it.

If a Character with attached Items leaves play, put its attached Items into their owners' discards unless a card says otherwise. This cleanup is not Dismiss.

## 8. Attacking and Blocking

Declaring an Attack Rotates the attacker.

A Character may normally Attack:

- the opposing Leader; or
- an opposing **Rotated Character**.

Ready opposing Characters cannot normally be attacked directly. **Sucker Punch** and specific card text may create exceptions.

A direct Attack against a Character cannot be Blocked. If the direct target leaves play before combat damage, the Attack ends; the attacker remains Rotated.

### Leader attacks

When a Character attacks a Leader, the defending player may choose **one Ready Character** to Block. Blocking Rotates that Character.

A Character that entered play this Turn may Block.

If no Character Blocks, the attacker deals its Power to the Leader.

If a Character Blocks:

1. The attacker deals its Power to the Blocker.
2. Determine how much damage was needed to Defeat that Blocker based on its remaining Guard.
3. Any excess attack damage overflows to the Leader.
4. Check whether the Blocker is Defeated.
5. If the Blocker survives, it retaliates with its Power.
6. A Blocker with **Defiant** retaliates even if the Attack Defeats it.
7. A Blocker with **Slowpoke** does not retaliate.

There is no defensive discard-for-Guard rule.

### Direct Character attacks

When a Character directly attacks another Character:

1. The attacker deals its Power to the target.
2. Check Defeat.
3. If the target survives, it retaliates with its Power.
4. Excess damage does not overflow anywhere.

A Ready Character attacked through Sucker Punch follows the same direct-attack procedure.

## 9. Damage, put damage, healing, and Defeat

Damage on Characters persists until healed or the Character leaves play.

A Character is Defeated immediately when the amount of damage on it equals or exceeds its Guard.

### Deal damage

An effect that says **deal damage** creates a damage-dealt event.

It can trigger effects that care about a Character being dealt damage, taking damage, or surviving damage, and it can interact with effects that prevent or modify dealt damage.

### Put damage

An effect that says **put damage on** a Character adds that amount of damage without dealing it.

Putting damage:

- does not count as damage being dealt;
- does not trigger effects that require damage to be dealt or taken;
- is not prevented by effects that prevent dealt damage unless they explicitly mention put damage;
- still causes the normal Defeat check immediately.

This distinction is intentional design space.

### Healing

Healing removes existing damage. A Character cannot be healed below 0 damage.

Leader healing is intended to be rare. A Leader normally cannot be healed above 25 Health unless an effect explicitly raises or changes its maximum Health.

## 10. Responses

A **Response** is an Action with a specific off-turn timing condition printed on the card. It is not a separate card type.

A Response may be played only when its printed timing condition is satisfied.

Each qualifying event opens **at most one Response opportunity total**:

1. The non-active player gets the first opportunity.
2. If the non-active player plays a Response, the window closes.
3. If the non-active player passes, the active player may play one Response.
4. If both pass, the window closes.
5. A Response cannot be answered by another Response.

Responses use their normal Cost, paid with Ready Stash, unless the card says otherwise.

Valid printed windows may include moments such as:

- when a Character is attacked;
- when a Character Blocks;
- before combat damage is dealt;
- when an opponent plays an Action;
- when an ability is Activated;
- when another specifically named event occurs.

Resolve the Response completely, including triggers it creates, before the interrupted event continues.

If an Action is **canceled**, none of its effect resolves. Put that Action into its owner's discard, then continue with any triggers created by the Response that canceled it.

Hard cancellation is allowed design space but should be rare, expensive, or conditional.

## 11. Triggers and timing

A triggered ability happens automatically when its condition occurs.

Unless a card says otherwise, abilities function only while their source is in play.

If several triggers controlled by one player happen simultaneously, that player chooses their order.

If both players create simultaneous triggers, resolve the active player's triggers first, then the non-active player's triggers, preserving each player's chosen order.

An ability that has triggered or been Activated resolves independently of its source remaining in play unless the effect specifically requires that source to remain.

A card that leaves play and later re-enters is a new instance. It has no old damage, temporary bonuses, or use history.

"If you do" requires the immediately preceding optional instruction to have actually happened.

## 12. Current keyword rules

### Hothead

**This Character may Attack on the Turn it enters play.**

Hothead does not Ready the Character, grant an extra Attack, or let it use its own Rotate ability early.

### Defiant

**This Character retaliates when it Blocks even if the incoming Attack Defeats it.**

### Explosive

**When this Character is Defeated, deal 1 damage to each opposing Character.**

Explosive does not damage Leaders, Items, or friendly Characters.

### Slowpoke

**This Character does not retaliate when it Blocks.**

### Sucker Punch

**This Character may Attack Ready opposing Characters.**

Sucker Punch is a working keyword name and may be renamed later.

### Jerry-Rig

**If this Item would go to your discard, you may put it face up and Rotated into your Stash instead. When this card is used to pay a Cost, discard it.**

A Jerry-Rigged card in Stash is not mechanically an Item while there. Its face-up state exists only to show that it is temporary Stash and will be discarded when spent.

The current production direction is to keep Jerry-Rig on selected Salvage Items rather than every Salvage Item. The current card pool uses it on Duct Tape and Mystery Drawer of Cables.

### Approved keyword candidates for the card audit

These mechanics are approved for testing but do not yet need to appear in the current 180 until the audit assigns them homes.

- **Chicken:** When this Character is attacked, you may Return it to your hand.
- **Stubborn:** The first time each Round this Character would be Returned or Dismissed, it remains in play instead.
- **Bodyguard:** Working name. This Character may be attacked while Ready. While Ready, it must Block an Attack against your Leader if able.

### Shelved mechanics

Sneaky, Cloak, Stack, and Step Aside are shelved for the starting rebuild. Preserve them in design history, but do not treat them as active starting-set mechanics.

## 13. Current Leader model

Leaders:

- stay visible outside the deck;
- have 25 Health;
- have one automatic passive;
- do not Attack, Block, Rotate, have Power/Guard, or use activated abilities in the current test;
- should preferably bend a basic rule of the game rather than merely grant a stat bonus;
- should create visible counterplay that can change how the opponent plays.

Trait references on Leaders are not part of the current starting design.

### Current six Leader directions

**Florida Man, Reckless**  
Your damaged Characters have **Hothead** and **Sucker Punch**. After one of your damaged Characters survives combat with another Character, **Ready it**. If all damage is healed from a Character, it immediately loses the granted keywords.

**Washed-Up Rock Star, Momentum — Comeback Tour**  
At the start of your Turn, before Ready, if you have 1 or fewer cards in hand, Draw until you have 2. If you have 3 or more cards in hand, skip your Draw step this Turn. At exactly 2 cards, take the normal Draw.

**Birthday Party Magician, Misdirection — Ace Up My Sleeve**  
Once during your Turn, when one of your Characters is Returned from play to your hand, **Ready 1 Stash**.

**Trash Baron, Salvage**  
You may use opposing Ready Stash to pay your Costs as though it were your own. You may combine opposing Stash with your own Stash in one payment.

**HOA President, Stonewall — Failure to Respond**  
Beginning in Round 8, opposing Characters cannot Block your Attacks.

**Backyard Wrestler, Expendable — Tag Out**  
Once during your Turn, when one of your Characters is Defeated or Sacrificed, reveal the top card of your deck. If it is an **Expendable Character** with Cost less than or equal to the number of cards in your Stash, put it into play. It gains **Hothead** this Turn. Otherwise, put the revealed card into your hand. A Character put into play this way is not Played, so On Play abilities do not trigger.

These are the locked Carl 0.3 playtest passives. Balance remains subject to human playtesting.

## 14. Game end and deck-out

Do not end the game in the middle of resolving an Action, ability, combat sequence, or its resulting triggers. Finish the current resolution, then check game-ending conditions.

If only one Leader is at 0 or less Health, that player loses.

If both Leaders are at 0 or less after the same resolution, use War.

If a player must Draw from an empty deck, that player loses. Deck-out should not be a common primary strategy in the starting environment.

If both players would lose to empty-deck Draws at the same time, use War.

## 15. Production design rules

The starting card pool remains 180 cards, 30 per Style.

The six current Styles are:

- Reckless: damage + risk
- Momentum: growth + chaining + economy acceleration
- Misdirection: movement + deception
- Salvage: reuse + scavenging + repurposing
- Stonewall: denial + stall + reaction
- Expendable: sacrifice + death value + recursion

The starting package targets are:

- Reckless: Damage Everywhere; Self-Damage / Damaged Characters
- Momentum: Chain / Acceleration; Low Hand
- Misdirection: Bounce / Return; Manipulation / Deception
- Salvage: Items / Jerry-Rig / Repurpose; Scrounge / Big Hand
- Stonewall: Freeze / Stall; Reaction / Denial
- Expendable: Sacrifice / Defeat Value; Recursion / Refuse to Stay Dead

Each package must function inside its own Style. A secondary Style should create interesting combinations, not complete an otherwise nonfunctional package.

Use **2 Best / 4 Better / 6 Good / 18 Simple-support** as an internal per-Style design target, not a printed rarity system. Simpler cards may still have keywords, basic abilities, useful stats, or package relevance.

Traits are inert until referenced. Trait-support cards should still be playable on their own, and Trait payoff should usually be upside rather than a hard gate.

Actions should generally create an immediate effect and then go to discard. Persistent engines should usually live on Characters or Items.

The September 28 rebuild applied the **Keep / Rehome / Rewrite / Replace** audit to all 180 cards. Future changes should be driven by package playtests, rules clarity, and balance evidence rather than preserving the pre-rebuild text.
