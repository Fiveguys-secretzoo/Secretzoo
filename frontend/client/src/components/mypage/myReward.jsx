import React from 'react';

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

const MyReward = () => {
  return (
    <div className='h-[90%]'>
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
              </div>
              <div>
                <p>달성 날짜</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className='container bg-gray-400 p-2 my-4 overflow-y-auto h-[35%]'>
        <p className='text-white mb-2'>아직 달성 못한과제</p>
        {
          Object.keys(myRewards.data).map((reward) => (
            <div className='flex justify-center space-x-10 space-y-2'>
              <div className='w-[3em] h-[3em] bg-purple-500'></div>
              <div className='min-w-[27em]'>
                <p className='text-white font-bold'>{reward}</p>
                <p className='text-white w-[31.7em]'>{(myRewards.data[reward].donePlayerCount/myRewards.totalPlayer*100).toFixed(2)}%의 플레이어가 이 업적을 달성했습니다.</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyReward;