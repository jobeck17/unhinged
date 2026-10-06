// STANK INDUSTRIES LAB ONLY — Rabbit engine tuning + printed enter/leave draw trigger.
// In this LAB Rabbit is 2 Cost, 1/3 so the Magician can start doing tricks earlier.
import {Game} from './engine.js?v=rulebreakers-1';

const RABBIT_ID='P063';

const originalFetch=globalThis.fetch.bind(globalThis);
globalThis.fetch=async function(input,init){
  const url=typeof input==='string'?input:String(input?.url||'');
  const response=await originalFetch(input,init);
  if(!url.startsWith('../CARDS.json'))return response;
  return {
    ok:response.ok,
    status:response.status,
    async json(){
      const data=await response.json();
      const rabbit=Array.isArray(data.cards)?data.cards.find(c=>c.id===RABBIT_ID):null;
      if(rabbit){
        rabbit.cost=2;
        rabbit.power=1;
        rabbit.guard=3;
      }
      return data;
    }
  };
};

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
