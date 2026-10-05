# Composure × STANK INDUSTRIES-60 Lab 0.4

**TESTING · October 5, 2026.** Carl 0.3 remains canonical. This lab combines the Composure win-condition experiment with the last live **STANK INDUSTRIES-60** state from immediately before the Composure lab was created.

## Core win condition

Each Leader begins with **25 Composure**. At 0 Composure that Leader becomes **Unhinged** and loses.

Characters have **Power / Guard / Antics**.

- **Attack Character:** Rotate the attacker and attack an opposing Rotated Character using Power. Sucker Punch and explicit card effects can reach Ready Characters.
- **Cause Trouble:** Rotate a Ready Character that began the Turn under your control. The opposing Leader immediately loses Composure equal to that Character's Antics.
- **Cause Trouble cannot be Blocked.** It is not an Attack and does not start combat.
- After causing Trouble, that Character is Rotated and exposed to ordinary Attacks.
- **Stay Ready:** score nothing now, but remain normally protected from Attack.
- Maximum **five Characters** per player. Items do not count.

The core decision remains:

**Fight / Cause Trouble and expose yourself / Stay Ready and protected.**

Power handles fighting. Antics handles the win condition.

## STANK INDUSTRIES-60 merge

The combined browser now contains **eight 40-card decks**: the six Carl mono-Style decks plus Landon's active **Crazy Cat Lady** and **Mad Scientist** rulebreaker decks.

STANK 60 changes imported into this lab include:

- **Florida Man:** Ooh, That's Gonna Leave a Mark! Adrenaline passive; Broken Lawnmower; revised Gas Station Daredevil; revised Hold My Beer; A MILLION KILOGRAMS OF CAFFEINE!!!!; Rusty Needle.
- **Birthday Party Magician:** Very Enthusiastic Volunteer; corrected Rabbit enter/leave Draw behavior; Ethan’s JUST Being Dramatic; Birthday Boy Stash/hand swap; reworked Lady Who's Moving Out Again; School Bully legacy cleanup; Magician's Hat.
- **Crazy Cat Lady:** Landon's 40-card STANK colony list with split low-Cat/high-Cat Leader passive, Stray Cat 1/2, Orange Menace at Cost 1, Tuxedo Cat 1/4, Three-Legged Cat's first-two-Attacks survival, Hairy Cat/Hairballs, Shoebox of Dead Cats, Shovel, Nine Lives Zero Survivors, four Mittens III, and the latest deck counts.
- **Mad Scientist:** five-charge protected battery, Parts/Experiments, Abominations and Specimens.
- **Combat experiment:** no universal retaliation. Backyard Wrestler's Wrestlers retain **Retaliate** when they survive an Attack.
- **Playtest UX:** Attack target selection can be backed out of before the Attack commits.

## Composure translations

STANK 60 was built around Carl's old Leader-attacking/blocking combat. Where that concept no longer exists, this lab translates the job instead of restoring the old rule.

- **Tuxedo Cat:** remains the colony protector. It is attackable while Ready and opposing Characters cannot Attack your other Cats while a Tuxedo Cat remains in play.
- **Bodyguard:** makes that Character attackable while Ready.
- **Hothead:** permits immediate Attacking, but never immediate Cause Trouble.
- Old Leader-facing damage becomes Composure loss where the existing compatibility engine already translates it.
- Mad Scientist **Abominations have 2 Antics** and Specimens **1 Antics** for this first compatibility pass.
- Imported STANK Characters received first-pass Antics values. Those numbers are scaffolding, not claims about Landon's balance.

## Important experimental collision

STANK's no-retaliation test is intentionally active here. That is a larger combat change than Composure alone and should be judged independently in human play. If Composure feels right but no-retaliation does not, Git history makes that piece easy to remove without undoing Landon's deck work.

## Human test questions

1. Is **Fight / Cause Trouble / Stay Ready** still the obvious core choice with the STANK decks present?
2. Do Landon's synergy engines become more interesting when Antics and exposure matter?
3. Does Crazy Cat Lady's width pressure remain fun under the five-slot cap?
4. Does Tuxedo Cat actually protect a scoring colony without becoming mandatory?
5. Does Florida's Adrenaline package avoid the old Ready → repeated Trouble exploit?
6. Does Magician's Return engine interact cleanly with exposure?
7. Does Mad Scientist's randomized body quality feel different now that Power and Antics are separate?
8. Does no universal retaliation improve combat here, or should Composure keep its previous retaliation model?
9. Does 25 Composure produce enough time for exposed scorers to be punished without making games drag?
10. Do players immediately want another game?

### Current tuning note

Simulation before the STANK merge strongly favored **25 Composure** over 15: it moved games toward the desired 8–10 round range and gave opponents more time to punish exposed scoring Characters. This lab now uses 25 as the human-play baseline.

Do not promote any of this to Carl until human testing separates the successful pieces.
