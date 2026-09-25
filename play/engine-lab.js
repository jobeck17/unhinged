// Character Lab: full turns, character engines, and simultaneous combat.
export const LEADERS={
 'Florida Man':{style:'Reckless',passive:'Walk It Off: The first friendly Character that survives damage during your turn gets +1 Power this turn.'},
 'Washed-Up Rock Star':{style:'Momentum',passive:'Crowd Warms Up: The second card you play each turn gives a friendly Character +1 Power this turn.'},
 'Birthday Party Magician':{style:'Misdirection',passive:'Sleight of Hand: The first friendly Character returned from play to your hand each turn lets you draw, then discard.'},
 'Trash Baron':{style:'Salvage',passive:'Waste Not: The first Item you dismiss each turn deals 1 damage to the opposing Leader.'},
 'HOA President':{style:'Stonewall',passive:'Neighborhood Watch: Your first blocker each turn gets +1 Power for that attack.'},
 'Backyard Wrestler':{style:'Expendable',passive:'Crowd Goes Wild: Your first friendly Character defeated each turn deals 1 damage to the opposing Leader.'}
};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
export class Game{
 constructor(pool,decks,ask,update){this.cards=Object.fromEntries(pool.cards.map(c=>[c.id,c]));this.decks=decks.decks;this.ask=ask;this.update=update;this.log=[];this.nextUid=0;this.round=0;this.turn=0;this.first=0;this.passed=null;this.winner=null;this.pendingAttack=null;this.players=this.decks.map(d=>({deck:shuffle(Object.entries(d.cards).flatMap(([id,n])=>Array(n).fill(id))),hand:[],discard:[],board:[],hp:d.health,fuel:0,played:[],leaderPassiveUsed:false,attacked:false,prevent:0,defeatedRound:false}));this.first=this.war();for(let p=0;p<2;p++)this.draw(p,7,false)}
 name(p){return this.decks[p].leader} card(x){return this.cards[typeof x==='string'?x:x.id]} obj(uid){return this.players.flatMap(s=>s.board).find(x=>x.uid===uid)} chars(p){return this.players[p].board.filter(x=>this.card(x).type==='Character')} items(x){return this.players.flatMap(s=>s.board).filter(y=>y.attached===x.uid)} power(x){return Math.max(0,(this.card(x).power||0)+x.power+this.items(x).filter(i=>i.id==='P027').length+(this.has(x,'P105')?x.cargo.length:0)+this.chars(x.owner).filter(y=>y.uid!==x.uid&&!y.cloaked&&((this.has(y,'P032')&&this.trait(x,'Musician'))||(this.has(y,'P102')&&this.trait(x,'Animal'))||(this.has(y,'P165')&&this.trait(x,'Wrestler')))).length)} guard(x){return (this.card(x).guard||0)+x.guard+this.items(x).reduce((sum,i)=>sum+(['P117','P179'].includes(i.id)?1:i.id==='P149'?(this.trait(x,'Parent')||this.trait(x,'Kid')?3:2):0),0)} layers(x){return x.lower?[x.lower,x.id]:[x.id]} has(x,id){return !!x&&this.layers(x).includes(id)} trait(x,t){return this.card(x).traits.includes(t)||x.extraTrait===t}
 say(msg){this.eventCount=(this.eventCount||0)+1;this.log.unshift(`R${this.round} · ${this.name(this.turn)}: ${msg}`);this.log.length=Math.min(100,this.log.length);this.update?.()}
 war(){let a=shuffle([...this.players[0].deck,...this.players[0].discard]),b=shuffle([...this.players[1].deck,...this.players[1].discard]);for(let i=0;i<Math.min(a.length,b.length);i++){let d=this.card(a[i]).cost-this.card(b[i]).cost;if(d)return d>0?0:1}return Math.floor(Math.random()*2)}
 draw(p,n=1,announce=true){let s=this.players[p];for(let i=0;i<n;i++){if(!s.deck.length){s.empty=true;this.checkEnd();return}s.hand.push(s.deck.pop())}if(announce)this.say(`${this.name(p)} draws ${n}`)}
 checkEnd(){let lost=this.players.map(s=>s.hp<=0||s.empty);if(this.winner===null&&(lost[0]||lost[1])){this.winner=lost[0]&&lost[1]?this.war():lost[0]?1:0;this.say(`${this.name(this.winner)} wins`)}return this.winner!==null}
 async choose(p,title,options,optional=false){if(!options.length)return null;return this.ask({title,player:p,mandatory:!optional,options:[...options.map(o=>({label:o.label,value:o.value})),...(optional?[{label:'Skip',value:null}]:[])]})}
 async pick(title,p,targets,optional=false){return this.choose(p,title,targets.map(x=>({label:x===-1?this.name(title.includes('opposing')||title.includes('Attack')?1-p:p)+' (Leader)':this.card(x).name,value:x===-1?-1:x.uid})),optional)}
 async pickHand(p,title,condition=()=>true,optional=false){let s=this.players[p],o=s.hand.map((id,i)=>({label:`${this.card(id).name} · ${this.card(id).cost} Fuel`,value:i})).filter(o=>condition(this.card(s.hand[o.value]),o.value));return this.choose(p,title,o,optional)}
 async pickDiscard(p,title,condition=()=>true,optional=false){let s=this.players[p],o=s.discard.map((id,i)=>({label:this.card(id).name,value:i})).filter(o=>condition(this.card(s.discard[o.value]),o.value));return this.choose(p,title,o,optional)}
 async discard(p){let i=await this.pickHand(p,'Choose a card to discard');if(i!=null)this.players[p].discard.push(this.players[p].hand.splice(i,1)[0])}
 async rummage(p){this.draw(p);if(this.players[p].hand.length)await this.discard(p)}
 async leaderPassive(p,event,context={}){let s=this.players[p],name=this.name(p);if(s.leaderPassiveUsed)return 0;
  if(name==='Florida Man'&&event==='survivedDamage'&&this.turn===p){s.leaderPassiveUsed=true;context.character.power++;this.say('Walk It Off: +1 Power')}
  else if(name==='Washed-Up Rock Star'&&event==='secondCard'){let a=this.chars(p);if(!a.length)return 0;s.leaderPassiveUsed=true;let id=await this.pick('Crowd Warms Up: +1 Power',p,a);if(id!=null&&this.obj(id))this.obj(id).power++}
  else if(name==='Birthday Party Magician'&&event==='returnedCharacter'){s.leaderPassiveUsed=true;await this.rummage(p)}
  else if(name==='Trash Baron'&&event==='dismissedItem'){s.leaderPassiveUsed=true;this.hurtLeader(1-p,1);this.say('Waste Not deals 1 Leader damage')}
  else if(name==='HOA President'&&event==='blocker'){s.leaderPassiveUsed=true;this.say('Neighborhood Watch: blocker gets +1 Power');return 1}
  else if(name==='Backyard Wrestler'&&event==='friendlyDefeat'){s.leaderPassiveUsed=true;this.hurtLeader(1-p,1);this.say('Crowd Goes Wild deals 1 Leader damage')}
  return 0}
 async opponentChoice(p){let pirate=this.chars(p).find(x=>this.has(x,'P078')&&!x.cloaked&&!x.once),s=this.players[p];if(!pirate||!s.deck.length)return;pirate.once=true;let id=s.deck.pop(),card=this.card(id);this.say(`Fine Print reveals ${card.name}`);let play=await this.choose(p,`Fine Print: play ${card.name} for free?`,[{label:'Play it for free',value:true},{label:'Put it on the bottom',value:false}]);if(!play){s.deck.unshift(id);return}s.hand.push(id);let index=s.hand.length-1,ok=await this.playCard(p,id,'hand',0,{index});if(!ok){let i=s.hand.indexOf(id);if(i>=0)s.deck.unshift(...s.hand.splice(i,1));this.say(`${card.name} could not be played and goes to the bottom`)}}
 async mulligan(p,indices){let s=this.players[p],chosen=[...indices].sort((a,b)=>b-a).map(i=>s.hand.splice(i,1)[0]);this.draw(p,chosen.length,false);s.deck.push(...chosen);shuffle(s.deck);this.say(`${chosen.length} card(s) replaced`)}
 begin(){this.round=1;this.turn=this.first;this.startRound()}
 startRound(){this.say(`Round ${this.round} begins · ${Math.min(7,this.round)} Fuel`);this.startTurn()}
 startTurn(){for(let s of this.players){Object.assign(s,{played:[],leaderPassiveUsed:false,attacked:false,prevent:0,defeatedRound:false,nextCharDiscount:0,nextItemDiscount:0,friendPower:false,discountUndead:null});for(let x of s.board){x.once=false;x.roundUsed=false;x.noBlock=false}}let p=this.turn,s=this.players[p];s.fuel=Math.min(7,this.round);for(let x of s.board){x.ready=true;x.attacked=false}this.draw(p,1,false);this.checkEnd();this.update?.()}
 async endRound(){for(let p=0;p<2;p++)for(let x of [...this.players[p].board]){if(!this.obj(x.uid))continue;if(x.id==='P029'){this.hurtLeader(x.beside,1);this.say(`Hot Potato hits ${this.name(x.beside)}`);await this.remove(x,'hand')}if(x.id==='P089'&&x.hidden){this.players[p].hand.push(x.hidden);x.hidden=null}if(x.cloaked)x.cloaked=false;if(this.card(x).type==='Character'){x.power=0;x.guard=0;x.hot=false;await this.checkDefeat(x)}}this.checkEnd();if(this.winner!==null)return;let nextRound=this.turn!==this.first;this.turn=1-this.turn;if(nextRound){this.round++;this.startRound()}else this.startTurn()}
 async pass(){this.say('End turn');await this.endRound()}
 advance(){this.pendingAttack=null;this.checkEnd();this.update?.()}
 enter(p,id,attach=null,lower=null){let x={uid:++this.nextUid,id,lower,owner:p,ready:true,born:this.round,damage:0,power:0,guard:0,hot:false,attacked:false,attached:attach,cargo:[],cloaked:false};this.players[p].board.push(x);return x}
 async remove(x,where='discard',defeated=false){if(!x||!this.obj(x.uid))return;let p=x.owner,s=this.players[p],wasCharacter=this.card(x).type==='Character';if(this.items(x).some(i=>i.uid===x.uid))throw Error(`Self attached ${x.id} ${x.uid}`);for(let i of [...this.items(x)])await this.remove(i);if(x.id==='P089'&&x.hidden){s.hand.push(x.hidden);x.hidden=null}if(x.cargo?.length){s.discard.push(...x.cargo);x.cargo=[]}s.board=s.board.filter(y=>y.uid!==x.uid);let lower=x.lower;s[where].push(...(lower?[lower]:[]),x.id);if(defeated){s.defeatedRound=true;await this.leaderPassive(p,'friendlyDefeat');for(let id of lower?[lower,x.id]:[x.id])await this.defeatEffect(id,x,p,lower)}else if(where==='hand'){if(wasCharacter)await this.leaderPassive(p,'returnedCharacter');for(let y of this.chars(p))if(y.uid!==x.uid&&!y.cloaked&&this.has(y,'P066')&&!y.once){y.once=true;await this.rummage(p)}}}
 async defeatEffect(id,x,p,lower){let s=this.players[p],opp=1-p;if(id==='P152'||id==='P167')this.players[opp].hp--;if(id==='P164')for(let z of [...this.chars(opp)])await this.damage(z,1);if(id==='P104'){let i=s.discard.indexOf(id);if(i>=0)s.deck.unshift(...s.discard.splice(i,1))}if(id==='P106'&&lower){let i=s.discard.indexOf(lower);if(i>=0)s.hand.push(...s.discard.splice(i,1))}if(id==='P161'){/* delayed until end of turn in a later-card variant; not in these lists */}if(id==='P159'){let y=this.chars(p)[0];if(y){y.power+=2;if(this.trait(y,'Rat')||this.trait(y,'Undead'))y.guard++}}if(id==='P103'&&this.players[p].board.some(y=>this.card(y).type==='Item')){let item=this.players[p].board.find(y=>this.card(y).type==='Item');await this.dismiss(item);let i=s.discard.indexOf(id);if(i>=0)s.hand.push(...s.discard.splice(i,1))}}
 async checkDefeat(x){if(!x||!this.obj(x.uid)||x.cloaked||this.card(x).type!=='Character'||x.damage<this.guard(x))return false;this.say(`${this.card(x).name} is Defeated`);x.cargoRevealed=[...x.cargo];await this.remove(x,'discard',true);return true}
 async damage(x,n,defer=false){if(!x||!this.obj(x.uid)||n<=0||x.cloaked)return;let shield=this.items(x).find(i=>i.id==='P149');if(shield){let use=await this.choose(x.owner,'Dismiss Occupied Stroller to prevent 2 damage?',[{label:'Dismiss and prevent 2',value:true},{label:'Keep stroller',value:false}]);if(use){await this.dismiss(shield);n=Math.max(0,n-2)}}if(!n)return;x.damage+=n;this.say(`${this.card(x).name} takes ${n} damage`);if(!defer){if(await this.checkDefeat(x))return;await this.leaderPassive(x.owner,'survivedDamage',{character:x})}}
 async combatDamage(pairs){for(let [x,n] of pairs)await this.damage(x,n,true);let dead=pairs.map(([x])=>x).filter(x=>this.obj(x.uid)&&!x.cloaked&&x.damage>=this.guard(x)),survivors=pairs.filter(([,n])=>n>0).map(([x])=>x).filter(x=>this.obj(x.uid)&&!dead.includes(x));for(let x of dead){x.cargoRevealed=[...x.cargo];this.say(`${this.card(x).name} is Defeated`);await this.remove(x,'discard',false)}for(let x of dead){let p=x.owner;this.players[p].defeatedRound=true;await this.leaderPassive(p,'friendlyDefeat');for(let id of this.layers(x))await this.defeatEffect(id,x,p,x.lower)}for(let x of survivors)await this.leaderPassive(x.owner,'survivedDamage',{character:x})}
 heal(x,n){if(x&&this.obj(x.uid))x.damage=Math.max(0,x.damage-n)}
 hurtLeader(p,n){let s=this.players[p],blocked=Math.min(s.prevent,n);s.prevent-=blocked;s.hp-=n-blocked;if(n>blocked)this.say(`${this.name(p)} takes ${n-blocked} damage`)}
 async dismiss(x){if(!x||!this.obj(x.uid))return;let p=x.owner,isItem=this.card(x).type==='Item';await this.remove(x);if(isItem)await this.leaderPassive(p,'dismissedItem')}
 async search(p,n,condition,rest='bottom'){let s=this.players[p],top=[];for(let i=0;i<n&&s.deck.length;i++)top.push(s.deck.pop());let opts=top.map((id,i)=>({label:this.card(id).name,value:i})).filter(o=>condition(this.card(top[o.value])));let choice=await this.choose(p,`Look at top ${n}: take a card`,opts,true);if(choice!=null){s.hand.push(top.splice(choice,1)[0]);this.say(`${this.name(p)} finds a card`)}if(rest==='discard')s.discard.push(...top);else s.deck.unshift(...top.reverse());return choice!=null}
 canAttack(x){if(!x||x.cloaked||!x.ready||this.has(x,'P135'))return false;let hot=this.layers(x).some(id=>this.card(id).keywords.includes('Hothead'))||x.hot;let blocked=this.players.flatMap(s=>s.board).some(y=>y.uid!==x.uid&&y.ready&&!y.cloaked&&this.has(y,'P135'));return x.born<this.round||hot&&!blocked}
 canActivate(x){return !!x?.ready&&!x.cloaked&&(this.card(x).type==='Item'||x.born<this.round)}
 canPlay(index,p=this.turn){let id=this.players[p].hand[index],c=this.card(id);if(!c||Math.max(0,c.cost-(c.type==='Character'?this.players[p].nextCharDiscount||0:c.type==='Item'?this.players[p].nextItemDiscount||0:0))>this.players[p].fuel)return false;if(c.type==='Item'&&['P027','P057','P117','P149','P178','P179'].includes(id)&&!this.chars(p).length)return false;let own=this.chars(p),opp=this.chars(1-p);if(['P019','P080','P169','P171','P172','P175','P023'].includes(id)&&!own.length||id==='P171'&&own.length+opp.length<2||id==='P170'&&own.length<2||['P023','P139','P141','P067','P081','P086'].includes(id)&&!opp.length||id==='P025'&&!own.some(x=>!x.ready)||id==='P172'&&!own.some(x=>x.damage)||id==='P084'&&!this.players.some(s=>s.board.some(x=>this.card(x).type==='Item'))||id==='P110'&&!this.players[p].discard.some(x=>this.card(x).type==='Item'&&this.card(x).cost===1)||id==='P114'&&!this.players[p].discard.some(x=>this.card(x).type==='Item')||id==='P113'&&!this.players[p].board.some(x=>this.card(x).type==='Item')||id==='P112'&&![...own,...opp].length||id==='P026'&&![...own,...opp].length||id==='P143'&&![...own,...opp].length||id==='P052'&&!this.players[p].discard.some(x=>this.card(x).type==='Action'&&this.card(x).cost<=1)||id==='P086'&&!own.some(y=>opp.some(z=>this.card(z).cost<=this.card(y).cost)))return false;return true}
 async play(index){let p=this.turn,s=this.players[p],id=s.hand[index];if(!this.canPlay(index,p))return;let c=this.card(id),cost=Math.max(0,c.cost-(c.type==='Character'?(s.nextCharDiscount||0)+(s.discountUndead===id?1:0):c.type==='Item'?s.nextItemDiscount||0:0));let ok=await this.playCard(p,id,'hand',cost,{index});if(!ok)return;this.advance()}
 async playCard(p,id,source='hand',cost=0,{index=null,bonusHot=false,stack=false}={}){let s=this.players[p],c=this.card(id),own=this.chars(p),opp=this.chars(1-p),target=null,second=null,choice=null;
 if(source==='hand'&&(index===null||s.hand[index]!==id))index=s.hand.indexOf(id);
 if(source==='hand'&&index<0||source==='discard'&&!s.discard.includes(id)||s.fuel<cost)return false;
 if(c.type==='Item'&&['P027','P057','P117','P149','P178','P179'].includes(id)){if(!own.length)return false;target=await this.pick('Attach to your Character',p,own);if(target==null)return false}
 if(c.type==='Character'&&c.keywords.includes('Stack')&&own.length){choice=await this.choose(p,'Stack onto a Character or Play separately',[{label:'Play separately',value:0},...own.filter(x=>!x.lower&&!x.cloaked).map(x=>({label:`Stack on ${this.card(x).name}`,value:x.uid}))]);if(choice==null)return false}
 if(id==='P089'){let i=await this.pickHand(p,'Hide a Character costing at most 2 beneath Bush',(k,j)=>j!==index&&k.type==='Character'&&k.cost<=2,true);second=i==null?null:s.hand[i]}
 if(id==='P029')target=1-p;
 // Required targets are chosen before Fuel or cards move.
 const ownPick=['P019','P025','P027','P055','P057','P112','P117','P120','P149','P169','P170','P171','P172','P173','P175','P178','P179','P080','P023'];
 if(['P019','P025','P112','P169','P170','P171','P172','P175','P080','P023'].includes(id)){
  let options=id==='P025'?own.filter(x=>!x.ready):id==='P112'?[...own,...opp]:id==='P172'?own.filter(x=>x.damage):own;
  if(!options.length)return false;target=await this.pick('Choose a Character',p,options);if(target==null)return false}
 if(['P023','P171'].includes(id)){let possible=id==='P171'?[...opp,...own.filter(z=>z.uid!==target)]:opp;if(!possible.length)return false;second=await this.pick('Choose another Character',p,possible);if(second==null)return false}
 if(id==='P170'){let rest=own.filter(x=>x.uid!==target);if(!rest.length)return false;second=await this.pick('Choose the Character to boost',p,rest);if(second==null)return false}
 if(['P067','P081','P139','P141','P143','P086'].includes(id)){let a=id==='P143'?[...own,...opp]:opp;if(!a.length)return false;if(id==='P086'){if(!own.length)return false;target=await this.pick('Choose your Character',p,own.filter(y=>opp.some(z=>this.card(z).cost<=this.card(y).cost)));if(target==null)return false;a=opp.filter(x=>this.card(x).cost<=this.card(this.obj(target)).cost);if(!a.length)return false;second=await this.pick('Choose opposing Character',p,a)}else {target=await this.pick('Choose opposing Character',p,a);if(target==null)return false}}
 if(id==='P084'){let a=this.players.flatMap(v=>v.board).filter(x=>this.card(x).type==='Item');if(!a.length)return false;target=await this.pick('Choose an Item',p,a);if(target==null)return false}
 if(id==='P110'){let i=s.discard.findIndex(k=>this.card(k).type==='Item'&&this.card(k).cost===1);if(i<0)return false}
 if(id==='P114'&&!s.discard.some(k=>this.card(k).type==='Item'))return false;
 if(id==='P113'&&!s.board.some(x=>this.card(x).type==='Item'))return false;
 if(id==='P086'&&!this.obj(target))return false;
 if(source==='hand'){s.hand.splice(index,1)}else s.discard.splice(s.discard.indexOf(id),1);
 s.fuel-=cost;let previous=[...s.played];s.played.push({id,type:c.type});this.say(`Plays ${c.name}${cost?` (${cost} Fuel)`:' for free'}`);
 if(c.type==='Character'){
  let x;if(choice){x=this.obj(choice);x.lower=x.id;x.id=id;x.born=this.round;x.hot=bonusHot;x.power=0;await this.checkDefeat(x)}else{x=this.enter(p,id);x.hot=bonusHot}
  if(!x||!this.obj(x.uid))return true;
  await this.enterEffect(x,previous);if(s.friendPower&&this.obj(x.uid)){let z=this.chars(p).filter(y=>y.uid!==x.uid);if(z.length){let t=await this.pick('Bring a Friend: give +1 Power',p,z,true);if(t!=null)this.obj(t).power++}s.friendPower=false}if(c.type==='Character'&&s.nextCharDiscount)s.nextCharDiscount=0;if(c.type==='Character'&&s.discountUndead===id)s.discountUndead=null;if(c.type==='Item'&&s.nextItemDiscount)s.nextItemDiscount=0;
 }else if(c.type==='Item'){
  let x=this.enter(p,id,['P027','P057','P117','P149','P178','P179'].includes(id)?target:null);if(id==='P029')x.beside=1-p;
  if(id==='P089'&&second){let i=s.hand.indexOf(second);if(i>=0)x.hidden=s.hand.splice(i,1)[0]}
  if(id==='P119')this.draw(p);
 }else {await this.actionEffect(p,id,target,second,previous);if(id==='P052'&&s.discard.includes(id)){/* free replayed action is handled by the action effect */}}
 if(c.type==='Action')s.discard.push(id);
 if(c.type==='Item')for(let y of this.chars(p))if(this.has(y,'P105')&&!y.cloaked&&s.deck.length){y.cargo.push(s.deck.pop());this.say(`Vacuum loads cargo (${y.cargo.length})`)}
 if(c.type==='Action')for(let y of [...this.chars(p)])if(!y.cloaked){if(this.has(y,'P033')||this.has(y,'P048'))y.power++;if(this.has(y,'P048')&&previous.filter(k=>k.type==='Action').length===2&&!y.once){y.once=true;this.say('ENCORE: third Action unlocks a free Character');let i=await this.pickHand(p,'Roadie: free Character costing at most 3',c=>c.type==='Character'&&c.cost<=3,true);if(i!=null)await this.playCard(p,s.hand[i],'hand',0,{index:i})}}
 if(s.played.length===2){await this.leaderPassive(p,'secondCard');for(let item of s.board.filter(z=>z.id==='P057')){let z=this.obj(item.attached);if(z)z.power++}}
 return true}
 async enterEffect(x,previous){let p=x.owner,s=this.players[p],id=x.id,opp=1-p;
 if(id==='P011'){let team=this.chars(p).filter(y=>y.uid!==x.uid);for(let y of team)await this.damage(y,1);let n=Math.min(3,team.filter(y=>this.obj(y.uid)).length);if(n)this.draw(p,n);this.say(`FIREWORKS SETUP: ${n} survivors refill your hand`)}
 if(id==='P065'){let t=await this.pick('Escape Artist: return another friendly Character',p,this.chars(p).filter(y=>y.uid!==x.uid),true);if(t!=null)await this.remove(this.obj(t),'hand')}
 if(id==='P010'){let t=await this.pick('Deal 2 to your Leader or another Character',p,[-1,...this.chars(p).filter(y=>y.uid!==x.uid)]);if(t===-1)this.hurtLeader(p,2);else if(t!=null)await this.damage(this.obj(t),2)}
 if(id==='P017'){let yes=await this.choose(p,'Vape Kid: take 1 Leader damage to rummage?',[{label:'Yes',value:true},{label:'No',value:false}]);if(yes){this.hurtLeader(p,1);await this.rummage(p)}}
 if(id==='P040')await this.search(p,3,c=>c.type==='Character'&&c.cost<=2);
 if(id==='P047'){await this.rummage(p);if(previous.length)x.guard++}
 if(id==='P062'&&s.deck.length){let yes=await this.choose(p,'Put top card on bottom?',[{label:'Yes',value:true},{label:'No',value:false}]);if(yes)s.deck.unshift(s.deck.pop())}
 if(id==='P067'&&this.chars(opp).length){let t=await this.pick('Kid with an iPad: -1 Power',p,this.chars(opp),true);if(t!=null)this.obj(t).power--}
 if(id==='P074'){let a=this.players.flatMap(v=>v.board).filter(y=>y.uid!==x.uid&&this.card(y).traits.length);if(a.length){let t=await this.pick('Identity Thief: copy a Trait',p,a,true);if(t!=null)x.extraTrait=this.card(this.obj(t)).traits[0]}}
 if(id==='P107'){let i=await this.pickDiscard(p,'Return an Item costing 1',c=>c.type==='Item'&&c.cost===1,true);if(i!=null)s.hand.push(...s.discard.splice(i,1))}
 if(['P094','P153'].includes(id))await this.search(p,3,c=>id==='P094'?c.type==='Item':c.type==='Character'&&(c.traits.includes('Animal')||c.traits.includes('Undead')));
 }
 async actionEffect(p,id,target,second,previous){let s=this.players[p],opp=1-p,x=this.obj(target),y=this.obj(second);
 switch(id){
 case 'P019':await this.damage(x,1);if(this.obj(target))x.power+=3;break;
 case 'P022':this.draw(p,2);this.hurtLeader(p,1);break;
 case 'P023':await this.damage(x,2);await this.damage(y,2);if(this.obj(target))await this.rummage(p);break;
 case 'P025':x.ready=true;await this.damage(x,2);if(this.obj(target))x.hot=true;break;
 case 'P026':{let t=await this.pick('Heal a Character',p,[...this.chars(p),...this.chars(opp)]);this.heal(this.obj(t),2);this.draw(p);break}
 case 'P049':this.draw(p,2);this.draw(opp);break;
 case 'P050':await this.search(p,4,c=>c.type==='Character');break;
 case 'P052':{let i=await this.pickDiscard(p,'Encore an Action costing 1 or less',c=>c.type==='Action'&&c.cost<=1,true);if(i!=null){let other=s.discard[i];await this.playCard(p,other,'discard',0);let j=s.discard.lastIndexOf(other);if(j>=0)s.deck.unshift(...s.discard.splice(j,1))}break}
 case 'P053':this.draw(p);break;
 case 'P055':s.nextCharDiscount=2;break;
 case 'P079':{if(s.hand.length<3)this.draw(p,3-s.hand.length);if(this.winner!==null||!s.hand.length)break;let i=await this.choose(opp,'Pick a Card: choose one face-down card',s.hand.map((_,i)=>({label:`Face-down card ${i+1}`,value:i})));if(i!=null&&s.hand[i]){let chosen=s.hand.splice(i,1)[0];await this.opponentChoice(p);s.hand.splice(Math.min(i,s.hand.length),0,chosen);let card=this.card(chosen);this.say(`Pick a Card reveals ${card.name}`);await this.playCard(p,chosen,'hand',0,{index:Math.min(i,s.hand.length-1)})}break}
 case 'P080':{await this.remove(x,'hand');let i=await this.pickHand(p,'Play a Character costing at most 2 at -1 Fuel',c=>c.type==='Character'&&c.cost<=2,true);if(i!=null){let cid=s.hand[i];if(s.fuel>=Math.max(0,this.card(cid).cost-1))await this.playCard(p,cid,'hand',Math.max(0,this.card(cid).cost-1),{index:i})}break}
 case 'P081':if(x)x.noBlock=true;break;
 case 'P084':if(x.ready)x.ready=false;else this.draw(p);if(this.chars(p).some(z=>this.trait(z,'Hacker')))await this.rummage(p);break;
 case 'P086':await this.remove(x,'hand');await this.remove(y,'hand');break;
 case 'P109':await this.search(p,3,c=>c.type==='Item','discard');break;
 case 'P110':{let i=await this.pickDiscard(p,'Return an Item costing 1',c=>c.type==='Item'&&c.cost===1);if(i!=null)s.hand.push(...s.discard.splice(i,1));break}
 case 'P112':this.heal(x,this.trait(x,'Scavenger')?3:2);break;
 case 'P113':{let a=s.board.filter(z=>this.card(z).type==='Item');if(a.length){let t=await this.pick('Dismiss an Item',p,a);await this.dismiss(this.obj(t));this.draw(p,2)}break}
 case 'P114':{let i=await this.pickDiscard(p,'Put an Item on bottom of deck',c=>c.type==='Item');if(i!=null){s.deck.unshift(...s.discard.splice(i,1));this.draw(p)}break}
 case 'P139':await this.damage(x,this.chars(p).length);break;
 case 'P141':await this.damage(x,3);break;
 case 'P143':if(x){x.power--;x.guard--;await this.checkDefeat(x)}break;
 case 'P146':this.draw(p);if(!s.attacked&&this.chars(p).length){let t=await this.pick('Give Guard to a Character',p,this.chars(p),true);if(t!=null){let z=this.obj(t);z.guard+=this.trait(z,'HOA')?3:2}}break;
 case 'P169':await this.remove(x,'discard',true);s.prevent+=3;break;
 case 'P170':await this.remove(x,'discard',true);if(this.obj(second)){y.power+=2;y.guard+=2}break;
 case 'P171':{let pow=this.power(x);await this.remove(x,'discard',true);await this.damage(y,pow);break}
 case 'P172':{let cost=this.card(x).cost,wr=this.trait(x,'Wrestler');await this.remove(x,'hand');let i=await this.pickHand(p,'Tag Me In: Play a different Character',c=>c.type==='Character'&&c.cost<=cost&&c.id!==x.id,true);if(i!=null)await this.playCard(p,s.hand[i],'hand',0,{index:i,bonusHot:wr});break}
 case 'P173':{let i=await this.pickDiscard(p,'Return a Character costing at most 2',c=>c.type==='Character'&&c.cost<=2);if(i!=null)s.hand.push(...s.discard.splice(i,1));break}
 case 'P175':await this.remove(x,'discard',true);this.hurtLeader(opp,2);break;
 }
 }
 canUse(x){if(['P032','P065','P102','P165'].includes(x?.id))return false;if(!this.canActivate(x)||x.owner!==this.turn&&!(x.id==='P029'&&x.beside===this.turn))return false;if(x.id==='P119'&&!this.players[this.turn].board.some(y=>y.uid!==x.uid&&this.card(y).type==='Item'&&!y.ready))return false;if(['P032','P059','P065','P074','P102','P124','P126','P165','P166'].includes(x.id)&&!this.chars(this.turn).length)return false;if(['P003','P065','P126','P165','P166'].includes(x.id)&&!this.chars(this.turn).some(y=>y.uid!==x.uid))return false;if(['P138','P147'].includes(x.id)&&!this.chars(1-this.turn).length)return false;if(x.id==='P120'&&![...this.chars(this.turn),...this.chars(1-this.turn)].some(y=>y.damage)||x.id==='P124'&&!this.chars(this.turn).some(y=>y.damage))return false;if(x.id==='P166'&&!this.chars(this.turn).some(y=>y.uid!==x.uid&&y.damage))return false;if(x.id==='P088'&&!this.players[this.turn].deck.length)return false;if(['P065','P166'].includes(x.id)&&this.chars(this.turn).length<2)return false;return this.layers(x).some(id=>!['P032','P065','P102','P165'].includes(id)&&['P003','P027','P032','P059','P065','P074','P088','P102','P117','P119','P120','P124','P126','P132','P138','P147','P165','P166','P178','P179'].includes(id))||x.id==='P029'&&x.beside===this.turn||x.id==='P063'||x.id==='P066'}
 async activate(uid,mode=null){let p=this.turn,x=this.obj(uid);if(!x||!this.canUse(x)||x.owner!==p&&!(x.id==='P029'&&x.beside===p))return;let opts=this.layers(x).filter(id=>!['P032','P065','P102','P165'].includes(id)&&['P003','P027','P032','P059','P065','P074','P088','P102','P117','P119','P120','P124','P126','P132','P138','P147','P165','P166','P178','P179'].includes(id));if(this.layers(x).some(id=>this.card(id).keywords.includes('Cloak')))opts.push('Cloak');if(x.id==='P029')opts.push('P029');if(!opts.length)return;let id=mode||(opts.length===1?opts[0]:await this.choose(p,'Choose an ability',opts.map(z=>({label:z==='Cloak'?'Cloak':this.card(z).name,value:z}))));if(!id)return;let own=this.chars(p),opp=this.chars(1-p),target=null,second=null;
 if(id==='Cloak'){x.ready=false;x.cloaked=true;this.say(`${this.card(x).name} cloaks until end of turn`);this.advance();return}
 let lists={P003:own.filter(y=>y.uid!==x.uid),P032:own,P059:own,P065:own.filter(y=>y.uid!==x.uid),P074:own.filter(y=>y.uid!==x.uid),P102:own.filter(y=>y.uid!==x.uid),P120:[...own,...opp].filter(y=>y.damage),P124:own.filter(y=>y.damage),P126:own.filter(y=>y.uid!==x.uid),P132:[...own.filter(y=>y.damage),...(this.players[p].hp<25?[-1]:[])],P138:opp,P147:opp,P165:own.filter(y=>y.uid!==x.uid),P166:own.filter(y=>y.uid!==x.uid&&y.damage)};
 if(id in lists){if(!lists[id].length)return;target=await this.pick('Choose ability target',p,lists[id]);if(target==null)return}
 if(['P027','P117','P178','P179'].includes(id)){target=x.attached;if(!this.obj(target))return}
 if(id==='P029'){let a=own.filter(y=>y.ready);if(!a.length)return;target=await this.pick('Rotate a Character to pass Hot Potato',p,a);if(target==null)return}
 if(id==='P119'){let a=this.players[p].board.filter(y=>y.uid!==x.uid&&this.card(y).type==='Item'&&!y.ready);if(!a.length)return;target=await this.pick('Ready another Item',p,a);if(target==null)return}
 if(id==='P102'){let rest=own.filter(y=>y.uid!==x.uid&&y.uid!==target);if(rest.length)second=await this.pick('Choose second Character',p,rest,true)}
 if(id==='P003'&&this.guard(this.obj(target))-this.obj(target).damage<=1)return;
 let z=this.obj(target);if(id==='P029'){z.ready=false;x.beside=1-p}else if(['P027','P120','P178'].includes(id))await this.dismiss(x);else if(id==='P119')await this.dismiss(x);else{x.ready=false}
 this.say(`Activates ${id==='Cloak'?'Cloak':this.card(id).name}`);
 switch(id){
 case 'P003':await this.damage(z,1);if(this.obj(target))z.power+=2;break;
 case 'P027':z.ready=true;await this.damage(z,1);break;
 case 'P032':z.power+=this.trait(z,'Musician')||this.trait(z,'Clown')?2:1;break;
 case 'P059':z.power+=this.players[p].played.length&& (this.trait(z,'Musician')||this.trait(z,'Clown'))?2:1;break;
 case 'P065':{let t=this.trait(z,'Magician')||this.trait(z,'Clown');await this.remove(z,'hand');if(t)await this.rummage(p);break}
 case 'P074':await this.rummage(p);if(x.extraTrait&&this.card(z).traits.includes(x.extraTrait))z.power+=2;break;
 case 'P088':{let v=await this.choose(p,'Move top card to bottom?',[{label:'Yes',value:true},{label:'No',value:false}]);if(v&&this.players[p].deck.length)this.players[p].deck.unshift(this.players[p].deck.pop());break}
 case 'P102':for(let uid of [target,second])if(uid!=null&&this.obj(uid)){let a=this.obj(uid);a.power++;if(this.trait(a,'Rat'))a.guard++}break;
 case 'P117':this.heal(z,this.trait(z,'Construct')?2:1);break;
 case 'P119':if(this.obj(target))this.obj(target).ready=true;break;
 case 'P120':this.heal(z,2);if(this.trait(z,'Scavenger'))await this.rummage(p);break;
 case 'P124':this.heal(z,2);break;
 case 'P126':z.guard+=this.trait(z,'Kid')?3:2;break;
 case 'P132':if(target===-1)this.players[p].hp=Math.min(25,this.players[p].hp+2);else this.heal(z,2);break;
 case 'P138':z.power-=this.power(z)>this.power(x)?3:2;break;
 case 'P147':z.power--;break;
 case 'P165':z.power+=this.trait(z,'Wrestler')||this.trait(z,'Daredevil')?3:2;break;
 case 'P166':{let t=this.trait(z,'Wrestler');await this.remove(z,'hand');if(t)await this.rummage(p);break}
 case 'P178':z.power+=this.trait(z,'Wrestler')?3:2;break;
 case 'P179':this.heal(z,1);break;
 }
 this.advance()}
 async attack(uid){let p=this.turn,a=this.obj(uid),opp=1-p;if(!a||a.owner!==p||!this.canAttack(a))return;this.pendingAttackerPower=this.power(a);let possible=[-1,...this.chars(opp).filter(x=>!x.ready||this.layers(a).some(id=>this.card(id).keywords.includes('Sucker Punch')))],target=await this.pick('Attack which target?',p,possible);this.pendingAttackerPower=null;if(target==null)return;
 let askRisk=this.has(a,'P002')&&await this.choose(p,'Daredevil: take 1 damage for +2 Power?',[{label:'Yes',value:true},{label:'No',value:false}]);a.ready=false;a.attacked=true;this.players[p].attacked=true;this.pendingAttack={attacker:uid,target,power:this.power(a)};this.say(`${this.card(a).name} attacks ${target===-1?this.name(opp):this.card(this.obj(target)).name}`);
 let bonus=0;if(askRisk){await this.damage(a,1);bonus+=2}if(this.has(a,'P005')&&this.players[p].deck.length){let id=this.players[p].deck.pop();this.players[p].deck.unshift(id);if(this.card(id).cost>=3)bonus+=3}if(this.has(a,'P105')&&a.cargo.length){let n=a.cargo.length,v=await this.choose(p,`Vacuum: unload ${n} cargo for ${n} Leader damage?`,[{label:'Unload cargo',value:true},{label:'Keep the Power',value:false}]);if(v){this.players[p].discard.push(...a.cargo);a.cargo=[];this.hurtLeader(opp,n);this.say(`VACUUM UNLEASHED: ${n} direct damage`)}}if(this.has(a,'P011')){let n=this.chars(p).filter(x=>x.damage>0).length;this.hurtLeader(opp,n);this.say(`FIREWORKS FINALE: ${n} direct damage`)}if(a.lower&&this.has(a,'P037'))bonus+=2;if(this.has(a,'P100')&&target!==-1&&this.obj(target)?.ready)bonus++;if(this.has(a,'P001')&&target!==-1&&this.guard(this.obj(target))>=3)bonus+=2;
 if(this.has(a,'P075')){let r=await this.choose(opp,'Pirate Radio: choose one',[{label:'Pirate gets +2 Power',value:1},{label:'Attacker Draws and Discards',value:2}]);await this.opponentChoice(p);if(r===1)bonus+=2;else await this.rummage(p)}
 if(target===-1){for(let bush of this.players[opp].board.filter(x=>x.id==='P089'&&x.hidden)){let v=await this.choose(opp,'Reveal Character from Inconspicuous Bush?',[{label:'Reveal to defend',value:true},{label:'Leave hidden',value:false}]);if(v){let id=bush.hidden;bush.hidden=null;this.enter(opp,id)}}for(let x of this.chars(opp))if(this.has(x,'P122')&&!x.once){x.once=true;bonus--}}
 let incoming=Math.max(0,this.power(a)+bonus),blockers=[];this.pendingAttack.power=incoming;
 if(target===-1){let ready=this.chars(opp).filter(x=>x.ready&&!x.cloaked&&!x.noBlock);if(ready.length){let chosen=await this.ask({title:`Blockers: ${this.card(a).name} attacks your Leader (choose up to one)`,attackContext:{name:this.card(a).name,power:incoming,guard:this.guard(a),damage:a.damage,text:this.card(a).text},player:opp,multi:true,max:1,options:ready.map(x=>({label:`${this.card(x).name} · ${this.power(x)}/${this.guard(x)-x.damage}`,value:x.uid}))});blockers=(chosen||[]).slice(0,1).map(id=>this.obj(id)).filter(Boolean)}}
 for(let x of blockers){x.ready=false;if(this.has(x,'P121'))bonus--;for(let z of this.chars(opp))if(this.has(z,'P125')&&z.uid!==x.uid)z.power++}
 if(!this.obj(uid)||target!==-1&&!this.obj(target))return this.advance();let incomingDamage=Math.max(0,this.power(a)+bonus);
 if(target===-1){let blocker=blockers[0];if(blocker&&this.obj(blocker.uid)){let absorbed=Math.min(incomingDamage,Math.max(0,this.guard(blocker)-blocker.damage)),retal=this.power(blocker)+await this.leaderPassive(opp,'blocker');this.hurtLeader(opp,incomingDamage-absorbed);await this.combatDamage([[blocker,absorbed],[a,retal]])}else this.hurtLeader(opp,incomingDamage)}else{let x=this.obj(target);await this.combatDamage([[x,incomingDamage],[a,this.power(x)]])}
 this.advance()}
}
