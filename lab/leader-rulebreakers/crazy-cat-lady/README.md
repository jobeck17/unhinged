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
2. Delay the bonus Stash for one Turn (for example, it enters Rotated after the Ready step or explicitly does not Ready this Turn). Simply making it enter Rotated before Ready would have no effect because the normal Ready step immediately follows.
3. Trigger limited to every other Turn or once while crossing the threshold.
4. Stray Cat count: 10 → 8 or 6.
5. Stray Cat stats: 1/1 → 1/2 only if survival is too fragile.
6. Remove support protection before weakening the Leader engine.

The first human test should use the passive exactly as written before touching these knobs.


## Simulation checkpoint — October 1, 2026

### Matchup

Crazy Cat Lady Lab 0.1 vs. canonical **Comeback Tour / Washed-Up Rock Star**.

20,000 games were run with starting order split evenly. This was a dedicated lab matchup harness based on the current simulator, with two core interactions modeled more faithfully because they are unusually important to this experiment:

- legal direct attacks on Rotated Characters, allowing Rock Star to actively thin the Cat colony;
- deck-out loss, because Cat Distribution System consumes cards from the top of the deck.

The lab harness also modeled the Cat package's relevant simple effects and the major current Rock Star package effects. Treat the result as an early same-matchup signal, not a canonical metagame result.

### Lab 0.1 result — 3-Cat threshold

- Cat Lady win rate: **56.05%**
- Cat Lady when going first: **54.48%**
- Cat Lady when going second: **57.61%**
- Average game length: **8.52 Rounds**
- Median game length: **8 Rounds**
- Cat Distribution System triggered in **68.61%** of games.
- When the passive triggered at least once, Cat Lady won **77.86%**.
- When the passive never triggered, Cat Lady won only **8.38%**.
- Average bonus Stash created: **2.37 per game**.
- Among games where the engine activated, it created **3.46 bonus Stash** on average.
- Median first activation: **Round 3**.
- The Cat colony was knocked from the active threshold to below it in **56.47%** of games.
- Average maximum colony size: **4.87 Cats**.
- No Cat Lady deck-out losses occurred in this matchup sample.
- Zero games were censored at the Round cap.

### Interpretation

The overall matchup is only moderately Cat-favored, but the internal result is highly polarized.

The current prototype behaves very close to the intended **snowball** fantasy:

- if Rock Star prevents the colony from establishing, Cat Lady is extremely weak;
- if Cat Distribution System comes online, Cat Lady becomes heavily favored.

That is a useful success signal for identity, but the 77.86% / 8.38% split is a warning that the threshold may currently act too much like an on/off switch rather than creating a recoverable advantage.

### Threshold sensitivity — 4 Cats

The same 20,000-game seed structure was rerun with only the activation threshold changed from 3 Cats to 4.

- Cat Lady win rate: **52.16%**
- First: **52.66%**
- Second: **51.66%**
- Average game length: **8.82 Rounds**
- Passive triggered in **49.68%** of games.
- When it triggered, Cat Lady won **87.09%**.
- When it did not trigger, Cat Lady won **17.68%**.
- Average bonus Stash: **1.28 per game**.
- Median first activation: **Round 5**.

Moving the threshold to 4 fixes the headline win rate but does **not** fix the binary behavior. It makes successful engine starts rarer, while the games that do establish the engine are even more strongly correlated with winning.

### Current lab read

Keep the 3-Cat threshold for the next human/prototype pass.

The more interesting tuning question is not simply “3 or 4 Cats.” It is whether the reward for maintaining the colony should accumulate more gradually or give the opponent a larger recovery window after the first activation.

Do not promote or rebalance from this one matchup alone.
