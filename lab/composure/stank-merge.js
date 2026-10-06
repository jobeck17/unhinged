// Composure + STANK INDUSTRIES-60 compatibility layer.
// This preserves Landon's active STANK experiments while translating obsolete
// Leader-attack / blocking assumptions into the Composure ruleset.
import {Game, LEADERS} from './engine.js';

const MOWER='LAB-FLM-001';
const CAFFEINE='LAB-FLM-002';
const CAFFEINE_SNEAK='LAB-FLM-002-SUCKER';
const NEEDLE='LAB-FLM-003';
const KIDS=new Set(['LAB-MAG-001A','LAB-MAG-001B']);
const ETHAN='LAB-MAG-002';
const BIRTHDAY_BOY='LAB-MAG-003';
const MOVING_LADY='LAB-MAG-004';
const HAT='LAB-MAG-005';
const RABBIT='P063';
const TUXEDO='LAB-CAT-003';
const THREE_LEGGED='LAB-CAT-006';
const SNOWBALL='LAB-CAT-013';
const TROJAN='LAB-CAT-014';
const HAIRY='LAB-CAT-016';
const SHOEBOX='LAB-CAT-017';
const SHOVEL='LAB-CAT-018';
const NINE_LIVES='LAB-CAT-019';
const MITTENS='LAB-CAT-020';

const CAT_PASSIVE='Strength in Numbers............ Mostly Numbers........ Probably.';
LEADERS['Crazy Cat Lady'].passive=CAT_PASSIVE+' At the start of your Turn, if you control fewer than 3 Cats, you may Stash one additional card this Turn. If you control 3 or more Cats, Draw an additional card.';
LEADERS['Florida Man'].passive="Ooh, That's Gonna Leave a Mark!: The first time each of your Characters is dealt damage and survives, it gets +2 Power, or +3 Power if it has the Daredevil Trait. At the start of your Turn, reduce that Character's Power by 1 until it has 1 Power. This ability can't trigger again for that Character.";
LEADERS['Backyard Wrestler'].passive='Tag Out: Once during your Turn after a friendly Defeat/Sacrifice, reveal the top card. A qualifying Expendable Character enters with Hothead; otherwise it goes to hand. Retaliate: Your Wrestlers retaliate when they survive an Attack.';

// ---------- Shared stat layers ----------
const basePower=Game.prototype.power;
Game.prototype.power=function(x){
  let v=basePower.call(this,x);
  if(x?.battleHighTriggered)v+=x.battleHigh||0;
  if(x && this.card(x)?.type==='Character'){
    v+=this.players[x.owner].board.filter(z=>z.id===MOWER&&(z.startCounters||0)>=3).length;
    if(x.id===SNOWBALL)v+=x.snowballGrowth||0;
    if(this.trait(x,'Cat')&&buriedCount(this,x.owner)>=3)v+=1;
    if(x.id===MITTENS)v+=x.mittensPermanentPower||0;
    if(KIDS.has(x.id))v+=x.kidAgainPower||0;
  }
  if(x?._labGasStationRisk)v-=1;
  if(x?.battleHighTriggered)v=Math.max(1,v);
  return Math.max(0,v);
};

const baseGuard=Game.prototype.guard;
Game.prototype.guard=function(x){
  let v=baseGuard.call(this,x)-(x?.hairballGuardLoss||0)-(x?.tetanusGuardLoss||0);
  if(x?.id===THREE_LEGGED&&x._threeLeggedProtected)v=Math.max(v,9999);
  return Math.max(0,v);
};

const baseLayers=Game.prototype.layers;
Game.prototype.layers=function(x){
  const layers=baseLayers.call(this,x);
  return x?.caffeineSucker?[...layers,CAFFEINE_SNEAK]:layers;
};

// ---------- Cat Lady passive / start-of-turn states ----------
const baseStartTurn=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
  const p=this.turn;
  for(const x of this.chars(p)){
    x.holdMyBeerNoAttack=false;
    if(x.id===SNOWBALL){
      x.snowballGrowth=(x.snowballGrowth||0)+1;
      this.say('Snowball grows to '+(1+x.snowballGrowth)+' Power');
    }
  }
  const hairballed=this.chars(p).filter(x=>x.hairball).map(x=>x.uid);
  const isCat=this.name(p)==='Crazy Cat Lady';
  const catCount=isCat?this.chars(p).filter(x=>this.trait(x,'Cat')).length:0;
  if(isCat){
    const s=this.players[p];
    s._catLadyStashLimit=catCount<3?2:1;
    s._catLadyStashCount=0;
  }

  // Suppress the obsolete base-engine Cat Distribution auto-Stash only.
  const realChars=this.chars;
  if(isCat){
    this.chars=function(player){
      if(player===p)return [];
      return realChars.call(this,player);
    };
  }
  let result;
  try{result=baseStartTurn.call(this)}
  finally{if(isCat)this.chars=realChars}

  if(isCat&&this.winner===null){
    if(catCount>=3){
      this.draw(p,1,false);
      if(this.winner===null)this.say(CAT_PASSIVE+' Draws an additional card');
    }else this.say(CAT_PASSIVE+' You may Stash twice this Turn');
  }
  for(const uid of hairballed){
    const x=this.obj(uid);
    if(x){
      x.ready=false;
      x.hairball=false;
      this.say(this.card(x).name+" can't Ready because of its Hairball");
    }
  }

  // Florida's one-time adrenaline decays toward 1 Power at the start of its Turn.
  if(this.name(p)==='Florida Man'){
    for(const x of this.chars(p)){
      if(!x.battleHighTriggered)continue;
      const own=basePower.call(this,x);
      const current=own+(x.battleHigh||0);
      if(current>1){
        x.battleHigh=(x.battleHigh||0)-1;
        this.say(this.card(x).name+"'s adrenaline drops toward 1 Power");
      }
    }
  }
  this.update?.();
  return result;
};

const baseCanStash=Game.prototype.canStash;
Game.prototype.canStash=function(index,p=this.turn){
  if(this.name(p)!=='Crazy Cat Lady')return baseCanStash.call(this,index,p);
  const s=this.players[p],limit=s._catLadyStashLimit??1,count=s._catLadyStashCount??(s.stashedThisTurn?1:0);
  return count<limit&&index>=0&&index<s.hand.length;
};
const baseStash=Game.prototype.stash;
Game.prototype.stash=function(index,p=this.turn){
  if(this.name(p)!=='Crazy Cat Lady')return baseStash.call(this,index,p);
  const s=this.players[p];
  if(!this.canStash(index,p))return false;
  const id=s.hand.splice(index,1)[0];
  s.stash.push(id);
  s._catLadyStashCount=(s._catLadyStashCount||0)+1;
  s.stashedThisTurn=true;
  s.fuel++;
  this.say(this.name(p)+' Stashes a card · '+s.stash.length+' total');
  this.update?.();
  return true;
};

// ---------- Florida Man STANK package ----------
const baseLeaderPassive=Game.prototype.leaderPassive;
Game.prototype.leaderPassive=async function(p,event,context={}){
  if(this.name(p)==='Florida Man'&&event==='survivedCombat')return 0;
  return baseLeaderPassive.call(this,p,event,context);
};

const baseCanAttack=Game.prototype.canAttack;
Game.prototype.canAttack=function(x){
  if(!x||x.cloaked||!x.ready||this.has(x,'P135')||x.holdMyBeerNoAttack)return false;
  const wrestlerHot=this.chars(x.owner).some(y=>y.uid!==x.uid&&this.has(y,'P165')&&this.trait(x,'Wrestler'));
  const hot=this.players[x.owner].lastStraw||this.layers(x).some(id=>this.card(id).keywords.includes('Hothead'))||x.hot||wrestlerHot;
  const blocked=this.players.flatMap(s=>s.board).some(y=>y.uid!==x.uid&&y.ready&&!y.cloaked&&this.has(y,'P135'));
  return x.born<this.round||hot&&!blocked;
};

function triggerBattleHigh(game,x,beforeDamage){
  if(!x||!game.obj(x.uid)||game.name(x.owner)!=='Florida Man'||x.battleHighTriggered)return;
  if(x.damage<=beforeDamage||x.damage>=game.guard(x))return;
  x.battleHighTriggered=true;
  x.battleHigh=game.trait(x,'Daredevil')?3:2;
  game.say(game.card(x).name+": Ooh, That's Gonna Leave a Mark! +"+x.battleHigh+' Power');
}
const baseDamage=Game.prototype.damage;
Game.prototype.damage=async function(x,n,defer=false){
  const before=x?.damage||0;
  await baseDamage.call(this,x,n,defer);
  triggerBattleHigh(this,x,before);
};

const baseChoose=Game.prototype.choose;
Game.prototype.choose=async function(p,title,options,optional=false){
  if(title==='Daredevil: take 1 damage for +2 Power?'&&this._labGasStationAttacker){
    const result=await baseChoose.call(this,p,'Daredevil: take 1 damage for +1 Power?',options,optional);
    if(result){
      const a=this.obj(this._labGasStationAttacker);
      if(a)a._labGasStationRisk=true;
    }
    return result;
  }
  return baseChoose.call(this,p,title,options,optional);
};

// ---------- Attack targeting / no-retaliation / Cat defenses ----------
const basePick=Game.prototype.pick;
Game.prototype.pick=function(title,p,targets,optional=false){
  if(title==='Attack which target?'&&this._stankAttackUid){
    const a=this.obj(this._stankAttackUid);
    const printedSucker=a&&this.layers(a).some(id=>this.card(id).keywords.includes('Sucker Punch'));
    if(a&&this.name(p)==='Florida Man'&&a.damage>0&&!printedSucker&&!this.players[p].lastStraw){
      targets=targets.filter(t=>t&&(!t.ready||this.layers(t).some(id=>this.card(id).keywords.includes('Bodyguard'))));
    }
    const defender=1-p;
    const tuxedos=this.chars(defender).filter(x=>x.id===TUXEDO&&!x.cloaked);
    if(tuxedos.length){
      targets=targets.filter(t=>t&&(t.id===TUXEDO||!this.trait(t,'Cat')));
    }
  }
  return basePick.call(this,title,p,targets,optional);
};

function boxesFor(game,p){return game.players[p].board.filter(x=>x.id===SHOEBOX)}
function buriedCount(game,p){return boxesFor(game,p).reduce((n,b)=>n+(b.cargo?.length||0),0)}
function findNewDiscardIndex(discard,id,start=0){
  for(let i=discard.length-1;i>=start;i--)if(discard[i]===id)return i;
  return -1;
}
async function chooseBox(game,p,boxes){
  if(boxes.length<=1)return boxes[0];
  const uid=await game.choose(p,'Choose a Shoebox',boxes.map((b,i)=>({label:'Shoebox '+(i+1)+' · '+(b.cargo?.length||0)+' buried',value:b.uid})));
  return game.obj(uid)||boxes[0];
}
async function buryFromDiscard(game,p,box,cardId,start,message){
  const idx=findNewDiscardIndex(game.players[p].discard,cardId,start);
  if(idx<0||!game.obj(box.uid))return false;
  const [id]=game.players[p].discard.splice(idx,1);
  box.cargo||=[];
  box.cargo.push(id);
  game.say(message+' ('+buriedCount(game,p)+' total)');
  return true;
}

const baseCombatDamage=Game.prototype.combatDamage;
Game.prototype.combatDamage=async function(entries){
  const protectedCats=[],hairyHits=[],candidates=new Map(),discardStarts=new Map(),filtered=[];
  for(let entry of entries||[]){
    let [target,n,kind]=entry;
    if(kind==='attack'&&target?.id===THREE_LEGGED&&this.obj(target.uid)){
      target.threeLeggedAttackHits=(target.threeLeggedAttackHits||0)+1;
      if(target.threeLeggedAttackHits<=2){
        target._threeLeggedProtected=true;
        protectedCats.push(target.uid);
      }
    }
    if(kind==='attack'&&target?.id===HAIRY)hairyHits.push(target.uid);
    if(target&&this.obj(target.uid)&&this.card(target).type==='Character'&&this.trait(target,'Cat')&&boxesFor(this,target.owner).length){
      candidates.set(target.uid,{uid:target.uid,owner:target.owner,cardId:target.id,name:this.card(target).name});
      if(!discardStarts.has(target.owner))discardStarts.set(target.owner,this.players[target.owner].discard.length);
    }
    if(kind==='retaliation'){
      const source=this.obj(this.pendingAttack?.target);
      const wrestler=source&&this.name(source.owner)==='Backyard Wrestler'&&this.trait(source,'Wrestler');
      if(!wrestler)continue;
      entry=[target,n,'wrestler-retaliate'];
    }
    filtered.push(entry);
  }
  const result=filtered.length?await baseCombatDamage.call(this,filtered):undefined;

  for(const uid of protectedCats){
    const cat=this.obj(uid);
    if(cat){
      cat.damage=0;
      cat._threeLeggedProtected=false;
      const left=Math.max(0,3-(cat.threeLeggedAttackHits||0));
      this.say('I GOT 3 MORE ANYWAY — Three-Legged Cat survives. '+left+' more leg'+(left===1?'':'s')+'.');
    }
  }
  if(hairyHits.length&&this.pendingAttack?.attacker){
    for(const uid of hairyHits){
      if(!this.obj(uid))continue;
      const attacker=this.obj(this.pendingAttack.attacker);
      if(attacker){
        attacker.hairball=true;
        attacker.hairballGuardLoss=(attacker.hairballGuardLoss||0)+1;
        this.say(this.card(attacker).name+' gets a Hairball and permanently loses 1 Guard');
        await this.checkDefeat(attacker);
      }
    }
  }
  for(const dead of candidates.values()){
    if(this.obj(dead.uid))continue;
    const boxes=boxesFor(this,dead.owner);
    if(!boxes.length)continue;
    const start=discardStarts.get(dead.owner)??0;
    const idx=findNewDiscardIndex(this.players[dead.owner].discard,dead.cardId,start);
    if(idx<0)continue;
    const use=await this.choose(dead.owner,'Shoebox of Dead Cats: put defeated '+dead.name+' face down under a Shoebox instead?',[{label:'Put it in the Shoebox',value:true},{label:'Send it to discard',value:false}]);
    if(use){
      const box=await chooseBox(this,dead.owner,boxes);
      await buryFromDiscard(this,dead.owner,box,dead.cardId,start,'Shoebox of Dead Cats buries a combat casualty face down');
    }
  }
  return result;
};

// ---------- Remove / Defeat / Shoebox / Magician leave-play hooks ----------
async function giveKidPower(game,p,excludeUid=null,reason='trick'){
  const targets=game.chars(p).filter(x=>x.uid!==excludeUid);
  if(!targets.length)return;
  const uid=await game.pick('Very Enthusiastic Volunteer '+reason+': choose another Character to get +1 permanent Power',p,targets);
  const target=uid==null?null:game.obj(uid);
  if(target){
    target.kidAgainPower=(target.kidAgainPower||0)+1;
    game.say('Very Enthusiastic Volunteer gives '+game.card(target).name+' +1 permanent Power');
  }
}

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  if(!x||!this.obj(x.uid))return;
  const p=x.owner,uid=x.uid,card=this.card(x);
  const rabbit=this.has(x,RABBIT);
  const kid=KIDS.has(x.id);
  const lady=x.id===MOVING_LADY;
  const kidReturn=kid&&where==='hand'&&!defeated;
  const ladyReturn=lady&&where==='hand'&&!defeated;
  const baseAlreadyDrawsRabbit=rabbit&&where==='hand'&&!defeated;

  let bury=false,box=null,discardStart=this.players[p].discard.length;
  if(defeated&&where==='discard'&&card.type==='Character'&&this.trait(x,'Cat')){
    const boxes=boxesFor(this,p);
    if(boxes.length){
      bury=await this.choose(p,'Shoebox of Dead Cats: put defeated '+card.name+' face down under a Shoebox instead?',[{label:'Put it in the Shoebox',value:true},{label:'Send it to discard',value:false}]);
      if(bury)box=await chooseBox(this,p,boxes);
    }
  }

  const result=await baseRemove.call(this,x,where,defeated);
  const left=!this.obj(uid);
  if(left&&bury&&box)await buryFromDiscard(this,p,box,card.id,discardStart,'Shoebox of Dead Cats buries a defeated Cat face down');
  if(left&&rabbit&&!baseAlreadyDrawsRabbit){
    this.draw(p);
    this.say('Rabbit leaves play and draws a card');
  }
  if(left&&kidReturn)await giveKidPower(this,p,null,'returns to hand');
  if(left&&ladyReturn){
    const opp=1-p,choices=this.chars(opp).filter(y=>this.card(y).cost<=2);
    if(choices.length){
      const target=await this.pick("Lady Who's Moving Out Again: Return an opposing Character costing 2 or less",p,choices,true);
      if(target!=null&&this.obj(target))await this.remove(this.obj(target),'hand',false);
    }
  }
  return result;
};

const baseDismiss=Game.prototype.dismiss;
Game.prototype.dismiss=async function(x){
  if(!x||!this.obj(x.uid))return;
  const card=this.card(x),p=x.owner,boxes=boxesFor(this,p);
  if(card.type==='Character'&&this.trait(x,'Cat')&&boxes.length){
    const use=await this.choose(p,'Shoebox of Dead Cats: put '+card.name+' face down under a Shoebox instead?',[{label:'Put it in the Shoebox',value:true},{label:'Send it to discard',value:false}]);
    if(use){
      const box=await chooseBox(this,p,boxes),start=this.players[p].discard.length;
      await baseDismiss.call(this,x);
      await buryFromDiscard(this,p,box,card.id,start,'Shoebox of Dead Cats buries a Cat face down');
      return;
    }
  }
  return baseDismiss.call(this,x);
};

const baseDefeatEffect=Game.prototype.defeatEffect;
Game.prototype.defeatEffect=async function(id,x,p,lower){
  await baseDefeatEffect.call(this,id,x,p,lower);
  if(id!==TROJAN)return;
  this.say('Trojan Cat explodes: every other Character takes 1 damage');
  const targets=this.players.flatMap(s=>s.board).filter(y=>this.card(y).type==='Character'&&!y.cloaked);
  for(const y of targets)if(this.obj(y.uid)){y.damage+=1;this.say(this.card(y).name+' takes 1 damage from Trojan Cat')}
  for(const y of targets)if(this.obj(y.uid))await this.checkDefeat(y);
};

// ---------- Enter / Play hooks for STANK Magician ----------
const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  if(x?.id==='P067')return;
  if(x?.id===MOVING_LADY){
    x.power+=2;
    this.say("Lady Who's Moving Out Again gets +2 Power this Turn");
    return;
  }
  const result=await baseEnterEffect.call(this,x,previous);
  if(x?.id===RABBIT&&this.obj(x.uid)){
    this.draw(x.owner);
    this.say('Rabbit enters play and draws a card');
  }
  if(x&&KIDS.has(x.id)&&this.obj(x.uid))await giveKidPower(this,x.owner,x.uid,'enters play');
  return result;
};

const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand?.[index],own=this.chars(p),opp=this.chars(1-p);
  if(id==='P067'){
    const c=this.card(id),s=this.players[p];
    if(!c)return false;
    return Math.max(0,c.cost-(s.nextCharDiscount||0))<=this.availableFuel(p);
  }
  if(id===CAFFEINE&&!own.length)return false;
  if(id===NEEDLE&&![...own,...opp].length)return false;
  if(id===ETHAN&&!own.length)return false;
  if([SHOVEL,'LAB-SCI-009','LAB-SCI-010'].includes(id)&&own.length>=this.maxCharacters)return false;
  return baseCanPlay.call(this,index,p);
};

async function birthdayBoySwap(game,p){
  const s=game.players[p];
  if(!s?.stash?.length||!s?.hand?.length)return;
  const stashIndex=await game.choose(p,'Birthday Boy: What card do you want to replace from Stash?',s.stash.map((id,i)=>({label:game.card(id).name+' · Cost '+game.card(id).cost,value:i})),true);
  if(stashIndex==null)return;
  const handIndex=await game.pickHand(p,'Birthday Boy: Which card from your hand do you want to replace it with?');
  if(handIndex==null)return;
  const stashId=s.stash[stashIndex],handId=s.hand[handIndex],tempIndex=s.tempStashCard==null?-1:s.stash.indexOf(s.tempStashCard);
  if(stashIndex===tempIndex)s.tempStashCard=null;
  s.stash[stashIndex]=handId;
  s.hand[handIndex]=stashId;
  game.say('Birthday Boy swaps a card between hand and Stash');
}

const basePlayCard=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,source='hand',cost=0,{index=null,bonusHot=false,stack=false}={}){
  if(id==='P067'){
    const s=this.players[p],c=this.card(id);
    if(source==='hand'&&(index===null||s.hand[index]!==id))index=s.hand.indexOf(id);
    if(source==='hand'&&index<0||source==='discard'&&!s.discard.includes(id)||this.availableFuel(p)<cost)return false;
    if(!this.payCost(p,cost))return false;
    if(source==='hand')s.hand.splice(index,1);else s.discard.splice(s.discard.indexOf(id),1);
    const previous=[...s.played];s.played.push({id,type:c.type});
    this.say('Plays '+c.name+(cost?' (Cost '+cost+')':' for free'));
    const x=this.enter(p,id);
    if(!x)return false;
    x.hot=bonusHot;
    await this.enterEffect(x,previous);
    if(s.nextCharDiscount)s.nextCharDiscount=0;
    if(s.discountUndead===id)s.discountUndead=null;
    return true;
  }
  const before=BIRTHDAY_BOY===id?new Set(this.players[p]?.board?.map(x=>x.uid)||[]):null;
  const result=await basePlayCard.call(this,p,id,source,cost,{index,bonusHot,stack});
  if(result&&id===BIRTHDAY_BOY){
    const entered=this.players[p].board.some(x=>x.id===BIRTHDAY_BOY&&!before.has(x.uid));
    if(entered)await birthdayBoySwap(this,p);
  }
  return result;
};

// ---------- Actions ----------
const baseActionEffect=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  if(id==='P019'){
    const x=this.obj(target);
    if(!x)return;
    if(x.born===this.round){x.hot=true;this.say(this.card(x).name+' gets Hothead this Turn')}
    if(x.attacked){x.ready=true;x.holdMyBeerNoAttack=true;this.say(this.card(x).name+' Readies, but cannot Attack again this Turn')}
    if(this.trait(x,'Daredevil')){
      const yes=await this.choose(p,'Hold My Beer: deal 1 damage to this Daredevil?',[{label:'Yes',value:true},{label:'No',value:false}]);
      if(yes&&this.obj(target))await this.damage(this.obj(target),1);
    }
    return;
  }
  if(id===NEEDLE){
    const targets=[...this.chars(p),...this.chars(1-p)];
    if(!targets.length)return;
    const uid=await this.pick('Rusty Needle: Choose a Character',p,targets);
    const x=uid==null?null:this.obj(uid);
    if(!x)return;
    await this.damage(x,1);
    const survivor=this.obj(uid);
    if(survivor){
      survivor.tetanus=true;
      survivor.tetanusGuardLoss=survivor.tetanusGuardLoss||0;
      this.say(this.card(survivor).name+': Congratulations, you have tetanus.');
    }
    return;
  }
  if(id===CAFFEINE){
    const targets=this.chars(p);
    if(!targets.length)return;
    const uid=await this.pick('A MILLION KILOGRAMS OF CAFFEINE!!!!: Choose a Character',p,targets);
    const x=uid==null?null:this.obj(uid);
    if(!x)return;
    x.power+=5;x.hot=true;x.caffeineSucker=true;x.caffeineDoomed=true;
    this.say(this.card(x).name+' drinks an impossible amount of caffeine: +5 Power, Hothead, Sucker Punch');
    return;
  }
  if(id===ETHAN){
    const choices=this.chars(p);
    if(!choices.length)return;
    const uid=await this.pick("Ethan’s JUST Being Dramatic: Return one of your Characters",p,choices);
    if(uid!=null&&this.obj(uid))await this.remove(this.obj(uid),'hand');
    return;
  }
  if(id===SHOVEL){
    const buried=[];
    for(const box of boxesFor(this,p))for(let i=0;i<(box.cargo?.length||0);i++)buried.push({boxUid:box.uid,index:i,cardId:box.cargo[i]});
    if(!buried.length){this.say('Shovel digs around but finds no buried Cats');return}
    if(this.chars(p).length>=this.maxCharacters){this.say('Shovel has no open Character slot');return}
    const pick=buried[Math.floor(Math.random()*buried.length)],box=this.obj(pick.boxUid);
    if(!box?.cargo?.length)return;
    const [cardId]=box.cargo.splice(pick.index,1),cat=this.enter(p,cardId);
    if(!cat)return;
    this.say('Shovel digs up '+this.card(cardId).name);
    await this.enterEffect(cat,previous||[]);
    return;
  }
  if(id===NINE_LIVES){
    this.say('Nine Lives, Zero Survivors wipes the board');
    const chars=this.players.flatMap(s=>s.board).filter(x=>this.card(x).type==='Character').map(x=>x.uid);
    for(const uid of chars){const x=this.obj(uid);if(x){this.say(this.card(x).name+' is Defeated');await this.remove(x,'discard',true)}}
    const items=this.players.flatMap(s=>s.board).filter(x=>this.card(x).type==='Item').map(x=>x.uid);
    for(const uid of items){const x=this.obj(uid);if(x)await baseDismiss.call(this,x)}
    for(let q=0;q<2;q++)while(this.players[q].hand.length<7&&this.players[q].deck.length&&this.winner===null)this.draw(q,1,false);
    this.say('Both players draw back to 7 cards');
    this.checkEnd();
    return;
  }
  return baseActionEffect.call(this,p,id,target,second,previous);
};

// ---------- Activations ----------
const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(x?.id===RABBIT)return false;
  if(x?.id===MOWER)return x.owner===this.turn&&(x.startCounters||0)<3&&this.chars(this.turn).some(y=>y.ready&&!y.cloaked);
  if(x?.id===MITTENS)return !!this.canActivate(x)&&x.owner===this.turn&&(this.players[x.owner].stash.length>0||buriedCount(this,x.owner)>0);
  if(x?.id===HAT)return !!this.canActivate(x)&&x.owner===this.turn&&this.chars(x.owner).some(y=>this.has(y,RABBIT));
  if(x?.tetanus&&x.owner===this.turn&&x.ready)return true;
  return baseCanUse.call(this,x);
};

function removeReadyStash(game,p){
  const s=game.players[p];if(!s.stash.length||s.fuel<=0)return false;
  let index=s.tempStashCard?s.stash.lastIndexOf(s.tempStashCard):-1;if(index<0)index=s.stash.length-1;
  const [id]=s.stash.splice(index,1);s.fuel=Math.max(0,s.fuel-1);if(s.tempStashCard===id)s.tempStashCard=null;s.discard.push(id);return true;
}
function removeRotatedStash(game,p){
  const s=game.players[p];if(s.stash.length<=s.fuel)return false;
  let index=s.stash.findIndex(id=>id!==s.tempStashCard);if(index<0)index=0;
  const [id]=s.stash.splice(index,1);s.discard.push(id);s.fuel=Math.min(s.fuel,s.stash.length);return true;
}
async function eatOneStash(game,p){
  const s=game.players[p],ready=s.fuel,rotated=Math.max(0,s.stash.length-s.fuel);
  if(!ready&&!rotated)return false;
  let state=rotated&&!ready?'rotated':ready&&!rotated?'ready':await game.choose(p,'YUMMY!: choose a Stash card to discard',[{label:'Rotated Stash ('+rotated+')',value:'rotated'},{label:'Ready Stash ('+ready+')',value:'ready'}]);
  return state==='rotated'?removeRotatedStash(game,p):state==='ready'?removeReadyStash(game,p):false;
}

const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
  const x=this.obj(uid);
  if(!x)return;
  const p=this.turn;
  if(x.id===MOWER){
    if(!this.canUse(x)||x.owner!==p)return;
    const ready=this.chars(p).filter(y=>y.ready&&!y.cloaked),target=await this.pick('Pull the Cord: Rotate a Character',p,ready);
    const c=target==null?null:this.obj(target);if(!c||!c.ready)return;
    c.ready=false;x.startCounters=Math.min(3,(x.startCounters||0)+1);
    this.say(this.card(c).name+' pulls the cord ('+x.startCounters+'/3)');
    if(x.startCounters>=3)this.say('Broken Lawnmower starts! Your Characters get +1 Power');
    await this.advance();return;
  }
  if(x.id===MITTENS){
    if(!this.canUse(x)||x.owner!==p)return;
    const options=[];if(this.players[p].stash.length)options.push({label:'YUMMY! — discard 1 Stash for +1 Power',value:'stash'});
    const buried=buriedCount(this,p);if(buried)options.push({label:'WHERE DID YOU GET THAT?! — discard '+buried+' buried Cats for +'+buried+' Power',value:'shoebox'});
    const choice=mode||(options.length===1?options[0].value:await this.choose(p,'Mittens III: choose an ability',options));
    if(choice==='stash'){
      if(!await eatOneStash(this,p))return;x.ready=false;x.mittensPermanentPower=(x.mittensPermanentPower||0)+1;this.say('Mittens III says YUMMY! and permanently gets +1 Power');return;
    }
    if(choice==='shoebox'){
      const count=buriedCount(this,p);if(!count)return;x.ready=false;
      for(const box of boxesFor(this,p)){if(box.cargo?.length){this.players[p].discard.push(...box.cargo);box.cargo=[]}}
      x.mittensPermanentPower=(x.mittensPermanentPower||0)+count;this.say('WHERE DID YOU GET THAT?! Mittens III eats '+count+' buried Cats and permanently gets +'+count+' Power');return;
    }
    return;
  }
  if(x.id===HAT){
    if(!this.canUse(x)||x.owner!==p)return;
    const rabbits=this.chars(p).filter(y=>this.has(y,RABBIT)),target=await this.pick("Magician's Hat: Return a Rabbit to your hand",p,rabbits);
    if(target==null)return;x.ready=false;const rabbit=this.obj(target);if(rabbit)await this.remove(rabbit,'hand');this.say("Magician's Hat returns a Rabbit to hand");this.update?.();return;
  }
  if(x.tetanus&&x.owner===p&&x.ready){
    const normal=baseCanUse.call(this,x);
    let cure=mode==='LAB-TETANUS-CURE';
    if(!mode&&normal){
      const choice=await this.choose(p,'Choose an ability',[{label:'Remove tetanus',value:'LAB-TETANUS-CURE'},{label:'Use printed ability',value:'PRINTED'}]);
      if(choice==='PRINTED')return baseActivate.call(this,uid,null);
      cure=choice==='LAB-TETANUS-CURE';
    }else if(!mode&&!normal)cure=true;
    if(cure){x.ready=false;delete x.tetanus;this.say(this.card(x).name+' Rotates to remove tetanus');await this.advance();return}
  }
  return baseActivate.call(this,uid,mode);
};

// ---------- Attack post-effects ----------
const baseAttack=Game.prototype.attack;
Game.prototype.attack=async function(uid){
  const before=this.obj(uid);
  if(!before)return baseAttack.call(this,uid);
  const p=before.owner,doomed=!!before.caffeineDoomed,hadAttacked=!!before.attacked,kidId=KIDS.has(before.id)?before.id:null;
  const prevAttack=this._stankAttackUid,prevGas=this._labGasStationAttacker;
  this._stankAttackUid=uid;
  if(this.has(before,'P002'))this._labGasStationAttacker=uid;
  try{
    const result=await baseAttack.call(this,uid);
    let after=this.obj(uid);
    if(doomed&&!hadAttacked&&after?.attacked){
      this.say(this.card(after).name+' crashes after the caffeine Attack');
      await this.remove(after,'discard',true);
      await this.advance();
      after=this.obj(uid);
    }
    if(kidId&&after&&after.owner===p&&!hadAttacked&&after.attacked){
      const s=this.players[p];s.kidAgainEscapesUsed=s.kidAgainEscapesUsed||{};
      if(!s.kidAgainEscapesUsed[kidId]){
        s.kidAgainEscapesUsed[kidId]=true;
        this.say('Very Enthusiastic Volunteer vanishes back into the crowd after his first Attack');
        await this.remove(after,'hand');
      }
    }
    return result;
  }finally{
    const current=this.obj(uid);if(current)delete current._labGasStationRisk;
    this._stankAttackUid=prevAttack;this._labGasStationAttacker=prevGas;
  }
};

// ---------- Turn transition: Caffeine expires; tetanus worsens ----------
const baseEndRound=Game.prototype.endRound;
Game.prototype.endRound=async function(...args){
  for(const player of this.players)for(const x of player.board){delete x.caffeineSucker;delete x.caffeineDoomed}
  const previousTurn=this.turn,result=await baseEndRound.apply(this,args);
  if(this.winner!==null||this.turn===previousTurn)return result;
  const infected=[...this.chars(this.turn)].filter(x=>x.tetanus);
  for(const x of infected){
    if(!this.obj(x.uid))continue;
    x.tetanusGuardLoss=(x.tetanusGuardLoss||0)+1;
    this.say(this.card(x).name+' loses 1 Guard from tetanus');
    await this.checkDefeat(x);
  }
  this.checkEnd();this.update?.();return result;
};
