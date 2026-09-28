# Unhinged Tester Changelog — Donut Duel → Revision 6

**Current playtest baseline: September 28, 2026**

If you previously tested **Donut Duel**, use this changelog as the quick guide to what has changed. Current production rules and card text override older playtest packets.

## Biggest rules changes

### Full Turns replace alternating single actions

**Old:** Players alternated taking individual actions.

**Now:** One player takes their full Turn, then the other player takes theirs.

Start of Turn:

1. Ready.
2. Draw.
3. Play cards, use abilities, and Attack in any legal order.

A Round is one full Turn from each player.

### Fuel is gone. Stash is the resource system.

There is no automatic 1 → 7 Fuel progression.

Once per Round during your Turn, you may put one card from your hand face down into your **Stash**.

- Stashing does not use an action.
- Normal Stash enters Ready.
- Rotate one Ready Stash to pay 1 Cost.
- A normal face-down Stash card has no card identity while Stashed, even to its owner.
- There is no normal Stash limit.
- Some cards can add, inspect, exchange, recover, reuse, or spend Stash.

### First player skips their first Draw

War still determines who goes first.

The War winner takes the first Turn of every Round, but **skips the Draw step of their first Turn**.

Beginning with their second Turn, they Draw normally.

## Deckbuilding

- Deck size: **40 cards**.
- Leader remains outside the deck.
- Up to **4 copies** of a card instead of 2.
- A deck may contain the Leader's Style plus up to one secondary Style.
- Mono-Style decks are legal.
- No required Character / Action / Item ratio.
- No hand-size limit.
- No normal Character or Item board limit.

The current baseline tester decks are deliberately **mono-Style** while each Style is validated independently.

## Combat changes

### Leader Health

All current Leaders begin at **25 Health**.

### Blocking

A Leader Attack may be Blocked by **one Ready Character**.

Blocking Rotates that Character.

Characters may Block immediately on the Turn they enter play.

### Retaliation is survival-based

The attacker deals damage first.

The defender retaliates only if it survives, unless it has **Defiant**.

Combat damage is no longer simultaneous.

### Overflow

When a Leader Attack is Blocked, excess damage beyond what is needed to Defeat the Blocker continues to the Leader.

### Direct Character attacks

Normally, only **Rotated opposing Characters** may be attacked directly.

Specific cards or keywords such as **Sucker Punch** can allow Ready Characters to be attacked.

Direct Character Attacks cannot be Blocked.

### Defensive Guard discard is gone

Players can no longer discard cards from hand to increase Guard during combat.

## Characters entering play

Characters enter Ready.

Normally, a Character:

- may Block immediately;
- cannot Attack until its controller's next Turn;
- cannot use one of its own Rotate abilities until its controller's next Turn.

**Hothead** allows a Character to Attack on the Turn it enters play.

## Responses

A **Response** is an Action with an exact off-turn timing window printed on the card.

Examples include:

- when a Character is attacked;
- before combat damage;
- when an opponent plays an Action.

Only **one Response total** may be played for a qualifying event.

The non-active player gets first opportunity. If they pass, the active player may use one.

Responses cannot respond to Responses.

## Current keywords

### Hothead
This Character may Attack on the Turn it enters play.

### Defiant
This Character retaliates when Blocking even if the incoming Attack Defeats it.

### Explosive
When this Character is Defeated, deal 1 damage to each opposing Character.

### Slowpoke
This Character does not retaliate when Blocking.

### Sucker Punch
This Character may Attack Ready opposing Characters.

*Working name.*

### Jerry-Rig
If this Item would go to your discard, you may put it face up and Rotated into your Stash instead. When this card is used to pay a Cost, discard it.

### Chicken
When this Character is attacked, you may Return it to your hand.

### Stubborn
The first time each Round this Character would be Returned or Dismissed, it remains in play instead.

### Bodyguard
This Character may be attacked while Ready. While Ready, it must Block an Attack against your Leader if able.

*Working name.*

### Shelved mechanics

Not active in the current build:

- Sneaky
- Cloak
- Stack
- Step Aside
- Overkill

## Damage terminology

### Deal damage
Creates a damage event and may trigger abilities that care about damage being dealt.

### Put damage
Adds damage without creating a damage-dealt event.

Either can Defeat a Character if accumulated damage reaches Guard.

## Leaders were simplified

Old Donut Duel Leader packages involving activated abilities, Charge, and Ultimates are **not part of the current baseline**.

Each Leader currently has:

- 25 Health;
- one visible automatic passive;
- no Power or Guard;
- no Attack or Block;
- no Charge;
- no Ultimate;
- no activated Leader ability.

### Florida Man — Reckless

Your damaged Characters have **Hothead** and **Sucker Punch**.

### Washed-Up Rock Star — Momentum

**Comeback Tour:** At the end of your Turn, if you have no cards in hand, **Draw 3 cards**.

### Birthday Party Magician — Misdirection

Whenever one of your Characters is Returned from play to your hand, **Draw a card**.

### Trash Baron — Salvage

You may use opposing Ready Stash to pay your Costs as though it were your own.

### HOA President — Stonewall

**Failure to Respond:** Beginning in Round 8, opposing Characters cannot Block your Attacks.

This replaces the old Ready-step tax.

### Backyard Wrestler — Expendable

**Tag Out:** At the end of your opponent's Turn, you may Return one damaged Character you control to your hand. If you do, you may Play another Character from your hand with the same Cost or less without paying its Cost.

The replacement is Played normally and its On Play abilities trigger.

## Style identities were rebuilt

### Reckless
**Damage Everywhere + Self-Damage**

### Momentum
**Acceleration + Low Hand**

### Misdirection
**Bounce / Return + Manipulation / Deception**

### Salvage
**Items / Jerry-Rig / Repurpose + Scrounge / Big Hand**

### Stonewall
**Freeze / Stall + Reaction / Denial**

### Expendable
**Sacrifice / Defeat Value + Recursion / Refuse to Stay Dead**

## The 180-card pool was rebuilt

The pool remains **180 cards / 30 per Style**, but large amounts of card text changed.

Current composition:

- **109 Characters**
- **48 Actions**
- **23 Items**

The old fixed 18 Character / 8 Action / 4 Item ratio per Style is gone.

Notable Style moves include:

- Coupon Lady → Momentum
- Neighborhood Group Admin → Stonewall
- Terms and Conditions → Stonewall
- Social Media Influencer → Misdirection
- I Want to Speak to Your Manager → Misdirection

## Revision 6: card flow and faster early combat

Revision 6 added more card replacement and stronger low-end pressure.

Examples now include:

- Characters that Draw when they enter play.
- Characters that Draw after Defeating another Character in combat.
- Draw-2 Actions.
- Items that can repeatedly generate Draw.
- More Style-specific card-flow effects.
- More early Characters with high Power and low Guard.

The goal is to avoid long empty-hand topdeck games while making early combat matter.

## Major Misdirection / Bounce update

Birthday Party Magician now Draws whenever one of your Characters Returns to your hand.

Current Bounce support includes:

- **Magician's Assistant:** cheap Character that Returns another Character when played.
- **Escape Artist:** 3-Cost 4/2 Hothead that can Return another Character when played.
- **Rabbit:** Draws when played and again when Returned.
- **Lady Who's Moving Out Again:** gives a Power bonus when played and again when Returned.
- **Tech Bro:** 4/2 that Draws after Defeating another Character in combat.
- **Marked Deck:** once during your Turn, Rotate this and 1 Ready Stash to Draw a card.

## Current experimental notes

### HOA tax is OFF

Do not use the previous passive that caused a Rotated card to remain Rotated during the opponent's Ready step.

### Trash Baron is still uncapped

For the current baseline, Trash Baron may spend opposing Ready Stash without a once-per-Turn limit.

### Leader Health stays at 25

Do not lower Leader Health to shorten games. Revision 6's card-flow and low-Guard/high-Power changes already reduced average game length substantially.

## Current testing snapshot

A 30,000-game heuristic round robin of the six mono-Style baselines produced:

- **8.64 average Rounds**
- **8 Round median**
- **60.07% first-player win rate**
- much higher package engagement than the earlier Donut Duel baseline

Treat exact deck win rates as directional. The simulator is most useful for pacing, hand economy, resource flow, and large package-engagement signals.

## What testers should report

Please note:

- Number of Rounds.
- Whether either player regularly runs out of cards.
- Whether Stash decisions feel meaningful.
- Whether early combat feels useful.
- Whether Blocking creates real decisions.
- Whether Responses are useful without slowing the game.
- Whether one Style generates dramatically more value than another.
- Whether your Leader passive changes how you play.
- Cards you are excited to Draw.
- Cards you repeatedly do not want.
- Turns where you had no meaningful decision.
- Any interaction that felt confusing, exploitable, or especially fun.

The best feedback is not only balance feedback. Please report moments that made you think:

**“That was awesome.”**

## Not yet live

These have been discussed but are **not part of the current tester build**:

- **Washed-Up** as a possible Trait.
- **Reality Show Contract** and other Washed-Up celebrity synergy cards.
- Interaction-to-economy concepts inspired by rewarding opponents for attacking your board.

## Revision 7 targeted tuning

### Misdirection
- **Rabbit** is now 2/4 and reads: “When this Character enters or leaves play, Draw a card.”
- **Lady Who's Moving Out Again** is now 3/5 so key bounce targets can survive combat before being Returned and replayed.
- **School Bully** is now **Sucker Punch. Chicken.** This gives Misdirection one clean way to challenge Ready Characters while still threatening to disappear when attacked.

### Expendable
- **Tag Me In!** now costs **3** instead of 2.
- **Patio-Table Prodigy** no longer has printed Hothead. Wrestler synergies can still grant it.

### Salvage
- Trash Baron's Leader passive is unchanged: he may still use any opposing Ready Stash to pay his Costs.
- **Cash In the Clutter** now Rotates up to 2 Ready Stash and Draws only if at least one was an opponent's Stash.
- **Make It Work** now Dismisses an Item to Draw 2, then Discard 1. The extra Item discount was removed.
