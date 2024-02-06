import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../App';

const AnswerSelectNotTurn = (p1, p2, animal) => {

  return (
    <>
      <div className="overlay">
        <h3> {p1} 플레이어가 {p2} 플레이어에게 말했습니다.</h3>
        <h2>이거 <strong> {animal} </strong> 야.</h2> <br></br>
        <Spinner aria-label="Success spinner" size="xl" />
      </div>
    </>
  )
}

export default AnswerSelectNotTurn;