import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Game,LEADERS} from "../../web/engine.js";
import {installGamblingDad,pokerScore,compareScores,PASSIVE} from "./poker.mjs";

const read=(p)=>JSON.parse(readFileSync(new URL(p,import.meta.url),"utf8"));
const canonCards=read("../../CARDS.json"),canonDecks=read("../../DECKS.json");
const labCards=read("./cards.json"),labDeck=read("./deck.json");
assert.equal(labDeck.leader,"Gambling Dad");
assert.equal(labDeck.styles[0],"Gambler");
assert.equal(Object.values(labDeck.cards).reduce((a,b)=>a+b,0),40);
assert.equal(labCards.cards.length,17);
const curve=Object.fromEntries([1,2,3,4,5,6].map(cost=>[cost,labCards.cards.filter(c=>c.cost===cost).reduce((n,c)=>n+labDeck.cards[c.id],0)]));
assert.deepEqual(curve,{1:22,2:5,3:0,4:0,5:7,6:6},"Gambling Dad must have a polarized low/high Cost curve");

assert(labCards.cards.every(c=>c.id.startsWith("LAB-GD-")));
assert(labCards.cards.every(c=>c.style==="Gambler"));
assert.equal(labCards.cards.filter(c=>c.type==="Character").reduce((n,c)=>n+labDeck.cards[c.id],0),28);
assert.equal(labCards.cards.filter(c=>c.type==="Action").reduce((n,c)=>n+labDeck.cards[c.id],0),8);
assert.equal(labCards.cards.filter(c=>c.type==="Item").reduce((n,c)=>n+labDeck.cards[c.id],0),4);
assert(!canonCards.cards.some(c=>c.id.startsWith("LAB-GD-")));
assert(!canonDecks.decks.some(d=>d.leader==="Gambling Dad"));
installGamblingDad(Game,LEADERS);
assert(LEADERS["Gambling Dad"].passive.includes(PASSIVE));
const pool={cards:[...canonCards.cards,...labCards.cards]};
const create=()=>{
  const g=new Game(pool,{decks:[labDeck,canonDecks.decks[0]]},
    async r=>r.options?.[0]?.value??null,()=>{},{firstPlayer:0});
  g.turn=0;g.round=2;g.players[0].pokerUsed=false;
  return g;
};
assert.deepEqual(pokerScore(Object.fromEntries(pool.cards.map(c=>[c.id,c])),["LAB-GD-011","LAB-GD-015"]),[7,5],"Action Power is zero");
assert.equal(compareScores([6,7],[6,4]),1,"Power breaks Cost tie");
assert.equal(compareScores([5,9],[6,0]),-1,"Cost outweighs Power");

const win=create();
win.players[0].deck=["LAB-GD-001","LAB-GD-011","LAB-GD-012"];
win.players[1].deck=["LAB-GD-001","LAB-GD-001","LAB-GD-001"];
assert(win.canPoker(0));
assert.equal(await win.dadPoker(0),1);
assert.equal(win.players[0].stash.length,4,"Dad wins all four committed cards");
assert.equal(win.players[0].fuel,4,"Poker Stash is Ready");
assert.deepEqual(win.players[0].pokerOrigins,[0,0,1,1],"Stash retains original owner");
assert.equal(win.players[1].stash.length,0,"Opponent gains no Stash");
assert(!win.canPoker(0),"Only one Poker per Turn");
assert.equal(win.players[0].deck.length,1,"Unused third returns to bottom of Dad deck");
assert.equal(win.players[1].deck.length,1,"Unused third returns to bottom of opponent deck");

const lose=create();
lose.players[0].deck=["LAB-GD-001","LAB-GD-001","LAB-GD-001"];
lose.players[1].deck=["LAB-GD-010","LAB-GD-011","LAB-GD-012"];
lose.players[0].stash=["LAB-GD-001","LAB-GD-002","LAB-GD-003","LAB-GD-004","LAB-GD-005"];
lose.players[0].pokerOrigins=[0,1,0,0,1];
lose.players[0].fuel=5;
assert.equal(await lose.dadPoker(0),-1);
assert.equal(lose.players[0].stash.length,2,"Loss trims Stash to two");
assert.equal(lose.players[0].fuel,2,"Loss cannot leave ghost Ready Stash");
assert(lose.players[1].discard.includes("LAB-GD-005"),"Borrowed Stash returns to original owner's discard");
assert.equal(lose.players[1].stash.length,0,"Opponent still gains no Stash");
assert.equal(lose.players[1].deck.length,3,"Opponent's chosen pair returns to its own deck");

const tie=create();
tie.players[0].deck=["LAB-GD-001","LAB-GD-001","LAB-GD-001"];
tie.players[1].deck=["LAB-GD-001","LAB-GD-001","LAB-GD-001"];
tie.players[0].stash=["LAB-GD-010","LAB-GD-011","LAB-GD-012"];
tie.players[0].fuel=3;
assert.equal(await tie.dadPoker(0),0);
assert.equal(tie.players[0].stash.length,3,"Tie does not reset Stash");
assert.equal(tie.players[0].discard.length,2,"Dad's selected pair is discarded on tie");
assert.equal(tie.players[1].discard.length,2,"Opponent's selected pair is discarded on tie");
assert(!tie.canPoker(0));
console.log("Gambling Dad lab: 40-card shell, polarized Cost curve, scoring, win, loss, tie and ownership assertions passed");
