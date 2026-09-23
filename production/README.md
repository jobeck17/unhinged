# Unhinged Production

This directory holds the material that should guide the next production pass: current rules, card specifications, print files, and release checklists. It is the working source for content intended to move from design into a playable product.

## Current source of truth

| Need | File |
| --- | --- |
| Current test rulebook | [Rules](rules/unhinged-rules.md) |
| Items that still need a deliberate decision | [Open decisions](rules/open-decisions.md) |
| Current 180-card production playtest pool | [Production cards](cards/README.md) |
| Current six-Leader cast and Style identities | [Leaders](../docs/leaders.md) |
| Card frame, symbols, and accessibility requirements | [Card design principles](../docs/card-design-principles-2026-09-22.md) |
| Concepts that are not yet part of production | [Idea bank](../docs/idea-bank.md) |

The rulebook consolidates the locked and current soft-locked mechanics from the September 21 checkpoint and its LAB source record. The open-decisions file keeps unfinished choices out of card text and print files.

The Production Pool v0.1 is a **ground-up rewrite**, not a terminology conversion of Alpha 0.03. The old pool in `docs/card-pool/` remains legacy test data for history and comparison.

## Intended structure

```text
production/
├── rules/       Current rulebook and decisions required before printing
├── cards/       Current production playtest card pool and later templating data
├── art/         Art briefs and approved assets
├── print/       Print-ready files and printer specifications
└── releases/    Set plans, release notes, and quality checks
```

## Production status

- **Rules:** current consolidated playtest rules exist; open decisions are tracked separately.
- **Cards:** Production Pool v0.1 contains 180 working deck cards, 30 per Style. It is ready for audit, deck construction, simulation, and physical playtest, but is not final print text.
- **Leaders:** six Leader identities and Style homes are committed; exact Health and ability packages remain playtest work.
- **Art:** no production art brief or approved art set has been established yet.
- **Print:** no print-ready templates or printer specifications have been approved yet.
- **Releases:** no set or season has been locked yet.

## Immediate production sequence

1. Audit Pool v0.1 for trigger/timing ambiguity and decision quality.
2. Build controlled 40-card test decks around each Leader and secondary-Style pairing.
3. Simulate the cost/stat curve under current 1→7 Fuel and combat rules.
4. Physically playtest the strongest packages.
5. Tune cards before freezing machine-readable production data or printable card text.
