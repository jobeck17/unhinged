// LAB-ONLY Florida Man passive experiment for the no-retaliation test.
// Replaces Florida Man's current damaged-Character Hothead / Sucker Punch /
// combat-Ready package with Adrenaline. Canonical files are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

LEADERS['Florida Man'].passive =
  'Adrenaline: When one of your Characters damages itself with its own ability, it gains Adrenaline. At the start of your Turn, each Character with Adrenaline gets +1 Power and -2 Guard.';

// Persistent Adrenaline modifiers live outside the engine's temporary x.power/x.guard
// fields, because those temporary fields reset at the end of each Turn.
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
// This mirrors the current engine canAttack logic, minus the Florida exception.
Game.prototype.canAttack = function(x){
  if(!x || x.cloaked || !x.ready || this.has(x,'P135')) return false;
  const wrestlerHot = this.chars(x.owner).some(y=>y.uid!==x.uid && this.has(y,'P165') && this.trait(x,'Wrestler'));
  const hot = this.layers(x).some(id=>this.card(id).keywords.includes('Hothead')) || x.hot || wrestlerHot;
  const blocked = this.players.flatMap(s=>s.board).some(y=>y.uid!==x.uid && y.ready && !y.cloaked && this.has(y,'P135'));
  return x.born<this.round || hot&&!blocked;
};

// The base attack method still contains Florida Man's old damaged-Character
// Sucker Punch exception. Track the current attacker and filter only that extra
// target access back out; printed Sucker Punch and Bodyguard continue to work.
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

// Arm Adrenaline only when Gas Station Daredevil actually chooses its own
// self-damage ability. The damage wrapper below confirms damage was dealt.
const baseChoose = Game.prototype.choose;
Game.prototype.choose = async function(p,title,options,optional=false){
  const result = await baseChoose.call(this,p,title,options,optional);
  if(result===true && title==='Daredevil: take 1 damage for +2 Power?' && this._labFloridaAttackUid){
    const a = this.obj(this._labFloridaAttackUid);
    if(a && a.owner===p && this.name(p)==='Florida Man' && this.has(a,'P002')){
      this._labAdrenalinePendingUid = a.uid;
    }
  }
  return result;
};

function grantAdrenaline(game,x){
  if(!x || !game.obj(x.uid) || x.adrenaline) return;
  x.adrenaline = true;
  x.adrenalinePower = x.adrenalinePower || 0;
  x.adrenalineGuard = x.adrenalineGuard || 0;
  game.say(`${game.card(x).name} gains Adrenaline`);
}

const baseDamage = Game.prototype.damage;
Game.prototype.damage = async function(x,n,defer=false){
  const pending = !!x && x.uid===this._labAdrenalinePendingUid;
  const before = x?.damage || 0;
  try{
    await baseDamage.call(this,x,n,defer);
    if(pending && x && this.obj(x.uid) && x.damage>before && this.name(x.owner)==='Florida Man'){
      grantAdrenaline(this,x);
    }
  }finally{
    if(pending) this._labAdrenalinePendingUid = null;
  }
};

// The LAB engine had an older Vape Kid implementation that damaged the Leader,
// while the current printed card damages itself. Match the current card here so
// this self-damage Character can participate in the Adrenaline test.
const baseEnterEffect = Game.prototype.enterEffect;
Game.prototype.enterEffect = async function(x,previous){
  if(x?.id==='P017'){
    const p=x.owner;
    const yes=await this.choose(p,'Vape Kid: take 1 damage to rummage?',[{label:'Yes',value:true},{label:'No',value:false}]);
    if(yes){
      if(this.name(p)==='Florida Man') this._labAdrenalinePendingUid=x.uid;
      await this.damage(x,1);
      await this.rummage(p);
    }
    return;
  }
  return baseEnterEffect.call(this,x,previous);
};

async function applyAdrenaline(game,p){
  if(game.name(p)!=='Florida Man') return;
  for(const x of [...game.chars(p)]){
    if(!x.adrenaline || !game.obj(x.uid)) continue;
    x.adrenalinePower=(x.adrenalinePower||0)+1;
    x.adrenalineGuard=(x.adrenalineGuard||0)-2;
    game.say(`${game.card(x).name} Adrenaline: +1 Power / -2 Guard`);
    await game.checkDefeat(x);
  }
}

// endRound is async and hands control to the next player only after the engine's
// startTurn work has run. Apply Adrenaline immediately afterward, before that
// player can take an action.
const baseEndRound = Game.prototype.endRound;
Game.prototype.endRound = async function(...args){
  await baseEndRound.apply(this,args);
  if(this.winner!==null) return;
  await applyAdrenaline(this,this.turn);
  this.checkEnd();
  this.update?.();
};
