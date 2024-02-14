import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client'

import Login from './tempLogin';
import Lobby from './tempLobby';
import Game from './tempGame';

const socket = io('http://localhost:3000');
export const SocketContext = createContext();

const MainPage = () => {

  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <div>
          <Routes>
            <Route path="/" exact element={<Login></Login>} />
            <Route path="/lobby" element={<Lobby></Lobby>} />
            <Route path="/game" element={<Game></Game>} />
          </Routes>
        </div>
      </SocketContext.Provider>
    </Router>
  )
}

export default MainPage;