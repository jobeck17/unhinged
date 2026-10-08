import {cardFace} from './card-face.js?v=face-02';
const demos=document.querySelector('#demos');
try{
 const response=await fetch('../CARDS.json');if(!response.ok)throw Error('Card data unavailable');
 const pool=await response.json();
 const samples=[['P003','Character','Three clearly labeled stats. Traits and ability are separate from the title.'],['P030','Item','A comically tiny art strip: the instructions have taken over the card.'],['P085','Action','The same frame, with the one-time effect given the full rules space.']];
 demos.innerHTML=samples.map(([id,type,note])=>{const c=pool.cards.find(c=>c.id===id);if(!c)throw Error('Missing demo card '+id);return `<figure class="print-demo">${cardFace(c)}<figcaption><b>${type}</b> · ${note}</figcaption></figure>`}).join('');
 document.querySelector('#print').onclick=()=>window.print();
}catch(error){demos.textContent=error.message}
