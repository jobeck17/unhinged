# Unhinged Current State — 2026-09-21

> This checkpoint supersedes the September 20 current-state file for active design direction while preserving earlier checkpoints as design history.
>
> Canonical card data remains in `docs/card-pool/cards.json` and `docs/card-pool/leaders.json`. Active rules are synchronized in `docs/card-pool/rules-lab.md`.
>
> The canonical 180-card pool has **not yet been rewritten** to reflect all September 21 design decisions. Where this document says "rewrite pending," the old card data remains intentionally untouched until the card-by-card pass.

## Status legend

- ◆ **LOCKED** — current foundation unless deliberately reopened.
- ● **SOFT LOCK** — current default / direction, still open to revision.
- 🧪 **LAB / WATCH** — actively monitored.
- ↺ **REOPENED** — previously settled, now deliberately under review.
- ◇ **TABLED** — intentionally deferred.
- ✎ **REWRITE PENDING** — design direction chosen, canonical card text/data not yet converted.

---

# Foundation carried forward from September 20

Unless explicitly reopened below, the September 20 combat/cadence foundation remains active:

- alternating one-action Turns inside shared Rounds;
- Ready, Set, Draw;
- two consecutive Passes end a Round;
- blocking Rotates;
- Rotated Characters/Units may be attacked directly;
- directly attacked Rotated Characters retaliate if they survive;
- persistent damage and immediate Defeat at damage >= Guard;
- multi-block sequential damage and Leader overflow;
- 1→7 Fuel progression (soft lock);
- 40-card decks, Leader + one secondary color, maximum 2 copies (soft locks);
- War for initial initiative and ties;
- Golden Rule: global base rules + printed card exceptions, never invisible color-only rules.

---

# September 21 timing update

## Trigger queue

◆ Pending triggers now resolve in **the order they were triggered**.

◆ If one player has multiple simultaneous triggers, that player chooses their relative order.

◆ If both players have simultaneous triggers, the player whose Turn caused the triggers orders/adds theirs first, then the opponent orders/adds theirs.

◆ A trigger created while resolving another trigger is added to the **end** of the pending queue. It does not jump ahead of older unresolved triggers.

Example:

> A and B are pending. Resolving A creates C.  
> Resolution order is **A → B → C**, not A → C → B.

Design intent: use chronological queue behavior wherever possible and avoid nested priority rules.

## Individual Turn actions

◆ A Turn normally contains one Play, Activation, Attack, or Pass unless card text says otherwise.

◆ Triggered abilities are not Turns and do not consume a Turn.

◆ Finish the current Turn action and all resulting pending triggers before the opponent begins the next Turn.

---

# Responses

● **Response is now an active design layer rather than tabled.**

● Current preferred architecture:

- Response is a special timing designation/subtype on an **Action**, not a fifth base card type.
- A Response may be Played during an opponent's Turn only at the timing stated on that card.
- The card repeats the exact legal timing in plain English.
- A Response resolves before the interrupted Play / Activation / Attack continues.
- There is no universal Response window after every event.
- Visual scan labels such as **Attack Response** / **Action Response** are possible, but the printed timing sentence is authoritative.

🧪 Still open:
- whether Response-on-Response chains are allowed and, if so, how far;
- whether a universal one-Response limit is needed;
- final costing philosophy.

Current preference is **not** to make a Response consume the player's next Turn. Fuel/card opportunity cost is favored over future-Turn bookkeeping.

### Response concepts currently in the idea bank

- **Ctrl + Z** — stop an opposing Action before it resolves.
- **Return to Sender** — opposing Action resolves as though the responder played it; responder makes its choices.
- **Plot Twist** — strong name reserved for a Response that changes an expected outcome.
- **Unofficial Reverse Card** — strong name / visual concept for a reverse-style Response.
- **Me Too!** / equivalent — copy-style Response concept.
- Attack Responses are explicitly valid design space, not only Responses to Actions.

The current 180-card pool already contains numerous Actions that functionally require Response timing, including attack reactions, target redirection, Action cancellation/bounce, Defeat reactions, and "after last Fuel" timing. The Response rules are infrastructure for behavior already present in the pool.

---

# Card play legality

● Current rule direction:

A card may be Played if:
1. its Cost can be paid; and
2. all **required** choices/targets can legally be made.

The game does **not** require the player to prove that the effect will ultimately change the game state.

Example:
- "Choose a damaged Wrestler" with no damaged Wrestler: illegal Play.
- "You may choose a damaged Wrestler": legal Play even if the optional choice is declined.

This intentionally avoids a broad "must change the game state" rule.

---

# Traits and dead-card risk

◆ **Design principle:** Traits should usually make a card **better**, not determine whether the card works at all.

Reason: a hard Trait gate can create a non-decision dead card solely because the matching Character was not drawn.

Preferred pattern:

> Do X. If the Character was a Wrestler, also do Y.

Use hard Trait-only gates deliberately when the restriction itself is the point of the card.

### Tag Me In! direction

The original "only works if you have a damaged Wrestler" concept is being revised toward a generally functional exchange card with a Wrestler bonus.

Working design pattern:

> Return one of your damaged Characters to your hand. Put a Character from your hand with equal or lower Cost into play Ready. If the returned Character was a Wrestler, gain an additional benefit such as permission for the new Character to Attack this Round.

Exact wording/cost not locked.

---

# Owner vs Controller

↺ **Controller terminology has been deliberately reopened.**

Current preference is moving toward **Owner** as the formal relationship plus ordinary English:
- your Character
- an opposing Character
- the player who played this Action

Owner remains the player whose deck/card the card fundamentally belongs to, and cards sent to a hand/deck/discard return to the Owner's corresponding zone.

The existing Controller definition remains temporarily functional in the rules until the terminology cleanup is completed, but the design should **not create control-changing mechanics merely to justify the word Controller**.

Examples supporting removal/minimization:
- **Return to Sender** can say an Action "resolves as though you played it" rather than transferring control.
- **Hot Potato** can function as a shared Item whose physical position matters rather than a card whose Controller changes.

If future cards genuinely transfer ongoing use of opposing Characters/Items, Controller can be reevaluated then.

---

# Makeshift / Junk Pile

✎ **Current direction: retire Junk Pile as a separate zone and use Discard.**

Why:
- Discard already represents spent/broken/thrown-away cards.
- A second "garbage" pile adds geography and rules baggage.
- Junk-dependent secondary-color Makeshift cards can become nonfunctional without Trash Baron.
- This conflicts with the Golden Rule if a color package silently depends on a Leader-created zone.

The discard can carry the theme cleanly:

> Everyone creates trash. Makeshift is unusually good at using it.

### One Man's Trash

**One Man's Trash** is the working Trash Baron signature ability title for controlled Item access from Discard.

Working shape:

> Once each Round, you may play an Item from your discard by paying its normal Cost.

Exact wording and guardrails remain subject to the card rewrite.

Important balance warning: Discard fills automatically, so broad unlimited recursion is dangerous. Favor controls such as:
- once each Round;
- normal Cost still paid;
- "an Item that entered your discard this Round";
- bottom-deck/remove-style cleanup where needed.

✎ Canonical `cards.json` / `leaders.json` still contain Junk Pile text and have **not yet been mass-converted**.

---

# Physical-card / "I have to try that" design space

This is now an intentional Unhinged design pillar rather than isolated novelty.

Strong concepts currently preserved:

- **Inconspicuous Bush** — physically hide a Character underneath; later reveal/release it.
- **Trench Coat** — stack Child Characters underneath; physical comedy is part of board state.
- **Hot Potato** — shared Item that physically moves between players/positions.
- **Lost & Found** — cards accumulate under a persistent Item.
- **Last Slice of Pizza** — shared control/position tied to Pass behavior.
- **Handmade Card / Ace Up the Sleeve** — deliberately homemade visual presentation with unambiguous real rules.
- **Absolutely Do Not Push This Button** — persistent tempting object/state.
- **Unofficial Reverse Card** — possible physical rotation/reversal presentation.

Design rule: physical gimmicks should make the game more interesting to play, not stop play or require remembering state outside the current game.

---

# Fuel design note

The Marvel Champions resource-card comparison reinforced the current Fuel direction.

A card such as **Gas Station Gift Card** is favored as an Action that **Readies existing Fuel** rather than temporarily increasing Fuel Tank capacity.

Working example:

> **Gas Station Gift Card** — Action  
> Ready up to 2 Fuel.

This creates extra total spending across a Round without letting a Round-3 player suddenly pay a single Cost-5 card. Exact cost/balance not locked.

---

# 180-card pool review — high-level health

A full September 21 audit is documented separately in `docs/card-pool/design-audit-2026-09-21.md`.

Headline assessment:

> **The game underneath the cards is currently stronger than the cards themselves.**

This is healthy for the stage of development. The base systems now create meaningful tactical decisions, while many cards were designed before those systems fully stabilized.

### Pool fingerprints

- **Reckless:** strong attack/risk skeleton; too much repeated +Power.
- **Unruly:** clear teamwork/enter-play identity; currently the most "tribal math" and needs more sequencing/coordination decisions.
- **Crooked:** strongest current decision-tree pool; watch frustration/denial.
- **Makeshift:** excellent Items/scavenging identity; Junk dependency is the largest structural issue.
- **Stubborn:** clear defensive identity; avoid making attacking feel pointless.
- **Kamikaze:** strongest identity; too many near-duplicate Defeat/Sacrifice payoffs.

### Core card-design test

◆ **A strong Unhinged card should alter the player's decision tree, not merely improve a number.**

Desired questions include:
- now or later?
- attack or remain Ready?
- spend the last Fuel or hold it for a Response?
- Defeat that Kamikaze Character or leave it alive?
- cash this Character in or preserve it?
- which Character gets exposed?
- which card do I exchange, hide, recycle, or redirect?

Simple stat cards still have a place, especially as beginner breathing room, but memorable cards should create chess-like sequencing and tradeoffs.

---

# Terminology still pending before canonical card rewrite

✎ **Unit → Character** remains strongly favored but is not yet formally locked.

✎ Canonical card text still contains legacy terms such as:
- Unit
- Deploy
- Exhaust
- dies/died
- Resource
- Junk Pile

These should be converted only as part of the deliberate card rewrite, not by blind global replacement.


---

# Faction naming exploration

● The old working names **Reckless / Unruly / Crooked / Makeshift / Stubborn / Kamikaze** have been reopened as part of the faction-identity pass.

## Leading single-word six

The current preferred single-word naming set is:

- **Wild** — push too far; risk, self-damage, overcommitment, dangerous payoff.
- **Amped** — build momentum; Characters feed, tag, replace, or set up the next play.
- **Tricky** — manipulate plans; redirection, timing, information, unexpected interaction.
- **Sketchy** — repurpose questionable materials; Items, discard, improvisation, unconventional uses.
- **Spiteful** — interaction has consequences; survive, retaliate, and make the opponent regret messing with the board.
- **Doomed** — Defeat is expected and useful; Characters dying advances the plan.

These are the **leading single-word candidates**, not yet a final terminology lock.

Important identity distinctions:
- **Wild** wants to flirt with Defeat by pushing too far.
- **Spiteful** wants to survive interaction and punish it.
- **Doomed** expects Defeat and turns it into value.
- **Amped** should be sequencing/momentum, not generic Trait math.
- **Tricky** should bend or redirect the opponent's plan rather than become generic denial/control.
- **Sketchy** should repurpose and improvise rather than merely recur cards from discard.

## Longer-name comparison set

A separate phrase-name set is being preserved for later comparison:

- **No Chill** ↔ Wild
- **High Turnover** ↔ Amped
- **Funny Business** ↔ Tricky
- **Good Enough** ↔ Sketchy
- **Find Out** ↔ Spiteful
- **Red Shirts** ↔ Doomed

The phrase set is intentionally **not** being mixed into the single-word set yet. The goal is to compare two coherent naming voices before choosing the final format.

Design note: **High Turnover**, **Funny Business**, and **Red Shirts** are especially strong phrase candidates. Any commercial use of **Red Shirts** should receive an IP/trademark review because of its strong cultural association with Star Trek.

The umbrella term for these six identities (e.g. faction/color/attitude/etc.) remains intentionally undecided until the identity names are settled.

---

# Immediate next work

1. Finish the Response rules, especially chain limits.
2. Decide Owner-only/plain-language vocabulary vs retaining Controller.
3. Confirm Character as the permanent replacement for Unit.
4. Rewrite Makeshift away from Junk Pile and rebalance Trash Baron's recursion.
5. Use the September 21 card audit to replace/rework redundant stat cards and duplicate faction effects.
6. Add more meaningful Rotate abilities.
7. Perform the full 180-card terminology + decision-tree rewrite.
8. Rebuild test/meta decks and rerun balance after the card rewrite.
