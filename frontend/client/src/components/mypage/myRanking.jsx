import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GiAncientSword, GiMagicShield, GiRunningShoe  } from "react-icons/gi";

const MyRanking = () => {
  const user = useSelector((state) => state.user.userInfo);
  
  const [myRanking, setMyRanking] = useState(null)
  const getRanking = async () => {
    axios.get(`https://spring.secretzoo.site/rank/total/`+ user.userSequence)
    .then(response => {
      console.log(response.data);
      setMyRanking(response.data);
    });
  };
  useEffect(() => {
    getRanking();
  }, [user]);
  if (!myRanking) {
    return <div className='text-white'>Loading...</div>;
  }
  // return (
  //   <>
  //     <div className='text-white'>
  //       <div className='shadow-md m-2 p-2'>
  //         <h3>나의 공격랭킹</h3>
  //         <div>순위 : {myRanking.data.attackRank.rank+1} 상위 {(myRanking.data.attackRank.rank/ myRanking.totalPlayer * 100).toFixed(2)}% 입니다.</div>
  //         <div>공격 시도횟수 : {myRanking.data.animalScore.attackSuccess + myRanking.data.animalScore.attackFail}</div>
  //         <div>공격 성공횟수 : {myRanking.data.animalScore.attackSuccess}</div>
  //         <div>공격 성공률 : {(myRanking.data.animalScore.attackSuccess / (myRanking.data.animalScore.attackSuccess + myRanking.data.animalScore.attackFail) * 100).toFixed(2)}%</div>
  //       </div>
  //       <div className='shadow-md m-2 p-2'>
  //         <h3>나의 수비랭킹</h3>
  //         <div>순위 : {myRanking.data.defenseRank.rank+1} 상위 {(myRanking.data.defenseRank.rank / myRanking.totalPlayer * 100).toFixed(2)}% 입니다.</div>
  //         <div>수비 시도횟수 : {myRanking.data.animalScore.defenseSuccess + myRanking.data.animalScore.defenseFail}</div>
  //         <div>수비 성공횟수 : {myRanking.data.animalScore.defenseSuccess}</div>
  //         <div>수비 성공률 : {(myRanking.data.animalScore.defenseSuccess / (myRanking.data.animalScore.defenseSuccess + myRanking.data.animalScore.defenseFail) * 100).toFixed(2)}%</div>
  //       </div>
  //       <div className='shadow-md m-2 p-2'>
  //         <h3>나의 패스랭킹</h3>
  //         <div>순위 : {myRanking.data.passRank.rank+1} 상위 {(myRanking.data.passRank.rank / myRanking.totalPlayer * 100).toFixed(2)}% 입니다.</div>
  //         <div>패스 시도횟수 : {myRanking.data.passCount}</div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className='text-white'>
        <div className='flex flex-col space-y-4'>
          <div className='bg-[#E6A4B4] shadow-lg rounded-lg p-4 flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-semibold mb-2'>나의 공격 랭킹</h3>
              <div>
                <p className='mb-1'> <span className='font-bold'>순위 : </span>{myRanking.data.attackRank.rank + 1} (상위 {(myRanking.data.attackRank.rank / myRanking.totalPlayer * 100).toFixed(2)}%)</p>
                <p className='mb-1'><span className='font-bold'> 공격 시도 횟수 : </span>{myRanking.data.animalScore.attackSuccess + myRanking.data.animalScore.attackFail}</p>
                <p className='mb-1'><span className='font-bold'> 공격 성공 횟수 : </span> {myRanking.data.animalScore.attackSuccess}</p>
                <p><span className='font-bold'>공격 성공률 : </span> {(myRanking.data.animalScore.attackSuccess / (myRanking.data.animalScore.attackSuccess + myRanking.data.animalScore.attackFail) * 100).toFixed(2)}%</p>
              </div>
            </div>
            <GiAncientSword  className="text-gray-500 w-20 h-20" color="red"/>
          </div>
          <div className='bg-[#9DBC98] shadow-lg rounded-lg p-4 flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-semibold mb-2'>나의 수비 랭킹</h3>
              <div>
                <p className='mb-1' ><span className='font-bold'>순위 : </span>{myRanking.data.defenseRank.rank + 1} (상위 {(myRanking.data.defenseRank.rank / myRanking.totalPlayer * 100).toFixed(2)}%)</p>
                <p className='mb-1'><span className='font-bold'>수비 시도 횟수 : </span>{myRanking.data.animalScore.defenseSuccess + myRanking.data.animalScore.defenseFail}</p>
                <p className='mb-1'><span className='font-bold'>수비 성공 횟수 : </span>{myRanking.data.animalScore.defenseSuccess}</p>
                <p><span className='font-bold'>수비 성공률 : </span>{(myRanking.data.animalScore.defenseSuccess / (myRanking.data.animalScore.defenseSuccess + myRanking.data.animalScore.defenseFail) * 100).toFixed(2)}%</p>
              </div>
            </div>
            <GiMagicShield  className="text-gray-500 w-20 h-20" color="green"/>
          </div>
          <div className='bg-[#FFBB64] shadow-lg rounded-lg p-4 flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-semibold mb-2'>나의 패스 랭킹</h3>
              <div>
                <p className='mb-1'><span className='font-bold'>순위 : </span>{myRanking.data.passRank.rank + 1} (상위 {(myRanking.data.passRank.rank / myRanking.totalPlayer * 100).toFixed(2)}%)</p>
                <p><span className='font-bold'>패스 시도 횟수 : </span> {myRanking.data.passCount}</p>
              </div>
            </div>
            <GiRunningShoe   className="text-gray-500 w-20 h-20" color='yellow' />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRanking;