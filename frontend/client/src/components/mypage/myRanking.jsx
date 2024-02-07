import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyRanking = () => {
  const [myRanking, setMyRanking] = useState(null)
  const getRanking = () => {
    const headers = {
      'Authorization': sessionStorage.getItem('authorization')
    };
    axios.get('https://spring.secretzoo.site/users/user', { headers })
      .then(response => {
        axios.get(`https://spring.secretzoo.site/rank/total/`+response.data.userSequence)
        .then(response => {
          console.log(response.data);
          setMyRanking(response.data);
        });
      });
  };
  useEffect(() => {
    getRanking();
  }, []);
  if (!myRanking) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div className='shadow-md m-2 p-2'>
          <h3>나의 공격랭킹</h3>
          <div>순위 : {myRanking.data.attackRank.rank} 상위 {(myRanking.data.attackRank.rank/ myRanking.totalPlayer * 100).toFixed(2)}% 입니다.</div>
          <div>공격 시도횟수 : {myRanking.data.animalScore.attackSuccess + myRanking.data.animalScore.attackFail}</div>
          <div>공격 성공횟수 : {myRanking.data.animalScore.attackSuccess}</div>
          <div>공격 성공률 : {(myRanking.data.animalScore.attackSuccess / (myRanking.data.animalScore.attackSuccess + myRanking.data.animalScore.attackFail) * 100).toFixed(2)}%</div>
        </div>
        <div className='shadow-md m-2 p-2'>
          <h3>나의 수비랭킹</h3>
          <div>순위 : {myRanking.data.defenseRank.rank} 상위 {(myRanking.data.defenseRank.rank / myRanking.totalPlayer * 100).toFixed(2)}% 입니다.</div>
          <div>수비 시도횟수 : {myRanking.data.animalScore.defenseSuccess + myRanking.data.animalScore.defenseFail}</div>
          <div>수비 성공횟수 : {myRanking.data.animalScore.defenseSuccess}</div>
          <div>수비 성공률 : {(myRanking.data.animalScore.defenseSuccess / (myRanking.data.animalScore.defenseSuccess + myRanking.data.animalScore.defenseFail) * 100).toFixed(2)}%</div>
        </div>
        <div className='shadow-md m-2 p-2'>
          <h3>나의 패스랭킹</h3>
          <div>순위 : {myRanking.data.passRank.rank} 상위 {(myRanking.data.passRank.rank / myRanking.totalPlayer * 100).toFixed(2)}% 입니다.</div>
          <div>패스 시도횟수 : {myRanking.data.passCount}</div>
        </div>
      </div>
    </>
  );
};

export default MyRanking;