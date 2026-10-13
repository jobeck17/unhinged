# Isolated Salvage audit simulation

This lab implements the approved 32-card Trash Baron draft on top of the production engine and its existing extensions. [Open the Salvage audit playtest](https://jobeck17.github.io/unhinged/lab/salvage-audit/). It has coverage and focused trial lists plus Florida Man, HOA and Magician opponents. It is separate from the production builder and main playtest. Authoritative card definitions: `../../brainstorm/salvage-audit/STARTING_DRAFT.json`.

From the repository root:

```sh
node lab/salvage-audit/test.mjs
node lab/salvage-audit/simulate.mjs
node lab/salvage-audit/simulate-pilot.mjs
```

The original pilot writes `RESULTS_20261013.json`; revised pilot writes `RESULTS_PILOT_20261013.json`. Both use the corrected engine. Default per batch: 20 seeds, two lists, two storage-priority policies, three opponents, both seats and starting players (960 games). Set `SALVAGE_SEEDS` to change the number of seeds. Runs check physical card conservation and fuel bounds after each action. Earlier pre-correction results in Git history are superseded; see `SUMMARY_20261013.md`.

Phone browser verification: run a local HTTP server at port 8765, then `node lab/salvage-audit/browser.test.mjs` with Playwright installed. `PLAYWRIGHT_MODULE` may specify its absolute module path; `BROWSER_BASE_URL` may point to deployed Pages. Test-only state is injected into the intercepted response and is not exposed in the published app. Verified: all five list starts, mulligans, AI turn completion, reactive Zip deployment, Item dismissal choices and temporary Stash inspection.

`fixtures.mjs` supplies legal 40-card trial lists. The broad list includes every approved design; the focused list increases early Items and Junk Heap copies. Regression fixtures with extra Stash are separate from actual matchups. The targeted ramp test uses legal 40-card lists and checks conservation.

These are heuristic pilots with no mulligans. Paired policies reuse seeds and are correlated. Results are exploratory, not tournament win-rate estimates. No mixed-Style or browser integration claims. Production integration must still verify choices, timing and compatibility with other Styles before deployment.
