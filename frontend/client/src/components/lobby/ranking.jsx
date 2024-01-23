import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  // 공격랭킹 가져오기
  const getAttack = () => {
    axios.get('https://i10a406.p.ssafy.io/rank/attack').then((Response) => {
      setRanking(Response.data.data);
    });
  }
  // 수비랭킹 가져오기
  const getDefense = () => {
    axios.get('https://i10a406.p.ssafy.io/rank/defense').then((Response) => {
      setRanking(Response.data.data);
    });
  }
  // 패스랭킹 가져오기
  const getPass = () => {
    axios.get('https://i10a406.p.ssafy.io/rank/pass').then((Response) => {
      setRanking(Response.data.data);
    });
  }
  // 처음에 공격랭킹 가져오기
  useEffect(() => {
    getAttack();
  },[])

  return (
    <div>
      <button onClick={getAttack}>공격</button>
      <button onClick={getDefense}>수비</button>
      <button onClick={getPass}>패스</button>
      {
        ranking.map((item,index) => (
          <div>{index+1}위 : {item.playerId}</div>
        ))
      }
    </div>
  );
};

export default Ranking;