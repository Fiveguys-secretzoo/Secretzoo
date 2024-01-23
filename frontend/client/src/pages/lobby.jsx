import React from "react";
import Profile from "../components/lobby/profile";
import Navbar from "../components/lobby/navbar";
import { Outlet, } from "react-router-dom";
import '../style/lobby.css'
const Lobby = () => {
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
