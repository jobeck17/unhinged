// LAB ONLY: Gas Station Daredevil tuning for the Florida Man Adrenaline test.
// Canonical CARDS.json remains untouched.
import { Game } from './engine.js?v=rulebreakers-1';

const DAREDEVIL_ID='P002';
const DAREDEVIL_TEXT='When this attacks, you may deal 1 damage to it. If you do, it gets +1 Power for this Attack.';

// Show the LAB wording on the card without changing the canonical card pool.
const baseCard=Game.prototype.card;
Game.prototype.card=function(x){
  const card=baseCard.call(this,x);
  if(card?.id!==DAREDEVIL_ID) return card;
  return {...card,text:DAREDEVIL_TEXT,status:'lab'};
};

// The base LAB engine currently grants +2 Power through a local attack bonus.
// Track the choice and subtract 1 Power during only that attack, making the net bonus +1.
const basePower=Game.prototype.power;
Game.prototype.power=function(x){
  let value=basePower.call(this,x);
  if(x?._labGasStationRisk) value-=1;
  return Math.max(0,value);
};

const baseChoose=Game.prototype.choose;
Game.prototype.choose=async function(p,title,options,optional=false){
  if(title==='Daredevil: take 1 damage for +2 Power?' && this._labGasStationAttacker){
    const result=await baseChoose.call(this,p,'Daredevil: take 1 damage for +1 Power?',options,optional);
    if(result){
      const attacker=this.obj(this._labGasStationAttacker);
      if(attacker) attacker._labGasStationRisk=true;
    }
    return result;
  }
  return baseChoose.call(this,p,title,options,optional);
};

const baseAttack=Game.prototype.attack;
Game.prototype.attack=async function(uid){
  const attacker=this.obj(uid);
  if(!attacker || !this.has(attacker,DAREDEVIL_ID)) return baseAttack.call(this,uid);
  const previous=this._labGasStationAttacker;
  this._labGasStationAttacker=uid;
  try{
    return await baseAttack.call(this,uid);
  }finally{
    const current=this.obj(uid);
    if(current) delete current._labGasStationRisk;
    this._labGasStationAttacker=previous;
  }
};
