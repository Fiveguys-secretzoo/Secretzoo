import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [email, setEmail] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const navigate = useNavigate();
  const requsetLogin = () => {
    if(idCheck && emailCheck && pass===passCheck && 
      name.length > 0 && id.length > 0 && pass.length > 0 && passCheck.length > 0 && email.length > 0){
        axios.post('http://localhost:8080/users/signup',
      {
        "userId": id,
        "password": pass,
        "name": name,
        "email": email,
        "nickname": "kjy"
      }
    ).then((Response) => {
      console.log(Response.data);
    })
      }
  }

  return (
    <>
      <div className='container max-w-[35%] mx-auto py-12 flex flex-col items-center justify-center mt-[100px] bg-white shadow-lg rounded-xl'>
        <h2 className='text-3xl font-bold'>회원가입</h2>
        <form className='px-8 py-6 mt-4 text-left '
        onSubmit={(e) => e.preventDefault()}>
          <input 
          className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)} />
          <div className='flex'>
            <input 
            className='flex-grow p-2 mt-2 mr-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={idCheck} />
            <button onClick={(e) => setIdCheck(true)}>중복체크</button>
          </div>
          <input 
          className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='비밀번호'
          value={pass}
          onChange={(e) => setPass(e.target.value)} />
          <input 
          className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='비밀번호확인'
          value={passCheck}
          onChange={(e) => setPassCheck(e.target.value)} />
          <p className='text-red-500'
          >{passCheck.length>0 ?  pass == passCheck ? "비밀번호가일치합니다.":"비밀번호가 일치 하지 않습니다." : ""}</p>
          <div className='flex'>
            <input 
            className='flex-grow p-2 mt-2 mr-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailCheck} />
            <button onClick={() => setEmailCheck(true)}>중복체크</button>
          </div>
          <button className='w-full px-6 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          type="submit" onClick={() => (requsetLogin())}>회원가입</button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;