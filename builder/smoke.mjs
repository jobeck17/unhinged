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

const match=app.match(/const RETIRED_ROCKSTAR_IDS=new Set\((\[[^;]+\])\);/);
assert(match,'Deck builder declares retired Rock Star-era pool');
const rockIds=new Set(JSON.parse(match[1]));
assert.equal(rockIds.size,30,'30 former Momentum cards hidden from the builder');
for(const id of rockIds){
 const c=pool.cards.find(c=>c.id===id);
 assert(c&&c.style==='Momentum',id+' is a former Rock Star Momentum card');
 assert(!decks.decks.some(d=>id in d.cards),id+' is not used by a current starter deck');
}
assert(!rockIds.has('P039'),'Misdirection Card Counter must remain available');
for(let n=181;n<=190;n++)assert(!rockIds.has('P'+n),'New Pawn Shop cards remain available');
assert.match(app,/RETIRED_ROCKSTAR_IDS\.has\(c\.id\)/,'builder legality filters retired Rock Star cards');
assert.match(app,/!isLegal\(c\)/,'saved and imported deck lists drop retired cards');
console.log('Rock Star builder cleanup: 30 old Momentum IDs blocked; Pawn Shop, Cats and Misdirection unaffected');


// Card families are browsing metadata, not new Styles or legality rules.
const pawnCards=pool.cards.filter(c=>c.family==='Pawn Shop');
const catCards=pool.cards.filter(c=>c.family==='Cat Lady');
assert.equal(pawnCards.length,13,'all thirteen Pawn Shop cards are explicitly tagged');
assert.equal(catCards.length,18,'all Cat Lady cards are explicitly tagged');
assert([...pawnCards,...catCards].every(c=>c.style==='Momentum'),'both groups retain Momentum Style');
assert.match(app,/function familyGroups\(\)/,'family filter groups are generated from legal cards');
assert.match(app,/id="family"/,'family chooser shown in library');
assert.match(app,/state\.family!=='All'/,'family chooser limits visible cards without changing construction');
assert.match(app,/Momentum · Special Cat Lady deckbuilding/,'Cat Lady visibly retains Momentum Style');
assert.match(app,/Primary Style/,'every Leader has a distinct primary Style display');
assert.match(app,/style-readout/,'primary Style is read-only rather than a fake dropdown');
assert.match(app,/id=\"special-construction\"/,'restricted Leaders explain the unavailable secondary Style');
assert.match(app,/None · Mono /,'standard Leaders can choose a secondary Style');
assert.doesNotMatch(app,/Rulebreaker pool/,'old ambiguous Cat Lady label removed');
console.log('Momentum groups: Pawn Shop (13), Cat Lady (18); style/legalities unchanged');

const pawn=decks.decks.find(d=>d.leader==='Shady Pawn Shop Owner');
assert.equal(pawn.cards.P191,2,'two-Deal Action has two starter copies');
assert.equal(pawn.cards.P192,2,'Scalper has two starter copies');
assert.equal(pawn.cards.P193,2,'Haggler has two starter copies');
assert.equal(pawn.cards.P187,2,'two Junkyard Visionaries removed');
assert.equal(pawn.cards.P185,2,'two Dress Guy copies replaced');
assert.equal(pawn.cards.P186,2,'two plain Hothead copies were replaced');
assert.equal(pool.cards.find(c=>c.id==='P191').family,'Pawn Shop');
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

const magician=decks.decks.find(d=>d.leader==='Birthday Party Magician');
assert.equal(magician.audit_card_ids.length,32);
assert(magician.audit_card_ids.every(id=>magician.cards[id]));
assert(Object.values(magician.cards).every(n=>n<=4));
assert(magician.passive.includes('The Show Must Go On'));
assert(magician.breaking_point.includes('For My Next Trick'));
assert.equal(pool.cards.filter(c=>c.style==='Misdirection'&&!['banked','retired','pending-redesign'].includes(c.status)).length,32);
assert.match(app,/LAB-MAG-001B','LAB-MAG-001A/);
assert.match(app,/P089','LAB-MAG-004/);
console.log('Misdirection builder pool, migrations, baseline and Leader checks passed');
