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

## Style home under review

Earlier exploration placed this in Misdirection, but the fresh Style audit suggests **Stonewall / denial-control** may be the cleaner primary home. Keep both possibilities open until the Style/package reorganization is complete. Hacker should lean toward system/Stash manipulation; Spy may naturally cross Misdirection and Stonewall.

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
5. Build and test a forced-discard/hand-disruption package, with Stonewall as the leading mechanical home and Spy as a possible cross-Style bridge.
6. Add direct-damage answers, including ways to damage Ready Characters without Attacking.
7. Seed On Play, When Attacking, When Blocking, and leave-play triggers across the pool.
8. Use conditional triggers to create smaller packages and surprising cross-card interactions.
9. Rules-review every promoted mechanic for Attack vs damage, retaliation, Guard, Ready/Rotate, Return, Dismiss, Defeat, and Stash interactions.
10. Playtest packages before declaring them production-complete.

The goal is not to maximize the number of mechanics. The bank exists so production cards can draw from a coherent vocabulary instead of repeatedly inventing isolated effects.


---

# Package architecture exploration

> **Status: fresh package ideas. Preserve without forcing them into the current Style assignments.**

A useful design hierarchy is emerging:

- **Style** = broad mechanical identity / how a deck tends to play.
- **Package** = a smaller repeatable gameplay loop that cards can be built around.
- **Trait/theme** = who or what the cards are.
- **Role** = what an individual card contributes to its package, such as enabler, payoff, engine, interaction, finisher, or glue.

Packages should not be created merely because several cards share a Trait. A strong package should have a recognizable little game or loop. Packages may cross Styles when that creates useful deckbuilding overlap.

## Freeze / Stall

**Core loop:** Rotate opposing Ready Characters, keep important Characters Rotated, and gain value from Characters being or remaining Rotated.

Candidate effects:
- Rotate an opposing Ready Character.
- Choose a Rotated Character. It does not Ready at the start of the next Round.
- The first time each Round an opposing Character fails to Ready, gain a benefit.
- Gain a bonus while attacking a Rotated Character.
- Punish an opponent for having multiple Rotated Characters.
- Create ways for the opponent to fight back by Ready-ing or protecting key Characters.

This should generally **block, delay, or freeze rather than remove**. Current leading Style home is Stonewall.

## Damage Everywhere

This may be a **larger Style identity rather than a narrow package**.

Core idea: deal damage through many different vectors:
- Attacks.
- Actions.
- Items.
- On Play abilities.
- When Attacking triggers.
- Defeat / leave-play triggers.
- Self-damage converted into value.
- Leader damage.
- Splash or secondary damage.

Reckless is the leading home for proactive, broad-spectrum damage. Other Styles may access direct damage through their own costs or conditions, such as Stonewall retaliation/traps, Expendable sacrifice, or Salvage dismissing Items.

Preserve the rule distinction that **dealing damage is not the same as Attacking**.

## Bounce / Return to Hand

**Core loop:** Return Characters to hand, benefit from leaving play or increased hand size, then replay them for On Play value.

Candidate pieces:
- Return your own Character to hand.
- Return opposing Characters to hand.
- Reward a friendly Character being Returned.
- Reward replaying a previously Returned Character.
- On Play abilities that become attractive to reuse.
- Effects that care about the number of cards in hand.

Magician is a natural thematic implementation, but Bounce should be treated as a mechanical package rather than exclusively a Magician rule.

## Big Hand

**Core condition:** gain bonuses while you have more cards in hand than the opponent.

Candidate effects:
- If you have more cards in hand than an opponent, gain Power/Guard.
- If you have more cards, improve an On Play or triggered ability.
- Compare hand sizes for Cost reduction or other value.
- Reward ending a Turn with more cards.
- Pair naturally with friendly Bounce because Returning your own Character increases hand size.

Important tension: bouncing an **opposing** Character also increases their hand size, so Bounce is not automatically beneficial to Big Hand.

## Copycat

**Core loop:** when the opponent performs a useful game action, receive a smaller or mirrored benefit.

Candidate triggers:
- When an opponent Draws, Draw or filter.
- When an opponent heals, heal.
- When an opponent Readies Stash outside normal Ready timing, Ready Stash.
- When an opponent Stashes, gain a related benefit.
- When an opponent Returns a Character, you may Return one of yours.
- When an opponent plays a second Character/card in a Round, trigger.
- When an opponent gains a temporary bonus, gain a smaller analogous bonus.

The package should feel like **“you do it, I get to do something too”**, not literal text-copying of every card. This can discourage or complicate opponent choices without simply prohibiting them. Stonewall is a strong possible home.

## Stash Recharge

**Core loop:** spend Stash, then Ready some of it again to extend a turn or sequence.

Candidate effects:
- Ready one Stash.
- When you play your second/third card this Round, Ready one Stash.
- Ready multiple Stash with a delayed drawback.
- Trigger when Stash Readies outside the normal Round Ready.

Momentum is the leading home. This is mechanically distinct from **Ramp**:
- Ramp increases total permanent Stash.
- Recharge lets existing Stash be used again.

## Stash Retrieval / Exchange

**Core loop:** recover a card previously committed to Stash, usually while replacing the resource so the effect is manipulation rather than free card advantage.

Candidate effects:
- Return a card from your Stash to your hand, then Stash a card from your hand.
- Exchange a hand card with a Stashed card.
- Look at one of your Stashed cards and optionally retrieve it at a cost.
- Retrieve a Stashed card and replace it with a card that enters Rotated.
- Trigger when a card leaves Stash.

Misdirection, especially Hacker, is the leading home. The fantasy is changing your mind, accessing buried information, or manipulating the resource system rather than generating more resources.

## Hand Reset

Candidate baseline effect:

> **Shuffle your hand into your deck, then Draw 3 cards.**

This naturally changes value with hand size:
- Excellent from a very small or poor hand.
- Roughly filtering/resetting around three cards.
- A real cost when used with a large hand.

Do not force a Style home yet.

Possible experimental variant:

> Shuffle your hand into your deck, then Draw 3 cards. If you shuffled no cards this way, Draw 4 instead.

This could seed an **Empty Hand** package that intentionally spends through its hand and reloads, creating a natural opposite to Big Hand.

## Possible mechanical package map

This is exploratory, not a locked color pie:

| Style | Candidate mechanical packages / identities |
| --- | --- |
| Reckless | Damage Everywhere; self-damage; aggressive Attack; Step Aside; risk/borrow |
| Momentum | Ramp; Stash Recharge; chaining multiple plays; growth |
| Misdirection | Bounce; Big Hand; Stash Retrieval/Exchange; hidden/face-down manipulation |
| Salvage | Item recycling; temporary Item Stash; discard reuse; junk/build engines |
| Stonewall | Freeze/Stall; Copycat; Tax; forced discard; reactive punishment |
| Expendable | Sacrifice; Defeat/leave-play payoffs; recursion; possible Empty Hand exploration |

Thematic packages can then sit on top of or across these mechanics. Examples already worth exploring include Magician/Bounce, Spy/hidden information + denial, HOA/Tax, Wrestlers/tagging, Undead/recursion, Junkyard/Item recycling, and Musician/chain-play.



---

# Damage-state and functional-healing ideas

> **Status: package / ability-bank exploration. Not production-locked.**

## Character-only damage / Leader-safe interaction

Direct-damage cards can be intentionally constrained to **Characters rather than Leaders**. This creates stronger board-control damage without automatically becoming Leader burn.

Prefer natural targeting language such as:

> Deal 3 damage to a Character.

rather than extra reminder text saying the effect cannot target a Leader when the target restriction already establishes that.

This restriction can be used on Actions, Items, triggered abilities, and Character abilities.

## Damaged-Character / self-damage payoffs

Damage on a friendly Character can function as a resource or state rather than only a liability.

Candidate effects:

> **While this Character has damage, it gets +2 Power.**

> **When this Character attacks, you may Draw cards equal to the damage currently on it.**

The second effect is intentionally banked in its raw form; exact scaling or a cap should be determined in balance testing.

Reusable scaling vocabulary to explore:

- Amount of damage currently on this Character.
- Whether this Character has any damage.
- Whether this Character has at least X damage.
- Amount of damage among your Characters.
- Damage added to this Character this Round.

Possible payoffs include Power, Draw/filtering, direct damage, Cost reduction, healing, Ready effects, or other package-specific rewards.

The intended tension is that self-damage can make a Character more valuable while simultaneously putting it closer to Defeat.

## Damage Everywhere: leave-play Leader ping

Candidate effect:

> **When this card leaves play, deal 1 damage to the opposing Leader.**

Because **leaves play** is broader than Defeated, this can potentially trigger from Defeat, Dismiss, Return, Sacrifice, and other methods of leaving play. That interaction is intentional design space but requires balance testing, particularly with Bounce and Sacrifice packages.

This belongs in the broader **Damage Everywhere** identity: damage can originate from Attacks, Actions, Items, triggers, self-damage interactions, and cards leaving play.

---

# Functional healing

Healing should have meaningful functions beyond simply reversing damage. Damage can be something a player intentionally accumulates and later **converts into another resource or payoff**.

This creates tension with damaged-Character packages: healing a Character may make it safer while turning off abilities that reward remaining damaged.

## Heal into cards

Candidate template:

> **Heal up to 3 damage from a Character. Draw a card for each damage healed this way.**

Exact numbers require testing. The important mechanic is that **actual damage removed determines the payoff**.

## Heal into Power

Candidate template:

> Heal any amount of damage from one of your Characters. It gets +1 Power this Round for each damage healed this way.

## Heal into Stash utility

Candidate template:

> Heal 2 damage from a Character. If you healed 2 damage this way, Ready one Stash.

## Heal into Ready

Candidate template:

> Heal up to 2 damage from a Rotated Character. If you healed damage this way, Ready it.

This can bridge healing with Freeze/Stall counterplay.

## Transfer damage

Candidate template:

> Move up to 2 damage from another friendly Character to this Character.

Moving damage is mechanically distinct from healing. It can save one Character while deliberately activating a damaged-Character payoff on another.

## Redistribute damage

Explore effects that move damage among friendly Characters without reducing the total amount of damage in play.

This creates tactical damage management and can support Characters that actively want to be damaged.

## Threshold healing and payoff

Possible patterns:

- If you healed at least 2 damage, gain X.
- If a Character has 3 or more damage, heal it and gain a larger payoff.
- Heal a Character just before it would otherwise be Defeated.
- Heal a Leader, then gain an effect based on the amount actually healed.
- Effects that care about whether a Character remains damaged after healing.

## Self-damage / healing ecosystem

Treat these as three related but distinct mechanical families:

1. **Self-Damage** — intentionally place damage on your own Characters for tempo or setup.
2. **Damaged-Character Payoffs** — reward Characters for having or accumulating damage.
3. **Functional Healing** — remove accumulated damage and convert the amount removed into cards, Power, Stash utility, Ready effects, or other value.

A possible gameplay loop is:

**damage yourself → unlock damaged bonuses → accumulate damage → cash out the damage through healing → receive a second payoff**

Functional healing should also appear outside dedicated self-damage decks so that healing remains a broadly useful mechanic rather than merely one half of a single combo package.

## Interaction-to-economy passive idea — banked

Inspired by the general pattern of cards that reward an opponent for attacking into your board, not by copying any specific implementation.

Possible Unhinged direction:

> **When one of your Characters is attacked, you may put the top card of your deck into your Stash face down and Rotated.**

Why it may be interesting:
- turns opponent interaction into economy without preventing the interaction;
- creates a visible decision about whether attacking a utility Character is worth accelerating its controller;
- could fit a future Leader, Item, or package bridge;
- top-deck-to-Stash explicitly breaks the normal hand-to-Stash rule and should therefore feel special.

Do **not** add this to the current Misdirection bounce package during revision 6. Preserve it for a later Leader/passive experiment.
