import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from './engine.js';

const pool=JSON.parse(fs.readFileSync(new URL('../CARDS.json',import.meta.url)));
const doc=JSON.parse(fs.readFileSync(new URL('../DECKS.json',import.meta.url)));
assert.equal(pool.version,'0.4-mordecai');
assert.equal(doc.card_pool,'0.4-mordecai');
assert.equal(doc.decks.length,8);
for(const d of doc.decks) assert.equal(Object.values(d.cards).reduce((a,b)=>a+b,0),40);

const ask=async r=>r.multi?[]:r.options?.[0]?.value??null;
const g=new Game(pool,{decks:[doc.decks[0],doc.decks[4]]},ask,()=>{},{firstPlayer:0});
await g.mulligan(0,[]); await g.mulligan(1,[]); g.begin();
assert.equal(g.players[0].hp,20); assert.equal(g.players[1].hp,20);
assert.equal(g.players[1].stash.length,0,'second player gets no setup Stash');

const a=g.enter(0,'P001'); a.born=0; a.ready=true;
const t=g.enter(1,'P121'); t.born=0; t.ready=false;
assert(g.canAttack(a),'ready cooled Character can Attack');
const beforeA=a.damage; await g.attack(a.uid);
assert.equal(a.damage,beforeA,'ordinary defender must not universally retaliate');

const tr=g.enter(0,'P152'); tr.born=0; tr.ready=true;
assert(g.trouble(tr)>=1); const before=g.players[1].hp; await g.causeTrouble(tr.uid);
assert.equal(g.players[1].hp,before-g.trouble(tr)); assert.equal(tr.ready,false);

for(let i=0;i<8;i++) g.enter(0,'P001');
assert(g.chars(0).length>5,'Mordecai has no Character cap');

g.players[1].hp=1; tr.ready=true; tr.born=0; await g.causeTrouble(tr.uid);
assert(g.players[1].lastStraw,'0 Composure triggers Last Straw');
g.players[1].lastStraw=true; g.players[1].hp=0; g.turn=0; tr.ready=true; await g.causeTrouble(tr.uid);
assert(g.players[1].unhinged,'later legal Trouble makes Last Straw Leader Unhinged');

const e=new Game(pool,{decks:[doc.decks[0],doc.decks[1]]},ask,()=>{},{firstPlayer:0});
e.players[0].deck=[]; e.draw(0);
assert(e.players[0].lastStraw,'failed Draw from empty deck triggers Last Straw');
assert.equal(e.winner,null,'deck exhaustion is not a direct loss');

console.log('Mordecai 0.4 browser smoke passed');
