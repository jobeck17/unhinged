import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const pool=JSON.parse(readFileSync(new URL('../CARDS.json',import.meta.url)));
const decks=JSON.parse(readFileSync(new URL('../DECKS.json',import.meta.url)));
const app=readFileSync(new URL('./app.js',import.meta.url),'utf8');
assert.equal(pool.version,'0.4-mordecai');
assert(pool.cards.length>=225);
assert.equal(decks.decks[0].audit_card_ids.length,32);
assert.equal(decks.decks.length,8);
assert.match(app,/Deck Builder · Mordecai 0\.4/);
assert.match(app,/TROUBLE/);
assert.match(app,/HEALTH/);
assert.doesNotMatch(app,/Deck Builder · Carl 0\.3/);
assert.match(app,/>Power</);
assert.doesNotMatch(app,/>Guard</);
assert.match(app,/LAB-CAT-001'\?10:4/);
assert.match(app,/\[A-Z0-9-\]\+/);
assert.match(app,/LAB-TOK-/);
for(const d of decks.decks){
 const count=Object.values(d.cards).reduce((a,b)=>a+b,0);
 assert.equal(count,40,d.leader+' baseline must contain 40 cards');
 for(const id of Object.keys(d.cards))assert(pool.cards.some(c=>c.id===id),d.leader+' references missing '+id);
}
const cat=decks.decks.find(d=>d.leader==='Crazy Cat Lady');
assert(cat.deckbuilding_exception?.includes('10 copies of Stray Cat'));
assert.equal(cat.cards['LAB-CAT-001'],6);
console.log('Mordecai deck builder sync smoke passed');

const hoa=decks.decks.find(d=>d.leader==='HOA President');
assert.equal(hoa.audit_card_ids.length,33);
assert(hoa.audit_card_ids.every(id=>hoa.cards[id]));
assert(hoa.breaking_point.includes('Final Warning'));
assert(pool.cards.find(c=>c.id==='P150').status==='banked');
assert.equal((app.match(/leaderText\(\)/g)||[]).length,2,'Leader rules are actually rendered');
assert.match(app,/!TYPES.includes\(c.type\)/,'Effect records are not deck cards');
console.log('Stonewall builder pool, baseline and Leader text checks passed');
