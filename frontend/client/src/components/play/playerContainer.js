import React, { useContext } from 'react';
import { SocketContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { changePlayState, changeCardDrop, changeCardDrag, dropCard } from '../../store/playSlice'

const PlayerContainer = () => {
  const socket = useContext(SocketContext);
  const dragItem = useSelector(state => state.plays.game.card)
  const dragFrom = useSelector(state => state.plays.game.from)
  const dragTo = useSelector(state => state.plays.game.to)
  const turnedPlayer = useSelector(state => state.plays.game.turnedPlayer);
  const dispatch = useDispatch();
  const playerSequenceNumber = useSelector(state => state.userInfo.userSequence);
  const roomName = useSelector(state => state.plays.roomName);

  // 플레이어 위에 드래그가 올라갔을 때 socket.io 로 emit
  const dragEnterHandler = (e, psq) => {
    console.log(dragItem + " hover " + e.target.textContent);
    socket.emit("cardDrag", dragFrom, dragTo);
  };

  // 드래그 Over 기본 Event
  const dragOver = (e, psq) => {
    e.preventDefault();
  }

  // 플레이어 위에 드롭 했을 때 socket.io 로 emit
  const dropHandler = (e, psq) => {
    e.preventDefault();

    // bluff 아닐 때
    if (dragItem < 64) {
      if (turnedPlayer.includes(psq)) {
        console.log(`Cannot drop on Player ${psq}`);
        return;
      }

      dispatch(changeCardDrop({ from: dragFrom, to: psq }));
      console.log(`[dropHandler] [${dragItem}] drop [${dragTo}], psq : [${psq}]`);
      alert(dragItem + " drop " + e.target.textContent);
      dropCard({ 'psq': psq, 'card': dragItem });
      socket.emit("cardDrop", roomName, playerSequenceNumber, dragFrom, psq, dragItem);
      dispatch(changePlayState(2));
    }
    else { // bluff 턴일 때
      if (turnedPlayer.includes(psq)) {
        console.log(`Cannot drop on Player ${psq}`);
        return;
      }

      dispatch(changeCardDrop({ from: dragFrom, to: psq }));
      console.log(`[dropHandler/Bluff] [${dragItem}] drop [${dragTo}], psq : [${psq}]`)
      alert(`${dragItem} drop to ${e.target.textContent}`);
      socket.emit("cardDrop", dragFrom, psq, dragItem);
      dispatch(changePlayState(2));
    }
  };

  return {
    dragEnterHandler,
    dragOver,
    dropHandler,

  };
}


export default PlayerContainer;