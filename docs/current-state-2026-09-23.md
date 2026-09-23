# Unhinged Current State — 23 September 2026

**Core 0.1: Donut · Card revision 3**

This checkpoint supersedes the September 21 checkpoint for current card production. The [production rulebook](../production/rules/unhinged-rules.md), [card source](../production/cards/cards.json), and [taxonomy source](../production/cards/taxonomy.json) carry the working specification. Earlier checkpoints and Alpha 0.03 files remain historical evidence.

## Carried-forward foundation

One Leader outside a 40-card deck; alternating one-action Turns within shared Rounds; 1–7 Fuel; Ready / Rotate; Characters with Power and Guard; persistent damage; blocking Rotates; direct Attacks on Rotated Characters; sequential blocking and Leader overflow; survival-based retaliation; defensive Guard Discards; maximum two copies; Leader Style plus one secondary Style; War for first initiative and tied game end.

The six current Leader identities and both complete Style naming sets remain as recorded in [Leaders](leaders.md). No Leader ability package or Health total is invented by this card revision.

## User directions preserved

- **Human is not a printed Trait.** Keep identity architecture in metadata.
- Allow **up to four useful Traits**, including zero. No obligatory four-Trait Leader template.
- Use a **roughly 3–15% soft saturation guide**, not hard minimum or maximum counts.
- Traits should usually improve a generally useful effect; hard gates need a reason.
- Keep the current **108 Characters / 48 Actions / 24 Items** composition.
- Distinguish textless, keyword-only, enters-play, activated, triggered/static, and multiple-ability Characters.
- Give Rotate abilities meaningful opportunity costs: the Character gives up attacking or remaining Ready to Block.
- Keep GitHub as the working home and keep legacy language out of current production text.

## Current design choices for this pass

These are the implemented working revision produced in response to the request to fix Traits, keywords, and the card list. They are **playtest choices**, not newly claimed user locks or proven balance targets.

- Eighteen supported printed Traits; Human remains unprinted.
- 27 textless Characters (25%), six keyword-only Characters, 24 dedicated Rotate Characters, 18 on-play Characters, 21 single ongoing Characters, and 12 multiple-ability Characters.
- Retain Explosive and Slowpoke; add **Hothead** as the sole new keyword, granting permission to Attack in the entry Round only.
- Use Character consistently in active Donut text, while keeping final printed terminology open.
- A real guessing interaction on Pick a Card; no persistent face-down board system.
- Eleven Items with Rotate activations; Item state changes now have useful targets.
- Add explicit combat checkpoints so attack and block triggers work before damage. Document the required cost, target, attached-reference, end-of-Round, and delayed-Return rulings.
- Keep the whole pool in validated machine-readable draft data and generate the readable sheets from it. Machine-readable does not mean text or balance is frozen.

## Next evidence needed

Complete the Leader test packages, construct controlled decks from this exact revision, and test under the current rules. Focus on entry-Round attacks, repeated Item damage, ready chains, Undead recursion, temporary-Guard expiration, and whether Tricky's choices stay quick and enjoyable. The archived Mongo simulator cannot validate this revision.

See the [revision notes](../production/cards/revision-2-notes.md) for specific packages and the manual rules audit.

## Revision 3 — requested roster additions

The user’s follow-up cast is implemented in the active 180-card pool. [Request coverage and precise changes](../production/cards/revision-3-notes.md) list every name and stable ID. Neighborhood Lifeguard replaces HOA Pool Monitor and its HOA dependency; Tag Me In! and Reply All are Actions. Glory Days and Peaked in High School are separate cards. Gym Bro is an alternate name for Gym Selfie Guy. The revision 2 complexity mix, all Character Costs/stats, and the three-keyword vocabulary remain intact.
