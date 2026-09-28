# Unhinged Production

This directory holds the material that should guide the next production pass: current rules, card specifications, print files, and release checklists. It is the working source for content intended to move from design into a playable product.

## Current source of truth

| Need | File |
| --- | --- |
| Current test rulebook | [Rules](rules/unhinged-rules.md) |
| Items that still need a deliberate decision | [Open decisions](rules/open-decisions.md) |
| Current 180-card production playtest pool | [Production cards](cards/README.md) |
| Keyword candidates and attack/defend restrictions | [Mechanics playtest](cards/mechanics-playtest.md) |
| Six current mono-Style 40-card baseline decks | [Six-deck lab](playtests/six-deck-lab/README.md) |
| Current six-Leader cast and Style identities | [Leaders](../docs/leaders.md) |
| Card frame, symbols, and accessibility requirements | [Card design principles](../docs/card-design-principles-2026-09-22.md) |
| Concepts that are not yet part of production | [Idea bank](../docs/idea-bank.md) |

The rulebook and [September 28 checkpoint](../docs/current-state-2026-09-28.md) define the active rebuild baseline. The open-decisions file keeps unfinished choices out of card text and print files.

The Production Pool v0.1 is a **ground-up rewrite**, not a terminology conversion of Alpha 0.03. The old pool in `docs/card-pool/` remains legacy test data for history and comparison.

## Intended structure

```text
production/
├── rules/       Current rulebook and decisions required before printing
├── cards/       Current draft data, generated card sheets, and validation
├── art/         Art briefs and approved assets
├── print/       Print-ready files and printer specifications
└── releases/    Set plans, release notes, and quality checks
```

## Production status

- **Rules:** current consolidated playtest rules exist; open decisions are tracked separately.
- **Cards:** Production Pool v0.2 contains 180 rebuilt deck cards, 30 per Style. Revision 5 is the current package-based playtest pool. Balance remains unverified.
- **Leaders:** six identities, Style homes, 25 Health, and one-passive playtest packages are current. Activated abilities, Charge, and ultimates are not part of this baseline.
- **Art:** no production art brief or approved art set has been established yet.
- **Print:** no print-ready templates or printer specifications have been approved yet.
- **Releases:** no set or season has been locked yet.

## Immediate production sequence

1. Play the six mono-Style 40-card baseline decks and validate both packages in each Style.
2. Fix rules-execution or package-function failures before broad balance tuning.
3. Run the controlled first-player Draw versus skip-first-Draw test with no other rule changes.
4. Build and test dual-Style combinations after the mono baselines function.
5. Tune Costs, Power, Guard, and package density before freezing card text or producing print layouts.
