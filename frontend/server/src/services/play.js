import { Server } from 'socket.io';
import models from '../models/models.js';

const model = models();

const { animals,
  score,
  Player,
  roomInfo } = model;



const playSocketMethods = () => {
  const getRoomInfoForGame = (rooms, roomName) => {
    let extractedData = {};

    let room = rooms[roomName];
    let roomInfo = rooms[room];
    extractedData[room] = {
      'roomId': roomInfo['roomId'],
      'roomName': roomInfo['roomName'],
      'roomAddress': roomInfo['roomAddress'],
      'status': roomInfo['status'],
      'createdDate': roomInfo['createdDate'],
      'playerCount': roomInfo['playerCount'],
      'players': roomInfo['players'].map(player => ({
        'playerId': player['playerId'],
        'playerName': player['Name'],
      })),
      'adminPlayer': roomInfo['adminPlayer'],
      'nowTurn': roomInfo['nowTurn'],
      'onBoard': { ...roomInfo['onBoard'] },
    };
  }

  /* 방 정보 전달 / Game 에서 사용 */
  const sendGameInfo = async (socket, io, rooms) => {
    socket.on('requestGameInfo', () => {
      callback(getRoomInfoForGame(rooms, socket.room));
      console.log(`##### Callback Game Info to Room ${socket.room}`);
    });
  }

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
      console.log(`##### send card Dropped Data to ${room}`)
      io.to(room).emit('cardDrop', from, to);
    })
  }

  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (from, bCard) => {
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
      let to = rooms[room].onBoard.to;
      rooms[room].onBoard.status = 3;
      rooms[room].onBoard.bluffCard = bCard;
      if (!rooms[room].onBoard.turnedPlayer.includes(from)) {
        rooms[room].onBoard.turnedPlayer.push(from);
      }
      rooms[room].onBoard.turnedPlayer.push(to);
      console.log(`##### card Bluffed to ${bCard}, to room ${room}`)

      io.to(room).emit('cardBluffSelect', from, to, bCard);
    })
  }

  const givingTurnStart = (socket, io, rooms) => {

  }

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