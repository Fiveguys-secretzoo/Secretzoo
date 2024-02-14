import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const requsetLogin = () => {
    if(id.length  === 0){
      Swal.fire({
      "text" : '아이디를 입력하세요',
      "confirmButtonColor" : '#3085d6'
    });
      return;
    }

    if(pass.length === 0){
      Swal.fire({
        "text" : '비밀번호를 입력하세요',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }

     axios.post('https://spring.secretzoo.site/auth/login',
      {
        "userId": id,
        "password": pass,
      }
    ).then(response => {
      const expiresIn = response.data['expires_in'] - 600000; 
      const expiresAt = Date.now() + expiresIn;
      sessionStorage.setItem('access-token', response.data['access-token']);
      sessionStorage.setItem('refresh-token', response.data['refresh-token']);
      sessionStorage.setItem('token_type', response.data['token_type']);
      sessionStorage.setItem('expires_at', expiresAt.toString());
      navigate('lobby');
    }).catch(e => {
      Swal.fire({
        "text" : '아이디 혹은 비밀번호가 일치하지 않습니다',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    })
  }

  const signup = () => {
    navigate("/signup");
  }

  return (
    <>
      <form className="flex max-w-md flex-col gap-4 space-y-5">
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
            type="password" 
            required
            placeholder='비밀번호' />
        </div>
        <Button type="submit" onClick={(e) => { e.preventDefault(); requsetLogin() }}>로그인</Button>
      </form>
      <p className='mt-2 text-blue-500 hover:text-blue-700 cursor-pointer underline hover:no-underline transition duration-300 ease-in-out text-right'
        onClick={() => (signup())}>회원가입</p>
    </>
  );
};

export default LoginForm;