import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';
import App from "./openvidu/App.js";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const PlayerView = ({ roomName, psq, key, pn, activate = false, setCards }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;

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
          {psq}
        </p>
        {pn} <br></br>
        {penalty}
        {(psq === sessionStorage.getItem('userName')) &&
          <App psq={psq} />
        }
      </div>
    </>
  );
}

export default PlayerView;