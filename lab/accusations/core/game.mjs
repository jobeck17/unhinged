// Isolated Accusations Core Lab engine. No production imports or card data.
export const ROSTER = Object.freeze([
  {id:"neighbor",name:"Nosy Neighbor",cost:1,power:1,health:3},
  {id:"heckler",name:"Bar Heckler",cost:1,power:2,health:2},
  {id:"regular",name:"Local Regular",cost:2,power:2,health:4},
  {id:"loudmouth",name:"Loudmouth",cost:2,power:3,health:2},
  {id:"enforcer",name:"Security Guy",cost:3,power:3,health:5},
  {id:"expert",name:"Self-Appointed Expert",cost:3,power:4,health:3}
]);
export const WIN_TARGET = 5;
export const STASH_CAP = 5;
export const MAX_CHARACTERS = 3;
export const MAX_SCENARIOS = 2;
export const MAX_SLOTS = 3;
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const opponent=p=>1-p;
export function makeGame(mode="elimination"){
  assert(["elimination","majority"].includes(mode),"Invalid mode");
  const g={mode,players:[0,1].map(()=>({stash:0,spent:0,chars:[],verdict:0,played:false})),slots:Array(MAX_SLOTS).fill(null),active:0,turn:1,round:1,nextId:1,winner:null,events:[]};
  beginTurn(g,true);
  return g;
}
function log(g,text){g.events.unshift("T"+g.turn+" · "+text);g.events.length=Math.min(80,g.events.length)}
export function player(g,p){return g.players[p]}
export function at(g,p,slot){return player(g,p).chars.filter(c=>c.loc===slot)}
export function available(g,p){return player(g,p).stash-player(g,p).spent}
export function readyAtHome(g,p){return player(g,p).chars.filter(c=>c.loc===-1&&!c.rot)}
export function character(g,p,id){return player(g,p).chars.find(c=>c.id===id)}
function playable(g,p){assert(g.winner===null,"Match is over");assert(p===g.active,"Not your turn")}
function occupy(g,p,i){assert(Number.isInteger(i)&&i>=0&&i<MAX_SLOTS&&g.slots[i],"Scenario doesn't exist");assert(at(g,p,i).length<MAX_CHARACTERS,"Scenario side is full")}
export function recruit(g,p,templateId){
  playable(g,p);
  const tpl=ROSTER.find(x=>x.id===templateId);
  assert(tpl,"Unknown Character");
  assert(available(g,p)>=tpl.cost,"Not enough available Stash");
  player(g,p).spent+=tpl.cost;
  const c={...tpl,id:g.nextId++,loc:-1,rot:false,damage:0,entered:g.turn};
  player(g,p).chars.push(c);
  log(g,(p?"Bot":"You")+" recruit "+c.name);
  return c;
}
export function commit(g,p,id,i){
  playable(g,p);
  const c=character(g,p,id);
  assert(c&&c.loc===-1&&!c.rot,"Character must be Ready at Home");
  occupy(g,p,i);
  c.loc=i;c.rot=true;
  log(g,(p?"Bot":"You")+" commit "+c.name+" to Scenario "+(i+1));
}
export function file(g,p,id){
  playable(g,p);
  assert(!player(g,p).played,"Already filed this turn");
  assert(g.slots.filter(s=>s?.owner===p).length<MAX_SCENARIOS,"You already control two Scenarios");
  const slot=g.slots.findIndex(s=>s===null);
  assert(slot!==-1,"All Scenario slots are filled");
  const c=character(g,p,id);
  assert(c&&c.loc===-1&&!c.rot,"Filing requires one Ready Character at Home");
  g.slots[slot]={owner:p,age:g.turn};player(g,p).played=true;
  c.loc=slot;c.rot=true;
  log(g,(p?"Bot":"You")+" file a generic 1-cost Scenario with "+c.name);
  return slot;
}
function defeat(g,p,c){
  const roster=player(g,p).chars;
  player(g,p).chars=roster.filter(x=>x.id!==c.id);
  log(g,(p?"Bot's ":"Your ")+c.name+" was defeated");
}
export function attack(g,p,attackerId,targetId){
  playable(g,p);
  const a=character(g,p,attackerId),b=character(g,opponent(p),targetId);
  assert(a&&b&&a.loc>=0&&a.loc===b.loc,"Both Characters must be at the same Scenario");
  assert(!a.rot,"Attacker must be Ready");
  assert(a.entered!==g.turn,"A newly recruited Character cannot attack");
  const toDefender=a.power,toAttacker=b.power;
  a.rot=true;a.damage+=toAttacker;b.damage+=toDefender;
  log(g,(p?"Bot's ":"Your ")+a.name+" attacks "+b.name+": "+toDefender+" dealt, "+toAttacker+" returned");
  const aDefeated=a.damage>=a.health,bDefeated=b.damage>=b.health;
  if(aDefeated)defeat(g,p,a);
  if(bDefeated)defeat(g,opponent(p),b);
  return {toDefender,toAttacker,aDefeated,bDefeated};
}
function finish(g,i,result){
  const s=g.slots[i];if(!s)return;
  if(result==="success"){
    player(g,s.owner).verdict++;
    log(g,(s.owner?"Bot":"You")+" win Scenario "+(i+1)+" · Verdict +1");
  }else{
    log(g,"Scenario "+(i+1)+" fails without a supporter");
  }
  for(const p of [0,1])for(const c of at(g,p,i))c.loc=-1;
  g.slots[i]=null;
  if(player(g,s.owner).verdict>=WIN_TARGET){g.winner=s.owner;log(g,(s.owner?"Bot":"You")+" win the match!")}
}
export function score(g,i){
  const s=g.slots[i];if(!s)return null;
  return {support:at(g,s.owner,i).reduce((n,c)=>n+c.power,0),contest:at(g,opponent(s.owner),i).reduce((n,c)=>n+c.power,0)};
}
export function checkScenarios(g){
  for(let i=0;i<MAX_SLOTS&&g.winner===null;i++){
    const s=g.slots[i];
    if(!s||s.owner!==g.active||s.age===g.turn)continue;
    const supporters=at(g,s.owner,i),contesters=at(g,opponent(s.owner),i);
    if(supporters.length===0){finish(g,i,"failure");continue}
    const wins=g.mode==="elimination"?contesters.length===0:score(g,i).support>score(g,i).contest;
    if(wins)finish(g,i,"success");
  }
}
export function beginTurn(g,first=false){
  const p=g.active,pl=player(g,p);
  if(!first)pl.stash=Math.min(STASH_CAP,pl.stash+1);
  else pl.stash=1;
  pl.spent=0;pl.played=false;
  for(const c of pl.chars)c.rot=false;
  if(!first)checkScenarios(g);
  log(g,(p?"Bot":"You")+" start with "+pl.stash+" automatic Stash");
}
export function endTurn(g){
  if(g.winner!==null)return;
  g.active=opponent(g.active);
  g.turn++;
  if(g.active===0)g.round++;
  beginTurn(g);
}
export function botTurn(g){
  if(g.active!==1||g.winner!==null)return;
  const p=1,enemy=0;
  // Deal favorable damage before bringing fresh recruits in.
  for(const c of [...player(g,p).chars]){
    if(c.loc<0||c.rot||c.entered===g.turn)continue;
    const targets=at(g,enemy,c.loc);
    if(!targets.length)continue;
    const target=targets.slice().sort((a,b)=>
      ((b.health-b.damage<=c.power?4:0)-(b.power>=c.health-c.damage?3:0))-
      ((a.health-a.damage<=c.power?4:0)-(a.power>=c.health-c.damage?3:0))
    )[0];
    if(target)attack(g,p,c.id,target.id);
  }
  // Recruit from an identical visible roster; bias toward efficient combatants.
  for(let k=0;k<3;k++){
    const budget=available(g,p);
    const best=ROSTER.filter(c=>c.cost<=budget).sort((a,b)=>b.cost-a.cost||b.power-a.power)[0];
    if(!best)break;
    recruit(g,p,best.id);
    if(budget<=2)break;
  }
  // Prevent free wins: contest pending Scenarios, and meet majority strength where possible.
  for(let i=0;i<MAX_SLOTS;i++){
    const s=g.slots[i];if(!s||s.owner!==enemy)continue;
    for(let tries=0;tries<MAX_CHARACTERS;tries++){
      const mine=at(g,p,i),theirs=at(g,enemy,i);
      if(mine.length>=MAX_CHARACTERS)break;
      if(g.mode==="elimination"&&mine.length>0)break;
      if(g.mode==="majority"&&mine.length&&score(g,i).contest>=score(g,i).support)break;
      const home=readyAtHome(g,p).sort((a,b)=>b.power-a.power)[0];
      if(!home)break;
      commit(g,p,home.id,i);
    }
  }
  // File a new accusation when possible, rather than wasting leftover characters.
  if(g.slots.some(s=>!s)&&g.slots.filter(s=>s?.owner===p).length<MAX_SCENARIOS){
    const home=readyAtHome(g,p).sort((a,b)=>b.power-a.power)[0];
    if(home)file(g,p,home.id);
  }
  // Contest under-supported opposing Scenarios after filing if possible.
  for(let i=0;i<MAX_SLOTS;i++){
    const s=g.slots[i];if(!s||s.owner!==enemy||at(g,p,i).length||at(g,p,i).length>=MAX_CHARACTERS)continue;
    const c=readyAtHome(g,p)[0];
    if(c)commit(g,p,c.id,i);
  }
  log(g,"Bot completes turn");
}
