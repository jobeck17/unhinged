// A deliberately transparent opponent: no access to the human hand or deck order.
export function aiChoice(game,request){let {title,options=[],multi=false,max}=request,p=request.player;
 if(!options.length)return multi?[]:null;
 if(multi){if(title.includes('Blockers')){let incoming=game.pendingAttack?.power||3;let candidates=options.map(o=>({o,x:game.obj(o.value)})).filter(z=>z.x).sort((a,b)=>(game.guard(a.x)-a.x.damage)-(game.guard(b.x)-b.x.damage));let chosen=[],absorbed=0;for(let z of candidates){if(absorbed>=incoming)break;if(game.players[p].hp>incoming+3&&game.power(z.x)>incoming+3)continue;chosen.push(z.o.value);absorbed+=Math.max(1,game.guard(z.x)-z.x.damage);if(chosen.length>=2)break}return chosen}
 return options.slice(0,max||2).map(x=>x.value)}
 if(title.includes('Guard Discard'))return 0;
 if(title.includes('discard'))return options.map(o=>({o,card:game.cards[game.players[p].hand[o.value]]})).sort((a,b)=>a.card.cost-b.card.cost)[0].o.value;
 if(title.includes('Who takes 2 damage'))return -1;
 if(title.includes('Attack which')){let leader=options.find(x=>x.value===-1);let rot=options.filter(x=>x.value!==-1).map(o=>({o,x:game.obj(o.value)})).filter(z=>z.x&&game.power(z.x)>=game.guard(z.x)-z.x.damage&&game.power(z.x)<=game.pendingAttackerPower+1);return rot.length&&game.players[1-p].hp>8?rot[0].o.value:leader.value}
 if(title.includes('Choose ultimate target'))return options.find(x=>x.value===-1)?.value??options[0].value;
 if(title.includes('take 1 damage'))return game.pendingAttackerGuard>1;
 if(title.includes('Play a different'))return options.find(o=>o.value!==null)?.value??null;
 if(title.includes('Grant bonus Guard'))return options.find(x=>x.value!==null)?.value??null;
 if(title.includes('Heal')||title.includes('heal')){let ranked=options.map(o=>({o,x:game.obj(o.value)}));return ranked.sort((a,b)=>(b.x?.damage||0)-(a.x?.damage||0))[0].o.value}
 if(title.includes('Choose whom to heal'))return options.find(o=>o.value===-1)?.value??options[0].value;
 if(title.includes('Choose your Ready Character to damage'))return options.map(o=>({o,x:game.obj(o.value)})).sort((a,b)=>game.guard(b.x)-b.x.damage-(game.guard(a.x)-a.x.damage))[0].o.value;
 if(title.includes('Choose opposing Character'))return options.map(o=>({o,x:game.obj(o.value)})).sort((a,b)=>game.power(b.x)-game.power(a.x))[0].o.value;
 return options[0].value}
export function aiAction(game,p){let s=game.players[p],own=game.chars(p),opp=game.chars(1-p);
 if(s.ready&&s.charge===3&&(p===0||opp.some(x=>!x.ready)))return {type:'ultimate'};
 // Spend early Fuel on bodies; late-game attacks take priority over filler plays.
 let playable=s.hand.map((id,index)=>({c:game.cards[id],index})).filter(z=>z.c.cost<=s.fuel);
 let bodies=playable.filter(z=>z.c.type==='Character'&&(z.c.id!=='P010'||own.length));
 let attackers=own.filter(x=>game.canAttack(x));
 let goodAttack=attackers.filter(x=>game.power(x)>=2).sort((a,b)=>game.power(b)-game.power(a));
 if(p===0&&s.ready&&!s.passive&&s.charge<3&&own.length>=2&&own.some(x=>x.ready&&game.guard(x)-x.damage>=2))return {type:'leader'};
 if(p===1&&s.ready&&s.charge<3){let activator=s.board.find(x=>game.canActivate(x)&&['P147','P138','P124','P132','P117','P179','P120'].includes(x.id)&&(['P147','P138'].includes(x.id)?opp.length:['P117','P179'].includes(x.id)?game.obj(x.attached)?.damage:own.some(y=>y.damage)));if(activator)return {type:'activate',uid:activator.uid}}
 if(s.ready&&s.charge===3&&p===1&&opp.some(x=>!x.ready))return {type:'ultimate'};
 if(goodAttack.length&&(s.fuel===0||own.length>=3||!bodies.length||game.round>=6))return {type:'attack',uid:goodAttack[0].uid};
 if(bodies.length&&own.length<9){bodies.sort((a,b)=>Math.min(b.c.cost,s.fuel)-Math.min(a.c.cost,s.fuel)||b.c.guard-a.c.guard);return {type:'play',index:bodies[0].index}}
 if(goodAttack.length)return {type:'attack',uid:goodAttack[0].uid};
 let items=playable.filter(z=>z.c.type==='Item'&&(!['P027','P178','P179','P117'].includes(z.c.id)||own.length));if(items.length&&s.fuel>0)return {type:'play',index:items[0].index};
 if(s.ready&&p===0){let x=own.find(y=>y.ready&&game.guard(y)-y.damage>=2);if(x&&s.charge<3)return {type:'leader'}}
 let activator=s.board.find(x=>game.canActivate(x)&&['P147','P138','P124','P132','P117','P179','P120'].includes(x.id)&&(['P147','P138'].includes(x.id)?opp.length:['P117','P179'].includes(x.id)?game.obj(x.attached)?.damage:own.some(y=>y.damage)));if(activator)return {type:'activate',uid:activator.uid};
 let actions=playable.filter(z=>z.c.type==='Action'&&(['P022','P146'].includes(z.c.id)||['P139','P141','P143'].includes(z.c.id)&&opp.length||['P026','P112'].includes(z.c.id)&&[...own,...opp].some(x=>x.damage)||z.c.id==='P019'&&own.length||z.c.id==='P025'&&own.some(x=>!x.ready)||z.c.id==='P172'&&own.some(x=>x.damage)));if(actions.length)return {type:'play',index:actions[0].index};
 return {type:'pass'}}
