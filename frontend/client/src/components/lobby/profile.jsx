<<<<<<< HEAD
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
=======
import React,{useState, useEffect} from "react";
import axios from 'axios';
import { Card, Progress, Label } from 'flowbite-react';
>>>>>>> dev/frontend



const Profile = () => {
  
  const [user, setUser] = useState(null);
  const getUserInfo = () => {
    const headers = {
      'Authorization': sessionStorage.getItem('authorization')
    };
    axios.get('https://secretzoo.site/api/users/user',{headers})
    .then(response => {
      console.log(response.data)
      setUser(response.data)
    });
  }
  useEffect(()=>{
    getUserInfo();
  },[])
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
<<<<<<< HEAD
          <div>
            <span>다음레벨까지 </span>
            <span>level {user.level}</span>
          </div>
=======

          <Label value='레벨 {data.s}' />
>>>>>>> dev/frontend
          <Progress progress={45} />
        </div>
      </Card>
    </>
  );
};

export default Profile;
