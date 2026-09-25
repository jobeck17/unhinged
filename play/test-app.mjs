import assert from 'node:assert/strict';
import fs from 'node:fs';
let html='',buttons=[];const root={set innerHTML(x){html=x;buttons=[...x.matchAll(/data-start="(\d+)"/g)].map(m=>({dataset:{start:m[1]}}))},get innerHTML(){return html},querySelectorAll(q){return q==='[data-start]'?buttons:[]},querySelector(q){if(q==='#back')return null;if(q==='.setup .lane')return {scrollLeft:0};if(q==='#keep')return {onclick:null};return null}};
globalThis.document={querySelector:q=>q==='#app'?root:null};globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(new URL('../'+url.slice(3),import.meta.url)))});
await import('./app.js');assert.equal(buttons.length,6,'six Leaders shown');assert(html.includes('Backyard Wrestler'));assert(html.includes('Character Lab 2'));assert(html.includes('deck identity and 25 Health'));assert(!html.includes('Charge')&&!html.includes('Ultimate')&&!html.includes('Ability used')&&!html.includes('data-leader'));assert(html.includes('Vacuum Goes BRRR'));assert(html.includes('third Action'));assert.equal((html.match(/★ /g)||[]).length,3,'three featured decks');
buttons.find(x=>x.dataset.start==='1').onclick();assert.equal(buttons.length,5,'five different opponents');assert(html.includes('Choose your<br>opponent.'));
buttons.find(x=>x.dataset.start==='5').onclick();assert(html.includes('Mulligan'));assert(html.includes('Washed-Up Rock Star'));assert(html.includes('selected to replace'));
console.log('Six Leader buttons, opponent choice, mulligan screen: OK');
