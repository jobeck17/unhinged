"""Regenerate the deck sheet, opening-hand study, and first-duel report."""
import json
import statistics
from simulate import CASE, CARDS, DECKS, Game, generate_deck_sheet, validate

validate()
generate_deck_sheet()

openings = []
for player in range(2):
    one = two = 0
    for seed in range(10000):
        game = Game(1000000 + seed, first=0)
        game.draw(player)
        hand = game.players[player]['hand']
        one += any(CARDS[c]['type'] == 'Character' and CARDS[c]['cost'] == 1 for c in hand)
        two += any(CARDS[c]['type'] == 'Character' and CARDS[c]['cost'] <= 2 for c in hand)
    openings.append(dict(leader=DECKS[player]['leader'], samples=10000,
                         seed_start=1000000, round1_one_cost_character=one,
                         round1_character_cost_at_most_two=two))
(CASE / 'opening-hands.json').write_text(json.dumps(openings, indent=2) + '\n')

batches = [
    ('activation-charge-cautious.json', 'Revised activation Charge / cautious pilot'),
    ('activation-charge.json', 'Revised activation Charge / higher Health priority'),
    ('results.json', 'Original Block Charge / cautious pilot'),
    ('aggressive.json', 'Original Block Charge / higher Health priority'),
    ('regular-only.json', 'Charge and ultimates disabled / cautious pilot'),
    ('hoa-charge-experiment.json', 'Survived-damage Charge / higher Health priority'),
]
data = {filename: json.loads((CASE / filename).read_text())['games']
        for filename, _ in batches}

lines = [
    '# First duel test report', '',
    'September 24, 2026 · Donut 0.1 / card pool revision 3', '',
    '**Both 40-card decks are legal and ready for a physical test. HOA President now uses the revised self-directed Charge condition. The computer experiment is not reliable enough to declare either deck balanced or assign a competitive win rate.**', '',
    'Each deck uses 28 cards in its Leader’s Style and 12 in its secondary Style, with 24 Characters, 10 Actions, and 6 Items. Every card is present twice; the 25-Health Leader is outside the deck. [Decklists](decks.md) · [Complete card text](card-reference.md) · [Leader rules](leaders.md)', '',
    '## Applied fix', '',
    '**Document Everything:** “The first time each Round you Activate an ability of one of your Characters or Items, gain 1 Charge.”', '',
    'The original condition required a friendly Character to survive while Blocking, so Florida could largely decide whether HOA received Charge. The revised condition connects Charge to HOA’s own board tools. It excludes Attacks, Blocks, triggered abilities, card Plays, and the Leader’s Property Maintenance ability.', '',
    '## What was actually run', '',
    'Each row contains eight games: four opening seeds, each repeated with first player swapped. The same seeds are reused across rows. These are correlated heuristic runs, not independent human matches. A 30-Round timeout is censored, never a game-rule draw or an assigned win.', '',
    '| Experiment | Florida wins | HOA wins | Unfinished at 30 Rounds | Mean Rounds of finished games |',
    '| --- | ---: | ---: | ---: | ---: |'
]
for filename, label in batches:
    games = data[filename]
    finished = [g['rounds'] for g in games if g['winner'] is not None]
    lines.append(f'| {label} | {sum(g["winner"] == 0 for g in games)} | {sum(g["winner"] == 1 for g in games)} | {sum(g["winner"] is None for g in games)} | {statistics.mean(finished):.1f} |')

lines += [
    '', 'The higher-Health-priority pilot increases the Health score weight by 50%; card rules are unchanged. The original Block condition, the survived-damage experiment, and the no-ultimate run remain as historical controls. They are no longer the current HOA rules.', '',
    '## Leader use', '',
    '| Experiment | HOA board activations | HOA Charge gained | HOA ultimates | Florida ultimates |',
    '| --- | ---: | ---: | ---: | ---: |'
]
for filename, label in batches:
    games = data[filename]
    totals = [sum(g['metrics'].get(k, 0) for g in games)
              for k in ('board_activations_1', 'charge_1', 'ultimate_1', 'ultimate_0')]
    lines.append('| ' + label + ' | ' + ' | '.join(map(str, totals)) + ' |')

lines += [
    '', 'The fix did what it was intended to do: HOA gained **18 Charge** in the cautious batch and **14 Charge** in the higher-Health-priority batch, compared with **2 Charge** in each matching original Block-condition batch. Four runs reached the 3-Charge cap.', '',
    'HOA still used Violation Notice zero times. In the capped runs, the pilot did not find one or two Rotated opposing Characters worth targeting while the Leader was Ready. That flags ultimate target availability as the next physical-test question; it does not show that the Charge fix failed.', '',
    '## Opening consistency', '',
    '10,000 seeded shuffles per deck, using the documented mulligan policy and including the Round 1 Draw. These are draw probabilities under that policy, not win probabilities.', '',
    '| Deck | At least one 1-cost Character in opening Turn hand | At least one Character costing 2 or less |',
    '| --- | ---: | ---: |'
]
for row in openings:
    lines.append(f'| {row["leader"]} | {row["round1_one_cost_character"]/100:.2f}% | {row["round1_character_cost_at_most_two"]/100:.2f}% |')

lines += [
    '', 'The HOA list intentionally has no 1-cost Characters; it usually starts establishing Characters in Round 2. It can still Play 1-cost Items on Round 1. This is a deck difference to watch, not proof that it needs a 1-cost Character.', '',
    '## Findings', '',
    '1. **HOA now controls her own Charge progress.** The selected fix increased access substantially and uses cards already central to the defensive deck.',
    '2. **The current ultimate may be too conditional.** Charge can now reach 3, but Violation Notice still needs Rotated opposing Characters on an HOA Turn. Keep its text for the first physical baseline and record every time it sits fully charged without a worthwhile target.',
    '3. **The pilot still affects pace heavily.** Four current-condition games in each policy reached the cap. The one-action evaluator does not understand multi-action attack plans that exhaust blockers, and it can overvalue a Charge-producing activation. This cannot distinguish a real stalemate from poor computer piloting.',
    '4. **No balance conclusion is supported.** The cautious current batch was 2–2 with four unfinished games; the higher-Health-priority current batch was 4–0 with four unfinished. That sensitivity is the clearest reason to use physical games next.',
    '5. **Keep the decks, Health, and ultimate unchanged for the next baseline.** If physical play confirms that Violation Notice regularly sits at 3 Charge without a target, broaden the ultimate’s target text as the next single-variable change.', '',
    '## Verification and limits', '',
    '17 targeted mechanical tests passed, including both current and historical Charge timing, multi-block/overflow, temporary Guard, Defiant (called Explosive at the time), Vulnerability, entry restrictions, Tag Me In instance/attachment cleanup, self-damage timing, and Charge caps. The 180-card production pool passed its generator check before the later keyword revision. Every simulated action checks card conservation, nonnegative Fuel, and Charge bounds.', '',
    'The harness implements these 40 unique cards and the current timing, but its pilots use one-action evaluation, at most two of five candidate Blockers, at most two defensive Discards, no strategic multi-Turn plan, and rough stochastic planning. These restrictions can materially change outcomes. [Full methodology and reproduction commands](../../../prototypes/donut-duel/README.md).', '',
    'Current raw runs: [cautious](activation-charge-cautious.json), [higher Health priority](activation-charge.json). Current example transcripts: [cautious](sample-activation-charge-cautious.md), [higher Health priority](sample-activation-charge.md). Historical controls remain beside them for reproducibility.', ''
]
(CASE / 'report.md').write_text('\n'.join(lines))
print('Wrote report, opening-hand study, and decklists.')
