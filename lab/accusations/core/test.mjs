import assert from "node:assert/strict";
import {makeGame,player,available,recruit,file,commit,attack,score,endTurn,botTurn,at,MAX_UNRESOLVED_CHECKS,MAX_ROUNDS} from "./game.mjs";
function test(label,fn){fn();console.log("PASS",label)}
test("automatic Stash growth and opening recruit",()=>{
  const g=makeGame();assert.equal(available(g,0),1);
  const a=recruit(g,0,"neighbor");assert.equal(a.cost,1);assert.equal(available(g,0),0);
  file(g,0,a.id);assert.equal(a.rot,true);assert.equal(a.loc,0);
  endTurn(g);assert.equal(available(g,1),1);
  endTurn(g);assert.equal(available(g,0),2);assert.equal(a.rot,false);
});
test("no uncontested resolution before opponent gets a turn",()=>{
  const g=makeGame();const a=recruit(g,0,"neighbor");file(g,0,a.id);
  endTurn(g);assert.equal(player(g,0).verdict,0);
  endTurn(g);assert.equal(player(g,0).verdict,1);assert.equal(a.loc,-1);
});
test("opponent contest blocks elimination, even against greater Power",()=>{
  const g=makeGame("elimination");const a=recruit(g,0,"heckler");file(g,0,a.id);
  endTurn(g);const b=recruit(g,1,"neighbor");commit(g,1,b.id,0);
  endTurn(g);assert.equal(player(g,0).verdict,0);assert.notEqual(g.slots[0],null);
});
test("majority awards only when supporting Power strictly exceeds contesting Power",()=>{
  const g=makeGame("majority");const a=recruit(g,0,"heckler");file(g,0,a.id);
  endTurn(g);const b=recruit(g,1,"neighbor");commit(g,1,b.id,0);
  assert.deepEqual(score(g,0),{support:2,contest:1});
  endTurn(g);assert.equal(player(g,0).verdict,1);
});
test("majority tie does not score",()=>{
  const g=makeGame("majority");const a=recruit(g,0,"neighbor");file(g,0,a.id);
  endTurn(g);const b=recruit(g,1,"neighbor");commit(g,1,b.id,0);
  endTurn(g);assert.equal(player(g,0).verdict,0);
});
test("reciprocal combat damages both sides even if defender Rotated",()=>{
  const g=makeGame();const a=recruit(g,0,"heckler");file(g,0,a.id);
  endTurn(g);const b=recruit(g,1,"neighbor");commit(g,1,b.id,0);
  endTurn(g);assert.equal(b.rot,true);
  const hit=attack(g,0,a.id,b.id);
  assert.equal(hit.toDefender,2);assert.equal(hit.toAttacker,1);
  assert.equal(a.damage,1);assert.equal(b.damage,2);
});
test("bot can file, contest and return control on a single human end-turn",()=>{
  const g=makeGame();const a=recruit(g,0,"neighbor");file(g,0,a.id);
  endTurn(g);botTurn(g);if(g.winner===null)endTurn(g);
  assert.equal(g.active,0);
  assert.equal(player(g,1).stash,1);
  assert.ok(player(g,1).chars.length>=1);
  assert.equal(at(g,1,0).length,1);
});
test("full solo game can advance for many turns without failing state constraints",()=>{
  for(const mode of ["elimination","majority"]){
    const g=makeGame(mode);
    for(let t=0;t<50&&g.winner===null;t++){
      if(g.active===0){
        const n=available(g,0);if(n>0)recruit(g,0,n>=3?"enforcer":n===2?"regular":"neighbor");
        if(!player(g,0).played&&g.slots.some(s=>!s)&&g.slots.filter(s=>s?.owner===0).length<2){
          const c=player(g,0).chars.find(x=>x.loc===-1&&!x.rot);
          if(c)file(g,0,c.id);
        }
        endTurn(g);
      }else{botTurn(g);endTurn(g)}
      assert.ok(g.slots.length===3);
      assert.ok(player(g,0).stash<=5&&player(g,1).stash<=5);
      assert.ok(g.slots.filter(s=>s?.owner===0).length<=2);
      assert.ok(g.slots.filter(s=>s?.owner===1).length<=2);
    }
  }
});

test("a deadlocked Scenario expires without awarding a free Verdict",()=>{
  const g=makeGame("elimination");
  const a=recruit(g,0,"neighbor");file(g,0,a.id);
  endTurn(g);
  const b=recruit(g,1,"neighbor");commit(g,1,b.id,0);
  for(let i=0;i<MAX_UNRESOLVED_CHECKS;i++){
    endTurn(g);
    if(i<MAX_UNRESOLVED_CHECKS-1){assert.notEqual(g.slots[0],null);endTurn(g)}
  }
  assert.equal(g.slots[0],null);
  assert.equal(player(g,0).verdict,0);
  assert.equal(player(g,1).verdict,0);
  assert.equal(a.loc,-1);
  assert.equal(b.loc,-1);
});
test("a completely passive match ends as a declared draw instead of looping forever",()=>{
  const g=makeGame("elimination");
  for(let i=0;i<2*MAX_ROUNDS+3&&g.winner===null;i++)endTurn(g);
  assert.equal(g.winner,"draw");
  assert.equal(g.draw,true);
  assert.equal(player(g,0).verdict,0);
  assert.equal(player(g,1).verdict,0);
});

test("human goes second after bot opens, with equal opening resources",()=>{
  const g=makeGame("elimination",1);
  assert.equal(g.active,1);
  assert.equal(g.firstPlayer,1);
  assert.equal(g.round,1);
  assert.equal(available(g,1),1);
  botTurn(g);
  assert.ok(player(g,1).chars.length>0);
  assert.ok(g.slots.some(s=>s?.owner===1));
  endTurn(g);
  assert.equal(g.active,0);
  assert.equal(g.round,1);
  assert.equal(available(g,0),1);
  const firstHuman=recruit(g,0,"neighbor");
  assert.equal(firstHuman.entered,g.turn);
  endTurn(g);
  assert.equal(g.active,1);
  assert.equal(g.round,2);
});
test("switching starting seat does not affect Scenario resolution timing",()=>{
  const g=makeGame("elimination",1);
  const c=recruit(g,1,"neighbor");
  file(g,1,c.id);
  endTurn(g);
  assert.equal(player(g,1).verdict,0);
  endTurn(g);
  assert.equal(player(g,1).verdict,1);
});
