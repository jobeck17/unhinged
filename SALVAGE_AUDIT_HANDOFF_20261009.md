# Salvage / Trash Baron audit

## October 13 commit, corrected engine and playable audit

User requests committing all work and further testing, deferring balance changes until human play. Baseline audit committed as 17fa243. Found and corrected an ID dispatch bug (P91–P99 instead of P091–P099); earlier simulation numbers are superseded. Added exact approved-ID and browser/simulation list parity regressions. Current regression total: 148. Reran both original and revised pilots on corrected engine: 1,920 matches, all complete with conservation checks, no stalls. Revised pilot preserves expensive payoffs, deploys larger bodies before supplies, establishes early bodies and spends temporary own Stash first. Coverage wins: Florida Man 50%, HOA 13.8%, Magician 53.8%. Focused wins: 51.3%, 13.1%, 53.8%. Heuristic/no-mulligan results; no balance changes or claims of expert play.

Separate browser audit: `lab/salvage-audit/index.html`, published through Pages at `/unhinged/lab/salvage-audit/`. Five selectable lists: two approved Salvage trials and three production opponents. Phone browser checks passed for all list starts, mulligan, End Turn/AI completion, reactive Zip deployment, dismissal destination and temporary Stash inspection. Production main playtest and builder remain unchanged. Full report: `lab/salvage-audit/SUMMARY_20261013.md`. Keep all card locks; HOA matchup, Heap assembly and ramp are human-testing priorities.

## October 13 reactive Zip Ties lock and isolated simulations

Zip Ties retains its name and cost 1. Locked replacement: **When an opposing Character attacks, you may Dismiss this to give that Character −2 Power for that Attack.** No Rotate requirement; it works while Rotated, including Garage Inventor deployment. Supersedes proactive October 12 wording. Seven disposable Items and persistent Duct Tape remain.

Isolated prototype in `lab/salvage-audit/` implements the approved 32-card draft for simulation only. Production CARDS/DECKS, builder and browser playtest remain unchanged. Regression checks: 142 passed, including all 32 deployments, six Actions, eight Items and a legal turn-three Hoarder ramp sequence. Automated matchups: 960 completed, no stalls or card-conservation failures. Results and limitations in `lab/salvage-audit/SUMMARY_20261013.md`.

No balance revisions approved from these results. Watch temporary-resource bursts, weak automated performance against HOA, and Junk Heap's slow assembly. Discard-based Heap remains an unapproved alternative. Production integration, browser choices/timing, mixed-Style tests and full trait audit remain outstanding. Preserve all locks and banked naming reservations.

## October 13 Handyman parked and economy review

P101 Handyman parked with locked name/stats/ability preserved in draft banked list. Active set: **32 cards, 18 Characters / 6 Actions / 8 Items**. Total curve 9/11/6/3/2/1; Character curve 3/4/5/3/2/1. Junk Heap remains active. Earlier 33-card overview is a historical snapshot.

Routine trait corrections authorized: remove Scout from Scrap Dealer; add Construct to Shopping Cart Golem; add Scavenger to Trash Collector; remove stale Human audit identity from Constructs. Full trait audit after all decks.

Joseph raises temporary-ramp strength from cheap tools and Item exhaustion. Discard-scaled Junk Heap is an alternative to consider if stored Items starve the engine, not yet approved. User accepts seven disposable Items and wants activation/effect variety instead of making another persistent. No economy or Item ability changes approved here. Preserve current locks pending review/testing.

## October 13 final set reconciliation — 33 designs

Joseph explicitly keeps the eight remaining names: Wind-Up Toy, Possum in the Trash Can, Junkyard Scrapper, Shopping Cart Golem, Trash Collector, Garage Inventor, Raccoon of Unusual Size, Hoarder. Clear their flags. All active names are now approved.

**Shade Tree Mechanic:** remove end-turn Dismiss; entry optionally plays an Item costing 1 or less from discard free with normal entry and no expiry/one-use marker. Supersedes temporary-replay wording.

**Junk Heap added as LAB-SAL-003, Character 19/card 33 for now.** Cost 3, 0/2/0; approved storage scaling/gate/cap trial, no five-Item recovery bonus. Stored Item cleanup goes to owners' discards when Heap leaves; storage is not in play and cleanup cannot recapture/re-salvage. Construct trait assigned to assembled junk creature, to reconcile in final trait audit. Existing Colossus/Junkyard Giant stays; no other card removed.

Set now **19 Characters / 6 Actions / 8 Items**, total curve **9/11/7/3/2/1**, Character curve **3/4/6/3/2/1**. Clean full-set overview: `brainstorm/salvage-audit/LOCKED_SET_20261013.md`; machine-readable current approved draft: `STARTING_DRAFT.json`. Earlier 32-card targets and banked Junk Heap slot notes superseded. Production CARDS/DECKS/builder/playtest remain unchanged. Final trait/wording/play-line checks and implementation outstanding.

## October 13 six names locked

- P091: **Scrap Dealer**, replacing Scout Troop Quartermaster.
- P101: **Handyman**, replacing Extension Cord Electrician.
- P107: **Shade Tree Mechanic**, replacing Curbside Mechanic. Use this spelling.
- P108: **Junkyard Giant**, replacing Scrapheap Colossus. Preserve the banked Unlicensed Pool Guy Florida Man reservation.
- P105: **Broken Robot Vacuum**, replacing Jailbroken Robot Vacuum.
- LAB-SAL-001: **Busted Shopping Cart**, confirmed over Broken Shopping Cart.

All six name-review flags cleared. Costs/stats/abilities unchanged. Production unchanged; audit draft updated. Remaining general Character review flags preserved.

## October 13 naming pass

Names explicitly confirmed/locked: **Dumpster Diver (P094), Junkyard Dog (P097), Cockroach (P104), Rat King (P102), Guy Fixing His Trans Am (P092), Play Dead (P116), Junk Heap (banked trial; slot unresolved)**. Clear naming-review flags on these, preserve mechanics. Junk Heap remains outside active pool until slot decision.

Quartermaster must change; Dumpster Foreman rejected too. Short, recognizable resourceful/trash archetypes preferred over excessively descriptive titles. Extension Cord Electrician too descriptive. Scrapheap Colossus disliked/requires replacement. Curbside Mechanic vibe correct, user prefers roadside/improvised mechanic setting. Shopping Cart liked; Broken Shopping Cart preferred, Busted acceptable fallback if no better name. Do not silently rename unapproved alternatives.

Proposed choices for conversation: Quartermaster -> Scrap Dealer; Electrician -> Handyman; Mechanic -> Shade-Tree Mechanic or Roadside Mechanic; Colossus -> Junkyard Giant; Vacuum -> Runaway Vacuum optional; Cart -> Broken Shopping Cart. Other optional thematic names: Drifter, Hobo, Scavenger, Tinkerer, Pack Rat, Pigeon, Seagull. None adds a card or changes traits/abilities. User invited honest naming thoughts about homeless/resourceful archetypes; no new card assignments approved.

## October 12 final Actions locked / naming checkpoint

- **P109 Scrounge:** cost 1; look at top 3, optionally reveal an Item into hand, rest into discard. Name/ability locked.
- **P116 Play Dead ★:** cost 3; choose a damaged Character: friendly heal all damage then Rotate, otherwise Return to owner's hand. Mechanics locked; name explicitly flagged as offered in final approval question. Supersedes earlier open mechanics note.
- All six Actions and eight Items now mechanically locked, with eighteen Characters locked. Preserve all eighteen Character final-review name flags; explicit problematic names P091, P101, P102, P107, P105, plus long Trans Am and provisional Colossus for discussion. Busted Shopping Cart remains provisionally named pending final name reconciliation. Junk Heap name/slot unresolved outside active pool. No production changes.

## October 12 final Item batch — locked

- **P119 Tin Can Slingshot:** cost 2; Rotate, Dismiss this: deal 2 damage to a chosen opposing Character. Name and ability approved. Replaces Mystery Drawer of Cables entirely: no entry Draw and no Ready-an-Item activation.
- **LAB-SAL-001 Busted Shopping Cart:** cost 2; Rotate, Dismiss this: a chosen opposing Character gets -2 Trouble until the start of your next turn. Approved. Immediate Dismiss; no armed Cart, later consumption or next-Trouble shield. Multiple targeted debuffs stack; effective Trouble minimum zero. A zero-Trouble Character cannot Cause Trouble, including final Last Straw hit. Supersedes earlier Cart shield/consumption rules. Scurry Away unchanged.

All 8 Items now reviewed/locked. Action pool needs final reconciliation: Scrounge not yet explicitly locked; Play Dead mechanics remain open. Preserve locked Jury-Rig, Another Man’s Treasure, Finders Keepers and One Man’s Trash decisions. Character naming flags and Junk Heap slot remain outstanding. Production unchanged.

## October 12 Item batch — Sandwich, Crowbar and Duct Tape locked

- **P120 Used Ham Sandwich:** cost 1; Rotate/Dismiss to heal a friendly Character 2 damage; if Scavenger, Draw 1 then Discard 1. Name and ability approved.
- **P112 Bent Crowbar:** cost 2; Rotate/Dismiss to Dismiss an opposing Item costing 3 or less. Replaces Questionable Spare Parts/That's Probably Still Good healing/buff slot. Name/ability approved.
- **P117 Duct Tape:** cost 2; persistent, unattached. Rotate: heal 1 damage from a chosen friendly Character, or 2 if Construct. Name/ability approved. Remove attachment and passive +1 Health; no Rotate/Ready attachment switching.

Final Item batch: Mystery Drawer of Cables and Busted Shopping Cart, preserving Cart cost/protection/stacking decisions. Production unchanged.

## October 12 Trash Collector exception and Junk Heap trial lock

Joseph approves the **Trash Collector exception**: retain its locked Scurry Away and optional entry Item-from-discard -> face-up Rotated temporary Stash, usable under other Leaders in legal decks. Trash Baron's passive still grants the broad ongoing recycling permission; Collector grants one entrance salvage event. This resolves the earlier exception question; do not remove Collector's effect.

**Junk Heap trial design locked without five-Item bonus:** cost 3, base 0/2/0; optional capture own Items leaving play toward own discard under it instead; +1 Power/Health/Trouble per stored Item; cannot Attack/Cause Trouble until at least 3 stored; starting storage cap 5. No five-Item recovery ability or other threshold bonus for now. A qualifying Item chooses one replacement destination, not both Stash and storage. Source scope and cap follow the proposed base for testing; exact engine cleanup/ownership wording remains implementation work. Keep outside the active 32-card pool until the user selects a slot/replacement; do not silently add a 19th Character. Existing Colossus remains locked, not replaced. Name provisional. Production unchanged.

User says lock everything else in this discussion, not all unreviewed Items. Continue Item review. Remaining unreviewed Items: Used Ham Sandwich, Questionable Spare Parts, Duct Tape, Mystery Drawer of Cables; Busted Shopping Cart's cost/protection/stacking direction already approved, final text/name review remains.

## October 12 Junk Heap direction / Zip Ties confirmed

- **P118 Zip Ties locked:** cost 1, name Zip Ties, Rotate/Dismiss to give a chosen opposing Character -2 Power until the start of your next turn. Supersedes next-damage reduction.
- **Junk Heap exploration:** Joseph agrees on cost 3 and building toward 3/5/3 with three stored Items, 5 Trouble with five Items; likes a threshold payoff and requests deeper exploration/testing. Do not claim total resource cost is always 6: free deployment/replay, existing Items and leader use of opposing Stash change the resource/tempo cost. Not added to active pool; threshold payoff, cap and exact final text remain proposals. If complexity is excessive, consider scaling from a public Item zone instead.
- **Trash Collector:** user is undecided about retaining its explicit discard-to-temporary-Stash ability as a cross-Leader exception, asks whether unique. Pool inspection: sole direct Item-discard -> face-up Rotated temporary-Stash Character in revised Salvage draft. Current production has other ordinary additional Stash Characters (P043, P123), and legacy Jerry-Rig Items pending migration, so do not claim sole resource-producing card globally. Keep Collector's current lock unless user changes it; exception decision open.

## October 12 One Man’s Trash… normal-entry lock

**P115 One Man’s Trash…:** cost 2 Action. Play an Item costing 2 or less from your discard for free. It enters normally (Ready unless its own text says otherwise); ordinary entrance abilities and legal activation apply. No end-turn Dismiss, no next-activation Dismiss, no one-use marker. Joseph rejects extra bookkeeping and wants Item review to handle persistence; few persistent Items expected. Supersedes all restricted P115 replay proposals. Curbside Mechanic's independently locked temporary replay is NOT automatically changed by this Action-specific instruction; revisit separately if desired. Next: review Items, leaving existing locks intact. Production unchanged.

## October 12 Action naming and revision pass

- **P113 Make It Work -> Jury-Rig:** name locked; retain cost 2, Dismiss one of your Items to Draw 2, no discard. Jury-Rig is an Action name, distinct from retired Jerry-Rig keyword renamed Scrap.
- **P111 Cash In the Clutter -> Another Man’s Treasure:** name/current mechanics locked provisionally, only reopen if a better One Man’s Trash pairing is approved. Cost 2, put up to 2 face-up Items from Stash into discard, chosen friendly Character +1 Trouble this turn per Item. No Dismiss event.
- **P114 Curb Alert -> Finders Keepers:** retain cost 1 and top-4 search; expand free Item deployment limit to 2; leftover cards may be placed top or bottom in any order. Proposed interpretation is splitting leftovers freely between top/bottom with chosen ordering; confirm if needed. User requested keep/revise, recorded as approved direction.
- **P115 Don’t Throw That Away -> One Man’s Trash…:** working name supplied. End-turn Dismiss timing reopened; user wants a combo with Another Man’s Treasure. Existing text remains baseline, not newly locked. Proposed discussion: replay Item costing <=2 free from discard and Dismiss it after its next activated ability resolves if it is still in play; no turn-end deadline. Proposal not approved.
- **P116 Good as New -> Play Dead:** working name supplied, user says maybe same Action; mechanics still open. Cost 3 full friendly damaged-Character heal/Rotate or opposing damaged-Character Return stays baseline, not newly locked.

Scrounge remains current pending review. Production unchanged.

## October 12 fifth Character batch — completed

Joseph's "Lock all that" approves the remaining fifth-batch proposals: **P093 Garage Inventor** cost 4, 3/5/2, name and previously locked once-during-your-turn discover/deploy any Item free Rotated; **P098 Raccoon of Unusual Size** cost 4, 4/4/2, name, Scurry Away and optional Item Dismiss on Attack for +2 Power for that Attack. Vacuum's separately locked cost 4, 3/5/2, optional top-2 entry discard and uncapped discard-only scaling remain unchanged; preserve its ★ name-review flag. Production unchanged. Next batch: Guy Fixing His Trans Am, Hoarder and Scrapheap Colossus.

## October 12 Vacuum lock

**P105 Jailbroken Robot Vacuum ★:** cost 4, 3/5/2. When this enters play, optionally put the top 2 cards of your deck into your discard. This gets +1 Power for each Item in your discard. **No cap for now; no face-up Stash contribution.** Name flagged for review, not renamed. Bonus tracks actual current discard Items and decreases when Items are recovered or otherwise leave discard. Uncapped scaling is a testing watchpoint, not a proven balance result. This supersedes earlier cap and Stash-counting proposals. Garage Inventor cost/stats and Raccoon fifth-batch proposal still await approval; do not silently lock them from this Vacuum-specific instruction. Production unchanged.

## October 12 fourth Character batch — locked, names flagged

- **P101 Extension Cord Electrician ★:** cost 3, 2/4/2; entry optionally Ready an Item, Draw 1 only if it actually changes from Rotated to Ready. Name review requested, not renamed.
- **P102 Rat King ★:** cost 3, 2/4/1; Scurry Away; your other Characters with Scurry Away get +1 Trouble. Supersedes permanent Rotated Trouble prevention. Aura ends when this leaves play; applies to other copies too and ordinary bonuses stack unless later revised. Name review requested, not renamed.
- **P107 Curbside Mechanic ★:** cost 3, 2/4/1; entry optionally play an Item costing 1 or less from discard for free; Dismiss that actual instance at end of turn if still in play. Name review requested, not renamed.

All three costs/stats/abilities locked by Joseph's "I like all of that" approval. Preserve all older naming flags, including P091 Quartermaster ★. Next Character batch: Garage Inventor, Raccoon of Unusual Size, Jailbroken Robot Vacuum. Production unchanged.

## October 10 superseding lock — Scurry Away and Trouble protection

**Scurry Away:** When an opposing Character would Cause Trouble to your Leader, you may return this Character to your hand to reduce that Trouble by 1.

This replaces the original Defeat/Dismiss-an-Item recovery keyword. Actual returns from play are required; Ready or Rotated qualifies. Multiple Characters may stack their reductions on one event, minimum zero. This is an explicit triggered choice, not a general response window, and does not cover other Composure loss. Include at least one 1-cost pest during individual review; exact assignment remains pending. Original Possum recovery is banked for possible explicit text. Rat King's permanent Trouble reduction is reopened for review, not locked.

Multiple activated Busted Shopping Carts may stack on the same next Trouble event and combine with Scurry Away. Shields expire at the stated next-turn boundary; all applicable next-event shields are consumed on that event, with no excess reduction carried forward. Protection spends board presence or disposable Items. Prior nonstacking/queued-Cart proposal was not approved and must not be implemented. Production unchanged.

## October 10 interview lock — Breaking Point and next checkpoint

- Breaking Point locked: **At the start of your next turn, Ready all opposing Stash.** Supersedes immediate Ready-all proposal. Breaking Point does not switch turns; Last Straw forces the normal end-of-turn sequence and pass.
- Two broad pre-card-review checks remain: Trouble-protection stacking/limits and the remaining conventional draw effects under the scavenging/recycling direction. Individual costs/stats/names/abilities still receive card-by-card review; these two checks do not claim all balance questions resolved.
- At the next stopping point, revisit completed Florida Man, HOA President and Birthday Party Magician decks through **play lines**: ideal feasible card sequences each turn, resource availability, early setup, engine connection, payoff and recovery. Compare ideal lines against ordinary/missing-piece draws and first/second-player timing. User wants to verify combos scale properly, not merely inspect card-cost distribution. Salvage gets the same check after its draft is reviewed. Do not assume multiple turn-one plays are feasible without accounting for actual Stash and leader abilities. This checkpoint is requested, not yet performed.

## October 10 interview lock — engine stacking

Joseph approved per-copy Garage Inventor discovery and Trans Am recovery. Two eligible Inventors resolve separate sequential reveals from the same Dismiss. Each eligible Trans Am can recover a different actual spent Item; the same physical card cannot be recovered twice. Hoarder's first-Item discount is capped at 1 across all copies: "This discount does not stack with other Hoarders." Exact Hoarder cost/stats/entry ability remain for individual review. No production changes.

Decision date: October 8, 2026 (America/New_York).

## Locked direction — approved by Joseph

Identity: Item play and extreme resourcefulness. Nothing wasted; junk offers mostly temporary utility, especially on its second use. Pest-like Characters stay in the way, survive through consuming supplies, Cause Trouble, and may interfere with opposing Trouble.

- Keep Trash Baron's passive: use opposing Ready Stash to pay your Costs as though it were your own.
- Breaking Point Readies opposing Stash. Exact scope/wording remains to be reviewed.
- Rename/refine Jerry-Rig as **Scrap**, rather than adding a parallel keyword: if this Item would go to your discard from play, you may put it face-up and Rotated into your Stash instead. Discard it when spent.
- Scrap enters Rotated by default; its second use is future fuel. Spending it from Stash is not Dismiss and must not retrigger Item-Dismiss rewards.
- **Scurry Away** keyword: when this Character is Defeated, you may Dismiss one of your Items. If you do, return this Character from your discard to your hand. Based on current Possum ability; distribute across several suitable pests.
- Several disposable Items with Rotate, Dismiss this activations; retain a few durable tools.
- Item-Dismiss rewards can draw, repair, recover a small Item, or strengthen a pest. Strong rewards can use first Item Dismiss each turn caps; exact individual caps are not yet locked.
- Temporary cheap-Item replay from discard, with mandatory Dismiss at turn's end, for one more use before Scrap.
- Distinct pest survival patterns: Item-funded recovery, damage absorption, and recovery after Defeat.
- Trouble interference on pests, using explicit card text; Meat Shield currently does not block Trouble.
- Pest protection concept: first time it would take damage each turn, optionally Dismiss an Item to reduce that damage. Reduction amount and card assignment pending.
- Pool target to explore: **18 Characters / 6 Actions / 8 Items = 32 designs**. Exact card assignments/costs remain proposals.

These locks are design documentation, not implemented card text or playtest rules. Preserve all existing locks and naming reservations from other audits.

## Concrete starting draft

Joseph authorized making the proposed changes as a starting point. The complete 32-card draft is in `brainstorm/salvage-audit/STARTING_DRAFT.json`, with current-versus-proposed text in `STARTING_DRAFT.md`. All 30 original slots are accounted for, including the Pool Guy replacement and preserved Florida Man reservation; two new Items complete 18/6/8. Character curve is 3/4/5/3/2/1; total curve is 9/10/7/3/2/1. These exact card revisions remain reviewable proposals, not individual locks. Production cards, builder and playtest have not been changed.

## Current baseline

Read from CARDS.json at main d0952c7: 30 designs, 18 Characters / 8 Actions / 4 Items.

| Cost | Characters | Actions | Items | Total |
| --- | ---: | ---: | ---: | ---: |
| 1 | 1 | 4 | 2 | 7 |
| 2 | 5 | 4 | 2 | 11 |
| 3 | 4 | 0 | 0 | 4 |
| 4 | 3 | 0 | 0 | 3 |
| 5 | 3 | 0 | 0 | 3 |
| 6 | 2 | 0 | 0 | 2 |

All 30 Salvage designs are included below, including cards omitted from the current 40-card deck.

## High-level proposals — not individually locked

- P091 Scout Troop Quartermaster: consider stronger Item identity rather than combat-victory draw.
- P092 Guy Fixing His Trans Am: replace Ready-Scrap override; overlaps P108 at cost 6 and can create instant fuel loops.
- P093 Garage Inventor: retain Dismiss payoff; review repeated rummage and multi-copy caps.
- P094 Dumpster Diver: retain Item finder; consider cost/stat adjustment for early curve.
- P095 Hoarder: review six-card-hand discount versus pest/supply identity; avoid stacking discount loops.
- P096 Shopping Cart Knight: candidate Meat Shield / durable protector, review Slowpoke.
- P097 Junkyard Dog: candidate low-cost defender or pest support; currently textless.
- P098 Raccoon of Unusual Size: retain Item-funded attack concept; revisit expensive recovery entry overlap.
- P099 Crazy Cat Lady: review Animal healing/support role and naming overlap with Cat Lady Leader.
- P100 Wind-Up Toy: retain Sucker Punch; potential disposable-Item synergy.
- P101 Extension Cord Electrician: retain Ready-Item entry; review Builder condition.
- P102 Rat King: fix Rat lord with no other Rat cards in this pool; add real Rat support or change affected trait.
- P103 Possum in the Trash Can: express existing ability as Scurry Away.
- P104 Trash Palace Cockroach: retain distinct persistence or give Scurry Away; prioritize actual pest presence over bottom-deck-only value.
- P105 Jailbroken Robot Vacuum: review discard-Item payoff conflicting with Items moving into Scrap Stash; retain capped scaling.
- P106 Shopping Cart Golem: retain face-up Stash synergy; watch already-large cost-2 stats.
- P107 Curbside Mechanic: differentiate recovery from Actions; candidate temporary Item replay.
- P108 Unlicensed Pool Guy: name already flagged for Florida Man; deliberately review move/replacement, not automatic move. Consolidate duplicate cost-6 role.
- P109 Scrounge: retain cheap Item selection / discard setup.
- P110 I Can Fix That: candidate disposable repair-tool Item conversion.
- P111 Cash In the Clutter: revise resource denial overlapping passive; candidate Dismiss-for-value Action.
- P112 That's Probably Still Good: candidate disposable healing Item conversion; differentiate Used Ham Sandwich.
- P113 Make It Work: retain Dismiss-to-draw Action concept; review rate and redundant rummage.
- P114 Curb Alert: merge/revise redundant cost-1 recovery.
- P115 Don't Throw That Away: differentiate temporary Item replay from recovery overlap.
- P116 Good as New: preserve flexible heal / opposing damaged-Character Return utility for review.
- P117 Duct Tape: durable Scrap tool; attachment cleanup must not trigger Dismiss rewards.
- P118 Zip Ties: review temporary Health falling off and attachment removal timing; consider protection redesign.
- P119 Mystery Drawer of Cables: retain entry draw / Dismiss-to-Ready-Item connector with Scrap.
- P120 Used Ham Sandwich: retain disposable repair identity; differentiate other healing and rummage.

Converting two Actions to Items yields 18/6/6; two new Items are needed to reach 18/6/8. First candidates for new slots: temporary Trouble protection and a disposable Item finder.

Character curve starting proposal: 3/4/5/3/2/1 across costs 1–6 (18 total). Do not change costs/stats without individual review.

## Machines to test

- Disposable Item -> Dismiss effect + Garage Inventor reward -> Rotated Scrap -> future fuel -> discard recovery.
- Possum/another Scurry Away pest Defeated -> Dismiss Item -> pest back to hand + Scrap + Dismiss payoff.
- Mystery Drawer of Cables -> Ready durable Duct Tape/another useful tool -> Drawer becomes Scrap.
- Temporary replay -> use Item -> Dismiss by activation or end-turn cleanup -> Scrap (one actual card, no double reward).
- Face-up Scrap supports Shopping Cart Golem; spending the last Scrap removes its bonus.
- Breaking Point Readies opponent's Stash -> leader can spend it for recovery/protection; unused fuel benefits opponent.

Avoid free recursive Item replay, instant Ready-Scrap refunds plus discounts, unlimited Trouble blocking, and multi-copy uncapped Dismiss draw. Scrap, Defeat, Dismiss, spending from Stash, and attachment cleanup remain distinct events.

## October 9 interview decisions

- **P111 Cash In the Clutter locked:** Cost 2 Action. Put up to 2 face-up Items from your Stash into your discard. A chosen friendly Character gets +1 Trouble this turn for each Item moved this way. Ready or Rotated Items qualify. Stash movement is not Dismiss and does not retrigger Scrap. Replaces the starting-draft draw version.
- Make It Work Dismisses an Item from play. If that Item has Scrap, its owner may put it face-up and Rotated into Stash instead of discard. The Dismiss event still counts once and Make It Work draws normally. Without Scrap, it goes to discard. This is a timing clarification, not approval of Make It Work’s individual draft revision.

- **LAB-SAL-001 Busted Shopping Cart cost locked at 2**, retaining proposed Scrap / Rotate, Dismiss to reduce next Trouble by 2. Total curve now 9/11/6/3/2/1; type counts unchanged.
- **Card advantage direction:** a little draw, primarily through scavenging and Item recycling rather than traditional generic draw. Joseph likes Oswald’s card acquisition and Tamatoa’s Item recycling. Revisit draft draw effects under this direction before individual locks.

- **P093 Garage Inventor ability locked:** Once during your turn, when you Dismiss one of your Items, reveal the top card of your deck. If it is an Item costing 2 or less, you may play it for free Rotated. Otherwise, put it on the bottom of your deck. Entry effects still happen. Once during your turn per copy; miss spends use. Declined/illegal qualifying Item deployment should bottom the revealed card (recommended wording clarification). Starting-draft cost 4, stats 3/5/2 retained for later individual review. Production unchanged.

- **P093 superseding lock:** Garage Inventor may deploy ANY revealed Item, with no cost limit. Retain once during your turn, free play, Rotated entry, and entry effects. This supersedes the prior costing-2-or-less clause. Trans Am recovery proposal is still unanswered/unlocked.

- **P092 Guy Fixing His Trans Am ability locked:** When this enters play, you may return an Item from your discard to your hand. Once during your turn, when you spend a face-up Item from your Stash, you may return that Item from your discard to your hand. Cash In does not qualify. Recover only the actual spent Item still in discard, after payment completes. Cost 5, 3/5/2 and name remain draft values pending individual review. Supersedes prior generic draw; the previously unanswered proposal is now approved.

- **LAB-SAL-002 Magnet on a String locked:** Cost 1 Item. Scrap. Rotate, Dismiss this: Return another face-up Item from your Stash to your hand. Ready or Rotated target qualifies; target must be another Item already in your Stash. Validate before Dismiss/payment. Name remains provisional. Supersedes top-3 search version.

## October 11 interview lock — Make It Work

**P113 Make It Work:** Cost 2 Action. Dismiss one of your Items. If you do, Draw 2 cards. No discard requirement. Scrap replacement and eligible Dismiss rewards still apply. Broad pre-card-review checks are complete; individual cards and other conventional draw effects remain for review. Next stopping point is reached: perform requested play-line check on completed Florida Man, HOA and Magician decks before starting the Salvage card-by-card pass. No production changes.

## October 11 completed play-line checkpoint

Reviewed Florida Man, HOA and Magician production rules/cards/decks at main 523241a. Constructed ideal-hand sequencing fixtures passed through production engine; these are not randomized consistency or win-rate tests. Existing three regression suites/integrations also passed. Findings and method are in `brainstorm/salvage-audit/PLAY_LINE_REVIEW_20261011.md`, engine checkpoint output in `PLAY_LINE_CHECKPOINTS_20261011.json`. Main issue is singleton-heavy coverage deck consistency, especially HOA early hand supply and Magician connector availability. Recommend separate focused 40-card test lists before changing locked designs. This completes the earlier requested stopping-point review; Salvage card-by-card interview can resume. No production changes or additional locks.

## October 11 first Character batch — locked

Joseph accepted the completed-deck review and wants to keep testing without changes for now. Resume Salvage.

- **P094 Dumpster Diver:** cost 1, 1/2/1; entry look at top 3, optionally reveal an Item into hand, rest bottom in any order. Name locked.
- **P097 Junkyard Dog:** cost 1, 1/2/1; Meat Shield. Name locked.
- **P104 Cockroach:** rename Trash Palace Cockroach to Cockroach; cost 1, **1/1/1**; Scurry Away (new Trouble-triggered return keyword). Supersedes original bottom-deck recovery and earlier proposed Item-funded damage reduction. Name/stats/ability locked.

All recorded in draft only; production unchanged. Next Character batch: Scout Troop Quartermaster, Wind-Up Toy, Possum in the Trash Can.

## October 11 second Character batch — locked

- **P091 Scout Troop Quartermaster ★:** cost 2, 2/3/1; once during your turn, when you Dismiss an Item, another chosen friendly Character gets +1 Power and +1 Trouble this turn. Ability/stats/cost locked; name needs replacement. Dumpster Foreman suggested, not approved. Review traits to match final name separately.
- **P100 Wind-Up Toy:** cost 2, 2/3/1; Sucker Punch; +1 Power for an Attack against a Ready Character. Name/stats/cost/ability locked.
- **P103 Possum in the Trash Can:** cost 2, 2/3/1; when Defeated, optionally Dismiss an Item to return this actual Character from discard to hand. Original explicit recovery locked, not new Scurry Away. Name locked.

Next Character batch: Shopping Cart Golem, Shopping Cart Knight, Crazy Cat Lady. Production unchanged.

## October 11 third batch steering

Joseph directs swapping Shopping Cart Knight/Golem names: **P096** cost-3 2/5/1 Meat Shield draft is now Shopping Cart Golem; **P106** cost-2 2/3/1 face-up-Item-Stash +2 Power draft is now Shopping Cart Knight ★, which requires a replacement name. Suggested Junkyard Scrapper not approved. Mechanics/cost/stats have not received explicit third-batch approval yet.

**P099 Crazy Cat Lady ★** entire design reopened; name must change and ability can change completely. Previous Animal-finding/healing is not locked. Proposed replacement for review: Scrap Runner, cost 3, 2/3/1, Scurry Away; entry optionally put an Item from own discard face-up and Rotated into own Stash, discard when spent. This is Put, not Dismiss, and does not trigger Inventor. Proposal is not approved/implemented.

## October 11 third batch follow-up

- **P106 name locked: Junkyard Scrapper.** Clears prior Knight rename flag. Cost 2, 2/3/1 and face-up-Item-Stash +2 Power remain the proposed mechanics, no silent assumption of full individual lock.
- **P099 ability locked:** Scurry Away. When this enters play, optionally put an Item from own discard face-up and Rotated into own Stash; discard it when spent. Put is not Dismiss and does not trigger Inventor. Cost 3, 2/3/1 retained as proposed.
- **P099 ★ name unresolved:** Scrap Runner rejected. Curbside Scavenger suggested, not approved. Former Cat Lady Animal selection/healing is superseded. Preserve naming flag.

- **P099 name locked: Trash Collector.** Clears former Cat Lady name flag; supersedes Scrap Runner/Curbside Scavenger suggestions. New salvage entry ability and Scurry Away remain locked; cost 3, 2/3/1 retained in draft. Next Character batch: Extension Cord Electrician, Rat King, Curbside Mechanic.

## October 12 all Characters locked — superseding checkpoint

Joseph approves all **18 Characters** with names flagged for review. All draft Character costs/stats/abilities are now locked, including any earlier pending per-card confirmations. Current names retained, all flagged ★ for final naming pass; preserve previously approved names, rejected suggestions, specific rename requests and Florida Man reservation history as context rather than silently renaming.

**P108 Scrapheap Colossus ★:** cost 6, **4/7/1**, Meat Shield. This gets +1 Trouble for each of your Items Dismissed this turn. Counts qualifying events before entry too; normal entry restrictions apply. No cap for now. Actual Dismiss counts once even if Scrap redirects the destination. Stash spending/movement, Return and attachment cleanup do not count. Turn-local count resets; all copies use the same event total. Supersedes ALL earlier entry draw/recycling/healing proposals.

Character curve is 3/4/5/3/2/1; 18/6/8 pool unchanged. Next audit six Actions then eight Items, preserving existing Action/Item locks. Documentation only, production not implemented.

## October 12 leader-only salvage pivot and Junk Heap exploration

Joseph says Scrap must be Trash Baron-only, not an Item keyword. Remove printed Scrap from draft Items, add the salvage replacement to Trash Baron's passive alongside (not replacing) opposing Ready Stash payment. Proposed combined wording: if an Item you control would go from play to your discard, optionally put it face-up and Rotated into your Stash; discard when spent. All qualifying Items, not a selected subset. Exact final passive wording/rate still needs review. Spending Stash cannot re-salvage. This supersedes prior Zip Ties/Sandwich exclusions. Trash Collector's separately locked explicit discard-to-Stash effect remains, but review against new leader-only intent; do not silently unlock it.

Magnet on a String and Rusty Toolbox names/costs/retrieval abilities accepted. Zip Ties name/cost retained; replace damage shield with -2 Power to a chosen opposing Character. Proposed duration until start of next turn awaits confirmation.

Bank **Junk Heap ★** for deeper exploration, not active pool: low/mid-cost combining Character, Items that would be discarded stored underneath, +1 to Power/Health/Trouble each, reward at 3–5 Items, possible cannot-act-before-threshold. Recommend competing destinations versus leader Stash, no double counting/card duplication, no capture of cargo cleanup; do not assign final stats/cap/threshold without approval. No production changes.
