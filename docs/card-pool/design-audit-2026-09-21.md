# Unhinged 180-Card Design Audit — 2026-09-21

> Review basis: canonical `docs/card-pool/cards.json` and `leaders.json`, current rules lab, plus design lessons taken from mature expandable card games (especially Marvel Champions / other Fantasy Flight LCGs).
>
> This is a **design audit**, not a canonical card rewrite. No individual card text in `cards.json` is changed by this document.

# Executive assessment

The current state is encouraging:

> **The underlying game system is more mature than the current card pool.**

The alternating-Turn structure, Fuel ceiling, Ready/Rotate exposure, blocking, retaliation, persistent damage, Leader vulnerability, defensive hand discard, and Golden Rule already create meaningful decision points.

Many of the 180 cards were authored before those systems stabilized, so too many cards still express identity primarily through:
- +Power / +Guard;
- repeated enters-play value;
- repeated Defeat value;
- repeated "first attacker" suppression;
- Leader-specific Junk interactions.

The next card pass should not add a large new rules subsystem. It should make the existing cards exploit the systems already present.

# Primary design test

For every card in the rewrite, ask:

> **Does this card create a new decision, or merely improve a number?**

Simple cards remain useful for readability and onboarding, but the memorable/core identity cards should create meaningful choices in sequencing, risk, exposure, resource timing, recursion, exchange, targeting, or board geometry.

---

# Current pool metrics / fingerprints

The current pool is 180 cards: six pools of 30, each presently 18 Units / 8 Actions / 4 Items.

## Reckless

Observed fingerprint:
- 19/30 cards reference attacking.
- strong self-damage / risk-reward / burst-Power identity.
- little dependence on keywords.

Healthy examples:
- **Firework Dad** — trade self-damage for attack strength.
- **Put It in Reverse, Terry!** — escape incoming combat damage by giving up board presence.
- **Fireworks Incident** — hurt your own card and enemy card; payoff depends on survival.
- **Guy Who Definitely Read the Instructions** — attack creates a sacrifice-vs-self-damage choice.

Pressure points:
- too many cards are variants of "+X Power this attack/round."
- several cards make the same decision with different numbers.

Rewrite target:
- preserve reckless aggression;
- increase "what am I willing to risk?" decisions;
- use self-damage, exposure, delayed consequences, Item consumption, and attack sequencing rather than only larger Power bonuses.

## Unruly

Observed fingerprint:
- heavy Team / Party / Performer / Hustler Trait interaction.
- many enters-play buffs and broad +Power/+Guard effects.
- relatively little direct interaction with Attack/Block timing.

Healthy examples:
- **Carpool** — exchange one body for another and change sequencing.
- **Everybody Bats** — payoff changes based on spreading benefit.
- **Girl Scout Troop Leader** — Trait-based selection rather than raw stats.

Pressure points:
- currently the most "tribal math" pool.
- too much identity is decided during deckbuilding rather than during Turns.
- several cards amount to "other matching Characters get +1."

Rewrite target:
- coordination, tag-ins, sequencing, hand-to-board exchanges, shared buffs with allocation decisions, "who goes first?" and "who helps whom?"
- **Tag Me In!** fits naturally here.
- Trait bonuses should usually enhance functionality rather than create RNG dead cards.

## Crooked

Observed fingerprint:
- Rotate/exhaust effects, Return, cost/tax pressure, target changing, top-deck manipulation, Action interaction.
- strongest current decision-tree identity.

Healthy examples:
- **Redirect** — changes an opponent's choice.
- **Fake Psychic** — manipulates upcoming information.
- **IT Guy Who Quit Six Months Ago** — sets up future Action access.
- **Administrative Fee** / **Shakedown** — opponent chooses which resource to lose.

Pressure points:
- disruption can become "you don't get to play" if overconcentrated.
- future Responses can amplify frustration if Crooked owns too many hard negations.

Rewrite target:
- favor redirection, information, uncomfortable choices, temporary manipulation, and sequencing puzzles over hard denial.

## Makeshift

Observed fingerprint:
- 19/30 cards reference Items.
- approximately ten cards depend directly on Junk Pile / Junk flow.
- strong scavenging/recycling theme but currently overbound to Trash Baron infrastructure.

Structural issue:
- Junk Pile is created by a Leader/card package rather than a universal base rule.
- Makeshift as a secondary color can draw cards whose text assumes a zone that may not exist.
- this violates the spirit of the Golden Rule.

Current direction:
- retire Junk Pile;
- use normal Discard as the "trash" everyone creates;
- Makeshift gets unusual access to/reuse of Items from Discard;
- Trash Baron becomes the strongest version via **One Man's Trash**.

Rewrite target:
- Items repaired, repurposed, exchanged, Dismissed for different value, retrieved, transferred, combined, temporarily animated, or physically used as mini play objects.
- use **Inconspicuous Bush**, **Trench Coat**, **Lost & Found**, extension-cord style Item interactions, etc.
- Makeshift should be the pool where the tabletop starts looking strange.

## Stubborn

Observed fingerprint:
- high Guard and defensive suppression.
- several cards punish or reduce the first Attack.
- multiple hidden Actions affect an attacking Character.

Healthy examples:
- **Retired Marine Next Door** — visible resistance to movement/Return.
- **Rabid Possum** — Blocking has an extra consequence.
- **Ring Doorbell** — visible engine that rewards being attacked.

Pressure points:
- **Neighborhood Watch Captain**, **Crossing Guard**, and **Security Camera** overlap heavily around first-attacker Power reduction.
- defensive Actions can accumulate into a state where attacking is strategically unattractive.

Rewrite target:
- make the opponent ask **how** to attack, not **why attack at all**.
- favor tradeoffs, redirection, alternate Blockers, conditional protection, visible defensive threats, and costs imposed on attack choices.
- some hidden Attack Responses are good; too many hard cancellations are not.

## Kamikaze

Observed fingerprint:
- 23/30 cards reference death/Defeat language.
- 8/30 use Sacrifice.
- strongest and clearest current faction identity.

Healthy examples:
- death as economy rather than mere failure;
- recursion, sacrifice, damage, draw, and immediate-attack bodies all support the theme.

Pressure points / duplicates:
- **Powder Keg Kid** and **Fireworks Technician** are near-duplicates.
- **Zombie Kid** and **Dumpster Revenant** both die into 1/1 bodies.
- **Overenthusiastic Volunteer** and **Crash-Test Intern** overlap on death→Draw.
- **Cult Recruiter** and **Fanatic With a Megaphone** overlap on death→Power.

Rewrite target:
- keep death central but diversify the decision:
  - opponent Defeat vs self-Sacrifice;
  - death while Blocking vs attacking;
  - survive-at-1 vs die;
  - move attached Items when Defeated;
  - choose between damage / Fuel / recursion / body replacement;
  - delayed vs immediate death payoff.
- avoid making every opposing decision "never kill their Characters."

---

# Trait design audit

Current Trait references are concentrated unevenly.

The key risk is not Trait synergy itself. The risk is **hard gating** a useful card behind a Trait that may simply not be drawn.

Example problem:
- deck contains many Wrestlers;
- player draws **Tag Me In!** but no Wrestler;
- card becomes dead through draw order rather than a board decision.

Preferred pattern:

> Base effect works generally. Matching Trait upgrades it.

Examples already moving in this direction:
- Kamikaze Actions that can Sacrifice any Character but pay extra for Fanatic/Undead/Daredevil.

Hard Trait gates are still legitimate for:
- flavor-defining attachments;
- deliberate build-around cards;
- very high-payoff effects whose deckbuilding restriction is part of their cost.

---

# Response audit

The current pool already contains at least a dozen cards written around non-normal timing.

Strong Response candidates include:

### Attack window
- Hold My Beer
- Send It!
- Overcommit
- Crash Through
- File a Complaint
- Not in My Neighborhood
- Absolutely Not
- Take One for the Team

### Action/effect window
- Redirect
- I Want to Speak to Your Manager
- Read the Fine Print

### Other event windows
- Backdoor
- Last Laugh

Conclusion:
Responses are not speculative feature creep. They are **missing rules infrastructure for existing card behavior**.

Current preferred structure:
- card type remains Action;
- Response is a timing designation/subtype;
- exact legal window printed in plain English;
- no fifth card type currently needed;
- no generic Response window after every event.

Watch item:
too many hidden Attack Responses can discourage attacking. Mix hidden responses with visible board-based reactive abilities.

---

# Cards / slots with obvious rewrite opportunity

This is not a ban list. These are cards whose current function is especially replaceable because they are vanilla, duplicated, mostly numerical, or tied to obsolete infrastructure.

Examples:

### Reckless
- Washed-Up Rock Star
- Make a Scene
- some overlap among Hold My Beer / Send It! / Overcommit once Responses are formalized

### Unruly
- Little Leaguer
- Little League Assistant Coach
- Dance Mom
- Stage Mom
- Neighborhood Block Party
- Little League Umpire's Kid (also references removed Coach Trait)
- Everybody Gets a Turn
- Rally the Group Chat
- Pep Talk

### Crooked
- preserve most of the pool, but reduce repetitive Rotate/-Power denial if new Responses are added

### Makeshift
- Junk-dependent cluster requires structural rewrite
- Junkyard Dog
- Shopping Cart Knight
- Rat King
- use freed slots for physical Item/repurposing designs

### Stubborn
- Mall Walker
- Concrete Goose
- duplicate first-attacker suppression package
- reassess multiple hidden Attack-negation Actions together

### Kamikaze
- consolidate near-duplicate Defeat triggers listed above
- keep death density high but broaden the consequences

Estimate: roughly **20–25 slots** can be meaningfully reworked without erasing current faction identity.

---

# Important known card-data cleanup items

Still pending:
- Unit → Character decision/conversion.
- Deploy / field → Play / enters play.
- Exhaust → Rotate.
- dies/died → Defeat.
- Resource → Fuel.
- mill → "put the top X cards of your deck into your discard."
- Participation Trophy needs explicit Attach wording.
- Little League Umpire's Kid references Coach, a removed Trait.
- Sharks with Freaking Laser Beams references Shark without a Shark Trait.
- trait-count violations remain on Cockroach, Possum in the Trash Can, Exploding Clown.
- Little Leaguer has blank text in JSON.
- Junk-dependent cards and Trash Baron Leader text require coordinated rewrite.
- stale test/meta decks must be rebuilt after the card rewrite.

---

# Mature-game lessons adopted for Unhinged

## 1. Define simple words before they become complicated
Be deliberate with Owner, "you/your", Play, Choose, Target, Attack, Defeat, Return, etc.

## 2. Avoid glossary dependency
A player should not need to learn one game term in order to understand another game term.

## 3. Keep timing chronological
Prefer a queue over nested priority whenever possible.

## 4. Don't use a vague "must change game state" legality rule
Tie play legality to Cost + required legal choices/targets.

## 5. Recursion needs explicit brakes
Copy limits alone are not sufficient. Once-per-Round/game limits are legitimate tools.

## 6. Scope future-proof wording
Prefer "your deck/discard" over "a deck/discard" unless cross-player access is intentional.

## 7. Avoid invisible faction rules
If a Leader/color changes a rule, print the exception on a card.

## 8. Don't punish the central activity out of the game
Responses/defense should complicate attacking, not make players stop attacking.

## 9. Physical printed cards should tell the truth
Avoid post-release rules that require players to remember invisible replacement text.

## 10. Plan metadata now
Set identifiers / legality metadata are cheap before release and expensive to retrofit after a huge pool exists.

---

# Unhinged-specific design identity emerging

The strongest distinctive direction is:

> **Cards should behave like tactical pieces and, sometimes, little tabletop toys.**

Mechanical identity:
- alternating tactical Turns;
- attack/block/exposure decisions;
- persistent damage;
- visible Leader risk;
- resource restraint via Fuel;
- factions that change decision trees.

Physical identity:
- cards under cards;
- cards passed/moved/rotated;
- shared objects;
- table position conveying state;
- funny physical interactions that are still clean rules.

Desired player reaction:

> "I need to try that."

Not every card needs this. Enough cards should.

---

# Current health assessment

## Strong
- base Turn/Round cadence;
- attack/block/Rotate exposure loop;
- faction concepts are distinguishable;
- Golden Rule architecture;
- restrained keyword philosophy;
- Fuel ceiling;
- two-color deckbuilding and 2-copy consistency target;
- willingness to reopen terminology before print.

## Needs work before Alpha feels cohesive
- current 180 has too many stat-only cards;
- Unruly needs more in-game coordination;
- Makeshift needs Junk removed/reframed;
- Kamikaze needs more varied death questions;
- Stubborn needs anti-stall/anti-deterrence attention;
- Response timing needs completion;
- Owner/Controller and Unit/Character terminology need final decisions;
- canonical wording is behind current rules.

## Overall
The foundation does **not** appear to need another major mechanical reset. The next quality jump should come from a disciplined card rewrite around **decision-tree depth**, not from adding another battlefield, lane, resource, or universal subsystem.
