import React, {createContext}  from 'react';
import './App.css';
import io from 'socket.io-client';
import Rooms from './components/lobby/rooms';

const socket = io('http://localhost:3000');
export const SocketContext = createContext();


function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
       <Rooms></Rooms>
     
      </div>
    </SocketContext.Provider>
  );
}

export default App;
