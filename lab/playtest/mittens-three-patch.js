import { Game } from './engine.js?v=rulebreakers-1';

// LAB ONLY: Mittens III permanently grows while it remains in play by eating
// Stash cards or the Cats buried under Shoeboxes of Dead Cats.
const MITTENS = 'LAB-CAT-020';
const SHOEBOX = 'LAB-CAT-017';

function boxesFor(game, p) {
  return game.players[p].board.filter(x => x.id === SHOEBOX);
}

function buriedCount(game, p) {
  return boxesFor(game, p).reduce((n, box) => n + (box.cargo?.length || 0), 0);
}

const originalPower = Game.prototype.power;
Game.prototype.power = function(x) {
  const value = originalPower.call(this, x);
  if (!x || x.id !== MITTENS) return value;
  return value + (x.mittensPermanentPower || 0);
};

const originalCanUse = Game.prototype.canUse;
Game.prototype.canUse = function(x) {
  if (!x || x.id !== MITTENS) return originalCanUse.call(this, x);
  if (!this.canActivate(x) || x.owner !== this.turn) return false;
  return this.players[x.owner].stash.length > 0 || buriedCount(this, x.owner) > 0;
};

function removeReadyStash(game, p) {
  const s = game.players[p];
  if (!s.stash.length || s.fuel <= 0) return false;

  // The face-up temporary Stash is fair game if it is still present and Ready.
  // Otherwise remove an arbitrary normal face-down Stash card; printed identity
  // does not matter while it is in Stash.
  let index = -1;
  if (s.tempStashCard) index = s.stash.lastIndexOf(s.tempStashCard);
  if (index < 0) index = s.stash.length - 1;

  const [id] = s.stash.splice(index, 1);
  s.fuel = Math.max(0, s.fuel - 1);
  if (s.tempStashCard === id) s.tempStashCard = null;
  s.discard.push(id);
  return true;
}

function removeRotatedStash(game, p) {
  const s = game.players[p];
  if (s.stash.length <= s.fuel) return false;

  // The engine tracks Ready Stash as a count rather than per-card state. A
  // Rotated Stash card must be normal Stash because unspent temporary Stash is
  // treated as Ready. Remove a normal card while leaving fuel unchanged.
  let index = s.stash.findIndex(id => id !== s.tempStashCard);
  if (index < 0) index = 0;
  const [id] = s.stash.splice(index, 1);
  s.discard.push(id);
  s.fuel = Math.min(s.fuel, s.stash.length);
  return true;
}

async function eatOneStash(game, p) {
  const s = game.players[p];
  const ready = s.fuel;
  const rotated = Math.max(0, s.stash.length - s.fuel);
  if (!ready && !rotated) return false;

  let state;
  if (ready && rotated) {
    state = await game.choose(p, 'YUMMY!: choose a Stash card to discard', [
      { label: `Rotated Stash (${rotated})`, value: 'rotated' },
      { label: `Ready Stash (${ready})`, value: 'ready' }
    ]);
  } else {
    state = rotated ? 'rotated' : 'ready';
  }

  if (state === 'rotated') return removeRotatedStash(game, p);
  if (state === 'ready') return removeReadyStash(game, p);
  return false;
}

const originalActivate = Game.prototype.activate;
Game.prototype.activate = async function(uid, mode = null) {
  const x = this.obj(uid);
  if (!x || x.id !== MITTENS) return originalActivate.call(this, uid, mode);

  const p = this.turn;
  if (x.owner !== p || !this.canActivate(x)) return;

  const options = [];
  if (this.players[p].stash.length) {
    options.push({ label: 'YUMMY! — discard 1 Stash for +1 Power', value: 'stash' });
  }
  const buried = buriedCount(this, p);
  if (buried) {
    options.push({ label: `WHERE DID YOU GET THAT?! — discard ${buried} buried Cat${buried === 1 ? '' : 's'} for +${buried} Power`, value: 'shoebox' });
  }
  if (!options.length) return;

  const choice = mode || (options.length === 1
    ? options[0].value
    : await this.choose(p, 'Mittens III: choose an ability', options));
  if (!choice) return;

  if (choice === 'stash') {
    const ate = await eatOneStash(this, p);
    if (!ate) return;
    x.ready = false;
    x.mittensPermanentPower = (x.mittensPermanentPower || 0) + 1;
    this.say(`Mittens III says YUMMY! and permanently gets +1 Power`);
    return;
  }

  if (choice === 'shoebox') {
    const boxes = boxesFor(this, p);
    const count = boxes.reduce((n, box) => n + (box.cargo?.length || 0), 0);
    if (!count) return;

    x.ready = false;
    for (const box of boxes) {
      if (!box.cargo?.length) continue;
      this.players[p].discard.push(...box.cargo);
      box.cargo = [];
    }
    x.mittensPermanentPower = (x.mittensPermanentPower || 0) + count;
    this.say(`WHERE DID YOU GET THAT?! Mittens III eats ${count} buried Cat${count === 1 ? '' : 's'} and permanently gets +${count} Power`);
  }
};
