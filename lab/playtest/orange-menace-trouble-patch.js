// STANK INDUSTRIES LAB ONLY — Mordecai Trouble tuning for Crazy Cat Lady.
const CARD_ID='LAB-CAT-002';
const originalFetch=globalThis.fetch.bind(globalThis);

globalThis.fetch=async function(input,init){
  const url=typeof input==='string'?input:String(input?.url||'');
  const response=await originalFetch(input,init);
  if(!url.startsWith('../CARDS.json'))return response;
  return {
    ok:response.ok,
    status:response.status,
    async json(){
      const data=await response.json();
      const card=Array.isArray(data.cards)?data.cards.find(c=>c.id===CARD_ID):null;
      if(card)card.trouble=1;
      return data;
    }
  };
};
