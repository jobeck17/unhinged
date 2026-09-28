# Unhinged Current State — September 28, 2026

> **Current production checkpoint.** This supersedes the September 23 checkpoint for active design work. Historical files remain useful for rationale but do not override the production rulebook or rebuilt card pool.

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

## Next validation work

1. Build six 40-card mono-Style test decks from the rebuilt pool.
2. Validate package function before aggressive stat tuning.
3. Test all current Leader passives in actual games.
4. Run the controlled **first-player Draw vs. no first-player Draw** simulation with no other rules changed.
5. Test two-Style combinations for multiplicative package interactions.
6. Tune Costs, Power, Guard, and package density from evidence.
7. Revisit second Leaders only after the rebuilt packages show what each Style needs.

## Source hierarchy

For active work, use this order:

1. `production/rules/unhinged-rules.md`
2. `production/cards/cards.json` and `production/cards/taxonomy.json`
3. `production/rules/open-decisions.md`
4. this checkpoint
5. brainstorm/history material for rationale and future ideas

Older checkpoints, Mongo/Fuel material, and archived experiments do not override the current production files.
