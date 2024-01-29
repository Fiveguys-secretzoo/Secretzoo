import React from 'react';
import axios from 'axios';
import googleLoginImg from '../../assets/img/login/googleLoginImg.png';

const requsetGoogleLogin = () => {
  axios.get('https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=316143191609-85f5g99kooie41r4iau6o82segj4aar1.apps.googleusercontent.com&redirect_uri="http://localhost:8080/login/oauth2/code/google"')
}

const GoogleLogin = () => {
  return (
    <>
      <div className='relative'>
        <div className='w-10 h-10 rounded-full absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 ease-in-out'></div>
        <img 
        src={googleLoginImg}
        alt="구글 로그인"
        onClick={() => requsetGoogleLogin()}
        className='w-10 h-10 rounded-full hover:cursor-pointer'  />
      </div>
    </>
  );
};

export default GoogleLogin;