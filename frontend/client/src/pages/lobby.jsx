import React, { useEffect, useContext } from "react";
import Profile from "../components/lobby/profile";
import Navbar from "../components/lobby/navbar";
import { Outlet, } from "react-router-dom";
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "../store/userSlice";
const Lobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("serverClosed", (e) => {
      navigate('/');
    });
  })
  useEffect(() => {
    return () => {
      dispatch(resetUserInfo())
    }
  },[dispatch]);

  return (
    <>
      <div className='flex flex-row items-center justify-center h-screen w-screen'>
        <div className='flex flex-col min-h-[90%] min-w-[20em] p-4 mx-4 bg-white rounded-md '>
          <Profile></Profile>
          <Navbar></Navbar>
        </div>
        <div className='h-[90%] min-w-[50em] px-20 py-5 bg-white rounded-md'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Lobby;
