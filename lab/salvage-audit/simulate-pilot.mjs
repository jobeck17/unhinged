import fs from 'node:fs';
import {Game,pool,doc,coverage,focused} from './fixtures.mjs';
import {action,choice,normal,itemCount} from './pilot.mjs';
const SEEDS=Number(process.env.SALVAGE_SEEDS||20),rows=[];
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function conservation(g){return g.players.reduce((n,s)=>n+s.hand.length+s.deck.length+s.discard.length+s.stash.length+s.board.reduce((n,x)=>n+1+(x.lower?1:0)+(x.cargo?.length||0)+(x.stored?1:0)+(x.heapItems?.length||0)+(x.hidden?1:0),0),0)}
const opponents=['Florida Man','HOA President','Birthday Party Magician'].map(n=>doc.decks.find(d=>d.leader===n));
const originalRandom=Math.random;
try{
 for(const deck of [coverage,focused])for(const policy of ['fuel-first','heap-first'])for(const opp of opponents)for(let seed=1;seed<=SEEDS;seed++)for(let seat=0;seat<2;seat++)for(let first=0;first<2;first++){
  const random=rng(20261013+seed*7919);Math.random=random;let g;const field=seat?[opp,deck]:[deck,opp],p=seat;
  g=new Game(pool,{decks:field},r=>Promise.resolve(choice(g,r,policy)),()=>{},{firstPlayer:first});g.random=random;g.begin();
  let steps=0,stall=null,maxBonus=0,maxFuel=0,maxHeap=0,minItemsAfterHeap=null,handDryTurns=0,observedTurn=-1;
  while(g.winner===null&&g.round<=45&&steps<1800){
   steps++;if(g.turn===p&&g.turnSerial!==observedTurn){observedTurn=g.turnSerial;if(safeHand(g,p)===0)handDryTurns++;maxBonus=Math.max(maxBonus,g.players[p].fuel-normal(g,p));maxFuel=Math.max(maxFuel,g.availableFuel(p));}
   for(const h of g.chars(p).filter(x=>x.id==='LAB-SAL-003')){maxHeap=Math.max(maxHeap,(h.heapItems||[]).length);if((h.heapItems||[]).length>=3){const s=g.players[p],accessible=s.hand.filter(id=>g.card(id).type==='Item').length+itemCount(g,p)+s.discard.filter(id=>g.card(id).type==='Item').length;minItemsAfterHeap=minItemsAfterHeap===null?accessible:Math.min(minItemsAfterHeap,accessible);}}
   const a=action(g,g.turn),before=JSON.stringify([g.turn,g.round,g.players]),events=g.eventCount;
   if(a.type==='stash')g.stash(a.index);else if(a.type==='play')await g.play(a.index);else if(a.type==='activate')await g.activate(a.uid);else if(a.type==='attack')await g.attack(a.uid);else if(a.type==='trouble')await g.causeTrouble(a.uid);else await g.pass();
   if(conservation(g)!==80)throw Error('Card conservation '+conservation(g)+' '+JSON.stringify({a,leader:deck.name,opp:opp.leader,seed,seat,first,log:g.log.slice(0,6)}));
   for(const s of g.players)if(s.fuel<0||s.fuel>s.stash.length)throw Error('Fuel bound');
   if(g.winner===null&&before===JSON.stringify([g.turn,g.round,g.players])&&g.eventCount===events){stall=JSON.stringify(a);break;}
  }
  const s=g.players[p],deploy=s.salDeploys||[];
  rows.push({list:deck.name,policy,opponent:opp.leader,seed,seat,first:g.name(first),winner:g.winner===null?null:g.name(g.winner),round:g.round,steps,stall,maxBonus,maxFuel,maxHeap,minItemsAfterHeap,handDryTurns,salCreated:s.salCreated||0,salSpent:s.salSpent||0,dismissals:s.salDismissTotal||0,empty:s.empty||false,earlyFour:deploy.filter(v=>v.cost>=4&&v.round<=3).length,earlySix:deploy.filter(v=>v.cost>=6&&v.round<=4).length,deploys:deploy.filter(v=>g.card(v.id).type==='Character'),log:g.winner===null?g.log.slice(0,6):undefined});
 }
}finally{Math.random=originalRandom}
function safeHand(g,p){return g.players[p].hand.length}
const groups=[];
for(const d of [coverage,focused])for(const policy of ['fuel-first','heap-first'])for(const opp of opponents){
 const a=rows.filter(v=>v.list===d.name&&v.policy===policy&&v.opponent===opp.leader),finished=a.filter(v=>v.winner),mean=k=>a.reduce((n,v)=>n+(v[k]||0),0)/a.length;
 groups.push({list:d.name,policy,opponent:opp.leader,games:a.length,completed:finished.length,salvageWins:finished.filter(v=>v.winner==='Trash Baron').length,meanRounds:mean('round'),meanTempCreated:mean('salCreated'),meanTempSpent:mean('salSpent'),meanDismissals:mean('dismissals'),gamesFourCostByTurn3:a.filter(v=>v.earlyFour).length,gamesSixCostByTurn4:a.filter(v=>v.earlySix).length,maxTemporaryFuel:Math.max(...a.map(v=>v.maxBonus)),gamesHeapOnline:a.filter(v=>v.maxHeap>=3).length,gamesHeapFive:a.filter(v=>v.maxHeap>=5).length,gamesZeroAccessibleItemsAfterHeap:a.filter(v=>v.minItemsAfterHeap===0).length,emptyDeckGames:a.filter(v=>v.empty).length,stalls:a.filter(v=>v.stall).length});
}
const report={date:'2026-10-13',games:rows.length,completed:rows.filter(v=>v.winner).length,groups,limitations:['Isolated prototype implements approved Salvage rules atop the production engine; live playtest unchanged.','Coverage and Item-focused 40-card trial lists are provisional; three opposing production decks are coverage lists.','Heuristic AI, no mulligans. Two storage-priority policies; not expert pilots or optimized competitors.','Only mono matchups with Florida Man, HOA and Magician. No mixed-Style balance conclusions.','Scurry Away reduces ordinary Trouble Composure loss; existing Last Straw successful-Trouble rule remains protected.','Seed matching fixes initial random stream; subsequent decisions consume different randomness.'],unresolved:rows.filter(v=>!v.winner).slice(0,10)};
fs.writeFileSync(new URL('./RESULTS_PILOT_20261013.json',import.meta.url),JSON.stringify({report,games:rows},null,2)+'\n');console.log(JSON.stringify(report,null,2));
