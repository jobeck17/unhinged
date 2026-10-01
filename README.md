# Unhinged — Carl 0.3

Carl is the current working build. The pre-1.0 lineage is **0.1 Mongo → 0.2 Donut → 0.3 Carl**. Donut is complete and remains in Git history instead of the live tree.

## Source of truth
- RULES.md — current rules and Leaders.
- CARDS.json — current 180-card pool.
- DECKS.json — six canonical mono-Style decks.
- NOTES.md — the one living notebook for decisions, questions, next work, and saved ideas.
- SIMULATION.md — simulation methodology.
- sim/round-robin.js — 36-configuration anomaly detector.
- web/ — current browser playtest.
- builder/ — Dreamborn-inspired deck builder using the same canonical card pool.

Carl locks Florida Man's damaged-Character Hothead/Sucker Punch plus survival-Ready passive, and Expendable-only Tag Out for Backyard Wrestler.

The browser is a playtest aid, not a perfect rules oracle. Core rules and Leader mechanics are current; especially contextual card timing still needs human validation.

Older docs, prototypes, Mongo files, Donut snapshots, and brainstorm material were removed from the working tree, not erased. Git history is the archive.

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
- eventual **0.4 [new DCC codename]**

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

### 0.3 Carl — Core stabilization
Current phase.

- Human-test the full-turn, Stash, combat, retaliation, Response, and Leader systems.
- Confirm that the six Leaders create distinct play patterns without excessive rules baggage.
- Separate feel problems from balance problems.
- Fix major rules friction before investing heavily in final card polish.
- Keep simulation useful as an anomaly detector rather than treating it as the game itself.

**Exit condition:** the core game loop is fun and understandable enough that we are no longer routinely questioning its basic architecture.

### 0.4 — Core systems lock
Codename chosen when the milestone begins.

- Resolve remaining structural rules questions.
- Lock the normal turn/combat/resource/deckbuilding framework.
- Close major timing and terminology ambiguities.
- Establish a stable rules skeleton that card design can safely target.

**Exit condition:** future changes should mostly tune content and balance rather than rebuild the engine.

### 0.5 — Card identity and archetypes

- Make all six Styles feel mechanically distinct.
- Make all six Leaders produce recognizable deck identities.
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
- six coherent Styles and Leaders with distinct identities;
- a complete, templated, internally consistent initial card environment;
- canonical decks that demonstrate the intended play patterns;
- acceptable human-tested pacing and matchup health, with no known dominant systemic exploit;
- a browser playtest and deck builder aligned with the canonical rules/data;
- physical card layouts and terminology ready for repeatable playtesting/production;
- documentation clear enough that a new player can learn and play without the designer serving as a live rules engine.

Post-1.0 development can then use normal release thinking: **1.0.x** for fixes and small balance changes, **1.x** for meaningful compatible expansions/features, and a future **2.0** only for another genuinely foundational redesign.

## Deck builder

Carl's deck builder lives at `/builder/` and reads the same `CARDS.json` and `DECKS.json` as the playtest. It currently supports Leader/secondary-Style legality, search and filters, 40-card and four-copy limits, local autosave, deck curve/counts, and text import/export.
