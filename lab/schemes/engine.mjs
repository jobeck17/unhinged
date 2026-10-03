// Scheme LAB only. One deterministic rules engine for humans, bots, and tests.
export function rng32(seed) {
  let a = seed >>> 0;
  return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const combinations = a => a.flatMap((x, i) => a.slice(i + 1).map(y => [x, y]));
export class Game {
  constructor(pool, doc, deckIndices = [0, 1], options = {}) {
    this.cards = Object.fromEntries(pool.cards.map(c => [c.id, c]));
    this.leaders = Object.fromEntries(doc.leaders.map(l => [l.name, l]));
    this.decks = deckIndices.map(i => doc.decks[i]);
    this.random = rng32(options.seed ?? Date.now());
    this.rules = { combat: 'simultaneous', schemes: true, ...options };
    this.first = options.firstPlayer ?? Math.floor(this.random() * 2);
    this.turn = this.first; this.round = 1; this.serial = 0; this.uid = 0;
    this.phase = 'mulligan'; this.actor = 0; this.winner = null; this.endReason = null;
    this.log = []; this.pending = null; this.resolving = false; this.deathDepth = 0;
    this.metrics = [0, 1].map(() => ({ attacks: 0, blocks: 0, work: 0, interrupted: 0, progress: 0, schemes: 0, responses: 0, deaths: 0, plays: 0, turns: 0, boardTotal: 0 }));
    this.players = this.decks.map(d => ({
      deck: this.shuffle(Object.entries(d.cards).flatMap(([id, n]) => Array(n).fill(id))),
      hand: [], discard: [], board: [], stash: [], hp: 25, turns: 0,
      progress: 0, completed: false, worker: null, workUsed: false, stashed: false,
      played: 0, itemsPlayed: 0, catsPlayed: 0, uses: {}, empty: false
    }));
    this.players.forEach((_, p) => this.draw(p, 7));
    this.log = [];
  }
  shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  name(p) { return this.decks[p].leader; }
  leader(p) { return this.leaders[this.name(p)]; }
  card(x) { return this.cards[typeof x === 'string' ? x : x.id]; }
  obj(uid) { return this.players.flatMap(s => s.board).find(x => x.uid === uid); }
  chars(p) { return this.players[p].board.filter(x => this.card(x).type === 'Character'); }
  items(p) { return this.players[p].board.filter(x => this.card(x).type === 'Item'); }
  has(x, k) { return this.card(x).keywords.includes(k); }
  trait(x, k) { return this.card(x).traits.includes(k); }
  fuel(p) { return this.players[p].stash.filter(x => x.ready).length; }
  power(x) { const c = this.card(x); return Math.max(0, (x.rolledPower ?? c.power ?? 0) + x.power + (x.damage > 0 ? c.damagedPower || 0 : 0) + (this.items(x.owner).length ? c.itemBoost || 0 : 0)); }
  guard(x) { const c = this.card(x); return (x.rolledGuard ?? c.guard ?? 0) + (this.items(x.owner).length ? c.itemBoost || 0 : 0); }
  remaining(x) { return this.guard(x) - x.damage; }
  say(s) { this.log.unshift(s); this.log.length = Math.min(80, this.log.length); }
  draw(p, n = 1) { const s = this.players[p]; for (let i = 0; i < n; i++) { if (!s.deck.length) { s.empty = true; break; } s.hand.push(s.deck.pop()); } }
  pay(p, n) {
    if (this.fuel(p) < n) throw Error('Not enough Ready Stash');
    const s = this.players[p];
    for (const x of [...s.stash].sort((a, b) => Number(b.temp) - Number(a.temp))) {
      if (!n) break; if (!x.ready) continue; n--; x.ready = false;
      if (x.temp) { s.stash.splice(s.stash.indexOf(x), 1); s.discard.push(x.id); }
    }
  }
  recharge(p, n) { for (const x of this.players[p].stash) if (!x.ready && n > 0) { x.ready = true; n--; } }
  cost(p, c) {
    const s = this.players[p]; let n = c.cost;
    if (this.name(p) === 'Trash Baron' && c.type === 'Item' && s.itemsPlayed === 0) n--;
    if (this.name(p) === 'Crazy Cat Lady' && c.traits.includes('Cat') && s.catsPlayed === 0 && this.chars(p).filter(x => this.trait(x, 'Cat')).length >= 3) n--;
    return Math.max(0, n);
  }
  enter(p, id, extra = {}) {
    const x = { uid: ++this.uid, id, owner: p, ready: true, born: this.players[p].turns, damage: 0, power: 0, shield: 0, frozen: false, hot: false, stubbornRound: 0, ...extra };
    this.players[p].board.push(x); return x;
  }
  canAttack(x) { return this.phase === 'main' && x.owner === this.turn && this.card(x).type === 'Character' && x.ready && this.players[x.owner].worker !== x.uid && (x.born < this.players[x.owner].turns || x.hot || this.has(x, 'Hothead')); }
  canWork(x) { const s = this.players[x.owner]; return this.rules.schemes && this.phase === 'main' && x.owner === this.turn && this.card(x).type === 'Character' && x.ready && x.born < s.turns && !s.completed && !s.workUsed && !s.worker && this.fuel(x.owner) >= 1; }
  targets(p, kind, source = null) {
    const own = this.chars(p), enemy = this.chars(1 - p);
    switch (kind) {
      case 'friendly': return own;
      case 'otherFriendly': return own.filter(x => x.uid !== source);
      case 'damagedFriendly': return own.filter(x => x.damage > 0);
      case 'enemy': return enemy;
      case 'smallEnemy': return enemy.filter(x => this.card(x).cost <= 2);
      case 'any': return [...own, ...enemy];
      case 'item': return this.players.flatMap(s => s.board).filter(x => this.card(x).type === 'Item');
      default: return [];
    }
  }
  attackTargets(a) { return [-1, ...this.chars(1 - a.owner).filter(x => !x.ready || this.has(a, 'Sucker Punch') || this.has(x, 'Bodyguard')).map(x => x.uid)]; }
  playMoves(p, response = false) {
    const s = this.players[p], moves = [];
    s.hand.forEach((id, index) => {
      const c = this.card(id); if (this.cost(p, c) > this.fuel(p) || response && !c.response) return;
      const base = { type: response ? 'respond' : 'play', index };
      if (c.target === 'ingredients') {
        for (const pair of combinations(s.hand.map((cid, i) => i !== index && this.card(cid).type === 'Character' ? i : null).filter(i => i !== null))) moves.push({ ...base, ingredients: pair });
      } else if (c.target === 'sacEnemy') {
        for (const x of this.chars(p)) for (const y of this.chars(1 - p)) moves.push({ ...base, target: x.uid, second: y.uid });
      } else if (c.target && c.type !== 'Item') {
        let targets = this.targets(p, c.target);
        if (response) targets = targets.filter(x => [this.pending.attacker, this.pending.defender].includes(x.uid));
        targets.forEach(x => moves.push({ ...base, target: x.uid }));
        // Character on-play targeting is optional: the body is always playable.
        if (c.type === 'Character') moves.push(base);
      } else if (!response) moves.push(base);
    }); return moves;
  }
  legalMoves() {
    if (this.winner !== null) return [];
    const p = this.actor, s = this.players[p];
    if (this.phase === 'mulligan') return [{ type: 'mulligan', indices: [] }];
    if (this.phase === 'discard') return s.hand.map((_, index) => ({ type: 'discard', index }));
    if (this.phase === 'choose') return this.choice.options.map(value => ({ type: 'choose', value }));
    if (this.phase === 'block') {
      const ready = this.chars(p).filter(x => x.ready && s.worker !== x.uid), guards = ready.filter(x => this.has(x, 'Bodyguard'));
      return [...(guards.length ? guards : ready).map(x => ({ type: 'block', target: x.uid })), ...(guards.length ? [] : [{ type: 'block', target: null }])];
    }
    if (this.phase === 'response') return [...this.playMoves(p, true), { type: 'passResponse' }];
    if (this.phase === 'scheme') {
      const effect = this.leader(p).schemeEffect;
      if (effect === 'vanish') { const ids = this.chars(1 - p).map(x => x.uid); return [[], ...ids.map(x => [x]), ...combinations(ids)].map(targets => ({ type: 'scheme', targets })); }
      if (effect === 'salvage' || effect === 'tag') {
        const options = [...new Set(s.discard.filter(id => effect === 'salvage' ? this.card(id).type === 'Item' : this.card(id).type === 'Character' && this.card(id).cost <= 4))];
        return [...options, null].map(id => ({ type: 'scheme', id }));
      }
      if (effect === 'breakthrough') return [{ type: 'scheme' }, ...this.chars(p).filter(x => this.trait(x, 'Abomination')).flatMap(x => ['Power', 'Guard'].map(stat => ({ type: 'scheme', target: x.uid, stat })))];
      return [{ type: 'scheme' }];
    }
    const moves = [{ type: 'end' }, ...this.playMoves(p)];
    if (!s.stashed && this.name(p) !== 'Mad Scientist') s.hand.forEach((_, index) => moves.push({ type: 'stash', index }));
    for (const x of this.chars(p)) {
      if (this.canAttack(x)) for (const target of this.attackTargets(x)) {
        moves.push({ type: 'attack', uid: x.uid, target, risk: false });
        if (this.card(x).onAttack === 'risk') moves.push({ type: 'attack', uid: x.uid, target, risk: true });
      }
      if (this.canWork(x)) moves.push({ type: 'work', uid: x.uid });
    }
    for (const x of this.items(p)) if (x.ready && this.card(x).activate) for (const y of this.targets(p, this.card(x).target)) moves.push({ type: 'activate', uid: x.uid, target: y.uid });
    return moves;
  }
  apply(move) {
    if (this.winner !== null) throw Error('Game is over');
    if (move.type === 'mulligan' && this.phase === 'mulligan') {
      const s = this.players[this.actor], indices = move.indices;
      if (!Array.isArray(indices) || new Set(indices).size !== indices.length || indices.some(i => !Number.isInteger(i) || i < 0 || i >= s.hand.length)) throw Error('Invalid mulligan');
    } else if (!this.legalMoves().some(m => JSON.stringify(m) === JSON.stringify(move))) throw Error('Illegal move: ' + JSON.stringify(move));
    const p = this.actor, s = this.players[p]; this.resolving = true;
    try {
      switch (move.type) {
        case 'mulligan': { const old = [...move.indices].sort((a, b) => b - a).map(i => s.hand.splice(i, 1)[0]); this.draw(p, old.length); s.deck.push(...old); this.shuffle(s.deck); if (p === 0) this.actor = 1; else this.begin(); break; }
        case 'stash': { const id = s.hand.splice(move.index, 1)[0]; s.stash.push({ id, ready: true, temp: false }); s.stashed = true; this.say(this.name(p) + ' Stashes a card'); break; }
        case 'play': this.play(p, move); break;
        case 'respond': this.metrics[p].responses++; this.play(p, move); this.resolveCombat(); break;
        case 'discard': { s.discard.push(s.hand.splice(move.index, 1)[0]); this.resume(); break; }
        case 'choose': this.resolveChoice(move.value); break;
        case 'work': { const x = this.obj(move.uid); this.pay(p, 1); x.ready = false; s.worker = x.uid; s.workUsed = true; this.metrics[p].work++; this.say(this.card(x).name + ' works on ' + this.leader(p).scheme + ' — must survive until next Turn'); break; }
        case 'activate': { const x = this.obj(move.uid), y = this.obj(move.target); x.ready = false; y.damage = Math.max(0, y.damage - this.card(x).amount); this.say(this.card(x).name + ' heals ' + this.card(y).name); break; }
        case 'attack': this.attack(p, move); break;
        case 'block': this.block(p, move.target); break;
        case 'passResponse': if (this.actor !== this.turn) this.actor = this.turn; else this.resolveCombat(); break;
        case 'scheme': this.resolveScheme(p, move); break;
        case 'end': this.endTurn(); break;
      }
    } finally { this.resolving = false; }
    this.checkEnd(); return this;
  }
  begin() {
    for (let p = 0; p < 2; p++) {
      const s = this.players[p];
      if (this.name(p) === 'Mad Scientist') for (let i = 0; i < 5; i++) s.stash.push({ id: s.deck.pop(), ready: true, temp: false });
      else if (p !== this.first) s.stash.push({ id: s.deck.pop(), ready: false, temp: true });
    }
    this.startTurn();
  }
  startTurn() {
    const p = this.turn, s = this.players[p]; this.serial++; s.turns++;
    this.actor = p; this.phase = 'main';
    for (const player of this.players) player.uses = {};
    Object.assign(s, { stashed: false, workUsed: false, played: 0, itemsPlayed: 0, catsPlayed: 0 });
    let complete = false;
    if (s.worker) {
      const x = this.obj(s.worker);
      if (x?.owner === p) { s.progress++; this.metrics[p].progress++; this.say(this.leader(p).scheme + ': ' + s.progress + '/3'); complete = s.progress === 3; }
      else this.metrics[p].interrupted++;
      s.worker = null;
    }
    for (const x of s.board) { x.ready = !x.frozen; x.frozen = false; }
    if (this.name(p) === 'Mad Scientist') this.recharge(p, 3); else this.recharge(p, Infinity);
    if (!(s.turns === 1 && p === this.first)) this.draw(p);
    this.metrics[p].turns++; this.metrics[p].boardTotal += this.chars(p).length;
    this.say('Round ' + this.round + ' · ' + this.name(p));
    if (complete) { s.completed = true; this.metrics[p].schemes++; this.phase = 'scheme'; this.say(this.leader(p).scheme + ' is complete'); }
  }
  endTurn() {
    for (const s of this.players) for (const x of s.board) { x.power = 0; x.shield = 0; x.hot = false; }
    this.cleanDeaths(); this.turn = 1 - this.turn; if (this.turn === this.first) this.round++; this.startTurn();
  }
  pause(phase, actor, extra = {}) { this.continuation = { phase: this.phase, actor: this.actor }; this.phase = phase; this.actor = actor; Object.assign(this, extra); }
  resume() { const next = this.continuation; this.continuation = null; if (next) { this.phase = next.phase; this.actor = next.actor; } }
  choose(p, kind, options) { if (options.length) this.pause('choose', p, { choice: { kind, options } }); }
  rummage(p) { this.draw(p); if (this.players[p].hand.length) this.pause('discard', p); }
  resolveChoice(value) {
    const p = this.actor, s = this.players[p], { kind } = this.choice; this.choice = null; this.resume();
    if (kind === 'rerollAbomination') { const x = this.obj(this.rerollTarget); if (value !== 'keep' && x) x['rolled' + value] = 1 + Math.floor(this.random() * 6); if (x) this.say('Final Abomination: ' + this.power(x) + '/' + this.guard(x)); this.rerollTarget = null; }
    if (kind === 'recoverItem') { s.discard.splice(s.discard.indexOf(value), 1); s.hand.push(value); }
    if (kind === 'findCard') { const top = this.searchTop; this.searchTop = null; if (value !== null) s.hand.push(top.splice(value, 1)[0]); s.deck.unshift(...top.reverse()); }
  }
  play(p, m) {
    const s = this.players[p], id = s.hand[m.index], c = this.card(id), cost = this.cost(p, c);
    this.pay(p, cost);
    if (m.ingredients) { const gone = new Set([m.index, ...m.ingredients]); const paid = s.hand.filter((_, i) => gone.has(i)); s.hand = s.hand.filter((_, i) => !gone.has(i)); s.discard.push(...paid.filter(x => x !== id)); }
    else s.hand.splice(m.index, 1);
    s.played++; if (c.type === 'Item') s.itemsPlayed++; if (c.traits.includes('Cat')) s.catsPlayed++; this.metrics[p].plays++;
    this.say(this.name(p) + ' plays ' + c.name);
    if (c.type === 'Character') { const x = this.enter(p, id); this.onPlay(x, m.target); }
    else if (c.type === 'Item') this.enter(p, id);
    else { s.discard.push(id); this.effect(p, c, m); }
    if (s.played === 2 && p === this.turn) {
      if (this.name(p) === 'Washed-Up Rock Star' && s.hand.length <= 2) this.draw(p);
      for (const x of this.chars(p)) x.power += this.card(x).secondPower || 0;
    }
    if (c.type === 'Item') for (const x of this.chars(p)) if (this.card(x).itemDraw && !s.uses['itemDraw' + x.uid]) { s.uses['itemDraw' + x.uid] = true; this.draw(p); }
  }
  onPlay(x, target) {
    const c = this.card(x), p = x.owner, y = this.obj(target);
    switch (c.onPlay) {
      case 'self_damage': if (y) this.damageMany([[y, 1]], p, true); break;
      case 'sweep_others': this.damageMany(this.players.flatMap(s => s.board).filter(y => this.card(y).type === 'Character' && y.uid !== x.uid).map(y => [y, c.amount]), p, true); break;
      case 'draw': this.draw(p, c.amount); break;
      case 'rummage': this.rummage(p); break;
      case 'friendly_bounce': case 'enemy_bounce': case 'small_bounce': if (y) this.returnCard(y); break;
      case 'heal': if (y) y.damage = Math.max(0, y.damage - c.amount); break;
      case 'enemy_damage': if (y) this.damageMany([[y, c.amount]], p, true); break;
      case 'recover_item': this.choose(p, 'recoverItem', [...new Set(this.players[p].discard.filter(id => this.card(id).type === 'Item'))]); break;
      case 'recover_strays': { const s = this.players[p]; for (let i = 0; i < 2; i++) { const at = s.discard.indexOf('LAB-SCH-C1'); if (at >= 0) this.enter(p, s.discard.splice(at, 1)[0]); } break; }
      case 'cat_draw': if (this.chars(p).filter(y => this.trait(y, 'Cat')).length >= 3) this.draw(p, 2); break;
      case 'recharge': this.recharge(p, 1); break;
      case 'find_experiment': this.findCard(p, id => this.card(id).effect === 'fuse'); break;
    }
  }
  effect(p, c, m) {
    const s = this.players[p], x = this.obj(m.target);
    switch (c.effect) {
      case 'sweep': this.damageMany(this.players.flatMap(s => s.board).filter(x => this.card(x).type === 'Character').map(x => [x, c.amount]), p, true); break;
      case 'bounce': this.returnCard(x); break;
      case 'shield': if (x) x.shield += c.amount; break;
      case 'damage': this.damageMany([[x, c.amount]], p, true); break;
      case 'itemkill': this.dismiss(x); this.draw(p); break;
      case 'risk_buff': this.damageMany([[x, 1]], p, true); if (this.obj(x.uid)) x.power += 2; break;
      case 'cycle_ready': this.recharge(p, 1); this.rummage(p); break;
      case 'friendly_bounce_draw': this.returnCard(x); this.draw(p); break;
      case 'freeze': x.ready = false; x.frozen = true; break;
      case 'sac_damage': { const power = this.power(x); this.defeatBatch([x]); this.damageMany([[this.obj(m.second), power]], p, true); break; }
      case 'fuse': { const power = 1 + Math.floor(this.random() * 6), guard = 1 + Math.floor(this.random() * 6); const x = this.enter(p, 'LAB-SCH-ST', { rolledPower: power, rolledGuard: guard }); this.say('It’s Alive! rolls ' + power + ' Power / ' + guard + ' Guard'); this.rerollTarget = x.uid; this.choose(p, 'rerollAbomination', ['keep', 'Power', 'Guard']); break; }
      case 'find_cat': this.findCard(p, id => this.card(id).traits.includes('Cat')); break;
    }
  }
  findCard(p, condition) { const s = this.players[p], top = s.deck.splice(Math.max(0, s.deck.length - 4)).reverse(); this.searchTop = top; const options = top.map((id, i) => condition(id) ? i : null).filter(i => i !== null); this.choose(p, 'findCard', [...options, null]); }
  detach(x) {
    const s = this.players[x.owner]; s.board = s.board.filter(y => y.uid !== x.uid);
    if (s.worker === x.uid) { s.worker = null; this.metrics[x.owner].interrupted++; this.say('Scheme work interrupted'); }
  }
  returnCard(x) {
    if (!x || !this.obj(x.uid)) return;
    if (this.has(x, 'Stubborn') && x.stubbornRound !== this.round) { x.stubbornRound = this.round; this.say(this.card(x).name + ' stays: Stubborn'); return; }
    const p = x.owner, s = this.players[p], c = this.card(x); this.detach(x); if (!c.token) s.hand.push(x.id);
    this.say(c.name + ' Returns to hand');
    if (c.onReturn === 'draw' && !s.uses.rabbit) { s.uses.rabbit = true; this.draw(p); }
    if (this.name(p) === 'Birthday Party Magician' && this.turn === p && !s.uses.return) { s.uses.return = true; this.recharge(p, 1); }
  }
  dismiss(x) { if (!x || !this.obj(x.uid)) return; this.detach(x); if (!this.card(x).token) this.players[x.owner].discard.push(x.id); this.cleanDeaths(); }
  damageMany(pairs, sourcePlayer = null, ownEffect = false) {
    const hurt = [];
    for (const [x, amount] of pairs) {
      if (!x || !this.obj(x.uid) || amount <= 0) continue;
      const prevented = Math.min(x.shield, amount); x.shield -= prevented; const n = amount - prevented;
      x.damage += n; if (n) hurt.push(x);
    }
    this.cleanDeaths();
    if (ownEffect && sourcePlayer === this.turn && this.name(sourcePlayer) === 'Florida Man' && !this.players[sourcePlayer].uses.adrenaline) {
      const x = hurt.find(x => x.owner === sourcePlayer && this.obj(x.uid));
      if (x) { this.players[sourcePlayer].uses.adrenaline = true; x.power++; }
    }
  }
  cleanDeaths() { const dead = this.players.flatMap(s => s.board).filter(x => this.card(x).type === 'Character' && x.damage >= this.guard(x)); if (dead.length) this.defeatBatch(dead); }
  defeatBatch(dead) {
    dead = dead.filter(x => this.obj(x.uid)); if (!dead.length) return;
    // Remove all simultaneous casualties before any death trigger or replacement enters.
    for (const x of dead) { this.detach(x); if (!this.card(x).token) this.players[x.owner].discard.push(x.id); this.metrics[x.owner].deaths++; this.say(this.card(x).name + ' is Defeated'); }
    for (const x of [...dead].sort((a, b) => Number(a.owner !== this.turn) - Number(b.owner !== this.turn))) {
      const p = x.owner, s = this.players[p], c = this.card(x);
      if (this.name(p) === 'Backyard Wrestler' && p === this.turn && !s.uses.tag && s.deck.length) {
        s.uses.tag = true; const id = s.deck.pop(), card = this.card(id); this.say('Tag Out reveals ' + card.name);
        if (card.type === 'Character' && card.style === 'Expendable' && card.cost <= s.stash.length) this.enter(p, id, { hot: true }); else s.hand.push(id);
      }
      if (c.onDefeat === 'ping') this.players[1 - p].hp--;
      if (c.onDefeat === 'draw') this.draw(p);
      if (this.has(x, 'Explosive')) this.damageMany(this.chars(1 - p).map(y => [y, 1]), p, true);
    }
  }
  attack(p, m) {
    const a = this.obj(m.uid), c = this.card(a); a.ready = false; this.metrics[p].attacks++;
    this.pending = { attacker: a.uid, target: m.target, defender: m.target === -1 ? null : m.target, blocked: false, blockPrevent: 0 };
    this.say(c.name + ' attacks ' + (m.target === -1 ? this.name(1 - p) : this.card(this.obj(m.target)).name));
    if (c.onAttack === 'risk' && m.risk) { this.damageMany([[a, 1]], p, true); if (this.obj(a.uid)) a.power += 2; }
    if (c.onAttack === 'lowhand' && this.players[p].hand.length <= 2) a.power += 2;
    if (c.onAttack === 'alligator') { const die = 1 + Math.floor(this.random() * 6); this.say('Alligator rolls ' + die); if (die === 1) { this.players[p].hp -= 2; this.pending = null; return; } }
    if (!this.obj(a.uid)) { this.pending = null; return; }
    this.actor = 1 - p; this.phase = m.target === -1 ? 'block' : 'response';
    if (this.phase === 'block' && this.chars(1 - p).every(x => !x.ready || this.players[1 - p].worker === x.uid)) this.block(1 - p, null);
  }
  block(p, uid) {
    if (uid !== null) {
      const x = this.obj(uid); x.ready = false; this.pending.defender = uid; this.pending.blocked = true; this.metrics[p].blocks++;
      if (this.name(p) === 'HOA President' && !this.players[p].uses.block) { this.players[p].uses.block = true; this.pending.blockPrevent = 1; }
      this.say(this.card(x).name + ' Blocks');
    }
    this.phase = 'response'; this.actor = 1 - this.turn;
  }
  resolveCombat() {
    const battle = this.pending, a = this.obj(battle?.attacker), d = this.obj(battle?.defender), p = this.turn;
    this.pending = null; this.phase = 'main'; this.actor = p;
    if (!a) return;
    if (!d) {
      // Once blocked, removing the blocker does not turn this into a free Leader hit.
      if (battle.target === -1 && !battle.blocked) this.players[1 - p].hp -= this.power(a);
      return;
    }
    const attack = this.power(a), retaliation = this.power(d), slow = battle.blocked && this.has(d, 'Slowpoke');
    let damage = attack;
    if (battle.blocked) { const absorbed = Math.min(attack, Math.max(0, this.remaining(d))); this.players[1 - p].hp -= attack - absorbed; damage = absorbed; }
    damage = Math.max(0, damage - battle.blockPrevent);
    if (this.rules.combat === 'simultaneous') this.damageMany([[d, damage], ...(!slow ? [[a, retaliation]] : [])]);
    else {
      this.damageMany([[d, damage]]);
      if (this.rules.combat === 'survivor' && this.obj(d.uid) && this.obj(a.uid) && !slow) this.damageMany([[a, retaliation]]);
    }
  }
  resolveScheme(p, m) {
    const s = this.players[p]; this.phase = 'main'; this.actor = p;
    switch (this.leader(p).schemeEffect) {
      case 'fireworks': this.players[1 - p].hp -= 4; this.damageMany(this.chars(1 - p).map(x => [x, 2]), p, true); break;
      case 'encore': this.draw(p, 3); this.recharge(p, 2); break;
      case 'vanish': for (const uid of m.targets) this.returnCard(this.obj(uid)); this.draw(p, 2); break;
      case 'salvage': if (m.id) { s.discard.splice(s.discard.indexOf(m.id), 1); this.enter(p, m.id); } this.draw(p, 2); break;
      case 'notice': this.players[1 - p].hp -= 8; break;
      case 'tag': if (m.id) { s.discard.splice(s.discard.indexOf(m.id), 1); this.enter(p, m.id, { hot: true }); } break;
      case 'colony': for (let i = 0; i < 3; i++) this.enter(p, 'LAB-SCH-CT'); this.draw(p, 2); break;
      case 'breakthrough': this.recharge(p, Infinity); if (m.target) this.obj(m.target)['rolled' + m.stat] = 6; break;
    }
    this.say(this.leader(p).scheme + ' resolves');
  }
  checkEnd() {
    if (this.resolving || this.winner !== null || ['choose', 'discard'].includes(this.phase)) return;
    const lost = this.players.map(s => s.hp <= 0 || s.empty);
    if (!lost.some(Boolean)) return;
    if (lost.every(Boolean)) {
      // War uses available deck/discard cards; an otherwise unbreakable tie is random.
      const piles = this.players.map(s => this.shuffle([...s.deck, ...s.discard])); let result = 0;
      for (let i = 0; i < Math.min(...piles.map(x => x.length)); i++) { result = this.card(piles[0][i]).cost - this.card(piles[1][i]).cost; if (result) break; }
      this.winner = result ? (result > 0 ? 0 : 1) : Math.floor(this.random() * 2); this.endReason = 'War';
    } else { this.winner = lost[0] ? 1 : 0; this.endReason = this.players[1 - this.winner].empty ? 'deck-out' : 'Leader defeated'; }
    this.say(this.name(this.winner) + ' wins · ' + this.endReason);
  }
}
