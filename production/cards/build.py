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
    'Gnarly': 'No Chill', 'Amped': 'High Turnover', 'Tricky': 'Funny Business',
    'Sketchy': 'Good Enough', 'Spiteful': 'Find Out', 'Wasted': 'Red Shirts',
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
        require(collections.Counter(c['type'] for c in pool) == {'Character':18,'Action':8,'Item':4}, f'{style}: incorrect type mix.')
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
        require(not re.search(r'\b(Command|Stamina|Exhaust|Deploy|dies|died|Controller|Response)\b|Junk Pile', text, re.I), f'{cid}: retired or unimplemented mechanics.')
        require('|' not in text and '\n' not in text, f'{cid}: invalid table text.')
        printed_keywords = [k for k in keyword_names if text.startswith(k+'.')]
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
                require(not text.startswith('When this enters play,') and not c['keywords'] and not re.search(r'Rotate[^.:]*:', text), f'{cid}: not a single ongoing ability.')
            require(set(c['audit_identity']) <= {'Human'}, f'{cid}: unexpected unprinted identity metadata.')
        else:
            require(c['power'] is None and c['guard'] is None and c['complexity'] is None, f'{cid}: non-Character has Character-only fields.')
            require(bool(text), f'{cid}: blank Action or Item.')
    chars = [c for c in cards if c['type'] == 'Character']
    for t in taxonomy['traits']:
        require(any(t['name'] in c['traits'] for c in chars), f"{t['name']}: no printed Character.")
        require(bool(t['support']), f"{t['name']}: no support card recorded.")
        for cid in t['support']:
            require(cid in by_id and re.search(r'\b'+re.escape(t['name'])+r's?\b',by_id[cid]['text']) is not None, f"{t['name']}: missing reference in {cid}.")
    require(sum(not c['text'] for c in chars) == 27, 'Revision target: 27 textless Characters.')
    require(sum(c['complexity']=='activated' for c in chars) == 24, 'Revision target: 24 dedicated Rotate Characters.')
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
    chars = [c for c in cards if c['type']=='Character']
    by_id = {c['id']:c for c in cards}
    files = {}
    header = '> Donut revision 2 · 23 September 2026 · Working playtest text; balance is unverified.\n> Generated from [cards.json](cards.json). Edit the source and run `python3 production/cards/build.py`.\n\n'
    for style, alias in STYLES.items():
        rows = [[c['id'], c['type'], c['cost'], '**'+c['name']+'**', f"{c['power']}/{c['guard']}" if c['type']=='Character' else '—', ', '.join(c['traits']) or '—', display_text(c)] for c in cards if c['style']==style]
        flavor_rows = [[c['id']+' '+c['name'], '*'+c['flavor']+'*'] for c in cards if c['style']==style and c.get('flavor')]
        files[style.lower()+'.md'] = f'# {style} / {alias} — Production Pool v0.1\n\n'+header+table(['ID','Type','Cost','Card','Power / Guard','Traits','Working text'],rows)+'\nA dash in Working text means no rules text. Traits are still active labels. See [Traits](traits.md), [Keywords](keywords.md), and [Rules](../rules/unhinged-rules.md).\n\n## Flavor text\n\nThese optional lines are not rules text and do not change a card’s complexity category.\n\n'+table(['Card','Flavor'],flavor_rows)
    rows = [[c['id'],c['name'],c['style'],c['type'],c['cost'],f"{c['power']}/{c['guard']}" if c['type']=='Character' else '—',', '.join(c['traits']) or '—',CATEGORIES.get(c['complexity'],'—')] for c in cards]
    files['card-list.md']='# Donut Card List\n\n'+header+'180 deck cards; Leaders are outside this count. The six Style sheets contain complete card text.\n\n'+table(['ID','Card','Style','Type','Cost','Power / Guard','Traits','Ability category'],rows)
    trait_rows=[]
    for t in taxonomy['traits']:
        members=[c for c in chars if t['name'] in c['traits']]
        styles=', '.join(f'{s} {sum(c["style"]==s for c in members)}' for s in STYLES if any(c['style']==s for c in members))
        supports=', '.join(f"{cid} {by_id[cid]['name']}" for cid in t['support'])
        trait_rows.append([t['name'],len(members),f'{100*len(members)/len(chars):.1f}%',styles,supports])
    files['traits.md']='# Donut Traits\n\n> Generated from [taxonomy.json](taxonomy.json) and [cards.json](cards.json). Current playtest specification, not a final print lock.\n\nA **Trait** describes what a Character is. It has no automatic ability. A **keyword** supplies a defined rule. A **Style** determines deckbuilding identity. Keep those three jobs separate.\n\n'+taxonomy['trait_policy']['notes']+'\n\nThe saturation guide is roughly **3–15% of the 108 unique deck Characters**. It is a soft design guide. A Character with two Traits counts once in each relevant row; the percentages do not sum to 100%. Human metadata, gained Traits, deck copies, Actions, Items, and Leaders do not inflate these counts.\n\n'+table(['Trait','Characters','Saturation','Style distribution','Cards that use it'],trait_rows)+'\n## Assignment guide\n\n'+table(['Trait','Use it for'],[[t['name'],t['meaning']] for t in taxonomy['traits']])+'\n## Boundaries and reserved space\n\n'+'\n'.join('- '+s for s in taxonomy['notes'])+'\n\nReserved: '+', '.join(taxonomy['reserved'])+'. None has current printed support.\n\nRemoved from current printed labels: '+', '.join(taxonomy['retired_printed_labels'])+'. Old concepts remain in history; these are not automatic aliases. Porch Pirate is Criminal, Pirate Radio Operator is Criminal / Musician, and a living possum is Animal / Scavenger. Their titles do not secretly grant more Traits.\n'
    keyword_rows=[]
    for k in taxonomy['keywords']:
        members=[c for c in chars if k['name'] in c['keywords']]
        keyword_rows.append([k['name'],k['definition'],k['status'],', '.join(c['id']+' '+c['name'] for c in members)])
    files['keywords.md']='# Donut Keywords\n\n> Generated from [taxonomy.json](taxonomy.json). Three keywords in this revision; only Hothead is new.\n\n'+table(['Keyword','Rule','Status','Printed on'],keyword_rows)+'\n## Scope and edge cases\n\n'+'\n'.join('- **'+k['name']+':** '+k['limits'] for k in taxonomy['keywords'])+'\n- Multiple instances of the same keyword do not stack.\n- Floor It! grants Hothead temporarily; it is not an additional printed-keyword Character.\n- Every teaching/print layout should include reminder text or a nearby reference. These short table entries are design sheets, not finished card faces.\n\n## Ordinary vocabulary, not keywords\n\nRotate, Ready, Attack, Block, Defeat, Sacrifice, Dismiss, Draw, and Discard are core instructions. Vulnerable is a Leader state. Enters-play and Defeat triggers need their full timing sentence. Traits such as Undead, Rat, and Daredevil grant no behavior on their own.\n\nJerry-Rig remains earmarked. Encore!, Pick a Card, Scrounge, and similar phrases are card titles, not global abilities. No keyword was added merely to give every Style an exclusive mechanic.\n'
    composition=[[s,18,8,4,30] for s in STYLES]+[['Total',108,48,24,180]]
    complexity=[]
    for key,label in CATEGORIES.items():
        count=sum(c['complexity']==key for c in chars)
        complexity.append([label,count,f'{100*count/len(chars):.1f}%']+[sum(c['style']==s and c['complexity']==key for c in chars) for s in STYLES])
    rotators=[c for c in cards if c['type']=='Item' and re.search(r'Rotate[^.:]*:',c['text'])]
    curves=[[s]+[sum(c['style']==s and c['cost']==cost for c in chars) for cost in range(1,8)] for s in STYLES]
    files['audit.md']='# Donut Revision 2 — Content Audit\n\n> Generated counts, not simulation results. No win rates or balance claims are inferred from this audit.\n\n## Pool composition\n\n'+table(['Style','Characters','Actions','Items','Total'],composition)+'\n## Character complexity\n\nThese categories are mutually exclusive. Keyword-only cards are not textless. A Rotate ability plus another independent ability belongs in Multiple abilities. Several instructions within one enters-play ability remain one on-play ability. The single ongoing category includes a static ability or one triggered ability. Printed Rotate activations also occur on some Multiple-ability Characters.\n\n'+table(['Category','Count','Percent',*STYLES],complexity)+'\n## Character Cost curve\n\n'+table(['Style',*map(str,range(1,8))],curves)+f'\n**{len(rotators)} of 24 Items have a Rotate activation.** Rotating, Readying, and disabling Items now has a real target population; passive Items still function while Rotated unless their text says otherwise.\n\n'+', '.join(c['id']+' '+c['name'] for c in rotators)+'\n\n## Automated checks\n\nStable IDs P001–P180, unique names, per-Style type mix, valid stats/Costs, registered Traits/keywords, support-card references, Character complexity metadata, retired wording in rules text, and generated-sheet freshness. Run `python3 production/cards/build.py --check`.\n\nThe validator does not prove card balance, complete natural-language rules correctness, or playable Leader packages. See [Revision notes](revision-2-notes.md) for manual timing review and playtest priorities.\n'
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
