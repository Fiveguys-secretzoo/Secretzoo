import React from 'react';
import MypageNav from '../mypage/mypageNav';
import { Outlet, } from "react-router-dom";


const myPage = () => {
  if (sessionStorage.getItem('noLogin')) {
    return <div>로그인하시면 이용할 수 있습니다.</div>;
  }

  return (
    <>
      <MypageNav></MypageNav>
      <Outlet></Outlet>
    </>
  );
};

export default myPage;