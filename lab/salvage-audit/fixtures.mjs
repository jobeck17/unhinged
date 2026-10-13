import fs from 'node:fs';
import {Game} from './salvage.mjs';
export {Game};
export const draft=JSON.parse(fs.readFileSync(new URL('../../brainstorm/salvage-audit/STARTING_DRAFT.json',import.meta.url)));
const production=JSON.parse(fs.readFileSync(new URL('../../CARDS.json',import.meta.url)));
export const pool={...production,cards:[...production.cards.filter(c=>!draft.cards.some(y=>y.id===c.id)&&c.id!=='P101'),...draft.cards,{...draft.banked.find(c=>c.id==='P101'),status:'banked'}]};
export const doc=JSON.parse(fs.readFileSync(new URL('../../DECKS.json',import.meta.url)));
const cards=Object.fromEntries(draft.cards.map(c=>[c.id,1]));
for(const id of ['P094','P104','LAB-SAL-002','P110','P118','P120','LAB-SAL-001','P119'])cards[id]++;
export const coverage={name:'Salvage audit coverage',leader:'Trash Baron',styles:['Salvage'],composure:20,cards};
export const focused={name:'Salvage Item-focused trial',leader:'Trash Baron',styles:['Salvage'],composure:20,cards:{P094:3,P104:2,P097:1,P106:1,P091:1,P100:1,P103:1,'LAB-SAL-003':2,P096:1,P099:1,P102:1,P107:1,P093:1,P105:1,P092:1,P108:1,P110:2,'LAB-SAL-002':1,P118:2,P120:2,P112:1,P117:1,P119:3,'LAB-SAL-001':2,P109:1,P114:1,P113:2,P115:1,P111:1}};
export function fixture(decide,leader='Trash Baron'){
 let g;g=new Game(pool,{decks:[{...coverage,leader},doc.decks.find(d=>d.leader==='Florida Man')]},async r=>{const v=decide?.(r,g);return v!==undefined?v:r.multi?r.options.slice(0,r.min??r.max??1).map(o=>o.value):r.options[0]?.value??null},()=>{},{firstPlayer:0});g.round=4;g.turn=0;g.turnSerial=7;
 for(const s of g.players)Object.assign(s,{board:[],hand:[],discard:[],deck:Array(50).fill('P001'),stash:Array(20).fill('P001'),stashReady:Array(20).fill(true),salTemp:Array(20).fill(false),fuel:20,salDismissed:0});return g;
}
export function body(g,id,p=0){const x=g.enter(p,id);x.born=0;x.enteredTurn=0;return x;}
export async function play(g,id){const s=g.players[0],index=s.hand.length;s.hand.push(id);return g.playCard(0,id,'hand',g.card(id).cost,{index});}
