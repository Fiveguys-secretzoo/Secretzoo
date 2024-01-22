import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [playerId, setPlayerId] = useState[""]

  /* player Id Click Button */
  const idSetClick = () => {
    localStorage.setItem('playerId', playerId);
    Navigation('/choose-room');
  }
  return (
    <>
      <div>
        <h2>사용자 정보를 입력하세요 ( 임시 )</h2>
        <input value={playerId} onChange={(value) => setPlayerId(e.target.value)} placeholder="ID를 입력하세요" />
        <button onClick={idSetClick}>ID 입력</button>
      </div>
    </>
  )
}

export default Login;