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
6. Which cards are true “hell yeah” marquee cards?
7. Which Response windows add interaction without rules drag?
8. Which physical-card experiments earn permanent space?

## Next
1. Play all six Carl mono decks through the browser and paper.
2. Record feel issues separately from balance issues.
3. Investigate Reckless portability and Momentum dilution.
4. Test one variable at a time, then rerun the 36-field scan.
5. Promote only successful changes into RULES.md / CARDS.json / DECKS.json.
6. Then return to marquee cards, physical interactions, and production visuals.

## Guardrails
✅ Characters are the core game. Persistent engines mostly belong on Characters and Items.  
✅ Prefer static, On Play, Attack/Block, survival, and leave-play effects over forests of Rotate abilities.  
✅ Keep arithmetic light and board state legible.  
✅ Interaction should create decisions, not routinely stop the opponent from playing.  
✅ Aggro should not get effortless Leader kills. Synergy and matchup texture matter.  
✅ Four copies supports predictability.  
✅ Card layout prioritizes Cost/type, clean text, recurring symbols, and color-blind readability.  
✅ Leaders should bend rules or play patterns, not merely grant stats.

## Vocabulary
✅ Hothead, Defiant, Explosive, Slowpoke, Sucker Punch, Jerry-Rig, Chicken, Stubborn, Bodyguard. Sucker Punch and Bodyguard remain working names.  
🧠 Candidate mechanics: Step Aside, Overkill, Ricochet, Freeloader, Last Laugh, Nosy.

## Physical-card / bluff vault
🧠 Face-down bluffing remains the strongest reason to use card backs mechanically.  
🧠 Inconspicuous Bush future version: hide a Character costing up to 5; Rotate to Dismiss Bush and put it into play.  
🧠 Hot Potato changes sides. Jailbroken Robot Vacuum stores/tucks cards. Trench Coat stores Child Characters. Lost & Found, Last Slice of Pizza, Do Not Push This Button, and Unofficial Reverse Card remain saved hooks.  
🗑 Road/map card backs were tabled because decks intermingle and become annoying to separate.

## Card / world vault
🧠 Magician's Assistant should lean into Return/removal/re-entry magic.  
🧠 Cloak naturally belongs in Magician; memorable concept is a 1-Guard, high-Power threat built around tricky survival/retaliation.  
🧠 Bath Salts grants Undead.  
🧪 Pet Alligator — Probably Domesticated is the first live rare dice-chaos card: 3-Cost Reckless Animal, 4/3; on attack roll a d6, and on a 1 the Attack is canceled and it damages its own Leader for its Power.
🧠 If Leader ultimates ever return, Florida's dice-damage “Hold My Entire Cooler” remains saved. Ultimates are not a Carl base rule.  
🧠 Boss Babe/MLM, Travel Ball Mom, Unsupervised Toddler chaos, Cockroach recursion, Clown Car, Creepy Van/Free Puppies, bachelorette party, feral child, cat lady, Girl Scouts, zombie kid, mall walker, influencer, single dad, grumpy old guy, jam band, pirates, wedding cover band, Put It in Reverse Terry, gas-station food/energy-drink weirdness.  
🧠 Tone compass: mythic stakes colliding with swamps, gas stations, junkyards, backyards, birthday parties, dive bars, and HOA meetings.

## Future, not Carl base
🧠 PvE/co-op, Locations, hidden Leader defenses, alternate lane/simultaneous-planning formats.

## Retired
🗑 Command/Stamina, Fuel terminology, single-action turns, frontline/backline/lanes as base game, Guard discard, multiple default Blockers, vulnerable-Leader combat stats, current Leader Charge/ultimates.  
🗑 Stack, Cloak, Sneaky, Step Aside, Overkill are not current starting-set keywords. Return only through explicit experiments.

## Repository rule
Do not create another dated checkpoint or separate idea bank. Update this file. Git history is the archive.
