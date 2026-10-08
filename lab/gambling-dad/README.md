# Gambling Dad — Gambler prototype

**State: PROTOTYPE (not canonical).** The deck and rules exist only in `lab/gambling-dad/` and do not update root `CARDS.json`, `DECKS.json`, or `RULES.md`.

[Play the Gambling Dad lab](https://jobeck17.github.io/unhinged/lab/gambling-dad/)

## Leader

**Gambling Dad** — Gambler · 20 Composure

**99 GAMBLERS QUIT BEFORE THEY WIN BIG!** — Once during your Turn, you may play **Dad Poker**. You may Stash normally.

This is an **advanced** Leader: easy comparison, difficult decisions about when to risk Stash and which cards to commit.

## Dad Poker — first prototype

1. Gambling Dad may start Dad Poker once on his own Turn only if both decks have at least three cards.
2. Each player sets aside their normal hand (the browser game leaves those hands untouched). Each draws three separate poker cards from their *own deck*.
3. Each secretly chooses exactly two of their three poker cards; the third returns to the bottom of its owner's deck.
4. Reveal both pairs. Add **printed Cost** first. Highest Cost total wins. Only if tied, add **printed Power** (Action/Item Power = 0). Higher Power total wins the Cost tie.
5. If **Dad wins**, his Stash gains all **four** committed cards (the opponent gains none). These cards remain owned by their original players if removed later.
6. If **Dad loses**, Dad's selected two cards go to his Discard; the opponent's selected two return to the bottom of their own deck. Dad's Stash shrinks to **at most 2**, placing excess cards in their original owners' Discards. A Stash of 0 or 1 is not increased.
7. If **both totals tie**, all four committed cards go to their original owners' Discards. Dad's Stash remains unchanged.
8. Printed Costs/Power only; no battlefield modifiers. The temporary poker draws are **not** normal Draw effects. The Leader can still Stash normally once per Round.

**Important playtest simplifications:** Opponent AI chooses its best two-card pair, so it doesn't bluff. Nobody wagers additional hand cards. Tie/loss handling, the unused third card, and card ownership are provisional. Only Dad gets extra Stash on a win. Winning poker is not itself a victory condition.

## Deck shell

**40 cards**, all 17 prototype cards in `cards.json`; editable counts in `deck.json`. 28 Characters, 8 Actions, 4 Items. These are rough placeholders for iteration, not locked design. Some are deliberately textless; a few reward poker wins/losses. The current lab browser wires these effects; please replace names, costs, stats, and effects as needed.

## Counterplay and failure conditions

The opponent controls their own selection of two from three and can deny the pot. Dad chooses **when** to risk a reset. Reassess if a four-Stash win makes matches nearly unwinnable, Dad can risk-free spam at 2 Stash, or poker repeatedly steals attention from Characters. Reduce the payout or increase the frequency/cost of access only after human playtesting. No automatic promotion to canon.

## Run the automated assertions

From the repository root: `node lab/gambling-dad/test.mjs`. Browser lab uses production engine as a dependency but neither overwrites the engine nor modifies canonical files.
