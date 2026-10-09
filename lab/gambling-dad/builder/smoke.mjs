import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const read=relative=>JSON.parse(readFileSync(new URL(relative,import.meta.url),'utf8'));
const canonical=read('../../../CARDS.json');
const canonicalDecks=read('../../../DECKS.json');
const lab=read('../cards.json');
const labDeck=read('../deck.json');
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const code=readFileSync(new URL('./app.js',import.meta.url),'utf8');
const canonicalApp=readFileSync(new URL('../../../builder/app.js',import.meta.url),'utf8');
assert.match(html,/Gambling Dad LAB Deck Builder/);
assert.match(html,/src="app.js\?v=gd-builder/);
assert.match(html,/\.\.\/\.\.\/\.\.\/builder\/style\.css/);
assert.doesNotMatch(canonicalApp,/unhinged-gambling-dad-lab-builder/);
assert.equal(Object.values(labDeck.cards).reduce((a,b)=>a+b,0),39);
assert.equal(labDeck.cards['LAB-GD-013'],3);
assert.equal(labDeck.cards['LAB-GD-018'],4);
assert(lab.cards.some(c=>c.name==='Bluff'));
assert(!canonical.cards.some(c=>c.id.startsWith('LAB-GD-')));
assert(!canonicalDecks.decks.some(d=>d.leader==='Gambling Dad'));

// Run the actual browser builder with mocked fetch/DOM/storage.
const elements=new Map();
function getElement(selector){
 if(!elements.has(selector))elements.set(selector,{innerHTML:'',value:'',dataset:{},
   remove(){},classList:{add(){},remove(){}},appendChild(){}});
 return elements.get(selector);
}
const storage=new Map();
const document={
 querySelector:getElement,
 querySelectorAll:()=>[],
 createElement:()=>({innerHTML:'',textContent:'',remove(){}}),
 body:{appendChild(){}}
};
const page=new URL('./index.html',import.meta.url);
const context=vm.createContext({
 document,localStorage:{
   getItem:key=>storage.get(key)??null,
   setItem:(key,value)=>storage.set(key,value)
 },
 fetch:async url=>{
   const file=fileURLToPath(new URL(url,page));
   const data=JSON.parse(readFileSync(file,'utf8'));
   return {ok:true,json:async()=>data};
 },
 setTimeout:()=>0,confirm:()=>true,
 navigator:{clipboard:{writeText:async()=>{}}}
});
vm.runInContext(code+'\nglobalThis.__test={state,isLegal,visibleCards,normalize,total,loadBaseline,exportText,add,importText,SAVE};',context);
await new Promise(resolve=>setImmediate(resolve));
const t=context.__test;
assert(t,'test hooks loaded');
assert.equal(t.state.leader,'Gambling Dad');
assert.equal(t.total(),39,'39-card Gambling Dad lab baseline loads by default');
assert.equal(t.state.cards['LAB-GD-013'],3);
assert.equal(t.state.cards['LAB-GD-018'],4);
assert.match(getElement('#app').innerHTML,/Gambling Dad LAB/);
assert(t.visibleCards().some(c=>c.id==='LAB-GD-013'),'Bluff is displayed');
assert(t.visibleCards().some(c=>c.id==='LAB-GD-018'),'Slot Machine is displayed');
assert(t.state.decks.decks.some(d=>d.leader==='Florida Man'),'canonical control Leaders still available');
assert(!t.visibleCards().some(c=>c.id.startsWith('LAB-SCI-')),'Mad Scientist reserved cards are excluded for Dad');

const dadOnly=lab.cards.find(c=>c.id==='LAB-GD-013');
assert(t.isLegal(dadOnly),'Bluff is legal for Gambling Dad');
t.add('LAB-GD-014');
assert.equal(t.total(),40,'can add one card to complete draft to 40');
assert.match(t.exportText(),/LAB-GD-013 Bluff/);
assert.match(t.exportText(),/Gambling Dad LAB/);
assert.match(storage.get('unhinged-gambling-dad-lab-builder-01'),/Gambling Dad/);
assert(!storage.has('unhinged-builder-mordecai-04'),'does not touch canonical builder saves');

t.state.leader='Florida Man';t.state.secondary='';t.normalize();
assert(!t.isLegal(dadOnly),'lab Gambler card not legal for canonical Leader');
assert(!t.visibleCards().some(c=>c.id.startsWith('LAB-GD-')));
assert.equal(t.total(),0,'switching away strips Dad-only cards');
t.loadBaseline();
assert.equal(t.total(),40,'canonical Leader baseline still loads');
t.state.leader='Gambling Dad';t.loadBaseline();
assert.equal(t.total(),39,'lab draft baseline remains unchanged');
assert.equal(t.state.cards['LAB-GD-013'],3);
console.log('PASS: Gambling Dad lab builder loads, edits 39->40, exports, preserves leader separation and isolated saves');
