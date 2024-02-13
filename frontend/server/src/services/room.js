
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
 */
const shuffleArray = (rooms, roomName) => {
  rooms[roomName].card = Array.from({ length: 64 }, (_, i) => i);
  let array = rooms[roomName].card;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  let i = 20;
  console.log(`##### room card : ${rooms[roomName].card}`);

  while (i > 0) {
    i--;
    for (let psq in rooms[roomName].ps) {
      if (rooms[roomName].card.length === 0) {
        break;
      }
      rooms[roomName].ps[psq].hand.push(rooms[roomName].card.pop());
    }
  }
}

/**
 * 방 생성 (방이 존재하지 않는 경우)
 */
const addRoom = (rooms, roomName, playerSequence, socketId, playerNickName) => {

  rooms[roomName] = JSON.parse(JSON.stringify(roomInfo)); // 깊은 복사로 수정 완료
  rooms[roomName].rnm = roomName;
  rooms[roomName].ps[playerSequence] = { ...Player(playerSequence, socketId, playerNickName) };
  rooms[roomName].adm = playerSequence;
  console.log(`##### [addRoom] player ${playerSequence} socket ${socketId} playerNN ${playerNickName} created Room ${roomName}`);
  /*TODO - send room data to backend server!!! */
  console.log(rooms[roomName]);
  console.log(`##### [addRoom] create room : ${roomName}`);
}

/**
 * 유저 추가 (방이 존재하는 경우)
 */
const addPlayer = (io, socket, rooms, roomName, playerSequence, socketId, playerNickName) => {
  let isFirst = true;
  console.log(rooms[roomName]);
  // 이미 방에 들어가 있는지 체크 

  for (let player in rooms[roomName].ps) {
    if (player === playerSequence) {
      isFirst = false;
      break;
    }
  }

  if (isFirst) {
    let newPlayer = { ...Player(playerSequence, socketId, playerNickName) }
    let playerData = {
      'psq': newPlayer.psq,
      'pn': newPlayer.pn,
    }
    rooms[roomName].pc++;
    rooms[roomName].ps[playerSequence] = { ...newPlayer };

    console.log("##### [addPlayer] player Enter Message emitted");
    let playersData = Object.keys(rooms[roomName].ps).reduce((acc, id) => {
      const player = rooms[roomName].ps[id];
      acc[id] = {
        'psq': player.psq,
        'pn': player.pn,
        'pen': player.pen,
      };
      return acc;
    }, {});

    io.to(roomName).emit('playerEnter', playersData);
  }
  console.log(`##### [addPlayer] p : ${playerSequence} s : ${socketId} pn : ${playerNickName} 
      entered Room ${roomName}`);

  /*TODO - send room data and player data to backend server */

}

/**
 * 로비 데이터 보내기
 */
const getRoomInfoForLobby = (rooms) => {
  let lobbyInfo = {};

  for (let room in rooms) {
    let info = rooms[room];
    lobbyInfo[room] = {
      'roomId': info['rid'],
      'roomName': info['rnm'],
      'roomAddress': info['radr'],
      'status': info['status'],
      'createdDate': info['cdt'],
      'playerCount': info['pc'],
      'adminPlayer': info['adm'],
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
 */
const removePlayer = (io, socket, rooms, roomName, psq) => {
  console.log(`##### [removePlayer]`);
  console.log(rooms);
  console.log(rooms[roomName]);
  console.log(roomName);
  delete rooms[roomName].ps[psq];
  rooms[roomName].pc -= 1;
  io.to(roomName).emit('playerLeave', rooms[roomName].ps);
  if (rooms[roomName].pc === 0) {
    removeRoom(rooms, roomName);
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
      console.log("##### [sendRoomInfo] callback roomsInfo");
      // roomName, roomId, playerCount, roomAdmin, roomStatus 전달
      callback(getRoomInfoForLobby(rooms));
    });
  }

  /* 방 생성 이벤트 */
  const createRoom = async (socket, io, rooms) => {
    socket.on('createRoom', (roomName, psq, pn, callback) => {
      if (Object.keys(rooms).includes(roomName)) {
        callback(false);
      } else {
        // 기존방 나가기
        for (let nowRoom of socket.rooms) {
          if (nowRoom !== socket.id) {
            socket.leave(nowRoom);
            delete rooms[nowRoom];
          }
        }

        addRoom(rooms, roomName, psq, socket.id, pn);
        console.log(`##### [createRoom] player [${socket.id}], make room ${roomName}`)

        // 입력받은 방 들어가기
        socket.join(roomName);
        rooms[roomName].nt = psq;
        callback(true);
      }
    });
  }

  /* 방 입장 이벤트 */
  const enterRoom = async (socket, io, rooms) => {
    socket.on('enterRoom', (roomName, psq, pn, callback) => {

      if (roomName === undefined || rooms[roomName] === undefined) { // 방이 사라진 경우...
        callback(false)
      }

      const matchingKey = Object.keys(rooms[roomName].ps).find(key => rooms[roomName].ps[key].psq === psq);
      if (matchingKey === undefined) {
        // 인원수 체크
        if (rooms[roomName] && rooms[roomName].pc >= 6) {
          callback(false);
        }
        // 기존방 나가기
        for (let nowRoom of socket.rooms) {
          if (nowRoom !== socket.id) {
            socket.leave(nowRoom);
            removePlayer(io, socket, rooms, nowRoom, psq);
          }
        }
      }
      for (let rn in rooms) {
        for (let p in rooms[rn].ps) {
          if (p === psq) {
            removePlayer(io, socket, rooms, rn, psq);
          }
        }
      }

      // 입력받은 방 들어가기
      socket.join(roomName);

      // console.log(io.of('/').adapter.rooms);
      socket.emit('updateRoom', rooms);
      addPlayer(io, socket, rooms, roomName, psq, socket.id, pn)
      callback(true)
      console.log(`##### [enterRoom] player ${socket.id} join room : ${roomName}`);

    });
  }

  // 방 퇴장
  const leaveRoom = async (socket, io, rooms) => {
    socket.on('leaveRoom', (roomName, psq) => {
      console.log(`##### [leaveRoom] leave Room, ${roomName} and ${psq}`)
      removePlayer(io, socket, rooms, roomName, psq);
      socket.leave(roomName);
    })

  }



  /* 방 새로고침 이벤트 */
  const checkReconnection = async (socket, io, rooms) => {
    socket.on('checkReconnection', (psq, callback) => {
      console.log(`##### [checkReconnection] Checking Reconnection of User ${psq}`);
      try {
        for (let room in rooms) {
          for (let p in rooms[room].ps) {
            if (p === psq) {
              rooms[room].ps[p].sid = socket.id;
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
    socket.on('start', (roomName) => {
      console.log(`##### [cardShare] current Room : [${(roomName)}]`);
      shuffleArray(rooms, roomName);
      console.log('##### [cardShare] Shuffle End')
      rooms[roomName].status = 1;
      rooms[roomName].game.state = 1;
      for (let psq in rooms[roomName].ps) {
        io.to(rooms[roomName].ps[psq].sid).emit('gameStart', rooms[roomName].game.state, rooms[roomName].ps[psq].hand)
      }
      console.log(`##### [cardShare] card ended : ${rooms}`);
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