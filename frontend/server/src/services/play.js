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
    console.log(roomName);
    console.log(`##### [getRoomInfoForGame] roomInfo (room Object)`);
    console.log(roomInfo);
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
      for (let playerSeqeunce in roomInfo['ps']) {
        console.log(playerSeqeunce)
        if (playerSeqeunce === psq) {
          console.log("##### [getRoomInfoForGame] player hand is down below")
          console.log(roomInfo.ps[playerSeqeunce].hand);
          hand = roomInfo.ps[playerSeqeunce].hand;
        }
      }
      socket.emit('sendCardInfo', hand)
    }
    return extractedData;
  }

  /* 방 정보 전달, 보통 방 입장 시 초기에 혹은 Game 중간에 들어올 때 사용 */
  const sendGameInfo = async (socket, io, rooms) => {
    socket.on('requestGameInfo', (roomName, playerSeqeunce, callback) => {
      console.log(`##### [sendGameInfo] roomName : ${roomName} / psq : ${playerSeqeunce}`);
      callback(getRoomInfoForGame(socket, rooms, roomName, playerSeqeunce));
      console.log(`##### [sendGameInfo] Callback Game Info to Room ${roomName}`);
    });
  }

  // 카드 드래그한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardDrag = (socket, io, rooms) => {
    socket.on('cardDrag', (roomName, playerSeqeunce, from, to) => {
      console.log("##### [cardDrag] card Dragged and Entered...")
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrag', from, to);
      console.log(`##### [cardDrag] send card Dragged Data to ${roomName}`)
      if (rooms[roomName].nt === playerSeqeunce) {
        io.to(roomName).emit('cardDrag', from, to);
      } else {
        console.log(`##### [cardDrag] not a now turn player dragged`);
      }
    })
  }

  // 카드 드롭한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardDrop = (socket, io, rooms) => {
    socket.on('cardDrop', (roomName, playerSeqeunce, from, to, card, callback) => {
      console.log("##### [cardDrop] card Dragged and Dropped")
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrop', from, to);

      if (card < 64) {
        rooms[roomName].ps[playerSeqeunce].hand
          = rooms[roomName].ps[playerSeqeunce].hand.filter((e) => e !== card);
        rooms[roomName].game.c = card;
      }

      rooms[roomName].game.state = 1;
      rooms[roomName].game.from = from;
      rooms[roomName].game.to = to;
      console.log(`##### [cardDrop] send card Dropped Data to [${roomName}], [${from}] => [${to}] a [${card}]`)
      callback(rooms[roomName].ps[playerSeqeunce].hand);
      io.to(roomName).emit('cardDrop', rooms[roomName].game.state, from, to);
    })
  }

  // 카드 블러핑한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (roomName, playerSeqeunce, bCard) => {

      let from = rooms[roomName].game.from;
      let to = rooms[roomName].game.to;
      rooms[roomName].game.state = 3;
      rooms[roomName].game.bc = bCard;
      if (!rooms[roomName].game.tp.includes(from)) {
        rooms[roomName].game.tp.push(from);
      }
      rooms[roomName].game.tp.push(to);
      console.log(`##### card Bluffed to ${bCard}, to room ${roomName}`)

      io.to(roomName).emit('cardBluffSelect', rooms[roomName].game.state, rooms[roomName].game.tp, from, to, bCard);
    })
  }

  // 패스 선택시 
  const passingTurnStart = (socket, io, rooms) => {
    socket.on('cardPass', (roomName, callback) => {
      rooms[roomName].game.state = 4;
      rooms[roomName].game.tp.push(rooms[roomName].game.from);
      rooms[roomName].game.from = rooms[roomName].game.to;
      rooms[roomName].game.nt = rooms[roomName].game.from;
      rooms[roomName].game.to = '';
      io.to(roomName).emit('cardPass', rooms[roomName].game.state, rooms[roomName].game.tp, rooms[roomName].game.from, rooms[roomName].game.to, rooms[roomName].game.nt);
      callback(rooms[roomName].game.c);
    })
  }

  const passingTurnSelect = (socket, io, rooms) => {

  }

  // 카드 정답 맞추면 공개..!
  const cardReveal = (socket, io, rooms) => {
    socket.on('cardReveal', (roomName, answer) => {
      rooms[roomName].game.state = 1; // 여기서는 1로 기록하지만 클라이언트는 5로 기록(결과 화면을 위함)
      console.log(`##### [cardReveal] room : [${roomName}] answer : [${answer}]`)
      let result = checkCardReveal(rooms, roomName, answer);
      console.log(`##### [cardReveal] result ${result}`)
      console.log(result);
      addPenalty(io, rooms, roomName, result.nowTurn);
      io.to(roomName).emit('cardReveal', rooms[roomName].game.state, rooms[roomName].game.card, result.ans, result.nowTurn);
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
    io.to(room).emit('penaltyAdd', nowTurnPlayer, rooms[room].ps[nowTurnPlayer].p);
  }

  const checkLoser = (socket, io, rooms) => {
    socket.on("isTurnEnd", (roomName, callback) => {
      for (let player in rooms[roomName].ps) {
        for (let k = 0; k < 8; k++) {
          if (rooms[roomName].ps[player].p[k] === 4) {
            callback(rooms[roomName].ps[i].psq);
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