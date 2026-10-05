// STANK INDUSTRIES LAB ONLY — Do Not Look in the Hat.
// Replaces the 2x Burner Phone slots in Birthday Party Magician.
// Requires a Rotated Magician's Hat and turns a Rabbit/Dove in hand into a free play.
import {Game} from './engine.js?v=rulebreakers-1';

const CARD_ID='LAB-MAG-007';
const HAT_ID='LAB-MAG-005';
const RABBIT_ID='P063';
const DOVE_ID='LAB-MAG-006';
const CARD={
  id:CARD_ID,
  type:'Action',
  cost:1,
  name:'Do Not Look in the Hat',
  text:"Play a Rabbit or Dove from your hand for free. You may play this only if you control a Rotated Magician's Hat.",
  style:'Misdirection',
  complexity:'conditional',
  keywords:[],
  audit_identity:[],
  status:'lab',
  flavor:'No, seriously. Don’t.'
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
      if(isCards&&Array.isArray(data.cards)&&!data.cards.some(c=>c.id===CARD_ID))data.cards.push({...CARD});
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards){
          const replace=Math.min(2,magician.cards.P087||0);
          if(replace){
            magician.cards.P087-=replace;
            if(magician.cards.P087<=0)delete magician.cards.P087;
            magician.cards[CARD_ID]=(magician.cards[CARD_ID]||0)+replace;
          }
        }
      }
      return data;
    }
  };
};

const isAnimalId=id=>id===RABBIT_ID||id===DOVE_ID;
const hasRotatedHat=(game,p)=>game.players[p]?.board?.some(x=>x.id===HAT_ID&&!x.ready);

const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand?.[index];
  if(id!==CARD_ID)return baseCanPlay.call(this,index,p);
  if(!baseCanPlay.call(this,index,p))return false;
  return hasRotatedHat(this,p)&&this.players[p].hand.some((cid,i)=>i!==index&&isAnimalId(cid));
};

const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  if(id!==CARD_ID)return baseActionEffect.call(this,p,id,target,second,previous);
  if(!hasRotatedHat(this,p))return;
  const s=this.players[p];
  const index=await this.pickHand(p,'Do Not Look in the Hat: Play a Rabbit or Dove for free',c=>isAnimalId(c.id));
  if(index==null)return;
  const animalId=s.hand[index];
  if(!isAnimalId(animalId))return;
  await this.playCard(p,animalId,'hand',0,{index});
  this.say(`Do Not Look in the Hat produces ${this.card(animalId).name}`);
};
