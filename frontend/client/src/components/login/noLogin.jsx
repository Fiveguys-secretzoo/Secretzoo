import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from 'flowbite-react';

const NoLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveName = () => {
    if (name.length > 0) {
      sessionStorage.setItem('noLogin', true);
      sessionStorage.setItem('userNickname', name);
      navigate("/lobby");
    } else {
      alert('닉네임은 필수입니다.')
    }
  };

  return (
    <>
      <form>
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
          onClick={(e) => { e.preventDefault(); saveName(); }}
          className="w-full mt-2">참가</Button>
      </form>
    </>
  );
};

export default NoLogin;
