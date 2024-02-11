import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Progress } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosGetTotalRewards } from '../../store/userSlice';



const MyReward = () => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
 

  const [myRewards, setMyrewards] = useState(null);
  axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');

  const authHeader = sessionStorage.getItem('authorization');
  const token = authHeader.split(' ')[1];
  const parts = token.split('.');
  const payloadInBase64 = parts[1];
  const decodedPayload = atob(payloadInBase64);
  const payload = JSON.parse(decodedPayload);

  console.log(payload);

  const getRewards =  () => {
    if(user.userSequence){
      dispatch(axiosGetTotalRewards(user.userSequence))
        .then(Response => {
          setMyrewards(Response.payload);
        });
    }
  };
  useEffect(() => {
    getRewards();
  }, [user]);

  if (!myRewards) {
    return <div>Loading...</div>;
  }
  return (
    <div className='h-[90%]'>
      <div className='container p-2 my-4 shadow-md'>
        <p>도전과제 {myRewards.count}개중 {Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).length}개 달성</p>

        <Progress progress={Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).length / myRewards.count * 100} />
      </div>
      <div className='container p-2 my-4 overflow-y-auto h-[35%] shadow-md custom-scrollbar'>
        <p className='mb-2'>달성한 과제</p>
        {
          Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-2 shadow-md'>
              <div className='w-[3em] h-[3em] bg-blue-100 m-2'></div>
              <div className='min-w-[20em]'>
                <p className='font-bold'>{myRewards.data[reward].rewardsName}</p>
                <p className='w-[25em]'>{(myRewards.data[reward].donePlayerCount / myRewards.totalPlayer * 100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
              </div>
              <div>
                <p>{myRewards.data[reward].date[0]}년 {myRewards.data[reward].date[1]}월{myRewards.data[reward].date[2]}일</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className='container p-2 my-4 overflow-y-auto h-[35%] shadow-md'>
        <p className='text-white mb-2'>아직 달성 못한과제</p>
        {
          Object.keys(myRewards.data).filter(reward => !myRewards.data[reward].done).map((reward) => (
            <div className='flex justify-center space-x-10 my-2 shadow-md'>
              <div className='w-[3em] h-[3em] bg-gray-100 m-2'></div>
              <div className='min-w-[27em]'>
                <p className='font-bold'>{myRewards.data[reward].rewardsName}</p>
                <p className='w-[31.7em]'>{(myRewards.data[reward].donePlayerCount / myRewards.totalPlayer * 100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyReward;