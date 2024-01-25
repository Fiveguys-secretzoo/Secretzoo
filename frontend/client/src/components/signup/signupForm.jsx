import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../style/signupForm.css';

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
  }
  return (
    <>
      <div className='signupContainer'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)} />
          <div>
            <input 
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={idCheck} />
            <button onClick={(e) => setIdCheck(true)}>중복체크</button>
          </div>
          <input 
          placeholder='비밀번호'
          value={pass}
          onChange={(e) => setPass(e.target.value)} />
          <input 
          placeholder='비밀번호확인'
          value={passCheck}
          onChange={(e) => setPassCheck(e.target.value)} />
          <p>{passCheck.length>0 ?  pass == passCheck ? "비밀번호가일치합니다.":"비밀번호가 일치 하지 않습니다." : ""}</p>
          <div>
            <input 
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailCheck} />
            <button onClick={() => setEmailCheck(true)}>중복체크</button>
          </div>
          <button type="submit" onClick={() => (requsetLogin())}>회원가입</button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;