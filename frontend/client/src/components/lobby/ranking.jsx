import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import whoosh from '../../assets/sound/whoosh-6316.mp3';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [myRank, setMyRank] = useState(null);
  const user = useSelector((state) => state.user.userInfo);

  // 공격랭킹 가져오기
  const getAttack = async () => {
    changeTab();
    axios.get('https://spring.secretzoo.site/rank/attack')
    .then(Response => {
      setRanking(Response.data.data);
      if(user.userSequence){
        axios.get('https://spring.secretzoo.site/rank/attack/' + user.userSequence)
        .then(Response => {
          setMyRank(Response.data);
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
        axios.get('https://spring.secretzoo.site/rank/defense/'+ user.userSequence)
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
        axios.get('https://spring.secretzoo.site/rank/pass/'+ user.userSequence)
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
  useEffect( () => {
    getAttack();
  }, [user])
  
  const audio = new Audio(whoosh);
  audio.playbackRate = 5;
  useEffect(() => {
    if (isLoaded && ranking.length > 0) {
      ranking.forEach((item, index) => {
        setTimeout(() => {
          audio.play();
        }, index * 200); 
      });
    }
    return () => {
      audio.pause();
    }
  }, [ranking]);
  
  if(!myRank && !sessionStorage.getItem('noLogin')){
    return(<div>isLoading...</div>)
  }
  return (
    <>
      <div className="rounded text-white z-10 after::bg-custom-opacity">
        <div className='w-full h-full py-4 px-16 rounded'>
          <nav className="px-4 py-2 text-center rounded shadow-md">
            <div className="flex space-x-2 justify-center">
              <button className='px-6 rounded-md hover:bg-gray-600'
                onClick={getAttack}>공격</button>
              <button className='px-6 rounded-md hover:bg-gray-600'
                onClick={getDefense}>수비</button>
              <button className='px-6 rounded-md hover:bg-gray-600'
                onClick={getPass}>패스</button>
            </div>
          </nav>
          { ranking[0] ?
          (<div><div className={`py-1 px-4  my-2 w-[518px] mx-auto border-1 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow flex items-center border-2`}
                style={{
                  animationDelay: `${1 * 0.2}s`
                }}>
            <div className='bg-gold-medal w-10 h-10 bg-contain bg-no-repeat'></div>
            <div className='flex-grow'>{ranking[0].nickname}</div>
            <div className='mr-10'>점수 : {ranking[0].score.toFixed(2)}</div>
          </div>
          <div className={`py-1 px-4 my-2 w-[518px] mx-auto border-1 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow flex items-center border-2`}
                style={{
                  animationDelay: `${2 * 0.2}s`
                }}>
            <div className='bg-silver-medal w-10 h-10 bg-contain bg-no-repeat'></div>
            <div className='flex-grow'>{ranking[1].nickname}</div>
            <div className='mr-10'>점수 : {ranking[1].score.toFixed(2)}</div>
          </div>
          <div className={`py-1 px-4 my-2 w-[518px] mx-auto border-1 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow flex items-center border-2`}
              style={{
                animationDelay: `${3 * 0.2}s`
              }}>
            <div className='bg-bronze-medal w-10 h-10 bg-contain bg-no-repeat'></div>
            <div className='flex-grow'>{ranking[2].nickname}</div>
            <div className='mr-10'>점수 : {ranking[2].score.toFixed(2)}</div>
          </div></div>)
          : (<div>isLoaded</div>)}
          {
            ranking.slice(3).map((item, index) => (
              <div className={`py-1 px-4 my-2 w-[518px] mx-auto border-1 rounded transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow flex items-center`}
                style={{
                  animationDelay: `${(index+3) * 0.2}s`
                }}>
            <div className='w-10'>{index + 4}위</div>
            <div className='flex-grow'>{item.nickname} </div>
            <div className='mr-10'>점수 : {item.score.toFixed(2)}</div>
            </div>
            ))
          }
          { sessionStorage.getItem('noLogin') ? (<div className='p-1 my-2 ml-10 text-center'>랭킹 서비스를 이용하시려면 로그인 하세요</div>) :
            (<div className={`py-1 px-4  my-2 w-[518px] mx-auto border-2 border-red-500 rounded mt-10 transition-opacity duration-1000  ${isLoaded ? 'rotate-y' : ''} shadow flex items-center`}
                style={{
                  animationDelay: `${10 * 0.2}s`
                }}><p>내 순위 : {myRank.data.rank+1}위 </p> <p>내 점수 : {myRank.data.score.toFixed(2)}</p></div>) 
          }
        </div>
      </div>  
    </>
  );
};

export default Ranking;