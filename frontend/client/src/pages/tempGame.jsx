import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './tempMainPage';
import { useNavigate } from 'react-router-dom';


const Game = () => {

  const socket = useContext(SocketContext);
  const [testRooms, setTestRooms] = useState([]);

  console.log("##### rendered... ")

  useEffect(() => {
    console.log("why...?")
    socket.emit('testRoomsInfo', (rooms) => {
      console.log(`##### roooms `)
      setTestRooms(rooms);
      console.log(rooms)
    });

    return (() => {

    })
  }, []);

  return (
    <>
      <div>
        <h2>This is Game Page!!!</h2>
      </div>
    </>
  )
}

export default Game;