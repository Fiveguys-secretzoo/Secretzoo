import React, {useState, useEffect, useContext } from 'react';
import { SocketContext } from './App';

const RoomList = () => {
    const socket = useContext(SocketContext);
    useEffect(() => {
        const messageHandler = (msg) => {
        console.log(1)
        setMessages((msgs) => [...msgs, msg]);
        };
    
        socket.on('chat message', messageHandler);
    
        return () => {      
        socket.off('chat message', messageHandler);
        };
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default RoomList;