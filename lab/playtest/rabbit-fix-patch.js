// STANK INDUSTRIES LAB ONLY — fix Rabbit's printed enter/leave draw trigger
// and remove the bogus Activate button the base browser exposes for Rabbit.
import {Game} from './engine.js?v=rulebreakers-1';

const RABBIT_ID='P063';

const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(x?.id===RABBIT_ID)return false;
  return baseCanUse.call(this,x);
};

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  const result=await baseEnterEffect.call(this,x,previous);
  if(x?.id===RABBIT_ID&&this.obj(x.uid)){
    this.draw(x.owner);
    this.say('Rabbit enters play and draws a card');
  }
  return result;
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  const isRabbit=!!x&&this.has(x,RABBIT_ID)&&!!this.obj(x.uid);
  const p=x?.owner;
  const uid=x?.uid;
  const baseAlreadyDrawsOnReturn=isRabbit&&where==='hand'&&!defeated;
  const result=await baseRemove.call(this,x,where,defeated);
  const actuallyLeft=isRabbit&&!this.obj(uid);
  if(actuallyLeft&&!baseAlreadyDrawsOnReturn){
    this.draw(p);
    this.say('Rabbit leaves play and draws a card');
  }
  return result;
};
