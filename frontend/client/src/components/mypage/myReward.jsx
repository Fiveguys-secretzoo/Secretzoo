import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Progress } from 'flowbite-react';

<<<<<<< HEAD
let myRewards = {
  "count" : 23,
  "data" : {},
  "totalPlayer": 150,
}
for (let i = 0; i < 23; i++) {
  myRewards.data[`업적이름${i + 1}`] = {
    "rewardsName": Math.random() * 100,
    "donePlayerCount": Math.random() * 100,
    "date": "2024-01-23T12:00:00",
  };
}
=======
>>>>>>> dev/frontend

const MyReward = () => {
  const [myRewards, setMyrewards] = useState(null);
  axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');

  const authHeader = sessionStorage.getItem('authorization');
  const token = authHeader.split(' ')[1];
  const parts = token.split('.');
  const payloadInBase64 = parts[1];
  const decodedPayload = atob(payloadInBase64);
  const payload = JSON.parse(decodedPayload);
  
  console.log(payload);

  const getRewrds = (playerSequence) => {
    axios.get(`https://secretzoo.site/api/rewards/total/101`)
    .then(response => {
      console.log(response);
      setMyrewards(response.data);
    });
  };
  useEffect(() => {
    getRewrds();
  },[]);

  if (!myRewards) {
    return <div>Loading...</div>;
  }
  return (
    <div className='h-[90%]'>
<<<<<<< HEAD
      <div className='container bg-gray-400 p-2 my-4'>
        <p className='text-white'>도전과제 90개중 {myRewards.count}개 달성</p>
        <div className='w-full bg-gray-200 rounded-full h-4'>
          <div className='bg-blue-600 h-4 rounded-full w-[40%]'></div>
        </div>
      </div>
      <div className='container bg-gray-400 p-2 my-4 overflow-y-auto h-[35%]'>
        <p className='text-white mb-2'>달성한 과제</p>
        {
          Object.keys(myRewards.data).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-2'>
              <div className='w-[3em] h-[3em] bg-purple-500'></div>
              <div className='min-w-[20em]'>
                <p className='text-white font-bold'>{reward}</p>
                <p className='text-white w-[25em]'>{(myRewards.data[reward].donePlayerCount/myRewards.totalPlayer*100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
=======
      <div className='container p-2 my-4 shadow-md'>
        <p>도전과제 {myRewards.count}개중 {Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).length}개 달성</p>
        
        <Progress progress={Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).length/myRewards.count*100} />
      </div>
      <div className='container p-2 my-4 overflow-y-auto h-[35%] shadow-md'>
        <p className='mb-2'>달성한 과제</p>
        {
          Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-2 shadow-md'>
              <div className='w-[3em] h-[3em] bg-blue-100 m-2'></div>
              <div className='min-w-[20em]'>
                <p className='font-bold'>{myRewards.data[reward].rewardsName}</p>
                <p className='w-[25em]'>{(myRewards.data[reward].donePlayerCount/myRewards.totalPlayer*100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
>>>>>>> dev/frontend
              </div>
              <div>
                <p>{myRewards.data[reward].date[0]}년 {myRewards.data[reward].date[1]}월{myRewards.data[reward].date[2]}일</p>
              </div>
            </div>
          ))
        }
      </div>
<<<<<<< HEAD
      <div className='container bg-gray-400 p-2 my-4 overflow-y-auto h-[35%]'>
        <p className='text-white mb-2'>아직 달성 못한과제</p>
        {
          Object.keys(myRewards.data).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-2'>
              <div className='w-[3em] h-[3em] bg-purple-500'></div>
              <div className='min-w-[27em]'>
                <p className='text-white font-bold'>{reward}</p>
                <p className='text-white w-[31.7em]'>{(myRewards.data[reward].donePlayerCount/myRewards.totalPlayer*100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
=======
      <div className='container p-2 my-4 overflow-y-auto h-[35%] shadow-md'>
        <p className='text-white mb-2'>아직 달성 못한과제</p>
        {
          Object.keys(myRewards.data).filter(reward => !myRewards.data[reward].done).map((reward) => (
            <div className='flex justify-center space-x-10 my-2 shadow-md'>
              <div className='w-[3em] h-[3em] bg-gray-100 m-2'></div>
              <div className='min-w-[27em]'>
                <p className='font-bold'>{myRewards.data[reward].rewardsName}</p>
                <p className='w-[31.7em]'>{(myRewards.data[reward].donePlayerCount/myRewards.totalPlayer*100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
>>>>>>> dev/frontend
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyReward;