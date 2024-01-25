import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../style/play.css';

const Play = () => {
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  const pid = sessionStorage.getItem("userName");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([1, 2, 3, 4]);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [thisTurnPlayer, setThisTurnPlayer] = useState('');
  const [cardDrag, setCardDrag] = useState({'from' : -1, 'to' : -1, 'card':-1});
  const [cardDrop, setCardDrop] = useState({'from' : -1, 'to' : -1, 'card':-1});
  const [playersId, setPlayersId] = useState(['','','','','', ''])

  const navigate = useNavigate();
  // 플레이어 위에 드래그가 올라갔을 때
  const handleDragEnter = (e) => {
    console.log(dragItem.current + " hover " + e.target.textContent);
    socket.emit("cardDrag", pid, e.target.textContent);
  };

  // 플레이어 위에 드롭 했을 때
  const handleDrop = (e) => {
    e.preventDefault();
    alert(dragItem.current + " drop " + e.target.textContent);
    socket.emit("cardDrop", pid, e.target.textContent);
  };

  const handleResponse = () => {

  }

  const handleCardDragResponse = (from, to) => {
    console.log("card Dragged");
    setCardDrag((value) => {
    });
    console.log(`${from} to ${to}`);
  };

  const handleCardDropResponse = (from, to ) => {
    
    console.log("card Dragged")
    setCardDrop((value) => {
    });
    console.log(`${from} to ${to}`);
  };

  const handleCardBluffResponse = (e) => {

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

      console.log("##### Card Set");
      socket.on("gameListen", handleResponse)
      socket.on("cardDrag", handleCardDragResponse)
      socket.on("cardDrop", handleCardDropResponse)
      socket.on("cardBluffSelect", handleCardBluffResponse);
    }

    const gameInfoHandler = (game) => {
      console.log("this comes when the game info is change");
      console.log(game);
    }

    socket.emit('checkReconnection', pid);
    socket.on('requestGameInfo', gameInfoHandler);
    socket.on('chatMessage', messageHandler);
    socket.on('gameStart', gameStart);
    socket.emit('testRoomsInfo', (rooms) => {
      console.log(rooms);
    })

    return () => {
      socket.off('gameInfo', gameInfoHandler);
      socket.off('chatMessage', messageHandler);
      socket.off('gameStart', gameStart);
    };
  }, []);

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
    <div className="chat-container">
      <div id='root'>
        <div className="playerSlot"
          onDragEnter={(e) => handleDragEnter(e)}
          onDrop={(e) => handleDrop(e)}
        >
        
        </div>
        
        <div className="cards">
          {cards &&
            cards.map((item, index) => (
              <div
                key={index}
                draggable
                className="card"
                style={{ zIndex: cards.length - index }}
              >
                <img className="card-image" src={imageRoute(item)} alt=""/>
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
      </div>
      <button onClick={start}>start</button>
      {
        cards.map((card) => (
          <div key={card}>{card}</div>
        ))
      }
    </div>
  );
};

export default Play;