// Accusations Lab browser table: vs bot, pass-and-play, or bot-vs-bot spectating.
import {Game, describe, RULES} from './engine.mjs';
import {chooseMove} from './ai.mjs';

const root = document.querySelector('#app'), toastBox = document.querySelector('#toasts');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const SOURCE = 'https://github.com/jobeck17/unhinged/blob/main/lab/accusations/RULES.md';
const SPEED = {calm: 750, brisk: 380, fast: 90};

let cards, decks, g, cfg = {mode: 'bot', deck: 0, opp: 1, first: 'random', speed: 'brisk'};
let view = 0, sel = null, curtain = false, timer = null, seen = 0, mull = new Set(), sheet = null, error = '';

const humans = () => cfg.mode === 'bot' ? [0] : cfg.mode === 'local' ? [0, 1] : [];
const isHuman = p => humans().includes(p);
const styleOf = p => g.players[p].style.toLowerCase();
const passive = p => g.players[p].leader.text.replace(/^\w+:\s*/, '');

// ---------- setup ----------
function setup() {
  clearTimeout(timer);
  g = null;
  const tile = (d, i) => {
    const leader = cards.cards.find(c => c.id === d.leader);
    const scen = Object.keys(d.scenarios).map(id => cards.cards.find(c => c.id === id).name);
    return `<button class="leader-tile style-${d.style.toLowerCase()} ${cfg.deck === i ? 'chosen' : ''}" data-deck="${i}">
      <span class="eyebrow">${esc(d.style)}</span><strong>${esc(leader.name)}</strong>
      <p>${esc(leader.text.replace(/^\w+:\s*/, ''))}</p>
      <span class="tile-list">${scen.map(s => `<em>${esc(s)}</em>`).join('')}</span></button>`;
  };
  const seg = (name, opts) => `<div class="seg" role="radiogroup" data-seg="${name}">${opts.map(([v, l]) => `<button role="radio" aria-checked="${cfg[name] === v}" data-v="${v}">${l}</button>`).join('')}</div>`;
  root.innerHTML = `<section class="setup">
    <span class="eyebrow">Unhinged · Lab · Prototype · 24 Oct 2026</span>
    <h1>Objection,<br><span>your honor.</span></h1>
    <p class="intro">Prosecute your own ridiculous Scenarios. Contest your neighbor's. Leaders can't be hit and Characters fight only where they stand. First to <b>${RULES.win} Verdict</b> wins.</p>
    <h2 class="setup-h">Your Leader</h2>
    <div class="tiles">${decks.decks.map(tile).join('')}</div>
    <div class="options">
      <label><span class="eyebrow">Mode</span>${seg('mode', [['bot', 'Vs bot'], ['local', 'Pass &amp; play'], ['watch', 'Watch bots']])}</label>
      <label><span class="eyebrow">First player</span>${seg('first', [['random', 'Random'], ['me', 'You'], ['them', 'Opponent']])}</label>
      <label><span class="eyebrow">Bot speed</span>${seg('speed', [['calm', 'Calm'], ['brisk', 'Brisk'], ['fast', 'Fast']])}</label>
      <label><span class="eyebrow">Opponent deck</span><select id="opp">${decks.decks.map((d, i) => `<option value="${i}" ${cfg.opp === i ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}</select></label>
    </div>
    <button id="start" class="primary big">Call the first case →</button>
    <details class="primer"><summary>The rules in sixty seconds</summary>${primer()}</details>
    <nav><a href="${SOURCE}" target="_blank" rel="noopener">Full RULES.md</a><a href="../">Lab index</a><a href="../../web/">Current game</a></nav>
  </section>`;
  root.querySelectorAll('[data-deck]').forEach(b => b.onclick = () => { cfg.deck = +b.dataset.deck; cfg.opp = 1 - cfg.deck; setup(); });
  root.querySelectorAll('[data-seg] button').forEach(b => b.onclick = () => { cfg[b.parentElement.dataset.seg] = b.dataset.v; setup(); });
  root.querySelector('#opp').onchange = e => { cfg.opp = +e.target.value; };
  root.querySelector('#start').onclick = start;
}

function primer() {
  return `<ol>
    <li><b>Each turn:</b> ready everything, draw 1 Main card, then check <i>your</i> Scenarios.</li>
    <li><b>Stash</b> one Main card face-down per turn. Each Ready Stash pays 1.</li>
    <li><b>Accuse:</b> once per turn, play a Scenario into an empty bench (max 2 of yours) and immediately commit a Character to support it.</li>
    <li><b>Commit / Withdraw</b> each Character once per turn: Home ↔ a Scenario. Max 3 of yours per Scenario.</li>
    <li><b>Attack</b> only opposing Characters at the same Scenario. No blocking, no automatic retaliation. New Characters wait a turn unless Hothead.</li>
    <li><b>Check</b> at the start of the owner's turn: supporters and no contesters → <b>1 Verdict</b>. No supporters → it fails, and a contesting defender draws 1.</li>
    <li>Whenever your Scenario leaves, draw a replacement. Three quiet rounds forces each player to abandon their oldest Scenario.</li>
  </ol>`;
}

function start() {
  const first = cfg.first === 'random' ? undefined : cfg.first === 'me' ? 0 : 1;
  g = new Game(cards, decks, {decks: [cfg.deck, cfg.opp], first});
  window.game = g;
  view = 0;
  sel = null;
  seen = g.log.length;
  mull.clear();
  sheet = null;
  curtain = cfg.mode === 'local' && g.actor !== view;
  step();
}

// ---------- flow ----------
function act(m) {
  try {
    g.apply(m);
    error = '';
  } catch (e) {
    error = e.message;
    console.error(e);
  }
  sel = null;
  step();
}

function step() {
  clearTimeout(timer);
  announce();
  if (g.winner === null && !isHuman(g.actor)) {
    timer = setTimeout(() => act(chooseMove(g)), g.phase === 'mulligan' ? 200 : SPEED[cfg.speed]);
  } else if (cfg.mode === 'local' && g.winner === null && g.actor !== view) {
    curtain = true;
  }
  render();
}

function announce() {
  const fresh = g.log.filter(e => e.n >= seen).reverse();
  seen = g.log.length;
  if (g.winner !== null) return;
  for (const e of fresh) if (['verdict', 'fail', 'defense', 'win', 'accuse', 'abandon'].includes(e.tone)) toast(e.text, e.tone);
}

function toast(text, tone) {
  const t = document.createElement('div');
  t.className = 'toast tone-' + tone;
  t.textContent = text;
  toastBox.append(t);
  while (toastBox.children.length > 3) toastBox.firstChild.remove();
  setTimeout(() => t.classList.add('out'), 2600);
  setTimeout(() => t.remove(), 3100);
}

// ---------- selection ----------
const myTurn = () => g.winner === null && !g.pending && g.phase !== 'mulligan' && isHuman(g.active) && g.active === view && !curtain;

function selMoves() {
  if (!sel || !myTurn()) return [];
  return g.legalMoves().filter(m => {
    if (sel.kind === 'hand') return m.index === sel.index && ['play', 'stash', 'scenario'].includes(m.type);
    if (sel.kind === 'char') return m.uid === sel.uid && ['commit', 'withdraw', 'attack'].includes(m.type);
    if (sel.kind === 'slot') return m.type === 'abandon' && m.slot === sel.slot;
    return false;
  });
}

// What a move points at on the board, if anything.
function targetOf(m) {
  if (m.type === 'attack') return {uid: m.target};
  if (m.type === 'scenario') return {uid: m.uid};
  if (m.type === 'commit') return {side: m.slot};
  if (m.type === 'play' && m.slot !== undefined) return {slot: m.slot};
  if (m.type === 'play' && m.target !== undefined) return {uid: m.target};
  return null;
}

function targets() {
  const out = {uids: new Set(), sides: new Set(), slots: new Set()};
  for (const m of selMoves()) {
    const t = targetOf(m);
    if (t?.uid !== undefined) out.uids.add(t.uid);
    if (t?.side !== undefined) out.sides.add(t.side);
    if (t?.slot !== undefined) out.slots.add(t.slot);
  }
  return out;
}

function hit(t) {
  const m = selMoves().find(m => { const x = targetOf(m); return x && Object.keys(t).every(k => x[k] === t[k]); });
  if (m) act(m);
  return !!m;
}

// ---------- pieces ----------
function pips(n) {
  return `<span class="pips" aria-label="${n} of ${RULES.win} Verdict">${Array.from({length: RULES.win}, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;
}

function seat(p) {
  const P = g.players[p], you = p === view, scen = P.hand.filter(id => g.def(id).type === 'Scenario').length;
  const clock = g.active === p && g.winner === null;
  return `<section class="seat style-${styleOf(p)} ${you ? 'you' : 'them'} ${clock ? 'clock' : ''}">
    <div class="plaque">
      <span class="eyebrow">${you ? (cfg.mode === 'local' ? 'Player ' + (p + 1) : cfg.mode === 'watch' ? 'Bot A' : 'You') : (cfg.mode === 'local' ? 'Player ' + (p + 1) : cfg.mode === 'watch' ? 'Bot B' : 'Opponent')} · ${esc(P.style)}${clock ? ' · <b class="on-clock">On the clock</b>' : ''}</span>
      <strong>${esc(P.leader.name)}</strong>
      <p>${esc(passive(p))}</p>
    </div>
    <div class="verdict"><span class="eyebrow">Verdict</span>${pips(P.verdict)}<b>${P.verdict}<small>/${RULES.win}</small></b></div>
    <dl class="counts">
      <div><dt>Hand</dt><dd>${P.hand.length - scen}<small>+${scen} scen.</small></dd></div>
      <div><dt>Main deck</dt><dd>${P.deck.length}</dd></div>
      <div><dt>Scenarios</dt><dd>${P.scDeck.length}</dd></div>
      <div><dt>Discard</dt><dd>${P.discard.length}<small>+${P.scDiscard.length}</small></dd></div>
    </dl>
    <div class="stash"><span class="eyebrow">Stash ${g.fuel(p)}/${P.stash.length} ready</span><span class="coins">${P.stash.map(s => `<i class="${s.ready ? 'ready' : 'spent'}"></i>`).join('') || '<em>empty</em>'}</span></div>
  </section>`;
}

function token(x, tg) {
  const c = g.def(x), pw = g.power(x), hp = g.health(x), left = hp - x.damage;
  const flags = [];
  if (!x.ready) flags.push('Rotated');
  if (x.born === g.turnNo && x.owner === g.active && !g.hothead(x)) flags.push('New');
  if (x.moved === g.turnNo) flags.push('Moved');
  const items = g.items(x).map(i => `<span class="chip ${tg.uids.has(i.uid) ? 'target' : ''}" data-uid="${i.uid}" title="${esc(g.def(i).text)}">${esc(g.def(i).name)}</span>`).join('');
  const kw = [...(c.keywords || []), ...(g.hothead(x) && !c.keywords?.includes('Hothead') ? ['Hothead'] : []), ...(g.absorbs(x) && !c.keywords?.includes('Absorb 1') ? ['Absorb 1'] : [])];
  const cls = ['tok', 'style-' + styleOf(x.owner), x.owner === view ? 'mine' : 'theirs', x.ready ? '' : 'rotated', sel?.uid === x.uid ? 'selected' : '', tg.uids.has(x.uid) ? 'target' : ''].join(' ');
  return `<button class="${cls}" data-uid="${x.uid}" title="${esc(c.name + ' — ' + c.text)}">
    <span class="tok-name">${esc(c.name)}</span>
    ${kw.length ? `<span class="tok-kw">${kw.map(esc).join(' · ')}</span>` : ''}
    ${items ? `<span class="tok-items">${items}</span>` : ''}
    <span class="tok-stats"><b class="pw ${pw > c.power ? 'up' : pw < c.power ? 'down' : ''}" title="Power">${pw}</b><b class="hp ${x.damage ? 'hurt' : ''} ${hp > c.health ? 'up' : hp < c.health ? 'down' : ''}" title="Health remaining / Health">${left}<small>/${hp}</small></b></span>
    ${x.damage ? `<span class="dmg">${'●'.repeat(Math.min(x.damage, 6))}</span>` : ''}
    ${flags.length ? `<span class="tok-flag">${flags.join(' · ')}</span>` : ''}
  </button>`;
}

function homeRow(p, tg) {
  const xs = g.home(p);
  return `<section class="home ${p === view ? 'you' : 'them'}"><span class="zone-label">${p === view ? 'Your' : esc(g.players[p].leader.name + "'s")} Home</span>
    <div class="row">${xs.map(x => token(x, tg)).join('') || `<span class="none">No Characters at Home</span>`}</div></section>`;
}

function stamp(f) {
  const text = {success: 'Would succeed', fail: 'Would fail', hold: 'Held up'}[f.result];
  return `<span class="stamp ${f.result}">${text}</span>`;
}

function bench(slot, tg) {
  const sc = g.slots[slot];
  if (!sc) return `<div class="bench vacant"><div class="vacancy"><span>Bench ${slot + 1}</span><small>Open · play a Scenario here</small></div></div>`;
  const c = g.def(sc), f = g.forecast(slot), owner = sc.owner, mineSc = owner === view;
  const side = p => {
    const xs = g.at(slot, p), target = p === view && tg.sides.has(slot);
    const role = p === owner ? 'Supporting' : 'Contesting';
    return `<div class="side ${p === view ? 'you' : 'them'} ${target ? 'target' : ''}" ${target ? `data-side="${slot}"` : ''}>
      <span class="side-label">${role} · ${xs.length}/${RULES.capacity}</span>
      <div class="row">${xs.map(x => token(x, tg)).join('')}${target ? `<span class="drop">Commit here</span>` : ''}</div></div>`;
  };
  const cls = ['accusation', 'style-' + styleOf(owner), mineSc ? 'mine' : 'theirs', sel?.slot === slot ? 'selected' : '', tg.slots.has(slot) ? 'target' : ''].join(' ');
  return `<div class="bench">
    ${side(1 - view)}
    <article class="${cls}" data-slot="${slot}" tabindex="0">
      <header><span class="docket-no">Case ${String(sc.order).padStart(2, '0')}</span><span class="cost" title="Cost">${c.cost}</span></header>
      <span class="filed">${esc(g.players[owner].leader.name)} accuses ${mineSc && cfg.mode === 'bot' ? '(you)' : ''}</span>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.text)}</p>
      <footer>${stamp(f)}<span class="why">${esc(f.why)} · checked on ${owner === view ? 'your' : esc(g.players[owner].leader.name + "'s")} turn</span></footer>
    </article>
    ${side(view)}
  </div>`;
}

function handCard(id, i, tg, playable) {
  const c = g.def(id), scen = c.type === 'Scenario';
  const cls = ['card', scen ? 'scenario' : 'style-' + styleOf(view), sel?.kind === 'hand' && sel.index === i ? 'selected' : '', playable === null ? '' : playable.has(i) ? 'live' : 'idle', mull.has(i) ? 'marked' : ''].join(' ');
  return `<button class="${cls}" data-hand="${i}">
    <span class="card-top"><span class="cost">${c.cost}</span><span class="type">${scen ? 'Accusation' : esc(c.type)}</span></span>
    <strong>${esc(c.name)}</strong>
    <span class="card-text">${esc(c.text)}</span>
    ${c.type === 'Character' ? `<span class="card-stats"><b class="pw">${c.power}</b><b class="hp">${c.health}</b></span>` : ''}
  </button>`;
}

function inspector() {
  if (!sel) return '';
  let c, extra = '';
  if (sel.kind === 'hand') c = g.def(g.players[view].hand[sel.index]);
  if (sel.kind === 'char' || sel.kind === 'look') {
    const x = g.obj(sel.uid);
    if (!x) return '';
    c = g.def(x);
    const mods = x.mods.map(m => m.label);
    extra = `<span class="insp-stats">Power ${g.power(x)} · Health ${g.remaining(x)}/${g.health(x)}${x.damage ? ` · ${x.damage} damage` : ''}${mods.length ? ' · ' + mods.map(esc).join(', ') : ''}</span>`;
  }
  if (sel.kind === 'slot') c = g.def(g.slots[sel.slot]);
  if (!c) return '';
  return `<div class="inspector"><span class="eyebrow">${esc(c.type)}${c.cost !== undefined ? ' · Cost ' + c.cost : ''}</span><strong>${esc(c.name)}</strong><p>${esc(c.text)}</p>${extra}</div>`;
}

function instruction() {
  if (g.winner !== null) return `${g.endReason}.`;
  if (curtain) return 'Waiting for the next player…';
  if (!isHuman(g.actor)) return `${g.actorName()} is thinking…`;
  if (g.pending) return g.pending.prompt;
  if (sel) {
    const ms = selMoves();
    if (!ms.length) return sel.kind === 'look' ? 'Opposing card — inspect only.' : 'Nothing legal for this card right now.';
    return ms.some(targetOf) ? 'Pick a highlighted target on the table, or use a button.' : 'Choose an action.';
  }
  const P = g.players[view];
  const hints = [];
  if (!P.t.stash) hints.push('Stash a card');
  if (!P.t.scenario && g.ownSlots(view).length < RULES.ownScenarios) hints.push('file an accusation');
  hints.push('commit, attack, then end your turn');
  return 'Your turn — ' + hints.join(', ') + '.';
}

function tray() {
  const ms = selMoves(), mine = myTurn(), P = g.players[g.active];
  const chips = mine ? `<span class="chips">
      <span class="pill ${P.t.stash ? 'used' : ''}">Stash ${P.t.stash ? 'used' : 'open'}</span>
      <span class="pill ${P.t.scenario ? 'used' : ''}">Accusation ${P.t.scenario ? 'filed' : 'open'}</span>
      <span class="pill">Round ${g.round}</span></span>` : `<span class="chips"><span class="pill">Round ${g.round}</span></span>`;
  return `<section class="tray ${mine ? 'live' : ''}">
    <div class="tray-main">
      <p class="instruction" role="status">${esc(instruction())}</p>
      ${chips}
      ${error ? `<p class="error" role="alert">${esc(error)}</p>` : ''}
    </div>
    ${inspector()}
    <div class="tray-actions">
      ${ms.map((m, i) => `<button data-move="${i}" class="${m.type === 'stash' ? 'quiet' : m.type === 'abandon' ? 'danger' : ''}">${esc(describe(g, m))}</button>`).join('')}
      ${sel ? '<button id="clear" class="quiet">Cancel</button>' : ''}
      ${mine ? '<button id="end" class="primary">End turn</button>' : ''}
    </div>
  </section>`;
}

function docket() {
  const rows = [];
  for (const e of g.log.slice(0, 60)) rows.push(e.tone === 'turn' ? `<li class="turn">${esc(e.text)}</li>` : `<li class="tone-${e.tone}">${esc(e.text)}</li>`);
  const s = p => g.players[p].stats;
  const line = (label, k) => `<tr><th>${label}</th><td>${s(view)[k]}</td><td>${s(1 - view)[k]}</td></tr>`;
  return `<aside class="docket">
    <h2>Court record</h2>
    <ol class="log">${rows.join('')}</ol>
    <details><summary>Test-goal tallies</summary>
      <table><thead><tr><th></th><th>${esc(g.players[view].leader.name)}</th><th>${esc(g.players[1 - view].leader.name)}</th></tr></thead><tbody>
      ${line('Scenarios played', 'played')}${line('Succeeded', 'succeeded')}${line('Failed', 'failed')}${line('Abandoned', 'abandoned')}${line('Forced abandons', 'forced')}${line('Defense draws', 'defenseDraws')}${line('Max Stash', 'maxStash')}${line('Turns left uncontested', 'uncontested')}${line('Kills at Scenarios', 'defeats')}
      </tbody></table></details>
    <details><summary>Rules primer</summary>${primer()}<p><a href="${SOURCE}" target="_blank" rel="noopener">Full RULES.md</a></p></details>
  </aside>`;
}

function overlay() {
  if (curtain) return `<div class="overlay"><div class="sheet curtain"><span class="eyebrow">Pass &amp; play</span><h2>Hand the device to Player ${g.actor + 1}</h2><p>${esc(g.actorName())} has a decision${g.pending ? ': ' + esc(g.pending.prompt) : ''}.</p><button id="reveal" class="primary">I'm Player ${g.actor + 1} — reveal</button></div></div>`;
  if (g.winner !== null) {
    const r = g.record();
    return `<div class="overlay"><div class="sheet verdict-sheet"><span class="eyebrow">Court is adjourned · Round ${r.rounds}</span><h2>${esc(r.winner)} wins.</h2>
      <p>${esc(g.endReason)}. ${cfg.mode === 'bot' ? (g.winner === view ? 'Case closed in your favor.' : 'The bot takes this one.') : ''}</p>
      <table class="final"><thead><tr><th></th>${r.players.map(p => `<th>${esc(p.leader)}</th>`).join('')}</tr></thead><tbody>
      ${[['Verdict', 'verdict'], ['Scenarios played', 'played'], ['Succeeded', 'succeeded'], ['Failed', 'failed'], ['Abandoned (+forced)', 'abandoned'], ['Defense draws', 'defenseDraws'], ['Max Stash', 'maxStash'], ['Turns left uncontested', 'uncontested']]
        .map(([l, k]) => `<tr><th>${l}</th>${r.players.map(p => `<td>${p[k]}${k === 'abandoned' ? ' (+' + p.forced + ')' : ''}</td>`).join('')}</tr>`).join('')}
      </tbody></table>
      <div class="sheet-actions"><button id="copy">Copy test record</button><button id="board">View final table</button><button id="rematch" class="primary">Rematch</button><button id="new">New setup</button></div></div></div>`;
  }
  if (!isHuman(g.actor)) return '';
  if (g.phase === 'mulligan') {
    const P = g.players[g.actor];
    return `<div class="overlay"><div class="sheet wide"><span class="eyebrow">Opening hand · ${esc(P.leader.name)}</span><h2>Keep, or redraw?</h2>
      <p>Tap any cards to put on the bottom of their decks and draw the same number. You get one redraw.</p>
      <div class="mull">${P.hand.map((id, i) => handCard(id, i, targets(), null)).join('')}</div>
      <div class="sheet-actions"><button id="keep" class="primary">${mull.size ? `Replace ${mull.size} card${mull.size > 1 ? 's' : ''}` : 'Keep this hand'}</button></div></div></div>`;
  }
  if (g.pending) {
    return `<div class="overlay soft"><div class="sheet"><span class="eyebrow">${esc(g.actorName())} chooses</span><h2>${esc(g.pending.prompt)}</h2>
      <div class="choices">${g.pending.options.map((o, i) => `<button data-choose="${i}" class="${o.decline ? 'quiet' : 'choice'}">${esc(o.label)}</button>`).join('')}</div></div></div>`;
  }
  return '';
}

// ---------- render ----------
function render() {
  if (!g) return setup();
  if (sheet === 'board' && g.winner === null) sheet = null;
  if (cfg.mode === 'watch') view = 0;
  const tg = targets(), opp = 1 - view;
  const playable = new Set(myTurn() ? g.legalMoves().filter(m => m.index !== undefined && m.type !== 'stash').map(m => m.index) : []);
  const P = g.players[view];
  root.innerHTML = `<header class="topbar">
      <div class="brand"><b>UNHINGED</b><span>Accusations Lab</span></div>
      <div class="turn-pill style-${styleOf(g.active)}">${g.phase === 'mulligan' ? 'Opening hands' : `Round ${g.round} · ${esc(g.name(g.active))}`}</div>
      <div class="top-actions"><a class="ghost" href="${SOURCE}" target="_blank" rel="noopener">Rules</a><button id="restart" class="ghost">New match</button></div>
    </header>
    <div class="table">
      <div class="board">
        ${seat(opp)}
        ${homeRow(opp, tg)}
        <section class="court" aria-label="Scenario benches">${g.slots.map((_, i) => bench(i, tg)).join('')}</section>
        ${homeRow(view, tg)}
        ${seat(view)}
        ${tray()}
        <section class="hand"><div class="hand-head"><h2>${cfg.mode === 'watch' ? esc(P.leader.name) + "'s hand" : 'Your hand'}</h2><span>${P.hand.length} cards · tap a card to see what it can do</span></div>
          <div class="hand-row">${P.hand.map((id, i) => handCard(id, i, tg, playable)).join('') || '<span class="none">Empty hand</span>'}</div></section>
      </div>
      ${docket()}
    </div>
    ${sheet === 'board' ? '<button id="back" class="primary floating">Back to results</button>' : overlay()}`;
  wire(tg);
}

function wire(tg) {
  const $ = s => root.querySelector(s);
  $('#restart').onclick = () => { if (g.winner !== null || confirm('Abandon this match and return to setup?')) setup(); };
  $('#end')?.addEventListener('click', () => act({type: 'end'}));
  $('#clear')?.addEventListener('click', () => { sel = null; render(); });
  $('#reveal')?.addEventListener('click', () => { view = g.actor; curtain = false; sel = null; render(); });
  $('#keep')?.addEventListener('click', () => { const indices = [...mull]; mull.clear(); act({type: 'mulligan', indices}); });
  $('#rematch')?.addEventListener('click', start);
  $('#new')?.addEventListener('click', setup);
  $('#board')?.addEventListener('click', () => { sheet = 'board'; render(); });
  $('#back')?.addEventListener('click', () => { sheet = null; render(); });
  $('#copy')?.addEventListener('click', e => {
    const text = JSON.stringify({...g.record(), date: new Date().toISOString(), mode: cfg.mode}, null, 2);
    navigator.clipboard?.writeText(text).then(() => { e.target.textContent = 'Copied!'; }, () => prompt('Copy this record:', text));
  });
  const ms = selMoves();
  root.querySelectorAll('[data-move]').forEach(b => b.onclick = () => act(ms[+b.dataset.move]));
  root.querySelectorAll('[data-choose]').forEach(b => b.onclick = () => act({type: 'choose', index: +b.dataset.choose}));
  root.querySelectorAll('.overlay [data-hand]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const i = +b.dataset.hand;
    mull.has(i) ? mull.delete(i) : mull.add(i);
    render();
  });
  root.querySelectorAll('.board [data-hand]').forEach(b => b.onclick = () => {
    const i = +b.dataset.hand;
    sel = sel?.kind === 'hand' && sel.index === i ? null : {kind: 'hand', index: i};
    render();
  });
  root.querySelectorAll('.board [data-uid]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const uid = +b.dataset.uid;
    if (tg.uids.has(uid) && hit({uid})) return;
    const x = g.obj(uid);
    if (!x || x.kind !== 'char') return;
    sel = sel?.uid === uid ? null : {kind: x.owner === view && myTurn() ? 'char' : 'look', uid};
    render();
  });
  root.querySelectorAll('[data-side]').forEach(b => b.onclick = () => hit({side: +b.dataset.side}));
  root.querySelectorAll('[data-slot]').forEach(b => b.onclick = () => {
    const slot = +b.dataset.slot;
    if (tg.slots.has(slot) && hit({slot})) return;
    if (tg.sides.has(slot) && hit({side: slot})) return;
    sel = sel?.slot === slot ? null : {kind: 'slot', slot};
    render();
  });
}

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && g) { sel = null; render(); }
});

try {
  [cards, decks] = await Promise.all(['CARDS.json', 'DECKS.json'].map(async f => {
    const r = await fetch(f);
    if (!r.ok) throw Error('Unable to load ' + f);
    return r.json();
  }));
  setup();
} catch (e) {
  root.textContent = e.message;
  console.error(e);
}
