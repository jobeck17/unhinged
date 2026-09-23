# Unhinged Brainstorm and State of the Game — September 17, 2026

> **Historical source transcription.** This document records the September 17 prototype direction. Its Command/Stamina, Strike/Assault, and Claim Initiative rules are superseded by the [current LAB rules](../card-pool/rules-lab.md). The [original Word file](Unhinged_Brainstorm_State_of_the_Game_2026-09-17.docx) preserves its formatting.

Current design thesis; Build a leader-centered customizable card battler where the Leader defines the deck's economic limits and identity, the only universal victory condition is defeating the opposing Leader, and most depth comes from commitment, timing, resource tradeoffs, and alternating interaction rather than movement or procedural board rules.

"What if Hyrule had a trailer park?"

## 1. Decision Legend

This document separates design certainty from design enthusiasm. An idea is not 'dead' merely because it is not in the base game.

| Symbol | Status | Meaning |
| --- | --- | --- |
| ◆ | LOCKED | Core identity or rule we should not reopen casually. Revisit only if actual playtesting contradicts it. |
| ● | COMMITTED | Current prototype direction. Strong enough to build around, but still subject to playtest evidence. |
| × | SCRAPPED | Tested or explored and rejected for this design path. Keep the lesson, not the mechanic. |
| ◇ | TABLED | Promising or flavorful, but intentionally postponed until the base game is stable. |
| ? | OPEN | Unanswered question or hypothesis that deserves a deliberate test. |

## 2. Executive Snapshot

◆ LOCKED  Unhinged is a leader-centered customizable card battler, not a traditional randomized TCG product.

◆ LOCKED  The Leader must matter before the first card is drawn: deck identity, economic boundaries, ability, and defeat condition all point back to the Leader.

◆ LOCKED  The universal victory condition is defeating the opposing Leader. We are not building around an abstract score-to-20 track.

● COMMITTED  The strongest current combat core uses alternating single actions, Strike vs Assault, Intercept, optional Stamina-powered Counter, persistent damage, Leader Exposure, and Claim Initiative.

● COMMITTED  Command and Stamina remain separate because they now serve different roles: Command is renewable board-development capacity; Stamina is banked tactical power.

● COMMITTED  Leader-specific Command and Stamina ceilings are a major identity and deckbuilding tool. Starting resources should probably be universal.

● COMMITTED  Actions are the leading candidate for a built-in Stamina conversion rule: discard an Action for +1 Stamina, likely once per round and likely as an action.

◇ TABLED  Spellcasting/Channel mechanics where a Wizard-like Unit can reduce or pay a Spell's Stamina cost are exciting, but belong after the base economy is proven.

× SCRAPPED  Lanes, staged marching, and separate objective scoring are not part of the current base game. They created procedure or distracted from the Leader.

◇ TABLED  Functional card backs, road/map building, flip-on-defeat terrain, dice, hidden simultaneous intent, locations, items, PvE, and many class mechanics stay in the vault.

## 3. What We Know for Now

### 3.1 Product and experience

- The game should feel like a deep dueling card game without booster-pack scarcity, rarity-chasing, or secondary-market dependency.

- Accessibility matters. The shared rules should be teachable; complexity should emerge from cards, Leaders, timing, and deck construction.

- PvP is the primary proving ground. PvE remains an important long-term target, ideally using the same core rules rather than a separate combat engine.

- The board state should matter, but spatial procedure should not become the game unless later testing proves it earns its weight.

- Persistent Unit damage feels right for the tone and creates attrition without requiring tactical movement.

### 3.2 Leader identity

- A player brings one Leader that is always present.

- The Leader is both a gameplay piece and a deckbuilding identity.

- Leader defeat is the universal loss condition.

- Leader economy ceilings can constrain what costs are naturally playable, creating meaningful differences before card text is considered.

- A Leader's active ability should feel powerful enough that using it is a real moment, not a +1 bookkeeping bonus.

- Exerting the Leader makes it Exposed; an Exposed Leader cannot rely on normal interception. Exposure is the cost of using power.

### 3.3 Interaction

- Players should not take long solitaire turns. Alternating one action at a time is currently the best cadence.

- The defender must make real choices during combat, not simply wait for the active player to finish.

- A Ready Unit is valuable even when unused because it represents potential interception, counterattack pressure, or future action.

- There is no need for a formal 'Hold' action. A Unit simply remains Ready until the player chooses to use it.

## 4. What We Think Right Now

Working core; One Leader, one battlefield, no lanes, no movement, no secondary scoring track. Players alternate one action at a time. Units Strike Units or Assault the Leader. Ready defenders may Intercept Leader assaults. Surviving Ready defenders can optionally spend Stamina to Counter. Damage persists. Leaders can exert for powerful abilities, becoming Exposed. Players can Claim Initiative to stop acting this round in exchange for the first action next round.

### 4.1 Current round flow

1. Round begins. Ready Leaders and Units.

1. Command maximum increases by 1 toward the Leader's Command cap and Command fully refreshes.

1. Gain 1 Stamina toward the Leader's Stamina cap.

1. Draw for the round.

1. Initiative player takes one action.

1. Players alternate one action at a time until both are finished.

1. A player may Claim Initiative, ending their own actions for the round but securing first action next round.

1. When both players are finished, begin the next round.

### 4.2 Current Unit combat language

● COMMITTED  Strike: exhaust a Ready Unit to attack an enemy Unit. Damage is persistent.

● COMMITTED  Counter: if the defender was Ready and survives, it may spend 1 Stamina, exhaust, and deal its Attack back.

● COMMITTED  Assault: exhaust a Ready Unit to attack the opposing Leader.

● COMMITTED  Intercept: against a non-Exposed Leader, the defender may exhaust one Ready Unit and have it take the Assault instead.

● COMMITTED  Exposed Leader: Assaults against an Exposed Leader cannot be intercepted.

## 5. What Questions Need Answered Right Now?

| Question | Why it matters |
| --- | --- |
| Resource split | Does Command + Stamina earn its added complexity when played by humans, or does a single resource pool produce comparable depth with less teaching overhead? |
| Starting economy | Should the universal start be 1 Command / 1 Stamina or 1 Command / 2 Stamina? |
| Leader ceilings | What ranges for Command cap and Stamina cap create meaningful identities without creating unplayable archetypes or obvious best Leaders? |
| Leader abilities | Should most Leader abilities cost only exertion/Exposure, or should some also cost Stamina? How often should a healthy game activate the Leader? |
| Intercept frequency | In automated play, interception was chosen very often. Do human players perceive 'take Leader damage to preserve the Unit' as a real choice often enough? |
| Counter frequency | Do Actions and other Stamina sinks naturally reduce Counter from an automatic choice to a meaningful one? |
| Action conversion | Should every Action be discardable for +1 Stamina? Should this be once per round? Should converting consume the player's action? |
| Hand pressure | Does Action-to-Stamina conversion sufficiently soften early expensive draws while preserving the risk of drawing an unplayable high-cost Unit? |
| Cost ceilings as deckbuilding | Should the rules allow cards above a Leader's natural caps if the deck includes cost reduction or resource acceleration? Current answer: probably yes. |
| Game length | What Leader Health and average Unit damage produce the desired match length once Actions are introduced? |
| Deployment timing | Should newly deployed Units always enter exhausted / unable to act until the next round, or are some classes allowed to break that rule later? |
| Draw rate / hand size | What draw cadence keeps Action conversion from starving hands while avoiding excessive combo consistency? |

## 6. What's Next

The next prototype should be deliberately small. Do not add the vault back into the game yet.

- Build v0.06 around the committed combat engine.

- Use one universal starting-economy rule and test 1C/1S against 1C/2S.

- Give Leaders different Command/Stamina caps, but keep starting values universal.

- Test Leader abilities that cost Exposure only before layering Stamina costs back in.

- Add a very small Action package, roughly 6-8 effects, with Stamina costs from 1 through a deliberately exciting high-cost card.

- Test the rule: once per round, as an action, discard an Action card to gain 1 Stamina.

- Record actual human decisions: Strike vs Assault, Intercept vs take damage, Counter vs save Stamina, Action vs convert, Leader ability timing, and Claim Initiative timing.

- Do not add Items, Locations, lanes, movement, dice, simultaneous hidden intent, functional card backs, spellcasting classes, or PvE until this layer is stable.

## 7. Design North Star

Leader first: If removing the Leader barely changes the deck, the design has failed.

Choices over procedures: Depth should come from deciding what to commit, spend, expose, preserve, or sacrifice, not from moving pieces through mandatory steps.

Interaction without interruption soup: The opponent should matter constantly, but the rules should not become a stack-resolution seminar.

Visible economy, hidden intent: Players can see Command, Stamina, ready Units, and Leader state, but cannot know which Action or expensive payoff is being saved.

Power should have opportunity cost: Big effects are earned through banked Stamina, sacrificed cards, Unit activation, Leader Exposure, or deckbuilding risk.

Deckbuilding has consequences: A greedy curve should sometimes punish the player. The system should provide valves, not erase risk.

Cards should create the weirdness: The core rules stay coherent; Unhinged's personality can go feral on the cards.

## 8. Resource Economy

### 8.1 Command

● COMMITTED  Command is the predictable deployment economy.

- Starts low, likely 1.

- Maximum rises by 1 each round until the Leader's Command cap.

- Fully refreshes each round.

- Primarily pays for Units and other permanent board development if those card types are later added.

- A Leader with a low Command cap may naturally be unable to play large Units without a deckbuilding workaround.

### 8.2 Stamina

● COMMITTED  Stamina is the bankable tactical economy.

- Likely starts at 1 or 2; this is still an active test.

- Naturally gains only +1 per round, up to the Leader's Stamina cap.

- Does not fully refresh.

- Pays for Counters and, once added, Actions/Reactions and other tactical effects.

- High-cost Stamina cards should be genuinely powerful because saving toward them is itself a strategic commitment.

- Stamina acceleration is valuable design space: Wizards, Items, sacrifice effects, Leader passives, or other engines can break the normal +1 cadence later.

### 8.3 Why two pools may be worth it

Command asks: What can I build this round?

Stamina asks: What tactical power am I willing to spend now instead of saving?

If these resources ever begin behaving the same way, merge them. Their justification is behavioral asymmetry, not nostalgia.

### 8.4 Action-to-Stamina conversion

● COMMITTED  Current leading rule: Action cards can be converted into Stamina. Units cannot.

Working form: once per round, as an action, discard one Action card from hand to gain 1 Stamina. This gives expensive Actions a second use, lets cheap late-game Actions become fuel, and keeps Units as the riskier majority card type.

Balance philosophy; Do not eliminate dead draws. Control them. A high-cost Unit drawn four rounds early can still be a real deckbuilding cost. The game needs some version of Lorcana's '9-cost uninkable problem' so greedy curves remain risky.

## 9. Leader Architecture

| Leader element | Current role |
| --- | --- |
| Health | Universal loss condition. Exact range TBD. |
| Command Cap | Long-term ceiling for renewable deployment power; also a deckbuilding boundary. |
| Stamina Cap | Long-term ceiling for banked tactical power; not equivalent in value to Command Cap. |
| Passive | Optional identity rule that changes how the deck plays. |
| Exert Ability | Powerful active ability. Exerting exposes the Leader. |
| Color / Affinity / Capability profile | Still unresolved. Single-color Leader plus optional secondary color remains one candidate; economic profile may carry more identity than rigid color pairs. |

### 9.1 Starting values vs ceilings

● COMMITTED  Prefer universal starting resources and Leader-specific ceilings.

Avoid printing four economy numbers such as Starting Command, Max Command, Starting Stamina, Max Stamina on every Leader unless testing proves that asymmetrical starts are worth the cognitive load.

## 10. Deckbuilding Identity

◆ LOCKED  The Leader should shape deck construction, not merely provide an ability.

● COMMITTED  Leader economic ceilings naturally influence curve construction.

● COMMITTED  Do not necessarily prohibit cards above a Leader's cap. Let enablers such as cost reduction or resource generation make otherwise impossible cards playable.

◇ TABLED  Single-color Leader with a chosen secondary color remains attractive, but color architecture should not be finalized before the base combat/economy is stable.

◇ TABLED  Two Leaders with two separate decks and one draw from each deck per round remains a fascinating alternate format / future experiment, not the current base game.

◇ TABLED  Leader-specific Signature cards or private card pools remain promising.

### 10.1 Original Lorcana spark

The original design spark was the way a Leader-like identity could bend deck construction, especially the appeal of cards such as Christopher Robin allowing Hunny characters to break normal color restrictions. The enduring lesson is not 'copy dual colors.' The lesson is that deck construction itself can express the Leader.

## 11. Actions, Reactions, and Future Spellcasting

● COMMITTED  Actions should eventually compete with Counter for Stamina.

This competition is important because Counter was too automatic in Unit-only simulations. When meaningful Actions consume the same banked resource, saving Stamina becomes a threat and bluffing signal.

◇ TABLED  Wizard / Spell 'singing' analogue.

A future class mechanic could let specific Units cast or channel Spells by exhausting themselves to reduce the Stamina cost, rather than simply bypassing cost. That would create Lorcana-Singer-style alternate utility while preserving Unhinged's Stamina economy: using the Wizard means not attacking, not intercepting, and potentially becoming vulnerable.

## 12. Simulation Findings and What They Actually Tell Us

| Test | Observed pattern | Design lesson |
| --- | --- | --- |
| Earlier Lorcana-like Leader-damage test | Full Attack to Leader made aggression too efficient and created strong first-player bias in some versions. | Do not equate Unit Attack with an unrestricted quest/lore analogue. |
| Objective + Leader-health test | The Objective swallowed Leader combat and produced extreme first-player advantage in the test model. | Separate score track rejected for current base. |
| Staged advancement | Could be balanced, but felt procedural and arbitrary in play. | Balance alone is not fun. |
| Three lanes | Readable, but made position/payoff tuning the game; 1-point lane pressure overvalued cheap bodies. | Table spatial systems. |
| Current alternating-action core | Heuristic mirrors landed near even in testing, dramatically healthier than several prior turn structures. | Alternating actions and initiative trading are worth real playtesting. |
| Decision instrumentation | Strike was chosen more often than Assault; Intercept and Counter were very frequent; explicit Hold was nearly irrelevant. | Remove Hold; watch Intercept; give Stamina more competing uses. |
| Actions competing for Stamina | As useful Actions became more available, Counter frequency dropped substantially in the model. | Do not nerf Counter first. Make Stamina valuable. |

Important: these were heuristic simulations, not proof of final balance. Their value is comparative: they exposed structural problems and identified which decisions deserve human playtesting.

## 13. Project Evolution

### Era 0 — Core fantasy

- Leader/commander at the center of the deck.

- Two armies meet; frontline / backline / commander framing.

- Fight through defenses to reach the Leader.

- PvP and PvE should ideally share the same core.

- TCG-like customization without TCG distribution baggage.

### Era 1 — Alpha v0.01 / Naked Game

- Leader + Life + Stamina + Command.

- Trash Baron and Karen as opposing identities.

- Units, Actions, Defense/Reactions.

- Persistent damage and exhaustion.

- Early Command behaved more like battlefield capacity than refreshing mana.

- Trash Baron's board-count advantage exposed snowball problems.

### Era 2 — Battlefield and combat labs

- Explored frontline/backline depth, advancement, passed-pawn behavior, dice evasion, simultaneous intent, Ashes-style counterattack, and lane systems.

- Simultaneous Push/Engage/Hold could reduce initiative bias but introduced extra procedure.

- Three lanes were easier to visualize than staged marching, but the payoff structure distorted Unit value.

### Era 3 — Lorcana reset

- Stripped game back to Leader + Units.

- Tested Lorcana-style exposed targets and 'advance toward victory vs challenge' thinking.

- Learned that using Unit Attack directly as Leader damage made racing too strong.

- Separate Objective track was tested and rejected because it overshadowed the Leader.

### Era 4 — Commitment core

- Shifted from position as the source of depth to commitment as the source of depth.

- Alternating single actions, Assault, Intercept, Stamina Counter, persistent damage, Leader Exposure, and Claim Initiative emerged as the strongest core.

- Command became ramping renewable Unit economy; Stamina became banked tactical economy.

### Era 5 — Economy identity

- Leader-specific Command and Stamina caps became deckbuilding boundaries.

- Universal starting resources became preferable to Leader-specific starts.

- High-cost Stamina cards should be powerful enough to make saving exciting.

- Actions as Stamina-convertible cards became the leading answer to hand smoothing without making every card universally fungible.

### Era 6 — Tone crystallization

- The tone finally clicked as "What if Hyrule had a trailer park?"

- Mythic backroads fantasy: heroes, monsters, relics, swamps, junkyards, trailers, roadside shrines, improvised compounds.

- Humor should come from the collision of genuine mythic stakes with trashy Americana, not random joke soup.

## 14. Alpha v0.01 Legacy

The earliest printable Alpha already contained DNA that survived the redesign: Leader-centric identity, Command/Stamina as distinct numbers, absurd but coherent factions, and reactive defense.

| Card | Type | Stats | Why it matters |
| --- | --- | --- | --- |
| Trash Baron | Leader • Scavenger | Life 12 / Stamina 5 / Command 6 | First time each turn one of your Units is defeated, gain 1 Stamina. |
| Karen | Leader • Suburban Menace | Life 15 / Stamina 2 / Command 8 | First time each turn one of your Units attacks the enemy Leader, it gets +1 Attack for that attack. |
| Dumpster Diver | Unit • Scavenger | C1 • 1/2 | When deployed, if you have 0 Stamina, gain 1. |
| Raccoon of Unusual Size | Unit • Scavenger | C4 • 5/6 | Early example of a larger body on the Command curve. |
| Throw Something | Action | S1 | Deal 2 damage to a Unit. |
| Nope. | Defense • Reaction | S1 | Reduce Leader damage by 2. |

## 15. Mechanic Vault — Tabled, Not Forgotten

◇ Battlefield depth / advancement  Frontline/backline/passed-pawn ideas may return if a future mode needs spatial structure.

◇ Three lanes  Potential alternate board or mode; not needed for current base.

◇ Locations  Could create environmental or objective texture once Unit combat is stable.

◇ Items / attachments  Especially Leader attachments that alter Stamina generation or economic rules.

◇ Wizard Channel / Spell casting  Exert a qualifying Unit to reduce a Spell's Stamina cost.

◇ Functional card backs  Card-back map/road/cascade concepts are visually exciting but represent a separate design branch.

◇ Flip defeated Units into battlefield infrastructure  Strong visual/thematic idea from the functional-back rabbit hole.

◇ Hidden simultaneous intent  Push / Engage / Hold style systems reduced initiative issues but added procedure.

◇ Dice  Could support dodge/chaos/character-specific effects, but should not be foundational unless needed.

◇ Range / Speed  Older battlefield stats preserved for possible future mode or Unit traits.

◇ Outposts  Board infrastructure / control concept.

◇ Upgrades / Overcharge  Ways to escalate Units or Leaders.

◇ Recruit / Rally swarm  Mass-board archetype tools.

◇ Resurrection / Cockroach  Recursion and hard-to-kill archetypes.

◇ Chaos / d6 Toddler  Randomness as character identity rather than universal combat resolution.

◇ Two Leaders / two decks  Each Leader one color, separate decks, draw from both. Interesting but too much for current base.

◇ PvE encounters  Still a core product aspiration, postponed until PvP engine is stable.

## 16. Scrap Heap — Lessons We Keep

× Objective as a separate universal victory track  It competed with Leader defeat and could dominate decision-making.

× Full Attack value as automatic Leader-progress analogue  Made racing too efficient.

× Mandatory staged movement  Felt like moving because the rules told you to move, not because movement itself was fun.

× 1-point open-lane pressure  Made tiny Units disproportionately efficient.

× Fixed universal Unit cap as a patch  Treated symptoms of board snowballing rather than solving the action/combat structure.

× Formal Hold action  Redundant in an alternating-action game. Simply leave the Unit Ready.

× Automatic retaliation  Removes the defender's resource and commitment decision.

× Making both Command and Stamina refresh identically  Would make two resource pools unjustified complexity.

× Automatically two-color Leaders  Pre-solves too much of deck construction and weakens player authorship.

## 17. Tone and World

Tone compass: "What if Hyrule had a trailer park?"; The world should treat its danger, heroes, monsters, relics, magic, and rivalries seriously. The comedy comes from where all of that lives: trailer parks, backroads, swamps, HOA meetings, junkyards, gas stations, roadside attractions, improvised shrines, backyard fortresses, and the strange dignity of people taking nonsense very seriously.

- Avoid making every card a punchline. The setting is funny because it is coherent.

- Trash Baron and Karen are valuable tonal anchors: ridiculous identities that still imply real playstyles.

- Florida Man remains a potential Leader concept.

- Bath Salts remains a potential Florida Man Item concept that adds the Undead Trait to an attached Unit; exact balance is TBD.

- Mythic fantasy elements should be allowed to be genuinely cool. The trailer-park contrast supplies the humor.

## 18. Current Candidate Core Rules — v0.06 Target

| Rule | Working text |
| --- | --- |
| Win | Reduce the opposing Leader to 0 Health. |
| Cadence | Players alternate taking one action at a time. |
| Deploy | Spend Command to deploy a Unit. Current expectation: it cannot act immediately unless a card says otherwise. |
| Strike | Exhaust a Ready Unit to deal its Attack to an enemy Unit. Damage persists. |
| Counter | A Ready surviving defender may spend 1 Stamina, exhaust, and deal its Attack back. |
| Assault | Exhaust a Ready Unit to attack the enemy Leader. |
| Intercept | If the Leader is not Exposed, the defender may exhaust a Ready Unit to take the Assault. |
| Leader Ability | Exert Leader for a powerful effect. Current test should explore Exposure as the primary cost. |
| Exposure | An Exposed Leader cannot have Assaults intercepted. |
| Claim Initiative | Stop taking actions for this round; act first next round. |
| Command | Starts low, ramps +1 maximum each round to Leader cap, fully refreshes. |
| Stamina | Starts at 1 or 2, gains +1 per round to Leader cap, banks between rounds. |
| Action Conversion | Leading hypothesis: once per round, as an action, discard an Action to gain 1 Stamina. |

## 19. Immediate Playtest Matrix

| Test | Start | Leader ability | Conversion | Primary question |
| --- | --- | --- | --- | --- |
| A | 1C / 1S start | Exposure-only Leader abilities | Actions convert to +1 Stamina | Baseline |
| B | 1C / 2S start | Exposure-only Leader abilities | Actions convert to +1 Stamina | Does early interaction improve? |
| C | 1C / 2S start | Leader ability costs 1-2 Stamina + Exposure | Actions convert | Does Leader usage become too rare? |
| D | 1C / 2S start | Exposure-only abilities | No Action conversion | Measure hand-stall / dead draw pain |

### 19.1 What to record

- Winner and initiative holder by round.

- Rounds to game end.

- Leader ability activations per game and reasons for declining available activations.

- Strike vs Assault counts.

- Intercept vs take-damage choices, including Leader Health and defender value at the time.

- Counter vs conserve-Stamina choices.

- Actions played vs converted to Stamina.

- Unused Command each round.

- Stamina at the start and end of each round.

- Cards stranded in hand because of cost.

- Times a player wanted to act but had no meaningful action.

- Moments where the choice felt obvious versus genuinely difficult.

## 20. Idea Bank / Future Leader and Archetype Hooks

| Concept | Potential identity |
| --- | --- |
| Florida Man | Potential Leader. High-chaos identity remains in the vault. |
| Trash Baron | Scavenger / recursion / sacrifice / turning trash into resources. |
| Karen | Board pressure, forced exhaustion, complaints/control, high Command / lower tactical flexibility as one possible identity. |
| Mage / Wizard | Lower Command, higher Stamina ceiling, Stamina acceleration, Channel/Spell synergies. |
| Warrior | High Health, high Command, lower Stamina, strong battlefield presence. |
| Priest / Healer | Leader ability that heals multiple Units but exposes the Leader. |
| Undead | Recursion, resurrection, added Undead Trait, sacrifice loops. |
| Bodyguard / Defender | Intercept-specialist Units; exact keyword architecture later. |

## 21. Guardrails Against Design Drift

- Do not add a mechanic because it is cool in isolation. Ask what decision it creates in the current game.

- Do not add a board because the world has a battlefield. The board must solve a gameplay problem better than cards alone.

- Do not solve balance problems with arbitrary caps until the underlying action economy has been tested.

- Do not make Leader abilities timid merely because Exposure exists. The ability should tempt the player.

- Do not make expensive Stamina cards merely 'efficient.' They should feel worth saving for.

- Do not make every bad draw recyclable. Some risk is necessary for deckbuilding to matter.

- Do not add class-specific casting, Items, Locations, or functional backs until the base game's decisions are already fun.

- Do not confuse simulation balance with playtest fun.

## 22. One-Page Direction

What we know for now; Leader-centered identity. Defeat the Leader to win. Alternating interaction. Persistent Unit damage. Command develops the board; Stamina banks tactical power. Exposure makes Leader power dangerous.

What we think right now; Strike / Assault / Intercept / Counter plus Claim Initiative is the strongest base combat we have found. Leader-specific Command/Stamina caps and Action-to-Stamina conversion may turn the economy into a defining feature.

What questions need answered right now; 1C/1S vs 1C/2S; Leader ability cost model; actual human Intercept/Counter behavior; Action conversion; healthy cost-cap ranges; draw/hand pressure; game length and Leader Health.

What's next; Build and play v0.06 with Leaders + Units + a tiny Action package. Instrument decisions. Do not reopen lanes, objectives, dice, functional backs, or other vault mechanics until the base loop proves itself.

The base game does not need more ideas right now. It needs evidence.
