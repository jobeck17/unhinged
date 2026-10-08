import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game,LEADERS} from './engine.js?v=mordecai-04-misdirection-01';
await import('./cat-lady.js');
await import('./rockstar.js');
await import('./reckless.js');
await import('./stonewall.js');
await import('./magician.js');

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

const md=doc.decks.find(d=>d.leader==='Birthday Party Magician');
assert.equal(Object.values(md.cards).reduce((a,b)=>a+b,0),40,'Magician deck stays at 40');
assert.equal(md.audit_card_ids.length,32);
assert(md.audit_card_ids.every(id=>md.cards[id]));
assert.equal(md.cards['LAB-MAG-009'],2);
assert.equal(md.cards['LAB-MAG-007']??0,0);
const pc=id=>pool.cards.find(c=>c.id===id);
assert.deepEqual([pc('P063').cost,pc('P063').power,pc('P063').guard,pc('P063').trouble],[2,1,2,1]);
assert.equal(pc('LAB-MAG-005').cost,3);
assert.equal(pc('P088').name,'Marked Deck');
assert.equal(pc('LAB-MAG-001B').status,'retired');
assert.equal(pc('P089').replaced_by,'LAB-MAG-004');
console.log('Locked Misdirection data and deck smoke passed');

const cd=doc.decks.find(d=>d.leader==='Crazy Cat Lady');
assert.equal(Object.values(cd.cards).reduce((a,b)=>a+b,0),40);
assert.equal(cd.cards['LAB-CAT-001'],6); assert.equal(cd.cards['LAB-CAT-017'],3); assert.equal(cd.cards['LAB-CAT-018'],4); assert.equal(cd.cards['LAB-CAT-020'],4);
assert.match(LEADERS['Crazy Cat Lady'].passive,/fewer than 3 Cats/);
const cg=new Game(pool,{decks:[cd,doc.decks[4]]},ask,()=>{},{firstPlayer:0});
cg.players[0].deck=Array(20).fill('LAB-CAT-001');cg.players[0].hand=['LAB-CAT-001','LAB-CAT-001','LAB-CAT-001'];cg.round=2;cg.turn=0;cg.startTurn();
assert(cg.canStash(0,0));cg.stash(0,0);assert(cg.canStash(0,0),'Cat Lady can Stash twice below three Cats');
const rd=doc.decks.find(d=>d.leader==='Washed-Up Rock Star');
assert.match(LEADERS['Washed-Up Rock Star'].passive,/loses Composure/);
const rg=new Game(pool,{decks:[rd,doc.decks[4]]},ask,()=>{},{firstPlayer:0});
const rh=rg.players[0].hand.length;rg.hurtLeader(0,2);assert.equal(rg.players[0].hand.length,rh+2,'Rock Star draws equal actual Composure lost');
console.log('Landon Cat Lady and Rock Star promotion smoke passed');
