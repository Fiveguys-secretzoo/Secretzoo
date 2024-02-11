import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Button  } from 'flowbite-react';
import { IoGameController, IoTrophy  } from 'react-icons/io5';
import { HiUser } from 'react-icons/hi'
import { IoMdSearch } from "react-icons/io";
import { GiSoundOff, GiSoundOn  } from "react-icons/gi";
import { logoutUser } from "../../store/userSlice";
import bg from "../../assets/sound/bg.mp3";

const Navbar = () => {
  const navigate = useNavigate();
  const CustomSidebar = ({icon : Icon, children, to}) => {

    const link = () => {
      navigate(to);
    };

    return (
      <div
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={link}>
        {Icon && <Icon className='h-6 w-6 text-gray-500' aria-hidden='true'></Icon>}
        <span className="ml-3">{children}</span>
      </div>
    )
  };

  const logout = () => {
    sessionStorage.clear();
    logoutUser();
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
      <Button color='warning' onClick={() => logout()}>{sessionStorage.getItem('noLogin')? '나가기':'로그아웃'}</Button>
      {
        isPlaying ? <GiSoundOff className='w-10 h-10 hover:cursor-pointer' onClick={togglePlay}></GiSoundOff> : <GiSoundOn className='w-10 h-10 hover:cursor-pointer' onClick={togglePlay}></GiSoundOn>   
      }
      <audio ref={audioRef} className='hidden'>
        <source src={bg} type="audio/mp3"/>
      </audio>
    </>
  );
};

export default Navbar;
