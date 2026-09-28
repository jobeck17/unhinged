#!/usr/bin/env python3
"""Validate Donut source data and render its Markdown reference sheets.

Run: python3 production/cards/build.py [--check]
No third-party dependencies. This is a content validator, not a game simulator.
"""
import argparse
import collections
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STYLES = {
    'Reckless': 'No Chill', 'Momentum': 'High Turnover', 'Misdirection': 'Funny Business',
    'Salvage': 'Good Enough', 'Stonewall': 'Find Out', 'Expendable': 'Red Shirts',
}
CATEGORIES = {
    'textless': 'Textless', 'keyword_only': 'Keyword only',
    'on_play': 'On play', 'activated': 'Rotate ability',
    'ongoing': 'Single ongoing ability', 'mixed': 'Multiple abilities',
}

def read_data():
    return json.loads((ROOT/'cards.json').read_text()), json.loads((ROOT/'taxonomy.json').read_text())

def validate(data, taxonomy):
    cards = data['cards']
    ids = [c['id'] for c in cards]
    errors = []
    require = lambda condition, message: errors.append(message) if not condition else None
    require(len(cards) == 180, 'Expected 180 deck cards.')
    require(len(ids) == len(set(ids)), 'Duplicate card IDs.')
    require(set(ids) == {f'P{i:03}' for i in range(1,181)}, 'Missing or unexpected stable IDs.')
    require(len({c['name'] for c in cards}) == len(cards), 'Duplicate card names.')
    require(data['version'] == taxonomy['version'], 'Source versions differ.')
    trait_names = {t['name'] for t in taxonomy['traits']}
    keyword_names = {k['name'] for k in taxonomy['keywords']}
    require(len(trait_names) == len(taxonomy['traits']), 'Duplicate trait definition.')
    require(len(keyword_names) == len(taxonomy['keywords']), 'Duplicate keyword definition.')
    by_id = {c['id']: c for c in cards}
    for style in STYLES:
        pool = [c for c in cards if c['style'] == style]
        require(len(pool) == 30, f'{style}: expected 30 cards.')
    banned = re.compile(r'\b(Human|Object|Vermin|Outlaw|Tech|Performer|Team|Party|Hustler|Authority|Neighbor|Menace|Volunteer|Fan)\b')
    for c in cards:
        cid, text = c['id'], c['text']
        require(c['style'] in STYLES, f'{cid}: unknown Style.')
        require(c['type'] in {'Character','Action','Item'}, f'{cid}: unsupported card type.')
        require(type(c['cost']) is int and 1 <= c['cost'] <= 7, f'{cid}: Cost outside this test curve.')
        require(len(c['traits']) <= 4 and len(c['traits']) == len(set(c['traits'])), f'{cid}: invalid trait count.')
        require(set(c['traits']) <= trait_names, f'{cid}: undefined Trait.')
        require(set(c['keywords']) <= keyword_names, f'{cid}: undefined keyword.')
        require(not banned.search(text), f'{cid}: retired label in rules text.')
        require(not re.search(r'\b(Command|Stamina|Fuel|Exhaust|Deploy|dies|died|Controller|Sneaky|Cloak|Stack)\b|Junk Pile', text, re.I), f'{cid}: retired or shelved mechanics.')
        require('|' not in text and '\n' not in text, f'{cid}: invalid table text.')
        printed_keywords = []
        remainder = text
        while True:
            keyword = next((k for k in sorted(keyword_names, key=len, reverse=True) if remainder.startswith(k+'.')), None)
            if keyword is None:
                break
            printed_keywords.append(keyword)
            remainder = remainder[len(keyword)+1:].lstrip()
        require(set(c['keywords']) == set(printed_keywords), f'{cid}: keyword metadata disagrees with text.')
        if c['type'] == 'Character':
            require(type(c['power']) is int and c['power'] >= 0 and type(c['guard']) is int and c['guard'] > 0, f'{cid}: invalid combat stats.')
            category = c['complexity']
            require(category in CATEGORIES, f'{cid}: invalid complexity category.')
            require((category == 'textless') == (text == ''), f'{cid}: textless category mismatch.')
            if category == 'keyword_only':
                require(text in {k+'.' for k in keyword_names}, f'{cid}: keyword-only card has other text.')
            elif category == 'activated':
                require(text.startswith('Rotate') and ':' in text, f'{cid}: expected a Rotate activation.')
            elif category == 'on_play':
                require(text.startswith('When this enters play,') and 'Rotate:' not in text, f'{cid}: expected an enters-play ability.')
            elif category == 'ongoing':
                require(not text.startswith('When this enters play,') and not re.search(r'Rotate[^.:]*:', text), f'{cid}: not a single ongoing ability.')
            require(set(c['audit_identity']) <= {'Human'}, f'{cid}: unexpected unprinted identity metadata.')
        else:
            require(c['power'] is None and c['guard'] is None and c['complexity'] is None, f'{cid}: non-Character has Character-only fields.')
            require(bool(text), f'{cid}: blank Action or Item.')
    chars = [c for c in cards if c['type'] == 'Character']
    for t in taxonomy['traits']:
        require(any(t['name'] in c['traits'] for c in chars), f"{t['name']}: no printed Character.")
        for cid in t.get('support', []):
            require(cid in by_id and re.search(r'\b'+re.escape(t['name'])+r's?\b',by_id[cid]['text']) is not None, f"{t['name']}: missing reference in {cid}.")
    if errors:
        raise ValueError('\n'.join(errors))

def table(headers, rows):
    lines = ['| '+' | '.join(headers)+' |', '| '+' | '.join('---' for _ in headers)+' |']
    return '\n'.join(lines+['| '+' | '.join(str(v) for v in row)+' |' for row in rows])+'\n'

def display_text(c):
    text = c['text']
    for keyword in c['keywords']:
        text = text.replace(keyword+'.', '**'+keyword+'**.', 1)
    return text or '—'

def render(data, taxonomy):
    cards = data['cards']
    chars = [c for c in cards if c['type'] == 'Character']
    by_id = {c['id']: c for c in cards}
    files = {}
    revision = data.get('revision', 5)
    date = data.get('date', '2026-09-28')

    for style, alias in STYLES.items():
        pool = [c for c in cards if c['style'] == style]
        rows = [[
            c['id'], c['type'], c['cost'], '**'+c['name']+'**',
            f"{c['power']}/{c['guard']}" if c['type']=='Character' else '—',
            ', '.join(c['traits']) or '—', display_text(c)
        ] for c in pool]
        flavor_rows = [[c['id']+' '+c['name'], '*'+c['flavor']+'*'] for c in pool if c.get('flavor')]
        flavor = table(['Card','Flavor'], flavor_rows) if flavor_rows else '_No current flavor-text entries._\n'
        files[style.lower()+'.md'] = (
            f'# {style} / {alias} — Production Pool v0.2\n\n'
            f'> Donut revision {revision} · {date} · Working playtest text; balance is unverified.\n'
            f'> Generated from [cards.json](cards.json).\n\n'
            + table(['ID','Type','Cost','Card','Power / Guard','Traits','Working text'], rows)
            + '\nTraits have no automatic behavior. See [Traits](traits.md), [Keywords](keywords.md), and [Rules](../rules/unhinged-rules.md).\n\n'
            + '## Flavor text\n\n' + flavor
        )

    rows = [[
        c['id'], c['name'] + (' (also: '+', '.join(c['aliases'])+')' if c.get('aliases') else ''),
        c['style'], c['type'], c['cost'],
        f"{c['power']}/{c['guard']}" if c['type']=='Character' else '—',
        ', '.join(c['traits']) or '—', CATEGORIES.get(c['complexity'],'—')
    ] for c in cards]
    files['card-list.md'] = (
        f'# Donut Card List\n\n> Donut revision {revision} · {date} · Working playtest text; balance is unverified.\n\n'
        '180 deck cards; Leaders are outside this count. The six Style sheets contain complete card text.\n\n'
        + table(['ID','Card','Style','Type','Cost','Power / Guard','Traits','Ability category'], rows)
    )

    trait_rows = []
    for t in taxonomy['traits']:
        members = [c for c in chars if t['name'] in c['traits']]
        styles = ', '.join(f'{style} {sum(c["style"]==style for c in members)}' for style in STYLES if any(c['style']==style for c in members)) or '—'
        supports = ', '.join(f"{cid} {by_id[cid]['name']}" for cid in t.get('support', [])) or '—'
        trait_rows.append([t['name'], len(members), f'{100*len(members)/len(chars):.1f}%', styles, supports])
    files['traits.md'] = (
        '# Donut Traits\n\n> Generated from [taxonomy.json](taxonomy.json) and [cards.json](cards.json). Current rebuild specification, not a final print lock.\n\n'
        'A **Trait** describes what a Character is. It has no automatic ability. A **keyword** supplies a defined rule. A **Style** determines deckbuilding identity.\n\n'
        'The saturation guide is roughly **3–15% of the unique deck Characters** and is only a soft guide. Traits may exist before they receive dedicated support.\n\n'
        + table(['Trait','Characters','Saturation','Style distribution','Cards that use it'], trait_rows)
        + '\n## Assignment guide\n\n'
        + table(['Trait','Use it for'], [[t['name'],t['meaning']] for t in taxonomy['traits']])
        + '\n## Boundaries and reserved space\n\n'
        + '\n'.join('- '+note for note in taxonomy['notes'])
        + '\n\nReserved: ' + ', '.join(taxonomy['reserved']) + '.\n'
    )

    keyword_rows = []
    for k in taxonomy['keywords']:
        members = [c for c in cards if k['name'] in c['keywords']]
        keyword_rows.append([k['name'], k['definition'], k['status'], ', '.join(c['id']+' '+c['name'] for c in members) or '—'])
    files['keywords.md'] = (
        f"# Donut Keywords\n\n> Generated from [taxonomy.json](taxonomy.json). {len(taxonomy['keywords'])} active rebuild keywords.\n\n"
        + table(['Keyword','Rule','Status','Printed on'], keyword_rows)
        + '\n## Scope and edge cases\n\n'
        + '\n'.join('- **'+k['name']+':** '+k['limits'] for k in taxonomy['keywords'])
        + '\n- Multiple instances of the same keyword do not multiply its effect unless a card explicitly says otherwise.\n'
        + '- Tag Me In! can grant Hothead temporarily; it is not an additional printed-keyword Character.\n\n'
        + '## Shelved mechanics\n\n'
        + ', '.join(taxonomy.get('shelved_keywords', []))
        + ' are preserved in design history but are not active starting-set mechanics.\n\n'
        + '## Ordinary vocabulary, not keywords\n\n'
        + 'Rotate, Ready, Attack, Block, Defeat, Sacrifice, Dismiss, Draw, Discard, Return, **deal damage**, and **put damage** are core instructions. Traits grant no behavior on their own.\n'
    )

    composition = []
    for style in STYLES:
        pool = [c for c in cards if c['style'] == style]
        composition.append([style, sum(c['type']=='Character' for c in pool), sum(c['type']=='Action' for c in pool), sum(c['type']=='Item' for c in pool), len(pool)])
    composition.append(['Total', sum(c['type']=='Character' for c in cards), sum(c['type']=='Action' for c in cards), sum(c['type']=='Item' for c in cards), len(cards)])

    complexity = []
    for key, label in CATEGORIES.items():
        count = sum(c['complexity']==key for c in chars)
        complexity.append([label, count, f'{100*count/len(chars):.1f}%'] + [sum(c['style']==style and c['complexity']==key for c in chars) for style in STYLES])
    curves = [[style] + [sum(c['style']==style and c['cost']==cost for c in chars) for cost in range(1,8)] for style in STYLES]
    char_rotators = [c for c in chars if re.search(r'Rotate[^.:]*:', c['text'])]
    responses = [c for c in cards if c['type']=='Action' and c['text'].startswith('Response')]
    files['audit.md'] = (
        f'# Donut Revision {revision} — Content Audit\n\n> Generated counts, not simulation results. No win rates or balance claims are inferred from this audit.\n\n'
        + '## Pool composition\n\n'
        + table(['Style','Characters','Actions','Items','Total'], composition)
        + '\n## Character complexity\n\n'
        + table(['Category','Count','Percent',*STYLES], complexity)
        + '\n## Character Cost curve\n\n'
        + table(['Style',*map(str,range(1,8))], curves)
        + f'\n**{len(char_rotators)} Characters currently have printed Rotate activations.** The rebuild intentionally favors static, triggered, and On Play Character abilities.\n\n'
        + f'**{len(responses)} Actions currently use Response timing:** ' + ', '.join(c['id']+' '+c['name'] for c in responses) + '.\n\n'
        + '## Automated-check targets\n\n'
        + '180 stable IDs, unique names, 30 cards per Style, legal types/stats/Costs, registered Traits/keywords, current terminology, Character complexity metadata, and generated-sheet freshness.\n'
    )
    return files

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='validate and fail if generated files differ')
    args=parser.parse_args()
    data,taxonomy=read_data()
    validate(data,taxonomy)
    changed=[]
    for filename,text in render(data,taxonomy).items():
        path=ROOT/filename
        if not path.exists() or path.read_text()!=text:
            changed.append(filename)
            if not args.check: path.write_text(text)
    if args.check and changed:
        raise SystemExit('Stale generated sheets: '+', '.join(changed))
    print(f"PASS: {len(data['cards'])} cards; {len(taxonomy['traits'])} supported Traits; {len(taxonomy['keywords'])} keywords; "+('all generated sheets current.' if args.check else f'{len(changed)} sheets written.'))

if __name__=='__main__':
    main()
