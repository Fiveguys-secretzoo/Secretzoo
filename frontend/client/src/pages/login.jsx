import React, { useEffect } from "react";
import LoginForm from "../components/login/loginForm";
import NoLogin from "../components/login/noLogin";
import GoogleLogin from "../components/login/googleLogin";
import KakaoLogin from "../components/login/kakaoLogin";
import NaverLogin from "../components/login/naverLogin";
import '../style/login.css';
import {css, keyframes} from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem('access-token')){
      navigate('lobby');      
    }
  });
  return (
    <>
    <div className="bg-lobby-bg w-screen h-screen bg-cover z-[-10]">
        <div className="flex flex-col items-center justify-center h-screen bg-custom-opacity">
          <div className="bg-main-logo logo w-[18em] h-[11em] bg-cover bg-no-repeat p-2"></div>
          <div className="flex opacity-[90%]">
            <div className="p-6 max-w-sm mx-2 min-h-[32em] min-w-[24em] bg-white rounded-xl shadow-md">
              <div className="space-y-5">
                <p className="text-center font-['DNFBitBitv2']">로그인</p>
                <LoginForm></LoginForm>
                <hr className="border-t-2 border-gray-200 mt-5" />
                <p className="text-center mt-5">소셜 로그인</p>
                <div className="flex justify-center space-x-3 mt-5">
                  <GoogleLogin></GoogleLogin>
                  <KakaoLogin></KakaoLogin>
                  <NaverLogin></NaverLogin>
                </div>
              </div>
            </div>
            <div className="p-6 max-w-sm mx-2 min-h-[32em] min-w-[24em] bg-white rounded-xl shadow-md">
              <p className="text-center"> 비회원으로 참여하기</p>
              <NoLogin></NoLogin>
              
              <Alert color="info" className="mt-44">
                <span className="font-medium">공지 : </span> 현재 네이버 로그인은 점검중입니다.
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
