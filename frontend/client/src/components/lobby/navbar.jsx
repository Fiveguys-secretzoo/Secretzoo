import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/lobby">로비</Link>
            </li>
            <li>
              <Link to="/lobby/ranking">랭킹</Link>
            </li>
            <li>
              <Link to="/lobby/mypage">내정보</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
