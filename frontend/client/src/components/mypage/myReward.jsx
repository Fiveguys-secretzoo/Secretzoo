import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Progress } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosGetTotalRewards } from '../../store/userSlice';



const MyReward = () => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
 

  const [myRewards, setMyrewards] = useState(null);
  axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token');

  const getRewards = async () => {
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
    return <div className='text-white'>Loading...</div>;
  }
  return (
    <div className='h-[90%] text-white'>
      <div className='container p-2 my-4 shadow-md'>
        <p>도전과제 {myRewards.count}개중 {Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).length}개 달성</p>

        <Progress progress={Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).length / myRewards.count * 100} />
      </div>
      <div className='container p-2 my-4 overflow-y-auto h-[35%] shadow-md custom-scrollbar'>
        <p className='mb-2'>달성한 과제</p>
        {
          Object.keys(myRewards.data).filter(reward => myRewards.data[reward].done).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-2 shadow-md'>
              <img
              key={myRewards.data[reward].rewardsId}
              // src={require(`../../assets//img/reward/${myRewards.data[reward].rewardsId}.png`)}
              alt={`업적 이미지 ${myRewards.data[reward].rewardsId}`}
              className="w-16 m-2 rounded-full hover:cursor-pointer border-2 hover:border-blue-500"
              />
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
               <img
              key={myRewards.data[reward].rewardsId}
              // src={require(`../../assets//img/reward/${myRewards.data[reward].rewardsId}.png`)}
              alt={`업적 이미지 ${myRewards.data[reward].rewardsId}`}
              className="w-16 m-2 rounded-full hover:cursor-pointer border-2 hover:border-blue-500"
              />
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