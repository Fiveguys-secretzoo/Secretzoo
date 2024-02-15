import React from 'react';
import axios from 'axios';
import naverLoginImg from '../../assets/img/login/naverLoginImg.png';

const requsetNaverLogin = () => {
  window.location.href = 'https://spring.secretzoo.site/oauth2/authorization/naver';
}
/* 네이버 로그인 */
const NaverLogin = () => {
  return (
    <>
      <div>
        <div></div>
        <img
          src={naverLoginImg}
          alt="네이버 로그인"
          onClick={() => requsetNaverLogin()}
          className='rounded-full w-10 h-10 border-2 hover:border-blue-500 hover:cursor-pointer' />
      </div>
    </>
  );
};

export default NaverLogin;