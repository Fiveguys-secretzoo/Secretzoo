// import React, { useState, useEffect, useRef } from 'react';
// import { Card } from 'flowbite-react'
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import './openvidu/App.css';
import UserVideoComponent from './openvidu/UserVideoComponent';
// openvidu react import 끝
import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import { motion, useDragControls } from 'framer-motion';
import { Spinner, Button } from 'flowbite-react';

import { useSelector, useDispatch } from 'react-redux';
import {
  initRoomInfo,
  initCardInfo,
  addPlayer,
  removePlayer,
  changePlayState,
  changeAdmin,
  changeNowTurn,
  removeCardFromHand,
  changeCardStatus,
  changeCardDrag,
  changeCardDrop,
  changeCardBluff,
  changeInitOnBoardCard,
  initTurnedPlayer,
  addTurnedPlayer,
  dropCard,
} from '../store/playSlice'
import PlayerContainer from '../components/play/playerContainer';//추가
// import PlayerView from '../components/play/playerView'//직접 추가했음

import CardView from '../components/play/cardView'

import '../style/play.css';
import DropSelectMyTurn from '../components/play/dropSelectMyTurn';
import DropSelectNotTurn from '../components/play/dropSelectNotTurn';
import AnswerSelectMyTurn from '../components/play/answerSelectMyTurn';
import AnswerSelectNotTurn from '../components/play/answerSelectNotTurn';
import PassTurnCardView from '../components/play/passTurnCardView';
import AnswerRevealView from '../components/play/answerRevealView';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://openvidu.secretzoo.site/';


const Play = () => {
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  const pid = sessionStorage.getItem("userName");
  const navigate = useNavigate();
  
  // redux related const.
  const roomInfo = useSelector(state => state.plays);
  const playState = useSelector(state => state.plays.onBoard.status);
  const playerList = useSelector(state => state.plays.players);
  const adminPlayer = useSelector(state => state.plays.adminPlayer);
  const nowTurn = useSelector(state => state.plays.nowTurn);
  const roomName = useSelector(state => state.plays.roomName);
  const fromP = useSelector(state => state.plays.onBoard.from);
  const toP = useSelector(state => state.plays.onBoard.to);
  const card = useSelector(state => state.plays.onBoard.card);
  const bCard = useSelector(state => state.plays.onBoard.cardBluff);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cards, setCards] = useState([0, 1, 2, 3]); // 손에 들고 있는 카드 관리
  const [isRight, setIsRight] = useState(false);
  const [gameResult, setGameResult] = useState(false);
  // 0 대기 1 시작 2 카드 드롭 후 동물 선택 3 동물 선택 후 방어 턴 4 넘기는 턴 드래그 5 넘기는 턴 동물 선택 6 결과 확인
  const [images, setImages] = useState([]);

  const animalList = [
    '호랑이',
    '고양이',
    '강아지',
    '고라니',
    '돼지',
    '여우',
    '양',
    '고래',
  ];

  const PlayerView = ({ pid, key, pn = "SomethingWrong", activate = false,aaa }) => {

    const playerContainer = PlayerContainer();
    const { dragOver, dragEnterHandler, dropHandler } = playerContainer;
  
    // TODO 위에 올렸을 때 가능하냐 안하냐에 따라서 효과를 다르게 주는 것...!!
  
    return (
      <>
        <div className="bg-white rounded w-[30%] m-2"
          key={key}
          onDragEnter={(e) => dragEnterHandler(e, pid)}
          onDragOver={(e) => dragOver(e, pid)}
          onDrop={(e) => dropHandler(e, pid)}
        >
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pid}
          </p>
          {aaa}
          {/* {(pid === sessionStorage.getItem('userName'))&&
          <App pid={pid}/>
           }  */}
        </div>
      </>
    );
  }

  const imageRoute = (i) => {
    return require(`../assets/img/card/0${Math.floor(i / 8)}/00${i % 8}.png`);
  }

  // 화면 가리는 창 띄우기 , children에 띄우고 싶은 요소 정의하면 ok.
  const SelectScreen = ({ children }) => {
    const el = document.createElement('div');
    useEffect(() => {
      document.body.appendChild(el);

      return () => {
        document.body.removeChild(el);
      };
    }, [el]);

    return ReactDOM.createPortal(
      children,
      el
    )
  }

  // player enter socket event handle
  const playerEnterHandler = (player) => {
    console.log(`##### player entered...`);
    console.log(player);
    dispatch(addPlayer(player));
  }

  // player leave socket event handle
  const playerLeaveHandler = (player) => {
    dispatch(removePlayer(player));
  }

  // 플레이어가 속일 동물 종류를 선택 시

  // 방을 나간다. 나는 나간다.
  const leaveRoom = () => {
    socket.emit("leaveRoom", roomName, pid);
    navigate('/lobby')
  }

  // 메시지를 처리한다. 그런 함수다.
  const messageHandler = (msg) => {
    console.log(1)
    setMessages((msgs) => [...msgs, msg]);
  };


  // socket.io drag handle
  const cardDragResponseHandler = (from, to) => {
    console.log(`[cardDrag] [${from}] to [${to}]`);
    dispatch(changeCardDrag({ from: from, to: to }))
  };
  // socket.io drag handle
  const cardDropResponseHandler = (from, to) => {
    console.log(`[cardDrop] [${from}] to [${to}]`);

    dispatch(changePlayState(2));
    dispatch(changeNowTurn(from));
    dispatch(changeCardDrop({ from: from, to: to }))
    console.log(`[cardDrop] nowTurn : ${nowTurn} / pid : ${pid}`);
    console.log(`[cardDrop] playState is ${playState} / isMyTurn : ${isMyTurn}`)
  };

  // socket.io handleBluff Response
  const cardBluffResponseHandler = (from, to, bCard) => {
    console.log(`card Bluffed [${from}] to [${to}] by [${bCard}]`);
    dispatch(changePlayState(3));
    dispatch(changeNowTurn(to));
    if (nowTurn === pid) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
    dispatch(changeCardBluff(bCard));
  }

  // socket.io handle Pass Res
  const cardPassResponseHandler = (from, nowTurnPlayer) => {
    console.log(`card Pass Response!`)
    dispatch(changePlayState(4))
    dispatch(changeNowTurn(nowTurnPlayer));
    dispatch(changeCardStatus({ 'from': from, 'card': card }));
    if (nowTurnPlayer === pid) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
    console.log(`[cardpass] ${playState}, ${isMyTurn}`)
    console.log(`[cardPass] draggable [${(playState === 4 && isMyTurn)}]`)
  }

  const cardRevealResponseHandler = (result, nowTurnPlayer) => {
    setGameResult(result);
    dispatch(changePlayState(5));
    dispatch(changeNowTurn(nowTurnPlayer))
    if (nowTurnPlayer === pid) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
    console.log(`card Answer Response!`);
  }


  // socket.io 페널티 추가 handler
  const penaltyAddResponseHandler = (pid, penalty) => {

    // 패널티 점수 체크
  }

  // socket.io 게임 종료 handler 
  const gameEndResponseHandler = (loserPid) => {

  }

  // 게임 시작 버튼을 눌렀을 때 작동하는  함수, 여러가지 socket을 on 처리 시킨다.
  const gameStart = (cards, firstPlayer) => {
    console.log("##### Game Started !");
    setCards(cards);
    dispatch(changePlayState(1));
    console.log("##### Card Set");
    console.log(cards);
    console.log(images);
  }
  // 게임 종료 시 사용
  // playState 1 으로 정의 


  // game Info 변경 시 사용
  const gameInfoHandler = (game) => {
    console.log("this comes when the game info is change");
    console.log(game);
    dispatch(initRoomInfo(game));
  }

  const cardInfoHandler = (cards) => {
    try { setCards([...cards]) }
    catch (e) {

    }
  }

  /* 이벤트 수신, 방 입장 시 실행 */
  useEffect(() => {

    // 서버 닫혔을 때 유저를 대방출
    socket.on("serverClosed", (e) => {
      console.log("serverClosed");
      navigate('/');
    });

    // Reconnection 확인용
    socket.emit('checkReconnection', pid);
    // 게임 방의 초기 정보 확인 후 가져옴
    socket.emit('requestGameInfo', gameInfoHandler);
    socket.on('sendCardInfo', cardInfoHandler);
    socket.on('chatMessage', messageHandler);
    socket.on('gameStart', gameStart);
    socket.on('playerEnter', playerEnterHandler);
    socket.on('playerLeave', playerLeaveHandler);
    //test, and get the every room info
    // socket.emit('testRoomsInfo', (rooms) => {
    //   console.log(rooms);
    // })


    socket.on("cardDrag", cardDragResponseHandler);
    socket.on("cardDrop", cardDropResponseHandler);
    socket.on("cardBluffSelect", cardBluffResponseHandler);
    socket.on("cardPass", cardPassResponseHandler);
    socket.on("cardReveal", cardRevealResponseHandler);
    socket.on("penaltyAdd", penaltyAddResponseHandler);
    socket.on("gameEnd", gameEndResponseHandler);

    return () => {
      socket.off('gameInfo', gameInfoHandler);
      socket.off('chatMessage', messageHandler);
      socket.off('gameStart', gameStart);
    };
  }, []);

  // playState 추적 
  useEffect(() => {
    console.log(`check playState : ${playState}`);
    if (playState === 1) {
      socket.emit("isTurnEnd", roomName, (loserPid) => {
        if (loserPid !== false) {

          alert(`Loser is ${loserPid}`);
          dispatch(initTurnedPlayer());
          dispatch(changePlayState(6));
        }
      })
      dispatch(addTurnedPlayer(fromP));
    }

  }, [playState]);


  //nowTurn, adminPlayer 추적
  useEffect(() => {
    if (nowTurn === pid) {
      setIsMyTurn(true);
    }
    if (adminPlayer === pid) {
      setIsAdmin(true);
    }
    console.log(`isMyTurn : ${isAdmin}`);
    console.log(`isAdmin : ${isAdmin}`);
    // checkMyTurn(roomInfo.adminPlayer);
    // checkIsAdmin(roomInfo.nowTurn);
  }, [adminPlayer, nowTurn, isAdmin])

  useEffect(() => {

    const newImg = [];
    for (let k = 0; k < 65; k++) {
      newImg[k] = imageRoute(k);
    }

    setImages(newImg);

  }, [cards]);


  const sendMessage = () => {
    socket.emit('chat message', input, localStorage.getItem('userName'));
    setInput('');
  };

  // 게임시작 이벤트 호출
  const start = () => {
    socket.emit('start');
  }

  const aaa = useRef(undefined);
  const playerSlot = (playerArr) => {
    const slotArr = [];
    // const aaa = undefined;
    for (let k = 0; k < 5; k++) {
      let playerId = "", playerName = "";
      let activate = false;
      if (playerArr[k] != null || playerArr[k] !== undefined) {
        playerId = playerArr[k].playerId;
        playerName = playerArr[k].playerName;
        activate = true;
        if(k==0){
          aaa.current = <UserVideoComponent streamManager={publisher} />
        }
        else{
          aaa.current = <UserVideoComponent streamManager={subscribers[k-1]} />
        }
      }
      else{
        aaa.current=undefined;
      }
      slotArr.push(
        <PlayerView
        pid={playerId}
        key={k}
        pn={playerName}
        activate={activate}
        aaa={aaa.current}>
        </PlayerView>
      )
    }
    App();
    return slotArr;
  }

  const [myUserName, setMyUserName] = useState(sessionStorage.getItem('userName'));
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const session = useRef(undefined);
  const App = () => {
      useEffect(() => {
        console.log('$$$$$$$$$$$$$$$$$$$$$$$4');
          window.addEventListener('beforeunload', onbeforeunload);
          joinSession();
          return () => {
              window.removeEventListener('beforeunload', onbeforeunload);
              leaveSession();
          };
      }, []);

      const onbeforeunload = () => {
          leaveSession();
      };

      const deleteSubscriber = (streamManager) => {
          setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
      };

      const joinSession = async () => {
          const OV = new OpenVidu();

          const mySession = OV.initSession();
          
          mySession.on('streamCreated', (event) => {
              const subscriber = mySession.subscribe(event.stream, undefined);
              setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
          });
          
          mySession.on('streamDestroyed', (event) => {
              deleteSubscriber(event.stream.streamManager);
          });
          
          mySession.on('exception', (exception) => {
              console.warn(exception);
          });
          
          try {
              const token = await getToken(sessionStorage.getItem('roomName'));
              setMyUserName(sessionStorage.getItem('userName'));
              
              mySession.connect(token, { clientData: myUserName })
              .then(async () => {
                  let newPublisher = await OV.initPublisherAsync(undefined, {
                      audioSource: undefined,
                      videoSource: undefined,
                      publishAudio: true,
                      publishVideo: true,
                      resolution: '600x480',
                      frameRate: 30,
                      insertMode: 'APPEND',
                      mirror: false,
                  });
                  
                  await mySession.publish(newPublisher);
                  
                  setPublisher(newPublisher);
                  console.log(session);
                  
                  console.log(publisher);
              })
              .catch((error) => {
                  console.log('There was an error connecting to the session:', error.code, error.message);
              });
          } catch (error) {
              console.error(error);
          }
          session.current = mySession;
      };
      
      const leaveSession = () => {
          const mySession = session.current;
          sessionStorage.removeItem('roomName');
          if (mySession) {
              mySession.disconnect();
          }
          
          session.current=undefined;
          setSubscribers([]);
          // setMySessionId('');
          setMyUserName(sessionStorage.getItem('userName'));
          // setMainStreamManager(undefined);
          setPublisher(undefined);
      };

      const getToken = async (sid) => {
          const safeid = encodeURIComponent(sid).replace(/[%]/g, '');
          const sessionId = await createSession(safeid);
          return await createToken(sessionId);
      };

      const createSession = async (sessionId) => {
          const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
              headers: { 'Content-Type': 'application/json' },
          });
          return response.data;
      };

      const createToken = async (sessionId) => {
          const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
              headers: { 'Content-Type': 'application/json' },
          });
          return response.data;
      };

      // return (
      //     <div className="container">
      //         <div id="video-container" className="col-md-6">
      //             {publisher !== undefined ? (
      //                 <div className="stream-container col-md-6 col-xs-6">
      //                     <UserVideoComponent streamManager={publisher} />
      //                 </div>
                      
      //             ) : null}
      //         </div>
      //         <div className="sub-container">
      //             {subscribers.map((sub, i) => (
      //                 <div key={sub.id} className="stream-container col-md-6 col-xs-6">
      //                     <span>{sub.id}</span>
      //                     <UserVideoComponent streamManager={sub} />
      //                 </div>
      //             ))}
      //         </div>
      //     </div>
      // );
  };



  return (
    <>
      <div className="h-screen">
        <div className='w-screen h-[60%] flex flex-wrap justify-between'>
          {/* 내 턴 아닐 때 드래그 공유 */}

          {/* 내 턴일 때 드롭 시 버튼 */}
          {
            playState === 2 && isMyTurn &&

            <SelectScreen>
              <DropSelectMyTurn
                animalList={animalList}
              >
              </DropSelectMyTurn>
            </SelectScreen>
          }
          {/* 내 턴이 아닐 때 관전 */}
          {
            playState === 2 && !isMyTurn &&
            <SelectScreen>
              <DropSelectNotTurn></DropSelectNotTurn>
            </SelectScreen>
          }
          {/* 방어 시도  */}
          {
            playState === 3 && isMyTurn &&
            <SelectScreen>
              <AnswerSelectMyTurn
                roomName={roomName}
                setIsMyTurn={setIsMyTurn}
              ></AnswerSelectMyTurn>
            </SelectScreen>
          }
          {/* 방어 시도 관전 */}
          {
            playState === 3 && !isMyTurn &&
            <SelectScreen>
              <AnswerSelectNotTurn
                p1="playerFrom"
                p2="playerTo"
                animal={animalList[bCard]}
              >
              </AnswerSelectNotTurn>
            </SelectScreen>
          }
          { //TODO 뒷면 동물 카드로 대체 필요
            /* 넘기기 턴 (내턴, 카드)*/}
          {
            playState === 4 && isMyTurn &&
            <SelectScreen>
              <PassTurnCardView
                bCard={bCard}
                isMyTurn={isMyTurn}
                img={images[64]}
                pid={pid}
                playState={playState}
              ></PassTurnCardView>
            </SelectScreen>
          }


          {/* 넘기는 턴 (내턴 아님, 카드) */}
          {
            playState === 4 && !isMyTurn &&

            <SelectScreen>
              <PassTurnCardView
                bCard={bCard}
                isMyTurn={isMyTurn}
                img={images[64]}
                pid={pid}
                playState={playState}
              ></PassTurnCardView>
            </SelectScreen>
          }
          {/* 게임결과 */}
          {
            playState === 5 &&
            <SelectScreen>
              <AnswerRevealView gameResult={gameResult}>
              </AnswerRevealView>
            </SelectScreen>
          }
          {/* 게임결과 */}
          {
            playState === 6 &&
            <SelectScreen>
              <gameResultView></gameResultView>
            </SelectScreen>
          }
          {/* 플레이어 표현 부분 */}
          {
            playerSlot(playerList)
          }
          {/* <img className="" src={require(`../assets/img/card/00/000.png`)} alt="" /> */}

          <div className='flex absolute left-[35%] w-[65%] bottom-[100px]'>

            {/* 카드 표현 부분 */}
            <div className='flex max-w-[55%] max-h-[10em]'>
              {cards &&
                cards.map((i, index) => (
                  <CardView
                    key={index}
                    src={images[i]}
                    index={index}
                    card={i}
                    cardlength={cards.length}
                    isMyTurn={isMyTurn}
                    playState={playState}
                    pid={pid} >
                  </CardView>
                ))
              }
            </div>

            <div className='flex flex-col'>
              <h1>Chat Application</h1>
              <div className="message-list">
                {messages.map((msg, index) => (
                  <div key={index} className="message">{msg}</div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button onClick={/*sendMessage*/() => { console.log(roomInfo) }}>Send</Button>
              </div>
            </div>
              <Button className={(playState === 0) ? '' : 'hidden'} disabled={!isAdmin} color="success" onClick={start}>start</Button>
              <Button color="success" onClick={leaveRoom}>난 나갈거다.</Button>
          </div>
        </div>
      </div>

    </>
  );
};
export default Play;