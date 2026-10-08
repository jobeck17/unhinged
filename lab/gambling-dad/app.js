import {Game,LEADERS} from '../../web/engine.js?v=mordecai-04-reckless-01';
import {aiAction,aiChoice} from '../../web/ai.js?v=mordecai-04';
import '../../web/magician.js?v=reckless-01';
import '../../web/cat-lady.js?v=reckless-01';
import '../../web/rockstar.js?v=reckless-01';
import '../../web/reckless.js?v=reckless-01';
import {applyLandonLab} from '../../web/landon-lab.js?v=reckless-01';
import {installGamblingDad} from './poker.mjs?v=gd-01';
installGamblingDad(Game,LEADERS);
const root=document.querySelector('#app');
let pool,decks,game,human=0,phase='setup',busy=false,modal=null,selected=new Set();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rules='EXPERIMENTAL LAB: Dad Poker once during Gambling Dad\'s Turn; both Draw 3 separate poker cards, pick 2, higher printed Cost total wins (Power breaks Cost ties). Dad wins +4 Ready Stash; Dad loses Stash down to two; complete tie discards both pairs. Normal Stashing remains. Mordecai 0.4: Leaders begin at 20 Composure. Characters use Power / Health / Trouble. Attack opposing Rotated Characters, Cause Trouble to pressure the opposing Leader, or stay Ready for protection. Cause Trouble is not combat and cannot be Blocked. There is no Character cap and no universal retaliation. Retaliate is keyword-only. Breaking Point triggers at 10. Last Straw triggers at 0; while at Last Straw your Characters have Hothead and may Attack Ready Characters. One later legal Cause Trouble makes that Leader Unhinged. Unique Breaking Point abilities and selectable Last Straw effects are pending the production card-design pass.';
try{
 [pool,decks]=await Promise.all([fetch('../../CARDS.json?v=reckless-01').then(r=>{if(!r.ok)throw Error('Card data unavailable');return r.json()}),fetch('../../DECKS.json?v=reckless-01').then(r=>{if(!r.ok)throw Error('Deck data unavailable');return r.json()})]);
 if(pool.version!==decks.card_pool)throw Error('Production card/deck versions do not match');
 ({pool,decks}=applyLandonLab(pool,decks));
 const [labCards,labDeck]=await Promise.all([fetch('./cards.json?v=gd-01').then(r=>{if(!r.ok)throw Error('Gambling Dad cards unavailable');return r.json()}),fetch('./deck.json?v=gd-01').then(r=>{if(!r.ok)throw Error('Gambling Dad deck unavailable');return r.json()})]);
 pool.cards.push(...labCards.cards);decks.decks.unshift(labDeck);
 setup();
}catch(e){root.innerHTML='<section class="setup"><h1>Lab failed to load.</h1><p>'+esc(e.message)+'</p></section>'}

function setup(){
 const opts=decks.decks.map((d,i)=>'<option value="'+i+'">'+esc(d.leader)+' · '+esc(d.styles[0])+'</option>').join('');
 root.innerHTML='<section class="setup"><span class="eyebrow">UNHINGED / MORDECAI 0.4</span><h1>GAMBLING DAD<br>LAB</h1><p class="intro">An advanced Gambler Leader. Play Unhinged normally, or risk your resources on Dad Poker. Rough draft deck — everything is up for revision.</p><div class="settings"><label>Your deck<select id="you">'+opts+'</select></label><label>Opponent deck<select id="them">'+opts+'</select></label></div><button id="start" class="primary">Cause a scene →</button><details><summary>Current playtest rules</summary><p>'+rules+'</p></details><p class="muted">EXPERIMENTAL LAB ONLY · Not canonical · 40-card draft · 20 Composure</p><nav><a href="https://github.com/jobeck17/unhinged/blob/main/RULES.md">Mordecai rules</a><a href="../../builder/">Deck Builder</a></nav></section>';
 root.querySelector('#you').value='0';root.querySelector('#them').value='1';
 root.querySelector('#start').onclick=()=>start(+root.querySelector('#you').value,+root.querySelector('#them').value);
}
function pile(label,count,sub='',kind='back'){
 const visual=kind==='back'?'<span class="mini-card card-back"></span>':'<span class="mini-card discard-face">↩</span>';
 return '<div class="zone-pile"><span class="zone-label">'+esc(label)+'</span>'+visual+'<b>'+count+'</b>'+(sub?'<small>'+esc(sub)+'</small>':'')+'</div>';
}
function zoneBar(p){
 const s=game.players[p],opp=p!==human,top=s.discard.length?game.card(s.discard[s.discard.length-1])?.name:'Empty';
 return '<div class="zonebar '+(opp?'opponent-zones':'own-zones')+'">'+
   (opp?pile('Hand',s.hand.length,'hidden'):'')+
   pile('Deck',s.deck.length,'cards')+
   pile('Stash',s.stash.length,s.fuel+' Ready')+
   pile('Discard',s.discard.length,top,'discard')+
 '</div>';
}
function render(){
 if(phase==='setup'||!game)return setup();
 if(phase==='mulligan'){
  const s=game.players[human];
  root.innerHTML='<section class="setup"><span class="eyebrow">MORDECAI 0.4 · MULLIGAN</span><h1>Keep or replace?</h1><p class="intro">Tap any cards you want to send back.</p><div class="hand-cards">'+s.hand.map((id,i)=>cardHTML({id},'hand',human,i,selected.has(i))).join('')+'</div><button id="keep" class="primary">'+(selected.size?'Replace '+selected.size:'Keep hand')+'</button></section>';
  wireCards();root.querySelector('#keep').onclick=async()=>{await game.mulligan(human,[...selected]);selected.clear();game.begin();phase='playing';render();await aiTurn()};return;
 }
 const active=game.turn===human&&!busy&&game.winner===null;
 const instruction=game.winner!==null?game.decks[game.winner].leader+' wins':busy?(game.turn===human?'Resolving your action…':'Opponent is thinking…'):active?'Fight, Cause Trouble, build, or End Turn.':'Opponent is thinking…';
 root.innerHTML='<header><div><b class="brand">UNHINGED.</b><span class="eyebrow">MORDECAI 0.4 · ROUND '+game.round+'</span></div><button id="new">New match</button></header>'+
 '<section class="controls"><div><span class="eyebrow">'+esc(game.decks[game.turn].leader)+' · '+(active?'YOUR TURN':'ACTIVE')+'</span><p>'+esc(instruction)+'</p></div><div class="actions">'+(active&&game.canPoker(human)?'<button id="poker" class="primary">Dad Poker</button>':'')+(active?'<button id="end" class="primary">End Turn</button>':'')+'</div></section>'+
 dicePanel()+pokerPanel()+'<p class="scroll-hint">Swipe the table sideways when the board gets crowded.</p><div class="tabletop">'+zoneBar(1-human)+'<div class="battlefield">'+row(1-human)+row(human)+'</div>'+zoneBar(human)+'</div>'+
 '<section class="hand"><div class="section-head"><h2>Your hand <small>'+game.players[human].hand.length+' cards</small></h2><span>Stash '+game.players[human].fuel+'/'+game.players[human].stash.length+' Ready</span></div><div class="hand-cards">'+game.players[human].hand.map((id,i)=>cardHTML({id},'hand',human,i)).join('')+'</div></section>'+
 '<div class="lower"><details open><summary>What this lab is testing</summary><p>A Ready Character can Attack, Cause Trouble, or stay Ready and protected from ordinary Attacks. At 10 Composure the Leader hits Breaking Point. At 0 the hidden Last Straw is revealed and the Turn ends after it resolves. While at Last Straw your Characters have Hothead and may Attack Ready Characters. One later legal Cause Trouble makes the Leader Unhinged. Unique Breaking Point and Last Straw card effects are the next content pass.</p></details><details open><summary>Recent events</summary>'+game.log.slice(0,10).map(x=>'<p>'+esc(x)+'</p>').join('')+'</details></div>';
 wireCards();root.querySelector('#poker')?.addEventListener('click',()=>humanAction(()=>game.dadPoker(human)));root.querySelector('#end')?.addEventListener('click',()=>humanAction(()=>game.pass()));root.querySelector('#new').onclick=()=>{game=null;phase='setup';modal=null;selected.clear();setup()};if(modal)showModal(modal);
}
function row(p){
 const s=game.players[p],d=game.decks[p],l=LEADERS[d.leader],chars=game.chars(p),items=s.board.filter(x=>game.card(x).type==='Item');
 const slots=chars.map(x=>cardHTML(x,'board',p)).join('')+(chars.length?'<div class="empty-slot"><span>+<small>NO CHARACTER CAP</small></span></div>':'<div class="empty-slot"><span>+<small>OPEN BOARD</small></span></div>');
 return '<section class="battle-row '+(p===human?'own':'opponent')+'"><button class="leader" disabled><span class="eyebrow">'+(p===human?'YOU':'OPPONENT')+' · LEADER</span><strong>'+esc(d.leader)+'</strong><span class="composure">'+s.hp+'<small>COMPOSURE</small></span><span class="leader-info">'+chars.length+' Characters<br>'+s.fuel+'/'+s.stash.length+' Ready Stash<br>Deck '+s.deck.length+' · Hand '+(p===human?s.hand.length:'?')+'</span><span class="leader-passive"><b>PASSIVE</b><br>'+esc(l.passive)+'</span></button><div class="slots">'+slots+'</div></section>'+
 (items.length?'<section class="item-shelf"><div class="item-label">'+(p===human?'YOUR':'OPPONENT')+' ITEMS</div><div class="item-cards">'+items.map(x=>cardHTML(x,'board',p)).join('')+'</div></section>':'');
}
function cardHTML(x,zone,p,index,chosen=false){
 const c=game.card(x),b=zone==='board',char=c.type==='Character',rot=b&&!x.ready,selected=zone==='hand'&&chosen;
 let stats='';
 if(char)stats='<span class="stats"><span><small>POWER</small>'+(b?game.power(x):c.power)+'</span><span><small>'+(b?'HEALTH LEFT':'HEALTH')+'</small>'+(b?Math.max(0,game.guard(x)-x.damage):c.guard)+'</span><span class="stat-trouble"><small>TROUBLE</small>'+(b?game.trouble(x):c.trouble)+'</span></span>';
 const foot=selected?'✓ REPLACE':b?(rot?'ROTATED':char&&x.born>=game.round?'NEW THIS TURN':x.damage?x.damage+' DAMAGE':'READY'):'TAP FOR ACTIONS';
 const art=c.art?'<span class="card-art"><img src="'+esc(c.art)+'" alt="" loading="lazy"></span>':'<span class="card-art art-placeholder style-'+esc((c.style||'neutral').toLowerCase().replace(/[^a-z0-9]+/g,'-'))+'"><span>'+esc(c.style||c.type)+'</span></span>';
 return '<button class="card '+(rot?'rotated ':'')+(selected?'selected ':'')+'" data-zone="'+zone+'" data-p="'+p+'" data-index="'+(index??'')+'" data-uid="'+(x.uid??'')+'"><span class="card-top"><span>'+esc(c.type)+' · '+esc(c.style)+'</span><b>'+(b?(rot?'ROTATED':'READY'):'COST '+c.cost)+'</b></span>'+art+'<strong>'+esc(c.name)+'</strong><span class="card-text">'+esc(c.text||c.flavor||'')+(b&&x.nextAttackPower?'<br><b>Next Attack: +'+x.nextAttackPower+' Power'+(x.rampTrouble?' + Trouble':'')+'</b>':'')+'</span>'+stats+'<span class="card-foot '+(x.damage?'damage':'')+'">'+esc(foot)+'</span></button>';
}
function wireCards(){root.querySelectorAll('.card').forEach(b=>b.onclick=()=>{if(phase==='mulligan'){const i=+b.dataset.index;selected.has(i)?selected.delete(i):selected.add(i);render();return}if(+b.dataset.p!==human&&b.dataset.zone==='board')return detail({uid:+b.dataset.uid});if(b.dataset.zone==='hand')detail({id:game.players[human].hand[+b.dataset.index],handIndex:+b.dataset.index});else detail({uid:+b.dataset.uid})})}
function detail(ref){
 const x=ref.uid?game.obj(ref.uid):null,c=game.card(x||ref.id);if(!c)return;
 const me=game.turn===human&&!busy&&game.winner===null,own=x?.owner===human;
 const play=ref.handIndex!==undefined&&me&&game.canPlay(ref.handIndex,human),stash=ref.handIndex!==undefined&&me&&game.canStash(ref.handIndex,human),attack=x&&own&&c.type==='Character'&&me&&game.canAttack(x),trouble=x&&own&&c.type==='Character'&&me&&game.canCauseTrouble(x),act=x&&own&&me&&game.canUse(x);
 let buttons='<button id="close">Close</button>'+(stash?'<button id="stash">Stash</button>':'')+(play?'<button id="play" class="primary">Play</button>':'')+(attack?'<button id="attack" class="primary">Attack Character</button>':'')+(trouble?'<button id="trouble" class="trouble-button">Cause Trouble · '+game.trouble(x)+'</button>':'')+(act?'<button id="activate" class="primary">Activate Ability</button>':'');
 let stats='<span>Cost '+c.cost+'</span>'+(c.type==='Character'?'<span>Power '+(x?game.power(x):c.power)+'</span><span>Health '+(x?game.guard(x):c.guard)+'</span><span>Trouble '+(x?game.trouble(x):c.trouble)+'</span>':'')+(x?'<span>'+(x.ready?'Ready':'Rotated')+'</span>':'');
 const modalArt=c.art?'<img class="detail-art" src="'+esc(c.art)+'" alt="">':'';modal={kind:'detail',html:'<div class="overlay"><article class="sheet">'+modalArt+'<div class="type">'+esc(c.type)+' · '+esc(c.style)+' · '+esc(c.id)+'</div><h2>'+esc(c.name)+'</h2><div class="stats">'+stats+'</div><p class="rule">'+esc(c.text||c.flavor||'No special ability.')+'</p><div class="buttons">'+buttons+'</div></article></div>'};showModal(modal);
 document.querySelector('#close')?.addEventListener('click',close);document.querySelector('#stash')?.addEventListener('click',()=>{const i=ref.handIndex;close();humanAction(async()=>game.stash(i))});document.querySelector('#play')?.addEventListener('click',()=>{close();humanAction(()=>game.play(ref.handIndex))});document.querySelector('#attack')?.addEventListener('click',()=>{close();humanAction(()=>game.attack(x.uid))});document.querySelector('#trouble')?.addEventListener('click',()=>{close();humanAction(()=>game.causeTrouble(x.uid))});document.querySelector('#activate')?.addEventListener('click',()=>{close();humanAction(()=>game.activate(x.uid))});
}
function showModal(entry){document.querySelector('.overlay')?.remove();if(!entry)return;document.body.insertAdjacentHTML('beforeend',entry.html);const overlay=document.querySelector('.overlay');overlay.onclick=e=>{if(e.target===overlay&&entry.kind==='detail')close()}}
function close(){modal=null;document.querySelector('.overlay')?.remove()}
async function ask(r){if(r.player!==human)return aiChoice(game,r);return new Promise(resolve=>{let chosen=[];const html='<div class="overlay"><div class="sheet"><div class="type">CHOOSE</div><h2>'+esc(r.title)+'</h2>'+(r.attackContext?'<div class="attack-context"><strong>'+esc(r.attackContext.name)+' · '+esc(r.attackContext.power)+' Attack</strong><span>Health '+esc(r.attackContext.guard)+' · Damage '+esc(r.attackContext.damage)+'</span></div>':'')+'<p class="muted">'+(r.multi?'Choose up to '+(r.max||r.options.length)+'.':'Choose one.')+'</p>'+r.options.map((o,i)=>'<button class="choice" data-c="'+i+'">'+esc(o.label)+'</button>').join('')+'<div class="modal-actions">'+(r.title==='Attack which target?'?'<button id="attack-back">Back</button>':(r.mandatory?'':'<button id="cancel">Cancel</button>'))+(r.multi?'<button id="done" class="primary">Confirm 0</button>':'')+'</div></div></div>';modal={kind:'choice',html};showModal(modal);const finish=v=>{close();resolve(v)};document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const i=+b.dataset.c;if(!r.multi)return finish(r.options[i].value);if(chosen.includes(i)){chosen=chosen.filter(x=>x!==i);b.classList.remove('selected')}else if(!r.max||chosen.length<r.max){chosen.push(i);b.classList.add('selected')}document.querySelector('#done').textContent='Confirm '+chosen.length});document.querySelector('#cancel')?.addEventListener('click',()=>finish(r.multi?[]:null));document.querySelector('#attack-back')?.addEventListener('click',()=>finish(null));document.querySelector('#done')?.addEventListener('click',()=>finish(chosen.map(i=>r.options[i].value)))})}
function start(a,b){human=0;game=new Game(pool,{...decks,decks:[decks.decks[a],decks.decks[b]]},ask,()=>{if(phase==='playing'&&!modal)render()},{firstPlayer:human});game.mulligan(1,[]);phase='mulligan';render()}
async function humanAction(fn){if(busy||game.turn!==human)return;busy=true;render();try{await fn()}catch(e){console.error(e);alert(e.message)}finally{busy=false;render();await aiTurn()}}
async function aiTurn(){if(phase!=='playing'||!game||game.winner!==null||game.turn===human||busy)return;busy=true;render();let n=0;try{while(game.turn!==human&&game.winner===null&&n++<70){await new Promise(r=>setTimeout(r,170));const m=game.canPoker(game.turn)&&game.players[game.turn].stash.length<=4?{type:'poker'}:aiAction(game,game.turn);if(m.type==='poker')await game.dadPoker(game.turn);else if(m.type==='pass')await game.pass();else if(m.type==='stash')game.stash(m.index,game.turn);else if(m.type==='attack')await game.attack(m.uid);else if(m.type==='trouble')await game.causeTrouble(m.uid);else if(m.type==='play')await game.play(m.index);else if(m.type==='activate')await game.activate(m.uid);render()}if(n>=70)throw Error('AI action limit reached')}finally{busy=false;render()}}

function dicePanel(){
 const rolls=game.diceRolls||[];if(!rolls.length)return '';
 const r=rolls[0];
 return '<section class="dice-result" role="status" aria-live="polite"><span class="die-face" aria-label="Die rolled '+r.value+'">'+['','⚀','⚁','⚂','⚃','⚄','⚅'][r.value]+'</span><div><strong>'+esc(r.label)+' · rolled '+r.value+'</strong><p>'+esc(r.outcome)+'</p><details><summary>Dice history</summary>'+rolls.map(d=>'<p>'+esc(d.label)+' — '+d.value+' · '+esc(d.outcome)+'</p>').join('')+'</details></div></section>';
}

function pokerPanel(){const v=game?.pokerLast;if(!v)return '';return '<section class="dice-result" role="status" aria-live="polite"><strong>Dad Poker · '+esc(v.result)+'</strong><p>Dad '+v.costDad+' Cost / '+v.powerDad+' Power · Opponent '+v.costOpp+' Cost / '+v.powerOpp+' Power</p></section>'}
