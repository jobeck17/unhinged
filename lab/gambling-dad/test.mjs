import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Game,LEADERS} from "../../web/engine.js";
import {aiAction,aiChoice} from "../../web/ai.js";
import {runOpponentTurn} from "./opponent.mjs";
import {installGamblingDad,pokerValue,handRank,pokerHandType,compareScores,SLOT_MACHINE,slotPayout} from "./poker.mjs";
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),"utf8"));
const cards=read("./cards.json").cards,deck=read("./deck.json");
const canonical=read("../../CARDS.json"),baseline=read("../../DECKS.json");
assert.equal(Object.values(deck.cards).reduce((a,b)=>a+b,0),39);
assert.equal(deck.cards[SLOT_MACHINE],4,"exactly four Slot Machine Items");
assert.equal(deck.cards["LAB-GD-014"],undefined,"Free Money is absent from the deck");
assert.equal(deck.cards["LAB-GD-013"],3,"exactly three Bluff Actions replace Almost a Win");
assert.equal(cards.find(c=>c.id==="LAB-GD-013")?.name,"Bluff");
assert.equal(deck.cards["LAB-GD-016"],undefined,"old Lucky Coin is gone");
assert.equal(cards.find(c=>c.id===SLOT_MACHINE)?.cost,4,"Slot Machine must cost four");
assert.equal(cards.find(c=>c.id===SLOT_MACHINE)?.type,"Item");
assert.equal(cards.filter(c=>c.type==="Character").reduce((n,c)=>n+(deck.cards[c.id]||0),0),28,"all Character counts unchanged");

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
 
// Exhaustive generalized classification: every printed Cost pair over the
// full supported range, plus future higher Costs, must behave identically
// regardless of chip mode. No named cards or specific pairs are special-cased.
const maxPrintedCost=Math.max(...Object.values(catalog).map(c=>Number(c.cost)||0));
const testCosts=Array.from({length:Math.max(10,maxPrintedCost+2)+1},(_,i)=>i);
const costCards=Object.fromEntries(testCosts.map(cost=>["cost-"+cost,{cost,type:"Character",power:0}]));
let checked=0;
for(const a of testCosts)for(const b of testCosts){
 const ids=["cost-"+a,"cost-"+b];
 const kind=a===b?"Matching Pair":Math.abs(a-b)===1?"Straight":"High Roller";
 assert.equal(pokerHandType(costCards,ids),kind);
 assert.equal(pokerHandType(costCards,[...ids].reverse()),kind,"hand identity must be order-independent");
 for(const mode of ["HIGH","LOW"]){
  const expectedRank=(mode==="HIGH"
   ?{"Matching Pair":3,"Straight":2,"High Roller":1}
   :{"Matching Pair":1,"Straight":2,"High Roller":3})[kind];
  assert.equal(handRank(costCards,ids,mode),expectedRank);
  const actual=pokerValue(costCards,ids,mode);
  assert.deepEqual(actual,[expectedRank,a+b,0],"score includes rank, combined printed Cost, printed Power");
  checked++;
 }
}
assert(checked>=200,"all combinations were checked");

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
  if(r.pokerCards){
   assert.equal(r.pokerMode,mode,"Picker receives actual chip mode");
   assert.equal(r.options.length,4,"Always show four individually selectable cards");
   const ids=r.options.map(o=>o.cardId);
   const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
   const scores=pairs.map(pair=>pokerValue(catalog,pair.map(i=>ids[i]),mode));
   const selected=pairs.findIndex(pair=>pair.every((i,k)=>i===r.recommendedPair[k]));
   assert(selected>=0,"AI recommendation must be one of the six two-card combinations");
   assert(scores.every(other=>compareScores(scores[selected],other,mode)>=0),"AI recommends a globally strongest available hand");
   return r.player===0?selection:r.recommendedPair;
  }
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
function assertRevealedHands(game,mode){
 const result=game.pokerLast;
 assert.equal(result.mode,mode,"Reveal always includes the actual chip mode");
 assert.equal(result.dadPlayer,0);
 assert.equal(result.opponentPlayer,1);
 for(const [role,who] of [["dadHand","Dad"],["oppHand","Opponent"]]){
  const hand=result[role];
  assert.equal(hand.cards.length,2,who+" reveals exactly two committed cards");
  assert(hand.cards.every(c=>typeof c.name==="string"&&Number.isFinite(c.cost)),who+" reveals card names and numeric Costs");
  const [a,b]=hand.cards.map(c=>c.cost);
  const expectedType=a===b?"Matching Pair":Math.abs(a-b)===1?"Straight":"High Roller";
  assert.equal(hand.type,expectedType,who+" hand uses general Cost classification");
  assert.equal(a+b,result[who==="Dad"?"costDad":"costOpp"],who+" revealed Costs match actual scored total");
 }
}
let win=await run("HIGH",[six,six,one,one],[one,five,two,one]);
assert.equal(win.outcome,1);
assertRevealedHands(win.g,"HIGH");
assert.equal(win.g.players[0].stash.length,4);
assert.equal(win.g.players[0].fuel,4);
assert.equal(win.g.players[0].deck.length,2);
assert.equal(win.g.players[1].deck.length,2);
assert(!win.g.canPoker(0));
let lose=await run("HIGH",[one,one,five,six],[six,six,one,two]);
lose.g.players[0].stash; // A loss should never award Stash.
assert.equal(lose.outcome,-1);
assertRevealedHands(lose.g,"HIGH");
assert.equal(lose.g.players[0].stash.length,0);
let low=await run("LOW",[one,six,six,six],[six,six,six,six]);
assert.equal(low.outcome,1,"LOW rewards nonconsecutive High Roller over all-six Pair");
assertRevealedHands(low.g,"LOW");
assert.equal(low.g.pokerLast.dadHand.type,"High Roller");
assert.equal(low.g.pokerLast.oppHand.type,"Matching Pair");
let fold=await run("HIGH",[one,one,five,six],[six,six,one,two],"fold");
assert.equal(fold.outcome,"fold");
assert.equal(fold.g.pokerLast.folded,true);
assert.equal(fold.g.pokerLast.dadHand,undefined,"A fold reveals no hands");
assert.equal(fold.g.players[0].deck.length,4);
assert.equal(fold.g.players[1].deck.length,4);
assert.equal(fold.requests.filter(r=>r.pokerCards).length,0);
assert(!fold.g.canPoker(0));
let manual=await run("HIGH",[one,six,two,five],[one,one,one,one],"play",[0,2]);
assert.equal(manual.requests.filter(r=>r.pokerCards).length,2);
assertRevealedHands(manual.g,"HIGH");
assert.deepEqual(manual.g.players[0].deck,[six,five],"Unselected two cards return to bottom of deck");
let tie=await run("HIGH",[one,one,one,one],[one,one,one,one]);
assert.equal(tie.outcome,0,"Identical Matching Pairs tie");
assertRevealedHands(tie.g,"HIGH");
assert.equal(tie.g.pokerLast.dadHand.type,"Matching Pair");
assert.equal(tie.g.pokerLast.oppHand.type,"Matching Pair");

// Slot Machine: test every three-flip combination and real Game.activate paths.
for(const a of ["H","L"])for(const b of ["H","L"])for(const c of ["H","L"]){
 const value=slotPayout([a,b,c],true,0);
 assert.equal(value.outcome,a!==b?"MISS":b===c?"JACKPOT":"BUST");
 assert.equal(value.draw,value.outcome==="JACKPOT"?7:0);
 if(a===b)assert.deepEqual(slotPayout([a,b],false,0),{outcome:"CASH OUT",draw:1});
}
async function spinScenario(flips,decision){
 const requests=[];
 const g=setup(async r=>{
  if(r.slotStart||r.slotFlip||r.slotDecision||r.slotFinish){
   requests.push(r);
   if(r.slotDecision)return decision;
   return null;
  }
  return r.options?.[0]?.value??null;
 });
 const item=g.enter(0,SLOT_MACHINE),player=g.players[0];
 player.stash=[one,one,one,one];
 player.fuel=4;
 player.hand=[];
 player.deck=Array(12).fill(one);
 assert(g.canUse(item),"Ready Slot Machine with two Stash and a deck is usable");
 const results=[...flips];
 const original=Math.random;
 Math.random=()=>{
  const result=results.shift();
  if(!result)throw Error("Unexpected extra chip flip");
  return result==="H"?0.1:0.9;
 };
 try{await g.activate(item.uid)}finally{Math.random=original}
 assert.equal(results.length,0,"Only requested flips occur");
 assert.equal(player.fuel,2,"Activation spends exactly two Ready Stash");
 assert.equal(item.ready,false,"Slot Machine Rotates when activated");
 assert(!g.canUse(item),"A Rotated Slot Machine cannot activate again this Turn");
 assert.deepEqual(requests.filter(r=>r.slotFlip).map(r=>r.face),flips,"Reels reveal strictly one flip at a time");
 assert.equal(requests.filter(r=>r.slotStart).length,1,"Three empty reels appear before any flip");
 assert.equal(requests.filter(r=>r.slotFinish).length,1,"Spin concludes after the outcome");
 return {g,requests};
}
const spinMiss=await spinScenario(["H","L"],"continue");
assert.equal(spinMiss.g.slotLast.outcome,"MISS");
assert.equal(spinMiss.g.slotLast.drawn,0);
assert.equal(spinMiss.requests.filter(r=>r.slotDecision).length,0,"First-two mismatch closes without offering a decision");
assert.equal(spinMiss.g.players[0].hand.length,0);
const spinCash=await spinScenario(["L","L"],"cash");
assert.equal(spinCash.g.slotLast.outcome,"CASH OUT");
assert.equal(spinCash.g.slotLast.drawn,1);
assert.equal(spinCash.requests.filter(r=>r.slotDecision).length,1);
assert.equal(spinCash.g.players[0].hand.length,1);
const spinBust=await spinScenario(["H","H","L"],"continue");
assert.equal(spinBust.g.slotLast.outcome,"BUST");
assert.equal(spinBust.g.slotLast.drawn,0);
const spinJackpot=await spinScenario(["L","L","L"],"continue");
assert.equal(spinJackpot.g.slotLast.outcome,"JACKPOT");
assert.equal(spinJackpot.g.slotLast.drawn,7,"Jackpot refills the entire hand");
assert.equal(spinJackpot.g.players[0].hand.length,7);

 // Regression: the opponent must finish a Round-2 Florida Man turn.
 let floridaGame;
 floridaGame=setup(async request=>aiChoice(floridaGame,request));
 floridaGame.turn=1;floridaGame.startTurn();
 const normalAi=await runOpponentTurn(floridaGame,{
   human:0,decide:aiAction,delay:async()=>{}
 });
 assert.equal(floridaGame.turn,0,"Florida Man must hand control back after its turn");
 assert.equal(normalAi.errors,0,"Normal Florida Man play should not require recovery");

 // An unexpected AI/card exception must not strand the UI on "Opponent is thinking".
 const broken=setup(async()=>null);
 broken.turn=1;broken.startTurn();
 const seen=[];
 const recovered=await runOpponentTurn(broken,{
   human:0,decide:()=>{throw Error("simulated AI card failure")},
   delay:async()=>{},onError:error=>seen.push(error.message)
 });
 assert.equal(broken.turn,0,"Broken opponent action should fall back to ending the turn");
 assert.equal(recovered.errors,1);
 assert.match(seen[0],/simulated AI card failure/);

 // Even if the AI loops excessively, the action cap must end its turn.
 const capped=setup(async()=>null);
 capped.turn=1;capped.startTurn();
 const limit=await runOpponentTurn(capped,{
   human:0,decide:aiAction,delay:async()=>{},maxActions:1
 });
 assert.equal(capped.turn,0,"Opponent action limit should safely end the turn");
 assert.equal(limit.errors,1);

console.log("PASS: "+checked+" generalized HIGH/LOW Cost-pair cases, optimal AI selection, four-card picker, revealed both hands on wins/losses/ties, fold, ownership and lab isolation, 8 slot outcomes, full activation branches, and Florida Man opponent-turn recovery");
