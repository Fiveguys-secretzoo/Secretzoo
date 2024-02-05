import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo ,setNoLoginUserInfo } from '../../store/userSlice';
import { Card, Progress, Label } from 'flowbite-react';



const Profile = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.status);

  useEffect(() => {
    if (sessionStorage.getItem('noLogin')) {
      const noLoginUser = ({
        "name": 'noLoginUser',
        "nickname": sessionStorage.getItem('userNickname'),
        "mainAchievement": '로그인 하세요',
        "profileNumber": '000',
      });
      dispatch(setNoLoginUserInfo(noLoginUser));
    } else {
      dispatch(getUserInfo());
    }
  }, [dispatch])

  if (isLoading || !user) {
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
          <div className='flex-grow text-center'>
            <p>{user.name}</p>
            <b>{user.nickname}</b>
            <p>{user.mainAchievement}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className='exp'>
          <Label value='레벨 12' />
          <Progress progress={45} />
        </div>
      </Card>
    </>
  );
};

export default Profile;
