# Crazy Cat Lady Prototype — Lab 1.0

**State:** PROTOTYPE  
**Style:** Unassigned  
**Canonical:** No  
**Deck size:** 40  
**Leader Health:** 25

This prototype tests an aggressive Momentum-style Leader built around maintaining and rebuilding a visible colony of Cats.

## Leader — Crazy Cat Lady

### Deck construction

> Your deck may contain Cat Characters from any Style and up to 10 copies of **Stray Cat**.

### Strength in Numbers............ Mostly Numbers........ Probably.

> At the start of your Turn, if you control fewer than 3 Cats, you may Stash one additional card this Turn. If you control 3 or more Cats, Draw an additional card.

This replaces the earlier **Cat Distribution System** passive in the personal LAB.

The passive now has two gears:

- **0–2 Cats:** Crazy Cat Lady may Stash twice that Turn. This is the rebuild/ramp mode.
- **3+ Cats:** she draws one additional card at the start of the Turn. This is the established-colony payoff.

The intent is to keep the Cat player moving after the opponent clears the board instead of making the Leader's economy disappear at the exact moment the player needs to rebuild. The low-Cat mode still costs cards from hand, so the extra ramp is a decision rather than free economy. The high-Cat mode supplies more material only after the colony is already established.

## Current deck notes

The current 40-card list is defined in `DECK.json`. Notable experimental packages include:

- 6× Stray Cat
- 4× Snowball
- 3× Shoebox of Dead Cats
- 4× Shovel
- 2× Nine Lives, Zero Survivors
- 1× Cat Under the Bed
- Trojan Cat removed from the deck

**Shoebox of Dead Cats** may bury Cats that are Dismissed or Defeated, including combat Defeats. **Shovel** randomly returns one buried Cat to play.

## Desired game arc

### Rebuild

When the Cat player begins a Turn below three Cats, the second Stash should make rebuilding materially easier without simply replacing lost Characters for free.

### Establish

Reaching three Cats changes the reward from economy acceleration to card flow. The player should feel that keeping the colony alive unlocks a stronger second wave rather than merely preserving the current board.

### Snowball

If the opponent cannot keep the colony down, extra cards plus accumulated Stash should let the Cat player chain increasingly threatening turns.

### Counterplay

The opponent can still reduce the Cat count, attack the Shoebox plan, force inefficient blocks, or use board-wide answers. Removing Cats should slow the deck, but it should no longer shut the Leader off completely.

## Current watchpoints

- Does the second Stash below three Cats actually help rebuild, or does it empty the hand too aggressively?
- Does the extra Draw at three or more Cats create satisfying Momentum or make an established board too difficult to break?
- How often does the player switch between the two modes during a game?
- Does Shoebox + Shovel create enough recovery without becoming automatic recursion?
- Does the deck still feel Character-first rather than like an Item engine?
- After a board wipe, can the Cat player recover without immediately rebuilding to an unbeatable state?

## Historical note

Earlier lab versions used **Cat Distribution System**, which automatically put the top card of the deck into Ready Stash when the player began a Turn with three or more Cats. Historical simulation results for that retired passive remain available in Git history, but they do **not** describe the current Lab 1.0 passive and should not be used as current balance evidence.
