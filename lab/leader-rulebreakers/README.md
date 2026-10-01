# Leader Rulebreakers Lab

**Status:** IDEA / early PROTOTYPE  
**Style:** Unassigned  
**Canonical impact:** None

## Purpose

Explore Leaders whose identity begins before the first Turn by breaking a normal construction, setup, or resource rule.

The goal is not simply to make a stronger Leader. The broken rule should create a deck that behaves differently, gives the opponent visible counterplay, and produces a memorable arc over the game.

This lab begins with two opposite pacing models inspired by the same original idea:

- **Snowball:** starts modestly and compounds if the opponent does not disrupt it.
- **Burnout:** starts far above curve but becomes weaker as its initial advantage is consumed.

They are intentionally separate experiments.

---

## Experiment A — Crazy Cat Lady

**State:** PROTOTYPE  
**Model:** Snowball  
**Style:** Unassigned

### Fantasy

The deck keeps accumulating Cats until the board becomes absurd. The opponent should feel mounting pressure to interrupt the engine before it reaches critical mass.

### Rule-breaking axis

Primary candidate: **deck construction**.

Things worth testing independently:

- Cats may ignore normal Style restrictions during deck construction.
- One specific low-power Cat may exceed the normal four-copy limit.
- A future version could test a different deck-size rule, but reduced deck size is **not** part of the first prototype.

### First prototype hypothesis

Use a normal 40-card deck.

A designated simple Cat, currently working-named **Stray Cat**, may appear up to 10 times.

Other Cats remain subject to the normal copy limit.

No Style is assigned yet.

### Snowball engine candidate

> **Cat Distribution System**  
> At the start of your Turn, before Ready, if you control 3 or more Cats, put the top card of your deck face down and Ready into your Stash.

This is provisional text, not a canonical Leader passive. The playable lab package lives in `crazy-cat-lady/`.

### Why this might work

The board itself telegraphs the threshold. At two Cats, the opponent can see that the third Cat matters. Removing a Cat can interrupt the acceleration. If the opponent does nothing, additional Stash makes it easier to deploy more Cats and maintain the engine.

The desired feeling is not merely “Cats get bigger.” The desired feeling is that the deck's capacity to produce more board gradually compounds.

### Key questions

- Is three Cats the right threshold?
- Does bonus Stash create an exciting snowball or merely runaway resource advantage?
- Does the 10-copy exception feel delightful or repetitive?
- Should only one named Cat receive the copy-limit exception?
- How many different Cats are needed before the deck feels like a collection rather than a single-card swarm?
- Can the opponent realistically knock the engine below threshold?
- Is there a satisfying comeback window after the Cat player gets ahead?

### Failure conditions

Redesign if:
- hitting the threshold makes the game functionally inevitable;
- the correct opponent play is always “kill every Cat immediately” with no nuance;
- ten copies erase meaningful draw variance;
- the deck becomes generic resource acceleration wearing a Cat costume.

---

## Experiment B — Mad Scientist

**State:** IDEA  
**Model:** Burnout  
**Style:** Unassigned

### Fantasy

The Mad Scientist begins with an enormous laboratory battery and can create grotesquely efficient early threats, but the battery barely recharges. The opponent's job is to survive the initial experiment long enough for the lab to run out of juice.

### Rule-breaking axis

Primary candidate: **starting Stash and Stash recovery**.

This experiment should remain distinct from the Cat Lady deck-construction experiment.

### Starting-resource candidates

Initial concept to test:

- Begin the game with 10 cards in Stash.
- Only a portion begins Ready.
- Mad Scientist does not use the normal once-per-Round Stash action.
- Stash does not all Ready during the normal Ready step.
- A small fixed amount, potentially 1 Stash, Readies each Turn.

Exact numbers are deliberately unset until the resource curve is modeled.

### Abomination package

The Scientist's deck may contain effects that combine ordinary Characters from hand into a standardized **Abomination** token.

First mechanical sketch:

> **It's Alive!**  
> Action — Cost TBD  
> As an additional cost to play this, Discard two Character cards. Create an Abomination Character token.

The first prototype should use a fixed token rather than calculating statistics from the discarded Characters. The fantasy is combining bodies; the rules do not need to become arithmetic soup.

### What the cost is doing

An Abomination should consume multiple resources at once:

- Stash;
- cards in hand;
- access to future threats.

That creates the Burnout arc. The Scientist can produce frightening early turns, but each experiment should accelerate the point at which the deck runs out of meaningful options.

### Key questions

- How much Stash begins Ready?
- How quickly should Stash recover?
- Does the Scientist feel explosive without creating non-games?
- Is surviving the opening enough counterplay, or does the opponent need additional ways to interfere with the battery?
- How large can the Abomination be when its real cost includes two discarded Characters?
- Should there be one universal Abomination token or several recipe-specific tokens?
- Does the deck make interesting decisions about when **not** to spend resources?
- Can the Scientist recover from an early failed attack, or is that an intentional weakness?

### Failure conditions

Redesign if:
- optimal play is always “spend everything immediately”;
- the opponent cannot meaningfully interact before taking decisive damage;
- the recharge rule requires annoying bookkeeping;
- the deck either wins immediately or becomes helpless with no interesting middle state;
- Abomination creation becomes a complicated subsystem rather than a clean package mechanic.

---

## Shared testing principle

Do **not** balance these concepts by assigning them a Style yet.

First establish the shape of the game:

1. What does this Leader tempt its player to do?
2. What warning does the opponent see?
3. What can the opponent do in response?
4. What happens if the opponent succeeds?
5. What happens if the opponent fails?
6. Is that story fun enough to justify breaking a base rule?

Only after that should we decide whether the package belongs in an existing Style, suggests a future Style, or should remain a special construction identity.

## Next lab work

Build the smallest playable prototype of each Leader with intentionally plain support cards.

For Crazy Cat Lady, test the copy-limit exception and threshold snowball before adding fancy Cat payoffs.

For Mad Scientist, model the starting-Stash/recharge curve before tuning Abomination stats.

Do not promote either concept into Carl until the lab has a clear counterplay loop and human playtest evidence.
