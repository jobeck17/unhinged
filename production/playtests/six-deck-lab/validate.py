"""Validate the six tabletop decklists against the active Donut card pool."""
import collections
import json
from pathlib import Path

here = Path(__file__).resolve().parent
pool = json.loads((here / '../../cards/cards.json').resolve().read_text())
data = json.loads((here / 'decks.json').read_text())
cards = {c['id']: c for c in pool['cards']}
styles = ['Reckless', 'Momentum', 'Misdirection', 'Salvage', 'Stonewall', 'Expendable']
assert len(cards) == 180 and len(pool['cards']) == 180
assert data['card_pool'] == pool['version']
assert len(data['decks']) == len(styles)
for style in styles:
    subset = [c for c in cards.values() if c['style'] == style]
    assert collections.Counter(c['type'] for c in subset) == {'Character': 18, 'Action': 8, 'Item': 4}
assert {d['styles'][0] for d in data['decks']} == set(styles)
for deck in data['decks']:
    assert deck['health'] == 25 and len(deck['styles']) == 2
    assert sum(deck['cards'].values()) == 40
    assert all(1 <= copies <= 2 for copies in deck['cards'].values())
    assert all(id in cards and cards[id]['style'] in deck['styles'] for id in deck['cards'])
    counts = collections.Counter()
    for id, copies in deck['cards'].items():
        counts[cards[id]['cost']] += copies
    assert counts[1] >= 8, (deck['name'], 'too few one-cost plays')
    assert counts[1] + counts[2] >= 24, (deck['name'], 'weak early curve')
    print(f"{deck['leader']}: 40 cards, {counts[1]} one-cost, {counts[2]} two-cost")
print('Six decks and 180-card pool valid.')
