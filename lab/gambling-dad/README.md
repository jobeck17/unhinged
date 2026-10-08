# Gambling Dad — Gambler prototype

**State: PROTOTYPE (not canonical).** The deck and rules exist only in `lab/gambling-dad/` and do not update root `CARDS.json`, `DECKS.json`, or `RULES.md`.

[Play the Gambling Dad lab](https://jobeck17.github.io/unhinged/lab/gambling-dad/)

## Leader

**Gambling Dad** — Gambler · 20 Composure

**99 GAMBLERS QUIT BEFORE THEY WIN BIG!** — Once during your Turn, you may play **Rock Bottom Poker**. You may Stash normally.

This is an **advanced** Leader: easy comparison, difficult decisions about when to risk Stash and which cards to commit.

## Rock Bottom Poker — four-card hierarchy test

1. Once during Dad's Turn, if **both decks have 4 or more cards**, flip **Dad's Lucky Poker Chip** fairly (HIGH/LOW, 50/50). No animation; the chip's face is shown before play.
2. Both players temporarily draw **4 cards** from their own decks, separate from their normal hands.
3. Only Dad may **Fold** after seeing his draw, losing 1 Stash (or 0 if empty) and returning all poker cards to the bottoms of their respective decks. Folding consumes his use of poker this Turn.
4. Otherwise each player secretly chooses **2 of their 4 cards**; the other 2 go to the bottom of their own decks. The browser picker shows the hand hierarchy and the currently selected hand.
5. **Hand types:** Matching Pair (equal Costs), Straight (consecutive Costs), High Roller (all other combinations).
6. **HIGH:** Matching Pair > Straight > High Roller. **LOW:** High Roller > Straight > Matching Pair. Hand type ALWAYS beats total Cost.
7. Within the same hand type, HIGH favors higher combined printed Cost; LOW favors lower combined printed Cost. If Costs tie, higher combined printed Power wins (non-Characters count 0 Power). Complete tie: both played pairs are discarded and Dad's Stash stays the same.
8. **Dad wins:** all four selected cards become Ready Stash for him (ownership is still tracked).
9. **Dad loses:** return the opponent's chosen cards to its deck, discard Dad's pair, reduce his Stash to at most two, and **Defeat every Character Dad controls**. Other Items are not wiped.
10. All four unused cards (two per player) return to the bottoms of their owners' decks. These special draws do not trigger regular Draw effects. Ordinary Stashing remains available.

After a win, loss, or tie, the browser reveals **both committed hands** with each card's printed Cost, the Cost total, the Matching Pair / Straight / High Roller classification, card names, and Poker Power. The result stays displayed above the board until the next poker hand. The opponent AI picks its best two-card hand by the current HIGH/LOW hierarchy. The complete four-card/fold/bankruptcy design is EXPERIMENTAL and should be tested against canonical decks before any promotion.

## Deck shell

**40 cards**, all 17 prototype cards in `cards.json`; editable counts in `deck.json`. 28 Characters, 8 Actions, 4 Items. These are rough placeholders for iteration, not locked design. Some are deliberately textless; a few reward poker wins/losses. The current lab browser wires these effects; please replace names, costs, stats, and effects as needed.

## Cost curve experiment — low-or-high v0.2

Playtest feedback: the first 40-card shell had too many Cost 2–4 cards and Dad was losing too many poker hands. The prototype now deliberately has **no Cost 3 or 4 cards**:

| Printed Cost | Deck copies |
| --- | ---: |
| 1 | 22 |
| 2 | 5 |
| 5 | 7 |
| 6 | 6 |
| **Total** | **40** |

That's **27 cheap cards** to build a board without gambling, and **13 expensive Characters** whose high printed Cost helps in Rock Bottom Poker. Relevant Power / Health / Trouble stats were adjusted to match the new Costs, but the Leader ability and poker rules were **not** changed.

**Tradeoff to watch:** a 5- or 6-Cost card is hard to deploy without a winning pot. If expensive cards strand in hand for many Turns, keep the poker identity but consider reducing the number of Cost 6 cards rather than adding middling costs back. These are placeholder numbers, not a final balance claim.

## Counterplay and failure conditions

The opponent controls their own selection of two from four and can deny the pot. Dad chooses **when** to risk a reset. Reassess if a four-Stash win makes matches nearly unwinnable, Dad can risk-free spam at 2 Stash, or poker repeatedly steals attention from Characters. Reduce the payout or increase the frequency/cost of access only after human playtesting. No automatic promotion to canon.

## Run the automated assertions

From the repository root: `node lab/gambling-dad/test.mjs`. Browser lab uses production engine as a dependency but neither overwrites the engine nor modifies canonical files.
