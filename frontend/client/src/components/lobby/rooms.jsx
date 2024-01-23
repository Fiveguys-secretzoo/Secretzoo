import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../App";
import { useNavigate } from "react-router-dom";
import '../../style/rooms.css'

const Rooms = () => {
  const navigate = useNavigate();
  // 소켓
  const socket = useContext(SocketContext);
  // 방들의 정보
  const [rooms, setRooms] = useState({});
  // 마운트 뒬때 방들의 정보 가져옴
  useEffect(() => {
    // 소켓서버로 방 정보 요청 콜백함수로 받아온 정보를 저장
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      setRooms(roomsInfo);
    });
  }, []);

  // 방제목
  const [roomName, setRoomName] = useState(sessionStorage.getItem('userName') + "의 게임방");
  // 방만들기
  const createRoom = () => {
    socket.emit('createRoom', roomName, sessionStorage.getItem('userName'), (callback) => {
      if(callback) {
        alert("생성 완료! 게임으로 이동합니다.")
        navigate("/play");
      } else {
        alert("이미 있는 방제입니다. 다른방제를 선택해주세요")
      }
    });
  }
  // 방입장
  const enterRoom = (name) => {
    socket.emit('enterRoom', name, sessionStorage.getItem('userName'), (callback) => {
      if(callback) {
        alert("입장")
        navigate("/play");
      } else {
        alert("방이 가득찼습니다. 다른 방을 이용해주세요")
      }
    });
  }

  return (
    <>
      <div>
        <div className="roomList">
          <div className="search">
            <input type="text" />
            <button>검색</button>
          </div>
          <div className="filter">
            <button>플레이중</button>
            <button>대기중</button>
            <button>꽉찬방</button>
          </div>
          <div>
            <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={createRoom}>방만들기</button>
          </div>
          <div className="roomContainer">
            {Object.keys(rooms).map((key) => (
              <div className="roomBox" onClick={() => {enterRoom(rooms[key].roomName)}}>
                <p>{rooms[key].roomName}</p>
                {/* <p>{rooms[key].players[0].playerName}</p> */}
                <p>{rooms[key].playerCount}/6</p>
                <p>{rooms[key].status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
