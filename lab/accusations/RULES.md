# UNHINGED: ACCUSATIONS LAB
**Standalone Accusations prototype • TESTING rules checkpoint, 30 October 2026**

This document is the rules authority for the standalone Accusations Lab only; it does not change production Unhinged. The **30 October movement/readiness checkpoint** below records mutually agreed TESTING defaults. **The browser playtests still implement the earlier movement rules and automatic Scenario checks**; they are not yet rules-parity builds. Sections 8–9 remain the existing automatic-resolution baseline while direct Scenario attacks are an OPEN design question. No external rules, cards, decks, or documents apply to this prototype.

## 1. Objective and components
Two players compete to be the first to **5 Verdict points** by successfully prosecuting their own ridiculous Scenarios. Leaders cannot be attacked and have no health. Characters have only Power and Health. There is no other victory track.

Each player needs one Leader, a **40-card Main Deck** (Characters, Actions, Items), a **10-card Scenario Deck**, a discard area for each deck, a face-down Stash resource row, damage counters, and a way to record Verdict points. Three shared Scenario slots are available.

## 2. Card types and vocabulary
- **Leader:** face-up identity outside either deck; grants a passive ability.
- **Character:** cost, Power/Health, optional ability; stays in play until defeated or moved.
- **Item:** cost and ability; stays in play, attached to a friendly Character if it says Attach.
- **Action:** cost and one-time effect; resolve then discard.
- **Scenario:** cost, printed special rule and possibly alternate resolution condition. A Scenario is owned and prosecuted by its controller; opponents contest it. Every successful Scenario scores exactly **1 Verdict**, then is dismissed.
- **Ready:** upright, available. **Rotate:** turn sideways to exhaust. **Ready** again at start of your turn.
- **Commit:** put a Character at an existing Scenario, either by moving a **Ready** Character from Home or by playing a new Character directly to that Scenario. **Committing does not Rotate the Character.** The Character counts as supporting or contesting immediately. Playing directly to a Scenario is mechanically equivalent to entering Home and committing, without needing two physical placements. Each Character occupies only one place at a time.
- **File:** establish a new Scenario by **Rotating** the Ready Character(s) contributing toward its cost; filing Characters move to that Scenario **Rotated**. Filing and ordinary commitment have different costs.
- **Withdraw/Transfer:** a Character committed to a Scenario cannot voluntarily leave or transfer while that Scenario is in play. Card effects may move it. When the Scenario leaves play, all surviving Characters there return Home without readying or healing; they retain damage, rotation, and attachments.
- **Supporting:** your Characters at your Scenario. **Contesting:** opposing Characters at your Scenario. Characters at another Scenario cannot fight here.
- **Defeat:** put a Character in its owner's Main discard. **Dismiss:** move a Scenario to its owner's Scenario discard, or an Item to its owner's Main discard. **Return:** move to owner's hand. **Draw:** take the top card of the named deck.
- **Damage:** persists on Characters until healed or they leave play. Damage equal to or greater than Health defeats immediately.
- **This turn** ends at the end of the current player's turn. **Round** means both players have taken one turn.

## 3. Deck construction
Choose one Leader and its named Style. The Main Deck has exactly 40 cards, all from the chosen Style's sample card list below, at most 4 copies of any named card. The Scenario Deck has exactly 10 Scenario cards from that Style's sample list, at most 4 copies of each named Scenario. These are two separate shuffled decks and may never be mixed. Scenario cards never enter the Stash. A card that searches a Scenario Deck may look at it, take the specified card, then shuffle it. **Universal precedence:** Card text overrides a general rule wherever it explicitly changes that rule. Do not repeat “unless card text says otherwise” under each default. All other general rules still apply.

For this first prototype, use either of the two complete starter lists in section 12. Players may tune quantities using the same card pool.

## 4. Setup
1. Reveal Leaders. Shuffle Main and Scenario Decks separately.
2. Each player draws **5 Main cards and 2 Scenario cards**. Each player may once put any number of those cards on the bottom of their respective decks and draw the same number from those decks, then shuffle each deck.
3. Randomly choose first player. Both begin at 0 Verdict and 0 Stash. No Characters or Items begin in play.
4. **TESTING draw economy:** The first player draws **1 Main card** on their first turn (after mulligan); on every other turn, players draw **2 Main cards**. Neither player draws a Scenario automatically at turn start. This is a provisional pacing change and may return to 1 Main draw after card-effect testing.

## 5. Turn structure
**Start:** (1) Ready all your Characters, Items, and Stash; (2) draw **2 Main cards** (only **1** on the first player's first turn); (3) resolve start-of-turn Scenario checks, in an order chosen by active player (see section 8); (4) resolve other start-of-turn effects.

**Main:** In any order, you may:
- Once per turn put one Main card from hand face-down into Stash, Ready.
- Play Main Deck cards by rotating Ready Stash equal to their cost; costs cannot be negative. Rotated Stash becomes Ready on your next turn. Scenarios use the filing rule below instead.
- **Commit:** Move a **Ready** Character from Home to an existing Scenario (yours or an opponent's) **without Rotating it**; alternatively, play a Character directly from hand to that Scenario by paying its Main Deck cost. Newly played Characters may commit immediately and enter Ready, but are not eligible to attack or activate ordinary Rotate abilities on their entry turn. An established Character that commits remains Ready and **may attack at that Scenario on the same turn**. Committed Characters cannot voluntarily withdraw or move between Scenarios while the Scenario remains in play. Each Character may voluntarily commit only once per turn.
- Attack with each eligible Ready Character, rotating it to attack. A readied Character may attack again if otherwise eligible.
- **File an Accusation:** Play at most **one Scenario per turn** into an empty shared slot if you have fewer than **two** active Scenarios. **Rotate** one or more Ready Characters at Home to pay the filing cost; each contributes its **printed Main Deck cost** toward the Scenario's printed cost. You may also rotate any number of Ready Stash cards, each contributing 1. The total must be at least the Scenario's cost (excess is wasted), and **at least one Character must contribute**. Filing Characters immediately move to the new Scenario **Rotated**, respecting the three-Character-per-player limit. A Character played this turn may file immediately (you may place it directly at the newly filed Scenario as a tabletop shortcut, but it counts as having entered Home and then filed). Filing is **not** ordinary commitment: it consumes the filing Characters' Ready state. They Ready normally at the start of their controller's next turn; whether they should instead remain Rotated for the entire Scenario is **OPEN**, not a current rule. Scenarios cannot be paid for using Stash alone.
- Voluntarily **abandon** one of your active Scenarios once per turn, dismissing it without reward. This still triggers replacement draw (section 8), but never grants the defender a reward.

**End:** Resolve end-of-turn effects, remove until-end-of-turn modifiers, then pass.

Players may play Actions and activate abilities only on their own turns. There are no response windows; automatic triggers still occur.

## 6. Stash and hand economy
Every facedown Stash card produces 1 resource when rotated; its identity and other text are inactive. Stash cards cannot be used as Characters or drawn back unless an effect explicitly says so. There is no hand limit. Main Deck draw from an empty Main Deck fails harmlessly. Scenario Deck draw from an empty Scenario Deck fails; see section 9 for recycling.

## 7. Position and combat
Characters enter play **Ready**, with no damage. By default they enter **Home**, but may instead be played **directly to an existing Scenario** at normal cost. This direct placement is equivalent to entering Home and immediately committing; it triggers applicable entry and commitment effects and **does not Rotate** the Character. A Character may also be played to Home and committed later. Each Character is either at Home or at one Scenario.

**Entry-turn permissions:** A newly played Character may be played to Home or an existing Scenario, may commit, may count toward supporting/contesting, may trigger passive/entry/commitment abilities, and **may Rotate to file a new Scenario**. It **cannot attack or activate an ordinary ability with a Rotate cost on the turn it enters**, regardless of whether it is still Ready. Card-text exceptions (such as Hothead for attacking) take precedence. Filing is the specific permitted entry-turn Rotate cost; it does not grant permission to use unrelated Rotate abilities.

**Established Characters:** A Ready Character already in play at the start of your turn may voluntarily commit from Home to a Scenario **without Rotating**, then attack that turn. A Character must be Ready to voluntarily commit and normally cannot voluntarily leave or transfer while committed. Home Characters cannot attack or be attacked by ordinary attacks. At a Scenario, a Character may attack an opposing Character **regardless of whether the target is Ready or Rotated**. Rotate the attacker. **Both Characters deal combat damage equal to their Power simultaneously**, regardless of defender rotation. Apply damage reduction separately, then defeat any Character whose accumulated damage meets its Health (both can be defeated). Defending does not Rotate the defender. **There is no blocking or leader attack** in this baseline; direct attacks on Scenarios are still an **OPEN** experiment, not implemented by these movement changes. Damage persists. Movement by card effects does not inherently Ready or heal a Character.

At most **three Characters per player per Scenario** may be committed. If an effect would move a fourth, that move fails. Attachments follow their Character when it moves; when that Character leaves play, attached Items go to their owners' Main discards. An Item without Attach stays in its owner's Home area and functions globally unless its text specifies a location.

## 8. Scenario life cycle
There are exactly **three shared slots**. At most two active Scenarios may belong to the same player. Scenarios do not have Health or damage; their special rules determine how they can be defended.

**Default success check:** At the **start of the prosecuting player's turn**, after readying and drawing, if their Scenario has at least one supporting Character and **zero contesting Characters**, it succeeds: score 1 Verdict, resolve its success effect, dismiss it.

**Default failure check:** At that same start-of-turn check, if a Scenario has **zero supporting Characters**, it fails: dismiss it with no Verdict, even if there are no contesting Characters. Otherwise it remains active. A Scenario is not checked immediately when a Character is defeated or moves, unless card text says so. A newly played Scenario cannot resolve before the opposing player has had a turn to answer it.

**Successful defense:** If a Scenario fails at its check and the defending player has at least one contesting Character there, the defending player **draws 1 Main card**. If the prosecutor has no supporting Characters but the defender has none there either, it fails without a defense reward. Abandoned Scenarios never give rewards.

**Replacement:** Whenever one of your Scenarios succeeds, fails, or is abandoned, immediately draw **1 Scenario** from your Scenario Deck after moving the old card to its Scenario discard. If a replacement draw cannot happen, use section 9.

**Timing:** The prosecuting player chooses the order of simultaneous checks of their own Scenarios. Each check completes, including points, triggers, and replacement draw, before the next. If a player reaches 5 Verdict, the game ends immediately. An opponent's Scenario is never checked on your turn except when its printed text expressly says so.

**Special rules:** Printed Scenario text can alter contest requirements, support requirements, combat at that Scenario, or its resolution window. If text says “instead,” replace the specified default check; all other default rules still apply. A Scenario cannot score more than 1 Verdict, even if multiple success conditions are met.

## 9. Scenario exhaustion and stalled games
If you must draw a Scenario and your Scenario Deck is empty, shuffle your Scenario discard into a new Scenario Deck, then draw. This includes the just-dismissed Scenario. Active Scenarios never enter the shuffled pile. If both Scenario Deck and Scenario discard are empty, that draw fails. If both players take **three consecutive full rounds without any Scenario entering or leaving play**, at the end of the third round each player must abandon their oldest active Scenario, if any; no reward is granted, and replacements are drawn. Reset this counter whenever a Scenario enters or leaves play. There is no automatic point award for stalemates.

## 10. Leaders and keywords
**HOA President (Stonewall):** Once each of your turns, the first time you commit a Character to defend an opponent's Scenario, that Character gets +1 Health until the end of your next turn.
**Florida Man (Reckless):** Once each of your turns, after one of your Characters defeats an opposing Character at a Scenario, you may move one other Character you control from Home to that Scenario, respecting the three-Character limit.

**Hothead:** May attack on the turn it enters.
**Absorb 1:** Reduce each instance of damage dealt to this Character by 1, minimum 0.
**Sucker Punch:** Once per turn this Character may attack an opposing Character at a different Scenario; it remains at its current location. It cannot attack Home Characters.
**Ready:** Turn a Rotated card upright.
**Heal N:** Remove up to N damage from a Character.

## 11. Complete prototype card library
Each entry is **Name | Cost | Power/Health if Character | text**. A dash means no additional ability. All card text is literal. Unless otherwise stated, “a Character” means a Character in play, “friendly” means yours, and “opposing” means controlled by the opponent.

### Stonewall Main cards
- **Old Guy** | Character 1 | 1/3 | Absorb 1 while defending an opposing Scenario.
- **Helicopter Parent** | Character 2 | 2/3 | When committed to defend, give another friendly Character at that Scenario +1 Health until end of turn.
- **Marine** | Character 3 | 3/4 | When defending against an attack, deals +1 combat damage.
- **Grandma** | Character 3 | 1/5 | At start of your turn, heal 1 damage from a friendly Character at her Scenario.
- **Neighborhood Watch** | Character 2 | 2/2 | When entering, you may commit it to an opposing Scenario.
- **Board Member** | Character 4 | 3/5 | While supporting your Scenario, opponents cannot move your other supporting Characters with Actions.
- **Violation Notice** | Action 1 | Deal 2 damage to an opposing Character at a Scenario where you have a Character.
- **Objection!** | Action 2 | Return a friendly Character at a Scenario to your hand; draw 1 Main card.
- **Photographic Evidence** | Item 2 | Attach to a friendly Character. That Character gets +1 Power while supporting a Scenario.
- **Clipboard** | Item 1 | Attach to a friendly Character. That Character gets +1 Health.
- **Emergency Meeting** | Action 3 | Ready up to two friendly Characters at the same Scenario; they cannot attack again this turn.
- **Neighborhood Petition** | Action 2 | Search your Scenario Deck for a Scenario, reveal it, put it in hand, then shuffle that deck. (If none, shuffle only.)

### Reckless Main cards
- **Boogie Boarder** | Character 1 | 1/2 | When defeated at a Scenario, draw 1 Main card.
- **Gator Wrangler** | Character 2 | 3/2 | —.
- **Spring Break Frat Bro** | Character 3 | 4/2 | Hothead.
- **Amateur Storm Chaser** | Character 2 | 2/2 | When committed to your Scenario, gets +1 Power this turn.
- **Hurricane Holdout** | Character 3 | 2/4 | Gets +1 Power for each damage counter on it.
- **Lifeguard** | Character 2 | 1/4 | Absorb 1.
- **Beach Bar Loudmouth** | Character 4 | 4/3 | When defeated at a Scenario, deal 2 damage to an opposing Character there.
- **Hold My Beer** | Action 1 | A friendly Character at a Scenario gets +2 Power this turn and takes 1 damage.
- **Walk It Off** | Action 2 | Heal 2 damage from a friendly Character; draw 1 Main card.
- **Bolt Cutters** | Action 2 | Dismiss an Item attached to a Character at a Scenario where you have a Character.
- **Truck Nuts** | Item 1 | Attach to a friendly Character. It gets +1 Power.
- **Did You See That?!** | Action 2 | After you have defeated an opposing Character at a Scenario this turn, draw 2 Main cards.
- **Watch This!** | Action 3 | A friendly Character at a Scenario gets Hothead and +2 Power this turn; it takes 2 damage after its next attack this turn.

### Stonewall Scenarios
- **Your Christmas Lights Are Still Up in March!** | Scenario 2 | Opponent must have **at least two contesting Characters** here to prevent your default success check; with only one, you still succeed if you have a supporter. Default failure still applies.
- **Your Grass Is 0.3 Inches Too Tall!** | Scenario 1 | Supporting Characters get -1 Power (minimum 0). When this succeeds, draw 1 Main card.
- **Unauthorized Lawn Flamingo!** | Scenario 3 | Your supporting Characters here get +1 Health. When this succeeds, opponent dismisses an Item they control, if able.
- **That's Not Up to Code!** | Scenario 4 | Attached Items on your supporting Characters here cannot be dismissed by opposing Actions. **Instead of the default success check**, succeed at the start of your turn if you have a supporting Character with an attached Item and no contesting Characters. Otherwise remain active unless default failure applies.
- **You Parked on the Wrong Side of the Street!** | Scenario 2 | When an opponent commits a Character here, that Character rotates. Default success and failure apply.

### Reckless Scenarios
- **There's a Gator in My Pool!** | Scenario 3 | Whenever a Character is defeated here, its controller may immediately commit one of their Home Characters here, respecting capacity. When this succeeds, draw 1 Main card.
- **That's Definitely Not Street Legal!** | Scenario 2 | Characters here with Power 4 or more get -1 Health. When this succeeds, ready one of your Stash cards.
- **Hold My Beer, This Is a Shortcut!** | Scenario 1 | Your supporting Characters here get +1 Power and -1 Health. Default success and failure apply.
- **The Neighbors Called the Cops Again!** | Scenario 4 | Opposing Characters committed here enter Rotated. When this succeeds, return an opposing Character from another Scenario to its owner's Home (not hand), if possible.
- **I Can Explain the Fireworks!** | Scenario 3 | At the start of your turn, **instead of the default success check**, succeed if you have at least two supporting Characters here and no contesting Characters. Otherwise remain active unless default failure applies. When this succeeds, deal 2 damage to an opposing Character at another Scenario, if any.

### Interpretation notes for all cards
Health modifiers can cause immediate defeat if accumulated damage meets the new Health. A Character that returns to hand loses damage and temporary modifiers. An effect that says “commit” must obey capacity but does not consume the Character's normal once-per-turn voluntary commit allowance; forced moves do not use that voluntary allowance. An effect that specifically Rotates a Character when it commits still does so: for example, **You Parked on the Wrong Side of the Street!** and **The Neighbors Called the Cops Again!** are deliberate exceptions to the no-Rotate-on-commit default. **Neighborhood Watch's** current entry/commitment text is largely redundant under direct deployment and needs a later card-text audit; preserve its printed text until that audit. For “first time” Leader passives, track use per turn. A Scenario's own continuous ability ends when it leaves play. A Scenario's “when this succeeds” effect resolves after scoring and before dismissal. Items with Attach cannot be played unless you control a legal Character; attached Items remain Ready or Rotated independently of the host.

## 12. Complete starter decklists
The numbers below are copies. Each Main list totals 40; each Scenario list totals 10.

### HOA President — Stonewall
**Main:** Old Guy ×4; Helicopter Parent ×4; Marine ×4; Grandma ×3; Neighborhood Watch ×4; Board Member ×2; Violation Notice ×4; Objection! ×3; Photographic Evidence ×3; Clipboard ×3; Emergency Meeting ×2; Neighborhood Petition ×4. **Total 40.**
**Scenarios:** Your Christmas Lights Are Still Up in March! ×3; Your Grass Is 0.3 Inches Too Tall! ×2; Unauthorized Lawn Flamingo! ×2; That's Not Up to Code! ×2; You Parked on the Wrong Side of the Street! ×1. **Total 10.**

### Florida Man — Reckless
**Main:** Boogie Boarder ×4; Gator Wrangler ×4; Spring Break Frat Bro ×4; Amateur Storm Chaser ×4; Hurricane Holdout ×3; Lifeguard ×3; Beach Bar Loudmouth ×2; Hold My Beer ×4; Walk It Off ×3; Bolt Cutters ×2; Truck Nuts ×3; Did You See That?! ×2; Watch This! ×2. **Total 40.**
**Scenarios:** There's a Gator in My Pool! ×3; That's Definitely Not Street Legal! ×2; Hold My Beer, This Is a Shortcut! ×2; The Neighbors Called the Cops Again! ×2; I Can Explain the Fireworks! ×1. **Total 10.**

## 13. Example play sequence
HOA has Helicopter Parent (printed cost 2) Ready at Home. HOA **Rotates** Helicopter Parent to file Christmas Lights (Scenario cost 2); the Character contributes 2 and moves to the new Scenario Rotated. No Stash is spent on the Scenario. Florida Man begins their turn, readies, draws, and plays Gator Wrangler using Stash **directly to the existing Christmas Lights Scenario**. Gator Wrangler enters **Ready**, counts as contesting immediately, and **cannot attack this turn because it has just entered**, not because commitment Rotated it. HOA begins its next turn; Christmas Lights has one supporter and one contester, but its printed rule requires two contesters, so under the **existing automatic-resolution baseline** it succeeds for 1 Verdict and is dismissed. Both Characters return to their owners' Home areas **without changing Ready/Rotated state**, and HOA draws a replacement Scenario. If Florida Man had committed a second Character, the Scenario would have remained active. If Florida Man later defeated all HOA supporters and kept at least one contester there until HOA's next start-of-turn check, it would fail and Florida Man would draw 1 Main card.

**Scenario cleanup:** Whenever a Scenario leaves play, all Characters at it move to their owners' Home areas without readying or healing. All attached Items remain attached.

## 14. Priority, ties, and practical adjudication
- A card cannot be played without paying its full cost. If an effect is impossible, do as much as possible, except requirements introduced by “if” or “instead” must be met fully.
- Resolve one card or triggered ability completely before the next. If simultaneous triggers are controlled by one player, that player orders them; if by both, active player resolves theirs first.
- If an effect says “may,” its controller chooses. If it needs a target and none exists, the effect does nothing.
- A failed Scenario draw does not lose the game. A failed Main draw does not lose the game.
- No player can score from a Scenario owned by their opponent. A successful defense rewards Main card draw, not points.
- A player with 5 Verdict wins immediately. If both would reach 5 simultaneously, active player wins.
- Each player may inspect their own facedown Stash. Opponents can see only its count and rotation.
- There is no restriction on Items or Characters at Home except attachment requirements; the three-Character limit applies only at each Scenario.

## 15. Test goals
Record number of rounds, Scenarios played/succeeded/failed/abandoned, defensive reward draws, Stash counts, and whether either player was unable to contest a Scenario. Track newly played vs. established Character commitments; how often an established defender can **move and attack**; filing opportunity cost; time spent with Characters committed; and whether direct deployment reduces tabletop friction. The opening numbers are prototypes and not balance claims.

## 16. Movement/readiness design checkpoint — AGREED TESTING defaults (30 October 2026)
These changes apply to the **proposed Accusations rules baseline**, not to production Unhinged. They supersede the older **Rotate-to-commit** rule in the above text. **The full Accusations web playtest and the isolated Core Lab are NOT yet updated to match them.**

**Agreed for the next rules test:**
1. Card text supersedes default rules where it specifically changes them.
2. Filing an accusation is a deliberate expenditure: **Rotate its contributing Character(s)**. They remain at that Scenario until it resolves or an effect moves them. They Ready normally next turn for now; a longer lock is still an open question.
3. Ordinary commitment to an **existing** Scenario **does not Rotate**. A Ready, established Character may move from Home and attack at that Scenario that turn. No voluntary transfers or withdrawals while a Scenario stays in play.
4. A Character can enter directly at an existing Scenario rather than physically entering Home first. Its normal entry and commitment triggers still apply. Characters may instead be held at Home as a tactical reserve.
5. Newly played Characters enter **Ready** and may commit, support, contest, or file (including filing by Rotating). Normally they **cannot attack or activate other Rotate abilities** until a later turn.
6. **Ready and Rotated defenders are both targetable** by ordinary Character attacks at the same Scenario; both sides deal simultaneous combat damage as in section 7.
7. When a Scenario leaves play, surviving committed Characters **return Home, not to discard**, keeping Ready/Rotated state, damage and attachments. Their previous commitment lasted for the life of that Scenario.
8. **The opposing player must get a turn to respond** before a newly filed Scenario can award a Verdict (already present in the automatic-resolution rules).

**OPEN — not agreed and not silently promoted to rules:**
- Whether the filing Character should remain Rotated **until its Scenario ends** rather than Ready on the normal turn cycle.
- Whether **an attack into an undefended Scenario** should replace automatic start-of-turn victory, and whether defending it requires a **separate finishing attack** or simply defeating the last supporter. Who, if anyone, scores on defense also remains open.
- How active-attack resolution, response windows and stalemate release should ultimately interact. Sections 8–9 retain the existing automatic-check baseline; **no Test C or direct Scenario attack is implemented yet**.
- Possible future protection/targeting keywords and card adjustments, including the newly redundant Neighborhood Watch movement effect; no such redesign is locked.

**Implementation checkpoint:** This is a rules-and-documentation update only. The playable engines, bots, card data, Scenario catalog, and production files have not been modified to use the new defaults. Any human testing of the new defaults should be treated as paper rules until the browser implementation is brought into parity.
