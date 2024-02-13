import React, { createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css';
import io from "socket.io-client";
import { getUserInfo, setNoLoginUserInfo } from './store/userSlice';
import { useDispatch } from 'react-redux';


import Lobby from './pages/lobby'
import Login from './pages/login'
import Play from './pages/play'
import Signup from './pages/signup';
import Rooms from './components/lobby/rooms';
import Ranking from './components/lobby/ranking';
import MyPage from './components/lobby/myPage';
import MyInfo from './components/mypage/myInfo';
import MyRanking from './components/mypage/myRanking';
import MyReward from './components/mypage/myReward';
import Callback from './pages/callback';
import Page404 from './pages/Page404';
import SearchPlayer from './pages/searchPlayer';
import SearchPlayerDetail from './pages/searchPlayerDetail';


//노드 서버
// const socket = io("http://localhost:3001");
const socket = io('https://secretzoo.site'); // 노드 서버 URL 
export const SocketContext = createContext();

function App() {
  console.error = (error) => error.apply;
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem('access-token')) {
        dispatch(getUserInfo());
      }
      if(sessionStorage.getItem('noLogin')){
        dispatch(setNoLoginUserInfo());
      }
    };

    loadData();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <div className="App font-DNFBitBitv2">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/auth/callback" element={<Callback />}></Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/lobby" element={<Lobby />}>
              <Route index element={<Rooms />} />
              <Route path='/lobby/ranking' element={<Ranking />} />
              <Route path='/lobby/searchPlayer' element={<SearchPlayer />} />
              <Route path='/lobby/searchPlayer/:userSequence' element={<SearchPlayerDetail />} />
              <Route path='/lobby/myPage' element={<MyPage />}>
                <Route index element={<MyInfo />} />
                <Route path="/lobby/myPage/myranking" element={<MyRanking />} />
                <Route path="/lobby/myPage/myreward" element={<MyReward />} />
              </Route>t
            </Route>
            <Route path="/play" element={<Play />} />
          </Routes>
        </div>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
