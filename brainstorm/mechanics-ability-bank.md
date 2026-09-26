# Mechanics & Ability Ideas Bank

> **Status: design backlog. Nothing in this file is automatically a production rule or production card.**
>
> Purpose: preserve promising mechanical ideas, polish them into testable language, and provide reusable building blocks when revising the production card pool. Promote ideas from this bank only after rules review and playtesting.

## Design principle: Attack and damage are different

This distinction should remain fundamental.

- **Attack** is the combat procedure. It declares an attacker and target, follows Attack/Block timing, and can cause retaliation.
- **Damage** is damage dealt by an effect. An effect that says “deal X damage” is **not an Attack** unless it explicitly says otherwise.
- Direct damage therefore does not inherently create a Block opportunity or retaliation.
- **Dismiss**, **Return**, **Attack**, and **direct damage** should remain meaningfully different ways to answer a Character.

This opens design space for effects that damage Ready Characters without attacking them. Direct damage should generally pay for bypassing combat through lower efficiency, conditions, setup, or opportunity cost.

---

## Keyword candidates

These are candidates, not additions to the active keyword list.

### Step Aside

> **Step Aside — Damage this Character deals ignores Guard.**

Open question: should this apply to all damage dealt by the Character, including ability damage, or only damage it deals in combat? Current preferred experiment is **all damage dealt by that Character**, because it creates more build-around space.

### Overkill

Working concept: excess combat damage can continue to the opposing Leader.

Needs exact combat timing, especially with Blocking and multi-block.

### Chicken

Working concept: when this Character is attacked, it may Return itself to its owner's hand.

Potential Misdirection identity. Needs timing rules for what happens to the Attack after the target leaves play.

### Stubborn

Working concept: the first time each Round this Character would be Returned or Dismissed, it remains in play instead.

Protection from manipulation rather than damage.

### Cheap Shot

Working concept: this Character deals bonus damage to Rotated Characters.

May be better as ordinary card text unless repeated enough to justify a keyword.

### Bodyguard

Working concept: restrict which Characters or Leader can be attacked while this Character is eligible to protect them.

Needs to remain mechanically distinct from normal Blocking and avoid recreating unnecessary frontline rules.

### Ricochet

Working concept: excess or secondary damage can hit another Character.

Likely niche. Test as card text before keywording.

### Freeloader

Working concept: costs less while an opponent has more Stash than you.

Could support catch-up/economy designs. Likely card text unless a package repeats it.

### Last Laugh

Working concept: shorthand for an ability that triggers when the Character leaves play.

Do not keyword unless leave-play effects become common enough that the shorthand materially improves cards.

### Nosy

Working concept: information-gathering effects such as looking at hidden cards.

Strong thematic space for Spy/neighborhood-watch cards, but probably better as individual abilities than a global keyword.

---

# Reusable ability bank

The bank is organized by **trigger** first. Effects can then be matched to Style, Cost, Traits, and card fantasy.

## On Play

Candidate effects:

- Draw a card, then Discard a card.
- Draw, then place a card from hand somewhere specific.
- Return another friendly Character to your hand.
- Return an opposing Character under a condition.
- Deal damage to a Character.
- Deal damage specifically to a Ready Character.
- Rotate a Character.
- Ready another Character.
- Heal a Character or Leader.
- Look at an opponent's hand.
- Reveal cards from the top of a deck.
- Rearrange top cards of a deck.
- Retrieve a card from discard.
- Retrieve an Item from discard.
- Move, steal, swap, or temporarily control an Item.
- Manipulate a card in Stash.
- Create a temporary Cost reduction.
- Put another Character into play under a condition.
- Leave behind or create an Item.

## When Attacking

Candidate effects:

- Gain Power for the Attack.
- Ignore Guard / gain Step Aside.
- Rotate another Character.
- Prevent or alter retaliation.
- Deal damage to a second Character.
- Force or influence Blocking.
- Return this Character to hand after combat.
- Sacrifice this Character after combat for a payoff.
- Temporarily take or disable an Item.
- Gain a bonus when attacking a Ready or Rotated target.
- Trigger if the Attack damages the Leader.
- Trigger if the target survives.

## When Blocking / defending

Candidate effects:

- Gain Guard for the combat.
- Gain Power for retaliation.
- Deal damage to the attacker before normal combat damage.
- Bring another Character into the Block.
- Return the attacker under a condition.
- Ready another Character.
- Discard a card for protection or an added effect.
- Reveal or spring a trap.
- Move damage.
- Protect another Character or the Leader from a secondary effect.
- Trigger specifically when the Blocker survives.
- Trigger specifically when the Blocker is Defeated.

## When leaving play

Candidate effects:

- Draw a card.
- Draw then Discard.
- Deal damage.
- Return another card.
- Retrieve a card from discard.
- Retrieve or leave behind an Item.
- Move itself or another card into Stash.
- Replace itself with another Character.
- Put a lower-Cost Character into play.
- Buff another Character until end of Round.
- Create a temporary economy benefit.
- Reveal information.
- Punish the effect/player that removed it.

“Leaves play” must remain distinct from **Defeated**, **Dismissed**, **Returned**, and **Sacrificed** when a card cares about the specific exit method.

---

# Conditional trigger bank

These narrower triggers can create archetypes and personality without requiring new keywords.

## Opponent behavior

- When an opponent Draws a card.
- When an opponent Draws outside the normal Round Draw.
- When an opponent Stashes a card.
- When an opponent uses Stash to pay a Cost.
- When an opponent spends their last Ready Stash.
- When an opponent ends a Turn with Ready Stash.
- When an opponent Discards a card.
- When an opponent Returns a Character.
- When an opponent Dismisses a card.
- When an opponent plays their second card in a Round.
- When an opponent plays a Character.
- When an opponent plays an Action.
- When an opponent plays an Item.
- When an opponent Readies a Character outside normal Round Ready.
- When an opponent Rotates a Character outside an Attack.
- When an opponent looks at or reveals hidden information.

## Board-state comparisons

- While the opponent's Leader has more Health than yours.
- While your Leader has less Health than the opponent's.
- While an opponent controls more Characters.
- While you control fewer Characters.
- While an opponent has more Stash.
- While you have less Ready Stash.
- While an opponent has more cards in hand.
- While you have fewer cards in hand.
- While you control no Items.
- While an opponent controls an Item.
- While this is your only Ready Character.

## Event-based

- When a Ready opposing Character takes damage.
- When a Rotated opposing Character takes damage.
- When a Character survives damage.
- When a Character is Defeated by direct damage.
- When a Character is Defeated in combat.
- When an Item leaves play.
- When you Draw outside the normal Round Draw.
- When a Character enters play without being Played.
- When a Character Returns to a hand.
- When a face-down card is revealed.
- When a card leaves Stash.
- When a temporary Stash card is spent.

---

# Direct-damage package

We need Actions and abilities capable of damaging **Ready enemies without attacking them**.

Candidate templates:

- Deal 1 damage to a Character.
- Deal 2 damage to a Ready Character.
- Deal 3 damage to a Character that Attacked this Round.
- Deal X damage to a Rotated Character.
- Deal 1 damage to each Ready opposing Character.
- Rotate this Character: deal 1 damage to an opposing Character.
- Deal damage equal to a relevant board count.
- Deal 2 damage to a Character. If this Defeats it, gain a secondary payoff.
- Deal 1 damage to a Character, then another 1 if a condition is met.
- Damage a Character before it attacks or after it declares an Attack.
- Redirect or move a point of damage from one Character to another.

### Balance principle

Direct damage bypasses normal combat interaction, so it should not simply be a more efficient Attack. Cost, conditions, limited targets, setup, or lower damage should preserve reasons to use Characters and combat.

---

# Forced-discard / hand-disruption package

A Style package should deliberately explore forcing the opponent to Discard.

## Preferred current home: Misdirection

The strongest thematic fit is the **Hacker / Spy side of Misdirection**, rather than the Magician package.

Working identity:
- Magician manipulates board position, Return effects, and replay value.
- Hacker / Spy manipulates information, hand quality, Stash information, and opponent planning.

Candidate effects:

- Look at an opponent's hand. Choose a non-Character card. They Discard it.
- Opponent chooses and Discards a card.
- Reveal a random card from an opponent's hand; Discard it if it matches a condition.
- When an opponent Draws outside their normal Round Draw, they Discard a card.
- If an opponent has more cards in hand than you, they Discard a card.
- Opponent may Discard a card; if they do not, apply a small alternative penalty.
- Temporarily reveal an opponent's hand and gain a benefit based on what is there.
- Force a Discard, then allow a replacement Draw for a softer disruption effect.
- Punish holding a large hand rather than repeatedly emptying it.

### Guardrail

Hand disruption should attack **choices and planning**, not routinely prevent the opponent from participating. Avoid a package whose optimal plan is repeatedly emptying the opponent's hand with no practical recovery.

Potential thematic residents include Hackers, ridiculous Spy-vs-Spy espionage characters, and **Miss Tammy, Lot 14** as a neighborhood-information character.

---

# Implementation backlog

These ideas should move through the following pipeline rather than being dumped directly into production:

1. Review the active 180-card pool for generic/redundant abilities.
2. Identify which existing cards are natural homes for the strongest banked mechanics.
3. Map mechanics to Style identity so every Style has recognizable interaction patterns.
4. Add only genuinely repeated mechanics to the keyword list.
5. Build the Misdirection Hacker/Spy discard package.
6. Add direct-damage answers, including ways to damage Ready Characters without Attacking.
7. Seed On Play, When Attacking, When Blocking, and leave-play triggers across the pool.
8. Use conditional triggers to create smaller packages and surprising cross-card interactions.
9. Rules-review every promoted mechanic for Attack vs damage, retaliation, Guard, Ready/Rotate, Return, Dismiss, Defeat, and Stash interactions.
10. Playtest packages before declaring them production-complete.

The goal is not to maximize the number of mechanics. The bank exists so production cards can draw from a coherent vocabulary instead of repeatedly inventing isolated effects.
