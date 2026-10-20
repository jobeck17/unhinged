// Shady Pawn Shop Owner production card/Leader package. Canonical Momentum 40-card first-test build.
const PS='Shady Pawn Shop Owner';
const ID={antique:'P181',gold:'P182',heirloom:'P183',grandma:'P184',
 dress:'P185',bad:'P186',junk:'P187',trash:'P188',clerk:'P189',refund:'P190',lifetime:'P191',scalper:'P192'};
export function installPawnShop(Game,LEADERS){
 LEADERS[PS]={
  style:'Momentum',
  passive:'I Take the Risk, You Keep the Money: Once on your turn, Use 3 Ready Stash to gain 1 Deal (max 4). At 0–1 Deals, newly Stashed cards enter Used; at 2 or more Deals, they enter Ready. At 2 or more Deals, Draw 2 instead of 1 in your Draw step and your Characters have Hothead. At 4 Deals, also Stash twice per Turn; your Characters get +1 Power and Sucker Punch.'
 };
 const isPS=(g,p)=>g.name(p)===PS;
 const deals=(g,p)=>g.players[p]?.deals||0;
 const clamping=(n)=>Math.min(4,Math.max(0,n));
 const grandmaPresent=(g,p)=>g.chars(p).some(x=>x.id===ID.grandma);
 const clerkDiscount=(g,p,id)=>{
  const c=g.card(id);
  if(c?.type!=='Character'||!c.traits.includes('Customer'))return 0;
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
 Game.prototype.canSpendPawnDeals=function(p,n){
  return Number.isInteger(n)&&n>0&&deals(this,p)>=n&&(!grandmaPresent(this,p)||deals(this,p)-n>=1);
 };
 Game.prototype.canSpendPawnDeal=function(p){
  return this.canSpendPawnDeals(p,1);
 };
 Game.prototype.spendPawnDeal=async function(p){
  if(!this.canSpendPawnDeal(p))return false;
  this.players[p].deals=clamping(deals(this,p)-1);
  this.say('Spends a Deal · '+deals(this,p)+'/4 remaining');
  // A changing Guard bonus can defeat a damaged Character immediately.
  for(const x of [...this.chars(p)])await this.checkDefeat(x);
  return true;
 };
 Game.prototype.spendPawnDeals=async function(p,n){
  if(!this.canSpendPawnDeals(p,n))return false;
  this.players[p].deals=clamping(deals(this,p)-n);
  this.say('Spends '+n+' Deals · '+deals(this,p)+'/4 remaining');
  for(const x of [...this.chars(p)])await this.checkDefeat(x);
  return true;
 };
 const start=Game.prototype.startTurn;
 Game.prototype.startTurn=function(){
  const p=this.turn,s=this.players[p];
  const rotated=this.chars(p).filter(x=>x.id===ID.clerk&&!x.ready).map(x=>x.uid);
  // The Action's Trouble lock expires at the beginning of the owner's next Turn.
  for(const x of this.chars(p))delete x.pawnLifetimeNoTrouble;
  s.pawnStashCount=0;s.closedDealThisTurn=false;s.clearancePending=[];
  const outcome=start.call(this);
  for(const uid of rotated){
   const x=this.obj(uid);
   if(x){x.ready=false;x.clearanceActive=true;s.clearancePending.push(uid);}
  }
  if(isPS(this,p)){
   if(deals(this,p)>=2&&!(this.round===1&&p===this.first)&&this.winner===null){
    this.draw(p,1,false);this.say('2+ Deals: Draws 2 this Turn instead of 1');
   }
  }
  return outcome;
 };
 Game.prototype.decideClearance=function(uid,keep=true){
  const p=this.turn,s=this.players[p],x=this.obj(uid);
  if(!s.clearancePending?.includes(uid)||!x)return false;
  s.clearancePending=s.clearancePending.filter(n=>n!==uid);
  if(!keep){x.ready=true;x.clearanceActive=false;this.say('Black Friday Employee ends the sale and Readies');}
  else this.say('Black Friday Employee stays Exposed for Customer discounts');
  this.update?.();return true;
 };
 // In the Pawn Shop playtest, paying a card's printed Cost should not
 // interrupt every play with a Stash picker. Other Leaders retain manual Stash
 // selection, which matters to exchanges and specialist temporary Stash.
 const originalPreparePayment=Game.prototype.preparePayment;
 Game.prototype.preparePayment=async function(p,n){
  if(!isPS(this,p))return originalPreparePayment.call(this,p,n);
  this.stashPayment=null;
  if(n<=0)return true;
  if(this.availableFuel(p)<n)return false;
  const s=this.players[p],states=this.stashStates(p);
  // Preserve temporary face-up Stash when possible; choose the earliest Ready
  // ordinary slots first. This is equivalent to choosing these cards by hand.
  const ready=states.flatMap((isReady,i)=>isReady?[i]:[]);
  const regular=ready.filter(i=>!s.tempStashCard||s.stash[i]!==s.tempStashCard);
  const temporary=ready.filter(i=>s.tempStashCard&&s.stash[i]===s.tempStashCard);
  const picks=[...regular,...temporary].slice(0,n);
  if(picks.length!==n)return false;
  this.stashPayment=[{owner:p,picks}];
  return true;
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
  // Deal-based entry timing: 0–1 Deals -> Rotated; 2+ Deals -> Ready.
  // Capture individual slot states BEFORE adding the new Stash slot.
  const states=this.stashStates(p);
  const id=s.hand.splice(index,1)[0];
  const ready=deals(this,p)>=2;
  s.stash.push(id);
  states.push(ready);
  s.stashReady=states;
  if(ready)s.fuel++;
  s.stashedThisTurn=true;
  s.pawnStashCount=(s.pawnStashCount||0)+1;
  this.say(`${this.name(p)} Stashes a card ${ready?'Ready':'Used'} · ${s.stash.length} total`);
  return true;
 };
 const keyword=Game.prototype.keyword;
 Game.prototype.keyword=function(x,word){
  if(x&&this.card(x)?.type==='Character'){
   if(isPS(this,x.owner)&&word==='Hothead'&&deals(this,x.owner)>=2)return true;
   if(isPS(this,x.owner)&&word==='Sucker Punch'&&deals(this,x.owner)>=4)return true;
   if(word==='Retaliate'&&x.id===ID.antique&&(x.pawnRetaliateAtHit||this.items(x).some(y=>y.id===ID.heirloom)))return true;
  }
  return keyword.call(this,x,word);
 };
 const power=Game.prototype.power;
 Game.prototype.power=function(x){return power.call(this,x)+(isPS(this,x.owner)&&deals(this,x.owner)>=4?1:0);};
 const guard=Game.prototype.guard;
 Game.prototype.guard=function(x){
  let v=guard.call(this,x);
  v+=this.items(x).filter(item=>item.id===ID.heirloom).length*(deals(this,x.owner)===4?3:deals(this,x.owner)>=2?2:1);
  return v;
 };
 const trouble=Game.prototype.trouble;
 Game.prototype.trouble=function(x){
  return trouble.call(this,x)+(x?.id===ID.dress&&deals(this,x.owner)>=2?1:0);
 };
 // Cost checks for other Styles must be pure: don't even add an empty
 // nextCharDiscount property while inspecting or cancelling a non-Customer.
 const canCauseTrouble=Game.prototype.canCauseTrouble;
 Game.prototype.canCauseTrouble=function(x){
  return !x?.pawnLifetimeNoTrouble&&canCauseTrouble.call(this,x);
 };
 const playCost=Game.prototype.playCost;
 Game.prototype.playCost=function(p,id){
  const add=this._pawnApplyingDiscount?0:clerkDiscount(this,p,id);
  if(!add)return playCost.call(this,p,id);
  const s=this.players[p],had=Object.prototype.hasOwnProperty.call(s,'nextCharDiscount'),prev=s.nextCharDiscount;
  s.nextCharDiscount=(prev||0)+add;
  try{return playCost.call(this,p,id)}
  finally{if(had)s.nextCharDiscount=prev;else delete s.nextCharDiscount;}
 };
 const canPlay=Game.prototype.canPlay;
 Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand[index];
  if(id===ID.heirloom&&!this.chars(p).length)return false;
  if(id===ID.trash&&!this.players[p].discard.length)return false;
  if(id===ID.refund&&(!this.canSpendPawnDeal(p)||!this.chars(1-p).some(x=>this.card(x).cost<=4)))return false;
  if(id===ID.lifetime&&!this.canSpendPawnDeals(p,2))return false;
  const add=this._pawnApplyingDiscount?0:clerkDiscount(this,p,id);
  if(!add)return canPlay.call(this,index,p);
  const s=this.players[p],had=Object.prototype.hasOwnProperty.call(s,'nextCharDiscount'),prev=s.nextCharDiscount,flag=this._pawnApplyingDiscount;
  s.nextCharDiscount=(prev||0)+add;this._pawnApplyingDiscount=true;
  try{return canPlay.call(this,index,p)}
  finally{if(had)s.nextCharDiscount=prev;else delete s.nextCharDiscount;this._pawnApplyingDiscount=flag;}
 };
 const play=Game.prototype.play;
 Game.prototype.play=async function(index){
  const p=this.turn,s=this.players[p],id=s.hand[index],add=this._pawnApplyingDiscount?0:clerkDiscount(this,p,id);
  if(!add)return play.call(this,index);
  const had=Object.prototype.hasOwnProperty.call(s,'nextCharDiscount'),prev=s.nextCharDiscount,flag=this._pawnApplyingDiscount;
  s.nextCharDiscount=(prev||0)+add;this._pawnApplyingDiscount=true;
  try{return await play.call(this,index)}
  finally{
   const consumed=s.nextCharDiscount===0&&this.card(id)?.type==='Character';
   if(consumed)s.nextCharDiscount=0;
   else if(had)s.nextCharDiscount=prev;
   else delete s.nextCharDiscount;
   this._pawnApplyingDiscount=flag;
  }
 };
 const playCard=Game.prototype.playCard;
 Game.prototype.playCard=async function(p,id,source='hand',cost=0,options={}){
  let picked=null;
  if(id===ID.lifetime&&!this.canSpendPawnDeals(p,2))return false;
  if(id===ID.refund){
   const legal=this.chars(1-p).filter(x=>this.card(x).cost<=4);
   if(!this.canSpendPawnDeal(p)||!legal.length)return false;
   picked=await this.pick('No Refunds: Dismiss opposing Character costing 4 or less',p,legal);
   if(picked==null)return false;
   options={...options,recklessTarget:picked};
  }
  return playCard.call(this,p,id,source,cost,options);
 };
 const enterEffect=Game.prototype.enterEffect;
 Game.prototype.enterEffect=async function(x,previous){
  if(x.id===ID.scalper){
   const p=x.owner;
   const legal=this.chars(1-p).filter(y=>this.card(y).cost<=3);
   if(this.canSpendPawnDeal(p)&&legal.length){
    const yes=await this.choose(p,'Pawn Shop Scalper: Spend 1 Deal for Resell Value?',[
     {label:'Spend 1 Deal and scalp a Character',value:true},
     {label:'Keep the Deal',value:false}
    ]);
    if(yes){
     const picked=await this.pick('Resell Value: Choose an opposing Character costing 3 or less',p,legal);
     if(picked!=null&&legal.some(y=>y.uid===picked)&&this.obj(picked)&&await this.spendPawnDeal(p)){
      const victim=this.obj(picked);
      if(victim)await this.dismiss(victim);
      this.draw(p,1);
      this.say('Pawn Shop Scalper resells a Character for double');
     }
    }
   }
   return;
  }
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
    // An additional Stash follows the same threshold as the regular Stash.
    // Other Leaders still get normal Ready-on-entry Stash.
    const ready=!isPS(this,p)||deals(this,p)>=2;
    states.push(ready);s.stashReady=states;
    if(ready)s.fuel++;
    this.say('Antique Holder Stashes an additional card '+(ready?'Ready':'Used'));
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
  if(id===ID.lifetime){
   if(await this.spendPawnDeals(p,2)){
    for(const x of this.chars(p)){
     x.ready=true;
     x.pawnLifetimeNoTrouble=true;
    }
    this.say('The Deal of a Lifetime: All Characters Ready for another Attack, not Trouble');
   }
   return;
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