import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game,LEADERS} from './engine.js?v=mordecai-04-misdirection-01';
import './cat-lady.js';
import './rockstar.js';
import './reckless.js';
import './stonewall.js';
import {MISDIRECTION_IDS} from './magician.js';
import {aiAction,aiChoice} from './ai.js';
const pool=JSON.parse(fs.readFileSync(new URL('../CARDS.json',import.meta.url))),doc=JSON.parse(fs.readFileSync(new URL('../DECKS.json',import.meta.url)));
const magician=doc.decks.find(d=>d.leader==='Birthday Party Magician'),hoa=doc.decks.find(d=>d.leader==='HOA President');
const covered=new Set(),actions=new Set();let checks=0;
const eq=(a,b,message)=>{assert.deepEqual(a,b,message);checks++},ok=(v,message)=>{assert(v,message);checks++};
function fixture(decide){let g;g=new Game(pool,{decks:[magician,hoa]},async r=>{const chosen=decide?.(r,g);return chosen!==undefined?chosen:r.multi?r.options.slice(0,r.min||r.max||2).map(o=>o.value):r.options[0]?.value??null},()=>{},{firstPlayer:0});g.round=3;g.turn=0;g.turnSerial=5;for(const s of g.players){Object.assign(s,{board:[],hand:[],discard:[],deck:Array(80).fill('P001'),stash:Array(20).fill('P001'),fuel:20,stashReady:Array(20).fill(true)})}return g}
function body(g,id,p=0,cooled=true){if(MISDIRECTION_IDS.has(id))covered.add(id);const x=g.enter(p,id);if(cooled)x.born=0;return x}
async function play(g,id,{cost=g.card(id).cost}={}){covered.add(id);if(g.card(id).type==='Action')actions.add(id);const s=g.players[0],index=s.hand.length;s.hand.push(id);const result=await g.playCard(0,id,'hand',cost,{index});ok(result,'played '+id);return result}
function declineReturns(r){if(/Return another friendly/.test(r.title))return null}
// Exact locked pool, names, curve and deck coverage. No banked duplicates surface.
const active=pool.cards.filter(c=>c.style==='Misdirection'&&!['banked','retired','pending-redesign'].includes(c.status)&&['Character','Action','Item'].includes(c.type));
eq(new Set(active.map(c=>c.id)),MISDIRECTION_IDS,'exact 32-card active pool');
eq(active.map(c=>c.name).length,new Set(active.map(c=>c.name)).size,'no duplicate names');
eq([1,2,3,4,5,6].map(cost=>active.filter(c=>c.cost===cost).length),[6,10,9,4,2,1],'cost curve');
eq(['Character','Action','Item'].map(t=>active.filter(c=>c.type===t).length),[19,10,3],'pool types');
eq(Object.values(magician.cards).reduce((a,b)=>a+b,0),40,'40-card deck');
eq(['Character','Action','Item'].map(t=>Object.entries(magician.cards).reduce((sum,[id,n])=>sum+(pool.cards.find(c=>c.id===id).type===t?n:0),0)),[26,10,4],'baseline types');
ok(magician.audit_card_ids.every(id=>magician.cards[id]),'all designs in baseline');
ok(Object.values(magician.cards).every(n=>n<=4),'legal copy limits');
eq(active.filter(c=>c.traits.includes('Magical')).map(c=>c.id).sort(),['P061','P063','P065','LAB-MAG-003','LAB-MAG-006'].sort(),'exact five Magical');
ok(LEADERS['Birthday Party Magician'].passive.includes('The Show Must Go On'),'leader passive title');
// All ten Actions: mandatory targets, ownership, actual outcomes and payment.
{
 const g=fixture(),low=body(g,'P121',1),high=body(g,'P136',1);await play(g,'P081');eq(low.ready,false,'Look Over There rotates');ok(!low.skipReady,'no extra skipped Ready step');
 await play(g,'P085');eq(g.players[0].hand.length,2,'Ace draws two');eq(g.players[0].fuel,16,'1 + 3 paid');
 const h=g.players[0].hand.length;await play(g,'LAB-MAG-002');eq(g.players[0].hand.length,h+1,'Encore standalone Draw 1');
 await g.remove(low,'hand');high.ready=true;await play(g,'P082');ok(!g.obj(high.uid),'single opposing target returns without cost cap');ok(g.players[1].hand.includes('P136'),'owner hand');
}
{
 const g=fixture(r=>r.title.startsWith('Choose Your Fate: choose which')?r.options[1].value:undefined),a=body(g,'P121',1),b=body(g,'P136',1);await play(g,'P082');ok(g.obj(a.uid)&&!g.obj(b.uid),'opponent chooses from two selected targets');
}
{
 const g=fixture(),item=body(g,'P149',1),character=body(g,'P121',1);item.attached=character.uid;await play(g,'P142');ok(!g.obj(item.uid)&&g.obj(character.uid),'Vanishing Act bounces attachment, leaves character');eq(g.players[0].hand.length,1,'Vanishing Act draws');eq(g.players[1].hand,['P149'],'opposing owner hand');
}
{
 const g=fixture(r=>r.title.startsWith('Pay cost:')?[2]:r.title==='Exchange: choose a Stash card'?1:undefined),s=g.players[0];s.stash=['P061','P063','P065'];s.fuel=2;s.stashReady=[true,false,true];s.hand=['P068'];await play(g,'P084');eq(s.stash,['P061','P068','P065'],'chosen rotated slot exchanged');eq(s.hand,['P063'],'Stash identity enters hand');eq(s.stashReady,[true,false,false],'payment precedes exchange, slot remains Rotated');eq(s.fuel,1,'exchange never creates Ready fuel');
}
{
 const g=fixture(r=>r.title.startsWith('Pay cost:')?[2]:r.title==='Exchange: choose a Stash card'?0:undefined),s=g.players[0];s.stash=['P061','P063','P065'];s.fuel=3;s.stashReady=[true,true,true];s.hand=['P068'];await play(g,'P084');eq(s.stashReady,[true,true,false],'exchange can preserve Ready state after paying with another slot');
}
{
 const g=fixture(r=>r.title.startsWith('Now You See Me: Play')?r.options.find(o=>g.card(g.players[0].hand[o.value])?.id==='LAB-MAG-006')?.value:undefined),s=g.players[0],rabbit=body(g,'P063');s.hand=['LAB-MAG-006'];body(g,'P136',1);await play(g,'P080');ok(!g.obj(rabbit.uid),'Now You See Me returns first');ok(s.hand.includes('P063'),'Rabbit in hand');ok(s.board.some(x=>x.id==='LAB-MAG-006'),'free Dove played');eq(s.fuel,19,'2 paid, once-per-turn refund; no extra free-play charge');
 const h=s.hand.length;await play(g,'LAB-MAG-002');eq(s.hand.length,h+2,'Encore counts return earlier this turn');
}
{
 const g=fixture(),own=body(g,'P065'),opp=body(g,'P121',1);await play(g,'P086');ok(!g.obj(own.uid)&&!g.obj(opp.uid),'Now You Don’t dismisses both');eq(g.players[0].discard,['P065','P086'],'friendly discard plus Action');eq(g.players[1].discard,['P121'],'opposing discard');ok(!g.players[0].defeatedRound&&!g.players[1].defeatedRound,'Dismiss is not Defeat');
}
{
 const g=fixture(),x=body(g,'P077');await play(g,'P090');const hp=g.players[1].hp;await g.causeTrouble(x.uid);eq(g.players[1].hp,hp-1,'Poof does not change Trouble');ok(!g.obj(x.uid),'Poof returns after Trouble');ok(g.players[0].hand.includes('P077'),'Poof owner hand');
}
{
 let blind;const g=fixture(r=>{if(r.title==='Pick a Card: choose one face-down card'){blind=r;return 1}return declineReturns(r)});g.players[0].hand=['P067','P076'];const n=g.players[0].deck.length;await play(g,'P079');eq(blind.player,1,'opponent selects hidden card');eq(blind.options.map(o=>o.label),['Face-down card 1','Face-down card 2'],'whole hand masked');eq(g.players[0].deck.length,n,'Pick a Card never draws to three');ok(g.players[0].board.some(x=>x.id==='P076'),'selected card free played');eq(g.players[0].hand,['P067'],'unchosen card remains in hand');eq(g.players[0].fuel,17,'only Action cost paid');
}
{
 const g=fixture(r=>r.title.startsWith('Pick a Card: play')?false:undefined);g.players[0].hand=['P065'];await play(g,'P079');eq(g.players[0].hand,['P065'],'may decline revealed free play');eq(g.players[0].board.length,0,'decline does not deploy');
}
for(const id of ['P080','P081','P082','P086','P142','P090','P084']){
 const g=fixture();g.players[0].hand=[id];const before=g.players[0].fuel;ok(!g.canPlay(0),'missing targets disabled: '+id);eq(await g.playCard(0,id,'hand',g.card(id).cost,{index:0}),false,'direct play also rejects missing targets: '+id);eq(g.players[0].fuel,before,'invalid target never pays: '+id);eq(g.players[0].hand,[id],'invalid target leaves Action in hand: '+id);
}
{
 const g=fixture(),low=body(g,'P121',1);body(g,'P137',1);body(g,'P137',1);await play(g,'P081',{cost:0});eq(g.players[0].fuel,18,'free targeted Action pays each Lawyer once');eq(low.ready,false,'taxed Action resolves');
}
{
 const g=fixture(),a=body(g,'P067'),b=body(g,'P121',1);body(g,'P137',1);body(g,'P137',1);g.players[0].leaderPassiveUsed=true;await play(g,'P086');eq(g.players[0].fuel,16,'two-target Action taxed once per Lawyer');ok(!g.obj(a.uid)&&!g.obj(b.uid),'tax does not stop legal Dismiss');
}
// Every character's entrance effects, plain text and temporary bonuses.
{
 const g=fixture(r=>r.title==='Choose a card to put on top of your deck'?1:undefined),s=g.players[0];s.deck=['P065','P063','P061'];await play(g,'P062');eq(s.deck,['P061','P065','P063'],'Birthday Kid top/bottom ordering');
}
{
 const g=fixture(),s=g.players[0];s.deck=['P065','P063','P061'];await play(g,'P039');eq(s.hand,['P061'],'Card Counter hand');eq(s.deck,['P065','P063'],'Card Counter top and bottom');
}
{
 const g=fixture();g.players[0].deck=['P063'];await play(g,'P039');eq(g.players[0].hand,['P063'],'Card Counter handles fewer than three');ok(!g.players[0].lastStraw,'look is not failed Draw');
}
{
 const g=fixture(),ally=body(g,'P067');await play(g,VOL_ID());eq(g.power(ally),4,'Volunteer entry +1 Power');const vol=g.chars(0).find(x=>x.id===VOL_ID());await g.remove(vol,'hand');eq(g.power(ally),5,'Volunteer return +1 Power');await g.endRound();eq(g.power(ally),3,'Volunteer bonus expires this turn');
}
function VOL_ID(){return 'LAB-MAG-001A'}
{
 const g=fixture(),rabbit=body(g,'P063'),stage=body(g,'P066'),head=body(g,'LAB-MAG-008');const n=g.players[0].deck.length;await g.remove(rabbit,'hand');eq(g.players[0].deck.length,n-2,'Rabbit exit plus Stagehand Draw');eq(g.trouble(head),5,'Headliner gains 2 Trouble');const another=body(g,'P076');await g.remove(another,'hand');eq(g.players[0].deck.length,n-3,'Stagehand triggers on every return');eq(g.trouble(head),5,'Headliner once per turn');await g.endRound();eq(g.trouble(head),3,'Headliner bonus expires');
}
{
 const g=fixture();await g.remove(body(g,'P076'),'hand');const head=body(g,'LAB-MAG-008');eq(g.trouble(head),3,'Headliner not retroactive');await g.remove(body(g,'P076'),'hand');eq(g.trouble(head),5,'live Headliner sees later return');
}
{
 const g=fixture(r=>declineReturns(r));body(g,'P121',1).ready=false;await play(g,'P076');ok(g.canAttack(g.chars(0).find(x=>x.id==='P076')),'Apprentice Hothead');await play(g,'P067');ok(g.keyword(g.chars(0).find(x=>x.id==='P067'),'Sucker Punch'),'Big Brother Sucker Punch');ok(!g.keyword(g.chars(0).find(x=>x.id==='P067'),'Chicken'),'old Chicken removed');await play(g,'P065');ok(g.canAttack(g.chars(0).find(x=>x.id==='P065')),'Escape Artist Hothead');await play(g,'P077');ok(g.canCauseTrouble(g.chars(0).find(x=>x.id==='P077')),'Opening Act immediate Trouble');
}
{
 const g=fixture(),target=body(g,'P121',1);target.ready=false;await play(g,'LAB-MAG-004');const mom=g.chars(0).find(x=>x.id==='LAB-MAG-004');eq(g.power(mom),4,'Party Mom entry combat bonus');ok(g.canAttack(mom),'Party Mom Hothead');await g.remove(mom,'hand');ok(!g.obj(target.uid),'Party Mom return bounces opposing <=2');
}
{
 const g=fixture(),before=g.players[0].hand.length;await play(g,'P068');eq(g.players[0].hand.length,before+1,'Card Shark Draw 2 discard 1');eq(g.players[0].discard.length,1,'Card Shark discards');
}
{
 const g=fixture(r=>r.title==='Exchange: choose a Stash card'?r.options[0].value:r.title.startsWith('Pay cost:')?[0,1,2,3,4]:undefined),s=g.players[0];s.hand=['P063','P065'];s.stashReady[8]=false;s.fuel=19;await play(g,'P073');eq(s.hand.length,2,'Quick Change equal exchange count');eq(s.stashReady.filter(Boolean).length,14,'Quick Change no ramp');ok(s.stash.includes('P063')&&s.stash.includes('P065'),'two different hand cards exchanged');
}
{
 for(const choice of ['power','draw']){const g=fixture(r=>r.title.startsWith('Street Magician:')?choice:undefined),street=body(g,'P075'),victim=body(g,'P136',1);victim.ready=false;const h=g.players[0].hand.length;await g.attack(street.uid);eq(victim.damage,choice==='power'?5:3,'Street Magician attack-only Power');eq(g.players[0].hand.length,h+(choice==='draw'?1:0),'Street Magician Draw without discard');eq(g.power(street),3,'bonus removed after attack');}
}
// Dove damage uses ordinary Absorb; all leave causes trigger, even Defeat.
{
 const g=fixture(),target=body(g,'P136',1);await play(g,'LAB-MAG-006');eq(target.damage,1,'Dove enters damage');const dove=g.chars(0).find(x=>x.id==='LAB-MAG-006');await g.damage(dove,1);eq(target.damage,2,'Dove Defeat leave damage');eq(g.guard(target),g.card(target).guard,'Dove never reduces permanent Health');
}
{
 const g=fixture();const target=body(g,'P136',1);body(g,'P072',1);await play(g,'LAB-MAG-006');eq(target.damage,0,'Absorb blocks Dove damage');
}
{
 const g=fixture();await play(g,'P063');const n=g.players[0].deck.length;await g.damage(g.chars(0).find(x=>x.id==='P063'),2);eq(g.players[0].deck.length,n-1,'Rabbit draws on Defeat');
}
// The actual three-card machine, and Trap Door's precise eligibility/cleanup.
{
 const g=fixture(r=>r.title.startsWith('Now You See Me: Play')?r.options.find(o=>g.card(g.players[0].hand[o.value])?.id==='LAB-MAG-006')?.value:undefined),s=g.players[0],trap=body(g,'LAB-MAG-009'),rabbit=body(g,'P063'),victim=body(g,'P076',1);victim.guard=10;s.hand=['LAB-MAG-006'];s.leaderPassiveUsed=true;await play(g,'P080');eq(victim.damage,1,'machine Dove entry');await play(g,'P086');ok(!g.obj(victim.uid),'machine opposing Dismiss');eq(trap.stored?.id,'LAB-MAG-006','machine captures Dove');eq(s.discard.filter(id=>id==='LAB-MAG-006').length,0,'stored Dove removed from discard');await g.activate(trap.uid);ok(!trap.stored&&!trap.ready,'Trap Door releases and Rotates');ok(s.board.some(x=>x.id==='LAB-MAG-006'),'Dove replayed');eq(s.fuel,15,'machine costs 2+2+1 after setup');ok(s.hand.includes('P063'),'Rabbit remains in hand');
}
{
 const g=fixture(),trap=body(g,'LAB-MAG-009');body(g,'LAB-MAG-009');const x=body(g,'P078');await g.dismiss(x);eq(g.players[0].board.filter(x=>x.stored).length,1,'one actual card captured by only one copy');await g.activate(trap.uid);const released=g.chars(0).find(x=>x.id==='P078');ok(released.fromUnderItem,'release origin tracked');ok(g.canCauseTrouble(released),'Heckler immediate Trouble from Item');ok(!g.canAttack(released),'Sucker Punch is not entry Hothead');
}
{
 const g=fixture();await play(g,'P078');ok(!g.canCauseTrouble(g.chars(0).find(x=>x.id==='P078')),'hand-play Heckler cannot Trouble immediately');
}
for(const kind of ['defeat','return','sacrifice','handDiscard']){
 const g=fixture(),trap=body(g,'LAB-MAG-009'),x=body(g,'P063');if(kind==='defeat')await g.damage(x,2);if(kind==='return')await g.remove(x,'hand');if(kind==='sacrifice')await g.remove(x,'discard',true);if(kind==='handDiscard'){g.players[0].hand=['P063'];await g.discard(0)}ok(!trap.stored,'Trap Door ignores '+kind);
}
{
 const g=fixture(),trap=body(g,'LAB-MAG-009'),x=body(g,'P065');await g.dismiss(x);eq(trap.stored?.id,'P065','Trap captures');await g.remove(trap,'hand');eq(g.players[0].discard,['P065'],'Trap cleanup stored card to owner discard');eq(g.players[0].hand,['LAB-MAG-009'],'only Item returns');
}
{
 const g=fixture(),trap=body(g,'LAB-MAG-009');await g.dismiss(body(g,'LAB-MAG-008'));ok(!trap.stored,'Trap cost cap <=5');
}
{
 const g=fixture(),trap=body(g,'LAB-MAG-009'),x=body(g,'P121');g.cards.P121={...g.cards.P121,keywords:['Stubborn']};await g.dismiss(x);ok(g.obj(x.uid)&&!trap.stored,'Stubborn prevented Dismiss cannot capture');ok(!g.players[0].leaderPassiveUsed,'no passive on prevented Dismiss');
}
{
 const g=fixture(),trap=body(g,'LAB-MAG-009');body(g,'P063');await play(g,'LAB-MAG-003');eq(trap.stored?.id,'P063','Disappearing Assistant captures Rabbit');eq(g.players[0].hand.length,2,'Rabbit leave plus conditional Assistant Draw');
}
{
 const g=fixture();g.cards.P121={...g.cards.P121,keywords:['Stubborn']};body(g,'P121');await play(g,'LAB-MAG-003');eq(g.players[0].hand.length,0,'Assistant no Draw if Stubborn prevented Dismiss');
}
// Items charge fuel, Hat targets exactly the locked Magical package.
{
 const g=fixture(),hat=body(g,'LAB-MAG-005');ok(!g.canUse(hat),'Hat needs Magical target');const rabbit=body(g,'P063');g.players[0].leaderPassiveUsed=true;await g.activate(hat.uid);ok(!hat.ready&&!g.obj(rabbit.uid),'Hat Rotates and returns Magical');eq(g.players[0].fuel,19,'Hat spends one');
}
{
 const g=fixture(),deck=body(g,'P088'),n=g.players[0].hand.length;await g.activate(deck.uid);eq(g.players[0].hand.length,n+1,'Marked Deck Draw');eq(g.players[0].fuel,19,'Marked Deck cost');ok(!deck.ready,'Marked Deck Rotates');
}
{
 const g=fixture(),deck=body(g,'P088');g.players[0].deck=[];ok(g.canUse(deck),'Marked Deck can attempt empty Draw');await g.activate(deck.uid);ok(g.players[0].lastStraw,'failed item Draw follows Last Straw');
}
// Leader shared cap, event history, turn expiry, pending end-of-turn effects.
{
 const g=fixture(),s=g.players[0];s.fuel=17;s.stashReady[17]=s.stashReady[18]=s.stashReady[19]=false;await g.dismiss(body(g,'P076'));eq(s.fuel,18,'passive on Dismiss');await g.remove(body(g,'P076'),'hand');eq(s.fuel,18,'Dismiss and Return share one cap');ok(s.returnedThisTurn,'return history independent of card location');await g.endRound();ok(!s.returnedThisTurn,'Encore history resets every turn');
}
{
 const g=fixture(),s=g.players[0];await g.remove(body(g,'P076'),'hand');ok(s.leaderPassiveUsed,'first event consumes use even with all Stash Ready');s.fuel--;await g.dismiss(body(g,'P076'));eq(s.fuel,19,'no later refund after first event');
}
{
 const g=fixture(),s=g.players[0];g.turn=1;s.fuel=19;await g.dismiss(body(g,'P076'));eq(s.fuel,19,'passive only during your turn');s.deck=['P067'];s.hand=['P067'];g.hurtLeader(0,10);await g.flushEffects();ok(s.board.some(x=>x.id==='P067'),'Breaking Point free <=3 Character even declining/no bounce');ok(s.breakingPointHit,'threshold hit once');
}
{
 const g=fixture(),x=body(g,'P076',0,false);await play(g,'P090');ok(!g.canCauseTrouble(x),'Poof grants no entry permission');await g.endRound();g.turn=0;x.ready=true;const before=g.players[0].hand.length;await g.causeTrouble(x.uid);ok(g.obj(x.uid),'unused Poof expires');eq(g.players[0].hand.length,before,'no delayed Poof bounce');
}
// Borrowed characters: ownership before entrance triggers, source independence,
// safe instance scheduling, Defeat and no resurrecting from discard.
{
 const g=fixture(r=>r.title.startsWith("Magician's Assistant: Return")?r.options.find(o=>g.obj(o.value)?.id==='P064')?.value:undefined);g.players[1].deck=['P061'];await play(g,'P064');const borrowed=g.chars(0).find(x=>x.id==='P061');ok(borrowed&&borrowed.cardOwner===1,'borrowed owner differs from controller');ok(!g.chars(0).some(x=>x.id==='P064'),'borrowed entrance returned Mentalist');ok(g.canAttack(borrowed)===false,'no attack target still enforced');body(g,'P136',1).ready=false;ok(g.canAttack(borrowed),'borrowed may attack now');ok(!g.canCauseTrouble(borrowed),'borrowed cannot Trouble now');await g.endRound();ok(!g.obj(borrowed.uid),'borrow returns after source Mentalist left');ok(g.players[1].hand.includes('P061'),'borrowed returns to real owner hand');
}
{
 const g=fixture(declineReturns);g.players[1].deck=['P063'];await play(g,'P064');const borrowed=g.chars(0).find(x=>x.id==='P063');const h=g.players[0].hand.length;await g.damage(borrowed,2);eq(g.players[1].discard,['P063'],'borrowed Defeat to owner discard');eq(g.players[0].hand.length,h+1,'borrowed Rabbit leave trigger belongs to former controller');await g.endRound();eq(g.players[1].hand,[],'end schedule never resurrects Defeated borrowed card');
}
{
 const g=fixture(),trap=body(g,'LAB-MAG-009');g.players[1].deck=['P076'];await play(g,'P064');const borrowed=g.chars(0).find(x=>x.id==='P076');await g.dismiss(borrowed);ok(!trap.stored,'Trap cannot retrieve borrowed card from opposing discard');eq(g.players[1].discard,['P076'],'borrowed Dismiss owner discard');
}
{
 const g=fixture();g.players[1].deck=['P063','P085'];await play(g,'P064');eq(g.players[1].deck,['P085','P063'],'non-character reveal bottom owner deck');
}
{
 const g=fixture(r=>r.title.startsWith('The Mentalist: play')?false:undefined);g.players[1].deck=['P085','P067'];await play(g,'P064');eq(g.players[1].deck,['P067','P085'],'declined character bottom owner deck');
}
// Every design can be paid and enter the playtest, not just displayed in builder.
for(const id of MISDIRECTION_IDS){if(['Character','Item'].includes(fixture().card(id).type)){const g=fixture(declineReturns);await play(g,id);ok(g.players[0].board.some(x=>x.id===id),'in-play design '+id)}}
eq(covered,MISDIRECTION_IDS,'all 32 designs exercised');eq(actions.size,10,'all ten Action effects exercised');
console.log(`Misdirection regression passed: all 32 designs, all 10 Actions; ${checks} checks`);
// Production AI and engine play complete matches across all opposing packages.
let games=0;
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const oldRandom=Math.random;
try{for(let seed=1;seed<=3;seed++)for(const enemy of doc.decks)for(let first=0;first<2;first++){
 const random=rng(seed*9173+doc.decks.indexOf(enemy)*127+first);Math.random=random;let g;g=new Game(pool,{decks:[magician,enemy]},r=>Promise.resolve(aiChoice(g,r)),()=>{},{firstPlayer:first});g.random=random;g.begin();let steps=0,consecutive=0,last=g.turn;
 while(g.winner===null&&g.round<=70&&steps++<2000){const p=g.turn,m=aiAction(g,p);if(m.type==='pass')await g.pass();else if(m.type==='stash')g.stash(m.index,p);else if(m.type==='play')await g.play(m.index);else if(m.type==='attack')await g.attack(m.uid);else if(m.type==='trouble')await g.causeTrouble(m.uid);else if(m.type==='activate')await g.activate(m.uid);if(last===g.turn)consecutive++;else{last=g.turn;consecutive=0}assert(consecutive<70,'production AI per-turn action limit');for(const s of g.players){assert(s.fuel>=0&&s.fuel<=s.stash.length,'legal fuel');assert(!s.hand.some(id=>!g.card(id)),'valid cards')}}
 assert.notEqual(g.winner,null,'complete game vs '+enemy.leader);games++;
}}finally{Math.random=oldRandom}
console.log(`Misdirection integration passed: ${games} complete seeded matches against all eight Leaders (functionality, not balance evidence)`);
