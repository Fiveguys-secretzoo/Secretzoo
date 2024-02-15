import { useContext } from 'react';
import { useDispatch, } from 'react-redux';
import { changeCardStatus } from '../../store/playSlice'
import { SocketContext } from '../../App';
import Swal from 'sweetalert2';

const PassTurnCardView = ({ bCard, isMyTurn, img, psq, playState, answerCard, images }) => {

  const dispatch = useDispatch();

  const animals = [
    '호랑이', '고양이', '강아지', '고라니', '돼지', '여우', '양', '흑동고래'
  ]

  const dragBluffStart = (event, item) => {
    if (playState !== 4 || !isMyTurn) {
      event.preventDefault();
    }
  }

  const SwalFire = (answerCard, images) => {
    dispatch(changeCardStatus({ 'from': psq, 'card': bCard + 64 }));
    // console.log(answerCard);
    Swal.fire({
      iconHtml: `<img src="${images[answerCard]}"></img>`,
      text:`쉿... 받은 카드는 ${animals[Math.floor(answerCard/8)]} 입니다.`,
      timer: 2500,
    })
  }


  // 공격당한 플레이어의 선택지 발생 시 
  return (
    <>
      {isMyTurn &&
        SwalFire(answerCard, images)
      }
      <div
        onClick={(e)=> e.preventDefault()}
        onDragStart={(event) => dragBluffStart(event, 64 + bCard)}
        draggable={isMyTurn}
        className="w-[8em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300 "
      >
        <img src={img} alt="" />
      </div>
    </>
  )
}

export default PassTurnCardView;