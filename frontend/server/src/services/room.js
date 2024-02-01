
import { Server } from 'socket.io';
import models from '../models/models.js';

import playSocketMethods from './play.js';

const model = models();
const playMethods = playSocketMethods();

const { animals,
  score,
  Player,
  roomInfo } = model

const {
  getRoomInfoForGame,
  sendGameInfo,
} = playMethods;

/**
 * 카드 셔플 후 분배
 * @param {Object} room 방 객체
 * @returns 
 */
const shuffleArray = (rooms, roomName) => {
  let array = rooms[roomName].card
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  let i = 20;
  console.log(`##### room card : ${rooms[roomName].card}`);

  while (i > 0) {
    i--;
    for (let k = 0; k < rooms[roomName].playerCount; k++) {
      if (rooms[roomName].card.length === 0) {
        break;
      }
      rooms[roomName].players[k].hand.push(rooms[roomName].card.pop());
    }
  }
}

/**
 * 방 생성 (방이 존재하지 않는 경우)
 * @param {string} roomName 방 이름 
 * @param {string} id 유저 id 
 */
const addRoom = (rooms, roomName, playerId, socketId) => {

  rooms[roomName] = JSON.parse(JSON.stringify(roomInfo)); // 깊은 복사로 수정 완료
  rooms[roomName].roomName = roomName;
  rooms[roomName].players.push({ ...Player(playerId, socketId) });
  rooms[roomName].adminPlayer = playerId;
  console.log(`##### player ${playerId} socket ${socketId} created Room ${roomName}`);
  /*TODO - send room data to backend server!!! */

  console.log(`##### create room : ${rooms[roomName].players}`);
}

/**
 * 유저 추가 (방이 존재하는 경우)
 * @param {string} roomName 방 이름
 * @param {string} id 유저 id 
 */
const addPlayer = (rooms, roomName, playerId, socketId, socket, io) => {
  let isFirst = true;
  console.log(rooms[roomName]);
  // 이미 방에 들어가 있는지 체크 
  try {
    for (let player of rooms[roomName].players) {
      if (player.playerId === playerId) {
        isFirst = false;
        break;
      }
    }
  } catch (e) {
    console.log("##### Error!!! players not Exist!!")
    console.log(rooms[roomName])
  }
  if (isFirst) {
    rooms[roomName].playerCount++;
    let newPlayer = Player(playerId, socketId)
    let playerData = {
      'playerId': newPlayer.playerId,
      'playerName': newPlayer.playerName
    }
    console.log("##### player Enter Message emitted");
    for (let k = 0; k < rooms[roomName].players.length; k++) {
      io.to(rooms[roomName].players[k].socketId).emit('playerEnter', playerData)
    }
    rooms[roomName].players.push({ ...newPlayer });
  }
  console.log(`##### player ${playerId} socket ${socketId} entered Room ${roomName}`);
  /*TODO - send room data and player data to backend server */

  sendGameInfo(socket, io, rooms);
}

/**
 * 로비 데이터 보내기
 * @param {Object} rooms 
 * @returns 
 */
const getRoomInfoForLobby = (rooms) => {
  let lobbyInfo = {};

  for (let room in rooms) {
    let info = rooms[room];
    lobbyInfo[room] = {
      'roomId': info['roomId'],
      'roomName': info['roomName'],
      'roomAddress': info['roomAddress'],
      'status': info['status'],
      'createdDate': info['createdDate'],
      'playerCount': info['playerCount'],
      'adminPlayer': info['adminPlayer'],
    };
  }
  return lobbyInfo;
}

/* 방 삭제 */
const removeRoom = (rooms, room) => {
  delete rooms[room];
}

/**
 * 유저 퇴장 
 * @param {String} roomName 
 * @param {String} playerId 
 */
const removePlayer = (rooms, room, id, socket, io) => {

  for (let k = 0; k < rooms[room].players.length; k++) {
    io.to(rooms[room].players[k].socketId).emit('playerLeave', id)
  }
  rooms[room].players = rooms[room].players.filter((e) => e.playerId !== id);
  rooms[room].playerCount -= 1;
  if (rooms[room].playerCount === 0) {
    removeRoom(rooms, room);
  }
};

const handleDisconnect = (socket, io, rooms) => {
  //TODO - handles the disconnection situation
}


const roomSocketMethods = () => {

  /**
   * Socket IO 관련 함수들 정의
   */

  /* 방 정보 전달 / 로비에서 사용 */
  const sendRoomInfo = async (socket, io, rooms) => {
    socket.on('requestRoomsInfo', (callback) => {
      console.log("##### callback roomsInfo");

      // roomName, roomId, playerCount, roomAdmin, roomStatus 전달

      callback(getRoomInfoForLobby(rooms));
    });
  }

  /* 방 생성 이벤트 */
  const createRoom = async (socket, io, rooms) => {
    socket.on('createRoom', (room, pid, callback) => {
      if (Object.keys(rooms).includes(room)) {
        callback(false);
      } else {
        addRoom(rooms, room, pid, socket.id);
        console.log(`##### player [${socket.id}], make room ${room}`)

        // 기존방 나가기
        for (let nowRoom of socket.rooms) {
          if (nowRoom !== socket.id) {
            socket.leave(nowRoom);
          }
        }

        // 입력받은 방 들어가기
        socket.join(room);
        rooms[room].nowTurn = pid;
        callback(true);
      }
    });
  }

  /* 방 입장 이벤트 */
  const enterRoom = async (socket, io, rooms) => {
    socket.on('enterRoom', (room, pid, callback) => {
      // 인원수 체크
      if (rooms[room] && rooms[room].playerCount >= 6) {
        callback(false);
      } else {
        // 기존방 나가기
        for (let nowRoom of socket.rooms) {
          if (nowRoom !== socket.id) {
            socket.leave(nowRoom);
            removePlayer(rooms, nowRoom, pid, socket, io);
          }
        }

        // 입력받은 방 들어가기
        socket.join(room);

        // console.log(io.of('/').adapter.rooms);
        socket.emit('updateRoom', rooms);
        addPlayer(rooms, room, pid, socket.id, socket, io)
        callback(true)
        console.log(`##### player ${socket.id} join room : ${room}`);
      }
    });
  }

  // 방 퇴장
  const leaveRoom = async (socket, io, rooms) => {
    socket.on('leaveRoom', (room, id, callback) => {
      console.log(`##### leave Room, ${room} and ${id}`)
      removePlayer(rooms, room, id, socket, io);
      socket.leave(room);
    })

  }



  /* 방 새로고침 이벤트 */
  const checkReconnection = async (socket, io, rooms) => {
    socket.on('checkReconnection', (pid, callback) => {
      console.log(`##### Checking Reconnection of User ${pid}`);
      try {
        for (let room in rooms) {
          for (let player of rooms[room].players) {
            if (player.playerId === pid) {
              player.socketId = socket.id;
              socket.join(room);
              break;
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    })
  }

  /* 채팅 메세지 이벤트 */
  const chatMessage = async (socket, io, rooms) => {
    socket.on('chatMessage', async (msg, user) => {
      let room;
      for (let nowRoom of socket.rooms) {
        if (nowRoom !== socket.id) {
          room = nowRoom;
        }
      }
      console.log(`##### chat message : ${msg} + " / room : " + ${room}`);
      io.to(room).emit('chatMessage', user + " : " + msg + "," + room);
    });
  }


  /* 게임시작 카드 나눠주기 */
  const cardShare = async (socket, io, rooms) => {
    socket.on('start', () => {
      console.log(`##### card room : ${rooms}`);
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
      console.log(`##### current Room : (${(rooms[room].roomName) ? rooms[room].roomName : "err"})`);
      shuffleArray(rooms, room);
      console.log('##### Shuffle End')

      for (let k = 0; k < rooms[room].players.length; k++) {
        io.to(rooms[room].players[k].socketId).emit('gameStart', rooms[room].players[k].hand)
      }
      console.log(`#####  card ended : ${rooms}`);
    });
  }

  /** 방 정보 테스트 구동  */
  const testRoomsInfo = async (socket, io, rooms) => {
    socket.on('testRoomsInfo', (callback) => {
      console.log("#### test Room Info")
      callback(rooms);
    })
  }

  const disconnected = async (socket, io, rooms) => {
    let disconnectedTimeout;
    socket.on('disconnect', () => {
      console.log('##### disconnect socket');
      disconnectedTimeout = setTimeout((socket, io, rooms) => {
        handleDisconnect(socket, io, rooms);
      }, 5, 60, 1000);
    })
  }

  return {
    sendRoomInfo,
    createRoom,
    enterRoom,
    chatMessage,
    cardShare,
    testRoomsInfo,
    disconnected,
    checkReconnection,
    leaveRoom,
  }
}

export default roomSocketMethods;