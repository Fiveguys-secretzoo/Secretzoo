import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/img/error/404.gif';
import { Button } from 'flowbite-react';
import ai from '../assets/img/ai.png';
const Page404 = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const [secret1, setSecret1] = useState(0);
  const [secret2, setSecret2] = useState(0);
  const [secret3, setSecret3] = useState(0);
  const [showAiImage, setShowAiImage] = useState(false);
  const isSecretUnlocked = secret1 >= 3 && secret2 >= 3 && secret3 >= 3;
  return (
    <>
    { isSecretUnlocked ? (<div className='w-screen h-screen bg-white flex items-center justify-center'>
            <img 
            src={ai} 
            style={{
              transition: 'opacity 2s ease-in-out, visibility 0.5s ease-in-out',
              opacity: showAiImage ? 1 : 0,
            }}
            className='absolute right-64'
          />
      <Button onClick={() => setShowAiImage(true)}>누르지마시오</Button>
    </div>
      ):
      <div className='text-center flex flex-col justify-center w-screen h-screen bg-white'>
        <h1 className='text-center text-9xl' onClick={() => setSecret1(secret1+1)}>404</h1>
        <img src={img} alt='404페이지' className='w-[500px] mx-auto rounded' />
        <p className='p-2' onClick={() => setSecret2(secret2+1)}>죄송합니다.</p>
        <p className='p-2' onClick={() => setSecret3(secret3+1)}>요청하신 페이지가 없습니다.</p>
        <button className='bg-gray-100 m-2 p-2 w-20 mx-auto rounded shadow-md hover:bg-gray-200' onClick={() => goHome()}>홈으로</button>
      </div>
    }
    </>
  );
};

export default Page404;