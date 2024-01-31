import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './tempMainPage';
import { useNavigate } from 'react-router-dom';


const Lobby = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState({});

  const [room, setRoom] = useState();
  const socket = useContext(SocketContext);

  const createRoom = () => {
    socket.emit('createRoom', room, (tf) => {
      if (tf) {
        navigate('/game');
      } else {
        alert('이미 방이 존재합니다!')
      }
    });
  }

  const enterRoom = (roomName) => {
    console.log("##### Pressed Enter Room ");
    socket.emit('enterRoom', roomName, (tf) => {
      if (tf) {
        navigate('/game');
      } else {
        alert("Too many players in the room");
        console.log(tf);
        console.log(roomName);
      }
    });
  }

  const onType = (e) => {
    setRoom(e.target.value);
  }

  useEffect(() => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      console.log(`##### get rooms Info `);
      console.log(roomsInfo);
      setRooms(roomsInfo);
      console.log(rooms);
    });
  }, []);

  return (
    <>
      <div>
        <div>
          <h3> 방 목록 </h3>
        </div>
        <div>
          <ul>
            {rooms !== undefined
              && Object.keys(rooms).length > 0
              && Object.keys(rooms).map((roomName) => {
                return(
                <li key={roomName}>
                  <strong>방제</strong> : {roomName} ({rooms[roomName].playerCount+1} 명 접속중) <button onClick={() => enterRoom(roomName)}>방 입장</button>
                </li>
                )
            })}
            </ul>
        </div>
        <div>
          <input value={room} onChange={onType} />
          <button onClick={createRoom}>방 만들기</button>
        </div>
      </div>
    </>
  )
}

export default Lobby;