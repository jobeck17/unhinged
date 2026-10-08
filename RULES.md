# Unhinged Rules — Mordecai 0.4

**Working production rulebook • 6 October 2026**

Mordecai 0.4 promotes the tested Composure 2.0 core into production and replaces Carl 0.3 as the canonical rules generation. The core-rules design gate is closed for this playtest. Card, deck, Leader, simulator, browser, and terminology audits follow this promotion. Where current card data still contains legacy wording, **this rulebook wins**.

## 1. Core game

Each Leader begins with **20 Composure**. Characters have **Power / Health / Trouble**.

The core Character decision is:

**Attack a Character / Cause Trouble / Stay Ready.**

Power governs Character combat. Health governs Character durability. Trouble pressures the opposing Leader.

Base rules apply to every player. Printed card text may add to, change, or override a base rule. Traits have no inherent rules meaning unless referenced. Keywords mean only what the rules or card text define.

## 2. Objects and zones

Each player has a Deck, Hand, Discard, Play Area, and Stash, plus one **Leader** and one **Last Straw** outside the 40-card deck.

- **Leader:** visible outside the deck and play area; provides deck identity, a passive, a printed Breaking Point ability, and Composure.
- **Last Straw:** begins face-down under its Leader and is not part of the deck.
- **Character:** has Power, Health, and Trouble.
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
| **Power** | A Character’s combat damage stat. |
| **Attack** | The action of attacking another Character. |
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

Normal Stash enters Ready, pays 1 toward a Cost when Rotated, has no printed identity/stats/text while there, and cannot leave unless a rule/effect moves it. Its owner may inspect its identity at any time; opponents may not inspect it unless an effect permits looking. When paying a Cost, choose which Ready Stash cards to Rotate. An exchange preserves each replaced slot’s Ready or Rotated state. Stash count and Ready/Rotated state are public.

Effects may create face-up temporary Stash or otherwise break these rules. Unless text says otherwise, face-up temporary Stash is discarded when spent. Costs may be reduced to 0.

## 7. Playing, attachments, and control

Actions may be played only during your own main Turn, resolve once, and go to discard. **Responses are retired game-wide:** there are no Response cards or voluntary Response windows during another player's Turn or during resolution of an Attack/effect. Automatic triggered abilities still resolve normally. Former Response cards are marked pending redesign and excluded from playtests until they receive a legal effect.

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

The attacker deals damage equal to its Power. There is **no blocking step and no universal retaliation**. If the target leaves before combat damage, the Attack ends and the attacker remains Rotated.

**Retaliate:** When this Character is Attacked, it deals its Power as damage to the attacking Character after the Attack damage resolves, even if it was Defeated by that Attack. Capture its Power before damage resolves. If it leaves play before Attack damage is dealt (for example by Return), it does not Retaliate.

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

**Absorb X:** Damage dealt to this Character is reduced by X, to a minimum of 0. Apply this to each damage event; it is not consumed. If multiple sources grant Absorb, use only the highest value. Absorb does not remove existing damage and does not reduce **Put damage**, Health reduction, or Composure loss. If damage is reduced to 0, no damage is dealt and damage-dealt/taken triggers do not fire. Losing Absorb does not add previously prevented damage.

**Hothead:** This Character may Attack on the Turn it enters play. Attack permission only; it does not allow early Cause Trouble.

**Retaliate:** When Attacked, deal this Character’s Power to the attacker after Attack damage, even if this Character was Defeated by that Attack.

**Sucker Punch:** This Character may Attack Ready opposing Characters.

**Explosive:** When this Character is Defeated, deal 1 damage to each opposing Character.

**Stubborn:** The first time each Round this Character would be Returned or Dismissed, it remains in play instead.

**Jerry-Rig:** If this Item would go to your discard, you may put it face-up and Rotated into your Stash instead. When used to pay a Cost, discard it.

Legacy keywords/text depending on Carl blocking, universal retaliation, Leader Health, Power/Guard, or Responses are pending the Mordecai card audit and are not base rules merely because stale text remains.

## 17. Leader model

A Leader stays visible outside the deck, begins at 20 Composure, has one automatic passive and one unique printed Breaking Point, does not Attack or have Health, and uses one hidden shared-pool Last Straw chosen during deckbuilding.

Breaking Point belongs to Leader identity. Last Straw is currently a universal shared pool unless text restricts it.

The Mordecai content audit must assign/finalize each Leader's Breaking Point and production Last Straw pool before balance results are authoritative.

### Florida Man — current passive

**Whenever one of your Characters Defeats an opposing Character with an Attack, the opposing Leader loses 1 Composure.**

This triggers for each qualifying Defeat, with no once-per-Turn limit. A Defeat caused by an Action, Item, or other non-Attack effect does not qualify. This replaces Florida Man’s historical Adrenaline and damaged-Character Hothead/Sucker Punch/Ready passives. It is ordinary Composure loss and cannot substitute for the final successful Cause Trouble at Last Straw. His Breaking Point is “You Ain’t Seen Nothing Yet!” as specified below. His Attack-only passive is implemented in the production Reckless browser package; other Styles still require their own parity audit.

## 18. Game end

A player loses when their Leader becomes **Unhinged**.

Normal route:

**20 Composure → Breaking Point at 10 → Last Straw at 0 → one later successful opposing Cause Trouble → Unhinged.**

Do not end in the middle of resolving an Action, ability, protected threshold, combat sequence, or mandatory resulting triggers unless a rule explicitly makes Unhinged immediate. A genuinely simultaneous game-ending state with no more specific resolution uses War. There is no draw.

## 19. Production direction

The seven core Styles are Reckless, Momentum, Misdirection, Salvage, Stonewall, Expendable, and Gambler.
Crazy Cat Lady is classified as Momentum. Mad Scientist is classified as Gambler.

Mordecai 0.4 promotes the eight-deck Composure/STANK environment as current baseline data: the six original mono-Style decks plus Crazy Cat Lady (Momentum) and Mad Scientist (Gambler). Their exact construction, cards, Leaders, abilities, and balance are **production content under immediate audit**, not frozen balance claims.

Design order remains:

**irresistible idea → preserve the outrageous part → add meaningful counterplay → tune numbers**

The core is feature-complete for this playtest. Next work is consistency, terminology, cards/decks/abilities, Leader Breaking Points, Last Straws, engine/browser/builder parity, and human playtesting.


## Stonewall audit and threshold content — 8 October 2026

This section supersedes legacy card behavior for the audited Stonewall pool. The 33 locked cards and 40-card coverage deck are in CARDS.json and DECKS.json. The prior conversational count of 32 omitted Bicycle Cop, which was added when Committee moved to Cost 4. Preserve every lock; choose a card to table later if the target remains 32 plus an open 33rd slot. All costs/stats are provisional until cross-style testing.

**Meat Shield** replaces Bodyguard on audited cards. While a Character with Meat Shield is Rotated, opposing Characters that can legally Attack it must choose one of the defender’s legally attackable Rotated Meat Shields before Attacking another Character. Ready Meat Shields do not protect or redirect, even when Sucker Punch makes them attackable. Multiple eligible Meat Shields offer a choice. Meat Shield does not restrict Cause Trouble, Actions, Items, or abilities. When you play any Character with Meat Shield, you may choose to have it enter Ready or Rotated. This choice is part of the keyword and also applies when the Character is played for free. Entering Rotated does not grant early Attack or Cause Trouble permission.

**Absorb X** uses the highest granted value, never adds multiple grants together. “Have Absorb 1” does not mean “Absorb +1.” This applies equally to innate Absorb, Helicopter Mom, Patio Umbrella, and Dig In. Mom protects other friendly Characters only while she is Ready; Umbrella protects its wearer only while Rotated. Dig In applies to your Characters (including those played later) until the start of your next Turn. None reduces Composure loss.

**Ready timing:** A Character Readies only when it changes from Rotated to Ready. Entering Ready or applying Ready to an already Ready Character does not trigger Ready abilities. Grandma heals another chosen friendly Character for up to 2 on any actual Ready transition, including effects; no once-per-Turn limit. Old Dog heals itself for 1 only on an actual transition during its controller’s Ready step. Lawn Chair and Take a Breather Ready a chosen friendly Rotated Character and prohibit that Character from Attacking or Causing Trouble for the rest of the current Turn. Those restrictions apply even if it did not act earlier. Lawn Chair spends 1 Ready Stash and Rotates the Item; Stash payment does not discard a normal Stash card. These effects do not erase entry restrictions.

**Skip next Ready step:** Committee and Not in My Neighborhood prevent automatic Readying during the chosen Character’s controller’s next Ready step. Consume the restriction on that step, then allow later steps normally. This does not prevent a card effect from Readying the Character earlier or during that Turn. A Character already Ready when the skipped step arrives remains Ready; the restriction does not Rotate it.

**Durations:** File a Complaint’s −2 Power expires at the start of its caster’s next Turn. Concerned Citizen’s bonuses from opposing Actions/Items remain through its controller’s next Turn and expire at the end of that Turn. Dig In lasts until the start of its caster’s next Turn. Wait Them Out is playable only before any friendly Attack that Turn and prevents all further friendly Attacks that Turn; Cause Trouble remains permitted.

**HOA Lawyer:** Each active copy adds 1 to the final Cost of an opposing Action that targets one or more of that Lawyer’s controller’s Characters or Items. Multiple copies stack. Apply the tax once per Lawyer per Action, not once per target. Friendly-target-only Actions and untargeted effects such as Category 5 do not pay this tax. Targets and affordability are validated before Stash or cards are spent. Targeted Actions played for free still pay the tax.

**HOA President:** Failure to Respond remains unchanged: beginning in Round 8, your Characters get +1 Trouble.

**Breaking Point — Final Warning:** When an opposing Character Causes Trouble that crosses your Leader from above 10 to 10 or below, you may Dismiss that Character after its Trouble resolves. The Composure loss remains. Dismiss is not Defeat, but leave-play/Dismiss abilities still trigger. Non-Trouble Composure loss triggers/spends Breaking Point without a Dismiss. This is a one-time threshold ability.

**Florida Man Breaking Point — You Ain’t Seen Nothing Yet!:** Roll a visible D6. 1: Rotate a chosen Ready friendly Character. 2–5: Ready a chosen friendly Rotated Character. 6: Ready all your Characters. If there is no eligible Character, resolve the roll without a target effect. Readying does not grant Hothead or early Trouble. Roll, outcome, and history are visible to both players.

Resolve queued Breaking Point abilities after the current effect and before any crossed Last Straw. Crossing both thresholds with one Cause Trouble still allows Final Warning, then reveals Last Straw and ends the current Turn. A later legal Cause Trouble remains necessary for the final win. Empty-deck Last Straw does not retroactively trigger Breaking Point.

**Peace and Quiet:** Restore up to 3 Composure, capped at the Leader’s starting 20, only if your Leader is not at Last Straw. If yours is at Last Straw and the opponent is not, the opponent loses 3 Composure instead. If both are at Last Straw, Draw a card instead. These are exclusive branches. Recovery never resets an already-triggered Breaking Point or Last Straw. Ordinary Composure loss cannot replace the final Cause Trouble.

**Community Founder:** Its other-friendly-Character +1 Trouble aura is active while its controller is currently at 10 or less Composure or Last Straw. Recovery above 10 turns the aura off without resetting the spent Breaking Point. It stacks with Round 8’s passive; multiple Founders also stack. It does not boost itself.

Security Camera shows the full opposing hand only to its controller. The AI does not use that hand outside the reveal choice. Florida Man, HOA President and Birthday Party Magician now have implemented Breaking Points. Remaining Leader Breaking Point abilities and the shared selectable Last Straw effect pool remain pending their own content audits. Simulators are not asserted to have browser parity.


## Misdirection implementation checkpoint — 8 October 2026

Birthday Party Magician’s **The Show Must Go On** Readies one chosen Rotated Stash after the first friendly Character actually returns from play to your hand or is Dismissed during your turn. Return and Dismiss share one use; the first event spends that use even if no Stash is Rotated. Defeat, Sacrifice and discarding from hand do not qualify. **For My Next Trick…** optionally returns a friendly Character, then independently offers a free Character costing 3 or less from hand when Breaking Point first triggers.

**Trap Door** (LAB-MAG-009) optionally captures only the just-Dismissed friendly Character costing 5 or less from your discard while the Item is in play and empty. One actual card can be stored under only one copy. Defeat, Sacrifice, hand discard and return to hand do not qualify. Rotate the Item and spend 1 Stash to play its stored Character for free, triggering entrance abilities. Leaving play discards the stored card to its owner. Owner inspection is allowed; opponents see the stored count, and face-down storage does not erase a previously public card identity. Only **Heckler** gains immediate Trouble permission from being played under an Item; ordinary free deployment does not grant it.

**The Mentalist** plays the revealed opposing-deck Character with separate owner/controller tracking. Entrance effects belong to its controller; it may Attack immediately but cannot Cause Trouble that turn. At the end of the current turn, return that same surviving instance to its owner's hand even if The Mentalist has left. A borrowed card that already left play is not retrieved or resurrected. **Poof!** follows the chosen instance until its next successful Cause Trouble in the current turn, then returns it; unused permission expires at turn end.

The Headliner gets its own once-per-turn +2 Trouble only after seeing another friendly Character actually return to your hand while it is in play. Stagehand triggers on every qualifying return. Volunteer and Party Mom's Power bonuses expire at the end of the current turn. Dove deals normal damage, including Absorb; it never permanently reduces Health.
