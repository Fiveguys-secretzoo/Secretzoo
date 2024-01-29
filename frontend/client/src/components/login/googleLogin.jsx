import React from 'react';
import axios from 'axios';
import googleLoginImg from '../../assets/img/login/googleLoginImg.png';

const requsetGoogleLogin = () => {
  axios.get('http://localhost:8080/api/v1/google');
}

const GoogleLogin = () => {
  return (
    <>
      <div className='relative'>
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