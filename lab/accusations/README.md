# Accusations Lab — browser playtest

**Play:** https://jobeck17.github.io/unhinged/lab/accusations/

**Standalone rules:** [RULES.md](RULES.md)

**30 October active-attack and movement checkpoint (TESTING):** [RULES.md, sections 7–8](RULES.md) now require **attacking an effectively undefended Scenario to claim 1 Verdict**, rather than automatic start-of-turn success. The **full Accusations browser lab** implements this claim attack, including one opposing response turn, **filing Rotates**, **ordinary commitment does not Rotate**, and direct deployment to an existing Scenario. The defender's separate finishing attack is **still OPEN**. This is an isolated lab rule, not production Unhinged.

**Isolated Core Lab:** [Play the Character-only experiment](core/) · [Compare elimination vs Influence Majority](core/README.md). It runs separately and does not alter the full game.

**Leader-by-leader Scenario catalog:** [SCENARIOS.md](SCENARIOS.md)

**Implementation:** [index.html](index.html) contains the standalone browser interface, card definitions, and local game state. It does not import production cards, decks, rules, or game logic.

## What this build is
A first-pass solo browser prototype against a rule-based bot for evaluating whether temporary contested Scenarios create interesting decisions. Choose your leader and the bot's leader, press New game, choose cards to mulligan (or Keep All), and End turn to let the bot take its turn. To file a Scenario, select it in your hand, choose one or more Ready Characters at Home and optionally add Ready Stash, then confirm filing. **Filing Rotates** those Characters. To join an existing Scenario, select a Ready Character at Home and then tap its Scenario; **ordinary commitment does not Rotate**. Alternatively, use **→ Scenario** beside a Character in hand, then tap an existing Scenario to deploy directly there. Newly played Characters remain Ready but cannot normally attack that turn. Characters cannot voluntarily leave or transfer between Scenarios. To attack a Character, tap **⚔ Attack** and choose an opposing Character at the same Scenario; both deal simultaneous damage, even if the defender was Rotated. To win your Scenario, tap **⚖ Claim +1** on an eligible Ready supporting Character when the Scenario is effectively undefended and your opponent has had their response turn. This Rotates the Character and awards 1 Verdict; it is **never automatic at turn start**. The Marine still deals +1 damage on defense. A defender clearing all prosecutors causes failure at the next prosecuting player's start-of-turn check (the separate finishing attack remains OPEN).

## Active-claim testing checks

Run `node lab/accusations/active-attack.test.mjs` to verify that empty Scenarios do not grant automatic Verdicts, that a Ready supporter can actively claim only after an opponent's response turn, and that special Scenario requirements, direct deployment, commitment readiness and survivor cleanup behave as expected.

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

**Rules adjudication:** [RULES.md](RULES.md) is the authority. The browser implements the main TESTING movement and active-claim loop; card interactions beyond the focused regression cases are not a guarantee of full rules parity or balance. Core Lab Modes A/B remain unchanged historical comparisons.

## Playtest observations to capture
Record turns per match, Scenarios attempted/succeeded/failed, how often a defender gets a card, whether the board stalls, and whether first player or early Stash decisions dominate. Report any discrepancy between browser behavior and RULES.md.
