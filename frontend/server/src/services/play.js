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
      'adminPlayer': roomInfo['adminPlayer'],
      'players': roomInfo['players'].map(player => ({
        'playerId': player['playerId'],
        'playerName': player['Name'],
      }))
    };
  }
  
  /* 방 정보 전달 / Game 에서 사용 */ 
  const sendGameInfo = async (socket, io, rooms) => {
    socket.on('requestGameInfo', () => {
      socket.emit('', () => {
        callback(getRoomInfoForGame(rooms, socket.room));
      });
      console.log(`##### Callback Game Info to Room ${socket.room}`);
    });
  }

  const cardDrag = (socket, io, rooms) => {
    socket.on('cardDrag', (from, to) => {
      console.log("##### card Dragged and Entered...")
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
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrag', from, to);
      console.log(`##### send card Dragged Data to ${room}`)
      io.to(room).emit('cardDrag', from, to);
    })
  }

  const cardDrop = (socket, io, rooms) => {
    socket.on('cardDrop', (from, to) => {
      
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
      console.log(`##### send card Dropped Data to ${room}`)
      io.to(room).emit('cardDrop', from, to);
    })
  }

  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (from,  card) => {
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

      console.log(`##### card Bluffed to ${card}, to room ${room}`)
      
      io.to(room).emit('cardBluffSelect', from, to, card);
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