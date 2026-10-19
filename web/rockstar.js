// Retired Rock Star compatibility shim for historical labs only.
// Washed-Up Rock Star is not a canonical Leader after the Pawn Shop promotion.
import {Game,LEADERS} from './engine.js?v=mordecai-04-meatshield-01';
const retired='Washed-Up Rock Star';
if(LEADERS[retired]){
 LEADERS[retired].passive='Bad Publicity Is Still Publicity: Whenever your Leader loses Composure, Draw that many cards.';
 const baseHurtLeader=Game.prototype.hurtLeader;
 Game.prototype.hurtLeader=function(p,n){
  const loss=baseHurtLeader.call(this,p,n);
  if(loss>0&&this.name(p)===retired&&this.winner===null){
   const drawn=this.draw(p,loss,false);
   if(drawn)this.say(`Bad Publicity Is Still Publicity draws ${drawn} card${drawn===1?'':'s'}`);
  }
  return loss;
 };
}
