import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';
import App from "./openvidu/App.js";
import React, { useEffect } from 'react';
const PlayerView = ({ pid, key, pn = "SomethingSomething", activate = false }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;
  // useEffect(() => {
    
  //   if(pid===sessionStorage.getItem('userName')){
  //     // App.joinSession(); // App 컴포넌트의 인스턴스 생성
  //   }
  //   return () => App.leaveSession(); // 컴포넌트가 언마운트될 때 leaveSession 호출 (옵션)
  // }, []);
  return (
    <>
      <Card className="max-w-sm"
        key={key}
        onDragEnter={(e) => dragEnterHandler(e, pid)}
        onDragOver={(e) => dragOver(e, pid)}
        onDrop={(e) => dropHandler(e, pid)}
      >
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pid}
        </p>
        {(pid === sessionStorage.getItem('userName'))
        &&<App />}
      </Card>
    </>
  );
}

export default PlayerView;