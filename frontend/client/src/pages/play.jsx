import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../style/play.css';
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
} from '../store/playSlice'

import PlayerView from '../components/play/playerView'
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
  const [thisTurnPlayer, setThisTurnPlayer] = useState('');
  const [cardDrag, setCardDrag] = useState({ 'from': -1, 'to': -1, 'card': -1 });
  const [cardDrop, setCardDrop] = useState({ 'from': -1, 'to': -1, 'card': -1 });
  const [playersId, setPlayersId] = useState(['', '', '', '', '', '']);
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

  const imageRoute = (i) => {
    return require(`../assets/img/card/0${Math.floor(i / 8)}/00${i % 8}.png`);
  }

  const dragStart = (event, item) => {
    if (playState !== 1 || !isMyTurn) {
      event.preventDefault();
    }
    dispatch(changeCardStatus({ 'from': pid, 'card': item }));
  }

  const dragBluffStart = (event, item) => {
    if (playState !== 4 || !isMyTurn) {
      event.preventDefault();
    }
    dispatch(changeCardStatus({ 'from': pid, 'card': item }));
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
  const cardBluffHandler = (value) => {
    dispatch(changePlayState(3));
    console.log(`[cardBluff] value [${value}]`)
    socket.emit("cardBluffSelect", value);
  };

  // 공격당한 플레이어의 선택지 발생 시 
  const handleAnswer = (val, pid) => {
    console.log(`Answer : ${val}`);
    if (val === 1) {
      cardPassHandler();
      dispatch(changePlayState(4));
    } else {
      cardAnswerHandler(val);
      dispatch(changePlayState(5));
    }
  }

  // 카드 패스 선택시
  const cardPassHandler = () => {
    console.log(`card Passed!`);
    socket.emit('cardPass', roomName, (result) => {
      console.log(`[cardPass] ${result}`)
      setIsMyTurn(true);
    });
  }

  // 카드 정답 맞추기
  const cardAnswerHandler = (answer) => {
    console.log(`card Answered!`);
    socket.emit('cardReveal', roomName, answer);
  }

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
  const thisTurnEnd = () => {
    socket.emit('')
    dispatch(changePlayState(1));
  }

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
    setThisTurnPlayer(roomInfo.nowTurn);
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

  const playerSlot = (playerArr) => {
    const slotArr = [];
    for (let k = 0; k < 5; k++) {
      let playerId = "", playerName = "";
      let activate = false;
      if (playerArr[k] != null || playerArr[k] !== undefined) {
        playerId = playerArr[k].playerId;
        playerName = playerArr[k].playerName;
        activate = true;
      }
      slotArr.push(
        <PlayerView
          pid={playerId}
          key={k}
          pn={playerName}
          activate={activate}>
        </PlayerView>
      )
    }
    return slotArr;
  }

  return (
    <>
      <div className="h-screen">
        <div className='w-screen h-[60%] flex flex-wrap justify-between'>
          {/* 내 턴 아닐 때 드래그 공유 */}


          {/* 내 턴일 때 드롭 시 버튼 */}
          {
            playState === 2 && isMyTurn &&
            <SelectScreen>
              <div className="overlay">{
                animalList.map((value, index) => (

                  <Button
                    className=""
                    key={index}
                    onClick={() => { cardBluffHandler(index) }}
                  >
                    {value}
                  </Button>

                ))
              }
              </div>
            </SelectScreen>
          }
          {/* 내 턴이 아닐 때 관전 */}
          {
            playState === 2 && !isMyTurn &&
            <SelectScreen>
              <div className="overlay">
                <h2>다른 플레이어가 선택 중 입니다...!</h2>
                <Spinner aria-label="Success spinner" size="xl" />
              </div>
            </SelectScreen>
          }
          {/* 방어 시도 ...! */}
          {
            playState === 3 && isMyTurn &&
            <SelectScreen>
              <div className="overlay">
                <Button onClick={() => handleAnswer(0)}>
                  맞다
                </Button>
                <Button onClick={() => handleAnswer(1)}>
                  패스
                </Button>
                <Button onClick={() => handleAnswer(2)} >
                  아니다
                </Button>
              </div>
            </SelectScreen>
          }
          {/* 방어 시도 관전 */}
          {
            playState === 3 && !isMyTurn &&
            <SelectScreen>
              <div className="overlay">

                <h3>A 플레이어가 B 플레이어에게 말했습니다.</h3>
                <h2>이거 <strong> {animalList[bCard]} </strong> 야.</h2>
                <Spinner aria-label="Success spinner" size="xl" />
              </div>
            </SelectScreen>
          }
          {/* 넘기기 턴 (내턴, 카드)*/}
          {
            playState === 4 && isMyTurn &&
            <SelectScreen>
              <div
                onDragStart={(event) => dragBluffStart(event, 64 + bCard)}
                draggable={isMyTurn}
                className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300 "
              >
                <img src={imageRoute(64)} alt="" />
              </div>

            </SelectScreen>
          }


          {/* 넘기는 턴 (내턴 아님, 카드) */}
          {
            playState === 4 && !isMyTurn &&

            <SelectScreen>
              <div
                onDragStart={(event) => dragBluffStart(event, 64 + bCard)}
                draggable={isMyTurn}
                className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300 "
              >
                <img src={imageRoute(64)} alt="" />
              </div>

            </SelectScreen>
          }
          {/* 게임결과 */}
          {
            playState === 5 &&
            <SelectScreen>
              <div className="overlay">
                <div hidden={!gameResult}>
                  <h3>플레이어가 정답을 맞췄습니다.</h3>
                </div>
                <div hidden={gameResult}>
                  <h3>플레이어가 정답을 틀렸습니다.</h3>
                </div>
                <Button onClick={() => { thisTurnEnd() }}></Button>
              </div>
            </SelectScreen>
          }
          {/* 게임결과 */}
          {
            playState === 6 &&
            <SelectScreen>
              <div className="overlay">
                <h1>이것은 일단 통계회면이라고 할 수 있는데 통계 화면이 아닌걸로 할 수 있어요 무슨 소리냐구요? 나도 잘 몰라요</h1><br />
                <Button onClick={() => { dispatch(changePlayState(0)); }}></Button>
              </div>
            </SelectScreen>
          }
          {/* 플레이어 표현 부분 */}
          {
            playerSlot(playerList)
          }
          {/* <img className="" src={require(`../assets/img/card/00/000.png`)} alt="" /> */}

          <div className='flex absolute left-[35%] bottom-[100px]'>

            {/* 카드 표현 부분 */}
            {cards &&
              cards.map((i, index) => (
                <div
                  onDragStart={(e) => dragStart(e, i)}
                  key={index}
                  // draggable={((playState === 1 || playState === 4) && isMyTurn)}
                  draggable

                  className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300"
                  style={{ zIndex: cards.length - index, userSelect: false, }}
                >
                  {/* <img key={index} className="" src={require(`../assets/img/card/0${Math.floor(i / 8)}/00${i % 8}.png`)} alt="" /> */}
                  <img key={index} className="rounded-md" src={images[i]} alt="" />
                </div>
              ))}


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
            <Button className={(playState === 0) ? '' : 'hidden'} disabled={!isAdmin} color="success" onClick={start}>start</Button>
            <Button color="success" onClick={leaveRoom}>난 나갈거다.</Button>
          </div>

        </div>
      </div >
    </>
  );
};
export default Play;