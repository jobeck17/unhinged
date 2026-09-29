# Six-deck lab

This is the **revision 12 mono-Style baseline** for the rebuilt 0.2 Donut card pool.

- [All six 40-card lists](decks.md)
- [Structured deck data](decks.json)
- [Current six Leader passives](leaders.md)
- [Revision 6 simulation snapshot](snapshot-revision-6-card-flow.md)
- [Revision 7 turn-order / Ace Up My Sleeve snapshot](snapshot-revision-7-turn-order.md)
- [Revision 10 full telemetry snapshot](snapshot-revision-10-full-telemetry.md)
- [Revision 10 full telemetry JSON](snapshot-revision-10-full-telemetry.json)
- [Revision 11 full telemetry baseline](snapshot-revision-11-full-telemetry.md)
- [Revision 11 full telemetry JSON](snapshot-revision-11-full-telemetry.json)
- [Revision 12 matchup baseline](snapshot-revision-12-matchup-baseline.md)
- [Revision 12 matchup JSON](snapshot-revision-12-matchup-baseline.json)

## Current test conditions

- War winner skips the Draw step of their first Turn.
- After mulligans, the second player may put the top card of their deck face up and Rotated into Stash as optional temporary Stash.
- Birthday Party Magician uses **Ace Up My Sleeve**: once during your Turn, when one of your Characters Returns from play to hand, Ready 1 Stash.
- HOA President uses **Failure to Respond**: beginning in Round 8, opposing Characters cannot Block HOA's Attacks.
- Revision 12 keeps School Bully Hothead and adds Rock Star's hand-gated Comeback Tour package, HOA's symmetric Rotated-board Return Action, cross-Style Return counterplay, and Wrestler's Stash-scaled Tag Out.

Revision 12's matchup baseline reuses the ten unchanged pairings from the corrected full-field test and reruns the five Wrestler pairings with the corrected 'during your Turn' Tag Out timing. Exact win rates remain heuristic; paired A/B changes, pacing, economy, hand-size, and matchup topology are the strongest simulation signals.

## Why mono-Style first

The first job is still to prove that each Style works by itself before dual-Style construction can hide weak packages.

Current tuning priorities:

1. Validate Rock Star and HOA with their new locked passives in human play.
2. Re-test Expendable after removing cheap standalone efficiency.
3. Re-test Salvage after reducing Jerry-Rig density while leaving Trash Baron intact.
4. Use full per-round telemetry to diagnose why Misdirection struggles to convert bounce/card flow into Leader pressure.

Dual-Style testing comes after these mono baselines stabilize.

## Simulation correction

Revision 10 found a winner-index bug in the older heuristic harness: player index 0 was falsey in a loop condition, so some older win-rate and turn-order numbers are not authoritative. Use the corrected revision-10 telemetry harness for current balance work. The historical snapshots remain for design history only.
