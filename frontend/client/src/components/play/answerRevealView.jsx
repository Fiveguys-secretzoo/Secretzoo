import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';

const AnswerRevealView = ({ gameResult }) => {

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  // 공격당한 플레이어의 선택지 발생 시 
  const thisTurnEnd = () => {
    socket.emit('')
    dispatch(changePlayState(1));
  }

  return (
    <>
      <div className="overlay">
        <div hidden={!gameResult}>
          <h3>플레이어가 정답을 맞췄습니다.</h3>
        </div>
        <div hidden={gameResult}>
          <h3>플레이어가 정답을 틀렸습니다.</h3>
        </div>
        <Button onClick={() => { thisTurnEnd() }}></Button>
      </div>
    </>
  )
}

export default AnswerRevealView