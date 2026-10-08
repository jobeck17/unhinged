// Locked Stonewall cards and the Florida Man / HOA Breaking Point content pass.
// Load after Reckless. All other styles retain their production packages.
import {Game,LEADERS} from './engine.js?v=mordecai-04-meatshield-01';
export const STONEWALL_IDS=new Set(['P072','P083',...Array.from({length:30},(_,i)=>`P${121+i}`).filter(id=>id!=='P123'&&id!=='P142'&&id!=='P150'),...Array.from({length:4},(_,i)=>`LAB-HOA-00${i+1}`)]);
const actions=new Set(['P083','P139','P140','P141','P143','P144','P145','P146','LAB-HOA-004']);
const live=c=>c&&!['banked','retired','pending-redesign'].includes(c.status);
LEADERS['HOA President'].breaking='Final Warning: When an opposing Character Causes Trouble that triggers your Breaking Point, you may Dismiss that Character after its Trouble resolves.';
LEADERS['Florida Man'].breaking='You Ain’t Seen Nothing Yet! Roll a D6: 1 — Rotate a chosen Ready friendly Character; 2–5 — Ready a chosen friendly Rotated Character; 6 — Ready all your Characters.';
const active=(g,x)=>!!x&&!x.cloaked&&!!g.obj(x.uid);
Game.prototype.atBreakingPoint=function(p){const s=this.players[p];return s.lastStraw||s.hp<=this.breakingPoint};
Game.prototype.queueEffect=function(fn){(this.effectQueue||=[]).push(fn)};
Game.prototype.flushEffects=async function(){while(this.effectQueue?.length)await this.effectQueue.shift()()};
Game.prototype.onReadied=async function(x,step=false){
 if(!active(this,x))return;
 if(step&&x.id==='P131'){this.heal(x,1);this.say('Old Dog Readies: heal 1 damage')}
 if(x.id==='P132'){
  const targets=this.chars(x.owner).filter(y=>y.uid!==x.uid&&!y.cloaked&&y.damage>0);
  const uid=await this.pick('Grandma Readies: heal up to 2 from another friendly Character',x.owner,targets,true);
  const y=this.obj(uid);if(y){this.heal(y,2);this.say(`Grandma heals ${this.card(y).name}`)}
 }
};
Game.prototype.readyCharacter=async function(x){if(!active(this,x)||x.ready)return false;x.ready=true;this.say(`${this.card(x).name} Readies`);await this.onReadied(x,false);return true};
const start=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
 this.turnSerial=(this.turnSerial||0)+1;const p=this.turn,s=this.players[p];s.stoneNoAttack=false;s.digIn=false;
 const before=this.players[p].board.filter(x=>!x.ready).map(x=>x.uid);
 const skip=new Set(this.chars(p).filter(x=>x.skipReady).map(x=>x.uid));
 for(const state of this.players)for(const x of state.board)x.timedPower=(x.timedPower||[]).filter(e=>e.untilStart!==p);
 for(const x of this.chars(1-p))if(x.id==='P130')x.noseyUsed=false;
 const result=start.call(this);
 for(const uid of skip){const x=this.obj(uid);if(x){if(before.includes(uid))x.ready=false;x.skipReady=false;this.say(`${this.card(x).name} skips this Ready step`)}}
 for(const uid of before){const x=this.obj(uid);if(x?.ready)this.queueEffect(()=>this.onReadied(x,true))}
 return result;
};
const end=Game.prototype.endRound;
Game.prototype.endRound=async function(){
 await this.flushEffects();const p=this.turn;
 for(const s of this.players)for(const x of s.board)x.timedPower=(x.timedPower||[]).filter(e=>e.untilEnd!==p);
 const r=await end.call(this);await this.flushEffects();return r;
};
const advance=Game.prototype.advance;
Game.prototype.advance=async function(){await this.flushEffects();return advance.call(this)};
const hurt=Game.prototype.hurtLeader;
Game.prototype.hurtLeader=function(p,n){const before=this.players[p].breakingPointHit,result=hurt.call(this,p,n);if(!before&&this.players[p].breakingPointHit){const source=this.troubleSource;this.queueEffect(()=>this.resolveBreakingPoint(p,source))}return result};
Game.prototype.resolveBreakingPoint=async function(p,source){
 if(this.name(p)==='HOA President'){
  const x=this.obj(source);
  if(x&&x.owner!==p&&this.card(x).type==='Character'){
   const use=await this.choose(p,`Final Warning: Dismiss ${this.card(x).name}?`,[{label:'Dismiss the Character',value:true},{label:'Let it stay',value:false}]);
   if(use){this.say(`Final Warning dismisses ${this.card(x).name}`);await this.dismiss(x)}
  }else this.say('Final Warning: Breaking Point was not caused by an opposing Character’s Trouble');
 }
 if(this.name(p)==='Florida Man'){
  const r=this.rollDie('You Ain’t Seen Nothing Yet! — Breaking Point',p,{1:'Rotate a chosen Ready friendly Character',2:'Ready a chosen friendly Rotated Character',3:'Ready a chosen friendly Rotated Character',4:'Ready a chosen friendly Rotated Character',5:'Ready a chosen friendly Rotated Character',6:'Ready all your Characters'});
  if(r===6){for(const x of [...this.chars(p)])await this.readyCharacter(x)}
  else {const targets=this.chars(p).filter(x=>!x.cloaked&&(r===1?x.ready:!x.ready));const uid=await this.pick(`Breaking Point roll ${r}: ${r===1?'Rotate':'Ready'} your Character`,p,targets);const x=this.obj(uid);if(x){if(r===1)x.ready=false;else await this.readyCharacter(x)}}
 }
};
const targets=Game.prototype.attackTargets;
Game.prototype.attackTargets=function(a){const available=targets.call(this,a);const shields=available.filter(x=>!x.ready&&this.keyword(x,'Meat Shield'));return shields.length?shields:available};
const canAttack=Game.prototype.canAttack;
Game.prototype.canAttack=function(x){return !!x&&!this.players[x.owner].stoneNoAttack&&canAttack.call(this,x)};
const keyword=Game.prototype.keyword;
Game.prototype.keyword=function(x,word){return !!x&&(word==='Hothead'&&this.players[x.owner].lastStraw||keyword.call(this,x,word))};
const power=Game.prototype.power;
Game.prototype.power=function(x){let n=power.call(this,x)+(x.timedPower||[]).reduce((sum,e)=>sum+e.amount,0);if(this.keyword(x,'Hothead'))n-=this.chars(1-x.owner).filter(y=>active(this,y)&&y.id==='P135'&&y.ready).length;return Math.max(0,n)};
const trouble=Game.prototype.trouble;
Game.prototype.trouble=function(x){let n=trouble.call(this,x);if(this.atBreakingPoint(x.owner))n+=this.chars(x.owner).filter(y=>y.uid!==x.uid&&active(this,y)&&y.id==='LAB-HOA-003').length;return n};
const absorb=Game.prototype.absorb;
Game.prototype.absorb=function(x){let n=absorb.call(this,x);if(this.players[x.owner].digIn||!x.ready&&this.items(x).some(y=>y.id==='P149')||this.chars(x.owner).some(y=>y.uid!==x.uid&&active(this,y)&&y.id==='P072'&&y.ready))n=Math.max(n,1);return n};
function choices(g,p,id){
 if(id==='P139')return g.chars(1-p);
 if(id==='P140')return g.chars(1-p).filter(x=>!x.ready);
 if(id==='P141')return g.chars(1-p).filter(x=>g.card(x).cost<=3);
 if(id==='P143')return g.chars(1-p).filter(x=>!x.ready&&g.card(x).cost<=4);
 if(id==='LAB-HOA-004')return g.chars(p).filter(x=>!x.ready);
 if(id==='P149')return g.chars(p);
 return null;
}
const targeted=new Set(['P139','P140','P141','P143']);
Game.prototype.lawyerTax=function(p,id,...selected){
 if(this.card(id)?.type!=='Action')return 0;
 const opposing=selected.length?selected.some(uid=>this.obj(uid)?.owner===1-p):targeted.has(id)||['LAB-FLM-005','P081','P086','P023'].includes(id);
 return opposing?this.chars(1-p).filter(x=>active(this,x)&&x.id==='P137').length:0;
};
Game.prototype.playCost=function(p,id){const s=this.players[p],c=this.card(id);return Math.max(0,c.cost-(c.type==='Character'?(s.nextCharDiscount||0)+(s.discountUndead===id?1:0):c.type==='Item'?s.nextItemDiscount||0:0))+this.lawyerTax(p,id)};
const canPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(i,p=this.turn){
 const id=this.players[p]?.hand[i],c=this.card(id);if(!live(c)||p!==this.turn||this.winner!==null||this.pendingLastStraw!=null||this.playCost(p,id)>this.availableFuel(p))return false;
 if(id==='P146'&&this.players[p].attacked)return false;
 const list=choices(this,p,id);if(list&&!list.length)return false;
 if(STONEWALL_IDS.has(id))return true;
 return canPlay.call(this,i,p);
};
const play=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,source='hand',cost=0,options={}){
 const c=this.card(id);if(!live(c)||id==='P146'&&this.players[p].attacked)return false;
 if(this.availableFuel(p)<cost+this.lawyerTax(p,id))return false;
 const list=choices(this,p,id);if(list){if(!list.length)return false;const uid=await this.pick(`${c.name}: choose ${id==='LAB-HOA-004'||id==='P149'?'friendly':'opposing'} Character`,p,list);if(uid==null||!list.some(x=>x.uid===uid))return false;options={...options,recklessTarget:uid}}
 const result=await play.call(this,p,id,source,cost,options);
 if(result&&['Action','Item'].includes(c.type))for(const x of this.chars(1-p))if(x.id==='P125'&&!x.cloaked){(x.timedPower||=[]).push({amount:1,untilEnd:x.owner});this.say('Concerned Citizen gets +1 Power through their next Turn')}
 return result;
};
const enter=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
 if(!STONEWALL_IDS.has(x.id))return enter.call(this,x,previous);
 const p=x.owner;
 if(x.id==='P134')this.draw(p);
 if(x.id==='P122'||x.id==='LAB-HOA-002'){
  const list=this.chars(1-p).filter(y=>x.id==='P122'||this.card(y).cost<=2);
  const uid=await this.pick(`${this.card(x).name}: Rotate opposing Character${x.id==='LAB-HOA-002'?' costing 2 or less':''}`,p,list,true);const y=this.obj(uid);if(y){y.ready=false;if(x.id==='P122')y.skipReady=true;this.say(`${this.card(y).name} Rotates${y.skipReady?' and skips its next Ready step':''}`)}
 }
 if(x.id==='P127'){
  const uid=await this.pick('PTA President: heal another friendly Character',p,this.chars(p).filter(y=>y.uid!==x.uid&&y.damage>0),true),y=this.obj(uid);if(y){const before=y.damage;this.heal(y,2);if(y.damage<before)this.draw(p)}
 }
 if(x.id==='P136'){const uid=await this.pick('Tow-Truck Driver: Dismiss opposing Item costing 3 or less',p,this.players[1-p].board.filter(y=>this.card(y).type==='Item'&&this.card(y).cost<=3),true);if(uid!=null)await this.dismiss(this.obj(uid))}
};
const action=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
 const x=this.obj(target),s=this.players[p];
 switch(id){
 case 'P083':await this.discard(1-p);break;
 case 'P139':(x.timedPower||=[]).push({amount:-2,untilStart:p});this.say(`${this.card(x).name} gets −2 Power until your next Turn`);break;
 case 'P140':x.skipReady=true;this.say(`${this.card(x).name} will skip its next Ready step`);break;
 case 'P141':await this.remove(x,'hand');break;
 case 'P143':await this.dismiss(x);break;
 case 'P144':if(!s.lastStraw){s.hp=Math.min(this.decks[p].composure??20,s.hp+3);this.say('Peace and Quiet restores 3 Composure')}else if(!this.players[1-p].lastStraw)this.hurtLeader(1-p,3);else{this.draw(p);this.say('Both at Last Straw: Draw a card, I guess')}break;
 case 'P145':s.digIn=true;if(this.chars(1-p).length>this.chars(p).length)this.draw(p);this.say('Dig In grants Absorb 1 until your next Turn');break;
 case 'P146':this.draw(p,2);s.stoneNoAttack=true;this.say('Wait Them Out: Draw 2; no Attacks this Turn');break;
 case 'LAB-HOA-004':await this.readyCharacter(x);x.noAttack=true;x.noTrouble=true;break;
 default:return action.call(this,p,id,target,second,previous);
 }
};
const use=Game.prototype.canUse;
Game.prototype.canUse=function(x){if(!x)return false;if(STONEWALL_IDS.has(x.id)){if(x.owner!==this.turn||this.winner!==null||this.pendingLastStraw!=null||x.cloaked||!x.ready)return false;if(x.id==='P147')return true;if(x.id==='P148')return this.availableFuel(x.owner)>=1&&this.chars(x.owner).some(y=>!y.ready);return false}return use.call(this,x)};
const activate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode){const x=this.obj(uid);if(!x||!this.canUse(x))return;
 if(x.id==='P147'){x.ready=false;this.say('Security Camera Rotates: look at opposing hand');const hand=this.players[1-x.owner].hand;await this.choose(x.owner,'Security Camera: opposing hand',hand.length?hand.map((id,i)=>({label:`${this.card(id).name} · Cost ${this.card(id).cost}`,value:i})):[{label:'Their hand is empty',value:null}]);await this.advance();return}
 if(x.id==='P148'){const target=await this.pick('Lawn Chair: Ready friendly Rotated Character',x.owner,this.chars(x.owner).filter(y=>!y.ready));const y=this.obj(target);if(!y)return;if(!await this.preparePayment(x.owner,1)||!this.payCost(x.owner,1))return;x.ready=false;await this.readyCharacter(y);y.noAttack=true;y.noTrouble=true;await this.advance();return}
 return activate.call(this,uid,mode);
};
const resolve=Game.prototype.resolveTrouble;
Game.prototype.resolveTrouble=async function(a,options){const previous=this.troubleSource;this.troubleSource=a.uid;let result;try{result=await resolve.call(this,a,options)}finally{this.troubleSource=previous}
 if(result)for(const x of this.chars(1-a.owner))if(x.id==='P130'&&!x.cloaked&&!x.noseyUsed&&this.turn===a.owner){x.noseyUsed=true;this.draw(x.owner);this.say('Nosey Neighbor sees Trouble: Draw a card')}
 await this.flushEffects();return result;
};
