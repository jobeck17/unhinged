# Donut Revision 2 — What Changed and Why

> Historical revision notes. The [revision 3 roster follow-up](revision-3-notes.md) records later requested names and effects; current generated sheets use revision 3.

23 September 2026 · Based on repository commit `5dcab3b` · Core remains **0.1 Donut**; this is a card revision, not Core 0.2.

## The design problem

The first production pool had 92 Characters printing Human, 22 Character Trait labels, no textless Characters, and no Character with its own explicit Rotate activation. Some labels were broad mood words, while Wrestler appeared on only one deck Character. Item-rotation cards often affected Items with no Rotate cost. The rulebook also left attack-bonus timing ambiguous.

This revision gives the simple cards useful bodies and identity, gives the complex cards a reason to earn their text, and makes the recurring labels connect actual cards. It preserves 180 deck cards, their stable IDs, the six Styles, and the six Leader identities.

## Before and after

| Measure | Previous Donut pool | Revision 2 |
| --- | --- | --- |
| Deck cards | 180 | 180 |
| Characters / Actions / Items | 108 / 48 / 24 | 108 / 48 / 24 |
| Printed Character Trait labels | 22 | 18, each with explicit support |
| Characters printing Human | 92 | 0; unprinted audit metadata retained |
| Textless Characters | 0 | 27 (25%) |
| Keyword-only Characters | 1 | 6 |
| Characters with explicit Rotate activations | 0 | 29: 24 dedicated, 5 with another ability |
| Items with Rotate activations | 2 | 11 |

The generated [audit](audit.md) gives the exact mutually exclusive complexity categories and Cost curves. These are editorial measurements, not evidence of balance.

## Traits with a job

Eighteen current labels: Animal, Undead, Construct, Rat, Kid, Parent, Criminal, Musician, Pirate, Scout, HOA, Daredevil, Wrestler, Scavenger, Builder, Hacker, Clown, and Magician.

The soft 3–15% guide uses unique deck Characters. Three-card groups are intentionally accepted at 2.8%; Daredevil is the largest at 15 Characters (13.9%). Rat and Animal are separately printed where appropriate. Neither a name pun nor a species assumption creates a hidden Trait. Zero Traits is valid.

Most support improves an otherwise useful effect: Wedding DJ can boost any friendly Character, then rewards Musicians and Clowns; Scavenger improves Used Ham Sandwich; Construct improves Duct Tape. A few searches deliberately restrict what they find, while the Character carrying the search still functions as a body.

Magician, Hacker, and Wrestler remain concentrated in one Style. This is a documented exception to the cross-Style preference, not a reason to mislabel unrelated Characters. Zombie is reserved because Undead already carries this pool's recursion identity. Human and generic labels such as Party, Team, Neighbor, and Menace leave the printed taxonomy.

## Three keywords, clear boundaries

Explosive and Slowpoke retain their blocking roles. **Hothead** replaces repeated entry-Round Attack permission. It grants neither an early Rotate activation nor an extra Ready. The new keyword is a playtest choice, not a final user lock.

No Style needs its own exclusive keyword. Jerry-Rig remains earmarked. Encore!, Scrounge, and Pick a Card are card titles, not extra global rules to memorize.

## Stronger fiction and choices

- **Pick a Card:** choose which card to conceal; the opponent guesses Character or not Character. A wrong guess rewards you with two cards; a correct guess gives filtering. The information and your choice matter, and the reveal ends immediately.
- **Birthday Kid Who Knows the Trick:** can profit when revealed from hand. Its text explicitly works in that zone and checks that the card is still there before moving it.
- **Reunion Tour Drummer:** a simple Undead Musician that joins two useful groups without another triggered ability.
- **Scout With a Flare Gun:** risks friendly damage for filtering. A Scout holding Roman Candle avoids the Item's self-damage clause.
- **Shopping Cart Golem:** a simple Construct / Scavenger that takes advantage of repair and salvaged-food support.
- **Concrete Goose:** a huge Slowpoke obstacle. Its flavor line is “The association has approved its use of force.” The joke does not make it an HOA member.
- **Rotate Characters:** using their ability leaves them open to direct Attack and unavailable to Block. They give the player an explicit decision on their own Turn.

## Revised roster slots

Stable IDs follow these unpublished playtest slots. They do not assert that an earlier printing with different rules would be interchangeable in a finished product. Removed concepts remain in the [idea bank](../../brainstorm/ideas.md) and git history.

| ID | Previous concept | Current concept |
| --- | --- | --- |
| P007 | Bottle-Rocket Enthusiast | Scout With a Flare Gun |
| P037 | Dance Mom | Reunion Tour Drummer |
| P044 | Little League Assistant Coach | Clown Who Booked the Wrong Gig |
| P091 | Dumpster Engineer | Scout Troop Quartermaster |
| P100 | Free Puppies Guy | Last-Shift Zombie |
| P106 | Alley Bruiser | Shopping Cart Golem |
| P138 | Pool Rules Guy | HOA Pool Monitor |
| P151 | Overenthusiastic Volunteer | First-Time Wrestler |
| P158 | Crash-Test Intern | Patio-Table Prodigy |
| P166 | Backyard Wrestling Hype Man | Backyard Tag-Team Captain |

## Manual rules and interaction review

These are text-level walk-throughs against the written rules, not games executed in a Donut engine.

| Scenario | Intended resolution checked |
| --- | --- |
| Gas Station Daredevil damages itself on Attack | Its +2 Power resolves before Blockers are chosen. If the self-damage Defeats it, the Attack ends without attack damage. |
| Hothead is Readied after attacking on its entry Round | It may Attack again unless prohibited, but still cannot use its own Rotate activation that Round. |
| Unsupervised Toddler is Defeated while Blocking | Explosive allows retaliation using its last Power. Its reveal ability is an Attack trigger, so Blocking does not reveal a card. |
| Concrete Goose survives a direct Attack while Rotated | It retaliates normally. Slowpoke suppresses only blocking retaliation. |
| New Roman Candle attached to a newly played Scout | The Item may Activate immediately; the Character's own Rotate activation must wait. The Scout exception prevents the Candle's friendly damage. |
| Script Kiddie Rotates an Item | A Rotate cost becomes unavailable. Static, triggered, and Dismiss-only text still functions. IT Guy explicitly disables activations instead. |
| Folding Chair or Bath Salts is Dismissed to pay its activation cost | The effect uses the former attached Character. Static benefits end immediately, and the effect fails to affect that Character if it has left play. |
| A Character with Bath Salts is Sacrificed for Light the Fuse | Last-known Traits include Undead, so the Action deals 2 Leader damage. Attached-Item cleanup is not Dismiss. |
| Junkyard Enforcer gains temporary Guard | Temporary Guard absorbs incoming damage without leaving persistent damage behind. Ordinary Round-long Guard bonuses instead raise the threshold and can leave a Character Defeated when they expire. |
| Zombie Mall Walker's return is pending | It Returns at the end of the Round only if it has not left that discard in the meantime. It cannot be claimed a second time from another zone. |
| Dumpster Phoenix pays its Sacrifice activation cost | The Return target must already be in discard before costs are paid. The Character being Sacrificed is not a legal target for that same activation. |
| Birthday Kid is revealed by Pick a Card | Its hand trigger waits until Pick a Card finishes. If the Kid was Discarded during the Action's filtering, the bottom-deck option fails. |
| Wrong Address faces two or more Characters | Choose two; the opponent chooses which Returns. The caster cannot choose only one to bypass the opponent's decision. |
| General Contractor or Softball Mom is Readied repeatedly | Each printed once-per-Round activation limit still applies to that instance, preventing an unrestricted Ready chain. |
| An Item or Character has no legal enters-play trigger target | Playing the permanent remains legal. Only that trigger does nothing. |

## Packages to test next

| Pairing | Starting package | Evidence to collect |
| --- | --- | --- |
| Gnarly + Wasted | Daredevils, self-damage, Stunt Clown, Sacrifice effects | Do dangerous choices create decisions, or only fast Leader damage? |
| Amped + Tricky | Wedding DJ, Clowns, cheap replay targets, Escape Artist, Pick a Card | Does the sequence leave time for the opponent to interact? |
| Sketchy + Tricky | Item machinery, Hacker disruption, Return effects | Does Item interaction matter without locking a player out? |
| Sketchy + Wasted | Rat King, Rabid Rat, Undead, repair and recursion | Are there enough bodies, and does recurring value end games rather than stall them? |
| Amped + Spiteful | Parents, Kids, defensive buffs, support activations | Is spending a Turn on support worth giving up a Ready Blocker? |
| Gnarly + Sketchy | Scouts, Roman Candle, Builder support, Dismiss payoffs | Are repeated Item pings and Item-Ready effects priced appropriately? |

Watch the six printed Hothead Characters, repeatable Roman Candle damage, zero-Cost sequencing, late-game recursion, stacked defensive debuffs, and the lack of 1-Cost Characters in Amped and Spiteful. These are concrete next-test questions, not established defects or balance claims.

Leader Health and ability packages remain open. No new match simulations were run; Mongo uses obsolete mechanics. The next balance test must use this exact card revision and the current Donut rules.
