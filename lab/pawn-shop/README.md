# Pawn Shop — first playable lab (v0.1)

**State: PROTOTYPE / HUMAN PLAYTEST.** This is experimental Unhinged, **not canon**. It does not change root `RULES.md`, `CARDS.json`, `DECKS.json`, `sim/`, `web/` or `builder/`.

**[Open Pawn Shop lab](https://jobeck17.github.io/unhinged/lab/pawn-shop/)**

This intentionally begins **before** the design milestone of 12 Characters / 6 Actions / 2 Items. It tests the Leader engine, Character pacing, Deal earning/spending, attaching an Item, and whether a small number of simple Cards are fun to play.

## Deck for test 1

Exactly **40 cards: four copies of each of 10 unique prototypes**:

| ID | Card | Type | Cost | Trait |
|---|---|---|---:|---|
| LAB-PS-001 | Antique Holder | Character | 3 | — |
| LAB-PS-002 | Moron's Gold | Action | 1 | — |
| LAB-PS-003 | Family Heirloom | Item | 2 | — |
| LAB-PS-004 | Grandma With a Million-Dollar Doorstop | Character | 2 | — |
| LAB-PS-005 | Guy Selling His Wife's Dress | Character | 2 | Customer |
| LAB-PS-006 | Guy Who Got a Bad Deal | Character | 3 | Customer |
| LAB-PS-007 | Junkyard Visionary | Character | 3 | Customer |
| LAB-PS-008 | One Man's Trash | Action | 1 | — |
| LAB-PS-009 | Black Friday Employee | Character | 2 | Staff |
| LAB-PS-010 | No Refunds | Action | 2 | — |

Card copies: **24 Characters / 12 Actions / 4 Items**. This deliberately repetitive starting list is not a recommended final ratio.

## New tenth Action — TEMPORARY test candidate

**No Refunds** — Cost 2 Action: **“Spend 1 Deal: Dismiss an opposing Character costing 4 or less.”** Flavor: *“We appreciate your understanding.”*

This is not yet user-approved as a final design. Its purpose is to let the player **spend** Deals and test whether Leader bonuses and Family Heirloom scale *down*, not just up. Without a Deal spender, the proposed Leader's economy had no meaningful cash-out decision. The earlier one-line damage-only draft was replaced **only for this prototype**.

## Pawn Shop v0.1 Stash rule — Rotated on entry (19 October 2026)

**This lab intentionally differs from canonical Mordecai 0.4.** When Shady Pawn Shop Owner Stashes a card from hand, it enters face-down **Rotated** (not usable to pay Costs or Close a Deal until the next Ready step). During the next Turn's Ready step, it Readies as normal. **Antique Holder's additional Stash** also enters Rotated. At 4 Deals, both allowed Stashes enter Rotated.

Normal Unhinged canon in `RULES.md` still says Stash enters Ready. The exception is implemented only in `lab/pawn-shop/pawn-shop.js`, not in `web/`.

Playtest watchpoint: Slower Turn 1–3 development could make the Leader's three-Ready-Stash Deal activation or Cost 3 Characters too slow. Compare how the deck feels before considering canon promotion.

## Leader behavior in this lab

**Shady Pawn Shop Owner (Momentum)**: Once on your own Turn, press **Close a Deal** to Rotate 3 Ready Stash and gain 1 Deal; maximum 4.

- **0–1 Deals:** Normal one-card Draw, normal Stash.
- **2–3 Deals:** Draw 2 *total* during your normal Draw step, your Characters have Hothead.
- **4 Deals:** Retain Draw 2 and Hothead; you may Stash twice per Turn and your Characters gain +1 Power and Sucker Punch.

The Leader does not spend Deals to close a Deal; it consumes only the 3 Ready Stash. **Grandma** also produces 1 Deal on entry but blocks spending your final Deal while she remains in play. **No Refunds** consumes a Deal as an additional cost/effect and therefore can turn off thresholds.

**Black Friday Employee**: Rotate it through an Attack or Cause Trouble; at your *following* Ready step, choose whether to leave it Rotated (discount other Customers by 1 per Employee) or Ready it for normal use. The lab explicitly asks at the Ready step. Only the three Customer designs have that trait in this prototype; Grandma, Antique Holder, and the Employee do not.

**Family Heirloom:** Must attach to your Character. +1 Guard at 0–1 Deals, +2 at 2–3, +3 at 4. Antique Holder gains Retaliate while the Item is attached. No self-Dismissal clause.

**Guard terminology** is displayed in this lab to match the designers' working wording; underlying 0.4 engine schema currently still uses a field named `guard` for the canonical Health stat.

## How to run the first test

Open the lab link, choose **Shady Pawn Shop Owner** as your deck and **Florida Man** as the opponent, and press **Cause a scene**. Use normal Stash and Character gameplay. When you have 3 Ready Stash, try the **Close a Deal** button. Watch the Deal counter, Customer discounts and Family Heirloom's changing Guard on the board.

Other canonical opponents remain selectable as controls. The opponent AI is a rough rules-bound baseline; human judgement should drive design decisions.

## Checks to record

- Can the deck earn 2 Deals reliably without falling behind on board?
- Are Grandma's fast Deals too powerful for Cost 2?
- Is Cost 2 / spend a Deal for **No Refunds** a worthwhile cash-out?
- Does **Family Heirloom** make Antique Holder too difficult to Defeat in combat? Can opposing removal answer it?
- Does **Black Friday Employee** reward a real tradeoff, or is discounting multiple Customers too efficient?
- Are repeated copies of **One Man's Trash** too good at retrieving powerful Actions?
- Is the deck fun even without early Grandma, or does it stall?

**Failure conditions:** early unanswerable snowball from free Deals, repetitive Customer discounts, insufficient ways to interact with boards, one-card recursive loops, or too little decision-making after 4 Deals. Revise the lab test, not canonical cards.

## Technical isolation / limitations

Data lives in `lab/pawn-shop/cards.json` and `deck.json`. `pawn-shop.js` adds gameplay hooks to the **imported canonical browser engine at runtime**, solely inside this lab page. `app.js` is a lab-specific copy of the canonical browser UI with Deal controls. No production source files are modified.

The Pawn Shop Leader's **unique Breaking Point is still undecided**, so this initial test does not supply one. The underlying Mordecai 0.4 shared Last Straw implementation is also incomplete in the production browser. This is a *mechanics smoke test and rough playtest*, not a claim of full rules parity or proven balance.

Card art, deck-building integration, simulation support, and approved final copy counts are intentionally postponed.
