// STANK INDUSTRIES LAB ONLY — Dove.
// 2 copies replace the remaining 2x Tech Bro in Birthday Party Magician.
// Dove is another signature Hat animal and rewards enter/leave loops by shaving opposing Guard.
import {Game} from './engine.js?v=rulebreakers-1';

const DOVE_ID='LAB-MAG-006';
const CARD={
  id:DOVE_ID,
  type:'Character',
  cost:2,
  name:'Dove',
  traits:['Animal'],
  text:'When this enters or leaves play, you may choose an opposing Character. It gets -1 Guard permanently.',
  style:'Misdirection',
  complexity:'mixed',
  keywords:[],
  power:2,
  guard:1,
  audit_identity:['Animal'],
  status:'lab',
  flavor:''
};

const originalFetch=globalThis.fetch.bind(globalThis);
globalThis.fetch=async function(input,init){
  const url=typeof input==='string'?input:String(input?.url||'');
  const response=await originalFetch(input,init);
  const isCards=url.startsWith('../CARDS.json');
  const isDecks=url.startsWith('../DECKS.json');
  if(!isCards&&!isDecks)return response;
  return {
    ok:response.ok,
    status:response.status,
    async json(){
      const data=await response.json();
      if(isCards&&Array.isArray(data.cards)&&!data.cards.some(c=>c.id===DOVE_ID))data.cards.push({...CARD});
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards){
          const replace=Math.min(2,magician.cards.P070||0);
          if(replace){
            magician.cards.P070-=replace;
            if(magician.cards.P070<=0)delete magician.cards.P070;
            magician.cards[DOVE_ID]=(magician.cards[DOVE_ID]||0)+replace;
          }
        }
      }
      return data;
    }
  };
};

const baseGuard=Game.prototype.guard;
Game.prototype.guard=function(x){
  return Math.max(0,baseGuard.call(this,x)-(x?.doveGuardLoss||0));
};

async function doveTrick(game,p,reason){
  const opp=1-p;
  const choices=game.chars(opp);
  if(!choices.length)return;
  const uid=await game.pick(`Dove ${reason}: choose an opposing Character to get -1 permanent Guard`,p,choices,true);
  if(uid==null)return;
  const target=game.obj(uid);
  if(!target)return;
  target.doveGuardLoss=(target.doveGuardLoss||0)+1;
  game.say(`Dove gives ${game.card(target).name} -1 permanent Guard`);
  await game.checkDefeat(target);
}

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  const result=await baseEnterEffect.call(this,x,previous);
  if(x?.id===DOVE_ID&&this.obj(x.uid))await doveTrick(this,x.owner,'enters play');
  return result;
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  const isDove=x?.id===DOVE_ID&&!!this.obj(x.uid);
  const p=x?.owner;
  const uid=x?.uid;
  const result=await baseRemove.call(this,x,where,defeated);
  if(isDove&&!this.obj(uid))await doveTrick(this,p,'leaves play');
  return result;
};
