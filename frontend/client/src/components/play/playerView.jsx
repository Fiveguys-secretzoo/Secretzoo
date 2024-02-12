import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';
import App from "./openvidu/App.js";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const PlayerView = ({ roomName, psq, key, pn, activate = false, setCards }) => {
  const ps = useSelector(state => state.plays.ps);
  const [penalty, setPenalty] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;
  const prevPen = useRef((ps && ps[psq])?.pen ?? [0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const currentPen = (ps && ps[psq])?.pen ?? [0, 0, 0, 0, 0, 0, 0, 0];
    if (psq && prevPen.current !== currentPen) {
      setPenalty(currentPen);
      prevPen.current = currentPen;
    }
  }, [psq, ps]);
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