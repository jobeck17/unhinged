import assert from 'node:assert/strict';
import fs from 'node:fs';

const pool=JSON.parse(fs.readFileSync(new URL('../CARDS.json',import.meta.url)));
const decks=JSON.parse(fs.readFileSync(new URL('../DECKS.json',import.meta.url)));

assert.equal(pool.version,'0.4-mordecai');
assert.equal(decks.card_pool,'0.4-mordecai');
assert.equal(decks.version,'0.4-mordecai-eight');
assert.equal(decks.decks.length,8);
assert.equal(pool.cards.length,223);

const ids=new Set(pool.cards.map(c=>c.id));
assert.equal(ids.size,pool.cards.length,'card IDs must be unique');

for(const deck of decks.decks){
  assert.equal(deck.composure,20,`${deck.leader} should start at 20 Composure`);
  assert.equal(Object.values(deck.cards).reduce((a,b)=>a+b,0),40,`${deck.leader} deck must contain 40 cards`);
  for(const id of Object.keys(deck.cards)) assert(ids.has(id),`${deck.leader} references missing card ${id}`);
}
const cat=decks.decks.find(d=>d.leader==='Crazy Cat Lady');
assert(cat?.deckbuilding_exception?.includes('10 copies of Stray Cat'),'Crazy Cat Lady copy-limit exception should be explicit');

console.log('Mordecai 0.4 production data smoke passed');
