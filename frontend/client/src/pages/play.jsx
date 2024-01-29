import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../style/play.css';




const Play = () => {
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  const pid = sessionStorage.getItem("userName");

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

  const navigate = useNavigate();
  const dragStart = (item) => {
    dragItem.current = item;
  }

  // 플레이어 위에 드래그가 올라갔을 때 socket.io 로 emit
  const dragEnterHandler = (e) => {
    console.log(dragItem.current + " hover " + e.target.textContent);
    socket.emit("cardDrag", pid, e.target.textContent);
  };
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
  const playerEnterHandler = () => {

  }

  // player leave socket event handle
  const playerLeaveHandler = () => {

  }


  const leaveRoom = () => {

  }
  // 이벤트 수신
  useEffect(() => {
    socket.on("serverClosed", (e) => {
      console.log("serverClosed");
      navigate('/');
    });
    console.log("check if the refresh button see this");



    const messageHandler = (msg) => {
      console.log(1)
      setMessages((msgs) => [...msgs, msg]);
    };

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
    const gameInfoHandler = (game) => {
      console.log("this comes when the game info is change");
      console.log(game);
    }

    socket.emit('checkReconnection', pid);
    socket.on('requestGameInfo', gameInfoHandler);
    socket.on('chatMessage', messageHandler);
    socket.on('gameStart', gameStart);

    socket.on('playerEnter', playerEnterHandler)
    socket.emit('testRoomsInfo', (rooms) => {
      console.log(rooms);
    })

    return () => {
      socket.off('gameInfo', gameInfoHandler);
      socket.off('chatMessage', messageHandler);
      socket.off('gameStart', gameStart);
    };
  }, []);


  useEffect(() => {

  }, [playState]);

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
          playState === 2 &&
          <SelectScreen>
            <div className="overlay">
              {Object.entries(animalList).map(([key, value]) =>
              (
                <button
                  className="px-6 mx-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  key={value}
                  onClick={() => { cardBluffHandler(value) }}
                >
                  {key}
                </button>
              )
              )}
            </div>
          </SelectScreen>
        }
        {
          playState === 3 &&
          <SelectScreen>
            <div className="overlay">
              <button onClick={() => handleAnswer(0)}>
                맞다
              </button>
              <button onClick={() => handleAnswer(1)}>
                패스
              </button>
              <button onClick={() => handleAnswer(2)} >
                아니다
              </button>
            </div>
          </SelectScreen>
        }{
          playState === 4 &&
          <SelectScreen>
            <div className="overlay">
              <h1>Something Something Something We win</h1>
            </div>
          </SelectScreen>
        }


        <div className="bg-white rounded w-[30%] m-2"

          onDragOver={(e) => dragOver(e)}
          onDragEnter={(e) => dragEnterHandler(e)}
          onDrop={(e) => dropHandler(e)}

        >
          playerSlot2
        </div>
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
          <button onClick={sendMessage}>Send</button>
        </div>{
          playState === 0 && isAdmin &&
          <button className="px-6 mx-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={start}>start</button>
        }
        {/* {
          cards.map((card) => (
            <div key={card}>{card}</div>
          ))
        } */}
        <button className="px-6 mx-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={leaveRoom}>난 나갈거다.</button>
      </div >
    </div >
  );
};

export default Play;