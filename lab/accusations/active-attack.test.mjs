// Focused regression checks for the standalone Accusations Lab's active-claim TESTING rules.
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";

const html=readFileSync(new URL("./index.html",import.meta.url),"utf8");
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
assert.ok(scripts.length>=1,"Missing inline Accusations game script");
for(const [i,script] of scripts.entries())new vm.Script(script,{filename:"accusations-inline-"+i+".js"});

function boot(){
 const elements=new Map();
 function el(id){
  if(!elements.has(id))elements.set(id,{value:id==="p0"?"hoa":id==="p1"?"fl":"",innerHTML:"",textContent:"",onclick:null,disabled:false});
  return elements.get(id);
 }
 const context=vm.createContext({document:{getElementById:el},alert:message=>{throw new Error("Unexpected alert: "+message)},console,Math});
 vm.runInContext(scripts[0],context);
 return code=>vm.runInContext(code,context);
}
function fixture(name="Your Grass Is 0.3 Inches Too Tall!"){
 const run=boot();
 const id=run(`(()=>{
  g.active=0;g.turn=3;g.players[0].chars=[];g.players[1].chars=[];g.slots=[null,null,null];
  const sc=make(${JSON.stringify(name)},"hoa",true);
  g.slots[0]={card:sc,owner:0,filedTurn:1};
  const c=make("Old Guy","hoa");c.loc=0;c.turn=1;c.rot=false;c.damage=1;
  side(0).chars.push(c);return c.id;
 })()`);
 return {run,id};
}
function test(label,fn){fn();console.log("PASS",label)}

test("the old automatic success check never grants a Verdict",()=>{
 const {run}=fixture();
 run("check()");
 assert.equal(run("side(0).verdict"),0);
 assert.equal(run("g.slots[0]!==null"),true);
});
test("claim needs an explicit attack by a Ready supporter after a response turn",()=>{
 const {run,id}=fixture();
 assert.equal(run(`canClaim(all(0).find(c=>c.id===${id}))`),true);
 run("g.turn=2");
 assert.equal(run(`canClaim(all(0).find(c=>c.id===${id}))`),false);
 run("g.turn=3");
 assert.equal(run(`claimScenario(${id})`),true);
 assert.equal(run("side(0).verdict"),1);
 assert.equal(run("g.slots[0]"),null);
 assert.equal(run("all(0)[0].loc"),-1);
 assert.equal(run("all(0)[0].rot"),true);
 assert.equal(run("all(0)[0].damage"),1);
});
test("newly entered or Rotated Characters cannot claim",()=>{
 const {run,id}=fixture();
 run(`all(0).find(c=>c.id===${id}).turn=g.turn`);
 assert.equal(run(`claimScenario(${id})`),false);
 run(`all(0).find(c=>c.id===${id}).turn=1;all(0)[0].rot=true`);
 assert.equal(run(`claimScenario(${id})`),false);
 assert.equal(run("side(0).verdict"),0);
});
test("a normal defender blocks a claim while a Christmas Lights exception needs two",()=>{
 const {run,id}=fixture();
 run('(()=>{const d=make("Gator Wrangler","fl");d.loc=0;side(1).chars.push(d)})()');
 assert.equal(run(`canClaim(all(0).find(c=>c.id===${id}))`),false);
 const christmas=fixture("Your Christmas Lights Are Still Up in March!");
 christmas.run('(()=>{const d=make("Gator Wrangler","fl");d.loc=0;side(1).chars.push(d)})()');
 assert.equal(christmas.run(`canClaim(all(0).find(c=>c.id===${christmas.id}))`),true);
 christmas.run('(()=>{const d=make("Gator Wrangler","fl");d.loc=0;side(1).chars.push(d)})()');
 assert.equal(christmas.run(`canClaim(all(0).find(c=>c.id===${christmas.id}))`),false);
});
test("special claim conditions still apply",()=>{
 const code=fixture("That's Not Up to Code!");
 assert.equal(code.run(`canClaim(all(0).find(c=>c.id===${code.id}))`),false);
 code.run("all(0)[0].items.push({id:123,name:'Clipboard'})");
 assert.equal(code.run(`canClaim(all(0).find(c=>c.id===${code.id}))`),true);
 const fireworks=fixture("I Can Explain the Fireworks!");
 assert.equal(fireworks.run(`canClaim(all(0).find(c=>c.id===${fireworks.id}))`),false);
 fireworks.run('(()=>{const c=make("Old Guy","hoa");c.loc=0;side(0).chars.push(c)})()');
 assert.equal(fireworks.run(`canClaim(all(0).find(c=>c.id===${fireworks.id}))`),true);
});
test("ordinary commitment does not Rotate; established Character remains attack-eligible",()=>{
 const {run}=fixture();
 run('(()=>{const c=make("Marine","hoa");c.turn=1;c.loc=-1;c.rot=false;side(0).chars.push(c);commit(c,0)})()');
 assert.equal(run("all(0).at(-1).loc"),0);
 assert.equal(run("all(0).at(-1).rot"),false);
 assert.equal(run("eligibleAttack(all(0).at(-1))"),true);
});
test("new Character can deploy directly to existing Scenario but cannot attack that turn",()=>{
 const {run}=fixture();
 run("side(0).stash.push({rot:false},{rot:false},{rot:false})");
 run('(()=>{const c=make("Marine","hoa");side(0).hand.push(c);play(c,0)})()');
 const deployed=run('all(0).find(c=>c.name==="Marine")');
 assert.equal(deployed.loc,0);
 assert.equal(deployed.rot,false);
 assert.equal(run('eligibleAttack(all(0).find(c=>c.name==="Marine"))'),false);
});
test("filing Rotates the Character and sets the response-turn timestamp",()=>{
 const run=boot();
 run('(()=>{g.active=0;g.turn=1;g.slots=[null,null,null];const c=make("Old Guy","hoa");side(0).chars=[c];const sc=make("Your Grass Is 0.3 Inches Too Tall!","hoa",true);side(0).sh=[sc];beginFiling(sc);filing.chars=[c.id];confirmFiling()})()');
 assert.equal(run("all(0)[0].rot"),true);
 assert.equal(run("g.slots[0].filedTurn"),1);
 assert.equal(run("side(0).verdict"),0);
});
test("defender does not get an unapproved finishing attack or a Verdict",()=>{
 const {run}=fixture();
 run('side(0).chars=[];g.active=1');
 assert.equal(run("all(1).some(c=>canClaim(c))"),false);
 run("g.active=0;check()");
 assert.equal(run("g.slots[0]"),null);
 assert.equal(run("side(1).verdict"),0);
});
console.log("Accusations active-attack checks complete.");
