# Rules Decisions Needed Before Production Card Text

These are the remaining production decisions after the September 23 Donut card revision. They are not rules gaps to fill casually while writing cards. Each needs a deliberate decision, then an update to [the production rulebook](unhinged-rules.md), card templates, and any affected card text.

| Topic | Current direction | Needed decision |
| --- | --- | --- |
| Final printed type name | **Character** is used consistently in the current Donut rulebook and pool; Unit is the historical alias. | Confirm the final printed presentation before card-frame work. |
| Responses | A Response is an Action with its exact timing printed on the card. | Define whether a Response may answer another Response and set a chain limit, if any. |
| Response costing | Fuel and card opportunity cost are favored. | Establish the cost range after cards exist to test it. |
| Fuel representation | Fuel progresses from 1 to 7 and Rotates to pay. | Choose the physical implementation: dedicated Fuel cards, tracker, tokens, or another durable play aid. |
| Deckbuilding Styles | Leader Style plus one secondary Style is the current default. **Styles** is the soft-locked umbrella term. | Confirm the final printed Style names in card headers and deckbuilding text. |
| Style naming | The settled production roster is **Reckless / Momentum / Misdirection / Salvage / Stonewall / Expendable**. The older alternate phrase set remains **No Chill / High Turnover / Funny Business / Good Enough / Find Out / Red Shirts** for reference. | Validate name clarity in playtests and choose the final printed presentation after usability and legal/IP review. |
| Leader model | Leaders provide deck identity, a 25-Health target, and one automatic passive. The Character Lab removes activated abilities, Charge, rotation, and ultimates. Older Leader packages are historical experiments. | Test the passive-only model first; then decide whether Leaders also need a simple activated ability. |
| Card type layout | The card frame must support Cost, type, title/subtitle, rules text, Power, Guard, and IDs. | Produce and test the first printable template, including type symbols, reminder text, and rotation. Stack overlap remains an optional later experiment. |

## Completed in Donut revision 2

Current Trait and keyword definitions, Human removal, draft card-data structure, consistent Character test wording, and the normal-discard card rewrite are complete for this pass. Active text uses ordinary ownership language without a Controller subsystem. Attack/Block checkpoints and card-reference timing are documented as working rulings. Their playtest quality remains open to evidence; they are no longer missing specifications.

## Production gate

Do not treat a legacy card as production-ready until it has been reviewed against the current rulebook. In particular, rewrite uses of Command, Stamina, Exhaust, Deploy, dies/died, Resource, Junk Pile, Controller, and old combat actions. A word-for-word replacement is not enough because costs, timing, and balance changed with the rules.


## Stash economy color-pie exploration

> **Status: unfinished design direction. Preserve for testing; not a locked rules package.**

With Stash replacing automatic Fuel progression as the current economy experiment, each Style should eventually have a distinct way to accelerate, exploit, manipulate, or combat economy. The working direction is:

| Style | Working economy identity | Design direction |
| --- | --- | --- |
| Reckless | Borrow | Spend or commit future economy for immediate tempo. |
| Momentum | Ramp | Primary home for true ramp: exceed the normal Stash-development rate and build permanent Stash faster. |
| Misdirection | Manipulate | Exchange, recover, rearrange, conceal, or otherwise manipulate cards in Stash without simply becoming the ramp Style. Hacker is a natural thematic home for this space. |
| Salvage | Scavenge | Gain economic value from things already used, discarded, or left over rather than being the primary permanent-ramp Style. |
| Stonewall | Tax | Make opposing economy less efficient through taxes, temporary rotation/denial, or punishment for economic choices. Permanent Stash destruction should be approached cautiously. |
| Expendable | Sacrifice | Convert Characters or other board assets into temporary purchasing power or cost reduction. |

### Trash Baron economy passive

Current concept to preserve for the Trash Baron Leader:

> **You may use your opponent's Ready Stash to pay your Costs. You may combine it with your own Stash.**

Using an opponent's Stash should Rotate those cards as payment, not remove or permanently steal them. This gives Trash Baron an economy advantage based on the opponent's *unused* Stash, so he should **not also receive ordinary ramp as part of his Leader package**. The opponent can reduce the Baron's available scavenged economy by spending their own Stash before leaving it available.

### Open questions

- Exact wording and name of Trash Baron's passive.
- How much true ramp Momentum can receive without creating runaway development.
- Whether every Style needs a minimum amount of generic Stash interaction in addition to its signature economy identity.
- Exact verbs/terminology for Stash movement and temporary economy effects.
- Whether Spy becomes a Misdirection/Stonewall cross-Style package, with economy interference as part of its identity.
- Balance implications of taxes, temporary Stash rotation, Stash recovery, and any effects that move cards out of Stash.

### Flexible base Stash timing

Working experiment: Round opening remains **Ready → Draw → first Turn** rather than forcing a Stash decision during upkeep. Each player gets **one Stash opportunity per Round**, usable during one of their own Turns. Stashing does not consume the normal Turn choice, and the card enters Stash Ready, so it may be used to pay a Cost immediately.

This intentionally lets a player delay the decision until after cards have been played and new information is available. The decision to test is whether that flexibility creates useful interaction and bluffing or makes Stashing too consequence-free. This would replace the current wording that allows one Stash during each Turn; extra Turns should not create extra base Stash opportunities.

### Salvage: temporary Item Stash

Working Salvage economy concept: the first qualifying Item each Round that would be discarded or Dismissed may instead move into its owner's Stash **face up and Rotated**. It counts as 1 Stash but cannot be used that Round because it enters Rotated. When that face-up Item is later used from Stash to pay a Cost, **discard it instead of leaving it in Stash**.

The Item remains face up specifically so both players can identify which Stash card is temporary and know which card must be discarded when spent. Normal Stashed cards remain face down and reusable. This gives Salvage recycled, temporary economy rather than Momentum-style permanent ramp.

Still unresolved: whether the trigger should catch discarded Items only, Dismissed Items only, or both; whether this belongs on a Leader/passive, card package, or broader Salvage mechanic; and the final rules wording for a face-up card retaining its Item identity while in Stash.

Do not convert this section into locked card text or global rules until the base Stash economy has been playtested.
