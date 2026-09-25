import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from './engine-six.js';
const pool=JSON.parse(fs.readFileSync(new URL('../production/cards/cards.json',import.meta.url)));
const decks=JSON.parse(fs.readFileSync(new URL('../production/playtests/six-deck-lab/decks.json',import.meta.url)));
const g=new Game(pool,{decks:decks.decks.slice(0,2)},async r=>r.options[0]?.value,()=>{});
g.begin();const first=g.turn,other=1-first;
assert.equal(g.players[first].fuel,1);
assert.equal(g.players[other].fuel,0);
let played=0;for(let i=0;i<g.players[first].hand.length;i++)if(g.canPlay(i,first)){await g.play(i);played++;break}
if(played)assert.equal(g.turn,first,'playing a card does not end your turn');
await g.pass();assert.equal(g.turn,other);assert.equal(g.players[other].fuel,1);assert.equal(g.round,1);
await g.pass();assert.equal(g.round,2);assert.equal(g.turn,other,'first player alternates each Round');
assert.equal(g.players[other].fuel,2);
console.log('Full turns, per-player refresh, and alternating first player: OK');
