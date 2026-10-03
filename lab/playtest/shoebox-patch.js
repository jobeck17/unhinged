import { Game } from './engine.js?v=rulebreakers-1';

// LAB ONLY: Shoebox of Dead Cats stores Dismissed Cats face down.
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

  // If more than one Shoebox is in play, choose which physical pile gets it.
  let box = boxes[0];
  if (boxes.length > 1) {
    const chosen = await this.choose(
      p,
      'Choose a Shoebox',
      boxes.map((b, i) => ({ label: `Shoebox ${i + 1} · ${b.cargo?.length || 0} buried`, value: b.uid }))
    );
    box = this.obj(chosen) || box;
  }

  // Let the normal Dismiss resolution handle attached cards and board cleanup,
  // then move the dismissed Cat from discard into the hidden Shoebox pile.
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
