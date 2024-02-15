import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { axiosUpdateNickname, getUserInfo ,setNoLoginUserInfo } from '../../store/userSlice';
import { Card, Progress, Label, Modal, Button, TextInput } from 'flowbite-react';
import Swal from "sweetalert2";

/* 프로필 카드 */
const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  /* 유저정보 가져오기 */
  useEffect(() => {
    if (sessionStorage.getItem('noLogin')) {
    } else {
      dispatch(getUserInfo());
    }
  }, [dispatch])
  
  /* 최초로그인시 닉네임정하기 */
  useEffect(() => {
    if(user){
      if(user.nickname === null){
        setOpenNicknameModal(true);
      }
    }
  },[user])

  /* 닉네임 정하는 모달 */
  const [openNicknameModal, setOpenNicknameModal] = useState(false);
  const NicknameModal = () => {    
    const [changeNickname, setChangeNickname] = useState('');
    return (
      <Modal show={openNicknameModal} size="md" onClose={() => setOpenNicknameModal(false)}>
        <form action="#" onSubmit={e => e.preventDefault()}>
          <Modal.Body>
            <Label>사용할 닉네임을 입력하세요</Label>
            <TextInput value={changeNickname} onChange={(e) => setChangeNickname(e.target.value)}></TextInput>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={() => { 
              if (changeNickname.length > 8) {
                Swal.fire({
                  "text" : '닉네임은 8자리 이하로 하여야 합니다.',
                  "confirmButtonColor" : '#3085d6'
                });
                return;
              }
              dispatch(axiosUpdateNickname(changeNickname));
              setOpenNicknameModal(false) }}>수정</Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="mb-5">
        <div className='flex items-center mb-5'>
          <img
            src={require(`../../assets//img/profile/Untitled ${user.profileNumber}.png`)}
            alt="프로필 이미지"
            className='w-20 h-20 m-2 rounded-full'
          />
          <div className='flex-grow text-center'>
            <p>{user.name}</p>
            <b>{user.nickname}</b>
            <p>{user.mainReward}</p>
            <p>{'레벨'+user.level}</p>
          </div>
        </div>
        {
          sessionStorage.getItem('noLogin') ? (<div></div>) :
          (<div className='exp'>
            <Label className='text-[0.7em]' value={'다음 레벨까지 남은 경험치 '+(user.nextExp-user.exp)+'('+(user.exp-user.prevExp)/(user.nextExp-user.prevExp)*100+')%'} />
            <Progress progress={((user.exp-user.prevExp)/(user.nextExp-user.prevExp)*100).toFixed(2)} />
          </div>)
        }
      </Card>
      <NicknameModal></NicknameModal>
    </>
  );
};

export default Profile;
