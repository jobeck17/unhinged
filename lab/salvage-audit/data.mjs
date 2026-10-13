const cards=Object.fromEntries([...Array.from({length:30},(_,i)=>`P${String(91+i).padStart(3,'0')}`).filter(id=>id!=='P101'),'LAB-SAL-001','LAB-SAL-002','LAB-SAL-003'].map(id=>[id,1]));
for(const id of ['P094','P104','LAB-SAL-002','P110','P118','P120','LAB-SAL-001','P119'])cards[id]++;
export const coverage={name:'Salvage audit coverage',leader:'Trash Baron',styles:['Salvage'],composure:20,cards};
export const focused={name:'Salvage Item-focused trial',leader:'Trash Baron',styles:['Salvage'],composure:20,cards:{P094:3,P104:2,P097:1,P106:1,P091:1,P100:1,P103:1,'LAB-SAL-003':2,P096:1,P099:1,P102:1,P107:1,P093:1,P105:1,P092:1,P108:1,P110:2,'LAB-SAL-002':1,P118:2,P120:2,P112:1,P117:1,P119:3,'LAB-SAL-001':2,P109:1,P114:1,P113:2,P115:1,P111:1}};

export function applySalvage(pool,decks,draft){
 pool={...pool,cards:[...pool.cards.filter(c=>!draft.cards.some(y=>y.id===c.id)&&c.id!=='P101'),...draft.cards]};
 decks={...decks,decks:[coverage,focused,...decks.decks.filter(d=>['Florida Man','HOA President','Birthday Party Magician'].includes(d.leader))]};
 return {pool,decks};
}
