import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Game,LEADERS} from "../../web/engine.js";
import {installGamblingDad} from "./poker.mjs";

const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),"utf8"));
const pool={cards:[...read("../../CARDS.json").cards,...read("./cards.json").cards]};
const baseline=read("../../DECKS.json");
const dad=read("./deck.json");
const A="LAB-GD-001",B="LAB-GD-002",S="LAB-GD-011";
installGamblingDad(Game,LEADERS);
assert.match(LEADERS["Gambling Dad"].breaking,/Double Down/);

async function scenario({
  dadCards=[S,S,A,A],
  oppCards=[A,A,A,A],
  rewards=["stash"],
  atBreakingPoint=false,
  double=false,
  fold=false,
  hand=[A,B],
  stash=[A,B,S],
  discardSelection=0
}={}){
 const requests=[], granted=[];
 const game=new Game(pool,{decks:[dad,baseline.decks[0]]},async r=>{
  requests.push(r);
  if(r.pokerChip)return null;
  if(r.pokerCards){
   if(r.canFold){
    assert.equal(r.player,0,"Only Dad sees the Fold action");
    if(fold)return "fold";
   }
   return [0,1];
  }
  if(r.pokerReward){const choice=rewards[granted.length]||"stash";granted.push(choice);return choice}
  if(r.pokerDoubleDown)return double?"double":"walk";
  if(r.pokerLossDiscard)return discardSelection;
  if(r.options?.length)return r.options[0].value;
  throw Error("Unexpected poker prompt "+r.title);
 },()=>{},{firstPlayer:0});
 game.turn=0;game.round=2;
 game.players[0].hand=[...hand];
 game.players[0].stash=[...stash];
 game.players[0].fuel=stash.length;
 game.players[0].deck=[...dadCards].reverse();
 game.players[1].deck=[...oppCards].reverse();
 if(atBreakingPoint){game.hurtLeader(0,10);assert.equal(game.players[0].breakingPointHit,true)}
 const original=Math.random;
 Math.random=()=>0.1; // HIGH chip; hand compares Matching Pair by total Cost
 let result;
 try{result=await game.dadPoker(0)}
 finally{Math.random=original}
 return {game,result,requests,granted};
}
// Fold lives on the first four-card chooser. No two-card selection is needed.
let folded=await scenario({fold:true,hand:[A,B],stash:[A,B,S]});
assert.equal(folded.result,"fold");
assert.equal(folded.game.players[0].stash.length,2,"Fold loses exactly 1 Stash");
assert.equal(folded.game.players[0].fuel,2);
assert.equal(folded.game.players[0].deck.length,4,"Fold returns all four Dad cards");
assert.equal(folded.game.players[1].deck.length,4,"Fold returns all four opponent cards");
assert.equal(folded.game.pokerLast.folded,true);
assert.equal(folded.requests.filter(r=>r.pokerCards).length,1,"Fold happens at first card-selection screen");
assert.equal(folded.requests.filter(r=>r.pokerReward).length,0);
assert.equal(folded.requests.some(r=>r.pokerFold),false,"No separate Fold dialog");
assert.equal(folded.game.canPoker(0),false,"Fold consumes Dad's once-per-turn poker use");
let emptyFold=await scenario({fold:true,stash:[]});
assert.equal(emptyFold.result,"fold","Fold is still allowed with zero Stash");
assert.equal(emptyFold.game.players[0].stash.length,0);

const two=(v)=>[...v,...v];
let regular=await scenario();
assert.equal(regular.result,1);
assert.equal(regular.game.players[0].stash.length,5,"first win: +2 Stash, not +4");
assert.equal(regular.game.players[0].fuel,5);
assert.equal(regular.requests.filter(r=>r.pokerDoubleDown).length,0,"no Double Down before Breaking Point");
assert.equal(regular.requests.filter(r=>r.pokerReward).length,1);

let cards=await scenario({rewards:["draw"]});
assert.equal(cards.game.players[0].stash.length,3);
assert.equal(cards.game.players[0].hand.length,4,"first win: Draw 2");
assert.equal(cards.game.players[1].deck.length,4,"opponent's selected pair stays in opponent's deck");

let walked=await scenario({atBreakingPoint:true,double:false,dadCards:[S,S,A,A,S,S,A,A],oppCards:Array(8).fill(A)});
assert.equal(walked.game.players[0].hp,10);
assert.equal(walked.requests.filter(r=>r.pokerDoubleDown).length,1);
assert.equal(walked.game.players[0].stash.length,5);
assert.equal(walked.requests.filter(r=>r.pokerCards).length,2);

const dadWin=[S,S,A,A,S,S,A,A],oppLose=Array(8).fill(A);
let jackpot=await scenario({dadCards:dadWin,oppCards:oppLose,atBreakingPoint:true,double:true,rewards:["stash","stash"]});
assert.equal(jackpot.result,1);
assert.equal(jackpot.game.players[0].stash.length,7,"two Stash wins gain total 4");
assert.equal(jackpot.game.players[0].fuel,7);
assert.equal(jackpot.requests.filter(r=>r.pokerCards).length,4,"both players pick two in both rounds");
assert.equal(jackpot.requests.filter(r=>r.pokerChip).length,2,"new independent HIGH/LOW chip on second hand");
assert.equal(jackpot.requests.filter(r=>r.pokerFold).length,0,"no separate Fold dialog");
assert.equal(jackpot.requests.filter(r=>r.pokerCards&&r.canFold).length,1,"Fold is offered only for first hand, not Double Down");
assert.equal(jackpot.game.pokerLast.rounds.length,2);
assert.equal(jackpot.game.pokerLast.doubled,true);

let split=await scenario({dadCards:dadWin,oppCards:oppLose,atBreakingPoint:true,double:true,rewards:["draw","stash"]});
assert.equal(split.result,1);
assert.equal(split.game.players[0].stash.length,5,"mixed payout +2 Stash");
assert.equal(split.game.players[0].hand.length,4,"mixed payout Draw 2");
let bothDraw=await scenario({dadCards:dadWin,oppCards:oppLose,atBreakingPoint:true,double:true,rewards:["draw","draw"]});
assert.equal(bothDraw.game.players[0].stash.length,3);
assert.equal(bothDraw.game.players[0].hand.length,6,"draw + draw delivers four cards");

const dadSecondLoss=[S,S,A,A,A,A,A,A],oppSecondWin=[A,A,A,A,S,S,A,A];
let risk=await scenario({dadCards:dadSecondLoss,oppCards:oppSecondWin,atBreakingPoint:true,double:true,rewards:["draw"],hand:[A,B],stash:[A,B,S]});
assert.equal(risk.result,-1);
assert.equal(risk.game.players[0].stash.length,1,"second-hand loss costs 2 Stash");
assert.equal(risk.game.players[0].hand.length,1,"second-hand loss also discards 1 card");
assert.equal(risk.game.players[0].discard.includes(A),true,"chosen hand card goes to discard");
assert.equal(risk.game.players[0].deck.length>=2,true,"first prize cards returned without payout");
assert.equal(risk.game.pokerLast.result.includes("First reward forfeited"),true);
assert.equal(risk.game.players[0].hp,10,"poker loss doesn't damage the Leader");

let firstLoss=await scenario({dadCards:[A,A,A,A],oppCards:[S,S,A,A],hand:[A,B],stash:[A,B,S]});
assert.equal(firstLoss.result,-1);
assert.equal(firstLoss.game.players[0].stash.length,1);
assert.equal(firstLoss.game.players[0].hand.length,1);
assert.equal(firstLoss.game.players[0].discard.includes(A),true,"player chooses discard card");

let noHand=await scenario({dadCards:[A,A,A,A],oppCards:[S,S,A,A],hand:[],stash:[A]});
assert.equal(noHand.result,-1);
assert.equal(noHand.game.players[0].stash.length,0);
assert.equal(noHand.requests.some(r=>r.pokerLossDiscard),false,"no discard dialog when hand empty");

let survivor=await scenario({dadCards:[A,A,A,A],oppCards:[S,S,A,A],hand:[A],stash:[A,B,S]});
// A loss does not defeat any friendly Character, preserving board gameplay.
const boardGame=new Game(pool,{decks:[dad,baseline.decks[0]]},async r=>r.pokerReward?"stash":r.pokerFold?"play":r.pokerCards?[0,1]:r.pokerLossDiscard?0:null,()=>{},{firstPlayer:0});
boardGame.turn=0;
const character=boardGame.enter(0,"LAB-GD-005");
boardGame.players[0].deck=[A,A,A,A].reverse();
boardGame.players[1].deck=[S,S,A,A].reverse();
boardGame.players[0].hand=[A];
boardGame.players[0].stash=[A,B,S];
boardGame.players[0].fuel=3;
const orig=Math.random;Math.random=()=>0.1;
try{await boardGame.dadPoker(0)}finally{Math.random=orig}
assert(boardGame.obj(character.uid),"the reworked loss never wipes the Character board");

let tie=await scenario({
  dadCards:[S,S,A,A,A,A,A,A],oppCards:[A,A,A,A,A,A,A,A],
  atBreakingPoint:true,double:true,rewards:["stash"]
});
assert.equal(tie.result,0,"second hand ties");
assert.equal(tie.game.players[0].stash.length,5,"second tie preserves first reward");
assert.equal(tie.game.pokerLast.result.includes("First reward paid"),true);

const shortDeck=await scenario({atBreakingPoint:true});
assert.equal(shortDeck.requests.some(r=>r.pokerDoubleDown),false,"cannot offer second hand without 4 more cards for each deck");
console.log("PASS: Gambling Dad rework, both 2-unit rewards, Double Down unlock/decline/win/mixed/draw/loss/tie, 2 Stash + 1 discard, board survives, short decks");
