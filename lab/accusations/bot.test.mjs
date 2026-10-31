// Regression checks for the 31 October Accusations fixes and the seat-agnostic smart bot.
// Run: node lab/accusations/bot.test.mjs
import assert from "node:assert/strict";
import {boot,playGame} from "./sim.mjs";

function fresh(setup=""){
 const {run,ctx,issues}=boot(12345);
 run(`__st={success:[0,0],failure:[0,0],defended:[0,0],abandon:[0,0],filed:[0,0],errors:[],claims:[]};
  g.players[0].chars=[];g.players[1].chars=[];g.slots=[null,null,null];g.players[0].hand=[];g.players[1].hand=[];${setup}`);
 return {run,ctx,issues};
}
function test(label,fn){fn();console.log("PASS",label)}

test("first-player selector seats the bot first and rounds advance on the first player's turn",()=>{
 const {run,ctx}=boot(1);
 ctx.document.getElementById("first").value="bot";run("newGame()");
 assert.equal(run("g.first"),1);assert.equal(run("g.active"),1);
 run("passTurn()");assert.equal(run("g.round"),1);
 run("passTurn()");assert.equal(run("g.round"),2);
 ctx.document.getElementById("first").value="you";run("newGame()");
 assert.equal(run("g.first"),0);
});
test("turn-1 draw is 1 for whoever goes first; the second player draws 2",()=>{
 const {run,ctx}=boot(2);
 ctx.document.getElementById("first").value="bot";run("newGame()");
 const before=run("side(0).hand.length");run("passTurn()");
 assert.equal(run("side(0).hand.length"),before+2);
});
test("Florida Man reinforces after a defeat only once per turn",()=>{
 const {run}=fresh(`side(0).style='fl';g.active=0;g.turn=5;
  const sc=make("Hold My Beer, This Is a Shortcut!","fl",true);g.slots[0]={card:sc,owner:1,filedTurn:3};
  for(const n of ["Gator Wrangler","Gator Wrangler"]){const c=make(n,"fl");c.loc=0;c.turn=1;side(0).chars.push(c)}
  for(let k=0;k<3;k++){const c=make("Boogie Boarder","fl");c.loc=-1;c.turn=1;side(0).chars.push(c)}
  for(let k=0;k<2;k++){const c=make("Old Guy","hoa");c.loc=0;c.turn=1;c.damage=2;side(1).chars.push(c)}`);
 run(`for(const a of at(0,0).slice(0,2)){const d=at(1,0)[0];if(d){selected={kind:'attack',id:a.id};clickCard(d.id,1)}}`);
 assert.equal(run("at(1,0).length"),0,"both defenders should fall");
 assert.equal(run("all(0).filter(c=>c.loc===-1).length"),2,"exactly one Home Character reinforced");
});
test("three-round stalemate release abandons each player's OLDEST Scenario",()=>{
 const {run}=fresh(`g.first=0;g.active=1;g.turn=20;g.stale=2;g.changed=false;
  const a=make("Your Grass Is 0.3 Inches Too Tall!","hoa",true),b=make("Unauthorized Lawn Flamingo!","hoa",true);
  g.slots[0]={card:a,owner:0,filedTurn:15};g.slots[2]={card:b,owner:0,filedTurn:9};
  for(const i of [0,2]){const c=make("Old Guy","hoa");c.loc=i;c.turn=1;side(0).chars.push(c)}`);
 run("passTurn()");
 assert.equal(run("g.slots[2]"),null,"filed turn 9 is released");
 assert.equal(run("g.slots[0]?.card.name"),"Your Grass Is 0.3 Inches Too Tall!");
});
test("smart bot claims an undefended Scenario after the response turn",()=>{
 const {run}=fresh(`g.active=1;g.turn=6;const sc=make("Hold My Beer, This Is a Shortcut!","fl",true);g.slots[1]={card:sc,owner:1,filedTurn:4};
  const c=make("Lifeguard","fl");c.loc=1;c.turn=4;side(1).chars.push(c);`);
 run("smartBot(1)");
 assert.equal(run("side(1).verdict"),1);
});
test("smart bot walks in an established Home Character to clear a defender, then claims",()=>{
 const {run}=fresh(`g.active=1;g.turn=6;const sc=make("Hold My Beer, This Is a Shortcut!","fl",true);g.slots[1]={card:sc,owner:1,filedTurn:4};
  const s=make("Lifeguard","fl");s.loc=1;s.turn=4;side(1).chars.push(s);
  const h=make("Spring Break Frat Bro","fl");h.loc=-1;h.turn=4;side(1).chars.push(h);
  const d=make("Old Guy","hoa");d.loc=1;d.turn=5;side(0).chars.push(d);`);
 run("smartBot(1)");
 assert.equal(run("at(0,1).length+(g.slots[1]?0:0)"),0);
 assert.equal(run("side(1).verdict"),1);
});
test("smart bot does not plan Home attackers into Scenarios where they would enter Rotated",()=>{
 const {run}=fresh(`g.active=1;g.turn=6;const sc=make("You Parked on the Wrong Side of the Street!","hoa",true);g.slots[0]={card:sc,owner:0,filedTurn:5};
  const s=make("Grandma","hoa");s.loc=0;s.turn=5;s.rot=true;side(0).chars.push(s);
  const h=make("Gator Wrangler","fl");h.loc=-1;h.turn=3;side(1).chars.push(h);`);
 run("smartBot(1)");
 assert.equal(run("__st.errors.length"),0);
 assert.equal(run("side(0).chars.length"),1,"no impossible attack resolved");
});
test("smart bot defends an opposing Scenario that would otherwise be claimed",()=>{
 const {run}=fresh(`g.active=1;g.turn=6;const sc=make("Your Grass Is 0.3 Inches Too Tall!","hoa",true);g.slots[0]={card:sc,owner:0,filedTurn:5};
  const s=make("Old Guy","hoa");s.loc=0;s.turn=5;side(0).chars.push(s);
  const h=make("Lifeguard","fl");h.loc=-1;h.turn=6;side(1).chars.push(h);`);
 run("smartBot(1)");
 assert.ok(run("at(1,0).length")>=1);
});
test("full bot-vs-bot games run from both seats without bot errors or illegal-move alerts",()=>{
 for(const [k,styles] of [["hoa","fl"],["fl","hoa"]].entries())for(const first of [0,1]){
  const r=playGame({seed:900+k*2+first,styles,first,bots:["smart","smart"],rules:{}});
  assert.equal(r.st.errors.length,0,r.st.errors.join("; "));
  assert.equal(r.alerts,0);
  assert.ok(r.winner!==null||r.round>40);
 }
});
console.log("Accusations fix and bot checks complete.");
