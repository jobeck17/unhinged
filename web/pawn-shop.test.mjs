// Canonical Shady Pawn Shop Owner first-test coverage.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Game,LEADERS} from './engine.js';
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
assert.equal(Object.keys(pawn.cards).length,10);
assert.equal(Object.values(pawn.cards).reduce((n,x)=>n+x,0),40);
const prompt=async req=>req.multi?req.options.slice(0,req.min||0).map(o=>o.value):req.options?.find(o=>o.value!==null)?.value??null;
function game(){let g=new Game(pool,{decks:[pawn,florida]},prompt,()=>{}, {firstPlayer:0});g.begin();return g}
function readyStash(g,p,n){const s=g.players[p];s.stash=Array(n).fill('P181');s.stashReady=Array(n).fill(true);s.fuel=n}

// Pawn Shop Stash enters Rotated; starts next Turn Ready. Opposing normal Stash still enters Ready.
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

// At 4 Deals, Pawn Shop may Stash twice, both newly Rotated.
{
 const g=game(),s=g.players[0];s.deals=4;
 assert(g.stash(0));assert(g.stash(0));assert(!g.stash(0));
 assert.deepEqual(g.stashStates(0),[false,false]);
 assert.equal(s.fuel,0);
 g.round=2;g.turn=0;g.startTurn();
 assert.deepEqual(g.stashStates(0),[true,true]);
 assert.equal(s.fuel,2);
}

// Antique Holder's additional Stash enters Rotated for Pawn Shop and Ready for non-Pawn Shop.
{
 const g=game(),s=g.players[0],x=g.enter(0,'P181');
 s.hand=['P184'];
 await g.enterEffect(x,[]);
 assert.deepEqual(g.stashStates(0),[false]);
 assert.equal(s.fuel,0);
 s.deals=1;readyStash(g,0,3);
 assert(g.canCloseDeal());
 assert(await g.closeDeal());
 assert.equal(s.deals,2);
 assert.equal(s.fuel,0);
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
 readyStash(g,0,1);s.hand=['P188'];s.discard.push('P184');
 assert(g.canPlay(0,0));await g.play(0);
 assert(s.hand.includes('P184'),"One Man's Trash returns a discarded card");
}

console.log('Canonical Pawn Shop: Stash timing, 4 Deals, Antique Holder, Deal thresholds/spending, Customer discount, No Refunds, discard retrieval PASS');
