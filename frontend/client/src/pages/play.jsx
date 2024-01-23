import React, {useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../App';
import '../style/play.css';

const Play = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([1,2,3,4]);
  const socket = useContext(SocketContext);
  const dragItem = useRef();
  const [list, setList] = useState([
      "Card 1",
      "Card 2",
      "Card 3",                                                                   
      "Card 4",
      "Card 5",
      "Card 6",
      "Card 7",
      "Card 8",
      "Card 9",
      "Card 10",
      "Card 11",
      "Card 12",
      "Card 13",
      "Card 14",

  ]);
  const dragStart = (e) => {
      dragItem.current = e.target.textContent;
    };
  const dragOver = (e)=>{
    e.preventDefault();
  }
  const dragEnter = (e) => {
    console.log(dragItem.current+" hover "+e.target.textContent);
  };
  const drop = (e) => {
    e.preventDefault();
    alert(dragItem.current+" drop "+e.target.textContent);
  };
  // 이벤트 수신
  useEffect(() => {
      const messageHandler = (msg) => {
      console.log(1)
      setMessages((msgs) => [...msgs, msg]);
      };
      const gameStart = (cards)=>{
          setCards(cards)
      }
      socket.on('chat message', messageHandler);
      socket.on('game start', gameStart);
      socket.emit('testRoomsInfo', (rooms) => {
        console.log(rooms);
      })
      return () => {      
      socket.off('chat message', messageHandler);
      socket.off('game start', gameStart);
      };
  }, []);

  // const sendMessage = () => {
  //     socket.emit('chat message', input, localStorage.getItem('userName'));
  //     setInput('');
  // };
  // 게임시작 이벤트 호출
  const start = () =>{
    socket.emit('start');
  }
  return (
      <div className="chat-container">
          <div id='root'>
          <div className="player"
            onDragEnter={(e)=>dragEnter(e)}
            onDragOver={(e)=>dragOver(e)}
            onDrop={(e)=>drop(e)}>
            player1
          </div>
          <div className="player"
            onDragEnter={(e)=>dragEnter(e)}
            onDragOver={(e)=>dragOver(e)}
            onDropCapture={(e)=>drop(e)}>
            player2
          </div>
          <div className="player"
            onDragEnter={(e)=>dragEnter(e)}
            onDragOver={(e)=>dragOver(e)}
            onDrop={(e)=>drop(e)}>
            player3
          </div>
          <div className="player"
            onDragEnter={(e)=>dragEnter(e)}
            onDragOver={(e)=>dragOver(e)}
            onDrop={(e)=>drop(e)}>
            player4
          </div>
          <div className="player"
            onDragEnter={(e)=>dragEnter(e)}
            onDragOver={(e)=>dragOver(e)}
            onDrop={(e)=>drop(e)}>
            player5
          </div>
          <div className="cards">
          {cards &&
            cards.map((item, index) => (
            <div
              key={index}
              onDragStart={(e)=>dragStart(e)}
              draggable
              className="card"
              style={{ zIndex: list.length - index }}
            >
              <img class="card-image" src={require(`../assets/img/card/0${Math.floor(item/8)}/00${item%8}.png`)}/>
              {item+""}
            </div>
          ))}
        </div>
      </div>
      {/* <h1>Chat Application</h1>
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
      </div> */}
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