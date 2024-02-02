import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from 'flowbite-react';

const NoLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveName = () => {
    sessionStorage.setItem('noLogin', true);
    sessionStorage.setItem('userNickname', name);
    navigate("/lobby");
  };
  return (
    <>
      <div className='pt-20'>
          <div className="mb-2 block">
            <Label value="닉네임" />
          </div>
          <TextInput 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="비회원으로 사용할 닉네임"
          type="text" required />
      </div>
      <Button 
      type="submit" 
      onClick={() => (saveName())}
      className="w-full mt-2">참가</Button>
    </>
  );
};

export default NoLogin;
