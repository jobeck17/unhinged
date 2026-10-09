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

## Slot Machine — NEW LAB TEST 🎰

**Slot Machine** · Item · Cost **4** · **4 copies** · `LAB-GD-018`

**Activate — Spend 2 Ready Stash and Rotate this Item.** Flip Dad's Lucky Poker Chip (HIGH/LOW) **one flip at a time**. The browser starts with three empty circular slots:

1. Flip the first chip; show **H** or **L** in slot 1.
2. Flip the second chip; show **H** or **L** in slot 2.
3. **If the first two differ**, the spin ends immediately, the overlay closes, and no cards are drawn. **Do not flip a third time.**
4. **If the first two match**, pause and ask Dad: **Take 1 card** (Draw 1; stop) **or Risk It** (flip the third chip).
5. If the third flip matches the first two (**HHH** or **LLL**), **Draw until your hand contains 7 cards** (or stop if the deck runs out). Otherwise **Draw nothing**.
6. The Item Rotates when activated, so each copy can activate at most once between Readies. A Ready copy needs 2 Ready Stash and a nonempty deck to activate.

The result is **not generated all at once**: the UI reveals each circle separately, and the third chip isn't even flipped unless the user presses **Risk It**. The opponent AI uses the same payouts; it only skips the visual delay.

**Important tension:** This converts surplus Stash into cards in hand, but still depletes Dad's deck and could accelerate Last Straw. Test whether paying 4 to play plus 2 Ready Stash per activation is worth the rewards. This is lab-only, not canon.

## Deck shell

**39 cards** in the current experimental deck; editable counts in `deck.json`. 28 Characters, 5 Actions, 6 Items. Three copies of **That Was Almost a Win** have been replaced by three copies of **Bluff** (Cost 2). The last copy of It's Basically Free Money has been removed without replacement. The card definition remains available in `cards.json` for future experiments. These are rough placeholders for iteration, not locked design. Some are deliberately textless; a few reward poker wins/losses. The current lab browser wires these effects; please replace names, costs, stats, and effects as needed.

## Updated Cost curve — Slot Machine v0.3

Four **Slot Machine** Items replaced both copies of **Lucky Coin From a Laundromat** and two copies of **It's Basically Free Money**. The final **It's Basically Free Money** copy has now been removed as well, with no replacement, leaving 39 cards.

| Printed Cost | Deck copies |
| --- | ---: |
| 1 | 19 |
| 2 | 3 |
| 3 | 0 |
| 4 | 4 |
| 5 | 7 |
| 6 | 6 |
| **Total** | **39** |

All 28 Character copies remain unchanged. The original low/high Character philosophy remains; the Cost-4 Items are a deliberate exception to make earned Stash useful. The Slot Machine costs 4 Stash to play and an additional 2 Ready Stash whenever activated.

## Counterplay and failure conditions

The opponent controls their own selection of two from four and can deny the pot. Dad chooses **when** to risk a reset. Reassess if a four-Stash win makes matches nearly unwinnable, Dad can risk-free spam at 2 Stash, or poker repeatedly steals attention from Characters. Reduce the payout or increase the frequency/cost of access only after human playtesting. No automatic promotion to canon.

## Run the automated assertions

From the repository root: `node lab/gambling-dad/test.mjs`. Browser lab uses production engine as a dependency but neither overwrites the engine nor modifies canonical files.

## Bluff — poker mulligan test

**Bluff** · Action · Cost **2** · **3 copies** · `LAB-GD-013`. Replaces all three **That Was Almost a Win** cards. Bluff is playable only in Rock Bottom Poker, not as a normal Turn Action. On the **original four-card poker selection screen**, after Dad selects two cards, **Redraw (Bluff) · 2 Stash** appears beside **Play Poker Hand** when Bluff is in his normal hand, he has 2 Ready Stash, and at least two cards remain in his deck. Both buttons are disabled until exactly two cards are selected. Bluff is a direct choice on that screen, **not a separate popup after confirming the hand**. Spend 2 Ready Stash and discard Bluff and the original selected pair. Draw two fresh poker cards and **choose any two from the four cards**: the two original unselected cards plus the two freshly drawn cards. Return the other two to the bottom of Dad's deck. Dad cannot use a second Bluff in the same poker hand. The discarded pair is gone even if the new hand is worse. This is lab-only.
