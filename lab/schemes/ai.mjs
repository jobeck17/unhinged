// Public board + own hand only. No opponent hand identities or deck order reads.
export function value(g, x) {
  if (!x) return 0;
  const c = g.card(x), stats = c.type === 'Character' ? (g.power(x) + Math.max(0, g.remaining(x))) * .45 : 1;
  return 1 + c.cost * .6 + stats + (g.players[x.owner].worker === x.uid ? 2 + g.players[x.owner].progress : 0);
}
export function handValue(g, p, id) {
  const c = g.card(id), s = g.players[p];
  let v = c.type === 'Character' ? 3 + c.cost * .6 : 3;
  if (c.cost > s.stash.length + 2) v -= (c.cost - s.stash.length - 2) * 1.3;
  if (c.effect === 'sweep') v += g.chars(1 - p).length - g.chars(p).length;
  if (c.response) v += 1;
  if (c.effect === 'fuse' && s.hand.filter(id => g.card(id).type === 'Character').length >= 2) v += 4;
  if (c.type === 'Item' && g.items(p).length >= 2) v -= 3;
  return v;
}
function damageValue(g, x, n) {
  if (!x) return 0;
  n = Math.max(0, n - x.shield);
  return n >= g.remaining(x) ? value(g, x) : n * .7;
}
function defendScore(g, p, uid) {
  if (uid == null) return 0;
  const d = g.obj(uid), a = g.obj(g.pending.attacker); if (!a) return -100;
  const attack = g.power(a), absorb = Math.min(attack, g.remaining(d));
  const dead = attack >= g.remaining(d) + d.shield + (g.name(p) === 'HOA President' && !g.players[p].uses.block ? 1 : 0);
  const retaliates = !g.has(d, 'Slowpoke') && (g.rules.combat === 'simultaneous' || g.rules.combat === 'survivor' && !dead);
  const kill = retaliates && g.power(d) >= g.remaining(a) + a.shield;
  const urgency = g.players[p].hp <= attack ? 100 : g.players[p].hp <= 10 ? 1.7 : .65;
  return absorb * urgency + (kill ? value(g, a) : retaliates ? g.power(d) * .45 : 0) - (dead ? value(g, d) : .5) - .7;
}
function targetAttackScore(g, a, d) {
  const incoming = g.power(a), kill = incoming >= g.remaining(d) + d.shield;
  const retaliates = g.rules.combat === 'simultaneous' || g.rules.combat === 'survivor' && !kill;
  const die = retaliates && g.power(d) >= g.remaining(a) + a.shield;
  return damageValue(g, d, incoming) - (die ? value(g, a) : retaliates ? g.power(d) * .4 : 0) + (kill ? 1 : 0) - .6;
}
export function score(g, p, m, { useWork = true } = {}) {
  const s = g.players[p], opp = 1 - p;
  if (m.type === 'end' || m.type === 'passResponse') return 0;
  if (m.type === 'discard') return -handValue(g, p, s.hand[m.index]);
  if (m.type === 'block') return defendScore(g, p, m.target);
  if (m.type === 'choose') {
    if (g.choice.kind === 'rerollAbomination') { const x = g.obj(g.rerollTarget); return m.value === 'keep' ? 0 : 3.5 - (m.value === 'Power' ? g.power(x) : g.guard(x)); }
    if (m.value === null) return -1;
    return handValue(g, p, g.choice.kind === 'findCard' ? g.searchTop[m.value] : m.value);
  }
  if (m.type === 'scheme') {
    if (m.targets) return m.targets.reduce((n, uid) => n + value(g, g.obj(uid)), 0);
    if (m.id) return g.card(m.id).cost + 2;
    if (m.target) return 6 - (m.stat === 'Power' ? g.power(g.obj(m.target)) : g.guard(g.obj(m.target))) + (m.stat === 'Guard' ? g.obj(m.target).damage : 0);
    return 0;
  }
  if (m.type === 'stash') {
    if (s.stash.length >= 7 || s.hand.length <= 1 && s.stash.length >= 3) return -20;
    return 20 - handValue(g, p, s.hand[m.index]) - (s.stash.length >= 5 ? 9 : 0);
  }
  if (m.type === 'work') {
    if (!useWork) return -100;
    const x = g.obj(m.uid), attackers = g.chars(opp), lethal = attackers.some(a => g.power(a) >= g.remaining(x) + x.shield);
    const retaliationTrade = attackers.some(a => g.power(a) >= g.remaining(x) && g.power(x) < g.remaining(a));
    const threatened = g.chars(opp).reduce((n, a) => n + g.power(a), 0) >= s.hp && g.chars(p).filter(a => a.ready).length <= 2;
    if (threatened) return -10;
    return 4 + s.progress * 2.5 - g.power(x) * .5 - (lethal ? retaliationTrade ? 5 : 2.5 : 0) + (g.name(p) === 'Mad Scientist' && g.fuel(p) <= 2 ? 1 : 0);
  }
  if (m.type === 'activate') return Math.min(g.obj(m.target).damage, g.card(g.obj(m.uid)).amount) + 1;
  if (m.type === 'attack') {
    const a = g.obj(m.uid), c = g.card(a), ownThreat = g.chars(opp).reduce((n, x) => n + g.power(x), 0);
    let v;
    if (m.target !== -1) v = targetAttackScore(g, a, g.obj(m.target));
    else {
      const ready = g.chars(opp).filter(x => x.ready && g.players[opp].worker !== x.uid), guards = ready.filter(x => g.has(x, 'Bodyguard'));
      const defenders = guards.length ? guards : ready;
      v = g.power(a) * (g.players[opp].hp <= g.power(a) ? 100 : 1);
      if (defenders.length) v = Math.min(v, ...defenders.map(d => targetAttackScore(g, a, d) + Math.max(0, g.power(a) - g.remaining(d))));
    }
    if (ownThreat >= s.hp && a.ready) v -= 2;
    if (c.onAttack === 'alligator') v -= .8;
    if (m.risk) v += g.remaining(a) > 1 ? 1.8 : -20;
    return v;
  }
  if (m.type === 'play' || m.type === 'respond') {
    const c = g.card(s.hand[m.index]), x = g.obj(m.target), price = g.cost(p, c);
    let v = -.4 * price;
    if (c.type === 'Character') {
      v += 2 + (c.power + c.guard) * .55 - Math.max(0, g.chars(p).length - 4) * .6;
      if (c.onPlay === 'sweep_others') v += g.chars(opp).reduce((n, y) => n + damageValue(g, y, c.amount), 0) - g.chars(p).reduce((n, y) => n + damageValue(g, y, c.amount), 0);
      if (c.onPlay === 'enemy_damage' && x) v += damageValue(g, x, c.amount);
      if (['enemy_bounce', 'small_bounce'].includes(c.onPlay) && x) v += value(g, x) * .65;
      if (c.onPlay === 'friendly_bounce' && x) v += (x.damage > 0 ? x.damage : 0) - g.power(x) * .5 - 2 + (g.card(x).onReturn ? 3 : 0) - (s.worker === x.uid ? 10 : 0);
      if (c.onPlay === 'self_damage' && x) v += g.remaining(x) <= 1 ? -20 : g.card(x).damagedPower && !x.damage ? 2 : -.5;
      if (c.onPlay === 'heal' && x) v += Math.min(2, x.damage);
      if (c.onPlay === 'recharge') v += 2;
      if (g.name(p) === 'Crazy Cat Lady' && c.traits.includes('Cat') && g.chars(p).filter(x => g.trait(x, 'Cat')).length < 3) v += 2;
    } else if (c.type === 'Item') v += g.chars(p).some(x => x.damage) ? 4 : g.items(p).length ? -.5 : 1.5;
    else switch (c.effect) {
      case 'sweep': v += g.chars(opp).reduce((n, y) => n + damageValue(g, y, c.amount), 0) - g.chars(p).reduce((n, y) => n + damageValue(g, y, c.amount), 0) - 1; break;
      case 'damage': v += damageValue(g, x, c.amount) * (x.owner === p ? -1 : 1) - 1; break;
      case 'bounce': v += value(g, x) * .8 - 1; break;
      case 'itemkill': v += (x.owner === p ? -1 : 1) * value(g, x) + 1; break;
      case 'risk_buff': v += g.remaining(x) > 1 && g.canAttack(x) ? 3 : -20; break;
      case 'cycle_ready': v += 2.4; break;
      case 'friendly_bounce_draw': v += x.damage + (g.card(x).onReturn ? 3 : 1) - g.power(x) * .5 - (s.worker === x.uid ? 10 : 0); break;
      case 'freeze': v += g.power(x) * .7 + (g.players[opp].worker === x.uid ? -2 : 0) - .5; break;
      case 'sac_damage': v += damageValue(g, g.obj(m.second), g.power(x)) - value(g, x) + (g.name(p) === 'Backyard Wrestler' && !s.uses.tag ? 3 : 0); break;
      case 'find_cat': v += 3; break;
      case 'fuse': v += 9 - m.ingredients.reduce((n, i) => n + handValue(g, p, s.hand[i]) * .3, 0); break;
      case 'shield': {
        if (m.type !== 'respond') { v -= 10; break; }
        const a = g.obj(g.pending.attacker), d = g.obj(g.pending.defender);
        const incoming = x.uid === a?.uid ? (d ? g.power(d) : 0) : a ? g.power(a) : 0;
        v += incoming >= g.remaining(x) + x.shield && incoming < g.remaining(x) + x.shield + c.amount ? value(g, x) + 1 : -.5;
        break;
      }
    }
    if (m.type === 'respond' && c.effect === 'damage' && x.uid === g.pending.attacker && g.remaining(x) <= c.amount) v += 3;
    if (m.type === 'play' && g.name(p) === 'Washed-Up Rock Star' && s.played === 1 && s.hand.length <= 3) v += 1.5;
    return v;
  }
  return -100;
}
export function chooseMove(g, policy = {}) {
  const p = g.actor;
  if (g.phase === 'mulligan') {
    const hand = g.players[p].hand;
    return { type: 'mulligan', indices: hand.map((id, i) => g.card(id).cost >= 4 || (g.card(id).effect === 'fuse' && hand.filter(x => g.card(x).effect === 'fuse').length > 1 && i !== hand.findIndex(x => g.card(x).effect === 'fuse')) ? i : null).filter(i => i !== null) };
  }
  const moves = g.legalMoves(); let best = moves[0], rating = -Infinity;
  for (const move of moves) { const v = score(g, p, move, policy); if (v > rating) { best = move; rating = v; } }
  return best;
}
