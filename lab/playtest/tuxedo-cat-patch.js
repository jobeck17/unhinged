// LAB-only Tuxedo Cat behavior patch.
// Tuxedo Cat can protect the colony whenever it is in play, even if it is not Ready.
import {Game} from './engine.js?v=rulebreakers-1';

const baseAttack = Game.prototype.attack;
Game.prototype.attack = async function(uid){
  const attacker = this.obj(uid);
  if(!attacker) return baseAttack.call(this,uid);

  const defender = 1-attacker.owner;
  const tuxedos = this.chars(defender).filter(x=>x.id==='LAB-CAT-003' && !x.cloaked);

  // The base engine only allows Ready Bodyguards to block Leader attacks. For
  // this lab test, temporarily mark Tuxedo Cat Ready during attack resolution,
  // then restore its prior Ready state if it survives and did not actually block.
  const prior = tuxedos.map(x=>({uid:x.uid,ready:x.ready}));
  for(const x of tuxedos) x.ready=true;

  try {
    return await baseAttack.call(this,uid);
  } finally {
    for(const state of prior){
      const x=this.obj(state.uid);
      if(x && state.ready===false && x.ready===true) x.ready=false;
    }
  }
};
