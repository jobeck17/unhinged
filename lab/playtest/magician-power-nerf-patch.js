// STANK INDUSTRIES LAB ONLY — lower raw Magician attack power so tricks matter more.
// Escape Artist, School Bully, and Tech Bro are 3 Power in this LAB.
const IDS=new Set(['P065','P067','P070']);
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
      if(Array.isArray(data.cards)){
        for(const card of data.cards)if(IDS.has(card.id))card.power=3;
      }
      return data;
    }
  };
};
