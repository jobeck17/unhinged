# Completed-deck play-line review

Reviewed current production CARDS.json, DECKS.json and RULES.md at main 523241a. No card locks or production code changed.

## Method and limits

Reviewed Stash growth, card consumption, entry eligibility, trigger order, standalone fallback and finishers. Ran constructed ideal-hand sequences through the production engine with all extensions in production load order. Opponent passed except fixture targets explicitly supplied for combat and Dismiss; these are legal sequencing demonstrations, not matchup or randomized draw evidence. First player used throughout. Existing regression suites passed: Reckless 307 checks, Stonewall 379, Misdirection 284; existing functionality integrations passed, including 48 Misdirection seeded games. Those are not balance estimates.

Raw draw probabilities use a shuffled 40-card list before mulligan, selection or extra draw. They are not full game probabilities. Ideal lines assume pieces survive; disruption remains a major practical constraint.

## Findings

- Foundations are coherent. Florida converts combat into pressure; Magician converts return/Dismiss into card/resource/tempo value; HOA preserves bodies and grows late Trouble. No redesign justified by this review alone.
- Deck construction is the biggest consistency gap: Florida and Magician each have 24 singleton designs; HOA has 26. These are coverage decks, not optimized decks. A named singleton appears in 25% of the first 10 raw cards; four copies would appear in 70%. Do not remove locked designs from the pool to tune a 40-card list.
- One-cost Character copies: Florida 4, Magician 5, HOA 2. Raw seven-card opening chance of at least one: 55.2%, 63.9%, 32.3%, respectively. Mulligans improve these; missing turn one is not automatically a loss or design defect.
- Ordinary turn-one Stash permits one cost-1 play, not a cost-1 Character plus cost-1 Item/Action. Subsequent budgets depend on actually retaining a card to Stash; there is no automatic ramp.

## Florida Man

Verified ideal line: turn 1 Chihuahua; turn 2 Driver; turn 3 Frat Bro; turn 4 attach Roman Candle (2) to Frat Bro, Attack and Defeat an eligible target, Victory Lap (1), Cause Trouble for 3, Driver Trouble for 2. Passive adds 1 Composure loss on the Attack victory. Net turn-4 pressure in supplied target scenario is 6. One Stash remains. Attack permission is not Trouble permission; newly played Frat cannot deliver turn-3 Trouble. Opposing Ready protection and Retaliate/Meat Shield can change target availability or survival.

Good: bodies work without full engine; cheap follow-ups fit once the attacker is already established. Need work: ensure test list has repeatable early draw/refill and enough combat-enabling tools. Newly played Hothead bodies plus buffs plus follow-ups cannot all fit an early turn merely because each card is cheap. Early Hothead without Sucker Punch may have no target, especially when playing first. Loudmouth is conditional pressure; it should not replace all unconditional Trouble bodies. Category 5 is late optional reset, not a normal play-line requirement. Reserve Victory Lap/refill resources before spending on a large deployment.

## HOA President

Verified ideal line: turn 1 Off-Leash Dog; turn 2 Church Usher (replaces itself); turn 3 Marine; turn 4 Vice President; turn 5 Grandma; turn 6 Grandma Trouble, Lawn Chair (2), activation (1) Readies Grandma/heals another body, Bicycle Cop (3). Six Stash spent, hand exhausted. Grandma cannot Attack/Cause Trouble again after Lawn Chair. Usher's replacement draw was necessary to supply this exact opening's extra turn-6 play while continuing Stash growth.

Good: sensible 2/3/4/5-cost ladder; surviving bodies retain value; healing engines connect without early free action loops. Need work: most expensive coverage distribution, sparse one-cost openings, significant hand pressure. Character-copy curve is 2/9/3/5/5/1/1 at costs 1–7. Turn-5 Grandma plus a fresh Lawn Chair and activation is an 8-resource package, not 5. Ready/heal value naturally begins next turn. Early Usher/Wait Them Out and conditional PTA/Nosey draw sustain progression; tune copies before adding generic draw. Meat Shield/Absorb/healing protect Characters, not Leader Composure: opponents can race with Trouble. This should be evaluated in real matches, not treated as missing blocking rules. At Round 8 existing eligible survivors gain +1 Trouble each; fresh turn-8 bodies still face entry restrictions. Founder costs 7 and its other-Character bonus additionally requires your Leader to be at Breaking Point/Last Straw. It is additive payoff, not the only route to finishing.

## Birthday Party Magician

Verified ideal line: turn 1 Volunteer; turn 2 Rabbit (draw); turn 3 Trap Door, using all 3 Stash; turn 4 Now You Don't (2) Dismisses Rabbit and an equal/lower-cost opposing Character, leader refunds 1, Trap Door captures Rabbit, release (1) replays it and draws; 2 resources remain for Opening Act (2) and immediate Trouble. Turn 5 established Opening Act Causes Trouble, Now You See Me (2) returns/replays that same card, leader refunds 1, new Opening Act Causes Trouble again. Net action cost 1, four Stash remain for other plays. Rabbit does not gain early Trouble from free replay.

Good: best hand replenishment and multiple viable smaller lines; free deployment/re-entry permission exceptions are explicit. Trap Door is one route, not necessary for every game. Need work: one Now You Don't and one Now You See Me make named chains inconsistent. Marked Deck and Hat compete for activation fuel; choose the needed payoff rather than activating everything. Headliner turn-6 deployment normally pays off turn 7; it must already be in play when another Character returns and cannot react retroactively. A turn-7 Poof on an eligible Rabbit, Rabbit Trouble/return, Headliner Trouble for 5 is legal provided they survive and ordering is correct. Pick a Card is speculative and opponent-influenced unless hand composition is deliberately managed; do not call it reliable curve acceleration. Multiple Opening Acts/return effects may create burst pressure; finite cost and once-per-turn Stash refund bound it, but rate needs testing. Rabbit cycles can consume deck rapidly; engine-heavy games need Last Straw monitoring.

## Recommended next work

Keep locked cards unchanged. Build separate focused 40-card playtest lists from the finished pools, retaining current coverage lists. Increase copies of early bodies and chosen engine connectors/payoffs, then test consistency, missing-piece fallback, card exhaustion and first/second-player timing. Start with HOA's hand supply/openings and Magician's repeated return/Opening Act rate. Apply the same method to Salvage after individual review. No competitive balance verdict or win-rate claim made here.
