import {cardFace} from './card-face.js?v=face-01';
const demos=document.querySelector('#demos');
try{
 const response=await fetch('../CARDS.json');if(!response.ok)throw Error('Card data unavailable');
 const pool=await response.json();
 const samples=[['P003','Character','Three clearly labeled stats. Traits and ability are separate from the title.'],['P028','Item','The same frame, with an attachment rule and no Character stat boxes.'],['P085','Action','The same frame, with the one-time effect given the full rules space.']];
 demos.innerHTML=samples.map(([id,type,note])=>{const c=pool.cards.find(c=>c.id===id);if(!c)throw Error('Missing demo card '+id);return `<figure class="print-demo">${cardFace(c)}<figcaption><b>${type}</b> · ${note}</figcaption></figure>`}).join('');
 document.querySelector('#print').onclick=()=>window.print();
}catch(error){demos.textContent=error.message}
