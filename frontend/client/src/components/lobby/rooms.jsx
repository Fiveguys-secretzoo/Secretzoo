import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../App";
import { useNavigate } from "react-router-dom";

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
  // 필터 
  const filterPlaying = () => {
    let newRooms = {};
    Object.keys(rooms).forEach((key) => {
      if(rooms[key].status === 'playing'){
        newRooms[key] = rooms[key]; 
      }
    })
    setRooms(newRooms);
  }
  const filterWait = () => {
    let newRooms = {};
    Object.keys(rooms).forEach((key) => {
      if(rooms[key].status === 'wait'){
        newRooms[key] = rooms[key]; 
      }
    })
    setRooms(newRooms);
  }
  const filterFull = () => {
    let newRooms = {};
    Object.keys(rooms).forEach((key) => {
      if(rooms[key].playerCount === 6){
        newRooms[key] = rooms[key]; 
      }
    })
    setRooms(newRooms);
  }
  // 검색
  const [searchRoomName, setSearchRoomName] = useState();
  const searchRoom = () => {
    let newRooms = {};
    Object.keys(rooms).forEach((key) => {
      if(rooms[key].roomName.indexOf() > 0){
        newRooms[key] = rooms[key]; 
      }
    })
    setRooms(newRooms);
  }

  return (
    <>
      <div >
        <form className="flex"
        onSubmit={(e) => e.preventDefault()}>
          <input 
          className='w-full p-2 m-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          type="text"
          value={searchRoomName}
          onChange={(e) => setSearchRoomName(e.target.value)} />
          <button className='w-[100px] m-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          type="submit" onClick={searchRoom}>검색</button>
        </form>
        <div className="flex space-x-2 justify-end">
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600' 
          onClick={filterPlaying}>플레이중</button>
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          onClick={filterWait}>대기중</button>
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          onClick={filterFull}>꽉찬방</button>
        </div>
        <div className="flex space-x-2 justify-end ">
          <input className='border px-6 mt-4 border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          onClick={createRoom}>방만들기</button>
        </div>
        <div className="flex flex-wrap p-5 my-2 border-2 overflow-y-auto h-max-[30em]">
          {Object.keys(rooms).map((key) => (
            <div className="min-w-[30%] min-h-[7em] m-2 bg-gray-100 rounded text-right p-5 font-bold " 
            onClick={() => {enterRoom(rooms[key].roomName)}}>
              <p>{rooms[key].roomName}</p>
              {/* <p>{rooms[key].players[0].playerName}</p> */}
              <p>{rooms[key].playerCount}/6</p>
              <p>{rooms[key].status}대기중</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
