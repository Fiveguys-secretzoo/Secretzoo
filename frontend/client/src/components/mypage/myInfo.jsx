import React, {useEffect, useState} from 'react';
import axios from 'axios';


const MyInfo = () => {
  const [user, setUser] = useState({});
  const getUserInfo = () => {
    const headers = {
      'Authorization': sessionStorage.getItem('authorization')
    };
    axios.get('http://localhost:8080/users/user',{headers})
    .then(response => {
      console.log(response.data)
      setUser(response.data)
    });
  }
  useEffect(()=>{
    getUserInfo();
  },[])
  axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
  const updateProfileImage = () => {
    axios.put('http://localhost:8080/users/profile-number','23')
    .then(response => {
      getUserInfo();
    });
  };
  const updateNickname = () => {
    axios.put('http://localhost:8080/users/nickname','23')
    .then(response => {
      getUserInfo();
    });
  };
  const updateMainAchievement = () => {
    axios.put('http://localhost:8080/users/nickname','23')
    .then(response => {
      getUserInfo();
    });
  };
   
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const openShowProfileImageModal = () => {
    setShowProfileImageModal(true);
  };

  return (
    <div className='px-20 py-10 container bg-gray-200 flex items-center justify-between'>
      <div className='flex flex-col items-center '>
        <img
              src={require(`../../assets/Untitled 58.png`)}
              alt="프로필 이미지"
              className="w-32 rounded-full"
            />
        <button className='p-2 m-2 bg-blue-400 rounded'
        onClick={()=>openShowProfileImageModal()}>변경</button>            
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center justify-end'>
          <p>닉네임 : {user.nickname}</p>
          <button className='m-2 p-2 bg-blue-500 rounded'
          >변경</button>
        </div>
        <div className='flex items-center justify-end'>
          <p>업적 : {user.achievementName}</p>
          <button className='m-2 p-2 bg-blue-500 rounded'
          onClick={updateMainAchievement}>변경</button>
        </div>
        <p className='m-2 p-2 text-right'
        >level : {user.level}</p>
        <p className='m-2 p-2 text-right'
        >email : {user.email}</p>
      </div>
    </div>
  );
};

export default MyInfo;