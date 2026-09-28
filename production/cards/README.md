# Unhinged — Donut Card Workshop

**Core 0.2 · Donut revision 5 · 28 September 2026**

The current pool contains **180 deck cards: 109 Characters, 48 Actions, and 23 Items**. The six Leaders remain outside that count. This is the rebuilt playtest pool under the September 28 rules; balance is unverified.

| Read or edit | Source |
| --- | --- |
| Entire roster, Costs, stats, Traits, and complexity | [Card list](card-list.md) |
| Trait counts, definitions, and support | [Traits](traits.md) |
| Current rebuild keywords | [Keywords](keywords.md) |
| Exact composition and complexity counts | [Content audit](audit.md) |
| Historical Keep / Rehome / Rewrite / Replace rationale | [Rebuild audit](rebuild-audit-2026-09-27.md) |
| Playtest timing and core mechanics | [Rulebook](../rules/unhinged-rules.md) |
| Canonical card text and metadata | [cards.json](cards.json) |
| Canonical Trait and keyword definitions | [taxonomy.json](taxonomy.json) |

## The six Styles

| Style | Phrase alias | Leader | Starting packages |
| --- | --- | --- | --- |
| [Reckless](reckless.md) | No Chill | Florida Man | Damage Everywhere; Self-Damage / Damaged Characters |
| [Momentum](momentum.md) | High Turnover | Washed-Up Rock Star | Chain / Acceleration; Low Hand |
| [Misdirection](misdirection.md) | Funny Business | Birthday Party Magician | Bounce / Return; Manipulation / Deception |
| [Salvage](salvage.md) | Good Enough | Trash Baron | Items / Jerry-Rig / Repurpose; Scrounge / Big Hand |
| [Stonewall](stonewall.md) | Find Out | HOA President | Freeze / Stall; Reaction / Denial |
| [Expendable](expendable.md) | Red Shirts | Backyard Wrestler | Sacrifice / Defeat Value; Recursion / Refuse to Stay Dead |

Each Style has exactly **30 cards**, but there is no hard Character / Action / Item ratio.

## Current rebuild principles

- Stable card IDs remain P001–P180.
- Traits have no automatic behavior.
- Internal per-Style target is **2 Best / 4 Better / 6 Good / 18 Simple-support**.
- Most Character abilities are static, triggered, or On Play.
- The current rebuilt pool has **zero Character Rotate abilities**.
- Actions generally resolve immediately and go to discard.
- Persistent engines usually live on Characters or Items.
- Package cards should remain useful without perfect synergy.
- Every major package must function in mono-Style deckbuilding.
- Two-Style decks should create interesting combinations rather than complete incomplete mono-Style engines.

## Current keywords

Active rebuild keywords:

- Hothead
- Defiant
- Explosive
- Slowpoke
- Sucker Punch, working name
- Jerry-Rig
- Chicken
- Stubborn
- Bodyguard, working name

Shelved for the starting rebuild: Sneaky, Cloak, Stack, Step Aside, Overkill.

Jerry-Rig is currently printed on all four Salvage Items.

## Notable September 28 rebuilds

- Amateur Electrician anchors damaged-state Reckless play.
- School Bully introduces Chicken on a must-answer Character.
- Lady Who's Moving Out Again rewards damaged Bounce.
- Hoarder anchors Salvage Big Hand.
- Guy Fixing His Trans Am anchors Jerry-Rig/Item payoff.
- Reset the Vibes gives Momentum a symmetrical hand reset.
- Cash In the Clutter converts unused Stash into card flow.
- Coupon Lady moved to Momentum.
- Neighborhood Group Admin and Terms and Conditions moved to Stonewall.
- Social Media Influencer and I Want to Speak to Your Manager moved to Misdirection.
- Four current Response tests exist: Send It!, Look Over There!, Absolutely Not, and Take One for the Team.

## Editing without drift

Edit `cards.json` and, when needed, `taxonomy.json`. Then run:

```bash
python3 production/cards/build.py
python3 production/cards/build.py --check
```

The script generates the six Style sheets, card list, Trait and keyword references, and audit. Do not hand-edit those generated sheets.

## Next playtest work

1. Build six 40-card mono-Style test decks.
2. Validate package function before aggressive stat tuning.
3. Test all six current Leader passives.
4. Run the controlled first-player Draw versus no-first-Draw simulation with no other rule changes.
5. Test two-Style combinations for multiplicative package interactions.

See the [September 28 checkpoint](../../docs/current-state-2026-09-28.md) for the full current state.
