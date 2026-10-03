// LAB ONLY: Florida Man caffeine prototype.
// Replaces the two Send It! and two No, I'm Fine slots with four copies of one LAB Action.
import { Game } from './engine.js?v=rulebreakers-1';

const CAFFEINE_ID='LAB-FLM-002';
const CAFFEINE_SNEAK_ID='LAB-FLM-002-SUCKER';
const CAFFEINE_CARD={
  id:CAFFEINE_ID,
  type:'Action',
  cost:3,
  name:'A MILLION KILOGRAMS OF CAFFEINE!!!!',
  subtitle:'The Human Body Was Not Consulted',
  traits:[],
  text:'Choose one of your Characters. It gets +5 Power, Hothead, and Sucker Punch this Turn. After it attacks, Defeat it.',
  style:'Reckless',
  keywords:[],
  power:null,
  guard:null,
  complexity:'mixed',
  status:'lab',
  flavor:'He can hear colors now.'
};
const CAFFEINE_SNEAK_CARD={
  id:CAFFEINE_SNEAK_ID,
  type:'Effect',
  cost:0,
  name:'Caffeine Sucker Punch',
  traits:[],
  text:'',
  style:'Reckless',
  keywords:['Sucker Punch'],
  power:null,
  guard:null,
  complexity:'ongoing',
  status:'lab',
  flavor:''
};

// Patch only the LAB deck response. Canonical DECKS.json remains untouched.
const baseFetch=window.fetch.bind(window);
window.fetch=async function(input,init){
  const response=await baseFetch(input,init);
  const url=typeof input==='string'?input:(input?.url||'');
  if(!response.ok || !/(^|\/)DECKS\.json(?:\?|$)/.test(url)) return response;
  const doc=await response.clone().json();
  const florida=doc.decks?.find(d=>d.leader==='Florida Man');
  if(!florida) return response;
  const cards={...florida.cards};
  delete cards.P020;
  delete cards.P022;
  cards[CAFFEINE_ID]=4;
  florida.cards=cards;
  return new Response(JSON.stringify(doc),{
    status:response.status,
    statusText:response.statusText,
    headers:{'Content-Type':'application/json'}
  });
};

// Teach the LAB engine about the new card and a temporary virtual Sucker Punch layer.
const baseCard=Game.prototype.card;
Game.prototype.card=function(x){
  const id=typeof x==='string'?x:x?.id;
  if(id===CAFFEINE_ID) return CAFFEINE_CARD;
  if(id===CAFFEINE_SNEAK_ID) return CAFFEINE_SNEAK_CARD;
  return baseCard.call(this,x);
};

const baseLayers=Game.prototype.layers;
Game.prototype.layers=function(x){
  const layers=baseLayers.call(this,x);
  if(x?.caffeineSucker) return [...layers,CAFFEINE_SNEAK_ID];
  return layers;
};

// Caffeine needs one of your Characters to exist.
const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand?.[index];
  if(id===CAFFEINE_ID && !this.chars(p).length) return false;
  return baseCanPlay.call(this,index,p);
};

// Resolve the boost without dealing damage, so this card itself never triggers Adrenaline.
const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  if(id!==CAFFEINE_ID) return baseActionEffect.call(this,p,id,target,second,previous);
  const targets=this.chars(p);
  if(!targets.length) return;
  const chosen=await this.pick('A MILLION KILOGRAMS OF CAFFEINE!!!!: Choose a Character',p,targets);
  if(chosen==null) return;
  const x=this.obj(chosen);
  if(!x) return;
  x.power+=5;
  x.hot=true;
  x.caffeineSucker=true;
  x.caffeineDoomed=true;
  this.say(`${this.card(x).name} drinks an impossible amount of caffeine: +5 Power, Hothead, Sucker Punch`);
};

// Once the boosted Character actually attacks, it is Defeated after that attack resolves.
const baseAttack=Game.prototype.attack;
Game.prototype.attack=async function(uid){
  const before=this.obj(uid);
  const doomed=!!before?.caffeineDoomed;
  const hadAttacked=!!before?.attacked;
  const result=await baseAttack.call(this,uid);
  const after=this.obj(uid);
  if(doomed && !hadAttacked && after?.attacked){
    this.say(`${this.card(after).name} crashes after the caffeine Attack`);
    await this.remove(after,'discard',true);
    this.advance();
  }
  return result;
};

// If the Character never attacks, the temporary keywords expire with the Turn.
const baseEndRound=Game.prototype.endRound;
Game.prototype.endRound=async function(...args){
  for(const player of this.players){
    for(const x of player.board){
      delete x.caffeineSucker;
      delete x.caffeineDoomed;
    }
  }
  return baseEndRound.apply(this,args);
};
