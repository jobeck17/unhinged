import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {Game} from './engine.mjs';
import {chooseMove} from './ai.mjs';
const pool=JSON.parse(fs.readFileSync(new URL('./CARDS.json',import.meta.url)));
const doc=JSON.parse(fs.readFileSync(new URL('./DECKS.json',import.meta.url)));
const games=Number(process.env.GAMES_PER_MATCHUP||40);
if(!Number.isInteger(games)||games<2||games%2)throw Error('Use an even GAMES_PER_MATCHUP >= 2');
const selected=(process.env.VARIANTS||'none,survivor,simultaneous,schemes').split(',');
const result={version:pool.version,date:new Date().toISOString(),seedBase:Number(process.env.SEED_BASE||81003000),gamesPerMatchup:games,method:'Same 71-card LAB pool and eight fixed decks; paired seed and starting player. Heuristic AI. These are structural ablations, not a comparison against canonical Carl.',fileHashes:Object.fromEntries(['CARDS.json','DECKS.json','engine.mjs','ai.mjs'].map(f=>[f,createHash('sha256').update(fs.readFileSync(new URL(f,import.meta.url))).digest('hex')])),variants:{}};
for(const variant of selected){
 const stats={games:0,censored:0,firstWins:0,rounds:[],deckOut:0,byDeck:doc.decks.map(d=>({leader:d.leader,games:0,wins:0})),matchups:[],lead3:{games:0,wins:0},materialLead3:{games:0,wins:0},work:0,progress:0,interrupted:0,schemes:0,responses:0,attacks:0,blocks:0,bothWorked:0};
 for(let a=0;a<doc.decks.length;a++)for(let b=a+1;b<doc.decks.length;b++){
  let wins=0,censored=0;
  for(let i=0;i<games;i++){
   const g=new Game(pool,doc,[a,b],{seed:result.seedBase+a*100000+b*1000+i,firstPlayer:i%2,combat:variant==='schemes'?'simultaneous':variant,schemes:variant==='schemes'});
   let count=0,lead=null,materialLead=null,captured=false;
   while(g.winner===null&&g.round<=60&&count++<2000){
    const m=chooseMove(g);g.apply(m);
    if(!captured&&g.round>=4){captured=true;const n=g.chars(0).length-g.chars(1).length;if(Math.abs(n)>=2)lead=n>0?0:1;const v=[0,1].map(p=>g.chars(p).reduce((n,x)=>n+g.power(x)+Math.max(0,g.remaining(x)),0));if(Math.abs(v[0]-v[1])>=6)materialLead=v[0]>v[1]?0:1;}
    for(let p=0;p<2;p++){
     const s=g.players[p];const search=g.phase==='choose'&&g.actor===p&&g.choice.kind==='findCard'?g.searchTop.length:0;
     const total=s.deck.length+s.hand.length+s.discard.length+s.stash.length+s.board.filter(x=>!g.card(x).token).length+search;
     if(total!==40)throw Error(`Card conservation ${variant} ${a}/${b}/${i}: P${p} = ${total}`);
     if(s.stash.some(x=>typeof x.ready!=='boolean')||s.hp>25)throw Error('State invariant');
    }
   }
   stats.games++;stats.byDeck[a].games++;stats.byDeck[b].games++;
   if(g.winner===null){stats.censored++;censored++;continue;}
   const winner=g.winner===0?a:b;stats.byDeck[winner].wins++;if(g.winner===0)wins++;
   if(g.winner===g.first)stats.firstWins++;stats.rounds.push(g.round);if(g.endReason==='deck-out')stats.deckOut++;
   if(lead!==null){stats.lead3.games++;if(g.winner===lead)stats.lead3.wins++;}
   if(materialLead!==null){stats.materialLead3.games++;if(g.winner===materialLead)stats.materialLead3.wins++;}
   if(g.metrics.every(x=>x.work>0))stats.bothWorked++;
   for(const m of g.metrics)for(const key of ['work','progress','interrupted','schemes','responses','attacks','blocks'])stats[key]+=m[key];
  }
  stats.matchups.push({a:doc.decks[a].leader,b:doc.decks[b].leader,games,winsA:wins,censored});
 }
 const complete=stats.games-stats.censored,rounds=stats.rounds.sort((a,b)=>a-b);
 stats.averageRounds=rounds.reduce((a,b)=>a+b,0)/complete;stats.medianRounds=rounds[Math.floor(rounds.length/2)];delete stats.rounds;
 stats.firstPlayerWinRate=stats.firstWins/complete;stats.lead3.winRate=stats.lead3.wins/stats.lead3.games;stats.materialLead3.winRate=stats.materialLead3.wins/stats.materialLead3.games;
 stats.byDeck.forEach(d=>d.winRate=d.wins/d.games);
 result.variants[variant]=stats;
 console.log(JSON.stringify({variant,games:stats.games,censored:stats.censored,averageRounds:stats.averageRounds,deckOut:stats.deckOut,first:stats.firstPlayerWinRate,lead3:stats.lead3,work:stats.work,schemes:stats.schemes,byDeck:stats.byDeck}));
}
const output=process.env.OUTPUT||'results.json';fs.writeFileSync(new URL(output,import.meta.url),JSON.stringify(result,null,2)+'\n');
