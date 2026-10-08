// Mordecai 0.4 production implementation of Landon's STANK INDUSTRIES-66 Magician package.
import {Game} from './engine.js?v=mordecai-04-stonewall-01';

const RABBIT='P063', HAT='LAB-MAG-005', DOVE='LAB-MAG-006', DRAMA='LAB-MAG-002', BOY='LAB-MAG-003', LADY='LAB-MAG-004', HAT_ACTION='LAB-MAG-007';
const VOLUNTEERS=new Set(['LAB-MAG-001A','LAB-MAG-001B']);
const isVolunteer=x=>!!x&&VOLUNTEERS.has(x.id);
const isHatAnimal=(g,x)=>!!x&&(g.has(x,RABBIT)||g.has(x,DOVE));

const basePower=Game.prototype.power;
Game.prototype.power=function(x){return basePower.call(this,x)+(x?.volunteerAttack||0)};

const baseGuard=Game.prototype.guard;
Game.prototype.guard=function(x){return Math.max(0,baseGuard.call(this,x)-(x?.doveHealthLoss||0))};

async function volunteerBuff(g,p,excludeUid=null,reason='trick'){
 const choices=g.chars(p).filter(x=>x.uid!==excludeUid);
 if(!choices.length)return;
 const uid=await g.pick(`Very Enthusiastic Volunteer ${reason}: choose another Character to get +1 permanent Power`,p,choices);
 const target=uid==null?null:g.obj(uid);
 if(!target)return;
 target.volunteerAttack=(target.volunteerAttack||0)+1;
 g.say(`Very Enthusiastic Volunteer gives ${g.card(target).name} +1 permanent Power`);
}

async function doveTrick(g,p,reason){
 const choices=g.chars(1-p);
 if(!choices.length)return;
 const uid=await g.pick(`Dove ${reason}: choose an opposing Character to get -1 permanent Health`,p,choices,true);
 const target=uid==null?null:g.obj(uid);
 if(!target)return;
 target.doveHealthLoss=(target.doveHealthLoss||0)+1;
 g.say(`Dove gives ${g.card(target).name} -1 permanent Health`);
 await g.checkDefeat(target);
}

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
 const result=await baseEnterEffect.call(this,x,previous);
 if(!x||!this.obj(x.uid))return result;
 if(x.id===RABBIT){this.draw(x.owner);this.say('Rabbit enters play and Draws a card')}
 if(isVolunteer(x))await volunteerBuff(this,x.owner,x.uid,'enters play');
 if(x.id===DOVE)await doveTrick(this,x.owner,'enters play');
 if(x.id===LADY){x.power+=2;this.say("Lady Who's Moving Out Again gets +2 Power this Turn")}
 return result;
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
 const existed=!!(x&&this.obj(x.uid)), uid=x?.uid, p=x?.owner, id=x?.id;
 const rabbitReturn=id===RABBIT&&where==='hand'&&!defeated;
 const volunteerReturn=isVolunteer(x)&&where==='hand'&&!defeated;
 const ladyReturn=id===LADY&&where==='hand'&&!defeated;
 const result=await baseRemove.call(this,x,where,defeated);
 if(!existed||this.obj(uid))return result;
 if(id===RABBIT&&!rabbitReturn){this.draw(p);this.say('Rabbit leaves play and Draws a card')}
 if(volunteerReturn)await volunteerBuff(this,p,null,'returns to hand');
 if(id===DOVE)await doveTrick(this,p,'leaves play');
 if(ladyReturn){
   const choices=this.chars(1-p).filter(y=>this.card(y).cost<=2);
   if(choices.length){
     const target=await this.pick("Lady Who's Moving Out Again: Return an opposing Character costing 2 or less",p,choices,true);
     if(target!=null&&this.obj(target))await baseRemove.call(this,this.obj(target),'hand',false);
   }
 }
 return result;
};

const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
 if(x?.id===RABBIT)return false;
 if(x?.id===HAT)return !!this.canActivate(x)&&x.owner===this.turn&&this.chars(x.owner).some(y=>isHatAnimal(this,y));
 return baseCanUse.call(this,x);
};

const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
 const x=this.obj(uid);
 if(x?.id!==HAT)return baseActivate.call(this,uid,mode);
 const p=this.turn;
 if(!this.canUse(x)||x.owner!==p)return;
 const choices=this.chars(p).filter(y=>isHatAnimal(this,y));
 const target=await this.pick("Magician's Hat: Return a Rabbit or Dove to your hand",p,choices);
 if(target==null)return;
 x.ready=false;
 if(this.obj(target))await this.remove(this.obj(target),'hand');
 this.say("Magician's Hat returns an animal to hand");
 this.update?.();
};

const hasRotatedHat=(g,p)=>g.players[p]?.board?.some(x=>x.id===HAT&&!x.ready);
const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
 const id=this.players[p]?.hand?.[index];
 if(id!==HAT_ACTION)return baseCanPlay.call(this,index,p);
 if(!baseCanPlay.call(this,index,p))return false;
 return hasRotatedHat(this,p)&&this.players[p].hand.some((cid,i)=>i!==index&&(cid===RABBIT||cid===DOVE));
};

const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
 if(id===DRAMA){
   const choices=this.chars(p); if(!choices.length)return;
   const uid=await this.pick("Ethan’s JUST Being Dramatic: Return one of your Characters",p,choices);
   if(uid!=null&&this.obj(uid))await this.remove(this.obj(uid),'hand');
   return;
 }
 if(id===HAT_ACTION){
   if(!hasRotatedHat(this,p))return;
   const index=await this.pickHand(p,'Do Not Look in the Hat: Play a Rabbit or Dove for free',c=>c.id===RABBIT||c.id===DOVE);
   if(index==null)return;
   const animal=this.players[p].hand[index];
   await this.playCard(p,animal,'hand',0,{index});
   this.say(`Do Not Look in the Hat produces ${this.card(animal).name}`);
   return;
 }
 return baseActionEffect.call(this,p,id,target,second,previous);
};

const basePlayCard=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,...args){
 const before=new Set(this.players[p]?.board?.map(x=>x.uid)||[]);
 const result=await basePlayCard.call(this,p,id,...args);
 if(id!==BOY)return result;
 const entered=this.players[p]?.board?.find(x=>x.id===BOY&&!before.has(x.uid));
 if(!entered)return result;
 const s=this.players[p];
 if(!s.stash.length||!s.hand.length)return result;
 const stashIndex=await this.choose(p,'Birthday Boy: choose a Stash card to exchange',s.stash.map((cid,i)=>({label:`${this.card(cid).name} · Cost ${this.card(cid).cost}`,value:i})),true);
 if(stashIndex==null)return result;
 const handIndex=await this.pickHand(p,'Birthday Boy: choose a hand card to exchange');
 if(handIndex==null)return result;
 [s.stash[stashIndex],s.hand[handIndex]]=[s.hand[handIndex],s.stash[stashIndex]];
 this.say('Birthday Boy exchanges a card between hand and Stash');
 return result;
};
