import React from "react";
import Profile from "../components/lobby/profile";
import Navbar from "../components/lobby/navbar";
import { Outlet, } from "react-router-dom";
const Lobby = () => {
  return (
    <>
      <div className='flex flex-row items-center justify-center h-screen'>
        <div className='flex flex-col min-h-[90%] min-w-[20em] p-4 mx-4 bg-white rounded-md '>
          <Profile></Profile>
          <Navbar></Navbar>
        </div>
        <div className='min-h-[90%] min-w-[50em] px-20 py-5 bg-white rounded-md'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Lobby;
