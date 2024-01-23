import React, {createContext}  from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import io from 'socket.io-client';
import Lobby from './pages/lobby'
import Login from './pages/login'
import Play from './pages/play'
import Rooms from './components/lobby/rooms';
import Ranking from './components/lobby/ranking';
import MyPage from './components/lobby/myPage';

const socket = io('http://localhost:3000');
export const SocketContext = createContext();


function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <div className="App">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/lobby' element={<Lobby/>}>
              <Route index element = {<Rooms/>}/>
              <Route path='/lobby/ranking' element={<Ranking/>}/>
              <Route path='/lobby/myPage' element={<MyPage/>}/>
            </Route>
            <Route path='/play' element={<Play/>}/> 
          </Routes>
        </div>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
