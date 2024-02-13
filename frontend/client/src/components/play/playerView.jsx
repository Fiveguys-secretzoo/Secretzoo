import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';
import App from "../../pages/openvidu/App";
import React, { useEffect } from 'react';

const PlayerView = ({ pid, key, pn = "SomethingWrong", activate = false ,video}) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;

  // TODO 위에 올렸을 때 가능하냐 안하냐에 따라서 효과를 다르게 주는 것...!!

  return (
    <>
      <div className="bg-white rounded w-[30%] m-2"
        key={key}
        onDragEnter={(e) => dragEnterHandler(e, pid)}
        onDragOver={(e) => dragOver(e, pid)}
        onDrop={(e) => dropHandler(e, pid)}
      >
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pid}
        </p>
        {video}
      </div>
    </>
  );
}

export default PlayerView;
