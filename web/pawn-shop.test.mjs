// Canonical Shady Pawn Shop Owner first-test coverage.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Game,LEADERS} from './engine.js?v=mordecai-04-meatshield-01';
import './cat-lady.js';
import './reckless.js';
import './stonewall.js';
import './magician.js';
import {installPawnShop} from './pawn-shop.js';

installPawnShop(Game,LEADERS);
const pool=JSON.parse(readFileSync(new URL('../CARDS.json',import.meta.url),'utf8'));
const doc=JSON.parse(readFileSync(new URL('../DECKS.json',import.meta.url),'utf8'));
const pawn=doc.decks.find(d=>d.leader==='Shady Pawn Shop Owner');
const florida=doc.decks.find(d=>d.leader==='Florida Man');
assert(pawn&&florida);
assert.equal(Object.keys(pawn.cards).length,13);
assert.equal(pawn.cards.P193,2);
assert.equal(pawn.cards.P187,2);
assert.equal(pawn.cards.P192,2);
assert.equal(pawn.cards.P185,2);
assert.equal(pawn.cards.P191,2);
assert.equal(pawn.cards.P186,2);
assert.equal(Object.values(pawn.cards).reduce((n,x)=>n+x,0),40);
const prompt=async req=>req.multi?req.options.slice(0,req.min||0).map(o=>o.value):req.options?.find(o=>o.value!==null)?.value??null;
function game(){let g=new Game(pool,{decks:[pawn,florida]},prompt,()=>{}, {firstPlayer:0});g.begin();return g}
function readyStash(g,p,n){const s=g.players[p];s.stash=Array(n).fill('P181');s.stashReady=Array(n).fill(true);s.fuel=n}

// With 0–1 Deals, Pawn Shop Stash enters Rotated and Readies next Turn. Opponents' normal Stash enters Ready.
{
 const g=game(),s=g.players[0];
 assert(g.stash(0), 'First Pawn Shop Stash should be allowed');
 assert.equal(s.fuel,0);
 assert.deepEqual(g.stashStates(0),[false]);
 assert(!g.canCloseDeal());
 assert(!g.stash(0),'Only one Stash without 4 Deals');
 g.round=2;g.turn=0;g.startTurn();
 assert.equal(s.fuel,1);
 assert.deepEqual(g.stashStates(0),[true]);
 assert(g.stash(0));
 assert.deepEqual(g.stashStates(0),[true,false]);
 g.turn=1;g.startTurn();
 assert(g.stash(0,1));
 assert.equal(g.players[1].fuel,1);
 assert.deepEqual(g.stashStates(1),[true]);
}

// At 2+ Deals, a newly Stashed card enters Ready immediately.
// At 4 Deals, both of the two allowed Stashes enter Ready.
for(const deals of [0,1,2,3,4]){
 const g=game(),s=g.players[0];s.deals=deals;
 assert(g.stash(0));
 assert.deepEqual(g.stashStates(0),[deals>=2],deals+' Deals readiness');
 assert.equal(s.fuel,deals>=2?1:0,deals+' Deals current resource');
 const second=g.stash(0);
 assert.equal(second,deals===4,deals+' Deals second Stash permission');
 if(deals===4){
  assert.deepEqual(g.stashStates(0),[true,true]);
  assert.equal(s.fuel,2);
  assert(!g.stash(0));
 }
}
// Hitting the threshold mid-Turn affects subsequent Stashes, not previous slots.
{
 const g=game(),s=g.players[0];
 s.deals=1;
 assert(g.stash(0));
 assert.deepEqual(g.stashStates(0),[false]);
 s.deals=4;
 assert(g.stash(0));
 assert.deepEqual(g.stashStates(0),[false,true]);
 assert.equal(s.fuel,1);
 s.deals=1;g.stashStates(0);
 assert.deepEqual(g.stashStates(0),[false,true],'Prior Stash state never changes retroactively');
}

// Antique Holder's bonus Stash matches the Deals threshold (even at 4 Deals).
for(const deals of [0,1,2,3,4]){
 const g=game(),s=g.players[0],x=g.enter(0,'P181');
 s.deals=deals;s.hand=['P184'];
 await g.enterEffect(x,[]);
 assert.deepEqual(g.stashStates(0),[deals>=2],deals+' Deals: Antique Holder Stash');
 assert.equal(s.fuel,deals>=2?1:0);
}
// Closing a Deal to reach 2 lets the *next* new Stash enter Ready.
{
 const g=game(),s=g.players[0];
 s.deals=1;readyStash(g,0,3);
 assert(g.canCloseDeal());
 assert(await g.closeDeal());
 assert.equal(s.deals,2);
 assert.equal(s.fuel,0);
 s.hand=['P185'];
 assert(g.stash(0));
 assert.deepEqual(g.stashStates(0),[false,false,false,true]);
 assert.equal(s.fuel,1);
}
// Antique Holder used by another Leader follows normal Ready-on-entry timing.
{
 const g=game(),s=g.players[1],x=g.enter(1,'P181');
 s.hand=['P185'];
 await g.enterEffect(x,[]);
 assert.deepEqual(g.stashStates(1),[true]);
 assert.equal(s.fuel,1);
}

// Family Heirloom must use the normal attachment picker, not enter unattached
// or allow a play without an eligible friendly Character.
{
 const g=game(),s=g.players[0];
 readyStash(g,0,3);s.hand=['P183'];
 assert.equal(g.canPlay(0),false,'Heirloom cannot be played without a Character');
 const first=g.enter(0,'P181'),second=g.enter(0,'P185');
 assert.equal(g.canPlay(0),true,'Heirloom becomes playable with a Character');
 let prompts=[];
 const originalPick=g.pick;
 g.pick=async function(title,p,targets,...args){
  if(title==='Attach to your Character'){
   prompts.push({p,targets:targets.map(t=>t.uid)});
   return second.uid;
  }
  return originalPick.call(this,title,p,targets,...args);
 };
 await g.play(0);
 assert.equal(prompts.length,1,'single normal attachment prompt');
 assert.deepEqual(prompts[0].targets,[first.uid,second.uid],'both Characters are legal targets');
 assert(!g.items(first).some(x=>x.id==='P183'),'did not attach to first Character');
 assert(g.items(second).some(x=>x.id==='P183'),'attached to selected second Character');
 assert.equal(g.guard(second),3,'Heirloom improves selected Character Guard');
 assert.equal(s.fuel,1,'paid exactly two Ready Stash');
}
{
 const g=game(),s=g.players[0],x=g.enter(0,'P181');
 readyStash(g,0,3);s.hand=['P183'];
 g.pick=async (title)=>title==='Attach to your Character'?null:undefined;
 const before=s.fuel;
 await g.play(0);
 assert.equal(s.fuel,before,'canceling attachment does not pay');
 assert.deepEqual(s.hand,['P183'],'canceling attachment retains card in hand');
 assert.equal(g.items(x).length,0,'no unattached item remains');
}
// All Deal effects and attached bonuses are dynamic, including spending to lose a threshold.
{
 const g=game(),s=g.players[0],x=g.enter(0,'P181');x.born=0;
 s.deals=0;readyStash(g,0,5);s.hand=['P183'];
 assert(g.canPlay(0,0));
 await g.play(0);
 assert(g.items(x).some(y=>y.id==='P183'));
 assert.equal(g.guard(x),6);
 assert(g.keyword(x,'Retaliate'));
 s.deals=2;assert.equal(g.guard(x),7);
 s.deals=4;assert.equal(g.guard(x),8);assert.equal(g.power(x),4);
 const grandma=g.enter(0,'P184');s.deals=0;await g.enterEffect(grandma,[]);
 assert.equal(s.deals,1);
 assert.equal(g.canSpendPawnDeal(0),false,'Grandma protects the final Deal');
 s.deals=2;assert.equal(g.canSpendPawnDeal(0),true);
 assert(await g.spendPawnDeal(0));
 assert.equal(s.deals,1);
 assert.equal(g.guard(x),6,'The Heirloom bonus falls as Deals are spent');
}

// Customer discount, spending a Deal for No Refunds, and One Man's Trash all resolve.
{
 const g=game(),s=g.players[0];
 const worker=g.enter(0,'P189');worker.ready=false;worker.clearanceActive=true;
 readyStash(g,0,1);s.hand=['P185'];
 assert.equal(g.playCost(0,'P185'),1);
 assert(g.canPlay(0,0));await g.play(0);
 assert(g.chars(0).some(x=>x.id==='P185'));
 assert.equal(s.fuel,0);
 readyStash(g,0,4);s.deals=2;s.hand=['P190'];
 const foe=g.enter(1,'P001');
 assert(g.canPlay(0,0));
 await g.play(0);
 assert(!g.obj(foe.uid),'No Refunds dismisses a low-cost enemy');
 assert.equal(s.deals,1);
 readyStash(g,0,1);s.hand=['P188'];s.discard=['P184'];
 assert(g.canPlay(0,0));await g.play(0);
 assert(s.hand.includes('P184'),"One Man's Trash returns a discarded card");
}

// The Deal of a Lifetime costs 2 Ready Stash AND exactly 2 Deals.
// It Readies the team for new Attacks, not additional Trouble, even after later Readies.
{
 const g=game(),s=g.players[0];
 const a=g.enter(0,'P185'),b=g.enter(0,'P186');
 const foe=g.enter(1,'P001');foe.ready=false; // A legal attack target is needed by the engine.
 g.round=2;a.born=1;b.born=1;a.ready=false;b.ready=false;
 s.deals=4;readyStash(g,0,3);s.hand=['P191'];
 assert(g.canPlay(0),'4 Deals and Ready Stash allow the Action');
 await g.play(0);
 assert.equal(s.deals,2,'spends 2 Deals');
 assert.equal(s.fuel,1,'Cost 2 rotates 2 Ready Stash');
 assert(a.ready&&b.ready,'readies all Characters');
 assert(g.canAttack(a),'readied Character can Attack again');
 assert(!g.canCauseTrouble(a),'readied Character cannot Cause Trouble');
 a.ready=false;a.ready=true;
 assert(!g.canCauseTrouble(a),'extra Ready cannot lift the Trouble restriction');
 assert(s.discard.includes('P191'),'the Action enters discard');
 g.startTurn();
 assert(g.canCauseTrouble(a),'restriction clears next owner Turn');
}
// Grandma's last Deal stays protected, including for a 2-Deal spend.
{
 const g=game(),s=g.players[0],grandma=g.enter(0,'P184');
 const c=g.enter(0,'P185');c.ready=false;
 readyStash(g,0,2);s.hand=['P191'];s.deals=2;
 assert(!g.canPlay(0),'cannot spend 2 and leave Grandma with 0');
 assert.equal(s.deals,2);
 s.deals=3;assert(g.canPlay(0));
 await g.play(0);
 assert.equal(s.deals,1,'Grandma holds the last Deal');
 assert(c.ready);
}
// A legal Momentum hybrid can also spend Deals; 0–1 Deals cannot pay the cost.
{
 const g=game(),s=g.players[1];g.turn=1;readyStash(g,1,2);
 s.hand=['P191'];s.deals=1;
 assert(!g.canPlay(0,1));
 s.deals=2;
 assert(g.canPlay(0,1),'hybrid can use the Action');
 await g.play(0);
 assert.equal(s.deals,0);
}

// Scalper offers a real choice: free 4-Cost body, or one Deal to Dismiss
// a Ready OR Rotated opposing Character costing <=3 and Draw once.
{
 const g=game(),p=0,s=g.players[p],victim=g.enter(1,'P002');
 const card=g.enter(p,'P192');s.deals=2;
 const before=s.hand.length;
 await g.enterEffect(card,[]);
 assert(!g.obj(victim.uid),'Scalper Dismisses a Ready opponent');
 assert.equal(s.deals,1,'Spends exactly one Deal');
 assert.equal(s.hand.length,before+1,'Successful resale Draws 1');
}
{
 const g=game(),s=g.players[0],victim=g.enter(1,'P181'); // printed Cost 3
 victim.ready=false;
 s.deals=0;
 const card=g.enter(0,'P192');await g.enterEffect(card,[]);
 assert(g.obj(victim.uid),'Scalper has no Deal, so no free removal');
 assert.equal(s.deals,0);
}
{
 const choice=async req=>{
  if(req.title?.includes('Pawn Shop Scalper'))return false;
  return req.options?.[0]?.value??null;
 };
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();g.players[0].deals=2;
 const victim=g.enter(1,'P002'),card=g.enter(0,'P192');
 await g.enterEffect(card,[]);
 assert(g.obj(victim.uid),'Declining Resell Value leaves victim alive');
 assert.equal(g.players[0].deals,2,'Declining has no Deal cost');
}
{
 const g=game(),s=g.players[0],victim=g.enter(1,'P181'),grandma=g.enter(0,'P184');
 s.deals=1;
 const card=g.enter(0,'P192');await g.enterEffect(card,[]);
 assert(g.obj(victim.uid),'Grandma protects last Deal from Scalper');
 assert.equal(s.deals,1);
}
{
 const g=game(),s=g.players[0],victim=g.enter(1,'P125'); // Cost 4 or higher
 assert(g.card(victim).cost>3,'fixture above the target limit');
 s.deals=2;
 const card=g.enter(0,'P192');await g.enterEffect(card,[]);
 assert(g.obj(victim.uid),'Scalper cannot Dismiss a costly opponent');
 assert.equal(s.deals,2);
}

// Haggler's Character coupon works for the NEXT Character only, stacks with
// Black Friday Employee and cannot carry into another Turn.
{
 const choice=async req=>req.title?.includes('Haggler')?'character':prompt(req);
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();const s=g.players[0];
 readyStash(g,0,8);s.hand=['P193','P192','P185'];
 assert(g.canPlay(0));await g.play(0);
 assert.equal(s.fuel,6,'Haggler costs 2 Stash');
 assert.equal(g.playCost(0,'P192'),2,'next 4-Cost Character costs 2');
 await g.play(0);
 assert.equal(s.fuel,4,'Scalper charged 2 Stash');
 assert.equal(g.playCost(0,'P185'),2,'coupon consumed once');
 await g.play(0);
 assert.equal(s.fuel,2,'third Character is normal price');
}
{
 const choice=async req=>req.title?.includes('Haggler')?'character':prompt(req);
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();const s=g.players[0];readyStash(g,0,4);
 s.hand=['P193'];await g.play(0);
 assert.equal(s.pawnHaggleCharDiscount,2);
 g.turn=0;g.startTurn();
 assert.equal(s.pawnHaggleCharDiscount,0,'unused Character coupon expires');
}
// A Deal discount can make a one-Deal ability FREE, or a two-Deal Action
// cost one Deal. It is consumed only by a successful payment.
{
 const choice=async req=>req.title?.includes('Haggler')?'deal':prompt(req);
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();const s=g.players[0];s.deals=1;readyStash(g,0,8);
 const foe=g.enter(1,'P001');s.hand=['P193','P192'];
 await g.play(0);
 assert.equal(s.pawnHaggleDealDiscount,1,'coupon ready');
 assert(g.canSpendPawnDeal(0),'one Deal cost can be paid for zero');
 await g.play(0);
 assert(!g.obj(foe.uid),'Scalper Dismisses without consuming the one Deal');
 assert.equal(s.deals,1);
 assert.equal(s.pawnHaggleDealDiscount,0,'coupon used once');
 assert(!g.canSpendPawnDeals(0,2),'two-Deal play no longer discounted');
}
{
 const choice=async req=>req.title?.includes('Haggler')?'deal':prompt(req);
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();const s=g.players[0];s.deals=1;readyStash(g,0,8);
 const friend=g.enter(0,'P185');friend.ready=false;
 s.hand=['P193','P191'];await g.play(0);
 assert(g.canPlay(0),'two-Deal Action costs one Deal with coupon');
 await g.play(0);
 assert.equal(s.deals,0,'two-Deal action spends one actual Deal');
 assert.equal(s.pawnHaggleDealDiscount,0,'two-Deal payment consumes coupon');
 assert(friend.ready,'Action still Readies team');
}
{
 const choice=async req=>req.title?.includes('Haggler')?'deal':prompt(req);
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();const s=g.players[0];s.deals=1;readyStash(g,0,3);
 const grandma=g.enter(0,'P184');s.hand=['P193'];
 await g.play(0);
 assert(g.canSpendPawnDeal(0),'Grandma allows free Deal spend');
 assert(!g.canSpendPawnDeals(0,2),'Grandma still protects last actual Deal');
 g.turn=0;g.startTurn();
 assert.equal(s.pawnHaggleDealDiscount,0,'unused Deal discount expires');
 assert.equal(s.deals,1);
}

// Paying Pawn Shop card Costs uses Ready Stash automatically.
// Normal opposing Leaders still get a choice when several Ready Stash slots exist.
{
 const notices=[],choice=async req=>{
  if(req.title?.startsWith('Pay cost:'))notices.push(req.title);
  return req.multi?req.options.slice(0,req.min||0).map(x=>x.value):req.options?.find(x=>x.value!==null)?.value??null;
 };
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();
 const s=g.players[0];
 s.hand=['P186'];readyStash(g,0,5);
 assert(g.canPlay(0));
 await g.play(0);
 assert(g.chars(0).some(x=>x.id==='P186'),'Pawn Shop Character entered play');
 assert.equal(s.fuel,2,'Cost 3 rotated exactly three Ready Stash');
 assert.deepEqual(g.stashStates(0),[false,false,false,true,true]);
 assert.deepEqual(notices,[],'Pawn Shop does not open repeated Stash payment picker');
 // A 0-cost play never prompts or spends Stash.
 s.hand=['P185'];s.nextCharDiscount=2;
 const fuel=s.fuel;await g.play(0);
 assert.equal(s.fuel,fuel);
 assert.deepEqual(notices,[]);
 g.turn=1;
 const enemy=g.players[1];
 enemy.hand=['P002'];readyStash(g,1,3);
 assert(g.canPlay(0,1));
 await g.play(0);
 assert.equal(notices.length,1,'Other Leaders retain manual payment selection');
}
// Auto-payment prioritizes ordinary slots when a temporary Stash is present.
{
 const choice=async req=>{
  if(req.title?.startsWith('Pay cost:'))throw Error('Unexpected Pawn Shop Stash picker');
  return req.multi?req.options.slice(0,req.min||0).map(x=>x.value):req.options?.find(x=>x.value!==null)?.value??null;
 };
 const g=new Game(pool,{decks:[pawn,florida]},choice,()=>{}, {firstPlayer:0});
 g.begin();const s=g.players[0];
 readyStash(g,0,3);
 s.stash=['P181','P182','P189'];
 s.tempStashCard='P189';
 s.hand=['P184'];
 await g.play(0);
 assert.equal(s.fuel,1);
 assert(s.stash.includes('P189'),'Temporary Stash should not be spent before normal Stash');
 assert.deepEqual(g.stashStates(0),[false,false,true]);
}

// Staff's Customer discount also works in a normal two-Style hybrid, not only under Pawn Shop.
{
 const g=game();g.turn=1;
 const staff=g.enter(1,'P189');staff.ready=false;
 g.startTurn();
 assert.equal(g.players[1].clearancePending?.length,1);
 assert(g.decideClearance(staff.uid,true));
 assert.equal(staff.ready,false);
 readyStash(g,1,1);g.players[1].hand=['P185'];
 assert.equal(g.playCost(1,'P185'),1);
 const next=g.enter(1,'P189');next.ready=false;
 g.startTurn();
 assert(g.decideClearance(next.uid,false),'Other Leaders can Ready their Employee');
 assert.equal(next.ready,true);
}

console.log('Canonical Pawn Shop: 0–1 Rotated Stash, 2+ Ready Stash, 4-Deal double Stash, threshold transitions, Antique Holder, automatic Stash cost payment, Deal spending, Customer discounts and Actions PASS');
