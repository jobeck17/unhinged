// Small smoke-test opponent: own hand and public board only. Not balance evidence.
const value=(g,x)=>g.power(x)+g.remaining(x)+g.card(x).cost+(g.card(x).entryDraw?4:0);
export function chooseMove(g) {
 if(g.phase==='mulligan')return {type:'mulligan',indices:[]};
 let best, rating=-Infinity;
 for(const m of g.legalMoves()){
  const p=g.actor,s=g.players[p],c=m.index===undefined?null:g.card(s.hand[m.index]),x=g.obj(m.target);
  let v=0;
  if(m.type==='stash')v=s.stash.length<6&&s.hand.length>1?20-c.cost:-10;
  if(m.type==='play'){
   v=c.type==='Character'?4+c.power+c.guard+(c.entryDraw?4:0):c.type==='Item'?1:-1;
   if(c.effect==='stack')v=g.chars(p).length>=4?6:0;
   if(c.effect==='damage')v=(x.owner===p?-1:1)*(g.remaining(x)<=c.amount?value(g,x):c.amount);
   if(c.effect==='bounce')v=value(g,x)*.7;
   if(c.effect==='sweep')v=g.chars(1-p).reduce((n,x)=>n+(g.remaining(x)<=3?value(g,x):2),0)-g.chars(p).reduce((n,x)=>n+(g.remaining(x)<=3?value(g,x):2),0);
   if(c.effect==='shield')v=-1;
  }
  if(m.type==='attack'){
   const a=g.obj(m.uid);v=g.power(a);
   if(m.target===-1&&g.players[1-p].hp<=g.power(a))v=1000;
   if(m.target!==-1)v=(g.power(a)>=g.remaining(x)+x.shield?value(g,x):g.power(a)*.5)-(g.power(x)>=g.remaining(a)+a.shield?value(g,a):g.power(x)*.5);
   if(g.card(a).readyAura)v-=g.chars(p).filter(x=>x.ready&&x.uid!==a.uid).length;
  }
  if(m.type==='respond'){
   const a=g.obj(g.pending.attacker),d=g.obj(g.pending.defender);
   if(c.effect==='damage')v=x.owner!==p&&g.remaining(x)<=c.amount?value(g,x)+3:-1;
   if(c.effect==='shield'){const incoming=x.uid===a?.uid?(d?g.power(d):0):(a?g.power(a):0);v=incoming>=g.remaining(x)&&incoming<g.remaining(x)+c.amount?value(g,x):-1;}
  }
  if(m.type==='discard')v=-c.cost;
  if(m.type==='choose')v=1;
  if(v>rating){rating=v;best=m;}
 }
 return best;
}
