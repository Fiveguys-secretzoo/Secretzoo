import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';
import { Socket } from 'node:dgram';
import express from 'express';

import roomSocketMethods from './src/services/room.js';
import playSocketMethods from './src/services/play.js';

//TODO Node.js 에서 Spring으로 보낼 때의 인증(IP 체크!)


async function main() {
  const app = express();

  const roomMethods = roomSocketMethods();
  const playMethods = playSocketMethods();
  const {
    sendRoomInfo,
    createRoom,
    enterRoom,
    chatMessage,
    cardShare,
    testRoomsInfo,
    disconnected,
    checkReconnection,
    leaveRoom,
  } = roomMethods;

  const {
    sendGameInfo,
    cardDrag,
    cardDrop,
    cardBluffSelect,
    givingTurnStart,
    givingTurnSelect,
    cardReveal,
    passingTurnStart,
    passingTurnSelect,
    checkLoser,
  } = playMethods;

  //리액트 서버
  const serverURL = 'http://localhost:3000'
  // const serverURL = 'http://react-app:3000'
  // const serverURL = 'https://secretzoo.site'
  // cors 설정
  app.use(cors({
    origin: serverURL
  }));

  const server = createServer(app);
  const io = new Server(server, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    forceNew: false,
    connectionStateRecovery: {},
    cors: {
      origin: serverURL,
      methods: ["GET", "POST"]
    }
  });

  const rooms = {}

  const handleException = (io, err, message) => {
    console.log(err);
    console.log(message);
    io.emit("serverClosed", "err");
    process.exit(1);
  }
  /* Socket 연결 후 부분 */
  io.on('connection', async (socket) => {
    let disconnectedTimeout;
    console.log(`##### connection added, socket.id : ${socket.id}`);


    // room listening
    sendRoomInfo(socket, io, rooms);
    createRoom(socket, io, rooms);
    enterRoom(socket, io, rooms);
    chatMessage(socket, io, rooms);
    cardShare(socket, io, rooms);
    checkReconnection(socket, io, rooms);
    leaveRoom(socket, io, rooms);

    // game listening 
    sendGameInfo(socket, io, rooms);
    cardDrag(socket, io, rooms);
    cardDrop(socket, io, rooms);
    cardBluffSelect(socket, io, rooms);
    passingTurnStart(socket, io, rooms);
    cardReveal(socket, io, rooms);
    checkLoser(socket, io, rooms);

    // test codes
    testRoomsInfo(socket, io, rooms);
    disconnected(socket, io, rooms);


    process.on('uncaughtException', (err) => {
      handleException(io, err, "서버, 에러로 인한 죽음의 메아리 발동 ")
    })
    process.on('exit', (err) => {
      handleException(io, err, "서버, 죽음의 메아리 발동 ")
    })
    process.on('SIGINT', (err) => {
      handleException(io, err, "서버, 죽음의 메아리 명령어 발동 ")
    })
  });

  server.listen(3001, () => {
    console.log('server running at http://localhost:3000');
  });
}

main();

