import React, {useEffect, useContext} from "react";
import Profile from "../components/lobby/profile";
import Navbar from "../components/lobby/navbar";
import { Outlet, } from "react-router-dom";
import '../style/lobby.css'

import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";


const Lobby = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  useEffect(()=>{
    socket.on("serverClosed", (e) => {
      navigate('/');
    });
  })
  return (
    <>
      <div className="container">
        <div className="left">
          <Profile></Profile>
          <Navbar></Navbar>
        </div>
        <div className="right">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Lobby;
