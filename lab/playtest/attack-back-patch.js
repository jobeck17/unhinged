// STANK INDUSTRIES LAB ONLY — allow backing out after pressing Attack.
// The attack is not committed until an actual target is chosen.
import {Game} from './engine.js?v=rulebreakers-1';

const baseAttack=Game.prototype.attack;
Game.prototype.attack=async function(uid){
  const originalPick=this.pick;
  this.pick=async function(title,p,targets,optional=false){
    if(title==='Attack which target?'){
      const options=targets.map(x=>({
        label:x===-1?this.name(1-p)+' (Leader)':this.card(x).name,
        value:x===-1?-1:x.uid
      }));
      return this.ask({
        title,
        player:p,
        mandatory:false,
        options:[...options,{label:'Back',value:null}]
      });
    }
    return originalPick.call(this,title,p,targets,optional);
  };
  try{
    return await baseAttack.call(this,uid);
  }finally{
    this.pick=originalPick;
  }
};
