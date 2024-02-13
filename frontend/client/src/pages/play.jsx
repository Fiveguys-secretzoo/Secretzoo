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
import { Button } from 'flowbite-react';

import { useSelector, useDispatch } from 'react-redux';
import {
  initRoomInfo,
  initCardInfo,
  modifyPlayers,
  changePlayState,
  changeAdmin,
  changeNowTurn,
  removeCardFromHand,
  changeCardStatus,
  changeCardDrag,
  changeCardDrop,
  changeCardBluff,
  changeInitgameCard,
  initTurnedPlayer,
  changeTurnedPlayer,
  dropCard,
  changePenalty,
} from '../store/playSlice'
import PlayerContainer from '../components/play/playerContainer';//추가
import PlayerView from '../components/play/playerView'//직접 추가했음

import CardView from '../components/play/cardView'

import '../style/play.css';
import DropSelectMyTurn from '../components/play/dropSelectMyTurn';
import DropSelectNotTurn from '../components/play/dropSelectNotTurn';
import AnswerSelectMyTurn from '../components/play/answerSelectMyTurn';
import AnswerSelectNotTurn from '../components/play/answerSelectNotTurn';
import PassTurnCardView from '../components/play/passTurnCardView';
import AnswerRevealView from '../components/play/answerRevealView';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://openvidu.secretzoo.site/';

// TODO passing Turn Player Exception Handle (!)  l

const Play = () => {
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  const navigate = useNavigate();

  const playerSequence = useSelector(state => state.user.userInfo.userSequence);
  // redux related const.
  const roomInfo = useSelector(state => state.plays);
  const playState = useSelector(state => state.plays.game.state);
  const playerList = useSelector(state => state.plays.players);
  const adminPlayer = useSelector(state => state.plays.adminPlayer);
  const nowTurn = useSelector(state => state.plays.nowTurn);
  const roomName = useSelector(state => state.plays.roomName);
  const fromP = useSelector(state => state.plays.game.from);
  const toP = useSelector(state => state.plays.game.to);
  const card = useSelector(state => state.plays.game.c);
  const bCard = useSelector(state => state.plays.game.bc);
  const turnedPlayer = useSelector(state => state.plays.game.tp);
  const playerCount = useSelector(state => state.plays.playerCount);
  const players = useSelector(state => state.plays.players);

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
  const [answerCard, setAnswerCard] = useState(64); // 정답 공개 시 카드

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
  const playerEnterHandler = (players) => {
    console.log(`##### player entered...`);
    console.log(players);
    dispatch(modifyPlayers(players));
  }

  // player leave socket event handle
  const playerLeaveHandler = (players) => {
    console.log(`##### player leaved...`);
    dispatch(modifyPlayers(players));
  }

  // 플레이어가 속일 동물 종류를 선택 시

  // 방을 나간다. 나는 나간다.
  const leaveRoom = () => {
    socket.emit("leaveRoom", roomName, playerSequence);
    dispatch(modifyPlayers({}));
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
  const cardDropResponseHandler = (state, from, to) => {
    console.log(`[cardDrop] [${from}] to [${to}]`);
    dispatch(changePlayState(state));
    dispatch(changeCardDrop({ from: from, to: to }))
    console.log(`[cardDrop] nowTurn : ${nowTurn} / psq : ${playerSequence}`);
    console.log(`[cardDrop] playState is ${playState} / isMyTurn : ${isMyTurn}`)
  };

  // socket.io handleBluff Response
  const cardBluffResponseHandler = (state, turnedPlayer, from, to, bCard) => {
    console.log(`card Bluffed [${from}] to [${to}] by [${bCard}]`);
    if (to === playerSequence) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }

    dispatch(changePlayState(state));
    dispatch(changeNowTurn(to));
    dispatch(changeTurnedPlayer(turnedPlayer));
    dispatch(changeCardBluff(bCard));
  }

  // socket.io handle Pass Res
  const cardPassResponseHandler = (state, turnedPlayer, from, to, nowTurnPlayer) => {
    console.log(`##### [cardPass] card Pass Response!`)
    dispatch(changePlayState(state))
    dispatch(changeNowTurn(nowTurnPlayer));
    dispatch(changeCardStatus({ 'from': from, 'card': card }));
    if (nowTurnPlayer === playerSequence) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
    console.log(`[cardpass] ${playState}, ${isMyTurn}`)
    console.log(`[cardPass] draggable [${(playState === 4 && isMyTurn)}]`)
  }

  const cardRevealResponseHandler = (state, card, ans, nowTurnPlayer) => {
    if (nowTurnPlayer === playerSequence) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
    dispatch(changePlayState(5)); // state 5 // 받는 건 1이지만 확인 후에 1로 가는 걸로 변경
    setGameResult(ans);
    setAnswerCard(card);
    dispatch(changeNowTurn(nowTurnPlayer))
    dispatch(initTurnedPlayer());
    console.log(`card Answer Response!`);
  }


  // socket.io 페널티 추가 handler
  const penaltyAddResponseHandler = (psq, penalty) => {
    dispatch(changePenalty(psq, penalty));
    // 패널티 점수 체크
  }

  // socket.io 게임 종료 handler 
  const gameEndResponseHandler = (loserpsq) => {

  }

  // 게임 시작 버튼을 눌렀을 때 작동하는 함수
  const gameStart = (state, cards) => {
    console.log("##### Game Started ! #####");
    setCards(cards);
    dispatch(changePlayState(state));
    console.log("##### [gameStart] Card Set");
    console.log(cards);
  } 
  // 게임 종료 시 사용
  // playState 1 으로 정의 


  // game Info 변경 시 사용
  const gameInfoHandler = (game) => {
    console.log("##### [gameInfoHandler] game info arrived");
    console.log(game);
    dispatch(initRoomInfo(game));
  }

  const cardInfoHandler = (cards) => {
    setCards([...cards])
  }

  /* 이벤트 수신, 방 입장 시 실행 */
  useEffect(() => {

    // 서버 닫혔을 때 유저를 대방출
    socket.on("serverClosed", (e) => {
      console.log("serverClosed");
      navigate('/');
    });

    // Reconnection 확인용
    socket.emit('checkReconnection', playerSequence);
    // 게임 방의 초기 정보 확인 후 가져옴
    socket.emit('requestGameInfo', sessionStorage.getItem("roomName"), playerSequence, gameInfoHandler);

    // 내 카드 정보 받기 
    socket.on('sendCardInfo', cardInfoHandler);

    socket.on('chatMessage', messageHandler);

    socket.on('gameStart', gameStart);

    socket.on('playerEnter', playerEnterHandler);

    socket.on('playerLeave', playerLeaveHandler);
    //test, and get the every room info
    // socket.emit('testRoomsInfo', (rooms) => {
    //   console.log(rooms);
    // })

    // 카드 드래그 시 
    socket.on("cardDrag", cardDragResponseHandler);
    // 카드 드롭 했을 때
    socket.on("cardDrop", cardDropResponseHandler);

    socket.on("cardBluffSelect", cardBluffResponseHandler);

    socket.on("cardPass", cardPassResponseHandler);

    socket.on("cardReveal", cardRevealResponseHandler);

    socket.on("penaltyAdd", penaltyAddResponseHandler);

    // socket.on("gameEnd", gameEndResponseHandler);

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
      socket.emit("isTurnEnd", roomName, (loserpsq) => {
        if (loserpsq !== false) {
          alert(`Loser is ${loserpsq}`);
          dispatch(initTurnedPlayer());
          dispatch(changePlayState(6));
        }
      })
    }

  }, [playState]);

  //nowTurn, adminPlayer 추적
  useEffect(() => {
    if (nowTurn === playerSequence) {
      setIsMyTurn(true);
    }
    if (adminPlayer === playerSequence) {
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
    socket.emit('chat message', input, localStorage.getItem(''));
    setInput('');
  };

  // 게임시작 이벤트 호출
  const start = () => {
    socket.emit('start', roomName);
  }

  const video = useRef(undefined);
  const playerSlot = (playerArr) => {
    const slotArr = [];
    App();
    // const aaa = undefined;

    let count = 0;
    for (let player in playerArr) {
      if (player !== playerSequence) {
        let psq = "", playerName = "";
        let activate = false;
        if (playerArr[player] != null || playerArr[player] !== undefined) {
          psq = player;
          playerName = playerArr[player].pn;
          activate = true;
        }
        video.current = <UserVideoComponent streamManager={subscribers[count]} />
        
        count ++ ;
        slotArr.push(
          <PlayerView
            psq={psq}
            key={player}
            pn={playerName}
            activate={activate}
            setCards={setCards}
            animalList={animalList}
            video={video.current}>
          </PlayerView>
        )
      }
    }
    // video.current=undefined;
    for (let k = count; k < 6; k++) {
      slotArr.push(
        <div className="bg-white rounded w-[30%] m-2"
        >
        </div>
      )
    }
    let psq = "", playerName = "";
    let activate = false;
    if (playerArr[playerSequence] != null || playerArr[playerSequence] !== undefined) {
      psq = playerSequence;
      playerName = playerArr[playerSequence].pn;
      activate = true;
    }
    video.current = <UserVideoComponent streamManager={publisher} />
    slotArr.push(
      <PlayerView
        psq={psq}
        key={playerSequence}
        pn={playerName}
        activate={activate}
        setCards={setCards}
        animalList={animalList}
        video={video.current}>
      </PlayerView>
    )
    return slotArr;
  }

  const [myUserName, setMyUserName] = useState(sessionStorage.getItem('userNickname'));
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const session = useRef(undefined);
  const prevPlayerListRef = useRef({});

  const App = () => {
      useEffect(() => {
        if(Object.keys(prevPlayerListRef.current).length<Object.keys(playerList).length){
          console.log('$$$$$$$$$$$$$$$$$$$$$$$4');
          console.log(playerList);
            window.addEventListener('beforeunload', onbeforeunload);  
            joinSession();
            console.log('!!!!!!!!!!!!!!!!!!');
            console.log(subscribers);
          return () => {
              window.removeEventListener('beforeunload', onbeforeunload);
              leaveSession();
          };
        }
        else{
          prevPlayerListRef.current = {...playerList};
        }
      }, [playerList]);
      
      const onbeforeunload = () => {
          leaveSession();
      };

      const deleteSubscriber = (streamManager) => {
          setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
          console.log("## delete!!!!!!!!!!!");
      };

      const joinSession = async () => {
          const OV = new OpenVidu();

          const mySession = OV.initSession();
          
          mySession.on('streamCreated', (event) => {
              const subscriber = mySession.subscribe(event.stream, undefined);
              setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
              console.log("is created!!!!!!!!!!!!!!");
          });
          
          mySession.on('streamDestroyed', (event) => {
              deleteSubscriber(event.stream.streamManager);
          });
          
          mySession.on('exception', (exception) => {
              console.warn(exception);
          });
          
          try {
              const token = await getToken(sessionStorage.getItem('roomName'));
              setMyUserName(sessionStorage.getItem('userNickname'));
              
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
          if (mySession) {
              mySession.disconnect();
          }
          
          session.current=undefined;
          setSubscribers([]);
          setMyUserName(sessionStorage.getItem('userNickname'));
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
                roomName={roomName}
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
                playerCount={playerCount}
                tpCount={turnedPlayer.length}
              ></AnswerSelectMyTurn>
            </SelectScreen>
          }
          {/* 방어 시도 관전 */}
          {
            playState === 3 && !isMyTurn &&
            <SelectScreen>
              <AnswerSelectNotTurn
                p1={players[fromP]?.pn}
                p2={players[toP]?.pn}
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
                psq={playerSequence}
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
                psq={playerSequence}
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
                    psq={playerSequence} >
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
            <Button color="success" onClick={leaveRoom}>방 나가기</Button>
          </div>
        </div>
      </div>

    </>
  );
};
export default Play;