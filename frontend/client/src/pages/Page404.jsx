import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/img/error/404.gif';
const Page404 = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className='text-center flex flex-col justify-center w-screen h-screen bg-white'>
        <h1 className='text-center text-9xl'>404</h1>
        <img src={img} alt='404페이지' className='w-[500px] mx-auto rounded' />
        <p className='p-2'>죄송합니다.</p>
        <p className='p-2'>요청하신 페이지가 없습니다.</p>
        <button className='bg-gray-100 m-2 p-2 w-20 mx-auto rounded shadow-md hover:bg-gray-200' onClick={() => goHome()}>홈으로</button>
      </div>
    </>
  );
};

export default Page404;