## Misdirection active-pool tables — locked 8 October 2026

Joseph approved all three table decisions:
- **P070 Tech Bro ★:** TABLED for a future set. Preserve approved Cost 3, 3/2/2, “When Defeated, draw a card.” No migration of ability onto another active Character.
- **P071 Trapdoor Assistant:** TABLED. Preserve approved Cost 3, 1/2/1, optional opposing Character return costing <=3 when played. Its absence removes repeatable entrance bounce, while Lady/Wrong Address retain opposing bounce. No merge approved.
- **P074 Identity Thief ○:** BANKED for the next Misdirection Spy set. Preserve approved Cost 5, 3/4/2, optional copy of another Character's one printed keyword while that Character remains in play. No trait copying. Preserve ○.

Current Magician active pool: **33 locked designs = 20 Characters / 10 Actions / 3 Items**. Character curve costs 1–6: **3 / 4 / 5 / 5 / 2 / 1**. Unique cost/type counts (Character/Action/Item): 1 = 3/3/0 (6); 2 = 4/5/1 (10); 3 = 5/2/2 (9); 4 = 5/0/0 (5); 5 = 2/0/0 (2); 6 = 1/0/0 (1).

Keeps four innate Hothead Characters, two innate Sucker Punch Characters and two immediate-Trouble designs. Trap Door still has two friendly-Dismiss enablers. Tables are pool decisions, not deletion of approved designs. Other locks/name flags preserved. Current production CARDS/DECK/engine remain earlier versions until implementation. Magical whole-set review, naming, Leader audit and unresolved fragile Cloak-character concept remain open.

## Misdirection support batch — locked 8 October 2026

- **LAB-MAG-003 Birthday Boy ★:** Cost **3**, **2/3/2**. “When played, you may Dismiss another character you control. If you do, draw a card.” Supersedes the locked cost-2 2/1/2 vanilla version. Keeps ★. Friendly Dismiss requires another Character; draw only if it was actually Dismissed. Dismiss is not Defeat. Rabbit/Dove leave-play triggers and Trap Door capture may apply.
- **P078 Pirate With a Business License ○:** Cost **5**, **3/4/2**, **Sucker Punch**. “This character may Cause Trouble the turn it enters play if played from under an Item.” Replaces BOTH old production opponent-choice free-deployment and the never-approved once-per-turn proposal. Keeps ○. No Hothead granted; Sucker Punch does not permit an ordinary entry-turn Attack. Immediate Trouble permission applies only to the instance played from under an Item and still requires Ready/positive Trouble. Trap Door release qualifies; ordinary hand play, Pick a Card or borrowed-deck play does not.
- **Pool now 36 locked designs:** 23 Characters / 10 Actions / 3 Items. Character curve costs 1–6: **3 / 4 / 7 / 5 / 3 / 1**. Unique all-card cost/type counts: 1 = 3/3/0 (6); 2 = 4/5/1 (10); 3 = 7/2/2 (11); 4 = 5/0/0 (5); 5 = 3/0/0 (3); 6 = 1/0/0 (1). Types listed Character/Action/Item. Pirate is now included; finisher remains a separate design.
- **Support gained:** Trap Door has two friendly-Dismiss enablers (Now You Don't and Birthday Boy); two innate Sucker Punch Characters (School Bully and Pirate) plus Identity Thief copying; two immediate-Trouble designs (Script Kiddie and conditional Pirate). Birthday Boy adds optional draw support.
- **Testing:** Birthday Boy's replay/Dismiss/draw and Trap Door return may be strong value; Pirate turns Item release into immediate Trouble. Compare actual resource/board costs and loop readiness. Character curve now crowds cost 3; review unique roles and 40-card copy counts before proposing further moves.
- Remains design-only, not implemented/tested in playtest. Other locks/name flags, Spy/Bush bank and unresolved Cloak concept preserved.

## Misdirection curve batch — locked 8 October 2026

Joseph approved all three proposals:
- **P076 Wi-Fi Bandit ★:** Cost **1**, **1/1/1**, Hothead.
- **LAB-MAG-001A/B Very Enthusiastic Volunteer ○:** Cost **1**, **1/1/1**, unchanged optional +1 Power this Turn to another friendly Character on entrance or return from play to your hand. Consolidate duplicate IDs later.
- **P066 Off-Duty Clown ★:** Cost **3**, **2/4/1**, unchanged draw 1/discard 1 whenever another friendly Character returns from play to your hand.

These explicitly supersede the earlier curve/stat locks. Approved pool remains 35 designs: 22 Characters, 10 Actions, 3 Items.
Cost/type counts (unique designs, not deck copies): Cost 1 = 3 Characters/3 Actions/0 Items (6); Cost 2 = 5/5/1 (11); Cost 3 = 6/2/2 (10); Cost 4 = 5/0/0 (5); Cost 5 = 2/0/0 (2); Cost 6 = 1/0/0 (1).

Next review support gaps without silently altering locks: Trap Door currently only catches friendly Dismiss from Now You Don't; Sucker Punch only innate School Bully plus Identity Thief copying; immediate Trouble only Script Kiddie. Existing draw/filter and entrance effects are well represented. Additional proposals remain unapproved. All Misdirection revisions still await playtest implementation and testing.

## Misdirection — three-card Trap Door machine locked — 8 October 2026

- **APPROVED DESIGN REVISION — P086:** rename Switcheroo to **Now You Don't**. Keep its current cost-2/equal-or-lower opposing-character selection framework unless subsequently revised, but move both selected Characters from play to their owners' discard piles instead of returning them to hand. Use **Dismiss**, not Defeat: this preserves leave-play triggers without automatically firing Defeated abilities. This changes the prior bounce lock by Joseph's explicit instruction; no production implementation yet. Balance remains open because this is stronger opposing removal.
- Trap Door mechanics are now locked; see the full lock below. This supersedes the earlier open mechanism and the named-action recycling proposal.
- **BANKED NEXT SET — Inconspicuous Bush:** reserve for the next Misdirection Leader, a **Spy**, explicitly requested by Joseph. Explore loading a Character from hand face-down/tucked beneath it, with behavior changed for that set. Earlier cost-3 and release wording were assistant proposals, not locks. Do not add Bush to the current Magician pool.
- Preserve all other Misdirection locks and naming flags. Revised cards remain documented design decisions awaiting implementation; the current full audit record is MISDIRECTION_AUDIT_HANDOFF_20261008.md.

**LOCKED FOR TESTING — Trap Door (new ID pending), Cost 3 Misdirection Item:**

“Whenever a character you control costing 5 or less is Dismissed, you may put that card from your discard face-down under this Item if there is no card under it.
Rotate this Item and spend 1 Stash: Play the character under it without paying its cost.”

Persistent engine; one stored Character per copy. Enters Ready under core Item rules. Capture is optional and only for a Character just Dismissed while this Item is in play; not generic discard-pile retrieval, Defeat, Sacrifice, Return or hand discard. Controller chooses among simultaneous catch triggers; the same card cannot be caught by multiple copies. Owner may inspect their stored card; source and movement came from a public Dismiss event, so face-down storage does not erase previously known information. Stored card is not in play and cannot act or trigger in-play abilities.

Release empties the storage slot and triggers normal entrance/when-played effects; normal Character entry restrictions apply. No Hothead or immediate Trouble is granted by Trap Door. Rotate/payment limits activation; no extra once-per-turn cap approved. If Trap Door leaves play, its stored Character goes to its owner's discard. Release/cleanup and instance tracking require engine tests. Distinct from locked Trapdoor Assistant.

**INTENDED THREE-CARD MACHINE:** Rabbit in play + established empty Ready Trap Door. Now You See Me (2): Return Rabbit, draw 1, play Dove free, optionally deal 1 damage. Now You Don't (2): Dismiss Dove and an opposing Character costing <=2; Dove may deal 1 exit damage, Trap Door may store it. Activate Trap Door (1 Stash): play Dove free, optionally deal 1 entrance damage. Total 5 Stash that turn, plus previously paid Item setup cost 3. End with Rabbit in hand and Dove in play. Dismissed enemy must actually leave; Stubborn and other prevention can alter outcomes. No claim of tested balance or implemented engine behavior.

## First Reckless / Stonewall head-to-head — 8 October 2026

400 deterministic production-engine AI games, alternating seats and first player: HOA 224 wins (56.4% of 397 completed); Florida 173 (43.6%). Three exhausted-deck, no-Character endgames reached the round cap: flag a future tie/stalemate-rule discussion, without adding a rule now. Finished games averaged 9.6 rounds; median 9; first-player win rate 48.1%. Broad coverage lists and basic AI, not a balance verdict. No nerfs or other tuning applied. Reproducible script and full results: web/headtohead.sim.mjs, HEAD_TO_HEAD_20261008.json, HEAD_TO_HEAD_20261008.md.

## Stonewall committed audit — 8 October 2026

This section is the latest Stonewall source of truth and supersedes older suggestions below.

- Locked cards preserved: **33 unique** (21 Characters / 9 Actions / 3 Items); prior chat count missed Bicycle Cop added beside the moved Committee. No approved card silently cut. Open follow-up: choose one to table if keeping 32 cards plus slot 33 open.
- Coverage deck: **40 cards**, all 33 once plus an extra Off-Leash Dog, Grumpy Old Guy, Mall Walker, Crossing Guard, Church Usher, File a Complaint, and Take a Breather. This broad coverage deck is not a tuned competitive deck.
- Leader passive unchanged: Round 8 +1 Trouble. HOA Final Warning and Florida Man’s D6 Breaking Point are locked/implemented.
- Meat Shield is the new keyword name. Absorb uses highest value. Retaliate now works even when its defender is Defeated, matching the audit’s one-use Marine role.
- Grandma heals on every actual Ready transition; Old Dog only during its Ready step. Lawn Chair / Take a Breather restore Ready but prohibit further Attack/Trouble that Turn.
- **Tabled:** Unpaid Dues (provisional Cost 5 catch-up Stash discard), Neighborhood Newsletter (insufficient Ready-trigger support), old Cigarette Case effect. No current Stash-removal card was added. Mass bounce was replaced by limited Absolutely Not.
- **Cross-style follow-up:** Reckless Lifeguard and Helicopter Mom share a Ready Absorb aura. Both remain locked; revisit overlap after other styles are audited. Multiple Lawyers/Founders and repeatable healing need balance testing.
- Browser is implementation-tested. Other styles and simulators need their own parity audits. Last Straw content pool remains pending. All balance conclusions await cross-style simulation and human playtesting.

| ID | Card | Cost | Power / Health / Trouble | Text |
|---|---|---:|---|---|
| P072 | Helicopter Mom | 5 | 2/5/2 | While this Character is Ready, your other Characters have Absorb 1. |
| P083 | Neighborhood Bylaws | 2 | Action | An opponent Discards a card. They choose the card. |
| P121 | Grumpy Old Guy | 2 | 1/3/1 | Absorb 1. |
| P122 | HOA Enforcement Committee | 4 | 2/5/1 | When played, you may Rotate a chosen opposing Character. That Character cannot Ready during its controller’s next Ready step. |
| P124 | Mall Walker | 2 | 1/4/2 | No ability. |
| P125 | Concerned Citizen | 4 | 2/4/2 | Whenever an opponent plays an Action or Item, this Character gets +1 Power until the end of your next Turn. |
| P126 | Crossing Guard | 2 | 1/3/1 | Meat Shield. You may play this Character Rotated. |
| P127 | PTA President | 4 | 2/4/2 | When played, heal up to 2 damage from another chosen friendly Character. If you healed any damage this way, Draw a card. |
| P128 | Retired Marine Next Door | 3 | 3/2/2 | Retaliate. |
| P129 | HOA Vice President | 4 | 2/5/1 | Meat Shield. Retaliate. |
| P130 | Nosey Neighbor | 5 | 2/5/2 | Once during each opponent’s Turn, when one of their Characters Causes Trouble, Draw a card. |
| P131 | Old Dog | 3 | 1/5/2 | When this Character Readies during your Ready step, heal 1 damage from it. |
| P132 | Grandma | 5 | 2/5/2 | Whenever this Character Readies, heal up to 2 damage from another chosen friendly Character. |
| P133 | Gated Community Security | 6 | 3/7/2 | Meat Shield. Retaliate. |
| P134 | Church Usher | 2 | 1/2/1 | When played, Draw a card. |
| P135 | Mall Cop | 4 | 2/5/1 | While this Character is Ready, opposing Characters with Hothead get −1 Power. |
| P136 | Tow-Truck Driver | 5 | 3/5/1 | When played, you may Dismiss a chosen opposing Item costing 3 or less. |
| P137 | HOA Lawyer | 5 | 2/5/2 | Opposing Actions that target one or more of your Characters or Items cost 1 more. |
| P138 | Neighborhood Watch | 2 | 2/2/1 | Retaliate. |
| P139 | File a Complaint | 1 | Action | A chosen opposing Character gets −2 Power until the start of your next Turn. |
| P140 | Not in My Neighborhood | 2 | Action | A chosen opposing Rotated Character cannot Ready during its controller’s next Ready step. |
| P141 | Absolutely Not | 3 | Action | Return a chosen opposing Character costing 3 or less to its owner’s hand. |
| P143 | Violation Notice | 4 | Action | Dismiss a chosen opposing Rotated Character costing 4 or less. |
| P144 | Peace and Quiet | 2 | Action | Restore 3 Composure to your Leader. Unless they’re at Last Straw—then the opposing Leader loses 3 Composure instead. Oh… they’re at Last Straw too?! Draw a card, I guess. |
| P145 | Dig In | 2 | Action | Your Characters have Absorb 1 until the start of your next Turn. If an opponent has more Characters than you, Draw a card. |
| P146 | Wait Them Out | 2 | Action | Play only if you haven’t Attacked this Turn. Draw 2 cards. You cannot Attack this Turn. |
| P147 | Security Camera | 2 | Item | Rotate: Look at the opposing player’s hand. |
| P148 | Lawn Chair | 2 | Item | Rotate this Item and spend 1 Stash: Ready a chosen friendly Rotated Character. That Character cannot Attack or Cause Trouble again this Turn. |
| P149 | Patio Umbrella | 2 | Item | Attach to a friendly Character. While the attached Character is Rotated, it has Absorb 1. |
| LAB-HOA-001 | Off-Leash Dog | 1 | 1/3/1 | No ability. |
| LAB-HOA-002 | Bicycle Cop | 3 | 2/4/2 | When played, you may Rotate a chosen opposing Character costing 2 or less. |
| LAB-HOA-003 | Community Founder | 7 | 3/7/3 | While your Leader is at Breaking Point or Last Straw, your other Characters get +1 Trouble. |
| LAB-HOA-004 | Take a Breather | 1 | Action | Ready a chosen friendly Rotated Character. That Character cannot Attack or Cause Trouble again this Turn. |

## Reckless 32-card baseline and browser implementation — 7 October 2026

- **LOCKED — 32 current-set Reckless cards, slot 33 reserved.** User will fill the last slot after other Style passes and testing. All 18 Characters, 9 Actions and 5 Items are marked testing and included in the coverage deck. No further balance changes made.
- **TABLED — Life Jacket renamed Safety Goggles (LAB-FLM-006):** retain Cost 2 / attached Absorb 1 as banked next-set candidate, potentially Scientist. Exclude from current pool/deck. Dirty Needle still pending; Fireworks banked next set; Floor It retired; Hot Potato unassigned.
- **40-CARD COVERAGE DECK:** all 32 cards once, plus an extra copy each of P001 Feral Chihuahua, P017 Vape Kid, P004 Boogie Boarder, P005 Unsupervised Toddler, P016 Amateur Storm Chaser, P012 Spring Break Frat Bro, P021 Victory Lap, LAB-FLM-007 Did You See That?!. Replaces old Bad Decisions self-damage baseline. Broad coverage is deliberate; no competitive tuning claims. Curve: 10 Cost 1, 15 Cost 2, 7 Cost 3, 3 Cost 4, 3 Cost 5, 1 Cost 6, 1 Cost 8.
- **IMPLEMENTED — production browser:** current Florida Man Attack-defeat Composure passive; all 32 card effects; next-Attack and Turn expiry; actual Ramp Trouble at Attack declaration without survival gate; live Driver/Sucker Punch/Trouble attachments; Lifeguard highest-only Absorb; all dice faces and optional rerolls; visible dice result/history; legal target choices before costs; retired/pending/banked cards cannot be played. Shared combat respects keyword-only Retaliate and Ready target protection. Existing other Style implementations retain their own audit boundaries.
- **VERIFIED — automated:** all 32 cards in 307 targeted checks including every die face, and full-deck integration games with card conservation and progressing AI actions; existing browser, builder and poll checks. New regression test runs in Pages CI. Browser/deployment verification follows the commit. These are behavior checks, not balance simulations. Unique Breaking Point and Last Straw effects remain unfinalized content, clearly labeled in playtest.
- **DEPLOYMENT FIX:** Pages now copies all production browser modules, including Magician/Cat/Rock Star/Landon/Reckless imports; multiline syntax checks corrected. Cache versions updated to load current engine/data.

## Watch This and Item diversification — locked 7 October 2026

- **LOCKED FOR TESTING — Hey Y’all, Watch This! (P024), Cost 1:** choose friendly Ready Character, roll d6. 1 Rotate it; 2–5 choose +3 Power OR +1 Trouble this Turn; 6 both. Optional one reroll after 2–5, replacing first result; final result only. Supersedes +4/+2 numbers. All nine current-set Actions now locked; Fireworks remains banked next set, Floor It retired.
- **LOCKED FOR TESTING — Roman Candle (P028), Cost 2 Item:** “Attach to one of your Characters. It gets +1 Trouble.” Deletes damage activation and Scout exception. No table/removal of this card. Normal attachment stacking applies; Trouble grant does not override ordinary eligibility or printed restrictions.
- **LOCKED FOR TESTING — Truck Nuts (LAB-FLM-004), Cost 1 Item:** “Attach to one of your Characters. It has Sucker Punch. If it has Driver, it gets +1 Power.” Sucker Punch granted to any wearer, +1 Power only for Driver. Supersedes +1 universal / +2 Driver boost. Three existing Driver assignments remain unchanged.
- **TABLE DECISIONS OPEN:** user unsure what to table. No additional removals approved. Dirty Needle remains unresolved, and previous suggestion to table for Scientist is not a lock. Six Items now locked; Dirty Needle seventh remains pending effect. Consider reserving Dirty Needle for Scientist's later audit while retaining the six distinct locked Items for Florida pool/deckbuilding flexibility. No fixed Item quota and no need all six appear in a 40-card deck.
- **COUNTS:** current-set pool excluding banked Fireworks and retired Floor It: 34 entries (18 Characters, 9 Actions, 7 Items), including pending Dirty Needle. Locked baseline pool if excluding pending Dirty Needle: 33 entries (18 / 9 / 6). Historical/banked Reckless entries not current-set baseline. Digital parity and actual balance tests remain pending.

## Action completion pass — 7 October 2026

- **LOCKED FOR TESTING — A MILLION KILOGRAMS OF CAFFEINE!!!! (LAB-FLM-002), Cost 3:** “Choose one of your Characters. It gets +5 Power, Hothead, and Sucker Punch this Turn. After its next Attack this Turn, Defeat it.” Explicit next-Attack timing clarifies disposable missile. Digital parity pending.
- **LOCK RECONFIRMED — SPRING BREAK!!! (P020), Cost 2:** Ready friendly Rotated Character that attacked this Turn, +2 Power and cannot Cause Trouble this Turn.
- **TABLED FOR NEXT SET — Fireworks Incident (P023):** preserve as Reckless / banked, excluded current-set baseline. Future Scientist package remains potential, not a transfer. No baseline deck references it.
- **ONE ACTION DECISION REMAINS:** Hey Y'all, Watch This! currently +4 Power OR +2 Trouble on 2–5 and both on 6, with optional reroll. Assistant suggested +3/+1, not approved or applied. Do not call all Actions locked. Nine current-set Actions excluding Fireworks: eight locked, one open.
- **ITEM STATUS:** seven Reckless Items; five locked (Truck Nuts, Pills, Ramp, Bolt Cutters, Life Jacket), two unresolved (Roman Candle legacy Scout text, Dirty Needle pending effect). No table decision for either has been approved. All locks are isolated-deck testing baselines.

## Did You See That?! — locked 7 October 2026

- **LOCKED FOR TESTING — LAB-FLM-007, Did You See That?!, Cost 2 Action:** “Draw a card. If one of your Characters Defeated an opposing Character with an Attack this Turn, Draw another.” User locks the name following the tiered proposal. Always playable during normal own main Turn; Draw 1 baseline, Draw 2 total after qualifying Attack Defeat, no scaling per Defeat. Supersedes Spoils of the Brawl name and play-only-if restriction. Digital parity and balance testing remain pending.

## Spring Break and combat draw locks — 7 October 2026

- **LOCKED FOR TESTING — SPRING BREAK!!! (P020), Cost 2:** “Ready one of your Rotated Characters that attacked this Turn. It gets +2 Power and cannot Cause Trouble this Turn.” User moves the proposed Floor It! effect here. Retires earlier proposed Cost 3 / team Trouble boost and legacy Response concept. Allows another Attack, not Trouble conversion.
- **RETIRED — Floor It! (P025):** removed from active Reckless pool, blank active effect, status retired and Style Unassigned. Previous legacy Ready/deal 2 text preserved only as retired reference. Proposed effect now belongs to P020. No current deck references P025.
- **LOCKED DRAW EFFECT FOR TESTING — Spoils of the Brawl (LAB-FLM-007), Cost 2 Action:** “Play only if one of your Characters Defeated an opposing Character with an Attack this Turn. Draw 2 cards.” User approved combat-conditioned draw and requested a less clunky Florida-flavored Spoils of Battle name; Spoils of the Brawl is working name, can revisit. Attack Defeat condition deliberately explicit because “win a fight” is not a defined rule. Single Draw 2 per Action, not per defeated Character. Existing Boogie Boarder, Zookeeper and Walk It Off provide complementary draw.
- **COUNTS:** remains 35 active Reckless Character/Action/Item entries: 18 Characters / 10 Actions / 7 Items. Added one Action and retired one. Digital parity, deck reconstruction and actual balance testing still pending.

## Forward planning — Mad Scientist as possible Reckless Leader, 7 October 2026

- **USER DIRECTION / NOT YET LOCKED:** consider Mad Scientist as the next Reckless Leader; plan shared pool with Scientist in mind and give some tabled cards a possible future home. Current RULES still classify Scientist as Gambler; no Leader/Style/card transfers or Gambler retirement applied.
- **RECOMMENDED STYLE UMBRELLA:** commit aggressively, accept danger/instability, exploit temporary Power and bodies. Florida Man rewards Attack victories with Composure loss; Scientist could invest cards/resources into unpredictable creations and then unleash them. Attack-to-Composure passive remains Florida Man-specific, not a blanket Reckless rule. Florida stereotypes are Florida Man's theme; irresponsible experiments expand Reckless's themes without requiring every Scientist card to be Florida-themed.
- **CURRENT SCIENTIST COMPONENTS TO AUDIT LATER:** independent Power/Health rolls for Abominations, Experiment Actions, two Character Discard cost on It's Alive!, Parts/ingredient Characters, Specimen creation, recharge cards, recovery. Read current Leader battery/Burnout text when performing its actual audit; do not redesign Leader here. Existing SCI cards remain Lab and current deck Gambler until classification decided.
- **PROMISING SHARED SUPPORT:** Hold My Beer lets new creations attack; Truck Nuts offers reliable Power even without Driver; Life Jacket protects fragile high-Power rolls; Walk It Off stabilizes surviving bodies; Floor It! proposal supports another swing; Bottle Rockets sets up kills; Caffeine spends a body for a powerful Attack. Victory Lap works with Scientist too but Scientist does not inherit Florida Man's passive.
- **TABLE FOR SCIENTIST AUDIT, NOT SCRAP:** Dirty Needle (disease pressure), Bath Salts (mutation/unstable enhancement, Undead undecided), Button Marked DO NOT PRESS (dangerous apparatus), Roman Candle (damage setup/repurpose), Fireworks Incident (collateral experiment/rename possible). These are possible thematic/mechanical homes, not transfers or locks. Needles' bookkeeping concern persists despite theme fit.
- **POOL / DECK DISTINCTION:** several Reckless Leaders can use subsets of shared Style pool; no need every card fits Florida Man baseline. User's preference for a few Items is a Florida deckbuilding question, not an automatic Style pool ceiling. Previously suggested 32-card total/cuts are reconsiderable recommendations, not approved removals.
- **GUARDRAILS:** generic Reckless tools vs small Scientist-specific Experiment/Part/recharge package; no generic safe unlimited ramp, recovery loops or ubiquitous rerolls without an audit. Create clear mutation/stunt payoffs and normal counterplay. Don't change locked Florida Character stats/passive or rebuild Scientist until its deliberate pass. Actual balance through parity-backed simulations/human tests later.

## Life Jacket lock and proposed final cuts — 7 October 2026

- **LOCKED FOR TESTING — Life Jacket (LAB-FLM-006):** Cost 2 Reckless Item. “Attach to one of your Characters. It has Absorb 1.” Highest-only Absorb applies, including Lifeguard overlap; digital parity pending.
- **CURRENT COUNT:** 35 unique Character/Action/Item entries: 18 Characters, 10 Actions, 7 Items. Eighteen Characters and 10 Actions/Items explicitly locked in this pass; 7 other Actions/Items await decisions. No suggested cuts below applied.
- **RECOMMENDATIONS ONLY:** keep proposed SPRING BREAK!!! (Cost 3; after friendly Attack Defeat this Turn, team +1 Trouble this Turn), Floor It! (Cost 2; Ready friendly Character that attacked this Turn, +2 Power, cannot Cause Trouble this Turn), and existing Caffeine (Cost 3; +5 Power, Hothead, Sucker Punch, Defeat after next Attack this Turn). Revisit Hey Y'all, Watch This! with +3 Power OR +1 Trouble for 2–5 and both on 6, same Rotate on 1 and optional reroll; smaller proposed numbers not applied.
- **RECOMMENDATIONS ONLY — TABLE:** Dirty Needle recurring disease damage, Roman Candle repeat chip damage. Preserve for later; prioritize simpler Bottle Rockets and current protection/stunt Items in first baseline.
- **RECOMMENDATIONS ONLY — CUT FROM RECKLESS:** Fireworks Incident, redundant with Bottle Rockets and combat setup, friendly damage not required as deck engine. Bank its name/idea rather than delete. Previously proposed simplification remains 2 opposing / 1 friendly damage at Cost 2, not applied.
- If these three removals are approved later: 32 total, 18 Characters / 9 Actions / 5 Items. Five retained Items would be Truck Nuts, Gas Station Pills, Bolt Cutters, Homemade Launch Ramp, Life Jacket.
- Cross-Style additions Bath Salts, Button Marked DO NOT PRESS, Pool Guy and Stunt Double remain banked/open, not added automatically. No fixed Style quota chosen.

## Latest Reckless Action / Item decisions — 7 October 2026

This section supersedes older Reckless entries below. Numbers are isolated-deck testing baselines; digital parity and simulation/human balance remain pending.

**LOCKED FOR TESTING:**
- P019 Hold My Beer, Cost 2: +3 Power and Hothead to a friendly Character this Turn; no Ready/self-damage. Consider +2 only with testing evidence.
- P021 Glory Days renamed **Victory Lap**, Cost 1: Ready a Rotated friendly Character that Defeated an opposing Character with an Attack this Turn; cannot Attack again this Turn.
- P026 Walk It Off, Cost 2: heal up to 2 from a friendly Character; Draw a card.
- P022 No, I'm Fine replaced by **Category 5**, Cost 8: deal 4 damage to every Character. Both boards; no Items. Damage Defeats do not trigger Florida Man's Attack-only passive. Full Dismiss and damaged-only wipe alternatives are banked.
- LAB-FLM-005 **Bottle Rockets**, Cost 1 Action: deal 2 damage to an opposing Character.
- LAB-FLM-001 Broken Lawnmower replaced by **Bolt Cutters**, Cost 2 Item: Dismiss this Item to Dismiss an opposing Item costing 2 or less. Three Start counter team-buff concept retired/banked.
- LAB-FLM-004 **Truck Nuts**, Cost 1 attachment: wearer gets +1 Power, or +2 total instead with Driver. Driver added to P002 Designated Driver, P006 Road Rage Ron, P015 Drunk Jet Skier; preserve other traits. No other Driver assignments locked. Attachment stacking applies normally.
- P027 **Gas Station Pills**, Cost 1 attachment: Rotate Item and roll d6; 1 Rotate wearer, 2–5 +1 Power this Turn, 6 +2 Power this Turn. Replaces former passive/Ready/self-damage mechanics.
- P030 **Homemade Launch Ramp**, Cost 2 standalone Item: choose friendly Ready Character; Rotate Item and roll d6. 1 Rotate Character; 2–3 next Attack this Turn +2 Power; 4–5 deal 2 damage to it; 6 next Attack this Turn +2 Power and actual Cause Trouble at Attack declaration using effective Trouble, without another Rotate. No survival condition. Other entry-Turn, positive Trouble and printed Trouble requirements remain. Does not grant Attack permission. Reusable Item; next-Attack riders expire this Turn. Overrides earlier attached/consumable/survival-gated proposals.

**LOCKED SCOPE / OPEN EFFECT:**
- Responses retired game-wide. Normal Actions own main Turn only, no voluntary Response windows. Automatic triggers remain. P020 SPRING BREAK!!!, P081 Look Over There!, P169 Take One for the Team are pending redesign; retired text is reference only and these are excluded from intended playtests until redesigned.
- LAB-FLM-003 **Dirty Needle**, Item (formerly Rusty Needle Action): disease replaces tetanus. User likes recurring damage/bleed but dislikes bookkeeping. Effect blank/pending redesign; Cost 2 is placeholder. Candidate attachment to opposing Character, deal 1 at start of controller's Turn, uses attachment as reminder; not locked.
- P029 **Hot Potato** removed from Reckless, preserved Unassigned/banked; destination and Composure-era redesign TBD. No baseline deck references it.

**UNLOCKED PROPOSALS / REQUESTS:**
- User wants attached Absorb protection; proposed **Life Jacket**, Cost 2, attachment grants Absorb 1. Name/cost/effect not locked. Highest-only Absorb rule means no stacking with Lifeguard Absorb 1.
- User wants Item variety (heal, boost, protect), potentially only a few Items. No quota or further removals locked. Healing currently supported by Walk It Off.
- Proposed P020 SPRING BREAK!!! Cost 3: after friendly Attack Defeat this Turn, team +1 Trouble this Turn. Not approved; active effect remains blank.
- Proposed P025 Floor It! Cost 2: Ready friendly Character that attacked this Turn, +2 Power, cannot Cause Trouble this Turn. Not approved; legacy Ready/deal 2 text remains active.
- Proposed P023 Fireworks Incident Cost 2: deal 2 opposing / 1 friendly, remove survivor branches. Not approved; old text remains.
- Proposed P028 Roman Candle: remove Scout exception/friendly damage, keep Rotate Item for 1 opposing damage. Not approved; old text remains and requires audit.
- Caffeine remains existing lab effect (+5 Power, Hothead, Sucker Punch; after Attack Defeat); not newly locked during this pass.
- Bath Salts requested for Reckless but still Expendable, redesign/transfer open; Undead direction undecided.
- Button Marked DO NOT PRESS risk/reward candidate remains Expendable, transfer/mechanic open; assess overlap with new Pills/Ramp.
- Unlicensed Pool Guy Florida theme and Stunt Double with new name remain cross-Style ideas, not transferred. Character pass otherwise complete; revisit only deliberately.

Current Reckless pool: 34 unique Character/Action/Item entries, 18 Characters / 10 Actions / 6 Items; includes pending-redesign SPRING BREAK!!! and Dirty Needle. Baseline 40-card deck reconstruction remains pending.

🐈🎸 **Landon deck sync · 6 October 2026:** Crazy Cat Lady Lab 1.3 / STANK-66 behavior is promoted into Mordecai, including Strength in Numbers, Shoebox/Shovel, Snowball, Hairy Cat, Three-Legged Cat, and Mittens III. Washed-Up Rock Star’s dedicated Carl-era lab is promoted as a Mordecai TESTING translation: Bad Publicity Is Still Publicity now triggers on actual Composure lost rather than Leader damage. Its decklist is unchanged and requires fresh Mordecai playtest evidence before balance conclusions.\n\n# CURRENT — Mordecai 0.4 promoted 6 October 2026

🔒 **Production promotion:** Composure 2.0 is now **Mordecai 0.4**, the canonical Unhinged build. Root `RULES.md`, `CARDS.json`, and `DECKS.json` are authoritative. The 40-question core-rules interview is complete and the core is feature-complete for this playtest.

🔒 **Current core:** Characters use **Attack / Health / Trouble**. Leaders use **20 Composure**, unique printed **Breaking Point** at 10, and one hidden shared-pool **Last Straw** revealed at 0. Leaders cannot be Attacked. Characters choose **Attack / Cause Trouble / Stay Ready**. Ordinary Attacks target Rotated Characters; Ready protects from ordinary Attacks only. Cause Trouble is not combat and cannot be Blocked. There is no universal retaliation and no universal Response system.

⚠️ **Audit boundary:** older notes below contain Carl rules, superseded lab rulings, and historical experiments. They remain temporarily as design history. **If anything below conflicts with RULES.md, RULES.md wins.** Do not restore an older ruling merely because it remains below.

🎩 **Magician sync · 6 October 2026:** Landon’s STANK INDUSTRIES-66 Birthday Party Magician package is promoted into Mordecai 0.4. Production now uses 6× Rabbit (2-cost 1/3), 3× Magician’s Hat (cost 4; returns Rabbit/Dove), 2× Dove (2/1, 0 Trouble; enter/leave -1 permanent Health), 2× Do Not Look in the Hat, Beer-Stained Cards, 3-Attack Escape Artist/School Bully, and the Volunteer without its old automatic post-Attack Return. Now You See Me, Tech Bro, and Burner Phone are out of the baseline Magician deck.\n\n🧹 **Next production pass:** reconcile terminology/rules references; audit all eight decks, all cards and abilities, Leader passives, Breaking Points, Last Straw pool, Ready effects, legacy Responses, Leader-damage/healing text, Retaliate, deck exhaustion, simulator parity, browser parity, and builder compatibility.

## Reckless pool review · 6 October 2026

## Reckless decision ledger · reconciled 7 October 2026

### Latest steering · 7 October 2026, 12:48 ET
- Return to card-by-card review; do not hold the whole pass for every remaining identity question.
- Working body profile proposed by user: moderately high Attack, lower Health, low Trouble; disposable punch-first threats, with exceptions and card-based support. Not a universal stat formula or permission for blanket edits. No universal retaliation means attacking does not itself consume/kill the body.
- Hothead additions to previously selected Characters are under review, not applied. Assistant recommends prioritizing Chainsaw Guy's eligibility/in-play timing when reviewing him; retain plain one-drops and Driver for now.
- Lock battle rewards on actual opposing Defeat by a friendly Attack; do not equate nonlethal combat survival with 'winning'. Allow base Trouble and conditional Trouble specialists to coexist so empty opposing boards do not make the deck nonfunctional.
- Broad damaged-Character execution theme is RETIRED. Item removal desired but bounded. Wipe is OPEN again, with full Dismiss, damaged-only removal, and costly Category 5 damage as competing candidates.
- Trouble modifiers/permission live on printed Character/Item/Action text, not a new universal rule.
- Isolated-deck creative pass continues; actual numerical balance follows simulations/human tests after parity. Review obvious role conflicts now without making untested win-rate claims.


This ledger governs this review. Earlier entries below are dated design history where they conflict with it. Do not turn proposals into current rules. Preserve prior candidates as BANKED/RETIRED rather than silently overwriting them. Do not add a new card proposal until the current decision is settled, except to explain concrete alternatives the user requests.

### CURRENT — explicitly confirmed and saved
- **Reckless Character pass COMPLETE:** user locks all 18 reviewed Character designs as the isolated-deck working baseline, with numerical balance still reserved for simulations/human tests and digital effects pending parity. No additional Character redesign is required before proceeding to Actions/Items.
- **Boogie Boarder:** replaces Bachelorette Party (P004), Cost 2, 2 Power / 1 Health / 1 Trouble. When Dismissed or Defeated, Draw a card; Return does not qualify. Cost-1 and 1/1/1 alternatives are banked, not current. Same ID; deck quantities unchanged. Bachelorette Party remains available as a future group-chaos concept.
- **Gator Wrangler:** replaces Minibike Menace (P018), Cost 6, 6 Power / 4 Health / 1 Trouble, Hothead. Once during own Turn, when his Attack Defeats an opposing Character, may Ready him; if used, he cannot Cause Trouble this Turn. No Sucker Punch or Wrestler Trait. The team-injury Power engine is removed. Name/effect selected for this pass; numbers and digital behavior still testing. This completes the Character pass except Bachelorette Party's pending redesign.
- **Sandbar Party Captain approved:** P011, Cost 5, 3/4/2. Once during your Turn, when another friendly Character Defeats an opposing Character with an Attack, may Ready Captain. User accepts the draft unchanged. Normal entry restrictions still apply; no extra Trouble permission. Numerical balance remains for later tests.
- **Drunk Jet Skier:** replaces Jet Ski Mechanic (P015), Cost 4, 4/3/1, Hothead. No-Wake Zone? — on Attack, may deal 1 damage to an opposing Character other than that Attack's target; if so, deal 1 damage to another friendly Character. Removes Builder/Item damage aura; Daredevil now fits the stunt role. Same ID preserves decks. Exact collateral targeting/Absorb interactions to verify in implementation/testing.
- **Style constraint:** no dedicated Item-synergy engine for Reckless. Items may enable stunts/support but should not require an Item-centric package; former Jet Ski Mechanic multiplier removed.
- **Terms locked:** Power is the Character combat stat; Attack remains the action. Power/Health/Trouble is the printed stat order. Absorb X reduces each dealt-damage event by X (minimum 0), is not consumed, and uses the highest value if granted multiple times. Put damage bypasses it. Shield/Deflect are banked naming alternatives. Canonical RULES/CARDS and active tool stat labels use Power; older review wording and historical labs retain their original labels.
- **Distracted Lifeguard:** replaces Pool Pirate (P008), Cost 4, 2 Power / 4 Health / 2 Trouble. While Ready, other friendly Characters have Absorb 1. Lose protection when he Rotates/leaves without adding past prevented damage. Existing damage is unchanged. Removes Pirate/Criminal Traits and old damaged-target effect. Saved for testing; engine behavior remains pending Mordecai parity.
- **Road Rage Ron:** P006 keeps his name and Cost 4; now 5/3/2. When he Defeats an opposing Character with an Attack, may Dismiss an opposing Item costing 2 or less. Replaces damaged-target +2 Attack. No Hothead added. Selected for this pass; balance evidence later.
- **Beach Bar Loudmouth:** replaces Amateur Electrician (P013), Cost 3, 2/3/3. Can Cause Trouble only if a friendly Character has Defeated an opposing Character with an Attack this Turn. One qualifying Defeat unlocks him for the rest of that Turn; it is permission, not an extra action, Ready, or early Cause Trouble. Remove Builder/damaged-state Attack bonus. Same ID preserves deck quantities.
- **Pet Alligator update:** P009 remains Cost 3, now 4/3/1. On Attack or Cause Trouble, roll d6; 1 cancels that action and own Leader loses a fixed 2 Composure, otherwise proceed. Attack modifiers do not increase the penalty. Approved for this pass; balance testing remains later.
- **Chainsaw Hothead:** P007 now has Hothead alongside Just Gotta Rev It, Cost 3, 2/3/1. The formerly failed save is completed. Frat Bro retains Hothead.
- Florida Man passive: Whenever one of your Characters Defeats an opposing Character with an Attack, the opposing Leader loses 1 Composure. No once-per-Turn cap; ordinary removal effects do not qualify.
- **Deck-design workflow:** work on each deck/Style in complete isolation during this creative/content pass. Build coherent roles, scaling, combos, and readable timing without claiming matchup balance or tuning against the other decks. Simulations (after engine parity) and human testing are the later stage for actual balance. Flag internal contradictions or nonfunctional combinations now; provisional numbers may remain until evidence supports tuning.
- Style: voluntary risk/reward, press-your-luck choices, dangerous stunts; recognizable Florida stereotypes rather than forced joke sentences. Self-damage is optional supporting space, not mandatory Style identity. Reliable plain Characters remain important.
- P001 Feral Chihuahua: Cost 1, 2/2/1, no abilities/keywords.
- P017 Vape Kid: Cost 1, 1/3/1, no abilities/keywords.
- P002 Designated Driver: Cost 2, 2/2/2, no abilities/keywords.
- P016 Amateur Storm Chaser: replaces Porch Pirate, Cost 2, 2/2/1, Hothead.
- P003 Hurricane Holdout: replaces Firework Dad, Cost 3, **1/5/1**, +1 Attack per damage currently on him. At 4 damage: 5 Attack, 1 remaining Health, 1 Trouble without other modifiers. His earlier 0 printed Trouble and damage-to-Trouble scaling are superseded.
- P012 Spring Break Frat Bro: replaces Giga Chad, Cost 3, 4/2/2, Hothead.
- P020 Send It! renamed SPRING BREAK!!!; effect still legacy Response text and needs separate audit.

### TESTING — saved candidates, not proven balance
- **Five-cost name/stunt refinement:** P010 is now Unlicensed Zookeeper, retaining 5/4/1, Hothead, Sucker Punch, and Draw on own Attack Defeat. P014 is now Wannabe Vigilante, 4/3/1, Hothead, optional +4 Power for an Attack followed by Dismiss after that Attack (4 safe Power or 8 at the cost of the Character). Both remain Cost 5 for testing. This supersedes the preceding Roadside Tiger Keeper/Backyard Daredevil names and Daredevil 6/3/1 +3 design; older alternatives remain banked.
- **Five-cost package reworked as a starting point at user request:** P010 → Roadside Tiger Keeper, 5/4/1, Hothead/Sucker Punch, Draw when his Attack Defeats an opposing Character. P011 → Sandbar Party Captain, 3/4/2, once during own Turn may Ready himself after another friendly Character's Attack Defeat; normal early Cause Trouble restriction still applies. P014 → Backyard Daredevil, 6/3/1, Hothead, optional +3 Power for an Attack then Dismiss after that Attack. All remain Cost 5 and preserve IDs/deck references. Roles: reach Ready enemies and refill; convert allies' combat wins into additional personal Trouble; oversized disposable strike. These are draft testing designs, not separately locked final numbers. Former self-damage/damaged-board engines removed. Digital behavior pending parity.
- Backyard Daredevil uses the banked name earlier considered for Stunt Double; do not create a second card with that name. Stunt Double transfer/name remains unresolved; may need a different identity or to merge into this concept.
- P005 Toddler: Cost 2, 1/2/1. On entry d6: 1 own Leader loses 2 Composure; 2 opposing Leader loses 2 Composure; 3 nothing; 4 Draw; 5 +2 Attack and Hothead this Turn; 6 +3 Attack and Hothead this Turn, Dismiss after his next Attack this Turn. No reroll. The roll-6 attack is optional; temporary bonuses/Dismiss condition expire this Turn.
- P007 Shirtless Guy With a Chainsaw: replaces Scout With a Flare Gun; Cost 3, 2/3/1. Once per own Turn while Ready and eligible to Attack, optional d6: 1 Rotate; 2–6 +2 Attack this Turn, optional second roll; second 1 Rotate/remove this ability's bonus, otherwise bonus becomes +4. Hothead added. Base/single/double Attack is 2/4/6.
- P024 Hey Y’all, Watch This!: replaces Commit to the Bit; Cost 1. Choose Ready friendly Character; d6 final 1 Rotate; 2–5 choose +4 Attack or +2 Trouble this Turn; 6 both. Optional one reroll on initial 2–5, only final result resolves.
- Audit concern: Frat Bro's guaranteed immediate 4 Attack competes with Chainsaw Guy's delayed risky 4/6. Preserve their identities; relative stats/rewards remain reviewable.
- All new behavior awaits digital parity; a saved card is not an implemented or balance-tested card.

### OPEN — do not apply without settlement
1. **Florida Man passive — RESOLVED:** Whenever one of your Characters Defeats an opposing Character with an Attack, the opposing Leader loses 1 Composure. Each qualifying Attack Defeat triggers; no once-per-Turn cap. RULES.md now contains the canonical passive. This replaces both historical damage-based passives; Breaking Point is still open. Earlier once-per-Turn alternatives remain banked.
2. **Trouble curve:** user suggests lower Character Trouble with boosts from support. This is a proposal, not permission to reduce every Character. Preserve reliable baseline pressure and a way to finish Last Straw against an empty opposing board.
3. **Bachelorette Party slot — RESOLVED:** replaced by Boogie Boarder, Cost 2, 2/1/1, Draw when Dismissed or Defeated. Saved in canonical CARDS.json; Character pass complete.
4. **Electrician replacement — RESOLVED:** Beach Bar Loudmouth is saved as Cost 3, 2/3/3 with Attack-Defeat-gated Cause Trouble. Airboat Captain, Rollerblade Guy, Beach Fisherman, and Snowbird remain banked for other roles; the universal cheap-Character Trouble aura was not adopted.
5. **Board wipe — REOPENED / UNDECIDED:** Earlier candidate: Dismiss all Characters and Items controlled by both players to their owners' discards, with Stash/Leaders/Last Straws untouched; name and Cost TBD. User now reopens the whole wipe and suggests removing all damaged Characters as an alternative. Do not treat complete clearing as final. User likes Category 5 as a Florida Action and suggests very high Cost, around 8; earlier proposed effect was deal 4 damage to every Character. These are separate candidates, no new card/effect/cost has been finalized. Damage-vs-Dismiss/Defeat and trigger consequences must be settled with the card. Wipe casualties do not qualify for Florida Man's Attack-only passive.
6. **Item removal — FIRST CARD RESOLVED:** Road Rage Ron now provides optional opposing Item Dismiss, Cost ≤2, on his own Attack Defeat. Other entry-triggered/Action/Defeat-triggered removal remains banked rather than automatically added.
7. **Defeat damaged opposing Character — RETIRED:** user explicitly scraps this proposed removal theme. Ordinary attacks on damaged Characters still function normally; existing cards will be reviewed individually, not bulk-deleted.
8. **Attack-to-Trouble payoffs — CARD TEXT ONLY:** User wants conditional Trouble boosts/permission on Characters, Items, or Actions, no blanket core rule. Candidate: some higher-base-Trouble Characters can Cause Trouble only after a friendly Attack Defeats an opposing Character this Turn. Define 'win a fight' as such a Defeat for proposed templating, not just survive/deal damage. Mandatory Attack remains a proposed drawback, not a universal rule. Needs timing that preserves player choice of action order and legal-target handling.
9. **Deck integration:** Bad Decisions still uses old self-damage package labels, mulligan priorities, partial card selection, and Florida Adrenaline references. Rebuild/validate the 40-card shell after the package/Leader is settled; do not claim current list is the new engine.

### BANKED — names, transfers, and mechanics to revisit
- **Hurricane Surfer:** strong Florida identity retained for a future danger/storm interaction, potentially Holdout/Category 5. Gator Wrestler is an unused Wrangler naming alternative. Lifted Truck Menace, Drunk Golf Cart Driver, Wrong-Way Driver, Hurricane Surfer, and Airboat Captain were alternatives for the six-cost slot; Airboat Captain was rejected here for overlap with Sandbar Party Captain. No new cards created.
- **Truck Nuts:** user likes as a potential Item name; exact effect, Cost, and attachment/support role are open. Do not rename Ron to Truck Nuts Guy without further instruction. Lifted Truck Tailgater remains an unused alternative.
- **instaGATOR:** user’s alligator instigator concept retained for a possible better-fit card. If no better home emerges, it may label Beach Bar Loudmouth’s ability for flavor only—not a keyword or extra rule. Not assigned yet. Parking Lot Tough Guy also banked; Spring Break Instigator rejected for redundancy with Frat Bro. Distracted Lifeguard remains available for a neglect/protection role.
- User wants Bath Salts in Reckless; current Item remains Expendable. Dangerous aggression suggested; Undead identity not decided.
- User likes Unlicensed Pool Guy for Florida. Still Salvage; decide move and ability/deck replacement deliberately.
- User wants Stunt Double concept in Reckless but rejects its name. Backyard Daredevil candidate; still Expendable until decided.
- Button Marked DO NOT PRESS: user likes risk/reward but exact mechanic open. Candidate Rotate/d6: 1 own Leader loses 2 Composure, otherwise deal 2 to a Character. Still Expendable with sacrifice effect.
- Other cross-Style candidates: Definitely Safe Helmet (support), Guy Who Cut the Wrong Wire (mixed-bag gamble), Conspiracy Blogger (top-card guess). No transfers.
- Theme bank: Roadside Tiger Keeper (Joe Exotic energy), distracted lifeguard, drunk jet skier, snowbird in convertible, beach bar regular, airboat captain, rollerblade guy, beach fisherman, drunk teenagers, unlicensed contractor, lifted-truck tailgater, swamp people (regional distinction noted), reckless tourists.
- Possible replacements: Pool Pirate → Distracted Lifeguard; Jet Ski Mechanic → Drunk Jet Skier; Road Rage Ron → Lifted Truck Tailgater; Fourth of July Showrunner → Roadside Tiger Keeper; Own Ramp → Backyard Daredevil. None confirmed.
- Older candidate mechanics: Driver redirects damage once per Round (1/4/1), Driver Returns another Character after Trouble (2/3/1); optional fireworks roll (1 damages own board, 2–5 enemy board for 1, 6 enemy board for 2); stunts skip next Ready, collateral damage, burn-bright Caffeine, temporary boosts to Attack or Trouble. Preserve as alternatives, not current text.
- Removed one-drop alternatives: Chihuahua Hothead or Draw/Composure on Defeat; 1/3/1 entering with 2 damage; 0/2/1 Draw on Defeat; temporary Attack then Defeat after Attack. User currently chose plain pair.
- Superseded Toddler alternatives: escalating stat bonus with optional reroll; second negative outcome dealing damage to random friendly Character. Original six-outcome concept is active instead.
- Earlier proposed damage wipe Category 5: deal 4 damage to every Character, designed to leave Holdout alive. BANKED alternative, does not match latest complete-removal request.

### Historical Florida Man passives — references, not current locks
- **Most recent STANK/Composure candidate, Adrenaline:** “Ooh, That's Gonna Leave a Mark!” First time each friendly Character is dealt damage and survives, +2 Power (+3 if Daredevil). At each start of own Turn, reduce that Character's Power by 1 until it reaches 1. Cannot trigger again for that Character. Source: lab/composure/stank-merge.js; Power was the lab's Attack term.
- **Earlier Carl passive:** damaged Characters have Hothead and Sucker Punch; after a damaged Character survives combat with another Character, Ready it. Source: historical “Locked Carl Leaders” below.
- Root Mordecai Leader text remains under audit. These two historical versions must not be conflated.

### Working sequence
Four-cost Character pass is complete: Road Rage Ron, Distracted Lifeguard, Drunk Jet Skier. Next review the three five-cost Characters, then Minibike Menace and the Actions/Items.
Florida Man passive settled → resume 3-Cost Characters, settling printed Trouble support/Hothead as needed → review higher curve and Actions/Items (including competing wipe candidates) → rebuild baseline deck → digital parity and testing. Review one decision per step. Save confirmed changes immediately; report every candidate as CURRENT, TESTING, BANKED, or OPEN.

### Earlier review entries — historical where superseded

## Card-audit guardrails · 7 October 2026

✅ **Holdout update:** his damage bonus now increases Attack, not Trouble. Previous Holdout/Pills Trouble examples below are superseded by this change. At 4 damage and no other modifiers he has 5 Attack, one remaining Health, and 0 Trouble.

🧪 **Combat-first direction under discussion:** consider Florida Man granting opposing Composure loss when friendly Attacks Defeat opposing Characters, with lower base Trouble on selected Characters and conditional Trouble support. No Leader passive or pool-wide Trouble reductions are finalized/applied. Compare once-per-Turn and per-Defeat payoffs; mass removal must not accidentally trigger attack-specific rewards. Consider a costly symmetric damage-based board wipe, retaining ordinary counterplay and avoiding direct-loss multiplication through wipe casualties.

✅ **Audit process:** evaluate cards as a curve and deck environment, not isolated jokes or total stat points. Each proposal must name its primary role, compare with a simpler same-Cost alternative, identify what earlier cards it supports and what later cards support it, specify its resource/readiness/hand costs and timing, and show opposing counterplay. Flavor alone does not justify a mechanical slot. Test a 40-card shell when the package is coherent; “locked” means chosen for this pass, not exempt from balance changes.

- **Scaling:** compare immediate Attack, sustained Trouble, remaining durability, cards gained, and setup separately. Hothead is Attack-only and targets Rotated opponents unless Sucker Punch/text overrides it. New 3-Cost Characters should offer meaningful utility or payoff relative to 2-Cost cards; 4–6-Cost cards should reward setup or offer recovery rather than merely larger stats.
- **Roles:** keep dependable openers, combat tools, Trouble tools, support, card economy, interaction, and finishers represented without forcing every card to do every job. Evaluate dead-hand and behind-on-board cases as well as ideal curves.
- **Synergy:** favor cards useful alone that improve multiple partners. Require named, functional interactions; shared dice rolls/Traits are not a combo by themselves. Do not add a universal team Trouble aura merely to reward more bodies without a deckbuilding cost.
- **Risk:** compare the safe option, jackpot, failure probability, and actual consequence. Avoid guaranteed superior alternatives that invalidate the gamble, free retry loops, and rewards that erase all risk. Keep most support deterministic; not every Character needs a die.
- **Economy/counterplay:** account for card replacement, repeatable Return, copying abilities, attachments, off-Style partners, and all Readying. No automatic retaliation means a Hothead attacker does not automatically die in combat. Resolve Dismiss/Defeat/Return distinctly.
- **Mordecai endgame:** audit repeated Cause Trouble, Ready effects, stacked Health, and Hothead/Sucker Punch at Last Straw. Direct Composure loss cannot supply the final Cause Trouble. Any extra Trouble action requires deliberate tuning, not an assumed universal once-per-Turn cap.
- **Leader/deck/tool parity:** reconcile Florida Man's passive/Breaking Point with the chosen package before balance conclusions. Bad Decisions still has legacy self-damage packages/mulligan notes and a partially revised list. No automated balance evidence until Mordecai implementation parity.

🧪 **Proposed Reckless synergy target:** turn established Characters into dangerous stunt payoffs through temporary boosts, equipment, and limited Readying; convert that setup into Trouble while accepting exposure or burnout. Gambling creates exciting tactical options; a small damaged-Character package is optional, not mandatory for the Style.

🧪 **Current audit findings:** Chihuahua/Vape Kid provide complementary plain openers; Driver versus Storm Chaser trades 1 Trouble for Hothead at matching 2/2 bodies. Toddler's on-entry table is variety rather than press-your-luck synergy. Frat Bro's guaranteed immediate 4 Attack competes sharply with Chainsaw Guy's delayed risky 4/6; keep identities but revisit relative reward, eligibility, or stats. Holdout can be inactive at 0 damage and relies on deliberately retained enablers; he is optional injury synergy. Established Holdout with 2 damage can Cause 2 Trouble, then consume attached Gas Station Pills to Ready and take 1 damage, then Cause 3 Trouble: 5 total, ending one damage from Defeat. Added Health/multiple Ready effects can amplify this and require audit. Proposed Bachelorette Party plus Caffeine is replacement-value synergy, not net card advantage: spend the Action, convert Party into an attack, and Draw to replace Party if it is Defeated. Proposed Airboat Captain aura is not adopted; it risks generic board-width acceleration and should be reconsidered as support for a narrower stunt condition.


🔒 **Character locks · 7 October 2026:** Designated Driver (P002), Cost 2, 2/2/2, no ability; Amateur Storm Chaser replaces Porch Pirate (P016), Cost 2, 2/2/1, Hothead; Hurricane Holdout replaces Firework Dad (P003), Cost 3, 1/5/0, gets +1 Attack per damage currently on it; Spring Break Frat Bro replaces Giga Chad (P012), Cost 3, 4/2/2, Hothead. Stats are Attack/Health/Trouble. IDs, Costs, and deck quantities are unchanged. Holdout's Attack bonus is continuous, not cumulative across healed damage; his printed Trouble remains 0. Card text/identity locks are not balance evidence; digital parity remains pending.

✅ **Former Bachelorette Party pending decision resolved:** Boogie Boarder replaces it; see current ledger.

🧠 **Reckless additions to design:** Bath Salts belongs in Reckless; Unlicensed Pool Guy fits the Florida identity; move/rework the Stunt Double concept with a new name; explore Button Marked DO NOT PRESS as risk/reward. Cross-Style transfers and replacement mechanics are not yet applied. Seek recognizable Florida stereotypes (snowbirds, spring breakers, distracted lifeguards, questionable animal owners) rather than forced joke names.

✅ **Three-cost Character rename · 7 October 2026:** Scout With a Flare Gun (P007) is replaced by Shirtless Guy With a Chainsaw. Remove Kid/Scout Traits; retain Daredevil. The same ID preserves existing deck quantities.

🧪 **Just Gotta Rev It:** Cost 3, 2 Attack / 3 Health / 1 Trouble. Once during your Turn, while Ready and eligible to Attack, optionally roll a d6 before declaring an Attack: 1 Rotates him; 2–6 grants +2 Attack this Turn. May roll once more: 1 Rotates him and removes only the bonus granted by this ability; 2–6 increases that bonus to +4 Attack this Turn. Base Attack therefore remains 2, or becomes 4/6 without other modifiers. No Hothead or early Cause Trouble permission is granted. Stats and effect are testing candidates. Digital implementation remains pending Mordecai parity.

🔒 **One-cost Characters locked for this pass:** Feral Chihuahua (P001) is Cost 1, 2 Attack / 2 Health / 1 Trouble; Vape Kid (P017) is Cost 1, 1 Attack / 3 Health / 1 Trouble. Both have no abilities or keywords. Their former leave-play Composure pressure and self-damage/filtering abilities are removed. May revisit later; deck quantities are unchanged.

✅ **Style direction:** voluntary risk/reward, dangerous stunts, and press-your-luck choices. Self-damage may be a supporting consequence; it is not the required identity of Reckless. Rewards may affect Attack, Trouble, or other effects depending on the card.

✅ **Renames:** P002 Gas Station Daredevil → Designated Driver; P020 Send It! → SPRING BREAK!!!; P024 Commit to the Bit → Hey Y’all, Watch This! Card IDs, Costs, and deck quantities are unchanged. P002 and P020 retain their existing abilities pending individual review; SPRING BREAK!!! still requires conversion of its legacy Response wording.

🧪 **Hey Y’all, Watch This! — provisional risk/reward:** choose a Ready friendly Character and roll a d6. A final 1 Rotates it; 2–5 grants either +4 Attack or +2 Trouble this Turn; 6 grants both. After an initial 2–5, optionally reroll once, replacing the first result. Resolve only the final result. Revisit the effect and numbers during the Reckless card pass. Digital implementation is pending the existing Mordecai engine parity work; do not treat this as implemented or balance-tested.

🧪 **Unsupervised Toddler — original concept adapted 7 October 2026:** P005 remains Cost 2; testing stats are 1 Attack / 2 Health / 1 Trouble, preserving the early concept’s 1 Attack / 2 Health and adding Mordecai Trouble. Where Did He Come From? rolls a d6 on entry: 1 lose 2 Composure; 2 opposing Leader loses 2 Composure (revised to leave only one negative outcome); 3 nothing; 4 Draw a card; 5 +2 Attack and Hothead this Turn; 6 +3 Attack and Hothead this Turn, then Dismiss after its next Attack this Turn. The 6 bonuses and delayed Dismiss condition expire at end of Turn; declining the Attack keeps the Toddler without those bonuses. No early Cause Trouble permission. Defiant and the damaged-state bonus are removed. Preserve the six-outcome mixed bag; the earlier escalating-stat optional reroll proposal is superseded for this card. No reroll added. Digital behavior remains pending the Mordecai parity pass; no balance claim.

---

🔒 **Lab ruling — universal Last Straw combat state:** while a Leader is at Last Straw, that player's Characters have Hothead and may Attack opposing Ready Characters. Hothead remains Attack-only and does not grant early Cause Trouble. This is the baseline comeback agency; the chosen Last Straw supplies the one-time comeback event. There is no universal mass-Rotate/reset on entering Last Straw.

## Composure 2.0 Last Straw work

🧠 The existing Last Straw concept bank remains in `lab/composure/LAST_STRAW_IDEAS.md` as promotion-era design history. The **shared hidden Last Straw architecture itself is now production**, not an experiment. During the upcoming cleanup, active candidates should be reconciled into the current production design record rather than treating the old lab file as rules canon.

# Unhinged — Living Design Notes

**Build:** Mordecai 0.4  
**Date:** October 4, 2026
This replaces scattered checkpoints, brainstorm files, open-decision files, and idea banks.

## Legend
✅ current/locked · 🧪 testing · 🧠 banked · 🗑 retired

## Development milestone
✅ **0.4 Mordecai** is the current core-systems-lock milestone. Composure 2.0 has been promoted; the next work is production consistency, content tuning, and implementation parity. The full versioning policy and road to 1.0 live in README.md.

## Current parallel testing direction — Composure 2.0, October 2026
🧪 **Merged experiment:** `lab/composure/` now tests the STANK INDUSTRIES-60 deck state against a **20 Composure** win-condition model. Characters use **Power / Guard / Trouble**. A Character may Attack a normally Rotated opposing Character using Power, **Cause Trouble** to reduce opposing Composure by its Trouble, or remain Ready and protected from ordinary attacks.

🧪 **Breaking Point / Last Straw:** 10 Composure is the first test **Breaking Point**. At 0 Composure the Leader does **not** lose. They hit **Last Straw**: the Leader-specific Last Straw hook triggers, then the current Turn proceeds to its normal end-of-Turn sequence. Last Straw does not universally Rotate Characters; battlefield changes come from the unique Last Straw ability. A later successful Cause Trouble by a Character with at least 1 Trouble against a Leader already at Last Straw makes that Leader **Unhinged** and loses the game. Leader-specific Breaking Point and Last Straw effects are intentionally pending the rules/card interview.

🔒 **Lab ruling — Leader durability:** Leaders do not have Health. Composure is the sole measurable Leader durability / victory track. Leader effects use lose/recover Composure; damage and healing remain Character concepts tied to Guard. Existing lab cards that still reference Leader Health, Leader damage, or Leader healing require terminology conversion during the card audit.

🔒 **Lab ruling — simultaneous Breaking Points:** if one effect causes both Leaders to cross 10 Composure, finish that effect, resolve them in their actual trigger order; if genuinely simultaneous, resolve the non-active (defending) player's Breaking Point first and the active player's second, then resume the current Turn normally.

🔒 **Lab ruling — simultaneous Last Straws:** if the same effect causes both Leaders to enter Last Straw, both Last Straw events resolve before play passes. Resolve Last Straws in their actual trigger order. If they were genuinely simultaneous, resolve the non-active (defending) player's Last Straw first, then the active player's, then complete the normal forced end-of-Turn sequence and pass to the next player in normal turn order.

🔒 **Lab ruling — deck exhaustion:** there is no deck-out loss. If a player would Draw from an empty deck before Last Straw, the failed Draw triggers Last Straw directly: set that Leader's Composure to 0 and resolve Last Straw normally. This is not Composure loss and does not retroactively trigger Breaking Point. Once already at Last Straw, attempts to Draw from an empty deck simply do nothing; do not reshuffle the discard. Only a later successful Cause Trouble can make the Leader Unhinged.

🔒 **Lab ruling — Last Straw turn order:** after the current effect finishes, resolve the entire Last Straw event first, including the Leader-specific Last Straw ability. Then force the current Turn through its normal end-of-Turn sequence and pass to the other player normally. Last Straw never grants an extra Turn, including when a player triggers their own Last Straw.

🔒 **Lab ruling — final Trouble prevention:** once a Leader is at Last Straw, only a successful Cause Trouble by a Character with at least **1 Trouble** can make that Leader Unhinged. A 0-Trouble Character may still Cause Trouble and resolve relevant triggers, but cannot finish the Leader. Reducing an acting Character to 0 Trouble is therefore valid Last Straw defense. Ordinary Composure prevention does not stop a final Cause Trouble that still has at least 1 Trouble; canceling/preventing Cause Trouble or explicitly preventing Unhinged can also stop it.

🔒 **Lab ruling — Last Straw limit override:** a Last Straw ability may explicitly exceed the normal Character limit. Excess Characters remain in play; no forced cleanup occurs merely for being over the limit.

🧪 **Five-Character limit remains TESTING, retained for now:** simulation did not show the cap materially fixing snowballing, so it is not justified as an anti-snowball rule. Keep the five-Character maximum in the current test as a battlefield-space / slot-management mechanic and judge it in human play. At five Characters, ordinary additions are prevented unless an effect explicitly overrides the limit. Last Straw may explicitly exceed it. Remove the cap later if the spatial decisions do not justify the rules baggage.

🔒 **Lab ruling — Last Straw board state:** entering Last Straw does not universally Rotate Characters or otherwise alter either battlefield. Board changes come from that Leader's unique Last Straw ability.

🔒 **Lab ruling — Last Straw deployment:** Characters put into play by a Last Straw effect are fully cooled down for the ensuing comeback Turn. They enter Ready unless the effect explicitly says otherwise and may take their normal Character action, including Attack or Cause Trouble.

🔒 **Lab ruling — forced Turn end:** after Last Straw resolves, the current Turn is forced into its normal end-of-Turn sequence. Scheduled end-of-Turn effects still resolve and normal cleanup occurs. Composure loss from those effects cannot make a Last Straw Leader Unhinged; only a later successful Cause Trouble can do that.

🔒 **Lab ruling — simultaneous multi-threshold order:** when one effect causes multiple Leaders to cross both thresholds, resolve all crossed Breaking Points before any Last Straws. Within each threshold layer, actual trigger order applies when distinguishable; if genuinely simultaneous, the non-active (defending) player resolves first.

🔒 **Lab ruling — crossing both thresholds:** if one Composure-loss effect crosses both Breaking Point and Last Straw for the same Leader, finish that effect, then resolve Breaking Point first and Last Straw second. Deck exhaustion remains the explicit exception: a failed Draw from an empty deck triggers Last Straw directly and does not trigger Breaking Point.

🔒 **Lab ruling — threshold timing:** finish the current effect completely before resolving a crossed Breaking Point or Last Straw threshold. Breaking Point and Last Straw abilities are protected Leader game events and cannot be interrupted.

🔒 **Lab ruling — Breaking Point:** every Leader starts at 20 Composure and has the same universal Breaking Point threshold at **10 Composure**. Breaking Point triggers once per game. Every Leader gets a unique Breaking Point ability and a unique Last Straw ability; the abilities themselves remain to be designed and audited.

🔒 **Lab ruling — recovery:** before Last Straw, Composure may be recovered up to 20. Breaking Point triggers only once even if the Leader later recovers above 10. After Last Straw triggers, that Leader remains permanently at 0 Composure and cannot recover it; Last Straw cannot retrigger.

🧪 **20 Composure baseline:** the earlier 25-Composure target was chosen before Last Straw existed. Because Last Straw is expected to add roughly 1–2 rounds of final-act gameplay, 20 is now the working test baseline. This is a hypothesis to simulate and human-test, not a balance claim.

🔒 **Lab ruling — opening:** the first player skips their first Draw. The second player receives no temporary setup Stash and Draws normally on their first Turn.

🧪 **Critical separation:** Cause Trouble cannot be Blocked and is not combat. It Rotates the Character, immediately applies Trouble to Composure, and leaves that Character exposed to ordinary attacks on the opponent's Turn. A Character cannot Cause Trouble on the Turn it enters play, even if it has Hothead.

🧪 **STANK combat variable:** STANK 60's no-universal-retaliation experiment remains active; Backyard Wrestler's Wrestlers retain Retaliate. This is separable from the win-condition experiment.

🧪 **Controlled baseline:** Carl 0.3 remains canonical. Five Character slots remain a lab architecture constraint, not an anti-snowball claim.

🔒 **Lab ruling — Trouble stat:** every Character has a printed Trouble value, and 0 is valid. A 0-Trouble Character may still take the Cause Trouble action; without a modifier or other effect it causes 0 Composure loss. This keeps Trouble a universal Character stat and preserves Cause Trouble triggers without a special eligibility exception.

🔒 **Lab ruling — Leader targeting:** Leaders cannot be Attacked. Attacks are Character-versus-Character combat only. Cause Trouble is the Character action used against the opposing Leader's Composure. Power governs Character combat, Guard governs Character durability, and Trouble governs Composure progress. The old Leader-blocking combat step does not apply in this model.

🔒 **Lab ruling — Cause Trouble:** Cause Trouble is not combat and cannot be blocked. An eligible Ready Character Rotates to Cause Trouble and applies its Trouble to the opposing Leader's Composure. The resulting Rotated Character is then exposed to ordinary Attacks.

🔒 **Lab ruling — persistent damage:** damage remains on Characters until an effect removes/heals it or the Character leaves play. A Character is Defeated immediately when its accumulated damage equals or exceeds its Guard.

🔒 **Lab ruling — Retaliate:** universal retaliation is removed. **Retaliate** is a dedicated keyword: “When this Character survives an Attack, it deals its Power as damage to the attacking Character.” A Character Defeated by the Attack does not Retaliate unless an effect explicitly says otherwise. Retaliation occurs only when a keyword or effect grants it.

🔒 **Lab ruling — attack eligibility:** ordinary Attacks may target only opposing Rotated Characters. Ready Characters are protected from ordinary Attacks unless card text explicitly overrides that rule. Attack and Cause Trouble therefore both normally expose the acting Character by Rotating it, while staying Ready preserves ordinary attack protection.

🔒 **Lab ruling — Hothead:** Hothead allows a Character to Attack the Turn it enters play. It does not allow that Character to Cause Trouble early. Cause Trouble normally requires the Character to have begun the Turn under its controller's control unless an effect explicitly overrides that requirement.

🔒 **Lab ruling — Ready effects:** there is no universal once-per-Turn Attack-or-Cause-Trouble cap. If an effect Readies a Character outside the normal Ready step, that effect dictates any restriction on what the Character can do afterward. Example: “Ready a Character. It cannot Cause Trouble for the rest of this Round.” Existing Ready cards require individual audit so they do not accidentally enable unintended Attack/Trouble double-dips.

🔒 **Lab ruling — Responses removed:** the Trouble / Last Straw direction removes the universal Response system. Cause Trouble therefore has no Response window. Three legacy lab cards still carry Response wording and require deliberate redesign during the card audit rather than automatic conversion. Canonical Carl remains unchanged until promotion.

🧪 **Open audit:** the new win condition touches old Leader-damage cards, Leader healing/recovery, Responses, end-of-Turn timing, Ready effects, direct Composure loss, threshold effects, the five-slot rule, AI priorities, every Leader, and deck/card valuation. Resolve these deliberately through the next rules/card/deck interview before promotion.

## New parallel testing direction — Board Width Lab, October 4, 2026
🧪 **Implemented independently:** `lab/board-width/` tests five Character slots, no universal blocking, attacks against opposing Leader or opposing **Rotated Characters only**, simultaneous Character combat, and free automatic trigger cascades. Ready Characters remain protected from normal attacks; removal Actions can target them. This corrects the earlier conversation suggestion to attack any Character. Carl 0.3 and Scheme Lab are unchanged.

🧪 **Third option hypothesis:** preserve a Ready aura or automatic engine instead of attacking. Fourteen compact LAB cards and two 40-card control decks include full-board/exact-count On Play effects plus one Trench Coat stacking/storage example that reopens a slot; no broad expansion or fusion package. Browser has adjacent opposing/player battlefield rows, on-card Health/state, and direct board clicks for attacks, Actions, Responses, and stacking targets.

🧪 **Cadence remains open:** full Turns are a provisional control baseline, not a decision against alternating actions. Define that cadence separately before implementing it; do not meter automatic combo triggers as actions. Width is configurable in engine tests, with five as browser default. The earlier hold on board caps is explicitly reopened for this isolated experiment only.

🧪 **Status:** regression/simulation/browser verification, not balance certification or proof of fun. Human questions: protected-engine counterplay, race pressure without blocking, width frustration, meaningful preservation, and whether stacking supports memorable combos. Exact experimental rules, tests, and failure conditions live in the lab README. Neither experiment is promoted; Scheme Lab remains available for separate comparison.

## Proposed next direction — Scheme Lab, October 3, 2026
🧪 **Decision for the next prototype:** Character-first combat plus one exposed worker advancing a visible Leader Scheme. Simultaneous combat damage makes trading a credible answer to a superior board. One work opportunity per Turn prevents a wider board from multiplying Scheme progress. Earned progress survives a lost board; the current job does not survive removal of its worker.

🧪 **Implemented:** `lab/schemes/` contains an independent playable test with eight 40-card decks, 71 fully supported card definitions, bot/local two-player play, one shared browser/simulation engine, regression tests, and controlled comparisons. Exact experimental rules and failure conditions live in its README. Recorded simulation results are heuristic evidence, not proof of fun or final balance.

🧪 **Card/Leader direction:** conditional Cat economy rather than permanent free ramp; bounded Florida triggers; preserve opposing response resources by replacing Trash Baron's resource spending; HOA earns its closing payoff through work instead of waiting for automatic unblockability; Scientist adds one optional die reroll and uses a retuned battery. Passives, Schemes, and card text in this LAB are deliberate new versions, not descriptions of Carl.

🧪 **Human gate:** ten swapped-start games, emphasizing smaller-board recovery, real attack/protect/work choices, Scheme disruption, and desire to play again. Promote only what succeeds; a structural promotion would be 0.4 with a new DCC character codename.

🧠 **Hold until that gate:** expanding the 180-card pool, additional currencies, universal lanes, more response windows, board/attack caps, generic stat upgrades, and additional dexterity modules. Keep spectacle in Leader packages and a few marquee cards. This direction does not add an alternate automatic-win score.

## What we know for now
✅ Leader-centered, Character-first, synergy-forward game. 40-card deck, one Leader outside the deck, 25 Health, four-copy maximum.  
✅ Leader Style plus at most one secondary Style. Styles: Reckless, Momentum, Misdirection, Salvage, Stonewall, Expendable.  
✅ Full Turns. War winner goes first every Round and skips the first Draw. Second player gets setup temporary Stash.  
✅ Stash is the resource system. One normal Stash opportunity per Round on your Turn.  
✅ One Blocker on Leader Attacks, overflow, retaliation from surviving Blockers. Direct Character Attacks cannot be Blocked and surviving targets retaliate.  
✅ Ready Characters normally cannot be attacked; Sucker Punch breaks that rule.  
✅ Responses are timed Actions. Traits are inert unless referenced.

## Current creative direction — make it actually Unhinged
🧪 **Fun and desire come before balance polish.** The first design question is not “is this efficient and balanced?” It is **“do I read this and immediately want to play it?”** Balance still matters, but it supports the fantasy instead of defining it.

🧪 **The base game should stay simple enough that decks can become ridiculous.** Core combat, Stash, Characters, blocking, retaliation, and Leader health provide the stable chassis. Weirdness should primarily live in Leaders, build-arounds, marquee cards, and deck-specific rule breaking.

🧪 **A great Unhinged deck creates a play pattern, a table moment, and a story.** The benchmark is not merely mechanical distinction. The player should be able to describe what their deck is trying to *do* in a sentence that sounds fun before anyone knows whether it is competitively strong.

🧪 **Fragile Rube Goldberg win machines are allowed.** A complicated multi-card engine may become effectively game-winning if the player actually assembles and resolves it. The surrounding deck must still function when the machine does not go off, and the opponent should have meaningful ways to disrupt it. Do not balance the triumphant payoff into mediocrity merely because the completed machine is powerful.

🧪 **Preserve the outrageous part, then find counterplay, then tune numbers.** Preferred workflow:
1. Find the irresistible idea.
2. Identify the part that creates the “I have to play this” reaction.
3. Protect that part through iteration.
4. Add understandable counterplay.
5. Tune cost, frequency, consistency, and surrounding support last.

🧪 **Physical interaction is part of the design palette.** Tossing, flipping, balancing, stacking, flicking, rolling, overlapping, and other tactile actions are valid when the action feels native to the character/deck. Do not turn every deck into a dexterity minigame. Each physical mechanic should feel inevitable for its theme.

🧪 **Current benchmark prototypes:**
- **Crazy Cat Lady** — Snowball. Establish and protect 3+ Cats to turn Cat Distribution System into accelerating Stash. The opponent can see the colony becoming a problem and has time to disrupt it.
- **Mad Scientist** — Burnout. Begin with a finite five-charge protected battery, spend recklessly, recharge slowly, and fuse Characters into independently randomized Power/Guard Abominations. Sometimes science works. Sometimes it produces a 1/6.
- These remain **LAB prototypes**, not Carl 0.3 production rules, but they currently best demonstrate the intended emotional target for future decks.

🧪 **Natural counters are preferable to bespoke hate.** Board wipes are an especially important shared counter to both current Rulebreaker prototypes: they reset Cat Lady's colony and erase the persistent board value Mad Scientist purchased with a finite battery.

## Locked Carl Leaders
✅ Florida Man: damaged Characters have Hothead and Sucker Punch; after a damaged Character survives combat with another Character, Ready it.  
✅ Rock Star: before Ready, refill to 2 at 1 or fewer cards; at 3 or more skip Draw; at exactly 2 Draw normally.  
✅ Magician: once during your Turn, a friendly Return readies 1 Stash.  
✅ Trash Baron: may spend opposing Ready Stash.  
✅ HOA President: from Round 8, opposing Characters cannot Block HOA Attacks.  
✅ Backyard Wrestler: once during your Turn after a friendly Defeat/Sacrifice, reveal top card; a qualifying Expendable Character up to Stash count enters with Hothead, otherwise goes to hand.

## Balance checkpoint
Accepted 36-field: 63,000 games, 100 per pairing, generated 24/16 dual-Style shells.
- Trash Baron family 54.99%
- Rock Star 53.30%
- Florida Man 51.03%
- HOA 48.02%
- Wrestler 46.57%
- Magician 46.10%
Top signals: Trash + Reckless 60.97%, Rock + Stonewall 59.00%, Florida mono 58.03%. Weak generated Momentum secondaries: Wrestler 38.66%, Magician 39.26%, HOA 40.06%.

🧪 Treat that as an anomaly map, not a final metagame. Reckless travels well; Momentum loses a lot when diluted.

## Questions now
1. Is combat fun for roughly 8–10 Rounds in human play?
2. Does Florida's survival Ready create choices rather than repetitive chains?
3. Does Misdirection feel clever and interactive in human hands?
4. Does Momentum need more standalone cards to work as a secondary Style?
5. Is Reckless too generically efficient outside Florida?
6. Which cards and Leaders pass the **hell-yeah test** immediately, before balance tuning?
7. Which Response windows add interaction without rules drag?
8. Which physical-card experiments earn permanent space?

## Next
1. Play all six Carl mono decks through the browser and paper.
2. Record feel issues separately from balance issues.
3. Investigate Reckless portability and Momentum dilution.
4. Test one variable at a time, then rerun the 36-field scan.
5. Promote only successful changes into RULES.md / CARDS.json / DECKS.json.
6. Revisit each current Leader/deck against the Crazy Cat Lady / Mad Scientist benchmark: does it create a unique play pattern and a memorable moment?
7. Develop marquee cards and physical interactions that pass the hell-yeah test before balance polish.

## Guardrails
✅ Characters are the core game. Persistent engines mostly belong on Characters and Items.  
✅ Prefer static, On Play, Attack/Block, survival, and leave-play effects over forests of Rotate abilities.  
✅ Keep arithmetic light and board state legible.  
✅ Interaction should create decisions, not routinely stop the opponent from playing.  
✅ Aggro should not get effortless Leader kills. Synergy and matchup texture matter.  
✅ Four copies supports predictability.  
✅ Card layout prioritizes Cost/type, clean text, recurring symbols, and color-blind readability.  
✅ Leaders should bend rules or play patterns, not merely grant stats.
🧪 **Spectacle before polish:** Unhinged may support elaborate, fragile combo machines whose payoff is effectively game-ending if the player actually assembles and resolves them. The surrounding deck should still function when the machine does not go off. Balance work should preserve the triumphant payoff rather than sanding it down into ordinary efficiency.
🧪 **Hell-yeah test:** before tuning a marquee card or Leader package, ask whether reading it immediately makes someone want to play it and whether resolving it can create a story worth retelling.

## Vocabulary
✅ Hothead, Defiant, Explosive, Slowpoke, Sucker Punch, Jerry-Rig, Chicken, Stubborn, Bodyguard. Sucker Punch and Bodyguard remain working names.  
🧠 Candidate mechanics: Step Aside, Overkill, Ricochet, Freeloader, Last Laugh, Nosy.

## Physical-card / bluff vault
🧠 Face-down bluffing remains the strongest reason to use card backs mechanically.
🧪 **Physical verbs worth exploring:** throw, flip, spin, flick, balance, stack, overlap/touch, build-until-collapse, and sequential/pass-it-on actions. Use these sparingly and thematically rather than as generic minigames.
🧪 **Paper Football family** — Package a small foldable/cardstock triangular football token rather than using a game card. Candidate effects:
- **Touchdown:** flick from your edge toward the opponent's edge; stopping with part of the football hanging over the far edge is the premium result, while falling off is a turnover/failure.
- **Extra point:** after a touchdown, the opponent forms finger goalposts and the player may attempt a bonus flick.
- **Fourth and Stupid:** up to four flicks, with each new flick starting where the football stopped; falling off ends the attempt. Possible escalating reward / “take the points or keep going” structure.
- Hail Mary / Going for Two / Home Field Advantage are saved hooks.
The important design constraint is that the physical result determines the outcome; the player does not assign a favorable interpretation after seeing where the football lands.
🧪 **Bottle-stack / Waterfall family** — Explore a bottle or safe bottle-shaped marker with cards balanced progressively across its top, inspired by drinking-game/card-stacking play. Players add cards one at a time, creating an increasingly unstable structure until a placement causes collapse. The collapse should have a meaningful game consequence and all cards should return cleanly to normal zones afterward. This is a physical tension mechanic, not an endorsement or requirement of alcohol.
🧪 **Drinking-game structure without drinking:** Waterfall sequencing, push-your-luck continuation, make-a-rule effects, categories/chains, flip-cup style success/failure, and shared escalating structures may inspire cards when converted into clean game actions.  
🧠 Inconspicuous Bush future version: hide a Character costing up to 5; Rotate to Dismiss Bush and put it into play.  
🧠 Hot Potato changes sides. Jailbroken Robot Vacuum stores/tucks cards. Trench Coat stores Child Characters. Lost & Found, Last Slice of Pizza, Do Not Push This Button, and Unofficial Reverse Card remain saved hooks.  
🗑 Road/map card backs were tabled because decks intermingle and become annoying to separate.

## Card / world vault
🧠 Magician's Assistant should lean into Return/removal/re-entry magic.  
🧠 Cloak naturally belongs in Magician; memorable concept is a 1-Guard, high-Power threat built around tricky survival/retaliation.  
🧠 Bath Salts grants Undead.  
🧪 Pet Alligator — Probably Domesticated is the first live rare dice-chaos card: 3-Cost Reckless Animal, 4/3; on attack roll a d6, and on a 1 the Attack is canceled and it damages its own Leader for its Power.
🧠 If Leader ultimates ever return, Florida's dice-damage “Hold My Entire Cooler” remains saved. Ultimates are not a Carl base rule.
🧪 **From the Top Rope!** — Backyard Wrestler physical-card experiment. Working version: choose a Wrestler you control, lift/toss that Character card above the play area, and let it land naturally. Every other card it overlaps when it comes to rest takes **1 damage if the Wrestler lands face up** or **2 damage if it lands face down**. The landing orientation is random and is not chosen after the toss. Return the Wrestler to its previous board position after resolving the impact. Exact Cost, toss/drop procedure, whether Items may be hit, and whether the Wrestler risks self-damage are TBD. Preserve the physical spectacle first; tune for safety, repeatability, and table clarity later.  
🧠 Boss Babe/MLM, Travel Ball Mom, Unsupervised Toddler chaos, Cockroach recursion, Clown Car, Creepy Van/Free Puppies, bachelorette party, feral child, cat lady, Girl Scouts, zombie kid, mall walker, influencer, single dad, grumpy old guy, jam band, pirates, wedding cover band, Put It in Reverse Terry, gas-station food/energy-drink weirdness.  
🧠 Tone compass: mythic stakes colliding with swamps, gas stations, junkyards, backyards, birthday parties, dive bars, and HOA meetings.

## Future, not Carl base
🧠 PvE/co-op, Locations, hidden Leader defenses, alternate lane/simultaneous-planning formats.

## Retired
🗑 Command/Stamina, Fuel terminology, single-action turns, frontline/backline/lanes as base game, Guard discard, multiple default Blockers, vulnerable-Leader combat stats, current Leader Charge/ultimates.  
🗑 Stack, Cloak, Sneaky, Step Aside, Overkill are not current starting-set keywords. Return only through explicit experiments.

## Repository rule
Do not create another dated checkpoint or separate idea bank. Update this file. Git history is the archive.
