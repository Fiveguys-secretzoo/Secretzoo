import React from "react";
import LoginForm from "../components/login/loginForm";
import NoLogin from "../components/login/noLogin";
import GoogleLogin from "../components/login/googleLogin";
import KakaoLogin from "../components/login/kakaoLogin";
import NaverLogin from "../components/login/naverLogin";
const Login = () => {

  return (
    <>
      <div className="flex flex-row items-center justify-center h-screen opacity-[90%]">
        <div className="p-6 max-w-sm mx-2 min-h-[32em] min-w-[24em] bg-white rounded-xl shadow-md">
          <p className="text-center font-['DNFBitBitv2']">로그인</p>
          <LoginForm></LoginForm>
          <hr className="border-t-2 border-gray-200 mt-5"/>
          <p className="text-center mt-5">소셜 로그인</p>
          <div className="flex justify-center space-x-3 mt-5">
            <GoogleLogin></GoogleLogin>
            <KakaoLogin></KakaoLogin>
            <NaverLogin></NaverLogin>
          </div>
        </div>
        <div className="p-6 max-w-sm mx-2 min-h-[32em] min-w-[24em] bg-white rounded-xl shadow-md">
          <p className="text-center"> 비회원으로 참여하기</p>
          <NoLogin></NoLogin>
        </div>
      </div>
    </>
  );
};

export default Login;
