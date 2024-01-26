import React from 'react';
import axios from 'axios';
import googleLoginImg from '../../assets/img/login/googleLoginImg.png';
import '../../style/loginImg.css';

const requsetGoogleLogin = () => {
  axios.get('https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=316143191609-85f5g99kooie41r4iau6o82segj4aar1.apps.googleusercontent.com&redirect_uri="http://localhost:8080/login/oauth2/code/google"')
}

const GoogleLogin = () => {
  return (
    <>
      <div>
        <img 
        src={googleLoginImg}
        alt="구글 로그인"
        onClick={() => requsetGoogleLogin()}
        className='loginImg'  />
      </div>
    </>
  );
};

export default GoogleLogin;