import React from 'react';
import MypageNav from '../mypage/mypageNav';
import { Outlet, } from "react-router-dom";


const myPage = () => {
  return (
    <>
      <MypageNav></MypageNav>
      <Outlet></Outlet>
    </>
  );
};

export default myPage;