import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GiAncientSword, GiMagicShield, GiRunningShoe  } from "react-icons/gi";
const  SearchPlayerDetail = () => {
  const { userSequence } = useParams();
  const [searchedUserInfo, setSearchedUserInfo] = useState(null);
  const [searchedUserRank, setSearchUserRank] = useState(null);

  useEffect(() =>{
    axios.get('https://spring.secretzoo.site/players/'+ userSequence)
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
  // return (
  //   <div className='flex flex-col justify-center text-center text-white'>
  //     {/* <h1>검색한 유저 정보</h1> */}
  //     <img
  //         src={require(`../assets/img/profile/Untitled ${searchedUserInfo.data.profileNumber}.png`)}
  //         alt="프로필 이미지"
  //         className="w-32 rounded-full mx-auto"
  //       />
  //       <p>닉네임 : {searchedUserInfo.data.nickname}</p>
  //       <p>레벨 : {searchedUserInfo.data.level}</p>
  //       <p>업적 : {searchedUserInfo.data.mainReward}</p>
  //       <p>이름 : {searchedUserInfo.data.name}</p>
  //       <p>공격점수 : {searchedUserRank.data.attackRank.score}</p>
  //       <p>공격 랭킹 : {searchedUserRank.data.attackRank.rank}</p>
  //       <p>수비점수 : {searchedUserRank.data.defenseRank.score}</p>
  //       <p>수비 랭킹 : {searchedUserRank.data.defenseRank.rank}</p>
  //       <p>패스점수 : {searchedUserRank.data.passRank.score}</p>
  //       <p>패스 랭킹: {searchedUserRank.data.passRank.rank}</p>
  //       <p>총 라운드 : {searchedUserInfo.data.totalRound}</p>
  //       <p>총 턴 : {searchedUserInfo.data.totalTurn}</p>

  //   </div>
  // );
  return (
    <div className='flex flex-col items-center justify-center text-white py-10'>
      <h1 className="text-3xl font-bold mb-6">플레이어 정보</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-row items-center">
      <img
        src={require(`../assets/img/profile/Untitled ${searchedUserInfo.data.profileNumber}.png`)}
        alt="프로필 이미지"
        className="w-32 h-32 rounded-full mr-6"
      />
      <div>
        <p className="mb-2"><span className="font-bold">이름:</span> {searchedUserInfo.data.name}</p>
        <p className="mb-2"><span className="font-bold">닉네임:</span> {searchedUserInfo.data.nickname}</p>
        <p className="mb-2"><span className="font-bold">레벨:</span> {searchedUserInfo.data.currentLevel}</p>
        <p className="mb-2"><span className="font-bold">대표 업적:</span> {searchedUserInfo.data.mainReward}</p>
      </div>
      </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
          <GiAncientSword className="w-10 h-10 m-10" color='red'></GiAncientSword>
            <p className="mb-2"><span className="font-bold">공격 점수:</span> {searchedUserRank.data.attackRank.score}</p>
            <p className="mb-2"><span className="font-bold">공격 랭킹:</span> {searchedUserRank.data.attackRank.rank}</p>
          </div>
          <div>
          <GiMagicShield  className="w-10 h-10 m-10" color='green'></GiMagicShield>
            <p className="mb-2"><span className="font-bold">수비 점수:</span> {searchedUserRank.data.defenseRank.score}</p>
            <p className="mb-2"><span className="font-bold">수비 랭킹:</span> {searchedUserRank.data.defenseRank.rank}</p>
          </div>
          <div>
          <GiRunningShoe  className="w-10 h-10 m-10" color='yellow'></GiRunningShoe>
            <p className="mb-2"><span className="font-bold">패스 점수:</span> {searchedUserRank.data.passRank.score}</p>
            <p className="mb-2"><span className="font-bold">패스 랭킹:</span> {searchedUserRank.data.passRank.rank}</p>
          </div>
        </div>
      </div>

  );
  
};

export default SearchPlayerDetail;