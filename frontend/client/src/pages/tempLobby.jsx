import React, {createContext} from 'react';
import {BorwserRouter as Router, Route, Routes} from 'react-router-dom';
import io from 'socket.io-client'

const socket = io('http://localhost:3000');
export const SocketContext = createContext();

