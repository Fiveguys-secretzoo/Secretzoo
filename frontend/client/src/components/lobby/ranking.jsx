import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // 공격랭킹 가져오기
  const getAttack = () => {
    changeTab();
    axios.get('https://secretzoo.site/api/rank/attack').then((Response) => {
      setRanking(Response.data.data);
    });
  }
  // 수비랭킹 가져오기
  const getDefense = () => {
    changeTab();
    axios.get('https://secretzoo.site/api/rank/defense').then((Response) => {
      setRanking(Response.data.data);
    });
  }
  // 패스랭킹 가져오기
  const getPass = () => {
    changeTab();
    axios.get('https://secretzoo.site/api/rank/pass').then((Response) => {
      setRanking(Response.data.data);
    });
  }

  const changeTab = () => {
    setIsLoaded(false)
    setTimeout(() => {
      setIsLoaded(true);
    },);
  }
  // 처음에 공격랭킹 가져오기
  useEffect(() => {
    getAttack();
  },[])

  useEffect(() => {
    getAttack();
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, [])
  return (
    <div>
      <nav className='bg-gray-500 p-4 text-white text-center rounded shadow-md'>
        <h2 className='text-white'>랭킹보기</h2>
        <div className="flex space-x-2 justify-center">
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600' 
          onClick={getAttack}>공격</button>
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          onClick={getDefense}>수비</button>
          <button className='px-6 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          onClick={getPass}>패스</button>
        </div>
      </nav>
      {
        ranking.map((item,index) => (
          <div className={`p-2 my-2 bg-blue-200 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow`}
          style={{
            animationDelay: `${index * 0.1}s` // 0.1초 단위로 각 아이템의 지연 시간 증가
          }}>{index+1}위 : {item.playerId}</div>
        ))
      }
    </div>
  );
};

export default Ranking;