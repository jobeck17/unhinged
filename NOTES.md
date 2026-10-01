# Unhinged — Living Design Notes

**Build:** Carl 0.3  
**Date:** October 1, 2026  
This replaces scattered checkpoints, brainstorm files, open-decision files, and idea banks.

## Legend
✅ locked for Carl · 🧪 testing · 🧠 banked · 🗑 retired

## Development milestone
✅ **0.3 Carl** is the current core-stabilization milestone. Meaningful compatible checkpoints within Carl use 0.3.x build numbers; ordinary commits do not require a version bump. Major pre-1.0 generations advance to the next 0.X number and receive a new Dungeon Crawler Carl character codename. The full versioning policy and road to 1.0 live in README.md.

## What we know for now
✅ Leader-centered, Character-first, synergy-forward game. 40-card deck, one Leader outside the deck, 25 Health, four-copy maximum.  
✅ Leader Style plus at most one secondary Style. Styles: Reckless, Momentum, Misdirection, Salvage, Stonewall, Expendable.  
✅ Full Turns. War winner goes first every Round and skips the first Draw. Second player gets setup temporary Stash.  
✅ Stash is the resource system. One normal Stash opportunity per Round on your Turn.  
✅ One Blocker on Leader Attacks, overflow, retaliation from surviving Blockers. Direct Character Attacks cannot be Blocked and surviving targets retaliate.  
✅ Ready Characters normally cannot be attacked; Sucker Punch breaks that rule.  
✅ Responses are timed Actions. Traits are inert unless referenced.

## Current creative direction — make it actually Unhinged
🧪 **Fun and desire come before balance polish.** The first design question is not “is this efficient and balanced?” It is **“do I read this and immediately want to play it?”** Balance still matters, but it supports the fantasy instead of defining it.

🧪 **The base game should stay simple enough that decks can become ridiculous.** Core combat, Stash, Characters, blocking, retaliation, and Leader health provide the stable chassis. Weirdness should primarily live in Leaders, build-arounds, marquee cards, and deck-specific rule breaking.

🧪 **A great Unhinged deck creates a play pattern, a table moment, and a story.** The benchmark is not merely mechanical distinction. The player should be able to describe what their deck is trying to *do* in a sentence that sounds fun before anyone knows whether it is competitively strong.

🧪 **Fragile Rube Goldberg win machines are allowed.** A complicated multi-card engine may become effectively game-winning if the player actually assembles and resolves it. The surrounding deck must still function when the machine does not go off, and the opponent should have meaningful ways to disrupt it. Do not balance the triumphant payoff into mediocrity merely because the completed machine is powerful.

🧪 **Preserve the outrageous part, then find counterplay, then tune numbers.** Preferred workflow:
1. Find the irresistible idea.
2. Identify the part that creates the “I have to play this” reaction.
3. Protect that part through iteration.
4. Add understandable counterplay.
5. Tune cost, frequency, consistency, and surrounding support last.

🧪 **Physical interaction is part of the design palette.** Tossing, flipping, balancing, stacking, flicking, rolling, overlapping, and other tactile actions are valid when the action feels native to the character/deck. Do not turn every deck into a dexterity minigame. Each physical mechanic should feel inevitable for its theme.

🧪 **Current benchmark prototypes:**
- **Crazy Cat Lady** — Snowball. Establish and protect 3+ Cats to turn Cat Distribution System into accelerating Stash. The opponent can see the colony becoming a problem and has time to disrupt it.
- **Mad Scientist** — Burnout. Begin with a finite five-charge protected battery, spend recklessly, recharge slowly, and fuse Characters into independently randomized Power/Guard Abominations. Sometimes science works. Sometimes it produces a 1/6.
- These remain **LAB prototypes**, not Carl 0.3 production rules, but they currently best demonstrate the intended emotional target for future decks.

🧪 **Natural counters are preferable to bespoke hate.** Board wipes are an especially important shared counter to both current Rulebreaker prototypes: they reset Cat Lady's colony and erase the persistent board value Mad Scientist purchased with a finite battery.

## Locked Carl Leaders
✅ Florida Man: damaged Characters have Hothead and Sucker Punch; after a damaged Character survives combat with another Character, Ready it.  
✅ Rock Star: before Ready, refill to 2 at 1 or fewer cards; at 3 or more skip Draw; at exactly 2 Draw normally.  
✅ Magician: once during your Turn, a friendly Return readies 1 Stash.  
✅ Trash Baron: may spend opposing Ready Stash.  
✅ HOA President: from Round 8, opposing Characters cannot Block HOA Attacks.  
✅ Backyard Wrestler: once during your Turn after a friendly Defeat/Sacrifice, reveal top card; a qualifying Expendable Character up to Stash count enters with Hothead, otherwise goes to hand.

## Balance checkpoint
Accepted 36-field: 63,000 games, 100 per pairing, generated 24/16 dual-Style shells.
- Trash Baron family 54.99%
- Rock Star 53.30%
- Florida Man 51.03%
- HOA 48.02%
- Wrestler 46.57%
- Magician 46.10%
Top signals: Trash + Reckless 60.97%, Rock + Stonewall 59.00%, Florida mono 58.03%. Weak generated Momentum secondaries: Wrestler 38.66%, Magician 39.26%, HOA 40.06%.

🧪 Treat that as an anomaly map, not a final metagame. Reckless travels well; Momentum loses a lot when diluted.

## Questions now
1. Is combat fun for roughly 8–10 Rounds in human play?
2. Does Florida's survival Ready create choices rather than repetitive chains?
3. Does Misdirection feel clever and interactive in human hands?
4. Does Momentum need more standalone cards to work as a secondary Style?
5. Is Reckless too generically efficient outside Florida?
6. Which cards and Leaders pass the **hell-yeah test** immediately, before balance tuning?
7. Which Response windows add interaction without rules drag?
8. Which physical-card experiments earn permanent space?

## Next
1. Play all six Carl mono decks through the browser and paper.
2. Record feel issues separately from balance issues.
3. Investigate Reckless portability and Momentum dilution.
4. Test one variable at a time, then rerun the 36-field scan.
5. Promote only successful changes into RULES.md / CARDS.json / DECKS.json.
6. Revisit each current Leader/deck against the Crazy Cat Lady / Mad Scientist benchmark: does it create a unique play pattern and a memorable moment?
7. Develop marquee cards and physical interactions that pass the hell-yeah test before balance polish.

## Guardrails
✅ Characters are the core game. Persistent engines mostly belong on Characters and Items.  
✅ Prefer static, On Play, Attack/Block, survival, and leave-play effects over forests of Rotate abilities.  
✅ Keep arithmetic light and board state legible.  
✅ Interaction should create decisions, not routinely stop the opponent from playing.  
✅ Aggro should not get effortless Leader kills. Synergy and matchup texture matter.  
✅ Four copies supports predictability.  
✅ Card layout prioritizes Cost/type, clean text, recurring symbols, and color-blind readability.  
✅ Leaders should bend rules or play patterns, not merely grant stats.
🧪 **Spectacle before polish:** Unhinged may support elaborate, fragile combo machines whose payoff is effectively game-ending if the player actually assembles and resolves them. The surrounding deck should still function when the machine does not go off. Balance work should preserve the triumphant payoff rather than sanding it down into ordinary efficiency.
🧪 **Hell-yeah test:** before tuning a marquee card or Leader package, ask whether reading it immediately makes someone want to play it and whether resolving it can create a story worth retelling.

## Vocabulary
✅ Hothead, Defiant, Explosive, Slowpoke, Sucker Punch, Jerry-Rig, Chicken, Stubborn, Bodyguard. Sucker Punch and Bodyguard remain working names.  
🧠 Candidate mechanics: Step Aside, Overkill, Ricochet, Freeloader, Last Laugh, Nosy.

## Physical-card / bluff vault
🧠 Face-down bluffing remains the strongest reason to use card backs mechanically.
🧪 **Physical verbs worth exploring:** throw, flip, spin, flick, balance, stack, overlap/touch, build-until-collapse, and sequential/pass-it-on actions. Use these sparingly and thematically rather than as generic minigames.
🧪 **Paper Football family** — Package a small foldable/cardstock triangular football token rather than using a game card. Candidate effects:
- **Touchdown:** flick from your edge toward the opponent's edge; stopping with part of the football hanging over the far edge is the premium result, while falling off is a turnover/failure.
- **Extra point:** after a touchdown, the opponent forms finger goalposts and the player may attempt a bonus flick.
- **Fourth and Stupid:** up to four flicks, with each new flick starting where the football stopped; falling off ends the attempt. Possible escalating reward / “take the points or keep going” structure.
- Hail Mary / Going for Two / Home Field Advantage are saved hooks.
The important design constraint is that the physical result determines the outcome; the player does not assign a favorable interpretation after seeing where the football lands.
🧪 **Bottle-stack / Waterfall family** — Explore a bottle or safe bottle-shaped marker with cards balanced progressively across its top, inspired by drinking-game/card-stacking play. Players add cards one at a time, creating an increasingly unstable structure until a placement causes collapse. The collapse should have a meaningful game consequence and all cards should return cleanly to normal zones afterward. This is a physical tension mechanic, not an endorsement or requirement of alcohol.
🧪 **Drinking-game structure without drinking:** Waterfall sequencing, push-your-luck continuation, make-a-rule effects, categories/chains, flip-cup style success/failure, and shared escalating structures may inspire cards when converted into clean game actions.  
🧠 Inconspicuous Bush future version: hide a Character costing up to 5; Rotate to Dismiss Bush and put it into play.  
🧠 Hot Potato changes sides. Jailbroken Robot Vacuum stores/tucks cards. Trench Coat stores Child Characters. Lost & Found, Last Slice of Pizza, Do Not Push This Button, and Unofficial Reverse Card remain saved hooks.  
🗑 Road/map card backs were tabled because decks intermingle and become annoying to separate.

## Card / world vault
🧠 Magician's Assistant should lean into Return/removal/re-entry magic.  
🧠 Cloak naturally belongs in Magician; memorable concept is a 1-Guard, high-Power threat built around tricky survival/retaliation.  
🧠 Bath Salts grants Undead.  
🧪 Pet Alligator — Probably Domesticated is the first live rare dice-chaos card: 3-Cost Reckless Animal, 4/3; on attack roll a d6, and on a 1 the Attack is canceled and it damages its own Leader for its Power.
🧠 If Leader ultimates ever return, Florida's dice-damage “Hold My Entire Cooler” remains saved. Ultimates are not a Carl base rule.
🧪 **From the Top Rope!** — Backyard Wrestler physical-card experiment. Working version: choose a Wrestler you control, lift/toss that Character card above the play area, and let it land naturally. Every other card it overlaps when it comes to rest takes **1 damage if the Wrestler lands face up** or **2 damage if it lands face down**. The landing orientation is random and is not chosen after the toss. Return the Wrestler to its previous board position after resolving the impact. Exact Cost, toss/drop procedure, whether Items may be hit, and whether the Wrestler risks self-damage are TBD. Preserve the physical spectacle first; tune for safety, repeatability, and table clarity later.  
🧠 Boss Babe/MLM, Travel Ball Mom, Unsupervised Toddler chaos, Cockroach recursion, Clown Car, Creepy Van/Free Puppies, bachelorette party, feral child, cat lady, Girl Scouts, zombie kid, mall walker, influencer, single dad, grumpy old guy, jam band, pirates, wedding cover band, Put It in Reverse Terry, gas-station food/energy-drink weirdness.  
🧠 Tone compass: mythic stakes colliding with swamps, gas stations, junkyards, backyards, birthday parties, dive bars, and HOA meetings.

## Future, not Carl base
🧠 PvE/co-op, Locations, hidden Leader defenses, alternate lane/simultaneous-planning formats.

## Retired
🗑 Command/Stamina, Fuel terminology, single-action turns, frontline/backline/lanes as base game, Guard discard, multiple default Blockers, vulnerable-Leader combat stats, current Leader Charge/ultimates.  
🗑 Stack, Cloak, Sneaky, Step Aside, Overkill are not current starting-set keywords. Return only through explicit experiments.

## Repository rule
Do not create another dated checkpoint or separate idea bank. Update this file. Git history is the archive.
