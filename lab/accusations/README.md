# Accusations Lab — browser playtest

**Play:** https://jobeck17.github.io/unhinged/lab/accusations/

**Standalone rules:** [RULES.md](RULES.md)

**Implementation:** [index.html](index.html) contains the standalone browser interface, card definitions, and local game state. It does not import production cards, decks, rules, or game logic.

## What this build is
A first-pass local two-player hot-seat prototype for evaluating whether temporary contested Scenarios create interesting decisions. Choose a leader for each seat, press New game, play cards from the active player's hand, and End turn to switch seats. To play a Scenario, select it from hand then select an empty slot. To move a Character, select it and then select a Scenario. To attack, click Attack on an eligible Character and then Select on an opposing Character at the same Scenario. Use the event log for resolution.

## Known limitations / not yet a rules-complete digital referee
- Hands and decks counts are visible on the shared screen; no hidden-information privacy or network play.
- Opening mulligan is not implemented.
- Some optional effects automatically pick the first eligible target or reinforcement instead of asking.
- Scenario selection and Action target selection are basic; not all nuanced ability interactions are exhaustively validated.
- Scenario start checks resolve in slot order, not a manually chosen order.
- The three-round stalemate release is approximate.
- Undo is one-step and may not reverse all intermediate changes in a multi-step interaction.
- Debug draws deliberately bypass ordinary draw rules.
- No automated opponent, matchmaking, saved game, or deck builder.

**Rules adjudication:** RULES.md governs whenever the prototype and interface disagree. Do not treat this browser build as verified rules parity or balanced.

## Playtest observations to capture
Record turns per match, Scenarios attempted/succeeded/failed, how often a defender gets a card, whether the board stalls, and whether first player or early Stash decisions dominate. Report any discrepancy between browser behavior and RULES.md.
