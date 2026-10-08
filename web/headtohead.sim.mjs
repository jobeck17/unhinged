import fs from 'node:fs';
import {Game} from './engine.js?v=mordecai-04-stonewall-01';
import './magician.js';import './cat-lady.js';import './rockstar.js';import './reckless.js';import './stonewall.js';
import {aiAction,aiChoice} from './ai.js';
const pool=JSON.parse(fs.readFileSync(new URL('../CARDS.json',import.meta.url))),doc=JSON.parse(fs.readFileSync(new URL('../DECKS.json',import.meta.url)));
const fl=doc.decks.find(d=>d.leader==='Florida Man'),hoa=doc.decks.find(d=>d.leader==='HOA President');
function rng(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
const originalRandom=Math.random,rows=[];
try{
 for(let seed=1;seed<=100;seed++)for(let swap=0;swap<2;swap++)for(let first=0;first<2;first++){
  const random=rng(20261008+seed*7919);Math.random=random;let g;
  const field=swap?[hoa,fl]:[fl,hoa];
  g=new Game(pool,{decks:field},r=>Promise.resolve(aiChoice(g,r)),()=>{},{firstPlayer:first});g.random=random;g.begin();
  let steps=0,reason=null;
  while(g.winner===null&&g.round<=60&&steps<1500){
   steps++;const a=aiAction(g,g.turn),before=JSON.stringify([g.turn,g.round,g.players]),events=g.eventCount;
   if(a.type==='stash')g.stash(a.index);
   else if(a.type==='play')await g.play(a.index);
   else if(a.type==='attack')await g.attack(a.uid);
   else if(a.type==='trouble')await g.causeTrouble(a.uid);
   else if(a.type==='activate')await g.activate(a.uid);
   else if(a.type==='pass')await g.pass();
   else throw Error('Unknown action '+a.type);
   if(g.winner===null&&before===JSON.stringify([g.turn,g.round,g.players])&&events===g.eventCount){reason='AI no progress: '+JSON.stringify(a);break}
   const count=g.players.reduce((n,s)=>n+s.deck.length+s.hand.length+s.discard.length+s.stash.length+s.board.reduce((n,x)=>n+1+(x.lower?1:0)+(x.cargo?.length||0)+(x.hidden?1:0),0),0);
   if(count!==80)throw Error('card conservation failed '+count);
  }
  rows.push({seed,swap,firstLeader:field[first].leader,winner:g.winner===null?null:field[g.winner].leader,rounds:g.round,steps,reason:g.winner===null?(reason||'60-round / 1500-action cap'):null,states:g.players.map((s,p)=>({leader:field[p].leader,bp:s.breakingPointHit,lastStraw:s.lastStraw,empty:s.empty||false,hp:s.hp,characters:g.chars(p).length})),rolls:g.diceSequence||0});
 }
}finally{Math.random=originalRandom}
const finished=rows.filter(x=>x.winner),rounds=finished.map(x=>x.rounds).sort((a,b)=>a-b);
const quantile=p=>rounds[Math.floor((rounds.length-1)*p)];
const report={date:'2026-10-08',games:rows.length,completed:finished.length,unresolved:rows.filter(x=>!x.winner).length,method:'100 seeded shuffle/dice streams × both deck seats × both first players. Production browser engine and current aiAction/aiChoice; no mulligans. All locked cards represented in coverage decks, not tuned lists. No simulator substitute or heuristic effect approximations.',wins:Object.fromEntries([fl,hoa].map(d=>[d.leader,{wins:finished.filter(x=>x.winner===d.leader).length,winRate:finished.filter(x=>x.winner===d.leader).length/finished.length,whenFirst:{games:rows.filter(x=>x.firstLeader===d.leader).length,wins:finished.filter(x=>x.firstLeader===d.leader&&x.winner===d.leader).length},whenSecond:{games:rows.filter(x=>x.firstLeader!==d.leader).length,wins:finished.filter(x=>x.firstLeader!==d.leader&&x.winner===d.leader).length},breakingPoint:rows.filter(x=>x.states.find(s=>s.leader===d.leader).bp).length,lastStraw:rows.filter(x=>x.states.find(s=>s.leader===d.leader).lastStraw).length,emptyDeck:rows.filter(x=>x.states.find(s=>s.leader===d.leader).empty).length} ])),firstPlayerWins:finished.filter(x=>x.winner===x.firstLeader).length,rounds:{mean:rounds.reduce((a,b)=>a+b,0)/rounds.length,median:quantile(.5),p90:quantile(.9),min:rounds[0],max:rounds.at(-1)},unresolvedExamples:rows.filter(x=>!x.winner).slice(0,5),limitations:['Current AI is a simple heuristic, not an expert pilot. It does not mulligan and stashes the first available hand card.','Ready/support cards are not optimally sequenced; this may disadvantage Stonewall.','Unique shared Last Straw effects are still pending; only current standard Last Straw rules apply.','No card tuning, alternate lists or other-style matchups tested.']};
fs.writeFileSync(new URL('../HEAD_TO_HEAD_20261008.json',import.meta.url),JSON.stringify({report,games:rows},null,2)+'\n');
console.log(JSON.stringify(report,null,2));
