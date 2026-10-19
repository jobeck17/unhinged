// Pawn Shop v0.1 isolated lab overlay. Canonical engine/data stay untouched.
const PS='Shady Pawn Shop Owner';
const ID={antique:'LAB-PS-001',gold:'LAB-PS-002',heirloom:'LAB-PS-003',grandma:'LAB-PS-004',
 dress:'LAB-PS-005',bad:'LAB-PS-006',junk:'LAB-PS-007',trash:'LAB-PS-008',clerk:'LAB-PS-009',refund:'LAB-PS-010'};
export function installPawnShop(Game,LEADERS){
 LEADERS[PS]={
  style:'Momentum',
  passive:'I Take the Risk, You Keep the Money: Once on your Turn, Rotate 3 Ready Stash to gain 1 Deal (max 4). At 2–3 Deals, Draw 2 instead of 1 in your Draw step and your Characters have Hothead. At 4 Deals, also Stash twice per Turn; your Characters get +1 Power, Hothead and Sucker Punch.'
 };
 const isPS=(g,p)=>g.name(p)===PS;
 const deals=(g,p)=>g.players[p]?.deals||0;
 const clamping=(n)=>Math.min(4,Math.max(0,n));
 const grandmaPresent=(g,p)=>g.chars(p).some(x=>x.id===ID.grandma);
 const clerkDiscount=(g,p,id)=>{
  const c=g.card(id);
  if(!isPS(g,p)||c?.type!=='Character'||!c.traits.includes('Customer'))return 0;
  return g.chars(p).filter(x=>x.id===ID.clerk&&x.clearanceActive&&!x.ready).length;
 };
 Game.prototype.canCloseDeal=function(p=this.turn){
  const s=this.players[p];
  return p===this.turn&&isPS(this,p)&&this.winner===null&&(s.deals||0)<4
   &&s.fuel>=3&&!s.closedDealThisTurn&&!this.pendingLastStraw;
 };
 Game.prototype.closeDeal=async function(p=this.turn){
  if(!this.canCloseDeal(p))return false;
  this.spendOwnStash(p,3);
  const s=this.players[p];s.deals=clamping(deals(this,p)+1);s.closedDealThisTurn=true;
  this.say('Pawn Shop Owner closes a Deal · '+s.deals+'/4 Deals');
  await this.advance();return true;
 };
 Game.prototype.canSpendPawnDeal=function(p){
  return isPS(this,p)&&deals(this,p)>0&&!(deals(this,p)===1&&grandmaPresent(this,p));
 };
 Game.prototype.spendPawnDeal=async function(p){
  if(!this.canSpendPawnDeal(p))return false;
  this.players[p].deals=clamping(deals(this,p)-1);
  this.say('Spends a Deal · '+deals(this,p)+'/4 remaining');
  // A changing Guard bonus can defeat a damaged Character immediately.
  for(const x of [...this.chars(p)])await this.checkDefeat(x);
  return true;
 };
 const start=Game.prototype.startTurn;
 Game.prototype.startTurn=function(){
  const p=this.turn,s=this.players[p];
  const rotated=isPS(this,p)?this.chars(p).filter(x=>x.id===ID.clerk&&!x.ready).map(x=>x.uid):[];
  s.pawnStashCount=0;s.closedDealThisTurn=false;s.clearancePending=[];
  const outcome=start.call(this);
  if(isPS(this,p)){
   for(const uid of rotated){
    const x=this.obj(uid);
    if(x){x.ready=false;x.clearanceActive=true;s.clearancePending.push(uid);}
   }
   if(deals(this,p)>=2&&!(this.round===1&&p===this.first)&&this.winner===null){
    this.draw(p,1,false);this.say('2+ Deals: Draws 2 this Turn instead of 1');
   }
  }
  return outcome;
 };
 Game.prototype.decideClearance=function(uid,keep=true){
  const p=this.turn,s=this.players[p],x=this.obj(uid);
  if(!isPS(this,p)||!s.clearancePending?.includes(uid)||!x)return false;
  s.clearancePending=s.clearancePending.filter(n=>n!==uid);
  if(!keep){x.ready=true;x.clearanceActive=false;this.say('Black Friday Employee ends the sale and Readies');}
  else this.say('Black Friday Employee stays Rotated for Customer discounts');
  this.update?.();return true;
 };
 const canStash=Game.prototype.canStash;
 Game.prototype.canStash=function(index,p=this.turn){
  if(!isPS(this,p))return canStash.call(this,index,p);
  const s=this.players[p],limit=deals(this,p)>=4?2:1;
  return p===this.turn&&index>=0&&index<s.hand.length&&(s.pawnStashCount||0)<limit;
 };
 const stash=Game.prototype.stash;
 Game.prototype.stash=function(index,p=this.turn){
  if(!isPS(this,p))return stash.call(this,index,p);
  if(!this.canStash(index,p))return false;
  const s=this.players[p];
  // Pawn Shop lab-only variant: each new face-down Stash slot enters Rotated.
  // Capture existing individual slot states before extending the Stash.
  const states=this.stashStates(p);
  const id=s.hand.splice(index,1)[0];
  s.stash.push(id);
  states.push(false);
  s.stashReady=states;
  s.stashedThisTurn=true;
  s.pawnStashCount=(s.pawnStashCount||0)+1;
  // Do not increase s.fuel: it becomes Ready at the next Ready step.
  this.say(`${this.name(p)} Stashes a card Rotated · ${s.stash.length} total`);
  return true;
 };
 const keyword=Game.prototype.keyword;
 Game.prototype.keyword=function(x,word){
  if(x&&isPS(this,x.owner)&&this.card(x)?.type==='Character'){
   if(word==='Hothead'&&deals(this,x.owner)>=2)return true;
   if(word==='Sucker Punch'&&deals(this,x.owner)>=4)return true;
   if(word==='Retaliate'&&x.id===ID.antique&&(x.pawnRetaliateAtHit||this.items(x).some(y=>y.id===ID.heirloom)))return true;
  }
  return keyword.call(this,x,word);
 };
 const power=Game.prototype.power;
 Game.prototype.power=function(x){return power.call(this,x)+(isPS(this,x.owner)&&deals(this,x.owner)>=4?1:0);};
 const guard=Game.prototype.guard;
 Game.prototype.guard=function(x){
  let v=guard.call(this,x);
  if(isPS(this,x.owner))v+=this.items(x).filter(item=>item.id===ID.heirloom).length*(deals(this,x.owner)===4?3:deals(this,x.owner)>=2?2:1);
  return v;
 };
 const trouble=Game.prototype.trouble;
 Game.prototype.trouble=function(x){
  return trouble.call(this,x)+(x?.id===ID.dress&&deals(this,x.owner)>=2?1:0);
 };
 const playCost=Game.prototype.playCost;
 Game.prototype.playCost=function(p,id){
  const s=this.players[p],prev=s.nextCharDiscount||0;
  if(!this._pawnApplyingDiscount)s.nextCharDiscount=prev+clerkDiscount(this,p,id);
  try{return playCost.call(this,p,id)}finally{s.nextCharDiscount=prev;}
 };
 const canPlay=Game.prototype.canPlay;
 Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand[index];
  if(id===ID.heirloom&&!this.chars(p).length)return false;
  if(id===ID.trash&&!this.players[p].discard.length)return false;
  if(id===ID.refund&&(!this.canSpendPawnDeal(p)||!this.chars(1-p).some(x=>this.card(x).cost<=4)))return false;
  const s=this.players[p],prev=s.nextCharDiscount||0,flag=this._pawnApplyingDiscount;
  if(!flag){s.nextCharDiscount=prev+clerkDiscount(this,p,id);this._pawnApplyingDiscount=true;}
  try{return canPlay.call(this,index,p)}finally{s.nextCharDiscount=prev;this._pawnApplyingDiscount=flag;}
 };
 const play=Game.prototype.play;
 Game.prototype.play=async function(index){
  const p=this.turn,s=this.players[p],id=s.hand[index],prev=s.nextCharDiscount||0,flag=this._pawnApplyingDiscount;
  s.nextCharDiscount=prev+clerkDiscount(this,p,id);this._pawnApplyingDiscount=true;
  try{return await play.call(this,index)}finally{s.nextCharDiscount=prev;this._pawnApplyingDiscount=flag;}
 };
 const enter=Game.prototype.enter;
 Game.prototype.enter=function(p,id,attach=null,...rest){
  return enter.call(this,p,id,id===ID.heirloom&&this._pawnAttachment!=null?this._pawnAttachment:attach,...rest);
 };
 const playCard=Game.prototype.playCard;
 Game.prototype.playCard=async function(p,id,source='hand',cost=0,options={}){
  let picked=null;
  if(id===ID.heirloom){
   if(!this.chars(p).length)return false;
   picked=await this.pick('Attach Family Heirloom to your Character',p,this.chars(p));
   if(picked==null)return false;
  }
  if(id===ID.refund){
   const legal=this.chars(1-p).filter(x=>this.card(x).cost<=4);
   if(!this.canSpendPawnDeal(p)||!legal.length)return false;
   picked=await this.pick('No Refunds: Dismiss opposing Character costing 4 or less',p,legal);
   if(picked==null)return false;
   options={...options,recklessTarget:picked};
  }
  const old=this._pawnAttachment;
  if(id===ID.heirloom)this._pawnAttachment=picked;
  try{return await playCard.call(this,p,id,source,cost,options)}
  finally{this._pawnAttachment=old;}
 };
 const enterEffect=Game.prototype.enterEffect;
 Game.prototype.enterEffect=async function(x,previous){
  if(x.id===ID.grandma){
   const s=this.players[x.owner];
   s.deals=clamping(deals(this,x.owner)+1);
   this.say('Sentimental Value: Grandma brings a Deal · '+s.deals+'/4');
   return;
  }
  if(x.id===ID.junk){
   const yes=await this.choose(x.owner,'Junkyard Visionary: Draw, then Discard?',[
    {label:'Draw 1, then Discard 1',value:true},{label:'Keep hand as is',value:false}]);
   if(yes)await this.rummage(x.owner);
   return;
  }
  if(x.id===ID.antique){
   const p=x.owner,s=this.players[p];
   if(!s.hand.length)return;
   const i=await this.pickHand(p,'Antique Holder: Stash an additional card?',()=>true,true);
   if(i!=null&&s.hand[i]){
    const states=this.stashStates(p);
    const id=s.hand.splice(i,1)[0];s.stash.push(id);
    states.push(false);s.stashReady=states;
    // Antique Holder's extra slot follows this lab's Rotated-on-entry rule.
    this.say('Antique Holder Stashes an additional card Rotated');
   }
   return;
  }
  if(x.id===ID.clerk)return;
  return enterEffect.call(this,x,previous);
 };
 // Retaliate is retained for the duration of a combat even if the Character is Defeated.
 const attack=Game.prototype.attack;
 Game.prototype.attack=async function(uid){
  const defenders=this.chars(1-this.turn).filter(x=>x.id===ID.antique&&this.items(x).some(i=>i.id===ID.heirloom));
  defenders.forEach(x=>{x.pawnRetaliateAtHit=true});
  try{return await attack.call(this,uid)}
  finally{defenders.forEach(x=>{delete x.pawnRetaliateAtHit})}
 };
 const actionEffect=Game.prototype.actionEffect;
 Game.prototype.actionEffect=async function(p,id,target,second,previous){
  const s=this.players[p];
  if(id===ID.gold){
   const n=deals(this,p)>=2?2:1;
   s.fuel=Math.min(s.stash.length,s.fuel+n);
   this.say("Moron's Gold Readies up to "+n+" Stash");return;
  }
  if(id===ID.trash){
   const i=await this.pickDiscard(p,"One Man's Trash: Return any card");
   if(i!=null)s.hand.push(...s.discard.splice(i,1));return;
  }
  if(id===ID.refund){
   if(await this.spendPawnDeal(p)){
    const victim=this.obj(target);if(victim)await this.dismiss(victim);
    this.say('No Refunds: Repossessed a Character');}
   return;
  }
  return actionEffect.call(this,p,id,target,second,previous);
 };
}