# Six-deck lab

This is the **revision 7 mono-Style baseline** for the rebuilt 0.2 Donut card pool.

- [All six 40-card lists](decks.md)
- [Structured deck data](decks.json)
- [Current six Leader passives](leaders.md)
- [Revision 6 simulation snapshot](snapshot-revision-6-card-flow.md)

## Current test conditions

- War winner skips the Draw step of their first Turn.
- Birthday Party Magician draws whenever one of their Characters is Returned from play to hand.
- HOA President uses **Failure to Respond**: beginning in Round 8, opposing Characters cannot Block HOA's Attacks.
- Revision 7 keeps the revision-6 card-flow foundation and makes targeted Misdirection, Expendable, and Salvage balance changes.

The latest 30,000-game heuristic round robin averaged **8.64 Rounds** with a **60.07% first-player win rate**. Treat exact deck win rates as directional; the simulator is strongest for pacing, economy, hand-size, and large package-engagement signals.

## Why mono-Style first

The first job is still to prove that each Style works by itself before dual-Style construction can hide weak packages.

Current tuning priorities:

1. Validate Rock Star and HOA with their new locked passives in human play.
2. Re-test Expendable after removing cheap standalone efficiency.
3. Re-test Salvage after trimming stacked Item/card value while leaving Trash Baron intact.
4. Validate whether sturdier Misdirection bounce targets convert card advantage into real combat pressure.

Dual-Style testing comes after these mono baselines stabilize.
