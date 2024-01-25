import React from 'react';
let user = {
  userId: "t1faker",
  username: "대상혁",
  mainAchievement: "26",
  profileNumber: "58",
  level: "12",
  point: "32",
  nickname: "hide on bush",
  achievementId: 23,
  achievementName: "G.O.A.T",
};
const myPage = () => {
  return (
    <div>
      <div className='profileImage'>
        <p>프로필 이미지</p>
        <img
              src={require(`../../assets/Untitled 58.png`)}
              alt="프로필 이미지"
              className="profileImage"
              width={50}
              height={50}
            />
        <button>변경</button>            
      </div>
      <div userInfo>
        <div className='nickname'>
          <span>닉네임 :</span>
          <span>{user.nickname}</span>
          <button>변경</button>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default myPage;