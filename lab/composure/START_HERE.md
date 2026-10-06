# Composure 2.0 — Start Here

This file is the handoff for a collaborator or a fresh ChatGPT session working specifically on the **Composure 2.0** lab.

## First: establish the current state

Before proposing changes, read:

1. `README.md` — current Composure 2.0 rules and testing assumptions.
2. `LAST_STRAW_IDEAS.md` — dedicated Last Straw idea repository.
3. `CARDS.json` — cards actually available in this lab.
4. `DECKS.json` — decks actually being tested.
5. `../../NOTES.md` — broader project decisions and status when additional context is needed.

The root repository remains the authority for the overall Unhinged project. **Carl 0.3 is still canonical. Composure 2.0 is a lab.** Do not silently promote lab rules into `RULES.md`, `CARDS.json`, or other canonical files.

If chat history, memory, an old brainstorm, and the current GitHub files disagree, **GitHub wins**.

## What this lab is trying to prove

The central test is whether **Power / Guard / Trouble** creates a better Character-first game.

A Ready Character should create a meaningful choice:

**Attack / Cause Trouble / Stay Ready**

The win arc currently being tested is:

**20 Composure → 10 Breaking Point → 0 Last Straw → qualifying Cause Trouble → Unhinged**

The lab is not trying to prove that every current card or deck is balanced. It is trying to prove that this core loop is fun, interactive, readable, and worth building around.

## Highest-value work right now

Prioritize work in roughly this order:

### 1. Breaking Points
Every Leader needs a unique Breaking Point ability at 10 Composure. **Breaking Point is printed on the Leader card and is part of choosing that Leader, not a separate deckbuilding selection.**

The threshold triggers once, but the ability itself can do whatever its text says: immediate effect, delayed effect, lingering rule change, transformation, etc. Look for abilities that express the Leader's identity and change decisions. Avoid eight variations of "Draw cards" or generic stat bonuses, and be cautious with lingering effects that create excessive bookkeeping.

### 2. Last Straws
Generate bold comeback ideas in `LAST_STRAW_IDEAS.md`.

Do not balance too early. Build an oversized pool, then cut it down. Last Straws should create memorable game states and counterplay, not merely prolong a lost game. The selected Last Straw currently stays hidden under the Leader until that Leader reaches 0 Composure, when it is revealed, triggered, and Rotated beside the Leader.

### 3. Character and deck identity
Ask whether each deck has a reason somebody would specifically want to play it.

Strengthen synergies, signature Characters, weird engines, and "hell yes" cards before obsessing over percentage-point balance.

### 4. Interaction
We need more ways to disrupt engines, but interaction should fit deck identity: damage, bounce, rotation, Item destruction, sacrifice, Trouble manipulation, conditional removal, etc.

### 5. Card audit
Flag cards that still assume older rules, especially:
- Leader Health/damage/healing
- Responses
- universal retaliation
- Leader attacks/blocking
- Ready effects that accidentally enable repeated Trouble
- effects whose value changes dramatically because Trouble now exists

Do not mechanically rewrite questionable cards if the better answer may be a redesign. Flag the design problem and propose alternatives.

### 6. Human playtest feedback
The most useful observations are not just who won.

Watch for:
- Did Attack / Cause Trouble / Stay Ready create real decisions?
- Did you regret exposing a Character after it Caused Trouble?
- Did Breaking Point change the game?
- Did Last Straw create a real comeback fight?
- Was the final Cause Trouble tense or automatic?
- Do unrestricted Character boards create an actual readability, space, or gameplay problem?
- Which card made you want to play the deck again?
- Which turns felt obvious, boring, or hopeless?

## Current guardrails

Do not add a new foundational subsystem merely because a card idea needs one.

Do not restore universal Responses or universal retaliation without explicitly reopening those decisions.

The five-Character cap has been removed for the current human test. Do not assume a cap is needed unless human play reveals a concrete battlefield-space, readability, or gameplay problem.

Do not optimize only for simulation win rate. Fun, deck identity, reversibility, meaningful choices, and memorable plays matter.

Do not clean up or delete strange ideas just because they are unfinished. Put Last Straw concepts in `LAST_STRAW_IDEAS.md`; broader experimental ideas belong in the appropriate notes/status area.

## For Landon / deck experimentation

Crazy Cat Lady and Mad Scientist are active rulebreaker decks in this lab. They are useful precisely because they stress systems in ways the six baseline Style decks may not.

When experimenting with them:
- preserve the deck's identity before smoothing it into a generic good-stuff deck;
- identify the exact interaction that feels broken or boring;
- propose concrete card changes;
- test whether the problem is the card, the deck engine, or the core rule;
- record good ideas even if they are too powerful on the first attempt.

## A good prompt for a fresh ChatGPT session

> Read the current files in `lab/composure/`, starting with `START_HERE.md` and `README.md`. This is the Composure 2.0 test for Unhinged. GitHub is the source of truth. Tell me the current state of the lab, the highest-priority unresolved work, and where my idea fits before changing anything. Keep Carl 0.3 canonical unless I explicitly ask to promote a tested change.

## Working principle

**Find the fun first. Then balance the fun.**

The goal of Composure 2.0 is not to accumulate rules. It is to discover whether this version makes people immediately want another game.
