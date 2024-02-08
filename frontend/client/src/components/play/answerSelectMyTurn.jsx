import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';

const AnswerSelectMyTurn = ({ roomName, setIsMyTurn }) => {

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  // 공격당한 플레이어의 선택지 발생 시 
  const handleAnswer = (val) => {
    console.log(`[AnswerSelect] Answer : ${val}`);
    if (val === 1) {
      cardPassHandler();
      dispatch(changePlayState(4));
    } else {
      cardAnswerHandler(val);
      dispatch(changePlayState(5));
    }
  }

  // 카드 패스 선택시
  const cardPassHandler = () => {
    console.log(`[cardPass] card Passed!`);
    socket.emit('cardPass', roomName, (result) => {
      console.log(`[cardPass] ${result}`)
      setIsMyTurn(true);
    });
  }

  // 카드 정답 맞추기 
  const cardAnswerHandler = (answer) => {
    console.log(`[cardAnswer] card Answered!`);
    socket.emit('cardReveal', roomName, answer);
  }

  return (
    <>
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
    </>
  )
}

export default AnswerSelectMyTurn;