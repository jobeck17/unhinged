# Unhinged Current Rules

Working production rulebook • 23 September 2026

This is the consolidated rules source for the next Unhinged playtest and card-production pass. It reflects the locked and current soft-locked rules in the September 21 checkpoint and LAB snapshot. Items still deliberately unresolved are listed in [Open decisions](open-decisions.md).

## 1. Core principle

Base rules apply to every player. Printed card text may add to, change, or override a base rule. A deck identity, Trait, or keyword does nothing unless a rule or card text says it does.

The normal win condition is reducing the opposing Leader to 0 Health. A game has no draw: **War** resolves a tied game-end state.

## 2. Game objects and zones

Each player has a Deck, Hand, Discard, Play Area, and Fuel Tank. Cards in the Play Area are **in play**.

- A **Leader** starts in play outside its owner's deck.
- A **Unit** has Power and Guard. When damage on a Unit equals or exceeds its Guard, it is Defeated.
- An **Action** resolves once, then goes to its Owner's discard unless its text says otherwise.
- An **Item** enters play and remains there. It attaches only when its text says to Attach it; otherwise it is a standalone Item.
- **Fuel** is the spendable resource used to pay Costs.

The working card types and the word Unit are current test language. The Unit-versus-Character choice is still open for production; see [Open decisions](open-decisions.md).

## 3. Core vocabulary

| Term | Meaning |
| --- | --- |
| **Ready** | Upright and available. |
| **Rotate** | Turn a Ready card 90 degrees sideways. A sideways card is **Rotated**. |
| **Ready a card** | Return a Rotated card upright. |
| **Play** | Play a card from a zone where a rule or effect allows it. |
| **Enters play** | A Unit or Item arrives in the Play Area. Its normal enters-play abilities trigger. |
| **Activate** | Voluntarily use an activated ability and pay its listed cost. Attack and Block are not activated abilities. |
| **Cost** | The number paid by Rotating Fuel, unless a card says otherwise. |
| **Power** | Combat damage dealt by a Unit. |
| **Guard** | A Unit's damage threshold. Damage persists unless healed or the Unit leaves play. |
| **Health** | A Leader's survival total. |
| **Vulnerable** | A Rotated Leader cannot be Blocked when attacked. |

Formal rules language uses **Rotate**, **Play**, and **enters play**. The [terminology guide](../../docs/terminology.md) records wording that must not appear in new rules or card text.

### Card movement

- **Draw:** move the top card of a deck to its owner's hand.
- **Discard:** move a card from a hand to its owner's discard.
- **Return:** move a card from another zone to its Owner's hand.
- **Defeat:** move a Unit from play to its Owner's discard.
- **Sacrifice:** Defeat one of your own Units as a cost or effect. A Sacrifice is also a Defeat.
- **Dismiss:** move a card from play to its Owner's discard without Defeating it.
- **Put:** neutral movement to the stated destination. It is not automatically any event above.

Ownership never changes. Current production wording should prefer “your Unit,” “an opposing Unit,” and “the player who played this Action.” Controller remains an unresolved legacy term and is not required for new cards.

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

Round 1 includes this normal Draw step. Effects lasting “this Round” expire when the Round ends, before the next Ready, Set, Draw.

On a Turn, choose one: Play a card, Activate an ability, Attack, or Pass. Each uses that Turn except for triggered and static abilities. Blocking happens during the opponent's Turn and does not use a future Turn.

Passing immediately gives the opponent a Turn. If either player Plays, Activates, or Attacks after a Pass, the consecutive-Pass count resets. Two consecutive Passes end the Round. The player who made the first of those Passes takes the first Turn next Round. A player who has no legal Play, Activation, or Attack must Pass.

## 6. Fuel and deckbuilding

Fuel is the only current spendable resource. Rotate Fuel to pay a card or ability's Cost. Fuel Readies at the start of each Round.

The current progression is a soft lock:

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7+ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Fuel | 1 | 2 | 3 | 4 | 5 | 6 | 7 |

The working deckbuilding rules are also soft locks: choose one Leader; a deck may include that Leader's color plus one secondary color; use up to two copies of a card; and keep the Leader outside the deck. There is no required mix of Units, Actions, and Items, and no base limit on Units in play.

## 7. Playing cards

A card may be Played when its Cost can be paid and every required choice or target can legally be made. It need not be guaranteed to change the game state. Optional choices may be declined.

Actions normally may be Played only on their owner's Turn. Resolve the Action, then put it into its Owner's discard unless it says otherwise. An Action does not enter play.

Items remain in play. A Unit may have any number of attached Items unless card text says otherwise. Items cannot normally be attacked. If a card with attached Items leaves play, put those Items into their Owners' discards unless a card says otherwise. This cleanup is not Dismiss.

Units enter play Ready unless an effect says otherwise. A Unit that entered play this Round may Block, but cannot Attack or Activate one of its own Rotate abilities that Round unless a card says otherwise.

## 8. Attack and Block

One Unit attacks per Attack unless card text says otherwise. Declaring an Attack Rotates the attacker.

- A Leader may always be attacked.
- Ready defending Units may Block an Attack against their Leader. The defender may choose not to Block.
- Rotated enemy Units may be attacked directly. A direct Attack against a Rotated Unit cannot be Blocked.
- Ready Units cannot normally be attacked directly.
- Items cannot normally be attacked.
- A Rotated Leader is Vulnerable. It may still be attacked as normal, but that Attack cannot be Blocked.
- Leaders do not retaliate unless card text says otherwise.

Only Ready Units may Block. The defender declares all Blockers at once and chooses their order. Blocking Rotates each Blocker. A newly entered Unit may Block and Rotate in the Round it entered play.

### Defensive Guard

During defense, the defender may Discard any number of cards from hand to give specific Blockers +1 temporary Guard for each card Discarded. Temporary Guard absorbs damage before normal Guard, does not increase retaliation Power, and disappears after that Attack resolves. Damage absorbed by temporary Guard does not persist.

### Multi-block damage and Overflow

Damage through Blockers is sequential in the defender's chosen order. The attacker must deal lethal damage to the current Blocker before remaining damage continues to the next one. After the final Blocker, remaining damage reaches the Leader.

Overflow applies only to an Attack against the Leader through Blockers. Excess damage from an Attack against a Rotated Unit is lost.

### Retaliation

A Blocking Unit that survives the attack retaliates with its Power. A Blocker Defeated by the attack does not retaliate unless it has **Explosive**. A Rotated Unit attacked directly retaliates if it survives.

- **Explosive:** This Unit retaliates when it Blocks even if the incoming Attack Defeats it.
- **Slowpoke:** This Unit does not retaliate when it Blocks.

## 9. Damage, healing, and game end

Damage persists between Rounds until healed or the card leaves play. A Unit is Defeated immediately when damage equals or exceeds its current Guard, including after a Guard reduction. Healing cannot exceed current normal Guard or Health unless an effect increases that maximum.

Do not immediately end a game when a Leader reaches 0 during resolution. Finish the current action and every pending trigger it created. Then check Leader Health. If only one Leader is at 0 or less, that Leader's player loses. If both are at 0 or less, resolve War.

## 10. Triggers, choices, and timing

A pending trigger is a triggered ability waiting to resolve. Finish the current Turn action and all resulting pending triggers before the opponent begins the next Turn.

Pending triggers resolve in the order they were triggered. If one player creates several simultaneous triggers, that player chooses their order. If both players create simultaneous triggers, the player whose Turn caused them adds their triggers first, then the opponent adds theirs. A trigger created while another trigger resolves goes to the end of the queue.

Choose is the normal instruction for selecting legal options. When an effect chooses a game object to affect, that object is a target. Choosing a mode, value, or instruction does not target a game object by itself. Targets are chosen when a trigger becomes pending, not when it starts resolving.

“If you do” requires the immediately preceding optional instruction to have been completed. For example: “You may Dismiss an Item. If you do, Draw 2 cards” draws cards only if the Item was actually Dismissed.

## 11. Responses: current experimental rule

Response is a special timing designation on an Action, not a fifth card type. A Response may be Played during an opponent's Turn only at the exact timing printed on that card. It resolves before the interrupted Play, Activation, or Attack continues. There is no universal Response window after every event.

The printed timing sentence is authoritative; an optional scan label such as “Attack Response” may help players read a hand. Response chains and a universal chain limit have not been settled. Do not include Responses in a production card list until the relevant decision is locked.

## 12. Card production rules

Card text should use the vocabulary in this rulebook. A Trait normally improves a card rather than being its only reason to work; use hard Trait gates only when that restriction is the point of the design.

The physical card must preserve needed information in a fanned hand, on the table, and when cards overlap. Cost and type need fast recognition in hand. Rules text, Power, Guard, and timing information need consistent visible positions on the table. Follow [Card design principles](../../docs/card-design-principles-2026-09-22.md) for layout, symbols, IDs, titles/subtitles, and accessibility.
