import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game,LEADERS} from './engine-six.js';
import {aiAction,aiChoice} from './ai-six.js';
const pool=JSON.parse(fs.readFileSync(new URL('../production/cards/cards.json',import.meta.url)));
const full=JSON.parse(fs.readFileSync(new URL('../production/playtests/six-deck-lab/decks.json',import.meta.url)));
assert.equal(pool.version,full.card_pool);
for(let a=0;a<6;a++)for(let b=0;b<6;b++){if(a===b)continue;let decks={...full,decks:[full.decks[a],full.decks[b]]};let g=new Game(pool,decks,r=>aiChoice(g,r),()=>{});g.begin();let limit=1250;
 while(g.winner===null&&g.round<=35&&limit--){let move=aiAction(g,g.turn),turn=g.turn,round=g.round,playedId=g.players[g.turn].hand[move.index],events=g.eventCount;
  if(move.type==='pass')await g.pass();else if(move.type==='attack')await g.attack(move.uid);else if(move.type==='play')await g.play(move.index);else if(move.type==='activate')await g.activate(move.uid);else if(move.type==='leader')await g.leader();else if(move.type==='ultimate')await g.leader(true);else throw Error('invalid move');
  if(!(g.winner!==null||g.turn!==turn||g.round!==round||g.eventCount!==events))throw Error(`action stuck: ${g.name(turn)} ${JSON.stringify(move)} R${round}; card ${g.obj(move.uid)?.id||playedId}; ${g.log.slice(0,6).join(' | ')}`);
  for(let p=0;p<2;p++){let s=g.players[p],seen={};for(let id of [...s.deck,...s.hand,...s.discard,...s.board.flatMap(x=>[x.id,...(x.lower?[x.lower]:[]),...(x.cargo||[]),...(x.hidden?[x.hidden]:[])])])seen[id]=(seen[id]||0)+1;assert.deepEqual(seen,decks.decks[p].cards,`${g.name(p)} conservation in ${g.name(a%2)} R${g.round}`);assert(s.charge>=0&&s.charge<=3&&s.fuel>=0)}
 }
 assert(limit>0,'runaway loop');assert(g.winner!==null||g.round>35,'no game ended');console.log(`${decks.decks[0].leader} vs ${decks.decks[1].leader}: R${g.round}, winner ${g.name(g.winner??0)}`)}
console.log('Six-deck pair smoke: 30 directed matches complete.');
