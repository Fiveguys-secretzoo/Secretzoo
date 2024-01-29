import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NoLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveName = () => {
    sessionStorage.setItem('userName', name);
    axios.get('url',
      {
        param : 'param',
      },
      {
        Headers : {

        },
      }
    ).then((Response) => {
      
    })
    navigate("/lobby");
  };
  return (
    <>
      <div className="pt-20">
        <h3 className="text-2xl font-bold text-center">비회원으로 즐기기</h3>
        <input className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
        value={name} onChange={(e) => setName(e.target.value)}></input>
        <button className='w-full px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
        onClick={saveName}>참가</button>
      </div>
    </>
  );
};

export default NoLogin;
