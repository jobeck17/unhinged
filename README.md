# Unhinged — Mordecai 0.4

Mordecai is the current production build. The pre-1.0 lineage is **0.1 Mongo → 0.2 Donut → 0.3 Carl → 0.4 Mordecai**. Mordecai promotes the Composure 2.0 core after its 40-question rules interview.

## Current production state

**Mordecai 0.4 is canonical.** Composure 2.0 has graduated from the lab. Root `RULES.md`, `CARDS.json`, and `DECKS.json` are authoritative.

The production baseline now contains **233 cards and eight decks across seven core Styles**: Reckless, Momentum, Misdirection, Salvage, Stonewall, Expendable, and Gambler. Crazy Cat Lady is Momentum; Mad Scientist is Gambler. Their content is under immediate consistency and balance audit.

The 32-card Reckless audit is implemented and regression-tested in the production browser playtest. Its 40-card coverage deck includes all 32 cards, visible dice rolls, and Florida Man’s current Attack-defeat passive. Stonewall now also has its audited cards and 40-card coverage deck implemented. Misdirection now also has its locked 32-card pool, 40-card coverage deck and Magician Leader effects implemented. Remaining Styles and simulator still require their own Mordecai parity audits; old balance results are not evidence for this new deck.

The Scheme, Board Width, and old Composure folders remain development history unless explicitly reopened.

## Reckless coverage playtest — 7 October 2026

[Play the current deck](https://jobeck17.github.io/unhinged/web/). Select Florida Man. The 40-card list contains all 32 locked Reckless cards once, plus one extra copy each of Feral Chihuahua, Vape Kid, Boogie Boarder, Unsupervised Toddler, Amateur Storm Chaser, Spring Break Frat Bro, Victory Lap, and Did You See That?!. This is a broad verification deck rather than a tuned competitive list. The 33rd Style slot is reserved. Safety Goggles (formerly Life Jacket) and Fireworks Incident are banked for the next set; Dirty Needle remains pending.

Every die result is shown in a persistent result panel, history, and event log. Checks: `node web/reckless.test.mjs`, `node web/smoke.mjs`, `node builder/smoke.mjs`, and `node poll/test.mjs`. The Reckless tests cover every card, every die face, reroll/expiry behavior, combat-only rewards, attachments, Absorb, Last Straw interactions, and full-deck card conservation. These verify implementation, not balance. Florida Man and HOA President have their locked Breaking Point effects implemented. Other unique Breaking Points and selectable Last Straw effects remain pending.

## Card face design demo

[Review Character, Item and Action faces](https://jobeck17.github.io/unhinged/web/cards.html). The art-free proposed physical layout is shared with playtest cards and inspection. Printed stats remain on the face; live match state appears separately. The demo also supports printing at 2.5 × 3.5 inches. Layout is testing, not a final print specification.

## Current creative direction

Unhinged is not trying to win by being the safest balanced TCG skeleton. **The core game should be simple and stable enough that the decks themselves can be outrageous.**

The current design filter is the **hell-yeah test**: when a player reads a Leader, build-around, or marquee card, do they immediately want to play it just to see what happens?

Balance remains essential, but the preferred order is:

**irresistible idea → preserve the outrageous part → add meaningful counterplay → tune numbers**

This explicitly allows:
- deck-specific rule breaking and unusual construction;
- visible snowball engines that opponents can disrupt;
- finite-resource burnout engines;
- fragile multi-card “Rube Goldberg” machines whose completed payoff may be effectively game-winning;
- occasional tactile mechanics such as dice, card tossing, flicking, balancing, stacking, or physical overlap when they are strongly thematic.

A deck should still play a real game when its spectacular engine does not go off. The goal is not random chaos for its own sake. The goal is **distinct play patterns and memorable table stories**.

**Crazy Cat Lady** (snowball colony) and **Mad Scientist** (finite battery + randomized Abominations) are now promoted rulebreaker decks in the Mordecai production baseline. Their exact construction and balance remain under audit, but they continue to demonstrate the desired emotional target. Backyard Wrestler's experimental **From the Top Rope!** physical toss, Paper Football concepts, and bottle-stack/Waterfall concepts are saved in NOTES.md for future development.

## Source of truth
- RULES.md — current rules and Leaders.
- CARDS.json — current 223-card production pool.
- DECKS.json — current eight-deck production baseline across seven core Styles.
- NOTES.md — the one living notebook for decisions, questions, next work, and saved ideas.
- SIMULATION.md — current simulation status and historical methodology; Mordecai balance runs are on hold until engine parity.
- sim/round-robin.js — 36-configuration anomaly detector.
- web/ — browser playtest; Reckless, Stonewall and Misdirection audits implemented, remaining Style audits pending.
- builder/ — Dreamborn-inspired deck builder using the same canonical card pool.

Mordecai locks the new core architecture, not final card balance. The next production pass is consistency and content: terminology, Leaders, Breaking Points, Last Straws, decks, cards, abilities, simulator, browser, and builder.

Older builds and labs remain design history. Git history is the archive.

## Build naming and versioning

Unhinged uses milestone versions during pre-1.0 development.

### Version format

- **0.X — milestone generation.** A meaningful new generation of the game gets a new minor number and a new **Dungeon Crawler Carl character codename**.
- **0.X.Y — build update.** A meaningful but compatible update inside the current milestone increments the patch number and keeps the same codename.
- **Commits are not versions.** Routine commits do not automatically change the build number.
- **Revision numbers are retired as an active global version system.** Old Revision references may remain as historical context, but new current-state checkpoints use the build number only.

Examples:
- **0.1 Mongo**
- **0.2 Donut**
- **0.3 Carl**
- **0.3.1 Carl**
- **0.3.2 Carl**
- **0.4 Mordecai**

### When to increment 0.X

Move to the next milestone when the game enters a meaningfully different development generation. Typical reasons include:

- a substantial change to the core turn, combat, resource, deckbuilding, Leader, or card model;
- a major redesign that invalidates a significant amount of prior balance or playtest data;
- completion of the current milestone's main development goals and transition to the next roadmap phase.

A new 0.X milestone receives a new DCC character codename.

### When to increment 0.X.Y

Increment the build number for meaningful changes that preserve the current milestone's basic architecture, such as:

- a notable card or Leader balance pass;
- a meaningful rules/timing cleanup;
- a substantial card-pool audit;
- a meaningful simulator, browser playtest, or deck-builder capability that changes how the current build can be tested;
- a coordinated group of changes worth identifying as a distinct playtest checkpoint.

Do **not** bump the version for every commit, typo, documentation sync, small bug fix, refactor, or repository cleanup unless the change materially defines a new playtest checkpoint.

### Version stewardship

ChatGPT should handle routine patch-version bumps as part of ongoing Unhinged work and keep version references synchronized across the live repository. The user can call for a new 0.X milestone at any time; ChatGPT should also recommend one when the scope of change appears to justify graduating the current build.

When a build number changes, update the relevant current-facing version labels together rather than allowing README, RULES, NOTES, the browser playtest, or other exposed build labels to drift apart.

## Road to 1.0

**1.0 is the first complete release baseline for Unhinged.** It does not mean the game is permanently finished. It means the foundational game, first card environment, documentation, and playtest tooling are coherent enough that future work can build on them without reopening the basic identity of the game.

### 0.3 Carl — Core stabilization — COMPLETE

- Human-test the current Mordecai Turn, Stash, combat, Composure, and Leader systems. Responses are retired; former Response cards await redesign.
- Confirm that the six Leaders create distinct play patterns without excessive rules baggage.
- Separate feel problems from balance problems.
- Fix major rules friction before investing heavily in final card polish.
- Keep simulation useful as an anomaly detector rather than treating it as the game itself.

**Exit condition:** the core game loop is fun and understandable enough that we are no longer routinely questioning its basic architecture.

### 0.4 Mordecai — Core systems lock
**Current phase.**

- Resolve remaining structural rules questions.
- Lock the normal turn/combat/resource/deckbuilding framework.
- Close major timing and terminology ambiguities.
- Establish a stable rules skeleton that card design can safely target.

**Exit condition:** future changes should mostly tune content and balance rather than rebuild the engine.

### 0.5 — Card identity and archetypes

- Make all seven Styles feel mechanically distinct.
- Make all eight Leaders produce recognizable deck identities.
- Audit the 180-card starting pool for redundancy, dead cards, unclear wording, and missing support.
- Establish marquee “hell yeah” cards and memorable build-arounds.
- Confirm secondary-Style deckbuilding creates interesting combinations without erasing Style identity.

**Exit condition:** the card pool feels intentionally designed rather than merely complete by count.

### 0.6 — Balance alpha

- Run broad simulation and human matchup testing.
- Tune canonical decks and common mixed-Style shells.
- Reduce oppressive, non-games, repetitive loops, and extreme matchup polarization.
- Validate pacing, hand economy, Stash growth, Leader survivability, and comeback potential.

**Exit condition:** no known systemic balance problem prevents meaningful testing across the field.

### 0.7 — Digital playtest completeness

- Bring the browser playtest into reliable alignment with the current rules and card pool.
- Make the deck builder reliably enforce current legality and card data.
- Add enough validation and regression coverage that rules/card changes are less likely to silently break the tools.
- Keep GitHub Pages functional after web-facing changes.

**Exit condition:** the digital tools are trustworthy enough for repeated outside playtesting.

### 0.8 — Physical game and usability

- Lock card information hierarchy, templating, iconography, and accessibility standards.
- Print and test real cards for readability, handling, board legibility, and teaching flow.
- Tighten reminder text and recurring symbols.
- Prepare a clean learn-to-play path and reference material.

**Exit condition:** Unhinged works comfortably on an actual table, not only in documents and software.

### 0.9 — Release candidate

- Freeze core rules and the initial 1.0 card list except for fixes.
- Perform full rules/card terminology audit.
- Run final balance and regression passes.
- Resolve known critical browser, builder, data, and documentation inconsistencies.
- Conduct fresh-player playtests without relying on designer explanation.

**Exit condition:** remaining work is polish or defect correction, not redesign.

### 1.0 — First complete Unhinged

1.0 should have:

- a stable, teachable core ruleset;
- seven coherent Styles and eight Leaders with distinct identities;
- a complete, templated, internally consistent initial card environment;
- canonical decks that demonstrate the intended play patterns;
- acceptable human-tested pacing and matchup health, with no known dominant systemic exploit;
- a browser playtest and deck builder aligned with the canonical rules/data;
- physical card layouts and terminology ready for repeatable playtesting/production;
- documentation clear enough that a new player can learn and play without the designer serving as a live rules engine.

Post-1.0 development can then use normal release thinking: **1.0.x** for fixes and small balance changes, **1.x** for meaningful compatible expansions/features, and a future **2.0** only for another genuinely foundational redesign.

## Deck builder

The deck builder lives at `/builder/` and reads the same `CARDS.json` and `DECKS.json` as the playtest. It currently supports Leader/secondary-Style legality, search and filters, 40-card and four-copy limits, local autosave, deck curve/counts, and text import/export.

## Vocabulary poll

[Open the vocabulary poll](https://jobeck17.github.io/unhinged/poll/). The mobile-friendly survey has 18 optional naming questions plus six optional gameplay feedback prompts. Naming questions cover Stash, the Styles category name, all six Style names with baseline deck identity summaries, table vocabulary, and Leader/endgame vocabulary. Naming questions offer multiple choices, a write-in, and an optional reason. Gameplay prompts collect what was played/reviewed, fun moments, frustrations, confusing rules, suggestions, and other comments. Submit is available from every section; gameplay-only submissions are supported. Prior respondents can use “Add gameplay feedback” from their saved receipt without resubmitting their naming votes. Alternatives are proposals; responses do not change canonical rules.

- `poll/questions.js` owns the versioned survey content. Its examples follow current `RULES.md`; Style identities currently need a poll refresh to include Gambler as the seventh core Style.
- `poll/index.html`, `app.js`, `style.css`, and `config.js` form the static GitHub Pages page. Browser storage is only a draft and submission receipt.
- GitHub Pages cannot store POST responses itself. Anonymous submissions go to the public collection endpoint in `poll/config.js`, backed by a persistent Sites D1 database. No GitHub login, emails, or names are collected. Individual responses are not publicly readable.
- `poll/service/` is the canonical collector logic and schema. Its manifest identifies the existing collector Site; do not register a replacement. The hosted source checkout supplies the Vinext runtime. After opening that existing Site, run `node poll/service/sync.mjs /absolute/path/to/collector-checkout`, generate/inspect Drizzle migrations if the schema changed, then build/save/publish through Sites. Synchronize survey changes to the collector before publishing the GitHub page. Existing applied migrations are immutable.
- [View private poll results](https://unhinged-vocabulary-responses.josephbeck17.chatgpt.site/results) with the poll owner's ChatGPT account. The results page shows naming totals, full gameplay comments, and individual submissions; refresh to load new responses. Both the page and `/api/results` enforce owner access server-side through dispatch-provided ChatGPT identity and the `RESULTS_OWNER_EMAIL` runtime secret. Missing configuration denies access. The public submission endpoint remains anonymous. Raw responses stay in the private D1 database and must never be committed to this repository.
- `poll/service/app/results/` and `app/api/results/` contain the private dashboard logic. The collector's ChatGPT auth helper is mirrored in the service folder; Sites owns the sign-in routes. Configure `RESULTS_OWNER_EMAIL` in Sites runtime settings before deploying, using the verified owner email. Do not put the owner configuration or response data into GitHub Pages assets.
- `node poll/test.mjs` validates questions and server-side response handling. The Pages workflow syntax-checks and tests the survey, then copies only its five public assets into `_site/poll/`.

One browser receipt discourages repeat submissions, and the server deduplicates retries by submission UUID. This anonymous poll does not enforce one vote per person.

## Stonewall coverage playtest — 8 October 2026

Select **HOA President** in [the production playtest](https://jobeck17.github.io/unhinged/web/) or [deck builder](https://jobeck17.github.io/unhinged/builder/). The coverage deck has 40 cards and every **33 locked Stonewall cards**: 21 Characters, 9 Actions, 3 Items. The conversation’s 32-card count missed the added Bicycle Cop when Committee moved to Cost 4. Every lock is preserved; choosing one to table remains open if the target is 32 with slot 33 reserved.

Implemented: Meat Shield legal-target priority, non-additive Absorb, Retaliate even on Defeat, optional Rotated entry, healing and actual Ready-transition triggers, Ready-step skips, duration-bound Power, stacked Lawyer taxes, hand reveals, targeted bounce/removal, Composure recovery branches, Round 8/Founder Trouble, HOA Final Warning, and Florida Man’s visible Breaking Point D6.

Run `node web/stonewall.test.mjs`, `node web/reckless.test.mjs`, `node web/smoke.mjs`, `node builder/smoke.mjs`, and `node poll/test.mjs`. Regression checks exercise every audited card, both threshold abilities and every die face; full-deck games check progress and card conservation in both seats. They verify functionality, not balance. Unpaid Dues and Newsletter are tabled. Last Straw’s shared effect pool and other styles’ audits remain unfinished.


## Misdirection coverage playtest — 8 October 2026

Select **Birthday Party Magician** in [the playtest](https://jobeck17.github.io/unhinged/web/) or [builder](https://jobeck17.github.io/unhinged/builder/). All 32 locked designs are available, with a 40-card coverage baseline (26 Characters, 10 Actions, 4 Items). The Headliner is LAB-MAG-008; Trap Door is LAB-MAG-009. Names, stats, ten revised Actions, three Items, five Magical traits, Leader passive and Breaking Point match the audit. Banked Spy concepts and tabled cards stay outside the active pool. The builder migrates duplicate Volunteer/Party Mom IDs in old saved decks.

Tests: `node web/magician.test.mjs`, `node web/reckless.test.mjs`, `node web/stonewall.test.mjs`, `node web/smoke.mjs`, `node builder/smoke.mjs`, and `node poll/test.mjs`. Misdirection has 275 regression checks plus 48 seeded full matches against all eight Leaders. These demonstrate functionality, not competitive balance. For actual browser controls, install Playwright, serve the repository on port 8765, and run `node web/browser.test.mjs`; the Pages workflow runs this before publishing. `BROWSER_BASE_URL` can target another served build. Browser fixture injection lives only in the intercepted test response, with no production debug endpoint.
