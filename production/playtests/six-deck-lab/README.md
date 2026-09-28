# Six-deck lab

This is the **revision 6 mono-Style baseline** for the rebuilt 0.2 Donut card pool.

- [All six 40-card lists](decks.md)
- [Structured deck data](decks.json)
- [Current six Leader passives](leaders.md)
- [Revision 6 simulation snapshot](snapshot-revision-6-card-flow.md)

## Current test conditions

- War winner skips the Draw step of their first Turn.
- Birthday Party Magician draws whenever one of their Characters is Returned from play to hand.
- HOA President uses **Failure to Respond**: beginning in Round 8, opposing Characters cannot Block HOA's Attacks.
- Revision 6 adds more card replacement, combat-Defeat Draw, a paid Draw Item, a Draw-2 Action, and more high-Power/low-Guard early Characters.

The latest 30,000-game heuristic round robin averaged **8.64 Rounds** with a **60.07% first-player win rate**. Treat exact deck win rates as directional; the simulator is strongest for pacing, economy, hand-size, and large package-engagement signals.

## Why mono-Style first

The first job is still to prove that each Style works by itself before dual-Style construction can hide weak packages.

Current tuning priorities:

1. Momentum: make Low Hand sustainable rather than zero-hand topdecking.
2. Stonewall: validate the Round-8 pressure of Failure to Respond in physical play.
3. Salvage: reduce total engine efficiency; a simple one-opposing-Stash-per-Turn cap was not enough.
4. Misdirection: improve tempo/board conversion rather than adding more generic Draw.

Dual-Style testing comes after these mono baselines stabilize.
