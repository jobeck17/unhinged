// STANK INDUSTRIES LAB ONLY — Birthday Party Magician experiment.
// Replaces the two Look Over There! slots with two copies of “This Kid Again?”.
import {Game} from './engine.js?v=rulebreakers-1';

const KID_ID='LAB-MAG-001';
const KID_CARD={
  id:KID_ID,
  type:'Character',
  cost:2,
  name:'“This Kid Again?”',
  traits:['Kid'],
  text:'Whenever “This Kid Again?” enters play or is Returned from play to your hand, choose another Character you control. That Character gets +1 Power permanently. After this attacks, you may Return it to your hand.',
  style:'Misdirection',
  complexity:'mixed',
  keywords:[],
  power:1,
  guard:2,
  audit_identity:['Human'],
  status:'lab',
  flavor:'Somebody in the back row is starting to notice a pattern.'
};

// Patch only the root Carl data requested by the LAB browser. Canonical files stay untouched.
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
      if(isCards&&Array.isArray(data.cards)&&!data.cards.some(c=>c.id===KID_ID)){
        data.cards.push({...KID_CARD});
      }
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards){
          const old=Math.min(2,magician.cards.P081||0);
          if(old){
            magician.cards.P081-=old;
            if(magician.cards.P081<=0)delete magician.cards.P081;
          }
          magician.cards[KID_ID]=(magician.cards[KID_ID]||0)+old;
        }
      }
      return data;
    }
  };
};

// Permanent means the bonus does not expire at end of Turn. It remains on that
// in-play Character instance until the Character leaves play.
const basePower=Game.prototype.power;
Game.prototype.power=function(x){
  return basePower.call(this,x)+(x?.kidAgainPower||0);
};

async function givePermanentPower(game,p,excludeUid=null,reason='trick'){
  const targets=game.chars(p).filter(x=>x.uid!==excludeUid);
  if(!targets.length)return;
  const uid=await game.pick(`“This Kid Again?” ${reason}: choose another Character to get +1 permanent Power`,p,targets);
  const target=uid==null?null:game.obj(uid);
  if(!target)return;
  target.kidAgainPower=(target.kidAgainPower||0)+1;
  game.say(`“This Kid Again?” gives ${game.card(target).name} +1 permanent Power`);
}

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  const result=await baseEnterEffect.call(this,x,previous);
  if(x?.id===KID_ID&&this.obj(x.uid)){
    await givePermanentPower(this,x.owner,x.uid,'enters play');
  }
  return result;
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  const wasKidReturn=!!x&&x.id===KID_ID&&where==='hand'&&!defeated&&!!this.obj(x.uid);
  const p=x?.owner;
  const uid=x?.uid;
  const result=await baseRemove.call(this,x,where,defeated);
  if(wasKidReturn&&!this.obj(uid)){
    await givePermanentPower(this,p,null,'returns to hand');
  }
  return result;
};

const baseAttack=Game.prototype.attack;
Game.prototype.attack=async function(uid){
  const before=this.obj(uid);
  const isKid=before?.id===KID_ID;
  const p=before?.owner;
  const hadAttacked=!!before?.attacked;
  const result=await baseAttack.call(this,uid);
  const after=this.obj(uid);
  if(isKid&&after&&after.owner===p&&!hadAttacked&&after.attacked){
    const bounce=await this.choose(p,'“This Kid Again?”: put him back in your hand after the Attack?',[{label:'Return him to your hand',value:true},{label:'Leave him in play',value:false}]);
    if(bounce)await this.remove(after,'hand');
  }
  return result;
};
