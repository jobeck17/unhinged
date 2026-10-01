# Mad Scientist Prototype — Lab 0.1

**State:** PROTOTYPE  
**Model:** Burnout  
**Style:** Unassigned  
**Canonical:** No  
**Deck size:** 40  
**Leader Health:** 25

This prototype tests a very different resource arc from normal Unhinged:

> Mad Scientist begins with the whole battery available, can do absurd things immediately, and then has to survive on a trickle of recharge.

It also contains an optional physical-card experiment for using a few cards from other TCGs as **Specimens** without importing those games' rules.

## Leader — Mad Scientist

### Fully Charged, No Charger

> After mulligans, put the top 10 cards of your deck face down and Ready into your Stash. You do not receive setup temporary Stash and cannot use the normal once-per-Round Stash action. Your Stash does not Ready during your Ready step. At the start of your Turn, before Ready, Ready 1 Stash.

This deliberately violates normal Stash setup, growth, and recovery.

The first Turn can begin with **10 Ready Stash**.

Once those resources are Rotated, normal recovery is only **1 Stash per Turn**.

The deck contains a few cards that can force extra recharge, but doing so consumes cards or Items. The question is whether that creates meaningful restraint or whether the correct answer is always "spend everything immediately."

## The battery curve

If the Scientist spends all 10 Stash on Turn 1 and uses no recharge effects:

- Turn 1: 10 available
- Turn 2: 1 available
- Turn 3: 2 available if Turn 2 spends nothing, or 1 if it does
- Turn 4 onward: the player is living off whatever charge they managed not to consume plus one new Ready Stash each Turn

Unlike normal Unhinged, there is no automatic growing economy. **Unused charge is future tempo.**

Ten cards also leave the deck to become the starting battery, which means some important cards will randomly disappear into Stash. That is intentional in the first prototype.

## Abominations

### It's Alive! — 3 Cost Experiment

> As an additional Cost to play this, Discard two Character cards. Put an Abomination token into play.

### Abomination token

**7 Power / 7 Guard**  
**Slowpoke**

An Abomination entering play follows the normal Character entry rule, so it cannot Attack immediately unless another effect gives it Hothead.

The body is intentionally alarming. The real cost is:

- 3 Ready Stash;
- the It's Alive! card itself;
- two Character cards from hand.

A hand capable of making two Abominations immediately can do something outrageous, but it also vaporizes most of its hand and a large chunk of the starting battery.

That is exactly the Burnout question we want to test.

## 40-card prototype

| Qty | Card | Cost | P/G | Role |
|---:|---|---:|---:|---|
| 4 | Lab Rat | 1 | 1/1 | Basic Part |
| 4 | Intern Who Signed the Waiver | 1 | 1/2 | Basic Part |
| 4 | Questionably Acquired Cadaver | 1 | 0/3 | Slowpoke defensive Part |
| 4 | Two-Headed Chicken | 2 | 3/2 | Playable Part |
| 4 | Lab Assistant | 2 | 2/3 | Finds Experiment Actions |
| 3 | Spare Parts Dealer | 2 | 2/2 | Recovers 1-cost Characters |
| 2 | Failed Clone | 3 | 3/3 | Replaces itself when discarded to an Experiment |
| 2 | Escaped Prototype | 3 | 4/3 | Hothead pressure / Part |
| 4 | It's Alive! | 3 | — | Two Characters become a 7/7 Abomination |
| 3 | Release the Specimen | 1 | — | Deploy a 2/2 Specimen |
| 2 | Grave Robbing | 1 | — | Recover a cheap Character |
| 2 | Flip the Breaker | 0 | — | Discard a card to Ready up to 2 Stash |
| 2 | Car Battery in the Bathtub | 1 | — | One-shot 2-Stash recharge |

**Composition:** 27 Characters, 11 Actions, 2 Items.

# Cross-TCG Specimen experiment

This is the part that should make somebody across the table say:

> "Is that a Pokémon card?"

Yes. Yes it is.

But prototype 0.1 deliberately **does not translate the original game's cost, stats, rules text, colors, energy, mana, levels, evolution, lore, ink, or anything else.**

That would make every supported TCG another rules appendix and would turn the joke into a balance nightmare.

Instead, Mad Scientist may bring an optional **Specimen Rack** of up to four external cards.

### Initial eligible physical cards

For the lab prototype:

- **Magic: The Gathering:** a Creature card
- **Pokémon TCG:** a Pokémon card
- **Disney Lorcana:** a Character card
- **Yu-Gi-Oh!:** a Monster card

The Specimen Rack is outside the 40-card deck. This avoids marked-card and card-size problems and keeps the canonical deck mechanically self-contained.

### When released

**Release the Specimen** puts one unused Specimen into play.

Regardless of what the physical card says, it becomes:

> **Specimen**  
> Character Token — Specimen, Part  
> **2 Power / 2 Guard**

The original card's name and artwork remain visible. Mechanically, everything printed on it is ignored.

A Pikachu can therefore be standing in the Unhinged play area as a 2/2 Part while the Mad Scientist eyes it for his next Abomination.

That is the entire joke, with almost none of the rules baggage.

If a physical Specimen leaves play, set it aside as **used** instead of putting it into an Unhinged zone. Each physical Specimen therefore enters at most once per game.

A player who does not own or want to use external cards can use ordinary generic 2/2 Specimen tokens instead.

## Why external cards are not literally shuffled into the deck yet

The original idea of allowing one to four foreign cards **inside the 40-card deck** is preserved as a future experiment, but it creates several problems before gameplay even starts:

- different card sizes, especially between some TCGs;
- identifiable card backs unless every card is fully opaque-sleeved;
- wildly incompatible printed resource systems;
- rules language with no Unhinged equivalent;
- balance changing every time another game prints a card.

The Specimen Rack preserves almost all of the table comedy while isolating those problems.

If the Specimen version is genuinely fun, a later lab pass can test the much more dangerous 36–39 Unhinged cards plus 1–4 literal foreign-card construction rule.

## Future graft experiment, not 0.1

A later version could let the **source game** give a Specimen one tiny graft property.

For example, a Pokémon specimen might grant a defensive graft while a Magic Creature grants something different.

Do not test this yet.

First answer the simpler question:

> Is physically putting somebody else's TCG card into an Unhinged Mad Scientist experiment actually as delightful at the table as it sounds?

## Desired game arc

### Turn 1: irresponsible power

The Scientist looks at ten Ready Stash and a seven-card hand and realizes they can do things no normal Leader can do.

The temptation to empty the battery should be enormous.

### Turns 2–4: consequences

Every Stash spent earlier is now missing.

The Scientist begins choosing between:

- developing ordinary Characters;
- creating another Abomination;
- using hand cards to recharge;
- holding charge for a later turn.

### Late game: flickering laboratory lights

If the opponent survives the initial burst and keeps trading with the Scientist, the resource advantage should reverse.

The Scientist should still be able to win, but no longer by casually buying the most expensive thing in hand every Turn.

## Success signals

The experiment is working if:

- Turn 1 feels uniquely powerful;
- spending 10 immediately is tempting but not always correct;
- the opponent can survive an explosive opening with intelligent blocking and targeting;
- the Scientist visibly loses flexibility as the battery drains;
- Abominations feel worth sacrificing multiple cards for;
- recharge cards create interesting emergency decisions rather than erasing Burnout;
- the deck sometimes wins by restraint rather than maximum opening expenditure;
- external Specimens create laughter and table presence without creating rules arguments.

## Red flags

Redesign if:

- two Turn-1 Abominations make games functionally unwinnable;
- the correct play is always to empty the battery;
- the Scientist has nothing meaningful to do after the initial burst;
- ten cards disappearing into starting Stash makes the deck too random;
- card-driven recharge simply recreates normal resource progression;
- the opponent's decisions in the first two Rounds do not matter;
- Specimen rules require anyone to understand the external game.

## First tuning knobs

Change one at a time:

1. Starting Ready Stash: 10 → 8 or 6.
2. Abomination: 7/7 → 6/6.
3. It's Alive!: Cost 3 → 4.
4. Base recharge: 1 Stash → 2 Stash per Turn.
5. Starting battery cards come from outside the deck rather than the top 10 cards.
6. Reduce or increase recharge-card density.
7. Only after the core deck works, test source-game-specific Specimen grafts.

Do not assign a Style until the Burnout play pattern has proven itself.
