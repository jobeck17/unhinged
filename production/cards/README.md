# Unhinged — Donut Card Workshop

**Core 0.1 · Donut revision 3 · 23 September 2026**

The current pool contains **180 deck cards: 108 Characters, 48 Actions, and 24 Items**. The six Leaders remain outside that count. This is the current playtest design, with unverified balance and no final print lock.

| Read or edit | Source |
| --- | --- |
| Entire roster, Costs, stats, Traits, and complexity | [Card list](card-list.md) |
| Eighteen printed Traits, counts, definitions, and support | [Traits](traits.md) |
| Explosive, Slowpoke, and the new Hothead test keyword | [Keywords](keywords.md) |
| Exact composition and complexity counts | [Content audit](audit.md) |
| What changed, why, and what to test | [Revision notes](revision-3-notes.md) |
| Playtest timing and core mechanics | [Rulebook](../rules/unhinged-rules.md) |
| Canonical card text and metadata | [cards.json](cards.json) |
| Canonical Trait and keyword definitions | [taxonomy.json](taxonomy.json) |

## The six Styles

| Style | Phrase alias | Leader | Deck cards | Identity |
| --- | --- | --- | --- | --- |
| [Gnarly](gnarly.md) | No Chill | Florida Man | 30 | Choose how far to push a dangerous play. |
| [Amped](amped.md) | High Turnover | Washed-Up Rock Star | 30 | Sequence a set, then decide who performs and who supports. |
| [Tricky](tricky.md) | Funny Business | Birthday Party Magician | 30 | Bluff, misdirect, and give the opponent consequential choices. |
| [Sketchy](sketchy.md) | Good Enough | Trash Baron | 30 | Turn questionable materials into functioning machinery. |
| [Spiteful](spiteful.md) | Find Out | HOA President | 30 | Prepare a defense and attach consequences to interaction. |
| [Wasted](wasted.md) | Red Shirts | Backyard Wrestler | 30 | Get value when a Character goes through the table. |

Each Style keeps **18 Characters / 8 Actions / 4 Items**. The two complete Style naming sets remain alternative presentation voices. These links use the single-word set consistently.

## Current pool design

- Human is removed from printed Traits and retained only as audit identity metadata.
- Eighteen concrete Traits have actual support references. Three-card groups are accepted under the soft 3% floor; no group exceeds the soft 15% ceiling in this revision.
- Characters now include **27 textless, 6 keyword-only, 18 on-play, 24 dedicated Rotate, 21 single ongoing, and 12 multiple-ability designs**.
- The 33 textless or keyword-only Characters have optional flavor lines. Flavor is not rules text.
- Eleven Items have Rotate activations, giving the Hacker and Item-Ready effects functional targets.
- Attack/Block triggers resolve before their damage checkpoint. Sacrifice, Dismiss, attachment references, temporary Guard, and delayed Returns have explicit handling.
- Stable deck-card IDs remain P001–P180. Revised identities are recorded in the revision notes; earlier versions remain in git history.

## Requested roster follow-up

Revision 3 incorporates the requested cast, adds Reply All and Tag Me In!, keeps Used Ham Sandwich, Grandma’s Cigarette Case, and Coupon Lady, and replaces HOA Pool Monitor with Neighborhood Lifeguard. See the [complete request-coverage table](revision-3-notes.md). Glory Days is an Action; Peaked in High School is a Character. Gym Bro is an alternate name for Gym Selfie Guy.

## Editing without drift

Edit `cards.json` and, when needed, `taxonomy.json`. Then run:

```bash
python3 production/cards/build.py
python3 production/cards/build.py --check
```

The script generates the six Style sheets, card list, Trait and keyword references, and audit. Do not hand-edit those generated sheets. It validates structure and consistency; it does not simulate matches or establish balance.

The [Alpha 0.03 pool](../../docs/card-pool/README.md) is historical data. The earlier Donut pool remains available at commit `5dcab3b`. Current card data lives here, not in the Alpha JSON.

## What still needs playtest work

The [six Leader identities](../../docs/leaders.md) are retained; exact Health and ability packages remain unfinished. No Response cards, Stack implementation, separate Junk Pile, or new card type is introduced here. Final Style presentation, physical Fuel, printed type naming, and production layouts remain in [open decisions](../rules/open-decisions.md).
