import React from 'react';

let data = {
  "rewardCount" : 23,
  "myRewards" : {},
}
for (let i = 0; i < 23; i++) {
  data.myRewards[`업적이름${i + 1}`] = {
    number: Math.random() * 100,
    rate: Math.random() * 100,
  };
}

const MyReward = () => {
  return (
    <div>
      <div className='container bg-gray-400 p-2 my-4'>
        <p className='text-white'>도전과제 90개중 {data.rewardCount}개 달성</p>
        <div className='w-full bg-gray-200 rounded-full h-4'>
          <div className='bg-blue-600 h-4 rounded-full w-[40%]'></div>
        </div>
      </div>
      <div className='container bg-gray-400 p-2 my-4 overflow-y-auto h-[200px]'>
        <p className='text-white'>달성한 과제</p>
        {
          Object.keys(data.myRewards).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-1'>
              <div className='w-[3em] h-[3em] bg-purple-500'></div>
              <div className='min-w-[20em]'>
                <p className='text-white font-bold'>{reward}</p>
                <p className='text-white'>{data.myRewards[reward].rate.toFixed(1)}의 플레이어가 이 업적을 달성했습니다.</p>
              </div>
              <div>
                <p>달성 날짜</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className='container bg-gray-400 p-2 my-4 overflow-y-auto h-[200px]'>
        <p className='text-white'>아직 달성 못한과제</p>
        {
          Object.keys(data.myRewards).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-1'>
              <div className='w-[3em] h-[3em] bg-purple-500'></div>
              <div className='min-w-[27em]'>
                <p className='text-white font-bold'>{reward}</p>
                <p className='text-white'>{data.myRewards[reward].rate.toFixed(1)}의 플레이어가 이 업적을 달성했습니다.</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyReward;