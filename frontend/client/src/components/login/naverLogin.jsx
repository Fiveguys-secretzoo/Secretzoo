import React from 'react';
import axios from 'axios';
import naverLoginImg from '../../assets/img/login/naverLoginImg.png';
import '../../style/loginImg.css';

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
        <img 
        src={naverLoginImg}
        alt="네이버 로그인"
        onClick={() => requsetNaverLogin()}
        className='loginImg'  />
      </div>
    </>
  );
};

export default NaverLogin;