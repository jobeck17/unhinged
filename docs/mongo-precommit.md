# Mongo Pre-Commit State

**Pinned rollback:** `MONGO-PRECOMMIT-2026-09-18`

## 🔒 Locked

- 40-card decks
- 7-card starting hand
- One Leader starts in play
- Current win condition: reduce the opposing Leader to 0 Health
- Alternating primary actions
- Five archetype/card pools
- No Frontline/Backline
- No lanes
- Single unrestricted Unit battlefield
- Universal Overflow
- Multiple Units may block one attack
- Persistent damage
- Defender may discard any number of cards from hand for +1 Guard each during defense
- Guard does not increase retaliation Power
- Deck skeleton: 26 Units / 8 Actions / 6 Items

### Retaliation

After combat, each blocking Unit that survived deals its Power to the attacking Unit. A Unit defeated during the attack does not retaliate.

### Actions and Items

Actions are moments: resolve once, then dismiss.

Items are possessions: normally attach to a Unit, persist in play, and are dismissed when the attached Unit leaves play. Multiple Items per Unit are allowed during current testing.

## 🧪 LAB

Not committed at this rollback point:

- Secondary-pool / dual-pool deck construction
- Exact color mapping
- Resource redesign
- Universal comeback mechanics
- Momentum as a formal card category
- Exact “holy-shit” / swing card names and effects

## Historical benchmark

A prior balanced simulation benchmark produced:

| Archetype | Win rate |
|---|---:|
| Midrange | 55.5% |
| Aggro | 51.1% |
| Kamikaze | 48.2% |
| Tempo | 47.8% |
| Control | 47.4% |

These are historical benchmark values. They are not a claim that the browser prototype reproduces those exact results.

## Browser app

The browser build is a mechanics playtest harness. AI blocking, Guard decisions, Item targeting, Leader abilities, and some card effects are simplified while the base game is still being tuned.