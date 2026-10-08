// 8 October 2026 locked audit. Load last: composes with Reckless and Stonewall.
import {Game,LEADERS} from './engine.js?v=mordecai-04-misdirection-01';
export const MISDIRECTION_IDS=new Set(['P062','P076','LAB-MAG-001A','P061','P063','LAB-MAG-006','P077','P066','LAB-MAG-003','P065','P067','LAB-MAG-004','P039','P064','P068','P075','P073','P078','LAB-MAG-008','P081','P084','P090','P080','P086','P082','LAB-MAG-002','P142','P079','P085','P088','LAB-MAG-005','LAB-MAG-009']);
const HAT='LAB-MAG-005',TRAP='LAB-MAG-009',HEAD='LAB-MAG-008',VOL='LAB-MAG-001A',DOVE='LAB-MAG-006',MOM='LAB-MAG-004';
const live=(g,x)=>!!x&&!!g.obj(x.uid)&&!x.cloaked;
LEADERS['Birthday Party Magician'].breaking='For My Next Trick…: You may return a character you control to your hand. Then you may play a character costing 3 or less from your hand without paying its cost.';

// Keep the public fuel count compatible with older packages while recording each
// Stash slot's state. Exchanges change identities, never these slot states.
Game.prototype.stashStates=function(p){
 const s=this.players[p],n=s.stash.length,want=Math.max(0,Math.min(n,s.fuel));
 const states=(s.stashReady||[]).slice(0,n);while(states.length<n)states.push(false);
 let count=states.filter(Boolean).length;
 for(let i=0;count<want&&i<n;i++)if(!states[i]){states[i]=true;count++}
 for(let i=n-1;count>want&&i>=0;i--)if(states[i]){states[i]=false;count--}
 s.stashReady=states;return states;
};
Game.prototype.preparePayment=async function(p,n){
 this.stashPayment=null;if(n<=0)return true;if(this.availableFuel(p)<n)return false;
 const payment=[];let remaining=n;
 const payers=this.name(p)==='Trash Baron'&&!this.decks[1-p].protectedStash?[1-p,p]:[p];
 for(const owner of payers){
  const s=this.players[owner],states=this.stashStates(owner),count=Math.min(remaining,s.fuel);if(!count)continue;
  const opts=s.stash.map((id,i)=>({label:owner===p?`${this.card(id).name} · Stash ${i+1} · Ready`:`Opposing Stash ${i+1} · Ready`,value:i})).filter(o=>states[o.value]);
  // No meaningful decision if every Ready slot is being spent.
  let picks=count===opts.length?opts.map(o=>o.value):await this.ask({title:`Pay cost: choose exactly ${count} Ready ${owner===p?'':'opposing '}Stash`,player:p,multi:true,max:count,min:count,mandatory:true,options:opts});
  if(!Array.isArray(picks)||picks.length!==count||new Set(picks).size!==count||picks.some(i=>!opts.some(o=>o.value===i)))return false;
  payment.push({owner,picks});remaining-=count;
 }
 if(remaining)return false;this.stashPayment=payment;return true;
};
Game.prototype.spendOwnStash=function(p,n){
 const s=this.players[p],states=this.stashStates(p),requested=this.stashPayment?.find(v=>v.owner===p)?.picks;
 const picks=(requested||states.flatMap((ready,i)=>ready?[i]:[])).slice(0,n);
 if(picks.some(i=>!states[i]))return 0;
 for(const i of [...picks].sort((a,b)=>b-a)){
  states[i]=false;s.fuel--;
  if(s.tempStashCard&&s.stash[i]===s.tempStashCard){s.discard.push(s.stash.splice(i,1)[0]);states.splice(i,1);s.tempStashCard=null}
 }
 return picks.length;
};
const pay=Game.prototype.payCost;
Game.prototype.payCost=function(p,n){if(this.availableFuel(p)<n){this.stashPayment=null;return false}const result=pay.call(this,p,n);this.stashPayment=null;return result};
const stash=Game.prototype.stash;
Game.prototype.stash=function(i,p=this.turn){this.stashStates(p);const before=this.players[p].stash.length,result=stash.call(this,i,p);if(result&&this.players[p].stash.length>before)this.players[p].stashReady.push(true);return result};
const start=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
 for(const s of this.players){s.returnedThisTurn=false;for(const x of s.board){x.headlinerUsed=false;x.poofTurn=null}}
 const result=start.call(this);for(let p=0;p<2;p++)this.stashStates(p);return result;
};
const enter=Game.prototype.enter;
Game.prototype.enter=function(...args){const x=enter.apply(this,args);if(x)x.enteredTurn=this.turnSerial||0;return x};
const cooled=(g,x)=>x.born<g.round||(x.enteredTurn!=null&&x.enteredTurn<(g.turnSerial||0));
const attack=Game.prototype.canAttack;
Game.prototype.canAttack=function(x){if(!x)return false;if(!cooled(this,x))return attack.call(this,x);const born=x.born;x.born=0;try{return attack.call(this,x)}finally{x.born=born}};
const eligible=Game.prototype.troubleEligible;
Game.prototype.troubleEligible=function(x){
 if(!live(this,x)||x.noTrouble||this.trouble(x)<=0)return false;
 if(x.id==='P077'||x.id==='P078'&&x.fromUnderItem)return true;
 if(cooled(this,x)){const born=x.born;x.born=0;try{return eligible.call(this,x)}finally{x.born=born}}
 return false;
};
const canActivate=Game.prototype.canActivate;
Game.prototype.canActivate=function(x){if(x&&cooled(this,x)){const born=x.born;x.born=0;try{return canActivate.call(this,x)}finally{x.born=born}}return canActivate.call(this,x)};

async function volunteer(g,p,exclude=null){const uid=await g.pick('Volunteer From the Audience: give another friendly Character +1 Power this turn',p,g.chars(p).filter(x=>x.uid!==exclude&&!x.cloaked),true);const x=g.obj(uid);if(x)x.power++}
async function dove(g,p){const uid=await g.pick('Dove: deal 1 damage to an opposing Character',p,g.chars(1-p).filter(x=>!x.cloaked),true);if(uid!=null)await g.damage(g.obj(uid),1)}
async function freeCharacter(g,p,max,title){const i=await g.pickHand(p,title,c=>c.type==='Character'&&c.cost<=max,true);if(i!=null)await g.playCard(p,g.players[p].hand[i],'hand',0,{index:i})}
async function arrange(g,p,n,toHand){
 const s=g.players[p],top=[];while(top.length<n&&s.deck.length)top.push(s.deck.pop());
 const take=async(title)=>{const i=await g.choose(p,title,top.map((id,i)=>({label:g.card(id).name,value:i})));return i!=null?top.splice(i,1)[0]:null};
 if(toHand&&top.length){const id=await take('Card Counter: choose a card for your hand');if(id)s.hand.push(id)}
 if(top.length){const id=await take('Choose a card to put on top of your deck');if(id)s.deck.push(id)}
 s.deck.unshift(...top.reverse());
}
Game.prototype.exchangeStash=async function(p,max){
 const s=this.players[p];this.stashStates(p);if(!s.stash.length||!s.hand.length)return;
 const options=s.stash.map((id,i)=>({label:`${this.card(id).name} · ${s.stashReady[i]?'Ready':'Rotated'} · Stash ${i+1}`,value:i}));
 let slots;if(max===1){const i=await this.choose(p,'Exchange: choose a Stash card',options);if(i==null)return;slots=[i]}
 else slots=await this.ask({title:'Quick-Change Artist: choose up to 2 Stash cards to exchange',player:p,multi:true,max:Math.min(max,s.stash.length,s.hand.length),options});
 if(!Array.isArray(slots)||!slots.length||new Set(slots).size!==slots.length||slots.length>max||slots.some(i=>!options.some(o=>o.value===i)))return;
 let indices;if(max===1){const i=await this.pickHand(p,'Exchange: choose a card from your hand');if(i==null)return;indices=[i]}
 else indices=await this.ask({title:`Quick-Change Artist: choose exactly ${slots.length} hand cards to exchange`,player:p,multi:true,min:slots.length,max:slots.length,mandatory:true,options:s.hand.map((id,i)=>({label:this.card(id).name,value:i}))});
 if(!Array.isArray(indices)||indices.length!==slots.length||new Set(indices).size!==indices.length||indices.some(i=>i<0||i>=s.hand.length))return;
 for(let n=0;n<slots.length;n++)[s.stash[slots[n]],s.hand[indices[n]]]=[s.hand[indices[n]],s.stash[slots[n]]];
 this.say(`Exchanges ${slots.length} hand and Stash cards; each Stash slot keeps its state`);
};
const entered=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
 if(!MISDIRECTION_IDS.has(x.id))return entered.call(this,x,previous);
 const p=x.owner,s=this.players[p],id=x.id;
 if(id==='P063')this.draw(p);
 if(id===DOVE)await dove(this,p);
 if(id===VOL)await volunteer(this,p,x.uid);
 if(id===MOM)x.power+=2;
 if(id==='P061'||id==='P065'){
  const uid=await this.pick(`${this.card(x).name}: Return another friendly Character`,p,this.chars(p).filter(y=>y.uid!==x.uid&&!y.cloaked),true);if(uid!=null)await this.remove(this.obj(uid),'hand');
 }
 if(id==='P062')await arrange(this,p,2,false);
 if(id==='P039')await arrange(this,p,3,true);
 if(id==='P068'){this.draw(p,2);if(s.hand.length)await this.discard(p)}
 if(id==='P073')await this.exchangeStash(p,2);
 if(id==='LAB-MAG-003'){
  const uid=await this.pick('Disappearing Assistant: Dismiss another friendly Character',p,this.chars(p).filter(y=>y.uid!==x.uid&&!y.cloaked),true);
  if(uid!=null&&await this.dismiss(this.obj(uid)))this.draw(p);
 }
 if(id==='P064'){
  const owner=1-p,deck=this.players[owner].deck;if(!deck.length)return;
  const revealed=deck.pop(),c=this.card(revealed);this.say(`The Mentalist reveals ${c.name}`);
  const use=c.type==='Character'&&await this.choose(p,`The Mentalist: play ${c.name} for free?`,[{label:'Play it under your control',value:true},{label:'Put it on the bottom',value:false}]);
  if(!use){deck.unshift(revealed);return}
  // Separate owner and controller before entrance effects, including nested plays.
  const index=s.hand.length;s.hand.push(revealed);
  const result=await this.playCard(p,revealed,'hand',0,{index,bonusHot:true,cardOwner:owner,entryContext:{noTrouble:true,borrowReturn:true}});
  if(!result){s.hand.splice(index,1);deck.unshift(revealed)}
 }
};
const passive=Game.prototype.leaderPassive;
Game.prototype.leaderPassive=async function(p,event,context={}){
 const s=this.players[p];if(this.name(p)!=='Birthday Party Magician'||!['returnedCharacter','dismissedCharacter'].includes(event))return passive.call(this,p,event,context);
 if(this.turn!==p||s.leaderPassiveUsed)return 0;s.leaderPassiveUsed=true;
 const states=this.stashStates(p),opts=states.flatMap((ready,i)=>ready?[]:[{label:`${this.card(s.stash[i]).name} · Stash ${i+1} · Rotated`,value:i}]);
 const i=await this.choose(p,'The Show Must Go On: Ready 1 Stash',opts);
 if(i!=null){states[i]=true;s.fuel++;this.say('The Show Must Go On: Ready 1 Stash')}return 1;
};
const remove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false,reason=null){
 if(!x||!this.obj(x.uid))return false;
 const p=x.owner,owner=x.cardOwner??p,id=x.id,character=this.card(x).type==='Character';
 // Snapshot return payoffs before leave triggers can play new instances.
 const returned=character&&where==='hand'&&owner===p;
 const witnesses=returned?this.chars(p).filter(y=>y.uid!==x.uid&&!y.cloaked).map(y=>y.uid):[];
 const traps=reason==='dismiss'&&character&&owner===p&&this.card(x).cost<=5?this.players[p].board.filter(y=>y.id===TRAP&&!y.cloaked&&!y.stored).map(y=>y.uid):[];
 const stored=x.stored;
 const result=await remove.call(this,x,where,defeated);if(this.obj(x.uid))return false;
 if(stored){this.players[stored.owner].discard.push(stored.id);x.stored=null;this.say('Trap Door leaves play; its stored Character goes to discard')}
 if(returned){
  this.players[p].returnedThisTurn=true;await this.leaderPassive(p,'returnedCharacter');
  for(const uid of witnesses){const y=this.obj(uid);if(!live(this,y))continue;
   if(y.id==='P066')await this.rummage(p);
   if(y.id===HEAD&&!y.headlinerUsed){y.headlinerUsed=true;y.troubleBonus=(y.troubleBonus||0)+2;this.say('The Headliner gets +2 Trouble this turn')}
  }
 }
 if(reason==='dismiss'&&character)await this.leaderPassive(p,'dismissedCharacter');
 // This exact movement is eligible; no search for older matching discard cards.
 if(traps.length){
  const available=traps.map(uid=>this.obj(uid)).filter(y=>live(this,y)&&!y.stored),s=this.players[p];
  const uid=await this.pick(`Trap Door: store just-Dismissed ${this.card(id).name}?`,p,available,true),trap=this.obj(uid);
  const index=s.discard.lastIndexOf(id);
  if(trap&&index>=0){s.discard.splice(index,1);trap.stored={id,owner,fromUid:x.uid};this.say(`Trap Door stores just-Dismissed ${this.card(id).name} face-down`)}
 }
 if(id==='P063')this.draw(p);
 if(id===DOVE)await dove(this,p);
 if(id===VOL&&returned)await volunteer(this,p);
 if(id===MOM&&returned){const uid=await this.pick('Party Mom: Return an opposing Character costing 2 or less',p,this.chars(1-p).filter(y=>!y.cloaked&&this.card(y).cost<=2),true);if(uid!=null)await this.remove(this.obj(uid),'hand')}
 return result!==false;
};
Game.prototype.dismiss=async function(x){if(!live(this,x))return false;const p=x.owner,item=this.card(x).type==='Item',result=await this.remove(x,'discard',false,'dismiss');if(result&&item)await this.leaderPassive(p,'dismissedItem');return result};
const breaking=Game.prototype.resolveBreakingPoint;
Game.prototype.resolveBreakingPoint=async function(p,source){
 if(this.name(p)!=='Birthday Party Magician')return breaking.call(this,p,source);
 const uid=await this.pick('For My Next Trick…: Return a friendly Character',p,this.chars(p).filter(x=>!x.cloaked),true);if(uid!=null)await this.remove(this.obj(uid),'hand');
 await freeCharacter(this,p,3,'For My Next Trick…: Play a Character costing 3 or less for free');
};
function targets(g,p,id){
 const own=g.chars(p).filter(x=>!x.cloaked),opp=g.chars(1-p).filter(x=>!x.cloaked);
 if(['P080','P090'].includes(id))return own;
 if(id==='P081')return opp.filter(x=>g.card(x).cost<=3);
 if(id==='P082')return opp;
 if(id==='P086')return own.filter(x=>opp.some(y=>g.card(y).cost<=g.card(x).cost));
 if(id==='P142')return g.players[1-p].board.filter(x=>!x.cloaked&&g.card(x).type==='Item');
 return null;
}
const tax=Game.prototype.lawyerTax;
Game.prototype.lawyerTax=function(p,id,...selected){
 if(['P081','P082','P086','P142'].includes(id)&&!selected.some(uid=>this.obj(uid)))return this.chars(1-p).filter(x=>live(this,x)&&x.id==='P137').length;
 return tax.call(this,p,id,...selected);
};
const canPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(i,p=this.turn){
 const s=this.players[p],id=s.hand[i],c=this.card(id);if(!MISDIRECTION_IDS.has(id))return canPlay.call(this,i,p);
 if(!c||p!==this.turn||this.winner!==null||this.pendingLastStraw!=null||this.playCost(p,id)>this.availableFuel(p))return false;
 const list=targets(this,p,id);if(list&&!list.length)return false;
 if(id==='P084'&&(!s.stash.length||s.hand.length<2))return false;return true;
};
const playCard=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,source='hand',cost=0,options={}){
 if(!MISDIRECTION_IDS.has(id))return playCard.call(this,p,id,source,cost,options);
 const s=this.players[p];if(id==='P084'&&(!s.stash.length||s.hand.filter((_,i)=>i!==options.index).length<1))return false;
 const list=targets(this,p,id);let target=null,second=null;
 if(list){if(!list.length)return false;target=await this.pick(`${this.card(id).name}: choose ${['P080','P090','P086'].includes(id)?'friendly':'opposing'} target`,p,list);if(!list.some(x=>x.uid===target))return false;
  if(id==='P086'||id==='P082'){
   const rest=this.chars(1-p).filter(x=>!x.cloaked&&(id==='P086'?this.card(x).cost<=this.card(this.obj(target)).cost:x.uid!==target));
   if(rest.length){second=await this.pick(`${this.card(id).name}: choose ${id==='P082'?'second ':''}opposing Character`,p,rest);if(!rest.some(x=>x.uid===second))return false}
   else if(id==='P086')return false;
  }
 }
 return playCard.call(this,p,id,source,cost,{...options,prepared:true,recklessTarget:target,secondTarget:second});
};
const action=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
 if(!MISDIRECTION_IDS.has(id))return action.call(this,p,id,target,second,previous);
 const s=this.players[p],x=this.obj(target),y=this.obj(second);
 if(id==='P081'&&live(this,x))x.ready=false;
 if(id==='P084')await this.exchangeStash(p,1);
 if(id==='P090'&&live(this,x))x.poofTurn=this.turnSerial||0;
 if(id==='P080'){if(await this.remove(x,'hand'))await freeCharacter(this,p,2,'Now You See Me: Play a Character costing 2 or less for free')}
 if(id==='P086'){await this.dismiss(x);await this.dismiss(y)}
 if(id==='P082'){
  const chosen=y?await this.pick('Choose Your Fate: choose which Character returns to your hand',1-p,[x,y]):target;
  if(chosen===target||chosen===second)await this.remove(this.obj(chosen),'hand');
 }
 if(id==='LAB-MAG-002')this.draw(p,s.returnedThisTurn?2:1);
 if(id==='P142'){await this.remove(x,'hand');this.draw(p)}
 if(id==='P085')this.draw(p,2);
 if(id==='P079'&&s.hand.length){
  const i=await this.choose(1-p,'Pick a Card: choose one face-down card',s.hand.map((_,i)=>({label:`Face-down card ${i+1}`,value:i})));
  if(Number.isInteger(i)&&s.hand[i]){const chosen=s.hand[i];this.say(`Pick a Card reveals ${this.card(chosen).name}`);const use=await this.choose(p,`Pick a Card: play ${this.card(chosen).name} for free?`,[{label:'Play it for free',value:true},{label:'Keep it in hand',value:false}]);if(use)await this.playCard(p,chosen,'hand',0,{index:i})}
 }
};
// The old Pirate choice engine no longer exists on Heckler.
Game.prototype.opponentChoice=async function(){};
Game.prototype.onAttack=async function(x){if(x.id!=='P075')return;const choice=await this.choose(1-x.owner,'Street Magician: choose one',[{label:'Attacker gets +2 Power for this attack',value:'power'},{label:'Attacker draws a card',value:'draw'}]);if(choice==='power')x.nextAttackPower=(x.nextAttackPower||0)+2;else this.draw(x.owner)};
const trouble=Game.prototype.resolveTrouble;
Game.prototype.resolveTrouble=async function(x,options){const poof=x?.poofTurn===(this.turnSerial||0);const result=await trouble.call(this,x,options);if(result&&poof){x.poofTurn=null;if(this.obj(x.uid))await this.remove(x,'hand')}return result};
const end=Game.prototype.endRound;
Game.prototype.endRound=async function(){
 await this.flushEffects();
 for(const s of this.players)for(const x of [...s.board]){x.poofTurn=null;if(x.borrowReturn&&this.obj(x.uid)){x.borrowReturn=false;await this.remove(x,'hand')}}
 return end.call(this);
};
const canUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
 if(x?.id==='P066')return false;
 if(!['P088',HAT,TRAP].includes(x?.id))return canUse.call(this,x);
 return live(this,x)&&x.owner===this.turn&&this.canActivate(x)&&this.availableFuel(x.owner)>=1&&(x.id==='P088'||x.id===TRAP?x.id==='P088'||!!x.stored:this.chars(x.owner).some(y=>live(this,y)&&this.trait(y,'Magical')));
};
const activate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
 const x=this.obj(uid);if(!['P088',HAT,TRAP].includes(x?.id))return activate.call(this,uid,mode);
 if(!this.canUse(x))return;const p=x.owner;
 const target=x.id===HAT?await this.pick("Magician's Hat: Return a Magical Character",p,this.chars(p).filter(y=>live(this,y)&&this.trait(y,'Magical'))):null;
 if(x.id===HAT&&target==null)return;
 if(!await this.preparePayment(p,1)||!this.payCost(p,1))return;x.ready=false;this.say(`Activates ${this.card(x).name} (spend 1 Stash)`);
 if(x.id==='P088')this.draw(p);
 if(x.id===HAT)await this.remove(this.obj(target),'hand');
 if(x.id===TRAP){
  const stored=x.stored;x.stored=null;const s=this.players[p],index=s.hand.length;s.hand.push(stored.id);
  const result=await this.playCard(p,stored.id,'hand',0,{index,cardOwner:stored.owner,entryContext:{fromUnderItem:true}});
  if(!result){s.hand.splice(index,1);x.stored=stored;this.say('Trap Door could not release its Character; the card remains stored')}
 }
 await this.advance();
};
