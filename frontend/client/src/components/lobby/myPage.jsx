import React from 'react';
import MypageNav from '../mypage/mypageNav';
import { Outlet, } from "react-router-dom";

/* 마이페이지를 컴포넌트 네브와 내정보, 내랭킹, 내업적을 확인 */
const myPage = () => {
  if (sessionStorage.getItem('noLogin')) {
    return <div className='text-white text-center text-xl'>로그인하시면 이용할 수 있습니다.</div>;
  }

  return (
    <>
      <MypageNav></MypageNav>
      <Outlet></Outlet>
    </>
  );
};

export default myPage;