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
{const g=setup(0,2),a=g.enter(0,'P013'),t=g.enter(1,'P067');a.damage=1;a.born=g.round;t.ready=true;assert(g.canAttack(a));g.ask=async r=>r.title.includes('Attack which')?t.uid:r.multi?[]:r.options[0]?.value;await g.attack(a.uid);assert(g.obj(a.uid)?.ready)}
{const g=setup(2,0),x=g.enter(0,'P061');g.players[0].fuel=2;g.players[0].stash=Array(4).fill('P001');await g.remove(x,'hand');assert.equal(g.players[0].fuel,3)}
{const g=setup(3,0);g.players[0].fuel=1;g.players[1].fuel=2;assert.equal(g.availableFuel(0),3)}
{const g=setup(4,0),a=g.enter(0,'P134');g.enter(1,'P151');a.born=1;g.round=8;let asked=false;g.ask=async r=>{if(r.title.includes('Blockers'))asked=true;return r.title.includes('Attack which')?-1:r.multi?[]:r.options[0]?.value};await g.attack(a.uid);assert.equal(asked,false)}
{const g=setup(5,0),z=g.enter(0,'P152');g.players[0].hand=['P177'];g.players[0].fuel=1;g.ask=async r=>r.options.find(o=>o.value===z.uid)?.value??r.options[0]?.value;await g.play(0);const salts=g.players[0].board.find(x=>x.id==='P177');assert(salts,'Bath Salts should enter play');assert.equal(salts.attached,z.uid,'Bath Salts should attach to the chosen Character');assert(g.trait(z,'Undead'),'Bath Salts should grant Undead');await g.activate(salts.uid);assert.equal(z.power,2,'Bath Salts should grant +2 Power this Turn');assert(!g.obj(salts.uid),'Bath Salts should Dismiss when activated')}
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
