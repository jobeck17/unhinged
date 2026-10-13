// Isolated audit engine. Not imported by the live builder/playtest.
import {Game,LEADERS} from '../../web/engine.js?v=mordecai-04-meatshield-01';
import '../../web/cat-lady.js';
import '../../web/rockstar.js';
import '../../web/reckless.js';
import '../../web/stonewall.js';
import '../../web/magician.js';
export {Game};
export const IDS=new Set([...Array.from({length:30},(_,i)=>`P${String(91+i).padStart(3,'0')}`).filter(id=>id!=='P101'),'LAB-SAL-001','LAB-SAL-002','LAB-SAL-003']);
const HEAP='LAB-SAL-003',live=(g,x)=>!!x&&!!g.obj(x.uid)&&!x.cloaked;
const items=(g,p)=>g.players[p].board.filter(x=>live(g,x)&&g.card(x).type==='Item');
const bodies=(g,p)=>g.chars(p).filter(x=>live(g,x));
const itemCard=(g,id)=>g.card(id)?.type==='Item';
const has=Game.prototype.has;
Game.prototype.has=function(x,id){if(['P105','P106'].includes(id))return false;return has.call(this,x,id)};
LEADERS['Trash Baron'].breaking='At the start of your next turn, Ready all opposing Stash.';
LEADERS['Trash Baron'].passive='You may use opposing Ready Stash to pay your Costs as though it were your own. If an Item you control would go from play to your discard, you may put it face-up and Rotated into your Stash instead. Discard it when spent.';
function temp(g,p){const s=g.players[p];s.salTemp||=[];while(s.salTemp.length<s.stash.length)s.salTemp.push(false);s.salTemp.length=s.stash.length;return s.salTemp}
function putTemp(g,p,id){const s=g.players[p];g.stashStates(p);temp(g,p);s.stash.push(id);s.stashReady.push(false);s.salTemp.push(true);s.salCreated=(s.salCreated||0)+1;g.say('Salvage: Item becomes Rotated temporary Stash')}
const stash=Game.prototype.stash;
Game.prototype.stash=function(i,p=this.turn){temp(this,p);const result=stash.call(this,i,p);temp(this,p);return result};
const spend=Game.prototype.spendOwnStash;
Game.prototype.spendOwnStash=function(p,n){
 const s=this.players[p];temp(this,p);if(!s.salTemp.some(Boolean))return spend.call(this,p,n);
 const states=this.stashStates(p),requested=this.stashPayment?.find(v=>v.owner===p)?.picks;
 const picks=(requested||states.flatMap((v,i)=>v?[i]:[])).slice(0,n);
 if(picks.some(i=>!states[i]))return 0;
 const used=[];
 for(const i of [...picks].sort((a,b)=>b-a)){
  s.fuel--;states[i]=false;
  if(s.salTemp[i]){const id=s.stash.splice(i,1)[0];states.splice(i,1);s.salTemp.splice(i,1);s.discard.push(id);used.push(id);s.salSpent=(s.salSpent||0)+1;}
 }
 if(used.length&&p===this.turn)for(const x of bodies(this,p).filter(x=>x.id==='P092'&&x.salSpendTurn!==this.turnSerial)){
  x.salSpendTurn=this.turnSerial;
  this.queueEffect(async()=>{const eligible=used.filter(id=>s.discard.includes(id));const id=await this.choose(p,'Trans Am: recover an Item just spent?',eligible.map(id=>({label:this.card(id).name,value:id})),true);const i=s.discard.indexOf(id);if(id&&i>=0)s.hand.push(...s.discard.splice(i,1));});
 }
 return picks.length;
};
const start=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
 for(const s of this.players){s.salDismissed=0;for(const x of s.board)x.salTroubleDebuffs=(x.salTroubleDebuffs||[]).filter(e=>e.untilStart!==this.turn)}
 const result=start.call(this);for(let p=0;p<2;p++)temp(this,p);
 const s=this.players[this.turn];s.salItemPlays=0;
 if(s.salBPReady){s.salBPReady=false;const opp=this.players[1-this.turn];this.stashStates(1-this.turn).fill(true);opp.fuel=opp.stash.length;this.say('Trash Baron Breaking Point Readies opposing Stash')}
 return result;
};
const power=Game.prototype.power,guard=Game.prototype.guard,trouble=Game.prototype.trouble;
Game.prototype.power=function(x){let n=power.call(this,x);if(x.id==='P105')n+=this.players[x.owner].discard.filter(id=>itemCard(this,id)).length;if(x.id==='P106'&&temp(this,x.owner).some((v,i)=>v&&itemCard(this,this.players[x.owner].stash[i])))n+=2;if(x.id===HEAP)n+=(x.heapItems||[]).length;return n};
Game.prototype.guard=function(x){return guard.call(this,x)+(x.id===HEAP?(x.heapItems||[]).length:0)};
Game.prototype.trouble=function(x){let n=trouble.call(this,x);if(x.id===HEAP)n+=(x.heapItems||[]).length;if(x.id==='P108')n+=this.players[x.owner].salDismissed||0;if(this.keyword(x,'Scurry Away'))n+=bodies(this,x.owner).filter(y=>y.uid!==x.uid&&y.id==='P102').length;n+=(x.salTroubleDebuffs||[]).reduce((sum,e)=>sum+e.amount,0);return Math.max(0,n)};
const canAttack=Game.prototype.canAttack,eligible=Game.prototype.troubleEligible;
Game.prototype.canAttack=function(x){return !(x?.id===HEAP&&(x.heapItems||[]).length<3)&&canAttack.call(this,x)};
Game.prototype.troubleEligible=function(x){if(x?.salEventDeclared)return live(this,x);return !(x?.id===HEAP&&(x.heapItems||[]).length<3)&&eligible.call(this,x)};
const bp=Game.prototype.resolveBreakingPoint;
Game.prototype.resolveBreakingPoint=async function(p,source){if(this.name(p)==='Trash Baron'){this.players[p].salBPReady=true;return}return bp.call(this,p,source)};
const remove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false,reason=null){
 if(!live(this,x))return false;const p=x.owner,owner=x.cardOwner??p,c=this.card(x),s=this.players[p];
 const eligibleItem=c.type==='Item'&&where==='discard'&&owner===p;
 const heaps=eligibleItem?bodies(this,p).filter(y=>y.id===HEAP&&!y.salLeaving&&(y.heapItems||[]).length<5).map(y=>y.uid):[];
 x.salLeaving=true;const result=await remove.call(this,x,where,defeated,reason);x.salLeaving=false;
 if(this.obj(x.uid))return false;
 if(x.heapItems?.length){for(const v of x.heapItems)this.players[v.owner].discard.push(v.id);x.heapItems=[];}
 if(eligibleItem){
  const choices=[{label:'Discard',value:'discard'},...(this.name(p)==='Trash Baron'?[{label:'Temporary Stash',value:'stash'}]:[]),...heaps.filter(uid=>live(this,this.obj(uid))&&(this.obj(uid).heapItems||[]).length<5).map(uid=>({label:'Store under Junk Heap',value:uid}))];
  const destination=choices.length>1?await this.choose(p,'Salvage destination',choices):'discard';const i=s.discard.lastIndexOf(x.id);
  if(i>=0&&destination==='stash'){s.discard.splice(i,1);putTemp(this,p,x.id)}
  else if(i>=0&&typeof destination==='number'){const heap=this.obj(destination);if(heap&&(heap.heapItems||[]).length<5){s.discard.splice(i,1);(heap.heapItems||=[]).push({id:x.id,owner});}}
 }
 return result!==false;
};
const defeated=Game.prototype.defeatEffect;
Game.prototype.defeatEffect=async function(id,x,p,lower){
 if(!IDS.has(id))return defeated.call(this,id,x,p,lower);
 if(id==='P103'&&this.players[p].discard.includes(id)&&items(this,p).length){const uid=await this.pick('Possum: Dismiss an Item to recover?',p,items(this,p),true);if(uid!=null&&await this.dismiss(this.obj(uid))){const i=this.players[p].discard.lastIndexOf(id);if(i>=0)this.players[p].hand.push(...this.players[p].discard.splice(i,1));}}
};
const passive=Game.prototype.leaderPassive;
Game.prototype.leaderPassive=async function(p,event,context){
 const result=await passive.call(this,p,event,context);if(event!=='dismissedItem')return result;
 const s=this.players[p];s.salDismissed=(s.salDismissed||0)+1;s.salDismissTotal=(s.salDismissTotal||0)+1;
 if(this.turn!==p)return result;
 const witnesses=bodies(this,p).filter(x=>['P091','P093'].includes(x.id)&&x.salUsedTurn!==this.turnSerial).map(x=>x.uid);
 for(const uid of witnesses){const x=this.obj(uid);if(!live(this,x))continue;x.salUsedTurn=this.turnSerial;
  if(x.id==='P091'){const uid=await this.pick('Scrap Dealer: boost another Character',p,bodies(this,p).filter(y=>y.uid!==x.uid),true);const y=this.obj(uid);if(y){y.power++;y.troubleBonus=(y.troubleBonus||0)+1;}}
  if(x.id==='P093'&&s.deck.length){const id=s.deck.pop();this.say('Inventor reveals '+this.card(id).name);const use=itemCard(this,id)&&await this.choose(p,'Inventor: deploy revealed Item?', [{label:'Deploy',value:true},{label:'Bottom',value:false}]);if(use){const i=s.hand.length;s.hand.push(id);if(!await this.playCard(p,id,'hand',0,{index:i,entryContext:{enterRotated:true}})){s.hand.splice(i,1);s.deck.unshift(id)}}else s.deck.unshift(id);}
 }
 return result;
};
async function recover(g,p,max=Infinity){const i=await g.pickDiscard(p,'Recover an Item',c=>c.type==='Item'&&c.cost<=max,true);if(i!=null)g.players[p].hand.push(...g.players[p].discard.splice(i,1));}
async function replay(g,p,max){const i=await g.pickDiscard(p,'Replay an Item',c=>c.type==='Item'&&c.cost<=max,true);if(i!=null)await g.playCard(p,g.players[p].discard[i],'discard',0,{index:i});}
const enterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
 if(!IDS.has(x.id))return enterEffect.call(this,x,previous);const p=x.owner,s=this.players[p];
 if(x.id==='P094')await this.search(p,3,c=>c.type==='Item');
 if(x.id==='P092')await recover(this,p);
 if(x.id==='P095')await recover(this,p,2);
 if(x.id==='P107')await replay(this,p,1);
 if(x.id==='P099'){const i=await this.pickDiscard(p,'Trash Collector: salvage Item',c=>c.type==='Item',true);if(i!=null)putTemp(this,p,s.discard.splice(i,1)[0]);}
 if(x.id==='P105'&&await this.choose(p,'Vacuum: mill top two?', [{label:'Mill',value:true},{label:'Keep',value:false}]))for(let i=0;i<2&&s.deck.length;i++)s.discard.push(s.deck.pop());
};
function actionTargets(g,p,id){if(id==='P113')return items(g,p);if(id==='P116')return [...bodies(g,p),...bodies(g,1-p)].filter(x=>x.damage>0);if(id==='P111')return bodies(g,p);return null}
const cost=Game.prototype.playCost;
Game.prototype.playCost=function(p,id){const c=this.card(id);return Math.max(0,cost.call(this,p,id)-(c?.type==='Item'&&!(this.players[p].salItemPlays||0)&&bodies(this,p).some(x=>x.id==='P095')?1:0))};
const canPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(i,p=this.turn){const id=this.players[p].hand[i];if(!IDS.has(id))return canPlay.call(this,i,p);if(p!==this.turn||this.winner!==null||this.pendingLastStraw!=null||this.playCost(p,id)>this.availableFuel(p))return false;const list=actionTargets(this,p,id);if(list&&!list.length)return false;if(id==='P115'&&!this.players[p].discard.some(id=>itemCard(this,id)&&this.card(id).cost<=2))return false;if(id==='P111'&&!temp(this,p).some(Boolean))return false;return true};
const play=Game.prototype.play,playCard=Game.prototype.playCard;
Game.prototype.play=async function(i){const p=this.turn,id=this.players[p].hand[i];if(!IDS.has(id))return play.call(this,i);if(!this.canPlay(i,p))return;await this.playCard(p,id,'hand',this.playCost(p,id),{index:i,finalCost:true});await this.advance();};
Game.prototype.playCard=async function(p,id,source='hand',baseCost=0,options={}){
 if(!IDS.has(id))return playCard.call(this,p,id,source,baseCost,options);
 const c=this.card(id),s=this.players[p],where=source==='discard'?s.discard:s.hand;let index=options.index;
 if(index==null||where[index]!==id)index=where.indexOf(id);if(index<0)return false;
 const list=actionTargets(this,p,id);if(list&&!list.length)return false;
 const target=list?await this.pick(c.name+': target',p,list):null;if(list&&target==null)return false;
 if(id==='P115'&&!s.discard.some(id=>itemCard(this,id)&&this.card(id).cost<=2))return false;
 const tax=c.type==='Action'&&this.obj(target)?.owner===1-p?this.lawyerTax(p,id,target):0;
 const amount=options.finalCost?baseCost+tax:Math.max(0,baseCost-(c.type==='Item'&&!s.salItemPlays&&bodies(this,p).some(x=>x.id==='P095')?1:0))+tax;
 if(!await this.preparePayment(p,amount)||!this.payCost(p,amount))return false;
 await this.flushEffects();index=where.indexOf(id);if(index<0)throw Error('source disappeared during payment');where.splice(index,1);
 const previous=[...s.played];s.played.push({id,type:c.type});this.say('Plays '+c.name+' (Cost '+amount+')');
 (s.salDeploys||=[]).push({id,cost:c.cost,round:this.round,ownStash:s.stash.length-temp(this,p).filter(Boolean).length,paid:amount});
 if(c.type==='Action'){await this.actionEffect(p,id,target,null,previous);s.discard.push(id);for(const x of bodies(this,1-p))if(x.id==='P125')(x.timedPower||=[]).push({amount:1,untilEnd:x.owner});}
 else {const x=this.enter(p,id,null,null,options.cardOwner??p);if(options.entryContext)Object.assign(x,options.entryContext);x.hot=!!options.bonusHot;if(x.enterRotated)x.ready=false;if(c.type==='Item')s.salItemPlays=(s.salItemPlays||0)+1;
  if(this.keyword(x,'Meat Shield')&&await this.choose(p,c.name+': enter Rotated for Meat Shield?', [{label:'Ready',value:false},{label:'Rotated',value:true}]))x.ready=false;
  await this.enterEffect(x,previous);
 }
 return true;
};
const action=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
 if(!IDS.has(id))return action.call(this,p,id,target,second,previous);const s=this.players[p],x=this.obj(target);
 if(id==='P109')await this.search(p,3,c=>c.type==='Item','discard');
 if(id==='P114'){
  const cards=[];while(cards.length<4&&s.deck.length)cards.push(s.deck.pop());
  const i=await this.choose(p,'Finders Keepers: choose Item',cards.map((id,i)=>({id,i})).filter(v=>itemCard(this,v.id)&&this.card(v.id).cost<=2).map(v=>({label:this.card(v.id).name,value:v.i})),true);
  if(i!=null){const id=cards.splice(i,1)[0],j=s.hand.length;s.hand.push(id);if(!await this.playCard(p,id,'hand',0,{index:j})){s.hand.splice(j,1);cards.push(id)}}
  // Order and top/bottom placement choices are explicit, not a free extra Draw.
  const top=[];while(cards.length){const i=await this.choose(p,'Finders Keepers: order remaining',cards.map((id,i)=>({label:this.card(id).name,value:i})));const id=cards.splice(i??0,1)[0];const dest=await this.choose(p,'Finders Keepers: top or bottom', [{label:'Top',value:'top'},{label:'Bottom',value:'bottom'}]);if(dest==='top')top.push(id);else s.deck.unshift(id);}s.deck.push(...top.reverse());
 }
 if(id==='P113'&&await this.dismiss(x))this.draw(p,2);
 if(id==='P115')await replay(this,p,2);
 if(id==='P116'){if(x.owner===p){this.heal(x,this.guard(x));x.ready=false}else await this.remove(x,'hand');}
 if(id==='P111'){
  const slots=temp(this,p).flatMap((v,i)=>v&&itemCard(this,s.stash[i])?[{label:this.card(s.stash[i]).name,value:i}]:[]);
  const picks=await this.ask({title:'Treasure: cash up to two',player:p,multi:true,max:2,options:slots});
  if(Array.isArray(picks)){const states=this.stashStates(p);for(const i of [...picks].sort((a,b)=>b-a)){if(states[i])s.fuel--;s.discard.push(s.stash.splice(i,1)[0]);states.splice(i,1);s.salTemp.splice(i,1);}if(this.obj(target))x.troubleBonus=(x.troubleBonus||0)+picks.length;}
 }
};
function activationTargets(g,x){const p=x.owner,s=g.players[p];if(x.id==='P110')return s.discard.flatMap((id,i)=>itemCard(g,id)&&g.card(id).cost<=1?[i]:[]);if(x.id==='LAB-SAL-002')return temp(g,p).flatMap((v,i)=>v&&itemCard(g,s.stash[i])?[i]:[]);if(['P117','P120'].includes(x.id))return bodies(g,p).filter(y=>y.damage>0).map(y=>y.uid);if(x.id==='P112')return items(g,1-p).filter(y=>g.card(y).cost<=3).map(y=>y.uid);if(['P119','LAB-SAL-001'].includes(x.id))return bodies(g,1-p).map(y=>y.uid);return []}
const canUse=Game.prototype.canUse,activate=Game.prototype.activate;
Game.prototype.canUse=function(x){if(!IDS.has(x?.id))return canUse.call(this,x);return live(this,x)&&x.owner===this.turn&&this.card(x).type==='Item'&&x.id!=='P118'&&x.ready&&activationTargets(this,x).length>0};
Game.prototype.activate=async function(uid,mode){const x=this.obj(uid);if(!IDS.has(x?.id))return activate.call(this,uid,mode);if(!this.canUse(x))return;
 const p=x.owner,s=this.players[p],ids=activationTargets(this,x);
 const target=await this.choose(p,x.id==='P110'?'Toolbox: recover':x.id==='LAB-SAL-002'?'Magnet: retrieve':this.card(x).name+': target',ids.map(value=>({value,label:['P110','LAB-SAL-002'].includes(x.id)?this.card((x.id==='P110'?s.discard:s.stash)[value]).name:this.card(this.obj(value)).name})));if(target==null)return;
 // Select actual zone card before nested Dismiss triggers can alter indices.
 let recovery;if(['P110','LAB-SAL-002'].includes(x.id)){
  if(x.id==='P110')recovery=s.discard.splice(target,1)[0];else {const states=this.stashStates(p);if(states[target])s.fuel--;recovery=s.stash.splice(target,1)[0];states.splice(target,1);s.salTemp.splice(target,1);}
 }
 x.ready=false;if(x.id!=='P117')await this.dismiss(x);
 const y=this.obj(target);
 if(recovery)s.hand.push(recovery);
 if(x.id==='P117')this.heal(y,this.trait(y,'Construct')?2:1);
 if(x.id==='P120'){this.heal(y,2);if(y&&this.trait(y,'Scavenger'))await this.rummage(p);}
 if(x.id==='P112')await this.dismiss(y);
 if(x.id==='P119')await this.damage(y,2);
 if(x.id==='LAB-SAL-001'&&y)(y.salTroubleDebuffs||=[]).push({amount:-2,untilStart:p});
 await this.advance();
};
const onAttack=Game.prototype.onAttack;
Game.prototype.onAttack=async function(x){
 await onAttack?.call(this,x);const p=x.owner;
 if(x.id==='P098'){const uid=await this.pick('Raccoon: Dismiss Item for +2 Power?',p,items(this,p),true);if(uid!=null&&await this.dismiss(this.obj(uid)))x.nextAttackPower=(x.nextAttackPower||0)+2;}
 for(const zip of [...items(this,1-p)].filter(y=>y.id==='P118'))if(live(this,zip)&&await this.choose(1-p,'Zip Ties: weaken attacker?', [{label:'Use Zip Ties',value:true},{label:'Keep',value:false}])){if(await this.dismiss(zip))x.nextAttackPower=(x.nextAttackPower||0)-2;}
};
const resolve=Game.prototype.resolveTrouble;
Game.prototype.resolveTrouble=async function(x,options={}){
 if(!this.troubleEligible(x)||options.rotate!==false&&!x.ready)return false;
 const opp=1-x.owner,amount=this.trouble(x);let reduction=0;
 // Last Straw is a successful-Trouble check, not ordinary Composure damage.
 if(!this.players[opp].lastStraw)for(const pest of [...bodies(this,opp)].filter(y=>this.keyword(y,'Scurry Away'))){if(reduction>=amount)break;const use=await this.choose(opp,'Scurry Away: return '+this.card(pest).name+'?', [{label:'Scurry',value:true},{label:'Stay',value:false}]);if(use&&await this.remove(pest,'hand'))reduction++;}
 x.salEventReduction=reduction;x.salEventDeclared=true;try{return await resolve.call(this,x,options)}finally{x.salEventReduction=0;x.salEventDeclared=false;}
};
const eventTrouble=Game.prototype.trouble;
Game.prototype.trouble=function(x){return Math.max(0,eventTrouble.call(this,x)-(x.salEventReduction||0))};
