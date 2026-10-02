import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game,buildDeckField} from './engine.js';
import {aiAction,aiChoice} from './ai.js';
const pool=JSON.parse(fs.readFileSync(new URL('../CARDS.json',import.meta.url)));
const full=JSON.parse(fs.readFileSync(new URL('../DECKS.json',import.meta.url)));
assert.equal(pool.version,'0.3-carl'); assert.equal(full.card_pool,'0.3-carl');
for(const d of full.decks){assert.equal(Object.values(d.cards).reduce((a,b)=>a+b,0),40)}
const field=buildDeckField(full);
assert.equal(field.length,36);
assert.equal(field.filter(d=>d.mono).length,6);
assert.equal(field.filter(d=>!d.mono).length,30);
for(const d of field)assert.equal(Object.values(d.cards).reduce((a,b)=>a+b,0),40);
assert.equal(field[0].deckLabel,'Florida Man · Mono Reckless');
assert(field.some(d=>d.deckLabel==='Florida Man · Reckless + Salvage'));
function setup(a=0,b=2){const g=new Game(pool,{decks:[full.decks[a],full.decks[b]]},async r=>r.multi?[]:r.options[0]?.value,()=>{});g.round=3;g.turn=0;g.first=0;for(const s of g.players){s.fuel=7;s.stash=Array(7).fill('P001');s.hand=[]}return g}
{const g=setup(0,2),a=g.enter(0,'P013'),t=g.enter(1,'P067');a.damage=1;a.born=g.round;t.ready=true;assert(g.canAttack(a));g.ask=async r=>r.title.includes('Attack which')?t.uid:r.title.includes('Chicken:')?false:r.multi?[]:r.options[0]?.value;await g.attack(a.uid);assert(g.obj(a.uid)?.ready)}
{const g=setup(2,0),x=g.enter(0,'P061');g.players[0].fuel=2;g.players[0].stash=Array(4).fill('P001');await g.remove(x,'hand');assert.equal(g.players[0].fuel,3)}
{const g=setup(3,0);g.players[0].fuel=1;g.players[1].fuel=2;assert.equal(g.availableFuel(0),3)}
{const g=setup(4,0),a=g.enter(0,'P134');g.enter(1,'P151');a.born=1;g.round=8;let asked=false;g.ask=async r=>{if(r.title.includes('Blockers'))asked=true;return r.title.includes('Attack which')?-1:r.multi?[]:r.options[0]?.value};await g.attack(a.uid);assert.equal(asked,false)}
{const g=setup(5,0),z=g.enter(0,'P152');g.players[0].hand=['P177'];g.players[0].fuel=1;g.ask=async r=>r.options.find(o=>o.value===z.uid)?.value??r.options[0]?.value;await g.play(0);const salts=g.players[0].board.find(x=>x.id==='P177');assert(salts,'Bath Salts should enter play');assert.equal(salts.attached,z.uid,'Bath Salts should attach to the chosen Character');assert(g.trait(z,'Undead'),'Bath Salts should grant Undead');await g.activate(salts.uid);assert.equal(z.power,2,'Bath Salts should grant +2 Power this Turn');assert(!g.obj(salts.uid),'Bath Salts should Dismiss when activated')}
{assert.equal(pool.cards.find(c=>c.id==='P009')?.name,'Pet Alligator');assert.equal(pool.cards.find(c=>c.id==='P009')?.subtitle,'Probably Domesticated');assert.equal(full.decks[0].cards.P009,3);const g=setup(0,1),a=g.enter(0,'P009');a.born=1;const hp=g.players[0].hp,opp=g.players[1].hp,oldRandom=Math.random;g.ask=async r=>r.title.includes('Attack which')?-1:r.multi?[]:r.options[0]?.value;Math.random=()=>0;try{await g.attack(a.uid)}finally{Math.random=oldRandom}assert.equal(g.players[0].hp,hp-4,'Pet Alligator should bite its own Leader on a 1');assert.equal(g.players[1].hp,opp,'failed Pet Alligator attack should not damage opponent');assert.equal(a.ready,false,'Pet Alligator should Rotate when its attack backfires')}
let seed=20260930,old=Math.random;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
try{for(let a=0;a<6;a++)for(let b=0;b<6;b++)if(a!==b){const g=new Game(pool,{decks:[full.decks[a],full.decks[b]]},r=>aiChoice(g,r),()=>{});g.begin();let limit=1200;while(g.winner===null&&g.round<25&&limit--){const m=aiAction(g,g.turn);if(m.type==='pass')await g.pass();else if(m.type==='stash')g.stash(m.index,g.turn);else if(m.type==='attack')await g.attack(m.uid);else if(m.type==='play')await g.play(m.index);else if(m.type==='activate')await g.activate(m.uid)}assert(limit>0)}}finally{Math.random=old}
console.log('Carl smoke tests passed');

{
 const d={...full,decks:[full.decks[0],full.decks[1]]};
 const g=new Game(pool,d,async()=>null,()=>{},{firstPlayer:0});
 assert.equal(g.first,0,'forced first player should be honored');
 g.begin();
 assert.equal(g.players[1].stash.length,1,'second player should receive Round 1 setup Stash');
 assert.ok(g.players[1].tempStashCard,'setup Stash should be marked temporary');
 g.turn=1;
 await g.endRound();
 assert.equal(g.round,2,'ending second turn should advance to Round 2');
 assert.equal(g.players[1].stash.length,1,'unused setup Stash should persist until spent');
 assert.ok(g.players[1].tempStashCard,'temporary marker should persist until spent');
}


const catPool=JSON.parse(fs.readFileSync(new URL('../lab/leader-rulebreakers/crazy-cat-lady/CARDS.json',import.meta.url)));
const catDeckDoc=JSON.parse(fs.readFileSync(new URL('../lab/leader-rulebreakers/crazy-cat-lady/DECK.json',import.meta.url)));
const sciPool=JSON.parse(fs.readFileSync(new URL('../lab/leader-rulebreakers/mad-scientist/CARDS.json',import.meta.url)));
const sciDeckDoc=JSON.parse(fs.readFileSync(new URL('../lab/leader-rulebreakers/mad-scientist/DECK.json',import.meta.url)));
const sciTokens=JSON.parse(fs.readFileSync(new URL('../lab/leader-rulebreakers/mad-scientist/TOKENS.json',import.meta.url)));
const labPool={...pool,cards:[
 ...pool.cards,
 ...catPool.cards.map(c=>({...c,style:c.style||'Lab',keywords:c.keywords||[]})),
 ...sciPool.cards.map(c=>({...c,style:c.style||'Lab',keywords:c.keywords||[]})),
 ...sciTokens.tokens.map(t=>({...t,type:'Character',cost:0,style:'Lab',keywords:t.keywords||[],power:typeof t.power==='number'?t.power:0,guard:typeof t.guard==='number'?t.guard:0,token:true}))
]};
const catDeck={...catDeckDoc,leader:catDeckDoc.leader.name,health:25,styles:['Lab'],lab:true};
const sciDeck={...sciDeckDoc,leader:sciDeckDoc.leader.name,health:25,styles:['Lab'],lab:true,protectedStash:true};

{
 const g=new Game(labPool,{decks:[sciDeck,full.decks[3]]},async r=>r.multi?r.options.slice(0,r.max||2).map(o=>o.value):r.options[0]?.value,()=>{},{firstPlayer:0});
 await g.mulligan(0,[]);await g.mulligan(1,[]);g.begin();
 assert.equal(g.players[0].stash.length,5,'Mad Scientist should start with a five-card battery');
 assert.equal(g.players[0].fuel,5,'Mad Scientist battery should start fully Ready');
 assert.equal(g.canStash(0,0),false,'Mad Scientist cannot use normal Stash growth');
 g.turn=1;
 assert.equal(g.availableFuel(1),g.players[1].fuel,'Trash Baron must not spend protected Scientist battery Stash');
}
{
 const g=new Game(labPool,{decks:[catDeck,full.decks[1]]},async r=>r.multi?[]:r.options[0]?.value,()=>{},{firstPlayer:0});
 await g.mulligan(0,[]);await g.mulligan(1,[]);g.begin();
 g.enter(0,'LAB-CAT-001');g.enter(0,'LAB-CAT-002');g.enter(0,'LAB-CAT-003');
 const before=g.players[0].stash.length;g.round=2;g.turn=0;g.startTurn();
 assert.equal(g.players[0].stash.length,before+1,'Cat Distribution System should add Ready Stash at three Cats');
 assert.equal(g.players[0].fuel,g.players[0].stash.length,'Cat bonus Stash should be Ready');
}
{
 const g=new Game(labPool,{decks:[sciDeck,full.decks[1]]},async r=>r.multi?r.options.slice(0,r.max||2).map(o=>o.value):r.options[0]?.value,()=>{},{firstPlayer:0});
 await g.mulligan(0,[]);await g.mulligan(1,[]);g.begin();
 g.turn=0;g.players[0].hand=['LAB-SCI-009','LAB-SCI-001','LAB-SCI-002'];g.players[0].fuel=5;
 const oldRandom=Math.random,rolls=[0,0.999];Math.random=()=>rolls.shift()??0.5;
 try{await g.play(0)}finally{Math.random=oldRandom}
 const abom=g.chars(0).find(x=>x.id==='LAB-TOK-SCI-001');
 assert(abom,'It\'s Alive should create an Abomination token');
 assert.equal(g.power(abom),1,'first die is Power');
 assert.equal(g.guard(abom),6,'second die is Guard');
 assert.equal(g.players[0].hand.length,0,'It\'s Alive should consume the Action and two Character cards');
}
