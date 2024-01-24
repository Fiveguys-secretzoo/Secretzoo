import React from 'react';
import axios from 'axios';
import googleLoginImg from '../../assets/img/login/googleLoginImg.png';
import '../../style/loginImg.css';

const requsetGoogleLogin = () => {
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