// STANK INDUSTRIES LAB ONLY — Magician's Hat + signature animal package.
// 2 Hats + 2 extra Rabbits replace all 4x Now You See Me in the Birthday Party Magician deck.
import {Game} from './engine.js?v=rulebreakers-1';

const HAT_ID='LAB-MAG-005';
const RABBIT_ID='P063';
const DOVE_ID='LAB-MAG-006';
const CARD={
  id:HAT_ID,
  type:'Item',
  cost:4,
  name:"Magician's Hat",
  stats:'',
  traits:[],
  text:'Activate — Return a Rabbit or Dove you control to your hand.',
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
          // Signature-animal rulebreaker for this LAB: Magician may run 6 Rabbits.
          const nysm=Math.min(4,magician.cards.P080||0);
          if(nysm){
            magician.cards.P080-=nysm;
            if(magician.cards.P080<=0)delete magician.cards.P080;
          }
          magician.cards[HAT_ID]=(magician.cards[HAT_ID]||0)+2;
          magician.cards[RABBIT_ID]=(magician.cards[RABBIT_ID]||0)+2;
        }
      }
      return data;
    }
  };
};

const isHatAnimal=(game,x)=>!!x&&(game.has(x,RABBIT_ID)||game.has(x,DOVE_ID));

const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(x?.id===HAT_ID){
    return !!this.canActivate(x)&&x.owner===this.turn&&this.chars(x.owner).some(y=>isHatAnimal(this,y));
  }
  return baseCanUse.call(this,x);
};

const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
  const x=this.obj(uid);
  if(x?.id!==HAT_ID)return baseActivate.call(this,uid,mode);
  const p=this.turn;
  if(!this.canUse(x)||x.owner!==p)return;
  const animals=this.chars(p).filter(y=>isHatAnimal(this,y));
  const target=await this.pick("Magician's Hat: Return a Rabbit or Dove to your hand",p,animals);
  if(target==null)return;
  x.ready=false;
  const animal=this.obj(target);
  if(animal)await this.remove(animal,'hand');
  this.say("Magician's Hat returns an animal to hand");
  this.update?.();
};
