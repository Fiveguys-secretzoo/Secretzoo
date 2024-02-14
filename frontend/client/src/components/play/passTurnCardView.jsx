import { useContext } from 'react';
import { useDispatch, } from 'react-redux';
import { changeCardStatus } from '../../store/playSlice'
import { SocketContext } from '../../App';

const PassTurnCardView = ({ bCard, isMyTurn, img, psq, playState }) => {

  const dispatch = useDispatch();

  const dragBluffStart = (event, item) => {
    if (playState !== 4 || !isMyTurn) {
      event.preventDefault();
    }
    dispatch(changeCardStatus({ 'from': psq, 'card': item }));
  }


  // 공격당한 플레이어의 선택지 발생 시 
  return (
    <>
      <div
        onDragStart={(event) => dragBluffStart(event, 64 + bCard)}
        draggable={isMyTurn}
        className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300 "
      >
        <img src={img} alt="" />
      </div>
    </>
  )
}

export default PassTurnCardView;