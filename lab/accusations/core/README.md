# Accusations Core Lab — isolated mechanic comparison

**Play:** https://jobeck17.github.io/unhinged/lab/accusations/core/

**Status:** TESTING. This is an intentionally stripped-down *separate* experiment, not a revision of the current Accusations game.

The full [Accusations Lab](../) and its [canonical rules](../RULES.md), [Scenario catalog](../SCENARIOS.md), existing Character text, Actions, Items, Leaders, deck lists, and economic systems are **unchanged**. The full lab is the reference for the richer playable game. This Core Lab is not a competing source of truth.

## What this isolates

Both comparison modes use the *same* engine, board, starting conditions, bot, and six vanilla Character choices. The test deliberately removes deck draws, hand size, random draws, Actions, Items, Leader passives, special Character text, scenario-specific bonuses, and variable filing cost. The purpose is to study the experience of joining, fighting over, and resolving a Scenario before modifying card economy.

- Choose from six **unlimited, always-visible** Character templates with costs 1–3, Power and Health. Each side has the same options; no deck or hand.
- Each player gets **one automatic permanent Stash at the start of each turn**, starting with 1 on turn 1, capped at 5. All Stash readies at the start of the player's next turn. Spend Stash to recruit Characters. There is no Stash card sacrifice.
- All Scenarios are generic **cost 1**. To file, rotate **one Ready Character at Home**, immediately committing it to the first free slot. No additional Stash is required. One new Scenario per turn, two owned at once, and three shared Scenario slots.
- To join an existing Scenario, rotate a Ready Character at Home. No default withdrawal or direct transfer between Scenarios.
- Characters cannot attack on the turn they enter. A Ready Character attacks an opposing Character at the *same* Scenario, rotating to attack. Both deal their Power simultaneously, damage persists, and either or both can be defeated. Ready and Rotated defenders are legal targets.
- Maximum three Characters per player per Scenario. When a Scenario ends, its Characters return Home without changing rotation or damage. First to **5 Verdicts** wins.
- The bot uses a simple policy to recruit, contest, attack, and file. It is an opponent for usability tests, **not a balance authority**.

## Toggle the Scenario win check

**A — Elimination (control):** At the start of its filing player's turn, a Scenario with at least one supporter and no opposing contesters succeeds for 1 Verdict.

**B — Influence Majority (experimental):** At that same check, a Scenario with at least one supporter succeeds if the **combined Power of its supporting Characters exceeds the combined Power of its contesters**. Ties remain unresolved. This intentionally uses existing Power rather than introducing a third Character stat.

In **both** modes, no supporting Characters means the Scenario fails; a Scenario cannot resolve immediately on filing; finished Scenarios return all Characters Home. Scenario winners each earn **1 Verdict**.

## How to compare fairly

1. Play several games in Mode A using the same play style, noting what happened at each Scenario.
2. Select Mode B and press **New comparison game**; run several games again.
3. Observe whether the opponent has a meaningful chance to contest, whether combat is useful, whether extra commitments are interesting, whether large Characters dominate, and how long Scenarios stay alive.
4. Avoid drawing balance conclusions from bot win rate; try human-versus-human tests later.

The variants are *not* intended to test whether 2-card draw, the Stash-card economy, Leaders, Items, Actions, or high-cost Scenarios are balanced.

## Implementation

- [index.html](index.html) — independent browser UI.
- [app.js](app.js) — rendering and click handlers.
- [game.mjs](game.mjs) — standalone experimental rules engine and bot.
- [test.mjs](test.mjs) — Node smoke tests covering turn flow, filing, attacks, resolution, and bot actions.

Run tests with \`node lab/accusations/core/test.mjs\`.
