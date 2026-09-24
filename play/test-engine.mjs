import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from './engine.js';
import {aiAction,aiChoice} from './ai.js';

const pool=JSON.parse(fs.readFileSync(new URL('../production/cards/cards.json',import.meta.url)));
const decks=JSON.parse(fs.readFileSync(new URL('../production/playtests/florida-vs-hoa/decks.json',import.meta.url)));
assert.equal(pool.version,decks.card_pool);
for(let k=0;k<12;k++){
 let g;g=new Game(pool,decks,request=>aiChoice(g,request),()=>{});g.begin();let steps=0;
 while(g.winner===null&&g.round<42&&steps++<2600){
  let move=aiAction(g,g.turn);
  if(move.type==='pass')await g.pass();
  else if(move.type==='play')await g.play(move.index);
  else if(move.type==='attack')await g.attack(move.uid);
  else if(move.type==='activate')await g.activate(move.uid);
  else if(move.type==='leader')await g.leader();
  else if(move.type==='ultimate')await g.leader(true);
  else throw Error(`Unknown action ${move.type}`);
  for(let p=0;p<2;p++){
   let s=g.players[p],count={};
   for(let id of [...s.deck,...s.hand,...s.discard,...s.board.map(x=>x.id)])count[id]=(count[id]||0)+1;
   assert.deepEqual(count,decks.decks[p].cards,'card conservation');
   assert(s.fuel>=0&&s.charge>=0&&s.charge<=3,'resource bounds');
  }
 }
 assert.notEqual(g.winner,null,`game ${k} should finish`);
}
// The attacking player, not the defender, must choose the attack target.
let chosenBy=[];let g=new Game(pool,decks,async request=>{chosenBy.push(request.player);return request.options[0].value},()=>{});g.begin();g.round=3;g.turn=0;let x=g.enter(0,'P001');x.born=1;await g.attack(x.uid);assert.equal(chosenBy[0],0);
console.log('12 completed games, card/resource invariants, and attack target ownership: OK');
