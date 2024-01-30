import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../style/play.css';
import { Spinner, Button } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer, removePlayer, initRoomInfo } from '../store/playSlice'

import PlayerView from '../components/play/playerView'

const Play = () => {
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  const pid = sessionStorage.getItem("userName");
  const roomInfo = useSelector(state => state.plays);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [thisTurnPlayer, setThisTurnPlayer] = useState('');
  const [cardDrag, setCardDrag] = useState({ 'from': -1, 'to': -1, 'card': -1 });
  const [cardDrop, setCardDrop] = useState({ 'from': -1, 'to': -1, 'card': -1 });
  const [playersId, setPlayersId] = useState(['', '', '', '', '', '']);
  // 0 대기 1 시작 2 카드 드롭 후 동물 선택 3 동물 선택 후 방어 턴 4 넘기는 턴 드래그 5 넘기는 턴 동물 선택 6 결과 확인
  const [playState, setPlayState] = useState(0);

  const dispatch = useDispatch();

  const animalList = {
    '호랑이': 0,
    '고양이': 1,
    '강아지': 2,
    '고라니': 3,
    '돼지': 4,
    '여우': 5,
    '양': 6,
    '고래': 7,
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

  // drag 할 떄 item 기록
  const navigate = useNavigate();
  const dragStart = (item) => {
    dragItem.current = item;
  }

  // 플레이어 위에 드래그가 올라갔을 때 socket.io 로 emit
  const dragEnterHandler = (e) => {
    console.log(dragItem.current + " hover " + e.target.textContent);
    socket.emit("cardDrag", pid, e.target.textContent);
  };

  // 드래그 Over 기본 Event
  const dragOver = (e) => {
    e.preventDefault();
  }

  // 플레이어 위에 드롭 했을 때 socket.io 로 emit
  const dropHandler = (e) => {
    e.preventDefault();
    console.log(dragItem.current + " drop " + e.target.textContent);
    alert(dragItem.current + " drop " + e.target.textContent);
    socket.emit("cardDrop", pid, e.target.textContent, dragItem.current);
    setPlayState(2);
  };

  // 플레이어가 속일 동물 종류를 선택 시
  const cardBluffHandler = (value) => {
    setPlayState(3);

    alert("key : value");
    socket.emit("cardBluffSelect", pid, value);
  };

  // 공격당한 플레이어의 선택지 발생 시 
  const handleAnswer = (val) => {
    console.log(`Answer : ${val}`);
    if (val === 1) {
      setPlayState(4);
    } else {
      setPlayState(5);
    }
  }

  const responseHandler = () => {

  }

  // socket.io drag handle
  const cardDragResponseHandler = (from, to) => {
    console.log("card Dragged");
    setCardDrag((value) => {
    });
    console.log(`${from} to ${to}`);
  };
  // socket.io drag handle
  const cardDropResponseHandler = (from, to) => {

    console.log("card Dragged");
    setCardDrop((value) => {
    });
    console.log(`${from} to ${to}`);
  };

  // socket.io handleBluff Response
  const cardBluffResponseHandler = (from, to, bCard) => {
    console.log(`card Bluffed [${from}] to [${to}] by [${bCard}]`);
  }

  // player enter socket event handle
  const playerEnterHandler = (player) => {

  }

  // player leave socket event handle
  const playerLeaveHandler = (player) => {

  }

  // 방을 나간다. 나는 나간다.
  const leaveRoom = () => {
    socket.emit("leaveRoom", pid);
    navigate('/lobby')
  }

  // 메시지를 처리한다. 그런 함수다.
  const messageHandler = (msg) => {
    console.log(1)
    setMessages((msgs) => [...msgs, msg]);
  };

  // 게임 시작 버튼을 눌렀을 때 작동하는 함수, 여러가지 socket을 on 처리 시킨다.
  const gameStart = (cards, firstPlayer) => {
    console.log("##### Game Started !");
    setCards(cards);
    setPlayState(1);
    console.log("##### Card Set");
    socket.on("gameListen", responseHandler)
    socket.on("cardDrag", cardDragResponseHandler)
    socket.on("cardDrop", cardDropResponseHandler)
    socket.on("cardBluffSelect", cardBluffResponseHandler);
    socket.on("playerEnter", playerEnterHandler);
    socket.on("playerLeave", playerLeaveHandler);
  }
  // 게임 종료 시 사용
  // playState 0 으로 정의 
  const gameEnd = () => {
    setPlayState(0);
  }
  // game Info 변경 시 사용
  const gameInfoHandler = async (game) => {
    console.log("this comes when the game info is change");
    console.log(game);
    dispatch(initRoomInfo(game));
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
    socket.on('chatMessage', messageHandler);
    socket.on('gameStart', gameStart);

    socket.on('playerEnter', playerEnterHandler);
    socket.on('playerLeave', playerLeaveHandler);

    //test, and get the every room info
    // socket.emit('testRoomsInfo', (rooms) => {
    //   console.log(rooms);
    // })

    return () => {
      socket.off('gameInfo', gameInfoHandler);
      socket.off('chatMessage', messageHandler);
      socket.off('gameStart', gameStart);
    };
  }, []);


  useEffect(() => {

  }, [playState]);

  useEffect(() => {
    if (roomInfo.nowTurn === pid) {
      setIsMyTurn(true);
    }
    setThisTurnPlayer(roomInfo.nowTurn);
    if (roomInfo.adminPlayer === pid) {
      setIsAdmin(true);
    }
    // checkMyTurn(roomInfo.adminPlayer);
    // checkIsAdmin(roomInfo.nowTurn);
  }, [roomInfo.adminPlayer, roomInfo.nowTurn, pid])
  const imageRoute = (item) => {
    return require(`../assets/img/card/0${Math.floor(item / 8)}/00${item % 8}.png`);
  }

  const sendMessage = () => {
    socket.emit('chat message', input, localStorage.getItem('userName'));
    setInput('');
  };

  // 게임시작 이벤트 호출
  const start = () => {
    socket.emit('start');
  }


  return (
    <div className="h-screen">
      <div className='w-screen h-[60%] flex flex-wrap justify-between'>
        {
          playState === 2 && isMyTurn &&
          <SelectScreen>
            <div className="overlay">
              {Object.entries(animalList).map(([key, value]) =>
              (
                <Button
                  className=""
                  key={value}
                  onClick={() => { cardBluffHandler(value) }}
                >
                  {key}
                </Button>
              )
              )}
            </div>
          </SelectScreen>
        }
        {
          playState === 2 && !isMyTurn &&
          <SelectScreen>
            <div className="overlay">
              <h2>다른 플레이어가 선택 중 입니다...!</h2>
              <Spinner aria-label="Success spinner" size="xl" />
            </div>
          </SelectScreen>
        }
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
        }{
          playState === 3 && !isMyTurn &&
          <SelectScreen>
            <div className="overlay">

              <h3>A 플레이어가 B 플레이어에게 말했습니다.</h3>
              <h2>이거 <strong>알락꼬리마도요</strong>야.</h2>
              <Spinner aria-label="Success spinner" size="xl" />
            </div>
          </SelectScreen>
        }
        {
          playState === 4 &&
          <SelectScreen>
            <div className="overlay">
              <h1>Something Something Something We win</h1>
            </div>
          </SelectScreen>
        }

        <PlayerView></PlayerView>
        <div className="bg-white rounded w-[30%] m-2"
          onDragEnter={(e) => dragEnterHandler(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dropHandler(e)}>
          player2
        </div>
        <div className="bg-white rounded w-[30%] m-2"
          onDragEnter={(e) => dragEnterHandler(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dropHandler(e)}>
          player3
        </div>
        <div className="bg-white rounded w-[30%] m-2"
          onDragEnter={(e) => dragEnterHandler(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dropHandler(e)}>
          player4
        </div>
        <div className="bg-white rounded w-[30%] m-2"
          onDragEnter={(e) => dragEnterHandler(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dropHandler(e)}>
          player5
        </div>
        <div className="cards">
          <div className='flex absolute left-[35%] bottom-[100px]'>
            {cards &&
              cards.map((item, index) => (
                <div
                  onDragStart={() => dragStart(item)}
                  key={index}
                  draggable={isMyTurn}
                  className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300 "
                  style={{ zIndex: cards.length - index }}
                >
                  <img key={index} className="" src={imageRoute(item)} alt="" />
                </div>
              ))}
          </div>
        </div>


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
        {
          playState === 0 && isAdmin &&
          <Button color="success" onClick={start}>start</Button>
        }
        {/* {
          cards.map((card) => (
            <div key={card}>{card}</div>
          ))
        } */}
        <Button color="success" onClick={leaveRoom}>난 나갈거다.</Button>
      </div >
    </div >
  );
};

export default Play;