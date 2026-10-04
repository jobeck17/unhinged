// Board Width LAB only. Forked from Scheme Lab; no shared runtime imports. One deterministic rules engine for humans, bots, and tests.
export function rng32(seed) {
  let a = seed >>> 0;
  return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export class Game {
  constructor(pool, doc, deckIndices = [0, 1], options = {}) {
    this.cards = Object.fromEntries(pool.cards.map(c => [c.id, c]));
    this.leaders = Object.fromEntries(doc.leaders.map(l => [l.name, l]));
    this.decks = deckIndices.map(i => doc.decks[i]);
    this.random = rng32(options.seed ?? Date.now());
    this.rules = { ...options, combat: 'simultaneous', schemes: false, maxCharacters: options.maxCharacters ?? 5 };
    if (!Number.isInteger(this.rules.maxCharacters) || this.rules.maxCharacters < 1) throw Error('Invalid Character width');
    this.first = options.firstPlayer ?? Math.floor(this.random() * 2);
    this.turn = this.first; this.round = 1; this.serial = 0; this.uid = 0;
    this.phase = 'mulligan'; this.actor = 0; this.winner = null; this.endReason = null;
    this.log = []; this.pending = null; this.resolving = false;
    this.metrics = [0, 1].map(() => ({ attacks: 0, responses: 0, deaths: 0, plays: 0, turns: 0, boardTotal: 0 }));
    this.players = this.decks.map(d => ({
      deck: this.shuffle(Object.entries(d.cards).flatMap(([id, n]) => Array(n).fill(id))),
      hand: [], discard: [], board: [], stash: [], hp: 25, turns: 0,
      stashed: false,
      empty: false
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
  power(x) { const c = this.card(x); return Math.max(0, (x.rolledPower ?? c.power ?? 0) + x.power + (x.stored?.length || 0) + this.chars(x.owner).filter(y => y.uid !== x.uid && y.ready && this.card(y).readyAura).length + (x.damage > 0 ? c.damagedPower || 0 : 0) + (this.items(x.owner).length ? c.itemBoost || 0 : 0)); }
  guard(x) { const c = this.card(x); return (x.rolledGuard ?? c.guard ?? 0) + (x.stored?.length || 0) + (this.items(x.owner).length ? c.itemBoost || 0 : 0); }
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
  cost(p, c) { return c.cost; }
  hasSpace(p) { return this.chars(p).length < this.rules.maxCharacters; }
  boardCount(p, count) { return this.chars(p).length === count; }
  enter(p, id, extra = {}) {
    if (this.card(id).type === 'Character' && !this.hasSpace(p)) return null;
    const x = { uid: ++this.uid, id, owner: p, ready: true, born: this.players[p].turns, damage: 0, power: 0, shield: 0, frozen: false, hot: false, stubbornRound: 0, ...extra };
    this.players[p].board.push(x);
    if (this.card(id).type === 'Character') for (const y of this.chars(p)) if (y.uid !== x.uid && this.card(y).entryDraw) { this.draw(p); this.say(this.card(y).name + ' triggers a free Draw'); }
    return x;
  }
  canAttack(x) { return this.phase === 'main' && x.owner === this.turn && this.card(x).type === 'Character' && x.ready && (x.born < this.players[x.owner].turns || x.hot || this.has(x, 'Hothead')); }
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
  attackTargets(a) { return [-1, ...this.chars(1 - a.owner).filter(x => !x.ready).map(x => x.uid)]; }
  playMoves(p, response = false) {
    const s = this.players[p], moves = [];
    s.hand.forEach((id, index) => {
      const c = this.card(id); if ((c.type === 'Character') && !this.hasSpace(p)) return; if (this.cost(p, c) > this.fuel(p) || response && !c.response) return;
      const base = { type: response ? 'respond' : 'play', index };
      if (c.effect === 'stack') {
        for (const x of this.chars(p).filter(x => !x.stored?.length)) for (const y of this.chars(p).filter(y => y.uid !== x.uid)) moves.push({ ...base, target: x.uid, second: y.uid });
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
    if (this.phase === 'response') return [...this.playMoves(p, true), { type: 'passResponse' }];
    const moves = [{ type: 'end' }, ...this.playMoves(p)];
    if (!s.stashed) s.hand.forEach((_, index) => moves.push({ type: 'stash', index }));
    for (const x of this.chars(p)) {
      if (this.canAttack(x)) for (const target of this.attackTargets(x)) {
        moves.push({ type: 'attack', uid: x.uid, target, risk: false });
      }
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
        case 'activate': { const x = this.obj(move.uid), y = this.obj(move.target); x.ready = false; y.damage = Math.max(0, y.damage - this.card(x).amount); this.say(this.card(x).name + ' heals ' + this.card(y).name); break; }
        case 'attack': this.attack(p, move); break;
        case 'passResponse': if (this.actor !== this.turn) this.actor = this.turn; else this.resolveCombat(); break;
        case 'end': this.endTurn(); break;
      }
    } finally { this.resolving = false; }
    this.checkEnd(); return this;
  }
  begin() {
    for (let p = 0; p < 2; p++) {
      const s = this.players[p];
      if (p !== this.first) s.stash.push({ id: s.deck.pop(), ready: false, temp: true });
    }
    this.startTurn();
  }
  startTurn() {
    const p = this.turn, s = this.players[p]; this.serial++; s.turns++;
    this.actor = p; this.phase = 'main';
    s.stashed = false;
    for (const x of s.board) { x.ready = !x.frozen; x.frozen = false; }
    this.recharge(p, Infinity);
    if (!(s.turns === 1 && p === this.first)) this.draw(p);
    this.metrics[p].turns++; this.metrics[p].boardTotal += this.chars(p).length;
    this.say('Round ' + this.round + ' · ' + this.name(p));
  }
  endTurn() {
    for (const s of this.players) for (const x of s.board) { x.power = 0; x.shield = 0; x.hot = false; }
    this.cleanDeaths(); this.turn = 1 - this.turn; if (this.turn === this.first) this.round++; this.startTurn();
  }
  play(p, m) {
    const s = this.players[p], id = s.hand[m.index], c = this.card(id), cost = this.cost(p, c);
    this.pay(p, cost);
    s.hand.splice(m.index, 1); this.metrics[p].plays++;
    this.say(this.name(p) + ' plays ' + c.name);
    if (c.type === 'Character') this.enter(p, id);
    else if (c.type === 'Item') this.enter(p, id);
    else { s.discard.push(id); this.effect(p, c, m); }
    if (c.type === 'Character' && c.fullDraw && this.boardCount(p, this.rules.maxCharacters)) { this.draw(p, c.fullDraw); this.say(c.name + ' triggers at full board'); }
    if (c.type === 'Character' && c.exactRecharge && this.boardCount(p, c.exactRecharge)) this.recharge(p, 1);
  }
  effect(p, c, m) {
    const s = this.players[p], x = this.obj(m.target);
    switch (c.effect) {
      case 'stack': { const host = this.obj(m.second); this.detach(x); host.stored = [...(host.stored || []), x.id]; this.say(this.card(x).name + ' stacks under ' + this.card(host).name); break; }
      case 'sweep': this.damageMany(this.players.flatMap(s => s.board).filter(x => this.card(x).type === 'Character').map(x => [x, c.amount]), p, true); break;
      case 'bounce': this.returnCard(x); break;
      case 'shield': if (x) x.shield += c.amount; break;
      case 'damage': this.damageMany([[x, c.amount]], p, true); break;
    }
  }
  detach(x) {
    const s = this.players[x.owner]; if (x.stored?.length) { s.discard.push(...x.stored); x.stored = []; } s.board = s.board.filter(y => y.uid !== x.uid);
  }
  returnCard(x) {
    if (!x || !this.obj(x.uid)) return;
    if (this.has(x, 'Stubborn') && x.stubbornRound !== this.round) { x.stubbornRound = this.round; this.say(this.card(x).name + ' stays: Stubborn'); return; }
    const p = x.owner, s = this.players[p], c = this.card(x); this.detach(x); if (!c.token) s.hand.push(x.id);
    this.say(c.name + ' Returns to hand');
  }
  dismiss(x) { if (!x || !this.obj(x.uid)) return; this.detach(x); if (!this.card(x).token) this.players[x.owner].discard.push(x.id); this.cleanDeaths(); }
  damageMany(pairs, sourcePlayer = null, ownEffect = false) {
        for (const [x, amount] of pairs) {
      if (!x || !this.obj(x.uid) || amount <= 0) continue;
      const prevented = Math.min(x.shield, amount); x.shield -= prevented; const n = amount - prevented;
      x.damage += n;
    }
    this.cleanDeaths();
  }
  cleanDeaths() { const dead = this.players.flatMap(s => s.board).filter(x => this.card(x).type === 'Character' && x.damage >= this.guard(x)); if (dead.length) this.defeatBatch(dead); }
  defeatBatch(dead) {
    dead = dead.filter(x => this.obj(x.uid)); if (!dead.length) return;
    // Remove all simultaneous casualties before any death trigger or replacement enters.
    for (const x of dead) { this.detach(x); if (!this.card(x).token) this.players[x.owner].discard.push(x.id); this.metrics[x.owner].deaths++; this.say(this.card(x).name + ' is Defeated'); }
    for (const x of [...dead].sort((a, b) => Number(a.owner !== this.turn) - Number(b.owner !== this.turn))) {
      const p = x.owner, s = this.players[p], c = this.card(x);
      if (c.onDefeat === 'ping') this.players[1 - p].hp--;
      if (c.onDefeat === 'draw') this.draw(p);
      if (this.has(x, 'Explosive')) this.damageMany(this.chars(1 - p).map(y => [y, 1]), p, true);
    }
  }
  attack(p, m) {
    const a = this.obj(m.uid); a.ready = false; this.metrics[p].attacks++;
    this.pending = { attacker: a.uid, target: m.target, defender: m.target === -1 ? null : m.target };
    this.say(this.card(a).name + ' attacks ' + (m.target === -1 ? this.name(1 - p) : this.card(this.obj(m.target)).name));
    this.actor = 1 - p; this.phase = 'response';
  }
  resolveCombat() {
    const battle = this.pending, a = this.obj(battle?.attacker), d = this.obj(battle?.defender), p = this.turn;
    this.pending = null; this.phase = 'main'; this.actor = p;
    if (!a) return;
    if (battle.target === -1) { this.players[1 - p].hp -= this.power(a); return; }
    if (!d) return; // A removed direct target never redirects damage to the Leader.
    const attack = this.power(a), retaliation = this.power(d);
    this.damageMany([[d, attack], [a, retaliation]]);
  }
  checkEnd() {
    if (this.resolving || this.winner !== null) return;
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
