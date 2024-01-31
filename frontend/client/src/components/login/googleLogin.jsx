import React from 'react';
import axios from 'axios';
import googleLoginImg from '../../assets/img/login/googleLoginImg.png';

const requsetGoogleLogin = () => {
<<<<<<< HEAD
  window.location.href=('http://localhost:8080/oauth2/authorization/google')
=======
  window.location.href='http://localhost:8080/oauth2/authorization/google';
>>>>>>> 02b36548b02e1c04d3edf61908092d7babe82d0c
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