// STANK INDUSTRIES LAB ONLY — Birthday Party Magician experiment.
// Adds 2x Ethan’s JUST Being Dramatic as a cheap friendly-Return enabler.
import {Game} from './engine.js?v=rulebreakers-1';

const CARD_ID='LAB-MAG-002';
const CARD={
  id:CARD_ID,
  type:'Action',
  cost:1,
  name:'Ethan’s JUST Being Dramatic',
  text:'Return one of your Characters to your hand.',
  style:'Misdirection',
  complexity:'simple',
  keywords:[],
  audit_identity:['Human'],
  status:'lab',
  flavor:'He does this all the time.'
};

// Patch only the LAB browser data. Canonical CARDS.json / DECKS.json stay untouched.
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
      if(isCards&&Array.isArray(data.cards)&&!data.cards.some(c=>c.id===CARD_ID))data.cards.push({...CARD});
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards){
          // Keep the experimental deck at 40: swap the two Wrong Address slots.
          const replace=Math.min(2,magician.cards.P082||0);
          if(replace){
            magician.cards.P082-=replace;
            if(magician.cards.P082<=0)delete magician.cards.P082;
            magician.cards[CARD_ID]=(magician.cards[CARD_ID]||0)+replace;
          }
        }
      }
      return data;
    }
  };
};

const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  if(id!==CARD_ID)return baseActionEffect.call(this,p,id,target,second,previous);
  const choices=this.chars(p);
  if(!choices.length)return;
  const uid=await this.pick('Ethan’s JUST Being Dramatic: Return one of your Characters',p,choices);
  if(uid!=null){
    const character=this.obj(uid);
    if(character)await this.remove(character,'hand');
  }
};
