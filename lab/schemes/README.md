# Scheme Lab 0.1 — the proposed next direction for Unhinged

**State: TESTING.** Built October 3, 2026 against main `117bf213170a37b12b1bd48696402a27d1faeaf6`. This is a complete, isolated prototype with eight 40-card decks and 71 supported card definitions, including two tokens. It is not a promotion to Carl or a claim that human fun or final balance has been established.

[Play the Scheme Lab](https://jobeck17.github.io/unhinged/lab/schemes/). Bot and local two-player modes use the same engine as the tests and simulations.

## Direction

Unhinged should be a Character-first game about a ridiculous Leader and an interruptible plan. A Character can attack, remain Ready to protect its Leader, or work toward a visible Scheme. Those jobs compete for the same readiness. Winning still means reducing the opposing Leader to 0 Health.

The two essential structural changes are **simultaneous combat damage** and **one exposed worker per player per Turn**. Swarms remain desirable for Cat Lady; they do not multiply Scheme progress. A smaller board should have access to trades, Responses, removal, and a payoff that is not proportional to Character count.

A Scheme is one three-step, once-per-game payoff printed beside the Leader. It is not a second victory score, a new card type in the deck, a repeatable source of free resources, or an additional action-point system.

## Exact rules

### Setup, resources, and Turns

- Bring one of the eight 40-card LAB decks. Leaders have 25 Health. Four-copy limit except Cat Lady's ten Stray Cats. Universal cards can be included by any Leader; Unassigned is only for the two experimental Leader packages.
- Determine first player randomly. The automated comparison forces equal starting orders.
- Draw seven. Mulligan any number: set chosen cards aside, draw replacements, shuffle the set-aside cards back. Each player mulligans once.
- After mulligans, the second player puts the top card of their deck into a Rotated, one-use temporary Stash. Scientist gets no temporary Stash.
- The same player goes first in every Round. Each Round is one full Turn per player. First player skips their first normal draw.
- Start your Turn: score surviving work; Ready Characters and Items (except a frozen card skips this Ready); Ready Stash; draw one; resolve a just-completed Scheme before taking main-Turn actions. Drawing from an empty deck causes a loss after the current resolution.
- Once during your Turn, put any hand card into Stash. It enters Ready and pays 1 when Rotated. Card identity is hidden while in Stash. There is no automatic Stash growth. Temporary Stash is discarded when used; this aid spends temporary Stash first.
- Full Turns remain: play, attack, use Item abilities, and work in the order you choose, subject to eligibility and costs. There is no additional action budget, board limit, or attack cap.
- Characters enter Ready and can Block immediately. Normally, they cannot Attack or Work until their controller's next Turn. Items can use their Rotate ability immediately.
- Effects marked this Turn end at the end of either player's Turn. Damage persists. A card leaving play and returning is a fresh instance.

### Combat

- Rotate one eligible Character to attack the opposing Leader or an opposing Rotated Character.
- A Leader attack may be Blocked by one Ready Character. Blocking Rotates it. Direct Character attacks cannot be Blocked.
- **Both combatants deal damage simultaneously**, even if one or both are defeated. Remove all simultaneous casualties before resolving defeat effects. The active player's simultaneous defeat effects resolve first.
- Excess attack Power beyond a Blocker's remaining Guard damages its Leader. Direct Character attacks never overflow. Calculate this excess before damage prevention; a shield does not increase Guard.
- If the attacker leaves play before combat damage, the attack ends. If a direct target leaves play, the attack ends. If a declared Blocker leaves play, the attack remains blocked and deals no combat damage. This explicit rule avoids surprise free Leader hits after a Response.
- Sacrifice counts as Defeat. Return goes to hand; Dismiss goes to discard without defeat effects. Tokens cease to exist when leaving play.
- Bodyguard must Block a Leader attack if able and may be directly attacked while Ready. When several are Ready, choose one.
- Sucker Punch can attack Ready Characters. Hothead can attack on entry; it cannot Work on entry.
- Stubborn prevents the first Return or Dismiss affecting that Character each Round; it does not prevent lethal damage or Sacrifice.
- Explosive deals 1 damage simultaneously to every opposing Character when defeated.
- Slowpoke deals no combat damage when Blocking. It still deals damage when attacked directly.
- Defiant is absent from this pool: the core already allows defeated defenders to deal simultaneous damage.

### One Response opportunity per combat

After the attack target and any Blocker are chosen, the non-active player may play one eligible Response. If they pass, the active player may play one. Then damage resolves. No Response can answer another Response.

Responses use Ready Stash. The current two Response cards can also be played as Actions on your Turn. During combat they must target a combatant. There are no unrestricted priority chains or responses to other card types in this prototype.

### Work and Schemes

- Once during your Turn, spend 1 Ready Stash and Rotate a Ready Character that began the Turn under your control.
- Mark that Character as your worker. It cannot Attack or Block while working. It is an exposed, Rotated Character that the opponent can attack directly.
- If it remains under your control in play until the start of your next Turn, gain 1 Scheme progress. Clear the worker marker, then it Readies normally unless frozen.
- If the worker leaves play, the pending job fails. Returning and replaying it does not rescue the job. Progress earned on earlier Turns stays.
- A frozen worker still earns progress if it survives; freezing does not remove it. It then skips Ready as normal.
- At 3 progress, complete your Scheme. Resolve its payoff after the Ready/Draw sequence and before normal actions. Each Scheme resolves once per game.
- No combination of additional bodies, extra Ready effects, or multiple payment sources grants a second job in a Turn.
- There are no direct progress-stealing cards. Ordinary Character interaction interrupts work, and Leader pressure punishes taking a defender out of service.

### Finish

Finish the current card/ability/combat and resulting triggers before checking defeat. If both Leaders are defeated together, War compares shuffled available deck/discard cards by printed Cost until unequal; if no comparison breaks the tie, use a random tiebreaker. Deck-out is a safety condition, not a supported archetype.

## The eight Leaders

Printed LAB data in `DECKS.json` is authoritative for this experiment.

| Leader | Passive direction | Scheme payoff |
|---|---|---|
| Florida Man | First own-card/ability damage survivor on your Turn gets +1 Power for that Turn; no automatic re-ready chain | 4 Leader damage plus 2 damage to each enemy Character |
| Rock Star | Playing a second card draws a card if your hand has at most two | Draw 3 and Ready 2 spent Stash |
| Magician | First friendly Return on your Turn Readies 1 Stash | Return up to two opposing Characters and draw 2 |
| Trash Baron | First Item on your Turn costs 1 less; opponent's response resources remain theirs | Recover an Item into play and draw 2 |
| HOA President | First Block each Turn prevents 1 damage to that Blocker; no automatic Round-8 unblockability | 8 Leader damage |
| Wrestler | Once-per-own-Turn native-Style Tag Out, scaled to Stash count | Recover a Character costing up to 4 with Hothead |
| Cat Lady | Ten Stray Cats; first Cat each Turn costs 1 less while three Cats are present | Three 1/1 Cat tokens and draw 2 |
| Scientist | Start with five battery Stash; no growth; Ready at most three per Turn | Refill the battery and optionally set one Abomination stat to 6 |

For simultaneous eligible Florida damage survivors, this prototype applies its once-per-Turn bonus in entry order.

Scientist intentionally differs from the older one-recharge battery. In the first new-pool screen, that model failed badly. Its current It's Alive! costs 2 plus two Character cards. Power and Guard are rolled separately, followed by one optional reroll of either die. A targeted search Character helps it find the experiment. These are LAB hypotheses, not changes to the older Scientist prototype.

Cat Lady's 1-cost Stray is now 1/2; the Scheme's free tokens remain 1/1. Its discount disappears below three Cats, avoiding permanent resource advantage that survives dismantling the colony.

## Shared interaction and deck construction

Every deck contains two Clear the Room (5 Cost, deal 3 to every Character), three single-target answers, and three Responses. Most single-target answers are Return; Trash Baron instead has Item destruction plus draw. Character effects add other removal, protection, and engine interactions. Swarm, tall threats, and Items therefore have different vulnerabilities.

This is an intentional starter environment for testing the core. It does not certify the existing 180 cards or arbitrary dual-Style lists. The old builder remains a Carl builder and does not accept this LAB pool.

## Validation and interpretation

- `node lab/schemes/test.mjs`: core-rule regression tests and all-Leader smoke games.
- `GAMES_PER_MATCHUP=100 node lab/schemes/simulate.mjs`: 28 unordered matchups × 100 games × four variants = 11,200 games. Starting orders and initial seeds are paired. Results go to `results.json` with file hashes.
- Four variants use this exact same compact pool: no retaliation, surviving-defender retaliation, simultaneous damage, and simultaneous damage plus Schemes. They do **not** reproduce canonical Carl or the earlier patched browser LAB.
- The bot uses its own hand and public board only. It scores blocks, trades, exposed workers, removal, response timing, and resource spending. It is a heuristic, not optimal play.
- Simulations check 40-card conservation after every action, including search choices, temporary Stash, fusion costs, and tokens.
- Round-3 board-lead results are correlations. Deck identity, resource investment, and card quality confound body count; do not call them causal evidence that a rule fixes snowballing.
- A 60-Round cap and 2,000-command cap expose non-terminating games. Report censored games and deck-outs explicitly.
- Tuning used small exploratory samples. The recorded main run uses a different seed base. Do not keep retuning against that verification sample until its headline percentages look attractive.

## Recorded verification result

After the final targeted pass, a fresh paired seed schedule (base 91003000) produced:

| Variant | Games | Mean Rounds | First-player wins | Deck-outs | Censored |
|---|---:|---:|---:|---:|---:|
| none | 2,800 | 9.25 | 50.1% | 7 | 0 |
| survivor | 2,800 | 10.84 | 49.3% | 6 | 0 |
| simultaneous | 2,800 | 11.64 | 46.5% | 37 | 0 |
| schemes | 2,800 | 11.81 | 47.8% | 38 | 0 |

Full proposal, 700 games per Leader across seven opponents:

| Leader | Wins |
|---|---:|
| Florida Man | 56.6% |
| Washed-Up Rock Star | 61.7% |
| Birthday Party Magician | 44.1% |
| Trash Baron | 40.0% |
| HOA President | 50.3% |
| Backyard Wrestler | 50.1% |
| Crazy Cat Lady | 44.1% |
| Mad Scientist | 53.0% |

The full proposal recorded 12,428 work attempts, 4,375 interrupted jobs, 1,951 completed Schemes, and 1,948 Responses across 2,800 games. Not every attempted job resolves before a match ends. These counts demonstrate exercised mechanics, not that each decision was enjoyable.

The bot won with a two-or-more-Character lead entering Round 4 in 83.7% of qualifying no-retaliation games (1,511 observations), versus 52.6% with the full proposal (757 observations). This is a confounded diagnostic: the no-retaliation Scientist is especially dominant, and populations differ. The simultaneous-only value was 56.4%; this run does not establish a separate causal anti-snowball effect from Schemes.

**Remaining balance signals:** Rock Star is still high at 61.7%; Trash Baron is low at 40.0%. Magician and Cat Lady improved to 44.1%. Do not call the field balanced. At 700 games per Leader, simple binomial sampling uncertainty alone is about ±3–4 percentage points near 50%, and AI/model error is additional. Human testing should determine whether Rock's chaining is too efficient and whether Baron's Item package needs a stronger purpose. Do not add blanket stat buffs or keep retuning the same verification sample.

### What has to be true before promotion

Use ten human games with starting positions swapped, including Cat Lady versus HOA and Scientist versus Magician. Ask both players independently after each game:

1. Did you make at least two meaningful choices among attacking, protecting, and working?
2. Did a Scheme change an opponent's choice before it resolved?
3. Could a player with fewer Characters recover through trades, interaction, or a Scheme?
4. Did each player get a memorable payoff or a meaningful attempt to stop one?
5. Would both players voluntarily play another match?

Aim for roughly 8–12 Rounds and 20–30 minutes, with low bookkeeping. Those are design targets, not measured human results. An occasional long game is acceptable; routinely winning through deck-out is not.

Rework Schemes if they become a mandatory opening script, if the weakest spare Character always works without a tradeoff, if the same player always controls both combat and Scheme progress, or if three-step tracking costs more attention than the payoff earns. Rework simultaneous combat if it creates persistent mutual pass/stall states.

## Implementation discipline

`CARDS.json`, `DECKS.json`, and `engine.mjs` define this isolated experiment. `app.mjs` and `simulate.mjs` both import that engine. All 71 definitions have supported effects; unsupported old cards are not silently imported. `results.json` is a reproducible checkpoint, not another canonical source.

Only after the human gate should the successful framework be promoted together into root RULES/CARDS/DECKS, the production browser, builder, and simulation documentation. That architectural promotion would warrant 0.4 and a new DCC character codename. Do not declare the old 180-card pool balanced under these rules by association.
