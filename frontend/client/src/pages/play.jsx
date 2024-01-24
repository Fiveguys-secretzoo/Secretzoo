import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../App';
import '../style/play.css';

const Play = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([1, 2, 3, 4]);
  const [cardDrag, setCardDrag] = useState({'from' : -1, 'to' : -1, 'card':-1});
  const [cardDrop, setCardDrop] = useState({'from' : -1, 'to' : -1, 'card':-1});
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  
  const dragStart = (e) => {
    dragItem.current = e.target.textContent;
  };
  const dragOver = (e) => {
    e.preventDefault();
  }
  const handleDragEnter = (e) => {
    console.log(dragItem.current + " hover " + e.target.textContent);
    socket.emit("cardDrag", pid, e.target.textContent);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    alert(dragItem.current + " drop " + e.target.textContent);
  };

  const pid = sessionStorage.getItem("userName");
  const handleResponse = () => {

  }

  const handleCardDragResponse = (from, to) => {
    console.log("something happens")
    setCardDrag((value) => {
    });
    console.log(`${from} , ${to}`);
  };

  const handleCardDropResponse = (e) => {
    setCardDrop((value) => {
      value = e;
    });
    
    console.log(cardDrop)
  };

  const handleCardBluffResponse = (e) => {

  }
  // 이벤트 수신
  useEffect(() => {
    console.log("check if the refresh button see this");

    

    const messageHandler = (msg) => {
      console.log(1)
      setMessages((msgs) => [...msgs, msg]);
    };

    const gameStart = (cards) => {
      console.log("##### Game Started !");
      setCards(cards)
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
        <div className="player"
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => handleDrop(e)}>
          player1
        </div>
        <div className="player"
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDropCapture={(e) => handleDrop(e)}>
          player2
        </div>
        <div className="player"
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => handleDrop(e)}>
          player3
        </div>
        <div className="player"
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => handleDrop(e)}>
          player4
        </div>
        <div className="player"
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => handleDrop(e)}>
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