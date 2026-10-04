import { Game } from './engine.js?v=rulebreakers-1';

// LAB ONLY: expose the active Game instance so the Shoebox/Hairball UI badges
// can read live board state in bot play as well as local two-player.
const originalBegin = Game.prototype.begin;
Game.prototype.begin = function(...args) {
  if (typeof window !== 'undefined') window.game = this;
  return originalBegin.apply(this, args);
};

function boxesFor(game, p) {
  return game.players[p].board.filter(y => y.id === 'LAB-CAT-017');
}

async function chooseBox(game, p, boxes) {
  let box = boxes[0];
  if (boxes.length > 1) {
    const chosen = await game.choose(
      p,
      'Choose a Shoebox',
      boxes.map((b, i) => ({ label: `Shoebox ${i + 1} · ${b.cargo?.length || 0} buried`, value: b.uid }))
    );
    box = game.obj(chosen) || box;
  }
  return box;
}

function findNewDiscardIndex(discard, cardId, start = 0) {
  for (let i = discard.length - 1; i >= start; i--) {
    if (discard[i] === cardId) return i;
  }
  return -1;
}

function buryFromDiscard(game, p, box, cardId, start, message) {
  const discard = game.players[p].discard;
  const idx = findNewDiscardIndex(discard, cardId, start);
  if (idx < 0 || !game.obj(box.uid)) return false;
  const [id] = discard.splice(idx, 1);
  box.cargo ||= [];
  box.cargo.push(id);
  const total = boxesFor(game, p).reduce((n, b) => n + (b.cargo?.length || 0), 0);
  game.say(`${message} (${total} total)`);
  return true;
}

// Dismissed Cats may be buried instead of staying in discard.
const originalDismiss = Game.prototype.dismiss;
Game.prototype.dismiss = async function(x) {
  if (!x || !this.obj(x.uid)) return;

  const card = this.card(x);
  const p = x.owner;
  const boxes = boxesFor(this, p);
  const canBury = card.type === 'Character' && this.trait(x, 'Cat') && boxes.length > 0;

  if (!canBury) return originalDismiss.call(this, x);

  const use = await this.choose(
    p,
    `Shoebox of Dead Cats: put ${card.name} face down under a Shoebox instead?`,
    [{ label: 'Put it in the Shoebox', value: true }, { label: 'Send it to discard', value: false }]
  );

  if (!use) return originalDismiss.call(this, x);

  const box = await chooseBox(this, p, boxes);
  const before = this.players[p].discard.length;
  await originalDismiss.call(this, x);
  buryFromDiscard(this, p, box, card.id, before, 'Shoebox of Dead Cats buries a Cat face down');
};

// Non-combat Defeats use remove(..., defeated=true), so catch those here.
const originalRemove = Game.prototype.remove;
Game.prototype.remove = async function(x, where = 'discard', defeated = false) {
  if (!defeated || !x || !this.obj(x.uid)) {
    return originalRemove.call(this, x, where, defeated);
  }

  const card = this.card(x);
  const p = x.owner;
  const boxes = boxesFor(this, p);
  const canBury = where === 'discard' && card.type === 'Character' && this.trait(x, 'Cat') && boxes.length > 0;
  if (!canBury) return originalRemove.call(this, x, where, defeated);

  const use = await this.choose(
    p,
    `Shoebox of Dead Cats: put defeated ${card.name} face down under a Shoebox instead?`,
    [{ label: 'Put it in the Shoebox', value: true }, { label: 'Send it to discard', value: false }]
  );
  if (!use) return originalRemove.call(this, x, where, defeated);

  const box = await chooseBox(this, p, boxes);
  const before = this.players[p].discard.length;
  await originalRemove.call(this, x, where, defeated);
  buryFromDiscard(this, p, box, card.id, before, 'Shoebox of Dead Cats buries a defeated Cat face down');
};

// IMPORTANT: the engine's simultaneous combat path removes defeated Characters
// with remove(..., defeated=false), then runs Defeat triggers separately. That
// means the defeated=true hook above cannot see combat deaths. Track Cats that
// enter combat, let normal combat and Defeat triggers fully resolve, then offer
// to bury any of those Cats that actually died.
const originalCombatDamage = Game.prototype.combatDamage;
Game.prototype.combatDamage = async function(entries) {
  const candidates = new Map();
  const discardStarts = new Map();

  for (const entry of entries || []) {
    const x = entry?.[0];
    if (!x || candidates.has(x.uid) || !this.obj(x.uid)) continue;
    const card = this.card(x);
    const p = x.owner;
    if (card?.type === 'Character' && this.trait(x, 'Cat') && boxesFor(this, p).length) {
      candidates.set(x.uid, { uid: x.uid, owner: p, cardId: card.id, name: card.name });
      if (!discardStarts.has(p)) discardStarts.set(p, this.players[p].discard.length);
    }
  }

  const result = await originalCombatDamage.call(this, entries);

  for (const dead of candidates.values()) {
    if (this.obj(dead.uid)) continue;

    const boxes = boxesFor(this, dead.owner);
    if (!boxes.length) continue;

    const discard = this.players[dead.owner].discard;
    const start = discardStarts.get(dead.owner) ?? 0;
    const idx = findNewDiscardIndex(discard, dead.cardId, start);
    if (idx < 0) continue;

    const use = await this.choose(
      dead.owner,
      `Shoebox of Dead Cats: put defeated ${dead.name} face down under a Shoebox instead?`,
      [{ label: 'Put it in the Shoebox', value: true }, { label: 'Send it to discard', value: false }]
    );
    if (!use) continue;

    const box = await chooseBox(this, dead.owner, boxes);
    buryFromDiscard(this, dead.owner, box, dead.cardId, start, 'Shoebox of Dead Cats buries a combat casualty face down');
  }

  return result;
};

// Global threshold does not stack with multiple Shoeboxes: once the player has
// three buried Cats total, every Cat they control gets +1 Power.
const originalPower = Game.prototype.power;
Game.prototype.power = function(x) {
  let value = originalPower.call(this, x);
  if (!x || !this.obj(x.uid) || !this.trait(x, 'Cat')) return value;
  const buried = boxesFor(this, x.owner).reduce((n, box) => n + (box.cargo?.length || 0), 0);
  return value + (buried >= 3 ? 1 : 0);
};

// Shovel randomly digs up one of all face-down Cats under your Shoeboxes.
// The Cat returns normally: full printed Guard, no Hothead, and normal enters-play effects.
const originalActionEffect = Game.prototype.actionEffect;
Game.prototype.actionEffect = async function(p, id, target, second, previous) {
  if (id === 'LAB-CAT-018') {
    const buried = [];
    for (const box of boxesFor(this, p)) {
      for (let i = 0; i < (box.cargo?.length || 0); i++) {
        buried.push({ boxUid: box.uid, index: i, cardId: box.cargo[i] });
      }
    }

    if (!buried.length) {
      this.say('Shovel digs around but finds no buried Cats');
      return;
    }

    const pick = buried[Math.floor(Math.random() * buried.length)];
    const box = this.obj(pick.boxUid);
    if (!box?.cargo?.length) return;

    const [cardId] = box.cargo.splice(pick.index, 1);
    const cat = this.enter(p, cardId);
    this.say(`Shovel digs up ${this.card(cardId).name}`);
    await this.enterEffect(cat, previous || []);
    return;
  }

  if (id === 'LAB-CAT-019') {
    this.say('Nine Lives, Zero Survivors wipes the board');

    // Defeat every Character that is still in play. Defeat triggers resolve normally.
    const characterUids = this.players.flatMap(s => s.board)
      .filter(x => this.card(x).type === 'Character')
      .map(x => x.uid);
    for (const uid of characterUids) {
      const x = this.obj(uid);
      if (x) {
        this.say(`${this.card(x).name} is Defeated`);
        await this.remove(x, 'discard', true);
      }
    }

    // Dismiss every Item still in play. Shoebox cargo is discarded by normal removal.
    const itemUids = this.players.flatMap(s => s.board)
      .filter(x => this.card(x).type === 'Item')
      .map(x => x.uid);
    for (const uid of itemUids) {
      const x = this.obj(uid);
      if (x) await originalDismiss.call(this, x);
    }

    // Refill both hands to seven; players already at seven or more keep their hands.
    for (let player = 0; player < 2; player++) {
      while (this.players[player].hand.length < 7 && this.players[player].deck.length && this.winner === null) {
        this.draw(player, 1, false);
      }
    }
    this.say('Both players draw back to 7 cards');
    this.checkEnd();
    return;
  }

  return originalActionEffect.call(this, p, id, target, second, previous);
};
