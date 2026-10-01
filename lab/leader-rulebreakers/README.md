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

**State:** PROTOTYPE  
**Model:** Burnout  
**Style:** Unassigned

### Fantasy

The Mad Scientist begins with an enormous laboratory battery and can create grotesquely efficient early threats, but the battery barely recharges. The opponent's job is to survive the initial experiment long enough for the lab to run out of juice.

### Rule-breaking axis

Primary candidate: **starting Stash and Stash recovery**.

This experiment should remain distinct from the Cat Lady deck-construction experiment.

### Starting-resource prototype

Lab 0.2 tests the selected battery version:

- After mulligans, put the top **5 cards** of the deck face down and **Ready** into Stash.
- Stash is hard-capped at 5 cards.
- Mad Scientist does not receive setup temporary Stash and cannot use the normal once-per-Round Stash action.
- Stash does not Ready during the normal Ready step.
- At the start of each Turn, before Ready, Ready 1 Stash.

The playable prototype lives in `mad-scientist/`.

### Abomination package

The Scientist's deck may contain effects that combine ordinary Characters from hand into a standardized **Abomination** token.

First mechanical sketch:

> **It's Alive!**  
> Action — Cost 3  
> As an additional Cost to play this, Discard two Character cards. Roll for Power, then roll for Guard. Put an Abomination token into play with Power and Guard equal to those results.

Power and Guard are assigned before rolling. Dedicated Power/Guard dice are preferred; otherwise the first ordinary d6 roll is Power and the second is Guard.

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

Both initial Rulebreaker Leaders now have playable lab prototypes.

For Crazy Cat Lady, continue testing the copy-limit exception and threshold snowball before adding fancy Cat payoffs.

For Mad Scientist, continue testing the selected 5-Stash hard-cap Burnout curve, independent Power/Guard Abominations, and the physical Specimen concept.

Do not promote either concept into Carl until the lab has a clear counterplay loop and human playtest evidence.


## Eight-deck field checkpoint — October 1, 2026

A shared field test was run using the current canonical quick-harness behavior as the anchor, with the two lab Leaders added.

### Field

- Bad Decisions / Florida Man
- Comeback Tour / Washed-Up Rock Star
- Now You See Me / Birthday Party Magician
- Curbside Empire / Trash Baron
- Violation Notice / HOA President
- Tag Team Trashfire / Backyard Wrestler
- Cat Distribution System / Crazy Cat Lady Lab 0.1
- Fully Charged, No Charger / Mad Scientist Lab 0.2

Every unordered pairing received **2,000 games**, split evenly between starting orders.

- 28 matchups
- **56,000 total games**
- 40-Round safety cap
- current Carl 0.3 card pool and canonical six decks

This is a heuristic anomaly test. Exact percentages are not directly comparable to dedicated matchup harnesses because the broad canonical quick AI abstracts many card effects and is especially sensitive to Cat Lady's attack/block decisions.

### Broad-field ranking

| Deck | Win rate |
|---|---:|
| Bad Decisions / Florida Man | **63.65%** |
| Cat Distribution System / Crazy Cat Lady | **59.26%** |
| Curbside Empire / Trash Baron | **58.06%** |
| Violation Notice / HOA President | **52.07%** |
| Comeback Tour / Rock Star | **44.46%** |
| Now You See Me / Magician | **43.59%** |
| Fully Charged, No Charger / Mad Scientist | **40.86%** |
| Tag Team Trashfire / Backyard Wrestler | **38.06%** |

Against only the six canonical decks, Cat Lady averaged **59.85%** and Mad Scientist averaged **40.28%**.

### Lab head-to-head

**Crazy Cat Lady 55.70% — Mad Scientist 44.30%**

Average game length: **6.31 Rounds**.

Cat Distribution System activated in **58.95%** of those games. In games where it activated at least once, Cat Lady won **90.50%** in this broad harness.

### Crazy Cat Lady vs canonical field

| Opponent | Cat Lady win rate |
|---|---:|
| Florida Man | **46.85%** |
| Rock Star | **63.45%** |
| Birthday Party Magician | **63.25%** |
| Trash Baron | **56.90%** |
| HOA President | **62.80%** |
| Backyard Wrestler | **65.85%** |

Cat Distribution System activated in roughly **61.84%** of games across these six matchups. When it activated, the broad harness gave Cat Lady roughly **87.43%** wins on average.

This reinforces the earlier warning: the deck's identity works, but automated play still sees a very sharp difference between “engine online” and “engine offline.” Cat Lady is also unusually sensitive to AI decisions about whether to attack, block, or preserve Cats, so her exact broad-field percentage should not be used as a tuning target by itself.

### Mad Scientist vs canonical field

| Opponent | Mad Scientist win rate |
|---|---:|
| Florida Man | **37.40%** |
| Rock Star | **52.25%** |
| Birthday Party Magician | **52.60%** |
| Trash Baron | **14.95%** |
| HOA President | **21.20%** |
| Backyard Wrestler | **63.30%** |

Mad Scientist therefore behaves much more like a matchup-polarized deck than a uniformly weak deck.

The extreme Trash Baron matchup has an obvious mechanical explanation worth human testing: Mad Scientist begins with a visible pool of Ready Stash, and Trash Baron's current passive may spend opposing Ready Stash to pay its own Costs. Trash Baron therefore attacks the Scientist's finite battery directly.

The HOA result also fits the Burnout hypothesis: a deck built to survive and stall has more time to exploit the Scientist's slow one-Stash recharge.

Rock Star and Magician were close to even, while Backyard Wrestler was strongly favorable for Scientist.

### Starting-order caution

The canonical quick field currently shows a large second-player advantage for several normal decks because the second player receives the setup temporary Stash. Mad Scientist is unusual because its Leader explicitly does **not** receive that setup Stash.

All pairings were split evenly by starting order, so overall matchup comparisons are still paired, but this is another reason not to interpret small percentage differences as precise balance measurements.

### Current read

- **Cat Lady:** broadly strong in this harness and still highly engine-dependent. Do not nerf from the broad percentage alone; human play needs to test how often a real player can preserve or disrupt the three-Cat threshold.
- **Mad Scientist:** overall below 50% across the six canonical decks, but the average is dragged down by severe Trash Baron and HOA counters. It is approximately even into Rock Star and Magician, favorable into Wrestler, and unfavorable into Florida Man.
- **Lab vs lab:** 55.7 / 44.3 is a healthy enough first head-to-head signal to continue both concepts without tuning specifically around each other.
- The next useful test is human play or targeted high-detail confirmation of the extreme matchups, especially Scientist vs Trash Baron and Scientist vs HOA.


### Shared future-development notes

- **Board wipes are a natural counter to both Rulebreaker prototypes.** Cat Lady loses the colony threshold; Mad Scientist loses the persistent bodies purchased with a finite battery. Future card development should include board-wide answers, but not at a rate that undermines Character-first gameplay.
- **Mad Scientist's five-card starting battery is protected Stash.** Opponents cannot use it to pay their Costs. Trash Baron therefore keeps his normal passive against ordinary opposing Stash without uniquely deleting the Scientist's core Leader resource.
- **Physical Specimens should eventually test true surprise construction:** up to four approved, identically sleeved external TCG cards shuffled into the 40-card deck. The web playtest will use generic Specimen representations.
