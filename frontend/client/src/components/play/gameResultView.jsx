import { useDispatch, useContext } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'

import { SocketContext } from '../App';
const GameResultView = ({ roomName, playerSequence, gameInfoHandler }) => {

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  return (
    <>
      <div className="overlay">
        <h1>이것은 일단 통계회면이라고 할 수 있는데 통계 화면이 아닌걸로 할 수 있어요 무슨 소리냐구요? 나도 잘 몰라요</h1><br />
        <Button onClick={() => {
          dispatch(changePlayState(0));
          socket.emit('requestGameInfo', roomName, playerSequence, gameInfoHandler);
        }}></Button>
      </div>
    </>
  )
}

export default GameResultView;