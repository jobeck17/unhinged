# UNHINGED — Mongo Pre-Commit Snapshot
**Alpha 0.03 • Mongo • PRE-COMMIT PIN**  
**Pinned:** September 18, 2026

> This is the rollback point immediately before committing the recent dual-pool, momentum, and “insane card” experiments. Mongo’s committed core remains intact. Everything marked LAB is deliberately preserved without becoming canon.

## Legend
- 🔒 **LOCKED** — committed Mongo rule / baseline.
- 🧪 **LAB** — actively promising experiment, not committed.
- 📌 **PINNED** — preserve exactly for rollback/comparison.
- 🗄️ **VAULT** — good idea intentionally tabled until the base game is firmer.
- ❌ **SCRAPPED** — tested/rejected for the current build.

# 1. What We Know For Now

## Core game
- 🔒 40-card decks.
- 🔒 7-card starting hand.
- 🔒 One Leader begins in play; reduce the opposing Leader to 0 Health to win.
- 🔒 Alternating primary actions.
- 🔒 Single unrestricted Unit battlefield. **No Frontline / Backline / lanes in Mongo.**
- 🔒 Universal Overflow: excess attack damage continues through blockers sequentially and can reach the Leader when appropriate.
- 🔒 Multiple Units may block one attack.
- 🔒 During defense, the defender may discard any number of cards from hand for +1 Guard each. Hand size is the natural cap.
- 🔒 Guard does not increase Power or retaliation damage.
- 🔒 **Survivors-only retaliation:** after combat, each blocking Unit that survived deals its Power to the attacking Unit. A blocker defeated during the attack does not retaliate.
- 🔒 Damage persists unless an effect says otherwise.
- 🔒 Mix of vanilla and text-bearing Units. Vanilla baseline remains important as the stat ruler.

## Deck skeleton
- 🔒 Working baseline: **26 Units / 8 Actions / 6 Items**.
- 🔒 Actions are moments: resolve once, then dismiss.
- 🔒 Items are possessions: normally attach to a Unit, persist, and are dismissed when that Unit leaves play.
- 🔒 A Unit may currently carry multiple Items unless later testing shows a limit is necessary.
- 🔒 Exceptions may create standalone Items when the fiction/mechanic demands it.

## Five mechanical identities
The current simulation identities are:
- **Aggro** — pressure, attack windows, offensive conversion.
- **Midrange** — efficient durable bodies, reinforcement, sustained board value.
- **Control** — defense, denial, disruption, durable answers.
- **Tempo** — readiness/exhaustion, bounce, sequencing, temporary asymmetry.
- **Kamikaze** — sacrifice, death triggers, turning losses into value.

The eventual game identity names remain **Reckless, Unruly, Crooked, Makeshift, Stubborn**. Exact mapping to the five simulation identities is not committed here.

## Historical benchmark worth preserving
A prior 120,000-game balance pass produced:
- Midrange 55.5%
- Aggro 51.1%
- Kamikaze 48.2%
- Tempo 47.8%
- Control 47.4%

That historical run used the earlier “blocking does not automatically retaliate” implementation, so it is a benchmark, not a claim that the current survivors-only build reproduces those exact decimals.

Historical timing:
- Average game: 7.24 rounds
- Median: 7 rounds
- 90% finished by round 10
- Seven-card hands continued to behave well.

Historical temporary Leader profiles:
- War Chief / Aggro: 18 Health
- Field Marshal / Midrange: 22 Health
- Bastion / Control: 24 Health
- Tactician / Tempo: 21 Health
- Martyr King / Kamikaze: 20 Health

These Health totals are **relative test values, not final printed numbers**.

# 2. What We Think Right Now

## Combat
📌 Mongo’s combat skeleton is in a good enough place to stop redesigning it every five minutes:
1. Attack.
2. Defender assigns any number of blockers.
3. Defender may discard cards for Guard.
4. Damage resolves with Overflow.
5. Dead blockers are removed.
6. Surviving blockers automatically retaliate.

The survivors-only retaliation test stayed close to the historical benchmark and avoided the severe defender advantage caused by full automatic retaliation.

## Resources
🧪 Three economies were compared conceptually:
1. Current Command + Stamina.
2. One universal resource.
3. Split-purpose economy where Command pays persistent development and Stamina pays tactical effects / abilities.

The split-purpose version is the most interesting challenger, but **no resource redesign is committed at this pin**.

## Dual-pool deckbuilding
🧪 Treat the five identities like colors and allow a Leader to build from its native pool plus one secondary pool.

Important experiment structure:
- 5 mono builds.
- 20 Leader + secondary-pool builds.
- 25 total builds.
- Same two pools with different Leaders count as different builds.

Promising emergent combinations:
- Control + Midrange: fortress / durable investment.
- Kamikaze + Aggro: reckless attacks become profitable deaths.
- Tempo + Aggro: create attack windows rather than simply adding Power.
- Midrange + Aggro: strong but comparatively plain “good cards” efficiency.

Watch item:
- Midrange appears highly splashable. Do not nerf yet. Instead, make some of its efficiency depend on doing Midrange things so it is not simply the universal best-rate pool.

**Dual-pool construction is LAB, not canon.**

# 3. Momentum / Comeback Lab

🧪 The working goal is **not** rubber-band rules. We want cards and decisions that can reverse accumulated advantage.

Preferred principle:
> Every identity should have powerful effects capable of reversing the particular kind of advantage it struggles against. Those effects should be disproportionately useful from behind without explicitly saying “if you are losing.”

Identity comeback vocabulary:
- Aggro: turn the game back into a race.
- Midrange: rebuild a broken board.
- Control: reset accumulated enemy advantage and reload answers.
- Tempo: temporarily invert initiative / board orientation.
- Kamikaze: convert a losing board into damage, cards, or other value.

Modeled tests suggested:
- Two swing effects in a 40-card deck produced more lead changes and materially more comeback games.
- The cards were much more valuable from behind than while already ahead.
- Games where both players resolved a swing effect were especially dynamic.
- A dual-pool deck should **not automatically get four bombs**. If a future construction rule formalizes these slots, two total per deck is the current experimental ceiling.

None of those numerical model results are treated as laboratory-grade because literal 25-deck card lists are not frozen.

# 4. The “Insane Card” Layer

📌 **PRE-COMMIT DESIGN STATE:** preserve this idea exactly, but do not lock individual cards.

We are testing three rough intensity layers:
1. **Bread-and-butter cards** — make the deck function.
2. **Synergy cards** — reward assembling pieces.
3. **Holy-shit cards** — radically alter the game when their conditions are right.

The strongest design principle from the stress test:
> The stronger the effect, the more its ceiling should depend on game state, deck construction, accumulated resources, or setup.

The craziest cards should multiply **opportunity**, not simply multiply an existing lead.

### Aggro examples
- **Bar Fight** — board/attack-window reversal.
- **Hold My Beer** — explosive offensive engine.
- **Last Call** — all-in identity payoff.
- Concept: ready attackers, gain temporary Power, then pay a real consequence such as dismissing attackers afterward.

### Midrange examples
- **Everybody Get In Here** — flood/rebuild the board.
- **Second Shift** — reconstruction/value.
- **Neighborhood Watch** — durable payoff.
- Karen / HOA swarm is a natural flavor home for a reverse-board-wipe effect.

### Control examples
- **Absolutely Not** — damaged-Unit reset.
- **Forbidden Tome** — repeat/retrigger an Action through setup.
- **Code Enforcement** — large denial payoff.
- A Control reset should often reload future answers, not merely make the board empty.

### Tempo examples
- **Again.** — return exhausted enemies and/or reset the action window.
- **Do That Again** — retrigger / sequencing engine.
- **Wrong Door** — displacement payoff.
- Tempo’s bomb should flip initiative, not imitate Control destruction.

### Kamikaze examples
- **Everybody Dies** — sacrifice your board and convert it into selectable damage/draw/value.
- **Cockroach King** — graveyard recursion / “you thought they were gone” payoff.
- **Fresh Meat** — death-engine payoff.

### Other insanity worth preserving
- Wizard / Channel-style setup that lets a tribe help cast absurdly expensive effects such as a Meteor-scale Action.
- Retriggering “When Played” abilities is exciting because the player builds the bomb, but unrestricted draw/retrigger loops are dangerous.
- Resurrection should not automatically count as “played” unless explicitly stated.
- Cheap repeatable mass bounce is miserable.
- Unconditional Leader-damage multipliers tend to become win-more.
- Generic extra turns were a bad direction.
- Items can participate in ridiculous engines. A multi-piece engine is allowed to do ridiculous things because the opponent can attack the pieces.
- Fourth-wall / WTF cards, opponent-attached Items, bluffing, mini-games, and physical-card interactions remain in the Vault for later.

# 5. What We Are NOT Committing Yet

🧪 Dual-pool deckbuilding.  
🧪 Exact mapping of the five adjective identities to simulation pools.  
🧪 Any special “Momentum” card type, frame, keyword, or mandatory slot.  
🧪 Exact insane-card names/text/costs.  
🧪 Two insane cards as a formal deckbuilding requirement.  
🧪 Split-purpose Command/Stamina economy.  
🧪 Final Leader Health totals.  
🧪 Leader identity restrictions for multicolor construction.  
🧪 Nimble.  
🗄️ Face-down bluff cards / functional card backs.  
🗄️ Fourth-wall-breaking and mini-game effects until the base set can support them.

# 6. Scrapped / Rejected For Mongo

❌ Frontline / Backline formation in the current build.  
❌ Three-lane battlefield in the current build.  
❌ Full automatic retaliation including dead blockers.  
❌ Separate paid counterattack as the current retaliation model.  
❌ Universal discard 2 → draw 1 cycling.  
❌ Action-to-resource conversion as a universal rule.  
❌ Simply inflating every Leader’s Health to lengthen games.  
❌ Generic extra turns as a swing-card solution.

# 7. Questions We Need Answered Now

1. Does the current resource economy make Units, Actions, and Items all compete in interesting ways?
2. Does split-purpose Command/Stamina improve tactical play without making Actions effectively free?
3. In literal card play, does survivors-only retaliation still produce the balance the abstract model predicts?
4. How often does a player who is behind in Leader Health actually have the better board?
5. What are comeback rates when tracking **Leader Health + board value + hand size + Item investment** together?
6. How often do “holy-shit” cards create parity versus simply flipping directly into a win?
7. When both players resolve a huge effect, is the second bomb too advantaged?
8. Can dual-pool construction create emergent archetypes without making Midrange the universal splash?
9. What deckbuilding restriction prevents “best Leader + best shell” without strangling experimentation?
10. Which ridiculous effects are fun once and miserable when repeatable?

# 8. What’s Next

📌 **Immediate playtest target:** a playable Mongo web prototype using the pinned combat skeleton, 26/8/6 decks, all five identities, Items, Actions, and a small experimental dose of the insanity layer.

The app should make the experiment visible rather than hiding it:
- choose mono or experimental dual-pool deck;
- choose a Leader;
- play against a simple AI;
- deploy Units, attach Items, play Actions;
- attack Leader or Units;
- multi-block;
- discard for Guard;
- resolve Overflow and survivors-only retaliation;
- track persistent damage;
- include a few spectacular cards per identity;
- clearly label LAB mechanics;
- maintain a readable match log.

# Rollback Tag

**PIN: MONGO-PRECOMMIT-2026-09-18**

If later experiments go sideways, return to this document. Everything above “LAB” is preserved as an experiment; everything marked LOCKED is the Mongo core.
