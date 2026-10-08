// Mordecai production implementation of Landon's Crazy Cat Lady Lab 1.3 / STANK-66 package.
import {Game,LEADERS} from './engine.js?v=mordecai-04-misdirection-01';

const CAT='Crazy Cat Lady', SHOEBOX='LAB-CAT-017', MITTENS='LAB-CAT-020', SNOWBALL='LAB-CAT-013', HAIRY='LAB-CAT-016', THREE='LAB-CAT-006', TUX='LAB-CAT-003';
LEADERS[CAT].passive='Strength in Numbers............ Mostly Numbers........ Probably.: At the start of your Turn, if you control fewer than 3 Cats, you may Stash one additional card this Turn. If you control 3 or more Cats, Draw an additional card.';

const boxesFor=(g,p)=>g.players[p].board.filter(x=>x.id===SHOEBOX);
const buriedCount=(g,p)=>boxesFor(g,p).reduce((n,b)=>n+(b.cargo?.length||0),0);

const baseStartTurn=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
 const p=this.turn,isCat=this.name(p)===CAT,catCount=isCat?this.chars(p).filter(x=>this.trait(x,'Cat')).length:0;
 const snowballs=this.chars(p).filter(x=>x.id===SNOWBALL).map(x=>x.uid);
 const result=baseStartTurn.call(this);
 for(const uid of snowballs){const x=this.obj(uid);if(x){x.snowballGrowth=(x.snowballGrowth||0)+1;this.say(`Snowball gets +1 permanent Power while it remains in play`)}}
 if(isCat){
   const s=this.players[p];s._catLadyStashLimit=catCount<3?2:1;s._catLadyStashCount=0;
   if(catCount>=3&&this.winner===null){this.draw(p,1);this.say('Strength in Numbers draws an additional card')}
   else this.say('Strength in Numbers lets Crazy Cat Lady Stash twice this Turn');
 }
 return result;
};

const baseCanStash=Game.prototype.canStash;
Game.prototype.canStash=function(index,p=this.turn){
 if(this.name(p)!==CAT)return baseCanStash.call(this,index,p);
 const s=this.players[p],limit=s._catLadyStashLimit??1,count=s._catLadyStashCount??(s.stashedThisTurn?1:0);
 return count<limit&&index>=0&&index<s.hand.length;
};
const baseStash=Game.prototype.stash;
Game.prototype.stash=function(index,p=this.turn){
 if(this.name(p)!==CAT)return baseStash.call(this,index,p);
 const s=this.players[p];if(!this.canStash(index,p))return false;
 const id=s.hand.splice(index,1)[0];s.stash.push(id);s._catLadyStashCount=(s._catLadyStashCount||0)+1;s.stashedThisTurn=true;s.fuel++;
 this.say(`${this.name(p)} Stashes a card · ${s.stash.length} total`);this.update?.();return true;
};

const basePower=Game.prototype.power;
Game.prototype.power=function(x){
 let v=basePower.call(this,x);
 if(x?.id===SNOWBALL)v+=x.snowballGrowth||0;
 if(x?.id===MITTENS)v+=x.mittensPermanentAttack||0;
 if(x&&this.trait(x,'Cat')&&buriedCount(this,x.owner)>=3)v++;
 return v;
};
const baseGuard=Game.prototype.guard;
Game.prototype.guard=function(x){
 let v=baseGuard.call(this,x)-(x?.hairballHealthLoss||0);
 if(x?.id===THREE&&x._threeLeggedProtected)v=Math.max(v,9999);
 return Math.max(0,v);
};

const baseAttack=Game.prototype.attack;
Game.prototype.attack=async function(uid){
 this._catAttackAttacker=uid;
 try{return await baseAttack.call(this,uid)}finally{this._catAttackAttacker=null}
};
const basePick=Game.prototype.pick;
Game.prototype.pick=function(title,p,targets,optional=false){
 if(title==='Attack which target?'&&this._catAttackAttacker){
   const opp=1-p,tuxedos=this.chars(opp).filter(x=>x.id===TUX&&!x.cloaked);
   if(tuxedos.length){
     targets=targets.filter(x=>x===-1||x.id===TUX||!this.trait(x,'Cat'));
     for(const tux of tuxedos)if(!targets.some(x=>x?.uid===tux.uid))targets.push(tux);
   }
 }
 return basePick.call(this,title,p,targets,optional);
};

const baseCombatDamage=Game.prototype.combatDamage;
Game.prototype.combatDamage=async function(entries){
 const hairy=(entries||[]).filter(([x,,kind])=>x?.id===HAIRY&&kind==='attack').map(([x])=>x.uid);
 const normal=[];
 for(const [x,n,kind] of entries||[]){
   if(kind==='attack'&&x?.id===THREE&&this.obj(x.uid)){
     x.threeLeggedAttackHits=(x.threeLeggedAttackHits||0)+1;
     if(x.threeLeggedAttackHits<=2){
       await this.damage(x,n,true);
       if(this.obj(x.uid)){
         x.damage=0;
         this.say(`I GOT 3 MORE ANYWAY — Three-Legged Cat survives Attack ${x.threeLeggedAttackHits} of 2 and removes all damage`);
       }
       continue;
     }
   }
   normal.push([x,n,kind]);
 }
 const result=normal.length?await baseCombatDamage.call(this,normal):undefined;
 if(hairy.length&&this.pendingAttack?.attacker){
   for(const uid of hairy){
     if(!this.obj(uid))continue;
     const attacker=this.obj(this.pendingAttack.attacker);
     if(attacker){attacker.hairball=true;attacker.hairballHealthLoss=(attacker.hairballHealthLoss||0)+1;this.say(`${this.card(attacker).name} gets a Hairball and permanently loses 1 Health`);await this.checkDefeat(attacker)}
   }
 }
 return result;
};

const readyStartTurn=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
 const p=this.turn,hairballed=this.chars(p).filter(x=>x.hairball).map(x=>x.uid);
 const result=readyStartTurn.call(this);
 for(const uid of hairballed){const x=this.obj(uid);if(x){x.ready=false;x.hairball=false;this.say(`${this.card(x).name} cannot Ready because of its Hairball`)}}
 this.update?.();return result;
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
 if(!x||!this.obj(x.uid)||where!=='discard'||this.card(x).type!=='Character'||!this.trait(x,'Cat')||!boxesFor(this,x.owner).length)return baseRemove.call(this,x,where,defeated);
 const p=x.owner,cardId=x.id,name=this.card(x).name;
 const use=await this.choose(p,`Shoebox of Dead Cats: put ${defeated?'defeated ':''}${name} face down under a Shoebox instead?`,[{label:'Put it in the Shoebox',value:true},{label:'Send it to discard',value:false}]);
 if(!use)return baseRemove.call(this,x,where,defeated);
 const boxes=boxesFor(this,p),chosen=boxes.length===1?boxes[0]:this.obj(await this.choose(p,'Choose a Shoebox',boxes.map((b,i)=>({label:`Shoebox ${i+1} · ${b.cargo?.length||0} buried`,value:b.uid}))));
 const before=this.players[p].discard.length;
 const result=await baseRemove.call(this,x,where,defeated);
 const box=chosen&&this.obj(chosen.uid);
 if(box){
   const discard=this.players[p].discard;let idx=-1;
   for(let i=discard.length-1;i>=before;i--)if(discard[i]===cardId){idx=i;break}
   if(idx>=0){box.cargo ||= [];box.cargo.push(discard.splice(idx,1)[0]);this.say(`Shoebox of Dead Cats buries ${name} face down (${buriedCount(this,p)} total)`)}
 }
 return result;
};

const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
 if(x?.id!==MITTENS)return baseCanUse.call(this,x);
 return !!this.canActivate(x)&&x.owner===this.turn&&(this.players[x.owner].stash.length>0||buriedCount(this,x.owner)>0);
};
const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
 const x=this.obj(uid);if(x?.id!==MITTENS)return baseActivate.call(this,uid,mode);
 const p=this.turn;if(!this.canUse(x))return;
 const buried=buriedCount(this,p),options=[];
 if(this.players[p].stash.length)options.push({label:'YUMMY! — discard 1 Stash for +1 permanent Power',value:'stash'});
 if(buried)options.push({label:`WHERE DID YOU GET THAT?! — discard ${buried} buried Cats for +${buried} permanent Power`,value:'shoebox'});
 const choice=mode||(options.length===1?options[0].value:await this.choose(p,'Mittens III: choose an ability',options));if(!choice)return;
 if(choice==='stash'){
   const s=this.players[p],index=s.stash.length-1,states=this.stashStates?.(p),ready=states?states[index]:s.fuel>0,id=s.stash.splice(index,1)[0];if(states)states.splice(index,1);s.discard.push(id);if(ready)s.fuel=Math.max(0,s.fuel-1);s.fuel=Math.min(s.fuel,s.stash.length);
   x.ready=false;x.mittensPermanentAttack=(x.mittensPermanentAttack||0)+1;this.say('Mittens III says YUMMY! and permanently gets +1 Power');return;
 }
 if(choice==='shoebox'){
   const count=buriedCount(this,p);if(!count)return;x.ready=false;
   for(const box of boxesFor(this,p)){if(box.cargo?.length){this.players[p].discard.push(...box.cargo);box.cargo=[]}}
   x.mittensPermanentAttack=(x.mittensPermanentAttack||0)+count;this.say(`WHERE DID YOU GET THAT?! Mittens III eats ${count} buried Cat${count===1?'':'s'} and permanently gets +${count} Power`);
 }
};

const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
 if(id==='LAB-CAT-018'){
   const buried=[];for(const box of boxesFor(this,p))for(let i=0;i<(box.cargo?.length||0);i++)buried.push({boxUid:box.uid,index:i,cardId:box.cargo[i]});
   if(!buried.length){this.say('Shovel digs around but finds no buried Cats');return}
   const pick=buried[Math.floor(Math.random()*buried.length)],box=this.obj(pick.boxUid);if(!box)return;
   const [cardId]=box.cargo.splice(pick.index,1),cat=this.enter(p,cardId);this.say(`Shovel digs up ${this.card(cardId).name}`);await this.enterEffect(cat,previous||[]);return;
 }
 if(id==='LAB-CAT-019'){
   this.say('Nine Lives, Zero Survivors wipes the table');
   const chars=this.players.flatMap(s=>s.board).filter(x=>this.card(x).type==='Character').map(x=>x.uid);
   for(const uid of chars){const x=this.obj(uid);if(x){this.say(`${this.card(x).name} is Defeated`);await this.remove(x,'discard',true)}}
   const items=this.players.flatMap(s=>s.board).filter(x=>this.card(x).type==='Item').map(x=>x.uid);
   for(const uid of items){const x=this.obj(uid);if(x)await this.dismiss(x)}
   for(let q=0;q<2;q++)while(this.players[q].hand.length<7&&this.winner===null){const n=this.draw(q,1,false);if(!n)break}
   this.say('Both players draw back to 7 cards');this.checkEnd();return;
 }
 return baseActionEffect.call(this,p,id,target,second,previous);
};
