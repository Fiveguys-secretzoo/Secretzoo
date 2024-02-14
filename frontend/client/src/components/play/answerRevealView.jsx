import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';
import { FaRegCheckCircle, FaExclamationCircle  } from "react-icons/fa";

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
          <h3 className='text-green-700 mr-3 text-xl font-bold'>플레이어가 정답을 맞췄습니다</h3>
        </div>
        
        <div hidden={gameResult}>
          <h3 className='text-red-700 mr-3 text-xl font-bold'>플레이어가 정답을 틀렸습니다</h3>
        </div>
        <div hidden={!gameResult}>
          <Button className='bg-[#BFD8AF] hover:!bg-[#99BC85]' onClick={() => { thisTurnEnd() }}><FaRegCheckCircle className='w-20 h-20' color='green' /></Button>
        </div>
        <div hidden={gameResult}>
          <Button className='bg-[#FCAEAE] hover:!bg-[#FF8989]' onClick={() => { thisTurnEnd() }}><FaExclamationCircle className='w-20 h-20' color='#FE0000' /></Button>
        </div>
      </div>
    </>
  )
}

export default AnswerRevealView