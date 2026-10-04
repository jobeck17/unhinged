import { Game } from './engine.js?v=rulebreakers-1';

// LAB ONLY: Shoebox of Dead Cats stores Dismissed or Defeated Cats face down.
// Buried Cats are represented by the Shoebox object's cargo array so the UI
// naturally shows only a hidden-card count.
const originalDismiss = Game.prototype.dismiss;
Game.prototype.dismiss = async function(x) {
  if (!x || !this.obj(x.uid)) return;

  const card = this.card(x);
  const p = x.owner;
  const boxes = this.players[p].board.filter(y => y.id === 'LAB-CAT-017');
  const canBury = card.type === 'Character' && this.trait(x, 'Cat') && boxes.length > 0;

  if (!canBury) return originalDismiss.call(this, x);

  const use = await this.choose(
    p,
    `Shoebox of Dead Cats: put ${card.name} face down under a Shoebox instead?`,
    [{ label: 'Put it in the Shoebox', value: true }, { label: 'Send it to discard', value: false }]
  );

  if (!use) return originalDismiss.call(this, x);

  let box = boxes[0];
  if (boxes.length > 1) {
    const chosen = await this.choose(
      p,
      'Choose a Shoebox',
      boxes.map((b, i) => ({ label: `Shoebox ${i + 1} · ${b.cargo?.length || 0} buried`, value: b.uid }))
    );
    box = this.obj(chosen) || box;
  }

  const before = this.players[p].discard.length;
  await originalDismiss.call(this, x);
  const discard = this.players[p].discard;
  let idx = -1;
  for (let i = discard.length - 1; i >= before; i--) {
    if (discard[i] === card.id) { idx = i; break; }
  }
  if (idx < 0) idx = discard.lastIndexOf(card.id);
  if (idx >= 0 && this.obj(box.uid)) {
    const [id] = discard.splice(idx, 1);
    box.cargo ||= [];
    box.cargo.push(id);
    this.say(`Shoebox of Dead Cats buries a Cat face down (${this.players[p].board.filter(y => y.id === 'LAB-CAT-017').reduce((n, b) => n + (b.cargo?.length || 0), 0)} total)`);
  }
};

// Defeated Cats use the same Shoebox choice. This catches combat deaths,
// including a Cat that blocks an attack on its Leader and is Defeated.
const originalRemove = Game.prototype.remove;
Game.prototype.remove = async function(x, where = 'discard', defeated = false) {
  if (!defeated || !x || !this.obj(x.uid)) {
    return originalRemove.call(this, x, where, defeated);
  }

  const card = this.card(x);
  const p = x.owner;
  const boxes = this.players[p].board.filter(y => y.id === 'LAB-CAT-017');
  const canBury = where === 'discard' && card.type === 'Character' && this.trait(x, 'Cat') && boxes.length > 0;
  if (!canBury) return originalRemove.call(this, x, where, defeated);

  const use = await this.choose(
    p,
    `Shoebox of Dead Cats: put defeated ${card.name} face down under a Shoebox instead?`,
    [{ label: 'Put it in the Shoebox', value: true }, { label: 'Send it to discard', value: false }]
  );
  if (!use) return originalRemove.call(this, x, where, defeated);

  let box = boxes[0];
  if (boxes.length > 1) {
    const chosen = await this.choose(
      p,
      'Choose a Shoebox',
      boxes.map((b, i) => ({ label: `Shoebox ${i + 1} · ${b.cargo?.length || 0} buried`, value: b.uid }))
    );
    box = this.obj(chosen) || box;
  }

  const before = this.players[p].discard.length;
  await originalRemove.call(this, x, where, defeated);
  const discard = this.players[p].discard;
  let idx = -1;
  for (let i = discard.length - 1; i >= before; i--) {
    if (discard[i] === card.id) { idx = i; break; }
  }
  if (idx < 0) idx = discard.lastIndexOf(card.id);
  if (idx >= 0 && this.obj(box.uid)) {
    const [id] = discard.splice(idx, 1);
    box.cargo ||= [];
    box.cargo.push(id);
    this.say(`Shoebox of Dead Cats buries a defeated Cat face down (${this.players[p].board.filter(y => y.id === 'LAB-CAT-017').reduce((n, b) => n + (b.cargo?.length || 0), 0)} total)`);
  }
};

// Global threshold does not stack with multiple Shoeboxes: once the player has
// three buried Cats total, every Cat they control gets +1 Power.
const originalPower = Game.prototype.power;
Game.prototype.power = function(x) {
  let value = originalPower.call(this, x);
  if (!x || !this.obj(x.uid) || !this.trait(x, 'Cat')) return value;
  const buried = this.players[x.owner].board
    .filter(y => y.id === 'LAB-CAT-017')
    .reduce((n, box) => n + (box.cargo?.length || 0), 0);
  return value + (buried >= 3 ? 1 : 0);
};

// Shovel randomly digs up one of all face-down Cats under your Shoeboxes.
// The Cat returns normally: full printed Guard, no Hothead, and normal enters-play effects.
const originalActionEffect = Game.prototype.actionEffect;
Game.prototype.actionEffect = async function(p, id, target, second, previous) {
  if (id === 'LAB-CAT-018') {
    const buried = [];
    for (const box of this.players[p].board.filter(y => y.id === 'LAB-CAT-017')) {
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
