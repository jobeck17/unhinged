#!/usr/bin/env node
/**
 * Unhinged quick 36-deck round-robin runner.
 *
 * Run from repository root:
 *   node production/playtests/six-deck-lab/quick-round-robin.js
 *
 * Optional:
 *   GAMES_PER_MATCHUP=200 node production/playtests/six-deck-lab/quick-round-robin.js
 *
 * This runner is intentionally heuristic. See SIMULATION-METHODOLOGY.md.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const cardsDoc = JSON.parse(fs.readFileSync(path.join(ROOT, "CARDS.json"), "utf8"));
const decksDoc = JSON.parse(fs.readFileSync(path.join(ROOT, "DECKS.json"), "utf8"));
const C = Object.fromEntries(cardsDoc.cards.map(c => [c.id, c]));

const GAMES_PER_MATCHUP = Number(process.env.GAMES_PER_MATCHUP || 100);
if (GAMES_PER_MATCHUP < 2 || GAMES_PER_MATCHUP % 2) throw new Error("GAMES_PER_MATCHUP must be an even integer >= 2.");
const HALF = GAMES_PER_MATCHUP / 2;
const MAX_ROUNDS = 40;

// Balance experiment switches. Keep experiments explicit.
const EXPERIMENT = {build:"Carl 0.3",tagOutNativeOnly:true,floridaSurvivalReady:true};

function scaleList(cards, target) {
  const rows = Object.entries(cards).map(([id, n]) => ({
    id, n, raw: n * target / 40, count: Math.floor(n * target / 40),
  }));
  let total = rows.reduce((s, x) => s + x.count, 0);
  rows.sort((a,b) => (b.raw-b.count)-(a.raw-a.count) || b.n-a.n || a.id.localeCompare(b.id));
  for (const row of rows) {
    if (total >= target) break;
    if (row.count < row.n) { row.count++; total++; }
  }
  return Object.fromEntries(rows.filter(x => x.count).map(x => [x.id, x.count]));
}
function merge(a,b) {
  const out = {...a};
  for (const [id,n] of Object.entries(b)) out[id] = (out[id] || 0) + n;
  return out;
}
function buildField() {
  const out = [];
  for (const primary of decksDoc.decks) {
    out.push({name: primary.leader + " / Mono", leader: primary.leader, primary: primary.styles[0], secondary: null, cards: {...primary.cards}});
    for (const secondary of decksDoc.decks) {
      if (secondary.styles[0] === primary.styles[0]) continue;
      out.push({
        name: primary.leader + " + " + secondary.styles[0],
        leader: primary.leader,
        primary: primary.styles[0],
        secondary: secondary.styles[0],
        cards: merge(scaleList(primary.cards,24), scaleList(secondary.cards,16)),
      });
    }
  }
  return out;
}
function rng32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(a,r) {
  for (let i=a.length-1;i>0;i--) { const j=(r()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function expand(d) {
  const a=[]; for (const [id,n] of Object.entries(d.cards)) for(let i=0;i<n;i++) a.push(id); return a;
}
function makePlayer(d,r) {
  const deck=shuffle(expand(d),r), hand=deck.splice(0,7);
  return {leader:d.leader,deck,hand,discard:[],stash:[],chars:[],items:[],hp:25,turn:0,active:false,tagReady:true,noAttack:false,skipDraw:false};
}
function draw(p,n=1){for(let i=0;i<n;i++){if(!p.deck.length)return false;p.hand.push(p.deck.shift());}return true;}
function readyStash(p){return p.stash.filter(s=>s.ready).length;}
function stashCard(p){
  if(!p.hand.length)return;
  let best=0,bv=Infinity;
  for(let i=0;i<p.hand.length;i++){const c=C[p.hand[i]],v=(c.cost||0)+(c.type==="Character"?1:0);if(v<bv){bv=v;best=i;}}
  p.stash.push({id:p.hand.splice(best,1)[0],ready:true,temp:false});
}
function temporaryStash(p){if(p.deck.length)p.stash.push({id:p.deck.shift(),ready:false,temp:true});}
function pay(p,o,n){
  let q=n;
  if(p.leader==="Trash Baron")for(const s of o.stash)if(q&&s.ready){s.ready=false;q--;}
  for(const s of p.stash)if(q&&s.ready){s.ready=false;q--;}
  return q===0;
}
function guard(g){return C[g.id].guard||1;}
function power(g,p){
  let x=C[g.id].power||0;
  if(g.id==="P005"&&g.damage)x+=2;
  if(g.id==="P013"&&g.damage)x+=3;
  if(g.id==="P033"&&p.hand.length<=2)x+=3;
  if(g.id==="P038"&&p.hand.length===0)x+=4;
  return x;
}
function addCharacter(p,id,hot=false){const g={id,ready:true,entered:p.turn,damage:0,hot,bonusReady:false};p.chars.push(g);return g;}
function returnCharacter(p,g){const i=p.chars.indexOf(g);if(i<0)return false;p.chars.splice(i,1);p.hand.push(g.id);return true;}
function tagOut(p){
  if(p.leader!=="Backyard Wrestler"||!p.active||!p.tagReady||!p.deck.length)return;
  p.tagReady=false;
  const id=p.deck.shift(), c=C[id];
  const nativeOk=!EXPERIMENT.tagOutNativeOnly || c.style==="Expendable";
  if(c.type==="Character" && nativeOk && c.cost<=p.stash.length) addCharacter(p,id,true);
  else p.hand.push(id);
}
function defeat(p,o,g,sacrifice=false){
  const i=p.chars.indexOf(g); if(i<0)return;
  p.chars.splice(i,1); p.discard.push(g.id);
  if(g.id==="P152"&&!sacrifice)o.hp--;
  if(g.id==="P161")p.hand.push(g.id);
  tagOut(p);
}
function damage(p,o,g,n){g.damage+=n;if(g.damage>=guard(g))defeat(p,o,g,false);}
function action(p,o,id){
  // Deliberately compact approximations for quick anomaly detection.
  if(id==="P022"){draw(p,2);if(p.chars[0])damage(p,o,p.chars[0],1);}
  else if(id==="P049"){draw(p);draw(o);}
  else if(id==="P054"){p.discard.push(...p.hand.splice(0));o.discard.push(...o.hand.splice(0));draw(p,3);draw(o,3);}
  else if(id==="P080"){if(p.chars[0])returnCharacter(p,p.chars[0]);}
  else if(id==="P082"){if(o.chars[0])returnCharacter(o,o.chars[0]);}
  else if(id==="P141"){for(const g of [...p.chars])if(!g.ready)returnCharacter(p,g);for(const g of [...o.chars])if(!g.ready)returnCharacter(o,g);}
  else if(id==="P146"){draw(p,2);p.noAttack=true;}
  else if(id==="P171"&&p.chars.length&&o.chars.length){const a=p.chars[0],b=o.chars[0],x=power(a,p);defeat(p,o,a,true);damage(o,p,b,x);if(o.chars.includes(b))returnCharacter(o,b);}
  else if(id==="P174"&&p.chars.length){defeat(p,o,p.chars[0],true);draw(p,2);if(p.hand.length)p.discard.push(p.hand.shift());}
}
function valid(id,p,o){
  if(C[id].text?.startsWith("Response"))return false;
  if(id==="P080"||id==="P174")return p.chars.length>0;
  if(id==="P082")return o.chars.length>0;
  if(id==="P171")return p.chars.length>0&&o.chars.length>0;
  return true;
}
function play(p,o,id){
  const i=p.hand.indexOf(id); if(i<0)return false;
  const n=C[id].cost||0;
  if(readyStash(p)+(p.leader==="Trash Baron"?readyStash(o):0)<n||!pay(p,o,n))return false;
  p.hand.splice(i,1);
  if(C[id].type==="Character")addCharacter(p,id);
  else if(C[id].type==="Item")p.items.push({id,ready:true});
  else {action(p,o,id);p.discard.push(id);}
  return true;
}
function main(p,o){
  if(p.hand.length)stashCard(p);
  for(let k=0;k<14;k++){
    const legal=p.hand.filter(id=>valid(id,p,o)&&readyStash(p)+(p.leader==="Trash Baron"?readyStash(o):0)>=(C[id].cost||0))
      .sort((a,b)=>(C[b].cost||0)-(C[a].cost||0));
    if(!legal.length||!play(p,o,legal[0]))break;
  }
}
function remaining(g){return Math.max(0,guard(g)-g.damage);}
function block(def,atk,round,attacker){
  if(atk.leader==="HOA President"&&round>=8)return null;
  const ready=def.chars.filter(g=>g.ready);if(!ready.length)return null;
  if(def.leader!=="Florida Man")return ready[0];
  const normal=ready.find(g=>!g.bonusReady);if(normal)return normal;
  const ap=power(attacker,atk),safe=ready.filter(g=>remaining(g)>ap).sort((a,b)=>remaining(b)-remaining(a));if(safe.length)return safe[0];
  const saves=ready.filter(g=>ap>=def.hp&&Math.max(0,ap-remaining(g))<def.hp).sort((a,b)=>remaining(b)-remaining(a));return saves[0]||null;
}
function readyFlorida(owner,g){if(owner.leader==="Florida Man"&&owner.chars.includes(g)&&g.damage>0){g.ready=true;g.bonusReady=true;}}
function suckerTarget(p,o,g,round){if(p.leader!=="Florida Man"||g.damage<=0)return null;const first=block(o,p,round,g),ap=power(g,p),a=o.chars.filter(t=>t.ready&&t!==first&&remaining(t)<=ap&&((C[t.id].cost||0)>=3||power(t,o)>=4));if(!a.length)return null;a.sort((x,y)=>((C[y.id].cost||0)*3+power(y,o)*2+remaining(y))-((C[x.id].cost||0)*3+power(x,o)*2+remaining(x)));return a[0];}
function bonusAttackWorthIt(p,o,g,round){if(!g.bonusReady)return true;if(suckerTarget(p,o,g,round))return true;const b=block(o,p,round,g);if(!b)return power(g,p)>=o.hp;if(remaining(b)<=power(g,p))return true;return remaining(g)>power(b,o);}
function attack(p,o,round){
  if(p.noAttack)return;
  for(let k=0;k<30;k++){
    const g=p.chars.find(x=>x.ready&&(x.entered<p.turn||(C[x.id].keywords||[]).includes("Hothead")||x.hot||(p.leader==="Florida Man"&&x.damage>0))&&bonusAttackWorthIt(p,o,x,round));
    if(!g)break;g.ready=false;g.hot=false;g.bonusReady=false;
    if(g.id==='P009'&&Math.floor(Math.random()*6)===0){p.hp-=power(g,p);if(p.hp<=0)break;continue;}
    const t=suckerTarget(p,o,g,round);
    if(t){damage(o,p,t,power(g,p));if(o.chars.includes(t))damage(p,o,g,power(t,o));readyFlorida(p,g);readyFlorida(o,t);}
    else{const x=power(g,p),b=block(o,p,round,g);if(b){b.ready=false;const overflow=Math.max(0,x-remaining(b));damage(o,p,b,x);if(overflow)o.hp-=overflow;if(o.chars.includes(b))damage(p,o,g,power(b,o));readyFlorida(p,g);readyFlorida(o,b);}else o.hp-=x;}
    if(o.hp<=0)break;
  }
}
function startTurn(p,first){
  p.turn++;p.active=true;p.tagReady=true;p.noAttack=false;p.skipDraw=false;
  if(p.leader==="Washed-Up Rock Star"){
    if(p.hand.length<=1){while(p.hand.length<2)if(!draw(p))break;}
    else if(p.hand.length>=3)p.skipDraw=true;
  }
  for(const s of p.stash)s.ready=true;
  for(const g of p.chars){g.ready=true;g.bonusReady=false;}
  if(!(first&&p.turn===1)&&!p.skipDraw)draw(p);
}
function game(a,b,seed,starter){
  const r=rng32(seed),P=[makePlayer(a,r),makePlayer(b,r)];
  temporaryStash(P[1-starter]);
  let winner=null;
  for(let round=1;round<=MAX_ROUNDS&&winner===null;round++){
    for(let k=0;k<2&&winner===null;k++){
      const i=(starter+k)%2,p=P[i],o=P[1-i];
      startTurn(p,i===starter);main(p,o);attack(p,o,round);p.active=false;
      if(o.hp<=0)winner=i;
    }
  }
  if(winner===null)winner=P[0].hp===P[1].hp?(r()<0.5?0:1):(P[0].hp>P[1].hp?0:1);
  return winner;
}

const decks=buildField();
const stats=decks.map(()=>({games:0,wins:0}));
const matrix=Array.from({length:decks.length},()=>Array(decks.length).fill(null));
for(let i=0;i<decks.length;i++)for(let j=i+1;j<decks.length;j++){
  let iw=0,jw=0;
  for(let s=0;s<HALF;s++)for(let starter=0;starter<2;starter++){
    // Stable seed schedule. Reuse this formula for paired A/B tests.
    const winner=game(decks[i],decks[j],0x510000+i*50000+j*1000+s*2+starter,starter);
    stats[i].games++;stats[j].games++;
    if(winner===0){stats[i].wins++;iw++;}else{stats[j].wins++;jw++;}
  }
  matrix[i][j]=100*iw/GAMES_PER_MATCHUP;
  matrix[j][i]=100*jw/GAMES_PER_MATCHUP;
}
const ranking=decks.map((d,i)=>({...d,winRate:100*stats[i].wins/stats[i].games})).sort((a,b)=>b.winRate-a.winRate);
const result={build:cardsDoc.version,experiment:EXPERIMENT,gamesPerMatchup:GAMES_PER_MATCHUP,totalGames:630*GAMES_PER_MATCHUP,decks:decks.map(d=>d.name),ranking:ranking.map(d=>({name:d.name,winRate:+d.winRate.toFixed(2)})),matrix};
const outPath=path.join(__dirname,"round-robin-results.json");
fs.writeFileSync(outPath,JSON.stringify(result,null,2)+"\n");
console.log("Wrote "+outPath);
for(const [i,d] of ranking.entries())console.log(String(i+1).padStart(2),d.winRate.toFixed(2).padStart(6)+"%",d.name);
