# Unhinged Production

This directory holds the material that should guide the next production pass: current rules, card specifications, print files, and release checklists. It is the working source for content intended to move from design into a playable product.

## Current source of truth

| Need | File |
| --- | --- |
| Current test rulebook | [Rules](rules/unhinged-rules.md) |
| Items that still need a deliberate decision | [Open decisions](rules/open-decisions.md) |
| Card frame, symbols, and accessibility requirements | [Card design principles](../docs/card-design-principles-2026-09-22.md) |
| Concepts that are not yet part of production | [Idea bank](../docs/idea-bank.md) |

The rulebook consolidates the locked and current soft-locked mechanics from the September 21 checkpoint and its LAB source record. The open-decisions file keeps unfinished choices out of card text and print files.

## Intended structure

```text
production/
├── rules/       Current rulebook and decisions required before printing
├── cards/       Production card list, templating data, and card text
├── art/         Art briefs and approved assets
├── print/       Print-ready files and printer specifications
└── releases/    Set plans, release notes, and quality checks
```

The lane README files are intentionally present before their first artifacts so that new work has a clear home. The Alpha 0.03 pool in [`docs/card-pool/`](../docs/card-pool/README.md) remains legacy until its cards are rewritten one by one.

## Production status

- **Rules:** current consolidated playtest rules exist; open decisions are tracked separately.
- **Cards:** no production card list has been approved yet.
- **Art:** no production art brief or approved art set has been established yet.
- **Print:** no print-ready templates or printer specifications have been approved yet.
- **Releases:** no set or season has been locked yet.
