# Character Lab 2 — current web experiment

This is the current GitHub Pages playtest. Its cards.json and decks.json are the data loaded by play/app.js; play/engine-lab.js and play/ai-lab.js implement this variant. The production/cards pool and six-deck-lab describe the previous baseline. This experiment is not a claim of finalized balance or draft readiness.

## Featured character decks

- **Florida Man / Fireworks Finale:** Fourth of July Showrunner costs 5, is 4/5, injures your other Characters on entry and draws for up to three survivors. Its attacks deal direct Leader damage for each damaged friendly Character. Build a team before playing it.
- **Washed-Up Rock Star / One More Encore:** Roadie Who Never Left costs 5, is 4/5, grows with each Action, and your third Action of a turn lets it play a Character costing at most 3 from hand for free. Karaoke Champion and Wedding DJ support the chain. Prepare the hand before spending the Actions.
- **Trash Baron / Vacuum Goes BRRR:** Jailbroken Robot Vacuum costs 4, is 3/5, tucks a deck card for each Item you play, and gets +1 Power per tucked card. On attack, choose to retain that Power or discard all cargo for equal direct Leader damage before ordinary combat. Leaving play discards cargo with no additional damage.

Featured decks use up to four copies of key cards; all six decks remain 40 cards, two Styles, 25 Leader Health. Four is a maximum, not a required count. Build-around stars identify the three experimental headliners, not an established rarity system.

## Rules for this experiment

1. Full turns alternate A, B, A, B. The starting player remains fixed. A Round counts one turn from each player and sets Fuel: 1 through 7, capped at 7.
2. At the start of your turn, ready your board, refill Fuel, and draw one. Newly played Characters may block but cannot attack or use Rotate abilities until a later Round, unless Hothead permits attacking.
3. Play, attack, and activate while resources permit, then End turn. Effects saying "this turn" expire at every End turn. End-of-turn Bush, Cloak, and Hot Potato effects also resolve then.
4. Attack a Leader or a Rotated opposing Character (Sucker Punch also permits Ready Characters). A Leader attack permits at most one Ready, non-Cloaked blocker. Blocking rotates that Character.
5. Damage in Character combat is simultaneous, including when either Character is defeated. Determine both damage amounts before applying either. Remove all combat casualties before their Defeat triggers resolve. Damage persists. Damage in excess of a blocker's remaining Guard reaches the Leader; excess from attacking a Character directly is lost.
6. No Guard Discards. Defiant, Slowpoke, and Sneaky are retired in this variant: their old text is removed from its pool. Cloak, Stack, Hothead, Explosive, and Sucker Punch remain subject to the variant timing above.
7. A Leader provides deck identity, a 25-Health target, and one automatic passive. Leaders have no activated ability, Charge, ultimate, Ready state, rotation, vulnerability, Power, or Guard. They never attack or block.
8. The prior baseline's printed text is not authoritative for this variant. The app displays this lab's card text, including simplified Actions. Only the six listed decks are supported by the engine; the full copied pool is not a generic promise of implementation for every card.

## Action and support revisions

Hold My Beer has a flat +3 Power; Walk It Off heals and draws; Reply All draws 2 for you and 1 for the opponent; One More Song draws 1; Bring a Friend discounts the next Character by 2; Look Over There prevents blocking; Make It Work dismisses an Item to draw 2; Again returns a small Character; Light the Fuse sacrifices for 2 direct damage. File a Complaint deals Character-count damage; Absolutely Not deals 3. Removal costs were adjusted to 2. Pick a Card costs 3: it refills its owner's hand to three, presents that entire hand face down, and lets the opponent choose one card to reveal and play for free.

Wedding DJ supports Musicians passively; Wrestling Superfan supports Wrestlers; Rat King supports Animals. Escape Artist returns another friendly Character on entry. Mystery Drawer of Cables costs 1 and draws on entry, supplying a useful Item to play and later dismiss. Activated ability options for converted Characters are removed, including their lower Stack layers.

## Leader passives

- **Florida Man — Walk It Off:** The first friendly Character that survives damage during your turn gets +1 Power this turn.
- **Washed-Up Rock Star — Crowd Warms Up:** The second card you play each turn gives a friendly Character +1 Power this turn.
- **Birthday Party Magician — Sleight of Hand:** The first friendly Character returned from play to your hand each turn lets you draw, then discard.
- **Trash Baron — Waste Not:** The first Item you dismiss each turn deals 1 damage to the opposing Leader.
- **HOA President — Neighborhood Watch:** Your first blocker each turn gets +1 Power for that attack.
- **Backyard Wrestler — Crowd Goes Wild:** Your first friendly Character defeated each turn deals 1 damage to the opposing Leader.

The lab engine routes these through one passive event boundary and stores only whether each Leader's once-per-turn passive has triggered. It exposes no Leader action method and stores no Charge or Leader Ready state. Activated Leader abilities can be evaluated later without restoring the removed ultimate subsystem.

## Verification and next questions

Run `node play/test-character-lab.mjs` and `node play/test-app.mjs` from the repository root. The lab test checks all six lists, prepared headline scenarios, simultaneous lethal combat, overflow, full-turn order, and 30 seeded directed AI matchups with card conservation. These checks demonstrate functioning mechanics, not fun or reliable competitive win rates.

Next human test: try Vacuum versus Rock Star, then Showrunner. Record whether the headliner appeared, whether you could prepare its payoff, whether the opponent had meaningful responses, and whether you wanted another game. Draft construction and broader pool implementation remain future tests.
