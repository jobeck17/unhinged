import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from './engine-lab.js';
import {aiAction,aiChoice} from './ai-lab.js';
const pool=JSON.parse(fs.readFileSync(new URL('../production/playtests/character-lab/cards.json',import.meta.url)));
const full=JSON.parse(fs.readFileSync(new URL('../production/playtests/character-lab/decks.json',import.meta.url)));
const cards=Object.fromEntries(pool.cards.map(c=>[c.id,c]));
for(const d of full.decks){assert.equal(Object.values(d.cards).reduce((a,b)=>a+b,0),40);for(const [id,n] of Object.entries(d.cards)){assert(n>=1&&n<=4);assert(d.styles.includes(cards[id].style))}}
function setup(a=0,b=4){let g=new Game(pool,{decks:[full.decks[a],full.decks[b]]},async r=>r.multi?[]:r.options[0]?.value,()=>{});g.round=6;g.first=0;g.turn=0;g.players[0].fuel=7;g.players[0].hand=[];return g}
{
 let g=setup(),a=g.enter(0,'P012'),b=g.enter(1,'P012');a.born=1;b.ready=false;g.ask=async r=>r.title.includes('Attack which')?b.uid:r.options[0]?.value;
 await g.attack(a.uid);assert(!g.obj(a.uid)&&!g.obj(b.uid),'equal lethal combat defeats both characters');
}
{
 let g=setup(),a=g.enter(0,'P012'),b=g.enter(1,'P001');a.born=1;
 g.ask=async r=>{assert(!r.title.includes('Guard Discard'));return r.multi?[b.uid]:r.options[0]?.value};
 await g.attack(a.uid);assert.equal(g.players[1].hp,22,'overflow through 1 Guard');assert.equal(a.damage,2,'defeated blocker still deals simultaneous damage');
}
{
 let g=setup();let order=[];for(let i=0;i<4;i++){order.push(g.turn);await g.pass()}assert.deepEqual(order,[0,1,0,1]);
}
{
 let g=setup();g.enter(0,'P012');g.enter(0,'P151');g.enter(0,'P003');g.players[0].hand=['P011'];await g.play(0);
 assert.equal(g.players[0].hand.length,3,'Showrunner draws for three survivors');let show=g.chars(0).find(x=>x.id==='P011');show.born=1;let hp=g.players[1].hp;await g.attack(show.uid);assert.equal(hp-g.players[1].hp,7,'3 fireworks plus 4 attack');
 console.log('Showrunner: 3 cards drawn; 7 damage in prepared unblocked attack.');
}
{
 let g=setup(1),road=g.enter(0,'P048');road.born=1;g.players[0].hand=['P053','P053','P053','P038'];
 for(let i=0;i<3;i++)await g.play(0);
 assert(g.chars(0).some(x=>x.id==='P038'),'third Action gives free Mike');assert.equal(g.power(road),7);assert.equal(g.players[0].fuel,4);
 console.log('Roadie: 3 Actions draw 3 cards, reach 7 Power, and play Mike free.');
}
{
 let g=setup(3),vac=g.enter(0,'P105');vac.born=1;g.players[0].hand=['P119','P119','P119'];for(let i=0;i<3;i++)await g.play(0);
 assert.equal(vac.cargo.length,3);assert.equal(g.power(vac),6);let hp=g.players[1].hp;await g.attack(vac.uid);assert.equal(vac.cargo.length,0);assert.equal(hp-g.players[1].hp,6);
 console.log('Vacuum: 3 Items build 6 Power; unload deals 3 direct damage, then attacks for 3.');
}
{
 const g=setup();assert.equal(typeof g.leader,'undefined','Leader has no gameplay action API');
 for(const s of g.players){assert(!('charge' in s),'Leader has no Charge state');assert(!('ready' in s),'Leader does not rotate');assert(!('passive' in s),'Leader has no passive state')}
}
{
 const g=setup(2),x=g.enter(0,'P063');x.born=1;await g.activate(x.uid);await g.damage(x,9);assert.equal(x.damage,0);await g.pass();assert.equal(x.cloaked,false);
}
{
 const g=setup(1),x=g.enter(0,'P032');x.born=1;g.players[0].hand=['P037'];g.ask=async r=>r.title.includes('Stack onto')?x.uid:r.options[0]?.value;await g.play(0);assert.equal(x.lower,'P032');x.born=1;assert.equal(g.canUse(x),false,'passive lower layer has no obsolete Rotate activation');
}
// Seeded smoke matches are regression checks, not a balance or enjoyment claim.
let seed=20260925;const oldRandom=Math.random;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
let rounds=[],engineEvents=0;
try{for(let a=0;a<6;a++)for(let b=0;b<6;b++){if(a===b)continue;let g=new Game(pool,{decks:[full.decks[a],full.decks[b]]},r=>aiChoice(g,r),()=>{});g.begin();let limit=1600;
 while(g.winner===null&&g.round<30&&limit--){let m=aiAction(g,g.turn),events=g.eventCount;
 assert(['pass','attack','play','activate'].includes(m.type),`unsupported AI action ${m.type}`);if(m.type==='pass')await g.pass();else if(m.type==='attack')await g.attack(m.uid);else if(m.type==='play')await g.play(m.index);else if(m.type==='activate')await g.activate(m.uid);
 assert(g.eventCount!==events||g.winner!==null,`stuck ${g.name(g.turn)} ${JSON.stringify(m)}`);
 for(let p=0;p<2;p++){let s=g.players[p],seen={};for(let id of [...s.deck,...s.hand,...s.discard,...s.board.flatMap(x=>[x.id,...(x.lower?[x.lower]:[]),...x.cargo,...(x.hidden?[x.hidden]:[])])])seen[id]=(seen[id]||0)+1;assert.deepEqual(seen,g.decks[p].cards);assert(s.fuel>=0);assert(!('charge' in s)&&!('ready' in s)&&!('passive' in s))}
 }
 assert(limit>0&&g.winner!==null,`unfinished ${a}/${b}`);rounds.push(g.round);engineEvents+=g.log.filter(s=>/ENCORE|VACUUM UNLEASHED|FIREWORKS/.test(s)).length;
}}finally{Math.random=oldRandom}
console.log(JSON.stringify({matches:rounds.length,minRound:Math.min(...rounds),maxRound:Math.max(...rounds),meanRound:rounds.reduce((a,b)=>a+b,0)/rounds.length,recentEngineLogEntries:engineEvents}));
