# Composure 2.0 — Last Straw Idea Repository

**Status: TESTING / BRAINSTORM**
**Purpose:** This is the working repository for Last Straw concepts in the Composure 2.0 lab.

Last Straws are intentionally being explored wide before they are balanced. Add promising ideas here even when they are obviously too strong, too weak, too strange, or incomplete. The goal of this file is to preserve the idea pool without turning every brainstorm into a rule.

## Current architecture being tested

- A player chooses **one Last Straw** during deckbuilding, outside the normal 40-card deck.
- **Current human-test model:** the chosen Last Straw begins face-down under the Leader and **remains hidden through Breaking Point**. When the Leader reaches 0 Composure, reveal and trigger the Last Straw, then **Rotate the Last Straw card 90°** to mark that it has triggered. It remains face-up beside the Leader for the rest of the game, including as a reminder for any lingering text. This model remains subject to human-playtest confirmation.
- Reaching 0 Composure triggers the chosen Last Straw once.
- **Reaching 0 Composure after your Last Straw was removed before it triggered means immediate defeat:** the Leader becomes Unhinged. A Last Straw that already triggered has already moved its Leader into the normal Last Straw phase; removing that spent/Rotated card later does not retroactively defeat the Leader.
- Last Straw is a comeback event, not the victory condition itself.
- While at Last Straw, that player's Characters have **Hothead** and may **Attack opposing Ready Characters**.
- Hothead remains Attack-only and does not grant early Cause Trouble.
- A later successful Cause Trouble from a Character with **1+ Trouble** makes the Leader Unhinged.
- Last Straw effects may explicitly exceed the normal five-Character limit.
- Last Straw cards are normally **protected game-state cards**. Ordinary card effects cannot discard, bounce, steal, Dismiss, copy, or otherwise affect them unless the effect explicitly refers to a **Last Straw**.
- Explicit Last Straw interaction is valid design space. A Last Straw may affect another player's Last Straw.
- Leader passives and Breaking Points remain Leader-specific.
- **For now, the Last Straw pool is universal:** any Leader may choose any Last Straw. Natural deck/Leader synergies can create informal groupings without formal restrictions. A future hybrid model with some Style-specific Last Straws remains available if testing gives us a concrete reason to use it.

## Raw idea wall

These are concepts, not balanced cards.

1. Reduce the opposing Leader to 5 Composure if they are above 5.
2. Put your hand into your Stash/resource zone; put your discard into your hand.
3. Put all opposing Characters into their discard.
4. Empty the opponent's Stash/resource zone except for one card.
5. Roll a die; all Characters in play gain that much Trouble.
6. Draw cards equal to the opposing Leader's remaining Composure; put every Character drawn directly into play.
7. Put every Character costing 2 or less from your discard into play.
8. Choose a Character in your discard and put it into play with dramatically increased Power, Guard, and Trouble.
9. Dismiss every Item in play. For each of your Items dismissed, Draw and Ready one Stash/resource.
10. Discard your hand, then Draw 7.
11. Swap hands with your opponent.
12. Return every Character in play to its owner's hand.
13. Return every Character Defeated this Round to play under its owner.
14. Choose one of your Characters and Dismiss the rest. The chosen Character gets +1 Power / +1 Guard / +1 Trouble for each Character Dismissed this way.
15. Reveal the top 10 cards of your deck. Put every qualifying low-cost Character directly into play and discard the rest.
16. Play any number of Items from your hand without paying their Costs.
17. Return up to three cards of different types from your discard to your hand.
18. Your Characters get +2 Trouble until the end of your next Turn.
19. Ready up to three Rotated Characters. They cannot Attack during your next Turn, telegraphing a Trouble wave.
20. Choose an opposing Character and take control of it. It becomes Ready under your control at the start of your next Turn.
21. Each player chooses one Character they control. Put all other Characters into their owners' discard piles.
22. Until the start of your next Turn, your Characters cannot be Defeated.
23. Shuffle/reveal from your discard until you find five Characters; put those Characters into play and return/discard the rest as the final design specifies.
24. Deal 2 damage to every Character. Characters Defeated this way trigger their Defeat effects twice.
25. Until the end of your next Turn, whenever one of your Characters Causes Trouble, double its Trouble for that action.
26. **Cut the Safety Net:** Discard the opponent's Last Straw. If it had not already triggered, that player no longer has a Last Straw to trigger at 0 Composure and reaching 0 causes them to lose/become Unhinged normally. If it already triggered, discarding the rotated card does not undo its resolved effect, end the Last Straw phase, or cause its Leader to lose. Exact wording/timing pending rules cleanup.
27. **Match their Composure:** Set your Leader's Composure equal to the opposing Leader's current Composure. This explicitly overrides the normal post-Last-Straw 0-Composure lock. Your Last Straw remains spent. If the opposing Leader is already at Last Straw/0, this leaves both Leaders at 0 and the next qualifying Trouble can decide the game. Exact post-recovery loss timing when the copied value is above 0 is pending the rules interview.

## Useful design buckets

When adding ideas, do not only make board wipes and card draw. We want different kinds of panic buttons:

- Equalize a losing board.
- Sabotage the opponent's engine.
- Rebuild from discard.
- Explode resources or Items.
- Manipulate hands.
- Create a swarm.
- Create one enormous threat.
- Turn sacrifice/Defeat into a comeback.
- Create a telegraphed "deal with this before my next Turn" threat.
- Change how Trouble works temporarily.
- Create something funny, dangerous, or deeply on-theme that does not fit an existing bucket.

## What makes a promising Last Straw?

A strong candidate should create a **new game state or urgent decision**, not merely add generic value. The opponent should usually still have meaningful play after it resolves.

Do not reject an idea just because the first numbers are absurd. Capture the idea first. Balance comes later.

When an idea becomes a serious test candidate, add:
- working name
- exact rules text
- intended archetypes/decks
- why it creates a comeback
- likely abuse case
- status: RAW / TESTING / CUT / BANKED

## Naming note

The resource zone is still called **Stash** in current files, but that name is under review. Do not independently rename it in card text until the naming pass is complete.


## Organized-play concept — banked for later testing

💡 **BANKED / NOT A CORE LAB RULE YET:** For organized play, a registered decklist may include a **Last Straw roster of 3**. The player chooses which registered Last Straw is used for a game/match while the selected card remains hidden under the Leader until it triggers. The roster creates bounded hidden information: an opponent can know the three possible Last Straws without knowing which one was selected.

The current proposal allows the selected Last Straw to change **between tournament rounds**. Exact tournament procedure, including whether decklists/Last Straw rosters are open information and whether selection can change between games of a multi-game match, should be decided when organized-play rules are designed.
