# Unhinged — Carl 0.2

Carl is the current working build. Donut is complete and remains in Git history instead of the live tree.

## Source of truth
- RULES.md — current rules and Revision 13 Leaders.
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


## Deck builder

Carl's deck builder lives at `/builder/` and reads the same `CARDS.json` and `DECKS.json` as the playtest. It currently supports Leader/secondary-Style legality, search and filters, 40-card and four-copy limits, local autosave, deck curve/counts, and text import/export.
