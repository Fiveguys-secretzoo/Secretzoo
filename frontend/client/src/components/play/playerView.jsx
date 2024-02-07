import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';
import App from "./openvidu/App.js";
import React, { useEffect } from 'react';

const PlayerView = ({ roomName, psq, key, pn = "SomethingWrong", activate = false }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;

  // TODO 위에 올렸을 때 가능하냐 안하냐에 따라서 효과를 다르게 주는 것...!!

  return (
    <>
      <div className="bg-white rounded w-[30%] m-2"
        key={key}
        onDragEnter={(e) => dragEnterHandler(e, psq)}
        onDragOver={(e) => dragOver(e, psq)}
        onDrop={(e) => dropHandler(e, psq)}
      >
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {psq}
        </p>
        {(psq === sessionStorage.getItem('userName')) &&
          <App psq={psq} />
        }
      </div>
    </>
  );
}

export default PlayerView;