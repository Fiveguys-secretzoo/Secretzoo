import PlayerContainer from './playerContainer';
import './playerView.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const PlayerView = ({ roomName, psq, key, pn="빈 플레이어", activate = false, setCards, animalList, video="",count }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;
  const c = count;
  const nowTurnPlayer = useSelector(state => state.plays.nowTurn);
  const turnedPlayer = useSelector(state => state.plays.game.tp);
  const players = useSelector(state => state.plays.players);
  const [penalty, setPenalty] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const prevPen = useRef((players && players[psq])?.pen ?? [0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const currentPen = (players && players[psq])?.pen ?? [0, 0, 0, 0, 0, 0, 0, 0];
    console.log(`[currentPen]`);
    console.log(currentPen);
    if (psq && prevPen.current !== currentPen) {
      setPenalty(currentPen);
      prevPen.current = currentPen;
    }
    console.log(prevPen.current);
    console.log(penalty);
  }, [psq, players, players?.[psq]?.pen]);

  // TODO 위에 올렸을 때 가능하냐 안하냐에 따라서 효과를 다르게 주는 것...!!

  return (
    <>
      <div className={(c===6)?`bg-white border-4 border-red-700 rounded w-96 h-52 m-2 item item${c}`:`bg-white rounded w-96 h-52 m-2 item item${c}`}
        key={key}
        onDragStart={(e)=>e.preventDefault()}
        onDragEnter={(e) => dragEnterHandler(e, psq)}
        onDragOver={(e) => dragOver(e, psq)}
        onDrop={(e) => dropHandler(e, psq, setCards)}
      >
        <div>
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-blue text-center">
            {(c===6)?'YOUR VIDEO!':pn} 
          </p>
        </div>
        <div className="flex flex-1">
          <div className="w-2/3 h-2/3 pb-5">
            {video}
          </div>
          <div className="w-1/3">
            {penalty.map((key, value) =>(
              <>
                {animalList[value]} : {key} 
                {value % 2 === 1 ? <br></br>: <></>}
              </>
            ))} 
          </div>
        </div>
      </div>
    </>
  );
  // 지금 턴 지난 플레이어 <br></br>
  // {turnedPlayer.map((value) => { return `[${value}]` })}
  // 지금 턴 플레이어 <br></br>
  // [{nowTurnPlayer}]
  // {(psq === sessionStorage.getItem('userName')) &&
  //   <App psq={psq} />
  // }
}

export default PlayerView;
