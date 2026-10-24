# Accusations Lab

**PROTOTYPE · 24 October 2026.** Standalone scenario-control prototype. [`RULES.md`](RULES.md) is the only authority; nothing here touches the canonical game.

[Play the Accusations Lab](https://jobeck17.github.io/unhinged/lab/accusations/)

## What's here

| File | Purpose |
| --- | --- |
| `RULES.md` | Complete rulebook (source of truth). |
| `CARDS.json` | Both Leaders, all 25 Main cards and 10 Scenarios from §10–§11, with `LAB-ACC-` IDs. |
| `DECKS.json` | The two §12 starter lists (HOA President — Stonewall, Florida Man — Reckless). |
| `engine.mjs` | Rules engine: setup and mulligan, turn structure, Stash, commit/withdraw, combat, Scenario checks, triggers, stall rule. |
| `ai.mjs` | Greedy heuristic bot for solo play and simulation. It's a sparring partner, not balance evidence. |
| `index.html`, `app.mjs`, `style.css` | Browser table: vs bot, pass-and-play with a hand-off screen, or watch two bots. |
| `test.mjs` | 19 rule and invariant checks, including card conservation across 300 bot games. |
| `simulate.mjs` | `node simulate.mjs [games] [seed]` prints the §15 test-goal tallies. |

Run locally from the repo root with any static server (for example `python3 -m http.server`), then open `/lab/accusations/`.

## Playing

- Tap a hand card or one of your Characters to see what it can do. Legal targets pulse teal, so you can tap a target on the table or use the buttons in the action tray.
- Each Scenario shows a **forecast stamp** (*Would succeed / Would fail / Held up*) for its owner's next start-of-turn check.
- Choices the rules hand to a player (Grandma, Petition, Florida Man, Gator Pool, Flamingo, Cops, Fireworks, the order of two Scenario checks) open a prompt for whoever controls them.
- At game end, **Copy test record** puts the §15 tallies on the clipboard as JSON: rounds, Scenarios played/succeeded/failed/abandoned, defense draws, Stash size, and turns left uncontested.

## Interpretations made by the engine

These are places where RULES.md leaves room. Each is a single call site, so it's easy to change.

- **Accusing uses the Character's commit.** The required immediate commit when you play a Scenario counts as that Character's one voluntary move this turn. Characters that have already moved this turn can't support a new Scenario.
- **Effect commits are free.** Neighborhood Watch, Gator Pool and Florida Man commits don't use the once-per-turn allowance, but they do trigger commit hooks (Parked/Cops rotation, the Stonewall passive, Helicopter Parent, Storm Chaser).
- **Florida Man** fires only on kills from attacks, not from Action or ability damage.
- **Did You See That?!** unlocks after any defeat of an opposing Character at a Scenario that you caused this turn (attack, Action or ability).
- **Retaliate** uses the defender's Power from before it took the hit.
- **Emergency Meeting** readies up to two Rotated friendly Characters at the chosen Scenario, picking automatically. The readied ones can't attack this turn.
- **Single forced choices resolve automatically.** Optional ones always offer "Decline".
- **Stall rule:** a round counts as quiet only if no Scenario entered or left play at any point during it. On the third quiet round, the active player abandons first.

## Observations from the first build (for discussion, not rules changes)

- **That's Definitely Not Street Legal!**'s success effect ("ready one of your Stash cards") does nothing. The check happens right after your Stash readies at the start of your turn.
- **Board Member**'s protection never applies with these two decks. No Reckless Action moves an opposing Character.
- **Helicopter Parent**'s buff lasts "until end of turn", so it expires before the opponent's turn, which is when the defending Character actually gets attacked.
- In bot-vs-bot runs (`node simulate.mjs 300`), games last about 13 rounds and Florida Man wins about 55–60%. Treat this only as a sign that the rules engine runs end to end. It isn't balance data.

## Failure conditions

Rework or drop the concept if human playtests show that Scenarios usually resolve without either player making a real commit/contest decision, or if the stall rule fires often.
