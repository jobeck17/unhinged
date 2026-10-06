# Trouble / Last Straw × STANK INDUSTRIES-60 Lab 0.5

**TESTING · October 5, 2026.** Carl 0.3 remains canonical. This lab combines the STANK INDUSTRIES-60 deck state with the new Trouble / Composure / Breaking Point / Last Straw win-condition experiment.

## Core win condition

Each Leader begins with **20 Composure**. Characters have **Power / Guard / Trouble**.

- **Attack Character:** Rotate the attacker and attack an opposing Rotated Character using Power. Sucker Punch and explicit card effects can reach Ready Characters.
- **Cause Trouble:** Rotate a Ready Character that began the Turn under your control. The opposing Leader loses Composure equal to that Character's Trouble.
- **Cause Trouble cannot be Blocked.** It is not an Attack and does not start combat.
- After causing Trouble, that Character is Rotated and exposed to ordinary Attacks.
- **Stay Ready:** make no victory progress now, but remain normally protected from Attack.
- Maximum **five Characters** per player. Items do not count.
- **Opening balance:** the first player skips their first Draw. The second player receives **no setup temporary Stash**.

The core Character decision is:

**Fight / Cause Trouble and expose yourself / Stay Ready and protected.**

Power handles fighting. Trouble pressures the win condition.

## Leader durability terminology

Leaders do **not** have Health and do not take or heal damage. A Leader's measurable durability / victory track is **Composure**. Effects make Leaders **lose Composure** or **recover Composure**. Damage and healing remain Character concepts tied to Guard.

## Breaking Point

A Leader's first current test threshold is **10 Composure**.

The first time a Leader reaches **10 or less Composure**, that Leader's **Breaking Point** triggers. **10 is universal for every Leader.** Breaking Point triggers only once per game. Every Leader will have a **unique Breaking Point ability**; those individual abilities are intentionally not assigned yet.

If one effect causes both Leaders to reach Breaking Point, finish that effect first, then resolve **the active player's Breaking Point followed by the other player's Breaking Point**. After both resolve, the current Turn continues normally.

## Persistent Character damage

Damage on Characters is **persistent**. Damage remains on a Character until an effect removes/heals it or the Character leaves play. A Character is Defeated immediately when its accumulated damage equals or exceeds its Guard.

## Attack eligibility

By default, a Character may Attack only an opposing **Rotated Character**. Ready Characters are protected from ordinary Attacks. Card text may explicitly override this restriction and allow a Ready Character to be attacked or otherwise change attack eligibility.

This creates the core battlefield choice: **Attack, Cause Trouble, or stay Ready.** Both Attack and Cause Trouble normally Rotate the acting Character, exposing it to ordinary Attacks on the opponent's Turn.

## Hothead and Trouble timing

**Hothead is Attack permission only.** A Character with Hothead may Attack the Turn it enters play, but Hothead does not let it Cause Trouble early. A Character normally must have begun the Turn under its controller's control to Cause Trouble unless an effect explicitly grants permission otherwise.

## Ready effects and repeated actions

There is **no universal once-per-Turn Attack-or-Cause-Trouble cap**. Readiness remains literal: a Ready Character may take a legal action. When an effect Readies a Character outside the normal Ready step, that effect's own text determines what the Character may or may not do afterward. Example: **“Ready a Character. It cannot Cause Trouble for the rest of this Round.”** This allows Ready effects to be tuned individually rather than imposing a hidden global restriction.

Existing Ready effects must be audited under Trouble. In particular, effects such as **Hold My Beer**, **Glory Days**, **Floor It!**, and **Gas Station Pills** may need explicit Attack / Cause Trouble restrictions to match their intended role.

## Responses removed

The **Response system is removed from this lab direction**. Cause Trouble and other events do not open Response windows. Interaction should come from board state, proactive Actions/Items, triggered effects, and explicitly designed mechanics rather than a universal off-turn Response framework.

Three legacy lab cards still contain Response text and are **pending redesign during the card audit** rather than receiving placeholder replacements: the combat trick at P019, the attacked-Character return effect at P081, and **Take One for the Team (P169)**. Their current Response wording is not part of the intended ruleset.

## Last Straw

Reaching **0 Composure does not lose the game**.

**Any Composure loss can trigger Breaking Point or Last Straw**, including loss from Cause Trouble, Actions, Items, Defeat triggers, and a Leader's own effects. Only a later successful Cause Trouble can make a Leader at Last Straw Unhinged.

Threshold timing is universal: **finish resolving the current effect completely before resolving Breaking Point or Last Straw.** If one effect causes both Leaders to enter Last Straw, **resolve both Last Straws before the Turn can pass**. Resolve the active player's Last Straw first, then the other player's, then continue through the normal forced end-of-Turn sequence and pass play normally. Breaking Point and Last Straw abilities resolve as protected Leader game events after the triggering effect finishes. They cannot be interrupted.

The first time a Leader reaches 0 Composure:

1. Finish resolving the effect that caused the Composure loss.
2. That Leader enters **Last Straw** permanently for the current test.
3. **Rotate every Character in play.**
4. Trigger that Leader's **Last Straw** hook.
5. **Force the current Turn to its normal end-of-Turn sequence.** Scheduled end-of-Turn effects still resolve and normal cleanup still occurs.
6. After Last Straw has fully resolved and the forced end-of-Turn sequence finishes, **turn order continues normally to the other player**. Last Straw never grants an extra Turn. If Characters put into play by the Last Straw effect remain under their controller's control when that controller's next Turn begins, they are **fully cooled down** for that Turn: they enter Ready unless the effect says otherwise and may take their normal Character action, including Attack or Cause Trouble.
7. A later successful **Cause Trouble** against a Leader already at Last Straw makes that Leader **Unhinged**. That player loses.

The amount of Trouble on the final Cause Trouble does not matter.

### Final Trouble and prevention

Once a Leader is at Last Straw, the final successful Cause Trouble does **not** cause ordinary Composure loss. It makes that Leader **Unhinged**. Effects that only prevent or reduce Composure loss cannot stop this final hit. An effect can stop it only if it explicitly cancels or prevents the Cause Trouble action, or explicitly prevents the Leader from becoming Unhinged.

### Character limit exception

A Last Straw ability may explicitly **ignore or exceed the normal Character limit**. Characters put into play this way remain in play even while their controller is above the normal limit. Being above the limit does not force Characters to be removed; it only prevents ordinary additions that do not themselves override the limit.

The underlying **five-Character limit itself remains TESTING**, not locked. Its value is being judged primarily as a battlefield-scarcity and strategic-slot rule, not as an anti-snowball mechanism.

### Composure recovery

- Before Last Straw, a Leader may recover Composure up to the **20 Composure** maximum.
- Breaking Point triggers **only once per game**, even if that Leader later recovers above 10.
- Once Last Straw has triggered, that Leader remains permanently at **0 Composure** for the rest of the game and cannot recover Composure.
- Last Straw triggers only once.

**Leader-specific Last Straw effects are intentionally pending design.** The engine currently announces the hook but gives no generic payoff. One candidate discussed for a future Leader is an extreme comeback effect that draws cards equal to the opponent's remaining Composure and puts Characters drawn that way into play. It is an idea, not a universal rule and not yet assigned to a Leader.

### Open Last Straw rules

The interview must decide, among other things:


The current engine uses the simplest provisional behavior where necessary so the state machine can be exercised. These open points are **not locked rules**.

## STANK INDUSTRIES-60 merge

The browser contains **eight 40-card decks**: the six Carl mono-Style decks plus Landon's active **Crazy Cat Lady** and **Mad Scientist** rulebreaker decks.

STANK 60 changes carried into this lab include:

- **Florida Man:** Ooh, That's Gonna Leave a Mark! Adrenaline passive; Broken Lawnmower; revised Gas Station Daredevil; revised Hold My Beer; A MILLION KILOGRAMS OF CAFFEINE!!!!; Rusty Needle.
- **Birthday Party Magician:** Very Enthusiastic Volunteer; corrected Rabbit enter/leave Draw behavior; Ethan’s JUST Being Dramatic; Birthday Boy Stash/hand swap; reworked Lady Who's Moving Out Again; School Bully cleanup; Magician's Hat.
- **Crazy Cat Lady:** Landon's current colony list and Cat package.
- **Mad Scientist:** five-charge protected battery, Parts/Experiments, Abominations and Specimens.
- **Combat rule:** there is **no universal retaliation**. **Retaliate** is a dedicated keyword: *When this Character survives an Attack, it deals its Power as damage to the attacking Character.* A Character Defeated by the Attack does not Retaliate unless an effect explicitly says otherwise. Backyard Wrestler's Wrestlers currently use this keyword as part of their identity.
- **Playtest UX:** Attack target selection can be backed out of before the Attack commits.

## Important experimental collision

The no-universal-retaliation direction is locked for this lab. Retaliation exists only when a keyword or effect explicitly grants it.

Carl 0.3 remains canonical. Do not promote this lab until the rules interview, card/deck audit, simulations, and human testing have resolved the affected systems.
