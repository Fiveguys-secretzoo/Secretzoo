import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from 'flowbite-react';

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
{
        axios.post('http://localhost:8080/auth/signup',
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
      <div className='container p-12 max-w-[35%] mx-auto py-12 flex flex-col items-center justify-center mt-5 bg-white shadow-lg rounded-xl'>
      <h2 className='text-3xl font-bold mb-3'>회원가입</h2>
        <form className="flex w-full flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="아이디" />
            </div>
            <div className='flex'>
            <TextInput 
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
            placeholder="아이디" 
            required 
            className='flex-grow'/>
            <Button>중복확인</Button>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="비밀번호" />
            </div>
            <TextInput
            value={pass}
            onChange={(e) => setPass(e.target.value)} 
            type="password" 
            placeholder="비밀번호" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="비밀번호 확인" />
            </div>
            <TextInput
            value={passCheck}
            onChange={(e) => setPassCheck(e.target.value)} 
            type="password" 
            placeholder="비밀번호 확인" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="이름" />
            </div>
            <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)} 
            type="text" 
            placeholder="이름" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="이메일" />
            </div>
            <div className='flex'>
            <TextInput 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="이메일" 
            required 
            className='flex-grow'/>
            <Button>인증</Button>
            </div>
          </div>
          <Button type="submit" onClick={() => (requsetLogin())}>로그인</Button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;