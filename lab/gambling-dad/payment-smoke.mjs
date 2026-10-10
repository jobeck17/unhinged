import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
// Match the actual browser's engine module and shared payment implementation.
import {Game,LEADERS} from '../../web/engine.js?v=mordecai-04-meatshield-01';
import './compat.mjs?v=gd-18';
import '../../web/magician.js?v=reckless-01';
import {installGamblingDad} from './poker.mjs';

const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const main=read('../../CARDS.json');
const lab=read('./cards.json');
const decks=read('../../DECKS.json');
const dad=read('./deck.json');
installGamblingDad(Game,LEADERS);
const allCards={cards:[...main.cards,...lab.cards]};
const questions=[];
const ask=async q=>{questions.push(q);throw Error('Unexpected payment/target choice: '+q.title)};
const game=new Game(allCards,{decks:[dad,decks.decks[0]]},ask,()=>{},{firstPlayer:0});
game.turn=0;
game.round=2;
game.players[0].hand=['LAB-GD-005','LAB-GD-001','LAB-GD-002'];
game.players[0].stash=['LAB-GD-006','LAB-GD-007','LAB-GD-008','LAB-GD-009','LAB-GD-010'];
game.players[0].fuel=5;
game.players[0].stashReady=undefined;
assert.equal(game.canPlay(0),true,'psychologist can be paid for');
await game.play(0);
assert(game.chars(0).some(x=>x.id==='LAB-GD-005'),'3-cost Psychologist entered play');
assert.equal(game.players[0].fuel,2,'three Ready Stash paid');
await game.play(0);
assert.equal(game.players[0].fuel,1,'one-cost Character paid');
await game.play(0);
assert.equal(game.players[0].fuel,0,'final one-cost Character paid');
assert.equal(questions.length,0,'no Stash selection questions from ordinary plays');
assert.equal(game.players[0].stashReady.filter(Boolean).length,0,'all paid Stash slots rotate');

game.players[0].fuel=3;
game.players[0].stashReady=[true,false,true,false,true];
assert.equal(await game.preparePayment(0,2),true,'payment works with scattered Ready slots');
assert.deepEqual(game.stashPayment,[{owner:0,picks:[0,2]}],'uses only actually Ready Stash');
assert.equal(game.payCost(0,2),true,'automatic payment succeeds');
assert.deepEqual(game.players[0].stashReady,[false,false,false,false,true]);
assert.equal(questions.length,0,'no selection prompts for scattered Stash');

const trash=decks.decks.find(x=>x.leader==='Trash Baron');
const baron=new Game(allCards,{decks:[trash,decks.decks[0]]},ask,()=>{},{firstPlayer:0});
baron.turn=0;
baron.players[0].stash=['LAB-GD-001','LAB-GD-002'];
baron.players[0].fuel=2;
baron.players[0].stashReady=[true,true];
baron.players[1].stash=['LAB-GD-003','LAB-GD-004'];
baron.players[1].fuel=2;
baron.players[1].stashReady=[true,true];
assert.equal(await baron.preparePayment(0,3),true,'Trash Baron may auto-use opponent Stash');
assert.deepEqual(baron.stashPayment,[{owner:1,picks:[0,1]},{owner:0,picks:[0]}],
 'Trash Baron respects opponent-first payment order');
assert.equal(baron.payCost(0,3),true);
assert.equal(baron.players[0].fuel,1);
assert.equal(baron.players[1].fuel,0);
assert.equal(questions.length,0);

console.log('PASS: ordinary plays and Trash Baron automatically pay Ready Stash, with no random-card/Stash pickers');