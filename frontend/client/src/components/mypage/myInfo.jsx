import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, axiosUpdateProfileImage, axiosUpdateNickname, axiosUpdateMainAchievement, axiosCheckPassword, axiosUpdatePassword } from '../../store/userSlice';
import axios from 'axios';
import { Button, TextInput, Modal, Label, Card } from 'flowbite-react';
import Swal from 'sweetalert2';


const MyInfo = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    getRewards();
  }, [])

  const updateProfileImage = (number) => {
    dispatch(axiosUpdateProfileImage(number));
  };

  const updateNickname = (nickname) => {
    dispatch(axiosUpdateNickname(nickname));
  };

  const updateMainAchievement = (mainAchievement) => {
    dispatch(axiosUpdateMainAchievement(mainAchievement));
  };

  const [passwordCheckState, setPasswordCheckState] = useState(false);
  const checkPassword = async (password) => {
    try { 
      const actionResult = await dispatch(axiosCheckPassword(password));
      if (actionResult.error) {
        throw new Error(actionResult.error.message);
      }
      setOpenUpdatePasswordModal(true);
      setPasswordCheckState(true);
    } catch (error) { 
      Swal.fire({
        "text" : '비밀번호가 옳지 않습니다.',
        "confirmButtonColor" : '#3085d6'
      });
    }
  };

  const updatePassword = async (password, passwordCheck) => {
    if (password!==passwordCheck) {
      Swal.fire({
        "text" : '비밀번호가 일치하지 않습니다.',
        "confirmButtonColor" : '#3085d6'
      });
      return;
    }
    if (passwordCheckState) {
        try { 
        const actionResult = await dispatch(axiosUpdatePassword(password));
        if (actionResult.error) {
          throw new Error(actionResult.error.message);
        }
        setOpenUpdatePasswordModal(false);
      } catch (error) {

      }
    }
  };

  const [myRewards, setMyrewards] = useState(null);
  const getRewards = async () => {
    axios.get(`https://spring.secretzoo.site/rewards/done/`+ user.userSequence)
    .then(response => {
      setMyrewards(response.data);
    });
  };

  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);
  const ProfileImageModal = () => {
    const imageNumbers = Array.from({ length: 74 - 38 + 1 }, (_, i) => i + 38);
    return (
      <Modal show={openProfileImageModal} size="2xl" onClose={() => setOpenProfileImageModal(false)}>
        <Modal.Body className='flex flex-wrap justify-around'>
          {imageNumbers.map((number) => (
            <img
              key={number}
              src={require(`../../assets//img/profile/Untitled ${number}.png`)}
              alt={`프로필 이미지 ${number}`}
              className="w-28 m-2 rounded-full hover:cursor-pointer border-2 hover:border-blue-500"
              onClick={() => { updateProfileImage(number); setOpenProfileImageModal(false) }}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenProfileImageModal(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const [openNicknameModal, setOpenNicknameModal] = useState(false);
  const NicknameModal = () => {
    const [changeNickname, setChangeNickname] = useState('');
    return (
      <Modal show={openNicknameModal} size="md" onClose={() => setOpenNicknameModal(false)}>
        <Modal.Body>
          <Label>바꿀 닉네임</Label>
          <TextInput value={changeNickname} onChange={(e) => setChangeNickname(e.target.value)}></TextInput>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { updateNickname(changeNickname); setOpenNicknameModal(false) }}>수정</Button>
          <Button color="gray" onClick={() => setOpenNicknameModal(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const [openRewardsModal, setOpenRewardsModal] = useState(false);
  const RewardsModal = () => {
    return (
      <Modal show={openRewardsModal} size="2xl" onClose={() => setOpenRewardsModal(false)}>
        <Modal.Body className='flex flex-wrap'>
          {Object.keys(myRewards.data).map((reward) => (
            <div
              className='border-2 w-full m-2 p-2 hover:cursor-pointer hover:bg-gray-100'
              onClick={() => { updateMainAchievement(myRewards.data[reward].rewardsName); setOpenRewardsModal(false) }}>
              {myRewards.data[reward].rewardsName}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenRewardsModal(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const [openCheckPasswordModal, setOpenCheckPasswordModal] = useState(false);
  const CheckPasswordModal = () => {
    const [nowpassword, setNowpassword] = useState('');
    return (
      <Modal show={openCheckPasswordModal} size="md" onClose={() => setOpenCheckPasswordModal(false)}>
        <Modal.Body>
          <Label>비밀번호</Label>
          <TextInput type='password' value={nowpassword} onChange={(e) => setNowpassword(e.target.value)}></TextInput>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { checkPassword(nowpassword); setOpenCheckPasswordModal(false); setNowpassword('') }}>확인</Button>
          <Button color="gray" onClick={() => setOpenCheckPasswordModal(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);
  const UpdataPasswordModal = () => {
    const [changePassword, setChangePassword] = useState('');
    const [changePasswordCheck, setChangePasswordCheck] = useState('');
    return (
      <Modal show={openUpdatePasswordModal} size="md" onClose={() => setOpenUpdatePasswordModal(false)}>
        <Modal.Body>
          <Label>바꿀 비밀번호</Label>
          <TextInput value={changePassword} onChange={(e) => setChangePassword(e.target.value)} type='password'></TextInput>
          <Label>비밀번호 확인</Label>
          <TextInput value={changePasswordCheck} onChange={(e) => setChangePasswordCheck(e.target.value)} type='password'></TextInput>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => updatePassword(changePassword, changePasswordCheck) }>수정</Button>
          <Button color="gray" onClick={() => { setOpenUpdatePasswordModal(false); setPasswordCheckState(false) }}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };

  if (!user || !myRewards) {
    return <div>Loading...</div>;
  }
  return (
    <div className='px-20 py-10 container bg-gray-200 flex items-center justify-between'>
      <div className='flex flex-col items-center '>
        <img
          src={require(`../../assets//img/profile/Untitled ${user.profileNumber}.png`)}
          alt="프로필 이미지"
          className="w-32 rounded-full"
        />
        <button className='p-2 m-2 bg-blue-400 rounded'
          onClick={() => setOpenProfileImageModal(true)}>변경</button>
      </div>
      <div className='flex flex-col'>
        <p>닉네임 : {user.name}</p>
        <div className='flex items-center justify-end'>
          <p>닉네임 : {user.nickname}</p>
          <button className='m-2 p-2 bg-blue-500 rounded' onClick={() => setOpenNicknameModal(true)}
          >변경</button>
        </div>
        <div className='flex items-center justify-end'>
          <p>업적 : {user.mainReward}</p>
          <button className='m-2 p-2 bg-blue-500 rounded'
            onClick={() => setOpenRewardsModal(true)}>변경</button>
        </div>
        <div className='flex items-center justify-end'>
          <p>비밀번호 변경</p>
          <button className='m-2 p-2 bg-blue-500 rounded'
            onClick={() => setOpenCheckPasswordModal(true)}>변경</button>
        </div>
        <p className='m-2 p-2 text-right'
        >level : {user.level}</p>
        <p className='m-2 p-2 text-right'
        >email : {user.email}</p>
      </div>
      <ProfileImageModal></ProfileImageModal>
      <NicknameModal></NicknameModal>
      <RewardsModal></RewardsModal>
      <CheckPasswordModal></CheckPasswordModal>
      <UpdataPasswordModal></UpdataPasswordModal>
    </div>
  );
};

export default MyInfo;