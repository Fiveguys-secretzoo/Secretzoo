import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Modal, Label, Card } from 'flowbite-react';

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
        alert("생성 완료! 게임으로 이동합니다.");
        navigate("/play");
      } else {
        setOpenModal(false);
        alert("이미 있는 방제입니다. 다른방제를 선택해주세요");
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

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div>
        <div className="flex justify-between mb-2">
          <div className="flex space-x-2 justify-end">
            <Button.Group>
              <Button color="gray" onClick={filterPlaying}>플레이중</Button>
              <Button color="gray" onClick={filterWait}>대기중</Button>
              <Button color="gray" onClick={filterFull}>꽉찬방</Button>
            </Button.Group> 
          </div>
          <form className="flex justify-end"
          onSubmit={(e) => e.preventDefault()}>
            <TextInput 
            type="text"
            placeholder='방이름'
            value={searchRoomName}
            onChange={(e) => setSearchRoomName(e.target.value)} />
            <Button color="gray"
            type="submit" onClick={searchRoom}>검색</Button>
          </form>
        </div>
        <div className="flex space-x-2 justify-end ">
          <Button color="gray"
          onClick={() => setOpenModal(true)}>방만들기</Button>
        </div>
        <div className="flex flex-wrap  my-2 border-2 overflow-y-auto h-max-[30em] justify-start">
          {Object.keys(rooms).map((key) => (
            <Card href="#" className="w-[47%] m-2"
            onClick={(e) => {e.preventDefault(); enterRoom(rooms[key].roomName)}}>
              <p>{rooms[key].roomName}</p>
              {/* <p>{rooms[key].players[0].playerName}</p> */}
              <p>{rooms[key].playerCount}/6</p>
              <p>{rooms[key].status}대기중</p>
            </Card >
          ))}
        </div>
      </div>
      {/* 모달 */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <Label>방 제목</Label>
          <TextInput value={roomName} onChange={(e) => setRoomName(e.target.value)}></TextInput>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createRoom()}>방 만들기</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Rooms;
