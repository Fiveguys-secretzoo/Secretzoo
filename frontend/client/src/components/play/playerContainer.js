import React, { useContext } from 'react';
import { SocketContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { changePlayState, changeCardDrop, changeCardDrag } from '../../store/playSlice'

const PlayerContainer = () => {
  const socket = useContext(SocketContext);
  const dragItem = useSelector(state => state.plays.onBoard.card)
  const dragFrom = useSelector(state => state.plays.onBoard.from)
  const dragTo = useSelector(state => state.plays.onBoard.to)
  const turnedPlayer = useSelector(state => state.plays.onBoard.turnedPlayer);
  const dispatch = useDispatch();

  // 플레이어 위에 드래그가 올라갔을 때 socket.io 로 emit
  const dragEnterHandler = (e, pid) => {
    console.log(dragItem + " hover " + e.target.textContent);
    socket.emit("cardDrag", dragFrom, dragTo);
  };

  // 드래그 Over 기본 Event
  const dragOver = (e, pid) => {
    e.preventDefault();
  }

  // 플레이어 위에 드롭 했을 때 socket.io 로 emit
  const dropHandler = (e, pid) => {
    e.preventDefault();

    // bluff 아닐 때
    if (dragItem < 64) {
      if (turnedPlayer.includes(pid)) {
        console.log(`Cannot drop on Player ${pid}`);
        return;
      }

      dispatch(changeCardDrop({ from: dragFrom, to: pid }));
      console.log(`[dropHandler] [${dragItem}] drop [${dragTo}], pid : [${pid}]`);
      alert(dragItem + " drop " + e.target.textContent);
      socket.emit("cardDrop", dragFrom, pid, dragItem);
      dispatch(changePlayState(2));
    }
    else { // bluff 턴일 때
      if (turnedPlayer.includes(pid)) {
        console.log(`Cannot drop on Player ${pid}`);
        return;
      }

      dispatch(changeCardDrop({ from: dragFrom, to: pid }));
      console.log(`[dropHandler/Bluff] [${dragItem}] drop [${dragTo}], pid : [${pid}]`)
      alert(`${dragItem} drop to ${e.target.textContent}`);
      socket.emit("cardDrop", dragFrom, pid, dragItem);
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