import React from "react";
import LoginForm from "../components/login/loginForm";
import NoLogin from "../components/login/noLogin";
import GoogleLogin from "../components/login/googleLogin";
import KakaoLogin from "../components/login/kakaoLogin";
import NaverLogin from "../components/login/naverLogin";
import '../style/login.css';
const Login = () => {

  return (
    <>
      <div className="loginContainer">
        <div className="left">
          <LoginForm></LoginForm>
          <div className="social">
            <GoogleLogin></GoogleLogin>
            <KakaoLogin></KakaoLogin>
            <NaverLogin></NaverLogin>
          </div>
        </div>
        <div className="right">
          <NoLogin></NoLogin>
        </div>
      </div>
    </>
  );
};

export default Login;
