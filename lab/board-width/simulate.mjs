import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Game} from './engine.mjs';
import {chooseMove} from './ai.mjs';
const pool=JSON.parse(fs.readFileSync(new URL('./CARDS.json',import.meta.url))),doc=JSON.parse(fs.readFileSync(new URL('./DECKS.json',import.meta.url)));
export function conservation(g){for(let p=0;p<2;p++){const s=g.players[p],actual=[...s.deck,...s.hand,...s.discard,...s.stash.map(x=>x.id),...s.board.flatMap(x=>[x.id,...(x.stored||[])])].filter(id=>!g.card(id).token);assert.equal(actual.length,40);const counts=a=>a.reduce((o,id)=>(o[id]=(o[id]||0)+1,o),{});assert.deepEqual(counts(actual),g.decks[p].cards);assert(g.chars(p).length<=g.rules.maxCharacters);assert.notEqual(g.phase,'block');}}
export function smoke(n=20){const results={games:n,wins:[0,0],deckOuts:0,censored:0,maxRound:0};for(let i=0;i<n;i++){const g=new Game(pool,doc,[i%2,1-i%2],{seed:1700+i,firstPlayer:i%2});let commands=0;while(g.winner===null&&g.round<=60&&commands++<2000){g.apply(chooseMove(g));conservation(g)}results.maxRound=Math.max(results.maxRound,g.round);if(g.winner===null)results.censored++;else{results.wins[g.winner]++;if(g.endReason==='deck-out')results.deckOuts++;}}return results;}
if(process.argv[1]===new URL(import.meta.url).pathname)console.log(JSON.stringify(smoke(Number(process.env.GAMES||40)),null,2));
