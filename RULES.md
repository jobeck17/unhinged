# Unhinged Rules — Mordecai 0.4

**Working production rulebook • 6 October 2026**

Mordecai 0.4 promotes the tested Composure 2.0 core into production and replaces Carl 0.3 as the canonical rules generation. The core-rules design gate is closed for this playtest. Card, deck, Leader, simulator, browser, and terminology audits follow this promotion. Where current card data still contains legacy wording, **this rulebook wins**.

## 1. Core game

Each Leader begins with **20 Composure**. Characters have **Attack / Health / Trouble**.

The core Character decision is:

**Attack a Character / Cause Trouble / Stay Ready.**

Attack governs Character combat. Health governs Character durability. Trouble pressures the opposing Leader.

Base rules apply to every player. Printed card text may add to, change, or override a base rule. Traits have no inherent rules meaning unless referenced. Keywords mean only what the rules or card text define.

## 2. Objects and zones

Each player has a Deck, Hand, Discard, Play Area, and Stash, plus one **Leader** and one **Last Straw** outside the 40-card deck.

- **Leader:** visible outside the deck and play area; provides deck identity, a passive, a printed Breaking Point ability, and Composure.
- **Last Straw:** begins face-down under its Leader and is not part of the deck.
- **Character:** has Attack, Health, and Trouble.
- **Action:** resolves once, then goes to its owner's discard.
- **Item:** enters play and remains until moved; may be standalone or attached.
- **Stash:** resource row used to pay Costs.

Only Characters and Items are normally **in play**. There is no base limit on Characters in play, Items in play, Stash size, hand size, or Items attached to one Character.

## 3. Vocabulary and movement

| Term | Meaning |
| --- | --- |
| **Ready** | Upright and available. |
| **Rotate** | Turn a Ready card 90 degrees sideways. |
| **Rotated** | Sideways. |
| **Play** | Play a card from a zone where a rule/effect permits it. |
| **Activate** | Voluntarily use an activated ability and pay its cost. |
| **Attack** | A Character's combat stat, and the action of attacking another Character. |
| **Health** | A Character's durability. |
| **Trouble** | A Character's Leader-pressure stat. |
| **Composure** | A Leader's victory-pressure track. |
| **Breaking Point** | Protected one-time Leader threshold at 10 or less Composure. |
| **Last Straw** | Hidden outside-deck card revealed at 0, and the endangered state that normally follows. |
| **Unhinged** | The game-losing Leader state. |

- **Draw:** top of deck to hand.
- **Discard:** hand to owner's discard.
- **Return:** another zone to owner's hand.
- **Defeat:** Character from play to owner's discard.
- **Sacrifice:** Defeat one of your own Characters as a cost/effect; also a Defeat. Terminology remains subject to the 0.4 card audit.
- **Dismiss:** card from play to owner's discard without Defeating it.
- **Put:** neutral movement to the stated destination; not automatically Draw, Discard, Return, Defeat, Sacrifice, or Dismiss.

There is no free voluntary self-Dismiss action. **Ownership never changes.** Cards sent to a discard pile always go to their owner's discard.

## 4. Setup and War

1. Bring a 40-card deck, one Leader, and one Last Straw.
2. A standard deck may use the Leader's Style plus up to one additional Style. Mono-Style is legal.
3. Standard maximum is four copies of a card unless explicit deck-construction text overrides it. Current rulebreakers may create exceptions, such as Crazy Cat Lady allowing up to 10 Stray Cats.
4. Put the chosen Last Straw face-down under the Leader.
5. Set each Leader to **20 Composure**.
6. Shuffle and perform War to determine first player.
7. Draw seven cards.
8. Mulligan any number from 0–7: draw replacements, then shuffle replaced cards into the deck.
9. The second player receives **no setup temporary Stash**.

**War:** each player reveals the top card and compares printed Cost. Higher wins. Repeat ties. Return revealed cards and shuffle. War may resolve a genuinely simultaneous game-ending tie when no more specific rule does.

## 5. Rounds and Turns

A Round is one full Turn from each player. The War winner takes the first Turn of every Round unless an effect changes this.

Start of Turn:
1. Ready eligible Characters, Items, and Stash.
2. Draw one card.
3. Begin the main Turn.

The first player skips the Draw step of their first Turn. The second player Draws normally.

During your Turn, you may Play cards, Stash when eligible, Activate abilities, Attack, and Cause Trouble in any legal order as often as Ready cards/resources and text permit.

There is **no universal once-per-Turn Attack-or-Cause-Trouble cap**. Readiness is literal. If an effect Readies a Character, that effect is responsible for any restriction such as “It cannot Cause Trouble this Turn.”

“This Turn” expires at end of that Turn. “This Round” expires after the second Turn and end-of-Round effects.

## 6. Stash

There is no automatic resource progression. Once per Round during your Turn, you may put one card from hand face-down into Stash. This is not a separate action.

Normal Stash enters Ready, pays 1 toward a Cost when Rotated, has no printed identity/stats/text while there, and cannot leave unless a rule/effect moves it. Its identity is unknowable even to its owner unless an effect permits looking. Stash count and Ready/Rotated state are public.

Effects may create face-up temporary Stash or otherwise break these rules. Unless text says otherwise, face-up temporary Stash is discarded when spent. Costs may be reduced to 0.

## 7. Playing, attachments, and control

Actions resolve and go to discard. The universal **Response** system is removed.

Characters and Items enter Ready unless text says otherwise.

A Character that enters play normally cannot Attack until its controller's next Turn unless it has Hothead, cannot Cause Trouble because it did not begin the Turn under that controller's control, and cannot use one of its own Rotate abilities until that controller's next Turn unless text says otherwise. Items may normally use their own abilities the Turn they enter.

By default, an attaching Item attaches only to a Character you control. Explicit text may attach to an opposing Character. Any number of Items may attach to a Character unless text limits it.

When a Character leaves play, attached Items go to their owners' discards unless text says otherwise. This is cleanup, **not Dismiss**.

If a Character changes control, attached Items stay attached. Effects they grant to, modify on, or trigger from that Character continue with the Character under its new controller. Item ownership and independent Ready/Rotated state do not change. Controlling the Character does not grant control of a separate activated Item ability unless text says so.

Changing control does not Ready/Rotate, heal, remove attachments, or reset state. If a control effect gives no duration, it lasts until end of the current Turn unless text says otherwise. When temporary control ends, the Character returns to its previous controller in its **current state**.

## 8. Attack

**Leaders cannot be Attacked.** Attacks are Character-versus-Character.

Choose an eligible Ready attacker and eligible opposing Character, then Rotate the attacker. By default only opposing **Rotated Characters** may be Attacked. Ready Characters are protected from ordinary Attacks; Sucker Punch and explicit text may override this.

Ready protects from ordinary Attacks **only**. Ready Characters may still be targeted/affected by Actions, Items, abilities, damage, placed damage, Rotate effects, Return, Dismiss, Defeat, attachments, and other effects unless text says otherwise.

The attacker deals damage equal to its Attack. There is **no blocking step and no universal retaliation**. If the target leaves before combat damage, the Attack ends and the attacker remains Rotated.

**Retaliate:** When this Character survives an Attack, it deals its Attack as damage to the attacking Character. A Character Defeated by the Attack does not Retaliate unless text says otherwise.

## 9. Damage and Health

Damage persists until healed/removed or the Character leaves play. A Character is Defeated immediately when accumulated damage equals or exceeds current Health.

All damage uses the same durability system regardless of source. If Health is reduced so existing damage equals/exceeds it, Defeat immediately. **Effective Health cannot be below 0. A Character at 0 Health is Defeated.**

**Deal damage** creates a damage-dealt event. **Put damage** adds damage without dealing it, so it does not trigger “dealt/took damage” effects unless text says otherwise. Both contribute to the same Defeat check and neither cares whether the Character is Ready.

Healing removes Character damage. Leaders recover Composure instead.

## 10. Cause Trouble

Cause Trouble is **not combat and cannot be Blocked**.

To Cause Trouble, choose a Ready Character you control that began the Turn under your control and has at least 1 effective Trouble. Rotate it. The opposing Leader loses Composure equal to its effective Trouble.

Afterward that Character is Rotated and exposed to ordinary Attacks.

Trouble is fully modifiable. Effects may increase, reduce, or set it. **Effective Trouble cannot be below 0. A 0-Trouble Character cannot Cause Trouble.** If raised to 1+, it becomes eligible normally.

Cause Trouble through Characters is the primary victory-pressure engine. Direct Composure loss from other effects is valid spice/synergy/payoff/reach, but should normally carry meaningful condition, inefficiency, risk, setup, or deckbuilding cost.

## 11. Breaking Point

The first time a Leader moves from above 10 Composure to **10 or less**, its Breaking Point triggers.

Breaking Point is universal at 10, triggers only once, uses the unique ability printed on that Leader, and cares about actual Composure movement rather than whether an effect says “lose,” “set,” or something else.

Breaking Point is a **protected Leader event**. Normal effects cannot cancel, prevent, or interrupt it.

**Threshold crossings are latched.** Record the crossing when it occurs, finish the current effect, then resolve the threshold. Recovery above 10 during that same effect does not erase the trigger.

A Leader may later recover above 10 up to 20, but Breaking Point never retriggers. Persistent BP text may explicitly check current Composure and toggle without retriggering.

If both Leaders cross BP in one effect, finish the effect, then use actual trigger order. Genuine ties resolve non-active player first.

## 12. Last Straw

Reaching 0 Composure does **not** normally lose if the Leader still has an unused Last Straw.

The chosen Last Straw begins **face-down under the Leader** and remains hidden through Breaking Point. When that Leader first reaches 0:

1. Finish the current effect.
2. Resolve any Breaking Point crossed by that effect before Last Straw.
3. Reveal the Last Straw.
4. Rotate it 90 degrees and leave it face-up beside the Leader as a spent marker.
5. Resolve it.
6. Force the current Turn into its normal end-of-Turn sequence, including scheduled effects/cleanup.
7. Pass normally. Last Straw never grants an extra Turn.

Once triggered, Last Straw is a protected Leader event and normal effects cannot cancel/prevent/interrupt its resolution. Ordinary effects cannot interact with a Last Straw unless they explicitly refer to **Last Straw**.

If a Leader reaches 0 and its Last Straw was removed before it triggered, that Leader immediately becomes **Unhinged** and loses.

### Last Straw state

Normally the Leader remains at **0 Composure** after its Last Straw resolves.

While your Leader is at Last Straw:
- your Characters have **Hothead**;
- your Characters may Attack opposing Ready Characters;
- the next opposing Character that successfully **Causes Trouble** makes your Leader **Unhinged** and you lose.

The final Cause Trouble is not ordinary Composure loss. Preventing/reducing Composure loss does not stop it; an effect must prevent/cancel Cause Trouble or explicitly prevent Unhinged.

A 0-Trouble Character cannot Cause Trouble, including for the final hit.

### Recovery override and spent Last Straw

A Last Straw may explicitly set/recover its Leader above 0. If so, that Leader is not at Last Straw and loses the universal Last Straw combat benefits unless text says otherwise. The Last Straw remains spent. If that Leader later reaches 0 again, it immediately becomes Unhinged and loses.

Removing a spent Last Straw after it triggered does not retroactively defeat a Leader that remains in normal Last Straw state.

### Multiple thresholds

After a single effect, resolve **all crossed Breaking Points before any Last Straws**. Within a threshold layer use actual order; genuine ties resolve non-active player first.

## 13. Composure recovery

Before Last Straw, a Leader may recover Composure up to **20**. Recovery is valid but should be rare and carry meaningful cost, condition, or tempo sacrifice.

Leaders do not have Health, take Character damage, or heal. Their survival track is Composure.

## 14. Deck exhaustion

There is **no deck-out loss**.

If a player would Draw from an empty deck and their Last Straw has not triggered, the failed Draw triggers Last Straw directly: set that Leader to 0 and resolve Last Straw normally. This special trigger does **not** retroactively trigger Breaking Point.

If that Last Straw has already triggered, a failed Draw simply does nothing. Do not reshuffle the discard.

## 15. Triggers and timing

Triggered abilities happen automatically. Unless text says otherwise, abilities function only while their source is in play.

One player's simultaneous triggers are ordered by that player. Genuine simultaneous ordinary triggers from both players resolve active player's triggers first, then non-active player's, unless a protected threshold rule above gives a different order.

A triggered/Activated ability resolves independently of its source remaining in play unless it requires the source. A card that leaves and re-enters is a new instance with no old damage, temporary bonuses, or use history. “If you do” requires the immediately preceding optional instruction to have happened.

## 16. Current keywords

**Hothead:** This Character may Attack on the Turn it enters play. Attack permission only; it does not allow early Cause Trouble.

**Retaliate:** When this Character survives an Attack, it deals its Attack as damage to the attacking Character.

**Sucker Punch:** This Character may Attack Ready opposing Characters.

**Explosive:** When this Character is Defeated, deal 1 damage to each opposing Character.

**Stubborn:** The first time each Round this Character would be Returned or Dismissed, it remains in play instead.

**Jerry-Rig:** If this Item would go to your discard, you may put it face-up and Rotated into your Stash instead. When used to pay a Cost, discard it.

Legacy keywords/text depending on Carl blocking, universal retaliation, Leader Health, Power/Guard, or Responses are pending the Mordecai card audit and are not base rules merely because stale text remains.

## 17. Leader model

A Leader stays visible outside the deck, begins at 20 Composure, has one automatic passive and one unique printed Breaking Point, does not Attack or have Health, and uses one hidden shared-pool Last Straw chosen during deckbuilding.

Breaking Point belongs to Leader identity. Last Straw is currently a universal shared pool unless text restricts it.

The Mordecai content audit must assign/finalize each Leader's Breaking Point and production Last Straw pool before balance results are authoritative.

## 18. Game end

A player loses when their Leader becomes **Unhinged**.

Normal route:

**20 Composure → Breaking Point at 10 → Last Straw at 0 → one later successful opposing Cause Trouble → Unhinged.**

Do not end in the middle of resolving an Action, ability, protected threshold, combat sequence, or mandatory resulting triggers unless a rule explicitly makes Unhinged immediate. A genuinely simultaneous game-ending state with no more specific resolution uses War. There is no draw.

## 19. Production direction

Core Styles remain Reckless, Momentum, Misdirection, Salvage, Stonewall, and Expendable.

Mordecai 0.4 promotes the eight-deck Composure/STANK environment as current baseline data: six core mono-Style decks plus Crazy Cat Lady and Mad Scientist rulebreaker decks. Their exact construction, cards, Leaders, abilities, and balance are **production content under immediate audit**, not frozen balance claims.

Design order remains:

**irresistible idea → preserve the outrageous part → add meaningful counterplay → tune numbers**

The core is feature-complete for this playtest. Next work is consistency, terminology, cards/decks/abilities, Leader Breaking Points, Last Straws, engine/browser/builder parity, and human playtesting.
