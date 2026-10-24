// Greedy heuristic opponent for smoke tests and solo playtests. Uses only its own hand and the public board.
// It is a sparring partner, not balance evidence.

const HOME = 'home';
const value = (g, x) => g.power(x) + g.remaining(x) + g.def(x).cost;

// How many supporters a Scenario needs and how many contesters stop it.
function needs(g, slot) {
  const k = g.scKey(slot);
  return {sup: k === 'fireworks' ? 2 : 1, stop: k === 'christmas-lights' ? 2 : 1, item: k === 'code'};
}

// Damage the player's ready attackers at a slot could deal this turn.
const threat = (g, p, slot) => g.at(slot, p).filter(x => g.canAttack(x)).reduce((n, x) => n + g.power(x), 0);

function keepValue(g, id) {
  const c = g.def(id);
  if (c.type === 'Character') return 10 + c.power + c.health;
  if (['emergency-meeting', 'bolt-cutters', 'objection', 'did-you-see-that'].includes(c.key)) return 1;
  if (c.type === 'Item') return 5;
  return 7;
}

function score(g, m) {
  const p = g.active, opp = 1 - p, P = g.players[p], c = m.index === undefined ? null : g.def(P.hand[m.index]);
  const t = m.target === undefined ? null : g.obj(m.target);
  switch (m.type) {
    case 'end': return 0;
    case 'stash': {
      const mains = P.hand.filter(id => g.def(id).type !== 'Scenario').length;
      if (P.stash.length >= 6 && mains < 4) return -1;
      return 45 - keepValue(g, P.hand[m.index]) - (P.stash.length >= 4 ? 15 : 0);
    }
    case 'scenario': {
      const x = g.obj(m.uid), homeCount = g.home(p).length;
      let v = 34 + c.cost + g.remaining(x) * 0.5;
      if (c.key === 'fireworks' && homeCount < 2) v -= 30;
      if (c.key === 'code' && !x.items.length && !P.hand.some(id => g.def(id).attach)) v -= 25;
      if (c.key === 'christmas-lights') v += 6;
      return v;
    }
    case 'play': {
      if (c.type === 'Character') return 22 + c.power + c.health + (c.keywords?.includes('Hothead') ? 3 : 0);
      if (c.type === 'Item') {
        let v = t.loc === HOME ? 4 : 10;
        if (t.loc !== HOME && g.scKey(t.loc) === 'code' && g.supporting(t) && !g.at(t.loc, p).some(x => x.items.length)) v += 22;
        if (c.key === 'truck-nuts' && g.canAttack(t)) v += 5;
        return v + t.damage * -1;
      }
      switch (c.key) {
        case 'violation-notice': return g.remaining(t) <= 2 && !g.absorbs(t) ? 28 + value(g, t) : 6;
        case 'hold-my-beer': case 'watch-this': {
          if (!g.canAttack(t) && c.key === 'hold-my-beer') return -1;
          const bonus = 2, selfHit = c.key === 'watch-this' ? 2 : 1;
          if (g.remaining(t) <= (c.key === 'hold-my-beer' ? 1 : 0)) return -1;
          const kill = g.chars(opp).filter(e => e.loc === t.loc).some(e => g.power(t) < g.remaining(e) && g.power(t) + bonus >= g.remaining(e));
          return kill ? 20 - (g.remaining(t) <= selfHit + 1 ? 6 : 0) : -1;
        }
        case 'walk-it-off': return t.damage ? 8 + Math.min(2, t.damage) * 4 : 3;
        case 'objection': return g.remaining(t) <= threat(g, opp, t.loc) && g.remaining(t) <= 2 ? 11 : -1;
        case 'bolt-cutters': return t.owner === opp ? 16 : -10;
        case 'did-you-see-that': return 30;
        case 'neighborhood-petition': return P.hand.some(id => g.def(id).type === 'Scenario') ? -1 : 24;
        case 'emergency-meeting': return -1;
      }
      return 1;
    }
    case 'attack': {
      const a = g.obj(m.uid), pw = g.power(a), absorb = g.absorbs(t) ? 1 : 0, kills = pw - absorb >= g.remaining(t);
      let v = kills ? 26 + value(g, t) : 6 + Math.max(0, pw - absorb);
      if (g.def(t).keywords?.includes('Retaliate') && g.power(t) >= g.remaining(a)) v -= value(g, a) + 6;
      if (a.watch === g.turnNo && g.remaining(a) <= 2) v -= 8;
      return v;
    }
    case 'commit': {
      const x = g.obj(m.uid), sc = g.scenario(m.slot), n = needs(g, m.slot);
      const sup = g.at(m.slot, sc.owner).length, con = g.at(m.slot, 1 - sc.owner).length;
      if (sc.owner === p) {
        if (sup < n.sup) return 30;
        if (n.item && !g.at(m.slot, p).some(s => s.items.length) && x.items.length) return 29;
        const danger = threat(g, opp, m.slot) >= Math.min(...g.at(m.slot, p).map(s => g.remaining(s)));
        return con ? 14 + (danger ? 6 : 0) : danger ? 12 : 3;
      }
      const f = g.forecast(m.slot);
      if (f.result === 'success') return 32 + (con + 1 >= n.stop ? 6 : 0);
      if (f.result === 'fail') return con ? -1 : 8;
      return con < 3 ? 9 + g.power(x) : -1;
    }
    case 'withdraw': return -1;
    case 'abandon': {
      const f = g.forecast(m.slot);
      const rescuers = g.home(p).filter(x => x.moved !== g.turnNo).length;
      return f.result === 'fail' && f.con && !rescuers ? 12 : -1;
    }
  }
  return 0;
}

function chooseOption(g, opts) {
  const p = g.actor;
  const rate = o => {
    if (o.decline) return 0;
    const x = o.uid ? g.obj(o.uid) : null;
    switch (o.ai) {
      case 'damage': return g.remaining(x) <= 2 ? 20 + value(g, x) : value(g, x);
      case 'commit': return 5 + g.remaining(x);
      case 'buff': case 'heal': return value(g, x) + x.damage;
      case 'contest': return g.forecast(o.slot).result === 'success' ? 20 : 5;
      case 'lose-item': return -g.def(o.uid ? g.obj(o.uid) : o).cost;
      case 'remove': return value(g, x) + (g.scenario(x.loc)?.owner === p ? 10 : 0);
      case 'tutor': {
        const c = g.def(o.id);
        return (c.key === 'christmas-lights' ? 10 : 0) + (c.cost <= g.players[p].stash.length ? 5 : 0) - c.cost;
      }
      case 'order': return (o.key === 'cops' || o.key === 'fireworks') && o.forecast === 'success' ? 10 : o.forecast === 'success' ? 5 : 0;
    }
    return 1;
  };
  let best = 0, top = -Infinity;
  opts.forEach((o, i) => { const r = rate(o); if (r > top) { top = r; best = i; } });
  return best;
}

export function chooseMove(g) {
  if (g.phase === 'mulligan') {
    const P = g.players[g.actor], chars = P.hand.filter(id => g.def(id).type === 'Character').length;
    // Dig for Characters when the opener has none; otherwise keep.
    return {type: 'mulligan', indices: chars ? [] : P.hand.map((id, i) => g.def(id).type !== 'Scenario' && g.def(id).cost >= 2 ? i : -1).filter(i => i >= 0)};
  }
  if (g.pending) return {type: 'choose', index: chooseOption(g, g.pending.options)};
  let best = {type: 'end'}, top = 0;
  for (const m of g.legalMoves()) {
    const v = score(g, m);
    if (v > top) { top = v; best = m; }
  }
  return best;
}
