import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from 'flowbite-react';
const LoginForm = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const requsetLogin = () => {
    axios.post('https://spring.secretzoo.site/api/auth/login',
      {
        "userId": id,
        "password": pass,
      }
    ).then((response) => {
      sessionStorage.setItem('authorization', response.headers['authorization']);
      sessionStorage.setItem('refresh_token', response.headers['refresh_token']);
      sessionStorage.setItem('user', response.data);
      navigate('lobby');
    })
  }

  const signup = () => {
    navigate("/signup");
  }

  return (
    <>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label value="아이디" />
          </div>
          <TextInput
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text  "
            placeholder="아이디" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="비밀번호" />
          </div>
          <TextInput
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password" required />
        </div>
        <Button type="submit" onClick={(e) => { e.preventDefault(); requsetLogin() }}>로그인</Button>
      </form>
      <p className='mt-2 text-blue-500 hover:text-blue-700 cursor-pointer underline hover:no-underline transition duration-300 ease-in-out text-right'
        onClick={() => (signup())}>회원가입</p>
    </>
  );
};

export default LoginForm;