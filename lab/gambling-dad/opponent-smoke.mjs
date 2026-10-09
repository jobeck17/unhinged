// Lab-only browser-parity regression: all packages must patch the SAME Game class.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Game,LEADERS} from '../../web/engine.js?v=mordecai-04-meatshield-01';
import './compat.mjs';
import '../../web/magician.js';
import '../../web/cat-lady.js';
import '../../web/rockstar.js';
import '../../web/reckless.js';
import {aiAction,aiChoice} from '../../web/ai.js';
import {installGamblingDad} from './poker.mjs';
import {runOpponentTurn} from './opponent.mjs';

const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
installGamblingDad(Game,LEADERS);
const pool=read('../../CARDS.json');
pool.cards.push(...read('./cards.json').cards);
const doc=read('../../DECKS.json');
const dad=read('./deck.json');
const florida=doc.decks.find(d=>d.leader==='Florida Man');
assert(florida);

async function checkOpponent(oppDeck,id){
 let g;
 const ask=async request=>{
  if(request.pokerChip||request.slotStart||request.slotFlip||request.slotFinish)return null;
  if(request.pokerFold)return 'play';
  if(request.pokerBluff)return 'keep';
  if(request.pokerCards)return [...request.recommendedPair];
  if(request.slotDecision)return 'cash';
  return aiChoice(g,request);
 };
 g=new Game(pool,{...doc,decks:[dad,oppDeck]},ask,()=>{},{firstPlayer:0});
 g.round=2;g.turn=1;
 // This is an established Character: it may Cause Trouble in Round 2.
 const character=g.enter(1,id);
 character.born=1;
 g.players[1].hand=[];
 g.players[1].stashedThisTurn=true;
 if(oppDeck.leader==='Gambling Dad')g.players[1].pokerUsed=true;
 assert(g.canCauseTrouble(character),oppDeck.leader+' must be able to Cause Trouble');
 const errors=[];
 await runOpponentTurn(g,{
  human:0,decide:aiAction,delay:async()=>{},
  onError:error=>errors.push(error.message)
 });
 assert.deepEqual(errors,[],oppDeck.leader+' AI turn should not throw');
 assert.equal(g.turn,0,oppDeck.leader+' turn returns control to the player');
 assert.equal(character.ready,false,oppDeck.leader+' Character must remain Rotated on the player turn');
}
await checkOpponent(florida,'P001');
await checkOpponent(dad,'LAB-GD-001');
console.log('PASS: shared browser engine, Florida Man and Gambling Dad AI characters rotate and stay rotated after turn');
