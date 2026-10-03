// LAB ONLY: Hold My Beer tempo rewrite for Florida Man testing.
import { Game } from './engine.js?v=rulebreakers-1';

const HOLD_ID='P019';
const HOLD_TEXT='Choose one of your Characters. If it entered play this Turn, it gains Hothead this Turn. If it attacked this Turn, Ready it. It can’t Attack again this Turn. If it has the Daredevil Trait, you may deal 1 damage to it.';

// Change only the LAB-visible card text/cost. Canonical CARDS.json remains untouched.
const baseCard=Game.prototype.card;
Game.prototype.card=function(x){
  const card=baseCard.call(this,x);
  if(card?.id!==HOLD_ID) return card;
  return {...card,cost:2,text:HOLD_TEXT,status:'lab'};
};

// The base engine allows some Ready effects to enable another Attack, so Hold My Beer
// marks its readied Character as specifically unable to Attack again this Turn.
const baseCanAttack=Game.prototype.canAttack;
Game.prototype.canAttack=function(x){
  if(x?.holdMyBeerNoAttack) return false;
  return baseCanAttack.call(this,x);
};

const baseStartTurn=Game.prototype.startTurn;
Game.prototype.startTurn=function(...args){
  for(const x of this.chars(this.turn)) x.holdMyBeerNoAttack=false;
  return baseStartTurn.apply(this,args);
};

// Replace the old +Power action effect with the new tempo effect.
const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  if(id!==HOLD_ID) return baseActionEffect.call(this,p,id,target,second,previous);
  const x=this.obj(target);
  if(!x) return;

  if(x.born===this.round){
    x.hot=true;
    this.say(`${this.card(x).name} gets Hothead this Turn`);
  }

  if(x.attacked){
    x.ready=true;
    x.holdMyBeerNoAttack=true;
    this.say(`${this.card(x).name} Readies, but cannot Attack again this Turn`);
  }

  if(this.trait(x,'Daredevil')){
    const yes=await this.choose(p,'Hold My Beer: deal 1 damage to this Daredevil?',[{label:'Yes',value:true},{label:'No',value:false}]);
    if(yes && this.obj(target)) await this.damage(this.obj(target),1);
  }
};
