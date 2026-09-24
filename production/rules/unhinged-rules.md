# Unhinged Current Rules

Working production rulebook • 23 September 2026

This is the consolidated rules source for the next Unhinged playtest and card-production pass. It carries forward the September 21 foundation and includes the [September 23 Donut revision](../../docs/current-state-2026-09-23.md). The timing clarifications below support the current card pool; they are current playtest rulings, not claims of tested balance. Items still deliberately unresolved are listed in [Open decisions](open-decisions.md).

## 1. Core principle

Base rules apply to every player. Printed card text may add to, change, or override a base rule. A deck identity, Trait, or keyword does nothing unless a rule or card text says it does.

The normal win condition is reducing the opposing Leader to 0 Health. A game has no draw: **War** resolves a tied game-end state.

## 2. Game objects and zones

Each player has a Deck, Hand, Discard, Play Area, and Fuel Tank. Cards in the Play Area are **in play**.

- A **Leader** starts in play outside its owner's deck.
- A **Character** has Power and Guard. When damage on a Character equals or exceeds its Guard, it is Defeated.
- An **Action** resolves once, then goes to its Owner's discard unless its text says otherwise.
- An **Item** enters play and remains there. It attaches only when its text says to Attach it; otherwise it is a standalone Item.
- **Fuel** is the spendable resource used to pay Costs.

Character is the working type throughout the Donut rulebook and card pool. Older documents call it Unit; that is the same game object, not an additional type. The final printed name remains a presentation decision in [Open decisions](open-decisions.md).

## 3. Core vocabulary

| Term | Meaning |
| --- | --- |
| **Ready** | Upright and available. |
| **Rotate** | Turn a Ready card 90 degrees sideways. A sideways card is **Rotated**. |
| **Ready a card** | Return a Rotated card upright. |
| **Play** | Play a card from a zone where a rule or effect allows it. |
| **Enters play** | A Character or Item arrives in the Play Area. Its normal enters-play abilities trigger. |
| **Activate** | Voluntarily use an activated ability and pay its listed cost. Attack and Block are not activated abilities. |
| **Cost** | The number paid by Rotating Fuel, unless a card says otherwise. |
| **Power** | Combat damage dealt by a Character. |
| **Guard** | A Character's damage threshold. Damage persists unless healed or the Character leaves play. |
| **Health** | A Leader's survival total. |
| **Vulnerable** | A Rotated Leader cannot be Blocked when attacked. |

Formal rules language uses **Rotate**, **Play**, and **enters play**. The [terminology guide](../../docs/terminology.md) records wording that must not appear in new rules or card text.

### Card movement

- **Draw:** move the top card of a deck to its owner's hand.
- **Discard:** move a card from a hand to its owner's discard.
- **Return:** move a card from another zone to its Owner's hand.
- **Defeat:** move a Character from play to its Owner's discard.
- **Sacrifice:** Defeat one of your own Characters as a cost or effect. A Sacrifice is also a Defeat.
- **Dismiss:** move a card from play to its Owner's discard without Defeating it.
- **Put:** neutral movement to the stated destination. It is not automatically any event above.

Ownership never changes. Current production wording should prefer “your Character,” “an opposing Character,” and “the player who played this Action.” No current card changes ownership or control. Use these plain relationships consistently.

## 4. Setup and War

1. Each player brings a 40-card deck and one Leader.
2. Put each Leader into play. Leaders are outside the deck.
3. Shuffle each deck and perform **War** to determine the first Turn of Round 1.
4. Draw seven cards.
5. Each player may mulligan from zero to seven cards: choose cards to replace, draw the replacements, then shuffle the chosen cards into the deck.

For War, each player reveals the top card of their deck and compares Cost. The higher Cost wins. On a tie, reveal another card until the tie breaks. Return all revealed cards to their Owners' decks and shuffle. Card text does not trigger during War.

War also decides a tied game-ending state: if both Leaders are at 0 or less after all relevant effects resolve, each player uses War and the winner wins the game. If both players would lose to an empty-deck Draw, shuffle each discard into a temporary deck and use War.

## 5. Rounds and Turns

A Round contains alternating player Turns. At the start of every Round:

1. **Ready** all eligible cards and Fuel.
2. **Set** the Fuel total for that Round.
3. **Draw** one card.
4. The initiative player takes the first Turn.

Round 1 includes this normal Draw step. At the end of a Round, expire all “this Round” effects together, check for Defeated Characters, and resolve the resulting triggers. Then resolve end-of-Round effects, including delayed Returns. Finish their resulting triggers before the next Ready, Set, Draw. A delayed end-of-Round effect created during this closing procedure resolves before the Round closes; it does not wait an extra Round. Round counters reset only when the next Round begins.

If closing triggers create new “this Round” effects, expire those too and resolve any resulting Defeats and triggers before the Round closes. Repeat as needed; no Round-limited bonus carries into the next Round. The end-of-Round event itself happens only once.

“Skips its next Ready step” stops only that card's next scheduled Round-start Ready. It does not prevent another card from Readying it sooner, and the skip is consumed even if the card is already Ready at that step.

On a Turn, choose one: Play a card, Activate an ability, Attack, or Pass. Each uses that Turn except for triggered and static abilities. Blocking happens during the opponent's Turn and does not use a future Turn.

Passing immediately gives the opponent a Turn. If either player Plays, Activates, or Attacks after a Pass, the consecutive-Pass count resets. Two consecutive Passes end the Round. The player who made the first of those Passes takes the first Turn next Round. A player who has no legal Play, Activation, or Attack must Pass.

## 6. Fuel and deckbuilding

Fuel pays normal card and ability Costs. The [six-Leader test packages](../playtests/six-deck-lab/leaders.md) use a persistent Charge meter for Leader ultimates; Charge cannot pay Fuel Costs. Rotate Fuel to pay a card or ability's Cost. Fuel Readies at the start of each Round.

The current progression is a soft lock:

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7+ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Fuel | 1 | 2 | 3 | 4 | 5 | 6 | 7 |

Cost reductions cannot reduce a payment below 0. They change the amount paid, not printed Cost for War, searches, or card comparisons. A 'next card' reduction is consumed by that next qualifying Play even if its payment is already 0.

The working deckbuilding rules are also soft locks: choose one Leader; a deck may include that Leader's Style plus one secondary Style; use up to two copies of a card; and keep the Leader outside the deck. There is no required mix of Characters, Actions, and Items, and no base limit on Characters in play.

## 7. Playing cards

A card may be Played when its Cost can be paid and its required choices and targets can legally be made. It need not be guaranteed to change the game state. Optional choices may be declined. An enters-play trigger is not a targeting requirement for Playing its Character or Item: if that trigger has no legal required target, the card still enters play and the trigger does nothing.

If a card explicitly lets you Play another card during its resolution, that Play is part of the current Turn. Pay the stated Cost and check the new card's own required choices. It counts as a card Played for sequencing effects. The resolving Action is not in discard until it finishes resolving.

Actions normally may be Played only on their owner's Turn. Resolve the Action, then put it into its Owner's discard unless it says otherwise. An Action does not enter play.

Characters and Items enter play Ready unless an effect says otherwise. Items may Activate in the Round they enter play. Items remain in play. A Character may have any number of attached Items unless card text says otherwise. Items cannot normally be attacked. If a card with attached Items leaves play, put those Items into their Owners' discards unless a card says otherwise. This cleanup is not Dismiss.

A Character that entered play this Round may Block, but cannot Attack or Activate one of its own Rotate abilities that Round unless a card says otherwise. Hothead grants only the Attack permission.

### Cards physically beneath another card

An effect may put a card face down beneath a card in play. Cards beneath another card are not in play, in a hand, or in a deck. They cannot be chosen, Attacked, Block, or use abilities until an effect reveals and moves them. The number beneath a card is public. A player may privately look at a card they put beneath a card from their hand; neither player may look at a face-down card put there from a deck until it is revealed. A Character put into play from beneath a card enters Ready and normally triggers enters-play abilities unless its printed effect says otherwise.

**Inconspicuous Bush** reveals and Returns its hidden Character to its Owner's hand if the Bush leaves play or the Round ends before the Character emerges. The Character emerges during Attack checkpoint 1, before Blockers are declared, and may Block only a blockable Attack. **Jailbroken Robot Vacuum** keeps the cards it swept up between Rounds. When it is Defeated, its trigger reveals and Discards them before counting revealed Items for damage. If it leaves play another way, reveal and Discard those cards without dealing its Defeat damage. Neither card changes the ownership of a card beneath it.

**Hot Potato** is a standalone Item placed beside one Leader and may physically move beside the other. Position beside a Leader does not change ownership, make it an attached Item, or change whose Item it is for other effects. Its printed ability explicitly lets the player whose Leader is beside it Activate it on their Turn, even when the other player owns it. That player pays the listed cost by Rotating one of their own Ready Characters and spends that Turn. When Hot Potato Returns to its Owner's hand, it leaves play regardless of which Leader it is beside.

### Activated abilities and attached references

An activated ability has a cost before a colon. **Rotate:** means Rotate the card bearing the ability. Comma-separated costs must all be paid; “pay 1 Fuel” means Rotate one Ready Fuel. An activation normally happens only on your Turn and uses that Turn. A triggered ability that instructs you to Rotate a card is not an activation.

Choose required targets before paying activation costs. A cost must be paid completely; a Sacrificed Character or Dismissed Item is already out of play before the ability's effect resolves. Triggers caused by paying the costs wait until the activation has resolved. A Return target must already be in the specified zone when chosen; it cannot be the Character you are about to Sacrifice as the cost.

An attached Item's ability can refer to the Character it was attached to immediately before being Dismissed. It cannot affect that Character if the Character has left play. Static bonuses and granted Traits from an Item end immediately when it leaves play. Item cleanup after its Character leaves play is not Dismiss.

Rotating an Item does not switch off its static or triggered text, its attachments, or its Dismiss-only abilities. It prevents paying another Rotate cost until the Item Readies. “Cannot Activate abilities” blocks activated abilities only.

## 8. Attack and Block

One Character attacks per Attack unless card text says otherwise. Declaring an Attack Rotates the attacker.

- A Leader may always be attacked.
- Ready defending Characters may Block an Attack against their Leader. The defender may choose not to Block.
- Rotated enemy Characters may be attacked directly. A direct Attack against a Rotated Character cannot be Blocked.
- Ready Characters cannot normally be attacked directly.
- Items cannot normally be attacked.
- A Rotated Leader is Vulnerable. It may still be attacked as normal, but that Attack cannot be Blocked.
- Leaders do not retaliate unless card text says otherwise.

Only Ready Characters may Block. The defender declares all Blockers at once and chooses their order. Blocking Rotates each Blocker. A newly entered Character may Block and Rotate in the Round it entered play.

### Attack timing checkpoints

These checkpoints resolve the ambiguity in the earlier rulebook's “finish the action, then its triggers” shorthand. Attack and Block bonuses must resolve before they can affect damage.

1. Declare the target and Rotate the attacker. Resolve the pending **when this attacks** triggers and anything they create before choosing Blockers.
2. If the attacker or target has left play, end the Attack without damage. Otherwise, if this is a blockable Leader Attack, declare and Rotate all Blockers together and choose their order. Resolve **when this Blocks** triggers and anything they create.
3. Make the defensive Guard Discards, then resolve triggers they create. A Blocker that left play no longer Blocks. If the attacker or target has left play, end the Attack without damage.
4. Deal attack damage using the attacker's current Power and the sequential rules below. Check Defeat immediately. Queue damage and Defeat triggers; do not resolve them between Blockers.
5. Deal retaliation as one damage batch. Every surviving Blocker still in the Attack retaliates, even if earlier Blockers absorbed all incoming damage; Defiant adds a Blocker Defeated by incoming attack damage. A directly attacked Character retaliates only if it survived. Negative Power deals 0 damage.
6. Resolve the pending damage and Defeat triggers in their recorded order, then after-Attack effects and their resulting triggers. Check the game end after the whole action and queue finish.

A departed attacker receives no retaliation damage. These checkpoints do not give players a universal Response or activation window.

### Defensive Guard

During defense, the defender may Discard any number of cards from hand to give specific Blockers +1 temporary Guard for each card Discarded. Temporary Guard, including a card effect explicitly granting it, absorbs damage before normal Guard, does not increase retaliation Power, and disappears after that Attack resolves. Damage absorbed by temporary Guard does not persist.

### Multi-block damage and Overflow

Damage through Blockers is sequential in the defender's chosen order. The attacker must deal lethal damage to the current Blocker before remaining damage continues to the next one. After the final Blocker, remaining damage reaches the Leader.

Overflow applies only to an Attack against the Leader through Blockers. Excess damage from an Attack against a Rotated Character is lost.

### Retaliation

A Blocking Character that survives the attack retaliates with its Power. A Blocker Defeated by the attack does not retaliate unless it has **Defiant**. A Rotated Character attacked directly retaliates if it survives.

- **Defiant:** This Character retaliates when it Blocks even if the incoming Attack Defeats it. Use its Power immediately before it left play. This does not give a directly attacked Character the same exception.
- **Explosive:** When this Character is Defeated, deal 1 damage to each opposing Character in play. This is a Defeat trigger, not retaliation; it does not damage opposing Leaders, Items, or friendly Characters. During an Attack, resolve the splash after the attack-damage and retaliation checkpoints, with other pending triggers. Deal the splash to all affected Characters as one damage batch, then process resulting Defeats and triggers.
- **Slowpoke:** This Character does not retaliate when it Blocks. It may still retaliate after surviving a direct Attack while Rotated.
- **Hothead:** This Character may Attack in the Round it enters play. It does not gain early Rotate activations, a Ready, or an extra Attack.

If a Character has both Defiant and Slowpoke, Slowpoke prevents its blocking retaliation. Repeated instances of a keyword do not multiply its effect. An explicit cannot-Attack effect takes precedence over Hothead. Sucker Punch permits its Character to Attack a Ready opposing Character directly; this Attack cannot be Blocked, follows ordinary Attack and retaliation timing, Rotates its attacker, and still obeys the entry-Round restriction. Sneaky and Peekaboo remain [unprinted experiments](../cards/mechanics-playtest.md). See the [keyword reference](../cards/keywords.md).

## 9. Damage, healing, and game end

Damage persists between Rounds until healed or the card leaves play. A Character is Defeated immediately when damage equals or exceeds its current Guard, including after a Guard reduction. Healing cannot exceed current normal Guard or Health unless an effect increases that maximum.

Do not immediately end a game when a Leader reaches 0 during resolution. Finish the current action and every pending trigger it created. Then check Leader Health. If only one Leader is at 0 or less, that Leader's player loses. If both are at 0 or less, resolve War.

## 10. Triggers, choices, and timing

A pending trigger is a triggered ability waiting to resolve. Finish the current Turn action and all resulting pending triggers before the opponent begins the next Turn.

Pending triggers resolve in the order they were triggered. If one player creates several simultaneous triggers, that player chooses their order. If both players create simultaneous triggers, the player whose Turn caused them adds their triggers first, then the opponent adds theirs. A trigger created while another trigger resolves goes to the end of the queue.

Choose is the normal instruction for selecting legal options. When an effect chooses a game object to affect, that object is a target. Choosing a mode, value, or instruction does not target a game object by itself. Targets are chosen when a trigger becomes pending, not when it starts resolving. A target that has become illegal is not affected; resolve the rest of the effect as far as possible. A trigger with no legal required target does nothing. Later optional Plays, card searches, and opponent mode choices are made when their instruction is reached, using the information then available.

Unless explicitly stated otherwise, abilities function only while their source is in play. A Defeat trigger uses the source's last information in play, including its Power and Traits. An ability can follow its source to the stated destination, but a delayed Return from discard fails if the card has already left that discard, even if the same physical card later returns there. A card that re-enters play is a new instance with no old damage, temporary bonuses, or use history.

Once an ability has been Activated or a trigger has become pending, it resolves independently of its source remaining in play. It still needs legal targets and any specifically required source state. Dismissing an Item as its activation cost therefore does not cancel its effect.

Effects that reveal a card from hand must say so explicitly. A reveal temporarily makes that card public; it does not Play it. Birthday Kid's printed hand ability is an explicit exception to the in-play default. Its trigger waits for the revealing action to finish, and its movement requires the card still to be in hand. Opponent guesses and choices printed on a card are choices for Pirate With a Business License; ordinary Blocking and defensive Discards are not.

When an effect asks a player to Discard more cards than they have, they Discard as many as possible. This does not let a player partially pay a Discard cost. An effect instructing a Draw still follows the normal empty-deck loss rule.

“If you do” requires the immediately preceding optional instruction to have been completed. For example: “You may Dismiss an Item. If you do, Draw 2 cards” draws cards only if the Item was actually Dismissed.

## 11. Responses: current experimental rule

Response is a special timing designation on an Action, not a fifth card type. A Response may be Played during an opponent's Turn only at the exact timing printed on that card. It resolves before the interrupted Play, Activation, or Attack continues. There is no universal Response window after every event.

The printed timing sentence is authoritative; an optional scan label such as “Attack Response” may help players read a hand. Response chains and a universal chain limit have not been settled. Do not include Responses in a production card list until the relevant decision is locked.

## 12. Card production rules

Card text should use the vocabulary in this rulebook. Use [cards.json](../cards/cards.json) for current card data and [taxonomy.json](../cards/taxonomy.json) for defined Traits and keywords; the readable sheets are generated from those files.

A card may have zero to four useful printed Traits. Human is unprinted identity metadata. Traits do not imply one another: Rat does not automatically grant Animal, and Bath Salts grants only Undead. The [trait reference](../cards/traits.md) records assignments, support, and the soft saturation guide. No universal four-Trait requirement applies to Leaders. A Trait normally improves a card rather than being its only reason to work; use hard Trait gates only when that restriction is the point of the design.

The physical card must preserve needed information in a fanned hand, on the table, and when cards overlap. Cost and type need fast recognition in hand. Rules text, Power, Guard, and timing information need consistent visible positions on the table. Follow [Card design principles](../../docs/card-design-principles-2026-09-22.md) for layout, symbols, IDs, titles/subtitles, and accessibility.
