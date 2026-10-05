// STANK INDUSTRIES LAB ONLY — Magician's Hat.
// 2 copies replace 2x Now You See Me in the Birthday Party Magician deck.
import {Game} from './engine.js?v=rulebreakers-1';

const HAT_ID='LAB-MAG-005';
const RABBIT_ID='P063';
const CARD={
  id:HAT_ID,
  type:'Item',
  cost:5,
  name:"Magician's Hat",
  stats:'',
  traits:[],
  text:'Activate — Return a Rabbit you control to your hand.',
  style:'Misdirection',
  keywords:[],
  power:null,
  guard:null,
  audit_identity:[],
  complexity:'activated',
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
      if(isCards&&Array.isArray(data.cards)&&!data.cards.some(c=>c.id===HAT_ID))data.cards.push({...CARD});
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards){
          magician.cards.P080=Math.max(0,(magician.cards.P080||0)-2);
          if(!magician.cards.P080)delete magician.cards.P080;
          magician.cards[HAT_ID]=(magician.cards[HAT_ID]||0)+2;
        }
      }
      return data;
    }
  };
};

const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(x?.id===HAT_ID){
    return !!this.canActivate(x)&&x.owner===this.turn&&this.chars(x.owner).some(y=>this.has(y,RABBIT_ID));
  }
  return baseCanUse.call(this,x);
};

const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
  const x=this.obj(uid);
  if(x?.id!==HAT_ID)return baseActivate.call(this,uid,mode);
  const p=this.turn;
  if(!this.canUse(x)||x.owner!==p)return;
  const rabbits=this.chars(p).filter(y=>this.has(y,RABBIT_ID));
  const target=await this.pick("Magician's Hat: Return a Rabbit to your hand",p,rabbits);
  if(target==null)return;
  x.ready=false;
  const rabbit=this.obj(target);
  if(rabbit)await this.remove(rabbit,'hand');
  this.say("Magician's Hat returns a Rabbit to hand");
  this.update?.();
};
