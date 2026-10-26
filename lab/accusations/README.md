# Accusations Lab — browser playtest

**Play:** https://jobeck17.github.io/unhinged/lab/accusations/

**Standalone rules:** [RULES.md](RULES.md)

**Leader-by-leader Scenario catalog:** [SCENARIOS.md](SCENARIOS.md)

**Implementation:** [index.html](index.html) contains the standalone browser interface, card definitions, and local game state. It does not import production cards, decks, rules, or game logic.

## What this build is
A first-pass solo browser prototype against a rule-based bot for evaluating whether temporary contested Scenarios create interesting decisions. Choose your leader and the bot's leader, press New game, choose cards to mulligan (or Keep All), and End turn to let the bot take its turn. To file a Scenario, select it in your hand, choose one or more Ready Characters at Home and optionally add Ready Stash, then confirm the filing. To commit to an existing Scenario, select a Ready Character at Home and then select the Scenario. Commitment rotates that Character. A Rotated Character is displayed sideways on the board. Characters cannot voluntarily leave or transfer between Scenarios. To attack, click Attack on an eligible Character and then Select on an opposing Character at the same Scenario. Use the event log for resolution. Combat is simultaneous: the attacker and defender each deal Power damage to the other, even if the defender is Rotated; the Marine deals +1 damage when defending.

## Testing draw economy

The playtest currently draws **2 Main cards at the start of each turn**, except the first player draws **1 Main card on turn 1**, immediately after the opening mulligan. This is a **TESTING** change, not a permanent balance decision. Scenario replacement draws are unchanged.

## Known limitations / not yet a rules-complete digital referee
- The computer bot follows basic Stash, deployment, contest, combat, and filing heuristics; it does not plan long-term or evaluate every card ability. No network play.
- Opening mulligan is implemented: once, before the game starts, select any Main and/or Scenario cards to replace. The bot also chooses opening replacements.
- Some optional effects automatically pick the first eligible target or reinforcement instead of asking.
- Filing uses Character printed costs plus optional Stash. Action target selection is basic; not all nuanced ability interactions are exhaustively validated.
- Scenario start checks resolve in slot order, not a manually chosen order.
- The three-round stalemate release is approximate.
- Undo is one-step and may not reverse all intermediate changes in a multi-step interaction.
- Debug draws deliberately bypass ordinary draw rules.
- No matchmaking, saved game, or deck builder. The bot is heuristic, not a full adversarial AI.

**Bot turn control:** One press of **End turn → Bot plays** completes the bot's turn and returns control to the player. The bot uses a basic heuristic, not full strategic AI.

**Rules adjudication:** RULES.md governs whenever the prototype and interface disagree. Do not treat this browser build as verified rules parity or balanced.

## Playtest observations to capture
Record turns per match, Scenarios attempted/succeeded/failed, how often a defender gets a card, whether the board stalls, and whether first player or early Stash decisions dominate. Report any discrepancy between browser behavior and RULES.md.
