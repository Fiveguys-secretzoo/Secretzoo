import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';
import { FaRegSmile, FaRegAngry} from "react-icons/fa";
import { FaRegFaceGrinTongueSquint  } from "react-icons/fa6";
import { GiTigerHead, GiSniffingDog, GiDeer, GiPig, GiFox, GiSheep, GiSpermWhale} from "react-icons/gi";
import { FaCat } from "react-icons/fa";

const AnswerSelectMyTurn = ({ roomName, setIsMyTurn, playerCount, tp, animal, p1, setAnswerCard }) => {

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
      setAnswerCard(result)
      console.log(result)
      console.log(`[cardPass] ${result}`)
      setIsMyTurn(true);
    });
  }

  // 카드 정답 맞추기 
  const cardAnswerHandler = (answer) => {
    console.log(`[cardAnswer] card Answered!`);
    socket.emit('cardReveal', roomName, answer);
  }

  useEffect(() => {
    console.log(`##### [answerSelect] ${playerCount} / ${tp.length}`)
  })
  return (
    <>
      <div className="overlay">
        <div className='flex-column text-xl text-center'>
            <h2 style={{ fontSize: '1.5em' }} className='mb-4 text-white'><strong className='text-lime-300'>{p1}</strong>가 나를 공격했습니다</h2>
            <h1 className='text-white text-center' style={{ fontSize: '2.5em' }}>이거 <strong className='text-teal-300'> {animal} </strong> (이)야.</h1> 
              <br></br>
              <div className='flex justify-center'>
              {animal=='호랑이'? <GiTigerHead className='w-48 h-48 mr-2' color='#FF8911'/> : ''}
              {animal=='고양이'? <FaCat className='w-48 h-48 mr-2' color='black'/> : ''}
              {animal=='강아지'? <GiSniffingDog  className='w-48 h-48 mr-2' color='#B2A59B'/> : ''}
              {animal=='고라니'? <GiDeer className='w-48 h-48 mr-2' color='#9B4444'/> : ''}
              {animal=='돼지'? <GiPig className='w-48 h-48 mr-2' color='#FFB0B0'/> : ''}
              {animal=='여우'? <GiFox className='w-48 h-48 mr-2' color='#FC6736'/> : ''}
              {animal=='양'? <GiSheep className='w-48 h-48 mr-2' color='#A7D397'/> : ''}
              {animal=='고래'? <GiSpermWhale className='w-48 h-48 mr-2' color='#0766AD'/> : ''}
              </div>
          <div className='m-1 flex'>
            <Button className='m-1 bg-[#1B1A55] hover:!bg-[#535C91] text-white font-bold rounded-full shadow-lg' onClick={() => handleAnswer(0)}>
              <span className='text-xl'>맞다</span>
            <FaRegSmile className='ml-3 w-10 h-10' color='green'/>
            </Button>
            

            <Button className='m-1 bg-[#1B1A55] hover:!bg-[#535C91] text-white font-bold rounded-full shadow-lg' disabled={(tp.length === playerCount) ? true : false} onClick={() => handleAnswer(1)}>
            <span className='text-xl'>패스</span>
            <FaRegFaceGrinTongueSquint  className='ml-3 w-10 h-10' color='orange' />
            </Button>

            <Button className='m-1 bg-[#1B1A55] hover:!bg-[#535C91] text-white font-bold rounded-full shadow-lg' onClick={() => handleAnswer(2)} >
            <span className='text-xl'>아니다</span>
            <FaRegAngry className='ml-3 w-10 h-10' color='red' />
            </Button>
          </div>
        </div>
      </div >
    </>
  )
}

export default AnswerSelectMyTurn;