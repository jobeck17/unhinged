# Unhinged Alpha 0.03 “Mongo” — LAB Rules Snapshot

> This file is the synchronized working rules state for testing. Rules explicitly marked LAB remain provisional until the build is frozen.

## Setup

- 40-card deck.
- 1 Leader starts in play.
- Draw 7 cards.
- Mulligan: choose any number up to all 7. Draw that many replacements first, then shuffle the replaced cards back into the deck.
- Current win condition: reduce the opposing Leader to 0 Health.

## Turn Structure

Players alternate primary actions. A primary action may normally deploy a Unit, play an Action, play an Item, use an activated ability, or attack.

## Rules Architecture — Golden Rule

These base rules apply equally to every deck, Leader, color/pool, and Trait.

- A color/pool does **not** grant a special game rule by itself.
- A Trait is only a label unless a card or global rule explicitly references it.
- Keywords are global definitions. A keyword matters only on a card that actually has that keyword.
- Card text may add to, modify, or supersede a base rule. When explicit card text directly conflicts with a base rule, the card text wins for that card/effect.
- A card may create a named zone, state, permission, or restriction. That mechanic exists because the card created it, not because of the card's color/pool.
- If no global rule or card text creates an exception, use the base game rule.

Design rule: **no gameplay rule may exist only because a player is using a particular color/pool.** Color identity is expressed through card text and card selection.

## Resource — current LAB assumption

The current balance harness assumes a shared dedicated Resource track:

- Start round 1 with 1 Resource.
- Add 1 Resource each round, maximum 7.
- Ready Resources at the beginning of the round.
- Exhaust Resources to pay costs.

This economy remains a LAB assumption until explicitly frozen.

## Units and Combat

- Units normally cannot attack the round they are deployed unless an effect says otherwise.
- The defender may block with multiple Units.
- Attack damage is assigned through blockers sequentially.
- **Overflow:** excess attack damage continues through blockers and can reach the Leader.
- Damage persists until healed or the card leaves play.
- During defense, the defender may discard cards from hand for **+1 Guard each**. Those cards go to discard.
- Guard granted this way does not increase retaliation Power.

### Retaliation

After combat, each blocking Unit that survived the incoming attack deals its Power to the attacker.

A blocker defeated by the attack normally does not retaliate.

- **Explosive:** an Explosive blocker retaliates even if it was defeated by the incoming attack.
- **Slowpoke:** a Slowpoke Unit does not deal retaliation damage when it blocks.

## Leaders

All Leaders have passive and Exhaust abilities.

Using a Leader's Exhaust ability exhausts that Leader.

An exhausted Leader is **Vulnerable** until it readies. A Vulnerable Leader may be attacked directly, bypassing normal Unit protection.

## Actions

Actions are moments. They resolve once and then go to discard.

## Items

Items are possessions and create board state.

- Items enter play and remain in play.
- An Item attaches only if its text says to attach it.
- Otherwise it remains as a standalone Item.
- A standalone Item may have static rules text or Exhaust abilities.
- An attached Item is dismissed when its host leaves play unless stated otherwise.
- An Item may dismiss itself as part of an ability or trigger. That is allowed and can be desirable when the Item had a meaningful chance to remain visible on the board first.
- Avoid designs that automatically resolve and disappear the round they are played with no meaningful board presence; those effects generally belong on Actions.
- Persistent rule-changing Items are encouraged.

## Current deckbuilding test rule

LAB decks use one Leader color plus one secondary color. The six curated baseline lists are not meant to represent every viable combination; the meta harness also tests all 30 Leader + secondary-color pairings.
