// LAB ONLY: Florida Man caffeine / Rusty Needle prototype.
// TEMP TEST: replaces the two Send It! and two No, I'm Fine slots with four Rusty Needle LAB Actions.
import { Game } from './engine.js?v=rulebreakers-1';

const CAFFEINE_ID='LAB-FLM-002';
const CAFFEINE_SNEAK_ID='LAB-FLM-002-SUCKER';
const RUSTY_NEEDLE_ID='LAB-FLM-003';
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
const RUSTY_NEEDLE_CARD={
  id:RUSTY_NEEDLE_ID,
  type:'Action',
  cost:2,
  name:'Rusty Needle',
  subtitle:'',
  traits:[],
  text:'Deal 1 damage to a Character. Congratulations, you have tetanus. At the start of its controller\'s Turn, it gets -1 Guard. This can reduce its Guard to 0. That Character may Rotate to remove tetanus.',
  style:'Reckless',
  keywords:[],
  power:null,
  guard:null,
  complexity:'mixed',
  status:'lab',
  flavor:''
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
  delete cards[CAFFEINE_ID];
  cards[RUSTY_NEEDLE_ID]=4;
  florida.cards=cards;
  return new Response(JSON.stringify(doc),{
    status:response.status,
    statusText:response.statusText,
    headers:{'Content-Type':'application/json'}
  });
};

// Teach the LAB engine about the new cards and a temporary virtual Sucker Punch layer.
const baseCard=Game.prototype.card;
Game.prototype.card=function(x){
  const id=typeof x==='string'?x:x?.id;
  if(id===CAFFEINE_ID) return CAFFEINE_CARD;
  if(id===RUSTY_NEEDLE_ID) return RUSTY_NEEDLE_CARD;
  if(id===CAFFEINE_SNEAK_ID) return CAFFEINE_SNEAK_CARD;
  return baseCard.call(this,x);
};

const baseLayers=Game.prototype.layers;
Game.prototype.layers=function(x){
  const layers=baseLayers.call(this,x);
  if(x?.caffeineSucker) return [...layers,CAFFEINE_SNEAK_ID];
  return layers;
};

// Tetanus Guard loss is persistent even though ordinary temporary Guard modifiers clear each Turn.
const baseGuard=Game.prototype.guard;
Game.prototype.guard=function(x){
  return Math.max(0,baseGuard.call(this,x)-(x?.tetanusGuardLoss||0));
};

// Rusty Needle and Caffeine both need a Character target.
const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand?.[index];
  if(id===RUSTY_NEEDLE_ID && ![...this.chars(p),...this.chars(1-p)].length) return false;
  if(id===CAFFEINE_ID && !this.chars(p).length) return false;
  return baseCanPlay.call(this,index,p);
};

// Resolve Caffeine without dealing damage, so this card itself never triggers Adrenaline.
const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  if(id===RUSTY_NEEDLE_ID){
    const targets=[...this.chars(p),...this.chars(1-p)];
    if(!targets.length) return;
    const chosen=await this.pick('Rusty Needle: Choose a Character',p,targets);
    if(chosen==null) return;
    const x=this.obj(chosen);
    if(!x) return;
    await this.damage(x,1);
    const survivor=this.obj(chosen);
    if(survivor){
      survivor.tetanus=true;
      survivor.tetanusGuardLoss=survivor.tetanusGuardLoss||0;
      this.say(`${this.card(survivor).name}: Congratulations, you have tetanus.`);
    }
    return;
  }
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

// Tetanus is a Character status, not a keyword. A Ready Character may spend its activation by Rotating to remove it.
const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(x?.tetanus && x.owner===this.turn && x.ready) return true;
  return baseCanUse.call(this,x);
};

const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
  const x=this.obj(uid);
  if(x?.tetanus && x.owner===this.turn && x.ready){
    const normal=baseCanUse.call(this,x);
    let cure=mode==='LAB-TETANUS-CURE';
    if(!mode && normal){
      const choice=await this.choose(this.turn,'Choose an ability',[{label:'Remove tetanus',value:'LAB-TETANUS-CURE'},{label:'Use printed ability',value:'PRINTED'}]);
      if(choice==='PRINTED') return baseActivate.call(this,uid,null);
      cure=choice==='LAB-TETANUS-CURE';
    } else if(!mode && !normal) cure=true;
    if(cure){
      x.ready=false;
      delete x.tetanus;
      this.say(`${this.card(x).name} Rotates to remove tetanus`);
      this.advance();
      return;
    }
  }
  return baseActivate.call(this,uid,mode);
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

// Caffeine expires at Turn end. After the next Turn starts, tetanus permanently removes 1 Guard from
// each infected Character controlled by the new active player. If that reaches its current damage threshold,
// the Character is Defeated before the player can take an action.
const baseEndRound=Game.prototype.endRound;
Game.prototype.endRound=async function(...args){
  for(const player of this.players){
    for(const x of player.board){
      delete x.caffeineSucker;
      delete x.caffeineDoomed;
    }
  }
  const previousTurn=this.turn;
  const result=await baseEndRound.apply(this,args);
  if(this.winner!==null || this.turn===previousTurn) return result;
  const infected=[...this.chars(this.turn)].filter(x=>x.tetanus);
  for(const x of infected){
    if(!this.obj(x.uid)) continue;
    x.tetanusGuardLoss=(x.tetanusGuardLoss||0)+1;
    this.say(`${this.card(x).name} loses 1 Guard from tetanus`);
    await this.checkDefeat(x);
  }
  this.checkEnd();
  this.update?.();
  return result;
};
