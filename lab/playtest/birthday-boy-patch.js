// STANK INDUSTRIES LAB ONLY — Birthday Party Magician experiment.
// Birthday Kid becomes Birthday Boy: a 2-cost 2/1 that swaps a chosen Stash card with a chosen hand card on entry.
import {Game} from './engine.js?v=rulebreakers-1';

const OLD_ID='P062';
const CARD_ID='LAB-MAG-003';

// Patch LAB browser data only. Canonical CARDS.json / DECKS.json stay untouched.
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
        const old=data.cards.find(c=>c.id===OLD_ID);
        if(old){
          old.id=CARD_ID;
          old.name='Birthday Boy';
          old.cost=2;
          old.power=2;
          old.guard=1;
          old.text='When this enters play, you may exchange a card in your Stash with a card in your hand.';
          old.style='Misdirection';
          old.complexity='on_play';
          old.status='lab';
        }
      }
      if(isDecks&&Array.isArray(data.decks)){
        for(const deck of data.decks){
          if(deck.cards?.[OLD_ID]){
            deck.cards[CARD_ID]=(deck.cards[CARD_ID]||0)+deck.cards[OLD_ID];
            delete deck.cards[OLD_ID];
          }
        }
      }
      return data;
    }
  };
};

async function birthdayBoySwap(p){
  const s=this.players[p];
  if(!s?.stash?.length||!s?.hand?.length)return;

  const stashIndex=await this.choose(
    p,
    'Birthday Boy: What card do you want to replace from Stash?',
    s.stash.map((id,i)=>({label:`${this.card(id).name} · Cost ${this.card(id).cost}`,value:i})),
    true
  );
  if(stashIndex==null)return;

  const handIndex=await this.pickHand(
    p,
    'Birthday Boy: Which card from your hand do you want to replace it with?'
  );
  if(handIndex==null)return;

  const stashId=s.stash[stashIndex];
  const handId=s.hand[handIndex];

  // If the chosen card was the setup temporary Stash, retrieving it ends that temporary-Stash status.
  const tempIndex=s.tempStashCard==null?-1:s.stash.indexOf(s.tempStashCard);
  if(stashIndex===tempIndex)s.tempStashCard=null;

  s.stash[stashIndex]=handId;
  s.hand[handIndex]=stashId;
  this.say('Birthday Boy swaps a card between hand and Stash');
}

const basePlayCard=Game.prototype.playCard;
Game.prototype.playCard=async function(p,id,...args){
  const before=new Set(this.players[p]?.board?.map(x=>x.uid)||[]);
  const result=await basePlayCard.call(this,p,id,...args);
  if(id===CARD_ID){
    const entered=this.players[p]?.board?.some(x=>x.id===CARD_ID&&!before.has(x.uid));
    if(entered)await birthdayBoySwap.call(this,p);
  }
  return result;
};
