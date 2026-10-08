# Unhinged — Misdirection audit handoff

Updated 8 October 2026, after Joseph locked the new cost-6 finisher (4/5/3, first friendly return each turn grants +2 Trouble that turn). This is the continuation record for a new chat. Read this before continuing the audit.

## Exact stopping point and next steps

Character first pass, ten Actions, two Items and the new finisher are approved (34 distinct designs: 22 Characters, 10 Actions, 2 Items). Burner Phone ★ and Do Not Look in the Hat are TABLED. The original pending Pirate has been reviewed but still needs an explicit disposition; do not silently treat the new finisher lock as a table/rewrite lock for P078. Next complete character curve/ability distribution and whole-set Magical eligibility, then coherent naming. Leader passive and Breaking Point remain unaudited. Work in batches of three where useful: current card, proposed update, role/combo and testing concern. Joseph approves individually or by batch. Do not restart approved decisions.

These Misdirection locks are DESIGN decisions for isolated-deck testing, NOT claims of implemented or verified browser behavior. This handoff intentionally does not edit CARDS.json, DECKS.json or the engine. Those still contain earlier Magician designs. Implement after the audit is complete or when requested. Balance is provisional until simulations and other style audits.

Canonical repo: jobeck17/unhinged, Mordecai 0.4. Playtest: https://jobeck17.github.io/unhinged/web/ ; builder: https://jobeck17.github.io/unhinged/builder/ . Leader: Birthday Party Magician. Current deck name: Now You See Me. Leave the leader passive unchanged for now; it has not been audited in this pass. Breaking Point also remains to review.

## Identity and design guardrails

- Tricky, sneaky, magical Misdirection. Bounce friendly characters for value at the expense of tempo and replay costs.
- Trigger leave-play effects, retrigger entrance effects, and recover damaged survivors by returning and replaying them. Bounce is recovery, not a separate healing package.
- Heavy card draw; meaningful Hothead package with competitive, not overpowered or underpowered stats.
- Move cards among board, hand, Stash and occasionally deck. Do not make every card explicitly reward bounce: combat and standalone utility should matter too.
- No permanent ramp package. Only limited temporary/conditional free deployment; Pick a Card and proposed Bush may be enough. Free deployment is still valuable even though it does not grow Stash.
- No healing outside bounce. Return-to-hand on Defeat is a possible future mechanic, not locked on any card.
- Cause Trouble on entry is locked on one character, currently plain text; keyword name remains pending. It does not grant extra actions or attacks.
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

## Locked characters (22 distinct designs)

| ID / working name | Cost | P/H/T | Approved effect |
|---|---:|---|---|
| P062 Birthday Kid | 1 | 1/2/1 | When played, look at the top 2 cards of your deck. Put one on top and the other on the bottom. |
| P061 Magician's Assistant | 2 | 2/2/1 | When played, you may return another character you control to your hand. |
| P063 Rabbit | 2 | 1/2/1 | When this character enters or leaves play, draw a card. |
| LAB-MAG-006 Dove | 2 | 2/1/0 | When this character enters or leaves play, you may deal 1 damage to an opposing character. |
| P066 Off-Duty Clown ★ | 2 | 2/3/1 | Whenever another character you control is returned from play to your hand, draw a card, then discard a card. |
| P076 Wi-Fi Bandit ★ | 2 | 2/2/1 | Hothead. Old random Stash exchange removed. |
| P077 Script Kiddie ★ | 2 | 1/2/1 | This character may Cause Trouble the turn it enters play. Old Stash exchange removed. |
| LAB-MAG-003 Birthday Boy ★ | 2 | 2/1/2 | No ability. Old Stash exchange removed. |
| LAB-MAG-001A/B Very Enthusiastic Volunteer ○ | 2 | 1/2/1 | When this character enters play or is returned from play to your hand, you may give another character you control +1 Power this turn. Not permanent. |
| P065 Escape Artist | 3 | 3/2/2 | Hothead. When played, you may return another character you control to your hand. |
| P067 School Bully ★ | 3 | 3/2/1 | Hothead, Sucker Punch. Remove Chicken. Reserve old name for another style/leader. |
| P071 Trapdoor Assistant | 3 | 1/2/1 | When played, you may return an opposing character costing 3 or less to its owner's hand. |
| P070 Tech Bro ★ | 3 | 3/2/2 | When Defeated, draw a card. Not a return-to-hand trigger; old combat-defeat draw removed. |
| LAB-MAG-004 Lady Who's Moving Out Again ○ | 3 | 2/3/1 | Hothead. When played, gets +2 Power this turn. When returned from play to your hand, you may return an opposing character costing 2 or less to its owner's hand. |
| P039 Social Media Influencer ★ | 4 | 2/4/2 | When played, look at the top 3 cards of your deck. Put one into your hand, one on top and one on the bottom. Old opponent-top-card reveal removed. |
| P064 Volunteer From the Audience ○ | 4 | 1/3/1 | Temporary borrowed opposing-deck character; details below. |
| P068 Social Media Grifter ★ | 4 | 3/3/2 | When played, draw 2 cards, then discard a card. |
| P069 Conspiracy Blogger ○ | 4 | 2/4/2 | At the start of your turn, name Character, Action or Item. Reveal your deck's top card. Correct type: put into hand. Incorrect: put on bottom. |
| P075 Pirate Radio Operator ★ | 4 | 3/3/2 | When this character attacks, an opponent chooses one: it gets +2 Power for this attack; or you draw a card. No discard. |
| P073 IT Guy Who Quit Six Months Ago ★ | 5 | 3/4/2 | When played, may exchange up to 2 Stash cards with the same number from hand. Each replacement retains the replaced card's Ready/Rotated state. Stash-inspection permission removed as redundant. |
| P074 Identity Thief ○ | 5 | 3/4/2 | When played, may choose another character and gain one of its printed keywords while that character remains in play. No trait copying. |

Current locked character curve: cost 1 = 1; cost 2 = 8; cost 3 = 5; cost 4 = 5; cost 5 = 2; cost 6 = 1. Total 22 (including the new finisher). Eight 2-cost designs is flagged as crowded; do not cut them arbitrarily before the complete curve review. A playable deck's copy distribution matters as well as unique designs.

Consolidate LAB-MAG-001A and LAB-MAG-001B into ONE Volunteer design during implementation, updating deck references. Consolidate P089 (old alternate Lady) and LAB-MAG-004 into the locked Lady design; do not preserve two conflicting cards with the same name in the active set.

### New finisher — LOCKED, name and ID pending

Cost 6, Power / Health / Trouble = 4 / 5 / 3.

“The first time each turn another character you control is returned from play to your hand, this character gets +2 Trouble this turn.”

Joseph explicitly approved this proposal. It is a new design, not yet assigned a stable ID; do not overwrite P078 without a separate decision. No Hothead or immediate Trouble permission is granted. It must be in play to see the return; earlier returns before it enters do not retroactively grant the bonus. Bonus is temporary and capped at +2 per turn per instance, regardless of additional returns. Separate copies each trigger; leaving/re-entering creates a new instance under core rules. Base Trouble 3 becomes 5 after a qualifying return. Magical eligibility remains open for the whole-set review.

Testing flag: repeatable 5 Trouble may be strong behind reliable bounce; assess survival, setup/resource costs and board-presence sacrifice before tuning. No stat/cost change is approved.

### Volunteer From the Audience — full lock

Cost 4, 1/3/1. When played, reveal the top card of an opponent's deck. If it is a character, you may play it under your control without paying its cost. It may attack immediately but cannot Cause Trouble this turn. At the end of your turn, return it to its owner's hand if it is still in play. If you do not play the revealed card, put it on the bottom of its owner's deck.

The borrowed character's entrance abilities trigger. It is not permanent theft. If Retaliate or another effect Defeats it first, it goes to its owner's discard and applicable Defeated/leave-play abilities trigger. End-of-turn return must not retrieve it from discard. Returning Volunteer itself must not cancel the scheduled return of the borrowed character. Returning a borrowed character always means its OWNER'S hand, not controller's hand. Details of control-trigger attribution and zone-change tracking need engine tests when implemented.

### Character testing flags and pending design

- Trapdoor Assistant: repeated opposing bounce may be oppressive. Keep cost 3 now; cost 4 is a noted first tuning option, NOT a current lock.
- Lady: strong entry combat plus return-triggered opposing bounce. Watch power; raising cost is possible, not locked.
- Rabbit: repeated card draw is intended; test loop costs and avoid accidental infinite triggers.
- Dove: damage, not permanent Health loss or placing tokens that bypass damage rules. Interacts with Absorb and damage triggers normally.
- Identity Thief can copy Hothead and attack immediately on entry; only printed keywords, not Script Kiddie's non-keyword permission. Verify numeric keywords and source-leaving behavior in implementation.
- P078 Pirate With a Business License ○: PENDING, not locked and not definitively tabled. Current old cost 5, 4/7/2; proposed 5, 2/4/2, once during your turn after opponent makes a choice instructed by your card, reveal top deck card; may play it free if cost <=2, otherwise bottom it. Need explicitly bottom any revealed card not played. Only audited character enabler is Pirate Radio Operator; Pick a Card and Wrong Address actions also qualify. Sparse support and another free-play effect may justify tabling or replacing it with a finisher. Two copies would each trigger once per turn and resolve sequential reveals, NOT draw 2. A once-per-turn limit is per copy unless text explicitly says shared.

## Locked actions (10)

| ID / working name | Cost | Approved effect |
|---|---:|---|
| P079 Pick a Card | 3 | Opponent chooses a card from your whole remaining hand without seeing its face. Reveal it; you may play it without paying its cost. NO draw-to-three. Physically fan the whole hand with backs toward opponent; digital must not reveal identities during selection. |
| P080 Now You See Me | 2 | Return a character you control to your hand. Then you may play a character costing 2 or less from your hand without paying its cost. Old extra discounted payment removed. |
| P081 Look Over There! | 1 | Rotate a chosen opposing character costing 3 or less. No skip-next-ready effect, no Response text. |
| P082 Wrong Address ○ | 2 | Choose two opposing characters; their owner chooses one to return to its owner's hand. If they have only one character, choose and return that one instead. No cost cap. |
| P084 Default Password ★ | 1 | Exchange a card in your Stash with a card in your hand. The replacement enters Stash in the same state—Ready or Rotated—as the card it replaces. This IS the initially unnamed locked exchange action, not an extra slot. |
| P085 Have You Tried Turning It Off? ○ | 3 | Draw 2 cards. Final user lock at chat ending. Old Rotated item/character bounce removed. |
| P086 Switcheroo | 2 | Choose a character you control and an opposing character with equal or lower cost. Return both to their owners' hands. |
| LAB-MAG-002 Ethan's JUST Being Dramatic ★ | 2 | Draw 2 cards, then discard a card. Old plain friendly bounce removed. |
| P142 I Want to Speak to Your Manager ★ | 2 | Return an opposing Item to its owner's hand. Draw a card. No cost cap; no Character option. Requires an opposing Item; cannot be played solely to draw. |
| P090 Poof! | 1 | Choose a character you control. After it next Causes Trouble this turn, return it to your hand. Must play before Trouble. No Ready, immediate-Trouble permission, or draw added. |

Important reversals: User rejected converting Poof! into conditional draw and explicitly restored the bounce-after-Trouble version. User instead reopened P085 and converted that generic bounce into 3-cost Draw 2. Do not accidentally restore earlier versions.

Ethan's draw 2/discard 1 overlaps Social Media Grifter's character entrance but has no identical standalone Misdirection action. Joseph approved the action after this check. Other styles have similar draw/discard patterns with sacrifice requirements; that is not another Misdirection action. Net hand growth: Ethan replaces itself while filtering; P085 grows hand by one after spending the action.

Wrong Address's 2-cost unrestricted opposing bounce is a testing flag, particularly against a single expensive character; no cost cap has been approved.

Manager testing lock: start at cost 2 with unrestricted opposing Item return and Draw 1. Test efficiency against expensive Item engines before adding a cap; no cap or cost increase is currently approved. Returning an attachment leaves its Character in play. The working name does not fit the Magician theme and must be renamed in the later coherent naming pass.

## Locked Items (2)

| ID / working name | Cost | Approved effect |
|---|---:|---|
| P088 Beer-Stained Cards ★ | 2 | Rotate this Item and spend 1 Stash: Draw a card. |
| LAB-MAG-005 Magician's Hat | 3 | Rotate this Item and spend 1 Stash: Return a Magical Character you control to your hand. |

Beer-Stained Cards' revised wording is locked. Its name sounds like Florida Man and needs a Misdirection-theme rename; this does not move the mechanical slot to Reckless. Separate copies each Rotate and pay separately. Rotation normally limits each copy to one activation between Ready transitions; no additional once-per-turn limit is locked. Watch whether existing draw makes this engine unnecessary.

## Tabled cards

- P087 Burner Phone ★: TABLED by Joseph. Preserve rename flag if reconsidered. Old Stash inspection/exchange no longer justifies its active slot.
- LAB-MAG-007 Do Not Look in the Hat: TABLED by Joseph after Item review. This supersedes the earlier defer-to-Items status. Do not include it as an approved action or revive without reopening.

## Magical trait — initial assignments and whole-set review

Magician's Hat cost, activation and Magical targeting are LOCKED. Magical is a trait, not a keyword, with no inherent rules effect. Rabbit and Dove initially gain Magical alongside Animal. Joseph approved this direction with the explicit condition that we review the whole set; the full eligibility list remains open. Do not automatically tag all Misdirection Characters. Review each candidate against entrance/return payoffs and repeated Hat use, including any eventual finisher. Preserve the approved Hat ability while deciding eligibility.

Inconspicuous Bush is a prior cross-chat concept, not yet an approved card in this audit: hide a character costing up to 5 under it; Rotate to Dismiss Bush and put the hidden character in play. Retrieve authoritative ID/cost/style/current existence before adding. No Bush matched the current production CARDS.json name/effect scan at handoff creation. Cloak on a fragile high-Power character is likewise a prior direction still to place/revisit, not an approved new card. Do not assume old brainstorming equals a lock.

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
- Birthday Kid/Influencer + Blogger: arrange correct-type reveals.
- Poof! + Rabbit/Lady: Trouble first, then exit draw or opposing bounce; no instant action permission granted by Poof! itself.
- Wrong Address/Radio/Pick a Card + pending Pirate: opponent-choice triggers, only if this pending build-around survives audit.

## Prior deck status and test baseline

Reckless/Florida Man and Stonewall/HOA are already implemented, committed and browser-tested. Previous implementation commit: 2bfc0c257b4458afc1e3750007f201a280e52c29. Simulation commit: 573208641b30b128729eccbb034259ee91305e17. HEAD may have advanced since; fetch current main before writing. Do not revert unrelated changes.

400 production-engine games (100 seeds x both seats x both first players): HOA 224 wins (56.4% of 397 completed), Florida 173 (43.6%), 3 unresolved at 60-round cap. Mean 9.6 rounds, median 9; first player won 48.1%. Unresolved games had both decks empty and no characters left. No new tie rule introduced. Simple heuristic AI, coverage decks, no mulligans, pending shared Last Straw effects; NOT a final balance verdict. Reports: HEAD_TO_HEAD_20261008.md/json; reproducible runner: web/headtohead.sim.mjs.

Reckless committed pool has 32 cards with last slot intentionally open. Stonewall count is 33 approved designs (21 characters, 9 actions, 3 items), not 32; preserve user locks and revisit whether a card should be tabled instead of silently deleting one. Standard 40-card decks and regression checks already exist. New Misdirection simulations should wait until its actual revised mechanics are implemented.

## Implementation checklist for later

1. Finish actions/items and finisher/curve/names before assuming set size finalized. Current approved counts: 22 Characters + 10 Actions + 2 Items = 34. Finisher is locked; character curve and whole-set Magical eligibility remain to review; Burner Phone ★ and Do Not Look in the Hat are tabled. Pending Pirate is not included.
2. Retrieve latest remote CARD/DECK/rule state. Apply this record's final approvals, not obsolete baseline values or superseded proposals. Keep IDs stable where possible; explicitly migrate duplicate references.
3. Update CARDS.json, DECKS.json, builder text, engine effects, AI choices, tests, rules and NOTES when authorized to implement. Do not claim functional verification before running it.
4. Test entrance vs play wording for direct deployments; borrowed ownership and trigger controller; Hothead copying; temporary Power expiry; bounce clears board damage/buffs appropriately; optional choices; deck shortfalls; cost payment and per-slot Stash state; hidden-hand choice privacy; Poof one-use expiry; scheduled effects following source departure without retrieving a new incarnation of a card.
5. Preserve published Reckless and Stonewall behavior. Return borrowed cards to OWNER zones. Absorb uses highest applicable value, not addition; Retaliate still deals its damage even when defender is Defeated. Ready/Rotated and turn-entry restrictions still apply unless explicitly overridden.
6. Run mechanic regression tests, all-card coverage matches and browser checks. Then compare balance without tuning from a single AI matchup.

## Suggested opening prompt for the new chat

Continue Unhinged's Misdirection/Birthday Party Magician audit. Read MISDIRECTION_AUDIT_HANDOFF_20261008.md in jobeck17/unhinged. Manager is now locked at 2 cost: return an opposing Item, Draw 1, no cost cap; its name is flagged ★. Burner Phone ★ and Do Not Look in the Hat are now tabled. Beer-Stained Cards ★ is locked at cost 2: Rotate this Item and spend 1 Stash, Draw a card. Magician's Hat is locked at cost 3: Rotate this Item and spend 1 Stash, Return a Magical Character you control to your hand. Rabbit and Dove initially gain Magical alongside Animal; review the whole set for final eligibility. New finisher is locked at cost 6, 4/5/3: first time each turn another friendly Character is returned from play to your hand, gets +2 Trouble this turn. Name/ID pending. Next review the character curve, ability distribution, Magical assignments and the pending Pirate's disposition. Use batches of three where possible and preserve all locks/name flags. Revised Misdirection cards have not been implemented yet.
