#!/usr/bin/env python3
"""Focused Donut matchup experiment. No legacy rules or fallback card text.

Heuristic pilots, not a competitive balance oracle. See README for limits.
"""
import argparse
import copy
import itertools
import json
import random
import statistics
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CASE = ROOT / 'production/playtests/florida-vs-hoa'
POOL = json.loads((ROOT / 'production/cards/cards.json').read_text())
CARDS = {c['id']: c for c in POOL['cards']}
DECKS = json.loads((CASE / 'decks.json').read_text())['decks']
SUPPORTED = set('P001 P002 P003 P004 P005 P010 P012 P013 P016 P151 P160 P165 P019 P022 P025 P026 P172 P027 P178 P179 P121 P122 P123 P124 P125 P128 P129 P132 P138 P095 P097 P106 P139 P141 P143 P146 P112 P147 P117 P120'.split())


def validate():
    assert POOL['version'] == '0.1-donut.3'
    for d in DECKS:
        assert sum(d['cards'].values()) == 40
        assert len(d['styles']) == 2 and len(set(d['styles'])) == 2
        assert d['styles'][0] == {'Florida Man': 'Gnarly', 'HOA President': 'Spiteful'}[d['leader']]
        assert all(1 <= n <= 2 for n in d['cards'].values())
        assert set(d['cards']) <= SUPPORTED
        assert all(CARDS[c]['style'] in d['styles'] for c in d['cards'])
    assert set().union(*(set(d['cards']) for d in DECKS)) == SUPPORTED


class Game:
    def __init__(self, seed, first=None, leader_mode='all', aggression=1.0, hoa_charge='activate'):
        self.rng = random.Random(seed)
        self.round = 0
        self.turn = 0
        self.serial = 0
        self.trace = []
        self.metrics = Counter()
        self.planning = False
        self.mode = leader_mode
        self.aggression = aggression
        self.hoa_charge = hoa_charge
        self.players = []
        for d in DECKS:
            deck = [c for c, n in d['cards'].items() for _ in range(n)]
            self.rng.shuffle(deck)
            self.players.append(dict(deck=deck, hand=[], discard=[], board=[], hp=d['health'],
                                     ready=True, fuel=0, charge=0, passive=False, gained=False,
                                     committee=False, attacked=False, empty=False))
        self.first = self.war() if first is None else first
        for p in range(2):
            self.draw(p, 7)
            # Keep at most three inexpensive Characters; replace other opening cards.
            h = self.players[p]['hand']
            keep = sorted((c for c in h if CARDS[c]['type'] == 'Character' and CARDS[c]['cost'] <= 3),
                          key=lambda c: CARDS[c]['cost'])[:3]
            replace = h.copy()
            for c in keep:
                replace.remove(c)
            self.players[p]['hand'] = keep
            self.draw(p, len(replace))
            self.players[p]['deck'].extend(replace)
            self.rng.shuffle(self.players[p]['deck'])

    def fork(self):
        g = copy.copy(self)
        g.players = []
        for s in self.players:
            t = s.copy()
            for key in ('deck', 'hand', 'discard'):
                t[key] = s[key].copy()
            t['board'] = [x.copy() for x in s['board']]
            g.players.append(t)
        g.trace = []
        g.metrics = self.metrics.copy()
        g.planning = True
        return g

    def log(self, s):
        if not self.planning:
            self.trace.append(f'R{self.round} {DECKS[self.turn]["leader"]}: {s}')

    def war(self):
        a, b = [p['deck'].copy() or p['discard'].copy() for p in self.players]
        self.rng.shuffle(a)
        self.rng.shuffle(b)
        while a and b:
            x, y = CARDS[a.pop()]['cost'], CARDS[b.pop()]['cost']
            if x != y:
                return int(y > x)
        # Pathological exhaustion: repeat War with the full available piles.
        if a or b:
            return int(bool(b))
        return self.war()

    def draw(self, p, n=1):
        for _ in range(n):
            if not self.players[p]['deck']:
                self.players[p]['empty'] = True
                return
            self.players[p]['hand'].append(self.players[p]['deck'].pop())

    def discard(self, p, n=1):
        s = self.players[p]
        for _ in range(min(n, len(s['hand']))):
            # Private hand is used only by its owner's policy.
            c = min(s['hand'], key=lambda c: (CARDS[c]['type'] == 'Character', -CARDS[c]['cost']))
            s['hand'].remove(c)
            s['discard'].append(c)

    def obj(self, uid):
        return next((x for s in self.players for x in s['board'] if x['uid'] == uid), None)

    def chars(self, p):
        return [x for x in self.players[p]['board'] if CARDS[x['id']]['type'] == 'Character']

    def items(self, x):
        return [i for s in self.players for i in s['board'] if i.get('attached') == x['uid']]

    def power(self, x):
        return max(0, CARDS[x['id']]['power'] + x['power'] + sum(i['id'] == 'P027' for i in self.items(x)))

    def guard(self, x):
        return CARDS[x['id']]['guard'] + x['guard'] + sum(i['id'] in ('P117', 'P179') for i in self.items(x))

    def leave(self, x, hand=False):
        if self.obj(x['uid']) is None:
            return
        s = self.players[x['owner']]
        for i in list(self.items(x)):
            s['board'].remove(i)
            s['discard'].append(i['id'])
        s['board'].remove(x)
        s['hand' if hand else 'discard'].append(x['id'])

    def check(self):
        for p in range(2):
            for x in list(self.chars(p)):
                if x['damage'] >= self.guard(x):
                    self.leave(x)

    def gain(self, p):
        s = self.players[p]
        if self.mode == 'all' and not s['gained']:
            s['gained'] = True
            if s['charge'] < 3:
                s['charge'] += 1
                self.metrics[f'charge_{p}'] += 1

    def damage(self, x, n, pending=None):
        if n <= 0 or self.obj(x['uid']) is None:
            return
        x['damage'] += n
        survived = x['damage'] < self.guard(x)
        if not survived:
            self.leave(x)
        if survived and x['owner'] == 1 and self.turn == 0 and self.hoa_charge == 'damage':
            self.gain(1)
        if survived and x['owner'] == self.turn == 0 and self.mode != 'none' and not self.players[0]['passive']:
            self.players[0]['passive'] = True
            if pending is not None:
                pending.append(x['uid'])
            else:
                x['power'] += 1
                self.gain(0)

    def heal(self, x, n):
        x['damage'] = max(0, x['damage'] - n)

    def enter(self, p, cid, attach=None):
        self.serial += 1
        x = dict(uid=self.serial, id=cid, owner=p, ready=True, born=self.round,
                 damage=0, power=0, guard=0, hot=False, attacked=False, committee=False, attached=attach)
        self.players[p]['board'].append(x)
        return x

    def can_attack(self, x):
        return x['ready'] and (x['born'] < self.round or x['hot'] or x['id'] == 'P016')

    def actions(self, p):
        s, enemy = self.players[p], self.players[1-p]
        own, opp = self.chars(p), self.chars(1-p)
        out = []
        for cid in sorted(set(s['hand'])):
            c = CARDS[cid]
            if c['cost'] > s['fuel']:
                continue
            typ = c['type']
            if typ == 'Character':
                # Instructions Guy may choose own Leader or another Character.
                for target in ([-1] + [x['uid'] for x in own] if cid == 'P010' else [None]):
                    out.append(('play', cid, target))
            elif typ == 'Item':
                for target in ([x['uid'] for x in own] if cid in ('P027', 'P178', 'P179', 'P117') else [None]):
                    out.append(('play', cid, target))
            elif cid == 'P022':
                out.append(('play', cid, None))
            elif cid == 'P146':
                for target in [None] + ([x['uid'] for x in own] if not s['attacked'] else []):
                    out.append(('play', cid, target))
            elif cid == 'P172':
                for x in own:
                    if x['damage']:
                        # A physical different copy is still legal; hand copy precedes Return.
                        choices = [None] + sorted(set(k for k in s['hand'] if CARDS[k]['type'] == 'Character' and CARDS[k]['cost'] <= CARDS[x['id']]['cost']))
                        for k in choices:
                            out.append(('tag', cid, x['uid'], k))
            else:
                targets = opp if cid in ('P139', 'P141') else own + opp if cid == 'P143' else own
                for x in targets:
                    if cid == 'P025' and x['ready']:
                        continue
                    if cid == 'P026':
                        out += [('play', cid, x['uid'], hurt) for hurt in (False, True)]
                    else:
                        out.append(('play', cid, x['uid']))
        for x in own:
            if self.can_attack(x):
                for target in [-1] + [y['uid'] for y in opp if not y['ready']]:
                    for risk in ((False, True) if x['id'] == 'P002' else (False,)):
                        out.append(('attack', x['uid'], target, risk))
            if x['ready'] and x['born'] < self.round:
                if x['id'] in ('P003', 'P165'):
                    for y in own:
                        if y is not x:
                            out.append(('activate', x['uid'], y['uid']))
                if x['id'] in ('P124', 'P132'):
                    for y in own:
                        if y['damage']:
                            out.append(('activate', x['uid'], y['uid']))
                    if x['id'] == 'P132' and s['hp'] < 25:
                        out.append(('activate', x['uid'], -1))
                if x['id'] == 'P138':
                    out += [('activate', x['uid'], y['uid']) for y in opp]
        for i in s['board']:
            cid = i['id']
            if cid in ('P027', 'P178'):
                out.append(('activate', i['uid'], i['attached']))
            if cid == 'P120':
                out += [('activate', i['uid'], y['uid']) for y in own if y['damage']]
            if i['ready']:
                if cid in ('P117', 'P179'):
                    x = self.obj(i['attached'])
                    if x and x['damage']:
                        out.append(('activate', i['uid'], x['uid']))
                if cid == 'P147':
                    out += [('activate', i['uid'], y['uid']) for y in opp]
        if s['ready'] and self.mode != 'none':
            out += [('leader', x['uid']) for x in own if (x['ready'] if p == 0 else x['damage'] > 0)]
            if s['charge'] == 3 and self.mode == 'all':
                if p == 0:
                    out += [('ultimate', target) for target in [-1] + [x['uid'] for x in opp]]
                else:
                    ids = [x['uid'] for x in opp if not x['ready']]
                    out += [('ultimate', *targets) for n in (1, 2) for targets in itertools.combinations(ids, n)]
        return out

    def execute(self, a, p):
        self.turn = p
        s = self.players[p]
        kind = a[0]
        if kind in ('play', 'tag'):
            cid, target = a[1:3]
            c = CARDS[cid]
            s['fuel'] -= c['cost']
            s['hand'].remove(cid)
            x = self.obj(target)
            self.log(f'Play {c["name"]}' + (f' → {CARDS[x["id"]]["name"]}' if x else ''))
            if c['type'] in ('Character', 'Item'):
                self.enter(p, cid, target if c['type'] == 'Item' else None)
                if cid == 'P010':
                    if target == -1:
                        s['hp'] -= 2
                    else:
                        self.damage(x, 2)
            else:
                if cid == 'P019':
                    bonus = 3 if 'Daredevil' in CARDS[x['id']]['traits'] else 2
                    self.damage(x, 1)
                    if self.obj(x['uid']):
                        x['power'] += bonus
                elif cid == 'P022':
                    self.draw(p, 2)
                    s['hp'] -= 1
                elif cid == 'P025':
                    x['ready'] = True
                    self.damage(x, 2)
                    x['hot'] = True
                elif cid == 'P026':
                    self.heal(x, 2)
                    if a[3]:
                        self.damage(x, 1)
                        self.draw(p)
                elif cid == 'P172':
                    wrestler = 'Wrestler' in CARDS[x['id']]['traits']
                    self.leave(x, hand=True)
                    if a[3] is not None:
                        k = a[3]
                        s['hand'].remove(k)
                        y = self.enter(p, k)
                        y['hot'] = wrestler
                        if k == 'P010':
                            # The pilot chooses the always-legal Leader target for this extra Play.
                            s['hp'] -= 2
                elif cid in ('P139', 'P141', 'P143'):
                    x['power'] -= {'P139': 2, 'P141': 3, 'P143': 1}[cid]
                    if cid == 'P143':
                        x['guard'] -= 1
                        self.check()
                elif cid == 'P146':
                    self.draw(p)
                    if x and not s['attacked']:
                        x['guard'] += 3 if 'HOA' in CARDS[x['id']]['traits'] else 2
                elif cid == 'P112':
                    self.heal(x, 3 if 'Scavenger' in CARDS[x['id']]['traits'] else 2)
                else:
                    raise AssertionError(cid)
                s['discard'].append(cid)
        elif kind == 'activate':
            x, target = self.obj(a[1]), a[2]
            y = self.obj(target)
            cid = x['id']
            self.log(f'Activate {CARDS[cid]["name"]}')
            if cid in ('P027', 'P178', 'P120'):
                self.leave(x)
            else:
                x['ready'] = False
            if cid == 'P003':
                self.damage(y, 1)
                if self.obj(y['uid']):
                    y['power'] += 2
            elif cid == 'P165':
                y['power'] += 3 if set(CARDS[y['id']]['traits']) & {'Wrestler', 'Daredevil'} else 2
            elif cid in ('P124', 'P132'):
                if target == -1:
                    s['hp'] = min(25, s['hp'] + 2)
                else:
                    self.heal(y, 2)
            elif cid == 'P138':
                y['power'] -= 3 if self.power(y) > self.power(x) else 2
            elif cid == 'P147':
                y['power'] -= 1
            elif cid == 'P027':
                y['ready'] = True
                self.damage(y, 1)
            elif cid == 'P178':
                y['power'] += 3 if 'Wrestler' in CARDS[y['id']]['traits'] else 2
            elif cid in ('P117', 'P179'):
                self.heal(y, 2 if cid == 'P117' and 'Construct' in CARDS[y['id']]['traits'] else 1)
            elif cid == 'P120':
                self.heal(y, 2)
                if 'Scavenger' in CARDS[y['id']]['traits']:
                    self.draw(p)
                    self.discard(p)
            self.metrics[f'board_activations_{p}'] += 1
            if p == 1 and self.hoa_charge == 'activate':
                self.gain(1)
        elif kind == 'leader':
            s['ready'] = False
            x = self.obj(a[1])
            self.metrics[f'ability_{p}'] += 1
            self.log('Leader ability → ' + CARDS[x['id']]['name'])
            if p == 0:
                self.damage(x, 1)
                if self.obj(x['uid']):
                    x['power'] += 2
            else:
                self.heal(x, 2)
        elif kind == 'ultimate':
            assert s['charge'] == 3 and s['ready']
            s['ready'] = False
            s['charge'] = 0
            self.metrics[f'ultimate_{p}'] += 1
            self.metrics[f'first_ultimate_round_{p}'] = self.metrics.get(f'first_ultimate_round_{p}', self.round)
            if p == 0:
                roll = 3.5 if self.planning else self.rng.randint(1, 6)
                self.metrics['ultimate_damage_0'] += roll
                self.log(f'Ultimate → {a[1]}, die {roll}')
                if a[1] == -1:
                    self.players[1]['hp'] -= roll
                else:
                    self.damage(self.obj(a[1]), roll)
            else:
                self.log('Ultimate → ' + ', '.join(CARDS[self.obj(k)['id']]['name'] for k in a[1:]))
                for k in a[1:]:
                    self.damage(self.obj(k), 2)
        elif kind == 'attack':
            self.attack(a, p)
        else:
            raise AssertionError(kind)
        self.check()

    def combat(self, attacker_id, target, block_ids=(), discards=0, boost=None, attack_bonus=0):
        a = self.obj(attacker_id)
        p = a['owner']
        defender = self.players[1-p]
        blockers = [self.obj(i) for i in block_ids]
        pending = []
        bonus = attack_bonus
        if blockers:
            for x in blockers:
                x['ready'] = False
                if x['id'] == 'P121':
                    bonus -= 1
                for k in self.chars(1-p):
                    if k['id'] == 'P125' and k is not x:
                        k['power'] += 1
            if 1-p == 1 and self.mode != 'none' and not defender['passive']:
                defender['passive'] = True
            else:
                boost = None
            self.discard(1-p, discards)
        power = max(0, self.power(a) + bonus)
        retal = 0
        if target == -1:
            for index, x in enumerate(blockers):
                # The limited pilot assigns all its Guard Discards to the first Blocker.
                temp = discards if index == 0 else 0
                absorbed = min(power, temp)
                power -= absorbed
                hit = min(power, max(0, self.guard(x) - x['damage']))
                power -= hit
                retaliation = self.power(x) + int(x['uid'] == boost)
                self.damage(x, hit, pending)
                if self.obj(x['uid']) or x['id'] == 'P005':
                    retal += retaliation
            defender['hp'] -= power
        else:
            x = self.obj(target)
            self.damage(x, power, pending)
            if self.obj(target):
                retal = self.power(x)
        self.damage(a, retal, pending)
        for uid in pending:
            x = self.obj(uid)
            if x:
                x['power'] += 1
            self.gain(0)
        if blockers and 1-p == 1 and self.hoa_charge == 'block' and any(self.obj(i) for i in block_ids):
            self.gain(1)

    def defense(self, attacker, bonus):
        p = attacker['owner']
        d = 1-p
        if not self.players[d]['ready']:
            return (), 0, None
        ready = [x['uid'] for x in sorted((x for x in self.chars(d) if x['ready']), key=lambda x: self.power(x) + self.guard(x) - x['damage'], reverse=True)[:5]]
        # Explore up to two of the five strongest blockers and two Guard Discards.
        # Larger blocks/discards are legal in the game but omitted by this pilot.
        best, best_score = ((), 0, None), float('-inf')
        for n in range(min(2, len(ready)) + 1):
            for ids in itertools.combinations(ready, n):
                # Two useful damage orders; not every possible permutation.
                orders = {tuple(sorted(ids, key=lambda k: self.guard(self.obj(k)) - self.obj(k)['damage'])),
                          tuple(sorted(ids, key=lambda k: self.guard(self.obj(k)) - self.obj(k)['damage'], reverse=True))}
                for order in orders:
                    for num in range(min(2, len(self.players[d]['hand'])) + 1 if n else 1):
                        boosts = order if order and d == 1 and not self.players[d]['passive'] and self.mode != 'none' else (None,)
                        for boost in boosts:
                            g = self.fork()
                            g.planning = True
                            g.combat(attacker['uid'], -1, order, num, boost, bonus)
                            score = g.value(d)
                            if score > best_score:
                                best, best_score = (order, num, boost), score
        return best

    def attack(self, action, p):
        a, target, risk = self.obj(action[1]), action[2], action[3]
        a['ready'] = False
        a['attacked'] = True
        self.players[p]['attacked'] = True
        self.metrics[f'attacks_{p}'] += 1
        self.metrics[f'leader_attacks_{p}'] += int(target == -1)
        bonus = 0
        if a['id'] == 'P002' and risk:
            self.damage(a, 1)
            bonus += 2
        if a['id'] == 'P005' and self.players[p]['deck']:
            if self.planning:
                # Public-deck prior only; never inspect the hidden top card when choosing.
                bonus += 3 * sum(n for k, n in DECKS[p]['cards'].items() if CARDS[k]['cost'] >= 3) / 40
            else:
                top = self.players[p]['deck'].pop()
                self.players[p]['deck'].insert(0, top)
                bonus += 3 if CARDS[top]['cost'] >= 3 else 0
                self.log('Toddler reveals ' + CARDS[top]['name'])
        if not self.obj(a['uid']):
            return
        if target != -1 and a['id'] == 'P001' and self.guard(self.obj(target)) >= 3:
            bonus += 2
        defender = self.players[1-p]
        if target == -1:
            for committee in self.chars(1-p):
                if committee['id'] == 'P122' and not committee['committee']:
                    bonus -= 1
                    committee['committee'] = True
        blocks, discards, boost = self.defense(a, bonus) if target == -1 else ((), 0, None)
        self.metrics[f'blocks_{1-p}'] += len(blocks)
        self.metrics[f'guard_discards_{1-p}'] += discards
        self.metrics[f'vulnerable_attacks_{1-p}'] += int(target == -1 and not defender['ready'])
        names = [CARDS[self.obj(i)['id']]['name'] for i in blocks]
        self.log(f'{CARDS[a["id"]]["name"]} attacks ' + ('Leader' if target == -1 else CARDS[self.obj(target)['id']]['name']) + f'; blocks={names}, Guard Discards={discards}')
        self.combat(a['uid'], target, blocks, discards, boost, bonus)

    def value(self, p):
        values = []
        for k, s in enumerate(self.players):
            if s['hp'] <= 0 or s['empty']:
                values.append(-10000)
                continue
            v = self.aggression * (s['hp'] * .8 - max(0, 10-s['hp']) * .7)
            v += len(s['hand']) * .9 + s['fuel'] * .12 + s['charge'] * .65
            for x in self.chars(k):
                remain = self.guard(x) - x['damage']
                base_power = max(0, CARDS[x['id']]['power'] + sum(i['id'] == 'P027' for i in self.items(x)))
                usable = .65 if x['ready'] else .12
                v += 1.1 + base_power * .65 + (self.power(x)-base_power) * usable + remain * .65
                if x['ready']:
                    v += .5 + (self.power(x) * .28 if self.can_attack(x) else .1)
                if x['id'] in ('P003', 'P124', 'P132', 'P138', 'P165'):
                    v += .5
            v += sum(.85 for x in s['board'] if CARDS[x['id']]['type'] == 'Item')
            if not s['ready']:
                threat = sum(self.power(x) for x in self.chars(1-k) if self.can_attack(x))
                v -= min(5, threat * .3)
            values.append(v)
        return values[p] - values[1-p]

    def choose(self, p):
        current = self.value(p)
        best, best_gain = None, .015
        for a in self.actions(p):
            g = self.fork()
            g.planning = True
            g.trace = []
            g.execute(a, p)
            gain = g.value(p) - current
            # Transient boosts/debuffs get credit only if usable before they expire.
            # One-ply policy remains imperfect; see report.
            if gain > best_gain:
                best, best_gain = a, gain
        return best

    def winner(self):
        lost = [s['hp'] <= 0 or s['empty'] for s in self.players]
        if all(lost):
            return self.war()
        if any(lost):
            return int(lost[0])
        return None

    def run(self, cap=30):
        first = self.first
        for r in range(1, cap+1):
            self.round = r
            for p, s in enumerate(self.players):
                s.update(ready=True, fuel=min(r, 7), passive=False, gained=False, committee=False, attacked=False)
                for x in s['board']:
                    x['ready'] = True
                    x['committee'] = False
                self.draw(p)
            w = self.winner()
            if w is not None:
                return w
            p, passed = first, None
            for step in range(250):
                self.turn = p
                a = self.choose(p)
                if a is None:
                    self.log('Pass')
                    if passed is not None:
                        first = passed
                        break
                    passed = p
                else:
                    passed = None
                    self.execute(a, p)
                    for owner, state in enumerate(self.players):
                        counts = Counter(state['deck'] + state['hand'] + state['discard'] + [x['id'] for x in state['board']])
                        assert counts == Counter(DECKS[owner]['cards']), counts
                        assert state['fuel'] >= 0 and 0 <= state['charge'] <= 3
                    w = self.winner()
                    if w is not None:
                        return w
                p = 1-p
            else:
                raise RuntimeError('Turn cap reached; do not count as a result')
            for s in self.players:
                for x in s['board']:
                    x.update(power=0, guard=0, hot=False, attacked=False)
            self.check()
            self.log('Round end: Health ' + str([s['hp'] for s in self.players]))
        return None


def generate_deck_sheet():
    lines = ['# Florida Man vs. HOA President — 40-card test decks', '',
             'Donut 0.1, pool revision 3. Each Leader starts outside the deck at 25 Health. See [leader rules](leaders.md).', '']
    for d in DECKS:
        lines += [f'## {d["name"]}', '', f'**{d["leader"]} — {" + ".join(d["styles"])}**', '',
                  '24 Characters · 10 Actions · 6 Items. Every listed card is included twice.', '',
                  '| Copies | ID | Card | Style | Type | Cost |', '| ---: | --- | --- | --- | --- | ---: |']
        for k in sorted(d['cards'], key=lambda k: ({'Character': 0, 'Action': 1, 'Item': 2}[CARDS[k]['type']], CARDS[k]['cost'], k)):
            c = CARDS[k]
            lines.append(f'| 2 | {k} | {c["name"]} | {c["style"]} | {c["type"]} | {c["cost"]} |')
        styles = Counter()
        curve = Counter()
        for k, n in d['cards'].items():
            styles[CARDS[k]['style']] += n
            curve[CARDS[k]['cost']] += n
        lines += ['', 'Style counts: ' + ', '.join(f'{k} {n}' for k, n in styles.items()) + '.',
                  'Cost curve: ' + ', '.join(f'{k}-cost ×{n}' for k, n in sorted(curve.items())) + '.', '']
    (CASE / 'decks.md').write_text('\n'.join(lines) + '\n')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--games', type=int, default=20)
    parser.add_argument('--seed', type=int, default=240926)
    parser.add_argument('--mode', choices=['all', 'regular', 'none'], default='all')
    parser.add_argument('--aggression', type=float, default=1.0)
    parser.add_argument('--hoa-charge', choices=['activate', 'block', 'damage'], default='activate')
    parser.add_argument('--output', default='results.json')
    args = parser.parse_args()
    validate()
    results = []
    for i in range(args.games):
        # Paired first-player swaps: same initial decks and seed, opposite initiative.
        g = Game(args.seed + i//2, first=i % 2, leader_mode=args.mode, aggression=args.aggression, hoa_charge=args.hoa_charge)
        winner = g.run()
        results.append(dict(seed=args.seed+i//2, first=i%2, winner=winner, rounds=g.round,
                            health=[s['hp'] for s in g.players], metrics=dict(g.metrics)))
        if i == 0:
            (CASE / ('sample-' + Path(args.output).stem + '.md')).write_text('# Seeded heuristic game transcript\n\n' + '\n'.join('- ' + t for t in g.trace) + f'\n\nWinner: {winner}; final Health: {[s["hp"] for s in g.players]}.\n')
        print(f'{i+1}/{args.games}: winner={winner} rounds={g.round}', flush=True)
    out = dict(seed=args.seed, mode=args.mode, aggression=args.aggression, hoa_charge=args.hoa_charge,
               note='Heuristic experiment, not human win rates; see README for policy restrictions.',
               games=results)
    (CASE / args.output).write_text(json.dumps(out, indent=2) + '\n')
    print(json.dumps({'wins':dict(Counter(str(g['winner']) for g in results)), 'mean_rounds':statistics.mean(g['rounds'] for g in results)}))


if __name__ == '__main__':
    main()
