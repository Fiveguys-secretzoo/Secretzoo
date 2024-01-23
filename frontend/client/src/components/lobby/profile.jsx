import React from "react";
import "../../style/profile.css";
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

const profile = () => {
  return (
    <>
      <div className="profile">
        <div className="profileCard">
          <img
            src={require(`../../assets/Untitled ${user.profileNumber}.png`)}
            alt="프로필 이미지"
            className="profileImage"
            width={50}
            height={50}
          />
          <div>
            <b>{user.nickname}</b>
            <p>{user.achievementName}</p>
          </div>
        </div>
        <div className="exp">
          <div>
            <span>다음레벨까지 </span>
            <span>level {user.level}</span>
          </div>
          <div className="expBar">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
