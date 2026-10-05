// STANK INDUSTRIES LAB ONLY — clean out stale Misdirection code paths.
// P067 is School Bully now, so none of the old Kid with an iPad targeting/effect code should run.
// P089 is no longer used in the STANK Magician deck; remove the old Bush card object entirely
// so its legacy hidden-card behavior cannot leak back into this playtest.
import {Game} from './engine.js?v=rulebreakers-1';

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
        data.cards=data.cards.filter(c=>c.id!=='P089');
      }
      if(isDecks&&Array.isArray(data.decks)){
        for(const deck of data.decks){
          if(deck?.cards?.P089)delete deck.cards.P089;
        }
      }
      return data;
    }
  };
};

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  if(x?.id==='P067'){
    // Current School Bully has only its printed keywords. No legacy iPad -1 Power trigger.
    return;
  }
  return baseEnterEffect.call(this,x,previous);
};

// The base LAB engine still treats P067 as though it needs an opposing target before it can be played.
// School Bully no longer has that ability, so remove that stale play restriction.
const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand?.[index];
  if(id!=='P067')return baseCanPlay.call(this,index,p);
  const c=this.card(id);
  if(!c)return false;
  const s=this.players[p];
  const cost=Math.max(0,c.cost-(s.nextCharDiscount||0));
  return cost<=this.availableFuel(p);
};

// Bypass the old P067 target-selection branch entirely so playing School Bully never opens
// the obsolete "choose opposing Character" question tab.
const basePlayCard=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,source='hand',cost=0,{index=null,bonusHot=false,stack=false}={}){
  if(id!=='P067')return basePlayCard.call(this,p,id,source,cost,{index,bonusHot,stack});

  const s=this.players[p],c=this.card(id);
  if(source==='hand'&&(index===null||s.hand[index]!==id))index=s.hand.indexOf(id);
  if(source==='hand'&&index<0)return false;
  if(source==='discard'&&!s.discard.includes(id))return false;
  if(this.availableFuel(p)<cost)return false;
  if(!this.payCost(p,cost))return false;

  if(source==='hand')s.hand.splice(index,1);
  else s.discard.splice(s.discard.indexOf(id),1);

  const previous=[...s.played];
  s.played.push({id,type:c.type});
  this.say(`Plays ${c.name}${cost?` (Cost ${cost})`:' for free'}`);

  const x=this.enter(p,id);
  x.hot=bonusHot;
  await this.enterEffect(x,previous);

  if(s.friendPower&&this.obj(x.uid)){
    const choices=this.chars(p).filter(y=>y.uid!==x.uid);
    if(choices.length){
      const t=await this.pick('Bring a Friend: give +1 Power',p,choices,true);
      if(t!=null)this.obj(t).power++;
    }
    s.friendPower=false;
  }
  if(s.nextCharDiscount)s.nextCharDiscount=0;
  if(s.discountUndead===id)s.discountUndead=null;
  return true;
};
