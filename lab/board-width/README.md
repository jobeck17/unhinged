# Board Width Lab 0.1

**TESTING · October 4, 2026.** New isolated experiment built against main `6fffa9c7c27746b5084194cf3247eeec91bec29d`. Carl 0.3 remains canonical. Scheme Lab remains its own experiment. No runtime imports from either engine; this engine is a reduced private fork of Scheme Lab's deterministic command/Response/combat patterns.

[Play the Board Width Lab](https://jobeck17.github.io/unhinged/lab/board-width/).

## Question

Can scarce board space, protected Ready engines, and exposed Rotated attackers make **attack Leader / attack Character / preserve a Character** meaningful without universal blocking? Ready Characters cannot normally be attacked, so removal Actions and board wipes are the available answers to protected engines. This deliberately follows the corrected targeting request rather than the earlier suggestion to attack any Character.

## Exact starting rules

- Two 40-card, four-copy control decks; 14 independent `LAB-BW-` definitions. Leaders have 25 Health and no passive in this first control environment. These are test packages, not replacements for Carl Leaders or a large expansion.
- **At most five Characters per player.** Leader and Stash do not count. Stored cards do not count. Ordinary Character plays are illegal at capacity, before paying or removing the card from hand. All Character entry paths use the same gate. A future effect entry that cannot fit must leave its source card in its original zone; callers must handle `enter()` returning null. No implicit replacement/sacrifice at capacity.
- First player is chosen randomly; seed/first player can be specified for repeatable tests. Draw seven, optionally mulligan selected cards, draw replacements before shuffling old cards back. Second player receives a Rotated one-use temporary Stash; it Readies on that player's first Turn.
- **Full Turns are only a provisional control baseline.** Ready your board and Stash, draw one (first player skips first draw), then play/attack in any order. End Turn voluntarily. One Turn per player forms a Round; first player remains first each Round. Once on your Turn, Stash a hand card Ready. Spend Ready Stash for Costs, using temporary Stash first and discarding it when spent. No automatic resource growth.
- Characters enter Ready; they wait until their controller's next Turn to attack unless Hothead. Declaring an Attack Rotates the attacker.
- Attack the opposing Leader or an opposing **Rotated Character only**. Ready Characters have no direct-attack exception in this compact pool. Damage/removal Actions may still target Ready Characters when their text allows.
- **No blocking step, Block commands, overflow, or default redirection.** Leader attacks damage the Leader. Direct Character combat deals both Power values simultaneously, including lethal trades. Damage persists; casualties leave together before free defeat triggers resolve. If attacker or direct target leaves before damage, the Attack ends without redirecting it.
- One Response opportunity per Attack: defender may play an eligible Response targeting a combatant or pass; if they pass, attacker may play one or pass. A Response resolves completely, including free cascades, then combat finishes. No Response to a Response. Responses pay their printed Cost.
- **Automatic triggers cost no action and have no generic per-Turn limit.** Rube Goldberg Enthusiast draws on each other Character entry; multiple copies all trigger. Explosive defeat effects can cause further defeats and Explosive cascades. Active-player simultaneous defeat effects resolve before non-active-player effects, in entry order within each player in this prototype. Player-chosen trigger ordering remains a future usability question.
- Win by Leader defeat. Finish a command and its triggers before checking the winner. Empty-deck draw also loses. Simultaneous losses use the inherited War comparison on shuffled available deck/discard cards, with a random fallback for an unbreakable tie. This is an aid's fallback, not a new canonical War rule.

## Minimal width-breaking hook: Trench Coat

One Action stores an **unstacked** friendly Character under a different friendly Character. The donor leaves play without being Defeated, Returned, or Dismissed. This frees a slot. Host keeps its damage, Ready/Rotated state, entry age, and abilities, and gets +1 Power/+1 Guard per stored card. Donor damage/state disappear; stored cards have no abilities and cannot attack or be selected. Only the host counts toward board-state conditions.

A host may receive more cards, but may not itself be a donor. Whenever host leaves play, discard every stored card. Returning host returns only its own card. Defeating host creates only the host's defeat event; a stored Explosive does not trigger. Cards are conserved in every zone. Separate storage release and random fusion are BANKED for this lab, not implemented.

## Board presence and board-state hooks

- Porch Philosopher grants other Characters +1 Power only while Ready; attacking gives up the aura immediately.
- Rube Goldberg Enthusiast rewards preserving a protected draw engine, with unrestricted free triggers.
- Crowded House Host draws two on Play at full Character width.
- Third Wheel Readies one spent Stash on Play at exactly three Characters.

Full/exact checks happen after the played body enters. Future effects should reuse `boardCount()` and `hasSpace()`. The decks intentionally share much of their pool; one emphasizes Ready presence, one includes stacking. They are not a controlled causal comparison of a single variable or established balance.

## Browser

`app.mjs` uses the same engine as tests/simulation. Select a hand card and Play/Stash, or select a board Character and Attack. **Tap the actual highlighted Leader or Character to choose a target.** Trench Coat selects donor, then host, both on the board. Responses target combatant cards the same way. Cancel/Escape exits selection. No target dialog exists.

Both five-slot rows are adjacent in one battlefield with no controls, health bar, hand, or separator between them. Leader Health, Character width, Stash readiness, deck/hand counts, Character Power/remaining Guard, Ready/Rotated status, damage, and stored identities are on the cards. Rotated status uses text/color rather than sideways unreadable text. On smaller screens, the two rows scroll horizontally together to preserve alignment and readable cards. This is a shared table, not combat lanes. Bot and local pass-the-device modes are available; local hands are hidden on actor changes, including Responses.

## Validation

```sh
node lab/board-width/test.mjs
GAMES=40 node lab/board-width/simulate.mjs
node --check lab/board-width/app.mjs
```

The regression suite covers entry capacity/atomic rejection, width parameter, rotated-only opposing Character targeting, Leader attacks without blocking, simultaneous damage/no overflow, entry delay/Hothead, Ready aura changes, free entry/defeat cascades, full/exact count checks, stacking conservation/cleanup, Responses, and pure board selection logic. Forty seeded bot games also check per-ID card conservation, width, and no blocking after every command. Initial smoke: 40 finished, zero deck-outs/censored games, maximum 15 Rounds. Smoke results demonstrate exercised mechanics, not human fun or balance.

Existing Carl smoke, all 31 Scheme Lab regressions, Scheme Lab paired simulation smoke (224 games), and Carl 36-deck round-robin smoke (1,260 games) also pass. Browser check covers loading, mulligan, Stash, play, direct Leader targeting, Response resolution, and on-board Health updates without console errors. Pages CI tests this lab and copies its self-contained assets alongside existing routes.

## Unresolved / human gate

1. Is five the right width? `maxCharacters` is a test parameter; browser starts at five. Test smaller/larger widths with the same pool before expanding it.
2. Do protected Ready engines make preservation meaningful, or become untouchable value piles? Do existing removal/wipes provide enough counterplay?
3. Does removing blocking turn Leader pressure into a race despite simultaneous Character trades? Does stacking compound that pressure?
4. Is an alternating-action cadence better? Not implemented or locked: define when Ready/Draw/Stash occur, pass behavior, and Response handling first. Command generation/application remain separate from scheduling so a future cadence variant can share card/combat logic. Do not charge automatic cascades an action by default.
5. Is fixed entry-order trigger resolution sufficient, or does choosing trigger order matter for the next combo package?
6. Does the simple +1/+1 storage example earn richer fusion/release mechanics?

Play swapped-start human games with both decks. Record choices to preserve, attack Leader, and attack an exposed Character; full-board frustration; attacks declined for aura value; stacking payoff; and desire to play again. Rework if attacking face is routinely automatic, preservation gives unavoidable engine advantage, slots become mere bookkeeping, or the width limit suppresses the fun cascades. No promotion until deliberate human testing and coordinated canonical updates.
