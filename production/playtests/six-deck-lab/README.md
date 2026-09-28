# Six-deck lab

This is the **September 28 mono-Style baseline** for the rebuilt 0.2 Donut card pool.

- [All six 40-card lists](decks.md)
- [Structured deck data](decks.json)
- [Current six Leader passives](leaders.md)
- Run `python3 production/playtests/six-deck-lab/validate.py` from the repository root to verify card count, copy limits, Style legality, and card-pool version.

## Why mono-Style first

The first job is to prove that each Style works by itself:

- both major packages can appear in one coherent 40-card deck;
- the Leader passive has enough support inside its own Style;
- a weak package cannot hide behind a stronger secondary Style;
- balance problems can be attributed to the correct engine.

Dual-Style construction comes **after** these six baselines function.

## First matchup slate

1. Florida Man vs. HOA President
2. Washed-Up Rock Star vs. Trash Baron
3. Birthday Party Magician vs. Backyard Wrestler

Then rotate through the full six-deck round robin with pilots and starting player alternated.

These are validation decks, not optimized lists. Do not treat early win rates as final balance evidence until rules execution and package function are stable.
