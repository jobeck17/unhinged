# Reckless vs Stonewall — 8 October 2026

Production implementation: `2bfc0c257b4458afc1e3750007f201a280e52c29` (local matching source). Reproduce with `node web/headtohead.sim.mjs`. Full seed-by-seed outcomes are in HEAD_TO_HEAD_20261008.json.

400 games: 100 deterministic shuffle/dice seeds, each run with both deck seats and both starting players. Use current 40-card coverage decks and the actual production browser engine, including both audited Breaking Points. The AI uses the same production aiAction/aiChoice. No mulligans, deck tuning, engine changes, or balancing changes were made for this experiment.

| Deck | Wins | Win rate among 397 finished games |
|---|---:|---:|
| HOA President / Stonewall | 224 | 56.4% |
| Florida Man / Reckless | 173 | 43.6% |

3 games reached the 60-round limit (the stopping snapshot is Round 61); both decks were exhausted and neither side had a Character left to deliver final Cause Trouble. These are unresolved outcomes, not arbitrarily awarded wins. This exposes an edge case for the future core-rules audit; no new tie rule was introduced here.

Finished games: mean 9.60 rounds, median 9, 90th percentile 12, minimum 7, maximum 24. First player won 191 / 397 finished games (48.1%). Florida won 83 of its 200 first-player starts and 90 of its 200 second-player starts; HOA won 108 of its 200 first-player starts and 116 of its 200 second-player starts. Those start-group denominators include the three unresolved games.

HOA reached Breaking Point in 375 / 400 games, Last Straw in 212. Florida reached Breaking Point in 356 / 400, Last Straw in 269. Empty-deck state occurred for both players in the three unresolved games.

Interpretation: the current broad coverage lists show a modest Stonewall advantage, not evidence that Reckless is overpowered. Leave card balance unchanged and finish the other style audits before tuning.

Limitations: these are simple AI pilots, not human or expert play. The AI stashes the first available hand card and does not mulligan; Ready/healing/protection sequencing is basic. Shared selectable Last Straw effects are not implemented yet. All-unique coverage decks are not optimized competitive lists. Paired seeds are correlated, so do not interpret 400 runs as 400 independent tournament samples. No other matchups or ablations were tested.
