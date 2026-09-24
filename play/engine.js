export const LEADERS = [
  {name:'Florida Man', style:'Reckless', passive:'Walk It Off — The first time each round one of your Characters takes damage during your turn and survives, it gets +1 Power this round.', ability:'Watch This — Rotate: Deal 1 damage to one of your Ready Characters. If it survives, it gets +2 Power this round.', charge:'Bad Decisions — When Walk It Off triggers, gain 1 Charge.', ultimate:'Hold My Entire Cooler — Rotate, spend 3 Charge: Choose an opposing Character or Leader. Roll a d6; deal that much damage to the target.'},
  {name:'HOA President', style:'Stonewall', passive:'Neighborhood Watch — The first time each round one of your Characters Blocks, it gets +1 Power for that Attack.', ability:'Property Maintenance — Rotate: Heal up to 2 damage from one of your Characters.', charge:'Document Everything — The first time each round you Activate an ability of one of your Characters or Items, gain 1 Charge.', ultimate:'Violation Notice — Rotate, spend 3 Charge: Choose up to 2 opposing Rotated Characters. Deal 2 damage to each.'}
];
const shuffle = a => {for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
export class Game {
 constructor(pool,decks,ask,update){this.cards=Object.fromEntries(pool.cards.map(c=>[c.id,c]));this.decks=decks.decks;this.ask=ask;this.update=update;this.log=[];this.nextUid=0;this.round=0;this.turn=0;this.passed=null;this.winner=null;this.players=this.decks.map(d=>({deck:shuffle(Object.entries(d.cards).flatMap(([id,n])=>Array(n).fill(id))),hand:[],discard:[],board:[],hp:d.health,ready:true,fuel:0,charge:0,gained:false,passive:false,committee:false,attacked:false}));this.first=this.war();for(let p=0;p<2;p++)this.draw(p,7,false);}
 war(){let a=shuffle([...(this.players[0].deck.length?this.players[0].deck:this.players[0].discard)]),b=shuffle([...(this.players[1].deck.length?this.players[1].deck:this.players[1].discard)]);for(let i=0;i<Math.min(a.length,b.length);i++){let x=this.cards[a[i]].cost,y=this.cards[b[i]].cost;if(x!==y)return x>y?0:1}return Math.floor(Math.random()*2)}
 say(msg){this.log.unshift(`R${this.round} · ${this.decks[this.turn].leader}: ${msg}`);this.log.length=Math.min(this.log.length,100);this.update?.()}
 card(x){return this.cards[typeof x==='string'?x:x.id]}
 chars(p){return this.players[p].board.filter(x=>this.card(x).type==='Character')}
 obj(uid){return this.players.flatMap(p=>p.board).find(x=>x.uid===uid)}
 items(x){return this.players.flatMap(p=>p.board).filter(y=>y.attached===x.uid)}
 power(x){return Math.max(0,this.card(x).power+x.power+this.items(x).filter(i=>i.id==='P027').length)}
 guard(x){return this.card(x).guard+x.guard+this.items(x).filter(i=>['P117','P179'].includes(i.id)).length}
 async mulligan(p,indices){let s=this.players[p],chosen=indices.sort((a,b)=>b-a).map(i=>s.hand.splice(i,1)[0]);this.draw(p,chosen.length,false);s.deck.push(...chosen);shuffle(s.deck);this.say(`${chosen.length} card(s) replaced`)}
 begin(){this.round=1;this.turn=this.first;this.startRound()}
 draw(p,n=1,announce=true){for(let i=0;i<n;i++){let id=this.players[p].deck.pop();if(!id){this.players[p].empty=true;return}this.players[p].hand.push(id)}if(announce)this.say(`${this.decks[p].leader} draws ${n}`)}
 startRound(){for(let p=0;p<2;p++){let s=this.players[p];Object.assign(s,{ready:true,fuel:Math.min(this.round,7),gained:false,passive:false,committee:false,attacked:false});for(let x of s.board){x.ready=true;x.committee=false;x.attacked=false;x.power=0;x.guard=0;x.hot=false}this.draw(p,1,false)}this.say(`Round ${this.round} begins · ${Math.min(this.round,7)} Fuel`);this.checkEnd()}
 checkEnd(){let lose=this.players.map(s=>s.hp<=0||s.empty);if(lose[0]||lose[1]){this.winner=lose[0]&&lose[1]?this.war():lose[0]?1:0;this.say(`${this.decks[this.winner].leader} wins${lose[0]&&lose[1]?' by War':''}`)}return this.winner!==null}
 async pass(){this.say('Pass');if(this.passed!==null){this.first=this.passed;this.passed=null;this.endRound();return}this.passed=this.turn;this.turn=1-this.turn;this.update()}
 endRound(){// Temporary bonuses expire before the next round's Ready step.
 for(let p=0;p<2;p++)for(let x of [...this.chars(p)]){x.power=0;x.guard=0;x.hot=false;this.checkDefeat(x)}this.round++;this.turn=this.first;this.startRound()}
 advance(){this.passed=null;this.pendingAttack=null;this.checkEnd();if(this.winner===null)this.turn=1-this.turn;this.update()}
 enter(p,id,attach=null){let x={uid:++this.nextUid,id,owner:p,ready:true,born:this.round,damage:0,power:0,guard:0,hot:false,attacked:false,committee:false,attached:attach};this.players[p].board.push(x);return x}
 leave(x,hand=false){if(!x||!this.obj(x.uid))return;let s=this.players[x.owner];for(let i of this.items(x)){this.players[i.owner].board=this.players[i.owner].board.filter(y=>y.uid!==i.uid);this.players[i.owner].discard.push(i.id)}s.board=s.board.filter(y=>y.uid!==x.uid);s[hand?'hand':'discard'].push(x.id)}
 checkDefeat(x){if(x&&this.obj(x.uid)&&this.card(x).type==='Character'&&x.damage>=this.guard(x)){this.say(`${this.card(x).name} is Defeated`);this.leave(x);return true}return false}
 gain(p){let s=this.players[p];if(!s.gained){s.gained=true;if(s.charge<3)s.charge++;this.say(`${this.decks[p].leader} gains Charge (${s.charge}/3)`)}}
 damage(x,n,pending=false){if(!x||n<=0||!this.obj(x.uid))return;x.damage+=n;this.say(`${this.card(x).name} takes ${n} damage`);if(this.checkDefeat(x))return;if(x.owner===this.turn&&this.turn===0&&!this.players[0].passive){this.players[0].passive=true;if(pending)pending.push(x.uid);else{x.power++;this.gain(0);this.say('Walk It Off: +1 Power')}}}
 heal(x,n){if(x){let old=x.damage;x.damage=Math.max(0,old-n);this.say(`${this.card(x).name} heals ${old-x.damage}`)}}
 discard(p,n=1){for(let i=0;i<n;i++){let s=this.players[p];if(!s.hand.length)return;let k=s.hand.length===1?0:null; // chosen privately when there is a choice
 if(k===null)throw Error('Use chooseDiscard for a hand choice');s.discard.push(s.hand.splice(k,1)[0])}}
 async chooseDiscard(p){let hand=this.players[p].hand;if(!hand.length)return;let k=hand.length===1?0:await this.ask({title:'Choose a card to discard',player:p,mandatory:true,options:hand.map((id,i)=>({label:this.card(id).name,value:i}))});let id=hand.splice(k,1)[0];this.players[p].discard.push(id);this.say(`${this.decks[p].leader} discards a card`)}
 async pick(title,p,targets,optional=false){let choices=targets.map(x=>({label:x===-1?`${this.decks[title.includes('Attack which')||title.includes('ultimate target')?1-p:p].leader} (Leader)`:this.card(x).name,value:x===-1?-1:x.uid}));if(optional)choices.push({label:'Skip',value:null});return this.ask({title,player:p,options:choices})}
 canAttack(x){return x.ready&&(x.born<this.round||x.hot||x.id==='P016')}
 canActivate(x){if(!x.ready)return false;if(this.card(x).type==='Character'&&x.born===this.round)return false;return true}
 async play(index){let p=this.turn,s=this.players[p],id=s.hand[index],c=this.cards[id];if(!c||c.cost>s.fuel)return;let own=this.chars(p),opp=this.chars(1-p),target=null,extra=null;
 if(['P027','P178','P179','P117'].includes(id)){if(!own.length)return;target=await this.pick('Attach to which Character?',p,own)}
 else if(id==='P010'){target=await this.pick('Who takes 2 damage?',p,[-1,...own])}
 else if(['P019','P025'].includes(id)){let choices=id==='P025'?own.filter(x=>!x.ready):own;if(!choices.length)return;target=await this.pick('Choose your Character',p,choices)}
 else if(['P026','P112','P143'].includes(id)){let choices=id==='P143'?[...own,...opp]:[...own,...opp];if(!choices.length)return;target=await this.pick('Choose a Character',p,choices)}
 else if(['P139','P141'].includes(id)){if(!opp.length)return;target=await this.pick('Choose an opposing Character',p,opp)}
 else if(id==='P172'){let hurt=own.filter(x=>x.damage);if(!hurt.length)return;target=await this.pick('Return which damaged Character?',p,hurt)}
 else if(id==='P146'&&!s.attacked&&own.length){target=await this.pick('Grant bonus Guard?',p,own,true)}
 if(target===undefined||target===null&&['P027','P178','P179','P117','P010','P019','P025','P026','P112','P143','P139','P141','P172'].includes(id))return;
 if(id==='P026')extra=await this.ask({title:'After healing, deal 1 damage to Draw?',player:p,options:[{label:'Yes',value:true},{label:'No',value:false}]});
 if(id==='P172'){let old=this.obj(target),eligible=s.hand.filter((k,i)=>i!==index&&this.cards[k].type==='Character'&&this.cards[k].cost<=this.card(old).cost);extra=eligible.length?await this.ask({title:'Play a different Character for free?',player:p,options:[...eligible.map((k,i)=>({label:this.card(k).name,value:k})),{label:'No',value:null}]}):null}
 s.fuel-=c.cost;s.hand.splice(index,1);this.say(`Plays ${c.name} (Cost ${c.cost})`);let x=this.obj(target);
 if(c.type==='Character'){this.enter(p,id);if(id==='P010')target===-1?(s.hp-=2,this.say('Own Leader takes 2 damage')):this.damage(x,2)}
 else if(c.type==='Item')this.enter(p,id,target);
 else {if(id==='P019'){this.damage(x,1);if(this.obj(target))x.power+=this.card(x).traits.includes('Daredevil')?3:2}
 else if(id==='P022'){this.draw(p,2);s.hp--}
 else if(id==='P025'){x.ready=true;this.damage(x,2);if(this.obj(target))x.hot=true}
 else if(id==='P026'){this.heal(x,2);if(extra){this.damage(x,1);this.draw(p)}}
 else if(id==='P172'){let wrestler=this.card(x).traits.includes('Wrestler');this.leave(x,true);if(extra){let k=s.hand.indexOf(extra);if(k>=0){s.hand.splice(k,1);let y=this.enter(p,extra);y.hot=wrestler;this.say(`Plays ${this.card(y).name} for free`);if(extra==='P010'){let t=await this.pick('Who takes 2 damage?',p,[-1,...this.chars(p).filter(z=>z.uid!==y.uid)]);if(t===-1)s.hp-=2;else if(t!=null)this.damage(this.obj(t),2)}}}}
 else if(['P139','P141','P143'].includes(id)){x.power-=id==='P139'?2:id==='P141'?3:1;if(id==='P143'){x.guard--;this.checkDefeat(x)}}
 else if(id==='P146'){this.draw(p);if(target!=null){let y=this.obj(target);if(y)y.guard+=this.card(y).traits.includes('HOA')?3:2}}
 else if(id==='P112')this.heal(x,this.card(x).traits.includes('Scavenger')?3:2);
 s.discard.push(id)}
 this.advance()}
 async activate(uid){let x=this.obj(uid),p=this.turn;if(!x||x.owner!==p||!this.canActivate(x))return;let id=x.id,own=this.chars(p),opp=this.chars(1-p),target=null;
 if(['P003','P165'].includes(id)){let a=own.filter(y=>y.uid!==uid);if(!a.length)return;target=await this.pick('Choose another of your Characters',p,a)}
 else if(['P124','P132'].includes(id)){let a=own.filter(y=>y.damage);if(id==='P132'&&this.players[p].hp<25)a.push(-1);if(!a.length)return;target=await this.pick('Choose whom to heal',p,a)}
 else if(['P138','P147'].includes(id)){if(!opp.length)return;target=await this.pick('Choose opposing Character',p,opp)}
 else if(['P117','P179'].includes(id)){let y=this.obj(x.attached);if(!y||!y.damage)return;target=y.uid}
 else if(id==='P120'){let a=own.filter(y=>y.damage);if(!a.length)return;target=await this.pick('Choose whom to heal',p,a)}
 else if(['P027','P178'].includes(id)){if(!this.obj(x.attached))return;target=x.attached}
 else return;if(target===null||target===undefined)return;
 let y=this.obj(target);this.say(`Activates ${this.card(x).name}`);if(['P027','P178','P120'].includes(id))this.leave(x);else x.ready=false;
 if(id==='P003'){this.damage(y,1);if(this.obj(target))y.power+=2}
 else if(id==='P165')y.power+=this.card(y).traits.some(t=>['Wrestler','Daredevil'].includes(t))?3:2;
 else if(['P124','P132'].includes(id)){if(target===-1)this.players[p].hp=Math.min(25,this.players[p].hp+2);else this.heal(y,2)}
 else if(id==='P138')y.power-=this.power(y)>this.power(x)?3:2;
 else if(id==='P147')y.power--;
 else if(id==='P027'){y.ready=true;this.damage(y,1)}
 else if(id==='P178')y.power+=this.card(y).traits.includes('Wrestler')?3:2;
 else if(['P117','P179'].includes(id))this.heal(y,id==='P117'&&this.card(y).traits.includes('Construct')?2:1);
 else if(id==='P120'){this.heal(y,2);if(this.card(y).traits.includes('Scavenger')){this.draw(p);await this.chooseDiscard(p)}}
 if(p===1)this.gain(1);this.advance()}
 async leader(ultimate=false){let p=this.turn,s=this.players[p];if(!s.ready)return;let target=null;
 if(ultimate){if(s.charge<3)return;if(p===0)target=await this.pick('Choose ultimate target',p,[-1,...this.chars(1)]);else {let a=this.chars(0).filter(x=>!x.ready);if(!a.length)return;let t=await this.ask({title:'Choose up to two Rotated opposing Characters',player:p,multi:true,max:2,options:a.map(x=>({label:this.card(x).name,value:x.uid}))});target=t;if(!t?.length)return}}
 else{let a=p===0?this.chars(p).filter(x=>x.ready):this.chars(p).filter(x=>x.damage);if(!a.length)return;target=await this.pick(p===0?'Choose your Ready Character to damage':'Choose your Character to heal',p,a)}
 if(target===null||target===undefined)return;s.ready=false;
 if(ultimate){s.charge=0;if(p===0){let die=1+Math.floor(Math.random()*6);this.say(`Hold My Entire Cooler rolls ${die}`);if(target===-1)this.players[1].hp-=die;else this.damage(this.obj(target),die)}else{this.say('Violation Notice');for(let uid of target)this.damage(this.obj(uid),2)}}
 else if(p===0){let x=this.obj(target);this.damage(x,1);if(this.obj(target))x.power+=2;this.say('Watch This')}else{this.heal(this.obj(target),2);this.say('Property Maintenance')}
 this.advance()}
 async attack(uid){let p=this.turn,a=this.obj(uid),opp=1-p;if(!a||a.owner!==p||!this.canAttack(a))return;let targets=[-1,...this.chars(opp).filter(x=>!x.ready)],target=await this.pick('Attack which target?',p,targets);if(target==null)return;
 let risk=false;if(a.id==='P002')risk=await this.ask({title:'Gas Station Daredevil: take 1 damage for +2 Power?',player:p,options:[{label:'Yes',value:true},{label:'No',value:false}]});
 a.ready=false;a.attacked=true;this.players[p].attacked=true;this.pendingAttack={attacker:uid,target,power:this.power(a)};this.pendingAttackerPower=this.power(a);this.pendingAttackerGuard=this.guard(a)-a.damage;this.say(`${this.card(a).name} attacks ${target===-1?this.decks[opp].leader:this.card(this.obj(target)).name}`);let bonus=0,pending=[];
 if(a.id==='P002'&&risk){this.damage(a,1);bonus+=2}
 if(a.id==='P005'&&this.players[p].deck.length){let id=this.players[p].deck.pop();this.players[p].deck.unshift(id);this.say(`Toddler reveals ${this.card(id).name}`);if(this.card(id).cost>=3)bonus+=3}
 if(!this.obj(uid))return this.advance();
 if(target!==-1&&a.id==='P001'&&this.guard(this.obj(target))>=3)bonus+=2;
 if(target===-1){for(let x of this.chars(opp))if(x.id==='P122'&&!x.committee){x.committee=true;bonus--}}
 this.pendingAttack.power=Math.max(0,this.power(a)+bonus);
 let blockers=[];if(target===-1&&this.players[opp].ready){let ready=this.chars(opp).filter(x=>x.ready);if(ready.length){let chosen=await this.ask({title:`Blockers: ${this.card(a).name} attacks your Leader`,attackContext:{name:this.card(a).name,power:this.pendingAttack.power,guard:this.guard(a),damage:a.damage,text:this.card(a).text},player:opp,multi:true,options:ready.map(x=>({label:`${this.card(x).name} · ${this.power(x)}/${this.guard(x)-x.damage}`,value:x.uid}))});blockers=(chosen||[]).map(id=>this.obj(id)).filter(Boolean)}}
 for(let x of blockers)x.ready=false;
 let watch=null;if(blockers.length&&opp===1&&!this.players[1].passive){this.players[1].passive=true;watch=await this.pick('Neighborhood Watch: choose one Blocker for +1 Power',opp,blockers)}
 for(let x of blockers){if(x.id==='P121')bonus--;for(let y of this.chars(opp))if(y.id==='P125'&&y.uid!==x.uid)y.power++}
 let temps={};for(let x of blockers)temps[x.uid]=0;
 if(blockers.length&&this.players[opp].hand.length){let n=await this.ask({title:'Guard Discard: spend cards from hand?',player:opp,mandatory:true,options:Array.from({length:this.players[opp].hand.length+1},(_,k)=>({label:`${k} card${k===1?'':'s'} (+${k} temporary Guard)`,value:k}))});for(let i=0;i<n;i++){let chosen=await this.ask({title:'Assign +1 temporary Guard to which Blocker?',player:opp,mandatory:true,options:blockers.map(x=>({label:this.card(x).name,value:x.uid}))});await this.chooseDiscard(opp);temps[chosen]++}}
 if(!this.obj(uid)||(target!==-1&&!this.obj(target)))return this.advance();let remaining=Math.max(0,this.power(a)+bonus);let retal=0;
 if(target===-1){for(let x of blockers){if(!this.obj(x.uid))continue;let absorb=Math.min(remaining,temps[x.uid]);remaining-=absorb;let hit=Math.min(remaining,Math.max(0,this.guard(x)-x.damage));remaining-=hit;let retaliation=this.power(x)+(x.uid===watch?1:0);this.damage(x,hit,pending);if(this.obj(x.uid)||x.id==='P005'&&!this.obj(x.uid))retal+=retaliation}if(remaining){this.players[opp].hp-=remaining;this.say(`${this.decks[opp].leader} takes ${remaining} damage`)}}
 else{let x=this.obj(target);this.damage(x,remaining,pending);if(this.obj(target))retal=this.power(x)}
 this.damage(a,retal,pending);for(let id of pending){let x=this.obj(id);if(x)x.power++;this.gain(0)}this.pendingAttack=null;this.advance()}
}
