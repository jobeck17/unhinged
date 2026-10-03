// LAB ONLY: alternate Stash economy experiment.
// A card you Stash provides Fuel equal to its printed Cost.
// Example: Cost 5 -> 5 Fuel. Cost 1 -> 1 Fuel.
import { Game } from '../../web/engine.js?v=rulebreakers-1';

const baseStartTurn=Game.prototype.startTurn;
const baseSpendOwnStash=Game.prototype.spendOwnStash;

Game.prototype.stashValue=function(id){
  return Math.max(0,this.card(id)?.cost||0);
};

Game.prototype.stashCapacity=function(p=this.turn){
  const s=this.players[p];
  if(!s) return 0;
  let total=s.stash.reduce((sum,id)=>sum+this.stashValue(id),0);
  // The second-player setup Stash is not manually Stashed, so preserve its normal 1-Fuel value.
  if(s.tempStashCard){
    total-=this.stashValue(s.tempStashCard);
    total+=1;
  }
  return Math.max(0,total);
};

Game.prototype.startTurn=function(){
  const result=baseStartTurn.call(this);
  // Mad Scientist's protected battery is its own rule-breaking resource system; leave it unchanged.
  if(this.name(this.turn)!=='Mad Scientist'){
    this.players[this.turn].fuel=this.stashCapacity(this.turn);
  }
  window.stashHalfCostGame=this;
  this.update?.();
  return result;
};

Game.prototype.stash=function(index,p=this.turn){
  const s=this.players[p];
  if(!this.canStash(index,p)) return false;
  const id=s.hand.splice(index,1)[0];
  const gain=this.stashValue(id);
  s.stash.push(id);
  s.stashedThisTurn=true;
  s.fuel+=gain;
  this.say(`${this.name(p)} Stashes ${this.card(id).name} · +${gain} Fuel`);
  window.stashHalfCostGame=this;
  this.update?.();
  return true;
};

// Preserve the temporary setup Stash as a one-use 1-Fuel resource while allowing ordinary
// Stashed cards to contribute multiple Fuel to the same aggregate ready pool.
Game.prototype.spendOwnStash=function(p,n){
  const s=this.players[p];
  let q=n;
  const normalReady=Math.max(0,s.fuel-(s.tempStashCard?1:0));
  const useNormal=Math.min(q,normalReady);
  s.fuel-=useNormal;
  q-=useNormal;
  if(q&&s.tempStashCard){
    s.fuel--;
    q--;
    const i=s.stash.lastIndexOf(s.tempStashCard);
    if(i>=0)s.stash.splice(i,1);
    s.discard.push(s.tempStashCard);
    s.tempStashCard=null;
  }
  return n-q;
};

// Keep a reference available to the wrapper UI so it can show resource capacity rather than card count.
const baseBegin=Game.prototype.begin;
Game.prototype.begin=function(...args){
  window.stashHalfCostGame=this;
  return baseBegin.apply(this,args);
};
