import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Modal } from 'flowbite-react';
import Swal from 'sweetalert2';

/* 회원가입 */
const SignupForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 
  /* 비밀번호 유효성 검사 */
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };
  /* 회원가입 */
  const requsetSignup = () => {
    if (!idCheck) {
      Swal.fire({
        "text" : 'id 중복체크하세요.',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }
    if(!validatePassword(pass)){
      Swal.fire({
        "text" : '비밀번호가 너무 약합니다',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }
    if (pass != passCheck) {
      Swal.fire({
        "text" : '비밀번호가 서로 일치하지 않습니다.',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }
    if(name.length <= 0){
      Swal.fire({
        "text" : '이름을 입력해주세요',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }
    if (!emailCheckSate) {
      Swal.fire({
        "text" : '아직 이메일 인증이 되지 않았습니다.',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }
    axios.post('https://spring.secretzoo.site/auth/signup',
      {
        "userId": id,
        "password": pass,
        "name": name,
        "email": email,
      }
    ).then((Response) => {
      console.log(Response.data);
      navigate('/');
    })
  }
  const [idCheck, setIdCheck] = useState(false);
  const [openIdCheckModal, setOpenIdCheckModal] = useState(false);
  const IdCheckModal = () => {
    const [checkIdInput, setCheckIdInput] = useState(id);
    const [idCheckState, setIdCheckState] = useState(false);
    const checkid = (id) => {
      axios.post('https://spring.secretzoo.site/users/check/' + id)
        .then(Response => {
          Swal.fire({
            "text" : '사용가능한 아이디입니다.',
            "confirmButtonColor" : '#3085d6'
          });
          setIdCheckState(true);
        }
        )
        .catch(e => {
          Swal.fire({
            "text" : '중복입니다.',
            "confirmButtonColor" : '#3085d6'
          });
        }
        )
    };
    return (
      <Modal show={openIdCheckModal} size="2xl" onClose={() => setOpenIdCheckModal(false)}>
        <form action="#">
          <Modal.Body>
            <Label>아이디</Label>
            <div className='flex'>
              <TextInput value={checkIdInput} onChange={(e) => { setCheckIdInput(e.target.value); setIdCheck(false) }}></TextInput>
              <Button onClick={() => { checkid(checkIdInput) }}>조회</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' onClick={(e) => {
              if (idCheckState) {
                e.preventDefault(); 
                setOpenIdCheckModal(false);
                setId(checkIdInput); 
                setIdCheck(true);
              } else {
                Swal.fire({
                  "text" : '중복체크하세요.',
                  "confirmButtonColor" : '#3085d6'
                });
              }
            }}
            >사용</Button>
            <Button color="gray" onClick={(e) => { setOpenIdCheckModal(false); setIdCheck(false) }}>
              취소
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
  const [verificationCode, setVerificationCode] = useState('');
  const [didEmailRequest, setDidEmailRequest] = useState(false);
  const [emailCheckSate, setEmailCheckState] = useState(false);
  const [openEmailCheck, setopenEmailCheck] = useState(false);
  
  const requsetEmailCode = () => {
    const data = {
      "email" : email,
    }

    Swal.fire({
      title: '처리 중입니다...',
      text: '잠시만 기다려 주세요.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    axios.post('https://spring.secretzoo.site/verify-email/send',data)
    .then(Response => {
      Swal.close();
      Swal.fire({
        "text" : '인증코드를 성공적으로 보냈습니다.',
        "confirmButtonColor" : '#3085d6'
      })
      setopenEmailCheck(true);
      setDidEmailRequest(true);
    }).catch(error => {
      Swal.close();
      if (error.response) {
        const statusCode = error.response.status;
        if(statusCode === 409 ){
          Swal.fire({
            "text" : '이미 가입된 이메일입니다.',
            "confirmButtonColor" : '#3085d6'
          });
        } else if (statusCode === 400){
          Swal.fire({
            "text" : '이메일 형식이 옳바르지 않습니다.',
            "confirmButtonColor" : '#3085d6'
          });
        } else {
          Swal.fire({
            "text" : '통신상태가 원활하지 않습니다 다시 시도해주세요',
            "confirmButtonColor" : '#3085d6'
          });
        }
      } else if (error.request) {

      } else {

      }
      
    });
  }
  const requsetEmailAuthorization = () =>{
    const data = {
      "email" : email,
      "verificationCode" : verificationCode,
    }
    axios.post('https://spring.secretzoo.site/verify-email/check',data)
    .then(Response => {
      Swal.fire({
        "text" : '인증코드가 일치합니다.',
        "confirmButtonColor" : '#3085d6'
      });
      setEmailCheckState(true);
    }).catch(error => {
      if (error.response) {
        Swal.fire({
          "text" : "인증코드가 옳바르지 않습니다.",
          "confirmButtonColor" : '#3085d6'
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      
    })
  }
  
  return (
    <>
      <div className='h-screen flex items-center '>
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
                  disabled={idCheck ? true : false}
                  className='flex-grow' />
                <Button onClick={() => setOpenIdCheckModal(true)}>중복확인</Button>
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
                placeholder="비밀번호" />
                <p className='text-[12px] text-gray-400 mt-2'>영문자,숫자를 포함한 8자 이상</p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="비밀번호 확인" />
              </div>
              <TextInput
                value={passCheck}
                onChange={(e) => setPassCheck(e.target.value)}
                type="password"
                placeholder="비밀번호 확인" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="이름" />
              </div>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="이름"  />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="이메일" />
              </div>
              <div className='flex'>
                <TextInput
                  value={email}
                  onChange={(e) => {setEmail(e.target.value); setDidEmailRequest(false)}}
                  type="email"
                  placeholder="이메일"
                  disabled={emailCheckSate ? true : false}
                  className='flex-grow' />
                <Button 
                disabled={emailCheckSate ? true : false}
                onClick={() => { requsetEmailCode()}}>{didEmailRequest ? '재요청' : '인증번호 요청'}</Button>
              </div>
              {openEmailCheck? (<div className='flex mt-2'>
                <TextInput
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  type="password"
                  placeholder="인증번호"
                  required
                  disabled={emailCheckSate ? true : false}
                  className='flex-grow' />
                <Button
                disabled={emailCheckSate ? true : false} 
                onClick={() => requsetEmailAuthorization()}>{emailCheckSate ? '인증완료' : '인증'}</Button>
              </div>) : null}
            </div>
            <Button
            type="submit" onClick={(e) => {e.preventDefault(); requsetSignup();}}>회원가입</Button>
          </form>
        </div>
        <IdCheckModal></IdCheckModal>
      </div>
    </>
  );
};

export default SignupForm;