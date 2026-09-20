# Unhinged

Digital playtest harness and design repository for **Unhinged**, currently tracking **Alpha 0.03 "Mongo."**

## Current checkpoint

The current design state is documented in:

- [Current State - 2026-09-20](./docs/current-state-2026-09-20.md)
- [LAB Rules](./docs/card-pool/rules-lab.md)
- [Canonical Card Pool](./docs/card-pool/cards.json)
- [Canonical Leaders](./docs/card-pool/leaders.json)

When older prototype notes conflict with the dated current-state checkpoint, use the newer checkpoint unless a newer file explicitly supersedes it.

## Current foundation

- 40-card decks
- 7-card opening hand with 0-7 mulligan
- One Leader starts in play
- War determines Round 1 initiative and breaks tied game-end states
- Ready, Set, Draw round structure
- Alternating one-Move turns
- Two consecutive Passes end the Round
- Single unrestricted battlefield
- Multiple blockers
- Blocking exhausts
- Exhausted Units may be attacked directly and retaliate if they survive
- Persistent damage
- Discard cards from hand for +1 temporary Guard each during defense
- Actions resolve once, then go to discard
- Items persist on the board and attach only when their text says to
- Exhausted Leaders are Vulnerable

## Current card pool

- 6 playtest pools
- 30 cards per pool
- 180 cards total
- Per pool: 18 Units / 8 Actions / 4 Items
- Baseline deck skeleton: 26 Units / 8 Actions / 6 Items

Current pools:

- Reckless
- Unruly
- Crooked
- Makeshift
- Stubborn
- Kamikaze

The five adjective identity names are locked. Kamikaze is the current sixth mechanical pool name but has not received the same final naming lock.

## Soft-locked testing defaults

- Shared Resource track grows from 1 to 7
- Both players draw on Round 1
- Leader/primary color plus one secondary color
- Maximum 2 copies of a card
- Newly deployed Units may block, but normally cannot attack or use their own Exhaust ability that round

## Historical rollback anchor

**MONGO-PRECOMMIT-2026-09-18**

The historical pre-commit snapshot remains in [docs/mongo-precommit.md](./docs/mongo-precommit.md). It is intentionally preserved rather than rewritten to match newer rules.

This repository is a playtest and design tool, not a final published rules reference.
