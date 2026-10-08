# Unhinged — Misdirection audit handoff

Updated 8 October 2026, after Joseph locked Have You Tried Turning It Off? at cost 3, Draw 2. This is the continuation record for a new chat. Read this before continuing the audit.

## Exact stopping point and next steps

Character first pass and most actions are approved. Finish the remaining actions, then audit items. After that revisit the character curve, ability distribution, and create a real finisher; finally rename cards as one coherent theme pass. Work in batches of three: current card, proposed update, role/combo and any testing concern. Joseph approves individually or by batch. Do not restart approved decisions.

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
- Enough distinct options and a win-pressure payoff, not endless draw/bounce loops. Avoid redundant effects. Most expensive character should justify its role; a finisher is still missing.
- Stats below are Power / Health / Trouble. No universal Trouble bonuses; bonuses belong on specific card text.
- Global Responses were previously scrapped. Do not reintroduce them.

## Name flags

- ★ = rename needed. Keep current name as a working label, not final flavor.
- ○ = user likes or may like the name, but review fit with the revised ability.
- Unmarked = no new rename flag established, not necessarily a permanent name lock.
- School Bully's name is reserved for possible HOA or Backyard Wrestler use. The Hothead/Sucker Punch mechanical slot stays in Misdirection.
- Do the naming pass after mechanics/curve, rather than forcing flavor now.

## Locked characters (21 distinct designs)

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

Current locked character curve: cost 1 = 1; cost 2 = 8; cost 3 = 5; cost 4 = 5; cost 5 = 2. Total 21. Eight 2-cost designs is flagged as crowded; do not cut them arbitrarily before the complete curve review. A playable deck's copy distribution matters as well as unique designs.

Consolidate LAB-MAG-001A and LAB-MAG-001B into ONE Volunteer design during implementation, updating deck references. Consolidate P089 (old alternate Lady) and LAB-MAG-004 into the locked Lady design; do not preserve two conflicting cards with the same name in the active set.

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

## Locked actions (9)

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
| P090 Poof! | 1 | Choose a character you control. After it next Causes Trouble this turn, return it to your hand. Must play before Trouble. No Ready, immediate-Trouble permission, or draw added. |

Important reversals: User rejected converting Poof! into conditional draw and explicitly restored the bounce-after-Trouble version. User instead reopened P085 and converted that generic bounce into 3-cost Draw 2. Do not accidentally restore earlier versions.

Ethan's draw 2/discard 1 overlaps Social Media Grifter's character entrance but has no identical standalone Misdirection action. Joseph approved the action after this check. Other styles have similar draw/discard patterns with sacrifice requirements; that is not another Misdirection action. Net hand growth: Ethan replaces itself while filtering; P085 grows hand by one after spending the action.

Wrong Address's 2-cost unrestricted opposing bounce is a testing flag, particularly against a single expensive character; no cost cap has been approved.

## Remaining actions and items — old versions, NOT audited locks

Likely next action batch has only two remaining existing actions; don't invent a third merely to fill the batch:

| Card | Existing cost/effect | Review concern |
|---|---|---|
| P142 I Want to Speak to Your Manager | Action 2: return an Item or Character costing <=2 to owner's hand. | Another generic bounce; user wants less redundant bounce. Item interaction may justify a different role. |
| LAB-MAG-007 Do Not Look in the Hat | Action 1: play Rabbit or Dove from hand free, only if you control a Rotated Magician's Hat. | Conditional free-play package; review alongside Hat and stated limited free deployment. |
| P087 Burner Phone | Item 1: Rotate, look at up to 2 Stash cards, may retrieve one and replace it with a hand card Rotated. | Inspection now general; exchange action and IT Guy already cover exchange. Rework/retain/table deliberately. |
| P088 Beer-Stained Cards | Item 2: once during own turn, Rotate it and spend 1 Ready Stash to draw a card. | Repeatable draw, cost/tempo needs audit. |
| LAB-MAG-005 Magician's Hat | Item 4: Activate, return a Rabbit or Dove you control to hand. | Narrow reusable bounce engine; audit cost and activation wording, avoid too much bounce. |

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

1. Finish actions/items and finisher/curve/names before assuming set size finalized. Current approved counts: 21 characters + 9 actions = 30; three existing items and two remaining actions are not yet locked. Pending Pirate is not included.
2. Retrieve latest remote CARD/DECK/rule state. Apply this record's final approvals, not obsolete baseline values or superseded proposals. Keep IDs stable where possible; explicitly migrate duplicate references.
3. Update CARDS.json, DECKS.json, builder text, engine effects, AI choices, tests, rules and NOTES when authorized to implement. Do not claim functional verification before running it.
4. Test entrance vs play wording for direct deployments; borrowed ownership and trigger controller; Hothead copying; temporary Power expiry; bounce clears board damage/buffs appropriately; optional choices; deck shortfalls; cost payment and per-slot Stash state; hidden-hand choice privacy; Poof one-use expiry; scheduled effects following source departure without retrieving a new incarnation of a card.
5. Preserve published Reckless and Stonewall behavior. Return borrowed cards to OWNER zones. Absorb uses highest applicable value, not addition; Retaliate still deals its damage even when defender is Defeated. Ready/Rotated and turn-entry restrictions still apply unless explicitly overridden.
6. Run mechanic regression tests, all-card coverage matches and browser checks. Then compare balance without tuning from a single AI matchup.

## Suggested opening prompt for the new chat

Continue Unhinged's Misdirection/Birthday Party Magician audit. Read MISDIRECTION_AUDIT_HANDOFF_20261008.md in jobeck17/unhinged. We just locked Have You Tried Turning It Off? at 3 cost, Draw 2. Finish remaining actions (Manager and Do Not Look in the Hat), then items, then revisit a finisher and the character curve. Use batches of three where possible and preserve all locks/name flags. Revised Misdirection cards have not been implemented yet.
