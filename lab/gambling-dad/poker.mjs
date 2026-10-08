// LAB ONLY: augments the existing Mordecai browser Game without changing canonical code.
export const DAD = "Gambling Dad";
export const PASSIVE = "99 GAMBLERS QUIT BEFORE THEY WIN BIG!";
export function pokerScore(cards, pair) {
  return [pair.reduce((n,id)=>n+(cards[id]?.cost??0),0),
          pair.reduce((n,id)=>n+(cards[id]?.type==="Character"?(cards[id].power??0):0),0)];
}
export function compareScores(a,b,mode="HIGH") { return (mode==="LOW"?Math.sign(b[0]-a[0]):Math.sign(a[0]-b[0])) || Math.sign(a[1]-b[1]); }
export function installGamblingDad(Game, LEADERS) {
  LEADERS[DAD]={style:"Gambler",passive:PASSIVE+" — Once during your Turn, you may play Rock Bottom Poker. Win: gain 4 Stash. Lose: reset Stash to 2."};
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
    return oldCanPlay.call(this,i,p) && (this.players[p].hand[i]!=="LAB-GD-015"||this.chars(p).length>0);
  };
  const oldAction=Game.prototype.actionEffect;
  Game.prototype.actionEffect=async function(p,id,target,second,previous) {
    if(id==="LAB-GD-013"){
      this.draw(p,2);
      if(this.players[p].hand.length)await this.discard(p);
      return;
    }
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
       !this.players[p].pokerUsed && this.players.every(s=>s.deck.length>=3);
  };
  Game.prototype.dadPoker=async function(p=this.turn) {
    if(!this.canPoker(p))return false;
    this.players[p].pokerUsed=true;
    const pokerMode=Math.random()<0.5?"HIGH":"LOW";
    this.pokerMode=pokerMode;
    await this.ask({player:p,pokerChip:true,pokerMode,title:"Dad\u0027s Lucky Poker Chip"});
    const opp=1-p, hands=[[],[]];
    for(let who=0;who<2;who++)for(let i=0;i<3;i++)hands[who].push(this.players[who].deck.pop());
    const options=[[0,1],[0,2],[1,2]], chosen=[[],[]], scores=[[],[]];
    for(const who of [p,opp]){
      const possibilities=options.map(pair=>{
        const ids=pair.map(i=>hands[who][i]),score=pokerScore(this.cards,ids);
        return {pair,ids,score,label:ids.map(id=>this.card(id).name+" (Cost "+this.card(id).cost+", Power "+(this.card(id).power||0)+")").join(" + ")+" — "+score[0]+" Cost / "+score[1]+" Power"};
      });
      // Offer THREE individual cards; the player chooses exactly TWO.
      // The best pair is an AI recommendation only, not a prebuilt human choice.
      possibilities.sort((a,b)=>compareScores(b.score,a.score,pokerMode));
      const indices=await this.ask({
        player:who,title:"Rock Bottom Poker: choose TWO of your THREE cards",
        mandatory:true,pokerCards:true,multi:true,min:2,max:2,
        options:hands[who].map((id,i)=>({
          value:i,cardId:id,
          label:this.card(id).name+" · Cost "+this.card(id).cost+" · Power "+(this.card(id).type==="Character"?(this.card(id).power||0):0)
        })),
        recommendedPair:possibilities[0].pair
      });
      if(!Array.isArray(indices)||indices.length!==2||new Set(indices).size!==2||
         indices.some(i=>!Number.isInteger(i)||i<0||i>2))
        throw new Error("Rock Bottom Poker requires exactly two different cards from the three drawn.");
      chosen[who]=indices.map(i=>hands[who][i]);
      scores[who]=pokerScore(this.cards,chosen[who]);
      const leftover=[0,1,2].find(i=>!indices.includes(i));
      this.players[who].deck.unshift(hands[who][leftover]);
    }
    const bonus=this.players[p].board.filter(x=>x.id==="LAB-GD-016").length;
    scores[p][1]+=bonus;
    const result=compareScores(scores[p],scores[opp],pokerMode);
    const prefix="Rock Bottom Poker ("+pokerMode+"): "+this.name(p)+" "+scores[p][0]+"/"+scores[p][1]+" vs "+this.name(opp)+" "+scores[opp][0]+"/"+scores[opp][1]+". ";
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
      this.say(prefix+"Dad LOSES. Stash resets to at most two.");
      for(const x of this.chars(p)){
        if(x.id==="LAB-GD-004")this.draw(p,1);
        if(x.id==="LAB-GD-012")x.power+=2;
      }
    } else {
      this.players[p].discard.push(...chosen[p]);
      this.players[opp].discard.push(...chosen[opp]);
      this.say(prefix+"A complete TIE. Both pairs discarded; no payout.");
    }
    this.pokerLast={mode:pokerMode,costDad:scores[p][0],powerDad:scores[p][1],costOpp:scores[opp][0],powerOpp:scores[opp][1],result:result>0?"WIN · +4 Stash":result<0?"LOSS · Stash down to 2":"TIE · no payout"};
    this.update?.();
    return result;
  };
}
