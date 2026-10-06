# Composure 2.0

**TESTING · October 2026.** Carl 0.3 remains canonical. **Composure 2.0** is the current core-gameplay experiment combining the STANK INDUSTRIES-60 deck state with Power / Guard / Trouble, Breaking Point, and Last Straw.

**Collaborators / fresh ChatGPT sessions:** start with [START_HERE.md](START_HERE.md). Last Straw brainstorming belongs in [LAST_STRAW_IDEAS.md](LAST_STRAW_IDEAS.md).

## Core win condition

Each Leader begins with **20 Composure**. Characters have **Power / Guard / Trouble**.

- **Attack Character:** Rotate the attacker and attack an opposing Rotated Character using Power. Sucker Punch and explicit card effects can reach Ready Characters.
- **Cause Trouble:** Rotate a Ready Character that began the Turn under your control. The opposing Leader loses Composure equal to that Character's Trouble.
- **Cause Trouble cannot be Blocked.** It is not an Attack and does not start combat.
- After causing Trouble, that Character is Rotated and exposed to ordinary Attacks.
- **Stay Ready:** make no victory progress now, but remain normally protected from Attack.
- Maximum **five Characters** per player. Items do not count.
- **Opening rule:** the first player skips their first Draw. The second player receives **no setup temporary Stash** and Draws normally on their first Turn. This is the current lab rule.

The core Character decision is:

**Fight / Cause Trouble and expose yourself / Stay Ready and protected.**

Power handles fighting. Trouble pressures the win condition.

## Leader durability terminology

Leaders do **not** have Health and do not take or heal damage. A Leader's measurable durability / victory track is **Composure**. Effects make Leaders **lose Composure** or **recover Composure**. Damage and healing remain Character concepts tied to Guard.

## Breaking Point

A Leader's first current test threshold is **10 Composure**.

The first time a Leader reaches **10 or less Composure**, that Leader's **Breaking Point** triggers. **10 is universal for every Leader.** Breaking Point triggers only once per game. Every Leader will have a **unique Breaking Point ability**; those individual abilities are intentionally not assigned yet.

If one effect causes both Leaders to reach Breaking Point, finish that effect first, then resolve the Breaking Points in their actual trigger order. If they were genuinely simultaneous, resolve **the non-active (defending) player's Breaking Point first, followed by the active player's**. After both resolve, the current Turn continues normally.

## Trouble is a universal Character stat

Every Character has a printed **Trouble** value, including **0**. Trouble is a core Character stat alongside Power and Guard. A Character with 0 Trouble may still take the Cause Trouble action; absent another effect or modifier, it causes 0 Composure loss. This preserves Cause Trouble triggers and effects without creating a hidden eligibility rule for 0-Trouble Characters.

## Leaders are not attack targets

**Characters cannot Attack Leaders.** An Attack is Character-vs-Character combat and must target an eligible opposing Character. **Cause Trouble** is the normal Character action used to pressure the opposing Leader's Composure. Power therefore governs Character combat, Guard governs Character durability, and Trouble governs Leader pressure.

There is no ordinary Leader-blocking combat step in this model because Leaders are not Attack targets. Defensive Characters protect a Leader indirectly through board control, effects, and pressure on opposing Characters.

## Cause Trouble is not combat

**Cause Trouble cannot be blocked and is not combat.** An eligible Ready Character Rotates to Cause Trouble, and the opposing Leader loses Composure equal to that Character's Trouble. Defensive play must affect the Character, its eligibility, its Trouble, or the resulting Composure loss through other legal effects rather than assigning a combat blocker. Afterward, the Rotated troublemaker is exposed to ordinary Attacks.

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

Threshold timing is universal: **finish resolving the current effect completely before resolving Breaking Point or Last Straw.** If one effect causes both Leaders to enter Last Straw, **resolve both Last Straws before the Turn can pass**. Resolve Last Straws in their actual trigger order. If they were genuinely simultaneous, resolve the non-active (defending) player's Last Straw first, then the active player's, then continue through the normal forced end-of-Turn sequence and pass play normally. Breaking Point and Last Straw abilities resolve as protected Leader game events after the triggering effect finishes. They cannot be interrupted.

If one resolved Composure-loss effect crosses both Breaking Point and Last Straw for the same Leader, resolve that Leader's **Breaking Point first, then Last Straw**. Both occur after the triggering effect has completely resolved. The deck-exhaustion rule is an explicit exception: a failed Draw from an empty deck triggers Last Straw directly and does not retroactively trigger Breaking Point.
If one effect causes multiple Leaders to cross **both** thresholds, resolve **all crossed Breaking Points before any Last Straws**. Within each threshold layer, use actual trigger order when distinguishable; if genuinely simultaneous, the non-active (defending) player resolves first.

The first time a Leader reaches 0 Composure:

1. Finish resolving the effect that caused the Composure loss.
2. That Leader enters **Last Straw** permanently for the current test.
3. Resolve that player's chosen **Last Straw** effect. Last Straws are currently being tested as a **shared, face-up deckbuilding choice** rather than a Leader-specific ability. Entering Last Straw does **not** universally Rotate Characters or otherwise reset the battlefield unless the chosen Last Straw says so.
4. **Force the current Turn to its normal end-of-Turn sequence.** Scheduled end-of-Turn effects still resolve and normal cleanup still occurs.
5. After Last Straw has fully resolved and the forced end-of-Turn sequence finishes, **turn order continues normally to the other player**. Last Straw never grants an extra Turn. If Characters put into play by the Last Straw effect remain under their controller's control when that controller's next Turn begins, they are **fully cooled down** for that Turn: they enter Ready unless the effect says otherwise and may take their normal Character action, including Attack or Cause Trouble.
6. A later successful **Cause Trouble** by a Character with **1 or more Trouble** against a Leader already at Last Straw makes that Leader **Unhinged**. That player loses.

A Character with **0 Trouble** may still Cause Trouble and resolve any relevant triggers, but it cannot make a Leader at Last Straw Unhinged.

### Final Trouble and prevention

Once a Leader is at Last Straw, a successful Cause Trouble by a Character with **1 or more Trouble** does **not** cause ordinary Composure loss. It makes that Leader **Unhinged**. If that Character has been reduced to **0 Trouble** when it Causes Trouble, it cannot deliver the Unhinged finish. Because this lab has no universal Response window, Trouble reduction is normally established before the Cause Trouble action is taken unless a card explicitly creates an interrupting effect. Effects that only prevent or reduce Composure loss do not stop a final Cause Trouble that still has at least 1 Trouble. An effect may also stop the finish by explicitly canceling or preventing Cause Trouble, or explicitly preventing the Leader from becoming Unhinged.

### Character limit exception

A Last Straw ability may explicitly **ignore or exceed the normal Character limit**. Characters put into play this way remain in play even while their controller is above the normal limit. Being above the limit does not force Characters to be removed; it only prevents ordinary additions that do not themselves override the limit.

For the current test, the normal battlefield limit remains **5 Characters**. This is being retained provisionally as a battlefield-space and slot-management mechanic, **not** as an anti-snowball fix. If a player controls 5 Characters, ordinary play cannot add another unless an effect explicitly overrides the limit. The five-Character rule remains TESTING and may be removed if human play does not justify the added spatial constraint.

The underlying **five-Character limit itself remains TESTING**, not locked. Its value is being judged primarily as a battlefield-scarcity and strategic-slot rule, not as an anti-snowball mechanism.

### Composure recovery

- Before Last Straw, a Leader may recover Composure up to the **20 Composure** maximum.
- Breaking Point triggers **only once per game**, even if that Leader later recovers above 10.
- Once Last Straw has triggered, that Leader remains permanently at **0 Composure** for the rest of the game and cannot recover Composure.
- Last Straw triggers only once.

### Universal Last Straw state

While a player's Leader is at Last Straw, **their Characters have Hothead and may Attack opposing Ready Characters**. Hothead remains Attack permission only and does not let a newly entered Character Cause Trouble early. This gives the endangered player immediate tools to fight incoming Trouble threats without accelerating their own win condition.

This universal combat permission is separate from the player's chosen Last Straw effect. The chosen Last Straw provides the one-time comeback event; the universal Last Straw state persists for the rest of the game.

### Shared Last Straw pool

🧪 **TESTING:** Last Straws are being explored as a shared pool chosen during deckbuilding. The chosen Last Straw begins **face-down under the Leader**. When that Leader reaches **Breaking Point**, reveal the Last Straw and keep it face-up. When that Leader reaches **0 Composure**, trigger it. This visibility/timing model is specifically pending human-playtest confirmation. Leader passives and Breaking Points remain Leader-specific. Build an oversized pool first, then cut and balance it. The dedicated working repository for concepts, candidates, cuts, and status is **[LAST_STRAW_IDEAS.md](LAST_STRAW_IDEAS.md)**.

### Deck exhaustion and Last Straw

There is **no deck-out loss** in this lab. If a player would Draw from an empty deck and their Leader has not entered Last Straw, that failed Draw **triggers Last Straw directly**. Set that Leader's Composure to 0 and resolve Last Straw using the normal Last Straw timing. This does not count as Composure loss and does not retroactively trigger Breaking Point.

If a player would Draw from an empty deck while their Leader is already at Last Straw, that Draw simply does nothing. Do not reshuffle the discard pile. Emptying a deck can therefore force Last Straw, but only a later successful **Cause Trouble** can make that Leader Unhinged and lose the game.

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
