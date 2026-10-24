// Accusations Lab rules engine. Pure state machine shared by the browser table, the bot, and node tests.
// Every number and timing rule here comes from lab/accusations/RULES.md; section numbers are cited inline.

export const RULES = Object.freeze({win: 5, slots: 3, ownScenarios: 2, capacity: 3, openMain: 5, openScenarios: 2, stallRounds: 3});

const HOME = 'home';

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const expand = list => Object.entries(list).flatMap(([id, n]) => Array(n).fill(id));
const moveKey = m => JSON.stringify(m, Object.keys(m).sort());

export class Game {
  constructor(cardDoc, deckDoc, {decks = [0, 1], seed = Date.now(), first} = {}) {
    this.defs = new Map(cardDoc.cards.map(c => [c.id, c]));
    this.seed = seed >>> 0;
    this.rand = seeded(this.seed);
    this.objs = new Map();
    this.nextUid = 1;
    this.slots = Array(RULES.slots).fill(null);
    this.queue = [];
    this.batch = [];
    this.trigs = [];
    this.pending = null;
    this.log = [];
    this.winner = null;
    this.endReason = '';
    this.turnNo = 0;
    this.scOrder = 0;
    this.stall = 0;
    this.changedRound = false;
    this.players = decks.map((d, i) => {
      const deck = deckDoc.decks[d];
      return {
        index: i, deckName: deck.name, style: deck.style, leader: this.defs.get(deck.leader),
        deck: this.shuffle(expand(deck.main)), scDeck: this.shuffle(expand(deck.scenarios)),
        hand: [], discard: [], scDiscard: [], stash: [], verdict: 0, t: {},
        stats: {played: 0, succeeded: 0, failed: 0, abandoned: 0, forced: 0, defenseDraws: 0, maxStash: 0, uncontested: 0, defeats: 0},
      };
    });
    this.first = first ?? (this.rand() < 0.5 ? 0 : 1);
    this.active = this.first;
    // §4 setup: 5 Main + 2 Scenario, then one optional bottom-and-redraw each.
    for (const p of this.players) {
      for (let i = 0; i < RULES.openMain; i++) this.drawMain(p.index, true);
      for (let i = 0; i < RULES.openScenarios; i++) this.drawScenario(p.index, true);
    }
    this.phase = 'mulligan';
    this.mulligans = [this.first, 1 - this.first];
    this.note(`${this.name(this.first)} goes first (seed ${this.seed}).`);
  }

  // ---------- lookups ----------
  def(x) { return this.defs.get(typeof x === 'string' ? x : x.id); }
  key(x) { return this.def(x).key; }
  name(p) { return this.players[p].leader.name; }
  obj(uid) { return this.objs.get(uid); }
  chars(p) { return [...this.objs.values()].filter(o => o.kind === 'char' && (p === undefined || o.owner === p)); }
  at(slot, p) { return this.chars(p).filter(x => x.loc === slot); }
  home(p) { return this.at(HOME, p); }
  scenario(slot) { return this.slots[slot]; }
  scKey(slot) { return this.slots[slot] ? this.key(this.slots[slot]) : null; }
  ownSlots(p) { return this.slots.map((s, i) => s && s.owner === p ? i : -1).filter(i => i >= 0); }
  liveSlots() { return this.slots.map((s, i) => s ? i : -1).filter(i => i >= 0); }
  supporting(x) { return x.loc !== HOME && this.slots[x.loc]?.owner === x.owner; }
  defending(x) { return x.loc !== HOME && this.slots[x.loc] && this.slots[x.loc].owner !== x.owner; }
  items(x) { return x.items.map(u => this.objs.get(u)); }
  hasItem(x, key) { return this.items(x).some(i => this.key(i) === key); }
  fuel(p) { return this.players[p].stash.filter(s => s.ready).length; }
  actorName() { return this.name(this.actor); }

  get actor() {
    if (this.pending) return this.pending.player;
    if (this.phase === 'mulligan') return this.mulligans[0];
    return this.active;
  }

  power(x) {
    const c = this.def(x);
    let v = c.power + x.mods.reduce((n, m) => n + (m.power || 0), 0);
    if (c.key === 'hurricane-holdout') v += x.damage;
    if (this.hasItem(x, 'truck-nuts')) v += 1;
    if (this.supporting(x)) {
      if (this.hasItem(x, 'photographic-evidence')) v += 1;
      const k = this.scKey(x.loc);
      if (k === 'grass') v -= 1;
      if (k === 'shortcut') v += 1;
    }
    return Math.max(0, v);
  }

  health(x) {
    let v = this.def(x).health + x.mods.reduce((n, m) => n + (m.health || 0), 0);
    if (this.hasItem(x, 'clipboard')) v += 1;
    if (x.loc !== HOME) {
      const k = this.scKey(x.loc);
      if (this.supporting(x) && k === 'flamingo') v += 1;
      if (this.supporting(x) && k === 'shortcut') v -= 1;
      if (k === 'street-legal' && this.power(x) >= 4) v -= 1;
    }
    return v;
  }

  remaining(x) { return this.health(x) - x.damage; }
  absorbs(x) { const k = this.key(x); return k === 'lifeguard' || (k === 'old-guy' && this.defending(x)); }
  hothead(x) { return this.def(x).keywords?.includes('Hothead') || x.hothead === this.turnNo; }

  // §8 default checks, with the printed "instead" replacements.
  forecast(slot) {
    const sc = this.slots[slot];
    if (!sc) return null;
    const sup = this.at(slot, sc.owner), con = this.at(slot, 1 - sc.owner), k = this.key(sc);
    const out = (result, why) => ({result, why, sup: sup.length, con: con.length});
    if (!sup.length) return out('fail', con.length ? 'No supporters — defender would draw 1' : 'No supporters');
    if (k === 'christmas-lights') return con.length < 2 ? out('success', con.length ? 'Only 1 contester; needs 2' : 'Uncontested') : out('hold', 'Two contesters block it');
    if (k === 'code') {
      if (con.length) return out('hold', 'Contested');
      return sup.some(x => x.items.length) ? out('success', 'Supporter has an Item') : out('hold', 'Needs a supporter with an Item');
    }
    if (k === 'fireworks') {
      if (con.length) return out('hold', 'Contested');
      return sup.length >= 2 ? out('success', 'Two supporters') : out('hold', 'Needs two supporters');
    }
    return con.length ? out('hold', 'Contested') : out('success', 'Uncontested');
  }

  // ---------- plumbing ----------
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  note(text, tone = '') { this.log.unshift({turn: this.turnNo, text: text.replace(/([!?.])([.!])/g, '$1'), tone, n: this.log.length}); }
  soon(fn) { this.batch.push(fn); }
  trig(player, fn) { this.trigs.push({player, fn}); }
  flush() {
    this.checkHealth();
    // §14: when both players have simultaneous triggers, the active player resolves theirs first.
    const t = [...this.trigs.filter(x => x.player === this.active), ...this.trigs.filter(x => x.player !== this.active)].map(x => x.fn);
    this.queue.unshift(...this.batch, ...t);
    this.batch = [];
    this.trigs = [];
  }
  run() {
    this.flush();
    while (this.winner === null && !this.pending && this.queue.length) {
      this.queue.shift()();
      this.flush();
    }
  }
  // Ask a player to choose. Forced single choices resolve automatically.
  ask(player, prompt, options, onPick, {optional = false, kind = 'choice'} = {}) {
    this.soon(() => {
      const opts = options();
      if (!opts.length) return;
      if (!optional && opts.length === 1) return onPick(opts[0]);
      if (optional) opts.push({label: 'Decline', decline: true});
      this.pending = {player, prompt, options: opts, onPick, kind};
    });
  }

  drawMain(p, quiet) {
    const P = this.players[p];
    if (!P.deck.length) { if (!quiet) this.note(`${this.name(p)} cannot draw: Main Deck is empty.`); return false; }
    P.hand.push(P.deck.shift());
    return true;
  }
  drawScenario(p, quiet) {
    const P = this.players[p];
    if (!P.scDeck.length && P.scDiscard.length) {
      // §9 recycling: shuffle the Scenario discard (never active Scenarios) into a new deck.
      P.scDeck = this.shuffle(P.scDiscard.splice(0));
      if (!quiet) this.note(`${this.name(p)} reshuffles the Scenario discard into a new Scenario Deck.`);
    }
    if (!P.scDeck.length) { if (!quiet) this.note(`${this.name(p)} has no Scenario to draw.`); return false; }
    P.hand.push(P.scDeck.shift());
    return true;
  }
  pay(p, n) {
    for (const s of this.players[p].stash) if (n > 0 && s.ready) { s.ready = false; n--; }
  }
  markChange() { this.stall = 0; this.changedRound = true; }

  // ---------- characters ----------
  enter(p, id) {
    const x = {uid: this.nextUid++, id, kind: 'char', owner: p, ready: true, damage: 0, loc: HOME, born: this.turnNo, moved: -1, mods: [], items: []};
    this.objs.set(x.uid, x);
    return x;
  }

  leave(x) {
    for (const i of this.items(x)) { this.objs.delete(i.uid); this.players[i.owner].discard.push(i.id); }
    this.objs.delete(x.uid);
  }

  damage(x, n, src = {}) {
    if (!this.objs.has(x.uid) || n <= 0) return 0;
    if (this.absorbs(x)) n = Math.max(0, n - 1);
    if (!n) { this.note(`${this.def(x).name} absorbs the hit.`); return 0; }
    x.damage += n;
    if (x.damage >= this.health(x)) this.defeat(x, src);
    return n;
  }

  defeat(x, src = {}) {
    const slot = x.loc, owner = x.owner, c = this.def(x), sc = slot === HOME ? null : this.slots[slot];
    this.leave(x);
    this.players[owner].discard.push(x.id);
    this.note(`${c.name} (${this.name(owner)}) is defeated${sc ? ' at ' + this.def(sc).name : ''}.`, 'defeat');
    if (!sc) return;
    const killer = src.player;
    if (killer !== undefined && killer !== owner) { this.players[killer].t.defeated = true; this.players[killer].stats.defeats++; }
    const still = () => this.slots[slot] === sc;
    if (c.key === 'boogie-boarder') this.trig(owner, () => { if (this.drawMain(owner)) this.note('Boogie Boarder: draw 1 Main card.'); });
    if (c.key === 'loudmouth') this.trig(owner, () => this.ask(owner, 'Beach Bar Loudmouth: deal 2 damage to an opposing Character there.',
      () => still() ? this.at(slot, 1 - owner).map(t => ({label: this.def(t).name, uid: t.uid, ai: 'damage'})) : [],
      o => this.damage(this.obj(o.uid), 2, {player: owner, kind: 'ability'}), {kind: 'damage'}));
    if (this.key(sc) === 'gator-pool') this.trig(owner, () => this.ask(owner, "There's a Gator in My Pool!: commit a Home Character here?",
      () => still() && this.at(slot, owner).length < RULES.capacity ? this.home(owner).map(t => ({label: this.def(t).name, uid: t.uid, ai: 'commit'})) : [],
      o => !o.decline && this.commit(this.obj(o.uid), slot, false), {optional: true, kind: 'commit'}));
    const P = killer === undefined ? null : this.players[killer];
    if (src.kind === 'attack' && killer === this.active && P.leader.key === 'florida-man' && !P.t.passive) {
      this.trig(killer, () => this.ask(killer, 'Florida Man: move another Home Character to that Scenario?',
        () => still() && !P.t.passive && this.at(slot, killer).length < RULES.capacity ? this.home(killer).map(t => ({label: this.def(t).name, uid: t.uid, ai: 'commit'})) : [],
        o => { if (o.decline) return; P.t.passive = true; this.note(`Florida Man rushes ${this.def(this.obj(o.uid)).name} in.`); this.commit(this.obj(o.uid), slot, false); },
        {optional: true, kind: 'commit'}));
    }
  }

  checkHealth() {
    for (let dead = this.chars().filter(x => x.damage >= this.health(x)); dead.length; dead = this.chars().filter(x => x.damage >= this.health(x)))
      for (const x of dead) if (this.objs.has(x.uid)) this.defeat(x, {kind: 'health'});
  }

  // Commit a Character to a Scenario. voluntary=true uses the once-per-turn allowance (§5); effects do not.
  commit(x, slot, voluntary) {
    if (!x || !this.slots[slot] || this.at(slot, x.owner).length >= RULES.capacity) return false;
    const sc = this.slots[slot], p = x.owner, P = this.players[p], k = this.key(sc);
    x.loc = slot;
    if (voluntary) x.moved = this.turnNo;
    this.note(`${this.def(x).name} ${sc.owner === p ? 'supports' : 'contests'} ${this.def(sc).name}.`);
    if (sc.owner !== p) {
      if (k === 'parked' || k === 'cops') { x.ready = false; this.note(`${this.def(sc).name}: ${this.def(x).name} rotates.`); }
      if (P.leader.key === 'hoa-president' && p === this.active && !P.t.passive) {
        P.t.passive = true;
        x.mods.push({health: 1, until: this.turnNo + 2, label: 'Stonewall +1 Health'});
        this.note(`Stonewall: ${this.def(x).name} gets +1 Health until the end of HOA's next turn.`);
      }
      if (this.key(x) === 'helicopter-parent') this.ask(p, 'Helicopter Parent: give another friendly Character here +1 Health this turn.',
        () => this.at(slot, p).filter(t => t !== x).map(t => ({label: this.def(t).name, uid: t.uid, ai: 'buff'})),
        o => this.obj(o.uid)?.mods.push({health: 1, until: this.turnNo, label: 'Helicopter Parent +1 Health'}), {kind: 'buff'});
    } else if (this.key(x) === 'storm-chaser') {
      x.mods.push({power: 1, until: this.turnNo, label: 'Storm Chaser +1 Power'});
    }
    return true;
  }

  // ---------- scenarios ----------
  dismissScenario(slot) {
    const sc = this.slots[slot];
    // §13 cleanup: Characters there go Home without readying or healing; attachments stay.
    for (const x of this.at(slot)) x.loc = HOME;
    this.slots[slot] = null;
    this.players[sc.owner].scDiscard.push(sc.id);
    this.markChange();
  }

  replace(p) { if (this.drawScenario(p)) this.note(`${this.name(p)} draws a replacement Scenario.`); }

  score(p) {
    const P = this.players[p];
    P.verdict++;
    if (P.verdict >= RULES.win) {
      this.winner = p;
      this.endReason = `${this.name(p)} reaches ${RULES.win} Verdict`;
      this.phase = 'over';
      this.queue = [];
      this.batch = [];
      this.trigs = [];
      this.pending = null;
      this.note(`${this.name(p)} wins with ${RULES.win} Verdict!`, 'win');
    }
  }

  check(slot) {
    const sc = this.slots[slot];
    if (!sc) return;
    const f = this.forecast(slot), p = sc.owner, c = this.def(sc), opp = 1 - p;
    if (f.result === 'hold') { this.note(`${c.name} remains active (${f.why.toLowerCase()}).`); return; }
    if (f.result === 'fail') {
      this.dismissScenario(slot);
      this.players[p].stats.failed++;
      this.note(`${c.name} FAILS — no supporters.`, 'fail');
      if (f.con) {
        this.players[opp].stats.defenseDraws++;
        if (this.drawMain(opp)) this.note(`Successful defense: ${this.name(opp)} draws 1 Main card.`, 'defense');
      }
      this.replace(p);
      return;
    }
    this.players[p].stats.succeeded++;
    this.note(`${c.name} SUCCEEDS — ${this.name(p)} scores 1 Verdict.`, 'verdict');
    this.score(p);
    if (this.winner !== null) return;
    // "When this succeeds" resolves after scoring and before dismissal (§11 notes).
    this.successEffect(slot, sc);
    this.soon(() => { if (this.slots[slot] === sc) this.dismissScenario(slot); this.replace(p); });
  }

  successEffect(slot, sc) {
    const p = sc.owner, opp = 1 - p, k = this.key(sc);
    if (k === 'grass' || k === 'gator-pool') { if (this.drawMain(p)) this.note(`${this.def(sc).name}: draw 1 Main card.`); }
    if (k === 'street-legal') {
      const s = this.players[p].stash.find(s => !s.ready);
      if (s) { s.ready = true; this.note('Street Legal: ready a Stash card.'); }
    }
    if (k === 'flamingo') this.ask(opp, 'Unauthorized Lawn Flamingo!: dismiss one of your Items.',
      () => [...this.objs.values()].filter(o => o.kind === 'item' && o.owner === opp).map(i => ({label: `${this.def(i).name} on ${this.def(this.obj(i.host)).name}`, uid: i.uid, ai: 'lose-item'})),
      o => this.dismissItem(this.obj(o.uid)), {kind: 'lose-item'});
    const elsewhere = () => this.chars(opp).filter(x => x.loc !== HOME && x.loc !== slot);
    if (k === 'cops') this.ask(p, 'The Neighbors Called the Cops Again!: send an opposing Character at another Scenario Home.',
      () => elsewhere().map(x => ({label: `${this.def(x).name} at ${this.def(this.slots[x.loc]).name}`, uid: x.uid, ai: 'remove'})),
      o => { const x = this.obj(o.uid); x.loc = HOME; this.note(`Cops: ${this.def(x).name} is sent Home.`); }, {kind: 'remove'});
    if (k === 'fireworks') this.ask(p, 'I Can Explain the Fireworks!: deal 2 damage to an opposing Character at another Scenario.',
      () => elsewhere().map(x => ({label: `${this.def(x).name} at ${this.def(this.slots[x.loc]).name}`, uid: x.uid, ai: 'damage'})),
      o => this.damage(this.obj(o.uid), 2, {player: p, kind: 'ability'}), {kind: 'damage'});
  }

  dismissItem(i) {
    if (!i) return;
    const host = this.obj(i.host);
    if (host) host.items = host.items.filter(u => u !== i.uid);
    this.objs.delete(i.uid);
    this.players[i.owner].discard.push(i.id);
    this.note(`${this.def(i).name} is dismissed.`);
  }

  abandon(slot, forced) {
    const sc = this.slots[slot], p = sc.owner;
    this.dismissScenario(slot);
    this.players[p].stats[forced ? 'forced' : 'abandoned']++;
    this.note(`${this.name(p)} ${forced ? 'is forced to abandon' : 'abandons'} ${this.def(sc).name}. No reward.`, 'abandon');
    this.replace(p);
  }

  // ---------- turn flow ----------
  beginTurn(p) {
    this.turnNo++;
    this.active = p;
    const P = this.players[p];
    P.t = {};
    this.note(`Round ${this.round} — ${this.name(p)}'s turn.`, 'turn');
    for (const x of this.chars(p)) x.ready = true;
    for (const o of this.objs.values()) if (o.kind === 'item' && o.owner === p) o.ready = true;
    for (const s of P.stash) s.ready = true;
    if (this.turnNo === 1) this.note(`${this.name(p)} skips the first-turn draw.`);
    else this.drawMain(p);
    // §5 step 3: Scenario checks in an order the active player chooses.
    this.soon(() => {
      const mine = this.ownSlots(p);
      if (mine.length < 2) return mine.forEach(s => this.soon(() => this.check(s)));
      this.ask(p, 'Both of your Scenarios are checked now. Which resolves first?',
        () => mine.map(s => ({label: `${this.def(this.slots[s]).name} — ${this.forecast(s).result.toUpperCase()}`, slot: s, ai: 'order', forecast: this.forecast(s).result, key: this.scKey(s)})),
        o => { this.soon(() => this.check(o.slot)); this.soon(() => this.check(mine.find(s => s !== o.slot))); }, {kind: 'order'});
    });
    // §5 step 4: other start-of-turn effects.
    this.soon(() => {
      for (const g of this.chars(p).filter(x => this.key(x) === 'grandma' && x.loc !== HOME)) {
        this.ask(p, 'Grandma: heal 1 damage from a friendly Character at her Scenario.',
          () => this.objs.has(g.uid) && g.loc !== HOME ? this.at(g.loc, p).filter(x => x.damage).map(x => ({label: `${this.def(x).name} (${x.damage} damage)`, uid: x.uid, ai: 'heal'})) : [],
          o => { const x = this.obj(o.uid); x.damage--; this.note(`Grandma heals 1 from ${this.def(x).name}.`); }, {kind: 'heal'});
      }
    });
  }

  get round() { return Math.max(1, Math.ceil(this.turnNo / 2)); }

  endTurn() {
    const p = this.active, P = this.players[p];
    for (const x of this.chars()) {
      x.mods = x.mods.filter(m => m.until > this.turnNo);
      if (x.hothead === this.turnNo) delete x.hothead;
      if (x.watch === this.turnNo) delete x.watch;
    }
    if (this.ownSlots(1 - p).some(s => !this.at(s, p).length)) P.stats.uncontested++;
    P.stats.maxStash = Math.max(P.stats.maxStash, P.stash.length);
    this.note(`${this.name(p)} ends the turn.`);
    this.checkHealth();
    if (p !== this.first) {
      // §9 stalled games: three consecutive full rounds with no Scenario entering or leaving play.
      this.stall = this.changedRound ? 0 : this.stall + 1;
      this.changedRound = false;
      if (this.stall >= RULES.stallRounds) {
        this.note('Three quiet rounds: each player abandons their oldest Scenario.', 'abandon');
        for (const q of [p, 1 - p]) {
          const oldest = this.ownSlots(q).sort((a, b) => this.slots[a].order - this.slots[b].order)[0];
          if (oldest !== undefined) this.soon(() => this.abandon(oldest, true));
        }
        this.stall = 0;
      }
    }
    this.soon(() => this.beginTurn(1 - p));
  }

  // ---------- moves ----------
  canAttack(x) {
    return x.owner === this.active && x.loc !== HOME && x.ready && x.noAttack !== this.turnNo && (x.born < this.turnNo || this.hothead(x));
  }

  attackTargets(x) {
    if (!this.canAttack(x)) return [];
    const opp = this.chars(1 - x.owner).filter(t => t.loc !== HOME);
    const sucker = this.def(x).keywords?.includes('Sucker Punch') && x.sucker !== this.turnNo;
    return opp.filter(t => t.loc === x.loc || sucker).map(t => t.uid);
  }

  // Targets for a Main card, each merged into the play move.
  cardTargets(p, c) {
    const mine = this.chars(p), atSc = mine.filter(x => x.loc !== HOME);
    const where = new Set(atSc.map(x => x.loc));
    switch (c.key) {
      case 'violation-notice': return this.chars(1 - p).filter(x => where.has(x.loc)).map(x => ({target: x.uid}));
      case 'objection': case 'hold-my-beer': case 'watch-this': return atSc.map(x => ({target: x.uid}));
      case 'walk-it-off': return mine.map(x => ({target: x.uid}));
      case 'emergency-meeting': return [...where].map(slot => ({slot}));
      case 'bolt-cutters': return [...this.objs.values()].filter(i => {
        if (i.kind !== 'item') return false;
        const h = this.obj(i.host);
        if (!where.has(h.loc)) return false;
        return !(this.scKey(h.loc) === 'code' && this.supporting(h) && h.owner !== p);
      }).map(i => ({target: i.uid}));
      case 'did-you-see-that': return this.players[p].t.defeated ? [{}] : [];
      default: return c.attach ? mine.map(x => ({target: x.uid})) : [{}];
    }
  }

  legalMoves() {
    if (this.winner !== null) return [];
    if (this.pending) return this.pending.options.map((o, i) => ({type: 'choose', index: i}));
    if (this.phase === 'mulligan') return [{type: 'mulligan', indices: []}];
    const p = this.active, P = this.players[p], fuel = this.fuel(p), out = [];
    P.hand.forEach((id, i) => {
      const c = this.def(id);
      if (c.type !== 'Scenario' && !P.t.stash) out.push({type: 'stash', index: i});
      if (c.cost > fuel) return;
      if (c.type === 'Scenario') {
        if (P.t.scenario || this.ownSlots(p).length >= RULES.ownScenarios || !this.slots.includes(null)) return;
        for (const x of this.home(p)) if (x.moved !== this.turnNo) out.push({type: 'scenario', index: i, uid: x.uid});
      } else for (const t of this.cardTargets(p, c)) out.push({type: 'play', index: i, ...t});
    });
    for (const x of this.chars(p)) {
      if (x.moved !== this.turnNo) {
        if (x.loc === HOME) { for (const s of this.liveSlots()) if (this.at(s, p).length < RULES.capacity) out.push({type: 'commit', uid: x.uid, slot: s}); }
        else out.push({type: 'withdraw', uid: x.uid});
      }
      for (const t of this.attackTargets(x)) out.push({type: 'attack', uid: x.uid, target: t});
    }
    if (!P.t.abandon) for (const s of this.ownSlots(p)) out.push({type: 'abandon', slot: s});
    out.push({type: 'end'});
    return out;
  }

  apply(m) {
    if (this.winner !== null) throw Error('The game is over.');
    if (m.type === 'mulligan') {
      if (this.phase !== 'mulligan') throw Error('Not the mulligan step.');
      this.mulligan(this.mulligans[0], m.indices || []);
      this.mulligans.shift();
      if (!this.mulligans.length) { this.phase = 'play'; this.soon(() => this.beginTurn(this.first)); }
      return this.run();
    }
    if (!this.legalMoves().some(l => moveKey(l) === moveKey(m))) throw Error('Illegal move: ' + JSON.stringify(m));
    if (m.type === 'choose') {
      const {onPick, options} = this.pending;
      this.pending = null;
      onPick(options[m.index]);
      return this.run();
    }
    const p = this.active, P = this.players[p];
    if (m.type === 'end') this.endTurn();
    if (m.type === 'stash') {
      const id = P.hand.splice(m.index, 1)[0];
      P.stash.push({id, ready: true});
      P.t.stash = true;
      P.stats.maxStash = Math.max(P.stats.maxStash, P.stash.length);
      this.note(`${this.name(p)} Stashes a card (${P.stash.length} total).`);
    }
    if (m.type === 'scenario') {
      const id = P.hand.splice(m.index, 1)[0], c = this.def(id), slot = this.slots.indexOf(null);
      this.pay(p, c.cost);
      this.slots[slot] = {uid: this.nextUid++, id, owner: p, order: ++this.scOrder, born: this.turnNo};
      P.t.scenario = true;
      P.stats.played++;
      this.markChange();
      this.note(`${this.name(p)} accuses: “${c.name}”`, 'accuse');
      this.commit(this.obj(m.uid), slot, true);
    }
    if (m.type === 'play') this.playCard(p, m);
    if (m.type === 'commit') this.commit(this.obj(m.uid), m.slot, true);
    if (m.type === 'withdraw') {
      const x = this.obj(m.uid);
      this.note(`${this.def(x).name} withdraws from ${this.def(this.slots[x.loc]).name}.`);
      x.loc = HOME;
      x.moved = this.turnNo;
    }
    if (m.type === 'attack') this.attack(this.obj(m.uid), this.obj(m.target));
    if (m.type === 'abandon') { P.t.abandon = true; this.abandon(m.slot, false); }
    this.run();
  }

  mulligan(p, indices) {
    const P = this.players[p], picked = [...new Set(indices)].filter(i => i >= 0 && i < P.hand.length).sort((a, b) => b - a);
    let main = 0, sc = 0;
    for (const i of picked) {
      const id = P.hand.splice(i, 1)[0];
      if (this.def(id).type === 'Scenario') { P.scDeck.push(id); sc++; } else { P.deck.push(id); main++; }
    }
    for (let i = 0; i < main; i++) this.drawMain(p, true);
    for (let i = 0; i < sc; i++) this.drawScenario(p, true);
    this.shuffle(P.deck);
    this.shuffle(P.scDeck);
    this.note(picked.length ? `${this.name(p)} replaces ${picked.length} card${picked.length > 1 ? 's' : ''}.` : `${this.name(p)} keeps their opening hand.`);
  }

  playCard(p, m) {
    const P = this.players[p], id = P.hand.splice(m.index, 1)[0], c = this.def(id), t = this.obj(m.target);
    this.pay(p, c.cost);
    if (c.type === 'Character') {
      const x = this.enter(p, id);
      this.note(`${this.name(p)} plays ${c.name}.`);
      if (c.key === 'neighborhood-watch') this.ask(p, 'Neighborhood Watch: commit it to an opposing Scenario?',
        () => this.ownSlots(1 - p).filter(s => this.at(s, p).length < RULES.capacity).map(s => ({label: this.def(this.slots[s]).name, slot: s, ai: 'contest'})),
        o => !o.decline && this.commit(x, o.slot, false), {optional: true, kind: 'contest'});
      return;
    }
    if (c.type === 'Item') {
      const i = {uid: this.nextUid++, id, kind: 'item', owner: p, host: t.uid, ready: true};
      this.objs.set(i.uid, i);
      t.items.push(i.uid);
      this.note(`${this.name(p)} attaches ${c.name} to ${this.def(t).name}.`);
      return;
    }
    P.discard.push(id);
    this.note(`${this.name(p)} plays ${c.name}${t ? ' on ' + this.def(t).name : ''}.`);
    switch (c.key) {
      case 'violation-notice': this.damage(t, 2, {player: p, kind: 'action'}); break;
      case 'objection': this.leave(t); P.hand.push(t.id); this.drawMain(p); break;
      case 'emergency-meeting':
        for (const x of this.at(m.slot, p).filter(x => !x.ready).slice(0, 2)) { x.ready = true; x.noAttack = this.turnNo; }
        break;
      case 'neighborhood-petition': this.ask(p, 'Neighborhood Petition: choose a Scenario to put into your hand.',
        () => [...new Set(P.scDeck)].map(id => ({label: this.def(id).name, id, ai: 'tutor'})),
        o => { P.scDeck.splice(P.scDeck.indexOf(o.id), 1); P.hand.push(o.id); this.shuffle(P.scDeck); this.note(`Petition reveals “${this.def(o.id).name}”.`); },
        {kind: 'tutor'});
        break;
      case 'hold-my-beer': t.mods.push({power: 2, until: this.turnNo, label: 'Hold My Beer +2'}); this.damage(t, 1, {player: p, kind: 'self'}); break;
      case 'walk-it-off': t.damage = Math.max(0, t.damage - 2); this.drawMain(p); break;
      case 'bolt-cutters': this.dismissItem(t); break;
      case 'did-you-see-that': this.drawMain(p); this.drawMain(p); break;
      case 'watch-this': t.mods.push({power: 2, until: this.turnNo, label: 'Watch This! +2'}); t.hothead = this.turnNo; t.watch = this.turnNo; break;
    }
  }

  attack(x, t) {
    x.ready = false;
    if (t.loc !== x.loc) x.sucker = this.turnNo;
    const pw = this.power(x), back = this.power(t), retaliates = this.def(t).keywords?.includes('Retaliate');
    this.note(`${this.def(x).name} attacks ${this.def(t).name} for ${pw}.`, 'attack');
    this.damage(t, pw, {player: x.owner, kind: 'attack'});
    // Retaliate: after the attacker's damage, even if the defender was defeated.
    if (retaliates && this.objs.has(x.uid)) { this.note(`${this.def(t).name} retaliates for ${back}.`); this.damage(x, back, {player: t.owner, kind: 'retaliate'}); }
    if (x.watch === this.turnNo && this.objs.has(x.uid)) { delete x.watch; this.note(`Watch This!: ${this.def(x).name} takes 2.`); this.damage(x, 2, {player: x.owner, kind: 'self'}); }
  }

  // Every card each player owns, for conservation checks.
  census(p) {
    const P = this.players[p], ids = [...P.deck, ...P.hand, ...P.discard, ...P.scDeck, ...P.scDiscard, ...P.stash.map(s => s.id)];
    for (const o of this.objs.values()) if (o.owner === p) ids.push(o.id);
    for (const s of this.slots) if (s?.owner === p) ids.push(s.id);
    return ids;
  }

  record() {
    return {seed: this.seed, first: this.name(this.first), rounds: this.round, winner: this.winner === null ? null : this.name(this.winner),
      players: this.players.map(P => ({leader: P.leader.name, verdict: P.verdict, stash: P.stash.length, ...P.stats}))};
  }
}

// Human-readable label for a move, shared by the table UI and logs.
export function describe(g, m) {
  const P = g.players[g.active], card = i => g.def(P.hand[i]), nm = u => g.def(g.obj(u)).name;
  switch (m.type) {
    case 'end': return 'End turn';
    case 'stash': return `Stash ${card(m.index).name}`;
    case 'scenario': return `Accuse — ${nm(m.uid)} supports`;
    case 'play': {
      const c = card(m.index);
      if (m.slot !== undefined) return `${c.name} at ${g.def(g.slots[m.slot]).name}`;
      if (m.target === undefined) return `Play ${c.name}`;
      const t = g.obj(m.target);
      return `${c.name} → ${t.kind === 'item' ? g.def(t).name + ' on ' + nm(t.host) : nm(m.target)}`;
    }
    case 'commit': return `${g.slots[m.slot].owner === g.active ? 'Support' : 'Contest'} ${g.def(g.slots[m.slot]).name}`;
    case 'withdraw': return 'Withdraw Home';
    case 'attack': return `Attack ${nm(m.target)}`;
    case 'abandon': return `Abandon ${g.def(g.slots[m.slot]).name}`;
    case 'choose': return g.pending.options[m.index].label;
    default: return m.type;
  }
}
