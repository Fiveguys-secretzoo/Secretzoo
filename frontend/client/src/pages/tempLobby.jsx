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
    setRoom('');
  }

  const enterRoom = (roomName) => {
    socket.emit('enterRoom', roomName, (tf) => {
      if (tf) {
        navigate('/game');
      } else {
        alert("Too many players in the room");
      }
    });
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
          {rooms !== undefined
            && Object.keys(rooms).length > 0
            && Object.keys(rooms).map((roomName) => {
              return(
              <li key={roomName} onClick={() => enterRoom(roomName)}>
                <strong>방제</strong> : {roomName} ({rooms[roomName].playerCount+1} 명 접속중)
              </li>
              )
            })}
        </div>
        <div>
          <input value={room} onChange={(e) => setRoom(e.target.value)} />
          <button onClick={createRoom}>방 만들기</button>
        </div>
      </div>
    </>
  )
}

export default Lobby;