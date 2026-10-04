// LAB-only Three-Legged Cat prototype behavior.
// The first two times each copy is hit by an Attack, it survives regardless of damage.
// On the third Attack, combat damage is resolved normally. Non-Attack removal still works normally.
import {Game} from './engine.js?v=rulebreakers-1';

const baseGuard = Game.prototype.guard;
Game.prototype.guard = function(x){
  const g = baseGuard.call(this, x);
  if(x?.id === 'LAB-CAT-006' && x._threeLeggedProtected) return Math.max(g, 9999);
  return g;
};

const baseCombatDamage = Game.prototype.combatDamage;
Game.prototype.combatDamage = async function(entries){
  const protectedCats = [];
  for(const [target,,kind] of entries || []){
    if(kind !== 'attack' || target?.id !== 'LAB-CAT-006' || !this.obj(target.uid)) continue;
    target.threeLeggedAttackHits = (target.threeLeggedAttackHits || 0) + 1;
    if(target.threeLeggedAttackHits <= 2){
      target._threeLeggedProtected = true;
      protectedCats.push(target.uid);
    }
  }

  const result = await baseCombatDamage.call(this, entries);

  for(const uid of protectedCats){
    const cat = this.obj(uid);
    if(!cat) continue;
    cat.damage = 0;
    cat._threeLeggedProtected = false;
    const legsLeft = Math.max(0, 3 - (cat.threeLeggedAttackHits || 0));
    this.say(`I GOT 3 MORE ANYWAY — Three-Legged Cat survives. ${legsLeft} more leg${legsLeft === 1 ? '' : 's'}.`);
  }
  this.update?.();
  return result;
};
