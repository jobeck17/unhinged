// LAB ONLY: augments the existing Mordecai browser Game without changing canonical code.
export const DAD = "Gambling Dad";
export const PASSIVE = "99 GAMBLERS QUIT BEFORE THEY WIN BIG!";
export function pokerScore(cards, pair) {
  return [pair.reduce((n,id)=>n+(cards[id]?.cost??0),0),
          pair.reduce((n,id)=>n+(cards[id]?.type==="Character"?(cards[id].power??0):0),0)];
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
 return [handRank(cards,ids,mode),...pokerScore(cards,ids)];
}
export function compareScores(a,b,mode="HIGH") {
 return Math.sign(a[0]-b[0]) ||
   (mode==="LOW"?Math.sign(b[1]-a[1]):Math.sign(a[1]-b[1])) ||
   Math.sign(a[2]-b[2]);
}
export const SLOT_MACHINE="LAB-GD-018";
export const BLUFF="LAB-GD-013";
export function slotPayout(flips,continuePlaying,handSize){
  if(flips.length<2||flips[0]!==flips[1])return {outcome:"MISS",draw:0};
  if(!continuePlaying)return {outcome:"CASH OUT",draw:1};
  if(flips[2]===flips[0])return {outcome:"JACKPOT",draw:Math.max(0,7-handSize)};
  return {outcome:"BUST",draw:0};
}
export function installGamblingDad(Game, LEADERS) {
  LEADERS[DAD]={style:"Gambler",passive:PASSIVE+" — Once during your Turn, you may play Rock Bottom Poker. Win: gain 4 Stash. Lose: reset Stash to 2 and Defeat your Characters. Only Dad may Fold for 1 Stash."};
  const oldStart=Game.prototype.startTurn;
  Game.prototype.startTurn=function(...args){
    this.players[this.turn].pokerUsed=false;
    return oldStart.apply(this,args);
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
    if(x?.id===SLOT_MACHINE){
      return this.winner===null && x.owner===this.turn && x.ready && !x.cloaked &&
        this.players[x.owner].fuel>=2 && this.players[x.owner].deck.length>0;
    }
    return oldCanUse.call(this,x);
  };
  const oldActivate=Game.prototype.activate;
  Game.prototype.activate=async function(uid,mode=null){
    const x=this.obj(uid),p=this.turn;
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
    this.players[p].pokerUsed=true;
    const pokerMode=Math.random()<0.5?"HIGH":"LOW";
    this.pokerMode=pokerMode;
    await this.ask({player:p,pokerChip:true,pokerMode,title:"Dad\u0027s Lucky Poker Chip"});
    const opp=1-p, hands=[[],[]];
    for(let who=0;who<2;who++)for(let i=0;i<4;i++)hands[who].push(this.players[who].deck.pop());
    const options=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]], chosen=[[],[]], scores=[[],[]];
    // Dad alone can Fold, after seeing his own cards but before anybody commits cards.
    const dadChoice=await this.ask({player:p,pokerFold:true,pokerMode,cards:hands[p].map(id=>({id,name:this.card(id).name,cost:this.card(id).cost})),title:"Play or Fold?"});
    if(dadChoice==="fold"){
      const stash=this.players[p],owner=stash.pokerOrigins?.pop()??p,discarded=stash.stash.pop();
      if(discarded!==undefined){this.players[owner].discard.push(discarded);stash.fuel=Math.min(stash.fuel,stash.stash.length)}
      for(let who=0;who<2;who++)this.players[who].deck.unshift(...hands[who]);
      this.pokerLast={mode:pokerMode,result:"FOLD · Lose 1 Stash",folded:true};
      this.say("Rock Bottom Poker: Gambling Dad Folds and loses 1 Stash.");
      this.update?.();return "fold";
    }
    for(const who of [p,opp]){
      const possibilities=options.map(pair=>{
        const ids=pair.map(i=>hands[who][i]),score=pokerValue(this.cards,ids,pokerMode);
        return {pair,ids,score,label:ids.map(id=>this.card(id).name+" (Cost "+this.card(id).cost+", Power "+(this.card(id).power||0)+")").join(" + ")+" — "+score[1]+" Cost / "+score[2]+" Power"};
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
        canBluff,
        options:hands[who].map((id,i)=>({
          value:i,cardId:id,
          label:this.card(id).name+" · Cost "+this.card(id).cost+" · Power "+(this.card(id).type==="Character"?(this.card(id).power||0):0)
        })),
        recommendedPair:possibilities[0].pair
      });
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
    const prefix="Rock Bottom Poker ("+pokerMode+"): "+this.name(p)+" "+scores[p][1]+"/"+scores[p][2]+" vs "+this.name(opp)+" "+scores[opp][1]+"/"+scores[opp][2]+". ";
    const s=this.players[p];
    if(result>0){
      if(!s.pokerOrigins)s.pokerOrigins=[];
      while(s.pokerOrigins.length<s.stash.length)s.pokerOrigins.push(p);
      s.stash.push(...chosen[p],...chosen[opp]);
      s.pokerOrigins.push(p,p,opp,opp);
      s.fuel=Math.min(s.stash.length,s.fuel+4);
      this.say(prefix+"Dad WINS four Ready Stash!");
      for(const x of this.chars(p)){
        if(x.id==="LAB-GD-003")x.power+=1;
        if(x.id==="LAB-GD-008"||x.id==="LAB-GD-009")x.pokerTrouble=(x.pokerTrouble||0)+1;
      }
      for(const item of s.board.filter(x=>x.id==="LAB-GD-017"))this.draw(p,1);
    } else if(result<0){
      s.discard.push(...chosen[p]);
      // Opponent is never awarded Stash. Its two committed cards go back to its own deck.
      this.players[opp].deck.unshift(...chosen[opp]);
      while(s.stash.length>2){
        const i=s.stash.length-1, id=s.stash.pop();
        const originalOwner=s.pokerOrigins?.[i]??p;
        this.players[originalOwner].discard.push(id);
        if(s.pokerOrigins?.length>i)s.pokerOrigins.pop();
      }
      s.fuel=Math.min(s.fuel,s.stash.length);
      for(const character of [...this.chars(p)])await this.remove(character,"discard",true);
      this.say(prefix+"Dad LOSES. Stash resets to at most two; all Characters Defeated.");
      for(const x of this.chars(p)){
        if(x.id==="LAB-GD-004")this.draw(p,1);
        if(x.id==="LAB-GD-012")x.power+=2;
      }
    } else {
      this.players[p].discard.push(...chosen[p]);
      this.players[opp].discard.push(...chosen[opp]);
      this.say(prefix+"A complete TIE. Both pairs discarded; no payout.");
    }
    const revealHand=who=>({
      type:pokerHandType(this.cards,chosen[who]),
      cards:chosen[who].map(id=>({name:this.card(id).name,cost:Number(this.card(id).cost)}))
    });
    this.pokerLast={
      mode:pokerMode,dadPlayer:p,opponentPlayer:opp,
      dadHand:revealHand(p),oppHand:revealHand(opp),
      rankDad:scores[p][0],rankOpp:scores[opp][0],
      costDad:scores[p][1],powerDad:scores[p][2],
      costOpp:scores[opp][1],powerOpp:scores[opp][2],
      result:result>0?"WIN · +4 Stash":result<0?"LOSS · Stash down to 2; board cleared":"TIE · no payout"
    };
    this.update?.();
    return result;
  };
}
