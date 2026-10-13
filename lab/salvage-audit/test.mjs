import assert from 'node:assert/strict';
import {Game,fixture,body,play,pool,draft,coverage,focused,doc} from './fixtures.mjs';
import {IDS} from './salvage.mjs';
import {coverage as browserCoverage,focused as browserFocused} from './data.mjs';
import {action as pilotAction,choice as pilotChoice} from './pilot.mjs';
let checks=0;const eq=(a,b,msg)=>{assert.deepEqual(a,b,msg);checks++},ok=(v,msg)=>{assert(v,msg);checks++};
eq([...IDS].sort(),draft.cards.map(c=>c.id).sort(),'Every approved ID uses the revised engine path');
eq(browserCoverage.cards,coverage.cards,'Browser coverage matches simulated list');eq(browserFocused.cards,focused.cards,'Browser focused matches simulated list');
eq(draft.cards.length,32);for(const d of [coverage,focused]){eq(Object.values(d.cards).reduce((a,b)=>a+b,0),40);ok(Object.values(d.cards).every(n=>n<=4));}
{
 const g=fixture(),s=g.players[0];s.hand=['P095','P109','P094'];
 eq(pilotAction(g,0),{type:'stash',index:1},'Pilot preserves Hoarder and early body over spare search');
 g.stash(1);eq(pilotAction(g,0),{type:'play',index:0},'Pilot deploys an affordable large payoff');
 s.salTemp[1]=true;eq(pilotChoice(g,{player:0,title:'Pay cost: choose exactly 1 Ready Stash',multi:true,min:1,max:1,options:[{value:0},{value:1}]},'fuel-first'),[1],'Pilot spends temporary own Stash first');
}
for(const c of draft.cards){const g=fixture();if(c.type==='Character'||c.type==='Item'){ok(await play(g,c.id),'play '+c.name);ok(g.players[0].board.some(x=>x.id===c.id));}}
{
 const g=fixture(r=>r.title==='Salvage destination'?'stash':undefined),s=g.players[0],x=body(g,'P119');await g.dismiss(x);eq(s.salTemp.filter(Boolean).length,1);eq(s.salDismissed,1);eq(s.fuel,20);await g.pass();await g.pass();eq(s.fuel,21);g.stashPayment=[{owner:0,picks:[20]}];eq(g.spendOwnStash(0,1),1);eq(s.stash.length,20);eq(s.discard,['P119']);eq(s.salDismissed,0);eq(s.fuel,20);
}
{
 const g=fixture(r=>r.title==='Salvage destination'?g.chars(0).find(x=>x.id==='LAB-SAL-003').uid:undefined),h=body(g,'LAB-SAL-003');for(let i=0;i<3;i++)await g.dismiss(body(g,'P119'));eq([g.power(h),g.guard(h),g.trouble(h)],[3,5,3]);ok(g.canCauseTrouble(h));eq(g.players[0].salTemp.filter(Boolean).length,0);await g.remove(h,'hand');eq(g.players[0].discard.filter(id=>id==='P119').length,3);eq(g.players[0].salDismissed,3);
}
{
 const g=fixture(),h=body(g,'LAB-SAL-003');ok(!g.canCauseTrouble(h));eq(g.trouble(h),0);
}
{
 const g=fixture(),v=body(g,'P105');g.players[0].discard=Array(6).fill('P119');eq(g.power(v),9);g.players[0].discard.pop();eq(g.power(v),8);
}
{
 const g=fixture(r=>r.title==='Salvage destination'?'stash':undefined),s=g.players[0];body(g,'P093');const dealer=body(g,'P091'),giant=body(g,'P108');s.deck=['P112','P119'];await g.dismiss(body(g,'P110'));eq(s.salDismissed,1);eq(s.board.find(x=>x.id==='P119').ready,false);eq(g.trouble(giant),2);await g.dismiss(body(g,'P110'));eq(s.deck.length,1);eq(g.trouble(giant),3);eq(dealer.salUsedTurn,7);
}
{
 const g=fixture(),pest=body(g,'P104'),attacker=body(g,'P001',1);g.turn=1;const hp=g.players[0].hp;await g.causeTrouble(attacker.uid);eq(g.players[0].hp,hp);ok(!g.obj(pest.uid));eq(attacker.ready,false);
}
{
 const g=fixture(),pest=body(g,'P104');g.players[0].lastStraw=true;g.players[0].hp=0;g.turn=1;await g.causeTrouble(body(g,'P001',1).uid);eq(g.winner,1);ok(g.obj(pest.uid));
}
{
 const g=fixture(),a=body(g,'P001',1),victim=body(g,'P097');victim.ready=false;body(g,'P118');g.turn=1;await g.attack(a.uid);eq(victim.damage,0);ok(!g.players[0].board.some(x=>x.id==='P118'));eq(g.power(a),2);
}
{
 const g=fixture(),x=body(g,'P001',1),cart=body(g,'LAB-SAL-001');await g.activate(cart.uid);eq(g.trouble(x),0);await g.pass();ok(!g.canCauseTrouble(x));await g.pass();eq(g.trouble(x),1);
}
{
 const g=fixture(),s=g.players[0];body(g,'P092');s.salTemp[19]=true;s.stash[19]='P119';g.stashPayment=[{owner:0,picks:[19]}];g.spendOwnStash(0,1);await g.flushEffects();eq(s.hand,['P119']);eq(s.discard,[]);
}
{
 const g=fixture(),s=g.players[0];body(g,'P095');body(g,'P095');eq(g.playCost(0,'P119'),1);await play(g,'P119');eq(g.playCost(0,'P119'),2);
}
{
 const g=fixture(),s=g.players[0];s.discard=['P119'];await play(g,'P115');ok(s.board.some(x=>x.id==='P119'));await g.pass();ok(s.board.some(x=>x.id==='P119'));eq(s.hand.length,0,'no stale Cables draw');
}
{
 const g=fixture(r=>r.title==='Salvage destination'?'stash':undefined),s=g.players[0];await g.dismiss(body(g,'P119'));const giant=body(g,'P108');await play(g,'P111');eq(g.trouble(giant),3);eq(s.salDismissed,1);eq(s.salTemp.filter(Boolean).length,0);
}
{
 const g=fixture(),s=g.players[0];s.deck=['P001','P119','P117','P112'];await play(g,'P114');ok(s.board.some(x=>x.id==='P112'));eq(s.deck.length,3);
}
{
 const g=fixture();eq(await play(g,'P113'),false,'missing Item rejects without payment');eq(g.players[0].fuel,20);
}
{
 const g=fixture(),s=g.players[0];await play(g,'P109');eq(s.discard.length,4);const item=body(g,'P119');await play(g,'P113');eq(s.hand.length,2);ok(!g.obj(item.uid));
}
{
 const g=fixture(),friendly=body(g,'P097');friendly.damage=1;await play(g,'P116');eq(friendly.damage,0);eq(friendly.ready,false);
}
{
 const g=fixture();await g.resolveBreakingPoint(0);const opp=g.players[1];opp.fuel=0;opp.stashReady.fill(false);await g.pass();opp.fuel=0;opp.stashReady.fill(false);await g.pass();eq(opp.fuel,20);
}
{
 const g=fixture(),s=g.players[0];s.discard=['P110'];await g.activate(body(g,'P110').uid);eq(s.hand,['P110']);
 const y=body(g,'P097');y.damage=1;await g.activate(body(g,'P120').uid);eq(y.damage,0);eq(s.hand.length,1);const z=body(g,'P117');await g.damage(y,1);await g.activate(z.uid);eq(y.damage,0);ok(g.obj(z.uid));
}
{
 const g=fixture(r=>r.title==='Salvage destination'?'stash':undefined),s=g.players[0];await g.dismiss(body(g,'P119'));await g.activate(body(g,'LAB-SAL-002').uid);eq(s.hand,['P119']);eq(s.salTemp.filter(Boolean).length,1);
}
{
 const g=fixture(),enemy=body(g,'P117',1);await g.activate(body(g,'P112').uid);ok(!g.obj(enemy.uid));const target=body(g,'P001',1);await g.activate(body(g,'P119').uid);ok(!g.obj(target.uid));
}
console.log('Salvage isolated regression passed: '+checks+' checks; all 32 deployments and six Actions/eight Items exercised.');

// Targeted resource stress: legal turn progression and opponent targets,
// constructed draw order (not a probability estimate).
{
 const deck={...coverage,cards:{...coverage.cards,P114:2,P119:3}};delete deck.cards.P111;delete deck.cards.P116;
 let g;g=new Game(pool,{decks:[deck,doc.decks.find(d=>d.leader==='Florida Man')]},async r=>r.title==='Salvage destination'?'stash':r.title==='Finders Keepers: top or bottom'?'bottom':r.multi?r.options.slice(0,r.min??r.max??1).map(o=>o.value):r.options[0]?.value??null,()=>{},{firstPlayer:1});
 const s=g.players[0],opp=g.players[1];
 const expand=d=>Object.entries(d.cards).flatMap(([id,n])=>Array(n).fill(id));
 for(let p=0;p<2;p++)Object.assign(g.players[p],{deck:expand(g.decks[p]),hand:[],discard:[],board:[],stash:[],stashReady:[],salTemp:[],fuel:0});
 const extract=(v,ids)=>ids.map(id=>{const i=v.deck.indexOf(id);assert(i>=0,'scripted card exists '+id);return v.deck.splice(i,1)[0]});
 s.hand=extract(s,['P114','P114','P119','P095','P094','P097','P104']);
 opp.hand=extract(opp,['P001','P001','P017','P003','P012','P028','P019']);
 const sequence=['P094','P119','P100','P096','P102','P106','P119','P091','P099','P107','P108'];s.deck.push(...extract(s,sequence).reverse());
 const count=()=>g.players.reduce((n,v)=>n+v.deck.length+v.hand.length+v.discard.length+v.stash.length+v.board.reduce((n,x)=>n+1+(x.heapItems?.length||0),0),0);
 const pplay=async(p,id)=>{const i=g.players[p].hand.indexOf(id);assert(i>=0);assert(g.canPlay(i,p));await g.play(i);eq(count(),80);};
 const pstash=(p,id)=>{const i=g.players[p].hand.indexOf(id);assert(i>=0);assert(g.stash(i,p));eq(count(),80)};
 g.begin();pstash(1,'P003');await pplay(1,'P001');await g.pass();
 pstash(0,'P094');await pplay(0,'P114');await g.activate(s.board.find(x=>x.id==='P119').uid);eq(s.salTemp.filter(Boolean).length,1);
 await g.pass();pstash(1,'P028');await pplay(1,'P001');await pplay(1,'P017');await g.pass();
 eq(s.fuel,2);pstash(0,'P106');eq(s.fuel,3);
 await pplay(0,'P114');await g.activate(s.board.find(x=>x.id==='P119').uid);await pplay(0,'P119');await g.activate(s.board.find(x=>x.id==='P119').uid);
 eq(s.salTemp.filter(Boolean).length,2);eq(count(),80);await g.pass();await pplay(1,'P019');await g.pass();pstash(0,'P108');eq(s.fuel,5);eq(g.availableFuel(0),5);await pplay(0,'P095');ok(s.board.some(x=>x.id==='P095'));console.log('Targeted legal 40-card ramp sequence passed: a 5-cost Hoarder on own turn 3, without opposing Stash payment; 80-card conservation checked. Total '+checks+' checks.');
}
