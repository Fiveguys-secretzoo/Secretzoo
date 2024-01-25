import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NoLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveName = () => {
    sessionStorage.setItem('userName', name);
    // axios.get('url',
    //   {
    //     param : 'param',
    //   },
    //   {
    //     Headers : {

    //     },
    //   }
    // ).then((Response) => {
      
    // })
    navigate("/lobby");
  };
  return (
    <>
      <div>
        <p>비회원으로 즐기기</p>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button onClick={saveName}>참가</button>
        <p>비회원은 일부 서비스를 이용할수 없습니다.</p>
      </div>
    </>
  );
};

export default NoLogin;
