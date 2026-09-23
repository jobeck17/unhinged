# Unhinged v0.04 — 3-Lane Combat Lab

## Goal
Reduce the opposing Leader from 15 Life to 0.

## Card Types
Only Leaders and Units are used in this build.

## Battlefield
There are three combat lanes: Left, Center, Right.
Units are deployed into a lane and remain there.
Lanes are not scoring locations. They are channels for combat and pressure.

## Resources
### Command
- Starts at 1 maximum.
- Maximum Command increases by 1 at the start of each of your turns, up to 6.
- Command fully refreshes each turn.
- Command is used to deploy Units.

### Stamina
- Starts at 1.
- Maximum Stamina is 3 in this prototype.
- Recover only 1 Stamina at the start of your turn.
- Stamina is used for retaliation and Leader abilities.

## Deploying Units
- Units are deployed into one of the three lanes.
- Newly deployed Units enter exhausted.
- They ready at the start of their controller's next turn.

## Combat
A ready Unit may attack within its lane.

### If an enemy Unit is in that lane
The attacker fights a Unit in that lane.
- A ready Bodyguard is chosen first if present.
- The attacker deals its Attack as persistent damage.
- The defender may spend 1 Stamina to retaliate.
- If it retaliates, it deals its Attack back and becomes exhausted.
- If it does not retaliate, it deals no damage back and remains ready.

Damage remains on Units until removed by a future effect. Units are defeated when damage equals or exceeds Health.

### If the lane is open
- If the enemy Leader is exerted/exposed, the Unit deals its full Attack to the Leader.
- If the Leader is not exposed, the Unit deals 1 pressure damage in this test build.

The 1-pressure rule is intentionally provisional. It exists to test whether lane control creates meaningful pressure without making every open lane an automatic full-damage strike.

## Bodyguard
A ready Bodyguard in a lane must be attacked before other Units in that lane.

## Leader Ability
Prototype ability: spend 1 Stamina and exert your Leader to ready one exhausted Unit.
While your Leader is exerted, it is Exposed. Units attacking through an open lane deal full Attack damage to it.

## What This Build Is Testing
- Do three lanes make board state easier to understand than staged advancement?
- Does lane commitment create meaningful offense/defense choices?
- Is Bodyguard more satisfying than universal blocking?
- Does persistent damage keep large defenders fair?
- Does optional retaliation create meaningful Stamina decisions?
- Does exposing the Leader create a real risk/reward decision?
