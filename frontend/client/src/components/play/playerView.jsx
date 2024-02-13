import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';

import App from "../../pages/openvidu/App";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const PlayerView = ({ roomName, psq, key, pn, activate = false, setCards, animalList, video }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;

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
      <div className="bg-white rounded w-[30%] m-2"
        key={key}
        onDragEnter={(e) => dragEnterHandler(e, psq)}
        onDragOver={(e) => dragOver(e, psq)}
        onDrop={(e) => dropHandler(e, psq, setCards)}
      >
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pn} 
        </p>
        {penalty.map((key, value) =>(
          <>
            {animalList[value]} : {key} 
            {value % 2 === 1 ? <br></br>: <></>}
          </>
          
        ))} 
        지금 턴 지난 플레이어 <br></br>
        {turnedPlayer.map((value) => { return `[${value}]` })}
        지금 턴 플레이어 <br></br>
        [{nowTurnPlayer}]
        {(psq === sessionStorage.getItem('userName')) 
          // <App psq={psq} />
        }
        <br></br>
        {video}
      </div>
    </>
  );
}

export default PlayerView;
