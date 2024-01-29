import React from 'react';
import axios from 'axios';
import kakaoLoginImg from '../../assets/img/login/kakaoLoginImg.png';

const requsetKakaoLogin = () => {
  axios.get('url',
    {
      params : {
        
      },
      headers : {

      },
    }
  ).then((Response) => {
    
  })
}

const KakaoLogin = () => {
  return (
    <>
      <div>
        <img 
        src={kakaoLoginImg}
        alt="카카오 로그인"
        onClick={() => requsetKakaoLogin()}
        className='w-10 h-10 rounded-full border-2 hover:border-blue-500'  />
      </div>
    </>
  );
};

export default KakaoLogin;