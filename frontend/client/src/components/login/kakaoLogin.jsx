import React from 'react';
import axios from 'axios';
import kakaoLoginImg from '../../assets/img/login/kakaoLoginImg.png';
import '../../style/loginImg.css';

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
        className='loginImg'  />
      </div>
    </>
  );
};

export default KakaoLogin;