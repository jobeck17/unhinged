// LAB-ONLY Florida Man passive experiment for the no-retaliation test.
// Replaces Florida Man's current damaged-Character Hothead / Sucker Punch /
// combat-Ready package with attack-driven Adrenaline. Canonical files are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

LEADERS['Florida Man'].passive =
  'Your Characters have Adrenaline. Adrenaline — After this Character attacks, it gets +1 Power and -2 Guard.';

// Adrenaline's Power/Guard changes persist for as long as the Character stays in play.
// Keep them separate from x.power/x.guard because the base engine clears those
// temporary fields at the end of each Turn.
const basePower = Game.prototype.power;
Game.prototype.power = function(x){
  return Math.max(0, basePower.call(this,x) + (x?.adrenalinePower || 0));
};

const baseGuard = Game.prototype.guard;
Game.prototype.guard = function(x){
  return baseGuard.call(this,x) + (x?.adrenalineGuard || 0);
};

// Remove the old Florida Man Ready-on-surviving-combat clause.
const baseLeaderPassive = Game.prototype.leaderPassive;
Game.prototype.leaderPassive = async function(p,event,context={}){
  if(this.name(p)==='Florida Man' && event==='survivedCombat') return 0;
  return baseLeaderPassive.call(this,p,event,context);
};

// Remove the old "damaged Characters have Hothead" part of Florida Man.
// Printed Hothead and the Wrestler Hothead support still work normally.
Game.prototype.canAttack = function(x){
  if(!x || x.cloaked || !x.ready || this.has(x,'P135')) return false;
  const wrestlerHot = this.chars(x.owner).some(y=>y.uid!==x.uid && this.has(y,'P165') && this.trait(x,'Wrestler'));
  const hot = this.layers(x).some(id=>this.card(id).keywords.includes('Hothead')) || x.hot || wrestlerHot;
  const blocked = this.players.flatMap(s=>s.board).some(y=>y.uid!==x.uid && y.ready && !y.cloaked && this.has(y,'P135'));
  return x.born<this.round || hot&&!blocked;
};

// The base attack method still contains Florida Man's old damaged-Character
// Sucker Punch exception. Track the attacker so the pick wrapper can remove only
// that Leader-granted access while keeping printed Sucker Punch and Bodyguard.
const baseAttack = Game.prototype.attack;
Game.prototype.attack = async function(uid){
  const attacker = this.obj(uid);
  const owner = attacker?.owner;
  const wasReady = !!attacker?.ready;
  const previous = this._labFloridaAttackUid;
  this._labFloridaAttackUid = uid;
  try{
    const result = await baseAttack.call(this,uid);
    const survivor = this.obj(uid);
    // A legal attack Rotates the attacker. If target selection was cancelled,
    // it remains Ready and Adrenaline does not fire. Re-Readied Characters can
    // trigger Adrenaline again if they attack again later in the Turn.
    if(wasReady && survivor && survivor.owner===owner && !survivor.ready && this.name(owner)==='Florida Man'){
      survivor.adrenalinePower=(survivor.adrenalinePower||0)+1;
      survivor.adrenalineGuard=(survivor.adrenalineGuard||0)-2;
      this.say(`${this.card(survivor).name} Adrenaline: +1 Power / -2 Guard`);
      await this.checkDefeat(survivor);
      this.checkEnd();
      this.update?.();
    }
    return result;
  }finally{
    this._labFloridaAttackUid = previous;
  }
};

const basePick = Game.prototype.pick;
Game.prototype.pick = function(title,p,targets,optional=false){
  if(title==='Attack which target?' && this._labFloridaAttackUid){
    const a = this.obj(this._labFloridaAttackUid);
    const printedSucker = a && this.layers(a).some(id=>this.card(id).keywords.includes('Sucker Punch'));
    if(a && a.owner===p && this.name(p)==='Florida Man' && a.damage>0 && !printedSucker){
      targets = targets.filter(t=>t===-1 || (t && (!t.ready || this.layers(t).some(id=>this.card(id).keywords.includes('Bodyguard')))));
    }
  }
  return basePick.call(this,title,p,targets,optional);
};

// Keep the LAB engine aligned with Vape Kid's current printed self-damage text.
const baseEnterEffect = Game.prototype.enterEffect;
Game.prototype.enterEffect = async function(x,previous){
  if(x?.id==='P017'){
    const p=x.owner;
    const yes=await this.choose(p,'Vape Kid: take 1 damage to rummage?',[{label:'Yes',value:true},{label:'No',value:false}]);
    if(yes){
      await this.damage(x,1);
      if(this.obj(x.uid)) await this.rummage(p);
    }
    return;
  }
  return baseEnterEffect.call(this,x,previous);
};
