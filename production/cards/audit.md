# Donut Revision 2 — Content Audit

> Generated counts, not simulation results. No win rates or balance claims are inferred from this audit.

## Pool composition

| Style | Characters | Actions | Items | Total |
| --- | --- | --- | --- | --- |
| Gnarly | 18 | 8 | 4 | 30 |
| Amped | 18 | 8 | 4 | 30 |
| Tricky | 18 | 8 | 4 | 30 |
| Sketchy | 18 | 8 | 4 | 30 |
| Spiteful | 18 | 8 | 4 | 30 |
| Wasted | 18 | 8 | 4 | 30 |
| Total | 108 | 48 | 24 | 180 |

## Character complexity

These categories are mutually exclusive. Keyword-only cards are not textless. A Rotate ability plus another independent ability belongs in Multiple abilities. Several instructions within one enters-play ability remain one on-play ability. The single ongoing category includes a static ability or one triggered ability. Printed Rotate activations also occur on some Multiple-ability Characters.

| Category | Count | Percent | Gnarly | Amped | Tricky | Sketchy | Spiteful | Wasted |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Textless | 27 | 25.0% | 4 | 5 | 4 | 5 | 4 | 5 |
| Keyword only | 6 | 5.6% | 1 | 1 | 1 | 1 | 1 | 1 |
| On play | 18 | 16.7% | 3 | 3 | 3 | 3 | 3 | 3 |
| Rotate ability | 24 | 22.2% | 4 | 4 | 4 | 4 | 4 | 4 |
| Single ongoing ability | 21 | 19.4% | 4 | 3 | 4 | 3 | 4 | 3 |
| Multiple abilities | 12 | 11.1% | 2 | 2 | 2 | 2 | 2 | 2 |

## Character Cost curve

| Style | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gnarly | 2 | 5 | 4 | 3 | 3 | 1 | 0 |
| Amped | 0 | 5 | 5 | 4 | 3 | 1 | 0 |
| Tricky | 1 | 5 | 4 | 5 | 2 | 1 | 0 |
| Sketchy | 1 | 5 | 5 | 3 | 3 | 1 | 0 |
| Spiteful | 0 | 5 | 4 | 4 | 4 | 1 | 0 |
| Wasted | 2 | 4 | 4 | 3 | 3 | 1 | 1 |

**11 of 24 Items have a Rotate activation.** Rotating, Readying, and disabling Items now has a real target population; passive Items still function while Rotated unless their text says otherwise.

P028 Roman Candle, P029 Cooler Full of Bad Ideas, P059 Portable Bluetooth Speaker, P087 Burner Phone, P088 Marked Deck, P090 Spoofed Keycard, P117 Duct Tape, P119 Mystery Drawer of Cables, P147 Security Camera, P179 Definitely Safe Helmet, P180 Button Marked DO NOT PRESS

## Automated checks

Stable IDs P001–P180, unique names, per-Style type mix, valid stats/Costs, registered Traits/keywords, support-card references, Character complexity metadata, retired wording in rules text, and generated-sheet freshness. Run `python3 production/cards/build.py --check`.

The validator does not prove card balance, complete natural-language rules correctness, or playable Leader packages. See [Revision notes](revision-2-notes.md) for manual timing review and playtest priorities.
