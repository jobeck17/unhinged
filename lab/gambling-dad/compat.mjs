// LAB ONLY: compatibility for production card packages with differing engine revisions.
// Import before the shared Leader/card packages. Do not change root game data.
import {Game} from '../../web/engine.js?v=mordecai-04-meatshield-01';

// Some packages use these hooks, but the production engine revision loaded by
// this lab does not currently expose them. Install only missing fallbacks.
Game.prototype.lawyerTax ||= function(){return 0};
Game.prototype.playCost ||= function(p,id){
  const card=this.card(id),s=this.players[p];
  return Math.max(0,(card?.cost||0)-
    (card?.type==='Character'?(s.nextCharDiscount||0):
     card?.type==='Item'?(s.nextItemDiscount||0):0));
};
Game.prototype.flushEffects ||= async function(){};
