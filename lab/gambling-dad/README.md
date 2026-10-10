# Gambling Dad — Gambler prototype

**State: PROTOTYPE (not canonical).** The deck and rules exist only in `lab/gambling-dad/` and do not update root `CARDS.json`, `DECKS.json`, or `RULES.md`.

[Play the Gambling Dad lab](https://jobeck17.github.io/unhinged/lab/gambling-dad/)

## Dealer's Child — private peek (TESTING)

**Dealer's Child** (`LAB-GD-003`, the existing three-copy Character, Cost 1, Power 1 / Health 2 / Trouble 1) replaces its old poker-win Power bonus with: **"When this Character enters play, you may look at the top 4 cards of your opponent's deck. Return them in the same order."** The effect is optional; if fewer than four cards remain, you see only those available. The lab-only picker shows the four cards in their actual upcoming draw order, privately to the Character's controller. It never removes, reorders, or reveals cards in the shared log. The peek can become outdated if the opponent's deck changes before poker. Flavor: *"DUDE, he keeps looking at my cards!"* No additional deck-builder entry is created.

## Leader

**Gambling Dad** — Gambler · 20 Composure

**99 GAMBLERS QUIT BEFORE THEY WIN BIG!** — Once during your Turn, you may play **Rock Bottom Poker**. You may Stash normally.

This is an **advanced** Leader: easy comparison, difficult decisions about when to risk Stash and which cards to commit.

## Rock Bottom Poker — reward-choice / Double Down rework (TESTING)

Dad can start **one** poker sequence during his Turn when both decks contain at least four cards. Flip the HIGH/LOW chip, both players look at four cards, and each selects two as before. Matching Pair / Straight / High Roller ranking and ties still work normally.

- **Win:** choose **Gain 2 Ready Stash** (Dad's chosen two poker cards enter Stash) **or Draw 2 cards** (Dad's chosen two cards return to the bottom of his deck before the draw). The opponent's selected cards return to the bottom of its deck. Unchosen cards return to their own decks.
- **Lose:** Dad's selected pair is discarded; the opponent's pair returns to its deck. Dad loses up to **2 actual Stash cards** and chooses **1 card from hand to discard**, if he has any. **Characters are not automatically Defeated.**
- **Tie:** both selected pairs are discarded, and there is no new reward.
- **Fold:** on the first hand only, Dad can Fold **directly from the four-card hand picker**, without choosing two cards or opening an earlier Play/Fold popup. The **Fold · Lose 1 Stash** button removes up to **1 Stash card**, returns all eight drawn poker cards to their original decks, and consumes the Turn's poker opportunity. No Fold on a Bluff re-pick or Double Down.

**Breaking Point — DOUBLE DOWN:** the first time Dad's Composure crosses from above 10 to 10 or below, Double Down unlocks for the rest of the game. After winning the first poker hand, choose **Walk Away** (receive that reward immediately) or **Double Down** (play one more full poker hand for a second reward). This second hand can choose either reward independently, allowing +4 Stash, Draw 4, or +2 Stash and Draw 2 on two wins.

**Risk:** the first reward is held pending until the second hand ends. Winning twice pays both; losing the second forfeits the first reward and triggers the normal loss penalty of 2 Stash plus 1 discarded hand card. A second-hand tie pays the first reward but grants no second. There is no second Fold or third hand. Double Down is not offered unless both decks have four cards for the second round. Existing **"Whenever you win/lose poker"** Character and Item effects still trigger when the corresponding individual hand wins/loses.

After each hand, the browser shows both selected pairs and the result; a Double Down summary identifies the final reward outcome. Automated tests cover the two rewards, 10-Composure unlock, walking away, second-hand wins/losses/ties, board preservation, and the stash-payment prompt regression. Nothing is canonical until deliberately promoted.

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

From the repository root: `node lab/gambling-dad/test.mjs` and `node lab/gambling-dad/opponent-smoke.mjs`. Browser lab uses production engine as a dependency but neither overwrites the engine nor modifies canonical files.

## Bluff — poker mulligan test

**Bluff** · Action · Cost **2** · **3 copies** · `LAB-GD-013`. Replaces all three **That Was Almost a Win** cards. Bluff is playable only in Rock Bottom Poker, not as a normal Turn Action. On the **original four-card poker selection screen**, after Dad selects two cards, **Redraw (Bluff) · 2 Stash** appears beside **Play Poker Hand** when Bluff is in his normal hand, he has 2 Ready Stash, and at least two cards remain in his deck. Both buttons are disabled until exactly two cards are selected. Bluff is a direct choice on that screen, **not a separate popup after confirming the hand**. Spend 2 Ready Stash and discard Bluff and the original selected pair. Draw two fresh poker cards and **choose any two from the four cards**: the two original unselected cards plus the two freshly drawn cards. Return the other two to the bottom of Dad's deck. Dad cannot use a second Bluff in the same poker hand. The discarded pair is gone even if the new hand is worse. This is lab-only.

## Opponent rotation browser fix

The Gambling Dad browser now imports the **same production Game module instance** as the shared Leader packages. Previously its distinct engine URL skipped their gameplay patches. A lab-only `compat.mjs` supplies missing hooks needed by the current shared modules without editing canonical files. The opponent smoke test checks that Round-2 Characters can Cause Trouble, rotate, and remain Rotated when the human turn begins (Florida Man and Gambling Dad opponents).\n

## Lab deck builder

[Open Gambling Dad Lab Deck Builder](https://jobeck17.github.io/unhinged/lab/gambling-dad/builder/). This is a **separate experimental builder** derived from the familiar Mordecai builder; it merges the current canonical pool with lab Gambling Dad cards **only in the lab browser**, offers Gambling Dad as a Leader, and loads his current **39-card draft** to edit (add one card to reach the standard 40). It also retains canonical Leaders as controls, but never allows `LAB-GD-` cards under other Leaders. Mad Scientist's reserved `LAB-SCI-` cards are excluded from Dad. Import, export, search, cost curve, and browser-local saving remain available, using an isolated storage key. **Deck exports are not automatically loaded into the separate Gambling Dad playtest**; that playtest still starts from its own lab reference deck. `node lab/gambling-dad/builder/smoke.mjs` checks the builder. Neither canonical builder nor canonical card/deck data are modified.

## Lab-only automatic Stash payment

Normal card plays **automatically Rotate the required Ready Stash** rather than displaying the shared Magician package's `choose exactly N Ready Stash` multi-select. The old dialog listed Character names only because those cards were being used as Stash; those names were not available attack or ability targets. The lab preserves actual target selection, poker hand choice, and card-specific choices, and preserves Ready versus Rotated Stash states, including Trash Baron's opponent-first payment. Neither canonical deck builder nor web engine was changed. Run `node lab/gambling-dad/payment-smoke.mjs` to verify normal 3/1/1-cost card plays and Ready Stash spending without prompts.
