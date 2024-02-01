import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> dev/frontend
import { Sidebar } from 'flowbite-react';
import { IoGameController, IoTrophy  } from 'react-icons/io5';
import { HiUser } from 'react-icons/hi'

const Navbar = () => {
  const CustomSidebar = ({icon : Icon, children, to}) => {
    const navigate = useNavigate();

    const link = () => {
      navigate(to);
    };

    return(
      <div 
      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={link}>
        {Icon && <Icon className='h-6 w-6 text-gray-500' aria-hidden='true'></Icon>}
        <span className="ml-3">{children}</span>
      </div>
    )
  };

  return (
    <>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
<<<<<<< HEAD
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
=======
            <CustomSidebar to='/lobby' icon={IoGameController}>
              로비
            </CustomSidebar>
            <CustomSidebar to='/lobby/ranking' icon={IoTrophy}>
              랭킹
            </CustomSidebar>
            <CustomSidebar to='/lobby/mypage' icon={HiUser}>
              내 정보
            </CustomSidebar>
>>>>>>> dev/frontend
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default Navbar;
