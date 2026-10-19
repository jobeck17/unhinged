// Isolated Pawn Shop Stash regression tests; never touch canonical data.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Game,LEADERS} from '../../web/engine.js';
import '../../web/cat-lady.js';
import '../../web/reckless.js';
import '../../web/stonewall.js';
import '../../web/magician.js';
import '../../web/cat-lady.js';
import '../../web/rockstar.js';
import '../../web/reckless.js';
import '../../web/stonewall.js';
import '../../web/magician.js';
import {installPawnShop} from './pawn-shop.js';

installPawnShop(Game,LEADERS);
const labCards=JSON.parse(readFileSync(new URL('./cards.json',import.meta.url),'utf8'));
const draft=JSON.parse(readFileSync(new URL('./deck.json',import.meta.url),'utf8'));
const pool={cards:labCards.cards};
const prompt=async req=>req.options?.find(o=>o.value!==null)?.value??null;
function makeGame(){
 const game=new Game(pool,{decks:[draft,draft]},prompt,()=>{}, {firstPlayer:0});
 game.begin();return game;
}

// Test A: the very first normal Stash cannot pay for a same-turn card.
{
 const game=makeGame(),s=game.players[0];
 assert.equal(game.stash(0),true);
 assert.equal(s.stash.length,1);
 assert.equal(s.fuel,0,'New Stash must enter Rotated, not Ready');
 assert.deepEqual(game.stashStates(0),[false]);
 assert.equal(game.canCloseDeal(),false,'Cannot spend freshly Stashed card');
 assert.equal(game.stash(0),false,'Only one normal Stash before 4 Deals');
 game.round=2;game.turn=0;game.startTurn();
 assert.equal(s.fuel,1,'Stash should Ready next Turn');
 assert.deepEqual(game.stashStates(0),[true]);
 assert.equal(game.stash(0),true);
 assert.equal(s.fuel,1,'New second slot cannot be spent the same Turn');
 assert.deepEqual(game.stashStates(0),[true,false]);
}

// Test B: the 4-Deal bonus allows two Stashes but both enter Rotated.
{
 const game=makeGame(),s=game.players[0];
 s.deals=4;
 assert.equal(game.stash(0),true);
 assert.equal(game.stash(0),true);
 assert.equal(game.stash(0),false);
 assert.equal(s.fuel,0);
 assert.deepEqual(game.stashStates(0),[false,false]);
 assert.equal(s.pawnStashCount,2);
 game.round=2;game.turn=0;game.startTurn();
 assert.deepEqual(game.stashStates(0),[true,true]);
 assert.equal(s.fuel,2);
}

// Test C: Antique Holder's extra Stash also enters Rotated, independent of normal Stash.
{
 const game=makeGame(),s=game.players[0];
 assert.equal(game.stash(0),true);
 const x=game.enter(0,'LAB-PS-001');
 await game.enterEffect(x,[]);
 assert.equal(s.stash.length,2);
 assert.equal(s.fuel,0);
 assert.deepEqual(game.stashStates(0),[false,false]);
 game.round=2;game.turn=0;game.startTurn();
 assert.equal(s.fuel,2);
 assert.deepEqual(game.stashStates(0),[true,true]);
}

// Test D: an opposing standard-style Leader still follows canonical Ready-on-entry.
{
 const game=makeGame(),s=game.players[1];
 game.decks[1]={...game.decks[1],leader:'Florida Man',styles:['Reckless']};
 game.turn=1;game.startTurn();
 assert.equal(game.stash(0),true);
 assert.equal(s.fuel,1);
 assert.deepEqual(game.stashStates(1),[true]);
}

console.log('Pawn Shop Stash regression: rotated entry, next-turn Ready, 4-Deal double Stash, Antique Holder, canonical controls PASS');
