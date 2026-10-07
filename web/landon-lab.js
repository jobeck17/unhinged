// Landon/STANK overlay for the Mordecai 0.4 browser playtest.
// Keep experimental tuning here so canonical CARDS.json / DECKS.json stay untouched
// until a change is deliberately promoted.
export function applyLandonLab(pool,decks){
  const cards=pool?.cards||[];
  const orange=cards.find(c=>c.id==='LAB-CAT-002');
  if(orange)orange.trouble=1;
  return {pool,decks};
}
