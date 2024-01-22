const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const cors = require('cors');
const { Socket } = require('node:dgram');

async function main() {
  const express = require('express');
  const app = express();
  
  // cors 설정
  app.use(cors({
    origin: 'http://localhost:3001'
  }));

  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"]
    }
  });

  const rooms = {}

  /* 자료구조 game Info.players.player.score 순으로 nest */

  // 동물 이름을 미리 저장
  const animals = ['cat','dog','tiger','whale','sheep','fox','deer','pig'];

  // 여러 score를 담을 객체
  const score = {
    attackSuccess : 0,
    attackFail : 0,
    defenseSuccess : 0,
    defenseFail : 0,
    trust : 0,
    distrust : 0,
    lie : 0,
    truth : 0,
  }

  // 플레이어의 정보를 담을 객체 
  const Player = (id) => {
    let playerId = '';
    let hand = [];
    let penalty = [];
    let datas = {}
    let scores = {
      'round' : 0,
      'turn' : 0,
      'attackAttempt' : 0,
      'attackSuccess' : 0,
      'defenseAttempt' : 0,
      'defenseSuccess' : 0,
      'passCount' : 0,
    }
    for(let animal of animals){
      scores.push({animal : {...score}});
    }
  }

  // 게임 정보 객체
  const roomInfo = {
    'roomId':'',
    'roomName':'',
    'roomPassword':'',
    'roomAddress':'',
    'status':'',
    'createdDate':'',
    'card': Array.from({ length: 64 }, (_, i) => i + 1),
    'playerCount': 0,
    'players':[], // 플레이어 정보 배열 
  }

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
    console.log(room.card);

    while(i > 0){
      i--;
      console.log(room.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           card.length)
      for(let k = 0 ; k < room.playerCount ; k ++){
        room.playerHand[k].push(room.card.pop());
        if(room.card.length==0){
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
    rooms[roomName] = gameInfo;
    rooms[roomName].player[0] = new Player(playerId);

    /*TODO - send room data to backend server!!! */

    console.log(rooms[roomName].player[0].json());
  }

  /**
   * 유저 추가 (방이 존재하는 경우)
   * @param {string} roomName 방 이름
   * @param {string} id 유저 id 
   */
  const addPlayer = (roomName, playerId)=>{
    const room = rooms[roomName];
    room.playerCount ++;
    room[playerCount] = new Player(playerId);

    /*TODO - send room data and playerdata to backend server */

  }


  io.on('connection', async (socket) => {
    console.log(socket.id)

    /* 방 정보 전달 */
    socket.on('request rooms info',(callback) => {
      callback(rooms);
    });


    /* 방 생성 이벤트 */
    socket.on('create Room', (room, callback) => {
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

    /* 방 입장 이벤트 */
    socket.on('enter Room',(room,callback) => {
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
        socket.emit('update room',rooms);
        addPlayer(room,socket.id)
        callback(true)
        console.log(rooms)
      }
    });

    /* 채팅 메세지 이벤트 */
    socket.on('chat message', async (msg,user) => {
      let room;
      for(let nowRoom of socket.rooms){
        if(nowRoom !== socket.id){
          room = nowRoom;
        }
      }
      console.log(msg+","+room);
      io.to(room).emit('chat message', user+" : "+msg + "," + room); 
    });
    

    /* 게임시작 카드 나눠주기 */
    socket.on('start',() => {
      console.log(rooms);
      let room;
        for(let nowRoom of socket.rooms){
          if(nowRoom !== socket.id){
            room = nowRoom;
          }
        }
        console.log('셔플시작')
        shuffleArray(rooms[room]);
        console.log('셔플끝')
        io.to(rooms[room].player1id).emit('game start', rooms[room].player1hand)
        io.to(rooms[room].player2id).emit('game start', rooms[room].player2hand)
        io.to(rooms[room].player3id).emit('game start', rooms[room].player3hand)
        io.to(rooms[room].player4id).emit('game start', rooms[room].player4hand)
        io.to(rooms[room].player5id).emit('game start', rooms[room].player5hand)
        io.to(rooms[room].player6id).emit('game start', rooms[room].player6hand)
      console.log(rooms);
    });
  });

  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });
}

main();

