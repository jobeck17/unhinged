// STANK INDUSTRIES LAB ONLY — Birthday Party Magician experiment.
// Replaces the two Look Over There! slots with two copies of Very Enthusiastic Volunteer.
import {Game} from './engine.js?v=rulebreakers-1';

const KID_IDS=['LAB-MAG-001A','LAB-MAG-001B'];
const makeKid=id=>({
  id,
  type:'Character',
  cost:2,
  name:'Very Enthusiastic Volunteer',
  traits:['Kid'],
  text:'Whenever Very Enthusiastic Volunteer enters play or is Returned from play to your hand, choose another Character you control. That Character gets +1 Power permanently.',
  style:'Misdirection',
  complexity:'mixed',
  keywords:[],
  power:1,
  guard:2,
  audit_identity:['Human'],
  status:'lab',
  flavor:'Somebody in the back row is starting to notice a pattern.'
});

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
      if(isCards&&Array.isArray(data.cards)){
        for(const id of KID_IDS)if(!data.cards.some(c=>c.id===id))data.cards.push(makeKid(id));
      }
      if(isDecks&&Array.isArray(data.decks)){
        const magician=data.decks.find(d=>d.leader==='Birthday Party Magician');
        if(magician?.cards){
          const old=Math.min(2,magician.cards.P081||0);
          if(old){
            magician.cards.P081-=old;
            if(magician.cards.P081<=0)delete magician.cards.P081;
          }
          delete magician.cards['LAB-MAG-001'];
          if(old>=1)magician.cards[KID_IDS[0]]=1;
          if(old>=2)magician.cards[KID_IDS[1]]=1;
        }
      }
      return data;
    }
  };
};

const isKid=x=>!!x&&KID_IDS.includes(x.id);

// Permanent means the bonus does not expire at end of Turn. It remains on that
// in-play Character instance until the Character leaves play.
const basePower=Game.prototype.power;
Game.prototype.power=function(x){
  return basePower.call(this,x)+(x?.kidAgainPower||0);
};

async function givePermanentPower(game,p,excludeUid=null,reason='trick'){
  const targets=game.chars(p).filter(x=>x.uid!==excludeUid);
  if(!targets.length)return;
  const uid=await game.pick(`Very Enthusiastic Volunteer ${reason}: choose another Character to get +1 permanent Power`,p,targets);
  const target=uid==null?null:game.obj(uid);
  if(!target)return;
  target.kidAgainPower=(target.kidAgainPower||0)+1;
  game.say(`Very Enthusiastic Volunteer gives ${game.card(target).name} +1 permanent Power`);
}

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  const result=await baseEnterEffect.call(this,x,previous);
  if(isKid(x)&&this.obj(x.uid))await givePermanentPower(this,x.owner,x.uid,'enters play');
  return result;
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  const wasKidReturn=isKid(x)&&where==='hand'&&!defeated&&!!this.obj(x.uid);
  const p=x?.owner;
  const uid=x?.uid;
  const result=await baseRemove.call(this,x,where,defeated);
  if(wasKidReturn&&!this.obj(uid))await givePermanentPower(this,p,null,'returns to hand');
  return result;
};
