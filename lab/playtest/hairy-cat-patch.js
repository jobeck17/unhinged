// LAB-only Hairy Cat prototype behavior.
// When Hairy Cat is damaged by an attacking Character and survives, the attacker
// gets a Hairball. A Hairball makes that Character miss its controller's next
// Ready step, then falls off. Multiple different attackers can each be Hairballed.
import {Game} from './engine.js?v=rulebreakers-1';

const baseCombatDamage = Game.prototype.combatDamage;
Game.prototype.combatDamage = async function(entries){
  const hairyHits = (entries || [])
    .filter(([target,,source]) => target?.id === 'LAB-CAT-016' && source === 'attack')
    .map(([target]) => target.uid);

  const result = await baseCombatDamage.call(this, entries);

  if(hairyHits.length && this.pendingAttack?.attacker){
    for(const hairyUid of hairyHits){
      if(!this.obj(hairyUid)) continue; // Hairy Cat must survive the hit.
      const attacker = this.obj(this.pendingAttack.attacker);
      if(attacker){
        attacker.hairball = true;
        this.say(`${this.card(attacker).name} gets a Hairball from Hairy Cat`);
      }
    }
  }
  return result;
};

const baseStartTurn = Game.prototype.startTurn;
Game.prototype.startTurn = function(){
  const p = this.turn;
  const hairballed = this.chars(p).filter(x => x.hairball).map(x => x.uid);
  baseStartTurn.call(this);
  for(const uid of hairballed){
    const x = this.obj(uid);
    if(!x) continue;
    x.ready = false;
    x.hairball = false;
    this.say(`${this.card(x).name} can't Ready because of its Hairball`);
  }
  this.update?.();
};
