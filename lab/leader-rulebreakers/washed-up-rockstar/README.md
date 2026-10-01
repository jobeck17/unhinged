# Washed-Up Rock Star — Damage-for-Cards Passive

**ID:** LAB-LEADER-WUR-01  
**State:** PROTOTYPE  
**Canonical impact:** None  
**Leader:** Washed-Up Rock Star / Momentum

## Hypothesis

Letting the Rock Star convert Leader damage into cards creates a visible health-versus-hand decision. The defender can choose not to Block a Leader attack when the additional cards are more valuable than the Health lost. Blocking remains useful when survival matters more than resources.

## Experimental passive

> **Bad Publicity Is Still Publicity**  
> Whenever your Leader takes damage, draw that many cards.

No cap in the first test. Trigger on damage actually dealt to the Leader, not the attack's printed Power. Excess damage that overflows through a Blocker counts if it is actually dealt to the Leader. Damage prevention or a full Block means no trigger for prevented damage.

## Control

Current Carl 0.3 Washed-Up Rock Star passive:

> At the start of your Turn, before Ready, if you have 1 or fewer cards in hand, Draw until you have 2. If you have 3 or more cards in hand, skip your Draw step this Turn. At exactly 2 cards, take the normal Draw.

Use the same canonical decklist, opponents, starting orders, seed schedule, and game count for both versions. Do not alter cards or decklists.

## Simulation requirements

The current `sim/round-robin.js` does **not** implement this experimental passive: Leader attacks subtract Health directly, and the start-of-turn logic hard-codes the current Rock Star passive. An experiment-specific runner or explicit passive switch is required before any A/B result is valid.

For the test runner:

1. Preserve the existing runner as the control and use paired deterministic seeds.
2. Add a `rockstarDamageDraw` switch, default off.
3. When Leader damage is actually applied, reduce Health and draw that amount for a Rock Star Leader with the experimental switch enabled. Apply it to combat damage and any modeled card-effect damage.
4. Update the heuristic Block policy to estimate the value of the cards granted by taking damage. Otherwise the experiment will test a passive that the AI does not intentionally use, and will understate the intended health-versus-hand decision.
5. Record Leader damage, cards drawn from the passive, blocks declined/accepted against Leader attacks, hand size, and game outcomes.
6. Run the same field and seed schedule for control and experiment. Start with a quick 36-deck round robin at 100 games per matchup, then consider a canonical six-deck run if the result warrants it.

## Readout

Compare:
- Rock Star family average win rate and each matchup's change.
- Rock Star mono and dual-Style results separately.
- Average cards drawn from the passive per game.
- Average Leader Health remaining and game length.
- How often the AI declines a Block because the expected cards are worth the damage.
- Whether opponent decks can exploit the extra cards by racing to lethal or applying pressure elsewhere.

## Counterplay to watch

- Attack with enough Power to threaten lethal, making the cards too expensive to take.
- Attack through a Blocker only when overflow is worth it.
- Pressure the board instead of feeding the Rock Star cards through Leader attacks.
- Force a choice between protecting the Leader and preserving Characters for future Blocks.

## Failure conditions

Rework or reject the uncapped version if it creates broad global dominance, if attacks against the Leader routinely become strategically incorrect regardless of game state, or if the AI's only viable line is to avoid Leader attacks entirely. If the passive is too strong, test a per-attack draw cap or draw once per combat instead of pre-emptively weakening the first prototype.

## Current status

**No simulation results recorded yet.** The current runner needs the experimental passive and damage-aware Block policy implemented before results can be trusted. Do not treat the hypothesis as a balance conclusion or promote this passive to canonical rules.
