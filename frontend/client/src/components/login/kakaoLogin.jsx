import React from 'react';
import axios from 'axios';
import kakaoLoginImg from '../../assets/img/login/kakaoLoginImg.png';

const requsetKakaoLogin = () => {
  window.location.href='http://localhost:8080/oauth2/authorization/kakao';
}

const KakaoLogin = () => {
  return (
    <>
      <div>
        <img 
        src={kakaoLoginImg}
        alt="카카오 로그인"
        onClick={() => requsetKakaoLogin()}
        className='w-10 h-10 rounded-full border-2 hover:border-blue-500 hover:cursor-pointer '  />
      </div>
    </>
  );
};

export default KakaoLogin;