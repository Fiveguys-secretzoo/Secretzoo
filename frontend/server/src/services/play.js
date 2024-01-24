import { Server } from 'socket.io';
import models from '../models/models.js';

const model = models();

const { animals,
  score,
  Player,
  roomInfo } = model;


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

const playSocketMethods = () => {

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
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrag', from, to);
      io.to(`/${socket.room}`).emit('cardDrag', from, to);
    })
  }

  const cardDrop = (socket, io, rooms) => {
    socket.on('cardDrop', (from, to) => {
      // io.to(rooms[socket.room].players[k].socketId).emit('cardDrop', from, to);
      io.to(`/${socket.room}`).emit('cardDrop', from, to);
    })
  }

  const cardBluffSelect = (socket, io, rooms) => {
    socket.on('cardBluffSelect', (from, to, card) => {
      // io.to(rooms[socket.room].players[k].socketId).emit('cardBluffSelect', from, to);
      io.to(`/${socket.room}`).emit('cardBluffSelect', from, to);
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