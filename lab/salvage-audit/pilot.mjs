import {aiAction,aiChoice} from '../../web/ai.js';
export const itemCount=(g,p)=>g.players[p].board.filter(x=>g.card(x).type==='Item').length;
export const normal=(g,p)=>g.players[p].stash.length-(g.players[p].salTemp||[]).filter(Boolean).length;
export function choice(g,r,policy){
 const p=r.player,s=g.players[p],title=r.title||'',opts=r.options||[],values=opts.map(o=>o.value);
 if(title.startsWith('Pay cost:')&&!title.includes('opposing'))return [...opts].sort((a,b)=>Number(!!s.salTemp?.[b.value])-Number(!!s.salTemp?.[a.value])).slice(0,r.min||r.max).map(o=>o.value);
 if(title==='Salvage destination'){
  const heaps=opts.filter(o=>typeof o.value==='number').map(o=>g.obj(o.value)).filter(Boolean),heap=heaps.find(h=>(h.heapItems||[]).length<3)||heaps[0];
  if(heap&&(policy==='heap-first'||normal(g,p)>=5)&&(heap.heapItems||[]).length<3)return heap.uid;
  if(values.includes('stash'))return 'stash';return heap?.uid??'discard';
 }
 if(title.startsWith('Scurry Away:')){
  // Save the board unless urgent, but retain Cockroach as cheap repeatable protection.
  const name=title.slice('Scurry Away: return '.length).replace('?',''),x=g.chars(p).find(x=>g.card(x).name===name);
  return s.hp<=6||x?.id==='P104';
 }
 if(title==='Zip Ties: weaken attacker?')return true;
 if(title.includes('enter Rotated for Meat Shield?'))return g.chars(p).length>1;
 if(title==='Vacuum: mill top two?')return s.deck.length>6;
 if(title==='Inventor: deploy revealed Item?')return true;
 if(title.startsWith('Scrap Dealer:'))return opts.filter(o=>g.obj(o.value)&&g.canCauseTrouble(g.obj(o.value))).sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value??opts.find(o=>o.value!==null)?.value??null;
 if(title==='Finders Keepers: top or bottom')return 'top';
 if(title==='Finders Keepers: order remaining')return opts[0]?.value;
 if(title==='Treasure: cash up to two')return opts.slice(0,2).map(o=>o.value);
 if(title==='Another Man’s Treasure: target')return opts.filter(o=>g.obj(o.value)&&g.canCauseTrouble(g.obj(o.value))).sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value??opts[0]?.value;
 if(title==='Play Dead: target')return opts.find(o=>g.obj(o.value)?.owner!==p)?.value??opts[0]?.value;
 if(title.includes('Tin Can Slingshot: target'))return opts.find(o=>g.guard(g.obj(o.value))-g.obj(o.value).damage<=2)?.value??opts.sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value;
 if(title.includes('Busted Shopping Cart: target'))return opts.sort((a,b)=>g.trouble(g.obj(b.value))-g.trouble(g.obj(a.value)))[0]?.value;
 if(title.startsWith('Possum:'))return opts.find(o=>o.value!==null)?.value??null;
 return aiChoice(g,r);
}
export function action(g,p){
 const s=g.players[p];if(g.name(p)!=='Trash Baron')return aiAction(g,p);
 if(!s.stashedThisTurn&&s.hand.length&&(normal(g,p)<6||s.hand.length>=3)){
  const ranking=s.hand.map((id,index)=>({id,index,c:g.card(id)})).sort((a,b)=>{
   const score=v=>(v.c.cost>=5?-7:0)+(v.c.type==='Action'?2:0)+(s.hand.filter(id=>id===v.id).length>1?3:0)-(v.c.type==='Item'?5:0)-(v.c.type==='Character'&&v.c.cost===1?6:0);
   return score(b)-score(a);
  });return {type:'stash',index:ranking[0].index};
 }
 const legal=s.hand.map((id,index)=>({id,index,c:g.card(id)})).filter(v=>g.canPlay(v.index,p));
 const play=v=>({type:'play',index:v.index});
 const finish=g.chars(p).filter(x=>g.canCauseTrouble(x)).sort((a,b)=>g.trouble(b)-g.trouble(a))[0];
 if(finish&&(g.players[1-p].lastStraw||g.players[1-p].hp<=g.trouble(finish)))return {type:'trouble',uid:finish.uid};
 const suppliesPresent=itemCount(g,p)>0||s.hand.some(id=>g.card(id).type==='Item');
 const payoff=legal.filter(v=>v.c.type==='Character'&&v.c.cost>=4).sort((a,b)=>b.c.cost-a.c.cost)[0];
 if(payoff)return play(payoff);
 const earlyBody=legal.find(v=>v.c.type==='Character'&&v.c.cost<=2&&g.chars(p).length<2);if(earlyBody)return play(earlyBody);
 const engine=legal.find(v=>v.id==='P093'&&suppliesPresent)||legal.find(v=>v.id==='LAB-SAL-003'&&suppliesPresent&&!g.chars(p).some(x=>x.id==='LAB-SAL-003'));
 if(engine)return play(engine);
 const boost=legal.find(v=>v.id==='P111'&&finish);if(boost)return play(boost);
 const removal= s.board.find(x=>['P119','P112','LAB-SAL-001'].includes(x.id)&&g.canUse(x)&&(x.id!=='LAB-SAL-001'||g.chars(1-p).some(y=>g.trouble(y)>0)));if(removal)return {type:'activate',uid:removal.uid};
 const supplies=legal.find(v=>v.id==='P114')||legal.find(v=>v.id==='P115')||legal.find(v=>v.id==='P109'&&s.hand.length<=4)||legal.find(v=>v.c.type==='Item'&&!s.board.some(x=>x.id===v.id));if(supplies)return play(supplies);
 const usable=s.board.find(x=>g.card(x).type==='Item'&&g.canUse(x)&&(x.id!=='LAB-SAL-001'||g.chars(1-p).some(y=>g.trouble(y)>0)));if(usable)return {type:'activate',uid:usable.uid};
 const refill=legal.find(v=>v.id==='P113'&&(s.hand.length<=3||g.chars(p).some(x=>x.id==='P108'&&g.canCauseTrouble(x))));if(refill)return play(refill);
 const body=legal.filter(v=>v.c.type==='Character'&&(v.id!=='LAB-SAL-003'||itemCount(g,p)||s.hand.some(id=>g.card(id).type==='Item'))).sort((a,b)=>b.c.cost-a.c.cost)[0];if(body)return play(body);
 // A deliberate decision to stop ramping must not make the shared AI return
 // another Stash instruction and thereby skip all existing Characters' actions.
 const stashed=s.stashedThisTurn;s.stashedThisTurn=true;
 try{return aiAction(g,p)}finally{s.stashedThisTurn=stashed;}
}
