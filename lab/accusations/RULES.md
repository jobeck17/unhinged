# UNHINGED: ACCUSATIONS LAB
**Standalone playable prototype • 24 October 2026 • Experimental**

This document is the complete authority for this prototype. No external rules, cards, decks, or documents apply. All examples, card text, and numbers below belong to this version only.

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
- **Commit:** rotate a Ready Character at Home and move it to a Scenario. It counts as supporting or contesting immediately. A Character occupies one place at a time. **Withdraw/Transfer:** not allowed voluntarily; only explicit card effects can return a committed Character Home or move it between Scenarios. When a Scenario leaves play, all Characters there return Home without readying or healing.
- **Supporting:** your Characters at your Scenario. **Contesting:** opposing Characters at your Scenario. Characters at another Scenario cannot fight here.
- **Defeat:** put a Character in its owner's Main discard. **Dismiss:** move a Scenario to its owner's Scenario discard, or an Item to its owner's Main discard. **Return:** move to owner's hand. **Draw:** take the top card of the named deck.
- **Damage:** persists on Characters until healed or they leave play. Damage equal to or greater than Health defeats immediately.
- **This turn** ends at the end of the current player's turn. **Round** means both players have taken one turn.

## 3. Deck construction
Choose one Leader and its named Style. The Main Deck has exactly 40 cards, all from the chosen Style's sample card list below, at most 4 copies of any named card. The Scenario Deck has exactly 10 Scenario cards from that Style's sample list, at most 4 copies of each named Scenario. These are two separate shuffled decks and may never be mixed. Scenario cards never enter the Stash. A card that searches a Scenario Deck may look at it, take the specified card, then shuffle it. Card text overrides a general rule only where explicitly stated.

For this first prototype, use either of the two complete starter lists in section 12. Players may tune quantities using the same card pool.

## 4. Setup
1. Reveal Leaders. Shuffle Main and Scenario Decks separately.
2. Each player draws **5 Main cards and 2 Scenario cards**. Each player may once put any number of those cards on the bottom of their respective decks and draw the same number from those decks, then shuffle each deck.
3. Randomly choose first player. Both begin at 0 Verdict and 0 Stash. No Characters or Items begin in play.
4. The first player skips the Main Deck draw on their first turn only. Neither player draws a Scenario automatically at turn start.

## 5. Turn structure
**Start:** (1) Ready all your Characters, Items, and Stash; (2) draw 1 Main card unless first-player first turn; (3) resolve start-of-turn Scenario checks, in an order chosen by active player (see section 8); (4) resolve other start-of-turn effects.

**Main:** In any order, you may:
- Once per turn put one Main card from hand face-down into Stash, Ready.
- Play Main Deck cards by rotating Ready Stash equal to their cost; costs cannot be negative. Rotated Stash becomes Ready on your next turn. Scenarios use the filing rule below instead.
- **Commit:** Rotate a Ready Character at Home to join any existing Scenario (yours or an opponent's). Newly played Characters may commit immediately. Committed Characters cannot voluntarily move between Scenarios or withdraw to Home. A card effect can override these restrictions. Committing consumes the Character's Ready state, so it normally cannot attack the same turn.
- Attack with each eligible Ready Character, rotating it to attack. A readied Character may attack again if otherwise eligible.
- **File an Accusation:** Play at most **one Scenario per turn** into an empty shared slot if you have fewer than **two** active Scenarios. Rotate one or more Ready Characters at Home; each contributes its **printed Main Deck cost** toward the Scenario's printed cost. You may also rotate any number of Ready Stash cards, each contributing 1. The total must be at least the Scenario's cost (excess is wasted), and **at least one Character must contribute**. All filing Characters immediately commit to that new Scenario, respecting the three-Character-per-player limit. Newly played Characters may file immediately, but cannot attack this turn unless Hothead. Filing Characters remain Rotated. Scenarios cannot be paid for using Stash alone.
- Voluntarily **abandon** one of your active Scenarios once per turn, dismissing it without reward. This still triggers replacement draw (section 8), but never grants the defender a reward.

**End:** Resolve end-of-turn effects, remove until-end-of-turn modifiers, then pass.

Players may play Actions and activate abilities only on their own turns. There are no response windows; automatic triggers still occur.

## 6. Stash and hand economy
Every facedown Stash card produces 1 resource when rotated; its identity and other text are inactive. Stash cards cannot be used as Characters or drawn back unless an effect explicitly says so. There is no hand limit. Main Deck draw from an empty Main Deck fails harmlessly. Scenario Deck draw from an empty Scenario Deck fails; see section 9 for recycling.

## 7. Position and combat
Characters enter **Home**, Ready, with no damage. They may rotate to file or commit on their entry turn, but cannot attack or use other Rotate abilities until the next turn unless a card expressly overrides this. Each Character is either at Home or at one Scenario. Home Characters cannot attack or be attacked by ordinary attacks. A Character may attack only an opposing Character **at the same Scenario**, regardless of whether the target is **Ready or Rotated**. Rotate the attacker and deal damage equal to its Power to its target. **There is no automatic retaliation, no blocking, and no leader attacks.** Ready and Rotated opposing Characters at the same Scenario are both legal attack targets. The target deals no damage back unless card text says otherwise. Damage persists. A Character may attack only if it began this turn under your control, except Hothead. Committing normally rotates it; other card-effect movement does not inherently Ready or heal it.

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
**Retaliate:** When attacked, this Character deals its Power as damage to the attacker after the attacker's damage, even if defeated.
**Sucker Punch:** Once per turn this Character may attack an opposing Character at a different Scenario; it remains at its current location. It cannot attack Home Characters.
**Ready:** Turn a Rotated card upright.
**Heal N:** Remove up to N damage from a Character.

## 11. Complete prototype card library
Each entry is **Name | Cost | Power/Health if Character | text**. A dash means no additional ability. All card text is literal. Unless otherwise stated, “a Character” means a Character in play, “friendly” means yours, and “opposing” means controlled by the opponent.

### Stonewall Main cards
- **Old Guy** | Character 1 | 1/3 | Absorb 1 while defending an opposing Scenario.
- **Helicopter Parent** | Character 2 | 2/3 | When committed to defend, give another friendly Character at that Scenario +1 Health until end of turn.
- **Marine** | Character 3 | 3/4 | Retaliate.
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
Health modifiers can cause immediate defeat if accumulated damage meets the new Health. A Character that returns to hand loses damage and temporary modifiers. An effect that says “commit” must obey capacity but ignores the normal once-per-turn voluntary commit limit; forced moves do not use that voluntary allowance. For “first time” Leader passives, track use per turn. A Scenario's own continuous ability ends when it leaves play. A Scenario's “when this succeeds” effect resolves after scoring and before dismissal. Items with Attach cannot be played unless you control a legal Character; attached Items remain Ready or Rotated independently of the host.

## 12. Complete starter decklists
The numbers below are copies. Each Main list totals 40; each Scenario list totals 10.

### HOA President — Stonewall
**Main:** Old Guy ×4; Helicopter Parent ×4; Marine ×4; Grandma ×3; Neighborhood Watch ×4; Board Member ×2; Violation Notice ×4; Objection! ×3; Photographic Evidence ×3; Clipboard ×3; Emergency Meeting ×2; Neighborhood Petition ×4. **Total 40.**
**Scenarios:** Your Christmas Lights Are Still Up in March! ×3; Your Grass Is 0.3 Inches Too Tall! ×2; Unauthorized Lawn Flamingo! ×2; That's Not Up to Code! ×2; You Parked on the Wrong Side of the Street! ×1. **Total 10.**

### Florida Man — Reckless
**Main:** Boogie Boarder ×4; Gator Wrangler ×4; Spring Break Frat Bro ×4; Amateur Storm Chaser ×4; Hurricane Holdout ×3; Lifeguard ×3; Beach Bar Loudmouth ×2; Hold My Beer ×4; Walk It Off ×3; Bolt Cutters ×2; Truck Nuts ×3; Did You See That?! ×2; Watch This! ×2. **Total 40.**
**Scenarios:** There's a Gator in My Pool! ×3; That's Definitely Not Street Legal! ×2; Hold My Beer, This Is a Shortcut! ×2; The Neighbors Called the Cops Again! ×2; I Can Explain the Fireworks! ×1. **Total 10.**

## 13. Example play sequence
HOA has Helicopter Parent (printed cost 2) Ready at Home. HOA Rotates Helicopter Parent to file Christmas Lights (Scenario cost 2); the Character contributes 2 and commits to the new Scenario. No Stash is spent on the Scenario. Florida Man begins their turn, readies, draws, and plays Gator Wrangler using Stash. They Rotate Gator Wrangler to commit it to Christmas Lights. They cannot attack with it this turn because it is now Rotated (and just entered). HOA begins its next turn; Christmas Lights has one supporter and one contester, but its printed rule requires two contesters, so it succeeds for 1 Verdict and is dismissed. Both Characters return to their owners' Home areas **without changing Ready/Rotated state**, and HOA draws a replacement Scenario. If Florida Man had committed a second Character, the Scenario would have remained active. If Florida Man later defeated all HOA supporters and kept at least one contester there until HOA's next start-of-turn check, it would fail and Florida Man would draw 1 Main card.

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
Record number of rounds, Scenarios played/succeeded/failed/abandoned, defensive reward draws, Stash counts, and whether either player was unable to contest a Scenario. The opening numbers are prototypes and not balance claims.
