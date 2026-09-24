# Donut duel experiment

Focused, standard-library Python harness for the [Florida Man / HOA President test decks](../../production/playtests/florida-vs-hoa/decks.md). It reads current production card data and rejects unregistered cards. It does not reuse Mongo or the Alpha simulator. This is an **exploratory heuristic matchup**, not evidence of competitive balance or human win rates.

## Run

From the repository root:

```sh
python3 -m unittest discover -s prototypes/donut-duel -v
python3 prototypes/donut-duel/simulate.py --games 8 --output activation-charge-cautious.json
python3 prototypes/donut-duel/simulate.py --games 8 --aggression 1.5 --output activation-charge.json
python3 prototypes/donut-duel/analyze.py
```

Files are written to `production/playtests/florida-vs-hoa/`. Seed defaults to 240926. Paired games share an opening seed and swap first player deliberately, replacing setup War to control initiative. `regular` keeps both passives and regular abilities but disables Charge and ultimates; `none` disables all Leader abilities. The current baseline uses HOA's activation-based Charge and the accepted 25-Health drafts without changing the production card pool.

## Implemented rules

- 40 cards, Leader outside deck, leader Style plus one secondary Style, maximum two copies.
- Seven-card hand, replace-then-shuffle mulligan, Round 1 Draw; alternating single-action Turns, two Passes and first-passer initiative; Fuel 1–7.
- Entry restrictions, Hothead, all selected card effects, attachments, persistent damage, healing, direct attacks on Rotated Characters, Leader Vulnerability.
- Sequential blocker damage/overflow, free surviving-blocker retaliation including zero-damage Blockers, Explosive, defensive hand Discards, relevant attack/Block trigger timing.
- Two 25-Health Leader packages, once-per-Round shared Charge limit, persistent Charge, spending/rotation, actual d6 Florida ultimate. Toddler retains its production deck reveal.
- End-of-Round stat expiry and Defeat checks; empty-deck Draw loss; War for simultaneous losses. A 30-Round limit is a **censored run**, never a game-rule draw or assigned win.
- Per-action card conservation, nonnegative Fuel and Charge bounds. Fifteen targeted tests cover high-risk interactions.

## Pilot restrictions and model uncertainty

Each pilot greedily chooses an action by evaluating the resulting public board, Health, hand size, Charge, and vulnerability. It sees its own hand, not the opponent's hand contents or deck order. Planning uses a 3.5 average for the Florida ultimate and the printed deck's cost distribution for Toddler; the real action uses the actual roll/reveal. Drawn card identity does not enter the evaluation, only hand size. The policy has **no multi-Turn plan, bluffing, threat sequencing, or bluff-aware passing**.

For defense it considers zero, one, or two Blockers from the five strongest Ready Characters; ascending/descending remaining-Guard order; and zero to two hand Discards, all assigned to the first Blocker. The engine supports larger declared blocks, but the pilot does not search them. It chooses which first Blocker receives HOA's passive. This search restriction can materially alter outcomes on large boards.

The pilot prefers keeping up to three Characters costing at most 3 in its mulligan and replaces everything else. It chooses a cheap hand-value discard heuristic, not strategic discard analysis. It omits harmful/pointless options such as healing enemies, zero-target ultimates, and no-effect healing. Tag Me In's optional extra Instructions Guy Play always chooses Leader self-damage. These are policy restrictions, not new game rules.

The public score values bodies and survival strongly; it may stall, undervalue attacking to exhaust blockers, waste short-lived boosts, or activate too late. The aggression sensitivity run increases the Health term by 50%; it is not a better-trained player. Paired games and three modes share seeds, so the observations are correlated and must not be presented as 32 independent competitive matches. Small samples cannot establish first-player advantage.

Only the 40 unique cards in these decks are supported. There is no claim of a general 180-card simulator, Response support, or validated optimal play. Refer to the saved game transcript and the limitations before using the numbers to change cards.

`--hoa-charge block` reproduces the original condition, while `--hoa-charge damage` reproduces the rejected survived-damage experiment. The current activation-based condition is the default.
