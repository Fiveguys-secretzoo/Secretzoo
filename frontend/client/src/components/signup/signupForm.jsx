import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../style/loginForm.css';

const SignupForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [email, setEmail] = useState("");
  
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
      navigate("/");
    })
  }
  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)} />
          <div>
            <input 
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.target.value)} />
            <button>중복체크</button>
          </div>
          <input 
          placeholder='비밀번호'
          value={pass}
          onChange={(e) => setPass(e.target.value)} />
          <input 
          placeholder='비밀번호확인'
          value={passCheck}
          onChange={(e) => setPassCheck(e.target.value)} />
          <div>
            <input 
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <button>중복체크</button>
          </div>
          <button type="submit" onClick={() => (requsetLogin())}>회원가입</button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;