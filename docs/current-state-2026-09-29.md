# Unhinged Current State — September 29, 2026

> **Current production checkpoint.** This supersedes the September 28 checkpoint for active design work. Historical files remain useful for rationale but do not override the production rulebook or rebuilt card pool.

## Production baseline

- **180 deck cards**, 30 per Style.
- **109 Characters / 48 Actions / 23 Items**.
- One Leader outside the 40-card deck.
- Deck may use the Leader's Style plus up to one additional Style. Mono-Style is legal.
- Up to **4 copies** of a card.
- No required Character / Action / Item ratios.
- No base board-size, Item-count, Stash-size, or hand-size limits.
- Leaders begin at **25 Health**.
- Same War winner goes first each Round.
- Full player Turns: **Ready -> Draw -> main Turn**.
- The War winner **skips the Draw step of their first Turn**.
- After mulligans, the second player may put the top card of their deck face up and Rotated into Stash as optional temporary Stash. It Readies normally on their first Turn and goes to discard when spent.
- Stash replaces Fuel. One normal Stash opportunity per Round.
- Characters may Block on the Turn they enter but may not Attack until their controller's next Turn unless Hothead or card text says otherwise.
- Leader attacks allow one Blocker. Surviving Blockers retaliate; Defiant and Slowpoke modify retaliation.
- Excess damage through a Blocker overflows to the Leader.
- No defensive discard-for-Guard rule.
- Actions resolve immediately, then go to discard.
- Responses are Actions with printed off-turn timing. One Response total per qualifying event; non-active player gets first opportunity.
- Traits have no inherent rules meaning.

## Current Styles and packages

| Style | Broad identity | Starting packages |
| --- | --- | --- |
| Reckless | Damage + risk | Damage Everywhere; Self-Damage / Damaged Characters |
| Momentum | Growth + acceleration | Chain / Acceleration; Low Hand |
| Misdirection | Movement + deception | Bounce / Return; Manipulation / Deception |
| Salvage | Reuse + scavenging | Items / Jerry-Rig / Repurpose; Scrounge / Big Hand |
| Stonewall | Denial + reaction | Freeze / Stall; Reaction / Denial |
| Expendable | Sacrifice + recursion | Sacrifice / Defeat Value; Recursion / Refuse to Stay Dead |

Two packages per Style is a guideline, not a hard law. Every package must function inside its own Style. Two-Style deckbuilding should create unexpected combinations rather than finish incomplete mono-Style engines.

## Current Leaders

| Leader | Style | Package lean | Current passive |
| --- | --- | --- | --- |
| Florida Man | Reckless | Self-Damage | Your damaged Characters have Hothead and Sucker Punch. |
| Washed-Up Rock Star | Momentum | Low Hand / Refill | **Comeback Tour:** At the end of your Turn, if you have no cards in hand, Draw 3 cards. |
| Birthday Party Magician | Misdirection | Bounce / Return | **Ace Up My Sleeve:** Once during your Turn, when one of your Characters is Returned from play to your hand, Ready 1 Stash. |
| Trash Baron | Salvage | Repurpose / Stash | You may use opposing Ready Stash to pay your Costs as though it were your own. |
| HOA President | Stonewall | Freeze / Stall | **Failure to Respond:** Beginning in Round 8, opposing Characters cannot Block your Attacks. |
| Backyard Wrestler | Expendable | Sacrifice / Tag | At the end of your opponent's Turn, you may Return one damaged Character; if you do, free-play another Character from hand with the same Cost or less. |

Leader design goal: one visible passive that bends a basic rule, changes overall playstyle, and gives the opponent something meaningful to play around.

## Current keywords

Active rebuild vocabulary:

- **Hothead** — may Attack on the Turn it enters play.
- **Defiant** — retaliates when Blocking even if incoming damage Defeats it.
- **Explosive** — when Defeated, deal 1 damage to each opposing Character.
- **Slowpoke** — does not retaliate when Blocking.
- **Sucker Punch** — may Attack Ready opposing Characters. Working name.
- **Jerry-Rig** — an Item headed to discard may instead become face-up Rotated temporary Stash; discard it when spent.
- **Chicken** — when attacked, may Return itself to hand.
- **Stubborn** — first Return or Dismiss each Round fails.
- **Bodyguard** — may be attacked while Ready and must Block Leader attacks while Ready if able. Working name.

Shelved for the starting rebuild: **Sneaky, Cloak, Stack, Step Aside, Overkill**.

## Damage distinction

- **Deal damage** creates a damage event and may trigger damage-based abilities.
- **Put damage** adds damage without creating a damage-dealt event.
- Either can Defeat a Character when accumulated damage reaches Guard.

This distinction remains intentional design space, but the current Birthday Party Magician passive no longer uses put damage.

## Card-design rules

- Most Character abilities should be static, triggered, or On Play.
- Character Rotate abilities should be rare. The September 28 pool currently has **zero**.
- Must-answer board-presence Characters are intentional so direct Character attacks matter.
- Some marquee cards may combine an On Play effect with persistent text.
- Traits are inert until referenced.
- Trait-support cards should remain useful without the Trait payoff.
- Internal per-Style target: **2 Best / 4 Better / 6 Good / 18 Simple-support**.
- Actions are normally immediate one-shot effects.
- Items and Characters carry most persistent engines.
- The pool is no longer locked to 18 Characters / 8 Actions / 4 Items per Style.

## September 28 card rebuild

All 180 legacy slots were reviewed under **Keep / Rehome / Rewrite / Replace** and then rebuilt in `production/cards/cards.json`.

Notable production changes include:

- **Amateur Electrician** as a damaged-state Reckless payoff.
- **School Bully** with Chicken and must-answer board presence.
- **Lady Who's Moving Out Again** as an enter/Return tempo payoff.
- **Hoarder** for Salvage Big Hand.
- **Guy Fixing His Trans Am** as a Jerry-Rig/Item build-around.
- **Reset the Vibes** as Momentum's symmetrical hand reset.
- **Cash In the Clutter** as Salvage unused-Stash card flow.
- Coupon Lady moved to Momentum.
- Neighborhood Group Admin and Terms and Conditions moved to Stonewall.
- Social Media Influencer moved to Misdirection.
- I Want to Speak to Your Manager moved to Misdirection.
- Four current Response tests: Send It!, Look Over There!, Absolutely Not, Take One for the Team.
- Jerry-Rig is printed on all four current Salvage Items.

The source and taxonomy versions are **0.2-donut-rebuild**.

## Revision 6 tuning checkpoint

A 30,000-game heuristic round robin after the card-flow/low-end pass averaged **8.64 Rounds** (median 8) and a **60.07% first-player win rate**. Game length improved dramatically without changing 25 Health. See `production/playtests/six-deck-lab/snapshot-revision-6-card-flow.md` for the full snapshot.

Current priorities are Salvage efficiency, Misdirection physical-play validation, and continued first-player monitoring. Rock Star uses Comeback Tour, Magician uses Ace Up My Sleeve, and HOA uses Failure to Respond.

## Revision 7 targeted tuning

The current card pool is now **revision 7**. This pass intentionally leaves core rules and the settled Leader identities alone while tuning three problem areas:

- Misdirection bounce targets gained survivability and one Sucker Punch/Chicken combat tool.
- Expendable lost some cheap standalone efficiency without changing Backyard Wrestler's passive.
- Salvage lost stacked card/economy value around Jerry-Rig while Trash Baron's opposing-unused-Stash identity remains intact.

A new evasion/opposed-access mechanic is being held in the mechanic bank until this balance round is complete.

## Revision 7 turn-order simulation

A matched 30,000-game round robin using revision-7 cards and **Ace Up My Sleeve** produced:

- **65.06%** first-player wins with no second-player setup bonus.
- **54.98%** first-player wins when the second player always took the temporary setup Stash.
- Average game length remained essentially unchanged in the same harness: **14.83 -> 14.80 Rounds**.
- Magician with Ace Up My Sleeve reached **27.6%** in the heuristic model versus **21.3%** with the former Draw-on-Return passive under the same temporary-Stash condition.
- Magician deck-out fell from **26.9%** with Draw-on-Return to **10.48%** with Ace Up My Sleeve.
- Expendable fell substantially from the previous hot baseline after the revision-7 card changes, landing at **55.6%** in this harness.
- Rock Star and Trash Baron remain the clearest hot decks for minor tuning.
- Exact deck win rates remain simulator-sensitive, especially for Misdirection; human play is authoritative for feel and sequencing.

See `production/playtests/six-deck-lab/snapshot-revision-7-turn-order.md`.

## Revision 8 Jerry-Rig tuning

Trash Baron remains unchanged. Jerry-Rig density is reduced from four Salvage Items to two:

- Duct Tape and Mystery Drawer of Cables retain Jerry-Rig.
- Zip Ties and Used Ham Sandwich lose Jerry-Rig.

This specifically targets Salvage's excess economy rather than the Leader's opposing-unused-Stash identity.

## Revision 9 Misdirection pressure pass

Misdirection receives two targeted pressure tools:

- **Trapdoor Assistant** — 3-Cost 1/1 Magician; on entry may Return an opposing Character costing 3 or less.
- **Poof!** — 2-Cost Action; makes one Leader Attack unblockable, then Returns that attacker to hand after the Attack.

The mono-Misdirection baseline replaces Tech Bro and two Marked Deck copies with these tools. The purpose is to test whether Magician's low win rate comes from failing to convert Bounce into Leader pressure rather than from insufficient card advantage.

## Revision 10 Magician rollback

The revision-9 Trapdoor Assistant / Poof! pressure experiment is rolled back after targeted simulations failed to improve Magician's results. Magician is restored exactly to its revision-8 card pool/list for a deeper telemetry pass.

Revision-8 Jerry-Rig tuning and the second-player temporary-Stash rule remain active.

## Revision 10 telemetry correction

A corrected 30,000-game full-telemetry round robin found and fixed a winner-index truthiness bug in the older heuristic harness. Earlier exact win-rate and first-player numbers should be treated as historical, not authoritative.

Corrected revision-10 baseline:
- **46.79% first-player wins** with the current second-player temporary-Stash rule.
- **8.38 average Rounds**, **8 median**.
- Magician: **32.20%** model win rate, **4.27 extra Draws/game**, **2.67 own Returns/game**, but only **0.08 opposing Returns/game** and **9.90 Leader damage/game**.
- Full telemetry is in `production/playtests/six-deck-lab/snapshot-revision-10-full-telemetry.{md,json}`.

## Revision 11 Magician pressure correction

**School Bully (P067)** gains **Hothead** and now reads:

> **Hothead. Sucker Punch. Chicken.**

This is the only production card-text change from revision 10. The corrected one-variable 30,000-game A/B moved Magician from **32.20% to 45.90%**, attacks from **6.96 to 8.85/game**, and Leader damage from **9.90 to 13.19/game** without materially increasing extra Draws or Ace triggers.

## Revision 11 corrected mono-Style baseline

- First-player win rate: **47.11%**
- Average game length: **8.49 Rounds**
- Median game length: **8 Rounds**
- Censored games: **0**

| Leader | Win rate | Avg Rounds | Attacks | Leader damage | Extra Draw | Deck-out |
| --- | --- | --- | --- | --- | --- | --- |
| Florida Man | 52.91% | 8.55 | 10.16 | 15.89 | 1.45 | 0.02% |
| Washed-Up Rock Star | 70.91% | 8.11 | 11.44 | 19.60 | 10.07 | 8.26% |
| Birthday Party Magician | 45.90% | 9.06 | 8.85 | 13.19 | 4.28 | 1.47% |
| Trash Baron | 61.72% | 8.46 | 10.97 | 17.91 | 2.31 | 0.09% |
| HOA President | 24.04% | 8.09 | 5.41 | 8.16 | 1.85 | 0.19% |
| Backyard Wrestler | 44.52% | 8.65 | 9.81 | 13.14 | 1.65 | 0.06% |


### Head-to-head matrix

Each cell is the row deck's win rate against the column deck.

| Deck | Florida | Rock Star | Magician | Trash | HOA | Wrestler |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **Florida** | — | 37.5% | 41.4% | 43.3% | 78.2% | 64.3% |
| **Rock Star** | 62.5% | — | 84.0% | 47.2% | 93.0% | 67.9% |
| **Magician** | 58.6% | 16.1% | — | 39.0% | 72.2% | 43.8% |
| **Trash** | 56.8% | 52.8% | 61.0% | — | 77.2% | 60.9% |
| **HOA** | 21.9% | 7.0% | 27.9% | 22.9% | — | 40.6% |
| **Wrestler** | 35.8% | 32.1% | 56.3% | 39.1% | 59.4% | — |


### Current matchup read

- Rock Star is broadly strong across the field, not merely a Magician counter. Trash Baron is its one losing matchup.
- Trash Baron is also broadly strong and currently has no losing matchup except Rock Star.
- Magician now has a strong counter profile: strong into HOA, favored into Florida, near-even but unfavored into Wrestler, unfavored into Trash, and extremely weak into Rock Star.
- HOA is broadly weak in the current heuristic field and needs diagnosis beyond its Magician matchup.
- These are simulation signals, not final balance verdicts. Human testing should determine whether the matchup texture is fun and whether broad outliers need tuning.

Full telemetry:
- `production/playtests/six-deck-lab/snapshot-revision-11-full-telemetry.md`
- `production/playtests/six-deck-lab/snapshot-revision-11-full-telemetry.json`

## Next validation work

1. Human-test School Bully with Hothead.
2. Diagnose Rock Star's broad strength without erasing its favorable Magician matchup.
3. Diagnose Trash Baron's broad strength after the Jerry-Rig reduction.
4. Diagnose HOA's broad weakness while preserving Stonewall's identity.
5. Re-run proposed tuning as isolated paired A/B experiments.
6. Test two-Style combinations only after the mono-Style field is healthier.

## Source hierarchy

For active work, use this order:

1. `production/rules/unhinged-rules.md`
2. `production/cards/cards.json` and `production/cards/taxonomy.json`
3. `production/rules/open-decisions.md`
4. this checkpoint
5. brainstorm/history material for rationale and future ideas

Older checkpoints, Mongo/Fuel material, and archived experiments do not override the current production files.
