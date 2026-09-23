# Production Cards

This directory is now the working home for the **current production card pool**.

The Alpha 0.03 pool in [`docs/card-pool/`](../../docs/card-pool/README.md) remains legacy test data. Do not copy its text into current production cards.

## Production Pool v0.1

The first ground-up production rewrite contains **180 deck cards**, built against the current production rules and current six-Style Leader direction.

| Style | Phrase alias | Cards | File |
| --- | --- | ---: | --- |
| Gnarly | No Chill | 30 | [gnarly.md](gnarly.md) |
| Amped | High Turnover | 30 | [amped.md](amped.md) |
| Tricky | Funny Business | 30 | [tricky.md](tricky.md) |
| Sketchy | Good Enough | 30 | [sketchy.md](sketchy.md) |
| Spiteful | Find Out | 30 | [spiteful.md](spiteful.md) |
| Wasted | Red Shirts | 30 | [wasted.md](wasted.md) |
| **Total** |  | **180** |  |

### Pool composition

- **108 Characters**
- **48 Actions**
- **24 Items**
- 18 Characters, 8 Actions, and 4 Items per Style for this first controlled test pool
- Costs intentionally span the full 1→7 Fuel progression
- No Response Actions are included yet; Response chaining/timing remains an open production decision
- No Junk Pile dependency
- No Command/Stamina costs
- No legacy Exhaust/Deploy/dies terminology
- No invisible Leader-only rule required for a secondary Style to function

## Current Leader cast

Leader identities and Style homes are maintained in [`docs/leaders.md`](../../docs/leaders.md):

- Florida Man — Gnarly / No Chill
- Washed-Up Rock Star — Amped / High Turnover
- Birthday Party Magician — Tricky / Funny Business
- Trash Baron — Sketchy / Good Enough
- HOA President — Spiteful / Find Out
- Backyard Wrestler — Wasted / Red Shirts

Leader identities are committed direction; exact Health and abilities remain playtest work.

## Vocabulary status

This pool uses **Character** as the working public card type because it is the strongly favored production direction. The current rulebook still uses Unit while that final terminology decision is formally open. If Unit is retained, update this pool deliberately rather than by blind replacement.

Both complete Style naming sets remain visible during design. Do not mix individual names across the two sets.

## Design intent by Style

- **Gnarly / No Chill:** risk, self-damage, overcommitment, dangerous payoff. Not generic aggro.
- **Amped / High Turnover:** sequencing and momentum across a Round. Not static tribal math.
- **Tricky / Funny Business:** opponent choices, misdirection, bounce, bluffing, and playful redirection. Not hard denial.
- **Sketchy / Good Enough:** Items, discard, scavenging, and repurposing. Not a private Leader-created zone.
- **Spiteful / Find Out:** blocking, survival, retaliation, and consequences for interaction. Not a hard lock.
- **Wasted / Red Shirts:** Defeat and Sacrifice as value, with backyard wrestling, stunt failure, and the Undead package carrying the fiction.

## Identity notes carried into v0.1

Recent card-identity work is reflected in this pool, including:

- Social Media Influencer
- Single Dad
- Roll Call
- Script Kiddie
- Terms and Conditions
- Default Password
- Raccoon of Unusual Size
- Cat Lady
- **'Tis But a Scratch**
- **Grandma's Cigarette Case**
- **Used Ham Sandwich**
- **Bath Salts** in the Undead / Wasted package

Several weaker legacy identities were intentionally not preserved. Their old IDs remain available in the Alpha files as history.

## Production status

These cards are **playtest designs, not approved final print text**. The next pass should:

1. run a rules/templating audit against `production/rules/unhinged-rules.md`;
2. identify cards that still rely on ambiguous trigger timing;
3. build one or more 40-card test decks for each Leader + secondary Style combination;
4. simulate and physically playtest the new cost/stat curves;
5. tune duplicated effects and weak decision points;
6. revisit Responses only after the Response rule is locked;
7. promote approved cards into machine-readable production data after the text stabilizes.

A production card should eventually record stable card ID, set/season number, title/subtitle where applicable, type, Cost, Style, Traits, rules text, Power/Guard for Characters, and templating/accessibility status.
