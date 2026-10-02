import { Game } from './engine.js';

// LAB ONLY: Trojan Cat explodes when Defeated, damaging every other Character.
const originalDefeatEffect = Game.prototype.defeatEffect;
Game.prototype.defeatEffect = async function(id, x, p, lower) {
  if (id === 'LAB-CAT-014') {
    this.say('Trojan Cat explodes: every other Character takes 1 damage');
    const targets = this.players.flatMap(player => player.board)
      .filter(character => this.card(character).type === 'Character' && character.uid !== x.uid);
    // Deal the damage first so all Characters are hit simultaneously, then resolve Defeats.
    for (const target of targets) {
      if (this.obj(target.uid) && !target.cloaked) {
        target.damage += 1;
        this.say(`${this.card(target).name} takes 1 damage from Trojan Cat`);
      }
    }
    for (const target of targets) {
      if (this.obj(target.uid)) await this.checkDefeat(target);
    }
    return;
  }
  return originalDefeatEffect.call(this, id, x, p, lower);
};
