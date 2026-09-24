# Unhinged

**Core 0.1 · Donut** is the current working version of this card game. Start with the files below. The card pool and rules are playtest drafts, not final print text.

| Read this | For |
| --- | --- |
| [Current rules](production/rules/unhinged-rules.md) | How to play the current test |
| [Current decisions](docs/current-state-2026-09-23.md) | Donut status and next evidence needed |
| [Open decisions](production/rules/open-decisions.md) | Questions that still need a deliberate answer |
| [Card workshop](production/cards/README.md) | Current 180-card pool, Styles, Traits, and keywords |
| [Leader cast](docs/leaders.md) | Six Leaders and their design direction |
| [Card design principles](docs/card-design-principles-2026-09-22.md) | Layout and accessibility |
| [Terminology](docs/terminology.md) | Current rules vocabulary |
| [Future ideas](brainstorm/ideas.md) | Concepts that are not in the current build |
| [Scrapped experiments](brainstorm/scrapped.md) | Approaches to reconsider only by choice |
| [Duel playtest](production/playtests/florida-vs-hoa/README.md) | Current test decks and observations |
| [Prototype code](prototypes/donut-duel/README.md) | Run the focused Donut simulator |

## Where things go

- `production/rules/` holds the active rulebook and unresolved rules decisions.
- `production/cards/cards.json` holds card records; `production/cards/taxonomy.json` defines Traits and keywords once. `build.py` validates those references and generates readable Markdown sheets in the same folder. Edit the JSON sources, then run `python3 production/cards/build.py --check`.
- `docs/` holds current human-readable guides and design status. Code and generated references stay beside the data they describe, so their paths and generation steps remain clear.
- `brainstorm/` holds unimplemented ideas and scrapped experiments. An idea leaves `ideas.md` when it enters the current rules or card pool.
- `prototypes/` holds executable Donut experiments. `production/playtests/` holds their deck lists, reports, and results.

Old Mongo materials and the Alpha 0.03 card pool have been removed from the working tree. Git history retains prior commits if a specific decision ever needs investigation. Current rules and card data govern all new work.
