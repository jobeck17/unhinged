import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Game} from './engine.js';
import {aiAction,aiChoice} from './ai.js';
import './stank-merge.js';
const pool=JSON.parse(fs.readFileSync(new URL('./CARDS.json',import.meta.url)));
const doc=JSON.parse(fs.readFileSync(new URL('./DECKS.json',import.meta.url)));
assert.equal(pool.version,doc.card_pool);
assert.equal(doc.decks.length,8,'combined lab should expose eight decks');
for(const d of doc.decks)assert.equal(Object.values(d.cards).reduce((a,b)=>a+b,0),40);
for(const d of doc.decks)for(const id of Object.keys(d.cards)){const c=pool.cards.find(x=>x.id===id);if(c.type==='Character')assert(c.antics>=1&&c.antics<=3,id+' needs Antics')}
let seed=20261004,old=Math.random;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
try{
 // Cause Trouble is an unblockable win-condition action that exposes its Character.
 let blockPrompted=false,test;
 test=new Game(pool,{decks:[doc.decks[0],doc.decks[4]]},r=>{if(String(r.title||'').includes('Block Trouble'))blockPrompted=true;return r.multi?[]:r.options?.[0]?.value},()=>{},{firstPlayer:0});
 test.round=2;test.turn=0;test.first=0;test.players[0].hp=test.players[1].hp=15;
 const toddler=test.enter(0,'P005');toddler.born=1;
 const before=test.players[1].hp;await test.causeTrouble(toddler.uid);
 assert.equal(blockPrompted,false,'Cause Trouble must not open a Block choice');
 assert.equal(test.players[1].hp,before-test.antics(toddler),'Cause Trouble should immediately reduce Composure by Antics');
 assert.equal(toddler.ready,false,'Cause Trouble must Rotate and expose the Character');
 const hot=test.enter(0,'P152');hot.born=test.round;assert.equal(test.canAttack(hot),true,'Hothead should still Attack on entry');assert.equal(test.canCauseTrouble(hot),false,'Hothead must not allow Trouble on entry');

 for(let a=0;a<doc.decks.length;a++)for(let b=0;b<doc.decks.length;b++)if(a!==b){
  const g=new Game(pool,{decks:[doc.decks[a],doc.decks[b]]},r=>aiChoice(g,r),()=>{},{firstPlayer:(a+b)%2});
  await g.mulligan(0,[]);await g.mulligan(1,[]);g.begin();
  let limit=1600;
  while(g.winner===null&&g.round<35&&limit--){
   assert(g.chars(0).length<=5&&g.chars(1).length<=5,'five-wide cap broken');
   const m=aiAction(g,g.turn);
   if(m.type==='pass')await g.pass();else if(m.type==='stash')g.stash(m.index,g.turn);else if(m.type==='attack')await g.attack(m.uid);else if(m.type==='trouble')await g.causeTrouble(m.uid);else if(m.type==='play')await g.play(m.index);else if(m.type==='activate')await g.activate(m.uid);
  }
  assert(limit>0,'AI loop');
 }
}finally{Math.random=old}
console.log('Composure + STANK 60 smoke passed');
