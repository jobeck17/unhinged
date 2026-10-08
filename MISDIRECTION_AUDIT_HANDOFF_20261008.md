# Unhinged — Misdirection audit handoff

Updated 8 October 2026, after Joseph banked Cloak and declare-and-search for the next Spy set, closing Magician concept inclusion decisions. This is the continuation record for a new chat. Read this before continuing the audit.

## Exact stopping point and next steps

Character first pass, ten Actions, three Items and the new finisher are approved (32 active distinct designs: 19 Characters, 10 Actions, 3 Items). Burner Phone ★ and Do Not Look in the Hat are TABLED. P078 Pirate is now locked as a separate Sucker Punch / Item-release Trouble Character; old choice/free-play designs are superseded. Next complete character curve/ability distribution and whole-set Magical eligibility, then coherent naming. Leader passive is now locked as The Show Must Go On (see below); Breaking Point is now locked as For My Next Trick… (see latest lock below). Work in batches of three where useful: current card, proposed update, role/combo and testing concern. Joseph approves individually or by batch. Do not restart approved decisions.

These Misdirection locks are DESIGN decisions for isolated-deck testing, NOT claims of implemented or verified browser behavior. This handoff intentionally does not edit CARDS.json, DECKS.json or the engine. Those still contain earlier Magician designs. Implement after the audit is complete or when requested. Balance is provisional until simulations and other style audits.

Canonical repo: jobeck17/unhinged, Mordecai 0.4. Playtest: https://jobeck17.github.io/unhinged/web/ ; builder: https://jobeck17.github.io/unhinged/builder/ . Leader: Birthday Party Magician. Current deck name: Now You See Me. Leader passive design is now The Show Must Go On: once during your turn, friendly return to your hand or Dismiss Readies 1 Stash. Production implementation is pending. Breaking Point design is now locked as For My Next Trick…; production implementation is pending.

## Identity and design guardrails

- Tricky, sneaky, magical Misdirection. Bounce friendly characters for value at the expense of tempo and replay costs.
- Trigger leave-play effects, retrigger entrance effects, and recover damaged survivors by returning and replaying them. Bounce is recovery, not a separate healing package.
- Heavy card draw; meaningful Hothead package with competitive, not overpowered or underpowered stats.
- Move cards among board, hand, Stash and occasionally deck. Do not make every card explicitly reward bounce: combat and standalone utility should matter too.
- No permanent ramp package. Only limited temporary/conditional free deployment; Pick a Card is locked, Trap Door's Dismiss-triggered storage/release is locked and Bush is now banked for the next set's Spy. Free deployment is still valuable even though it does not grow Stash.
- No healing outside bounce. Return-to-hand on Defeat is a possible future mechanic, not locked on any card.
- Cause Trouble on entry has two locked designs: Opening Act's general permission and Heckler's Item-release permission. Both are plain text; keyword naming is optional/pending. It does not grant extra actions or attacks.
- Named-card deck search/direct deployment (e.g., Rabbit or Dove, then reshuffle) is a brainstorm idea, not approved.
- Enough distinct options and a win-pressure payoff, not endless draw/bounce loops. Avoid redundant effects. Most expensive character should justify its role; the cost-6 finisher is now locked (see below).
- Stats below are Power / Health / Trouble. No universal Trouble bonuses; bonuses belong on specific card text.
- Global Responses were previously scrapped. Do not reintroduce them.

## Name flags

- ★ = rename needed. Keep current name as a working label, not final flavor.
- ○ = user likes or may like the name, but review fit with the revised ability.
- Unmarked = no new rename flag established, not necessarily a permanent name lock.
- School Bully's name is reserved for possible HOA or Backyard Wrestler use. The Hothead/Sucker Punch mechanical slot stays in Misdirection.
- Do the naming pass after mechanics/curve, rather than forcing flavor now.

## Active locked characters (19 distinct designs)

| ID / working name | Cost | P/H/T | Approved effect |
|---|---:|---|---|
| P062 Birthday Kid | 1 | 1/2/1 | When played, look at the top 2 cards of your deck. Put one on top and the other on the bottom. |
| P061 Magician's Assistant | 2 | 2/2/1 | When played, you may return another character you control to your hand. |
| P063 Rabbit | 2 | 1/2/1 | When this character enters or leaves play, draw a card. |
| LAB-MAG-006 Dove | 2 | 2/1/0 | When this character enters or leaves play, you may deal 1 damage to an opposing character. |
| P066 Stagehand | 3 | 2/4/1 | Whenever another character you control is returned from play to your hand, draw a card, then discard a card. |
| P076 Impatient Apprentice | 1 | 1/1/1 | Hothead. Old random Stash exchange removed. |
| P077 Opening Act | 2 | 1/2/1 | This character may Cause Trouble the turn it enters play. Old Stash exchange removed. |
| LAB-MAG-003 Disappearing Assistant | 3 | 2/3/2 | When played, you may Dismiss another character you control. If you do, draw a card. |
| LAB-MAG-001A/B Volunteer From the Audience | 1 | 1/1/1 | When this character enters play or is returned from play to your hand, you may give another character you control +1 Power this turn. Not permanent. |
| P065 Escape Artist | 3 | 3/2/2 | Hothead. When played, you may return another character you control to your hand. |
| P067 Big Brother | 3 | 3/2/1 | Hothead, Sucker Punch. Remove Chicken. Reserve old name for another style/leader. |
| LAB-MAG-004 Party Mom | 3 | 2/3/1 | Hothead. When played, gets +2 Power this turn. When returned from play to your hand, you may return an opposing character costing 2 or less to its owner's hand. |
| P039 Card Counter | 4 | 2/4/2 | When played, look at the top 3 cards of your deck. Put one into your hand, one on top and one on the bottom. Old opponent-top-card reveal removed. |
| P064 The Mentalist | 4 | 1/3/1 | Temporary borrowed opposing-deck character; details below. |
| P068 Card Shark | 4 | 3/3/2 | When played, draw 2 cards, then discard a card. |
| P075 Street Magician | 4 | 3/3/2 | When this character attacks, an opponent chooses one: it gets +2 Power for this attack; or you draw a card. No discard. |
| P073 Quick-Change Artist | 5 | 3/4/2 | When played, may exchange up to 2 Stash cards with the same number from hand. Each replacement retains the replaced card's Ready/Rotated state. Stash-inspection permission removed as redundant. |
| P078 Heckler | 5 | 3/4/2 | Sucker Punch. This character may Cause Trouble the turn it enters play if played from under an Item. Old opponent-choice/free-play engine removed. |

Current active locked character curve: cost 1 = 3; cost 2 = 4; cost 3 = 5; cost 4 = 4; cost 5 = 2; cost 6 = 1. Total 19 (including the new finisher). Joseph approved the first curve batch: Wi-Fi Bandit cost 1, 1/1/1 Hothead; Very Enthusiastic Volunteer cost 1, 1/1/1, same effect; Off-Duty Clown cost 3, 2/4/1, same effect. These supersede their earlier costs/stats; all name flags preserved. A playable deck's copy distribution matters as well as unique designs.

Consolidate LAB-MAG-001A and LAB-MAG-001B into ONE Volunteer design during implementation, updating deck references. Consolidate P089 (old alternate Lady) and LAB-MAG-004 into the locked Lady design; do not preserve two conflicting cards with the same name in the active set.

### The Headliner — LOCKED, ID pending

**The Headliner**, Cost 6, Power / Health / Trouble = 4 / 5 / 3.

“The first time each turn another character you control is returned from play to your hand, this character gets +2 Trouble this turn.”

Joseph explicitly approved this proposal. It is a new design, named The Headliner, not yet assigned a stable ID; do not overwrite P078 without a separate decision. No Hothead or immediate Trouble permission is granted. It must be in play to see the return; earlier returns before it enters do not retroactively grant the bonus. Bonus is temporary and capped at +2 per turn per instance, regardless of additional returns. Separate copies each trigger; leaving/re-entering creates a new instance under core rules. Base Trouble 3 becomes 5 after a qualifying return. Magical eligibility remains open for the whole-set review.

Testing flag: repeatable 5 Trouble may be strong behind reliable bounce; assess survival, setup/resource costs and board-presence sacrifice before tuning. No stat/cost change is approved.

### The Mentalist — full lock (formerly the cost-4 Volunteer From the Audience)

Cost 4, 1/3/1. When played, reveal the top card of an opponent's deck. If it is a character, you may play it under your control without paying its cost. It may attack immediately but cannot Cause Trouble this turn. At the end of your turn, return it to its owner's hand if it is still in play. If you do not play the revealed card, put it on the bottom of its owner's deck.

The borrowed character's entrance abilities trigger. It is not permanent theft. If Retaliate or another effect Defeats it first, it goes to its owner's discard and applicable Defeated/leave-play abilities trigger. End-of-turn return must not retrieve it from discard. Returning Volunteer itself must not cancel the scheduled return of the borrowed character. Returning a borrowed character always means its OWNER'S hand, not controller's hand. Details of control-trigger attribution and zone-change tracking need engine tests when implemented.

### Character testing flags and pending design

- Trapdoor Assistant is now TABLED; prior cost-4 tuning option is historical, not active.
- Lady: strong entry combat plus return-triggered opposing bounce. Watch power; raising cost is possible, not locked.
- Rabbit: repeated card draw is intended; test loop costs and avoid accidental infinite triggers.
- Dove: damage, not permanent Health loss or placing tokens that bypass damage rules. Interacts with Absorb and damage triggers normally.
- Identity Thief is now BANKED for the Spy set; copied Hothead and numeric/source-leaving behavior remain future implementation concerns.
- P078 Pirate is LOCKED in the character table. Test immediate Trouble via Trap Door; Sucker Punch is not Hothead. Earlier opponent-choice/free-play versions are superseded.

## Locked actions (10)

| ID / working name | Cost | Approved effect |
|---|---:|---|
| P079 Pick a Card | 3 | Opponent chooses a card from your whole remaining hand without seeing its face. Reveal it; you may play it without paying its cost. NO draw-to-three. Physically fan the whole hand with backs toward opponent; digital must not reveal identities during selection. |
| P080 Now You See Me | 2 | Return a character you control to your hand. Then you may play a character costing 2 or less from your hand without paying its cost. Old extra discounted payment removed. |
| P081 Look Over There! | 1 | Rotate a chosen opposing character costing 3 or less. No skip-next-ready effect, no Response text. |
| P082 Choose Your Fate | 2 | Choose two opposing characters; their owner chooses one to return to its owner's hand. If they have only one character, choose and return that one instead. No cost cap. |
| P084 Presto Chango | 1 | Exchange a card in your Stash with a card in your hand. The replacement enters Stash in the same state—Ready or Rotated—as the card it replaces. This IS the initially unnamed locked exchange action, not an extra slot. |
| P085 Ace Up My Sleeve | 3 | Draw 2 cards. Final user lock at chat ending. Old Rotated item/character bounce removed. |
| P086 Now You Don't (formerly Switcheroo) | 2 | Choose a character you control and an opposing character with equal or lower cost. Dismiss both to their owners' discard piles. Joseph explicitly revised name and destination; paired Trap Door recovery and balance need deeper exploration. |
| LAB-MAG-002 Encore! | 2 | Draw a card. If a character you controlled was returned from play to your hand this turn, draw another card. |
| P142 Vanishing Act | 2 | Return an opposing Item to its owner's hand. Draw a card. No cost cap; no Character option. Requires an opposing Item; cannot be played solely to draw. |
| P090 Poof! | 1 | Choose a character you control. After it next Causes Trouble this turn, return it to your hand. Must play before Trouble. No Ready, immediate-Trouble permission, or draw added. |

Important reversals: User rejected converting Poof! into conditional draw and explicitly restored the bounce-after-Trouble version. User instead reopened P085 and converted that generic bounce into 3-cost Draw 2. Do not accidentally restore earlier versions.

Ethan's draw 2/discard 1 overlaps Social Media Grifter's character entrance but has no identical standalone Misdirection action. Joseph approved the action after this check. Other styles have similar draw/discard patterns with sacrifice requirements; that is not another Misdirection action. Net hand growth: Ethan replaces itself while filtering; P085 grows hand by one after spending the action.

Wrong Address's 2-cost unrestricted opposing bounce is a testing flag, particularly against a single expensive character; no cost cap has been approved.

Manager testing lock: start at cost 2 with unrestricted opposing Item return and Draw 1. Test efficiency against expensive Item engines before adding a cap; no cap or cost increase is currently approved. Returning an attachment leaves its Character in play. The working name does not fit the Magician theme and must be renamed in the later coherent naming pass.

## Locked Items (3)

| ID / working name | Cost | Approved effect |
|---|---:|---|
| P088 Marked Deck | 2 | Rotate this Item and spend 1 Stash: Draw a card. |
| LAB-MAG-005 Magician's Hat | 3 | Rotate this Item and spend 1 Stash: Return a Magical Character you control to your hand. |
| New ID pending — Trap Door | 3 | May store a just-Dismissed friendly Character costing <=5 from your discard face-down if empty. Rotate and spend 1 Stash: Play stored Character free. Persistent; one stored card; see full lock below. |

Beer-Stained Cards' revised wording is locked. Its name sounds like Florida Man and needs a Misdirection-theme rename; this does not move the mechanical slot to Reckless. Separate copies each Rotate and pay separately. Rotation normally limits each copy to one activation between Ready transitions; no additional once-per-turn limit is locked. Watch whether existing draw makes this engine unnecessary.

### Trap Door — full lock and combo

**LOCKED FOR TESTING — Trap Door (new ID pending), Cost 3 Misdirection Item:**

“Whenever a character you control costing 5 or less is Dismissed, you may put that card from your discard face-down under this Item if there is no card under it.
Rotate this Item and spend 1 Stash: Play the character under it without paying its cost.”

Persistent engine; one stored Character per copy. Enters Ready under core Item rules. Capture is optional and only for a Character just Dismissed while this Item is in play; not generic discard-pile retrieval, Defeat, Sacrifice, Return or hand discard. Controller chooses among simultaneous catch triggers; the same card cannot be caught by multiple copies. Owner may inspect their stored card; source and movement came from a public Dismiss event, so face-down storage does not erase previously known information. Stored card is not in play and cannot act or trigger in-play abilities.

Release empties the storage slot and triggers normal entrance/when-played effects; normal Character entry restrictions apply. No Hothead or immediate Trouble is granted by Trap Door. Rotate/payment limits activation; no extra once-per-turn cap approved. If Trap Door leaves play, its stored Character goes to its owner's discard. Release/cleanup and instance tracking require engine tests. Distinct from locked Trapdoor Assistant.

**INTENDED THREE-CARD MACHINE:** Rabbit in play + established empty Ready Trap Door. Now You See Me (2): Return Rabbit, draw 1, play Dove free, optionally deal 1 damage. Now You Don't (2): Dismiss Dove and an opposing Character costing <=2; Dove may deal 1 exit damage, Trap Door may store it. Activate Trap Door (1 Stash): play Dove free, optionally deal 1 entrance damage. Total 5 Stash that turn, plus previously paid Item setup cost 3. End with Rabbit in hand and Dove in play. Dismissed enemy must actually leave; Stubborn and other prevention can alter outcomes. No claim of tested balance or implemented engine behavior.

## Tabled cards

- P087 Burner Phone ★: TABLED by Joseph. Preserve rename flag if reconsidered. Old Stash inspection/exchange no longer justifies its active slot.
- LAB-MAG-007 Do Not Look in the Hat: TABLED by Joseph after Item review. This supersedes the earlier defer-to-Items status. Do not include it as an approved action or revive without reopening.

### Approved designs preserved outside active pool

| ID / working name | Cost | P/H/T | Preserved effect |
|---|---:|---|---|
| P070 Tech Bro ★ | 3 | 3/2/2 | When Defeated, draw a card. Not a return-to-hand trigger; old combat-defeat draw removed. |
| P071 Trapdoor Assistant | 3 | 1/2/1 | When played, you may return an opposing character costing 3 or less to its owner's hand. |
| P074 Identity Thief ○ | 5 | 3/4/2 | When played, may choose another character and gain one of its printed keywords while that character remains in play. No trait copying. |

Tech Bro ★ and Trapdoor Assistant are TABLED. Identity Thief ○ is BANKED for next set's Spy. Existing Burner Phone ★ / Do Not Look in the Hat tables remain. Do not restore any to the active pool automatically.

| P069 Conspiracy Blogger ○ | 4 | 2/4/2 | At the start of your turn, name Character, Action or Item. Reveal your deck's top card. Correct type: put into hand. Incorrect: put on bottom. |

P069 Conspiracy Blogger ○ is TABLED; approved design and flag preserved outside the active set.

## Magical trait — five-character eligibility locked

Joseph approved adding Magical to Magician's Assistant (P061), Escape Artist (P065) and Disappearing Assistant (LAB-MAG-003). Together with already-approved Rabbit (P063) and Dove (LAB-MAG-006), these are the **five Magical Characters in the current active set**.

Magical is a trait, not a keyword. Preserve existing other traits; Rabbit/Dove retain Animal. No other active Character gains Magical in this pass. Magician's Hat may target any friendly member of these five, under its locked cost-3 / Rotate plus spend 1 Stash activation. All other mechanics, names, costs, stats and the 32-card count remain unchanged. This closes the initial whole-set Hat eligibility decision; changes require an explicit later tuning decision.

Remaining design closure: decide include/rework/bank for fragile high-Power/Cloak concept and explicitly bank/review named Rabbit/Dove deck search; then final interaction review and 40-card copy distribution. Leader passive, Breaking Point, names and initial curve are approved. Implementation/testing remains pending.

Inconspicuous Bush is now BANKED for next set's Spy Leader, with hand-tucking behavior to explore. It is not in the current Magician set. Trap Door replaces it in this set and is now locked as the persistent Dismiss-triggered storage/release engine above. See NOTES.md's 8 October Now You Don't / Trap Door entry. Trap Door is distinct from locked Trapdoor Assistant. Cloak on a fragile high-Power Character remains an unresolved prior direction, not an approved card.

## Audit completeness correction — 8 October 2026

The existing production Misdirection Character/Action/Item entries are all accounted for in this handoff, including the two duplicate-design migrations. However, the assistant incorrectly described the audit as complete without presenting the explicitly listed Bush and fragile Cloak-character concepts. Review existing cards AND unresolved Misdirection concepts before declaring set completeness.

Required closure queue:
1. Now You Don't / Trap Door: paired mechanism is now LOCKED above; implement/test later. Inconspicuous Bush remains explicitly banked for next set's Spy Leader with hand-tucking behavior.
2. Fragile high-Power/Cloak character: explicitly BANKED for next set's Spy. Exact rules remain open; not a current keyword or Magician card.
3. P078 Heckler: disposition resolved; new Sucker Punch / Item-release Trouble design is locked. Test later.
4. Named-card search: explicitly BANKED for next set's Spy as declare a card, then search your deck for it. Cost/destination/verification/failure rules open; no free/direct deployment approved.
5. Whole-set Magical assignments, curve, ability distribution, copy counts and names; Leader passive and Breaking Point.
6. Stash inspection/state-preserving exchange are recorded decisions awaiting rules/engine/UI implementation, not current production parity.

Broader vault hooks (e.g. Jailbroken Robot Vacuum storage) are not automatically Misdirection omissions: Robot Vacuum currently belongs to Salvage. Preserve them in their existing scope. No existing Misdirection production card was found unreferenced by this handoff in the CARDS.json comparison.

## Stash rule decision and implementation warning

Own Stash may be inspected at any time. Looking/rearranging must preserve EACH card's Ready/Rotated state; physically peek individually or keep Ready and Rotated groups separate. No identity-memory minigame required. Earlier suggestion of position-only selection was superseded.

Costs paid BEFORE effects. State-preserving exchange keeps Stash count and Ready count unchanged by the exchange itself. Example: start with five Ready Stash, pay 1 to play Default Password => four Ready, one Rotated. Whether swapping the payment card or another Ready card, replacement retains that slot's state => still four Ready, one Rotated. This FINAL version supersedes the earlier 'replacement always Rotated' version that could leave two Rotated. Exchange two cards uses one-to-one inherited states.

General inspectability changes old cards that previously granted inspection. Update rules, UI and all affected mechanics deliberately when implementation is requested. Engine must permit the player to choose WHICH Ready Stash card pays a cost when identities matter, not silently choose the first and erase this decision. Opponent should not automatically see own Stash identities merely because its owner may inspect them.

## Combos already intended

- Rabbit + Assistant/Now You See Me: pay for draw through entrance/exit/replay.
- Dove + bounce: damage on entrance and exit; Absorb can shut down the 1-damage ticks.
- Volunteer + bounce: temporary Power on entrance and return, then attack with another character.
- Hothead survivor + bounce: recover damage and reuse its entrance after paying replay cost; cannot bounce after it is already Defeated without explicit rescue text.
- Script Kiddie + Now You See Me: immediate Trouble after entry/re-entry; still rotates for each Trouble use.
- Birthday Kid/Influencer retain deck selection and next-draw setup; Blogger's correct-type payoff is now tabled.
- Poof! + Rabbit/Lady: Trouble first, then exit draw or opposing bounce; no instant action permission granted by Poof! itself.
- Birthday Boy / Now You Don't + Trap Door: Dismiss a friendly Character, store it, then release it; Rabbit/Dove leave and entrance triggers apply. Pirate released from Trap Door may Cause Trouble immediately. Old opponent-choice Pirate combo is superseded.

## Prior deck status and test baseline

Reckless/Florida Man and Stonewall/HOA are already implemented, committed and browser-tested. Previous implementation commit: 2bfc0c257b4458afc1e3750007f201a280e52c29. Simulation commit: 573208641b30b128729eccbb034259ee91305e17. HEAD may have advanced since; fetch current main before writing. Do not revert unrelated changes.

400 production-engine games (100 seeds x both seats x both first players): HOA 224 wins (56.4% of 397 completed), Florida 173 (43.6%), 3 unresolved at 60-round cap. Mean 9.6 rounds, median 9; first player won 48.1%. Unresolved games had both decks empty and no characters left. No new tie rule introduced. Simple heuristic AI, coverage decks, no mulligans, pending shared Last Straw effects; NOT a final balance verdict. Reports: HEAD_TO_HEAD_20261008.md/json; reproducible runner: web/headtohead.sim.mjs.

Reckless committed pool has 32 cards with last slot intentionally open. Stonewall count is 33 approved designs (21 characters, 9 actions, 3 items), not 32; preserve user locks and revisit whether a card should be tabled instead of silently deleting one. Standard 40-card decks and regression checks already exist. New Misdirection simulations should wait until its actual revised mechanics are implemented.

## Misdirection curve batch — locked 8 October 2026

Joseph approved all three proposals:
- **P076 Wi-Fi Bandit ★:** Cost **1**, **1/1/1**, Hothead.
- **LAB-MAG-001A/B Very Enthusiastic Volunteer ○:** Cost **1**, **1/1/1**, unchanged optional +1 Power this Turn to another friendly Character on entrance or return from play to your hand. Consolidate duplicate IDs later.
- **P066 Off-Duty Clown ★:** Cost **3**, **2/4/1**, unchanged draw 1/discard 1 whenever another friendly Character returns from play to your hand.

These explicitly supersede the earlier curve/stat locks. Approved pool remains 35 designs: 22 Characters, 10 Actions, 3 Items.
Cost/type counts (unique designs, not deck copies): Cost 1 = 3 Characters/3 Actions/0 Items (6); Cost 2 = 5/5/1 (11); Cost 3 = 6/2/2 (10); Cost 4 = 5/0/0 (5); Cost 5 = 2/0/0 (2); Cost 6 = 1/0/0 (1).

Historical support gaps from the first curve batch are now resolved by the locked Birthday Boy and Pirate revisions below. Existing draw/filter and entrance effects remain well represented. All Misdirection revisions still await playtest implementation and testing.

## Misdirection support batch — locked 8 October 2026

- **LAB-MAG-003 Birthday Boy ★:** Cost **3**, **2/3/2**. “When played, you may Dismiss another character you control. If you do, draw a card.” Supersedes the locked cost-2 2/1/2 vanilla version. Keeps ★. Friendly Dismiss requires another Character; draw only if it was actually Dismissed. Dismiss is not Defeat. Rabbit/Dove leave-play triggers and Trap Door capture may apply.
- **P078 Heckler:** Cost **5**, **3/4/2**, **Sucker Punch**. “This character may Cause Trouble the turn it enters play if played from under an Item.” Replaces BOTH old production opponent-choice free-deployment and the never-approved once-per-turn proposal. Keeps ○. No Hothead granted; Sucker Punch does not permit an ordinary entry-turn Attack. Immediate Trouble permission applies only to the instance played from under an Item and still requires Ready/positive Trouble. Trap Door release qualifies; ordinary hand play, Pick a Card or borrowed-deck play does not.
- **Pool now 36 locked designs:** 23 Characters / 10 Actions / 3 Items. Character curve costs 1–6: **3 / 4 / 7 / 5 / 3 / 1**. Unique all-card cost/type counts: 1 = 3/3/0 (6); 2 = 4/5/1 (10); 3 = 7/2/2 (11); 4 = 5/0/0 (5); 5 = 3/0/0 (3); 6 = 1/0/0 (1). Types listed Character/Action/Item. Pirate is now included; finisher remains a separate design.
- **Support gained:** Trap Door has two friendly-Dismiss enablers (Now You Don't and Birthday Boy); two innate Sucker Punch Characters (School Bully and Pirate) plus Identity Thief copying; two immediate-Trouble designs (Script Kiddie and conditional Pirate). Birthday Boy adds optional draw support.
- **Testing:** Birthday Boy's replay/Dismiss/draw and Trap Door return may be strong value; Pirate turns Item release into immediate Trouble. Compare actual resource/board costs and loop readiness. Character curve now crowds cost 3; review unique roles and 40-card copy counts before proposing further moves.
- Remains design-only, not implemented/tested in playtest. Other locks/name flags, Spy/Bush bank and unresolved Cloak concept preserved.

## Misdirection active-pool tables — locked 8 October 2026

Joseph approved all three table decisions:
- **P070 Tech Bro ★:** TABLED for a future set. Preserve approved Cost 3, 3/2/2, “When Defeated, draw a card.” No migration of ability onto another active Character.
- **P071 Trapdoor Assistant:** TABLED. Preserve approved Cost 3, 1/2/1, optional opposing Character return costing <=3 when played. Its absence removes repeatable entrance bounce, while Lady/Wrong Address retain opposing bounce. No merge approved.
- **P074 Identity Thief ○:** BANKED for the next Misdirection Spy set. Preserve approved Cost 5, 3/4/2, optional copy of another Character's one printed keyword while that Character remains in play. No trait copying. Preserve ○.

Current Magician active pool: **33 locked designs = 20 Characters / 10 Actions / 3 Items**. Character curve costs 1–6: **3 / 4 / 5 / 5 / 2 / 1**. Unique cost/type counts (Character/Action/Item): 1 = 3/3/0 (6); 2 = 4/5/1 (10); 3 = 5/2/2 (9); 4 = 5/0/0 (5); 5 = 2/0/0 (2); 6 = 1/0/0 (1).

Keeps four innate Hothead Characters, two innate Sucker Punch Characters and two immediate-Trouble designs. Trap Door still has two friendly-Dismiss enablers. Tables are pool decisions, not deletion of approved designs. Other locks/name flags preserved. Current production CARDS/DECK/engine remain earlier versions until implementation. Magical whole-set review, naming, Leader audit and unresolved fragile Cloak-character concept remain open.

## Misdirection naming pass — 8 October 2026

**Definite user renames (mechanics unchanged, design-only until implementation):**
- P084 Default Password ★ → **Presto Chango**. Name approved; rename flag resolved.
- P085 Have You Tried Turning It Off? ○ → **Ace Up My Sleeve**. Name approved; review flag resolved.
- New cost-6 finisher → **The Headliner**. Name approved; stable ID still pending.
- P078 Pirate With a Business License ○ → **Heckler**. “Pirate” is interpreted as the cost-5 Sucker Punch / Item-release Trouble card in the latest overview; P075 Pirate Radio Operator ★ stays unchanged. Name approved under that mapping.
- P064 Volunteer From the Audience ○ → **The Mentalist**. Name approved; review flag resolved.

**Tentative, not final name locks:**
- P088 Beer-Stained Cards ★: **Invisible String?** proposed by Joseph. Keep rename open pending confirmation. Bank **Beer-Stained Cards** as a future Florida Man/Reckless name/concept; this does NOT transfer the current draw-engine mechanics to Reckless.
- P142 I Want to Speak to Your Manager ★: **Magic Wand** or **Transform** are alternatives, not a final choice; retain working label/★ until settled.
- Joseph questions Conspiracy Blogger's overall role. Its cost-4 2/4/2 type-guess/top-card ability remains locked pending an explicit keep/rework/table decision. It works with Birthday Kid/Influencer setup but duplicates an already-rich card-advantage package. Do not table by inference.

Other active/table/bank name flags remain intact. Active pool remains 33.
## Conspiracy Blogger table — approved 8 October 2026

- **P069 Conspiracy Blogger ○: TABLED** by Joseph. Preserve approved Cost 4, 2/4/2, start-of-turn name Character/Action/Item and reveal top deck card; correct to hand, wrong to bottom. No automatic migration or replacement; preserve ○.
- **Current active pool: 32 locked designs = 19 Characters / 10 Actions / 3 Items.** Character curve costs 1–6: **3 / 4 / 5 / 4 / 2 / 1**. Unique cost/type counts (Character/Action/Item): 1 = 3/3/0 (6); 2 = 4/5/1 (10); 3 = 5/2/2 (9); 4 = 4/0/0 (4); 5 = 2/0/0 (2); 6 = 1/0/0 (1).
- Birthday Kid and Social Media Influencer remain locked as standalone deck selection/setup, without Blogger payoff. Other names, mechanics, banks and table decisions remain unchanged.
- User invites stage-magic naming alternatives. Invisible String? and Magic Wand/Transform remain tentative; do not rename them or other unresolved names without approval. No replacement Character approved. Implementation/testing remains pending.

## Misdirection working-name replacements — approved 8 October 2026

Joseph approved all ten suggested replacements as current working names, explicitly open to later refinement. Mechanics, IDs, costs and stats unchanged. These supersede earlier tentative Invisible String? / Magic Wand / Transform suggestions. Former ★ names have a replacement now; ○ indicates the new name remains reviewable, not a required re-rename.

| ID | Previous working name | Current working name |
|---|---|---|
| P088 | Beer-Stained Cards | Marked Deck |
| P142 | I Want to Speak to Your Manager | Vanishing Act |
| P076 | Wi-Fi Bandit | Overeager Apprentice ○ |
| P077 | Script Kiddie | Opening Act |
| P066 | Off-Duty Clown | Stagehand |
| LAB-MAG-003 | Birthday Boy | Disappearing Assistant |
| P039 | Social Media Influencer | Sleight-of-Hand Artist ○ |
| P068 | Social Media Grifter | Card Shark |
| P075 | Pirate Radio Operator | Street Magician |
| P073 | IT Guy Who Quit Six Months Ago | Quick-Change Artist |

Beer-Stained Cards remains BANKED as a future Florida Man/Reckless name/concept; P088's current Misdirection draw-engine ability stays on Marked Deck. No style transfer. Previously approved Presto Chango, Ace Up My Sleeve, The Headliner, Heckler, The Mentalist and Now You Don't remain unchanged. Other name flags (including School Bully ★, Lady ○ and Enthusiastic Volunteer ○) remain intact. Pool stays 32 active designs; production/playtest implementation remains pending.

## Misdirection name confirmations and draw-overlap review — 8 October 2026

- **P082 Wrong Address ○ → Choose Your Fate:** approved rename; name flag resolved. Ability unchanged.
- **P142 Vanishing Act:** user explicitly LOCKED name; remove ○. Ability unchanged.
- **P088 Marked Deck:** user explicitly LOCKED name; remove ○. Beer-Stained Cards future Florida Man name bank remains.
- **Open names:** Overeager Apprentice and Ethan remain unresolved (user left proposed replacements blank). User suggests Volunteer From the Audience for the current 1-cost Very Enthusiastic Volunteer; treat question mark as tentative, not a new lock. That prior name is available because P064 is now The Mentalist.
- **Family-flavor direction:** School Bully should evoke the Birthday Kid's older brother; Lady should evoke the Birthday Kid's mom. User flags literal names as too long. Short exact names remain unapproved; preserve existing working labels/flags for now.
- **Ability overlap reopened:** user identifies identical “Draw 2, discard 1” on Ethan (cost-2 Action) and Card Shark (cost-4 Character). Prior approval remains historical; do not claim the difference in card type resolves the concern. Review a distinct effect for Ethan; no mechanics changed by this naming update.
- Pool stays 32 active designs; revisions not implemented in playtest.

## Final naming / Encore revision — locked 8 October 2026

Joseph approved all five suggestions:
- **P076 Overeager Apprentice → Impatient Apprentice** (name locked), unchanged Cost 1, 1/1/1, Hothead.
- **LAB-MAG-001A/B Very Enthusiastic Volunteer → Volunteer From the Audience** (name locked), unchanged Cost 1, 1/1/1, optional +1 Power this Turn to another friendly Character when it enters or returns from play to your hand. This name now belongs to this 1-cost design; P064 remains The Mentalist.
- **P067 School Bully → Big Brother** (name locked), unchanged Cost 3, 3/2/1, Hothead/Sucker Punch. Old School Bully name remains reserved for another style as previously noted.
- **LAB-MAG-004 Lady Who's Moving Out Again → Party Mom** (name locked), unchanged Cost 3, 2/3/1, Hothead, entry +2 Power this Turn and optional opposing <=2-cost return when returned to your hand.
- **LAB-MAG-002 Ethan's JUST Being Dramatic → Encore!** (name and mechanics locked), Cost 2 Action: “Draw a card. If a character you controlled was returned from play to your hand this turn, draw another card.” Supersedes Draw 2/discard 1. Card Shark remains unchanged.

Encore checks an earlier qualifying return during the current Turn and draws two total when satisfied, not one per returned Character. No return is performed by Encore itself; the Action is playable without a qualifying event for Draw 1. Costs paid before effects. Track event history independently of the returned card's subsequent location; no extra restrictions approved. Test cost efficiency with cheap return enablers and empty-deck threshold sequencing.

Active pool remains 32 designs; character/type/cost counts unchanged. Remaining DESIGN closure:
1. Whole-set Magical assignments, with Rabbit/Dove initial assignments already approved.
2. Birthday Party Magician's passive review and Breaking Point design.
3. Explicit disposition of fragile high-Power/Cloak concept and Rabbit/Dove named deck-search/direct-deployment brainstorm (not current rules/cards).
4. Final combined ability/cost sanity review and 40-card copy distribution. Working ○ names accepted earlier can be refined optionally; no active ★ remains after this batch.

IMPLEMENTATION/VERIFICATION afterwards: stable IDs for Trap Door/The Headliner, duplicate Volunteer/Lady migration, CARDS/DECK/rule/UI/engine/AI parity, tests/browser checks and balance/human playtests. Preserve Reckless/Stonewall. Still design-only; do not infer a deployment request.

## Card Counter and Leader passive review — 8 October 2026

- **P039 Sleight-of-Hand Artist → Card Counter:** name LOCKED by Joseph. Unchanged Cost 4, 2/4/2; played top-3 split into hand/top/bottom.
- Joseph accepted the other outstanding working names in the preceding message: Opening Act, Stagehand, Disappearing Assistant, Card Shark, Street Magician and Quick-Change Artist. Their name-review flags are resolved for this pass; no mechanical changes.
- **CURRENT production Birthday Party Magician passive**, verified in web/engine.js: “Ace Up My Sleeve: Once during your Turn, when your Character is Returned to hand, Ready 1 Stash.” This is current browser text/behavior; NOT the physical sneaking IDEA in lab/LEADER_PASSIVES.md.
- The passive's Ace Up My Sleeve title now overlaps the approved draw Action name. Passive title/revision remains unapproved until Joseph decides; no Leader effect changed in production.
- Leader passive and Breaking Point review remains open. All 32 active card names are now accepted; remaining work is trait/Leader/concept/deck review followed by implementation/testing.

## Birthday Party Magician passive — LOCKED 8 October 2026

**The Show Must Go On:** “Once during your turn, when a character you control is returned to your hand or Dismissed, Ready 1 Stash.”

Joseph approved the broadened passive and title. Supersedes the design-level return-only Ace Up My Sleeve passive. Ace Up My Sleeve remains the cost-3 Draw 2 Action.

- First qualifying actual movement during your turn triggers; return and Dismiss share ONE use, not one each. No opposing-turn activation, no stacking uses from multiple Characters.
- Character must have been under your control immediately before leaving play. Return branch requires destination your hand; borrowed Characters returned to their owner's opposing hand do not qualify. Dismiss branch may qualify for a controlled borrowed Character going to its owner's discard.
- Actual Dismiss/return required: prevented movement (e.g. Stubborn) does not trigger. Defeat/Sacrifice and hand discard do not qualify. No recursion from Stash exchange or Item movement.
- Ready a chosen eligible Rotated Stash card; normal per-card identity/state handling must be implemented. No Stash added and no permanent ramp. Passive's once-per-turn use is consumed by its first qualifying trigger even if no Rotated Stash is available, consistent with the proposed automatic first-event model/current production passive; don't change this timing silently.
- Supports bounce and Now You Don't / Disappearing Assistant / Trap Door. Once-per-turn resource refund remains a testing parameter.
- DESIGN LOCK ONLY: existing web/engine.js still uses earlier return-only passive until implementation. No browser/engine edits in this update. Breaking Point remains open.

## Birthday Party Magician Breaking Point — LOCKED 8 October 2026

**For My Next Trick…:** “You may return a character you control to your hand. Then you may play a character costing 3 or less from your hand without paying its cost.”

Joseph chose this proposal. Triggers once at the first above-10 to <=10 Composure crossing, under protected threshold timing. The return and deployment are independent optional instructions; deployment does not require returning a Character. Resolve return and resulting triggers before choosing the hand deployment, so a returned eligible Character or a card drawn from a leave trigger may be played. Normal entry restrictions and entrance/when-played abilities apply. During the opponent's turn no voluntary attack/activation/Trouble window is added. Defeated Characters cannot be recovered from discard by the return instruction. If both Breaking Point and Last Straw cross, Breaking Point resolves first per core rules.

**BANKED alternate — Is This Your Card?:** “Look at the top 5 cards of your deck. Put up to 2 into your hand and the rest on the bottom in any order.” Keep specifically as an alternate Magician Breaking Point if testing shows hand refill more impactful than return/deployment. Not an additional ability/card and not active. No production implementation made here.

Leader passive and Breaking Point design are now approved. Next review whole-set Magical eligibility; unresolved fragile high-Power/Cloak and named Rabbit/Dove search concepts need include/bank decisions; then 40-card copy distribution and final interaction review. Implementation/testing remains pending. Pool remains 32 active cards; Leader outside deck.

## Magical eligibility — LOCKED 8 October 2026

Joseph approved adding Magical to Magician's Assistant (P061), Escape Artist (P065) and Disappearing Assistant (LAB-MAG-003). Together with already-approved Rabbit (P063) and Dove (LAB-MAG-006), these are the **five Magical Characters in the current active set**.

Magical is a trait, not a keyword. Preserve existing other traits; Rabbit/Dove retain Animal. No other active Character gains Magical in this pass. Magician's Hat may target any friendly member of these five, under its locked cost-3 / Rotate plus spend 1 Stash activation. All other mechanics, names, costs, stats and the 32-card count remain unchanged. This closes the initial whole-set Hat eligibility decision; changes require an explicit later tuning decision.

Remaining design closure: decide include/rework/bank for fragile high-Power/Cloak concept and explicitly bank/review named Rabbit/Dove deck search; then final interaction review and 40-card copy distribution. Leader passive, Breaking Point, names and initial curve are approved. Implementation/testing remains pending.

## Spy-set concepts banked; Magician concept decisions closed — 8 October 2026

Joseph explicitly BANKED BOTH remaining concepts for the next Misdirection Spy Leader:
- **Cloak / fragile high-Power Character:** retain the stealth/survival direction for Spy, including the prior fragile high-Power concept. Cloak's exact rules, stats, cost and timing remain OPEN; it is not an active Magician card or current keyword.
- **Declare-and-search:** evolve the earlier Rabbit/Dove search brainstorm into “declare a card, then search your deck for it.” Fits Spy intelligence/target acquisition. Exact declaration procedure, permitted card names/types, cost, destination, reveal verification, shuffle, failure handling and limits remain OPEN. No automatic direct/free deployment approved and no active Magician tutor added.

Spy bank now includes **Inconspicuous Bush** (hidden hand-tucked Character concept), **Identity Thief ○** (preserved keyword-copy design), **Cloak**, and **declare-and-search**. Preserve banks separately from active rules.

Current Magician active pool remains **32 locked designs: 19 Characters / 10 Actions / 3 Items**. Names, curve, five Magical assignments, Leader passive and Breaking Point have been approved. Current-set concept inclusion decisions are closed; these two are no longer unresolved Magician slots.

Next: concrete 40-card testing/coverage deck and final interaction review, then separately requested implementation and verification. All revised Magician mechanics still design-only; do not claim browser/simulator parity before implementation.

## Implementation checklist for later

1. Finish actions/items and finisher/curve/names before assuming set size finalized. Current active approved counts: 19 Characters + 10 Actions + 3 Items = 32. Finisher is locked; character curve and whole-set Magical eligibility remain to review; Burner Phone ★ and Do Not Look in the Hat are tabled. Pirate is now locked and included.
2. Retrieve latest remote CARD/DECK/rule state. Apply this record's final approvals, not obsolete baseline values or superseded proposals. Keep IDs stable where possible; explicitly migrate duplicate references.
3. Update CARDS.json, DECKS.json, builder text, engine effects, AI choices, tests, rules and NOTES when authorized to implement. Do not claim functional verification before running it.
4. Test entrance vs play wording for direct deployments; borrowed ownership and trigger controller; Hothead copying; temporary Power expiry; bounce clears board damage/buffs appropriately; optional choices; deck shortfalls; cost payment and per-slot Stash state; hidden-hand choice privacy; Poof one-use expiry; scheduled effects following source departure without retrieving a new incarnation of a card.
5. Preserve published Reckless and Stonewall behavior. Return borrowed cards to OWNER zones. Absorb uses highest applicable value, not addition; Retaliate still deals its damage even when defender is Defeated. Ready/Rotated and turn-entry restrictions still apply unless explicitly overridden.
6. Run mechanic regression tests, all-card coverage matches and browser checks. Then compare balance without tuning from a single AI matchup.

## Suggested opening prompt for the new chat

Continue Unhinged's Misdirection/Birthday Party Magician audit. Read MISDIRECTION_AUDIT_HANDOFF_20261008.md in jobeck17/unhinged. Manager is now locked at 2 cost: return an opposing Item, Draw 1, no cost cap; its name is flagged ★. Burner Phone ★ and Do Not Look in the Hat are now tabled. Beer-Stained Cards ★ is locked at cost 2: Rotate this Item and spend 1 Stash, Draw a card. Magician's Hat is locked at cost 3: Rotate this Item and spend 1 Stash, Return a Magical Character you control to your hand. Rabbit and Dove initially gain Magical alongside Animal; review the whole set for final eligibility. New finisher is locked at cost 6, 4/5/3: first time each turn another friendly Character is returned from play to your hand, gets +2 Trouble this turn. Name now locked as The Headliner; ID pending. Next review the character curve, ability distribution, Magical assignments and the locked Pirate's Item-release interactions. Use batches of three where possible and preserve all locks/name flags. Revised Misdirection cards have not been implemented yet.
