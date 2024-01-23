import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveName = () => {
    sessionStorage.setItem('userName', name);
    navigate("/lobby");
  };
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <button onClick={saveName}>로그인</button>
    </div>
  );
};

export default Login;
