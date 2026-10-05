// STANK INDUSTRIES LAB ONLY — Lady Who's Moving Out Again rework.
// Replaces the canonical P089 copies in the Magician deck with an isolated LAB card.
import {Game} from './engine.js?v=rulebreakers-1';

const LAB_ID='LAB-MAG-004';
const CARD={
  id:LAB_ID,
  type:'Character',
  cost:3,
  name:"Lady Who's Moving Out Again",
  stats:'',
  traits:[],
  text:'Hothead. When this enters play, it gets +2 Power this Turn. When this is Returned from play to your hand, you may Return an opposing Character that costs 2 or less to its owner’s hand.',
  style:'Misdirection',
  keywords:['Hothead'],
  power:3,
  guard:5,
  audit_identity:['Human'],
  complexity:'mixed',
  status:'lab',
  flavor:''
};

// Patch only LAB browser data. Canonical CARDS.json / DECKS.json remain untouched.
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
      if(isCards&&Array.isArray(data.cards)&&!data.cards.some(c=>c.id===LAB_ID))data.cards.push({...CARD});
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards?.P089){
          const n=magician.cards.P089;
          delete magician.cards.P089;
          magician.cards[LAB_ID]=(magician.cards[LAB_ID]||0)+n;
        }
      }
      return data;
    }
  };
};

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  if(x?.id!==LAB_ID)return baseEnterEffect.call(this,x,previous);
  x.power+=2;
  this.say("Lady Who's Moving Out Again gets +2 Power this Turn");
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  const isLady=x?.id===LAB_ID;
  const owner=x?.owner;
  const wasInPlay=!!(x&&this.obj(x.uid));
  const result=await baseRemove.call(this,x,where,defeated);
  if(!isLady||!wasInPlay||where!=='hand'||defeated||this.obj(x.uid))return result;

  const opp=1-owner;
  const choices=this.chars(opp).filter(y=>this.card(y).cost<=2);
  if(choices.length){
    const uid=await this.pick("Lady Who's Moving Out Again: Return an opposing Character costing 2 or less",owner,choices,true);
    if(uid!=null){
      const target=this.obj(uid);
      if(target)await baseRemove.call(this,target,'hand',false);
    }
  }
  return result;
};
