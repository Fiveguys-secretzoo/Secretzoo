import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const  SearchPlayerDetail = () => {
  const { userSequence } = useParams();
  const [searchedUserInfo, setSearchedUserInfo] = useState(null);
  const [searchedUserRank, setSearchUserRank] = useState(null);

  useEffect(() =>{
    axios.get('https://spring.secretzoo.site/player/'+ userSequence)
      .then((Response) => {
        setSearchedUserInfo(Response.data);
        console.log(Response.data)
      });
    axios.get('https://spring.secretzoo.site/rank/total/'+ userSequence)
    .then((Response) => {
      setSearchUserRank(Response.data);
      console.log(Response.data)
    });  
  },[]);

  if(!searchedUserInfo || !searchedUserRank){
    return(<div>로딩중...</div>)
  }
  return (
    <div className='flex flex-col justify-center text-center'>
      <h1>검색한 유저 정보</h1>
      <img
          src={require(`../assets/img/profile/Untitled ${searchedUserInfo.data.profileNumber}.png`)}
          alt="프로필 이미지"
          className="w-32 rounded-full mx-auto"
        />
        <p>닉네임 : {searchedUserInfo.data.nickname}</p>
        <p>레벨 : {searchedUserInfo.data.level}</p>
        <p>업적 : {searchedUserInfo.data.mainReward}</p>
        <p>이름 : {searchedUserInfo.data.name}</p>
        <p>공격점수 : {searchedUserInfo.data.rankingScore.attackScore}</p>
        <p>공격 랭킹 : {searchedUserRank.data.attackRank}</p>
        <p>수비점수 : {searchedUserInfo.data.rankingScore.defenseScore}</p>
        <p>수비 랭킹 : {searchedUserRank.data.defenseRank}</p>
        <p>패스점수 : {searchedUserInfo.data.rankingScore.passScore}</p>
        <p>패스 랭킹: {searchedUserRank.data.passRank}</p>
        <p>총 라운드 : {searchedUserInfo.data.totalRound}</p>
        <p>총 턴 : {searchedUserInfo.data.totalTurn}</p>

    </div>
  );
};

export default SearchPlayerDetail;