"""Validate the September 28 six mono-Style baseline decks."""
import json
from pathlib import Path

here = Path(__file__).resolve().parent
pool = json.loads((here / '../../cards/cards.json').resolve().read_text())
data = json.loads((here / 'decks.json').read_text())
cards = {c['id']: c for c in pool['cards']}
styles = ['Reckless', 'Momentum', 'Misdirection', 'Salvage', 'Stonewall', 'Expendable']

assert len(pool['cards']) == 180
assert data['card_pool'] == pool['version']
assert len(data['decks']) == 6
assert {d['styles'][0] for d in data['decks']} == set(styles)

for deck in data['decks']:
    assert deck['health'] == 25
    assert len(deck['styles']) == 1
    assert sum(deck['cards'].values()) == 40
    assert all(1 <= copies <= 4 for copies in deck['cards'].values())
    assert all(cid in cards for cid in deck['cards'])
    assert all(cards[cid]['style'] == deck['styles'][0] for cid in deck['cards'])

    curve = {}
    types = {'Character': 0, 'Action': 0, 'Item': 0}
    for cid, copies in deck['cards'].items():
        card = cards[cid]
        curve[card['cost']] = curve.get(card['cost'], 0) + copies
        types[card['type']] += copies

    assert types['Character'] > 0
    assert types['Action'] > 0
    print(f"{deck['leader']}: 40 cards | {types} | curve {dict(sorted(curve.items()))}")

print('PASS: six mono-Style baseline decks match the active 180-card pool.')
