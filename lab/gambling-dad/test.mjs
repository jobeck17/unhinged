import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Game,LEADERS} from "../../web/engine.js";
import {installGamblingDad,pokerValue,handRank,pokerHandType,compareScores} from "./poker.mjs";
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),"utf8"));
const cards=read("./cards.json").cards,deck=read("./deck.json");
const canonical=read("../../CARDS.json"),baseline=read("../../DECKS.json");
assert.equal(Object.values(deck.cards).reduce((a,b)=>a+b,0),40);
assert(cards.some(c=>c.name==="Divorced Dad"&&c.id==="LAB-GD-011"));
assert(!canonical.cards.some(c=>c.id.startsWith("LAB-GD-")));
const catalog=Object.fromEntries([...canonical.cards,...cards].map(c=>[c.id,c]));
installGamblingDad(Game,LEADERS);
assert(LEADERS["Gambling Dad"].passive.includes("Rock Bottom Poker"));
const pair=(a,b)=>[a,b];
const score=(a,b,mode)=>pokerValue(catalog,pair(a,b),mode);
const one="LAB-GD-001",two="LAB-GD-014",five="LAB-GD-005",six="LAB-GD-011";
for(const mode of ["HIGH","LOW"]){
 assert.equal(pokerHandType(catalog,[one,one]),"Matching Pair","1+1 is always a Pair");
 assert.equal(pokerHandType(catalog,[one,two]),"Straight","1+2 is always a Straight");
 assert.equal(pokerHandType(catalog,[one,five]),"High Roller","1+5 is always High Roller");
 assert.equal(handRank(catalog,[one,one],mode),mode==="HIGH"?3:1);
 assert.equal(handRank(catalog,[one,two],mode),2);
 assert.equal(handRank(catalog,[one,five],mode),mode==="HIGH"?1:3);
}

assert.equal(handRank(catalog,[six,six],"HIGH"),3);
assert.equal(handRank(catalog,[six,six],"LOW"),1);
assert.equal(handRank(catalog,[five,six],"HIGH"),2);
assert.equal(handRank(catalog,[one,six],"LOW"),3);
assert.equal(compareScores(score(one,one,"HIGH"),score(five,six,"HIGH"),"HIGH"),1,"Pair outranks Straight even at low Cost");
assert.equal(compareScores(score(one,six,"LOW"),score(six,six,"LOW"),"LOW"),1,"High Roller outranks Pair in LOW");
assert.equal(compareScores(score(one,one,"LOW"),score(six,six,"LOW"),"LOW"),1,"LOW favors lower Cost within same rank");
function setup(ask){
 const g=new Game({cards:[...canonical.cards,...cards]},{decks:[deck,baseline.decks[0]]},ask,()=>{},{firstPlayer:0});
 g.turn=0;g.round=2;g.players[0].pokerUsed=false;
 return g;
}
async function run(mode,dadDraw,oppDraw,decision="play",selection=[0,1]){
 const requests=[];
 const g=setup(async r=>{
  requests.push(r);
  if(r.pokerChip)return null;
  if(r.pokerFold)return decision;
  if(r.pokerCards){assert.equal(r.pokerMode,mode,"Picker receives actual chip mode");assert.equal(r.options.length,4);return r.player===0?selection:r.recommendedPair;}
  return r.options?.[0]?.value??null;
 });
 g.players[0].deck=[...dadDraw].reverse();
 g.players[1].deck=[...oppDraw].reverse();
 const rand=Math.random;
 Math.random=()=>mode==="HIGH"?0.1:0.9;
 let outcome;
 try{outcome=await g.dadPoker(0)}finally{Math.random=rand}
 assert.equal(g.pokerMode,mode);
 assert(requests.some(r=>r.pokerChip));
 assert(requests.some(r=>r.pokerFold));
 return {g,outcome,requests};
}
let win=await run("HIGH",[six,six,one,one],[one,five,two,one]);
assert.equal(win.outcome,1);
assert.equal(win.g.players[0].stash.length,4);
assert.equal(win.g.players[0].fuel,4);
assert.equal(win.g.players[0].deck.length,2);
assert.equal(win.g.players[1].deck.length,2);
assert(!win.g.canPoker(0));
let lose=await run("HIGH",[one,one,five,six],[six,six,one,two]);
lose.g.players[0].stash; // A loss should never award Stash.
assert.equal(lose.outcome,-1);
assert.equal(lose.g.players[0].stash.length,0);
let low=await run("LOW",[one,six,six,six],[six,six,six,six]);
assert.equal(low.outcome,1,"LOW rewards nonconsecutive High Roller over all-six Pair");
let fold=await run("HIGH",[one,one,five,six],[six,six,one,two],"fold");
assert.equal(fold.outcome,"fold");
assert.equal(fold.g.players[0].deck.length,4);
assert.equal(fold.g.players[1].deck.length,4);
assert.equal(fold.requests.filter(r=>r.pokerCards).length,0);
assert(!fold.g.canPoker(0));
let manual=await run("HIGH",[one,six,two,five],[one,one,one,one],"play",[0,2]);
assert.equal(manual.requests.filter(r=>r.pokerCards).length,2);
assert.deepEqual(manual.g.players[0].deck,[six,five],"Unselected two cards return to bottom of deck");
console.log("PASS: Four-card hand ranks HIGH/LOW, selected pair, opponent AI, win, loss, fold, draw count, and lab isolation");
