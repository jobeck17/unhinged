# Crazy Cat Lady Prototype — Lab 0.1

**State:** PROTOTYPE  
**Style:** Unassigned  
**Canonical:** No  
**Deck size:** 40  
**Leader Health:** 25

This prototype tests one question:

> Is it fun when a Leader breaks the copy-limit rule to build a visible Cat colony that begins generating extra economy if the opponent fails to thin it out?

This is intentionally not a polished archetype. The Leader should be the engine. The support cards are kept simple so we can tell whether the core rule break is actually producing the fun.

## Leader — Crazy Cat Lady

### Deck construction

> Your deck may contain Cat Characters from any Style and up to 10 copies of **Stray Cat**.

The any-Style clause is future-facing. Lab 0.1 does not assign a Style and does not yet test cross-Style card selection.

### Cat Distribution System

> At the start of your Turn, before Ready, if you control 3 or more Cats, put the top card of your deck face down and Ready into your Stash.

The threshold is public and interruptible. Two Cats should feel like a warning light.

The extra Stash is intentionally taken from the top of the deck rather than from hand. That does three things:

1. It feels like the colony is generating resources rather than merely improving normal Stashing.
2. It lets the Cat player keep deploying from hand once the engine starts.
3. It quietly consumes the deck, giving the snowball a built-in long-game cost.

## 40-card prototype

| Qty | Card | Cost | P/G | Role |
|---:|---|---:|---:|---|
| 10 | Stray Cat | 1 | 1/1 | Copy-limit experiment / swarm body |
| 4 | Orange Menace | 1 | 2/1 | Hothead pressure |
| 4 | Tuxedo Cat | 2 | 2/3 | Bodyguard |
| 4 | Cat Under the Bed | 2 | 2/2 | Chicken / preservation |
| 3 | Feral Tom | 3 | 4/2 | Sucker Punch |
| 3 | Three-Legged Cat | 3 | 3/4 | Stubborn |
| 3 | Alley Matriarch | 4 | 4/5 | Threshold card draw |
| 2 | Maine Coon | 5 | 5/7 | Five-Cat payoff |
| 1 | House Panther | 6 | 7/8 | Plain high-end payoff |
| 2 | Open a Can | 1 | — | Find a Cat |
| 2 | Laser Pointer | 1 | — | Combat trick |
| 2 | Cardboard Box | 1 | — | Save a Cat / lose board count temporarily |

**Composition:** 34 Characters, 4 Actions, 2 Items.

## Why Stray Cat is bad on purpose

**Stray Cat** is a 1-cost 1/1 with no text.

The ten-copy exception should create **quantity and identity**, not ten copies of an efficient staple. If the Leader makes a weak body worth playing because the colony itself matters, the deck-building rule is doing real work.

If Stray Cat needs to become individually strong for the deck to function, that is evidence the snowball engine is not carrying enough weight.

## Desired game arc

### Early game

Get Cats onto the table. The opponent sees the count approaching three and decides whether spending attacks or interaction to reduce the colony is worth giving up pressure elsewhere.

### Engine turn

If three Cats survive to the start of a Turn, Cat Distribution System creates one bonus Ready Stash.

This should feel meaningful immediately, but not decisive.

### Snowball

Bonus Stash makes it easier to deploy multiple Cats or climb into Alley Matriarch, Maine Coon, and House Panther while still maintaining a wide board.

The deck should become increasingly obnoxious if ignored.

### Counterplay

The cleanest answer should be **reduce the Cat count below three**.

Tuxedo Cat, Chicken, Stubborn, and Cardboard Box make that harder, but each uses ordinary game interaction. There is no hidden lockout or protection shield.

## What we are NOT testing yet

- A 20-card deck.
- All-Cat deck requirements.
- More than one card with a copy-limit exception.
- Alternate Leader Health.
- New keywords.
- Token Cats.
- Cross-Style Cat selection.
- A dedicated Cat Style.
- Global “all Cats get +X/+X” effects.

Those can be layered in later only if the basic colony loop is fun.

## Success signals

The prototype is promising if:

- reaching three Cats feels exciting but interruptible;
- the opponent changes play because the third Cat matters;
- the ten-copy Stray rule is memorable without eliminating all draw variety;
- the Leader produces increasingly explosive turns without making the result inevitable;
- dropping back to two Cats meaningfully slows the deck;
- the Cat player sometimes chooses between protecting the colony and spending resources aggressively;
- large boards create the “again?! another Cat?!” feeling without turning every game into solitaire.

## Red flags

Change the design if:

- three Cats on board effectively means the game is over;
- the Cat player routinely triggers the passive on Turn 2 with no realistic answer;
- the opponent must kill every Cat immediately regardless of matchup;
- ten Strays make opening hands feel identical;
- bonus Stash makes high-cost cards trivial too quickly;
- the correct Cat play is always “play every body possible” with no meaningful sequencing;
- deck depletion never matters and therefore supplies no real downside.

## First tuning knobs

Change only one at a time:

1. Threshold: 3 Cats → 4 Cats.
2. Bonus Stash enters Rotated instead of Ready.
3. Trigger limited to every other Turn or once while crossing the threshold.
4. Stray Cat count: 10 → 8 or 6.
5. Stray Cat stats: 1/1 → 1/2 only if survival is too fragile.
6. Remove support protection before weakening the Leader engine.

The first human test should use the passive exactly as written before touching these knobs.
