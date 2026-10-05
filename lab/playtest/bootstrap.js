// LAB browser bootstrap. Load experimental patches in a deterministic order,
// then let the player choose bot play or local two-player.
await import('./cat-lady-passive-patch.js?v=stank-industries-56');
await import('./snowball-patch.js?v=stank-industries-56');
await import('./lab-patches.js?v=stank-industries-56');
await import('./trojan-cat-patch.js?v=stank-industries-56');
await import('./tuxedo-cat-patch.js?v=stank-industries-56');
await import('./no-retaliation-patch.js?v=stank-industries-56');
await import('./wrestler-retaliate-patch.js?v=stank-industries-56');
await import('./florida-adrenaline-patch.js?v=stank-industries-56');
await import('./broken-lawnmower-patch.js?v=stank-industries-56');
await import('./gas-station-daredevil-patch.js?v=stank-industries-56');
await import('./hold-my-beer-patch.js?v=stank-industries-56');
await import('./caffeine-patch.js?v=stank-industries-56');
await import('./stray-cat-patch.js?v=stank-industries-56');
await import('./hairy-cat-patch.js?v=stank-industries-56');
await import('./three-legged-cat-patch.js?v=stank-industries-56');
await import('./shoebox-patch.js?v=stank-industries-56');
await import('./mittens-three-patch.js?v=stank-industries-56');
await import('./this-kid-again-patch.js?v=stank-industries-56');
await import('./rabbit-fix-patch.js?v=stank-industries-56');
await import('./ethans-just-being-dramatic-patch.js?v=stank-industries-56');
await import('./birthday-boy-patch.js?v=stank-industries-56');
await import('./moving-out-again-patch.js?v=stank-industries-56');

const root=document.getElementById('app');
root.innerHTML=`<div class="setup deck-setup">
  <div class="small">STANK INDUSTRIES-56</div>
  <h1>How do you want to play?</h1>
  <p>Choose a bot match or local two-player on the same device. Both modes use the same LAB rules and experimental cards.</p>
  <div class="deck-picker">
    <button id="play-bot" class="primary deck-start">Play against a bot</button>
  </div>
  <div class="deck-picker">
    <button id="play-two" class="primary deck-start">Local two-player</button>
  </div>
  <p class="muted">TEMP TEST: no universal retaliation · Wrestlers have Retaliate · Florida Man Adrenaline triggers once, then falls to 1 Power · Gas Station Daredevil is +1 Power for 1 self-damage · 3 Broken Lawnmowers, no Fireworks Incident · Hold My Beer is a 2-cost tempo trick · Send It! and No, I'm Fine replaced by 2× A MILLION KILOGRAMS OF CAFFEINE!!!! + 2× Rusty Needle · Crazy Cat Lady passive is Strength in Numbers............ Mostly Numbers........ Probably.: below 3 Cats she may Stash twice; at 3+ Cats she Draws an additional card · Stray Cat is 1/2 · Orange Menace costs 1 · Tuxedo Cat is 1/4 · Three-Legged Cat is a 4-cost 2/1 that survives its first two Attacks · Hairy Cat is 1/6 · Hairball permanently gives -1 Guard and skips the next Ready · 3× Shoebox of Dead Cats + 4× Shovel + 2× Nine Lives, Zero Survivors + 4× Mittens III · Trojan Cat, House Panther, Cat Under the Bed, and Maine Coon removed · Stray Cat no longer leaves play after attacking · Shoebox catches combat Defeats and shows buried count in bot play · Birthday Party Magician replaces 2× Look Over There! with 2× Very Enthusiastic Volunteer (2-cost 1/2; permanent +1 Power to another Character when entering/returning; each copy automatically Returns after its first Attack only) · Rabbit now correctly Draws when it enters or leaves play and no longer shows a dead Activate button · 2× Wrong Address replaced by 2× Ethan’s JUST Being Dramatic (1-cost: Return one of your Characters to your hand) · Birthday Kid becomes Birthday Boy (2-cost 2/1; on entry choose a Stash card, then choose a hand card, and exchange them) · Lady Who's Moving Out Again is reworked: 3-cost 3/5 Hothead; +2 Power this Turn on entry; when Returned, may Return an opposing Character costing 2 or less</p>
</div>`;

let chosen=false;
async function launch(mode){
  if(chosen)return;
  chosen=true;
  root.innerHTML='<div id="boot-status">Loading match…</div>';
  if(mode==='bot') await import('./app.js?v=stank-industries-56');
  else await import('./app-two-player.js?v=stank-industries-56');
}

document.getElementById('play-bot').onclick=()=>launch('bot');
document.getElementById('play-two').onclick=()=>launch('two');
