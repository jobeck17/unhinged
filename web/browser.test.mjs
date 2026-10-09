// Optional browser verification. Run a local HTTP server, then:
// PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node web/browser.test.mjs
// BROWSER_BASE_URL can point at deployed Pages. Fixtures are injected only into
// the intercepted test response; production has no exposed test-state API.
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=(process.env.BROWSER_BASE_URL||'http://127.0.0.1:8765/').replace(/\/?$/,'/');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',async d=>{errors.push(d.message());await d.dismiss()});
const fixtureCode=`
 globalThis.__audit={get:()=>game,fixture:(spec={})=>{
  human=0;busy=false;modal=null;selected.clear();
  const magician=decks.decks.find(d=>d.leader==='Birthday Party Magician'),enemy=decks.decks.find(d=>d.leader==='Florida Man');
  game=new Game(pool,{decks:[magician,enemy]},ask,()=>{if(phase==='playing'&&!modal)render()},{firstPlayer:0});game.round=3;game.turn=0;game.turnSerial=5;
  for(const s of game.players)Object.assign(s,{board:[],hand:[],discard:[],deck:Array(80).fill('P001'),stash:Array(8).fill('P001'),fuel:8,stashReady:Array(8).fill(true)});
  game.players[0].hand=spec.hand||[];
  for(const [p,ids] of [[0,spec.own||[]],[1,spec.opp||[]]])for(const id of ids){const x=game.enter(p,id);x.born=0;if(id==='P136')x.guard=10}
  if(spec.dice)game.diceRolls=spec.dice;
  phase='playing';render();
 }};
`;
await page.route('**/web/app.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:await response.text()+fixtureCode})});
try{
 // Normal bootstrap and actual buttons, before inserting test fixtures.
 await page.goto(base+'web/');await page.waitForSelector('#start');await page.selectOption('#you',{label:'Birthday Party Magician · Misdirection'});await page.click('#start');await page.click('#keep');await page.waitForSelector('#end');
 assert((await page.locator('.leader-passive').allTextContents()).some(t=>t.includes('The Show Must Go On')));
 await page.click('#inspect-stash');assert.match(await page.locator('.sheet').innerText(),/Your Stash/);await page.click('#close');
 // Actual End Turn remains usable after scrolling and returns from the AI turn.
 await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.click('#end');await page.waitForSelector('#end',{timeout:30000});
 // Every production deck starts, permits a mulligan selection and enters the phone table.
 await page.click('#new');const deckCount=await page.locator('#you option').count();
 for(let deckIndex=0;deckIndex<deckCount;deckIndex++){
  await page.selectOption('#you',String(deckIndex));await page.click('#start');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mulligan page fits');
  await page.locator('[data-zone="hand"]').first().click();assert(await page.locator('.card.selected').count(),'mulligan selection works');
  await page.click('#keep');await page.waitForSelector('#end');
  if(deckIndex<deckCount-1)await page.click('#new');
 }
 console.log('All eight decks passed portrait setup/mulligan; real End Turn/AI round trip passed');
 // Portrait layout, crowded rows, persistent End Turn, and accessible dialog controls.
 for(const [width,height] of [[320,568],[390,844],[430,932]]){
  await page.setViewportSize({width,height});
  await page.evaluate(()=>globalThis.__audit.fixture({hand:['P003','P030','P085','P005','P007','P028','P001'],own:['P001','P002','P003','P030','LAB-MAG-005'],opp:['P001','P002','P003','P005','P030']}));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'portrait page fits '+width);
  assert(await page.locator('.slots').first().evaluate(e=>e.scrollWidth>e.clientWidth),'crowded row scrolls locally');
  await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
  const end=await page.locator('#end').boundingBox();assert(end.y>=0&&end.y+end.height<=height,'End Turn stays visible '+width);
  await page.locator('[data-zone="hand"][data-index="1"]').click();
  assert(await page.locator('.physical-detail').isVisible(),'full card inspection visible');
  const close=await page.locator('#close').boundingBox();assert(close.y>=0&&close.y+close.height<=height,'detail Close fits '+width);
  assert(await page.locator('.sheet').evaluate(e=>e.scrollWidth<=e.clientWidth),'detail has no sideways scroll');
  await page.click('#close');
  await page.evaluate(()=>globalThis.__audit.fixture({hand:['P003'],dice:[{label:'Homemade Launch Ramp',value:6,outcome:'Next Attack gets +2 Power and also Causes Trouble.'}]}));
  assert(await page.locator('.dice-result').isVisible(),'dice result visible');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'dice result fits '+width);
  await page.evaluate(()=>{globalThis.__audit.get().ask({player:0,title:'Choose cards from a crowded board',multi:true,min:1,max:1,options:Array.from({length:24},(_,i)=>({label:'Character option '+i,value:i}))});});
  const confirm=await page.locator('#done').boundingBox();assert(confirm.y>=0&&confirm.y+confirm.height<=height,'long-choice Confirm stays visible '+width);
  await page.locator('[data-c]').first().click();await page.click('#done');
  await page.evaluate(()=>{const g=globalThis.__audit.get();g.players[0].stash=Array(24).fill('P001');g.players[0].stashReady=Array(24).fill(true);});
  await page.click('#inspect-stash');const stashClose=await page.locator('#close').boundingBox();assert(stashClose.y>=0&&stashClose.y+stashClose.height<=height,'long Stash Close stays visible '+width);await page.click('#close');
 }
 await page.setViewportSize({width:390,height:844});
 console.log('Portrait layout verification passed: 320/390/430px, crowded Character/Item rows, full card inspection and fixed End Turn');
 // Accidental Play: Cancel works with no selection and with a partial payment selection.
 for(const selectSlot of [false,true]){
  await page.evaluate(()=>globalThis.__audit.fixture({hand:['P063'],own:['P061']}));
  const before=await page.evaluate(()=>JSON.stringify(globalThis.__audit.get().players));
  await page.locator('[data-zone="hand"][data-index="0"]').click();await page.click('#play');await page.waitForSelector('#done');
  if(selectSlot)await page.locator('[data-c]').first().click();
  assert(await page.locator('#done').isDisabled(),'exact payment still required');await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.waitForSelector('#end');
  assert.equal(await page.evaluate(()=>JSON.stringify(globalThis.__audit.get().players)),before,'Cancel preserves hand, board and Stash');
  assert.equal(await page.locator('.overlay').count(),0,'Cancel closes payment prompt');
 }
 console.log('Payment Cancel browser verification passed: unselected and partial selection, no state changes');
 // Exercise every Action through the production detail/Play/choice modal UI.
 const cases=[
  {id:'P081',opp:['P076'],test:s=>assert.equal(s.opp[0].ready,false)},
  {id:'P084',hand:['P068'],test:s=>{assert(s.hand.includes('P001'));assert(s.stash.includes('P068'));assert.equal(s.fuel,7)}},
  {id:'P090',own:['P077'],test:s=>assert.equal(s.own[0].poof,true)},
  {id:'P080',own:['P063'],hand:['LAB-MAG-006'],opp:['P136'],test:s=>{assert(s.hand.includes('P063'));assert(s.own.some(x=>x.id==='LAB-MAG-006'));assert.equal(s.fuel,7)}},
  {id:'P086',own:['P067'],opp:['P076'],test:s=>{assert.equal(s.own.length,0);assert.equal(s.opp.length,0);assert(s.discard.includes('P067'))}},
  {id:'P082',opp:['P076','P136'],test:s=>assert.equal(s.opp.length,1)},
  {id:'LAB-MAG-002',test:s=>assert.equal(s.hand.length,1)},
  {id:'P142',opp:['P148'],test:s=>{assert.equal(s.opp.length,0);assert.equal(s.hand.length,1)}},
  {id:'P079',hand:['P076','P076'],test:s=>{assert(s.own.some(x=>x.id==='P076'));assert.equal(s.hand.length,1)}},
  {id:'P085',test:s=>assert.equal(s.hand.length,2)}
 ];
 for(const spec of cases){
  await page.evaluate(spec=>globalThis.__audit.fixture({...spec,hand:[spec.id,...spec.hand||[]]}),{id:spec.id,hand:spec.hand,own:spec.own,opp:spec.opp});
  await page.locator('[data-zone="hand"][data-index="0"]').click();await page.click('#play');
  for(let n=0;n<20;n++){
   const sheet=page.locator('.sheet');if(!await sheet.count()){if(await page.locator('#end').count())break;await page.waitForTimeout(10);continue}
   const title=await sheet.locator('h2').innerText();
   if(await page.locator('#done').count()){
    const count=Number(title.match(/exactly (\d+)/)?.[1]||0);assert(await page.locator('#done').isDisabled()===!!count,'minimum selection enforced');
    for(let i=0;i<count;i++)await page.locator('[data-c]').nth(i).click();await page.click('#done');
   }else{
    const choice=title.startsWith('Now You See Me: Play')?page.locator('[data-c]').filter({hasText:'Dove'}):page.locator('[data-c]').first();await choice.click();
   }
   await page.waitForTimeout(10);
  }
  await page.waitForSelector('#end');
  const snapshot=await page.evaluate(()=>{const g=globalThis.__audit.get(),s=g.players[0];return{hand:s.hand,stash:s.stash,fuel:s.fuel,discard:s.discard,own:s.board.map(x=>({id:x.id,ready:x.ready,poof:x.poofTurn===g.turnSerial})),opp:g.players[1].board.map(x=>({id:x.id,ready:x.ready}))}});
  spec.test(snapshot);
 }
 // Real Trap Door / Dismiss / release UI, stored inspection and immediate Trouble.
 await page.evaluate(()=>globalThis.__audit.fixture({hand:['P086'],own:['P078','LAB-MAG-009'],opp:['P076']}));
 await page.locator('[data-zone="hand"][data-index="0"]').click();await page.click('#play');
 for(let n=0;n<8;n++){if(!await page.locator('.sheet').count()){if(await page.locator('#end').count())break;await page.waitForTimeout(10);continue}const title=await page.locator('.sheet h2').innerText();if(await page.locator('#done').count()){const count=Number(title.match(/exactly (\d+)/)?.[1]||0);for(let i=0;i<count;i++)await page.locator('[data-c]').nth(i).click();await page.click('#done')}else await page.locator('[data-c]').first().click();await page.waitForTimeout(10)}
 const trapUid=await page.evaluate(()=>globalThis.__audit.get().players[0].board.find(x=>x.id==='LAB-MAG-009').uid);
 await page.locator(`[data-uid="${trapUid}"]`).click();assert.match(await page.locator('.sheet').innerText(),/Stored face-down: Heckler/);await page.click('#activate');
 if(await page.locator('#done').count()){await page.locator('[data-c]').first().click();await page.click('#done')}
 await page.waitForSelector('#end');const hecklerUid=await page.evaluate(()=>globalThis.__audit.get().players[0].board.find(x=>x.id==='P078').uid);await page.locator(`[data-uid="${hecklerUid}"]`).click();assert(await page.locator('#trouble').count(),'released Heckler has Cause Trouble button');await page.click('#close');
 // All Meat Shields offer both entry states through the actual Play modal.
 for(const id of ['P126','P129','P133'])for(const rotated of [false,true]){
  await page.evaluate(id=>globalThis.__audit.fixture({hand:[id]}),id);
  await page.locator('[data-zone="hand"][data-index="0"]').click();await page.click('#play');
  await page.waitForSelector('#done');const title=await page.locator('.sheet h2').innerText(),cost=Number(title.match(/exactly (\d+)/)[1]);
  for(let i=0;i<cost;i++)await page.locator('[data-c]').nth(i).click();await page.click('#done');
  await page.getByRole('heading',{name:/enter Rotated for Meat Shield/}).waitFor();
  assert.equal(await page.getByRole('button',{name:'Enter Ready',exact:true}).count(),1);
  assert.equal(await page.getByRole('button',{name:'Enter Rotated',exact:true}).count(),1);
  await page.getByRole('button',{name:rotated?'Enter Rotated':'Enter Ready',exact:true}).click();await page.waitForSelector('#end');
  const ready=await page.evaluate(id=>globalThis.__audit.get().players[0].board.find(x=>x.id===id).ready,id);assert.equal(ready,!rotated);
 }
 console.log('Meat Shield browser verification passed: Ready and Rotated entry choices for Crossing Guard, HOA Vice President and Gated Community Security');
 await page.setViewportSize({width:1280,height:900});
 // Builder: visible 32-card pool, baseline, Leader text and saved ID migration.
 await page.goto(base+'builder/');await page.waitForSelector('#leader');await page.selectOption('#leader','Birthday Party Magician');assert.match(await page.locator('#resultcount').innerText(),/32 legal cards/);await page.click('#baseline');assert.match(await page.locator('.count').innerText(),/40\/40/);assert.match(await page.locator('.construction-note').innerText(),/For My Next Trick/);assert.match(await page.locator('#grid').innerText(),/Trap Door/);assert.doesNotMatch(await page.locator('#grid').innerText(),/Conspiracy Blogger|Do Not Look in the Hat/);
 await page.evaluate(()=>localStorage.setItem('unhinged-builder-mordecai-04',JSON.stringify({leader:'Birthday Party Magician',cards:{'LAB-MAG-001B':1,P089:1}})));await page.reload();await page.waitForSelector('#leader');const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('unhinged-builder-mordecai-04')));assert.equal(saved.cards['LAB-MAG-001A'],1);assert.equal(saved.cards['LAB-MAG-004'],1);assert(!saved.cards.P089);
 assert.deepEqual(errors,[],'no browser exceptions or error dialogs');
 console.log('Browser verification passed: all 10 Action UIs, exact Stash payment, Trap Door release/Heckler, builder 32-card pool/40-card deck and saved migrations');
}catch(error){await page.screenshot({path:'/tmp/misdirection-browser-failure.png',fullPage:true});console.error(await page.locator('body').innerText());throw error}finally{await browser.close()}
