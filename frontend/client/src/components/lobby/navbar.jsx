import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Button  } from 'flowbite-react';
import { IoGameController, IoTrophy  } from 'react-icons/io5';
import { HiUser } from 'react-icons/hi'
import { IoMdSearch } from "react-icons/io";
import { GiSoundOff, GiSoundOn} from "react-icons/gi";
import bg from "../../assets/sound/bg.mp3";
import { axiosLogout, resetUserInfo } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeText = (path) => {
    return location.pathname === path ? "flex items-center p-2 text-base font-normal text-[#FF9800] rounded-lg hover:bg-gray-100 cursor-pointer" : "flex items-center p-2 text-base font-normal text-gray-500 rounded-lg hover:bg-gray-100 cursor-pointer"
  };
  const activeIcon = (path) => {
    return location.pathname === path ? "h-6 w-6 text-[#FF9800]'" : "h-6 w-6 text-gray-500'"
  };
  const CustomSidebar = ({icon : Icon, children, to}) => {

    const link = () => {
      navigate(to);
    };

    return (
      <div
        className={activeText(to)}
        onClick={link}>
        {Icon && <Icon className={activeIcon(to)} aria-hidden='true'></Icon>}
        <span className="ml-3">{children}</span>
      </div>
    )
  };
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(axiosLogout());
    dispatch(resetUserInfo);
    sessionStorage.clear();
    navigate('/');
  }

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    audioRef.current.play();
  }

  return (
    <>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <CustomSidebar to='/lobby' icon={IoGameController}>
              로비
            </CustomSidebar>
            <CustomSidebar to='/lobby/ranking' icon={IoTrophy}>
              랭킹
            </CustomSidebar>
            <CustomSidebar to='/lobby/mypage' icon={HiUser}>
              내 정보
            </CustomSidebar>
            <CustomSidebar to='/lobby/searchPlayer' icon={IoMdSearch}>
              플레이어 검색
            </CustomSidebar>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Button className="m-3" color='warning' onClick={() => logout()}>{sessionStorage.getItem('noLogin')? '나가기':'로그아웃'}</Button>
      <div className="flex justify-center">
      {
        isPlaying ? <GiSoundOn className='w-20 h-20 hover:cursor-pointer' fill='white' onClick={togglePlay}></GiSoundOn> : <GiSoundOff className='w-20 h-20 hover:cursor-pointer' fill='white' onClick={togglePlay}></GiSoundOff>   
      }
      </div>
      <audio ref={audioRef} className='hidden'>
        <source src={bg} type="audio/mp3"/>
      </audio>
    </>
  );
};

export default Navbar;
