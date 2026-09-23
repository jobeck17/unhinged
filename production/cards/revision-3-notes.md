# Donut Revision 3 — Requested Roster Follow-up

23 September 2026 · Core 0.1 Donut · Follows commit `fa57566`.

Every requested concept is represented in the active pool, including both Grandma’s Cigarette Case and Tag Me In!, and both Glory Days and Peaked in High School. Gym Bro is the alternate concept name for Gym Selfie Guy, not a second card.

## Request coverage

| Requested concept | ID | Style | Type | Treatment |
| --- | --- | --- | --- | --- |
| Used Ham Sandwich | P120 | Sketchy | Item | Existing Item retained |
| Grandma’s Cigarette Case | P150 | Spiteful | Item | Existing Item retained |
| Tag Me In! | P172 | Wasted | Action | Action; damaged-Character swap with a Wrestler bonus |
| Crazy Cat Lady | P099 | Sketchy | Character | Renamed Cat Lady; Animal support retained |
| Alien Abduction Victim | P063 | Tricky | Character | Character; human victim, not an Alien Trait assignment |
| Kid With an iPad | P067 | Tricky | Character | Character; Kid Trait |
| Reply All | P049 | Amped | Action | Action; everyone draws, then you draw again |
| Tech Bro | P070 | Tricky | Character | Character; replaces Crypto Bro |
| Giga Chad | P012 | Gnarly | Character | Character |
| Coupon Lady | P123 | Spiteful | Character | Existing Character retained |
| Doomsday Prepper | P095 | Sketchy | Character | Character; salvaged bunker supplies fit Scavenger |
| Glory Days | P021 | Gnarly | Action | Action; Ready an experienced attacker for another role |
| Peaked in High School | P042 | Amped | Character | Character; former star rallying the next generation |
| Gym Bro / Gym Selfie Guy | P160 | Wasted | Character | Gym Selfie Guy is the title; Gym Bro is a searchable alternate name |
| Vape Kid | P017 | Gnarly | Character | Character; Kid replaces Daredevil |
| Keyboard Warrior | P125 | Spiteful | Character | Character; gets braver while others Block |
| Basic White Girl | P045 | Amped | Character | Character; no Parent or demographic gameplay Trait |
| Neighborhood Lifeguard | P138 | Spiteful | Character | Replaces HOA Pool Monitor; no HOA Trait or HOA ability condition |

## Three purposeful text changes

**Reply All — P049, Amped Action, Cost 1**

> Each player Draws a card. Then Draw a card.

The joke is a shared inbox: both players receive the first card, and the player who played the Action gets another. This replaces Group Text's private draw-and-discard effect. It is ordinary Action timing, not a Response.

**Tag Me In! — P172, Wasted Action, Cost 2**

> Return one of your damaged Characters to your hand. If you do, you may Play a different Character from your hand with equal or lower Cost without paying its Cost. If the returned Character was a Wrestler, the new Character gains Hothead this Round.

The swap works without Wrestlers. A Wrestler improves it by granting entry-Round Attack permission to the replacement. “Different” means a different physical card; another copy of the same title is allowed, but immediately replaying the returned card is not. Compare printed Cost and the returned Character's last Traits in play. A non-Wrestler replacement follows the ordinary arrival restriction; Hothead never grants immediate Rotate activations. Attached Items on the departing Character undergo normal cleanup. The extra Play belongs to the same Turn and counts for sequencing.

**Neighborhood Lifeguard — P138, Spiteful Character, Cost 2, 2/3**

> Rotate: Choose an opposing Character. It gets -2 Power this Round, or -3 Power if its Power is greater than this Character’s Power.

Check the Power comparison before applying this ability's reduction. This is now a lifeguard stopping the bigger troublemaker, rather than an HOA payoff. Remove the HOA Trait; Wait Them Out still supports the four remaining HOA Characters.

## Traits and pool structure

- Alien Abduction Victim is the victim, not an alien. Alien remains reserved; Human remains unprinted identity metadata.
- Kid With an iPad and Vape Kid are Kids, not automatic Hackers or Daredevils. Script Kiddie, Wi-Fi Bandit, and IT Guy preserve the Hacker package.
- Basic White Girl does not inherit Soccer Mom's Parent Trait. No race or gender Trait is introduced.
- Doomsday Prepper's salvaged-supply art direction supports its Scavenger label. Tech Bro has no automatic Hacker label.
- Deck cards remain **180: 108 Characters, 48 Actions, 24 Items**, with the same per-Style composition and complexity counts as revision 2.
- Counts affected: Kid 9, Parent 8, Daredevil 14, HOA 4. All other Trait counts remain unchanged.
- Character Costs and stats are unchanged. The substantive effect changes are Reply All, Tag Me In!, and Neighborhood Lifeguard. The other edits are casting, Traits, aliases, and flavor.

## Slot history

| ID | Previous title | Current title |
| --- | --- | --- |
| P012 | Parking Lot Boxer | Giga Chad |
| P017 | Lawn Chair Daredevil | Vape Kid |
| P021 | No, No, Watch This | Glory Days |
| P042 | Little League Coach | Peaked in High School |
| P045 | Soccer Mom | Basic White Girl |
| P049 | Group Text | Reply All |
| P063 | Fake Psychic | Alien Abduction Victim |
| P067 | Mall Cop | Kid With an iPad |
| P070 | Crypto Bro | Tech Bro |
| P095 | Garage Sale Queen | Doomsday Prepper |
| P099 | Cat Lady | Crazy Cat Lady |
| P125 | Neighborhood Watch Captain | Keyboard Warrior |
| P138 | HOA Pool Monitor | Neighborhood Lifeguard |
| P160 | Safety-Vest Volunteer | Gym Selfie Guy |
| P172 | Last Laugh | Tag Me In! |

Displaced concepts are preserved in the idea bank and git history. The [card list](card-list.md), six Style sheets, and [trait audit](traits.md) are generated from the current source. The [revision 2 notes](revision-2-notes.md) remain the historical record of that pass, not a second current roster.

## Validation and next check

Checked request coverage by card ID and type, canonical data versus generated sheets, legal registered Traits, support references, and the unchanged composition/complexity totals. This is a design and consistency pass, not a match simulation. Playtest Tag Me In!'s discounted body swap and Reply All's symmetrical card advantage before treating their costs as final.
