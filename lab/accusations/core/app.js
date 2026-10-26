import {ROSTER,WIN_TARGET,STASH_CAP,makeGame,player,at,available,readyAtHome,recruit,commit,file,attack,endTurn,botTurn,score,character} from "./game.mjs";
const el=id=>document.getElementById(id);
let g=makeGame("elimination"),selected=null,notice="";
const sideName=p=>p===0?"YOU":"BOT";
function doAction(fn){
  try{fn();notice="";render()}catch(e){notice=e.message;render()}
}
function card(c,p){
  const eligible=selected?.kind==="attack"&&p===1&&c.loc>=0&&character(g,0,selected.id)?.loc===c.loc;
  const outer=document.createElement("article");
  outer.className="card"+(c.rot?" rot":"")+(eligible?" target":"");
  outer.innerHTML="<strong>"+c.name+"</strong><div class='stats'>"+c.power+" ⚔ · "+c.health+" ♥ · Cost "+c.cost+"</div><div class='damage'>"+(c.damage?c.damage+" damage taken":"0 damage")+"</div>";
  const controls=document.createElement("div");
  if(p===0&&g.active===0&&g.winner===null){
    if(c.loc===-1&&!c.rot){
      controls.append(makeButton("⚖ File",()=>doAction(()=>{file(g,0,c.id);selected=null})));
      controls.append(makeButton("→ Join",()=>{selected={kind:"commit",id:c.id};render()}));
    }else if(c.loc>=0&&!c.rot&&c.entered!==g.turn){
      controls.append(makeButton("⚔ Attack",()=>{selected={kind:"attack",id:c.id};render()}));
    }
  }
  if(eligible)controls.append(makeButton("⚔ Attack this",()=>doAction(()=>{attack(g,0,selected.id,c.id);selected=null})));
  outer.append(controls);
  if(eligible)outer.onclick=e=>{if(e.target.closest("button"))return;doAction(()=>{attack(g,0,selected.id,c.id);selected=null})};
  return outer;
}
function makeButton(label,fn,disabled=false){
  const button=document.createElement("button");
  button.textContent=label;button.disabled=disabled;button.addEventListener("click",fn);
  return button;
}
function clear(node){node.replaceChildren()}
function present(gNode,children){clear(gNode);for(const child of children)gNode.append(child)}
function slotView(i){
  const slot=document.createElement("section");slot.className="slot";
  const sc=g.slots[i];
  const head=document.createElement("h3");head.textContent="Scenario "+(i+1);slot.append(head);
  if(!sc){
    const empty=document.createElement("div");empty.className="empty";empty.textContent="Open slot · File from a Ready Home Character";slot.append(empty);return slot;
  }
  const upper=document.createElement("div");upper.className="side";
  upper.innerHTML="<div class='side-name'>BOT · CONTESTING / SUPPORTING</div>";
  const topCards=document.createElement("div");topCards.className="side-cards";
  for(const c of at(g,1,i))topCards.append(card(c,1));
  if(!topCards.children.length)topCards.innerHTML="<span class='muted'>No bot Characters here</span>";
  upper.append(topCards);
  slot.append(upper);
  const center=document.createElement("div");center.className="scenario";
  const points=score(g,i);
  const modeLine=g.mode==="elimination"?"Win at next owner turn if nobody contests":"Win at next owner turn if support Power > contest Power";
  center.innerHTML="<div class='top'>⚖ GENERIC SCENARIO · COST 1</div><strong>"+sideName(sc.owner)+" FILED THIS</strong><p>"+modeLine+"</p><div class='small'>Unresolved checks: "+(sc.checks||0)+"/3 (then closes without a point)</div><div class='small'>Influence: "+points.support+" supporting / "+points.contest+" contesting · "+at(g,sc.owner,i).length+" supporters / "+at(g,1-sc.owner,i).length+" contesters</div>";
  slot.append(center);
  const lower=document.createElement("div");lower.className="side own";
  lower.innerHTML="<div class='side-name'>YOUR CHARACTERS</div>";
  const bottomCards=document.createElement("div");bottomCards.className="side-cards";
  for(const c of at(g,0,i))bottomCards.append(card(c,0));
  if(!bottomCards.children.length)bottomCards.innerHTML="<span class='muted'>No Characters here</span>";
  lower.append(bottomCards);slot.append(lower);
  if(selected?.kind==="commit"&&g.active===0&&at(g,0,i).length<3){
    slot.classList.add("active-slot");
    slot.append(makeButton("→ Commit selected Character here",()=>doAction(()=>{commit(g,0,selected.id,i);selected=null})));
  }
  return slot;
}
function render(){
  const m=g.mode==="elimination";
  el("mode-info").innerHTML="<b>Playing: "+(m?"A · Elimination":"B · Influence Majority")+"</b> — "+(m?"A Scenario succeeds when its filer has a supporting Character and zero contesters at the beginning of their next turn.":"A Scenario succeeds when its filer has at least one supporter and more total Power than the contesters at the beginning of their next turn. Ties continue.")+" Choose another mode and press New comparison game to switch.";
  const me=player(g,0),bot=player(g,1);
  el("score").innerHTML="<span class='pill'>YOU "+me.verdict+"/"+WIN_TARGET+" Verdict</span><span class='pill'>BOT "+bot.verdict+"/"+WIN_TARGET+" Verdict</span><span class='pill'>Your Stash "+available(g,0)+"/"+me.stash+" Ready</span><span class='pill'>Bot Stash "+available(g,1)+"/"+bot.stash+" Ready</span><span class='pill'>Round "+g.round+"</span>";
  if(g.winner!==null){el("hint").innerHTML="<b class='"+(g.winner===0?"good":"warning")+"'>"+(g.winner==="draw"?"Draw! Round limit reached; no Verdicts awarded.":g.winner===0?"You win!":"Bot wins!")+"</b> Start a new comparison game to retry."}
  else if(selected?.kind==="commit")el("hint").textContent="Choose a Scenario to join using its Commit button. Your Character will rotate and stay there until the Scenario ends.";
  else if(selected?.kind==="attack")el("hint").textContent="Choose a highlighted opposing Character at the same Scenario. Combat damage is simultaneous; both may be defeated.";
  else el("hint").textContent="1. Recruit Characters using automatic Stash. 2. File a generic Scenario using a Ready Home Character, or Join an existing Scenario. 3. Next turn, attack opposing Characters or keep control of your arguments.";
  el("notice").textContent=notice;
  el("cancel").disabled=!selected;
  el("end").disabled=g.winner!==null;
  present(el("slots"),g.slots.map((_,i)=>slotView(i)));
  present(el("your-home"),me.chars.filter(c=>c.loc===-1).map(c=>card(c,0)));
  present(el("bot-home"),bot.chars.filter(c=>c.loc===-1).map(c=>card(c,1)));
  present(el("roster"),ROSTER.map(t=>{
    const box=document.createElement("div");box.className="card";
    box.innerHTML="<strong>"+t.name+"</strong><div class='stats'>"+t.power+" ⚔ · "+t.health+" ♥</div><div class='muted'>Recruit cost "+t.cost+"</div>";
    box.append(makeButton("Recruit for "+t.cost+" Stash",()=>doAction(()=>recruit(g,0,t.id)),g.winner!==null||available(g,0)<t.cost));
    return box;
  }));
  el("log").innerHTML=g.events.map(x=>"<div>"+x+"</div>").join("");
}
el("restart").addEventListener("click",()=>{g=makeGame(el("mode").value);selected=null;notice="";render()});
el("cancel").addEventListener("click",()=>{selected=null;notice="";render()});
el("end").addEventListener("click",()=>{
  doAction(()=>{
    if(g.winner!==null)return;
    selected=null;endTurn(g);
    if(g.active===1&&g.winner===null){botTurn(g);if(g.winner===null)endTurn(g)}
  });
});
render();