// LAB-ONLY Florida Man passive experiment for the no-retaliation test.
// Replaces Florida Man's current damaged-Character Hothead / Sucker Punch /
// combat-Ready package with "Ooh, That's Gonna Leave a Mark!" Canonical files are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

LEADERS['Florida Man'].passive =
  "Ooh, That's Gonna Leave a Mark!: When one of your Characters is dealt damage and survives, it gets +3 Power. At the start of your Turn, reduce that bonus by 1 until it reaches 0. When one of your Characters with no bonus from Ooh, That's Gonna Leave a Mark! is Defeated, Draw a card.";

// The temporary Power bonus is persistent while the Character remains in play
// and is tracked separately from x.power because the base engine clears x.power
// at the end of each Turn.
const basePower = Game.prototype.power;
Game.prototype.power = function(x){
  return Math.max(0, basePower.call(this,x) + (x?.battleHigh || 0));
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
  const previous = this._labFloridaAttackUid;
  this._labFloridaAttackUid = uid;
  try{
    return await baseAttack.call(this,uid);
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

function triggerBattleHigh(game,x,beforeDamage){
  if(!x || !game.obj(x.uid) || game.name(x.owner)!=='Florida Man') return;
  if(x.damage<=beforeDamage || x.damage>=game.guard(x)) return;
  x.battleHigh=3;
  game.say(`${game.card(x).name}: Ooh, That's Gonna Leave a Mark! +3 Power`);
}

// Any damage can trigger the bonus, including combat damage and self-damage.
// For deferred combat damage, the survival check is based on remaining Guard
// before combatDamage performs its defeat cleanup.
const baseDamage = Game.prototype.damage;
Game.prototype.damage = async function(x,n,defer=false){
  const before=x?.damage||0;
  await baseDamage.call(this,x,n,defer);
  triggerBattleHigh(this,x,before);
};

// Draw only when a Florida Man Character is actually Defeated while its temporary
// Power bonus is already 0. This includes normal defeat and Sacrifice, but not
// ordinary Dismiss/Return effects.
const baseRemove = Game.prototype.remove;
Game.prototype.remove = async function(x,where='discard',defeated=false){
  const wasCharacter=!!x && this.obj(x.uid) && this.card(x).type==='Character';
  const owner=x?.owner;
  const lethal=wasCharacter && x.damage>=this.guard(x);
  const countsAsDefeat=wasCharacter && (defeated || (where==='discard' && lethal));
  const drawCold=countsAsDefeat && this.name(owner)==='Florida Man' && (x.battleHigh||0)<=0;
  const result=await baseRemove.call(this,x,where,defeated);
  if(drawCold && !this.obj(x.uid) && this.winner===null){
    this.draw(owner,1,false);
    this.say("Ooh, That's Gonna Leave a Mark!: no bonus, so the Defeat draws a card");
  }
  return result;
};

async function decayBattleHigh(game,p){
  if(game.name(p)!=='Florida Man') return;
  for(const x of game.chars(p)){
    if((x.battleHigh||0)>0){
      x.battleHigh--;
      game.say(`${game.card(x).name}'s bonus drops to +${x.battleHigh} Power`);
    }
  }
}

// endRound hands control to the next player only after startTurn has run. Decay
// immediately afterward, before the new active player can take an action.
const baseEndRound = Game.prototype.endRound;
Game.prototype.endRound = async function(...args){
  await baseEndRound.apply(this,args);
  if(this.winner!==null) return;
  await decayBattleHigh(this,this.turn);
  this.checkEnd();
  this.update?.();
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
