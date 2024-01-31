import React from "react";
import { Card, Progress, Label } from 'flowbite-react';

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
      <Card className="mb-5">
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

          <Label value='레벨 {data.s}' />
          <Progress progress={45} />
        </div>
      </Card>
    </>
  );
};

export default profile;
