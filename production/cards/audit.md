# Donut Revision 4 — Content Audit

> Generated counts, not simulation results. No win rates or balance claims are inferred from this audit.

## Pool composition

| Style | Characters | Actions | Items | Total |
| --- | --- | --- | --- | --- |
| Reckless | 18 | 8 | 4 | 30 |
| Momentum | 18 | 8 | 4 | 30 |
| Misdirection | 18 | 8 | 4 | 30 |
| Salvage | 18 | 8 | 4 | 30 |
| Stonewall | 18 | 8 | 4 | 30 |
| Expendable | 18 | 8 | 4 | 30 |
| Total | 108 | 48 | 24 | 180 |

## Character complexity

These categories are mutually exclusive. Keyword-only cards are not textless. A Rotate ability plus another independent ability belongs in Multiple abilities. Several instructions within one enters-play ability remain one on-play ability. The single ongoing category includes a static ability or one triggered ability. Printed Rotate activations also occur on some Multiple-ability Characters.

| Category | Count | Percent | Reckless | Momentum | Misdirection | Salvage | Stonewall | Expendable |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Textless | 23 | 21.3% | 4 | 5 | 3 | 3 | 3 | 5 |
| Keyword only | 7 | 6.5% | 1 | 1 | 2 | 1 | 1 | 1 |
| On play | 18 | 16.7% | 3 | 3 | 3 | 3 | 3 | 3 |
| Rotate ability | 23 | 21.3% | 4 | 3 | 4 | 4 | 4 | 4 |
| Single ongoing ability | 21 | 19.4% | 4 | 3 | 3 | 3 | 5 | 3 |
| Multiple abilities | 16 | 14.8% | 2 | 3 | 3 | 4 | 2 | 2 |

## Character Cost curve

| Style | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Reckless | 2 | 5 | 4 | 3 | 3 | 1 | 0 |
| Momentum | 0 | 5 | 5 | 4 | 3 | 1 | 0 |
| Misdirection | 1 | 5 | 4 | 5 | 2 | 1 | 0 |
| Salvage | 1 | 5 | 5 | 3 | 3 | 1 | 0 |
| Stonewall | 0 | 5 | 4 | 4 | 4 | 1 | 0 |
| Expendable | 2 | 4 | 4 | 3 | 3 | 1 | 1 |

**11 of 24 Items have a Rotate activation.** Rotating, Readying, and disabling Items now has a real target population; passive Items still function while Rotated unless their text says otherwise.

P028 Roman Candle, P029 Hot Potato, P059 Portable Bluetooth Speaker, P087 Burner Phone, P088 Marked Deck, P090 Spoofed Keycard, P117 Duct Tape, P119 Mystery Drawer of Cables, P147 Security Camera, P179 Definitely Safe Helmet, P180 Button Marked DO NOT PRESS

## Automated checks

Stable IDs P001–P180, unique names, per-Style type mix, valid stats/Costs, registered Traits/keywords, support-card references, Character complexity metadata, retired wording in rules text, and generated-sheet freshness. Run `python3 production/cards/build.py --check`.

The validator does not prove card balance, complete natural-language rules correctness, or playable Leader packages. See [Current revision notes](revision-3-notes.md) for the roster follow-up and [the previous rules audit](revision-2-notes.md) for timing review and playtest priorities.
