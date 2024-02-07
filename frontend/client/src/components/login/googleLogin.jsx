import React from 'react';
import axios from 'axios';
import googleLoginImg from '../../assets/img/login/googleLoginImg.png';

const requsetGoogleLogin = () => {
  window.location.href='https://spring.secretzoo.site/oauth2/authorization/google';
}

const GoogleLogin = () => {
  return (
    <>
      <div className='relative'>
        <img 
        src={googleLoginImg}
        alt="구글 로그인"
        onClick={() => requsetGoogleLogin()}
        className='w-10 h-10 rounded-full border-2  hover:border-blue-500 hover:cursor-pointer'  />
      </div>
    </>
  );
};

export default GoogleLogin;