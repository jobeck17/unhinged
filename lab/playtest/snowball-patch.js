// LAB-only Snowball behavior patch.
// Keeps experimental behavior out of the canonical web playtest.
import {Game} from './engine.js?v=rulebreakers-1';

const basePower = Game.prototype.power;
Game.prototype.power = function(x){
  const value = basePower.call(this,x);
  return value + (x?.id === 'LAB-CAT-013' ? (x.snowballGrowth || 0) : 0);
};

const baseStartTurn = Game.prototype.startTurn;
Game.prototype.startTurn = function(){
  const p = this.turn;
  // Snowball grows only when it was already in play before this Turn began.
  // The persistent counter is separate from temporary Power, which the engine
  // clears at end of turn. Leaving play naturally resets the counter.
  for(const x of this.chars(p)){
    if(x.id === 'LAB-CAT-013'){
      x.snowballGrowth = (x.snowballGrowth || 0) + 1;
      this.say(`Snowball grows to ${1 + x.snowballGrowth} Power`);
    }
  }
  return baseStartTurn.call(this);
};
