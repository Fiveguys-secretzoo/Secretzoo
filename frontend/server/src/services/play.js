import { Server } from 'socket.io';
import models from '../models/models.js';

const model = models();

const { animals,
  score,
  Player,
  roomInfo } = model;

const playSocketMethods = () => {

  // 방에 처음 입장할 때 실행하게 되는 함수
  const getRoomInfoForGame = (socket, rooms, roomName, psq) => {
    let extractedData = {};
    let roomInfo = rooms[roomName];

    console.log(`##### [getRoomInfoForGame] roomName `);
    extractedData = {
      'rid': roomInfo['rid'],
      'rnm': roomInfo['rnm'],
      'radr': roomInfo['radr'],
      'status': roomInfo['status'],
      'cdt': roomInfo['cdt'],
      'pc': roomInfo['pc'],
      // socket 방에 추가적으로 플레이어의 정보를 넘길 시 여기에 넘겨야 한다.
      'ps':
        Object.keys(roomInfo.ps).reduce((acc, id) => {
          const player = roomInfo.ps[id];
          acc[id] = {
            'psq': player['psq'],
            'pnn': player['pnn'],
            'pen': [...player['pen']],
          };
          return acc;
        }, {}),
      'adm': roomInfo['adm'],
      'nt': roomInfo['nt'],
      'game': { ...roomInfo['game'] },
    };

    console.log(`##### [getRoomInfoForGame] state ${extractedData.game.state}`);
    if (extractedData.game.state !== 0) {
      console.log("##### [getRoomInfoForGame] entered socket emit sendCardInfo");
      let hand;
      for (let playerSequenceNumber in roomInfo['ps']) {
        console.log(playerSequenceNumber)
        if (playerSequenceNumber === psq) {
          console.log("##### [getRoomInfoForGame] player hand is down below")
          console.log(roomInfo.ps[playerSequenceNumber].hand);
          hand = roomInfo.ps[playerSequenceNumber].hand;
        }
      }
      socket.emit('sendCardInfo', hand)
    }
    return extractedData;
  }

  /* 방 정보 전달, 보통 방 입장 시 초기에 혹은 Game 중간에 들어올 때 사용 */
  const sendGameInfo = async (socket, io, rooms) => {
    socket.on('requestGameInfo', (roomName, playerSequenceNumber, callback) => {
      callback(getRoomInfoForGame(socket, rooms, roomName, playerSequenceNumber));
      console.log(`##### [sendGameInfo] Callback Game Info to Room ${roomName}`);
    });
  }

  // 카드 드래그한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardDrag = (socket, io, rooms) => {
    socket.on('cardDrag', (roomName, from, to) => {
      console.log("##### [cardDrag] card Dragged and Entered...")
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrag', from, to);
      console.log(`##### [cardDrag] send card Dragged Data to ${roomName}`)
      io.to(roomName).emit('cardDrag', from, to);
    })
  }

  // 카드 드롭한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardDrop = (socket, io, rooms) => {
    socket.on('cardDrop', (roomName, playerSequenceNumber, from, to, card) => {
      console.log("##### [cardDrop] card Dragged and Dropped")
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrop', from, to);

      if (card < 64) {
        rooms[roomName].ps[playerSequenceNumber].hand
          = rooms[roomName].ps[playerSequenceNumber].hand.filter((e) => e !== card);
        rooms[roomName].game.c = card;
      }

      rooms[roomName].game.state = 1;
      rooms[roomName].game.from = from;
      rooms[roomName].game.to = to;
      console.log(`##### [cardDrop] send card Dropped Data to [${roomName}], [${from}] => [${to}] a [${card}]`)
      io.to(roomName).emit('cardDrop', rooms[roomName].game.state, rooms[roomName].ps[playerSequenceNumber].hand, from, to);
    })
  }

  // 카드 블러핑한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (roomName, playerSequenceNumber, bCard) => {
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
      let from = rooms[room].game.from;
      let to = rooms[room].game.to;
      rooms[room].game.state = 3;
      rooms[room].game.bc = bCard;
      if (!rooms[room].game.turnedPlayer.includes(from)) {
        rooms[room].game.turnedPlayer.push(from);
      }
      rooms[room].game.turnedPlayer.push(to);
      console.log(`##### card Bluffed to ${bCard}, to room ${room}`)

      io.to(room).emit('cardBluffSelect', from, to, bCard);
    })
  }

  // 패스 선택시 
  const passingTurnStart = (socket, io, rooms) => {
    socket.on('cardPass', (room, callback) => {
      rooms[room].game.state = 4;
      rooms[room].game.tp.push(rooms[room].game.from);
      rooms[room].game.from = rooms[room].game.to;
      rooms[room].game.nt = rooms[room].game.from;
      rooms[room].game.to = -1;
      io.to(room).emit('cardPass', from, to, nowTurnPlayer);
      callback(rooms[room].game.c);
    })
  }

  const passingTurnSelect = (socket, io, rooms) => {

  }

  const cardReveal = (socket, io, rooms) => {
    socket.on('cardReveal', (roomName, answer) => {
      rooms[roomName].game.state = 1;
      console.log(`##### [cardReveal] room : [${roomName}] answer : [${answer}]`)
      let result = checkCardReveal(rooms, roomName, answer);
      console.log(`##### [cardReveal] result ${result}`)
      console.log(result);
      addPenalty(io, rooms, roomName, result.nowTurn);
      io.to(roomName).emit('cardReveal', rooms[roomName].game.state, result.ans, result.nowTurn);
    })
  }

  const checkCardReveal = (rooms, room, answer) => {
    let card, bCard;
    if (rooms && rooms[room] && rooms[room].game) {
      card = rooms[room].game.c;
      bCard = rooms[room].game.bc;
    }
    let isSame = (Math.floor(card / 8) === bCard);
    let nowTurnPlayer;
    if ((answer === 0 && isSame) || (answer === 2 && !isSame)) {
      nowTurnPlayer = rooms[room].game.from;
      return { 'ans': true, 'nowTurn': nowTurnPlayer };
    }
    else {
      nowTurnPlayer = rooms[room].game.to;
      rooms[room].game.from = rooms[room].game.to;
      rooms[room].nt = rooms[room].game.to;
      return { 'ans': false, 'nowTurn': nowTurnPlayer };
    }
  }

  const addPenalty = (io, rooms, room, nowTurnPlayer) => {
    //player Idx 찾기 
    console.log(`##### [addPenalty] nowTurnPlayer : ${nowTurnPlayer}`);

    // playerIdx에 지금 카드 패널티로 추가
    rooms[room].ps[nowTurnPlayer].p[Math.floor(rooms[room].game.c / 8)]++;
    io.to(room).emit('penaltyAdd', nowTurnPlayer, Math.floor(rooms[room].game.c / 8));
  }

  const checkLoser = (socket, io, rooms) => {
    socket.on("isTurnEnd", (room, callback) => {
      for (let player in rooms[room].ps) {
        for (let k = 0; k < 8; k++) {
          if (rooms[room].ps[player].p[k] === 4) {
            callback(rooms[room].ps[i].psq);
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