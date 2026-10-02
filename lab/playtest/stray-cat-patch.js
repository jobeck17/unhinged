// LAB-only Stray Cat behavior.
// With the temporary no-retaliation test, Stray Cat runs away after it attacks:
// if it survives attack resolution, Dismiss it to its owner's discard pile.
import {Game} from './engine.js?v=rulebreakers-1';

const baseAttack = Game.prototype.attack;
Game.prototype.attack = async function(uid){
  const attacker = this.obj(uid);
  const isStray = attacker?.id === 'LAB-CAT-001';

  const result = await baseAttack.call(this, uid);

  if(isStray){
    const stray = this.obj(uid);
    if(stray){
      this.say('Stray Cat runs away after attacking');
      await this.dismiss(stray);
    }
  }
  return result;
};
