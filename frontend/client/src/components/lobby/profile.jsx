import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, Progress, Label } from 'flowbite-react';



const Profile = () => {

  const [user, setUser] = useState(null);

  const getUserInfo = () => {
    const headers = {
      'Authorization': sessionStorage.getItem('authorization')
    };
    axios.get('https://secretzoo.site/api/users/user', { headers })
      .then(response => {
        console.log(response.data)
        setUser(response.data)
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem('noLogin')) {
      setUser({
        "name": 'noLoginUser',
        "nickname": sessionStorage.getItem('userNickname'),
        "mainAchievement": '로그인 하세요',
        "profileNumber": '000',
      })
      return;
    }
    getUserInfo();
  }, [])

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="mb-5">
        <div className='flex items-center mb-5'>
          <img
            src={require(`../../assets//img/profile/Untitled ${user.profileNumber}.png`)}
            alt="프로필 이미지"
            className='w-20 h-20 m-2 rounded-full'
          />
          <div className='flex-grow text-center max-w-20'>
            <p>{user.name}</p>
            <b>{user.nickname}</b>
            <p>{user.mainAchievement}</p>
          </div>
        </div>
        <div className='exp'>
          <Label value='레벨 {data.s}' />
          <Progress progress={45} />
        </div>
      </Card>
    </>
  );
};

export default Profile;
