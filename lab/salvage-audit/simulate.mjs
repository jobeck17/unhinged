import fs from 'node:fs';
import {Game,pool,doc,coverage,focused} from './fixtures.mjs';
import {aiAction,aiChoice} from '../../web/ai.js';
const SEEDS=Number(process.env.SALVAGE_SEEDS||20),rows=[];
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const itemCount=(g,p)=>g.players[p].board.filter(x=>g.card(x).type==='Item').length;
const normal=(g,p)=>g.players[p].stash.length-(g.players[p].salTemp||[]).filter(Boolean).length;
function choice(g,r,policy){
 const p=r.player,s=g.players[p],title=r.title||'',opts=r.options||[],values=opts.map(o=>o.value);
 if(title==='Salvage destination'){
  const heaps=opts.filter(o=>typeof o.value==='number').map(o=>g.obj(o.value)).filter(Boolean),heap=heaps.find(h=>(h.heapItems||[]).length<3)||heaps[0];
  if(heap&&(policy==='heap-first'||normal(g,p)>=5)&&(heap.heapItems||[]).length<3)return heap.uid;
  if(values.includes('stash'))return 'stash';return heap?.uid??'discard';
 }
 if(title.startsWith('Scurry Away:')){
  // Save the board unless urgent, but retain Cockroach as cheap repeatable protection.
  const name=title.slice('Scurry Away: return '.length).replace('?',''),x=g.chars(p).find(x=>g.card(x).name===name);
  return s.hp<=6||x?.id==='P104';
 }
 if(title==='Zip Ties: weaken attacker?')return true;
 if(title.includes('enter Rotated for Meat Shield?'))return g.chars(p).length>1;
 if(title==='Vacuum: mill top two?')return s.deck.length>6;
 if(title==='Inventor: deploy revealed Item?')return true;
 if(title.startsWith('Scrap Dealer:'))return opts.filter(o=>g.obj(o.value)&&g.canCauseTrouble(g.obj(o.value))).sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value??opts.find(o=>o.value!==null)?.value??null;
 if(title==='Finders Keepers: top or bottom')return 'top';
 if(title==='Finders Keepers: order remaining')return opts[0]?.value;
 if(title==='Treasure: cash up to two')return opts.slice(0,2).map(o=>o.value);
 if(title==='Another Man’s Treasure: target')return opts.filter(o=>g.obj(o.value)&&g.canCauseTrouble(g.obj(o.value))).sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value??opts[0]?.value;
 if(title==='Play Dead: target')return opts.find(o=>g.obj(o.value)?.owner!==p)?.value??opts[0]?.value;
 if(title.includes('Tin Can Slingshot: target'))return opts.find(o=>g.guard(g.obj(o.value))-g.obj(o.value).damage<=2)?.value??opts.sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value;
 if(title.includes('Busted Shopping Cart: target'))return opts.sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value;
 if(title.startsWith('Possum:'))return opts.find(o=>o.value!==null)?.value??null;
 return aiChoice(g,r);
}
function action(g,p){
 const s=g.players[p];if(g.name(p)!=='Trash Baron')return aiAction(g,p);
 if(!s.stashedThisTurn&&s.hand.length&&(normal(g,p)<6||s.hand.length>=3)){
  const ranking=s.hand.map((id,index)=>({id,index,c:g.card(id)})).sort((a,b)=>{
   const score=v=>(v.c.cost>=5?7:0)+(v.c.type==='Action'?2:0)+(s.hand.filter(id=>id===v.id).length>1?3:0)-(v.c.type==='Item'?5:0)-(v.c.type==='Character'&&v.c.cost===1?6:0);
   return score(b)-score(a);
  });return {type:'stash',index:ranking[0].index};
 }
 const legal=s.hand.map((id,index)=>({id,index,c:g.card(id)})).filter(v=>g.canPlay(v.index,p));
 const play=v=>({type:'play',index:v.index});
 const finish=g.chars(p).filter(x=>g.canCauseTrouble(x)).sort((a,b)=>g.trouble(b)-g.trouble(a))[0];
 if(finish&&(g.players[1-p].lastStraw||g.players[1-p].hp<=g.trouble(finish)))return {type:'trouble',uid:finish.uid};
 const suppliesPresent=itemCount(g,p)>0||s.hand.some(id=>g.card(id).type==='Item');
 const engine=legal.find(v=>v.id==='P093'&&suppliesPresent)||legal.find(v=>v.id==='LAB-SAL-003'&&suppliesPresent&&!g.chars(p).some(x=>x.id==='LAB-SAL-003'));
 if(engine)return play(engine);
 const boost=legal.find(v=>v.id==='P111'&&finish);if(boost)return play(boost);
 const removal= s.board.find(x=>['P119','P112','LAB-SAL-001'].includes(x.id)&&g.canUse(x)&&(x.id!=='LAB-SAL-001'||g.chars(1-p).some(y=>g.trouble(y)>0)));if(removal)return {type:'activate',uid:removal.uid};
 const supplies=legal.find(v=>v.id==='P114')||legal.find(v=>v.id==='P115')||legal.find(v=>v.id==='P109'&&s.hand.length<=4)||legal.find(v=>v.c.type==='Item'&&!s.board.some(x=>x.id===v.id));if(supplies)return play(supplies);
 const usable=s.board.find(x=>g.card(x).type==='Item'&&g.canUse(x)&&(x.id!=='LAB-SAL-001'||g.chars(1-p).some(y=>g.trouble(y)>0)));if(usable)return {type:'activate',uid:usable.uid};
 const refill=legal.find(v=>v.id==='P113'&&(s.hand.length<=3||g.chars(p).some(x=>x.id==='P108'&&g.canCauseTrouble(x))));if(refill)return play(refill);
 const body=legal.filter(v=>v.c.type==='Character'&&(v.id!=='LAB-SAL-003'||itemCount(g,p)||s.hand.some(id=>g.card(id).type==='Item'))).sort((a,b)=>b.c.cost-a.c.cost)[0];if(body)return play(body);
 // A deliberate decision to stop ramping must not make the shared AI return
 // another Stash instruction and thereby skip all existing Characters' actions.
 const stashed=s.stashedThisTurn;s.stashedThisTurn=true;
 try{return aiAction(g,p)}finally{s.stashedThisTurn=stashed;}
}
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
fs.writeFileSync(new URL('./RESULTS_20261013.json',import.meta.url),JSON.stringify({report,games:rows},null,2)+'\n');console.log(JSON.stringify(report,null,2));
