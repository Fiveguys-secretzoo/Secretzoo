import React from 'react';
import axios from 'axios';
import naverLoginImg from '../../assets/img/login/naverLoginImg.png';

const requsetNaverLogin = () => {
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

const NaverLogin = () => {
  return (
    <>
      <div>
        <div></div>
        <img 
        src={naverLoginImg}
        alt="네이버 로그인"
        onClick={() => requsetNaverLogin()}
        className='loginImg w-10 h-10 hover:cursor-pointer'  />
      </div>
    </>
  );
};

export default NaverLogin;