import { createServer } from 'node:http';
import { join }  from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';
import { Socket } from 'node:dgram';
import express from 'express';

import roomSocketMethods from './services/room.js'

//TODO Node.js 에서 Spring으로 보낼 때의 인증(IP 체크!)


async function main() {
  const app = express();
  
  const roomMethods = roomSocketMethods();

  const {
    sendRoomInfo,
    createRoom,
    enterRoom,
    chatMessage,
    cardShare,
    testRoomsInfo,
    disconnected,
  } = roomMethods;

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
  /* Socket 연결 후 부분 */
  io.on('connection', async (socket) => {
    let disconnectedTimeout;
    console.log(`##### connection added, socket.id : ${socket.id}`);

    sendRoomInfo(socket, io, rooms);
    createRoom(socket, io, rooms);
    enterRoom(socket, io, rooms);
    chatMessage(socket, io, rooms);
    cardShare(socket, io, rooms);


    // test codes
    testRoomsInfo(socket, io, rooms);

    disconnected(socket, io, rooms);
  });

  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });
}

main();

