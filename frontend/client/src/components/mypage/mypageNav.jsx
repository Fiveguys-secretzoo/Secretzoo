import React from "react";
import { Link } from "react-router-dom";

const MypageNav = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/lobby/mypage">내 정보</Link>
            </li>
            <li>
              <Link to="/lobby/mypage/myranking">내 랭킹</Link>
            </li>
            <li>
              <Link to="/lobby/mypage/myreward">내 업적</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MypageNav;
