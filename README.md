# Unhinged

Unhinged is a leader-centered card game in development. This repository is the working home for rules, decisions, card design, ideas, history, and playtest code. Nothing here is a published final ruleset.

## Start here

| Need | File | Status |
| --- | --- | --- |
| Current decisions and open questions | [Latest checkpoint](docs/current-state-2026-09-29.md) | Latest dated checkpoint |
| Current 180-card roster, Traits, and keywords | [Donut card workshop](production/cards/README.md) | Revision 5; rebuilt 180-card pool and generated sheets |
| Rules for the next paper playtest | [Production rules](production/rules/unhinged-rules.md) | Current consolidated rulebook |
| Documentation map | [Docs index](docs/README.md) | Where current, historical, legacy, and speculative material belongs |
| Decisions required before production card text | [Open decisions](production/rules/open-decisions.md) | Deliberate choices still pending |
| Current versus retired language | [Terminology](docs/terminology.md) | Editorial guide for new work |
| Physical card layout and accessibility | [Card design principles](docs/card-design-principles-2026-09-22.md) | Working guide; [editable Word copy](docs/Unhinged_Card_Design_Principles_2026-09-22.docx) |
| Character, mechanic, and physical-card ideas | [Idea bank](docs/idea-bank.md) | Concepts, not approved cards |
| Older experiments and design history | [History index](docs/history/README.md) | Historical context only |
| Original 180-card Alpha 0.03 pool | [Pool status](docs/card-pool/README.md) | Historical data; superseded by Donut |
| Next rules prototype | [Donut](prototypes/README.md) | Planned successor to Mongo |

When a newer checkpoint deliberately changes an older one, the newer checkpoint wins. The production rulebook consolidates the current playable core. The September 29 checkpoint records the rebuilt rules/card architecture and revision-11 playtest baseline. The old pool and browser simulator do **not** override current rules. See the [documentation map](docs/README.md) when deciding where a new note belongs.

## Current playable foundation

- One Leader outside the 40-card deck; reduce the opposing Leader from 25 Health to 0.
- Full player Turns: Ready, Draw, then Play cards, Activate abilities, and Attack in any legal order.
- The War winner currently goes first every Round.
- **Stash** is the resource system. Once per Round, during your Turn, you may put one card from hand face down into Stash; each Ready Stash pays 1 Cost when Rotated.
- Decks may use the Leader's Style plus up to one additional Style. Mono-Style decks are legal. Up to four copies of a card.
- Characters may Block on the Turn they enter but normally cannot Attack until their controller's next Turn.
- Leader attacks allow one Blocker. Surviving Blockers retaliate; excess attack damage overflows to the Leader.
- Ready enemy Characters normally cannot be attacked directly unless card text such as Sucker Punch says otherwise.
- Actions resolve once and go to discard. Items remain in play unless moved by an effect.
- Traits have no automatic rules meaning.
- Response is Action timing, not a separate card type.

The September 28 checkpoint and production rulebook are the active source of truth. Older Fuel, single-action-Turn, Vulnerable-Leader, Cloak, Stack, and Mongo-era material is historical only.

## Browser prototype

The [Mongo simulator](prototypes/mongo-legacy.html) is a **legacy mechanics experiment**. It uses Command and Stamina, old deployment language, and simplified card effects. Its results do not validate current Fuel rules. The repository landing page links to current documents and this archived simulator.

## Contributing to the project

Put new decisions in a dated checkpoint and update the production rulebook when playable rules change. Update the LAB snapshot only when intentionally recording a detailed source snapshot. Put speculative ideas in the idea bank with their status. Keep historical tests intact and clearly labeled. Do not bulk replace legacy card text: moving from the old pool to current rules requires card-by-card design and balance work.
