import { Server } from 'socket.io';
import models from '../models/models.js';

const model = models();

const { animals,
  score,
  Player,
  roomInfo } = model;

const playSocketMethods = () => {

  // 방에 처음 입장할 때 실행하게 되는 함수
  const getRoomInfoForGame = (rooms, roomName, pid, socket) => {
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
        'penalty': [...player['penalty']],
      })),
      'adminPlayer': roomInfo['adminPlayer'],
      'nowTurn': roomInfo['nowTurn'],
      'onBoard': { ...roomInfo['onBoard'] },
    };

    console.log(`##### status ${extractedData.onBoard.status}`);
    if (extractedData.onBoard.status !== 0) {
      console.log("entered socket emit sendCArdInfo");
      let hand;
      for (let player of roomInfo['players']) {
        console.log(player)
        if (player.playerId === pid) {
          console.log("##### player hand is down below")
          console.log(player.hand);
          hand = player.hand
        }
      }
      socket.emit('sendCardInfo', hand)
    }
    return extractedData;
  }

  /* 방 정보 전달, 보통 방 입장 시 초기에 혹은 Game 중간에 들어올 때 사용 */
  const sendGameInfo = async (socket, io, rooms) => {
    socket.on('requestGameInfo', (callback) => {
      let pid;
      let room;
      let roomsKeys = Object.keys(rooms);
      // pid 가 들어간 방 정보 찾기

      for (let roomName of roomsKeys) {
        for (let player of rooms[roomName].players) {
          if (player.socketId === socket.id) {
            room = roomName;
            pid = player.playerId;
            break;
          }
        }
      }
      callback(getRoomInfoForGame(rooms, room, pid, socket));
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
      console.log(room);
      console.log(rooms);
      if (card < 64) {
        rooms[room].onBoard.card = card;
      }
      rooms[room].onBoard.status = 1;
      rooms[room].onBoard.from = from;
      rooms[room].onBoard.to = to;
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

  // 패스 선택시 
  const passingTurnStart = (socket, io, rooms) => {
    socket.on('cardPass', (room, callback) => {
      rooms[room].onBoard.status = 4;
      rooms[room].onBoard.turnedPlayer.push(rooms[room].onBoard.from);
      rooms[room].onBoard.from = rooms[room].onBoard.to;
      rooms[room].onBoard.nowTurn = rooms[room].onBoard.from;
      rooms[room].onBoard.to = -1;
      io.to(room).emit('cardPass', from, nowTurnPlayer);
      callback(rooms[room].onBoard.card);
    })
  }

  const passingTurnSelect = (socket, io, rooms) => {

  }

  const cardReveal = (socket, io, rooms) => {
    socket.on('cardReveal', (room, answer) => {
      rooms[room].onBoard.status = 1;
      console.log(`##### [cardReveal] room : [${room}] answer : [${answer}]`)
      let result = checkCardReveal(rooms, room, answer);
      console.log(`##### [cardReveal] result ${result}`)
      console.log(result);
      addPenalty(io, rooms, room, result.nowTurn);
      io.to(room).emit('cardReveal', result.ans, result.nowTurn);
    })
  }

  const checkCardReveal = (rooms, room, answer) => {
    let card, bCard;
    if (rooms && rooms[room] && rooms[room].onBoard) {
      card = rooms[room].onBoard.card;
      bCard = rooms[room].onBoard.cardBluff;
    }
    let isSame = (Math.floor(card / 8) === bCard);
    let nowTurnPlayer;
    if ((answer === 0 && isSame) || (answer === 2 && !isSame)) {
      nowTurnPlayer = rooms[room].onBoard.from;
      return { 'ans': true, 'nowTurn': nowTurnPlayer };
    }
    else {
      nowTurnPlayer = rooms[room].onBoard.to;
      rooms[room].onBoard.from = rooms[room].onBoard.to;
      rooms[room].nowTurn = rooms[room].onBoard.to;
      return { 'ans': false, 'nowTurn': nowTurnPlayer };
    }
  }

  const addPenalty = (io, rooms, room, nowTurnPlayer) => {
    //player Idx 찾기 
    let playerIdx;
    for (let i = 0; i < rooms[room].players.length; i++) {
      if (rooms[room].players[i].playerId === nowTurnPlayer) {
        playerIdx = i;
        break;
      }
    }
    console.log(`##### playerIdx : ${playerIdx} / nowTurnPlayer : ${nowTurnPlayer}`);

    // playerIdx에 지금 카드 패널티로 추가
    rooms[room].players[playerIdx].penalty[Math.floor(rooms[room].onBoard.card / 8)]++;
    io.to(room).emit('penaltyAdd', nowTurnPlayer, Math.floor(rooms[room].onBoard.card / 8));
  }

  const checkLoser = (socket, io, rooms) => {
    socket.on("isTurnEnd", (room, callback) => {
      for (let i = 0; i < rooms[room].players.length; i++) {
        for (let k = 0; k < 8; k++) {
          if (rooms[room].players[i].penalty[k] === 4) {
            callback(rooms[room].players[i].playerId);
            return;
          }
        }
      }
      callback(false);
    });
  }

  return {
    getRoomInfoForGame,
    sendGameInfo,
    cardDrag,
    cardDrop,
    cardBluffSelect,
    passingTurnStart,
    cardReveal,
    passingTurnSelect,
    checkLoser,
  }
}

export default playSocketMethods;