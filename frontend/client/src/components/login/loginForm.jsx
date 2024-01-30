import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  

  const navigate = useNavigate();
  const requsetLogin = () => {
    axios.post('http://localhost:8080/login',
      {
        "userId": id,
        "password": pass,
      }
    ).then((response) => {
      console.log(response.data);
    })
  }

  const signup = () => {
    navigate("/signup");
  }
  return (
    <>
      <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-xl'>
        <h3 className="text-2xl font-bold text-center">로그인</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
          className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='아이디' 
          value={id}
          onChange={(e) => setId(e.target.value)}/>
          <input 
          className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          type='password'
          placeholder='비밀번호' 
          value={pass}
          onChange={(e) => setPass(e.target.value)}/>
          <button className='w-full px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          type="submit" onClick={() => (requsetLogin())}>로그인</button>
        </form>
        <p className='mt-2 text-blue-500 hover:text-blue-700 cursor-pointer underline hover:no-underline transition duration-300 ease-in-out text-right' 
        onClick={() => (signup())}>회원가입</p>
      </div>
    </>
  );
};

export default LoginForm;