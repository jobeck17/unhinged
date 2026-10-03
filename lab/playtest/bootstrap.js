// LAB browser bootstrap. Load experimental patches in a deterministic order,
// then let the player choose bot play or local two-player.
await import('./snowball-patch.js?v=lab-18');
await import('./lab-patches.js?v=lab-18');
await import('./trojan-cat-patch.js?v=lab-18');
await import('./tuxedo-cat-patch.js?v=lab-18');
await import('./no-retaliation-patch.js?v=lab-18');
await import('./wrestler-retaliate-patch.js?v=lab-18');
await import('./florida-adrenaline-patch.js?v=lab-18');
await import('./stray-cat-patch.js?v=lab-18');
await import('./hairy-cat-patch.js?v=lab-18');

const root=document.getElementById('app');
root.innerHTML=`<div class="setup deck-setup">
  <div class="small">Unhinged · LAB Playtest</div>
  <h1>How do you want to play?</h1>
  <p>Choose a bot match or local two-player on the same device. Both modes use the same LAB rules and experimental cards.</p>
  <div class="deck-picker">
    <button id="play-bot" class="primary deck-start">Play against a bot</button>
  </div>
  <div class="deck-picker">
    <button id="play-two" class="primary deck-start">Local two-player</button>
  </div>
  <p class="muted">TEMP TEST: no universal retaliation · Wrestlers have Retaliate · Florida Man: Adrenaline after attacks (+1 Power / -1 Guard)</p>
</div>`;

let chosen=false;
async function launch(mode){
  if(chosen)return;
  chosen=true;
  root.innerHTML='<div id="boot-status">Loading match…</div>';
  if(mode==='bot') await import('./app.js?v=lab-18');
  else await import('./app-two-player.js?v=lab-18');
}

document.getElementById('play-bot').onclick=()=>launch('bot');
document.getElementById('play-two').onclick=()=>launch('two');
