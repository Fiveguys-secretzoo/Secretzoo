import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';
import { FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { GiTigerHead, GiSniffingDog, GiDeer, GiPig, GiFox, GiSheep, GiSpermWhale } from "react-icons/gi";
import { FaCat } from "react-icons/fa";

const AnswerRevealView = ({ gameResult, p2, realCard }) => {

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  // 공격당한 플레이어의 선택지 발생 시 
  const thisTurnEnd = () => {
    socket.emit('')
    dispatch(changePlayState(1));
  }

  useEffect(() => {
    setTimeout(() => {
      thisTurnEnd();
    }, 2000)
  })
  const animals = [
    '호랑이', '고양이', '강아지', '고라니', '돼지', '여우', '양', '흑동고래'
  ]
  const animalIconList = [
    <GiTigerHead className='w-20 h-20 ml-1' color='#FF8911' />,
    <FaCat className='w-20 h-20 ml-1' color='black' />,
    <GiSniffingDog className='w-20 h-20 ml-1' color='#B2A59B' />,
    <GiDeer className='w-20 h-20 ml-1' color='#9B4444' />,
    <GiPig className='w-20 h-20 ml-1' color='#FFB0B0' />,
    <GiFox className='w-20 h-20 ml-1' color='#FC6736' />,
    <GiSheep className='w-20 h-20 ml-1' color='#A7D397' />,
    <GiSpermWhale className='w-20 h-20 ml-1' color='#0766AD' />,
  ];
  return (
    <>
      <div className="overlay">
        <div className="">
          <div className="flex flex-col items-center">
            {animalIconList[Math.floor(realCard / 8)]}
          </div>
          <div className="flex flex-col items-center">
            <span className='mr-2 font-bold text-white'>실제 동물은
              <h className="text-xl"> {animals[Math.floor(realCard / 8)]} </h>
              {Math.floor(realCard / 8) === 6 ? '이었' : '였'}습니다! </span>
          </div>
          <div hidden={!gameResult}>
            <div className="flex flex-col items-center">
              <h3 className='text-green-700 mr-3 text-3xl font-bold'><span className='mr-2 font-bold text-lime-300'>{p2}</span>플레이어가 정답을 맞췄습니다</h3>
              <Button className='bg-[#BFD8AF] hover:!bg-[#99BC85] m-5' onClick={() => { thisTurnEnd() }}><FaRegCheckCircle className='w-20 h-20' color='green' /></Button>
            </div>
          </div>

          <div hidden={gameResult}>
            <div className="flex flex-col items-center">
              <h3 className='text-red-700 mr-3 text-xl font-bold'><span className='mr-2 font-bold text-pink-300'>{p2}</span>플레이어가 정답을 틀렸습니다</h3>
              <Button className='bg-[#FCAEAE] hover:!bg-[#FF8989] m-5' onClick={() => { thisTurnEnd() }}><FaExclamationCircle className='w-20 h-20' color='#FE0000' /></Button>
            </div>
          </div>
        </div>


        {/* <div hidden={!gameResult}>
          <Button className='bg-[#BFD8AF] hover:!bg-[#99BC85]' onClick={() => { thisTurnEnd() }}><FaRegCheckCircle className='w-20 h-20' color='green' /></Button>
        </div>
        <div hidden={gameResult}>
          <Button className='bg-[#FCAEAE] hover:!bg-[#FF8989]' onClick={() => { thisTurnEnd() }}><FaExclamationCircle className='w-20 h-20' color='#FE0000' /></Button>
        </div> */}
      </div>
    </>
  )
}

export default AnswerRevealView