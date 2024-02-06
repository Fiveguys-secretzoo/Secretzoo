import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [myRank, setMyRank] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  // 공격랭킹 가져오기
  const getAttack = () => {
    changeTab();
    axios.get('https://spring.secretzoo.site/rank/attack')
    .then(Response => {
      setRanking(Response.data.data);
      if(user.userSequence){
        axios.get('https://spring.secretzoo.site/rank/attack/'+user.userSequence)
        .then(Response => {
          setMyRank(Response);
          console(Response.data);
        })
      }
    });
  }

  // 수비랭킹 가져오기
  const getDefense = () => {
    changeTab();
    axios.get('https://spring.secretzoo.site/rank/defense')
    .then(Response => {
      setRanking(Response.data.data);
      if(user.userSequence){
        axios.get('https://spring.secretzoo.site/rank/defense/'+user.userSequence)
        .then(Response => {
          setMyRank(Response.data);
        })
      }
    });
  }

  // 패스랭킹 가져오기
  const getPass = () => {
    changeTab();
    axios.get('https://spring.secretzoo.site/rank/pass')
    .then(Response => {
      setRanking(Response.data.data);
      if(user.userSequence){
        axios.get('https://spring.secretzoo.site/rank/pass/'+user.userSequence)
        .then(Response => {
          setMyRank(Response.data);
        })
      }
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
    console.log(ranking);
  }, [])

  useEffect(() => {
    getAttack();
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, [])
  
  return (
    <>
      <div className="p-4 rounded">
        <nav className="p-4 text-center rounded shadow-md">
          <div className="flex space-x-2 justify-center">
            <button className='px-6 mt-4 rounded-md hover:bg-gray-200'
              onClick={getAttack}>공격</button>
            <button className='px-6 mt-4 rounded-md hover:bg-gray-200'
              onClick={getDefense}>수비</button>
            <button className='px-6 mt-4 rounded-md hover:bg-gray-200'
              onClick={getPass}>패스</button>
          </div>
        </nav>
        {
          ranking.map((item, index) => (
            <div className={`p-1 my-2 w-[518px] mx-auto border-1 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow`}
              style={{
                animationDelay: `${index * 0.1}s` // 0.1초 단위로 각 아이템의 지연 시간 증가
              }}>{index + 1}위 : {item.nickname} 점수 : {item.score}</div>
          ))
        }
        { sessionStorage.getItem('noLogin') ? (<div className='p-1 my-2 ml-10'>로그인하셈</div>) :
          (<div className={`p-1 my-2 w-[518px] mx-auto border-1 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow`}
              style={{
                animationDelay: `${10 * 0.1}s` // 0.1초 단위로 각 아이템의 지연 시간 증가
              }}>내 순위 : {myRank.data.rank+1}위 내 점수 : {myRank.data.score}</div>) 
        }
      </div>
    </>
  );
};

export default Ranking;