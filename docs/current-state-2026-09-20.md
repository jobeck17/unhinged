# Unhinged Current State — 2026-09-20

> This checkpoint supersedes the September 19 current-state file for active rules decisions while preserving that earlier file as design history.
>
> Canonical card data remains in `docs/card-pool/cards.json` and `docs/card-pool/leaders.json`. The synchronized active rules are in `docs/card-pool/rules-lab.md`.

## Status legend

- ◆ **LOCKED** — current foundation unless deliberately reopened.
- ● **SOFT LOCK** — current default supported by testing, still open to revision.
- 🧪 **LAB / WATCH** — actively monitored.
- ◇ **TABLED** — intentionally deferred.

---

# Locked after September 20 rules stress testing

## Combat cadence

◆ **Blocking exhausts the blocking Unit.**

◆ A newly deployed ready Unit **may block immediately**.

◆ A newly deployed Unit cannot attack or use one of its own Exhaust abilities during the round it was deployed unless card text says otherwise.

◆ Therefore, blocking is the normal way a newly deployed Unit may exhaust itself during its deployment round.

◆ Other cards or effects may still exhaust a newly deployed Unit.

◆ An exhausted Unit may be attacked directly.

◆ Only attacks against the Leader may be blocked. Direct attacks against exhausted Units cannot be intercepted by another Unit.

◆ A directly attacked exhausted Unit **retaliates if it survives**.

This produces the intended board rhythm:

> Ready → can defend → blocks → exhausts → becomes exposed → may be attacked directly → still retaliates if it survives.

## Blocking and temporary Guard

◆ Only ready Units may block.

◆ Multiple Units may block one attack.

◆ All blockers are declared at once and the defender chooses blocker order.

◆ During defense, the defender may discard any number of cards for +1 **temporary Guard** each.

◆ Temporary Guard is assigned before combat damage.

◆ Temporary Guard absorbs damage **before** the Unit's normal Guard.

◆ Temporary Guard lasts only for that one attack/defense and disappears when combat resolves.

◆ Damage absorbed by temporary Guard does not remain on the Unit.

Example: a 4-Guard Unit receives +2 temporary Guard and takes 5 damage. The temporary 2 absorbs the first 2 damage. The Unit takes 3 persistent damage and survives combat at 4 Guard with 3 damage.

## Retaliation

◆ A blocker that survives the incoming attack retaliates with its Power.

◆ A blocker Defeated by the attack normally does not retaliate.

◆ Explosive remains the exception that may retaliate even when Defeated.

◆ Slowpoke remains the exception that does not retaliate when blocking.

◆ Exhausted Units attacked directly retaliate if they survive.

## Damage and Defeat terminology

◆ Damage persists until healed or the card leaves play.

◆ A Unit is **Defeated** immediately when its damage equals or exceeds current Guard.

◆ If Guard is reduced below existing damage, the Unit is Defeated immediately.

◆ Defeated Units go to their owner's discard unless card text says otherwise.

◆ **Sacrifice** means Defeat one of your own Units as a cost/effect and therefore counts as Defeat.

◆ **Discard**, **Return**, and other zone movement do not count as Defeat unless an effect explicitly says so.

◆ Do not use **Dismiss** for Units.

◆ No overhealing by default. Healing restores only up to the card's current normal maximum Guard/Health unless card text explicitly increases that maximum.

## Triggers and the bag

◆ Triggered/passive abilities do not consume Moves.

◆ Simultaneous triggers go **in the bag**.

◆ If one player owns multiple simultaneous triggers, that player chooses their order.

◆ If both players have simultaneous triggers, the player whose Move caused them resolves all of theirs first, in chosen order, then the opponent resolves theirs.

◆ A new trigger created while another trigger is resolving goes into the bag and resolves before returning to older unresolved triggers.

◆ A Unit's “when Defeated” trigger still occurs after the Unit has moved to discard.

◆ If a Defeat trigger needs target(s) that were not already established, the owner of the Defeated card chooses them.

◆ Trigger targets are chosen **when the trigger enters the bag**.

## Game-end timing

◆ Leader reaching 0 does not interrupt resolution.

◆ Finish the current Move and everything already in the bag.

◆ When the bag is empty, check Leader Health.

◆ If one Leader is at 0 or less, that player loses.

◆ If both are at 0 or less, use War.

## Moves, passing, and rounds

◆ Players alternate one Move at a time.

◆ A Move may normally deploy a Unit, play an Action, play an Item, activate an ability, or attack.

◆ Deploying a Unit, playing an Item, or activating an ability is the entire Move unless card text says otherwise.

◆ Defense is not a Move.

◆ Pass hands play to the opponent but does not remove the passer from the Round.

◆ A Move after a Pass resets the pass streak.

◆ Two consecutive Passes end the Round.

◆ The player who made the first of the two Passes gets the first Move next Round.

◆ If a player has no legal Move, that player must Pass.

## Ready, Set, Draw

◆ Start-of-round order is:

1. **Ready**
2. **Set**
3. **Draw**
4. Initiative player takes the first Move

◆ “This round” effects expire when the Round ends before the next Ready, Set, Draw.

## War

◆ Round 1 initiative is determined by **War**, not dice.

◆ Each player reveals the top card of the shuffled 40-card deck. Higher Command Cost wins. Ties reveal again until broken.

◆ Revealed War cards are shuffled back before opening hands are drawn.

◆ Card text does not trigger during War.

◆ Leaders are outside the deck and never participate.

◆ War also breaks simultaneous Leader-death and simultaneous deck-out ties.

---

# Soft locks after stress testing

● **Fuel progression:** 1 Fuel on Round 1, +1 per Round to a maximum of 7, with Fuel readying each Round.

● **Round 1 draw:** both players use the normal Draw step during Round 1.

● **Deckbuilding:** Leader color plus one secondary color, with no required ratio.

● **Copy limit:** maximum **2 copies** of the same card in the 40-card deck.

● **No base Unit board cap** for now.

● **Deployment Exhaust restriction:** the current default is that a newly deployed Unit cannot use its own Exhaust ability that Round unless its card says otherwise. This remains softer than the combat cadence until more Units actually have Exhaust abilities.

---

# Stress-test read

The September 20 abstract rules harness strongly favored the following paired combat rules:

> **Blocking exhausts. Exhausted Units retaliate if directly attacked and survive.**

This pairing increased meaningful direct attacks on Units without turning exhausted Units into free cleanup targets.

Allowing direct-attacked exhausted Units to retaliate kept “exposed” distinct from “helpless.”

The current pool contains almost no Unit Exhaust abilities, so the newly-deployed Exhaust restriction cannot be considered fully validated until the card pool gains more of them.

The 2-copy rule remains the best current compromise between deck identity and repetitive consistency.

Round 1 draw did not create a meaningful structural imbalance in the stress harness.

---

# Watch item: War curve bias

🧪 War is not a neutral randomizer because deck Command Cost distributions affect the chance to win initiative.

The current curated decks are close enough that this is not presently a structural problem, but low-curve decks can lose War more often than higher-curve decks.

Treat this as a deliberate property to monitor, not an accidental coin flip.

---

# Still tabled / unresolved

◇ **Response cards and interrupt timing** remain tabled until the base game is stable.

◇ Functional card backs / bluff mechanics remain tabled.

◇ Simultaneous hidden-intent systems remain tabled.

◇ Alternate battlefield structures remain tabled.

🧪 The physical Fuel implementation remains open.

🧪 More Units need Exhaust abilities before the deployment-Exhaust rule can receive the same confidence as the blocking rules.

🧪 Current card text still needs a terminology cleanup from “dies/dismiss” to **Defeat** where appropriate.

---

# Immediate next design work

1. Add meaningful Exhaust abilities to more Units without turning them into deploy-trigger Actions on legs.
2. Clean canonical card wording to use **Defeat** consistently.
3. Fix known card-pool wording/trait issues.
4. Rebuild stale curated/meta decks affected by the Junk Pile correction.
5. Re-run card-level balance after those repairs using the newly locked combat cadence.



---

# Locked terminology — Fuel

◆ **Fuel** is the official current name for the game's spendable resource.

◆ A card's printed payment number is simply its **Cost**.

◆ Players **Rotate Fuel** to pay costs.

◆ Fuel uses the same **Ready / Rotated** state language as other cards or resource objects.

◇ **Parking lot:** Juice, Command, and Charge are preserved as considered alternatives, but are not current terminology.

Design intent: Fuel is broad enough to support serious rules language while still allowing individual resource cards to carry Unhinged flavor.


---

# Additional terminology locks

## Locked wording — “If you do”

◆ **“If you do”** requires the immediately preceding optional instruction to be successfully completed.

◆ Choosing not to perform the optional instruction does not satisfy the condition.

◆ If the optional instruction cannot actually be completed, the follow-up effect does not occur.

## Locked Dismiss cleanup

◆ **Dismiss** is a distinct removal event from play to discard and does not count as Defeat unless an effect explicitly says otherwise.

◆ A card is Dismissed only when a rule or effect says **Dismiss**.

◆ When a card with attached Items leaves play, put those attached Items into their owners’ discards.

◆ Those attached Items are not Dismissed by that cleanup.

◆ Attached Items do not transfer automatically when their host leaves play.

◆ Players cannot voluntarily Dismiss cards unless a rule or effect allows it.
