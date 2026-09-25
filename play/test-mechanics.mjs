import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from './engine-six.js';
import {aiChoice} from './ai-six.js';
const pool=JSON.parse(fs.readFileSync(new URL('../production/cards/cards.json',import.meta.url)));
const all=JSON.parse(fs.readFileSync(new URL('../production/playtests/six-deck-lab/decks.json',import.meta.url))).decks;
function make(a,b){let g=new Game(pool,{decks:[all.find(d=>d.leader===a),all.find(d=>d.leader===b)]},r=>aiChoice(g,r),()=>{});g.begin();g.turn=0;g.round=4;g.players[0].fuel=7;return g}
{
 const g=make('Washed-Up Rock Star','Backyard Wrestler');g.players[0].hand.push('P050');let index=g.players[0].hand.length-1;await g.play(index);assert.equal(g.turn,0,'Sneaky Play keeps Turn');assert(g.players[0].sneakyUsed);let x=g.enter(0,'P032');x.born=1;g.players[0].hand.push('P037');await g.play(g.players[0].hand.length-1);assert.equal(x.id,'P037');assert.equal(x.lower,'P032');assert.equal(g.power(x),5,'second Play triggers Rock Star passive on the stacked Character');
}
{
 const g=make('Birthday Party Magician','Trash Baron');let x=g.enter(0,'P063');x.born=1;await g.activate(x.uid);assert.equal(x.cloaked,true);assert.equal(g.canAttack(x),false);await g.damage(x,5);assert.equal(x.damage,0);await g.endRound();assert.equal(x.cloaked,false)
}
{
 const g=make('Trash Baron','Birthday Party Magician'),vac=g.enter(0,'P105');vac.born=1;g.players[0].deck.push('P149');let before=g.players[1].hp;await g.attack(vac.uid);assert.equal(vac.cargo.length,1);assert.equal(vac.cargo[0],'P149');assert.equal(g.players[1].hp,before+0-3,'Vacuum first Attack gains +1 Power');g.enter(1,'P063');await g.damage(vac,5);assert.equal(g.players[0].discard.includes('P149'),true,'Tucked Item is revealed and discarded');assert.equal(g.players[0].discard.includes('P105'),true)
}
for(const leader of all.map(d=>d.leader)){
 const opponent=leader==='Florida Man'?'Trash Baron':'Florida Man',g=make(leader,opponent);
 const mine=g.enter(0,leader==='Backyard Wrestler'?'P151':'P001'),theirs=g.enter(1,'P001');mine.born=1;theirs.born=1;theirs.ready=false;
 g.players[0].charge=3;g.players[0].hand.push('P001','P151');g.players[0].discard.push('P120');g.enter(0,'P120');
 await g.leader(true);assert(g.players[0].charge<=1,`${leader} ultimate spends 3 Charge; resulting triggers may earn 1`);assert.equal(g.players[0].ready,false,`${leader} ultimate Rotates`);
}
console.log('Sneaky, Stack, Cloak, Vacuum and six ultimates: OK');
