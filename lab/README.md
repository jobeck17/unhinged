# Unhinged Lab

This directory is an isolated experimental workspace for mechanics, Leaders, deck-construction rules, alternate packages, and other concepts that are not part of the current canonical game.

## Quarantine rule

Nothing in `lab/` is CURRENT Unhinged.

The canonical game remains defined by the root files:
- `RULES.md`
- `CARDS.json`
- `DECKS.json`
- `NOTES.md`
- `SIMULATION.md`
- `sim/`
- `web/`
- `builder/`

Lab experiments may read or test against the canonical game, but they must not silently change it.

## Lab index

- `board-width/` — parallel isolated five-Character/no-blocking experiment with Rotated-only targets, Ready engines, free triggers, minimal stacking, and direct board targeting UI.

- `schemes/` — active next-core prototype: simultaneous damage, exposed workers, eight Leader Schemes, 71 supported cards, shared browser/simulation engine, and paired comparison results.

- `gambling-dad/` — Gambler Leader prototype with Rock Bottom Poker, a 40-card placeholder deck, and an isolated browser playtest. [Play the lab](https://jobeck17.github.io/unhinged/lab/gambling-dad/).

- `LEADER_PASSIVES.md` — alternate Leader passives organized by Leader for isolated testing.
- `leader-rulebreakers/` — Leader packages that break construction, setup, resource, or other base expectations.

## Lab principles

1. **No automatic promotion.** A successful lab concept becomes canonical only through a deliberate update to the appropriate root files.
2. **No Style required.** Experimental Leaders and cards may remain Style-neutral until their gameplay identity is understood.
3. **Rule-breaking is allowed.** Lab concepts may intentionally violate deck size, copy limits, Style restrictions, setup, Stash behavior, or other base rules.
4. **Keep experimental data separate.** Do not add lab cards to `CARDS.json`, lab decks to `DECKS.json`, or lab rules to `RULES.md`.
5. **Use lab IDs.** Experimental cards and decks should use `LAB-` identifiers rather than production `P###` IDs.
6. **Test the idea before polishing the theme.** First prove that the gameplay decision is fun and has visible counterplay.
7. **Record failure conditions.** Every experiment should say what would make us abandon or substantially redesign it.
8. **Canonical opponents are controls.** Lab decks may be tested against current Carl decks as a control group without modifying those decks.

## Experiment states

- **IDEA** — concept only.
- **PROTOTYPE** — concrete enough to build or simulate.
- **TESTING** — actively being played or simulated.
- **PAUSED** — preserved but not currently being worked.
- **REJECTED** — tested and intentionally not continuing.
- **PROMOTED** — concept has been deliberately moved into the canonical game.

## Promotion gate

Before promotion, an experiment should answer:

- What rule or expectation does it break?
- Why is breaking that rule fun?
- What does the opponent do about it?
- Does the deck still produce meaningful decisions when it does not draw perfectly?
- Does the mechanic create a distinct play pattern rather than just more efficiency?
- Does it add rules baggage outside its own package?
- Can the mechanic be expressed cleanly on physical cards?
- Has it survived human playtesting and appropriate simulation?

The lab is allowed to be unstable. The canonical game is not.
