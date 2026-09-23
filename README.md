# Unhinged

Unhinged is a leader-centered card game in development. This repository is the working home for rules, decisions, card design, ideas, history, and playtest code. Nothing here is a published final ruleset.

## Start here

| Need | File | Status |
| --- | --- | --- |
| Current decisions and open questions | [Latest checkpoint](docs/current-state-2026-09-21.md) | Latest dated checkpoint |
| Rules for the next paper playtest | [LAB rules](docs/card-pool/rules-lab.md) | Working rules |
| Current versus retired language | [Terminology](docs/terminology.md) | Editorial guide for new work |
| Physical card layout and accessibility | [Card design principles](docs/card-design-principles-2026-09-22.md) | Working guide; [editable Word copy](docs/Unhinged_Card_Design_Principles_2026-09-22.docx) |
| Character, mechanic, and physical-card ideas | [Idea bank](docs/idea-bank.md) | Concepts, not approved cards |
| Older experiments and design history | [History index](docs/history/README.md) | Historical context only |
| Original 180-card Alpha 0.03 pool | [Pool status](docs/card-pool/README.md) | Legacy data awaiting rewrite |

When a newer checkpoint deliberately changes an older one, the newer checkpoint wins. The LAB rules describe the current playable core. The old pool and browser simulator do **not** override current rules.

## Current playable foundation

- One Leader starts in play; reduce the opposing Leader to 0 Health.
- Players alternate one-action Turns within shared Rounds.
- Fuel is the spendable resource. Its working progression is 1 to 7 Fuel across Rounds.
- Ready and Rotate describe orientation; Blocking Rotates a Blocker.
- Units use Power and Guard. Damage persists. A surviving Blocker retaliates.
- An Attack may target the Leader or a Rotated opposing Unit; a Rotated Leader is Vulnerable.
- Actions resolve once; Items remain in play and Attach only when their text says so.

Responses, a possible Character name for Units, and six identity names remain at their stated statuses in the linked documents.

## Browser prototype

The [Mongo simulator](prototypes/mongo-legacy.html) is a **legacy mechanics experiment**. It uses Command and Stamina, old deployment language, and simplified card effects. Its results do not validate current Fuel rules. The repository landing page links to current documents and this archived simulator.

## Contributing to the project

Put new decisions in a dated checkpoint and update LAB rules when playable rules change. Put speculative ideas in the idea bank with their status. Keep historical tests intact and clearly labeled. Do not bulk replace legacy card text: moving from the old pool to current rules requires card-by-card design and balance work.
