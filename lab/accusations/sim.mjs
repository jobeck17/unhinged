// Headless bot-vs-bot simulator for the Accusations browser lab.
// Runs the real inline game code from index.html in a VM with a stub DOM.
// Usage: node lab/accusations/sim.mjs [games-per-pairing=200] [seed=1]
// TESTING tool: bot results describe heuristic play, not human balance.
import {readFileSync} from "node:fs";
import vm from "node:vm";
import {pathToFileURL} from "node:url";

const html=readFileSync(new URL("./index.html",import.meta.url),"utf8");
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const isMain=process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href;
const N=Number((isMain&&process.argv[2])||200),SEED=Number((isMain&&process.argv[3])||1);
const ROUND_CAP=40;

// The original pre-rewrite bot, generalized to either seat, kept only as a benchmark opponent.
const BASIC_BOT=`function basicBot(p){
 if(g.active!==p||g.winner!==null)return;
 const o=other(p),me=side(p);
 if(!me.stashed&&me.hand.length){
  const cheapest=me.hand.filter(c=>c.type==='Character').sort((a,b)=>a.cost-b.cost)[0];
  const fodder=me.hand.filter(c=>c.id!==cheapest?.id).sort((a,b)=>b.cost-a.cost)[0]||me.hand[me.hand.length-1];
  if(fodder)stash(fodder.id);
 }
 for(let n=0;n<3;n++){const ready=me.stash.filter(c=>!c.rot).length;
  const choice=me.hand.filter(c=>c.type==='Character'&&c.cost<=ready).sort((a,b)=>a.cost-b.cost)[0];
  if(!choice)break;play(choice)}
 for(let i=0;i<3;i++){const sc=g.slots[i];if(!sc||sc.owner!==o||at(p,i).length)continue;
  const d=readyFilers(p).sort((a,b)=>a.cost-b.cost)[0];if(d)commit(d,i)}
 for(const c of [...me.chars])if(canClaim(c))claimScenario(c.id);
 if(g.winner!==null)return;
 for(const c of [...me.chars]){
  if(!me.chars.includes(c)||c.rot||c.loc<0||c.attackBan||(c.turn===g.turn&&c.name!=='Spring Break Frat Bro'&&!c.watch))continue;
  const enemy=at(o,c.loc).sort((a,b)=>(hp(a,o)-a.damage)-(hp(b,o)-b.damage))[0];
  if(enemy){selected={kind:'attack',id:c.id};clickCard(enemy.id,o)}
 }
 for(const c of [...me.chars])if(canClaim(c))claimScenario(c.id);
 if(g.winner!==null)return;selected=null;
 if(!me.playedScenario&&g.slots.some(s=>!s)&&g.slots.filter(s=>s?.owner===p).length<2){
  const chars=readyFilers(p).slice(0,6),stashReady=me.stash.filter(s=>!s.rot).length,cands=[];
  for(const sc of me.sh)for(let mask=1;mask<(1<<chars.length);mask++){
   const group=chars.filter((c,i)=>mask&(1<<i));if(group.length>3)continue;
   const value=group.reduce((s,c)=>s+c.cost,0),need=Math.max(0,sc.cost-value);
   if(need<=stashReady)cands.push({sc,group,need,score:need*3+group.length*2+Math.max(0,value-sc.cost)})}
  cands.sort((a,b)=>a.score-b.score);
  if(cands.length){const x=cands[0];beginFiling(x.sc);if(filing){filing.chars=x.group.map(c=>c.id);filing.stash=x.need;confirmFiling()}}
 }
 filing=null;selected=null;
}`;

function boot(seed){
 let s=seed%2147483647||1;
 const rng=()=>(s=s*16807%2147483647)/2147483647;
 const M=Object.create(Math);M.random=rng;
 const els=new Map(),stub=()=>{const e={value:"",innerHTML:"",textContent:"",style:{},className:"",id:"",onclick:null,disabled:false,
  closest:()=>stub(),querySelector:()=>stub(),insertBefore(){},after(){},appendChild(){},remove(){}};e.parentNode=e;return e};
 const document={getElementById:id=>{if(!els.has(id))els.set(id,stub());return els.get(id)},querySelector:()=>stub(),createElement:()=>stub(),body:stub()};
 document.getElementById("p0").value="hoa";document.getElementById("p1").value="fl";
 const issues={alerts:[],errors:[]};
 const ctx={document,console,Math:M,alert:m=>issues.alerts.push(m),SIM_STRICT:false};ctx.window=ctx;ctx.globalThis=ctx;
 vm.createContext(ctx);
 for(const code of scripts)vm.runInContext(code,ctx);
 vm.runInContext(BASIC_BOT+";render=function(){};",ctx);
 const run=code=>vm.runInContext(code,ctx);
 // Count Scenario outcomes and catch bot errors through the live global bindings.
 run(`var __st;const __dismiss=dismiss;dismiss=function(i,kind){const s=g.slots[i];if(s){const k=kind==='failure'&&at(other(s.owner),i).length?'defended':kind;__st[k][s.owner]++;if(kind==='success')__st.claims.push([s.owner,g.round])}return __dismiss(i,kind)};
 const __confirm=confirmFiling;confirmFiling=function(){const before=side(g.active).playedScenario;__confirm();if(!before&&side(g.active).playedScenario)__st.filed[g.active]++};
 const __note=note;note=function(t){if(/Bot error/.test(t))__st.errors.push(t);return __note(t)};`);
 return {run,ctx,issues};
}

function playGame({seed,styles,first,bots,rules}){
 const {run,ctx,issues}=boot(seed);
 ctx.document.getElementById("p0").value=styles[0];
 ctx.document.getElementById("p1").value=styles[1];
 ctx.document.getElementById("first").value=first===0?"you":"bot";
 run(`__st={success:[0,0],failure:[0,0],defended:[0,0],abandon:[0,0],filed:[0,0],errors:[],claims:[]};newGame();g.rules=${JSON.stringify(rules)};botMulligan(0);botMulligan(1);draw(g.first)`);
 const B=JSON.stringify(bots);
 run(`(()=>{const bots=${B};while(g.winner===null&&g.round<=${ROUND_CAP}){const p=g.active;(bots[p]==='smart'?smartBot:basicBot)(p);if(g.winner!==null)break;passTurn()}})()`);
 const r=JSON.parse(run(`JSON.stringify({winner:g.winner,round:g.round,turn:g.turn,verdict:[side(0).verdict,side(1).verdict],st:__st})`));
 r.alerts=issues.alerts.length;return r;
}

function series(label,{bots,rules={}}){
 const t={games:0,wins:[0,0],firstWins:0,styleWins:{hoa:0,fl:0},draws:0,rounds:0,claims:0,failures:0,defended:0,abandons:0,filed:0,errors:0,alerts:0,loserVerdicts:0,firstClaimRound:0,firstClaimGames:0,firstScorerWins:0,comebacks:0,leadGames:0};
 let seed=SEED*100003;
 for(const styles of [["hoa","fl"],["fl","hoa"]])for(const first of [0,1])for(let n=0;n<N/4;n++){
  const r=playGame({seed:++seed,styles,first,bots,rules});t.games++;
  t.rounds+=r.round;t.alerts+=r.alerts;t.errors+=r.st.errors.length;
  const sum=k=>r.st[k][0]+r.st[k][1];
  t.claims+=sum("success");t.failures+=sum("failure");t.defended+=sum("defended");t.abandons+=sum("abandon");t.filed+=sum("filed");
  const cl=r.st.claims;if(cl.length){t.firstClaimRound+=cl[0][1];t.firstClaimGames++}
  if(r.winner===null){t.draws++;continue}
  if(cl.length&&cl[0][0]===r.winner)t.firstScorerWins++;
  // Comeback: the eventual loser was ever 2+ Verdicts ahead.
  {const v=[0,0];let lead=false;for(const [o] of cl){v[o]++;if(v[1-r.winner]-v[r.winner]>=2)lead=true}t.leadGames++;if(lead)t.comebacks++}
  t.wins[r.winner]++;if(r.winner===first)t.firstWins++;t.styleWins[styles[r.winner]]++;t.loserVerdicts+=r.verdict[1-r.winner];
 }
 const pct=x=>(100*x/t.games).toFixed(0)+"%",per=x=>(x/t.games).toFixed(1),decided=t.games-t.draws;
 console.log(`\n== ${label} (${t.games} games, ${bots[0]} seat 0 vs ${bots[1]} seat 1${rules.claimFromStart?", claimer must start turn at Scenario":""})`);
 console.log(`  seat 0 wins ${pct(t.wins[0])} · seat 1 wins ${pct(t.wins[1])} · unfinished by round ${ROUND_CAP}: ${pct(t.draws)}`);
 console.log(`  first player wins ${decided?(100*t.firstWins/decided).toFixed(0):"-"}% of decided · HOA ${t.styleWins.hoa} / Florida ${t.styleWins.fl} wins · loser averages ${decided?(t.loserVerdicts/decided).toFixed(1):"-"} Verdicts`);
 console.log(`  per game: ${per(t.rounds)} rounds · ${per(t.filed)} filed · ${per(t.claims)} claimed · ${per(t.defended)} defended (supporters wiped) · ${per(t.failures)} lapsed empty · ${per(t.abandons)} stalemate-released`);
 console.log(`  first Verdict lands round ${t.firstClaimGames?(t.firstClaimRound/t.firstClaimGames).toFixed(1):"-"} on average · first scorer wins ${decided?(100*t.firstScorerWins/decided).toFixed(0):"-"}% · winner came back from 2+ down in ${decided?(100*t.comebacks/decided).toFixed(0):"-"}%`);
 if(t.errors||t.alerts)console.log(`  ! ${t.errors} bot errors, ${t.alerts} illegal-move alerts`);
 return t;
}

export {boot,playGame};
if(isMain){
series("Smart bot mirror — current TESTING rules",{bots:["smart","smart"]});
series("Smart vs original bot",{bots:["smart","basic"]});
series("Original bot mirror — for reference",{bots:["basic","basic"]});
series("Smart mirror — OPEN variant: claimer must start the turn at the Scenario",{bots:["smart","smart"],rules:{claimFromStart:true}});
}
