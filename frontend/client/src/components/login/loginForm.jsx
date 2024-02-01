import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from 'flowbite-react';

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const requsetLogin = () => {
<<<<<<< HEAD
    axios.post('http://localhost:8080/login',
=======
    axios.post('https://secretzoo.site/api/auth/login',
>>>>>>> dev/frontend
      {
        "userId": id,
        "password": pass,
      }
    ).then((response) => {
<<<<<<< HEAD
=======
      sessionStorage.setItem('authorization',response.headers['authorization']);
      sessionStorage.setItem('refresh_token',response.headers['refresh_token']);
      navigate('lobby');
      console.log(response.headers);
>>>>>>> dev/frontend
      console.log(response.data);
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
<<<<<<< HEAD
          type="email" 
=======
          type="text  " 
>>>>>>> dev/frontend
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
<<<<<<< HEAD
        <Button type="submit" onClick={() => (requsetLogin())}>로그인</Button>
=======
        <Button type="submit" onClick={(e) => {e.preventDefault(); requsetLogin()}}>로그인</Button>
>>>>>>> dev/frontend
      </form>

        <p className='mt-2 text-blue-500 hover:text-blue-700 cursor-pointer underline hover:no-underline transition duration-300 ease-in-out text-right' 
        onClick={() => (signup())}>회원가입</p>
    </>
  );
};

export default LoginForm;