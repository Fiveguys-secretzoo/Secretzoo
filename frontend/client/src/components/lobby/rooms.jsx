import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Modal, Label, Card } from 'flowbite-react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { initRoomName } from '../../store/playSlice'
const Rooms = () => {
  const navigate = useNavigate();
  // 소켓
  const socket = useContext(SocketContext);
  // 방들의 정보
  const [rooms, setRooms] = useState({});
  // 마운트 뒬때 방들의 정보 가져옴
  const psq = useSelector(state => state.user.userInfo.userSequence);
  const dispatch = useDispatch();

  useEffect(() => {
    // 소켓서버로 방 정보 요청 콜백함수로 받아온 정보를 저장
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      setRooms(roomsInfo);
    });
  }, []);

  // 방제목
  const [roomName, setRoomName] = useState('');
  // 방만들기
  const createRoom = () => {
    socket.emit('createRoom', roomName, psq, sessionStorage.getItem('userNickname'), (callback) => {
      if (callback) {
        dispatch(initRoomName(roomName));
        sessionStorage.setItem("roomName", roomName);
        alert("생성 완료! 게임으로 이동합니다.");
        navigate("/play");
      } else {
        setOpenModal(false);
        Swal.fire({
          "text": '이미 있는 방제입니다. 다른방제를 선택해주세요',
          "confirmButtonColor": '#3085d6'
        });
      }
    });
  }

  // 방입장 
  const enterRoom = (name) => {
    socket.emit('enterRoom', name, psq, sessionStorage.getItem('userNickname'), (callback) => {
      if (callback) {
        dispatch(initRoomName(name));
        sessionStorage.setItem("roomName", name);
        Swal.fire({
          "text": '입장',
          "confirmButtonColor": '#3085d6'
        });
        navigate("/play");
      } else {
        Swal.fire({
          "text": '방이 가득찼습니다. 다른 방을 이용해주세요.',
          "confirmButtonColor": '#3085d6'
        });
      }
    });
  }

  // 필터 
  const filterPlaying = () => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      let newRooms = {};
      Object.keys(roomsInfo).forEach((key) => {
        if (roomsInfo[key].status === 'playing') {
          newRooms[key] = roomsInfo[key];
        }
      });
      setRooms(newRooms);
    });
  }

  const filterWait = () => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      let newRooms = {};
      Object.keys(roomsInfo).forEach((key) => {
        if (roomsInfo[key].status === 'wait') {
          newRooms[key] = roomsInfo[key];
        }
      });
      setRooms(newRooms);
    });
  }

  const filterFull = () => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      let newRooms = {};
      Object.keys(roomsInfo).forEach((key) => {
        if (roomsInfo[key].playerCount === 6) {
          newRooms[key] = roomsInfo[key];
        }
      });
      setRooms(newRooms);
    });
  }

  // 검색
  const [searchRoomName, setSearchRoomName] = useState();
  const searchRoom = () => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      if (searchRoomName.length === 0) {
        setRooms(roomsInfo);
        return;
      }
      let newRooms = {};
      Object.keys(roomsInfo).forEach((key) => {
        if (roomsInfo[key].roomName.indexOf(searchRoomName) > -1) {
          newRooms[key] = roomsInfo[key];
        }
      });
      setRooms(newRooms);
    });

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
              type="submit" onClick={() => searchRoom()}>검색</Button>
          </form>
        </div>
        <div className="flex space-x-2 justify-end ">
          <Button color="gray"
            onClick={() => setOpenModal(true)}>방만들기</Button>
        </div>
        <div className="flex flex-wrap  my-2 border-2 overflow-y-auto h-[30em] w-[40em] content-start">
          {Object.keys(rooms).map((key) => (
            <Card href="#" className="w-[47%] h-[30%] m-2"
              onClick={(e) => { e.preventDefault(); enterRoom(rooms[key].roomName) }}>
              <p className='truncate text-sm'>{rooms[key].roomName}</p>
              {/* <p>{rooms[key].players[0].playerName}</p> */}
              <p className="text-sm">{rooms[key].playerCount}/6</p>
              <p className="text-sm">{rooms[key].status === 0 ? '대기중' : rooms[key].playerCount === 6 ? '꽉찬방' : '플레이중'}</p>
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
