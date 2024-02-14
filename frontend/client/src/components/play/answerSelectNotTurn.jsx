import { Spinner } from 'flowbite-react';
import { GiTigerHead, GiSniffingDog, GiDeer, GiPig, GiFox, GiSheep, GiSpermWhale} from "react-icons/gi";
import { FaCat } from "react-icons/fa";
const AnswerSelectNotTurn = ({ p1, p2, animal }) => {

  return (
    <>
      <div className="overlay">
        <div className='text-white text-xl text-center'>
          <h2 style={{ fontSize: '1.5em' }} className='mb-4'> <strong>{p1}</strong> 플레이어가 <strong>{p2}</strong> 플레이어에게 말했습니다.</h2>
          <h1 style={{ fontSize: '2.5em' }}>이거 <strong className='text-indigo-900'> {animal} </strong> 야.</h1> <br></br>
          <Spinner aria-label="Success spinner" size="xl" />
  
            {animal=='호랑이'? <GiTigerHead className='w-48 h-48 mr-2' color='#FF8911'/> : ''}
            {animal=='고양이'? <FaCat className='w-48 h-48 mr-2' color='black'/> : ''}
            {animal=='강아지'? <GiSniffingDog  className='w-48 h-48 mr-2' color='#B2A59B'/> : ''}
            {animal=='고라니'? <GiDeer className='w-48 h-48 mr-2' color='#9B4444'/> : ''}
            {animal=='돼지'? <GiPig className='w-48 h-48 mr-2' color='#FFB0B0'/> : ''}
            {animal=='여우'? <GiFox className='w-48 h-48 mr-2' color='#FC6736'/> : ''}
            {animal=='양'? <GiSheep className='w-48 h-48 mr-2' color='#A7D397'/> : ''}
            {animal=='고래'? <GiSpermWhale className='w-48 h-48 mr-2' color='#0766AD'/> : ''}
        </div>
      </div>
    </>
  )
}

export default AnswerSelectNotTurn;