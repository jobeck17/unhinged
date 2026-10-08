// LAB ONLY: bounded, recoverable opponent-turn driver for the Gambling Dad playtest.
// Keep AI errors from leaving the interface indefinitely on "Opponent is thinking…".
const snapshot=g=>JSON.stringify({
  round:g.round,turn:g.turn,winner:g.winner,
  players:g.players.map(s=>({
    hp:s.hp,hand:s.hand.length,deck:s.deck.length,discard:s.discard.length,
    stash:s.stash.length,fuel:s.fuel,played:s.played?.length||0,
    board:s.board.map(x=>[x.uid,x.ready,x.damage,x.attacked,x.once,x.power,x.guard])
  }))
});

export async function runOpponentTurn(game,{
  human=0,decide,delay=async()=>{},onUpdate=()=>{},onError=()=>{},maxActions=70
}={}){
  let actions=0,stalled=0,errors=0;
  const report=(error,move)=>{
    errors++;
    onError(error,{round:game.round,turn:game.turn,move});
  };
  const skip=async()=>{
    if(game.winner!==null||game.turn===human)return;
    const previous=game.turn;
    await game.pass();
    if(game.winner===null&&game.turn===previous)throw Error("Opponent turn did not advance after passing.");
    onUpdate();
  };
  while(game.turn!==human&&game.winner===null){
    if(actions>=maxActions){
      report(Error("Opponent action limit reached; ending its turn."),null);
      await skip();break;
    }
    await delay();
    if(game.turn===human||game.winner!==null)break;
    const player=game.turn,before=snapshot(game);
    let move=null;
    try{
      move=game.canPoker(player)&&game.players[player].stash.length<=4
        ? {type:"poker"} : decide(game,player);
      if(!move||!move.type)throw Error("Opponent selected no action.");
      if(move.type==="poker")await game.dadPoker(player);
      else if(move.type==="pass")await game.pass();
      else if(move.type==="stash")game.stash(move.index,player);
      else if(move.type==="attack")await game.attack(move.uid);
      else if(move.type==="trouble")await game.causeTrouble(move.uid);
      else if(move.type==="play")await game.play(move.index);
      else if(move.type==="activate")await game.activate(move.uid);
      else throw Error("Unknown opponent action: "+move.type);
    }catch(error){
      report(error,move);
      // One broken card/AI choice should not trap the entire match.
      if(game.turn===player&&game.winner===null)await skip();
      break;
    }
    actions++;
    onUpdate();
    if(game.turn===player&&game.winner===null&&snapshot(game)===before){
      stalled++;
      if(stalled>=3){
        report(Error("Opponent made no progress after three actions; ending its turn."),move);
        await skip();break;
      }
    }else stalled=0;
  }
  return {actions,errors,recovered:errors>0};
}
