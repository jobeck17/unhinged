# Leader Passive Test Bench

**Status:** LAB ONLY  
**Canonical impact:** None  
**Purpose:** Keep alternate Leader passives organized by Leader so they can be prototyped, simulated, and human-playtested without changing the canonical game.

The canonical passive in `RULES.md` remains the control unless an individual experiment says otherwise.

## Test philosophy

Passive experiments should aim for a distinct play pattern, memorable table moment, or thematic rule break rather than generic efficiency.

Before tuning numbers, ask:

1. Does reading the passive make someone immediately want to try the Leader?
2. What behavior does it tempt the player to perform?
3. What does the opponent see, notice, or react to?
4. What is the counterplay?
5. What would make us redesign or abandon it?

---

## Florida Man — Reckless

_No alternate passives queued yet._

---

## Washed-Up Rock Star — Momentum

### LAB-LEADER-WUR-01 — Bad Publicity Is Still Publicity

**State:** PROTOTYPE

> Whenever your Leader takes damage, draw that many cards.

The intended decision is health versus cards: the Rock Star may deliberately take Leader damage instead of Blocking when the cards are worth the hit.

Detailed experiment, simulation requirements, counterplay, and failure conditions live in:

`lab/leader-rulebreakers/washed-up-rockstar/README.md`

---

## Birthday Party Magician — Misdirection

### LAB-LEADER-BPM-01 — Sleight of Hand

**State:** IDEA

**Core concept:** During your Turn, you may try to physically sneak a card into play without your opponent noticing. If you get away with it, you do not pay its Cost. If your opponent catches you, remove the sneaked card and another Character you control from play.

### What is fun about it

The Leader does not merely reference misdirection mechanically. The player actually performs sleight of hand at the table. Other cards can create natural distractions, choices, reveals, swaps, and moments of divided attention that give the Magician cover for the trick.

The ideal story is the opponent suddenly noticing an extra card and asking where it came from.

### Problem it creates

The opponent should not have to spend the entire Turn acting like a security camera. The experiment needs a clean challenge window and physical rules that make the trick playful rather than ambiguous or adversarial.

### Questions before PROTOTYPE

- What exactly counts as being **caught**?
- When does the opponent's challenge window begin and end?
- Is the attempt once per Turn?
- Can the Magician sneak only Characters, or any card that can legally enter play such as Items?
- Must the sneaked card be fully visible and placed normally in the Play Area?
- Does the free card count as **Played**, including On Play effects?
- What exact game verb should handle the failure penalty: Dismiss, put into discard, or something else?
- Can a player ask about public board state without that becoming an automatic catch?
- What physical conduct is off-limits, such as obstructing vision or touching the opponent's cards?

### Counterplay target

The opponent can pay attention during likely trick windows and call out the extra card, but doing so should compete naturally with the Magician's legitimate choices and distractions rather than require constant surveillance.

### Failure conditions

Redesign if:

- gameplay becomes an argument about whether the opponent noticed in time;
- optimal play requires staring at the Magician's hands instead of playing the card game;
- the penalty is so harsh that nobody attempts the trick;
- the reward is so reliable that the physical challenge is fake;
- accessibility or table-layout issues make the passive impractical without an alternate implementation.

Do not formalize the exact catch procedure until a physical playtest identifies the cleanest version.

---

## Trash Baron — Salvage

_No alternate passives queued yet._

---

## HOA President — Stonewall

_No alternate passives queued yet._

---

## Backyard Wrestler — Expendable

_No alternate passives queued yet._

---

## Other LAB Leaders

Crazy Cat Lady and Mad Scientist currently have dedicated rulebreaker packages in `lab/leader-rulebreakers/`. Add alternate passive candidates here only if we begin comparing multiple Leader passives for either one.
