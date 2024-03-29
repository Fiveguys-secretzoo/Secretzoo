import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Modal, Label, Card, Checkbox } from 'flowbite-react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { initRoomName } from '../../store/playSlice'
import { getUserInfo } from "../../store/userSlice";
import { IoMdRefresh } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import axios from "axios";
/* 방 목록 */
const Rooms = () => {
  const navigate = useNavigate();
  // 소켓
  const socket = useContext(SocketContext);
  // 방들의 정보
  const [rooms, setRooms] = useState({});
  // 마운트 뒬때 방들의 정보 가져옴
  const user = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    // 소켓서버로 방 정보 요청 콜백함수로 받아온 정보를 저장
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      setRooms(roomsInfo);
    });
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem('noLogin')) {
    } else {
      dispatch(getUserInfo());
    }
  }, [dispatch])

  // 방만들기
  const createRoom = (roomName, roomPassword) => {
    if(roomName.trim() === "" || roomName.length > 14){
      Swal.fire({
        "text": '방 제목 길이는 14자 이하이고 공백이 아니어야 합니다.',
        "confirmButtonColor": '#3085d6'
      });
      return;
    }
    if(sessionStorage.getItem('noLogin')){
      socket.emit('createRoom', roomName, roomPassword, user.userSequence, sessionStorage.getItem('userNickname'), (callback) => {
        if (callback) {
          dispatch(initRoomName(roomName));
          sessionStorage.setItem("roomName", roomName);
          Swal.fire({
            "icon": 'success',
            'title': '방 생성 완료!',
            "text": '방에 입장 중입니다...',
            "timer" : 1500,
            'showConfirmButton': false,
          });
          navigate("/play");
        } else {
          setOpenMakeRoomModal(false);
          Swal.fire({
            "icon": 'error',
            "title" : '방 입장 오류',
            "text": '이미 있는 방제입니다. 다른방제를 선택해주세요',
            "confirmButtonColor": '#3085d6'
          });
        }
      });
      return;
    }
    axios.get('https://spring.secretzoo.site/users/check-concurrent-login', {
    headers: {
      "Authorization" : sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token'),
      "refresh-token" : sessionStorage.getItem('refresh-token'),
    }
  }).then(Response => {
    socket.emit('createRoom', roomName, roomPassword, user.userSequence, sessionStorage.getItem('userNickname'), (callback) => {
      if (callback) {
        dispatch(initRoomName(roomName));
        sessionStorage.setItem("roomName", roomName);
        Swal.fire({
          "icon": 'success',
          'title': '방 생성 완료!',
          "text": '방에 입장 중입니다...',
          "timer" : 1500,
          'showConfirmButton': false,
        });
        navigate("/play");
      } else {
        setOpenMakeRoomModal(false);
        Swal.fire({
          "icon": 'error',
          "title" : '방 입장 오류',
          "text": '이미 있는 방제입니다. 다른방제를 선택해주세요',
          "confirmButtonColor": '#3085d6'
        });
      }
    });
  }).catch(error => {
    // console.log(error) 
    Swal.fire({
      "text" : '유효하지 않은 접근입니다.',
      "confirmButtonColor" : '#3085d6'
    });
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = 'https://secretzoo.site';
    },500);
  })
   
  }

  // 방입장 
  const enterRoom = (name, password) => {
    if(sessionStorage.getItem('noLogin')){
      socket.emit('enterRoom', name, password, user.userSequence, sessionStorage.getItem('userNickname'), (callback) => {
        if (callback === 0) {
          dispatch(initRoomName(name));
          sessionStorage.setItem("roomName", name);
          Swal.fire({
            "title": '입장 중입니다...',
            "timer" : 1500,
            'showConfirmButton': false,
          });
          navigate("/play");
        } else if(callback === 2){
          setOpenEnterModal(false);
          Swal.fire({
            'icon' : 'error',
            'title' : '방 입장 오류!',
            "text": '방이 가득찼습니다. 다른 방을 이용해주세요.',
            "confirmButtonColor": '#3085d6'
          });
        } else if(callback === 3){
          setOpenEnterModal(false);
          Swal.fire({
            "text": '비밀번호가 틀렸습니다.',
            "confirmButtonColor": '#3085d6'
          });
        } else if(callback === 4){
          setOpenEnterModal(false);
          Swal.fire({
            "text": '이미 게임이 시작됐습니다.',
            "confirmButtonColor": '#3085d6'
          });
        }
      });
      return;
    }
    axios.get('https://spring.secretzoo.site/users/check-concurrent-login', {
    headers: {
      "Authorization" : sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token'),
      "refresh-token" : sessionStorage.getItem('refresh-token'),
    }
  }).then(Response => {
    socket.emit('enterRoom', name, password, user.userSequence, sessionStorage.getItem('userNickname'), (callback) => {
      if (callback === 0) {
        dispatch(initRoomName(name));
        sessionStorage.setItem("roomName", name);
        Swal.fire({
          "title": '입장 중입니다...',
          "timer" : 1500,
          'showConfirmButton': false,
        });
        navigate("/play");
      } else if(callback === 2){
        setOpenEnterModal(false);
        Swal.fire({
          'icon' : 'error',
          'title' : '방 입장 오류!',
          "text": '방이 가득찼습니다. 다른 방을 이용해주세요.',
          "confirmButtonColor": '#3085d6'
        });
      } else if(callback === 3){
        setOpenEnterModal(false);
        Swal.fire({
          "text": '비밀번호가 틀렸습니다.',
          "confirmButtonColor": '#3085d6'
        });
      } else if(callback === 4){
        setOpenEnterModal(false);
        Swal.fire({
          "text": '이미 게임이 시작됐습니다.',
          "confirmButtonColor": '#3085d6'
        });
      }
    });
  }).catch(error => {
    // console.log(error) 
    Swal.fire({
      "text" : '유효하지 않은 접근입니다.',
      "confirmButtonColor" : '#3085d6'
    });
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = 'https://secretzoo.site';
    },500);
  })
    
  }

  // 필터 
  const filterPlaying = () => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      let newRooms = {};
      Object.keys(roomsInfo).forEach((key) => {
        if (roomsInfo[key].status === 1) {
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
        if (roomsInfo[key].status === 0) {
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

  const noFilter = () => {
    socket.emit('requestRoomsInfo', (roomsInfo) => {
      setRooms(roomsInfo);
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
  /* 방만들기 모달 */
  const [openMakeRoomModal, setOpenMakeRoomModal] = useState(false);
  const MakeRoomModal = () => {
    const [roomName, setRoomName] = useState('');
    const [roomPassword, setRoomPassword] = useState('');   
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Modal show={openMakeRoomModal} size="md" onClose={() => setOpenMakeRoomModal(false)}>
      <form action="#" onSubmit={e => e.preventDefault()}>
      <Modal.Body>
        <Label>방 제목</Label>
        <TextInput value={roomName} onChange={(e) => setRoomName(e.target.value)}></TextInput>
        <Label>비밀번호</Label>
        <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)}></Checkbox>
        {isChecked ? 
        <TextInput value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)}></TextInput> : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={() => createRoom(roomName, roomPassword)}>방 만들기</Button>
        <Button color="gray" onClick={() => setOpenMakeRoomModal(false)}>
          취소
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
    )
  }
  /* 입장시 패스워드 모달 */
  const [openEnterModal, setOpenEnterModal] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const EnterModal = () => {
    const [roomPassword, setRoomPassword] = useState('');   
    return (
      <Modal show={openEnterModal} size="md" onClose={() => setOpenEnterModal(false)}>
      <form action="#" onSubmit={e => e.preventDefault()}>
      <Modal.Body>
        <Label>비밀번호</Label>
        <TextInput value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)}></TextInput>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={() => enterRoom(selectedRoomName,roomPassword)}>입장</Button>
        <Button color="gray" onClick={() => setOpenEnterModal(false)}>
          취소
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
    )
  }
  

  return (
    <>
      <div>
        <div className="flex justify-between mb-2">
          <div className="flex space-x-2 justify-end">
            <Button.Group>
              <Button color="gray" onClick={filterPlaying}>플레이중</Button>
              <Button color="gray" onClick={filterWait}>대기중</Button>
              <Button color="gray" onClick={filterFull}>꽉찬방</Button>
              <Button color="gray" onClick={noFilter}><IoMdRefresh className="w-6 h-6 text-bold"></IoMdRefresh></Button>
            </Button.Group>
          </div>
          <form className="flex justify-end items-center"
            onSubmit={(e) => e.preventDefault()}>
            <TextInput
              type="text"
              placeholder='방이름'
              value={searchRoomName}
              onChange={(e) => setSearchRoomName(e.target.value)}
              />
              &nbsp;
              &nbsp; 
            <Button color="gray"
              type="submit" onClick={() => searchRoom()}>검색</Button>
          </form>
        </div>
        <div className="flex space-x-2 justify-end ">
          <Button color="gray"
            onClick={() => setOpenMakeRoomModal(true)}>방만들기</Button>
        </div>
        <div className="flex flex-wrap  my-2 border-2 overflow-y-auto h-[30em] w-[40em] content-start">
          {Object.keys(rooms).map((key) => (
            <Card href="#" className="w-[47%] h-[30%] m-2 hover:bg-[#1F2544] hover:text-white"
              onClick={(e) => {
              if(rooms[key].isLocked){
                e.preventDefault(); 
                setSelectedRoomName(rooms[key].roomName); 
                setOpenEnterModal(true); }
                else {
                  enterRoom(rooms[key].roomName,'');
                }}}>
              {rooms[key].isLocked ? <CiLock></CiLock> : null}
              <p className='text'>{rooms[key].roomName}</p>
              <p className='text-sm'>{rooms[key].adminPlayer}</p>
              <p className="text-sm">{rooms[key].playerCount}/6</p>
              <p className="text-sm">{rooms[key].status === 1 ? '플레이중' : rooms[key].playerCount === 6 ? '꽉찬방' : '대기중'}</p>
            </Card >
          ))}
        </div>
      </div>
      <MakeRoomModal></MakeRoomModal>
      <EnterModal></EnterModal>
    </>
  );
};

export default Rooms;
