// Mordecai translation of Landon's Washed-Up Rock Star damage-for-cards lab.
import {Game,LEADERS} from './engine.js?v=mordecai-04-reckless-01';
LEADERS['Washed-Up Rock Star'].passive='Bad Publicity Is Still Publicity: Whenever your Leader loses Composure, Draw that many cards.';

const baseHurtLeader=Game.prototype.hurtLeader;
Game.prototype.hurtLeader=function(p,n){
 const loss=baseHurtLeader.call(this,p,n);
 if(loss>0&&this.name(p)==='Washed-Up Rock Star'&&this.winner===null){
   const drawn=this.draw(p,loss,false);
   if(drawn)this.say(`Bad Publicity Is Still Publicity draws ${drawn} card${drawn===1?'':'s'}`);
 }
 return loss;
};
