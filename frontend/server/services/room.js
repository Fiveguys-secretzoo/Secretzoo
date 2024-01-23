
import { Server } from 'socket.io';
import models from '../models/models.js';

const {animals, 
  score,
  Player,
  roomInfo} = models

const roomSocketMethods = () => {

  /**
     * 카드 셔플 후 분배
     * @param {Object} room 방 객체
     * @returns 
     */
  const shuffleArray = (room) => {
    let array = room.card
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    let i = 20;
    console.log(`##### room card : ${room.card}`);

    while(i > 0){
      i--;
      for(let k = 0 ; k < room.playerCount ; k ++){
        room.player[k].hand.push(room.card.pop());
        if(room.card.length===0){
          break;
        }
      }
    }
  }

  /**
   * 방 생성 (방이 존재하지 않는 경우)
   * @param {string} roomName 방 이름 
   * @param {string} id 유저 id 
   */
  const addRoom = (roomName, playerId)=>{
    rooms[roomName] = {...roomInfo};
    rooms[roomName].roomName = roomName;
    rooms[roomName].players.push(Player(playerId));

    /*TODO - send room data to backend server!!! */

    console.log(`##### create room : ${rooms[roomName].players}`);
  }

  /**
   * 유저 추가 (방이 존재하는 경우)
   * @param {string} roomName 방 이름
   * @param {string} id 유저 id 
   */
  const addPlayer = (roomName, playerId) => {
    const room = rooms[roomName];
    room.playerCount ++;
    room[playerCount] = new Player(playerId);

    /*TODO - send room data and playerdata to backend server */

  }

  /**
   * 유저 퇴장 
   * @param {String} roomName 
   * @param {String} playerId 
   */
  const removePlayer = (playerId) => {
    const room = rooms[roomName];
    room.playerCount ++;
    room[playerCount] = new Player(playerId);

    /*TODO - send room data and playerdata to backend server */

  }


  /* 방 정보 전달 */  
  const sendRoomInfo = async (socket, rooms) => {
    socket.on('requestRoomsInfo',(callback) => {
      callback(rooms);
    });
  }

  /* 방 생성 이벤트 */
  const createRoom = async(socket, rooms) => {
    socket.on('createRoom', (room, callback) => {
      if(Object.keys(rooms).includes(room)){
        callback(false);
      }else{
        addRoom(room, socket.id);

        // 기존방 나가기
        for(let nowRoom of socket.rooms){
          if(nowRoom !== socket.id){
            socket.leave(nowRoom);
          }
        }

        // 입력받은 방 들어가기
        socket.join(room);
        callback(true);
      }
    });
  }

  /* 방 입장 이벤트 */
  const enterRoom = async (socket, rooms) => {
    socket.on('enterRoom', (room, callback) => {
        // 인원수 체크
      if(rooms[room] && rooms[room].playerCount >= 6){
        callback(false);
      }else {
        // 기존방 나가기
        for(let nowRoom of socket.rooms){
          if(nowRoom !== socket.id){
            socket.leave(nowRoom);
          }
        }

        // 입력받은 방 들어가기
        socket.join(room);

        // console.log(io.of('/').adapter.rooms);
        socket.emit('updateRoom',rooms);
        addPlayer(room, socket.id)
        callback(true)
        console.log(`##### join room : ${rooms}`);
      }
    });
  }

  /* 채팅 메세지 이벤트 */
  const chatMessage = async(socket, rooms) => {
    socket.on('chatMessage', async (msg, user) => {
      let room;
      for(let nowRoom of socket.rooms){
        if(nowRoom !== socket.id){
          room = nowRoom;
        }
      }
      console.log(`##### chat message : ${msg} + " / room : " + ${room}`);
      io.to(room).emit('chatMessage', user + " : " + msg + "," + room); 
    });
  }


  /* 게임시작 카드 나눠주기 */
  const cardShare = async (socket, rooms) => {
    socket.on('start', () => {
      console.log(`##### card room : ${rooms}`);
      let room;
        for(let nowRoom of socket.rooms){
          if(nowRoom !== socket.id){
            room = nowRoom;
          }
        }
        console.log('##### 셔플시작')
        shuffleArray(rooms[room]);

        console.log('##### 셔플끝')
        
        for(let k = 0 ; k < 6 ; k ++ ){
          io.to(rooms[room].player[k].playerId).emit('game start', rooms[room].player[k].hand)
        }
        
      console.log(`#####  card ended : ${rooms}`);
    });
  }

  return {
    sendRoomInfo,
    createRoom,
    enterRoom,
    chatMessage,
    cardShare,
  }
}

export default roomSocketMethods;