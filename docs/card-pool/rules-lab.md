# Unhinged Alpha 0.03 “Mongo” — LAB Rules Snapshot

> Synchronized working rules state as of 2026-09-20.  
> **Golden Rule:** base rules apply globally. Printed card text is the exception layer.

## Status legend

- **LOCKED** — foundation for current testing unless deliberately reopened.
- **SOFT LOCK** — current default supported by testing, but still subject to playtest revision.
- **TABLED** — intentionally unresolved/future layer.

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
- Compare Command Cost. Higher cost wins War and takes the first Move of Round 1.
- On a tie, each player reveals another card and repeats until the tie is broken.
- All War cards are then shuffled back into their owners' decks.
- Leaders do not participate in War.
- War cards are compared only by Command Cost. Their text and effects do not trigger.
- If both Leaders are at 0 or less when a game-ending check occurs, War determines the winner.
- If both players would simultaneously lose to an empty-deck draw, shuffle each discard pile into a temporary deck and use War to determine the winner.

> Design note: War is intentionally not perfectly random. Deck cost curves can influence first-player probability.

---

## Rounds, turns, and Moves

**LOCKED**
- A **Round** is the shared larger cycle.
- Players alternate turn opportunities.
- On your turn opportunity, normally take **one Move** or Pass.
- A Move can normally be: deploy a Unit, play an Action, play an Item, activate an ability, or attack.
- Deploying a Unit is the entire Move.
- Playing an Item is the entire Move.
- Activating an activated ability is a Move regardless of whether its cost is Exhaust, Fuel, sacrifice, dismissal, or something else, unless card text says otherwise.
- Triggered and passive abilities do not consume Moves.
- Defense is not a Move.
- Pass immediately gives play to the opponent.
- Passing does not remove a player from the round.
- If the opponent makes a Move after a Pass, the pass streak resets.
- A Round ends after **two consecutive Passes**.
- The player who made the **first** of those two Passes takes the first Move of the next Round.
- If a player has no legal Move, that player must Pass.

### Start of Round

**LOCKED mnemonic: Ready, Set, Draw**
1. **Ready** all cards and Fuel that are allowed to ready.
2. **Set** Fuel progression for the new Round.
3. **Draw** one card.
4. The initiative player takes the first Move.

**SOFT LOCK**
- Round 1 includes the normal Draw step.

**LOCKED**
- Effects that last “this round” expire when the round ends, before the next Ready, Set, Draw.

---

## Fuel system

**LOCKED TERM: Fuel**
- **Fuel** is the game's spendable resource.
- Card numbers are simply **Cost**.
- Rotate Fuel to pay costs.
- Fuel follows the same Ready / Rotated state language as other cards or resource objects.


**SOFT LOCK**
- Round 1: 1 Fuel.
- Round 2: 2 Fuel.
- Continue +1 per Round to a maximum of 7.
- Fuel total remains 7 from Round 7 onward.
- Fuel readies at the start of each Round.
- Exhaust Fuel to pay costs.
- Physical Fuel presentation is still open.

---

## Deckbuilding

**SOFT LOCK**
- 40 cards.
- Choose one Leader.
- Deck may contain cards from the Leader’s color plus one secondary color.
- No required ratio between those colors.
- Maximum **2 copies** of the same card.
- The Leader is outside the deck and is not subject to that copy limit.
- No required Unit / Action / Item ratio.
- No base limit on the number of Units in play.

**TABLED FOR TESTING**
- Copy limit may still be compared at 1 / 2 / 4 copies, but 2 copies is the current default.

---

## Units and deployment

**LOCKED**
- Units enter play ready.
- A Unit deployed this round may block immediately.
- A Unit deployed this round cannot attack unless card text says otherwise.
- A Unit deployed this round cannot use one of its own Exhaust abilities unless card text says otherwise.
- Blocking is the normal way a newly deployed Unit may exhaust itself during its deployment round.
- Other cards or effects may still exhaust a newly deployed Unit.

---

## Attacking

**LOCKED**
- One Unit attacks per attack Move unless card text says otherwise.
- Declaring an attack exhausts the attacking Unit.
- A Leader may always be attacked.
- Ready defending Units may block an attack against their Leader.
- The defender may choose not to block.
- Exhausted enemy Units may be attacked directly.
- You may still attack the enemy Leader even if the opponent controls exhausted Units.
- Only attacks against the Leader may be blocked.
- A direct attack against an exhausted Unit cannot be blocked by another Unit.
- Items cannot be attacked.
- Ready Units cannot normally be attacked directly.

### Vulnerable Leaders

**LOCKED**
- Using a Leader’s Exhaust ability exhausts that Leader.
- An exhausted Leader is **Vulnerable** until it readies.
- An attack against a Vulnerable Leader cannot be blocked.
- Vulnerable does not create permission to attack the Leader; Leaders are always legal attack targets. Vulnerable removes the block option.
- Leaders do not retaliate when attacked unless card text says otherwise.

---

## Blocking and defense

**LOCKED**
- Only ready Units may block.
- Multiple Units may block one attack.
- The defender declares all blockers at once.
- The defender chooses blocker order.
- **Blocking exhausts the blocking Unit.**
- A newly deployed ready Unit may block and will exhaust when it does.
- Defense does not consume the defender’s next Move.

### Defensive Guard

**LOCKED**
- During defense, the defender may discard any number of cards from hand for **+1 temporary Guard each**.
- Guard cards are assigned to specific blocker(s) before combat damage.
- Those discarded cards go to discard.
- Temporary Guard does not increase retaliation Power.
- Temporary Guard absorbs damage before the Unit’s normal Guard.
- Any unused temporary Guard disappears when that combat ends.
- Damage absorbed by temporary Guard does not remain on the Unit.

Example: a 4-Guard Unit receives +2 temporary Guard and takes 5 damage. The 2 temporary Guard is consumed first, then 3 damage is marked on the Unit. After combat it returns to 4 Guard with 3 damage and survives with 1 Guard remaining.

---

## Multi-block damage and Overflow

**LOCKED**
- Damage through blockers is sequential in the defender’s chosen order.
- The attacker must assign enough damage to defeat the current blocker before remaining damage continues.
- Once a blocker has taken lethal damage, remaining attack damage automatically carries to the next blocker.
- The attacker cannot intentionally waste damage by overkilling an already-defeated blocker.
- After the final blocker, remaining damage reaches the Leader.
- **Overflow applies only when attacking the Leader through blockers.**
- If an exhausted Unit is attacked directly, excess damage is lost and does not continue to the Leader.

---

## Retaliation

**LOCKED**
- A blocking Unit that survives the incoming attack retaliates with its Power.
- A blocker defeated by the incoming attack normally does not retaliate.
- A directly attacked exhausted Unit **retaliates if it survives**.
- Exhaustion means exposed, not helpless.

### Keywords
- **Explosive:** an Explosive blocker retaliates even if it is defeated by the incoming attack.
- **Slowpoke:** a Slowpoke Unit does not retaliate when it blocks.

---

## Damage, healing, and Defeat

**LOCKED**
- Damage persists between Rounds until healed or the card leaves play.
- A Unit is **Defeated** immediately when its damage equals or exceeds its current Guard.
- If a Unit’s Guard is reduced and its existing damage is now equal to or greater than Guard, it is Defeated immediately.
- A Defeated Unit goes to its owner’s discard unless card text says otherwise.
- Healing cannot exceed a card’s current normal maximum Guard or Health unless card text explicitly increases that maximum.

### Movement vocabulary

**LOCKED**
- **Defeat** — universal casualty/removal term for Units. A Defeated Unit goes to discard and “when Defeated” abilities trigger.
- **Sacrifice** — Defeat one of your own Units as a cost/effect. Sacrifice counts as Defeat.
- **Discard** — move a card to discard without Defeating it. This does not count as Defeat.
- **Return** — move a card back to hand. This is not Defeat.
- **Move** — send a card to a specifically named zone. This is not Defeat unless the effect says to Defeat it.
- Do not use **Dismiss** for Units.
- A player cannot voluntarily remove, sacrifice, or discard a permanent they control unless a rule or card effect allows it.

---

## Triggers and “the bag”

**LOCKED**
- Triggered and passive abilities happen automatically and do not consume a Move.
- All effects and triggers created during a Move fully resolve before the opponent receives the next turn opportunity.
- Simultaneous triggered abilities go **in the bag**.
- If one player controls multiple simultaneous triggers, that player chooses their order.
- If both players have simultaneous triggers, the player whose Move caused them resolves all of theirs first, in chosen order, then the opponent resolves theirs in chosen order.
- If resolving a trigger creates a new trigger, the new trigger enters the bag and fully resolves before returning to older unresolved triggers.
- If a triggered effect requires one or more targets that were not established before the Defeat/event, the owner of that triggered card chooses those targets.
- Targets are chosen **when the trigger enters the bag**, not when it begins resolving.
- A Unit’s “when Defeated” trigger still occurs even though the Unit has already moved to discard. The Defeat creates the trigger, the card moves to discard, and the trigger resolves from the bag.

---

## Game-end timing

**LOCKED**
- Do not immediately end the game when a Leader reaches 0 during resolution.
- Finish the current Move and everything already in the bag.
- Once the bag is empty, check Leader Health.
- If exactly one Leader is at 0 or less, that player loses.
- If both Leaders are at 0 or less, settle the game with War.
- If neither Leader is at 0 or less, play continues.

---

## Actions

**LOCKED**
- Actions normally may be played only on your own turn as your Move unless card text says otherwise.
- Actions resolve once and then go to discard.

**TABLED**
- Response cards / interrupt timing are a future design layer and are not part of the current base rules.

---

## Items

**LOCKED**
- Items are possessions that create board state.
- Items enter play and remain in play.
- An Item attaches only if its text says to attach it.
- Otherwise it remains as a standalone Item.
- A standalone Item may have static text, triggers, or Exhaust abilities.
- A Unit may have any number of attached Items unless card text says otherwise.
- When an attached Item’s host leaves play, the attached Item goes to its owner’s discard unless card text says otherwise.
- An Item may remove itself as a cost or trigger if its text says so.
- Items cannot be attacked.

---

## Rules architecture — Golden Rule

**LOCKED**
- Base game rules apply globally.
- A color/pool does not grant special rules by itself.
- A Trait is only a label unless a card or global rule references it.
- Keywords are global rules vocabulary and matter only on cards that have them.
- Card text may add to, modify, or supersede a base rule.
- A card may create a named zone, state, permission, or restriction.
- If no global rule or card text creates an exception, use the base rule.
- No gameplay rule exists only because a player is using a particular color/pool.

**RTFC:** Read The Freaking Card.


---

## Optional instructions and “If you do”

**LOCKED**
- **“If you do”** means the immediately preceding optional instruction must actually be completed for the following effect to occur.
- Choosing not to perform the optional instruction does not satisfy “if you do.”
- If the optional instruction cannot be completed, “if you do” is not satisfied.

Example: “You may Dismiss an Item. If you do, draw 2 cards.” The cards are drawn only if the Item is actually Dismissed.

## Dismiss and attached Items

**LOCKED**
- **Dismiss** is a removal event that puts a card from play into its owner’s discard without Defeating it.
- A card is Dismissed only when a rule or effect specifically says **Dismiss**.
- If a card with attached Items leaves play, put those attached Items into their owners’ discards.
- Attached Items moved to discard because their host left play are **not Dismissed**.
- Attached Items do not automatically transfer to another card unless an effect explicitly says they do.
- A player may not voluntarily Dismiss a card unless a rule or effect gives permission to do so.
