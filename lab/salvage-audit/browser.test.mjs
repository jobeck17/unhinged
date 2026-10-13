import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
page.on('pageerror',e=>errors.push(String(e)));
page.on('dialog',async d=>{errors.push(d.message());await d.dismiss()});
const base=process.env.BROWSER_BASE_URL||'http://127.0.0.1:8765/';
const fixture=`
globalThis.__salvage={get:()=>game,fixture:(hand=[],own=[],opp=[])=>{
 human=0;busy=false;modal=null;selected.clear();
 game=new Game(pool,{decks:[decks.decks[0],decks.decks[2]]},ask,()=>{}, {firstPlayer:0});
 game.round=3;game.turn=0;game.turnSerial=5;
 for(const s of game.players)Object.assign(s,{hand:[],board:[],discard:[],deck:Array(30).fill('P001'),stash:Array(8).fill('P001'),stashReady:Array(8).fill(true),fuel:8,salTemp:Array(8).fill(false)});
 game.players[0].hand=hand;
 for(const [p,ids] of [[0,own],[1,opp]])for(const id of ids){const x=game.enter(p,id);x.born=0;x.enteredTurn=0;}
 phase='playing';render();
}};
`;
await page.route('**/lab/salvage-audit/app.js',async route=>{const response=await route.fetch();await route.fulfill({response,body:await response.text()+fixture})});
try{
 await page.goto(base+'lab/salvage-audit/');await page.waitForSelector('#start');
 assert.equal(await page.locator('#you option').count(),5);
 for(let i=0;i<5;i++){
  await page.selectOption('#you',String(i));await page.click('#start');await page.click('#keep');await page.waitForSelector('#end');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.click('#end');await page.waitForSelector('#end',{timeout:30000});await page.click('#new');
 }
 await page.evaluate(()=>__salvage.fixture(['P118']));
 await page.locator('[data-zone="hand"]').click();await page.click('#play');
 await page.waitForSelector('#done');await page.locator('[data-c]').first().click();await page.click('#done');await page.waitForSelector('[data-zone="board"]');
 await page.locator('[data-zone="board"]').click();assert.equal(await page.locator('#activate').count(),0,'reactive Zip has no manual activation');await page.click('#close');
 // Dismissing an actual Item presents the leader destination choice in the UI.
 await page.evaluate(()=>__salvage.fixture([],['P119'],['P001']));
 await page.locator('[data-zone="board"][data-p="0"]').click();await page.click('#activate');
 await page.waitForSelector('[data-c]');await page.locator('[data-c]').first().click();
 await page.waitForFunction(()=>document.querySelector('.sheet h2')?.textContent==='Salvage destination');
 await page.getByRole('button',{name:'Temporary Stash',exact:false}).click();
 await page.waitForFunction(()=>__salvage.get().players[0].salTemp.some(Boolean));
 await page.click('#inspect-stash');assert.match(await page.locator('.sheet').innerText(),/temporary Item/);await page.click('#close');
 assert.deepEqual(errors,[]);console.log('Salvage phone browser passed: five lists, mulligan, AI turn, reactive Zip, dismissal destination, temporary Stash inspection; no browser errors.');
}finally{await browser.close()}
