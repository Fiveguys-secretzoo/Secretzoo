import React, { useEffect, useContext } from "react";
import Profile from "../components/lobby/profile";
import Navbar from "../components/lobby/navbar";
import { Outlet, } from "react-router-dom";
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Lobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("serverClosed", (e) => {
      navigate('/');
    });
  })

  return (
    <>
      <div className='flex flex-row items-center justify-center h-screen w-screen'>
        <div className='flex flex-col min-h-[90%] min-w-[20em] p-4 mx-4 rounded-md bg-custom-opacity2'>
          <Profile></Profile>
          <Navbar></Navbar>
        </div>
        <div className='h-[90%] min-w-[50em] max-w-[50em] bg-custom-opacity2 px-20 py-5 rounded-md'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Lobby;
