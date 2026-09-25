// Rules-bound opponent. It sees public board data and its own hand, never the player's hidden cards.
export function aiChoice(g,r){let {player:p,options=[],multi=false,max=2,title=''}=r;
 if(!options.length)return multi?[]:null;
 if(multi){if(title.includes('Blockers')){let incoming=g.pendingAttack?.power??0,hp=g.players[p].hp,attacker=g.obj(g.pendingAttack?.attacker);let choices=options.map(o=>g.obj(o.value)).filter(Boolean);let best=choices.sort((a,b)=>(g.guard(b)-b.damage)-(g.guard(a)-a.damage))[0];if(!best)return [];let absorb=Math.min(incoming,Math.max(0,g.guard(best)-best.damage));let kills=attacker&&g.power(best)+(g.name(p)==='HOA President'&&!g.players[p].passive?1:0)>=g.guard(attacker)-attacker.damage;return hp<=incoming||hp<=12&&kills&&absorb>=2||hp<=7&&absorb>=3?[best.uid]:[]}return options.slice(0,max).map(o=>o.value)}
 if(title.includes('Guard Discard'))return 0;
 if(title.includes('Attack which')){let win=options.find(o=>o.value===-1),kill=options.find(o=>o.value!==-1&&g.obj(o.value)&&g.guard(g.obj(o.value))-g.obj(o.value).damage<=(g.pendingAttackerPower??0));return g.players[1-p].hp>6&&kill?kill.value:win?.value??options[0].value}
 if(title.includes('Pick a Card: guess'))return Math.random()<.5;
 if(title.includes('Dismiss Occupied Stroller'))return true;
 if(title.includes('Rotate Character'))return true;
 if(title.includes('Daredevil: take 1'))return g.chars(p).some(x=>g.guard(x)-x.damage>1);
 if(title.includes('Vape Kid'))return g.players[p].hp>4;
 if(title.includes('Cloak'))return options[0].value;
 if(title.includes('Stack onto'))return options.find(o=>o.value!==0)?.value??0;
 if(title.toLowerCase().includes('discard')&&title.includes('Choose a card')){let hand=g.players[p].hand;return options.map(o=>({o,c:g.card(hand[o.value])})).sort((a,b)=>b.c.cost-a.c.cost)[0].o.value}
 if(title.includes('Skip')||title.includes('Play')||title.includes('Return')||title.includes('Reveal'))return options.find(o=>o.value!==null)?.value??null;
 return options[0].value}
export function aiAction(g,p){let s=g.players[p],own=g.chars(p),opp=g.chars(1-p),name=g.name(p);
 let legal=s.hand.map((id,index)=>({c:g.card(id),index})).filter(o=>g.canPlay(o.index,p));
 let sneaky=legal.find(o=>o.c.keywords.includes('Sneaky')&&!s.sneakyUsed);if(sneaky)return {type:'play',index:sneaky.index};
 let leaderUltimate=s.ready&&s.charge===3&&(name!=='Backyard Wrestler'||own.length)&&(name!=='HOA President'||opp.some(x=>!x.ready));if(leaderUltimate)return {type:'ultimate'};
 let attackers=own.filter(x=>g.canAttack(x)).sort((a,b)=>g.power(b)-g.power(a));let bodies=legal.filter(o=>o.c.type==='Character');
 if(name==='Florida Man'&&s.ready&&!s.passive&&own.some(x=>x.ready&&g.guard(x)-x.damage>1)&&s.charge<3)return {type:'leader'};
 if(name==='Washed-Up Rock Star'&&s.ready&&s.fuel===0&&s.hand.length<5&&s.deck.length)return {type:'leader'};
 if(attackers.length&&(s.fuel===0||own.length>=3||!bodies.length||g.round>=6))return {type:'attack',uid:attackers[0].uid};
 if(bodies.length&&own.length<8){bodies.sort((a,b)=>b.c.cost-a.c.cost||b.c.power-a.c.power);return {type:'play',index:bodies[0].index}}
 if(attackers.length)return {type:'attack',uid:attackers[0].uid};
 let actions=legal.filter(o=>o.c.type==='Action');if(actions.length)return {type:'play',index:actions[0].index};
 let items=legal.filter(o=>o.c.type==='Item');if(items.length)return {type:'play',index:items[0].index};
 let act=s.board.find(x=>g.canUse(x)&&x.id!=='P029'&&(!['P124','P132','P117','P179','P120'].includes(x.id)||own.some(y=>y.damage))&&(!['P138','P147'].includes(x.id)||opp.length));if(act)return {type:'activate',uid:act.uid};
 if(name==='HOA President'&&s.ready&&own.some(x=>x.damage))return {type:'leader'};
 if(name==='Trash Baron'&&s.ready&&s.board.some(x=>g.card(x).type==='Item')&&s.discard.some(id=>g.card(id).type==='Item'&&g.card(id).cost<=2))return {type:'leader'};
 if(name==='Backyard Wrestler'&&s.ready&&own.length&&opp.length)return {type:'leader'};
 return {type:'pass'}}
