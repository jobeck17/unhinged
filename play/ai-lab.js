// Rules-bound opponent. It sees public board data and its own hand, never the player's hidden cards.
export function aiChoice(g,r){let {player:p,options=[],multi=false,max=2,title=''}=r;
 if(!options.length)return multi?[]:null;
 if(title.startsWith('Vacuum: unload')){let n=Number(title.match(/unload (\d+)/)?.[1]||0);return n>=3||g.players[1-p].hp<=n}
 if(title.includes('Stack onto'))return 0;
 if(title.includes('Roadie: free'))return options.filter(o=>o.value!==null).sort((a,b)=>g.card(g.players[p].hand[b.value]).cost-g.card(g.players[p].hand[a.value]).cost)[0]?.value??null;
 if(title.startsWith('Escape Artist:'))return options.filter(o=>o.value!==null&&g.obj(o.value)).sort((a,b)=>{let x=g.obj(a.value),y=g.obj(b.value);return (g.card(x).cost-x.damage)-(g.card(y).cost-y.damage)})[0]?.value??null;
 if(title==='Choose a Character'||title.includes('Choose Ready Character')){let own=options.filter(o=>g.obj(o.value)?.owner===p);if(own.length)return own.sort((a,b)=>{let x=g.obj(a.value),y=g.obj(b.value);return ((y.ready?10:0)+g.guard(y)-y.damage+g.power(y))-((x.ready?10:0)+g.guard(x)-x.damage+g.power(x))})[0].value}

 if(multi){if(title.includes('Blockers')){let incoming=g.pendingAttack?.power??0,hp=g.players[p].hp,attacker=g.obj(g.pendingAttack?.attacker);let choices=options.map(o=>g.obj(o.value)).filter(Boolean);let best=choices.sort((a,b)=>(g.guard(b)-b.damage)-(g.guard(a)-a.damage))[0];if(!best)return [];let absorb=Math.min(incoming,Math.max(0,g.guard(best)-best.damage));let kills=attacker&&g.power(best)>=g.guard(attacker)-attacker.damage;return hp<=incoming||hp<=12&&kills&&absorb>=2||hp<=7&&absorb>=3?[best.uid]:[]}return options.slice(0,max).map(o=>o.value)}
 if(title.includes('Guard Discard'))return 0;
 if(title.includes('Attack which')){let win=options.find(o=>o.value===-1),kill=options.find(o=>o.value!==-1&&g.obj(o.value)&&g.guard(g.obj(o.value))-g.obj(o.value).damage<=(g.pendingAttackerPower??0));return g.players[1-p].hp>6&&kill?kill.value:win?.value??options[0].value}
 if(title.includes('Pick a Card: choose'))return options[Math.floor(Math.random()*options.length)]?.value??null;
 if(title.includes('Dismiss Occupied Stroller'))return true;
 if(title.includes('Rotate Character'))return true;
 if(title.includes('Daredevil: take 1'))return g.chars(p).some(x=>g.guard(x)-x.damage>1);
 if(title.includes('Vape Kid'))return g.players[p].hp>4;
 if(title.includes('Cloak'))return options[0].value;
 if(title.includes('Stack onto'))return options.find(o=>o.value!==0)?.value??0;
 if(title.toLowerCase().includes('discard')&&title.includes('Choose a card')){let hand=g.players[p].hand;return options.map(o=>({o,c:g.card(hand[o.value])})).sort((a,b)=>b.c.cost-a.c.cost)[0].o.value}
 if(title.includes('Skip')||title.includes('Play')||title.includes('Return')||title.includes('Reveal'))return options.find(o=>o.value!==null)?.value??null;
 return options[0].value}
export function aiAction(g,p){let s=g.players[p],own=g.chars(p),opp=g.chars(1-p);
 let legal=s.hand.map((id,index)=>({c:g.card(id),index})).filter(o=>g.canPlay(o.index,p));
 let attackers=own.filter(x=>g.canAttack(x)).sort((a,b)=>g.power(b)-g.power(a));
 const play=o=>({type:'play',index:o.index});
 // Establish an engine before spending its trigger cards.
 let engine=legal.find(o=>['P011','P048','P078','P105'].includes(o.c.id)&&(!['P011'].includes(o.c.id)||own.length>=2));if(engine)return play(engine);
 // Spend buffs and attachments while there is still an attack to improve.
 let setup=legal.find(o=>['P019','P027','P178'].includes(o.c.id)&&attackers.some(x=>g.guard(x)-x.damage>2));if(setup)return play(setup);
 let chair=s.board.find(x=>x.id==='P178'&&g.canUse(x)&&g.obj(x.attached)?.ready);if(chair&&attackers.some(x=>x.uid===chair.attached))return {type:'activate',uid:chair.uid};
 // Item and Action engines should fire before combat, not afterward.
 let trigger=legal.find(o=>o.c.type==='Item'&&own.some(x=>g.has(x,'P105'))||o.c.id==='P079'&&own.some(x=>g.has(x,'P078'))||o.c.type==='Action'&&['P049','P050','P052','P053','P022'].includes(o.c.id));if(trigger)return play(trigger);
 let discount=legal.find(o=>o.c.id==='P055'&&legal.some(v=>v.c.type==='Character'&&s.fuel>=o.c.cost+Math.max(0,v.c.cost-2)));if(discount)return play(discount);
 let bodies=legal.filter(o=>o.c.type==='Character');if(bodies.length&&own.length<8){bodies.sort((a,b)=>b.c.cost-a.c.cost);return play(bodies[0])}
 let removal=legal.find(o=>['P139','P141','P081'].includes(o.c.id));if(removal)return play(removal);
 if(attackers.length)return {type:'attack',uid:attackers[0].uid};
 let readyAgain=legal.find(o=>o.c.id==='P025'&&own.some(x=>!x.ready&&g.guard(x)-x.damage>2));if(readyAgain)return play(readyAgain);
 let pills=s.board.find(x=>x.id==='P027'&&g.canUse(x)&&!g.obj(x.attached)?.ready&&g.guard(g.obj(x.attached))-g.obj(x.attached).damage>1);if(pills)return {type:'activate',uid:pills.uid};
 let rest=legal.find(o=>!['P019','P025','P055','P081','P170'].includes(o.c.id));if(rest)return play(rest);
 let act=s.board.find(x=>g.canUse(x)&&!['P027','P029','P178'].includes(x.id)&&(!['P124','P132','P117','P179','P120'].includes(x.id)||own.some(y=>y.damage))&&(!['P138','P147'].includes(x.id)||opp.length));if(act)return {type:'activate',uid:act.uid};
 return {type:'pass'}}
