// LAB-only Trojan Cat behavior patch.
// Keeps experimental Crazy Cat Lady behavior out of the canonical web playtest.
import {Game} from './engine.js?v=rulebreakers-1';

const baseDefeatEffect = Game.prototype.defeatEffect;
Game.prototype.defeatEffect = async function(id,x,p,lower){
  await baseDefeatEffect.call(this,id,x,p,lower);
  if(id !== 'LAB-CAT-014') return;

  this.say('Trojan Cat explodes: every other Character takes 1 damage');

  // Trojan Cat has already left play when its Defeat effect resolves. Snapshot
  // all remaining Characters, deal the damage simultaneously, then resolve
  // resulting Defeats through the normal engine path so death effects can chain.
  const targets = this.players.flatMap((s,owner)=>
    s.board.filter(y=>this.card(y).type==='Character' && !y.cloaked)
      .map(y=>({y,owner}))
  );

  for(const {y} of targets){
    if(this.obj(y.uid)){
      y.damage += 1;
      this.say(`${this.card(y).name} takes 1 damage from Trojan Cat`);
    }
  }

  const casualties = targets
    .map(({y})=>y)
    .filter(y=>this.obj(y.uid) && y.damage >= this.guard(y));

  for(const y of casualties){
    if(this.obj(y.uid)) await this.checkDefeat(y);
  }
};
