# Unhinged Alpha 0.03 “Mongo” — LAB Rules Snapshot

> Synchronized working rules state as of 2026-09-21.
> **Golden Rule:** base rules apply globally. Printed card text is the exception layer.

## Status legend

- **LOCKED** — foundation for current testing unless deliberately reopened.
- **SOFT LOCK** — current default supported by testing, but still subject to playtest revision.
- **TABLED** — intentionally unresolved/future layer.

---

## Core vocabulary

### Ready and Rotate

**LOCKED**
- **Ready** means upright and available.
- **Rotate** means turn a Ready card 90° sideways.
- A sideways card is **Rotated**.
- To **Ready** a Rotated card, return it upright.
- Attacking Rotates the attacker.
- Blocking Rotates the blocker.
- Fuel is Rotated to pay costs.
- A Rotated Unit may be attacked directly.
- A Rotated Leader is **Vulnerable**.

Formal Unhinged rules language does not use **tap / tapped** or **exhaust / exhausted**.

### Play, enters play, and Activate

**LOCKED**
- **Play** is the general verb for playing a card from a zone where a rule or effect allows it to be played.
- A Unit or Item **enters play** whenever it arrives in the Play Area, regardless of the zone it came from or the effect that put it there.
- Unless an effect explicitly says otherwise, all normal “enters play” abilities trigger whenever that card enters play.
- **Deploy** is retired as a formal rules term.
- **Activate** means voluntarily use an activated ability and pay its listed cost.
- Attack and Block are their own game actions, not activated abilities.
- Triggered abilities happen automatically when their stated event occurs.
- Static/passive abilities apply continuously while their conditions are true.

### Card movement

**LOCKED**
- **Draw** — take the top card of your deck into your hand. This creates a Draw event.
- **Discard** — put a card from your hand into your discard. This creates a Discard event.
- **Return** — put a card from another zone into its owner’s hand. This creates a Return event.
- **Defeat** — put a Unit from play into its owner’s discard as a Defeat event.
- **Sacrifice** — Defeat one of your own Units as instructed by a cost or effect. A Sacrifice is also a Defeat.
- **Dismiss** — put a card from play into its owner’s discard without Defeating it. This creates a Dismiss event.
- **Put** is neutral movement to the stated destination. Putting a card somewhere does not by itself count as Draw, Discard, Return, Defeat, Sacrifice, or Dismiss.

Examples:
- “Put the top 2 cards of your deck into your discard” is not a Discard.
- “Put that Unit into its owner’s discard” is not a Defeat or Dismiss unless the effect says so.
- “Return an Item from your discard to your hand” is a Return even if that Item was never previously in your hand.

### Owner and Controller

**REOPENED — current implementation retained pending terminology cleanup**
- A card’s **Owner** is the player whose deck/card it belongs to. Ownership does not change during the game.
- The current rules also define **Controller** as the player currently controlling a card.
- **Design direction (2026-09-21):** prefer **Owner** plus plain-language references such as “your Character,” “an opposing Character,” and “the player who played this Action” wherever possible.
- Do not add control-changing mechanics merely to justify keeping **Controller** as core vocabulary.
- If a future card truly transfers ongoing use of a card between players, revisit whether **Controller** has earned a permanent place in the rules.
- Until that cleanup is deliberately committed, existing card text/rules that use Controller continue to function under the prior definition.
- When a card is sent to a hand, deck, or discard, it goes to its **Owner’s** corresponding zone unless an effect explicitly says otherwise.

---

## Setup

**LOCKED**
- 40-card deck.
- 1 Leader starts in play outside the deck.
- Draw 7 cards.
- Mulligan: choose 0–7 cards to replace. Draw replacements first, then shuffle replaced cards back into the deck.
- Primary win condition: reduce the opposing Leader to 0 Health.
- There are no drawn games. Ties are settled by **War**.

### War

**LOCKED**
- Before opening hands, both players reveal the top card of their shuffled 40-card deck.
- Compare **Cost**. Higher Cost wins War and takes the first Turn of Round 1.
- On a tie, each player reveals another card and repeats until the tie is broken.
- All War cards are then shuffled back into their owners’ decks.
- Leaders do not participate in War.
- War cards are compared only by Cost. Their text and effects do not trigger.
- If both Leaders are at 0 or less when a game-ending check occurs, War determines the winner.
- If both players would simultaneously lose to an empty-deck Draw, shuffle each discard into a temporary deck and use War to determine the winner.

> Design note: War is intentionally not perfectly random. Deck cost curves can influence first-player probability.

---

## Rounds and Turns

**LOCKED**
- A **Round** is the shared larger cycle.
- Players alternate **Turns** during a Round.
- On your Turn, normally do one of the following: **Play a card, Activate an ability, Attack, or Pass.**
- Playing a card uses the Turn.
- Activating an activated ability uses the Turn, regardless of whether its cost is Rotate, Fuel, Sacrifice, Dismiss, or something else, unless card text says otherwise.
- Attacking uses the Turn.
- Triggered and passive abilities do not use a Turn.
- Blocking occurs during an opponent’s Turn and does not use your next Turn.
- Pass immediately gives the opponent the next Turn.
- Passing does not remove a player from the Round.
- If the opponent Plays a card, Activates an ability, or Attacks after a Pass, the consecutive-Pass count resets.
- A Round ends after **two consecutive Passes**.
- The player who made the **first** of those two Passes takes the first Turn of the next Round.
- If a player has no legal Play, Activation, or Attack, that player must Pass.

### Start of Round — Ready, Set, Draw

**LOCKED**
1. **Ready** all eligible cards and Fuel.
2. **Set** Fuel progression for the new Round.
3. **Draw** one card.
4. The initiative player takes the first Turn.

**SOFT LOCK**
- Round 1 includes the normal Draw step.

**LOCKED**
- Effects that last “this Round” expire when the Round ends, before the next Ready, Set, Draw.

---

## Fuel system

**LOCKED TERM: Fuel**
- **Fuel** is the game’s spendable resource.
- A card’s payment number is simply its **Cost**.
- Rotate Fuel to pay costs.
- Fuel uses the same Ready / Rotated state language as other cards or resource objects.

**SOFT LOCK**
- Round 1: 1 Fuel.
- Round 2: 2 Fuel.
- Continue +1 Fuel each Round to a maximum of 7.
- Fuel remains at 7 from Round 7 onward.
- Fuel Readies at the start of each Round.
- Physical Fuel implementation is still open.

**PARKING LOT**
- Juice
- Command
- Charge

---

## Zones

**LOCKED CURRENT BASE ZONES**
- **Deck**
- **Hand**
- **Discard**
- **Play Area**
- **Fuel Tank**

Cards in the Play Area are **in play**.

**LEGACY / REWRITE PENDING**
- The canonical 180-card pool still contains **Junk Pile** references from the Trash Baron/Makeshift package.
- Current design direction is to **retire Junk Pile as a separate zone** and let Makeshift interact with the normal **Discard** instead.
- This is not yet mechanically applied to the canonical card and Leader data; those cards require a deliberate rewrite and rebalance before Junk can be removed from legacy test data.
- **One Man’s Trash** is the working Trash Baron ability concept for limited Item access from Discard, with guardrails such as once-per-Round and paying normal Cost.

---

## Deckbuilding

**SOFT LOCK**
- 40 cards.
- Choose one Leader.
- A deck may contain cards from the Leader’s color plus one secondary color.
- No required ratio between those colors.
- Maximum **2 copies** of the same card.
- The Leader starts outside the deck and is not subject to the copy limit.
- No required Unit / Action / Item ratio.
- No base limit on the number of Units in play.

---

## Units entering play

**LOCKED**
- Units enter play Ready unless an effect says otherwise.
- A Unit that entered play this Round may Block immediately.
- A Unit that entered play this Round cannot Attack unless card text says otherwise.
- A Unit that entered play this Round cannot Activate one of its own abilities with a Rotate cost unless card text says otherwise.
- Blocking is the normal way a newly entered Unit may Rotate itself during that Round.
- Other cards and effects may still Rotate a Unit that entered play this Round.

---

## Attacking

**LOCKED**
- One Unit attacks per Attack unless card text says otherwise.
- Declaring an Attack Rotates the attacker.
- A Leader may always be attacked.
- Ready defending Units may Block an Attack against their Leader.
- The defender may choose not to Block.
- Rotated enemy Units may be attacked directly.
- You may still Attack the Leader even if the opponent controls Rotated Units.
- Only Attacks against the Leader may be Blocked.
- A direct Attack against a Rotated Unit cannot be Blocked by another Unit.
- Items cannot normally be attacked.
- Ready Units cannot normally be attacked directly.

### Vulnerable Leaders

**LOCKED**
- Using a Leader ability with a Rotate cost Rotates that Leader.
- A Rotated Leader is **Vulnerable** until it Readies.
- An Attack against a Vulnerable Leader cannot be Blocked.
- Vulnerable does not create permission to Attack the Leader; Leaders are always legal Attack targets. Vulnerable removes the Block option.
- Leaders do not retaliate when attacked unless card text says otherwise.

---

## Blocking and defense

**LOCKED**
- Only Ready Units may Block.
- Multiple Units may Block one Attack.
- The defender declares all Blockers at once.
- The defender chooses Blocker order.
- **Blocking Rotates the Blocking Unit.**
- A Unit that entered play this Round may Block and will Rotate when it does.
- Blocking does not use the defender’s next Turn.

### Defensive Guard

**LOCKED**
- During defense, the defender may Discard any number of cards from hand for **+1 temporary Guard each**.
- Temporary Guard is assigned to specific Blockers before combat damage.
- Temporary Guard does not increase retaliation Power.
- Temporary Guard absorbs damage before the Unit’s normal Guard.
- Any unused temporary Guard disappears when that Attack resolves.
- Damage absorbed by temporary Guard does not remain on the Unit.

Example: a 4-Guard Unit receives +2 temporary Guard and takes 5 damage. The temporary 2 absorbs the first 2 damage. The Unit takes 3 persistent damage and survives at 4 Guard with 3 damage.

---

## Multi-block damage and Overflow

**LOCKED**
- Damage through Blockers is sequential in the defender’s chosen order.
- The attacker must deal enough damage to Defeat the current Blocker before remaining damage continues.
- Once a Blocker has taken lethal damage, remaining Attack damage automatically continues to the next Blocker.
- The attacker cannot intentionally waste damage by overkilling an already-Defeated Blocker.
- After the final Blocker, remaining damage reaches the Leader.
- **Overflow applies only when attacking the Leader through Blockers.**
- If a Rotated Unit is attacked directly, excess damage is lost and does not continue to the Leader.

---

## Retaliation

**LOCKED**
- A Blocking Unit that survives the incoming Attack retaliates with its Power.
- A Blocker Defeated by the Attack normally does not retaliate.
- A directly attacked Rotated Unit retaliates if it survives.
- Rotated means exposed, not helpless.

### Keywords
- **Explosive:** an Explosive Blocker retaliates even if it is Defeated by the incoming Attack.
- **Slowpoke:** a Slowpoke Unit does not retaliate when it Blocks.

---

## Damage, healing, and Defeat

**LOCKED**
- Damage persists between Rounds until healed or the card leaves play.
- A Unit is **Defeated** immediately when its damage equals or exceeds its current Guard.
- If a Unit’s Guard is reduced and its existing damage is now equal to or greater than Guard, it is Defeated immediately.
- A Defeated Unit goes to its Owner’s discard unless card text says otherwise.
- Healing cannot exceed a card’s current normal maximum Guard or Health unless card text explicitly increases that maximum.
- A player may not voluntarily Sacrifice or Dismiss a card unless a rule or effect gives permission.

### Attached Items when a host leaves play

**LOCKED**
- If a card with attached Items leaves play for any reason, put those attached Items into their Owners’ discards unless card text says otherwise.
- Those Items are **not Dismissed** by this cleanup.
- Attached Items do not automatically transfer to another card unless an effect explicitly says they do.

---

## Actions

**LOCKED**
- Actions are Played from a legal zone.
- An Action does not enter play.
- Resolve its text, then put it into its Owner’s discard unless an effect says otherwise.
- Actions normally may be Played only on your own Turn unless card text says otherwise.

**SOFT LOCK — Response framework**
- **Response** is currently favored as a special timing designation/subtype on an **Action**, not as a fifth base card type.
- A Response may be Played during an opponent’s Turn only when its own text says its timing condition has occurred.
- The Response card repeats its exact legal timing in plain English; players should not need a separate glossary entry to know when that specific card can be Played.
- A Response resolves before the interrupted Play / Activation / Attack continues.
- There is no generic Response window after every game event. A card creates only the window printed on that card.
- Working visual labels such as **Attack Response** or **Action Response** may be used for fast scanning, but the printed sentence is authoritative.
- **OPEN:** exact rules for Response-on-Response chaining and whether any universal chain limit is needed.
- **OPEN:** final costing philosophy for Responses; current preference is to balance with Fuel/card opportunity cost rather than “lose your next Turn” bookkeeping.

---

## Items

**LOCKED**
- Items enter play and remain in play.
- An Item attaches only if its text says to Attach it.
- Otherwise it remains as a standalone Item in the Play Area.
- A standalone Item may have static text, triggered abilities, or activated abilities.
- A Unit may have any number of attached Items unless card text says otherwise.
- Items cannot normally be attacked.

---

## Trigger timing

**LOCKED**
- A **pending trigger** is a triggered ability waiting to resolve.
- “The Bag” is retired from formal rules language.
- Triggered and passive abilities do not use a Turn.
- All effects and pending triggers created during a Turn fully resolve before the opponent begins the next Turn.
- Pending triggers resolve in the **order they were triggered**.
- If one player has multiple triggers occur simultaneously, that player chooses the order in which those simultaneous triggers are added to the pending queue.
- If both players have triggers occur simultaneously, the player whose Turn caused them orders and adds all of theirs first, then the opponent orders and adds theirs.
- If resolving a trigger creates another trigger, the new trigger is added to the **end** of the pending queue. It does not jump ahead of older unresolved triggers.
- A Response is a deliberate timing exception: it resolves in its printed Response window before the interrupted event continues.
- If a Defeat trigger needs targets that were not established before the Defeat, the Owner of the Defeated card chooses those targets.
- Targets are chosen when the trigger becomes pending, not when it begins resolving.
- A Unit’s “when Defeated” trigger still occurs after the Unit has moved to discard. The Defeat creates the trigger; the card goes to discard; the trigger resolves normally.

---

## Playing cards that may have no effect

**SOFT LOCK**
- A card may be Played if its Cost can be paid and every **required** choice or target can legally be made.
- The game does not require the player to prove that the card will ultimately change the game state.
- If a card requires “Choose a damaged Wrestler” and no legal damaged Wrestler exists, it cannot be Played.
- If a choice is optional (“you may choose…”), declining that optional choice does not by itself make the Play illegal.
- This avoids a broad “must change the game state” rule and keeps legality tied to concrete Costs and required choices.

## Trait-gating design principle

**DESIGN PRINCIPLE**
- Traits should usually **improve** a card rather than determine whether the card functions at all.
- Prefer “do X; if it was a Wrestler, also do Y” over cards that are dead solely because a matching Trait was not drawn.
- Trait-specific hard gates remain available when the restriction itself is the point of the design, but should be used deliberately.

## Optional instructions and “If you do”

**LOCKED**
- **“If you do”** means the immediately preceding optional instruction must actually be completed for the following effect to occur.
- Choosing not to perform the optional instruction does not satisfy “if you do.”
- If the optional instruction cannot be completed, “if you do” is not satisfied.

Example: “You may Dismiss an Item. If you do, Draw 2 cards.” The cards are Drawn only if the Item is actually Dismissed.

---

## Choose and Target

**LOCKED**
- **Choose** is the normal instruction used when a player selects among legal options.
- When an effect chooses a card, player, or other game object for that effect to affect, that chosen object is the effect’s **target**.
- Card text may refer to targets for rules interactions, such as changing a target, preventing targeting, or triggering when a card is targeted.
- Not every use of Choose creates a target. Choosing between modes, values, or instructions does not target a game object unless the effect selects one to affect.

---

## Game-end timing

**LOCKED**
- Do not immediately end the game when a Leader reaches 0 during resolution.
- Finish the current Turn action and all pending triggers it created.
- Once no triggers remain pending, check Leader Health.
- If exactly one Leader is at 0 or less, that player loses.
- If both Leaders are at 0 or less, settle the game with War.
- If neither Leader is at 0 or less, play continues.

---

## Core icon vocabulary

**LOCKED CONCEPT; ART TBD**
The card frame should support compact symbols for:
- **Rotate**
- **Cost / Fuel**
- **Power**
- **Guard**
- **Health**

The symbols shorten repeated card text; the rules terms above remain the spoken/written vocabulary.

---

## Rules architecture — Golden Rule

**LOCKED**
- Base game rules apply globally.
- A color/pool does not grant special rules by itself.
- A Trait is only a label unless a card or global rule references it.
- Keywords are globally defined rules vocabulary and matter only on cards that have them.
- Card text may add to, modify, or supersede a base rule.
- A card may create a named zone, state, permission, or restriction.
- If no global rule or card text creates an exception, use the base rule.
- No gameplay rule exists only because a player is using a particular color/pool.

**RTFC:** Read The Freaking Card.
