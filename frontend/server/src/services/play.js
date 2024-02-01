import { Server } from 'socket.io';
import models from '../models/models.js';

const model = models();

const { animals,
  score,
  Player,
  roomInfo } = model;



const playSocketMethods = () => {

  // 방에 처음 입장할 때 실행하게 되는 함수
  const getRoomInfoForGame = (rooms, roomName) => {
    let extractedData = {};

    let roomInfo = rooms[roomName];

    console.log(`##### rooms[roomName] : ${rooms[roomName]}, and roomName : ${roomName}`)
    extractedData = {
      'roomId': roomInfo['roomId'],
      'roomName': roomInfo['roomName'],
      'roomAddress': roomInfo['roomAddress'],
      'status': roomInfo['status'],
      'createdDate': roomInfo['createdDate'],
      'playerCount': roomInfo['playerCount'],
      // socket 방에 추가적으로 플레이어의 정보를 넘길 시 여기에 넘겨야 한다.
      'players': roomInfo['players'].map(player => ({
        'playerId': player['playerId'],
        'playerName': player['Name'],
      })),
      'adminPlayer': roomInfo['adminPlayer'],
      'nowTurn': roomInfo['nowTurn'],
      'onBoard': { ...roomInfo['onBoard'] },
    };

    return extractedData;
  }

  /* 방 정보 전달, 보통 방 입장 시 초기에 혹은 Game 중간에 들어올 때 사용 */
  const sendGameInfo = async (socket, io, rooms) => {
    socket.on('requestGameInfo', (callback) => {

      let room;
      let roomsKeys = Object.keys(rooms);
      // pid 가 들어간 방 정보 찾기
      for (let roomName of roomsKeys) {
        for (let player of rooms[roomName].players) {
          if (player.socketId === socket.id) {
            room = roomName;
            break;
          }
        }
      }
      callback(getRoomInfoForGame(rooms, room));
      console.log(`##### Callback Game Info to Room ${room}`);
    });
  }

  // 카드 드래그한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardDrag = (socket, io, rooms) => {
    socket.on('cardDrag', (from, to) => {
      console.log("##### card Dragged and Entered...")
      let room;
      let roomsKeys = Object.keys(rooms);
      // pid 가 들어간 방 정보 찾기
      for (let roomName of roomsKeys) {
        for (let player of rooms[roomName].players) {
          if (player.socketId === socket.id) {
            room = roomName;
            break;
          }
        }
      }

      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrag', from, to);

      console.log(`##### send card Dragged Data to ${room}`)
      io.to(room).emit('cardDrag', from, to);
    })
  }

  // 카드 드롭한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardDrop = (socket, io, rooms) => {
    socket.on('cardDrop', (from, to, card) => {
      console.log("##### card Dragged and Dropped")
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrop', from, to);
      let room;
      let roomsKeys = Object.keys(rooms);
      for (let roomName of roomsKeys) {
        for (let player of rooms[roomName].players) {
          if (player.socketId === socket.id) {
            room = roomName;
            break;
          }
        }
      }
      rooms[room].onBoard.status = 1;
      rooms[room].onBoard.from = from;
      rooms[room].onBoard.to = to;
      rooms[room].onBoard.card = card;
      console.log(`##### send card Dropped Data to [${room}], [${from}] => [${to}] a [${card}]`)
      io.to(room).emit('cardDrop', from, to);
    })
  }

  // 카드 블러핑한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (bCard) => {
      let room;
      let roomsKeys = Object.keys(rooms);
      for (let roomName of roomsKeys) {
        for (let player of rooms[roomName].players) {
          if (player.socketId === socket.id) {
            room = roomName;
            break;
          }
        }
      }
      let from = rooms[room].onBoard.from;
      let to = rooms[room].onBoard.to;
      rooms[room].onBoard.status = 3;
      rooms[room].onBoard.cardBluff = bCard;
      if (!rooms[room].onBoard.turnedPlayer.includes(from)) {
        rooms[room].onBoard.turnedPlayer.push(from);
      }
      rooms[room].onBoard.turnedPlayer.push(to);
      console.log(`##### card Bluffed to ${bCard}, to room ${room}`)

      io.to(room).emit('cardBluffSelect', from, to, bCard);
    })
  }


  // 주는 턴 
  const givingTurnStart = (socket, io, rooms) => {
    socket.emit()
  }


  // 주는 턴에서 선택하는 경우!
  const givingTurnSelect = (socket, io, rooms) => {

  }

  const cardReveal = (socket, io, rooms) => {

  }

  const passingTurnSelect = (socket, io, rooms) => {

  }

  return {
    getRoomInfoForGame,
    sendGameInfo,
    cardDrag,
    cardDrop,
    cardBluffSelect,
    givingTurnStart,
    givingTurnSelect,
    cardReveal,
    passingTurnSelect,
  }
}

export default playSocketMethods;