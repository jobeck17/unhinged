# Unhinged Production

This directory holds the material that should guide the next production pass: current rules, card specifications, print files, and release checklists. It is the working source for content intended to move from design into a playable product.

## Current source of truth

| Need | File |
| --- | --- |
| Current test rulebook | [Rules](rules/unhinged-rules.md) |
| Items that still need a deliberate decision | [Open decisions](rules/open-decisions.md) |
| Card frame, symbols, and accessibility requirements | [Card design principles](../docs/card-design-principles-2026-09-22.md) |
| Concepts that are not yet part of production | [Idea bank](../docs/idea-bank.md) |

The rulebook consolidates the locked and current soft-locked mechanics from the September 21 checkpoint and LAB rules. The open-decisions file keeps unfinished choices out of card text and print files.

## Intended structure

```text
production/
├── rules/       Current rulebook and decisions required before printing
├── cards/       Production card list, templating data, and card text
├── art/         Art briefs and approved assets
├── print/       Print-ready files and printer specifications
└── releases/    Set plans, release notes, and quality checks
```

Only `rules/` exists today because the current card pool still needs a card-by-card rewrite for Fuel, Rotate, modern timing, and the pending terminology choices. Add the other folders when their first production artifact exists.
