import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import { IoGameController, IoTrophy  } from 'react-icons/io5';
import { HiUser } from 'react-icons/hi'

const Navbar = () => {
  return (
    <>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/lobby">
              <Sidebar.Item icon={IoGameController}>
                로비
              </Sidebar.Item>
            </Link>
            <Link to="/lobby/ranking">
              <Sidebar.Item icon={IoTrophy}>
                랭킹
              </Sidebar.Item>
            </Link>
            <Link to="/lobby/mypage">
              <Sidebar.Item icon={HiUser}>
                내정보
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default Navbar;
