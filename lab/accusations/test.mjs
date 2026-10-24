// Rule and invariant checks: `node test.mjs`.
import assert from 'node:assert/strict';
import {Game, RULES, describe} from './engine.mjs';
import {cards, decks, batch, playOut} from './simulate.mjs';
import {chooseMove} from './ai.mjs';

let count = 0;
const test = (name, fn) => { fn(); count++; console.log('PASS ' + name); };
const byKey = k => cards.cards.find(c => c.key === k).id;

// A started game with empty hands, a fresh turn for player 0, and plenty of Ready Stash.
function table({first = 0} = {}) {
  const g = new Game(cards, decks, {seed: 7, first});
  g.apply({type: 'mulligan', indices: []});
  g.apply({type: 'mulligan', indices: []});
  for (const P of g.players) { P.hand = []; P.stash = Array.from({length: 6}, () => ({id: P.deck.pop(), ready: true})); }
  g.turnNo = 5;
  g.active = 0;
  return g;
}
const put = (g, p, key, loc = 'home', extra = {}) => Object.assign(g.enter(p, byKey(key)), {born: 1, loc}, extra);
const accuse = (g, p, key, slot = g.slots.indexOf(null)) => { g.slots[slot] = {uid: g.nextUid++, id: byKey(key), owner: p, order: ++g.scOrder, born: 1}; return slot; };
const find = (g, pred) => { const m = g.legalMoves().find(pred); assert(m, 'expected a legal move'); return m; };
const startTurn = (g, p) => { g.active = 1 - p; g.endTurn(); g.run(); assert.equal(g.active, p); };
const drain = g => { while (g.pending) g.apply(chooseMove(g)); };

test('decks match RULES.md §12: 40 Main, 10 Scenario, ≤4 copies, single Style', () => {
  for (const d of decks.decks) {
    const main = Object.values(d.main).reduce((a, b) => a + b, 0), sc = Object.values(d.scenarios).reduce((a, b) => a + b, 0);
    assert.equal(main, 40, d.name);
    assert.equal(sc, 10, d.name);
    for (const [id, n] of [...Object.entries(d.main), ...Object.entries(d.scenarios)]) {
      const c = cards.cards.find(c => c.id === id);
      assert(c, id);
      assert(n <= 4);
      assert.equal(c.style, d.style);
    }
    for (const id of Object.keys(d.scenarios)) assert.equal(cards.cards.find(c => c.id === id).type, 'Scenario');
    for (const id of Object.keys(d.main)) assert.notEqual(cards.cards.find(c => c.id === id).type, 'Scenario');
  }
});

test('setup: 5 Main + 2 Scenario, mulligan returns to the right decks, first player skips the draw', () => {
  const g = new Game(cards, decks, {seed: 3, first: 1});
  for (const P of g.players) {
    assert.equal(P.hand.filter(id => g.def(id).type === 'Scenario').length, 2);
    assert.equal(P.hand.length, 7);
  }
  assert.equal(g.actor, 1);
  g.apply({type: 'mulligan', indices: [0, 1, 2, 3, 4, 5, 6]});
  assert.equal(g.players[1].hand.filter(id => g.def(id).type === 'Scenario').length, 2);
  assert.equal(g.players[1].deck.length, 35);
  g.apply({type: 'mulligan', indices: []});
  assert.equal(g.active, 1);
  assert.equal(g.players[1].hand.length, 7);
  g.apply({type: 'end'});
  assert.equal(g.players[0].hand.length, 8);
});

test('Scenarios need a Character, an immediate commit, and respect one-per-turn and two-owned limits', () => {
  const g = table();
  g.players[0].hand = [byKey('grass'), byKey('grass'), byKey('christmas-lights')];
  assert(!g.legalMoves().some(m => m.type === 'scenario'));
  const a = put(g, 0, 'old-guy'), b = put(g, 0, 'marine');
  g.apply(find(g, m => m.type === 'scenario' && m.uid === a.uid));
  assert.equal(a.loc, 0);
  assert.equal(g.fuel(0), 5);
  assert(!g.legalMoves().some(m => m.type === 'scenario'), 'one Scenario per turn');
  g.players[0].t = {};
  g.apply(find(g, m => m.type === 'scenario' && m.uid === b.uid));
  g.players[0].t = {};
  put(g, 0, 'grandma');
  assert(!g.legalMoves().some(m => m.type === 'scenario'), 'at most two active Scenarios');
});

test('commit/withdraw once per turn, capacity three, and Home Characters cannot fight', () => {
  const g = table(), s = accuse(g, 1, 'gator-pool');
  const xs = [0, 1, 2, 3].map(() => put(g, 0, 'old-guy'));
  for (const x of xs.slice(0, 3)) g.apply(find(g, m => m.type === 'commit' && m.uid === x.uid));
  assert(!g.legalMoves().some(m => m.type === 'commit' && m.uid === xs[3].uid), 'fourth commit blocked');
  assert(!g.legalMoves().some(m => m.type === 'withdraw' && m.uid === xs[0].uid), 'already moved this turn');
  put(g, 1, 'gator-wrangler');
  assert(!g.legalMoves().some(m => m.type === 'attack'), 'no Home targets');
  assert.equal(g.at(s, 0).length, 3);
});

test('attacks: same Scenario only, no retaliation by default, entry delay, Hothead', () => {
  const g = table(), s = accuse(g, 1, 'gator-pool');
  const fresh = put(g, 0, 'marine', s, {born: 5}), vet = put(g, 0, 'marine', s), bro = put(g, 1, 'frat-bro', s);
  assert(!g.attackTargets(fresh).length);
  g.apply(find(g, m => m.type === 'attack' && m.uid === vet.uid));
  assert.equal(vet.damage, 0, 'no automatic retaliation');
  assert(!g.obj(bro.uid));
  g.active = 1;
  const hot = put(g, 1, 'frat-bro', s, {born: 5});
  assert(g.attackTargets(hot).length, 'Hothead attacks on entry');
});

test('Retaliate hits back even when defeated; Absorb reduces every instance', () => {
  const g = table(), s = accuse(g, 0, 'parked');
  const marine = put(g, 0, 'marine', s, {damage: 3}), loud = put(g, 1, 'loudmouth', s), guard = put(g, 1, 'lifeguard', s);
  g.active = 1;
  g.apply(find(g, m => m.type === 'attack' && m.uid === loud.uid && m.target === marine.uid));
  assert(!g.obj(marine.uid));
  assert(!g.obj(loud.uid), 'Marine retaliates for 3 into a 3-Health Loudmouth');
  drain(g);
  const g2 = table(), s2 = accuse(g2, 1, 'grass'), gator = put(g2, 0, 'gator-wrangler', s2), lg = put(g2, 1, 'lifeguard', s2);
  g2.apply(find(g2, m => m.type === 'attack' && m.uid === gator.uid));
  assert.equal(lg.damage, 2);
  void guard;
});

test('default success and failure checks, defense reward, replacement draw', () => {
  const g = table(), s = accuse(g, 0, 'parked'), t = accuse(g, 0, 'grass');
  put(g, 0, 'old-guy', s);
  put(g, 1, 'gator-wrangler', t);
  const opp = g.players[1].hand.length, sc = g.players[0].scDeck.length;
  startTurn(g, 0);
  drain(g);
  assert.equal(g.players[0].verdict, 1);
  assert.equal(g.slots[s], null);
  assert.equal(g.slots[t], null, 'unsupported Scenario fails');
  assert.equal(g.players[1].hand.length, opp + 1, 'defender drew 1');
  assert.equal(g.players[0].scDeck.length, sc - 2, 'two replacement draws');
  assert.equal(g.players[0].stats.failed, 1);
});

test('Christmas Lights needs two contesters; Fireworks needs two supporters; Code needs an Item', () => {
  const g = table(), a = accuse(g, 0, 'christmas-lights');
  put(g, 0, 'old-guy', a);
  put(g, 1, 'lifeguard', a);
  assert.equal(g.forecast(a).result, 'success');
  put(g, 1, 'lifeguard', a);
  assert.equal(g.forecast(a).result, 'hold');
  const b = accuse(g, 1, 'fireworks');
  put(g, 1, 'gator-wrangler', b);
  assert.equal(g.forecast(b).result, 'hold');
  put(g, 1, 'gator-wrangler', b);
  assert.equal(g.forecast(b).result, 'success');
  const c = accuse(g, 0, 'code'), x = put(g, 0, 'marine', c);
  assert.equal(g.forecast(c).result, 'hold');
  g.players[0].hand = [byKey('clipboard')];
  g.apply(find(g, m => m.type === 'play' && m.target === x.uid));
  assert.equal(g.forecast(c).result, 'success');
});

test('Code protects attached Items from opposing Bolt Cutters', () => {
  const g = table(), c = accuse(g, 0, 'code'), x = put(g, 0, 'marine', c);
  g.players[0].hand = [byKey('clipboard')];
  g.apply(find(g, m => m.type === 'play'));
  g.active = 1;
  put(g, 1, 'gator-wrangler', c);
  g.players[1].hand = [byKey('bolt-cutters')];
  assert(!g.legalMoves().some(m => m.type === 'play'));
  assert.equal(x.items.length, 1);
});

test('Scenario modifiers: Shortcut/Grass power, Flamingo health, Street Legal defeats a 4-Power Character', () => {
  const g = table(), a = accuse(g, 1, 'shortcut'), b = accuse(g, 0, 'grass'), c = accuse(g, 1, 'street-legal');
  const bro = put(g, 1, 'gator-wrangler', a);
  assert.equal(g.power(bro), 4);
  assert.equal(g.health(bro), 1);
  const og = put(g, 0, 'old-guy', b);
  assert.equal(g.power(og), 0);
  const frat = put(g, 1, 'frat-bro', 'home', {damage: 1});
  g.active = 1;
  g.apply(find(g, m => m.type === 'commit' && m.uid === frat.uid && m.slot === c));
  assert(!g.obj(frat.uid), 'Health drops to 1 with 1 damage on it');
});

test('Parked and Cops rotate opposing commits; Stonewall +1 Health lasts through the next HOA turn', () => {
  const g = table(), s = accuse(g, 0, 'parked');
  put(g, 0, 'old-guy', s);
  g.active = 1;
  const x = put(g, 1, 'gator-wrangler');
  g.apply(find(g, m => m.type === 'commit' && m.uid === x.uid));
  assert.equal(x.ready, false);
  const h = table(), t = accuse(h, 1, 'cops');
  put(h, 1, 'lifeguard', t);
  const y = put(h, 0, 'marine'), z = put(h, 0, 'marine');
  h.apply(find(h, m => m.type === 'commit' && m.uid === y.uid));
  h.apply(find(h, m => m.type === 'commit' && m.uid === z.uid));
  assert.equal(y.ready, false);
  assert.equal(h.health(y), 5, 'first defender gets +1');
  assert.equal(h.health(z), 4, 'only the first time each turn');
  h.endTurn(); h.run(); drain(h);
  assert.equal(h.health(y), 5, 'still +1 on the opponent turn');
  h.endTurn(); h.run(); drain(h);
  h.endTurn(); h.run(); drain(h);
  assert.equal(h.health(y), 4, 'expired after HOA\'s next turn');
});

test('Florida Man moves another Home Character in after a Scenario kill; Did You See That unlocks', () => {
  const g = table(), s = accuse(g, 0, 'parked');
  g.active = 1;
  g.players[1].t = {};
  const victim = put(g, 0, 'old-guy', s), wrangler = put(g, 1, 'gator-wrangler', s), backup = put(g, 1, 'lifeguard');
  g.players[1].hand = [byKey('did-you-see-that')];
  assert(!g.legalMoves().some(m => m.type === 'play'));
  g.apply(find(g, m => m.type === 'attack' && m.uid === wrangler.uid && m.target === victim.uid));
  assert.equal(g.pending?.kind, 'commit');
  g.apply({type: 'choose', index: g.pending.options.findIndex(o => o.uid === backup.uid)});
  assert.equal(backup.loc, s);
  assert.equal(backup.moved, -1, 'forced move does not use the voluntary allowance');
  assert(g.legalMoves().some(m => m.type === 'play'));
});

test('Gator Pool lets the defeated Character\'s controller commit a replacement; Boogie Boarder draws', () => {
  const g = table(), s = accuse(g, 1, 'gator-pool');
  const boogie = put(g, 1, 'boogie-boarder', s), spare = put(g, 1, 'lifeguard'), m = put(g, 0, 'marine', s);
  const hand = g.players[1].hand.length;
  g.apply(find(g, x => x.type === 'attack' && x.uid === m.uid && x.target === boogie.uid));
  assert.equal(g.players[1].hand.length, hand + 1);
  assert.equal(g.pending.player, 1);
  g.apply({type: 'choose', index: g.pending.options.findIndex(o => o.uid === spare.uid)});
  assert.equal(spare.loc, s);
});

test('success effects resolve after scoring and before dismissal (Fireworks, Cops, Flamingo)', () => {
  const g = table({first: 1}), f = accuse(g, 1, 'fireworks'), other = accuse(g, 0, 'grass');
  put(g, 1, 'gator-wrangler', f);
  put(g, 1, 'gator-wrangler', f);
  const target = put(g, 0, 'neighborhood-watch', other);
  startTurn(g, 1);
  drain(g);
  assert.equal(g.players[1].verdict, 1);
  assert(!g.obj(target.uid), 'Fireworks dealt 2 to a Character at another Scenario');
  const h = table(), fl = accuse(h, 0, 'flamingo'), x = put(h, 0, 'grandma', fl), enemy = put(h, 1, 'lifeguard');
  h.active = 1;
  h.players[1].hand = [byKey('truck-nuts')];
  h.apply(find(h, m => m.type === 'play' && m.target === enemy.uid));
  startTurn(h, 0);
  drain(h);
  assert.equal(enemy.items.length, 0, 'Flamingo made the opponent dismiss their Item');
  assert.equal(x.loc, 'home');
});

test('opponent Scenarios are never checked on your turn, and a new Scenario survives until the owner\'s next turn', () => {
  const g = table(), a = put(g, 0, 'old-guy');
  g.players[0].hand = [byKey('grass')];
  g.apply(find(g, m => m.type === 'scenario'));
  const s = a.loc;
  g.apply({type: 'end'});
  drain(g);
  assert(g.slots[s], 'still active on the opponent turn');
  g.apply({type: 'end'});
  drain(g);
  assert.equal(g.slots[s], null);
  assert.equal(g.players[0].verdict, 1);
});

test('stall rule abandons the oldest Scenario after three quiet rounds', () => {
  const g = table(), s = accuse(g, 0, 'christmas-lights');
  put(g, 0, 'old-guy', s);
  put(g, 1, 'lifeguard', s);
  put(g, 1, 'lifeguard', s);
  g.first = 0;
  for (let i = 0; i < 6; i++) { g.apply({type: 'end'}); drain(g); }
  assert.equal(g.slots[s], null);
  assert.equal(g.players[0].stats.forced, 1);
});

test('Scenario Deck recycles its discard, including the just-dismissed Scenario', () => {
  const g = table(), s = accuse(g, 0, 'grass');
  g.players[0].scDeck = [];
  g.players[0].scDiscard = [];
  g.players[0].hand = [];
  g.abandon(s, false);
  assert.deepEqual(g.players[0].hand, [byKey('grass')]);
});

test('labels exist for every legal move in random positions', () => {
  for (const r of [11, 12, 13]) {
    const g = new Game(cards, decks, {seed: r});
    for (let i = 0; i < 300 && g.winner === null; i++) {
      for (const m of g.legalMoves()) assert.equal(typeof describe(g, m), 'string');
      g.apply(chooseMove(g));
    }
  }
});

test('300 bot games finish, conserve every card, and score exactly 5 for the winner', () => {
  for (let i = 0; i < 300; i++) {
    const g = new Game(cards, decks, {seed: 1000 + i, decks: i % 2 ? [1, 0] : [0, 1]});
    playOut(g);
    assert.notEqual(g.winner, null, 'seed ' + (1000 + i));
    assert.equal(g.players[g.winner].verdict, RULES.win);
    for (const p of [0, 1]) assert.equal(g.census(p).length, 50);
    assert(g.chars().every(x => x.loc === 'home' || g.slots[x.loc]));
    for (const s of g.liveSlots()) for (const p of [0, 1]) assert(g.at(s, p).length <= RULES.capacity);
  }
  assert.equal(batch(4).length, 4);
});

console.log(`${count} tests passed`);
