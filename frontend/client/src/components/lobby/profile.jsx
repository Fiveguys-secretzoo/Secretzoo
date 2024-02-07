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
    } else {
      dispatch(getUserInfo());
    }
  }, [dispatch])

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
          <div className='flex-grow text-center'>
            <p>{user.name}</p>
            <b>{user.nickname}</b>
            <p>{user.mainReward}</p>
            <p>{'레벨'+user.level}</p>
          </div>
        </div>
        {
          sessionStorage.getItem('noLogin') ? (<div></div>) :
          (<div className='exp'>
            <Label className='text-[0.7em]' value={'다음 레벨까지 남은 경험치 '+(user.nextExp-user.exp)+'('+(user.exp-user.prevExp)/(user.nextExp-user.prevExp)*100+')%'} />
            <Progress progress={(user.exp-user.prevExp)/(user.nextExp-user.prevExp)*100} />
          </div>)
        }
      </Card>
    </>
  );
};

export default Profile;
