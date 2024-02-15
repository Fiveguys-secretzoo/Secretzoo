import { Server } from 'socket.io';
import models from '../models/models.js';
import axios from 'axios';


const model = models();
const { animals,
  score,
  Player,
  roomInfo,
  animalIds } = model;


const playSocketMethods = () => {

  /* 방에 처음 입장할 때 실행하게 되는 함수 */
  const getRoomInfoForGame = (socket, rooms, roomName, psq) => {
    let extractedData = {};
    let roomInfo = rooms[roomName];

    console.log(rooms);
    console.log(`##### [getRoomInfoForGame] roomName `);
    console.log(roomName);
    console.log(`##### [getRoomInfoForGame] roomInfo (room Object)`);
    console.log(roomInfo);
    if (roomName === undefined || roomName === null || roomName === "") return;
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
            'pn': player['pn'],
            'pen': [...player['pen']],
            'hand': [],
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
    socket.on('cardDrop', (roomName, playerSequence, from, to, card, callback) => {
      console.log("##### [cardDrop] card Dragged and Dropped")
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrop', from, to);
      console.log(`##### roomName : ${roomName} / psq : ${playerSequence} / f : ${from} / t : ${to} / c : ${card}`)
      if (card < 64) {
        rooms[roomName].ps[playerSequence].hand
          = rooms[roomName].ps[playerSequence].hand.filter((e) => e !== card);
        rooms[roomName].game.c = card;
      }

      rooms[roomName].game.state = 2;
      rooms[roomName].game.from = from;
      rooms[roomName].game.to = to;
      console.log(`##### [cardDrop] send card Dropped Data to [${roomName}], [${from}] => [${to}] a [${card}]`)
      callback(rooms[roomName].ps[playerSequence].hand);
      io.to(roomName).emit('cardDrop', rooms[roomName].game.state, from, to);
    })
  }

  // 카드 블러핑한 정보를 받고 같은 정보를 다른 모든 socket room 참여자 들에게 뿌린다.
  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (roomName, playerSequence, bCard) => {
      let from = rooms[roomName].game.from;
      let to = rooms[roomName].game.to;
      rooms[roomName].game.state = 3;
      rooms[roomName].game.bc = bCard;

      // 턴 플레이어 추가
      if (!rooms[roomName].game.tp.includes(from)) {
        rooms[roomName].game.tp.push(from);
      }
      if (!rooms[roomName].game.tp.includes(to)) {
        rooms[roomName].game.tp.push(to);
      }

      // 지금 턴 진행 플레이어 변경
      rooms[roomName].game.nt = rooms[roomName].game.to;

      // 스코어 추가
      console.log(`##### [addScore]`)
      rooms[roomName].ps[from].sc.atka += 1;
      rooms[roomName].ps[from].sc.t += 1;
      let cKind = Math.floor(rooms[roomName].game.c / 8);
      let bcKind = bCard % 8;
      if (cKind === bcKind) {
        console.log('truth')
        rooms[roomName].ps[from].sc[animals[cKind]].animalScore.atkt += 1;
      } else {
        console.log('lie')
        rooms[roomName].ps[from].sc[animals[cKind]].animalScore.atkl += 1;
      }


      console.log(`##### card Bluffed to ${bCard}, to room ${roomName}`)

      io.to(roomName).emit('cardBluffSelect', rooms[roomName].game.state, rooms[roomName].game.tp, from, to, bCard);
    })
  }

  // 패스 선택시 
  const passingTurnStart = (socket, io, rooms) => {
    socket.on('cardPass', (roomName, callback) => {

      // score 기록
      rooms[roomName].ps[rooms[roomName].game.to].sc.p += 1;

      // PASSING TURN
      rooms[roomName].game.state = 4;

      // 턴을 보낸 플레이어에 추가
      if (!rooms[roomName].game.tp.includes(rooms[roomName].game.from)) {
        rooms[roomName].game.tp.push(rooms[roomName].game.from);
      }

      callback(rooms[roomName].game.c);
      // to, from, nt 바꾸기 
      rooms[roomName].game.from = rooms[roomName].game.to;
      rooms[roomName].game.nt = rooms[roomName].game.from;
      rooms[roomName].game.to = '';
      io.to(roomName).emit('cardPass', rooms[roomName].game.state, rooms[roomName].game.tp, rooms[roomName].game.from, rooms[roomName].game.to, rooms[roomName].game.nt);

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


      io.to(roomName).emit('cardReveal', rooms[roomName].game.state, rooms[roomName].game.c, result.ans, result.nowTurn);
      checkLoser(socket, io, rooms, roomName);
    })
  }

  // 카드 def 시도 시 정답 확인 
  const checkCardReveal = (rooms, roomName, answer) => {
    let card, bCard;
    let cKind, bcKind;
    if (rooms && rooms[roomName] && rooms[roomName].game) {
      card = rooms[roomName].game.c;
      bCard = rooms[roomName].game.bc;
      cKind = Math.floor(card / 8);
      bcKind = (bCard % 8);
    }
    let isSame = (Math.floor(card / 8) === bCard);
    let nowTurnPlayer;


    rooms[roomName].game.tp = [];
    // 정답을 맞춘 경우
    if ((answer === 0 && isSame) || (answer === 2 && !isSame)) {

      let fromP = rooms[roomName].game.from;
      let toP = rooms[roomName].game.to;
      // score 기록

      console.log(`##### [addScore] fromP : ${fromP} / toP : ${toP}`);
      rooms[roomName].ps[fromP].sc[animals[cKind]].animalScore.atkf += 1;
      rooms[roomName].ps[toP].sc.t += 1;
      rooms[roomName].ps[toP].sc.defa += 1;
      rooms[roomName].ps[toP].sc.defs += 1;

      rooms[roomName].ps[toP].sc[animals[bcKind]].animalScore.defs += 1;
      if (cKind === bcKind) {
        rooms[roomName].ps[toP].sc[animals[bcKind]].animalScore.deft += 1;
      } else {
        rooms[roomName].ps[toP].sc[animals[bcKind]].animalScore.defd += 1;
      }

      nowTurnPlayer = rooms[roomName].game.from;
      return { 'ans': true, 'nowTurn': nowTurnPlayer };
    }

    // 정답을 틀린 경우
    else {
      let fromP = rooms[roomName].game.from;
      let toP = rooms[roomName].game.to;
      // score 기록 
      console.log(`##### [addScore] fromP : ${fromP} / toP : ${toP}`);

      rooms[roomName].ps[fromP].sc.atks += 1;
      rooms[roomName].ps[fromP].sc[animals[cKind]].animalScore.atks += 1;
      rooms[roomName].ps[toP].sc.t += 1;
      rooms[roomName].ps[toP].sc.defa += 1;

      rooms[roomName].ps[toP].sc[animals[bcKind]].animalScore.deff += 1;
      if (cKind === bcKind) {
        rooms[roomName].ps[toP].sc[animals[bcKind]].animalScore.defd += 1;
      } else {
        rooms[roomName].ps[toP].sc[animals[bcKind]].animalScore.deft += 1;
      }

      // 턴 바꾸기 
      nowTurnPlayer = rooms[roomName].game.to;
      rooms[roomName].game.from = rooms[roomName].game.to;
      rooms[roomName].nt = rooms[roomName].game.to;
      return { 'ans': false, 'nowTurn': nowTurnPlayer };
    }
  }

  const addPenalty = (io, rooms, roomName, nowTurnPlayer) => {
    //player Idx 찾기 
    console.log(`##### [addPenalty] nowTurnPlayer : ${nowTurnPlayer}`);

    // playerIdx에 지금 카드 패널티로 추가
    rooms[roomName].ps[nowTurnPlayer].pen[Math.floor(rooms[roomName].game.c / 8)]++;
    console.log(`##### [addPenalty] nowTurnPlayer, pen`)
    console.log(nowTurnPlayer)
    console.log(rooms[roomName].ps[nowTurnPlayer].pen)
    io.to(roomName).emit('penaltyAdd', { psq: nowTurnPlayer, pen: rooms[roomName].ps[nowTurnPlayer].pen });
  }

  // 서버에 스코어 전송 
  const sendScore = (rooms, roomName) => {
    for (let player in rooms[roomName].ps) {
      if (player.length < 10) {
        let rewardData = {
          'userSequence': Number(player),
          'round': rooms[roomName].ps[player].sc.r,
          'turn': rooms[roomName].ps[player].sc.t,
        };

        for (let animal of animals) {
          rewardData[animal] = {
            "animalId": rooms[roomName].ps[player].sc[animal].animalId,
            "animalScore": {
              "attackSuccess": rooms[roomName].ps[player].sc[animal].animalScore.atks,
              "attackFail": rooms[roomName].ps[player].sc[animal].animalScore.atkf,
              "defenseSuccess": rooms[roomName].ps[player].sc[animal].animalScore.defs,
              "defenseFail": rooms[roomName].ps[player].sc[animal].animalScore.deff,
              "trust": rooms[roomName].ps[player].sc[animal].animalScore.deft,
              "distrust": rooms[roomName].ps[player].sc[animal].animalScore.defd,
              "truth": rooms[roomName].ps[player].sc[animal].animalScore.atkt,
              "lie": rooms[roomName].ps[player].sc[animal].animalScore.atkl,
            }
          };
        }

        console.log(`##### [sendScore] reward sends`)
        console.log(rewardData);
        axios
          .post('https://spring.secretzoo.site/rewards/save', rewardData).then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
        let rankData = {
          'userSequence': Number(player),
          'round': rooms[roomName].ps[player].sc.r,
          'turn': rooms[roomName].ps[player].sc.t,
          'attackAttempt': rooms[roomName].ps[player].sc.atka,
          'attackSuccess': rooms[roomName].ps[player].sc.atks,
          'defenseAttempt': rooms[roomName].ps[player].sc.defa,
          'defenseSuccess': rooms[roomName].ps[player].sc.defs,
          'passCount': rooms[roomName].ps[player].sc.p,
        }
        console.log(`##### [sendScore] rank sends`)
        console.log(rankData);
        axios
          .post('https://spring.secretzoo.site/rank/save', rankData).then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      }


    }
  }

  // 방 정보 초기화
  const initRoomInfo = (rooms, roomName) => {
    rooms[roomName].status = 0;
    rooms[roomName].card = Array.from({ length: 64 }, (_, i) => i);
    // 손 초기화 
    for (let player in rooms[roomName].ps) {
      rooms[roomName].ps[player].hand = [];
      rooms[roomName].ps[player].pen = [0, 0, 0, 0, 0, 0, 0, 0];
      rooms[roomName].ps[player].sc = {
        'r': 1, // round Count
        't': 0, // turn Count 
        'p': 0, // pass Count
        'atka': 0, // attack Attempt
        'atks': 0, // attack Success
        'defa': 0, // defence Attempt
        'defs': 0, // defence Success
      }
      let count = 0;
      for (let animal of animals) {

        rooms[roomName].ps[player].sc[animal] = { 'animalScore': { ...score } };
        rooms[roomName].ps[player].sc[animal] = { ...rooms[roomName].ps[player].sc[animal], 'animalId': animalIds[count++] }
      }
    }
    rooms[roomName].game.state = 0;
    rooms[roomName].game.from = '';
    rooms[roomName].game.to = '';
    rooms[roomName].game.bc = '';
    rooms[roomName].game.c = '';
    rooms[roomName].game.tp = [];


  }

  const checkLoser = (socket, io, rooms, roomName) => {
    for (let player in rooms[roomName].ps) {
      for (let k = 0; k < 8; k++) {
        if (rooms[roomName].ps[player].pen[k] === 4 || rooms[roomName].ps[rooms[roomName].nt].hand.length === 0) {
          // 보내기 
          let bestAttackPlayer = '';
          let bestDefencePlayer = '';
          let bestPassPlayer = '';

          console.log(`[checkLoser] loser check... get best members...!`)
          let maxAttackSuccess = 0;
          let maxDefenceSuccess = 0;
          let maxPass = 0;
          let players = rooms[roomName].ps;
          console.log(players);
          for (let p in players) {
            console.log(p);
            console.log(players[p]);
            if (players[p].sc.atks > maxAttackSuccess) {
              maxAttackSuccess = players[p].sc.atks;
              bestAttackPlayer = p;
            }

            if (players[p].sc.defs > maxDefenceSuccess) {
              maxDefenceSuccess = players[p].sc.defs;
              bestDefencePlayer = p;
            }

            if (players[p].sc.p > maxPass) {
              maxPass = players[p].sc.p;
              bestPassPlayer = p;
            }
          }
          sendScore(rooms, roomName);


          setTimeout(() => {
            // 방 정보 초기화입니다.
            initRoomInfo(rooms, roomName);
            console.log(`[sendGameEnd] ${player} ${bestAttackPlayer} ${bestDefencePlayer} ${bestPassPlayer} ${maxAttackSuccess} ${maxDefenceSuccess} ${maxPass}`);
            io.to(roomName).emit("gameEnd", {
              'loserpsq': player,
              'bestAttackPlayer': bestAttackPlayer, 'maxAttackSuccess': maxAttackSuccess,
              'bestDefencePlayer': bestDefencePlayer, 'maxDefenceSuccess': maxDefenceSuccess,
              'bestPassPlayer': bestPassPlayer, 'maxPass': maxPass,
            });
            return;
          }, 2000)
          // 점수 전송
        }
      }
    }
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
  }
}

export default playSocketMethods;