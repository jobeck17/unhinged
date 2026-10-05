// STANK INDUSTRIES LAB ONLY — clean out stale Misdirection code paths.
// P067 is School Bully now, so it should not run the old Kid with an iPad entry effect.
// P089 is no longer used in the STANK Magician deck; remove the old Bush card object entirely
// so its legacy hidden-card behavior cannot leak back into this playtest.
import {Game} from './engine.js?v=rulebreakers-1';

const originalFetch=globalThis.fetch.bind(globalThis);
globalThis.fetch=async function(input,init){
  const url=typeof input==='string'?input:String(input?.url||'');
  const response=await originalFetch(input,init);
  const isCards=url.startsWith('../CARDS.json');
  const isDecks=url.startsWith('../DECKS.json');
  if(!isCards&&!isDecks)return response;
  return {
    ok:response.ok,
    status:response.status,
    async json(){
      const data=await response.json();
      if(isCards&&Array.isArray(data.cards)){
        data.cards=data.cards.filter(c=>c.id!=='P089');
      }
      if(isDecks&&Array.isArray(data.decks)){
        for(const deck of data.decks){
          if(deck?.cards?.P089)delete deck.cards.P089;
        }
      }
      return data;
    }
  };
};

const baseEnterEffect=Game.prototype.enterEffect;
Game.prototype.enterEffect=async function(x,previous){
  if(x?.id==='P067'){
    // Current School Bully has only its printed keywords. No legacy iPad -1 Power trigger.
    return;
  }
  return baseEnterEffect.call(this,x,previous);
};
