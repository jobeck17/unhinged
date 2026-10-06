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

## Breaking Point

A Leader's first current test threshold is **10 Composure**.

The first time a Leader reaches **10 or less Composure**, that Leader's **Breaking Point** triggers. **10 is universal for every Leader.** Breaking Point triggers only once per game. Every Leader will have a **unique Breaking Point ability**; those individual abilities are intentionally not assigned yet.

## Last Straw

Reaching **0 Composure does not lose the game**.

Threshold timing is universal: **finish resolving the current effect completely before resolving Breaking Point or Last Straw.** Breaking Point and Last Straw abilities are protected Leader game events and **do not open a Response window**. Normal interaction resumes after the threshold event finishes.

The first time a Leader reaches 0 Composure:

1. Finish resolving the effect that caused the Composure loss.
2. That Leader enters **Last Straw** permanently for the current test.
3. **Rotate every Character in play.**
4. Trigger that Leader's **Last Straw** hook.
5. **Force the current Turn to its normal end-of-Turn sequence.** Scheduled end-of-Turn effects still resolve and normal cleanup still occurs.
6. The endangered player receives the next normal Turn.
7. A later successful **Cause Trouble** against a Leader already at Last Straw makes that Leader **Unhinged**. That player loses.

The amount of Trouble on the final Cause Trouble does not matter.

### Composure recovery

- Before Last Straw, a Leader may recover Composure up to the **20 Composure** maximum.
- Breaking Point triggers **only once per game**, even if that Leader later recovers above 10.
- Once Last Straw has triggered, that Leader remains permanently at **0 Composure** for the rest of the game and cannot recover Composure.
- Last Straw triggers only once.

**Leader-specific Last Straw effects are intentionally pending design.** The engine currently announces the hook but gives no generic payoff. One candidate discussed for a future Leader is an extreme comeback effect that draws cards equal to the opponent's remaining Composure and puts Characters drawn that way into play. It is an idea, not a universal rule and not yet assigned to a Leader.

### Open Last Straw rules

The interview must decide, among other things:

- whether non-Trouble Composure loss can trigger Last Straw and how self-inflicted Composure loss behaves;
- whether newly created Characters from a Last Straw effect may Cause Trouble on the granted comeback Turn;
- whether Last Straw effects may exceed the five-Character limit when their text says so;

The current engine uses the simplest provisional behavior where necessary so the state machine can be exercised. These open points are **not locked rules**.

## STANK INDUSTRIES-60 merge

The browser contains **eight 40-card decks**: the six Carl mono-Style decks plus Landon's active **Crazy Cat Lady** and **Mad Scientist** rulebreaker decks.

STANK 60 changes carried into this lab include:

- **Florida Man:** Ooh, That's Gonna Leave a Mark! Adrenaline passive; Broken Lawnmower; revised Gas Station Daredevil; revised Hold My Beer; A MILLION KILOGRAMS OF CAFFEINE!!!!; Rusty Needle.
- **Birthday Party Magician:** Very Enthusiastic Volunteer; corrected Rabbit enter/leave Draw behavior; Ethan’s JUST Being Dramatic; Birthday Boy Stash/hand swap; reworked Lady Who's Moving Out Again; School Bully cleanup; Magician's Hat.
- **Crazy Cat Lady:** Landon's current colony list and Cat package.
- **Mad Scientist:** five-charge protected battery, Parts/Experiments, Abominations and Specimens.
- **Combat experiment:** no universal retaliation. Backyard Wrestler's Wrestlers retain **Retaliate** when they survive an Attack.
- **Playtest UX:** Attack target selection can be backed out of before the Attack commits.

## Important experimental collision

STANK's no-retaliation test remains active. That is separable from Trouble / Last Straw and should be judged independently.

Carl 0.3 remains canonical. Do not promote this lab until the rules interview, card/deck audit, simulations, and human testing have resolved the affected systems.
