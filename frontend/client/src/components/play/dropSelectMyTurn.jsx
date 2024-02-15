import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';
import { GiTigerHead, GiSniffingDog, GiDeer, GiPig, GiFox, GiSheep, GiSpermWhale} from "react-icons/gi";
import { FaCat } from "react-icons/fa";
const DropSelectMyTurn = ({ animalList, roomName, psq }) => {

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const cardBluffHandler = (value) => {
    dispatch(changePlayState(3));
    // console.log(`[cardBluff] value [${value}]`)
    socket.emit("cardBluffSelect", roomName, psq, value);
  };

  return (
    <>
      <div className="overlay">{
        animalList.map((value, index) => (
          <Button
          
            className="m-1 bg-[#1B1A55] hover:!bg-[#535C91] text-white font-bold rounded-full shadow-lg"
            key={index}
            onClick={() => { cardBluffHandler(index) }}
          >
            {value=='호랑이'? <GiTigerHead className='w-10 h-10 mr-2' color='#FF8911'/> : ''}
            {value=='고양이'? <FaCat className='w-10 h-10 mr-2' color='black'/> : ''}
            {value=='강아지'? <GiSniffingDog  className='w-10 h-10 mr-2' color='#B2A59B'/> : ''}
            {value=='고라니'? <GiDeer className='w-10 h-10 mr-2' color='#9B4444'/> : ''}
            {value=='돼지'? <GiPig className='w-10 h-10 mr-2' color='#FFB0B0'/> : ''}
            {value=='여우'? <GiFox className='w-10 h-10 mr-2' color='#FC6736'/> : ''}
            {value=='양'? <GiSheep className='w-10 h-10 mr-2' color='#A7D397'/> : ''}
            {value=='고래'? <GiSpermWhale className='w-10 h-10 mr-2' color='#0766AD'/> : ''}
            {value}
          </Button>
        ))
      }
      </div>
    </>
  )
}

export default DropSelectMyTurn;