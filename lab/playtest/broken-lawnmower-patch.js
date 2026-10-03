// LAB ONLY: Broken Lawnmower prototype for Florida Man.
// Adds two copies to the LAB Florida Man deck, removes all Fireworks Incident copies,
// and implements the mower's three-pull start-up / team Power bonus.
import { Game } from './engine.js?v=rulebreakers-1';

const MOWER_ID='LAB-FLM-001';
const MOWER_CARD={
  id:MOWER_ID,
  type:'Item',
  cost:1,
  name:'Broken Lawnmower',
  traits:[],
  text:'Pull the Cord — Rotate one of your Ready Characters: Put a Start counter on Broken Lawnmower. Once it has 3 Start counters, your Characters get +1 Power while it remains in play.',
  style:'Reckless',
  keywords:[],
  power:null,
  guard:null,
  complexity:'ongoing',
  status:'lab',
  flavor:'Third pull’s the charm.'
};

// Patch the LAB deck data as it is fetched. Canonical DECKS.json remains untouched.
const baseFetch=window.fetch.bind(window);
window.fetch=async function(input,init){
  const response=await baseFetch(input,init);
  const url=typeof input==='string'?input:(input?.url||'');
  if(!response.ok || !/(^|\/)DECKS\.json(?:\?|$)/.test(url)) return response;
  const doc=await response.clone().json();
  const florida=doc.decks?.find(d=>d.leader==='Florida Man');
  if(!florida) return response;
  const cards={...florida.cards};
  delete cards.P023;
  cards[MOWER_ID]=2;
  florida.cards=cards;
  return new Response(JSON.stringify(doc),{
    status:response.status,
    statusText:response.statusText,
    headers:{'Content-Type':'application/json'}
  });
};

// The mower is LAB-only, so teach the playtest engine about it without touching CARDS.json.
const baseCard=Game.prototype.card;
Game.prototype.card=function(x){
  const id=typeof x==='string'?x:x?.id;
  if(id===MOWER_ID){
    if(x && typeof x==='object' && Number.isFinite(x.startCounters)){
      const n=Math.min(3,x.startCounters||0);
      const state=n>=3?' RUNNING — Your Characters get +1 Power.':` Start counters: ${n}/3.`;
      return {...MOWER_CARD,text:MOWER_CARD.text+state};
    }
    return MOWER_CARD;
  }
  return baseCard.call(this,x);
};

// Each running mower gives its controller's Characters +1 Power.
// Two running copies therefore stack to +2, like two separate continuous Item effects.
const basePower=Game.prototype.power;
Game.prototype.power=function(x){
  let value=basePower.call(this,x);
  if(x && this.card(x)?.type==='Character'){
    const running=this.players[x.owner].board.filter(z=>z.id===MOWER_ID&&(z.startCounters||0)>=3).length;
    value+=running;
  }
  return Math.max(0,value);
};

// A mower can be pulled while unfinished and its controller has a Ready Character.
const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(x?.id===MOWER_ID){
    return x.owner===this.turn && (x.startCounters||0)<3 && this.chars(this.turn).some(y=>y.ready&&!y.cloaked);
  }
  return baseCanUse.call(this,x);
};

const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
  const mower=this.obj(uid);
  if(mower?.id!==MOWER_ID) return baseActivate.call(this,uid,mode);
  const p=this.turn;
  if(!this.canUse(mower) || mower.owner!==p) return;
  const ready=this.chars(p).filter(y=>y.ready&&!y.cloaked);
  const target=await this.pick('Pull the Cord: Rotate a Character',p,ready);
  if(target==null) return;
  const character=this.obj(target);
  if(!character || !character.ready) return;
  character.ready=false;
  mower.startCounters=Math.min(3,(mower.startCounters||0)+1);
  this.say(`${this.card(character).name} pulls the cord (${mower.startCounters}/3)`);
  if(mower.startCounters>=3)this.say('Broken Lawnmower starts! Your Characters get +1 Power');
  this.advance();
};
