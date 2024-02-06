import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../App';

const DropSelectMyTurn = ({ animalList }) => {

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const cardBluffHandler = (value) => {
    dispatch(changePlayState(3));
    console.log(`[cardBluff] value [${value}]`)
    socket.emit("cardBluffSelect", value);
  };

  return (
    <>
      <div className="overlay">{
        animalList.map((value, index) => (
          <Button
            className=""
            key={index}
            onClick={() => { cardBluffHandler(index) }}
          >
            {value}
          </Button>
        ))
      }
      </div>
    </>
  )
}

export default DropSelectMyTurn;