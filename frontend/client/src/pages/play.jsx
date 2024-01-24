import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../App';
import '../style/play.css';

const Play = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([1, 2, 3, 4]);
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  
  const dragStart = (e) => {
    dragItem.current = e.target.textContent;
  };
  const dragOver = (e) => {
    e.preventDefault();
  }
  const dragEnter = (e) => {
    console.log(dragItem.current + " hover " + e.target.textContent);
  };
  const drop = (e) => {
    e.preventDefault();
    alert(dragItem.current + " drop " + e.target.textContent);
  };

  const pid = sessionStorage.getItem("userName");

  // 이벤트 수신
  useEffect(() => {
    console.log("check if the refresh button see this");

    const handleResponse = () => {

    }
    const messageHandler = (msg) => {
      console.log(1)
      setMessages((msgs) => [...msgs, msg]);
    };
    const gameStart = (cards) => {
      setCards(cards)
      socket.on("gameListen", handleResponse)
    }

    const gameInfoHandler = (game) => {
      console.log(game);
    }
    socket.emit('checkReconnection', pid);
    socket.on('gameInfo', gameInfoHandler);
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
        <div className="player"
          onDragEnter={(e) => dragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e)}>
          player1
        </div>
        <div className="player"
          onDragEnter={(e) => dragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDropCapture={(e) => drop(e)}>
          player2
        </div>
        <div className="player"
          onDragEnter={(e) => dragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e)}>
          player3
        </div>
        <div className="player"
          onDragEnter={(e) => dragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e)}>
          player4
        </div>
        <div className="player"
          onDragEnter={(e) => dragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e)}>
          player5
        </div>
        <div className="cards">
          {cards &&
            cards.map((item, index) => (
              <div
                key={index}
                onDragStart={(e) => dragStart(e)}
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