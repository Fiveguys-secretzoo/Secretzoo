import React from "react";
import { Progress } from 'flowbite-react';
import { Card } from 'flowbite-react';

let user = {
  userId: "t1faker",
  username: "대상혁",
  mainAchievement: "26",
  profileNumber: "58",
  level: "12",
  point: "32",
  nickname: "hide on bush",
  achievementId: 23,
  achievementName: "G.O.A.T",
};

const profile = () => {
  return (
    <>
      <div className='flex flex-col bg-gray-500 p-3 shadow-lg rounded mb-5'>
        <div className='flex items-center mb-5'>
          <img
            src={require(`../../assets/Untitled ${user.profileNumber}.png`)}
            alt="프로필 이미지"
            className='w-20 h-20 m-2 rounded-full'
          />
          <div className='flex-grow text-center'>
            <b>{user.nickname}</b>
            <p>{user.achievementName}</p>
          </div>
        </div>
        <div className='exp'>
          <div>
            <span>다음레벨까지 </span>
            <span>level {user.level}</span>
          </div>
          <Progress progress={45} />
        </div>
      </div>
    </>
  );
};

export default profile;
