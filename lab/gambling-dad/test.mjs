import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Game,LEADERS} from "../../web/engine.js";
import {aiAction,aiChoice} from "../../web/ai.js";
import {runOpponentTurn} from "./opponent.mjs";
import {installGamblingDad,pokerValue,handRank,pokerHandType,compareScores,SLOT_MACHINE,slotPayout} from "./poker.mjs";
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),"utf8"));
const cards=read("./cards.json").cards,deck=read("./deck.json");
// The four-card HIGH/LOW picker must show each printed Cost before selecting anything.
const appSource=readFileSync(new URL("./app.js",import.meta.url),"utf8");
const pokerStyle=readFileSync(new URL("./poker.css",import.meta.url),"utf8");
assert.match(appSource,/poker-card-cost/,"poker card faces include prominent printed Cost");
assert.match(appSource,/aria-label="Printed Cost/,"Cost badges are accessible without selection");
assert.match(pokerStyle,/\.poker-card-cost strong\{font-size:26px/,"the Cost number is large on desktop");
assert.match(pokerStyle,/max-width:420px[\s\S]*\.poker-card-cost strong\{font-size:23px/,"the Cost number stays readable on phones");

const canonical=read("../../CARDS.json"),baseline=read("../../DECKS.json");
assert.equal(Object.values(deck.cards).reduce((a,b)=>a+b,0),39);
assert.equal(deck.cards["LAB-GD-001"],4,"all four Roulette Table Squatter copies retain the original ID");
assert.equal(cards.find(c=>c.id==="LAB-GD-001")?.text,"Your other Characters with even Costs get +1 Power.","Squatter is a tiny passive even-Cost support");
assert.deepEqual((({cost,power,guard,trouble})=>[cost,power,guard,trouble])(cards.find(c=>c.id==="LAB-GD-001")),[1,1,2,1],"Squatter keeps its 1-cost 1/2/1 statline");
assert.equal(deck.cards["LAB-GD-003"],3,"all existing Dealer's Child copies preserved");
assert.equal(cards.filter(c=>c.id==="LAB-GD-003").length,1,"rename retains one existing card ID");
assert.equal(cards.find(c=>c.id==="LAB-GD-003")?.name,"Dealer's Child","existing Character renamed in place");
assert.deepEqual((({cost,power,guard,trouble})=>[cost,power,guard,trouble])(cards.find(c=>c.id==="LAB-GD-003")),[2,2,2,1],"two-cost Dealer's Child has 2 Power / 2 Health / 1 Trouble");
assert.equal(cards.filter(c=>c.type==="Character"&&c.cost===2).reduce((n,c)=>n+(deck.cards[c.id]||0),0),3,"all three original Dealer's Child copies occupy two-cost curve");
assert.equal(cards.filter(c=>c.type==="Character"&&c.cost===1).reduce((n,c)=>n+(deck.cards[c.id]||0),0),12,"existing one-cost curve is reduced to twelve");
assert.equal(cards.find(c=>c.id==="LAB-GD-003")?.flavor,"DUDE, he keeps looking at my cards!","flavor text matches chosen joke");
assert.match(cards.find(c=>c.id==="LAB-GD-003")?.text||"",/When this Character enters play, you may look at the top 4 cards/);
assert.doesNotMatch(cards.find(c=>c.id==="LAB-GD-003")?.text||"",/Power this Turn/,"old win bonus no longer printed");
assert(!cards.some(c=>c.name==="Bookie's Nephew"),"previous name is not a second Character");
assert.match(appSource,/c\.flavor\?/, "lab card face exposes flavor alongside ability");
assert.match(appSource,/class="card-flavor"/,"flavor has its own line on card");
assert.match(appSource,/if\(r\.dealersChildPeek\)/,"optional private peek has a dedicated browser dialog");
assert.match(appSource,/dealer-peek-open/,"player chooses when to look at the cards");
assert.match(appSource,/dealer-peek-skip/,"player may decline the peek");
assert.match(appSource,/r\.player!==human\)return "peek"/,"AI opponent peek never displays on the human screen");
assert.match(pokerStyle,/\.card-text \.card-flavor/,"flavor text styled for playtest");
assert.equal(cards.filter(c=>c.id==="LAB-GD-001").length,1,"renamed Character keeps a single card record");
assert.equal(cards.find(c=>c.id==="LAB-GD-001")?.name,"Roulette Table Squatter");
assert.equal(cards.filter(c=>c.name==="Roulette Table Squatter").length,1,"no duplicate card under the new name");
assert(!cards.some(c=>c.name==="Gas Station Regular"),"old Character name is retired");
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

// Squatter's passive adds Power to FRIENDLY, OTHER even-Cost Characters.
const squatterGame=new Game({cards:[...canonical.cards,...cards]},{decks:[deck,baseline.decks[0]]},
 async r=>r.options?.[0]?.value??null,()=>{},{firstPlayer:0});
const squatterId="LAB-GD-001";
const evenCostId="LAB-GD-003"; // Cost 2
const oddCostId="LAB-GD-002"; // Cost 1
const squatter1=squatterGame.enter(0,squatterId);
const evenFriend=squatterGame.enter(0,evenCostId);
const oddFriend=squatterGame.enter(0,oddCostId);
const enemyEven=squatterGame.enter(1,evenCostId);
assert.equal(squatterGame.power(squatter1),1,"Squatter does not increase its own Power");
assert.equal(squatterGame.power(evenFriend),3,"one Squatter grants +1 Power to other even-Cost Character");
assert.equal(squatterGame.power(oddFriend),2,"odd-Cost Characters do not receive bonus");
assert.equal(squatterGame.power(enemyEven),2,"opposing even-Cost Characters are not supported");
const squatter2=squatterGame.enter(0,squatterId);
assert.equal(squatterGame.power(evenFriend),4,"two Squatters currently stack to +2 Power");
assert.equal(squatterGame.power(squatter1),1,"Squatters remain unaffected with two copies");
await squatterGame.remove(squatter2,"discard",true);
assert.equal(squatterGame.power(evenFriend),3,"buff disappears immediately when a Squatter leaves play");
await squatterGame.remove(squatter1,"discard",true);
assert.equal(squatterGame.power(evenFriend),2,"baseline Power restored when no Squatters remain");
assert.equal(squatterGame.power(enemyEven),2,"opponent stats remain unchanged throughout");

const peekKid="LAB-GD-003";
// Verify the changed printed Cost is enforced during an ordinary play.
const costGame=new Game({cards:[...canonical.cards,...cards]},{decks:[deck,baseline.decks[0]]},
 async r=>r.dealersChildPeek?"skip":r.options?.[0]?.value??null,()=>{},{firstPlayer:0});
costGame.turn=0;costGame.round=2;costGame.players[0].hand=[peekKid];
costGame.players[0].stash=["LAB-GD-001","LAB-GD-001"];
costGame.players[0].fuel=1;
assert.equal(costGame.canPlay(0),false,"Dealer's Child cannot be played with only one Ready Stash");
costGame.players[0].fuel=2;
assert.equal(costGame.canPlay(0),true,"Dealer's Child can be played with two Ready Stash");
await costGame.play(0);
assert.equal(costGame.players[0].fuel,0,"Dealer's Child spends two Ready Stash when played normally");
assert.equal(costGame.chars(0).filter(x=>x.id===peekKid).length,1,"two-cost Character enters play");
assert.equal(costGame.power(costGame.chars(0).find(x=>x.id===peekKid)),2,"played Character has 2 Power");
assert.equal(costGame.guard(costGame.chars(0).find(x=>x.id===peekKid)),2,"played Character has 2 Health");
const peekRequests=[];
const peekGame=new Game({cards:[...canonical.cards,...cards]},{decks:[deck,baseline.decks[0]]},
 async r=>{
  if(r.dealersChildPeek){peekRequests.push(r);return peekRequests.length===1?"peek":"skip"}
  if(r.pokerCards)return [0,1];
  if(r.pokerChip)return null;
  if(r.pokerReward)return "stash";
  if(r.pokerDoubleDown)return "walk";
  return r.options?.[0]?.value??null;
 },()=>{},{firstPlayer:0});
peekGame.turn=0;peekGame.round=2;
peekGame.players[0].hand=[peekKid,peekKid];
const untouchedDeck=["LAB-GD-001","LAB-GD-002","LAB-GD-005","LAB-GD-006","LAB-GD-011"];
peekGame.players[1].deck=[...untouchedDeck];
assert.equal(await peekGame.playCard(0,peekKid,"hand",0,{index:0}),true,"Dealer's Child is playable through the actual Character pipeline");
assert.equal(peekRequests.length,1,"entering play triggers one private peek offer");
assert.equal(peekRequests[0].player,0,"only the Character's controller receives the peek");
assert.deepEqual(peekRequests[0].cardIds,["LAB-GD-011","LAB-GD-006","LAB-GD-005","LAB-GD-002"],"peek follows the engine's top-of-deck draw order");
assert.deepEqual(peekGame.players[1].deck,untouchedDeck,"looking doesn't remove or reorder deck cards");
assert(!peekGame.log.some(line=>line.includes("Debt Collector's Roommate")||line.includes("Card Counter Who Can't Count")),"the public log does not reveal peeked card names");
assert.equal(await peekGame.playCard(0,peekKid,"hand",0,{index:0}),true);
assert.equal(peekRequests.length,2,"second played copy offers another optional peek");
assert.deepEqual(peekGame.players[1].deck,untouchedDeck,"declining the optional peek leaves the deck untouched");
assert.equal(peekGame.chars(0).filter(x=>x.id===peekKid).length,2,"both original Character copies are played normally");
peekGame.players[0].deck=["LAB-GD-011","LAB-GD-011","LAB-GD-001","LAB-GD-001"].reverse();
peekGame.players[1].deck=["LAB-GD-001","LAB-GD-001","LAB-GD-001","LAB-GD-001"].reverse();
const randomBeforePeek=Math.random;
Math.random=()=>0.1;
let pokerAfterPeek;
try{pokerAfterPeek=await peekGame.dadPoker(0)}finally{Math.random=randomBeforePeek}
assert.equal(pokerAfterPeek,1,"the test poker hand wins");
assert(peekGame.chars(0).filter(x=>x.id===peekKid).every(x=>x.power===0),"Dealer's Child never receives the retired +1 Power bonus on a win");
const peekShort=new Game({cards:[...canonical.cards,...cards]},{decks:[deck,baseline.decks[0]]},
 async r=>{if(r.dealersChildPeek){assert.deepEqual(r.cardIds,["LAB-GD-001","LAB-GD-002"]);return "skip"}return null},()=>{},{firstPlayer:0});
peekShort.turn=0;peekShort.round=2;peekShort.players[1].deck=["LAB-GD-002","LAB-GD-001"];
await peekShort.enterEffect(peekShort.enter(0,peekKid),[]);
assert.deepEqual(peekShort.players[1].deck,["LAB-GD-002","LAB-GD-001"],"short deck peek reads only available cards, still in original order");
peekShort.players[1].deck=[];
await peekShort.enterEffect(peekShort.enter(0,peekKid),[]);
assert.deepEqual(peekShort.players[1].deck,[],"empty-deck peek does nothing and cannot cause a draw");

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
assert.equal(handRank(catalog,[five,six],"HIGH"),1,"3-Cost Psychologist plus 6 is a High Roller, not a Straight");
assert.equal(handRank(catalog,[one,six],"LOW"),3);
assert.equal(compareScores(score(one,one,"HIGH"),score(five,six,"HIGH"),"HIGH"),1,"Pair outranks Straight even at low Cost");
assert.equal(compareScores(score(one,six,"LOW"),score(six,six,"LOW"),"LOW"),1,"High Roller outranks Pair in LOW");
assert.equal(compareScores(score(one,one,"LOW"),score(six,six,"LOW"),"LOW"),1,"LOW favors lower Cost within same rank");
// Different cards may have wildly different Power, but matching hand type and
// total Cost are a true tie, in both chip modes.
for(const mode of ["HIGH","LOW"]){
 const strong={"p1":{cost:2,power:11,type:"Character"},"p2":{cost:4,power:12,type:"Character"}};
 const weak={"a":{cost:2,power:0,type:"Action"},"b":{cost:4,power:0,type:"Item"}};
 const high=pokerValue(strong,["p1","p2"],mode);
 const low=pokerValue(weak,["a","b"],mode);
 assert.deepEqual(high,low,"Poker ignores printed Power under "+mode);
 assert.equal(compareScores(high,low,mode),0,"equal rank/Cost is TIE in "+mode);
 assert.equal(compareScores(low,high,mode),0,"ties are symmetric in "+mode);
}
assert.doesNotMatch(appSource,/Power breaks Cost ties|Poker Power:|poker-card-stats/,"poker UI never implies Power decides results");
 
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
  assert.deepEqual(actual,[expectedRank,a+b],"score includes only hand rank and combined printed Cost");
  checked++;
 }
}
assert(checked>=200,"all combinations were checked");

// Pit Boss replaces the three Foolproof System cards; still Causes Trouble,
 // cannot Attack, and commits its Ready state to a single watched Character.
 const pitCard=cards.find(c=>c.id==='LAB-GD-005');
 assert.equal(pitCard.name,'Unlicensed Poker Psychologist');
 assert.deepEqual([pitCard.cost,pitCard.power,pitCard.guard,pitCard.trouble],[3,0,4,1]);
 assert.equal(deck.cards['LAB-GD-005'],3);
 const psychologistSelections=[];
 const surveillance=setupPitBoss();
 async function setupPitBossTest(){
  const g=surveillance;g.turn=0;
  const pit=g.enter(0,'LAB-GD-005'),target=g.enter(1,'P001'),ally=g.enter(0,'LAB-GD-001');
  pit.born=1;target.born=1;
  assert.equal(g.canAttack(pit),false,'Pit Boss never attacks');
  assert.equal(g.canCauseTrouble(pit),true,'Pit Boss can Cause Trouble while Ready');
  assert.equal(g.canUse(pit),true,'Pit Boss can mark opposing Character');
  await g.activate(pit.uid);
  assert.equal(psychologistSelections.length,1,'dedicated psychologist chooser appeared');
  assert.equal(psychologistSelections[0].psychologistTarget,true);
  assert.deepEqual(psychologistSelections[0].options.map(o=>o.value),[target.uid],'only opposing Characters can be marked');
  assert.equal(pit.pitMark,target.uid);
  assert.equal(pit.ready,false);
  target.ready=false;
  await g.advance();
  assert(g.log.some(line=>line.includes('Unlicensed Poker Psychologist:')&&line.includes('Draw a card')),'target rotation draws');
  const eventCount=g.log.filter(line=>line.includes('Unlicensed Poker Psychologist:')&&line.includes('Draw a card')).length;
  await g.advance();
  assert.equal(g.log.filter(line=>line.includes('Unlicensed Poker Psychologist:')&&line.includes('Draw a card')).length,eventCount,'no repeated draw without a fresh rotation');
  g.turn=0;g.startTurn();
  assert.equal(pit.ready,false,'Pit Boss stays Rotated while marking');
  assert.equal(g.canCauseTrouble(pit),false,'Rotated Pit Boss cannot Cause Trouble');
  await g.remove(target);
  g.startTurn();
  assert.equal(pit.pitMark,null);
  assert.equal(pit.ready,true,'Pit Boss can Ready once watched Character leaves');
 }
 await setupPitBossTest();
 function setupPitBoss(){
  const g=new Game({cards:[...canonical.cards,...cards]},{decks:[deck,baseline.decks[0]]},
    async r=>{if(r.psychologistTarget)psychologistSelections.push(r);return r.options?.[0]?.value??null},()=>{},{firstPlayer:0});
  g.round=2;return g;
 }
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
  if(r.pokerReward)return "stash";
  if(r.pokerDoubleDown)return "walk";
  if(r.pokerCards){
   assert.equal(r.pokerMode,mode,"Picker receives actual chip mode");
   assert.equal(r.options.length,4,"Always show four individually selectable cards");
   if(r.player===0&&!r.pokerBluffRepick){
    assert.equal(r.canFold,true,"first hand offers Fold on its four-card picker");
    if(decision==="fold")return "fold";
   }else assert(!r.canFold,"Fold must not appear on opponent or Bluff repick pickers");
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
 assert.equal(requests.some(r=>r.pokerFold),false,"No separate pre-hand Fold dialog");
 assert(requests.some(r=>r.pokerCards && r.canFold),"Fold belongs to first poker card picker");
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
assert.equal(win.g.players[0].stash.length,2);
assert.equal(win.g.players[0].fuel,2);
assert.equal(win.g.players[0].deck.length,2);
assert.equal(win.g.players[1].deck.length,4);
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
assert.equal(fold.requests.filter(r=>r.pokerCards).length,1,"Fold chosen on the first poker picker; opponent never chooses a hand");
assert.equal(fold.requests[fold.requests.length-1].canFold,true);
assert.equal(fold.requests.some(r=>r.pokerReward),false,"Folding does not resolve a win reward");
assert(!fold.g.canPoker(0));
let manual=await run("HIGH",[one,six,two,five],[one,one,one,one],"play",[0,2]);
assert.equal(manual.requests.filter(r=>r.pokerCards).length,2);
assertRevealedHands(manual.g,"HIGH");
assert.deepEqual(manual.g.players[0].deck,[six,five],"Unselected two cards return to bottom of deck");
// Bluff appears on the original four-card poker picker, before confirming a hand.
const bluffRequests=[];
let bluffGame=setup(async r=>{
 bluffRequests.push(r);
 if(r.pokerChip)return null;
 if(r.pokerFold)return "play";
 if(r.pokerCards){
  if(r.player===0 && r.pokerBluffRepick){
   assert.equal(r.canBluff,false,"cannot Bluff a second time on the mulligan picker");
   return [1,2]; // choose a kept card and a freshly drawn card
  }
  if(r.player===0){
   assert.equal(r.canBluff,true,"Bluff is available on the original poker picker");
   return {indices:[0,1],bluff:true};
  }
  return [...r.recommendedPair];
 }
 return r.options?.[0]?.value??null;
});
bluffGame.players[0].hand=["LAB-GD-013"];
bluffGame.players[0].stash=[one,one];
bluffGame.players[0].fuel=2;
// Initial poker draw (from the top): six, one, one, two.
// Bluff discards six+one; kept: one+two, new: six+five.
bluffGame.players[0].deck=[five,six,two,one,one,six];
bluffGame.players[1].deck=[one,one,one,one];
const originalRandom=Math.random; Math.random=()=>0.9;
try{await bluffGame.dadPoker(0)}finally{Math.random=originalRandom}
assert.equal(bluffRequests.filter(r=>r.pokerBluff).length,0,"no separate Bluff popup is requested");
assert.equal(bluffRequests.filter(r=>r.pokerCards && r.player===0).length,2,"initial picker and mulligan picker both offered");
assert.equal(bluffGame.pokerLast.dadHand.type,"High Roller");
assert.deepEqual(bluffGame.pokerLast.dadHand.cards.map(c=>c.cost),[2,6],"mulligan picks any two from the four available");
assert.deepEqual(bluffGame.players[0].deck,[one,five],"unselected mulligan cards return to bottom");
assert.equal(bluffGame.players[0].hand.includes("LAB-GD-013"),false,"Bluff action is consumed");
assert(bluffGame.players[0].discard.includes("LAB-GD-013"),"Bluff goes to discard");
assert.equal(bluffGame.players[0].fuel,2,"Bluff costs 2 Ready Stash before winning 2 Ready Stash");
const pokerScreenSource=readFileSync(new URL("./app.js",import.meta.url),"utf8");
assert.match(pokerScreenSource,/id="poker-redraw-bluff"/,"Bluff control is present on poker picker");
assert.match(pokerScreenSource,/resolve\(\{indices:\[\.\.\.picked\],bluff:true\}\)/,"Bluff uses the selected cards directly");

let tie=await run("HIGH",[one,one,one,one],[one,one,one,one]);
assert.equal(tie.outcome,0,"Identical Matching Pairs tie");
assertRevealedHands(tie.g,"HIGH");
assert.equal(tie.g.pokerLast.dadHand.type,"Matching Pair");
assert.equal(tie.g.pokerLast.oppHand.type,"Matching Pair");
// End-to-end regression: previously LOW (and HIGH) could decide matching Cost
// using Power, incorrectly making one player lose instead of declaring a tie.
for(const mode of ["HIGH","LOW"]){
 const realTie=await run(mode,Array(4).fill(one),Array(4).fill("LAB-GD-002"));
 assert.equal(realTie.outcome,0,mode+": matching pairs with the same Cost are a complete tie");
 assert.equal(realTie.g.pokerLast.result,"TIE · no new reward",mode+": no winner is awarded");
 assert.equal(realTie.g.pokerLast.costDad,2);
 assert.equal(realTie.g.pokerLast.costOpp,2);
 assert.equal(realTie.g.pokerLast.powerDad,undefined,"Power is not used or recorded for poker");
 assert.equal(realTie.g.pokerLast.powerOpp,undefined,"Power is not used or recorded for poker");
 assert.equal(realTie.requests.filter(r=>r.pokerReward||r.pokerLossDiscard).length,0,"tie has no win reward or loss penalty");
 assert.equal(realTie.g.players[0].discard.filter(id=>id===one).length,2,"Dad commits two cards on tie");
 assert.equal(realTie.g.players[1].discard.filter(id=>id==="LAB-GD-002").length,2,"opponent commits two cards on tie");
 assert.equal(realTie.g.log.some(line=>line.includes("A complete TIE")),true);
}

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

console.log("PASS: "+checked+" generalized HIGH/LOW Cost-pair cases, optimal AI selection, four-card picker, revealed both hands on wins/losses/ties, fold, ownership and lab isolation, 8 slot outcomes, full activation branches, Florida Man opponent-turn recovery, and inline Bluff mulligan");
