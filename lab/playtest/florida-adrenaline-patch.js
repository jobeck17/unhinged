// LAB-ONLY Florida Man passive experiment for the no-retaliation test.
// Replaces Florida Man's current damaged-Character Hothead / Sucker Punch /
// combat-Ready package with "Ooh, That's Gonna Leave a Mark!" Canonical files are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

LEADERS['Florida Man'].passive =
  "Ooh, That's Gonna Leave a Mark!: The first time each of your Characters is dealt damage and survives, it gets +2 Power, or +3 Power if it has the Daredevil Trait. At the start of your Turn, reduce that Character's Power by 1 until it has 1 Power. This ability can't trigger again for that Character.";

// Adrenaline is a one-time arc for each Character. The modifier starts positive,
// then can tick through 0 and into the negatives until that Character would have
// 1 Power from its own card/effects. Other continuous bonuses, such as a running
// Broken Lawnmower, are layered afterward and can still raise it above 1.
const basePower = Game.prototype.power;
Game.prototype.power = function(x){
  const value=basePower.call(this,x)+(x?.battleHigh||0);
  return x?.battleHighTriggered ? Math.max(1,value) : Math.max(0,value);
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
  if(x.battleHighTriggered) return;
  if(x.damage<=beforeDamage || x.damage>=game.guard(x)) return;
  const bonus=game.trait(x,'Daredevil')?3:2;
  x.battleHighTriggered=true;
  x.battleHigh=bonus;
  game.say(`${game.card(x).name}: Ooh, That's Gonna Leave a Mark! +${bonus} Power`);
}

// Any damage can trigger the one-time boost, including combat damage and self-damage.
// Once a Character has triggered it, later damage never refreshes the bonus.
const baseDamage = Game.prototype.damage;
Game.prototype.damage = async function(x,n,defer=false){
  const before=x?.damage||0;
  await baseDamage.call(this,x,n,defer);
  triggerBattleHigh(this,x,before);
};

async function decayBattleHigh(game,p){
  if(game.name(p)!=='Florida Man') return;
  for(const x of game.chars(p)){
    if(!x.battleHighTriggered) continue;
    const ownPowerWithoutAdrenaline=basePower.call(game,x);
    const current=ownPowerWithoutAdrenaline+(x.battleHigh||0);
    if(current>1){
      x.battleHigh=(x.battleHigh||0)-1;
      const next=Math.max(1,ownPowerWithoutAdrenaline+x.battleHigh);
      game.say(`${game.card(x).name}'s adrenaline drops it to ${next} Power`);
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
