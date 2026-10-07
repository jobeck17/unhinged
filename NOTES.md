🐈🎸 **Landon deck sync · 6 October 2026:** Crazy Cat Lady Lab 1.3 / STANK-66 behavior is promoted into Mordecai, including Strength in Numbers, Shoebox/Shovel, Snowball, Hairy Cat, Three-Legged Cat, and Mittens III. Washed-Up Rock Star’s dedicated Carl-era lab is promoted as a Mordecai TESTING translation: Bad Publicity Is Still Publicity now triggers on actual Composure lost rather than Leader damage. Its decklist is unchanged and requires fresh Mordecai playtest evidence before balance conclusions.\n\n# CURRENT — Mordecai 0.4 promoted 6 October 2026

🔒 **Production promotion:** Composure 2.0 is now **Mordecai 0.4**, the canonical Unhinged build. Root `RULES.md`, `CARDS.json`, and `DECKS.json` are authoritative. The 40-question core-rules interview is complete and the core is feature-complete for this playtest.

🔒 **Current core:** Characters use **Attack / Health / Trouble**. Leaders use **20 Composure**, unique printed **Breaking Point** at 10, and one hidden shared-pool **Last Straw** revealed at 0. Leaders cannot be Attacked. Characters choose **Attack / Cause Trouble / Stay Ready**. Ordinary Attacks target Rotated Characters; Ready protects from ordinary Attacks only. Cause Trouble is not combat and cannot be Blocked. There is no universal retaliation and no universal Response system.

⚠️ **Audit boundary:** older notes below contain Carl rules, superseded lab rulings, and historical experiments. They remain temporarily as design history. **If anything below conflicts with RULES.md, RULES.md wins.** Do not restore an older ruling merely because it remains below.

🎩 **Magician sync · 6 October 2026:** Landon’s STANK INDUSTRIES-66 Birthday Party Magician package is promoted into Mordecai 0.4. Production now uses 6× Rabbit (2-cost 1/3), 3× Magician’s Hat (cost 4; returns Rabbit/Dove), 2× Dove (2/1, 0 Trouble; enter/leave -1 permanent Health), 2× Do Not Look in the Hat, Beer-Stained Cards, 3-Attack Escape Artist/School Bully, and the Volunteer without its old automatic post-Attack Return. Now You See Me, Tech Bro, and Burner Phone are out of the baseline Magician deck.\n\n🧹 **Next production pass:** reconcile terminology/rules references; audit all eight decks, all cards and abilities, Leader passives, Breaking Points, Last Straw pool, Ready effects, legacy Responses, Leader-damage/healing text, Retaliate, deck exhaustion, simulator parity, browser parity, and builder compatibility.

## Reckless pool review · 6 October 2026

✅ **Style direction:** voluntary risk/reward, dangerous stunts, and press-your-luck choices. Self-damage may be a supporting consequence; it is not the required identity of Reckless. Rewards may affect Attack, Trouble, or other effects depending on the card.

✅ **Renames:** P002 Gas Station Daredevil → Designated Driver; P020 Send It! → SPRING BREAK!!!; P024 Commit to the Bit → Hey Y’all, Watch This! Card IDs, Costs, and deck quantities are unchanged. P002 and P020 retain their existing abilities pending individual review; SPRING BREAK!!! still requires conversion of its legacy Response wording.

🧪 **Hey Y’all, Watch This! — provisional risk/reward:** choose a Ready friendly Character and roll a d6. A final 1 Rotates it; 2–5 grants either +4 Attack or +2 Trouble this Turn; 6 grants both. After an initial 2–5, optionally reroll once, replacing the first result. Resolve only the final result. Revisit the effect and numbers during the Reckless card pass. Digital implementation is pending the existing Mordecai engine parity work; do not treat this as implemented or balance-tested.

🧪 **Unsupervised Toddler:** intended to use a dice effect. The previously proposed optional roll-and-push ability remains a candidate; no exact effect or numbers are finalized. Its canonical card text still needs replacement during its review.

---

🔒 **Lab ruling — universal Last Straw combat state:** while a Leader is at Last Straw, that player's Characters have Hothead and may Attack opposing Ready Characters. Hothead remains Attack-only and does not grant early Cause Trouble. This is the baseline comeback agency; the chosen Last Straw supplies the one-time comeback event. There is no universal mass-Rotate/reset on entering Last Straw.

## Composure 2.0 Last Straw work

🧠 The existing Last Straw concept bank remains in `lab/composure/LAST_STRAW_IDEAS.md` as promotion-era design history. The **shared hidden Last Straw architecture itself is now production**, not an experiment. During the upcoming cleanup, active candidates should be reconciled into the current production design record rather than treating the old lab file as rules canon.

# Unhinged — Living Design Notes

**Build:** Mordecai 0.4  
**Date:** October 4, 2026
This replaces scattered checkpoints, brainstorm files, open-decision files, and idea banks.

## Legend
✅ current/locked · 🧪 testing · 🧠 banked · 🗑 retired

## Development milestone
✅ **0.4 Mordecai** is the current core-systems-lock milestone. Composure 2.0 has been promoted; the next work is production consistency, content tuning, and implementation parity. The full versioning policy and road to 1.0 live in README.md.

## Current parallel testing direction — Composure 2.0, October 2026
🧪 **Merged experiment:** `lab/composure/` now tests the STANK INDUSTRIES-60 deck state against a **20 Composure** win-condition model. Characters use **Power / Guard / Trouble**. A Character may Attack a normally Rotated opposing Character using Power, **Cause Trouble** to reduce opposing Composure by its Trouble, or remain Ready and protected from ordinary attacks.

🧪 **Breaking Point / Last Straw:** 10 Composure is the first test **Breaking Point**. At 0 Composure the Leader does **not** lose. They hit **Last Straw**: the Leader-specific Last Straw hook triggers, then the current Turn proceeds to its normal end-of-Turn sequence. Last Straw does not universally Rotate Characters; battlefield changes come from the unique Last Straw ability. A later successful Cause Trouble by a Character with at least 1 Trouble against a Leader already at Last Straw makes that Leader **Unhinged** and loses the game. Leader-specific Breaking Point and Last Straw effects are intentionally pending the rules/card interview.

🔒 **Lab ruling — Leader durability:** Leaders do not have Health. Composure is the sole measurable Leader durability / victory track. Leader effects use lose/recover Composure; damage and healing remain Character concepts tied to Guard. Existing lab cards that still reference Leader Health, Leader damage, or Leader healing require terminology conversion during the card audit.

🔒 **Lab ruling — simultaneous Breaking Points:** if one effect causes both Leaders to cross 10 Composure, finish that effect, resolve them in their actual trigger order; if genuinely simultaneous, resolve the non-active (defending) player's Breaking Point first and the active player's second, then resume the current Turn normally.

🔒 **Lab ruling — simultaneous Last Straws:** if the same effect causes both Leaders to enter Last Straw, both Last Straw events resolve before play passes. Resolve Last Straws in their actual trigger order. If they were genuinely simultaneous, resolve the non-active (defending) player's Last Straw first, then the active player's, then complete the normal forced end-of-Turn sequence and pass to the next player in normal turn order.

🔒 **Lab ruling — deck exhaustion:** there is no deck-out loss. If a player would Draw from an empty deck before Last Straw, the failed Draw triggers Last Straw directly: set that Leader's Composure to 0 and resolve Last Straw normally. This is not Composure loss and does not retroactively trigger Breaking Point. Once already at Last Straw, attempts to Draw from an empty deck simply do nothing; do not reshuffle the discard. Only a later successful Cause Trouble can make the Leader Unhinged.

🔒 **Lab ruling — Last Straw turn order:** after the current effect finishes, resolve the entire Last Straw event first, including the Leader-specific Last Straw ability. Then force the current Turn through its normal end-of-Turn sequence and pass to the other player normally. Last Straw never grants an extra Turn, including when a player triggers their own Last Straw.

🔒 **Lab ruling — final Trouble prevention:** once a Leader is at Last Straw, only a successful Cause Trouble by a Character with at least **1 Trouble** can make that Leader Unhinged. A 0-Trouble Character may still Cause Trouble and resolve relevant triggers, but cannot finish the Leader. Reducing an acting Character to 0 Trouble is therefore valid Last Straw defense. Ordinary Composure prevention does not stop a final Cause Trouble that still has at least 1 Trouble; canceling/preventing Cause Trouble or explicitly preventing Unhinged can also stop it.

🔒 **Lab ruling — Last Straw limit override:** a Last Straw ability may explicitly exceed the normal Character limit. Excess Characters remain in play; no forced cleanup occurs merely for being over the limit.

🧪 **Five-Character limit remains TESTING, retained for now:** simulation did not show the cap materially fixing snowballing, so it is not justified as an anti-snowball rule. Keep the five-Character maximum in the current test as a battlefield-space / slot-management mechanic and judge it in human play. At five Characters, ordinary additions are prevented unless an effect explicitly overrides the limit. Last Straw may explicitly exceed it. Remove the cap later if the spatial decisions do not justify the rules baggage.

🔒 **Lab ruling — Last Straw board state:** entering Last Straw does not universally Rotate Characters or otherwise alter either battlefield. Board changes come from that Leader's unique Last Straw ability.

🔒 **Lab ruling — Last Straw deployment:** Characters put into play by a Last Straw effect are fully cooled down for the ensuing comeback Turn. They enter Ready unless the effect explicitly says otherwise and may take their normal Character action, including Attack or Cause Trouble.

🔒 **Lab ruling — forced Turn end:** after Last Straw resolves, the current Turn is forced into its normal end-of-Turn sequence. Scheduled end-of-Turn effects still resolve and normal cleanup occurs. Composure loss from those effects cannot make a Last Straw Leader Unhinged; only a later successful Cause Trouble can do that.

🔒 **Lab ruling — simultaneous multi-threshold order:** when one effect causes multiple Leaders to cross both thresholds, resolve all crossed Breaking Points before any Last Straws. Within each threshold layer, actual trigger order applies when distinguishable; if genuinely simultaneous, the non-active (defending) player resolves first.

🔒 **Lab ruling — crossing both thresholds:** if one Composure-loss effect crosses both Breaking Point and Last Straw for the same Leader, finish that effect, then resolve Breaking Point first and Last Straw second. Deck exhaustion remains the explicit exception: a failed Draw from an empty deck triggers Last Straw directly and does not trigger Breaking Point.

🔒 **Lab ruling — threshold timing:** finish the current effect completely before resolving a crossed Breaking Point or Last Straw threshold. Breaking Point and Last Straw abilities are protected Leader game events and cannot be interrupted.

🔒 **Lab ruling — Breaking Point:** every Leader starts at 20 Composure and has the same universal Breaking Point threshold at **10 Composure**. Breaking Point triggers once per game. Every Leader gets a unique Breaking Point ability and a unique Last Straw ability; the abilities themselves remain to be designed and audited.

🔒 **Lab ruling — recovery:** before Last Straw, Composure may be recovered up to 20. Breaking Point triggers only once even if the Leader later recovers above 10. After Last Straw triggers, that Leader remains permanently at 0 Composure and cannot recover it; Last Straw cannot retrigger.

🧪 **20 Composure baseline:** the earlier 25-Composure target was chosen before Last Straw existed. Because Last Straw is expected to add roughly 1–2 rounds of final-act gameplay, 20 is now the working test baseline. This is a hypothesis to simulate and human-test, not a balance claim.

🔒 **Lab ruling — opening:** the first player skips their first Draw. The second player receives no temporary setup Stash and Draws normally on their first Turn.

🧪 **Critical separation:** Cause Trouble cannot be Blocked and is not combat. It Rotates the Character, immediately applies Trouble to Composure, and leaves that Character exposed to ordinary attacks on the opponent's Turn. A Character cannot Cause Trouble on the Turn it enters play, even if it has Hothead.

🧪 **STANK combat variable:** STANK 60's no-universal-retaliation experiment remains active; Backyard Wrestler's Wrestlers retain Retaliate. This is separable from the win-condition experiment.

🧪 **Controlled baseline:** Carl 0.3 remains canonical. Five Character slots remain a lab architecture constraint, not an anti-snowball claim.

🔒 **Lab ruling — Trouble stat:** every Character has a printed Trouble value, and 0 is valid. A 0-Trouble Character may still take the Cause Trouble action; without a modifier or other effect it causes 0 Composure loss. This keeps Trouble a universal Character stat and preserves Cause Trouble triggers without a special eligibility exception.

🔒 **Lab ruling — Leader targeting:** Leaders cannot be Attacked. Attacks are Character-versus-Character combat only. Cause Trouble is the Character action used against the opposing Leader's Composure. Power governs Character combat, Guard governs Character durability, and Trouble governs Composure progress. The old Leader-blocking combat step does not apply in this model.

🔒 **Lab ruling — Cause Trouble:** Cause Trouble is not combat and cannot be blocked. An eligible Ready Character Rotates to Cause Trouble and applies its Trouble to the opposing Leader's Composure. The resulting Rotated Character is then exposed to ordinary Attacks.

🔒 **Lab ruling — persistent damage:** damage remains on Characters until an effect removes/heals it or the Character leaves play. A Character is Defeated immediately when its accumulated damage equals or exceeds its Guard.

🔒 **Lab ruling — Retaliate:** universal retaliation is removed. **Retaliate** is a dedicated keyword: “When this Character survives an Attack, it deals its Power as damage to the attacking Character.” A Character Defeated by the Attack does not Retaliate unless an effect explicitly says otherwise. Retaliation occurs only when a keyword or effect grants it.

🔒 **Lab ruling — attack eligibility:** ordinary Attacks may target only opposing Rotated Characters. Ready Characters are protected from ordinary Attacks unless card text explicitly overrides that rule. Attack and Cause Trouble therefore both normally expose the acting Character by Rotating it, while staying Ready preserves ordinary attack protection.

🔒 **Lab ruling — Hothead:** Hothead allows a Character to Attack the Turn it enters play. It does not allow that Character to Cause Trouble early. Cause Trouble normally requires the Character to have begun the Turn under its controller's control unless an effect explicitly overrides that requirement.

🔒 **Lab ruling — Ready effects:** there is no universal once-per-Turn Attack-or-Cause-Trouble cap. If an effect Readies a Character outside the normal Ready step, that effect dictates any restriction on what the Character can do afterward. Example: “Ready a Character. It cannot Cause Trouble for the rest of this Round.” Existing Ready cards require individual audit so they do not accidentally enable unintended Attack/Trouble double-dips.

🔒 **Lab ruling — Responses removed:** the Trouble / Last Straw direction removes the universal Response system. Cause Trouble therefore has no Response window. Three legacy lab cards still carry Response wording and require deliberate redesign during the card audit rather than automatic conversion. Canonical Carl remains unchanged until promotion.

🧪 **Open audit:** the new win condition touches old Leader-damage cards, Leader healing/recovery, Responses, end-of-Turn timing, Ready effects, direct Composure loss, threshold effects, the five-slot rule, AI priorities, every Leader, and deck/card valuation. Resolve these deliberately through the next rules/card/deck interview before promotion.

## New parallel testing direction — Board Width Lab, October 4, 2026
🧪 **Implemented independently:** `lab/board-width/` tests five Character slots, no universal blocking, attacks against opposing Leader or opposing **Rotated Characters only**, simultaneous Character combat, and free automatic trigger cascades. Ready Characters remain protected from normal attacks; removal Actions can target them. This corrects the earlier conversation suggestion to attack any Character. Carl 0.3 and Scheme Lab are unchanged.

🧪 **Third option hypothesis:** preserve a Ready aura or automatic engine instead of attacking. Fourteen compact LAB cards and two 40-card control decks include full-board/exact-count On Play effects plus one Trench Coat stacking/storage example that reopens a slot; no broad expansion or fusion package. Browser has adjacent opposing/player battlefield rows, on-card Health/state, and direct board clicks for attacks, Actions, Responses, and stacking targets.

🧪 **Cadence remains open:** full Turns are a provisional control baseline, not a decision against alternating actions. Define that cadence separately before implementing it; do not meter automatic combo triggers as actions. Width is configurable in engine tests, with five as browser default. The earlier hold on board caps is explicitly reopened for this isolated experiment only.

🧪 **Status:** regression/simulation/browser verification, not balance certification or proof of fun. Human questions: protected-engine counterplay, race pressure without blocking, width frustration, meaningful preservation, and whether stacking supports memorable combos. Exact experimental rules, tests, and failure conditions live in the lab README. Neither experiment is promoted; Scheme Lab remains available for separate comparison.

## Proposed next direction — Scheme Lab, October 3, 2026
🧪 **Decision for the next prototype:** Character-first combat plus one exposed worker advancing a visible Leader Scheme. Simultaneous combat damage makes trading a credible answer to a superior board. One work opportunity per Turn prevents a wider board from multiplying Scheme progress. Earned progress survives a lost board; the current job does not survive removal of its worker.

🧪 **Implemented:** `lab/schemes/` contains an independent playable test with eight 40-card decks, 71 fully supported card definitions, bot/local two-player play, one shared browser/simulation engine, regression tests, and controlled comparisons. Exact experimental rules and failure conditions live in its README. Recorded simulation results are heuristic evidence, not proof of fun or final balance.

🧪 **Card/Leader direction:** conditional Cat economy rather than permanent free ramp; bounded Florida triggers; preserve opposing response resources by replacing Trash Baron's resource spending; HOA earns its closing payoff through work instead of waiting for automatic unblockability; Scientist adds one optional die reroll and uses a retuned battery. Passives, Schemes, and card text in this LAB are deliberate new versions, not descriptions of Carl.

🧪 **Human gate:** ten swapped-start games, emphasizing smaller-board recovery, real attack/protect/work choices, Scheme disruption, and desire to play again. Promote only what succeeds; a structural promotion would be 0.4 with a new DCC character codename.

🧠 **Hold until that gate:** expanding the 180-card pool, additional currencies, universal lanes, more response windows, board/attack caps, generic stat upgrades, and additional dexterity modules. Keep spectacle in Leader packages and a few marquee cards. This direction does not add an alternate automatic-win score.

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
