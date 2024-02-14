import React from "react";
import { Link, useLocation } from "react-router-dom";

const MypageNav = () => {
  const location = useLocation();

  const active = (path) => {
    return location.pathname === path ? "px-6 text-[#5F8670] font-bold" : "px-6 text-white font-bold"
  };
  return (
    <>
      <nav className='p-4 text-white text-center rounded shadow-md'>
        <div className="flex space-x-2 justify-center">
          <Link className={active('/lobby/mypage')} to="/lobby/mypage">내 정보</Link>
          <Link className={active('/lobby/mypage/myranking')} to="/lobby/mypage/myranking">내 랭킹</Link>
          <Link className={active('/lobby/mypage/myreward')} to="/lobby/mypage/myreward">내 업적</Link>
        </div>
      </nav>
    </>
  );
};

export default MypageNav;
