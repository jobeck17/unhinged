# Six-deck lab

This is the **revision 10 mono-Style baseline** for the rebuilt 0.2 Donut card pool.

- [All six 40-card lists](decks.md)
- [Structured deck data](decks.json)
- [Current six Leader passives](leaders.md)
- [Revision 6 simulation snapshot](snapshot-revision-6-card-flow.md)
- [Revision 7 turn-order / Ace Up My Sleeve snapshot](snapshot-revision-7-turn-order.md)

## Current test conditions

- War winner skips the Draw step of their first Turn.
- After mulligans, the second player may put the top card of their deck face up and Rotated into Stash as optional temporary Stash.
- Birthday Party Magician uses **Ace Up My Sleeve**: once during your Turn, when one of your Characters Returns from play to hand, Ready 1 Stash.
- HOA President uses **Failure to Respond**: beginning in Round 8, opposing Characters cannot Block HOA's Attacks.
- Revision 10 keeps the revision-8 economy changes and restores Magician to its pre-revision-9 list for full telemetry testing.

The revision-7 turn-order test moved first-player wins from **65.06% without the second-player bonus to 54.98% with the temporary Stash**, while average game length stayed effectively flat in the same harness. Treat exact deck win rates as directional; the simulator is strongest for relative A/B comparisons, pacing, economy, hand-size, and large package-engagement signals.

## Why mono-Style first

The first job is still to prove that each Style works by itself before dual-Style construction can hide weak packages.

Current tuning priorities:

1. Validate Rock Star and HOA with their new locked passives in human play.
2. Re-test Expendable after removing cheap standalone efficiency.
3. Re-test Salvage after reducing Jerry-Rig density while leaving Trash Baron intact.
4. Use full per-round telemetry to diagnose why Misdirection struggles to convert bounce/card flow into Leader pressure.

Dual-Style testing comes after these mono baselines stabilize.
