import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game,LEADERS} from './engine.js?v=mordecai-04-meatshield-01';
import './cat-lady.js';
import './rockstar.js';
import './reckless.js';
import './stonewall.js';
import './magician.js';
import {aiAction,aiChoice} from './ai.js';

const pool=JSON.parse(fs.readFileSync(new URL('../CARDS.json',import.meta.url)));
const decks=JSON.parse(fs.readFileSync(new URL('../DECKS.json',import.meta.url)));
const baseline=decks.decks[0], covered=new Set();let assertions=0;
function check(v,message){assert(v,message);assertions++}
function fixture(decide=null){
 let g;
 const ask=async r=>{const v=decide?.(r,g);return v!==undefined?v:r.multi?(r.min?r.options.slice(0,r.min).map(o=>o.value):[]):r.options[0]?.value??null};
 g=new Game(pool,{decks:[baseline,decks.decks[4]]},ask,()=>{},{firstPlayer:0});
 g.round=2;g.turn=0;
 for(const s of g.players){s.board=[];s.hand=[];s.discard=[];s.deck=Array(80).fill('P001');s.stash=Array(12).fill('P001');s.fuel=12;s.attackVictories=0}
 g.dice=(...values)=>{const queue=[...values];g.random=()=>{assert(queue.length,'unexpected dice roll');return (queue.shift()-0.5)/6}};
 return g;
}
const body=(g,id,p=0,ready=true)=>{covered.add(id);const x=g.enter(p,id);x.born=0;x.ready=ready;return x};
async function play(g,id){covered.add(id);g.players[0].hand.push(id);const i=g.players[0].hand.length-1;check(g.canPlay(i),'can play '+id);await g.play(i)}

check(Object.keys(baseline.cards).length===32,'all 32 unique locked cards represented');
check(Object.values(baseline.cards).reduce((a,b)=>a+b,0)===40,'40 cards');
check(Object.values(baseline.cards).every(n=>n<=4),'copy limits');
check(baseline.audit_card_ids.every(id=>baseline.cards[id]),'audit card references');
check(!Object.keys(baseline.cards).some(id=>['LAB-FLM-003','LAB-FLM-006','P023','P025'].includes(id)),'banked cards excluded');
check(LEADERS['Florida Man'].passive.includes('with an Attack'),'current passive displayed');

// All textless bodies and Hothead-only bodies enter with no legacy effects.
for(const id of ['P001','P002','P017','P016','P012']){
 const g=fixture(),x=body(g,id);const hp=g.players.map(s=>s.hp),n=g.players[0].hand.length;
 await g.enterEffect(x,[]);check(g.players[0].hand.length===n&&g.players.every((s,i)=>s.hp===hp[i]),'no legacy on-play '+id);
 const enemy=body(g,'P003',1,false);x.born=g.round;
 check(g.canAttack(x)===['P016','P012'].includes(id),'Hothead entry '+id);
 check(!g.canCauseTrouble(x),'no entry Trouble '+id);
}

// Boogie Boarder draws on both forms of discard movement, not Return.
for(const mode of ['dismiss','defeat','return']){
 const g=fixture(),x=body(g,'P004');
 if(mode==='dismiss')await g.dismiss(x);else if(mode==='defeat')await g.damage(x,1);else await g.remove(x,'hand');
 check(g.players[0].hand.length===(mode==='return'?1:1),'Boogie draw/movement');
 check(g.players[0].deck.length===(mode==='return'?80:79),'Boogie draw only Dismiss/Defeat');
}

// Holdout Power tracks current damage and healing.
{
 const g=fixture(),x=body(g,'P003');await g.damage(x,3);check(g.power(x)===4,'Holdout +damage Power');g.heal(x,2);check(g.power(x)===2,'healing lowers Power');
}

// Every Toddler outcome, including no attack, Dismiss and end-Turn expiry.
for(let r=1;r<=6;r++){
 const g=fixture();g.dice(r);await play(g,'P005');const x=g.chars(0)[0];
 check(g.diceRolls[0].value===r&&g.diceRolls[0].outcome,'Toddler visible roll '+r);
 check(g.players[0].hp===(r===1?18:20)&&g.players[1].hp===(r===2?18:20),'Toddler Composure '+r);
 check(g.players[0].hand.length===(r===4?1:0),'Toddler draw '+r);
 check(g.power(x)===(r===5?3:r===6?4:1),'Toddler Power '+r);
 body(g,'P001',1,false);
 if(r===6){await g.attack(x.uid);check(!g.obj(x.uid),'Toddler dismissed after Attack')}
 else {await g.pass();check(g.power(x)===1&&!x.hot,'Toddler bonuses expire')}
}
{
 const g=fixture();g.dice(6);await play(g,'P005');const x=g.chars(0)[0];await g.pass();check(g.obj(x.uid)&&!x.dismissAfterAttack&&g.power(x)===1,'decline Toddler Attack keeps body');
}

// Chainsaw: every first face, keep result, second success and second bust.
for(let r=1;r<=6;r++){
 const g=fixture(),x=body(g,'P007');body(g,'P003',1,false);g.dice(r);await g.activate(x.uid);
 check(g.power(x)===(r===1?2:4)&&x.ready===(r!==1),'Chainsaw first face '+r);
 check(!g.canUse(x),'Chainsaw once per Turn');
}
for(const second of [1,6]){
 const g=fixture(r=>r.title.startsWith('Chainsaw rolled')?true:undefined),x=body(g,'P007');x.power=3;body(g,'P003',1,false);g.dice(3,second);await g.activate(x.uid);
 check(g.power(x)===(second===1?5:9),'Chainsaw removes only its own bonus');check(g.diceRolls.length===2,'both Chainsaw rolls visible');
}

// Alligator penalty fixed at 2 regardless of Power, on Attack and Trouble.
for(const kind of ['attack','trouble'])for(let r=1;r<=6;r++){
 const g=fixture(),x=body(g,'P009');x.power=7;const enemy=body(g,'P003',1,false);g.dice(r);
 if(kind==='attack')await g.attack(x.uid);else await g.causeTrouble(x.uid);
 check(g.players[0].hp===(r===1?18:20),'Alligator penalty '+kind+r);
 if(kind==='attack')check(!!g.obj(enemy.uid)===(r===1),'Alligator cancellation');
 else check(g.players[1].hp===(r===1?20:19),'Alligator Trouble cancellation');
}

// Items grant live stats/permissions and disappear with wearer.
{
 const g=fixture(),driver=body(g,'P002');await play(g,'LAB-FLM-004');const item=g.players[0].board.find(x=>x.id==='LAB-FLM-004');
 const enemy=body(g,'P003',1,true);check(g.power(driver)===3&&g.attackTargets(driver).includes(enemy),'Driver +1 and Sucker Punch');await g.dismiss(item);check(g.power(driver)===2&&!g.attackTargets(driver).length,'Truck Nuts removal');
 const non=body(g,'P001');g.players[0].board=g.players[0].board.filter(x=>x.uid===non.uid);await play(g,'LAB-FLM-004');check(g.power(non)===2&&g.keyword(non,'Sucker Punch'),'non Driver gets only Sucker Punch');await g.dismiss(non);check(!g.players[0].board.length,'attachment cleanup');
}
for(const id of ['P006','P015']){const g=fixture(),x=body(g,id);g.enter(0,'LAB-FLM-004',x.uid);check(g.power(x)===pool.cards.find(c=>c.id===id).power+1,id+' Driver bonus')}
{
 const g=fixture(),x=body(g,'P004');await play(g,'P028');await play(g,'P028');check(g.trouble(x)===3,'Roman Candle stacks Trouble');x.born=g.round;check(!g.canCauseTrouble(x),'Trouble Item does not bypass entry restriction');
}

// Lifeguard Absorb is highest-only, Ready-only, other Characters only.
{
 const g=fixture(),guard=body(g,'P008'),second=body(g,'P008'),x=body(g,'P004');await g.damage(x,1);check(x.damage===0,'Absorb reduces 1 to zero');await g.damage(x,2);check(!g.obj(x.uid),'two Lifeguards do not stack');
 await g.damage(guard,1);check(guard.damage===0,'other Lifeguard protects this one');second.ready=false;await g.damage(guard,1);check(guard.damage===1,'Lifeguard does not protect itself');guard.ready=false;const y=body(g,'P001');await g.damage(y,1);check(y.damage===1,'Rotated Lifeguards do not grant Absorb');
}

// Attack wins drive passive, Loudmouth, Ron, Zookeeper, Captain and Wrangler.
{
 const g=fixture(),a=body(g,'P006'),mouth=body(g,'P013'),captain=body(g,'P011',0,false),target=body(g,'P001',1,false),item=g.enter(1,'P028',target.uid);
 check(!g.canCauseTrouble(mouth),'Loudmouth locked before victory');const hp=g.players[1].hp;await g.attack(a.uid);
 check(g.players[1].hp===hp-1&&g.players[0].attackVictories===1,'Florida Attack passive');check(g.canCauseTrouble(mouth),'Loudmouth unlocked');check(captain.ready&&captain.captainUsed,'Captain Ready');
 const opponentItem=g.enter(1,'P028');a.ready=true;const next=body(g,'P001',1,false);await g.attack(a.uid);check(!g.obj(opponentItem.uid),'Ron removes Item');captain.ready=false;a.ready=true;body(g,'P001',1,false);await g.attack(a.uid);check(!captain.ready,'Captain once per Turn');
 await g.pass();check(!g.canCauseTrouble(mouth),'victory state expires');
}
{
 const g=fixture(),z=body(g,'P010');body(g,'P001',1,true);const n=g.players[0].hand.length;await g.attack(z.uid);check(g.players[0].hand.length===n+1,'Zookeeper Attack draw');
}
{
 const g=fixture(),w=body(g,'P018');body(g,'P001',1,false);body(g,'P001',1,false);await g.attack(w.uid);check(w.ready&&w.noTrouble,'Wrangler first victory Readies, no Trouble');await g.attack(w.uid);check(!w.ready,'Wrangler only once');
}
{
 const g=fixture(),v=body(g,'P014'),enemy=body(g,'P003',1,false);await g.attack(v.uid);check(!g.obj(v.uid)&&!g.obj(enemy.uid),'Vigilante optional 8 Power then Dismiss');
}
{
 const g=fixture(r=>r.title.startsWith('Wannabe Vigilante')?false:undefined),v=body(g,'P014');body(g,'P001',1,false);await g.attack(v.uid);check(g.obj(v.uid)&&g.power(v)===4,'Vigilante can decline boost');
}
{
 const g=fixture(),jet=body(g,'P015'),hold=body(g,'P003'),target=body(g,'P003',1,false),other=body(g,'P001',1,true);await g.attack(jet.uid);check(other.damage===1&&hold.damage===1,'Jet Skier splash and chosen collateral');check(target.damage===4,'Jet Skier normal Attack');check(g.players[1].hp===20,'effect damage no passive');
}

// Every Action, costs, legality, and expiry.
{
 const g=fixture(),x=body(g,'P002');x.born=g.round;body(g,'P003',1,false);const fuel=g.players[0].fuel;await play(g,'P019');check(g.power(x)===5&&g.canAttack(x),'Hold My Beer boost + entry Attack');check(g.players[0].fuel===fuel-2,'pays cost');await g.pass();check(g.power(x)===2&&!x.hot,'Hold My Beer expires');
}
{
 const g=fixture(),x=body(g,'P012');body(g,'P001',1,false);await g.attack(x.uid);await play(g,'P021');check(x.ready&&!g.canAttack(x)&&g.canCauseTrouble(x),'Victory Lap enables Trouble not Attack');
 const h=fixture(),y=body(h,'P012',0,false);h.players[0].hand=['P021'];check(!h.canPlay(0),'Victory Lap requires actual Attack defeat');
}
{
 const g=fixture(),x=body(g,'P012');body(g,'P003',1,false);await g.attack(x.uid);body(g,'P003',1,false);await play(g,'P020');check(g.power(x)===6&&g.canAttack(x)&&!g.canCauseTrouble(x),'Spring Break second Attack only');await g.attack(x.uid);check(!x.ready,'second Attack spent');
}
{
 const g=fixture(),x=body(g,'P003'),enemy=body(g,'P001',1,true);await play(g,'LAB-FLM-005');check(!g.obj(enemy.uid)&&g.players[1].hp===20&&!g.players[0].attackVictories,'Bottle Rockets no Attack payoff');await play(g,'LAB-FLM-007');check(g.players[0].hand.length===1,'Did You See That draws 1 without victory');
}
{
 const g=fixture(),x=body(g,'P012');body(g,'P001',1,false);await g.attack(x.uid);await play(g,'LAB-FLM-007');check(g.players[0].hand.length===2,'Did You See That draws 2 after victory');
}
{
 const g=fixture(),x=body(g,'P003');x.damage=3;await play(g,'P026');check(x.damage===1&&g.players[0].hand.length===1,'Walk It Off heal 2 Draw 1');await play(g,'P026');check(x.damage===0&&g.players[0].hand.length===2,'Draw even if only heal 1');
}
{
 const g=fixture(),x=body(g,'P003'),enemy=body(g,'P003',1),small=body(g,'P004'),item=g.enter(0,'P028',x.uid);await play(g,'P022');check(x.damage===4&&enemy.damage===4&&g.power(x)===5,'Category 5 both sides');check(!g.obj(small.uid)&&g.obj(item.uid),'Category 5 no Item wipe');check(g.players[1].hp===20&&!g.players[0].attackVictories,'wipe no passive');
}
{
 const g=fixture(),guard=body(g,'P008'),hold=body(g,'P003');await play(g,'P022');check(!g.obj(guard.uid)&&hold.damage===3,'symmetric damage sees Ready Absorb before defeat cleanup');
}
{
 const g=fixture(),x=body(g,'P004');x.born=g.round;body(g,'P003',1,true);await play(g,'LAB-FLM-002');check(g.canAttack(x)&&g.power(x)===7&&!g.canCauseTrouble(x),'Caffeine grants Power Hothead Sucker Punch only');await g.attack(x.uid);check(!g.obj(x.uid)&&g.players[0].hand.length===1,'Caffeine Defeat triggers Boogie draw');
}

// Watch This every face, both chosen rewards, reroll resolves only final face.
for(let r=1;r<=6;r++){
 const g=fixture(),x=body(g,'P001');g.dice(r);await play(g,'P024');check(g.diceRolls[0].value===r,'Watch This visible face');check(g.power(x)===(r===1?2:5),'Watch This Power '+r);check(g.trouble(x)===(r===6?2:1),'Watch This Trouble '+r);check(x.ready===(r!==1),'Watch This bust');
}
{
 const g=fixture(r=>r.title.startsWith('Final roll')?'trouble':undefined),x=body(g,'P001');g.dice(3);await play(g,'P024');check(g.power(x)===2&&g.trouble(x)===2,'Watch This chosen Trouble');await g.pass();check(g.trouble(x)===1,'Trouble bonus expires');
}
for(const final of [1,6]){
 const g=fixture(r=>r.title.includes('press your luck')?true:undefined),x=body(g,'P001');g.dice(4,final);await play(g,'P024');check(g.diceRolls.length===2&&g.diceRolls[0].value===final,'visible reroll');check(g.power(x)===(final===1?2:5),'only final Watch This result applies');
}

// Pills every face, persists/Rotates instead of Dismiss/Ready.
for(let r=1;r<=6;r++){
 const g=fixture(),x=body(g,'P001');await play(g,'P027');const item=g.items(x)[0];g.dice(r);await g.activate(item.uid);
 check(g.power(x)===(r===1?2:r===6?4:3),'Pills Power '+r);check(x.ready===(r!==1)&&!item.ready&&g.obj(item.uid),'Pills Rotate wearer only on 1');check(g.diceRolls[0].value===r,'Pills visible dice');
}

// Ramp every face, next-Attack-only Power, actual Trouble, no survival gate.
for(let r=1;r<=6;r++){
 const g=fixture(),x=body(g,'P012');const target=body(g,'P003',1,false);await play(g,'P030');const ramp=g.players[0].board.find(x=>x.id==='P030');g.dice(r);await g.activate(ramp.uid);
 check(!ramp.ready&&g.obj(ramp.uid),'Ramp persists Rotated');check(x.damage===(r===4||r===5?2:0),'Ramp damage '+r);
 if(r===2||r===3||r===6){check(g.power(x)===4&&g.attackPower(x)===6,'next Attack only boost');const hp=g.players[1].hp;await g.attack(x.uid);check(!g.obj(target.uid),'Ramp boosted Attack');check(g.players[1].hp===hp-(r===6?3:1),'Ramp Trouble plus Florida passive');check(!x.nextAttackPower&&!x.rampTrouble,'Ramp one Attack consumed')}
}
{
 const g=fixture(),x=body(g,'P004'),target=body(g,'P003',1,false);target.guard=4;g.card(target).keywords;target.id='P160'; // Wrestler defender survives and Retaliates.
 // Use an explicit Retaliate fixture without modifying canonical definitions.
 g.cards.P160={...g.cards.P160,power:5,guard:8,keywords:['Retaliate']};
 await play(g,'P030');g.dice(6);await g.activate(g.players[0].board.find(x=>x.id==='P030').uid);await g.attack(x.uid);
 check(!g.obj(x.uid)&&g.players[1].hp===19,'Ramp Trouble happens even when attacker dies');
}
{
 const g=fixture(),x=body(g,'P016');x.born=g.round;body(g,'P003',1,false);await play(g,'P030');g.dice(6);await g.activate(g.players[0].board.find(x=>x.id==='P030').uid);await g.attack(x.uid);check(g.players[1].hp===20,'Ramp does not bypass entry Trouble requirement');
}
{
 const g=fixture(),x=body(g,'P012');body(g,'P003',1,false);await play(g,'P030');g.dice(6);await g.activate(g.players[0].board.find(x=>x.id==='P030').uid);await g.pass();check(!x.nextAttackPower&&!x.rampTrouble,'unused Ramp expires');
}
{
 const g=fixture(),own=body(g,'P001'),enemy=body(g,'P003',1);const small=g.enter(1,'P028',enemy.uid),large=g.enter(1,'P149',enemy.uid);await play(g,'LAB-FLM-001');const cutters=g.players[0].board.find(x=>x.id==='LAB-FLM-001');await g.activate(cutters.uid);check(!g.obj(small.uid)&&!g.obj(cutters.uid)&&g.obj(large.uid),'Bolt Cutters consumes self and only low-cost Item');
}

// Last Straw: Attack passive never final-hits, Ramp's true Trouble can.
{
 const g=fixture(),x=body(g,'P012');body(g,'P001',1,false);g.players[1].lastStraw=true;g.players[1].hp=0;await g.attack(x.uid);check(!g.players[1].unhinged,'Attack passive cannot final-hit');x.ready=true;await g.causeTrouble(x.uid);check(g.players[1].unhinged&&g.winner===0,'actual Trouble final-hit');
}
{
 const g=fixture(),x=body(g,'P012');body(g,'P003',1,false);await play(g,'P030');g.dice(6);await g.activate(g.players[0].board.find(x=>x.id==='P030').uid);g.players[1].lastStraw=true;g.players[1].hp=0;await g.attack(x.uid);check(g.players[1].unhinged&&g.winner===0,'Ramp jackpot can final-hit');
}
{
 const g=fixture(),x=body(g,'P012');body(g,'P003',1,false);g.players[1].hp=2;await play(g,'P030');g.dice(6);await g.activate(g.players[0].board.find(x=>x.id==='P030').uid);await g.attack(x.uid);check(g.players[1].lastStraw&&!g.players[1].unhinged&&g.turn===1,'first Last Straw resolves after complete double hit and passes Turn');
}

for(const id of baseline.audit_card_ids)check(covered.has(id),'tested '+id);
console.log(`Reckless regression passed: all 32 cards, all dice faces; ${assertions} checks`);

// Actual games with the selected 40-card deck on both sides exercise AI legality.
for(let match=0;match<8;match++){
 let g;const ask=async r=>aiChoice(g,r);g=new Game(pool,{decks:[baseline,baseline]},ask,()=>{},{firstPlayer:match%2});g.begin();
 let actions=0;const inventory=()=>g.players.reduce((n,s)=>n+s.deck.length+s.hand.length+s.discard.length+s.stash.length+s.board.length,0);
 check(inventory()===80,'game starts with 80 cards');
 while(g.winner===null&&g.round<=35&&actions++<1800){
  const p=g.turn,m=aiAction(g,p);const before=g.eventCount||0;
  if(m.type==='pass')await g.pass();else if(m.type==='stash')g.stash(m.index,p);else if(m.type==='play')await g.play(m.index);else if(m.type==='attack')await g.attack(m.uid);else if(m.type==='trouble')await g.causeTrouble(m.uid);else if(m.type==='activate')await g.activate(m.uid);
  check(inventory()===80,'card conservation');check((g.eventCount||0)>before,'AI selected action progresses: '+JSON.stringify({m,id:g.players[p].hand[m.index],card:g.obj(m.uid)?.id,log:g.log.slice(0,3)}));
 }
 check(actions<1800,'AI bounded');
}
console.log('Reckless eight-game integration passed (behavior checks, not balance evidence)');
