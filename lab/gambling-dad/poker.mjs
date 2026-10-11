// LAB ONLY: augments the existing Mordecai browser Game without changing canonical code.
export const DAD = "Gambling Dad";
export const PASSIVE = "99 GAMBLERS QUIT BEFORE THEY WIN BIG!";
export function pokerScore(cards, pair) {
  return pair.reduce((n,id)=>n+(cards[id]?.cost??0),0);
}
export function pokerHandType(cards,ids) {
 const a=Number(cards[ids[0]].cost),b=Number(cards[ids[1]].cost);
 if(a===b)return "Matching Pair";
 if(Math.abs(a-b)===1)return "Straight";
 return "High Roller";
}
export function handRank(cards,ids,mode="HIGH") {
 const type=pokerHandType(cards,ids);
 return (mode==="HIGH"
   ? {"Matching Pair":3,"Straight":2,"High Roller":1}
   : {"Matching Pair":1,"Straight":2,"High Roller":3})[type];
}
export function pokerValue(cards,ids,mode="HIGH") {
 return [handRank(cards,ids,mode),pokerScore(cards,ids)];
}
export function compareScores(a,b,mode="HIGH") {
 return Math.sign(a[0]-b[0]) ||
   (mode==="LOW"?Math.sign(b[1]-a[1]):Math.sign(a[1]-b[1]));
}
export const SLOT_MACHINE="LAB-GD-018";
export const BLUFF="LAB-GD-013";
export const PIT_BOSS="LAB-GD-005";
export const DEALERS_CHILD="LAB-GD-003";
export const ROULETTE_SQUATTER="LAB-GD-001";
export function slotPayout(flips,continuePlaying,handSize){
  if(flips.length<2||flips[0]!==flips[1])return {outcome:"MISS",draw:0};
  if(!continuePlaying)return {outcome:"CASH OUT",draw:1};
  if(flips[2]===flips[0])return {outcome:"JACKPOT",draw:Math.max(0,7-handSize)};
  return {outcome:"BUST",draw:0};
}
export function installGamblingDad(Game, LEADERS) {
  LEADERS[DAD]={style:"Gambler",passive:PASSIVE+" — Once during your Turn, you may play Rock Bottom Poker. Win: choose Gain 2 Ready Stash or Draw 2. Lose: lose up to 2 Stash and discard 1 card. At Breaking Point, after a win you may Double Down for a second hand; losing it forfeits your first reward. Only Dad may Fold for 1 Stash."};
  LEADERS[DAD].breaking="Double Down: After winning Rock Bottom Poker, you may risk your reward on a second hand. Win again to choose a second reward.";
  // Lab-only passive support: an active Squatter grants +1 Power to each
  // other friendly even-Cost Character. Resolve dynamically so the bonus
  // immediately starts/stops as Squatters enter or leave play.
  // Multiple Squatters currently stack; monitor four-copy board snowballs.
  const oldPower=Game.prototype.power;
  Game.prototype.power=function(x){
    const power=oldPower.call(this,x);
    if(!x || this.card(x).type!=="Character" || Number(this.card(x).cost)%2!==0)return power;
    return power+this.chars(x.owner).filter(y=>y.id===ROULETTE_SQUATTER&&y.uid!==x.uid).length;
  };
  // LAB ONLY: do not ask players to choose physical Stash cards for ordinary
  // costs. The shared Magician package adds a multi-select payment picker to
  // every play, which makes unrelated Character names appear as Ready Stash.
  // Pay automatically, respecting which Stash slots are Ready and Trash
  // Baron's opponent-first payment rule. Keep actual target and poker choices.
  const normalPreparePayment=Game.prototype.preparePayment;
  Game.prototype.preparePayment=async function(p,n){
    if(typeof this.stashStates!=='function')return normalPreparePayment.call(this,p,n);
    this.stashPayment=null;
    if(n<=0)return true;
    if(this.availableFuel(p)<n)return false;
    const payers=this.name(p)==='Trash Baron'&&!this.decks[1-p].protectedStash?[1-p,p]:[p];
    let remaining=n;
    const payment=[];
    for(const owner of payers){
      const s=this.players[owner],ready=this.stashStates(owner).flatMap((value,i)=>value?[i]:[]);
      const count=Math.min(remaining,s.fuel);
      if(count>ready.length)return false;
      if(count)payment.push({owner,picks:ready.slice(0,count)});
      remaining-=count;
      if(!remaining)break;
    }
    if(remaining)return false;
    this.stashPayment=payment;
    return true;
  };
  // Lab-only casino surveillance. Unlicensed Poker Psychologist can Cause Trouble while Ready,
  // but cannot Attack and cannot Ready while it maintains a mark.
  const oldCanAttack=Game.prototype.canAttack;
  Game.prototype.canAttack=function(x){return x?.id!==PIT_BOSS && oldCanAttack.call(this,x)};
  const oldAdvance=Game.prototype.advance;
  Game.prototype.advance=async function(...args){
    for(const owner of [0,1])for(const pit of this.chars(owner).filter(x=>x.id===PIT_BOSS&&x.pitMark)){
      const target=this.obj(pit.pitMark);
      if(!target){pit.pitMark=null;continue}
      if(pit.pitWasReady && !target.ready){
        this.draw(owner,1);
        this.say("Unlicensed Poker Psychologist: "+this.card(target).name+" Rotated — Draw a card.");
      }
      pit.pitWasReady=!!target.ready;
    }
    return oldAdvance.apply(this,args);
  };
  const oldStart=Game.prototype.startTurn;
  Game.prototype.startTurn=function(...args){
    this.players[this.turn].pokerUsed=false;
    const result=oldStart.apply(this,args);
    for(const owner of [0,1])for(const pit of this.chars(owner).filter(x=>x.id===PIT_BOSS&&x.pitMark)){
      const target=this.obj(pit.pitMark);
      if(target){pit.ready=false;pit.pitWasReady=!!target.ready}
      else pit.pitMark=null;
    }
    return result;
  };
  const oldTrouble=Game.prototype.trouble;
  Game.prototype.trouble=function(x){return oldTrouble.call(this,x)+(x?.pokerTrouble||0)};
  const oldEndRound=Game.prototype.endRound;
  Game.prototype.endRound=async function(...args){
    for(const x of this.chars(this.turn))x.pokerTrouble=0;
    return oldEndRound.apply(this,args);
  };
  const oldCanPlay=Game.prototype.canPlay;
  Game.prototype.canPlay=function(i,p=this.turn){
    return this.players[p].hand[i]!==BLUFF && oldCanPlay.call(this,i,p) && (this.players[p].hand[i]!=="LAB-GD-015"||this.chars(p).length>0);
  };
  const oldCanUse=Game.prototype.canUse;
  Game.prototype.canUse=function(x){
    if(x?.id===PIT_BOSS)return this.winner===null && x.owner===this.turn && x.ready && !x.pitMark && !x.cloaked && this.chars(1-x.owner).some(y=>!y.cloaked);
    if(x?.id===SLOT_MACHINE){
      return this.winner===null && x.owner===this.turn && x.ready && !x.cloaked &&
        this.players[x.owner].fuel>=2 && this.players[x.owner].deck.length>0;
    }
    return oldCanUse.call(this,x);
  };
  const oldActivate=Game.prototype.activate;
  Game.prototype.activate=async function(uid,mode=null){
    const x=this.obj(uid),p=this.turn;
    if(x?.id===PIT_BOSS){
      if(!this.canUse(x))return;
      const available=this.chars(1-p).filter(y=>!y.cloaked);
      const targetUid=await this.ask({player:p,psychologistTarget:true,
        title:"Unlicensed Poker Psychologist — choose an opposing Character",
        options:available.map(y=>({value:y.uid,label:this.card(y).name+" · "+(y.ready?"Ready":"Rotated")}))});
      const target=this.obj(targetUid);
      if(!target||!this.obj(uid)||!this.canUse(x))return;
      x.ready=false;x.pitMark=target.uid;x.pitWasReady=!!target.ready;
      this.say("Unlicensed Poker Psychologist watches "+this.card(target).name+".");
      return this.advance();
    }
    if(x?.id!==SLOT_MACHINE)return oldActivate.call(this,uid,mode);
    if(!this.canUse(x)||!this.payCost(p,2))return;
    x.ready=false;
    this.say("Slot Machine: spends 2 Ready Stash and starts flipping Dad's Lucky Poker Chip.");
    // Only reveal the chip results as they happen. The third flip is not made
    // unless the player deliberately risks their first-two match.
    await this.ask({player:p,slotStart:true});
    const flips=[];
    for(let i=0;i<2;i++){
      flips.push(Math.random()<0.5?"H":"L");
      await this.ask({player:p,slotFlip:true,index:i,face:flips[i]});
    }
    if(flips[0]!==flips[1]){
      await this.ask({player:p,slotFinish:true,slotOutcome:"MISS",flips:[...flips]});
      this.slotLast={flips:[...flips],outcome:"MISS",drawn:0};
      this.say("Slot Machine: first two flips differ. No cards drawn.");
      return;
    }
    const decision=await this.ask({player:p,slotDecision:true,flips:[...flips],handSize:this.players[p].hand.length});
    if(decision==="continue"){
      flips.push(Math.random()<0.5?"H":"L");
      await this.ask({player:p,slotFlip:true,index:2,face:flips[2]});
    }
    const payout=slotPayout(flips,decision==="continue",this.players[p].hand.length);
    const drawn=payout.draw?this.draw(p,payout.draw):0;
    this.slotLast={flips:[...flips],outcome:payout.outcome,drawn};
    await this.ask({player:p,slotFinish:true,slotOutcome:payout.outcome,flips:[...flips],drawn});
    this.say("Slot Machine: "+payout.outcome+" · Draw "+drawn+".");
  };
  // Lab-only information effect: the deck's end is its top (draw() uses pop).
  // Never remove, sort, or log the seen card IDs; only the viewing player may see them.
  const oldEnterEffect=Game.prototype.enterEffect;
  Game.prototype.enterEffect=async function(x,previous){
    await oldEnterEffect.call(this,x,previous);
    if(x?.id!==DEALERS_CHILD||!this.obj(x.uid))return;
    const p=x.owner,opponentDeck=this.players[1-p].deck;
    if(!opponentDeck.length)return;
    const cardIds=opponentDeck.slice(-4).reverse();
    const decision=await this.ask({player:p,dealersChildPeek:true,
      title:"Dealer's Child — look at the opponent's top "+cardIds.length+" cards?",
      cardIds});
    if(decision==="peek")this.say("Dealer's Child peeks at the opposing deck.");
  };
  const oldAction=Game.prototype.actionEffect;
  Game.prototype.actionEffect=async function(p,id,target,second,previous) {
    if(id==="LAB-GD-014"){
      const s=this.players[p],n=Math.min(2,s.stash.length-s.fuel);
      s.fuel+=n;this.say("It's Basically Free Money Readies "+n+" Stash");
      return;
    }
    if(id==="LAB-GD-015"){
      const uid=await this.pick("Cash Out: give +2 Power to your Character",p,this.chars(p));
      const x=this.obj(uid);
      if(x){x.power+=2;this.say(this.card(x).name+" gets +2 Power this Turn")}
      return;
    }
    return oldAction.call(this,p,id,target,second,previous);
  };
  Game.prototype.canPoker=function(p=this.turn) {
    return this.winner===null && this.turn===p && this.name(p)===DAD &&
       !this.players[p].pokerUsed && this.players.every(s=>s.deck.length>=4);
  };
  Game.prototype.dadPoker=async function(p=this.turn) {
    if(!this.canPoker(p))return false;
    const s=this.players[p],opp=1-p;
    s.pokerUsed=true;
    const payouts=[],history=[];
    let doubled=false,lastResult=0;

    // Keep each physical Stash slot in sync with the Magician package. A
    // Stash loss removes actual cards and never accidentally Readies a slot.
    const removeStash=n=>{
      const flags=typeof this.stashStates==="function"?this.stashStates(p):null;
      for(let k=0;k<n&&s.stash.length;k++){
        const i=s.stash.length-1,id=s.stash.pop();
        const owner=s.pokerOrigins?.[i]??p;
        if(s.pokerOrigins?.length>i)s.pokerOrigins.pop();
        const ready=flags?flags.splice(i,1)[0]:s.fuel>0;
        if(ready)s.fuel=Math.max(0,s.fuel-1);
        this.players[owner].discard.push(id);
      }
      s.fuel=Math.min(s.fuel,s.stash.length);
    };
    const resolveRewards=()=>{
      for(const {choice,cards} of payouts){
        if(choice==="stash"){
          if(typeof this.stashStates==="function")this.stashStates(p);
          s.stash.push(...cards);
          while((s.pokerOrigins||=[]).length<s.stash.length-2)s.pokerOrigins.push(p);
          s.pokerOrigins.push(p,p);
          if(s.stashReady)s.stashReady.push(true,true);
          s.fuel+=2;
          this.say("Rock Bottom Poker reward: gain 2 Ready Stash.");
        }else{
          this.players[p].deck.unshift(...cards);
          this.draw(p,2);
          this.say("Rock Bottom Poker reward: Draw 2 cards.");
        }
      }
      payouts.length=0;
    };
    const abandonRewards=()=>{
      for(const {cards} of payouts)this.players[p].deck.unshift(...cards);
      payouts.length=0;
    };
    const loseHand=async()=>{
      removeStash(2);
      if(s.hand.length){
        const options=s.hand.map((id,i)=>({value:i,label:this.card(id).name+" · Cost "+this.card(id).cost}));
        const selected=await this.ask({player:p,pokerLossDiscard:true,title:"Poker loss — discard 1 card from your hand",options});
        const index=options.some(o=>o.value===selected)?selected:0;
        const [discarded]=s.hand.splice(index,1);
        s.discard.push(discarded);
        this.say("Poker loss: discards "+this.card(discarded).name+" from hand.");
      }
      this.say("Rock Bottom Poker: lose up to 2 Stash and discard 1 card from hand (if any).");
      for(const x of this.chars(p)){
        if(x.id==="LAB-GD-004")this.draw(p,1);
        if(x.id==="LAB-GD-012")x.power+=2;
      }
    };
    for(let round=1;round<=2;round++){
    const pokerMode=Math.random()<0.5?"HIGH":"LOW";
    this.pokerMode=pokerMode;
    await this.ask({player:p,pokerChip:true,pokerMode,title:"Dad\u0027s Lucky Poker Chip"});
    const opp=1-p, hands=[[],[]];
    for(let who=0;who<2;who++)for(let i=0;i<4;i++)hands[who].push(this.players[who].deck.pop());
    const options=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]], chosen=[[],[]], scores=[[],[]];
    // Dad may Fold right from the first four-card chooser, not in a separate dialog.
    for(const who of [p,opp]){
      const possibilities=options.map(pair=>{
        const ids=pair.map(i=>hands[who][i]),score=pokerValue(this.cards,ids,pokerMode);
        return {pair,ids,score,label:ids.map(id=>this.card(id).name+" (Cost "+this.card(id).cost+")").join(" + ")+" — "+score[1]+" total Cost"};
      });
      // Offer FOUR individual cards; the player chooses exactly TWO.
      // The best pair is an AI recommendation only, not a prebuilt human choice.
      possibilities.sort((a,b)=>compareScores(b.score,a.score,pokerMode));
      // Bluff is offered on the same poker picker as the hand confirmation.
      // Selecting Redraw commits the chosen pair, then opens one new four-card picker.
      const canBluff=who===p && this.players[p].hand.includes(BLUFF) &&
        this.availableFuel(p)>=2 && this.players[p].deck.length>=2;
      const selection=await this.ask({
        player:who,title:"Rock Bottom Poker: choose TWO of your FOUR cards",
        mandatory:true,pokerCards:true,pokerMode,multi:true,min:2,max:2,
        canBluff,canFold:round===1 && who===p,
        options:hands[who].map((id,i)=>({
          value:i,cardId:id,
          label:this.card(id).name+" · Cost "+this.card(id).cost
        })),
        recommendedPair:possibilities[0].pair
      });
      if(selection==="fold" && round===1 && who===p){
        // Neither side has committed a hand, and no Bluff resources were spent.
        // Return all four of both players' poker cards, then pay the Fold penalty.
        for(const owner of [p,opp])this.players[owner].deck.unshift(...hands[owner]);
        removeStash(1);
        this.pokerLast={mode:pokerMode,result:"FOLD · Lose 1 Stash",folded:true};
        this.say("Rock Bottom Poker: Gambling Dad Folds and loses 1 Stash.");
        this.update?.();
        return "fold";
      }
      const indices=Array.isArray(selection)?selection:selection?.indices;
      if(!Array.isArray(indices)||indices.length!==2||new Set(indices).size!==2||
         indices.some(i=>!Number.isInteger(i)||i<0||i>3))
        throw new Error("Rock Bottom Poker requires exactly two different cards from the four drawn.");
      chosen[who]=indices.map(i=>hands[who][i]);
      let leftover=[0,1,2,3].filter(i=>!indices.includes(i)).map(i=>hands[who][i]);
      // Discard the selected pair, draw two more, and choose any two
      // from those new cards and the original unselected pair.
      if(canBluff && selection?.bluff===true){
        const handIndex=this.players[p].hand.indexOf(BLUFF);
        if(handIndex>=0 && this.availableFuel(p)>=2 && this.players[p].deck.length>=2 && this.payCost(p,2)){
          this.players[p].hand.splice(handIndex,1);
          this.players[p].discard.push(BLUFF,...chosen[p]);
          const mulligan=[...leftover,this.players[p].deck.pop(),this.players[p].deck.pop()];
          const candidates=options.map(pair=>({
            pair,score:pokerValue(this.cards,pair.map(i=>mulligan[i]),pokerMode)
          })).sort((a,b)=>compareScores(b.score,a.score,pokerMode));
          const repick=await this.ask({
            player:p,title:"Bluff: choose TWO of your FOUR cards",
            mandatory:true,pokerCards:true,pokerBluffRepick:true,pokerMode,
            multi:true,min:2,max:2,
            canBluff:false,
            options:mulligan.map((id,i)=>({value:i,cardId:id,
              label:this.card(id).name+" · Cost "+this.card(id).cost})),
            recommendedPair:candidates[0].pair
          });
          if(!Array.isArray(repick)||repick.length!==2||new Set(repick).size!==2||
             repick.some(i=>!Number.isInteger(i)||i<0||i>3))
            throw new Error("Bluff requires choosing two different cards from the replacement four.");
          chosen[p]=repick.map(i=>mulligan[i]);
          leftover=mulligan.filter((_,i)=>!repick.includes(i));
          this.say("Bluff: Spend 2 Ready Stash, Discard the original pair, and pick two from four cards.");
        }
      }
      scores[who]=pokerValue(this.cards,chosen[who],pokerMode);
      this.players[who].deck.unshift(...leftover);
    }
    const result=compareScores(scores[p],scores[opp],pokerMode);
    lastResult=result;
    const prefix="Rock Bottom Poker"+(round===2?" DOUBLE DOWN":"")+" ("+pokerMode+"): "+this.name(p)+" "+pokerHandType(this.cards,chosen[p])+" (Cost "+scores[p][1]+") vs "+this.name(opp)+" "+pokerHandType(this.cards,chosen[opp])+" (Cost "+scores[opp][1]+"). ";
    if(result>0){
      // Winning cards are held until Double Down finishes. This prevents
      // having to undo a Draw reward when the second hand loses.
      this.players[opp].deck.unshift(...chosen[opp]);
      for(const x of this.chars(p)){
        if(x.id==="LAB-GD-008"||x.id==="LAB-GD-009")x.pokerTrouble=(x.pokerTrouble||0)+1;
      }
      for(const item of s.board.filter(x=>x.id==="LAB-GD-017"))this.draw(p,1);
      const reward=await this.ask({player:p,pokerReward:true,round,title:"You won! Choose your poker reward"});
      const choice=reward==="draw"?"draw":"stash";
      payouts.push({choice,cards:chosen[p]});
      this.say(prefix+"Dad WINS. Selected "+(choice==="stash"?"2 Ready Stash":"Draw 2")+".");
    }else if(result<0){
      s.discard.push(...chosen[p]);
      this.players[opp].deck.unshift(...chosen[opp]);
      if(doubled)abandonRewards();
      await loseHand();
      this.say(prefix+"Dad LOSES"+(doubled?" the Double Down; first reward forfeited.":"."));
    }else{
      s.discard.push(...chosen[p]);
      this.players[opp].discard.push(...chosen[opp]);
      this.say(prefix+"A complete TIE. Both pairs discarded.");
    }
    const revealHand=who=>({
      type:pokerHandType(this.cards,chosen[who]),
      cards:chosen[who].map(id=>({name:this.card(id).name,cost:Number(this.card(id).cost)}))
    });
    history.push({round,mode:pokerMode,result:result>0?"WIN":result<0?"LOSS":"TIE"});
    this.pokerLast={
      mode:pokerMode,dadPlayer:p,opponentPlayer:opp,
      dadHand:revealHand(p),oppHand:revealHand(opp),
      rankDad:scores[p][0],rankOpp:scores[opp][0],
      costDad:scores[p][1],
      costOpp:scores[opp][1],
      rounds:[...history],doubled,
      result:result>0?"WIN · Reward selected":result<0?"LOSS · -2 Stash, discard 1":"TIE · no new reward"
    };
    this.update?.();
    if(round===1 && result>0 && s.breakingPointHit && this.players.every(v=>v.deck.length>=4)){
      const risk=await this.ask({player:p,pokerDoubleDown:true,title:"BREAKING POINT — DOUBLE DOWN?",reward:payouts[0].choice});
      if(risk==="double"){
        doubled=true;
        this.say("Gambling Dad DOUBLE DOWNS! The first reward is on the line.");
        continue;
      }
    }
    if(result>=0)resolveRewards();
    if(doubled){
      this.pokerLast.result=result>0?"DOUBLE DOWN WIN · Both rewards paid":result===0?"DOUBLE DOWN TIE · First reward paid":"DOUBLE DOWN LOSS · First reward forfeited; lose 2 Stash and discard 1 card";
      this.pokerLast.doubled=true;
    }else if(result>0){
      this.pokerLast.result="WIN · "+(history[0].result==="WIN"?"Reward paid":"");
    }
    this.update?.();
    break;
    }
    return lastResult;
  };
}
