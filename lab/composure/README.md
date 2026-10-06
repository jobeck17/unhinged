# Composure 2.0

**TESTING · October 2026.** Carl 0.3 remains canonical. **Composure 2.0** is the current core-gameplay experiment combining the STANK INDUSTRIES-60 deck state with Attack / Health / Trouble, Breaking Point, and Last Straw.

**Collaborators / fresh ChatGPT sessions:** start with [START_HERE.md](START_HERE.md). Last Straw brainstorming belongs in [LAST_STRAW_IDEAS.md](LAST_STRAW_IDEAS.md).

## Core win condition

Each Leader begins with **20 Composure**. Characters have **Attack / Health / Trouble**. The Character combat stat formerly called **Power** is called **Attack** in Composure 2.0; the durability stat formerly called **Guard** is called **Health**.

- **Attack Character:** Rotate the attacker and attack an opposing Rotated Character using Attack. Sucker Punch and explicit card effects can reach Ready Characters.
- **Cause Trouble:** Rotate a Ready Character that began the Turn under your control. The opposing Leader loses Composure equal to that Character's Trouble.
- **Cause Trouble cannot be Blocked.** It is not an Attack and does not start combat.
- After causing Trouble, that Character is Rotated and exposed to ordinary Attacks.
- **Stay Ready:** make no victory progress now, but remain normally protected from Attack.
- **No Character battlefield cap** in the current human-playtest build.
- **Opening rule:** the first player skips their first Draw. The second player receives **no setup temporary Stash** and Draws normally on their first Turn. This is the current lab rule.

The core Character decision is:

**Fight / Cause Trouble and expose yourself / Stay Ready and protected.**

Power handles fighting. Trouble pressures the win condition.

### Direct Composure loss design guidance

**Cause Trouble through Characters is the primary victory-pressure engine.** Direct Composure loss from Actions, Items, Defeat effects, Leader text, or other sources remains valid design space and can trigger normal Composure thresholds, but it should generally function as **spice, synergy, conditional payoff, or reach**, not as an efficient replacement for engaging with Characters. Direct-loss effects should usually carry a condition, inefficiency, risk, setup requirement, or meaningful deckbuilding cost.

## Leader durability terminology

Leaders do **not** have Health and do not take or heal damage. A Leader's measurable durability / victory track is **Composure**. Effects make Leaders **lose Composure** or **recover Composure**. Damage and healing remain Character concepts tied to Health.

## Breaking Point

**Threshold rule:** Whenever a Leader moves from above 10 Composure to 10 or less for the first time, its Breaking Point triggers regardless of whether Composure was lost, set, or otherwise changed. If one change crosses both Breaking Point and Last Straw, Breaking Point resolves before Last Straw. **Threshold crossings are latched when they occur.** If a Leader crosses Breaking Point or reaches Last Straw during an effect, that threshold event is recorded immediately but waits until the current effect finishes before resolving. A later Composure change within that same resolving effect, including recovery back above the threshold, does not erase the recorded event.

A Leader's first current test threshold is **10 Composure**.

The first time a Leader reaches **10 or less Composure**, that Leader's **Breaking Point** triggers. **10 is universal for every Leader.** Breaking Point triggers only once per game. Every Leader will have a **unique Breaking Point ability**; those individual abilities are intentionally not assigned yet.

**The Breaking Point trigger and its resolution are protected:** normal effects cannot cancel, prevent, or interrupt the Breaking Point itself. Any ordinary cards, Characters, Items, or other game pieces created by the effect become interactable normally after the Breaking Point finishes resolving unless its text says otherwise.

If one effect causes both Leaders to reach Breaking Point, finish that effect first, then resolve the Breaking Points in their actual trigger order. If they were genuinely simultaneous, resolve **the non-active (defending) player's Breaking Point first, followed by the active player's**. After both resolve, the current Turn continues normally.

## Trouble is a universal Character stat

Every Character has a printed **Trouble** value, including **0**. Trouble is a core Character stat alongside Attack and Health. **A Character with 0 Trouble cannot Cause Trouble.** If an effect raises that Character's Trouble to 1 or more, it becomes eligible to Cause Trouble normally. **Trouble is fully modifiable game state:** effects may increase it, reduce it, set it to a value, or grant persistent/temporary modifiers just as card text can modify other Character stats. Positive Trouble modification should be costed carefully because it directly accelerates Leader pressure. **Effective Trouble can never be less than 0.** Reductions that would take Trouble below 0 stop at 0; negative Trouble does not exist.

## Leaders are not attack targets

**Characters cannot Attack Leaders.** An Attack is Character-vs-Character combat and must target an eligible opposing Character. **Cause Trouble** is the normal Character action used to pressure the opposing Leader's Composure. Attack therefore governs Character combat, Health governs Character durability, and Trouble governs Leader pressure.

There is no ordinary Leader-blocking combat step in this model because Leaders are not Attack targets. Defensive Characters protect a Leader indirectly through board control, effects, and pressure on opposing Characters.

**Ready protects a Character from ordinary Attacks only.** Ready Characters may still be targeted and affected by Actions, Items, abilities, damage, damage counters, Rotate effects, Return, Dismiss, Defeat, attachments, and other card effects unless specific text says otherwise. An effect that deals damage or places damage on a Character does not care whether that Character is Ready or Rotated.

## Cause Trouble is not combat

**Cause Trouble cannot be blocked and is not combat.** An eligible Ready Character Rotates to Cause Trouble, and the opposing Leader loses Composure equal to that Character's Trouble. Defensive play must affect the Character, its eligibility, its Trouble, or the resulting Composure loss through other legal effects rather than assigning a combat blocker. Afterward, the Rotated troublemaker is exposed to ordinary Attacks.

## Persistent Character damage

Damage on Characters is **persistent**. Damage remains on a Character until an effect removes/heals it or the Character leaves play. A Character is Defeated immediately when its accumulated damage equals or exceeds its Health. **All damage follows this same rule regardless of source, including Attacks, Actions, Items, abilities, and effects that place damage counters.** If a Character's Health is reduced so that its accumulated damage equals or exceeds its current Health, it is immediately Defeated. Damage that causes a Defeat produces a normal Defeat event. **Effective Health can never be less than 0.** Health reductions that would take it below 0 stop at 0.

## Attack eligibility

By default, a Character may Attack only an opposing **Rotated Character**. Ready Characters are protected from ordinary Attacks. Card text may explicitly override this restriction and allow a Ready Character to be attacked or otherwise change attack eligibility.

This creates the core battlefield choice: **Attack, Cause Trouble, or stay Ready.** Both Attack and Cause Trouble normally Rotate the acting Character, exposing it to ordinary Attacks on the opponent's Turn.

## Hothead and Trouble timing

**Hothead is Attack permission only.** A Character with Hothead may Attack the Turn it enters play, but Hothead does not let it Cause Trouble early. A Character normally must have begun the Turn under its controller's control to Cause Trouble unless an effect explicitly grants permission otherwise.

## Ready effects and repeated actions

There is **no universal once-per-Turn Attack-or-Cause-Trouble cap, and no universal once-per-Turn Cause Trouble limit per Character**. Readiness remains literal: a Ready Character may take a legal action. **Ready effects are responsible for restricting Cause Trouble when repeated Leader pressure is not intended.** When an effect Readies a Character outside the normal Ready step, that effect's own text determines what the Character may or may not do afterward. Example: **“Ready a Character. It cannot Cause Trouble for the rest of this Round.”** This allows Ready effects to be tuned individually rather than imposing a hidden global restriction.

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
6. While a Leader is at Last Straw, the next opposing Character that successfully **Causes Trouble** makes that Leader **Unhinged**. That player loses.

Because Characters with **0 Trouble cannot Cause Trouble**, there is no separate minimum-Trouble exception to teach for the final hit.

### Final Trouble and prevention

Once a Leader is at Last Straw, a successful Cause Trouble does **not** cause ordinary Composure loss. It makes that Leader **Unhinged**. A Character reduced to **0 Trouble** is not eligible to take the Cause Trouble action at all. Because this lab has no universal Response window, Trouble reduction is normally established before the action is taken unless a card explicitly creates an interrupting effect. Effects that only prevent or reduce Composure loss do not stop this final Cause Trouble; an effect must prevent/cancel Cause Trouble itself or explicitly prevent the Leader from becoming Unhinged.

### Character limit exception

A Last Straw ability may explicitly **ignore or exceed the normal Character limit**. Characters put into play this way remain in play even while their controller is above the normal limit. Being above the limit does not force Characters to be removed; it only prevents ordinary additions that do not themselves override the limit.

**Character cap removed for the current test.** Players may control any number of Characters. Earlier five-wide testing did not meaningfully solve snowballing, so the cap is being removed to let human play reveal whether unrestricted boards create an actual readability, space, or gameplay problem. Do not reintroduce a cap without human-playtest evidence that one is useful.

### Composure recovery

- Before Last Straw, a Leader may recover Composure up to the **20 Composure** maximum.
- **Design guidance:** ordinary Composure recovery is valid card/Leader design space, but should be **rare and carry a meaningful cost, condition, or tempo sacrifice**. Whether recovery ultimately belongs primarily to particular Styles is intentionally unresolved and should emerge from design/testing rather than being assigned now.
- Breaking Point triggers **only once per game**, even if that Leader later recovers above 10.
- Once Last Straw has triggered, that Leader normally remains at **0 Composure** and cannot recover Composure. **Explicit Last Straw text may override this rule**, including by setting that Leader's Composure to a new value. The Last Straw remains spent/Rotated and never becomes available again. **If an overriding Last Straw effect puts the Leader above 0, that Leader is normally no longer in the Last Straw state and does not receive the universal Last Straw combat benefits unless the effect explicitly says otherwise. If that Leader later reaches 0 again, that Leader immediately becomes Unhinged and loses.**
- Last Straw triggers only once.

### Universal Last Straw state

While a player's Leader is at Last Straw, **their Characters have Hothead and may Attack opposing Ready Characters**. Hothead remains Attack permission only and does not let a newly entered Character Cause Trouble early. This gives the endangered player immediate tools to fight incoming Trouble threats without accelerating their own win condition.

This universal combat permission is separate from the player's chosen Last Straw effect. The chosen Last Straw provides the one-time comeback event; the universal Last Straw state persists for the rest of the game.

### Shared Last Straw pool

### Breaking Point design

🧪 **TESTING:** Each Leader's **Breaking Point is printed directly on that Leader card** and is part of the Leader's mechanical identity. Breaking Points are not currently a separate deckbuilding choice.

Breaking Point is a one-time threshold trigger, but its effect follows its own card text and may be immediate, delayed, lingering, transformational, conditional, or otherwise modify normal rules. Persistent effects are allowed, but should be used carefully when they create ongoing bookkeeping or memory burden through the rest of the match.

A Leader may recover Composure all the way back to the normal maximum after crossing Breaking Point. **Breaking Point never triggers a second time.** However, a persistent Breaking Point effect may explicitly check current Composure and toggle on/off without retriggering. Example design space: “While your Composure is 10 or less, Draw 2 cards during your regular Draw step.” Recovering above 10 turns that effect off; falling to 10 or less turns it back on.

🧪 **TESTING:** Last Straws are a **universal shared pool** chosen during deckbuilding: for now, any Leader may choose any Last Straw. Natural synergy may make some options sensible only for certain Leaders/decks. Style-specific options remain a possible future extension only if testing gives us a reason to restrict them. The chosen Last Straw begins **face-down under the Leader and remains hidden through Breaking Point**. When that Leader reaches **0 Composure**, reveal and trigger it. This visibility/timing model is specifically pending human-playtest confirmation. When the Leader reaches 0 Composure, **reveal and trigger the Last Straw**, **Rotate the Last Straw card 90°**, and leave it face-up beside the Leader as the visible marker that it has fired and as a reminder for any lingering text. **If a Leader reaches 0 Composure and their Last Straw was removed before it ever triggered, that Leader immediately becomes Unhinged and loses.** Once a Last Straw has triggered, the Leader is already in the normal Last Straw phase at 0 Composure and is finished only by the normal qualifying Cause Trouble rule. Removing the rotated/spent Last Straw afterward does not retroactively cause defeat. Ordinary effects cannot interact with a Last Straw unless they **explicitly refer to a Last Straw**. Explicit Last Straw interaction is valid design space. **Once a Last Straw triggers, its resolution is protected:** it cannot normally be canceled, prevented, or interrupted. Counterplay should happen before the trigger or against the game state/effects it creates afterward. Only future text that explicitly overrides this protection may break that rule. Leader passives and Breaking Points remain Leader-specific. Build an oversized pool first, then cut and balance it. The dedicated working repository for concepts, candidates, cuts, and status is **[LAST_STRAW_IDEAS.md](LAST_STRAW_IDEAS.md)**.

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


## Core-design gate

**Composure 2.0 is feature-complete for the current playtest.** The 40-question core-rules interview is complete. Do not add new foundational mechanics before playtesting unless a blocking implementation contradiction requires resolution. The next phase is rules cleanup, terminology migration, card audit, Leader / Breaking Point / Last Straw design, engine implementation, browser playtest integration, and human playtesting. Playtest evidence may reopen rules.
