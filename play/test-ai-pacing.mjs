import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from './engine-six.js';
import {aiAction,aiChoice} from './ai-six.js';
const pool=JSON.parse(fs.readFileSync(new URL('../production/cards/cards.json',import.meta.url)));
const decks=JSON.parse(fs.readFileSync(new URL('../production/playtests/six-deck-lab/decks.json',import.meta.url))).decks;
let attacks=0,blocks=0,chip=0,finished=0;
for(let i=0;i<6;i++)for(let j=0;j<6;j++){if(i===j)continue;let g;
 g=new Game(pool,{decks:[decks[i],decks[j]]},r=>{let c=aiChoice(g,r);if(r.title?.includes('Blockers')){attacks++;if(c.length)blocks++}return c},()=>{});g.begin();let steps=0;
 while(g.winner===null&&g.round<30&&steps++<1300){let move=aiAction(g,g.turn);if(move.type==='pass')await g.pass();else if(move.type==='attack')await g.attack(move.uid);else if(move.type==='play')await g.play(move.index);else if(move.type==='leader')await g.leader();else if(move.type==='ultimate')await g.leader(true);else if(move.type==='activate')await g.activate(move.uid)}
 assert(steps<1300);if(g.winner!==null)finished++;
 chip+=50-g.players[0].hp-g.players[1].hp;
}
assert.equal(finished,30,'all directed matchups should finish');assert(blocks/attacks<.5,'AI should allow meaningful Leader damage');
console.log(JSON.stringify({blockableAttacks:attacks,blocks,blockRate:Math.round(100*blocks/attacks)+'%',finished,averageCombinedLeaderDamage:Math.round(chip/30)},null,2));
