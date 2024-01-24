import React, {useState} from 'react';
import axios from 'axios';
import '../../style/loginForm.css';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  

  const navigate = useNavigate();
  const requsetLogin = () => {
    axios.get('url',
      {
        params : {
          
        },
        headers : {

        },
      }
    ).then((Response) => {
      
      navigate("/lobby");
    })
  }
  const signup = () => {
    navigate("/signup");
  }
  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
          placeholder='아이디' 
          value={id}
          onChange={(e) => setId(e.target.value)}/>
          <input 
          placeholder='비밀번호' 
          value={pass}
          onChange={(e) => setPass(e.target.value)}/>
          <button type="submit" onClick={() => (requsetLogin())}>로그인</button>
        </form>
        <button onClick={() => (signup())}>회원가입</button>
      </div>
    </>
  );
};

export default LoginForm;