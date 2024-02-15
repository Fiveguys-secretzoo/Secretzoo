import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Button, Label, Modal} from 'flowbite-react';
import { IoGameController, IoTrophy  } from 'react-icons/io5';
import { HiUser } from 'react-icons/hi'
import { IoMdSearch } from "react-icons/io";
import { GiSoundOff, GiSoundOn, GiBlackBook } from "react-icons/gi";
import bg from "../../assets/sound/bg.mp3";
import { axiosLogout, resetUserInfo } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

/* 로비의 navbar 로비 랭킹 내정보 플레이어검색으로 이동 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* 활성화된 내브 글자색변경 */
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

  /* 로그아웃 */
  const logout = async () => {
    await dispatch(axiosLogout());
    dispatch(resetUserInfo);
    sessionStorage.clear();
    navigate('/');
  }

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /* 오디오 작동 함수 */
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  /* 오디오 끄는거 */
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    audioRef.current.play();
  }
  
  /* ucc모달 */
  const [openUccModal, setOpenUccModal ] = useState(false);
  const UccModal = () => {
    return (
      <Modal show={openUccModal} size="5xl" onClose={() => setOpenUccModal(false)}>
        <Modal.Body className="mx-auto">
          <iframe width="840" height="472.5" src="https://www.youtube.com/embed/EUKl8jdUuB4?si=4f_YFYE8MhTV-Vwy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
        <Button color="gray" onClick={() => setOpenUccModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    )
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
      <div className="flex justify-around">
        <div>
          <div className='text-white text-center'>배경음악</div>
      {
        isPlaying ? <GiSoundOn className=' w-20 h-20 hover:cursor-pointer' fill='white' onClick={togglePlay}></GiSoundOn> : <GiSoundOff className='w-20 h-20 hover:cursor-pointer' fill='white' onClick={togglePlay}></GiSoundOff>   
      }
      </div>
        <div onClick={() => setOpenUccModal(true)}>
          <div className='text-[#dcc59c] text-center'>룰 설명</div>
          <GiBlackBook className='w-16 h-16 hover:cursor-pointer' fill='#dcc59c'></GiBlackBook>
        </div>
      </div>
      <audio ref={audioRef} className='hidden'>
        <source src={bg} type="audio/mp3"/>
      </audio>
      <UccModal></UccModal>
    </>
  );
};

export default Navbar;
