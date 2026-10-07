// The locked Reckless audit, shared by the browser and its regression tests.
// Load after the other production packages so the current combat rules win.
import {Game, LEADERS} from './engine.js?v=mordecai-04-reckless-01';

const ACTIONS = new Set(['P019','P020','P021','P022','P024','P026','LAB-FLM-002','LAB-FLM-005','LAB-FLM-007']);
const ITEMS = new Set(['P027','P028','P030','LAB-FLM-001','LAB-FLM-004']);
const CHARACTERS = new Set(Array.from({length:18},(_,i)=>`P${String(i+1).padStart(3,'0')}`));
const current = c => c && !['banked','retired','pending-redesign'].includes(c.status);

LEADERS['Florida Man'].passive='Whenever one of your Characters Defeats an opposing Character with an Attack, the opposing Leader loses 1 Composure.';

Game.prototype.rollDie = function(label,p,outcomes={}) {
  const value=1+Math.floor((this.random||Math.random)()*6);
  const roll={value,label,player:p,outcome:outcomes[value]||'',sequence:(this.diceSequence=(this.diceSequence||0)+1)};
  this.diceRolls ||= []; this.diceRolls.unshift(roll); this.diceRolls.length=Math.min(20,this.diceRolls.length);
  this.say(`🎲 ${label} rolled ${value}${roll.outcome?` — ${roll.outcome}`:''}`);
  return value;
};

const basePower=Game.prototype.power;
Game.prototype.power=function(x){
  if(!x)return 0;
  let v=basePower.call(this,x);
  if(x.id==='P003')v+=x.damage;
  if(this.trait(x,'Driver'))v+=this.items(x).filter(i=>i.id==='LAB-FLM-004').length;
  return Math.max(0,v);
};
const baseTrouble=Game.prototype.trouble;
Game.prototype.trouble=function(x){return Math.max(0,baseTrouble.call(this,x)+(x.troubleBonus||0)+this.items(x).filter(i=>i.id==='P028').length)};
Game.prototype.attackPower=function(x){return this.power(x)+(x.nextAttackPower||0)};
Game.prototype.keyword=function(x,word){
  return !!x&&(this.layers(x).some(id=>this.card(id).keywords?.includes(word))||
    word==='Hothead'&&x.hot||word==='Sucker Punch'&&(x.sucker||this.items(x).some(i=>i.id==='LAB-FLM-004')));
};
Game.prototype.absorb=function(x){
  let n=Math.max(0,...(this.card(x).keywords||[]).map(k=>Number(k.match(/^Absorb (\d+)$/)?.[1]||0)));
  if(this.chars(x.owner).some(y=>y.uid!==x.uid&&y.id==='P008'&&y.ready&&!y.cloaked))n=Math.max(n,1);
  return n;
};
const baseDamage=Game.prototype.damage;
Game.prototype.damage=async function(x,n,defer=false){
  if(!x||!this.obj(x.uid))return;
  const reduced=Math.max(0,n-this.absorb(x));
  if(n>reduced)this.say(`${this.card(x).name} absorbs ${n-reduced} damage`);
  return baseDamage.call(this,x,reduced,defer);
};

Game.prototype.attackTargets=function(a){
  if(!a)return [];
  const sucker=this.keyword(a,'Sucker Punch')||this.players[a.owner].lastStraw;
  let targets=this.chars(1-a.owner).filter(x=>!x.cloaked&&(!x.ready||sucker));
  const tux=this.chars(1-a.owner).filter(x=>x.id==='LAB-CAT-003'&&!x.cloaked);
  if(tux.length){targets=targets.filter(x=>x.id==='LAB-CAT-003'||!this.trait(x,'Cat')); for(const t of tux)if(!targets.includes(t))targets.push(t)}
  return targets;
};
Game.prototype.canAttack=function(x){
  if(!x||this.card(x).type!=='Character'||x.cloaked||!x.ready||x.noAttack||this.has(x,'P135'))return false;
  const blocker=this.players.flatMap(s=>s.board).some(y=>y.uid!==x.uid&&y.ready&&!y.cloaked&&this.has(y,'P135'));
  const hot=this.players[x.owner].lastStraw||this.keyword(x,'Hothead')||this.chars(x.owner).some(y=>y.uid!==x.uid&&this.has(y,'P165')&&this.trait(x,'Wrestler'));
  return !blocker&&(x.born<this.round||hot)&&this.attackTargets(x).length>0;
};
Game.prototype.troubleEligible=function(x){
  return !!x&&!x.cloaked&&!x.noTrouble&&!this.has(x,'P135')&&x.born<this.round&&this.trouble(x)>0&&
    (x.id!=='P013'||this.players[x.owner].attackVictories>0);
};
Game.prototype.canCauseTrouble=function(x){return !!x?.ready&&this.troubleEligible(x)};

const baseStart=Game.prototype.startTurn;
Game.prototype.startTurn=function(){
  for(const s of this.players){s.attackVictories=0;for(const x of s.board){x.attackVictories=0;x.captainUsed=false;x.wranglerUsed=false;x.chainsawUsed=false}}
  return baseStart.call(this);
};
const baseEnd=Game.prototype.endRound;
Game.prototype.endRound=async function(){
  for(const s of this.players)for(const x of s.board){x.troubleBonus=0;x.sucker=false;x.noAttack=false;x.noTrouble=false;x.nextAttackPower=0;x.rampTrouble=false;x.dismissAfterAttack=false;x.defeatAfterAttack=false;x.chainsawBonus=0}
  return baseEnd.call(this);
};

const baseRemove=Game.prototype.remove;
Game.prototype.remove=async function(x,where='discard',defeated=false){
  const existed=!!x&&!!this.obj(x.uid),p=x?.owner,id=x?.id;
  const result=await baseRemove.call(this,x,where,defeated);
  if(existed&&!this.obj(x.uid)){
    if(id==='P004'&&where==='discard'){this.draw(p);this.say('Boogie Boarder leaves play: Draw a card')}
    if(defeated&&this._attackDamageTarget===x.uid)this._attackDefeated=true;
  }
  return result;
};

const baseEnter=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  if(!CHARACTERS.has(x.id))return baseEnter.call(this,x,previous);
  if(x.id!=='P005')return; // Audited textless/ongoing Characters have no legacy on-play effects.
  const r=this.rollDie('Unsupervised Toddler',x.owner,{1:'Tantrum: lose 2 Composure',2:'He Broke Something: opponent loses 2 Composure',3:'Snack Break: nothing happens',4:'Found Something: Draw a card',5:'Sugar Rush: +2 Power and Hothead this Turn',6:'Where Are His Parents?! +3 Power and Hothead; Dismiss after next Attack this Turn'});
  if(r===1)this.hurtLeader(x.owner,2);
  if(r===2)this.hurtLeader(1-x.owner,2);
  if(r===4)this.draw(x.owner);
  if(r>=5){x.power+=r===5?2:3;x.hot=true;if(r===6)x.dismissAfterAttack=true}
};

function actionTargets(g,p,id){
  const own=g.chars(p);
  if(['P019','P026','LAB-FLM-002'].includes(id))return own;
  if(id==='P020')return own.filter(x=>!x.ready&&x.attacked);
  if(id==='P021')return own.filter(x=>!x.ready&&x.attackVictories>0);
  if(id==='P024')return own.filter(x=>x.ready);
  if(id==='LAB-FLM-005')return g.chars(1-p);
  return null;
}
const baseCanPlay=Game.prototype.canPlay;
Game.prototype.canPlay=function(index,p=this.turn){
  const id=this.players[p]?.hand[index],c=this.card(id);
  if(!current(c)||p!==this.turn||this.winner!==null||this.pendingLastStraw!=null)return false;
  if(!ACTIONS.has(id)&&!ITEMS.has(id))return baseCanPlay.call(this,index,p);
  const cost=Math.max(0,c.cost-(c.type==='Item'?this.players[p].nextItemDiscount||0:0));
  if(cost>this.availableFuel(p))return false;
  const targets=actionTargets(this,p,id);
  if(targets&&!targets.length)return false;
  if(['P027','P028','LAB-FLM-004'].includes(id)&&!this.chars(p).length)return false;
  return true;
};
const basePlay=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,source='hand',cost=0,options={}){
  if(!current(this.card(id)))return false;
  if(ACTIONS.has(id)){
    const targets=actionTargets(this,p,id);
    if(targets){
      if(!targets.length)return false;
      const uid=await this.pick(`${this.card(id).name}: choose ${id==='LAB-FLM-005'?'opposing':'your'} Character`,p,targets);
      if(uid==null||!targets.some(x=>x.uid===uid))return false;
      options={...options,recklessTarget:uid};
    }
  }
  return basePlay.call(this,p,id,source,cost,options);
};

const baseAction=Game.prototype.actionEffect;
Game.prototype.actionEffect=async function(p,id,target,second,previous){
  const x=this.obj(target);
  switch(id){
    case 'P019': x.power+=3;x.hot=true;this.say('Hold My Beer: +3 Power and Hothead this Turn');return;
    case 'P020': x.ready=true;x.power+=2;x.noTrouble=true;this.say('SPRING BREAK!!!: Ready, +2 Power; no Trouble this Turn');return;
    case 'P021': x.ready=true;x.noAttack=true;this.say('Victory Lap: Ready; no more Attacks this Turn');return;
    case 'P022': await this.combatDamage(this.players.flatMap(s=>s.board).filter(x=>this.card(x).type==='Character').map(x=>[x,4,'effect']));this.say('Category 5 deals 4 to every Character');return;
    case 'P024': {
      const results={1:'Rotate chosen Character',2:'+3 Power OR +1 Trouble this Turn',3:'+3 Power OR +1 Trouble this Turn',4:'+3 Power OR +1 Trouble this Turn',5:'+3 Power OR +1 Trouble this Turn',6:'+3 Power AND +1 Trouble this Turn'};
      let r=this.rollDie('Hey Y’all, Watch This!',p,results);
      if(r>=2&&r<=5){const again=await this.choose(p,`Rolled ${r}: keep it or press your luck?`,[{label:'Keep this roll',value:false},{label:'Roll again (new result replaces this one)',value:true}]);if(again)r=this.rollDie('Hey Y’all, Watch This! reroll',p,results)}
      if(r===1)x.ready=false;
      else if(r===6){x.power+=3;x.troubleBonus=(x.troubleBonus||0)+1}
      else {const mode=await this.choose(p,`Final roll ${r}: choose your reward`,[{label:'+3 Power this Turn',value:'power'},{label:'+1 Trouble this Turn',value:'trouble'}]);if(mode==='power')x.power+=3;else x.troubleBonus=(x.troubleBonus||0)+1}
      this.say(`Watch This resolves final roll ${r}`);return;
    }
    case 'P026': this.heal(x,2);this.draw(p);this.say('Walk It Off: heal up to 2; Draw a card');return;
    case 'LAB-FLM-002': x.power+=5;x.hot=true;x.sucker=true;x.defeatAfterAttack=true;this.say('Caffeine: +5 Power, Hothead, Sucker Punch; Defeat after next Attack');return;
    case 'LAB-FLM-005': await this.damage(x,2);return;
    case 'LAB-FLM-007': this.draw(p,this.players[p].attackVictories>0?2:1);return;
    default:return baseAction.call(this,p,id,target,second,previous);
  }
};

const baseCanUse=Game.prototype.canUse;
Game.prototype.canUse=function(x){
  if(!x||x.owner!==this.turn||this.winner!==null||this.pendingLastStraw!=null)return false;
  if(x.id==='P003')return false;
  if(x.id==='P007')return !x.chainsawUsed&&this.canAttack(x);
  if(x.id==='P027')return this.canActivate(x)&&!!this.obj(x.attached);
  if(x.id==='P030')return this.canActivate(x)&&this.chars(x.owner).some(y=>y.ready);
  if(x.id==='LAB-FLM-001')return this.players[1-x.owner].board.some(y=>this.card(y).type==='Item'&&this.card(y).cost<=2);
  return baseCanUse.call(this,x);
};
const baseActivate=Game.prototype.activate;
Game.prototype.activate=async function(uid,mode=null){
  const x=this.obj(uid);if(!this.canUse(x))return;
  const p=this.turn;
  if(x.id==='P007'){
    x.chainsawUsed=true;
    let r=this.rollDie('Shirtless Guy With a Chainsaw',p,{1:'Stalled: Rotate Character',2:'+2 Power; may roll again',3:'+2 Power; may roll again',4:'+2 Power; may roll again',5:'+2 Power; may roll again',6:'+2 Power; may roll again'});
    if(r===1)x.ready=false;
    else {x.power+=2;x.chainsawBonus=2;const again=await this.choose(p,`Chainsaw rolled ${r}: keep +2 or rev again?`,[{label:'Keep +2 Power',value:false},{label:'Rev again: risk losing the action for +4 Power',value:true}]);if(again){r=this.rollDie('Chainsaw second rev',p,{1:'Stalled: Rotate and lose Chainsaw bonus',2:'+4 Power total',3:'+4 Power total',4:'+4 Power total',5:'+4 Power total',6:'+4 Power total'});if(r===1){x.ready=false;x.power-=2;x.chainsawBonus=0}else{x.power+=2;x.chainsawBonus=4}}}
    await this.advance();return;
  }
  if(x.id==='P027'){
    const wearer=this.obj(x.attached);x.ready=false;
    const r=this.rollDie('Gas Station Pills',p,{1:'Rotate wearer',2:'+1 Power this Turn',3:'+1 Power this Turn',4:'+1 Power this Turn',5:'+1 Power this Turn',6:'+2 Power this Turn'});
    if(r===1)wearer.ready=false;else wearer.power+=r===6?2:1;
    await this.advance();return;
  }
  if(x.id==='P030'){
    const chosen=await this.pick('Homemade Launch Ramp: choose your Ready Character',p,this.chars(p).filter(y=>y.ready));
    const y=this.obj(chosen);if(!y||!y.ready)return;
    x.ready=false;
    const r=this.rollDie('Homemade Launch Ramp',p,{1:'Rotate Character',2:'Next Attack this Turn +2 Power',3:'Next Attack this Turn +2 Power',4:'Deal 2 damage to Character',5:'Deal 2 damage to Character',6:'Next Attack +2 Power AND Cause Trouble (no survival required)'});
    if(r===1)y.ready=false;
    if(r===2||r===3||r===6)y.nextAttackPower=(y.nextAttackPower||0)+2;
    if(r===4||r===5)await this.damage(y,2);
    if(r===6)y.rampTrouble=true;
    await this.advance();return;
  }
  if(x.id==='LAB-FLM-001'){
    const targets=this.players[1-p].board.filter(y=>this.card(y).type==='Item'&&this.card(y).cost<=2);
    const chosen=await this.pick('Bolt Cutters: choose opposing Item costing 2 or less',p,targets);
    if(chosen==null||!targets.some(y=>y.uid===chosen))return;
    this.say(`Bolt Cutters: Dismiss ${this.card(this.obj(chosen)).name} and this Item`);await this.dismiss(x);await this.dismiss(this.obj(chosen));await this.advance();return;
  }
  return baseActivate.call(this,uid,mode);
};

Game.prototype.resolveTrouble=async function(a,{rotate=true,ramp=false}={}){
  if(!this.troubleEligible(a)||rotate&&!a.ready)return false;
  const p=a.owner,opp=1-p;
  if(rotate)a.ready=false;
  if(a.id==='P009'){
    const r=this.rollDie('Pet Alligator — Trouble',p,{1:'Cancel Trouble; lose 2 Composure',2:'Proceed',3:'Proceed',4:'Proceed',5:'Proceed',6:'Proceed'});
    if(r===1){this.hurtLeader(p,2);return false}
  }
  this.say(`${ramp?'Ramp double hit: ':''}${this.card(a).name} Causes Trouble · ${this.trouble(a)} Trouble`);
  for(const bell of [...this.players[opp].board.filter(x=>x.id==='P148')])if(this.obj(bell.uid))await this.rummage(opp);
  if(this.players[opp].lastStraw){this.players[opp].unhinged=true;this.say(`${this.name(opp)} is UNHINGED! Final Cause Trouble`)}
  else this.hurtLeader(opp,this.trouble(a));
  return true;
};
Game.prototype.causeTrouble=async function(uid){
  const a=this.obj(uid);if(!a||a.owner!==this.turn||!this.canCauseTrouble(a)||this.winner!==null)return;
  await this.resolveTrouble(a);await this.advance();
};

Game.prototype.attackVictory=async function(a){
  const p=a.owner,s=this.players[p];s.attackVictories=(s.attackVictories||0)+1;a.attackVictories=(a.attackVictories||0)+1;
  if(this.name(p)==='Florida Man'){this.hurtLeader(1-p,1);this.say('Florida Man: Attack Defeat costs opponent 1 Composure')}
  if(a.id==='P010'){this.draw(p);this.say('Unlicensed Zookeeper: Attack Defeat draws a card')}
  if(a.id==='P006'){
    const targets=this.players[1-p].board.filter(y=>this.card(y).type==='Item'&&this.card(y).cost<=2);
    const uid=await this.pick('Road Rage Ron: Dismiss opposing Item costing 2 or less?',p,targets,true);
    if(uid!=null)await this.dismiss(this.obj(uid));
  }
  for(const captain of this.chars(p).filter(y=>y.id==='P011'&&y.uid!==a.uid&&!y.captainUsed)){
    const use=await this.choose(p,'Sandbar Party Captain: Ready after another Character wins an Attack?', [{label:'Ready Captain',value:true},{label:'Skip',value:false}]);
    if(use){captain.ready=true;captain.captainUsed=true;this.say('Sandbar Party Captain Readies (once this Turn)')}
  }
  if(a.id==='P018'&&!a.wranglerUsed&&this.obj(a.uid)){
    const use=await this.choose(p,'Gator Wrangler: Ready for another Attack, but no Trouble this Turn?', [{label:'Ready Wrangler',value:true},{label:'Skip',value:false}]);
    if(use){a.ready=true;a.wranglerUsed=true;a.noTrouble=true;this.say('Gator Wrangler Readies; cannot Cause Trouble this Turn')}
  }
};

Game.prototype.attack=async function(uid){
  const a=this.obj(uid),p=this.turn;if(!a||a.owner!==p||!this.canAttack(a)||this.winner!==null)return;
  this.pendingAttackerPower=this.attackPower(a);this._catAttackAttacker=uid;
  const target=await this.pick('Attack which target?',p,this.attackTargets(a));
  this.pendingAttackerPower=null;this._catAttackAttacker=null;
  const victim=this.obj(target);if(!victim||!this.attackTargets(a).some(x=>x.uid===target))return;
  a.ready=false;a.attacked=true;this.players[p].attacked=true;
  this.pendingAttack={attacker:uid,target,power:this.attackPower(a)};
  this.say(`${this.card(a).name} attacks ${this.card(victim).name}`);
  if(a.id==='P009'){
    const r=this.rollDie('Pet Alligator — Attack',p,{1:'Cancel Attack; lose 2 Composure',2:'Proceed',3:'Proceed',4:'Proceed',5:'Proceed',6:'Proceed'});
    if(r===1){this.hurtLeader(p,2);a.nextAttackPower=0;a.rampTrouble=false;await this.finishAttack(a);return}
  }
  if(a.rampTrouble){a.rampTrouble=false;await this.resolveTrouble(a,{rotate:false,ramp:true})}
  if(a.id==='P014'){
    const boost=await this.choose(p,'Wannabe Vigilante: +4 Power for this Attack, then Dismiss?', [{label:'Use +4 Power; Dismiss after Attack',value:true},{label:'Keep the Character',value:false}]);
    if(boost){a.nextAttackPower=(a.nextAttackPower||0)+4;a.dismissAfterAttack=true}
  }
  if(a.id==='P015'){
    const targets=this.chars(1-p).filter(y=>y.uid!==target);
    const splash=await this.pick('Drunk Jet Skier: deal 1 to another opposing Character?',p,targets,true);
    if(splash!=null){await this.damage(this.obj(splash),1);const own=this.chars(p).filter(y=>y.uid!==uid);const collateral=await this.pick('Drunk Jet Skier: deal 1 to another of your Characters',p,own);if(collateral!=null)await this.damage(this.obj(collateral),1)}
  }
  const defender=this.obj(target);
  if(defender&&this.obj(uid)){
    if(this.keyword(defender,'Chicken')){
      const run=await this.choose(defender.owner,'Chicken: Return attacked Character to hand?', [{label:'Run away',value:true},{label:'Stay',value:false}]);
      if(run)await this.remove(defender,'hand');
    }
    if(this.obj(target)){
      const retaliation=this.power(defender),incoming=this.attackPower(a);
      this.pendingAttack.power=incoming;this._attackDamageTarget=target;this._attackDefeated=false;
      try{await this.combatDamage([[defender,incoming,'attack']])}finally{this._attackDamageTarget=null}
      if(this._attackDefeated)await this.attackVictory(a);
      if(this.obj(uid)&&this.obj(target)&&this.keyword(defender,'Retaliate'))await this.combatDamage([[a,retaliation,'retaliation']]);
      if(this.obj(target)&&this.has(defender,'P131'))this.heal(defender,1);
    }
  }
  a.nextAttackPower=0;await this.finishAttack(a);
};
Game.prototype.finishAttack=async function(a){
  if(this.obj(a.uid)){
    if(a.defeatAfterAttack){this.say('Caffeine burns out: Character is Defeated');await this.remove(a,'discard',true)}
    else if(a.dismissAfterAttack){this.say(`${this.card(a).name} is Dismissed after the Attack`);await this.dismiss(a)}
  }
  await this.advance();
};
